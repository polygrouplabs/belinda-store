import { productInterface } from "@/interfaces/product";

import ProductCarousel from "./product/section/ProductCarousel";
import ProductCarousel2 from "./product/section/ProductCarousel2";
import ProductCard from "./product/card/ProductCard";

interface featuresProps {
  title: string;
  products: productInterface[];
}

export default function Features({ title, products }: featuresProps) {
  return (
    <section
      className={`w-full h-max flex flex-col justify-center items-center ${
        title === "NUEVA COLECCIÓN" ? "py-20 bg-pink-light/50" : "py-[10px]"
      }`}
    >
      {title === "NUEVA COLECCIÓN" && (
        <h2 className="text-3xl md:text-4xl mb-10">{title}</h2>
      )}

      <div className="max-w-[1280px] flex flex-col md:flex-row gap-[10px] sm:gap-[5px] justify-center items-center">
        {title === "NUEVA COLECCIÓN" ? (
          <>
            <div className="w-full transition hover:scale-105">
              <ProductCard height="h-[480px]" product={products[0]} />
            </div>
            <ProductCarousel
              slice={[1, 8]}
              products={products}
              slidesPerView={2}
            />
          </>
        ) : (
          <ProductCarousel2
            slice={[0, 7]}
            products={products}
            slidesPerView={4}
          />
        )}
      </div>
    </section>
  );
}
