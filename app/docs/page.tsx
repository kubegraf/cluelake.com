import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Documentation",
  description: "ClueLake documentation: getting started, Kubernetes, OpenTelemetry, querying, deployments, alerts, SLOs and the API.",
  path: "/docs",
});

/** ⚠ THE CATEGORY LIST IS THE SIDEBAR CONTRACT. When MDX lands in
 *  `content/docs/<slug>`, this array becomes its navigation — so a category
 *  added here without a page is a visible gap rather than a silent one. */
const CATEGORIES = [
  { group: "Start", items: ["Getting started", "Kubernetes", "OpenTelemetry"] },
  { group: "Signals", items: ["Logs", "Metrics", "Traces", "eBPF"] },
  { group: "Query", items: ["PromQL", "SQL"] },
  { group: "Operate", items: ["Deployments", "Alerts", "SLOs", "Retention"] },
  { group: "Platform", items: ["API", "Security", "Architecture", "Troubleshooting"] },
];

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="Documentation"
        lede="Reference and guides. The sections below are the documentation's structure; pages are published as each area of the product ships."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <nav aria-label="Documentation" className="lg:sticky lg:top-24 lg:self-start">
            {CATEGORIES.map((c) => (
              <div key={c.group} className="mb-6">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-fg-subtle)]">
                  {c.group}
                </h2>
                <ul className="mt-2.5 grid list-none gap-1.5 p-0">
                  {c.items.map((i) => (
                    <li key={i} className="text-[13.5px] text-[color:var(--color-fg-muted)]">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="min-w-0">
            <h2 className="text-[22px] font-semibold">Send your first telemetry</h2>
            <p className="mt-2 max-w-[46rem] text-[14px] leading-relaxed text-[color:var(--color-fg-muted)]">
              ClueLake accepts OpenTelemetry over OTLP. If you already run an OpenTelemetry
              Collector, adding an exporter is the whole integration.
            </p>

            <CodeBlock
              className="mt-6"
              label="values.yaml — OpenTelemetry Collector"
              code={`config:
  exporters:
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

            <p className="mt-6 text-[13.5px] text-[color:var(--color-fg-subtle)]">
              The ingest token is issued per environment in the portal and is shown once. It is
              stored only as a hash, so a lost token is replaced rather than recovered.{" "}
              <Link href="/get-started" className="text-[color:var(--color-accent)] hover:underline">
                Full setup
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
