# Structured Techniques Toolkit — authoring and refinement workspace for disciplined analytic instruments

## Public Pitch

**What it is.** A studio for converting structured analytic techniques into usable instruments.

**Distinctive mechanism.** Each technique needs purpose, inputs, steps, failure modes, interpretation rules, reviewer actions, and example outputs, including adaptations for human analysts, AI systems, and human-AI collaboration. The studio supports authoring brand-new SATs, refining and tweaking existing SATs, binding SATs to a corpus, cross-referencing the Analyst Workstation SAT surfaces, and reconciling Beebe/Pherson-style handbooks and tradecraft primers into usable method records.

**Why it matters.** It shows method-building skill: not just applying ACH or red-team ideas, but turning every SAT into a reusable, testable research and review tool with explicit inputs, operating rules, and failure modes.

## Blueprint

### Vision

A studio for converting structured analytic techniques into usable instruments.

### Mechanism

Each technique needs purpose, inputs, steps, failure modes, interpretation rules, reviewer actions, and example outputs, including adaptations for human analysts, AI systems, and human-AI collaboration. The studio supports authoring brand-new SATs, refining and tweaking existing SATs, binding SATs to a corpus, cross-referencing the Analyst Workstation SAT surfaces, and reconciling Beebe/Pherson-style handbooks and tradecraft primers into usable method records.

### Built components

The construction workspace renders on the public site with the three workflow lanes (authoring, refinement, binding) and the cross-reference to the live SAT page. The canonical SAT corpus is present as the construction workspace. Open work: the binding from individual SATs to their specific Heuer / Beebe-Pherson passages has not yet been wired through the source-register pipeline.

### Source use

Source use is organized by role: method authorities, domain evidence, technical background, implementation evidence, and claim limits. The page should show why each source matters; direct quotations and stronger factual claims still require exact passage anchors before publication.

### Plan

Wire the SAT-corpus binding through the source-register pipeline so every SAT in the construction workspace traces to a specific admitted passage. Once the binding lands, the construction workspace becomes the place new SATs are authored against checkable source rather than against the canon-as-name. Step 01 Source-register binding Each SAT in the construction workspace threaded through the source-register pipeline. Step 02 SAT-to-passage trace Every SAT traceable to a specific admitted passage in the canonical primer. Step 03 Author-against-source page New SATs authored against checkable source rather than against the canon-as-name.

### Status

Status: The construction workspace renders on the public site with the three workflow lanes (authoring, refinement, binding) and the cross-reference to the live SAT page. The canonical SAT corpus is present as the construction workspace. Open work: the binding from individual SATs to their specific Heuer / Beebe-Pherson passages has not yet been wired through the source-register pipeline.

### Remaining gaps

Remaining gaps: wire the SAT-corpus binding through the source-register pipeline so every SAT in the construction workspace traces to a specific admitted passage. Once the binding lands, the construction workspace becomes the place new SATs are authored against checkable source rather than against the canon-as-name.

## Maintenance Rule

Update this blueprint before strengthening public claims on the website. Do not use word count, module count, or status percentage as a substitute for concrete project substance.

<!-- RESEARCHER_PROCESS_MAP_START -->
## Researcher Process Instrument Map

**Map type.** curated_sat_assurance

**Research use case.** A studio for converting structured analytic techniques into usable instruments.

**Final use case.** It shows method-building skill: not just applying ACH or red-team ideas, but turning every SAT into a reusable, testable research and review tool with explicit inputs, operating rules, and failure modes.

**Instrument count.** 8

| Stage / Instrument | Form | Input | Operation | Output | Upstream / Downstream | Proof / Status / Next Check |
|---|---|---|---|---|---|---|
| RESEARCH_PROCESS: Task And Method Assignment | curated sat assurance | intelligence or research question, decision context, evidence type, uncertainty level, and user role | selects the structured analytic technique or technique sequence that fits the task rather than applying SAT labels ornamentally | method assignment and technique rationale as a reviewable artifact | Requires intelligence or research question, decision context, evidence type, uncertainty level, and user role -> Feeds method assignment and technique rationale as a reviewable artifact; later claims should not rely on. | Expected proof artifact: method assignment and technique rationale as a reviewable artifact Status: Status: The construction workspace renders on the public site with the three workflow lanes (authoring, refinement, binding) and the. |
| RESEARCH_PROCESS: Evidence And Assumption Intake | curated sat assurance | source record, assumptions, alternatives, indicators, confidence basis, and possible deception conditions | separates evidence from assumptions before the analytic method begins; the step records the decision path so the reader can see how the project moves from input to governed output. | evidence/assumption ledger as a reviewable artifact | Requires source record, assumptions, alternatives, indicators, confidence basis, and possible deception conditions -> Feeds evidence/assumption ledger as a reviewable artifact; later claims should not rely on this step. | Expected proof artifact: evidence/assumption ledger as a reviewable artifact Status: Status: The construction workspace renders on the public site with the three workflow lanes (authoring, refinement, binding) and the cross-reference to. |
| RESEARCH_PROCESS: ACH / Alternatives Matrix | curated sat assurance | hypotheses, evidence rows, diagnosticity, contradiction, and consistency judgments | turns competing explanations into an inspectable matrix instead of a narrative preference | ACH-style comparison product as a reviewable artifact | Requires hypotheses, evidence rows, diagnosticity, contradiction, and consistency judgments -> Feeds ACH-style comparison product as a reviewable artifact; later claims should not rely on this step until its expected. | Expected proof artifact: ACH-style comparison product as a reviewable artifact Status: Status: The construction workspace renders on the public site with the three workflow lanes (authoring, refinement, binding) and the cross-reference to. |
| RESEARCH_PROCESS: Red-Team / Devil's Advocate Pass | curated sat assurance | favored conclusion, assumptions, missing evidence, rival frame, and adversary incentives | attacks the current judgment before it is polished into final prose; the step records the decision path so the reader can see how the project moves from input to governed output. | challenge memo and revision demand as a reviewable artifact | Requires favored conclusion, assumptions, missing evidence, rival frame, and adversary incentives -> Feeds challenge memo and revision demand as a reviewable artifact; later claims should not rely on this step until its. | Expected proof artifact: challenge memo and revision demand as a reviewable artifact Status: Status: The construction workspace renders on the public site with the three workflow lanes (authoring, refinement, binding) and the. |
| RESEARCH_PROCESS: Uncertainty And Confidence Gate | curated sat assurance | confidence level, source quality, ambiguity, contradiction, and collection gaps | prevents a fluent answer from presenting uncertainty as stronger than the evidence supports | confidence statement and collection-gap list as a reviewable artifact | Requires confidence level, source quality, ambiguity, contradiction, and collection gaps -> Feeds confidence statement and collection-gap list as a reviewable artifact; later claims should not rely on this step until. | Expected proof artifact: confidence statement and collection-gap list as a reviewable artifact Status: Status: The construction workspace renders on the public site with the three workflow lanes (authoring, refinement, binding) and the. |
| RESEARCH_PROCESS: Human-AI Delta Review | curated sat assurance | AI output, human analyst judgment, source trail, uncertainty basis, and override reason | shows where AI helped, failed, hallucinated, over-weighted, or missed analyst context | accept, qualify, block, rerun, or quarantine decision | Requires AI output, human analyst judgment, source trail, uncertainty basis, and override reason -> Feeds accept, qualify, block, rerun, or quarantine decision; later claims should not rely on this step until its. | Expected proof artifact: accept, qualify, block, rerun, or quarantine decision Status: Status: The construction workspace renders on the public site with the three workflow lanes (authoring, refinement, binding) and the cross-reference to. |
| RESEARCH_PROCESS: Technique Combination Studio | curated sat assurance | multiple SATs, task type, stage of inquiry, and analyst burden | tests which SAT sequence is useful for a specific research or intelligence task and which combinations add cost without value | SAT sequence recommendation and warning as a reviewable artifact | Requires multiple SATs, task type, stage of inquiry, and analyst burden -> Feeds SAT sequence recommendation and warning as a reviewable artifact; later claims should not rely on this step until its expected output is. | Expected proof artifact: SAT sequence recommendation and warning as a reviewable artifact Status: Status: The construction workspace renders on the public site with the three workflow lanes (authoring, refinement, binding) and the. |
| RESEARCH_PROCESS: Release And Learning Ledger | curated sat assurance | final analytic product, method trail, disagreement state, review decision, and lessons learned | turns one analytic exercise into a reusable record for improving future human-AI analytic workflows | release decision and method-learning record as a reviewable artifact | Requires final analytic product, method trail, disagreement state, review decision, and lessons learned -> Feeds release decision and method-learning record as a reviewable artifact; later claims should not rely on this. | Expected proof artifact: release decision and method-learning record as a reviewable artifact Status: Status: The construction workspace renders on the public site with the three workflow lanes (authoring, refinement, binding) and the. |
<!-- RESEARCHER_PROCESS_MAP_END -->
