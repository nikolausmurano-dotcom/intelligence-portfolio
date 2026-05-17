# Retrieval Integrity Evaluation — testing Retrieval-Augmented Generation (RAG) against retrieval poisoning and false-source failure

## Public Pitch

**What it is.** A retrieval-integrity evaluation surface for poisoned or unreliable RAG evidence.

**Distinctive mechanism.** It treats retrieval poisoning as a chain failure across admission, embedding, retrieval, context assembly, generation, analyst review, and public claim; each stage needs its own attack surface, control, and measurement. The timing layer distinguishes slow contamination, fast injection, authority-wrapper attacks, omission attacks, and saturation tactics that can waste reviewer or detector resources.

**Why it matters.** The distinctive value is that it asks where the defense intervenes and what it costs, not merely whether corrupted evidence can be detected. The useful analogy is air-defense saturation: cheap or fast attacks can force expensive defenses to spend attention, compute, and analyst time in the wrong place.

## Blueprint

### Vision

A retrieval-integrity evaluation surface for poisoned or unreliable RAG evidence.

### Mechanism

It treats retrieval poisoning as a chain failure across admission, embedding, retrieval, context assembly, generation, analyst review, and public claim; each stage needs its own attack surface, control, and measurement. The timing layer distinguishes slow contamination, fast injection, authority-wrapper attacks, omission attacks, and saturation tactics that can waste reviewer or detector resources.

### Built components

The page renders at its full intended density and the tab-based navigation works as designed. It is currently the most thoroughly specified public page on the nikmurano portfolio for the defensive retrieval-augmented generation research program — it names the literature, names the controls, names the foundation, and names the measurement apparatus a serious test would require. What the page does not yet do is host real experimental data. The workbench named in the page is in the research-library system, and that system has not yet been wired to run the poison-injection experiments at corpus scale. Until that wiring is done, the influence-score-style metrics shown in the page are mock targets — they show what the page will display once data exists, not measurements that have been taken. The open questions are explicit: the page is not a validated detector, does not prove that the research-library system currently detects retrieval poisoning, was not part of any prior empirical result, and the metrics on screen are not measured performance. The page exists to make a serious experiment possible, not to claim the experiment has been run.

### Source use

Source use is organized by role: method authorities, domain evidence, technical background, implementation evidence, and claim limits. The page should show why each source matters; direct quotations and stronger factual claims still require exact passage anchors before publication.

### Plan

Convert the page from a specification of what should be tested into a live public presentation for what has been tested. The page becomes the public page for the matched-pair empirical study described in the future-research page. Step 01 Poison-harness wired Wired into the corpus-admission plane of the research-library system (per the plan in Row 06) — the move that makes corpus-scale experiments possible at all. Step 02 Tabs from real run logs Tabs populated from real run logs rather than from literature and mock targets — the page becomes a live experiment surface. Step 03 Bound to study design Bound to the future-research study design (Row 14) so it hosts both the pre-registered design and the published results in one place. Step 04 Mock metrics retired Mock influence-score metrics replaced with measured per-stage detection, false-positive, and propagation rates — the page stops describing the test and starts presenting it.

### Status

Status: The page renders at its full intended density and the tab-based navigation works as designed. It is currently the most thoroughly specified public page on the nikmurano portfolio for the defensive retrieval-augmented generation research program — it names the literature, names the controls, names the foundation, and names the measurement apparatus a serious test would require.

### Remaining gaps

Remaining gaps: convert the page from a specification of what should be tested into a live public presentation for what has been tested. The page becomes the public page for the matched-pair empirical study described in the future-research page.

## Maintenance Rule

Update this blueprint before strengthening public claims on the website. Do not use word count, module count, or status percentage as a substitute for concrete project substance.

<!-- RESEARCHER_PROCESS_MAP_START -->
## Researcher Process Instrument Map

**Map type.** curated_poison_rag

**Research use case.** A retrieval-integrity evaluation surface for poisoned or unreliable RAG evidence.

**Final use case.** The distinctive value is that it asks where the defense intervenes and what it costs, not merely whether corrupted evidence can be detected. The useful analogy is air-defense saturation: cheap or fast attacks can force expensive defenses to spend attention, compute, and analyst time in the wrong place.

**Instrument count.** 9

| Stage / Instrument | Form | Input | Operation | Output | Upstream / Downstream | Proof / Status / Next Check |
|---|---|---|---|---|---|---|
| RESEARCH_PROCESS: Clean / Poisoned Evidence Admission | curated poison rag | clean documents, poisoned variants, source identity, poison specification, and admission rule | tests whether contaminated material enters the corpus before indexing and records the attack surface at the corpus boundary | admission decision and attack-surface record as a reviewable artifact | Requires clean documents, poisoned variants, source identity, poison specification, and admission rule -> Feeds admission decision and attack-surface record as a reviewable artifact; later claims should not rely on this. | Expected proof artifact: admission decision and attack-surface record as a reviewable artifact Status: Status: The page renders at its full intended density and the tab-based navigation works as designed. It is currently the most. |
| RESEARCH_PROCESS: Slow-Poison Track | curated poison rag | low-rate adversarial contamination distributed across apparently ordinary source material | models the long-game attacker who degrades retrieval trust without triggering obvious anomaly thresholds | slow-contamination exposure profile as a reviewable artifact | Requires low-rate adversarial contamination distributed across apparently ordinary source material -> Feeds slow-contamination exposure profile as a reviewable artifact; later claims should not rely on this step until. | Expected proof artifact: slow-contamination exposure profile as a reviewable artifact Status: Status: The page renders at its full intended density and the tab-based navigation works as designed. It is currently the most thoroughly. |
| RESEARCH_PROCESS: Fast-Injection Track | curated poison rag | high-salience injected poison, prompt-adjacent poison, or sudden source surge | models the short-game attacker who tries to force immediate retrieval or generation uptake | fast-injection uptake and detection record as a reviewable artifact | Requires high-salience injected poison, prompt-adjacent poison, or sudden source surge -> Feeds fast-injection uptake and detection record as a reviewable artifact; later claims should not rely on this step until its. | Expected proof artifact: fast-injection uptake and detection record as a reviewable artifact Status: Status: The page renders at its full intended density and the tab-based navigation works as designed. It is currently the most thoroughly. |
| RESEARCH_PROCESS: Authority-Wrapper And Omission Attack Track | curated poison rag | poison wrapped in credible authority cues plus missing or displaced contrary evidence | tests whether the system mistakes source costume for authority or misses the significance of absent evidence | authority/omission vulnerability record as a reviewable artifact | Requires poison wrapped in credible authority cues plus missing or displaced contrary evidence -> Feeds authority/omission vulnerability record as a reviewable artifact; later claims should not rely on this step until. | Expected proof artifact: authority/omission vulnerability record as a reviewable artifact Status: Status: The page renders at its full intended density and the tab-based navigation works as designed. It is currently the most thoroughly. |
| RESEARCH_PROCESS: Index Perturbation And Retrieval Trace | curated poison rag | embedding index, sparse index, poisoned chunks, clean chunks, reranking, and context-window assembly | tracks whether poisoned material is surfaced, ranked, fused, or suppressed at each retrieval stage | retrieval trace and contamination exposure map | Requires embedding index, sparse index, poisoned chunks, clean chunks, reranking, and context-window assembly -> Feeds retrieval trace and contamination exposure map; later claims should not rely on this step until its. | Expected proof artifact: retrieval trace and contamination exposure map Status: Status: The page renders at its full intended density and the tab-based navigation works as designed. It is currently the most thoroughly specified public. |
| RESEARCH_PROCESS: Generation Uptake And Deformation Review | curated poison rag | retrieved context, model answer, source citations, omitted contrary evidence, and analyst review | measures whether the answer absorbs, paraphrases, amplifies, hides, or resists the poison | uptake, deformation, omission, and review-burden score | Requires retrieved context, model answer, source citations, omitted contrary evidence, and analyst review -> Feeds uptake, deformation, omission, and review-burden score; later claims should not rely on this step until. | Expected proof artifact: uptake, deformation, omission, and review-burden score Status: Status: The page renders at its full intended density and the tab-based navigation works as designed. It is currently the most thoroughly specified. |
| RESEARCH_PROCESS: Human / LLM Validation Gate | curated poison rag | model output, retrieved evidence, human analyst judgment, and adversarial condition label | separates what the model accepted from what a reviewer caught, missed, blocked, or escalated | validation decision and reviewer-burden record | Requires model output, retrieved evidence, human analyst judgment, and adversarial condition label -> Feeds validation decision and reviewer-burden record; later claims should not rely on this step until its expected. | Expected proof artifact: validation decision and reviewer-burden record Status: Status: The page renders at its full intended density and the tab-based navigation works as designed. It is currently the most thoroughly specified public. |
| RESEARCH_PROCESS: Mixed-Salvo Air-Defense Stress | curated poison rag | slow poison, fast injection, decoys, saturation material, precision poison, and detector budget | uses layered air-defense logic to test whether cheap attacks can waste expensive review and detection resources while precision poison slips through | detector/reviewer burden result and resource-allocation warning | Requires slow poison, fast injection, decoys, saturation material, precision poison, and detector budget -> Feeds detector/reviewer burden result and resource-allocation warning; later claims should not rely on this. | Expected proof artifact: detector/reviewer burden result and resource-allocation warning Status: Status: The page renders at its full intended density and the tab-based navigation works as designed. It is currently the most thoroughly. |
| RESEARCH_PROCESS: Replay And Benchmark Harness | curated poison rag | attack condition, source packet, retrieval trace, model output, reviewer decision, and gate result | keeps the adversarial episode reproducible so future defenses can be compared against the same contamination path | replayable Poison-RAG evaluation case as a reviewable artifact | Requires attack condition, source packet, retrieval trace, model output, reviewer decision, and gate result -> Feeds replayable Poison-RAG evaluation case as a reviewable artifact; later claims should not rely on this. | Expected proof artifact: replayable Poison-RAG evaluation case as a reviewable artifact Status: Status: The page renders at its full intended density and the tab-based navigation works as designed. It is currently the most thoroughly. |
<!-- RESEARCHER_PROCESS_MAP_END -->
