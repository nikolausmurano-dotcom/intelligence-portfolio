# Proof Build: Defensive Retrieval Research — future study on retrieval-augmented-generation poisoning

**Project ID.** `row14`

**Proof tier.** specified-proof-plan-needs-demo

**Public claim.** A future empirical research program extending the qualitative capstone into RAG corruption conditions.

**Distinctive mechanism.** It crosses named poison types with prompt-discipline or review conditions, inherits outcome measures from the capstone, and can add timing, saturation, authority-wrapper, omission, and analyst-burden metrics. It can test whether slow poisoning, fast poisoning, and decoy contamination create different verification costs, similar to how mixed-speed drone and missile attacks stress layered air-defense systems.

**Use value.** It makes the next study more than a generic Poison-RAG test: the real question is which adversarial evidence pressures impose the greatest verification burden, where the human reviewer or retrieval defense spends scarce attention, and when a defensive layer becomes easier to saturate than to defeat directly.

**Minimum public demo.** Replay one clean/poisoned case through Clean / Poisoned Evidence Admission; confirm exposure, uptake or rejection, reviewer burden, and output: admission decision and attack-surface record....

**Claim ceiling.** The page may claim proof-structured components and visible verification targets. It may not claim external validation, production deployment, or completed empirical findings unless the project-specific record states those facts.

## Flagship Proof Builds

No special flagship proof build has been authored yet; this project is governed by the component proof table below.

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
