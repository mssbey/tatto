"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Sınırlı parallax: yalnızca masaüstünde (≥1024px) ve hareket azaltma kapalıyken.
 * Mobilde düz akış.
 */
export function Parallax({ children, offset = 50, className = "" }: { children: React.ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const active = desktop && !reduce;
  return (
    <div ref={ref} className={className}>
      <motion.div style={active ? { y } : undefined}>{children}</motion.div>
    </div>
  );
}
