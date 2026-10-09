import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { getI18n } from "@/i18n/server";

export default async function NotFound() {
  const { locale, dict } = await getI18n();
  const t = dict.notFound;
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden px-4 pt-(--nav-height)">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-fade-edges" />
      <div className="mx-auto max-w-xl text-center">
        <p className="label-mono text-accent">{t.tag}</p>
        <h1 className="mt-6 text-5xl font-medium tracking-tight text-fg sm:text-6xl">{t.title}</h1>
        <p className="mt-5 text-lg text-muted">{t.text}</p>
        <ButtonLink href={`/${locale}`} size="lg" className="mt-10">
          <ArrowLeft className="size-4" aria-hidden />
          {t.back}
        </ButtonLink>
      </div>
    </section>
  );
}
