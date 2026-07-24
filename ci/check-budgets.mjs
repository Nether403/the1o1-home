#!/usr/bin/env node
/**
 * M5 — CI perf budget gate.
 *
 * Reads the .next build output and enforces ci/budgets.json:
 *  1. first-load JS (gzip) for the / route
 *  2. total CSS (gzip)
 *  3. every async chunk vs. the default budget (with named exceptions,
 *     e.g. the scroll-gated rapier physics chunk)
 *  4. font preload count (spine faces only — display faces load on demand)
 *  5. parity strings present in prerendered HTML + reduced-motion CSS rules
 *
 * Exit code 1 on any violation. No exceptions, no launch.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const budgets = JSON.parse(readFileSync("ci/budgets.json", "utf8"));
const NEXT = ".next";
const failures = [];
const report = [];

const gz = (p) => gzipSync(readFileSync(p)).length;
const kb = (n) => (n / 1024).toFixed(1) + "KB";

/* ---------- 1. first-load JS for / ---------- */
const buildManifest = JSON.parse(readFileSync(join(NEXT, "build-manifest.json"), "utf8"));
const appBuildManifest = JSON.parse(readFileSync(join(NEXT, "app-build-manifest.json"), "utf8"));
const firstLoadFiles = new Set([
  ...(buildManifest.rootMainFiles ?? []),
  ...(appBuildManifest.pages?.["/page"] ?? []).filter((f) => f.endsWith(".js")),
]);
let firstLoad = 0;
for (const f of firstLoadFiles) {
  const p = join(NEXT, f);
  if (existsSync(p)) firstLoad += gz(p);
}
report.push(`first-load JS (gzip): ${kb(firstLoad)} / budget ${kb(budgets.firstLoadJsGzip)}`);
if (firstLoad > budgets.firstLoadJsGzip) failures.push(`first-load JS ${kb(firstLoad)} exceeds ${kb(budgets.firstLoadJsGzip)}`);

/* ---------- 2. CSS ---------- */
const cssDir = join(NEXT, "static", "css");
let cssTotal = 0;
if (existsSync(cssDir)) for (const f of readdirSync(cssDir)) if (f.endsWith(".css")) cssTotal += gz(join(cssDir, f));
report.push(`css (gzip): ${kb(cssTotal)} / budget ${kb(budgets.cssGzip)}`);
if (cssTotal > budgets.cssGzip) failures.push(`css ${kb(cssTotal)} exceeds ${kb(budgets.cssGzip)}`);

/* ---------- 3. async chunks ---------- */
const chunkDir = join(NEXT, "static", "chunks");
const firstLoadNames = new Set([...firstLoadFiles].map((f) => f.split("/").pop()));
for (const f of readdirSync(chunkDir)) {
  if (!f.endsWith(".js") || firstLoadNames.has(f)) continue;
  const size = gz(join(chunkDir, f));
  const raw = readFileSync(join(chunkDir, f), "utf8");
  const isPhysics = raw.includes("RigidBody") || raw.includes("rapier");
  const budget = isPhysics ? budgets.asyncChunkGzipExceptions.physics : budgets.asyncChunkGzipDefault;
  const tag = isPhysics ? " [physics-exception]" : "";
  report.push(`async ${f}: ${kb(size)} / ${kb(budget)}${tag}`);
  if (size > budget) failures.push(`async chunk ${f} ${kb(size)} exceeds ${kb(budget)}${tag}`);
}

/* ---------- 4 + 5. prerendered HTML checks ---------- */
const htmlPath = join(NEXT, "server", "app", "index.html");
if (existsSync(htmlPath)) {
  const html = readFileSync(htmlPath, "utf8");
  const preloads = (html.match(/rel="preload"[^>]*as="font"/g) ?? []).length;
  report.push(`font preloads: ${preloads} / max ${budgets.fontPreloadCountMax}`);
  if (preloads > budgets.fontPreloadCountMax) failures.push(`${preloads} font preloads exceed max ${budgets.fontPreloadCountMax}`);
  if (/fonts\.(googleapis|gstatic)\.com/.test(html)) failures.push("third-party font request found in HTML");
  for (const s of budgets.requiredStrings.html) {
    if (!html.includes(s)) failures.push(`parity: prerendered HTML is missing "${s}"`);
  }
  let cssAll = "";
  if (existsSync(cssDir)) for (const f of readdirSync(cssDir)) if (f.endsWith(".css")) cssAll += readFileSync(join(cssDir, f), "utf8");
  for (const s of budgets.requiredStrings.css) {
    if (!cssAll.includes(s)) failures.push(`parity: CSS is missing "${s}"`);
  }
} else {
  failures.push("prerendered index.html not found — is / still statically generated?");
}

/* ---------- verdict ---------- */
console.log("── perf budget report ──");
report.forEach((l) => console.log("  " + l));
if (failures.length) {
  console.error("\n✖ BUDGET FAILURES:");
  failures.forEach((f) => console.error("  ✖ " + f));
  process.exit(1);
}
console.log("\n✓ all budgets enforced — clear to merge");
