import * as https from 'https';

const BOT_TOKEN = '8703541180:AAHd6Hdj5nCnzzXAaskAPKEUHKyRLPHnlAU';

https.get(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            if (parsed.ok && parsed.result.length > 0) {
                const chatId = parsed.result[parsed.result.length - 1].message.chat.id;
                console.log('Chat ID encontrado:', chatId);
            } else {
                console.log('Nenhuma mensagem encontrada ou erro na requisição:', parsed);
            }
        } catch (e) {
            console.error('Erro ao fazer parse JSON:', e);
        }
    });
}).on('error', (e) => {
    console.error('Erro na requisição HTTPS:', e);
});
