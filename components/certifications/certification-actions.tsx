import { ArrowUpRight, FileText } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import type { Certification } from "@/types";

/** "Verify credential" / "View certificate", only when the link or file exists. */
export function CertificationActions({ certification, size = "md" }: { certification: Certification; size?: "md" | "lg" }) {
  if (!certification.credentialUrl && !certification.certificateFile) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {certification.credentialUrl && (
        <ButtonLink
          href={certification.credentialUrl}
          external
          size={size}
          aria-label={`Verify ${certification.title} credential (opens in a new tab)`}
        >
          Verify credential
          <ArrowUpRight className="size-4" aria-hidden />
        </ButtonLink>
      )}
      {certification.certificateFile && (
        <ButtonLink
          href={certification.certificateFile}
          external
          variant="secondary"
          size={size}
          aria-label={`View ${certification.title} certificate (opens in a new tab)`}
        >
          <FileText className="size-4" aria-hidden />
          View certificate
        </ButtonLink>
      )}
    </div>
  );
}
