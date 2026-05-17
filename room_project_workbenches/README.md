# Per-Room Project Workbenches

This layer creates one browser-executable workbench page per project.

Each page loads its own project engine from the room-engine registry, runs that room's instruments, records local state, evaluates acceptance checks, and exports a receipt.

Claim boundary: this is package-level workbench operation. It does not prove that every external production system is complete.
