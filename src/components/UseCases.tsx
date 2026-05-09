const CASES = [
  { title: "Founders", body: "Cofounder-grade clarity, without hiring a chief of staff. Ask the lake, share the answer.", items: ["Daily exec digest", "Cross-functional clarity", "Decision audit trail"] },
  { title: "Operations", body: "Run a tighter weekly op-rev. Bottlenecks surface before they hurt; capacity decisions come with proof.", items: ["Cross-team signals", "Capacity forecasting", "Operating cadence"] },
  { title: "Analytics", body: "Stop building one-shot dashboards. ClueLake routes the work, captures the answers, compounds the knowledge.", items: ["Self-serve queries", "Knowledge graph", "Pipeline observability"] },
  { title: "Product teams", body: "Ship fewer, ship right. Confidence-backed launches and post-mortems that actually change behaviour.", items: ["Confidence scores", "Cohort signals", "Decision replay"] },
];
export default function UseCases() {
  return (
    <section id="use" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-accent">Where it fits</p>
          <h2 className="text-[34px] font-semibold leading-[1.12] tracking-tight sm:text-[44px]">Built for every team that decides.</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {CASES.map((c) => (
            <article key={c.title} className="group relative overflow-hidden rounded-2xl border border-border bg-bg-soft p-8 transition-all hover:border-accent/40">
              <h3 className="text-[22px] font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">{c.body}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">{c.items.map((it) => (<li key={it} className="flex items-start gap-2 text-[13.5px] text-ink-muted"><span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />{it}</li>))}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
