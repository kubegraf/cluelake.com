"use client";

import { memo, useId, useMemo } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * A line chart with a deployment marker on it.
 *
 * ⚠ HAND-DRAWN SVG, DELIBERATELY, AND NOT BECAUSE A LIBRARY WOULD NOT WORK.
 * The one thing this chart must do is place a deployment marker on the same x
 * axis as the metric — that visual connection is the product's whole argument —
 * and every general-purpose charting library is ~50–150kB of JavaScript to draw
 * a polyline this site already knows the shape of. A marketing hero that ships a
 * charting runtime to render 25 fixed points is a Core Web Vitals problem in
 * exchange for nothing. Real product charts in the console are a different
 * decision with different requirements.
 *
 * ⚠ THE CHART IS NOT THE ONLY WAY TO READ THIS. It carries a role, an
 * accessible name and a text summary, because a line somebody cannot see must
 * still tell them the p99 doubled.
 */
/**
 * ⚠ MEMOISED, AND THE REASON IS THE PANEL NEXT DOOR. `WhatChangedPanel` counts
 * its p99 figure up with a requestAnimationFrame loop, so it re-renders about
 * ninety times per twelve-second replay. Its props here never change during
 * that — `series` is a module constant — so without `memo` this component
 * reconciles ninety times to produce byte-identical SVG, forever, whether or
 * not the panel is on screen.
 */
export const MetricChart = memo(function MetricChart({
  series, deployAt, height = 132, label, summary, unit = "ms", className, tone = "accent",
}: {
  series: number[];
  deployAt?: number;
  height?: number;
  label: string;
  summary: string;
  unit?: string;
  className?: string;
  tone?: "accent" | "bad";
}) {
  const gid = useId().replace(/:/g, "");
  const W = 520;
  const H = height;
  const PAD = 6;

  const { path, area, min, max, points } = useMemo(() => {
    const lo = Math.min(...series);
    const hi = Math.max(...series);
    const span = hi - lo || 1;
    const pts = series.map((v, i) => {
      const x = PAD + (i / (series.length - 1)) * (W - PAD * 2);
      const y = PAD + (1 - (v - lo) / span) * (H - PAD * 2);
      return [x, y] as const;
    });
    const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const last = pts[pts.length - 1];
    const first = pts[0];
    const a = last && first
      ? `${d} L${last[0].toFixed(1)},${H - PAD} L${first[0].toFixed(1)},${H - PAD} Z`
      : d;
    return { path: d, area: a, min: lo, max: hi, points: pts };
  }, [series, H]);

  const stroke = tone === "bad" ? "var(--color-bad)" : "var(--color-accent)";
  const markerX = deployAt !== undefined && points[deployAt] ? points[deployAt]![0] : null;

  return (
    <figure className={cn("m-0", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        style={{ height }}
        role="img"
        aria-label={`${label}. ${summary}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={area} fill={`url(#fill-${gid})`} />
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeWidth="1.75"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            strokeDasharray: 2000,
            // `cl-draw` is disabled wholesale by the reduced-motion rule in
            // globals.css, which leaves the finished line rather than no line.
            animation: "cl-draw 1100ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            ["--dash" as string]: "2000",
          }}
        />

        {markerX !== null ? (
          <g>
            <line
              x1={markerX} y1={PAD - 4} x2={markerX} y2={H - PAD}
              stroke="var(--color-fg-subtle)" strokeWidth="1" strokeDasharray="3 3"
            />
            <circle cx={markerX} cy={PAD - 1} r="3" fill="var(--color-accent)" />
          </g>
        ) : null}
      </svg>
      <figcaption className="mt-2 flex items-baseline justify-between font-mono text-[11px] text-[color:var(--color-fg-subtle)]">
        <span>{label}</span>
        <span>
          {min.toLocaleString()}–{max.toLocaleString()}
          {unit}
        </span>
      </figcaption>
    </figure>
  );
});
