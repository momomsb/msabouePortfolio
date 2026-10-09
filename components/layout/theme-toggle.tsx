"use client";

import { motion } from "motion/react";
import { useSyncExternalStore, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/i18n/locale-provider";
import { applyTheme, DEFAULT_THEME, readTheme, subscribeToTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const options: Array<{ value: Theme; icon: typeof Moon }> = [
  { value: "dark", icon: Moon },
  { value: "light", icon: Sun },
];

/**
 * Segmented dark/light switch. Where supported, the new theme is revealed
 * as a circle growing from the clicked button (View Transitions API).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { dict } = useI18n();
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, () => DEFAULT_THEME);

  function select(next: Theme, event: MouseEvent<HTMLButtonElement>) {
    if (next === theme) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      return;
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    document
      .startViewTransition(() => applyTheme(next))
      .ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 550, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      });
  }

  return (
    <div
      role="group"
      aria-label={dict.toggles.theme}
      className={cn("flex rounded-full border border-line-strong bg-raised/60 p-0.5", className)}
    >
      {options.map(({ value, icon: Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            aria-label={value === "dark" ? dict.toggles.dark : dict.toggles.light}
            title={value === "dark" ? dict.toggles.dark : dict.toggles.light}
            onClick={(event) => select(value, event)}
            className={cn(
              "relative grid size-8 place-items-center rounded-full transition-colors duration-200",
              active ? "text-ink" : "text-muted hover:text-fg",
            )}
          >
            {active && (
              <motion.span
                layoutId="theme-indicator"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
              />
            )}
            <motion.span
              className="relative z-10"
              animate={{ rotate: active ? 0 : value === "dark" ? -30 : 45, scale: active ? 1 : 0.9 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            >
              <Icon className="size-4" aria-hidden />
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}
