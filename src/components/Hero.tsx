export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px] animate-drift" />
        <div className="absolute right-[-12%] top-1/3 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px] animate-float-slow" />
      </div>
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[12px] font-medium text-ink-muted backdrop-blur-md">
          <span className="relative grid h-2 w-2 place-items-center"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-60" /><span className="relative h-2 w-2 rounded-full bg-brand-bright" /></span>
          120+ integrations · live in 5 min
        </div>
        <h1 className="mx-auto mt-7 max-w-4xl text-balance text-[44px] font-semibold leading-[1.05] tracking-tight sm:text-[64px] md:text-[78px]">
          Decisions need a lake —{" "}
          <span className="bg-gradient-to-r from-brand-bright via-brand to-accent bg-clip-text text-transparent">not a stream.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-pretty text-[17px] leading-relaxed text-ink-muted sm:text-[19px]">
          ClueLake collects every signal, every metric, every recommendation in one place. Decision intelligence for the data-rich, time-poor.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#cta" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-bg shadow-xl shadow-brand/20 transition-transform hover:scale-[1.02]">Pour into the lake
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-6 py-3.5 text-[15px] font-medium text-ink hover:border-brand/60">See it think</a>
        </div>
      </div>
      <div className="mx-auto mt-20 max-w-5xl px-5 sm:px-8">
        <div className="relative rounded-2xl border border-border-strong bg-bg-elev/70 p-2 backdrop-blur-xl shadow-2xl shadow-brand/10">
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-brand/10 via-transparent to-accent/10 blur-xl" />
          <div className="rounded-xl border border-border bg-bg-soft p-6 sm:p-8">
            <div className="flex items-center gap-2 pb-5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono text-[11px] text-ink-dim">cluelake · ask the lake</span>
            </div>
            <div className="rounded-md border border-border bg-black/40 p-4 font-mono text-[13px]">
              <div className="text-ink-dim">&gt; Should we ship the new pricing this week?</div>
              <div className="mt-3 text-brand">↳ ClueLake</div>
              <div className="mt-1.5 leading-relaxed text-ink">
                <span className="text-ink-muted">87% confidence — </span>
                hold one week. New billing flow shows churn risk in 2 of 3 cohorts.
                <br />
                <span className="text-ink-dim">Signals: Stripe (3), Mixpanel (2), Intercom (1), customer interviews (4).</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="rounded border border-border-strong bg-surface px-2.5 py-1 text-[11px] text-ink-muted">View 10 signals</button>
                <button className="rounded border border-border-strong bg-surface px-2.5 py-1 text-[11px] text-ink-muted">Add to decision diary</button>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Stat tone="brand" k="SIGNALS · 24H" v="184,712" />
              <Stat tone="accent" k="DECISIONS LOGGED" v="1,847" />
              <Stat tone="emerald" k="CONFIDENCE AVG" v="91%" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Stat({ tone, k, v }: { tone: "brand" | "accent" | "emerald"; k: string; v: string }) {
  const t = tone === "brand" ? "from-brand/15 to-brand/0 ring-brand/30" : tone === "accent" ? "from-accent/15 to-accent/0 ring-accent/30" : "from-emerald-500/10 to-emerald-500/0 ring-emerald-500/30";
  return (
    <div className={`rounded-xl bg-gradient-to-br ${t} ring-1 ring-inset p-4`}>
      <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-dim">{k}</div>
      <div className="mt-1.5 text-[22px] font-semibold tracking-tight text-ink">{v}</div>
    </div>
  );
}
