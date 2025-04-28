import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_HEADLESS_ID_CLIENT } from "./utils/env";

export const middleware = async (request: NextRequest) => {
  const cookies = request.cookies;
  const res = NextResponse.next();

  if (cookies.get("refreshToken")) {
    return res;
  }

  const headlessClient = createClient({
    auth: OAuthStrategy({ clientId: NEXT_PUBLIC_HEADLESS_ID_CLIENT! }),
    headers: { "x-wix-client-id": NEXT_PUBLIC_HEADLESS_ID_CLIENT! },
  });

  const tokens = await headlessClient.auth.generateVisitorTokens();
  res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
};
