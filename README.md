
- `non_overlap_evidence_vault_validator/`: static validator and promotion ledger for residual evidence vaults.
- `production_complete_control_plane/`: production-complete gate, master ledger, and blocking gap queue.
- `production_completion_execution_packs/`: per-project production completion runbooks and evidence checklists.
- `hosted_deployment_smoke_runner/`: post-upload hosted route and artifact smoke runner for runtime projects.
- `active_lane_production_complete/`: active-only production campaign for the 131 projects, excluding external-owner work.
- `room_engine_operationalization/`: per-project room-engine slices with instruments, fixtures, acceptance tests, runner, and receipts; this proves package-level operational slices, not full external-system completion.
- `room_runtime_kernel/`: shared browser runtime for the room-engine layer; it runs project instruments, persists state locally, evaluates package-slice acceptance checks, and exports reviewer-visible JSON receipts.
