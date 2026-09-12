import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Get started",
  description: "Create a workspace, install the collector and send your first OpenTelemetry data to ClueLake.",
  path: "/get-started",
  noIndex: true,
});

const STEPS = [
  { n: 1, title: "Create a workspace", body: "A workspace is the tenancy boundary: telemetry, policy, retention and billing all belong to it. Pick the region it should live in — telemetry is not moved between regions." },
  { n: 2, title: "Create an environment", body: "Production, staging, whatever you run. Retention and cardinality budgets are set per environment, so staging need not be kept as long as production." },
  { n: 3, title: "Install the collector", body: "A standard OpenTelemetry Collector with a ClueLake exporter. If you already run one, this is an exporter block rather than a new component." },
  { n: 4, title: "Send OTLP", body: "Point your applications at the collector, or export to ClueLake directly over OTLP/HTTP or OTLP/gRPC." },
  { n: 5, title: "See telemetry", body: "The portal shows what has arrived, what policy refused and why. If nothing is arriving, it says which step is silent instead of showing an empty chart." },
];

export default function GetStartedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get started"
        title="From nothing to first telemetry."
        lede="Five steps. The commands below are the real ones; the token and endpoint come from your workspace and are never printed on this page."
      />

      <Section>
        <ol className="grid list-none gap-8 p-0">
          {STEPS.map((s) => (
            <li key={s.n} className="grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)]">
              <span className="font-mono text-[13px] text-[color:var(--color-fg-subtle)]">
                {String(s.n).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h2 className="text-[16px] font-semibold">{s.title}</h2>
                <p className="mt-1.5 max-w-[44rem] text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">
                  {s.body}
                </p>

                {s.n === 3 ? (
                  <CodeBlock
                    className="mt-4"
                    label="install the collector"
                    code={`helm repo add cluelake https://charts.cluelake.com
helm repo update

# ⚠ The token is read from a Secret you create — never passed on the
# command line, where it would land in your shell history.
kubectl create secret generic cluelake-ingest \\
  --namespace observability \\
  --from-literal=token="$CLUELAKE_INGEST_TOKEN"

helm upgrade --install cluelake-collector cluelake/collector \\
  --namespace observability --create-namespace \\
  --set endpoint="$CLUELAKE_ENDPOINT" \\
  --set existingSecret=cluelake-ingest`}
                  />
                ) : null}

                {s.n === 4 ? (
                  <CodeBlock
                    className="mt-4"
                    label="application environment"
                    code={`OTEL_EXPORTER_OTLP_ENDPOINT=http://cluelake-collector.observability:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
OTEL_SERVICE_NAME=checkout
OTEL_RESOURCE_ATTRIBUTES=deployment.environment=production`}
                  />
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-[44rem] text-[13px] leading-relaxed text-[color:var(--color-fg-subtle)]">
          ClueLake is in development and sign-up is not open yet. The steps above are how it
          installs; the endpoint and chart repository become available with the first release.
        </p>
      </Section>
    </>
  );
}
