import { cn } from "@/lib/utils";

/** Issuer monogram, used when no badge or certificate preview is available. */
export function IssuerMark({ issuer, size = "md" }: { issuer: string; size?: "md" | "lg" }) {
  const initials = issuer
    .split(/[\s·]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center border border-line-strong bg-raised font-display font-medium text-accent",
        size === "lg" ? "size-16 rounded-2xl text-xl" : "size-11 rounded-xl text-sm",
      )}
    >
      {initials}
    </span>
  );
}
