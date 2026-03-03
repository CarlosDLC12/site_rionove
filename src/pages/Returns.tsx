import { Layout } from '../components/layout/Layout';

export const Returns = () => {
    return (
        <Layout>
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="font-serif text-4xl font-bold text-dark mb-8">Trocas e Devoluções</h1>
                    <div className="prose prose-lg text-gray-700">

                        <p className="mb-6">
                            A Rionove é focada em oferecer produtos de alta tecnologia testados e aprovados.
                            De acordo com o Código de Defesa do Consumidor brasileiro, montamos as diretrizes
                            abaixo de forma transparente e simplificada.
                        </p>

                        <h2 className="text-2xl font-bold text-dark mt-8 mb-4">1. Garantia Legal (Defeitos de Fabricação)</h2>
                        <p className="mb-4">
                            Oferecemos <strong>30 dias de garantia</strong> para defeitos de fabricação em todos
                            os smartwatches (Colmi P71), fones Lenovo e outros eletrônicos adquiridos conosco.
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Mal uso (quedas, riscos no visor, danos por carregador de carga rápida inapropriado) não são cobertos.</li>
                            <li>Danos por água (mesmo os resistentes a líquidos, se submersos além dos limites) não possuem cobertura contra danos líquidos pela fábrica.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-dark mt-8 mb-4">2. Direito de Arrependimento</h2>
                        <p className="mb-4">
                            Nas compras feitas online, o cliente tem o prazo de <strong>7 (sete) dias corridos</strong> a
                            contar do recebimento do produto para desistir da compra. O produto deve ser devolvido em
                            sua embalagem original, sem indícios de uso, com selos e lacres intactos,
                            acompanhado de todos os manuais e acessórios originais.
                        </p>

                        <h2 className="text-2xl font-bold text-dark mt-8 mb-4">3. Como Solicitar</h2>
                        <p className="mb-4">
                            Por atuarmos localmente em Porto Velho (RO), o processo é muito fácil. Basta entrar em
                            contato via nosso WhatsApp Oficial informando o número do pedido ou CPF do comprador e o motivo da solicitação
                            (arrependimento ou defeito). Um de nossos consultores agendará o melhor horário e forma para recolher o produto.
                        </p>

                    </div>
                </div>
            </div>
        </Layout>
    );
};
