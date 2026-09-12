import { Section, SectionHeading } from "@/components/ui/Section";
import { DeploymentTimeline } from "@/components/product/DeploymentTimeline";
import { Chip } from "@/components/ui/Chip";
import { scenario } from "@/lib/demo/data";

export function WhatChanged() {
  return (
    <Section id="what-changed">
      <SectionHeading
        eyebrow="What changed"
        title="See the regression and the change around it in one place."
        lede="ClueLake lines up the incident with the infrastructure events on either side of it, so the sequence is visible rather than reconstructed from memory."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="rounded-xl border border-[color:var(--color-line)] p-5">
          <h3 className="mb-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-[color:var(--color-fg-subtle)]">
            Timeline
          </h3>
          <DeploymentTimeline />
        </div>

        <div className="rounded-xl border border-[color:var(--color-line)] p-5">
          <h3 className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-[color:var(--color-fg-subtle)]">
            The change
          </h3>
          <dl className="mt-4 grid gap-3">
            <Row label="Previous image" value={scenario.imageBefore} />
            <Row label="Current image" value={scenario.imageAfter} />
            <Row label="Build" value={scenario.build} />
            <Row label="Commit" value={`${scenario.commit} — ${scenario.commitMessage}`} />
            <Row label="Actor" value={scenario.actor} />
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <Chip value="View deployment" tone="accent" />
            <Chip value="Open trace" />
            <Chip value="Open logs" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8.5rem_minmax(0,1fr)] items-baseline gap-3">
      <dt className="text-[13px] text-[color:var(--color-fg-subtle)]">{label}</dt>
      <dd className="m-0 min-w-0 break-words font-mono text-[12.5px] text-[color:var(--color-fg)]">{value}</dd>
    </div>
  );
}
