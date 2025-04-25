"use client";

import ProductDisplay from "./ProductDisplay";
import useProductCard from "@/hooks/product/useProductCard";
import { productInterface } from "@/interfaces/product";

interface ProductCardProps {
  product: productInterface;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    isOnSale,
    formattedPrice,
    formattedDiscountedPrice,
    ribbonText,
    brandName,
    currency,
  } = useProductCard(product);

  return (
    <div className="w-full lg:w-fit block relative  ">
      <div className="absolute left-0 top-6 z-20">
        {isOnSale && (
          <div className="bg-red text-white text-xs px-2 py-1 mb-2">OFERTA</div>
        )}
        {ribbonText && (
          <div className="bg-black text-white text-xs px-2 py-1">
            {ribbonText}
          </div>
        )}
      </div>

      <ProductDisplay
        product={product}
        className="w-full h-[240px] lg:w-[312px] lg:h-[400px]"
        sizes="312px"
      />

      <div className="w-full px-2 mt-4 space-y-2 text-h5">
        <div className="flex justify-between">
          <h4 className="text-black">{product.name}</h4>
          <h5 className="text-black/50">{brandName}</h5>
        </div>
        {isOnSale ? (
          <div className="flex justify-between items-center">
            <h5 className="font-semibold text-red">
              {formattedDiscountedPrice} {currency}
            </h5>
            <span className="text-h6 text-black/50 line-through">
              {formattedPrice} {currency}
            </span>
          </div>
        ) : (
          <h5 className="font-semibold text-black">
            {formattedPrice} {currency}
          </h5>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
