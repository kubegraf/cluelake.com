import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/lib/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Company",
  description: `ClueLake is a product of ${site.company} — deployment-aware observability for Kubernetes.`,
  path: "/company",
});

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Company"
        title={`ClueLake is a product of ${site.company}.`}
        lede="We build infrastructure software. ClueLake came out of running production Kubernetes and repeatedly answering the same question by hand."
      />
      <Section>
        <SectionHeading as="h2" title="Why this exists" />
        <div className="mt-6 grid max-w-[46rem] gap-4 text-[14.5px] leading-relaxed text-[color:var(--color-fg-muted)]">
          <p>
            Every production incident we handled started the same way: a chart moved, and the next
            forty minutes went on establishing what had shipped. The telemetry and the deployment
            history were both available. They were in different systems, joined by whoever
            remembered.
          </p>
          <p>
            ClueLake is that join, made part of the data model rather than part of the on-call
            engineer&apos;s memory. Deployment, image digest, build and commit are attached to
            telemetry as it arrives, so the question is a query.
          </p>
          <p>
            We are early and we would rather say so than imply otherwise. There are no customer
            logos on this site because there is nothing yet we have permission to show, and no
            benchmarks because we have not published ones we can stand behind.
          </p>
        </div>
        <p className="mt-8 text-[14px]">
          <Link href="/contact" className="text-[color:var(--color-accent)] hover:underline">
            Get in touch
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
