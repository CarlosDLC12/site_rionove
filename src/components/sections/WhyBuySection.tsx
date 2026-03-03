export const WhyBuySection = () => {
    return (
        <section id="about" className="bg-gradient-to-b from-white to-gray-50 py-20">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-12">
                    <span className="text-accent font-bold tracking-widest uppercase text-xs">Por que escolher a Rionove?</span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mt-2">
                        A Melhor Loja de Eletrônicos de Porto Velho
                    </h2>
                </div>

                <div className="prose prose-lg max-w-4xl mx-auto text-gray-700 leading-relaxed">
                    <p className="text-xl text-center mb-8">
                        Somos a <strong>primeira loja especializada em smartwatches e fones bluetooth</strong> de Porto Velho,
                        trazendo tecnologia de ponta com <strong>entrega no mesmo dia</strong> para você.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-serif text-2xl font-bold text-dark mb-4">Entrega Mais Rápida de Porto Velho</h3>
                            <p>
                                Chega de esperar semanas! Comprou até 16h? <strong>Recebe hoje mesmo</strong> se você mora na Zona Sul
                                (Caladinho, Jatuarana, Cohab). Para outras regiões, entregamos em até 24 horas via 99 Moto.
                            </p>
                            <p className="mt-4">
                                Enquanto outras lojas online demoram 7-15 dias, nós entregamos em <strong>horas</strong>.
                                Isso é ser local, isso é Rionove.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-serif text-2xl font-bold text-dark mb-4">Produtos Originais e Garantidos</h3>
                            <p>
                                Todos os nossos <strong>smartwatches Colmi P71</strong>, <strong>fones Lenovo GM2 Pro</strong> e
                                <strong> pulseiras de silicone</strong> são 100% originais e importados diretamente.
                            </p>
                            <p className="mt-4">
                                Oferecemos <strong>garantia de 30 dias</strong> em todos os produtos. Se der problema,
                                você não precisa mandar pelos correios - resolve aqui mesmo em Porto Velho!
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-serif text-2xl font-bold text-dark mb-4">Preço Justo e Transparente</h3>
                            <p>
                                Sem taxas escondidas, sem frete abusivo. O que você vê é o que você paga.
                                <strong> Smartwatch a partir de R$100</strong>, <strong>fones por R$60</strong> e
                                <strong> pulseiras por apenas R$25</strong>.
                            </p>
                            <p className="mt-4">
                                Aceitamos <strong>PIX, dinheiro e cartão</strong> na entrega. Sem complicação!
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-serif text-2xl font-bold text-dark mb-4">Atendimento Humanizado</h3>
                            <p>
                                Chame no WhatsApp e fale com <strong>gente de verdade</strong>, não com robôs.
                                Tiramos suas dúvidas, mandamos vídeos dos produtos e ajudamos você a escolher o melhor smartwatch.
                            </p>
                            <p className="mt-4">
                                Somos de Porto Velho, conhecemos nossa cidade e nossos clientes.
                                Aqui você não é só um número de pedido.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 bg-accent/10 p-8 rounded-2xl text-center">
                        <h3 className="font-serif text-3xl font-bold text-dark mb-4">
                            Clientes Satisfeitos em Todo Porto Velho
                        </h3>
                        <p className="text-lg">
                            Seja você também parte da família Rionove. Compre seu <strong>smartwatch</strong>,
                            <strong> fone bluetooth</strong> ou <strong>pulseira</strong> com quem entende de tecnologia
                            e está pertinho de você.
                        </p>
                        <a
                            href="#collection"
                            className="inline-block mt-6 bg-accent text-primary font-bold py-4 px-10 rounded-full shadow-lg hover:bg-accent/90 transition-all transform hover:-translate-y-1"
                        >
                            Ver Produtos Agora
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
