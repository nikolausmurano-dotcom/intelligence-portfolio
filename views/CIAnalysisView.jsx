// CIAnalysisView.jsx — Mole Hunt Deduction Board
// Counterintelligence (MPAI 6785)
//
// The visitor is a CI analyst investigating a suspected penetration
// agent inside a fictional intelligence agency. Six suspects, each
// with behavioral indicators, access patterns, travel anomalies,
// and financial discrepancies. The visitor weights evidence, applies
// ACH, and narrows suspects — while the system tracks cognitive traps.

// ── Data (outside component for performance) ─────────────────

const CI_PALETTE = {
  bg: '#0c0b08',
  card: 'rgba(20,18,14,.94)',
  cardBd: 'rgba(120,110,90,.15)',
  tx: '#d0ccc0',
  tx2: '#908878',
  tx3: '#605848',
  red: '#b03030',
  redDm: '#882020',
  redBg: 'rgba(176,48,48,.07)',
  blue: '#4868a0',
  blueDm: '#3a5888',
  blueBg: 'rgba(72,104,160,.06)',
  amber: '#b08830',
  amberDm: '#8a6820',
  amberBg: 'rgba(176,136,48,.06)',
  green: '#488848',
  greenDm: '#386838',
  greenBg: 'rgba(72,136,72,.06)',
  manila: '#c8b888',
  manilaDm: '#a09060',
  manilaBg: 'rgba(200,184,136,.06)',
  cream: '#f0e8d8',
  creamBg: 'rgba(240,232,216,.04)',
  line: 'rgba(120,110,90,.12)',
};
const CI_MONO = "'IBM Plex Mono','Courier New',monospace";
const CI_SERIF = "'Source Serif 4','EB Garamond',Georgia,serif";
const CI_SANS = "'Inter',Helvetica,sans-serif";

// ── Classification Banner Component ────────────────────────
const ClassificationBanner = function(props) {
  return React.createElement('div', {
    style: {
      background: '#b03030',
      padding: '4px 0',
      textAlign: 'center',
      fontFamily: CI_MONO,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.14em',
      color: '#fff',
      position: props.position === 'fixed-bottom' ? 'fixed' : 'relative',
      bottom: props.position === 'fixed-bottom' ? 0 : undefined,
      left: 0, right: 0,
      zIndex: 200,
    }
  }, 'TOP SECRET // SCI // NOFORN // ORCON');
};

// ── Red Stamp Component ────────────────────────────────
const RedStamp = function(props) {
  return React.createElement('span', {
    style: {
      display: 'inline-block',
      fontFamily: CI_MONO,
      fontSize: props.size || 10,
      fontWeight: 900,
      letterSpacing: '.1em',
      color: '#b03030',
      border: '2px solid #b03030',
      borderRadius: 2,
      padding: '1px 6px',
      transform: 'rotate(-3deg)',
      opacity: 0.8,
    }
  }, props.text || 'CLASSIFIED');
};

// ── Dossier Card wrapper ────────────────────────────────
const DossierCard = function(props) {
  return React.createElement('div', {
    style: Object.assign({
      background: 'rgba(20,18,14,.94)',
      border: '1px solid rgba(120,110,90,.2)',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '2px 3px 8px rgba(0,0,0,.3)',
    }, props.style || {})
  },
    // Manila tab header
    React.createElement('div', {
      style: {
        background: 'rgba(200,184,136,.08)',
        borderBottom: '1px solid rgba(120,110,90,.15)',
        padding: '6px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    },
      React.createElement('span', {
        style: { fontFamily: CI_MONO, fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color: '#a09060', textTransform: 'uppercase' }
      }, props.tab || 'FILE'),
      props.stamp && React.createElement(RedStamp, { text: props.stamp, size: 9 })
    ),
    // Body
    React.createElement('div', { style: { padding: props.padding || 14 } }, props.children)
  );
};

// ── Corkboard pin SVG ────────────────────────────────
const CorkboardPin = function() {
  return React.createElement('svg', { width: 12, height: 16, viewBox: '0 0 12 16', style: { flexShrink: 0 } },
    React.createElement('circle', { cx: 6, cy: 5, r: 4, fill: '#b03030', stroke: '#882020', strokeWidth: 1 }),
    React.createElement('line', { x1: 6, y1: 9, x2: 6, y2: 15, stroke: '#666', strokeWidth: 1 }),
    React.createElement('circle', { cx: 6, cy: 5, r: 1.5, fill: '#d04040', opacity: 0.6 })
  );
};

const CI_CASE = {
  codename: "BRICKWALL",
  classification: "TOP SECRET // SI // NOFORN",
  summary: "A controlled source reporting chain in a denied-area target country has gone silent. Three assets in the network were arrested within a 72-hour window. The pattern is inconsistent with hostile counterintelligence tradecraft improvements — suggesting a compromise from inside the handling agency. CI investigation is authorized.",
  timeline: [
    { date: "Day -180", event: "Source CARDINAL reports increased security around target facility" },
    { date: "Day -120", event: "Source GRANITE corroborates CARDINAL. New collection requirement issued" },
    { date: "Day -45", event: "Source MARBLE recruited. Reports from inside target's security directorate" },
    { date: "Day -12", event: "MARBLE reports unusual CI activity — 'someone is asking questions about foreigners'" },
    { date: "Day 0", event: "CARDINAL arrested. GRANITE goes dark. MARBLE sends emergency signal then silence" },
    { date: "Day +3", event: "CI investigation BRICKWALL opened. Six individuals had access to all three identities" },
  ],
};

const CI_SUSPECTS = [
  {
    id: 'S1', name: 'CHEN, Marcus', role: 'Case Officer — CARDINAL handler',
    access: ['CARDINAL identity', 'GRANITE identity', 'MARBLE recruitment plan'],
    indicators: {
      behavioral: { score: 3, details: 'Increased alcohol consumption reported by colleagues. Requested transfer from denied-area desk 6 weeks before arrests.', innocent: 'Going through divorce. Transfer request filed before MARBLE was recruited.' },
      financial: { score: 7, details: 'Unexplained $40K deposit in wife\'s brokerage account. Source: "inheritance" — death certificate for aunt is from a country with no diplomatic relations.', innocent: 'Could be legitimate estate settlement through intermediary country.' },
      travel: { score: 5, details: 'Three personal trips to a third country in 90 days. No family or professional contacts there on file.', innocent: 'Online relationship. Verified dating app activity (but metadata only).' },
      access: { score: 9, details: 'Full access to all three source identities. Authored CARDINAL and GRANITE contact protocols. Read into MARBLE.', innocent: 'Access is consistent with job function. All three sources in his portfolio.' },
    },
  },
  {
    id: 'S2', name: 'PARK, Jennifer', role: 'Reports Officer — processed all three source reports',
    access: ['CARDINAL reports', 'GRANITE reports', 'MARBLE reports', 'Dissemination records'],
    indicators: {
      behavioral: { score: 2, details: 'No anomalous behavior reported. Consistently rated "exceeds expectations." Active in social activities.', innocent: 'Stable behavioral profile across 8 years.' },
      financial: { score: 2, details: 'No anomalous financial activity. Lives within means. Spouse is a high school teacher.', innocent: 'Clean financial profile on all checks.' },
      travel: { score: 1, details: 'One overseas vacation to allied country per year. No travel anomalies.', innocent: 'Routine travel pattern.' },
      access: { score: 8, details: 'Processed all three sources\' reports. Saw source identities in cable headers. Had access to dissemination records showing who received the intelligence.', innocent: 'Access is inherent to reports officer function.' },
    },
  },
  {
    id: 'S3', name: 'VOLKOV, Dmitri', role: 'Analyst — all-source fusion on target country',
    access: ['CARDINAL intelligence (sanitized)', 'GRANITE intelligence (sanitized)', 'MARBLE intelligence (true-name in one cable)'],
    indicators: {
      behavioral: { score: 6, details: 'Changed personal phone twice in 3 months. Requested access to compartments outside his portfolio. Became noticeably friendlier with Chen after years of professional distance.', innocent: 'Phones were legitimately broken (IT confirms). Access requests were for a cross-target analysis project (documented). Social behavior is subjective.' },
      financial: { score: 4, details: 'Paid off student loans ($28K) in a single payment. Explanation: "sold cryptocurrency." Crypto records not yet verified.', innocent: 'Crypto gains are plausible given market timing.' },
      travel: { score: 6, details: 'Dual national (U.S./allied country). Travels to country of second nationality frequently. One trip overlapped with a known intelligence officer from the target country visiting the same city.', innocent: 'Dual nationality is documented and vetted. Visiting family. Overlap may be coincidence — city has 2 million people.' },
      access: { score: 6, details: 'Saw sanitized intelligence from all three sources. MARBLE\'s true name appeared in one unsanitized cable due to processing error.', innocent: 'The processing error was Park\'s, not Volkov\'s. He reported the exposure through proper channels.' },
    },
  },
  {
    id: 'S4', name: 'OSEI, Grace', role: 'Comms Officer — managed encrypted channels to all three sources',
    access: ['Communication schedules', 'Dead-drop locations', 'Signal protocols'],
    indicators: {
      behavioral: { score: 4, details: 'Took 3 weeks of unexplained leave 2 months before the arrests. HR records show "personal reasons."', innocent: 'Medical procedure. HIPAA-protected. Manager confirms pre-approved leave.' },
      financial: { score: 3, details: 'Small but regular cash deposits ($500-$800) every 2-3 weeks for 6 months. Pattern started before MARBLE recruitment.', innocent: 'Sells handmade jewelry at weekend markets. Multiple witnesses and Etsy store confirm.' },
      travel: { score: 2, details: 'No unusual travel. Commutes from suburb. Weekend activity is local.', innocent: 'Stable pattern.' },
      access: { score: 7, details: 'Managed the encrypted communication channels for all three sources. Knew contact schedules, dead-drop timing, and signal protocols.', innocent: 'Access is inherent to comms officer function. Could not identify sources by true name from comms data alone.' },
    },
  },
  {
    id: 'S5', name: 'RICHARDSON, Thomas', role: 'Deputy Chief — oversight of denied-area operations',
    access: ['All source identities', 'All operational plans', 'Budget and resource allocation'],
    indicators: {
      behavioral: { score: 5, details: 'Known for aggressive management style. Two formal complaints from subordinates in past year. Privately critical of agency leadership — overheard saying "this place doesn\'t deserve loyalty."', innocent: 'Management style is documented but not uncommon at senior level. Complaints are about micro-management, not disloyalty. Cynical comments are common among senior officers.' },
      financial: { score: 8, details: 'Maintains a bank account in an allied country that was not disclosed on SF-86 renewal. Account has $120K. Explanation when confronted: "I forgot about it — it\'s from my overseas tour."', innocent: 'Overseas accounts from prior tours do exist. But failure to disclose is a security violation regardless of intent.' },
      travel: { score: 3, details: 'Frequent travel to allied countries for liaison meetings. All documented and authorized.', innocent: 'Travel is consistent with senior role.' },
      access: { score: 10, details: 'As Deputy Chief, had complete access to all sources, operations, budgets, and personnel files. Could access any compartment without generating an audit flag.', innocent: 'Access is inherent to deputy chief function. But the lack of audit trail is a systemic vulnerability.' },
    },
  },
  {
    id: 'S6', name: 'WALSH, Catherine', role: 'Logistics Officer — coordinated operational support',
    access: ['Operational logistics', 'Cover arrangements', 'Travel coordination'],
    indicators: {
      behavioral: { score: 1, details: 'No behavioral anomalies. Stable 12-year career. Respected by colleagues.', innocent: 'Clean profile.' },
      financial: { score: 1, details: 'No anomalies. Modest lifestyle. Transparent finances.', innocent: 'Clean profile.' },
      travel: { score: 1, details: 'No unusual travel.', innocent: 'Clean profile.' },
      access: { score: 4, details: 'Coordinated logistics for denied-area operations. Knew travel patterns and cover arrangements but not source identities.', innocent: 'Limited access. Could infer some operational patterns but not identify specific sources.' },
    },
  },
];

const CI_BIASES = [
  { id: 'anchoring', name: 'Anchoring', desc: 'Over-weighting the first piece of evidence encountered', trap: 'Chen\'s financial anomaly is dramatic but may anchor your assessment before examining other suspects equally' },
  { id: 'confirmation', name: 'Confirmation Bias', desc: 'Seeking evidence that confirms your initial suspect', trap: 'Once you suspect someone, you\'ll interpret ambiguous indicators as confirming your hypothesis' },
  { id: 'availability', name: 'Availability Heuristic', desc: 'Over-weighting vivid or recent information', trap: 'Richardson\'s undisclosed bank account is vivid but "forgetting" overseas accounts is actually common' },
  { id: 'fundamental', name: 'Fundamental Attribution Error', desc: 'Attributing behavior to character rather than situation', trap: 'Volkov\'s changed phones and new friendliness could be personality, not tradecraft' },
  { id: 'base_rate', name: 'Base Rate Neglect', desc: 'Ignoring how common a behavior is in the general population', trap: 'Many officers have financial irregularities, personal problems, or travel anomalies without being spies' },
];

const CI_PHASES = [
  { id: 'briefing', num: 'I', title: 'Case Briefing' },
  { id: 'suspects', num: 'II', title: 'Suspect Profiles' },
  { id: 'ach', num: 'III', title: 'Analysis of Competing Hypotheses' },
  { id: 'assessment', num: 'IV', title: 'CI Assessment' },
  { id: 'tradecraft', num: 'V', title: 'Tradecraft & Doctrine' },
  { id: 'sources', num: 'VI', title: 'Sources & Provenance' },
];

const CI_SKILLS = [
  "Analysis of Competing Hypotheses (ACH)", "Deception Detection", "CI Doctrine",
  "Threat Actor Profiling", "Base-Rate Calibration", "Oversight Architecture",
  "Case Canon Methodology", "ICD-203 Compliance", "Risk Assessment",
];

const CI_TIPS = {
  deadDrop: "A dead drop is a pre-arranged location where materials are left for later retrieval by another party. The two parties never meet \u2014 eliminating the risk of surveillance detecting a meeting. The chalk mark on a mailbox signals that a drop has been loaded. Aldrich Ames used a dead drop site under a footbridge in Virginia's Wheaton Regional Park for 9 years before his arrest in 1994.",
  brush: "A brush pass is a brief, seemingly accidental contact between a handler and an asset in a public place. The exchange \u2014 a folded newspaper, a shopping bag switch \u2014 takes less than 2 seconds. To surveillance, it looks like two strangers bumping into each other. The Moscow Rules (CIA operational doctrine for denied areas) made the brush pass the primary exchange method because the KGB's Second Chief Directorate maintained blanket surveillance of known CIA officers.",
  polygraph: "Polygraph reliability is a persistent debate in CI. The National Academy of Sciences (2003) found polygraph accuracy for screening is 'well above chance, though well below perfection.' Aldrich Ames passed two CIA polygraphs while actively spying for the KGB. Robert Hanssen was never polygraphed by the FBI during his 22 years of espionage. The polygraph's real value may be as a deterrent and confession-extraction tool rather than a reliable detection instrument.",
  dangle: "A dangle is a person who deliberately presents themselves to an intelligence service as a potential recruit, while actually working for an opposing service. The purpose is to feed disinformation, identify collection priorities, or map the adversary's operational methods. Detecting dangles requires analyzing the volunteer's access, motivation, and the quality of their initial intelligence \u2014 genuine assets rarely volunteer with information that is too perfectly tailored to known gaps.",
  mole: "The term 'mole' was popularized by John le Carr\u00e9, but the concept predates the Cold War. A mole is a long-term penetration agent placed inside an intelligence service. The most damaging moles in IC history \u2014 Aldrich Ames (CIA, 1985-1994), Robert Hanssen (FBI, 1979-2001), Kim Philby (MI6, 1934-1963) \u2014 all exploited the same vulnerability: institutional reluctance to believe that 'one of us' could be a traitor. CI doctrine calls this the 'wilderness of mirrors' \u2014 the recursive paranoia of suspecting your own colleagues.",
  comms: "Communications security (COMSEC) failures have exposed more agents than any other single factor. Numbers stations (shortwave radio broadcasts of coded number sequences) were the primary method for communicating with agents in denied areas during the Cold War. Modern equivalents include covert communication (COVCOM) devices disguised as ordinary objects. The 2010 arrest of the Russian 'Illegals Program' agents was triggered by the FBI's interception of their steganographic communications \u2014 secret messages hidden in images posted to public websites.",
  sdrs: "A Surveillance Detection Route (SDR) is a pre-planned route designed to detect or shake surveillance before an operational meeting. The route includes chokepoints (narrow passages where followers must expose themselves), stops (natural pauses that force surveillance to halt conspicuously), and timing windows. A well-designed SDR takes 2-4 hours. If surveillance is detected, the meeting is aborted. Running an SDR is the most basic tradecraft skill \u2014 and the most time-consuming.",
};

// ── ACH Lab Data (The MERIDIAN Mole) ────────────────────────

const ACH_HYPOTHESES = [
  { id: 'h1', label: 'ALPHA \— Senior Analyst, Russia desk', description: 'Has broadest access to compromised material. Clean polygraph. 22-year career.' },
  { id: 'h2', label: 'BETA \— IT Administrator', description: 'System admin access to all classified networks. Failed to report foreign contact in 2019.' },
  { id: 'h3', label: 'GAMMA \— Contractor, signals analysis', description: 'Temporary access since 2022. Financial difficulties (bankruptcy 2021). Matched travel pattern.' },
  { id: 'h4', label: 'DELTA \— Deputy Director\'s aide', description: 'Access through proximity, not clearance level. Romantic relationship with foreign national (declared).' },
];

const ACH_EVIDENCE_LAB = [
  { id: 'e1', label: 'Compromised material spans 3 compartments', weight: 'high', diagnosticity: 'Highly diagnostic \— only ALPHA has access to all 3. BETA has system access but not read-in status. GAMMA has 1 compartment. DELTA has intermittent access to 2.' },
  { id: 'e2', label: 'Leak timeline correlates with contractor onboarding', weight: 'medium', diagnosticity: 'Moderately diagnostic \— GAMMA joined in 2022, first compromise detected late 2022. But correlation is not causation. ALPHA had access throughout.' },
  { id: 'e3', label: 'Source reports adversary handler operates from embassy cultural section', weight: 'medium', diagnosticity: 'Suggests traditional HUMINT recruitment, not cyber exfiltration. Favors ALPHA or DELTA (who attend embassy events) over BETA or GAMMA.' },
  { id: 'e4', label: 'Financial analysis shows no anomalous income for any suspect', weight: 'high', diagnosticity: 'Cuts against GAMMA (financial motive theory). But sophisticated spies use delayed payment, offshore accounts, or non-monetary compensation. Absence of evidence \u2260 evidence of absence.' },
  { id: 'e5', label: 'BETA failed to report casual contact with Russian diplomat at conference', weight: 'medium', diagnosticity: 'Security violation but common. 40% of cleared personnel have unreported foreign contacts (NCSC data). More diagnostic of carelessness than espionage.' },
  { id: 'e6', label: 'Travel pattern analysis: GAMMA visited 3 cities where handler was stationed', weight: 'high', diagnosticity: 'Highly suspicious for GAMMA. But handler stationed in major cities (Vienna, Geneva, Istanbul) where many people travel. Need to check if visits coincide with handler presence specifically.' },
  { id: 'e7', label: 'Polygraph results: all 4 passed most recent examination', weight: 'low', diagnosticity: 'Low diagnostic value. Aldrich Ames passed multiple polygraphs. The technique has a 65-85% accuracy range. A clean polygraph does NOT exclude a suspect.' },
  { id: 'e8', label: 'DELTA\'s declared foreign relationship is with a national from a non-adversary country', weight: 'low', diagnosticity: 'Reduces suspicion on DELTA somewhat, but declared relationships can be cover for undeclared ones. Also, intelligence services recruit through third-country nationals.' },
];

const ACH_EXPERT_RATINGS = {
  'e1-h1': 'CC', 'e1-h2': 'N', 'e1-h3': 'II', 'e1-h4': 'N',
  'e2-h1': 'N', 'e2-h2': 'N', 'e2-h3': 'C', 'e2-h4': 'N',
  'e3-h1': 'C', 'e3-h2': 'I', 'e3-h3': 'I', 'e3-h4': 'C',
  'e4-h1': 'N', 'e4-h2': 'N', 'e4-h3': 'I', 'e4-h4': 'N',
  'e5-h1': 'N', 'e5-h2': 'C', 'e5-h3': 'N', 'e5-h4': 'N',
  'e6-h1': 'N', 'e6-h2': 'N', 'e6-h3': 'CC', 'e6-h4': 'N',
  'e7-h1': 'N', 'e7-h2': 'N', 'e7-h3': 'N', 'e7-h4': 'N',
  'e8-h1': 'N', 'e8-h2': 'N', 'e8-h3': 'N', 'e8-h4': 'C',
};

const ACH_CELL_CYCLE = ['', 'C', 'CC', 'N', 'I', 'II'];

const ACH_CELL_COLORS = {
  '': 'transparent',
  'C': '#3a7a3a',
  'CC': '#50b050',
  'N': '#666660',
  'I': '#a03838',
  'II': '#d04040',
};

const ACH_CELL_LABELS = {
  '': '',
  'C': 'Consistent',
  'CC': 'Strongly Consistent',
  'N': 'Neutral',
  'I': 'Inconsistent',
  'II': 'Strongly Inconsistent',
};

// ── Component ────────────────────────────────────────────────

function CIAnalysisView({ setView }) {
  const [phase, setPhase] = useState(0);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [suspectRankings, setSuspectRankings] = useState({});
  const [biasesTriggered, setBiasesTriggered] = useState(new Set());
  const [achMatrix, setAchMatrix] = useState({});
  const [firstSuspectClicked, setFirstSuspectClicked] = useState(null);
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const [tipId, setTipId] = useState(null);

  // ACH Lab state
  const [viewMode, setViewMode] = useState('case'); // 'case' | 'achlab'
  const [labMatrix, setLabMatrix] = useState({});
  const [labShowExpert, setLabShowExpert] = useState(false);
  const [labSelectedEvidence, setLabSelectedEvidence] = useState(null);
  const [labHoveredCell, setLabHoveredCell] = useState(null);

  const C = CI_PALETTE;

  // Tradecraft tooltip renderer
  const TipBox = function(key) {
    if (tipId !== key) return null;
    return React.createElement('div', { style: { padding: '10px 14px', background: 'rgba(8,6,12,.94)', border: '1px solid rgba(204,64,80,.15)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(200,195,210,.7)', lineHeight: 1.65, margin: '6px 0 10px' } }, CI_TIPS[key]);
  };

  // SVG micro-icons for tradecraft tooltips
  var EyeIcon = React.createElement('svg', { width: 24, height: 16, viewBox: '0 0 24 16', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'sdrs' ? null : 'sdrs'); } },
    React.createElement('path', { d: 'M2 8 Q6 2 12 2 Q18 2 22 8 Q18 14 12 14 Q6 14 2 8Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 12, cy: 8, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 12, cy: 8, r: 1, fill: 'currentColor', fillOpacity: '.3' })
  );

  var LockIcon = React.createElement('svg', { width: 18, height: 22, viewBox: '0 0 18 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'comms' ? null : 'comms'); } },
    React.createElement('rect', { x: 2, y: 10, width: 14, height: 10, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M5 10 L5 6 Q5 2 9 2 Q13 2 13 6 L13 10', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 9, cy: 15, r: 1.5, fill: 'currentColor', fillOpacity: '.2', stroke: 'currentColor', strokeWidth: '.5' }),
    React.createElement('line', { x1: 9, y1: 16.5, x2: 9, y2: 18, stroke: 'currentColor', strokeWidth: '.5' })
  );

  var DossierIcon = React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 20 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'mole' ? null : 'mole'); } },
    React.createElement('path', { d: 'M2 6 L2 18 L18 18 L18 6 L10 6 L8 4 L2 4Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 5, y1: 10, x2: 15, y2: 10, stroke: 'currentColor', strokeWidth: '.4' }),
    React.createElement('line', { x1: 5, y1: 13, x2: 13, y2: 13, stroke: 'currentColor', strokeWidth: '.4' })
  );

  var DeadDropIcon = React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 20 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'deadDrop' ? null : 'deadDrop'); } },
    React.createElement('rect', { x: 2, y: 8, width: 16, height: 10, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 6, y1: 4, x2: 14, y2: 4, stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', opacity: '.4' })
  );

  var PolygraphIcon = React.createElement('svg', { width: 24, height: 20, viewBox: '0 0 24 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'polygraph' ? null : 'polygraph'); } },
    React.createElement('path', { d: 'M2 14 L6 14 L8 6 L10 16 L12 4 L14 14 L16 10 L18 14 L22 14', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 2, y1: 18, x2: 22, y2: 18, stroke: 'currentColor', strokeWidth: '.4' })
  );

  var BrushIcon = React.createElement('svg', { width: 22, height: 18, viewBox: '0 0 22 18', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'brush' ? null : 'brush'); } },
    React.createElement('circle', { cx: 6, cy: 9, r: 4, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 16, cy: 9, r: 4, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 10, y1: 9, x2: 12, y2: 9, stroke: 'currentColor', strokeWidth: '.6', strokeDasharray: '1.5 1' })
  );

  var DangleIcon = React.createElement('svg', { width: 20, height: 22, viewBox: '0 0 20 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'dangle' ? null : 'dangle'); } },
    React.createElement('circle', { cx: 10, cy: 5, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 10, y1: 8, x2: 10, y2: 16, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 10, y1: 16, x2: 10, y2: 20, stroke: 'currentColor', strokeWidth: '.6', strokeDasharray: '1.5 1' }),
    React.createElement('path', { d: 'M6 11 L10 12 L14 11', fill: 'none', stroke: 'currentColor', strokeWidth: '.6' })
  );

  // Track anchoring bias
  const handleSuspectSelect = useCallback((id) => {
    if (!firstSuspectClicked) {
      setFirstSuspectClicked(id);
    }
    setSelectedSuspect(id === selectedSuspect ? null : id);
  }, [selectedSuspect, firstSuspectClicked]);

  // Rate a suspect's likelihood
  const rateSuspect = useCallback((id, rating) => {
    setSuspectRankings(prev => ({ ...prev, [id]: rating }));
    // Check for confirmation bias — if they rate their first-clicked suspect highest
    if (firstSuspectClicked && id === firstSuspectClicked && rating >= 8) {
      setBiasesTriggered(prev => new Set([...prev, 'anchoring']));
    }
  }, [firstSuspectClicked]);

  // ACH matrix cell toggle
  const toggleACH = useCallback((suspectId, evidenceKey) => {
    const key = `${suspectId}-${evidenceKey}`;
    setAchMatrix(prev => {
      const current = prev[key] || 'untested';
      const cycle = { untested: 'consistent', consistent: 'inconsistent', inconsistent: 'neutral', neutral: 'untested' };
      return { ...prev, [key]: cycle[current] };
    });
  }, []);

  // ACH Lab cell toggle
  const toggleLabCell = useCallback((evidenceId, hypothesisId) => {
    const key = `${evidenceId}-${hypothesisId}`;
    setLabMatrix(prev => {
      const current = prev[key] || '';
      const idx = ACH_CELL_CYCLE.indexOf(current);
      const next = ACH_CELL_CYCLE[(idx + 1) % ACH_CELL_CYCLE.length];
      return { ...prev, [key]: next };
    });
  }, []);

  const suspect = selectedSuspect ? CI_SUSPECTS.find(s => s.id === selectedSuspect) : null;
  const rankedSuspects = useMemo(() => {
    return [...CI_SUSPECTS].sort((a, b) => (suspectRankings[b.id] || 0) - (suspectRankings[a.id] || 0));
  }, [suspectRankings]);

  // Evidence items for ACH
  const ACH_EVIDENCE = useMemo(() => [
    { key: 'financial', label: 'Financial anomaly' },
    { key: 'travel', label: 'Travel pattern' },
    { key: 'behavioral', label: 'Behavioral change' },
    { key: 'access', label: 'Access level' },
    { key: 'timing', label: 'Timeline correlation' },
    { key: 'motive', label: 'Possible motive' },
  ], []);

  const achColors = { consistent: C.red, inconsistent: C.green, neutral: C.tx3, untested: 'transparent' };
  const achLabels = { consistent: 'C', inconsistent: 'I', neutral: '\—', untested: '' };

  // ACH Lab computed values
  const labAllFilled = useMemo(() => {
    let count = 0;
    for (var ei = 0; ei < ACH_EVIDENCE_LAB.length; ei++) {
      for (var hi = 0; hi < ACH_HYPOTHESES.length; hi++) {
        var key = ACH_EVIDENCE_LAB[ei].id + '-' + ACH_HYPOTHESES[hi].id;
        if (labMatrix[key] && labMatrix[key] !== '') count++;
      }
    }
    return count === ACH_EVIDENCE_LAB.length * ACH_HYPOTHESES.length;
  }, [labMatrix]);

  const labFilledCount = useMemo(() => {
    let count = 0;
    for (var ei = 0; ei < ACH_EVIDENCE_LAB.length; ei++) {
      for (var hi = 0; hi < ACH_HYPOTHESES.length; hi++) {
        var key = ACH_EVIDENCE_LAB[ei].id + '-' + ACH_HYPOTHESES[hi].id;
        if (labMatrix[key] && labMatrix[key] !== '') count++;
      }
    }
    return count;
  }, [labMatrix]);

  const labAgreement = useMemo(() => {
    if (!labShowExpert) return null;
    let agree = 0;
    let total = ACH_EVIDENCE_LAB.length * ACH_HYPOTHESES.length;
    for (var ei = 0; ei < ACH_EVIDENCE_LAB.length; ei++) {
      for (var hi = 0; hi < ACH_HYPOTHESES.length; hi++) {
        var key = ACH_EVIDENCE_LAB[ei].id + '-' + ACH_HYPOTHESES[hi].id;
        var userVal = labMatrix[key] || '';
        var expertVal = ACH_EXPERT_RATINGS[key] || 'N';
        if (userVal === expertVal) agree++;
      }
    }
    return { agree: agree, total: total, pct: Math.round((agree / total) * 100) };
  }, [labMatrix, labShowExpert]);

  // Compute inconsistency counts for expert ratings
  const labExpertScores = useMemo(() => {
    var scores = {};
    ACH_HYPOTHESES.forEach(function(h) {
      var inconsistencies = 0;
      var consistencies = 0;
      ACH_EVIDENCE_LAB.forEach(function(e) {
        var val = ACH_EXPERT_RATINGS[e.id + '-' + h.id] || 'N';
        if (val === 'I' || val === 'II') inconsistencies++;
        if (val === 'C' || val === 'CC') consistencies++;
      });
      scores[h.id] = { inconsistencies: inconsistencies, consistencies: consistencies };
    });
    return scores;
  }, []);

  // SVG layout constants
  const SVG_W = 700;
  const SVG_H = 520;
  const ROW_LABEL_W = 210;
  const COL_HEADER_H = 90;
  const CELL_W = 100;
  const CELL_H = 40;
  const CELL_PAD = 2;

  // ── Render ─────────────────────────────────────────────────

  return (
    <div style={{
      minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: CI_SANS,
      position: 'relative',
    }}>

      {/* CLASSIFIED watermark */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) rotate(-30deg)',
        fontFamily: CI_MONO, fontSize: 140, fontWeight: 900,
        color: 'rgba(176,48,48,.025)', letterSpacing: '.15em',
        whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 0,
        userSelect: 'none',
      }}>
        CLASSIFIED
      </div>

      {/* Classification banner — TOP */}
      <ClassificationBanner />

      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(12,11,8,.96)', backdropFilter: 'blur(12px)', borderBottom: `2px solid ${C.red}40`, padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setView('coursework')} style={{ background: 'none', border: 'none', color: C.tx3, fontFamily: CI_MONO, fontSize: 11, cursor: 'pointer', letterSpacing: '.06em' }}>
          \u25C0 EXIT SCIF
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <RedStamp text="CLASSIFIED" />
          <span style={{ fontFamily: CI_MONO, fontSize: 12, color: C.redDm, fontWeight: 700, letterSpacing: '.06em' }}>{CI_CASE.classification}</span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 100px', position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <h1 style={{ fontFamily: CI_SERIF, fontSize: 28, fontWeight: 700, color: C.tx, letterSpacing: '-.02em' }}>
              Counterintelligence: Mole Hunt
              {DossierIcon}
              {EyeIcon}
            </h1>
            <RedStamp text="EYES ONLY" size={9} />
          </div>
          {TipBox('mole')}
          {TipBox('sdrs')}
          <p style={{ fontFamily: CI_MONO, fontSize: 11, color: C.redDm, marginBottom: 12, letterSpacing: '.06em' }}>MPAI 6785 // STRATEGIC CI DOCTRINE // OVERSIGHT ARCHITECTURE // CASE CANON</p>
          <p style={{ fontSize: 13, color: C.tx2, lineHeight: 1.6, maxWidth: '60ch' }}>
            You are a CI analyst investigating Operation BRICKWALL \u2014 three assets compromised in 72 hours. Six suspects had access. Apply ACH, weight evidence, and identify the penetration agent. The system tracks which cognitive biases influence your reasoning.
            {LockIcon}
          </p>
          {TipBox('comms')}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
            {CI_SKILLS.map(s => (
              <span key={s} style={{ padding: '3px 8px', borderRadius: 2, background: `${C.red}08`, border: `1px solid ${C.red}20`, fontSize: 10, fontFamily: CI_MONO, color: `${C.red}88`, letterSpacing: '.04em' }}>{s}</span>
            ))}
          </div>
        </div>

      {/* Classification banner — BOTTOM (fixed) */}
      <ClassificationBanner position="fixed-bottom" />

        {/* Mode tabs: Case vs ACH Lab — file folder tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 20 }}>
          <button onClick={() => setViewMode('case')} style={{
            padding: '8px 20px', background: viewMode === 'case' ? 'rgba(200,184,136,.06)' : 'transparent',
            border: `2px solid ${viewMode === 'case' ? C.redDm : C.line}`,
            borderBottom: viewMode === 'case' ? '2px solid transparent' : `2px solid ${C.line}`,
            borderRadius: '2px 2px 0 0', color: viewMode === 'case' ? C.red : C.tx3,
            fontFamily: CI_MONO, fontSize: 10, cursor: 'pointer', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
          }}>
            Operation BRICKWALL
          </button>
          <button onClick={() => setViewMode('achlab')} style={{
            padding: '8px 20px', background: viewMode === 'achlab' ? 'rgba(200,184,136,.06)' : 'transparent',
            border: `2px solid ${viewMode === 'achlab' ? C.amberDm : C.line}`,
            borderBottom: viewMode === 'achlab' ? '2px solid transparent' : `2px solid ${C.line}`,
            borderRadius: '2px 2px 0 0', color: viewMode === 'achlab' ? C.amber : C.tx3,
            fontFamily: CI_MONO, fontSize: 10, cursor: 'pointer', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
          }}>
            ACH Lab // The MERIDIAN Mole
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ── ACH LAB MODE ─────────────────────────────────────────── */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {viewMode === 'achlab' && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: CI_SERIF, fontSize: 22, fontWeight: 600, color: C.tx, marginBottom: 4 }}>
                ACH Lab: The MERIDIAN Mole
                {DossierIcon}
                {PolygraphIcon}
              </h2>
              {TipBox('mole')}
              {TipBox('polygraph')}
              <p style={{ fontFamily: CI_MONO, fontSize: 12, color: C.redDm, marginBottom: 10 }}>CLASSIFIED // EXERCISE ONLY</p>
              <p style={{ fontSize: 13, color: C.tx2, lineHeight: 1.6, maxWidth: '65ch' }}>
                A classified program has been compromised. Four suspects have been identified. Evaluate each piece of evidence against each hypothesis by clicking cells in the matrix. The cell cycles through: C (Consistent), CC (Strongly Consistent), N (Neutral), I (Inconsistent), II (Strongly Inconsistent).
              </p>
            </div>

            {/* Hypothesis cards — pinned to corkboard */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20, padding: 12, background: 'rgba(120,90,50,.04)', border: '1px solid rgba(120,90,50,.1)', borderRadius: 2 }}>
              {ACH_HYPOTHESES.map(h => (
                <div key={h.id} style={{ padding: 12, background: 'rgba(240,232,216,.04)', border: `1px solid rgba(120,110,90,.15)`, borderRadius: 2, borderLeft: `3px solid ${C.amber}`, position: 'relative', boxShadow: '1px 2px 4px rgba(0,0,0,.2)' }}>
                  <div style={{ position: 'absolute', top: -4, right: 12 }}>{React.createElement(CorkboardPin)}</div>
                  <span style={{ fontFamily: CI_MONO, fontSize: 11, color: C.amber, fontWeight: 700 }}>{h.id.toUpperCase()}</span>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#e8e0d0', marginTop: 2, marginBottom: 4 }}>{h.label}</p>
                  <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.65 }}>{h.description}</p>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, padding: '8px 12px', background: C.card, borderRadius: 4, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontFamily: CI_MONO, fontSize: 11, color: C.tx3 }}>LEGEND:</span>
              {ACH_CELL_CYCLE.filter(function(v) { return v !== ''; }).map(function(val) {
                return React.createElement('span', { key: val, style: { display: 'inline-flex', alignItems: 'center', gap: 4 } },
                  React.createElement('span', { style: { display: 'inline-block', width: 16, height: 16, borderRadius: 3, background: ACH_CELL_COLORS[val], textAlign: 'center', lineHeight: '16px', fontSize: 12, fontFamily: CI_MONO, color: '#fff', fontWeight: 700 } }, val),
                  React.createElement('span', { style: { fontSize: 11, color: C.tx2, fontFamily: CI_MONO } }, ACH_CELL_LABELS[val])
                );
              })}
              <span style={{ fontSize: 11, color: C.tx3, fontFamily: CI_MONO, marginLeft: 'auto' }}>
                {labFilledCount}/{ACH_EVIDENCE_LAB.length * ACH_HYPOTHESES.length} cells filled
              </span>
            </div>

            {/* SVG ACH Matrix */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ overflowX: 'auto', flex: '1 1 auto' }}>
                <svg
                  width={SVG_W}
                  height={SVG_H}
                  viewBox={'0 0 ' + SVG_W + ' ' + SVG_H}
                  style={{ display: 'block', background: 'rgba(14,18,26,.5)', borderRadius: 8, border: '1px solid ' + C.cardBd }}
                >
                  {/* Column headers (rotated) */}
                  {ACH_HYPOTHESES.map(function(h, hi) {
                    var cx = ROW_LABEL_W + hi * CELL_W + CELL_W / 2;
                    var cy = COL_HEADER_H - 8;
                    var shortLabel = h.label.split('\—')[0].trim();
                    return React.createElement('g', { key: h.id },
                      React.createElement('text', {
                        x: cx, y: cy,
                        textAnchor: 'start',
                        transform: 'rotate(-45,' + cx + ',' + cy + ')',
                        fill: C.amber,
                        fontSize: 12,
                        fontFamily: CI_MONO,
                        fontWeight: 600,
                      }, shortLabel),
                      React.createElement('line', {
                        x1: ROW_LABEL_W + hi * CELL_W, y1: COL_HEADER_H,
                        x2: ROW_LABEL_W + hi * CELL_W, y2: COL_HEADER_H + ACH_EVIDENCE_LAB.length * CELL_H,
                        stroke: C.line, strokeWidth: 1,
                      })
                    );
                  })}

                  {/* Right border */}
                  <line x1={ROW_LABEL_W + ACH_HYPOTHESES.length * CELL_W} y1={COL_HEADER_H}
                        x2={ROW_LABEL_W + ACH_HYPOTHESES.length * CELL_W} y2={COL_HEADER_H + ACH_EVIDENCE_LAB.length * CELL_H}
                        stroke={C.line} strokeWidth={1} />

                  {/* Header bottom line */}
                  <line x1={0} y1={COL_HEADER_H} x2={SVG_W} y2={COL_HEADER_H} stroke={C.line} strokeWidth={1} />

                  {/* Rows */}
                  {ACH_EVIDENCE_LAB.map(function(ev, ei) {
                    var ry = COL_HEADER_H + ei * CELL_H;
                    var weightColor = ev.weight === 'high' ? C.red : ev.weight === 'medium' ? C.amber : C.tx3;
                    var truncLabel = ev.label.length > 38 ? ev.label.slice(0, 35) + '...' : ev.label;

                    return React.createElement('g', { key: ev.id },
                      // Row background (alternating)
                      React.createElement('rect', {
                        x: 0, y: ry, width: SVG_W, height: CELL_H,
                        fill: ei % 2 === 0 ? 'rgba(255,255,255,.01)' : 'transparent',
                      }),

                      // Row bottom line
                      React.createElement('line', {
                        x1: 0, y1: ry + CELL_H, x2: SVG_W, y2: ry + CELL_H,
                        stroke: C.line, strokeWidth: 1,
                      }),

                      // Weight indicator
                      React.createElement('rect', {
                        x: 2, y: ry + 4, width: 3, height: CELL_H - 8,
                        fill: weightColor, rx: 1,
                      }),

                      // Evidence label (clickable for diagnosticity)
                      React.createElement('text', {
                        x: 10, y: ry + CELL_H / 2 + 4,
                        fill: labSelectedEvidence === ev.id ? C.amber : C.tx2,
                        fontSize: 12,
                        fontFamily: CI_MONO,
                        cursor: 'pointer',
                        onClick: function() { setLabSelectedEvidence(labSelectedEvidence === ev.id ? null : ev.id); },
                      },
                        React.createElement('title', null, ev.label),
                        truncLabel
                      ),

                      // Cells for each hypothesis
                      ACH_HYPOTHESES.map(function(h, hi) {
                        var cellKey = ev.id + '-' + h.id;
                        var val = labMatrix[cellKey] || '';
                        var cellX = ROW_LABEL_W + hi * CELL_W + CELL_PAD;
                        var cellY = ry + CELL_PAD;
                        var cellW = CELL_W - CELL_PAD * 2;
                        var cellH = CELL_H - CELL_PAD * 2;
                        var isHovered = labHoveredCell === cellKey;
                        var fillColor = val ? ACH_CELL_COLORS[val] : (isHovered ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.02)');
                        var strokeColor = val ? ACH_CELL_COLORS[val] : (isHovered ? 'rgba(255,255,255,.15)' : C.line);

                        return React.createElement('g', { key: cellKey },
                          React.createElement('rect', {
                            x: cellX, y: cellY, width: cellW, height: cellH,
                            rx: 4,
                            fill: val ? fillColor + '25' : fillColor,
                            stroke: strokeColor,
                            strokeWidth: val ? 1.5 : 1,
                            cursor: 'pointer',
                            onClick: function() { toggleLabCell(ev.id, h.id); },
                            onMouseEnter: function() { setLabHoveredCell(cellKey); },
                            onMouseLeave: function() { setLabHoveredCell(null); },
                          }),
                          React.createElement('text', {
                            x: cellX + cellW / 2, y: cellY + cellH / 2 + 4,
                            textAnchor: 'middle',
                            fill: val ? ACH_CELL_COLORS[val] : C.tx3,
                            fontSize: val === 'CC' || val === 'II' ? 11 : 13,
                            fontFamily: CI_MONO,
                            fontWeight: 700,
                            pointerEvents: 'none',
                          }, val || '\·')
                        );
                      })
                    );
                  })}
                </svg>
              </div>

              {/* Diagnosticity sidebar */}
              <div style={{ width: 240, flexShrink: 0 }}>
                {labSelectedEvidence ? (
                  <div style={{ padding: 14, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, borderLeft: '3px solid ' + C.amber }}>
                    <p style={{ fontFamily: CI_MONO, fontSize: 11, color: C.amber, marginBottom: 6, textTransform: 'uppercase' }}>Diagnosticity Analysis</p>
                    <p style={{ fontSize: 11, color: C.tx, fontWeight: 600, marginBottom: 6, lineHeight: 1.6 }}>
                      {ACH_EVIDENCE_LAB.find(function(e) { return e.id === labSelectedEvidence; }).label}
                    </p>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                      <span style={{ fontFamily: CI_MONO, fontSize: 12, padding: '2px 6px', borderRadius: 3, background: ACH_EVIDENCE_LAB.find(function(e) { return e.id === labSelectedEvidence; }).weight === 'high' ? C.redBg : ACH_EVIDENCE_LAB.find(function(e) { return e.id === labSelectedEvidence; }).weight === 'medium' ? C.amberBg : 'rgba(255,255,255,.05)', color: ACH_EVIDENCE_LAB.find(function(e) { return e.id === labSelectedEvidence; }).weight === 'high' ? C.red : ACH_EVIDENCE_LAB.find(function(e) { return e.id === labSelectedEvidence; }).weight === 'medium' ? C.amber : C.tx3, border: '1px solid ' + (ACH_EVIDENCE_LAB.find(function(e) { return e.id === labSelectedEvidence; }).weight === 'high' ? C.redDm + '40' : ACH_EVIDENCE_LAB.find(function(e) { return e.id === labSelectedEvidence; }).weight === 'medium' ? C.amberDm + '40' : C.line) }}>
                        WEIGHT: {ACH_EVIDENCE_LAB.find(function(e) { return e.id === labSelectedEvidence; }).weight.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6 }}>
                      {ACH_EVIDENCE_LAB.find(function(e) { return e.id === labSelectedEvidence; }).diagnosticity}
                    </p>
                    <p style={{ fontSize: 11, color: C.tx3, marginTop: 8, fontFamily: CI_MONO, lineHeight: 1.6 }}>
                      High-weight evidence that differentiates between hypotheses is more valuable than evidence consistent with all hypotheses.
                    </p>
                  </div>
                ) : (
                  <div style={{ padding: 14, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, borderLeft: '3px solid ' + C.line }}>
                    <p style={{ fontFamily: CI_MONO, fontSize: 11, color: C.tx3, marginBottom: 6, textTransform: 'uppercase' }}>Diagnosticity</p>
                    <p style={{ fontSize: 11, color: C.tx3, lineHeight: 1.65 }}>
                      Click an evidence label in the matrix to see its diagnostic value \— how well it differentiates between competing hypotheses.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Compare to Expert button */}
            {labAllFilled && !labShowExpert && (
              <button
                onClick={function() { setLabShowExpert(true); }}
                style={{ marginTop: 20, padding: '12px 28px', background: C.amber, border: 'none', borderRadius: 4, color: '#080a0e', fontFamily: CI_MONO, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
              >
                Compare to Expert Assessment \→
              </button>
            )}

            {!labAllFilled && !labShowExpert && (
              <p style={{ marginTop: 12, fontFamily: CI_MONO, fontSize: 12, color: C.tx3 }}>
                Fill all {ACH_EVIDENCE_LAB.length * ACH_HYPOTHESES.length} cells to unlock the expert comparison.
              </p>
            )}

            {/* Expert comparison */}
            {labShowExpert && (
              <div style={{ marginTop: 24 }}>
                {/* Agreement score */}
                {labAgreement && (
                  <div style={{ marginBottom: 20, padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, borderLeft: '3px solid ' + (labAgreement.pct >= 70 ? C.green : labAgreement.pct >= 50 ? C.amber : C.red) }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontFamily: CI_MONO, fontSize: 28, fontWeight: 700, color: labAgreement.pct >= 70 ? C.green : labAgreement.pct >= 50 ? C.amber : C.red }}>
                        {labAgreement.pct}%
                      </span>
                      <span style={{ fontFamily: CI_MONO, fontSize: 11, color: C.tx2 }}>
                        agreement with expert ({labAgreement.agree}/{labAgreement.total} cells match)
                      </span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,.05)', borderRadius: 3, overflow: 'hidden', marginBottom: 12 }}>
                      <div style={{ height: '100%', width: labAgreement.pct + '%', background: labAgreement.pct >= 70 ? C.green : labAgreement.pct >= 50 ? C.amber : C.red, borderRadius: 3, transition: 'width .3s' }} />
                    </div>
                  </div>
                )}

                {/* Expert matrix comparison */}
                <h3 style={{ fontFamily: CI_MONO, fontSize: 12, color: C.tx3, textTransform: 'uppercase', marginBottom: 10 }}>Your Ratings vs Expert</h3>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ borderCollapse: 'collapse', fontFamily: CI_MONO, fontSize: 12, width: '100%' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '6px 8px', textAlign: 'left', color: C.tx3, borderBottom: '1px solid ' + C.line, width: 200 }}>Evidence</th>
                        {ACH_HYPOTHESES.map(function(h) {
                          return React.createElement('th', { key: h.id, colSpan: 2, style: { padding: '6px 4px', textAlign: 'center', color: C.amber, borderBottom: '1px solid ' + C.line, fontSize: 11 } },
                            h.label.split('\—')[0].trim()
                          );
                        })}
                      </tr>
                      <tr>
                        <th style={{ padding: '3px 8px', borderBottom: '1px solid ' + C.line }}></th>
                        {ACH_HYPOTHESES.map(function(h) {
                          return React.createElement(React.Fragment, { key: h.id },
                            React.createElement('th', { style: { padding: '3px 4px', textAlign: 'center', color: C.tx3, borderBottom: '1px solid ' + C.line, fontSize: 12 } }, 'YOU'),
                            React.createElement('th', { style: { padding: '3px 4px', textAlign: 'center', color: C.tx3, borderBottom: '1px solid ' + C.line, fontSize: 12 } }, 'EXPERT')
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {ACH_EVIDENCE_LAB.map(function(ev) {
                        return React.createElement('tr', { key: ev.id },
                          React.createElement('td', { style: { padding: '5px 8px', color: C.tx2, borderBottom: '1px solid ' + C.line, fontSize: 11 } },
                            ev.label.length > 40 ? ev.label.slice(0, 37) + '...' : ev.label
                          ),
                          ACH_HYPOTHESES.map(function(h) {
                            var cellKey = ev.id + '-' + h.id;
                            var userVal = labMatrix[cellKey] || '';
                            var expertVal = ACH_EXPERT_RATINGS[cellKey] || 'N';
                            var match = userVal === expertVal;
                            return React.createElement(React.Fragment, { key: h.id },
                              React.createElement('td', { style: { padding: '4px', textAlign: 'center', borderBottom: '1px solid ' + C.line } },
                                React.createElement('span', { style: { display: 'inline-block', padding: '2px 6px', borderRadius: 3, background: (ACH_CELL_COLORS[userVal] || C.tx3) + '20', color: ACH_CELL_COLORS[userVal] || C.tx3, fontWeight: 700, fontSize: 12, border: match ? '1px solid ' + C.green + '40' : '1px solid transparent' } }, userVal || '-')
                              ),
                              React.createElement('td', { style: { padding: '4px', textAlign: 'center', borderBottom: '1px solid ' + C.line } },
                                React.createElement('span', { style: { display: 'inline-block', padding: '2px 6px', borderRadius: 3, background: (ACH_CELL_COLORS[expertVal] || C.tx3) + '20', color: ACH_CELL_COLORS[expertVal] || C.tx3, fontWeight: 700, fontSize: 12 } }, expertVal)
                              )
                            );
                          })
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Hypothesis survival analysis */}
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontFamily: CI_MONO, fontSize: 12, color: C.tx3, textTransform: 'uppercase', marginBottom: 10 }}>Hypothesis Survival (Expert Assessment)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {ACH_HYPOTHESES.map(function(h) {
                      var scores = labExpertScores[h.id];
                      var isWinner = h.id === 'h1';
                      return React.createElement('div', {
                        key: h.id,
                        style: {
                          padding: 14, background: C.card,
                          border: '1px solid ' + (isWinner ? C.green : C.cardBd),
                          borderRadius: 6,
                          borderLeft: '3px solid ' + (isWinner ? C.green : C.red),
                        }
                      },
                        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
                          React.createElement('span', { style: { fontFamily: CI_MONO, fontSize: 12, fontWeight: 700, color: isWinner ? C.green : C.tx2 } }, h.label.split('\—')[0].trim()),
                          isWinner && React.createElement('span', { style: { fontFamily: CI_MONO, fontSize: 12, padding: '2px 6px', borderRadius: 3, background: C.greenBg, color: C.green, border: '1px solid ' + C.greenDm + '40' } }, 'SURVIVES')
                        ),
                        React.createElement('div', { style: { display: 'flex', gap: 12, fontFamily: CI_MONO, fontSize: 11 } },
                          React.createElement('span', { style: { color: C.green } }, scores.consistencies + ' consistent'),
                          React.createElement('span', { style: { color: C.red } }, scores.inconsistencies + ' inconsistent')
                        ),
                        !isWinner && scores.inconsistencies > 0 && React.createElement('p', { style: { fontSize: 11, color: C.tx3, marginTop: 4 } },
                          scores.inconsistencies + ' inconsistenc' + (scores.inconsistencies === 1 ? 'y' : 'ies') + ' \— weakened'
                        )
                      );
                    })}
                  </div>
                </div>

                {/* Key Insight */}
                <div style={{ padding: 16, background: C.amberBg, border: '1px solid ' + C.amberDm + '30', borderRadius: 6, borderLeft: '4px solid ' + C.amber }}>
                  <p style={{ fontFamily: CI_MONO, fontSize: 12, color: C.amber, marginBottom: 8, textTransform: 'uppercase', fontWeight: 700 }}>Key Insight</p>
                  <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.7, marginBottom: 10 }}>
                    ACH works by focusing on <strong style={{ color: C.red }}>INCONSISTENCIES</strong>, not confirmations. The hypothesis with the <strong>fewest inconsistencies</strong> is the most likely \— not the one with the most confirmations.
                  </p>
                  <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, marginBottom: 10 }}>
                    ALPHA survives the analysis despite not having the most confirmations. GAMMA has the most confirmations (travel, timeline) but also the most inconsistencies (compartment access, financial). This is exactly the trap that ACH is designed to expose: our brains naturally seek confirming evidence, but the analytically rigorous approach is to seek <em>disconfirming</em> evidence.
                  </p>
                  <p style={{ fontSize: 11, color: C.tx3, lineHeight: 1.65 }}>
                    In intelligence analysis, this principle is critical. The most dangerous hypothesis is not the one that looks wrong \— it is the one that you cannot prove wrong with available evidence. ALPHA is dangerous precisely because no evidence rules ALPHA out.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ── CASE MODE (original content) ─────────────────────────── */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {viewMode === 'case' && (
          <div>
            {/* Phase nav */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: `2px solid ${C.line}`, paddingBottom: 0 }}>
              {CI_PHASES.map((p, i) => (
                <button key={p.id} onClick={() => setPhase(i)} style={{
                  padding: '6px 12px', background: phase === i ? 'rgba(200,184,136,.06)' : 'transparent',
                  border: phase === i ? `2px solid ${C.redDm}` : '2px solid transparent',
                  borderBottom: phase === i ? '2px solid transparent' : '2px solid transparent',
                  borderRadius: '2px 2px 0 0', color: phase === i ? C.red : i < phase ? C.green : C.tx3,
                  fontFamily: CI_MONO, fontSize: 10, cursor: 'pointer', fontWeight: 700,
                  letterSpacing: '.04em', textTransform: 'uppercase',
                  marginBottom: -2,
                }}>
                  {p.num}. {p.title}
                </button>
              ))}
            </div>

            {/* ── PHASE I: Case Briefing ── */}
            {phase === 0 && (
              <div>
                <h2 style={{ fontFamily: CI_SERIF, fontSize: 22, fontWeight: 600, color: C.tx, marginBottom: 16 }}>
                  Case Briefing: Operation {CI_CASE.codename}
                  {DossierIcon}
                </h2>
                {TipBox('mole')}
                {React.createElement(DossierCard, { tab: 'CASE FILE // ' + CI_CASE.codename, stamp: 'TOP SECRET', style: { marginBottom: 16 } },
                  React.createElement('p', { style: { fontFamily: CI_MONO, fontSize: 11, color: C.redDm, marginBottom: 8, letterSpacing: '.06em' } }, CI_CASE.classification),
                  React.createElement('p', { style: { fontFamily: CI_SERIF, fontSize: 14, color: '#e8e0d0', lineHeight: 1.6 } }, CI_CASE.summary)
                )}

                {/* Timeline */}
                <h3 style={{ fontFamily: CI_MONO, fontSize: 12, color: C.tx3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  Event Timeline
                  {DeadDropIcon}
                  {BrushIcon}
                </h3>
                {TipBox('deadDrop')}
                {TipBox('brush')}
                <div style={{ display: 'grid', gap: 4 }}>
                  {CI_CASE.timeline.map((t, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 12, padding: '6px 12px', background: i === CI_CASE.timeline.length - 1 ? C.redBg : C.card, borderRadius: 4, borderLeft: `2px solid ${i >= 4 ? C.red : C.blue}` }}>
                      <span style={{ fontFamily: CI_MONO, fontSize: 11, color: i >= 4 ? C.red : C.blue, fontWeight: 600 }}>{t.date}</span>
                      <span style={{ fontSize: 12, color: C.tx }}>{t.event}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => setPhase(1)} style={{ marginTop: 20, padding: '10px 24px', background: C.red, border: 'none', borderRadius: 4, color: '#fff', fontFamily: CI_MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                  Review Suspect Profiles \→
                </button>
              </div>
            )}

            {/* ── PHASE II: Suspect Profiles ── */}
            {phase === 1 && (
              <div>
                <h2 style={{ fontFamily: CI_SERIF, fontSize: 22, fontWeight: 600, color: C.tx, marginBottom: 4 }}>
                  Suspect Profiles
                  {EyeIcon}
                  {DangleIcon}
                </h2>
                {TipBox('sdrs')}
                {TipBox('dangle')}
                <p style={{ fontSize: 12, color: C.tx2, marginBottom: 16 }}>Click a suspect to examine their indicators. Rate each suspect's likelihood (1-10) to build your hypothesis.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {CI_SUSPECTS.map(s => {
                    const isSelected = selectedSuspect === s.id;
                    const rating = suspectRankings[s.id];
                    const totalScore = Object.values(s.indicators).reduce((sum, ind) => sum + ind.score, 0);
                    return (
                      <div key={s.id}>
                        <button
                          onClick={() => handleSuspectSelect(s.id)}
                          style={{
                            width: '100%', textAlign: 'left', padding: 0,
                            background: isSelected ? C.redBg : C.card,
                            border: `2px solid ${isSelected ? C.red : C.cardBd}`,
                            borderRadius: 2, cursor: 'pointer', color: C.tx,
                            overflow: 'hidden',
                            boxShadow: '2px 3px 8px rgba(0,0,0,.25)',
                          }}
                        >
                          {/* Mugshot-style manila header */}
                          <div style={{ background: 'rgba(200,184,136,.07)', borderBottom: '1px solid rgba(120,110,90,.12)', padding: '4px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontFamily: CI_MONO, fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color: '#a09060' }}>SUSPECT FILE</span>
                            {isSelected && React.createElement(RedStamp, { text: 'UNDER REVIEW', size: 8 })}
                          </div>
                          <div style={{ padding: 14 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <span style={{ fontFamily: CI_MONO, fontSize: 12, color: C.red, fontWeight: 700 }}>{s.id}</span>
                            {rating && <span style={{ fontFamily: CI_MONO, fontSize: 12, padding: '2px 6px', borderRadius: 2, background: rating >= 7 ? C.redBg : rating >= 4 ? C.amberBg : C.greenBg, color: rating >= 7 ? C.red : rating >= 4 ? C.amber : C.green, fontWeight: 700 }}>{rating}/10</span>}
                          </div>
                          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{s.name}</p>
                          <p style={{ fontSize: 11, color: C.tx2 }}>{s.role}</p>

                          {/* Indicator bars */}
                          <div style={{ display: 'flex', gap: 3, marginTop: 8 }}>
                            {Object.entries(s.indicators).map(([key, ind]) => (
                              <div key={key} style={{ flex: 1 }}>
                                <div style={{ height: 6, background: `${C.red}15`, borderRadius: 2, overflow: 'hidden' }}>
                                  <div style={{ height: '100%', width: `${ind.score * 10}%`, background: ind.score >= 7 ? C.red : ind.score >= 4 ? C.amber : C.green, borderRadius: 2 }} />
                                </div>
                                <span style={{ fontSize: 10, color: C.tx3, fontFamily: CI_MONO }}>{key.slice(0,3)}</span>
                              </div>
                            ))}
                          </div>
                          </div>
                        </button>

                        {/* Expanded detail — intelligence report style */}
                        {isSelected && (
                          <div style={{ padding: '12px 14px', background: 'rgba(240,232,216,.03)', border: `1px solid ${C.cardBd}`, borderTop: 'none', borderRadius: '0 0 2px 2px' }}>
                            {Object.entries(s.indicators).map(([key, ind]) => (
                              <div key={key} style={{ marginBottom: 8, padding: '6px 8px', background: C.card, borderRadius: 4, borderLeft: `2px solid ${ind.score >= 7 ? C.red : ind.score >= 4 ? C.amber : C.green}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                  <span style={{ fontFamily: CI_MONO, fontSize: 11, color: C.tx3, textTransform: 'uppercase' }}>{key}</span>
                                  <span style={{ fontFamily: CI_MONO, fontSize: 11, color: ind.score >= 7 ? C.red : ind.score >= 4 ? C.amber : C.green }}>{ind.score}/10</span>
                                </div>
                                <p style={{ fontSize: 11, color: C.tx, lineHeight: 1.65, marginBottom: 4 }}>{ind.details}</p>
                                <p style={{ fontSize: 12, color: C.green, lineHeight: 1.6, fontStyle: 'italic' }}>Innocent explanation: {ind.innocent}</p>
                              </div>
                            ))}

                            {/* Tradecraft context icons */}
                            <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 6 }}>
                              {PolygraphIcon}
                              {DeadDropIcon}
                              {LockIcon}
                            </div>
                            {TipBox('polygraph')}
                            {TipBox('deadDrop')}
                            {TipBox('comms')}

                            {/* Rating slider */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, padding: '8px', background: C.redBg, borderRadius: 4 }}>
                              <span style={{ fontFamily: CI_MONO, fontSize: 11, color: C.tx3 }}>LIKELIHOOD</span>
                              <input type="range" min={1} max={10} value={suspectRankings[s.id] || 5}
                                onChange={(e) => rateSuspect(s.id, Number(e.target.value))}
                                style={{ flex: 1, accentColor: C.red }} />
                              <span style={{ fontFamily: CI_MONO, fontSize: 12, color: C.red, fontWeight: 600, width: 30, textAlign: 'right' }}>{suspectRankings[s.id] || 5}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bias tracker */}
                {biasesTriggered.size > 0 && (
                  <div style={{ marginTop: 16, padding: 12, background: C.amberBg, border: `1px solid ${C.amberDm}30`, borderRadius: 6 }}>
                    <p style={{ fontFamily: CI_MONO, fontSize: 11, color: C.amber, marginBottom: 6, textTransform: 'uppercase' }}>Cognitive Bias Alert</p>
                    {Array.from(biasesTriggered).map(id => {
                      const bias = CI_BIASES.find(b => b.id === id);
                      return bias ? (
                        <p key={id} style={{ fontSize: 11, color: C.tx2, marginBottom: 4 }}>
                          <strong style={{ color: C.amber }}>{bias.name}:</strong> {bias.trap}
                        </p>
                      ) : null;
                    })}
                  </div>
                )}

                <button onClick={() => setPhase(2)} style={{ marginTop: 20, padding: '10px 24px', background: C.red, border: 'none', borderRadius: 4, color: '#fff', fontFamily: CI_MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                  Apply ACH Matrix \→
                </button>
              </div>
            )}

            {/* ── PHASE III: ACH Matrix ── */}
            {phase === 2 && (
              <div>
                <h2 style={{ fontFamily: CI_SERIF, fontSize: 22, fontWeight: 600, color: C.tx, marginBottom: 4 }}>
                  Analysis of Competing Hypotheses
                  {PolygraphIcon}
                </h2>
                {TipBox('polygraph')}
                <p style={{ fontSize: 12, color: C.tx2, marginBottom: 16 }}>
                  For each suspect-evidence pair, mark whether the evidence is <strong style={{ color: C.red }}>Consistent (C)</strong>, <strong style={{ color: C.green }}>Inconsistent (I)</strong>, or <strong style={{ color: C.tx3 }}>Neutral (\—)</strong> with the hypothesis that this suspect is the mole.
                </p>

                {/* ACH Grid */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: CI_MONO, fontSize: 12 }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '8px 6px', textAlign: 'left', color: C.tx3, borderBottom: `1px solid ${C.line}`, width: 120 }}>Evidence</th>
                        {CI_SUSPECTS.map(s => (
                          <th key={s.id} style={{ padding: '8px 4px', textAlign: 'center', color: C.tx2, borderBottom: `1px solid ${C.line}`, fontSize: 11 }}>
                            {s.id}<br/><span style={{ fontSize: 10, color: C.tx3 }}>{s.name.split(',')[0]}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ACH_EVIDENCE.map(ev => (
                        <tr key={ev.key}>
                          <td style={{ padding: '6px', color: C.tx2, borderBottom: `1px solid ${C.line}` }}>{ev.label}</td>
                          {CI_SUSPECTS.map(s => {
                            const cellKey = `${s.id}-${ev.key}`;
                            const val = achMatrix[cellKey] || 'untested';
                            return (
                              <td key={s.id} style={{ padding: 4, textAlign: 'center', borderBottom: `1px solid ${C.line}` }}>
                                <button
                                  onClick={() => toggleACH(s.id, ev.key)}
                                  style={{
                                    width: 28, height: 28, borderRadius: 4,
                                    background: val === 'untested' ? 'rgba(255,255,255,.03)' : `${achColors[val]}15`,
                                    border: `1px solid ${val === 'untested' ? C.line : achColors[val]}`,
                                    color: achColors[val], fontSize: 11, fontWeight: 700,
                                    cursor: 'pointer', fontFamily: CI_MONO,
                                  }}
                                >
                                  {achLabels[val]}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ACH summary — count inconsistents per suspect */}
                <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
                  {CI_SUSPECTS.map(s => {
                    const inconsistentCount = ACH_EVIDENCE.filter(ev => achMatrix[`${s.id}-${ev.key}`] === 'inconsistent').length;
                    const consistentCount = ACH_EVIDENCE.filter(ev => achMatrix[`${s.id}-${ev.key}`] === 'consistent').length;
                    return (
                      <div key={s.id} style={{ flex: 1, padding: 8, background: C.card, borderRadius: 4, textAlign: 'center' }}>
                        <p style={{ fontFamily: CI_MONO, fontSize: 12, color: C.tx2, marginBottom: 4 }}>{s.id}</p>
                        <p style={{ fontFamily: CI_MONO, fontSize: 14, color: consistentCount > inconsistentCount ? C.red : C.green, fontWeight: 700 }}>
                          {consistentCount}C / {inconsistentCount}I
                        </p>
                      </div>
                    );
                  })}
                </div>

                <p style={{ fontSize: 11, color: C.tx3, marginTop: 12, lineHeight: 1.65 }}>
                  ACH principle: focus on <strong style={{ color: C.green }}>disconfirming</strong> evidence, not confirming. The suspect with the <strong>fewest inconsistencies</strong> is the strongest hypothesis — not the one with the most red flags.
                  {DangleIcon}
                </p>
                {TipBox('dangle')}

                <button onClick={() => setPhase(3)} style={{ marginTop: 20, padding: '10px 24px', background: C.red, border: 'none', borderRadius: 4, color: '#fff', fontFamily: CI_MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                  Submit Assessment \→
                </button>
              </div>
            )}

            {/* ── PHASE IV: CI Assessment ── */}
            {phase === 3 && (
              <div>
                <h2 style={{ fontFamily: CI_SERIF, fontSize: 22, fontWeight: 600, color: C.tx, marginBottom: 4 }}>
                  CI Assessment
                  {DossierIcon}
                </h2>
                {TipBox('mole')}
                <p style={{ fontSize: 12, color: C.tx2, marginBottom: 16 }}>Select your primary suspect and submit your assessment.</p>

                {/* Suspect ranking */}
                <div style={{ display: 'grid', gap: 4, marginBottom: 20 }}>
                  {rankedSuspects.map((s, i) => {
                    const rating = suspectRankings[s.id] || 0;
                    const isSelected = selectedAssessment === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedAssessment(s.id)}
                        style={{
                          display: 'grid', gridTemplateColumns: '30px 1fr 60px 60px',
                          gap: 8, alignItems: 'center', padding: '10px 14px', textAlign: 'left',
                          background: isSelected ? C.redBg : C.card,
                          border: `1px solid ${isSelected ? C.red : C.cardBd}`,
                          borderRadius: 6, cursor: 'pointer', color: C.tx,
                        }}
                      >
                        <span style={{ fontFamily: CI_MONO, fontSize: 14, color: i === 0 ? C.red : C.tx3, fontWeight: 700 }}>#{i + 1}</span>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</p>
                          <p style={{ fontSize: 12, color: C.tx2 }}>{s.role}</p>
                        </div>
                        <span style={{ fontFamily: CI_MONO, fontSize: 12, color: rating >= 7 ? C.red : C.tx3 }}>{rating || '\—'}/10</span>
                        <span style={{ fontFamily: CI_MONO, fontSize: 11, color: C.tx3 }}>
                          {Object.values(s.indicators).reduce((sum, ind) => sum + ind.score, 0)} pts
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedAssessment && !assessmentSubmitted && (
                  <button
                    onClick={() => setAssessmentSubmitted(true)}
                    style={{ padding: '12px 28px', background: C.red, border: 'none', borderRadius: 4, color: '#fff', fontFamily: CI_MONO, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                  >
                    Submit Assessment: {CI_SUSPECTS.find(s => s.id === selectedAssessment)?.name} \→
                  </button>
                )}

                {assessmentSubmitted && (
                  <div style={{ marginTop: 20, padding: 16, background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 6 }}>
                    <h3 style={{ fontFamily: CI_MONO, fontSize: 11, color: C.amber, marginBottom: 12, textTransform: 'uppercase' }}>Assessment Debrief</h3>

                    {/* Bias analysis */}
                    <div style={{ marginBottom: 16 }}>
                      <p style={{ fontFamily: CI_MONO, fontSize: 11, color: C.tx3, marginBottom: 6 }}>COGNITIVE BIAS AUDIT</p>
                      {CI_BIASES.map(bias => (
                        <div key={bias.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', marginBottom: 2, background: biasesTriggered.has(bias.id) ? C.amberBg : 'transparent', borderRadius: 3 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: biasesTriggered.has(bias.id) ? C.amber : C.green, flexShrink: 0 }} />
                          <span style={{ fontSize: 11, color: biasesTriggered.has(bias.id) ? C.amber : C.tx2 }}>
                            <strong>{bias.name}</strong>: {bias.desc}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.6 }}>
                      In a real CI investigation, the answer is never this clean. Multiple suspects may warrant continued investigation. The purpose of ACH is not to identify the mole with certainty — it is to expose which hypotheses your evidence actually supports and which cognitive biases are shaping your judgment. The strongest CI analyst is not the one who guesses right, but the one who knows what they don't know.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── PHASE V: Tradecraft & Doctrine ── */}
            {phase === 4 && (
              <div>
                <h2 style={{ fontFamily: CI_SERIF, fontSize: 22, fontWeight: 600, color: C.tx, marginBottom: 8 }}>
                  CI Tradecraft & Doctrine
                  {EyeIcon}
                  {BrushIcon}
                  {DeadDropIcon}
                </h2>
                {TipBox('sdrs')}
                {TipBox('brush')}
                {TipBox('deadDrop')}
                <div style={{ display: 'grid', gap: 8 }}>
                  {[
                    { title: 'CI as Governed Power System', desc: 'Counterintelligence is not just threat detection — it is the exercise of state power that requires oversight architecture, legitimacy metrics, and abuse-mode governance. The CI Bible framework treats authority-constraint matrices and candour/verification controls as first-class doctrine.', source: 'CIAB + GCI Companion Bible' },
                    { title: 'Failure Ecology', desc: 'CI failures are not isolated events — they are ecological. The comparative case canon (NotPetya, SolarWinds, Colonial Pipeline, Volt Typhoon, OPM, XZ Utils, Wen Ho Lee) reveals patterns: how detection systems fail, how damage cascades, and how institutional responses create new vulnerabilities.', source: 'Gap Companion Bible — Case Canon' },
                    { title: 'Base-Rate Discipline', desc: 'Most anomalous behavior is innocent. Threshold calibration for detection/screening must account for base rates — the ratio of true threats to false positives. Without this discipline, CI operations create more damage through false accusations than adversary penetrations cause.', source: 'CIAB — Detection/Screening Module' },
                    { title: 'Deception in the Age of AI', desc: 'Data poisoning as counterintelligence tradecraft: adversarial manipulation of training data, model weights, and inference pipelines. The semester project operationalized these concepts within the CI Bible\'s doctrinal framework — validation tradecraft, damage assessment, and attribution in ML environments.', source: 'Semester Project — AI Deception' },
                    { title: 'Oversight Architecture', desc: 'Authority-constraint matrices define what CI can and cannot do. Mission-creep dashboards detect when operations exceed their mandate. Candour/verification controls ensure internal accountability. Without these, CI becomes the threat it was designed to counter.', source: 'GCI Companion Bible — Oversight Module' },
                  ].map(item => (
                    <div key={item.title} style={{ padding: 14, background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 6, borderLeft: `3px solid ${C.red}` }}>
                      <p style={{ fontFamily: CI_SERIF, fontSize: 15, fontWeight: 600, color: C.tx, marginBottom: 6 }}>{item.title}</p>
                      <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, marginBottom: 6 }}>{item.desc}</p>
                      <p style={{ fontFamily: CI_MONO, fontSize: 11, color: C.tx3 }}>Source: {item.source}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── PHASE VI: Sources & Provenance ── */}
            {phase === 5 && (
              <div>
                <h2 style={{ fontFamily: CI_SERIF, fontSize: 22, fontWeight: 600, color: C.tx, marginBottom: 16 }}>
                  Sources & Provenance
                  {LockIcon}
                </h2>
                {TipBox('comms')}
                <div style={{ display: 'grid', gap: 6 }}>
                  {[
                    { tier: 'Direct Course Teaching', color: C.blue, items: [
                      'Course Bible (CIAB v0.1): 32-source packet, 13-module spine, CI-#### compendium entries',
                      'Gap Companion Bible v1.0: 19-tranche gap-repair doctrine with audit-ready provenance',
                      'Curriculum Audit: Module-by-module coverage matrix with 25 GAP-### closures',
                    ] },
                    { tier: 'Semester Project', color: C.amber, items: [
                      'Deception in the Age of AI: Data Poisoning as Counterintelligence Tradecraft',
                      'Adversarial ML tradecraft operationalized within CIAB doctrinal framework',
                    ] },
                    { tier: 'Companion Doctrine', color: C.green, items: [
                      'Oversight architecture and abuse-mode governance (authority-constraint matrices)',
                      'Comparative case canon: NotPetya, SolarWinds, Colonial Pipeline, Volt Typhoon, OPM, XZ Utils, Wen Ho Lee',
                      'Measurement and evaluation science (counterfactual problem, anti-Goodhart controls)',
                      'Research security and foreign talent recruitment governance',
                    ] },
                  ].map(section => (
                    <div key={section.tier} style={{ padding: 12, background: C.card, border: `1px solid ${C.cardBd}`, borderLeft: `3px solid ${section.color}`, borderRadius: 6 }}>
                      <p style={{ fontFamily: CI_MONO, fontSize: 12, color: section.color, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>{section.tier}</p>
                      {section.items.map((item, i) => (
                        <p key={i} style={{ fontSize: 11, color: C.tx2, lineHeight: 1.65, marginBottom: 4, paddingLeft: 12, borderLeft: `2px solid ${section.color}30` }}>{item}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Forward nav */}
            {phase > 1 && phase < CI_PHASES.length - 1 && (
              <button onClick={() => setPhase(phase + 1)} style={{ marginTop: 24, padding: '10px 24px', background: 'transparent', border: `1px solid ${C.line}`, borderRadius: 4, color: C.tx3, fontFamily: CI_MONO, fontSize: 11, cursor: 'pointer' }}>
                Continue to {CI_PHASES[phase + 1]?.title} \→
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
