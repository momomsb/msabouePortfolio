"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { cn, pad } from "@/lib/utils";

export function CaseStudyToc({ items }: { items: Array<{ id: string; title: string }> }) {
  const active = useActiveSection(items.map((item) => item.id));

  return (
    <nav aria-label="Case study sections" className="sticky top-[calc(var(--nav-height)+2rem)]">
      <p className="mb-4 label-mono text-subtle">Contents</p>
      <ol className="space-y-1 border-l border-line">
        {items.map((item, index) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition-colors",
                  isActive ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg",
                )}
              >
                <span className={cn("font-mono text-xs", isActive ? "text-accent" : "text-subtle")}>{pad(index + 1)}</span>
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
