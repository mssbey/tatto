"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Sunucu bileşenleri yalnızca `data-reveal="up|clip|line|fade"` niteliği ekler;
 * bu tek denetleyici, görünür olan öğeleri Motion ile açar. Böylece içerik
 * istemci sarmalayıcılarına bölünmez ve JS başarısız olsa da görünür kalır.
 *
 *  data-reveal-delay="0.12"  → saniye cinsinden gecikme
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.hydrated = "1";
    if (!root.classList.contains("js-anim")) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const reveal = (el: HTMLElement) => {
      if (el.dataset.revealed) return;
      el.dataset.revealed = "1";
      const kind = el.dataset.reveal;
      const delay = Number(el.dataset.revealDelay ?? 0);
      const duration = isMobile ? 0.6 : 0.9;
      if (kind === "clip") {
        animate(el, { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] }, { duration: duration * 1.25, delay, ease: EASE });
      } else if (kind === "line") {
        animate(el, { opacity: [0, 1], transform: ["translate3d(0,105%,0)", "translate3d(0,0,0)"] }, { duration, delay, ease: EASE });
      } else if (kind === "fade") {
        animate(el, { opacity: [0, 1] }, { duration, delay, ease: EASE });
      } else {
        animate(el, { opacity: [0, 1], transform: ["translate3d(0,22px,0)", "translate3d(0,0,0)"] }, { duration, delay, ease: EASE });
      }
    };

    // "line" ve "clip" öğeleri başlangıçta kendi kırpmaları yüzünden görünmez sayılır;
    // bu yüzden kesişim, ebeveyn öğe üzerinden izlenir.
    const targets = new Map<Element, Set<HTMLElement>>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          targets.get(e.target)?.forEach(reveal);
          targets.delete(e.target);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])").forEach((el) => {
        const kind = el.dataset.reveal;
        const target = (kind === "line" || kind === "clip") && el.parentElement ? el.parentElement : el;
        let set = targets.get(target);
        if (!set) {
          set = new Set();
          targets.set(target, set);
          io.observe(target);
        }
        set.add(el);
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
