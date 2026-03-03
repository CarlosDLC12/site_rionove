import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function createMockOrder() {
    try {
        const saleRef = db.collection("sales").doc("TESTE_E2E_123");
        await saleRef.set({
            status: "shipped",
            customer: {
                name: "Teste Final E2E",
                email: "teste.e2e@rionove.com",
                phone: "69999999999",
                address: "Rua Test",
                number: "123",
                neighborhood: "Aeroclube"
            },
            items: [
                { id: "P71", title: "Smartwatch Colmi P71", quantity: 1, unit_price: 100 }
            ],
            shippingCost: 10,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log("Mock order created! ID: TESTE_E2E_123");
        process.exit(0);
    } catch (e) {
        console.error("Failed:", e);
        process.exit(1);
    }
}

createMockOrder();
