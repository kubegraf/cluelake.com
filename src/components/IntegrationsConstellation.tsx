const NODES: { id: string; x: number; y: number; size: number; tone: "core" | "warehouse" | "tool" | "comms" }[] = [
  { id: "Lake", x: 50, y: 50, size: 22, tone: "core" },
  { id: "Snowflake", x: 22, y: 28, size: 8, tone: "warehouse" },
  { id: "BigQuery", x: 75, y: 28, size: 8, tone: "warehouse" },
  { id: "Postgres", x: 14, y: 56, size: 7, tone: "warehouse" },
  { id: "Stripe", x: 28, y: 78, size: 7, tone: "tool" },
  { id: "Salesforce", x: 70, y: 80, size: 8, tone: "tool" },
  { id: "Mixpanel", x: 84, y: 60, size: 7, tone: "tool" },
  { id: "Amplitude", x: 88, y: 42, size: 6, tone: "tool" },
  { id: "GitHub", x: 12, y: 78, size: 7, tone: "tool" },
  { id: "Sentry", x: 6, y: 42, size: 6, tone: "tool" },
  { id: "Slack", x: 50, y: 14, size: 8, tone: "comms" },
  { id: "Notion", x: 38, y: 16, size: 7, tone: "comms" },
  { id: "Intercom", x: 60, y: 86, size: 7, tone: "comms" },
  { id: "Hubspot", x: 92, y: 70, size: 6, tone: "tool" },
  { id: "Linear", x: 38, y: 86, size: 6, tone: "comms" },
];

const FILL: Record<string, string> = {
  core: "#67e8f9",
  warehouse: "#a5b4fc",
  tool: "#f5f5f0",
  comms: "#fbbf24",
};

export default function IntegrationsConstellation() {
  const center = NODES[0];
  return (
    <div className="space-y-8">
      <p className="max-w-prose text-[16px] leading-relaxed text-ink-muted">
        ClueLake is the still point in your data weather. The lake at the centre of everything you already use — wired in five minutes, queryable in plain English, never copied to third-party storage.
      </p>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-rule bg-bg-elev/40">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
          {/* edges from center to each node */}
          {NODES.slice(1).map((n) => (
            <line
              key={n.id}
              x1={center.x}
              y1={center.y}
              x2={n.x}
              y2={n.y}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.18"
              strokeDasharray="0.6 0.6"
            />
          ))}

          {/* concentric guides */}
          {[18, 32, 44].map((r) => (
            <circle key={r} cx={center.x} cy={center.y} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.15" />
          ))}

          {NODES.map((n) => (
            <g key={n.id}>
              {n.tone === "core" && (
                <circle cx={n.x} cy={n.y} r={n.size + 2} fill="rgba(103,232,249,0.18)" />
              )}
              <circle cx={n.x} cy={n.y} r={n.size / 4 + 0.6} fill={FILL[n.tone]} opacity={n.tone === "core" ? 1 : 0.85} />
              <text
                x={n.x}
                y={n.y + (n.tone === "core" ? 7.5 : 4.2)}
                textAnchor="middle"
                fill={n.tone === "core" ? "#67e8f9" : "rgba(245,245,240,0.85)"}
                fontFamily="JetBrains Mono, ui-monospace, monospace"
                fontSize={n.tone === "core" ? 3 : 2.2}
              >
                {n.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 text-[12.5px] text-ink-muted sm:grid-cols-4">
        <Legend dot={FILL.core} label="ClueLake" />
        <Legend dot={FILL.warehouse} label="Warehouse" />
        <Legend dot={FILL.tool} label="Tools" />
        <Legend dot={FILL.comms} label="Comms" />
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
      <span className="font-mono text-[11px] tracking-[0.1em]">{label}</span>
    </span>
  );
}
