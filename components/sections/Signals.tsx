import { Section, SectionHeading } from "@/components/ui/Section";
import { LogExplorer } from "@/components/product/LogExplorer";
import { TraceWaterfall } from "@/components/product/TraceWaterfall";
import { ServiceMap } from "@/components/product/ServiceMap";

export function Signals() {
  return (
    <Section id="signals">
      <SectionHeading
        eyebrow="Unified telemetry"
        title="Logs. Metrics. Traces. One investigation."
        lede="Bring the signals you already have together in a workflow designed for investigation. Keep the tooling that works — ClueLake is the backend the evidence lands in."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <LogExplorer />
        <TraceWaterfall />
        <ServiceMap className="lg:col-span-2" />
      </div>

      <p className="mt-6 max-w-[46rem] text-[13.5px] leading-relaxed text-[color:var(--color-fg-subtle)]">
        Every log line carrying a trace id links to its trace; every trace carries the deployment
        that produced it. The service map is built from trace relationships, and from eBPF flow data
        where it is available.
      </p>
    </Section>
  );
}
