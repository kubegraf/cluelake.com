"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * A code block with a copy button.
 *
 * ⚠ THE BUTTON REPORTS SUCCESS AND FAILURE. `navigator.clipboard` rejects on an
 * insecure origin and in some embedded browsers; a button that always shows a
 * tick has lied to somebody who then pastes the wrong thing.
 */
export function CodeBlock({ code, label, className }: { code: string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2000);
  }

  const name = label ?? "shell";

  return (
    <div className={cn("overflow-hidden rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)]", className)}>
      <div className="flex items-center gap-2 border-b border-[color:var(--color-line)] px-3 py-2">
        <span className="font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]">{name}</span>
        {/* ⚠ THE BUTTON IS NAMED AFTER ITS BLOCK, AND THE STATUS LIVES OUTSIDE
            IT. Two separate problems used to sit on this one element.
            First, the visible caption above was decorative text linked to
            nothing, so every copy button on the page was called just "copy" —
            /get-started has three, and listing buttons there read "copy, copy,
            copy" with no way to tell which block was which. `aria-label` folds
            the caption into the name.
            Second, the `aria-live` span was INSIDE the button, so it was both
            the live region and the button's accessible name: flipping to
            "copied" renamed the control while it still had focus, which some
            screen readers re-announce as a different button. The status is now
            a sibling region the button does not own, so the name is stable and
            the result is still spoken. The visible text is unchanged and stays
            `aria-hidden` — it would otherwise duplicate the label. */}
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${name}`}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-[color:var(--color-fg-subtle)] hover:text-[color:var(--color-fg)]"
        >
          {state === "copied" ? <Check aria-hidden className="size-3" /> : <Copy aria-hidden className="size-3" />}
          <span aria-hidden>
            {state === "copied" ? "copied" : state === "failed" ? "copy failed" : "copy"}
          </span>
        </button>
        <span role="status" aria-live="polite" className="sr-only">
          {state === "copied" ? `${name} copied` : state === "failed" ? `Copying ${name} failed` : ""}
        </span>
      </div>
      <pre className="m-0 overflow-x-auto p-3.5 font-mono text-[12.5px] leading-relaxed text-[color:var(--color-fg-muted)]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
