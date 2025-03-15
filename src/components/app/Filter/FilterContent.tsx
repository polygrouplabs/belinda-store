import { filterItems } from ".";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function FilterContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = (href: string) => {
        router.push(href);
    };

    return (
        <div className="flex flex-col gap-4 mt-6">
            {filterItems.map((item) => (
                <button
                    key={item.label}
                    onClick={() => handleClick(item.href)}
                    className={cn(
                        "text-left py-2 hover:text-gold transition-colors",
                        searchParams.get('sort') === item.href.split('=')[1] && 'text-gold'
                    )}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
} 