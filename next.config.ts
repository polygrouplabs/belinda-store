import {
  NEXT_PUBLIC_HEADLESS_ID_CLIENT,
  NEXT_PUBLIC_HEADLESS_ID_STORE,
  NEXT_PUBLIC_ALL_PRODUCTS_ID,
  NEXT_PUBLIC_BEST_SELLERS_ID,
  NEXT_PUBLIC_NEW_COLLECTIONS_ID,
  NEXT_PUBLIC_OFFERS_ID,
} from "@/utils/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
      env: {
        NEXT_PUBLIC_HEADLESS_ID_CLIENT: NEXT_PUBLIC_HEADLESS_ID_CLIENT,
        NEXT_PUBLIC_HEADLESS_ID_STORE: NEXT_PUBLIC_HEADLESS_ID_STORE,
        NEXT_PUBLIC_ALL_PRODUCTS_ID: NEXT_PUBLIC_ALL_PRODUCTS_ID,
        NEXT_PUBLIC_BEST_SELLERS_ID: NEXT_PUBLIC_BEST_SELLERS_ID,
        NEXT_PUBLIC_NEW_COLLECTIONS_ID: NEXT_PUBLIC_NEW_COLLECTIONS_ID,
        NEXT_PUBLIC_OFFERS_ID: NEXT_PUBLIC_OFFERS_ID,
      },
    });

    return config;
  },
};

export default nextConfig;
