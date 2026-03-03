import { Layout } from '../components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { Clock, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Blog = () => {
    return (
        <Layout>
            <Helmet>
                <title>Onde comprar Smartwatch em Porto Velho com Entrega no Mesmo Dia? | Blog Rionove</title>
                <meta name="description" content="Procurando um Smartwatch (Colmi P71, Apple Watch, etc) em Porto Velho, RO? Descubra como a Rionove entrega em poucas horas na sua casa com frete barato e garantia local." />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": "Onde comprar Smartwatch em Porto Velho com Entrega no Mesmo Dia?",
                        "datePublished": "2025-01-01T08:00:00+08:00",
                        "author": {
                            "@type": "Organization",
                            "name": "Rionove Importados"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Rionove",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://rionove.com/logo.png"
                            }
                        }
                    }
                    `}
                </script>
            </Helmet>

            <div className="bg-bg-light min-h-screen pt-32 pb-16">
                <article className="container mx-auto px-6 max-w-3xl">
                    <header className="mb-12 text-center">
                        <div className="inline-flex flex-wrap justify-center gap-3 mb-6">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <MapPin className="w-3 h-3" /> Dicas Locais (Porto Velho)
                            </span>
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <Clock className="w-3 h-3" /> 3 min de leitura
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-6 leading-tight">
                            Onde comprar Smartwatch em Porto Velho com Entrega no Mesmo Dia?
                        </h1>
                        <p className="text-xl text-gray-500 font-light">
                            Cansado de esperar 30 dias pela entrega internacional e ser taxado na alfândega? Descubra o método mais inteligente de comprar eletrônicos originais em Rondônia.
                        </p>
                    </header>

                    <div className="prose prose-lg px-2 sm:px-0">
                        <p>
                            Se você mora em Porto Velho, Rondônia (RO), provavelmente já passou pela frustração de encontrar o Smartwatch ou Fone de Ouvido perfeito na internet, apenas para ver que o frete vai demorar 25 dias úteis ou custar mais caro que o próprio produto.
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-secondary mt-12 mb-4">O Fim da Espera Alfandegária</h2>
                        <p>
                            Nós da <strong className="text-primary">Rionove</strong> notamos esse problema. Não faz sentido o rondoniense pagar altas taxas do Remessa Conforme ou esperar semanas por algo que ele poderia ter na mão hoje. É por isso que nós importamos em lote e mantemos o estoque 100% físico aqui na capital (região do Caladinho).
                        </p>

                        <div className="bg-white p-8 rounded-2xl border border-gray-100 my-8 shadow-sm">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-primary" /> Como funciona a Rionove?
                            </h3>
                            <ul className="space-y-3 mb-0 pl-1 list-none">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                                    <span className="text-gray-700"><strong>Estoque Real Local:</strong> Diferente de <i>Dropshipping</i>, se está no site, está no nosso armazém em Porto Velho.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                                    <span className="text-gray-700"><strong>Entrega em Poucas Horas:</strong> Pedidos aprovados até as 16h são entregues no mesmo dia pelos nossos motoboys parceiros.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                                    <span className="text-gray-700"><strong>Garantia Descomplicada:</strong> Deu defeito? Você não precisa mandar pra China. Você troca direto com a gente aqui na cidade em até 30 dias.</span>
                                </li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-serif font-bold text-secondary mt-12 mb-4">Recomendação do Editor: Colmi P71</h2>
                        <p>
                            Se você está buscando o melhor custo-benefício disponível em Rondônia neste exato momento, nossa indicação absoluta é o <strong>Smartwatch Colmi P71</strong>. Com tela vibrante, faz e recebe chamadas perfeitamente e bateria que dura quase uma semana inteira, ele bate de frente com relógios que custam o dobro do preço.
                        </p>

                        <div className="mt-12 text-center bg-secondary/5 rounded-3xl p-10 border border-secondary/10">
                            <h3 className="font-serif font-bold text-2xl text-secondary mb-4">Pronto para ter o seu hoje?</h3>
                            <p className="text-gray-600 mb-8">
                                Nós temos o Colmi P71 e pulseiras de reposição a pronta entrega. Peça agora e receba em casa antes de escurecer.
                            </p>
                            <Link to="/#collection" className="inline-flex items-center gap-2 bg-primary text-white font-bold py-4 px-8 rounded-full hover:bg-primary/90 transition-transform hover:-translate-y-1 shadow-lg">
                                Ver Coleção Disponível <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </Layout>
    );
};
