/**
 * Merkezi işletme ayarları — varsayılanlar.
 *
 * Bilinmeyen işletme bilgileri bilerek BOŞ bırakılmıştır. Boş alanlar sitede
 * gösterilmez (adres, telefon, sosyal bağlantılar, WhatsApp vb.).
 * Statik sürümde gerçek değerler doğrudan aşağıdaki siteDefaults nesnesine yazılır.
 */
export type SiteSettings = {
  brandName: string;
  /** Yüklenen logo; boşsa "TATTOO STATION" wordmark kullanılır. */
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  /** Depolama anahtarları (silme için) */
  logoKey: string;
  heroKey: string;
  studioKey: string;
  legalName: string;
  taxOffice: string;
  taxNumber: string;
  email: string;
  phone: string;
  /** Uluslararası formatta, yalnızca rakam: 905xxxxxxxxx. Girilince WhatsApp bağlantıları açılır. */
  whatsapp: string;
  addressLine: string;
  district: string;
  city: string;
  postalCode: string;
  mapUrl: string;
  openingHours: string;
  instagram: string;
  tiktok: string;
  pinterest: string;
  youtube: string;
  /** Ana sayfa hero görseli (boşsa tipografik kompozisyon) ve isteğe bağlı sessiz video */
  heroImageUrl: string;
  heroImageWidth: number;
  heroImageHeight: number;
  heroVideoUrl: string;
  /** Stüdyo atmosfer görseli */
  studioImageUrl: string;
  studioImageWidth: number;
  studioImageHeight: number;
  /** Kuruş cinsinden sabit kargo ücreti */
  shippingFeeMinor: number;
  /** Bu tutarın üzerinde kargo ücretsiz (0 = kapalı) */
  freeShippingThresholdMinor: number;
  shippingNote: string;
  /** Store teslimat varsayılan metni (ürün bazında ezilebilir) */
  defaultDeliveryNote: string;
};

export const siteDefaults: SiteSettings = {
  brandName: "Tattoo station",
  logoUrl: "",
  logoWidth: 0,
  logoHeight: 0,
  logoKey: "",
  heroKey: "",
  studioKey: "",
  legalName: "",
  taxOffice: "",
  taxNumber: "",
  email: "",
  phone: "",
  whatsapp: "",
  addressLine: "",
  district: "",
  city: "",
  postalCode: "",
  mapUrl: "",
  openingHours: "",
  instagram: "",
  tiktok: "",
  pinterest: "",
  youtube: "",
  heroImageUrl: "",
  heroImageWidth: 0,
  heroImageHeight: 0,
  heroVideoUrl: "",
  studioImageUrl: "",
  studioImageWidth: 0,
  studioImageHeight: 0,
  shippingFeeMinor: 0,
  freeShippingThresholdMinor: 0,
  shippingNote: "",
  defaultDeliveryNote: "",
};

export const NAV_LINKS = [
  { href: "/calismalar", label: "Çalışmalar" },
  { href: "/sanatcilar", label: "Sanatçılar" },
  { href: "/studyo", label: "Stüdyo" },
  { href: "/store", label: "Store" },
  { href: "/dovme-fiyati-hesaplama", label: "Fiyat Hesapla" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const POLICY_PAGES = [
  { slug: "kvkk-aydinlatma-metni", title: "KVKK Aydınlatma Metni" },
  { slug: "gizlilik-politikasi", title: "Gizlilik ve Çerez Politikası" },
  { slug: "mesafeli-satis-sozlesmesi", title: "Mesafeli Satış Sözleşmesi" },
  { slug: "iade-ve-iptal", title: "İade, İptal ve Teslimat" },
] as const;
