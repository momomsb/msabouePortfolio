import Link from "next/link";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Logo({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <Link
      href="/#home"
      onClick={onNavigate}
      aria-label={`${profile.name}, back to top`}
      className={cn("group flex items-center gap-3 rounded-md", className)}
    >
      <span
        aria-hidden
        className="relative grid size-9 place-items-center rounded-lg border border-line-strong bg-raised font-display text-sm font-semibold tracking-tight text-fg transition-colors group-hover:border-accent/60"
      >
        MM
        <span className="absolute -top-px -right-px size-1.5 rounded-[1px] bg-accent" />
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className="font-display text-[0.9375rem] font-medium tracking-tight text-fg">{profile.name}</span>
        <span className="mt-1 font-mono text-[0.625rem] tracking-[0.2em] text-subtle uppercase">Digital Lab</span>
      </span>
    </Link>
  );
}
