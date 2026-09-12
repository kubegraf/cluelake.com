import symbolUrl from "../assets/logo-symbol.png";

/**
 * The ClueLake mark.
 *
 * ── THE ARTWORK IS THE SOURCE, AND IT IS RASTER ─────────────────────────────
 *
 * A low-poly origami bird in a blue gradient, supplied as artwork. It replaced
 * an SVG mark drawn earlier in this repo — that one was geometry we owned and
 * could recolour at will, and this one is the brand, so the brand wins.
 *
 * ⚠ WHAT THAT COSTS, STATED RATHER THAN DISCOVERED LATER. The previous mark was
 * four circles and three lines with `accent` and `muted` as props, so a
 * monochrome or reversed variant was one prop away. A PNG has no such handle:
 * the variants below are CSS filters over fixed pixels. They are good enough for
 * a stamp on a dark tile and they are NOT a substitute for a real single-colour
 * drawing — if this needs embroidery, a one-colour print, or a die-cut sticker,
 * commission a vector version rather than filtering this one.
 *
 * ── HOW IT WAS EXTRACTED ────────────────────────────────────────────────────
 *
 * Cropped from the primary-logo panel of the supplied brand sheet (the largest,
 * cleanest instance), keyed off the near-white card, trimmed to the mark's true
 * alpha bounds and padded square so every export is centred identically.
 *
 * The keying is the part worth knowing about: the mark's own facet SEAMS are
 * white and run out to the silhouette edge, so they are continuous with the card
 * behind it. No flood-fill can separate the two — it leaks straight down every
 * seam. A morphological closing bridges the seams (a few pixels) while leaving
 * the genuinely wide gaps between wing and body open, and one pixel of erosion
 * removes the white fringe that is invisible on a white page and obvious on the
 * dark one this actually sits on.
 *
 * ⚠ IMPORTED, NOT REFERENCED BY PATH. `base` is "./" so the site can serve from
 * both a domain root and a Pages subpath; an `/logo.png` string would bypass
 * that and 404 on one of them. The import lets Vite fingerprint and rewrite it.
 */

export interface MarkProps {
  size?: number;
  title?: string;
  className?: string;
  /**
   * `mono` renders it as a single-tone silhouette for a one-colour context;
   * `invert` flips it light for a dark stamp. Both are CSS filters over the
   * artwork — see the header for why that is a compromise and not a system.
   */
  variant?: "full" | "mono" | "invert";
}

const FILTER: Record<NonNullable<MarkProps["variant"]>, string | undefined> = {
  full: undefined,
  mono: "grayscale(1) contrast(1.15) brightness(0.75)",
  invert: "grayscale(1) brightness(0) invert(1)",
};

export function Mark({ size = 32, title, className, variant = "full" }: MarkProps) {
  return (
    <img
      src={symbolUrl}
      width={size}
      height={size}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      className={className}
      style={{
        display: "block",
        // The export is square with the bird centred, so `contain` keeps the
        // proportions at any box size without a second cropped asset.
        objectFit: "contain",
        filter: FILTER[variant],
      }}
      // The mark is decorative beside the wordmark and load-bearing in the
      // header; either way it is above the fold and should not be deferred.
      loading="eager"
      decoding="async"
    />
  );
}

/**
 * The app/favicon tile: the mark on the brand ground, in a rounded square.
 *
 * ⚠ SCALED UP INSIDE THE TILE rather than dropped in at its drawing size. A mark
 * that keeps its clear space inside a 512px icon looks timid on a home screen,
 * and at 16px it disappears into the corner radius.
 */
export function AppIcon({ size = 64, radius = 0.22 }: { size?: number; radius?: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: size * radius,
        background: "var(--ink)",
        border: "1px solid var(--hairline)",
      }}
    >
      <Mark size={size * 0.72} />
    </span>
  );
}

/**
 * The wordmark.
 *
 * ⚠ `Clue` IS THE HEAVY HALF. It is the other way round in the supplied artwork
 * from how this file first had it — Clue is set solid and Lake lighter, so the
 * compound reads as two words with no space, capital or colour doing the work.
 * Matching the artwork matters more than the earlier guess did.
 *
 * Set in the UI face rather than drawn as paths: live text stays crisp at every
 * size and on every DPI, is selectable, and is read by search engines. What
 * makes it a wordmark rather than a heading is the tracking and the weight
 * split, and both survive as CSS.
 */
export function Wordmark({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontSize: size,
        fontWeight: 400,
        letterSpacing: "-0.022em",
        lineHeight: 1,
        color: "var(--text)",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontWeight: 680 }}>Clue</span>
      <span style={{ color: "var(--text-dim)" }}>Lake</span>
    </span>
  );
}

/** Symbol + wordmark, side by side. The header lockup. */
export function LockupHorizontal({ size = 22 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.4 }}>
      <Mark size={size * 1.5} title="ClueLake" />
      <Wordmark size={size} />
    </span>
  );
}

/** Symbol over wordmark. For square spaces — a README, a sticker, a store listing. */
export function LockupStacked({ size = 56 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: size * 0.22 }}>
      <Mark size={size} title="ClueLake" />
      <Wordmark size={size * 0.4} />
    </span>
  );
}
