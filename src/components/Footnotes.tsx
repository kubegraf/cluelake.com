const NOTES: { n: string; body: string }[] = [
  { n: "*", body: "ClueLake is a registered SOC 2 Type II provider. Audit reports available under NDA." },
  { n: "†", body: "Region-locked storage available in EU, US (East / West), Singapore. Contact for additional residency." },
  { n: "‡", body: "120+ integrations and counting. New connectors monthly; community SDK in public beta." },
  { n: "§", body: "Decision diary entries are queryable. Export as JSON, Markdown, or directly to Notion." },
];

const COLS = [
  { title: "Product", links: ["Lake", "Diary", "Constellation", "Pricing", "Status"] },
  { title: "Company", links: ["About", "Careers", "Press", "Brand"] },
  { title: "Resources", links: ["Docs", "Changelog", "Roadmap", "Help"] },
  { title: "Legal", links: ["Privacy", "Terms", "DPA", "Subprocessors"] },
];

export default function Footnotes() {
  return (
    <footer className="relative border-t border-rule">
      <div className="px-6 py-14 sm:px-10 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-md bg-bg-elev ring-1 ring-rule-strong">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="8" cy="12" r="3" fill="#67e8f9" />
                  <circle cx="17" cy="7" r="2" fill="#a5b4fc" />
                  <circle cx="17" cy="17" r="2" fill="#a5b4fc" />
                  <path d="M10 11l5-3M10 13l5 3" stroke="#67e8f9" strokeWidth="1.4" />
                </svg>
              </span>
              <span style={{ fontFamily: "var(--font-serif)" }} className="text-[18px] font-semibold tracking-tight">
                ClueLake
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink-muted">
              Decision intelligence for the data-rich, time-poor. A lake of every signal you already have.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <div className="eyebrow text-ink-dim">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[13.5px] text-ink-muted transition-colors hover:text-ink">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hr-dot mt-12 text-ink-dim" />

        <ul className="mt-6 grid gap-3 text-[12px] leading-relaxed text-ink-muted sm:grid-cols-2">
          {NOTES.map((n) => (
            <li key={n.n} className="flex items-start gap-3">
              <span className="font-mono text-cyan-bright">[{n.n}]</span>
              <span>{n.body}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 text-[12px] text-ink-dim sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} ClueLake — Berlin · San Francisco · Singapore</p>
          <p className="font-mono">v1.0 · still pour, still answer</p>
        </div>
      </div>
    </footer>
  );
}
