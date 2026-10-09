/** Statik sitede kullanılan içerik tipleri (veritabanı yok). */

export type Category = {
  id: number;
  kind: "work_style" | "product";
  name: string;
  slug: string;
  position: number;
  isDemo: boolean;
};

export type Artist = {
  id: number;
  name: string;
  slug: string;
  headline: string;
  specialties: string[];
  bio: string;
  portraitUrl: string | null;
  portraitWidth: number | null;
  portraitHeight: number | null;
  instagram: string;
  acceptsBookings: boolean;
  published: boolean;
  position: number;
  isDemo: boolean;
};

export type Work = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  width: number;
  height: number;
  alt: string;
  styleId: number | null;
  artistId: number | null;
  placement: string;
  featured: boolean;
  featuredPosition: number;
  published: boolean;
  position: number;
  isDemo: boolean;
};

export type ProductImage = {
  id: number;
  productId: number;
  url: string;
  width: number;
  height: number;
  alt: string;
  kind: "product" | "atmosphere";
  position: number;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  artistId: number | null;
  categoryId: number | null;
  /** Kuruş cinsinden */
  priceMinor: number;
  currency: string;
  stock: number;
  reserved: number;
  isUnique: boolean;
  artworkWidthCm: number | null;
  artworkHeightCm: number | null;
  frameWidthCm: number | null;
  frameHeightCm: number | null;
  frameDepthCm: number | null;
  material: string;
  technique: string;
  frameIncluded: boolean;
  frameDetail: string;
  year: number | null;
  deliveryNote: string;
  featured: boolean;
  featuredPosition: number;
  status: "draft" | "published";
  isDemo: boolean;
  publishedAt: Date | null;
  updatedAt: Date;
};
