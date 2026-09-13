"use client";

import { useState } from "react";
import { ArrowRight, GitCommit, Layers, Package, Play } from "lucide-react";
import { Frame } from "./Frame";
import { MetricChart } from "./MetricChart";
import { scenario, p99Series, DEPLOY_INDEX, INCIDENT_AT, DEPLOY_AT } from "@/lib/demo/data";
import { cn } from "@/lib/utils/cn";

/**
 * The hero interface, and the product's argument in one screen: a regression,
 * the change that landed a minute before it, and the evidence to act on.
 *
 * ⚠ IT IS INTERACTIVE, NOT A PICTURE. The three evidence rows select, and the
 * detail beneath them changes — because a static image of a product is the
 * thing every competitor's landing page already has, and it tells an engineer
 * nothing about whether the workflow is any good.
 *
 * ⚠ THE DATA IS LOCAL STATE OVER `lib/demo/data`. Nothing here fetches, and
 * there is no pretend endpoint behind it. See that module's header.
 */

type Row = { key: "image" | "build" | "commit"; icon: typeof Package; label: string; value: string; detail: string };

const ROWS: Row[] = [
  {
    key: "image",
    icon: Package,
    label: "image",
    value: `${scenario.imageBefore} → ${scenario.imageAfter}`,
    detail: "The running image changed one minute before the regression. The previous digest is still available to roll back to.",
  },
  {
    key: "build",
    icon: Layers,
    label: "build",
    value: scenario.build,
    detail: "Built from main. The build that produced this image, with its logs and the artifacts it published.",
  },
  {
    key: "commit",
    icon: GitCommit,
    label: "commit",
    value: `${scenario.commit} — ${scenario.commitMessage}`,
    detail: `Authored by ${scenario.actor}. One commit in this build touched the payments client.`,
  },
];

export function WhatChangedPanel({ className }: { className?: string }) {
  const [selected, setSelected] = useState<Row["key"]>("image");
  const active = ROWS.find((r) => r.key === selected) ?? ROWS[0]!;

  return (
    <Frame
      className={cn("shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]", className)}
      title={`${scenario.deployment}`}
      meta={`${INCIDENT_AT} UTC`}
      bodyClassName="p-0"
    >
      {/* ── The signal ─────────────────────────────────────────────────── */}
      <div className="border-b border-[color:var(--color-line)] p-3.5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[12px] text-[color:var(--color-fg-subtle)]">p99 latency</span>
          <span className="font-mono text-[22px] text-[color:var(--color-fg)]">{scenario.p99Before}</span>
          <ArrowRight aria-hidden className="size-4 text-[color:var(--color-fg-subtle)]" />
          <span className="font-mono text-[22px] text-[color:var(--color-warn)]">{scenario.p99After}</span>
          <span className="ml-auto font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]">
            {scenario.service} · {scenario.environment}
          </span>
        </div>
        <div className="mt-3">
          <MetricChart
            series={p99Series}
            deployAt={DEPLOY_INDEX}
            height={104}
            label="p99 latency, last 25 minutes"
            summary={`Steady at ${scenario.p99Before} until ${DEPLOY_AT}, when a deployment landed. It rose to ${scenario.p99After} at ${INCIDENT_AT} and returned to normal after a rollback at 14:05.`}
          />
        </div>
      </div>

      {/* ── The change ─────────────────────────────────────────────────── */}
      <div className="p-3.5">
        <div className="flex items-baseline gap-2">
          {/* ⚠ NOT A HEADING. This is a label inside a product widget, not a
              section of the document. As an <h3> directly under the page's
              <h1> it created a 1→3 skip in the outline, which is how a
              screen-reader user loses the page structure. The panel is
              reused on several pages, so it must not assume a level. */}
          <p className="m-0 text-[13.5px] font-semibold">What changed</p>
          <span className="font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]">
            deployment at {DEPLOY_AT}
          </span>
        </div>

        {/* ⚠ `minmax(0,1fr)` RATHER THAN THE DEFAULT `auto`. A grid item's
            automatic minimum size is its content's min-content width, and a row
            here contains a nowrap monospace digest — so the column grew to 442px
            inside a 320px frame and the evidence ran out of the panel unseen.
            The explicit minmax lets the column shrink and the value truncate. */}
        <ul className="mt-2.5 grid grid-cols-[minmax(0,1fr)] gap-1" role="list">
          {ROWS.map((row) => {
            const Icon = row.icon;
            const isActive = row.key === selected;
            return (
              <li key={row.key}>
                <button
                  type="button"
                  onClick={() => setSelected(row.key)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex w-full min-w-0 items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-colors",
                    isActive
                      ? "border-[color:var(--color-accent-line)] bg-[color:var(--color-accent-wash)]"
                      : "border-transparent hover:bg-[color:var(--color-surface-2)]",
                  )}
                >
                  <Icon
                    aria-hidden
                    className={cn(
                      "size-3.5 shrink-0",
                      isActive ? "text-[color:var(--color-accent)]" : "text-[color:var(--color-fg-subtle)]",
                    )}
                  />
                  <span className="shrink-0 font-mono text-[11.5px] text-[color:var(--color-fg-subtle)] sm:w-14">
                    {row.label}
                  </span>
                  {/* ⚠ WRAPS ON A PHONE. Two digests either side of an arrow is
                      the evidence this panel exists to show, and
                      "sha256:731f01 → sha256:9a…" is the half of it that
                      matters going missing. It truncates from `sm` up, where
                      the row has the width for one line. */}
                  <span className="min-w-0 flex-1 break-words font-mono text-[12.5px] text-[color:var(--color-fg)] sm:truncate">
                    {row.value}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* ⚠ `aria-live="polite"`: the detail changes without the focus moving,
            so a screen-reader user is told rather than left behind. */}
        <p
          aria-live="polite"
          className="mt-2.5 min-h-[2.75rem] border-t border-[color:var(--color-line)] pt-2.5 text-[13px] leading-relaxed text-[color:var(--color-fg-muted)]"
        >
          {active.detail}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {["Open trace", "Compare deployments", "View logs"].map((cta, i) => (
            <span
              key={cta}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11.5px]",
                i === 0
                  ? "border-[color:var(--color-accent-line)] text-[color:var(--color-accent)]"
                  : "border-[color:var(--color-line)] text-[color:var(--color-fg-muted)]",
              )}
            >
              {i === 0 ? <Play aria-hidden className="size-3" /> : null}
              {cta}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}
