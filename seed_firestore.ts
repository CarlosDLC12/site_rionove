import admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin
try {
    let envVal = process.env.FIREBASE_SERVICE_ACCOUNT || '{}';
    if (envVal.startsWith("'") && envVal.endsWith("'")) {
        envVal = envVal.slice(1, -1);
    }
    const serviceAccount = JSON.parse(envVal);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} catch (error) {
    console.error("Error initializing Firebase Admin", error);
    process.exit(1);
}

const db = admin.firestore();

const productsToSeed = [
    {
        id: 'colmi-p71', // Real ID in db
        title: 'Smartwatch Colmi P71',
        slug: 'smartwatch-colmi-p71-porto-velho',
        price: 100.00,
        old_price: 130.00,
        image_url: '/products/colmi-p71-front.jpg',
        images: ['/products/colmi-p71-front.jpg', '/products/colmi-p71-back.jpg', '/products/colmi-p71-side.png'],
        description: 'O campeão de vendas em Porto Velho. Resistente, elegante e com bateria para a semana toda.',
        featured: true,
        category: 'Smartwatch',
        active: true,
        specs: ['Tela HD 1.9"', 'Faz Ligações', 'Monitor Cardíaco', 'Bateria 7 dias'],
        technicalSpecs: {
            display: 'Tela IPS 1.9" HD (240x280 pixels)',
            battery: 'Bateria 300mAh - Até 7 dias de uso',
            connectivity: 'Bluetooth 5.0',
            compatibility: 'Android 5.0+ e iOS 9.0+',
            sensors: 'Monitor cardíaco, Pedômetro, Oxímetro, Monitor de sono',
            waterproof: 'IP68 - Resistente à água e poeira',
            features: 'Atende chamadas, Notificações, Múltiplos modos esportivos, Controle de música',
            dimensions: '44mm x 38mm x 10.5mm',
            weight: '52g (com pulseira)'
        },
        stock: 3, // Total stock (1 black + 2 blue)
        variants: [
            {
                color: 'Preto',
                colorHex: '#000000',
                stock: 1, // User's requested stock
                images: ['/products/colmi-p71-front.jpg', '/products/colmi-p71-back.jpg', '/products/colmi-p71-side.png']
            },
            {
                color: 'Azul',
                colorHex: '#1E40AF',
                stock: 2, // User's requested stock
                images: ['/products/colmi_p71_azul_1.jpeg', '/products/colmi_p71_azul_2.jpeg', '/products/colmi_p71_azul_3.jpeg']
            }
        ]
    },
    {
        id: 'baseus-c17',
        title: 'Fones de Ouvido Baseus Encok C17 (P2 Type-C)',
        slug: 'fones-de-ouvido-baseus-c17-porto-velho',
        price: 60.00,
        old_price: 80.00,
        image_url: '/products/c17_white_2.jpg',
        images: ['/products/c17_white_2.jpg', '/products/c17_white_3.jpg', '/products/c17_white_1.jpg'],
        description: 'Fones de ouvido com entrada Tipo-C (Type-C) perfeitos para dispositivos modernos. Possuem microfones omnidirecionais de alta sensibilidade para chamadas em alta definição, garantindo clareza e imersão.',
        featured: false,
        category: 'Áudio',
        active: true,
        specs: ['Conector Tipo-C', 'Microfone de Alta Definição', 'Isolamento de Ruído'],
        technicalSpecs: {
            display: 'Lateral In-Ear (Design Ergonômico)',
            battery: 'Com Fio (Sem necessidade de bateria)',
            connectivity: 'Conector Type-C Plug and Play',
            compatibility: 'Tablets, Smartphones com entrada Tipo C e Laptops',
            sensors: 'Microfones Omnidirecionais de Alta Sensibilidade',
            waterproof: 'Resistente a respingos',
            features: 'Atendimento de chamadas (High Definition Voice Calling), Controle de volume integrado no cabo',
            dimensions: 'Cabo de 1.1 Metros',
            weight: 'Aproximadamente 12g'
        },
        stock: 4,
        variants: [
            {
                color: 'Branco',
                colorHex: '#FFFFFF',
                stock: 4,
                images: ['/products/c17_white_2.jpg', '/products/c17_white_3.jpg', '/products/c17_white_1.jpg']
            }
        ]
    },
    {
        id: 'pulseira-22mm',
        title: 'Pulseiras para Smartwatch 22mm',
        slug: 'pulseira-smartwatch-22mm-silicone',
        price: 25.00,
        old_price: 45.00,
        image_url: '/products/pulseira_preta.png',
        images: ['/products/pulseira_preta.png'],
        description: 'Pulseiras de silicone premium para smartwatches de 22mm. Confortáveis, duráveis e estilosas.',
        featured: false,
        category: 'Acessórios',
        active: true,
        specs: ['Silicone Premium', 'Compatível 22mm', 'Resistente à Água', 'Fácil Instalação'],
        stock: 8, // 1 + 2 + 2 + 2 + 1
        variants: [
            { color: 'Preta', colorHex: '#000000', stock: 1, images: ['/products/pulseira_preta.png'] },
            { color: 'Bege', colorHex: '#F5F5DC', stock: 2, images: ['/products/pulseira_starlight.png'] }, // using starlight as beige
            { color: 'Branca', colorHex: '#FFFFFF', stock: 2, images: ['/products/pulseira_branca.png'] },
            { color: 'Cinza', colorHex: '#808080', stock: 2, images: ['/products/pulseira_cinza.png'] },
            { color: 'Vermelha', colorHex: '#FF0000', stock: 1, images: ['/products/pulseira_vinho.png'] } // using vinho as red
        ]
    }
];

async function seed() {
    try {
        console.log("Starting database seed...");
        for (const product of productsToSeed) {
            console.log(`Adding ${product.title}...`);
            const { id, ...dataToSave } = product;
            await db.collection("products").doc(id).set(dataToSave);
        }
        console.log("Database seeded successfully with exact variants!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seed();
