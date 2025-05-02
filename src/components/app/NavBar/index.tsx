"use client";

import Cookies from "js-cookie";
import { members } from "@wix/members";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useCart from "@/hooks/cart/useCart";
import { cartLineItemInterface } from "@/interfaces/cart";
import { useHeadlessClient } from "@/hooks/sdk/useHeadlessClient";

import TrackOrder from "./TrackOrder";
import ShoppingCart from "./ShoppingCart";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { MobileMenu } from "./MobileNavigation/MobileMenu";
import { CartItem } from "./ShoppingCart/CartItem";
import CartModal from "./ShoppingCart/CartModal";

export default function NavBar() {
  const router = useRouter();

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authIsLoading, AuthSetIsLoading] = useState(false);
  const [currentMember, setCurrentMember] = useState<
    members.GetMyMemberResponse & members.GetMyMemberResponseNonNullableFields
  >();

  const headlessClientInstance = useHeadlessClient();

  async function handleLogout() {
    AuthSetIsLoading(true);
    Cookies.remove("refreshToken");

    const { logoutUrl } = await headlessClientInstance.auth.logout(
      window.location.href
    );
    router.push(logoutUrl);
    AuthSetIsLoading(false);
  }

  useEffect(() => {
    const thisIsLoggedIn = headlessClientInstance.auth.loggedIn();
    setIsLoggedIn(thisIsLoggedIn);

    if (thisIsLoggedIn) {
      async function getCurrentMember() {
        const thisM = await headlessClientInstance.members.getCurrentMember();
        if (thisM) {
          setCurrentMember(thisM);
        }
      }
      getCurrentMember();

      if (headlessClient && !isLoading) {
        getCart(headlessClient, true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <MobileMenu
          isLoggedIn={isLoggedIn}
          isLoading={authIsLoading}
          currentMember={currentMember}
          handleLogout={handleLogout}
          uiState={uiState}
          setUiState={setUiState}
        />
      </MobileNavigation>
      <DesktopNavigation
        isLoggedIn={isLoggedIn}
        isLoading={authIsLoading}
        currentMember={currentMember}
        handleLogout={handleLogout}
        uiState={uiState}
        setUiState={setUiState}
      >
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
