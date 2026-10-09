"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { localeNames, locales, rememberLocale, switchLocalePath, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

/** Id of the section currently at the top of the viewport, to land on the same spot. */
function currentSectionId() {
  const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) * 16 || 72;
  let current: string | null = null;
  for (const section of document.querySelectorAll<HTMLElement>("main section[id]")) {
    if (section.getBoundingClientRect().top <= offset + 1) current = section.id;
  }
  return current;
}

/**
 * EN / FR switch. Loads the same page in the other language, anchored on the
 * section being read, and remembers the choice in a cookie read by proxy.ts.
 *
 * A full page load (rather than a client navigation) keeps a single document:
 * switching the root `[lang]` layout client-side would keep the previous
 * language's tree mounted (hidden) and duplicate every element id.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const [selected, setSelected] = useState<Locale>(locale);

  function select(target: Locale) {
    if (target === selected) return;
    setSelected(target);
    rememberLocale(target);
    const section = currentSectionId();
    const url = switchLocalePath(pathname, target) + (section ? `#${section}` : "");
    // Let the indicator slide before the page changes.
    window.setTimeout(() => window.location.assign(url), 180);
  }

  return (
    <div
      role="group"
      aria-label={dict.toggles.language}
      className={cn("flex rounded-full border border-line-strong bg-raised/60 p-0.5", className)}
    >
      {locales.map((value) => {
        const active = value === selected;
        return (
          <button
            key={value}
            type="button"
            lang={value}
            aria-pressed={active}
            aria-label={localeNames[value]}
            title={localeNames[value]}
            onClick={() => select(value)}
            className={cn(
              "relative h-8 min-w-9 rounded-full px-2 font-mono text-[0.6875rem] font-semibold tracking-wider uppercase transition-colors duration-200",
              active ? "text-ink" : "text-muted hover:text-fg",
            )}
          >
            {active && (
              <motion.span
                layoutId="language-indicator"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
              />
            )}
            <span className="relative z-10">{value}</span>
          </button>
        );
      })}
    </div>
  );
}
