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
          {/* ⚠ THE LABEL IS THE CAPTION ONLY, AND THE VALUE RIDES ON
              aria-valuetext. Both sliders used to sit inside an implicit
              <label> that wrapped the caption AND the live value, so the
              control's accessible name was "Telemetry accepted per day 50 GiB"
              and it CHANGED on every arrow press — on top of the value the
              range widget already announces natively. Arrowing from 50 to 60
              produced ten renamings, ten native value announcements and ten
              fires of the derived <dl> below, which is an announcement backlog
              a keyboard user cannot get out of. Pointing htmlFor at the caption
              alone fixes the name; aria-valuetext supplies the unit once, in
              the place assistive tech already looks for it. */}
          <div className="grid gap-2">
            <span className="flex items-baseline justify-between text-[13.5px]">
              <label htmlFor="meter-ingest">Telemetry accepted per day</label>
              <span aria-hidden className="font-mono text-[color:var(--color-accent)]">{gibPerDay} GiB</span>
            </span>
            <input
              id="meter-ingest"
              type="range" min={1} max={500} value={gibPerDay}
              aria-valuetext={`${gibPerDay} GiB`}
              onChange={(e) => setGibPerDay(Number(e.target.value))}
              className="accent-[color:var(--color-accent)]"
            />
          </div>

          <div className="grid gap-2">
            <span className="flex items-baseline justify-between text-[13.5px]">
              <label htmlFor="meter-retention">Retention</label>
              <span aria-hidden className="font-mono text-[color:var(--color-accent)]">{retentionDays} days</span>
            </span>
            <input
              id="meter-retention"
              type="range" min={1} max={365} value={retentionDays}
              aria-valuetext={`${retentionDays} days`}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              className="accent-[color:var(--color-accent)]"
            />
          </div>

          {/* ⚠ THIS <dl> NO LONGER ANNOUNCES. It carried aria-live="polite", so
              every intermediate step of a drag or a held arrow key queued two
              more utterances behind the slider's own. The figures are derived
              from the slider the user is already hearing, so nothing is lost by
              letting them update silently — a user who wants them reads them,
              or tabs to them. Do not put aria-live back without debouncing it. */}
          <dl className="grid gap-2 border-t border-[color:var(--color-line)] pt-5 sm:grid-cols-2">
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
