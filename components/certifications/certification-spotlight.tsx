import Image from "next/image";
import { CertificationActions } from "@/components/certifications/certification-actions";
import { IssuerMark } from "@/components/certifications/issuer-mark";
import { Reveal } from "@/components/ui/reveal";
import { TagList } from "@/components/ui/tag";
import { getI18n } from "@/i18n/server";
import { formatPartialDate } from "@/lib/utils";
import type { Certification } from "@/types";

export async function CertificationSpotlight({ certification }: { certification: Certification }) {
  const { locale, dict } = await getI18n();
  const t = dict.certifications;
  return (
    <Reveal className="mb-12">
      <article className="brackets relative overflow-hidden rounded-3xl border border-line-strong bg-surface">
        <div aria-hidden className="absolute inset-0 bg-grid mask-fade-edges opacity-70" />
        <div aria-hidden className="absolute -top-32 -right-24 size-80 rounded-full bg-accent/10 blur-[100px]" />
        <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-12">
          {certification.image && (
            <div className="flex justify-center lg:col-span-3">
              <Image
                src={certification.image}
                alt={`${certification.title}, ${t.badgeAlt}`}
                width={200}
                height={200}
                className="size-40 object-contain drop-shadow-[0_0_40px_rgb(45_226_255/0.25)] sm:size-48"
              />
            </div>
          )}
          <div className={certification.image ? "lg:col-span-5" : "lg:col-span-7"}>
            <p className="label-mono text-accent">{t.spotlight}</p>
            <h3 className="mt-5 text-3xl font-medium tracking-tight text-fg sm:text-4xl">{certification.title}</h3>
            {certification.skills.length > 0 && <TagList items={certification.skills} className="mt-6" tone="accent" />}
            <div className="mt-8">
              <CertificationActions certification={certification} size="lg" />
            </div>
          </div>
          <dl className="grid content-start gap-6 border-line lg:col-span-4 lg:border-l lg:pl-10">
            <div className="flex items-center gap-4">
              {!certification.image && <IssuerMark issuer={certification.issuer} size="lg" />}
              <div>
                <dt className="label-mono text-subtle">{t.issuedBy}</dt>
                <dd className="mt-1 text-lg text-fg">{certification.issuer}</dd>
              </div>
            </div>
            {certification.date && (
              <div>
                <dt className="label-mono text-subtle">{t.issued}</dt>
                <dd className="mt-1 text-lg text-fg">
                  <time dateTime={certification.date}>{formatPartialDate(certification.date, locale)}</time>
                </dd>
              </div>
            )}
            {certification.credentialId && (
              <div>
                <dt className="label-mono text-subtle">{t.credentialId}</dt>
                <dd className="mt-1 font-mono text-sm break-all text-fg">{certification.credentialId}</dd>
              </div>
            )}
          </dl>
        </div>
      </article>
    </Reveal>
  );
}
