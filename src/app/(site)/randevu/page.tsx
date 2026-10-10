import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { formatAddress, getSettings, socialLinks, whatsappLink } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Randevu Talebi",
  description: "Dövme fikrini paylaşmak için Tattoo station ile iletişime geç.",
  alternates: { canonical: "/randevu" },
};

const TIPS = [
  { title: "Fikir", body: "Konu, stil, anlamı ve aklındaki his. Net olmasa da olur; birlikte netleştiririz." },
  { title: "Bölge ve boyut", body: "Dövmeyi nerede ve yaklaşık hangi boyutta düşündüğün." },
  { title: "Referans", body: "Beğendiğin stil veya kompozisyonlardan birkaç görsel. Referanslar birebir kopyalanmaz." },
  { title: "Zaman", body: "Uygun olduğun tarih aralığı. Kesin randevu, görüşmenin ardından netleşir." },
];

/**
 * Statik sürüm: sunucu olmadığı için form verisi kaydedilemez. Sahte bir
 * "gönderildi" deneyimi yerine, hazırlık rehberi ve mevcut iletişim kanalları gösterilir.
 */
export default async function AppointmentPage() {
  const settings = await getSettings();
  const wa = whatsappLink(settings, "Merhaba, dövme randevusu hakkında bilgi almak istiyorum.");
  const socials = socialLinks(settings);
  const address = formatAddress(settings);
  const channels = [
    wa && { label: "WhatsApp ile yaz", href: wa, external: true },
    settings.email && { label: settings.email, href: `mailto:${settings.email}?subject=${encodeURIComponent("Randevu talebi")}` },
    settings.phone && { label: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}` },
    ...socials.map((s) => ({ label: s.label, href: s.href, external: true })),
  ].filter(Boolean) as { label: string; href: string; external?: boolean }[];

  return (
    <div className="pt-32 sm:pt-40">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <p className="eyebrow mb-5">Randevu talebi</p>
          <h1 className="display text-[length:var(--text-display-lg)]" data-reveal="up">
            Fikrini
            <br />
            paylaş.
          </h1>
          <p className="mt-8 max-w-md text-ash">
            Her çalışma bir görüşmeyle başlar. Bize ulaşırken aşağıdaki bilgileri paylaşman, fikrini daha hızlı anlamamızı sağlar.
          </p>
          <p className="mt-6 max-w-md border-l border-blood pl-4 text-sm text-bone/80">
            Online randevu formu yakında burada olacak. Bu sayfa şimdilik bir rehberdir; kesin randevu, görüşmenin ardından netleşir.
          </p>
        </header>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="divide-y divide-line border-y border-line">
            {TIPS.map((t, i) => (
              <li key={t.title} className="grid gap-2 py-6 sm:grid-cols-[3rem_10rem_1fr]" data-reveal="up" data-reveal-delay={String(i * 0.05)}>
                <span className="text-xs text-blood-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-2xl">{t.title}</span>
                <span className="text-ash">{t.body}</span>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <p className="eyebrow mb-5">Nasıl ulaşırım?</p>
            {channels.length ? (
              <ul className="flex flex-wrap gap-3">
                {channels.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex border border-line-strong px-5 py-3 text-sm uppercase tracking-[0.16em] hover:border-bone"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border border-line p-6 text-ash">İletişim kanalları çok yakında burada paylaşılacak.</p>
            )}
            {address && <p className="mt-6 text-ash">{address}</p>}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/dovme-fiyati-hesaplama" variant="outline" arrow>
              Yaklaşık fiyatı hesapla
            </ButtonLink>
            <ButtonLink href="/calismalar" variant="ghost" arrow>
              Çalışmalara göz at
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
