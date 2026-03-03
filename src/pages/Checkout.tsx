import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../lib/store';
import { Layout } from '../components/layout/Layout';
import { ArrowLeft, MapPin, User, CreditCard } from 'lucide-react';
import { sanitizeInput, validatePhone, validateName, checkoutRateLimiter } from '../lib/utils';
import { toast } from 'sonner';
import { getAllNeighborhoods, getShippingCost } from '../data/shipping';
import { SearchableSelect } from '../components/ui/SearchableSelect';
export const Checkout = () => {
    const { items, total, subtotal, comboDiscount, clearCart } = useCartStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        neighborhood: 'Retirada no Caladinho',
        number: '',
        paymentMethod: 'pix'
    });

    const neighborhoods = getAllNeighborhoods();
    const shippingCost = getShippingCost(formData.neighborhood);

    if (items.length === 0) {
        navigate('/');
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Rate limiting check
        if (!checkoutRateLimiter.canMakeRequest()) {
            const remainingTime = Math.ceil(checkoutRateLimiter.getRemainingTime() / 1000);
            toast.error(`Por favor, aguarde ${remainingTime} segundos antes de fazer outro pedido.`);
            return;
        }

        // Input validation
        if (!validateName(formData.name)) {
            toast.error('Por favor, insira um nome válido.');
            return;
        }

        if (!validatePhone(formData.phone)) {
            toast.error('Por favor, insira um telefone válido.');
            return;
        }

        setLoading(true);

        // Sanitize inputs
        const sanitizedData = {
            name: sanitizeInput(formData.name),
            email: sanitizeInput(formData.email),
            phone: sanitizeInput(formData.phone),
            address: sanitizeInput(formData.address),
            neighborhood: sanitizeInput(formData.neighborhood),
            number: sanitizeInput(formData.number),
            paymentMethod: formData.paymentMethod,
            shippingCost: shippingCost
        };

        // 1. We no longer use Supabase since it's deactivated, moving to Firebase Sales Register on Webhook approval

        // Check if Payment is API Gateway (Mercado Pago via Firebase) or Cash
        if (formData.paymentMethod === 'card' || formData.paymentMethod === 'pix') {
            try {
                // Prepare items payload mapping to what the Cloud Function expects
                const payloadItems = items.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    selectedColor: item.selectedColor
                }));

                const response = await fetch("/.netlify/functions/createPaymentPreference", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        items: payloadItems,
                        customer: {
                            name: sanitizedData.name,
                            email: sanitizedData.email,
                            phone: sanitizedData.phone,
                            address: sanitizedData.address,
                            number: sanitizedData.number,
                            neighborhood: sanitizedData.neighborhood
                        },
                        shippingCost: sanitizedData.shippingCost
                    })
                });

                if (!response.ok) {
                    const errObj = await response.json().catch(() => ({}));
                    throw new Error(errObj.error || "Erro ao gerar pagamento");
                }

                const data = await response.json();

                // Redirect to Mercado Pago Checkout Pro
                if (data.preferenceId) {
                    clearCart();
                    window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${data.preferenceId}`;
                    return;
                }

            } catch (error: any) {
                toast.error(error.message || "Falha ao comunicar com o gateway de pagamento.");
                setLoading(false);
                return;
            }
        }

        // 2. Format WhatsApp Message (Fallback/Dinheiro)
        if (formData.paymentMethod === 'cash') {
            const itemsList = items.map(i => `• ${i.quantity}x ${i.title}`).join('%0A');
            const totalFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total() + shippingCost);
            const shippingFormatted = shippingCost === 0 ? 'Grátis (Retirada)' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shippingCost);

            let message = `*NOVO PEDIDO RIONOVE*%0A%0A` +
                `*Cliente:* ${encodeURIComponent(sanitizedData.name)}%0A` +
                `*Telefone:* ${encodeURIComponent(sanitizedData.phone)}%0A` +
                `*Endereço:* ${encodeURIComponent(sanitizedData.address)}, ${encodeURIComponent(sanitizedData.number)} - ${encodeURIComponent(sanitizedData.neighborhood)}%0A%0A` +
                `*Itens:*%0A${itemsList}%0A`;

            if (comboDiscount() > 0) {
                message += `*Desconto Combo:* -${encodeURIComponent(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(comboDiscount()))}%0A`;
            }

            message += `*Frete:* ${encodeURIComponent(shippingFormatted)}%0A%0A` +
                `*Total:* ${totalFormatted}%0A` +
                `*Pagamento:* Dinheiro (Retirada/Entrega)`;

            const whatsappUrl = `https://wa.me/5569993947389?text=${message}`;

            clearCart();
            window.open(whatsappUrl, '_blank');
            navigate('/success');
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-6 max-w-4xl">
                    <button onClick={() => navigate('/cart')} className="flex items-center text-gray-500 hover:text-dark mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o Carrinho
                    </button>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <h2 className="font-serif text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                                    <User className="w-6 h-6 text-accent" /> Seus Dados
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Nome Completo</label>
                                            <input
                                                required
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium"
                                                placeholder="Ex: João Silva"
                                                autoComplete="name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp / Telefone</label>
                                            <input
                                                required
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium"
                                                placeholder="(69) 99999-9999"
                                                autoComplete="tel"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">E-mail</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium"
                                                placeholder="cliente@email.com"
                                                autoComplete="email"
                                            />
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-6">
                                        <h2 className="font-serif text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                                            <MapPin className="w-6 h-6 text-accent" /> Entrega
                                        </h2>
                                        <div className="grid md:grid-cols-4 gap-6">
                                            <div className="md:col-span-3">
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Endereço</label>
                                                <input
                                                    required
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium"
                                                    placeholder="Rua, Avenida..."
                                                    autoComplete="address-line1"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Número</label>
                                                <input
                                                    required
                                                    name="number"
                                                    value={formData.number}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium"
                                                    placeholder="123"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Bairro</label>
                                                <SearchableSelect
                                                    options={neighborhoods}
                                                    value={formData.neighborhood}
                                                    onChange={(value) => setFormData(prev => ({ ...prev, neighborhood: value }))}
                                                    placeholder="Digite ou selecione seu bairro..."
                                                    name="neighborhood"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-6">
                                        <h2 className="font-serif text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                                            <CreditCard className="w-6 h-6 text-accent" /> Pagamento
                                        </h2>
                                        <div className="grid grid-cols-3 gap-4">
                                            {['pix', 'card', 'cash'].map((method) => (
                                                <label key={method} className={`
                          cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-300 relative overflow-hidden
                          ${formData.paymentMethod === method
                                                        ? 'border-primary bg-primary/10 text-primary font-bold shadow-md scale-[1.02]'
                                                        : 'border-gray-200 hover:border-primary/50 text-gray-600'}
                        `}>
                                                    {formData.paymentMethod === method && (
                                                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                    )}
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value={method}
                                                        checked={formData.paymentMethod === method}
                                                        onChange={handleInputChange}
                                                        className="hidden"
                                                    />
                                                    <span className="capitalize block mt-1">
                                                        {method === 'pix' ? 'Pix' : method === 'card' ? 'Cartão' : 'Dinheiro'}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-dark transition-colors flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Processando...' : 'Confirmar Pedido'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                                <h3 className="font-serif text-lg font-bold text-dark mb-4">Resumo</h3>
                                <div className="space-y-3 mb-4">
                                    {items.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{item.quantity}x {item.title}</span>
                                            <span className="font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-100 pt-3 mb-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal())}</span>
                                    </div>
                                    {comboDiscount() > 0 && (
                                        <div className="flex justify-between text-sm text-emerald-600 font-medium">
                                            <span>Desconto Combo</span>
                                            <span>-{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(comboDiscount())}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Frete ({formData.neighborhood})</span>
                                        <span className="font-medium">{shippingCost === 0 ? 'Grátis' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shippingCost)}</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-xl text-primary">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total() + shippingCost)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
