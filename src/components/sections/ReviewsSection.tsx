import { Star } from 'lucide-react';

interface Review {
    id: string;
    name: string;
    location: string;
    rating: number;
    date: string;
    comment: string;
    product?: string;
    verified?: boolean;
}

const REVIEWS: Review[] = [
    {
        id: '1',
        name: 'Carlos M.',
        location: 'Caladinho',
        rating: 5,
        date: '2026-02-27T10:00:00Z', // Há 2 dias
        comment: 'Smartwatch Colmi P71 é excelente! Bateria dura mesmo 7 dias e as ligações funcionam perfeitamente. Entrega foi super rápida, chegou no mesmo dia.',
        product: 'Smartwatch Colmi P71',
        verified: true
    },
    {
        id: '2',
        name: 'Ana Paula S.',
        location: 'Zona Sul',
        rating: 5,
        date: '2026-02-24T14:30:00Z', // Há 5 dias
        comment: 'Comprei o fone Lenovo GM2 Pro e estou impressionada com a qualidade do som. Graves potentes e o modo gamer realmente tem baixa latência. Recomendo!',
        product: 'Fone Lenovo GM2 Pro',
        verified: true
    },
    {
        id: '3',
        name: 'Roberto L.',
        location: 'Jatuarana',
        rating: 5,
        date: '2026-02-22T09:15:00Z', // Há 1 semana
        comment: 'Melhor loja de eletrônicos de Porto Velho! Atendimento nota 10 no WhatsApp, tiraram todas minhas dúvidas. O smartwatch chegou perfeito.',
        verified: true
    },
    {
        id: '4',
        name: 'Juliana F.',
        location: 'Centro',
        rating: 4,
        date: '2026-02-21T16:45:00Z', // Há 1 semana
        comment: 'Pulseira de silicone muito boa, confortável e bonita. Única observação é que demorou 1 dia para chegar no Centro, mas valeu a pena.',
        product: 'Pulseira Smartwatch 22mm',
        verified: true
    },
    {
        id: '5',
        name: 'Marcos V.',
        location: 'Zona Leste',
        rating: 5,
        date: '2026-02-15T11:20:00Z', // Há 2 semanas
        comment: 'Comprei o kit completo (smartwatch + fone) e economizei bastante. Produtos originais, garantia de 30 dias. Muito satisfeito!',
        product: 'Kit Completo',
        verified: true
    },
    {
        id: '6',
        name: 'Patricia R.',
        location: 'Cohab',
        rating: 5,
        date: '2026-02-14T08:00:00Z', // Há 2 semanas
        comment: 'Entrega super rápida! Comprei às 15h e recebi às 18h. O Colmi P71 na cor lilás ficou lindo, exatamente como nas fotos.',
        product: 'Smartwatch Colmi P71',
        verified: true
    },
    {
        id: '7',
        name: 'Fernando A.',
        location: 'Zona Norte',
        rating: 5,
        date: '2026-02-08T13:10:00Z', // Há 3 semanas
        comment: 'Fone bluetooth top! Uso para treinar e a resistência ao suor é excelente. Bateria dura muito tempo.',
        product: 'Fone Lenovo GM2 Pro',
        verified: true
    },
    {
        id: '8',
        name: 'Camila S.',
        location: 'Caladinho',
        rating: 5,
        date: '2026-01-30T10:00:00Z', // Há 1 mês
        comment: 'Já é minha segunda compra na Rionove. Confiança total! Produtos de qualidade e preço justo.',
        verified: true
    }
];

const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `Há ${diffDays} dias`;
    if (diffDays < 14) return 'Há 1 semana';
    if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 60) return 'Há 1 mês';
    return `Há ${Math.floor(diffDays / 30)} meses`;
};

export const ReviewsSection = () => {
    const averageRating = REVIEWS.reduce((acc, review) => acc + review.rating, 0) / REVIEWS.length;
    const totalReviews = REVIEWS.length;

    return (
        <section className="bg-gray-50 py-20 border-t border-gray-100">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-12">
                    <span className="text-accent font-bold tracking-widest uppercase text-xs">Avaliações</span>
                    <h2 className="font-serif text-4xl font-bold text-dark mt-2">O Que Nossos Clientes Dizem</h2>

                    {/* Rating Summary */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-6 h-6 ${star <= Math.round(averageRating) ? 'fill-accent text-accent' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-3xl font-bold text-dark">{averageRating.toFixed(1)}</span>
                        </div>
                        <div className="text-gray-600">
                            <p className="font-medium">{totalReviews} avaliações</p>
                            <p className="text-sm">Avaliações verificadas</p>
                        </div>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="font-bold text-dark">{review.name}</h4>
                                    <p className="text-sm text-gray-500">{review.location} • {formatTimeAgo(review.date)}</p>
                                </div>
                                {review.verified && (
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                        Verificado
                                    </span>
                                )}
                            </div>

                            {/* Stars */}
                            <div className="flex mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= review.rating ? 'fill-accent text-accent' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>

                            {/* Product */}
                            {review.product && (
                                <p className="text-xs text-gray-500 mb-2 font-medium">{review.product}</p>
                            )}

                            {/* Comment */}
                            <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center bg-white p-8 rounded-2xl border border-gray-200">
                    <h3 className="font-serif text-2xl font-bold text-dark mb-2">
                        Clientes Satisfeitos em Porto Velho
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Faça parte da família Rionove e receba seu produto com entrega rápida em Porto Velho
                    </p>
                    <a
                        href="#collection"
                        className="inline-block bg-accent text-primary font-bold py-4 px-10 rounded-full shadow-lg hover:bg-accent/90 transition-all transform hover:-translate-y-1"
                    >
                        Ver Produtos
                    </a>
                </div>
            </div>
        </section>
    );
};
