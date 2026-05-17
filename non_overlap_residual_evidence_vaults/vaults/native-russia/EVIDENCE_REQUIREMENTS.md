# Evidence Requirements: native-russia

- Closure lane: `runtime_deployment_validation`
- Current validation status: `evidence_missing`

## Required Evidence Files

- `desktop_screenshot.png` - Desktop viewport renders the runtime surface and output without layout failure.
- `mobile_screenshot.png` - Mobile viewport renders the runtime surface and output without layout failure.
- `hosted_deployment_smoke.json` - Uploaded route returns HTTP 200 and the route can fetch required artifacts.
- `reviewer_validation_note.md` - A clearly labeled reviewer, owner, advisor, expert, venue, or Codex technical review note records approval, limits, or remaining defects after inspecting the runtime result.

## Promotion Rule

Promotion requires all required files to exist and survive clearly labeled review or technical audit. A complete vault is necessary but not alone sufficient for expert-facing claims.
