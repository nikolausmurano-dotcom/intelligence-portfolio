# Proof Demo Cases: Retrieval Integrity and Poison-RAG Defense

**Project ID.** `native-poison-rag`

**Proof tier.** specified-proof-plan-needs-demo

**Public claim.** A retrieval-integrity and poisoning-defense page for RAG-supported analysis.

**Distinctive mechanism.** It follows contaminated evidence across admission, indexing, retrieval, context assembly, generation, analyst review, and claim release, then asks where detection, recovery, and resource-allocation should occur when attacks arrive as slow poisoning, fast injection, authority-wrapper attacks, omission attacks, or saturation tactics.

**Component demo cases.** 9

**Claim ceiling.** The page may claim proof-structured components and visible verification targets. It may not claim external validation, production deployment, or completed empirical findings unless the project-specific record states those facts.

## Flagship Demonstrations

### Mixed-speed Poison-RAG salvo replay

**Why distinctive.** The demo treats Poison-RAG as an adversarial evidence-chain and resource-burden problem, not only as contaminated text.

**Runbook.**

- Run clean retrieval and record baseline answer boundary.
- Admit slow poison and record whether it changes retrieval neighborhoods.
- Add fast injection and authority wrapper; trace ranking and context-window assembly.
- Generate answer and score uptake, deformation, omission, and confidence inflation.
- Apply human / LLM validation gate and record reviewer burden.

**Expected evidence.**

- Clean vs contaminated retrieval trace
- Contamination exposure map
- Generation uptake/deformation score
- Reviewer-burden record
- Replayable case file

**Acceptance criteria.**

- The demo identifies the stage where poison first becomes consequential.
- The review burden is measured separately from model answer quality.
- The defense can block, narrow, or abstain rather than only label a passage suspicious.

## Component Demo Cases

| Case | Component | Proof Status | Input Fixture | Expected Output | Next Build Task |
|---|---|---|---|---|---|
| native-poison-rag__0001__clean-poisoned-evidence-admission | Clean / Poisoned Evidence Admission | specified-output-needs-demo | clean documents, poisoned variants, source identity, poison specification, and admission rule | admission decision and attack-surface record as a reviewable artifact | Replay one clean/poisoned case through Clean / Poisoned Evidence Admission; confirm exposure, uptake or rejection, reviewer burden, and output: admission decision and. |
| native-poison-rag__0002__slow-poison-track | Slow-Poison Track | specified-output-needs-demo | low-rate adversarial contamination distributed across apparently ordinary source material | slow-contamination exposure profile as a reviewable artifact | Replay one clean/poisoned case through Slow-Poison Track; confirm exposure, uptake or rejection, reviewer burden, and output: slow-contamination exposure profile as a. |
| native-poison-rag__0003__fast-injection-track | Fast-Injection Track | specified-output-needs-demo | high-salience injected poison, prompt-adjacent poison, or sudden source surge | fast-injection uptake and detection record as a reviewable artifact | Replay one clean/poisoned case through Fast-Injection Track; confirm exposure, uptake or rejection, reviewer burden, and output: fast-injection uptake and detection. |
| native-poison-rag__0004__authority-wrapper-and-omission-attack-track | Authority-Wrapper And Omission Attack Track | specified-output-needs-demo | poison wrapped in credible authority cues plus missing or displaced contrary evidence | authority/omission vulnerability record as a reviewable artifact | Replay one clean/poisoned case through Authority-Wrapper And Omission Attack Track; confirm exposure, uptake or rejection, reviewer burden, and output. |
| native-poison-rag__0005__index-perturbation-and-retrieval-trace | Index Perturbation And Retrieval Trace | specified-output-needs-demo | embedding index, sparse index, poisoned chunks, clean chunks, reranking, and context-window assembly | retrieval trace and contamination exposure map | Replay one clean/poisoned case through Index Perturbation And Retrieval Trace; confirm exposure, uptake or rejection, reviewer burden, and output: retrieval trace and. |
| native-poison-rag__0006__generation-uptake-and-deformation-review | Generation Uptake And Deformation Review | specified-output-needs-demo | retrieved context, model answer, source citations, omitted contrary evidence, and analyst review | uptake, deformation, omission, and review-burden score | Replay one clean/poisoned case through Generation Uptake And Deformation Review; confirm exposure, uptake or rejection, reviewer burden, and output: uptake, deformation. |
| native-poison-rag__0007__human-llm-validation-gate | Human / LLM Validation Gate | specified-output-needs-demo | model output, retrieved evidence, human analyst judgment, and adversarial condition label | validation decision and reviewer-burden record | Replay one clean/poisoned case through Human / LLM Validation Gate; confirm exposure, uptake or rejection, reviewer burden, and output: validation decision and. |
| native-poison-rag__0008__mixed-salvo-air-defense-stress | Mixed-Salvo Air-Defense Stress | specified-output-needs-demo | slow poison, fast injection, decoys, saturation material, precision poison, and detector budget | detector/reviewer burden result and resource-allocation warning | Replay one clean/poisoned case through Mixed-Salvo Air-Defense Stress; confirm exposure, uptake or rejection, reviewer burden, and output: detector/reviewer burden. |
| native-poison-rag__0009__replay-and-benchmark-harness | Replay And Benchmark Harness | specified-output-needs-demo | attack condition, source packet, retrieval trace, model output, reviewer decision, and gate result | replayable Poison-RAG evaluation case as a reviewable artifact | Replay one clean/poisoned case through Replay And Benchmark Harness; confirm exposure, uptake or rejection, reviewer burden, and output: replayable Poison-RAG evaluation. |
