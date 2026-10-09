import type { WorkItem } from "@/lib/queries/catalog";
import type { GalleryWork } from "./WorkGallery";

export function toGallery(works: WorkItem[]): GalleryWork[] {
  return works.map((w) => ({
    id: w.id,
    title: w.title,
    imageUrl: w.imageUrl,
    width: w.width,
    height: w.height,
    alt: w.alt,
    style: w.style?.name ?? null,
    artist: w.artist?.name ?? null,
    placement: w.placement,
    isDemo: w.isDemo,
  }));
}
