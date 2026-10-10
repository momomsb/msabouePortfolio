"use client";

import { useState } from "react";
import { Images } from "lucide-react";
import { ScreenshotViewer, type Screenshot } from "@/components/projects/screenshot-viewer";
import { useI18n } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

/** "View photos (n)" button that opens the fullscreen screenshot viewer. */
export function ScreenshotsButton({ images, title, className }: { images: Screenshot[]; title: string; className?: string }) {
  const { dict } = useI18n();
  const [open, setOpen] = useState(false);
  if (images.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-strong",
          className,
        )}
      >
        <Images className="size-4" aria-hidden />
        {dict.projects.viewPhotos(images.length)}
      </button>
      {open && <ScreenshotViewer images={images} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}
