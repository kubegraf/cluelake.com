export default function ProductStory() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-brand-bright">The shift</p>
          <h2 className="text-[34px] font-semibold leading-[1.12] tracking-tight sm:text-[48px]">Streams pass you by.<br /><span className="text-ink-muted">Lakes hold the answers.</span></h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Column tone="muted" label="Streaming dashboards" title="Charts you check, then forget." rows={["A dozen tabs, never the same insight twice", "Recommendations buried in tools nobody opens", "Decisions made on intuition, no record kept", "Same bad call, repeated quarterly", "Data heroes who burn out"]} />
          <Column tone="brand" label="With ClueLake" title="A single lake. A clear answer. A kept memory." rows={["Every signal flows in — once, unified", "Ask in plain English; cite signals", "Decisions logged with confidence intervals", "Replay why we shipped, why we didn't", "Knowledge that compounds, not evaporates"]} />
        </div>
      </div>
    </section>
  );
}
function Column({ tone, label, title, rows }: { tone: "muted" | "brand"; label: string; title: string; rows: string[] }) {
  const isBrand = tone === "brand";
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-7 sm:p-9 ${isBrand ? "border-brand/30 bg-gradient-to-br from-brand-soft to-transparent" : "border-border bg-bg-soft"}`}>
      <div className={`text-[11.5px] font-semibold uppercase tracking-[0.18em] ${isBrand ? "text-brand-bright" : "text-ink-dim"}`}>{label}</div>
      <h3 className={`mt-3 text-[22px] font-semibold leading-snug tracking-tight ${isBrand ? "text-ink" : "text-ink-muted"}`}>{title}</h3>
      <ul className="mt-6 space-y-3.5">
        {rows.map((r) => (
          <li key={r} className={`flex items-start gap-3 text-[14.5px] ${isBrand ? "text-ink" : "text-ink-muted"}`}>
            <span className={`mt-1 grid h-4 w-4 flex-none place-items-center rounded-full ${isBrand ? "bg-brand-bright/20 text-brand-bright" : "bg-bg-elev text-ink-dim"}`}>
              {isBrand ? (<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>) : (<span className="block h-1 w-2 rounded bg-current" />)}
            </span>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
