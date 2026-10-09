import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  tone?: "default" | "accent";
  className?: string;
}

export function Tag({ children, tone = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 font-mono text-[0.6875rem] leading-none tracking-wide",
        tone === "accent" ? "border-accent/30 bg-accent/10 text-accent" : "border-line bg-raised/70 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagList({ items, className, tone }: { items: string[]; className?: string; tone?: TagProps["tone"] }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

/** Pulsing green dot for live / available states. */
export function StatusDot({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block size-2 animate-pulse-dot rounded-full bg-success", className)} />;
}
