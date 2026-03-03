import { Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';

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

export const handler: Handler = async (event) => {
    // CORS configuration
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
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

        const { orderId, email } = JSON.parse(event.body) as { orderId: string, email: string };

        if (!orderId || !email) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: "orderId and email are required" }) };
        }

        const saleRef = db.collection("sales").doc(orderId);
        const saleSnap = await saleRef.get();

        if (!saleSnap.exists) {
            return { statusCode: 404, headers, body: JSON.stringify({ error: "Pedido não encontrado." }) };
        }

        const saleData = saleSnap.data();

        // Security check: ensure the email matches the order's email
        if (saleData?.customer?.email?.toLowerCase() !== email.toLowerCase()) {
            return { statusCode: 401, headers, body: JSON.stringify({ error: "E-mail não corresponde ao pedido." }) };
        }

        // Return safe tracking data (no payment gateway secrets, just status and items)
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                orderId: saleSnap.id,
                status: saleData.status, // "pending_payment", "approved", "shipped", "delivered"
                createdAt: saleData.createdAt ? saleData.createdAt.toDate().toISOString() : null,
                items: saleData.items,
                shippingCost: saleData.shippingCost,
                customerName: saleData.customer?.name,
            })
        };

    } catch (error) {
        console.error("Error fetching order status:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};
