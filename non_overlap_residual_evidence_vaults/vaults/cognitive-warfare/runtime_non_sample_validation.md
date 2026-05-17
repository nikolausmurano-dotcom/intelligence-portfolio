# Runtime Non-Sample Validation

Project: cognitive-warfare

Instrument: Cognitive-warfare instrument workbench

Generated: 2026-05-17T01:47:54+00:00

## Result

- Acceptance decision: PASS
- Trace hash: `a284f33a`
- Runtime route: `non_overlap_runtime_slices/apps/cognitive-warfare/index.html`

## Non-Sample Case

An analyst is asked to map how a narrative campaign exploits attention, identity, and institutional distrust without assuming every viral claim is centrally directed.

## Mechanism Tested

Cognitive-warfare instrument workbench -> Measurement gate -> Instrumented cognitive-security note

## Acceptance Checks

- non_sample_fixture: PASS - case text is project-specific and not copied from sample_fixture.json
- input_length: PASS - 166 characters
- operation_selected: PASS - Measurement gate
- evidence_or_constraint_note: PASS - 216 characters
- reviewer_standard_present: PASS - The output must identify mechanism, target vulnerability, defensive instrument, and measurement check.
- trace_schema_fields: PASS - runtime_id, project_id, input, operation, output, checks, and trace hash are present

## Boundary

This closes the mechanical non-sample validation evidence for the runtime slice. It does not close hosted deployment smoke, public-site byte matching, or clearly labeled review / technical-audit validation.
