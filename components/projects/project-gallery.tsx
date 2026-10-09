"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useI18n } from "@/i18n/locale-provider";
import { cn, pad } from "@/lib/utils";
import type { Project } from "@/types";

type Shot = NonNullable<Project["gallery"]>[number];

/**
 * Screenshot grid with a fullscreen viewer (keyboard arrows, swipe, Escape).
 * The viewer is portaled to <body>: an ancestor with a transform (scroll reveal)
 * would otherwise become the containing block of `position: fixed`.
 */
export function ProjectGallery({ images }: { images: Shot[] }) {
  const { dict } = useI18n();
  const t = dict.caseStudy.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStart = useRef<number | null>(null);

  const close = useCallback(() => {
    setIndex((current) => {
      if (current !== null) requestAnimationFrame(() => triggerRefs.current[current]?.focus());
      return null;
    });
  }, []);
  const step = useCallback(
    (delta: number) => setIndex((current) => (current === null ? null : (current + delta + images.length) % images.length)),
    [images.length],
  );

  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") close();
    else if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
    else if (event.key === "Tab") {
      // Keep focus inside the viewer.
      const focusable = [...(event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>("button")];
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
  }

  function onPointerUp(event: PointerEvent) {
    if (swipeStart.current === null) return;
    const delta = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
  }

  const current = index !== null ? images[index] : null;

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {images.map((image, i) => (
          <li key={image.src} className={cn(i === 0 && "sm:col-span-2")}>
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${t.open}: ${image.alt}`}
              className="group block w-full overflow-hidden rounded-2xl border border-line bg-surface text-left transition-colors hover:border-accent/40"
            >
              <span className="relative block aspect-video overflow-hidden bg-ink">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                  className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full border border-line-strong bg-ink/80 text-fg opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-3.5" aria-hidden />
                </span>
              </span>
              <span className="flex items-baseline gap-3 px-4 py-3 text-sm text-muted">
                <span className="font-mono text-xs text-subtle">{pad(i + 1)}</span>
                {image.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {isOpen &&
        createPortal(
          <AnimatePresence>
            {current && index !== null && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={t.viewer}
                onKeyDown={handleKeyDown}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
                  <p className="min-w-0 truncate text-sm text-muted">
                    <span className="mr-3 font-mono text-xs text-subtle">
                      {pad(index + 1)} / {pad(images.length)}
                    </span>
                    {current.alt}
                  </p>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label={t.close}
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong bg-raised/60 text-fg transition-colors hover:border-accent/50"
                  >
                    <X className="size-4.5" aria-hidden />
                  </button>
                </div>

                <div
                  className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16"
                  onClick={(event) => event.target === event.currentTarget && close()}
                  onPointerDown={(event) => (swipeStart.current = event.clientX)}
                  onPointerUp={onPointerUp}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.src}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="relative max-h-full w-full max-w-6xl"
                    >
                      <Image
                        src={current.src}
                        alt={current.alt}
                        width={current.width}
                        height={current.height}
                        sizes="100vw"
                        className="max-h-[calc(100svh-7rem)] w-full rounded-xl border border-line object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => step(-1)}
                        aria-label={t.previous}
                        className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-raised/80 text-fg backdrop-blur transition-colors hover:border-accent/50 sm:left-4"
                      >
                        <ChevronLeft className="size-5" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => step(1)}
                        aria-label={t.next}
                        className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-raised/80 text-fg backdrop-blur transition-colors hover:border-accent/50 sm:right-4"
                      >
                        <ChevronRight className="size-5" aria-hidden />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
