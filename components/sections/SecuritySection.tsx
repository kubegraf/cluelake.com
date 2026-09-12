import { Section, SectionHeading } from "@/components/ui/Section";

const PRINCIPLES = [
  { title: "Tenant isolation", body: "The workspace is the first key of every telemetry table, so tenancy is a property of the storage rather than a filter a query has to remember." },
  { title: "Scoped credentials", body: "Ingest, query and automation keys are separate, bound to a workspace, and stored only as hashes. Tenancy is resolved from the credential, never from the payload." },
  { title: "Controlled query access", body: "SQL is read-only and validated, with the tenant predicate injected by the server. Customers never receive database credentials." },
  { title: "Encrypted connections", body: "TLS in transit throughout, with private networking between the control plane and its databases." },
  { title: "Role-based permissions", body: "Owner, admin, member and viewer roles across organisations and workspaces." },
  { title: "Audit logging", body: "Sign-in, credential and configuration changes are recorded append-only, enforced by the database rather than by application code." },
  { title: "Configurable retention", body: "Retention is policy, set per environment, and applied by the storage engine." },
  { title: "Redaction policies", body: "Deterministic attribute allow and deny lists, applied before storage. Sensitive headers are removed rather than the event being discarded." },
];

export function SecuritySection() {
  return (
    <Section id="security">
      <SectionHeading
        eyebrow="Security"
        title="Built for production telemetry."
        lede="Telemetry contains more about a business than most databases do. These are the architectural properties ClueLake is built on."
      />
      <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {PRINCIPLES.map((p) => (
          <div key={p.title}>
            <h3 className="text-[14.5px] font-semibold">{p.title}</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
