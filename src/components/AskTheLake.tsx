import { useEffect, useState } from "react";

const SAMPLES = [
  "Where is our churn coming from?",
  "Which feature is driving the new sign-up cohort?",
  "Should we hire a designer or an engineer next?",
  "Is the EU launch on track?",
  "What's the cheapest channel right now?",
];

export default function AskTheLake() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((x) => (x + 1) % SAMPLES.length), 3200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="ask" className="relative isolate overflow-hidden border-b border-rule">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb absolute -top-24 -right-12 h-[420px] w-[420px] rounded-full bg-indigo/15 blur-[120px]" />
        <div className="orb absolute -bottom-24 -left-12 h-[360px] w-[360px] rounded-full bg-cyan/15 blur-[100px]" />
      </div>

      <div className="grid gap-12 px-6 py-24 sm:px-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14 lg:px-14 lg:py-32">
        <header>
          <div className="eyebrow text-cyan-bright">§ 05 · Try it</div>
        </header>

        <div className="max-w-3xl">
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-[34px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-[48px] lg:text-[60px]"
          >
            Ask the lake.<br />
            <span className="italic text-ink-muted">Get a real answer.</span>
          </h2>
          <p className="mt-6 max-w-prose text-[15.5px] leading-relaxed text-ink-muted">
            Type a question your team is asking right now. We'll show you what ClueLake would have answered — with cited signals, against a sample lake.
          </p>

          <form className="mt-9 border border-rule-strong bg-bg-elev/60 backdrop-blur-md">
            <label htmlFor="q" className="sr-only">Your question</label>
            <textarea
              id="q"
              rows={3}
              defaultValue={SAMPLES[i]}
              key={i}
              className="w-full resize-none bg-transparent px-5 py-4 font-mono text-[14px] text-ink outline-none placeholder:text-ink-dim"
              placeholder="Type a real question..."
            />
            <div className="flex items-center justify-between border-t border-rule px-5 py-3">
              <span className="font-mono text-[11px] text-ink-dim">
                ⌘ + ↵ &nbsp; runs against a sandbox lake
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-cyan px-4 py-2 font-mono text-[12.5px] font-semibold text-bg transition-colors hover:bg-cyan-bright"
                style={{ borderRadius: 2 }}
              >
                Ask the lake
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap gap-2 text-[12px]">
            {SAMPLES.map((s, idx) => (
              <button
                key={s}
                onClick={() => setI(idx)}
                className={`border px-3 py-1.5 font-mono transition-colors ${
                  idx === i
                    ? "border-cyan/60 bg-cyan/10 text-cyan-bright"
                    : "border-rule text-ink-muted hover:border-rule-strong hover:text-ink"
                }`}
                style={{ borderRadius: 2 }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
