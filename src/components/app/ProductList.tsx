import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="container mx-auto my-10 max-w-[73rem] px-4">
            <div className="flex flex-wrap mt-8 justify-center lg:justify-between gap-8 lg:gap-6 lg:after:content-[''] lg:after:basis-[312px]">
                {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
    );
}
