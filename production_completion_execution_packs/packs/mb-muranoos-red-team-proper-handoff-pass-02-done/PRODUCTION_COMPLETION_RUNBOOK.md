# Production Completion Runbook: mb-muranoos-red-team-proper-handoff-pass-02-done

Generated: 2026-05-17T02:29:24+00:00

## Project

- Product name: Judgment/status pass; L-01..L-04 non-blocking limitations
- Project class: external_owner_track
- Final object type: research workflow software module
- Production state: external_owner_track_hold
- Closure lane: external_owner_track
- Production complete: no

## Blocking Gates

- **G2 - Reachable build surface**: A page, workbench, instrument, manuscript packet, or hosted route is reachable from the package.
- **G3 - Instrument or workflow executes**: The project can run a representative action, render a result, or expose a completed manuscript/packet workflow.
- **G4 - Non-sample validation**: Evidence includes a non-sample run, live case, external review, or manuscript readiness proof, not only a template/demo.
- **G5 - Source and claim traceability**: Material claims, methods, and source uses are traceable to project files, sources, or reviewer records.
- **G6 - Regression and falsifier checks**: The project has a regression suite, falsifier case, or equivalent challenge condition that prevents easy self-confirmation.
- **G7 - Desktop and mobile evidence**: Rendered output is captured on desktop and mobile or the non-web manuscript/software equivalent is documented.
- **G8 - Deployment or reproducibility smoke**: The route, packet, script, or local runtime can be opened and its required artifacts can be fetched or reproduced.
- **G9 - Review or signoff evidence**: A clearly labeled reviewer, owner, advisor, expert, venue, or Codex technical review note records approval, limits, or remaining defects after inspecting the project result.
- **G10 - No unresolved blocking gaps**: The production ledger has no missing blocking gate and no residual evidence slot required for promotion.

## Evidence Files To Supply

- `external_owner_integration_note.md`: Records what owning-track evidence was imported and what remains unresolved.

## Execution Steps

1. Import the owning track's latest proof ledger without editing that track's source files.
2. Reconcile external proof evidence against the production-complete gate policy.
3. Only then promote the project out of external-owner hold.

## Promotion Rule

After the evidence files are supplied, rerun the evidence-vault validator and the production-complete control plane. Promotion is not allowed until all blocking gates close.
