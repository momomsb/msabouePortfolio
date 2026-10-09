"use client";

import type { ComponentProps, PointerEvent } from "react";
import { cn } from "@/lib/utils";

/** Card with a soft cyan light that follows the pointer (pure CSS variables, no re-render). */
export function SpotlightCard({ className, onPointerMove, onPointerLeave, ...props }: ComponentProps<"div">) {
  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    el.style.setProperty("--spot-opacity", "1");
    onPointerMove?.(event);
  }

  function handleLeave(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--spot-opacity", "0");
    onPointerLeave?.(event);
  }

  return <div className={cn("spotlight", className)} onPointerMove={handleMove} onPointerLeave={handleLeave} {...props} />;
}
