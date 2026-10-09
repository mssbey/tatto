import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { env } from "@/lib/env";
import { formatAddress, getSettings, socialLinks, whatsappLink } from "@/lib/settings";

export const metadata: Metadata = { title: "İletişim", alternates: { canonical: "/iletisim" } };

export default async function ContactPage() {
  const s = await getSettings();
  const address = formatAddress(s);
  const wa = whatsappLink(s, "Merhaba,");
  const socials = socialLinks(s);
  const rows = [
    address && { label: "Adres", value: address, href: s.mapUrl || undefined, external: true },
    s.phone && { label: "Telefon", value: s.phone, href: `tel:${s.phone.replace(/\s/g, "")}` },
    s.email && { label: "E-posta", value: s.email, href: `mailto:${s.email}` },
    wa && { label: "WhatsApp", value: "Mesaj gönder", href: wa, external: true },
    s.openingHours && { label: "Çalışma saatleri", value: s.openingHours },
  ].filter(Boolean) as { label: string; value: string; href?: string; external?: boolean }[];

  // Yapısal veri yalnızca gerçek işletme bilgileri girildiyse üretilir
  const ld =
    address && (s.phone || s.email)
      ? {
          "@context": "https://schema.org",
          "@type": "TattooParlor",
          name: s.brandName,
          url: env.siteUrl,
          ...(s.phone ? { telephone: s.phone } : {}),
          ...(s.email ? { email: s.email } : {}),
          address: {
            "@type": "PostalAddress",
            streetAddress: s.addressLine,
            addressLocality: s.district || undefined,
            addressRegion: s.city || undefined,
            postalCode: s.postalCode || undefined,
            addressCountry: "TR",
          },
          ...(socials.length ? { sameAs: socials.map((x) => x.href) } : {}),
        }
      : null;

  return (
    <div className="pt-32 sm:pt-40">
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />}
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <p className="eyebrow mb-5">İletişim</p>
          <h1 className="display text-[length:var(--text-display-xl)]" data-reveal="up">
            Yaz bize.
          </h1>
          <p className="mt-8 max-w-sm text-ash">Dövme fikirlerin, Store’daki eserler ve diğer tüm konular için aşağıdaki kanallardan bize ulaşabilirsin.</p>
          <div className="mt-10">
            <ButtonLink href="/randevu" arrow>
              Randevu Talebi
            </ButtonLink>
          </div>
        </header>
        <div className="lg:col-span-6 lg:col-start-7">
          {rows.length ? (
            <dl className="divide-y divide-line border-y border-line">
              {rows.map((r) => (
                <div key={r.label} className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr]">
                  <dt className="eyebrow pt-1">{r.label}</dt>
                  <dd className="whitespace-pre-line text-xl">
                    {r.href ? (
                      <a href={r.href} {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="link-underline">
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
              {socials.length > 0 && (
                <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr]">
                  <dt className="eyebrow pt-1">Sosyal</dt>
                  <dd className="flex flex-wrap gap-x-6 gap-y-2 text-xl">
                    {socials.map((x) => (
                      <a key={x.href} href={x.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                        {x.label}
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          ) : (
            <div className="border border-line p-8 text-ash">
              <p>İletişim bilgileri çok yakında burada paylaşılacak.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
