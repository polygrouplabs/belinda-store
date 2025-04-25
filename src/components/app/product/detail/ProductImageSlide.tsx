"use client";

import Image from "next/image";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { productMediaItemInterface } from "@/interfaces/product";

import defaultProductImages from "@/assets/images/product_default_image.jpg";

interface ProductImagesSlideProps {
  items: productMediaItemInterface[];
  isOnSale?: boolean;
  ribbonText?: string;
}

export default function ProductImagesSlide({
  items,
  isOnSale,
  ribbonText,
}: ProductImagesSlideProps) {
  return (
    <div className="relative my-10 lg:hidden">
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        className="aspect-[3/4] w-full product-swiper"
      >
        {items?.map((item: productMediaItemInterface, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={item.image ? item.image.url! : defaultProductImages.src}
                alt={"Imagen principal del producto"}
                fill
                className="object-cover"
                sizes="100vw"
                priority={true}
                quality={100}
              />

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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
