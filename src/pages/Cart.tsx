
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../lib/store';
import { Layout } from '../components/layout/Layout';

export const Cart = () => {
    const { items, removeItem, updateQuantity, total, subtotal, comboDiscount } = useCartStore();
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                        <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-dark mb-4">Seu carrinho está vazio</h2>
                    <p className="text-gray-500 mb-8 max-w-md">
                        Parece que você ainda não escolheu seus produtos favoritos. Explore nossa coleção e encontre o que combina com você.
                    </p>
                    <Link
                        to="/"
                        className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-dark transition-colors uppercase tracking-wider text-sm"
                    >
                        Voltar para a Loja
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="py-12 bg-gray-50 min-h-[80vh]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-8">Seu Carrinho</h1>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Cart Items List */}
                        <div className="lg:w-2/3 space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-6 items-center">
                                    <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={item.image_url} alt={item.title} className="w-full h-full object-contain" />
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="font-serif font-bold text-lg text-dark">{item.title}</h3>
                                        <p className="text-primary font-bold mt-1">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-dark transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-dark transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                                            title="Remover item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                                <h3 className="font-serif text-xl font-bold text-dark mb-6">Resumo do Pedido</h3>

                                <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal())}</span>
                                    </div>
                                    {comboDiscount() > 0 && (
                                        <div className="flex justify-between text-emerald-600 font-medium bg-emerald-50 -mx-4 px-4 py-2 rounded-lg">
                                            <span>Desconto Combo (5%)</span>
                                            <span>-{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(comboDiscount())}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-600">
                                        <span>Entrega</span>
                                        <span className="text-xs text-gray-400">(Calculado no checkout)</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-8">
                                    <span className="font-bold text-lg text-dark">Total</span>
                                    <span className="font-bold text-2xl text-primary">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total())}
                                    </span>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg shadow-accent/20"
                                >
                                    Finalizar Compra <ArrowRight className="w-5 h-5" />
                                </button>

                                <Link to="/" className="block text-center text-gray-500 text-sm mt-4 hover:underline">
                                    Continuar Comprando
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};
