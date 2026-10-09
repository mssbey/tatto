"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { filterProducts, STORE_SORT_OPTIONS, STORE_STATUS_OPTIONS, type ProductCard as TProductCard } from "@/lib/store-filter";
import { ProductCard } from "./ProductCard";
import { StoreFilters } from "./StoreFilters";

/** Statik sitede filtreler istemcide, URL parametrelerinden uygulanır. */
export function StoreBrowser({ products, categories }: { products: TProductCard[]; categories: { value: string; label: string }[] }) {
  const params = useSearchParams();
  const query = {
    q: (params.get("q") ?? "").slice(0, 80),
    kategori: params.get("kategori") ?? "",
    durum: params.get("durum") ?? "",
    sirala: params.get("sirala") ?? "",
  };
  const list = filterProducts(products, query);
  return (
    <StoreFilters categories={categories} statusOptions={STORE_STATUS_OPTIONS} sortOptions={STORE_SORT_OPTIONS} total={list.length}>
      {list.length ? <ProductGrid products={list} /> : <EmptyResults />}
    </StoreFilters>
  );
}

export function ProductGrid({ products }: { products: TProductCard[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} index={i} priority={i < 3} sizes="(min-width: 1280px) 26vw, (min-width: 640px) 40vw, 92vw" />
        </li>
      ))}
    </ul>
  );
}

function EmptyResults() {
  return (
    <div className="border border-line px-6 py-20 text-center sm:px-12">
      <p className="display text-4xl sm:text-5xl">Bu aramaya uygun eser yok.</p>
      <p className="mx-auto mt-4 max-w-md text-ash">Filtreleri değiştirmeyi ya da arşive göz atmayı deneyebilirsin.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm uppercase tracking-[0.18em]">
        <Link href="/store" className="link-underline">
          Tüm koleksiyon
        </Link>
        <Link href="/store?durum=arsiv" className="link-underline text-ash hover:text-bone">
          Arşiv
        </Link>
      </div>
    </div>
  );
}
