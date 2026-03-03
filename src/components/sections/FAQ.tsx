import { MessageCircle, Star, Shield } from 'lucide-react';

export const FAQ = () => {
    const faqs = [
        {
            question: "Qual o melhor smartwatch em Porto Velho?",
            answer: "O Colmi P71 é o campeão de vendas! Com tela HD 1.9\", faz ligações, monitora batimentos cardíacos e tem bateria de 7 dias. Perfeito para o clima de Porto Velho."
        },
        {
            question: "Vocês entregam no mesmo dia?",
            answer: "Sim! Compras até 18h são entregadas no mesmo dia para Zona Sul (Caladinho, Jatuarana, Cohab). Outras regiões recebem em até 24h via 99 Moto."
        },
        {
            question: "Os produtos têm garantia?",
            answer: "Todos os produtos têm garantia de 30 dias. Se houver qualquer problema, resolvemos rápido, sem burocracia de correios."
        },
        {
            question: "Como funciona o pagamento?",
            answer: "Aceitamos PIX, cartão de crédito via link de pagamento e dinheiro (somente para retirada no endereço: Rua Abílio Nascimento, 4789 - Caladinho). Pagamento 100% seguro."
        },
        {
            question: "As pulseiras servem em qualquer smartwatch?",
            answer: "Nossas pulseiras são para smartwatches de 22mm. Compatíveis com Colmi P71, Apple Watch 38/40/41mm, Galaxy Watch e outros modelos populares."
        },
        {
            question: "Posso trocar a cor depois de comprar?",
            answer: "Sim! Você tem 7 dias para trocar a cor ou modelo, desde que o produto esteja sem uso e na embalagem original."
        }
    ];

    return (
        <section className="bg-white py-20 border-t border-gray-100">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="text-accent font-bold tracking-widest uppercase text-xs">Dúvidas Frequentes</span>
                    <h2 className="font-serif text-4xl font-bold text-dark mt-2">Perguntas e Respostas</h2>
                    <p className="text-gray-600 mt-4">Tudo que você precisa saber antes de comprar</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details key={index} className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <h3 className="font-bold text-dark text-lg pr-4">{faq.question}</h3>
                                <span className="text-accent text-2xl group-open:rotate-45 transition-transform">+</span>
                            </summary>
                            <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
                        </details>
                    ))}
                </div>

                <div className="mt-12 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 text-center">
                    <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-dark mb-2">Ainda tem dúvidas?</h3>
                    <p className="text-gray-600 mb-6">Fale com a gente no WhatsApp e tire todas as suas dúvidas!</p>
                    <a
                        href="https://wa.me/5569993947389?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20os%20produtos."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-all"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Chamar no WhatsApp
                    </a>
                </div>

                {/* Trust Badges */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="text-center p-6">
                        <Star className="w-10 h-10 text-accent mx-auto mb-3" />
                        <h4 className="font-bold text-dark mb-2">Produtos Originais</h4>
                        <p className="text-sm text-gray-600">100% importados e verificados</p>
                    </div>
                    <div className="text-center p-6">
                        <Shield className="w-10 h-10 text-accent mx-auto mb-3" />
                        <h4 className="font-bold text-dark mb-2">Garantia 30 Dias</h4>
                        <p className="text-sm text-gray-600">Assistência local em PVH</p>
                    </div>
                    <div className="text-center p-6">
                        <MessageCircle className="w-10 h-10 text-accent mx-auto mb-3" />
                        <h4 className="font-bold text-dark mb-2">Suporte Rápido</h4>
                        <p className="text-sm text-gray-600">Resposta em minutos</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
