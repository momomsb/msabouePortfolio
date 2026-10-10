"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRichMotion } from "@/hooks/use-rich-motion";
import { useI18n } from "@/i18n/locale-provider";

interface ScrollContextValue {
  /** Navigation section being read; null outside the home page. */
  active: string | null;
  /** Smooth-scrolls to an element id, updates the hash and moves focus there. */
  scrollToId: (id: string) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

/** A section becomes active once its top crosses this fraction of the viewport. */
const SPY_LINE = 0.35;
const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scroll engine shared by the navbar, the mobile menu and the section indicator:
 * - scroll spy (one rAF-throttled listener, state changes only when the section changes);
 * - Lenis smooth wheel on desktop; native scrolling elsewhere;
 * - same-page anchor links are intercepted and scrolled smoothly, so the
 *   active capsule glides straight to the target instead of visiting every section.
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
  const { locale, content } = useI18n();
  const pathname = usePathname();
  const isHome = pathname === `/${locale}`;
  const rich = useRichMotion();
  const ids = useMemo(() => content.navigation.map((item) => item.sectionId), [content]);

  const [active, setActive] = useState<string | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  /** Section being scrolled to after a click; freezes the spy until the scroll settles. */
  const targetRef = useRef<string | null>(null);

  useEffect(() => {
    if (!rich) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      // Dialogs (mobile menu, screenshot viewer) keep their own native scrolling.
      prevent: (node) => Boolean(node.closest('[role="dialog"], [data-lenis-prevent]')),
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [rich]);

  useEffect(() => {
    if (!isHome) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (targetRef.current) return;
      const line = window.innerHeight * SPY_LINE;
      let current = ids[0];
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = id;
      }
      // The last section may be too short to ever reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = ids.at(-1) ?? current;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [isHome, ids]);

  const scrollToId = useCallback(
    (id: string) => {
      const toTop = id === "top" || id === ids[0];
      const element = toTop ? null : document.getElementById(id);
      if (!toTop && !element) return;

      const release = () => {
        targetRef.current = null;
        window.dispatchEvent(new Event("scroll"));
      };
      if (ids.includes(id)) {
        targetRef.current = id;
        setActive(id);
      }

      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const y = element ? element.getBoundingClientRect().top + window.scrollY - padding : 0;
      const lenis = lenisRef.current;

      if (lenis) {
        lenis.scrollTo(y, { duration: 1.2, easing: easeOutQuart, onComplete: release });
      } else {
        window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "instant" : "smooth" });
        // `scrollend` never fires when already at the target: the timeout covers it.
        let timeout = 0;
        const done = () => {
          window.clearTimeout(timeout);
          window.removeEventListener("scrollend", done);
          release();
        };
        timeout = window.setTimeout(done, 1500);
        window.addEventListener("scrollend", done);
      }

      history.replaceState(history.state, "", toTop ? window.location.pathname : `#${id}`);
      // Keyboard users continue from the section they jumped to (like a native anchor).
      const focusTarget = element ?? document.getElementById(ids[0]);
      if (focusTarget) {
        if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");
        focusTarget.focus({ preventScroll: true });
      }
    },
    [ids],
  );

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!document.getElementById(id)) return;
      // Next's <Link> skips navigation when the click is already prevented.
      event.preventDefault();
      // Wait a frame so an overlay closing on this click (mobile menu) releases the page first.
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [scrollToId]);

  const value = useMemo(() => ({ active: isHome ? active : null, scrollToId }), [isHome, active, scrollToId]);
  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

export function useScrollSections() {
  const value = useContext(ScrollContext);
  if (!value) throw new Error("useScrollSections must be used inside <ScrollProvider>");
  return value;
}
