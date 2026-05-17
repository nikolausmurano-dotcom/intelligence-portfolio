# Proof Build: Adversarial Evidence Corruption and Poison-RAG Defense - advisor technical annex for LLM-supported analytic judgment

**Project ID.** `poison-rag-defense-annex`

**Proof tier.** specified-proof-plan-needs-demo

**Public claim.** A technical research annex for adversarial evidence corruption and Poison-RAG defense.

**Distinctive mechanism.** It models retrieval poisoning as a causal chain across actor motive, target judgment, attack surface, vector, carrier, timing, RAG layer, analytic deformation, detection trace, countermeasure, replay, and governance. Its distinctive timing layer distinguishes slow poisoning, fast injection, saturation, decoy contamination, and authority-wrapper attacks.

**Use value.** It turns the future work from a vague RAG idea into a red-teamable, source-grounded, experimentally testable architecture for testing where corrupted evidence enters, how it travels, what defensive checks would have to catch it, and whether cheap contaminating signals create a resource burden by exhausting expensive retrieval, detector, or analyst-review capacity.

**Minimum public demo.** show the annex row as future architecture, not a completed study, and tie each proposed test to an observable trace

**Claim ceiling.** The page may claim proof-structured components and visible verification targets. It may not claim external validation, production deployment, or completed empirical findings unless the project-specific record states those facts.

## Flagship Proof Builds

### Advisor annex technical extension proof

- Claim: The annex extends the qualitative capstone toward adversarial evidence corruption and defensive RAG evaluation without claiming completed empirical results.
- Input: attack condition, retrieval trace, model answer, human review decision, and governance gate
- Operation: separate architecture, proposed evaluation, and future empirical result claims
- Expected output: technical blueprint with attack taxonomy, replay design, and claim ceiling
- Verification check: show the annex row as future architecture, not a completed study, and tie each proposed test to an observable trace

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
