/**
 * Mürekkep yayılması hissi veren yavaş arka plan hareketi. Saf CSS, GPU dostu
 * (yalnızca transform). Mobilde ve hareket azaltma tercihinde durağandır.
 * Metnin ve görsellerin arkasında kalır (z-0, pointer-events-none).
 */
export function InkBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className="absolute -left-[20%] top-[-10%] h-[85vmax] w-[85vmax] rounded-full opacity-[0.55] md:animate-ink-drift"
        style={{ background: "radial-gradient(closest-side, rgba(168,50,62,0.22), rgba(168,50,62,0.06) 55%, transparent 72%)", filter: "blur(30px)" }}
      />
      <div
        className="absolute bottom-[-30%] right-[-15%] h-[70vmax] w-[70vmax] rounded-full opacity-70 md:animate-ink-drift"
        style={{
          background: "radial-gradient(closest-side, rgba(242,238,231,0.06), transparent 70%)",
          animationDelay: "-9s",
          animationDuration: "34s",
          filter: "blur(40px)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}
