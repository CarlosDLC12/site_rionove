import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../types';

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (productId: string, selectedColor?: string) => void;
    updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
    clearCart: () => void;
    subtotal: () => number;
    comboDiscount: () => number;
    total: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === product.id && item.selectedColor === product.selectedColor);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id && item.selectedColor === product.selectedColor
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }] });
                }
            },
            removeItem: (productId, selectedColor?: string) => {
                set({ items: get().items.filter((item) => !(item.id === productId && item.selectedColor === selectedColor)) });
            },
            updateQuantity: (productId, quantity, selectedColor?: string) => {
                if (quantity <= 0) {
                    get().removeItem(productId, selectedColor);
                } else {
                    set({
                        items: get().items.map((item) =>
                            item.id === productId && item.selectedColor === selectedColor ? { ...item, quantity } : item
                        ),
                    });
                }
            },
            clearCart: () => set({ items: [] }),
            subtotal: () => {
                return get().items.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );
            },
            comboDiscount: () => {
                const items = get().items;
                const hasSmartwatch = items.some(i => i.category === 'Smartwatch');
                const hasAccessory = items.some(i => i.category === 'Acessórios');
                if (hasSmartwatch && hasAccessory) {
                    return get().subtotal() * 0.05; // 5% off the entire cart subtotal
                }
                return 0;
            },
            total: () => {
                return get().subtotal() - get().comboDiscount();
            },
        }),
        {
            name: 'rionove-cart',
        }
    )
);
