"use client";

import Image from "next/image";
import { useState } from "react";

const Poster = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full bg-gold">
      {/* MOBILE */}
      <div className="md:hidden container mx-auto">
        <div className="relative w-full max-w-[402px] aspect-[402/962] mx-auto">
          <Image
            src="/Belinda-Banner-Coleccion-Mobile.jpg"
            alt="poster"
            fill
            sizes="(max-width: 1024px) 402px"
            className="object-cover"
          />
        </div>
      </div>

      {/* PC */}
      <div
        className="hidden w-full relative md:flex md:justify-center md:items-center aspect-[1440/800] bg-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          width={1440}
          height={800}
          src="/Poster.jpg"
          alt="poster"
          sizes="100vw"
          className="max-w-[1440px] object-cover mx-auto shadow-lg xl:rounded-3xl"
          priority
          quality={100}
        />
        <Image
          width={1440}
          height={800}
          src="/PosterHover.jpg"
          alt="poster hover"
          sizes="100vw"
          className={`max-w-[1440px] object-cover absolute inset-0 m-auto transition-opacity duration-300 shadow-lg xl:rounded-3xl ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          quality={100}
        />
      </div>
    </div>
  );
};

export default Poster;
