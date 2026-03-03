import type { Product } from '../../types';
import { Plus } from 'lucide-react';
import { useCartStore } from '../../lib/store';
import { toast } from 'sonner';

interface CrossSellProps {
    mainProduct: Product;
    accessoryId: string;
    allProducts: Product[];
    onComboAdded: () => void;
}

export const CrossSell = ({ mainProduct, accessoryId, allProducts, onComboAdded }: CrossSellProps) => {
    const { addItem } = useCartStore();
    const accessory = allProducts.find(p => p.id === accessoryId);

    // Se não encontrou o acessório (ou estamos na página dele), não mostra o compre junto
    if (!accessory || mainProduct.id === accessoryId) return null;

    const mainPrice = mainProduct.price;
    const accessoryPrice = accessory.price;
    const totalPrice = mainPrice + accessoryPrice;

    // Sugerir desconto de 5% no combo
    const discount = totalPrice * 0.05;
    const finalPrice = totalPrice - discount;

    const handleAddCombo = () => {
        addItem(mainProduct);
        addItem(accessory);
        toast.success('Combo adicionado ao carrinho com sucesso!', {
            description: `Você economizou R$ ${discount.toFixed(2).replace('.', ',')} nessa compra.`
        });
        onComboAdded();
    };

    return (
        <div className="bg-bg-light border border-black/5 rounded-2xl p-6 mb-8 mt-4 animate-fade-in shadow-sm">
            <h3 className="font-serif font-bold text-secondary text-lg mb-4 flex items-center gap-2">
                🌟 Leve junto e ganhe 5% OFF
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                {/* Produto Principal */}
                <div className="flex flex-col items-center flex-1">
                    <div className="w-24 h-24 bg-white rounded-xl p-2 shadow-sm border border-gray-100 flex items-center justify-center">
                        <img
                            src={mainProduct.image_url}
                            alt={mainProduct.title}
                            className="w-full h-full object-contain mix-blend-multiply"
                        />
                    </div>
                    <span className="text-xs text-center mt-2 font-medium text-gray-600 line-clamp-2">{mainProduct.title}</span>
                </div>

                <div className="bg-white rounded-full p-2 shadow-sm z-10 -my-2 sm:my-0">
                    <Plus className="w-5 h-5 text-gray-400" />
                </div>

                {/* Acessório */}
                <div className="flex flex-col items-center flex-1">
                    <div className="w-24 h-24 bg-white rounded-xl p-2 shadow-sm border border-gray-100 flex items-center justify-center relative">
                        <div className="absolute -top-2 -right-2 bg-[#ebb45e] text-xs font-bold px-2 py-0.5 rounded-full text-white shadow-sm">+ Venda</div>
                        <img
                            src={accessory.image_url}
                            alt={accessory.title}
                            className="w-full h-full object-contain mix-blend-multiply"
                        />
                    </div>
                    <span className="text-xs text-center mt-2 font-medium text-gray-600 line-clamp-2">{accessory.title}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                    <span className="text-[22px] font-bold text-dark leading-none">R$ {finalPrice.toFixed(2).replace('.', ',')}</span>
                </div>

                <button
                    onClick={handleAddCombo}
                    className="bg-primary text-white font-bold py-2.5 px-6 rounded-xl shadow-md hover:bg-primary/90 transform hover:-translate-y-0.5 transition-all outline-none"
                >
                    Adicionar Combo
                </button>
            </div>
        </div>
    );
};
