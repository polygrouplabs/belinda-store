import { items } from "@wix/data";

export interface WixImageModel {
  description: string;
  slug: string;
  alt: string;
  link?: string;
  src: string;
  target?: string;
  title: string;
  type: string;
  settings: {
    width: number;
    height: number;
    focalPoint: [number, number];
  };
}

export interface BannerData extends items.WixDataItem {
  desktop: WixImageModel[];
  mobile: WixImageModel[];
  pathname: string;
  colors: string[];
  titulo: string;
}

export interface PosterData extends items.WixDataItem {
  desktop: WixImageModel[];
  mobile: string;
  pathname: string;
}
