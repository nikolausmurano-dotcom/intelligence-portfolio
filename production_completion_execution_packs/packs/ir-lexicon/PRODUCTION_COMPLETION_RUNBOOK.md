# Production Completion Runbook: ir-lexicon

Generated: 2026-05-17T20:33:54+00:00

## Project

- Product name: IR Lexicon - coined-term lexicon for modern foreign-affairs discourse
- Project class: software_or_instrument
- Final object type: research workflow software module
- Production state: production_complete
- Closure lane: runtime_deployment_validation
- Production complete: yes

## Blocking Gates

- None recorded.

## Evidence Files To Supply

- `desktop_screenshot.png`: Shows desktop rendering of the real project surface.
- `mobile_screenshot.png`: Shows mobile rendering of the real project surface.
- `hosted_deployment_smoke.json`: Records HTTP status and required artifact fetches after upload.
- `reviewer_validation_note.md`: Records clearly labeled review or technical audit result and remaining defects.

## Execution Steps

1. Open the live project surface and run a representative non-sample action.
2. Capture desktop and mobile screenshots of the actual result surface.
3. Run a hosted-route smoke check and save the JSON result.
4. Add a reviewer validation note that records what was checked and what still fails.

## Promotion Rule

After the evidence files are supplied, rerun the evidence-vault validator and the production-complete control plane. Promotion is not allowed until all blocking gates close.
