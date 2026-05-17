# Magnum Opus

## Public Pitch

**What it is.** A local scholarly retrieval and citation-governance system for research corpora.

**Distinctive mechanism.** It ingests a corpus, builds sparse and semantic indexes, exposes a query service, retrieves evidence, scores support, validates citations, runs critique or red-team checks, abstains when support is inadequate, and preserves source influence.

**Why it matters.** It is meant to be more than search: the point is to make corpus state, retrieval path, evidence scoring, contradiction, citation status, abstention, and answer authority inspectable on a local research machine.

## Blueprint

### Vision

A local scholarly retrieval and citation-governance system for research corpora.

### Mechanism

It ingests a corpus, builds sparse and semantic indexes, exposes a query service, retrieves evidence, scores support, validates citations, runs critique or red-team checks, abstains when support is inadequate, and preserves source influence.

### Built components

Visible public components: 11 kept Evidence Sections, native navigation, Review Notes, source-use plan, APA lineage, and source lineage claim limit. The public package remains text-focused and does not claim unverified runtime state.

### Source use

Heuer. Loads cognitive-bias and intelligence-analysis failure modes. CIA Tradecraft Primer. Loads structured analytic technique selection and use conditions. Pherson and Pherson. Loads practical tradecraft: indicators, ACH, key assumptions, diagnosticity, and challenge procedures. Tetlock. Loads judgment calibration, forecasting humility, and expert-performance limits. Kahneman. Loads bias, heuristics, and slow/fast cognition as an error-control vocabulary. A page-family source-use record exists. Final citation strength still depends on page-specific passage review.

### Plan

Plan: turn infrastructure evidence into plain-language project status, distinguish internal tooling from public claims, and keep every completion claim tied to a file, route, ledger, or gate. The project source notes below should be converted into authored subsections only after the page-specific claim limit and source-use decisions are settled.

### Status

Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage ceiling and the original project governance records. The page separates public presentation from project completion; completion depends on the status and remaining-gap fields.

### Remaining gaps

Remaining gaps: some infrastructure pages still need human-authored connective prose so a first-time reviewer can see why the machinery matters. The kept Evidence Sections below preserve project substance for close reading; final public prose should be authored from those signals rather than copied mechanically.

## Maintenance Rule

Update this blueprint before strengthening public claims on the website. Do not use word count, module count, or status percentage as a substitute for concrete project substance.

<!-- RESEARCHER_PROCESS_MAP_START -->
## Researcher Process Instrument Map

**Map type.** curated_scholarly_retrieval

**Research use case.** A local scholarly retrieval and citation-governance system for research corpora.

**Final use case.** It is meant to be more than search: the point is to make corpus state, retrieval path, evidence scoring, contradiction, citation status, abstention, and answer authority inspectable on a local research machine.

**Instrument count.** 10

| Stage / Instrument | Form | Input | Operation | Output | Upstream / Downstream | Proof / Status / Next Check |
|---|---|---|---|---|---|---|
| RESEARCH_PROCESS: Root Registry And Corpus Admission | curated scholarly retrieval | books, PDFs, Calibre records, manifests, root paths, source hashes, and status classes | decides what belongs in the scholarly corpus, what is stable but unprocessed, what is committed, and what remains excluded or failed | admitted corpus records plus holding, failed, and promotion states | Requires books, PDFs, Calibre records, manifests, root paths, source hashes, and status classes -> Feeds admitted corpus records plus holding, failed, and promotion states; later claims should not rely on this step. | Expected proof artifact: admitted corpus records plus holding, failed, and promotion states Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source. |
| RESEARCH_PROCESS: Bibliographic Identity And Authority Control | curated scholarly retrieval | file paths, internal metadata, editions, duplicate candidates, OCR quality, genre signals, and source typology | moves from file identity toward work/edition/source identity so duplicate files do not masquerade as independent evidence | bibliographic identity record and authority-control warning surface | Requires file paths, internal metadata, editions, duplicate candidates, OCR quality, genre signals, and source typology -> Feeds bibliographic identity record and authority-control warning surface; later claims should. | Expected proof artifact: bibliographic identity record and authority-control warning surface Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source. |
| RESEARCH_PROCESS: Extraction Pipeline | curated scholarly retrieval | admitted source, profile-only mode, structural detectors, bibliography/index/further-reading/glossary/acknowledgment miners, and optional argumentative extraction | turns a book into structured scholarly records before retrieval or synthesis relies on it | source profile, structural extraction database records, and argumentative-extraction candidates | Requires admitted source, profile-only mode, structural detectors, bibliography/index/further-reading/glossary/acknowledgment miners, and optional argumentative extraction -> Feeds source profile, structural extraction. | Expected proof artifact: source profile, structural extraction database records, and argumentative-extraction candidates Status: Status: native public port complete for upload and navigation; substantive source-project verification remains. |
| RESEARCH_PROCESS: Hybrid Retrieval Plane | curated scholarly retrieval | committed corpus records, BM25 index, dense index, query intent, filters, and chunk windows | uses hybrid dense/sparse retrieval with fusion and domain-aware constraints where available | ranked evidence candidates with provenance as a reviewable artifact | Requires committed corpus records, BM25 index, dense index, query intent, filters, and chunk windows -> Feeds ranked evidence candidates with provenance as a reviewable artifact; later claims should not rely on this. | Expected proof artifact: ranked evidence candidates with provenance as a reviewable artifact Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source. |
| RESEARCH_PROCESS: Query Decomposition And Evidence Search | curated scholarly retrieval | research question, subquestions, scope constraints, and retrieval results | breaks broad questions into evidence-searchable subclaims instead of asking one fluent answer from a black box | evidence packet organized around answerable claim units | Requires research question, subquestions, scope constraints, and retrieval results -> Feeds evidence packet organized around answerable claim units; later claims should not rely on this step until its expected output is. | Expected proof artifact: evidence packet organized around answerable claim units Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage ceiling. |
| RESEARCH_PROCESS: Citation Validation And Claim Support | curated scholarly retrieval | candidate answer, retrieved passages, citations, and source lineage | checks whether claims are supported, weakly supported, contradicted, or unsupported before synthesis is allowed to stand | claim-to-evidence decision packet as a reviewable artifact | Requires candidate answer, retrieved passages, citations, and source lineage -> Feeds claim-to-evidence decision packet as a reviewable artifact; later claims should not rely on this step until its expected output is. | Expected proof artifact: claim-to-evidence decision packet as a reviewable artifact Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage. |
| RESEARCH_PROCESS: Contradiction And Red-Team Review | curated scholarly retrieval | supported claims, rival passages, source families, and uncertainty markers | looks for source conflict, rival interpretations, and overconfident synthesis before release | contradiction review and narrowed claim ceiling | Requires supported claims, rival passages, source families, and uncertainty markers -> Feeds contradiction review and narrowed claim ceiling; later claims should not rely on this step until its expected output is. | Expected proof artifact: contradiction review and narrowed claim ceiling Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage ceiling and the. |
| RESEARCH_PROCESS: Abstention And Refusal Gate | curated scholarly retrieval | evidence packet, source support state, contradiction state, and user query | refuses or narrows answers when the corpus cannot support the requested claim; the step records the decision path so the reader can see how the project moves from input to governed output. | answer, qualified answer, follow-up search plan, or refusal | Requires evidence packet, source support state, contradiction state, and user query -> Feeds answer, qualified answer, follow-up search plan, or refusal; later claims should not rely on this step until its expected. | Expected proof artifact: answer, qualified answer, follow-up search plan, or refusal Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage. |
| RESEARCH_PROCESS: Evidence Export And Permission Membrane | curated scholarly retrieval | redacted evidence package, share request, inventory state, operator intent, and retention rules | validates that an external package can be issued or shared without raw-text leakage, local-path exposure, or unsupported derived claims | share-authorized export package or blocked share decision | Requires redacted evidence package, share request, inventory state, operator intent, and retention rules -> Feeds share-authorized export package or blocked share decision; later claims should not rely on this step. | Expected proof artifact: share-authorized export package or blocked share decision Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage ceiling. |
| RESEARCH_PROCESS: State / Share / Retention Constitution | curated scholarly retrieval | evidence states, local-state policies, share-grant requirements, negative-transfer exclusions, and retention rules | keeps local evidence state and external sharing governed rather than treating retrieval output as freely portable | state/share/retention proof record and review-ready audit surface | Requires evidence states, local-state policies, share-grant requirements, negative-transfer exclusions, and retention rules -> Feeds state/share/retention proof record and review-ready audit surface; later claims should. | Expected proof artifact: state/share/retention proof record and review-ready audit surface Status: Status: native public port complete for upload and navigation; substantive source-project verification remains limited by the source lineage. |
<!-- RESEARCHER_PROCESS_MAP_END -->
