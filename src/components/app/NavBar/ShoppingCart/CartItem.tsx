"use client";

import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { products } from "@wix/stores";

import { QuantityCounter } from "../../QuantityCounter";
import { cartLineItemInterface } from "@/interfaces/cart";

import useCart from "@/hooks/cart/useCart";
import { handleFormatValue } from "@/utils/handle";
import { useCartStore } from "@/hooks/cart/useCartStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  productCart: cartLineItemInterface;
  onQuantityChange: (quantity: number) => void;
}

export function CartItem({ productCart, onQuantityChange }: CartItemProps) {
  const [currentVariant, setCurrentVariant] = useState<
    products.GetStoreVariantResponseNonNullableFields | undefined
  >(undefined);

  const { removeItem } = useCartStore();
  const { headlessClient } = useCart();

  function handleQuantityChange(type: "i" | "d") {
    onQuantityChange(
      type === "i" ? productCart.quantity! + 1 : productCart.quantity! - 1
    );
    console.log("handleQuantityChange", type);
  }

  useEffect(() => {
    const getVariant = async () => {
      const productID: string | undefined =
        productCart.catalogReference?.catalogItemId;
      const variantID: string | undefined =
        productCart.catalogReference?.options?.variantId;

      const variant = await headlessClient.products.getStoreVariant(
        `${productID}-${variantID}`
      );
      setCurrentVariant(variant);
    };

    getVariant();

    return () => {
      setCurrentVariant(undefined);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center gap-4 p-4 border-b border-grey-50 relative">
      <div className="relative w-[120px] aspect-[95/122]">
        <Image
          src={wixMedia.getScaledToFillImageUrl(
            productCart.image!,
            400,
            400,
            {}
          )}
          alt={productCart.productName?.original ?? "Imagen de producto"}
          fill
          className="object-cover"
          sizes="120px"
          quality={100}
        />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <h6 className="text-h6"> {productCart.productName?.original}</h6>
        <span className="text-xs text-primaryColor">
          {currentVariant?.variant?.variantName}
        </span>
        <div className="w-full flex justify-between">
          <span className="text-h6 font-bold">
            {productCart.quantity} Unidad
          </span>
          <span className="text-h6 font-bold">
            {productCart.price && productCart.price.amount
              ? handleFormatValue(Number(productCart.price.amount))
              : "0.00"}{" "}
            COP
          </span>
        </div>
        <Button
          variant={"secondary"}
          className="h-max"
          onClick={() => {
            if (productCart._id) {
              removeItem(headlessClient, productCart._id);
            }
          }}
        >
          Eliminar del carrito
        </Button>
        <QuantityCounter
          className="w-full h-[33px] text-base"
          value={productCart.quantity ?? 1}
          onValueChange={handleQuantityChange}
        />
      </div>
    </div>
  );
}
