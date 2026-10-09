"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import type { ChatMessage } from "@/components/ai/types";

const loadPanel = () => import("@/components/ai/ask-ai-panel");
// The panel (and its logic) is only downloaded when the visitor shows intent.
const AskAiPanel = dynamic(loadPanel, { ssr: false });

export function AskAiLauncher() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }, []);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen(true)}
            onPointerEnter={loadPanel}
            onFocus={loadPanel}
            aria-haspopup="dialog"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.5 } }}
            exit={{ opacity: 0, y: 16, transition: { duration: 0.15 } }}
            className="group fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border border-line-strong bg-raised/85 px-4 py-2.5 text-sm text-fg shadow-[0_8px_30px_-6px_rgb(0_0_0/0.6)] backdrop-blur-xl transition-colors hover:border-accent/50 sm:right-6 sm:bottom-6"
          >
            <span aria-hidden className="text-accent transition-transform duration-500 group-hover:rotate-180">
              ✦
            </span>
            Ask my AI
          </motion.button>
        )}
      </AnimatePresence>
      {open && <AskAiPanel messages={messages} onMessagesChange={setMessages} onClose={close} />}
    </>
  );
}
