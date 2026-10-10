"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ScrollProgress } from "@/components/transitions/scroll-progress";
import { useScrollSections } from "@/components/transitions/scroll-provider";
import { useI18n } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

/** Fast, slightly damped spring: the capsule glides rather than bounces. */
const capsuleSpring = { type: "spring", stiffness: 520, damping: 42, mass: 0.9 } as const;

export function Navbar() {
  const { locale, dict, content } = useI18n();
  const { active: activeSection } = useScrollSections();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
          scrolled ? "border-line/70 bg-ink/75 shadow-[0_12px_32px_-20px_rgb(0_0_0/0.55)] backdrop-blur-xl" : "border-transparent",
        )}
      >
        {/* Compacts slightly once the page scrolls (layout stays the same). */}
        <nav
          aria-label={dict.nav.main}
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-300 ease-out sm:px-6 lg:px-8",
            scrolled ? "h-15" : "h-(--nav-height)",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-0.5 lg:flex" onPointerLeave={() => setHovered(null)}>
            {content.navigation.map((item) => {
              const active = activeSection === item.sectionId;
              return (
                <li key={item.sectionId} onPointerEnter={() => setHovered(item.sectionId)}>
                  <Link
                    href={`/${locale}#${item.sectionId}`}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-2.5 py-2 text-[0.8125rem] whitespace-nowrap transition-colors duration-200 xl:px-3",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {hovered === item.sectionId && !active && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 z-0 rounded-full bg-raised/50"
                        transition={capsuleSpring}
                      />
                    )}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 z-0 rounded-full border border-line-strong bg-raised"
                        transition={capsuleSpring}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <LanguageToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={dict.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-9 place-items-center rounded-full border border-line-strong bg-raised/60 text-fg transition-colors hover:border-accent/50 lg:hidden"
            >
              <Menu className="size-4.5" aria-hidden />
            </button>
          </div>
        </nav>
        <ScrollProgress />
      </header>

      <MobileMenu open={menuOpen} activeSection={activeSection} onClose={closeMenu} />
    </>
  );
}
