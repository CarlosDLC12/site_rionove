import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Package, Truck, CheckCircle2, Clock, Search, AlertCircle } from 'lucide-react';

interface OrderData {
    orderId: string;
    status: 'pending_payment' | 'approved' | 'shipped' | 'delivered';
    createdAt: string;
    items: any[];
    shippingCost: number;
    customerName: string;
}

export const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderData, setOrderData] = useState<OrderData | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setOrderData(null);
        setLoading(true);

        try {
            const response = await fetch('/.netlify/functions/getOrderStatus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: orderId.trim(), email: email.trim() })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao buscar pedido.');
            }

            setOrderData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStep = (status: string) => {
        switch (status) {
            case 'pending_payment': return 1;
            case 'approved': return 2;
            case 'shipped': return 3;
            case 'delivered': return 4;
            default: return 0;
        }
    };

    const currentStep = orderData ? getStatusStep(orderData.status) : 0;

    return (
        <Layout>
            <div className="min-h-screen bg-bg-light pt-24 pb-16">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-serif font-bold text-secondary mb-4">Rastreie seu Pedido</h1>
                        <p className="text-gray-600">Acompanhe a entrega do seu produto Rionove em tempo real.</p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail de Compra</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-bg-light"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Código do Pedido</label>
                                <input
                                    type="text"
                                    required
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    placeholder="Ex: 8a7b6c5d4e..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-bg-light"
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    disabled={loading || !email || !orderId}
                                    className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Search className="w-5 h-5" /> Buscar</>}
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}
                    </div>

                    {orderData && (
                        <div className="bg-white rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                                <div>
                                    <h2 className="font-bold text-lg text-secondary">Pedido #{orderData.orderId.slice(0, 8).toUpperCase()}</h2>
                                    <p className="text-sm text-gray-500">De: {orderData.customerName}</p>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                        <Clock className="w-4 h-4" />
                                        {new Date(orderData.createdAt).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="relative mb-12">
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full hidden sm:block"></div>
                                <div
                                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-1000 hidden sm:block"
                                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                                ></div>

                                <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-0 relative z-10">
                                    {[
                                        { step: 1, icon: Clock, label: 'Aguardando Pagamento', desc: 'Pix pendente' },
                                        { step: 2, icon: Package, label: 'Pagamento Aprovado', desc: 'Preparando envio' },
                                        { step: 3, icon: Truck, label: 'Em Rota', desc: 'Saiu para entrega' },
                                        { step: 4, icon: CheckCircle2, label: 'Entregue', desc: 'Pacote recebido' },
                                    ].map((item) => (
                                        <div key={item.step} className="flex sm:flex-col items-center gap-4 sm:gap-3 text-center">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 transition-colors duration-500 ${currentStep >= item.step
                                                    ? 'bg-primary border-white text-white shadow-lg shadow-primary/30'
                                                    : 'bg-gray-100 border-white text-gray-400'
                                                }`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div className="text-left sm:text-center">
                                                <p className={`font-bold text-sm ${currentStep >= item.step ? 'text-dark' : 'text-gray-400'}`}>
                                                    {item.label}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-bg-light rounded-xl p-6">
                                <h3 className="font-bold text-sm text-secondary mb-4 uppercase tracking-wider">Itens do Pedido</h3>
                                <div className="space-y-3">
                                    {orderData.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-primary">{item.quantity}x</span>
                                                <div>
                                                    <p className="text-sm font-medium text-dark">{item.title}</p>
                                                    {item.selectedColor && <p className="text-xs text-gray-500">Cor: {item.selectedColor}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};
