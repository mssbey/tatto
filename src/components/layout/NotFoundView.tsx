import { SquidLine } from "@/components/motion/SquidLine";
import { ButtonLink } from "@/components/ui/Button";

export function NotFoundView() {
  return (
    <div className="container-x relative flex min-h-[80vh] flex-col justify-center overflow-hidden pt-32">
      <SquidLine className="pointer-events-none absolute -right-20 top-0 h-full w-auto text-blood/40" />
      <p className="eyebrow mb-6">Hata 404</p>
      <h1 className="display text-[length:var(--text-display-xl)]">
        İz
        <br />
        kaybolmuş.
      </h1>
      <p className="mt-8 max-w-md text-lg text-ash">Aradığın sayfa taşınmış, kaldırılmış ya da hiç var olmamış olabilir.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/" arrow>
          Ana sayfa
        </ButtonLink>
        <ButtonLink href="/store" variant="outline">
          Store
        </ButtonLink>
      </div>
    </div>
  );
}
