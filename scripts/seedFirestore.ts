import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { MOCK_PRODUCTS } from '../src/data/mockProducts';

dotenv.config();

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function seed() {
    console.log("Seeding mock products to Firestore...");
    for (const product of MOCK_PRODUCTS) {
        // Ensure active is set to true so the UI can fetch them
        const productData = { ...product, active: true };
        await db.collection("products").doc(product.id).set(productData);
        console.log(`Seeded product: ${product.title} (ID: ${product.id})`);
    }
    console.log("Seeding complete!");
}

seed().catch(console.error);
