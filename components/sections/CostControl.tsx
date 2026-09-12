import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const CAPABILITIES = [
  { title: "Cardinality", body: "Keep runaway series under control. Budgets are enforced as data arrives, and an over-budget series is refused by name rather than dropped quietly." },
  { title: "Attributes", body: "Define which dimensions belong in your telemetry. Allow lists, deny lists and redaction are applied at ingest, before anything is stored." },
  { title: "Tail sampling", body: "Keep errors and slow traces while reducing routine volume. Control how telemetry is sampled rather than discovering it after the fact." },
];

const FLOW = ["Raw telemetry", "Policy", "Accepted / sampled", "Stored"];

export function CostControl() {
  return (
    <Section id="cost">
      <SectionHeading
        eyebrow="Cost control"
        title="Control observability cost before it becomes an invoice."
        lede="The usual complaint about observability billing is that the invoice is where you find out what you sent. ClueLake applies policy as telemetry arrives, and records every refusal with the series or attribute at fault."
      />

      <ol className="mt-10 flex list-none flex-wrap items-center gap-x-3 gap-y-2 p-0">
        {FLOW.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className="rounded-md border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-3 py-1.5 font-mono text-[12.5px] text-[color:var(--color-fg-muted)]">
              {step}
            </span>
            {i < FLOW.length - 1 ? (
              <ArrowRight aria-hidden className="size-3.5 text-[color:var(--color-fg-subtle)]" />
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {CAPABILITIES.map((c) => (
          <div key={c.title} className="rounded-xl border border-[color:var(--color-line)] p-5">
            <h3 className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-[color:var(--color-accent)]">
              {c.title}
            </h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">{c.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
