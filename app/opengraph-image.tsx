import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/lib/config/site";

/**
 * The social card for every share of this site.
 *
 * ── ⚠ WHY THIS FILE EXISTS AT ALL ───────────────────────────────────────────
 *
 * `lib/seo/metadata.ts` has always declared `twitter: { card:
 * "summary_large_image" }` and there was no image anywhere on the site. That is
 * worse than declaring nothing: the card tells Slack, LinkedIn and X to render
 * the large-image treatment and then supplies no image, so every share of
 * cluelake.com came out as a blank rectangle with a line of text under it.
 *
 * Next fills BOTH `og:image` and `twitter:image` from this file by convention.
 * There is no meta tag to add by hand, and adding one would be a second place
 * for the URL to go stale.
 *
 * ── ⚠ THE MARK IS THE SUPPLIED FILE, NOT A REDRAWING ────────────────────────
 *
 * The README is explicit: the logo is supplied artwork and is never redrawn,
 * recoloured or placed in a container. So this reads the real PNG off disk and
 * embeds it. Rebuilding the facets as divs would be a second, drifting copy of
 * the mark — which is exactly what `.orkastor-brand/check_brand.py` exists to
 * catch elsewhere in the estate.
 *
 * ── ⚠ NO WEBFONT, DELIBERATELY ──────────────────────────────────────────────
 *
 * `ImageResponse` can load a font, but only by fetching it at build time. A
 * build that reaches the network to render a social card is a build that fails
 * on a bad day for a picture nobody is looking at yet. The system stack renders
 * this fine, and the wordmark's weight contrast survives it.
 */
export const alt = `${site.name} — deployment-aware observability`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0d1117";
const LINE = "#1d2630";
const FG = "#e8edf3";
const MUTED = "#9aa7b6";
const ACCENT = "#4fb3d1";

export default async function OpengraphImage() {
  // 180px artwork rather than the 512: it renders at 96px here, and the smaller
  // file keeps the base64 out of the megabyte range.
  const markData = readFileSync(join(process.cwd(), "public/brand/cluelake-symbol-180.png"));
  const mark = `data:image/png;base64,${markData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", background: BG, padding: 72,
          // The same faint technical grid the hero draws, at card scale.
          backgroundImage:
            `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={mark} width={96} height={96} alt="" />
          <div style={{ display: "flex", fontSize: 46, letterSpacing: -1 }}>
            <span style={{ color: FG, fontWeight: 700 }}>Clue</span>
            <span style={{ color: MUTED, fontWeight: 400 }}>Lake</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: FG, fontSize: 76, fontWeight: 600, letterSpacing: -2.5 }}>
            Observe everything.
          </div>
          <div style={{ display: "flex", color: FG, fontSize: 76, fontWeight: 600, letterSpacing: -2.5 }}>
            Understand what changed.
          </div>
          {/* The drawn rule from the hero, held at its finished state. */}
          <div style={{ display: "flex", width: 232, height: 7, borderRadius: 999, background: ACCENT, marginTop: 14 }} />
        </div>

        <div style={{ display: "flex", color: MUTED, fontSize: 26 }}>
          Kubernetes-native · OpenTelemetry-native · eBPF visibility
        </div>
      </div>
    ),
    size,
  );
}
