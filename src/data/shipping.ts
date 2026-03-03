export interface ShippingZone {
    name: string;
    description: string;
    cost: number;
    neighborhoods: string[];
}

// Loja na Rua Abílio Nascimento, 4789 - Caladinho
export const SHIPPING_ZONES: ShippingZone[] = [
    {
        name: 'Retirada na Loja',
        description: 'Retirar pessoalmente no Caladinho',
        cost: 0,
        neighborhoods: ['Retirada no Caladinho']
    },
    {
        name: 'Zona Sul - Vizinhança',
        description: 'Entregas próximas à região Sul (Caladinho)',
        cost: 5.00,
        neighborhoods: [
            'Caladinho',
            'Conceição',
            'Nova Floresta',
            'Cidade do Lobo',
            'Novo Horizonte',
            'Castanheira',
            'Aeroclube',
            'Cohab',
            'Eletronorte'
        ]
    },
    {
        name: 'Zona Sul - Intermediária',
        description: 'Bairros mais afastados da Zona Sul',
        cost: 10.00,
        neighborhoods: [
            'Três Marias',
            'Tiradentes',
            'Tupi',
            'Areia Branca',
            'Tucumanzal',
            'Ulysses Guimarães',
            'Mariana' // Some borders
        ]
    },
    {
        name: 'Zona Central / Leste / Norte',
        description: 'Área Central, Zona Leste e Zona Norte de Porto Velho',
        cost: 15.00,
        neighborhoods: [
            'Olaria',
            'Centro',
            'Arigolândia',
            'Pedrinhas',
            'Baixa da União',
            'Caiari',
            'Nossa Senhora das Graças',
            'Areal',
            'Mato Grosso',
            'Roque',
            'Nova Porto Velho',
            'Agenor de Carvalho',
            'Flodoaldo Pontes Pinto',
            'Lagoa',
            'Lagoinha',
            'Rio Madeira',
            'Embratel',
            'Nacional',
            'Costa e Silva',
            'São João Bosco',
            'Liberdade',
            'Igarape',
            'São Cristóvão',
            'Aponiã',
            'Cuniã',
            'Igarapé',
            'Tiradentes',
            'JK',
            'Socialista',
            'Jardim Santana',
            'Cascalheira',
            'Esperança da Comunidade',
            'Teixeirão',
            'Planalto'
        ]
    },
    {
        name: 'Bairros Distantes / Residenciais / Condomínios Fechados',
        description: 'Bairros do extremo Leste, Norte e Empreendimentos Distantes',
        cost: 20.00,
        neighborhoods: [
            'Bairro Novo',
            'Cristal da Calama',
            'Alphaville',
            'Verano',
            'Ecoville',
            'Orgulho do Madeira',
            'Bosques do Madeira',
            'Areal da Floresta',
            'Ulisses Guimarães'
        ]
    },
    {
        name: 'Outro Bairro',
        description: 'Não encontrou seu bairro? Taxa padrão para demais localidades.',
        cost: 15.00,
        neighborhoods: ['Meu Bairro Não Está na Lista']
    }
];

export const getAllNeighborhoods = () => {
    return SHIPPING_ZONES.flatMap(zone => zone.neighborhoods).sort((a, b) => {
        // Keep Retirada and Outro Bairro at specific positions
        if (a === 'Retirada no Caladinho') return -1;
        if (b === 'Retirada no Caladinho') return 1;
        if (a === 'Meu Bairro Não Está na Lista') return 1;
        if (b === 'Meu Bairro Não Está na Lista') return -1;

        return a.localeCompare(b);
    });
};

export const getShippingCost = (neighborhood: string): number => {
    const zone = SHIPPING_ZONES.find(z => z.neighborhoods.includes(neighborhood));
    return zone ? zone.cost : 15.00; // default safe fallback
};
