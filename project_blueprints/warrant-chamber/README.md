# Source & Evidence Review — tracking what supports each claim and what still needs review

## Public Pitch

**What it is.** A manuscript-centered evidence governance chamber.

**Distinctive mechanism.** Claims are inspected through a Foundational NSRP-style sourcing protocol, Claim Halo, North Doctrine, source and counter-source, warrant strength, West Dissent, judgment, South Revision, red-team pressure, certification, screen blueprint, data model, and live MuranoOS-oriented test scenarios rather than flattened into citations or comments.

**Why it matters.** It matters because expert writing needs to know what authorizes a claim, what contests it, what revision state carries it, what dissent has been faced, and what test would show the warrant is strong enough.

## Blueprint

### Vision

A manuscript-centered evidence governance chamber.

### Mechanism

Claims are inspected through a Foundational NSRP-style sourcing protocol, Claim Halo, North Doctrine, source and counter-source, warrant strength, West Dissent, judgment, South Revision, red-team pressure, certification, screen blueprint, data model, and live MuranoOS-oriented test scenarios rather than flattened into citations or comments.

### Built components

The full design-and-build package is complete: 17 documentation files, 6 SVG diagrams, 7 NSRP foundation work products, 30 files total at 213 KB compressed (~370 KB uncompressed). The Master Spec (27 sections), Screen Blueprint (8 screens, 12 artboards), Data Model (23 Postgres tables), GraphQL types, and Test Scenarios all clear the ?handoff complete? bar — a product team can derive screens and flows without guessing, a frontend team can identify modules and interactions, a platform team understands entities and persistence, and a governance owner sees gate logic and audit. The package is honest about what is not included: high-fidelity comps, live code, working graph database, production API integrations, real user research, a clickable prototype, and final institutional policy language. Those are downstream of the handoff, not part of it.

### Source use

Source use is organized by role: method authorities, domain evidence, technical background, implementation evidence, and claim limits. The page should show why each source matters; direct quotations and stronger factual claims still require exact passage anchors before publication.

### Plan

The forward path moves the package from spec-level to live runtime. The page is designed to be implemented inside the MuranoOS desktop application; the next moves are the implementation, integration, and pilot scholarly use. Step 01 High-fidelity prototype Translate the screen blueprint and SVG diagrams into a working clickable prototype that exercises the Claim Halo interaction end-to-end. Step 02 Live MuranoOS integration Implement the 23-table schema in the MuranoOS persistence layer; wire the GraphQL types to the application layer; integrate the page into the MuranoOS desktop shell. Step 03 First scholarly use First real manuscript run through the page — every non-trivial claim graduated through the Claim Halo, every certification recorded against the role-permission matrix. Step 04 Tribunal cycle First full tribunal-layout cycle — committee or editorial-board review using the page as the working surface, with the full NSRP foundation operationalized in real review.

### Status

Status: The full design-and-build package is complete: 17 documentation files, 6 SVG diagrams, 7 NSRP foundation work products, 30 files total at 213 KB compressed (~370 KB uncompressed). The Master Spec (27 sections), Screen Blueprint (8 screens, 12 artboards), Data Model (23 Postgres tables), GraphQL types, and Test Scenarios all clear the ?handoff complete? bar — a product team can derive screens and flows without guessing, a frontend team can identify modules and interactions, a platform team understands entities and.

### Remaining gaps

Remaining gaps: the forward path moves the package from spec-level to live runtime. The page is designed to be implemented inside the MuranoOS desktop application; the next moves are the implementation, integration, and pilot scholarly use.

## Maintenance Rule

Update this blueprint before strengthening public claims on the website. Do not use word count, module count, or status percentage as a substitute for concrete project substance.

<!-- RESEARCHER_PROCESS_MAP_START -->
## Researcher Process Instrument Map

**Map type.** curated_claim_governance

**Research use case.** A manuscript-centered evidence governance chamber.

**Final use case.** It matters because expert writing needs to know what authorizes a claim, what contests it, what revision state carries it, what dissent has been faced, and what test would show the warrant is strong enough.

**Instrument count.** 3

| Stage / Instrument | Form | Input | Operation | Output | Upstream / Downstream | Proof / Status / Next Check |
|---|---|---|---|---|---|---|
| RESEARCH_PROCESS: Claim Intake | curated claim governance | draft claim, source, counter-source, intended audience | opens the claim as a review object rather than treating it as finished prose; the step records the decision path so the reader can see how the project moves from input to governed output. | claim record as a reviewable artifact | Requires draft claim, source, counter-source, intended audience -> Feeds claim record as a reviewable artifact; later claims should not rely on this step until its expected output is present. | Expected proof artifact: claim record as a reviewable artifact Status: Status: The full design-and-build package is complete: 17 documentation files, 6 SVG diagrams, 7 NSRP foundation work products, 30 files total at 213 KB. Next check. |
| RESEARCH_PROCESS: Warrant Inspection | curated claim governance | source strength, contradiction, dissent, revision state | uses Claim Halo / review chamber logic to expose what authorizes or weakens the claim | claim ceiling and revision decision as a reviewable artifact | Requires source strength, contradiction, dissent, revision state -> Feeds claim ceiling and revision decision as a reviewable artifact; later claims should not rely on this step until its expected output is present. | Expected proof artifact: claim ceiling and revision decision as a reviewable artifact Status: Status: The full design-and-build package is complete: 17 documentation files, 6 SVG diagrams, 7 NSRP foundation work products, 30 files total at. |
| RESEARCH_PROCESS: Certification Or Revision | curated claim governance | reviewed claim and evidence state | decides whether the claim can publish, must narrow, needs sources, or should be rejected | certified claim or revision task as a reviewable artifact | Requires reviewed claim and evidence state -> Feeds certified claim or revision task as a reviewable artifact; later claims should not rely on this step until its expected output is present. | Expected proof artifact: certified claim or revision task as a reviewable artifact Status: Status: The full design-and-build package is complete: 17 documentation files, 6 SVG diagrams, 7 NSRP foundation work products, 30 files total at. |
<!-- RESEARCHER_PROCESS_MAP_END -->
