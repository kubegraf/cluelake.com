import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/Section";

/** The masthead every inner page opens with. One component, so page headers
 *  cannot drift into six different vertical rhythms. */
export function PageHeader({
  eyebrow, title, lede,
}: { eyebrow: string; title: string; lede?: ReactNode }) {
  return (
    <section className="grid-field border-b border-[color:var(--color-line)] py-14 sm:py-20">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-[24ch] text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-[-0.032em]">
          {title}
        </h1>
        {lede ? (
          <p className="mt-5 max-w-[46rem] text-[17px] leading-relaxed text-[color:var(--color-fg-muted)]">
            {lede}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
