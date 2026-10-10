/**
 * Statik site içeriği.
 *
 * Bu sürümde veritabanı ve yönetim paneli yoktur; çalışmalar ve Store eserleri
 * buradan okunur. Dövmeler stüdyonun gerçek çalışmalarıdır; Store eserleri demodur.
 */
import manifest from "../../public/demo/manifest.json";
import tattooPhotos from "./tattoo-photos.json";
import type { Artist, Category, Product, ProductImage, Work } from "@/lib/types";

type ManifestKey = keyof typeof manifest;
const img = (k: ManifestKey) => manifest[k];

export const categories: Category[] = [
  { id: 1, kind: "work_style", name: "Fine Line", slug: "fine-line", position: 0, isDemo: false },
  { id: 2, kind: "work_style", name: "Blackwork", slug: "blackwork", position: 1, isDemo: false },
  { id: 3, kind: "work_style", name: "Ornamental", slug: "ornamental", position: 2, isDemo: false },
  { id: 4, kind: "work_style", name: "Realism", slug: "realism", position: 3, isDemo: false },
  { id: 7, kind: "work_style", name: "Lettering", slug: "lettering", position: 4, isDemo: false },
  { id: 8, kind: "work_style", name: "Illustrative", slug: "illustrative", position: 5, isDemo: false },
  { id: 5, kind: "product", name: "Fake Skin", slug: "fake-skin", position: 0, isDemo: true },
  { id: 6, kind: "product", name: "Çerçeveli Tablo", slug: "cerceveli-tablo", position: 1, isDemo: true },
];

/** Gerçek sanatçı bilgisi girilene kadar boş — sitede "hazırlanıyor" durumu gösterilir. */
export const artists: Artist[] = [];

const styleId = (name: string) => categories.find((c) => c.kind === "work_style" && c.name === name)!.id;

export const works: Work[] = tattooPhotos.map((im, i) => {
  return {
    id: i + 1,
    title: im.title,
    description: "",
    imageUrl: im.file,
    width: im.width,
    height: im.height,
    alt: im.alt,
    styleId: styleId(im.style),
    artistId: null,
    placement: im.placement,
    featured: i < 6,
    featuredPosition: i,
    published: true,
    position: i,
    isDemo: false,
  };
});

type P = {
  name: string; slug: string; price: number; stock: number; unique: boolean; cat: string; aw: number; ah: number;
  fw?: number; fh?: number; fd?: number; frame: boolean; year: number; featured?: boolean; desc: string;
};

const productDefs: P[] = [
  { name: "Sarmal No. 1", slug: "sarmal-no-1", price: 18500, stock: 1, unique: true, cat: "cerceveli-tablo", aw: 30, ah: 40, fw: 50, fh: 62.5, fd: 3.5, frame: true, year: 2026, featured: true,
    desc: "Merkezden dışa açılan tentakül hatları, tek iğneyle işlenmiş ince konturlar ve elle noktalanmış gölge. Sentetik deri, müze tipi paspartu ile çerçevelenmiştir." },
  { name: "Halka", slug: "halka", price: 16000, stock: 1, unique: true, cat: "cerceveli-tablo", aw: 28, ah: 38, fw: 48, fh: 64, fd: 3.5, frame: true, year: 2026, featured: true,
    desc: "Ornamental bir halka ve ona dolanan tek bir kol. Kırmızı mürekkep yalnızca tek bir hatta kullanıldı." },
  { name: "Yüzey Etüdü", slug: "yuzey-etudu", price: 7500, stock: 3, unique: false, cat: "fake-skin", aw: 25, ah: 25, frame: false, year: 2026, featured: true,
    desc: "Üç parçalık küçük format seri. Her parça ayrı ayrı elle işlenir; aynı desenden çıkar ama çizgi ve doku her birinde farklıdır." },
  { name: "Üç Kol", slug: "uc-kol", price: 21000, stock: 1, unique: true, cat: "cerceveli-tablo", aw: 32, ah: 40, fw: 52, fh: 65, fd: 4, frame: true, year: 2025, featured: true,
    desc: "Aşağıdan yükselen üç kol, noktalama ile kurulan yoğunluk. Ahşap çerçeve, UV korumalı cam." },
  { name: "Yatay Akıntı", slug: "yatay-akinti", price: 24500, stock: 1, unique: true, cat: "cerceveli-tablo", aw: 45, ah: 36, fw: 65, fh: 52, fd: 4, frame: true, year: 2025,
    desc: "Yatay formatta, soldan sağa akan çizgi grupları. Büyük ölçekli fake skin üzerine birkaç seansta işlendi." },
  { name: "Kontur Parçası", slug: "kontur-parcasi", price: 6500, stock: 1, unique: true, cat: "fake-skin", aw: 18, ah: 24, frame: false, year: 2025,
    desc: "Çerçevesiz, tek parça sentetik deri. Duvara montaj aparatıyla birlikte gönderilir." },
  { name: "Merkez Çalışması", slug: "merkez-calismasi", price: 19500, stock: 0, unique: true, cat: "cerceveli-tablo", aw: 30, ah: 40, fw: 50, fh: 62.5, fd: 3.5, frame: true, year: 2025,
    desc: "Siyah bir merkez ve ondan çıkan kollar. Bu eser satıldı; arşivde görüntülenebilir." },
  { name: "Gece Çizgisi", slug: "gece-cizgisi", price: 17500, stock: 0, unique: true, cat: "cerceveli-tablo", aw: 28, ah: 40, fw: 46, fh: 62, fd: 3.5, frame: true, year: 2024,
    desc: "Dikey bir kompozisyon; ince ve kalın hatların gerilimi. Bu eser satıldı." },
];

const BASE_DATE = Date.UTC(2026, 9, 1);

export const products: Product[] = productDefs.map((d, i) => ({
  id: i + 1,
  name: d.name,
  slug: d.slug,
  description: d.desc,
  artistId: null,
  categoryId: categories.find((c) => c.kind === "product" && c.slug === d.cat)?.id ?? null,
  priceMinor: d.price * 100,
  currency: "TRY",
  stock: d.stock,
  reserved: 0,
  isUnique: d.unique,
  artworkWidthCm: d.aw,
  artworkHeightCm: d.ah,
  frameWidthCm: d.fw ?? null,
  frameHeightCm: d.fh ?? null,
  frameDepthCm: d.fd ?? null,
  material: "Sentetik deri (fake skin), dövme mürekkebi",
  technique: "Dövme makinesiyle elle işleme",
  frameIncluded: d.frame,
  frameDetail: d.frame ? "Mat siyah ahşap çerçeve, krem paspartu, cam önyüz." : "",
  year: d.year,
  deliveryNote: "",
  featured: Boolean(d.featured),
  featuredPosition: i,
  status: "published",
  isDemo: true,
  publishedAt: new Date(BASE_DATE - i * 86_400_000),
  updatedAt: new Date(BASE_DATE),
}));

export const productImages: ProductImage[] = products.flatMap((p, i) => {
  const main = img(`product-${i + 1}` as ManifestKey);
  const detail = img(`product-${i + 1}-detail` as ManifestKey);
  const atm = i % 2 ? img("studio-2") : tattooPhotos[0];
  return [
    { id: p.id * 10 + 1, productId: p.id, url: main.file, width: main.width, height: main.height, alt: `${p.name} — ${main.alt}`, kind: "product" as const, position: 0 },
    { id: p.id * 10 + 2, productId: p.id, url: detail.file, width: detail.width, height: detail.height, alt: `${p.name} — ${detail.alt}`, kind: "product" as const, position: 1 },
    { id: p.id * 10 + 3, productId: p.id, url: atm.file, width: atm.width, height: atm.height, alt: atm.alt, kind: "atmosphere" as const, position: 2 },
  ];
});
