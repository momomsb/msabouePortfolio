"use client";

import { ArrowUpRight, FileText } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { useI18n } from "@/i18n/locale-provider";
import type { Certification } from "@/types";

/** "Verify credential" / "View certificate", only when the link or file exists. */
export function CertificationActions({ certification, size = "md" }: { certification: Certification; size?: "md" | "lg" }) {
  const { dict } = useI18n();
  const t = dict.certifications;
  if (!certification.credentialUrl && !certification.certificateFile) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {certification.credentialUrl && (
        <ButtonLink
          href={certification.credentialUrl}
          external
          size={size}
          aria-label={`${t.verify}: ${certification.title} (${dict.common.opensInNewTab})`}
        >
          {t.verify}
          <ArrowUpRight className="size-4" aria-hidden />
        </ButtonLink>
      )}
      {certification.certificateFile && (
        <ButtonLink
          href={certification.certificateFile}
          external
          variant="secondary"
          size={size}
          aria-label={`${t.viewCertificate}: ${certification.title} (${dict.common.opensInNewTab})`}
        >
          <FileText className="size-4" aria-hidden />
          {t.viewCertificate}
        </ButtonLink>
      )}
    </div>
  );
}
