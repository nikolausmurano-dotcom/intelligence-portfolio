// DDIAnalysisView.jsx — Policy Decision Laboratory
// Defense, Diplomacy & Intelligence
//
// Expert-audited rewrite: 16 findings addressed
// Self-contained React component using Babel in-browser transpilation
// Globals: useState, useCallback, useMemo, useRef from React

// ── Palette: Wood-paneled NSC Situation Room ──────────────────────
const DDI_C = {
  bg: "#0a0d10",
  card: "rgba(16,20,28,.88)",
  cardBd: "rgba(140,155,120,.14)",
  tx: "#d4d0c4",
  tx2: "#9a9888",
  tx3: "#686458",
  gold: "#c4a050",
  goldDm: "#9a7e40",
  goldBg: "rgba(196,160,80,.07)",
  green: "#5a9a6a",
  greenDm: "#448055",
  greenBg: "rgba(90,154,106,.07)",
  red: "#b05050",
  redDm: "#8a3a3a",
  redBg: "rgba(176,80,80,.08)",
  blue: "#5a7aaa",
  blueDm: "#446a90",
  blueBg: "rgba(90,122,170,.07)",
  line: "rgba(140,155,120,.1)",
  wood: "rgba(60,40,20,.15)",
  woodLine: "rgba(80,55,30,.12)",
};
const DDI_Serif = "'Source Serif 4', 'EB Garamond', Georgia, serif";
const DDI_Sans = "'Inter', Helvetica, sans-serif";
const DDI_Mono = "'IBM Plex Mono', monospace";

// ── NSC Situation Room decorative elements ──────────────────────

var PresidentialSealWatermark = function() {
  return React.createElement('svg', {
    width: '320', height: '320',
    viewBox: '0 0 320 320',
    style: { position: 'absolute', top: '60px', right: '-40px', opacity: 0.018, pointerEvents: 'none', zIndex: 0 }
  },
    React.createElement('circle', { cx: 160, cy: 160, r: 150, fill: 'none', stroke: '#c4a050', strokeWidth: 2 }),
    React.createElement('circle', { cx: 160, cy: 160, r: 140, fill: 'none', stroke: '#c4a050', strokeWidth: 0.8 }),
    React.createElement('circle', { cx: 160, cy: 160, r: 120, fill: 'none', stroke: '#c4a050', strokeWidth: 0.5 }),
    React.createElement('circle', { cx: 160, cy: 160, r: 60, fill: 'none', stroke: '#c4a050', strokeWidth: 1 }),
    // Star ring
    Array.from({ length: 13 }).map(function(_, i) {
      var angle = (i * 360 / 13 - 90) * Math.PI / 180;
      var sx = 160 + Math.cos(angle) * 100;
      var sy = 160 + Math.sin(angle) * 100;
      return React.createElement('circle', { key: i, cx: sx, cy: sy, r: 3, fill: '#c4a050' });
    }),
    // Eagle silhouette (simplified)
    React.createElement('path', {
      d: 'M160 100 L140 130 L120 120 L130 145 L110 160 L140 155 L145 175 L160 150 L175 175 L180 155 L210 160 L190 145 L200 120 L180 130Z',
      fill: '#c4a050', fillOpacity: 0.6
    }),
    // Rays
    Array.from({ length: 24 }).map(function(_, i) {
      var angle = (i * 15) * Math.PI / 180;
      return React.createElement('line', {
        key: 'ray' + i,
        x1: 160 + Math.cos(angle) * 130,
        y1: 160 + Math.sin(angle) * 130,
        x2: 160 + Math.cos(angle) * 145,
        y2: 160 + Math.sin(angle) * 145,
        stroke: '#c4a050', strokeWidth: 0.5
      });
    })
  );
};

var SituationRoomClock = function() {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var timeStr = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  return React.createElement('div', {
    style: {
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '4px 12px', borderRadius: 4,
      background: 'rgba(176,80,80,.06)', border: '1px solid rgba(176,80,80,.15)',
    }
  },
    React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 14 14', style: { opacity: 0.5 } },
      React.createElement('circle', { cx: 7, cy: 7, r: 6, fill: 'none', stroke: '#b05050', strokeWidth: 0.8 }),
      React.createElement('line', { x1: 7, y1: 7, x2: 7, y2: 3, stroke: '#b05050', strokeWidth: 0.8 }),
      React.createElement('line', { x1: 7, y1: 7, x2: 10, y2: 7, stroke: '#b05050', strokeWidth: 0.6 })
    ),
    React.createElement('span', { style: { fontFamily: DDI_Mono, fontSize: 11, color: '#b05050', letterSpacing: '.1em' } }, timeStr + ' LOCAL')
  );
};

var WoodPanelBg = function() {
  return React.createElement('div', {
    style: {
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none', zIndex: 0,
      background: 'repeating-linear-gradient(90deg, rgba(60,40,20,.03) 0px, transparent 1px, transparent 80px, rgba(60,40,20,.03) 81px)',
    }
  });
};

var ClassifiedStamp = function(props) {
  return React.createElement('div', {
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 10px', borderRadius: 3,
      border: '1px solid rgba(196,160,80,.2)',
      background: 'rgba(196,160,80,.04)',
    }
  },
    React.createElement('svg', { width: 10, height: 10, viewBox: '0 0 10 10', style: { opacity: 0.4 } },
      React.createElement('rect', { x: 1, y: 2, width: 8, height: 6, rx: 1, fill: 'none', stroke: '#c4a050', strokeWidth: 0.7 }),
      React.createElement('line', { x1: 3, y1: 4, x2: 7, y2: 4, stroke: '#c4a050', strokeWidth: 0.4 }),
      React.createElement('line', { x1: 3, y1: 5.5, x2: 6, y2: 5.5, stroke: '#c4a050', strokeWidth: 0.4 })
    ),
    React.createElement('span', { style: { fontFamily: DDI_Mono, fontSize: 9, color: DDI_C.goldDm, letterSpacing: '.15em', textTransform: 'uppercase' } }, props.label || 'CLASSIFIED')
  );
};

// ── Phase definitions (outside component) ──────────────
const PHASES = [
  { id: 'assignment', num: 'I', title: 'Assignment', icon: '1' },
  { id: 'case', num: 'II', title: 'Mini-Case', icon: '2' },
  { id: 'assessment', num: 'III', title: 'Intelligence Assessment', icon: '3' },
  { id: 'interests', num: 'IV', title: 'National Interests', icon: '4' },
  { id: 'stakeholders', num: 'V', title: 'Stakeholder Map', icon: '5' },
  { id: 'sat', num: 'VI', title: 'SAT Disclosure', icon: '6' },
  { id: 'allison', num: 'VI-B', title: 'Allison Explanation', icon: '6b' },
  { id: 'levers', num: 'VII', title: 'DIME Lever Engine', icon: '7' },
  { id: 'options', num: 'VIII', title: 'Strategic Options', icon: '8' },
  { id: 'redteam', num: 'IX', title: 'Red Team', icon: '9' },
  { id: 'implementation', num: 'X', title: 'Implementation', icon: '10' },
  { id: 'collection', num: 'XI', title: 'Collection Gaps', icon: '11' },
  { id: 'ethics', num: 'XII', title: 'Ethics & Legitimacy', icon: '12' },
  { id: 'intel_strip', num: 'XIII', title: 'Intel Enabler vs Instrument', icon: '13' },
];

// ── Scenario data (outside component) ──────────────────
const SCENARIO = {
  sender: "National Security Advisor",
  issue: "Maritime corridor disruption in contested waters threatens freedom of navigation, alliance credibility, and energy supply chain stability",
  horizon: "72 hours to initial response recommendation; 30-day posture by EOW",
  output: "Strategic options memo with intelligence assessment annex",
  scope: "Focus on diplomatic-military response options. Economic sanctions and cyber operations are in-scope as supporting instruments. Domestic political considerations should be addressed but not drive the recommendation.",
};

const KEY_JUDGMENTS = [
  { judgment: "The adversary's maritime militia deployment is a deliberate escalation designed to test alliance resolve without crossing a kinetic threshold.", confidence: "High", basis: "Multiple INT corroboration: SIGINT intercepts, GEOINT ship tracking, HUMINT source reporting" },
  { judgment: "Allied resolve is fragile. Two of four treaty allies are signaling privately that they prefer de-escalation over confrontation.", confidence: "Moderate", basis: "Diplomatic reporting. One ally's position may shift if domestic politics change" },
  { judgment: "Commercial shipping rerouting will begin within 5-7 days if the situation is not resolved, imposing $2-4B weekly economic costs on regional economies.", confidence: "High", basis: "Lloyd's risk assessment, historical precedent from 2019 Gulf disruption" },
  { judgment: "The adversary has pre-positioned assets for a second-phase escalation but has not yet committed to executing it. A decision window exists.", confidence: "Low", basis: "GEOINT indicators ambiguous. SIGINT shows increased C2 activity but no execute orders intercepted" },
];

const INTERESTS = [
  { tier: "Vital", items: ["Freedom of navigation in international waters", "Credibility of alliance commitments (Article 5 equivalent)"], color: DDI_C.red },
  { tier: "Extremely Important", items: ["Regional stability and balance of power", "Energy supply chain continuity", "Non-proliferation of gray-zone coercion model"], color: DDI_C.gold },
  { tier: "Important", items: ["Commercial shipping insurance costs", "Deterrence signaling to third-party observers", "Domestic political support for forward posture"], color: DDI_C.blue },
  { tier: "Secondary", items: ["Bilateral relationship preservation with adversary", "Arms control dialogue continuity"], color: DDI_C.tx3 },
];

const STAKEHOLDERS = [
  { actor: "United States", objective: "Restore freedom of navigation; demonstrate alliance reliability", fear: "Escalation to kinetic conflict; allied defection", leverage: "Military prepositioning; economic instruments; diplomatic convening power", reaction: { A: "Strong support from DoD; State cautious on ultimatum language", B: "Broad interagency support; requires Congressional notification", C: "Treasury/Commerce lead; DoD frustrated by restraint" }, coalition: { value: "Indispensable — convener and guarantor", spoiler: "Overreach could fracture coalition" } },
  { actor: "Adversary State", objective: "Establish de facto control of disputed waters; test alliance cohesion", fear: "Unified allied military response; economic isolation", leverage: "Maritime militia deniability; energy supply leverage; nuclear escalation risk", reaction: { A: "Likely reject ultimatum publicly while seeking private channel", B: "Shadow operations; manufacture incidents for media", C: "Dismiss sanctions; accelerate gray-zone consolidation" }, coalition: { value: "N/A — adversary", spoiler: "Can split coalition via economic pressure on wavering allies" } },
  { actor: "Treaty Allies (2 firm)", objective: "Security guarantee activation; show of resolve", fear: "Being dragged into conflict; domestic backlash", leverage: "Basing access; intelligence sharing; diplomatic legitimacy", reaction: { A: "Support if off-ramp is credible", B: "Enthusiastic naval participation", C: "Support legal track; may add own sanctions" }, coalition: { value: "High — legitimacy multiplier", spoiler: "Low — committed" } },
  { actor: "Treaty Allies (2 wavering)", objective: "De-escalation without appearing weak", fear: "Being abandoned; economic retaliation", leverage: "Swing vote in coalition; commercial relationships with adversary", reaction: { A: "Reluctant — prefer quieter approach", B: "May decline naval participation", C: "Most comfortable option — lowest exposure" }, coalition: { value: "Critical swing votes", spoiler: "High — defection collapses coalition narrative" } },
  { actor: "Commercial Shipping", objective: "Route safety; insurance cost containment", fear: "Rerouting costs; crew safety", leverage: "Market pressure; media amplification", reaction: { A: "Wait-and-see on route resumption", B: "Increased confidence if presence sustained", C: "No immediate confidence boost" }, coalition: { value: "Economic pressure amplifier", spoiler: "Low" } },
  { actor: "Domestic Audience", objective: "Strength without war", fear: "American casualties; fuel prices", leverage: "Electoral pressure; media narrative", reaction: { A: "Approve toughness if no casualties", B: "Nervous about military confrontation", C: "Skeptical of 'weak' response" }, coalition: { value: "Sustains political will", spoiler: "Can force premature withdrawal if casualties occur" } },
];

const OPTIONS = [
  { id: 'A', title: "Coercive Diplomacy with Off-Ramp",
    summary: "Diplomatic ultimatum backed by visible military prepositioning. Clear off-ramp: adversary withdraws militia, both sides enter talks.",
    dime: { d: 70, i: 50, m: 60, e: 30 },
    mechanisms: ["persuasion", "denial"],
    risks: ["Ultimatum rejected \→ credibility crisis", "Ally 3 may not support public ultimatum"],
    strengths: ["Clear escalation/de-escalation ladder", "Preserves diplomatic channels", "Least coalition stress"],
    timeline: "72h: deliver ultimatum. 7d: prepositioning complete. 30d: talks or escalation",
    vitalInterest: "Directly addresses alliance credibility (vital) via visible resolve + structured off-ramp",
    invalidatingAssumption: "Adversary has a rational cost-benefit calculus and domestic audience costs for backing down are manageable" },
  { id: 'B', title: "Maritime Deterrence + Coalition Hardening",
    summary: "FON operations with allied participation. No ultimatum \— demonstrate through presence. Simultaneous coalition-building diplomacy.",
    dime: { d: 40, i: 60, m: 80, e: 40 },
    mechanisms: ["denial", "capacity building"],
    risks: ["Incident at sea \→ escalation spiral", "Requires allied naval participation (Ally 3 reluctant)"],
    strengths: ["Strongest deterrent signal", "Builds alliance interoperability", "Reversible"],
    timeline: "72h: FON transit announced. 7d: allied naval group assembled. 30d: sustained presence",
    vitalInterest: "Strongest on freedom of navigation (vital) via physical assertion of rights",
    invalidatingAssumption: "Adversary will not manufacture a kinetic incident to exploit the 'aggressor' narrative" },
  { id: 'C', title: "Economic-Legal Pressure with Military Restraint",
    summary: "Targeted sanctions + UNCLOS legal proceedings + strategic declassification of adversary misconduct. Military on standby, not forward.",
    dime: { d: 50, i: 80, m: 20, e: 70 },
    mechanisms: ["punishment", "persuasion"],
    risks: ["Slow effect \— adversary may entrench. Perception of weakness", "Legal proceedings take months/years"],
    strengths: ["Lowest escalation risk", "Broadest international support", "Information operations degrade adversary narrative"],
    timeline: "72h: sanctions designation. 7d: UNCLOS filing. 30d: declassification + media campaign",
    vitalInterest: "Protects alliance credibility long-term via institutional mechanisms, but slower to restore freedom of navigation",
    invalidatingAssumption: "Adversary cares about international legal/economic costs more than territorial fait accompli" },
];

const MECHANISMS = [
  { id: 'denial', label: 'Denial', desc: 'Prevent adversary from achieving objective through physical or capability barriers' },
  { id: 'punishment', label: 'Punishment', desc: 'Impose costs on adversary for actions taken, to deter repetition' },
  { id: 'inducement', label: 'Inducement', desc: 'Offer positive incentives for desired behavior change' },
  { id: 'persuasion', label: 'Persuasion / Legitimacy', desc: 'Change adversary calculus through normative, legal, or reputational pressure' },
  { id: 'disruption', label: 'Disruption', desc: 'Degrade adversary capability covertly without attribution' },
  { id: 'capacity', label: 'Capacity Building', desc: 'Strengthen allied capability to reduce dependence on U.S. action' },
];

// ── Red Team data: 7 dimensions per option (outside component) ──
const RED_TEAM_DATA = {
  A: {
    narrative: "Frame ultimatum as 'American bullying' and neo-imperialism. Rally domestic nationalist sentiment. Leak diplomatic cable to sympathetic media to portray U.S. as aggressor.",
    military: "Disperse militia into commercial fishing fleet. Deny attribution. Run down the clock on ultimatum deadline while pre-positioning submarine assets.",
    grayZone: "Intensify cyber operations against wavering ally financial systems. Activate economic leverage (rare earth export restrictions) against Ally 3.",
    allianceStress: "Ally 3 publicly distances from ultimatum language. Ally 4 refuses to co-sign. Coalition fractures before deadline expires.",
    domesticVuln: "Opposition party frames ultimatum as 'march to war.' Cable news cycle focuses on casualty scenarios. Poll numbers drop 8-12 points on handling.",
    accidentalEscalation: "Militia vessel captain misinterprets prepositioning as imminent strike. Opens fire on allied reconnaissance aircraft. Casualties force kinetic response.",
    pivotTrigger: "Ultimatum deadline passes without adversary compliance AND allied coalition holds \→ must escalate or lose all credibility. Decision forced within 72h of deadline.",
  },
  B: {
    narrative: "Characterize FON operations as 'gunboat diplomacy.' Release edited footage of near-misses to portray allied forces as reckless. UN General Assembly resolution attempt.",
    military: "Shadow allied naval group with fast attack craft. Conduct aggressive maneuvering to provoke incident. Deploy anti-ship missile batteries on nearby islands as deterrent signal.",
    grayZone: "Activate information operations targeting allied domestic audiences with anti-war messaging. Use commercial shipping contacts to spread rumors of mine-laying.",
    allianceStress: "Ally 3 declines naval participation, citing domestic constraints. Gap in multinational formation visible in satellite imagery. Adversary propaganda highlights 'half-hearted' coalition.",
    domesticVuln: "Incident at sea injures U.S. sailors. Media demands 'proportional response.' Administration caught between escalation and appearing weak. Gas prices spike on insurance fears.",
    accidentalEscalation: "Close encounter between allied destroyer and adversary fast attack craft at night. Collision or weapons discharge. 'Gulf of Tonkin' narrative emerges regardless of facts.",
    pivotTrigger: "Any kinetic incident with casualties on either side \→ situation immediately escalates beyond gray-zone. Pre-planned de-escalation protocols may be overwhelmed by domestic pressure.",
  },
  C: {
    narrative: "Dismiss sanctions as 'paper tigers.' Point to historical sanctions evasion. Frame UNCLOS filing as admission that U.S. lacks military resolve. 'They chose lawyers over warriors.'",
    military: "No military response needed. Continue and expand militia operations undisturbed. Establish permanent 'coast guard station' on disputed feature. Fait accompli accelerates.",
    grayZone: "Retaliate economically against sanctioning states. Offer bilateral trade deals to wavering allies to split coalition. Accelerate island-building during legal proceedings.",
    allianceStress: "Firm allies frustrated by perceived weakness. Ally 1 begins independent military consultations with regional partners, bypassing U.S. framework. Alliance architecture fragmenting.",
    domesticVuln: "Hawks criticize 'Munich-style appeasement.' Think tank consensus emerges that sanctions option failed. Administration appears indecisive. Next adversary provocation tests weakened deterrent.",
    accidentalEscalation: "Low probability but not zero: adversary misreads military restraint as permanent. Tests a kinetic threshold (e.g., fires warning shots at commercial vessel). U.S. forced to respond from position of perceived weakness.",
    pivotTrigger: "Sanctions fail to change behavior within 90 days AND adversary consolidates position \→ must escalate to Option A or B from weaker diplomatic position. Credibility deficit compounds.",
  },
};

// ── Allison Model data (outside component) ──────────────
const ALLISON_LENSES = [
  { id: 'rational', title: 'Rational Actor (Model I)', color: DDI_C.blue,
    question: "What strategic calculation led the adversary to act now?",
    analysis: "The adversary's cost-benefit calculus favors action: alliance cohesion is at a cyclical low (two allies signaling restraint), U.S. domestic political calendar creates a window of distraction, and energy prices make economic retaliation costly for sanctioning states. The rational calculation is that gray-zone action below the kinetic threshold will produce territorial gains without triggering the alliance's collective defense commitment. The decision window is now because delaying allows alliance hardening." },
  { id: 'organizational', title: 'Organizational Process (Model II)', color: DDI_C.green,
    question: "Which organizational routines and SOPs shaped the timing and form of action?",
    analysis: "The maritime militia deployment follows a well-rehearsed playbook previously executed in three prior incidents (2019, 2021, 2024). The 40-vessel deployment size matches the standard 'exercise package' in adversary naval doctrine. Timing coincides with the annual militia readiness cycle. The organizational process explanation suggests this may be less a deliberate strategic decision and more an institutional routine that was authorized rather than designed from scratch. SOPs drive the form; political leadership chose the moment." },
  { id: 'bureaucratic', title: 'Bureaucratic Politics (Model III)', color: DDI_C.gold,
    question: "Which internal factions are driving policy, and what are their competing interests?",
    analysis: "Three factions are visible: (1) The Navy command pushing for assertive maritime presence to justify budget allocation and fleet expansion. (2) The Foreign Ministry preferring diplomatic channels and worried about economic blowback from sanctions. (3) The security services using militia operations to demonstrate relevance and capability. The current policy represents a compromise: the Navy gets presence, the security services get operational control, and the Foreign Ministry retains deniability. A unified allied response could fracture this coalition by raising costs beyond what the Foreign Ministry faction will tolerate." },
  { id: 'domestic', title: 'Domestic Determinants (Model IV)', color: DDI_C.red,
    question: "How do domestic political pressures constrain or enable the adversary's choices?",
    analysis: "The adversary's leadership faces a legitimacy challenge: slowing economic growth has eroded the performance-based social contract. Maritime assertiveness serves as a nationalist pressure valve, diverting domestic attention and demonstrating regime competence. Backing down publicly would be politically costly \— the leadership has cultivated a narrative of 'historical rights recovery.' However, a face-saving off-ramp (mutual de-escalation framed as 'diplomatic victory') is domestically viable if it avoids the appearance of capitulation. The key insight: the adversary needs a narrative of success more than actual territorial gain." },
];

// ── Skills demonstrated tags ────────────────────────────
const SKILLS_TAGS = [
  "Intelligence Assessment (NIE-style)",
  "Structured Analytic Techniques",
  "DIME Framework Application",
  "Strategic Options Development",
  "Red-Team Analysis",
  "Stakeholder Mapping",
  "Allison Decision Models",
  "Ethics & Legitimacy Analysis",
  "Collection Gap Identification",
];

// ── Provenance sources for Phase III ────────────────────
const PROVENANCE_SOURCES = [
  { short: "Defense.docx Module 5", full: "Defense, Diplomacy & Intelligence Course Module 5: Intelligence Assessment Methodology" },
  { short: "DDI Analyst's Bible v1.2", full: "Defense_Diplomacy_Intelligence_Analysts_Bible_v1_2" },
  { short: "def Tranche.docx", full: "Defense Policy Tranche Analysis Framework" },
  { short: "MPAI 610 Syllabus", full: "MPAI 610: Foundations of Intelligence Analysis \— Course Syllabus" },
];

// ── Cosine similarity helper ────────────────────────────
function dimeCosineSimilarity(a, b) {
  const keys = ['d', 'i', 'm', 'e'];
  let dot = 0, magA = 0, magB = 0;
  for (let k = 0; k < keys.length; k++) {
    const av = a[keys[k]], bv = b[keys[k]];
    dot += av * bv;
    magA += av * av;
    magB += bv * bv;
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// ── Scholarly Tips ────────────────────────────────────────────
const DDI_TIPS = {
  dime: "DIME (Diplomacy, Information, Military, Economic) is the framework for national power instruments. But the framework has a blind spot: it treats the instruments as independent levers when in practice they interact. Economic sanctions (E) can undermine diplomatic channels (D). Military posturing (M) can generate information effects (I) both positive (deterrence signaling) and negative (escalation spiral). The art is in the interaction, not the individual instrument.",
  allison: "Graham Allison\u2019s three lenses (Essence of Decision, 1971) were developed to explain the Cuban Missile Crisis. Model I (Rational Actor) asks \u2018what would a unitary rational actor do?\u2019 Model II (Organizational Process) asks \u2018what did the bureaucratic machinery produce?\u2019 Model III (Governmental Politics) asks \u2018who was in the room and what were they bargaining for?\u2019 Most policy analysis defaults to Model I. Most policy failures are explained by Models II and III.",
  redteam: "Red teaming originated in the 19th-century Prussian Kriegsspiel (war game). The modern IC practice requires the red team to adopt the adversary\u2019s strategic culture, not just their capabilities. A red team that thinks like an American analyst pretending to be Chinese will produce American analysis with Chinese names attached. Effective red teaming requires area specialists, language capability, and genuine cultural immersion.",
  coercive: "Thomas Schelling\u2019s coercive diplomacy (Arms and Influence, 1966) distinguishes between compellence (making someone do something) and deterrence (preventing someone from doing something). Compellence is harder because it requires the target to visibly capitulate. Deterrence only requires inaction. This asymmetry explains why sanctions rarely compel but often deter \u2014 and why the threat of force is usually more useful than force itself.",
};

// ════════════════════════════════════════════════════════
// Component
// ════════════════════════════════════════════════════════
// ── DIME Power Radar reference profiles ──────────────
const RADAR_PROFILES = [
  { id: 'containment', label: 'Containment', dime: { d: 80, i: 40, m: 20, e: 85 }, color: '#5a9a6a', desc: 'High diplomatic + economic pressure, minimal military' },
  { id: 'compellence', label: 'Compellence', dime: { d: 45, i: 80, m: 90, e: 50 }, color: '#b05050', desc: 'High military + information, moderate diplomacy' },
  { id: 'engagement', label: 'Engagement', dime: { d: 90, i: 55, m: 15, e: 60 }, color: '#5a7aaa', desc: 'High diplomacy, moderate econ + info, low military' },
];

function DDIAnalysisView({ setView }) {
  const [phase, setPhase] = useState(0);
  const [mode, setMode] = useState('assessment'); // assessment | brief
  const [expandedOption, setExpandedOption] = useState(null);
  const [selectedMechanism, setSelectedMechanism] = useState(null);
  const [dimeValues, setDimeValues] = useState({ d: 40, i: 60, m: 30, e: 50 });
  const [decisions, setDecisions] = useState({});
  const [expandedRedTeam, setExpandedRedTeam] = useState({}); // per-option red team expand
  const [recommendedOption, setRecommendedOption] = useState(null);
  const [radarMode, setRadarMode] = useState(false);
  const [highlightedProfile, setHighlightedProfile] = useState(null);
  const [tipId, setTipId] = useState(null);
  const topRef = useRef(null);

  // ── Top-level mode: lab | crisis | alliance ──────────────
  const [topMode, setTopMode] = useState('lab');

  // ── Crisis Decision Simulator state ──────────────────────
  const [crisisId, setCrisisId] = useState(0);
  const [crisisStep, setCrisisStep] = useState(0);
  const [crisisChoices, setCrisisChoices] = useState([]);

  // ── Alliance Reliability Calculator state ────────────────
  const [allianceId, setAllianceId] = useState(0);
  const [allianceFactors, setAllianceFactors] = useState({ threat: 50, institutional: 50, domestic: 50, asymmetric: 50, credibility: 50 });

  const C = DDI_C;

  // Scholarly tooltip renderer
  var TipBox = function(key) {
    if (tipId !== key) return null;
    return React.createElement('div', { style: { padding: '10px 14px', background: 'rgba(12,15,20,.94)', border: '1px solid rgba(196,160,80,.15)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(212,208,196,.7)', lineHeight: 1.65, margin: '6px 0 10px' } }, DDI_TIPS[key]);
  };

  // SVG micro-icons for scholarly tooltips
  var DiplomaticSealIcon = React.createElement('svg', { width: 22, height: 22, viewBox: '0 0 22 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'dime' ? null : 'dime'); } },
    React.createElement('circle', { cx: 11, cy: 11, r: 9, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 11, cy: 11, r: 5, fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('path', { d: 'M11 2 L12.5 6 L11 5 L9.5 6Z M11 20 L12.5 16 L11 17 L9.5 16Z M2 11 L6 9.5 L5 11 L6 12.5Z M20 11 L16 9.5 L17 11 L16 12.5Z', fill: 'currentColor', fillOpacity: '.25' })
  );

  var ChessPiecesIcon = React.createElement('svg', { width: 24, height: 22, viewBox: '0 0 24 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'allison' ? null : 'allison'); } },
    React.createElement('circle', { cx: 8, cy: 5, r: 2.5, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M5 20 L5 12 Q5 8 8 8 Q11 8 11 12 L11 20Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M14 20 L14 10 L16 6 L18 10 L18 20Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 14, y1: 14, x2: 18, y2: 14, stroke: 'currentColor', strokeWidth: '.4' })
  );

  var RedFlagIcon = React.createElement('svg', { width: 20, height: 24, viewBox: '0 0 20 24', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'redteam' ? null : 'redteam'); } },
    React.createElement('line', { x1: 4, y1: 2, x2: 4, y2: 22, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M4 3 L18 5 L4 12Z', fill: 'currentColor', fillOpacity: '.15', stroke: 'currentColor', strokeWidth: '.8' })
  );

  var BalanceScaleIcon = React.createElement('svg', { width: 26, height: 22, viewBox: '0 0 26 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'coercive' ? null : 'coercive'); } },
    React.createElement('line', { x1: 13, y1: 2, x2: 13, y2: 18, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 4, y1: 6, x2: 22, y2: 6, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M2 14 L4 6 L6 14', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M2 14 Q4 16 6 14', fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('path', { d: 'M20 14 L22 6 L24 14', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M20 14 Q22 16 24 14', fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('line', { x1: 9, y1: 18, x2: 17, y2: 18, stroke: 'currentColor', strokeWidth: '.8' })
  );
  const Serif = DDI_Serif;
  const Sans = DDI_Sans;
  const Mono = DDI_Mono;

  // ── DIME match computation ─────────────────────────────
  const dimeMatches = useMemo(() => {
    return OPTIONS.map(opt => ({
      id: opt.id,
      title: opt.title,
      similarity: Math.round(dimeCosineSimilarity(dimeValues, opt.dime) * 100),
    }));
  }, [dimeValues]);

  const bestDimeMatch = useMemo(() => {
    let best = dimeMatches[0];
    for (let i = 1; i < dimeMatches.length; i++) {
      if (dimeMatches[i].similarity > best.similarity) best = dimeMatches[i];
    }
    return best;
  }, [dimeMatches]);

  // ── Navigation helpers ─────────────────────────────────
  const goNext = useCallback(() => {
    if (phase < PHASES.length - 1) {
      setPhase(phase + 1);
      if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [phase]);

  const optionColor = (id) => id === 'A' ? C.green : id === 'B' ? C.blue : C.gold;

  // ── Render helpers ─────────────────────────────────────
  const PhaseNav = () => (
    React.createElement('div', { style: { padding: '14px 0', borderBottom: '2px solid rgba(140,155,120,.08)', marginBottom: 20 } },
      React.createElement('div', { style: { fontFamily: Mono, fontSize: 9, color: C.tx3, letterSpacing: '.15em', marginBottom: 8, textTransform: 'uppercase' } }, 'BRIEFING AGENDA \u2014 ' + PHASES.length + ' PHASES'),
      React.createElement('div', { style: { display: 'flex', gap: 2, flexWrap: 'wrap' } },
        PHASES.map(function(p, i) {
          var isActive = phase === i;
          var isDone = i < phase;
          return React.createElement('button', {
            key: p.id,
            onClick: function() { setPhase(i); },
            'aria-current': isActive ? 'step' : undefined,
            style: {
              padding: '5px 10px',
              background: isActive ? 'rgba(196,160,80,.1)' : isDone ? 'rgba(90,154,106,.04)' : 'transparent',
              border: isActive ? '1px solid ' + C.gold : '1px solid rgba(140,155,120,.08)',
              borderLeft: isActive ? '3px solid ' + C.gold : isDone ? '3px solid rgba(90,154,106,.3)' : '3px solid transparent',
              borderRadius: 2,
              color: isActive ? C.gold : isDone ? C.green : C.tx3,
              fontFamily: Mono, fontSize: 11, cursor: 'pointer',
              fontWeight: isActive ? 700 : 400,
              transition: 'all .12s ease',
            }
          }, p.num + '. ' + p.title);
        })
      )
    )
  );

  const ModeSwitch = ({ label }) => (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {label && <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginRight: 6 }}>{label}</span>}
      {[['assessment','Full Detail'],['brief','Brief']].map(([id,lbl]) => (
        <button key={id} onClick={() => setMode(id)} style={{
          padding: '4px 12px', background: mode === id ? C.gold : 'transparent',
          border: '1px solid ' + (mode === id ? C.gold : C.line), borderRadius: 4,
          color: mode === id ? '#0c0f14' : C.tx2, fontFamily: Mono, fontSize: 12,
          fontWeight: 600, cursor: 'pointer', letterSpacing: '.04em',
        }}>
          {lbl}
        </button>
      ))}
    </div>
  );

  const SectionHeader = ({ num, title, tag }) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: Mono, fontSize: 12, color: C.gold, fontWeight: 600 }}>{num}</span>
        <h2 style={{ fontFamily: Serif, fontSize: 22, fontWeight: 600, color: C.tx, letterSpacing: '-.02em' }}>{title}</h2>
        {tag && <span style={{ fontFamily: Mono, fontSize: 12, padding: '2px 6px', borderRadius: 3, background: C.goldBg, color: C.goldDm, textTransform: 'uppercase', letterSpacing: '.06em' }}>{tag}</span>}
      </div>
    </div>
  );

  const Card = ({ children, accent, style: s }) => (
    <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderLeft: accent ? '3px solid ' + accent : undefined, borderRadius: 6, padding: 16, ...s }}>
      {children}
    </div>
  );

  const NextButton = ({ label }) => (
    <button onClick={goNext} style={{
      marginTop: 16, padding: '8px 20px', background: C.gold, border: 'none', borderRadius: 4,
      color: '#0c0f14', fontFamily: Mono, fontSize: 11, fontWeight: 600, cursor: 'pointer',
    }}>
      {label || ('Continue to ' + PHASES[Math.min(phase + 1, PHASES.length - 1)].title + ' \→')}
    </button>
  );

  const ProvenanceStrip = () => (
    <div style={{ marginTop: 16, padding: '8px 12px', background: 'rgba(90,122,170,.04)', border: '1px solid rgba(90,122,170,.12)', borderRadius: 4 }}>
      <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, textTransform: 'uppercase', letterSpacing: '.06em' }}>SOURCES: </span>
      {PROVENANCE_SOURCES.map((src, i) => (
        <span key={i} style={{ fontFamily: Mono, fontSize: 11, color: C.blueDm, marginLeft: i > 0 ? 8 : 4 }} title={src.full}>
          {src.short}{i < PROVENANCE_SOURCES.length - 1 ? ' \·' : ''}
        </span>
      ))}
    </div>
  );

  // ── DIME bar with percentage labels (8px min) ──────────
  const DIMEBar = ({ values, showLabels }) => (
    <div style={{ display: 'flex', gap: 6 }}>
      {['d','i','m','e'].map((key) => {
        const labels = { d: 'D', i: 'I', m: 'M', e: 'E' };
        const fullLabels = { d: 'Diplomatic', i: 'Information', m: 'Military', e: 'Economic' };
        const colors = { d: C.green, i: C.blue, m: C.red, e: C.gold };
        return (
          <div key={key} style={{ flex: 1 }}>
            <div style={{ height: 8, background: colors[key] + '20', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: values[key] + '%', background: colors[key], borderRadius: 3, transition: 'width 0.2s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: colors[key] }}>{showLabels ? fullLabels[key] : labels[key]}</span>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>{values[key]}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ── Phase renderers ────────────────────────────────────

  const renderAssignment = () => (
    <div>
      <SectionHeader num="I" title="Assignment" tag="Direct Course Teaching" />
      {mode === 'brief' ? (
        <Card accent={C.gold}>
          <p style={{ fontFamily: Mono, fontSize: 11, color: C.goldDm, marginBottom: 6, textTransform: 'uppercase' }}>BLUF</p>
          <p style={{ fontFamily: Serif, fontSize: 15, color: C.tx, lineHeight: 1.6 }}>
            The NSA requires a strategic options memo addressing maritime corridor disruption. 72-hour decision horizon. Focus: diplomatic-military response with economic/cyber as supporting instruments.
          </p>
        </Card>
      ) : (
        <Card accent={C.gold}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: Mono, fontSize: 11, color: C.goldDm, textTransform: 'uppercase', letterSpacing: '.06em' }}>FROM: {SCENARIO.sender}</span>
          </div>
          <p style={{ fontFamily: Serif, fontSize: 16, color: C.tx, lineHeight: 1.6, marginBottom: 12 }}>
            {SCENARIO.issue}
          </p>
          <div style={{ display: 'grid', gap: 8, fontSize: 12, color: C.tx2 }}>
            <div><span style={{ fontFamily: Mono, color: C.tx3, fontSize: 12 }}>DECISION HORIZON</span><br/>{SCENARIO.horizon}</div>
            <div><span style={{ fontFamily: Mono, color: C.tx3, fontSize: 12 }}>REQUESTED OUTPUT</span><br/>{SCENARIO.output}</div>
            <div><span style={{ fontFamily: Mono, color: C.tx3, fontSize: 12 }}>SCOPE</span><br/>{SCENARIO.scope}</div>
          </div>
        </Card>
      )}
      <NextButton />
    </div>
  );

  const renderMiniCase = () => (
    <div>
      <SectionHeader num="II" title="Mini-Case: Maritime Corridor Crisis" tag="Case File" />
      <ModeSwitch label="DETAIL LEVEL" />
      {mode === 'brief' ? (
        <Card>
          <p style={{ fontFamily: Mono, fontSize: 11, color: C.blueDm, marginBottom: 6, textTransform: 'uppercase' }}>SITUATION SUMMARY</p>
          <p style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.6 }}>
            Major maritime corridor (40% of regional energy trade) blocked by adversary-aligned militia (~40 vessels). Adversary denies directing militia but has naval assets nearby. 4 treaty allies split: 2 firm, 2 wavering. 12 commercial vessels diverted. Decision window: days, not weeks.
          </p>
        </Card>
      ) : (
        <Card>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 4 }}>BACKGROUND</p>
              <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.65 }}>
                A major maritime corridor carrying 40% of regional energy trade has been disrupted by adversary-aligned maritime militia vessels conducting "exercises" that effectively block commercial transit. The adversary state denies directing the militia but has moved naval assets to adjacent waters. Two treaty allies have invoked consultation provisions. Two others have privately urged restraint.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 4 }}>KEY ACTORS</p>
                <div style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6 }}>
                  <p>Adversary State (regional power)</p>
                  <p>Maritime Militia (~40 vessels)</p>
                  <p>4 Treaty Allies (2 firm, 2 wavering)</p>
                  <p>Commercial shipping (12 vessels diverted)</p>
                  <p>Regional fence-sitter states (3)</p>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 4 }}>KNOWN UNKNOWNS</p>
                <div style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6 }}>
                  <p>{'\u2022'} Adversary's actual escalation ceiling</p>
                  <p>{'\u2022'} Militia command-and-control structure</p>
                  <p>{'\u2022'} Wavering allies' private red lines</p>
                  <p>{'\u2022'} Whether second-phase assets are committed</p>
                  <p>{'\u2022'} Commercial shipping rerouting timeline</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
      <NextButton />
    </div>
  );

  const renderAssessment = () => (
    <div>
      <SectionHeader num="III" title="Intelligence Assessment" tag="NIE-Style" />
      <ModeSwitch label="FORMAT" />
      {mode === 'brief' ? (
        <Card accent={C.blue}>
          <p style={{ fontFamily: Mono, fontSize: 11, color: C.blueDm, marginBottom: 8, textTransform: 'uppercase' }}>BOTTOM LINE UP FRONT</p>
          <p style={{ fontFamily: Serif, fontSize: 15, color: C.tx, lineHeight: 1.6 }}>
            {KEY_JUDGMENTS[0].judgment} Allied resolve is fragile (Moderate confidence). Commercial rerouting begins in 5-7 days ($2-4B/week). A decision window exists but is closing.
          </p>
        </Card>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {KEY_JUDGMENTS.map((kj, i) => (
            <Card key={i} accent={kj.confidence === 'High' ? C.green : kj.confidence === 'Low' ? C.red : C.gold}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>KEY JUDGMENT {i + 1}</span>
                <span style={{ fontFamily: Mono, fontSize: 11, padding: '2px 6px', borderRadius: 3,
                  background: kj.confidence === 'High' ? C.greenBg : kj.confidence === 'Low' ? C.redBg : C.goldBg,
                  color: kj.confidence === 'High' ? C.green : kj.confidence === 'Low' ? C.red : C.gold,
                }}>{kj.confidence} Confidence</span>
              </div>
              <p style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.65, marginBottom: 8 }}>
                {kj.judgment}
              </p>
              <p style={{ fontSize: 11, color: C.tx3, lineHeight: 1.6 }}>
                <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>BASIS: </span>{kj.basis}
              </p>
            </Card>
          ))}
        </div>
      )}
      <ProvenanceStrip />
      <NextButton />
    </div>
  );

  const renderInterests = () => (
    <div>
      <SectionHeader num="IV" title="National Interests Hierarchy" tag="Ranked Architecture" />
      <ModeSwitch label="DETAIL" />
      {mode === 'brief' ? (
        <Card>
          <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 6 }}>INTEREST TIERS (SUMMARY)</p>
          {INTERESTS.map((tier) => (
            <div key={tier.tier} style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: tier.color, fontWeight: 600, width: 140, flexShrink: 0 }}>{tier.tier}</span>
              <span style={{ fontSize: 11, color: C.tx2 }}>{tier.items.join('; ')}</span>
            </div>
          ))}
        </Card>
      ) : (
        <div style={{ display: 'grid', gap: 6 }}>
          {INTERESTS.map((tier) => (
            <Card key={tier.tier} accent={tier.color}>
              <p style={{ fontFamily: Mono, fontSize: 12, color: tier.color, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>{tier.tier}</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 4 }}>
                {tier.items.map((item, i) => (
                  <li key={i} style={{ fontSize: 12, color: C.tx, lineHeight: 1.6, paddingLeft: 12, borderLeft: '2px solid ' + tier.color + '30' }}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
      <NextButton />
    </div>
  );

  const renderStakeholders = () => (
    <div>
      <SectionHeader num="V" title="Stakeholder Objectives & Constraints" tag="Coalition Map" />
      <ModeSwitch label="DETAIL" />
      {mode === 'brief' ? (
        <Card>
          <div style={{ fontSize: 11, color: C.tx2 }}>
            <p style={{ marginBottom: 4 }}><strong style={{ color: C.tx }}>6 key actors</strong> mapped. U.S. seeks restored FON + alliance credibility. Adversary tests cohesion via deniable militia. Coalition split: 2 firm allies (basing + intel), 2 wavering (swing votes). Commercial shipping and domestic audience amplify pressure on timeline.</p>
          </div>
        </Card>
      ) : (
        <div style={{ display: 'grid', gap: 6 }}>
          {STAKEHOLDERS.map((s) => (
            <Card key={s.actor} accent={s.actor === 'Adversary State' ? C.red : s.actor === 'United States' ? C.blue : C.tx3}>
              <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx, fontWeight: 600, marginBottom: 6 }}>{s.actor}</p>
              {/* Core info: 2-column for prose content */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11, color: C.tx2, marginBottom: 8 }}>
                <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>OBJECTIVE</span><br/>{s.objective}</div>
                <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>MAIN FEAR</span><br/>{s.fear}</div>
              </div>
              <div style={{ fontSize: 11, color: C.tx2, marginBottom: 8 }}>
                <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>LEVERAGE</span><br/>{s.leverage}
              </div>
              {/* Likely reaction to each option */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, fontSize: 12, marginBottom: 6 }}>
                {OPTIONS.map((opt) => (
                  <div key={opt.id} style={{ padding: '4px 6px', background: optionColor(opt.id) + '08', borderRadius: 3 }}>
                    <span style={{ fontFamily: Mono, fontSize: 12, color: optionColor(opt.id) }}>REACTION TO {opt.id}</span>
                    <p style={{ color: C.tx2, marginTop: 2, lineHeight: 1.3 }}>{s.reaction[opt.id]}</p>
                  </div>
                ))}
              </div>
              {/* Coalition value / spoiler risk */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 12 }}>
                <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.green }}>COALITION VALUE</span><p style={{ color: C.tx2, marginTop: 2 }}>{s.coalition.value}</p></div>
                <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.red }}>SPOILER RISK</span><p style={{ color: C.tx2, marginTop: 2 }}>{s.coalition.spoiler}</p></div>
              </div>
            </Card>
          ))}
        </div>
      )}
      <NextButton />
    </div>
  );

  const renderSAT = () => (
    <div>
      <SectionHeader num="VI" title="Structured Analytic Technique Disclosure" tag="Tradecraft Transparency" />
      <ModeSwitch label="DETAIL" />
      {mode === 'brief' ? (
        <Card accent={C.blue}>
          <p style={{ fontFamily: Mono, fontSize: 11, color: C.blueDm, marginBottom: 6, textTransform: 'uppercase' }}>SAT SUMMARY</p>
          <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.65 }}>
            ACH + Alternative Futures (2x2 matrix) selected to map adversary intent hypotheses against outcome space. Cannot compensate for collection gap on adversary escalation decision (KJ4).
          </p>
        </Card>
      ) : (
        <Card accent={C.blue}>
          <div style={{ display: 'grid', gap: 8 }}>
            <div><span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>INTELLIGENCE QUESTION</span><p style={{ fontSize: 12, color: C.tx }}>What is the adversary's strategic objective, and is there a decision window for U.S. response before the situation becomes self-sustaining?</p></div>
            <div><span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>REJECTED VARIANTS</span><p style={{ fontSize: 11, color: C.tx2 }}>"Will the adversary attack?" (too binary) {'\·'} "What should we do?" (policy, not intelligence) {'\·'} "Is this a crisis?" (definitional, not analytic)</p></div>
            <div><span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>CHOSEN SAT</span><p style={{ fontSize: 12, color: C.tx }}>Analysis of Competing Hypotheses (ACH) + Alternative Futures (2x2 matrix)</p></div>
            <div><span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>WHY SELECTED</span><p style={{ fontSize: 11, color: C.tx2 }}>ACH forces consideration of adversary intent hypotheses against available evidence, reducing confirmation bias. Alternative Futures maps outcome space along two key uncertainties (allied cohesion x adversary escalation ceiling).</p></div>
            <div><span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>WHAT IT COULD NOT RESOLVE</span><p style={{ fontSize: 11, color: C.tx2 }}>SAT cannot compensate for the intelligence gap on adversary's actual escalation decision. The low-moderate confidence on Key Judgment 4 reflects a collection limitation, not an analytic one.</p></div>
          </div>
        </Card>
      )}
      <NextButton />
    </div>
  );

  const renderAllison = () => (
    <div>
      <SectionHeader num="VI-B" title="Allison Explanation Panel" tag="Why Now?" />
      <p style={{ fontSize: 12, color: C.tx2, marginBottom: 12, lineHeight: 1.65, maxWidth: 720 }}>
        Four analytic lenses applied to the central question: <strong style={{ color: C.gold }}>Why did the adversary choose this moment to act?</strong> Each lens generates different predictions about adversary behavior under each response option.
        {ChessPiecesIcon}
      </p>
      {TipBox('allison')}
      <ModeSwitch label="DETAIL" />
      {mode === 'brief' ? (
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {ALLISON_LENSES.map((lens) => (
              <div key={lens.id} style={{ padding: '8px', borderLeft: '3px solid ' + lens.color }}>
                <p style={{ fontFamily: Mono, fontSize: 12, color: lens.color, fontWeight: 600, marginBottom: 4 }}>{lens.title}</p>
                <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6 }}>{lens.question}</p>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {ALLISON_LENSES.map((lens) => (
            <Card key={lens.id} accent={lens.color}>
              <p style={{ fontFamily: Mono, fontSize: 11, color: lens.color, fontWeight: 600, marginBottom: 4 }}>{lens.title}</p>
              <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 8 }}>{lens.question}</p>
              {/* Full-width prose for readability */}
              <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.6 }}>{lens.analysis}</p>
            </Card>
          ))}
        </div>
      )}
      <NextButton />
    </div>
  );

  // ── Power Radar SVG ─────────────────────────────────
  const renderPowerRadar = () => {
    const cx = 250, cy = 250, maxR = 180;
    const axes = [
      { key: 'd', label: 'Diplomatic', angle: -90 },
      { key: 'i', label: 'Information', angle: 0 },
      { key: 'm', label: 'Military', angle: 90 },
      { key: 'e', label: 'Economic', angle: 180 },
    ];
    const toRad = (deg) => deg * Math.PI / 180;
    const ptAt = (angle, pct) => ({
      x: cx + Math.cos(toRad(angle)) * (pct / 100) * maxR,
      y: cy + Math.sin(toRad(angle)) * (pct / 100) * maxR,
    });
    const polyPoints = (dime) => axes.map(a => {
      const p = ptAt(a.angle, dime[a.key]);
      return p.x + ',' + p.y;
    }).join(' ');

    const optionPolys = OPTIONS.map(opt => ({
      id: opt.id,
      label: opt.title,
      points: polyPoints(opt.dime),
      color: opt.id === 'A' ? C.green : opt.id === 'B' ? C.blue : C.gold,
    }));

    const userPoints = polyPoints(dimeValues);

    return (
      <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <p style={{ fontFamily: Mono, fontSize: 12, color: C.gold, fontWeight: 600 }}>DIME POWER RADAR</p>
          <div style={{ display: 'flex', gap: 4 }}>
            {OPTIONS.map(opt => (
              <button key={opt.id} onClick={() => setHighlightedProfile(highlightedProfile === opt.id ? null : opt.id)}
                style={{
                  padding: '2px 8px', borderRadius: 3, cursor: 'pointer',
                  background: highlightedProfile === opt.id ? (opt.id === 'A' ? C.greenBg : opt.id === 'B' ? C.blueBg : C.goldBg) : 'transparent',
                  border: '1px solid ' + (highlightedProfile === opt.id ? (opt.id === 'A' ? C.green : opt.id === 'B' ? C.blue : C.gold) : C.line),
                  fontFamily: Mono, fontSize: 11, color: opt.id === 'A' ? C.green : opt.id === 'B' ? C.blue : C.gold,
                }}>
                Opt {opt.id}
              </button>
            ))}
          </div>
        </div>

        <svg viewBox="0 0 500 500" style={{ width: '100%', maxWidth: 460, display: 'block', margin: '0 auto' }}>
          {/* Background grid rings */}
          {[20, 40, 60, 80, 100].map(pct => (
            <polygon key={pct}
              points={axes.map(a => { const p = ptAt(a.angle, pct); return p.x + ',' + p.y; }).join(' ')}
              fill="none" stroke={C.line} strokeWidth={pct === 100 ? 1.5 : 0.5} strokeDasharray={pct < 100 ? '2,4' : 'none'}
            />
          ))}

          {/* Axis lines */}
          {axes.map(a => {
            const p = ptAt(a.angle, 100);
            return <line key={a.key} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={C.line} strokeWidth={0.7} />;
          })}

          {/* Axis labels */}
          {axes.map(a => {
            const p = ptAt(a.angle, 115);
            return (
              <text key={a.key + 'lbl'} x={p.x} y={p.y} fill={C.tx2}
                textAnchor="middle" dominantBaseline="middle"
                style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace" }}>
                {a.label}
              </text>
            );
          })}

          {/* Reference profile polygons (dashed) */}
          {RADAR_PROFILES.map(prof => (
            <polygon key={prof.id}
              points={polyPoints(prof.dime)}
              fill={prof.color + '10'} stroke={prof.color} strokeWidth={1.2}
              strokeDasharray="6,3" opacity={0.6}
            />
          ))}

          {/* Option polygons */}
          {optionPolys.map(op => (
            <polygon key={op.id}
              points={op.points}
              fill={op.color + '1a'} stroke={op.color} strokeWidth={highlightedProfile === op.id ? 2.5 : 1}
              opacity={highlightedProfile && highlightedProfile !== op.id ? 0.2 : 0.7}
              style={{ transition: 'all .2s ease', cursor: 'pointer' }}
              onClick={() => setHighlightedProfile(highlightedProfile === op.id ? null : op.id)}
            />
          ))}

          {/* User polygon (bold, white) */}
          <polygon points={userPoints}
            fill="rgba(255,255,255,.08)" stroke="#ffffff" strokeWidth={2}
          />
          {/* User vertex dots */}
          {axes.map(a => {
            const p = ptAt(a.angle, dimeValues[a.key]);
            return <circle key={a.key + 'dot'} cx={p.x} cy={p.y} r={4} fill="#ffffff" stroke={C.bg} strokeWidth={1.5} />;
          })}

          {/* Grid labels (pct) */}
          {[20, 40, 60, 80].map(pct => (
            <text key={'gl' + pct} x={cx + 4} y={cy - (pct / 100) * maxR + 3}
              fill={C.tx3} style={{ fontSize: 12, fontFamily: "'IBM Plex Mono',monospace" }}>
              {pct}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12, justifyContent: 'center' }}>
          <span style={{ fontFamily: Mono, fontSize: 11, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 16, height: 2, background: '#ffffff', display: 'inline-block' }}></span> Your Mix
          </span>
          {OPTIONS.map(op => (
            <span key={op.id} style={{ fontFamily: Mono, fontSize: 11, color: op.id === 'A' ? C.green : op.id === 'B' ? C.blue : C.gold, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 16, height: 2, background: op.id === 'A' ? C.green : op.id === 'B' ? C.blue : C.gold, display: 'inline-block' }}></span> Option {op.id}
            </span>
          ))}
          {RADAR_PROFILES.map(prof => (
            <span key={prof.id} style={{ fontFamily: Mono, fontSize: 11, color: prof.color, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 16, height: 2, background: prof.color, display: 'inline-block', borderTop: '1px dashed ' + prof.color }}></span> {prof.label}
            </span>
          ))}
        </div>

        {/* Reference profile descriptions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
          {RADAR_PROFILES.map(prof => (
            <div key={prof.id} style={{ padding: 8, borderRadius: 4, border: '1px solid ' + prof.color + '30', background: prof.color + '08' }}>
              <p style={{ fontFamily: Mono, fontSize: 12, color: prof.color, fontWeight: 600, marginBottom: 2 }}>{prof.label}</p>
              <p style={{ fontSize: 11, color: C.tx3, lineHeight: 1.6 }}>{prof.desc}</p>
              <div style={{ marginTop: 4 }}>
                {axes.map(a => (
                  <span key={a.key} style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, marginRight: 6 }}>
                    {a.label.charAt(0)}:{prof.dime[a.key]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLevers = () => (
    <div>
      <SectionHeader num="VII" title="Mechanism-First Lever Engine" tag="Augmentation" />
      <ModeSwitch label="DETAIL" />
      <p style={{ fontSize: 12, color: C.tx2, marginBottom: 12, lineHeight: 1.65 }}>
        Choose the <strong style={{ color: C.gold }}>mechanism of influence</strong> first, then map instruments against it. DIME is a taxonomy, not a decision rule.
        {DiplomaticSealIcon}
        {BalanceScaleIcon}
      </p>
      {TipBox('dime')}
      {TipBox('coercive')}
      {mode === 'brief' ? (
        <Card>
          <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 6 }}>6 MECHANISMS</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {MECHANISMS.map((m) => (
              <div key={m.id} style={{ fontSize: 11, color: C.tx2, padding: '2px 0' }}>
                <strong style={{ color: C.tx }}>{m.label}:</strong> {m.desc.split(' ').slice(0, 8).join(' ')}...
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <React.Fragment>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 16 }}>
            {MECHANISMS.map((m) => (
              <button key={m.id} onClick={() => setSelectedMechanism(m.id === selectedMechanism ? null : m.id)} style={{
                padding: 10, background: selectedMechanism === m.id ? C.goldBg : C.card,
                border: '1px solid ' + (selectedMechanism === m.id ? C.gold : C.cardBd),
                borderRadius: 6, cursor: 'pointer', textAlign: 'left',
              }}>
                <p style={{ fontFamily: Mono, fontSize: 11, color: selectedMechanism === m.id ? C.gold : C.tx, fontWeight: 600, marginBottom: 4 }}>{m.label}</p>
                <p style={{ fontSize: 12, color: C.tx3, lineHeight: 1.6 }}>{m.desc}</p>
              </button>
            ))}
          </div>

          {/* DIME Sliders — Control Room Levers */}
          <Card style={{ background: 'rgba(12,15,20,.95)', border: '2px solid rgba(140,155,120,.12)', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" style={{ opacity: 0.4 }}>
                <rect x="2" y="1" width="3" height="14" rx="1" fill="none" stroke={C.green} strokeWidth="0.8" />
                <rect x="6.5" y="4" width="3" height="11" rx="1" fill="none" stroke={C.blue} strokeWidth="0.8" />
                <rect x="11" y="2" width="3" height="13" rx="1" fill="none" stroke={C.red} strokeWidth="0.8" />
              </svg>
              <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: '.08em', textTransform: 'uppercase' }}>INSTRUMENT INTENSITY CONTROLS</p>
            </div>
            {['d','i','m','e'].map((key) => {
              const labels = { d: 'Diplomatic', i: 'Information', m: 'Military', e: 'Economic' };
              const colors = { d: C.green, i: C.blue, m: C.red, e: C.gold };
              const icons = { d: 'D', i: 'I', m: 'M', e: 'E' };
              return (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, padding: '6px 10px', background: 'rgba(255,255,255,.015)', borderRadius: 4, border: '1px solid rgba(255,255,255,.03)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 4, background: colors[key] + '15', border: '1px solid ' + colors[key] + '40', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: Mono, fontSize: 13, fontWeight: 700, color: colors[key] }}>{icons[key]}</div>
                  <span style={{ fontFamily: Mono, fontSize: 11, color: colors[key], width: 80 }}>{labels[key]}</span>
                  <input type="range" min={0} max={100} value={dimeValues[key]}
                    onChange={(e) => setDimeValues(prev => ({ ...prev, [key]: parseInt(e.target.value, 10) }))}
                    style={{ flex: 1, accentColor: colors[key], height: 6 }}
                    aria-label={labels[key] + ' intensity'} />
                  <div style={{ width: 48, textAlign: 'right', padding: '2px 6px', background: colors[key] + '10', borderRadius: 3, border: '1px solid ' + colors[key] + '25' }}>
                    <span style={{ fontFamily: Mono, fontSize: 12, color: colors[key], fontWeight: 600 }}>{dimeValues[key]}%</span>
                  </div>
                </div>
              );
            })}
            {/* DIME match readout */}
            <div style={{ marginTop: 12, padding: '8px 12px', background: C.goldBg, borderRadius: 4, border: '1px solid ' + C.goldDm + '30' }}>
              <p style={{ fontFamily: Mono, fontSize: 12, color: C.gold, fontWeight: 600, marginBottom: 4 }}>
                Your mix most resembles Option {bestDimeMatch.id} ({bestDimeMatch.similarity}% match)
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {dimeMatches.map((dm) => (
                  <span key={dm.id} style={{ fontFamily: Mono, fontSize: 11, color: dm.id === bestDimeMatch.id ? C.gold : C.tx3 }}>
                    {dm.id}: {dm.similarity}%
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Power Radar toggle */}
          <div style={{ marginTop: 12 }}>
            <button onClick={() => setRadarMode(!radarMode)} style={{
              padding: '8px 16px', borderRadius: 4, cursor: 'pointer',
              background: radarMode ? C.goldBg : C.card,
              border: '1px solid ' + (radarMode ? C.gold : C.cardBd),
              fontFamily: Mono, fontSize: 11, color: radarMode ? C.gold : C.tx2,
              fontWeight: 600, width: '100%', textAlign: 'center',
            }}>
              {radarMode ? '\▼ Hide Power Radar' : '\u25B6 Show Power Radar \— DIME Profile Visualization'}
            </button>
          </div>
          {radarMode && renderPowerRadar()}
        </React.Fragment>
      )}
      <NextButton />
    </div>
  );

  const renderOptions = () => (
    <div>
      <SectionHeader num="VIII" title="Strategic Options Memo" tag="Three Distinct Options" />
      <ModeSwitch label="DETAIL" />
      {mode === 'brief' ? (
        <Card>
          <div style={{ display: 'grid', gap: 8 }}>
            {OPTIONS.map((opt) => (
              <div key={opt.id} style={{ display: 'flex', gap: 8, alignItems: 'baseline', padding: '4px 0', borderBottom: '1px solid ' + C.line }}>
                <span style={{ fontFamily: Mono, fontSize: 11, color: optionColor(opt.id), fontWeight: 600, width: 24 }}>{opt.id}</span>
                <div>
                  <span style={{ fontSize: 12, color: C.tx, fontWeight: 600 }}>{opt.title}</span>
                  <span style={{ fontSize: 11, color: C.tx2, marginLeft: 8 }}>DIME: D{opt.dime.d} I{opt.dime.i} M{opt.dime.m} E{opt.dime.e}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {OPTIONS.map((opt) => {
            const isExpanded = expandedOption === opt.id;
            return (
              <div key={opt.id}
                role="button"
                tabIndex={0}
                onClick={() => setExpandedOption(isExpanded ? null : opt.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedOption(isExpanded ? null : opt.id); } }}
                style={{ cursor: 'pointer', outline: 'none' }}
                aria-expanded={isExpanded}
              >
                <Card accent={optionColor(opt.id)} style={{
                  border: isExpanded ? '2px solid ' + optionColor(opt.id) : '1px solid ' + C.cardBd,
                  background: isExpanded ? 'rgba(16,20,28,.95)' : C.card,
                  boxShadow: isExpanded ? '0 4px 20px rgba(0,0,0,.3)' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, letterSpacing: '.1em' }}>POLICY MEMORANDUM</span>
                        <span style={{ fontFamily: Mono, fontSize: 12, padding: '1px 8px', borderRadius: 3, background: optionColor(opt.id) + '15', color: optionColor(opt.id), fontWeight: 700, border: '1px solid ' + optionColor(opt.id) + '30' }}>OPTION {opt.id}</span>
                      </div>
                      <h3 style={{ fontFamily: Serif, fontSize: 17, color: C.tx, fontWeight: 600, marginTop: 4 }}>{opt.title}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {opt.mechanisms.map((m) => (
                        <span key={m} style={{ fontFamily: Mono, fontSize: 12, padding: '2px 5px', borderRadius: 3, background: C.goldBg, color: C.goldDm }}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.65 }}>{opt.summary}</p>

                  {isExpanded && (
                    <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
                      {/* DIME visualization — 8px bars with % labels */}
                      <DIMEBar values={opt.dime} showLabels={false} />

                      {/* Strengths & Risks — 2-column */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <div>
                          <p style={{ fontFamily: Mono, fontSize: 11, color: C.green, marginBottom: 4 }}>STRENGTHS</p>
                          {opt.strengths.map((s, i) => (
                            <p key={i} style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6, marginBottom: 2 }}>+ {s}</p>
                          ))}
                        </div>
                        <div>
                          <p style={{ fontFamily: Mono, fontSize: 11, color: C.red, marginBottom: 4 }}>RISKS</p>
                          {opt.risks.map((r, i) => (
                            <p key={i} style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6, marginBottom: 2 }}>- {r}</p>
                          ))}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div style={{ padding: 8, background: C.goldBg, borderRadius: 4 }}>
                        <p style={{ fontFamily: Mono, fontSize: 11, color: C.goldDm, marginBottom: 4 }}>IMPLEMENTATION TIMELINE</p>
                        <p style={{ fontSize: 11, color: C.tx2 }}>{opt.timeline}</p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {/* Defended Recommendation Block */}
      <div style={{ marginTop: 20, padding: 16, background: 'rgba(196,160,80,.04)', border: '1px solid ' + C.goldDm + '40', borderRadius: 6 }}>
        <p style={{ fontFamily: Mono, fontSize: 12, color: C.gold, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>ANALYST RECOMMENDATION</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {OPTIONS.map((opt) => (
            <button key={opt.id}
              onClick={() => setRecommendedOption(opt.id)}
              style={{
                flex: 1, padding: '8px 12px', cursor: 'pointer',
                background: recommendedOption === opt.id ? optionColor(opt.id) + '20' : C.card,
                border: '1px solid ' + (recommendedOption === opt.id ? optionColor(opt.id) : C.cardBd),
                borderRadius: 4, textAlign: 'center',
              }}
            >
              <span style={{ fontFamily: Mono, fontSize: 11, color: recommendedOption === opt.id ? optionColor(opt.id) : C.tx2, fontWeight: 600 }}>
                Option {opt.id}
              </span>
            </button>
          ))}
        </div>

        {recommendedOption && (() => {
          const opt = OPTIONS.find(o => o.id === recommendedOption);
          return (
            <div style={{ display: 'grid', gap: 8 }}>
              <div>
                <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>SELECTED</p>
                <p style={{ fontFamily: Serif, fontSize: 15, color: C.tx, fontWeight: 600 }}>Option {opt.id}: {opt.title}</p>
              </div>
              <div>
                <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>RATIONALE ON VITAL INTEREST AXIS</p>
                <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.65 }}>{opt.vitalInterest}</p>
              </div>
              <div style={{ padding: '8px 12px', background: C.redBg, borderRadius: 4, border: '1px solid ' + C.redDm + '30' }}>
                <p style={{ fontFamily: Mono, fontSize: 11, color: C.red, marginBottom: 4 }}>KEY INVALIDATING ASSUMPTION</p>
                <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6 }}>{opt.invalidatingAssumption}</p>
              </div>
            </div>
          );
        })()}

        {!recommendedOption && (
          <p style={{ fontSize: 11, color: C.tx3, fontStyle: 'italic' }}>Select an option above to generate the defended recommendation.</p>
        )}
      </div>

      <NextButton />
    </div>
  );

  const renderRedTeam = () => (
    <div>
      <SectionHeader num="IX" title="Red-Team Countermove Board" tag="Adversary Adaptation" />
      <div style={{ padding: '12px 16px', marginBottom: 16, background: 'rgba(176,80,80,.04)', border: '1px solid rgba(176,80,80,.15)', borderRadius: 6, borderLeft: '4px solid ' + C.red }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ opacity: 0.6 }}>
            <path d="M8 1 L15 13 L1 13Z" fill="none" stroke="#b05050" strokeWidth="1.2" />
            <line x1="8" y1="6" x2="8" y2="9" stroke="#b05050" strokeWidth="1" />
            <circle cx="8" cy="11" r="0.8" fill="#b05050" />
          </svg>
          <span style={{ fontFamily: Mono, fontSize: 11, color: C.red, fontWeight: 700, letterSpacing: '.1em' }}>ADVERSARIAL ANALYSIS ZONE</span>
        </div>
        <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.65 }}>
          For each option, expand to reveal <strong style={{ color: C.red }}>7 adversary adaptation dimensions</strong>. Click an option to see the full red-team analysis.
          {RedFlagIcon}
        </p>
      </div>
      {TipBox('redteam')}
      <div style={{ display: 'grid', gap: 8 }}>
        {OPTIONS.map((opt) => {
          const isExpanded = expandedRedTeam[opt.id] || false;
          const rtData = RED_TEAM_DATA[opt.id];
          const dimensions = [
            { label: 'Narrative Response', key: 'narrative', icon: '\ud83d\udce2' },
            { label: 'Military Countermove', key: 'military', icon: '\u2694' },
            { label: 'Gray-Zone Adjustment', key: 'grayZone', icon: '\ud83c\udf2b' },
            { label: 'Alliance Stress Point', key: 'allianceStress', icon: '\ud83d\udd17' },
            { label: 'Domestic Political Vulnerability', key: 'domesticVuln', icon: '\ud83c\udfd9' },
            { label: 'Accidental Escalation Pathway', key: 'accidentalEscalation', icon: '\u26a0' },
            { label: 'Pivot Trigger', key: 'pivotTrigger', icon: '\u21bb' },
          ];
          return (
            <div key={opt.id}>
              <Card accent={optionColor(opt.id)}>
                <button
                  onClick={() => setExpandedRedTeam(prev => ({ ...prev, [opt.id]: !prev[opt.id] }))}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedRedTeam(prev => ({ ...prev, [opt.id]: !prev[opt.id] })); } }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: 0,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                  aria-expanded={isExpanded}
                >
                  <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx, fontWeight: 600 }}>OPTION {opt.id}: {opt.title}</p>
                  <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>{isExpanded ? '\u25bc' : '\u25b6'} 7 dimensions</span>
                </button>

                {isExpanded && (
                  <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {dimensions.map((dim, di) => (
                      <div key={dim.key} style={{
                        padding: '10px 12px',
                        background: dim.key === 'accidentalEscalation' || dim.key === 'pivotTrigger'
                          ? 'rgba(176,80,80,.1)' : 'rgba(176,80,80,.05)',
                        borderRadius: 4,
                        border: '1px solid rgba(176,80,80,.18)',
                        borderLeft: '3px solid ' + (dim.key === 'accidentalEscalation' ? '#d04040' : dim.key === 'pivotTrigger' ? '#c06030' : C.redDm + '60'),
                      }}>
                        <p style={{ fontFamily: Mono, fontSize: 10, color: C.red, marginBottom: 4, fontWeight: 700, letterSpacing: '.06em' }}>{dim.icon} {dim.label.toUpperCase()}</p>
                        <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.65 }}>{rtData[dim.key]}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>
      <NextButton />
    </div>
  );

  const renderImplementation = () => {
    const timeWindows = [
      { window: 'First 72 Hours', color: C.red, actions: [
        { action: 'Deliver diplomatic communication to adversary', owner: 'State/NSC', signal: 'Private \→ public if rejected' },
        { action: 'Activate allied consultation framework', owner: 'State/DoD', signal: 'Alliance solidarity demonstration' },
        { action: 'Reposition naval assets to theater', owner: 'DoD/INDOPACOM', signal: 'Visible prepositioning' },
      ]},
      { window: 'First 30 Days', color: C.gold, actions: [
        { action: 'Sustain FON operations or diplomatic track', owner: 'NSC coordination', signal: 'Sustained resolve' },
        { action: 'Implement economic measures', owner: 'Treasury/Commerce', signal: 'Escalating costs' },
        { action: 'Strategic declassification of adversary actions', owner: 'DNI/State', signal: 'Narrative control' },
      ]},
      { window: '90+ Day Posture', color: C.green, actions: [
        { action: 'Assess benchmark achievement', owner: 'NSC/IC', signal: 'Adjust or sustain' },
        { action: 'Coalition burden-sharing review', owner: 'State/DoD', signal: 'Long-term sustainability' },
        { action: 'Off-ramp negotiation if benchmarks met', owner: 'State', signal: 'De-escalation pathway' },
      ]},
    ];

    return (
      <div>
        <SectionHeader num="X" title="Implementation Timeline" tag="NSC Implementation Annex" />
        <ModeSwitch label="DETAIL" />
        {mode === 'brief' ? (
          <Card>
            <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 6 }}>TIMELINE SUMMARY</p>
            {timeWindows.map((tw) => (
              <div key={tw.window} style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontFamily: Mono, fontSize: 12, color: tw.color, fontWeight: 600, width: 120, flexShrink: 0 }}>{tw.window}</span>
                <span style={{ fontSize: 11, color: C.tx2 }}>{tw.actions.map(a => a.action).join('; ')}</span>
              </div>
            ))}
          </Card>
        ) : (
          <div style={{ display: 'grid', gap: 6 }}>
            {timeWindows.map((tw) => (
              <Card key={tw.window} accent={tw.color}>
                <p style={{ fontFamily: Mono, fontSize: 11, color: tw.color, fontWeight: 600, marginBottom: 8 }}>{tw.window}</p>
                {tw.actions.map((a, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 140px', gap: 8, fontSize: 11, marginBottom: 4, padding: '4px 0', borderBottom: '1px solid ' + C.line }}>
                    <span style={{ color: C.tx }}>{a.action}</span>
                    <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>{a.owner}</span>
                    <span style={{ fontSize: 12, color: C.tx2 }}>{a.signal}</span>
                  </div>
                ))}
              </Card>
            ))}
          </div>
        )}
        <NextButton />
      </div>
    );
  };

  const renderCollection = () => {
    const gaps = [
      { variable: 'Adversary escalation decision', requirement: 'Has the adversary committed to second-phase operations?', int: 'SIGINT + HUMINT', latency: '24-48h', deception: 'High', benchmark: 'Key Judgment 4' },
      { variable: 'Allied private red lines', requirement: 'What conditions would cause Allies 3-4 to defect?', int: 'HUMINT (diplomatic)', latency: '48-72h', deception: 'Low', benchmark: 'Coalition coherence' },
      { variable: 'Militia C2 structure', requirement: 'Is militia under direct adversary military control?', int: 'SIGINT + GEOINT', latency: '24h', deception: 'Moderate', benchmark: 'Attribution confidence' },
      { variable: 'Commercial rerouting timeline', requirement: 'When will shipping companies permanently reroute?', int: 'OSINT + commercial', latency: '72h', deception: 'None', benchmark: 'Economic pressure clock' },
    ];

    return (
      <div>
        <SectionHeader num="XI" title="Collection Gaps & Warning Annex" tag="Intelligence Support" />
        <ModeSwitch label="DETAIL" />
        {mode === 'brief' ? (
          <Card>
            <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 6 }}>4 CRITICAL GAPS</p>
            {gaps.map((gap) => (
              <div key={gap.variable} style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontFamily: Mono, fontSize: 12, color: C.blue, width: 180, flexShrink: 0 }}>{gap.variable}</span>
                <span style={{ fontSize: 11, color: C.tx2 }}>{gap.int} | {gap.latency}</span>
              </div>
            ))}
          </Card>
        ) : (
          <Card>
            <div style={{ display: 'grid', gap: 6 }}>
              {gaps.map((gap) => (
                <div key={gap.variable} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px 60px 70px 100px', gap: 6, fontSize: 12, padding: '6px 0', borderBottom: '1px solid ' + C.line, alignItems: 'start' }}>
                  <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>VARIABLE</span><br/><span style={{ color: C.tx }}>{gap.variable}</span></div>
                  <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>REQUIREMENT</span><br/><span style={{ color: C.tx2 }}>{gap.requirement}</span></div>
                  <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>INT</span><br/><span style={{ color: C.blue }}>{gap.int}</span></div>
                  <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>LATENCY</span><br/><span style={{ color: C.tx2 }}>{gap.latency}</span></div>
                  <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>DECEPTION</span><br/><span style={{ color: gap.deception === 'High' ? C.red : gap.deception === 'Moderate' ? C.gold : C.green }}>{gap.deception}</span></div>
                  <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>BENCHMARK</span><br/><span style={{ color: C.tx2 }}>{gap.benchmark}</span></div>
                </div>
              ))}
            </div>
          </Card>
        )}
        <NextButton />
      </div>
    );
  };

  const renderEthics = () => (
    <div>
      <SectionHeader num="XII" title="Ethics, Legality & Legitimacy" tag="Constraint Analysis" />
      <ModeSwitch label="DETAIL" />
      {mode === 'brief' ? (
        <Card>
          <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 6 }}>ETHICS SUMMARY</p>
          <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.65 }}>
            Option C has lowest legitimacy risk and broadest support. Option B has strongest proportionality (military to military) but highest escalation risk. Option A is moderate on both axes. All three have legal authority basis.
          </p>
        </Card>
      ) : (
        <div style={{ display: 'grid', gap: 6 }}>
          {OPTIONS.map((opt) => (
            <Card key={opt.id} accent={optionColor(opt.id)}>
              <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx, fontWeight: 600, marginBottom: 8 }}>OPTION {opt.id}: {opt.title}</p>
              {/* 2-column layout for prose readability */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
                <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>LEGAL AUTHORITY</span><p style={{ color: C.tx2, marginTop: 2 }}>{opt.id === 'A' ? 'Executive authority + UNSC mandate desirable' : opt.id === 'B' ? 'FON: established customary international law' : 'Sanctions: IEEPA authority. UNCLOS: existing treaty'}</p></div>
                <div><span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>LEGITIMACY RISK</span><p style={{ color: C.tx2, marginTop: 2 }}>{opt.id === 'A' ? 'Ultimatum may appear disproportionate to non-kinetic provocation' : opt.id === 'B' ? 'Military presence near disputed waters = adversary narrative fuel' : 'Lowest legitimacy risk. Broadest international support base'}</p></div>
              </div>
              <div style={{ marginTop: 8, fontSize: 12 }}>
                <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>PROPORTIONALITY</span>
                <p style={{ color: C.tx2, marginTop: 2 }}>{opt.id === 'A' ? 'Moderate \— diplomatic escalation matches gray-zone provocation' : opt.id === 'B' ? 'Highest \— military response to military provocation' : 'High \— economic/legal response to economic/legal disruption'}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
      <NextButton />
    </div>
  );

  const renderIntelStrip = () => (
    <div>
      <SectionHeader num="XIII" title="Intel Enabler vs Instrument Strip" tag="Role Distinction" />
      <Card accent={C.blue}>
        <p style={{ fontSize: 12, color: C.tx2, marginBottom: 12, lineHeight: 1.65 }}>
          Intelligence serves as both an <strong style={{ color: C.blue }}>enabler</strong> (supporting other DIME instruments) and an <strong style={{ color: C.gold }}>instrument</strong> (direct action in the information domain). This distinction matters for resource allocation and authority chains.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: 12, background: C.blueBg, borderRadius: 4, border: '1px solid ' + C.blueDm + '20' }}>
            <p style={{ fontFamily: Mono, fontSize: 12, color: C.blue, fontWeight: 600, marginBottom: 8 }}>INTELLIGENCE AS ENABLER</p>
            <div style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6 }}>
              <p style={{ marginBottom: 4 }}>{'\u2022'} <strong style={{ color: C.tx }}>Diplomatic:</strong> Provides negotiating leverage via knowledge of adversary red lines and internal debates</p>
              <p style={{ marginBottom: 4 }}>{'\u2022'} <strong style={{ color: C.tx }}>Military:</strong> ISR for targeting, force protection, indications & warning</p>
              <p style={{ marginBottom: 4 }}>{'\u2022'} <strong style={{ color: C.tx }}>Economic:</strong> Identifies sanctions evasion networks, maps adversary financial vulnerabilities</p>
            </div>
          </div>
          <div style={{ padding: 12, background: C.goldBg, borderRadius: 4, border: '1px solid ' + C.goldDm + '20' }}>
            <p style={{ fontFamily: Mono, fontSize: 12, color: C.gold, fontWeight: 600, marginBottom: 8 }}>INTELLIGENCE AS INSTRUMENT</p>
            <div style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6 }}>
              <p style={{ marginBottom: 4 }}>{'\u2022'} <strong style={{ color: C.tx }}>Strategic declassification:</strong> Shape narrative by releasing evidence of adversary misconduct</p>
              <p style={{ marginBottom: 4 }}>{'\u2022'} <strong style={{ color: C.tx }}>Covert influence:</strong> Counter adversary information operations in allied domestic audiences</p>
              <p style={{ marginBottom: 4 }}>{'\u2022'} <strong style={{ color: C.tx }}>Cyber operations:</strong> Disrupt adversary C2 or attribution-denial infrastructure</p>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(140,155,120,.04)', borderRadius: 4 }}>
          <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 4 }}>KEY DISTINCTION</p>
          <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.65 }}>
            When intelligence acts as an <em>enabler</em>, its quality is judged by how well it supports the primary instrument. When intelligence acts as an <em>instrument</em>, it must be evaluated against the same proportionality and legitimacy criteria as any other policy tool. Option C relies most heavily on intelligence-as-instrument (strategic declassification). Options A and B use intelligence primarily as enabler.
          </p>
        </div>
      </Card>
    </div>
  );

  // ── Phase router ───────────────────────────────────────
  const renderPhase = () => {
    switch (phase) {
      case 0: return renderAssignment();
      case 1: return renderMiniCase();
      case 2: return renderAssessment();
      case 3: return renderInterests();
      case 4: return renderStakeholders();
      case 5: return renderSAT();
      case 6: return renderAllison();
      case 7: return renderLevers();
      case 8: return renderOptions();
      case 9: return renderRedTeam();
      case 10: return renderImplementation();
      case 11: return renderCollection();
      case 12: return renderEthics();
      case 13: return renderIntelStrip();
      default: return renderAssignment();
    }
  };

  // ── Main render ────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0d10 0%, #0d1016 40%, #0a0d10 100%)', color: C.tx, fontFamily: Sans, position: 'relative' }} ref={topRef}>
      <WoodPanelBg />
      {/* Top bar — NSC Situation Room header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,13,16,.96)', backdropFilter: 'blur(16px)', borderBottom: '2px solid rgba(140,155,120,.12)', padding: '8px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setView('coursework')} style={{ background: 'none', border: 'none', color: C.tx3, fontFamily: Mono, fontSize: 11, cursor: 'pointer' }}>
            {'\u2190'} Back to Coursework
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {React.createElement(SituationRoomClock)}
            {React.createElement(ClassifiedStamp, { label: 'NSC EYES ONLY' })}
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '4px 0 6px', borderTop: '1px solid rgba(140,155,120,.06)', marginTop: 6 }}>
          <span style={{ fontFamily: Mono, fontSize: 10, color: C.goldDm, letterSpacing: '.2em' }}>NATIONAL SECURITY COUNCIL {'\u2014'} MPAI 6790 {'\u2014'} DEFENSE, DIPLOMACY & INTELLIGENCE</span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {React.createElement(PresidentialSealWatermark)}
        {/* Hero section — Briefing Room entrance */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            {React.createElement(ClassifiedStamp, { label: 'STRATEGIC OPTIONS MEMO' })}
          </div>
          <h1 style={{ fontFamily: Serif, fontSize: 34, fontWeight: 700, color: C.tx, letterSpacing: '-.02em', marginBottom: 8, borderBottom: '2px solid rgba(196,160,80,.12)', paddingBottom: 12 }}>
            Policy Decision Laboratory
            {DiplomaticSealIcon}
            {BalanceScaleIcon}
          </h1>
          {TipBox('dime')}
          {TipBox('coercive')}
          <p style={{ fontFamily: Serif, fontSize: 15, color: C.tx2, lineHeight: 1.6, marginBottom: 12, maxWidth: 720 }}>
            A structured analytic walkthrough of a maritime corridor crisis, demonstrating intelligence assessment methodology, strategic option development, and adversary adaptation modeling as taught in graduate-level defense and intelligence coursework.
            {ChessPiecesIcon}
          </p>
          {TipBox('allison')}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            {SKILLS_TAGS.map((tag) => (
              <span key={tag} style={{
                fontFamily: Mono, fontSize: 11, padding: '3px 8px', borderRadius: 3,
                background: C.goldBg, color: C.goldDm, letterSpacing: '.03em',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Top-level mode switcher */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: `1px solid ${C.line}`, paddingBottom: 10 }}>
          {[['lab','Policy Lab'],['crisis','Crisis Simulator'],['alliance','Alliance Calculator']].map(([id,lbl]) => (
            <button key={id} onClick={() => setTopMode(id)} style={{
              padding: '6px 14px', borderRadius: 3, cursor: 'pointer',
              background: topMode === id ? C.goldBg : 'transparent',
              border: `1px solid ${topMode === id ? C.gold : C.line}`,
              color: topMode === id ? C.gold : C.tx3,
              fontFamily: Mono, fontSize: 11, fontWeight: 600, letterSpacing: '.04em',
            }}>
              {lbl}
            </button>
          ))}
        </div>

        {topMode === 'lab' && (
          <div>
            <PhaseNav />
            {renderPhase()}
          </div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* CRISIS DECISION SIMULATOR                           */}
        {/* ════════════════════════════════════════════════════ */}
        {topMode === 'crisis' && (() => {
          const CRISES = [
            { id: 'cuban', name: 'Cuban Missile Crisis (1962)', context: 'U-2 reconnaissance reveals Soviet MRBM sites under construction in Cuba. Operational missiles could strike Washington in 13 minutes. Soviet ships carrying additional missiles are en route. The President has convened the ExComm.',
              steps: [
                { prompt: 'Soviet missiles are confirmed in Cuba. What is your initial recommendation to the President?',
                  options: [
                    { text: 'Immediate surgical air strike on missile sites', consequence: 'Military favors this. Risk: Soviet casualties trigger escalation. JFK rejected this partly because the Air Force could not guarantee destroying all missiles. Framework: Realist -- eliminate the threat through force.', framework: 'realist', score: 40 },
                    { text: 'Naval blockade ("quarantine") of Cuba', consequence: 'Buys time for diplomacy while demonstrating resolve. Shifts the escalation decision to Khrushchev -- does he try to run the blockade? Framework: Liberal institutionalist -- coercive diplomacy within international legal norms.', framework: 'liberal', score: 85 },
                    { text: 'Full-scale invasion of Cuba', consequence: 'Most aggressive option. Unknown to ExComm: 42,000 Soviet troops with tactical nuclear weapons were already on the island. An invasion would likely have triggered nuclear use. Framework: Realist -- maximize military advantage.', framework: 'realist', score: 15 },
                    { text: 'Open diplomatic channel to Moscow immediately', consequence: 'Risks appearing weak while missiles become operational. However, Dobrynin back-channel ultimately proved essential. Framework: Constructivist -- reshape adversary perceptions through dialogue.', framework: 'constructivist', score: 55 },
                  ] },
                { prompt: 'Day 6: A U-2 is shot down over Cuba. Pilot Major Anderson killed. The Air Force is demanding immediate retaliation strikes. What do you advise?',
                  options: [
                    { text: 'Authorize retaliatory strikes on SAM sites', consequence: 'Escalation ladder: air strikes on Cuba could trigger Soviet response against Jupiter missiles in Turkey. McNamara feared this cascade. Framework: Realist -- proportional military response.', framework: 'realist', score: 30 },
                    { text: 'Ignore the shoot-down and continue negotiation', consequence: 'JFK chose this path, partly because he suspected the shoot-down was unauthorized by Moscow. Restraint under provocation proved critical. Framework: Liberal -- prioritize diplomatic resolution over military tit-for-tat.', framework: 'liberal', score: 80 },
                    { text: 'Issue a 24-hour ultimatum for missile removal', consequence: 'High risk of boxing Khrushchev into a corner where he cannot back down without losing face domestically. Time pressure removes options. Framework: Realist/compellent -- force rapid compliance.', framework: 'realist', score: 35 },
                  ] },
              ] },
            { id: 'suez', name: 'Suez Crisis (1956)', context: 'Egypt has nationalized the Suez Canal. Britain and France, in secret coordination with Israel, are planning military intervention. The US was not consulted. Eisenhower faces a crisis with NATO allies acting unilaterally in a former colonial zone.',
              steps: [
                { prompt: 'Britain and France have launched airstrikes against Egypt without informing the US. How do you advise the President?',
                  options: [
                    { text: 'Support the allies publicly to preserve NATO unity', consequence: 'Rewards unilateral aggression and undermines the UN Charter principles the US claims to uphold. Alienates the entire Arab world. Framework: Realist -- alliance maintenance above all.', framework: 'realist', score: 25 },
                    { text: 'Condemn the invasion at the UN and demand ceasefire', consequence: 'Eisenhower chose this, siding against allies. Demonstrated US commitment to international law over colonial interests. Damaged Anglo-French relations for years but gained credibility in the developing world. Framework: Liberal institutionalist -- rules-based order.', framework: 'liberal', score: 80 },
                    { text: 'Private pressure on allies while maintaining public neutrality', consequence: 'Avoids public rupture but may be too slow. Canal operations are being disrupted daily. Framework: Constructivist -- preserve alliance identity while reshaping norms privately.', framework: 'constructivist', score: 55 },
                  ] },
                { prompt: 'The Soviet Union has threatened "rocket attacks" on London and Paris unless forces withdraw. The threat may be a bluff, but it introduces nuclear risk. What now?',
                  options: [
                    { text: 'Warn the Soviets that any attack on NATO allies triggers Article 5', consequence: 'Extends nuclear deterrence to cover an operation the US opposes. Creates bizarre scenario of defending allies from Soviet retaliation for a war the US condemns. Framework: Realist -- credible alliance commitment regardless.', framework: 'realist', score: 40 },
                    { text: 'Use Soviet threat as additional leverage to force British-French withdrawal', consequence: 'Eisenhower did exactly this, plus threatened to dump British pound sterling reserves. Economic coercion combined with Soviet pressure forced withdrawal. Framework: Liberal -- use institutions and economic leverage.', framework: 'liberal', score: 85 },
                    { text: 'Propose joint US-Soviet peacekeeping force for the Canal Zone', consequence: 'Dangerous: gives Soviets a foothold in the Middle East, exactly what containment doctrine aims to prevent. Framework: Constructivist -- but miscalculates Soviet intentions.', framework: 'constructivist', score: 20 },
                  ] },
              ] },
            { id: 'kosovo', name: 'Kosovo Intervention (1999)', context: 'Serbian forces are conducting ethnic cleansing operations against Kosovar Albanians. Reports of mass killings in Racak. Diplomatic efforts at Rambouillet have failed. Russia opposes any intervention. The UN Security Council is deadlocked.',
              steps: [
                { prompt: 'Rambouillet negotiations have collapsed. Serbia refuses to stop operations in Kosovo. 800,000 refugees are fleeing. The UNSC will not authorize force. What do you recommend?',
                  options: [
                    { text: 'Proceed with NATO airstrikes without UN authorization', consequence: 'This is what happened. Legally controversial ("illegal but legitimate" per the Independent International Commission). Set a precedent that humanitarian intervention could bypass the Security Council. Framework: Liberal -- R2P norm emergence over sovereignty.', framework: 'liberal', score: 75 },
                    { text: 'Continue diplomatic pressure and economic sanctions', consequence: 'Sanctions have not stopped Milosevic. Every day of delay means more civilians killed or displaced. Srebrenica (1995) demonstrated the cost of inaction. Framework: Constructivist -- norms matter but enforcement without UN is illegitimate.', framework: 'constructivist', score: 30 },
                    { text: 'Seek a UNGA "Uniting for Peace" resolution as alternative legitimacy', consequence: 'Creative legal approach but takes time. General Assembly resolutions are non-binding. Meanwhile, ethnic cleansing continues. Framework: Liberal institutionalist -- maintain legal legitimacy.', framework: 'liberal', score: 50 },
                    { text: 'Deploy ground forces for a rapid intervention', consequence: 'Clark and Blair favored this. Pentagon strongly opposed -- mountainous terrain, no clear exit strategy. Political risk of casualties very high. Framework: Realist -- decisive military force to achieve political objective.', framework: 'realist', score: 45 },
                  ] },
                { prompt: 'NATO airstrikes have been ongoing for 6 weeks but Milosevic has not capitulated. Bombing has intensified but ground option is still off the table. China\'s embassy in Belgrade was accidentally bombed. Pressure to end the campaign is mounting.',
                  options: [
                    { text: 'Escalate: begin planning ground invasion to force compliance', consequence: 'Threat of ground forces was likely the factor that finally changed Milosevic\'s calculus. Blair pushed hard for this. Credible threat of escalation, not just airpower, compels surrender. Framework: Realist -- demonstrate willingness to escalate.', framework: 'realist', score: 70 },
                    { text: 'Negotiate through Russian intermediary (Chernomyrdin)', consequence: 'This is what worked. Ahtisaari-Chernomyrdin mediation gave Milosevic a face-saving exit through Russian involvement. Framework: Constructivist -- adversary needs a path to compliance that preserves dignity.', framework: 'constructivist', score: 80 },
                    { text: 'Declare mission accomplished and accept partition', consequence: 'Rewards ethnic cleansing. Sends signal that aggression works if you can outlast NATO\'s political will. Framework: Realist -- accept limitations of military instrument.', framework: 'realist', score: 15 },
                  ] },
              ] },
          ];

          var crisis = CRISES[crisisId];
          var step = crisis.steps[crisisStep];
          var hasChosen = crisisChoices[crisisStep] !== undefined;
          var totalScore = crisisChoices.reduce(function(s, ci, idx) {
            return s + (CRISES[crisisId].steps[idx] ? CRISES[crisisId].steps[idx].options[ci].score : 0);
          }, 0);
          var maxScore = crisis.steps.length * 100;
          var FRAMEWORK_COLORS = { realist: C.red, liberal: C.blue, constructivist: C.green };

          return (
            <div>
              <div style={{ padding: 16, background: C.card, border: `1px solid ${C.cardBd}`, borderLeft: `3px solid ${C.gold}`, marginBottom: 16, borderRadius: 4 }}>
                <div style={{ fontFamily: Mono, fontSize: 10, color: C.gold, letterSpacing: '.12em', marginBottom: 8 }}>CRISIS DECISION SIMULATOR</div>
                <p style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.7, marginBottom: 12 }}>
                  You are the National Security Advisor. At each decision point, choose your recommended course of action. See how different theoretical frameworks -- realist, liberal institutionalist, and constructivist -- would approach the same dilemma. Your choices are scored against historical outcomes.
                </p>

                {/* Crisis selector */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {CRISES.map((c, ci) => (
                    <button key={c.id} onClick={() => { setCrisisId(ci); setCrisisStep(0); setCrisisChoices([]); }} style={{
                      padding: '6px 12px', fontFamily: Mono, fontSize: 10, cursor: 'pointer',
                      background: crisisId === ci ? C.goldBg : 'transparent',
                      border: `1px solid ${crisisId === ci ? C.gold : C.line}`,
                      color: crisisId === ci ? C.gold : C.tx3, borderRadius: 3,
                    }}>
                      {c.name}
                    </button>
                  ))}
                </div>

                {/* Context */}
                <div style={{ padding: 12, background: 'rgba(0,0,0,.2)', border: `1px solid ${C.line}`, marginBottom: 16, borderRadius: 3 }}>
                  <div style={{ fontFamily: Mono, fontSize: 9, color: C.gold, letterSpacing: '.1em', marginBottom: 6 }}>SITUATION BRIEFING</div>
                  <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.7 }}>{crisis.context}</p>
                </div>

                {/* Decision step */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, marginBottom: 6 }}>DECISION POINT {crisisStep + 1} OF {crisis.steps.length}</div>
                  <p style={{ fontFamily: Serif, fontSize: 15, color: C.tx, lineHeight: 1.6, marginBottom: 12, fontWeight: 600 }}>{step.prompt}</p>

                  <div style={{ display: 'grid', gap: 8 }}>
                    {step.options.map((opt, oi) => {
                      var chosen = crisisChoices[crisisStep] === oi;
                      var fwColor = FRAMEWORK_COLORS[opt.framework] || C.tx3;
                      return (
                        <div key={oi} onClick={() => { if (!hasChosen) { var nc = crisisChoices.slice(); nc[crisisStep] = oi; setCrisisChoices(nc); } }}
                          style={{
                            padding: 12, cursor: hasChosen ? 'default' : 'pointer', borderRadius: 3,
                            background: chosen ? fwColor + '10' : C.card,
                            border: `1px solid ${chosen ? fwColor : C.cardBd}`,
                          }}>
                          <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.5, marginBottom: hasChosen ? 8 : 0 }}>{opt.text}</p>
                          {hasChosen && (
                            <div>
                              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                                <span style={{ fontFamily: Mono, fontSize: 9, padding: '2px 6px', background: fwColor + '15', color: fwColor, border: `1px solid ${fwColor}30`, borderRadius: 2 }}>{opt.framework.toUpperCase()}</span>
                                <span style={{ fontFamily: Mono, fontSize: 11, color: opt.score >= 70 ? C.green : opt.score >= 40 ? C.gold : C.red, fontWeight: 700 }}>Score: {opt.score}/100</span>
                              </div>
                              <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6 }}>{opt.consequence}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation */}
                {hasChosen && crisisStep < crisis.steps.length - 1 && (
                  <button onClick={() => setCrisisStep(crisisStep + 1)} style={{
                    padding: '8px 20px', fontFamily: Mono, fontSize: 11, cursor: 'pointer',
                    background: C.goldBg, border: `1px solid ${C.gold}`, color: C.gold, borderRadius: 3,
                  }}>Next Decision Point {'\u2192'}</button>
                )}

                {hasChosen && crisisStep === crisis.steps.length - 1 && (
                  <div style={{ padding: 12, background: C.goldBg, border: `1px solid ${C.gold}`, borderRadius: 3, marginTop: 12 }}>
                    <div style={{ fontFamily: Mono, fontSize: 12, color: C.gold, fontWeight: 700, marginBottom: 6 }}>CRISIS RESOLUTION -- TOTAL SCORE: {totalScore}/{maxScore}</div>
                    <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.6 }}>
                      {totalScore >= maxScore * 0.7 ? 'Strong decision-making. Your choices aligned well with historical outcomes and demonstrated awareness of escalation dynamics.' : totalScore >= maxScore * 0.4 ? 'Mixed results. Some decisions matched effective historical responses while others introduced significant risk.' : 'High-risk choices. Review the framework analysis to understand why alternative approaches may have been more effective.'}
                    </p>
                    <button onClick={() => { setCrisisStep(0); setCrisisChoices([]); }} style={{
                      marginTop: 8, padding: '6px 14px', fontFamily: Mono, fontSize: 10, background: 'transparent', border: `1px solid ${C.gold}`, color: C.gold, cursor: 'pointer', borderRadius: 3,
                    }}>Reset Crisis</button>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ════════════════════════════════════════════════════ */}
        {/* ALLIANCE RELIABILITY CALCULATOR                     */}
        {/* ════════════════════════════════════════════════════ */}
        {topMode === 'alliance' && (() => {
          const ALLIANCES = [
            { id: 'nato', name: 'NATO (US-Europe)', est: 1949, type: 'Multilateral collective defense', baseline: { threat: 75, institutional: 95, domestic: 65, asymmetric: 60, credibility: 85 }, notes: 'Most institutionalized alliance in history. Article 5 invoked once (9/11). Burden-sharing disputes are chronic but institutional depth compensates. Key test: would NATO respond to a Baltic incursion?' },
            { id: 'us_japan', name: 'US-Japan Alliance', est: 1951, type: 'Bilateral hub-spoke', baseline: { threat: 80, institutional: 80, domestic: 60, asymmetric: 75, credibility: 80 }, notes: 'Anchored by shared threat perception (China, DPRK). Article 9 constraints are loosening but domestic support for military action remains limited. Asymmetric: Japan depends on US extended deterrence.' },
            { id: 'us_israel', name: 'US-Israel Relationship', est: 1948, type: 'Strategic partnership (no formal treaty)', baseline: { threat: 70, institutional: 55, domestic: 80, asymmetric: 70, credibility: 90 }, notes: 'No formal mutual defense treaty. Relationship sustained by domestic political support (AIPAC), shared intelligence, and qualitative military edge (QME) commitment. Uniquely resilient to bilateral disagreements.' },
            { id: 'fvey', name: 'Five Eyes (FVEY)', est: 1941, type: 'Intelligence sharing alliance', baseline: { threat: 70, institutional: 90, domestic: 50, asymmetric: 55, credibility: 75 }, notes: 'Deepest intelligence sharing arrangement in history. UKUSA Agreement (1946). Operates below public visibility. Reliability measured by willingness to share sensitive sources and methods, not military commitment.' },
          ];

          var FACTORS = [
            { id: 'threat', label: 'Shared Threat Perception', desc: 'Do alliance members agree on who the threat is and how urgent it is? Divergent threat perception is the #1 predictor of alliance dissolution.' },
            { id: 'institutional', label: 'Institutional Depth', desc: 'How formalized is the alliance? Integrated command structures, standing secretariats, regular exercises, and codified decision procedures increase reliability.' },
            { id: 'domestic', label: 'Domestic Political Support', desc: 'Do domestic publics in member states support the alliance and its commitments? Democracies are constrained by public opinion on use of force.' },
            { id: 'asymmetric', label: 'Asymmetric Dependence', desc: 'How balanced is the dependence? Highly asymmetric alliances (one side depends far more) create abandonment/entrapment dilemmas (Snyder).' },
            { id: 'credibility', label: 'Credibility of Commitment', desc: 'Would the guarantor actually honor its commitment in a crisis? Credibility depends on reputation, sunk costs, and the perceived costs of reneging.' },
          ];

          var al = ALLIANCES[allianceId];
          var composite = Math.round(FACTORS.reduce(function(s, f) { return s + allianceFactors[f.id]; }, 0) / FACTORS.length);
          var relLevel = composite >= 75 ? 'HIGH' : composite >= 45 ? 'MODERATE' : 'LOW';
          var relColor = composite >= 75 ? C.green : composite >= 45 ? C.gold : C.red;

          return (
            <div>
              <div style={{ padding: 16, background: C.card, border: `1px solid ${C.cardBd}`, borderLeft: `3px solid ${C.blue}`, marginBottom: 16, borderRadius: 4 }}>
                <div style={{ fontFamily: Mono, fontSize: 10, color: C.blue, letterSpacing: '.12em', marginBottom: 8 }}>ALLIANCE RELIABILITY CALCULATOR</div>
                <p style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.7, marginBottom: 16 }}>
                  Select an alliance and rate five reliability factors. The composite score estimates alliance reliability under stress. Compare your assessment to baseline expert ratings and across alliances. Based on Glenn Snyder's alliance security dilemma framework.
                </p>

                {/* Alliance selector */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
                  {ALLIANCES.map((a, ai) => (
                    <button key={a.id} onClick={() => { setAllianceId(ai); setAllianceFactors(a.baseline); }} style={{
                      padding: '6px 12px', fontFamily: Mono, fontSize: 10, cursor: 'pointer',
                      background: allianceId === ai ? C.blueBg : 'transparent',
                      border: `1px solid ${allianceId === ai ? C.blue : C.line}`,
                      color: allianceId === ai ? C.blue : C.tx3, borderRadius: 3,
                    }}>
                      {a.name}
                    </button>
                  ))}
                </div>

                {/* Alliance info */}
                <div style={{ padding: 10, background: 'rgba(0,0,0,.2)', border: `1px solid ${C.line}`, marginBottom: 16, borderRadius: 3 }}>
                  <div style={{ fontFamily: Mono, fontSize: 9, color: C.tx3 }}>EST. {al.est} | {al.type}</div>
                  <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, marginTop: 6 }}>{al.notes}</p>
                </div>

                {/* Factor sliders */}
                <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
                  {FACTORS.map(function(f) {
                    var val = allianceFactors[f.id];
                    var baseVal = al.baseline[f.id];
                    var barColor = val >= 70 ? C.green : val >= 40 ? C.gold : C.red;
                    return (
                      <div key={f.id} style={{ padding: '10px 12px', background: 'rgba(0,0,0,.15)', border: `1px solid ${C.line}`, borderRadius: 3 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx, fontWeight: 600 }}>{f.label}</span>
                          <span style={{ fontFamily: Mono, fontSize: 12, color: barColor, fontWeight: 700 }}>{val}</span>
                        </div>
                        <p style={{ fontSize: 10, color: C.tx3, marginBottom: 6, lineHeight: 1.5 }}>{f.desc}</p>
                        <input type="range" min={0} max={100} value={val}
                          onChange={(e) => { var nv = parseInt(e.target.value); setAllianceFactors(prev => ({ ...prev, [f.id]: nv })); }}
                          style={{ width: '100%', accentColor: barColor, cursor: 'pointer' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: Mono, fontSize: 9, color: C.tx3 }}>
                          <span>0 -- Unreliable</span>
                          <span style={{ color: C.tx3 }}>Baseline: {baseVal}</span>
                          <span>100 -- Ironclad</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Composite score */}
                <div style={{ padding: 16, background: relColor + '08', border: `2px solid ${relColor}`, textAlign: 'center', marginBottom: 16, borderRadius: 3 }}>
                  <div style={{ fontFamily: Mono, fontSize: 9, color: relColor, letterSpacing: '.1em', marginBottom: 4 }}>ALLIANCE RELIABILITY SCORE</div>
                  <div style={{ fontFamily: Serif, fontSize: 38, fontWeight: 700, color: relColor }}>{composite}</div>
                  <div style={{ fontFamily: Mono, fontSize: 12, color: relColor }}>{relLevel} RELIABILITY</div>
                  <div style={{ height: 6, background: C.line, borderRadius: 3, marginTop: 10 }}>
                    <div style={{ height: '100%', width: composite + '%', background: relColor, borderRadius: 3, transition: 'all .3s' }} />
                  </div>
                </div>

                {/* Cross-alliance comparison */}
                <div style={{ fontFamily: Mono, fontSize: 10, color: C.gold, letterSpacing: '.08em', marginBottom: 10 }}>CROSS-ALLIANCE COMPARISON</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {ALLIANCES.map(function(a) {
                    var aScore = Math.round(FACTORS.reduce(function(s, f) { return s + a.baseline[f.id]; }, 0) / FACTORS.length);
                    var aColor = aScore >= 75 ? C.green : aScore >= 45 ? C.gold : C.red;
                    return (
                      <div key={a.id} style={{ padding: 10, background: C.card, border: `1px solid ${a.id === al.id ? C.blue : C.cardBd}`, borderRadius: 3, textAlign: 'center' }}>
                        <div style={{ fontFamily: Mono, fontSize: 9, color: C.tx2, marginBottom: 4 }}>{a.name.split('(' /* ) */)[0].trim()}</div>
                        <div style={{ fontFamily: Serif, fontSize: 22, fontWeight: 700, color: aColor }}>{aScore}</div>
                        <div style={{ height: 3, background: C.line, borderRadius: 2, marginTop: 4 }}>
                          <div style={{ height: '100%', width: aScore + '%', background: aColor, borderRadius: 2 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
