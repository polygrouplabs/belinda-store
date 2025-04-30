import { productInterface } from "@/interfaces/product";

import ProductCarousel from "./product/section/ProductCarousel";
import ProductCard from "./product/card/ProductCard";

interface featuresProps {
  title: string;
  products: productInterface[];
}

export default function Features({ title, products }: featuresProps) {
  return (
    <section
      id="main"
      className={`w-full h-max flex flex-col justify-center items-center py-20 md:py-40 ${
        title === "Nueva colección" && "bg-pink-light/50"
      }`}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-10">{title}</h2>

      <div className="w-full flex flex-wrap flex-col md:flex-row gap-[40px] sm:gap-[10px] justify-center items-center">
        {title === "Nueva colección" && (
          <div className="w-full md:w-max transition hover:scale-105">
            <ProductCard height="h-[400px]" product={products[0]} />
          </div>
        )}
        <ProductCarousel
          products={products}
          slidesPerView={title === "Nueva colección" ? 2 : 4}
          maxWidth={title === "Nueva colección" ? 640 : 1280}
          slice={title === "Nueva colección" ? [1, 8] : [0, 7]}
        />
      </div>
    </section>
  );
}
