import Image from "next/image";
import { TattooCalculator } from "@/components/forms/TattooCalculator";
import Link from "next/link";
import { ArtImage, DemoBadge } from "@/components/media/ArtImage";
import { InkBackdrop } from "@/components/motion/InkBackdrop";
import { SquidLine } from "@/components/motion/SquidLine";
import { ProductCard } from "@/components/store/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { FeaturedWorksSection } from "@/components/home/FeaturedWorksSection";
import { toGallery } from "@/components/works/toGallery";
import { getFeaturedProducts, getFeaturedWorks, getPublishedArtists, getPublishedWorks, getWorkStyles } from "@/lib/queries/catalog";
import { formatAddress, getSettings } from "@/lib/settings";
import { AtelierSection } from "@/components/home/AtelierSection";
import { heroVisual, processVisuals, type Visual } from "@/lib/visuals";


export default async function HomePage() {
  const [settings, works, products, artists, allWorks, styles] = await Promise.all([
    getSettings(),
    getFeaturedWorks(6),
    getFeaturedProducts(4),
    getPublishedArtists(),
    getPublishedWorks(),
    getWorkStyles(),
  ]);
  const hero = heroVisual(settings);
  const process: Visual[] = processVisuals();
  if (process.length < 3) {
    // Gerçek süreç görseli yoksa yayınlanmış çalışmalardan yararlan
    for (const w of works.slice(0, 3 - process.length)) {
      process.push({ url: w.imageUrl, width: w.width, height: w.height, alt: w.alt || w.title, isDemo: w.isDemo });
    }
  }
  const address = formatAddress(settings);

  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <section className="home-hero relative isolate flex min-h-[min(940px,100svh)] items-center overflow-hidden border-b border-line" aria-labelledby="hero-title">
        <div className="absolute inset-0 -z-20 bg-surface">
          {settings.heroVideoUrl ? (
            <video className="hero-background h-full w-full object-cover" src={settings.heroVideoUrl} poster={hero?.url} muted playsInline autoPlay loop preload="metadata" aria-hidden />
          ) : hero ? (
            <Image src={hero.url} alt={hero.alt} fill sizes="100vw" preload className="hero-background object-cover" />
          ) : (
            <InkBackdrop />
          )}
        </div>
        <div className="hero-shade absolute inset-0 -z-10" aria-hidden />
        <div className="container-x relative pb-28 pt-40 sm:pb-36 sm:pt-44">
          <div className="max-w-[850px]">
            <p className="mb-8 flex items-center gap-4 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-bone/80 sm:text-xs" data-reveal="fade">
              <span className="h-px w-10 bg-blood-light" aria-hidden />
              Tattoo Squid · Dövme & Sanat
            </p>
            <h1 id="hero-title" className="display text-[clamp(3.4rem,8vw,8.5rem)] leading-[0.98] tracking-[-0.015em]">
              <span className="block" data-reveal="up">Teninde</span>
              <span className="block" data-reveal="up" data-reveal-delay="0.08">bir hikâye.</span>
              <span className="mt-4 block text-[0.58em] leading-[1.1] text-bone/70" data-reveal="up" data-reveal-delay="0.18">Duvarında bir imza.</span>
            </h1>
            <p className="mt-8 max-w-[25rem] text-base leading-relaxed text-bone/75 sm:text-lg" data-reveal="up" data-reveal-delay="0.26">
              Sana özel çizgiler. Kalıcı hikâyeler. Teninden yaşam alanına uzanan özgün dövme sanatı.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 sm:mt-10" data-reveal="up" data-reveal-delay="0.34">
              <ButtonLink href="/randevu" arrow>Randevu Oluştur</ButtonLink>
              <ButtonLink href="/calismalar" variant="outline">Çalışmaları Keşfet</ButtonLink>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 border-t border-bone/15 bg-ink/10">
          <div className="container-x flex items-center justify-between gap-6 py-5 sm:py-6">
            <p className="text-[0.6rem] uppercase tracking-[0.22em] text-bone/60 sm:text-xs">Özgün tasarım <span className="mx-2 text-blood-light sm:mx-4">/</span> Kalıcı sanat</p>
            <a href="#secili-calismalar" className="flex shrink-0 items-center gap-3 text-[0.6rem] uppercase tracking-[0.2em] text-bone/80 transition-colors hover:text-bone sm:text-xs">Keşfet <span aria-hidden className="text-lg">↓</span></a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- SEÇİLİ ÇALIŞMALAR */}
      {works.length ? (
        <FeaturedWorksSection works={toGallery(works)} styles={styles.map((st) => st.name)} total={allWorks.length} />
      ) : (
        <section id="secili-calismalar" className="container-x py-24">
          <EmptyNote text="Çalışmalar çok yakında burada olacak." />
        </section>
      )}

      {/* ------------------------------------------------ MARKA ANLATISI */}
      <section className="container-x py-24 sm:py-32" aria-labelledby="price-title">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">Fiyat hesaplama</p>
            <h2 id="price-title" className="display text-[length:var(--text-display-lg)]">Hayal et. Planla.</h2>
            <p className="mt-5 max-w-xl text-ash">Boyutunu, rengini ve detaylarını seç; dövmen için yaklaşık bütçeyi keşfet.</p>
          </div>
          <Link href="/dovme-fiyati-hesaplama" className="link-underline text-sm uppercase tracking-[0.15em]">Hesaplama hakkında →</Link>
        </div>
        <TattooCalculator />
      </section>

      {/* ------------------------------------------------ ATÖLYE */}
      <AtelierSection images={process} />

      {/* ------------------------------------------------------ SANATÇILAR */}
      <section className="container-x py-24 sm:py-32" aria-labelledby="artists-title">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4" data-reveal="fade">
              03 — Sanatçılar
            </p>
            <h2 id="artists-title" className="display text-[length:var(--text-display-lg)]" data-reveal="up">
              Eller ve imzalar
            </h2>
          </div>
          {artists.length > 0 && (
            <Link href="/sanatcilar" className="text-sm uppercase tracking-[0.2em] link-underline">
              Tüm sanatçılar →
            </Link>
          )}
        </div>
        {artists.length ? (
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {artists.slice(0, 3).map((a, i) => (
              <li key={a.id} data-reveal="up" data-reveal-delay={String(i * 0.08)}>
                <Link href={`/sanatcilar/${a.slug}`} className="group block">
                  <div className="relative overflow-hidden">
                    <ArtImage
                      src={a.portraitUrl}
                      alt={a.name}
                      width={a.portraitWidth}
                      height={a.portraitHeight}
                      ratio={4 / 5}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                      imgClassName="grayscale transition-[transform,filter] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    {a.isDemo && <DemoBadge className="absolute left-3 top-3" />}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                    <h3 className="display text-3xl">{a.name}</h3>
                    <span className="text-xs uppercase tracking-[0.18em] text-ash">Portfolyo →</span>
                  </div>
                  {a.headline && <p className="mt-3 text-sm text-ash">{a.headline}</p>}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-8 border border-line p-8 sm:p-12 md:grid-cols-2 md:items-end" data-reveal="up">
            <p className="display text-4xl text-bone/90 sm:text-5xl">Ekip profilleri hazırlanıyor.</p>
            <div className="space-y-6 text-ash">
              <p>Sanatçılarımızı ve portfolyolarını yakında burada tanıtacağız. Bu arada randevu rehberine göz atabilirsin.</p>
              <ButtonLink href="/randevu" variant="outline" arrow>
                Randevu Talebi
              </ButtonLink>
            </div>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------- STORE */}
      <section className="relative isolate overflow-hidden border-y border-line py-24 sm:py-36" aria-labelledby="store-title">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(168,50,62,0.16),transparent_55%)]" aria-hidden />
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-6 flex items-center gap-4" data-reveal="fade">
                <span className="h-px w-10 bg-blood" aria-hidden />
                04 — Store
              </p>
              <h2 id="store-title" className="display text-[length:var(--text-display-xl)]" data-reveal="up">
                Sanat, tenin
                <br />
                ötesinde.
              </h2>
            </div>
            <div className="space-y-6 lg:col-span-4 lg:col-start-9" data-reveal="up" data-reveal-delay="0.1">
              <p className="text-lg leading-relaxed text-ash">
                Fake skin; dövme için geliştirilmiş sentetik bir deri yüzeyidir. Eserlerimizi bu yüzeye, tende kullandığımız
                makine, iğne ve mürekkeple işliyoruz. Baskı ya da çıkartma değil — her biri elle yapılmış bir dövme çalışması.
              </p>
              <ButtonLink href="/store" arrow>
                Koleksiyonu Keşfet
              </ButtonLink>
            </div>
          </div>

          {products.length ? (
            <ul className="mt-20 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p, i) => (
                <li key={p.id} className={i % 2 === 1 ? "lg:mt-20" : ""}>
                  <ProductCard product={p} index={i} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw" />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyNote text="Koleksiyon hazırlanıyor. Yeni eserler eklendiğinde burada yer alacak." />
          )}
        </div>
      </section>

      {/* ------------------------------------------------------ STÜDYO */}
      <section className="py-24 sm:py-32" aria-labelledby="studio-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4" data-reveal="fade">
              05 — Stüdyo
            </p>
            <h2 id="studio-title" className="display text-[length:var(--text-display-lg)]" data-reveal="up">
              Sessiz bir
              <br />
              çalışma alanı.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ash lg:col-span-5 lg:col-start-8" data-reveal="up" data-reveal-delay="0.1">
            <p>
              Stüdyo; tasarımın konuşulduğu, çizildiği ve uygulandığı yer. Ziyaretten önce randevu talebi bırakman, sana
              ayıracağımız zamanı planlamamızı kolaylaştırır.
            </p>
            {address && <p className="text-bone/80">{address}</p>}
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/studyo" variant="outline">
                Stüdyoyu Tanı
              </ButtonLink>
              <ButtonLink href="/randevu" variant="ghost" arrow>
                Ziyaret planla
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- CTA */}
      <section className="relative isolate overflow-hidden border-t border-line" aria-labelledby="cta-title">
        <SquidLine variant="divider" className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-24 w-full text-blood/60" />
        <div className="container-x py-28 text-center sm:py-40">
          <h2 id="cta-title" className="display mx-auto max-w-5xl text-[length:var(--text-display-lg)]" data-reveal="up">
            Bir fikrin var.
            <br />
            <span className="text-bone/45">Birlikte iz bırakalım.</span>
          </h2>
          <div className="mt-12 flex justify-center" data-reveal="up" data-reveal-delay="0.12">
            <ButtonLink href="/randevu" arrow>
              Fikrini Paylaş
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function EmptyNote({ text }: { text: string }) {
  return <p className="mt-12 border border-line p-10 text-center text-ash">{text}</p>;
}
