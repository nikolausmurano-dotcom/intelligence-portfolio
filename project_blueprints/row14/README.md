# Defensive Retrieval Research — future study on retrieval-augmented-generation poisoning

## Public Pitch

**What it is.** A future empirical research program extending the qualitative capstone into RAG corruption conditions.

**Distinctive mechanism.** It crosses named poison types with prompt-discipline or review conditions, inherits outcome measures from the capstone, and can add timing, saturation, authority-wrapper, omission, and analyst-burden metrics. It can test whether slow poisoning, fast poisoning, and decoy contamination create different verification costs, similar to how mixed-speed drone and missile attacks stress layered air-defense systems.

**Why it matters.** It makes the next study more than a generic Poison-RAG test: the real question is which adversarial evidence pressures impose the greatest verification burden, where the human reviewer or retrieval defense spends scarce attention, and when a defensive layer becomes easier to saturate than to defeat directly.

## Blueprint

### Vision

A future empirical research program extending the qualitative capstone into RAG corruption conditions.

### Mechanism

It crosses named poison types with prompt-discipline or review conditions, inherits outcome measures from the capstone, and can add timing, saturation, authority-wrapper, omission, and analyst-burden metrics. It can test whether slow poisoning, fast poisoning, and decoy contamination create different verification costs, similar to how mixed-speed drone and missile attacks stress layered air-defense systems.

### Built components

This page is presented as a research idea rather than as completed work because that is what it is. There is no code yet, no pilot run, no IRB conversation; the two-axis design above is the only work product at this stage. Surfacing the page at this state is the point — the honesty about where it sits matters more than dressing it up to look further along, and an external reviewer would want to see it at this state rather than after it has been quietly tightened. The foundation to make the study runnable already exists. What is missing is a collaborative design pass — selecting the canonical retrieval-poison taxonomy, locking the target sample size against a power calculation, and choosing the publication venue and the IRB pathway. Those are the decisions that need to be made before the technical foundation work begins.

### Source use

Source use is organized by role: method authorities, domain evidence, technical background, implementation evidence, and claim limits. The page should show why each source matters; direct quotations and stronger factual claims still require exact passage anchors before publication.

### Plan

Three decision steps gate the technical work. The order matters because doing foundation work before the design decisions are settled would lock in a study the design pass might want to change. Step 01 retrieval-poison taxonomy scan Literature scan to determine which IC-AI-credible taxonomies the five named poison types map onto — and whether the study extends a published taxonomy or proposes its own. Step 02 Five-by-four design lock Target sample size derived from a power calculation against the capstone's effect sizes. The design is on the page; the parameters are not yet settled. Step 03 Venue and IRB pathway Whether the capstone IRB precedent extends or a new submission is required; which journal the design is targeted toward. Step 04 Poison-harness foundation Built in the research-library corpus plane (Row 06) — once the design is locked, this is what makes the experiment runnable at corpus scale. Step 05 Matched-pair coding execution Run under the locked design; scored against the deterministic instruments. The coding methodology is inherited from the capstone — execution rather than design.

### Status

Status: This page is presented as a research idea rather than as completed work because that is what it is. There is no code yet, no pilot run, no IRB conversation; the two-axis design above is the only work product at this stage. Surfacing the page at this state is the point — the honesty about where it sits matters more than dressing it up to look further along, and an external reviewer would want to see it at this state rather than after it has been quietly tightened.

### Remaining gaps

Remaining gaps: three decision steps gate the technical work. The order matters because doing foundation work before the design decisions are settled would lock in a study the design pass might want to change.

## Maintenance Rule

Update this blueprint before strengthening public claims on the website. Do not use word count, module count, or status percentage as a substitute for concrete project substance.

<!-- RESEARCHER_PROCESS_MAP_START -->
## Researcher Process Instrument Map

**Map type.** curated_poison_rag

**Research use case.** A future empirical research program extending the qualitative capstone into RAG corruption conditions.

**Final use case.** It makes the next study more than a generic Poison-RAG test: the real question is which adversarial evidence pressures impose the greatest verification burden, where the human reviewer or retrieval defense spends scarce attention, and when a defensive layer becomes easier to saturate than to defeat directly.

**Instrument count.** 9

| Stage / Instrument | Form | Input | Operation | Output | Upstream / Downstream | Proof / Status / Next Check |
|---|---|---|---|---|---|---|
| RESEARCH_PROCESS: Clean / Poisoned Evidence Admission | curated poison rag | clean documents, poisoned variants, source identity, poison specification, and admission rule | tests whether contaminated material enters the corpus before indexing and records the attack surface at the corpus boundary | admission decision and attack-surface record as a reviewable artifact | Requires clean documents, poisoned variants, source identity, poison specification, and admission rule -> Feeds admission decision and attack-surface record as a reviewable artifact; later claims should not rely on this. | Expected proof artifact: admission decision and attack-surface record as a reviewable artifact Status: Status: This page is presented as a research idea rather than as completed work because that is what it is. There is no code yet, no. |
| RESEARCH_PROCESS: Slow-Poison Track | curated poison rag | low-rate adversarial contamination distributed across apparently ordinary source material | models the long-game attacker who degrades retrieval trust without triggering obvious anomaly thresholds | slow-contamination exposure profile as a reviewable artifact | Requires low-rate adversarial contamination distributed across apparently ordinary source material -> Feeds slow-contamination exposure profile as a reviewable artifact; later claims should not rely on this step until. | Expected proof artifact: slow-contamination exposure profile as a reviewable artifact Status: Status: This page is presented as a research idea rather than as completed work because that is what it is. There is no code yet, no pilot run. |
| RESEARCH_PROCESS: Fast-Injection Track | curated poison rag | high-salience injected poison, prompt-adjacent poison, or sudden source surge | models the short-game attacker who tries to force immediate retrieval or generation uptake | fast-injection uptake and detection record as a reviewable artifact | Requires high-salience injected poison, prompt-adjacent poison, or sudden source surge -> Feeds fast-injection uptake and detection record as a reviewable artifact; later claims should not rely on this step until its. | Expected proof artifact: fast-injection uptake and detection record as a reviewable artifact Status: Status: This page is presented as a research idea rather than as completed work because that is what it is. There is no code yet, no pilot. |
| RESEARCH_PROCESS: Authority-Wrapper And Omission Attack Track | curated poison rag | poison wrapped in credible authority cues plus missing or displaced contrary evidence | tests whether the system mistakes source costume for authority or misses the significance of absent evidence | authority/omission vulnerability record as a reviewable artifact | Requires poison wrapped in credible authority cues plus missing or displaced contrary evidence -> Feeds authority/omission vulnerability record as a reviewable artifact; later claims should not rely on this step until. | Expected proof artifact: authority/omission vulnerability record as a reviewable artifact Status: Status: This page is presented as a research idea rather than as completed work because that is what it is. There is no code yet, no pilot. |
| RESEARCH_PROCESS: Index Perturbation And Retrieval Trace | curated poison rag | embedding index, sparse index, poisoned chunks, clean chunks, reranking, and context-window assembly | tracks whether poisoned material is surfaced, ranked, fused, or suppressed at each retrieval stage | retrieval trace and contamination exposure map | Requires embedding index, sparse index, poisoned chunks, clean chunks, reranking, and context-window assembly -> Feeds retrieval trace and contamination exposure map; later claims should not rely on this step until its. | Expected proof artifact: retrieval trace and contamination exposure map Status: Status: This page is presented as a research idea rather than as completed work because that is what it is. There is no code yet, no pilot run, no IRB. Next. |
| RESEARCH_PROCESS: Generation Uptake And Deformation Review | curated poison rag | retrieved context, model answer, source citations, omitted contrary evidence, and analyst review | measures whether the answer absorbs, paraphrases, amplifies, hides, or resists the poison | uptake, deformation, omission, and review-burden score | Requires retrieved context, model answer, source citations, omitted contrary evidence, and analyst review -> Feeds uptake, deformation, omission, and review-burden score; later claims should not rely on this step until. | Expected proof artifact: uptake, deformation, omission, and review-burden score Status: Status: This page is presented as a research idea rather than as completed work because that is what it is. There is no code yet, no pilot run, no IRB. |
| RESEARCH_PROCESS: Human / LLM Validation Gate | curated poison rag | model output, retrieved evidence, human analyst judgment, and adversarial condition label | separates what the model accepted from what a reviewer caught, missed, blocked, or escalated | validation decision and reviewer-burden record | Requires model output, retrieved evidence, human analyst judgment, and adversarial condition label -> Feeds validation decision and reviewer-burden record; later claims should not rely on this step until its expected. | Expected proof artifact: validation decision and reviewer-burden record Status: Status: This page is presented as a research idea rather than as completed work because that is what it is. There is no code yet, no pilot run, no IRB. Next. |
| RESEARCH_PROCESS: Mixed-Salvo Air-Defense Stress | curated poison rag | slow poison, fast injection, decoys, saturation material, precision poison, and detector budget | uses layered air-defense logic to test whether cheap attacks can waste expensive review and detection resources while precision poison slips through | detector/reviewer burden result and resource-allocation warning | Requires slow poison, fast injection, decoys, saturation material, precision poison, and detector budget -> Feeds detector/reviewer burden result and resource-allocation warning; later claims should not rely on this. | Expected proof artifact: detector/reviewer burden result and resource-allocation warning Status: Status: This page is presented as a research idea rather than as completed work because that is what it is. There is no code yet, no pilot. |
| RESEARCH_PROCESS: Replay And Benchmark Harness | curated poison rag | attack condition, source packet, retrieval trace, model output, reviewer decision, and gate result | keeps the adversarial episode reproducible so future defenses can be compared against the same contamination path | replayable Poison-RAG evaluation case as a reviewable artifact | Requires attack condition, source packet, retrieval trace, model output, reviewer decision, and gate result -> Feeds replayable Poison-RAG evaluation case as a reviewable artifact; later claims should not rely on this. | Expected proof artifact: replayable Poison-RAG evaluation case as a reviewable artifact Status: Status: This page is presented as a research idea rather than as completed work because that is what it is. There is no code yet, no pilot run. |
<!-- RESEARCHER_PROCESS_MAP_END -->
