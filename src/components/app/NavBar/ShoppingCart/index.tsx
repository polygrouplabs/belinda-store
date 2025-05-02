import { RiShoppingBag2Fill } from "react-icons/ri";
import { cartInterface } from "@/interfaces/cart";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

interface ShoppingCartProps {
  cart: cartInterface;
  isLoading: boolean;
  handleCheckout: () => void;
  deleteCart: () => void;
  children: React.ReactNode;
}

export default function ShoppingCart({ cart, children }: ShoppingCartProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Mi bolsa"
          className="flex items-center justify-center lg:hover:text-gold relative"
        >
          <RiShoppingBag2Fill className="w-[30px] h-[30px] lg:w-[22px] lg:h-[22px]" />
          {cart.lineItems && cart.lineItems?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cart.lineItems.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      {children}
    </Sheet>
  );
}
