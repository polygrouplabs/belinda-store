import { useEffect, useState } from "react";
import { inventoryStatues, productInterface } from "@/interfaces/product";
import { handleFormatValue } from "@/utils/handle";

interface UseProductCardResult {
  stock: inventoryStatues | undefined;
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

  const [stock, setStock] = useState<inventoryStatues | undefined>(undefined);

  useEffect(() => {
    const isDiscounted =
      product.priceData?.price !== product.priceData?.discountedPrice;
    setIsOnSale(isDiscounted);

    const thisStock: inventoryStatues | undefined =
      product.stock?.inventoryStatus;
    setStock(thisStock);

    if (product.priceData) {
      setFormattedPrice(handleFormatValue(product.priceData.price!));
      if (isDiscounted) {
        setFormattedDiscountedPrice(
          handleFormatValue(product.priceData.discountedPrice!)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ribbonText = product.ribbon?.toUpperCase();
  const brandName = product.brand?.split(" ")[0];
  const currency = product.priceData?.currency?.toUpperCase();

  return {
    stock,
    isOnSale,
    formattedPrice,
    formattedDiscountedPrice,
    ribbonText,
    brandName,
    currency,
  };
};

export default useProductCard;
