import { CertificationActions } from "@/components/certifications/certification-actions";
import { IssuerMark } from "@/components/certifications/issuer-mark";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TagList } from "@/components/ui/tag";
import { formatPartialDate } from "@/lib/utils";
import type { Certification } from "@/types";

export function CertificationCard({ certification }: { certification: Certification }) {
  return (
    <SpotlightCard className="flex h-full flex-col rounded-2xl border border-line bg-surface/80 p-6 transition-colors duration-300 hover:border-line-strong">
      <article className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <IssuerMark issuer={certification.issuer} image={certification.image} />
          <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-muted uppercase">
            {certification.category}
          </span>
        </div>
        <h3 className="mt-5 text-lg leading-snug font-medium tracking-tight text-fg">{certification.title}</h3>
        <p className="mt-1.5 text-sm text-muted">
          {certification.issuer} · <time dateTime={certification.date}>{formatPartialDate(certification.date)}</time>
        </p>
        {certification.skills.length > 0 && <TagList items={certification.skills} className="mt-5" />}
        {certification.credentialId && (
          <p className="mt-4 font-mono text-[0.6875rem] break-all text-subtle">ID · {certification.credentialId}</p>
        )}
        <div className="mt-auto pt-6">
          <CertificationActions certification={certification} />
        </div>
      </article>
    </SpotlightCard>
  );
}
