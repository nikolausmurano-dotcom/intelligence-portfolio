# Nikmurano.com Domain Cutover Runbook

## Current Verified Release

- Verified release surface: `https://nikolausmurano-dotcom.github.io/intelligence-portfolio/`
- Custom domain under test: `https://nikmurano.com/`
- GitHub Pages route pass: `True`
- Custom domain serves this release: `False`

## Required External Action

Choose one deployment path and then rerun the final hosted smoke.

1. Enable Porkbun domain API access and replace the current DNS records with the GitHub Pages records listed in `required_dns_records.csv`.
2. Set `PORKBUN_FTP_HOST`, `PORKBUN_FTP_USERNAME`, and `PORKBUN_FTP_PASSWORD`, then run `DEPLOY_TO_PORKBUN_FTP_20260517.cmd` from the SHAY package folder.
3. Use Porkbun Static Hosting GitHub Connect to connect the GitHub repository `nikolausmurano-dotcom/intelligence-portfolio` on branch `master`.

## Required DNS Records For GitHub Pages

| Host | Type | Answer |
|---|---:|---|
| @ | A | `185.199.108.153` |
| @ | A | `185.199.109.153` |
| @ | A | `185.199.110.153` |
| @ | A | `185.199.111.153` |
| www | CNAME | `nikolausmurano-dotcom.github.io` |

## Post-Cutover Gate

After the external action, run:

```powershell
python '_audit_scripts\finalize_active_lane_after_porkbun_upload_20260517.py' --base-url 'https://nikmurano.com'
python '_audit_scripts\build_nikmurano_domain_cutover_control_plane_20260517.py'
```

Do not claim that `nikmurano.com` serves the release until the custom-domain routes in `domain_cutover_state.json` all return `200` for the required proof surfaces.
