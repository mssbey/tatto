"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * İnce çizgisel kalamar motifi: tek bir tentakül hattı ve kıvrımlı uç.
 * Görünür olduğunda bir kez çizilir. Dekoratiftir (aria-hidden).
 */
const PATHS = {
  hero: [
    "M 620 -20 C 560 120, 690 210, 600 330 S 420 470, 470 600 S 660 700, 610 820 C 585 880, 520 900, 500 860 C 485 828, 520 805, 545 822",
    "M 680 -20 C 650 90, 740 190, 690 300 S 560 430, 590 540",
    "M 560 -20 C 500 70, 560 150, 520 240",
  ],
  divider: ["M 0 40 C 160 10, 260 70, 420 40 S 700 0, 860 38 S 1080 70, 1180 30 C 1230 12, 1260 30, 1240 48 C 1226 60, 1206 50, 1214 40"],
} as const;

export function SquidLine({
  variant = "hero",
  className = "",
  delay = 0.2,
}: {
  variant?: keyof typeof PATHS;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const viewBox = variant === "hero" ? "0 0 800 900" : "0 0 1260 80";
  return (
    <svg viewBox={viewBox} fill="none" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden>
      {PATHS[variant].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={i === 0 ? 1.2 : 0.7}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: i === 0 ? 1 : 0.55 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: variant === "hero" ? 3.2 - i * 0.5 : 2.4, delay: delay + i * 0.35, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </svg>
  );
}
