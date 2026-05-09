import type { ReactNode } from "react";

interface Props {
  num: string;
  title: string;
  kicker?: string;
  paper?: boolean;
  children: ReactNode;
}

export default function Chapter({ num, title, kicker, paper, children }: Props) {
  const id = num.replace(/[^\d]/g, "");
  return (
    <section
      id={id}
      className={`relative border-b ${paper ? "paper border-rule-paper" : "border-rule"}`}
    >
      <div className="grid gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14 lg:px-14 lg:py-28">
        <header className="lg:sticky lg:top-24 lg:self-start">
          <div
            className={`eyebrow ${paper ? "text-ink-paper-muted" : "text-cyan-bright"}`}
          >
            {num}
            {kicker && <span className="ml-3 opacity-70">· {kicker}</span>}
          </div>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="mt-4 text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-balance sm:text-[36px] lg:text-[40px]"
          >
            {title}
          </h2>
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}
