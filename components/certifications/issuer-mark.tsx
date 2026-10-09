import Image from "next/image";
import { cn } from "@/lib/utils";

/** Issuer logo, or a monogram when no logo is provided. */
export function IssuerMark({ issuer, image, size = "md" }: { issuer: string; image?: string; size?: "md" | "lg" }) {
  const box = size === "lg" ? "size-16 rounded-2xl" : "size-11 rounded-xl";
  if (image) {
    return (
      <span className={cn("relative block shrink-0 overflow-hidden border border-line-strong bg-white/95", box)}>
        <Image src={image} alt={`${issuer} logo`} fill sizes="64px" className="object-contain p-2" />
      </span>
    );
  }
  const initials = issuer
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center border border-line-strong bg-raised font-display font-medium text-accent",
        box,
        size === "lg" ? "text-xl" : "text-sm",
      )}
    >
      {initials}
    </span>
  );
}
