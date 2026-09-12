import { timeline, type TimelineEvent } from "@/lib/demo/data";
import { cn } from "@/lib/utils/cn";

const TONE: Record<TimelineEvent["kind"], { dot: string; text: string }> = {
  healthy:    { dot: "bg-[color:var(--color-ok)]",     text: "text-[color:var(--color-fg-muted)]" },
  deployment: { dot: "bg-[color:var(--color-accent)]", text: "text-[color:var(--color-fg)]" },
  regression: { dot: "bg-[color:var(--color-warn)]",   text: "text-[color:var(--color-fg)]" },
  errors:     { dot: "bg-[color:var(--color-bad)]",    text: "text-[color:var(--color-fg)]" },
  rollback:   { dot: "bg-[color:var(--color-info)]",   text: "text-[color:var(--color-fg-muted)]" },
};

/**
 * The incident, in order.
 *
 * ⚠ THE KIND IS CARRIED BY TEXT AS WELL AS COLOUR. "deployment" and
 * "regression" are different colours of dot and they are also different words —
 * an interface that distinguishes states only by hue is unreadable to a
 * colour-blind engineer at exactly the moment it matters most.
 */
export function DeploymentTimeline({ className }: { className?: string }) {
  return (
    <ol className={cn("relative m-0 list-none p-0", className)}>
      {/* The spine. `aria-hidden` because it is a visual join, not content. */}
      <span
        aria-hidden
        className="absolute bottom-3 left-[4.9rem] top-3 w-px bg-[color:var(--color-line)]"
      />
      {timeline.map((e) => {
        const tone = TONE[e.kind];
        return (
          <li key={e.time} className="relative flex gap-4 py-2.5">
            <span className="w-16 shrink-0 pt-0.5 text-right font-mono text-[12px] text-[color:var(--color-fg-subtle)]">
              {e.time}
            </span>
            <span className="relative z-10 mt-[0.42rem] size-2 shrink-0 rounded-full ring-4 ring-[color:var(--color-ink)]">
              <span className={cn("block size-full rounded-full", tone.dot)} />
            </span>
            <span className="min-w-0">
              <span className={cn("block text-[14px] font-medium", tone.text)}>{e.title}</span>
              {e.detail ? (
                <span className="block font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]">
                  {e.detail}
                </span>
              ) : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
