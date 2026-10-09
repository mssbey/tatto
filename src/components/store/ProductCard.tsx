import Image from "next/image";
import Link from "next/link";
import { BrandPlaceholder, DemoBadge } from "@/components/media/ArtImage";
import { formatPrice, formatSize } from "@/lib/format";
import type { ProductCard as TProductCard } from "@/lib/queries/catalog";

export function availabilityLabel(a: TProductCard["availability"], stock: number, isUnique: boolean) {
  if (a === "sold") return "Satıldı";
  if (a === "reserved") return "Şu an rezerve";
  if (isUnique) return "Satışta";
  return stock <= 3 ? `Son ${stock} adet` : "Stokta";
}

export function ProductCard({ product, sizes, priority, index = 0 }: { product: TProductCard; sizes: string; priority?: boolean; index?: number }) {
  const productImgs = product.images.filter((i) => i.kind === "product");
  const [main, second] = productImgs.length ? productImgs : product.images;
  const sold = product.availability === "sold";
  const size = formatSize(product.artworkWidthCm, product.artworkHeightCm);

  return (
    <Link
      href={`/store/${product.slug}`}
      className="group block"
      data-reveal="up"
      data-reveal-delay={String((index % 4) * 0.07)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        {main ? (
          <>
            <Image
              src={main.url}
              alt={main.alt || product.name}
              fill
              sizes={sizes}
              priority={priority}
              className={`object-contain transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025] ${
                second ? "group-hover:opacity-0 group-focus-visible:opacity-0" : ""
              } ${sold ? "opacity-70" : ""}`}
            />
            {second && (
              <Image
                src={second.url}
                alt=""
                aria-hidden
                fill
                sizes={sizes}
                className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            )}
          </>
        ) : (
          <BrandPlaceholder className="absolute inset-0 !aspect-auto" label={product.name} />
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.isUnique && !sold && (
            <span className="bg-bone px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink">Tek Eser</span>
          )}
          {sold && <span className="bg-blood px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-bone">Satıldı</span>}
          {product.isDemo && <DemoBadge />}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1">
        <h3 className="display truncate text-2xl leading-tight">{product.name}</h3>
        <p className={`pt-1 text-sm tabular-nums ${sold ? "text-ash line-through decoration-1" : ""}`}>
          {formatPrice(product.priceMinor, product.currency)}
        </p>
        <p className="truncate text-xs uppercase tracking-[0.16em] text-ash">
          {[size, product.frameIncluded ? "Çerçeveli" : null].filter(Boolean).join(" · ")}
        </p>
        <p className={`text-xs uppercase tracking-[0.16em] ${sold ? "text-ash" : product.availability === "reserved" ? "text-ash" : "text-bone/80"}`}>
          {availabilityLabel(product.availability, product.stock - product.reserved, product.isUnique)}
        </p>
      </div>
    </Link>
  );
}
