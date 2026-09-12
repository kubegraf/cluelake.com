import { ArrowDown, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const TRADITIONAL = [
  "Metric spike", "Search logs", "Open traces", "Check Kubernetes",
  "Inspect deployments", "Compare images", "Find commit",
];

const CLUELAKE = ["Regression", "Deployment", "Image", "Build", "Commit", "Trace"];

export function Problem() {
  return (
    <Section id="problem">
      <SectionHeading
        eyebrow="The problem"
        title="A graph tells you something changed. It doesn't always tell you what changed."
        lede="Production incidents often start with a spike in a chart and end with a long investigation across dashboards, logs, traces and deployment history."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-line)] p-5">
          <h3 className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-[color:var(--color-fg-subtle)]">
            Today
          </h3>
          <ol className="mt-4 flex list-none flex-wrap items-center gap-x-2 gap-y-2 p-0">
            {TRADITIONAL.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-md border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-2.5 py-1.5 text-[13px] text-[color:var(--color-fg-muted)]">
                  {step}
                </span>
                {i < TRADITIONAL.length - 1 ? (
                  <ArrowRight aria-hidden className="size-3.5 shrink-0 text-[color:var(--color-fg-subtle)]" />
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[13.5px] text-[color:var(--color-fg-subtle)]">
            Seven tools, and the answer is held by whoever remembers what shipped.
          </p>
        </div>

        <div className="rounded-xl border border-[color:var(--color-accent-line)] bg-[color:var(--color-accent-wash)] p-5">
          <h3 className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-[color:var(--color-accent)]">
            With ClueLake
          </h3>
          <ol className="mt-4 grid list-none gap-1.5 p-0">
            {CLUELAKE.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="font-mono text-[13px] text-[color:var(--color-fg)]">{step}</span>
                {i < CLUELAKE.length - 1 ? (
                  <ArrowDown aria-hidden className="size-3 text-[color:var(--color-fg-subtle)]" />
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[13.5px] text-[color:var(--color-fg-muted)]">
            One query. The change is already attached to the telemetry.
          </p>
        </div>
      </div>
    </Section>
  );
}
