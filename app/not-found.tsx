import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

/** ⚠ IT SAYS WHAT HAPPENED AND OFFERS A ROUTE OUT. "Something went wrong" tells
 *  a visitor nothing they did not already know. */
export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[color:var(--color-fg-subtle)]">
        404
      </p>
      <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.03em]">
        This page does not exist.
      </h1>
      <p className="mt-4 max-w-[36rem] text-[15px] text-[color:var(--color-fg-muted)]">
        The link may be out of date, or the page may have moved. Everything ClueLake publishes is
        reachable from the navigation above.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Back to the homepage</Button>
        <Button href="/docs" variant="secondary">Documentation</Button>
      </div>
      <p className="mt-6 text-[13.5px] text-[color:var(--color-fg-subtle)]">
        If you followed a link from elsewhere on this site,{" "}
        <Link href="/contact" className="text-[color:var(--color-accent)] hover:underline">tell us</Link>{" "}
        — that one is ours to fix.
      </p>
    </Container>
  );
}
