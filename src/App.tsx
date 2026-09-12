import { useEffect, useState } from "react";
import { LockupHorizontal, Mark } from "./brand/marks";
import { Brand } from "./Brand";

/**
 * cluelake.com
 *
 * ── THE VOICE, AND WHAT IT REFUSES ──────────────────────────────────────────
 *
 * Precise, calm, technical, evidence-driven. No "revolutionary", no "next-gen",
 * no "game changing" — and deliberately no "AI-powered", which is a category
 * label in 2026 rather than a claim, and which would also blur this brand into
 * AgentenX's. Every sentence on this page either names a capability or states a
 * limit.
 *
 * ── ONE PROMISE, EVERYWHERE ─────────────────────────────────────────────────
 *
 * "Know what changed." Every section is that sentence at a different
 * resolution: the hero asserts it, the panel demonstrates it, the capabilities
 * list what it takes to keep it, and the honesty block says where it stops.
 */

const NAV = [
  { href: "#what", label: "What it does" },
  { href: "#signals", label: "Signals" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#/brand", label: "Brand" },
];

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const onBrand = route.startsWith("#/brand");

  return (
    <>
      <Header theme={theme} onTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      <main>{onBrand ? <Brand /> : <Landing />}</main>
      <Footer />
    </>
  );
}

/* ══ Shell ═══════════════════════════════════════════════════════════════ */

function Header({ theme, onTheme }: { theme: string; onTheme: () => void }) {
  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 40,
        borderBottom: "1px solid var(--hairline)",
        background: "color-mix(in srgb, var(--ink) 86%, transparent)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Shell style={{ display: "flex", alignItems: "center", gap: 24, height: 62 }}>
        <a href="#" aria-label="ClueLake home" style={{ textDecoration: "none" }}>
          <LockupHorizontal size={19} />
        </a>
        <nav style={{ display: "flex", gap: 22, marginLeft: "auto", alignItems: "center" }}>
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              style={{ color: "var(--text-dim)", fontSize: 13.5, textDecoration: "none" }}
            >
              {n.label}
            </a>
          ))}
          <button
            onClick={onTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            style={{
              border: "1px solid var(--hairline-strong)", background: "transparent",
              color: "var(--text-dim)", borderRadius: 8, padding: "5px 10px",
              fontSize: 12, cursor: "pointer", fontFamily: "var(--font-mono)",
            }}
          >
            {theme === "dark" ? "light" : "dark"}
          </button>
        </nav>
      </Shell>
    </header>
  );
}

function Shell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", ...style }}>{children}</div>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--hairline)", marginTop: 96, padding: "44px 0 56px" }}>
      <Shell style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ minWidth: 240 }}>
          <LockupHorizontal size={18} />
          <p style={{ color: "var(--slate)", fontSize: 13, margin: "14px 0 0", maxWidth: 300 }}>
            Observability for Kubernetes, with the deployment context already attached.
          </p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 48, flexWrap: "wrap" }}>
          <FooterCol title="Product" links={[["What it does", "#what"], ["Capabilities", "#capabilities"], ["Brand", "#/brand"]]} />
          <FooterCol title="Company" links={[["Orkastor", "https://orkastor.com"], ["KubeGraf", "https://kubegraf.io"], ["Domineta", "https://domineta.com"]]} />
        </div>
      </Shell>
      <Shell style={{ marginTop: 36, paddingTop: 22, borderTop: "1px solid var(--hairline)" }}>
        <p style={{ color: "var(--slate-deep)", fontSize: 12.5, margin: 0 }}>
          {/* The corporate line the brief asks for. Stated plainly and in one
              place — a product that hides who owns it reads as a side project. */}
          ClueLake is a product of <strong style={{ color: "var(--slate)", fontWeight: 550 }}>Orkastor Ltd</strong>.
          {" "}© {new Date().getFullYear()} Orkastor Ltd. All rights reserved.
        </p>
      </Shell>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 12 }}>{title}</div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} style={{ color: "var(--text-dim)", fontSize: 13.5, textDecoration: "none" }}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ══ Landing ═════════════════════════════════════════════════════════════ */

function Landing() {
  return (
    <>
      <Hero />
      <WhatChanged />
      <Signals />
      <Capabilities />
      <Honesty />
    </>
  );
}

function Hero() {
  return (
    <section className="grid-field" style={{ padding: "96px 0 72px", borderBottom: "1px solid var(--hairline)" }}>
      <Shell>
        <div className="eyebrow">Kubernetes observability</div>
        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 76px)", lineHeight: 1.03, letterSpacing: "-0.035em",
            fontWeight: 620, margin: "20px 0 0", maxWidth: 15 + "ch",
          }}
        >
          Know what<br />changed.
        </h1>
        <p style={{ fontSize: 18.5, color: "var(--text-dim)", maxWidth: 620, margin: "26px 0 0", lineHeight: 1.55 }}>
          Logs, metrics, traces and network signals in one store — each one stamped
          with the deploy, the image digest and the commit that produced it. The
          regression and its cause arrive together.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 34, flexWrap: "wrap" }}>
          <a
            href="#what"
            style={{
              background: "var(--signal)", color: "var(--ink)", fontWeight: 600, fontSize: 14.5,
              padding: "11px 20px", borderRadius: 10, textDecoration: "none",
            }}
          >
            See how it works
          </a>
          <a
            href="https://github.com/kubegraf"
            style={{
              border: "1px solid var(--hairline-strong)", color: "var(--text)", fontSize: 14.5,
              padding: "11px 20px", borderRadius: 10, textDecoration: "none",
            }}
          >
            GitHub
          </a>
        </div>
      </Shell>
    </section>
  );
}

/**
 * The panel that IS the product.
 *
 * ⚠ IT SHOWS A JOIN, NOT A DASHBOARD. Every observability site puts a chart
 * here, and a chart says "we store your data", which every competitor also
 * does. This shows a latency change resolved to the commit that caused it —
 * the one thing a tool without deployment context structurally cannot print.
 */
function WhatChanged() {
  return (
    <section id="what" style={{ padding: "84px 0" }}>
      <Shell>
        <div className="eyebrow">Telemetry with deployment context</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.028em", fontWeight: 600, margin: "14px 0 18px", maxWidth: "20ch" }}>
          Find the change behind the signal.
        </h2>
        <p style={{ color: "var(--text-dim)", maxWidth: 640, margin: "0 0 40px", fontSize: 16.5 }}>
          A percentile moves. Without deployment context that is the start of an
          investigation: three tabs, a guess, and somebody who remembers what
          shipped. With it, it is a query.
        </p>

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "13px 18px", borderBottom: "1px solid var(--hairline)", display: "flex", alignItems: "center", gap: 10 }}>
            <Mark size={15} />
            <span className="mono" style={{ fontSize: 12.5, color: "var(--slate)" }}>checkout-api · production</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--slate-deep)", marginLeft: "auto" }}>14:03 UTC</span>
          </div>

          <div style={{ padding: "26px 18px 22px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <span className="mono" style={{ fontSize: 13, color: "var(--text-dim)" }}>p99 latency</span>
              <span className="mono" style={{ fontSize: 22, color: "var(--text)" }}>2.1s</span>
              <span style={{ color: "var(--slate-deep)" }}>→</span>
              <span className="mono" style={{ fontSize: 22, color: "var(--warn)" }}>8.4s</span>
            </div>

            <Evidence />
          </div>
        </div>
      </Shell>
    </section>
  );
}

function Evidence() {
  const rows: [string, string, string][] = [
    ["image", "sha256:731f01…", "changed 14:02, one minute before"],
    ["build", "#482", "cache: drop the per-request client"],
    ["commit", "a1b2c3d", "ada@acme.com, 13:51"],
    ["deploy", "dep_91f2", "rollout completed 14:02"],
  ];
  return (
    <div style={{ marginTop: 24, borderTop: "1px solid var(--hairline)", paddingTop: 20 }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>What changed</div>
      <div style={{ display: "grid", gap: 10 }}>
        {rows.map(([k, v, note]) => (
          <div key={k} style={{ display: "flex", gap: 14, alignItems: "baseline", flexWrap: "wrap" }}>
            <span className="mono" style={{ fontSize: 12, color: "var(--slate)", minWidth: 56 }}>{k}</span>
            <span className="mono" style={{ fontSize: 13.5, color: "var(--signal)" }}>{v}</span>
            <span style={{ fontSize: 13, color: "var(--text-dim)" }}>{note}</span>
          </div>
        ))}
      </div>
      <p style={{ margin: "22px 0 0", fontSize: 13.5, color: "var(--slate)" }}>
        Nothing here was inferred. Every field is stamped onto the event at ingest,
        by the platform that performed the deploy.
      </p>
    </div>
  );
}

function Signals() {
  const items: [string, string][] = [
    ["Logs", "Live tail, pattern grouping, and full-text search across the window you keep. Every line carrying a trace id links to its trace."],
    ["Metrics", "PromQL over a columnar store, so existing dashboards and alert rules keep working. Percentiles merge correctly across any range."],
    ["Traces", "Waterfalls and attribute search, with tail sampling that keeps every error and every slow request."],
    ["Network", "Request-level flows from eBPF, with nothing inside the container — so code you did not build is still visible."],
    ["Deployments", "The image digest, build, commit and rollout that produced each event, joined at ingest rather than guessed later."],
  ];
  return (
    <section id="signals" style={{ padding: "80px 0", borderTop: "1px solid var(--hairline)" }}>
      <Shell>
        <div className="eyebrow">One place</div>
        <h2 style={{ fontSize: "clamp(26px, 3.6vw, 36px)", letterSpacing: "-0.026em", fontWeight: 600, margin: "14px 0 34px", maxWidth: "24ch" }}>
          Observe the system. Follow the evidence.
        </h2>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(252px, 1fr))" }}>
          {items.map(([title, body]) => (
            <div key={title} className="card" style={{ padding: "20px 20px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: 6, background: "var(--signal)" }} />
                <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>{title}</h3>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function Capabilities() {
  const caps: [string, string][] = [
    ["Cost controlled at ingest", "Cardinality budgets, attribute allowlists and tail sampling, enforced as data arrives. A series over budget is refused by name — never dropped quietly and never billed silently."],
    ["Queries costed before they run", "An expensive query is refused with its estimate and a narrower suggestion, rather than run and invoiced."],
    ["OTLP native", "OpenTelemetry in, over gRPC and HTTP. No bespoke protocol, no proprietary agent required."],
    ["Your data stays readable", "Cold storage is Parquet under an open table catalogue. Readable by anything, including tools that are not ours."],
    ["Tenancy in the storage, not the query", "The workspace is the first key of every table, so a query that omits it returns nothing rather than something."],
    ["Runs where you do", "Managed, or self-hosted in your own cluster against your own object storage."],
  ];
  return (
    <section id="capabilities" style={{ padding: "80px 0", borderTop: "1px solid var(--hairline)" }}>
      <Shell>
        <div className="eyebrow">Capabilities</div>
        <div style={{ display: "grid", gap: 1, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", marginTop: 26, background: "var(--hairline)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {caps.map(([title, body]) => (
            <div key={title} style={{ background: "var(--ink)", padding: "24px 22px 26px" }}>
              <h3 style={{ fontSize: 14.5, fontWeight: 600, margin: "0 0 9px", letterSpacing: "-0.01em" }}>{title}</h3>
              <p style={{ margin: 0, fontSize: 13.8, color: "var(--text-dim)", lineHeight: 1.62 }}>{body}</p>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

/**
 * ⚠ THE SECTION MOST LANDING PAGES DO NOT HAVE.
 *
 * Saying what a tool does NOT do is the strongest available signal that the
 * rest of the page is accurate. It is also the brief's voice — evidence-driven
 * — applied to our own claims rather than only to the customer's telemetry.
 */
function Honesty() {
  return (
    <section style={{ padding: "80px 0 20px", borderTop: "1px solid var(--hairline)" }}>
      <Shell>
        <div className="eyebrow">Where it stops</div>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: 22 }}>
          {[
            ["It does not replace Grafana.", "Grafana wins dashboards. ClueLake speaks its datasource API, so keep the dashboards you have."],
            ["PromQL support names its subset.", "Selectors, rate, aggregations and histogram_quantile are supported and tested. label_replace and subqueries are not yet — an untested compatibility claim is worse than an honest gap."],
            ["It does not manage your Prometheus.", "If you already run a stack, ClueLake reads it. Owning the upgrade path for software in your cluster is not a service we will offer."],
          ].map(([t, b]) => (
            <div key={t}>
              <h3 style={{ fontSize: 14.5, fontWeight: 600, margin: "0 0 8px" }}>{t}</h3>
              <p style={{ margin: 0, fontSize: 13.8, color: "var(--text-dim)", lineHeight: 1.62 }}>{b}</p>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}
