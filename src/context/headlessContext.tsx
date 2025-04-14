"use client";

import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

import { createClient, OAuthStrategy } from "@wix/sdk-react";
import { products, collections, brandsV3 } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";
import { items } from "@wix/data";
import { members } from "@wix/members";
import { NEXT_PUBLIC_HEADLESS_ID_CLIENT } from "@/utils/env";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

const env = {
  id_client: NEXT_PUBLIC_HEADLESS_ID_CLIENT,
};

export const headlessClientInstance = createClient({
  modules: {
    products,
    collections,
    members,
    currentCart,
    redirects,
    brandsV3,
    items,
  },
  auth: OAuthStrategy({
    clientId: env.id_client!,
    tokens: {
      refreshToken,
      accessToken: {
        value: "",
        expiresAt: 0,
      },
    },
  }),
});

export type HeadlessClientType = typeof headlessClientInstance;

export const HeadlessClientContext = createContext<HeadlessClientType>(
  headlessClientInstance
);

export const HeadlessClientContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <HeadlessClientContext.Provider value={headlessClientInstance}>
      {children}
    </HeadlessClientContext.Provider>
  );
};
