export function formatPrice(minor: number, currency = "TRY") {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: minor % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(minor / 100);
}

export function formatCm(n: number | null | undefined) {
  if (n == null) return null;
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 }).format(n);
}

export function formatSize(w?: number | null, h?: number | null, d?: number | null) {
  if (w == null || h == null) return null;
  const base = `${formatCm(w)} × ${formatCm(h)}`;
  return d != null ? `${base} × ${formatCm(d)} cm` : `${base} cm`;
}

export function formatDate(d: Date | number, withTime = false) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(d);
}

const TR_MAP: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", İ: "i", Ç: "c", Ğ: "g", Ö: "o", Ş: "s", Ü: "u" };
const COMBINING_MARKS = new RegExp("[\\u0300-\\u036f]", "g");

export function slugify(input: string) {
  return input
    .trim()
    .replace(/[çğıöşüİÇĞÖŞÜ]/g, (c) => TR_MAP[c] ?? c)
    .toLowerCase()
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
