import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { PricingMeters } from "@/components/sections/PricingMeters";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Usage-based pricing for ClueLake: ingest, retention, active series and query usage, with cost controls applied before data is stored.",
  path: "/pricing",
});

const FAQ = [
  { q: "Why usage-based rather than per host?", a: "Per-host pricing charges the same for a quiet service and a noisy one, and it stops reflecting cost as soon as workloads are packed densely. Metering what actually costs us money — bytes accepted, bytes retained, series held — is the only model where the bill is predictable from what you send." },
  { q: "What stops a bad deploy producing a large bill?", a: "Cardinality budgets and attribute policy are enforced as data arrives, not reconciled afterwards. An over-budget series is refused by name and surfaced in the portal, so the first place you hear about a runaway label is the product rather than the invoice." },
  { q: "Are queries billed?", a: "Query usage is metered, and every query is costed before it runs. An expensive query is refused with its estimate rather than executed and charged for." },
  { q: "Can I keep my existing tooling?", a: "Yes. ClueLake ingests OpenTelemetry and speaks PromQL for the supported query set, so existing dashboards and alert rules can keep working while telemetry lands here." },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Usage-based, and predictable before the invoice."
        lede="You pay for what you send and keep. The controls that decide how much that is are part of the product rather than an afterthought."
      />
      <PricingMeters />
      <Section>
        <SectionHeading as="h2" title="Questions" />
        <dl className="mt-8 grid max-w-[52rem] gap-6">
          {FAQ.map((f) => (
            <div key={f.q}>
              <dt className="text-[15px] font-semibold">{f.q}</dt>
              <dd className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <FinalCta />
    </>
  );
}
