import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSettings, socialLinks } from "@/lib/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <a href="#icerik" className="skip-link">
        İçeriğe geç
      </a>
      <Header logoUrl={settings.logoUrl} socials={socialLinks(settings)} />
      <main id="icerik" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer settings={settings} policies={[]} />
    </>
  );
}
