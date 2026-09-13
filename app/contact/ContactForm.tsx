"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { validate, type Errors } from "@/lib/contact/validate";

type State = "idle" | "sending" | "sent" | "failed";

/** Visual order of the fields, which is the order a person meets them. The
 *  first invalid one in THIS order is the one to send them back to. */
const FIELD_ORDER = ["name", "email", "company", "message"] as const;

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [requestId, setRequestId] = useState<string | null>(null);

  /**
   * ⚠ REJECTING A SUBMISSION MUST MOVE FOCUS, OR NOBODY IS TOLD.
   *
   * The per-field <p> is rendered under the input, and focus stays on the
   * submit button. A screen-reader user presses "Send message" and hears
   * nothing at all: the error text is somewhere else on the page, and
   * aria-describedby only speaks when the field it describes is focused —
   * which is exactly the thing nothing has asked them to do.
   *
   * So the first invalid control is focused. That reads the label, the
   * invalid state and the error text in one go, and it leaves the caret where
   * the work is. This is stored as an object rather than a field name because
   * two rejected submits in a row can name the SAME field, and a bare string
   * would not change identity, so the effect would not re-run and the second
   * attempt would be silent — the original bug, one submit later.
   */
  const [focusTarget, setFocusTarget] = useState<{ id: string } | null>(null);

  useEffect(() => {
    if (!focusTarget) return;
    document.getElementById(focusTarget.id)?.focus();
  }, [focusTarget]);

  function reportErrors(next: Errors) {
    setErrors(next);
    const first = FIELD_ORDER.find((f) => next[f]);
    // No focusable target when the only error is `form` (the honeypot
    // refusal), which belongs to no input. Leave focus alone rather than
    // throwing the user somewhere arbitrary.
    if (first) setFocusTarget({ id: `contact-${first}` });
  }

  /**
   * ⚠ THE SUCCESS HEADING TAKES FOCUS, AND THERE IS NO LIVE REGION.
   *
   * Success replaces the whole <form>, so the submit button that had focus
   * stops existing and focus falls to <body> — the user is at the top of the
   * document with no idea anything happened. Focus has to be moved regardless.
   *
   * A role="status" that is INSERTED already holding its text is announced
   * unreliably (NVDA and VoiceOver commonly miss it: a live region is meant to
   * be present first and change afterwards). Moving focus to the heading both
   * announces it and puts the user somewhere sensible, so it does the job the
   * live region was failing to do. The two are NOT combined on purpose — when
   * the live region does fire, the message is read twice.
   *
   * The failure path a few lines down keeps its role="alert" because that one
   * is announced reliably on insertion, and because the form is still there,
   * so focus has nowhere it needs to go.
   */
  const sentHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state === "sent") sentHeadingRef.current?.focus();
  }, [state]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());

    // Validated client-side for fast feedback AND server-side because the
    // client check is a convenience, not a control.
    const parsed = validate(raw);
    if (!parsed.ok) { reportErrors(parsed.errors); setState("idle"); return; }

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
      if (data.details) reportErrors(data.details);
      setState("failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-xl border border-[color:var(--color-line)] p-6">
        <h2 ref={sentHeadingRef} tabIndex={-1} className="text-[16px] font-semibold">
          Message sent
        </h2>
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
        // ⚠ role="alert" MATTERS HERE. This <p> is inserted, not updated, and an
        // inserted alert is the one live-region shape every screen reader
        // announces. Without it the text is on screen for sighted users and
        // silent for everyone else.
        <p role="alert" id={`${id}-error`} className="text-[12.5px] text-[color:var(--color-bad)]">{error}</p>
      ) : null}
    </div>
  );
}
