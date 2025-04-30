"use client";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { /* BsFillBagPlusFill */ BsEye } from "react-icons/bs";
import { productInterface } from "@/interfaces/product";
import { products } from "@wix/stores";

interface ProductDisplayProps {
  className?: string;
  sizes?: string;
  product: productInterface;
  showBadge?: boolean;

  stock?: products.InventoryStatus;
  isOnSale?: boolean;
  ribbonText?: string | undefined;
}

const ProductDisplay = ({
  product,
  className,
  sizes = "100vw",
  showBadge = false,
  stock,
  isOnSale,
  ribbonText,
}: ProductDisplayProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // const addToCart = useCartStore((state) => state.addItem);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/producto/${product._id}`}
        className="block w-full h-full relative"
      >
        <Image
          src={product.media?.mainMedia?.image?.url ?? ""}
          alt="product"
          fill
          sizes={sizes}
          className="object-center object-cover absolute hover:opacity-0 duration-500 z-10"
          quality={100}
        />

        {product.media?.items && (
          <Image
            src={product.media?.items[1]?.image?.url ?? ""}
            alt="product"
            fill
            sizes={sizes}
            className="object-center object-cover absolute top-0 left-0 transition-opacity duration-300 z-0"
            quality={100}
          />
        )}
      </Link>
      {showBadge && (
        <>
          <div className="absolute left-0 top-0 z-20">
            {isOnSale && (
              <div className="bg-green-500 text-white text-xs px-2 py-1 mb-2">
                OFERTA
              </div>
            )}
            {ribbonText && (
              <div className="bg-black text-white text-xs px-2 py-1">
                {ribbonText}
              </div>
            )}
          </div>

          {stock === products.InventoryStatus.OUT_OF_STOCK && (
            <div className="bg-red text-white text-xs px-2 py-1 absolute right-0 top-0 z-[20]">
              SIN STOCK
            </div>
          )}
        </>
      )}

      <div
        onClick={() => {
          router.push(`/producto/${product._id}`);
        }}
        className={`absolute bottom-0 left-0 right-0 h-[72px] bg-gold cursor-pointer hover:bg-gold-dark transition-opacity duration-300 flex items-center justify-center ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <BsEye size={30} className="text-white" />
      </div>
    </div>
  );
};

export default ProductDisplay;
