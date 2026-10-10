import { BadgeCheck } from "lucide-react";
import { CertificationGrid } from "@/components/certifications/certification-grid";
import { CertificationSpotlight } from "@/components/certifications/certification-spotlight";
import { SectionTransition } from "@/components/transitions/section-transition";
import { ContentPlaceholder } from "@/components/ui/content-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { getI18n } from "@/i18n/server";
import { getSpotlightCertification } from "@/lib/content";

export async function Certifications() {
  const { dict, content } = await getI18n();
  const t = dict.certifications;
  const { certifications } = content;
  const spotlight = getSpotlightCertification(content);

  return (
    <Section id="certifications">
      <SectionHeader id="certifications" index={6} tag={t.tag} title={t.title} description={t.description} />

      {/* Certifications → Education: the cards gather in as the academic path comes in. */}
      <SectionTransition exit="converge">
        {spotlight && <CertificationSpotlight certification={spotlight} />}

        {certifications.length > 0 ? (
          <>
            <Reveal delay={0.1}>
              <CertificationGrid certifications={certifications} />
            </Reveal>
            {certifications.some((cert) => !cert.credentialUrl) && (
              <ContentPlaceholder file="certifications.ts" className="mt-4">
                Some certifications have no `credentialUrl` yet: paste the verification links in data/certifications.ts.
              </ContentPlaceholder>
            )}
          </>
        ) : (
          <Reveal>
            <div className="flex flex-col items-start gap-5 panel p-8 sm:flex-row sm:items-center sm:p-10">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-raised text-accent">
                <BadgeCheck className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-lg font-medium text-fg">{t.emptyTitle}</p>
                <p className="mt-1 text-sm text-muted">{t.emptyText}</p>
              </div>
            </div>
            <ContentPlaceholder file="certifications.ts" className="mt-4">
              Add your certifications (title, issuer, date, category, skills, credentialUrl…). Mark one as `featured` for the spotlight.
            </ContentPlaceholder>
          </Reveal>
        )}
      </SectionTransition>
    </Section>
  );
}
