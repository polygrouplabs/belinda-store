import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { orders } from "@wix/ecom";
import { members } from "@wix/members";
import { cookies } from "next/headers";

import { NEXT_PUBLIC_HEADLESS_ID_CLIENT } from "@/utils/env";

export const headlessServer = async () => {
  let refreshToken = null;
  try {
    const cookieStore = await cookies();
    refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
  } catch (error) {
    console.error("Error parsing refresh token:", error);
  }

  if (!refreshToken) {
    console.warn("No refresh token found. Returning null.");
    return null;
  }

  if (!NEXT_PUBLIC_HEADLESS_ID_CLIENT) {
    console.error("ID CLIENT NOT PROVIDED");
    return;
  }

  const headlessServerInstance = createClient({
    modules: {
      products,
      collections,
      orders,
      members,
    },
    auth: OAuthStrategy({
      clientId: NEXT_PUBLIC_HEADLESS_ID_CLIENT,
      tokens: {
        refreshToken,
        accessToken: {
          value: "",
          expiresAt: 0,
        },
      },
    }),
  });

  return headlessServerInstance;
};
