import { Link } from 'react-router-dom';
import { CheckCircle, Home, MessageCircle } from 'lucide-react';
import { Layout } from '../components/layout/Layout';

export const OrderSuccess = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-light flex items-center justify-center p-6">
                <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-dark mb-4">Pedido Realizado!</h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Seu pedido foi registrado. Se o WhatsApp não abriu automaticamente, clique no botão abaixo para finalizar.
                    </p>

                    <div className="space-y-4">
                        <a
                            href="https://wa.me/5569993947389?text=Olá!%20Acabei%20de%20fazer%20um%20pedido%20no%20site."
                            target="_blank"
                            className="block w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Enviar Comprovante / Finalizar
                        </a>

                        <Link
                            to="/"
                            className="block w-full bg-gray-100 text-dark font-bold py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Voltar para a Loja
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
