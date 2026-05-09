interface Entry {
  date: string;
  who: string;
  call: string;
  why: string;
  result: { kind: "ahead" | "ontrack" | "miss"; label: string };
  signals: number;
}

const ENTRIES: Entry[] = [
  {
    date: "2026·02·14",
    who: "Mei C., founder",
    call: "Hold the pricing change one week",
    why: "Two of three cohorts showed early churn signal post-billing-flow change. Sales lead corroborated.",
    result: { kind: "ahead", label: "saved 6.2% MRR" },
    signals: 10,
  },
  {
    date: "2026·02·22",
    who: "Jonas K., product",
    call: "Ship search v2 to 100% in EU only",
    why: "Adoption was strongest there; risk of NA backlash flagged in support tickets.",
    result: { kind: "ontrack", label: "+18% adoption · 0 spike" },
    signals: 7,
  },
  {
    date: "2026·03·04",
    who: "Andrei V., ops",
    call: "Pause hiring 3 of 4 open roles",
    why: "Capacity model shows 2-quarter overhang vs. the deal pipeline. Worth re-checking April.",
    result: { kind: "ontrack", label: "burn down · runway +4mo" },
    signals: 12,
  },
  {
    date: "2026·03·18",
    who: "Mei C., founder",
    call: "Greenlight enterprise tier",
    why: "5 inbound, 3 with security review begun. Pricing band at $50K/yr supportable.",
    result: { kind: "ahead", label: "$240K ARR week 1" },
    signals: 8,
  },
];

export default function DecisionDiary() {
  return (
    <div className="space-y-10">
      <p className="max-w-prose text-[16px] leading-relaxed">
        A real decision diary, sampled from a real lake. Every entry is a call we made, the evidence we made it on, and the result. It compounds — the kind of memory that makes a small team feel like a big one.
      </p>

      <ol className="border border-rule-paper">
        {ENTRIES.map((e, i) => (
          <li key={i} className={`grid gap-3 px-5 py-5 sm:grid-cols-[110px_minmax(0,1.4fr)_minmax(0,1fr)_120px] sm:gap-6 ${i > 0 ? "border-t border-rule-paper" : ""}`}>
            <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] ink-muted">
              {e.date}
              <div className="mt-1 normal-case">{e.who}</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)" }} className="text-[18px] font-medium leading-snug">
                {e.call}
              </div>
              <div className="mt-1 text-[13px] leading-relaxed ink-muted">{e.why}</div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] ink-muted">
                <Glyph kind={e.result.kind} /> {e.result.kind}
              </span>
              <span className="text-[13px]">{e.result.label}</span>
            </div>
            <div className="flex items-center justify-end gap-2 font-mono text-[12px] ink-muted">
              <span className="inline-flex h-6 items-center px-2 ring-1 ring-rule-paper">
                {e.signals} signals
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat k="Decisions logged" v="1,847" />
        <Stat k="Hit ahead of plan" v="91%" />
        <Stat k="Replays / month" v="612" />
      </div>
    </div>
  );
}

function Glyph({ kind }: { kind: "ahead" | "ontrack" | "miss" }) {
  const fill = kind === "ahead" ? "#0ea5e9" : kind === "ontrack" ? "#10b981" : "#ef4444";
  return <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full" style={{ background: fill }} />;
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-rule-paper p-5">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] ink-muted">{k}</div>
      <div style={{ fontFamily: "var(--font-serif)" }} className="mt-1.5 text-[34px] font-medium leading-none">
        {v}
      </div>
    </div>
  );
}
