import { Section, SectionHeading } from "@/components/ui/Section";
import { contextFields } from "@/lib/demo/data";

export function Differentiator() {
  return (
    <Section id="context">
      <SectionHeading
        eyebrow="Deployment context"
        title="Your telemetry already knows what happened. ClueLake keeps the context."
        lede="ClueLake makes deployment context a first-class part of the observability model. These fields are stamped onto every event as it arrives, by the platform that performed the deployment — not read from the payload, which the workload controls."
      />

      <ul className="mt-10 flex list-none flex-wrap gap-2 p-0">
        {contextFields.map((f) => (
          <li
            key={f}
            className="rounded-md border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-2.5 py-1.5 font-mono text-[12.5px] text-[color:var(--color-fg-muted)]"
          >
            {f}
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-[46rem] text-[14px] leading-relaxed text-[color:var(--color-fg-subtle)]">
        Because the fields are on the event rather than reconstructed afterwards, correlating a
        regression with the change that caused it is a query rather than an investigation.
      </p>
    </Section>
  );
}
