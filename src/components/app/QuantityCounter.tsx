import { HiMinus, HiPlus } from "react-icons/hi2";
import { cn } from "@/lib/utils";

interface QuantityCounterProps {
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    className?: string;
}

export function QuantityCounter({
    value,
    onValueChange,
    min = 1,
    max = 99,
    className
}: QuantityCounterProps) {
    const handleDecrease = () => {
        if (value > min) {
            onValueChange(value - 1);
        }
    };

    const handleIncrease = () => {
        if (value < max) {
            onValueChange(value + 1);
        }
    };

    return (
        <div className={cn("flex items-center h-[40px] text-grey", className)}>
            <button
                onClick={handleDecrease}
                disabled={value <= min}
                className="h-full flex-1 flex items-center justify-center disabled:text-grey-light border border-grey hover:text-grey-dark hover:border-grey-dark"
                aria-label="Disminuir cantidad"
            >
                <HiMinus size={16} />
            </button>
            <div className="h-full flex-1 flex border-y hover:border border-grey hover:text-grey-dark hover:border-grey-dark">
                <span className="m-auto">{value}</span>
            </div>
            <button
                onClick={handleIncrease}
                disabled={value >= max}
                className="h-full flex-1 flex items-center justify-center disabled:text-grey-light border border-grey hover:text-grey-dark hover:border-grey-dark"
                aria-label="Aumentar cantidad"
            >
                <HiPlus size={16} />
            </button>
        </div>
    );
}