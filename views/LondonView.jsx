// LondonView.jsx — Archive Explorer
// London Study Abroad (ABROAD, Spring 2012)
// "Archive Explorer" — Five research experiences across London, each representing
// a different methodology for engaging with historical evidence. From colonial
// files at the National Archives to comparative seminars at LSE, each location
// teaches a distinct approach to understanding the past.
// Three modes: Locations (site-by-site exploration), Methods (research methodology
// per site), Reflections (what each taught about historical research).


// ── Palette: Victorian fog & aged paper — research archive aesthetic ──
const C = {
  bg:      '#0a0c10',
  card:    'rgba(14,16,22,.88)',
  cardBd:  'rgba(88,100,132,.16)',
  tx:      '#d0d4e0',
  tx2:     '#a0a8b8',
  tx3:     '#6a7488',
  accent:  '#5870a0',
  accentDm:'#405878',
  accentBg:'rgba(88,112,160,.06)',
  gold:    '#c0a868',
  goldDm:  '#a08848',
  red:     '#905050',
  redDm:   '#703838',
  redBg:   'rgba(144,80,80,.06)',
  green:   '#508868',
  greenDm: '#386848',
  greenBg: 'rgba(80,136,104,.06)',
  blue:    '#5888b8',
  blueDm:  '#4068a0',
  blueBg:  'rgba(88,136,184,.06)',
  teal:    '#488898',
  tealDm:  '#306878',
  tealBg:  'rgba(72,136,152,.06)',
  line:    'rgba(88,100,132,.10)',
  parchment: 'rgba(180,160,120,.04)',
  ink:     'rgba(30,35,50,.8)',
  sepia:   '#a09070',
};
const Serif = "'EB Garamond','Source Serif 4',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";
const Mono  = "'IBM Plex Mono',monospace";

// ── SVG Decorative Elements ────────────────────────────────────────
const ParliamentSilhouette = () => (
  <svg style={{position:'absolute',bottom:0,right:0,width:'400px',height:'200px',opacity:0.02,pointerEvents:'none'}} viewBox="0 0 400 200">
    {/* Big Ben tower */}
    <rect x="320" y="20" width="24" height="180" fill="currentColor"/>
    <rect x="316" y="16" width="32" height="8" fill="currentColor"/>
    <polygon points="332,0 316,16 348,16" fill="currentColor"/>
    <rect x="326" y="50" width="12" height="16" rx="6" fill="rgba(10,12,16,1)"/>
    {/* Parliament building */}
    <rect x="40" y="100" width="280" height="100" fill="currentColor"/>
    <rect x="36" y="95" width="288" height="8" fill="currentColor"/>
    {/* Windows */}
    {[60,90,120,150,180,210,240,270,290].map(x => (
      <g key={x}>
        <rect x={x} y={120} width="10" height="18" rx="5" fill="rgba(10,12,16,1)"/>
        <rect x={x} y={150} width="10" height="18" rx="5" fill="rgba(10,12,16,1)"/>
      </g>
    ))}
    {/* Victoria Tower */}
    <rect x="40" y="50" width="28" height="150" fill="currentColor"/>
    <rect x="36" y="46" width="36" height="6" fill="currentColor"/>
    <polygon points="54,30 36,46 72,46" fill="currentColor"/>
    {/* Central tower */}
    <rect x="170" y="60" width="20" height="40" fill="currentColor"/>
    <polygon points="180,40 170,60 190,60" fill="currentColor"/>
  </svg>
);

const RainTexture = () => (
  <div style={{
    position:'fixed',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:0,opacity:0.012,
    backgroundImage: 'repeating-linear-gradient(100deg, transparent 0px, transparent 4px, rgba(120,140,180,.3) 4px, rgba(120,140,180,.3) 4.5px, transparent 4.5px, transparent 20px)',
    backgroundSize: '20px 100%',
  }}/>
);

const FogOverlay = () => (
  <div style={{
    position:'fixed',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:0,
    background:'radial-gradient(ellipse at 30% 50%, rgba(80,90,110,.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(60,70,90,.06) 0%, transparent 40%), linear-gradient(180deg, rgba(10,12,16,.3) 0%, transparent 30%, transparent 70%, rgba(10,12,16,.4) 100%)',
  }}/>
);

const IndexCardEdge = () => (
  <div style={{
    position:'absolute',top:0,left:0,right:0,height:'3px',
    background:'linear-gradient(90deg, rgba(180,160,120,.15) 0%, rgba(180,160,120,.25) 30%, rgba(180,160,120,.25) 70%, rgba(180,160,120,.15) 100%)',
  }}/>
);

const AgedPaperBg = () => (
  <div style={{
    position:'absolute',top:0,left:0,right:0,bottom:0,pointerEvents:'none',opacity:1,
    backgroundImage: 'radial-gradient(ellipse at 20% 30%, rgba(180,160,120,.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(160,140,100,.02) 0%, transparent 40%)',
  }}/>
);

// ── Skills ──────────────────────────────────────────────────────────────
const SKILLS = [
  'Archival Research',
  'Primary Source Analysis',
  'Material Culture Studies',
  'Oral History Methods',
  'Institutional Observation',
  'Comparative Politics',
  'Artifact Provenance',
  'Field Research Design',
];

// ── Provenance ──────────────────────────────────────────────────────────
const PROVENANCE = [
  { label: 'UK National Archives', desc: 'Kew, Richmond (Colonial Office files)' },
  { label: 'Imperial War Museum', desc: 'Lambeth Road, London' },
  { label: 'Houses of Parliament', desc: 'Palace of Westminster' },
  { label: 'British Museum', desc: 'Great Russell Street, Bloomsbury' },
  { label: 'LSE', desc: 'London School of Economics, Houghton Street' },
];

// ── Location Data ───────────────────────────────────────────────────────
const LOCATIONS = [
  {
    id: 'archives',
    num: 'I',
    name: 'UK National Archives',
    neighborhood: 'Kew, Richmond',
    icon: '\u{1F4DC}',
    subtitle: 'Primary Source Research in Colonial Files',
    overview: 'The National Archives at Kew holds over 11 million documents spanning 1,000 years of British governance. For this program, the focus was the Colonial Office records (CO series) \— the administrative correspondence between London and the Empire. These files contain the raw material of imperial governance: dispatches from governors, petitions from colonized peoples, policy debates among civil servants, and the mundane bureaucratic machinery through which a small island administered a quarter of the world\u2019s population.',
    experience: 'Assigned to research British policy in a specific colonial territory during a period of crisis, each student received a finding aid and navigated the reading room\u2019s protocols: ordering boxes by call number, handling documents with care, photographing rather than photocopying fragile originals. The Colonial Office files are organized by territory and year, but their internal logic reflects bureaucratic practice rather than historical narrative \— learning to read them requires understanding how the Colonial Office actually functioned.',
    keyFindings: [
      'Colonial files reveal the gap between official policy (public dispatches) and actual decision-making (confidential minutes and marginalia)',
      'The handwriting, paper quality, and filing annotations tell their own story about bureaucratic urgency, importance, and institutional memory',
      'Petitions from colonized subjects, often preserved alongside dismissive colonial responses, provide counter-narratives within the imperial archive itself',
      'Cross-referencing CO dispatches with War Office (WO) and Foreign Office (FO) files reveals inter-departmental conflicts invisible in any single series',
    ],
    methodology: 'Primary source paleography and archival navigation',
    researchQuestion: 'How do bureaucratic records both document and obscure the exercise of imperial power?',
  },
  {
    id: 'iwm',
    num: 'II',
    name: 'Imperial War Museum',
    neighborhood: 'Lambeth, South Bank',
    icon: '\u{1F3DB}',
    subtitle: 'Material Culture & Oral History',
    overview: 'The Imperial War Museum documents British and Commonwealth conflict from World War I to the present. Unlike a traditional archive of paper documents, the IWM\u2019s collections emphasize material culture \— uniforms, weapons, vehicles, artwork, photographs, film \— and oral testimony. The museum\u2019s sound archive holds over 33,000 recordings of veterans and civilians describing their experiences of war in their own words.',
    experience: 'The visit combined two research methodologies rarely paired in undergraduate education. First, a guided analysis of the WWI galleries focused on reading material objects as historical evidence: what does a soldier\u2019s kit reveal about logistics, class, and the industrial nature of modern warfare? Second, listening sessions with recordings from the oral history archive demonstrated how personal testimony both illuminates and complicates official narratives \— a veteran\u2019s memory of the Somme differs fundamentally from the regimental war diary\u2019s account.',
    keyFindings: [
      'Material objects carry information that written records cannot: the weight of a pack, the smell of a trench coat, the wear patterns on a rifle stock',
      'Oral histories recorded decades after events reflect how memory reshapes experience \— they are primary sources for the interview date as much as for the events described',
      'The curatorial choices that shape a museum exhibition are themselves acts of historical interpretation \— what is displayed, how it is contextualized, what is excluded',
      'The IWM\u2019s shift from celebrating imperial military achievement to documenting the human cost of conflict mirrors broader changes in British historical consciousness',
    ],
    methodology: 'Material culture analysis and oral history interpretation',
    researchQuestion: 'How do physical objects and personal testimony provide evidence that written archives cannot?',
  },
  {
    id: 'parliament',
    num: 'III',
    name: 'Houses of Parliament',
    neighborhood: 'Westminster',
    icon: '\u{1F3DB}',
    subtitle: 'Observation of Democratic Institutions',
    overview: 'The Palace of Westminster is not merely a legislative building but a living institution whose physical architecture, procedural rituals, and social customs embody 800 years of constitutional development. Observing Parliament in session \— Question Time, committee hearings, the ritual of division \— transforms abstract concepts like parliamentary sovereignty, loyal opposition, and ministerial accountability into lived practice.',
    experience: 'The visit included observation of Prime Minister\u2019s Questions from the public gallery, a tour focused on the building\u2019s constitutional symbolism (the Woolsack, the mace, the Bar of the House), and a briefing from a parliamentary clerk on legislative procedure. The contrast between the theatrical confrontation of PMQs and the patient detail of committee work revealed two distinct modes of democratic governance operating within the same institution.',
    keyFindings: [
      'The adversarial physical layout of the Commons (government and opposition facing each other across the Table) shapes political behavior \— architecture is not neutral',
      'Procedural rituals that appear archaic (the Speaker\u2019s procession, the search of the vaults) encode historical lessons about the relationship between Crown and Parliament',
      'The gap between the performative drama of PMQs and the substantive policy work of select committees reveals a fundamental tension in representative democracy between accountability theater and effective governance',
      'Westminster\u2019s influence on former colonies \— the "Westminster model" exported across the Commonwealth \— connects directly to the colonial files examined at the National Archives',
    ],
    methodology: 'Institutional ethnography and participant observation',
    researchQuestion: 'How do the physical spaces, rituals, and procedures of a legislature shape the practice of democracy?',
  },
  {
    id: 'british_museum',
    num: 'IV',
    name: 'British Museum',
    neighborhood: 'Bloomsbury',
    icon: '\u{1F3FA}',
    subtitle: 'Artifact Provenance & Repatriation Debates',
    overview: 'The British Museum holds approximately 8 million objects spanning two million years of human history. It is also one of the most contested institutions in the world. The museum\u2019s collection was largely assembled during the era of British imperial expansion, and the provenance of key objects \— the Elgin Marbles, the Benin Bronzes, the Rosetta Stone \— raises fundamental questions about ownership, cultural heritage, and the legacy of colonialism.',
    experience: 'Rather than a conventional museum visit, this session was structured as a provenance investigation. Students selected specific objects and traced their acquisition history: by whom, under what circumstances, through what legal framework, and at whose expense. The exercise revealed that the concept of "legitimate acquisition" is historically contingent \— what was legal under 19th-century imperial law may be morally indefensible by contemporary standards, but the legal framework for repatriation remains underdeveloped.',
    keyFindings: [
      'The British Museum Act of 1963 prohibits deaccessioning, creating a legal barrier to repatriation regardless of moral arguments \— the law itself becomes an object of analysis',
      'Provenance research requires tracing chains of custody across centuries, languages, and legal systems \— many acquisitions have deliberately obscured or poorly documented histories',
      'The "universal museum" argument (that major collections serve humanity by making objects accessible to global audiences) and the repatriation argument (that cultural property belongs to its community of origin) both contain genuine insights and serious blind spots',
      'The Benin Bronzes case illustrates how military conquest, diplomatic failure, art market dynamics, and postcolonial politics intersect in a single provenance question',
    ],
    methodology: 'Provenance research and ethical analysis of cultural property',
    researchQuestion: 'Who owns the past? How should contested cultural property be governed in a postcolonial world?',
  },
  {
    id: 'lse',
    num: 'V',
    name: 'London School of Economics',
    neighborhood: 'Holborn, Central London',
    icon: '\u{1F393}',
    subtitle: 'Academic Seminars & Comparative Perspectives',
    overview: 'The LSE, founded by Fabian socialists Sidney and Beatrice Webb in 1895, is one of the world\u2019s leading social science institutions. Its international student body (70%+ from outside the UK) and its tradition of politically engaged scholarship create a distinctive intellectual environment. The seminars attended during this program focused on comparative political systems, with particular attention to how British political institutions appear from non-British perspectives.',
    experience: 'Participation in LSE seminars introduced a fundamentally different pedagogical model from American undergraduate education. British-style seminars emphasize student-led discussion over professorial lecture, expect familiarity with primary texts rather than textbook summaries, and value the ability to construct and defend an argument in real time. The international composition of the seminar room meant that every discussion of "British" institutions was immediately complicated by comparison with alternative systems.',
    keyFindings: [
      'Comparative perspective reveals the contingency of institutions that seem natural from within \— the American separation of powers is not the default constitutional arrangement but one option among many',
      'The British seminar tradition demands a different kind of intellectual preparation: close reading of a few texts rather than survey coverage of many, and the capacity to engage critically rather than merely summarize',
      'LSE\u2019s international student body demonstrated that political science concepts (sovereignty, representation, legitimacy) carry different meanings in different political traditions',
      'The Fabian socialist origins of LSE are reflected in an institutional emphasis on policy relevance and social reform that contrasts with more purely academic orientations',
    ],
    methodology: 'Comparative analysis and academic seminar participation',
    researchQuestion: 'How does comparative perspective transform understanding of one\u2019s own political institutions?',
  },
];

// ── Methodology Data ────────────────────────────────────────────────────
const METHODS = [
  {
    id: 'archival',
    location: 'UK National Archives',
    name: 'Archival Research',
    icon: '\u{1F50D}',
    definition: 'The systematic examination of original documents preserved in an archive, using finding aids to locate relevant records and paleographic skills to read handwritten or damaged texts. Archival research privileges primary sources over secondary interpretation.',
    steps: [
      'Identify the archive and record series relevant to the research question using published guides and catalog searches',
      'Navigate the archive\u2019s access protocols: reader\u2019s ticket, document ordering system, reading room rules, handling requirements',
      'Read documents in their original order, noting how filing systems reflect institutional logic rather than narrative chronology',
      'Cross-reference documents across series (e.g., CO dispatches with WO intelligence files) to build a multi-perspectival account',
      'Assess documents for bias, omission, and the distinction between what they record and what they reveal',
    ],
    strengths: 'Provides direct access to historical actors\u2019 own words, decisions, and institutional practices. Enables discoveries that cannot be made from published secondary sources.',
    limitations: 'Archives preserve what institutions chose to keep \— they systematically underrepresent marginalized voices. Archival research is time-intensive and requires specialized skills (paleography, language, institutional knowledge).',
    transferable: 'The archival method\u2019s emphasis on evaluating sources for bias, reading context as carefully as content, and distinguishing evidence from interpretation transfers directly to any form of research that relies on documentary evidence.',
  },
  {
    id: 'material',
    location: 'Imperial War Museum',
    name: 'Material Culture Analysis',
    icon: '\u{1F9F0}',
    definition: 'The study of physical objects as historical evidence. Material culture analysis reads artifacts the way textual analysis reads documents \— examining form, function, manufacture, use-wear, and context to reconstruct the lives and practices of the people who made and used them.',
    steps: [
      'Describe the object precisely: dimensions, materials, construction technique, condition, markings, evidence of use or modification',
      'Contextualize the object within its production system: who made it, with what technology, under what economic conditions?',
      'Analyze the object\u2019s function and use: what was it designed to do, and does use-wear evidence confirm or complicate that design intent?',
      'Interpret the object\u2019s cultural meaning: what did it signify to its users, and how has that significance changed over time?',
      'Compare with related objects to identify patterns, variations, and changes across time and space',
    ],
    strengths: 'Objects provide evidence about aspects of life \— sensory experience, embodied practice, material conditions \— that written sources rarely capture. Material evidence is less susceptible to the biases of literate elites.',
    limitations: 'Objects are often decontextualized by collection and display. Without provenance information, an artifact\u2019s meaning is radically reduced. Interpretation is inherently speculative when textual corroboration is absent.',
    transferable: 'Material culture analysis develops close observation skills applicable to any field that requires reading non-textual evidence: design, forensics, archaeology, even code review (where the "artifact" is a software system).',
  },
  {
    id: 'ethnographic',
    location: 'Houses of Parliament',
    name: 'Institutional Ethnography',
    icon: '\u{1F3DB}',
    definition: 'The systematic observation of institutions as lived social systems. Institutional ethnography studies not what an organization officially claims to do (its charter, its rules, its public statements) but what it actually does \— its informal norms, power dynamics, spatial arrangements, and ritual practices.',
    steps: [
      'Observe the physical environment: how space is organized, who occupies which positions, what the architecture enables and constrains',
      'Document rituals and procedures: both formal (rules of order, ceremonial acts) and informal (conventions, unwritten norms)',
      'Identify the gap between official function and actual practice: where do formal rules fail to describe what really happens?',
      'Interview participants to understand their subjective experience of the institution\u2019s routines and constraints',
      'Analyze how institutional design shapes behavior: does the architecture of the Commons create adversarial politics, or reflect a pre-existing adversarial culture?',
    ],
    strengths: 'Reveals the tacit knowledge and informal practices that formal rules and organizational charts miss. Captures how institutions actually function as social systems.',
    limitations: 'Observer bias is inherent \— what you notice depends on what you expect. Brief observation (as in a study abroad visit) provides snapshots, not the deep immersion that proper ethnography requires.',
    transferable: 'The ethnographic habit of observing how environments shape behavior is invaluable in any organizational context \— from corporate culture analysis to user experience research.',
  },
  {
    id: 'provenance',
    location: 'British Museum',
    name: 'Provenance Research',
    icon: '\u{1F50E}',
    definition: 'The investigation of an object\u2019s ownership history from creation to present. Provenance research traces chains of custody, evaluates the legality and ethics of transfers, and situates individual objects within broader patterns of cultural exchange, imperial extraction, and market dynamics.',
    steps: [
      'Document the object\u2019s current location, catalog number, and institutional acquisition record',
      'Trace the ownership chain backward: purchase records, donation documents, auction catalogs, expedition reports',
      'Identify gaps in the chain where ownership is unknown, contested, or deliberately obscured',
      'Evaluate each transfer against the legal framework of its time and against contemporary ethical standards',
      'Assess the object\u2019s significance to its community of origin and the implications of its current location',
    ],
    strengths: 'Reveals the material and political dimensions of cultural heritage. Connects individual objects to systemic patterns of imperial extraction and art market dynamics.',
    limitations: 'Documentation is often incomplete, especially for objects acquired during colonial warfare or through informal market networks. Provenance gaps may be impossible to close definitively.',
    transferable: 'The provenance method\u2019s emphasis on tracing chains of custody and evaluating claims of legitimate ownership transfers directly to intellectual property law, data governance, and supply chain ethics.',
  },
  {
    id: 'comparative',
    location: 'London School of Economics',
    name: 'Comparative Analysis',
    icon: '\u{1F310}',
    definition: 'The systematic comparison of political institutions, practices, and outcomes across different countries or systems. Comparative analysis uses variation \— the fact that different societies have organized politics differently \— to test causal claims and reveal the contingency of arrangements that seem natural from within.',
    steps: [
      'Select cases for comparison based on research design: most-similar systems (isolate key differences) or most-different systems (identify common patterns)',
      'Identify the variables to compare: institutional structures, policy outcomes, political behaviors, cultural norms',
      'Control for confounding factors: what alternative explanations must be ruled out?',
      'Analyze whether observed differences are caused by institutional variation or by other factors (history, culture, economics)',
      'Draw conclusions about the generalizability of findings: does this pattern hold across cases, or is it case-specific?',
    ],
    strengths: 'Reveals that familiar institutions are not inevitable \— other societies have made different choices. Provides a quasi-experimental method for testing causal claims about political institutions.',
    limitations: 'True controlled comparison is impossible in political science \— countries differ in too many ways to isolate single variables. Selection bias (choosing cases that confirm a hypothesis) is a persistent risk.',
    transferable: 'Comparative thinking \— the habit of asking "how does this work elsewhere?" \— is foundational to any analytical discipline. It prevents parochialism and reveals the contingency of arrangements that appear natural.',
  },
];

// ── Reflections Data ────────────────────────────────────────────────────
const REFLECTIONS = [
  {
    id: 'ref_archives',
    location: 'National Archives',
    title: 'The Archive Is Not Neutral',
    reflection: 'The most important lesson of archival research is that archives are not neutral repositories of facts. They are instruments of power. The Colonial Office files at Kew were created by a bureaucracy to serve administrative purposes \— they record what the colonial state chose to document, in the language it chose to use, organized according to its institutional priorities. What is absent from the archive is as significant as what is present. Indigenous voices appear primarily when they addressed the colonial administration in terms the administration recognized. The informal, the oral, the vernacular \— these were systematically excluded.',
    lesson: 'Every source has a perspective. The historian\u2019s task is not to find the "objective" record but to understand whose perspective each source reflects, what interests shaped its creation, and what silences it contains. This applies equally to government statistics, corporate reports, and social media data.',
  },
  {
    id: 'ref_iwm',
    location: 'Imperial War Museum',
    title: 'Objects Have Stories That Documents Cannot Tell',
    reflection: 'Holding a WWI-era trench periscope \— feeling its weight, understanding the cramped conditions in which it was used, seeing the scratches from constant handling \— communicates something about trench warfare that no written description fully conveys. The oral history recordings added another dimension: a veteran describing the sound of an artillery barrage carries emotional truth that the regimental war diary\u2019s clinical notation ("heavy shelling, 0400\u20130600") cannot. The combination of material evidence and personal testimony creates a form of historical understanding that is experiential rather than merely analytical.',
    lesson: 'Different forms of evidence illuminate different dimensions of experience. Text-based research, for all its rigor, is inherently limited to what language can express. Material culture and oral testimony access the embodied, sensory, and emotional dimensions of historical life that documents miss.',
  },
  {
    id: 'ref_parliament',
    location: 'Houses of Parliament',
    title: 'Institutions Are Lived, Not Just Designed',
    reflection: 'Reading about parliamentary sovereignty in a textbook is one thing; watching MPs file through the division lobbies while the Speaker counts votes is another. The theatrical aggression of PMQs \— the shouting, the performative outrage, the Speaker\u2019s repeated calls for order \— looks dysfunctional until you understand it as accountability theater: the opposition\u2019s job is to make the government publicly defend every decision, under adversarial conditions, in real time. The contrast with the quiet, evidence-driven work of select committees reveals that "democracy" is not one process but many, operating at different registers within the same institution.',
    lesson: 'Institutions cannot be fully understood from their rules and organizational charts. How they function in practice \— the informal norms, the spatial dynamics, the performative dimensions \— is as important as their formal design. Observing institutions in action develops a kind of political intelligence that no amount of reading can substitute.',
  },
  {
    id: 'ref_museum',
    location: 'British Museum',
    title: 'Ownership Is a Political Question',
    reflection: 'The British Museum provenance exercise forced a confrontation with the materiality of empire. These are not abstract debates about colonialism \— they are arguments about specific objects, acquired by specific people, under specific circumstances, now held in a specific institution governed by specific laws. The Benin Bronzes were looted during a punitive military expedition in 1897. The Elgin Marbles were removed under a permit from the Ottoman authorities who then controlled Greece. Each case is different, but each forces the same question: by what right does one society hold another\u2019s cultural heritage?',
    lesson: 'Questions of cultural property are never purely legal or purely moral \— they are irreducibly political, involving competing claims about history, identity, and the distribution of cultural resources in a postcolonial world. The provenance researcher must hold legal, ethical, and political analysis in productive tension.',
  },
  {
    id: 'ref_lse',
    location: 'London School of Economics',
    title: 'Comparison Dissolves Parochialism',
    reflection: 'The single most transformative intellectual experience of the London program was the discovery that American political arrangements \— separation of powers, federalism, judicial review, a written constitution \— are not the default settings of democracy. They are one set of choices among many, made for historically specific reasons, with distinctive strengths and weaknesses that become visible only when placed alongside alternatives. British parliamentary sovereignty, German constitutional courts, Scandinavian corporatism \— each system embodies a different theory of representation, legitimacy, and the proper relationship between state and society.',
    lesson: 'Comparative thinking is not just an academic method \— it is a habit of mind that prevents the assumption that one\u2019s own experience is universal. This applies far beyond political science: in any field, the question "how do others do this?" reveals assumptions that are otherwise invisible.',
  },
];

// ── Archive Facsimile Data ──────────────────────────────────────────────
const ARCHIVE_DOCS = [
  {
    id: 'colonial_memo',
    title: 'Colonial Office Memorandum (1954)',
    source: 'UK National Archives, Kew',
    series: 'CO 822/801',
    reveal: {
      heading: 'What This Document Reveals',
      content: 'The Colonial Office memorandum on the Kenya Emergency exposes the gap between public rhetoric and private policy. While publicly describing operations as "restoring order," internal minutes reveal debates about collective punishment, forced resettlement of over a million Kikuyu, and the systematic use of detention without trial. The marginalia shows that senior officials were aware of reports of abuse in the pipeline camps but chose to manage the information rather than halt the practices. This document demonstrates why archival research requires reading not just the main text but the annotations, cross-references, and filing decisions that reveal institutional knowledge versus institutional action.',
    },
  },
  {
    id: 'oral_history',
    title: 'Oral History Interview Extract (1985)',
    source: 'Imperial War Museum Sound Archive',
    series: 'Catalogue No. 9472',
    reveal: {
      heading: 'What Oral History Reveals',
      content: 'Oral history methodology captures dimensions of experience that official archives systematically exclude. The veteran\'s testimony about service in Kenya contradicts the official narrative on multiple points: the daily reality of counterinsurgency operations, the moral ambiguity experienced by soldiers carrying out orders they questioned, and the long psychological aftermath that no operational report documents. Recorded thirty years after the events, the testimony also reveals how memory reconstructs experience over time, shaped by subsequent public discourse about the Emergency. The interview is simultaneously a source for 1950s Kenya and for 1980s Britain\'s evolving relationship with its imperial past.',
    },
  },
  {
    id: 'hansard',
    title: 'Parliamentary Debate, Hansard (1956)',
    source: 'Houses of Parliament',
    series: 'HC Deb vol 548 cc1159-1230',
    reveal: {
      heading: 'What Parliamentary Debate Reveals',
      content: 'The Hansard record of the 1956 Kenya debate reveals the domestic political dynamics of late empire. Labour backbenchers used reports of detention camp abuses to attack the Conservative government, but their critique was constrained by their own party\'s complicity in earlier colonial policies. The interjections recorded in brackets capture the emotional temperature of the chamber in ways that formal speeches cannot. Conservative members invoked "security" and "civilization" to deflect scrutiny; Labour members invoked "British values" to demand accountability. Both sides operated within a shared imperial framework that would not be fundamentally questioned for another decade. The debate reveals how parliamentary procedure structures the terms of political contestation.',
    },
  },
];

// ── Scholarly Micro-Content Tooltips ─────────────────────────────────
const LONDON_TIPS = {
  national_archives: "The UK National Archives at Kew holds over 1,000 years of government records \u2014 approximately 11 million documents spanning from the Domesday Book (1086) to recently declassified intelligence files. The 30-year rule (reduced to 20 years in 2013) means files are released in annual waves, creating periodic revelations about Cold War intelligence operations, colonial administration decisions, and the internal deliberations of government that were hidden from public view for decades. Each January release generates headlines as historians discover what officials actually said in private versus what they claimed in public.",
  oral_history: "Oral history methodology requires the interviewer to understand that memory is reconstructive, not reproductive \u2014 witnesses do not replay events like a recording; they reconstruct them through present-day cognitive frameworks, subsequent experiences, and cultural narratives absorbed over the intervening years. A 2015 Imperial War Museum interview about events in 1944 contains both the 1944 experience and 70 years of subsequent meaning-making. The historian's task is not to strip away the later layers to find the 'true' memory but to understand how the act of remembering itself is historically significant. What a veteran chooses to emphasize decades later reveals as much about the present as the past.",
  hansard: "Hansard, the official record of UK parliamentary debates, is described as 'substantially verbatim' but is not word-for-word \u2014 editors smooth grammar, remove false starts and interruptions, and occasionally restructure sentences for clarity. The gap between what was actually said on the floor and what Hansard records is itself a research subject in parliamentary studies. Comparing Hansard to contemporary newspaper accounts of the same debate reveals systematic editorial choices: heated exchanges are cooled, profanity is omitted, and the messiness of real political argument is polished into readable prose. The 'official record' is itself an interpretation.",
};

// ── Component ───────────────────────────────────────────────────────────
function LondonView({ setView }) {
  const [mode, setMode] = useState('locations');
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [expandedMethod, setExpandedMethod] = useState(null);
  const [expandedReflection, setExpandedReflection] = useState(null);
  const [revealedFindings, setRevealedFindings] = useState({});
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [tipId, setTipId] = useState(null);
  const [methodQuestion, setMethodQuestion] = useState('');
  const [methodRecommendation, setMethodRecommendation] = useState(null);
  const [sourceDoc, setSourceDoc] = useState(0);
  const [sourceAnswers, setSourceAnswers] = useState({});
  const [sourceRevealed, setSourceRevealed] = useState({});
  const topRef = useRef(null);

  // ── Scholarly Micro-Icons & Tooltip ──────────────────────────
  function Tip({ id }) {
    if (tipId !== id || !LONDON_TIPS[id]) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(8,9,12,.92)', border: '1px solid ' + C.accent + '25', borderRadius: 3, maxWidth: 440, fontSize: 11, fontFamily: Mono, color: C.tx2, lineHeight: 1.65, margin: '6px 0 10px' }}>
        {LONDON_TIPS[id]}
      </div>
    );
  }

  const ArchiveIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='national_archives'?null:'national_archives')}>
      <rect x="3" y="4" width="16" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <rect x="5" y="8" width="12" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <rect x="8" y="11" width="6" height="3" rx=".5" fill="none" stroke="currentColor" strokeWidth=".5"/>
      <line x1="11" y1="12" x2="11" y2="13" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const MicrophoneIcon = () => (
    <svg width="20" height="24" viewBox="0 0 20 24" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='oral_history'?null:'oral_history')}>
      <rect x="7" y="2" width="6" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <path d="M4 10 Q4 18 10 18 Q16 18 16 10" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <line x1="10" y1="18" x2="10" y2="22" stroke="currentColor" strokeWidth=".6"/>
      <line x1="6" y1="22" x2="14" y2="22" stroke="currentColor" strokeWidth=".6"/>
    </svg>
  );

  const HansardIcon = () => (
    <svg width="24" height="22" viewBox="0 0 24 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='hansard'?null:'hansard')}>
      <path d="M4 2 L12 2 L12 20 L4 20 Z" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <path d="M12 2 L20 2 L20 20 L12 20 Z" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <line x1="6" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth=".3"/>
      <line x1="6" y1="9" x2="10" y2="9" stroke="currentColor" strokeWidth=".3"/>
      <line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth=".3"/>
      <line x1="14" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth=".3"/>
      <line x1="14" y1="9" x2="18" y2="9" stroke="currentColor" strokeWidth=".3"/>
      <line x1="14" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth=".3"/>
    </svg>
  );

  const toggleFindings = useCallback((id) => {
    setRevealedFindings(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleMethod = useCallback((id) => {
    setExpandedMethod(prev => prev === id ? null : id);
  }, []);

  const toggleReflection = useCallback((id) => {
    setExpandedReflection(prev => prev === id ? null : id);
  }, []);

  const revealedCount = useMemo(
    () => Object.values(revealedFindings).filter(Boolean).length,
    [revealedFindings],
  );

  const handleDocClick = useCallback((docId) => {
    setSelectedDoc(prev => prev === docId ? null : docId);
  }, []);

  // ── Mode Switch ─────────────────────────────────────────────────────
  const ModeSwitch = useCallback(() => {
    const modes = [
      { id: 'locations', label: 'Locations', desc: '5 Research Sites' },
      { id: 'methods', label: 'Methods', desc: '5 Methodologies' },
      { id: 'reflections', label: 'Reflections', desc: 'Lessons Learned' },
      { id: 'archive', label: 'Archive', desc: '3 Facsimiles' },
      { id: 'method', label: 'Method Tool', desc: 'Compare & Recommend' },
      { id: 'source', label: 'Source Criticism', desc: 'Evaluate Sources' },
    ];
    return (
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, flexWrap: 'wrap' }}>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: '1 1 auto', padding: '10px 12px', borderRadius: 4, cursor: 'pointer',
              background: mode === m.id ? C.accentBg : 'transparent',
              border: mode === m.id ? '1px solid ' + C.accentDm : '1px solid ' + C.line,
              textAlign: 'center', transition: 'all .15s ease',
            }}
          >
            <span style={{
              fontFamily: Mono, fontSize: 11, fontWeight: 600,
              color: mode === m.id ? C.accent : C.tx3, display: 'block',
            }}>
              {m.label}
            </span>
            <span style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{m.desc}</span>
          </button>
        ))}
      </div>
    );
  }, [mode]);

  // ── Locations Renderer ──────────────────────────────────────────────
  const renderLocations = useCallback(() => {
    const loc = LOCATIONS[selectedLocation];
    const isRevealed = revealedFindings[loc.id];
    return (
      <div>
        {/* Location selector */}
        <div style={{
          display: 'flex', gap: 3, marginBottom: 20, overflowX: 'auto',
          paddingBottom: 4,
        }}>
          {LOCATIONS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => setSelectedLocation(i)}
              style={{
                flex: '0 0 auto', padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
                background: i === selectedLocation ? C.accentBg : 'transparent',
                border: i === selectedLocation
                  ? '1px solid ' + C.accentDm
                  : '1px solid ' + C.line,
                transition: 'all .12s ease', whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 12, fontWeight: 600,
                color: i === selectedLocation ? C.accent : C.tx3,
                display: 'block',
              }}>
                {l.num}. {l.name}
              </span>
              <span style={{
                fontFamily: Sans, fontSize: 10.5, color: C.tx3,
              }}>
                {l.neighborhood}
              </span>
            </button>
          ))}
        </div>

        {/* Location card */}
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 10, overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid ' + C.line }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
              <span style={{
                fontSize: 26, width: 48, height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: C.accentBg, borderRadius: 8,
                border: '1px solid ' + C.line, flexShrink: 0,
              }}>
                {loc.icon}
              </span>
              <div>
                <div style={{
                  fontFamily: Serif, fontSize: 22, fontWeight: 700,
                  color: C.tx, letterSpacing: '-.02em',
                }}>
                  {loc.name}
                </div>
                <div style={{
                  fontFamily: Mono, fontSize: 12, color: C.tx3, letterSpacing: '.04em',
                }}>
                  {loc.neighborhood} {'\—'} Spring 2012
                </div>
              </div>
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 15, color: C.accent, fontStyle: 'italic',
            }}>
              {loc.subtitle}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '20px 24px' }}>
            {/* Overview */}
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.accentDm, marginBottom: 8,
            }}>
              SITE OVERVIEW
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
              marginBottom: 20,
            }}>
              {loc.overview}
            </div>

            {/* Experience */}
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.tx3, marginBottom: 8,
            }}>
              RESEARCH EXPERIENCE
            </div>
            <div style={{
              fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.7,
              marginBottom: 20,
            }}>
              {loc.experience}
            </div>

            {/* Research question */}
            <div style={{
              background: 'rgba(80,96,128,.05)', borderRadius: 6,
              padding: '14px 18px', borderLeft: '3px solid ' + C.accent,
              marginBottom: 20,
            }}>
              <div style={{
                fontFamily: Mono, fontSize: 11, color: C.accentDm,
                letterSpacing: '.06em', marginBottom: 4,
              }}>
                RESEARCH QUESTION
              </div>
              <div style={{
                fontFamily: Serif, fontSize: 14, color: C.gold,
                lineHeight: 1.7, fontStyle: 'italic',
              }}>
                {loc.researchQuestion}
              </div>
            </div>

            {/* Key findings — reveal toggle */}
            <button
              onClick={() => toggleFindings(loc.id)}
              style={{
                width: '100%', padding: '14px 18px', borderRadius: 6, cursor: 'pointer',
                background: isRevealed ? C.accentBg : 'transparent',
                border: '1px solid ' + (isRevealed ? C.accentDm : C.line),
                textAlign: 'left', marginBottom: 16,
                transition: 'all .15s ease',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
                color: isRevealed ? C.accent : C.tx3,
              }}>
                {isRevealed ? '\▼' : '\u25B6'} KEY FINDINGS
              </span>
            </button>

            {isRevealed && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                {loc.keyFindings.map((f, i) => (
                  <li key={i} style={{
                    fontFamily: Sans, fontSize: 12, color: C.tx2,
                    lineHeight: 1.65, padding: '6px 0 6px 16px',
                    borderLeft: '2px solid ' + C.line,
                    marginBottom: 6,
                  }}>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* Methodology tag */}
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.tx3, marginBottom: 6,
            }}>
              METHODOLOGY
            </div>
            <span style={{
              fontFamily: Sans, fontSize: 11, padding: '4px 12px', borderRadius: 3,
              background: C.accentBg, color: C.tx2,
              border: '1px solid ' + C.line,
            }}>
              {loc.methodology}
            </span>
          </div>
        </div>

        {/* Navigation arrows */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 16,
        }}>
          <button
            onClick={() => setSelectedLocation(Math.max(0, selectedLocation - 1))}
            disabled={selectedLocation === 0}
            style={{
              padding: '8px 16px', borderRadius: 4, cursor: selectedLocation === 0 ? 'default' : 'pointer',
              background: 'transparent', border: '1px solid ' + C.line,
              color: selectedLocation === 0 ? C.tx3 : C.tx2,
              fontFamily: Mono, fontSize: 11, opacity: selectedLocation === 0 ? 0.4 : 1,
            }}
          >
            {'\←'} {selectedLocation > 0 ? LOCATIONS[selectedLocation - 1].name : 'Previous'}
          </button>
          <button
            onClick={() => setSelectedLocation(Math.min(4, selectedLocation + 1))}
            disabled={selectedLocation === 4}
            style={{
              padding: '8px 16px', borderRadius: 4, cursor: selectedLocation === 4 ? 'default' : 'pointer',
              background: 'transparent', border: '1px solid ' + C.line,
              color: selectedLocation === 4 ? C.tx3 : C.tx2,
              fontFamily: Mono, fontSize: 11, opacity: selectedLocation === 4 ? 0.4 : 1,
            }}
          >
            {selectedLocation < 4 ? LOCATIONS[selectedLocation + 1].name : 'Next'} {'\→'}
          </button>
        </div>
      </div>
    );
  }, [selectedLocation, revealedFindings, toggleFindings]);

  // ── Methods Renderer ────────────────────────────────────────────────
  const renderMethods = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          RESEARCH METHODOLOGIES {'\—'} ONE PER SITE
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          Each London research site introduced a distinct methodology for engaging with historical evidence. Together, these five approaches form a toolkit for understanding the past through multiple forms of evidence {'\—'} textual, material, observational, forensic, and comparative.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <MicrophoneIcon /><Tip id="oral_history" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {METHODS.map(m => {
            const isOpen = expandedMethod === m.id;
            return (
              <div
                key={m.id}
                style={{
                  background: C.card,
                  border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
                  borderRadius: 8, overflow: 'hidden',
                  transition: 'border-color .15s ease',
                }}
              >
                <button
                  onClick={() => toggleMethod(m.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 22, width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.accentBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                  }}>
                    {m.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 16, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {m.name}
                    </div>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, color: C.tx3,
                      letterSpacing: '.04em',
                    }}>
                      {m.location}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: Mono, fontSize: 14, color: C.tx3,
                    transition: 'transform .15s ease',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                  }}>
                    {'\u25B6'}
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px',
                    borderTop: '1px solid ' + C.line,
                    paddingTop: 16,
                  }}>
                    {/* Definition */}
                    <div style={{
                      fontFamily: Serif, fontSize: 14, color: C.tx,
                      lineHeight: 1.75, marginBottom: 16,
                    }}>
                      {m.definition}
                    </div>

                    {/* Steps */}
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.tx3, marginBottom: 8,
                    }}>
                      PROCEDURAL STEPS
                    </div>
                    <ol style={{
                      listStyle: 'none', padding: 0, margin: '0 0 16px', counterReset: 'step',
                    }}>
                      {m.steps.map((s, i) => (
                        <li key={i} style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx2,
                          lineHeight: 1.65, padding: '4px 0 4px 16px',
                          borderLeft: '2px solid ' + C.line,
                          marginBottom: 4, display: 'flex', gap: 8,
                        }}>
                          <span style={{
                            fontFamily: Mono, fontSize: 12, color: C.accentDm,
                            flexShrink: 0, width: 16, textAlign: 'right',
                          }}>
                            {i + 1}.
                          </span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ol>

                    {/* Strengths & limitations */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                      <div style={{
                        flex: '1 1 280px', background: C.greenBg, borderRadius: 6,
                        padding: '12px 16px', border: '1px solid ' + C.line,
                      }}>
                        <div style={{
                          fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                          color: C.greenDm, marginBottom: 6,
                        }}>
                          STRENGTHS
                        </div>
                        <div style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.65,
                        }}>
                          {m.strengths}
                        </div>
                      </div>
                      <div style={{
                        flex: '1 1 280px', background: C.redBg, borderRadius: 6,
                        padding: '12px 16px', border: '1px solid ' + C.line,
                      }}>
                        <div style={{
                          fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                          color: C.redDm, marginBottom: 6,
                        }}>
                          LIMITATIONS
                        </div>
                        <div style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.65,
                        }}>
                          {m.limitations}
                        </div>
                      </div>
                    </div>

                    {/* Transferable */}
                    <div style={{
                      background: C.accentBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.accentDm, marginBottom: 6,
                      }}>
                        TRANSFERABLE INSIGHT
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.gold, lineHeight: 1.7,
                      }}>
                        {m.transferable}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [expandedMethod, toggleMethod]);

  // ── Reflections Renderer ────────────────────────────────────────────
  const renderReflections = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          REFLECTIONS {'\—'} WHAT EACH SITE TAUGHT ABOUT HISTORICAL RESEARCH
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          The London program was not primarily about content {'\—'} it was about method. Each site demonstrated a different way of engaging with historical evidence, and each left a distinct lesson about what it means to study the past responsibly and rigorously.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <HansardIcon /><Tip id="hansard" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {REFLECTIONS.map(r => {
            const isOpen = expandedReflection === r.id;
            return (
              <div
                key={r.id}
                style={{
                  background: C.card,
                  border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
                  borderRadius: 8, overflow: 'hidden',
                  transition: 'border-color .15s ease',
                }}
              >
                <button
                  onClick={() => toggleReflection(r.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 16, width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.tealBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                    fontFamily: Mono, color: C.teal,
                  }}>
                    {'\u270E'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 15, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {r.title}
                    </div>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, color: C.tx3,
                      letterSpacing: '.04em', marginTop: 2,
                    }}>
                      {r.location}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: Mono, fontSize: 14, color: C.tx3,
                    transition: 'transform .15s ease',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                  }}>
                    {'\u25B6'}
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px',
                    borderTop: '1px solid ' + C.line,
                    paddingTop: 16,
                  }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 14, color: C.tx,
                      lineHeight: 1.75, marginBottom: 16,
                    }}>
                      {r.reflection}
                    </div>

                    <div style={{
                      background: C.tealBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.tealDm, marginBottom: 6,
                      }}>
                        LASTING LESSON
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.gold, lineHeight: 1.7,
                      }}>
                        {r.lesson}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [expandedReflection, toggleReflection]);

  // ── Archive Facsimile Renderer ──────────────────────────────────────
  const renderArchive = useCallback(() => {
    const selDoc = selectedDoc ? ARCHIVE_DOCS.find(d => d.id === selectedDoc) : null;

    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          ARCHIVAL FACSIMILES {'\—'} THREE PRIMARY SOURCES
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 24, maxWidth: 720,
        }}>
          Each document below is a stylized rendering of the type of primary source encountered at three London research sites. Click any document to reveal what it teaches about historical methodology and the limits of official records.
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }}>

          {/* ── Document 1: Colonial Office Memorandum ── */}
          <div
            onClick={() => handleDocClick('colonial_memo')}
            style={{ cursor: 'pointer', transition: 'transform .15s ease', transform: selectedDoc === 'colonial_memo' ? 'scale(1.02)' : 'scale(1)' }}
          >
            <svg width="300" height="400" viewBox="0 0 300 400" style={{ display: 'block' }}>
              <defs>
                {/* Aged paper noise texture */}
                <filter id="paper-noise-1">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="2" result="noise" />
                  <feColorMatrix type="saturate" values="0" in="noise" result="gray-noise" />
                  <feComponentTransfer in="gray-noise" result="faded-noise">
                    <feFuncA type="linear" slope="0.06" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="SourceGraphic" />
                    <feMergeNode in="faded-noise" />
                  </feMerge>
                </filter>
                {/* Worn edge effect */}
                <filter id="worn-edge-1">
                  <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="3" seed="5" result="warp" />
                  <feDisplacementMap in="SourceGraphic" in2="warp" scale="3" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>

              {/* Paper background */}
              <rect x="4" y="4" width="292" height="392" rx="2" ry="2"
                fill="#e8e0d0" filter="url(#paper-noise-1)" />

              {/* Subtle shadow for depth */}
              <rect x="4" y="4" width="292" height="392" rx="2" ry="2"
                fill="none" stroke="rgba(80,60,40,.2)" strokeWidth="1" />

              {/* Coffee stain */}
              <circle cx="230" cy="320" r="35" fill="rgba(120,80,40,.08)" />
              <circle cx="232" cy="318" r="30" fill="rgba(100,65,30,.06)" />
              <circle cx="228" cy="322" r="25" fill="rgba(90,55,25,.04)" />

              {/* TOP SECRET stamp — rotated */}
              <g transform="translate(180, 50) rotate(-12)">
                <rect x="-60" y="-14" width="120" height="28" rx="3" ry="3"
                  fill="none" stroke="#8b1a1a" strokeWidth="2.5" opacity="0.7" />
                <text x="0" y="5" textAnchor="middle" fill="#8b1a1a" fontSize="14"
                  fontFamily="'Courier New',monospace" fontWeight="900" opacity="0.7" letterSpacing="3">
                  TOP SECRET
                </text>
              </g>

              {/* Document header */}
              <text x="20" y="40" fill="#2a2018" fontSize="8" fontFamily="'Courier New',monospace" opacity="0.5">
                CO 822/801
              </text>

              {/* Typed header text */}
              <text x="20" y="90" fill="#1a1410" fontSize="9" fontFamily="'Courier New',monospace" fontWeight="700">
                COLONIAL OFFICE
              </text>
              <line x1="20" y1="95" x2="140" y2="95" stroke="#1a1410" strokeWidth="0.5" opacity="0.4" />

              <text x="20" y="115" fill="#2a2018" fontSize="8" fontFamily="'Courier New',monospace">
                SECRET
              </text>

              <text x="20" y="140" fill="#1a1410" fontSize="8.5" fontFamily="'Courier New',monospace" fontWeight="600">
                MEMORANDUM on the Emergency
              </text>
              <text x="20" y="155" fill="#1a1410" fontSize="8.5" fontFamily="'Courier New',monospace" fontWeight="600">
                in Kenya
              </text>

              <text x="20" y="178" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                Date: 14 March 1954
              </text>
              <text x="20" y="190" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                From: Secretary of State for the Colonies
              </text>
              <text x="20" y="202" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                To: Governor of Kenya (Sir E. Baring)
              </text>

              {/* Typed body text */}
              <text x="20" y="226" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace" opacity="0.8">
                1. HMG has reviewed the security situation
              </text>
              <text x="20" y="238" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace" opacity="0.8">
                in Kenya following receipt of dispatches
              </text>
              <text x="20" y="250" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace" opacity="0.8">
                Nos. 47-52 and the Governor's telegram of
              </text>
              <text x="20" y="262" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace" opacity="0.8">
                8 March regarding Operation Anvil.
              </text>
              <text x="20" y="280" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace" opacity="0.8">
                2. The detention programme must be reviewed
              </text>
              <text x="20" y="292" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace" opacity="0.8">
                in light of recent representations...
              </text>

              {/* Handwritten marginalia */}
              <text x="145" y="260" fill="#1a3a6a" fontSize="7.5"
                fontFamily="'Segoe Script','Brush Script MT',cursive" fontStyle="italic"
                transform="rotate(-3, 145, 260)" opacity="0.65">
                See para 7 -- contradicts
              </text>
              <text x="145" y="274" fill="#1a3a6a" fontSize="7.5"
                fontFamily="'Segoe Script','Brush Script MT',cursive" fontStyle="italic"
                transform="rotate(-2, 145, 274)" opacity="0.65">
                Baring's earlier assessment
              </text>

              {/* File stamp at bottom */}
              <rect x="20" y="350" width="80" height="30" rx="2" ry="2"
                fill="none" stroke="#3a3a5a" strokeWidth="1" opacity="0.3" />
              <text x="60" y="365" textAnchor="middle" fill="#3a3a5a" fontSize="6"
                fontFamily="'Courier New',monospace" opacity="0.4">
                RECEIVED
              </text>
              <text x="60" y="375" textAnchor="middle" fill="#3a3a5a" fontSize="5.5"
                fontFamily="'Courier New',monospace" opacity="0.4">
                18 MAR 1954
              </text>

              {/* Highlight border on selection */}
              {selectedDoc === 'colonial_memo' && (
                <rect x="2" y="2" width="296" height="396" rx="3" ry="3"
                  fill="none" stroke={C.gold} strokeWidth="2" opacity="0.6" />
              )}
            </svg>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <div style={{ fontFamily: Mono, fontSize: 12, color: C.gold, fontWeight: 600 }}>Colonial Office Memorandum</div>
              <div style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>National Archives, Kew</div>
            </div>
          </div>

          {/* ── Document 2: Oral History Interview ── */}
          <div
            onClick={() => handleDocClick('oral_history')}
            style={{ cursor: 'pointer', transition: 'transform .15s ease', transform: selectedDoc === 'oral_history' ? 'scale(1.02)' : 'scale(1)' }}
          >
            <svg width="300" height="400" viewBox="0 0 300 400" style={{ display: 'block' }}>
              <defs>
                <filter id="paper-noise-2">
                  <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" seed="7" result="noise" />
                  <feColorMatrix type="saturate" values="0" in="noise" result="gray-noise" />
                  <feComponentTransfer in="gray-noise" result="faded-noise">
                    <feFuncA type="linear" slope="0.05" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="SourceGraphic" />
                    <feMergeNode in="faded-noise" />
                  </feMerge>
                </filter>
              </defs>

              {/* Paper background */}
              <rect x="4" y="4" width="292" height="392" rx="2" ry="2"
                fill="#e4ddd0" filter="url(#paper-noise-2)" />
              <rect x="4" y="4" width="292" height="392" rx="2" ry="2"
                fill="none" stroke="rgba(80,60,40,.15)" strokeWidth="1" />

              {/* Cassette tape icon */}
              <g transform="translate(150, 42)">
                <rect x="-45" y="-18" width="90" height="36" rx="5" ry="5"
                  fill="none" stroke="#4a3a2a" strokeWidth="1.5" opacity="0.5" />
                <circle cx="-18" cy="0" r="8" fill="none" stroke="#4a3a2a" strokeWidth="1" opacity="0.4" />
                <circle cx="18" cy="0" r="8" fill="none" stroke="#4a3a2a" strokeWidth="1" opacity="0.4" />
                <circle cx="-18" cy="0" r="3" fill="#4a3a2a" opacity="0.3" />
                <circle cx="18" cy="0" r="3" fill="#4a3a2a" opacity="0.3" />
                <rect x="-12" y="10" width="24" height="4" rx="1" ry="1"
                  fill="#4a3a2a" opacity="0.2" />
              </g>

              {/* Header */}
              <text x="20" y="80" fill="#1a1410" fontSize="9" fontFamily="'Courier New',monospace" fontWeight="700">
                IMPERIAL WAR MUSEUM
              </text>
              <text x="20" y="92" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                Sound Archive -- Oral History
              </text>
              <line x1="20" y1="97" x2="280" y2="97" stroke="#2a2018" strokeWidth="0.5" opacity="0.3" />

              <text x="20" y="112" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                Catalogue No. 9472
              </text>
              <text x="20" y="124" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                Recorded: 14 June 1985
              </text>
              <text x="20" y="136" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                Duration: 02:47:33
              </text>

              <line x1="20" y1="144" x2="280" y2="144" stroke="#2a2018" strokeWidth="0.3" opacity="0.3" />

              {/* Transcript */}
              <text x="20" y="162" fill="#3a3a3a" fontSize="7.5" fontFamily="'Courier New',monospace" fontWeight="600">
                TRANSCRIPT EXTRACT (pp. 14-15)
              </text>

              {/* Timestamp */}
              <text x="250" y="175" fill="#6a5a4a" fontSize="6" fontFamily="'Courier New',monospace" opacity="0.5">
                [01:23:07]
              </text>

              {/* Q&A */}
              <text x="20" y="188" fill="#1a1410" fontSize="7" fontFamily="'Courier New',monospace" fontWeight="700">
                Q:
              </text>
              <text x="34" y="188" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                Can you describe what you saw when
              </text>
              <text x="34" y="200" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                you first arrived at the camp?
              </text>

              {/* Timestamp */}
              <text x="250" y="216" fill="#6a5a4a" fontSize="6" fontFamily="'Courier New',monospace" opacity="0.5">
                [01:23:42]
              </text>

              <text x="20" y="228" fill="#1a1410" fontSize="7" fontFamily="'Courier New',monospace" fontWeight="700">
                A:
              </text>
              <text x="34" y="228" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                Well, you have to understand, we were
              </text>
              <text x="34" y="240" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                told very little beforehand. The briefing
              </text>
              <text x="34" y="252" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                said "detention facility" but that doesn't
              </text>
              <text x="34" y="264" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                begin to convey -- [pause] -- the conditions
              </text>
              <text x="34" y="276" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                were not what any of us expected. I still
              </text>
              <text x="34" y="288" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                think about it, actually. More now than I
              </text>
              <text x="34" y="300" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                did then, if that makes sense.
              </text>

              {/* Timestamp */}
              <text x="250" y="316" fill="#6a5a4a" fontSize="6" fontFamily="'Courier New',monospace" opacity="0.5">
                [01:24:18]
              </text>

              <text x="20" y="328" fill="#1a1410" fontSize="7" fontFamily="'Courier New',monospace" fontWeight="700">
                Q:
              </text>
              <text x="34" y="328" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                Was there any formal record of what
              </text>
              <text x="34" y="340" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                you witnessed?
              </text>

              <text x="20" y="360" fill="#1a1410" fontSize="7" fontFamily="'Courier New',monospace" fontWeight="700">
                A:
              </text>
              <text x="34" y="360" fill="#2a2018" fontSize="7" fontFamily="'Courier New',monospace">
                [laughs] No. That was rather the point.
              </text>

              {/* Archivist note */}
              <text x="20" y="385" fill="#6a5a4a" fontSize="5.5" fontFamily="'Courier New',monospace" fontStyle="italic" opacity="0.5">
                [Transcribed by J. Williams, IWM Sound Archive, 1986]
              </text>

              {selectedDoc === 'oral_history' && (
                <rect x="2" y="2" width="296" height="396" rx="3" ry="3"
                  fill="none" stroke={C.gold} strokeWidth="2" opacity="0.6" />
              )}
            </svg>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <div style={{ fontFamily: Mono, fontSize: 12, color: C.gold, fontWeight: 600 }}>Oral History Interview</div>
              <div style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>Imperial War Museum</div>
            </div>
          </div>

          {/* ── Document 3: Hansard Parliamentary Debate ── */}
          <div
            onClick={() => handleDocClick('hansard')}
            style={{ cursor: 'pointer', transition: 'transform .15s ease', transform: selectedDoc === 'hansard' ? 'scale(1.02)' : 'scale(1)' }}
          >
            <svg width="300" height="400" viewBox="0 0 300 400" style={{ display: 'block' }}>
              <defs>
                <filter id="paper-noise-3">
                  <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="12" result="noise" />
                  <feColorMatrix type="saturate" values="0" in="noise" result="gray-noise" />
                  <feComponentTransfer in="gray-noise" result="faded-noise">
                    <feFuncA type="linear" slope="0.04" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="SourceGraphic" />
                    <feMergeNode in="faded-noise" />
                  </feMerge>
                </filter>
              </defs>

              {/* Paper background — slightly more formal/white */}
              <rect x="4" y="4" width="292" height="392" rx="2" ry="2"
                fill="#eae6dc" filter="url(#paper-noise-3)" />
              <rect x="4" y="4" width="292" height="392" rx="2" ry="2"
                fill="none" stroke="rgba(60,50,40,.15)" strokeWidth="1" />

              {/* Coat of arms (simplified portcullis) */}
              <g transform="translate(150, 35)">
                {/* Crown */}
                <path d="M-12,-12 L-8,-4 L-4,-10 L0,-2 L4,-10 L8,-4 L12,-12" fill="none" stroke="#3a2a1a" strokeWidth="1.2" opacity="0.4" />
                {/* Portcullis grid */}
                <rect x="-14" y="-2" width="28" height="22" rx="2" ry="2"
                  fill="none" stroke="#3a2a1a" strokeWidth="1" opacity="0.35" />
                <line x1="-7" y1="-2" x2="-7" y2="20" stroke="#3a2a1a" strokeWidth="0.8" opacity="0.3" />
                <line x1="0" y1="-2" x2="0" y2="20" stroke="#3a2a1a" strokeWidth="0.8" opacity="0.3" />
                <line x1="7" y1="-2" x2="7" y2="20" stroke="#3a2a1a" strokeWidth="0.8" opacity="0.3" />
                <line x1="-14" y1="5" x2="14" y2="5" stroke="#3a2a1a" strokeWidth="0.8" opacity="0.3" />
                <line x1="-14" y1="12" x2="14" y2="12" stroke="#3a2a1a" strokeWidth="0.8" opacity="0.3" />
              </g>

              {/* Header */}
              <text x="150" y="70" textAnchor="middle" fill="#1a1410" fontSize="9" fontFamily="'Courier New',monospace" fontWeight="700" letterSpacing="2">
                HANSARD
              </text>
              <text x="150" y="82" textAnchor="middle" fill="#3a3028" fontSize="7" fontFamily="'Courier New',monospace">
                PARLIAMENTARY DEBATES
              </text>
              <line x1="50" y1="87" x2="250" y2="87" stroke="#3a3028" strokeWidth="0.5" opacity="0.3" />
              <text x="150" y="100" textAnchor="middle" fill="#3a3028" fontSize="7" fontFamily="'Courier New',monospace">
                HOUSE OF COMMONS
              </text>
              <text x="150" y="112" textAnchor="middle" fill="#3a3028" fontSize="6.5" fontFamily="'Courier New',monospace">
                Thursday 7 June 1956
              </text>
              <text x="150" y="124" textAnchor="middle" fill="#3a3028" fontSize="6" fontFamily="'Courier New',monospace" opacity="0.5">
                vol 548 cc1159-1230
              </text>

              {/* Divider */}
              <line x1="20" y1="132" x2="280" y2="132" stroke="#3a3028" strokeWidth="0.3" opacity="0.4" />

              {/* Topic heading */}
              <text x="150" y="148" textAnchor="middle" fill="#1a1410" fontSize="8" fontFamily="'Courier New',monospace" fontWeight="700">
                KENYA (DETENTION CAMPS)
              </text>

              {/* Column number */}
              <text x="270" y="160" fill="#6a5a4a" fontSize="5.5" fontFamily="'Courier New',monospace" opacity="0.4">
                1159
              </text>

              {/* Debate text */}
              <text x="20" y="175" fill="#1a1410" fontSize="7" fontFamily="'Courier New',monospace" fontWeight="700">
                Mr. Fenner Brockway (Eton and Slough)
              </text>
              <text x="20" y="187" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                asked the Secretary of State for the
              </text>
              <text x="20" y="197" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                Colonies whether he would make a statement
              </text>
              <text x="20" y="207" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                on conditions in the detention camps in
              </text>
              <text x="20" y="217" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                Kenya, with particular reference to the
              </text>
              <text x="20" y="227" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                allegations of ill-treatment of detainees.
              </text>

              {/* Column number */}
              <text x="270" y="240" fill="#6a5a4a" fontSize="5.5" fontFamily="'Courier New',monospace" opacity="0.4">
                1160
              </text>

              <text x="20" y="252" fill="#1a1410" fontSize="7" fontFamily="'Courier New',monospace" fontWeight="700">
                Mr. Lennox-Boyd:
              </text>
              <text x="20" y="264" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                The situation in Kenya's detention camps
              </text>
              <text x="20" y="274" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                is under continuous review. I am satisfied
              </text>
              <text x="20" y="284" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                that the rehabilitation programme is making
              </text>
              <text x="20" y="294" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                good progress.
              </text>

              {/* Interjection in brackets */}
              <text x="20" y="312" fill="#4a3a2a" fontSize="6.5" fontFamily="'Courier New',monospace" fontStyle="italic" opacity="0.7">
                [HON. MEMBERS: "What about Hola?"]
              </text>

              <text x="20" y="330" fill="#1a1410" fontSize="7" fontFamily="'Courier New',monospace" fontWeight="700">
                Mrs. Castle:
              </text>
              <text x="20" y="342" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                Will the right hon. Gentleman explain
              </text>
              <text x="20" y="352" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                how "continuous review" is consistent
              </text>
              <text x="20" y="362" fill="#2a2018" fontSize="6.5" fontFamily="'Courier New',monospace">
                with the facts that have now emerged?
              </text>

              {/* Interjection */}
              <text x="20" y="378" fill="#4a3a2a" fontSize="6.5" fontFamily="'Courier New',monospace" fontStyle="italic" opacity="0.7">
                [Interruption]
              </text>

              {selectedDoc === 'hansard' && (
                <rect x="2" y="2" width="296" height="396" rx="3" ry="3"
                  fill="none" stroke={C.gold} strokeWidth="2" opacity="0.6" />
              )}
            </svg>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <div style={{ fontFamily: Mono, fontSize: 12, color: C.gold, fontWeight: 600 }}>Parliamentary Debate, Hansard</div>
              <div style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>Houses of Parliament</div>
            </div>
          </div>
        </div>

        {/* Reveal panel */}
        {selDoc && (
          <div style={{
            background: C.card, border: '1px solid ' + C.cardBd,
            borderRadius: 8, overflow: 'hidden', marginTop: 8,
          }}>
            <div style={{
              padding: '14px 20px', borderBottom: '1px solid ' + C.line,
              background: C.accentBg,
            }}>
              <div style={{ fontFamily: Mono, fontSize: 11, fontWeight: 700, color: C.gold }}>
                {selDoc.title}
              </div>
              <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginTop: 2 }}>
                {selDoc.source} {'\—'} {selDoc.series}
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.accentDm, marginBottom: 8 }}>
                {selDoc.reveal.heading.toUpperCase()}
              </div>
              <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75 }}>
                {selDoc.reveal.content}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }, [selectedDoc, handleDocClick]);

  // ── Main Render ─────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: Sans, position: 'relative', overflow: 'hidden' }} ref={topRef}>
      {/* London fog and rain atmosphere */}
      <RainTexture />
      <FogOverlay />
      <ParliamentSilhouette />

      {/* Top bar — Victorian letterhead */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'linear-gradient(180deg, rgba(10,12,16,.97) 0%, rgba(10,12,16,.93) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid ' + C.line, padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Serif, fontSize: 12, cursor: 'pointer', letterSpacing: '.04em',
        }}>
          {'\u2190'} Back to Coursework
        </button>
        <span style={{ fontFamily: Serif, fontSize: 13, color: C.sepia, letterSpacing: '.1em', fontStyle: 'italic' }}>
          ABROAD {'\u2014'} LONDON STUDY ABROAD
        </span>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Hero section — Victorian archive header */}
        <div style={{ marginBottom: 24, position: 'relative' }}>
          <AgedPaperBg />

          {/* Decorative Victorian rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(180,160,120,.12)' }}/>
            <svg width="20" height="20" viewBox="0 0 20 20" style={{ opacity: 0.15, color: C.sepia }}>
              <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8Z" fill="currentColor" fillOpacity="0.3"/>
            </svg>
            <div style={{ flex: 1, height: 1, background: 'rgba(180,160,120,.12)' }}/>
          </div>

          <h1 style={{
            fontFamily: Serif, fontSize: 36, fontWeight: 400,
            color: C.tx, letterSpacing: '.04em', marginBottom: 8,
            textAlign: 'center',
          }}>
            Archive Explorer
          </h1>

          {/* Subtitle rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 14 }}>
            <div style={{ width: 40, height: 1, background: 'rgba(160,144,112,.15)' }}/>
            <span style={{ fontFamily: Serif, fontSize: 12, color: C.sepia, letterSpacing: '.15em', fontStyle: 'italic', opacity: 0.6 }}>
              Spring 2012
            </span>
            <div style={{ width: 40, height: 1, background: 'rgba(160,144,112,.15)' }}/>
          </div>

          <p style={{
            fontFamily: Serif, fontSize: 16, color: C.tx2,
            lineHeight: 1.7, marginBottom: 4, maxWidth: 720, letterSpacing: '.02em',
          }}>
            Five research experiences across London, each introducing a distinct methodology for engaging with historical evidence. From the Colonial Office files at Kew to comparative seminars at LSE {'\u2014'} a methodological apprenticeship conducted in the institutions where history was made, preserved, and contested.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 6px' }}>
            <ArchiveIcon /><Tip id="national_archives" />
          </div>
          <p style={{
            fontFamily: Serif, fontSize: 12, color: C.tx3,
            lineHeight: 1.65, marginBottom: 12, maxWidth: 720, letterSpacing: '.06em', fontStyle: 'italic',
          }}>
            Archival Research, Material Culture, Institutional Observation, Provenance, Comparative Analysis
          </p>

          {/* Skills tags — library index card style */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            {SKILLS.map(tag => (
              <span key={tag} style={{
                fontFamily: Mono, fontSize: 11, padding: '4px 10px', borderRadius: 1,
                background: 'rgba(180,160,120,.04)', color: C.accentDm, letterSpacing: '.04em',
                border: '1px solid rgba(180,160,120,.08)',
                borderBottom: '2px solid rgba(180,160,120,.1)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <span style={{ fontFamily: Serif, fontSize: 12, color: C.tx3, letterSpacing: '.04em', fontStyle: 'italic' }}>SITES EXPLORED</span>
            <div style={{ flex: 1, maxWidth: 200, height: 4, background: C.line, borderRadius: 2 }}>
              <div style={{
                width: (revealedCount / 5 * 100) + '%',
                height: '100%', borderRadius: 2,
                background: revealedCount === 5 ? C.green : C.accent,
                transition: 'width .3s ease',
              }} />
            </div>
            <span style={{
              fontFamily: Mono, fontSize: 12,
              color: revealedCount === 5 ? C.green : C.accent,
            }}>
              {revealedCount}/5
            </span>
          </div>
        </div>

        <ModeSwitch />

        {mode === 'locations' && renderLocations()}
        {mode === 'methods' && renderMethods()}
        {mode === 'reflections' && renderReflections()}
        {mode === 'archive' && renderArchive()}

        {/* Provenance Strip — institutional plaques */}
        <div style={{
          marginTop: 48, padding: 20,
          borderTop: '1px solid rgba(180,160,120,.08)',
          display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center',
        }}>
          {PROVENANCE.map(p => (
            <div key={p.label} style={{
              textAlign: 'center', flex: '0 0 auto',
              padding: '10px 16px', position: 'relative',
              background: 'rgba(180,160,120,.02)',
              border: '1px solid rgba(180,160,120,.06)',
            }}>
              <IndexCardEdge />
              <div style={{
                fontFamily: Serif, fontSize: 12, letterSpacing: '.06em', color: C.sepia, fontStyle: 'italic', opacity: 0.7,
              }}>
                {p.label}
              </div>
              <div style={{ fontFamily: Serif, fontSize: 11, color: C.tx2, marginTop: 2, letterSpacing: '.02em' }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Victorian closing ornament */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, justifyContent: 'center' }}>
          <div style={{ width: 60, height: 1, background: 'rgba(180,160,120,.1)' }}/>
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ opacity: 0.1, color: C.sepia }}>
            <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="0.8"/>
            <circle cx="8" cy="8" r="2" fill="currentColor" fillOpacity="0.3"/>
          </svg>
          <div style={{ width: 60, height: 1, background: 'rgba(180,160,120,.1)' }}/>
        </div>

        {/* Back button */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button onClick={() => setView('coursework')} style={{
            padding: '10px 32px', border: '1px solid rgba(180,160,120,.1)',
            background: 'transparent', color: C.tx2,
            fontFamily: Serif, fontSize: 14, letterSpacing: '.06em', cursor: 'pointer',
            fontStyle: 'italic',
          }}>
            {'\u2190'} Back to Coursework
          </button>
        </div>
      </div>
    </div>
  );
}
