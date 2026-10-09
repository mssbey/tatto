import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getPublishedProducts } from "@/lib/queries/catalog";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.siteUrl;
  const statics = ["", "/calismalar", "/sanatcilar", "/studyo", "/store", "/randevu", "/iletisim", "/bakim-ve-sss", "/dovme-fiyati-hesaplama"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const products = await getPublishedProducts();
  return [
    ...statics,
    // Demo içerik dizine eklenmez
    ...products.filter((p) => !p.isDemo).map((p) => ({ url: `${base}/store/${p.slug}`, lastModified: p.updatedAt, priority: 0.8 })),
  ];
}
