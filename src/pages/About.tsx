import { Layout } from '../components/layout/Layout';
import { ShieldCheck, MapPin, Users, Truck } from 'lucide-react';
import { WhyBuySection } from '../components/sections/WhyBuySection';

export const About = () => {
    return (
        <Layout>
            <div className="bg-light min-h-screen pt-24 pb-12">
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fade-in-up">
                        <span className="text-accent font-bold tracking-widest uppercase text-xs">Nossa História</span>
                        <h1 className="font-serif text-4xl md:text-5xl text-dark font-bold mt-2">
                            De Porto Velho para <span className="text-accent italic">Porto Velho</span>.
                        </h1>
                        <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
                    </div>

                    {/* Content */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20 animate-fade-in">
                        <div className="relative">
                            <div className="absolute inset-0 bg-accent/10 rounded-2xl transform translate-x-4 translate-y-4"></div>
                            <img
                                src="/about-tech.png"
                                alt="Equipe Rionove"
                                className="relative rounded-2xl shadow-xl w-full object-cover h-[400px]"
                            />
                        </div>
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-dark mb-4">Mais que uma loja online.</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                A Rionove nasceu de uma frustração comum: a demora e a incerteza de comprar tecnologia pela internet vivendo no Norte.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Decidimos mudar isso. Criamos uma boutique de tecnologia local, com estoque real em Porto Velho e atendimento humanizado. Sem robôs, sem espera de semanas.
                            </p>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Nossa missão é trazer o que há de mais moderno no mundo para o seu pulso e seus ouvidos, hoje mesmo.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="grid md:grid-cols-2 gap-6 mb-20">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-accent/30 transition-colors">
                            <MapPin className="w-8 h-8 text-accent mb-4" />
                            <h3 className="font-serif text-xl font-bold text-dark mb-2">DNA Local</h3>
                            <p className="text-gray-500 text-sm">Conhecemos nossa cidade e nossos clientes. Entregamos onde você estiver, do Centro à Zona Leste.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-accent/30 transition-colors">
                            <ShieldCheck className="w-8 h-8 text-accent mb-4" />
                            <h3 className="font-serif text-xl font-bold text-dark mb-2">Garantia Real</h3>
                            <p className="text-gray-500 text-sm">Problemas acontecem. A diferença é que nós resolvemos rápido, sem burocracia de correios.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-accent/30 transition-colors">
                            <Users className="w-8 h-8 text-accent mb-4" />
                            <h3 className="font-serif text-xl font-bold text-dark mb-2">Atendimento Humano</h3>
                            <p className="text-gray-500 text-sm">Chame no WhatsApp e fale com gente de verdade. Tiramos dúvidas, mandamos vídeos e ajudamos você a escolher.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-accent/30 transition-colors">
                            <Truck className="w-8 h-8 text-accent mb-4" />
                            <h3 className="font-serif text-xl font-bold text-dark mb-2">Agilidade</h3>
                            <p className="text-gray-500 text-sm">Comprou até as 16h? Recebe no mesmo dia. Simples assim.</p>
                        </div>
                    </div>

                </div>
            </div>

            <WhyBuySection />
        </Layout>
    );
};
