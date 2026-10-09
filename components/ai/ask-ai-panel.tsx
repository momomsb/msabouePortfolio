"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, X } from "lucide-react";
import { MessageContent } from "@/components/ai/message-content";
import type { ChatMessage } from "@/components/ai/types";
import { useI18n } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { CHAT_LIMITS } from "@/lib/validation";
import type { ApiError, ChatResponse } from "@/types/api";

interface AskAiPanelProps {
  messages: ChatMessage[];
  onMessagesChange: (updater: (messages: ChatMessage[]) => ChatMessage[]) => void;
  onClose: () => void;
}

const newId = () => crypto.randomUUID();

export default function AskAiPanel({ messages, onMessagesChange, onClose }: AskAiPanelProps) {
  const { locale, dict, content } = useI18n();
  const t = dict.ai;
  const name = content.profile.firstName;
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDemo = messages.some((message) => message.mode === "demo");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Align the newest message with the top of the viewport so long answers read from their start.
  useEffect(() => {
    const container = scrollRef.current;
    const last = [...(container?.querySelectorAll<HTMLElement>("[data-message]") ?? [])].at(-1);
    if (!container) return;
    const top = pending || !last ? container.scrollHeight : last.offsetTop - 16;
    container.scrollTo({ top, behavior: "smooth" });
  }, [messages, pending]);

  async function ask(question: string) {
    const content = question.trim().slice(0, CHAT_LIMITS.maxChars);
    if (!content || pending) return;

    const userMessage: ChatMessage = { id: newId(), role: "user", content };
    const history = [...messages.filter((message) => !message.error), userMessage];
    onMessagesChange((current) => [...current, userMessage]);
    setInput("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: history.map(({ role, content }) => ({ role, content })) }),
      });
      const data = (await res.json()) as ChatResponse | ApiError;
      if (!res.ok || "error" in data) throw new Error("error" in data ? t.errors[data.error] : t.networkError);
      onMessagesChange((current) => [...current, { id: newId(), role: "assistant", content: data.reply, mode: data.mode }]);
    } catch (error) {
      const message = error instanceof Error && error.message !== "Failed to fetch" ? error.message : t.networkError;
      onMessagesChange((current) => [...current, { id: newId(), role: "assistant", content: message, error: true }]);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void ask(input);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
    }
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="false"
      aria-labelledby="ask-ai-title"
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(640px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface/95 shadow-[0_24px_80px_-12px_rgb(0_0_0/0.8)] backdrop-blur-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[400px]"
    >
      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <h2 id="ask-ai-title" className="flex items-center gap-2 font-display text-[0.9375rem] font-medium text-fg">
            <span aria-hidden className="text-accent">
              ✦
            </span>
            {t.title}
          </h2>
          <p className="mt-0.5 font-mono text-[0.625rem] tracking-wider text-subtle uppercase">{isDemo ? t.demoMode : t.aiMode}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg"
        >
          <X className="size-4" aria-hidden />
        </button>
      </header>

      <div ref={scrollRef} className="relative flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm leading-relaxed" aria-live="polite">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-muted">{t.intro(name)}</p>
            <ul className="flex flex-col gap-2" aria-label={t.suggestionsLabel}>
              {t.suggestions(name).map((question) => (
                <li key={question}>
                  <button
                    type="button"
                    onClick={() => void ask(question)}
                    className="w-full rounded-xl border border-line bg-raised/60 px-3 py-2 text-left text-[0.8125rem] text-muted transition-colors hover:border-accent/40 hover:text-fg"
                  >
                    {question}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} data-message className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[88%] rounded-2xl px-3.5 py-2.5",
                message.role === "user" && "rounded-br-md bg-accent text-ink",
                message.role === "assistant" && !message.error && "rounded-bl-md border border-line bg-raised text-muted",
                message.error && "rounded-bl-md border border-danger/40 bg-danger/10 text-danger",
              )}
            >
              {message.role === "user" ? message.content : <MessageContent text={message.content} locale={locale} />}
            </div>
          </div>
        ))}

        {pending && (
          <div className="flex justify-start" role="status" aria-label={t.thinking}>
            <div className="flex gap-1 rounded-2xl rounded-bl-md border border-line bg-raised px-4 py-3.5">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="size-1.5 rounded-full bg-accent"
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: dot * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-line p-3">
        <label htmlFor="ask-ai-input" className="sr-only">
          {t.inputLabel}
        </label>
        <input
          ref={inputRef}
          id="ask-ai-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={CHAT_LIMITS.maxChars}
          placeholder={t.placeholder(name)}
          autoComplete="off"
          className="h-10 flex-1 rounded-full border border-line bg-ink/60 px-4 text-sm text-fg placeholder:text-subtle focus:border-accent/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending || !input.trim()}
          aria-label={t.send}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-ink transition-opacity disabled:opacity-40"
        >
          <ArrowUp className="size-4" aria-hidden />
        </button>
      </form>
    </motion.div>
  );
}
