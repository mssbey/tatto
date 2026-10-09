import Link from "next/link";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { Wordmark } from "@/components/layout/Wordmark";

export default function NotFound() {
  return (
    <>
      <header className="container-x absolute inset-x-0 top-0 z-10 py-5">
        <Link href="/" aria-label="Tattoo Squid — Ana sayfa">
          <Wordmark />
        </Link>
      </header>
      <main>
        <NotFoundView />
      </main>
    </>
  );
}
