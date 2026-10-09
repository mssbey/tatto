import { artists, categories, productImages, products, works } from "@/content/catalog";
import { availabilityOf, type ProductCard } from "@/lib/store-filter";
import type { Category, Product, Work, Artist } from "@/lib/types";

export { availabilityOf, filterProducts, STORE_SORT_OPTIONS, STORE_STATUS_OPTIONS } from "@/lib/store-filter";
export type { Availability, ProductCard, StoreQuery } from "@/lib/store-filter";

function hydrate(rows: Product[]): ProductCard[] {
  return rows.map((p) => ({
    ...p,
    images: productImages.filter((i) => i.productId === p.id).sort((a, b) => a.position - b.position),
    category: categories.find((c) => c.id === p.categoryId) ?? null,
    artist: artists.find((a) => a.id === p.artistId && a.published) ?? null,
    availability: availabilityOf(p),
  }));
}

export async function getPublishedProducts() {
  return hydrate(
    products
      .filter((p) => p.status === "published")
      .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0)),
  );
}

export async function getFeaturedProducts(limit = 4) {
  const all = await getPublishedProducts();
  const featured = all.filter((p) => p.featured).sort((a, b) => a.featuredPosition - b.featuredPosition);
  const fill = all.filter((p) => !p.featured && p.availability !== "sold");
  return [...featured, ...fill].slice(0, limit);
}

export async function getProductBySlug(slug: string) {
  return (await getPublishedProducts()).find((p) => p.slug === slug) ?? null;
}

export async function getRelatedProducts(p: ProductCard, limit = 3) {
  const others = (await getPublishedProducts()).filter((o) => o.id !== p.id);
  const score = (o: ProductCard) =>
    (o.categoryId === p.categoryId ? 2 : 0) + (o.artistId && o.artistId === p.artistId ? 1 : 0) + (o.availability === "sold" ? -3 : 0);
  return others.sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export async function getProductCategories(): Promise<Category[]> {
  return categories.filter((c) => c.kind === "product").sort((a, b) => a.position - b.position);
}

/* ------------------------------ Works ------------------------------ */

export type WorkItem = Work & {
  style: Pick<Category, "id" | "name" | "slug"> | null;
  artist: Pick<Artist, "id" | "name" | "slug"> | null;
};

export async function getPublishedWorks(): Promise<WorkItem[]> {
  return works
    .filter((w) => w.published)
    .sort((a, b) => a.position - b.position)
    .map((w) => ({
      ...w,
      style: categories.find((s) => s.id === w.styleId) ?? null,
      artist: artists.find((a) => a.id === w.artistId && a.published) ?? null,
    }));
}

export async function getFeaturedWorks(limit = 6) {
  const all = await getPublishedWorks();
  const featured = all.filter((w) => w.featured).sort((a, b) => a.featuredPosition - b.featuredPosition);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getWorkStyles(): Promise<Category[]> {
  return categories.filter((c) => c.kind === "work_style").sort((a, b) => a.position - b.position);
}

/* ----------------------------- Artists ----------------------------- */

export async function getPublishedArtists(): Promise<Artist[]> {
  return artists.filter((a) => a.published).sort((a, b) => a.position - b.position);
}
