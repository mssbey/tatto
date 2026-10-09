import Image from "next/image";
import { SquidGlyph } from "@/components/layout/Wordmark";

type Props = {
  src?: string | null;
  alt: string;
  width?: number | null;
  height?: number | null;
  /** "contain": eser/çerçeve asla kırpılmaz. "cover": atmosfer görselleri. */
  fit?: "contain" | "cover";
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Kapsayıcıyı sabit oranla ayır (CLS önleme) */
  ratio?: number;
  fill?: boolean;
};

/**
 * Tüm site görselleri bu bileşenden geçer: boyutlar her zaman ayrılır, varsayılan lazy
 * yüklenir, görsel yoksa kırık bağlantı yerine marka diline uygun yerel yer tutucu gösterilir.
 */
export function ArtImage({ src, alt, width, height, fit = "cover", sizes, priority, className = "", imgClassName = "", ratio, fill }: Props) {
  const r = ratio ?? (width && height ? width / height : 4 / 5);
  if (!src) return <BrandPlaceholder ratio={r} className={className} label={alt} />;
  const objectFit = fit === "contain" ? "object-contain" : "object-cover";
  if (fill || ratio) {
    return (
      <div className={`relative overflow-hidden bg-surface ${className}`} style={fill ? undefined : { aspectRatio: String(r) }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`${objectFit} ${imgClassName}`} />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 1500}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full bg-surface ${objectFit} ${className} ${imgClassName}`}
    />
  );
}

export function BrandPlaceholder({ ratio = 4 / 5, className = "", label }: { ratio?: number; className?: string; label?: string }) {
  return (
    <div
      role="img"
      aria-label={label ? `${label} (görsel henüz eklenmedi)` : "Görsel henüz eklenmedi"}
      className={`relative flex items-center justify-center overflow-hidden border border-line bg-surface ${className}`}
      style={{ aspectRatio: String(ratio) }}
    >
      <svg className="absolute inset-0 h-full w-full text-bone/[0.06]" preserveAspectRatio="none" viewBox="0 0 100 125" aria-hidden>
        <path d="M-5 110 C 20 80, 35 95, 50 60 S 80 20, 105 30" stroke="currentColor" strokeWidth="0.4" fill="none" />
        <path d="M-5 120 C 30 100, 40 110, 60 80 S 90 50, 105 55" stroke="currentColor" strokeWidth="0.3" fill="none" />
      </svg>
      <SquidGlyph className="relative h-10 w-10 text-bone/15" />
    </div>
  );
}

export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center border border-bone/25 bg-ink/70 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-bone/80 backdrop-blur-[2px] ${className}`}
      title="Bu içerik örnek amaçlıdır; gerçek bir çalışma veya ürün değildir."
    >
      Demo
    </span>
  );
}
