import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "light";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden px-6 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.18em] transition-[color,background-color,border-color] duration-300 disabled:cursor-not-allowed disabled:opacity-45 rounded-[2px] select-none";

const variants: Record<Variant, string> = {
  primary: "bg-blood text-bone hover:bg-[#b83a47] active:bg-[#932a35]",
  outline: "border border-line-strong text-bone hover:border-bone hover:bg-bone hover:text-ink",
  ghost: "px-0 py-2 text-bone hover:text-bone/80",
  light: "bg-bone text-ink hover:bg-white",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

function Arrow() {
  return (
    <svg aria-hidden width="18" height="10" viewBox="0 0 18 10" fill="none" className="transition-transform duration-300 group-hover/btn:translate-x-1">
      <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

type Common = { variant?: Variant; arrow?: boolean; children: ReactNode; className?: string };

export function ButtonLink({ variant = "primary", arrow, children, className = "", ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass(variant, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({ variant = "primary", arrow, children, className = "", ...rest }: Common & ComponentProps<"button">) {
  return (
    <button className={buttonClass(variant, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}
