// ICAnalysisView.jsx — Intelligence Cycle Engine
// Intro to Applied Intelligence (MPAI 5600)
//
// Interactive walkthrough of the 6-phase intelligence cycle (Lowenthal).
// The visitor steps through a real-world scenario ("The Caracas Question"),
// making decisions at each phase that affect the quality of the final
// intelligence product. Demonstrates how early-stage failures cascade.
// Globals: useState, useCallback, useMemo from React

// ── Palette: Intelligence Agency Briefing Room ─────────────
const IC_C = {
  bg: '#060814',
  card: 'rgba(10,14,30,.94)',
  cardBd: 'rgba(60,80,140,.14)',
  tx: '#c0c8d8',
  tx2: '#7880a0',
  tx3: '#4a5070',
  navy: '#0e1830',
  navyLt: '#1a2848',
  gold: '#c8a84c',
  goldDm: '#9a8238',
  goldBg: 'rgba(200,168,76,.06)',
  blue: '#4878b8',
  blueDm: '#3668a0',
  blueBg: 'rgba(72,120,184,.06)',
  red: '#b04848',
  redDm: '#8a3232',
  redBg: 'rgba(176,72,72,.06)',
  green: '#48a068',
  greenDm: '#388050',
  greenBg: 'rgba(72,160,104,.06)',
  amber: '#c89038',
  amberDm: '#a07028',
  amberBg: 'rgba(200,144,56,.06)',
  line: 'rgba(60,80,140,.12)',
  white: '#e0e4f0',
  sealGold: 'rgba(200,168,76,.04)',
};
const IC_Mono = "'IBM Plex Mono',monospace";
const IC_Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const IC_Sans = "'Inter',Helvetica,sans-serif";

// ── Briefing Room Background: Seal Watermark + World Map ─────
const BriefingRoomBg = () => React.createElement('div', {
  style: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }
},
  React.createElement('svg', { width: '100%', height: '100%', viewBox: '0 0 1200 900', preserveAspectRatio: 'xMidYMid slice', style: { position: 'absolute' } },
    // World map silhouette (simplified continents)
    React.createElement('g', { opacity: 0.025, fill: '#4878b8' },
      // North America
      React.createElement('path', { d: 'M150,200 Q180,160 220,180 L260,170 Q300,150 320,180 L340,200 Q350,240 330,280 L310,300 Q290,340 260,320 L220,330 Q180,320 170,280 L160,240 Z' }),
      // South America
      React.createElement('path', { d: 'M260,350 Q280,340 290,360 L300,400 Q310,440 300,480 L280,510 Q260,530 240,500 L230,460 Q220,420 240,380 Z' }),
      // Europe
      React.createElement('path', { d: 'M520,180 Q550,160 580,170 L610,180 Q630,200 620,220 L600,240 Q580,250 560,240 L540,220 Q520,210 520,190 Z' }),
      // Africa
      React.createElement('path', { d: 'M540,260 Q560,250 580,270 L600,310 Q610,360 600,410 L580,440 Q560,460 540,440 L520,400 Q510,350 520,300 Z' }),
      // Asia
      React.createElement('path', { d: 'M640,160 Q700,140 760,160 L820,180 Q880,200 900,240 L880,280 Q840,300 780,290 L720,270 Q680,260 660,230 L640,200 Z' }),
      // Australia
      React.createElement('path', { d: 'M860,400 Q900,380 930,400 L940,430 Q930,460 900,460 L870,440 Q850,420 860,400 Z' }),
    ),
    // Agency seal watermark (concentric circles with star)
    React.createElement('g', { opacity: 0.03, transform: 'translate(600,450)' },
      React.createElement('circle', { cx: 0, cy: 0, r: 200, fill: 'none', stroke: '#c8a84c', strokeWidth: 2 }),
      React.createElement('circle', { cx: 0, cy: 0, r: 180, fill: 'none', stroke: '#c8a84c', strokeWidth: 1 }),
      React.createElement('circle', { cx: 0, cy: 0, r: 160, fill: 'none', stroke: '#c8a84c', strokeWidth: 0.5 }),
      React.createElement('circle', { cx: 0, cy: 0, r: 60, fill: 'none', stroke: '#c8a84c', strokeWidth: 1.5 }),
      // Star points
      React.createElement('polygon', { points: '0,-70 8,-20 55,-40 20,-5 55,30 8,15 0,65 -8,15 -55,30 -20,-5 -55,-40 -8,-20', fill: '#c8a84c', opacity: 0.5 }),
      // Compass points
      React.createElement('line', { x1: 0, y1: -180, x2: 0, y2: -160, stroke: '#c8a84c', strokeWidth: 1 }),
      React.createElement('line', { x1: 180, y1: 0, x2: 160, y2: 0, stroke: '#c8a84c', strokeWidth: 1 }),
      React.createElement('line', { x1: 0, y1: 180, x2: 0, y2: 160, stroke: '#c8a84c', strokeWidth: 1 }),
      React.createElement('line', { x1: -180, y1: 0, x2: -160, y2: 0, stroke: '#c8a84c', strokeWidth: 1 }),
    ),
  )
);

// ── Quality Gauge Dial ───────────────────────────────────────
const QualityGauge = ({ score, grade, color, label }) => {
  const angle = -90 + (score / 100) * 180;
  const r = 60;
  const cx = 70, cy = 70;
  const needleX = cx + r * 0.85 * Math.cos(angle * Math.PI / 180);
  const needleY = cy + r * 0.85 * Math.sin(angle * Math.PI / 180);
  return React.createElement('svg', { width: 140, height: 90, viewBox: '0 0 140 90' },
    // Gauge arc background
    React.createElement('path', {
      d: 'M 10 70 A 60 60 0 0 1 130 70',
      fill: 'none', stroke: 'rgba(60,80,140,.15)', strokeWidth: 8, strokeLinecap: 'round',
    }),
    // Gauge arc colored portion
    React.createElement('path', {
      d: `M 10 70 A 60 60 0 ${score > 50 ? 1 : 0} 1 ${cx + r * Math.cos(angle * Math.PI / 180)} ${cy + r * Math.sin(angle * Math.PI / 180)}`,
      fill: 'none', stroke: color, strokeWidth: 8, strokeLinecap: 'round', opacity: 0.7,
    }),
    // Needle
    React.createElement('line', { x1: cx, y1: cy, x2: needleX, y2: needleY, stroke: color, strokeWidth: 2.5 }),
    React.createElement('circle', { cx: cx, cy: cy, r: 4, fill: color }),
    // Score text
    React.createElement('text', { x: cx, y: cy - 14, textAnchor: 'middle', fill: color, fontSize: 22, fontWeight: 700, fontFamily: IC_Mono }, score),
    // Grade label
    React.createElement('text', { x: cx, y: 88, textAnchor: 'middle', fill: 'rgba(192,200,216,.4)', fontSize: 9, fontFamily: IC_Mono, letterSpacing: 1 }, label || ''),
    // Min/max
    React.createElement('text', { x: 8, y: 84, fill: 'rgba(192,200,216,.25)', fontSize: 7, fontFamily: IC_Mono }, '0'),
    React.createElement('text', { x: 126, y: 84, fill: 'rgba(192,200,216,.25)', fontSize: 7, fontFamily: IC_Mono }, '100'),
  );
};

// ── Static data (outside component) ────────────────────────

const IC_SKILLS = [
  'Intelligence Cycle (Lowenthal)', 'Collection Management', 'ICD-203 Analytic Standards',
  'OSINT / HUMINT / SIGINT / GEOINT', 'Dissemination Protocols', 'Consumer Feedback',
  'PIR Formulation', 'Source Evaluation', 'Confidence Calibration', 'Write-to-Release',
];

const IC_PHASES = [
  { id: 'planning', num: '1', title: 'Planning & Direction', icon: '\u{1F3AF}' },
  { id: 'collection', num: '2', title: 'Collection', icon: '\u{1F4E1}' },
  { id: 'processing', num: '3', title: 'Processing & Exploitation', icon: '\u{2699}' },
  { id: 'analysis', num: '4', title: 'Analysis & Production', icon: '\u{1F4CA}' },
  { id: 'dissemination', num: '5', title: 'Dissemination', icon: '\u{1F4E8}' },
  { id: 'feedback', num: '6', title: 'Feedback & Evaluation', icon: '\u{1F504}' },
];

const IC_SCENARIO = {
  title: 'The Caracas Question',
  classification: 'SECRET // NOFORN',
  consumer: 'Senior NSC Director for Western Hemisphere Affairs',
  question: 'Will Venezuela\'s government survive the next 6 months?',
  context: 'Mass protests have erupted in Caracas and three major cities following disputed elections. Military units in the west have gone silent on routine communications. Two senior officials have fled to Colombia. Oil production has dropped 40% in three weeks. The NSC Director needs an assessment for a Principals Committee meeting in 72 hours.',
};

const IC_PIR_OPTIONS = [
  { id: 'vague', text: 'What is the political situation in Venezuela?', quality: 25, feedback: 'Too vague. This PIR could mean anything. The analyst has no clear target and will produce a broad, unfocused product. This mirrors the "requirement creep" that plagued pre-9/11 collection — everyone collected everything, nobody collected the right thing.' },
  { id: 'medium', text: 'How stable is the Maduro government and what are the threats to its survival?', quality: 60, feedback: 'Better — identifies the target (Maduro government) and the dimension (stability/threats). But "threats" is still broad. The analyst must still guess what the consumer considers a relevant threat versus background noise.' },
  { id: 'precise', text: 'What is the likelihood that Venezuelan military leadership will withdraw support from Maduro within 6 months, and what indicators would signal this shift?', quality: 95, feedback: 'Excellent. This PIR is specific, time-bound, identifies the key variable (military loyalty), and requests indicators for ongoing monitoring. An analyst receiving this knows exactly what to collect against and how to structure the assessment.' },
  { id: 'biased', text: 'Confirm that Venezuela\'s government will collapse so we can prepare contingency plans.', quality: 10, feedback: 'Dangerous. This PIR presumes the answer and asks intelligence to confirm policy preferences. This is the Iraq WMD pattern — when the requirement assumes the conclusion, analysts face enormous pressure to deliver confirming evidence. The result was an NIE with "high confidence" on weapons that did not exist.' },
];

const IC_COLLECTION_ASSETS = [
  { id: 'humint_embassy', name: 'Embassy HUMINT', int: 'HUMINT', cost: 2, value: 85, risk: 'Moderate', desc: 'CIA Station in Caracas has three sources: a mid-level military officer (CARDINAL), a Maduro inner-circle contact (GRANITE), and a journalist with opposition ties (MARBLE). Station reports take 24-48h to process.', failure: 'Pearl Harbor parallel: HUMINT existed but was dismissed because it contradicted the prevailing assumption.' },
  { id: 'sigint_military', name: 'Military SIGINT', int: 'SIGINT', cost: 3, value: 90, risk: 'Low', desc: 'NSA intercepts of Venezuelan military communications. Western garrison command net has gone dark — either COMSEC change or deliberate blackout. Intercepts of remaining nets show increased encrypted traffic between Caracas and Maracaibo.', failure: 'Yom Kippur parallel: signals existed in massive volume but were dismissed as routine exercise traffic.' },
  { id: 'geoint_bases', name: 'GEOINT — Military Bases', int: 'GEOINT', cost: 2, value: 70, risk: 'Low', desc: 'NGA satellite imagery of Venezuelan military installations. Recent pass shows unusual vehicle movements at Fort Tiuna (Caracas garrison). Armored vehicles repositioned from motor pool to perimeter. Ammunition bunkers show activity.', failure: 'Iraq WMD parallel: imagery of "mobile biological weapons labs" that turned out to be weather balloon inflation trucks.' },
  { id: 'osint_media', name: 'Venezuelan Open Source', int: 'OSINT', cost: 1, value: 55, risk: 'None', desc: 'Social media monitoring, Venezuelan state/independent media. Massive volume — 40K+ posts/day mentioning "Maduro." Sentiment analysis shows spike in military-related keywords. Several state TV anchors have not appeared for 3 days.', failure: '9/11 parallel: the information was publicly available but nobody was tasked to look at it systematically.' },
  { id: 'humint_liaison', name: 'Colombian Liaison', int: 'HUMINT', cost: 1, value: 50, risk: 'Low', desc: 'Colombian intelligence service (DNI) reporting on Venezuelan refugees and defectors crossing the border. Two senior officials who fled may agree to debriefing. Colombian reporting is often delayed 72h.', failure: 'Collection bias: relying on a single partner service means inheriting their biases and access limitations.' },
  { id: 'sigint_comms', name: 'Leadership SIGINT', int: 'SIGINT', cost: 4, value: 95, risk: 'High', desc: 'Attempted intercept of Maduro\'s personal communications and inner-circle encrypted channels. Extremely high value if successful. Requires tasking of sensitive national assets; risk of compromise if Venezuelan COMSEC detects collection attempt.', failure: 'Risk-reward: the most valuable collection is often the most fragile. Losing this access could blind the IC for months.' },
];

const IC_RAW_REPORTS = [
  { id: 'r1', source: 'CARDINAL (HUMINT)', classification: 'TOP SECRET // HCS', reliability: 'B-2', content: 'Source reports that General Hernandez (Western Command) told subordinates to "prepare for any contingency" — interpreted by source as possible disloyalty. However, source notes this phrase is used routinely during political unrest and may mean nothing.', ambiguity: 'high', trueSignal: true },
  { id: 'r2', source: 'NSA SIGINT', classification: 'TOP SECRET // SI', reliability: 'A-1', content: 'FLASH: Intercepted communication between Maracaibo garrison CO and unknown party in Bogota. Content encrypted (unbroken) but metadata shows 14 calls in 72 hours. Previous baseline: 0-1 calls/month to Colombian numbers.', ambiguity: 'medium', trueSignal: true },
  { id: 'r3', source: 'NGA GEOINT', classification: 'SECRET', reliability: 'A-2', content: 'Imagery analysis of Fort Tiuna shows 12 armored vehicles moved from motor pool to east perimeter, oriented outward. Three helicopters on pad with rotors folded (not flight-ready). Assessment: defensive posture or routine maintenance — imagery alone is ambiguous.', ambiguity: 'high', trueSignal: false },
  { id: 'r4', source: 'OSINT Monitor', classification: 'UNCLASSIFIED', reliability: 'C-3', content: 'Twitter account @VZLAMilWatch (15K followers, previously reliable on military movements) reports "armored column moving south from Maracay toward Caracas." Geolocated video shows 4 APCs on highway. Cannot confirm destination or intent.', ambiguity: 'medium', trueSignal: true },
  { id: 'r5', source: 'GRANITE (HUMINT)', classification: 'TOP SECRET // HCS', reliability: 'B-3', content: 'Source reports inner circle is "calm and confident." Maduro held a 4-hour meeting with military commanders and emerged "satisfied." Source caveat: source has not been in direct contact with Maduro for 10 days and is reporting secondhand.', ambiguity: 'high', trueSignal: false },
  { id: 'r6', source: 'Colombian DNI Liaison', classification: 'SECRET // REL FVEY', reliability: 'C-2', content: 'Debriefing of defected Deputy Interior Minister: "The military is split. Western Command and the Air Force are unreliable. Maduro knows this and is relying on SEBIN and colectivos for loyalty." Defector has personal grudge against regime — possible embellishment.', ambiguity: 'medium', trueSignal: true },
];

const IC_CONFIDENCE_LEVELS = [
  { id: 'low', label: 'Low Confidence', desc: 'Based on limited or fragmentary information. Analytic judgments are uncertain.' },
  { id: 'moderate', label: 'Moderate Confidence', desc: 'Information from credible sources but with notable gaps. Plausible alternative interpretations exist.' },
  { id: 'high', label: 'High Confidence', desc: 'Well-corroborated information from multiple independent sources. Few or no analytic gaps.' },
];

const IC_ASSESSMENTS = [
  { id: 'collapse', text: 'The Maduro government will likely fall within 6 months due to military fracture.', bestConfidence: 'moderate', quality: 70 },
  { id: 'survive', text: 'The Maduro government will most likely survive the current crisis, though in weakened form.', bestConfidence: 'moderate', quality: 65 },
  { id: 'uncertain', text: 'Military loyalty is the decisive variable. We assess with moderate confidence that the military is fractured but cannot yet determine whether this will result in regime change or a crackdown.', bestConfidence: 'moderate', quality: 90 },
  { id: 'certain_collapse', text: 'We assess with high confidence that regime change is imminent.', bestConfidence: 'low', quality: 20 },
];

const IC_FORMATS = [
  { id: 'pdb', name: 'President\'s Daily Brief', audience: 'POTUS/NSC Principals', timeliness: 95, depth: 40, reach: 10, desc: 'Highest-priority product. Short (1-2 paragraphs). Must be actionable and current. Reaches the President directly.' },
  { id: 'ia', name: 'Intelligence Assessment (IA)', audience: 'NSC Directors / Interagency', timeliness: 60, depth: 85, reach: 60, desc: 'Detailed analytic product (3-10 pages). Includes key judgments, evidence, alternatives, confidence levels. Standard vehicle for policy support.' },
  { id: 'iir', name: 'Intelligence Information Report (IIR)', audience: 'IC-wide', timeliness: 40, depth: 70, reach: 90, desc: 'Raw intelligence report for IC consumers. Provides collection data for other analysts to integrate. Broad distribution but requires analyst interpretation.' },
  { id: 'warning', name: 'Warning Intelligence (WATCHCON)', audience: 'Senior Military / NSC', timeliness: 100, depth: 20, reach: 30, desc: 'Emergency product for imminent threats. Short, directive, highest priority. Used when delay could cause harm.' },
];

const IC_FAILURE_CASES = [
  { id: '911', name: '9/11 Intelligence Failure', year: 2001, phase: 'collection', desc: 'Information existed across multiple agencies but was not shared or integrated. The failure was not in collection but in the handoff from collection to analysis — the famous "wall" between CIA and FBI.', lesson: 'The intelligence cycle breaks when agencies collect in silos. IRTPA 2004 created the DNI to fix this.' },
  { id: 'wmd', name: 'Iraq WMD Estimate', year: 2002, phase: 'analysis', desc: 'The 2002 NIE assessed with "high confidence" that Iraq had active WMD programs. Analysis was driven by assumptions, source fabrication (CURVEBALL), and policy pressure rather than evidence-based tradecraft.', lesson: 'Confidence must be calibrated to evidence, not institutional pressure. ICD-203 analytic standards were the direct response.' },
  { id: 'pearl', name: 'Pearl Harbor', year: 1941, phase: 'dissemination', desc: 'Warning indicators existed — MAGIC intercepts, radar contacts, submarine sightings — but were not delivered to the right commanders in time. The intelligence existed but the dissemination system failed.', lesson: 'The best analysis is worthless if it does not reach the right consumer at the right time in the right format.' },
  { id: 'yom', name: 'Yom Kippur War', year: 1973, phase: 'processing', desc: 'Israeli intelligence had overwhelming SIGINT and HUMINT indicating Egyptian attack preparations. Analysts dismissed the signals as noise because the prevailing "concept" (Ha-Konseptziya) held that Egypt would not attack without air superiority.', lesson: 'Processing bias: when analysts have a strong prior belief, they unconsciously filter signals through that belief and miss contradictory evidence.' },
];

// ── Helper functions ─────────────────────────────────────────

function calcQualityScore(decisions) {
  let score = 100;
  // Phase 1: PIR quality
  if (decisions.pir) {
    const pirOpt = IC_PIR_OPTIONS.find(p => p.id === decisions.pir);
    if (pirOpt) score = score * (pirOpt.quality / 100);
  }
  // Phase 2: Collection breadth and balance
  if (decisions.collection && decisions.collection.length > 0) {
    const ints = new Set(decisions.collection.map(id => IC_COLLECTION_ASSETS.find(a => a.id === id)?.int));
    const intDiversity = Math.min(ints.size / 4, 1);
    const avgValue = decisions.collection.reduce((s, id) => {
      const a = IC_COLLECTION_ASSETS.find(x => x.id === id);
      return s + (a ? a.value : 0);
    }, 0) / decisions.collection.length;
    score = score * (0.4 + 0.3 * intDiversity + 0.3 * (avgValue / 100));
  } else {
    score = score * 0.2;
  }
  // Phase 3: Processing — reports evaluated
  if (decisions.reportEvals) {
    const correctSignals = IC_RAW_REPORTS.filter(r => r.trueSignal).map(r => r.id);
    const correctlyMarked = correctSignals.filter(id => decisions.reportEvals[id] === 'credible').length;
    const falseMarked = IC_RAW_REPORTS.filter(r => !r.trueSignal).map(r => r.id)
      .filter(id => decisions.reportEvals[id] === 'credible').length;
    const processingScore = (correctlyMarked / correctSignals.length) - (falseMarked * 0.15);
    score = score * Math.max(0.3, Math.min(1, 0.5 + processingScore * 0.5));
  }
  // Phase 4: Assessment quality and confidence calibration
  if (decisions.assessment && decisions.confidence) {
    const assess = IC_ASSESSMENTS.find(a => a.id === decisions.assessment);
    if (assess) {
      score = score * (assess.quality / 100);
      if (decisions.confidence !== assess.bestConfidence) {
        score = score * 0.7;
      }
    }
  }
  // Phase 5: Format selection
  if (decisions.format) {
    const fmt = IC_FORMATS.find(f => f.id === decisions.format);
    if (fmt) {
      const formatScore = (fmt.timeliness * 0.4 + fmt.depth * 0.4 + fmt.reach * 0.2) / 100;
      score = score * (0.5 + formatScore * 0.5);
    }
  }
  return Math.round(Math.max(0, Math.min(100, score)));
}

function getGrade(score) {
  if (score >= 90) return { grade: 'A', color: IC_C.green, label: 'Exceptional tradecraft' };
  if (score >= 75) return { grade: 'B', color: IC_C.blue, label: 'Solid analytic product' };
  if (score >= 55) return { grade: 'C', color: IC_C.amber, label: 'Adequate but gaps exist' };
  if (score >= 35) return { grade: 'D', color: IC_C.red, label: 'Significant deficiencies' };
  return { grade: 'F', color: IC_C.red, label: 'Intelligence failure' };
}

function getRelevantFailure(phaseId) {
  return IC_FAILURE_CASES.find(f => f.phase === phaseId) || null;
}

// ── Scholarly micro-content ──────────────────────────────────
const IC_TIPS = {
  intelligence_cycle: "Sherman Kent formalized the intelligence cycle in his 1949 book 'Strategic Intelligence for American World Policy,' written while teaching at Yale. Kent argued that intelligence was not merely information but a distinct form of knowledge production requiring its own methodology. His model -- planning, collection, processing, analysis, dissemination, feedback -- became canonical at CIA, where Kent ran the Board of National Estimates from 1952-1967. The irony is that Kent himself warned against treating the cycle as a rigid sequence; he saw it as iterative. Most intelligence failures occur not because the cycle breaks at one phase, but because feedback loops between phases are severed.",
  pdb_failure: "The August 6, 2001 President's Daily Brief titled 'Bin Ladin Determined to Strike in US' is the most consequential intelligence product in modern American history. The PDB warned of al-Qaeda's intention to attack inside the United States, referenced FBI information about suspicious activity consistent with hijacking preparations, and noted that al-Qaeda had buildings under surveillance in New York. President Bush reportedly responded to the briefer: 'All right, you've covered your ass now.' The 9/11 Commission found that the PDB was treated as historical analysis rather than actionable warning -- a distinction that collapsed catastrophically 36 days later.",
  collection_gap: "Donald Rumsfeld's February 2002 'known unknowns' formulation was widely mocked but is actually a precise restatement of the Johari Window, a cognitive framework developed by psychologists Joseph Luft and Harrington Ingham in 1955. The four quadrants -- known knowns, known unknowns, unknown knowns, and unknown unknowns -- map directly onto intelligence collection challenges. The most dangerous category is 'unknown unknowns' (threats you do not know you do not know about), but intelligence failures more often stem from 'unknown knowns' -- information that exists somewhere in the system but is not surfaced to decision-makers. The 9/11 hijackers were in FBI and CIA databases; the information was known but not known to be known.",
  feedback_loop: "The analyst-policymaker relationship is the most fraught dynamic in intelligence. Robert Gates (DCI 1991-93, SecDef 2006-11) described it as a tension between 'telling truth to power' and 'policy support.' When analysts produce assessments that contradict policy preferences, they risk being ignored or pressured. The 2002 Iraq WMD National Intelligence Estimate is the canonical case: analysts faced enormous institutional pressure to support the policy conclusion that Iraq had active WMD programs. The Senate Intelligence Committee later found that the NIE's key judgments were either overstated or unsupported by the underlying intelligence. The feedback loop had been corrupted -- policymakers were not consumers of intelligence but co-producers of a desired conclusion.",
};

// ── Component ────────────────────────────────────────────────

function ICAnalysisView({ setView }) {
  const [phase, setPhase] = useState(0);
  const [tipId, setTipId] = useState(null);
  const [decisions, setDecisions] = useState({
    pir: null,
    collection: [],
    reportEvals: {},
    assessment: null,
    confidence: null,
    format: null,
    alternatives: false,
  });
  const [collectionBudget] = useState(8);
  const [showFailureCase, setShowFailureCase] = useState(null);
  const [topMode, setTopMode] = useState('exercise');
  const [cycleSelectedSegment, setCycleSelectedSegment] = useState(null);

  const C = IC_C;

  // ── Scholarly tooltip renderer & icons ─────────────────────
  const TipBox = (key) => {
    if (tipId !== key) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(8,11,18,.94)', border: '1px solid rgba(200,168,76,.15)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(200,204,216,.65)', lineHeight: 1.65, margin: '6px 0 10px' }}>
        {IC_TIPS[key]}
      </div>
    );
  };

  const CycleIcon = (
    <svg width={22} height={22} viewBox="0 0 22 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'intelligence_cycle' ? null : 'intelligence_cycle')}>
      <circle cx={11} cy={11} r={9} fill="none" stroke="currentColor" strokeWidth=".8" />
      <path d="M11 2 A9 9 0 0 1 20 11" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="19,8 20,11 17,11" fill="currentColor" fillOpacity=".4" />
    </svg>
  );

  const PDBIcon = (
    <svg width={20} height={24} viewBox="0 0 20 24" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'pdb_failure' ? null : 'pdb_failure')}>
      <rect x={2} y={2} width={16} height={20} rx={2} fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={5} y1={7} x2={15} y2={7} stroke="currentColor" strokeWidth=".4" />
      <line x1={5} y1={10} x2={15} y2={10} stroke="currentColor" strokeWidth=".4" />
      <line x1={5} y1={13} x2={12} y2={13} stroke="currentColor" strokeWidth=".4" />
      <circle cx={14} cy={17} r={3} fill="none" stroke="currentColor" strokeWidth=".6" />
      <line x1={14} y1={15} x2={14} y2={17} stroke="currentColor" strokeWidth=".5" />
      <line x1={14} y1={17} x2={16} y2={17} stroke="currentColor" strokeWidth=".5" />
    </svg>
  );

  const GapIcon = (
    <svg width={24} height={20} viewBox="0 0 24 20" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'collection_gap' ? null : 'collection_gap')}>
      <rect x={2} y={4} width={8} height={12} rx={1} fill="none" stroke="currentColor" strokeWidth=".8" />
      <rect x={14} y={4} width={8} height={12} rx={1} fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={10} y1={10} x2={14} y2={10} stroke="currentColor" strokeWidth=".6" strokeDasharray="1.5 1" />
      <text x={6} y={11} textAnchor="middle" fontSize={5} fill="currentColor" fillOpacity=".3">K</text>
      <text x={18} y={11} textAnchor="middle" fontSize={5} fill="currentColor" fillOpacity=".3">?</text>
    </svg>
  );

  const FeedbackIcon = (
    <svg width={22} height={22} viewBox="0 0 22 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'feedback_loop' ? null : 'feedback_loop')}>
      <path d="M6 4 L16 4 Q20 4 20 8 L20 14 Q20 18 16 18 L6 18 Q2 18 2 14 L2 8 Q2 4 6 4" fill="none" stroke="currentColor" strokeWidth=".8" />
      <polygon points="5,2 6,5 3,5" fill="currentColor" fillOpacity=".4" />
      <line x1={7} y1={9} x2={15} y2={9} stroke="currentColor" strokeWidth=".4" />
      <line x1={7} y1={13} x2={13} y2={13} stroke="currentColor" strokeWidth=".4" />
    </svg>
  );

  const setDecision = useCallback((key, value) => {
    setDecisions(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleCollection = useCallback((assetId) => {
    setDecisions(prev => {
      const current = prev.collection || [];
      const asset = IC_COLLECTION_ASSETS.find(a => a.id === assetId);
      if (!asset) return prev;
      if (current.includes(assetId)) {
        return { ...prev, collection: current.filter(id => id !== assetId) };
      }
      const currentCost = current.reduce((s, id) => {
        const a = IC_COLLECTION_ASSETS.find(x => x.id === id);
        return s + (a ? a.cost : 0);
      }, 0);
      if (currentCost + asset.cost > collectionBudget) return prev;
      return { ...prev, collection: [...current, assetId] };
    });
  }, [collectionBudget]);

  const setReportEval = useCallback((reportId, eval_) => {
    setDecisions(prev => ({
      ...prev,
      reportEvals: { ...prev.reportEvals, [reportId]: eval_ },
    }));
  }, []);

  const qualityScore = useMemo(() => calcQualityScore(decisions), [decisions]);
  const gradeInfo = useMemo(() => getGrade(qualityScore), [qualityScore]);

  const collectionCostUsed = useMemo(() => {
    return (decisions.collection || []).reduce((s, id) => {
      const a = IC_COLLECTION_ASSETS.find(x => x.id === id);
      return s + (a ? a.cost : 0);
    }, 0);
  }, [decisions.collection]);

  const canAdvance = useMemo(() => {
    switch (phase) {
      case 0: return true;
      case 1: return !!decisions.pir;
      case 2: return decisions.collection.length > 0;
      case 3: return Object.keys(decisions.reportEvals).length >= 4;
      case 4: return !!decisions.assessment && !!decisions.confidence;
      case 5: return !!decisions.format;
      case 6: return true;
      default: return true;
    }
  }, [phase, decisions]);

  // ── Styles ─────────────────────────────────────────────────

  const sCard = { background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 3, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,.3)' };
  const sMono = { fontFamily: IC_Mono, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em' };
  const sBtn = (active, color) => ({
    padding: '8px 16px', borderRadius: 3, cursor: 'pointer', fontFamily: IC_Mono, fontSize: 11,
    letterSpacing: '.06em', textTransform: 'uppercase',
    background: active ? `${color}18` : 'transparent',
    border: `1px solid ${active ? color : C.line}`,
    color: active ? color : C.tx2,
    transition: 'all .2s',
  });

  // ── Phase renderers ────────────────────────────────────────

  const renderHero = () => (
    <div style={{ marginBottom: 40 }}>
      <button onClick={() => setView('home')} style={{ background: 'none', border: 'none', color: C.tx3, fontFamily: IC_Mono, fontSize: 11, cursor: 'pointer', marginBottom: 24, padding: 0, letterSpacing: '.08em' }}>
        &lt;-- PORTFOLIO
      </button>
      {/* Briefing header with gold rule lines */}
      <div style={{ borderTop: '2px solid rgba(200,168,76,.2)', borderBottom: '1px solid rgba(200,168,76,.1)', padding: '20px 0', marginBottom: 16 }}>
        <div style={{ ...sMono, color: C.gold, marginBottom: 10, letterSpacing: '.14em' }}>BRIEFING // MPAI 5600 // INTRO TO APPLIED INTELLIGENCE</div>
        <h1 style={{ fontFamily: IC_Serif, fontSize: 34, fontWeight: 700, color: C.white, margin: '0 0 8px 0', lineHeight: 1.2 }}>
          Intelligence Cycle Engine
        </h1>
        <div style={{ width: 48, height: 2, background: C.gold, marginTop: 12, marginBottom: 14, opacity: 0.4 }} />
        <p style={{ fontSize: 15, color: C.tx2, maxWidth: 680, lineHeight: 1.7, margin: 0 }}>
          Walk through the six phases of the intelligence cycle with a real-world scenario.
          Your decisions at each phase cascade forward -- poor requirements produce poor collection,
          which produces poor analysis, which produces intelligence failure.
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
        {IC_SKILLS.map(s => (
          <span key={s} style={{ ...sMono, fontSize: 10, color: C.gold, background: C.goldBg, border: `1px solid ${C.goldDm}25`, borderRadius: 1, padding: '3px 10px', borderLeft: '2px solid rgba(200,168,76,.3)' }}>{s}</span>
        ))}
      </div>
    </div>
  );

  const renderPipeline = () => (
    <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 3, padding: '16px 20px', marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,.3)' }}>
      <div style={{ ...sMono, color: C.gold, fontSize: 10, marginBottom: 12, letterSpacing: '.14em', opacity: 0.6 }}>CLASSIFIED BRIEFING AGENDA</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 4 }}>
        {IC_PHASES.map((p, i) => {
          const isActive = i + 1 === phase;
          const isDone = i + 1 < phase;
          const color = isActive ? C.gold : isDone ? C.green : C.tx3;
          return (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                onClick={() => { if (isDone) setPhase(i + 1); }}
                style={{
                  width: 34, height: 34, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isActive ? `${C.gold}15` : isDone ? `${C.green}10` : 'transparent',
                  border: `1px solid ${isActive ? C.gold + '50' : isDone ? C.green + '30' : C.line}`,
                  cursor: isDone ? 'pointer' : 'default',
                  fontFamily: IC_Mono, fontSize: 12, fontWeight: 700, color,
                  transition: 'all .2s',
                }}>
                {isDone ? '\u2713' : p.num}
              </div>
              <div style={{ marginLeft: 6 }}>
                <div style={{ fontSize: 11, fontFamily: IC_Mono, color, fontWeight: isActive ? 700 : 400, whiteSpace: 'nowrap', letterSpacing: '.04em' }}>{p.title}</div>
              </div>
              {i < IC_PHASES.length - 1 && (
                <div style={{ width: 20, height: 1, background: isDone ? C.green + '60' : C.line, margin: '0 6px', flexShrink: 0 }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderQualityMeter = () => {
    if (phase < 1) return null;
    return (
      <div style={{ ...sCard, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Gauge dial */}
        <div style={{ flexShrink: 0 }}>
          {React.createElement(QualityGauge, { score: qualityScore, grade: gradeInfo.grade, color: gradeInfo.color, label: gradeInfo.grade })}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ ...sMono, color: C.tx3, marginBottom: 6, letterSpacing: '.12em' }}>INTELLIGENCE QUALITY ASSESSMENT</div>
          <div style={{ height: 6, background: C.navy, borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', width: `${qualityScore}%`, background: gradeInfo.color, borderRadius: 2, transition: 'width .5s ease' }} />
          </div>
          <div style={{ ...sMono, color: gradeInfo.color, fontSize: 11 }}>{gradeInfo.label}</div>
        </div>
      </div>
    );
  };

  const renderIntro = () => (
    <div>
      <div style={{ ...sCard, marginBottom: 20 }}>
        <div style={{ ...sMono, color: C.red, marginBottom: 12 }}>{IC_SCENARIO.classification}</div>
        <h2 style={{ fontFamily: IC_Serif, fontSize: 26, fontWeight: 700, color: C.white, margin: '0 0 12px 0' }}>{IC_SCENARIO.title}</h2>
        <div style={{ ...sMono, color: C.gold, marginBottom: 16 }}>Scenario Briefing</div>
        <p style={{ fontSize: 14, color: C.tx, lineHeight: 1.7 }}>{IC_SCENARIO.context}</p>
        <div style={{ marginTop: 16, padding: 16, background: C.goldBg, border: `1px solid ${C.goldDm}30`, borderRadius: 6 }}>
          <div style={{ ...sMono, color: C.gold, marginBottom: 6 }}>The Policymaker Asks:</div>
          <p style={{ fontFamily: IC_Serif, fontSize: 20, color: C.white, fontStyle: 'italic', margin: 0 }}>
            "{IC_SCENARIO.question}"
          </p>
          <p style={{ ...sMono, color: C.tx3, marginTop: 8, marginBottom: 0 }}>— {IC_SCENARIO.consumer}</p>
        </div>
      </div>
      <div style={{ ...sCard, marginBottom: 20 }}>
        <h3 style={{ fontFamily: IC_Serif, fontSize: 18, color: C.white, margin: '0 0 12px 0' }}>The Intelligence Cycle{CycleIcon}</h3>
        {TipBox('intelligence_cycle')}
        <p style={{ fontSize: 13, color: C.tx2, lineHeight: 1.6, marginBottom: 16 }}>
          You will step through each of the six phases defined in Lowenthal's model. At each phase,
          your choices affect the quality score. Watch how early mistakes cascade — a vague requirement
          in Phase 1 degrades every subsequent phase.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {IC_PHASES.map(p => (
            <div key={p.id} style={{ padding: 12, background: C.navy, borderRadius: 6, border: `1px solid ${C.navyLt}` }}>
              <div style={{ ...sMono, color: C.gold, marginBottom: 4 }}>Phase {p.num}</div>
              <div style={{ fontSize: 12, color: C.tx, fontWeight: 600 }}>{p.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...sCard }}>
        <h3 style={{ fontFamily: IC_Serif, fontSize: 18, color: C.white, margin: '0 0 12px 0' }}>Failure Case Studies{PDBIcon}</h3>
        {TipBox('pdb_failure')}
        <p style={{ fontSize: 13, color: C.tx2, lineHeight: 1.6, marginBottom: 12 }}>
          Four historical failures illustrate how breakdowns at specific cycle phases produce intelligence failures.
          These cases are referenced throughout the exercise.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {IC_FAILURE_CASES.map(fc => (
            <div key={fc.id} style={{ padding: 12, background: C.redBg, border: `1px solid ${C.redDm}30`, borderRadius: 6, cursor: 'pointer' }}
              onClick={() => setShowFailureCase(showFailureCase === fc.id ? null : fc.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ ...sMono, color: C.red }}>{fc.name} ({fc.year})</div>
                <div style={{ ...sMono, color: C.tx3 }}>Phase: {IC_PHASES.find(p => p.id === fc.phase)?.title}</div>
              </div>
              {showFailureCase === fc.id && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, marginBottom: 8 }}>{fc.desc}</p>
                  <p style={{ fontSize: 11, color: C.gold, fontStyle: 'italic', margin: 0 }}>{fc.lesson}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPhase1 = () => {
    const failure = getRelevantFailure('planning');
    return (
      <div>
        <div style={{ ...sCard, marginBottom: 20 }}>
          <div style={{ ...sMono, color: C.gold, marginBottom: 8 }}>Phase 1 — Planning & Direction</div>
          <h2 style={{ fontFamily: IC_Serif, fontSize: 24, fontWeight: 700, color: C.white, margin: '0 0 12px 0' }}>
            Define the Priority Intelligence Requirement
          </h2>
          <p style={{ fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 16 }}>
            The consumer has asked their question. Your job as the intelligence manager is to translate
            this into a PIR that the collection and analysis communities can act on. The specificity
            of your requirement determines the focus of everything downstream.
          </p>
          <p style={{ fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>
            Key tradecraft principle: vague requirements produce vague intelligence.
            A PIR should be specific, time-bound, and identify the key variables the consumer needs to understand.
          </p>
        </div>
        <div style={{ ...sCard, marginBottom: 20 }}>
          <div style={{ ...sMono, color: C.tx3, marginBottom: 12 }}>Select a PIR formulation:</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {IC_PIR_OPTIONS.map(opt => {
              const selected = decisions.pir === opt.id;
              return (
                <div key={opt.id} onClick={() => setDecision('pir', opt.id)}
                  style={{
                    padding: 16, borderRadius: 6, cursor: 'pointer', transition: 'all .2s',
                    background: selected ? `${C.gold}12` : C.navy,
                    border: `1px solid ${selected ? C.gold : C.navyLt}`,
                  }}>
                  <p style={{ fontFamily: IC_Serif, fontSize: 14, color: selected ? C.white : C.tx, margin: '0 0 8px 0', fontStyle: 'italic' }}>
                    "{opt.text}"
                  </p>
                  {selected && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ ...sMono, color: opt.quality >= 70 ? C.green : opt.quality >= 40 ? C.amber : C.red }}>
                          Quality Impact: {opt.quality >= 70 ? '+' : opt.quality >= 40 ? '~' : '-'}{opt.quality}%
                        </div>
                      </div>
                      <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, margin: 0 }}>{opt.feedback}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {failure && (
          <div style={{ ...sCard, borderLeft: `3px solid ${C.amber}` }}>
            <div style={{ ...sMono, color: C.amber, marginBottom: 6 }}>Historical Parallel</div>
            <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, margin: 0 }}>
              The Iraq WMD failure began at the requirements stage: the question was framed as
              "confirm that Iraq has WMDs" rather than "what is the status of Iraq's WMD programs?"
              When requirements presume conclusions, the entire cycle is corrupted.
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderPhase2 = () => (
    <div>
      <div style={{ ...sCard, marginBottom: 20 }}>
        <div style={{ ...sMono, color: C.gold, marginBottom: 8 }}>Phase 2 — Collection</div>
        <h2 style={{ fontFamily: IC_Serif, fontSize: 24, fontWeight: 700, color: C.white, margin: '0 0 12px 0' }}>
          Task Collection Assets{GapIcon}
        </h2>
        {TipBox('collection_gap')}
        <p style={{ fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 12 }}>
          You have a limited collection budget. Select which intelligence assets to task.
          Diversity across INT disciplines (HUMINT, SIGINT, GEOINT, OSINT) improves corroboration
          and reduces single-source dependency.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 12, background: C.navy, borderRadius: 6 }}>
          <div>
            <div style={{ ...sMono, color: C.tx3, marginBottom: 2 }}>Budget Used</div>
            <span style={{ fontFamily: IC_Serif, fontSize: 24, fontWeight: 700, color: collectionCostUsed > collectionBudget ? C.red : C.gold }}>
              {collectionCostUsed}
            </span>
            <span style={{ fontSize: 14, color: C.tx3 }}> / {collectionBudget}</span>
          </div>
          <div style={{ flex: 1, height: 6, background: C.navyLt, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(collectionCostUsed / collectionBudget) * 100}%`, background: collectionCostUsed > collectionBudget ? C.red : C.gold, borderRadius: 3, transition: 'width .3s' }} />
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {IC_COLLECTION_ASSETS.map(asset => {
          const selected = decisions.collection.includes(asset.id);
          const intColors = { HUMINT: C.blue, SIGINT: C.green, GEOINT: C.amber, OSINT: C.tx2 };
          const intColor = intColors[asset.int] || C.tx3;
          return (
            <div key={asset.id} onClick={() => toggleCollection(asset.id)}
              style={{
                ...sCard, cursor: 'pointer', transition: 'all .2s',
                borderLeft: `3px solid ${selected ? intColor : 'transparent'}`,
                background: selected ? `${intColor}08` : C.card,
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: selected ? C.white : C.tx }}>{asset.name}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <span style={{ ...sMono, color: intColor, fontSize: 11 }}>{asset.int}</span>
                    <span style={{ ...sMono, color: C.tx3, fontSize: 11 }}>Cost: {asset.cost}</span>
                    <span style={{ ...sMono, color: C.tx3, fontSize: 11 }}>Value: {asset.value}</span>
                    <span style={{ ...sMono, color: asset.risk === 'High' ? C.red : asset.risk === 'Moderate' ? C.amber : C.green, fontSize: 11 }}>
                      Risk: {asset.risk}
                    </span>
                  </div>
                </div>
                <div style={{
                  width: 24, height: 24, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: selected ? intColor : 'transparent', border: `2px solid ${selected ? intColor : C.line}`,
                  color: C.white, fontSize: 14, fontWeight: 700,
                }}>
                  {selected ? '\✓' : ''}
                </div>
              </div>
              <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, margin: '8px 0' }}>{asset.desc}</p>
              <div style={{ padding: 8, background: C.redBg, borderRadius: 4, border: `1px solid ${C.redDm}15` }}>
                <div style={{ ...sMono, color: C.red, fontSize: 12, marginBottom: 2 }}>Failure Parallel</div>
                <p style={{ fontSize: 11, color: C.tx3, margin: 0, lineHeight: 1.65 }}>{asset.failure}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPhase3 = () => (
    <div>
      <div style={{ ...sCard, marginBottom: 20 }}>
        <div style={{ ...sMono, color: C.gold, marginBottom: 8 }}>Phase 3 — Processing & Exploitation</div>
        <h2 style={{ fontFamily: IC_Serif, fontSize: 24, fontWeight: 700, color: C.white, margin: '0 0 12px 0' }}>
          Evaluate Raw Intelligence Reports
        </h2>
        <p style={{ fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 12 }}>
          Raw reports have arrived from your collection assets. Not all are equally reliable —
          some are ambiguous, some contradictory. Evaluate each report's credibility before it
          passes to analysis. Use the DoD source reliability/information confidence matrix.
        </p>
        <div style={{ padding: 12, background: C.navy, borderRadius: 6 }}>
          <div style={{ ...sMono, color: C.tx3, marginBottom: 6 }}>Reliability Codes (NATO / DoD Standard)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 11, color: C.tx2 }}><strong style={{ color: C.green }}>A-1</strong> Reliable/Confirmed</span>
            <span style={{ fontSize: 11, color: C.tx2 }}><strong style={{ color: C.blue }}>B-2</strong> Usually reliable/Probably true</span>
            <span style={{ fontSize: 11, color: C.tx2 }}><strong style={{ color: C.amber }}>B-3</strong> Usually reliable/Possibly true</span>
            <span style={{ fontSize: 11, color: C.tx2 }}><strong style={{ color: C.tx3 }}>C-2</strong> Fairly reliable/Probably true</span>
            <span style={{ fontSize: 11, color: C.tx2 }}><strong style={{ color: C.tx3 }}>C-3</strong> Fairly reliable/Possibly true</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {IC_RAW_REPORTS.map(report => {
          const ev = decisions.reportEvals[report.id];
          return (
            <div key={report.id} style={{ ...sCard }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ ...sMono, color: C.blue, marginBottom: 2 }}>{report.source}</div>
                  <div style={{ ...sMono, color: C.red, fontSize: 12 }}>{report.classification}</div>
                </div>
                <div style={{ ...sMono, color: C.tx3 }}>Reliability: {report.reliability}</div>
              </div>
              <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.7, margin: '8px 0 12px 0', padding: 12, background: C.navy, borderRadius: 6, borderLeft: `3px solid ${report.ambiguity === 'high' ? C.amber : C.blue}` }}>
                {report.content}
              </p>
              <div style={{ ...sMono, color: C.tx3, marginBottom: 6 }}>
                Ambiguity: <span style={{ color: report.ambiguity === 'high' ? C.amber : C.blue }}>{report.ambiguity}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['credible', 'uncertain', 'dismiss'].map(val => (
                  <button key={val} onClick={() => setReportEval(report.id, val)}
                    style={sBtn(ev === val, val === 'credible' ? C.green : val === 'uncertain' ? C.amber : C.red)}>
                    {val === 'credible' ? 'Credible — forward to analysis' : val === 'uncertain' ? 'Uncertain — flag for review' : 'Dismiss — likely noise'}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ ...sCard, marginTop: 20, borderLeft: `3px solid ${C.amber}` }}>
        <div style={{ ...sMono, color: C.amber, marginBottom: 6 }}>Yom Kippur Parallel</div>
        <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, margin: 0 }}>
          In 1973, Israeli intelligence had multiple HUMINT and SIGINT reports indicating Egyptian
          attack preparations. Analysts dismissed them because the prevailing analytical framework
          held that Egypt would not attack without air superiority. The signals were real —
          the processing filter was broken.
        </p>
      </div>
    </div>
  );

  const renderPhase4 = () => (
    <div>
      <div style={{ ...sCard, marginBottom: 20 }}>
        <div style={{ ...sMono, color: C.gold, marginBottom: 8 }}>Phase 4 — Analysis & Production</div>
        <h2 style={{ fontFamily: IC_Serif, fontSize: 24, fontWeight: 700, color: C.white, margin: '0 0 12px 0' }}>
          Produce the Intelligence Assessment
        </h2>
        <p style={{ fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 12 }}>
          Based on the processed intelligence, formulate your key judgment and assign a
          confidence level per ICD-203 analytic standards. Remember: confidence reflects
          the quality of underlying evidence, not the strength of your personal belief.
        </p>
        <div style={{ padding: 12, background: C.navy, borderRadius: 6, marginBottom: 12 }}>
          <div style={{ ...sMono, color: C.gold, marginBottom: 8 }}>ICD-203 Confidence Framework</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {IC_CONFIDENCE_LEVELS.map(cl => (
              <div key={cl.id} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ ...sMono, color: cl.id === 'high' ? C.green : cl.id === 'moderate' ? C.amber : C.red, minWidth: 80 }}>{cl.label}</span>
                <span style={{ fontSize: 12, color: C.tx2 }}>{cl.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ ...sCard, marginBottom: 20 }}>
        <div style={{ ...sMono, color: C.tx3, marginBottom: 12 }}>Select your key judgment:</div>
        <div style={{ display: 'grid', gap: 10 }}>
          {IC_ASSESSMENTS.map(a => {
            const selected = decisions.assessment === a.id;
            return (
              <div key={a.id} onClick={() => setDecision('assessment', a.id)}
                style={{
                  padding: 16, borderRadius: 6, cursor: 'pointer', transition: 'all .2s',
                  background: selected ? `${C.blue}12` : C.navy,
                  border: `1px solid ${selected ? C.blue : C.navyLt}`,
                }}>
                <p style={{ fontFamily: IC_Serif, fontSize: 14, color: selected ? C.white : C.tx, margin: 0 }}>
                  {a.text}
                </p>
                {selected && (
                  <div style={{ ...sMono, color: C.tx3, marginTop: 6 }}>
                    Best calibrated at: <span style={{ color: C.amber }}>{a.bestConfidence} confidence</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ ...sCard, marginBottom: 20 }}>
        <div style={{ ...sMono, color: C.tx3, marginBottom: 12 }}>Assign confidence level:</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {IC_CONFIDENCE_LEVELS.map(cl => (
            <button key={cl.id} onClick={() => setDecision('confidence', cl.id)}
              style={sBtn(decisions.confidence === cl.id, cl.id === 'high' ? C.green : cl.id === 'moderate' ? C.amber : C.red)}>
              {cl.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ ...sCard, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          onClick={() => setDecision('alternatives', !decisions.alternatives)}>
          <div style={{
            width: 20, height: 20, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: decisions.alternatives ? C.green : 'transparent',
            border: `2px solid ${decisions.alternatives ? C.green : C.line}`,
            color: C.white, fontSize: 12, fontWeight: 700,
          }}>
            {decisions.alternatives ? '\✓' : ''}
          </div>
          <span style={{ fontSize: 13, color: C.tx }}>Include alternative analysis section (competing hypotheses)</span>
        </div>
        <p style={{ fontSize: 12, color: C.tx3, marginTop: 8, marginBottom: 0, paddingLeft: 28 }}>
          ICD-203 Standard 9 requires analysts to identify and evaluate alternative explanations.
          The Iraq WMD NIE failed to rigorously examine alternatives to the "active WMD programs" hypothesis.
        </p>
      </div>
      <div style={{ ...sCard, borderLeft: `3px solid ${C.red}` }}>
        <div style={{ ...sMono, color: C.red, marginBottom: 6 }}>Iraq WMD Parallel</div>
        <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, margin: 0 }}>
          The 2002 NIE assessed with "high confidence" that Iraq had active WMD programs.
          The underlying evidence did not support high confidence — key sources were
          fabricated (CURVEBALL), corroboration was assumed rather than verified,
          and alternative hypotheses were not rigorously explored. ICD-203 was the direct
          reform response: confidence must be calibrated to evidence quality.
        </p>
      </div>
    </div>
  );

  const renderPhase5 = () => (
    <div>
      <div style={{ ...sCard, marginBottom: 20 }}>
        <div style={{ ...sMono, color: C.gold, marginBottom: 8 }}>Phase 5 — Dissemination</div>
        <h2 style={{ fontFamily: IC_Serif, fontSize: 24, fontWeight: 700, color: C.white, margin: '0 0 12px 0' }}>
          Deliver the Intelligence Product
        </h2>
        <p style={{ fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 12 }}>
          Your assessment is ready. Now choose the right vehicle to deliver it. The format
          determines who sees it, how quickly, and in how much depth. The consumer is the
          NSC Director who needs this for a Principals Committee meeting in 72 hours.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
        {IC_FORMATS.map(fmt => {
          const selected = decisions.format === fmt.id;
          return (
            <div key={fmt.id} onClick={() => setDecision('format', fmt.id)}
              style={{
                ...sCard, cursor: 'pointer', transition: 'all .2s',
                border: `1px solid ${selected ? C.gold : C.cardBd}`,
                background: selected ? `${C.gold}08` : C.card,
              }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: selected ? C.white : C.tx, marginBottom: 4 }}>{fmt.name}</div>
              <div style={{ ...sMono, color: C.gold, marginBottom: 10 }}>{fmt.audience}</div>
              <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, marginBottom: 12 }}>{fmt.desc}</p>
              <div style={{ display: 'grid', gap: 6 }}>
                {[
                  { label: 'Timeliness', val: fmt.timeliness, color: C.green },
                  { label: 'Depth', val: fmt.depth, color: C.blue },
                  { label: 'Reach', val: fmt.reach, color: C.amber },
                ].map(m => (
                  <div key={m.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ ...sMono, color: C.tx3, fontSize: 12 }}>{m.label}</span>
                      <span style={{ ...sMono, color: m.color, fontSize: 12 }}>{m.val}%</span>
                    </div>
                    <div style={{ height: 4, background: C.navy, borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${m.val}%`, background: m.color, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ ...sCard, marginTop: 20, borderLeft: `3px solid ${C.amber}` }}>
        <div style={{ ...sMono, color: C.amber, marginBottom: 6 }}>Pearl Harbor Parallel</div>
        <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, margin: 0 }}>
          On December 7, 1941, warning intelligence existed — MAGIC intercepts, radar contacts,
          even a submarine sighting at Pearl Harbor's entrance. But the information was not
          delivered in the right format to the right commanders in time. The War Department
          sent its final warning by commercial telegraph because secure channels were down.
          It arrived after the attack began.
        </p>
      </div>
    </div>
  );

  const renderPhase6 = () => {
    const pirOpt = IC_PIR_OPTIONS.find(p => p.id === decisions.pir);
    const assessOpt = IC_ASSESSMENTS.find(a => a.id === decisions.assessment);
    const fmtOpt = IC_FORMATS.find(f => f.id === decisions.format);
    const ints = new Set((decisions.collection || []).map(id => IC_COLLECTION_ASSETS.find(a => a.id === id)?.int));
    const reportsEvaluated = Object.keys(decisions.reportEvals).length;
    const trueSignals = IC_RAW_REPORTS.filter(r => r.trueSignal).map(r => r.id);
    const correctlyIdentified = trueSignals.filter(id => decisions.reportEvals[id] === 'credible').length;

    const phaseScores = [
      { phase: 'Planning & Direction', score: pirOpt ? pirOpt.quality : 0, note: pirOpt ? (pirOpt.quality >= 70 ? 'PIR was well-formulated' : pirOpt.quality >= 40 ? 'PIR lacked specificity' : 'PIR was vague or biased') : 'No PIR selected' },
      { phase: 'Collection', score: decisions.collection.length > 0 ? Math.round((ints.size / 4) * 60 + 40) : 0, note: `${ints.size} INT discipline${ints.size !== 1 ? 's' : ''} tasked, ${decisions.collection.length} assets deployed` },
      { phase: 'Processing', score: reportsEvaluated > 0 ? Math.round((correctlyIdentified / trueSignals.length) * 100) : 0, note: `${correctlyIdentified}/${trueSignals.length} true signals correctly identified` },
      { phase: 'Analysis', score: assessOpt ? assessOpt.quality : 0, note: assessOpt ? (decisions.confidence === assessOpt.bestConfidence ? 'Confidence well-calibrated to evidence' : 'Confidence miscalibrated relative to evidence base') : 'No assessment produced' },
      { phase: 'Dissemination', score: fmtOpt ? Math.round((fmtOpt.timeliness * 0.4 + fmtOpt.depth * 0.4 + fmtOpt.reach * 0.2)) : 0, note: fmtOpt ? `${fmtOpt.name} — delivered to ${fmtOpt.audience}` : 'No format selected' },
    ];

    const policymakerReaction = qualityScore >= 80
      ? '"This is exactly what I needed. Clear, calibrated, actionable. I can brief the Principals Committee with confidence."'
      : qualityScore >= 55
        ? '"Useful but I have questions. The confidence level feels off relative to what you describe. Can you clarify the basis for your key judgment?"'
        : qualityScore >= 35
          ? '"I can\'t use this for the Principals meeting. It\'s too vague to be actionable, and I\'m not sure the sources support the conclusion. Rework it."'
          : '"This is an intelligence failure. The requirement was clear and the product doesn\'t address it. I need a new team on this."';

    return (
      <div>
        <div style={{ ...sCard, marginBottom: 20 }}>
          <div style={{ ...sMono, color: C.gold, marginBottom: 8 }}>Phase 6 — Feedback & Evaluation</div>
          <h2 style={{ fontFamily: IC_Serif, fontSize: 24, fontWeight: 700, color: C.white, margin: '0 0 12px 0' }}>
            Policymaker Response{FeedbackIcon}
          </h2>
          {TipBox('feedback_loop')}
          <div style={{ padding: 20, background: C.goldBg, border: `1px solid ${C.goldDm}30`, borderRadius: 8, marginBottom: 20 }}>
            <div style={{ ...sMono, color: C.gold, marginBottom: 8 }}>NSC Director Feedback:</div>
            <p style={{ fontFamily: IC_Serif, fontSize: 16, color: C.white, fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
              {policymakerReaction}
            </p>
          </div>
        </div>

        <div style={{ ...sCard, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `4px solid ${gradeInfo.color}`, background: `${gradeInfo.color}10` }}>
              <div style={{ fontFamily: IC_Serif, fontSize: 36, fontWeight: 700, color: gradeInfo.color }}>{gradeInfo.grade}</div>
              <div style={{ ...sMono, fontSize: 11, color: gradeInfo.color }}>{qualityScore}/100</div>
            </div>
            <div>
              <h3 style={{ fontFamily: IC_Serif, fontSize: 22, color: C.white, margin: '0 0 4px 0' }}>Final Assessment: {gradeInfo.label}</h3>
              <p style={{ fontSize: 13, color: C.tx2, margin: 0 }}>
                Your decisions across all six phases produced an intelligence product scored at {qualityScore}/100.
              </p>
            </div>
          </div>

          <div style={{ ...sMono, color: C.tx3, marginBottom: 12 }}>Phase-by-Phase Breakdown</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {phaseScores.map((ps, i) => {
              const psGrade = getGrade(ps.score);
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: C.navy, borderRadius: 6 }}>
                  <div style={{ width: 40, textAlign: 'center' }}>
                    <div style={{ fontFamily: IC_Serif, fontSize: 20, fontWeight: 700, color: psGrade.color }}>{ps.score}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 2 }}>{ps.phase}</div>
                    <div style={{ height: 4, background: C.navyLt, borderRadius: 2, overflow: 'hidden', marginBottom: 4 }}>
                      <div style={{ height: '100%', width: `${ps.score}%`, background: psGrade.color, borderRadius: 2 }} />
                    </div>
                    <div style={{ fontSize: 11, color: C.tx3 }}>{ps.note}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ ...sCard, marginBottom: 20 }}>
          <h3 style={{ fontFamily: IC_Serif, fontSize: 18, color: C.white, margin: '0 0 12px 0' }}>Cascade Effect Analysis</h3>
          <p style={{ fontSize: 13, color: C.tx2, lineHeight: 1.7, marginBottom: 16 }}>
            The intelligence cycle is a pipeline. Errors at early stages constrain what later stages can achieve.
            {pirOpt && pirOpt.quality < 50 && ' Your PIR formulation was imprecise, which limited collection focus and downstream analysis quality.'}
            {decisions.collection.length < 3 && ' Limited collection assets meant fewer sources to corroborate or challenge the assessment.'}
            {decisions.confidence && assessOpt && decisions.confidence !== assessOpt.bestConfidence && ' Your confidence level was miscalibrated — either overstating certainty beyond what evidence supports, or understating it and appearing unhelpful to the consumer.'}
            {!decisions.alternatives && ' You did not include alternative analysis, which ICD-203 Standard 9 requires for assessments on significant topics.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {IC_FAILURE_CASES.map(fc => {
              const relevantPhaseIdx = IC_PHASES.findIndex(p => p.id === fc.phase);
              const yourScore = relevantPhaseIdx >= 0 && relevantPhaseIdx < phaseScores.length ? phaseScores[relevantPhaseIdx].score : null;
              const isRelevant = yourScore !== null && yourScore < 60;
              return (
                <div key={fc.id} style={{
                  padding: 12, borderRadius: 6,
                  background: isRelevant ? C.redBg : C.navy,
                  border: `1px solid ${isRelevant ? C.redDm + '30' : C.navyLt}`,
                }}>
                  <div style={{ ...sMono, color: isRelevant ? C.red : C.tx3, marginBottom: 4 }}>
                    {fc.name} ({fc.year})
                  </div>
                  <div style={{ fontSize: 11, color: C.tx2, marginBottom: 4 }}>Phase: {IC_PHASES.find(p => p.id === fc.phase)?.title}</div>
                  {isRelevant && (
                    <div style={{ fontSize: 11, color: C.red, fontStyle: 'italic' }}>
                      Your performance in this phase ({yourScore}/100) mirrors this historical failure pattern.
                    </div>
                  )}
                  {!isRelevant && (
                    <div style={{ fontSize: 11, color: C.green }}>
                      You avoided this failure pattern.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ ...sCard }}>
          <h3 style={{ fontFamily: IC_Serif, fontSize: 18, color: C.white, margin: '0 0 12px 0' }}>Key Lessons</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              { lesson: 'Specificity in requirements drives specificity in collection and analysis. Vague PIRs produce vague products.', source: 'Lowenthal Ch. 4' },
              { lesson: 'Multi-INT collection provides corroboration. Single-source dependency creates fragility.', source: 'Lowenthal Ch. 5' },
              { lesson: 'Processing bias is invisible to the analyst experiencing it. Structured analytic techniques (SATs) are the countermeasure.', source: 'ICD-203, Heuer & Pherson' },
              { lesson: 'Confidence must be calibrated to evidence quality, not institutional preference or policy pressure.', source: 'ICD-203 Standard 4' },
              { lesson: 'The right product in the wrong format, to the wrong consumer, at the wrong time, is still a failure.', source: 'ICD-206' },
              { lesson: 'The feedback loop closes the cycle. Without consumer input, the IC cannot improve.', source: 'IRTPA 2004, Section 1019' },
            ].map((l, i) => (
              <div key={i} style={{ padding: 10, background: C.navy, borderRadius: 6, display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span style={{ ...sMono, color: C.gold, fontSize: 12, flexShrink: 0 }}>{i + 1}.</span>
                <div>
                  <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.6, margin: '0 0 4px 0' }}>{l.lesson}</p>
                  <span style={{ ...sMono, color: C.tx3, fontSize: 12 }}>{l.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderProvenance = () => (
    <div style={{ ...sCard, marginTop: 32 }}>
      <h3 style={{ fontFamily: IC_Serif, fontSize: 18, color: C.white, margin: '0 0 12px 0' }}>Sources & Provenance</h3>
      <div style={{ display: 'grid', gap: 6 }}>
        {[
          { tier: 'Core Texts', color: C.gold, items: [
            'Mark M. Lowenthal, Intelligence: From Secrets to Policy, 9th ed. (CQ Press, 2022) — intelligence cycle model, consumer-producer dynamics',
            'Richards J. Heuer Jr. & Randolph H. Pherson, Structured Analytic Techniques for Intelligence Analysis, 3rd ed. (CQ Press, 2020)',
          ] },
          { tier: 'IC Directives & Standards', color: C.blue, items: [
            'ICD-203: Analytic Standards — confidence levels, sourcing, alternative analysis requirements',
            'ICD-206: Sourcing Requirements for Disseminated Analytic Products',
            'Intelligence Reform and Terrorism Prevention Act (IRTPA) of 2004 — DNI creation, information sharing mandates',
          ] },
          { tier: 'Failure Case Studies', color: C.red, items: [
            'The 9/11 Commission Report (2004) — collection-to-analysis breakdown, "the wall"',
            'WMD Commission Report (Silberman-Robb, 2005) — Iraq NIE analytic failure, CURVEBALL',
            'Roberta Wohlstetter, Pearl Harbor: Warning and Decision (1962) — signal vs. noise in warning intelligence',
            'Abraham Rabinovich, The Yom Kippur War (2004) — Ha-Konseptziya and collection bias',
          ] },
          { tier: 'Course Framework', color: C.green, items: [
            'MPAI 5600 Intro to Applied Intelligence — intelligence cycle practicum, PIR formulation exercises',
            'Scenario: fictional composite based on Venezuelan political dynamics (not predictive analysis)',
          ] },
        ].map(section => (
          <div key={section.tier} style={{ padding: 12, background: C.card, border: `1px solid ${C.cardBd}`, borderLeft: `3px solid ${section.color}`, borderRadius: 6 }}>
            <p style={{ fontFamily: IC_Mono, fontSize: 12, color: section.color, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>{section.tier}</p>
            {section.items.map((item, i) => (
              <p key={i} style={{ fontSize: 11, color: C.tx2, lineHeight: 1.65, marginBottom: 4, paddingLeft: 12, borderLeft: `2px solid ${section.color}30` }}>{item}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  // ── Phase map ──────────────────────────────────────────────
  const phaseRenderers = [renderIntro, renderPhase1, renderPhase2, renderPhase3, renderPhase4, renderPhase5, renderPhase6];

  // ── Cycle wheel renderer ─────────────────────────────────────

  const renderCycleWheel = () => {
    const segments = IC_PHASES.map((p, i) => ({
      ...p,
      angle: -90 + i * 60,
      completed: phase > i + 1 || (phase === IC_PHASES.length + 1),
      active: phase === i + 1,
    }));

    const cx = 250, cy = 250, outerR = 190, innerR = 90;
    const segColors = [C.gold, C.blue, C.amber, C.green, C.red, '#8060a0'];

    // Current phase index (0-based) for the exercise
    const activePhaseIdx = phase >= 1 && phase <= 6 ? phase - 1 : -1;

    // Get score for a completed segment
    const getSegmentScore = (segIdx) => {
      if (phase <= segIdx + 1) return null; // not completed yet
      switch(segIdx) {
        case 0: {
          const pirOpt = decisions.pir ? [{ id: 'specific', quality: 85 }, { id: 'moderate', quality: 55 }, { id: 'vague', quality: 20 }].find(o => o.id === decisions.pir) : null;
          return pirOpt ? pirOpt.quality : 0;
        }
        case 1: return decisions.collection.length > 0 ? Math.min(100, decisions.collection.length * 25) : 0;
        case 2: return Object.keys(decisions.reportEvals).length > 0 ? Math.round((Object.keys(decisions.reportEvals).length / 4) * 100) : 0;
        case 3: return decisions.assessment ? 70 : 0;
        case 4: return decisions.format ? 75 : 0;
        case 5: return qualityScore;
        default: return null;
      }
    };

    return (
      <div>
        <div style={{ ...sMono, color: C.gold, marginBottom: 12, letterSpacing: '.14em', borderBottom: '1px solid rgba(200,168,76,.12)', paddingBottom: 8 }}>BRIEFING ITEM // INTELLIGENCE CYCLE // INTERACTIVE DIAGRAM</div>
        <p style={{ fontSize: 13, color: C.tx2, lineHeight: 1.7, marginBottom: 20, maxWidth: 680 }}>
          The six phases of the Lowenthal intelligence cycle visualized as a continuous loop.
          Your current progress through the exercise is highlighted. Click a completed segment
          to review your choices and score for that phase.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <svg viewBox="0 0 500 500" style={{ width: '100%', maxWidth: 460 }}>
            {/* Background circle */}
            <circle cx={cx} cy={cy} r={outerR} fill="none" stroke={C.navyLt} strokeWidth="1" opacity="0.3" />
            <circle cx={cx} cy={cy} r={innerR} fill={C.bg} stroke={C.navyLt} strokeWidth="1" opacity="0.3" />

            {/* Segments */}
            {segments.map((seg, i) => {
              const startAngle = (seg.angle - 30) * Math.PI / 180;
              const endAngle = (seg.angle + 30) * Math.PI / 180;
              const midAngle = seg.angle * Math.PI / 180;

              const x1o = cx + outerR * Math.cos(startAngle);
              const y1o = cy + outerR * Math.sin(startAngle);
              const x2o = cx + outerR * Math.cos(endAngle);
              const y2o = cy + outerR * Math.sin(endAngle);
              const x1i = cx + innerR * Math.cos(endAngle);
              const y1i = cy + innerR * Math.sin(endAngle);
              const x2i = cx + innerR * Math.cos(startAngle);
              const y2i = cy + innerR * Math.sin(startAngle);

              const isActive = i === activePhaseIdx;
              const isCompleted = seg.completed;
              const isSelected = cycleSelectedSegment === i;
              const segColor = segColors[i];

              const labelR = (outerR + innerR) / 2;
              const labelX = cx + labelR * Math.cos(midAngle);
              const labelY = cy + labelR * Math.sin(midAngle);

              // Arrow position (outer edge midpoint pointing to next segment)
              const arrowAngle = (seg.angle + 30) * Math.PI / 180;
              const arrowR = outerR + 8;
              const arrowX = cx + arrowR * Math.cos(arrowAngle);
              const arrowY = cy + arrowR * Math.sin(arrowAngle);
              const arrowRot = seg.angle + 30 + 90;

              const path = [
                `M ${x1o} ${y1o}`,
                `A ${outerR} ${outerR} 0 0 1 ${x2o} ${y2o}`,
                `L ${x1i} ${y1i}`,
                `A ${innerR} ${innerR} 0 0 0 ${x2i} ${y2i}`,
                'Z'
              ].join(' ');

              return (
                <g key={seg.id}
                   style={{ cursor: isCompleted ? 'pointer' : 'default' }}
                   onClick={() => { if (isCompleted) setCycleSelectedSegment(prev => prev === i ? null : i); }}>
                  <path d={path}
                    fill={isActive ? `${segColor}40` : isCompleted ? `${segColor}20` : `${C.navy}`}
                    stroke={isActive ? segColor : isCompleted ? `${segColor}80` : C.navyLt}
                    strokeWidth={isActive || isSelected ? 3 : 1}
                  />
                  {/* Segment number */}
                  <text x={labelX} y={labelY - 6} textAnchor="middle" dominantBaseline="middle"
                    fill={isActive ? segColor : isCompleted ? `${segColor}cc` : C.tx3}
                    fontSize="14" fontWeight="700" fontFamily="'IBM Plex Mono',monospace">
                    {seg.num}
                  </text>
                  {/* Segment label */}
                  <text x={labelX} y={labelY + 10} textAnchor="middle" dominantBaseline="middle"
                    fill={isActive ? C.white : isCompleted ? C.tx : C.tx3}
                    fontSize="8" fontFamily="'IBM Plex Mono',monospace">
                    {seg.title.split(' ')[0]}
                  </text>
                  {/* Completed check */}
                  {isCompleted && (
                    <text x={labelX} y={labelY + 24} textAnchor="middle"
                      fill={segColor} fontSize="10" fontFamily="'IBM Plex Mono',monospace">
                      {'\✓'}
                    </text>
                  )}
                  {/* Arrow to next */}
                  {i < 5 && (
                    <polygon
                      points="-4,-3 4,-3 0,5"
                      transform={`translate(${arrowX},${arrowY}) rotate(${arrowRot})`}
                      fill={isCompleted ? segColor : C.tx3}
                      opacity={isCompleted ? 0.8 : 0.3}
                    />
                  )}
                </g>
              );
            })}

            {/* Arrow from last to first (closing the loop) */}
            {(() => {
              const a6 = (segments[5].angle + 30) * Math.PI / 180;
              const aR = outerR + 8;
              return (
                <polygon
                  points="-4,-3 4,-3 0,5"
                  transform={`translate(${cx + aR * Math.cos(a6)},${cy + aR * Math.sin(a6)}) rotate(${segments[5].angle + 30 + 90})`}
                  fill={phase > 6 ? C.gold : C.tx3}
                  opacity={phase > 6 ? 0.8 : 0.3}
                />
              );
            })()}

            {/* Center quality score */}
            <text x={cx} y={cy - 16} textAnchor="middle" dominantBaseline="middle"
              fill={C.tx3} fontSize="9" fontFamily="'IBM Plex Mono',monospace" letterSpacing="0.08em">
              QUALITY SCORE
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="middle"
              fill={gradeInfo.color} fontSize="36" fontWeight="700" fontFamily="'Source Serif 4',Georgia,serif">
              {qualityScore}
            </text>
            <text x={cx} y={cy + 32} textAnchor="middle" dominantBaseline="middle"
              fill={gradeInfo.color} fontSize="11" fontFamily="'IBM Plex Mono',monospace" fontWeight="600">
              {gradeInfo.label}
            </text>
          </svg>
        </div>

        {/* Segment detail panel */}
        {cycleSelectedSegment !== null && (
          <div style={{ ...sCard, marginBottom: 20, borderLeft: `3px solid ${segColors[cycleSelectedSegment]}` }}>
            <div style={{ ...sMono, color: segColors[cycleSelectedSegment], marginBottom: 8 }}>
              Phase {cycleSelectedSegment + 1} — {IC_PHASES[cycleSelectedSegment].title}
            </div>
            {(() => {
              const score = getSegmentScore(cycleSelectedSegment);
              const phaseChoices = {
                0: decisions.pir ? `PIR selected: "${decisions.pir}"` : 'No PIR selected',
                1: decisions.collection.length > 0 ? `${decisions.collection.length} collection asset(s) tasked` : 'No assets tasked',
                2: Object.keys(decisions.reportEvals).length > 0 ? `${Object.keys(decisions.reportEvals).length} reports evaluated` : 'No reports evaluated',
                3: decisions.assessment ? `Assessment: "${decisions.assessment}", Confidence: ${decisions.confidence || 'not set'}` : 'No assessment produced',
                4: decisions.format ? `Format: "${decisions.format}"` : 'No format selected',
                5: `Final quality score: ${qualityScore}/100`,
              };
              return (
                <div>
                  <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.6, marginBottom: 8 }}>
                    {phaseChoices[cycleSelectedSegment]}
                  </p>
                  {score !== null && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ ...sMono, color: C.tx3 }}>Phase Score:</div>
                      <div style={{ flex: 1, height: 6, background: C.navy, borderRadius: 3, overflow: 'hidden', maxWidth: 200 }}>
                        <div style={{ height: '100%', width: `${score}%`, background: segColors[cycleSelectedSegment], borderRadius: 3 }} />
                      </div>
                      <span style={{ fontFamily: IC_Mono, fontSize: 12, fontWeight: 700, color: segColors[cycleSelectedSegment] }}>{score}</span>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Phase legend */}
        <div style={{ ...sCard }}>
          <div style={{ ...sMono, color: C.tx3, marginBottom: 12 }}>CYCLE PHASES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
            {IC_PHASES.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8, background: C.navy, borderRadius: 6, borderLeft: `3px solid ${segColors[i]}` }}>
                <span style={{ fontFamily: IC_Mono, fontSize: 16, fontWeight: 700, color: segColors[i] }}>{p.num}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.tx }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: C.tx3, fontFamily: IC_Mono }}>
                    {phase > i + 1 ? 'COMPLETED' : phase === i + 1 ? 'IN PROGRESS' : 'PENDING'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── Main render ────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: IC_Sans, position: 'relative' }}>
      {React.createElement(BriefingRoomBg)}
      {/* Classification strip */}
      <div style={{ background: '#8b0000', color: '#fff', fontFamily: IC_Mono, fontSize: 11, letterSpacing: '.16em', textAlign: 'center', padding: '4px 0', fontWeight: 700, borderBottom: '2px solid #c03030' }}>
        SECRET // NOFORN
      </div>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '32px 24px 64px', position: 'relative', zIndex: 1 }}>
        {renderHero()}

        {/* Top mode toggle */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
          {[
            { id: 'exercise', label: 'Exercise', desc: 'Caracas Scenario' },
            { id: 'cycle', label: 'Cycle', desc: 'Visual Diagram' },
          ].map(m => (
            <button key={m.id} onClick={() => setTopMode(m.id)}
              style={{
                flex: 1, padding: '10px 12px', borderRadius: 4, cursor: 'pointer',
                background: topMode === m.id ? `${C.gold}12` : 'transparent',
                border: topMode === m.id ? `1px solid ${C.gold}` : `1px solid ${C.line}`,
                textAlign: 'center', transition: 'all .15s ease',
              }}>
              <span style={{ fontFamily: IC_Mono, fontSize: 11, fontWeight: 600, color: topMode === m.id ? C.gold : C.tx3, display: 'block' }}>
                {m.label}
              </span>
              <span style={{ fontFamily: IC_Sans, fontSize: 11, color: C.tx3 }}>{m.desc}</span>
            </button>
          ))}
        </div>

        {topMode === 'exercise' && (
          <div>
            {phase > 0 && renderPipeline()}
            {renderQualityMeter()}
            {phaseRenderers[phase] ? phaseRenderers[phase]() : null}

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
              {phase > 0 ? (
                <button onClick={() => setPhase(phase - 1)}
                  style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${C.line}`, borderRadius: 6, color: C.tx3, fontFamily: IC_Mono, fontSize: 11, cursor: 'pointer' }}>
                  \← {phase === 1 ? 'Briefing' : IC_PHASES[phase - 2]?.title || 'Back'}
                </button>
              ) : <div />}
              {phase < phaseRenderers.length - 1 && (
                <button onClick={() => { if (canAdvance) setPhase(phase + 1); }}
                  style={{
                    padding: '10px 24px', borderRadius: 6, cursor: canAdvance ? 'pointer' : 'not-allowed',
                    fontFamily: IC_Mono, fontSize: 11, transition: 'all .2s',
                    background: canAdvance ? `${C.gold}20` : 'transparent',
                    border: `1px solid ${canAdvance ? C.gold : C.line}`,
                    color: canAdvance ? C.gold : C.tx3,
                    opacity: canAdvance ? 1 : 0.5,
                  }}>
                  {phase === 0 ? 'Begin Phase 1 \→' : `Continue to ${IC_PHASES[phase]?.title || 'Next'} \→`}
                </button>
              )}
              {phase === phaseRenderers.length - 1 && (
                <button onClick={() => { setPhase(0); setDecisions({ pir: null, collection: [], reportEvals: {}, assessment: null, confidence: null, format: null, alternatives: false }); }}
                  style={{ padding: '10px 24px', background: `${C.gold}20`, border: `1px solid ${C.gold}`, borderRadius: 6, color: C.gold, fontFamily: IC_Mono, fontSize: 11, cursor: 'pointer' }}>
                  Reset & Run Again \u21BB
                </button>
              )}
            </div>
          </div>
        )}

        {topMode === 'cycle' && renderCycleWheel()}

        {renderProvenance()}
      </div>
      {/* Bottom classification strip */}
      <div style={{ background: '#8b0000', color: '#fff', fontFamily: IC_Mono, fontSize: 11, letterSpacing: '.16em', textAlign: 'center', padding: '4px 0', fontWeight: 700, borderTop: '2px solid #c03030' }}>
        SECRET // NOFORN
      </div>
    </div>
  );
}
