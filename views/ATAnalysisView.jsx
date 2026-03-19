// ATAnalysisView.jsx — Multi-Method Convergence Board
// Analytical Tradecraft (MPAI Selected Work)
//
// The visitor is an all-source analyst applying 4 analytical methods
// to the same intelligence problem: Spatial Analysis, Network Analysis,
// Thematic Coding, and Structured Decision Support. Each method reveals
// different aspects of "The Meridian Network" — a suspected transnational
// smuggling ring. The convergence tab fuses all 4 results.

// ── Palette: Analyst's evidence wall — dark slate with pinboard warmth ─────
const AT_C = {
  bg: '#0a0c12',
  card: 'rgba(22,20,18,.92)',
  cardBd: 'rgba(160,130,90,.14)',
  tx: '#d0ccc4',
  tx2: '#9a9488',
  tx3: '#68604e',
  copper: '#c4885a',
  copperDm: '#a06a40',
  copperBg: 'rgba(196,136,90,.08)',
  teal: '#4a9a98',
  tealDm: '#38807e',
  tealBg: 'rgba(74,154,152,.07)',
  red: '#c05040',
  redDm: '#8a3a3a',
  redBg: 'rgba(176,80,80,.06)',
  green: '#5a9a6a',
  greenDm: '#448055',
  greenBg: 'rgba(90,154,106,.06)',
  amber: '#c4a040',
  amberDm: '#9a7e30',
  amberBg: 'rgba(196,160,64,.06)',
  blue: '#5878b0',
  blueDm: '#446898',
  blueBg: 'rgba(88,120,176,.06)',
  purple: '#8a68b0',
  purpleDm: '#704a98',
  purpleBg: 'rgba(138,104,176,.06)',
  line: 'rgba(160,130,90,.10)',
  cork: '#1a1610',
  manila: 'rgba(200,180,140,.08)',
  pin: '#c03028',
};

// ── Pushpin SVG decoration ─────────────────────────────────────────
const PushpinSVG = () => React.createElement('svg', { width: 14, height: 18, viewBox: '0 0 14 18', style: { position: 'absolute', top: -6, left: 12, zIndex: 2, filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,.5))' } },
  React.createElement('circle', { cx: 7, cy: 5, r: 5, fill: AT_C.pin, stroke: '#901818', strokeWidth: 1 }),
  React.createElement('circle', { cx: 7, cy: 5, r: 2, fill: '#ff6050', opacity: 0.5 }),
  React.createElement('line', { x1: 7, y1: 10, x2: 7, y2: 17, stroke: '#888', strokeWidth: 1.2 })
);

// ── Cork texture background CSS (inline SVG data URI) ─────────────
const CORK_BG = 'radial-gradient(ellipse at 20% 50%, rgba(40,32,20,.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(40,32,20,.2) 0%, transparent 40%), radial-gradient(ellipse at 50% 80%, rgba(40,32,20,.25) 0%, transparent 45%)';
const GRID_OVERLAY = 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(160,130,90,.04) 39px, rgba(160,130,90,.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(160,130,90,.04) 39px, rgba(160,130,90,.04) 40px)';
const AT_Mono = "'IBM Plex Mono',monospace";
const AT_Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const AT_Sans = "'Inter',Helvetica,sans-serif";

// ── Skills tags ──────────────────────────────────────────────────
const AT_SKILLS = [
  'Geospatial Analysis (ArcGIS/QGIS)',
  'Social Network Analysis (SNA)',
  'Qualitative Thematic Coding',
  'Multi-Criteria Decision Analysis',
  'Multi-INT Fusion',
  'Structured Analytic Techniques',
  'ICD-203 Analytic Standards',
  'Convergence Assessment',
];

// ── Provenance ───────────────────────────────────────────────────
const AT_PROVENANCE = [
  { short: 'Heuer & Pherson (2015)', full: 'Structured Analytic Techniques for Intelligence Analysis, 3rd ed.' },
  { short: 'Clark (2020)', full: 'Intelligence Analysis: A Target-Centric Approach, 6th ed.' },
  { short: 'ODNI ICD-203', full: 'Analytic Standards (IC Directive 203)' },
  { short: 'Wasserman & Faust', full: 'Social Network Analysis: Methods and Applications' },
  { short: 'Strauss & Corbin', full: 'Basics of Qualitative Research: Grounded Theory Procedures and Techniques' },
];

// ── Tab definitions ──────────────────────────────────────────────
const AT_TABS = [
  { id: 'spatial', num: '1', title: 'Spatial Analysis', icon: '\u25C9', color: AT_C.green },
  { id: 'network', num: '2', title: 'Network Analysis', icon: '\u25CE', color: AT_C.blue },
  { id: 'thematic', num: '3', title: 'Thematic Coding', icon: '\u25A3', color: AT_C.purple },
  { id: 'decision', num: '4', title: 'Decision Support', icon: '\u25C7', color: AT_C.amber },
  { id: 'convergence', num: '\u03A3', title: 'Convergence', icon: '\u2A4E', color: AT_C.copper },
  { id: 'linchpin', num: 'L', title: 'Linchpin Analysis', icon: '\u2693', color: AT_C.red },
  { id: 'sat_lab', num: 'S', title: 'SAT Selection', icon: '\u2694', color: AT_C.teal },
];

// ── Scenario: The Meridian Network ───────────────────────────────
const SCENARIO = {
  codename: 'MERIDIAN NETWORK',
  classification: 'SECRET // NOFORN // REL TO FVEY',
  summary: 'A suspected transnational smuggling operation spanning three countries (Aldoria, Brevenia, Corath) has been identified through a combination of customs intercepts, SIGINT, and HUMINT source reporting. 47 incidents over 18 months suggest an organized network using commercial shipping, overland corridors, and a layered financial architecture.',
  stats: { incidents: 47, persons: 23, comms: 15, countries: 3, months: 18 },
};

// ── Spatial Data: Incident locations & clusters ──────────────────
const SPATIAL_INCIDENTS = [
  { id: 'S01', lat: 38.2, lng: 24.8, country: 'Aldoria', type: 'intercept', date: '2024-07', desc: 'Customs seizure at Port Vasala — 4.2 tonnes undeclared cargo' },
  { id: 'S02', lat: 38.6, lng: 25.1, country: 'Aldoria', type: 'intercept', date: '2024-08', desc: 'Secondary seizure at Vasala — same shipping company (Meridian Transit LLC)' },
  { id: 'S03', lat: 37.9, lng: 24.3, country: 'Aldoria', type: 'surveillance', date: '2024-09', desc: 'Surveillance of warehouse district — vehicle pattern matches courier profile' },
  { id: 'S04', lat: 39.1, lng: 26.4, country: 'Aldoria', type: 'sigint', date: '2024-10', desc: 'SIGINT intercept: coded language referencing "the next shipment window"' },
  { id: 'S05', lat: 41.3, lng: 28.9, country: 'Brevenia', type: 'intercept', date: '2024-08', desc: 'Border checkpoint intercept — driver linked to known facilitator KARGA' },
  { id: 'S06', lat: 41.7, lng: 29.4, country: 'Brevenia', type: 'humint', date: '2024-10', desc: 'HUMINT source reports warehouse rental under front company' },
  { id: 'S07', lat: 42.0, lng: 29.1, country: 'Brevenia', type: 'financial', date: '2024-11', desc: 'Suspicious wire transfers from Brevenia National Bank to Corath accounts' },
  { id: 'S08', lat: 41.5, lng: 28.6, country: 'Brevenia', type: 'surveillance', date: '2024-12', desc: 'Overland truck convoy observed — 3 vehicles, night movement pattern' },
  { id: 'S09', lat: 36.8, lng: 30.2, country: 'Corath', type: 'sigint', date: '2024-09', desc: 'SIGINT: phone cluster analysis reveals central node in Corath capital' },
  { id: 'S10', lat: 37.2, lng: 30.8, country: 'Corath', type: 'financial', date: '2024-11', desc: 'Shell company "Lumen Exports" registered — linked to POI NAVARRO' },
  { id: 'S11', lat: 36.5, lng: 29.8, country: 'Corath', type: 'intercept', date: '2025-01', desc: 'Port Tezara seizure — cargo manifests forged, routing through Aldoria' },
  { id: 'S12', lat: 37.0, lng: 30.5, country: 'Corath', type: 'humint', date: '2025-02', desc: 'Source confirms Corath customs official on payroll of network' },
];

const SPATIAL_CLUSTERS = [
  { name: 'Port Vasala Hub', country: 'Aldoria', incidents: ['S01','S02','S03'], risk: 'HIGH', desc: 'Primary maritime entry point. 3 incidents within 15km radius. Cluster density: 0.72 events/month.' },
  { name: 'Brevenia Corridor', country: 'Brevenia', incidents: ['S05','S06','S07','S08'], risk: 'HIGH', desc: 'Overland transit corridor connecting ports to interior. Financial and logistics nexus. 4 incidents in 50km band.' },
  { name: 'Corath Financial Node', country: 'Corath', incidents: ['S09','S10','S12'], risk: 'MODERATE', desc: 'Command-and-control center with financial architecture. Lower physical activity, higher coordination role.' },
  { name: 'Tezara Port (Emerging)', country: 'Corath', incidents: ['S11'], risk: 'LOW', desc: 'Single incident suggests potential secondary route. Insufficient data for cluster confirmation.' },
];

// ── Network Data: Persons of interest & relationships ────────────
const NETWORK_NODES = [
  { id: 'N01', name: 'KARGA, Vadim', role: 'Primary Facilitator', centrality: 0.92, community: 'ops', desc: 'Hub node. Connects maritime ops (Aldoria) to overland transit (Brevenia). 14 direct links.' },
  { id: 'N02', name: 'NAVARRO, Elena', role: 'Financial Controller', centrality: 0.85, community: 'finance', desc: 'Controls Lumen Exports shell company. Manages wire transfers. Bridge between finance and ops communities.' },
  { id: 'N03', name: 'OZEN, Tarik', role: 'Logistics Coordinator', centrality: 0.78, community: 'ops', desc: 'Warehouse operations in Brevenia. Manages overland convoy scheduling. 9 direct links.' },
  { id: 'N04', name: 'PETROVA, Anya', role: 'Recruitment & Couriers', centrality: 0.71, community: 'ops', desc: 'Recruits and manages courier network. Gateway to low-level operatives.' },
  { id: 'N05', name: 'DORAN, Marcus', role: 'Corrupt Official', centrality: 0.65, community: 'enabler', desc: 'Corath customs officer. Enables port clearance. Single-point-of-failure for Corath route.' },
  { id: 'N06', name: 'SILVA, Ricardo', role: 'Maritime Captain', centrality: 0.58, community: 'ops', desc: 'Commands vessel MV Serenity. 3 of 4 intercepts involved his ship. Operational but not strategic.' },
  { id: 'N07', name: 'FENWICK, Claire', role: 'Legal Shield', centrality: 0.52, community: 'finance', desc: 'Attorney registered as director of 4 shell companies. Provides legal cover for financial flows.' },
  { id: 'N08', name: 'RASHID, Amir', role: 'Courier Lead', centrality: 0.45, community: 'ops', desc: 'Manages 5 couriers on Brevenia-Corath route. Reports to PETROVA.' },
  { id: 'N09', name: 'UNKNOWN-09', role: 'Suspected Financier', centrality: 0.88, community: 'finance', desc: 'Unidentified node. High betweenness centrality suggests a bridge between finance and an unobserved cluster. Priority collection target.' },
  { id: 'N10', name: 'VOLKOV, Gregor', role: 'Enforcer', centrality: 0.40, community: 'ops', desc: 'Security and counter-surveillance. Isolated from financial side. Connected only to KARGA and OZEN.' },
];

const NETWORK_EDGES = [
  { from: 'N01', to: 'N02', type: 'financial', weight: 5 },
  { from: 'N01', to: 'N03', type: 'operational', weight: 8 },
  { from: 'N01', to: 'N04', type: 'operational', weight: 6 },
  { from: 'N01', to: 'N06', type: 'operational', weight: 7 },
  { from: 'N01', to: 'N10', type: 'operational', weight: 4 },
  { from: 'N02', to: 'N05', type: 'financial', weight: 6 },
  { from: 'N02', to: 'N07', type: 'financial', weight: 7 },
  { from: 'N02', to: 'N09', type: 'financial', weight: 9 },
  { from: 'N03', to: 'N08', type: 'operational', weight: 5 },
  { from: 'N03', to: 'N10', type: 'operational', weight: 3 },
  { from: 'N04', to: 'N08', type: 'operational', weight: 6 },
  { from: 'N05', to: 'N09', type: 'financial', weight: 4 },
  { from: 'N09', to: 'N07', type: 'financial', weight: 5 },
];

const NETWORK_METRICS = [
  { metric: 'Degree Centrality', leader: 'KARGA (0.92)', insight: 'Most connected node — operational hub with visibility into all three countries.' },
  { metric: 'Betweenness Centrality', leader: 'UNKNOWN-09 (0.88)', insight: 'Critical bridge between finance and ops. Removing this node fragments the network into 2 disconnected clusters.' },
  { metric: 'Closeness Centrality', leader: 'NAVARRO (0.85)', insight: 'Shortest average path to all other nodes — fastest information propagation.' },
  { metric: 'Community Detection', leader: '3 communities', insight: 'Ops (6 nodes), Finance (3 nodes), Enabler (1 node). Classic cell structure with limited cross-community links.' },
];

// ── Thematic Data: Intercepted communications ────────────────────
const THEMATIC_COMMS = [
  { id: 'C01', source: 'SIGINT', date: '2024-07-14', speaker: 'KARGA', text: 'The window opens next Tuesday. Make sure the vessel is loaded before the harbor master changes shift. Our friend at the dock knows the routine.', themes: ['operational_planning', 'insider_access', 'time_pressure'] },
  { id: 'C02', source: 'SIGINT', date: '2024-08-22', speaker: 'NAVARRO', text: 'Transfer the remaining balance through Lumen. Use the standard layering — three hops minimum. The auditors are asking questions about the Brevenia account.', themes: ['financial_obfuscation', 'counter_detection', 'organizational_structure'] },
  { id: 'C03', source: 'HUMINT', date: '2024-09-10', speaker: 'Unknown (via source)', text: 'He said the Corath route is getting too hot. They want to open a fourth corridor through the eastern mountains. The old smuggler trails from the war.', themes: ['route_adaptation', 'historical_infrastructure', 'risk_awareness'] },
  { id: 'C04', source: 'SIGINT', date: '2024-10-05', speaker: 'OZEN', text: 'Three trucks, midnight departure. Same loadout as last month. Tell Rashid to keep his people quiet — one of them was seen at the checkpoint last time talking to border guards.', themes: ['operational_planning', 'operational_security', 'personnel_discipline'] },
  { id: 'C05', source: 'SIGINT', date: '2024-11-18', speaker: 'KARGA', text: 'If the captain gets stopped again, we cut him loose. There are others. The route is more important than any single person. Navarro has a replacement lined up.', themes: ['expendability', 'organizational_resilience', 'succession_planning'] },
  { id: 'C06', source: 'OSINT', date: '2024-12-02', speaker: 'FENWICK (public filing)', text: 'Lumen Exports Ltd hereby certifies that all goods transported are in compliance with applicable trade regulations and customs law of the receiving jurisdiction.', themes: ['legal_cover', 'plausible_deniability', 'document_fabrication'] },
  { id: 'C07', source: 'HUMINT', date: '2025-01-08', speaker: 'Source (re: DORAN)', text: 'The customs man is nervous. He wants more money or he walks. KARGA told Navarro to handle it — "keep him happy or find his replacement."', themes: ['corruption', 'coercion', 'insider_access', 'vulnerability'] },
  { id: 'C08', source: 'SIGINT', date: '2025-02-14', speaker: 'UNKNOWN-09', text: 'The investment returns have been satisfactory. I expect the next quarter to show similar growth. Keep the pipeline steady.', themes: ['euphemism', 'financial_obfuscation', 'leadership_direction'] },
];

const THEMATIC_CODES = [
  { code: 'operational_planning', label: 'Operational Planning', color: AT_C.blue, count: 3, desc: 'Specific logistical coordination: timing, routes, assets.' },
  { code: 'financial_obfuscation', label: 'Financial Obfuscation', color: AT_C.amber, count: 2, desc: 'Money laundering, layering, shell companies.' },
  { code: 'insider_access', label: 'Insider Access', color: AT_C.red, count: 2, desc: 'Corruption of officials or use of insider knowledge.' },
  { code: 'operational_security', label: 'Operational Security', color: AT_C.teal, count: 2, desc: 'Counter-surveillance, discipline, compartmentalization.' },
  { code: 'organizational_resilience', label: 'Organizational Resilience', color: AT_C.green, count: 2, desc: 'Redundancy, succession planning, route adaptation.' },
  { code: 'counter_detection', label: 'Counter-Detection', color: AT_C.purple, count: 1, desc: 'Awareness of law enforcement activity and adaptation.' },
  { code: 'leadership_direction', label: 'Leadership Direction', color: AT_C.copper, count: 1, desc: 'Top-down strategic guidance from senior figures.' },
  { code: 'coercion', label: 'Coercion / Leverage', color: AT_C.redDm, count: 1, desc: 'Threats or pressure to maintain compliance.' },
];

// ── Decision Data: Courses of action ─────────────────────────────
const DECISION_CRITERIA = [
  { id: 'disruption', label: 'Network Disruption', desc: 'How effectively does this COA dismantle the network?', weight: 30 },
  { id: 'intelligence', label: 'Intelligence Gain', desc: 'Does this COA generate further collection opportunities?', weight: 25 },
  { id: 'risk', label: 'Operational Risk', desc: 'Risk to sources, methods, and personnel (lower is better).', weight: 20 },
  { id: 'diplomatic', label: 'Diplomatic Impact', desc: 'Effect on relationships with host nations.', weight: 15 },
  { id: 'timeline', label: 'Timeline to Effect', desc: 'How quickly does the COA produce results?', weight: 10 },
];

const DECISION_COAS = [
  { id: 'COA1', title: 'Targeted Arrests', desc: 'Simultaneous arrest of KARGA, NAVARRO, and OZEN in coordinated multinational operation.',
    scores: { disruption: 9, intelligence: 3, risk: 6, diplomatic: 5, timeline: 8 },
    pros: ['Immediate network decapitation', 'High public visibility deters copycats', 'Evidence preservation through raids'],
    cons: ['Burns all active collection', 'UNKNOWN-09 remains unidentified and free', 'Requires host-nation cooperation (uncertain)'],
  },
  { id: 'COA2', title: 'Sustained Collection', desc: 'Continue monitoring to identify UNKNOWN-09 and map full network extent before any overt action.',
    scores: { disruption: 4, intelligence: 9, risk: 3, diplomatic: 8, timeline: 2 },
    pros: ['Identifies UNKNOWN-09 financier', 'Maps complete network topology', 'Preserves diplomatic relationships'],
    cons: ['Network continues operating — moral hazard', 'Risk of source compromise over time', 'Political pressure for visible action'],
  },
  { id: 'COA3', title: 'Hybrid: Disrupt & Collect', desc: 'Arrest peripheral nodes (SILVA, RASHID, DORAN) to disrupt operations while continuing collection on leadership.',
    scores: { disruption: 7, intelligence: 7, risk: 5, diplomatic: 6, timeline: 6 },
    pros: ['Disrupts logistics without burning top sources', 'Forces leadership to communicate (collection opportunity)', 'Demonstrates action while preserving core access'],
    cons: ['Leadership may go to ground', 'Partial disruption may accelerate route adaptation', 'Requires precise operational timing'],
  },
];

// ── Convergence synthesis ────────────────────────────────────────
const CONVERGENCE_FINDINGS = [
  { method: 'Spatial', finding: 'Port Vasala is the primary entry point; Brevenia Corridor is the critical transit route. Corath serves as C2/finance center.', confidence: 'HIGH', color: AT_C.green },
  { method: 'Network', finding: 'KARGA is the operational hub. UNKNOWN-09 is a high-priority collection gap. Network has classic cell structure with financial/ops separation.', confidence: 'HIGH', color: AT_C.blue },
  { method: 'Thematic', finding: 'Network demonstrates organizational resilience and succession planning. DORAN is a vulnerability. Leadership uses euphemistic tradecraft.', confidence: 'MODERATE', color: AT_C.purple },
  { method: 'Decision', finding: 'COA3 (Hybrid) optimizes across all criteria. COA1 sacrifices intelligence gain; COA2 sacrifices disruption timeline.', confidence: 'MODERATE', color: AT_C.amber },
];

const CONVERGENCE_AGREEMENTS = [
  { point: 'KARGA is the network\'s center of gravity', methods: ['Spatial', 'Network', 'Thematic'], strength: 'STRONG', desc: 'Spatial links KARGA to all three geographic clusters. Network analysis confirms highest degree centrality. Thematic coding shows KARGA issuing operational directives across all domains.' },
  { point: 'UNKNOWN-09 is a priority intelligence gap', methods: ['Network', 'Thematic', 'Decision'], strength: 'STRONG', desc: 'Network analysis identifies as critical bridge node. Thematic analysis reveals leadership-level directive language. Decision analysis: COA1 fails if UNKNOWN-09 escapes.' },
  { point: 'DORAN is the network\'s most exploitable vulnerability', methods: ['Thematic', 'Network', 'Decision'], strength: 'MODERATE', desc: 'Thematic coding reveals nervousness and leverage potential. Network: single-point-of-failure for Corath route. Decision: arrest of DORAN in COA3 disrupts without burning sources.' },
  { point: 'The Brevenia Corridor is operationally critical', methods: ['Spatial', 'Thematic'], strength: 'MODERATE', desc: 'Spatial cluster density highest in corridor. Thematic: multiple communications reference overland logistics and night movement patterns.' },
];

const CONVERGENCE_DIVERGENCES = [
  { point: 'Timing of action', methods: { 'Spatial': 'Act now — cluster density suggests acceleration', 'Network': 'Wait — UNKNOWN-09 identification is critical', 'Decision': 'Hybrid approach resolves the timing tension' }, desc: 'Spatial urgency conflicts with network collection patience. The decision matrix favors a phased approach.' },
  { point: 'Priority target', methods: { 'Spatial': 'Port Vasala (geographic chokepoint)', 'Network': 'UNKNOWN-09 (structural bridge)', 'Thematic': 'DORAN (exploitable vulnerability)' }, desc: 'Each method identifies a different priority based on its analytical lens. Convergence requires weighting all three.' },
];

// ── Scholarly micro-content ──────────────────────────────────────
const AT_TIPS = {
  convergence: "Methodological triangulation -- using multiple independent methods to study the same phenomenon -- was formalized by Denzin (1970) and remains the gold standard for analytical confidence. The key word is 'independent': if your HUMINT source and your SIGINT intercept trace back to the same original informant, you have one source dressed up as two. The IC's post-Iraq WMD review found that multiple 'independent' reports about mobile bioweapons labs all traced to a single fabricator (codenamed CURVEBALL). Convergence only increases confidence when the methods have uncorrelated failure modes -- spatial analysis fails differently than network analysis fails differently than thematic coding.",
  network_analysis: "Valdis Krebs published his analysis of the 9/11 hijacker network in 2002 using publicly available information, demonstrating that Mohammed Atta's centrality was visible in the network structure. Krebs showed that standard SNA metrics -- betweenness centrality, closeness, degree -- could identify key nodes in covert networks. But the analysis also revealed SNA's limits: covert networks deliberately minimize connections (low density), use cutouts to reduce centrality of leaders, and compartmentalize to prevent compromise from propagating. A network that looks 'disorganized' by SNA metrics may be operationally optimal for clandestinity. The absence of connections is itself information -- but only if you know what the complete network should look like.",
  spatial_analysis: "John Snow's 1854 cholera map is the founding document of geospatial intelligence. Snow plotted cholera deaths in Soho on a street map and identified their clustering around the Broad Street pump -- contradicting the prevailing miasma theory of disease. What makes Snow's analysis exemplary is not the visualization but the analytical reasoning: he used the spatial pattern to test competing hypotheses (waterborne vs. airborne transmission) and identified a critical negative case (a brewery whose workers drank beer, not water, and had no cholera cases). The pump handle was removed on September 8, 1854. Modern GEOINT applies the same logic at continental scale, but the inferential challenge remains: spatial correlation is not causation, and clusters can have multiple generating mechanisms.",
  thematic_coding: "Barney Glaser and Anselm Strauss developed grounded theory in 1967 as a reaction against hypothetico-deductive social science. Instead of starting with a theory and testing it, grounded theory starts with data and lets patterns emerge through iterative coding -- open coding (labeling phenomena), axial coding (relating categories), and selective coding (integrating around a core category). The method was revolutionary but controversial: critics argue that 'theory-free' observation is impossible because the researcher's prior knowledge inevitably shapes what they notice. In intelligence analysis, the grounded theory approach maps to the 'hypothesis generation' phase -- the moment before structured analysis, when the analyst must decide what explanations are even worth considering.",
};

// ════════════════════════════════════════════════════════════════
// Component
// ════════════════════════════════════════════════════════════════
function ATAnalysisView({ setView }) {
  const [activeTab, setActiveTab] = useState('spatial');
  const [tipId, setTipId] = useState(null);
  const [spatialSelectedCluster, setSpatialSelectedCluster] = useState(null);
  const [spatialHotspotView, setSpatialHotspotView] = useState(false);
  const [networkSelectedNode, setNetworkSelectedNode] = useState(null);
  const [networkHighlightCommunity, setNetworkHighlightCommunity] = useState(null);
  const [thematicSelectedComm, setThematicSelectedComm] = useState(null);
  const [thematicActiveCode, setThematicActiveCode] = useState(null);
  const [decisionWeights, setDecisionWeights] = useState(
    Object.fromEntries(DECISION_CRITERIA.map(c => [c.id, c.weight]))
  );
  const [decisionSelectedCOA, setDecisionSelectedCOA] = useState(null);
  const [methodComplete, setMethodComplete] = useState({ spatial: false, network: false, thematic: false, decision: false });
  const [convergenceRevealed, setConvergenceRevealed] = useState(false);
  const [linchpinAssumptions, setLinchpinAssumptions] = useState({});
  const [linchpinRevealed, setLinchpinRevealed] = useState(false);
  const [satLabIdx, setSatLabIdx] = useState(0);
  const [satLabAnswers, setSatLabAnswers] = useState({});
  const [satLabRevealed, setSatLabRevealed] = useState({});

  const C = AT_C;

  // ── Scholarly tooltip renderer & icons ─────────────────────────
  const TipBox = (key) => {
    if (tipId !== key) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(10,13,17,.94)', border: '1px solid rgba(196,136,90,.15)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(205,212,216,.65)', lineHeight: 1.65, margin: '6px 0 10px' }}>
        {AT_TIPS[key]}
      </div>
    );
  };

  const ConvergenceIcon = (
    <svg width={24} height={20} viewBox="0 0 24 20" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'convergence' ? null : 'convergence')}>
      <line x1={2} y1={4} x2={12} y2={12} stroke="currentColor" strokeWidth=".8" />
      <line x1={22} y1={4} x2={12} y2={12} stroke="currentColor" strokeWidth=".8" />
      <line x1={12} y1={18} x2={12} y2={12} stroke="currentColor" strokeWidth=".8" />
      <circle cx={12} cy={12} r={2.5} fill="none" stroke="currentColor" strokeWidth=".6" />
      <circle cx={12} cy={12} r={1} fill="currentColor" fillOpacity=".3" />
    </svg>
  );

  const NetworkIcon = (
    <svg width={22} height={22} viewBox="0 0 22 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'network_analysis' ? null : 'network_analysis')}>
      <circle cx={11} cy={5} r={2.5} fill="none" stroke="currentColor" strokeWidth=".7" />
      <circle cx={5} cy={17} r={2.5} fill="none" stroke="currentColor" strokeWidth=".7" />
      <circle cx={17} cy={17} r={2.5} fill="none" stroke="currentColor" strokeWidth=".7" />
      <line x1={11} y1={7.5} x2={5} y2={14.5} stroke="currentColor" strokeWidth=".5" />
      <line x1={11} y1={7.5} x2={17} y2={14.5} stroke="currentColor" strokeWidth=".5" />
      <line x1={7.5} y1={17} x2={14.5} y2={17} stroke="currentColor" strokeWidth=".5" />
    </svg>
  );

  const SpatialIcon = (
    <svg width={22} height={22} viewBox="0 0 22 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'spatial_analysis' ? null : 'spatial_analysis')}>
      <circle cx={11} cy={9} r={7} fill="none" stroke="currentColor" strokeWidth=".8" />
      <circle cx={9} cy={8} r={1.2} fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth=".4" />
      <circle cx={13} cy={7} r={1.2} fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth=".4" />
      <circle cx={11} cy={11} r={1.2} fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth=".4" />
      <line x1={11} y1={16} x2={11} y2={20} stroke="currentColor" strokeWidth=".6" />
      <line x1={9} y1={20} x2={13} y2={20} stroke="currentColor" strokeWidth=".6" />
    </svg>
  );

  const CodingIcon = (
    <svg width={20} height={22} viewBox="0 0 20 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'thematic_coding' ? null : 'thematic_coding')}>
      <rect x={2} y={2} width={16} height={18} rx={2} fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={5} y1={7} x2={10} y2={7} stroke="currentColor" strokeWidth=".5" />
      <line x1={12} y1={7} x2={15} y2={7} stroke="currentColor" strokeWidth="1.2" opacity=".3" />
      <line x1={5} y1={11} x2={8} y2={11} stroke="currentColor" strokeWidth=".5" />
      <line x1={10} y1={11} x2={15} y2={11} stroke="currentColor" strokeWidth="1.2" opacity=".3" />
      <line x1={5} y1={15} x2={12} y2={15} stroke="currentColor" strokeWidth=".5" />
      <line x1={14} y1={15} x2={15} y2={15} stroke="currentColor" strokeWidth="1.2" opacity=".3" />
    </svg>
  );

  // ── Network node positions (must be at component level, not inside renderNetwork) ──
  const nodePositions = useMemo(() => {
    const positions = {};
    const communityOffsets = { ops: { cx: 30, cy: 45 }, finance: { cx: 70, cy: 35 }, enabler: { cx: 70, cy: 70 } };
    NETWORK_NODES.forEach((n, i) => {
      const offset = communityOffsets[n.community] || { cx: 50, cy: 50 };
      const angle = (i * 2.4) + (n.community === 'ops' ? 0 : n.community === 'finance' ? 2 : 4);
      const radius = 12 + (1 - n.centrality) * 15;
      positions[n.id] = {
        x: offset.cx + Math.cos(angle) * radius,
        y: offset.cy + Math.sin(angle) * radius,
      };
    });
    return positions;
  }, []);

  // ── Weighted score computation ───────────────────────────────
  const weightedScores = useMemo(() => {
    const totalWeight = Object.values(decisionWeights).reduce((s, w) => s + w, 0);
    if (totalWeight === 0) return DECISION_COAS.map(c => ({ id: c.id, score: 0 }));
    return DECISION_COAS.map(coa => {
      let score = 0;
      for (const cr of DECISION_CRITERIA) {
        const normalized = (decisionWeights[cr.id] || 0) / totalWeight;
        score += normalized * (coa.scores[cr.id] || 0);
      }
      return { id: coa.id, score: Math.round(score * 100) / 100 };
    });
  }, [decisionWeights]);

  const bestCOA = useMemo(() => {
    let best = weightedScores[0];
    for (let i = 1; i < weightedScores.length; i++) {
      if (weightedScores[i].score > best.score) best = weightedScores[i];
    }
    return best;
  }, [weightedScores]);

  const completionCount = useMemo(() => {
    return Object.values(methodComplete).filter(Boolean).length;
  }, [methodComplete]);

  // ── Mark method complete helper ──────────────────────────────
  const markComplete = useCallback((method) => {
    setMethodComplete(prev => ({ ...prev, [method]: true }));
  }, []);

  // ── Adjust decision weight ───────────────────────────────────
  const adjustWeight = useCallback((criterionId, delta) => {
    setDecisionWeights(prev => {
      const current = prev[criterionId] || 0;
      const next = Math.max(0, Math.min(100, current + delta));
      return { ...prev, [criterionId]: next };
    });
  }, []);

  // ── Tab color helper ─────────────────────────────────────────
  const tabColor = useCallback((tabId) => {
    const tab = AT_TABS.find(t => t.id === tabId);
    return tab ? tab.color : C.tx3;
  }, []);

  // ── Render: Top bar ──────────────────────────────────────────
  const TopBar = () => (
    React.createElement('div', {
      style: { position: 'sticky', top: 0, zIndex: 100, background: C.bg + 'ee', backdropFilter: 'blur(12px)', borderBottom: '1px solid ' + C.line, padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    },
      React.createElement('button', {
        onClick: () => setView('coursework'),
        style: { background: 'none', border: 'none', color: C.tx3, fontFamily: AT_Mono, fontSize: 11, cursor: 'pointer' }
      }, '\← Back to Coursework'),
      React.createElement('span', {
        style: { fontFamily: AT_Mono, fontSize: 12, color: C.copperDm }
      }, SCENARIO.classification)
    )
  );

  // ── Render: Tab navigation ───────────────────────────────────
  const TabNav = () => (
    React.createElement('div', {
      style: { display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid ' + C.line, paddingBottom: 12, flexWrap: 'wrap' }
    },
      AT_TABS.map(tab => {
        const isActive = activeTab === tab.id;
        const isComplete = tab.id !== 'convergence' && methodComplete[tab.id];
        const isLocked = tab.id === 'convergence' && completionCount < 4;
        return React.createElement('button', {
          key: tab.id,
          onClick: () => { if (!isLocked) setActiveTab(tab.id); },
          style: {
            padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6,
            background: isActive ? tab.color + '12' : 'transparent',
            border: isActive ? '1px solid ' + tab.color + '40' : '1px solid transparent',
            borderRadius: 4, cursor: isLocked ? 'not-allowed' : 'pointer',
            opacity: isLocked ? 0.35 : 1,
            color: isActive ? tab.color : isComplete ? C.green : C.tx3,
            fontFamily: AT_Mono, fontSize: 12, fontWeight: isActive ? 600 : 400,
          }
        },
          React.createElement('span', { style: { fontSize: 12 } }, tab.icon),
          tab.num + '. ' + tab.title,
          isComplete && React.createElement('span', { style: { color: C.green, fontSize: 12, marginLeft: 2 } }, '\✓')
        );
      })
    )
  );

  // ── Section heading helper ───────────────────────────────────
  const SectionHeading = ({ title, subtitle, color }) => (
    React.createElement('div', { style: { marginBottom: 20, position: 'relative' } },
      // Manila folder tab
      React.createElement('div', { style: { display: 'inline-block', background: 'rgba(200,180,140,.12)', border: '1px solid rgba(200,180,140,.18)', borderBottom: 'none', borderRadius: '6px 6px 0 0', padding: '6px 18px 4px', marginBottom: 0 } },
        React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 10, color: C.copperDm, textTransform: 'uppercase', letterSpacing: '.12em' } }, 'CASE FILE')
      ),
      React.createElement('div', { style: { background: 'rgba(200,180,140,.06)', border: '1px solid rgba(200,180,140,.12)', borderRadius: '0 6px 6px 6px', padding: '12px 16px' } },
        React.createElement('h2', {
          style: { fontFamily: AT_Serif, fontSize: 22, fontWeight: 600, color: C.tx, marginBottom: 4, borderBottom: '2px solid ' + C.copper + '30', paddingBottom: 6 }
        }, title),
        subtitle && React.createElement('p', {
          style: { fontSize: 12, color: C.tx2, lineHeight: 1.65, maxWidth: '60ch', marginTop: 8 }
        }, subtitle)
      )
    )
  );

  // ══════════════════════════════════════════════════════════════
  // TAB 1: SPATIAL ANALYSIS
  // ══════════════════════════════════════════════════════════════
  const renderSpatial = () => {
    const typeColors = { intercept: C.red, sigint: C.blue, humint: C.green, surveillance: C.amber, financial: C.purple, osint: C.teal };
    const countryPositions = { 'Aldoria': { x: 15, y: 35 }, 'Brevenia': { x: 50, y: 20 }, 'Corath': { x: 75, y: 55 } };

    return React.createElement('div', null,
      SectionHeading({ title: 'Spatial Analysis: Geographic Pattern Detection', subtitle: 'Examine the incident map below. Identify spatial clusters, corridors, and anomalies. Toggle hot-spot view to see probability density.', color: C.green }),
      SpatialIcon,
      TipBox('spatial_analysis'),

      // Map visualization
      React.createElement('div', {
        style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 20, marginBottom: 16, position: 'relative' }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.green, textTransform: 'uppercase', letterSpacing: '.06em' } }, 'Incident Map \— 47 Events Across 3 Countries'),
          React.createElement('button', {
            onClick: () => setSpatialHotspotView(!spatialHotspotView),
            style: { padding: '4px 12px', background: spatialHotspotView ? C.greenBg : 'transparent', border: '1px solid ' + (spatialHotspotView ? C.green : C.line), borderRadius: 4, color: spatialHotspotView ? C.green : C.tx3, fontFamily: AT_Mono, fontSize: 11, cursor: 'pointer' }
          }, spatialHotspotView ? '\u25C9 Hot-Spot ON' : '\u25CB Hot-Spot OFF')
        ),

        // SVG map — satellite/recon imagery aesthetic
        React.createElement('div', { style: { position: 'relative', height: 300, background: 'linear-gradient(135deg, #0a0e14 0%, #0d1218 40%, #0e1420 100%)', borderRadius: 6, border: '1px solid rgba(80,200,80,.12)', overflow: 'hidden', boxShadow: 'inset 0 0 60px rgba(0,40,0,.15)' } },
          // Recon grid overlay
          React.createElement('div', { style: { position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(80,200,80,.03) 29px, rgba(80,200,80,.03) 30px), repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(80,200,80,.03) 29px, rgba(80,200,80,.03) 30px)', pointerEvents: 'none' } }),
          // Crosshairs in corners
          React.createElement('svg', { style: { position: 'absolute', top: 8, left: 8, opacity: 0.15 }, width: 20, height: 20 },
            React.createElement('line', { x1: 0, y1: 10, x2: 20, y2: 10, stroke: '#80c080', strokeWidth: 0.8 }),
            React.createElement('line', { x1: 10, y1: 0, x2: 10, y2: 20, stroke: '#80c080', strokeWidth: 0.8 })
          ),
          React.createElement('span', { style: { position: 'absolute', top: 6, right: 10, fontFamily: AT_Mono, fontSize: 9, color: 'rgba(80,200,80,.2)', letterSpacing: '.08em' } }, 'GEOINT // UNCLASSIFIED'),
          // Country regions
          Object.entries(countryPositions).map(([country, pos]) =>
            React.createElement('div', {
              key: country,
              style: { position: 'absolute', left: pos.x + '%', top: pos.y + '%', transform: 'translate(-50%,-50%)', textAlign: 'center' }
            },
              React.createElement('div', {
                style: { width: country === 'Brevenia' ? 140 : 120, height: country === 'Brevenia' ? 100 : 90, borderRadius: '40%', background: spatialHotspotView ? (country === 'Aldoria' ? 'rgba(176,80,80,.15)' : country === 'Brevenia' ? 'rgba(196,160,64,.12)' : 'rgba(88,120,176,.10)') : 'rgba(74,154,152,.04)', border: '1px solid ' + C.line + '40', display: 'flex', alignItems: 'center', justifyContent: 'center' }
              },
                React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.tx3, letterSpacing: '.04em' } }, country.toUpperCase())
              )
            )
          ),

          // Incident dots
          SPATIAL_INCIDENTS.map(inc => {
            const cx = countryPositions[inc.country];
            const offsetX = ((parseInt(inc.id.slice(1)) * 17) % 40) - 20;
            const offsetY = ((parseInt(inc.id.slice(1)) * 23) % 30) - 15;
            const typeColor = typeColors[inc.type] || C.tx3;
            const isInSelectedCluster = spatialSelectedCluster !== null && SPATIAL_CLUSTERS[spatialSelectedCluster].incidents.includes(inc.id);
            return React.createElement('div', {
              key: inc.id,
              title: inc.desc,
              style: {
                position: 'absolute',
                left: 'calc(' + cx.x + '% + ' + offsetX + 'px)',
                top: 'calc(' + cx.y + '% + ' + offsetY + 'px)',
                width: isInSelectedCluster ? 10 : 7,
                height: isInSelectedCluster ? 10 : 7,
                borderRadius: '50%',
                background: typeColor,
                border: isInSelectedCluster ? '2px solid #fff' : '1px solid ' + typeColor + '60',
                opacity: spatialSelectedCluster !== null && !isInSelectedCluster ? 0.25 : 0.9,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: spatialHotspotView ? '0 0 12px ' + typeColor + '60' : 'none',
              }
            });
          }),

          // Corridor line (Aldoria to Brevenia to Corath)
          React.createElement('svg', { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' } },
            React.createElement('line', { x1: '15%', y1: '35%', x2: '50%', y2: '20%', stroke: C.copper + '30', strokeWidth: 2, strokeDasharray: '6,4' }),
            React.createElement('line', { x1: '50%', y1: '20%', x2: '75%', y2: '55%', stroke: C.copper + '30', strokeWidth: 2, strokeDasharray: '6,4' })
          )
        ),

        // Legend
        React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap' } },
          Object.entries(typeColors).map(([type, color]) =>
            React.createElement('div', { key: type, style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: color } }),
              React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx3, textTransform: 'uppercase' } }, type)
            )
          )
        )
      ),

      // Cluster cards — pinned evidence items
      React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.copperDm, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.12em', borderBottom: '1px dashed ' + C.line, paddingBottom: 4 } }, 'Identified Clusters'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 } },
        SPATIAL_CLUSTERS.map((cl, i) => {
          const isSelected = spatialSelectedCluster === i;
          const riskColor = cl.risk === 'HIGH' ? C.red : cl.risk === 'MODERATE' ? C.amber : C.teal;
          const rotation = ['-0.8deg', '0.5deg', '-0.3deg', '0.7deg'][i % 4];
          return React.createElement('button', {
            key: cl.name,
            onClick: () => setSpatialSelectedCluster(isSelected ? null : i),
            style: { textAlign: 'left', padding: '18px 14px 14px', background: isSelected ? riskColor + '08' : 'rgba(30,28,22,.92)', border: '1px solid ' + (isSelected ? riskColor + '40' : 'rgba(160,130,90,.15)'), borderLeft: '3px solid ' + riskColor, borderRadius: 2, cursor: 'pointer', color: C.tx, position: 'relative', transform: 'rotate(' + rotation + ')', boxShadow: '2px 3px 8px rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.15)', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }
          },
            // Pushpin decoration
            React.createElement(PushpinSVG),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
              React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: riskColor, fontWeight: 600 } }, cl.name),
              React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, padding: '2px 6px', borderRadius: 3, background: riskColor + '15', color: riskColor } }, cl.risk)
            ),
            React.createElement('p', { style: { fontSize: 11, color: C.tx2, lineHeight: 1.65, marginBottom: 4 } }, cl.desc),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.tx3 } }, cl.incidents.length + ' incidents \· ' + cl.country)
          );
        })
      ),

      // Spatial assessment
      React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16 } },
        React.createElement('p', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.green, marginBottom: 8, textTransform: 'uppercase' } }, 'Spatial Assessment'),
        React.createElement('p', { style: { fontSize: 12, color: C.tx, lineHeight: 1.6, marginBottom: 8 } }, 'Geographic analysis reveals a tri-nodal pattern: maritime entry (Aldoria), overland transit (Brevenia), and command-and-control / financial management (Corath). Cluster density analysis confirms Port Vasala and the Brevenia Corridor as the two highest-activity zones, with a spatial-temporal correlation of 0.78 between maritime arrivals and overland departures (2-4 day lag).'),
        React.createElement('p', { style: { fontSize: 11, color: C.tx2, lineHeight: 1.65 } }, 'Hot-spot analysis (Getis-Ord Gi*) identifies Port Vasala as statistically significant at p < 0.01. The emerging Tezara Port cluster requires additional collection before assessment.'),
        !methodComplete.spatial && React.createElement('button', {
          onClick: () => markComplete('spatial'),
          style: { marginTop: 12, padding: '8px 20px', background: C.green, border: 'none', borderRadius: 4, color: '#fff', fontFamily: AT_Mono, fontSize: 12, fontWeight: 600, cursor: 'pointer' }
        }, 'Mark Spatial Analysis Complete \✓')
      )
    );
  };

  // ══════════════════════════════════════════════════════════════
  // TAB 2: NETWORK ANALYSIS
  // ══════════════════════════════════════════════════════════════
  const renderNetwork = () => {
    const communityColors = { ops: C.blue, finance: C.amber, enabler: C.red };
    const selectedNode = networkSelectedNode ? NETWORK_NODES.find(n => n.id === networkSelectedNode) : null;

    return React.createElement('div', null,
      SectionHeading({ title: 'Network Analysis: Relationship Mapping', subtitle: 'Examine the network graph of persons of interest. Click nodes to inspect. Filter by community to reveal cell structure. Identify hubs, bridges, and critical nodes.' }),
      NetworkIcon,
      TipBox('network_analysis'),

      // Network graph
      React.createElement('div', {
        style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 20, marginBottom: 16 }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 } },
          React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.blue, textTransform: 'uppercase', letterSpacing: '.06em' } }, 'Network Topology \— ' + NETWORK_NODES.length + ' Nodes, ' + NETWORK_EDGES.length + ' Edges'),
          React.createElement('div', { style: { display: 'flex', gap: 4 } },
            [{ id: null, label: 'All' }, { id: 'ops', label: 'Ops' }, { id: 'finance', label: 'Finance' }, { id: 'enabler', label: 'Enabler' }].map(f =>
              React.createElement('button', {
                key: f.id || 'all',
                onClick: () => setNetworkHighlightCommunity(f.id),
                style: { padding: '3px 8px', background: networkHighlightCommunity === f.id ? (communityColors[f.id] || C.teal) + '15' : 'transparent', border: '1px solid ' + (networkHighlightCommunity === f.id ? (communityColors[f.id] || C.teal) + '40' : C.line), borderRadius: 3, color: networkHighlightCommunity === f.id ? (communityColors[f.id] || C.teal) : C.tx3, fontFamily: AT_Mono, fontSize: 11, cursor: 'pointer' }
              }, f.label)
            )
          )
        ),

        // SVG network — evidence board with red string connections
        React.createElement('div', { style: { position: 'relative', height: 320, background: 'linear-gradient(180deg, rgba(26,22,16,1) 0%, rgba(18,16,12,1) 100%)', borderRadius: 6, border: '1px solid ' + C.line, overflow: 'hidden', boxShadow: 'inset 0 2px 20px rgba(0,0,0,.3)' } },
          // Cork texture overlay for evidence board
          React.createElement('div', { style: { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(80,60,30,.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(80,60,30,.06) 0%, transparent 40%)', pointerEvents: 'none' } }),
          // Edges — RED STRING connections (thicker, slightly curved via SVG paths)
          React.createElement('svg', { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' } },
            NETWORK_EDGES.map((e, i) => {
              const fromPos = nodePositions[e.from];
              const toPos = nodePositions[e.to];
              if (!fromPos || !toPos) return null;
              const fromNode = NETWORK_NODES.find(n => n.id === e.from);
              const toNode = NETWORK_NODES.find(n => n.id === e.to);
              const isFiltered = networkHighlightCommunity && fromNode.community !== networkHighlightCommunity && toNode.community !== networkHighlightCommunity;
              // Create slight curve via quadratic bezier
              const midX = ((fromPos.x + toPos.x) / 2) + ((i % 3 - 1) * 2);
              const midY = ((fromPos.y + toPos.y) / 2) + ((i % 2 === 0 ? -3 : 3));
              const stringColor = e.type === 'financial' ? '#c04030' : '#b83020';
              return React.createElement('path', {
                key: i,
                d: 'M ' + fromPos.x + '% ' + fromPos.y + '% Q ' + midX + '% ' + midY + '% ' + toPos.x + '% ' + toPos.y + '%',
                stroke: isFiltered ? stringColor + '10' : stringColor + '70',
                strokeWidth: Math.max(1.5, e.weight / 2.5),
                fill: 'none',
                strokeLinecap: 'round',
                style: { filter: isFiltered ? 'none' : 'drop-shadow(0 0 2px rgba(200,50,30,.2))' },
              });
            })
          ),
          // Nodes
          NETWORK_NODES.map(n => {
            const pos = nodePositions[n.id];
            if (!pos) return null;
            const isSelected = networkSelectedNode === n.id;
            const isFiltered = networkHighlightCommunity && n.community !== networkHighlightCommunity;
            const size = 8 + n.centrality * 14;
            const color = communityColors[n.community] || C.tx3;
            return React.createElement('div', {
              key: n.id,
              onClick: () => setNetworkSelectedNode(isSelected ? null : n.id),
              title: n.name + ' (' + n.role + ')',
              style: {
                position: 'absolute', left: 'calc(' + pos.x + '% - ' + size / 2 + 'px)', top: 'calc(' + pos.y + '% - ' + size / 2 + 'px)',
                width: size, height: size, borderRadius: '50%',
                background: isSelected ? color : color + '80',
                border: isSelected ? '2px solid #fff' : '1px solid ' + color + '60',
                opacity: isFiltered ? 0.15 : 1,
                cursor: 'pointer', transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 0 16px ' + color + '40' : 'none',
                zIndex: isSelected ? 10 : 1,
              }
            },
              React.createElement('span', { style: { position: 'absolute', top: size + 2, left: '50%', transform: 'translateX(-50%)', fontFamily: AT_Mono, fontSize: 10, color: isFiltered ? 'transparent' : C.tx3, whiteSpace: 'nowrap' } }, n.name.split(',')[0])
            );
          })
        ),

        // Legend
        React.createElement('div', { style: { display: 'flex', gap: 16, marginTop: 10 } },
          Object.entries(communityColors).map(([comm, color]) =>
            React.createElement('div', { key: comm, style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: color } }),
              React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx3, textTransform: 'capitalize' } }, comm)
            )
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement('div', { style: { width: 16, height: 2, background: C.amber, borderRadius: 1 } }),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx3 } }, 'Financial link')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement('div', { style: { width: 16, height: 2, background: C.blue, borderRadius: 1 } }),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx3 } }, 'Operational link')
          )
        )
      ),

      // Selected node detail
      selectedNode && React.createElement('div', {
        style: { background: C.card, border: '1px solid ' + (communityColors[selectedNode.community] || C.tx3) + '30', borderLeft: '3px solid ' + (communityColors[selectedNode.community] || C.tx3), borderRadius: 6, padding: 16, marginBottom: 16 }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
          React.createElement('span', { style: { fontFamily: AT_Serif, fontSize: 16, fontWeight: 600, color: C.tx } }, selectedNode.name),
          React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, padding: '2px 8px', borderRadius: 3, background: (communityColors[selectedNode.community] || C.tx3) + '15', color: communityColors[selectedNode.community] || C.tx3 } }, selectedNode.role)
        ),
        React.createElement('p', { style: { fontSize: 12, color: C.tx2, lineHeight: 1.65, marginBottom: 8 } }, selectedNode.desc),
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          React.createElement('div', null,
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.tx3 } }, 'CENTRALITY'),
            React.createElement('div', { style: { height: 6, width: 80, background: C.line, borderRadius: 3, marginTop: 3 } },
              React.createElement('div', { style: { height: '100%', width: (selectedNode.centrality * 100) + '%', background: communityColors[selectedNode.community] || C.tx3, borderRadius: 3 } })
            ),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.tx3 } }, (selectedNode.centrality * 100).toFixed(0) + '%')
          ),
          React.createElement('div', null,
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.tx3 } }, 'CONNECTIONS'),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 14, color: C.tx, display: 'block', marginTop: 2 } },
              NETWORK_EDGES.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).length
            )
          ),
          React.createElement('div', null,
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.tx3 } }, 'COMMUNITY'),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: communityColors[selectedNode.community] || C.tx3, display: 'block', marginTop: 2, textTransform: 'capitalize' } }, selectedNode.community)
          )
        )
      ),

      // Metrics table
      React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' } }, 'Network Metrics'),
      React.createElement('div', { style: { display: 'grid', gap: 6, marginBottom: 16 } },
        NETWORK_METRICS.map(m =>
          React.createElement('div', { key: m.metric, style: { display: 'grid', gridTemplateColumns: '180px 160px 1fr', gap: 12, padding: '8px 12px', background: C.card, borderRadius: 4, alignItems: 'center' } },
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.blue, fontWeight: 600 } }, m.metric),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx } }, m.leader),
            React.createElement('span', { style: { fontSize: 11, color: C.tx2 } }, m.insight)
          )
        )
      ),

      !methodComplete.network && React.createElement('button', {
        onClick: () => markComplete('network'),
        style: { padding: '8px 20px', background: C.blue, border: 'none', borderRadius: 4, color: '#fff', fontFamily: AT_Mono, fontSize: 12, fontWeight: 600, cursor: 'pointer' }
      }, 'Mark Network Analysis Complete \✓')
    );
  };

  // ══════════════════════════════════════════════════════════════
  // TAB 3: THEMATIC CODING
  // ══════════════════════════════════════════════════════════════
  const renderThematic = () => {
    const filteredComms = thematicActiveCode
      ? THEMATIC_COMMS.filter(c => c.themes.includes(thematicActiveCode))
      : THEMATIC_COMMS;

    return React.createElement('div', null,
      SectionHeading({ title: 'Thematic Coding: Content Analysis', subtitle: 'Examine intercepted communications. Apply thematic codes to identify patterns in language, intent, and organizational behavior. Click a code to filter communications.' }),
      CodingIcon,
      TipBox('thematic_coding'),

      // Code palette
      React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' } }, 'Thematic Code Palette'),
      React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 } },
        React.createElement('button', {
          onClick: () => setThematicActiveCode(null),
          style: { padding: '4px 10px', background: !thematicActiveCode ? C.tealBg : 'transparent', border: '1px solid ' + (!thematicActiveCode ? C.teal : C.line), borderRadius: 4, color: !thematicActiveCode ? C.teal : C.tx3, fontFamily: AT_Mono, fontSize: 11, cursor: 'pointer' }
        }, 'ALL (' + THEMATIC_COMMS.length + ')'),
        THEMATIC_CODES.map(tc =>
          React.createElement('button', {
            key: tc.code,
            onClick: () => setThematicActiveCode(thematicActiveCode === tc.code ? null : tc.code),
            style: { padding: '4px 10px', background: thematicActiveCode === tc.code ? tc.color + '15' : 'transparent', border: '1px solid ' + (thematicActiveCode === tc.code ? tc.color + '50' : C.line), borderRadius: 4, color: thematicActiveCode === tc.code ? tc.color : C.tx3, fontFamily: AT_Mono, fontSize: 11, cursor: 'pointer' }
          }, tc.label + ' (' + tc.count + ')')
        )
      ),

      // Active code description
      thematicActiveCode && React.createElement('div', {
        style: { padding: '8px 14px', background: C.card, borderRadius: 4, marginBottom: 12, borderLeft: '3px solid ' + (THEMATIC_CODES.find(tc => tc.code === thematicActiveCode)?.color || C.tx3) }
      },
        React.createElement('p', { style: { fontSize: 11, color: C.tx2 } }, THEMATIC_CODES.find(tc => tc.code === thematicActiveCode)?.desc)
      ),

      // Communications
      React.createElement('div', { style: { display: 'grid', gap: 8, marginBottom: 16 } },
        filteredComms.map(comm => {
          const isSelected = thematicSelectedComm === comm.id;
          return React.createElement('div', { key: comm.id },
            React.createElement('button', {
              onClick: () => setThematicSelectedComm(isSelected ? null : comm.id),
              style: { width: '100%', textAlign: 'left', padding: 14, background: isSelected ? C.purpleBg : C.card, border: '1px solid ' + (isSelected ? C.purple + '40' : C.cardBd), borderRadius: 6, cursor: 'pointer', color: C.tx }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 4 } },
                React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
                  React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.purple } }, comm.id),
                  React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, padding: '1px 6px', borderRadius: 3, background: comm.source === 'SIGINT' ? C.blueBg : comm.source === 'HUMINT' ? C.greenBg : C.tealBg, color: comm.source === 'SIGINT' ? C.blue : comm.source === 'HUMINT' ? C.green : C.teal } }, comm.source),
                  React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.tx3 } }, comm.date)
                ),
                React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.copper } }, comm.speaker)
              ),
              // The communication text — highlighted document excerpt style
              React.createElement('p', { style: { fontSize: 12, color: C.tx, lineHeight: 1.8, fontStyle: 'italic', borderLeft: '3px solid ' + C.purple + '40', paddingLeft: 12, background: 'linear-gradient(90deg, rgba(138,104,176,.06) 0%, transparent 100%)', padding: '8px 10px 8px 12px', borderRadius: '0 4px 4px 0', marginTop: 4 } },
                '\u201C' + comm.text + '\u201D'
              ),
              // Theme tags
              React.createElement('div', { style: { display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' } },
                comm.themes.map(t => {
                  const tc = THEMATIC_CODES.find(c => c.code === t);
                  return React.createElement('span', {
                    key: t,
                    style: { padding: '2px 6px', borderRadius: 3, background: (tc?.color || C.tx3) + '12', color: tc?.color || C.tx3, fontFamily: AT_Mono, fontSize: 12 }
                  }, tc?.label || t);
                })
              )
            )
          );
        })
      ),

      // Thematic framework summary
      React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16 } },
        React.createElement('p', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.purple, marginBottom: 8, textTransform: 'uppercase' } }, 'Emergent Thematic Framework'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 } },
          [
            { label: 'Core Category', value: 'Organizational Resilience', desc: 'The network is designed to survive the loss of individual nodes. Succession planning, route adaptation, and expendability language indicate a mature organization.' },
            { label: 'Axial Code', value: 'Layered Insulation', desc: 'Financial, legal, and operational domains are deliberately separated. Euphemistic language (C08) suggests leadership communicates through coded business discourse.' },
            { label: 'Vulnerability', value: 'Insider Dependence', desc: 'DORAN (C07) represents a single point of failure. His nervousness and financial demands suggest a coercion-based relationship that is degrading.' },
            { label: 'Collection Gap', value: 'UNKNOWN-09 Identity', desc: 'C08 reveals leadership-level communication from an unidentified figure. Language analysis suggests business background, possibly non-native speaker of operational lingua franca.' },
          ].map(item =>
            React.createElement('div', { key: item.label, style: { padding: 10, background: C.bg, borderRadius: 4, borderLeft: '2px solid ' + C.purple + '40' } },
              React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.purple, display: 'block', marginBottom: 4 } }, item.label),
              React.createElement('span', { style: { fontFamily: AT_Serif, fontSize: 13, color: C.tx, fontWeight: 600, display: 'block', marginBottom: 4 } }, item.value),
              React.createElement('span', { style: { fontSize: 11, color: C.tx2, lineHeight: 1.65 } }, item.desc)
            )
          )
        ),
        !methodComplete.thematic && React.createElement('button', {
          onClick: () => markComplete('thematic'),
          style: { padding: '8px 20px', background: C.purple, border: 'none', borderRadius: 4, color: '#fff', fontFamily: AT_Mono, fontSize: 12, fontWeight: 600, cursor: 'pointer' }
        }, 'Mark Thematic Analysis Complete \✓')
      )
    );
  };

  // ══════════════════════════════════════════════════════════════
  // TAB 4: DECISION SUPPORT
  // ══════════════════════════════════════════════════════════════
  const renderDecision = () => {
    const maxScore = Math.max(...weightedScores.map(w => w.score));

    return React.createElement('div', null,
      SectionHeading({ title: 'Structured Decision Support: Multi-Criteria Analysis', subtitle: 'Adjust criterion weights to reflect your analytical priorities. The decision matrix recomputes in real time. Select a course of action to examine trade-offs.' }),

      // Weight adjustment
      React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' } }, 'Criterion Weights (Adjustable)'),
      React.createElement('div', { style: { display: 'grid', gap: 6, marginBottom: 20 } },
        DECISION_CRITERIA.map(cr => {
          const w = decisionWeights[cr.id] || 0;
          const totalW = Object.values(decisionWeights).reduce((s, v) => s + v, 0);
          const pct = totalW > 0 ? Math.round((w / totalW) * 100) : 0;
          return React.createElement('div', { key: cr.id, style: { display: 'grid', gridTemplateColumns: '160px 1fr 80px', gap: 12, padding: '8px 12px', background: C.card, borderRadius: 4, alignItems: 'center' } },
            React.createElement('div', null,
              React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.amber, fontWeight: 600, display: 'block' } }, cr.label),
              React.createElement('span', { style: { fontSize: 11, color: C.tx3 } }, cr.desc)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('button', { onClick: () => adjustWeight(cr.id, -5), style: { width: 24, height: 24, background: C.bg, border: '1px solid ' + C.line, borderRadius: 4, color: C.tx3, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' } }, '\u2212'),
              React.createElement('div', { style: { flex: 1, height: 8, background: C.line, borderRadius: 4, position: 'relative' } },
                React.createElement('div', { style: { height: '100%', width: w + '%', background: C.amber, borderRadius: 4, transition: 'width 0.2s' } })
              ),
              React.createElement('button', { onClick: () => adjustWeight(cr.id, 5), style: { width: 24, height: 24, background: C.bg, border: '1px solid ' + C.line, borderRadius: 4, color: C.tx3, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' } }, '+')
            ),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.tx, textAlign: 'right' } }, w + ' (' + pct + '%)')
          );
        })
      ),

      // Decision matrix
      React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' } }, 'Decision Matrix \— Weighted Scores'),
      React.createElement('div', { style: { display: 'grid', gap: 8, marginBottom: 16 } },
        DECISION_COAS.map(coa => {
          const ws = weightedScores.find(w => w.id === coa.id);
          const score = ws ? ws.score : 0;
          const isBest = ws && ws.id === bestCOA.id;
          const isSelected = decisionSelectedCOA === coa.id;
          const barColor = isBest ? C.green : C.amber;

          return React.createElement('div', { key: coa.id },
            React.createElement('button', {
              onClick: () => setDecisionSelectedCOA(isSelected ? null : coa.id),
              style: { width: '100%', textAlign: 'left', padding: 14, background: isSelected ? barColor + '08' : C.card, border: '1px solid ' + (isSelected ? barColor + '40' : C.cardBd), borderLeft: '3px solid ' + barColor, borderRadius: 6, cursor: 'pointer', color: C.tx }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
                React.createElement('div', null,
                  React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: barColor, fontWeight: 600 } }, coa.id + ': ' + coa.title),
                  isBest && React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, padding: '2px 6px', borderRadius: 3, background: C.greenBg, color: C.green, marginLeft: 8 } }, '\u2605 OPTIMAL')
                ),
                React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 16, color: barColor, fontWeight: 700 } }, score.toFixed(2))
              ),
              React.createElement('p', { style: { fontSize: 11, color: C.tx2, marginBottom: 8 } }, coa.desc),
              // Score bar
              React.createElement('div', { style: { height: 8, background: C.line, borderRadius: 4 } },
                React.createElement('div', { style: { height: '100%', width: (maxScore > 0 ? (score / maxScore) * 100 : 0) + '%', background: barColor, borderRadius: 4, transition: 'width 0.3s' } })
              ),
              // Individual scores
              React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' } },
                DECISION_CRITERIA.map(cr =>
                  React.createElement('span', { key: cr.id, style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx3 } },
                    cr.label.slice(0, 4).toUpperCase() + ': ' + coa.scores[cr.id] + '/10'
                  )
                )
              )
            ),
            // Expanded detail
            isSelected && React.createElement('div', { style: { padding: '12px 14px', background: C.bg + 'ee', border: '1px solid ' + C.cardBd, borderTop: 'none', borderRadius: '0 0 6px 6px' } },
              React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
                React.createElement('div', null,
                  React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.green, display: 'block', marginBottom: 6 } }, 'STRENGTHS'),
                  coa.pros.map((p, i) => React.createElement('p', { key: i, style: { fontSize: 11, color: C.tx2, lineHeight: 1.65, paddingLeft: 8, borderLeft: '2px solid ' + C.green + '30', marginBottom: 4 } }, p))
                ),
                React.createElement('div', null,
                  React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.red, display: 'block', marginBottom: 6 } }, 'RISKS'),
                  coa.cons.map((p, i) => React.createElement('p', { key: i, style: { fontSize: 11, color: C.tx2, lineHeight: 1.65, paddingLeft: 8, borderLeft: '2px solid ' + C.red + '30', marginBottom: 4 } }, p))
                )
              )
            )
          );
        })
      ),

      // Sensitivity note
      React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16 } },
        React.createElement('p', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.amber, marginBottom: 8, textTransform: 'uppercase' } }, 'Sensitivity Analysis'),
        React.createElement('p', { style: { fontSize: 12, color: C.tx, lineHeight: 1.6, marginBottom: 8 } },
          'The current weighting yields ' + bestCOA.id + ' as the dominant strategy (score: ' + bestCOA.score.toFixed(2) + '). Adjust the Intelligence Gain weight above 40% to see COA2 overtake COA3. Adjust Disruption above 50% to see COA1 dominate. The crossover thresholds reveal decision sensitivity.'
        ),
        React.createElement('p', { style: { fontSize: 11, color: C.tx2, lineHeight: 1.65 } },
          'In operational practice, this sensitivity analysis would be presented to the decision-maker alongside the primary recommendation, so they understand which assumptions drive the conclusion.'
        ),
        !methodComplete.decision && React.createElement('button', {
          onClick: () => markComplete('decision'),
          style: { marginTop: 12, padding: '8px 20px', background: C.amber, border: 'none', borderRadius: 4, color: '#fff', fontFamily: AT_Mono, fontSize: 12, fontWeight: 600, cursor: 'pointer' }
        }, 'Mark Decision Analysis Complete \✓')
      )
    );
  };

  // ══════════════════════════════════════════════════════════════
  // TAB 5: CONVERGENCE
  // ══════════════════════════════════════════════════════════════
  const renderConvergence = () => {
    return React.createElement('div', null,
      SectionHeading({ title: 'Convergence Assessment: Multi-Method Fusion', subtitle: 'All four analytical methods have been applied. This tab synthesizes where the methods agree, where they diverge, and what the unified assessment reveals.' }),
      ConvergenceIcon,
      TipBox('convergence'),

      // Completion badge
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' } },
        AT_TABS.filter(t => t.id !== 'convergence').map(t => {
          const done = methodComplete[t.id];
          return React.createElement('div', {
            key: t.id,
            style: { padding: '6px 12px', background: done ? t.color + '12' : C.redBg, border: '1px solid ' + (done ? t.color + '40' : C.red + '40'), borderRadius: 4, display: 'flex', alignItems: 'center', gap: 6 }
          },
            React.createElement('span', { style: { color: done ? t.color : C.red, fontFamily: AT_Mono, fontSize: 12 } }, done ? '\✓' : '\✗'),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: done ? t.color : C.red } }, t.title)
          );
        })
      ),

      // Method findings
      React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' } }, 'Method-Level Findings'),
      React.createElement('div', { style: { display: 'grid', gap: 8, marginBottom: 24 } },
        CONVERGENCE_FINDINGS.map(f =>
          React.createElement('div', { key: f.method, style: { display: 'grid', gridTemplateColumns: '100px 1fr 80px', gap: 12, padding: '10px 14px', background: C.card, border: '1px solid ' + C.cardBd, borderLeft: '3px solid ' + f.color, borderRadius: 6, alignItems: 'center' } },
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: f.color, fontWeight: 600 } }, f.method),
            React.createElement('span', { style: { fontSize: 12, color: C.tx, lineHeight: 1.65 } }, f.finding),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, padding: '2px 6px', borderRadius: 3, background: f.confidence === 'HIGH' ? C.greenBg : C.amberBg, color: f.confidence === 'HIGH' ? C.green : C.amber, textAlign: 'center' } }, f.confidence)
          )
        )
      ),

      // Agreements
      React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.copper, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' } }, 'Points of Convergence'),
      React.createElement('div', { style: { display: 'grid', gap: 8, marginBottom: 24 } },
        CONVERGENCE_AGREEMENTS.map(a =>
          React.createElement('div', { key: a.point, style: { padding: 14, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 4 } },
              React.createElement('span', { style: { fontFamily: AT_Serif, fontSize: 14, fontWeight: 600, color: C.tx } }, a.point),
              React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, padding: '2px 8px', borderRadius: 3, background: a.strength === 'STRONG' ? C.greenBg : C.amberBg, color: a.strength === 'STRONG' ? C.green : C.amber } }, a.strength)
            ),
            React.createElement('div', { style: { display: 'flex', gap: 4, marginBottom: 6 } },
              a.methods.map(m => {
                const tab = AT_TABS.find(t => t.title.startsWith(m));
                return React.createElement('span', { key: m, style: { padding: '2px 6px', borderRadius: 3, background: (tab?.color || C.tx3) + '12', color: tab?.color || C.tx3, fontFamily: AT_Mono, fontSize: 12 } }, m);
              })
            ),
            React.createElement('p', { style: { fontSize: 11, color: C.tx2, lineHeight: 1.65 } }, a.desc)
          )
        )
      ),

      // Divergences
      React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.red, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' } }, 'Points of Divergence'),
      React.createElement('div', { style: { display: 'grid', gap: 8, marginBottom: 24 } },
        CONVERGENCE_DIVERGENCES.map(d =>
          React.createElement('div', { key: d.point, style: { padding: 14, background: C.card, border: '1px solid ' + C.redDm + '20', borderRadius: 6 } },
            React.createElement('span', { style: { fontFamily: AT_Serif, fontSize: 14, fontWeight: 600, color: C.tx, display: 'block', marginBottom: 8 } }, d.point),
            React.createElement('div', { style: { display: 'grid', gap: 4, marginBottom: 8 } },
              Object.entries(d.methods).map(([method, view]) => {
                const tab = AT_TABS.find(t => t.title.startsWith(method));
                return React.createElement('div', { key: method, style: { display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8, padding: '4px 8px', borderRadius: 3, background: (tab?.color || C.tx3) + '06' } },
                  React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: tab?.color || C.tx3 } }, method),
                  React.createElement('span', { style: { fontSize: 11, color: C.tx2 } }, view)
                );
              })
            ),
            React.createElement('p', { style: { fontSize: 11, color: C.tx3, fontStyle: 'italic' } }, d.desc)
          )
        )
      ),

      // Unified assessment
      !convergenceRevealed && React.createElement('button', {
        onClick: () => setConvergenceRevealed(true),
        style: { padding: '10px 24px', background: C.copper, border: 'none', borderRadius: 4, color: '#fff', fontFamily: AT_Mono, fontSize: 11, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }
      }, 'Reveal Unified Assessment \▼'),

      convergenceRevealed && React.createElement('div', {
        style: { background: C.copperBg, border: '1px solid ' + C.copper + '30', borderRadius: 8, padding: 20, marginBottom: 16 }
      },
        React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.copper, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' } }, 'Unified Analytical Assessment \— The Meridian Network'),

        React.createElement('div', { style: { borderLeft: '3px solid ' + C.copper, paddingLeft: 16, marginBottom: 16 } },
          React.createElement('p', { style: { fontFamily: AT_Serif, fontSize: 14, color: C.tx, lineHeight: 1.7, marginBottom: 12 } },
            'We assess with HIGH CONFIDENCE that the Meridian Network is a structured transnational smuggling organization with mature operational security, layered financial insulation, and a cell-based topology designed for resilience. KARGA serves as the operational center of gravity, while an unidentified financier (UNKNOWN-09) likely provides strategic direction and capital.'
          ),
          React.createElement('p', { style: { fontFamily: AT_Serif, fontSize: 14, color: C.tx, lineHeight: 1.7, marginBottom: 12 } },
            'We assess with MODERATE CONFIDENCE that a hybrid disruption approach (arrest peripheral nodes while continuing collection on leadership) optimizes across all analytical dimensions: it exploits the geographic chokepoints identified by spatial analysis, leverages the network vulnerabilities identified by SNA, takes advantage of the insider weakness flagged by thematic coding, and scores highest in the weighted decision matrix.'
          ),
          React.createElement('p', { style: { fontFamily: AT_Serif, fontSize: 14, color: C.tx, lineHeight: 1.7 } },
            'The critical intelligence gap is the identity of UNKNOWN-09. All four methods converge on this as the priority collection requirement. We recommend sustained SIGINT and HUMINT collection on NAVARRO\u2019s financial communications to unmask this node before any overt disruption action.'
          )
        ),

        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
          React.createElement('div', { style: { padding: 12, background: C.card, borderRadius: 6 } },
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.green, display: 'block', marginBottom: 6 } }, 'KEY ASSUMPTIONS'),
            ['Network structure is accurately mapped (moderate confidence)',
             'DORAN can be flipped or arrested without alerting leadership',
             'Host-nation cooperation for Brevenia arrests is achievable',
             'UNKNOWN-09 will communicate through observable channels'].map((a, i) =>
              React.createElement('p', { key: i, style: { fontSize: 11, color: C.tx2, lineHeight: 1.65, marginBottom: 3, paddingLeft: 8, borderLeft: '2px solid ' + C.green + '30' } }, a)
            )
          ),
          React.createElement('div', { style: { padding: 12, background: C.card, borderRadius: 6 } },
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.red, display: 'block', marginBottom: 6 } }, 'ANALYTIC LIMITATIONS'),
            ['Spatial cluster at Tezara Port based on single incident (insufficient data)',
             'Network graph is incomplete \— UNKNOWN-09 links are inferred',
             'Thematic coding is limited to 8 intercepted communications',
             'Decision matrix weights reflect analyst judgment, not empirical calibration'].map((a, i) =>
              React.createElement('p', { key: i, style: { fontSize: 11, color: C.tx2, lineHeight: 1.65, marginBottom: 3, paddingLeft: 8, borderLeft: '2px solid ' + C.red + '30' } }, a)
            )
          )
        )
      ),

      // Provenance strip
      React.createElement('div', { style: { marginTop: 24, padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6 } },
        React.createElement('p', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.tx3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' } }, 'Analytical Framework Provenance'),
        React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
          AT_PROVENANCE.map(p =>
            React.createElement('span', { key: p.short, title: p.full, style: { padding: '3px 8px', borderRadius: 3, background: C.copperBg, border: '1px solid ' + C.copper + '15', fontFamily: AT_Mono, fontSize: 12, color: C.copperDm, cursor: 'help' } }, p.short)
          )
        )
      )
    );
  };

  // ── Linchpin Analysis data ────────────────────────────────────
  const LINCHPIN_SCENARIO = useMemo(() => ({
    title: 'MERIDIAN NETWORK: Strategic Assessment',
    briefing: 'Based on 18 months of multi-INT collection, the IC assesses that the Meridian Network is a state-sponsored smuggling operation directed by Corath intelligence services, using commercial cover to move restricted dual-use technology components to a fourth-party state developing a clandestine weapons program. The recommended COA is a coordinated law enforcement disruption operation across all three countries.',
    assumptions: [
      {
        id: 'A1', label: 'State sponsorship',
        description: 'The network is directed by Corath intelligence services rather than being a purely criminal enterprise.',
        confidence: 'MODERATE',
        evidenceFor: ['HUMINT source reports direct contact between POI NAVARRO and Corath intelligence officer', 'Financial trails lead to government-adjacent shell companies', 'Operational security exceeds typical criminal sophistication'],
        evidenceAgainst: ['NAVARRO has documented criminal history predating any government ties', 'No SIGINT directly links Corath government to network operations', 'Similar networks have been run by organized crime without state involvement'],
        impactIfWrong: 'If the network is criminal rather than state-sponsored, a diplomatic disruption approach is wrong -- law enforcement action alone would be appropriate. Diplomatic pressure on Corath government would be misdirected and could damage relations over a false accusation.',
        vulnerability: 4,
      },
      {
        id: 'A2', label: 'Dual-use technology destination',
        description: 'The smuggled materials are destined for a weapons program in a fourth-party state.',
        confidence: 'LOW',
        evidenceFor: ['Cargo manifests include items on dual-use control lists', 'End-user certificates appear forged', 'Destination country has known procurement patterns for weapons programs'],
        evidenceAgainst: ['No direct evidence of final delivery to weapons facilities', 'Items also have legitimate civilian applications', 'Supply chain analysis shows only 3 of 47 shipments contain controlled items'],
        impactIfWrong: 'If the materials are for civilian use, the entire threat assessment is inflated. Resources would be better spent on actual proliferation networks. Intelligence community credibility would be damaged, echoing Iraq WMD failures.',
        vulnerability: 5,
      },
      {
        id: 'A3', label: 'Network organizational structure',
        description: 'The network operates as a single coordinated entity with centralized command.',
        confidence: 'MODERATE',
        evidenceFor: ['Network analysis shows centralized communication patterns through 3 hub nodes', 'Timing of shipments across countries suggests coordination', 'Financial flows converge to common shell company architecture'],
        evidenceAgainst: ['Hub nodes may be independent brokers used by multiple groups', 'Communication patterns could reflect supplier-customer relationships, not command hierarchy', 'Only 15 of 23 persons of interest have confirmed mutual connections'],
        impactIfWrong: 'If the "network" is actually multiple independent groups using common brokers, a coordinated disruption will only affect one group while alerting others. Targeting strategy needs to account for possible modular structure.',
        vulnerability: 3,
      },
      {
        id: 'A4', label: 'Allied cooperation feasibility',
        description: 'Aldoria and Brevenia will cooperate in a coordinated disruption if presented with our intelligence.',
        confidence: 'MODERATE',
        evidenceFor: ['Both countries are signatories to nonproliferation treaties', 'Previous cooperation on organized crime operations', 'Diplomatic relationships are stable'],
        evidenceAgainst: ['Aldoria has significant trade relationship with Corath -- may resist antagonizing', 'HUMINT suggests one Corath customs official is compromised -- unclear if Aldoria/Brevenia have similar compromises', 'Intelligence sharing could expose our collection methods'],
        impactIfWrong: 'If allies do not cooperate, unilateral action is limited to diplomatic and financial tools. A failed coordination attempt would tip off the network through allied leaks. Fallback plan is needed.',
        vulnerability: 3,
      },
    ],
  }), []);

  const renderLinchpin = () => {
    var vuln = LINCHPIN_SCENARIO.assumptions.map(function(a) {
      var userRating = linchpinAssumptions[a.id];
      return { id: a.id, label: a.label, systemVuln: a.vulnerability, userVuln: userRating ? userRating.vulnerability : null };
    });
    var mostVulnerable = LINCHPIN_SCENARIO.assumptions.reduce(function(max, a) { return a.vulnerability > max.vulnerability ? a : max; }, LINCHPIN_SCENARIO.assumptions[0]);

    return React.createElement('div', null,
      SectionHeading({ title: 'Linchpin Analysis Executor', subtitle: 'Identify the key assumptions your assessment depends on. Rate each for confidence, evidence strength, and impact if wrong. The most vulnerable linchpin is where your analysis could break.' }),

      // Scenario briefing
      React.createElement('div', { style: { background: C.manila, border: '1px solid ' + C.line, borderRadius: 6, padding: 16, marginBottom: 20, borderLeft: '3px solid ' + C.copper } },
        React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 10, letterSpacing: '.1em', color: C.copperDm, marginBottom: 6 } }, 'ANALYTIC LINE UNDER REVIEW'),
        React.createElement('p', { style: { fontFamily: AT_Serif, fontSize: 13, color: C.tx, lineHeight: 1.7, margin: 0 } }, LINCHPIN_SCENARIO.briefing)
      ),

      // Assumptions grid
      LINCHPIN_SCENARIO.assumptions.map(function(a) {
        var userRating = linchpinAssumptions[a.id] || {};
        var isRated = userRating.vulnerability !== undefined;
        return React.createElement('div', { key: a.id, style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16, marginBottom: 12, borderLeft: '4px solid ' + (a.vulnerability >= 4 ? C.red : a.vulnerability >= 3 ? C.amber : C.green) } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
            React.createElement('div', null,
              React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, fontWeight: 700, color: C.copper, marginRight: 8 } }, a.id),
              React.createElement('span', { style: { fontFamily: AT_Sans, fontSize: 14, fontWeight: 600, color: C.tx } }, a.label)
            ),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 10, padding: '2px 8px', borderRadius: 3, background: a.confidence === 'HIGH' ? C.greenBg : a.confidence === 'MODERATE' ? C.amberBg : C.redBg, color: a.confidence === 'HIGH' ? C.green : a.confidence === 'MODERATE' ? C.amber : C.red } }, a.confidence + ' CONFIDENCE')
          ),
          React.createElement('p', { style: { fontFamily: AT_Serif, fontSize: 12, color: C.tx2, lineHeight: 1.7, marginBottom: 12 } }, a.description),

          // Evidence for/against
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 } },
            React.createElement('div', { style: { padding: 10, background: C.greenBg, borderRadius: 4 } },
              React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 10, color: C.green, marginBottom: 6, letterSpacing: '.06em' } }, 'EVIDENCE FOR'),
              a.evidenceFor.map(function(e, ei) {
                return React.createElement('div', { key: ei, style: { fontFamily: AT_Sans, fontSize: 11, color: C.tx2, lineHeight: 1.6, padding: '3px 0', borderBottom: ei < a.evidenceFor.length - 1 ? '1px solid rgba(90,154,106,.1)' : 'none' } }, '+ ' + e);
              })
            ),
            React.createElement('div', { style: { padding: 10, background: C.redBg, borderRadius: 4 } },
              React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 10, color: C.red, marginBottom: 6, letterSpacing: '.06em' } }, 'EVIDENCE AGAINST'),
              a.evidenceAgainst.map(function(e, ei) {
                return React.createElement('div', { key: ei, style: { fontFamily: AT_Sans, fontSize: 11, color: C.tx2, lineHeight: 1.6, padding: '3px 0', borderBottom: ei < a.evidenceAgainst.length - 1 ? '1px solid rgba(176,80,80,.1)' : 'none' } }, '- ' + e);
              })
            )
          ),

          // User vulnerability rating
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderTop: '1px solid ' + C.line } },
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.tx3, minWidth: 120 } }, 'VULNERABILITY:'),
            [1, 2, 3, 4, 5].map(function(v) {
              return React.createElement('button', {
                key: v,
                onClick: function() {
                  setLinchpinAssumptions(function(prev) { var next = Object.assign({}, prev); next[a.id] = { vulnerability: v }; return next; });
                },
                style: {
                  width: 32, height: 32, borderRadius: 4, cursor: 'pointer',
                  background: isRated && userRating.vulnerability === v ? (v >= 4 ? C.redBg : v >= 3 ? C.amberBg : C.greenBg) : 'transparent',
                  border: isRated && userRating.vulnerability === v ? '2px solid ' + (v >= 4 ? C.red : v >= 3 ? C.amber : C.green) : '1px solid ' + C.line,
                  fontFamily: AT_Mono, fontSize: 13, fontWeight: 700,
                  color: isRated && userRating.vulnerability === v ? (v >= 4 ? C.red : v >= 3 ? C.amber : C.green) : C.tx3,
                }
              }, v);
            }),
            React.createElement('span', { style: { fontFamily: AT_Sans, fontSize: 10, color: C.tx3, marginLeft: 4 } }, '1=solid  5=critical')
          ),

          // Impact if wrong (shown after reveal)
          linchpinRevealed && React.createElement('div', { style: { marginTop: 10, padding: '10px 12px', background: C.amberBg, borderRadius: 4, border: '1px solid rgba(196,160,64,.15)' } },
            React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 10, color: C.amber, marginBottom: 4, letterSpacing: '.06em' } }, 'IMPACT IF WRONG (System: ' + a.vulnerability + '/5)'),
            React.createElement('p', { style: { fontFamily: AT_Serif, fontSize: 12, color: C.tx2, lineHeight: 1.7, margin: 0 } }, a.impactIfWrong)
          )
        );
      }),

      // Reveal / summary
      Object.keys(linchpinAssumptions).length >= 3 && !linchpinRevealed && React.createElement('button', {
        onClick: function() { setLinchpinRevealed(true); },
        style: { padding: '10px 24px', borderRadius: 4, cursor: 'pointer', background: C.copperBg, border: '1px solid ' + C.copper, color: C.copper, fontFamily: AT_Mono, fontSize: 12, letterSpacing: '.06em', marginTop: 8 }
      }, 'REVEAL VULNERABILITY ASSESSMENT'),

      linchpinRevealed && React.createElement('div', { style: { background: C.card, border: '2px solid ' + C.red + '40', borderRadius: 6, padding: 20, marginTop: 16, borderTop: '4px solid ' + C.red } },
        React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 11, letterSpacing: '.1em', color: C.red, marginBottom: 10 } }, 'MOST VULNERABLE LINCHPIN'),
        React.createElement('h3', { style: { fontFamily: AT_Serif, fontSize: 18, color: C.tx, marginBottom: 8 } }, mostVulnerable.id + ': ' + mostVulnerable.label),
        React.createElement('p', { style: { fontFamily: AT_Serif, fontSize: 13, color: C.tx2, lineHeight: 1.7, marginBottom: 12 } }, mostVulnerable.impactIfWrong),
        React.createElement('p', { style: { fontFamily: AT_Sans, fontSize: 12, color: C.tx3, lineHeight: 1.65, borderTop: '1px solid ' + C.line, paddingTop: 12 } },
          'Linchpin analysis was developed by the CIA\'s Directorate of Intelligence to identify the assumptions most likely to be wrong and most consequential if they are. The technique forces analysts to make implicit assumptions explicit and subject them to structured evaluation. The most vulnerable linchpin -- the one with the weakest evidence base and highest impact if wrong -- is where collection and analysis resources should be concentrated.'
        )
      )
    );
  };

  // ── SAT Selection Lab data ─────────────────────────────────────
  const SAT_MENU = useMemo(() => [
    { id: 'ach', name: 'Analysis of Competing Hypotheses (ACH)', short: 'ACH' },
    { id: 'kac', name: 'Key Assumptions Check', short: 'KAC' },
    { id: 'rht', name: 'Red Hat / Team A-Team B', short: 'Red Hat' },
    { id: 'pma', name: 'Pre-Mortem Analysis', short: 'Pre-Mortem' },
    { id: 'swot', name: 'SWOT Analysis', short: 'SWOT' },
    { id: 'scn', name: 'Scenario Generation / What-If', short: 'Scenarios' },
    { id: 'ccm', name: 'Cross-Impact / Consistency Matrix', short: 'Cross-Impact' },
    { id: 'cwa', name: 'Chronologies and Timelines', short: 'Chronology' },
    { id: 'dia', name: 'Devil\'s Advocacy', short: 'Devil\'s Adv.' },
    { id: 'ind', name: 'Indicators / Signposts of Change', short: 'Indicators' },
  ], []);

  const SAT_PROBLEMS = useMemo(() => [
    {
      id: 0, title: 'Multiple Competing Explanations',
      desc: 'Three explanations exist for why Country X suddenly increased military spending by 40%: (1) response to neighbor\'s missile test, (2) internal power consolidation by new defense minister, (3) preparation for offensive operations. You have evidence that partially supports all three.',
      best: 'ach',
      explanation: 'ACH is purpose-built for this problem: multiple hypotheses, evidence that partially supports each, and a need to identify which hypothesis is most consistent with all available evidence while identifying the diagnostically most valuable evidence. It forces you to evaluate evidence against ALL hypotheses simultaneously rather than anchoring on one.',
      suboptimal: { rht: 'Red Hat is better for challenging a single prevailing view, not comparing three equally plausible hypotheses.', kac: 'KAC tests assumptions underlying a single assessment, but here you need to compare across hypotheses.', swot: 'SWOT is a strategic planning tool, not an evidence evaluation method.' },
    },
    {
      id: 1, title: 'Long-Standing Institutional Consensus',
      desc: 'For 15 years, the IC has assessed that Country Y\'s nuclear program is for civilian energy purposes only. Recent ambiguous indicators (new facility construction, personnel movements) could support either interpretation. The institutional position is deeply entrenched.',
      best: 'kac',
      explanation: 'Key Assumptions Check directly targets the 15-year institutional consensus by forcing analysts to articulate the foundational assumptions that support the existing assessment, evaluate the evidence base for each, and identify which assumptions are most vulnerable to being wrong. This is the exact problem KAC was designed for: questioning long-standing group consensus.',
      suboptimal: { ach: 'ACH could work but is less targeted -- the problem here is not multiple hypotheses but entrenched assumptions beneath a single dominant view.', dia: 'Devil\'s Advocacy helps challenge but is less structured than KAC for systematically identifying and testing specific assumptions.', pma: 'Pre-Mortem imagines failure of a plan, not failure of an assessment.' },
    },
    {
      id: 2, title: 'Planning for Collection Gaps',
      desc: 'Your team must anticipate what would signal that a ceasefire in a regional conflict is about to collapse. You need to identify the 5-7 most important observable indicators that would provide early warning, and determine what collection platforms to task.',
      best: 'ind',
      explanation: 'Indicators and Signposts of Change is specifically designed to identify observable, concrete indicators that would signal a change in the assessed situation. It forces analysts to move from vague warning criteria to specific, monitorable events -- exactly what collection managers need to task sensors and sources.',
      suboptimal: { scn: 'Scenario generation explores possible futures but doesn\'t produce specific monitorable indicators.', ach: 'ACH evaluates existing evidence, it doesn\'t generate future-looking indicator lists.', cwa: 'Chronologies organize past events but don\'t project future warning indicators.' },
    },
    {
      id: 3, title: 'Policy Failure Anticipation',
      desc: 'The NSC is about to launch a diplomatic initiative to negotiate a trade agreement with a historically adversarial state. Your analytic team has been asked to identify what could go wrong and recommend risk mitigation measures before the initiative begins.',
      best: 'pma',
      explanation: 'Pre-Mortem Analysis is purpose-built for this: imagine the initiative has already failed, then work backward to identify why. It overcomes optimism bias that typically afflicts teams supporting policy initiatives. By assuming failure and generating explanations, analysts surface risks that standard forward-looking analysis would miss.',
      suboptimal: { swot: 'SWOT identifies weaknesses but lacks the cognitive power of assuming failure first.', rht: 'Red Hat would argue against the initiative but doesn\'t systematically generate failure modes.', scn: 'Scenarios are broader -- Pre-Mortem specifically targets failure of a defined plan.' },
    },
    {
      id: 4, title: 'Adversary Perspective Required',
      desc: 'Your intelligence service has developed a new counterintelligence protocol to detect moles. Before implementation, leadership wants to understand how a sophisticated adversary intelligence service would attempt to defeat or circumvent the new protocol.',
      best: 'rht',
      explanation: 'Red Hat / Team A-Team B analysis explicitly tasks analysts to adopt the adversary\'s perspective, mindset, and doctrine. This is not about evaluating evidence (ACH) or questioning assumptions (KAC) -- it\'s about thinking like the opposition. Red Teaming produces insights about adversary tradecraft, operational patterns, and exploitation strategies that no other SAT generates.',
      suboptimal: { dia: 'Devil\'s Advocacy argues against your position but doesn\'t adopt the adversary\'s specific perspective and capabilities.', ach: 'ACH compares hypotheses but doesn\'t simulate adversary decision-making.', pma: 'Pre-Mortem assumes your plan failed but doesn\'t model how the adversary would cause that failure.' },
    },
  ], []);

  const renderSatLab = () => {
    var problem = SAT_PROBLEMS[satLabIdx];
    var userAnswer = satLabAnswers[satLabIdx];
    var isRevealed = satLabRevealed[satLabIdx];
    var correctCount = Object.keys(satLabAnswers).filter(function(k) { return satLabAnswers[k] === SAT_PROBLEMS[k].best; }).length;

    return React.createElement('div', null,
      SectionHeading({ title: 'SAT Selection Advisor', subtitle: 'Five analytical problems, ten structured analytic techniques. For each problem, select the most appropriate SAT. The insight: different problems require different tools.' }),

      // Problem selector
      React.createElement('div', { style: { display: 'flex', gap: 4, marginBottom: 20 } },
        SAT_PROBLEMS.map(function(p, i) {
          var answered = satLabAnswers[i] !== undefined;
          var correct = answered && satLabAnswers[i] === p.best;
          return React.createElement('button', {
            key: i, onClick: function() { setSatLabIdx(i); },
            style: {
              flex: 1, padding: '8px 6px', borderRadius: 4, cursor: 'pointer', textAlign: 'center',
              background: satLabIdx === i ? C.tealBg : 'transparent',
              border: satLabIdx === i ? '1px solid ' + C.teal : '1px solid ' + C.line,
            }
          },
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, fontWeight: 600, color: satLabIdx === i ? C.teal : C.tx3, display: 'block' } }, 'P-' + (i + 1)),
            React.createElement('span', { style: { fontFamily: AT_Sans, fontSize: 10, color: answered ? (correct ? C.green : C.red) : C.tx3 } }, answered ? (correct ? '\u2713' : '\u2717') : '\u2014')
          );
        })
      ),

      // Current problem
      React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 20, marginBottom: 16, borderTop: '3px solid ' + C.teal, position: 'relative' } },
        React.createElement(PushpinSVG),
        React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 10, letterSpacing: '.1em', color: C.tealDm, marginBottom: 6 } }, 'ANALYTIC PROBLEM ' + (satLabIdx + 1) + ' OF 5'),
        React.createElement('h3', { style: { fontFamily: AT_Serif, fontSize: 16, color: C.tx, marginBottom: 10, fontWeight: 600 } }, problem.title),
        React.createElement('p', { style: { fontFamily: AT_Serif, fontSize: 13, color: C.tx2, lineHeight: 1.7, marginBottom: 16, borderLeft: '3px solid ' + C.line, paddingLeft: 12 } }, problem.desc),

        // SAT selection grid
        React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 10, letterSpacing: '.08em', color: C.tx3, marginBottom: 8 } }, 'SELECT THE BEST SAT:'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 6 } },
          SAT_MENU.map(function(sat) {
            var isSelected = userAnswer === sat.id;
            var isCorrect = isRevealed && sat.id === problem.best;
            var isWrong = isRevealed && isSelected && sat.id !== problem.best;
            return React.createElement('button', {
              key: sat.id,
              onClick: function() {
                if (!userAnswer) {
                  setSatLabAnswers(function(prev) { return Object.assign({}, prev, { [satLabIdx]: sat.id }); });
                }
              },
              style: {
                padding: '8px 10px', borderRadius: 4, cursor: userAnswer ? 'default' : 'pointer', textAlign: 'left',
                background: isCorrect ? C.greenBg : isWrong ? C.redBg : isSelected ? C.tealBg : 'transparent',
                border: isCorrect ? '2px solid ' + C.green : isWrong ? '2px solid ' + C.red : isSelected ? '1px solid ' + C.teal : '1px solid ' + C.line,
                opacity: userAnswer && !isSelected && !isCorrect ? 0.4 : 1,
              }
            },
              React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, fontWeight: 600, color: isCorrect ? C.green : isWrong ? C.red : isSelected ? C.teal : C.tx3, display: 'block' } }, sat.short),
              React.createElement('span', { style: { fontFamily: AT_Sans, fontSize: 10, color: C.tx3 } }, sat.name)
            );
          })
        ),

        // Reveal
        userAnswer && !isRevealed && React.createElement('button', {
          onClick: function() { setSatLabRevealed(function(prev) { return Object.assign({}, prev, { [satLabIdx]: true }); }); },
          style: { marginTop: 12, padding: '8px 20px', borderRadius: 4, cursor: 'pointer', background: C.tealBg, border: '1px solid ' + C.teal, color: C.teal, fontFamily: AT_Mono, fontSize: 11 }
        }, 'REVEAL ANSWER')
      ),

      // Expert explanation
      isRevealed && React.createElement('div', null,
        React.createElement('div', { style: { background: C.greenBg, border: '1px solid rgba(90,154,106,.15)', borderRadius: 6, padding: 16, marginBottom: 12 } },
          React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 10, letterSpacing: '.08em', color: C.green, marginBottom: 6 } }, 'BEST SAT: ' + SAT_MENU.find(function(s) { return s.id === problem.best; }).name.toUpperCase()),
          React.createElement('p', { style: { fontFamily: AT_Serif, fontSize: 12, color: C.tx2, lineHeight: 1.7, margin: 0 } }, problem.explanation)
        ),

        // Why others are suboptimal
        React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16 } },
          React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 10, letterSpacing: '.08em', color: C.tx3, marginBottom: 8 } }, 'WHY OTHER CHOICES ARE SUBOPTIMAL'),
          Object.entries(problem.suboptimal).map(function(entry) {
            var satId = entry[0]; var reason = entry[1];
            var satName = SAT_MENU.find(function(s) { return s.id === satId; });
            return React.createElement('div', { key: satId, style: { padding: '6px 0', borderBottom: '1px solid ' + C.line, display: 'flex', gap: 8 } },
              React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.amber, minWidth: 80 } }, satName ? satName.short : satId),
              React.createElement('span', { style: { fontFamily: AT_Sans, fontSize: 11, color: C.tx2, lineHeight: 1.6 } }, reason)
            );
          })
        )
      ),

      // Score summary
      Object.keys(satLabAnswers).length === 5 && React.createElement('div', { style: { background: C.card, border: '2px solid ' + (correctCount >= 4 ? C.green : correctCount >= 3 ? C.amber : C.red) + '40', borderRadius: 6, padding: 20, marginTop: 16, textAlign: 'center' } },
        React.createElement('div', { style: { fontFamily: AT_Mono, fontSize: 36, fontWeight: 700, color: correctCount >= 4 ? C.green : correctCount >= 3 ? C.amber : C.red } }, correctCount + '/5'),
        React.createElement('div', { style: { fontFamily: AT_Sans, fontSize: 13, color: C.tx2, marginTop: 4 } }, 'Correct SAT Selections'),
        React.createElement('p', { style: { fontFamily: AT_Serif, fontSize: 12, color: C.tx3, lineHeight: 1.65, marginTop: 12, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' } },
          correctCount === 5 ? 'Perfect score. You demonstrate strong understanding of when to apply each SAT -- a critical skill that separates effective analysts from those who apply techniques mechanically.'
          : correctCount >= 3 ? 'Good performance. You understand the general categories of SATs but some problem-technique pairings need refinement. Review the suboptimal explanations for the ones you missed.'
          : 'SAT selection is as important as SAT execution. Applying the wrong technique wastes time and can produce misleading confidence. Study the Heuer & Pherson taxonomy of when each technique is most effective.'
        )
      )
    );
  };

  // ══════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ══════════════════════════════════════════════════════════════
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'spatial': return renderSpatial();
      case 'network': return renderNetwork();
      case 'thematic': return renderThematic();
      case 'decision': return renderDecision();
      case 'convergence': return renderConvergence();
      case 'linchpin': return renderLinchpin();
      case 'sat_lab': return renderSatLab();
      default: return null;
    }
  };

  return React.createElement('div', {
    style: { minHeight: '100vh', background: C.bg, backgroundImage: CORK_BG + ', ' + GRID_OVERLAY, color: C.tx, fontFamily: AT_Sans, position: 'relative' }
  },
    TopBar(),

    React.createElement('div', { style: { maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px' } },
      // Hero section
      React.createElement('div', { style: { marginBottom: 28 } },
        React.createElement('h1', {
          style: { fontFamily: AT_Serif, fontSize: 30, fontWeight: 700, color: C.tx, letterSpacing: '-.03em', marginBottom: 6 }
        }, 'Multi-Method Convergence Board'),
        React.createElement('p', {
          style: { fontFamily: AT_Mono, fontSize: 11, color: C.copperDm, marginBottom: 12, borderLeft: '3px solid ' + C.copper, paddingLeft: 8 }
        }, 'SELECTED WORK \— MULTI-METHOD ANALYTICAL TRADECRAFT'),
        React.createElement('p', {
          style: { fontFamily: AT_Serif, fontSize: 14, color: C.tx2, lineHeight: 1.6, marginBottom: 12, maxWidth: '65ch' }
        }, 'Apply four distinct analytical methods to a single intelligence problem \— a suspected transnational smuggling network spanning three countries. Each method reveals different aspects of the same dataset. The convergence tab fuses all four into a unified assessment.'),

        // Scenario brief — classified dossier styling
        React.createElement('div', {
          style: { background: 'rgba(30,28,22,.92)', border: '1px solid rgba(160,130,90,.18)', borderLeft: '4px solid ' + C.copper, borderRadius: 2, padding: '16px 16px 14px', marginBottom: 12, boxShadow: '3px 4px 10px rgba(0,0,0,.3), 0 1px 2px rgba(0,0,0,.15)', position: 'relative' }
        },
          // Stamp-like TOP SECRET decoration
          React.createElement('div', { style: { position: 'absolute', top: 8, right: 12, fontFamily: AT_Mono, fontSize: 9, color: C.red + '40', border: '1px solid ' + C.red + '20', padding: '2px 6px', borderRadius: 2, transform: 'rotate(2deg)', letterSpacing: '.1em' } }, 'CLASSIFIED'),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.copper, fontWeight: 600 } }, 'SCENARIO: ' + SCENARIO.codename),
            React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.copperDm } }, SCENARIO.classification)
          ),
          React.createElement('p', { style: { fontSize: 12, color: C.tx, lineHeight: 1.6, marginBottom: 8 } }, SCENARIO.summary),
          React.createElement('div', { style: { display: 'flex', gap: 16, flexWrap: 'wrap' } },
            Object.entries(SCENARIO.stats).map(([key, val]) =>
              React.createElement('div', { key: key, style: { textAlign: 'center' } },
                React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 16, color: C.copper, fontWeight: 700, display: 'block' } }, val),
                React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 12, color: C.tx3, textTransform: 'uppercase' } }, key)
              )
            )
          )
        ),

        // Skills tags
        React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
          AT_SKILLS.map(s =>
            React.createElement('span', { key: s, style: { padding: '3px 8px', borderRadius: 3, background: C.copperBg, border: '1px solid ' + C.copper + '15', fontFamily: AT_Mono, fontSize: 11, color: C.copperDm, letterSpacing: '.03em' } }, s)
          )
        ),

        // Progress indicator
        React.createElement('div', { style: { marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.tx3 } }, 'METHODS COMPLETE:'),
          React.createElement('div', { style: { display: 'flex', gap: 3 } },
            [0, 1, 2, 3].map(i =>
              React.createElement('div', { key: i, style: { width: 20, height: 4, borderRadius: 2, background: i < completionCount ? C.green : C.line } })
            )
          ),
          React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: completionCount === 4 ? C.green : C.tx3 } }, completionCount + '/4'),
          completionCount === 4 && React.createElement('span', { style: { fontFamily: AT_Mono, fontSize: 11, color: C.copper, marginLeft: 4 } }, '\— Convergence tab unlocked')
        )
      ),

      TabNav(),
      renderActiveTab()
    )
  );
}
