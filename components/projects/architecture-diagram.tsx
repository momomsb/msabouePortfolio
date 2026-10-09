import { Fragment } from "react";
import { cn, pad } from "@/lib/utils";
import type { ArchitectureLayer } from "@/types";

/**
 * Layered system diagram rendered in HTML/CSS (crisp at any size, readable by
 * screen readers as an ordered list). Horizontal on desktop, vertical on mobile.
 */
export function ArchitectureDiagram({ layers, label, caption }: { layers: ArchitectureLayer[]; label: string; caption: string }) {
  return (
    <figure className="relative overflow-hidden panel p-4 sm:p-6">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
      <ol aria-label={label} className="relative flex flex-col items-stretch lg:flex-row">
        {layers.map((layer, index) => (
          <Fragment key={layer.title}>
            {index > 0 && <Connector />}
            <li className="flex-1">
              <p className="mb-3 flex items-center gap-2 label-mono text-subtle">
                <span className="text-accent">{pad(index + 1)}</span> {layer.title}
              </p>
              <ul className="space-y-2">
                {layer.nodes.map((node, nodeIndex) => (
                  <li
                    key={node.label}
                    className={cn(
                      "rounded-xl border bg-raised/90 px-4 py-3 backdrop-blur",
                      nodeIndex === 0 ? "border-accent/40 shadow-[0_0_24px_-12px_rgb(45_226_255/0.6)]" : "border-line-strong",
                    )}
                  >
                    <p className="font-mono text-sm text-fg">{node.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{node.detail}</p>
                  </li>
                ))}
              </ul>
            </li>
          </Fragment>
        ))}
      </ol>
      <figcaption className="relative mt-5 border-t border-line pt-4 font-mono text-[0.6875rem] text-subtle">{caption}</figcaption>
    </figure>
  );
}

function Connector() {
  return (
    <li aria-hidden className="flex shrink-0 items-center justify-center py-2 lg:w-10 lg:py-0">
      <span className="block h-8 w-px flow-line lg:hidden" />
      <span className="hidden h-px w-full flow-line-x lg:block" />
    </li>
  );
}
