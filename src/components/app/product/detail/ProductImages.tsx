"use client";

import Image from "next/image";

import { productMediaItemInterface } from "@/interfaces/product";

import defaultProductImages from "@/assets/images/product_default_image.jpg";

interface ProductImagesSlideProps {
  items: productMediaItemInterface[];
  isOnSale?: boolean;
  ribbonText?: string;
}

export default function ProductImages({
  items,
  isOnSale,
  ribbonText,
}: ProductImagesSlideProps) {
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

            {index === 0 && (
              <div className="absolute left-0 top-6 z-20">
                {isOnSale && (
                  <div className="bg-red text-white text-[10px] px-2 py-1 mb-2">
                    OFERTA
                  </div>
                )}
                {ribbonText && (
                  <div className="bg-black text-white text-[10px] px-2 py-1">
                    {ribbonText}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
