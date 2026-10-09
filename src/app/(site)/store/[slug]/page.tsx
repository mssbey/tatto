import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBadge } from "@/components/media/ArtImage";
import { ProductInquiry } from "@/components/store/ProductInquiry";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductGallery } from "@/components/store/ProductGallery";
import { env } from "@/lib/env";
import { formatPrice, formatSize } from "@/lib/format";
import { getProductBySlug, getPublishedProducts, getRelatedProducts } from "@/lib/queries/catalog";
import { getSettings, whatsappLink } from "@/lib/settings";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPublishedProducts()).map((p) => ({ slug: p.slug }));
}
type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Eser bulunamadı" };
  const img = p.images.find((i) => i.kind === "product");
  return {
    title: p.name,
    description: p.description.slice(0, 160) || `${p.name} — Tattoo Squid Store`,
    alternates: { canonical: `/store/${p.slug}` },
    openGraph: { title: p.name, images: img ? [{ url: img.url, width: img.width, height: img.height }] : undefined },
    robots: p.isDemo ? { index: false, follow: false } : undefined,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const [related, settings] = await Promise.all([getRelatedProducts(product, 3), getSettings()]);

  const productImages = product.images.filter((i) => i.kind === "product");
  const atmosphere = product.images.filter((i) => i.kind === "atmosphere");
  const sellable = Math.max(0, product.stock - product.reserved);
  const priceLabel = formatPrice(product.priceMinor, product.currency);
  const delivery = product.deliveryNote || settings.defaultDeliveryNote || settings.shippingNote;

  const specs: [string, string | null][] = [
    ["Eser ölçüsü", formatSize(product.artworkWidthCm, product.artworkHeightCm)],
    ["Dış çerçeve ölçüsü", product.frameIncluded ? formatSize(product.frameWidthCm, product.frameHeightCm, product.frameDepthCm) : null],
    ["Malzeme", product.material || null],
    ["Teknik", product.technique || null],
    ["Çerçeve", product.frameIncluded ? "Dahil" : "Dahil değil"],
    ["Üretim yılı", product.year ? String(product.year) : null],
    ["Kategori", product.category?.name ?? null],
  ];

  // Yapısal veri yalnızca gerçek (demo olmayan) ürünlerden üretilir
  const jsonLd = !product.isDemo
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description || undefined,
        url: `${env.siteUrl}/store/${product.slug}`,
        image: productImages.map((i) => (i.url.startsWith("http") ? i.url : `${env.siteUrl}${i.url}`)),
        brand: { "@type": "Brand", name: "Tattoo Squid" },
        ...(product.year ? { productionDate: String(product.year) } : {}),
        offers: {
          "@type": "Offer",
          price: (product.priceMinor / 100).toFixed(2),
          priceCurrency: product.currency,
          availability:
            product.availability === "sold" ? "https://schema.org/SoldOut" : sellable > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: `${env.siteUrl}/store/${product.slug}`,
        },
      }
    : null;

  return (
    <article className="pt-28 sm:pt-32">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />}
      <nav aria-label="Konum" className="container-x mb-8 text-xs uppercase tracking-[0.18em] text-ash">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/store" className="hover:text-bone">
              Store
            </Link>
          </li>
          <li aria-hidden>/</li>
          {product.category && (
            <>
              <li>
                <Link href={`/store?kategori=${product.category.slug}`} className="hover:text-bone">
                  {product.category.name}
                </Link>
              </li>
              <li aria-hidden>/</li>
            </>
          )}
          <li aria-current="page" className="text-bone/80">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ProductGallery
            images={productImages.map((i) => ({ url: i.url, width: i.width, height: i.height, alt: i.alt }))}
            name={product.name}
            isDemo={product.isDemo}
          />
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center gap-2">
              {product.isUnique && (
                <span className="border border-bone/70 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em]">1/1 — Tek Eser</span>
              )}
              {product.availability === "sold" && (
                <span className="bg-blood px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em]">Satıldı</span>
              )}
              {product.isDemo && <DemoBadge />}
            </div>
            <h1 className="display mt-6 text-[length:var(--text-display-md)]">{product.name}</h1>
            {product.artist && (
              <p className="mt-3 text-ash">
                <Link href={`/sanatcilar/${product.artist.slug}`} className="link-underline hover:text-bone">
                  {product.artist.name}
                </Link>
                {product.year ? `, ${product.year}` : ""}
              </p>
            )}

            <div className="mt-8 flex items-baseline justify-between border-y border-line py-5">
              <p className={`text-2xl tabular-nums ${product.availability === "sold" ? "text-ash line-through decoration-1" : ""}`}>
                {priceLabel}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-ash">
                {product.availability === "sold"
                  ? "Stokta yok · Satıldı"
                  : product.availability === "reserved"
                    ? "Rezerve"
                    : product.isUnique
                      ? "Satışta · 1 adet"
                      : `Stokta · ${sellable} adet`}
              </p>
            </div>

            <div className="mt-6">
              <ProductInquiry
                availability={product.availability}
                whatsapp={whatsappLink(settings, `Merhaba, "${product.name}" eseri hakkında bilgi almak istiyorum.`)}
                email={settings.email}
                productName={product.name}
              />
            </div>

            {product.description && <p className="mt-10 whitespace-pre-line leading-relaxed text-bone/85">{product.description}</p>}

            <dl className="mt-10 divide-y divide-line border-y border-line text-sm">
              {specs
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9.5rem_1fr] gap-4 py-3.5">
                    <dt className="text-ash">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
            </dl>

            <div className="mt-10 space-y-8 text-sm leading-relaxed">
              <section aria-labelledby="fake-skin">
                <h2 id="fake-skin" className="eyebrow mb-3">
                  Fake skin nedir?
                </h2>
                <p className="text-ash">
                  Fake skin, dövme için üretilmiş sentetik bir deri yüzeyidir. Bu eser, tende kullanılan dövme makinesi, iğne ve
                  mürekkeple elle işlendi. Baskı, çıkartma ya da geçici dövme değildir; çizgi ve gölgeler yüzeyin içine işlenmiştir.
                </p>
              </section>
              {product.frameIncluded && (
                <section aria-labelledby="frame">
                  <h2 id="frame" className="eyebrow mb-3">
                    Çerçeve
                  </h2>
                  <p className="text-ash">{product.frameDetail || "Eser çerçeveli olarak gönderilir."}</p>
                </section>
              )}
              <section aria-labelledby="delivery">
                <h2 id="delivery" className="eyebrow mb-3">
                  Teslimat
                </h2>
                <p className="whitespace-pre-line text-ash">
                  {delivery || (
                    <>
                      Teslimat süresi ve gönderim detayları için{" "}
                      <Link href="/iletisim" className="text-bone link-underline">
                        bizimle iletişime geç
                      </Link>
                      .
                    </>
                  )}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {atmosphere.length > 0 && (
        <section className="container-x mt-28" aria-label="Mekânda">
          <p className="eyebrow mb-6">Mekânda</p>
          <div className={`grid gap-6 ${atmosphere.length > 1 ? "md:grid-cols-2" : ""}`}>
            {atmosphere.map((a) => (
              <figure key={a.id} className="relative aspect-[16/10] overflow-hidden bg-surface" data-reveal="clip">
                <Image src={a.url} alt={a.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                {product.isDemo && <DemoBadge className="absolute left-3 top-3" />}
              </figure>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="container-x mt-32" aria-labelledby="related-title">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 id="related-title" className="display text-[length:var(--text-display-sm)]">
              İlgili eserler
            </h2>
            <Link href="/store" className="text-sm uppercase tracking-[0.2em] link-underline">
              Koleksiyon →
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <li key={p.id}>
                <ProductCard product={p} index={i} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
