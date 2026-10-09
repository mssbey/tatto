"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/config/site";
import { buttonClass } from "@/components/ui/Button";
import { useFocusTrap } from "@/components/ui/useFocusTrap";
import { Wordmark } from "./Wordmark";

export function Header({ logoUrl, socials }: { logoUrl?: string; socials: { label: string; href: string }[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Sayfa değişince menüyü kapat (render sırasında türetilmiş durum)
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
          solid ? "border-b border-line bg-ink/[0.96] py-3" : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Link href="/" className="relative z-10 shrink-0" aria-label="Tattoo Squid — Ana sayfa">
            <Wordmark logoUrl={logoUrl} />
          </Link>

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`relative text-[0.78rem] font-medium uppercase tracking-[0.2em] transition-colors hover:text-bone ${
                      isActive(l.href) ? "text-bone" : "text-bone/70"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-blood transition-all duration-500 ${isActive(l.href) ? "w-full" : "w-0"}`}
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/randevu" className={buttonClass("primary", "max-md:!hidden !px-5 !py-3")}>
              Randevu Talebi
            </Link>
            <a
              href="#mobil-menu"
              role="button"
              aria-expanded={menuOpen}
              aria-controls="mobil-menu-dialog"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(true);
              }}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">Menüyü aç</span>
              <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden>
                <path d="M0 1h26M8 13h18" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* JS yoksa: :target ile açılan sade menü */}
      <nav id="mobil-menu" aria-label="Mobil menü" className="mobile-menu fixed inset-0 z-[80] hidden flex-col bg-ink px-6 pt-24 lg:hidden">
        <a href="#" className="absolute right-4 top-5 p-3 text-sm uppercase tracking-[0.2em]">
          Kapat
        </a>
        <ul className="space-y-2">
          {[...NAV_LINKS, { href: "/randevu", label: "Randevu Talebi" }].map((l) => (
            <li key={l.href}>
              <a href={l.href} className="display block py-1 text-6xl">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} isActive={isActive} socials={socials} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({
  onClose,
  isActive,
  socials,
}: {
  onClose: () => void;
  isActive: (href: string) => boolean;
  socials: { label: string; href: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);
  const items = [...NAV_LINKS, { href: "/randevu", label: "Randevu Talebi" }];

  return (
    <motion.div
      ref={ref}
      id="mobil-menu-dialog"
      role="dialog"
      aria-modal="true"
      aria-label="Menü"
      className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-ink lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3 }}
    >
      <div className="container-x flex items-center justify-between py-5">
        <span className="eyebrow">Menü</span>
        <button type="button" onClick={onClose} className="-mr-2 inline-flex h-11 items-center gap-3 px-2 text-sm uppercase tracking-[0.2em]" data-autofocus>
          Kapat
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>
      <nav aria-label="Mobil menü" className="container-x flex flex-1 flex-col justify-center py-10">
        <ul>
          {items.map((l, i) => (
            <li key={l.href} className="overflow-hidden border-b border-line">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.06 + i * 0.055, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={l.href}
                  onClick={onClose}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`display flex items-baseline justify-between py-3 text-[clamp(2.8rem,13vw,5rem)] ${
                    isActive(l.href) ? "text-bone" : "text-bone/75"
                  } ${l.href === "/randevu" ? "!text-blood-light" : ""}`}
                >
                  <span>{l.label}</span>
                  <span className="font-sans text-xs tracking-[0.2em] text-ash">0{i + 1}</span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
      {socials.length > 0 && (
        <div className="container-x flex flex-wrap gap-x-6 gap-y-2 pb-8 text-sm text-ash">
          {socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
              {s.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}
