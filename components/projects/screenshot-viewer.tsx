"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useI18n } from "@/i18n/locale-provider";
import { pad } from "@/lib/utils";
import type { Project } from "@/types";

export type Screenshot = NonNullable<Project["gallery"]>[number];

interface ScreenshotViewerProps {
  images: Screenshot[];
  title: string;
  startIndex?: number;
  onClose: () => void;
}

/**
 * Fullscreen screenshot viewer (arrows, swipe, Escape), portaled to <body> so
 * no transformed ancestor (scroll reveal) can trap `position: fixed`.
 * Render it only while open.
 */
export function ScreenshotViewer({ images, title, startIndex = 0, onClose }: ScreenshotViewerProps) {
  const { dict } = useI18n();
  const t = dict.projects.viewer;
  const [index, setIndex] = useState(startIndex);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStart = useRef<number | null>(null);
  const current = images[index];

  const step = (delta: number) => setIndex((value) => (value + delta + images.length) % images.length);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") onClose();
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

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title}: ${t.label}`}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="min-w-0 truncate text-sm text-muted">
          <span className="mr-3 font-mono text-xs text-subtle">
            {pad(index + 1)} / {pad(images.length)}
          </span>
          <span className="text-fg">{title}</span> · {current.alt}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong bg-raised/60 text-fg transition-colors hover:border-accent/50"
        >
          <X className="size-4.5" aria-hidden />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16"
        onClick={(event) => event.target === event.currentTarget && onClose()}
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
            className="relative w-full max-w-6xl"
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="(min-width: 1280px) 1152px, 100vw"
              loading="eager"
              style={{ maxWidth: Math.min(current.width, 1152) }}
              className="mx-auto h-auto max-h-[calc(100svh-9rem)] w-full rounded-xl border border-line object-contain"
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

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 overflow-x-auto px-4 pb-4">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${pad(i + 1)} · ${image.alt}`}
              aria-current={i === index}
              className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-md border transition-[border-color,opacity] ${
                i === index ? "border-accent opacity-100" : "border-line opacity-50 hover:opacity-90"
              }`}
            >
              <Image src={image.src} alt="" fill sizes="80px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body,
  );
}
