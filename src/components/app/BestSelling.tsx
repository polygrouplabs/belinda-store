import { productInterface } from "@/interfaces/product";

import ProductList from "./product/section/ProductList";

interface bestSellingProps {
  title: string;
  products: productInterface[];
}

const BestSelling = ({ title, products }: bestSellingProps) => {
  return (
    <section
      id="main"
      className="min-h-[100vh] flex flex-col justify-center items-center my-20 md:my-40"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-10">{title}</h2>

      <ProductList products={products} />
    </section>
  );
};

export default BestSelling;
