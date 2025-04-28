import { items } from "@wix/data";

export interface BannerImage {
  description: string;
  slug: string;
  alt: string;
  link: string;
  src: string;
  target: string;
  title: string;
  type: string;
  settings: {
    width: number;
    height: number;
    focalPoint: [number, number];
  };
}

export interface BannerData extends items.WixDataItem {
  desktop: BannerImage[];
  mobile: BannerImage[];
  pathname: string;
  colors: string[];
  titulo: string;
}
