import { Roboto } from "next/font/google";
import { productInterface } from "@/interfaces/product";

import ProductList from "./product/section/ProductList";

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
    <section
      id="main"
      className="min-h-[100vh] flex flex-col justify-center items-center my-20"
    >
      <h2
        className={`text-3xl font-bold tracking-wider text-grey-dark text-center md:text-5xl ${roboto.className}`}
      >
        {title}
      </h2>
      <ProductList products={products} />
    </section>
  );
};

export default BestSelling;
