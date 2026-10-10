"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SocialIcon } from "@/components/ui/brand-icons";
import { useI18n } from "@/i18n/locale-provider";
import { getAvailableSocials, socialLinkProps } from "@/lib/content";
import { cn, pad } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  activeSection: string | null;
  onClose: () => void;
}

const socials = getAvailableSocials();

export function MobileMenu({ open, activeSection, onClose }: MobileMenuProps) {
  const { locale, dict, content } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();

    const closeOnDesktop = () => window.innerWidth >= 1024 && onClose();
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open, onClose]);

  /** Escape closes; Tab is trapped inside the dialog. */
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = [...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={dict.nav.siteNavigation}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink/95 backdrop-blur-2xl lg:hidden"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-edges" />

          <div className="relative flex h-(--nav-height) shrink-0 items-center justify-between px-4 sm:px-6">
            <Logo onNavigate={onClose} />
            <button
              type="button"
              onClick={onClose}
              aria-label={dict.nav.closeMenu}
              className="grid size-10 place-items-center rounded-full border border-line-strong bg-raised/60 text-fg transition-colors hover:border-accent/50"
            >
              <X className="size-4.5" aria-hidden />
            </button>
          </div>

          <nav aria-label={dict.nav.mobile} className="relative flex-1 px-4 pt-6 pb-10 sm:px-6">
            <ul className="flex flex-col">
              {content.navigation.map((item, index) => {
                const active = activeSection === item.sectionId;
                return (
                  <motion.li
                    key={item.sectionId}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line/70"
                  >
                    <Link
                      href={`/${locale}#${item.sectionId}`}
                      onClick={onClose}
                      aria-current={active ? "location" : undefined}
                      className="group flex items-baseline gap-4 py-4"
                    >
                      {/* Same numbers as the section headers ("[03]"); Home is 00. */}
                      <span className="font-mono text-xs text-subtle">{pad(item.index ?? 0)}</span>
                      <span
                        className={cn(
                          "font-display text-3xl font-medium tracking-tight transition-colors sm:text-4xl",
                          active ? "text-accent" : "text-fg group-hover:text-accent",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-10 flex flex-col gap-6"
            >
              <Link
                href={`/${locale}#contact`}
                onClick={onClose}
                className="inline-flex items-center gap-2 self-start rounded-full bg-accent px-6 py-3 font-medium text-ink"
              >
                {dict.nav.letsTalk} <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              {socials.length > 0 && (
                <ul className="flex gap-3">
                  {socials.map((social) => (
                    <li key={social.platform}>
                      <a
                        href={social.href}
                        {...socialLinkProps(social.platform)}
                        aria-label={social.label}
                        className="grid size-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-accent/50 hover:text-fg"
                      >
                        <SocialIcon platform={social.platform} className="size-4.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {/* Own layout namespace: the header copies of these toggles share the same layoutIds. */}
              <LayoutGroup id="mobile-menu">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
              </LayoutGroup>
              <p className="label-mono text-subtle">
                {content.profile.role} · {content.profile.location}
              </p>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
