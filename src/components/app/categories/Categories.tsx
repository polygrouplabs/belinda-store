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
      className="flex flex-col min-h-[80vh] justify-center items-center h-max pt-20 pb-40"
    >
      <div className="w-full">
        <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-5 gap-2 md:gap-4 lg:max-w-6xl lg:mx-auto">
          {/* Primera imagen que ocupa 2 columnas y 2 filas */}
          <Link
            prefetch={true}
            href={`/productos/${categories[2].slug}`}
            className="duration-100 hover:scale-105 col-span-2 row-span-2"
          >
            <div className="w-full aspect-square relative md:shadow-md">
              <Image
                width={800}
                height={800}
                className="w-full aspect-square"
                sizes="(min-width: 1024px) 700px, 100vw"
                src={categories[1].media?.mainMedia?.image?.url || ""}
                alt={categories[1].name!}
              />
            </div>
          </Link>

          {/* Resto de las imágenes */}
          {categories.slice(2, 8).map((categorie, index) => (
            <Link
              key={index}
              prefetch={true}
              href={`/productos/${categorie.slug}`}
              className="duration-100 hover:scale-105"
            >
              <div className="w-full aspect-square relative md:shadow-md">
                <Image
                  width={600}
                  height={600}
                  className="w-full aspect-square"
                  sizes="(min-width: 1024px) 576px, 100vw"
                  src={categorie.media?.mainMedia?.image?.url || ""}
                  alt={categorie.name!}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
