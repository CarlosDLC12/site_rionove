import { Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { MOCK_PRODUCTS } from '../../src/data/mockProducts';

// Helper to send Telegram messages
const sendTelegramNotification = async (message: string) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.warn("Telegram credentials not configured. Skipping notification.");
        return;
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        if (!response.ok) {
            console.error("Failed to send Telegram notification:", await response.text());
        }
    } catch (error) {
        console.error("Error sending Telegram message:", error);
    }
};

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (error) {
        console.error("Error initializing Firebase Admin", error);
        // We'll let it fail gracefully later or fallback to a different init
    }
}

const db = admin.firestore();

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || "TEST_ACCESS_TOKEN";
const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });

export const handler: Handler = async (event) => {
    // CORS configuration
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: 'Method Not Allowed' };
    }

    try {
        if (!event.body) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: "No body provided" }) };
        }

        const { items, customer, shippingCost } = JSON.parse(event.body) as {
            items: Array<{ id: string; quantity: number, selectedColor?: string }>;
            customer: { email: string; name: string; phone?: string; address?: string; number?: string; neighborhood?: string; };
            shippingCost?: number;
        };

        if (!items || items.length === 0) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: "No items provided" }) };
        }

        const preferenceItems: any[] = [];
        const fetchedProducts = [];
        let hasSmartwatch = false;
        let hasAccessory = false;

        // Fetch all products to verify data and check combo rules
        for (const item of items) {
            const productRef = db.collection("products").doc(item.id);
            const productSnap = await productRef.get();

            let productData;

            if (!productSnap.exists) {
                // Fallback to MOCK_PRODUCTS for development/testing if Firestore is empty
                const mockProduct = MOCK_PRODUCTS.find(p => p.id === item.id || p.slug === item.id);
                if (mockProduct) {
                    productData = mockProduct;
                } else {
                    return { statusCode: 404, headers, body: JSON.stringify({ error: `Product ${item.id} not found in DB or Mocks` }) };
                }
            } else {
                productData = productSnap.data();
            }

            if (!productData) {
                return { statusCode: 404, headers, body: JSON.stringify({ error: `Product ${item.id} data is invalid` }) };
            }

            if (productData.category === 'Smartwatch') hasSmartwatch = true;
            if (productData.category === 'Acessórios') hasAccessory = true;

            fetchedProducts.push({ item, productData });
        }

        const applyComboDiscount = hasSmartwatch && hasAccessory;

        // Process preference items and apply discount if combo exists
        for (const { item, productData } of fetchedProducts) {
            let availableStock = productData.stock !== undefined ? productData.stock : 9999;
            let titleWithColor = (productData as any).name || productData.title;

            if (item.selectedColor && productData.variants) {
                const variant = productData.variants.find((v: any) => v.color === item.selectedColor);
                if (variant && variant.stock !== undefined) {
                    availableStock = variant.stock;
                    titleWithColor += ` - ${item.selectedColor}`;
                }
            }

            // Validate Stock
            if (availableStock < item.quantity) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: `Insufficient stock for product ${titleWithColor}` }) };
            }

            let unitPrice = Number(productData.price);
            if (applyComboDiscount) {
                // Apply 5% discount proportionally to each item
                unitPrice = Number((unitPrice * 0.95).toFixed(2));
            }

            preferenceItems.push({
                id: item.id,
                title: applyComboDiscount ? `${titleWithColor} (Combo 5% OFF)` : titleWithColor,
                description: item.selectedColor ? `Cor/Variação: ${item.selectedColor}` : (productData.description || ""),
                picture_url: productData.images ? productData.images[0] : "",
                category_id: productData.category || "electronics",
                quantity: item.quantity,
                currency_id: "BRL",
                unit_price: unitPrice,
            });
        }

        // Add Shipping as an item if applicable
        const finalShippingCost = shippingCost || 0;
        if (finalShippingCost > 0) {
            preferenceItems.push({
                id: 'shipping',
                title: `Frete - ${customer.neighborhood || 'Local'}`,
                description: 'Taxa de Entrega',
                category_id: 'others',
                quantity: 1,
                currency_id: 'BRL',
                unit_price: Number(finalShippingCost)
            });
        }

        // Pre-save exactly the intention to the DB
        const saleRef = db.collection("sales").doc();
        await saleRef.set({
            status: "pending_payment",
            customer,
            items,
            shippingCost: finalShippingCost,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // BACKGROUND TASK: Notify admin about the checkout initiation (Abandoned Cart tracking)
        const formatPhone = (phone?: string) => {
            if (!phone) return "Não informado";
            // Remove everything that is not a number
            const number = phone.replace(/\D/g, '');
            const objPhone = `[${phone}](https://api.whatsapp.com/send?phone=55${number})`;
            return objPhone;
        };

        const totalOrderValue = preferenceItems.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0) + finalShippingCost;

        const telegramMessage = `🛒 *Checkout Iniciado (Possível Carrinho Abandonado)*
        
*Cliente:* ${customer.name}
*Telefone/WhatsApp:* ${formatPhone(customer.phone)}
*Email:* ${customer.email}

*Valor do Pedido:* R$ ${totalOrderValue.toFixed(2).replace('.', ',')}
*Bairro (Frete):* ${customer.neighborhood || 'Não informado'}

Se o pagamento não for confirmado nos próximos 15 minutos, você pode usar o link de WhatsApp acima para recuperar a venda!
ID Temp: \`${saleRef.id}\``;

        // Fire and forget, don't block the checkout flow
        sendTelegramNotification(telegramMessage).catch(console.error);

        // Force HTTPS URL for testing MP Validation rules
        const baseUrl = "https://rionove.com";

        const preferenceBody = {
            items: preferenceItems,
            payer: {
                email: customer.email,
                name: customer.name,
            },
            external_reference: saleRef.id,
            back_urls: {
                success: `${baseUrl}/success`,
                failure: `${baseUrl}/failure`,
                pending: `${baseUrl}/pending`
            },
            auto_return: "approved",
            // The webhook URL that MercadoPago will hit for status updates.
            // MP requires HTTPS, so locally it won't trigger the webhook, but we need it here.
            notification_url: "https://rionove.com/.netlify/functions/mercadoPagoWebhook"
        };

        console.log("Creating MP preference with body:", JSON.stringify(preferenceBody, null, 2));

        // Create preference on Mercado Pago
        const preference = new Preference(client);
        const prefResponse = await preference.create({
            body: preferenceBody
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                preferenceId: prefResponse.id,
            })
        };

    } catch (error) {
        console.error("Error creating preference:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Internal Server Error creating preference" })
        };
    }
};
