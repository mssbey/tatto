import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { formatAddress, getSettings, whatsappLink } from "@/lib/settings";
import { processVisuals, studioVisual } from "@/lib/visuals";

export const metadata: Metadata = {
  title: "Stüdyo",
  description: "Tattoo station'in dövme ve sanat yaklaşımını keşfet. Tasarım sürecini öğren, stüdyo ziyaretini planla.",
  alternates: { canonical: "/studyo" },
};

const steps = [
  { title: "Önce fikrini dinleriz.", text: "Referanslarını, hikâyeni ve beklentilerini paylaş. Tasarımın yönünü birlikte belirleyelim." },
  { title: "Çizgiyi sana uyarlarız.", text: "Boyut, yerleşim ve detayları konuşur; tasarımın bedeninle kuracağı ilişkiyi düşünürüz." },
  { title: "Zamanını planlarız.", text: "Tasarım ve uygulama detayları netleşince uygun zamanı ve fiyatı birlikte kararlaştırırız." },
];

export default async function StudioPage() {
  const settings = await getSettings();
  const studio = studioVisual(settings);
  const details = processVisuals();
  const address = formatAddress(settings);
  const wa = whatsappLink(settings, "Merhaba, stüdyo ziyareti ve dövme randevusu hakkında bilgi almak istiyorum.");

  return (
    <div>
      <section className="container-x pb-16 pt-36 sm:pb-24 sm:pt-44" aria-labelledby="studio-title">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <header className="lg:col-span-6">
            <p className="eyebrow mb-7 flex items-center gap-3"><span className="h-px w-8 bg-blood-light" />Tattoo station / Stüdyo</p>
            <h1 id="studio-title" className="display text-[clamp(3.5rem,7.6vw,7.5rem)]" data-reveal="up">Bir fikir.<br />Bir çizgi.<br /><span className="text-bone/45">Kalıcı bir iz.</span></h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ash">Dövmenin zanaatla, sanatın kişisel hikâyelerle buluştuğu bir atölye. Her çalışmanın merkezinde senin fikrin var.</p>
            <div className="mt-9 flex flex-wrap gap-3"><ButtonLink href="/randevu" arrow>Ziyaretini Planla</ButtonLink><ButtonLink href="/calismalar" variant="ghost">Çalışmaları Gör →</ButtonLink></div>
            <p className="mt-7 text-xs tracking-wide text-ash">Ziyaretler randevu talebiyle planlanır.</p>
          </header>
          {studio && <figure className="relative lg:col-span-6" data-reveal="clip">
            <div className="relative aspect-[4/5] max-h-[660px] overflow-hidden bg-surface">
              <Image src={studio.url} alt={studio.alt} fill preload sizes="(min-width: 1024px) 48vw, 92vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4"><span className="text-xs uppercase tracking-[0.2em] text-bone/80">Çizgi. Doku. Karakter.</span><span className="display text-4xl text-bone/60">SQ.</span></div>
            </div>
            {studio.isDemo && <figcaption className="mt-3 text-[0.65rem] text-ash">Görsel referans · Skin Design Tattoos</figcaption>}
          </figure>}
        </div>
      </section>

      <section className="border-y border-line bg-surface/50 py-16 sm:py-24" aria-labelledby="approach-title">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5"><p className="eyebrow mb-5">01 — Yaklaşımımız</p><h2 id="approach-title" className="display text-[length:var(--text-display-md)]">Tenin üzerinde.<br />Hayatın içinde.</h2></div>
          <div className="space-y-6 lg:col-span-6 lg:col-start-7"><p className="text-xl leading-relaxed text-bone/85">Dövmeyi yalnızca bir desen olarak değil, taşıdığın bir ifade olarak görüyoruz.</p><p className="leading-relaxed text-ash">Tattoo station’de fikirler konuşulur, kâğıda dökülür ve tene işlenir. Aynı sanat dili, fake skin üzerine hazırlanan koleksiyonluk eserlerde de devam eder; mürekkebin hikâyesi yaşam alanına taşınır.</p><Link href="/store" className="link-underline inline-block text-xs uppercase tracking-[0.2em]">Atölye koleksiyonunu keşfet →</Link></div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28" aria-labelledby="process-title">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow mb-5">02 — Birlikte nasıl çalışırız?</p><h2 id="process-title" className="display text-[length:var(--text-display-md)]">Fikirden ilk çizgiye.</h2></div><p className="max-w-sm text-sm leading-relaxed text-ash">İyi bir çalışma, birbirimizi anlamakla başlar. Her aşamayı birlikte netleştiririz.</p></div>
        <ol className="grid gap-8 md:grid-cols-3">{steps.map((step, i) => <li key={step.title} className="border-t border-line pt-6" data-reveal="up" data-reveal-delay={String(i * .08)}><span className="text-xs tabular-nums text-blood-light">0{i + 1}</span><h3 className="mt-5 text-xl font-medium">{step.title}</h3><p className="mt-4 text-sm leading-relaxed text-ash">{step.text}</p></li>)}</ol>
        {details.length > 0 && <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6">{details.slice(0, 2).map((image, i) => <figure key={image.url + i} className={i === 1 ? "mt-10 sm:mt-16" : ""}><div className="relative aspect-[4/3] overflow-hidden bg-surface"><Image src={image.url} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 46vw" className="object-cover transition-transform duration-700 hover:scale-105" /></div><figcaption className="mt-3 text-[0.65rem] uppercase tracking-[0.12em] text-ash">{image.isDemo ? "Görsel referans · Skin Design Tattoos" : i === 0 ? "Atölyeden detaylar" : "Mürekkebin dili"}</figcaption></figure>)}</div>}
      </section>

      <section className="container-x pb-24 sm:pb-32" aria-labelledby="visit-title">
        <div className="grid gap-12 border border-line bg-surface p-6 sm:p-12 lg:grid-cols-2 lg:gap-20">
          <div><p className="eyebrow mb-5">03 — Stüdyo ziyareti</p><h2 id="visit-title" className="display text-[length:var(--text-display-md)]">Tanışalım.<br /><span className="text-bone/45">Fikrini konuşalım.</span></h2><p className="mt-6 max-w-md text-sm leading-relaxed text-ash">Referans görsellerini ve düşündüğün bölgeyi paylaş. Sana zaman ayırabilmek için ziyaret öncesinde randevu talebi bırakmanı rica ediyoruz.</p><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/randevu" arrow>Randevu Talebi</ButtonLink><ButtonLink href="/iletisim" variant="outline">İletişim</ButtonLink></div></div>
          <dl className="divide-y divide-line border-y border-line self-center">
            <div className="py-5"><dt className="eyebrow mb-2">Ziyaret düzeni</dt><dd className="text-sm text-bone/85">Randevu talebiyle, sana ayrılmış bir zaman.</dd></div>
            {address && <div className="py-5"><dt className="eyebrow mb-2">Adres</dt><dd className="text-sm leading-relaxed text-bone/85">{address}{settings.mapUrl && <a href={settings.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 block w-fit text-xs text-ash">Yol tarifi al ↗</a>}</dd></div>}
            {settings.openingHours && <div className="py-5"><dt className="eyebrow mb-2">Çalışma saatleri</dt><dd className="whitespace-pre-line text-sm text-bone/85">{settings.openingHours}</dd></div>}
            {wa && <div className="py-5"><dt className="eyebrow mb-2">Doğrudan iletişim</dt><dd><a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline text-sm">WhatsApp üzerinden yaz ↗</a></dd></div>}
            <div className="py-5"><dt className="eyebrow mb-2">Bütçeni planla</dt><dd><Link href="/dovme-fiyati-hesaplama" className="link-underline text-sm">Yaklaşık fiyatı hesapla →</Link></dd></div>
          </dl>
        </div>
      </section>
    </div>
  );
}
