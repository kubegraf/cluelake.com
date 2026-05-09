export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-gradient-to-br from-bg-elev via-bg-soft to-bg-soft p-10 text-center sm:p-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl animate-drift" />
            <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl animate-float-slow" />
          </div>
          <h2 className="text-balance text-[36px] font-semibold leading-[1.1] tracking-tight sm:text-[52px]">Pour your data.<br /><span className="bg-gradient-to-r from-brand-bright to-accent bg-clip-text text-transparent">Drink the answers.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">Live in 5 minutes. Free for solo founders. Pay only when your lake matters.</p>
          <form className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
            <input type="email" required placeholder="you@company.com" className="flex-1 rounded-full border border-border-strong bg-surface px-5 py-3.5 text-[14.5px] text-ink placeholder:text-ink-dim outline-none focus:border-brand" />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14.5px] font-medium text-bg transition-transform hover:scale-[1.02]">Pour into the lake<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          </form>
        </div>
      </div>
    </section>
  );
}
