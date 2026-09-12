import { WhatChangedPanel } from "@/components/product/WhatChangedPanel";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";

const PROOF = ["Built for Kubernetes", "OpenTelemetry-native", "PromQL for the supported query set"];

export function Hero() {
  return (
    <section className="grid-field border-b border-[color:var(--color-line)] py-14 sm:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div>
            <Eyebrow>Deploy-aware observability</Eyebrow>
            <h1 className="mt-4 text-[clamp(2.7rem,7vw,4.6rem)] font-semibold tracking-[-0.036em]">
              Know what
              <br />
              changed.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[18px] leading-relaxed text-[color:var(--color-fg-muted)]">
              ClueLake connects logs, metrics, traces and Kubernetes context so you can move
              from a production regression to the deployment that caused it.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/get-started">Get started</Button>
              <Button href="#what-changed" variant="secondary">See how it works</Button>
            </div>

            <ul className="mt-8 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
              {PROOF.map((p) => (
                <li key={p} className="font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* ⚠ THE PRODUCT, NOT AN ILLUSTRATION. Built from the same components
              used elsewhere on the site, so what a visitor evaluates is the real
              interface rather than a drawing of one. */}
          <WhatChangedPanel />
        </div>
      </Container>
    </section>
  );
}
