import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden px-4 pt-(--nav-height)">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-fade-edges" />
      <div className="mx-auto max-w-xl text-center">
        <p className="label-mono text-accent">Error 404 · Signal lost</p>
        <h1 className="mt-6 text-5xl font-medium tracking-tight text-fg sm:text-6xl">This page isn&apos;t in the lab.</h1>
        <p className="mt-5 text-lg text-muted">The link may be broken, or the page may have moved.</p>
        <ButtonLink href="/" size="lg" className="mt-10">
          <ArrowLeft className="size-4" aria-hidden />
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
