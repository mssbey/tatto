/**
 * Statik site için derleme zamanı ayarları.
 * SITE_URL verilmezse Vercel'in üretim alan adı (VERCEL_PROJECT_PRODUCTION_URL) kullanılır.
 */
function resolveSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const env = {
  siteUrl: resolveSiteUrl(),
};
