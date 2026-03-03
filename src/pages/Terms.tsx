import { Layout } from '../components/layout/Layout';

export const Terms = () => {
    return (
        <Layout>
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="font-serif text-4xl font-bold text-dark mb-8">Termos de Uso</h1>
                    <div className="prose prose-lg text-gray-700">
                        <p className="mb-6">Última atualização: Março de 2026</p>

                        <h2 className="text-2xl font-bold text-dark mt-8 mb-4">1. Aceitação dos Termos</h2>
                        <p className="mb-4">
                            Ao acessar e usar a loja Rionove, você concorda em cumprir estes termos de serviço
                            e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes
                            termos, não deve utilizar nosso site ou serviços.
                        </p>

                        <h2 className="text-2xl font-bold text-dark mt-8 mb-4">2. Produtos e Serviços</h2>
                        <p className="mb-4">
                            Reservamo-nos o direito de modificar ou descontinuar os produtos a qualquer
                            momento. Os preços dos nossos produtos estão sujeitos a alterações sem aviso prévio.
                            Garantimos a qualidade de todos os produtos listados, atuando como importadores
                            diretos de marcas como Colmi, Baseus e Lenovo.
                        </p>

                        <h2 className="text-2xl font-bold text-dark mt-8 mb-4">3. Entregas em Porto Velho</h2>
                        <p className="mb-4">
                            O serviço de "Entrega no Mesmo Dia" é válido para compras aprovadas até as 16h,
                            apenas em dias úteis, para endereços localizados na área urbana de Porto Velho (RO).
                            Compras após esse horário serão entregues no dia útil seguinte.
                        </p>

                        <h2 className="text-2xl font-bold text-dark mt-8 mb-4">4. Limitação de Responsabilidade</h2>
                        <p className="mb-4">
                            Em nenhum caso a Rionove será responsável por quaisquer danos diretos, indiretos,
                            incidentais ou consequentes resultantes do uso ou da incapacidade de usar nossos
                            produtos ou serviços.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
