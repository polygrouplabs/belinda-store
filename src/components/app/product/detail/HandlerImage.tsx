"use client";

import { useEffect, useState } from "react";

import useProductCard from "@/hooks/product/useProductCard";
import { productMediaItemInterface } from "@/interfaces/product";
import { productInterface, productMediaInterface } from "@/interfaces/product";

import ProductImages from "@/components/app/product/detail/ProductImages";
import ProductImageSlide from "@/components/app/product/detail/ProductImageSlide";

export default function HandlerImage({
  product,
}: {
  product: productInterface;
}) {
  const { isOnSale, ribbonText } = useProductCard(product);

  const [mediaItems, setMediaItems] = useState<
    productMediaItemInterface[] | undefined
  >(undefined);

  useEffect(() => {
    const productMedia: productMediaInterface | undefined = product.media;
    if (productMedia) {
      const mediaItems: productMediaItemInterface[] | undefined =
        productMedia.items;
      setMediaItems(mediaItems);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ProductImageSlide
        items={mediaItems ?? []}
        isOnSale={isOnSale}
        ribbonText={ribbonText}
      />
      <ProductImages
        items={mediaItems ?? []}
        isOnSale={isOnSale}
        ribbonText={ribbonText}
      />
    </>
  );
}
