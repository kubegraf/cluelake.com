import { AppIcon, LockupHorizontal, LockupStacked, Mark, Wordmark } from "./brand/marks";

/**
 * The brand page — /#/brand
 *
 * ⚠ IT IS A LIVE SPECIFICATION, NOT A PICTURE OF ONE. Every mark below is the
 * same component the header uses, at a different size. A brand page rendered
 * from exported PNGs starts lying the first time the real logo changes, and
 * this estate has already had one mark go stale in exactly that way — which is
 * why `.orkastor-brand/check_brand.py` exists. Here the drift is impossible:
 * there is one drawing.
 */

export function Brand() {
  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px 0" }}>
      <div className="eyebrow">Brand</div>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-0.03em", fontWeight: 620, margin: "14px 0 16px" }}>
        The identity
      </h1>
      <p style={{ color: "var(--text-dim)", maxWidth: 660, fontSize: 16.5, margin: "0 0 14px" }}>
        Three scattered signal nodes, each connected to one filled node. Signals
        converging into evidence — the product in a single shape.
      </p>
      <p style={{ color: "var(--slate)", maxWidth: 660, fontSize: 14.5, margin: 0 }}>
        The three nodes sit on an arc, so the silhouette reads as a soft C without
        anyone drawing a letter. It is a monogram when you want one and a network
        diagram when you do not.
      </p>

      <Section title="Primary logo" note="Symbol and wordmark, horizontal. The default in every interface.">
        <Tile><LockupHorizontal size={30} /></Tile>
      </Section>

      <Section title="Symbol" note="Used alone once the mark is established: favicon, app icon, sidebar, avatar.">
        <Row>
          <Tile><Mark size={72} /></Tile>
          <Tile><Mark size={44} /></Tile>
          <Tile><Mark size={28} /></Tile>
          <Tile><Mark size={16} /></Tile>
        </Row>
      </Section>

      <Section title="Wordmark" note="Clue is set lighter than Lake, so the compound reads as two words with no space, capital or colour doing the work.">
        <Tile><Wordmark size={38} /></Tile>
      </Section>

      <Section title="Stacked lockup" note="For square spaces — a README header, a sticker, a store listing.">
        <Tile><LockupStacked size={64} /></Tile>
      </Section>

      <Section title="App icon" note="The symbol scaled up inside the tile. A mark that keeps its clear space inside an icon looks timid on a home screen.">
        <Row>
          <Tile><AppIcon size={128} /></Tile>
          <Tile><AppIcon size={64} /></Tile>
          <Tile><AppIcon size={32} /></Tile>
          <Tile><AppIcon size={16} /></Tile>
        </Row>
      </Section>

      <Section
        title="Monochrome and reversed"
        note="One prop, not a second drawing: passing the same colour to the hub and the nodes gives every single-colour variant."
      >
        <Row>
          <Tile bg="var(--graphite)"><Mark size={56} accent="var(--text)" muted="var(--text)" /></Tile>
          <Tile bg="#ffffff"><Mark size={56} accent="#0a0d12" muted="#0a0d12" /></Tile>
          <Tile bg="#0a0d12"><Mark size={56} accent="#ffffff" muted="#ffffff" /></Tile>
          <Tile bg="var(--signal)"><Mark size={56} accent="var(--ink)" muted="var(--ink)" /></Tile>
        </Row>
      </Section>

      <Section
        title="Clear space and minimum size"
        note="Clear space is the radius of the hub on every side. Minimum size is 16px for the symbol and 96px for the horizontal lockup — below that the wordmark closes up before the mark does."
      >
        <Row>
          <Tile>
            <div style={{ position: "relative", padding: 18, border: "1px dashed var(--hairline-strong)", borderRadius: 8 }}>
              <Mark size={56} />
            </div>
          </Tile>
          <Tile>
            <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
              <LockupHorizontal size={13} />
              <span className="mono" style={{ fontSize: 11, color: "var(--slate-deep)" }}>96px — the floor</span>
            </div>
          </Tile>
        </Row>
      </Section>

      <Section title="Colour" note="One accent, used for a data point, a trace path, a link and an active state. A palette with three accents has none.">
        <Row>
          <Swatch name="Ink" value="#0a0d12" token="--ink" />
          <Swatch name="Graphite" value="#10141b" token="--graphite" />
          <Swatch name="Slate" value="#78849a" token="--slate" />
          <Swatch name="Signal" value="#17ddbe" token="--signal" />
          <Swatch name="Trace" value="#7c92ff" token="--trace" />
          <Swatch name="Text" value="#e9edf4" token="--text" />
        </Row>
        <p style={{ color: "var(--slate)", fontSize: 13.5, marginTop: 14, maxWidth: 640 }}>
          ⚠ The light theme does not share the signal colour. <span className="mono">#17ddbe</span> on
          white is 1.6:1 and unreadable, so light uses <span className="mono">#07907c</span> at the same
          hue. A brand colour that cannot be read is one that gets replaced locally by whoever needs it to work.
        </p>
      </Section>

      <Section title="Typography" note="Inter for the interface, JetBrains Mono for anything a machine produced.">
        <Row>
          <Tile>
            <div style={{ textAlign: "left" }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Interface — Inter</div>
              <div style={{ fontSize: 27, letterSpacing: "-0.028em", fontWeight: 620 }}>Know what changed.</div>
              <div style={{ fontSize: 14.5, color: "var(--text-dim)", marginTop: 6 }}>
                Regular 400 · Medium 500 · Semibold 600
              </div>
            </div>
          </Tile>
          <Tile>
            <div style={{ textAlign: "left" }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Machine — JetBrains Mono</div>
              <div className="mono" style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--text-dim)" }}>
                sha256:731f01823b0b<br />
                commit a1b2c3d<br />
                dep_91f2 · p99 8.4s
              </div>
            </div>
          </Tile>
        </Row>
        <p style={{ color: "var(--slate)", fontSize: 13.5, marginTop: 14, maxWidth: 640 }}>
          The split is a rule, not a preference: a digest, a commit SHA, a
          deployment id and a log line are monospaced because they are strings a
          reader compares character by character. Prose never is.
        </p>
      </Section>

      <Section title="In use" note="The identity has to survive the places developers actually meet it.">
        <Row>
          <Tile bg="var(--graphite)">
            <div style={{ width: 250, textAlign: "left" }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Sidebar</div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, paddingBottom: 12, borderBottom: "1px solid var(--hairline)" }}>
                <Mark size={19} /><Wordmark size={14} />
              </div>
              {["Overview", "Logs", "Traces", "Metrics"].map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", fontSize: 13, color: i === 2 ? "var(--signal)" : "var(--text-dim)" }}>
                  <span style={{ width: 4, height: 4, borderRadius: 4, background: i === 2 ? "var(--signal)" : "var(--slate-deep)" }} />
                  {s}
                </div>
              ))}
            </div>
          </Tile>
          <Tile bg="var(--graphite)">
            <div style={{ width: 250, textAlign: "left" }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Command line</div>
              <pre className="mono" style={{ margin: 0, fontSize: 12, lineHeight: 1.8, color: "var(--text-dim)", whiteSpace: "pre-wrap" }}>
<span style={{ color: "var(--slate-deep)" }}>$</span> cluelake what-changed <span style={{ color: "var(--signal)" }}>checkout-api</span>{"\n"}
  p99  2.1s → 8.4s  at 14:03{"\n"}
  <span style={{ color: "var(--signal)" }}>image</span>  sha256:731f01…{"\n"}
  <span style={{ color: "var(--signal)" }}>commit</span> a1b2c3d
              </pre>
            </div>
          </Tile>
          <Tile bg="var(--graphite)">
            <div style={{ width: 250, textAlign: "left" }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Browser tab</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--ink)", border: "1px solid var(--hairline)", borderRadius: "8px 8px 0 0", padding: "8px 12px" }}>
                <Mark size={14} />
                <span style={{ fontSize: 12.5, color: "var(--text-dim)" }}>ClueLake</span>
              </div>
            </div>
          </Tile>
        </Row>
      </Section>

      <Section title="What the mark is not" note="Each of these is what an observability company reaches for, and each is why they are all unownable.">
        <p style={{ color: "var(--text-dim)", fontSize: 14.5, maxWidth: 660, margin: 0, lineHeight: 1.7 }}>
          Not a magnifying glass. Not an eye. Not a radar sweep. Not a water
          surface. Not a database cylinder. Not a helm wheel. Three dots and a hub
          is a shape nobody in this category is already using — which is the only
          property that makes a mark worth building a brand on.
        </p>
      </Section>

      <div style={{ height: 40 }} />
    </div>
  );
}

/* ── Presentation furniture ─────────────────────────────────────────────── */

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 56, paddingTop: 30, borderTop: "1px solid var(--hairline)" }}>
      <h2 style={{ fontSize: 19, fontWeight: 600, margin: "0 0 6px", letterSpacing: "-0.015em" }}>{title}</h2>
      {note ? <p style={{ color: "var(--slate)", fontSize: 13.8, margin: "0 0 22px", maxWidth: 640, lineHeight: 1.6 }}>{note}</p> : null}
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "stretch" }}>{children}</div>;
}

function Tile({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      className="card"
      style={{
        background: bg ?? "var(--graphite)", display: "flex", alignItems: "center",
        justifyContent: "center", padding: 28, minWidth: 132, minHeight: 116,
      }}
    >
      {children}
    </div>
  );
}

function Swatch({ name, value, token }: { name: string; value: string; token: string }) {
  return (
    <div className="card" style={{ overflow: "hidden", minWidth: 148 }}>
      <div style={{ height: 68, background: `var(${token})`, borderBottom: "1px solid var(--hairline)" }} />
      <div style={{ padding: "11px 13px 13px" }}>
        <div style={{ fontSize: 13, fontWeight: 560 }}>{name}</div>
        <div className="mono" style={{ fontSize: 11.5, color: "var(--slate)", marginTop: 3 }}>{value}</div>
      </div>
    </div>
  );
}
