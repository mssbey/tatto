import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Hanken_Grotesk } from "next/font/google";
import { RevealController } from "@/components/motion/RevealController";
import { env } from "@/lib/env";
import "./globals.css";

const display = Big_Shoulders({
  subsets: ["latin", "latin-ext"],
  variable: "--font-big-shoulders",
  axes: ["opsz"],
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Tattoo Squid — Dövme Stüdyosu ve Sanat Mağazası",
    template: "%s — Tattoo Squid",
  },
  description: "Özgün dövme tasarımları ve fake skin üzerine işlenen koleksiyonluk eserler.",
  applicationName: "Tattoo Squid",
  openGraph: { type: "website", locale: "tr_TR", siteName: "Tattoo Squid" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

/**
 * Animasyon başlangıç durumları yalnızca bu sınıf varken uygulanır. Hareket azaltma
 * tercihi olan kullanıcılarda sınıf eklenmez; JS hiç çalışmazsa içerik doğrudan görünür.
 */
const animBootstrap = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-anim')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: animBootstrap }} />
      </head>
      <body className="grain bg-ink text-bone">
        {children}
        <RevealController />
      </body>
    </html>
  );
}
