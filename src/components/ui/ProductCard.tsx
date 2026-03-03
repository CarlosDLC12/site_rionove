import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { useCartStore } from '../../lib/store';
import { toast } from 'sonner';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { addItem } = useCartStore();
    const navigate = useNavigate();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem(product);
        toast.success(`${product.title} adicionado!`, {
            position: 'bottom-right',
            duration: 2000
        });
    };

    return (
        <div
            onClick={() => navigate(`/product/${product.slug || product.id}`)}
            className="group flex flex-col bg-transparent cursor-pointer relative"
        >
            {/* Image Container - Generous Whitespace */}
            <div className="w-full aspect-[4/5] bg-bg-light overflow-hidden relative mb-5 rounded-2xl group-hover:bg-white transition-colors duration-500 p-8 flex items-center justify-center">
                {product.featured && (
                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 uppercase tracking-wider">
                        Destaque
                    </div>
                )}

                <img
                    src={product.image_url}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                />

                {/* Overlay Action Button on Image Hover */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 w-[80%]">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-dark text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-primary transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Comprar
                    </button>
                </div>
            </div>

            {/* Minimalist Text Details */}
            <div className="px-2 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-serif text-lg font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                        {product.title}
                    </h3>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-secondary font-bold text-lg">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </span>
                    {product.old_price && (
                        <span className="text-muted line-through text-xs">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.old_price)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
