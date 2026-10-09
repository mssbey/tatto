"use client";

import { useId, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { estimateTattoo, type TattooOptions } from "@/lib/tattoo-estimate";
import { BodyRegionSelector, bodyRegions, type BodyRegion } from "./BodyRegionSelector";

const money = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });
const choices = [
  { key: "color", label: "Renk", options: [["black", "Siyah & gri"], ["color", "Renkli"]] },
  { key: "region", label: "Uygulama", options: [["clean", "Yeni dövme"], ["coverup", "Kapatma / Cover-up"]] },
  { key: "detail", label: "Detay seviyesi", options: [["simple", "Minimal / sade"], ["detailed", "Yoğun detaylı"]] },
  { key: "design", label: "Tasarım", options: [["ready", "Hazır referans"], ["custom", "Sana özel tasarım"]] },
] as const;

export function TattooCalculator() {
  const id = useId();
  const [bodyRegion, setBodyRegion] = useState<BodyRegion>("forearm");
  const [options, setOptions] = useState<TattooOptions>({ width: 10, height: 10, color: "black", region: "clean", detail: "simple", design: "ready" });
  const result = estimateTattoo(options);
  return (
    <div className="grid overflow-hidden border border-line bg-surface lg:grid-cols-[1.35fr_1fr]">
      <div className="p-6 sm:p-10">
        <p className="eyebrow mb-7">01 — Dövmeni tarif et</p>
        <div className="grid gap-7 sm:grid-cols-2">
          {choices.map(({ key, label, options: items }) => (
            <fieldset key={key}>
              <legend className="mb-3 text-sm text-bone/80">{label}</legend>
              <div className="grid gap-2">
                {items.map(([value, text]) => (
                  <label key={value} className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors ${options[key] === value ? "border-blood-light bg-blood/10 text-bone" : "border-line text-ash hover:border-bone/40"}`}>
                    <input type="radio" name={`${id}-${key}`} value={value} checked={options[key] === value} onChange={() => setOptions(previous => ({ ...previous, [key]: value }))} className="h-4 w-4 accent-blood-light" />
                    {text}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
        <div className="mt-8 grid gap-7 border-t border-line pt-7 sm:grid-cols-2">
          {(["width", "height"] as const).map(key => (
            <div key={key}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <label htmlFor={`${id}-${key}`} className="text-sm text-bone/80">{key === "width" ? "En" : "Boy"}</label>
                <output htmlFor={`${id}-${key}`} className="text-lg tabular-nums">{options[key]} <span className="text-xs text-ash">cm</span></output>
              </div>
              <input id={`${id}-${key}`} type="range" min={1} max={30} step={1} value={options[key]} onChange={event => setOptions(previous => ({ ...previous, [key]: Number(event.target.value) }))} className="w-full cursor-pointer accent-blood-light" />
              <div className="mt-2 flex justify-between text-xs text-ash"><span>1 cm</span><span>30 cm</span></div>
            </div>
          ))}
        </div>
      </div>
      <aside className="flex flex-col justify-between border-t border-line bg-ink/60 p-6 sm:p-10 lg:border-l lg:border-t-0">
        <div>
          <p className="eyebrow mb-8">02 — Bütçeni planla</p>
          <BodyRegionSelector value={bodyRegion} onChange={setBodyRegion} width={options.width} height={options.height} />
          <p className="text-sm text-ash">Tahmini fiyat aralığı</p>
          <p aria-live="polite" aria-atomic="true" className="mt-3 text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight tabular-nums">{money.format(result.low)} <span className="text-ash">–</span> {money.format(result.high)}</p>
          <p className="mt-4 text-xs text-ash">{bodyRegions.find(region => region.id === bodyRegion)?.label} · {result.area} cm² · {options.color === "black" ? "Siyah & gri" : "Renkli"} · {options.region === "clean" ? "Yeni dövme" : "Kapatma"}</p>
          <p className="mt-7 border-t border-line pt-5 text-sm leading-relaxed text-ash">Bu tutar, araştırılan piyasa fiyatlarına dayalı yaklaşık bir bütçedir. Kesin fiyat; tasarım, uygulama bölgesi ve sanatçı değerlendirmesiyle belirlenir.</p>
        </div>
        <div className="mt-8">
          <ButtonLink href="/randevu" arrow className="w-full">Fikrini Paylaş, Teklif Al</ButtonLink>
          <p className="mt-3 text-center text-xs text-ash">Randevu talebi ücretsizdir.</p>
        </div>
      </aside>
    </div>
  );
}
