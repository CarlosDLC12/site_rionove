import { Layout } from '../components/layout/Layout';

export const Privacy = () => {
    return (
        <Layout>
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="font-serif text-4xl font-bold text-dark mb-8">Política de Privacidade</h1>
                    <div className="prose prose-lg text-gray-700">
                        <p className="mb-6">Última atualização: Março de 2026</p>

                        <h2 className="text-2xl font-bold text-dark mt-8 mb-4">1. Coleta e Uso de Informações</h2>
                        <p className="mb-4">
                            A Rionove coleta informações pessoais (como nome, endereço de e-mail, telefone
                            e endereço de entrega) apenas quando voluntariamente fornecidas por você durante
                            o processo de compra. Essas informações são essenciais para processarmos seu pedido
                            e entregarmos os produtos na sua residência.
                        </p>

                        <h2 className="text-2xl font-bold text-dark mt-8 mb-4">2. Proteção de Dados (LGPD)</h2>
                        <p className="mb-4">
                            Implementamos medidas de segurança para manter a segurança de suas informações pessoais.
                            Não vendemos, trocamos ou de outra forma transferimos a terceiros as suas informações
                            pessoalmente identificáveis. Isso não inclui parceiros confiáveis de processamento de
                            pagamento (como Mercado Pago), que concordam em manter essas informações confidenciais.
                        </p>

                        <h2 className="text-2xl font-bold text-dark mt-8 mb-4">3. Cookies</h2>
                        <p className="mb-4">
                            Nosso site utiliza cookies para otimizar sua experiência e salvar os itens no seu
                            carrinho de compras. Você pode configurar seu navegador para recusar todos os cookies,
                            mas isso pode limitar a funcionalidade de áreas essenciais do site.
                        </p>

                        <h2 className="text-2xl font-bold text-dark mt-8 mb-4">4. Consentimento</h2>
                        <p className="mb-4">
                            Ao usar nosso site, você concorda com nossa política de privacidade online.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
