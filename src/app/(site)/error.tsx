"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="container-x flex min-h-[70vh] flex-col justify-center pt-32">
      <p className="eyebrow mb-6">Bir şeyler ters gitti</p>
      <h1 className="display text-[length:var(--text-display-lg)]">Mürekkep taştı.</h1>
      <p className="mt-6 max-w-md text-ash">Sayfa yüklenirken beklenmeyen bir hata oluştu. Tekrar denemek çoğu zaman yeterli olur.</p>
      {error.digest && <p className="mt-3 font-mono text-xs text-ash">Kod: {error.digest}</p>}
      <div className="mt-10 flex flex-wrap gap-3">
        <Button onClick={reset} arrow>
          Tekrar dene
        </Button>
        <ButtonLink href="/" variant="outline">
          Ana sayfa
        </ButtonLink>
      </div>
    </div>
  );
}
