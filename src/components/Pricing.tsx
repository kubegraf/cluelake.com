const PLANS = [
  { tier: "Free", price: "$0", period: "forever", blurb: "10 integrations, 30-day signal retention.", features: ["10 integrations", "30-day retention", "1 user", "Community support"], cta: "Start free", highlighted: false },
  { tier: "Pro", price: "$99", period: "per month", blurb: "For founders and small teams.", features: ["Unlimited integrations", "1 year retention", "Up to 5 users", "Decision diary", "Email support"], cta: "Choose Pro", highlighted: true },
  { tier: "Team", price: "$299", period: "per month", blurb: "For data-driven teams scaling fast.", features: ["Everything in Pro", "Up to 25 users", "Custom views", "SSO + SAML", "Priority support"], cta: "Choose Team", highlighted: false },
  { tier: "Enterprise", price: "Custom", period: "let's talk", blurb: "For organisations with regional needs.", features: ["Unlimited users", "Dedicated infra", "Region-locked storage", "Dedicated success", "24/7 support"], cta: "Talk to sales", highlighted: false },
];
export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-brand-bright">Pricing</p>
          <h2 className="text-[34px] font-semibold leading-[1.12] tracking-tight sm:text-[44px]">Free until your lake fills up.</h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => (
            <article key={p.tier} className={`relative overflow-hidden rounded-2xl border p-7 ${p.highlighted ? "border-brand bg-gradient-to-br from-brand-soft via-bg-soft to-bg-soft shadow-2xl shadow-brand/15" : "border-border bg-bg-soft"}`}>
              {p.highlighted && (<span className="absolute right-5 top-5 rounded-full border border-brand/40 bg-brand-soft px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-brand-bright">Most chosen</span>)}
              <div className="text-[14px] font-semibold uppercase tracking-[0.16em] text-ink-dim">{p.tier}</div>
              <div className="mt-3 flex items-baseline gap-1.5"><span className="text-[36px] font-semibold tracking-tight">{p.price}</span><span className="text-[13px] text-ink-muted">{p.period}</span></div>
              <p className="mt-2.5 text-[13.5px] text-ink-muted">{p.blurb}</p>
              <ul className="mt-5 space-y-2.5">{p.features.map((f) => (<li key={f} className="flex items-start gap-2 text-[13px] text-ink"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-none text-brand-bright"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>{f}</li>))}</ul>
              <a href="#cta" className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13.5px] font-medium ${p.highlighted ? "bg-ink text-bg" : "border border-border-strong bg-surface text-ink"}`}>{p.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
