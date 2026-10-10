"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

/**
 * Experience → Projects: the timeline's last point, linking the internship to
 * the project it led to ("Led to · AI Stock Analyst"). Same column grid as
 * ExperienceCard so the node sits on the rail.
 */
export function TimelineHandoff({ label, project, href }: { label: string; project: string; href: string }) {
  return (
    <div className="relative grid pb-2 pl-10 md:grid-cols-4 md:gap-10 md:pl-0">
      <span aria-hidden className="absolute top-0.5 left-0 grid size-[15px] place-items-center md:left-[25%]">
        <motion.span
          className="absolute size-[15px] rounded-full border border-accent/60"
          initial={{ scale: 0.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <span className="size-[7px] rounded-full bg-accent shadow-[0_0_12px_2px_rgb(45_226_255/0.6)]" />
      </span>
      <a
        href={href}
        className="group inline-flex items-center gap-3 self-start font-mono text-xs tracking-wider text-subtle uppercase transition-colors hover:text-accent md:col-span-3 md:col-start-2 md:ml-10"
      >
        <span>{label}</span>
        <span aria-hidden className="h-px w-6 bg-accent/60 transition-[width] duration-300 group-hover:w-10" />
        <span className="text-fg normal-case transition-colors group-hover:text-accent">{project}</span>
        <ArrowDown className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
      </a>
    </div>
  );
}
