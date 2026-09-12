/**
 * The ClueLake mark.
 *
 * ── THE CONCEPT ─────────────────────────────────────────────────────────────
 *
 * Three scattered signal nodes on the left, each connected to ONE filled node
 * on the right. Signals converging into evidence — which is the product in one
 * shape: logs, metrics and traces arriving separately and resolving into a
 * single explanation.
 *
 * The three left nodes sit on an arc, so the silhouette reads as a soft **C**
 * without anybody having to draw a letter. That is the whole trick: it is a
 * monogram when you want one and a network diagram when you do not.
 *
 * ── ⚠ WHAT IT DELIBERATELY IS NOT ───────────────────────────────────────────
 *
 * Not a magnifying glass, not an eye, not a radar sweep, not a water surface,
 * not a database cylinder, not a Kubernetes helm. Every one of those was on the
 * brief's exclusion list and every one of them is what an observability company
 * reaches for — which is exactly why they are all unownable. Three dots and a
 * hub is a shape nobody in this category is using.
 *
 * ── WHY IT SURVIVES 16px ────────────────────────────────────────────────────
 *
 * Four circles and three straight lines. There is no detail to lose. The hub is
 * nearly twice the radius of the largest signal node, so even when the strokes
 * stop resolving the asymmetry still reads — which is what a favicon actually
 * needs: not legibility, but a distinctive blob.
 *
 * The geometry lives in ONE place (`NODES` / `HUB`) and every size, weight and
 * colour variant is drawn from it, so the favicon and the hero can never drift
 * apart the way a hand-exported set does.
 */

/** The three signal nodes, on a 32×32 grid. On an arc, opening right. */
const NODES = [
  { cx: 8.5, cy: 7.5, r: 2.1 },
  { cx: 6.0, cy: 16.0, r: 2.6 },
  { cx: 8.5, cy: 24.5, r: 2.1 },
] as const;

/** The evidence they converge on. Deliberately the largest thing in the mark. */
const HUB = { cx: 23.5, cy: 16, r: 4.6 } as const;

export interface MarkProps {
  size?: number;
  /** The hub and the paths. Defaults to the signal colour. */
  accent?: string;
  /** The scattered nodes and the connecting lines. */
  muted?: string;
  title?: string;
  className?: string;
}

/**
 * The symbol on its own — no container, no background.
 *
 * ⚠ `muted` AND `accent` ARE SEPARATE SO MONOCHROME IS ONE PROP AWAY. Passing
 * the same value to both gives the single-colour version the brief asks for
 * (black, white, reversed) with no second drawing to keep in step.
 */
export function Mark({
  size = 32,
  accent = "var(--signal)",
  muted = "currentColor",
  title,
  className,
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* The paths first, so the nodes sit on top of them and the joins stay
          clean at every stroke width. */}
      <g stroke={muted} strokeWidth="1.6" strokeLinecap="round" opacity="0.55">
        {NODES.map((n, i) => (
          <line key={i} x1={n.cx} y1={n.cy} x2={HUB.cx} y2={HUB.cy} />
        ))}
      </g>
      <g fill={muted}>
        {NODES.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r={n.r} />
        ))}
      </g>
      {/* ⚠ NO KNOCKOUT RING BEHIND THE HUB, and there used to be one.
          It filled a slightly larger circle with the PAGE background so the hub
          would read as a distinct object where a path passed behind it — except
          no path does: all three terminate at the hub's centre and are covered
          by it. So the ring solved nothing and hardcoded `--ink`, which meant
          that the moment the mark sat on any surface that was not the page
          background — a white tile, a coloured tile, a sticker — it drew a dark
          halo around the hub. Removing it makes the mark genuinely
          background-independent, which is the whole requirement for a logo. */}
      <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r} fill={accent} />
    </svg>
  );
}

/**
 * The app/favicon tile: the mark inside a rounded square.
 *
 * ⚠ THE SYMBOL IS SCALED UP INSIDE THE TILE, not dropped in at its drawing
 * size. A mark that keeps its clear-space inside a 512px icon looks timid on a
 * phone home screen, and at 16px it disappears into the corner radius.
 */
export function AppIcon({ size = 64, radius = 0.22 }: { size?: number; radius?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" role="img" aria-label="ClueLake">
      <rect width="32" height="32" rx={32 * radius} fill="var(--ink)" />
      <g transform="translate(16 16) scale(0.76) translate(-16 -16)">
        <g stroke="var(--slate)" strokeWidth="1.6" strokeLinecap="round" opacity="0.6">
          {NODES.map((n, i) => (
            <line key={i} x1={n.cx} y1={n.cy} x2={HUB.cx} y2={HUB.cy} />
          ))}
        </g>
        <g fill="var(--slate)">
          {NODES.map((n, i) => (
            <circle key={i} cx={n.cx} cy={n.cy} r={n.r} />
          ))}
        </g>
        <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r} fill="var(--signal)" />
      </g>
    </svg>
  );
}

/**
 * The wordmark.
 *
 * ⚠ SET IN THE UI FACE, NOT DRAWN AS PATHS, and that is a deliberate trade. A
 * real brand ships outlined letterforms so the rendering cannot vary; a landing
 * page that does the same ships a blurry raster on a high-DPI screen unless the
 * SVG is perfect. Live text stays crisp everywhere, is selectable, and is read
 * by search engines — and the tuning that makes it a wordmark rather than a
 * heading is in the tracking and the weight split, which survive as CSS.
 *
 * `Clue` is the lighter half and `Lake` the heavier one, so the compound reads
 * as two words without a space, a capital, or a colour change doing the work.
 */
export function Wordmark({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontSize: size,
        fontWeight: 500,
        letterSpacing: "-0.021em",
        lineHeight: 1,
        color: "var(--text)",
        whiteSpace: "nowrap",
        fontFeatureSettings: '"ss01" 1, "cv05" 1',
      }}
    >
      Clue<span style={{ fontWeight: 680 }}>Lake</span>
    </span>
  );
}

/** Symbol + wordmark, side by side. The header lockup. */
export function LockupHorizontal({ size = 22 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.42 }}>
      <Mark size={size * 1.35} title="ClueLake" />
      <Wordmark size={size} />
    </span>
  );
}

/** Symbol over wordmark. For square spaces — a README, a sticker, an app store. */
export function LockupStacked({ size = 56 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: size * 0.26 }}>
      <Mark size={size} title="ClueLake" />
      <Wordmark size={size * 0.42} />
    </span>
  );
}
