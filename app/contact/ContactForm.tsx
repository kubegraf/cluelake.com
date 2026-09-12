"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { validate, type Errors } from "@/lib/contact/validate";

type State = "idle" | "sending" | "sent" | "failed";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [requestId, setRequestId] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());

    // Validated client-side for fast feedback AND server-side because the
    // client check is a convenience, not a control.
    const parsed = validate(raw);
    if (!parsed.ok) { setErrors(parsed.errors); setState("idle"); return; }

    setErrors({});
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...parsed.value, website: raw.website ?? "" }),
      });
      const data = (await res.json()) as { request_id?: string; details?: Errors };
      setRequestId(data.request_id ?? null);
      if (res.ok) { setState("sent"); return; }
      if (data.details) setErrors(data.details);
      setState("failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rounded-xl border border-[color:var(--color-line)] p-6">
        <h2 className="text-[16px] font-semibold">Message sent</h2>
        <p className="mt-2 text-[13.5px] text-[color:var(--color-fg-muted)]">
          Thanks — we read everything and will reply to the address you gave.
        </p>
        {requestId ? (
          <p className="mt-3 font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]">
            reference {requestId}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid max-w-[36rem] gap-4">
      <Field name="name" label="Name" error={errors.name} autoComplete="name" />
      <Field name="email" label="Work email" type="email" error={errors.email} autoComplete="email" />
      <Field name="company" label="Company" error={errors.company} autoComplete="organization" optional />
      <Field name="message" label="What do you need?" error={errors.message} textarea />

      {/* ⚠ The honeypot. Hidden from sight AND from assistive technology, and
          never autofilled — a real person cannot fill it in by accident. */}
      <div aria-hidden className="absolute left-[-9999px]" >
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "failed" ? (
        <p role="alert" className="rounded-lg border border-[color:var(--color-bad)] px-3 py-2.5 text-[13.5px] text-[color:var(--color-bad)]">
          Your message couldn&apos;t be sent. Please try again.
          {requestId ? <span className="ml-1 font-mono text-[11.5px]">({requestId})</span> : null}
        </p>
      ) : null}

      <div>
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  name, label, type = "text", error, textarea, optional, autoComplete,
}: {
  name: string; label: string; type?: string; error?: string;
  textarea?: boolean; optional?: boolean; autoComplete?: string;
}) {
  const id = `contact-${name}`;
  const describedBy = error ? `${id}-error` : undefined;
  const cls =
    "w-full rounded-lg border bg-[color:var(--color-surface)] px-3 py-2.5 text-[14px] text-[color:var(--color-fg)] placeholder:text-[color:var(--color-fg-subtle)] " +
    (error ? "border-[color:var(--color-bad)]" : "border-[color:var(--color-line)]");

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-[13.5px]">
        {label}
        {optional ? <span className="ml-1.5 text-[color:var(--color-fg-subtle)]">optional</span> : null}
      </label>
      {textarea ? (
        <textarea id={id} name={name} rows={5} aria-invalid={!!error} aria-describedby={describedBy} className={cls} />
      ) : (
        <input id={id} name={name} type={type} autoComplete={autoComplete} aria-invalid={!!error} aria-describedby={describedBy} className={cls} />
      )}
      {error ? (
        <p id={`${id}-error`} className="text-[12.5px] text-[color:var(--color-bad)]">{error}</p>
      ) : null}
    </div>
  );
}
