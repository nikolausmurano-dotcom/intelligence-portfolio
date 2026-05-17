# Proof Build: Magnum Opus

**Project ID.** `native-magnum-opus`

**Proof tier.** specified-proof-plan-needs-demo

**Public claim.** A local scholarly retrieval and citation-governance system for research corpora.

**Distinctive mechanism.** It ingests a corpus, builds sparse and semantic indexes, exposes a query service, retrieves evidence, scores support, validates citations, runs critique or red-team checks, abstains when support is inadequate, and preserves source influence.

**Use value.** It is meant to be more than search: the point is to make corpus state, retrieval path, evidence scoring, contradiction, citation status, abstention, and answer authority inspectable on a local research machine.

**Minimum public demo.** show one source moving from file path to corpus identity with state and duplicate warning visible

**Claim ceiling.** The page may claim proof-structured components and visible verification targets. It may not claim external validation, production deployment, or completed empirical findings unless the project-specific record states those facts.

## Flagship Proof Builds

### Corpus admission and authority-control proof

- Claim: Magnum Opus begins before retrieval: it decides what enters the corpus and prevents duplicate files from masquerading as independent evidence.
- Input: one book or paper file with metadata, source path, edition signal, and duplicate-risk signal
- Operation: admit the source, assign identity, classify processing state, and record warnings
- Expected output: source identity record with admitted / holding / failed / duplicate-risk state
- Verification check: show one source moving from file path to corpus identity with state and duplicate warning visible

### Hybrid retrieval and citation-support proof

- Claim: The system is meant to make retrieval path, evidence score, citation support, contradiction, and abstention inspectable.
- Input: one research query, source filters, BM25/dense candidates, and candidate answer
- Operation: retrieve, fuse, validate support, test contradiction, and narrow or abstain if evidence is inadequate
- Expected output: ranked evidence packet, claim-support state, contradiction note, and qualified answer or refusal
- Verification check: run one query and show retrieved passages, support labels, contradiction state, and answer boundary

## Component Proof Table

| Component | Status | Input | Expected Output | Verification Check |
|---|---|---|---|---|
| Root Registry And Corpus Admission | specified-output-needs-demo | books, PDFs, Calibre records, manifests, root paths, source hashes, and status classes | admitted corpus records plus holding, failed, and promotion states | Run one corpus query or source-admission fixture through Root Registry And Corpus Admission; confirm source identity, retrieval path, support state, and output: admitted. |
| Bibliographic Identity And Authority Control | specified-output-needs-demo | file paths, internal metadata, editions, duplicate candidates, OCR quality, genre signals, and source typology | bibliographic identity record and authority-control warning surface | Run one corpus query or source-admission fixture through Bibliographic Identity And Authority Control; confirm source identity, retrieval path, support state, and. |
| Extraction Pipeline | specified-output-needs-demo | admitted source, profile-only mode, structural detectors, bibliography/index/further-reading/glossary/acknowledgment miners, and. | source profile, structural extraction database records, and argumentative-extraction candidates | Run one corpus query or source-admission fixture through Extraction Pipeline; confirm source identity, retrieval path, support state, and output: source profile. |
| Hybrid Retrieval Plane | specified-output-needs-demo | committed corpus records, BM25 index, dense index, query intent, filters, and chunk windows | ranked evidence candidates with provenance as a reviewable artifact | Run one corpus query or source-admission fixture through Hybrid Retrieval Plane; confirm source identity, retrieval path, support state, and output: ranked evidence. |
| Query Decomposition And Evidence Search | specified-output-needs-demo | research question, subquestions, scope constraints, and retrieval results | evidence packet organized around answerable claim units | Run one corpus query or source-admission fixture through Query Decomposition And Evidence Search; confirm source identity, retrieval path, support state, and output. |
| Citation Validation And Claim Support | specified-output-needs-demo | candidate answer, retrieved passages, citations, and source lineage | claim-to-evidence decision packet as a reviewable artifact | Run one corpus query or source-admission fixture through Citation Validation And Claim Support; confirm source identity, retrieval path, support state, and output. |
| Contradiction And Red-Team Review | specified-output-needs-demo | supported claims, rival passages, source families, and uncertainty markers | contradiction review and narrowed claim ceiling | Run one corpus query or source-admission fixture through Contradiction And Red-Team Review; confirm source identity, retrieval path, support state, and output. |
| Abstention And Refusal Gate | specified-output-needs-demo | evidence packet, source support state, contradiction state, and user query | answer, qualified answer, follow-up search plan, or refusal | Run one corpus query or source-admission fixture through Abstention And Refusal Gate; confirm source identity, retrieval path, support state, and output: answer. |
| Evidence Export And Permission Membrane | specified-output-needs-demo | redacted evidence package, share request, inventory state, operator intent, and retention rules | share-authorized export package or blocked share decision | Run one corpus query or source-admission fixture through Evidence Export And Permission Membrane; confirm source identity, retrieval path, support state, and output. |
| State / Share / Retention Constitution | specified-output-needs-demo | evidence states, local-state policies, share-grant requirements, negative-transfer exclusions, and retention rules | state/share/retention proof record and review-ready audit surface | Run one corpus query or source-admission fixture through State / Share / Retention Constitution; confirm source identity, retrieval path, support state, and output. |
