"use client";

import { useState } from "react";
import { Frame } from "./Frame";
import { cn } from "@/lib/utils/cn";

/**
 * The query surface.
 *
 * ⚠ THE COST ESTIMATE IS THE FEATURE. Showing bytes BEFORE a query runs is what
 * makes query spend predictable, and it is the honest version of "cheap
 * queries": the platform does not promise a query is cheap, it tells you what
 * this one will read and lets you narrow it.
 *
 * The estimates below are illustrative values attached to these example
 * queries, not a benchmark of anything.
 */

const TABS = [
  {
    id: "promql",
    label: "PromQL",
    code: `histogram_quantile(
  0.99,
  sum by (le, app) (
    rate(http_request_duration_seconds_bucket{
      app="checkout", env="production"
    }[5m])
  )
)`,
    bytes: "1.8 GB",
  },
  {
    id: "logs",
    label: "Logs",
    code: `app="checkout" AND severity="ERROR"
  AND message ~ "payments timeout"
  | pattern
  | sort count desc`,
    bytes: "420 MB",
  },
  {
    id: "traces",
    label: "Traces",
    code: `service="checkout"
  AND duration > 5s
  AND status="error"
  | group by downstream_service`,
    bytes: "96 MB",
  },
  {
    id: "sql",
    label: "SQL",
    code: `SELECT app,
       countIf(severity = 'ERROR') AS errors,
       count()                     AS total
FROM events
WHERE ts >= now() - INTERVAL 15 MINUTE
GROUP BY app
ORDER BY errors DESC`,
    bytes: "2.4 GB",
  },
] as const;

export function QueryEditor({ className }: { className?: string }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("promql");
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <Frame className={className} title="Query" meta="read-only" bodyClassName="p-0">
      {/* ⚠ THESE ARE TOGGLE BUTTONS, NOT ARIA TABS, AND DELIBERATELY SO. They
          were declared `role="tablist"` / `role="tab"` / `aria-selected`, which
          promises the whole tabs contract: a `role="tabpanel"` the tab owns via
          `aria-controls`, Left/Right arrow movement between tabs, and a roving
          tabIndex so the group is one tab stop. None of that existed, so a
          screen-reader user heard "PromQL, tab, selected, 1 of 4", pressed
          Right expecting to move, and nothing happened — a worse experience
          than no role at all, because the role is what created the
          expectation. `aria-pressed` describes exactly what these do and
          promises nothing else. Same pattern as ServiceMap and
          WhatChangedPanel. If a real tabpanel with keyboard handling ever
          lands here, restore the tabs roles WITH the interactions. */}
      <div role="group" aria-label="Query language" className="flex flex-wrap gap-1 border-b border-[color:var(--color-line)] p-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "inline-flex min-h-8 items-center rounded-md px-2.5 py-1 font-mono text-[11.5px] transition-colors",
              tab === t.id
                ? "bg-[color:var(--color-surface-2)] text-[color:var(--color-fg)]"
                : "text-[color:var(--color-fg-subtle)] hover:text-[color:var(--color-fg)]",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <pre className="m-0 overflow-x-auto p-3.5 font-mono text-[12.5px] leading-relaxed text-[color:var(--color-fg-muted)]">
        <code>{active.code}</code>
      </pre>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-[color:var(--color-line)] px-3.5 py-2.5">
        <span className="font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]">
          estimated scan
        </span>
        <span aria-live="polite" className="font-mono text-[12.5px] text-[color:var(--color-accent)]">
          {active.bytes}
        </span>
        <span className="ml-auto font-mono text-[11px] text-[color:var(--color-fg-subtle)]">
          shown before the query runs
        </span>
      </div>
    </Frame>
  );
}
