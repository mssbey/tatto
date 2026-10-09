"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { DemoBadge } from "@/components/media/ArtImage";
import { Lightbox } from "@/components/media/Lightbox";
import { Parallax } from "@/components/motion/Parallax";
import type { GalleryWork } from "@/components/works/WorkGallery";

/**
 * Masaüstünde birbirine geçen iki sütun (sağ sütun aşağı kaydırılmış, farklı parallax hızları),
 * mobilde sade 2'li ızgara. Görseller kendi oranlarında gösterilir (kırpılmaz) ve mürekkep tonlu
 * monokrom işlemle tek bir sanat yönüne bağlanır; üzerine gelince renk açılır.
 */
const LAYOUT = [
  { width: "lg:w-full", offset: 20 },
  { width: "lg:w-full", offset: 70 },
  { width: "lg:w-[72%] lg:self-end", offset: 45 },
  { width: "lg:w-[80%]", offset: 90 },
  { width: "lg:w-[84%]", offset: 35 },
  { width: "lg:w-[70%] lg:self-end", offset: 60 },
];

export function FeaturedWorksSection({ works, styles, total }: { works: GalleryWork[]; styles: string[]; total: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = works.slice(0, 6);
  const band = styles.length ? styles : ["Dövme", "Çizim", "Mürekkep"];

  const renderItem = (w: GalleryWork, i: number) => {
    const l = LAYOUT[i]!;
    return (
      <li key={w.id} className={`${i === 0 ? "col-span-2" : ""} ${l.width}`} style={{ order: i }}>
        <Parallax offset={l.offset}>
          <button type="button" onClick={() => setOpen(i)} className="group relative block w-full text-left" aria-label={`${w.title} — büyüt`}>
            <div
              className="relative overflow-hidden bg-ink"
              style={{ aspectRatio: `${w.width} / ${w.height}` }}
              data-reveal="clip"
              data-reveal-delay={String((i % 2) * 0.12)}
            >
              <Image
                src={w.imageUrl}
                alt={w.alt || w.title}
                fill
                sizes={i < 2 ? "(min-width: 1024px) 46vw, 92vw" : "(min-width: 1024px) 34vw, 46vw"}
                className="scale-[1.03] object-cover grayscale contrast-125 brightness-[0.8] transition-[filter,transform] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:grayscale-0 group-hover:brightness-100 group-focus-visible:grayscale-0"
              />
              <div className="absolute inset-0 bg-blood opacity-25 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-40" aria-hidden />
              {w.isDemo && <DemoBadge className="absolute left-3 top-3 scale-90" />}
              <span
                className="absolute right-3 top-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-bone text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden
              >
                +
              </span>
              <p className="absolute bottom-0 left-0 p-4 text-[0.6rem] uppercase tracking-[0.24em] text-bone/70 sm:p-5">
                {[w.style, w.placement].filter(Boolean).join(" · ")}
              </p>
            </div>
            <span
              aria-hidden
              className="display pointer-events-none absolute -bottom-5 right-2 z-10 text-4xl leading-none sm:-bottom-8 sm:right-3 text-transparent transition-colors duration-500 group-hover:text-blood sm:text-7xl lg:-right-4 lg:text-8xl"
              style={{ WebkitTextStroke: "1px rgba(242,238,231,0.55)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-4 flex items-center gap-3 pr-10 sm:mt-6 sm:pr-20 lg:pr-28">
              <span className="hidden h-px w-6 shrink-0 bg-blood transition-all duration-500 group-hover:w-10 sm:block" aria-hidden />
              <span className="display text-xl leading-tight tracking-wide sm:text-3xl">{w.title}</span>
            </span>
          </button>
        </Parallax>
      </li>
    );
  };

  return (
    <section id="secili-calismalar" className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-36" aria-labelledby="works-title">
      {/* Arka plan kontur yazısı + ışık */}
      <p
        aria-hidden
        className="display pointer-events-none absolute -top-[0.12em] right-[-0.04em] -z-10 select-none whitespace-nowrap text-[21vw] leading-none text-transparent"
        style={{ WebkitTextStroke: "1px rgba(242,238,231,0.055)" }}
      >
        Portfolyo
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[25%] top-[30%] -z-10 h-[70vmax] w-[70vmax] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(168,50,62,0.14), transparent 70%)", filter: "blur(40px)" }}
      />

      {/* ------------------------------------------------ Başlık */}
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-8 flex items-center gap-4" data-reveal="fade">
            <span className="h-px w-10 bg-blood" aria-hidden />
            01 — Seçili çalışmalar
          </p>
          <h2 id="works-title" className="display text-[length:var(--text-display-xl)]">
            <span className="-mt-[0.16em] block overflow-hidden pb-[0.02em] pt-[0.16em]">
              <span className="block" data-reveal="line">
                İz
              </span>
            </span>
            <span className="-mt-[0.16em] block overflow-hidden pb-[0.02em] pt-[0.16em]">
              <span className="block text-blood-light" data-reveal="line" data-reveal-delay="0.1">
                bırakanlar.
              </span>
            </span>
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9" data-reveal="up" data-reveal-delay="0.2">
          <p className="max-w-sm text-lg leading-relaxed text-ash">
            Her biri bir görüşmeyle başlayan, kişiye özel çizilen işler. Büyütmek için bir çalışmaya dokun.
          </p>
          <Link href="/calismalar" className="group mt-8 inline-flex items-center gap-5" aria-label="Tüm çalışmaları gör">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-line-strong transition-colors duration-500 group-hover:border-blood group-hover:bg-blood">
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                <path d="M0 6h18M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.2em]">Tüm çalışmalar</span>
              <span className="block text-xs tabular-nums text-ash">{String(total).padStart(2, "0")} çalışma</span>
            </span>
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------ Stil şeridi */}
      <div className="relative mt-16 overflow-hidden border-y border-line py-5 sm:mt-24" aria-hidden>
        <div className="flex w-max animate-[works-marquee_38s_linear_infinite] gap-10 motion-reduce:animate-none">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-10">
              {Array.from({ length: 3 }).flatMap((_, r) =>
                band.map((s, i) => (
                  <span key={`${k}-${r}-${i}`} className="flex items-center gap-10">
                    <span
                      className={`display text-4xl sm:text-5xl ${i % 2 ? "text-transparent" : "text-bone/80"}`}
                      style={i % 2 ? { WebkitTextStroke: "1px rgba(242,238,231,0.45)" } : undefined}
                    >
                      {s}
                    </span>
                    <span className="h-2 w-2 rotate-45 bg-blood" />
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------ Izgara */}
      <div className="container-x mt-16 grid grid-cols-2 gap-x-4 gap-y-16 sm:mt-24 sm:gap-x-6 lg:grid-cols-12 lg:items-start lg:gap-x-8">
        <ul className="contents lg:col-span-6 lg:flex lg:flex-col lg:gap-32">{items.map((w, i) => (i % 2 === 0 ? renderItem(w, i) : null))}</ul>
        <ul className="contents lg:col-span-5 lg:col-start-8 lg:flex lg:flex-col lg:gap-32 lg:pt-56">
          {items.map((w, i) => (i % 2 === 1 ? renderItem(w, i) : null))}
        </ul>
      </div>

      <AnimatePresence>
        {open !== null && items[open] && (
          <Lightbox
            items={items.map((w) => ({
              src: w.imageUrl,
              width: w.width,
              height: w.height,
              alt: w.alt || w.title,
              title: w.title,
              meta: [w.style, w.placement, w.artist].filter(Boolean).join(" · "),
              isDemo: w.isDemo,
            }))}
            index={open}
            onIndex={setOpen}
            onClose={() => setOpen(null)}
            label="Çalışma görüntüleyici"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
