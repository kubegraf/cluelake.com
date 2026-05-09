const ITEMS = [
  { k: "Signal lake", v: "Every metric, log, comment, deal, customer note — flowing into one queryable lake. Versioned. Auditable.", aside: "120+ sources" },
  { k: "AI recommendations", v: "Ask in plain English. Get a confidence score and a list of cited signals. No hallucinations because we ground every answer.", aside: "200ms median" },
  { k: "Decision diary", v: "Every call you make is logged with the why. Replay it next quarter. Stop re-litigating the same debates.", aside: "Replayable" },
  { k: "Custom views", v: "Each role gets the lake they need — exec, ops, product. Saved queries, scheduled, embeddable in Notion.", aside: "Embeddable" },
  { k: "Pipeline observability", v: "Watch your signals' health. Pipeline broken? Bias detected? You'll know before the next decision is made.", aside: "Always-on" },
  { k: "Region-locked storage", v: "Your lake stays where it lives. Never copies to us. EU, US, SG residencies. SOC 2 + ISO 27001.", aside: "Sovereign" },
];

export default function Capabilities() {
  return (
    <div className="space-y-10">
      <p className="max-w-prose text-[16px] leading-relaxed text-ink-muted">
        A stream is what dashboards give you: a column of charts that pass by until your tab is dead. A lake holds. You can revisit it, swim through it, ask it new questions in five years. ClueLake is built like a research library — for decisions.
      </p>

      <ul className="divide-y divide-rule">
        {ITEMS.map((it, i) => (
          <li key={it.k} className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-baseline gap-5 py-6">
            <span className="font-mono text-[11px] text-ink-dim">{String(i + 1).padStart(2, "0")}.</span>
            <div>
              <h3 style={{ fontFamily: "var(--font-serif)" }} className="text-[20px] font-medium tracking-[-0.01em]">
                {it.k}
              </h3>
              <p className="mt-1.5 max-w-prose text-[14.5px] leading-relaxed text-ink-muted">{it.v}</p>
            </div>
            <span className="hidden font-mono text-[11px] text-cyan-bright sm:inline">{it.aside}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
