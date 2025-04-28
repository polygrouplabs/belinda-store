import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { HeadlessClientContextProvider } from "@/context/headlessContext";

import "./globals.css";
import favicon from "./favicon.ico";

const title = "BS Belinda store";
const description =
  "BS Belinda Store. Tu boutique de confianza, especializada en vestir a la mujer con prendas que combinan calidad, estilo y un toque de distinción.";

export const viewport: Viewport = {
  width: "device-width",
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bsbelindastore.com"),
  title: title,
  description: description,
  openGraph: {
    siteName: title,
    title: title,
    description: description,
    countryName: "Colombia",
    images: [
      {
        url: "/SEO.jpg",
        width: 1916,
        height: 982,
      },
    ],
    locale: "es_ES",
  },
  icons: {
    icon: favicon.src,
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: ["/SEO.jpg"],
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />

        {/* Meta tags de Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/SEO.jpg" />
        <meta property="og:url" content="https://www.bsbelindastore.com" />
        <meta property="og:image:width" content="1916" />
        <meta property="og:image:height" content="982" />
        <meta property="og:image:alt" content="BS Belinda - Tienda online" />
        <meta
          name="keywords"
          content="Tienda virtual, e-commerce, vestidos, blusas, ropa para mujer"
        />
        <meta property="og:type" content="website" />

        {/* Meta tags de Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/SEO.jpg" />

        {/* Meta tags para Android */}
        <meta name="theme-color" content="#f1ddda" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="apple-mobile-web-app-title" content="BS Belinda" />

        <link rel="manifest" href="/manifest.json" />
      </head>

      <HeadlessClientContextProvider>
        <body className={`${montserrat.className} antialiased`}>
          {children}
        </body>
      </HeadlessClientContextProvider>
    </html>
  );
}
