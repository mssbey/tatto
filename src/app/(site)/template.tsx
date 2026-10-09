/** Sayfa geçişi: kısa opacity + translate. Saf CSS — JS'e bağımlı değil, hareket azaltmada kapanır. */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
