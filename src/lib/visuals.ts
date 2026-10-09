import manifest from "../../public/demo/manifest.json";
import type { SiteSettings } from "@/config/site";

export type Visual = { url: string; width: number; height: number; alt: string; isDemo: boolean };

type ManifestKey = keyof typeof manifest;

/** Statik sürümde demo görseller her zaman gösterilir ve "Demo" etiketiyle işaretlenir. */
export function demoVisual(key: ManifestKey): Visual {
  const m = manifest[key];
  return { url: m.file, width: m.width, height: m.height, alt: m.alt, isDemo: true };
}

export function heroVisual(s: SiteSettings): Visual | null {
  if (s.heroImageUrl) {
    return { url: s.heroImageUrl, width: s.heroImageWidth || 1400, height: s.heroImageHeight || 1750, alt: "Tattoo Squid", isDemo: false };
  }
  return demoVisual("hero");
}

export function studioVisual(s: SiteSettings): Visual | null {
  if (s.studioImageUrl) {
    return { url: s.studioImageUrl, width: s.studioImageWidth || 2400, height: s.studioImageHeight || 1350, alt: "Tattoo Squid stüdyosu", isDemo: false };
  }
  return demoVisual("studio-1");
}

export function processVisuals(): Visual[] {
  return (["process-1", "process-2", "process-3"] as const).map((k) => demoVisual(k)).filter((v): v is Visual => v !== null);
}
