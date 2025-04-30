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
      id="main"
      className={`w-full h-max flex flex-col justify-center items-center py-20 ${
        title === "NUEVA COLECCIÓN" && "bg-pink-light/50"
      }`}
    >
      {title === "NUEVA COLECCIÓN" && (
        <h2 className="text-3xl md:text-4xl mb-10">{title}</h2>
      )}

      <div className="max-w-[1280px] flex flex-col md:flex-row gap-[40px] sm:gap-[5px] justify-center items-center">
        {title === "NUEVA COLECCIÓN" ? (
          <>
            <div className="w-full px-2 transition hover:scale-105">
              <ProductCard height="h-[340px]" product={products[0]} />
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
