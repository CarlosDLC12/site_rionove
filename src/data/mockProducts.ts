import type { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Smartwatch Colmi P71',
        slug: 'smartwatch-colmi-p71-porto-velho',
        price: 100.00,
        old_price: 130.00,
        image_url: '/products/colmi-p71-front.jpg',
        images: ['/products/colmi-p71-front.jpg', '/products/colmi-p71-back.jpg', '/products/colmi-p71-side.png'],
        description: 'O campeão de vendas em Porto Velho. Resistente, elegante e com bateria para a semana toda.',
        featured: true,
        category: 'Smartwatch',
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
        variants: [
            {
                color: 'Preto',
                colorHex: '#000000',
                images: ['/products/colmi-p71-front.jpg', '/products/colmi-p71-back.jpg', '/products/colmi-p71-side.png']
            },
            {
                color: 'Azul',
                colorHex: '#1E40AF',
                images: ['/products/colmi_p71_azul_1.jpeg', '/products/colmi_p71_azul_2.jpeg', '/products/colmi_p71_azul_3.jpeg']
            },
            {
                color: 'Lilás',
                colorHex: '#9333EA',
                images: ['/products/colmi_p71_roxo_1.jpeg', '/products/colmi_p71_roxo_2.jpeg', '/products/colmi_p71_roxo_3.jpeg']
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
        variants: [
            {
                color: 'Branco',
                colorHex: '#FFFFFF',
                images: ['/products/c17_white_1.jpg', '/products/c17_white_2.jpg', '/products/c17_white_3.jpg']
            }
        ]
    },

    {
        id: '4',
        title: 'Pulseiras para Smartwatch 22mm',
        slug: 'pulseira-smartwatch-22mm-silicone',
        price: 25.00,
        old_price: 45.00,
        image_url: '/products/pulseira_preta.png',
        images: ['/products/pulseira_preta.png'],
        description: 'Pulseiras de silicone premium para smartwatches de 22mm. Confortáveis, duráveis e estilosas.',
        featured: false,
        category: 'Acessórios',
        specs: ['Silicone Premium', 'Compatível 22mm', 'Resistente à Água', 'Fácil Instalação'],
        technicalSpecs: {
            material: 'Silicone de alta qualidade (hipoalergênico)',
            width: '22mm',
            length: 'Ajustável: 140mm - 220mm (pulso)',
            compatibility: 'Smartwatches 22mm: Colmi P71, Apple Watch 38/40/41mm, Galaxy Watch, Amazfit, Xiaomi',
            waterproof: 'Resistente à água e suor',
            colors: '7 cores disponíveis',
            installation: 'Sistema de encaixe rápido (quick release)',
            weight: '18g'
        },
        variants: [
            { color: 'Preta', colorHex: '#000000', images: ['/products/pulseira_preta.png'] },
            { color: 'Branca', colorHex: '#F5F5F5', images: ['/products/pulseira_branca.png'] },
            { color: 'Azul', colorHex: '#1E40AF', images: ['/products/pulseira_azul.png'] },
            { color: 'Rosa', colorHex: '#EC4899', images: ['/products/pulseira_rosa.png'] },
            { color: 'Cinza', colorHex: '#6B7280', images: ['/products/pulseira_cinza.png'] },
            { color: 'Starlight', colorHex: '#FFF8DC', images: ['/products/pulseira_starlight.png'] },
            { color: 'Vinho', colorHex: '#7C2D3E', images: ['/products/pulseira_vinho.png'] }
        ]
    }
];
