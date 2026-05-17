# Proof Build: Retrieval Integrity and Poisoning Defense

**Project ID.** `native-poison-rag`

**Proof tier.** specified-proof-plan-needs-demo

**Public claim.** A retrieval-integrity and poisoning-defense page for RAG-supported analysis.

**Distinctive mechanism.** It follows contaminated evidence across admission, indexing, retrieval, context assembly, generation, analyst review, and claim release, then asks where detection, recovery, and resource-allocation should occur when attacks arrive as slow poisoning, fast injection, authority-wrapper attacks, omission attacks, or saturation tactics.

**Use value.** It makes Poison-RAG concrete by treating it as an evidence-chain and resource-burden problem rather than a prompt problem alone. The useful comparison is layered air defense: cheap decoys and mixed-speed salvos can force expensive defenses to spend attention, compute, and analyst time before the precision attack is even evaluated.

**Minimum public demo.** replay one mixed-salvo case and show where the poison entered, whether it surfaced, whether the answer absorbed it, and what the reviewer had to spend

**Claim ceiling.** The page may claim proof-structured components and visible verification targets. It may not claim external validation, production deployment, or completed empirical findings unless the project-specific record states those facts.

## Flagship Proof Builds

### Mixed-speed Poison-RAG salvo proof

- Claim: The distinctive idea is not simply poison detection; it is testing slow contamination, fast injection, authority wrappers, omissions, and resource-draining decoys as a layered adversarial retrieval problem.
- Input: clean corpus, slow-poison documents, fast-injection documents, authority-wrapper poison, omission condition, and detector/reviewer budget
- Operation: run the same retrieval task through clean and contaminated conditions and trace exposure, ranking, generation uptake, and reviewer burden
- Expected output: retrieval trace, contamination exposure map, uptake/deformation score, reviewer-burden score, and replayable case
- Verification check: replay one mixed-salvo case and show where the poison entered, whether it surfaced, whether the answer absorbed it, and what the reviewer had to spend

## Component Proof Table

| Component | Status | Input | Expected Output | Verification Check |
|---|---|---|---|---|
| Clean / Poisoned Evidence Admission | specified-output-needs-demo | clean documents, poisoned variants, source identity, poison specification, and admission rule | admission decision and attack-surface record as a reviewable artifact | Replay one clean/poisoned case through Clean / Poisoned Evidence Admission; confirm exposure, uptake or rejection, reviewer burden, and output: admission decision and. |
| Slow-Poison Track | specified-output-needs-demo | low-rate adversarial contamination distributed across apparently ordinary source material | slow-contamination exposure profile as a reviewable artifact | Replay one clean/poisoned case through Slow-Poison Track; confirm exposure, uptake or rejection, reviewer burden, and output: slow-contamination exposure profile as a. |
| Fast-Injection Track | specified-output-needs-demo | high-salience injected poison, prompt-adjacent poison, or sudden source surge | fast-injection uptake and detection record as a reviewable artifact | Replay one clean/poisoned case through Fast-Injection Track; confirm exposure, uptake or rejection, reviewer burden, and output: fast-injection uptake and detection. |
| Authority-Wrapper And Omission Attack Track | specified-output-needs-demo | poison wrapped in credible authority cues plus missing or displaced contrary evidence | authority/omission vulnerability record as a reviewable artifact | Replay one clean/poisoned case through Authority-Wrapper And Omission Attack Track; confirm exposure, uptake or rejection, reviewer burden, and output. |
| Index Perturbation And Retrieval Trace | specified-output-needs-demo | embedding index, sparse index, poisoned chunks, clean chunks, reranking, and context-window assembly | retrieval trace and contamination exposure map | Replay one clean/poisoned case through Index Perturbation And Retrieval Trace; confirm exposure, uptake or rejection, reviewer burden, and output: retrieval trace and. |
| Generation Uptake And Deformation Review | specified-output-needs-demo | retrieved context, model answer, source citations, omitted contrary evidence, and analyst review | uptake, deformation, omission, and review-burden score | Replay one clean/poisoned case through Generation Uptake And Deformation Review; confirm exposure, uptake or rejection, reviewer burden, and output: uptake, deformation. |
| Human / LLM Validation Gate | specified-output-needs-demo | model output, retrieved evidence, human analyst judgment, and adversarial condition label | validation decision and reviewer-burden record | Replay one clean/poisoned case through Human / LLM Validation Gate; confirm exposure, uptake or rejection, reviewer burden, and output: validation decision and. |
| Mixed-Salvo Air-Defense Stress | specified-output-needs-demo | slow poison, fast injection, decoys, saturation material, precision poison, and detector budget | detector/reviewer burden result and resource-allocation warning | Replay one clean/poisoned case through Mixed-Salvo Air-Defense Stress; confirm exposure, uptake or rejection, reviewer burden, and output: detector/reviewer burden. |
| Replay And Benchmark Harness | specified-output-needs-demo | attack condition, source packet, retrieval trace, model output, reviewer decision, and gate result | replayable Poison-RAG evaluation case as a reviewable artifact | Replay one clean/poisoned case through Replay And Benchmark Harness; confirm exposure, uptake or rejection, reviewer burden, and output: replayable Poison-RAG evaluation. |
