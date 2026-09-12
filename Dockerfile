# syntax=docker/dockerfile:1.7
# -----------------------------------------------------------------------------
# cluelake.com — the ClueLake marketing site.
#
# Mirrors kubegraf/domineta-site: the config, the pages and their .gz twins are
# ONE artifact, the Deployment pins its DIGEST, and nothing can change under a
# running pod without producing a new digest and therefore a new rollout.
#
#   deps    npm ci, cached on the lockfile alone so a source edit does not
#           reinstall the tree
#   build   vite build -> dist/, then gzip -9 a .gz beside every asset
#   run     nginx-unprivileged, non-root, read-only root filesystem
# -----------------------------------------------------------------------------

# ⚠ PIN BY DIGEST, NOT BY TAG. `node:22-alpine` is a moving target: the same
# Dockerfile builds a different base on a different day, which is the whole
# class of "it worked yesterday" this repo can do without.
FROM node:22-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS deps
WORKDIR /src
COPY package.json package-lock.json ./
# `npm ci`, not `install`: the lockfile is the input. A build that quietly
# resolves a different tree is a build that ships something nobody reviewed.
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --fund=false

FROM deps AS build
WORKDIR /src
COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html ./
COPY public ./public
COPY src ./src
RUN npx tsc -b && npx vite build

# ⚠ gzip -k -9, AND IT ONLY PAYS BECAUSE IT RUNS ONCE. nginx's per-request gzip
# is level 6; doing it here costs build time nobody waits on and saves bytes on
# every request forever. `-k` keeps the original, which nginx still needs for
# clients that send no Accept-Encoding.
RUN find dist -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.svg' \) \
      -exec gzip -k -9 {} \;

# ⚠ UNPRIVILEGED, AND NOT THE SAME IMAGE AS `nginx`. This one runs as uid 101,
# listens on 8080 and writes its temp files under /tmp — which is what lets the
# pod run with runAsNonRoot and a read-only root filesystem.
FROM nginxinc/nginx-unprivileged:1.29-alpine@sha256:0c79d56aee561a1d81c63f00eee5fb5fe29279560cdc55e91425133104c7fbe6 AS run

# Nothing is written at runtime, so everything is owned by root and read by
# nginx. A world-writable web root is how a compromised worker rewrites a page.
COPY --chown=root:root --chmod=444 deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=root:root /src/dist /usr/share/nginx/html

EXPOSE 8080

# The same path the Deployment's probes use, so a failing container fails the
# same way under `docker run` as it does in the cluster.
HEALTHCHECK --interval=30s --timeout=3s --start-period=2s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
