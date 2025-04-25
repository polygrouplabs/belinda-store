"use client";

import { useState } from "react";

import { currentCart } from "@wix/ecom";
import { useCartStore } from "./useCartStore";
import { useHeadlessClient } from "../sdk/useHeadlessClient";

export default function useCart() {
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const { cart, isLoading, counter, deleteCart, getCart, addItem, isInCart } =
    useCartStore();

  const headlessClient = useHeadlessClient();

  function handleDeleteCart() {
    deleteCart(headlessClient);
  }

  function handleQuantityChange(quantity: number) {
    setIsLocalLoading(true);
    console.log("handleQuantityChange", quantity);
    setTimeout(() => {
      setIsLocalLoading(false);
    }, 1000);
  }

  async function handleCheckout() {
    setIsLocalLoading(true);
    try {
      const res =
        await headlessClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await headlessClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: res.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      setIsLocalLoading(false);

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (error) {
      setIsLocalLoading(false);
      console.error(error);
    }
  }

  return {
    cart,
    counter,
    isLoading,
    isLocalLoading,
    headlessClient,
    getCart,
    isInCart,
    addItem,
    handleCheckout,
    handleDeleteCart,
    handleQuantityChange,
  };
}
