"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown, Download, FileText } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

export interface CvFile {
  language: Locale;
  path: string;
}

/** "Download CV" button that opens a small menu to pick the French or English CV. */
export function CvMenu({ files }: { files: CvFile[] }) {
  const { locale, dict } = useI18n();
  const t = dict.hero;
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  // The page's language first.
  const ordered = [...files].sort((a, b) => Number(b.language === locale) - Number(a.language === locale));

  useEffect(() => {
    if (!open) return;
    itemRefs.current[0]?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onMenuKeyDown(event: KeyboardEvent) {
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      items[(current + delta + items.length) % items.length]?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  }

  if (files.length === 0) return null;

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={buttonStyles({ variant: "secondary", size: "lg" })}
      >
        <Download className="size-4" aria-hidden />
        {t.downloadCv}
        <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={t.cvMenuLabel}
            onKeyDown={onMenuKeyDown}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 z-30 mt-2 w-64 origin-top-left overflow-hidden rounded-2xl border border-line-strong bg-surface p-1.5 shadow-[0_20px_50px_-15px_rgb(0_0_0/0.6)]"
          >
            <p className="px-3 pt-2 pb-1.5 label-mono text-subtle">{t.cvMenuLabel}</p>
            {ordered.map((file, index) => (
              <a
                key={file.language}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                role="menuitem"
                href={file.path}
                download
                hrefLang={file.language}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-fg transition-colors hover:bg-raised focus-visible:bg-raised"
              >
                <span className="grid size-8 place-items-center rounded-lg border border-line-strong bg-raised font-mono text-[0.6875rem] font-semibold text-accent uppercase">
                  {file.language}
                </span>
                <span className="flex-1">{file.language === "fr" ? t.cvFrench : t.cvEnglish}</span>
                <FileText className="size-4 text-subtle transition-colors group-hover:text-accent" aria-hidden />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
