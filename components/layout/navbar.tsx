"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useI18n } from "@/i18n/locale-provider";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { locale, dict, content } = useI18n();
  const pathname = usePathname();
  const isHome = pathname === `/${locale}`;
  const activeSection = useActiveSection(
    content.navigation.map((item) => item.sectionId),
    isHome,
  );
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled ? "border-b border-line/80 bg-ink/75 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <nav
          aria-label={dict.nav.main}
          className="mx-auto flex h-(--nav-height) max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          <Logo />

          <ul className="hidden items-center gap-0.5 lg:flex">
            {content.navigation.map((item) => {
              const active = activeSection === item.sectionId;
              return (
                <li key={item.sectionId}>
                  <Link
                    href={`/${locale}#${item.sectionId}`}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-2.5 py-2 text-[0.8125rem] whitespace-nowrap transition-colors duration-200 xl:px-3",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 z-0 rounded-full border border-line-strong bg-raised"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
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
        <motion.div aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent/70" />
      </header>

      <MobileMenu open={menuOpen} activeSection={activeSection} onClose={closeMenu} />
    </>
  );
}
