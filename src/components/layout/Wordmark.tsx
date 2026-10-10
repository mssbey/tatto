/* eslint-disable @next/next/no-img-element */

/**
 * Marka imzası. Yönetim panelinden logo yüklendiğinde (settings.logoUrl) otomatik
 * olarak logo görseli kullanılır; aksi halde tipografik "TATTOO STATION" wordmark.
 */
export function Wordmark({
  logoUrl,
  size = "sm",
  className = "",
}: {
  logoUrl?: string;
  size?: "sm" | "xl";
  className?: string;
}) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt="Tattoo station"
        className={`${size === "xl" ? "h-auto w-full max-w-[1200px]" : "h-7 w-auto sm:h-8"} ${className}`}
      />
    );
  }
  if (size === "xl") {
    return (
      <span className={`display relative block select-none leading-[0.8] ${className}`} aria-label="Tattoo station">
        <svg viewBox="0 0 1000 170" className="h-auto w-full" aria-hidden>
          <text
            x="0"
            y="150"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 196, fontVariationSettings: '"opsz" 72' }}
          >
            TATTOO STATION
          </text>
        </svg>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <SquidGlyph className="h-6 w-6 shrink-0 text-blood" />
      <span className="display text-[1.45rem] leading-none tracking-[0.04em] sm:text-[1.6rem]">
        Tattoo<span className="text-ash"> </span>station
      </span>
    </span>
  );
}

/** Soyut kontur işareti: bir halka ve ondan çıkan tek kıvrımlı hat */
export function SquidGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="16" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 16.5c-1.8 3.4-4.6 5.3-7.6 5.6M16 17.5c0 4.2-1.6 7.8-4.8 9.8M20 16.5c1.5 3.6 4.4 6.2 8.2 6.3M18 17.2c1.8 2.8 2.3 6 1.4 9.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
