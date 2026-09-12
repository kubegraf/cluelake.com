import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Changelog",
  description: "Changes to ClueLake: new capabilities, improvements and fixes.",
  path: "/changelog",
});

/**
 * ⚠ AN EMPTY STATE, NOT INVENTED HISTORY. Fabricating release notes for
 * versions that never shipped is the kind of detail a careful evaluator checks,
 * and finding it false costs more than an empty page ever would.
 */
export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Changelog"
        title="Changelog"
        lede="Every release is listed here once ClueLake is generally available, grouped as new, improved and fixed."
      />
      <Section>
        <div className="max-w-[46rem] rounded-xl border border-[color:var(--color-line)] p-8 text-center">
          <h2 className="text-[16px] font-semibold">No public releases yet</h2>
          <p className="mx-auto mt-2 max-w-[34rem] text-[13.5px] leading-relaxed text-[color:var(--color-fg-muted)]">
            ClueLake is in development and has not had a public release. Rather than list versions
            that do not exist, this page stays empty until the first one ships.
          </p>
          <p className="mt-5 text-[13.5px]">
            <Link href="/contact" className="text-[color:var(--color-accent)] hover:underline">
              Ask to hear when it does
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
