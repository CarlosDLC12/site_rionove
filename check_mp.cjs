require('dotenv').config();
const { MercadoPagoConfig, PaymentMethod } = require('mercadopago');

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || "TEST_ACCESS_TOKEN";
const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });

async function main() {
    try {
        const fetch = require('node-fetch');
        const response = await fetch("https://api.mercadopago.com/v1/payment_methods", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const methods = await response.json();

        const pix = methods.find(m => m.id === "pix");
        if (pix) {
            console.log("Pix is available!");
            console.log(JSON.stringify(pix, null, 2));
        } else {
            console.log("Pix is NOT available in the list of payment methods:");
            console.log(methods.map(m => m.id).join(", "));
        }

    } catch (e) {
        console.error(e);
    }
}

main();
