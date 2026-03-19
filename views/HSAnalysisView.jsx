// HSAnalysisView.jsx — Red Team TTX Simulator
// Homeland Security & Intelligence (MPAI 6745)
//
// An interactive tabletop exercise (TTX) based on FEMA's Homeland
// Security Exercise and Evaluation Program (HSEEP). The visitor is
// the Exercise Director managing a multi-agency response to
// "Operation GRAY DAWN" — a coordinated cyber-physical attack.
// Each inject demands resource allocation, inter-agency coordination,
// and decisions with cascading consequences.

// ── Palette: Emergency Operations Center (amber/orange alert) ──
const HS_C = {
  bg: '#0a0808',
  card: 'rgba(18,14,10,.94)',
  cardBd: 'rgba(200,140,40,.12)',
  tx: '#d0c8b8',
  tx2: '#a89880',
  tx3: '#786858',
  red: '#cc3838',
  redDm: '#992828',
  redBg: 'rgba(204,56,56,.08)',
  orange: '#d88030',
  orangeDm: '#a86020',
  orangeBg: 'rgba(216,128,48,.08)',
  amber: '#d8a830',
  amberDm: '#a88020',
  amberBg: 'rgba(216,168,48,.08)',
  green: '#48a858',
  greenDm: '#308040',
  greenBg: 'rgba(72,168,88,.06)',
  blue: '#4878b0',
  blueDm: '#305888',
  blueBg: 'rgba(72,120,176,.06)',
  cyan: '#40a0b0',
  cyanDm: '#287080',
  line: 'rgba(200,140,40,.10)',
  cautionYellow: '#d8c020',
  cautionBlack: '#1a1810',
};
const HS_MONO = "'IBM Plex Mono','Courier New',monospace";
const HS_SANS = "'Inter',sans-serif";

// ── EOC Decorative Components ──────────────────────────────
const EOCBeacon = () => {
  const keyframes = `@keyframes eocPulse { 0%, 100% { opacity: 0.03; } 50% { opacity: 0.08; } }`;
  return React.createElement('div', {
    style: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }
  },
    React.createElement('style', null, keyframes),
    React.createElement('div', {
      style: {
        position: 'absolute', top: 20, right: 40, width: 300, height: 300,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(216,128,48,.15) 0%, transparent 70%)',
        animation: 'eocPulse 3s ease-in-out infinite',
      }
    }),
    React.createElement('svg', { width: '100%', height: '100%', viewBox: '0 0 1200 900', preserveAspectRatio: 'xMidYMid slice', style: { position: 'absolute', opacity: 0.04 } },
      // Grid pattern like an EOC status board
      ...[0,100,200,300,400,500,600,700,800,900].map(y =>
        React.createElement('line', { key: 'hg-' + y, x1: 0, y1: y, x2: 1200, y2: y, stroke: '#d88030', strokeWidth: 0.3 })
      ),
      ...[0,120,240,360,480,600,720,840,960,1080,1200].map(x =>
        React.createElement('line', { key: 'vg-' + x, x1: x, y1: 0, x2: x, y2: 900, stroke: '#d88030', strokeWidth: 0.3 })
      ),
    )
  );
};

const DEFCONIndicator = ({ level }) => {
  const levels = [
    { num: 1, label: 'COCKED PISTOL', color: '#ffffff', bg: '#cc2020' },
    { num: 2, label: 'FAST PACE', color: '#ffffff', bg: '#cc4020' },
    { num: 3, label: 'ROUND HOUSE', color: '#000', bg: '#d8a830' },
    { num: 4, label: 'DOUBLE TAKE', color: '#ffffff', bg: '#3080c0' },
    { num: 5, label: 'FADE OUT', color: '#ffffff', bg: '#308040' },
  ];
  return React.createElement('div', {
    style: { display: 'flex', gap: 2, marginBottom: 20 }
  }, levels.map(l =>
    React.createElement('div', {
      key: l.num,
      style: {
        flex: 1, textAlign: 'center', padding: '6px 4px', fontFamily: HS_MONO, fontSize: 10,
        letterSpacing: '.08em', fontWeight: l.num === level ? 800 : 400,
        background: l.num === level ? l.bg : 'rgba(255,255,255,.03)',
        color: l.num === level ? l.color : '#504840',
        border: l.num === level ? '2px solid ' + l.bg : '1px solid rgba(200,140,40,.08)',
        borderRadius: 1,
        boxShadow: l.num === level ? '0 0 12px ' + l.bg + '40' : 'none',
      }
    }, 'DEFCON ' + l.num)
  ));
};

const CautionStripe = ({ children, style }) => React.createElement('div', {
  style: {
    position: 'relative', overflow: 'hidden', borderRadius: 2, ...style,
  }
},
  // Top caution stripe
  React.createElement('div', {
    style: {
      height: 4,
      background: 'repeating-linear-gradient(45deg, #d8c020 0px, #d8c020 8px, #1a1810 8px, #1a1810 16px)',
    }
  }),
  React.createElement('div', { style: { background: 'rgba(18,14,10,.96)', border: '1px solid rgba(200,140,40,.15)', borderTop: 'none', padding: 20 } }, children),
  // Bottom caution stripe
  React.createElement('div', {
    style: {
      height: 4,
      background: 'repeating-linear-gradient(45deg, #d8c020 0px, #d8c020 8px, #1a1810 8px, #1a1810 16px)',
    }
  })
);

const DispatchMessage = ({ time, from, text, priority }) => React.createElement('div', {
  style: {
    background: priority === 'FLASH' ? 'rgba(204,56,56,.08)' : priority === 'URGENT' ? 'rgba(216,128,48,.06)' : 'rgba(216,168,48,.04)',
    border: '1px solid ' + (priority === 'FLASH' ? 'rgba(204,56,56,.2)' : priority === 'URGENT' ? 'rgba(216,128,48,.15)' : 'rgba(216,168,48,.1)'),
    borderLeft: '4px solid ' + (priority === 'FLASH' ? '#cc3838' : priority === 'URGENT' ? '#d88030' : '#d8a830'),
    padding: '10px 14px', marginBottom: 8, borderRadius: 1, fontFamily: HS_MONO, fontSize: 11,
  }
},
  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
    React.createElement('span', { style: { color: priority === 'FLASH' ? '#cc3838' : priority === 'URGENT' ? '#d88030' : '#d8a830', fontWeight: 700, letterSpacing: '.1em' } }, priority + ' // ' + from),
    React.createElement('span', { style: { color: '#786858' } }, time)
  ),
  React.createElement('div', { style: { color: '#d0c8b8', lineHeight: 1.6 } }, text)
);

// ── Agencies ──────────────────────────────────────────────
const AGENCIES = [
  { id: 'fbi', name: 'FBI', role: 'Lead federal agency for terrorism investigations, JTTF coordination', color: HS_C.blue },
  { id: 'dhs', name: 'DHS/CISA', role: 'Cybersecurity, critical infrastructure protection', color: HS_C.cyan },
  { id: 'fema', name: 'FEMA', role: 'Emergency management, disaster declaration, resource coordination', color: HS_C.green },
  { id: 'local', name: 'State/Local LE', role: 'First responders, evacuation, perimeter security', color: HS_C.orange },
  { id: 'guard', name: 'National Guard', role: 'Force multiplier, critical infrastructure protection', color: HS_C.amber },
  { id: 'private', name: 'Private Sector', role: 'Utility companies, hospital systems, communications', color: HS_C.tx2 },
];

// ── Injects ───────────────────────────────────────────────
const INJECTS = [
  {
    id: 1,
    time: 'T+00:00',
    title: 'Anomalous Network Traffic Detected',
    classification: 'UNCLASSIFIED // FOUO',
    sitrep: 'CISA Integrated Operations Center reports anomalous network traffic patterns targeting SCADA systems at three regional power grid operators in the Mid-Atlantic corridor. Traffic signatures match known reconnaissance tools associated with domestic extremist cyber capabilities. No service disruption yet. Power grid operators have been notified through the Electricity Subsector Coordinating Council (ESCC). Affected utilities serve approximately 4.2 million customers across three states.',
    urgency: 'ELEVATED',
    actions: [
      { id: 'a1_1', label: 'Activate CISA Emergency Directive — mandate immediate patching of identified SCADA vulnerabilities', effect: 'mitigation', tradeoff: 'Utility companies push back on operational disruption during peak demand. 48-hour compliance window may be too slow.', scores: { threat: 8, civilian: 5, coordination: 7, constitutional: 10 } },
      { id: 'a1_2', label: 'FBI opens preliminary investigation — begin monitoring suspect IP ranges under existing authorities', effect: 'intelligence', tradeoff: 'Limited scope under preliminary investigation rules. Cannot compel ISP cooperation without FISA or grand jury subpoena.', scores: { threat: 6, civilian: 3, coordination: 5, constitutional: 9 } },
      { id: 'a1_3', label: 'Request NSA technical assistance under PPD-21 critical infrastructure authority', effect: 'intelligence', tradeoff: 'Powerful capability but creates civil liberties friction. Congressional notification required within 72 hours.', scores: { threat: 9, civilian: 4, coordination: 6, constitutional: 5 } },
      { id: 'a1_4', label: 'Brief state governors and activate fusion center intelligence sharing', effect: 'coordination', tradeoff: 'Improves situational awareness but risks premature public disclosure. Media monitoring shows no public awareness yet.', scores: { threat: 4, civilian: 7, coordination: 9, constitutional: 10 } },
    ],
    resourceWeights: { fbi: 15, dhs: 35, fema: 5, local: 10, guard: 5, private: 30 },
    cascadeKey: 'cyber_prep',
  },
  {
    id: 2,
    time: 'T+06:00',
    title: 'Social Media Intelligence — Coded Communications',
    classification: 'SECRET // NOFORN',
    sitrep: 'FBI Joint Terrorism Task Force (JTTF) identifies coded language on an encrypted messaging platform consistent with a known domestic violent extremist (DVE) network — "The Sovereign Vanguard." Linguistic analysis indicates operational planning phase. Three key phrases detected: "gray dawn rising," "the grid falls," and "water runs red." SIGINT correlation with the CISA cyber alert suggests a coordinated cyber-physical attack vector. The DVE network has cells in four states overlapping the power grid target zone.',
    urgency: 'HIGH',
    actions: [
      { id: 'a2_1', label: 'Seek emergency FISA warrant for full-take surveillance of identified DVE network communications', effect: 'intelligence', tradeoff: 'Maximum intelligence gain but requires probable cause showing. Processing through FISA court takes 24-48 hours even on emergency basis.', scores: { threat: 9, civilian: 5, coordination: 6, constitutional: 7 } },
      { id: 'a2_2', label: 'Deploy FBI Hostage Rescue Team and SWAT assets to pre-position near suspected cell locations', effect: 'mitigation', tradeoff: 'Visible law enforcement presence may trigger early execution of attack or cause subjects to go dark. Resource-intensive deployment.', scores: { threat: 7, civilian: 6, coordination: 4, constitutional: 8 } },
      { id: 'a2_3', label: 'Initiate warrantless surveillance under Section 702 / "exigent circumstances" exception', effect: 'intelligence', tradeoff: 'Immediate intelligence access but constitutionally questionable against domestic actors. Creates significant legal exposure and potential fruit-of-the-poisonous-tree problems.', scores: { threat: 10, civilian: 5, coordination: 5, constitutional: 2 } },
      { id: 'a2_4', label: 'Issue DHS NTAS Bulletin (elevated) and coordinate with private sector through InfraGard', effect: 'coordination', tradeoff: 'Broad awareness enables distributed defense but public alert may cause panic. Cannot share classified indicators through unclassified channels.', scores: { threat: 5, civilian: 8, coordination: 9, constitutional: 10 } },
    ],
    resourceWeights: { fbi: 35, dhs: 20, fema: 5, local: 15, guard: 10, private: 15 },
    cascadeKey: 'intel_posture',
  },
  {
    id: 3,
    time: 'T+14:00',
    title: 'Cyber Attack Executes — Power Grid Failure',
    classification: 'SECRET // REL TO USA, FVEY',
    sitrep: 'Two of three targeted power grids are offline. A sophisticated wiper malware destroyed SCADA firmware, preventing remote restoration. 4.2 million people across three states without power. Hospitals running on backup generators (12-48 hour fuel reserves). Traffic signals, water pumping stations, and communication towers losing power. Cell networks degrading as tower batteries drain. Temperature is 34 degrees F — hypothermia risk for vulnerable populations. National Guard activation requests from two governors. FEMA Region III EOC activated.',
    urgency: 'CRITICAL',
    actions: [
      { id: 'a3_1', label: 'Request Presidential Emergency Declaration under Stafford Act — unlock federal disaster funds', effect: 'coordination', tradeoff: 'Massive resource unlock but political implications. Requires damage assessment that takes 24-48 hours to complete properly.', scores: { threat: 5, civilian: 9, coordination: 8, constitutional: 10 } },
      { id: 'a3_2', label: 'Deploy National Guard to protect remaining critical infrastructure (water, hospitals, comms)', effect: 'mitigation', tradeoff: 'Direct civilian protection but pulls Guard away from potential follow-on attack response. Posse Comitatus Act limits law enforcement functions.', scores: { threat: 6, civilian: 8, coordination: 6, constitutional: 8 } },
      { id: 'a3_3', label: 'Authorize CISA to conduct offensive cyber operations to neutralize attacker C2 infrastructure', effect: 'mitigation', tradeoff: 'Could stop further attacks but may destroy forensic evidence. Attribution confidence must be high. Risk of collateral damage to shared infrastructure.', scores: { threat: 9, civilian: 5, coordination: 4, constitutional: 6 } },
      { id: 'a3_4', label: 'Activate Emergency Alert System and initiate mass evacuation of affected urban areas', effect: 'civilian', tradeoff: 'Protects vulnerable populations but creates massive logistics burden. Roads without traffic signals. Risk of evacuation-related casualties in freezing temps.', scores: { threat: 3, civilian: 7, coordination: 5, constitutional: 10 } },
    ],
    resourceWeights: { fbi: 15, dhs: 25, fema: 25, local: 15, guard: 15, private: 5 },
    cascadeKey: 'grid_response',
  },
  {
    id: 4,
    time: 'T+22:00',
    title: 'Physical Attack — Water Treatment Facility',
    classification: 'TOP SECRET // SI // TK',
    sitrep: 'IED detonated at the Chesapeake Regional Water Treatment Facility, damaging chlorination and filtration systems. The facility serves 1.8 million people. The power grid outage disabled perimeter security cameras and electronic access controls — the attackers exploited this gap. Three facility workers injured, one critically. Forensic evidence at the scene links to Sovereign Vanguard — matching explosive signatures from an ATF database. "Water runs red" threat realized. Boil-water advisory issued. HAZMAT teams detecting elevated chemical levels downstream.',
    urgency: 'CRITICAL',
    actions: [
      { id: 'a4_1', label: 'FBI assumes Unified Command under ESF-13 (Public Safety) — full domestic terrorism investigation', effect: 'coordination', tradeoff: 'Clear chain of command but FBI investigative priorities may conflict with emergency response tempo. Evidence preservation vs. life safety tension.', scores: { threat: 7, civilian: 5, coordination: 9, constitutional: 9 } },
      { id: 'a4_2', label: 'Deploy EPA Emergency Response Team and Army Corps of Engineers for water system restoration', effect: 'civilian', tradeoff: 'Addresses immediate public health crisis but restoration timeline is 5-14 days. Need interim water distribution for 1.8M people.', scores: { threat: 3, civilian: 9, coordination: 7, constitutional: 10 } },
      { id: 'a4_3', label: 'Invoke Insurrection Act — authorize military law enforcement operations in affected region', effect: 'mitigation', tradeoff: 'Maximum force projection but extreme constitutional implications. Last invoked for natural disasters. Sets dangerous precedent. Congressional backlash likely.', scores: { threat: 9, civilian: 6, coordination: 5, constitutional: 1 } },
      { id: 'a4_4', label: 'Emergency mutual aid compacts — surge state and local law enforcement from neighboring jurisdictions', effect: 'coordination', tradeoff: 'Rapid force multiplication without federal overreach. But depletes neighboring jurisdiction capacity — they become vulnerable.', scores: { threat: 6, civilian: 7, coordination: 8, constitutional: 10 } },
    ],
    resourceWeights: { fbi: 25, dhs: 15, fema: 20, local: 20, guard: 15, private: 5 },
    cascadeKey: 'physical_response',
  },
  {
    id: 5,
    time: 'T+30:00',
    title: 'Second Wave Threat — First Responders Targeted',
    classification: 'TOP SECRET // SI // TK // ORCON',
    sitrep: 'NSA SIGINT intercept (shared via FBI) reveals credible intelligence of a planned secondary attack targeting first responder staging areas and hospital emergency departments in the affected region. This is a classic "secondary device" strategy designed to maximize casualties among emergency personnel. Estimated 2-4 hour window before potential execution. Simultaneously, a Sovereign Vanguard manifesto surfaces online, declaring this a "revolution against federal tyranny." Social media amplification creating panic. False reports of additional attacks flooding 911 systems.',
    urgency: 'IMMINENT',
    actions: [
      { id: 'a5_1', label: 'Immediate force protection — relocate all staging areas, harden hospital perimeters, deploy bomb squads', effect: 'civilian', tradeoff: 'Directly protects first responders but disrupts ongoing emergency operations for 2-4 hours. Casualties from interrupted medical care possible.', scores: { threat: 7, civilian: 9, coordination: 6, constitutional: 10 } },
      { id: 'a5_2', label: 'Launch coordinated raids on all known Sovereign Vanguard cells simultaneously', effect: 'mitigation', tradeoff: 'Disrupts the network but intelligence may be incomplete. Some cells unknown. Raids based on SIGINT may face suppression challenges. Risk of armed confrontation.', scores: { threat: 9, civilian: 5, coordination: 7, constitutional: 6 } },
      { id: 'a5_3', label: 'Information operations — strategic communication to counter manifesto, reassure public, request shelter-in-place', effect: 'civilian', tradeoff: 'Controls narrative and reduces panic-driven 911 overload. But shelter-in-place in freezing conditions without power is itself dangerous.', scores: { threat: 4, civilian: 7, coordination: 8, constitutional: 10 } },
      { id: 'a5_4', label: 'Request NORTHCOM deployment of CBRNE response teams under Defense Support to Civil Authorities (DSCA)', effect: 'mitigation', tradeoff: 'Brings specialized military capability but 6-12 hour deployment timeline. May arrive after the threat window closes. Sets expectations for military response to domestic terrorism.', scores: { threat: 6, civilian: 6, coordination: 5, constitutional: 8 } },
    ],
    resourceWeights: { fbi: 20, dhs: 15, fema: 15, local: 25, guard: 20, private: 5 },
    cascadeKey: 'second_wave',
  },
];

// ── Cascade consequences ──────────────────────────────────
const CASCADE_EFFECTS = {
  cyber_prep: {
    good: 'Your early CISA directive and fusion center coordination means grid operators had partial defenses in place. Only 2 of 3 grids fell instead of all 3.',
    bad: 'Without early coordination, grid operators were blindsided. All 3 grids could have fallen — your preparation saved 1.4 million people from blackout.',
    threshold: 15,
  },
  intel_posture: {
    good: 'Strong intelligence posture identified Sovereign Vanguard cell locations before the physical attack. Law enforcement was pre-positioned within 30 minutes of the IED.',
    bad: 'Weak intelligence posture means cell locations are unknown when the physical attack occurs. Identification takes 6+ hours — the perpetrators have scattered.',
    threshold: 14,
  },
  grid_response: {
    good: 'Rapid emergency response and National Guard deployment secured hospitals and water systems before the physical attack. Security cameras were supplemented by posted guards.',
    bad: 'Slow response to the grid failure left critical infrastructure unprotected. The water treatment facility had no security when attackers arrived.',
    threshold: 14,
  },
  physical_response: {
    good: 'Unified command structure and mutual aid compacts enabled rapid force coordination. First responder staging areas were already hardened based on threat analysis.',
    bad: 'Fragmented command structure and resource gaps left first responder staging areas vulnerable. The second wave threat catches you flat-footed.',
    threshold: 15,
  },
  second_wave: {
    good: 'Force protection measures and coordinated raids disrupted the secondary attack. Zero additional casualties. The Sovereign Vanguard network is dismantled within 72 hours.',
    bad: 'The secondary attack partially succeeds, injuring 12 first responders. Remaining cells go underground. Investigation continues for months.',
    threshold: 15,
  },
};

// ── HSEEP Doctrine Reference ──────────────────────────────
const DOCTRINE = [
  { id: 'hseep', title: 'HSEEP', desc: 'Homeland Security Exercise and Evaluation Program — the standard methodology for designing, developing, conducting, and evaluating exercises. Provides a consistent framework for exercise programs across prevention, protection, mitigation, response, and recovery.' },
  { id: 'nims', title: 'NIMS', desc: 'National Incident Management System — provides a systematic, proactive approach to guide all levels of government, NGOs, and the private sector to work together to prevent, protect against, mitigate, respond to, and recover from incidents.' },
  { id: 'ics', title: 'ICS', desc: 'Incident Command System — a standardized on-scene management system designed to enable effective incident management by integrating facilities, equipment, personnel, procedures, and communications within a common organizational structure. Key positions: IC, Operations, Planning, Logistics, Finance/Admin.' },
  { id: 'ppd8', title: 'PPD-8', desc: 'Presidential Policy Directive 8 (National Preparedness) — directs a national preparedness goal, the National Preparedness System, and the five mission areas: Prevention, Protection, Mitigation, Response, Recovery.' },
  { id: 'nrf', title: 'NRF', desc: 'National Response Framework — guides how the nation responds to all types of disasters and emergencies. Built on scalable, flexible, and adaptable concepts identified in NIMS. Organized around Emergency Support Functions (ESFs).' },
  { id: 'stafford', title: 'Stafford Act', desc: 'Robert T. Stafford Disaster Relief and Emergency Assistance Act — the statutory authority for most federal disaster response activities, especially FEMA programs. Requires Presidential declaration for major disaster or emergency.' },
  { id: 'posse', title: 'Posse Comitatus', desc: 'Posse Comitatus Act (18 U.S.C. 1385) — prohibits use of the military for civilian law enforcement unless expressly authorized by the Constitution or Act of Congress. National Guard under state authority (Title 32) is exempt. The Insurrection Act is the primary exception.' },
  { id: 'dsca', title: 'DSCA', desc: 'Defense Support to Civil Authorities — DoD support to U.S. civil authorities for domestic emergencies, law enforcement support, and other domestic activities. Governed by DoDD 3025.18. NORTHCOM is the primary combatant command for DSCA operations.' },
];

const HS_SKILLS = [
  "HSEEP / Tabletop Exercises", "Incident Command System (ICS)",
  "Multi-Agency Coordination", "NIMS Framework",
  "Critical Infrastructure Protection", "Stafford Act / Emergency Declarations",
  "Constitutional Law (4th Amendment)", "FISA / Surveillance Authorities",
  "PPD-8 National Preparedness", "Threat Assessment (DVE)",
];

// ── Scholarly Micro-Content ────────────────────────────────
const HS_TIPS = {
  ics: "ICS (Incident Command System) was born from the 1970 California wildfires, when 16 people died partly because 22 agencies couldn't coordinate. The system's genius is its scalability \u2014 the same structure works for a car accident (1 IC, no sections) and a Category 5 hurricane (full general staff with branches, divisions, and task forces). Unity of command means every person reports to exactly one supervisor. This seems obvious until you've watched a multi-agency response where three different chiefs are giving contradictory orders.",
  posse: "The Posse Comitatus Act (1878) prohibits using federal military forces for domestic law enforcement without Congressional authorization. It was passed after Reconstruction-era abuses where Army troops enforced political control in Southern states. The Act creates a critical tension in homeland security: the military has the best-equipped, most capable response force in the country, but deploying it domestically raises constitutional alarm bells. The Insurrection Act is the narrow legal exception \u2014 and invoking it is a political nuclear option.",
  fusion: "Fusion centers were created post-9/11 to fix the information-sharing failures identified by the 9/11 Commission. There are now 80+ state and major urban area fusion centers. The model: state/local law enforcement shares suspicious activity reports upward; federal agencies share classified threat streams downward (after sanitization). The persistent tension: civil liberties advocates worry about domestic surveillance creep, while IC professionals worry about information moving too slowly through the declassification process.",
  stafford: "The Stafford Act (1988) is the legal backbone of federal disaster response. A presidential disaster declaration triggers FEMA authority, federal funding, and the National Response Framework. But the declaration process is political \u2014 governors must request it, and the threshold for 'major disaster' is subjective. Hurricane Katrina exposed the system's weakness: the declaration came, but the response machinery moved too slowly because FEMA had been reorganized under DHS and stripped of direct White House access.",
};

// ── Component ─────────────────────────────────────────────

function HSAnalysisView({ setView }) {
  const [mode, setMode] = useState('exercise');     // exercise | hotwash | doctrine | ics | risk | interagency
  const [icsSelected, setIcsSelected] = useState(null);
  const [currentInject, setCurrentInject] = useState(0);
  const [selectedActions, setSelectedActions] = useState({});  // {injectId: [actionIds]}
  const [resources, setResources] = useState({});              // {injectId: {agencyId: value}}
  const [completed, setCompleted] = useState(new Set());       // completed inject ids
  const [showAgencyDetail, setShowAgencyDetail] = useState(null);
  const [tipId, setTipId] = useState(null);

  // ── Risk Assessor state ──────────────────────────────────
  const [riskRatings, setRiskRatings] = useState({});
  const [riskRevealed, setRiskRevealed] = useState(false);

  // ── Interagency Coordinator state ────────────────────────
  const [iaRoles, setIaRoles] = useState({});
  const [iaRevealed, setIaRevealed] = useState(false);

  const C = HS_C;

  // Scholarly tooltip renderer
  var TipBox = function(key) {
    if (tipId !== key) return null;
    return React.createElement('div', { style: { padding: '10px 14px', background: 'rgba(10,10,12,.94)', border: '1px solid rgba(204,56,56,.12)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(200,192,192,.7)', lineHeight: 1.65, margin: '6px 0 10px' } }, HS_TIPS[key]);
  };

  // SVG micro-icons for scholarly tooltips
  var ShieldIcon = React.createElement('svg', { width: 20, height: 22, viewBox: '0 0 20 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'ics' ? null : 'ics'); } },
    React.createElement('path', { d: 'M10 2 L2 6 L2 12 Q2 18 10 20 Q18 18 18 12 L18 6Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M7 11 L9 13 L13 9', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' })
  );

  var GavelIcon = React.createElement('svg', { width: 22, height: 20, viewBox: '0 0 22 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'posse' ? null : 'posse'); } },
    React.createElement('rect', { x: 3, y: 4, width: 10, height: 4, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: '.8', transform: 'rotate(-30 8 6)' }),
    React.createElement('line', { x1: 8, y1: 9, x2: 12, y2: 16, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 5, y1: 16, x2: 19, y2: 16, stroke: 'currentColor', strokeWidth: 1.2 })
  );

  var HubIcon = React.createElement('svg', { width: 22, height: 20, viewBox: '0 0 22 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'fusion' ? null : 'fusion'); } },
    React.createElement('circle', { cx: 11, cy: 10, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 4, cy: 4, r: 2, fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('circle', { cx: 18, cy: 4, r: 2, fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('circle', { cx: 4, cy: 16, r: 2, fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('circle', { cx: 18, cy: 16, r: 2, fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('line', { x1: 8.5, y1: 8, x2: 5.5, y2: 5.5, stroke: 'currentColor', strokeWidth: '.5' }),
    React.createElement('line', { x1: 13.5, y1: 8, x2: 16.5, y2: 5.5, stroke: 'currentColor', strokeWidth: '.5' }),
    React.createElement('line', { x1: 8.5, y1: 12, x2: 5.5, y2: 14.5, stroke: 'currentColor', strokeWidth: '.5' }),
    React.createElement('line', { x1: 13.5, y1: 12, x2: 16.5, y2: 14.5, stroke: 'currentColor', strokeWidth: '.5' })
  );

  var BeaconIcon = React.createElement('svg', { width: 20, height: 22, viewBox: '0 0 20 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'stafford' ? null : 'stafford'); } },
    React.createElement('rect', { x: 7, y: 10, width: 6, height: 10, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M4 8 Q10 2 16 8', fill: 'none', stroke: 'currentColor', strokeWidth: '.7' }),
    React.createElement('path', { d: 'M2 6 Q10 -1 18 6', fill: 'none', stroke: 'currentColor', strokeWidth: '.5' }),
    React.createElement('circle', { cx: 10, cy: 8, r: 1.5, fill: 'currentColor', fillOpacity: '.3' })
  );
  const inject = INJECTS[currentInject];

  // ── Resource initialization ────────────────────────────
  // Initialize resources into state on first access so sliders work
  const getResources = useCallback((injectId) => {
    if (resources[injectId]) return resources[injectId];
    const w = INJECTS.find(i => i.id === injectId)?.resourceWeights || {};
    const copy = { ...w };
    // Write initial values into state so slider changes persist
    setResources(prev => {
      if (prev[injectId]) return prev;
      return { ...prev, [injectId]: copy };
    });
    return copy;
  }, [resources]);

  const setResourceForInject = useCallback((injectId, agencyId, value) => {
    setResources(prev => {
      const current = prev[injectId] || { ...INJECTS.find(i => i.id === injectId)?.resourceWeights };
      const old = current[agencyId] || 0;
      const diff = value - old;
      const others = AGENCIES.filter(a => a.id !== agencyId);
      const otherTotal = others.reduce((s, a) => s + (current[a.id] || 0), 0);
      if (otherTotal === 0 && diff > 0) return prev;
      const next = { ...current, [agencyId]: value };
      others.forEach(a => {
        const share = otherTotal > 0 ? (current[a.id] || 0) / otherTotal : 1 / others.length;
        next[a.id] = Math.max(0, Math.round((current[a.id] || 0) - diff * share));
      });
      const total = Object.values(next).reduce((s, v) => s + v, 0);
      if (total !== 100) {
        const largest = others.reduce((best, a) => next[a.id] > (next[best.id] || 0) ? a : best, others[0]);
        next[largest.id] += 100 - total;
      }
      return { ...prev, [injectId]: next };
    });
  }, []);

  const toggleAction = useCallback((injectId, actionId) => {
    setSelectedActions(prev => {
      const current = prev[injectId] || [];
      const has = current.includes(actionId);
      return { ...prev, [injectId]: has ? current.filter(a => a !== actionId) : [...current, actionId] };
    });
  }, []);

  const submitInject = useCallback((injectId) => {
    setCompleted(prev => new Set([...prev, injectId]));
    if (currentInject < INJECTS.length - 1) {
      setCurrentInject(currentInject + 1);
    }
  }, [currentInject]);

  // ── Scoring ────────────────────────────────────────────
  const scores = useMemo(() => {
    let threat = 0, civilian = 0, coordination = 0, constitutional = 0, count = 0;
    for (const injectId of completed) {
      const inj = INJECTS.find(i => i.id === injectId);
      if (!inj) continue;
      const acts = selectedActions[injectId] || [];
      acts.forEach(aId => {
        const action = inj.actions.find(a => a.id === aId);
        if (action) {
          threat += action.scores.threat;
          civilian += action.scores.civilian;
          coordination += action.scores.coordination;
          constitutional += action.scores.constitutional;
          count++;
        }
      });
    }
    if (count === 0) return { threat: 0, civilian: 0, coordination: 0, constitutional: 0, overall: 0 };
    return {
      threat: Math.round(threat / count * 10),
      civilian: Math.round(civilian / count * 10),
      coordination: Math.round(coordination / count * 10),
      constitutional: Math.round(constitutional / count * 10),
      overall: Math.round((threat + civilian + coordination + constitutional) / count / 4 * 10),
    };
  }, [completed, selectedActions]);

  // ── Cascade evaluation ─────────────────────────────────
  const getCascadeResult = useCallback((injectId) => {
    const inj = INJECTS.find(i => i.id === injectId);
    if (!inj || !completed.has(injectId)) return null;
    const acts = selectedActions[injectId] || [];
    let total = 0;
    acts.forEach(aId => {
      const action = inj.actions.find(a => a.id === aId);
      if (action) total += action.scores.threat + action.scores.coordination;
    });
    const cascade = CASCADE_EFFECTS[inj.cascadeKey];
    if (!cascade) return null;
    return total >= cascade.threshold ? cascade.good : cascade.bad;
  }, [completed, selectedActions]);

  // ── Urgency badge color ────────────────────────────────
  const urgencyColor = useCallback((urgency) => {
    switch (urgency) {
      case 'IMMINENT': return C.red;
      case 'CRITICAL': return C.orange;
      case 'HIGH': return C.amber;
      case 'ELEVATED': return C.blue;
      default: return C.tx3;
    }
  }, [C]);

  // ── Render: Exercise Mode ──────────────────────────────
  const renderExercise = () => {
    const res = getResources(inject.id);
    const acts = selectedActions[inject.id] || [];
    const isCompleted = completed.has(inject.id);
    const cascade = getCascadeResult(inject.id);

    return (
      <div>
        {/* Inject timeline */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 20, overflow: 'auto' }}>
          {INJECTS.map((inj, i) => {
            const done = completed.has(inj.id);
            const active = i === currentInject;
            return (
              <button key={inj.id} onClick={() => (done || active) && setCurrentInject(i)} style={{
                flex: 1, padding: '8px 4px', textAlign: 'center',
                background: active ? C.redBg : done ? `${C.green}08` : C.card,
                border: `1px solid ${active ? C.red : done ? `${C.green}30` : C.line}`,
                borderRadius: 4, cursor: (done || active) ? 'pointer' : 'default',
                opacity: (!done && !active) ? 0.4 : 1,
              }}>
                <span style={{ fontFamily: HS_MONO, fontSize: 12, color: active ? C.red : done ? C.green : C.tx3, display: 'block' }}>{inj.time}</span>
                <span style={{ fontFamily: HS_MONO, fontSize: 11, color: active ? C.tx : C.tx2, fontWeight: active ? 600 : 400 }}>INJECT {inj.id}</span>
              </button>
            );
          })}
        </div>

        {/* SITREP card */}
        <div style={{ background: C.card, border: '1px solid rgba(200,140,40,.15)', borderRadius: 1, marginBottom: 16, overflow: 'hidden' }}>
          {/* Caution stripe top */}
          <div style={{ height: 4, background: 'repeating-linear-gradient(45deg, #d8c020 0px, #d8c020 6px, #1a1810 6px, #1a1810 12px)' }} />
          <div style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.red, letterSpacing: '.08em' }}>{inject.time}</span>
                <span style={{ padding: '2px 8px', borderRadius: 1, background: `${urgencyColor(inject.urgency)}15`, border: `1px solid ${urgencyColor(inject.urgency)}40`, fontFamily: HS_MONO, fontSize: 11, color: urgencyColor(inject.urgency), letterSpacing: '.1em' }}>{inject.urgency}</span>
              </div>
              <h2 style={{ fontFamily: HS_MONO, fontSize: 15, fontWeight: 700, color: C.orange, marginTop: 2, letterSpacing: '.04em', textTransform: 'uppercase' }}>{inject.title}</h2>
            </div>
            <span style={{ fontFamily: HS_MONO, fontSize: 11, color: C.redDm, padding: '2px 8px', borderRadius: 1, border: `1px solid ${C.red}30`, background: C.redBg, whiteSpace: 'nowrap', letterSpacing: '.08em' }}>{inject.classification}</span>
          </div>

          {/* Sitrep styled as dispatch message */}
          <div style={{ padding: 12, background: 'rgba(216,128,48,.04)', borderRadius: 1, border: '1px solid rgba(216,128,48,.12)', borderLeft: '4px solid rgba(216,128,48,.4)', marginBottom: 16 }}>
            <p style={{ fontFamily: HS_MONO, fontSize: 11, color: C.orange, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.12em' }}>DISPATCH // SITUATION REPORT</p>
            <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.7 }}>{inject.sitrep}</p>
          </div>

          {/* Scholarly micro-content: ICS near inject sitrep */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, marginBottom: 6 }}>{ShieldIcon}{HubIcon}</span>
          {TipBox('ics')}
          {TipBox('fusion')}

          {/* Cascade from previous inject */}
          {inject.id > 1 && getCascadeResult(inject.id - 1) && (
            <div style={{ padding: 10, background: C.orangeBg, borderRadius: 4, border: `1px solid ${C.orange}30`, marginBottom: 16 }}>
              <p style={{ fontFamily: HS_MONO, fontSize: 12, color: C.orange, marginBottom: 4, textTransform: 'uppercase' }}>CASCADE FROM PREVIOUS DECISIONS</p>
              <p style={{ fontSize: 11, color: C.tx, lineHeight: 1.65 }}>{getCascadeResult(inject.id - 1)}</p>
            </div>
          )}

          {/* Response Actions */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontFamily: HS_MONO, fontSize: 11, color: C.tx3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>RESPONSE OPTIONS (select one or more)</p>
            <div style={{ display: 'grid', gap: 6 }}>
              {inject.actions.map(action => {
                const selected = acts.includes(action.id);
                const constColor = action.scores.constitutional <= 3 ? C.red : action.scores.constitutional <= 6 ? C.amber : C.green;
                return (
                  <button key={action.id} onClick={() => !isCompleted && toggleAction(inject.id, action.id)} style={{
                    textAlign: 'left', padding: 12,
                    background: selected ? C.redBg : 'rgba(255,255,255,.02)',
                    border: `1px solid ${selected ? C.red : C.line}`,
                    borderRadius: 4, cursor: isCompleted ? 'default' : 'pointer', color: C.tx,
                    opacity: isCompleted && !selected ? 0.4 : 1,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontFamily: HS_MONO, fontSize: 11, fontWeight: 600, color: selected ? C.red : C.tx }}>
                        {selected ? '\✓ ' : ''}{action.label}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.65, marginBottom: 6 }}>{action.tradeoff}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.blue }}>THR:{action.scores.threat}</span>
                      <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.green }}>CIV:{action.scores.civilian}</span>
                      <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.amber }}>COD:{action.scores.coordination}</span>
                      <span style={{ fontFamily: HS_MONO, fontSize: 12, color: constColor }}>CON:{action.scores.constitutional}{action.scores.constitutional <= 3 ? ' \⚠' : ''}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Constitutional compliance warning */}
          {acts.some(aId => {
            const action = inject.actions.find(a => a.id === aId);
            return action && action.scores.constitutional <= 3;
          }) && (
            <div style={{ padding: 10, background: `${C.red}08`, borderRadius: 4, border: `1px solid ${C.red}40`, marginBottom: 16 }}>
              <p style={{ fontFamily: HS_MONO, fontSize: 11, color: C.red, marginBottom: 4 }}>CONSTITUTIONAL COMPLIANCE WARNING {GavelIcon}</p>
              <p style={{ fontSize: 11, color: C.tx, lineHeight: 1.65 }}>
                One or more selected actions raise significant constitutional concerns. Fourth Amendment protections, Posse Comitatus Act constraints, or due process requirements may be implicated. In a real exercise, the legal advisor to the Incident Commander would flag this for immediate review. Courts have consistently held that emergency circumstances do not automatically suspend constitutional protections.
              </p>
              {TipBox('posse')}
            </div>
          )}
        </div>

        {/* Resource Allocation */}
        <div style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 6, padding: 20, marginBottom: 16 }}>
          <p style={{ fontFamily: HS_MONO, fontSize: 11, color: C.tx3, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>RESOURCE ALLOCATION (100 points total) {BeaconIcon}</p>
          {TipBox('stafford')}
          <p style={{ fontSize: 12, color: C.tx3, marginBottom: 12 }}>Distribute operational priority across agencies. Increasing one reduces others proportionally.</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {AGENCIES.map(agency => {
              const val = res[agency.id] || 0;
              return (
                <div key={agency.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <button
                      onClick={() => setShowAgencyDetail(showAgencyDetail === agency.id ? null : agency.id)}
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      <span style={{ fontFamily: HS_MONO, fontSize: 12, fontWeight: 600, color: agency.color }}>{agency.name}</span>
                      <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.tx3 }}>{showAgencyDetail === agency.id ? '\▲' : '\▼'}</span>
                    </button>
                    <span style={{ fontFamily: HS_MONO, fontSize: 11, color: C.tx, fontWeight: 700, minWidth: 30, textAlign: 'right' }}>{val}%</span>
                  </div>
                  {showAgencyDetail === agency.id && (
                    <p style={{ fontSize: 12, color: C.tx2, marginBottom: 4, paddingLeft: 4 }}>{agency.role}</p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 6, background: `${agency.color}15`, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
                      <div style={{ height: '100%', width: `${val}%`, background: agency.color, borderRadius: 3, transition: 'width 0.15s' }} />
                    </div>
                    <input
                      type="range" min={0} max={80} value={val}
                      onChange={e => !isCompleted && setResourceForInject(inject.id, agency.id, parseInt(e.target.value))}
                      disabled={isCompleted}
                      style={{ width: 100, accentColor: agency.color, cursor: isCompleted ? 'default' : 'pointer' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit / Advance */}
        {!isCompleted ? (
          <button
            onClick={() => acts.length > 0 && submitInject(inject.id)}
            disabled={acts.length === 0}
            style={{
              padding: '12px 28px', background: acts.length > 0 ? C.red : C.tx3,
              border: 'none', borderRadius: 4, color: '#fff',
              fontFamily: HS_MONO, fontSize: 11, fontWeight: 600,
              cursor: acts.length > 0 ? 'pointer' : 'default',
              opacity: acts.length > 0 ? 1 : 0.5,
            }}
          >
            SUBMIT DECISIONS & ADVANCE
          </button>
        ) : currentInject < INJECTS.length - 1 ? (
          <button
            onClick={() => setCurrentInject(currentInject + 1)}
            style={{ padding: '12px 28px', background: C.orange, border: 'none', borderRadius: 4, color: '#000', fontFamily: HS_MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
          >
            PROCEED TO INJECT {INJECTS[currentInject + 1].id} \→
          </button>
        ) : (
          <button
            onClick={() => setMode('hotwash')}
            style={{ padding: '12px 28px', background: C.green, border: 'none', borderRadius: 4, color: '#000', fontFamily: HS_MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
          >
            EXERCISE COMPLETE \— PROCEED TO HOTWASH
          </button>
        )}

        {/* Cascade result if completed */}
        {isCompleted && cascade && (
          <div style={{ padding: 12, background: C.orangeBg, borderRadius: 1, border: '1px solid rgba(216,128,48,.15)', borderLeft: '4px solid ' + C.orange, marginTop: 12 }}>
            <p style={{ fontFamily: HS_MONO, fontSize: 11, color: C.orange, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.1em' }}>CONSEQUENCE CASCADE</p>
            <p style={{ fontSize: 11, color: C.tx, lineHeight: 1.65 }}>{cascade}</p>
          </div>
        )}
      </div>
      {/* Caution stripe bottom */}
      <div style={{ height: 4, background: 'repeating-linear-gradient(45deg, #d8c020 0px, #d8c020 6px, #1a1810 6px, #1a1810 12px)' }} />
      </div>
    );
  };

  // ── Render: Hotwash Mode ───────────────────────────────
  const renderHotwash = () => {
    const allCompleted = completed.size === INJECTS.length;

    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: HS_MONO, fontSize: 18, fontWeight: 700, color: C.orange, marginBottom: 4 }}>AFTER-ACTION REVIEW / HOTWASH</h2>
          <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6 }}>
            Structured review of exercise performance across four evaluation dimensions per HSEEP methodology.
            {!allCompleted && ' Complete all 5 injects for full scoring.'}
          </p>
        </div>

        {/* Score dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
          {[
            { label: 'THREAT MITIGATION', val: scores.threat, color: C.blue, desc: 'Effectiveness of actions taken to neutralize, disrupt, or degrade the threat' },
            { label: 'CIVILIAN PROTECTION', val: scores.civilian, color: C.green, desc: 'Measures to protect life, property, and public health' },
            { label: 'INTER-AGENCY COORDINATION', val: scores.coordination, color: C.amber, desc: 'Multi-agency synchronization, unity of effort, information sharing' },
            { label: 'CONSTITUTIONAL COMPLIANCE', val: scores.constitutional, color: scores.constitutional >= 70 ? C.green : scores.constitutional >= 40 ? C.amber : C.red, desc: 'Adherence to legal authorities, civil liberties, due process' },
          ].map(metric => (
            <div key={metric.label} style={{ padding: 14, background: C.card, borderRadius: 6, border: `1px solid ${metric.color}20` }}>
              <p style={{ fontFamily: HS_MONO, fontSize: 12, color: metric.color, marginBottom: 6, textTransform: 'uppercase' }}>{metric.label}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span style={{ fontFamily: HS_MONO, fontSize: 24, fontWeight: 700, color: metric.color }}>{metric.val}</span>
                <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.tx3 }}>/100</span>
              </div>
              <div style={{ height: 4, background: `${metric.color}15`, borderRadius: 2, overflow: 'hidden', marginBottom: 6 }}>
                <div style={{ height: '100%', width: `${metric.val}%`, background: metric.color, borderRadius: 2, transition: 'width 0.3s' }} />
              </div>
              <p style={{ fontSize: 11, color: C.tx3, lineHeight: 1.6 }}>{metric.desc}</p>
            </div>
          ))}
        </div>

        {/* Overall score */}
        <div style={{ padding: 16, background: C.card, borderRadius: 6, border: `1px solid ${C.line}`, marginBottom: 20, textAlign: 'center' }}>
          <p style={{ fontFamily: HS_MONO, fontSize: 11, color: C.tx3, marginBottom: 4 }}>OVERALL EXERCISE SCORE</p>
          <span style={{ fontFamily: HS_MONO, fontSize: 36, fontWeight: 700, color: scores.overall >= 70 ? C.green : scores.overall >= 40 ? C.amber : C.red }}>{scores.overall}</span>
          <span style={{ fontFamily: HS_MONO, fontSize: 14, color: C.tx3 }}>/100</span>
          <p style={{ fontSize: 11, color: C.tx2, marginTop: 8, maxWidth: '50ch', margin: '8px auto 0' }}>
            {scores.overall >= 80 ? 'Excellent — decisive leadership, strong coordination, constitutional fidelity maintained under pressure.' :
             scores.overall >= 60 ? 'Proficient — effective response with some gaps in coordination or constitutional awareness.' :
             scores.overall >= 40 ? 'Developing — significant decision-making gaps that would compound in a real event.' :
             'Needs improvement — critical failures in multiple evaluation dimensions.'}
          </p>
        </div>

        {/* Per-inject review */}
        <p style={{ fontFamily: HS_MONO, fontSize: 11, color: C.tx3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>INJECT-BY-INJECT REVIEW</p>
        {INJECTS.map(inj => {
          const acts = selectedActions[inj.id] || [];
          const done = completed.has(inj.id);
          const cascade = getCascadeResult(inj.id);
          return (
            <div key={inj.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 6, padding: 14, marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontFamily: HS_MONO, fontSize: 11, fontWeight: 600, color: done ? C.tx : C.tx3 }}>
                  {inj.time} \— {inj.title}
                </span>
                <span style={{ fontFamily: HS_MONO, fontSize: 12, color: done ? C.green : C.tx3 }}>{done ? 'COMPLETED' : 'SKIPPED'}</span>
              </div>
              {done && (
                <div>
                  <p style={{ fontSize: 12, color: C.tx2, marginBottom: 6 }}>
                    Actions taken: {acts.map(aId => {
                      const a = inj.actions.find(x => x.id === aId);
                      return a ? a.label.split(' \— ')[0].substring(0, 60) : aId;
                    }).join('; ')}
                  </p>
                  {cascade && (
                    <p style={{ fontSize: 12, color: C.orange, lineHeight: 1.6 }}>{cascade}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Resource allocation summary */}
        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 6, padding: 16, marginTop: 12, marginBottom: 20 }}>
          <p style={{ fontFamily: HS_MONO, fontSize: 11, color: C.tx3, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>RESOURCE ALLOCATION PATTERN</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
            {AGENCIES.map(agency => {
              const vals = INJECTS.filter(inj => completed.has(inj.id)).map(inj => {
                const r = resources[inj.id] || inj.resourceWeights;
                return r[agency.id] || 0;
              });
              const avg = vals.length > 0 ? Math.round(vals.reduce((s, v) => s + v, 0) / vals.length) : 0;
              return (
                <div key={agency.id} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: HS_MONO, fontSize: 10, color: agency.color, marginBottom: 4 }}>{agency.name}</p>
                  <div style={{ height: 40, background: `${agency.color}10`, borderRadius: 3, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '70%', height: `${avg}%`, background: agency.color, borderRadius: '3px 3px 0 0', transition: 'height 0.3s' }} />
                  </div>
                  <span style={{ fontFamily: HS_MONO, fontSize: 11, color: C.tx2 }}>{avg}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => { setMode('exercise'); setCurrentInject(0); setSelectedActions({}); setResources({}); setCompleted(new Set()); }}
          style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${C.red}`, borderRadius: 4, color: C.red, fontFamily: HS_MONO, fontSize: 12, cursor: 'pointer', marginRight: 8 }}
        >
          RESTART EXERCISE
        </button>
        <button
          onClick={() => setMode('doctrine')}
          style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${C.blue}`, borderRadius: 4, color: C.blue, fontFamily: HS_MONO, fontSize: 12, cursor: 'pointer' }}
        >
          VIEW DOCTRINE REFERENCE
        </button>
      </div>
    );
  };

  // ── Render: Doctrine Mode ──────────────────────────────
  // ── ICS Org Chart SVG ─────────────────────────────────
  const renderICSChart = () => {
    const nodes = [
      { id: 'ic', label: 'Incident\nCommander', x: 350, y: 30, w: 120, h: 50, color: C.red, desc: 'Overall incident authority. Establishes objectives, manages resources, ensures safety. Reports to Agency Administrator/EOC.', children: ['pio','safety','liaison'] },
      { id: 'pio', label: 'Public\nInformation', x: 100, y: 110, w: 110, h: 40, color: C.amber, desc: 'Manages media, develops messaging, coordinates JIC. Single point of contact for public communications.', children: [] },
      { id: 'safety', label: 'Safety\nOfficer', x: 280, y: 110, w: 110, h: 40, color: C.amber, desc: 'Monitors safety conditions, develops safety plan, has authority to stop unsafe operations. Reports directly to IC.', children: [] },
      { id: 'liaison', label: 'Liaison\nOfficer', x: 460, y: 110, w: 110, h: 40, color: C.amber, desc: 'Coordinates with assisting/cooperating agencies. Primary contact for agency representatives.', children: [] },
      { id: 'ops', label: 'Operations\nSection Chief', x: 50, y: 200, w: 130, h: 45, color: C.orange, desc: 'Directs all tactical operations. Manages branches, divisions, groups, and task forces conducting field operations.', children: ['ops_b1','ops_b2'] },
      { id: 'plan', label: 'Planning\nSection Chief', x: 210, y: 200, w: 130, h: 45, color: C.blue, desc: 'Collects/analyzes information, prepares IAP, maintains resource status, provides technical specialists.', children: ['plan_b1','plan_b2'] },
      { id: 'log', label: 'Logistics\nSection Chief', x: 370, y: 200, w: 130, h: 45, color: C.green, desc: 'Provides facilities, transportation, supplies, equipment, food, medical, and communications support.', children: ['log_b1','log_b2'] },
      { id: 'fin', label: 'Finance/Admin\nSection Chief', x: 530, y: 200, w: 130, h: 45, color: C.cyan, desc: 'Tracks costs, manages procurement, processes time records, handles injury compensation and claims.', children: ['fin_b1','fin_b2'] },
      // Branches
      { id: 'ops_b1', label: 'Branches\n& Divisions', x: 20, y: 290, w: 100, h: 36, color: C.orange, desc: 'Geographic or functional branches managing field operations divisions.', children: [] },
      { id: 'ops_b2', label: 'Strike Teams\n& Task Forces', x: 130, y: 290, w: 100, h: 36, color: C.orange, desc: 'Tactical-level resources organized by function (strike teams) or mixed composition (task forces).', children: [] },
      { id: 'plan_b1', label: 'Situation\nUnit', x: 195, y: 290, w: 80, h: 36, color: C.blue, desc: 'Collects, processes, and organizes incident information. Prepares situation displays and summaries.', children: [] },
      { id: 'plan_b2', label: 'Resources\nUnit', x: 280, y: 290, w: 80, h: 36, color: C.blue, desc: 'Maintains master list of all resources, their status, and assignment.', children: [] },
      { id: 'log_b1', label: 'Service\nBranch', x: 370, y: 290, w: 80, h: 36, color: C.green, desc: 'Communications, medical, food services for all incident personnel.', children: [] },
      { id: 'log_b2', label: 'Support\nBranch', x: 455, y: 290, w: 80, h: 36, color: C.green, desc: 'Supply, facilities, ground support (vehicles, fueling).', children: [] },
      { id: 'fin_b1', label: 'Time\nUnit', x: 540, y: 290, w: 75, h: 36, color: C.cyan, desc: 'Records time for all personnel and equipment at the incident.', children: [] },
      { id: 'fin_b2', label: 'Procurement\nUnit', x: 620, y: 290, w: 80, h: 36, color: C.cyan, desc: 'Administers financial matters, vendor contracts, and equipment rental.', children: [] },
    ];

    // Determine which ICS positions were activated by user decisions
    // NOTE: computed inline (not useMemo) because this runs inside renderICSChart, not a component
    const active = new Set(['ic']); // IC always active
    for (const injectId of completed) {
      const acts = selectedActions[injectId] || [];
      if (acts.length > 0) {
        active.add('ops'); active.add('ops_b1');
      }
      active.add('plan'); active.add('plan_b1');
      const res = getResources(injectId);
      if (res && Object.values(res).some(v => v > 0)) {
        active.add('log'); active.add('log_b1'); active.add('log_b2');
      }
      if (completed.has(injectId)) {
        active.add('fin'); active.add('fin_b1');
      }
      if (acts.length > 1) active.add('liaison');
      if (acts.length > 0) active.add('safety');
      if (acts.length >= 3) active.add('pio');
    }
    if (completed.size >= 2) { active.add('ops_b2'); active.add('plan_b2'); active.add('fin_b2'); }
    const activatedPositions = active;

    // Edges: parent -> child
    const edges = [];
    nodes.forEach(n => {
      if (n.children) n.children.forEach(cid => {
        const child = nodes.find(c => c.id === cid);
        if (child) edges.push({ from: n, to: child });
      });
    });
    // Also connect IC to section chiefs
    ['ops','plan','log','fin'].forEach(sid => {
      const ic = nodes.find(n => n.id === 'ic');
      const sec = nodes.find(n => n.id === sid);
      if (ic && sec) edges.push({ from: ic, to: sec });
    });

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontFamily: HS_MONO, fontSize: 18, fontWeight: 700, color: C.green, marginBottom: 4 }}>ICS ORGANIZATIONAL CHART {ShieldIcon}</h2>
          <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6, maxWidth: '65ch' }}>
            The Incident Command System (ICS) organizational structure for Operation GRAY DAWN. Positions highlighted in white were activated by your exercise decisions. Click any position for role details.
          </p>
          {TipBox('ics')}
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 8, padding: 16, overflowX: 'auto' }}>
          <svg viewBox="0 0 700 350" style={{ width: '100%', minWidth: 600, display: 'block' }}>
            {/* Edges */}
            {edges.map((e, i) => {
              const fx = e.from.x + e.from.w / 2;
              const fy = e.from.y + e.from.h;
              const tx = e.to.x + e.to.w / 2;
              const ty = e.to.y;
              const midY = (fy + ty) / 2;
              return (
                <path key={i}
                  d={`M${fx},${fy} C${fx},${midY} ${tx},${midY} ${tx},${ty}`}
                  fill="none" stroke={C.tx3 + '40'} strokeWidth={1.2}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map(n => {
              const isActive = activatedPositions.has(n.id);
              const isSel = icsSelected === n.id;
              return (
                <g key={n.id} style={{ cursor: 'pointer' }} onClick={() => setIcsSelected(isSel ? null : n.id)}>
                  <rect x={n.x} y={n.y} width={n.w} height={n.h}
                    rx={4} ry={4}
                    fill={isActive ? n.color + '25' : n.color + '08'}
                    stroke={isSel ? '#ffffff' : isActive ? n.color : n.color + '40'}
                    strokeWidth={isSel ? 2 : isActive ? 1.5 : 0.8}
                  />
                  {/* Active indicator dot */}
                  {isActive && (
                    <circle cx={n.x + n.w - 8} cy={n.y + 8} r={3} fill={n.color} />
                  )}
                  {/* Label (split by newline) */}
                  {n.label.split('\n').map((line, li) => (
                    <text key={li} x={n.x + n.w / 2} y={n.y + (n.h / 2) + (li - (n.label.split('\n').length - 1) / 2) * 12}
                      fill={isActive ? C.tx : C.tx3}
                      textAnchor="middle" dominantBaseline="middle"
                      style={{ fontSize: n.h > 40 ? 9 : 8, fontFamily: "'IBM Plex Mono',monospace", fontWeight: isActive ? 600 : 400 }}>
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>

          {/* Selected node detail panel */}
          {icsSelected && (() => {
            const sel = nodes.find(n => n.id === icsSelected);
            if (!sel) return null;
            const isActive = activatedPositions.has(sel.id);
            return (
              <div style={{ marginTop: 12, padding: 12, borderRadius: 6, border: `1px solid ${sel.color}40`, background: sel.color + '08' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontFamily: HS_MONO, fontSize: 12, fontWeight: 700, color: sel.color }}>
                    {sel.label.replace('\n', ' ')}
                  </span>
                  <span style={{ fontFamily: HS_MONO, fontSize: 11, color: isActive ? C.green : C.tx3, padding: '2px 6px', borderRadius: 3, background: isActive ? C.greenBg : 'transparent', border: `1px solid ${isActive ? C.green : C.tx3}30` }}>
                    {isActive ? 'ACTIVATED' : 'NOT ACTIVATED'}
                  </span>
                </div>
                <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.65 }}>{sel.desc}</p>
              </div>
            );
          })()}

          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.tx3, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, display: 'inline-block' }}></span> Activated by your decisions
            </span>
            <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.tx3, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 10, height: 10, border: `1px solid ${C.tx3}40`, borderRadius: 2, display: 'inline-block' }}></span> Not yet activated
            </span>
            <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.tx3 }}>
              {activatedPositions.size}/{nodes.length} positions active
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderDoctrine = () => (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: HS_MONO, fontSize: 18, fontWeight: 700, color: C.blue, marginBottom: 4 }}>DOCTRINE & LEGAL REFERENCE {ShieldIcon}{GavelIcon}{BeaconIcon}{HubIcon}</h2>
        <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6 }}>
          Key frameworks governing homeland security exercise design and emergency response authority.
        </p>
        {TipBox('ics')}
        {TipBox('posse')}
        {TipBox('stafford')}
        {TipBox('fusion')}
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        {DOCTRINE.map(doc => (
          <div key={doc.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 6, padding: 14 }}>
            <h3 style={{ fontFamily: HS_MONO, fontSize: 13, fontWeight: 700, color: C.blue, marginBottom: 6 }}>{doc.title}</h3>
            <p style={{ fontSize: 11, color: C.tx, lineHeight: 1.6 }}>{doc.desc}</p>
          </div>
        ))}
      </div>

      {/* ICS Structure diagram */}
      <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 6, padding: 16, marginTop: 12 }}>
        <p style={{ fontFamily: HS_MONO, fontSize: 11, color: C.amber, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>ICS ORGANIZATIONAL STRUCTURE</p>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', background: C.redBg, border: `1px solid ${C.red}40`, borderRadius: 4, fontFamily: HS_MONO, fontSize: 12, color: C.red, fontWeight: 700 }}>INCIDENT COMMANDER</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 8 }}>
          {['Public Information Officer', 'Safety Officer', 'Liaison Officer'].map(role => (
            <span key={role} style={{ padding: '4px 8px', background: `${C.amber}08`, border: `1px solid ${C.amber}20`, borderRadius: 3, fontFamily: HS_MONO, fontSize: 12, color: C.amber }}>{role}</span>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 8 }}>
          {[
            { title: 'Operations', color: C.red, items: ['Branches', 'Divisions/Groups', 'Strike Teams', 'Task Forces'] },
            { title: 'Planning', color: C.blue, items: ['Situation Unit', 'Resources Unit', 'Documentation', 'Demobilization'] },
            { title: 'Logistics', color: C.amber, items: ['Service Branch', 'Support Branch', 'Communications', 'Medical Unit'] },
            { title: 'Finance/Admin', color: C.green, items: ['Time Unit', 'Procurement', 'Cost Unit', 'Claims Unit'] },
          ].map(section => (
            <div key={section.title} style={{ padding: 8, background: `${section.color}06`, border: `1px solid ${section.color}20`, borderRadius: 4 }}>
              <p style={{ fontFamily: HS_MONO, fontSize: 11, color: section.color, fontWeight: 700, marginBottom: 4 }}>{section.title}</p>
              {section.items.map(item => (
                <p key={item} style={{ fontFamily: HS_MONO, fontSize: 10, color: C.tx3, marginBottom: 1 }}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ESF Reference */}
      <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 6, padding: 16, marginTop: 12 }}>
        <p style={{ fontFamily: HS_MONO, fontSize: 11, color: C.green, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>EMERGENCY SUPPORT FUNCTIONS (ESFs) REFERENCED IN THIS EXERCISE</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[
            { num: 'ESF-1', name: 'Transportation', lead: 'DOT' },
            { num: 'ESF-2', name: 'Communications', lead: 'DHS/CISA' },
            { num: 'ESF-3', name: 'Public Works & Engineering', lead: 'USACE' },
            { num: 'ESF-6', name: 'Mass Care & Sheltering', lead: 'FEMA' },
            { num: 'ESF-8', name: 'Public Health & Medical', lead: 'HHS' },
            { num: 'ESF-10', name: 'Hazardous Materials', lead: 'EPA' },
            { num: 'ESF-12', name: 'Energy', lead: 'DOE' },
            { num: 'ESF-13', name: 'Public Safety & Security', lead: 'DOJ/ATF' },
          ].map(esf => (
            <div key={esf.num} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span style={{ fontFamily: HS_MONO, fontSize: 11, color: C.green, fontWeight: 600, minWidth: 44 }}>{esf.num}</span>
              <span style={{ fontSize: 12, color: C.tx2 }}>{esf.name}</span>
              <span style={{ fontFamily: HS_MONO, fontSize: 10, color: C.tx3, marginLeft: 'auto' }}>{esf.lead}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setMode('exercise')}
        style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${C.red}`, borderRadius: 4, color: C.red, fontFamily: HS_MONO, fontSize: 12, cursor: 'pointer', marginTop: 16 }}
      >
        RETURN TO EXERCISE
      </button>
    </div>
  );

  // ── Main render ────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: HS_SANS, position: 'relative' }}>
      {React.createElement(EOCBeacon)}
      {/* Top bar — EOC command strip */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,8,8,.96)', backdropFilter: 'blur(12px)', borderBottom: '2px solid rgba(200,140,40,.2)', padding: '0' }}>
        <div style={{ height: 3, background: 'repeating-linear-gradient(90deg, #d88030 0px, #d88030 40px, transparent 40px, transparent 44px)' }} />
        <div style={{ padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setView('coursework')} style={{ background: 'none', border: 'none', color: C.tx3, fontFamily: HS_MONO, fontSize: 11, cursor: 'pointer' }}>\<- Back</button>
          <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.orange, letterSpacing: '.12em' }}>EOC // MPAI 6745 // HOMELAND SECURITY & INTELLIGENCE</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {['exercise', 'hotwash', 'doctrine', 'ics', 'risk', 'interagency'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: '4px 10px', borderRadius: 1,
                background: mode === m ? (m === 'exercise' ? C.redBg : m === 'hotwash' ? C.orangeBg : m === 'ics' ? C.greenBg : m === 'risk' ? C.amberBg : m === 'interagency' ? C.blueBg : C.blueBg) : 'transparent',
                border: `1px solid ${mode === m ? (m === 'exercise' ? C.red : m === 'hotwash' ? C.orange : m === 'ics' ? C.green : m === 'risk' ? C.amber : m === 'interagency' ? C.cyan : C.blue) : C.line}`,
                color: mode === m ? (m === 'exercise' ? C.red : m === 'hotwash' ? C.orange : m === 'ics' ? C.green : m === 'risk' ? C.amber : m === 'interagency' ? C.cyan : C.blue) : C.tx3,
                fontFamily: HS_MONO, fontSize: 10, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '.08em',
              }}>
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* DEFCON indicator */}
        {React.createElement(DEFCONIndicator, { level: 3 })}

        {/* Hero — EOC briefing header */}
        <div style={{ marginBottom: 24 }}>
          {React.createElement(CautionStripe, null,
            React.createElement('h1', { style: { fontFamily: HS_MONO, fontSize: 22, fontWeight: 700, color: C.orange, letterSpacing: '.04em', marginBottom: 4, textTransform: 'uppercase' } }, 'EMERGENCY OPERATIONS CENTER // Red Team TTX Simulator'),
            React.createElement('p', { style: { fontFamily: HS_MONO, fontSize: 13, color: C.red, marginBottom: 8, letterSpacing: '.1em' } }, 'OPERATION GRAY DAWN'),
            React.createElement('p', { style: { fontSize: 13, color: C.tx2, lineHeight: 1.6, maxWidth: '65ch' } }, 'You are the Exercise Director managing a multi-agency response to a coordinated cyber-physical attack. A domestic extremist network is executing a cascading assault: cyber attacks on power infrastructure, followed by physical attacks on water systems, with a secondary wave targeting first responders. Every decision has consequences. Resources are finite. The Constitution still applies.'),
          )}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
            {HS_SKILLS.map(s => (
              <span key={s} style={{ padding: '3px 8px', borderRadius: 1, background: 'rgba(216,128,48,.06)', border: '1px solid rgba(216,128,48,.15)', fontSize: 10, fontFamily: HS_MONO, color: C.orange, letterSpacing: '.06em' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Score bar — EOC resource board style */}
        {mode === 'exercise' && completed.size > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginBottom: 16 }}>
            {[
              { label: 'THREAT NEUTRALIZATION', val: scores.threat, color: C.blue },
              { label: 'CIVILIAN PROTECTION', val: scores.civilian, color: C.green },
              { label: 'INTER-AGENCY COORD', val: scores.coordination, color: C.amber },
              { label: 'CONSTITUTIONAL', val: scores.constitutional, color: scores.constitutional >= 70 ? C.green : scores.constitutional >= 40 ? C.amber : C.red },
            ].map(m => (
              <div key={m.label} style={{ padding: 10, background: C.card, borderRadius: 1, border: `1px solid ${m.color}25`, borderTop: `3px solid ${m.color}` }}>
                <p style={{ fontFamily: HS_MONO, fontSize: 9, color: m.color, marginBottom: 4, letterSpacing: '.1em' }}>{m.label}</p>
                <div style={{ height: 6, background: `${m.color}12`, borderRadius: 1, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${m.val}%`, background: m.color, borderRadius: 1, transition: 'width 0.3s' }} />
                </div>
                <span style={{ fontFamily: HS_MONO, fontSize: 14, color: m.color, fontWeight: 700 }}>{m.val}</span>
              </div>
            ))}
          </div>
        )}

        {/* Mode content */}
        {mode === 'exercise' && renderExercise()}
        {mode === 'hotwash' && renderHotwash()}
        {mode === 'doctrine' && renderDoctrine()}
        {mode === 'ics' && renderICSChart()}

        {/* ════════════════════════════════════════════════ */}
        {/* RISK MODE — Critical Infrastructure Risk Assessor */}
        {/* ════════════════════════════════════════════════ */}
        {mode === 'risk' && (() => {
          var RISK_SECTORS = [
            { id: 'energy', name: 'Energy', desc: 'Power generation, transmission, oil/gas pipelines, fuel supply', dhs: { threat: 75, vuln: 65, consequence: 90 } },
            { id: 'water', name: 'Water & Wastewater', desc: 'Drinking water systems, wastewater treatment, dams', dhs: { threat: 55, vuln: 70, consequence: 80 } },
            { id: 'telecom', name: 'Communications', desc: 'Telecommunications, internet backbone, broadcast media', dhs: { threat: 70, vuln: 60, consequence: 75 } },
            { id: 'financial', name: 'Financial Services', desc: 'Banking, securities, insurance, payment systems', dhs: { threat: 80, vuln: 45, consequence: 85 } },
            { id: 'transport', name: 'Transportation', desc: 'Aviation, rail, maritime, highway, mass transit', dhs: { threat: 65, vuln: 55, consequence: 70 } },
            { id: 'health', name: 'Healthcare & Public Health', desc: 'Hospitals, pharmaceutical supply chain, pandemic response', dhs: { threat: 60, vuln: 75, consequence: 85 } },
          ];
          var RISK_DIMS = [
            { id: 'threat', label: 'Threat Likelihood', desc: 'How likely is a deliberate attack or natural hazard affecting this sector?' },
            { id: 'vuln', label: 'Vulnerability', desc: 'How exposed is the sector to attack? Consider physical security, cyber hygiene, and redundancy.' },
            { id: 'consequence', label: 'Consequence', desc: 'What is the cascading impact if this sector is disrupted? Consider deaths, economic damage, and second-order effects.' },
          ];

          var allRated = RISK_SECTORS.every(function(s) { return riskRatings[s.id] && RISK_DIMS.every(function(d) { return riskRatings[s.id][d.id] !== undefined; }); });

          return (
            <div>
              <div style={{ padding: 16, background: C.card, border: `1px solid ${C.cardBd}`, borderTop: `3px solid ${C.amber}`, marginBottom: 16, borderRadius: 1 }}>
                <div style={{ fontFamily: HS_MONO, fontSize: 11, color: C.amber, letterSpacing: '.12em', marginBottom: 8 }}>CRITICAL INFRASTRUCTURE RISK ASSESSOR</div>
                <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.7, marginBottom: 16 }}>
                  Rate each of the 6 critical infrastructure sectors on three dimensions: threat likelihood, vulnerability, and consequence. The composite risk score follows the DHS National Infrastructure Protection Plan (NIPP) risk equation: Risk = Threat x Vulnerability x Consequence. Compare your assessment to DHS baseline ratings.
                </p>

                {RISK_SECTORS.map(function(sector) {
                  var ratings = riskRatings[sector.id] || {};
                  var composite = (ratings.threat || 0) * (ratings.vuln || 0) * (ratings.consequence || 0) / 10000;
                  var dhsComposite = sector.dhs.threat * sector.dhs.vuln * sector.dhs.consequence / 10000;
                  var riskColor = composite >= 40 ? C.red : composite >= 20 ? C.amber : C.green;

                  return (
                    <div key={sector.id} style={{ padding: 12, marginBottom: 8, background: 'rgba(0,0,0,.15)', border: `1px solid ${C.line}`, borderRadius: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <div>
                          <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.tx, fontWeight: 600 }}>{sector.name}</span>
                          <span style={{ fontSize: 11, color: C.tx3, marginLeft: 8 }}>{sector.desc}</span>
                        </div>
                        <span style={{ fontFamily: HS_MONO, fontSize: 14, color: riskColor, fontWeight: 700 }}>{composite.toFixed(1)}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                        {RISK_DIMS.map(function(dim) {
                          var val = ratings[dim.id] || 50;
                          var dimColor = val >= 70 ? C.red : val >= 40 ? C.amber : C.green;
                          return (
                            <div key={dim.id}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                <span style={{ fontFamily: HS_MONO, fontSize: 9, color: C.tx3 }}>{dim.label}</span>
                                <span style={{ fontFamily: HS_MONO, fontSize: 10, color: dimColor }}>{val}</span>
                              </div>
                              <input type="range" min={0} max={100} value={val} disabled={riskRevealed}
                                onChange={function(e) {
                                  var nv = parseInt(e.target.value);
                                  setRiskRatings(function(prev) {
                                    var c = Object.assign({}, prev);
                                    if (!c[sector.id]) c[sector.id] = {};
                                    c[sector.id] = Object.assign({}, c[sector.id]);
                                    c[sector.id][dim.id] = nv;
                                    return c;
                                  });
                                }}
                                style={{ width: '100%', accentColor: dimColor, cursor: riskRevealed ? 'default' : 'pointer' }}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {riskRevealed && (
                        <div style={{ marginTop: 8, paddingTop: 6, borderTop: `1px solid ${C.line}`, display: 'flex', gap: 16 }}>
                          <span style={{ fontFamily: HS_MONO, fontSize: 10, color: C.tx3 }}>DHS Baseline: T={sector.dhs.threat} V={sector.dhs.vuln} C={sector.dhs.consequence}</span>
                          <span style={{ fontFamily: HS_MONO, fontSize: 10, color: C.amber }}>DHS Risk: {dhsComposite.toFixed(1)}</span>
                          <span style={{ fontFamily: HS_MONO, fontSize: 10, color: Math.abs(composite - dhsComposite) < 10 ? C.green : C.red }}>Delta: {(composite - dhsComposite).toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {!riskRevealed && (
                  <button onClick={function() { if (allRated) setRiskRevealed(true); }}
                    style={{
                      marginTop: 12, padding: '8px 20px', fontFamily: HS_MONO, fontSize: 11,
                      cursor: allRated ? 'pointer' : 'not-allowed',
                      background: allRated ? C.amberBg : 'transparent',
                      border: `1px solid ${allRated ? C.amber : C.line}`,
                      color: allRated ? C.amber : C.tx3, borderRadius: 1,
                    }}>
                    Compare to DHS NIPP Baseline
                  </button>
                )}

                {riskRevealed && (
                  <div style={{ marginTop: 12 }}>
                    <button onClick={function() { setRiskRatings({}); setRiskRevealed(false); }}
                      style={{ padding: '6px 14px', fontFamily: HS_MONO, fontSize: 10, background: 'transparent', border: `1px solid ${C.amber}`, color: C.amber, cursor: 'pointer', borderRadius: 1 }}>
                      Reset Assessment
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ════════════════════════════════════════════════ */}
        {/* INTERAGENCY MODE — Coordination Simulator        */}
        {/* ════════════════════════════════════════════════ */}
        {mode === 'interagency' && (() => {
          var IA_SCENARIO = {
            name: 'Hurricane-Induced Chemical Plant Explosion',
            desc: 'A Category 4 hurricane has struck the Texas Gulf Coast. Storm surge has breached containment at a petrochemical facility, causing an explosion and releasing chlorine gas. 50,000 residents are in the evacuation zone. Three first responders are injured. A foreign national working at the plant is missing and may have sabotaged containment — FBI is assessing.',
          };
          var IA_AGENCIES = [
            { id: 'fbi', name: 'FBI', authorities: ['PDD-39 (lead for crisis management of terrorism)', '28 CFR Part 0.85 (WMD/CBRN investigation authority)', 'National Security Letters'], desc: 'Federal Bureau of Investigation. Lead federal agency for crisis management in terrorism/sabotage scenarios under PDD-39. Investigative and intelligence authority.' },
            { id: 'dhs', name: 'DHS/FEMA', authorities: ['Stafford Act (disaster declarations)', 'HSPD-5 (domestic incident management)', 'National Response Framework'], desc: 'Department of Homeland Security / FEMA. Consequence management lead under HSPD-5. Coordinates federal support to state/local authorities via ESFs.' },
            { id: 'fema', name: 'FEMA (Regional)', authorities: ['Stafford Act Section 502 (federal assistance)', 'ESF #5 (Emergency Management)', 'Defense Production Act (resource allocation)'], desc: 'FEMA Regional Administrator. Coordinates emergency support functions, manages federal assistance, activates regional response teams.' },
            { id: 'dod', name: 'DoD (NORTHCOM)', authorities: ['Posse Comitatus Act LIMITATIONS', 'DSCA / DoDD 3025.18 (defense support)', 'Insurrection Act (10 USC 251-255) — presidential authority only'], desc: 'U.S. Northern Command. Provides defense support to civil authorities. CANNOT enforce civil law (Posse Comitatus). Requires SecDef approval for most actions.' },
            { id: 'local', name: 'State/Local (TX Governor)', authorities: ['10th Amendment (police powers)', 'Texas Division of Emergency Management', 'National Guard (state active duty — under Governor)'], desc: 'Texas Governor and state emergency management. State has primary responsibility under federalism. Governor controls National Guard in state active duty status.' },
          ];
          var ROLE_OPTIONS = ['Lead Agency', 'Support Agency'];
          var CORRECT_ROLES = {
            fbi: 'Lead Agency',     // PDD-39: FBI leads crisis management when sabotage suspected
            dhs: 'Support Agency',  // HSPD-5: DHS coordinates consequence management
            fema: 'Support Agency', // Stafford Act: FEMA supports under DHS coordination
            dod: 'Support Agency',  // DSCA: DoD supports, never leads (Posse Comitatus)
            local: 'Lead Agency',   // Federalism: state has primary authority; FBI leads federal piece
          };
          var DOCTRINAL_NOTES = {
            fbi: 'Under PDD-39, the FBI is the lead federal agency for crisis management when a terrorist or sabotage nexus is suspected. The missing foreign national triggers this authority. FBI leads the investigation while DHS/FEMA manages consequence management.',
            dhs: 'Under HSPD-5 and the National Response Framework, DHS coordinates the overall federal response for consequence management. However, when a terrorism nexus exists, the FBI assumes lead for the crisis management component. DHS/FEMA handles the disaster response piece.',
            fema: 'FEMA activates Emergency Support Functions under the NRF. The Stafford Act governs disaster declarations and federal assistance. FEMA does not "lead" — it coordinates federal support to the state. The Governor must request a declaration.',
            dod: 'DoD provides defense support to civil authorities (DSCA) but is strictly prohibited from law enforcement under the Posse Comitatus Act. The Insurrection Act allows the President to use military for law enforcement, but this is an extreme measure not applicable here. National Guard in state active duty (under Governor) is not subject to Posse Comitatus.',
            local: 'Under the 10th Amendment, the state has primary responsibility for public safety. The Governor controls the Texas National Guard in state active duty status. Federal agencies support but do not supplant state authority unless the state requests or a federal crime is involved.',
          };

          var allAssigned = IA_AGENCIES.every(function(a) { return iaRoles[a.id]; });
          var correct = iaRevealed ? IA_AGENCIES.filter(function(a) { return iaRoles[a.id] === CORRECT_ROLES[a.id]; }).length : 0;

          return (
            <div>
              <div style={{ padding: 16, background: C.card, border: `1px solid ${C.cardBd}`, borderTop: `3px solid ${C.cyan}`, marginBottom: 16, borderRadius: 1 }}>
                <div style={{ fontFamily: HS_MONO, fontSize: 11, color: C.cyan, letterSpacing: '.12em', marginBottom: 8 }}>INTERAGENCY COORDINATION SIMULATOR</div>
                <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.7, marginBottom: 12 }}>
                  Read the crisis scenario below. For each of the 5 agencies, assign either "Lead Agency" or "Support Agency" based on which agency has legal authority for this specific scenario. Then see which agency actually has doctrinal authority under Stafford Act, PDD-39, and HSPD-5.
                </p>

                {/* Scenario briefing */}
                <div style={{ padding: 12, background: C.redBg, border: `1px solid ${C.red}30`, marginBottom: 16, borderRadius: 1 }}>
                  <div style={{ fontFamily: HS_MONO, fontSize: 10, color: C.red, letterSpacing: '.1em', marginBottom: 6 }}>SCENARIO: {IA_SCENARIO.name.toUpperCase()}</div>
                  <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.7 }}>{IA_SCENARIO.desc}</p>
                </div>

                {/* Agency role assignment */}
                {IA_AGENCIES.map(function(agency) {
                  var userRole = iaRoles[agency.id];
                  var isCorrect = iaRevealed && userRole === CORRECT_ROLES[agency.id];
                  return (
                    <div key={agency.id} style={{ padding: 12, marginBottom: 8, background: iaRevealed ? (isCorrect ? C.greenBg : C.redBg) : 'rgba(0,0,0,.15)', border: `1px solid ${iaRevealed ? (isCorrect ? C.green + '30' : C.red + '30') : C.line}`, borderRadius: 1 }}>
                      <div style={{ marginBottom: 6 }}>
                        <span style={{ fontFamily: HS_MONO, fontSize: 12, color: C.tx, fontWeight: 700 }}>{agency.name}</span>
                        <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.5, marginTop: 2 }}>{agency.desc}</p>
                      </div>

                      {/* Authorities */}
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                        {agency.authorities.map(function(auth) {
                          return (
                            <span key={auth} style={{ padding: '2px 6px', fontFamily: HS_MONO, fontSize: 8, background: C.amberBg, border: `1px solid ${C.amber}20`, color: C.amber, borderRadius: 1 }}>{auth}</span>
                          );
                        })}
                      </div>

                      {/* Role selector */}
                      <div style={{ display: 'flex', gap: 4 }}>
                        {ROLE_OPTIONS.map(function(role) {
                          var selected = userRole === role;
                          return (
                            <button key={role} onClick={function() { if (!iaRevealed) setIaRoles(function(prev) { var c = Object.assign({}, prev); c[agency.id] = role; return c; }); }}
                              style={{
                                padding: '4px 12px', fontFamily: HS_MONO, fontSize: 10, cursor: iaRevealed ? 'default' : 'pointer',
                                background: selected ? (role === 'Lead Agency' ? C.redBg : C.blueBg) : 'transparent',
                                border: `1px solid ${selected ? (role === 'Lead Agency' ? C.red : C.blue) : C.line}`,
                                color: selected ? (role === 'Lead Agency' ? C.red : C.blue) : C.tx3, borderRadius: 1,
                              }}>
                              {role}
                            </button>
                          );
                        })}
                      </div>

                      {iaRevealed && (
                        <div style={{ marginTop: 8, paddingTop: 6, borderTop: `1px solid ${C.line}` }}>
                          <div style={{ fontFamily: HS_MONO, fontSize: 10, color: isCorrect ? C.green : C.red, fontWeight: 700, marginBottom: 4 }}>
                            {isCorrect ? 'CORRECT' : 'INCORRECT — Doctrinal role: ' + CORRECT_ROLES[agency.id]}
                          </div>
                          <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6 }}>{DOCTRINAL_NOTES[agency.id]}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {!iaRevealed && (
                  <button onClick={function() { if (allAssigned) setIaRevealed(true); }}
                    disabled={!allAssigned}
                    style={{
                      marginTop: 12, padding: '8px 20px', fontFamily: HS_MONO, fontSize: 11,
                      cursor: allAssigned ? 'pointer' : 'not-allowed',
                      background: allAssigned ? 'rgba(64,160,176,.08)' : 'transparent',
                      border: `1px solid ${allAssigned ? C.cyan : C.line}`,
                      color: allAssigned ? C.cyan : C.tx3, borderRadius: 1,
                    }}>
                    {allAssigned ? 'Check Against Doctrine' : 'Assign all 5 agencies (' + Object.keys(iaRoles).length + '/5)'}
                  </button>
                )}

                {iaRevealed && (
                  <div style={{ marginTop: 16, padding: 14, background: 'rgba(0,0,0,.2)', border: `1px solid ${C.line}`, borderRadius: 1 }}>
                    <div style={{ fontFamily: HS_MONO, fontSize: 12, color: C.cyan, fontWeight: 700, marginBottom: 8 }}>DOCTRINAL ACCURACY: {correct}/{IA_AGENCIES.length}</div>
                    <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.6 }}>
                      {correct === 5 ? 'Perfect understanding of interagency authorities. You correctly identified the dual-lead structure (FBI for crisis management, state for primary response) and the support roles of DHS/FEMA, DoD, and other agencies.' : correct >= 3 ? 'Partial understanding. The key insight is that multiple agencies can hold "lead" authority for different aspects of the same crisis — FBI leads investigation while the state leads emergency response.' : 'Review the legal authorities carefully. The most common error is assuming a single lead agency. In practice, the Stafford Act, PDD-39, and HSPD-5 create overlapping authorities that must be coordinated, not unified under one command.'}
                    </p>
                    <button onClick={function() { setIaRoles({}); setIaRevealed(false); }}
                      style={{ marginTop: 8, padding: '6px 14px', fontFamily: HS_MONO, fontSize: 10, background: 'transparent', border: `1px solid ${C.cyan}`, color: C.cyan, cursor: 'pointer', borderRadius: 1 }}>
                      Reset Simulation
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Provenance strip */}
        <div style={{ marginTop: 40, paddingTop: 16, borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontFamily: HS_MONO, fontSize: 12, color: C.tx3, lineHeight: 1.6 }}>
            PROVENANCE: Scenario design informed by FEMA Homeland Security Exercise and Evaluation Program (HSEEP), National Incident Management System (NIMS), Incident Command System (ICS), Presidential Policy Directive 8 (PPD-8) National Preparedness, National Response Framework (NRF), Stafford Act, Posse Comitatus Act (18 U.S.C. 1385), Defense Support to Civil Authorities (DSCA / DoDD 3025.18). Constitutional analysis references Fourth Amendment case law, FISA authorities, and the Insurrection Act. All scenario elements are fictional. No classified information is represented.
          </p>
        </div>
      </div>
    </div>
  );
}
