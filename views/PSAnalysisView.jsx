// PSAnalysisView.jsx — Bias Detection Challenge
// Psychology of Intelligence (MPAI 5610)
//
// The visitor is a QC officer reviewing analytic judgments before
// they go to the PDB. Each judgment contains an embedded cognitive
// bias. The visitor must identify the bias, name it, and select
// the SAT that would mitigate it. The system scores accuracy and
// reveals the bias mechanism using Heuer/Kahneman frameworks.
//
// Source fidelity: All biases, SATs, and ICD-203 standards are
// drawn from the PAIB (Psychology of Applied Intelligence Bible)
// and its 873-entry Companion Gap Bible.

// ── Data (outside component) ─────────────────────────────────

// Georgetown blue (#041E42) + clinical white/steel — intelligence psychology lab
const PS_PALETTE = {
  bg: '#04080e',
  card: 'rgba(6,14,26,.92)',
  cardBd: 'rgba(40,80,140,.12)',
  tx: '#c8d0dc',
  tx2: '#8090a8',
  tx3: '#505868',
  blue: '#1a3a6a',
  blueDm: '#0e2850',
  blueBg: 'rgba(26,58,106,.10)',
  gtown: '#041E42',
  gtownLt: '#1a3a6a',
  steel: '#6888a8',
  steelDm: '#507090',
  steelBg: 'rgba(104,136,168,.07)',
  amber: '#ccaa40',
  amberDm: '#a08830',
  amberBg: 'rgba(204,170,64,.07)',
  green: '#50aa60',
  greenDm: '#388848',
  greenBg: 'rgba(80,170,96,.07)',
  red: '#b04848',
  redDm: '#883838',
  redBg: 'rgba(176,72,72,.07)',
  line: 'rgba(40,80,140,.10)',
  neural: 'rgba(26,58,106,.05)',
  // Backward-compat aliases (was purple, now Georgetown blue)
  purple: '#1a3a6a',
  purpleDm: '#0e2850',
  purpleBg: 'rgba(26,58,106,.10)',
  cardBdOld: 'rgba(40,80,140,.12)',
};
const PS_MONO = "'IBM Plex Mono',monospace";
const PS_SERIF = "'Source Serif 4',Georgia,serif";
const PS_SANS = "'Inter',sans-serif";

// ── Cognitive Science Lab decorative elements ─────────────────

var NeuralNetworkBg = function() {
  var nodes = [];
  var lines = [];
  for (var i = 0; i < 30; i++) {
    var x = (i * 127 + i * i * 17) % 1200;
    var y = (i * 89 + i * i * 13) % 800;
    nodes.push({ x: x, y: y, r: 1.5 + (i % 3) });
  }
  for (var j = 0; j < 20; j++) {
    var a = j % nodes.length;
    var b = (j * 3 + 7) % nodes.length;
    if (a !== b) {
      lines.push({ x1: nodes[a].x, y1: nodes[a].y, x2: nodes[b].x, y2: nodes[b].y });
    }
  }
  return React.createElement('svg', {
    width: '100%', height: '100%',
    style: { position: 'absolute', top: 0, left: 0, pointerEvents: 'none', opacity: 0.025 },
    viewBox: '0 0 1200 800', preserveAspectRatio: 'xMidYMid slice'
  },
    lines.map(function(l, i) {
      return React.createElement('line', { key: 'l' + i, x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2, stroke: '#9060cc', strokeWidth: 0.5 });
    }),
    nodes.map(function(n, i) {
      return React.createElement('circle', { key: 'n' + i, cx: n.x, cy: n.y, r: n.r, fill: '#9060cc', opacity: 0.3 });
    })
  );
};

var BrainScanRings = function() {
  return React.createElement('svg', {
    width: '200', height: '200', viewBox: '0 0 200 200',
    style: { position: 'absolute', top: '40px', right: '20px', opacity: 0.03, pointerEvents: 'none' }
  },
    React.createElement('circle', { cx: 100, cy: 100, r: 90, fill: 'none', stroke: '#9060cc', strokeWidth: 1 }),
    React.createElement('circle', { cx: 100, cy: 100, r: 70, fill: 'none', stroke: '#9060cc', strokeWidth: 0.8, strokeDasharray: '4 3' }),
    React.createElement('circle', { cx: 100, cy: 100, r: 50, fill: 'none', stroke: '#9060cc', strokeWidth: 0.6, strokeDasharray: '2 4' }),
    React.createElement('circle', { cx: 100, cy: 100, r: 30, fill: 'none', stroke: '#9060cc', strokeWidth: 0.5 }),
    React.createElement('circle', { cx: 100, cy: 100, r: 10, fill: '#9060cc', fillOpacity: 0.15 }),
    // Wave patterns
    React.createElement('path', { d: 'M10 100 Q30 80 50 100 Q70 120 90 100 Q110 80 130 100 Q150 120 170 100 Q190 80 200 100', fill: 'none', stroke: '#9060cc', strokeWidth: 0.4, opacity: 0.5 }),
    React.createElement('path', { d: 'M10 110 Q30 95 50 110 Q70 125 90 110 Q110 95 130 110 Q150 125 170 110 Q190 95 200 110', fill: 'none', stroke: '#9060cc', strokeWidth: 0.3, opacity: 0.3 })
  );
};

var SynapsePulse = function(props) {
  var color = props.color || '#9060cc';
  return React.createElement('svg', { width: '8', height: '8', viewBox: '0 0 8 8', style: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 } },
    React.createElement('circle', { cx: 4, cy: 4, r: 3, fill: 'none', stroke: color, strokeWidth: 0.6, opacity: 0.5 }),
    React.createElement('circle', { cx: 4, cy: 4, r: 1.5, fill: color, opacity: 0.4 })
  );
};

var LabExperimentCard = function(props) {
  return React.createElement('div', {
    style: {
      background: 'rgba(6,14,26,.95)',
      border: '1px solid rgba(40,80,140,.12)',
      borderTop: '3px solid ' + (props.accent || '#9060cc'),
      borderRadius: 4,
      padding: '14px 16px',
      position: 'relative',
    }
  },
    React.createElement('div', { style: { position: 'absolute', top: 6, right: 10, fontFamily: PS_MONO, fontSize: 9, color: 'rgba(40,80,140,.25)', letterSpacing: '.1em' } }, props.label || ''),
    props.children
  );
};

var WavePatternDivider = function() {
  return React.createElement('svg', {
    width: '100%', height: '16', viewBox: '0 0 960 16', preserveAspectRatio: 'none',
    style: { display: 'block', opacity: 0.08, margin: '12px 0' }
  },
    React.createElement('path', { d: 'M0 8 Q40 0 80 8 Q120 16 160 8 Q200 0 240 8 Q280 16 320 8 Q360 0 400 8 Q440 16 480 8 Q520 0 560 8 Q600 16 640 8 Q680 0 720 8 Q760 16 800 8 Q840 0 880 8 Q920 16 960 8', fill: 'none', stroke: '#9060cc', strokeWidth: 1 })
  );
};

// Heuer's cognitive biases with mechanisms and Kahneman mapping
const PS_BIASES = {
  anchoring: {
    name: 'Anchoring',
    heuer: 'Heuer Ch. 10: Analysts tend to anchor on initial information and adjust insufficiently when new data arrives.',
    kahneman: 'Kahneman System 1: Automatic anchoring. The initial value serves as a reference point even when it is arbitrary or known to be unreliable.',
    mechanism: 'The first piece of data creates a mental anchor. Subsequent evidence is evaluated relative to this anchor rather than on its own merits. Adjustment is typically insufficient because it requires effortful System 2 processing.',
    mitigation: 'key_assumptions_check',
    icd203: 'ICD-203 Standard 7: Properly caveated with sourcing and analytic limitations',
  },
  availability: {
    name: 'Availability Heuristic',
    heuer: 'Heuer Ch. 10: Analysts overestimate the probability of events that are easy to recall — vivid, recent, or emotionally charged.',
    kahneman: 'Kahneman: "What You See Is All There Is" (WYSIATI). System 1 constructs a coherent story from available information without accounting for what is missing.',
    mechanism: 'Events that are easier to recall (because they are recent, dramatic, or personally relevant) are judged as more probable. This systematically overweights vivid intelligence and underweights base rates.',
    mitigation: 'ach',
    icd203: 'ICD-203 Standard 5: Properly described the quality and reliability of underlying sources',
  },
  confirmation: {
    name: 'Confirmation Bias',
    heuer: 'Heuer Ch. 4: Analysts seek information that confirms their existing hypotheses and avoid or discount disconfirming evidence.',
    kahneman: 'Kahneman: Positive test strategy. People tend to confirm rather than falsify. Combines with coherence-seeking to create confident but wrong assessments.',
    mechanism: 'Once a hypothesis is formed, the analyst unconsciously filters incoming intelligence to favor confirmatory data. Disconfirming evidence is reinterpreted, dismissed as unreliable, or simply not noticed. The assessment grows more confident while its evidential base narrows.',
    mitigation: 'devils_advocacy',
    icd203: 'ICD-203 Standard 8: Considered and explains alternatives',
  },
  groupthink: {
    name: 'Groupthink',
    heuer: 'Heuer Ch. 11: Group dynamics suppress dissent. Teams converge on a consensus view that no individual member fully endorses.',
    kahneman: 'Kahneman/Lovallo Decision QC #5: Social pressure creates premature consensus. Shared information is discussed more than unshared information (hidden profile problem).',
    mechanism: 'Team members self-censor to maintain group cohesion. The illusion of unanimity reinforces confidence. Dissenting viewpoints are rationalized away. Warning signs are dismissed as "noise." The Bay of Pigs and 9/11 both involved groupthink dynamics.',
    mitigation: 'team_ab',
    icd203: 'ICD-203 Standard 9: Uses logical argumentation; describes implications',
  },
  mirror_imaging: {
    name: 'Mirror Imaging',
    heuer: 'Heuer Ch. 5: Analysts project their own cultural assumptions, values, and decision logic onto foreign actors.',
    kahneman: 'Kahneman: Substitution — when a hard question (what will the adversary do?) is replaced by an easy one (what would I do in their place?).',
    mechanism: 'The analyst assumes the adversary shares their rationality framework, risk calculus, and values. This is especially dangerous in cross-cultural analysis. The adversary\'s strategic culture, domestic politics, and institutional incentives may produce decisions that seem "irrational" from the analyst\'s perspective but are perfectly logical within their own framework.',
    mitigation: 'red_team',
    icd203: 'ICD-203 Standard 8: Considered and explains alternatives',
  },
  overconfidence: {
    name: 'Overconfidence',
    heuer: 'Heuer Ch. 12: Analysts consistently express higher confidence in their judgments than the evidence warrants.',
    kahneman: 'Kahneman: Planning fallacy + coherence illusion. A good story feels true, even when the evidence is thin. Calibration studies show systematic overconfidence.',
    mechanism: 'Confidence is driven by the coherence of the narrative, not by the quality or quantity of evidence. An analyst with a clear, internally consistent story feels certain — even when major gaps exist. This is the single most documented bias in intelligence analysis.',
    mitigation: 'premortem',
    icd203: 'ICD-203 Standard 6: Properly expresses and explains uncertainties',
  },
};

// Structured Analytic Techniques with real implementation steps
const PS_SATS = {
  ach: {
    name: 'Analysis of Competing Hypotheses (ACH)',
    steps: ['List all reasonable hypotheses', 'List significant evidence and arguments', 'Build a matrix — rate each item as consistent/inconsistent with each hypothesis', 'Refine the matrix — resolve disagreements', 'Draw tentative conclusions — focus on disconfirming evidence', 'Analyze sensitivity — identify key assumptions', 'Report conclusions with confidence and reasoning', 'Identify milestones for future monitoring'],
    mitigates: ['availability', 'confirmation'],
    source: 'PAIB — SAT Playbook P-03 (Heuer 1999)',
  },
  key_assumptions_check: {
    name: 'Key Assumptions Check',
    steps: ['Review the current analytic line', 'Articulate each key assumption underlying the judgment', 'Challenge each assumption — ask "what if this is wrong?"', 'Assess confidence in each assumption (low/medium/high)', 'Determine impact if the assumption fails', 'Document the check with explicit "assumption register"', 'Flag high-impact, low-confidence assumptions for collection'],
    mitigates: ['anchoring', 'overconfidence'],
    source: 'PAIB — SAT Playbook P-01 (adapted from Richards Heuer)',
  },
  devils_advocacy: {
    name: "Devil's Advocacy",
    steps: ['Assign a team member (or yourself) the explicit role of challenger', 'The advocate must argue the strongest possible case AGAINST the prevailing view', 'Focus on disconfirming evidence and alternative interpretations', 'Present the counter-case in writing with evidence', 'The team must respond to each point substantively', 'Document which challenges changed the assessment and which did not'],
    mitigates: ['confirmation', 'groupthink'],
    source: 'PAIB — SAT Playbook P-04',
  },
  team_ab: {
    name: 'Team A / Team B',
    steps: ['Divide analysts into two independent teams', 'Each team develops its own assessment from the same evidence', 'Teams present to each other and identify divergence points', 'Divergences become the focus of further collection and analysis', 'A senior reviewer adjudicates persistent disagreements', 'The final product notes both views where they diverge'],
    mitigates: ['groupthink'],
    source: 'PAIB — SAT Playbook P-05 (CIA 1976 Soviet assessment)',
  },
  red_team: {
    name: 'Red Team Analysis',
    steps: ['Assign a team to adopt the adversary perspective', 'Red team uses only information available to the adversary', 'Red team develops the adversary\'s most likely course of action', 'Red team identifies what the adversary sees as OUR vulnerabilities', 'Compare red team assessment with blue team assessment', 'Identify gaps, surprises, and mirror-imaging in blue assessment'],
    mitigates: ['mirror_imaging'],
    source: 'PAIB — SAT Playbook P-06',
  },
  premortem: {
    name: 'Pre-Mortem Analysis',
    steps: ['Assume the analytic judgment is WRONG', 'Each analyst independently writes a brief explanation for why it failed', 'Share explanations — identify recurring failure modes', 'Assess likelihood of each failure mode', 'Adjust confidence and identify collection priorities', 'Document the pre-mortem as an annex to the assessment'],
    mitigates: ['overconfidence'],
    source: 'PAIB — SAT Playbook P-07 (Klein 2003 / Kahneman endorsement)',
  },
};

// Scenarios — analytic judgments with embedded biases
const PS_SCENARIOS = [
  {
    id: 1,
    topic: 'North Korean Nuclear Program',
    judgment: 'We assess with HIGH CONFIDENCE that North Korea will conduct a nuclear test within 90 days. This assessment is based on satellite imagery showing increased activity at the Punggye-ri test site, consistent with preparations observed before the 2017 test.',
    bias: 'anchoring',
    explanation: 'The analyst anchors on the 2017 pattern and interprets current imagery through that lens. But the 2017 test preparations had 5 corroborating indicators (seismic, SIGINT, diplomatic signaling, personnel patterns, and imagery). The current assessment relies on imagery alone. The "HIGH CONFIDENCE" is anchored to the pattern match, not to the evidential depth.',
    whatsMissing: 'No SIGINT corroboration. No seismic precursors. No diplomatic signaling. The imagery activity could be maintenance, deception, or an unrelated military exercise. High confidence requires multiple independent sources.',
    difficulty: 'medium',
  },
  {
    id: 2,
    topic: 'Russian Cyber Operations',
    judgment: 'Following the SolarWinds breach, we assess Russian cyber operations pose the most significant threat to U.S. critical infrastructure. Attribution to SVR is near-certain based on TTP overlap with previous APT29 campaigns.',
    bias: 'availability',
    explanation: 'SolarWinds is vivid, recent, and well-publicized. It dominates the analyst\'s mental model of "cyber threat." But the question asked was about threats to CRITICAL INFRASTRUCTURE — not about the most famous breach. Chinese operations (Volt Typhoon) are specifically targeting critical infrastructure for pre-positioning. The analyst substituted "most available example" for "most significant threat."',
    whatsMissing: 'No comparative assessment across threat actors. PRC cyber operations (Volt Typhoon) specifically target critical infrastructure for disruption/destruction — unlike SVR, which focuses on espionage. The assessment answers "who is most famous?" not "who is most dangerous to critical infrastructure?"',
    difficulty: 'hard',
  },
  {
    id: 3,
    topic: 'Iranian Proxy Strategy',
    judgment: 'Our team has reviewed the latest reporting on Iranian proxy operations in Iraq and reached consensus: Iran is reducing its operational footprint in response to diplomatic pressure. All team members agree this trend will continue.',
    bias: 'groupthink',
    explanation: 'The phrase "reached consensus" and "all team members agree" are red flags. Real analytic teams have disagreements — unanimous agreement on a prediction about Iranian behavior (notoriously difficult to forecast) suggests social pressure suppressed dissent. The judgment reads as a group position, not an evidence-based assessment.',
    whatsMissing: 'No dissenting views documented (ICD-203 Standard 8 violation). No confidence level stated. No evidence cited for the "reducing footprint" claim. No alternative explanation (perhaps Iran is shifting to less visible proxy mechanisms, not reducing). "Consensus" is presented as a virtue when it should be a warning sign.',
    difficulty: 'medium',
  },
  {
    id: 4,
    topic: 'China Taiwan Contingency',
    judgment: 'China will not attempt a military operation against Taiwan before 2030 because the costs would be catastrophic — economic sanctions, military losses, international isolation. No rational leader would accept those consequences.',
    bias: 'mirror_imaging',
    explanation: 'The analyst projects Western cost-benefit rationality onto Chinese decision-making. "No rational leader" assumes the adversary shares the analyst\'s definition of rationality. Xi Jinping\'s calculus includes domestic legitimacy concerns, historical grievance narratives, regime survival imperatives, and a different risk tolerance framework. The judgment is an answer to "would I invade Taiwan?" not "would Xi Jinping?"',
    whatsMissing: 'No analysis of Chinese strategic culture or domestic political drivers. No consideration of scenarios where regime survival might require external action (diversionary war theory). No acknowledgment that "rational" is culturally bounded. The assessment fails ICD-203 Standard 8 — no alternative explanations considered.',
    difficulty: 'hard',
  },
  {
    id: 5,
    topic: 'Terrorism Warning',
    judgment: 'We assess with MODERATE CONFIDENCE that the threat of domestic violent extremism is elevated. This judgment is informed by 14 intelligence reports received this quarter, all indicating increased online radicalization activity.',
    bias: 'confirmation',
    explanation: 'The analyst cites "14 intelligence reports" — but all 14 confirm the same thesis. Were there reports indicating decreased activity? Were there reports on other threat streams? The evidential base is one-directional: only confirming data was collected or cited. This is classic positive test strategy — searching for (and finding) evidence that supports the existing hypothesis.',
    whatsMissing: 'No mention of disconfirming reports. No base rate comparison (is 14 reports more or fewer than last quarter?). No alternative explanation for increased online activity (could be improved detection, not increased activity). The evidence sounds voluminous but is actually narrow.',
    difficulty: 'easy',
  },
  {
    id: 6,
    topic: 'Weapons Proliferation Assessment',
    judgment: 'Based on our comprehensive analysis of the target country\'s procurement patterns, clandestine network communications, and technical capabilities, we assess with HIGH CONFIDENCE that they are within 18 months of achieving nuclear weapons capability. Our analytic line has been consistent for three years.',
    bias: 'overconfidence',
    explanation: '"Comprehensive analysis" and "consistent for three years" are presented as confidence-boosters. But consistency can mean the analytic line has become institutionalized and resistant to change — not that it is correct. HIGH CONFIDENCE requires not just a coherent story, but robust evidence. The Iraq WMD assessment was also "comprehensive" and "consistent." The analyst confuses narrative coherence with evidential strength.',
    whatsMissing: 'No acknowledgment of previous assessment errors on this target. No red-team challenge. No pre-mortem. No explicit list of key assumptions that could be wrong. "Consistent for three years" could mean the assessment has been wrong for three years and no one has challenged it. ICD-203 Standard 6 violation — uncertainty not properly expressed.',
    difficulty: 'hard',
  },
];

const PS_SKILLS = [
  "ACH", "Key Assumptions Check", "Pre-Mortem Analysis", "ICD-203 Standards",
  "Heuer Cognitive Bias Framework", "Kahneman Decision QC", "Red Team Analysis",
  "Calibration & Forecast Scoring",
];

// ── Bias Map Tree Data ──────────────────────────────────────────
const BIAS_TREE_NODES = [
  {
    id: 'anchoring',
    question: 'The analyst anchored on first data',
    biasKey: 'anchoring',
    satKey: 'key_assumptions_check',
    severity: 'amber',
    y: 30,
    detail: {
      heuerQuote: 'Once an analytic judgment has been formed, the mind is remarkably resistant to changing it in the face of new evidence.',
      kahnemanMechanism: 'System 1 anchoring: the initial value creates an automatic starting point. System 2 adjustment is typically lazy and insufficient. Even random anchors bias subsequent estimates.',
      satSteps: ['Articulate the initial anchor explicitly', 'List all assumptions that flow from it', 'Challenge each: "What if this anchor is wrong?"', 'Seek disconfirming evidence independently', 'Re-estimate from scratch without the anchor'],
    },
  },
  {
    id: 'availability',
    question: 'The analyst recalled vivid examples',
    biasKey: 'availability',
    satKey: 'ach',
    severity: 'amber',
    y: 120,
    detail: {
      heuerQuote: 'Analysts tend to judge the probability of an event by the ease with which they can recall similar instances.',
      kahnemanMechanism: 'WYSIATI (What You See Is All There Is): System 1 builds the best story from available data without flagging what is missing. Vivid, recent, or emotional events dominate recall and distort probability estimates.',
      satSteps: ['List all competing hypotheses, not just the most memorable', 'Compute base rates for each hypothesis', 'Build an evidence matrix (ACH)', 'Weight evidence by reliability, not vividness', 'Explicitly ask: what evidence am I NOT seeing?'],
    },
  },
  {
    id: 'confirmation',
    question: 'The analyst sought confirming evidence',
    biasKey: 'confirmation',
    satKey: 'devils_advocacy',
    severity: 'red',
    y: 210,
    detail: {
      heuerQuote: 'Analysts are more likely to be influenced by early impressions and to seek confirming rather than disconfirming evidence.',
      kahnemanMechanism: 'Positive test strategy: humans instinctively seek evidence that confirms existing beliefs. Combined with coherence-seeking, this creates a self-reinforcing loop where confidence grows while the evidential base narrows.',
      satSteps: ['Assign a Devil\'s Advocate explicitly', 'Advocate must build the strongest counter-case', 'Focus exclusively on disconfirming evidence', 'Present the counter-case in writing', 'Team must respond to each point substantively'],
    },
  },
  {
    id: 'groupthink',
    question: 'The team suppressed dissent',
    biasKey: 'groupthink',
    satKey: 'team_ab',
    severity: 'amber',
    y: 300,
    detail: {
      heuerQuote: 'Group dynamics can suppress critical thinking. The pressure to conform leads teams to converge on positions no individual fully endorses.',
      kahnemanMechanism: 'Social cascade: shared information is discussed more than unshared information (hidden profile problem). Self-censorship maintains group cohesion at the cost of analytic rigor. The illusion of unanimity reinforces false confidence.',
      satSteps: ['Divide analysts into independent Team A and Team B', 'Each team develops its own assessment from the same evidence', 'Teams present findings and identify divergences', 'Divergences become focus of further collection', 'Senior reviewer adjudicates persistent disagreements'],
    },
  },
  {
    id: 'mirror_imaging',
    question: 'The analyst projected own values',
    biasKey: 'mirror_imaging',
    satKey: 'red_team',
    severity: 'amber',
    y: 390,
    detail: {
      heuerQuote: 'Mirror imaging is one of the most common and pernicious analytic errors. Analysts assume that foreign leaders will act as they themselves would.',
      kahnemanMechanism: 'Substitution heuristic: a hard question ("What will the adversary do?") is unconsciously replaced by an easier one ("What would I do?"). The analyst\'s own cultural framework, risk calculus, and values are projected onto foreign actors.',
      satSteps: ['Assemble a Red Team to adopt the adversary perspective', 'Red Team uses only information available to the adversary', 'Develop the adversary\'s most likely course of action', 'Identify what the adversary sees as OUR vulnerabilities', 'Compare Red Team and Blue Team assessments for gaps'],
    },
  },
  {
    id: 'overconfidence',
    question: 'The analyst was too confident',
    biasKey: 'overconfidence',
    satKey: 'premortem',
    severity: 'red',
    y: 480,
    detail: {
      heuerQuote: 'Analysts consistently overestimate the accuracy of their past judgments and express more confidence than the evidence warrants.',
      kahnemanMechanism: 'Coherence illusion + planning fallacy: a good narrative feels true. The quality of the story, not the quantity or quality of evidence, drives confidence. Calibration studies show experts are systematically overconfident.',
      satSteps: ['Assume the current judgment is WRONG', 'Each analyst independently writes why it failed', 'Share failure explanations and identify patterns', 'Assess likelihood of each failure mode', 'Adjust confidence level based on pre-mortem findings'],
    },
  },
];

// ── Scholarly Tips ────────────────────────────────────────────
const PS_TIPS = {
  system1: "Kahneman\u2019s System 1 operates automatically, fast, with little effort. It\u2019s the system that makes a snap judgment about a source\u2019s reliability based on how confident they sound rather than the quality of their evidence. System 1 is why vivid, recent intelligence dominates analysis \u2014 it\u2019s easier to recall. The IC\u2019s structured analytic techniques are essentially System 2 prosthetics: forced slow thinking to counteract System 1 shortcuts.",
  heuer: "Richards Heuer spent 45 years at CIA before writing Psychology of Intelligence Analysis (1999). His central insight: analysts don\u2019t fail because they lack information \u2014 they fail because their mental models filter information before it reaches conscious analysis. ACH was designed to externalize this filtering, making it visible and challengeable. The technique doesn\u2019t find the right answer \u2014 it eliminates wrong ones by forcing analysts to confront disconfirming evidence.",
  groupthink: "Irving Janis coined \u2018groupthink\u2019 studying the Bay of Pigs (1972). The symptoms: illusion of invulnerability, collective rationalization, belief in inherent morality, stereotyping outsiders, self-censorship, illusion of unanimity, direct pressure on dissenters, self-appointed mindguards. The 9/11 Commission found groupthink dynamics in the IC\u2019s failure to connect pre-attack indicators \u2014 analysts in different agencies had pieces of the puzzle but institutional barriers prevented integration.",
  calibration: "Calibration is the alignment between confidence and accuracy. A well-calibrated analyst who says \u2018I\u2019m 80% confident\u2019 should be right 80% of the time. Philip Tetlock\u2019s research (Expert Political Judgment, 2005) found that most experts are systematically overconfident \u2014 their 90% confidence predictions are right only 70% of the time. The IC adopted the ICD-203 probability lexicon partly in response to calibration research.",
};

// ── Component ────────────────────────────────────────────────

function PSAnalysisView({ setView }) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [revealed, setRevealed] = useState(new Set());
  const [showSATDetail, setShowSATDetail] = useState(null);
  const [viewMode, setViewMode] = useState('challenge'); // challenge | review | tradecraft | biasmap | calibration | debiasing
  const [selectedBiasNode, setSelectedBiasNode] = useState(null);
  const [highlightedPath, setHighlightedPath] = useState(null);
  const [tipId, setTipId] = useState(null);

  // ── Calibration trainer state ────────────────────────────
  const [calAnswers, setCalAnswers] = useState({});
  const [calRevealed, setCalRevealed] = useState(false);

  // ── Debiasing workshop state ─────────────────────────────
  const [debiasingStep, setDebiasingStep] = useState(0);
  const [debiasingIds, setDebiasingIds] = useState({});
  const [debiasingTexts, setDebiasingTexts] = useState({});
  const [debiasingRevealed, setDebiasingRevealed] = useState({});

  const C = PS_PALETTE;

  // Scholarly tooltip renderer
  var TipBox = function(key) {
    if (tipId !== key) return null;
    return React.createElement('div', { style: { padding: '10px 14px', background: 'rgba(6,12,20,.94)', border: '1px solid rgba(26,58,106,.15)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(200,208,220,.7)', lineHeight: 1.65, margin: '6px 0 10px' } }, PS_TIPS[key]);
  };

  // SVG micro-icons for scholarly tooltips
  var BrainIcon = React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'system1' ? null : 'system1'); } },
    React.createElement('path', { d: 'M12 3 Q6 3 5 8 Q4 12 6 15 Q8 18 12 21 Q16 18 18 15 Q20 12 19 8 Q18 3 12 3Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M12 3 L12 21', fill: 'none', stroke: 'currentColor', strokeWidth: '.4', strokeDasharray: '2 1.5' }),
    React.createElement('path', { d: 'M8 8 Q10 10 12 8 M12 12 Q14 14 16 12', fill: 'none', stroke: 'currentColor', strokeWidth: '.5' })
  );

  var EyeGearIcon = React.createElement('svg', { width: 26, height: 20, viewBox: '0 0 26 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'heuer' ? null : 'heuer'); } },
    React.createElement('path', { d: 'M2 10 Q7 3 13 3 Q19 3 24 10 Q19 17 13 17 Q7 17 2 10Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 13, cy: 10, r: 4, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 13, cy: 10, r: 1.5, fill: 'currentColor', fillOpacity: '.2' }),
    React.createElement('path', { d: 'M20 3 L21 5 L19 5Z M22 7 L20 7 L21 5Z M22 7 L21 9 L20 7Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.5' })
  );

  var GroupFiguresIcon = React.createElement('svg', { width: 28, height: 20, viewBox: '0 0 28 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'groupthink' ? null : 'groupthink'); } },
    React.createElement('circle', { cx: 8, cy: 5, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M3 18 Q3 12 8 12 Q13 12 13 18', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 20, cy: 5, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M15 18 Q15 12 20 12 Q25 12 25 18', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 14, cy: 3, r: 2, fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('path', { d: 'M11 12 Q11 8 14 8 Q17 8 17 12', fill: 'none', stroke: 'currentColor', strokeWidth: '.6' })
  );

  var TargetIcon = React.createElement('svg', { width: 22, height: 22, viewBox: '0 0 22 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'calibration' ? null : 'calibration'); } },
    React.createElement('circle', { cx: 11, cy: 11, r: 9, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 11, cy: 11, r: 6, fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('circle', { cx: 11, cy: 11, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('circle', { cx: 11, cy: 11, r: .8, fill: 'currentColor', fillOpacity: '.3' }),
    React.createElement('line', { x1: 11, y1: 1, x2: 11, y2: 4, stroke: 'currentColor', strokeWidth: '.4' }),
    React.createElement('line', { x1: 11, y1: 18, x2: 11, y2: 21, stroke: 'currentColor', strokeWidth: '.4' }),
    React.createElement('line', { x1: 1, y1: 11, x2: 4, y2: 11, stroke: 'currentColor', strokeWidth: '.4' }),
    React.createElement('line', { x1: 18, y1: 11, x2: 21, y2: 11, stroke: 'currentColor', strokeWidth: '.4' })
  );
  const scenario = PS_SCENARIOS[currentScenario];
  const answer = userAnswers[scenario.id];
  const isRevealed = revealed.has(scenario.id);

  const submitAnswer = useCallback((biasId) => {
    setUserAnswers(prev => ({ ...prev, [scenario.id]: biasId }));
  }, [scenario.id]);

  const revealAnswer = useCallback(() => {
    setRevealed(prev => new Set([...prev, scenario.id]));
  }, [scenario.id]);

  const correctCount = useMemo(() => {
    return PS_SCENARIOS.filter(s => userAnswers[s.id] === s.bias).length;
  }, [userAnswers]);

  const attemptedCount = Object.keys(userAnswers).length;

  const handleBiasNodeClick = useCallback((nodeId) => {
    setSelectedBiasNode(prev => prev === nodeId ? null : nodeId);
    setHighlightedPath(prev => prev === nodeId ? null : nodeId);
  }, []);

  // ── Bias Map SVG Renderer ──────────────────────────────────
  const renderBiasMap = useCallback(() => {
    const node = selectedBiasNode ? BIAS_TREE_NODES.find(n => n.id === selectedBiasNode) : null;
    const bias = node ? PS_BIASES[node.biasKey] : null;
    const sat = node ? PS_SATS[node.satKey] : null;

    // Layout constants
    const startX = 50, startY = 260;
    const qX = 260, qW = 220, qH = 44;
    const biasX = 540, biasW = 130, biasH = 36;
    const fixX = 720, fixW = 150, fixH = 36;

    return (
      <div>
        <h2 style={{ fontFamily: PS_SERIF, fontSize: 20, fontWeight: 600, color: C.tx, marginBottom: 8 }}>Cognitive Bias Decision Tree</h2>
        <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.65, marginBottom: 16, maxWidth: '60ch' }}>
          Click any node to trace the diagnostic path from judgment failure to recommended SAT. The tree maps Heuer's six core biases to their structured analytic countermeasures.
        </p>

        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 16, overflow: 'auto' }}>
          <svg viewBox="0 0 900 530" style={{ width: '100%', height: 'auto', minHeight: 400 }}>
            {/* Definitions for glow effects */}
            <defs>
              <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor={C.purple} floodOpacity="0.6" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor={C.amber} floodOpacity="0.5" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor={C.red} floodOpacity="0.5" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background grid */}
            {Array.from({ length: 19 }).map((_, i) => (
              <line key={'gv' + i} x1={i * 50} y1={0} x2={i * 50} y2={530} stroke="rgba(26,58,106,.03)" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={'gh' + i} x1={0} y1={i * 50} x2={900} y2={i * 50} stroke="rgba(26,58,106,.03)" strokeWidth="0.5" />
            ))}

            {/* START node */}
            <g>
              <circle cx={startX} cy={startY} r={32} fill="rgba(26,58,106,.12)" stroke={C.purple} strokeWidth={2}
                filter={highlightedPath ? 'url(#glow-purple)' : 'none'} />
              <text x={startX} y={startY - 6} textAnchor="middle" fill={C.purple} fontSize={8} fontFamily={PS_MONO} fontWeight="700">WHAT WENT</text>
              <text x={startX} y={startY + 6} textAnchor="middle" fill={C.purple} fontSize={8} fontFamily={PS_MONO} fontWeight="700">WRONG?</text>
            </g>

            {/* Connection lines from START to question nodes */}
            {BIAS_TREE_NODES.map(n => {
              const isHl = highlightedPath === n.id;
              const nodeY = n.y + 22;
              return (
                <g key={'line-start-' + n.id}>
                  <line x1={startX + 32} y1={startY} x2={qX} y2={nodeY}
                    stroke={isHl ? C.purple : 'rgba(26,58,106,.15)'}
                    strokeWidth={isHl ? 2 : 1}
                    filter={isHl ? 'url(#glow-purple)' : 'none'}
                  />
                </g>
              );
            })}

            {/* Question nodes, Bias nodes, Fix nodes */}
            {BIAS_TREE_NODES.map(n => {
              const isHl = highlightedPath === n.id;
              const biasData = PS_BIASES[n.biasKey];
              const satData = PS_SATS[n.satKey];
              const sevColor = n.severity === 'red' ? C.red : C.amber;
              const sevColorDm = n.severity === 'red' ? C.redDm : C.amberDm;
              const sevBg = n.severity === 'red' ? 'rgba(176,72,72,.12)' : 'rgba(204,170,64,.12)';
              const glowFilter = n.severity === 'red' ? 'url(#glow-red)' : 'url(#glow-amber)';
              const nodeY = n.y;

              return (
                <g key={'tree-' + n.id} style={{ cursor: 'pointer' }} onClick={() => handleBiasNodeClick(n.id)}>
                  {/* Question node (rounded rect) */}
                  <rect x={qX} y={nodeY} width={qW} height={qH} rx={6} ry={6}
                    fill={isHl ? 'rgba(26,58,106,.15)' : 'rgba(26,58,106,.06)'}
                    stroke={isHl ? C.purple : 'rgba(26,58,106,.2)'}
                    strokeWidth={isHl ? 2 : 1}
                    filter={isHl ? 'url(#glow-purple)' : 'none'}
                  />
                  <text x={qX + qW / 2} y={nodeY + qH / 2 + 1} textAnchor="middle" dominantBaseline="middle"
                    fill={isHl ? C.tx : C.tx2} fontSize={9} fontFamily={PS_SANS}>
                    {n.question}
                  </text>

                  {/* Line from question to bias */}
                  <line x1={qX + qW} y1={nodeY + qH / 2} x2={biasX} y2={nodeY + biasH / 2 + (qH - biasH) / 2}
                    stroke={isHl ? sevColor : 'rgba(26,58,106,.12)'}
                    strokeWidth={isHl ? 2 : 1}
                    filter={isHl ? glowFilter : 'none'}
                  />

                  {/* Bias leaf node */}
                  <rect x={biasX} y={nodeY + (qH - biasH) / 2} width={biasW} height={biasH} rx={6} ry={6}
                    fill={isHl ? sevBg : 'rgba(80,60,100,.08)'}
                    stroke={isHl ? sevColor : sevColorDm + '60'}
                    strokeWidth={isHl ? 2 : 1}
                    filter={isHl ? glowFilter : 'none'}
                  />
                  <text x={biasX + biasW / 2} y={nodeY + (qH - biasH) / 2 + biasH / 2 + 1} textAnchor="middle" dominantBaseline="middle"
                    fill={sevColor} fontSize={10} fontFamily={PS_MONO} fontWeight="700">
                    {biasData.name}
                  </text>

                  {/* Line from bias to fix */}
                  <line x1={biasX + biasW} y1={nodeY + qH / 2} x2={fixX} y2={nodeY + qH / 2}
                    stroke={isHl ? C.green : 'rgba(80,170,96,.12)'}
                    strokeWidth={isHl ? 2 : 1}
                    strokeDasharray={isHl ? 'none' : '4,3'}
                    filter={isHl ? 'none' : 'none'}
                  />

                  {/* Fix node */}
                  <rect x={fixX} y={nodeY + (qH - fixH) / 2} width={fixW} height={fixH} rx={6} ry={6}
                    fill={isHl ? C.greenBg : 'rgba(80,170,96,.04)'}
                    stroke={isHl ? C.green : C.greenDm + '40'}
                    strokeWidth={isHl ? 2 : 1}
                  />
                  <text x={fixX + fixW / 2} y={nodeY + (qH - fixH) / 2 + fixH / 2 + 1} textAnchor="middle" dominantBaseline="middle"
                    fill={isHl ? C.green : C.greenDm} fontSize={9} fontFamily={PS_MONO} fontWeight="600">
                    {satData.name.length > 22 ? satData.name.substring(0, 20) + '..' : satData.name}
                  </text>
                </g>
              );
            })}

            {/* Column headers */}
            <text x={startX} y={12} textAnchor="middle" fill={C.tx3} fontSize={8} fontFamily={PS_MONO}>DIAGNOSIS</text>
            <text x={qX + qW / 2} y={12} textAnchor="middle" fill={C.tx3} fontSize={8} fontFamily={PS_MONO}>SYMPTOM</text>
            <text x={biasX + biasW / 2} y={12} textAnchor="middle" fill={C.tx3} fontSize={8} fontFamily={PS_MONO}>BIAS</text>
            <text x={fixX + fixW / 2} y={12} textAnchor="middle" fill={C.tx3} fontSize={8} fontFamily={PS_MONO}>COUNTERMEASURE</text>
          </svg>
        </div>

        {/* Detail panel */}
        {node && bias && sat && (
          <div style={{ marginTop: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{
              padding: '14px 20px', borderBottom: '1px solid ' + C.line,
              background: node.severity === 'red' ? C.redBg : C.amberBg,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: PS_MONO, fontSize: 12, fontWeight: 700, color: node.severity === 'red' ? C.red : C.amber }}>
                  {bias.name}
                </span>
                <span style={{
                  fontFamily: PS_MONO, fontSize: 11, padding: '2px 8px', borderRadius: 3,
                  background: node.severity === 'red' ? 'rgba(176,72,72,.2)' : 'rgba(204,170,64,.2)',
                  color: node.severity === 'red' ? C.red : C.amber,
                }}>
                  {node.severity === 'red' ? 'HIGH FREQUENCY' : 'MODERATE FREQUENCY'}
                </span>
              </div>
            </div>

            <div style={{ padding: 20, display: 'grid', gap: 14 }}>
              {/* Heuer quote */}
              <div style={{ padding: 14, background: C.purpleBg, border: '1px solid ' + C.purple + '20', borderRadius: 6 }}>
                <p style={{ fontFamily: PS_MONO, fontSize: 11, color: C.purple, marginBottom: 6, fontWeight: 600 }}>HEUER</p>
                <p style={{ fontFamily: PS_SERIF, fontSize: 13, color: C.tx, lineHeight: 1.6, fontStyle: 'italic' }}>
                  {node.detail.heuerQuote}
                </p>
              </div>

              {/* Kahneman mechanism */}
              <div style={{ padding: 14, background: C.amberBg, border: '1px solid ' + C.amber + '20', borderRadius: 6 }}>
                <p style={{ fontFamily: PS_MONO, fontSize: 11, color: C.amber, marginBottom: 6, fontWeight: 600 }}>KAHNEMAN MECHANISM</p>
                <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6 }}>
                  {node.detail.kahnemanMechanism}
                </p>
              </div>

              {/* Recommended SAT with steps */}
              <div style={{ padding: 14, background: C.greenBg, border: '1px solid ' + C.green + '20', borderRadius: 6 }}>
                <p style={{ fontFamily: PS_MONO, fontSize: 11, color: C.green, marginBottom: 6, fontWeight: 600 }}>RECOMMENDED SAT: {sat.name}</p>
                <ol style={{ paddingLeft: 18, margin: 0 }}>
                  {node.detail.satSteps.map((step, i) => (
                    <li key={i} style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6, marginBottom: 3 }}>{step}</li>
                  ))}
                </ol>
                <p style={{ fontFamily: PS_MONO, fontSize: 11, color: C.tx3, marginTop: 8 }}>Source: {sat.source}</p>
              </div>

              {/* ICD-203 reference */}
              <div style={{ padding: 10, borderLeft: '3px solid ' + C.purple, background: 'rgba(26,58,106,.03)', borderRadius: '0 6px 6px 0' }}>
                <p style={{ fontFamily: PS_MONO, fontSize: 11, color: C.purple, marginBottom: 4, fontWeight: 600 }}>ICD-203 STANDARD VIOLATED</p>
                <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.65 }}>{bias.icd203}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }, [selectedBiasNode, highlightedPath, handleBiasNodeClick, C]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #08061a 0%, #0c0a22 30%, #08061a 100%)', color: C.tx, fontFamily: PS_SANS, position: 'relative' }}>
      {React.createElement(NeuralNetworkBg)}
      {/* Top bar — Laboratory Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(4,8,14,.96)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(40,80,140,.1)', padding: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 24px' }}>
          <button onClick={() => setView('coursework')} style={{ background: 'none', border: 'none', color: C.tx3, fontFamily: PS_MONO, fontSize: 11, cursor: 'pointer' }}>{'\u2190'} Back</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {React.createElement(SynapsePulse, { color: C.purple })}
            <span style={{ fontFamily: PS_MONO, fontSize: 10, color: C.purpleDm, letterSpacing: '.15em' }}>COGNITIVE SCIENCE LABORATORY {'\u2014'} MPAI 5610</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 4, background: correctCount === attemptedCount && attemptedCount > 0 ? 'rgba(80,170,96,.06)' : 'rgba(204,170,64,.06)', border: '1px solid ' + (correctCount === attemptedCount && attemptedCount > 0 ? 'rgba(80,170,96,.2)' : 'rgba(204,170,64,.2)') }}>
            {React.createElement(SynapsePulse, { color: correctCount === attemptedCount && attemptedCount > 0 ? C.green : C.amber })}
            <span style={{ fontFamily: PS_MONO, fontSize: 11, color: correctCount === attemptedCount && attemptedCount > 0 ? C.green : C.amber }}>{correctCount}/{attemptedCount}</span>
          </div>
        </div>
        {React.createElement(WavePatternDivider)}
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {React.createElement(BrainScanRings)}
        {/* Hero - Laboratory entrance */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: PS_MONO, fontSize: 9, letterSpacing: '.2em', color: C.purpleDm, marginBottom: 8 }}>PSYCHOLOGY OF INTELLIGENCE ANALYSIS</div>
          <h1 style={{ fontFamily: PS_SERIF, fontSize: 30, fontWeight: 700, color: C.tx, letterSpacing: '-.02em', marginBottom: 4, borderBottom: '2px solid rgba(26,58,106,.12)', paddingBottom: 10 }}>
            Bias Detection Challenge
            {BrainIcon}
            {EyeGearIcon}
          </h1>
          {TipBox('system1')}
          {TipBox('heuer')}
          <p style={{ fontFamily: PS_MONO, fontSize: 11, color: C.purpleDm, marginBottom: 12 }}>PDB Quality Control Officer — Review Before Dissemination</p>
          <p style={{ fontSize: 13, color: C.tx2, lineHeight: 1.6, maxWidth: '60ch' }}>
            You are the QC officer reviewing analytic judgments before they reach the President's Daily Brief. Each judgment contains an embedded cognitive bias that violates ICD-203 analytic standards. Identify the bias, name the SAT that would fix it, and see how Heuer and Kahneman explain the mechanism.
            {TargetIcon}
          </p>
          {TipBox('calibration')}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {PS_SKILLS.map(s => (
              <span key={s} style={{ padding: '3px 8px', borderRadius: 3, background: `${C.purple}10`, border: `1px solid ${C.purple}20`, fontSize: 11, fontFamily: PS_MONO, color: `${C.purple}88` }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Mode tabs — Lab station selector */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, flexWrap: 'wrap', padding: '8px 0', borderBottom: '1px solid rgba(40,80,140,.06)' }}>
          {[['challenge','EXPERIMENT','Challenge'],['review','DATA REVIEW','Review All'],['tradecraft','REFERENCE','SAT Library'],['biasmap','TOPOLOGY','Bias Map'],['calibration','FORECAST','Calibration'],['debiasing','WORKSHOP','Debiasing']].map(([id,tag,label]) => (
            <button key={id} onClick={() => setViewMode(id)} style={{
              padding: '8px 16px', background: viewMode === id ? 'rgba(26,58,106,.12)' : 'transparent',
              border: viewMode === id ? '1px solid ' + C.purple : '1px solid rgba(40,80,140,.08)',
              borderTop: viewMode === id ? '3px solid ' + C.purple : '3px solid transparent',
              borderRadius: '4px 4px 2px 2px',
              color: viewMode === id ? '#fff' : C.tx2, fontFamily: PS_MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer',
              textAlign: 'left',
            }}>
              <span style={{ display: 'block', fontSize: 8, letterSpacing: '.12em', color: viewMode === id ? C.purple : C.tx3, marginBottom: 2 }}>{tag}</span>
              {label}
            </button>
          ))}
        </div>

        {/* ── CHALLENGE MODE ── */}
        {viewMode === 'challenge' && (
          <div>
            {/* Scenario navigation — Lab experiment selector */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
              {PS_SCENARIOS.map((s, i) => {
                const answered = userAnswers[s.id] !== undefined;
                const correct = userAnswers[s.id] === s.bias;
                return (
                  <button key={s.id} onClick={() => setCurrentScenario(i)} style={{
                    flex: 1, padding: '8px 4px', textAlign: 'center',
                    background: i === currentScenario ? 'rgba(26,58,106,.1)' : answered ? (correct ? C.greenBg : C.redBg) : 'rgba(6,14,26,.9)',
                    border: i === currentScenario ? '1px solid ' + C.purple : answered ? '1px solid ' + (correct ? C.green : C.red) : '1px solid rgba(40,80,140,.08)',
                    borderTop: i === currentScenario ? '2px solid ' + C.purple : '2px solid transparent',
                    borderRadius: '4px 4px 2px 2px', cursor: 'pointer',
                  }}>
                    <span style={{ fontFamily: PS_MONO, fontSize: 11, color: i === currentScenario ? C.purple : answered ? (correct ? C.green : C.red) : C.tx3 }}>#{s.id}</span>
                    <span style={{ display: 'block', fontSize: 12, color: C.tx3, marginTop: 1 }}>{s.difficulty}</span>
                  </button>
                );
              })}
            </div>

            {/* Current judgment */}
            <div style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 6, padding: 20, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: PS_MONO, fontSize: 12, color: C.purple }}>ANALYTIC JUDGMENT — {scenario.topic}</span>
                <span style={{ fontFamily: PS_MONO, fontSize: 11, padding: '2px 6px', borderRadius: 3,
                  background: scenario.difficulty === 'easy' ? C.greenBg : scenario.difficulty === 'hard' ? C.redBg : C.amberBg,
                  color: scenario.difficulty === 'easy' ? C.green : scenario.difficulty === 'hard' ? C.red : C.amber,
                }}>{scenario.difficulty}</span>
              </div>
              <blockquote style={{ fontFamily: PS_SERIF, fontSize: 15, color: C.tx, lineHeight: 1.7, borderLeft: `3px solid ${C.purple}40`, paddingLeft: 16, margin: 0 }}>
                {scenario.judgment}
              </blockquote>
            </div>

            {/* Bias selection */}
            {!isRevealed && (
              <div>
                <p style={{ fontFamily: PS_MONO, fontSize: 12, color: C.tx3, marginBottom: 8, textTransform: 'uppercase' }}>
                  What cognitive bias is present in this judgment?
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                  {Object.entries(PS_BIASES).map(([id, bias]) => (
                    <button key={id} onClick={() => submitAnswer(id)} style={{
                      padding: 10, textAlign: 'left',
                      background: answer === id ? (id === scenario.bias ? C.greenBg : C.redBg) : C.card,
                      border: `1px solid ${answer === id ? (id === scenario.bias ? C.green : C.red) : C.cardBd}`,
                      borderRadius: 6, cursor: answer ? 'default' : 'pointer', color: C.tx,
                    }}>
                      <p style={{ fontFamily: PS_MONO, fontSize: 11, fontWeight: 600, color: answer === id ? (id === scenario.bias ? C.green : C.red) : C.tx, marginBottom: 4 }}>
                        {answer === id && (id === scenario.bias ? '\✓ ' : '\✗ ')}{bias.name}
                      </p>
                      <p style={{ fontSize: 11, color: C.tx3, lineHeight: 1.6 }}>{bias.heuer.split(':')[0]}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Reveal button */}
            {answer && !isRevealed && (
              <button onClick={revealAnswer} style={{ marginTop: 16, padding: '10px 24px', background: C.purple, border: 'none', borderRadius: 4, color: '#fff', fontFamily: PS_MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                Reveal Full Analysis →
              </button>
            )}

            {/* Revealed explanation */}
            {isRevealed && (
              <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
                {/* Correct answer */}
                <div style={{ padding: 14, background: C.greenBg, border: `1px solid ${C.green}30`, borderRadius: 6 }}>
                  <p style={{ fontFamily: PS_MONO, fontSize: 12, color: C.green, marginBottom: 6, fontWeight: 600 }}>CORRECT ANSWER: {PS_BIASES[scenario.bias].name}</p>
                  <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.6 }}>{scenario.explanation}</p>
                </div>

                {/* What's missing */}
                <div style={{ padding: 14, background: C.redBg, border: `1px solid ${C.red}30`, borderRadius: 6 }}>
                  <p style={{ fontFamily: PS_MONO, fontSize: 12, color: C.red, marginBottom: 6, fontWeight: 600 }}>WHAT THE JUDGMENT IS MISSING</p>
                  <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.6 }}>{scenario.whatsMissing}</p>
                </div>

                {/* Heuer mechanism */}
                <div style={{ padding: 14, background: C.purpleBg, border: `1px solid ${C.purple}30`, borderRadius: 6 }}>
                  <p style={{ fontFamily: PS_MONO, fontSize: 12, color: C.purple, marginBottom: 6, fontWeight: 600 }}>BIAS MECHANISM</p>
                  <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.65, marginBottom: 8 }}>{PS_BIASES[scenario.bias].mechanism}</p>
                  <div style={{ display: 'grid', gap: 4 }}>
                    <p style={{ fontSize: 12, color: C.tx3 }}><strong style={{ color: C.purple }}>Heuer:</strong> {PS_BIASES[scenario.bias].heuer}</p>
                    <p style={{ fontSize: 12, color: C.tx3 }}><strong style={{ color: C.amber }}>Kahneman:</strong> {PS_BIASES[scenario.bias].kahneman}</p>
                    <p style={{ fontSize: 12, color: C.tx3 }}><strong style={{ color: C.green }}>ICD-203:</strong> {PS_BIASES[scenario.bias].icd203}</p>
                  </div>
                </div>

                {/* Recommended SAT */}
                {(() => {
                  const satId = PS_BIASES[scenario.bias].mitigation;
                  const sat = PS_SATS[satId];
                  return sat ? (
                    <div style={{ padding: 14, background: C.amberBg, border: `1px solid ${C.amber}30`, borderRadius: 6 }}>
                      <p style={{ fontFamily: PS_MONO, fontSize: 12, color: C.amber, marginBottom: 6, fontWeight: 600 }}>RECOMMENDED SAT: {sat.name}</p>
                      <ol style={{ paddingLeft: 16, margin: 0 }}>
                        {sat.steps.map((step, i) => (
                          <li key={i} style={{ fontSize: 11, color: C.tx2, lineHeight: 1.65, marginBottom: 3 }}>{step}</li>
                        ))}
                      </ol>
                      <p style={{ fontFamily: PS_MONO, fontSize: 11, color: C.tx3, marginTop: 6 }}>Source: {sat.source}</p>
                    </div>
                  ) : null;
                })()}

                {/* Next scenario */}
                {currentScenario < PS_SCENARIOS.length - 1 && (
                  <button onClick={() => { setCurrentScenario(currentScenario + 1); }} style={{ marginTop: 8, padding: '10px 24px', background: 'transparent', border: `1px solid ${C.line}`, borderRadius: 4, color: C.tx3, fontFamily: PS_MONO, fontSize: 11, cursor: 'pointer' }}>
                    Next Judgment →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── REVIEW MODE ── */}
        {viewMode === 'review' && (
          <div>
            <h2 style={{ fontFamily: PS_SERIF, fontSize: 20, fontWeight: 600, color: C.tx, marginBottom: 16 }}>Performance Review{TargetIcon}{GroupFiguresIcon}</h2>
            {TipBox('calibration')}
            {TipBox('groupthink')}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
              <div style={{ padding: 12, background: C.greenBg, borderRadius: 6, textAlign: 'center' }}>
                <p style={{ fontFamily: PS_MONO, fontSize: 24, fontWeight: 700, color: C.green }}>{correctCount}</p>
                <p style={{ fontSize: 12, color: C.tx2 }}>Correct</p>
              </div>
              <div style={{ padding: 12, background: C.redBg, borderRadius: 6, textAlign: 'center' }}>
                <p style={{ fontFamily: PS_MONO, fontSize: 24, fontWeight: 700, color: C.red }}>{attemptedCount - correctCount}</p>
                <p style={{ fontSize: 12, color: C.tx2 }}>Incorrect</p>
              </div>
              <div style={{ padding: 12, background: C.purpleBg, borderRadius: 6, textAlign: 'center' }}>
                <p style={{ fontFamily: PS_MONO, fontSize: 24, fontWeight: 700, color: C.purple }}>{PS_SCENARIOS.length - attemptedCount}</p>
                <p style={{ fontSize: 12, color: C.tx2 }}>Remaining</p>
              </div>
            </div>
            {PS_SCENARIOS.map(s => {
              const ans = userAnswers[s.id];
              const correct = ans === s.bias;
              return (
                <div key={s.id} style={{ padding: 12, marginBottom: 6, background: C.card, border: `1px solid ${C.cardBd}`, borderLeft: `3px solid ${!ans ? C.tx3 : correct ? C.green : C.red}`, borderRadius: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: PS_MONO, fontSize: 11, color: C.tx, fontWeight: 600 }}>#{s.id} — {s.topic}</span>
                    <span style={{ fontFamily: PS_MONO, fontSize: 12, color: !ans ? C.tx3 : correct ? C.green : C.red }}>
                      {!ans ? 'Unanswered' : correct ? `\✓ ${PS_BIASES[s.bias].name}` : `\✗ Answered: ${PS_BIASES[ans]?.name || ans}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── TRADECRAFT MODE ── */}
        {viewMode === 'tradecraft' && (
          <div>
            <h2 style={{ fontFamily: PS_SERIF, fontSize: 20, fontWeight: 600, color: C.tx, marginBottom: 16 }}>SAT Library — Structured Analytic Techniques{EyeGearIcon}{GroupFiguresIcon}</h2>
            {TipBox('heuer')}
            {TipBox('groupthink')}
            <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.65, marginBottom: 16, maxWidth: '60ch' }}>
              Each SAT is a discipline — a structured process that forces the analyst to do what cognitive biases prevent them from doing naturally. The PAIB contains 100 executable toolkit templates. These six are the core bias-mitigation techniques.
              {BrainIcon}
            </p>
            {TipBox('system1')}
            <div style={{ display: 'grid', gap: 8 }}>
              {Object.entries(PS_SATS).map(([id, sat]) => {
                const isExpanded = showSATDetail === id;
                return (
                  <div key={id}>
                    <button onClick={() => setShowSATDetail(isExpanded ? null : id)} style={{
                      width: '100%', textAlign: 'left', padding: 14,
                      background: isExpanded ? C.amberBg : C.card,
                      border: `1px solid ${isExpanded ? C.amber : C.cardBd}`,
                      borderRadius: isExpanded ? '6px 6px 0 0' : 6, cursor: 'pointer', color: C.tx,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: PS_MONO, fontSize: 12, fontWeight: 600 }}>{sat.name}</span>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {sat.mitigates.map(b => (
                            <span key={b} style={{ padding: '2px 6px', borderRadius: 3, background: C.purpleBg, fontFamily: PS_MONO, fontSize: 12, color: C.purple }}>{PS_BIASES[b]?.name || b}</span>
                          ))}
                        </div>
                      </div>
                    </button>
                    {isExpanded && (
                      <div style={{ padding: 14, background: C.card, border: `1px solid ${C.cardBd}`, borderTop: 'none', borderRadius: '0 0 6px 6px' }}>
                        <ol style={{ paddingLeft: 16, margin: 0 }}>
                          {sat.steps.map((step, i) => (
                            <li key={i} style={{ fontSize: 11, color: C.tx, lineHeight: 1.6, marginBottom: 4 }}>{step}</li>
                          ))}
                        </ol>
                        <p style={{ fontFamily: PS_MONO, fontSize: 11, color: C.tx3, marginTop: 8 }}>Source: {sat.source}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Provenance */}
            <div style={{ marginTop: 20, padding: 14, background: C.card, border: `1px solid ${C.cardBd}`, borderLeft: `3px solid ${C.purple}`, borderRadius: 6 }}>
              <p style={{ fontFamily: PS_MONO, fontSize: 12, color: C.purple, marginBottom: 8, fontWeight: 600 }}>SOURCES & PROVENANCE</p>
              {[
                'PAIB Course Bible: 10-part skeleton, 56 Tranche 1 entries, 4 toolkits, 6 case practica',
                'Companion Gap Bible (20 tranches, 265K+ words): 873 field-canon entries (CON/MTH/INS/MET/EMG/CAS)',
                'Companion Toolkits Master: 100 executable templates (TK-001–TK-100)',
                'Heuer, Richards J. Psychology of Intelligence Analysis. CIA CSI, 1999.',
                'Kahneman, Daniel. Thinking, Fast and Slow. Farrar, Straus and Giroux, 2011.',
                'ICD-203: Analytic Standards. DNI, 2015.',
              ].map((src, i) => (
                <p key={i} style={{ fontSize: 12, color: C.tx2, lineHeight: 1.65, marginBottom: 3, paddingLeft: 10, borderLeft: `2px solid ${C.purple}30` }}>{src}</p>
              ))}
            </div>
          </div>
        )}

        {/* ── BIAS MAP MODE ── */}
        {viewMode === 'biasmap' && renderBiasMap()}

        {/* ── CALIBRATION MODE ── */}
        {viewMode === 'calibration' && (() => {
          var CAL_QUESTIONS = [
            { id: 'q1', text: 'A randomly selected country in the UN General Assembly is a democracy (Freedom House "Free" rating).', actual: 44, source: 'Freedom House 2024: 84/193 = 43.5% of member states rated "Free"' },
            { id: 'q2', text: 'A cyber attack attributed to a state actor targets critical infrastructure within 12 months of a diplomatic crisis with that state.', actual: 32, source: 'CFR Cyber Operations Tracker: ~32% of state-attributed cyber operations follow diplomatic tensions within 12 months' },
            { id: 'q3', text: 'An intelligence estimate assessed with "high confidence" proves correct within 5 years.', actual: 78, source: 'Mandel & Barnes (2014) review of NIE accuracy: ~78% of high-confidence judgments validated' },
            { id: 'q4', text: 'A country with nuclear weapons uses them in a conflict in the next 50 years.', actual: 8, source: 'Expert survey estimates cluster around 5-15%; median ~8% (Sandberg & Bostrom, 2008; updated surveys)' },
            { id: 'q5', text: 'A HUMINT source recruited by a foreign intelligence service is actually a double agent.', actual: 18, source: 'Historical analysis suggests 15-20% of recruited agents may be doubles or fabricators (Bearden & Risen estimates)' },
            { id: 'q6', text: 'Diplomatic negotiations between two adversarial states result in a signed agreement within 2 years of initiation.', actual: 35, source: 'UCDP negotiation dataset: ~35% of formal negotiations between adversaries produce signed agreements' },
            { id: 'q7', text: 'An authoritarian leader who has been in power 10+ years is removed from power within the next 5 years.', actual: 22, source: 'Archigos dataset analysis: ~22% of leaders with 10+ year tenure lose power within 5 years' },
            { id: 'q8', text: 'A country experiencing mass protests (100K+) undergoes regime change within 1 year.', actual: 28, source: 'Chenoweth & Stephan civil resistance data: ~28% of mass protest movements achieve regime change within 12 months' },
            { id: 'q9', text: 'An OSINT investigation correctly identifies a covert military operation before official acknowledgment.', actual: 55, source: 'Post-2014 track record: Bellingcat, commercial satellite, and social media analysis identify ~55% of significant covert military activities' },
            { id: 'q10', text: 'A sanctions regime achieves its stated policy objective within 5 years.', actual: 34, source: 'Hufbauer et al. (2007) sanctions effectiveness dataset: ~34% success rate across all episodes' },
          ];

          var answered = Object.keys(calAnswers).length;
          var allAnswered = answered === CAL_QUESTIONS.length;

          // Calibration curve computation
          var calCurve = null;
          if (calRevealed) {
            var buckets = [[],[],[],[],[]]; // 0-20, 21-40, 41-60, 61-80, 81-100
            CAL_QUESTIONS.forEach(function(q) {
              var userP = calAnswers[q.id] || 50;
              var bi = Math.min(4, Math.floor(userP / 20.01));
              // Was the user "right"? Measure as closeness
              var error = Math.abs(userP - q.actual);
              buckets[bi].push({ userP: userP, actual: q.actual, error: error });
            });
            calCurve = buckets.map(function(b, bi) {
              var midpoint = bi * 20 + 10;
              if (b.length === 0) return { midpoint: midpoint, meanActual: null, count: 0 };
              var meanActual = Math.round(b.reduce(function(s, x) { return s + x.actual; }, 0) / b.length);
              return { midpoint: midpoint, meanActual: meanActual, count: b.length };
            });
          }
          var brierScore = calRevealed ? (CAL_QUESTIONS.reduce(function(s, q) {
            var p = (calAnswers[q.id] || 50) / 100;
            var a = q.actual / 100;
            return s + Math.pow(p - a, 2);
          }, 0) / CAL_QUESTIONS.length).toFixed(3) : null;
          var superforecasterBrier = '0.060';

          return (
            <div>
              <div style={{ padding: 16, background: C.card, border: `1px solid ${C.cardBd}`, borderLeft: `3px solid ${C.purple}`, marginBottom: 16, borderRadius: 6 }}>
                <p style={{ fontFamily: PS_MONO, fontSize: 10, color: C.purple, letterSpacing: '.12em', marginBottom: 8 }}>FORECAST CALIBRATION TRAINER</p>
                <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.7, marginBottom: 16 }}>
                  For each statement, estimate the probability (0-100%) that it is true. After all 10 answers, see your calibration curve and Brier score compared to Tetlock's superforecaster benchmark. Well-calibrated forecasters assign probabilities that match real-world base rates.
                </p>

                {CAL_QUESTIONS.map(function(q, qi) {
                  var val = calAnswers[q.id];
                  var hasVal = val !== undefined;
                  return (
                    <div key={q.id} style={{ padding: '10px 12px', marginBottom: 6, background: calRevealed ? (Math.abs((val||50) - q.actual) <= 15 ? C.greenBg : C.redBg) : 'rgba(0,0,0,.15)', border: `1px solid ${C.line}`, borderRadius: 3 }}>
                      <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.5, marginBottom: 6 }}>
                        <span style={{ fontFamily: PS_MONO, fontSize: 10, color: C.purple, marginRight: 6 }}>Q{qi+1}.</span>
                        {q.text}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <input type="range" min={0} max={100} value={val || 50}
                          disabled={calRevealed}
                          onChange={function(e) { var nv = parseInt(e.target.value); setCalAnswers(function(prev) { var c = Object.assign({}, prev); c[q.id] = nv; return c; }); }}
                          style={{ flex: 1, accentColor: C.purple, cursor: calRevealed ? 'default' : 'pointer' }}
                        />
                        <span style={{ fontFamily: PS_MONO, fontSize: 14, color: C.purple, fontWeight: 700, minWidth: 40, textAlign: 'right' }}>{hasVal ? val + '%' : '--'}</span>
                      </div>
                      {calRevealed && (
                        <div style={{ marginTop: 6 }}>
                          <div style={{ fontFamily: PS_MONO, fontSize: 11, color: C.amber }}>Actual: {q.actual}% | Your estimate: {val||50}% | Error: {Math.abs((val||50) - q.actual)}pp</div>
                          <p style={{ fontSize: 10, color: C.tx3, lineHeight: 1.5, marginTop: 2 }}>{q.source}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {!calRevealed && (
                  <button onClick={function() { if (allAnswered) setCalRevealed(true); }}
                    disabled={!allAnswered}
                    style={{
                      marginTop: 12, padding: '8px 20px', fontFamily: PS_MONO, fontSize: 11, cursor: allAnswered ? 'pointer' : 'not-allowed',
                      background: allAnswered ? C.purpleBg : 'transparent', border: `1px solid ${allAnswered ? C.purple : C.line}`,
                      color: allAnswered ? C.purple : C.tx3, borderRadius: 3,
                    }}>
                    {allAnswered ? 'Reveal Calibration Results' : 'Answer all 10 questions (' + answered + '/10)'}
                  </button>
                )}

                {calRevealed && (
                  <div style={{ marginTop: 16, padding: 14, background: 'rgba(0,0,0,.2)', border: `1px solid ${C.line}`, borderRadius: 6 }}>
                    <div style={{ fontFamily: PS_MONO, fontSize: 10, color: C.purple, letterSpacing: '.1em', marginBottom: 10 }}>CALIBRATION RESULTS</div>

                    {/* Brier score */}
                    <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                      <div style={{ textAlign: 'center', padding: 12, background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 3, flex: 1 }}>
                        <div style={{ fontFamily: PS_MONO, fontSize: 9, color: C.tx3 }}>YOUR BRIER SCORE</div>
                        <div style={{ fontFamily: PS_MONO, fontSize: 24, fontWeight: 700, color: parseFloat(brierScore) < 0.1 ? C.green : parseFloat(brierScore) < 0.2 ? C.amber : C.red }}>{brierScore}</div>
                        <div style={{ fontSize: 10, color: C.tx3 }}>Lower is better (0 = perfect)</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: 12, background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 3, flex: 1 }}>
                        <div style={{ fontFamily: PS_MONO, fontSize: 9, color: C.tx3 }}>SUPERFORECASTER BENCHMARK</div>
                        <div style={{ fontFamily: PS_MONO, fontSize: 24, fontWeight: 700, color: C.green }}>{superforecasterBrier}</div>
                        <div style={{ fontSize: 10, color: C.tx3 }}>Tetlock (2015) Good Judgment Project</div>
                      </div>
                    </div>

                    {/* Calibration curve as text-based bar chart */}
                    <div style={{ fontFamily: PS_MONO, fontSize: 10, color: C.tx3, marginBottom: 8 }}>CALIBRATION CURVE (predicted vs actual)</div>
                    {calCurve && calCurve.map(function(b) {
                      if (b.count === 0) return null;
                      return (
                        <div key={b.midpoint} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontFamily: PS_MONO, fontSize: 10, color: C.tx3, width: 50, textAlign: 'right' }}>{b.midpoint-10}-{b.midpoint+10}%</span>
                          <div style={{ flex: 1, height: 12, background: C.line, borderRadius: 2, position: 'relative' }}>
                            <div style={{ position: 'absolute', left: b.meanActual + '%', top: 0, bottom: 0, width: 3, background: C.green, borderRadius: 1 }} />
                            <div style={{ position: 'absolute', left: b.midpoint + '%', top: 0, bottom: 0, width: 3, background: C.purple, borderRadius: 1 }} />
                          </div>
                          <span style={{ fontFamily: PS_MONO, fontSize: 9, color: C.tx2, width: 80 }}>actual:{b.meanActual}% n={b.count}</span>
                        </div>
                      );
                    })}
                    <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 9, color: C.tx3 }}>
                      <span><span style={{ display: 'inline-block', width: 8, height: 8, background: C.purple, borderRadius: 1, marginRight: 3 }} />Predicted</span>
                      <span><span style={{ display: 'inline-block', width: 8, height: 8, background: C.green, borderRadius: 1, marginRight: 3 }} />Actual</span>
                    </div>

                    <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6, marginTop: 12 }}>
                      {parseFloat(brierScore) < 0.08 ? 'Excellent calibration. Your probability estimates closely match real-world base rates. This level of calibration approaches the superforecaster benchmark from Tetlock\'s Good Judgment Project.' : parseFloat(brierScore) < 0.15 ? 'Moderate calibration. Some of your estimates diverged from actual base rates. Review questions where your error exceeded 20 percentage points to identify systematic biases.' : 'Poor calibration. Your estimates showed significant divergence from base rates, suggesting possible overconfidence or anchoring effects. Forecasting skill improves with practice and explicit base rate consideration.'}
                    </p>

                    <button onClick={function() { setCalAnswers({}); setCalRevealed(false); }}
                      style={{ marginTop: 10, padding: '6px 14px', fontFamily: PS_MONO, fontSize: 10, background: 'transparent', border: `1px solid ${C.purple}`, color: C.purple, cursor: 'pointer', borderRadius: 3 }}>
                      Reset Calibration
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ── DEBIASING MODE ── */}
        {viewMode === 'debiasing' && (() => {
          var DEBIASING_ITEMS = [
            { id: 'd1', judgment: 'Based on the last three successful operations in this region, we assess with high confidence that the next operation will also succeed.', bias: 'Representativeness / Base Rate Neglect', biasId: 'representativeness', explanation: 'Three successes is too small a sample to establish high confidence. This ignores the base rate of operational success across all regions and conditions. The analyst is treating a small, non-random sample as representative of future outcomes.', debiased: 'While three recent operations succeeded, the overall base rate for similar operations in comparable environments is approximately 60%. We assess with moderate confidence that conditions remain favorable, but note that operational outcomes are sensitive to factors (weather, counterintelligence, force posture) that vary independently of past results.' },
            { id: 'd2', judgment: 'The adversary has not moved forces in three weeks. We therefore assess they have abandoned their offensive plans.', bias: 'Absence of Evidence / Mirror Imaging', biasId: 'absence', explanation: 'Absence of observed activity is not evidence of intent to stand down. The analyst is projecting their own decision-making framework onto the adversary ("if I hadn\'t moved forces for three weeks, I would have given up"). The adversary may be in an operational pause, deception posture, or waiting for conditions to change.', debiased: 'No significant force movements have been detected in three weeks. We assess this could indicate (a) a deliberate operational pause while logistics are reconstituted, (b) a shift to a deception posture, or (c) a genuine de-escalation. Continued SIGINT monitoring of command traffic and GEOINT of supply depots would help discriminate between these hypotheses.' },
            { id: 'd3', judgment: 'Our original assessment that this program was peaceful was reinforced by last month\'s inspection visit, which found no violations. We maintain our assessment with increased confidence.', bias: 'Anchoring / Confirmation Bias', biasId: 'anchoring', explanation: 'The analyst is anchored to the initial assessment and treating confirmatory evidence (no violations found) as more diagnostic than it is. Inspections have known limitations (declared sites only, advance notice). The absence of violations at inspected sites does not confirm the absence of undeclared activities elsewhere.', debiased: 'The latest inspection visit found no violations at declared sites, which is consistent with our baseline assessment but is not independently diagnostic. Inspection coverage remains limited to declared facilities with advance notice. We maintain our assessment at the same confidence level as before, noting that the inspection neither confirmed nor disconfirmed the possibility of undeclared activities at other locations.' },
            { id: 'd4', judgment: 'Sources unanimously report that the leadership is unified and committed to the current strategy. We assess with high confidence there are no internal divisions.', bias: 'Source Groupthink / Availability Bias', biasId: 'groupthink', explanation: 'When all sources report the same thing, it could indicate either (a) reality or (b) all sources have access to the same information tier and are reflecting the leadership\'s curated narrative. Unanimous reporting should increase suspicion, not confidence, especially in authoritarian regimes where dissent is hidden.', debiased: 'All current sources report leadership unity, but we note that our source access is concentrated among officials who interact with the leadership\'s public-facing activities. We assess with moderate confidence that the leadership presents as unified. However, internal divisions in authoritarian systems are typically invisible until they manifest as action. We lack penetration of inner-circle deliberations that would enable higher confidence.' },
            { id: 'd5', judgment: 'This operation closely matches the playbook used by Group X in their 2019 campaign. We assess with high confidence that Group X is responsible.', bias: 'Pattern Matching / Fundamental Attribution Error', biasId: 'patternmatch', explanation: 'TTP similarity alone is insufficient for high-confidence attribution. TTPs can be copied, shared, or sold between groups (false flag operations). The analyst is over-attributing based on pattern match without considering alternative explanations: a copycat, a shared toolkit vendor, or deliberate deception.', debiased: 'The observed TTPs are consistent with Group X\'s documented playbook from 2019. However, we note that Group X\'s tools were partially leaked in 2020, and at least two other groups have been observed using similar techniques. We assess with moderate confidence that Group X is a likely responsible party, but cannot exclude a false-flag or shared-tooling scenario without additional corroborating evidence from non-TTP indicators (infrastructure, timing, strategic intent).' },
          ];

          var BIAS_OPTIONS = ['Anchoring', 'Confirmation Bias', 'Representativeness / Base Rate Neglect', 'Absence of Evidence / Mirror Imaging', 'Source Groupthink / Availability Bias', 'Pattern Matching / Fundamental Attribution Error', 'Hindsight Bias', 'Bandwagon Effect'];
          var item = DEBIASING_ITEMS[debiasingStep];
          var isRevealed = debiasingRevealed[item.id];
          var userBiasChoice = debiasingIds[item.id];
          var userDebiasedText = debiasingTexts[item.id] || '';
          var biasCorrect = userBiasChoice === item.bias;

          return (
            <div>
              <div style={{ padding: 16, background: C.card, border: `1px solid ${C.cardBd}`, borderLeft: `3px solid ${C.amber}`, marginBottom: 16, borderRadius: 6 }}>
                <p style={{ fontFamily: PS_MONO, fontSize: 10, color: C.amber, letterSpacing: '.12em', marginBottom: 8 }}>COGNITIVE DEBIASING WORKSHOP</p>
                <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.7, marginBottom: 16 }}>
                  Each analytic judgment below contains an embedded cognitive bias. Your task: (1) identify the specific bias from the dropdown, and (2) write a debiased version of the judgment. Then compare your work to the expert assessment and model debiased text.
                </p>

                {/* Step navigation */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {DEBIASING_ITEMS.map(function(d, di) {
                    var done = debiasingRevealed[d.id];
                    return (
                      <button key={d.id} onClick={function() { setDebiasingStep(di); }}
                        style={{
                          padding: '6px 12px', fontFamily: PS_MONO, fontSize: 10, cursor: 'pointer',
                          background: debiasingStep === di ? C.amberBg : done ? C.greenBg : 'transparent',
                          border: `1px solid ${debiasingStep === di ? C.amber : done ? C.green : C.line}`,
                          color: debiasingStep === di ? C.amber : done ? C.green : C.tx3, borderRadius: 3,
                        }}>
                        {di + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Judgment card */}
                <div style={{ padding: 14, background: 'rgba(0,0,0,.2)', border: `1px solid ${C.line}`, borderRadius: 3, marginBottom: 16 }}>
                  <div style={{ fontFamily: PS_MONO, fontSize: 9, color: C.tx3, marginBottom: 6 }}>ANALYTIC JUDGMENT {debiasingStep + 1} OF {DEBIASING_ITEMS.length}</div>
                  <p style={{ fontSize: 14, color: C.tx, lineHeight: 1.7, fontStyle: 'italic' }}>"{item.judgment}"</p>
                </div>

                {/* Step 1: Identify bias */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: PS_MONO, fontSize: 10, color: C.purple, marginBottom: 6 }}>STEP 1: IDENTIFY THE BIAS</div>
                  <select value={userBiasChoice || ''} disabled={isRevealed}
                    onChange={function(e) { setDebiasingIds(function(prev) { var c = Object.assign({}, prev); c[item.id] = e.target.value; return c; }); }}
                    style={{ width: '100%', padding: '8px 10px', fontFamily: PS_MONO, fontSize: 12, background: C.card, color: C.tx, border: `1px solid ${C.line}`, borderRadius: 3 }}>
                    <option value="">-- Select a cognitive bias --</option>
                    {BIAS_OPTIONS.map(function(b) { return React.createElement('option', { key: b, value: b }, b); })}
                  </select>
                </div>

                {/* Step 2: Write debiased version */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: PS_MONO, fontSize: 10, color: C.purple, marginBottom: 6 }}>STEP 2: WRITE A DEBIASED VERSION</div>
                  <textarea value={userDebiasedText} disabled={isRevealed} placeholder="Write a debiased version of this judgment that addresses the identified bias..."
                    onChange={function(e) { setDebiasingTexts(function(prev) { var c = Object.assign({}, prev); c[item.id] = e.target.value; return c; }); }}
                    style={{ width: '100%', minHeight: 80, padding: 10, fontFamily: PS_MONO, fontSize: 11, background: C.card, color: C.tx, border: `1px solid ${C.line}`, borderRadius: 3, resize: 'vertical', lineHeight: 1.6 }}
                  />
                </div>

                {/* Reveal button */}
                {!isRevealed && (
                  <button onClick={function() { setDebiasingRevealed(function(prev) { var c = Object.assign({}, prev); c[item.id] = true; return c; }); }}
                    disabled={!userBiasChoice}
                    style={{
                      padding: '8px 20px', fontFamily: PS_MONO, fontSize: 11, cursor: userBiasChoice ? 'pointer' : 'not-allowed',
                      background: userBiasChoice ? C.purpleBg : 'transparent', border: `1px solid ${userBiasChoice ? C.purple : C.line}`,
                      color: userBiasChoice ? C.purple : C.tx3, borderRadius: 3,
                    }}>
                    Reveal Expert Assessment
                  </button>
                )}

                {/* Expert assessment reveal */}
                {isRevealed && (
                  <div style={{ marginTop: 12, padding: 14, background: 'rgba(0,0,0,.2)', border: `1px solid ${C.line}`, borderRadius: 3 }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontFamily: PS_MONO, fontSize: 10, color: biasCorrect ? C.green : C.red, marginBottom: 4 }}>
                        BIAS IDENTIFICATION: {biasCorrect ? 'CORRECT' : 'INCORRECT'}
                      </div>
                      <div style={{ fontSize: 12, color: C.tx, marginBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>Actual bias: </span>{item.bias}
                      </div>
                      <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6 }}>{item.explanation}</p>
                    </div>

                    <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
                      <div style={{ fontFamily: PS_MONO, fontSize: 10, color: C.amber, marginBottom: 6 }}>MODEL DEBIASED VERSION</div>
                      <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.7, fontStyle: 'italic', padding: 10, background: C.amberBg, borderRadius: 3, border: `1px solid ${C.amber}30` }}>"{item.debiased}"</p>
                    </div>

                    <div style={{ marginTop: 12, padding: 10, background: C.purpleBg, borderRadius: 3, border: `1px solid ${C.purple}30` }}>
                      <div style={{ fontFamily: PS_MONO, fontSize: 9, color: C.purple, marginBottom: 4 }}>DEBIASING QUALITY RUBRIC</div>
                      <div style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6 }}>
                        {userDebiasedText.length > 100 && userDebiasedText.toLowerCase().indexOf('confidence') >= 0 ? 'Your debiased version includes calibrated confidence language -- a key indicator of analytic rigor.' : userDebiasedText.length > 50 ? 'Your response addresses the judgment but could benefit from explicit confidence calibration and alternative hypothesis consideration.' : 'Consider providing a more detailed debiased version that includes confidence levels, alternative explanations, and explicit acknowledgment of analytic limitations.'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
