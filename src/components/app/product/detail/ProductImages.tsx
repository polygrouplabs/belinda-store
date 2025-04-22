"use client";

import Image from "next/image";

import { productMediaItemInterface } from "@/interfaces/product";

import defaultProductImages from "@/assets/images/product_default_image.jpg";

interface ProductImagesSlideProps {
  items: productMediaItemInterface[];
}

export default function ProductImages({ items }: ProductImagesSlideProps) {
  return (
    <div className="hidden lg:block h-[80vh] overflow-y-auto pr-4">
      <div className="grid grid-cols-2 gap-4">
        {items.map((item: productMediaItemInterface, index) => (
          <div
            key={index}
            className={`relative ${index === 0 ? "col-span-2" : "col-span-1"}`}
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={item.image ? item.image.url! : defaultProductImages.src}
                alt={`${item.title} - product ${index + 1}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
