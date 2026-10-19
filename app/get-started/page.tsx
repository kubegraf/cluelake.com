import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Get started",
  description: "Two ways to run ClueLake: the hosted service, or self-hosted in your own cluster. Create a workspace, install the collector and send your first OpenTelemetry data.",
  path: "/get-started",
  noIndex: true,
});

/*
 * ⚠ EVERY COMMAND AND VALUE ON THIS PAGE IS CHECKED AGAINST kubegraf/cluelake.
 *
 * This page used to tell people to `helm repo add https://charts.cluelake.com`,
 * install `cluelake/collector` and set `endpoint` and `existingSecret`. The
 * hostname does not resolve, the chart is `cluelake-collector`, its keys are
 * under `cluelake.*` (so the old `--set` flags were silently ignored) and
 * `cluelake.clusterName` is required, so the install failed outright.
 *
 * The chart is not on a public repository. It is shared with each customer
 * when access is granted, which is why the command below installs from a
 * local path rather than naming a repository. Change that line only when a
 * repository a customer can actually reach exists.
 *
 * The gateway speaks OTLP/HTTP and Prometheus remote_write. It has no
 * OTLP/gRPC listener (gRPC on 4317 exists only on the in-cluster collector),
 * so do not tell people to export to ClueLake directly over gRPC.
 */
const STEPS = [
  { n: 1, title: "Create a workspace", body: "A workspace is the tenancy boundary. Telemetry, policy and billing all belong to it. Sign in to the Console with your account, then create an organisation and a workspace." },
  { n: 2, title: "Create an environment and an ingest key", body: "Production, staging, whatever you run. In the Console, open Settings and create an ingest key for the environment. It starts with cl_ingest_ and is shown once. It is stored only as a hash, so a lost key is replaced rather than recovered." },
  { n: 3, title: "Install the collector", body: "A standard OpenTelemetry Collector, packaged as the cluelake-collector Helm chart. It runs a node agent for pod logs, kubelet metrics and application OTLP, plus one cluster collector for Kubernetes state and events. We share the chart with you when access is granted." },
  { n: 4, title: "Send OTLP", body: "Point your applications at the collector in the cluster. If you already run an OpenTelemetry Collector, you can export to ClueLake directly over OTLP/HTTP instead. Prometheus remote_write is accepted too." },
  { n: 5, title: "See telemetry", body: "The Console shows what has arrived, what policy refused and why. A cluster appears there once its first data arrives." },
];

export default function GetStartedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get started"
        title="From nothing to first telemetry."
        lede="ClueLake runs two ways: as a hosted service, or self-hosted in your own cluster. The steps are the same for both. The key and endpoint come from your workspace and are never printed on this page."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[color:var(--color-line)] p-5">
            <h2 className="text-[15px] font-semibold">Hosted</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">
              We run ClueLake for you. Access is by invitation while we onboard the first customers.
              Your collector sends to <span className="font-mono">https://ingest.cluelake.com</span>.{" "}
              <Link href="/contact" className="text-[color:var(--color-accent)] hover:underline">Ask for access</Link>
              {" "}or{" "}
              <a href={site.consoleUrl} className="text-[color:var(--color-accent)] hover:underline">sign in</a>.
            </p>
          </div>
          <div className="rounded-xl border border-[color:var(--color-line)] p-5">
            <h2 className="text-[15px] font-semibold">Self-hosted</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">
              The same platform as a Helm chart in your own Kubernetes cluster, with your own
              ClickHouse and PostgreSQL. Your telemetry never leaves your network. The chart and the
              install guide are shared with customers.{" "}
              <Link href="/contact" className="text-[color:var(--color-accent)] hover:underline">Talk to us</Link>.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading as="h2" title="The steps" />
        <ol className="mt-8 grid list-none gap-8 p-0">
          {STEPS.map((s) => (
            <li key={s.n} className="grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)]">
              <span className="font-mono text-[13px] text-[color:var(--color-fg-subtle)]">
                {String(s.n).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-[16px] font-semibold">{s.title}</h3>
                <p className="mt-1.5 max-w-[44rem] text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">
                  {s.body}
                </p>

                {s.n === 3 ? (
                  <CodeBlock
                    className="mt-4"
                    label="install the collector"
                    code={`# The key is read from a Secret you create. It is never passed on the
# command line, where it would land in your shell history.
kubectl create namespace observability
kubectl create secret generic cluelake-ingest \\
  --namespace observability \\
  --from-literal=token="$CLUELAKE_INGEST_KEY"

# ./cluelake-collector is the chart we share with you.
# clusterName is required: it is the name this cluster shows under.
# Self-hosted: set cluelake.endpoint to your own ingest address.
helm upgrade --install cluelake-collector ./cluelake-collector \\
  --namespace observability \\
  --set cluelake.clusterName=prod-eu-west-1 \\
  --set cluelake.endpoint=https://ingest.cluelake.com \\
  --set cluelake.auth.existingSecret=cluelake-ingest \\
  --set cluelake.auth.existingSecretKey=token`}
                  />
                ) : null}

                {s.n === 4 ? (
                  <CodeBlock
                    className="mt-4"
                    label="application environment"
                    code={`OTEL_EXPORTER_OTLP_ENDPOINT=http://cluelake-collector-agent.observability:4318
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
          Sign-up is not open yet. Hosted access is by invitation and the collector chart is shared
          with each customer. A public chart repository comes with the first general release.
        </p>
      </Section>
    </>
  );
}
