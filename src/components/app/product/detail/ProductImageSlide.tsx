"use client";

import Image from "next/image";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { productMediaItemInterface } from "@/interfaces/product";

import defaultProductImages from "@/assets/images/product_default_image.jpg";

interface ProductImagesSlideProps {
  items: productMediaItemInterface[];
}

export default function ProductImagesSlide({ items }: ProductImagesSlideProps) {
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
