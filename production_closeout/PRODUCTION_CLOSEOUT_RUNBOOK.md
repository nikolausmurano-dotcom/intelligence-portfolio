# Production Closeout Runbook

## Phase 1: Upload

Upload the latest active-lane ZIP to the Porkbun web root.

Two deployment paths are supported:

1. GitHub Connect: the deployment repo has been updated and pushed. If Porkbun is connected to that repo and branch, it should publish the pushed commit automatically.
2. FTP/FTPS: if GitHub Connect is not active, set `PORKBUN_FTP_HOST`, `PORKBUN_FTP_USERNAME`, and `PORKBUN_FTP_PASSWORD`, then run from the local `SHAY_PACKAGE` folder:

```powershell
DEPLOY_TO_PORKBUN_FTP_20260517.cmd
```

The FTP uploader writes an audit manifest and does not print the password.

## Phase 2: Hosted Smoke

Preferred one-command finalizer after upload, run from the local `SHAY_PACKAGE` working folder:

```powershell
python '_audit_scripts\finalize_active_lane_after_porkbun_upload_20260517.py' --base-url 'https://nikmurano.com'
```

The finalizer runs the hosted smoke gate first. If the public sentinels do not byte-match the local package, it stops before promotion and writes a failure audit.

Manual hosted-smoke command:

Run:

```powershell
python '_audit_scripts\build_hosted_deployment_smoke_runner_20260516.py' --base-url 'https://nikmurano.com' --write-vaults-if-current
```

If the public sentinels do not byte-match, do not write hosted evidence.

## Phase 3: Review-Note Boundary

Review notes are already present as clearly labeled Codex technical review notes. They are not independent external human reviews, advisor feedback, or venue feedback.

Open the signoff workbench only if an actual human, advisor, venue, or owner review is being added later:

```text
production_signoff_workbench/index.html
```

Any added review must be labeled honestly:

   - independent external review
   - advisor or venue review
   - owner-signed internal review
   - Codex technical audit, if applicable, but do not call it human review

## Phase 4: Post-Smoke Rebuild

Run:

```powershell
python '_audit_scripts\build_non_overlap_evidence_vault_validator_20260515.py'
python '_audit_scripts\build_production_complete_control_plane_20260516.py'
python '_audit_scripts\build_production_completion_execution_packs_20260516.py'
python '_audit_scripts\build_active_lane_signoff_workbench_20260517.py'
python '_audit_scripts\build_active_lane_production_campaign_20260516.py'
python '_audit_scripts\build_active_lane_production_closeout_20260517.py'
```

## Phase 5: Final Acceptance

The active lane is fully production-grade only when:

- Active production complete count: `131`
- Blocking active gaps: `0`
- Hosted smoke: passing on `https://nikmurano.com`
- Evidence vault promotions: `131`
- ZIP: under `40 MB`
- No private paths
- No mojibake
- No broken local release links
