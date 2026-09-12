"use client";

import { useState } from "react";
import { Frame } from "./Frame";
import { serviceNodes, serviceEdges } from "@/lib/demo/data";
import { cn } from "@/lib/utils/cn";

/**
 * The service graph.
 *
 * ⚠ A DIAGRAM, NOT A CONSTELLATION. Fixed positions, straight edges, five
 * nodes. An animated force-directed graph looks impressive in a screenshot and
 * is unreadable in use — the value here is "which dependency is degraded", and
 * that answer must survive a glance.
 *
 * ⚠ DEGRADED EDGES ARE DASHED AS WELL AS COLOURED, because an edge distinguished
 * only by hue tells a colour-blind engineer nothing.
 */
export function ServiceMap({ className }: { className?: string }) {
  const [selected, setSelected] = useState<string>("payments");
  const active = serviceNodes.find((n) => n.id === selected) ?? serviceNodes[0]!;
  const pos = (id: string) => serviceNodes.find((n) => n.id === id)!;

  return (
    <Frame className={className} title="Service map" meta="last 15 minutes" bodyClassName="p-0">
      <div className="relative">
        <svg viewBox="0 0 100 100" className="block h-[15rem] w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
          {serviceEdges.map((e) => {
            const a = pos(e.from);
            const b = pos(e.to);
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={e.degraded ? "var(--color-bad)" : "var(--color-line-strong)"}
                strokeWidth={e.degraded ? 0.7 : 0.5}
                strokeDasharray={e.degraded ? "2 1.5" : undefined}
              />
            );
          })}
        </svg>

        {/* Nodes are real buttons over the SVG rather than <circle> elements, so
            they are keyboard reachable and carry accessible names. */}
        {serviceNodes.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setSelected(n.id)}
            aria-pressed={n.id === selected}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border px-2 py-1 font-mono text-[11px] transition-colors",
              n.id === selected
                ? "border-[color:var(--color-accent-line)] bg-[color:var(--color-accent-wash)] text-[color:var(--color-fg)]"
                : "border-[color:var(--color-line)] bg-[color:var(--color-surface)] text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]",
              n.errPct > 1 && "border-[color:var(--color-bad)]",
            )}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {n.label}
            {n.kind === "datastore" ? (
              <span className="ml-1 text-[color:var(--color-fg-subtle)]">db</span>
            ) : null}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="grid gap-1.5 border-t border-[color:var(--color-line)] p-3 sm:grid-cols-3">
        <Stat label="requests" value={`${active.rps}/s`} />
        <Stat label="errors" value={`${active.errPct.toFixed(1)}%`} tone={active.errPct > 1 ? "bad" : "ok"} />
        <Stat label="p99" value={`${active.p99ms.toLocaleString()}ms`} tone={active.p99ms > 2000 ? "warn" : undefined} />
      </div>
    </Frame>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "ok" | "warn" | "bad" }) {
  const cls =
    tone === "bad" ? "text-[color:var(--color-bad)]"
    : tone === "warn" ? "text-[color:var(--color-warn)]"
    : tone === "ok" ? "text-[color:var(--color-ok)]"
    : "text-[color:var(--color-fg)]";
  return (
    <div className="flex items-baseline gap-2 font-mono text-[12px]">
      <span className="text-[color:var(--color-fg-subtle)]">{label}</span>
      <span className={cls}>{value}</span>
    </div>
  );
}
