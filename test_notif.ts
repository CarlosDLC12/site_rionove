const telegramBotToken = "8703541180:AAHd6Hdj5nCnzzXAaskAPKEUHKyRLPHnlAU";
const telegramChatId = "5078547234";
const resendApiKey = "re_PfLQdZ5g_JL1RycPQcYKSYnB4dj4omazt";

const payerEmail = "contato@rionove.com.br"; // Um email de teste
const totalAmount = 160.00;

const items = [
    { title: "Smartwatch Colmi P71", quantity: 1 },
    { title: "Fone Bluetooth Baseus C17", quantity: 1 }
];

const itemsListTxt = items.map((i: any) => `- ${i.quantity}x ${i.title}`).join('\n');
const itemsListHtml = items.map((i: any) => `<li>${i.quantity}x ${i.title}</li>`).join('');

async function testNotif() {
    console.log("Enviando Telegram...");
    const telegramMessage = `🛍️ *NOVA VENDA RIONOVE (TESTE)!*\n\n` +
        `*Cliente:* ${payerEmail}\n` +
        `*Valor Total:* R$ ${(totalAmount || 0).toFixed(2).replace('.', ',')}\n` +
        `*Itens:*\n${itemsListTxt}\n\n` +
        `Acesse o sistema de gestão para conferir o endereço de entrega e despachar!`;

    await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramMessage,
            parse_mode: 'Markdown'
        })
    }).then(res => res.json()).then(console.log).catch(console.error);

    console.log("Enviando Email via Resend...");
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
                    
                    <h3>Resumo dos Itens (TESTE):</h3>
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
    }).then(res => res.json()).then(console.log).catch(console.error);
}

testNotif();
