import { toast } from "sonner";
import { create } from "zustand";

import { cart } from "@wix/ecom";
import { HeadlessClientType } from "../../context/headlessContext";
import { NEXT_PUBLIC_HEADLESS_ID_STORE } from "@/utils/env";
import { cartInterface } from "@/interfaces/cart";

type CartState = {
  cart: cartInterface;
  isLoading: boolean;
  counter: number;
  getCart: (headlessClient: HeadlessClientType, get: boolean) => void;
  addItem: (
    headlessClient: HeadlessClientType,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (headlessClient: HeadlessClientType, itemId: string) => void;
  deleteCart: (headlessClient: HeadlessClientType) => void;
  isInCart: (productId: string) => boolean;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: false,
  counter: 0,
  getCart: async (headlessClient: HeadlessClientType, get: boolean) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      if (get === true) {
        const cart = await headlessClient.currentCart.getCurrentCart();
        set({
          cart: cart || [],
          isLoading: false,
          counter: cart?.lineItems.length || 0,
        });
      }
    } catch (err) {
      console.error("Error getting cart", err);
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
  addItem: async (headlessClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await headlessClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId:
                NEXT_PUBLIC_HEADLESS_ID_STORE ??
                "215238eb-22a5-4c36-9e7b-e7c08025e04e",
              catalogItemId: productId,
              ...(variantId && { options: { variantId } }),
            },
            quantity: quantity,
          },
        ],
      });
      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length,
        isLoading: false,
      });

      toast.success("Has agregado este producto al carrito de compras");
    } catch (error) {
      console.error("Error adding item to cart", error);
      set((state) => ({ ...state, isLoading: false }));
      toast.error(
        "Ha ocurrido un error agregando el producto al carrito de compras"
      );
    }
  },
  removeItem: async (headlessClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    const response =
      await headlessClient.currentCart.removeLineItemsFromCurrentCart([itemId]);

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });
  },
  deleteCart: async (headlessClient) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      await headlessClient.currentCart.deleteCurrentCart();
      set({
        cart: undefined,
        counter: 0,
        isLoading: false,
      });

      toast.info("Has vaciado tu carrito de compras");
    } catch (error) {
      console.error("Error deleting cart", error);
      set((state) => ({ ...state, isLoading: false }));
      toast.error("Error al vaciar tu carrito de compras");
    }
  },

  isInCart: (productId: string): boolean => {
    if (useCartStore) {
      return !!useCartStore
        .getState()
        .cart?.lineItems?.some(
          (item: cart.LineItem) => item.rootCatalogItemId === productId
        );
    } else {
      return false;
    }
  },
}));
