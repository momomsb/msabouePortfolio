import { BadgeCheck } from "lucide-react";
import { CertificationGrid } from "@/components/certifications/certification-grid";
import { CertificationSpotlight } from "@/components/certifications/certification-spotlight";
import { ContentPlaceholder } from "@/components/ui/content-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { certifications } from "@/data/certifications";
import { getSpotlightCertification } from "@/lib/content";

export function Certifications() {
  const spotlight = getSpotlightCertification();

  return (
    <Section id="certifications">
      <SectionHeader
        id="certifications"
        index={6}
        tag="Certifications · Credentials"
        title="Certifications & learning."
        description="Credentials and structured learning, with verification links where available."
      />

      {spotlight && <CertificationSpotlight certification={spotlight} />}

      {certifications.length > 0 ? (
        <>
          <CertificationGrid certifications={certifications} />
          {certifications.some((cert) => !cert.credentialUrl && !cert.certificateFile) && (
            <ContentPlaceholder file="certifications.ts" className="mt-4">
              Some certifications have no `credentialUrl` / `certificateFile` yet, so no &quot;Verify&quot; button is shown.
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
              <p className="text-lg font-medium text-fg">Credentials are being added.</p>
              <p className="mt-1 text-sm text-muted">Each certification will appear here with its issuer, date and a verification link.</p>
            </div>
          </div>
          <ContentPlaceholder file="certifications.ts" className="mt-4">
            Add your certifications (title, issuer, date, category, skills, credentialUrl…). Mark one as `featured` for the spotlight.
          </ContentPlaceholder>
        </Reveal>
      )}
    </Section>
  );
}
