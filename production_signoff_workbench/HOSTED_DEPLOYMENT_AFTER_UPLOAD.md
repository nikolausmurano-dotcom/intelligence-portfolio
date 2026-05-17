# Hosted Deployment Evidence Procedure

Runtime projects cannot close `hosted_deployment_smoke.json` until the current ZIP is uploaded to `nikmurano.com`.

## Procedure

1. Upload the current release ZIP to the web root.
2. Run `build_hosted_deployment_smoke_runner_20260516.py --base-url https://nikmurano.com --write-vaults-if-current`.
3. Rerun the evidence-vault validator.
4. Rerun the production control plane.
5. Rerun the active-lane package builder.
6. Upload the refreshed ZIP.
7. Rerun hosted smoke without claiming new vault evidence to confirm the public site byte-matches the final package.

This two-step cycle is necessary because writing hosted evidence into the vault changes the local package.
