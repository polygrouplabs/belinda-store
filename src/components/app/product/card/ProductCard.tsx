"use client";

import ProductDisplay from "../detail/ProductDisplay";
import useProductCard from "@/hooks/product/useProductCard";
import { productInterface } from "@/interfaces/product";

interface ProductCardProps {
  product: productInterface;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    stock,
    isOnSale,
    formattedPrice,
    formattedDiscountedPrice,
    ribbonText,
    brandName,
    currency,
  } = useProductCard(product);

  return (
    <div className="w-full lg:w-fit block relative  ">
      <ProductDisplay
        product={product}
        className="w-full h-[240px] lg:w-[312px] lg:h-[400px]"
        sizes="312px"
        showBadge={true}
        stock={stock}
        isOnSale={isOnSale}
        ribbonText={ribbonText}
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
