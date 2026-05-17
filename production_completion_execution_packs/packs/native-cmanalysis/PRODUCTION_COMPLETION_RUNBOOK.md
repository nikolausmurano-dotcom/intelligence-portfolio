# Production Completion Runbook: native-cmanalysis

Generated: 2026-05-17T02:29:24+00:00

## Project

- Product name: Collection Management Analysis
- Project class: software_or_instrument
- Final object type: analytic method or human-AI evaluation module
- Production state: production_complete
- Closure lane: live_case_calibration
- Production complete: yes

## Blocking Gates

- None recorded.

## Evidence Files To Supply

- `live_case_input.json`: Captures the non-sample case used for calibration.
- `live_case_output.json`: Captures observed output from the project instrument.
- `calibration_review_note.md`: Assesses expected vs. observed behavior.
- `reviewer_validation_note.md`: Records clearly labeled review or technical audit before promotion.

## Execution Steps

1. Run the project against at least one live or non-sample case.
2. Record expected behavior, observed behavior, and any calibration drift.
3. Add a reviewer note assessing whether the result is reliable enough for public claims.

## Promotion Rule

After the evidence files are supplied, rerun the evidence-vault validator and the production-complete control plane. Promotion is not allowed until all blocking gates close.
