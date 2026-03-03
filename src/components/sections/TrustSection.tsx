import { ShieldCheck, Truck, CreditCard, Award } from 'lucide-react';

export const TrustSection = () => {
    const items = [
        {
            icon: <Award className="w-7 h-7" />,
            title: "Curadoria Premium",
            desc: "Produtos testados e aprovados. Só vendemos o que usaríamos."
        },
        {
            icon: <Truck className="w-7 h-7" />,
            title: "Entrega Local",
            desc: "Receba hoje mesmo em Porto Velho. Sem espera de correios."
        },
        {
            icon: <CreditCard className="w-7 h-7" />,
            title: "Pagamento Seguro",
            desc: "Pague com Pix ou Cartão de forma 100% segura. Zero risco para você."
        },
        {
            icon: <ShieldCheck className="w-7 h-7" />,
            title: "Garantia Real",
            desc: "Garantia de 30 dias com troca fácil direto conosco."
        }
    ];

    return (
        <section className="bg-light py-20">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-dark font-bold">
                        Por que Porto Velho escolhe a Rionove?
                    </h2>
                    <div className="w-24 h-1 bg-accent mx-auto mt-4"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                            <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                {item.icon}
                            </div>
                            <h3 className="font-serif text-xl font-bold text-dark text-center">{item.title}</h3>
                            <p className="font-sans text-sm text-gray-600 text-center mt-3 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
