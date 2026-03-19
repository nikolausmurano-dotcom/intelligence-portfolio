// PharmView.jsx — Vaccine Distribution Planner
// Pharmacy Technician — COVID-19 Vaccine Distribution (WEGMANS)
// "Managing a High-Volume Vaccination Site During Peak Pandemic"
//
// Interactive vaccine distribution simulation: manage appointments by
// priority tier, cold chain logistics, adverse reaction protocol, and
// dose tracking. Three modes: Operations (daily site management),
// Cold Chain (storage logistics), Protocols (adverse reaction handling).
// Self-contained React component. Globals: useState, useCallback, useMemo

// ── Palette: Clinical dark green — pharmaceutical ops ───────
const C = {
  bg:      '#040a04',
  card:    'rgba(8,16,10,.95)',
  cardBd:  'rgba(48,160,64,.14)',
  tx:      '#c8d8cc',
  tx2:     '#9cb4a4',
  tx3:     '#738b7b',
  accent:  '#30a040',
  accentDm:'#208830',
  accentBg:'rgba(48,160,64,.08)',
  red:     '#c04040',
  redDm:   '#a02828',
  redBg:   'rgba(192,64,64,.08)',
  yellow:  '#c0a030',
  yellowDm:'#a08020',
  yellowBg:'rgba(192,160,48,.08)',
  blue:    '#4080b0',
  blueDm:  '#306898',
  blueBg:  'rgba(64,128,176,.08)',
  purple:  '#8060a0',
  purpleDm:'#684890',
  purpleBg:'rgba(128,96,160,.08)',
  line:    'rgba(48,160,64,.10)',
};
const Mono  = "'IBM Plex Mono',monospace";
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";

// ── SVG: Molecular structure background ────────────────────
const MolecularBg = () => (
  <svg width="400" height="400" viewBox="0 0 400 400" style={{
    position:'fixed', top:'50%', right:0, transform:'translateY(-50%)',
    opacity:0.02, pointerEvents:'none', zIndex:0,
  }}>
    {/* Hexagonal molecular structure */}
    {[
      {x:200,y:60},{x:260,y:95},{x:260,y:165},{x:200,y:200},{x:140,y:165},{x:140,y:95},
      {x:320,y:130},{x:320,y:200},{x:260,y:235},{x:200,y:270},{x:140,y:235},{x:80,y:200},{x:80,y:130},
      {x:200,y:340},{x:260,y:305},{x:140,y:305},
    ].map((p,i) => (
      <circle key={i} cx={p.x} cy={p.y} r="6" fill="none" stroke="#30a040" strokeWidth="1.5" />
    ))}
    {/* Bonds */}
    {[
      [200,60,260,95],[260,95,260,165],[260,165,200,200],[200,200,140,165],[140,165,140,95],[140,95,200,60],
      [260,95,320,130],[260,165,320,200],[320,130,320,200],[200,200,260,235],[200,200,140,235],
      [260,235,200,270],[140,235,200,270],[200,270,260,305],[200,270,140,305],[200,340,260,305],[200,340,140,305],
      [140,235,80,200],[80,200,80,130],[80,130,140,95],
    ].map(([x1,y1,x2,y2],i) => (
      <line key={'b'+i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#30a040" strokeWidth="1" />
    ))}
  </svg>
);

// ── DNA Helix background element ───────────────────────────
const DnaHelixBg = () => (
  <svg width="60" height="800" viewBox="0 0 60 800" style={{
    position:'fixed', top:0, left:20, opacity:0.025, pointerEvents:'none', zIndex:0,
  }}>
    {Array.from({length:40}, (_, i) => {
      const y = i * 20;
      const phase = i * 0.3;
      const x1 = 30 + Math.sin(phase) * 20;
      const x2 = 30 - Math.sin(phase) * 20;
      return (
        <g key={i}>
          <circle cx={x1} cy={y} r="2" fill="#30a040" />
          <circle cx={x2} cy={y} r="2" fill="#30a040" />
          {i % 2 === 0 && <line x1={x1} y1={y} x2={x2} y2={y} stroke="#30a040" strokeWidth="0.5" />}
        </g>
      );
    })}
  </svg>
);

const SKILLS = [
  'COVID-19 Vaccine Administration',
  'Cold Chain Management',
  'VAERS Reporting',
  'CDC Immunization Protocols',
  'Priority Tier Scheduling',
  'Adverse Reaction Response',
  'Inventory Management',
  'Patient Screening (EUA)',
];

const PROVENANCE = [
  { label: 'CDC', desc: 'COVID-19 Vaccination Program' },
  { label: 'ACIP', desc: 'Advisory Committee on Immunization Practices' },
  { label: 'Wegmans', desc: 'Pharmacy Immunization Program' },
  { label: 'VAERS', desc: 'Vaccine Adverse Event Reporting System' },
];

// ── Vaccine Products ─────────────────────────────────────────
const VACCINES = [
  {
    id: 'pfizer',
    name: 'Pfizer-BioNTech (Comirnaty)',
    type: 'mRNA',
    doses: 2,
    interval: '21 days',
    storage: '-80°C to -60°C (ultra-cold)',
    thawed: '2-8°C for up to 31 days',
    roomTemp: 'Up to 6 hours at room temperature',
    dilution: 'Must be diluted with 1.8mL NaCl before administration',
    vialDoses: 6,
    color: C.purple,
    colorDm: C.purpleDm,
    colorBg: C.purpleBg,
    notes: 'Requires ultra-cold storage. Once thawed and diluted, must be used within 6 hours. Most temperature-sensitive vaccine in the program. Each vial yields 6 doses — a 7th dose is sometimes extractable with low dead-volume syringes.',
  },
  {
    id: 'moderna',
    name: 'Moderna (Spikevax)',
    type: 'mRNA',
    doses: 2,
    interval: '28 days',
    storage: '-25°C to -15°C (frozen)',
    thawed: '2-8°C for up to 30 days',
    roomTemp: 'Up to 24 hours at 8-25°C',
    dilution: 'No dilution required',
    vialDoses: 10,
    color: C.blue,
    colorDm: C.blueDm,
    colorBg: C.blueBg,
    notes: 'More forgiving cold chain than Pfizer. No dilution needed — can be administered directly. Larger vial size (10 doses) means more efficient throughput but higher waste risk if appointments cancel.',
  },
  {
    id: 'jj',
    name: 'Johnson & Johnson (Janssen)',
    type: 'Viral vector',
    doses: 1,
    interval: 'N/A — single dose',
    storage: '2-8°C (standard refrigeration)',
    thawed: 'N/A — not frozen',
    roomTemp: 'Up to 6 hours at room temperature',
    dilution: 'No dilution required',
    vialDoses: 5,
    color: C.yellow,
    colorDm: C.yellowDm,
    colorBg: C.yellowBg,
    notes: 'Simplest cold chain — standard refrigerator. Single dose provides operational advantage for hard-to-reach populations. Later restricted due to rare TTS (thrombosis with thrombocytopenia syndrome) risk. Preferred for populations unlikely to return for second dose.',
  },
];

// ── Priority Tiers ───────────────────────────────────────────
const TIERS = [
  {
    phase: '1a',
    name: 'Healthcare Workers & LTC Residents',
    population: 'Hospital staff, nursing home residents/staff, EMS, pharmacy workers',
    count: 21000000,
    rationale: 'Highest exposure risk. Healthcare system must remain functional. Long-term care facilities experienced 40% of early COVID deaths despite being <1% of population.',
    scheduling: 'Facility-based clinics. Mandatory 15-min observation (30-min for history of anaphylaxis). Second dose scheduling must be coordinated at time of first dose.',
  },
  {
    phase: '1b',
    name: 'Essential Workers & 75+',
    population: 'Teachers, grocery workers, transit, postal, 75+ age group',
    count: 49000000,
    rationale: 'Frontline workers maintaining critical infrastructure. Age 75+ has highest mortality rate (25x higher than 18-29 age group). Balances occupational and age-based risk.',
    scheduling: 'Mass vaccination sites + pharmacy network. Appointment-based to manage flow. Walk-ins create unpredictable demand and waste risk.',
  },
  {
    phase: '1c',
    name: 'Age 65+ & High-Risk Conditions',
    population: 'Ages 65-74, adults with BMI>30, diabetes, heart disease, cancer, immunocompromised',
    count: 129000000,
    rationale: 'Expanded age group plus comorbidity-based eligibility. These populations account for disproportionate hospitalizations and deaths. Comorbidity screening adds complexity to appointment process.',
    scheduling: 'Full pharmacy network activation. Online scheduling systems. Challenge: verifying eligibility for comorbidity-based qualification without creating barriers.',
  },
  {
    phase: '2',
    name: 'General Population 16+',
    population: 'All remaining adults, eventually expanded to 12+, then 5+',
    count: 200000000,
    rationale: 'General availability. Demand initially exceeds supply, then inverts — the challenge shifts from rationing to persuasion. Vaccine hesitancy becomes the primary barrier.',
    scheduling: 'All channels: pharmacies, mass sites, primary care, mobile clinics. Walk-ins encouraged. Focus shifts to access equity and reaching underserved communities.',
  },
];

// ── Adverse Reaction Protocols ───────────────────────────────
const REACTIONS = [
  {
    id: 'local',
    severity: 'MILD',
    name: 'Local Injection Site Reactions',
    symptoms: 'Pain, redness, swelling at injection site. Lymphadenopathy (swollen lymph nodes) in axilla on injection side.',
    onset: 'Within hours to 1-2 days',
    frequency: 'Very common (>50% of recipients)',
    management: 'Reassure patient this is normal immune response. Cold compress for comfort. OTC analgesics (acetaminophen, ibuprofen) as needed. No VAERS report required for expected local reactions.',
    escalation: false,
    color: C.accent,
  },
  {
    id: 'systemic',
    severity: 'MODERATE',
    name: 'Systemic Reactions',
    symptoms: 'Fatigue, headache, myalgia, arthralgia, chills, fever (>38°C), nausea. More common after second dose.',
    onset: '6-24 hours post-vaccination',
    frequency: 'Common (30-50% after dose 2)',
    management: 'Reassure — systemic reactions indicate robust immune response. Recommend rest, hydration, OTC analgesics. If fever >40°C or symptoms last >72 hours, recommend medical evaluation. VAERS reporting encouraged but not required for expected systemic reactions.',
    escalation: false,
    color: C.yellow,
  },
  {
    id: 'vasovagal',
    severity: 'MODERATE',
    name: 'Vasovagal Syncope (Fainting)',
    symptoms: 'Lightheadedness, pallor, diaphoresis, visual changes, loss of consciousness. May cause injury from fall.',
    onset: 'Within 15 minutes of vaccination',
    frequency: 'Uncommon (~1 in 1000)',
    management: 'This is why the 15-minute observation period exists. If patient reports feeling faint: immediately position supine, elevate legs, apply cool cloth. If syncope occurs: protect head, check breathing/pulse, position for recovery. Hold patient for extended 30-min observation. Document incident. Not an allergic reaction — anxiety/needle-related.',
    escalation: false,
    color: C.yellow,
  },
  {
    id: 'anaphylaxis',
    severity: 'SEVERE',
    name: 'Anaphylaxis',
    symptoms: 'Urticaria/angioedema, respiratory distress (wheezing, stridor, dyspnea), hypotension, tachycardia, GI symptoms. May progress rapidly.',
    onset: 'Usually within 15-30 minutes',
    frequency: 'Rare (~2-5 per million doses)',
    management: 'EMERGENCY. Immediately administer epinephrine 0.3mg IM (auto-injector or 1:1000 solution) in anterolateral thigh. Call 911. Position supine (sitting if respiratory distress). Repeat epinephrine in 5-15 minutes if no improvement. Monitor vitals continuously. All vaccination sites MUST have epinephrine on hand. MANDATORY VAERS report within 24 hours.',
    escalation: true,
    color: C.red,
  },
  {
    id: 'tts',
    severity: 'SEVERE',
    name: 'TTS (Thrombosis with Thrombocytopenia)',
    symptoms: 'Severe headache, abdominal pain, leg pain/swelling, shortness of breath, petechiae. Combination of blood clots with low platelet count.',
    onset: '4-28 days post-vaccination',
    frequency: 'Very rare (~7 per million J&J doses, predominantly women <50)',
    management: 'Patient will NOT present at vaccination site (delayed onset). If patient calls reporting these symptoms 4-28 days post-J&J vaccine: direct to emergency department IMMEDIATELY. Critical: TTS is NOT treated with heparin (standard blood clot treatment) — heparin can worsen TTS. Must be treated with non-heparin anticoagulants and IVIG. MANDATORY VAERS report.',
    escalation: true,
    color: C.red,
  },
  {
    id: 'myocarditis',
    severity: 'MODERATE-SEVERE',
    name: 'Myocarditis/Pericarditis',
    symptoms: 'Chest pain, shortness of breath, palpitations, particularly in males ages 12-29.',
    onset: '2-7 days post-vaccination (typically after dose 2)',
    frequency: 'Rare (~12.6 per million second doses in males 12-29)',
    management: 'If patient calls with chest pain within 7 days of mRNA vaccination: refer for immediate cardiac evaluation (troponin, ECG, echocardiogram). Most cases are mild and resolve with conservative treatment (NSAIDs, rest). MANDATORY VAERS report. Document for future dose decision-making.',
    escalation: true,
    color: C.red,
  },
];

// ── Daily Operations Scenarios ───────────────────────────────
const SCENARIOS = [
  {
    id: 'overbook',
    title: 'Overbooking Dilemma',
    situation: 'It is 4:30 PM. You have 3 remaining Pfizer doses in a diluted vial that expires at 5:00 PM. Only 1 appointment remains scheduled. Two walk-ins arrive: a 78-year-old with COPD and a 45-year-old healthcare worker needing dose 2.',
    options: [
      { label: 'Vaccinate all three, waste zero doses', correct: true, explanation: 'Correct. Wasting viable vaccine is unacceptable when eligible recipients are present. Both walk-ins are eligible. The 6-hour dilution clock makes dose preservation critical. Document as walk-in appointments.' },
      { label: 'Turn away walk-ins, follow appointment schedule only', correct: false, explanation: 'Incorrect. While appointment scheduling maintains order, wasting 2 doses of scarce vaccine to follow rigid protocol is not justified. CDC guidance explicitly supports using every available dose.' },
      { label: 'Vaccinate the scheduled patient only, save vial for tomorrow', correct: false, explanation: 'Incorrect. Diluted Pfizer cannot be saved — it expires within 6 hours of dilution. Those 2 remaining doses will be wasted. This represents a cold chain knowledge gap.' },
    ],
  },
  {
    id: 'coldchain',
    title: 'Cold Chain Excursion',
    situation: 'Morning temperature check reveals the Moderna freezer recorded -12°C overnight (required: -25°C to -15°C). The excursion lasted approximately 3 hours based on the data logger. You have 200 doses stored in this unit.',
    options: [
      { label: 'Quarantine the doses, contact manufacturer and state immunization program', correct: true, explanation: 'Correct. A temperature excursion outside the manufacturer\'s range requires quarantining affected product (do NOT administer or discard) and contacting the manufacturer/state program for viability determination. Moderna may still be viable at -12°C for 3 hours, but only the manufacturer can authorize continued use.' },
      { label: 'Discard all 200 doses immediately', correct: false, explanation: 'Incorrect. Never discard product based on a temperature excursion without consulting the manufacturer first. Vaccines may still be viable. Premature disposal wastes potentially hundreds of thousands of dollars of product.' },
      { label: 'Continue using the doses — the excursion was minor', correct: false, explanation: 'Incorrect. Administering product after an unresolved excursion violates cold chain protocol. If the vaccine\'s potency was compromised, patients would receive ineffective doses and believe they are protected. Contact manufacturer first.' },
    ],
  },
  {
    id: 'screening',
    title: 'Pre-Vaccination Screening',
    situation: 'A 32-year-old woman presents for her Pfizer dose 1. During screening, she reports: (1) she is 14 weeks pregnant, (2) she had a severe allergic reaction to a previous flu shot requiring epinephrine, and (3) she currently has a fever of 101°F with body aches.',
    options: [
      { label: 'Defer vaccination today due to active illness; reschedule when afebrile', correct: true, explanation: 'Correct. Moderate-to-severe acute illness (fever >100.4°F) is a precaution — defer vaccination until resolved. Pregnancy is NOT a contraindication (mRNA vaccines recommended in pregnancy per ACOG/CDC). History of anaphylaxis to a different vaccine is a precaution, not contraindication — would require 30-min observation. But the active febrile illness is the deciding factor today.' },
      { label: 'Vaccinate today — pregnancy and flu shot reaction are not contraindications', correct: false, explanation: 'Partially correct on pregnancy and prior reaction, but incorrect to vaccinate with active febrile illness. Fever can confound the assessment of adverse reactions post-vaccination and indicates active immune response that could interact with vaccine response.' },
      { label: 'Decline vaccination entirely due to pregnancy and allergy history', correct: false, explanation: 'Incorrect. Pregnancy is NOT a contraindication to mRNA COVID vaccines. ACOG and CDC recommend vaccination in pregnancy. Anaphylaxis to a different vaccine (flu shot) does not contraindicate COVID vaccine — it requires extended observation (30 min). This response demonstrates the harm of overly conservative screening.' },
    ],
  },
];

// ── Scholarly Micro-Content Tooltips ─────────────────────────
const PHARM_TIPS = {
  cold_chain: "The COVID-19 vaccine cold chain was unprecedented in pharmaceutical logistics. Pfizer's mRNA vaccine required -70\u00b0C storage, colder than Antarctic winter. The logistics of maintaining ultra-cold temperatures from factory to arm required specialized freezers that most pharmacies had never owned, dry ice supply chains that didn't exist at scale, and precisely timed thaw protocols where a 30-minute error could waste hundreds of doses. Rural pharmacies were effectively excluded from early distribution because the infrastructure simply didn't exist outside major metro areas.",
  eua: "Emergency Use Authorization is NOT full FDA approval \u2014 it's a lower evidentiary bar triggered by a declared public health emergency. The distinction matters legally and medically: EUA products can be withdrawn if the emergency declaration ends or if safety signals emerge that change the risk-benefit calculation. Full Biologics License Application (BLA) approval requires 6+ months of safety follow-up data and a complete manufacturing review. When people said 'the vaccine isn't FDA approved,' they were technically correct during the EUA period \u2014 a nuance that fueled vaccine hesitancy.",
  acip: "The Advisory Committee on Immunization Practices (ACIP) makes vaccine recommendations that become the de facto standard of care in American medicine. Their COVID-19 priority framework \u2014 healthcare workers first, then elderly in congregate settings, then essential workers, then age-based tiers \u2014 was an exercise in utilitarian ethics under extreme resource scarcity. Every priority decision meant someone else waited longer. The committee debated whether to prioritize essential workers (who had higher exposure) or the elderly (who had higher mortality). They chose age-based mortality risk. Reasonable people disagreed.",
};

// ── Component ────────────────────────────────────────────────
function PharmView({ setView }) {
  const [mode, setMode] = useState('operations');
  const [expandedVaccine, setExpandedVaccine] = useState(null);
  const [expandedReaction, setExpandedReaction] = useState(null);
  const [scenarioAnswers, setScenarioAnswers] = useState({});
  const [expandedTier, setExpandedTier] = useState(null);
  const [showColdChainReveal, setShowColdChainReveal] = useState(false);
  const [tipId, setTipId] = useState(null);
  const [adverseIdx, setAdverseIdx] = useState(0);
  const [adverseAnswers, setAdverseAnswers] = useState({});
  const [adverseRevealed, setAdverseRevealed] = useState({});
  const [equityAllocation, setEquityAllocation] = useState({ hcw: 20, elderly: 20, essential: 15, highrisk: 20, adult: 15, pediatric: 10 });
  const [equitySubmitted, setEquitySubmitted] = useState(false);

  // ── Scholarly Micro-Icons & Tooltip ──────────────────────────
  function Tip({ id }) {
    if (tipId !== id || !PHARM_TIPS[id]) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(6,10,8,.92)', border: '1px solid ' + C.accent + '25', borderRadius: 3, maxWidth: 440, fontSize: 11, fontFamily: Mono, color: C.tx2, lineHeight: 1.65, margin: '6px 0 10px' }}>
        {PHARM_TIPS[id]}
      </div>
    );
  }

  const SnowflakeIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='cold_chain'?null:'cold_chain')}>
      <line x1="11" y1="2" x2="11" y2="20" stroke="currentColor" strokeWidth=".7"/>
      <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth=".7"/>
      <line x1="5" y1="5" x2="17" y2="17" stroke="currentColor" strokeWidth=".5"/>
      <line x1="17" y1="5" x2="5" y2="17" stroke="currentColor" strokeWidth=".5"/>
      <path d="M9 4 L11 2 L13 4 M9 18 L11 20 L13 18" fill="none" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const ShieldIcon = () => (
    <svg width="20" height="24" viewBox="0 0 20 24" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='eua'?null:'eua')}>
      <path d="M10 2 L18 6 L18 14 Q18 20 10 22 Q2 20 2 14 L2 6 Z" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <text x="10" y="15" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" fillOpacity=".5">!</text>
    </svg>
  );

  const CommitteeIcon = () => (
    <svg width="24" height="20" viewBox="0 0 24 20" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='acip'?null:'acip')}>
      <circle cx="6" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <circle cx="12" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <circle cx="18" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <path d="M4 12 Q6 10 8 12 L8 18 L4 18 Z" fill="none" stroke="currentColor" strokeWidth=".5"/>
      <path d="M10 12 Q12 10 14 12 L14 18 L10 18 Z" fill="none" stroke="currentColor" strokeWidth=".5"/>
      <path d="M16 12 Q18 10 20 12 L20 18 L16 18 Z" fill="none" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const answeredCount = useMemo(
    () => Object.keys(scenarioAnswers).length,
    [scenarioAnswers],
  );

  const handleAnswer = useCallback((scenarioId, optionIdx) => {
    setScenarioAnswers(prev => {
      if (prev[scenarioId] !== undefined) return prev;
      return { ...prev, [scenarioId]: optionIdx };
    });
  }, []);

  // ── Mode Switch ──────────────────────────────────────────
  const ModeSwitch = useCallback(() => {
    const modes = [
      { id: 'operations', label: 'Operations', desc: 'Site Scenarios' },
      { id: 'coldchain', label: 'Cold Chain', desc: 'Storage Logistics' },
      { id: 'tempgraph', label: 'Temp Graph', desc: 'Temperature Monitor' },
      { id: 'protocols', label: 'Protocols', desc: 'Adverse Reactions' },
      { id: 'adverse', label: 'VAERS Lab', desc: 'Event Investigation' },
      { id: 'equity', label: 'Equity', desc: 'Distribution Ethics' },
    ];
    return (
      <div style={{ display: 'flex', gap: 2, marginBottom: 24, borderBottom:'1px solid rgba(48,160,64,.12)' }}>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1, padding: '10px 12px', cursor: 'pointer',
              background: mode === m.id ? 'rgba(48,160,64,.08)' : 'transparent',
              border: 'none',
              borderBottom: mode === m.id ? '2px solid ' + C.accent : '2px solid transparent',
              borderRadius: '4px 4px 0 0',
              textAlign: 'center', transition: 'all .15s ease',
            }}
          >
            <span style={{
              fontFamily: Mono, fontSize: 11, fontWeight: 600,
              color: mode === m.id ? C.accent : C.tx3, display: 'block',
              letterSpacing:'.04em',
            }}>
              {m.label}
            </span>
            <span style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{m.desc}</span>
          </button>
        ))}
      </div>
    );
  }, [mode]);

  // ── Operations Renderer ───────────────────────────────────
  const renderOperations = useCallback(() => {
    return (
      <div>
        {/* Priority Tiers */}
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 12,
        }}>
          VACCINATION PRIORITY TIERS — ACIP FRAMEWORK
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <CommitteeIcon /><Tip id="acip" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {TIERS.map((tier, i) => {
            const isOpen = expandedTier === i;
            return (
              <div key={i} style={{
                background: C.card, border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
                borderRadius: 6, overflow: 'hidden', transition: 'border-color .15s ease',
              }}>
                <button
                  onClick={() => setExpandedTier(prev => prev === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 18px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: Mono, fontSize: 14, fontWeight: 700, color: C.accent,
                    padding: '4px 10px', background: C.accentBg, borderRadius: 4,
                  }}>
                    {tier.phase}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: Serif, fontSize: 15, fontWeight: 600, color: C.tx }}>
                      {tier.name}
                    </div>
                    <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                      ~{(tier.count / 1000000).toFixed(0)}M eligible
                    </div>
                  </div>
                  <span style={{
                    fontFamily: Mono, fontSize: 14, color: C.tx3,
                    transition: 'transform .15s ease',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                  }}>{'\u25B6'}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 18px 18px', borderTop: '1px solid ' + C.line, paddingTop: 14 }}>
                    <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6, marginBottom: 10 }}>
                      <strong style={{ color: C.tx }}>Population:</strong> {tier.population}
                    </div>
                    <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7, marginBottom: 10 }}>
                      {tier.rationale}
                    </div>
                    <div style={{
                      background: C.accentBg, borderRadius: 6, padding: '10px 14px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{ fontFamily: Mono, fontSize: 11, color: C.accentDm, marginBottom: 4 }}>SCHEDULING LOGISTICS</div>
                      <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6 }}>{tier.scheduling}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Operational Scenarios */}
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 12,
        }}>
          OPERATIONAL DECISION SCENARIOS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {SCENARIOS.map(sc => {
            const answered = scenarioAnswers[sc.id] !== undefined;
            const chosenIdx = scenarioAnswers[sc.id];
            return (
              <div key={sc.id} style={{
                background: C.card, border: '1px solid ' + C.cardBd,
                borderRadius: 8, padding: 22,
              }}>
                <div style={{ fontFamily: Serif, fontSize: 17, fontWeight: 600, color: C.tx, marginBottom: 10 }}>
                  {sc.title}
                </div>
                <div style={{
                  fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.7,
                  paddingLeft: 14, borderLeft: '3px solid ' + C.accentDm, marginBottom: 16,
                }}>
                  {sc.situation}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {sc.options.map((opt, oi) => {
                    const isChosen = answered && chosenIdx === oi;
                    const showResult = answered;
                    return (
                      <button
                        key={oi}
                        onClick={() => handleAnswer(sc.id, oi)}
                        disabled={answered}
                        style={{
                          padding: '12px 16px', borderRadius: 6, cursor: answered ? 'default' : 'pointer',
                          background: showResult
                            ? (opt.correct ? C.accentBg : isChosen ? C.redBg : 'transparent')
                            : C.accentBg,
                          border: '1px solid ' + (showResult
                            ? (opt.correct ? C.accentDm : isChosen ? C.redDm : C.line)
                            : C.line),
                          textAlign: 'left', transition: 'all .15s ease',
                          opacity: showResult && !opt.correct && !isChosen ? 0.5 : 1,
                        }}
                      >
                        <div style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.65,
                        }}>
                          {showResult && opt.correct && <span style={{ color: C.accent, fontWeight: 700 }}>{'\✓'} </span>}
                          {showResult && isChosen && !opt.correct && <span style={{ color: C.red, fontWeight: 700 }}>{'\✗'} </span>}
                          {opt.label}
                        </div>
                        {showResult && (opt.correct || isChosen) && (
                          <div style={{
                            fontFamily: Sans, fontSize: 11, color: C.tx2, lineHeight: 1.6,
                            marginTop: 8, paddingTop: 8, borderTop: '1px solid ' + C.line,
                          }}>
                            {opt.explanation}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [expandedTier, scenarioAnswers, handleAnswer]);

  // ── Cold Chain Renderer ───────────────────────────────────
  const renderColdChain = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          COLD CHAIN LOGISTICS — VACCINE STORAGE REQUIREMENTS
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          Cold chain management is the difference between effective vaccination and administering
          degraded product. Each COVID-19 vaccine has unique storage requirements. A single
          temperature excursion can compromise hundreds of doses and cost tens of thousands of
          dollars. Temperature monitoring is continuous, documented, and audited.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <SnowflakeIcon /><Tip id="cold_chain" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {VACCINES.map(vax => {
            const isOpen = expandedVaccine === vax.id;
            return (
              <div key={vax.id} style={{
                background: C.card, border: '1px solid ' + (isOpen ? vax.colorDm : C.cardBd),
                borderRadius: 8, overflow: 'hidden', transition: 'border-color .15s ease',
              }}>
                <button
                  onClick={() => setExpandedVaccine(prev => prev === vax.id ? null : vax.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 6,
                    background: vax.colorBg, border: '1px solid ' + C.line,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: Mono, fontSize: 11, fontWeight: 700, color: vax.color,
                    flexShrink: 0,
                  }}>
                    {vax.type === 'mRNA' ? 'mRNA' : 'VV'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: Serif, fontSize: 16, fontWeight: 600, color: C.tx }}>
                      {vax.name}
                    </div>
                    <div style={{ fontFamily: Mono, fontSize: 12, color: vax.color }}>
                      {vax.storage}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: Mono, fontSize: 14, color: C.tx3,
                    transition: 'transform .15s ease',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                  }}>{'\u25B6'}</span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px', borderTop: '1px solid ' + C.line, paddingTop: 16,
                  }}>
                    <div style={{
                      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                      gap: 10, marginBottom: 16,
                    }}>
                      {[
                        { label: 'DOSES/SERIES', value: vax.doses === 1 ? 'Single dose' : vax.doses + ' doses, ' + vax.interval + ' apart' },
                        { label: 'ULTRA-COLD/FROZEN', value: vax.storage },
                        { label: 'THAWED/REFRIGERATED', value: vax.thawed },
                        { label: 'ROOM TEMPERATURE', value: vax.roomTemp },
                        { label: 'DILUTION', value: vax.dilution },
                        { label: 'DOSES PER VIAL', value: vax.vialDoses.toString() },
                      ].map(item => (
                        <div key={item.label} style={{
                          background: vax.colorBg, borderRadius: 6, padding: '10px 14px',
                          border: '1px solid ' + C.line,
                        }}>
                          <div style={{ fontFamily: Mono, fontSize: 11, color: vax.colorDm, marginBottom: 4, letterSpacing: '.06em' }}>
                            {item.label}
                          </div>
                          <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.65 }}>
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{
                      background: C.accentBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{ fontFamily: Mono, fontSize: 11, color: C.accentDm, marginBottom: 6, letterSpacing: '.06em' }}>
                        OPERATIONAL NOTES
                      </div>
                      <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7 }}>
                        {vax.notes}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Temperature monitoring card */}
        <div style={{
          marginTop: 20, background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 8, padding: 20,
        }}>
          <div style={{ fontFamily: Mono, fontSize: 12, color: C.accentDm, marginBottom: 8, letterSpacing: '.06em' }}>
            TEMPERATURE MONITORING PROTOCOL
          </div>
          {[
            'Digital data logger (DDL) in every storage unit — records temperature at minimum every 30 minutes',
            'Check and document temperatures at start of each workday and end of workday',
            'Set DDL alarms for out-of-range excursions — respond within 30 minutes',
            'If excursion detected: quarantine product, do NOT administer or discard, contact manufacturer',
            'Maintain temperature logs for minimum 3 years per state requirements',
            'Backup thermometer in each unit — verify DDL calibration monthly',
          ].map((item, i) => (
            <div key={i} style={{
              fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6,
              padding: '4px 0 4px 16px', borderLeft: '2px solid ' + C.line, marginBottom: 4,
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }, [expandedVaccine]);

  // ── Protocols Renderer ────────────────────────────────────
  const renderProtocols = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          ADVERSE REACTION PROTOCOLS — CDC/ACIP GUIDELINES
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          Every vaccination site must be prepared to recognize and respond to adverse reactions
          ranging from expected local reactions to life-threatening anaphylaxis. The 15-minute
          observation period (30 minutes for patients with history of anaphylaxis to any cause)
          is the critical safety window. Epinephrine must be immediately available at all times.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {REACTIONS.map(rx => {
            const isOpen = expandedReaction === rx.id;
            return (
              <div key={rx.id} style={{
                background: C.card,
                border: '1px solid ' + (isOpen ? rx.color : C.cardBd),
                borderRadius: 8, overflow: 'hidden', transition: 'border-color .15s ease',
              }}>
                <button
                  onClick={() => setExpandedReaction(prev => prev === rx.id ? null : rx.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 18px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: Serif, fontSize: 15, fontWeight: 600, color: C.tx }}>
                      {rx.name}
                    </div>
                    <div style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>
                      Onset: {rx.onset} | Frequency: {rx.frequency}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: Mono, fontSize: 11, fontWeight: 700, color: rx.color,
                    padding: '3px 8px', borderRadius: 3,
                    background: rx.escalation ? C.redBg : C.accentBg,
                  }}>
                    {rx.severity}
                  </span>
                  <span style={{
                    fontFamily: Mono, fontSize: 14, color: C.tx3,
                    transition: 'transform .15s ease',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                  }}>{'\u25B6'}</span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 18px 18px', borderTop: '1px solid ' + C.line, paddingTop: 14,
                  }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 4 }}>SYMPTOMS</div>
                      <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6 }}>{rx.symptoms}</div>
                    </div>
                    <div style={{
                      background: rx.escalation ? C.redBg : C.accentBg,
                      borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + (rx.escalation ? C.redDm : C.line),
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: rx.escalation ? C.red : C.accentDm, marginBottom: 6,
                      }}>
                        {rx.escalation ? 'EMERGENCY MANAGEMENT' : 'MANAGEMENT'}
                      </div>
                      <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7 }}>
                        {rx.management}
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
  }, [expandedReaction]);

  // ── Cold Chain Temperature Graph Renderer ─────────────────
  const renderTempGraph = useCallback(() => {
    // SVG coordinate system: viewBox 0 0 700 350
    // Temperature range: -100°C to 20°C (y-axis)
    // Time range: 0 to 8 hours (x-axis)
    const svgW = 700, svgH = 350;
    const padL = 60, padR = 20, padT = 20, padB = 40;
    const chartW = svgW - padL - padR;
    const chartH = svgH - padT - padB;
    const tempMin = -100, tempMax = 20;

    const tempToY = (t) => padT + chartH * (1 - (t - tempMin) / (tempMax - tempMin));
    const hourToX = (h) => padL + (h / 8) * chartW;

    // Vaccine storage bands
    const bands = [
      { name: 'Pfizer Ultra-Cold', lo: -90, hi: -60, color: C.purple, colorBg: C.purpleBg },
      { name: 'Moderna Frozen', lo: -25, hi: -15, color: C.blue, colorBg: C.blueBg },
      { name: 'J&J Refrigerated', lo: 2, hi: 8, color: C.yellow, colorBg: C.yellowBg },
    ];

    // Simulated temperature trace: delivery truck over 8 hours
    // Starts at -75°C (ultra-cold), rises as refrigeration fails at hour 3, then stabilizes
    const tracePoints = [
      { h: 0, t: -75 },
      { h: 0.5, t: -74 },
      { h: 1, t: -72 },
      { h: 1.5, t: -70 },
      { h: 2, t: -68 },
      { h: 2.5, t: -65 },
      { h: 3, t: -58 },   // Excursion begins: compressor failure
      { h: 3.5, t: -42 },
      { h: 4, t: -28 },
      { h: 4.5, t: -18 },  // In Moderna range briefly
      { h: 5, t: -10 },    // Leaves Moderna range
      { h: 5.5, t: -2 },
      { h: 6, t: 4 },      // Enters J&J range
      { h: 6.5, t: 8 },    // Top of J&J range
      { h: 7, t: 12 },     // Above J&J range
      { h: 7.5, t: 14 },
      { h: 8, t: 15 },     // Stabilizes at ambient
    ];

    const tracePath = tracePoints.map((p, i) =>
      (i === 0 ? 'M' : 'L') + ' ' + hourToX(p.h).toFixed(1) + ' ' + tempToY(p.t).toFixed(1)
    ).join(' ');

    // Identify excursion zones for each vaccine
    const excursions = [
      { vaccine: 'Pfizer', start: 3, end: 8, note: 'Left ultra-cold range at hour 3. All Pfizer doses compromised.' },
      { vaccine: 'Moderna', start: 0, end: 4, note: 'Never in -25 to -15°C range during first 4 hours. Passed through range briefly at ~4.5h but insufficient time.' },
      { vaccine: 'J&J', start: 0, end: 6, note: 'Below range for first 6 hours. Briefly in range hours 6-6.5, then exceeded upper limit.' },
    ];

    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          COLD CHAIN TEMPERATURE MONITORING — DELIVERY SIMULATION
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 16, maxWidth: 720,
        }}>
          A delivery truck carrying all three vaccine products experiences a refrigeration compressor
          failure at hour 3. The temperature trace shows the cascade of cold chain excursions.
          Identify which vaccines were compromised and when the break occurred.
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <svg viewBox={'0 0 ' + svgW + ' ' + svgH} style={{
            width: '100%', maxWidth: 700, display: 'block',
            background: C.card, borderRadius: 8, border: '1px solid ' + C.cardBd,
          }}>
            {/* Vaccine storage bands */}
            {bands.map(b => (
              <g key={b.name}>
                <rect
                  x={padL} y={tempToY(b.hi)}
                  width={chartW} height={tempToY(b.lo) - tempToY(b.hi)}
                  fill={b.color} opacity="0.08"
                />
                <line x1={padL} y1={tempToY(b.hi)} x2={padL + chartW} y2={tempToY(b.hi)}
                  stroke={b.color} strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
                <line x1={padL} y1={tempToY(b.lo)} x2={padL + chartW} y2={tempToY(b.lo)}
                  stroke={b.color} strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
                <text x={padL + chartW + 4} y={(tempToY(b.hi) + tempToY(b.lo)) / 2 + 3}
                  fill={b.color} fontSize="8" fontFamily="'IBM Plex Mono',monospace" fontWeight="600">
                  {b.name.split(' ')[0]}
                </text>
              </g>
            ))}

            {/* Y-axis gridlines and labels */}
            {[-80, -60, -40, -20, 0, 20].map(t => (
              <g key={'y-' + t}>
                <line x1={padL} y1={tempToY(t)} x2={padL + chartW} y2={tempToY(t)}
                  stroke={C.line} strokeWidth="0.5" />
                <text x={padL - 8} y={tempToY(t) + 3}
                  fill={C.tx3} fontSize="9" fontFamily="'IBM Plex Mono',monospace" textAnchor="end">
                  {t}{'\u00B0'}C
                </text>
              </g>
            ))}

            {/* X-axis labels */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(h => (
              <g key={'x-' + h}>
                <line x1={hourToX(h)} y1={padT} x2={hourToX(h)} y2={padT + chartH}
                  stroke={C.line} strokeWidth="0.5" />
                <text x={hourToX(h)} y={svgH - 8}
                  fill={C.tx3} fontSize="9" fontFamily="'IBM Plex Mono',monospace" textAnchor="middle">
                  {h}h
                </text>
              </g>
            ))}

            {/* Compressor failure marker */}
            <line x1={hourToX(3)} y1={padT} x2={hourToX(3)} y2={padT + chartH}
              stroke={C.red} strokeWidth="1.5" strokeDasharray="6,3" opacity="0.6" />
            <text x={hourToX(3)} y={padT - 4}
              fill={C.red} fontSize="8" fontFamily="'IBM Plex Mono',monospace" textAnchor="middle" fontWeight="600">
              COMPRESSOR FAILURE
            </text>

            {/* Temperature trace line */}
            <path d={tracePath} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />

            {/* Data points */}
            {tracePoints.map((p, i) => (
              <circle key={i} cx={hourToX(p.h)} cy={tempToY(p.t)} r="3"
                fill="#fff" stroke={C.bg} strokeWidth="1" />
            ))}

            {/* Axis labels */}
            <text x={padL + chartW / 2} y={svgH - 0}
              fill={C.tx3} fontSize="10" fontFamily="'IBM Plex Mono',monospace" textAnchor="middle">
              TIME (HOURS)
            </text>
            <text x={12} y={padT + chartH / 2}
              fill={C.tx3} fontSize="10" fontFamily="'IBM Plex Mono',monospace" textAnchor="middle"
              transform={'rotate(-90, 12, ' + (padT + chartH / 2) + ')'}>
              TEMPERATURE
            </text>
          </svg>
        </div>

        {/* Band legend */}
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20,
          justifyContent: 'center',
        }}>
          {bands.map(b => (
            <div key={b.name} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', background: b.colorBg, borderRadius: 4,
              border: '1px solid ' + b.color + '30',
            }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: b.color, opacity: 0.6 }} />
              <span style={{ fontFamily: Mono, fontSize: 12, color: b.color, fontWeight: 600 }}>{b.name}</span>
              <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>{b.lo}{'\u00B0'}C to {b.hi}{'\u00B0'}C</span>
            </div>
          ))}
        </div>

        {/* "What went wrong?" reveal */}
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 8, padding: 20,
        }}>
          <button onClick={() => setShowColdChainReveal(prev => !prev)}
            style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
            <span style={{ fontFamily: Mono, fontSize: 12, fontWeight: 600, color: C.red }}>
              {showColdChainReveal ? '\▼' : '\u25B6'} What went wrong?
            </span>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
              Cold Chain Break Analysis
            </span>
          </button>

          {showColdChainReveal && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.7,
                marginBottom: 16,
              }}>
                At hour 3, the delivery truck's refrigeration compressor failed. Without active cooling,
                the insulated compartment began warming at approximately 12-15{'\u00B0'}C per hour. This
                single point of failure compromised the entire cold chain for all three products.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {excursions.map(exc => {
                  const vax = VACCINES.find(v => v.name.includes(exc.vaccine));
                  return (
                    <div key={exc.vaccine} style={{
                      padding: 14, borderRadius: 6,
                      background: vax ? vax.colorBg : C.accentBg,
                      border: '1px solid ' + (vax ? vax.colorDm + '40' : C.line),
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{
                          fontFamily: Mono, fontSize: 11, fontWeight: 600,
                          color: vax ? vax.color : C.tx,
                        }}>
                          {exc.vaccine}
                        </span>
                        <span style={{
                          fontFamily: Mono, fontSize: 11, padding: '2px 6px', borderRadius: 3,
                          background: C.redBg, color: C.red, fontWeight: 600,
                        }}>
                          COMPROMISED
                        </span>
                      </div>
                      <div style={{
                        fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6,
                      }}>
                        {exc.note}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{
                marginTop: 14, padding: 12, background: C.redBg, borderRadius: 6,
                border: '1px solid ' + C.redDm,
              }}>
                <div style={{ fontFamily: Mono, fontSize: 11, color: C.red, marginBottom: 6 }}>CORRECT RESPONSE</div>
                <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7 }}>
                  Quarantine all product immediately. Do NOT administer or discard. Contact each manufacturer
                  with data logger records. The Pfizer product is almost certainly unrecoverable. Moderna and J&J
                  may have limited viability windows depending on manufacturer assessment. File temperature
                  excursion report with state immunization program within 24 hours. This single compressor failure
                  potentially wasted hundreds of doses worth tens of thousands of dollars.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }, [showColdChainReveal]);

  // ── Adverse Event Investigation data ────────────────────────
  const VAERS_CASES = useMemo(() => [
    {
      id: 0, title: 'Post-mRNA Myocarditis',
      report: 'A 19-year-old male college student presents to the ED 3 days after receiving his second dose of BNT162b2 (Pfizer-BioNTech COVID-19 vaccine). Chief complaint: chest pain worse with deep breathing, fatigue. Troponin elevated (1.2 ng/mL), CRP elevated (48 mg/L). ECG shows diffuse ST elevation. Cardiac MRI confirms myocarditis with preserved ejection fraction (55%). No prior cardiac history, no recent viral illness, no substance use. Symptoms resolve with NSAIDs over 5 days.',
      assessment: {
        causality: 'Probable (Bradford Hill: temporal association strong, biological plausibility established via mRNA mechanism, consistency with epidemiologic signal in young males, dose-response seen with dose 2 > dose 1)',
        severity: 'Grade 2 (Moderate) -- hospitalization required, no long-term sequelae, resolved with standard treatment',
        reporting: 'Mandatory VAERS report required per CDC reporting requirements for myocarditis/pericarditis following mRNA vaccines. Also reportable to V-safe.',
        management: 'NSAIDs for symptom management. Restrict physical activity for 3-6 months per ACC/AHA guidelines. Follow-up cardiac MRI at 3 months. Discussion regarding risk-benefit of additional doses.',
      },
      bradfordHill: { temporality: 4, strength: 3, consistency: 4, plausibility: 4, specificity: 3, gradient: 3 },
    },
    {
      id: 1, title: 'Anaphylaxis Following First Dose',
      report: 'A 42-year-old female with known allergy to polyethylene glycol (PEG) in cosmetics receives first dose of mRNA-1273 (Moderna COVID-19 vaccine). Within 8 minutes: urticaria, facial angioedema, wheezing, hypotension (BP 78/50), tachycardia (HR 128). Epinephrine 0.3mg IM administered x2. Transferred to ED. History significant for prior anaphylaxis to a colonoscopy prep solution (which contains PEG). Resolved with epinephrine and IV fluids. Discharged after 6-hour observation.',
      assessment: {
        causality: 'Definite (Bradford Hill: immediate temporal association, known mechanism via PEG hypersensitivity -- PEG is an excipient in both mRNA vaccines, prior PEG allergy documented, Brighton Collaboration Level 1 certainty for anaphylaxis classification)',
        severity: 'Grade 3 (Severe) -- life-threatening reaction requiring emergency intervention. Potential Grade 4 if epinephrine had been delayed.',
        reporting: 'Mandatory VAERS report. Anaphylaxis is a Table Injury under the National Childhood Vaccine Injury Act (NCVIA) when occurring within 4 hours. Patient should be referred to the Countermeasures Injury Compensation Program (CICP).',
        management: 'Immediate epinephrine per anaphylaxis protocol. Absolute contraindication to further doses of PEG-containing vaccines. Refer to allergist for PEG skin testing. May consider Ad26.COV2.S (J&J) which uses polysorbate 80 instead of PEG, under allergist supervision.',
      },
      bradfordHill: { temporality: 5, strength: 5, consistency: 5, plausibility: 5, specificity: 4, gradient: 4 },
    },
    {
      id: 2, title: 'Temporal but Unlikely Causal',
      report: 'A 67-year-old male with history of hypertension, Type 2 diabetes, BMI 34, and 40-pack-year smoking history suffers a myocardial infarction (STEMI) 12 days after receiving Ad26.COV2.S (J&J COVID-19 vaccine). Cardiac catheterization reveals 95% occlusion of the LAD with chronic atherosclerotic disease in multiple vessels. Patient had missed his statin and antihypertensive medications for 2 weeks prior to the event. Family history positive for MI (father at age 58).',
      assessment: {
        causality: 'Unlikely (Bradford Hill: temporal association present but weak at 12 days, no biological plausibility for vaccine-induced atherosclerotic MI, strong alternative explanation via established cardiovascular risk factors, no epidemiologic signal for STEMI post-vaccination in large-scale studies)',
        severity: 'Grade 4 (Life-threatening) -- STEMI with emergency PCI required. However, causality assessment is separate from severity.',
        reporting: 'VAERS report appropriate for completeness (any serious adverse event following vaccination should be reported regardless of suspected causality). The causality assessment is made by epidemiologists, not the reporter.',
        management: 'Standard STEMI protocol. Medication compliance counseling. No vaccine-specific management changes. Future COVID-19 vaccination is NOT contraindicated -- this event is unrelated to vaccination.',
      },
      bradfordHill: { temporality: 2, strength: 1, consistency: 1, plausibility: 1, specificity: 1, gradient: 1 },
    },
  ], []);

  const renderAdverse = useCallback(() => {
    var caseData = VAERS_CASES[adverseIdx];
    var answers = adverseAnswers[adverseIdx] || {};
    var isRevealed = adverseRevealed[adverseIdx];
    var fields = ['causality', 'severity', 'reporting', 'management'];

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 4, height: 28, background: C.red, borderRadius: 2 }} />
          <h2 style={{ fontFamily: Serif, fontSize: 20, fontWeight: 700, color: C.tx, margin: 0 }}>
            Adverse Event Investigation
          </h2>
        </div>
        <p style={{ fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.65, marginBottom: 16, maxWidth: 680 }}>
          Three VAERS-style case reports. Evaluate causality using Bradford Hill criteria, assess severity (Grade 1-5), determine reporting obligations, and recommend clinical management.
        </p>

        {/* Case selector */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          {VAERS_CASES.map((c, i) => (
            <button key={i} onClick={() => setAdverseIdx(i)} style={{
              flex: 1, padding: '8px 10px', borderRadius: 4, cursor: 'pointer', textAlign: 'center',
              background: adverseIdx === i ? C.redBg : 'transparent',
              border: adverseIdx === i ? '1px solid ' + C.redDm : '1px solid ' + C.line,
            }}>
              <span style={{ fontFamily: Mono, fontSize: 11, fontWeight: 600, color: adverseIdx === i ? C.red : C.tx3, display: 'block' }}>Case {i + 1}</span>
              <span style={{ fontFamily: Sans, fontSize: 9, color: C.tx3 }}>{c.title.split(' ').slice(0, 2).join(' ')}</span>
            </button>
          ))}
        </div>

        {/* Case report */}
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6,
          padding: 16, marginBottom: 16, borderTop: '3px solid ' + C.red,
        }}>
          <div style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.1em', color: C.redDm, marginBottom: 6 }}>VAERS CASE REPORT</div>
          <h3 style={{ fontFamily: Serif, fontSize: 16, color: C.tx, marginBottom: 10 }}>{caseData.title}</h3>
          <p style={{ fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.7, borderLeft: '3px solid ' + C.line, paddingLeft: 12 }}>
            {caseData.report}
          </p>
        </div>

        {/* Bradford Hill radar (simplified bar chart) */}
        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16, marginBottom: 16 }}>
          <div style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.08em', color: C.tx3, marginBottom: 10 }}>BRADFORD HILL CRITERIA STRENGTH</div>
          {Object.entries(caseData.bradfordHill).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, minWidth: 90, textTransform: 'capitalize' }}>{key}</span>
              <div style={{ flex: 1, height: 6, background: C.line, borderRadius: 3, maxWidth: 200, overflow: 'hidden' }}>
                <div style={{ width: (val / 5 * 100) + '%', height: '100%', background: val >= 4 ? C.accent : val >= 3 ? C.yellow : C.tx3, borderRadius: 3 }} />
              </div>
              <span style={{ fontFamily: Mono, fontSize: 11, color: val >= 4 ? C.accent : C.tx3, fontWeight: 600 }}>{val}/5</span>
            </div>
          ))}
        </div>

        {/* User assessment fields */}
        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16, marginBottom: 16 }}>
          <div style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.08em', color: C.accentDm, marginBottom: 10 }}>YOUR ASSESSMENT</div>
          {fields.map(f => (
            <div key={f} style={{ marginBottom: 12 }}>
              <label style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>{f}</label>
              <textarea
                value={answers[f] || ''}
                onChange={e => {
                  var val = e.target.value;
                  setAdverseAnswers(prev => {
                    var next = Object.assign({}, prev);
                    if (!next[adverseIdx]) next[adverseIdx] = {};
                    next[adverseIdx] = Object.assign({}, next[adverseIdx], { [f]: val });
                    return next;
                  });
                }}
                rows={2}
                style={{
                  width: '100%', padding: '8px 10px', borderRadius: 4,
                  background: 'rgba(0,0,0,.2)', border: '1px solid ' + C.line,
                  color: C.tx, fontFamily: Sans, fontSize: 12, resize: 'vertical',
                  lineHeight: 1.5,
                }}
                placeholder={'Enter your ' + f + ' assessment...'}
              />
            </div>
          ))}
          {!isRevealed && (
            <button onClick={() => setAdverseRevealed(prev => ({ ...prev, [adverseIdx]: true }))} style={{
              padding: '8px 20px', borderRadius: 4, cursor: 'pointer',
              background: C.accentBg, border: '1px solid ' + C.accentDm, color: C.accent,
              fontFamily: Mono, fontSize: 11,
            }}>
              REVEAL CDC EXPERT ASSESSMENT
            </button>
          )}
        </div>

        {/* Expert assessment */}
        {isRevealed && (
          <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16, borderTop: '3px solid ' + C.accent }}>
            <div style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.1em', color: C.accent, marginBottom: 10 }}>CDC EXPERT ASSESSMENT</div>
            {fields.map(f => (
              <div key={f} style={{ marginBottom: 12, padding: '8px 12px', background: C.accentBg, borderRadius: 4, borderLeft: '3px solid ' + C.accentDm }}>
                <div style={{ fontFamily: Mono, fontSize: 10, color: C.accentDm, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>{f}</div>
                <p style={{ fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.7, margin: 0 }}>{caseData.assessment[f]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }, [adverseIdx, adverseAnswers, adverseRevealed, VAERS_CASES]);

  // ── Equity Analyzer data ──────────────────────────────────────
  const EQUITY_GROUPS = useMemo(() => [
    { id: 'hcw', label: 'Healthcare Workers', population: 18000000, mortalityRate: 0.002, exposureRisk: 5, essentiality: 5, vulnerability: 2, color: C.blue },
    { id: 'elderly', label: 'Elderly (65+)', population: 54000000, mortalityRate: 0.054, exposureRisk: 3, essentiality: 2, vulnerability: 5, color: C.red },
    { id: 'essential', label: 'Essential Workers', population: 45000000, mortalityRate: 0.003, exposureRisk: 4, essentiality: 4, vulnerability: 2, color: C.yellow },
    { id: 'highrisk', label: 'High-Risk Conditions', population: 42000000, mortalityRate: 0.035, exposureRisk: 3, essentiality: 2, vulnerability: 4, color: C.purple },
    { id: 'adult', label: 'General Adult (18-64)', population: 160000000, mortalityRate: 0.001, exposureRisk: 3, essentiality: 3, vulnerability: 1, color: C.accent },
    { id: 'pediatric', label: 'Pediatric (5-17)', population: 50000000, mortalityRate: 0.00002, exposureRisk: 3, essentiality: 1, vulnerability: 1, color: C.blueDm },
  ], []);

  const renderEquity = useCallback(() => {
    var totalPct = Object.values(equityAllocation).reduce((s, v) => s + v, 0);
    var totalDoses = 50000000; // 50M doses available

    var computeOutcome = function(alloc) {
      var livesSaved = 0;
      var equityScore = 0;
      EQUITY_GROUPS.forEach(function(g) {
        var pct = alloc[g.id] || 0;
        var doses = Math.round(totalDoses * pct / 100);
        var coverage = Math.min(1, doses / g.population);
        var saved = Math.round(g.population * g.mortalityRate * coverage * 0.9); // 90% efficacy
        livesSaved += saved;
        equityScore += coverage * g.vulnerability;
      });
      equityScore = Math.round(equityScore / EQUITY_GROUPS.length * 100) / 100;
      return { livesSaved: livesSaved, equityScore: equityScore };
    };

    var utilitarian = { hcw: 5, elderly: 40, essential: 5, highrisk: 35, adult: 10, pediatric: 5 };
    var equityWeighted = { hcw: 15, elderly: 25, essential: 15, highrisk: 25, adult: 15, pediatric: 5 };
    var userOutcome = computeOutcome(equityAllocation);
    var utilOutcome = computeOutcome(utilitarian);
    var eqOutcome = computeOutcome(equityWeighted);

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 4, height: 28, background: C.purple, borderRadius: 2 }} />
          <h2 style={{ fontFamily: Serif, fontSize: 20, fontWeight: 700, color: C.tx, margin: 0 }}>
            Vaccine Distribution Equity Analyzer
          </h2>
        </div>
        <p style={{ fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.65, marginBottom: 16, maxWidth: 680 }}>
          You have 50 million vaccine doses to allocate across 6 population groups. Adjust percentages to optimize for either maximum lives saved (utilitarian) or equitable access (vulnerability-weighted). See how your strategy compares.
        </p>

        {/* Allocation sliders */}
        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.08em', color: C.accentDm }}>ALLOCATION (%)</span>
            <span style={{
              fontFamily: Mono, fontSize: 11, fontWeight: 600,
              color: totalPct === 100 ? C.accent : C.red,
            }}>
              Total: {totalPct}% {totalPct !== 100 ? '(must equal 100%)' : ''}
            </span>
          </div>
          {EQUITY_GROUPS.map(g => (
            <div key={g.id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontFamily: Sans, fontSize: 12, color: C.tx }}>{g.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: Mono, fontSize: 10, color: C.tx3 }}>Pop: {(g.population / 1000000).toFixed(0)}M</span>
                  <span style={{ fontFamily: Mono, fontSize: 10, color: C.tx3 }}>Mort: {(g.mortalityRate * 100).toFixed(2)}%</span>
                  <span style={{ fontFamily: Mono, fontSize: 12, fontWeight: 700, color: g.color, minWidth: 30, textAlign: 'right' }}>{equityAllocation[g.id]}%</span>
                </div>
              </div>
              <input type="range" min="0" max="60" value={equityAllocation[g.id]}
                onChange={e => {
                  var val = parseInt(e.target.value);
                  setEquityAllocation(prev => ({ ...prev, [g.id]: val }));
                }}
                style={{ width: '100%', accentColor: g.color }}
              />
            </div>
          ))}

          {totalPct === 100 && !equitySubmitted && (
            <button onClick={() => setEquitySubmitted(true)} style={{
              padding: '8px 20px', borderRadius: 4, cursor: 'pointer',
              background: C.accentBg, border: '1px solid ' + C.accentDm, color: C.accent,
              fontFamily: Mono, fontSize: 11, marginTop: 8,
            }}>
              ANALYZE MY ALLOCATION
            </button>
          )}
        </div>

        {/* Results comparison */}
        {equitySubmitted && totalPct === 100 && (
          <div>
            {/* Three-way comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Your Allocation', outcome: userOutcome, color: C.accent },
                { label: 'Utilitarian Optimal', outcome: utilOutcome, color: C.red },
                { label: 'Equity-Weighted', outcome: eqOutcome, color: C.purple },
              ].map(s => (
                <div key={s.label} style={{
                  background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6,
                  padding: 14, textAlign: 'center', borderTop: '3px solid ' + s.color,
                }}>
                  <div style={{ fontFamily: Mono, fontSize: 10, color: s.color, letterSpacing: '.06em', marginBottom: 6 }}>{s.label.toUpperCase()}</div>
                  <div style={{ fontFamily: Mono, fontSize: 22, fontWeight: 700, color: C.tx }}>{(s.outcome.livesSaved / 1000).toFixed(0)}K</div>
                  <div style={{ fontFamily: Sans, fontSize: 10, color: C.tx3 }}>lives saved</div>
                  <div style={{ marginTop: 6 }}>
                    <span style={{ fontFamily: Mono, fontSize: 14, fontWeight: 600, color: s.color }}>{s.outcome.equityScore.toFixed(2)}</span>
                    <div style={{ fontFamily: Sans, fontSize: 10, color: C.tx3 }}>equity score</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Group-by-group breakdown */}
            <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16, marginBottom: 16 }}>
              <div style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.08em', color: C.tx3, marginBottom: 10 }}>DOSES PER GROUP</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, textAlign: 'left', padding: '4px 8px', borderBottom: '1px solid ' + C.line }}>Group</th>
                    <th style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, textAlign: 'right', padding: '4px 8px', borderBottom: '1px solid ' + C.line }}>Your %</th>
                    <th style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, textAlign: 'right', padding: '4px 8px', borderBottom: '1px solid ' + C.line }}>Doses</th>
                    <th style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, textAlign: 'right', padding: '4px 8px', borderBottom: '1px solid ' + C.line }}>Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {EQUITY_GROUPS.map(g => {
                    var doses = Math.round(totalDoses * equityAllocation[g.id] / 100);
                    var coverage = Math.min(100, Math.round(doses / g.population * 100));
                    return (
                      <tr key={g.id}>
                        <td style={{ fontFamily: Sans, fontSize: 11, color: C.tx, padding: '4px 8px', borderBottom: '1px solid ' + C.line }}>{g.label}</td>
                        <td style={{ fontFamily: Mono, fontSize: 11, color: g.color, textAlign: 'right', padding: '4px 8px', borderBottom: '1px solid ' + C.line }}>{equityAllocation[g.id]}%</td>
                        <td style={{ fontFamily: Mono, fontSize: 11, color: C.tx2, textAlign: 'right', padding: '4px 8px', borderBottom: '1px solid ' + C.line }}>{(doses / 1000000).toFixed(1)}M</td>
                        <td style={{ fontFamily: Mono, fontSize: 11, color: coverage >= 80 ? C.accent : C.tx3, textAlign: 'right', padding: '4px 8px', borderBottom: '1px solid ' + C.line }}>{coverage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Analysis note */}
            <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16, borderTop: '3px solid ' + C.purple }}>
              <div style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.1em', color: C.purpleDm, marginBottom: 8 }}>ETHICAL FRAMEWORK ANALYSIS</div>
              <p style={{ fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.7, marginBottom: 10 }}>
                The utilitarian approach maximizes total lives saved by prioritizing groups with the highest mortality rates (elderly, high-risk conditions). The equity-weighted approach distributes more broadly, ensuring no group is left without meaningful access, even if it saves fewer total lives.
              </p>
              <p style={{ fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.7, marginBottom: 0 }}>
                The CDC's Advisory Committee on Immunization Practices (ACIP) used a hybrid framework balancing four principles: maximizing benefits and minimizing harms, promoting justice, mitigating health inequities, and promoting transparency. Real-world allocation was Phase 1a (healthcare workers + long-term care), 1b (75+ and essential workers), 1c (65-74 and high-risk), then general population -- a compromise between pure utility and equity.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }, [equityAllocation, equitySubmitted, EQUITY_GROUPS]);

  // ── Main Render ────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', color: C.tx, fontFamily: Sans, position:'relative',
      background: 'linear-gradient(180deg, #040a04 0%, #061008 40%, #040a04 100%)',
    }}>
      <MolecularBg />
      <DnaHelixBg />
      {/* Subtle hex grid pattern */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0, pointerEvents:'none', zIndex:0,
        backgroundImage: 'radial-gradient(circle, rgba(48,160,64,.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(4,10,4,.94)', backdropFilter: 'blur(12px)',
        borderBottom: '2px solid rgba(48,160,64,.15)', padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer',
        }}>
          {'\←'} Back to Coursework
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {/* Rx pharmacy icon */}
          <svg width="16" height="16" viewBox="0 0 20 20" style={{opacity:0.5}}>
            <text x="10" y="15" textAnchor="middle" fill={C.accent} fontSize="14" fontWeight="700" fontFamily={Serif}>Rx</text>
          </svg>
          <span style={{ fontFamily: Mono, fontSize: 12, color: C.accent, letterSpacing:'.08em', fontWeight:600 }}>
            WEGMANS {'\u2014'} PHARMACY TECHNICIAN
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position:'relative', zIndex:2 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display:'inline-block', padding:'3px 10px', marginBottom:12,
            background:'rgba(48,160,64,.06)', border:'1px solid rgba(48,160,64,.2)',
            borderRadius:2, fontFamily:Mono, fontSize:11, color:C.accent,
            letterSpacing:'.1em', fontWeight:600,
          }}>
            PHARMACEUTICAL OPERATIONS
          </div>
          <h1 style={{
            fontFamily: Serif, fontSize: 32, fontWeight: 700,
            color: C.tx, letterSpacing: '-.03em', marginBottom: 8,
          }}>
            Vaccine Distribution Planner
          </h1>
          <p style={{
            fontFamily: Serif, fontSize: 15, color: C.tx2,
            lineHeight: 1.6, marginBottom: 4, maxWidth: 720,
          }}>
            Manage a high-volume COVID-19 vaccination site during peak pandemic operations.
            Navigate priority tier scheduling, cold chain logistics for three vaccine products
            with radically different storage requirements, and adverse reaction protocols
            from routine injection-site reactions to life-threatening anaphylaxis.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 6px' }}>
            <ShieldIcon /><Tip id="eua" />
          </div>
          <p style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3, lineHeight: 1.65, marginBottom: 12,
          }}>
            Wegmans Pharmacy, COVID-19 Immunizer, CPhT
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

          {answeredCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>SCENARIOS COMPLETED</span>
              <div style={{ flex: 1, maxWidth: 200, height: 4, background: C.line, borderRadius: 2 }}>
                <div style={{
                  width: (answeredCount / 3 * 100) + '%', height: '100%', borderRadius: 2,
                  background: answeredCount === 3 ? C.accent : C.yellow,
                  transition: 'width .3s ease',
                }} />
              </div>
              <span style={{
                fontFamily: Mono, fontSize: 12,
                color: answeredCount === 3 ? C.accent : C.yellow,
              }}>
                {answeredCount}/3
              </span>
            </div>
          )}
        </div>

        <ModeSwitch />

        {mode === 'operations' && renderOperations()}
        {mode === 'coldchain' && renderColdChain()}
        {mode === 'tempgraph' && renderTempGraph()}
        {mode === 'protocols' && renderProtocols()}
        {mode === 'adverse' && renderAdverse()}
        {mode === 'equity' && renderEquity()}

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
