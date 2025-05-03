"use client";

import { isIOS } from "@/utils/device";

import { useMemo, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { media } from "@wix/sdk";

import isotipo from "@/assets/isotipo.png";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

import { Button } from "../ui/button";
import { TfiArrowDown } from "react-icons/tfi";
import { SlSocialInstagram } from "react-icons/sl";

import { WixImageModel } from "@/interfaces/cms";
import { useHeroData } from "@/hooks/cms/useHeroData";

const SWIPER_CONFIG = {
  modules: [EffectFade, Autoplay],
  effect: "fade",
  slidesPerView: 1,
  allowTouchMove: false,
  speed: 800,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    stopOnLastSlide: false,
  },
};

const Banner = memo(() => {
  const router = useRouter();
  const { data: heroData, loading, error } = useHeroData();

  const handleButtonClick = useCallback(() => {
    if (heroData?.pathname) {
      router.push(heroData.pathname);
    }
  }, [heroData?.pathname, router]);

  const mobileSlides = useMemo(() => {
    return heroData?.mobile.map((bannerIMG: WixImageModel, index) => {
      const color = heroData.colors[index]?.replace(/'/g, "") || "#ffffff";
      const urlIMG = bannerIMG.src;
      const processedIMG = media.getImageUrl(urlIMG);

      return (
        <SwiperSlide
          key={bannerIMG.slug}
          className="relative w-full h-screen"
          style={{ backgroundColor: color }}
        >
          <div
            className={`relative w-full max-w-[460px] ${
              isIOS() ? "h-[90vh]" : "h-[100dvh]"
            } mx-auto`}
          >
            <Image
              src={processedIMG.url}
              alt={bannerIMG.title || "Banner image"}
              priority={index === 0}
              className="object-cover"
              sizes={`${bannerIMG.settings.width}px`}
              fill
              quality={100}
            />
          </div>
        </SwiperSlide>
      );
    });
  }, [heroData?.mobile, heroData?.colors]);

  const desktopSlides = useMemo(() => {
    return heroData?.desktop.map((bannerIMG: WixImageModel, index) => {
      const urlIMG = bannerIMG.src;
      const processedIMG = media.getImageUrl(urlIMG);

      return (
        <SwiperSlide key={index} className="relative w-full aspect-[1440/800]">
          <Image
            src={processedIMG.url}
            alt={bannerIMG.title || "Banner image"}
            priority={index === 0}
            quality={100}
            fill
            sizes="(min-width: 1024px) 100vw"
          />
        </SwiperSlide>
      );
    });
  }, [heroData?.desktop]);

  if (error) {
    return (
      <div className="w-full max-h-[100vh] flex justify-center items-center">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="relative">
      {loading ? (
        <div className="flex justify-center items-center w-full h-[100vh] bg-slate-200 animate-pulse">
          <Image
            width={120}
            height={80}
            src={isotipo}
            alt="Isotipo"
            sizes="w-[120px] h-auto"
            priority={true}
          />
        </div>
      ) : (
        <>
          {/* MOBILE */}
          <div className="lg:hidden">
            <Swiper {...SWIPER_CONFIG}>{mobileSlides}</Swiper>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:block">
            <Swiper {...SWIPER_CONFIG}>{desktopSlides}</Swiper>
          </div>

          {/* CONTENT */}
          <div className="w-full h-full absolute inset-0 z-10 flex justify-center items-center lg:justify-between lg:px-[160px]">
            <div className="flex flex-col items-center lg:items-start gap-4 text-white absolute lg:static top-[300px] bg-black/20 shadow-lg sm:shadow-none md:bg-transparent p-5 mx-5">
              <span className="text-[14px] leading-[30px] tracking-[5px] lg:text-h4 select-none">
                {heroData?.titulo?.split(",")[0]}
              </span>
              <span className="max-w-[480px] text-6xl lg:text-9xl select-none tracking-[0.2px]">
                {heroData?.titulo?.split(",")[1]}
              </span>
              <Button
                variant={"form-solid"}
                onClick={handleButtonClick}
                className="w-full h-[50px] border border-black/10 shadow-lg flex"
              >
                <span className="text-base font-semibold m-auto">Ver más</span>
              </Button>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-4">
              <span className="text-h6 [writing-mode:vertical-rl] select-none">
                Follow us
              </span>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/bsbelindastore"
                className="w-[35px] h-[35px] rounded-full bg-white flex"
                aria-label="Instagram"
              >
                <SlSocialInstagram className="m-auto text-gold" size={20} />
              </Link>
            </div>
          </div>

          <Link
            href="#main"
            className="hidden lg:inline"
            aria-label="Scroll down"
          >
            <TfiArrowDown
              className="absolute z-10 left-1/2 -translate-x-1/2 bottom-[100px] text-white"
              size={30}
            />
          </Link>
        </>
      )}
    </div>
  );
});

Banner.displayName = "Banner";

export default Banner;
