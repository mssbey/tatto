import Link from "next/link";
import { NAV_LINKS, type SiteSettings } from "@/config/site";
import { formatAddress, socialLinks, whatsappLink } from "@/lib/settings";
import { Wordmark } from "./Wordmark";

export function Footer({ settings, policies }: { settings: SiteSettings; policies: { slug: string; title: string }[] }) {
  const address = formatAddress(settings);
  const socials = socialLinks(settings);
  const wa = whatsappLink(settings);
  const hasContact = Boolean(address || settings.email || settings.phone || wa || settings.openingHours);

  return (
    <footer className="relative mt-32 border-t border-line pt-20" id="site-footer">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display max-w-md text-[2.4rem] text-bone/90">Mürekkep, ten ve duvar.</p>
            <Link href="/randevu" className="mt-6 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-bone link-underline">
              Randevu talebi oluştur <span aria-hidden>→</span>
            </Link>
          </div>

          <nav aria-label="Alt menü" className="md:col-span-2">
            <p className="eyebrow mb-5">Menü</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              {[...NAV_LINKS, { href: "/bakim-ve-sss", label: "Bakım & SSS" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-bone/80 link-underline hover:text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5">İletişim</p>
            {hasContact ? (
              <ul className="space-y-2.5 text-[0.95rem] text-bone/80">
                {address && (
                  <li>
                    {settings.mapUrl ? (
                      <a href={settings.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-bone">
                        {address}
                      </a>
                    ) : (
                      address
                    )}
                  </li>
                )}
                {settings.phone && (
                  <li>
                    <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="link-underline hover:text-bone">
                      {settings.phone}
                    </a>
                  </li>
                )}
                {settings.email && (
                  <li>
                    <a href={`mailto:${settings.email}`} className="link-underline hover:text-bone">
                      {settings.email}
                    </a>
                  </li>
                )}
                {wa && (
                  <li>
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-bone">
                      WhatsApp
                    </a>
                  </li>
                )}
                {settings.openingHours && <li className="whitespace-pre-line text-ash">{settings.openingHours}</li>}
              </ul>
            ) : (
              <p className="text-[0.95rem] text-ash">
                <Link href="/randevu" className="link-underline hover:text-bone">
                  Randevu rehberi
                </Link>{" "}
                · İletişim kanalları yakında burada.
              </p>
            )}
          </div>

          {socials.length > 0 && (
            <div className="md:col-span-2">
              <p className="eyebrow mb-5">Takip et</p>
              <ul className="space-y-2.5 text-[0.95rem]">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-bone/80 link-underline hover:text-bone">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-24 text-bone" aria-hidden={!settings.logoUrl}>
          <Wordmark size="xl" logoUrl={settings.logoUrl} />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line py-7 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.legalName || settings.brandName}
          </p>
          {policies.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {policies.map((p) => (
                <li key={p.slug}>
                  <Link href={`/politikalar/${p.slug}`} className="link-underline hover:text-bone">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
