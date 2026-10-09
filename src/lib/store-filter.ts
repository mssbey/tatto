import type { Artist, Category, Product, ProductImage } from "@/lib/types";

export type Availability = "available" | "reserved" | "sold";

export function availabilityOf(p: Pick<Product, "stock" | "reserved">): Availability {
  if (p.stock <= 0) return "sold";
  if (p.stock - p.reserved <= 0) return "reserved";
  return "available";
}

export type ProductCard = Product & {
  images: ProductImage[];
  category: Category | null;
  artist: Pick<Artist, "id" | "name" | "slug" | "published"> | null;
  availability: Availability;
};

export type StoreQuery = { q?: string; kategori?: string; durum?: string; sirala?: string };

export const STORE_STATUS_OPTIONS = [
  { value: "", label: "Koleksiyon" },
  { value: "satista", label: "Yalnızca satışta" },
  { value: "arsiv", label: "Arşiv · Satılanlar" },
  { value: "tumu", label: "Tümü" },
] as const;

export const STORE_SORT_OPTIONS = [
  { value: "", label: "En yeni" },
  { value: "fiyat-artan", label: "Fiyat: Artan" },
  { value: "fiyat-azalan", label: "Fiyat: Azalan" },
] as const;

const trLower = (s: string) => s.toLocaleLowerCase("tr-TR");

/** Store filtreleri — URL parametreleriyle aynı adları kullanır. */
export function filterProducts(all: ProductCard[], query: StoreQuery) {
  let list = all;
  const q = trLower((query.q ?? "").trim());
  if (q) {
    list = list.filter((p) =>
      trLower([p.name, p.description, p.technique, p.material, p.artist?.name ?? "", p.category?.name ?? ""].join(" ")).includes(q),
    );
  }
  if (query.kategori) list = list.filter((p) => p.category?.slug === query.kategori);
  switch (query.durum) {
    case "satista":
      list = list.filter((p) => p.availability === "available");
      break;
    case "arsiv":
      list = list.filter((p) => p.availability === "sold");
      break;
    case "tumu":
      break;
    default:
      list = list.filter((p) => p.availability !== "sold");
  }
  if (query.sirala === "fiyat-artan") list = [...list].sort((a, b) => a.priceMinor - b.priceMinor);
  if (query.sirala === "fiyat-azalan") list = [...list].sort((a, b) => b.priceMinor - a.priceMinor);
  return list;
}
