import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Digital Amenities",
    short_name: "Digital Amenities",
    description: "El confort también es digital.",
    start_url: "/",
    display: "browser",
    background_color: "#f1f0f1",
    theme_color: "#f1f0f1",
    icons: [
      {
        src: "/assets/brand/iso-da-dark.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
