"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { WorkGallery, type GalleryWork } from "./WorkGallery";

export type BrowsableWork = GalleryWork & { styleSlug: string | null; artistSlug: string | null };
type Opt = { slug: string; name: string };

const chip = (active: boolean) =>
  `inline-flex border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors ${
    active ? "border-bone bg-bone text-ink" : "border-line-strong text-bone/80 hover:border-bone"
  }`;

/** Statik sitede stil/sanatçı filtreleri URL parametrelerinden istemcide uygulanır. */
export function WorksBrowser({ works, styles, artists }: { works: BrowsableWork[]; styles: Opt[]; artists: Opt[] }) {
  const params = useSearchParams();
  const stil = params.get("stil") ?? "";
  const sanatci = params.get("sanatci") ?? "";
  const filtered = works.filter((w) => (!stil || w.styleSlug === stil) && (!sanatci || w.artistSlug === sanatci));

  const href = (patch: { stil?: string; sanatci?: string }) => {
    const p = new URLSearchParams();
    const next = { stil, sanatci, ...patch };
    if (next.stil) p.set("stil", next.stil);
    if (next.sanatci) p.set("sanatci", next.sanatci);
    const qs = p.toString();
    return qs ? `/calismalar?${qs}` : "/calismalar";
  };

  return (
    <>
      <div className="container-x mb-14 space-y-5 border-y border-line py-6">
        {styles.length > 0 && (
          <nav aria-label="Stil filtresi" className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-3 w-16">Stil</span>
            <Link href={href({ stil: "" })} className={chip(!stil)} aria-current={!stil ? "true" : undefined} scroll={false}>
              Tümü
            </Link>
            {styles.map((s) => (
              <Link key={s.slug} href={href({ stil: s.slug })} className={chip(stil === s.slug)} aria-current={stil === s.slug ? "true" : undefined} scroll={false}>
                {s.name}
              </Link>
            ))}
          </nav>
        )}
        {artists.length > 0 && (
          <nav aria-label="Sanatçı filtresi" className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-3 w-16">Sanatçı</span>
            <Link href={href({ sanatci: "" })} className={chip(!sanatci)} scroll={false}>
              Tümü
            </Link>
            {artists.map((a) => (
              <Link key={a.slug} href={href({ sanatci: a.slug })} className={chip(sanatci === a.slug)} aria-current={sanatci === a.slug ? "true" : undefined} scroll={false}>
                {a.name}
              </Link>
            ))}
          </nav>
        )}
        <p className="text-xs uppercase tracking-[0.18em] text-ash" aria-live="polite">
          {filtered.length} çalışma
        </p>
      </div>

      <section className="container-x" aria-label="Çalışma galerisi">
        {filtered.length ? (
          <WorkGallery works={filtered} />
        ) : (
          <div className="border border-line px-6 py-20 text-center">
            <p className="display text-4xl">{works.length ? "Bu filtrelere uygun çalışma yok." : "Çalışmalar yakında burada."}</p>
            {works.length > 0 && (
              <Link href="/calismalar" className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] link-underline">
                Filtreleri temizle
              </Link>
            )}
          </div>
        )}
      </section>
    </>
  );
}
