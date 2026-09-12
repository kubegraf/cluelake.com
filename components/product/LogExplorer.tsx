"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Frame } from "./Frame";
import { logs, logPatterns, type LogLine } from "@/lib/demo/data";
import { cn } from "@/lib/utils/cn";

const SEV_TONE: Record<LogLine["severity"], string> = {
  ERROR: "text-[color:var(--color-bad)]",
  WARN: "text-[color:var(--color-warn)]",
  INFO: "text-[color:var(--color-fg-subtle)]",
};

/**
 * Log search, with pattern grouping.
 *
 * ⚠ PATTERNS ARE THE DEFAULT VIEW, AND THAT IS A PRODUCT OPINION. On a service
 * doing 400 rps the first useful question is "what is the shape of this", not
 * "what is line 40,000" — so the grouped view leads and the raw lines are one
 * click away, rather than the other way round.
 *
 * The filter is real: typing narrows the rows. It is local state over
 * `lib/demo/data`; nothing here fetches.
 */
export function LogExplorer({ className }: { className?: string }) {
  const [view, setView] = useState<"patterns" | "lines">("patterns");
  const [q, setQ] = useState("");
  const [severity, setSeverity] = useState<"all" | LogLine["severity"]>("all");

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return logs.filter((l) => {
      if (severity !== "all" && l.severity !== severity) return false;
      if (!needle) return true;
      return (
        l.message.toLowerCase().includes(needle) ||
        l.app.toLowerCase().includes(needle) ||
        (l.traceId ?? "").toLowerCase().includes(needle)
      );
    });
  }, [q, severity]);

  return (
    <Frame className={className} title="Logs" meta="checkout · production" bodyClassName="p-0">
      <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--color-line)] p-2.5">
        <label className="relative flex min-w-[12rem] flex-1 items-center">
          <Search aria-hidden className="pointer-events-none absolute left-2.5 size-3.5 text-[color:var(--color-fg-subtle)]" />
          <span className="sr-only">Filter log lines</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by message, app or trace id"
            className="h-8 w-full rounded-md border border-[color:var(--color-line)] bg-[color:var(--color-ink)] pl-8 pr-2 font-mono text-[12px] text-[color:var(--color-fg)] placeholder:text-[color:var(--color-fg-subtle)]"
          />
        </label>

        <label className="flex items-center gap-1.5">
          <span className="sr-only">Severity</span>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as typeof severity)}
            className="h-8 rounded-md border border-[color:var(--color-line)] bg-[color:var(--color-ink)] px-2 font-mono text-[12px] text-[color:var(--color-fg-muted)]"
          >
            <option value="all">all</option>
            <option value="ERROR">ERROR</option>
            <option value="WARN">WARN</option>
            <option value="INFO">INFO</option>
          </select>
        </label>

        <div className="flex rounded-md border border-[color:var(--color-line)] p-0.5" role="tablist" aria-label="Log view">
          {(["patterns", "lines"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={cn(
                "rounded px-2.5 py-1 font-mono text-[11.5px] transition-colors",
                view === v
                  ? "bg-[color:var(--color-surface-2)] text-[color:var(--color-fg)]"
                  : "text-[color:var(--color-fg-subtle)] hover:text-[color:var(--color-fg)]",
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "patterns" ? (
        <ul className="m-0 list-none p-0">
          {logPatterns.map((p) => (
            <li
              key={p.pattern}
              className="flex items-center gap-3 border-b border-[color:var(--color-line)] px-3 py-2.5 last:border-0"
            >
              <span className={cn("w-12 shrink-0 font-mono text-[11px]", SEV_TONE[p.severity])}>{p.severity}</span>
              <span className="min-w-0 flex-1 truncate font-mono text-[12.5px] text-[color:var(--color-fg)]">
                {p.pattern}
              </span>
              <span className="shrink-0 font-mono text-[12px] text-[color:var(--color-fg-subtle)]">
                {p.count.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="max-h-[16rem] overflow-y-auto">
          {visible.length === 0 ? (
            <p className="px-3 py-8 text-center text-[13px] text-[color:var(--color-fg-subtle)]">
              No lines match this filter.
            </p>
          ) : (
            <ul className="m-0 list-none p-0">
              {visible.map((l, i) => (
                <li
                  key={`${l.ts}-${i}`}
                  className="flex gap-3 border-b border-[color:var(--color-line)] px-3 py-1.5 last:border-0"
                >
                  <span className="shrink-0 font-mono text-[11px] text-[color:var(--color-fg-subtle)]">{l.ts}</span>
                  <span className={cn("w-10 shrink-0 font-mono text-[11px]", SEV_TONE[l.severity])}>{l.severity}</span>
                  <span className="shrink-0 font-mono text-[11px] text-[color:var(--color-info)]">{l.app}</span>
                  <span className="min-w-0 flex-1 font-mono text-[12px] text-[color:var(--color-fg-muted)]">
                    {l.message}
                    {l.traceId ? (
                      <span className="ml-2 text-[color:var(--color-accent)]">trace_id={l.traceId}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Frame>
  );
}
