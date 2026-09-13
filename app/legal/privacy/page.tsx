import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  // ⚠ BACKTICKS. This was a double-quoted string, so `${site.company}` was
  // never interpolated and the literal text shipped in the meta description,
  // the og:description and the Twitter card — on one of the two pages a
  // procurement reviewer actually opens, and it is what Google indexed.
  description: `Privacy for ClueLake, a product of ${site.company}.`,
  path: "/legal/privacy",
});

/**
 * ⚠ NO INVENTED LEGAL TEXT. A privacy policy or terms of service is a binding
 * document; generating plausible-sounding clauses would create obligations
 * nobody at the company has read or agreed to. This states the position
 * honestly until counsel provides the real thing.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy" />
      <Section>
        <div className="max-w-[44rem] rounded-xl border border-[color:var(--color-line)] p-6">
          <p className="text-[14px] leading-relaxed text-[color:var(--color-fg-muted)]">
            ClueLake is a product of {site.company} and is in development. Our Privacy
            {" "}Policy will be published here before the product is generally available.
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--color-fg-muted)]">
            If you need this document as part of an evaluation,{" "}
            <Link href="/contact" className="text-[color:var(--color-accent)] hover:underline">
              contact us
            </Link>{" "}
            and we will tell you where it stands.
          </p>
        </div>
      </Section>
    </>
  );
}
