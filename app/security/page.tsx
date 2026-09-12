import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Security",
  description: "ClueLake's security model: tenant isolation, authentication, authorization, encryption, audit logging, retention and data residency.",
  path: "/security",
});

const DETAIL = [
  { title: "Data isolation", body: "Every telemetry table is sorted and partitioned by workspace first. Queries have the tenant predicate injected server-side; customers never hold database credentials." },
  { title: "Authentication", body: "Sessions for people, and scoped keys for machines. Keys are stored as hashes with a non-secret prefix kept for display, so a key can be identified in a list without holding anything that authenticates." },
  { title: "Authorization", body: "Owner, admin, member and viewer roles across organisations and workspaces, checked server-side on every request." },
  { title: "Encryption", body: "TLS in transit. Databases are on private networking and are never exposed to the public internet." },
  { title: "API security", body: "Rate limits per organisation, workspace and key. SQL is read-only and validated by a parser rather than by string matching." },
  { title: "Secrets", body: "Held in a managed secret store and injected at runtime. Nothing sensitive is committed, logged, or placed in a URL." },
  { title: "Audit logs", body: "Append-only, enforced by database triggers rather than by application code, so the record survives a compromised service account." },
  { title: "Retention", body: "Configurable per environment and applied by the storage engine, so deletion is a property of the data rather than a job that might not run." },
  { title: "Data residency", body: "Workspaces carry a region. Telemetry is not moved between regions implicitly." },
  { title: "Infrastructure", body: "Least-privilege IAM, network policy between components, non-root containers and read-only root filesystems where practical." },
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Security"
        title="Security model"
        lede="Telemetry contains more about a business than most databases do. This page describes how ClueLake is built, not a compliance position."
      />
      <SecuritySection />
      <Section>
        <SectionHeading as="h2" title="In detail" />
        <div className="mt-8 grid gap-x-10 gap-y-7 lg:grid-cols-2">
          {DETAIL.map((d) => (
            <div key={d.title}>
              <h3 className="text-[15px] font-semibold">{d.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        {/* ⚠ STATED PLAINLY RATHER THAN OMITTED. A security page with no mention
            of certification invites the assumption that there is one. */}
        <div className="max-w-[46rem] rounded-xl border border-[color:var(--color-line)] p-5">
          <h2 className="text-[15px] font-semibold">Certifications</h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">
            ClueLake does not currently hold SOC 2, ISO 27001 or HIPAA attestation, and this page
            makes no claim to any. The architectural controls above are what exists today. If a
            formal attestation is a requirement for your evaluation, get in touch and we will tell
            you where things actually stand.
          </p>
        </div>
      </Section>
    </>
  );
}
