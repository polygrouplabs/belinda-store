import ProductCard from "./ProductCard";
import { productInterface } from "@/interfaces/product";

interface ProductListProps {
  products: productInterface[];
}

// * mt-8 gap-8 lg:gap-6 lg:after:content-[''] lg:after:basis-[312px]

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="container mx-auto my-10 max-w-[73rem] px-4">
      <div className="grid mx-auto gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
