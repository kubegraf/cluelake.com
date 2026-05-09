type Icon = "lake" | "ai" | "diary" | "plug" | "view" | "obs";
const FEATURES: { icon: Icon; title: string; body: string }[] = [
  { icon: "lake", title: "Signal lake", body: "Every metric, log, comment, deal, customer note — flowing into one queryable lake." },
  { icon: "ai", title: "AI recommendations", body: "Ask a question, get a confidence-scored answer with cited signals — not vibes." },
  { icon: "diary", title: "Decision diary", body: "Capture the why behind each call. Replay, audit, learn. The knowledge that compounds." },
  { icon: "plug", title: "120+ integrations", body: "Stripe, Mixpanel, Salesforce, GitHub, Notion, Slack, your warehouse — all in 5 minutes." },
  { icon: "view", title: "Custom views", body: "Tail-the-lake views for ops, exec, product. Each role sees the signals they need, no more." },
  { icon: "obs", title: "Observability", body: "Watch your signals' health. Pipeline broken? Bias detected? Get a ping before the next decision." },
];
export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-accent">Capabilities</p>
          <h2 className="text-[34px] font-semibold leading-[1.12] tracking-tight sm:text-[44px]">Six surfaces. One lake.</h2>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="group relative overflow-hidden rounded-2xl border border-border bg-bg-soft p-7 transition-all hover:border-brand/40 hover:bg-bg-elev">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand-bright ring-1 ring-inset ring-brand/30"><Ico name={f.icon} /></div>
              <h3 className="mt-5 text-[18px] font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Ico({ name }: { name: Icon }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "lake": return (<svg {...p}><path d="M2 17a4 4 0 0 1 8 0 4 4 0 0 0 8 0 4 4 0 0 1 4 0M2 12a4 4 0 0 1 8 0 4 4 0 0 0 8 0 4 4 0 0 1 4 0M2 7a4 4 0 0 1 8 0 4 4 0 0 0 8 0 4 4 0 0 1 4 0" /></svg>);
    case "ai": return (<svg {...p}><circle cx="12" cy="12" r="9" /><path d="M9 9h6M9 13h6M9 17h4" /></svg>);
    case "diary": return (<svg {...p}><path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4zm0 0v16M8 8h8M8 12h6" /></svg>);
    case "plug": return (<svg {...p}><circle cx="12" cy="12" r="3" /><circle cx="4" cy="4" r="2" /><circle cx="20" cy="4" r="2" /><circle cx="4" cy="20" r="2" /><circle cx="20" cy="20" r="2" /><path d="M5.5 5.5L9.5 9.5M18.5 5.5l-4 4M5.5 18.5L9.5 14.5M18.5 18.5l-4-4" /></svg>);
    case "view": return (<svg {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>);
    case "obs": return (<svg {...p}><circle cx="12" cy="12" r="3" /><path d="M3 12c2-5 5-7 9-7s7 2 9 7c-2 5-5 7-9 7s-7-2-9-7z" /></svg>);
  }
}
