"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/utils";

interface FilterBarProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  /** Item count per option; options with 0 items are disabled. */
  counts?: Partial<Record<T, number>>;
  className?: string;
}

/** Toggle-button group with a sliding active indicator. */
export function FilterBar<T extends string>({ label, options, value, onChange, counts, className }: FilterBarProps<T>) {
  const indicatorId = useId();

  return (
    <div role="group" aria-label={label} className={cn("-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0", className)}>
      <div className="inline-flex gap-1 rounded-full border border-line bg-surface/80 p-1">
        {options.map((option) => {
          const active = option === value;
          const count = counts?.[option];
          const disabled = count === 0 && !active;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              disabled={disabled}
              onClick={() => onChange(option)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 font-mono text-xs whitespace-nowrap transition-colors duration-200 sm:px-4",
                active ? "text-ink" : "text-muted hover:text-fg",
                disabled && "cursor-not-allowed opacity-40 hover:text-muted",
              )}
            >
              {active && (
                <motion.span
                  layoutId={indicatorId}
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                />
              )}
              <span className="relative">
                {option}
                {count !== undefined && <span className={cn("ml-1.5", active ? "text-ink/60" : "text-subtle")}>{count}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
