"use client";

import { useEffect, useState } from "react";
import useCart from "@/hooks/cart/useCart";
import { cartLineItemInterface } from "@/interfaces/cart";

import TrackOrder from "./TrackOrder";
import ShoppingCart from "./ShoppingCart";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import CartModal from "./ShoppingCart/CartModal";
import { CartItem } from "./ShoppingCart/CartItem";

export default function NavBar() {
  const {
    cart,
    isLoading,
    isLocalLoading,
    headlessClient,
    getCart,
    handleCheckout,
    handleDeleteCart,
    handleQuantityChange,
  } = useCart();

  const [uiState, setUiState] = useState({
    searchVisible: false,
    menuVisible: false,
    trackOrderVisible: false,
    keyword: "",
    expandedItem: null as string | null,
  });

  useEffect(() => {
    if (headlessClient) {
      getCart(headlessClient, true);
    }
  }, [headlessClient, getCart]);

  return (
    <>
      <MobileNavigation uiState={uiState} setUiState={setUiState}>
        <ShoppingCart
          cart={cart}
          isLoading={isLoading}
          handleCheckout={handleCheckout}
          deleteCart={handleDeleteCart}
        >
          <CartModal
            isLoading={isLoading}
            isLocalLoading={isLocalLoading}
            handleCheckout={handleCheckout}
            handleDeleteCart={handleDeleteCart}
            cart={cart}
          >
            {cart.lineItems &&
              cart.lineItems.map((productCart: cartLineItemInterface) => (
                <CartItem
                  key={productCart._id}
                  productCart={productCart}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
          </CartModal>
        </ShoppingCart>
      </MobileNavigation>
      <DesktopNavigation uiState={uiState} setUiState={setUiState}>
        <ShoppingCart
          cart={cart}
          isLoading={isLoading}
          handleCheckout={handleCheckout}
          deleteCart={handleDeleteCart}
        >
          <CartModal
            isLoading={isLoading}
            isLocalLoading={isLocalLoading}
            handleCheckout={handleCheckout}
            handleDeleteCart={handleDeleteCart}
            cart={cart}
          >
            {cart.lineItems &&
              cart.lineItems.map((productCart: cartLineItemInterface) => (
                <CartItem
                  key={productCart._id}
                  productCart={productCart}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
          </CartModal>
        </ShoppingCart>
      </DesktopNavigation>
      <TrackOrder uiState={uiState} setUiState={setUiState} />
    </>
  );
}
