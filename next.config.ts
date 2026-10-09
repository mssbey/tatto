import type { NextConfig } from "next";

/**
 * Statik site: `next build` çıktısı `out/` klasörüne düz HTML/CSS/JS olarak yazılır.
 * Sunucu, veritabanı ve görsel optimizasyon sunucusu yoktur; görseller public/ altından
 * olduğu gibi sunulur. Güvenlik başlıkları vercel.json içindedir.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
