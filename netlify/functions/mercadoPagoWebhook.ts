import { Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (error) {
        console.error("Error initializing Firebase Admin", error);
    }
}

const db = admin.firestore();

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || "TEST_ACCESS_TOKEN";
const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });

export const handler: Handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }

        // Netlify functions passes query params in event.queryStringParameters
        // and body in event.body (often stringified)
        const queryParams = event.queryStringParameters || {};
        const parsedBody = event.body ? JSON.parse(event.body) : {};

        const paymentId = queryParams["data.id"] || (parsedBody && parsedBody.data && parsedBody.data.id);
        const topic = queryParams.type || (parsedBody && parsedBody.type) || (queryParams.topic);

        if (topic !== "payment" || !paymentId) {
            return { statusCode: 200, body: "Ignored topic" };
        }

        const payment = new Payment(client);
        const paymentData = await payment.get({ id: String(paymentId) });

        if (paymentData.status === "approved") {
            const items = paymentData.additional_info?.items || [];
            const payerEmail = paymentData.payer?.email || (paymentData.additional_info?.payer as any)?.email;
            const totalAmount = paymentData.transaction_amount;

            await db.runTransaction(async (transaction: admin.firestore.Transaction) => {
                // 1. Process items -> Decrement Stock
                for (const item of items) {
                    const productId = item.id;
                    const quantityPurchased = Number(item.quantity) || 1;

                    let selectedColor = "";
                    if (item.description && item.description.startsWith("Cor/Variação: ")) {
                        selectedColor = item.description.replace("Cor/Variação: ", "").trim();
                    }

                    if (productId) {
                        const productRef = db.collection("products").doc(productId);
                        const productDoc = await transaction.get(productRef);
                        if (productDoc.exists) {
                            const data = productDoc.data() || {};

                            if (selectedColor && data.variants && Array.isArray(data.variants)) {
                                const newVariants = data.variants.map((v: any) => {
                                    if (v.color === selectedColor) {
                                        return { ...v, stock: Math.max(0, (v.stock || 0) - quantityPurchased) };
                                    }
                                    return v;
                                });
                                transaction.update(productRef, { variants: newVariants });
                            } else {
                                const currentStock = data.stock || 0;
                                const newStock = Math.max(0, currentStock - quantityPurchased);
                                transaction.update(productRef, { stock: newStock });
                            }
                        }
                    }
                }

                // 2. Register Sale
                const externalRef = paymentData.external_reference;
                const newStatusData = {
                    paymentId: paymentData.id,
                    status: "approved",
                    totalAmount: totalAmount,
                    customerEmail: payerEmail,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                };

                if (externalRef) {
                    const existingSaleRef = db.collection("sales").doc(externalRef);
                    const docSnap = await transaction.get(existingSaleRef);

                    if (docSnap.exists) {
                        transaction.update(existingSaleRef, newStatusData);
                    } else {
                        // Fallback if reference provided but doc missing
                        transaction.set(existingSaleRef, { ...newStatusData, items: items, createdAt: admin.firestore.FieldValue.serverTimestamp() });
                    }
                } else {
                    // Legacy/fallback without external_reference
                    const newSaleRef = db.collection("sales").doc(String(paymentData.id));
                    transaction.set(newSaleRef, {
                        paymentId: paymentData.id,
                        status: "approved",
                        items: items,
                        totalAmount: totalAmount,
                        customerEmail: payerEmail,
                        createdAt: admin.firestore.FieldValue.serverTimestamp()
                    });
                }
            });

            // 3. Send Notifications (Telegram and Email)
            try {
                const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || "";
                const telegramChatId = process.env.TELEGRAM_CHAT_ID || "";
                const resendApiKey = process.env.RESEND_API_KEY || "";

                const itemsListTxt = items.map((i: any) => `- ${i.quantity}x ${i.title}`).join('\\n');
                const itemsListHtml = items.map((i: any) => `<li>${i.quantity}x ${i.title}</li>`).join('');

                // Telegram Alert for Administrator
                const telegramMessage = `🛍️ *NOVA VENDA RIONOVE!*\\n\\n` +
                    `*Cliente:* ${payerEmail}\\n` +
                    `*Valor Total:* R$ ${(totalAmount || 0).toFixed(2).replace('.', ',')}\\n` +
                    `*Itens:*\\n${itemsListTxt}\\n\\n` +
                    `Acesse o sistema de gestão para conferir o endereço de entrega e despachar!`;

                await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: telegramChatId,
                        text: telegramMessage,
                        parse_mode: 'Markdown'
                    })
                }).catch(err => console.error("Telegram API Error:", err));

                // Email Alert for Customer (via Resend)
                // Note: If domain is not verified on Resend, it might only allow sending to the registered developer email.
                await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${resendApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: 'Rionove Vendas <onboarding@resend.dev>',
                        to: [payerEmail],
                        subject: '📦 Pagamento Aprovado - Rionove',
                        html: `
                            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                                <h1 style="color: #D4AF37; text-align: center;">RIONOVE</h1>
                                <h2 style="text-align: center;">Seu pagamento foi aprovado! 🎉</h2>
                                <p>Olá, agradecemos por comprar conosco. O pagamento do seu pedido no valor de <strong>R$ ${(totalAmount || 0).toFixed(2).replace('.', ',')}</strong> foi confirmado com sucesso.</p>
                                
                                <h3>Resumo dos Itens:</h3>
                                <ul>
                                   ${itemsListHtml}
                                </ul>

                                <p>Nossa equipe já está separando seus produtos para o envio.</p>
                                <hr style="border-top: 1px solid #eee; margin: 30px 0;">
                                <p style="text-align: center; color: #888; font-size: 14px;">Qualquer dúvida, responda este email ou chame no WhatsApp oficial da Rionove.</p>
                                <p style="text-align: center; color: #888; font-size: 14px;">Atenciosamente, <br><strong>Equipe Rionove</strong></p>
                            </div>
                        `
                    })
                }).catch(err => console.error("Resend API Error:", err));

            } catch (notifErr) {
                console.error("Erro geral nas notificações post-webhook:", notifErr);
            }
        }

        // Return 200 OK
        return { statusCode: 200, body: "Webhook Received" };

    } catch (error) {
        console.error("Error processing webhook:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
    }
};
