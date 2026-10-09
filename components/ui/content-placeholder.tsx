import { showContentPlaceholders } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Visible only in development: marks content that still has to be filled in
 * `data/`. Renders nothing in production, so visitors never see placeholders.
 */
export function ContentPlaceholder({ children, file, className }: { children: string; file: string; className?: string }) {
  if (!showContentPlaceholders) return null;
  return (
    <div
      role="note"
      className={cn(
        "rounded-xl border border-dashed border-violet/50 bg-violet/5 px-4 py-3 font-mono text-xs leading-relaxed text-violet",
        className,
      )}
    >
      <span className="font-semibold">TODO</span> · {children} <span className="opacity-70">→ data/{file}</span>
    </div>
  );
}
