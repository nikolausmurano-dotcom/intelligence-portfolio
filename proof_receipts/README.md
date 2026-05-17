# Component Proof Receipts

Generated: 2026-05-15T02:51:44

This directory is the receipt-level proof layer for the professional showcase. It translates component demo cases into share-safe verification receipts.

## Scope

- Projects with receipts: 243
- Component receipts: 3639
- Receipt grade counts: {'A': 101, 'P': 3538}
- Evidence status counts: {'local_artifact_verified': 101, 'no_explicit_local_path': 3538}

## Interpretation

- `A` means a declared file-backed component has a verified local artifact.
- `B` means a local artifact exists, but the next proof step is a replayable run trace.
- `P` means the component is verified inside the deploy package through blueprint / instrument-map / proof-build / demo-case artifacts, but still needs a live run trace before it can be called operationally executed.
- `C` means a locator exists but did not resolve.
- `D` means the proof plan exists but a concrete artifact still needs extraction.
- `L` means the component is intentionally limited, private, or abstracted for public presentation.

These receipts do not claim external validation. They define what is currently backed, what would falsify the claim, and what must be built next.
