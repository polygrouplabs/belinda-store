import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore } from '@/types/cart';

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const items = get().items;
                const existingItem = items.find(item => item.product.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    });
                } else {
                    set({ items: [...items, { product, quantity: 1 }] });
                }
            },
            removeItem: (productId) => {
                set({
                    items: get().items.filter(item => item.product.id !== productId)
                });
            },
            updateQuantity: (productId, quantity) => {
                if (quantity < 1) return;

                set({
                    items: get().items.map(item =>
                        item.product.id === productId
                            ? { ...item, quantity }
                            : item
                    )
                });
            },
            clearCart: () => set({ items: [] }),
            get total() {
                return get().items.reduce((total, item) => {
                    return total + (item.product.price * item.quantity);
                }, 0);
            }
        }),
        {
            name: 'cart-storage', // localStorage 的 key
        }
    )
);