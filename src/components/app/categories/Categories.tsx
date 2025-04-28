import { productInterface } from "@/interfaces/product";
import ProductDisplay from "../product/detail/ProductDisplay";

interface newSeriesProps {
  products: productInterface[];
}

export default function Categories({ products }: newSeriesProps) {
  return (
    <>
      <div className="w-full bg-gold-50 py-20">
        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Nuestras categorías
        </h2>
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
}
