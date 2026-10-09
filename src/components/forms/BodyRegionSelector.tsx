"use client";

import { useState } from "react";

export const bodyRegions = [
  { id: "neck", label: "Boyun", side: "both" },
  { id: "shoulder", label: "Omuz", side: "both" },
  { id: "upper-arm", label: "Üst kol", side: "both" },
  { id: "forearm", label: "Ön kol", side: "both" },
  { id: "hand", label: "El / bilek", side: "both" },
  { id: "chest", label: "Göğüs", side: "front" },
  { id: "ribs", label: "Kaburga", side: "front" },
  { id: "abdomen", label: "Karın", side: "front" },
  { id: "back", label: "Sırt", side: "back" },
  { id: "lower-back", label: "Bel", side: "back" },
  { id: "thigh", label: "Üst bacak", side: "both" },
  { id: "calf", label: "Alt bacak", side: "both" },
  { id: "ankle", label: "Ayak / ayak bileği", side: "both" },
] as const;
export type BodyRegion = (typeof bodyRegions)[number]["id"];
type View = "front" | "back";

const shapes: { id: BodyRegion; paths: string[]; side?: View }[] = [
  { id: "neck", paths: ["M94 62L94 78Q110 88 126 78L126 62Z"] },
  { id: "shoulder", paths: ["M94 78L78 82Q64 85 60 103L83 113L93 99Z", "M126 78L142 82Q156 85 160 103L137 113L127 99Z"] },
  { id: "upper-arm", paths: ["M60 106L82 116L72 155L53 151Z", "M160 106L138 116L148 155L167 151Z"] },
  { id: "forearm", paths: ["M53 155L72 159L61 202L44 198Z", "M167 155L148 159L159 202L176 198Z"] },
  { id: "hand", paths: ["M44 202L61 206L57 231Q52 239 44 235L38 225Z", "M176 202L159 206L163 231Q168 239 176 235L182 225Z"] },
  { id: "chest", side: "front", paths: ["M96 82Q110 90 124 82L134 113L128 139L112 144L88 139L86 113Z"] },
  { id: "ribs", side: "front", paths: ["M85 141L97 145L98 184L85 193L79 169Z", "M135 141L123 145L122 184L135 193L141 169Z"] },
  { id: "abdomen", side: "front", paths: ["M101 148L119 148L119 185L133 197L131 220L110 230L89 220L87 197L101 185Z"] },
  { id: "back", side: "back", paths: ["M96 82Q110 90 124 82L135 116L132 158L110 182L88 158L85 116Z"] },
  { id: "lower-back", side: "back", paths: ["M87 163L110 187L133 163L139 193L131 220L110 230L89 220L81 193Z"] },
  { id: "thigh", paths: ["M86 224L107 235L105 298L81 298L76 260Z", "M134 224L113 235L115 298L139 298L144 260Z"] },
  { id: "calf", paths: ["M81 302L105 302L101 345L96 370L80 370L76 340Z", "M139 302L115 302L119 345L124 370L140 370L144 340Z"] },
  { id: "ankle", paths: ["M80 374L96 374L97 389L102 399Q91 405 72 400L72 392Z", "M140 374L124 374L123 389L118 399Q129 405 148 400L148 392Z"] },
];

export function BodyRegionSelector({ value, onChange, width, height }: { value: BodyRegion; onChange: (region: BodyRegion) => void; width: number; height: number }) {
  const [view, setView] = useState<View>("front");
  const selected = bodyRegions.find(region => region.id === value)!;
  const changeRegion = (next: BodyRegion) => {
    const region = bodyRegions.find(item => item.id === next)!;
    if (region.side !== "both") setView(region.side);
    onChange(next);
  };
  return (
    <div className="body-selector mb-7 overflow-hidden rounded-2xl border border-bone/10">
      <div className="flex items-center justify-between gap-3 px-5 pt-5">
        <div><p className="text-[0.6rem] uppercase tracking-[0.22em] text-ash">Tuvalin sensin</p><p className="mt-1 text-base text-bone">Bölgeni seç.</p></div>
        <div className="flex gap-1 rounded-full border border-bone/10 bg-ink/40 p-1" role="group" aria-label="Vücut görünümü">
          {(["front", "back"] as const).map(side => <button key={side} type="button" aria-pressed={view === side} onClick={() => setView(side)} className={`rounded-full px-4 py-2 text-xs transition-all duration-300 ${view === side ? "bg-bone text-ink shadow-sm" : "text-ash hover:text-bone"}`}>{side === "front" ? "Ön" : "Arka"}</button>)}
        </div>
      </div>
      <div className="relative isolate flex items-center justify-center py-6">
        <div className="pointer-events-none absolute -z-10 h-56 w-56 rounded-full border border-bone/[0.06] bg-[radial-gradient(ellipse_at_center,rgba(168,50,62,0.16),transparent_70%)]" aria-hidden />
        <div className="pointer-events-none absolute -z-10 h-72 w-72 rounded-full border border-bone/[0.03]" aria-hidden />
        <svg viewBox="25 5 170 410" className="h-[310px] w-[180px] sm:h-[340px] sm:w-[210px]" role="group" aria-label={`${view === "front" ? "Önden" : "Arkadan"} vücut bölgesi seçimi`}>
          <path d="M91 24Q110 5 129 24Q136 45 125 61L125 75Q142 80 153 88Q161 96 165 120L173 166L181 208L184 225Q181 240 172 239L161 229L155 204L144 164L136 140Q135 169 140 194Q147 224 145 254L142 300Q148 329 140 358L139 383L151 396Q153 406 136 405L119 401L117 387L119 355L113 309L110 253L107 309L101 355L103 387L101 401L84 405Q67 406 69 396L81 383L80 358Q72 329 78 300L75 254Q73 224 80 194Q85 169 84 140L76 164L65 204L59 229L48 239Q39 240 36 225L39 208L47 166L55 120Q59 96 67 88Q78 80 95 75L95 61Q84 45 91 24Z" fill="rgba(239,234,226,.045)" stroke="rgba(239,234,226,.22)" strokeWidth="1" pointerEvents="none" />
          {shapes.filter(shape => !shape.side || shape.side === view).map(shape => {
            const label = bodyRegions.find(region => region.id === shape.id)!.label;
            const active = value === shape.id;
            return <g key={shape.id} role="button" tabIndex={0} aria-label={label} aria-pressed={active} onClick={() => changeRegion(shape.id)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); changeRegion(shape.id); } }} className={`body-region ${active ? "is-selected" : ""}`}>
              <title>{label}</title>
              {shape.paths.map(path => <path key={path} d={path} strokeWidth="1.3" strokeLinejoin="round" />)}
            </g>;
          })}
          <path d={view === "front" ? "M110 93V137M106 180H114" : "M110 95V171"} fill="none" stroke="rgba(239,234,226,.2)" strokeWidth="1" pointerEvents="none" />
        </svg>
        <div className="pointer-events-none absolute bottom-6 right-4 rounded-lg border border-bone/10 bg-ink/60 px-3 py-2 backdrop-blur-sm"><p className="text-[0.55rem] uppercase tracking-widest text-ash">Ölçü</p><p className="mt-1 text-xs tabular-nums text-bone/80">{width} × {height} cm</p></div>
      </div>
      <div className="px-5 pb-5">
        <p className="mb-3 text-[0.65rem] text-ash">Silüete dokun veya bir bölge seç.</p>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Dövme uygulanacak bölge">
          {bodyRegions.map(region => <button key={region.id} type="button" aria-pressed={value === region.id} onClick={() => changeRegion(region.id)} className={`rounded-full border px-3 py-2 text-[0.65rem] transition-colors ${value === region.id ? "border-blood-light/70 bg-blood/20 text-bone" : "border-bone/10 bg-bone/[0.02] text-ash hover:border-bone/30 hover:text-bone"}`}>{region.label}</button>)}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-bone/10 pt-4 text-xs"><span className="text-ash">Seçilen bölge</span><span className="flex items-center gap-2 text-bone"><span className="h-1.5 w-1.5 rounded-full bg-blood-light shadow-[0_0_8px_rgba(168,50,62,0.7)]" />{selected.label}</span></div>
        {selected.side !== "both" && selected.side !== view && <p className="mt-2 text-xs text-ash">Seçili bölge {selected.side === "front" ? "ön" : "arka"} görünümde.</p>}
      </div>
    </div>
  );
}
