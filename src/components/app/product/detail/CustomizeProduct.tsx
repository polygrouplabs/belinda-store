"use client";

import {
  productOptionInterface,
  productVariantInterface,
} from "@/interfaces/product";
import { handleFormatValue } from "@/utils/handle";
import { useEffect, useMemo, useState } from "react";
import Add from "./Add";

interface CustomizeProductProps {
  productID: string;
  productVariants: productVariantInterface[];
  productOptions: productOptionInterface[];
}

export default function CustomizeProduct({
  productID,
  productVariants,
  productOptions,
}: CustomizeProductProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const [selectedVariant, setSelectedVariant] =
    useState<productVariantInterface>();

  const isActiveButton = useMemo(
    () => Object.keys(selectedOptions).length === productOptions.length,
    [selectedOptions, productOptions]
  );

  const isVariantInStock = useMemo(() => {
    return (choices: Record<string, string>) => {
      return productVariants.some((variant: productVariantInterface) => {
        const variantChoices = variant.choices;
        return (
          variantChoices &&
          Object.entries(choices).every(
            ([key, value]) => variantChoices[key] === value
          ) &&
          variant.stock?.inStock &&
          (variant.stock?.quantity ?? 0) > 0
        );
      });
    };
  }, [productVariants]);

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  useEffect(() => {
    const variant = productVariants.find((v) =>
      Object.entries(selectedOptions).every(
        ([key, value]) => v.choices?.[key] === value
      )
    );
    setSelectedVariant(variant);
  }, [selectedOptions, productVariants]);

  return (
    <>
      {/* Precios */}
      <div className="flex items-center gap-2 text-h3">
        {selectedVariant && (
          <div className="flex gap-5">
            <span className="font-bold">
              {handleFormatValue(
                selectedVariant.variant?.priceData?.discountedPrice ??
                  selectedVariant.variant?.priceData?.price ??
                  0
              )}{" "}
              COP
            </span>
            {selectedVariant.variant?.priceData?.price !==
              selectedVariant.variant?.priceData?.discountedPrice && (
              <span className="text-gray-500 line-through">
                {handleFormatValue(
                  selectedVariant.variant?.priceData?.price ?? 0
                )}{" "}
                COP
              </span>
            )}
          </div>
        )}
      </div>

      <p className="text-[.8rem] font-semibold">
        Impuestos incluídos.{" "}
        <span className="text-pink-400">Los gastos de envío</span> se calculan
        en la pantalla de pagos.
      </p>

      {/* Aviso de envío gratuito */}
      <div className=" bg-pink rounded-md text-white text-center p-2 text-h6">
        <span className="font-bold">ENVÍO GRATIS</span> POR COMPRAS SUPERIORES A{" "}
        <span className="font-bold">$ 200.000 COP</span>
      </div>

      <div className="h-[2px] bg-gray-200" />

      {productOptions.map((option) => (
        <ProductOption
          key={option.name}
          option={option}
          selectedOptions={selectedOptions}
          onSelect={handleOptionSelect}
          isVariantInStock={isVariantInStock}
        />
      ))}

      <Add
        disabled={!isActiveButton}
        productId={productID}
        variantId={selectedVariant?._id || ""}
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />

      <p className="text-h6">
        SKU:{" "}
        <span className="font-medium">
          {selectedVariant?.variant?.sku || "000000"}
        </span>
      </p>
    </>
  );
}

function ProductOption({
  option,
  selectedOptions,
  onSelect,
  isVariantInStock,
}: {
  option: productOptionInterface;
  selectedOptions: Record<string, string>;
  onSelect: (type: string, choice: string) => void;
  isVariantInStock: (choices: Record<string, string>) => boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-h6">Seleccionar {option.name}:</h4>
      <ul className="flex items-center gap-5 flex-wrap">
        {option.choices?.map((choice) => {
          const disabled = !isVariantInStock({
            ...selectedOptions,
            [option.name!]: choice.description!,
          });
          const selected = selectedOptions[option.name!] === choice.description;

          return option.optionType === "color" ? (
            <li
              key={choice.description}
              onClick={
                !disabled
                  ? () => onSelect(option.name!, choice.description!)
                  : undefined
              }
              className={`w-8 h-8 rounded-full border-2 ${
                selected
                  ? "border-pink-400"
                  : disabled
                  ? "border-grey"
                  : "border-gold"
              }`}
              style={{
                backgroundColor: choice.value,
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            />
          ) : (
            <li
              key={choice.description}
              onClick={
                !disabled
                  ? () => onSelect(option.name!, choice.description!)
                  : undefined
              }
              className={`ring-1 rounded-md py-1 px-4 text-sm ${
                selected
                  ? "ring-pink-400 text-pink-400"
                  : disabled
                  ? "ring-grey bg-slate-200 text-gray-500"
                  : "ring-gold"
              }`}
              style={{ cursor: disabled ? "not-allowed" : "pointer" }}
            >
              {choice.description}
            </li>
          );
        })}
      </ul>
      <div className="h-[2px] bg-gray-100" />
    </div>
  );
}
