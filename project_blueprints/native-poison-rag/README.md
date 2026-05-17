# Retrieval Integrity and Poisoning Defense

## Public Pitch

**What it is.** A retrieval-integrity and poisoning-defense page for RAG-supported analysis.

**Distinctive mechanism.** It follows contaminated evidence across admission, indexing, retrieval, context assembly, generation, analyst review, and claim release, then asks where detection, recovery, and resource-allocation should occur when attacks arrive as slow poisoning, fast injection, authority-wrapper attacks, omission attacks, or saturation tactics.

**Why it matters.** It makes Poison-RAG concrete by treating it as an evidence-chain and resource-burden problem rather than a prompt problem alone. The useful comparison is layered air defense: cheap decoys and mixed-speed salvos can force expensive defenses to spend attention, compute, and analyst time before the precision attack is even evaluated.

## Blueprint

### Vision

A retrieval-integrity and poisoning-defense page for RAG-supported analysis.

### Mechanism

It follows contaminated evidence across admission, indexing, retrieval, context assembly, generation, analyst review, and claim release, then asks where detection, recovery, and resource-allocation should occur when attacks arrive as slow poisoning, fast injection, authority-wrapper attacks, omission attacks, or saturation tactics.

### Built components

Visible public components: 120 kept Evidence Sections, native navigation, Review Notes, source-use plan, APA lineage, and source lineage claim limit. The public package remains text-focused and does not claim unverified runtime state.

### Source use

Method source. Clarifies the analytical method or reasoning discipline behind the page. Domain source. Supplies the substantive field knowledge against which claims must be checked. Evidence source. Supplies examples, cases, documents, or work products that make the page more than an assertion. Counter-source. Supplies rival interpretations and limits so the page does not become advocacy. No page-specific page source plan row was matched. The source section is therefore a method and source background and source-use plan, not a claim that every sentence has passage-level review.

### Plan

Plan: separate prototype capability from validated finding, bind claims to test materials, expose false-positive and false-negative risks, and add method-specific source anchors. The project source notes below should be converted into authored subsections only after the page-specific claim limit and source-use decisions are settled.

### Status

Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage ceiling and the original project governance records. The page separates public presentation from project completion; completion depends on the status and remaining-gap fields.

### Remaining gaps

Remaining gaps: many AI pages need stronger page-specific experimental status, clearer validation boundaries, and less reliance on representative method bibliography. The kept Evidence Sections below preserve project substance for close reading; final public prose should be authored from those signals rather than copied mechanically.

## Maintenance Rule

Update this blueprint before strengthening public claims on the website. Do not use word count, module count, or status percentage as a substitute for concrete project substance.

<!-- RESEARCHER_PROCESS_MAP_START -->
## Researcher Process Instrument Map

**Map type.** curated_poison_rag

**Research use case.** A retrieval-integrity and poisoning-defense page for RAG-supported analysis.

**Final use case.** It makes Poison-RAG concrete by treating it as an evidence-chain and resource-burden problem rather than a prompt problem alone. The useful comparison is layered air defense: cheap decoys and mixed-speed salvos can force expensive defenses to spend attention, compute, and analyst time before the precision attack is even evaluated.

**Instrument count.** 9

| Stage / Instrument | Form | Input | Operation | Output | Upstream / Downstream | Proof / Status / Next Check |
|---|---|---|---|---|---|---|
| RESEARCH_PROCESS: Clean / Poisoned Evidence Admission | curated poison rag | clean documents, poisoned variants, source identity, poison specification, and admission rule | tests whether contaminated material enters the corpus before indexing and records the attack surface at the corpus boundary | admission decision and attack-surface record as a reviewable artifact | Requires clean documents, poisoned variants, source identity, poison specification, and admission rule -> Feeds admission decision and attack-surface record as a reviewable artifact; later claims should not rely on this. | Expected proof artifact: admission decision and attack-surface record as a reviewable artifact Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source. |
| RESEARCH_PROCESS: Slow-Poison Track | curated poison rag | low-rate adversarial contamination distributed across apparently ordinary source material | models the long-game attacker who degrades retrieval trust without triggering obvious anomaly thresholds | slow-contamination exposure profile as a reviewable artifact | Requires low-rate adversarial contamination distributed across apparently ordinary source material -> Feeds slow-contamination exposure profile as a reviewable artifact; later claims should not rely on this step until. | Expected proof artifact: slow-contamination exposure profile as a reviewable artifact Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage. |
| RESEARCH_PROCESS: Fast-Injection Track | curated poison rag | high-salience injected poison, prompt-adjacent poison, or sudden source surge | models the short-game attacker who tries to force immediate retrieval or generation uptake | fast-injection uptake and detection record as a reviewable artifact | Requires high-salience injected poison, prompt-adjacent poison, or sudden source surge -> Feeds fast-injection uptake and detection record as a reviewable artifact; later claims should not rely on this step until its. | Expected proof artifact: fast-injection uptake and detection record as a reviewable artifact Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source. |
| RESEARCH_PROCESS: Authority-Wrapper And Omission Attack Track | curated poison rag | poison wrapped in credible authority cues plus missing or displaced contrary evidence | tests whether the system mistakes source costume for authority or misses the significance of absent evidence | authority/omission vulnerability record as a reviewable artifact | Requires poison wrapped in credible authority cues plus missing or displaced contrary evidence -> Feeds authority/omission vulnerability record as a reviewable artifact; later claims should not rely on this step until. | Expected proof artifact: authority/omission vulnerability record as a reviewable artifact Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage. |
| RESEARCH_PROCESS: Index Perturbation And Retrieval Trace | curated poison rag | embedding index, sparse index, poisoned chunks, clean chunks, reranking, and context-window assembly | tracks whether poisoned material is surfaced, ranked, fused, or suppressed at each retrieval stage | retrieval trace and contamination exposure map | Requires embedding index, sparse index, poisoned chunks, clean chunks, reranking, and context-window assembly -> Feeds retrieval trace and contamination exposure map; later claims should not rely on this step until its. | Expected proof artifact: retrieval trace and contamination exposure map Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage ceiling and the. |
| RESEARCH_PROCESS: Generation Uptake And Deformation Review | curated poison rag | retrieved context, model answer, source citations, omitted contrary evidence, and analyst review | measures whether the answer absorbs, paraphrases, amplifies, hides, or resists the poison | uptake, deformation, omission, and review-burden score | Requires retrieved context, model answer, source citations, omitted contrary evidence, and analyst review -> Feeds uptake, deformation, omission, and review-burden score; later claims should not rely on this step until. | Expected proof artifact: uptake, deformation, omission, and review-burden score Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage ceiling. |
| RESEARCH_PROCESS: Human / LLM Validation Gate | curated poison rag | model output, retrieved evidence, human analyst judgment, and adversarial condition label | separates what the model accepted from what a reviewer caught, missed, blocked, or escalated | validation decision and reviewer-burden record | Requires model output, retrieved evidence, human analyst judgment, and adversarial condition label -> Feeds validation decision and reviewer-burden record; later claims should not rely on this step until its expected. | Expected proof artifact: validation decision and reviewer-burden record Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage ceiling and the. |
| RESEARCH_PROCESS: Mixed-Salvo Air-Defense Stress | curated poison rag | slow poison, fast injection, decoys, saturation material, precision poison, and detector budget | uses layered air-defense logic to test whether cheap attacks can waste expensive review and detection resources while precision poison slips through | detector/reviewer burden result and resource-allocation warning | Requires slow poison, fast injection, decoys, saturation material, precision poison, and detector budget -> Feeds detector/reviewer burden result and resource-allocation warning; later claims should not rely on this. | Expected proof artifact: detector/reviewer burden result and resource-allocation warning Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage. |
| RESEARCH_PROCESS: Replay And Benchmark Harness | curated poison rag | attack condition, source packet, retrieval trace, model output, reviewer decision, and gate result | keeps the adversarial episode reproducible so future defenses can be compared against the same contamination path | replayable Poison-RAG evaluation case as a reviewable artifact | Requires attack condition, source packet, retrieval trace, model output, reviewer decision, and gate result -> Feeds replayable Poison-RAG evaluation case as a reviewable artifact; later claims should not rely on this. | Expected proof artifact: replayable Poison-RAG evaluation case as a reviewable artifact Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage. |
<!-- RESEARCHER_PROCESS_MAP_END -->
