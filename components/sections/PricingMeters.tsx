"use client";

import { useMemo, useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * The meters ClueLake bills on, and a sizing tool.
 *
 * ⚠ NO PRICES. Rates are a commercial decision that has not been published, and
 * inventing one here would be a number a customer could hold us to. What this
 * does instead is let somebody estimate their own VOLUME — which is the input
 * they actually cannot guess, and the thing a rate is eventually applied to.
 *
 * ⚠ THE ARITHMETIC IS REAL. Changing a slider changes the derived figures,
 * because a calculator that does not calculate is worse than a table.
 */
const METERS = [
  { id: "ingest", name: "Ingest", unit: "per GiB accepted", body: "Measured on what is accepted after policy, so data refused by a cardinality budget or an attribute deny list is never billed." },
  { id: "retention", name: "Retention", unit: "per GiB-day", body: "Storage is rent rather than a purchase. Retention is set per environment, so staging need not be kept as long as production." },
  { id: "series", name: "Active series", unit: "per 1k series", body: "The cost a bytes meter cannot see: cardinality consumes index and memory rather than volume." },
  { id: "query", name: "Query", unit: "per GiB scanned", body: "Costed before execution, so an expensive query is a decision rather than a surprise." },
];

export function PricingMeters() {
  const [gibPerDay, setGibPerDay] = useState(50);
  const [retentionDays, setRetentionDays] = useState(30);

  const derived = useMemo(() => {
    const retained = gibPerDay * retentionDays;
    const monthlyIngest = gibPerDay * 30;
    return { retained, monthlyIngest };
  }, [gibPerDay, retentionDays]);

  return (
    <>
      <Section>
        <SectionHeading as="h2" title="What you are billed on" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {METERS.map((m) => (
            <div key={m.id} className="rounded-xl border border-[color:var(--color-line)] p-5">
              <div className="flex items-baseline gap-2">
                <h3 className="text-[15px] font-semibold">{m.name}</h3>
                <span className="font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]">{m.unit}</span>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">{m.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          as="h2"
          title="Estimate your volume"
          lede="Rates are not published yet. This works out the quantities a rate would apply to, which is the part you cannot look up."
        />
        <div className="mt-8 grid max-w-[46rem] gap-6 rounded-xl border border-[color:var(--color-line)] p-6">
          <label className="grid gap-2">
            <span className="flex items-baseline justify-between text-[13.5px]">
              <span>Telemetry accepted per day</span>
              <span className="font-mono text-[color:var(--color-accent)]">{gibPerDay} GiB</span>
            </span>
            <input
              type="range" min={1} max={500} value={gibPerDay}
              onChange={(e) => setGibPerDay(Number(e.target.value))}
              className="accent-[color:var(--color-accent)]"
            />
          </label>

          <label className="grid gap-2">
            <span className="flex items-baseline justify-between text-[13.5px]">
              <span>Retention</span>
              <span className="font-mono text-[color:var(--color-accent)]">{retentionDays} days</span>
            </span>
            <input
              type="range" min={1} max={365} value={retentionDays}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              className="accent-[color:var(--color-accent)]"
            />
          </label>

          <dl aria-live="polite" className="grid gap-2 border-t border-[color:var(--color-line)] pt-5 sm:grid-cols-2">
            <Figure label="Ingest, per month" value={`${derived.monthlyIngest.toLocaleString()} GiB`} />
            <Figure label="Held at steady state" value={`${derived.retained.toLocaleString()} GiB`} />
          </dl>
        </div>
      </Section>
    </>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="text-[13px] text-[color:var(--color-fg-subtle)]">{label}</dt>
      <dd className="m-0 font-mono text-[14px] text-[color:var(--color-fg)]">{value}</dd>
    </div>
  );
}
