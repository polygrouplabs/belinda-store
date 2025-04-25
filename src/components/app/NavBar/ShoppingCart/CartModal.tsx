"use client";
import { toast } from "sonner";

import { CgSearchLoading } from "react-icons/cg";
import { cartInterfaceUnknown } from "@/interfaces/cart";
import { handleFormatValue } from "@/utils/handle";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { RiShoppingBag2Fill } from "react-icons/ri";

export default function CartModal({
  cart,
  isLoading,
  isLocalLoading,
  handleCheckout,
  handleDeleteCart,
  children,
}: {
  cart: cartInterfaceUnknown;
  isLoading: boolean;
  isLocalLoading: boolean;
  handleCheckout: () => void;
  handleDeleteCart: () => void;
  children: React.ReactNode;
}) {
  const validateSubtotal = () => {
    if (cart.lineItems && cart.subtotal.amount <= 20000) {
      toast.info("Tu carrito debe ser mayor a $20.000");
    } else {
      handleCheckout();
    }
  };

  return (
    <SheetContent className="w-full sm:max-w-[420px] z-[9999] flex flex-col p-0">
      <SheetHeader className="mx-6 py-4 border-b border-grey">
        <SheetTitle className="text-h4 font-normal text-grey-dark">
          Mi bolsa
        </SheetTitle>
        <SheetDescription className="sr-only">
          Carrito de compras de Belinda Store. Aquí puedes ver los productos
          seleccionados, modificar cantidades y proceder al pago.
        </SheetDescription>
      </SheetHeader>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <CgSearchLoading size={80} />
        </div>
      ) : cart.lineItems && cart.lineItems.length > 0 ? (
        <>
          {/* productos de carrito */}
          <div className="flex-1 overflow-y-auto">{children}</div>

          {/* Precios y acciones */}
          <div className="border-t border-grey text-grey">
            <div className="px-6 py-4 space-y-2 text-h6">
              <div className="flex justify-between items-center">
                <span>Descuento</span>
                <span className="text-black font-semibold">- 20.000 COP</span>
              </div>
              <div className="flex justify-between items-start font-normal">
                <span>Subtotal</span>
                <div className="flex flex-col text-end">
                  <span className="text-black font-semibold">
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    {handleFormatValue(cart.subtotal.amount)} COP <br />{" "}
                  </span>
                  <span className="text-pink-600">+ Envío a domicilio</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={handleDeleteCart}
                  className="w-full"
                  variant={"secondary"}
                >
                  Vaciar carrito
                </Button>
                <Button
                  onClick={validateSubtotal}
                  disabled={isLocalLoading}
                  className="w-full"
                >
                  {isLocalLoading ? "Cargando..." : "Comprar"}
                </Button>
                {/* <SheetClose asChild></SheetClose> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <RiShoppingBag2Fill className="w-[60px] h-[60px] opacity-80" />
          <span className="text-h5">Su cesta está vacía.</span>
        </div>
      )}
    </SheetContent>
  );
}
