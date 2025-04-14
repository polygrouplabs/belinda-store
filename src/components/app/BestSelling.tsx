import { Roboto } from "next/font/google";
import { productInterface } from "@/interfaces/product";

import ProductList from "./ProductList";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

interface bestSellingProps {
  title: string;
  products: productInterface[];
}

const BestSelling = ({ title, products }: bestSellingProps) => {
  return (
    <section id="main">
      <div className="h-[150px] hidden lg:flex items-center justify-center mb-8">
        <h2
          className={`text-5xl font-bold tracking-wider text-grey-dark text-center ${roboto.className}`}
        >
          {title}
        </h2>
      </div>
      <ProductList products={products} />
    </section>
  );
};

export default BestSelling;
