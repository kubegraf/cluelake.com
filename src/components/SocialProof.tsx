const STATS = [{ v: "8B+", k: "signals indexed" }, { v: "120+", k: "integrations" }, { v: "91%", k: "decisions hit ahead of plan" }, { v: "5 min", k: "to first answer" }];
const QUOTES = [
  { quote: "We retired four dashboards. ClueLake is the only one we still open — because it's the one that answers.", name: "Jonas K.", role: "Head of Product · Series B" },
  { quote: "The decision diary changed our exec meetings. We cite past calls instead of re-debating them.", name: "Mei C.", role: "Founder · CTO" },
  { quote: "We caught a churn cohort 6 weeks earlier. Saved us a quarter of revenue. Pays for itself in a Tuesday.", name: "Andrei V.", role: "VP Ops · SaaS" },
];
export default function SocialProof() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-4 rounded-3xl border border-border bg-gradient-to-br from-brand-soft via-bg-soft to-bg-soft p-8 sm:grid-cols-4 sm:p-10">
          {STATS.map((s) => (<div key={s.k} className="text-center sm:text-left"><div className="text-[34px] font-semibold tracking-tight text-ink sm:text-[40px]">{s.v}</div><div className="mt-1 text-[12.5px] font-medium uppercase tracking-[0.16em] text-ink-dim">{s.k}</div></div>))}
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.name} className="rounded-2xl border border-border bg-bg-soft p-7">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-brand-bright/70"><path d="M9.4 7H5a3 3 0 0 0-3 3v6h6v-6H5a4 4 0 0 1 4.4-3zm10 0H15a3 3 0 0 0-3 3v6h6v-6h-3a4 4 0 0 1 4.4-3z" /></svg>
              <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">"{q.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-accent text-[12px] font-semibold text-white">{q.name.charAt(0)}</span>
                <div><div className="text-[13.5px] font-medium text-ink">{q.name}</div><div className="text-[12px] text-ink-dim">{q.role}</div></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
