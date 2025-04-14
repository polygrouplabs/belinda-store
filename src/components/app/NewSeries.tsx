import { productInterface } from "@/interfaces/product";
import ProductDisplay from "./ProductDisplay";

interface newSeriesProps {
  products: productInterface[];
}

const NewSeries = ({ products }: newSeriesProps) => {
  return (
    <>
      <div className="relative w-full h-[250px] bg-gold-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-2xl tracking-wider flex flex-col lg:flex-row items-center lg:font-bold text-black text-center">
            <span>DESCUBRE LA</span>
            <span>NUEVA COLECCIÓN</span>
          </h2>
        </div>
      </div>
      <div className="w-full bg-gold-50 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 lg:max-w-6xl lg:mx-auto">
          <ProductDisplay
            product={products[0]}
            className="w-full aspect-square"
            sizes="(min-width: 1024px) 576px, 100vw"
            showBadge={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:gap-4">
            {products.slice(1, 5).map((product, index) => (
              <ProductDisplay
                key={index}
                product={product}
                className="w-full aspect-square"
                sizes="(min-width: 1024px) 288px, (min-width: 640px) 50vw, 100vw"
                showBadge={true}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSeries;
