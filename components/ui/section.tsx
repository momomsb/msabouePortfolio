import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn, pad } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Accessible name when the section has no visible <h2>. */
  label?: string;
}

export function Section({ id, children, className, label }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      aria-labelledby={label ? undefined : `${id}-title`}
      className={cn("relative py-24 sm:py-32", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  /** Section id, used to link the heading to its <section>. */
  id: string;
  index: number;
  /** Mono tag, e.g. "Subject profile". */
  tag: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  action?: ReactNode;
}

/** "[03] — EXPERIENCE" header shared by every lab module. */
export function SectionHeader({ id, index, tag, title, description, className, action }: SectionHeaderProps) {
  return (
    <Reveal className={cn("mb-14 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-3xl">
        <p className="mb-5 flex items-center gap-3 label-mono text-accent">
          <span aria-hidden className="inline-block size-1.5 rounded-[1px] bg-accent" />
          <span>
            <span className="text-subtle">[{pad(index)}]</span> {tag}
          </span>
        </p>
        <h2 id={`${id}-title`} className="text-4xl font-medium tracking-tight text-fg sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
