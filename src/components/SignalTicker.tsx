const SIGNALS = [
  "stripe.dispute.created · $1,240 · acme",
  "mixpanel.funnel · checkout · −7.2%",
  "intercom.thread · pricing concern · ★",
  "github.issue · #3211 · perf regression",
  "salesforce.opp · Lumin · stage shift",
  "warehouse.cohort · onboarded-q4 · churn ↑",
  "interview.note · enterprise · seat-creep",
  "slack.signal · #revenue · alert",
  "hubspot.deal · BrightSide · won · $24K",
  "sentry.error · payments · spike ↑0.8%",
  "amplitude.feature · search · adoption ↓",
  "cs.survey · NPS · +6 wow",
];

export default function SignalTicker() {
  return (
    <div className="relative overflow-hidden border-b border-rule bg-bg/80 py-3">
      <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent" />
      <div className="ticker flex w-max gap-9 whitespace-nowrap font-mono text-[12px] text-ink-muted">
        {[...SIGNALS, ...SIGNALS].map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2.5">
            <span className="h-1 w-1 rounded-full bg-cyan-bright" />
            <span>{s}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
