import Image from "next/image";
import { Product } from "@/types/product";
import { TfiClose } from "react-icons/tfi";
import { useCartStore } from "@/store/cart";
import { QuantityCounter } from "../../QuantityCounter";

interface CartItemProps {
    item: Product;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
}

export function CartItem({ item, quantity, onQuantityChange }: CartItemProps) {
    const removeItem = useCartStore(state => state.removeItem);

    return (
        <div className="flex items-center gap-4 p-4 border-b border-grey-50 relative">
            <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 text-grey hover:text-black"
            >
                <TfiClose size={16} />
            </button>
            <div className="relative w-[120px] aspect-[95/122]">
                <Image
                    src={item.cover}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="120px"
                />
            </div>
            <div className="flex-1 flex flex-col gap-3">
                <h6 className="text-h6">{item.name}</h6>
                <span className="text-h6 font-bold">${item.price.toLocaleString('es-CO')}</span>
                <QuantityCounter className="max-w-[240px] h-[33px] text-base" value={quantity} onValueChange={onQuantityChange} />
            </div>
        </div>
    );
} 