import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

/**
 * Statik sürümde online satış yoktur. Eser için iletişim kanalına yönlendirilir;
 * hiçbir kanal girilmemişse iletişim sayfasına gider.
 */
export function ProductInquiry({
  availability,
  whatsapp,
  email,
  productName,
}: {
  availability: "available" | "reserved" | "sold";
  whatsapp: string | null;
  email: string;
  productName: string;
}) {
  if (availability === "sold") {
    return (
      <div className="space-y-4">
        <span className={buttonClass("primary", "w-full !py-4 pointer-events-none opacity-45")} aria-disabled="true">
          Satıldı
        </span>
        <p className="text-sm text-ash">
          Bu eser yeni sahibine ulaştı. Benzer bir çalışma için{" "}
          <Link href="/iletisim" className="text-bone link-underline">
            bize yaz
          </Link>
          .
        </p>
      </div>
    );
  }
  const href = whatsapp ?? (email ? `mailto:${email}?subject=${encodeURIComponent(`${productName} hakkında`)}` : "/iletisim");
  const external = Boolean(whatsapp);
  return (
    <div className="space-y-4">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={buttonClass("primary", "w-full !py-4")}
      >
        <span>Satın almak için iletişime geç</span>
        <svg aria-hidden width="18" height="10" viewBox="0 0 18 10" fill="none">
          <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </a>
      <p className="text-sm text-ash">Online ödeme yakında. Şimdilik eserlerin satışı birebir iletişimle yapılıyor.</p>
    </div>
  );
}
