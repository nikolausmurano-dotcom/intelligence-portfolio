# Failure Mode Note

Project: native-atanalysis

Generated: 2026-05-17T01:47:56+00:00

## Calibration Result

- Decision: PASS_WITH_LIMITS
- Case count: 3
- Case hash: `ea34803b`

## Cases

- native-atanalysis-LC01: alternative hypothesis - PASS_WITH_LIMITS
- native-atanalysis-LC02: assumption exposure - PASS_WITH_LIMITS
- native-atanalysis-LC03: evidence weighting - PASS_WITH_LIMITS

## Failure Modes

1. False positive risk: The workflow may mark a weakly supported public claim as ready if source ceilings are not read alongside the calibration record.
2. False negative risk: The workflow may reject useful exploratory claims too early if all incomplete evidence is treated as failure rather than as pending research.
3. Brittle behavior: The calibration is text-structured; stronger operation will require executable page-specific instruments or independent reviewer case trials.

## Boundary

This is owner-generated live-case calibration evidence. It does not create the required expert-review note, and the project must not be marked production-complete until qualified review is supplied.
