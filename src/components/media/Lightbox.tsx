"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useFocusTrap } from "@/components/ui/useFocusTrap";

export type LightboxItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title?: string;
  meta?: string;
  isDemo?: boolean;
};

export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
  zoomable = false,
  label = "Görsel görüntüleyici",
}: {
  items: LightboxItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  zoomable?: boolean;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [dir, setDir] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  useFocusTrap(ref, true, onClose);

  const item = items[index]!;
  const many = items.length > 1;
  const go = (delta: number) => {
    if (!many) return;
    setZoom(null);
    setDir(delta);
    onIndex((index + delta + items.length) % items.length);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const zoomAt = (e: RPointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 };
  };

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[90] flex flex-col bg-[#070708]/[0.97] outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-ash tabular-nums" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          {zoomable && (
            <button
              type="button"
              onClick={() => setZoom(zoom ? null : { x: 50, y: 50 })}
              className="inline-flex h-11 items-center px-3 text-xs uppercase tracking-[0.2em] text-ash hover:text-bone"
              aria-pressed={Boolean(zoom)}
            >
              {zoom ? "Uzaklaştır" : "Yakınlaştır"}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center gap-3 px-3 text-xs uppercase tracking-[0.2em] text-bone"
            data-autofocus
          >
            Kapat
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-2 sm:px-20"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") touch.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const t = touch.current;
          touch.current = null;
          if (!t || zoom) return;
          const dx = e.clientX - t.x;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - t.y)) go(dx < 0 ? 1 : -1);
        }}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.figure
            key={item.src}
            className="relative flex h-full max-h-[calc(100dvh-10rem)] w-full items-center justify-center"
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={`relative h-full w-full overflow-hidden ${zoomable ? (zoom ? "cursor-zoom-out" : "cursor-zoom-in") : ""}`}
              onClick={(e) => {
                if (!zoomable) return;
                setZoom(zoom ? null : zoomAt(e as unknown as RPointerEvent<HTMLElement>));
              }}
              onPointerMove={(e) => {
                if (zoom && e.pointerType === "mouse") setZoom(zoomAt(e));
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                className="object-contain transition-transform duration-300 ease-out"
                style={zoom ? { transform: "scale(2.2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
                priority
              />
            </div>
          </motion.figure>
        </AnimatePresence>

        {many && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-1 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center text-bone/70 hover:text-bone sm:flex"
              aria-label="Önceki görsel"
            >
              <svg width="28" height="14" viewBox="0 0 28 14" aria-hidden>
                <path d="M28 7H2M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.3" fill="none" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-1 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center text-bone/70 hover:text-bone sm:flex"
              aria-label="Sonraki görsel"
            >
              <svg width="28" height="14" viewBox="0 0 28 14" aria-hidden>
                <path d="M0 7h26M21 1l6 6-6 6" stroke="currentColor" strokeWidth="1.3" fill="none" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="flex min-h-20 items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <div className="min-w-0">
          {item.title && <p className="display truncate text-2xl">{item.title}</p>}
          {item.meta && <p className="truncate text-sm text-ash">{item.meta}</p>}
          {item.isDemo && <p className="text-xs uppercase tracking-[0.18em] text-ash">Demo görsel</p>}
        </div>
        {many && (
          <div className="flex shrink-0 gap-2 sm:hidden">
            <button type="button" onClick={() => go(-1)} className="h-11 w-11 border border-line-strong" aria-label="Önceki görsel">
              ←
            </button>
            <button type="button" onClick={() => go(1)} className="h-11 w-11 border border-line-strong" aria-label="Sonraki görsel">
              →
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
