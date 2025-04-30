import { collectionsInterface } from "@/interfaces/collection";
import Image from "next/image";
import Link from "next/link";

interface categoriesProps {
  categories: collectionsInterface[];
}

export default function Categories({ categories }: categoriesProps) {
  return (
    <section
      id="main"
      className="flex flex-col justify-center items-center h-max py-20 md:py-40"
    >
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-10">
        Categorías
      </h2>

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 lg:max-w-6xl lg:mx-auto">
          <Link
            prefetch={true}
            href={`/productos/${categories[2].slug}`}
            className="duration-100 hover:scale-105"
          >
            <div className="w-full aspect-square relative shadow-md">
              <Image
                width={600}
                height={600}
                className="w-full aspect-square"
                sizes="(min-width: 1024px) 576px, 100vw"
                src={categories[2].media?.mainMedia?.image?.url || ""}
                alt={categories[2].name!}
              />
            </div>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:gap-4">
            {categories.slice(4, 8).map((categorie, index) => (
              <Link
                key={index}
                prefetch={true}
                href={`/productos/${categorie.slug}`}
                className="duration-100 hover:scale-105"
              >
                <div className="w-full aspect-square relative shadow-md">
                  <Image
                    width={600}
                    height={600}
                    className="w-full aspect-square"
                    sizes="(min-width: 1024px) 576px, 100vw"
                    src={categorie.media?.mainMedia?.image?.url || ""}
                    alt={categorie.name!}
                  />

                  <div className="w-full absolute bottom-0 bg-gold-light/90">
                    <p className="text-h5 text-center py-2 font-semibold">
                      {categorie.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
