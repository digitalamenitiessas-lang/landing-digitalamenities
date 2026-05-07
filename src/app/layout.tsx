import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import "./globals.css";

const karla = localFont({
  src: [
    { path: "./fonts/Karla-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Karla-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Karla-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Karla-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Karla-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Karla-ExtraBold.ttf", weight: "800", style: "normal" }
  ],
  variable: "--font-karla",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Digital Amenities",
  description:
    "El confort también es digital. Desarrollo de amenities digitales y productos propios para marcas que quieren diferenciarse."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={karla.variable}>{children}</body>
    </html>
  );
}
