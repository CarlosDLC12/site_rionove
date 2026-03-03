import { useState, useEffect } from 'react';
import type { Product } from '../../types';

interface FloatingActionBarProps {
    product: Product;
    selectedColor?: string;
    onAddToCart: () => void;
    stockInfo: { hasStock: boolean; quantity: number };
}

export const FloatingActionBar = ({ product, selectedColor, onAddToCart, stockInfo }: FloatingActionBarProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show the bar only when user scrolls down past the main add to cart button (approx 600px)
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    const finalPrice = product.price;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 md:hidden animate-slide-up">
            <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 line-through">
                        R$ {(finalPrice * 1.3).toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xl font-bold text-dark leading-none">
                        R$ {finalPrice.toFixed(2).replace('.', ',')}
                    </span>
                    {selectedColor && <span className="text-[10px] text-gray-500 truncate">Cor: {selectedColor}</span>}
                </div>

                <button
                    onClick={onAddToCart}
                    disabled={!stockInfo.hasStock}
                    className={`flex-1 py-3 px-6 rounded-full font-bold shadow-lg transition-all ${stockInfo.hasStock
                            ? 'bg-accent text-primary hover:bg-accent/90 transform hover:-translate-y-0.5'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    {stockInfo.hasStock ? 'Comprar Agora' : 'Esgotado'}
                </button>
            </div>
        </div>
    );
};
