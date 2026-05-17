# Adversarial Evidence Corruption and Poison-RAG Defense - advisor technical annex for LLM-supported analytic judgment

## Public Pitch

**What it is.** A technical research annex for adversarial evidence corruption and Poison-RAG defense.

**Distinctive mechanism.** It models retrieval poisoning as a causal chain across actor motive, target judgment, attack surface, vector, carrier, timing, RAG layer, analytic deformation, detection trace, countermeasure, replay, and governance. Its distinctive timing layer distinguishes slow poisoning, fast injection, saturation, decoy contamination, and authority-wrapper attacks.

**Why it matters.** It turns the future work from a vague RAG idea into a red-teamable, source-grounded, experimentally testable architecture for testing where corrupted evidence enters, how it travels, what defensive checks would have to catch it, and whether cheap contaminating signals create a resource burden by exhausting expensive retrieval, detector, or analyst-review capacity.

## Blueprint

### Vision

A technical research annex for adversarial evidence corruption and Poison-RAG defense.

### Mechanism

It models retrieval poisoning as a causal chain across actor motive, target judgment, attack surface, vector, carrier, timing, RAG layer, analytic deformation, detection trace, countermeasure, replay, and governance. Its distinctive timing layer distinguishes slow poisoning, fast injection, saturation, decoy contamination, and authority-wrapper attacks.

### Built components

Built components include the advisor technical annex DOCX; 102 extracted paragraphs; 64 tables; a claim limit table; a master causal chain; an 18-macrodomain / 144-sublayer presentation skeleton; 52 domain records covering observables, logs and system signals, controls, failure modes, and tests; protocol sheets for new structured analytic techniques; an evidence-ledger schema; analytic replay checkpoint architecture; advisor red-team questions; and a final acceptance checklist.

### Source use

The capstone remains the empirical seed. Algorithmic Active Measures supplies the nearest manuscript-level case anchor for data poisoning as counterintelligence tradecraft. The annex itself supplies the operational map, claim limit, test program, and governance vocabulary. External source checking remains open: the source architecture still needs verified anchor references before the page can make stronger literature-grounded claims.

### Plan

Advance in five controlled moves: close the source architecture with verified APA 7 references; convert the 52 domains into a machine-readable registry; build the evidence-ledger and replay-checkpoint templates; design Phase 0-10 experiments with controls, blinded scoring, base-rate testing, and inter-rater reliability; then promote only those claims that survive the experiment and governance review.

### Status

Future research blueprint and technical annex. It should be read as architecture rather than empirical validation of every layer. The current public claim is that the architecture exists, is broken into parts, and can guide future red-team and evaluation work.

### Remaining gaps

Remaining gaps: populate source references; adjudicate which domains are essential for first experiment; produce data schemas; define logs and system signals available in real RAG systems; separate civil-liberties, releaseability, and vendor-governance requirements; and keep the annex framed as research architecture until experimental validation exists.

## Maintenance Rule

Update this blueprint before strengthening public claims on the website. Do not use publication, validation, or operational-readiness language unless the supporting work product is named and retained.

<!-- RESEARCHER_PROCESS_MAP_START -->
## Researcher Process Instrument Map

**Map type.** curated_poison_rag

**Research use case.** A technical research annex for adversarial evidence corruption and Poison-RAG defense.

**Final use case.** It turns the future work from a vague RAG idea into a red-teamable, source-grounded, experimentally testable architecture for testing where corrupted evidence enters, how it travels, what defensive checks would have to catch it, and whether cheap contaminating signals create a resource burden by exhausting expensive retrieval, detector, or analyst-review capacity.

**Instrument count.** 9

| Stage / Instrument | Form | Input | Operation | Output | Upstream / Downstream | Proof / Status / Next Check |
|---|---|---|---|---|---|---|
| RESEARCH_PROCESS: Clean / Poisoned Evidence Admission | curated poison rag | clean documents, poisoned variants, source identity, poison specification, and admission rule | tests whether contaminated material enters the corpus before indexing and records the attack surface at the corpus boundary | admission decision and attack-surface record as a reviewable artifact | Requires clean documents, poisoned variants, source identity, poison specification, and admission rule -> Feeds admission decision and attack-surface record as a reviewable artifact; later claims should not rely on this. | Expected proof artifact: admission decision and attack-surface record as a reviewable artifact Status: Future research blueprint and technical annex. It should be read as architecture rather than empirical validation of every layer. The. |
| RESEARCH_PROCESS: Slow-Poison Track | curated poison rag | low-rate adversarial contamination distributed across apparently ordinary source material | models the long-game attacker who degrades retrieval trust without triggering obvious anomaly thresholds | slow-contamination exposure profile as a reviewable artifact | Requires low-rate adversarial contamination distributed across apparently ordinary source material -> Feeds slow-contamination exposure profile as a reviewable artifact; later claims should not rely on this step until. | Expected proof artifact: slow-contamination exposure profile as a reviewable artifact Status: Future research blueprint and technical annex. It should be read as architecture rather than empirical validation of every layer. The current. |
| RESEARCH_PROCESS: Fast-Injection Track | curated poison rag | high-salience injected poison, prompt-adjacent poison, or sudden source surge | models the short-game attacker who tries to force immediate retrieval or generation uptake | fast-injection uptake and detection record as a reviewable artifact | Requires high-salience injected poison, prompt-adjacent poison, or sudden source surge -> Feeds fast-injection uptake and detection record as a reviewable artifact; later claims should not rely on this step until its. | Expected proof artifact: fast-injection uptake and detection record as a reviewable artifact Status: Future research blueprint and technical annex. It should be read as architecture rather than empirical validation of every layer. The. |
| RESEARCH_PROCESS: Authority-Wrapper And Omission Attack Track | curated poison rag | poison wrapped in credible authority cues plus missing or displaced contrary evidence | tests whether the system mistakes source costume for authority or misses the significance of absent evidence | authority/omission vulnerability record as a reviewable artifact | Requires poison wrapped in credible authority cues plus missing or displaced contrary evidence -> Feeds authority/omission vulnerability record as a reviewable artifact; later claims should not rely on this step until. | Expected proof artifact: authority/omission vulnerability record as a reviewable artifact Status: Future research blueprint and technical annex. It should be read as architecture rather than empirical validation of every layer. The current. |
| RESEARCH_PROCESS: Index Perturbation And Retrieval Trace | curated poison rag | embedding index, sparse index, poisoned chunks, clean chunks, reranking, and context-window assembly | tracks whether poisoned material is surfaced, ranked, fused, or suppressed at each retrieval stage | retrieval trace and contamination exposure map | Requires embedding index, sparse index, poisoned chunks, clean chunks, reranking, and context-window assembly -> Feeds retrieval trace and contamination exposure map; later claims should not rely on this step until its. | Expected proof artifact: retrieval trace and contamination exposure map Status: Future research blueprint and technical annex. It should be read as architecture rather than empirical validation of every layer. The current public claim is. |
| RESEARCH_PROCESS: Generation Uptake And Deformation Review | curated poison rag | retrieved context, model answer, source citations, omitted contrary evidence, and analyst review | measures whether the answer absorbs, paraphrases, amplifies, hides, or resists the poison | uptake, deformation, omission, and review-burden score | Requires retrieved context, model answer, source citations, omitted contrary evidence, and analyst review -> Feeds uptake, deformation, omission, and review-burden score; later claims should not rely on this step until. | Expected proof artifact: uptake, deformation, omission, and review-burden score Status: Future research blueprint and technical annex. It should be read as architecture rather than empirical validation of every layer. The current public. |
| RESEARCH_PROCESS: Human / LLM Validation Gate | curated poison rag | model output, retrieved evidence, human analyst judgment, and adversarial condition label | separates what the model accepted from what a reviewer caught, missed, blocked, or escalated | validation decision and reviewer-burden record | Requires model output, retrieved evidence, human analyst judgment, and adversarial condition label -> Feeds validation decision and reviewer-burden record; later claims should not rely on this step until its expected. | Expected proof artifact: validation decision and reviewer-burden record Status: Future research blueprint and technical annex. It should be read as architecture rather than empirical validation of every layer. The current public claim is. |
| RESEARCH_PROCESS: Mixed-Salvo Air-Defense Stress | curated poison rag | slow poison, fast injection, decoys, saturation material, precision poison, and detector budget | uses layered air-defense logic to test whether cheap attacks can waste expensive review and detection resources while precision poison slips through | detector/reviewer burden result and resource-allocation warning | Requires slow poison, fast injection, decoys, saturation material, precision poison, and detector budget -> Feeds detector/reviewer burden result and resource-allocation warning; later claims should not rely on this. | Expected proof artifact: detector/reviewer burden result and resource-allocation warning Status: Future research blueprint and technical annex. It should be read as architecture rather than empirical validation of every layer. The current. |
| RESEARCH_PROCESS: Replay And Benchmark Harness | curated poison rag | attack condition, source packet, retrieval trace, model output, reviewer decision, and gate result | keeps the adversarial episode reproducible so future defenses can be compared against the same contamination path | replayable Poison-RAG evaluation case as a reviewable artifact | Requires attack condition, source packet, retrieval trace, model output, reviewer decision, and gate result -> Feeds replayable Poison-RAG evaluation case as a reviewable artifact; later claims should not rely on this. | Expected proof artifact: replayable Poison-RAG evaluation case as a reviewable artifact Status: Future research blueprint and technical annex. It should be read as architecture rather than empirical validation of every layer. The current. |
<!-- RESEARCHER_PROCESS_MAP_END -->
