import { Section, SectionHeading } from "@/components/ui/Section";

const LAYERS = [
  { label: "Kubernetes workloads", note: "your clusters" },
  { label: "OpenTelemetry · eBPF · Hubble", note: "collection" },
  { label: "ClueLake ingest", note: "auth, tenancy" },
  { label: "Policy · sampling · enrichment", note: "cardinality, redaction, deployment context" },
  { label: "ClickHouse", note: "columnar storage" },
  { label: "Query · correlation", note: "PromQL, logs, traces, SQL" },
  { label: "ClueLake portal", note: "investigation" },
];

export function Platform() {
  return (
    <Section id="architecture">
      <SectionHeading
        eyebrow="Architecture"
        title="OpenTelemetry in. Your telemetry stays yours."
        lede="ClueLake is designed to fit the tooling you already use. Telemetry arrives over OTLP, and leaves through query APIs and exports — structured, and readable by things that are not ours."
      />

      <ol className="mt-10 grid list-none gap-2 p-0">
        {LAYERS.map((l, i) => (
          <li
            key={l.label}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-lg border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-4 py-3"
          >
            <span className="font-mono text-[11px] text-[color:var(--color-fg-subtle)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[14.5px] text-[color:var(--color-fg)]">{l.label}</span>
            <span className="ml-auto font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]">{l.note}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-line)] p-5">
          <h3 className="text-[14.5px] font-semibold">See the paths your application does not instrument.</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">
            Where a cluster runs Cilium and Hubble, ClueLake can use eBPF flow data to understand
            traffic and service relationships without application changes. It is used for service
            relationships and network telemetry — not as a substitute for application tracing.
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--color-line)] p-5">
          <h3 className="text-[14.5px] font-semibold">Your telemetry should not become a hostage.</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">
            OpenTelemetry in, query APIs and exports out, and a documented storage model. Cold
            storage is designed around open columnar formats so the data stays readable outside
            ClueLake.
          </p>
        </div>
      </div>
    </Section>
  );
}
