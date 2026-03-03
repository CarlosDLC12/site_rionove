import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-5633486629787640-022623-fd3805ad472a87251621dc7592ee72c6-3230832088', options: { timeout: 5000 } });

async function test() {
    try {
        const preference = new Preference(client);
        const prefBody = {
            items: [{
                id: "1",
                title: "Test",
                quantity: 1,
                currency_id: "BRL",
                unit_price: 10
            }],
            payer: {
                email: "test@test.com",
            },
            back_urls: {
                success: "https://rionove.com/success",
                failure: "https://rionove.com/failure",
                pending: "https://rionove.com/pending"
            },
            auto_return: "approved"
        };
        const result = await preference.create({ body: prefBody as any });
        console.log("Success:", result.id);
    } catch (e: any) {
        console.error("Error creating with back_urls:", e.message || e);
    }
}

test();
