"use client";

import { useState } from "react";
import { Frame } from "./Frame";
import { spans, scenario } from "@/lib/demo/data";
import { cn } from "@/lib/utils/cn";

/**
 * A trace waterfall.
 *
 * ⚠ SELECTING A SPAN IS THE POINT. A waterfall you cannot interrogate is a
 * picture of a waterfall — the question an engineer has is "what was this span
 * doing", and the answer lives in its detail panel.
 */
export function TraceWaterfall({ className }: { className?: string }) {
  const [selected, setSelected] = useState<string>("s5");
  const active = spans.find((s) => s.id === selected) ?? spans[0]!;

  return (
    <Frame
      className={className}
      title={`trace 7f8c21ab`}
      meta={`${scenario.service} · ${(spans[0]!.ms / 1000).toFixed(2)}s`}
      bodyClassName="p-0"
    >
      <ul className="m-0 list-none p-0" role="tree" aria-label="Trace spans">
        {spans.map((s) => {
          const isActive = s.id === selected;
          return (
            <li key={s.id} role="treeitem" aria-selected={isActive} aria-level={s.depth + 1}>
              <button
                type="button"
                onClick={() => setSelected(s.id)}
                className={cn(
                  "flex w-full items-center gap-2 border-b border-[color:var(--color-line)] px-3 py-2.5 text-left transition-colors sm:gap-3 sm:py-2",
                  isActive ? "bg-[color:var(--color-accent-wash)]" : "hover:bg-[color:var(--color-surface-2)]",
                )}
              >
                {/* ⚠ THE NAME COLUMN IS NARROWER ON A PHONE, NOT THE BAR. A fixed
                    190px name column plus a service column left no room for the
                    waterfall itself below ~400px — the bars were pushed out of
                    the frame entirely, which is a trace view with no trace in it.
                    The bar is the content; the labels give way to it. */}
                <span
                  className="w-[8.25rem] shrink-0 truncate font-mono text-[12px] text-[color:var(--color-fg)] sm:w-[190px]"
                  style={{ paddingLeft: s.depth * 14 }}
                >
                  {s.name}
                </span>
                {/* Hidden on a phone rather than squeezed: the selected span's
                    service is spelled out in the detail panel below. */}
                <span className="hidden w-16 shrink-0 font-mono text-[11px] text-[color:var(--color-info)] sm:inline">
                  {s.service}
                </span>

                <span className="relative h-3.5 min-w-0 flex-1 rounded bg-[color:var(--color-ink)]">
                  <span
                    className={cn(
                      "absolute inset-y-0 rounded",
                      s.error ? "bg-[color:var(--color-bad)]" : "bg-[color:var(--color-accent)]",
                    )}
                    style={{ left: `${s.startPct}%`, width: `${Math.max(s.widthPct, 1)}%`, opacity: isActive ? 1 : 0.65 }}
                  />
                </span>

                <span className="w-[3.25rem] shrink-0 text-right font-mono text-[11.5px] text-[color:var(--color-fg-muted)] sm:w-14">
                  {s.ms.toLocaleString()}ms
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite" className="grid gap-1.5 p-3 sm:grid-cols-2">
        <Detail label="span" value={active.name} />
        <Detail label="service" value={active.service} />
        <Detail label="duration" value={`${active.ms.toLocaleString()}ms`} />
        <Detail label="status" value={active.error ? "error" : "ok"} tone={active.error ? "bad" : "ok"} />
        <Detail label="deployment" value={scenario.deployment} />
        <Detail label="image" value={scenario.imageAfter} />
      </div>
    </Frame>
  );
}

function Detail({ label, value, tone }: { label: string; value: string; tone?: "ok" | "bad" }) {
  return (
    <div className="flex gap-2 font-mono text-[11.5px]">
      <span className="w-20 shrink-0 text-[color:var(--color-fg-subtle)]">{label}</span>
      <span
        className={cn(
          "min-w-0 truncate",
          tone === "bad" ? "text-[color:var(--color-bad)]"
            : tone === "ok" ? "text-[color:var(--color-ok)]"
            : "text-[color:var(--color-fg)]",
        )}
      >
        {value}
      </span>
    </div>
  );
}
