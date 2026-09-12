# cluelake.com

The marketing site for **ClueLake** — a standalone Kubernetes observability
platform, and a product of Orkastor Ltd.

Static build (Vite + React + Tailwind), served by **GitHub Pages** from this
repository. Brand system lives at [`/#/brand`](https://cluelake.com/#/brand) and
is rendered from the same components the site header uses, so it cannot drift
from the real mark.

## Local

```
npm install
npm run dev       # http://localhost:5173
npm run build     # -> dist/
```

## ⚠ Two things that break the site silently

**`public/CNAME` is the custom-domain setting.** GitHub Pages reads it on every
build. A deploy without it reverts the site to `kubegraf.github.io/cluelake.com`
and the domain stops serving.

**`base` in `vite.config.ts` is pinned to `public/CNAME`.** It is `/` because the
site serves from a domain root. If the custom domain is ever removed, `base` has
to go back to `/cluelake.com/` in the same change — getting this wrong does not
fail the build, it ships a page with no CSS and no JavaScript.

## ⚠ This repo is public, so CI uses `ubuntu-latest`

Every other workflow in this org uses `runs-on: kubegraf-org-runners`. That
label **silently never runs** in a public repository: the Default runner group
is `allows_public_repositories: false`, so the job sits queued until somebody
cancels it, with nothing in the log to read.

This repo has to be public for GitHub Pages to serve it. The reasons behind the
self-hosted policy — secrets, VPC egress, cluster access — do not apply here: it
builds a static page from public source. `agentenx.com` is the other repo in the
same position and carries the same note. If any of that stops being true, this
needs revisiting rather than extending.

## DNS

Records are Terraform, in `kubegraf-infra` at
`terraform/aws/shared/cloudflare-dns/cloudflare_cluelake_dns.tf`. Four apex A
records to GitHub Pages' anycast set, plus `www` as a CNAME. Every record is
grey-cloud (unproxied) on purpose: Pages issues and renews the TLS certificate
itself via an HTTP-01 challenge, and proxying breaks that in a way that surfaces
months later as an expired certificate.
