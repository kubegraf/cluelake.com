import { useEffect, useState } from "react";

const NAV = [
  { num: "00", label: "Masthead", href: "#top" },
  { num: "01", label: "Premise", href: "#01" },
  { num: "02", label: "Diary", href: "#02" },
  { num: "03", label: "Constellation", href: "#03" },
  { num: "04", label: "Pricing", href: "#04" },
  { num: "05", label: "Ask the lake", href: "#ask" },
];

export default function Sidebar() {
  const [active, setActive] = useState("00");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      let cur = "00";
      for (const n of NAV) {
        const id = n.href.slice(1);
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = n.num;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-rule bg-bg/80 px-5 py-3 backdrop-blur-md lg:hidden">
        <a href="#top" className="flex items-center gap-2.5">
          <Mark />
          <span style={{ fontFamily: "var(--font-serif)" }} className="text-[18px] font-semibold tracking-tight">
            ClueLake
          </span>
        </a>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="grid h-9 w-9 place-items-center rounded-lg border border-rule"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 top-[57px] z-30 border-b border-rule bg-bg/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-2xl flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <a
                key={n.num}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 rounded-md px-3 py-2.5 hover:bg-bg-soft"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-ink-dim">{n.num}</span>
                <span className="text-[15px] text-ink">{n.label}</span>
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-rule bg-bg/60 px-7 py-9 backdrop-blur-xl lg:flex">
        <a href="#top" className="flex items-center gap-2.5">
          <Mark />
          <span style={{ fontFamily: "var(--font-serif)" }} className="text-[20px] font-semibold tracking-tight">
            ClueLake
          </span>
        </a>

        <p className="mt-4 max-w-[180px] text-[12.5px] leading-relaxed text-ink-muted">
          Decision intelligence for the data-rich, time-poor.
        </p>

        <nav className="mt-10 flex flex-col gap-0.5">
          {NAV.map((n) => {
            const isActive = active === n.num;
            return (
              <a
                key={n.num}
                href={n.href}
                className={`group flex items-baseline gap-4 rounded-md px-2 py-2 transition-colors ${
                  isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                <span
                  className={`font-mono text-[10.5px] tracking-[0.22em] ${
                    isActive ? "text-cyan-bright" : "text-ink-dim"
                  }`}
                >
                  {n.num}
                </span>
                <span className="text-[13.5px]">{n.label}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-bright" aria-hidden="true" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-2.5 text-[11.5px] text-ink-dim">
          <div className="hr-dot text-ink-dim" />
          <span>v1.0 · Berlin · SF · Singapore</span>
          <span>SOC 2 Type II · region-locked</span>
        </div>
      </aside>
    </>
  );
}

function Mark() {
  return (
    <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-md bg-bg-elev ring-1 ring-rule-strong">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="12" r="3" fill="#67e8f9" />
        <circle cx="17" cy="7" r="2" fill="#a5b4fc" />
        <circle cx="17" cy="17" r="2" fill="#a5b4fc" />
        <path d="M10 11l5-3M10 13l5 3" stroke="#67e8f9" strokeWidth="1.4" />
      </svg>
    </span>
  );
}
