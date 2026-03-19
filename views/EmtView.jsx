// EmtView.jsx — Triage Simulator
// Emergency Medical Technician (SOMAC)
// "START Triage Protocol — Multi-Casualty Incident"
//
// Interactive triage simulation: 8 patients arrive at a mass casualty
// incident. Visitor must rapidly categorize each using the START protocol.
// Three modes: Triage (the simulation), Protocol (START algorithm reference),
// and Debrief (scoring and lessons learned).
// Self-contained React component. Globals: useState, useCallback, useMemo

// ── Palette: Emergency red on dark ──────────────────────────
const C = {
  bg:      '#0a0606',
  card:    'rgba(20,10,10,.94)',
  cardBd:  'rgba(204,32,32,.18)',
  tx:      '#e0d4cc',
  tx2:     '#b4a49c',
  tx3:     '#8b7b73',
  accent:  '#cc2020',
  accentDm:'#a01818',
  accentBg:'rgba(204,32,32,.08)',
  red:     '#cc2020',
  redDm:   '#a01818',
  redBg:   'rgba(204,32,32,.10)',
  yellow:  '#c8a820',
  yellowDm:'#a08818',
  yellowBg:'rgba(200,168,32,.10)',
  green:   '#30a848',
  greenDm: '#208030',
  greenBg: 'rgba(48,168,72,.10)',
  black:   '#606060',
  blackDm: '#404040',
  blackBg: 'rgba(96,96,96,.10)',
  blue:    '#0057b7',
  blueDm:  '#004090',
  blueBg:  'rgba(0,87,183,.08)',
  line:    'rgba(204,32,32,.10)',
  ecgGlow: 'rgba(204,32,32,.06)',
  starOfLife: '#0057b7',
};
const Mono  = "'IBM Plex Mono',monospace";
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";

// ── SVG Background Elements ────────────────────────────────
const StarOfLifeSVG = () => (
  <svg width="280" height="280" viewBox="0 0 100 100" style={{
    position:'fixed', bottom:40, right:40, opacity:0.03, pointerEvents:'none', zIndex:0,
  }}>
    <g fill="#cc2020" transform="translate(50,50)">
      {[0,60,120,180,240,300].map(a => (
        <rect key={a} x="-8" y="-48" width="16" height="40" rx="3"
          transform={`rotate(${a})`} />
      ))}
      <circle cx="0" cy="0" r="14" fill="none" stroke="#cc2020" strokeWidth="2.5" />
      <path d="M-5,-8 L0,-12 L5,-8 L5,2 L8,5 L0,12 L-8,5 L-5,2 Z" fill="#cc2020" />
    </g>
  </svg>
);

const EcgPattern = () => (
  <svg width="100%" height="60" viewBox="0 0 800 60" preserveAspectRatio="none" style={{
    position:'absolute', bottom:0, left:0, right:0, opacity:0.07, pointerEvents:'none',
  }}>
    <polyline fill="none" stroke="#cc2020" strokeWidth="1.5"
      points="0,30 80,30 100,30 120,28 140,30 160,30 180,30 200,10 210,50 220,5 230,55 240,30 260,30 280,30 300,28 320,30 340,30 380,30 400,30 420,28 440,30 460,30 480,30 500,10 510,50 520,5 530,55 540,30 560,30 580,30 600,28 620,30 640,30 680,30 700,30 720,28 740,30 760,30 800,30"
    />
  </svg>
);

// ── Card wrapper with clipboard/medical chart feel ──────────
const MedicalCard = ({ children, style = {}, triageColor }) => (
  <div style={{
    background: C.card, border: '1px solid ' + C.cardBd,
    borderRadius: '2px 8px 8px 8px', padding: 28, position: 'relative',
    borderTop: triageColor ? '3px solid ' + triageColor : '3px solid ' + C.accent,
    boxShadow: '0 2px 12px rgba(0,0,0,.3), inset 0 1px 0 rgba(204,32,32,.05)',
    ...style,
  }}>
    {/* Clipboard clip decoration */}
    <div style={{
      position:'absolute', top:-8, left:24, width:40, height:14,
      background:'rgba(204,32,32,.15)', borderRadius:'3px 3px 0 0',
      border:'1px solid rgba(204,32,32,.2)', borderBottom:'none',
    }} />
    {children}
  </div>
);

// ── Skills ───────────────────────────────────────────────────
const SKILLS = [
  'START Triage Protocol',
  'Mass Casualty Incident Management',
  'Patient Assessment (ABCs)',
  'Vital Signs Interpretation',
  'Scene Safety & BSI',
  'Field Documentation',
  'Emergency Communications',
  'Rapid Decision-Making Under Pressure',
];

// ── Provenance ───────────────────────────────────────────────
const PROVENANCE = [
  { label: 'NREMT', desc: 'National Registry EMT Curriculum' },
  { label: 'START Triage', desc: 'Simple Triage & Rapid Treatment' },
  { label: 'SOMAC', desc: 'South Orange Maplewood Ambulance Corps' },
  { label: 'FEMA/CERT', desc: 'Community Emergency Response Team' },
];

// ── Triage Category Definitions ─────────────────────────────
const CATEGORIES = {
  immediate: { label: 'IMMEDIATE', color: C.red, colorDm: C.redDm, bg: C.redBg, tag: 'RED', priority: 'P1' },
  delayed:   { label: 'DELAYED', color: C.yellow, colorDm: C.yellowDm, bg: C.yellowBg, tag: 'YELLOW', priority: 'P2' },
  minor:     { label: 'MINOR', color: C.green, colorDm: C.greenDm, bg: C.greenBg, tag: 'GREEN', priority: 'P3' },
  expectant: { label: 'EXPECTANT', color: C.black, colorDm: C.blackDm, bg: C.blackBg, tag: 'BLACK', priority: 'P4' },
};

// ── Patient Data ─────────────────────────────────────────────
const PATIENTS = [
  {
    id: 1,
    scene: 'Multi-vehicle pileup on Route 78. You are first on scene.',
    description: 'Male, approx. 45 years old, ejected from vehicle. Lying 20 feet from wreckage.',
    canWalk: false,
    breathing: true,
    respRate: 34,
    radialPulse: false,
    mentalStatus: 'Responds to verbal commands but confused',
    vitals: { hr: 128, bp: '80/50', spo2: '88%', skin: 'Cool, pale, diaphoretic' },
    injuries: 'Open femur fracture, significant blood loss, abdominal guarding',
    correct: 'immediate',
    rationale: 'Cannot walk. Breathing but RR >30 = IMMEDIATE. High respiratory rate indicates shock. Open femur fracture with signs of hemorrhagic shock (tachycardia, hypotension, cool/pale skin). This patient needs immediate surgical intervention to survive.',
  },
  {
    id: 2,
    scene: 'Passenger found still belted in back seat of crushed sedan.',
    description: 'Female, approx. 30 years old, conscious and alert.',
    canWalk: false,
    breathing: true,
    respRate: 20,
    radialPulse: true,
    mentalStatus: 'Alert, oriented x4, follows commands',
    vitals: { hr: 92, bp: '128/82', spo2: '97%', skin: 'Warm, dry, normal color' },
    injuries: 'Suspected ankle fracture, 3cm laceration on forehead (controlled bleeding)',
    correct: 'delayed',
    rationale: 'Cannot walk (ankle injury). Breathing with RR <30. Radial pulse present (adequate perfusion). Follows commands. Injuries are significant but not immediately life-threatening. Classified as DELAYED — needs treatment but can wait for immediate patients first.',
  },
  {
    id: 3,
    scene: 'Driver of pickup truck, standing outside vehicle near guardrail.',
    description: 'Male, approx. 55 years old, ambulatory, holding right arm.',
    canWalk: true,
    breathing: true,
    respRate: 18,
    radialPulse: true,
    mentalStatus: 'Alert, oriented, anxious but coherent',
    vitals: { hr: 88, bp: '140/90', spo2: '98%', skin: 'Warm, dry' },
    injuries: 'Possible right wrist fracture (Colles type), minor abrasions',
    correct: 'minor',
    rationale: 'CAN WALK = MINOR (Green). Per START protocol, any patient who can walk is automatically classified as minor regardless of other findings. This patient has stable vitals and a non-life-threatening extremity injury. Direct to walking wounded collection point.',
  },
  {
    id: 4,
    scene: 'Motorcyclist found under overturned vehicle.',
    description: 'Male, approx. 25 years old, not moving. Helmet cracked.',
    canWalk: false,
    breathing: false,
    respRate: 0,
    radialPulse: false,
    mentalStatus: 'Unresponsive',
    vitals: { hr: 0, bp: '--/--', spo2: '--', skin: 'Cool, cyanotic' },
    injuries: 'Massive head trauma, open skull fracture, brain matter visible',
    correct: 'expectant',
    rationale: 'Cannot walk. NOT breathing. After repositioning airway — still not breathing. In MCI triage, if a patient is not breathing after airway repositioning, they are classified EXPECTANT (Black). With massive head trauma and no signs of life, resources must be directed to salvageable patients. This is the hardest decision in triage.',
  },
  {
    id: 5,
    scene: 'Passenger in minivan, found in back seat.',
    description: 'Child, approx. 8 years old, crying loudly.',
    canWalk: true,
    breathing: true,
    respRate: 24,
    radialPulse: true,
    mentalStatus: 'Alert, crying, following commands when asked',
    vitals: { hr: 110, bp: '100/70', spo2: '99%', skin: 'Warm, flushed from crying' },
    injuries: 'Seatbelt abrasion across chest, no deformity, moves all extremities',
    correct: 'minor',
    rationale: 'CAN WALK = MINOR (Green). Child is ambulatory, alert, and crying (excellent sign — it means patent airway and adequate breathing). Elevated HR is age-appropriate and expected with fear/pain. Seatbelt sign warrants monitoring but in MCI triage, walking patients are GREEN.',
  },
  {
    id: 6,
    scene: 'Driver of compact car, pinned behind steering wheel. Airbag deployed.',
    description: 'Female, approx. 60 years old, alert but in severe distress.',
    canWalk: false,
    breathing: true,
    respRate: 28,
    radialPulse: true,
    mentalStatus: 'Alert but confused about date/time. Follows commands.',
    vitals: { hr: 108, bp: '100/68', spo2: '93%', skin: 'Pale, diaphoretic' },
    injuries: 'Steering wheel deformity to chest, suspected flail chest left side, paradoxical movement visible',
    correct: 'immediate',
    rationale: 'Cannot walk. Breathing with RR <30. Radial pulse present. BUT — altered mental status (confused about date/time, does not follow commands accurately). Per START: if patient cannot follow simple commands, classify as IMMEDIATE. Additionally, flail chest is a life-threatening injury requiring immediate intervention. SpO2 of 93% indicates compromised oxygenation.',
  },
  {
    id: 7,
    scene: 'Bystander who was walking on shoulder when vehicles collided.',
    description: 'Female, approx. 35 years old, sitting on ground near barrier.',
    canWalk: true,
    breathing: true,
    respRate: 16,
    radialPulse: true,
    mentalStatus: 'Alert, oriented, slightly shaken',
    vitals: { hr: 78, bp: '118/76', spo2: '99%', skin: 'Warm, dry, normal' },
    injuries: 'Minor scrape on knee from falling, no other complaints',
    correct: 'minor',
    rationale: 'CAN WALK = MINOR (Green). Bystander with minor injuries only. Stable vitals, alert, oriented. Direct to walking wounded area. May be useful as a helper for other minor patients if willing.',
  },
  {
    id: 8,
    scene: 'Truck driver found slumped over steering wheel.',
    description: 'Male, approx. 50 years old, groaning intermittently.',
    canWalk: false,
    breathing: true,
    respRate: 8,
    radialPulse: true,
    mentalStatus: 'Responds to pain only. Does not follow commands.',
    vitals: { hr: 58, bp: '90/54', spo2: '85%', skin: 'Cool, pale, slow capillary refill' },
    injuries: 'Suspected traumatic brain injury (unequal pupils), steering wheel impact to chest',
    correct: 'immediate',
    rationale: 'Cannot walk. Breathing but RR <10 is dangerously low (hypoventilation). While START technically classifies based on RR >30 or absent, an RR of 8 with only pain response and unequal pupils indicates severe TBI with potential brainstem involvement. Patient does not follow commands = IMMEDIATE. Needs immediate airway management and neurosurgical intervention.',
  },
];

// ── START Protocol Steps ─────────────────────────────────────
const PROTOCOL_STEPS = [
  {
    step: 1,
    title: 'Can the patient WALK?',
    detail: 'Direct all walking wounded to a designated collection area. Any patient who can walk under their own power is classified GREEN (Minor) regardless of their injuries. This rapidly separates the majority of patients in most MCIs.',
    yes: 'GREEN — Minor (P3)',
    no: 'Proceed to Step 2',
  },
  {
    step: 2,
    title: 'Is the patient BREATHING?',
    detail: 'Check for spontaneous breathing. If not breathing, reposition the airway (head-tilt/chin-lift or jaw thrust). If the patient begins breathing after airway repositioning, classify as IMMEDIATE. If still not breathing after repositioning, classify as EXPECTANT.',
    yes: 'Proceed to Step 3',
    no: 'Reposition airway. Breathing now? → RED (Immediate). Still not breathing? → BLACK (Expectant)',
  },
  {
    step: 3,
    title: 'What is the RESPIRATORY RATE?',
    detail: 'Count respirations for 15 seconds and multiply by 4. A respiratory rate greater than 30 breaths per minute indicates respiratory distress — likely shock, pain, or pulmonary injury. Classify as IMMEDIATE.',
    yes: 'RR > 30 → RED (Immediate)',
    no: 'RR ≤ 30 → Proceed to Step 4',
  },
  {
    step: 4,
    title: 'Check PERFUSION (Radial Pulse / Cap Refill)',
    detail: 'Check for radial pulse (if absent, systolic BP is likely below 80mmHg). Alternatively, check capillary refill — press nail bed and release. If refill takes >2 seconds, perfusion is inadequate. Absent radial pulse or delayed cap refill = IMMEDIATE.',
    yes: 'No radial pulse / CRT > 2s → RED (Immediate)',
    no: 'Pulse present / CRT ≤ 2s → Proceed to Step 5',
  },
  {
    step: 5,
    title: 'Check MENTAL STATUS',
    detail: 'Give a simple command: "Squeeze my fingers" or "Open your eyes." If the patient cannot follow simple commands, they have altered mental status indicating potential head injury, shock, or hypoxia. Classify as IMMEDIATE.',
    yes: 'Cannot follow commands → RED (Immediate)',
    no: 'Follows commands → YELLOW (Delayed)',
  },
];

// ── Scholarly Micro-Content Tooltips ─────────────────────────
const EMT_TIPS = {
  start_protocol: "The START triage system (Simple Triage and Rapid Treatment) was developed in 1983 by the Newport Beach Fire Department and Hoag Hospital \u2014 the first standardized mass casualty sorting system. Before START, triage decisions varied wildly by provider, creating inconsistent outcomes across incidents. The protocol reduces complex medical assessment to three binary checks (walking, breathing, perfusion) that any trained responder can execute in under 30 seconds per patient. Its genius is that it sacrifices diagnostic precision for speed and consistency \u2014 exactly the right trade-off when you have 40 patients and 3 ambulances.",
  golden_hour: "R. Adams Cowley's 'golden hour' concept transformed emergency medicine \u2014 trauma patients who receive definitive surgical care within 60 minutes of injury have dramatically better survival rates. This single insight drove the development of helicopter medevac programs, regionalized trauma center networks, and the entire modern EMS system design. The irony is that Cowley's original data was limited, but the concept proved so powerful as an organizing principle that it reshaped healthcare infrastructure worldwide. The 'hour' is not a precise cutoff but a forcing function for system design.",
  scope_of_practice: "EMT scope-of-practice limitations exist for patient safety, not bureaucratic convenience. An EMT who attempts endotracheal intubation without paramedic training risks esophageal intubation \u2014 placing the tube in the stomach instead of the trachea \u2014 which is rapidly fatal. The scope boundary is drawn at the competency line, not the confidence line. This distinction matters: a confident but undertrained provider is more dangerous than an uncertain but properly trained one. The hardest moment in EMS is recognizing that doing nothing beyond your scope is sometimes the best patient care.",
};

// ── Component ────────────────────────────────────────────────
function EmtView({ setView }) {
  const [mode, setMode] = useState('triage');
  const [currentPatient, setCurrentPatient] = useState(0);
  const [decisions, setDecisions] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [expandedStep, setExpandedStep] = useState(null);
  const [triageStarted, setTriageStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [tipId, setTipId] = useState(null);

  // ── Scholarly Micro-Icons & Tooltip ──────────────────────────
  function Tip({ id }) {
    if (tipId !== id || !EMT_TIPS[id]) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(10,8,8,.92)', border: '1px solid ' + C.accent + '25', borderRadius: 3, maxWidth: 440, fontSize: 11, fontFamily: Mono, color: C.tx2, lineHeight: 1.65, margin: '6px 0 10px' }}>
        {EMT_TIPS[id]}
      </div>
    );
  }

  const StartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='start_protocol'?null:'start_protocol')}>
      <path d="M3 11 L11 3 L19 11 L11 19 Z" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <line x1="7" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth=".5"/>
      <line x1="11" y1="7" x2="11" y2="15" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const ClockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='golden_hour'?null:'golden_hour')}>
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <line x1="10" y1="10" x2="10" y2="5" stroke="currentColor" strokeWidth=".7"/>
      <line x1="10" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth=".7"/>
      <circle cx="10" cy="10" r="1" fill="currentColor" fillOpacity=".3"/>
    </svg>
  );

  const ScopeIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='scope_of_practice'?null:'scope_of_practice')}>
      <rect x="3" y="3" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth=".5" strokeDasharray="2 1"/>
      <path d="M8 7 L14 7 L14 15 L8 15 Z" fill="currentColor" fillOpacity=".06" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  // Score calculation
  const score = useMemo(() => {
    let correct = 0;
    let total = 0;
    Object.keys(decisions).forEach(k => {
      total++;
      if (decisions[k] === PATIENTS[parseInt(k)].correct) correct++;
    });
    return { correct, total, pct: total > 0 ? Math.round((correct / total) * 100) : 0 };
  }, [decisions]);

  const allTriaged = useMemo(() => Object.keys(decisions).length === 8, [decisions]);

  // Start triage
  const handleStart = useCallback(() => {
    setTriageStarted(true);
    setStartTime(Date.now());
    setDecisions({});
    setCurrentPatient(0);
    setShowResult(false);
    setShowDebrief(false);
  }, []);

  // Make triage decision
  const handleDecision = useCallback((category) => {
    setDecisions(prev => ({ ...prev, [currentPatient]: category }));
    setShowResult(true);
  }, [currentPatient]);

  // Next patient
  const handleNext = useCallback(() => {
    if (currentPatient < 7) {
      setCurrentPatient(prev => prev + 1);
      setShowResult(false);
    } else {
      setEndTime(Date.now());
      setShowDebrief(true);
    }
  }, [currentPatient]);

  // Time taken
  const elapsedSec = useMemo(() => {
    if (!startTime) return 0;
    const end = endTime || Date.now();
    return Math.round((end - startTime) / 1000);
  }, [startTime, endTime]);

  // Performance grade
  const grade = useMemo(() => {
    if (!allTriaged) return null;
    const pct = score.pct;
    const fast = elapsedSec < 180;
    if (pct === 100 && fast) return { label: 'EXCEPTIONAL', color: C.green, note: 'Perfect accuracy under 3 minutes. You would save the most lives.' };
    if (pct >= 88) return { label: 'PROFICIENT', color: C.green, note: 'Strong triage skills. Minor adjustments needed.' };
    if (pct >= 63) return { label: 'DEVELOPING', color: C.yellow, note: 'Core concepts understood but critical errors present. Review START protocol.' };
    return { label: 'NEEDS REVIEW', color: C.red, note: 'Multiple classification errors. In a real MCI, this costs lives. Study the START algorithm.' };
  }, [allTriaged, score, elapsedSec]);

  // ── Mode Switch ─────────────────────────────────────────────
  const ModeSwitch = useCallback(() => {
    const modes = [
      { id: 'triage', label: 'Triage', desc: '8-Patient MCI' },
      { id: 'protocol', label: 'Protocol', desc: 'START Algorithm' },
      { id: 'flowchart', label: 'Flowchart', desc: 'SVG Decision Tree' },
      { id: 'debrief', label: 'Debrief', desc: 'Score & Analysis' },
    ];
    return (
      <div style={{ display: 'flex', gap: 2, marginBottom: 24 }}>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1, padding: '10px 12px', cursor: 'pointer',
              background: mode === m.id ? 'rgba(204,32,32,.12)' : 'rgba(18,10,10,.6)',
              border: mode === m.id ? '1px solid rgba(204,32,32,.35)' : '1px solid rgba(204,32,32,.08)',
              borderBottom: mode === m.id ? '2px solid ' + C.accent : '2px solid transparent',
              borderRadius: '4px 4px 0 0',
              textAlign: 'center', transition: 'all .15s ease',
            }}
          >
            <span style={{
              fontFamily: Mono, fontSize: 11, fontWeight: 700,
              color: mode === m.id ? C.accent : C.tx3, display: 'block',
              letterSpacing: '.05em',
            }}>
              {m.label}
            </span>
            <span style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{m.desc}</span>
          </button>
        ))}
      </div>
    );
  }, [mode]);

  // ── Triage Renderer ──────────────────────────────────────────
  const renderTriage = useCallback(() => {
    if (!triageStarted) {
      return (
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: '2px 8px 8px 8px', padding: 32, textAlign: 'center',
          borderTop: '3px solid ' + C.accent, position:'relative',
          boxShadow: '0 2px 12px rgba(0,0,0,.3)',
        }}>
          {/* Red flashing bar at top */}
          <div style={{
            position:'absolute', top:0, left:0, right:0, height:3,
            background: 'linear-gradient(90deg, ' + C.red + ', ' + C.redDm + ', ' + C.red + ')',
          }} />
          <div style={{
            fontFamily: Mono, fontSize: 12, letterSpacing: '.1em',
            color: C.accent, marginBottom: 12, fontWeight:700,
          }}>
            MASS CASUALTY INCIDENT {'\u2014'} ROUTE 78 MULTI-VEHICLE PILEUP
          </div>
          <div style={{
            fontFamily: Serif, fontSize: 22, fontWeight: 700,
            color: C.tx, marginBottom: 16,
          }}>
            8 Patients Awaiting Triage
          </div>
          <div style={{
            fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.7,
            maxWidth: 560, margin: '0 auto 24px',
          }}>
            You are the first EMT on scene. EMS command has designated you as triage officer.
            Your job: rapidly assess each patient using the START protocol and assign a triage
            category. You will be scored on accuracy and speed. In a real MCI, every second of
            delay can cost a life.
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8, maxWidth: 520, margin: '0 auto 28px',
          }}>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <div key={key} style={{
                background: cat.bg, border: '2px solid ' + cat.color,
                borderRadius: 4, padding: '10px 4px', textAlign: 'center',
                boxShadow: '0 0 8px ' + cat.color + '22',
                borderTop: '4px solid ' + cat.color,
              }}>
                <div style={{ fontFamily: Mono, fontSize: 14, fontWeight: 800, color: cat.color, letterSpacing:'.08em' }}>
                  {cat.tag}
                </div>
                <div style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, marginTop: 3 }}>
                  {cat.priority} {'\u2014'} {cat.label}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleStart}
            style={{
              padding: '14px 36px', borderRadius: 6, cursor: 'pointer',
              background: C.accentBg, border: '1px solid ' + C.accent,
              color: C.accent, fontFamily: Mono, fontSize: 13,
              letterSpacing: '.04em', transition: 'all .15s ease',
            }}
          >
            BEGIN TRIAGE
          </button>
        </div>
      );
    }

    if (showDebrief) {
      setMode('debrief');
      return null;
    }

    const pt = PATIENTS[currentPatient];
    const decision = decisions[currentPatient];
    const isCorrect = decision === pt.correct;
    const catInfo = decision ? CATEGORIES[decision] : null;
    const correctCat = CATEGORIES[pt.correct];

    return (
      <div>
        {/* Progress bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
          fontFamily: Mono, fontSize: 12, color: C.tx3,
        }}>
          <span>PATIENT {currentPatient + 1} OF 8</span>
          <div style={{ flex: 1, maxWidth: 240, height: 4, background: C.line, borderRadius: 2 }}>
            <div style={{
              width: ((currentPatient + (showResult ? 1 : 0)) / 8 * 100) + '%',
              height: '100%', borderRadius: 2, background: C.accent,
              transition: 'width .3s ease',
            }} />
          </div>
          <span style={{ color: C.accent }}>{Object.keys(decisions).length}/8</span>
          <span style={{ marginLeft: 8, color: C.tx3 }}>{elapsedSec}s</span>
        </div>

        {/* Patient card — medical assessment form styling */}
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: '2px 8px 8px 8px', padding: 28, marginBottom: 16,
          borderTop: '3px solid ' + C.accent, position:'relative',
          boxShadow: '0 2px 12px rgba(0,0,0,.3), inset 0 1px 0 rgba(204,32,32,.05)',
        }}>
          {/* Clipboard clip */}
          <div style={{
            position:'absolute', top:-8, left:24, width:40, height:14,
            background:'rgba(204,32,32,.15)', borderRadius:'3px 3px 0 0',
            border:'1px solid rgba(204,32,32,.2)', borderBottom:'none',
          }} />
          {/* Scene */}
          <div style={{
            fontFamily: Mono, fontSize: 11, letterSpacing: '.1em',
            color: C.accent, marginBottom: 6, fontWeight:600,
            borderBottom: '1px dashed rgba(204,32,32,.15)', paddingBottom:6,
          }}>
            SCENE SIZE-UP
          </div>
          <div style={{
            fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6,
            marginBottom: 16, paddingLeft: 14, borderLeft: '3px solid ' + C.line,
          }}>
            {pt.scene}
          </div>

          {/* Patient description */}
          <div style={{
            fontFamily: Serif, fontSize: 18, fontWeight: 600,
            color: C.tx, marginBottom: 16,
          }}>
            Patient #{pt.id}: {pt.description}
          </div>

          {/* Assessment findings grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 10, marginBottom: 20,
          }}>
            {[
              { label: 'AMBULATORY', value: pt.canWalk ? 'Yes — patient can walk' : 'No — patient cannot walk' },
              { label: 'BREATHING', value: pt.breathing ? `Yes — RR: ${pt.respRate}/min` : 'No respirations detected' },
              { label: 'RADIAL PULSE', value: pt.radialPulse ? 'Present' : 'Absent' },
              { label: 'MENTAL STATUS', value: pt.mentalStatus },
            ].map(item => (
              <div key={item.label} style={{
                background: C.accentBg, borderRadius: 6, padding: '10px 14px',
                border: '1px solid ' + C.line,
              }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                  color: C.accentDm, marginBottom: 4,
                }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.65 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Vitals row */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16,
          }}>
            {[
              { label: 'HR', value: pt.vitals.hr || '--' },
              { label: 'BP', value: pt.vitals.bp },
              { label: 'SpO2', value: pt.vitals.spo2 },
            ].map(v => (
              <div key={v.label} style={{
                fontFamily: Mono, fontSize: 11, color: C.tx2,
                padding: '4px 10px', background: C.accentBg, borderRadius: 4,
              }}>
                <span style={{ color: C.tx3, fontSize: 11 }}>{v.label} </span>{v.value}
              </div>
            ))}
          </div>

          {/* Skin/Injuries */}
          <div style={{
            fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6,
            marginBottom: 20,
          }}>
            <strong style={{ color: C.tx }}>Skin:</strong> {pt.vitals.skin}<br/>
            <strong style={{ color: C.tx }}>Injuries:</strong> {pt.injuries}
          </div>

          {/* Decision buttons or result */}
          {!showResult ? (
            <div>
              <div style={{
                fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
                color: C.accent, marginBottom: 12, fontWeight: 600,
              }}>
                YOUR TRIAGE DECISION:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => handleDecision(key)}
                    style={{
                      padding: '14px 16px', borderRadius: 6, cursor: 'pointer',
                      background: cat.bg, border: '1px solid ' + cat.colorDm,
                      textAlign: 'center', transition: 'all .15s ease',
                    }}
                  >
                    <div style={{
                      fontFamily: Mono, fontSize: 13, fontWeight: 700, color: cat.color,
                    }}>
                      {cat.tag}
                    </div>
                    <div style={{
                      fontFamily: Sans, fontSize: 11, color: C.tx3, marginTop: 2,
                    }}>
                      {cat.label} ({cat.priority})
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Result */}
              <div style={{
                background: isCorrect ? C.greenBg : C.redBg,
                border: '1px solid ' + (isCorrect ? C.greenDm : C.redDm),
                borderRadius: 6, padding: 16, marginBottom: 16,
              }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, fontWeight: 700,
                  color: isCorrect ? C.green : C.red, marginBottom: 8,
                }}>
                  {isCorrect ? '\✓ CORRECT' : '\✗ INCORRECT'}
                  {!isCorrect && ` — You tagged ${catInfo.tag}, correct answer is ${correctCat.tag}`}
                </div>
                <div style={{
                  fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.7,
                }}>
                  {pt.rationale}
                </div>
              </div>

              <button
                onClick={handleNext}
                style={{
                  width: '100%', padding: '12px 20px', borderRadius: 6, cursor: 'pointer',
                  background: C.accentBg, border: '1px solid ' + C.accentDm,
                  color: C.accent, fontFamily: Mono, fontSize: 12,
                  letterSpacing: '.04em', transition: 'all .15s ease',
                }}
              >
                {currentPatient < 7 ? 'NEXT PATIENT \→' : 'VIEW DEBRIEF'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }, [triageStarted, currentPatient, decisions, showResult, showDebrief, elapsedSec, handleStart, handleDecision, handleNext, mode]);

  // ── Protocol Renderer ─────────────────────────────────────
  const renderProtocol = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.08em',
          color: C.accent, marginBottom: 6, fontWeight:700,
          padding:'6px 12px', background:'rgba(204,32,32,.08)',
          border:'1px solid rgba(204,32,32,.15)', borderRadius:3,
          display:'inline-block',
        }}>
          START TRIAGE PROTOCOL {'\u2014'} FIELD REFERENCE
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          START (Simple Triage and Rapid Treatment) was developed by staff at Hoag Hospital and the
          Newport Beach Fire Department in 1983. It is the most widely used MCI triage system in the
          United States. The algorithm is designed to be completed in under 60 seconds per patient,
          using only basic assessment skills that any first responder can perform.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 12px' }}>
          <ClockIcon /><Tip id="golden_hour" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PROTOCOL_STEPS.map(step => {
            const isOpen = expandedStep === step.step;
            return (
              <div key={step.step} style={{
                background: C.card, border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
                borderRadius: 4, overflow: 'hidden', transition: 'border-color .15s ease',
                borderLeft: '4px solid ' + (isOpen ? C.accent : 'rgba(204,32,32,.2)'),
                boxShadow: isOpen ? '0 0 12px rgba(204,32,32,.08)' : 'none',
              }}>
                <button
                  onClick={() => setExpandedStep(prev => prev === step.step ? null : step.step)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 16, width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.accentBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                    fontFamily: Mono, fontWeight: 700, color: C.accent,
                  }}>
                    {step.step}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 16, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {step.title}
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
                    padding: '0 20px 20px', borderTop: '1px solid ' + C.line, paddingTop: 16,
                  }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
                      marginBottom: 16,
                    }}>
                      {step.detail}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div style={{
                        background: C.greenBg, borderRadius: 6, padding: '10px 14px',
                        border: '1px solid ' + C.greenDm,
                      }}>
                        <div style={{ fontFamily: Mono, fontSize: 11, color: C.greenDm, marginBottom: 4 }}>YES</div>
                        <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.65 }}>{step.yes}</div>
                      </div>
                      <div style={{
                        background: C.redBg, borderRadius: 6, padding: '10px 14px',
                        border: '1px solid ' + C.redDm,
                      }}>
                        <div style={{ fontFamily: Mono, fontSize: 11, color: C.redDm, marginBottom: 4 }}>NO</div>
                        <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.65 }}>{step.no}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Category summary */}
        <div style={{
          marginTop: 24, background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 8, padding: 20,
        }}>
          <div style={{
            fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
            color: C.accentDm, marginBottom: 12,
          }}>
            TRIAGE CATEGORY DEFINITIONS
          </div>
          {[
            { cat: 'immediate', desc: 'Life-threatening injuries requiring immediate intervention. Airway compromise, uncontrolled hemorrhage, shock. These patients will die without rapid treatment but ARE salvageable.' },
            { cat: 'delayed', desc: 'Serious injuries that need treatment but can wait. Stable vitals, can follow commands. Fractures, moderate burns, soft tissue injuries without hemorrhage.' },
            { cat: 'minor', desc: 'Walking wounded. Any patient who can ambulate. Minor injuries, psychological distress. These patients can help themselves and potentially assist others.' },
            { cat: 'expectant', desc: 'Injuries incompatible with survival given available resources. Cardiac arrest in MCI setting, massive head trauma, burns >90% TBSA. The hardest category — accepting that resources must go to salvageable patients.' },
          ].map(item => {
            const cat = CATEGORIES[item.cat];
            return (
              <div key={item.cat} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12,
                paddingBottom: 12, borderBottom: '1px solid ' + C.line,
              }}>
                <span style={{
                  fontFamily: Mono, fontSize: 12, fontWeight: 700, color: cat.color,
                  padding: '3px 8px', background: cat.bg, borderRadius: 3,
                  border: '1px solid ' + cat.colorDm, whiteSpace: 'nowrap',
                }}>
                  {cat.tag}
                </span>
                <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [expandedStep]);

  // ── Debrief Renderer ──────────────────────────────────────
  const renderDebrief = useCallback(() => {
    if (!allTriaged) {
      return (
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 8, padding: 32, textAlign: 'center',
        }}>
          <div style={{ fontFamily: Serif, fontSize: 18, color: C.tx, marginBottom: 12 }}>
            Complete all 8 patient triage decisions first.
          </div>
          <button onClick={() => setMode('triage')} style={{
            padding: '10px 24px', borderRadius: 6, cursor: 'pointer',
            background: C.accentBg, border: '1px solid ' + C.accentDm,
            color: C.accent, fontFamily: Mono, fontSize: 12,
          }}>
            GO TO TRIAGE
          </button>
        </div>
      );
    }

    return (
      <div>
        {/* Score summary */}
        <div style={{
          background: C.card, border: '2px solid rgba(204,32,32,.25)',
          borderRadius: 4, padding: 28, marginBottom: 20, textAlign: 'center',
          borderTop: '4px solid ' + C.accent, position:'relative',
          boxShadow: '0 4px 20px rgba(0,0,0,.4)',
        }}>
          <div style={{
            fontFamily: Mono, fontSize: 12, letterSpacing: '.12em',
            color: C.accent, marginBottom: 12, fontWeight:700,
          }}>
            TRIAGE PERFORMANCE DEBRIEF
          </div>
          <div style={{
            fontFamily: Serif, fontSize: 48, fontWeight: 700,
            color: grade ? grade.color : C.tx, marginBottom: 4,
          }}>
            {score.correct}/8
          </div>
          <div style={{ fontFamily: Sans, fontSize: 14, color: C.tx2, marginBottom: 4 }}>
            {score.pct}% Accuracy — {elapsedSec} seconds total
          </div>
          {grade && (
            <div>
              <div style={{
                fontFamily: Mono, fontSize: 12, fontWeight: 700,
                color: grade.color, marginBottom: 6, marginTop: 8,
              }}>
                {grade.label}
              </div>
              <div style={{
                fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.65,
                maxWidth: 480, margin: '0 auto',
              }}>
                {grade.note}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', margin: '8px 0 12px' }}>
          <ScopeIcon /><Tip id="scope_of_practice" />
        </div>

        {/* Per-patient breakdown */}
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 12,
        }}>
          PATIENT-BY-PATIENT REVIEW
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PATIENTS.map((pt, i) => {
            const dec = decisions[i];
            const correct = dec === pt.correct;
            const yourCat = CATEGORIES[dec];
            const correctCat = CATEGORIES[pt.correct];
            return (
              <div key={i} style={{
                background: C.card, border: '1px solid ' + C.cardBd,
                borderRadius: 6, padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <span style={{
                  fontFamily: Mono, fontSize: 14, fontWeight: 700, width: 28,
                  color: correct ? C.green : C.red,
                }}>
                  {correct ? '\✓' : '\✗'}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx, marginBottom: 2 }}>
                    Patient #{pt.id}: {pt.description.split(',')[0]}
                  </div>
                  <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                    {pt.injuries.split(',')[0]}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontFamily: Mono, fontSize: 12, fontWeight: 700,
                    color: yourCat.color, padding: '2px 6px',
                    background: yourCat.bg, borderRadius: 3,
                  }}>
                    {yourCat.tag}
                  </span>
                  {!correct && (
                    <div style={{ fontFamily: Mono, fontSize: 11, color: correctCat.color, marginTop: 3 }}>
                      Correct: {correctCat.tag}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Category distribution */}
        <div style={{
          marginTop: 20, background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 8, padding: 20,
        }}>
          <div style={{
            fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
            color: C.accentDm, marginBottom: 12,
          }}>
            CORRECT DISTRIBUTION
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {Object.entries(CATEGORIES).map(([key, cat]) => {
              const count = PATIENTS.filter(p => p.correct === key).length;
              return (
                <div key={key} style={{
                  textAlign: 'center', padding: '10px 4px',
                  background: cat.bg, borderRadius: 6, border: '1px solid ' + cat.colorDm,
                }}>
                  <div style={{ fontFamily: Mono, fontSize: 22, fontWeight: 700, color: cat.color }}>
                    {count}
                  </div>
                  <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>{cat.tag}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Retry */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={handleStart} style={{
            padding: '12px 28px', borderRadius: 6, cursor: 'pointer',
            background: C.accentBg, border: '1px solid ' + C.accentDm,
            color: C.accent, fontFamily: Mono, fontSize: 12,
          }}>
            RETRY TRIAGE EXERCISE
          </button>
        </div>
      </div>
    );
  }, [allTriaged, decisions, score, grade, elapsedSec, handleStart]);

  // ── Flowchart patient paths (computed outside renderer) ────
  const patientPaths = useMemo(() => {
    const paths = {};
    Object.keys(decisions).forEach(k => {
      const pt = PATIENTS[parseInt(k)];
      if (!pt) return;
      const p = [];
      if (pt.canWalk) {
        p.push('walk_yes');
      } else {
        p.push('walk_no');
        if (!pt.breathing) {
          p.push('breath_no');
          p.push('airway_no');
        } else {
          p.push('breath_yes');
          if (pt.respRate > 30) {
            p.push('rr_yes');
          } else {
            p.push('rr_no');
            if (!pt.radialPulse) {
              p.push('pulse_no');
            } else {
              p.push('pulse_yes');
              if (pt.mentalStatus.toLowerCase().includes('follows commands') || pt.mentalStatus.toLowerCase().includes('alert')) {
                p.push('mental_yes');
              } else {
                p.push('mental_no');
              }
            }
          }
        }
      }
      paths[k] = p;
    });
    return paths;
  }, [decisions]);

  const flowchartPathCounts = useMemo(() => {
    const counts = {};
    Object.values(patientPaths).forEach(p => {
      p.forEach(seg => { counts[seg] = (counts[seg] || 0) + 1; });
    });
    return counts;
  }, [patientPaths]);

  // ── Flowchart Renderer ─────────────────────────────────────
  const renderFlowchart = useCallback(() => {
    const pathCounts = flowchartPathCounts;

    const hasDecisions = Object.keys(pathCounts).length > 0;

    // Node positions in the flowchart
    // Decision diamonds
    const nodes = [
      { id: 'walk', x: 160, y: 40, label: 'Can they walk?', type: 'decision' },
      { id: 'breath', x: 160, y: 140, label: 'Breathing?', type: 'decision' },
      { id: 'airway', x: 340, y: 140, label: 'Open airway.\nBreathing now?', type: 'decision' },
      { id: 'rr', x: 160, y: 250, label: 'Resp rate >30?', type: 'decision' },
      { id: 'pulse', x: 160, y: 350, label: 'Radial pulse?', type: 'decision' },
      { id: 'mental', x: 160, y: 450, label: 'Follow commands?', type: 'decision' },
    ];

    // Outcome rectangles
    const outcomes = [
      { id: 'green', x: 440, y: 30, label: 'GREEN', sub: 'Minor', color: C.green, colorDm: C.greenDm },
      { id: 'black', x: 520, y: 130, label: 'BLACK', sub: 'Expectant', color: C.black, colorDm: C.blackDm },
      { id: 'red1', x: 340, y: 210, label: 'RED', sub: 'Immediate', color: C.red, colorDm: C.redDm },
      { id: 'red2', x: 380, y: 250, label: 'RED', sub: 'Immediate', color: C.red, colorDm: C.redDm },
      { id: 'red3', x: 30, y: 350, label: 'RED', sub: 'Immediate', color: C.red, colorDm: C.redDm },
      { id: 'red4', x: 380, y: 450, label: 'RED', sub: 'Immediate', color: C.red, colorDm: C.redDm },
      { id: 'yellow', x: 30, y: 450, label: 'YELLOW', sub: 'Delayed', color: C.yellow, colorDm: C.yellowDm },
    ];

    // pathCounts already computed above via flowchartPathCounts

    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          START TRIAGE DECISION FLOWCHART
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 16, maxWidth: 720,
        }}>
          The START protocol as a visual decision tree. {hasDecisions
            ? 'Highlighted paths show the routes your triaged patients followed through the algorithm.'
            : 'Complete the triage exercise to see patient paths highlighted on the flowchart.'}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 600 500" style={{
            width: '100%', maxWidth: 600, display: 'block',
            background: C.card, borderRadius: 8, border: '1px solid ' + C.cardBd,
          }}>
            {/* Edges */}
            {/* walk -> YES -> GREEN */}
            <line x1="220" y1="40" x2="410" y2="40" stroke={pathCounts['walk_yes'] ? C.green : C.line} strokeWidth={pathCounts['walk_yes'] ? 2 : 1} />
            <text x="310" y="33" fill={C.green} fontSize="9" fontFamily="'IBM Plex Mono',monospace" textAnchor="middle">YES</text>

            {/* walk -> NO -> breath */}
            <line x1="160" y1="62" x2="160" y2="118" stroke={pathCounts['walk_no'] ? C.accent : C.line} strokeWidth={pathCounts['walk_no'] ? 2 : 1} />
            <text x="170" y="92" fill={C.red} fontSize="9" fontFamily="'IBM Plex Mono',monospace">NO</text>

            {/* breath -> NO -> airway */}
            <line x1="220" y1="140" x2="280" y2="140" stroke={pathCounts['breath_no'] ? C.accent : C.line} strokeWidth={pathCounts['breath_no'] ? 2 : 1} />
            <text x="250" y="133" fill={C.red} fontSize="9" fontFamily="'IBM Plex Mono',monospace" textAnchor="middle">NO</text>

            {/* airway -> NO -> BLACK */}
            <line x1="400" y1="140" x2="490" y2="140" stroke={pathCounts['airway_no'] ? C.black : C.line} strokeWidth={pathCounts['airway_no'] ? 2 : 1} />
            <text x="445" y="133" fill={C.black} fontSize="9" fontFamily="'IBM Plex Mono',monospace" textAnchor="middle">NO</text>

            {/* airway -> YES -> RED */}
            <line x1="340" y1="162" x2="340" y2="198" stroke={C.line} strokeWidth="1" />
            <text x="350" y="182" fill={C.green} fontSize="9" fontFamily="'IBM Plex Mono',monospace">YES</text>

            {/* breath -> YES -> rr */}
            <line x1="160" y1="162" x2="160" y2="228" stroke={pathCounts['breath_yes'] ? C.accent : C.line} strokeWidth={pathCounts['breath_yes'] ? 2 : 1} />
            <text x="170" y="196" fill={C.green} fontSize="9" fontFamily="'IBM Plex Mono',monospace">YES</text>

            {/* rr -> YES -> RED */}
            <line x1="220" y1="250" x2="350" y2="250" stroke={pathCounts['rr_yes'] ? C.red : C.line} strokeWidth={pathCounts['rr_yes'] ? 2 : 1} />
            <text x="285" y="243" fill={C.red} fontSize="9" fontFamily="'IBM Plex Mono',monospace" textAnchor="middle">YES</text>

            {/* rr -> NO -> pulse */}
            <line x1="160" y1="272" x2="160" y2="328" stroke={pathCounts['rr_no'] ? C.accent : C.line} strokeWidth={pathCounts['rr_no'] ? 2 : 1} />
            <text x="170" y="302" fill={C.green} fontSize="9" fontFamily="'IBM Plex Mono',monospace">NO</text>

            {/* pulse -> NO -> RED */}
            <line x1="100" y1="350" x2="62" y2="350" stroke={pathCounts['pulse_no'] ? C.red : C.line} strokeWidth={pathCounts['pulse_no'] ? 2 : 1} />
            <text x="80" y="343" fill={C.red} fontSize="9" fontFamily="'IBM Plex Mono',monospace" textAnchor="middle">NO</text>

            {/* pulse -> YES -> mental */}
            <line x1="160" y1="372" x2="160" y2="428" stroke={pathCounts['pulse_yes'] ? C.accent : C.line} strokeWidth={pathCounts['pulse_yes'] ? 2 : 1} />
            <text x="170" y="402" fill={C.green} fontSize="9" fontFamily="'IBM Plex Mono',monospace">YES</text>

            {/* mental -> NO -> RED */}
            <line x1="220" y1="450" x2="350" y2="450" stroke={pathCounts['mental_no'] ? C.red : C.line} strokeWidth={pathCounts['mental_no'] ? 2 : 1} />
            <text x="285" y="443" fill={C.red} fontSize="9" fontFamily="'IBM Plex Mono',monospace" textAnchor="middle">NO</text>

            {/* mental -> YES -> YELLOW */}
            <line x1="100" y1="450" x2="62" y2="450" stroke={pathCounts['mental_yes'] ? C.yellow : C.line} strokeWidth={pathCounts['mental_yes'] ? 2 : 1} />
            <text x="80" y="443" fill={C.green} fontSize="9" fontFamily="'IBM Plex Mono',monospace" textAnchor="middle">YES</text>

            {/* Decision diamonds */}
            {nodes.map(n => {
              const hw = 58, hh = 20;
              return (
                <g key={n.id}>
                  <polygon
                    points={`${n.x},${n.y - hh} ${n.x + hw},${n.y} ${n.x},${n.y + hh} ${n.x - hw},${n.y}`}
                    fill={C.accentBg}
                    stroke={C.accentDm}
                    strokeWidth="1.5"
                  />
                  <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle"
                    fill={C.tx} fontSize="9" fontWeight="600" fontFamily="'IBM Plex Mono',monospace">
                    {n.label.includes('\n') ? n.label.split('\n').map((line, li) => (
                      React.createElement('tspan', { key: li, x: n.x, dy: li === 0 ? -5 : 12 }, line)
                    )) : n.label}
                  </text>
                </g>
              );
            })}

            {/* Outcome rectangles */}
            {outcomes.map(o => (
              <g key={o.id}>
                <rect x={o.x - 30} y={o.y - 16} width="60" height="32" rx="4"
                  fill={o.color + '20'} stroke={o.colorDm} strokeWidth="2" />
                <text x={o.x} y={o.y - 3} textAnchor="middle" dominantBaseline="middle"
                  fill={o.color} fontSize="10" fontWeight="700" fontFamily="'IBM Plex Mono',monospace">
                  {o.label}
                </text>
                <text x={o.x} y={o.y + 10} textAnchor="middle" dominantBaseline="middle"
                  fill={C.tx3} fontSize="7" fontFamily="'IBM Plex Mono',monospace">
                  {o.sub}
                </text>
              </g>
            ))}

            {/* Patient count badges on paths */}
            {hasDecisions && Object.entries(pathCounts).map(([seg, count]) => {
              const positions = {
                walk_yes: { x: 370, y: 40 },
                walk_no: { x: 145, y: 90 },
                breath_no: { x: 250, y: 152 },
                breath_yes: { x: 145, y: 195 },
                airway_no: { x: 445, y: 152 },
                rr_yes: { x: 285, y: 260 },
                rr_no: { x: 145, y: 300 },
                pulse_no: { x: 80, y: 362 },
                pulse_yes: { x: 145, y: 400 },
                mental_no: { x: 285, y: 460 },
                mental_yes: { x: 80, y: 462 },
              };
              const pos = positions[seg];
              if (!pos) return null;
              return (
                <g key={'badge-' + seg}>
                  <circle cx={pos.x} cy={pos.y} r="8" fill={C.accent} opacity="0.9" />
                  <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="middle"
                    fill="#fff" fontSize="8" fontWeight="700" fontFamily="'IBM Plex Mono',monospace">
                    {count}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div style={{
          marginTop: 16, background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 8, padding: 16,
        }}>
          <div style={{ fontFamily: Mono, fontSize: 12, color: C.accentDm, marginBottom: 8 }}>
            FLOWCHART LEGEND
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 16, borderRadius: 3, background: cat.color + '30', border: '2px solid ' + cat.colorDm }} />
                <span style={{ fontFamily: Mono, fontSize: 12, color: cat.color, fontWeight: 600 }}>{cat.tag}</span>
                <span style={{ fontFamily: Sans, fontSize: 12, color: C.tx3 }}>{cat.label}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="20" height="16"><polygon points="10,0 20,8 10,16 0,8" fill={C.accentBg} stroke={C.accentDm} strokeWidth="1" /></svg>
              <span style={{ fontFamily: Sans, fontSize: 12, color: C.tx3 }}>Decision Node</span>
            </div>
            {hasDecisions && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>N</span>
                </div>
                <span style={{ fontFamily: Sans, fontSize: 12, color: C.tx3 }}>Patient count on path</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }, [flowchartPathCounts]);

  // ── Main Render ────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', color: C.tx, fontFamily: Sans, position: 'relative',
      background: `linear-gradient(180deg, #0a0606 0%, #0c0404 40%, #0e0808 100%)`,
    }}>
      {/* ECG repeating background pattern */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0, pointerEvents:'none', zIndex:0,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 78px, rgba(204,32,32,.03) 78px, rgba(204,32,32,.03) 80px), repeating-linear-gradient(90deg, transparent, transparent 78px, rgba(204,32,32,.03) 78px, rgba(204,32,32,.03) 80px)`,
      }} />
      {/* Horizontal red scanner line */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, height:1,
        background:'linear-gradient(90deg, transparent 0%, rgba(204,32,32,.15) 20%, rgba(204,32,32,.3) 50%, rgba(204,32,32,.15) 80%, transparent 100%)',
        pointerEvents:'none', zIndex:1,
        animation:'none',
      }} />
      <StarOfLifeSVG />
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,6,6,.92)', backdropFilter: 'blur(12px)',
        borderBottom: '2px solid rgba(204,32,32,.2)', padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer',
        }}>
          {'\←'} Back to Coursework
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <svg width="16" height="16" viewBox="0 0 100 100" style={{opacity:0.5}}>
            <g fill={C.accent} transform="translate(50,50)">
              {[0,60,120,180,240,300].map(a => (
                <rect key={a} x="-9" y="-48" width="18" height="40" rx="3" transform={`rotate(${a})`} />
              ))}
            </g>
          </svg>
          <span style={{ fontFamily: Mono, fontSize: 12, color: C.accent, letterSpacing:'.08em', fontWeight:600 }}>
            SOMAC {'\u2014'} EMERGENCY MEDICAL TECHNICIAN
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position:'relative', zIndex:2 }}>
        {/* Hero */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display:'inline-block', padding:'3px 10px', marginBottom:12,
            background:'rgba(204,32,32,.12)', border:'1px solid rgba(204,32,32,.25)',
            borderRadius:2, fontFamily:Mono, fontSize:11, color:C.accent,
            letterSpacing:'.1em', fontWeight:700,
          }}>
            EMERGENCY SERVICES
          </div>
          <h1 style={{
            fontFamily: Serif, fontSize: 32, fontWeight: 700,
            color: C.tx, letterSpacing: '-.03em', marginBottom: 8,
          }}>
            Triage Simulator
          </h1>
          <p style={{
            fontFamily: Serif, fontSize: 15, color: C.tx2,
            lineHeight: 1.6, marginBottom: 4, maxWidth: 720,
          }}>
            A mass casualty incident triage exercise using the START protocol. Eight patients with
            varying injuries arrive after a multi-vehicle highway pileup. Rapidly assess each patient,
            assign a triage category, and see how your decisions compare to field protocol.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 6px' }}>
            <StartIcon /><Tip id="start_protocol" />
          </div>
          <p style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3, lineHeight: 1.65, marginBottom: 12,
          }}>
            SOMAC Volunteer EMT, NREMT Certification, BLS/CPR
          </p>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            {SKILLS.map(tag => (
              <span key={tag} style={{
                fontFamily: Mono, fontSize: 11, padding: '3px 8px', borderRadius: 3,
                background: C.accentBg, color: C.accentDm, letterSpacing: '.03em',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {allTriaged && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>TRIAGE SCORE</span>
              <div style={{ flex: 1, maxWidth: 200, height: 4, background: C.line, borderRadius: 2 }}>
                <div style={{
                  width: score.pct + '%', height: '100%', borderRadius: 2,
                  background: score.pct === 100 ? C.green : score.pct >= 63 ? C.yellow : C.red,
                  transition: 'width .3s ease',
                }} />
              </div>
              <span style={{
                fontFamily: Mono, fontSize: 12,
                color: score.pct === 100 ? C.green : score.pct >= 63 ? C.yellow : C.red,
              }}>
                {score.correct}/8
              </span>
            </div>
          )}
        </div>

        <ModeSwitch />

        {mode === 'triage' && renderTriage()}
        {mode === 'protocol' && renderProtocol()}
        {mode === 'flowchart' && renderFlowchart()}
        {mode === 'debrief' && renderDebrief()}

        {/* Provenance */}
        <div style={{
          marginTop: 48, padding: 20, borderTop: '1px solid ' + C.line,
          display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center',
        }}>
          {PROVENANCE.map(p => (
            <div key={p.label} style={{ textAlign: 'center', flex: '0 0 auto' }}>
              <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: 1, color: C.tx3 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: C.tx2, marginTop: 2 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={() => setView('coursework')} style={{
            padding: '10px 32px', border: '1px solid ' + C.line, borderRadius: 6,
            background: 'transparent', color: C.tx2,
            fontFamily: Mono, fontSize: 13, letterSpacing: 0.5, cursor: 'pointer',
          }}>
            {'\←'} Back to Coursework
          </button>
        </div>
      </div>
    </div>
  );
}
