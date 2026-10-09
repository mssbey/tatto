import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { CARE_STEPS, FAQ } from "@/content/care";

export const metadata: Metadata = {
  title: "Dövme Bakım Rehberi ve SSS",
  description: "Yeni dövmen için temel bakım adımları ve sık sorulan sorular.",
  alternates: { canonical: "/bakim-ve-sss" },
};

export default function CarePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <div className="pt-32 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
      <header className="container-x mb-20 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-5">Rehber</p>
          <h1 className="display text-[length:var(--text-display-xl)]" data-reveal="up">
            Bakım & SSS
          </h1>
        </div>
        <p className="text-ash lg:col-span-4">
          Genel bilgilendirmedir. Seans sonunda sanatçının sana özel verdiği talimatlar her zaman önceliklidir.
        </p>
      </header>

      <section className="container-x" aria-labelledby="care-title">
        <h2 id="care-title" className="display mb-10 text-[length:var(--text-display-sm)]">
          Yeni dövmen için
        </h2>
        <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {CARE_STEPS.map((s, i) => (
            <li key={s.title} className="bg-ink p-8" data-reveal="up" data-reveal-delay={String((i % 3) * 0.06)}>
              <span className="text-xs text-blood-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-3 text-3xl">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-ash">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-x mt-28 grid gap-12 lg:grid-cols-12" aria-labelledby="faq-title">
        <h2 id="faq-title" className="display text-[length:var(--text-display-sm)] lg:col-span-4">
          Sık sorulan sorular
        </h2>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex list-none items-center justify-between gap-6 py-5 text-lg [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-2xl leading-none text-ash transition-transform duration-300 group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-ash">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container-x mt-28 border-t border-line pt-16 text-center">
        <p className="display text-[length:var(--text-display-sm)]">Sorunun cevabı burada yok mu?</p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/iletisim" variant="outline" arrow>
            Bize ulaş
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
