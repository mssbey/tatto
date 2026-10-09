import type { Metadata } from "next";
import Link from "next/link";
import { ArtImage, DemoBadge } from "@/components/media/ArtImage";
import { ButtonLink } from "@/components/ui/Button";
import { getPublishedArtists } from "@/lib/queries/catalog";

export const metadata: Metadata = { title: "Sanatçılar", alternates: { canonical: "/sanatcilar" } };

export default async function ArtistsPage() {
  const artists = await getPublishedArtists();
  return (
    <div className="pt-32 sm:pt-40">
      <header className="container-x mb-16">
        <p className="eyebrow mb-5" data-reveal="fade">
          Ekip
        </p>
        <h1 className="display text-[length:var(--text-display-xl)]" data-reveal="up">
          Sanatçılar
        </h1>
      </header>
      <div className="container-x">
        {artists.length ? (
          <ul className="divide-y divide-line border-y border-line">
            {artists.map((a, i) => (
              <li key={a.id} data-reveal="up" data-reveal-delay={String(Math.min(i, 3) * 0.06)}>
                <Link href={`/sanatcilar/${a.slug}`} className="group grid items-center gap-6 py-8 sm:grid-cols-[10rem_1fr_auto] sm:gap-10">
                  <div className="relative w-32 sm:w-40">
                    <ArtImage
                      src={a.portraitUrl}
                      alt={a.name}
                      width={a.portraitWidth}
                      height={a.portraitHeight}
                      ratio={4 / 5}
                      sizes="160px"
                      imgClassName="grayscale transition duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
                    />
                    {a.isDemo && <DemoBadge className="absolute left-2 top-2" />}
                  </div>
                  <div>
                    <h2 className="display text-[length:var(--text-display-md)] transition-colors group-hover:text-blood-light">{a.name}</h2>
                    {a.headline && <p className="mt-2 text-ash">{a.headline}</p>}
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-ash group-hover:text-bone">Portfolyo →</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-8 border border-line p-8 sm:p-12 md:grid-cols-2 md:items-end">
            <p className="display text-4xl sm:text-5xl">Ekip profilleri hazırlanıyor.</p>
            <div className="space-y-6 text-ash">
              <p>Sanatçılarımızı ve portfolyolarını yakında burada tanıtacağız.</p>
              <ButtonLink href="/randevu" variant="outline" arrow>
                Randevu Talebi
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
