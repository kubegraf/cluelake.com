"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

/**
 * The route-level error boundary.
 *
 * ⚠ THE DIGEST IS SHOWN, THE ERROR IS NOT. `digest` is a server-generated
 * identifier a visitor can quote and we can correlate; the message and stack
 * could carry internals and are never rendered.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(JSON.stringify({ level: "error", msg: "page render failed", digest: error.digest }));
  }, [error]);

  return (
    <Container className="py-24">
      <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[color:var(--color-fg-subtle)]">
        Error
      </p>
      <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.03em]">
        This page didn&apos;t load.
      </h1>
      <p className="mt-4 max-w-[36rem] text-[15px] text-[color:var(--color-fg-muted)]">
        Something failed while rendering. Trying again often works; if it does not, send us the
        reference below and we will find it in our own logs.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-[12px] text-[color:var(--color-fg-subtle)]">
          reference {error.digest}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/contact" variant="secondary">Report it</Button>
      </div>
    </Container>
  );
}
