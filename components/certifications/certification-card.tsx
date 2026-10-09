"use client";

import Image from "next/image";
import { CertificationActions } from "@/components/certifications/certification-actions";
import { IssuerMark } from "@/components/certifications/issuer-mark";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TagList } from "@/components/ui/tag";
import { useI18n } from "@/i18n/locale-provider";
import { formatPartialDate } from "@/lib/utils";
import type { Certification } from "@/types";

const isImage = (path?: string) => Boolean(path && /\.(png|jpe?g|webp|avif)$/i.test(path));

export function CertificationCard({ certification }: { certification: Certification }) {
  const { locale, dict } = useI18n();
  const t = dict.certifications;
  const preview = isImage(certification.certificateFile) ? certification.certificateFile : undefined;

  return (
    <SpotlightCard className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/80 transition-colors duration-300 hover:border-line-strong">
      <article className="flex h-full flex-col">
        {/* Visual: certificate preview, badge, or issuer monogram */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-ink/60">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
          {preview ? (
            <a
              href={preview}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.viewCertificate}: ${certification.title} (${dict.common.opensInNewTab})`}
              className="absolute inset-3 block overflow-hidden rounded-lg border border-line shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)]"
            >
              <Image
                src={preview}
                alt={`${certification.title}, ${t.previewAlt}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </a>
          ) : certification.image ? (
            <Image
              src={certification.image}
              alt={`${certification.title}, ${t.badgeAlt}`}
              fill
              sizes="200px"
              className="object-contain p-6 drop-shadow-[0_0_24px_rgb(45_226_255/0.2)] transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <IssuerMark issuer={certification.issuer} size="lg" />
            </div>
          )}
          <span className="absolute top-3 right-3 rounded-full border border-line-strong bg-ink/85 px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-muted uppercase backdrop-blur">
            {t.categories[certification.category]}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg leading-snug font-medium tracking-tight text-fg">{certification.title}</h3>
          <p className="mt-1.5 text-sm text-muted">
            {certification.issuer}
            {certification.date && (
              <>
                {" · "}
                <time dateTime={certification.date}>{formatPartialDate(certification.date, locale, { withDay: true })}</time>
              </>
            )}
          </p>
          {certification.skills.length > 0 && <TagList items={certification.skills} className="mt-5" />}
          {certification.credentialId && (
            <p className="mt-4 font-mono text-[0.6875rem] break-all text-subtle">
              {t.credentialId} · {certification.credentialId}
            </p>
          )}
          <div className="mt-auto pt-6">
            <CertificationActions certification={certification} />
          </div>
        </div>
      </article>
    </SpotlightCard>
  );
}
