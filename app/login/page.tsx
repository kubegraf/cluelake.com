import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Sign in",
  description: "Sign in to ClueLake.",
  path: "/login",
  noIndex: true,
});

/**
 * ⚠ NO CREDENTIAL FORM UNTIL THERE IS SOMETHING TO AUTHENTICATE AGAINST. A
 * marketing site that renders a password field which cannot sign anybody in
 * trains people to type credentials into a page that does not handle them.
 */
export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sign in"
        title="The ClueLake console is not open yet."
        lede="Sign-in will live here once the product is generally available. The console is a separate application; this page will redirect to it."
      />
      <Section>
        <p className="max-w-[40rem] text-[14px] text-[color:var(--color-fg-muted)]">
          If you are evaluating ClueLake and need access,{" "}
          <Link href="/contact" className="text-[color:var(--color-accent)] hover:underline">
            get in touch
          </Link>{" "}
          — or read{" "}
          <Link href="/get-started" className="text-[color:var(--color-accent)] hover:underline">
            how it installs
          </Link>{" "}
          first.
        </p>
      </Section>
    </>
  );
}
