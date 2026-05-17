# Runtime Non-Sample Validation

Project: applied-history

Instrument: Case-to-policy transfer workbench

Generated: 2026-05-17T01:47:54+00:00

## Result

- Acceptance decision: PASS
- Trace hash: `42bbc860`
- Runtime route: `non_overlap_runtime_slices/apps/applied-history/index.html`

## Non-Sample Case

A policy analyst is comparing a historical blockade crisis with a contemporary maritime-pressure problem and needs mechanism transfer without treating analogy as proof.

## Mechanism Tested

Case-to-policy transfer workbench -> Disanalogy warning -> Policy-use transfer note

## Acceptance Checks

- non_sample_fixture: PASS - case text is project-specific and not copied from sample_fixture.json
- input_length: PASS - 168 characters
- operation_selected: PASS - Disanalogy warning
- evidence_or_constraint_note: PASS - 216 characters
- reviewer_standard_present: PASS - The output must distinguish historical analogy, mechanism, disanalogy, and policy implication.
- trace_schema_fields: PASS - runtime_id, project_id, input, operation, output, checks, and trace hash are present

## Boundary

This closes the mechanical non-sample validation evidence for the runtime slice. It does not close hosted deployment smoke, public-site byte matching, or clearly labeled review / technical-audit validation.
