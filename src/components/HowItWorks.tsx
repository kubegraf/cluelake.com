const STEPS = [
  { n: "01", title: "Connect signals", body: "Wire up your tools, warehouse, docs and conversations. ClueLake unifies them — read-only, secure." },
  { n: "02", title: "Ask the lake", body: "Type a real question — pricing, churn, hiring. ClueLake answers with confidence and cited signals." },
  { n: "03", title: "Decide with memory", body: "Log the call. Replay it next quarter. Stop re-litigating the same debates." },
];
export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-accent">Three steps</p>
          <h2 className="text-[34px] font-semibold leading-[1.12] tracking-tight sm:text-[44px]">From data to <span className="bg-gradient-to-r from-brand-bright to-accent bg-clip-text text-transparent">decision</span> in minutes.</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <article key={s.n} className="relative rounded-2xl border border-border bg-bg-soft p-7 hover:-translate-y-0.5 hover:border-accent/40 transition-all">
              <div className="font-mono text-[13px] tracking-[0.18em] text-brand-bright">{s.n}</div>
              <h3 className="mt-3 text-[20px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
