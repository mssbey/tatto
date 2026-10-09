import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductGrid, StoreBrowser } from "@/components/store/StoreBrowser";
import { filterProducts, getProductCategories, getPublishedProducts } from "@/lib/queries/catalog";

export const metadata: Metadata = {
  title: "Store — Fake Skin Eserler ve Çerçeveli Tablolar",
  description: "Fake skin üzerine gerçek dövme tekniğiyle elle işlenmiş koleksiyonluk eserler ve çerçeveli tablolar.",
  alternates: { canonical: "/store" },
};

export default async function StorePage() {
  const [products, categories] = await Promise.all([getPublishedProducts(), getProductCategories()]);
  return (
    <div className="pt-32 sm:pt-40">
      <header className="container-x mb-16 grid gap-8 lg:mb-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5" data-reveal="fade">
            Store
          </p>
          <h1 className="display text-[length:var(--text-display-xl)]" data-reveal="up">
            Koleksiyon
          </h1>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-ash lg:col-span-4 lg:col-start-9" data-reveal="up" data-reveal-delay="0.1">
          Fake skin üzerine, tende kullandığımız makine ve mürekkeple elle işlenen eserler. Her parçanın ölçüsü, malzemesi ve çerçeve
          bilgisi kendi sayfasında. Satın almak için bizimle iletişime geçebilirsin.
        </p>
      </header>

      <div className="container-x">
        <Suspense fallback={<ProductGrid products={filterProducts(products, {})} />}>
          <StoreBrowser products={products} categories={categories.map((c) => ({ value: c.slug, label: c.name }))} />
        </Suspense>
      </div>
    </div>
  );
}
