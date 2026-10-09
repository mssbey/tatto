import Image from "next/image";
import { DemoBadge } from "@/components/media/ArtImage";
import { Parallax } from "@/components/motion/Parallax";
import { SquidLine } from "@/components/motion/SquidLine";
import type { Visual } from "@/lib/visuals";

const STEPS = [
  { title: "Görüşme", body: "Fikrini, hikâyesini ve bedendeki yerini dinleriz." },
  { title: "Çizim", body: "Tasarım sana özel çizilir; birlikte son hâlini alır." },
  { title: "Uygulama", body: "Çizgi tene — ya da fake skin yüzeyine — işlenir." },
];

/**
 * Masaüstünde katmanlı kolaj (absolute + farklı parallax hızları), mobilde sade ızgara.
 * Görseller mürekkep tonlu monokrom bir işlemden geçer; üzerine gelince renk açılır.
 */
const SLOTS = [
  { wrap: "col-span-2 lg:absolute lg:left-0 lg:top-0 lg:w-[58%]", ratio: "aspect-[4/5]", offset: 30, sizes: "(min-width: 1024px) 34vw, 92vw" },
  { wrap: "lg:absolute lg:right-0 lg:top-[8%] lg:w-[44%]", ratio: "aspect-[3/4]", offset: 80, sizes: "(min-width: 1024px) 26vw, 46vw" },
  { wrap: "lg:absolute lg:bottom-0 lg:right-[10%] lg:w-[38%]", ratio: "aspect-square", offset: 50, sizes: "(min-width: 1024px) 22vw, 46vw" },
];

export function AtelierSection({ images }: { images: Visual[] }) {
  return (
    <section className="relative isolate overflow-hidden border-y border-line bg-surface py-24 sm:py-36" aria-labelledby="story-title">
      {/* Arka plan: dev kontur yazı ve yumuşak mürekkep ışığı */}
      <p
        aria-hidden
        className="display pointer-events-none absolute -bottom-[0.18em] left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap text-[23vw] leading-none text-transparent"
        style={{ WebkitTextStroke: "1px rgba(242,238,231,0.06)" }}
      >
        Atölye
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-[10%] -z-10 h-[60vmax] w-[60vmax] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(168,50,62,0.18), transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* ------------------------------------------------ Metin */}
        <div className="relative lg:col-span-5 lg:py-10">
          <p className="eyebrow mb-8 flex items-center gap-4" data-reveal="fade">
            <span className="h-px w-10 bg-blood" aria-hidden />
            02 — Atölye
          </p>
          <h2 id="story-title" className="display text-[length:var(--text-display-lg)]">
            <span className="-mt-[0.16em] block overflow-hidden pb-[0.02em] pt-[0.16em]">
              <span className="block" data-reveal="line">
                Mürekkep
              </span>
            </span>
            <span className="-mt-[0.16em] block overflow-hidden pb-[0.02em] pt-[0.16em]">
              <span className="block" data-reveal="line" data-reveal-delay="0.08">
                bizim
              </span>
            </span>
            <span className="-mt-[0.16em] block overflow-hidden pb-[0.02em] pt-[0.16em]">
              <span className="block text-blood-light" data-reveal="line" data-reveal-delay="0.16">
                dilimiz.
              </span>
            </span>
          </h2>

          <p className="mt-10 max-w-md text-lg leading-relaxed text-ash" data-reveal="up" data-reveal-delay="0.2">
            Her çalışma bir görüşmeyle başlar. Aynı dil stüdyonun dışında da sürer: fake skin üzerine işlediğimiz eserler, dövmenin tenle
            kurduğu ilişkiyi duvara taşır.
          </p>

          <ol className="mt-14 max-w-md">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="group grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-t border-line py-5 transition-colors last:border-b hover:border-blood/60"
                data-reveal="up"
                data-reveal-delay={String(0.25 + i * 0.08)}
              >
                <span
                  className="display text-5xl leading-none text-transparent transition-colors duration-500 group-hover:text-blood"
                  style={{ WebkitTextStroke: "1px rgba(242,238,231,0.35)" }}
                  aria-hidden
                >
                  0{i + 1}
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-[0.2em]">{s.title}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-ash">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* ------------------------------------------------ Kolaj */}
        <div className="relative lg:col-span-7">
          <SquidLine className="pointer-events-none absolute -left-10 -top-16 z-20 hidden h-[115%] w-auto text-blood/60 lg:block" delay={0.4} />

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:relative lg:block lg:aspect-square">
            {images.slice(0, 3).map((v, i) => {
              const slot = SLOTS[i]!;
              return (
                <Parallax key={v.url + i} offset={slot.offset} className={`${slot.wrap} ${i === 0 ? "lg:z-10" : "lg:z-20"}`}>
                  <figure className="group relative" data-reveal="clip" data-reveal-delay={String(0.1 + i * 0.12)}>
                    <div className={`relative ${slot.ratio} overflow-hidden bg-ink ${i > 0 ? "ring-1 ring-line-strong" : ""}`}>
                      <Image
                        src={v.url}
                        alt={v.alt}
                        fill
                        sizes={slot.sizes}
                        className="scale-[1.04] object-cover grayscale contrast-125 brightness-[0.82] transition-[filter,transform] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:grayscale-0 group-hover:brightness-100"
                      />
                      {/* Mürekkep tonu */}
                      <div className="absolute inset-0 bg-blood opacity-25 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" aria-hidden />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden />
                      {v.isDemo && <DemoBadge className="absolute left-3 top-3 scale-90" />}
                    </div>
                    <figcaption className="mt-3 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-ash">
                      <span className="text-blood-light tabular-nums">0{i + 1}</span>
                      <span className="h-px w-6 bg-line-strong" aria-hidden />
                      {STEPS[i]?.title}
                    </figcaption>
                  </figure>
                </Parallax>
              );
            })}

            {/* Dönen imza rozeti */}
            <div className="pointer-events-none absolute bottom-[10%] left-[38%] z-30 hidden h-36 w-36 lg:block" aria-hidden>
              <svg viewBox="0 0 200 200" className="h-full w-full animate-[spin_28s_linear_infinite] text-bone">
                <defs>
                  <path id="atelier-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <circle cx="100" cy="100" r="99" fill="#0b0b0c" />
                <text fontSize="14" fill="currentColor" textLength="486" lengthAdjust="spacing" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
                  <textPath href="#atelier-circle">TATTOO SQUID · MÜREKKEP · TEN · DUVAR · </textPath>
                </text>
              </svg>
              <svg viewBox="0 0 32 32" fill="none" className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-blood">
                <circle cx="16" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M12 16.5c-1.8 3.4-4.6 5.3-7.6 5.6M16 17.5c0 4.2-1.6 7.8-4.8 9.8M20 16.5c1.5 3.6 4.4 6.2 8.2 6.3M18 17.2c1.8 2.8 2.3 6 1.4 9.2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
