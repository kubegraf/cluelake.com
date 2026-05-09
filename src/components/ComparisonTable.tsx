type Cell = "yes" | "limited" | "no" | string;

interface Row { label: string; cells: Cell[] }

const PLANS = ["Free", "Pro · $99/mo", "Team · $299/mo", "Enterprise"];
const ROWS: Row[] = [
  { label: "Integrations", cells: ["10", "Unlimited", "Unlimited", "Unlimited + custom"] },
  { label: "Signal retention", cells: ["30 days", "1 year", "3 years", "Custom"] },
  { label: "Users", cells: ["1", "Up to 5", "Up to 25", "Unlimited"] },
  { label: "Decision diary", cells: ["limited", "yes", "yes", "yes"] },
  { label: "Custom views", cells: ["no", "limited", "yes", "yes"] },
  { label: "Saved & scheduled queries", cells: ["no", "yes", "yes", "yes"] },
  { label: "SSO + SAML", cells: ["no", "no", "yes", "yes"] },
  { label: "Region-locked storage", cells: ["no", "no", "yes", "yes + custom region"] },
  { label: "Audit log + export", cells: ["no", "limited", "yes", "yes"] },
  { label: "Dedicated success", cells: ["no", "no", "no", "yes"] },
  { label: "SLA", cells: ["—", "—", "99.9%", "99.99%"] },
];

export default function ComparisonTable() {
  return (
    <div className="space-y-8">
      <p className="max-w-prose text-[16px] leading-relaxed">
        We don't price by seat-creep or feature ladders. The lake should be free to start; only the depth and the team size add cost. Cancel any time. Move data out any time. Your lake, your rules.
      </p>

      <div className="overflow-x-auto border border-rule-paper">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-rule-paper">
              <th className="w-1/3 px-5 py-4 text-[12px] font-mono uppercase tracking-[0.18em] ink-muted">
                Capability
              </th>
              {PLANS.map((p, i) => (
                <th
                  key={p}
                  className={`px-5 py-4 text-[12px] font-mono uppercase tracking-[0.18em] ${
                    i === 1 ? "text-cyan-bright" : "ink-muted"
                  }`}
                >
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={r.label} className={i > 0 ? "border-t border-rule-paper" : ""}>
                <th scope="row" className="px-5 py-3.5 text-left text-[14.5px] font-medium">
                  {r.label}
                </th>
                {r.cells.map((c, idx) => (
                  <td
                    key={idx}
                    className={`px-5 py-3.5 text-[13.5px] ${idx === 1 ? "bg-cyan/5" : ""}`}
                  >
                    <CellView value={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {PLANS.map((p, i) => (
          <a
            key={p}
            href="#ask"
            className={`block border px-4 py-3 text-center text-[13px] font-medium transition-colors ${
              i === 1
                ? "border-cyan bg-cyan text-bg hover:bg-cyan-bright"
                : "border-rule-paper hover:bg-paper-soft"
            }`}
            style={{ borderRadius: 2 }}
          >
            {i === 0 ? "Start free" : i === PLANS.length - 1 ? "Talk to sales" : `Choose ${p.split(" ·")[0]}`}
          </a>
        ))}
      </div>
    </div>
  );
}

function CellView({ value }: { value: Cell }) {
  if (value === "yes") return <Check />;
  if (value === "no") return <span className="ink-muted">—</span>;
  if (value === "limited") return <span className="font-mono text-[12px]">limited</span>;
  return <span className="font-mono text-[12.5px]">{value}</span>;
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-label="yes">
      <path d="M5 12l5 5L20 7" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
