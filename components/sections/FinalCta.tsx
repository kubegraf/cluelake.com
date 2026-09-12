import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export function FinalCta() {
  return (
    <section className="grid-field border-t border-[color:var(--color-line)] py-20">
      <Container>
        <div className="max-w-[40rem]">
          <h2 className="text-[clamp(2rem,4.5vw,3.1rem)] font-semibold tracking-[-0.03em]">
            Stop asking what broke.
          </h2>
          <p className="mt-3 text-[clamp(1.25rem,2.6vw,1.75rem)] text-[color:var(--color-fg-muted)]">
            Start with what changed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/get-started">Get started</Button>
            <Button href="/architecture" variant="secondary">Explore the architecture</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
