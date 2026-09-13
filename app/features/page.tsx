import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Features",
  description:
    "Logs, metrics, traces, Kubernetes and eBPF visibility, deployment correlation, cost control, querying, alerts and SLOs.",
  path: "/features",
});

const GROUPS: Array<{ title: string; items: Array<{ name: string; body: string }> }> = [
  {
    title: "Observability",
    items: [
      { name: "Logs", body: "Search, filtering and pattern grouping, with live tail. Lines carrying a trace id link to the trace." },
      { name: "Metrics", body: "RED and saturation views, with percentiles that merge correctly across any range rather than averaging stored percentiles." },
      { name: "Traces", body: "Trace search and waterfalls, with span detail and the deployment that produced the trace." },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { name: "Kubernetes", body: "Namespace, cluster, workload and replica identity resolved from the platform rather than from telemetry attributes." },
      { name: "eBPF", body: "Where Cilium and Hubble are available, network flows contribute service relationships without application changes." },
    ],
  },
  {
    title: "Correlation",
    items: [
      { name: "Deployment context", body: "Deployment, image digest, build and commit stamped onto every event at ingest." },
      { name: "What changed", body: "A regression lined up against the infrastructure events around it, in one timeline." },
    ],
  },
  {
    title: "Cost control",
    items: [
      { name: "Cardinality budgets", body: "Per-workspace limits on active series, enforced at ingest and reported by name when exceeded." },
      { name: "Attribute policy", body: "Allow lists, deny lists and redaction applied before storage." },
      { name: "Tail sampling", body: "Keep errors and slow traces while reducing routine volume." },
    ],
  },
  {
    title: "Querying",
    items: [
      { name: "PromQL", body: "PromQL for the supported query set, so existing dashboards and alert rules keep working." },
      { name: "SQL", body: "Read-only SQL with the tenant predicate injected server-side and a cost estimate before execution." },
    ],
  },
  {
    title: "Operations",
    items: [
      { name: "Alerts", body: "Threshold, PromQL, log pattern and burn-rate alerts, with stored state rather than state recomputed each evaluation." },
      { name: "SLOs", body: "Objectives, error budgets and burn rate." },
      { name: "Audit", body: "Append-only records of sign-in, credential and configuration changes." },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Features"
        title="What ClueLake does."
        lede="Grouped by the job rather than by the signal. This page describes what ClueLake does, not a roadmap — and ClueLake is in development, with no public release yet."
      />
      {GROUPS.map((g) => (
        <Section key={g.title}>
          <SectionHeading as="h2" title={g.title} />
          <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((it) => (
              <div key={it.name}>
                <h3 className="text-[14.5px] font-semibold">{it.name}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">{it.body}</p>
              </div>
            ))}
          </div>
        </Section>
      ))}
      <FinalCta />
    </>
  );
}
