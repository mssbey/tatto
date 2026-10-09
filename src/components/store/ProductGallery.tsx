"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { DemoBadge } from "@/components/media/ArtImage";
import { Lightbox } from "@/components/media/Lightbox";

export type GalleryImage = { url: string; width: number; height: number; alt: string };

/** Ürün fotoğrafları her zaman object-contain — çerçeve asla kırpılmaz. */
export function ProductGallery({ images, name, isDemo }: { images: GalleryImage[]; name: string; isDemo: boolean }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const main = images[active] ?? images[0];
  if (!main) return null;

  return (
    <div>
      <button
        type="button"
        className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-surface"
        onClick={() => setOpen(active)}
        aria-label={`${name} — görseli büyüt ve yakınlaştır`}
        data-reveal="clip"
      >
        <Image
          key={main.url}
          src={main.url}
          alt={main.alt || name}
          fill
          priority
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-contain transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.02]"
        />
        {isDemo && <DemoBadge className="absolute left-4 top-4" />}
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-ink/80 px-3 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-bone/90 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          Yakınlaştır
        </span>
      </button>

      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-6" aria-label="Ürün görselleri">
          {images.map((img, i) => (
            <li key={img.url}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Görsel ${i + 1}`}
                aria-current={i === active}
                className={`relative block aspect-[4/5] w-full overflow-hidden bg-surface outline-offset-2 transition-opacity ${
                  i === active ? "ring-1 ring-bone" : "opacity-55 hover:opacity-100"
                }`}
              >
                <Image src={img.url} alt="" fill sizes="120px" className="object-contain" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            items={images.map((i) => ({ src: i.url, width: i.width, height: i.height, alt: i.alt || name, title: name, isDemo }))}
            index={open}
            onIndex={(i) => {
              setOpen(i);
              setActive(i);
            }}
            onClose={() => setOpen(null)}
            zoomable
            label={`${name} görselleri`}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
