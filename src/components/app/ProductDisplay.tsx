"use client";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { productInterface } from "@/interfaces/product";
import useProductCard from "@/hooks/product/useProductCard";

interface ProductDisplayProps {
  className?: string;
  sizes?: string;
  product: productInterface;
}

const ProductDisplay = ({
  product,
  className,
  sizes = "100vw",
}: ProductDisplayProps) => {
  const { isOnSale, ribbonText } = useProductCard(product);
  const [isHovered, setIsHovered] = useState(false);

  // const addToCart = useCartStore((state) => state.addItem);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/product/${product._id}`}
        className="block w-full h-full relative"
      >
        <Image
          src={product.media?.mainMedia?.image?.url ?? ""}
          alt="product"
          fill
          sizes={sizes}
          className="object-top object-cover absolute hover:opacity-0 duration-500 z-10"
          quality={100}
        />

        {product.media?.items && (
          <Image
            src={product.media?.items[1]?.image?.url ?? ""}
            alt="product"
            fill
            sizes={sizes}
            className="object-top object-cover absolute top-0 left-0 transition-opacity duration-300 z-0"
            quality={100}
          />
        )}
      </Link>
      <div className="absolute left-0 top-6 z-20">
        {isOnSale && (
          <div className="bg-red text-white text-[10px] px-2 py-1 mb-2">OFERTA</div>
        )}
        {ribbonText && (
          <div className="bg-black text-white text-[10px] px-2 py-1">
            {ribbonText}
          </div>
        )}
      </div>

      <div
        onClick={() => {}}
        className={`absolute bottom-0 left-0 right-0 h-[72px] bg-gold cursor-pointer hover:bg-gold-dark transition-opacity duration-300 flex items-center justify-center ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <HiOutlineShoppingCart size={20} className="text-white" />
      </div>
    </div>
  );
};

export default ProductDisplay;
