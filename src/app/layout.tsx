import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { instagramUrl, siteUrl } from "@/data/site-content";

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

const title = "Digital Amenities | El confort también es digital";
const description =
  "Desarrollamos software a medida y productos propios para negocios que quieren diferenciarse: sistemas de gestión, tiendas online, bots con IA y plataformas para edificios y barrios privados.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Digital Amenities"
  },
  description,
  applicationName: "Digital Amenities",
  keywords: [
    "amenities digitales",
    "desarrollo de software a medida",
    "sistemas de gestión",
    "bots de WhatsApp con IA",
    "software para consorcios",
    "software para barrios privados",
    "Citify",
    "Countrify",
    "Tucumán",
    "Argentina"
  ],
  authors: [{ name: "Digital Amenities", url: siteUrl }],
  creator: "Digital Amenities",
  publisher: "Digital Amenities",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Digital Amenities",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Digital Amenities — El confort también es digital"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  formatDetection: { email: false, address: false, telephone: false },
  category: "technology"
};

export const viewport: Viewport = {
  themeColor: "#f1f0f1",
  colorScheme: "light"
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digital Amenities",
  url: siteUrl,
  logo: `${siteUrl}/assets/brand/digital-logo-dark.svg`,
  description,
  slogan: "El confort también es digital",
  areaServed: "AR",
  sameAs: [instagramUrl, "https://citify.com.ar", "https://countrify.com.ar"]
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body className={karla.variable}>
        {children}
        <script
          type="application/ld+json"
          // Contenido estático propio, no viene de entrada de usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
