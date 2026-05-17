# Proof Demo Cases: Magnum Opus Scholarly Retrieval System

**Project ID.** `native-magnum-opus`

**Proof tier.** specified-proof-plan-needs-demo

**Public claim.** A local scholarly retrieval and citation-governance system for research corpora.

**Distinctive mechanism.** It ingests a corpus, builds sparse and semantic indexes, exposes a query service, retrieves evidence, scores support, validates citations, runs critique or red-team checks, abstains when support is inadequate, and preserves source influence.

**Component demo cases.** 10

**Claim ceiling.** The page may claim proof-structured components and visible verification targets. It may not claim external validation, production deployment, or completed empirical findings unless the project-specific record states those facts.

## Flagship Demonstrations

### Magnum Opus retrieval trace and abstention proof

**Why distinctive.** The system should show the difference between retrieving fluent context and proving that a claim is warranted by a local scholarly corpus.

**Runbook.**

- Admit or identify corpus sources with bibliographic identity.
- Run hybrid retrieval against the query.
- Label retrieved passages by support role.
- Check whether the claim is supported, weakly supported, contradicted, or too broad.
- Produce answer, narrowed answer, or abstention.

**Expected evidence.**

- Source identity record
- BM25/dense retrieval candidates
- Support labels
- Contradiction or limitation note
- Qualified answer or refusal

**Acceptance criteria.**

- The proof exposes source identity and retrieval path.
- The answer boundary changes if support is weak or contradictory.
- The system can abstain without treating abstention as failure.

## Component Demo Cases

| Case | Component | Proof Status | Input Fixture | Expected Output | Next Build Task |
|---|---|---|---|---|---|
| native-magnum-opus__0001__root-registry-and-corpus-admission | Root Registry And Corpus Admission | specified-output-needs-demo | books, PDFs, Calibre records, manifests, root paths, source hashes, and status classes | admitted corpus records plus holding, failed, and promotion states | Run one corpus query or source-admission fixture through Root Registry And Corpus Admission; confirm source identity, retrieval path, support state, and output: admitted. |
| native-magnum-opus__0002__bibliographic-identity-and-authority-control | Bibliographic Identity And Authority Control | specified-output-needs-demo | file paths, internal metadata, editions, duplicate candidates, OCR quality, genre signals, and source typology | bibliographic identity record and authority-control warning surface | Run one corpus query or source-admission fixture through Bibliographic Identity And Authority Control; confirm source identity, retrieval path, support state, and. |
| native-magnum-opus__0003__extraction-pipeline | Extraction Pipeline | specified-output-needs-demo | admitted source, profile-only mode, structural detectors, bibliography/index/further-reading/glossary/acknowledgment miners, and optional. | source profile, structural extraction database records, and argumentative-extraction candidates | Run one corpus query or source-admission fixture through Extraction Pipeline; confirm source identity, retrieval path, support state, and output: source profile. |
| native-magnum-opus__0004__hybrid-retrieval-plane | Hybrid Retrieval Plane | specified-output-needs-demo | committed corpus records, BM25 index, dense index, query intent, filters, and chunk windows | ranked evidence candidates with provenance as a reviewable artifact | Run one corpus query or source-admission fixture through Hybrid Retrieval Plane; confirm source identity, retrieval path, support state, and output: ranked evidence. |
| native-magnum-opus__0005__query-decomposition-and-evidence-search | Query Decomposition And Evidence Search | specified-output-needs-demo | research question, subquestions, scope constraints, and retrieval results | evidence packet organized around answerable claim units | Run one corpus query or source-admission fixture through Query Decomposition And Evidence Search; confirm source identity, retrieval path, support state, and output. |
| native-magnum-opus__0006__citation-validation-and-claim-support | Citation Validation And Claim Support | specified-output-needs-demo | candidate answer, retrieved passages, citations, and source lineage | claim-to-evidence decision packet as a reviewable artifact | Run one corpus query or source-admission fixture through Citation Validation And Claim Support; confirm source identity, retrieval path, support state, and output. |
| native-magnum-opus__0007__contradiction-and-red-team-review | Contradiction And Red-Team Review | specified-output-needs-demo | supported claims, rival passages, source families, and uncertainty markers | contradiction review and narrowed claim ceiling | Run one corpus query or source-admission fixture through Contradiction And Red-Team Review; confirm source identity, retrieval path, support state, and output. |
| native-magnum-opus__0008__abstention-and-refusal-gate | Abstention And Refusal Gate | specified-output-needs-demo | evidence packet, source support state, contradiction state, and user query | answer, qualified answer, follow-up search plan, or refusal | Run one corpus query or source-admission fixture through Abstention And Refusal Gate; confirm source identity, retrieval path, support state, and output: answer. |
| native-magnum-opus__0009__evidence-export-and-permission-membrane | Evidence Export And Permission Membrane | specified-output-needs-demo | redacted evidence package, share request, inventory state, operator intent, and retention rules | share-authorized export package or blocked share decision | Run one corpus query or source-admission fixture through Evidence Export And Permission Membrane; confirm source identity, retrieval path, support state, and output. |
| native-magnum-opus__0010__state-share-retention-constitution | State / Share / Retention Constitution | specified-output-needs-demo | evidence states, local-state policies, share-grant requirements, negative-transfer exclusions, and retention rules | state/share/retention proof record and review-ready audit surface | Run one corpus query or source-admission fixture through State / Share / Retention Constitution; confirm source identity, retrieval path, support state, and output. |
