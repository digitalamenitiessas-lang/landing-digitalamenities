export type BrandVariant = {
  src: string;
  alt: string;
};

export type BrandAssets = {
  headerPrimary: BrandVariant;
  footerPrimary: BrandVariant;
  favicon: BrandVariant;
  markDark: BrandVariant;
  markLight: BrandVariant;
  wordmarkDark: BrandVariant;
  wordmarkLight: BrandVariant;
  sealDark: BrandVariant;
  sealLight: BrandVariant;
};

export const brandAssets: BrandAssets = {
  headerPrimary: {
    src: "/assets/brand/isologo-dark.svg",
    alt: "Isologo negro de Digital Amenities"
  },
  footerPrimary: {
    src: "/assets/brand/digital-logo-dark.svg",
    alt: "Digital Amenities"
  },
  favicon: {
    src: "/assets/brand/iso-da-light.svg",
    alt: "Isologo claro de Digital Amenities"
  },
  markDark: {
    src: "/assets/brand/iso-da-dark.svg",
    alt: "Isologo oscuro de Digital Amenities"
  },
  markLight: {
    src: "/assets/brand/iso-da-light.svg",
    alt: "Isologo claro de Digital Amenities"
  },
  wordmarkDark: {
    src: "/assets/brand/digital-horizontal-dark.svg",
    alt: "Digital Amenities"
  },
  wordmarkLight: {
    src: "/assets/brand/digital-horizontal-light.svg",
    alt: "Digital Amenities"
  },
  sealDark: {
    src: "/assets/brand/seal-dark.svg",
    alt: "Sello oscuro de Digital Amenities"
  },
  sealLight: {
    src: "/assets/brand/seal-light.svg",
    alt: "Sello claro de Digital Amenities"
  }
};
