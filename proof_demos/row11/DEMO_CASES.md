# Proof Demo Cases: Retrieval Integrity Evaluation — testing Retrieval-Augmented Generation (RAG) against retrieval poisoning and false-source failure

**Project ID.** `row11`

**Proof tier.** specified-proof-plan-needs-demo

**Public claim.** A retrieval-integrity evaluation surface for poisoned or unreliable RAG evidence.

**Distinctive mechanism.** It treats retrieval poisoning as a chain failure across admission, embedding, retrieval, context assembly, generation, analyst review, and public claim; each stage needs its own attack surface, control, and measurement. The timing layer distinguishes slow contamination, fast injection, authority-wrapper attacks, omission attacks, and saturation tactics that can waste reviewer or detector resources.

**Component demo cases.** 9

**Claim ceiling.** The page may claim proof-structured components and visible verification targets. It may not claim external validation, production deployment, or completed empirical findings unless the project-specific record states those facts.

## Flagship Demonstrations

No authored flagship demonstration is present yet. Use the component demo table below.

## Component Demo Cases

| Case | Component | Proof Status | Input Fixture | Expected Output | Next Build Task |
|---|---|---|---|---|---|
| row11__0001__clean-poisoned-evidence-admission | Clean / Poisoned Evidence Admission | specified-output-needs-demo | clean documents, poisoned variants, source identity, poison specification, and admission rule | admission decision and attack-surface record as a reviewable artifact | Replay one clean/poisoned case through Clean / Poisoned Evidence Admission; confirm exposure, uptake or rejection, reviewer burden, and output: admission decision and. |
| row11__0002__slow-poison-track | Slow-Poison Track | specified-output-needs-demo | low-rate adversarial contamination distributed across apparently ordinary source material | slow-contamination exposure profile as a reviewable artifact | Replay one clean/poisoned case through Slow-Poison Track; confirm exposure, uptake or rejection, reviewer burden, and output: slow-contamination exposure profile as a. |
| row11__0003__fast-injection-track | Fast-Injection Track | specified-output-needs-demo | high-salience injected poison, prompt-adjacent poison, or sudden source surge | fast-injection uptake and detection record as a reviewable artifact | Replay one clean/poisoned case through Fast-Injection Track; confirm exposure, uptake or rejection, reviewer burden, and output: fast-injection uptake and detection. |
| row11__0004__authority-wrapper-and-omission-attack-track | Authority-Wrapper And Omission Attack Track | specified-output-needs-demo | poison wrapped in credible authority cues plus missing or displaced contrary evidence | authority/omission vulnerability record as a reviewable artifact | Replay one clean/poisoned case through Authority-Wrapper And Omission Attack Track; confirm exposure, uptake or rejection, reviewer burden, and output. |
| row11__0005__index-perturbation-and-retrieval-trace | Index Perturbation And Retrieval Trace | specified-output-needs-demo | embedding index, sparse index, poisoned chunks, clean chunks, reranking, and context-window assembly | retrieval trace and contamination exposure map | Replay one clean/poisoned case through Index Perturbation And Retrieval Trace; confirm exposure, uptake or rejection, reviewer burden, and output: retrieval trace and. |
| row11__0006__generation-uptake-and-deformation-review | Generation Uptake And Deformation Review | specified-output-needs-demo | retrieved context, model answer, source citations, omitted contrary evidence, and analyst review | uptake, deformation, omission, and review-burden score | Replay one clean/poisoned case through Generation Uptake And Deformation Review; confirm exposure, uptake or rejection, reviewer burden, and output: uptake, deformation. |
| row11__0007__human-llm-validation-gate | Human / LLM Validation Gate | specified-output-needs-demo | model output, retrieved evidence, human analyst judgment, and adversarial condition label | validation decision and reviewer-burden record | Replay one clean/poisoned case through Human / LLM Validation Gate; confirm exposure, uptake or rejection, reviewer burden, and output: validation decision and. |
| row11__0008__mixed-salvo-air-defense-stress | Mixed-Salvo Air-Defense Stress | specified-output-needs-demo | slow poison, fast injection, decoys, saturation material, precision poison, and detector budget | detector/reviewer burden result and resource-allocation warning | Replay one clean/poisoned case through Mixed-Salvo Air-Defense Stress; confirm exposure, uptake or rejection, reviewer burden, and output: detector/reviewer burden. |
| row11__0009__replay-and-benchmark-harness | Replay And Benchmark Harness | specified-output-needs-demo | attack condition, source packet, retrieval trace, model output, reviewer decision, and gate result | replayable Poison-RAG evaluation case as a reviewable artifact | Replay one clean/poisoned case through Replay And Benchmark Harness; confirm exposure, uptake or rejection, reviewer burden, and output: replayable Poison-RAG evaluation. |
