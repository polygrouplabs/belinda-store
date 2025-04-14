import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { HeadlessClientContextProvider } from "@/context/headlessContext";

export const viewport: Viewport = {
  width: "device-width",
  userScalable: false,
};

export const metadata: Metadata = {
  title: "belinda-shop",
  description: "belinda-shop",
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
    <html lang="en" className="scroll-smooth">
      <HeadlessClientContextProvider>
        <body className={`${montserrat.className} antialiased`}>
          {children}
        </body>
      </HeadlessClientContextProvider>
    </html>
  );
}
