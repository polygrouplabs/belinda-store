import { useEffect, useState } from "react";
import { productInterface } from "@/interfaces/product";
import { handleFormatValue } from "@/utils/handle";

interface UseProductCardResult {
  isOnSale: boolean;
  formattedPrice: string | null;
  formattedDiscountedPrice: string | null;
  ribbonText: string | undefined;
  brandName: string | undefined;
  currency: string | undefined;
}

const useProductCard = (product: productInterface): UseProductCardResult => {
  const [isOnSale, setIsOnSale] = useState(false);
  const [formattedPrice, setFormattedPrice] = useState<string | null>(null);
  const [formattedDiscountedPrice, setFormattedDiscountedPrice] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (product.name === "Vestido Negro") {
      console.log("PRODUCT CARD =>", product);
    }

    const isDiscounted =
      product.priceData?.price !== product.priceData?.discountedPrice;
    setIsOnSale(isDiscounted);

    if (product.priceData) {
      setFormattedPrice(handleFormatValue(product.priceData.price!));
      if (isDiscounted) {
        setFormattedDiscountedPrice(
          handleFormatValue(product.priceData.discountedPrice!)
        );
      }
    }
  }, [product]);

  const ribbonText = product.ribbon?.toUpperCase();
  const brandName = product.brand?.split(" ")[0];
  const currency = product.priceData?.currency?.toUpperCase();

  return {
    isOnSale,
    formattedPrice,
    formattedDiscountedPrice,
    ribbonText,
    brandName,
    currency,
  };
};

export default useProductCard;
