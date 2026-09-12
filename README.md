# cluelake.com

The ClueLake website. Next.js 15 (App Router), TypeScript, Tailwind CSS 4.

ClueLake is a Kubernetes observability platform, and a product of Orkastor Ltd.

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

```bash
npm run lint           # eslint
npm run typecheck      # tsc --noEmit
npm run build          # production build
npm start              # serve the build
```

## Docker

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://cluelake.com -t cluelake-web .
docker run --rm -p 3000:3000 cluelake-web
```

Multi-stage, Next.js `standalone` output, non-root (uid 10001), read-only-friendly,
health check on `/health`. Deployable to Vercel, any container platform, or behind
CloudFront / ALB / nginx — no provider assumptions in the code.

## ⚠ Hosting changed: this is a server, not a static export

The site used to be a Vite build on GitHub Pages. It is now a Next.js app with a
server route (`/api/contact`), so **it cannot be statically exported** and Pages
can no longer host it. The Pages workflow and `public/CNAME` have been removed.

**Until the container is deployed, cluelake.com continues to serve the last Pages
build.** The cutover order matters and reversing it takes the site down:

0. an admin applies `prod/namespace.yaml` once — CI cannot create a
   cluster-scoped object, and that is the access model working rather than a
   gap to widen
1. `deploy-cluster.yml` builds the image and rolls it out on kubegraf-prod
2. a cluster admin applies `prod/certificate.yaml`, then the gateway listeners,
   then `prod/routes.yaml` (CI deliberately cannot — see that file)
3. DNS moves from the GitHub Pages addresses to the gateway

## Brand

⚠ **The logo is supplied artwork and is never redrawn, recoloured, or placed in a
container.** `public/brand/cluelake-symbol.png` is the mark already live on
cluelake.com. `components/brand/Logo.tsx` renders it at every size from that one
file; the wordmark beside it is live text (`Clue` solid, `Lake` lighter), matching
the supplied artwork.

The palette is **sampled from the mark** — its facets measure `#0a547b` through
`#2a7e9a` to `#4697ac` — so the accent is the same hue family rather than a
colour system competing with the logo. Light theme uses a deeper value because
the dark accent fails contrast on white.

## Layout

```
app/                    routes, metadata, sitemap, robots, API
components/brand/       the supplied logo
components/layout/      header (with mobile drawer), footer, page header
components/ui/          button, section, chip, code block
components/product/     the interactive product interfaces
components/sections/    composable page sections
lib/config/             site config — no hostname is hardcoded in a component
lib/demo/               ⚠ demonstration data for the site. NOT product data.
lib/contact/            validation (shared) and delivery (server-only)
lib/seo/ lib/analytics/ metadata helper, vendor-agnostic analytics
prod/                   Kubernetes manifests
```

## ⚠ Demo data is isolated and never fetched

Every product interface on this site is driven by `lib/demo/data.ts` — one fixed
scenario, so the same incident runs through every section. **There is no mock API
and no fake endpoint.** The components take data as props and would render live
telemetry unchanged.

## Environment

Only `NEXT_PUBLIC_*` variables reach the browser. Everything else is server-only.

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URLs, OpenGraph, sitemap. Baked in at build time. |
| `NEXT_PUBLIC_ANALYTICS` | no | `plausible` \| `posthog` \| `ga4`. Unset loads no script at all. |
| `CONTACT_PROVIDER` | no | Unset means the form **refuses** submissions rather than dropping them silently. |
| `CONTACT_TO` / `CONTACT_FROM` | with provider | |
| `RESEND_API_KEY` | with resend | Server-only. Never `NEXT_PUBLIC_`. |

## What this site deliberately does not contain

No customer logos, testimonials, benchmarks, funding, awards or certifications —
because none of those exist yet, and a careful evaluator checks. The security
page states plainly that there is no SOC 2 or ISO 27001 attestation. The
changelog is an empty state rather than invented release history. Legal pages say
the documents are not published yet instead of generating plausible clauses.
