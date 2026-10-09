import type { Metadata } from "next";
import { TattooCalculator } from "@/components/forms/TattooCalculator";

export const metadata: Metadata = {
  title: "Dövme Fiyatı Hesaplama",
  description: "Boyut, renk ve tasarım detaylarını seçerek dövmen için yaklaşık bütçeyi öğren.",
  alternates: { canonical: "/dovme-fiyati-hesaplama" },
};

export default function TattooPricePage() {
  return (
    <div className="container-x pb-24 pt-36 sm:pb-32 sm:pt-44">
      <header className="mb-12 max-w-3xl">
        <p className="eyebrow mb-5">Dövme fiyatı hesaplama</p>
        <h1 className="display text-[length:var(--text-display-lg)]">Fikrinin boyutunu.<br /><span className="text-bone/50">Bütçenin sınırını.</span></h1>
        <p className="mt-7 max-w-xl text-lg text-ash">Dövmeni birkaç adımda tarif et. Seçimlerin değiştikçe yaklaşık fiyat aralığını anında gör.</p>
      </header>
      <TattooCalculator />
      <details className="mt-8 border-b border-line pb-5 text-sm text-ash">
        <summary className="text-bone/80">Tahmin nasıl hazırlanıyor?</summary>
        <div className="mt-4 max-w-3xl space-y-3 leading-relaxed">
          <p>9 Ekim 2026 tarihinde incelenen stüdyo rehberlerindeki başlangıç ücretleri ve boyuta göre fiyat aralıkları esas alındı. Alan, renk, kapatma, detay ve özel tasarım için kullanılan katsayılar yaklaşık bütçe modeli olarak oluşturuldu; Tattoo Squid’in kesin fiyat tarifesi değildir.</p>
          <p>Kaynaklar: <a className="underline" href="https://begotattoo.com/minimal-dovme/" target="_blank" rel="noreferrer">BegoTattoo</a>, <a className="underline" href="https://www.bosphorusink.com/sss" target="_blank" rel="noreferrer">Bosphorus Ink</a>, <a className="underline" href="https://ersintattoo.com/dovme-fiyatlari" target="_blank" rel="noreferrer">Ersin Tattoo</a>.</p>
          <p>Ölçüler 1–30 cm arasında seçilebilir. Daha büyük çalışmalar ve kapatma projeleri için doğrudan görüşme önerilir.</p>
        </div>
      </details>
    </div>
  );
}
