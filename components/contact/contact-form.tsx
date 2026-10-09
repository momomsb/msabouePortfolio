"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT_LIMITS, validateContact } from "@/lib/validation";
import type { ContactResponse } from "@/types/api";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done"; tone: "success" | "info" | "error"; message: string };

const fieldClass =
  "w-full rounded-xl border bg-ink/60 px-4 text-[0.9375rem] text-fg placeholder:text-subtle transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/15 focus:outline-none";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const resetOnHide = useRef(false);

  // Navigating away keeps this page alive (Activity); clear a stale confirmation when hidden.
  useLayoutEffect(() => {
    return () => {
      if (resetOnHide.current) {
        resetOnHide.current = false;
        setStatus({ kind: "idle" });
      }
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    const local = validateContact(payload);
    if (!local.ok) {
      setErrors(local.errors);
      form.querySelector<HTMLElement>(`[name="${Object.keys(local.errors)[0]}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as ContactResponse;
      if (data.status === "sent") {
        form.reset();
        resetOnHide.current = true;
        setStatus({ kind: "done", tone: "success", message: data.message });
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus({ kind: "done", tone: data.status === "not_configured" ? "info" : "error", message: data.message });
      }
    } catch {
      setStatus({ kind: "done", tone: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 panel p-6 sm:p-8" aria-describedby="contact-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={CONTACT_LIMITS.name.max}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(fieldClass, "h-12", errors.name ? "border-danger/60" : "border-line")}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={CONTACT_LIMITS.email.max}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldClass, "h-12", errors.email ? "border-danger/60" : "border-line")}
          />
        </Field>
      </div>

      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={CONTACT_LIMITS.message.max}
          placeholder="Tell me about the opportunity, the project or the problem to solve…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(fieldClass, "resize-y py-3", errors.message ? "border-danger/60" : "border-line")}
        />
      </Field>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={sending} className="sm:min-w-44">
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden />
            </>
          )}
        </Button>

        <div id="contact-status" role="status" aria-live="polite" className="min-h-6 text-sm">
          <AnimatePresence mode="wait">
            {status.kind === "done" && (
              <motion.p
                key={status.message}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "flex items-center gap-2",
                  status.tone === "success" && "text-success",
                  status.tone === "info" && "text-muted",
                  status.tone === "error" && "text-danger",
                )}
              >
                {status.tone === "success" && <CheckCircle2 className="size-4 shrink-0" aria-hidden />}
                {status.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block label-mono text-subtle">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
