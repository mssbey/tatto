import { siteDefaults, type SiteSettings } from "@/config/site";

/**
 * Statik sürümde işletme ayarları doğrudan src/config/site.ts dosyasından okunur.
 * Boş bırakılan alanlar sitede gösterilmez.
 */
export async function getSettings(): Promise<SiteSettings> {
  return siteDefaults;
}

/** Görünür adres satırı; eksikse null. */
export function formatAddress(s: SiteSettings) {
  const parts = [s.addressLine, [s.district, s.city].filter(Boolean).join(" / "), s.postalCode].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

export function socialLinks(s: SiteSettings) {
  const norm = (v: string, base: string) => (!v ? "" : v.startsWith("http") ? v : `${base}${v.replace(/^@/, "")}`);
  return [
    { label: "Instagram", href: norm(s.instagram, "https://instagram.com/") },
    { label: "TikTok", href: norm(s.tiktok, "https://tiktok.com/@") },
    { label: "Pinterest", href: norm(s.pinterest, "https://pinterest.com/") },
    { label: "YouTube", href: norm(s.youtube, "https://youtube.com/@") },
  ].filter((l) => l.href);
}

export function whatsappLink(s: SiteSettings, text?: string) {
  const digits = s.whatsapp.replace(/\D/g, "");
  if (digits.length < 10) return null;
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
