import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1160px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id, children, className, bordered = true,
}: { id?: string; children: ReactNode; className?: string; bordered?: boolean }) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        bordered && "border-t border-[color:var(--color-line)]",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[color:var(--color-fg-subtle)]">
      {children}
    </p>
  );
}

/**
 * ⚠ `as` EXISTS SO HEADING LEVEL AND VISUAL SIZE CAN DIFFER. A page needs one
 * h1 and a sensible outline beneath it; a section sometimes needs big type that
 * is an h2 or an h3. Tying size to level produces either a broken outline or
 * the wrong visual weight, and screen-reader users get the broken one.
 */
export function SectionHeading({
  eyebrow, title, lede, as: As = "h2", className,
}: {
  eyebrow?: string; title: ReactNode; lede?: ReactNode;
  as?: "h1" | "h2" | "h3"; className?: string;
}) {
  return (
    <div className={cn("max-w-[46rem]", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <As
        className={cn(
          "mt-3 font-semibold tracking-[-0.028em]",
          As === "h1"
            ? "text-[clamp(2.6rem,6vw,4.4rem)] tracking-[-0.035em]"
            : "text-[clamp(1.7rem,3.6vw,2.5rem)]",
        )}
      >
        {title}
      </As>
      {lede ? (
        <p className="mt-4 text-[17px] leading-relaxed text-[color:var(--color-fg-muted)]">{lede}</p>
      ) : null}
    </div>
  );
}
