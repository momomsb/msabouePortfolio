import { Fragment, type ReactNode } from "react";

/**
 * Renders the small subset of formatting the assistant is allowed to use:
 * paragraphs, "•"/"-" bullets, **bold**, and http(s) links.
 * No HTML is ever injected.
 */

const INLINE = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g;

function renderInline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-fg">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkClass = "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {part.replace(/^https?:\/\//, "")}
        </a>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function MessageContent({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className="space-y-2.5">
      {blocks.map((block, index) => {
        const lines = block.split("\n").filter(Boolean);
        const isList = lines.length > 0 && lines.every((line) => /^\s*[•\-*]\s+/.test(line));
        if (isList) {
          return (
            <ul key={index} className="space-y-1">
              {lines.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden className="text-accent">
                    ›
                  </span>
                  <span>{renderInline(line.replace(/^\s*[•\-*]\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index}>
            {lines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {renderInline(line)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
