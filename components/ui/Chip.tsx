import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** A technical metadata chip: a field name and its value, monospaced. */
export function Chip({ label, value, tone = "default" }: {
  label?: string; value: ReactNode; tone?: "default" | "accent" | "ok" | "warn" | "bad";
}) {
  const toneCls = {
    default: "text-[color:var(--color-fg-muted)]",
    accent: "text-[color:var(--color-accent)]",
    ok: "text-[color:var(--color-ok)]",
    warn: "text-[color:var(--color-warn)]",
    bad: "text-[color:var(--color-bad)]",
  }[tone];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-2 py-1 font-mono text-[11.5px]">
      {label ? <span className="text-[color:var(--color-fg-subtle)]">{label}</span> : null}
      <span className={cn(toneCls)}>{value}</span>
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)]", className)}>
      {children}
    </div>
  );
}
