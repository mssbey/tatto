"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { DemoBadge } from "@/components/media/ArtImage";
import { Lightbox, type LightboxItem } from "@/components/media/Lightbox";

export type GalleryWork = {
  id: number;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  alt: string;
  style: string | null;
  artist: string | null;
  placement: string;
  isDemo: boolean;
};

/**
 * Editoryal düzen: farklı genişliklerde, kontrollü asimetrik 6'lı kompozisyon.
 * Görseller kendi oranlarında gösterilir — kırpılmaz.
 */
const EDITORIAL = [
  "md:col-span-6",
  "md:col-span-4 md:col-start-8 md:mt-36",
  "md:col-span-4 md:col-start-2 md:mt-24",
  "md:col-span-5 md:col-start-7 md:mt-48",
  "md:col-span-3 md:col-start-1 md:mt-24",
  "md:col-span-4 md:col-start-5 md:mt-40",
];

function toItem(w: GalleryWork): LightboxItem {
  return {
    src: w.imageUrl,
    width: w.width,
    height: w.height,
    alt: w.alt || w.title,
    title: w.title,
    meta: [w.style, w.placement, w.artist].filter(Boolean).join(" · "),
    isDemo: w.isDemo,
  };
}

export function WorkGallery({ works, layout = "masonry" }: { works: GalleryWork[]; layout?: "editorial" | "masonry" }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = works.map(toItem);

  const tile = (w: GalleryWork, i: number, sizes: string) => (
    <button
      type="button"
      onClick={() => setOpen(i)}
      className="group block w-full text-left"
      aria-label={`${w.title} — büyüt`}
    >
      <div className="relative overflow-hidden bg-surface" data-reveal="clip" data-reveal-delay={String((i % 3) * 0.08)}>
        <Image
          src={w.imageUrl}
          alt={w.alt || w.title}
          width={w.width}
          height={w.height}
          sizes={sizes}
          className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        />
        {w.isDemo && <DemoBadge className="absolute left-3 top-3" />}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <p className="display text-xl tracking-wide transition-colors group-hover:text-bone sm:text-2xl">{w.title}</p>
        <p className="shrink-0 text-xs uppercase tracking-[0.18em] text-ash">{[w.style, w.placement].filter(Boolean).join(" · ")}</p>
      </div>
    </button>
  );

  return (
    <>
      {layout === "editorial" ? (
        <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-12 md:gap-y-0">
          {works.slice(0, 6).map((w, i) => (
            <li key={w.id} className={`${EDITORIAL[i]} ${i === 0 ? "sm:col-span-2" : ""}`}>
              {tile(w, i, i === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 34vw, (min-width: 640px) 50vw, 100vw")}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
          {works.map((w, i) => (
            <li key={w.id} className="mb-10 break-inside-avoid lg:mb-14">
              {tile(w, i, "(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw")}
            </li>
          ))}
        </ul>
      )}
      <AnimatePresence>
        {open !== null && items[open] && (
          <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} label="Çalışma görüntüleyici" />
        )}
      </AnimatePresence>
    </>
  );
}
