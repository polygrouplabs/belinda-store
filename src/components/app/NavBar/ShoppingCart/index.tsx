import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { useRouter } from "next/navigation";
import { BsCart } from "react-icons/bs";
import { useCartStore } from "@/store/cart";
import { PiTrashLight } from "react-icons/pi";

export default function ShoppingCart() {
    const router = useRouter();
    const { items, total } = useCartStore();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button
                    aria-label="Mi bolsa"
                    className="flex items-center justify-center lg:text-gold-light lg:hover:text-gold relative"
                >
                    <BsCart className="w-[26px] h-[26px] lg:w-[22px] lg:h-[22px]" />
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {items.length}
                        </span>
                    )}
                </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-[420px] z-[9999] flex flex-col p-0">
                <SheetHeader className="mx-6 py-4 border-b border-grey">
                    <SheetTitle className="text-h4 font-normal text-grey-dark">
                        Mi bolsa
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        Carrito de compras de Belinda Store. Aquí puedes ver los productos seleccionados, modificar cantidades y proceder al pago.
                    </SheetDescription>
                </SheetHeader>

                {items.length > 0 ? (
                    <>
                        {/* 购物车商品列表 - 添加滚动区域 */}
                        <div className="flex-1 overflow-y-auto">
                            {items.map((item) => (
                                <CartItem
                                    key={item.product.id}
                                    item={item.product}
                                    quantity={item.quantity}
                                    onQuantityChange={(quantity) =>
                                        useCartStore.getState().updateQuantity(item.product.id, quantity)
                                    }
                                />
                            ))}
                            <div className="flex justify-end p-4">
                                <Button variant="hollow-grey-dark" className="w-[228px] h-[60px]">
                                    <PiTrashLight />
                                    <span className="text-h4">Eliminar</span>
                                </Button>
                            </div>
                        </div>

                        {/* 购物车底部 - 固定在底部 */}
                        <div className="border-t border-grey text-grey">
                            <div className="px-6 py-4 space-y-4 text-h4">
                                <div className="flex justify-between items-center font-normal">
                                    <span>Subtotal</span>
                                    <span>$&nbsp;{total.toLocaleString('es-CO')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Descuento</span>
                                    <span>-$&nbsp;0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Total</span>
                                    <span>$&nbsp;{total.toLocaleString('es-CO')}</span>
                                </div>
                                <SheetClose asChild>
                                    <Button
                                        onClick={() => router.push('/purchase')}
                                        className="w-full h-[68px]"
                                        variant="purchase"
                                    >
                                        Comprar
                                    </Button>
                                </SheetClose>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <span className="text-h4">Su cesta está vacía.</span>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}