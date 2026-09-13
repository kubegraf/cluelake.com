"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, GitCommit, Layers, Package, Play } from "lucide-react";
import { Frame } from "./Frame";
import { MetricChart } from "./MetricChart";
import { scenario, p99Series, DEPLOY_INDEX, INCIDENT_AT, DEPLOY_AT } from "@/lib/demo/data";
import { cn } from "@/lib/utils/cn";

/**
 * The hero interface, and the product's argument in one screen: a regression,
 * the change that landed a minute before it, and the evidence to act on.
 *
 * ⚠ IT IS INTERACTIVE, NOT A PICTURE. The evidence rows select, and the detail
 * beneath them changes — because a static image of a product is the thing every
 * competitor's landing page already has, and it tells an engineer nothing about
 * whether the workflow is any good.
 *
 * ⚠ THE ROW COUNT IS NOT LOAD-BEARING, and this comment no longer names it. It
 * said "three" until the commit row was removed, and a count in prose is the
 * first thing to go stale when a row is added or dropped. `ROWS` is the list;
 * the markup maps it.
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
  // ⚠ RESTORED. This row was removed, then put back when the hero lede was
  // rewritten to promise tracing a regression "back to the deployment, image,
  // build, or commit behind them". Four nouns in the sentence, and the panel
  // sitting beside it is where a reader checks them. Removing it again means
  // editing that sentence in the same change.
  {
    key: "commit",
    icon: GitCommit,
    label: "commit",
    value: `${scenario.commit} — ${scenario.commitMessage}`,
    detail: `Authored by ${scenario.actor}. One commit in this build touched the payments client.`,
  },
];

/* ── The replay ───────────────────────────────────────────────────────────
 *
 * ⚠ NOTHING HERE FETCHES, AND NOTHING HERE IS LIVE. `lib/demo/data` is a fixed
 * hand-written scenario and its header is explicit that a marketing page which
 * calls a pretend API is one that will one day appear to be broken. This code
 * does not add an endpoint, a mock server or a timer that invents numbers from
 * nothing: it REPLAYS the one scenario on a loop so a visitor watches the
 * causality happen instead of reading that it did.
 *
 * ⚠ THE LIVE CHROME IS A DELIBERATE DECISION, NOT DRIFT. The pulsing dot, the
 * ticking "updated Ns ago" and the small jitter on the current figure make this
 * read as a running system, which is a stronger claim than the rest of the file
 * makes. It was asked for with that trade-off stated. The counterweight is the
 * caption underneath, which still says "Interactive demonstration" and names
 * the scenario — if that caption is ever removed, this chrome becomes a lie.
 *
 * ⚠ EVERY DYNAMIC VALUE STARTS AT ITS SERVER-RENDERED ONE. A count-up that
 * starts at zero, or a relative timestamp computed during render, is a
 * hydration mismatch: React renders one string on the server and another on the
 * client and blows the tree away. Each hook below seeds `useState` with the
 * static value and only moves after mount.
 */
const REPLAY_MS = 12_000;

/** Seconds → "4s ago". Kept trivial on purpose; a relative-time library for one
 *  string is the same trade the chart refuses for one polyline. */
function agoLabel(seconds: number): string {
  if (seconds < 60) return `${seconds}s ago`;
  const m = Math.floor(seconds / 60);
  return `${m}m ago`;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(q.matches);
    const on = () => setReduced(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Counts `from` → `to` on each `run` change. Seeded at `to` so the server and
 *  the first client frame agree, and so a reduced-motion reader sees the final
 *  number rather than a zero that never moves. */
function useCountUp(from: number, to: number, run: number, enabled: boolean, ms = 1500): number {
  const [value, setValue] = useState(to);
  useEffect(() => {
    if (!enabled) { setValue(to); return; }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [from, to, run, enabled, ms]);
  return value;
}

export function WhatChangedPanel({ className }: { className?: string }) {
  const [selected, setSelected] = useState<Row["key"]>("image");
  const active = ROWS.find((r) => r.key === selected) ?? ROWS[0]!;

  const reduced = usePrefersReducedMotion();
  // `mounted` gates every live affordance. Before it flips, this renders exactly
  // what the server rendered — which is what keeps hydration quiet and what a
  // reader with JavaScript off keeps looking at.
  const [mounted, setMounted] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [ago, setAgo] = useState(0);
  const jitterRef = useRef(0);
  const [, forceJitter] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (reduced) return;
    const replay = setInterval(() => { setCycle((c) => c + 1); setAgo(0); }, REPLAY_MS);
    const clock = setInterval(() => setAgo((a) => a + 1), 1000);
    // ⚠ The jitter moves the CURRENT figure by hundredths of a second, never
    // the before/after story. Wandering far enough to change what the panel
    // claims would make the animation disagree with the prose beside it.
    const jitter = setInterval(() => {
      jitterRef.current = (Math.random() - 0.5) * 0.08;
      forceJitter((n) => n + 1);
    }, 2200);
    return () => { clearInterval(replay); clearInterval(clock); clearInterval(jitter); };
  }, [reduced]);

  const animate = mounted && !reduced;
  const beforeNum = parseFloat(scenario.p99Before);
  const afterNum = parseFloat(scenario.p99After);
  const before = useCountUp(beforeNum, beforeNum, cycle, false);
  const after = useCountUp(beforeNum, afterNum, cycle, animate);
  const shown = animate ? after + jitterRef.current : afterNum;

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
          <span className="font-mono text-[22px] text-[color:var(--color-fg)]">
            {before.toFixed(1)}s
          </span>
          <ArrowRight aria-hidden className="size-4 text-[color:var(--color-fg-subtle)]" />
          {/* ⚠ `tabular-nums` IS NOT COSMETIC HERE. Proportional digits change
              width as they count, so the arrow and the labels beside it jog
              left and right on every frame of the count-up. */}
          <span className="font-mono text-[22px] tabular-nums text-[color:var(--color-warn)]">
            {shown.toFixed(1)}s
          </span>
          <span className="ml-auto flex items-center gap-2 font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]">
            {mounted ? (
              <>
                <span aria-hidden className="cl-beacon" />
                <span>{agoLabel(ago)}</span>
                <span aria-hidden>·</span>
              </>
            ) : null}
            {scenario.service} · {scenario.environment}
          </span>
        </div>
        <div className="mt-3">
          {/* ⚠ `key={cycle}` REMOUNTS THE CHART, and that is how the line
              redraws. The draw is a CSS animation with `forwards`, so it holds
              its end state and will not replay on a re-render — only a new
              element restarts it. */}
          <MetricChart
            key={cycle}
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
