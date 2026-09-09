/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Los logos de clientes son PNG/JPG pesados servidos en cajas de 100-200px:
    // dejamos que Next los reescale y los sirva en AVIF/WebP.
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
