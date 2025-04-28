"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

import { media } from "@wix/sdk";
import { items } from "@wix/data";

import { PosterData } from "@/interfaces/cms";
import { useHeadlessClient } from "@/hooks/sdk/useHeadlessClient";

import isotipo from "@/assets/isotipo.png";

type posterDataQuery = items.WixDataQuery;
type posterResponse = items.WixDataResult;

const Poster = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [posterData, setPosterData] = useState<PosterData | null>(null);

  const headlessClient = useHeadlessClient();
  const posterDataQuery: posterDataQuery | null =
    headlessClient.items.query("posters");

  useEffect(() => {
    const getBanners = async () => {
      try {
        const posterDataRes: posterResponse = await posterDataQuery.find();
        if (posterDataRes?.items?.length) {
          setPosterData(posterDataRes.items[0] as PosterData);
        } else {
          setError("No se encontraron datos del póster.");
        }
      } catch (error) {
        console.error("Failed to fetch banners:", error);
        setError("Error al cargar los datos del póster.");
      } finally {
        setLoading(false);
      }
    };

    getBanners();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const desktopImages = useMemo(() => {
    if (!posterData?.desktop) return [];
    return posterData.desktop.map((desktopIMG) =>
      media.getImageUrl(desktopIMG.src)
    );
  }, [posterData]);

  if (error) {
    return (
      <div className="w-full bg-red-100 text-red-700 p-4 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* MOBILE */}
      <div className="md:hidden container mx-auto">
        <div className="relative w-full max-w-[402px] aspect-[402/962] mx-auto">
          {loading ? (
            <div className="w-full h-full animate-pulse flex justify-center items-center">
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
            <Image
              src={media.getImageUrl(posterData!.mobile).url}
              alt="poster"
              fill
              sizes="(max-width: 1024px) 402px"
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* PC */}
      <div
        className="hidden w-full relative md:flex md:justify-center md:items-center aspect-[1440/800] bg-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading ? (
          <div className="w-full h-full animate-pulse flex justify-center items-center">
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
            <Image
              width={1440}
              height={800}
              src={desktopImages[0].url}
              alt="poster"
              sizes="100vw"
              className="max-w-[1440px] object-cover mx-auto shadow-lg xl:rounded-3xl"
              priority
              quality={100}
            />
            {desktopImages[1] && (
              <Image
                width={1440}
                height={800}
                src={desktopImages[1].url}
                alt="poster hover"
                sizes="100vw"
                className={`max-w-[1440px] object-cover absolute inset-0 m-auto transition-opacity duration-300 shadow-lg xl:rounded-3xl ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                quality={100}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Poster;
