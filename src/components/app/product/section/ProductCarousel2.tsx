"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import ProductCard from "../card/ProductCard";
import { productInterface } from "@/interfaces/product";
import { useMemo } from "react";

export default function Carrousel({
  products,
  slidesPerView,
  slice,
}: {
  products: productInterface[];
  slidesPerView: number;
  slice: number[];
}) {
  const SWIPER_CONFIG_DESKTOP = {
    slidesPerView: slidesPerView,
    spaceBetween: 10,
    loop: products.length > slidesPerView,
    pagination: {
      clickable: true,
    },
    modules: [Navigation, Autoplay, Pagination],
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      stopOnLastSlide: false,
    },
  };

  const SWIPER_CONFIG_MOBILE = {
    slidesPerView: 1,
    spaceBetween: 5,
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
    },
    modules: [Navigation, Autoplay, Pagination],
    allowTouchMove: true,
    centeredSlides: true,
  };

  const desktopSlide = useMemo(() => {
    return products.slice(slice[0], slice[1]).map((product, index) => (
      <SwiperSlide key={index}>
        <ProductCard
          width="w-full"
          height="h-[580px]"
          product={product}
          key={product._id}
        />
      </SwiperSlide>
    ));
  }, [products, slice]);

  const mobileSlide = useMemo(() => {
    return products.slice(slice[0], slice[1]).map((product, index) => (
      <SwiperSlide key={index}>
        <ProductCard height="h-[480px]" product={product} key={product._id} />
      </SwiperSlide>
    ));
  }, [products, slice]);

  return (
    <div className={"max-w-[400px] md:max-w-[2160px]"}>
      <div className="hidden md:block">
        <Swiper className="mySwiper" {...SWIPER_CONFIG_DESKTOP}>
          {desktopSlide}
        </Swiper>
      </div>

      <div className="md:hidden">
        <Swiper {...SWIPER_CONFIG_MOBILE} className="mySwiper">
          {mobileSlide}
        </Swiper>
      </div>
    </div>
  );
}
