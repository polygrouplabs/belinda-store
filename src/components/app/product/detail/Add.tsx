"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useHeadlessClient } from "@/hooks/sdk/useHeadlessClient";

// import { useCartStore } from "@/context/useCartStore";
import { Button } from "@/components/ui/button";
import { QuantityCounter } from "@/components/app/QuantityCounter";

const Add = ({
  productId,
  variantId,
  stockNumber,
  disabled,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
  disabled?: boolean;
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const headlessClient = useHeadlessClient();
  // const { addItem, isLoading } = useCartStore();

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (quantity > stockNumber) {
      setQuantity(stockNumber);
    } else if (quantity === 0 && stockNumber !== 0) {
      setQuantity(1);
    }
  }, [stockNumber, quantity]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <h4 className="font-medium">Elige una cantidad</h4>
        {stockNumber < 1 ? (
          <span className="flex items-center w-max text-[.6rem] text-white bg-pink px-4 rounded-lg">
            Producto sin stock
          </span>
        ) : (
          <div className="text-xs mb-2">
            Quedan <br />{" "}
            <span className="text-orange-500">{stockNumber} productos</span>{" "}
            restantes!
          </div>
        )}
      </div>

      <div className="flex justify-between items-end">
        {/* Cantidad */}
        <div className="flex flex-col space-y-2">
          <QuantityCounter
            className="w-[180px]"
            value={quantity}
            min={1}
            max={stockNumber}
            onValueChange={handleQuantity}
          />
        </div>

        {/* Agregar al carrito */}
        <Button
          onClick={() => {
            if (stockNumber === 0) {
              toast.info("No hay stock disponible para este producto");
              return;
            }
          }}
          variant={"default"}
          className="w-[150px] h-[40px]"
        >
          Agregar al carrito
        </Button>

        {/* <button
          onClick={() => {
            if (disabled) {
              toast.info("Seleccione las opciones del producto a comprar");

              return;
            }

            addItem(headlessClient, productId, variantId, quantity);
          }}
          disabled={isLoading || stockNumber < 1}
          className={`${
            disabled ? "cursor-not-allowed opacity-75" : ""
          } w-[140px] rounded-full disabled:opacity-75 disabled:cursor-not-allowed disabled:ring-0`}
        >
          Agregar al carrito
        </button> */}
      </div>
    </div>
  );
};

export default Add;
