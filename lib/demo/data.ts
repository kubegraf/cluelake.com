/**
 * ⚠ DEMONSTRATION DATA FOR THE MARKETING SITE. NOT PRODUCT DATA.
 *
 * Everything in this file is a fixed, hand-written scenario used to drive the
 * product interfaces on this website. It is deliberately isolated in one module
 * under `lib/demo/` so that:
 *
 *   • nothing here can be mistaken for a real API response;
 *   • the product components stay honest — they take data as props and would
 *     render live telemetry unchanged;
 *   • one coherent story runs across every section, because every section reads
 *     these same constants rather than inventing its own numbers.
 *
 * ⚠ THE COMPONENTS NEVER FETCH. There is no mock server and no fake endpoint on
 * this site: the demos are local state over these values. A marketing page that
 * calls a pretend API is a page that will one day appear to be broken.
 *
 * The scenario: checkout's p99 latency degrades immediately after a deployment,
 * and the deployment is the cause.
 */

export const INCIDENT_AT = "14:03";
export const DEPLOY_AT = "14:02";

export const scenario = {
  service: "checkout",
  environment: "production",
  deployment: "checkout-production",
  deploymentId: "dep_91f2a4",
  build: "#482",
  commit: "a1b2c3d",
  commitMessage: "cache: drop the per-request client",
  actor: "ada@example.com",
  imageBefore: "sha256:731f01",
  imageAfter: "sha256:9ab3c2",
  p99Before: "2.1s",
  p99After: "8.4s",
  errorRate: "4.2%",
  replicas: 6,
} as const;

/** p99 in milliseconds, one point per minute from 13:50. The step at index 13
 *  is the regression; the deployment lands one minute earlier. */
export const p99Series: number[] = [
  2080, 2110, 2040, 2130, 2090, 2050, 2120, 2100, 2070, 2110,
  2060, 2090, 2100, 2150, 6900, 8200, 8400, 8350, 8420, 8380,
  8300, 8410, 5200, 2180, 2120,
];

/** Request rate, same window and cadence. Traffic did not change — which is the
 *  point: the regression is not load. */
export const rateSeries: number[] = [
  412, 419, 405, 421, 418, 409, 425, 430, 417, 422,
  414, 428, 419, 424, 421, 417, 425, 419, 412, 427,
  420, 418, 423, 416, 421,
];

export const errorSeries: number[] = [
  0.2, 0.1, 0.2, 0.3, 0.2, 0.1, 0.2, 0.2, 0.3, 0.2,
  0.1, 0.2, 0.2, 0.4, 1.1, 3.2, 4.2, 4.0, 4.1, 3.9,
  3.6, 4.2, 2.1, 0.4, 0.3,
];

/** The index in the series where the deployment landed. */
export const DEPLOY_INDEX = 13;

export type TimelineEvent = {
  time: string;
  kind: "healthy" | "deployment" | "regression" | "errors" | "rollback";
  title: string;
  detail?: string;
};

export const timeline: TimelineEvent[] = [
  { time: "13:58", kind: "healthy", title: "Healthy", detail: "p99 2.1s · errors 0.2%" },
  { time: "14:02", kind: "deployment", title: "Deployment", detail: "checkout-production · build #482" },
  { time: "14:03", kind: "regression", title: "p99 increased", detail: "2.1s → 8.4s" },
  { time: "14:04", kind: "errors", title: "Error rate increased", detail: "0.2% → 4.2%" },
  { time: "14:05", kind: "rollback", title: "Rolled back", detail: "to sha256:731f01" },
];

export type LogLine = {
  ts: string;
  severity: "ERROR" | "WARN" | "INFO";
  app: string;
  message: string;
  traceId?: string;
};

export const logs: LogLine[] = [
  { ts: "14:03:17.842", severity: "ERROR", app: "checkout", message: "upstream request failed: payments timeout after 5000ms", traceId: "7f8c21ab" },
  { ts: "14:03:17.615", severity: "ERROR", app: "checkout", message: "upstream request failed: payments timeout after 5000ms", traceId: "7f8c21ac" },
  { ts: "14:03:16.401", severity: "WARN",  app: "payments", message: "connection pool exhausted, waiting for a free connection", traceId: "7f8c21ab" },
  { ts: "14:03:15.982", severity: "WARN",  app: "payments", message: "connection pool exhausted, waiting for a free connection" },
  { ts: "14:03:12.114", severity: "INFO",  app: "checkout", message: "handling POST /api/checkout", traceId: "7f8c21ab" },
  { ts: "14:02:58.067", severity: "INFO",  app: "checkout", message: "starting worker, image sha256:9ab3c2" },
];

/** Log patterns: the same line collapsed by shape, which is the first useful
 *  question on a busy service — "what is the shape of this", not "what is line
 *  40,000". */
export const logPatterns = [
  { pattern: "upstream request failed: payments timeout after <n>ms", count: 1829, severity: "ERROR" as const },
  { pattern: "connection pool exhausted, waiting for a free connection", count: 640, severity: "WARN" as const },
  { pattern: "handling POST /api/checkout", count: 25104, severity: "INFO" as const },
];

export type Span = {
  id: string; name: string; service: string; depth: number;
  startPct: number; widthPct: number; ms: number; error?: boolean;
};

/** One trace through the regression. Widths are percentages of the root span. */
export const spans: Span[] = [
  { id: "s1", name: "POST /api/checkout", service: "checkout",  depth: 0, startPct: 0,   widthPct: 100, ms: 8412 },
  { id: "s2", name: "authorize",          service: "auth",      depth: 1, startPct: 1,   widthPct: 4,   ms: 340 },
  { id: "s3", name: "charge",             service: "payments",  depth: 1, startPct: 6,   widthPct: 88,  ms: 7410, error: true },
  { id: "s4", name: "SELECT card",        service: "postgres",  depth: 2, startPct: 8,   widthPct: 8,   ms: 660 },
  { id: "s5", name: "GET token",          service: "redis",     depth: 2, startPct: 17,  widthPct: 74,  ms: 6220, error: true },
  { id: "s6", name: "reserve",            service: "inventory", depth: 1, startPct: 95,  widthPct: 4,   ms: 310 },
];

export type ServiceNode = {
  id: string; label: string; kind: "service" | "datastore";
  x: number; y: number; rps: number; errPct: number; p99ms: number;
};

export const serviceNodes: ServiceNode[] = [
  { id: "checkout",  label: "checkout",  kind: "service",   x: 12, y: 50, rps: 421, errPct: 4.2, p99ms: 8412 },
  { id: "auth",      label: "auth",      kind: "service",   x: 42, y: 16, rps: 421, errPct: 0.0, p99ms: 340 },
  { id: "payments",  label: "payments",  kind: "service",   x: 42, y: 50, rps: 418, errPct: 6.1, p99ms: 7410 },
  { id: "inventory", label: "inventory", kind: "service",   x: 42, y: 84, rps: 402, errPct: 0.1, p99ms: 310 },
  { id: "postgres",  label: "postgres",  kind: "datastore", x: 76, y: 32, rps: 396, errPct: 0.0, p99ms: 660 },
  { id: "redis",     label: "redis",     kind: "datastore", x: 76, y: 68, rps: 410, errPct: 5.8, p99ms: 6220 },
];

export const serviceEdges: Array<{ from: string; to: string; degraded?: boolean }> = [
  { from: "checkout", to: "auth" },
  { from: "checkout", to: "payments", degraded: true },
  { from: "checkout", to: "inventory" },
  { from: "payments", to: "postgres" },
  { from: "payments", to: "redis", degraded: true },
];

/** The structured fields ClueLake stamps onto every event at ingest. */
export const contextFields = [
  "workspace_id", "environment_id", "application", "deployment_id",
  "image_digest", "build_id", "commit_sha", "replica",
] as const;
