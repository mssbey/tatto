"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useFocusTrap } from "@/components/ui/useFocusTrap";

type Option = { value: string; label: string };

export function StoreFilters({
  categories,
  statusOptions,
  sortOptions,
  total,
  children,
}: {
  categories: Option[];
  statusOptions: readonly Option[];
  sortOptions: readonly Option[];
  total: number;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [drawer, setDrawer] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const current = {
    kategori: params.get("kategori") ?? "",
    durum: params.get("durum") ?? "",
    sirala: params.get("sirala") ?? "",
  };

  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    const qs = next.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const onSearch = (value: string) => {
    setQ(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => update({ q: value.trim() }), 320);
  };

  const activeCount = [current.kategori, current.durum, current.sirala].filter(Boolean).length;

  const filterBody = (idPrefix: string) => (
    <div className="space-y-10">
      <fieldset>
        <legend className="eyebrow mb-4">Kategori</legend>
        <div className="flex flex-wrap gap-2">
          {[{ value: "", label: "Tümü" }, ...categories].map((c) => (
            <button
              key={c.value || "all"}
              type="button"
              onClick={() => update({ kategori: c.value })}
              aria-pressed={current.kategori === c.value}
              className={`border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors ${
                current.kategori === c.value ? "border-bone bg-bone text-ink" : "border-line-strong text-bone/80 hover:border-bone"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-4">Durum</legend>
        <div className="flex flex-col gap-1">
          {statusOptions.map((o) => (
            <label key={o.value || "default"} className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-bone/85 hover:text-bone">
              <input
                type="radio"
                name={`${idPrefix}-durum`}
                checked={current.durum === o.value}
                onChange={() => update({ durum: o.value })}
                className="h-4 w-4 accent-[#a8323e]"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor={`${idPrefix}-sort`} className="eyebrow mb-4 block">
          Sırala
        </label>
        <select id={`${idPrefix}-sort`} className="field" value={current.sirala} onChange={(e) => update({ sirala: e.target.value })}>
          {sortOptions.map((o) => (
            <option key={o.value || "default"} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => {
            setQ("");
            update({ kategori: "", durum: "", sirala: "", q: "" });
          }}
          className="text-xs uppercase tracking-[0.18em] text-ash link-underline hover:text-bone"
        >
          Filtreleri temizle
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
      {/* Masaüstü filtreler */}
      <aside className="hidden lg:block" aria-label="Filtreler">
        <div className="sticky top-28">{filterBody("d")}</div>
      </aside>

      <div>
        <div className="mb-8 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <label htmlFor="store-search" className="sr-only">
              Eserlerde ara
            </label>
            <svg className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-ash" width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" fill="none" strokeWidth="1.3" />
              <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <input
              id="store-search"
              type="search"
              value={q}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Eser, teknik veya sanatçı ara"
              className="w-full border-0 border-b border-transparent bg-transparent py-2 pl-7 text-bone placeholder:text-ash/70 focus:border-bone focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.18em] text-ash" aria-live="polite">
              {pending ? "Yükleniyor…" : `${total} eser`}
            </p>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="inline-flex items-center gap-2 border border-line-strong px-4 py-2.5 text-xs uppercase tracking-[0.18em] lg:hidden"
              aria-haspopup="dialog"
            >
              Filtrele{activeCount > 0 && <span className="bg-blood px-1.5 text-bone">{activeCount}</span>}
            </button>
          </div>
        </div>
        <div className={`transition-opacity duration-300 ${pending ? "opacity-40" : ""}`} aria-busy={pending}>
          {children}
        </div>
      </div>

      <AnimatePresence>
        {drawer && (
          <FilterDrawer onClose={() => setDrawer(false)} total={total} pending={pending}>
            {filterBody("m")}
          </FilterDrawer>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterDrawer({ onClose, children, total, pending }: { onClose: () => void; children: React.ReactNode; total: number; pending: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);
  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <motion.div className="absolute inset-0 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Filtreler"
        className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col border-t border-line bg-surface"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="display text-2xl">Filtrele</p>
          <button type="button" onClick={onClose} className="p-2 text-sm uppercase tracking-[0.18em]" data-autofocus>
            Kapat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-8">{children}</div>
        <div className="border-t border-line p-4">
          <button type="button" onClick={onClose} className="w-full bg-bone py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink">
            {pending ? "Yükleniyor…" : `${total} eseri göster`}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
