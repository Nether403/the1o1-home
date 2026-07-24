# Verification Receipt

Date: 2026-07-24

Build ID: `eS2UeCe_WTej3dG8N8een`

This receipt records the local production verification for the proof-first
Relay redesign. It is not a claim about an undeployed production environment.

## Commands

| Command | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run test:unit` | 13 tests passed across 5 files |
| `npm run build` | Passed, no build warnings |
| `npm run test:budgets` | Passed |
| `npx playwright test` | 39 browser tests passed |
| `npm audit --audit-level=high` | 0 vulnerabilities |

## Build Measurements

| Metric | Measured | Budget |
|---|---:|---:|
| First-load JavaScript, gzip | 110.9 KB | 125 KB |
| CSS, gzip | 13.3 KB | 25 KB |
| Largest normal async chunk, gzip | 58.4 KB | 80 KB |
| Rapier client WASM, gzip | 426.8 KB | 470 KB |
| Explicit font preloads | 0 | 6 maximum |
| Initial font transfer | Under 320 KB | 320 KB |
| Third-party font requests | 0 | 0 |

## Browser Coverage

The Playwright suite verifies:

- Desktop Chromium and a mobile Chrome profile.
- All seven dealt hero registers.
- Automated WCAG A/AA scans.
- 320px overflow and mobile chapter navigation.
- No-JavaScript hero and server-side inquiry validation.
- Reduced-motion startup and runtime teardown.
- Keyboard-operable Relay console and Toy evidence controls.
- Inquiry validation and preservation when delivery fails.
- Initial font requests and transferred bytes.
- Clean browser console during the primary flow.

## Not Verified Here

- A live Resend delivery using production credentials and a verified sender.
- Railway DNS, TLS, headers, logs, or production resource usage.
- Production Lighthouse performance under a throttled mobile network.
- Firefox, Safari/WebKit, a real mobile device, or a manual screen-reader pass.
- Availability or permissions for future anonymized client evidence.

These remain launch checks in `LAUNCH.md` and should not be inferred from this
local receipt.
