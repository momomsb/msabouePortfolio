"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { MagneticButton } from "@/components/transitions/magnetic-button";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries";
import { useI18n } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { CONTACT_LIMITS, validateContact, type ContactField } from "@/lib/validation";
import type { ContactResponse } from "@/types/api";

type StatusKey = keyof Dictionary["contact"]["status"];
/** Messages are stored as keys so they follow the current language. */
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done"; tone: "success" | "info" | "error"; message: StatusKey };

const FIELDS: ContactField[] = ["name", "email", "message"];
const isField = (value: string): value is ContactField => FIELDS.includes(value as ContactField);

const fieldClass =
  "w-full rounded-xl border bg-ink/60 px-4 text-[0.9375rem] text-fg placeholder:text-subtle transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/15 focus:outline-none";

export function ContactForm() {
  const { dict } = useI18n();
  const t = dict.contact;
  const [invalid, setInvalid] = useState<ContactField[]>([]);
  const errors: Partial<Record<ContactField, string>> = Object.fromEntries(invalid.map((field) => [field, t.errors[field]]));
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
      const fields = local.errors.filter(isField);
      setInvalid(fields);
      form.querySelector<HTMLElement>(`[name="${fields[0]}"]`)?.focus();
      return;
    }

    setInvalid([]);
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
        setStatus({ kind: "done", tone: "success", message: "sent" });
      } else {
        if (data.errors) setInvalid(data.errors.filter(isField));
        setStatus({ kind: "done", tone: data.status === "not_configured" ? "info" : "error", message: data.status });
      }
    } catch {
      setStatus({ kind: "done", tone: "error", message: "network" });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 panel p-6 sm:p-8" aria-describedby="contact-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t.name} error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={CONTACT_LIMITS.name.max}
            placeholder={t.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(fieldClass, "h-12", errors.name ? "border-danger/60" : "border-line")}
          />
        </Field>
        <Field id="email" label={t.email} error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={CONTACT_LIMITS.email.max}
            placeholder={t.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldClass, "h-12", errors.email ? "border-danger/60" : "border-line")}
          />
        </Field>
      </div>

      <Field id="message" label={t.message} error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={CONTACT_LIMITS.message.max}
          placeholder={t.messagePlaceholder}
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
        <MagneticButton>
          <Button type="submit" size="lg" disabled={sending} className="sm:min-w-44">
            {sending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden /> {t.sending}
              </>
            ) : (
              <>
                {t.send} <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden />
              </>
            )}
          </Button>
        </MagneticButton>

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
                {t.status[status.message]}
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
