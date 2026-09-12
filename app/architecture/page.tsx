import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Platform } from "@/components/sections/Platform";
import { FinalCta } from "@/components/sections/FinalCta";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Architecture",
  description:
    "How ClueLake works — OpenTelemetry, Kubernetes, eBPF, ClickHouse and deployment-aware observability.",
  path: "/architecture",
});

const TOPICS = [
  { title: "Storage", body: "One columnar store of wide events. A log line is a span with no duration, so logs and spans share a table — storing them apart is what makes correlation a human activity rather than a query. Metrics are separate, because they arrive pre-aggregated and are queried by series over time." },
  { title: "Tenancy", body: "The workspace is the first expression in every sort key and partition key. Tenancy is a physical property of the storage, not a predicate the query builder has to remember: a query that omits it reads nothing rather than reading everyone." },
  { title: "Ingestion", body: "OTLP over HTTP and gRPC. Each batch is authenticated, placed, validated, redacted, checked against the cardinality budget, sampled, enriched with deployment context, metered and written. Refusals are recorded with the series or attribute at fault." },
  { title: "Enrichment", body: "Deployment, image digest, build and commit are stamped at ingest from the platform's own records. They are never read from telemetry attributes, which the sending workload controls." },
  { title: "Cardinality", body: "Budgets are per workspace and count-based. An over-budget series is refused by name and surfaced in the portal the same day, rather than dropped quietly or billed silently." },
  { title: "Query", body: "PromQL for the supported query set, log and trace search, and read-only SQL. Every query is costed before it runs and refused with an estimate if it exceeds the workspace ceiling." },
  { title: "Correlation", body: "Deterministic, not statistical. Candidate changes are ranked by temporal proximity, affected service, shared deployment and image change. No claim is made that this is machine learning, because it is not." },
  { title: "eBPF and Kubernetes", body: "Where Cilium and Hubble are present, flow data contributes service relationships and network telemetry. Feature detection decides whether the integration is enabled; its absence degrades the collector rather than breaking it." },
  { title: "Retention", body: "Configurable per environment and applied by the storage engine's TTL rather than by a sweep job." },
  { title: "Export", body: "Query APIs, result export, and a cold tier designed around open columnar formats so telemetry stays readable outside ClueLake." },
];

export default function ArchitecturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Architecture"
        title="How ClueLake is built."
        lede="Written for engineers evaluating this seriously. Where something is a design decision with a trade-off, the trade-off is stated rather than omitted."
      />
      <Platform />
      <Section>
        <SectionHeading as="h2" title="The pieces" />
        <div className="mt-8 grid gap-x-10 gap-y-7 lg:grid-cols-2">
          {TOPICS.map((t) => (
            <div key={t.title}>
              <h3 className="text-[15px] font-semibold">{t.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">{t.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading
          as="h2"
          title="Sending telemetry"
          lede="Standard OTLP. No proprietary agent is required."
        />
        <CodeBlock
          className="mt-6 max-w-[46rem]"
          label="otel-collector-config.yaml"
          code={`exporters:
  otlphttp/cluelake:
    endpoint: \${CLUELAKE_ENDPOINT}
    headers:
      authorization: Bearer \${CLUELAKE_INGEST_TOKEN}

service:
  pipelines:
    traces:  { exporters: [otlphttp/cluelake] }
    metrics: { exporters: [otlphttp/cluelake] }
    logs:    { exporters: [otlphttp/cluelake] }`}
        />
      </Section>
      <FinalCta />
    </>
  );
}
