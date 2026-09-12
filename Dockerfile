# syntax=docker/dockerfile:1.7
# -----------------------------------------------------------------------------
# cluelake.com — the ClueLake website.
#
# Next.js in `standalone` output: the build traces exactly the node_modules it
# needs into .next/standalone, so the runtime stage carries a server and its
# real dependencies rather than the whole install.
#
#   deps   npm ci, cached on the lockfile alone
#   build  next build
#   run    node, non-root, minimal
# -----------------------------------------------------------------------------

# ⚠ PINNED BY DIGEST, NOT TAG. `node:22-alpine` is a moving target: the same
# Dockerfile builds a different base on a different day, which is the whole
# class of "it worked yesterday" this can do without.
FROM node:22-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS deps
WORKDIR /src
COPY package.json package-lock.json ./
# `npm ci`, not `install`: the lockfile is the input. A build that quietly
# resolves a different tree ships something nobody reviewed.
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --fund=false

FROM node:22-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS build
WORKDIR /src
COPY --from=deps /src/node_modules ./node_modules
COPY . .
# ⚠ THE PUBLIC SITE URL IS BAKED IN AT BUILD TIME, because canonical tags and
# the sitemap are generated during `next build`. An image built without it has
# the fallback hostname in its metadata, which is wrong on staging and invisible
# until somebody checks a canonical tag.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS run
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# ⚠ NON-ROOT, AND THE FILES ARE NOT OWNED BY IT. The app writes nothing at
# runtime, so everything is owned by root and merely readable — a web root the
# server process can rewrite is how a compromised process persists.
RUN addgroup -g 10001 -S app && adduser -u 10001 -S app -G app

COPY --from=build --chown=root:root /src/.next/standalone ./
COPY --from=build --chown=root:root /src/.next/static ./.next/static
COPY --from=build --chown=root:root /src/public ./public

USER 10001:10001
EXPOSE 3000

# Hits the real app rather than a bare TCP check, so a server that is listening
# but failing to render is unhealthy rather than green.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
