import type { Metadata } from "next";
import { Suspense } from "react";
import { WorkGallery } from "@/components/works/WorkGallery";
import { WorksBrowser } from "@/components/works/WorksBrowser";
import { toGallery } from "@/components/works/toGallery";
import { getPublishedArtists, getPublishedWorks, getWorkStyles } from "@/lib/queries/catalog";

export const metadata: Metadata = {
  title: "Çalışmalar",
  description: "Tattoo station dövme çalışmaları — stil ve sanatçıya göre filtrele.",
  alternates: { canonical: "/calismalar" },
};

export default async function WorksPage() {
  const [works, styles, artists] = await Promise.all([getPublishedWorks(), getWorkStyles(), getPublishedArtists()]);
  const gallery = toGallery(works);
  const browsable = gallery.map((g, i) => ({ ...g, styleSlug: works[i]!.style?.slug ?? null, artistSlug: works[i]!.artist?.slug ?? null }));
  const artistsWithWork = artists.filter((a) => works.some((w) => w.artistId === a.id));

  return (
    <div className="pt-32 sm:pt-40">
      <header className="container-x mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-5" data-reveal="fade">
            Portfolyo
          </p>
          <h1 className="display text-[length:var(--text-display-xl)]" data-reveal="up">
            Çalışmalar
          </h1>
        </div>
        <p className="text-ash lg:col-span-4" data-reveal="up" data-reveal-delay="0.1">
          Her biri bir görüşmeyle başlayıp kişiye özel çizilen işler. Büyütmek için bir görsele dokun.
        </p>
      </header>

      <Suspense
        fallback={
          <section className="container-x" aria-label="Çalışma galerisi">
            <WorkGallery works={gallery} />
          </section>
        }
      >
        <WorksBrowser
          works={browsable}
          styles={styles.map((s) => ({ slug: s.slug, name: s.name }))}
          artists={artistsWithWork.map((a) => ({ slug: a.slug, name: a.name }))}
        />
      </Suspense>
    </div>
  );
}
