import { useEffect, useState } from "react";

const QUESTIONS = [
  "Should we ship the new pricing this week?",
  "Where is our churn coming from?",
  "Which channel is our cheapest acquisition?",
  "Are we hiring at the right cadence?",
  "Is the EU launch on track?",
];

export default function Masthead() {
  const [qi, setQi] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setQi((i) => (i + 1) % QUESTIONS.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-rule pt-24 pb-20 lg:pt-32 lg:pb-28">
      {/* ambient orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb absolute -top-32 -right-20 h-[500px] w-[500px] rounded-full bg-cyan/15 blur-[120px]" />
        <div className="orb absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full bg-indigo/15 blur-[100px]" />
      </div>

      <div className="grid gap-10 px-6 sm:px-10 lg:grid-cols-[1.3fr_minmax(0,1fr)] lg:gap-16 lg:px-14">
        {/* left: editorial column */}
        <div className="max-w-2xl">
          <div className="eyebrow text-cyan-bright">Issue 01 · 2026</div>
          <h1
            style={{ fontFamily: "var(--font-serif)" }}
            className="mt-5 text-[44px] font-medium leading-[1.02] tracking-[-0.02em] text-balance sm:text-[64px] lg:text-[78px]"
          >
            Decisions need a{" "}
            <span className="italic text-cyan-bright">lake.</span>
            <br />
            Not a stream.
          </h1>
          <p className="mt-7 max-w-xl text-[16.5px] leading-relaxed text-ink-muted">
            ClueLake gathers every signal — from your warehouse, tools, conversations and customers — into one queryable lake. You ask in plain English; we answer with confidence and cited evidence.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href="#ask"
              className="inline-flex items-center gap-2 border border-cyan/60 bg-cyan/10 px-5 py-3 text-[14px] font-medium text-cyan-bright transition-colors hover:bg-cyan/20"
              style={{ borderRadius: 2 }}
            >
              Ask the lake
              <span className="font-mono text-[11px] text-cyan-bright/70">↵</span>
            </a>
            <a href="#01" className="inline-flex items-baseline gap-2 text-[14px] text-ink-muted lnk underline decoration-rule-strong hover:text-ink">
              Read the premise <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 text-[12px] text-ink-dim">
            <span className="font-mono">120+ integrations</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">5-min setup</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">SOC 2 · region-locked</span>
          </div>
        </div>

        {/* right: live Q+A card */}
        <aside className="relative">
          <div className="relative rounded-sm border border-rule-strong bg-bg-elev/80 p-5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">live · query</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-300">
                <span className="grid h-2 w-2 place-items-center">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                CONNECTED
              </span>
            </div>
            <div key={qi} className="fade-up min-h-[60px] pt-4 font-mono text-[13.5px] text-ink">
              <span className="text-cyan-bright">&gt;</span> {QUESTIONS[qi]}
            </div>
            <div className="mt-3 border-t border-rule pt-4 text-[13.5px] leading-relaxed text-ink-muted">
              <span className="font-mono text-[11.5px] text-indigo-bright">↳ ClueLake</span>
              <p className="mt-1.5">
                <span className="font-mono text-[11px] text-cyan-bright">87% confidence —</span>{" "}
                <span className="text-ink">hold one week.</span> New billing flow shows churn risk in
                2 of 3 cohorts. <span className="text-ink-dim">10 signals cited</span>.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-rule pt-4">
              <Mini label="Stripe" value="3" />
              <Mini label="Mixpanel" value="2" />
              <Mini label="Intercom" value="1" />
              <Mini label="Interviews" value="4" />
            </div>
          </div>

          {/* footnote pin */}
          <div className="mt-4 flex items-start gap-3 text-[11.5px] text-ink-dim">
            <span className="mt-0.5 font-mono">[*]</span>
            <span className="leading-relaxed">
              Live preview from a sandbox lake. Your lake stays in your region; we query it where it lives.
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-rule bg-bg-soft/60 px-3 py-2.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">{label}</div>
      <div className="mt-1 font-mono text-[15px] text-ink">{value} signals</div>
    </div>
  );
}
