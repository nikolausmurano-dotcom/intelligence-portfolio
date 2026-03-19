// UscriView.jsx — Resettlement Case Manager
// U.S. Committee for Refugees & Immigrants (USCRI)
// "Refugee Resettlement Resource Allocation Simulation"
//
// Interactive case management simulation: 5 refugee families from different
// countries of origin, each with unique needs. Visitor allocates limited
// resources across cases and sees outcomes. Three modes: Cases (manage families),
// Resources (allocation dashboard), Outcomes (impact analysis).
// Self-contained React component. Globals: useState, useCallback, useMemo

// ── Palette: Warm institutional on dark ─────────────────────
const C = {
  bg:      '#0a0808',
  card:    'rgba(16,12,10,.94)',
  cardBd:  'rgba(80,112,160,.14)',
  tx:      '#d0ccc4',
  tx2:     '#a8a098',
  tx3:     '#787068',
  accent:  '#4a80b8',
  accentDm:'#3868a8',
  accentBg:'rgba(74,128,184,.08)',
  green:   '#3a9858',
  greenDm: '#288040',
  greenBg: 'rgba(58,152,88,.08)',
  yellow:  '#b8a030',
  yellowDm:'#988020',
  yellowBg:'rgba(184,160,48,.08)',
  red:     '#a84848',
  redDm:   '#883030',
  redBg:   'rgba(168,72,72,.08)',
  orange:  '#c87830',
  orangeDm:'#a06020',
  line:    'rgba(80,112,160,.10)',
  unBlue:  '#4a90d0',
  manila:  'rgba(200,180,140,.06)',
};
const Mono  = "'IBM Plex Mono',monospace";
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";

// ── SVG Background: World map silhouette ─────────────────
const WorldMapBg = () => (
  <svg viewBox="0 0 1000 500" style={{
    position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
    width:'90vw', maxWidth:1200, opacity:0.025, pointerEvents:'none', zIndex:0,
  }}>
    {/* Simplified world map continents */}
    <path d="M160,120 Q200,80 280,100 Q320,90 340,110 Q360,100 380,120 Q400,110 420,130 L430,180 Q410,200 380,210 Q340,220 300,200 Q260,210 220,190 Q180,170 160,140 Z" fill="#4a80b8" />
    <path d="M460,100 Q520,60 600,80 Q680,70 720,100 Q760,90 780,120 Q800,110 820,140 L830,180 Q810,220 760,240 Q700,260 640,230 Q580,250 520,220 Q480,200 460,160 Z" fill="#4a80b8" />
    <path d="M300,260 Q340,240 380,260 Q400,280 380,320 Q360,350 320,340 Q280,320 300,280 Z" fill="#4a80b8" />
    <path d="M480,240 Q540,230 580,260 Q600,290 580,320 Q540,340 500,320 Q470,290 480,260 Z" fill="#4a80b8" />
    <path d="M700,280 Q760,260 820,290 Q860,320 840,360 Q800,380 740,360 Q700,330 700,300 Z" fill="#4a80b8" />
    <path d="M140,280 Q180,270 220,290 Q240,320 220,350 Q180,370 140,340 Q120,310 140,290 Z" fill="#4a80b8" />
  </svg>
);

// ── Case file card wrapper ─────────────────────────────────
const CaseFileCard = ({ children, style = {}, caseNumber }) => (
  <div style={{
    background: 'rgba(16,12,10,.96)', border: '1px solid rgba(80,112,160,.14)',
    borderRadius: '1px 6px 6px 6px', padding: 28, position: 'relative',
    borderLeft: '4px solid ' + C.accent,
    boxShadow: '0 2px 10px rgba(0,0,0,.3)',
    ...style,
  }}>
    {/* Tab label at top-right */}
    {caseNumber && (
      <div style={{
        position:'absolute', top:-1, right:16, padding:'2px 10px',
        background:'rgba(74,128,184,.15)', border:'1px solid rgba(74,128,184,.25)',
        borderTop:'none', borderRadius:'0 0 4px 4px',
        fontFamily: Mono, fontSize:10, color:C.accent, letterSpacing:'.08em', fontWeight:600,
      }}>
        CASE {caseNumber}
      </div>
    )}
    {children}
  </div>
);

// ── Skills ───────────────────────────────────────────────────
const SKILLS = [
  'Refugee Case Management',
  'Cultural Competency',
  'Resource Allocation',
  'Needs Assessment',
  'Community Partnership',
  'Trauma-Informed Care',
  'Employment Readiness',
  'Language Access Services',
];

// ── Refugee Journey Data (SVG mode) ────────────────────────────
const REFUGEE_JOURNEYS = [
  { id: 'afghan', label: 'Ahmad (Afghanistan)', color: '#cc6040', origin: { x: 80, y: 80, label: 'Kabul' }, transit: { x: 300, y: 60, label: 'Islamabad \→ Ankara' }, dest: { x: 600, y: 200, label: 'Albany, NY' }, detail: 'Fled Taliban after working with US forces. 18-month visa process. SIV program. Arrived with 3 children, no English.' },
  { id: 'drc', label: 'Marie (DRC)', color: '#5080a0', origin: { x: 80, y: 160, label: 'Bukavu' }, transit: { x: 280, y: 140, label: 'Nyarugusu Camp \→ Nairobi' }, dest: { x: 600, y: 200, label: 'Albany, NY' }, detail: 'Fled ethnic violence. 7 years in refugee camp. UNHCR referral. Arrived alone \— husband killed in conflict.' },
  { id: 'rohingya', label: 'Rahim (Myanmar)', color: '#a06040', origin: { x: 80, y: 240, label: 'Rakhine State' }, transit: { x: 300, y: 220, label: 'Cox\'s Bazar \→ KL' }, dest: { x: 600, y: 200, label: 'Albany, NY' }, detail: 'Rohingya genocide survivor. Stateless \— no citizenship in any country. 4 years in Bangladesh camp. Resettled through UNHCR lottery.' },
  { id: 'ukraine', label: 'Olena (Ukraine)', color: '#40a080', origin: { x: 80, y: 320, label: 'Kharkiv' }, transit: { x: 300, y: 300, label: 'Warsaw \→ JFK' }, dest: { x: 600, y: 200, label: 'Albany, NY' }, detail: 'Fled 2022 Russian invasion. Uniting for Ukraine program. Arrived within 3 months \— fastest processing of any group.' },
  { id: 'somali', label: 'Fatima (Somalia)', color: '#c0a040', origin: { x: 80, y: 380, label: 'Mogadishu' }, transit: { x: 280, y: 360, label: 'Dadaab Camp \→ Istanbul' }, dest: { x: 600, y: 200, label: 'Albany, NY' }, detail: 'Fled al-Shabaab. 5 years in Dadaab (world\'s largest camp). Extreme vetting process took 3 years. Arrived with mother and 2 siblings.' },
];

// ── Provenance ───────────────────────────────────────────────
const PROVENANCE = [
  { label: 'USCRI', desc: 'U.S. Committee for Refugees & Immigrants' },
  { label: 'ORR', desc: 'Office of Refugee Resettlement Guidelines' },
  { label: 'R&P Program', desc: 'Reception & Placement Framework' },
  { label: 'IRC/UNHCR', desc: 'International Standards of Care' },
];

// ── Resource Pool ────────────────────────────────────────────
const INITIAL_RESOURCES = {
  housing: { total: 12, label: 'Housing Vouchers', icon: '\u{1F3E0}', desc: 'Monthly rental assistance units' },
  employment: { total: 8, label: 'Employment Services', icon: '\u{1F4BC}', desc: 'Job placement + training slots' },
  language: { total: 10, label: 'ESL/Language Hours', icon: '\u{1F4DD}', desc: 'Weekly language instruction blocks' },
  medical: { total: 6, label: 'Medical Referrals', icon: '\u{2695}', desc: 'Specialty medical appointments' },
  cultural: { total: 8, label: 'Cultural Adjustment', icon: '\u{1F91D}', desc: 'Mentorship & orientation sessions' },
};

// ── Case Data ────────────────────────────────────────────────
const CASES = [
  {
    id: 1,
    family: 'The Ahmadi Family',
    origin: 'Afghanistan',
    size: 6,
    composition: 'Father (42), Mother (38), 4 children ages 3-14',
    arrivalDate: 'Day 1 of 90-day R&P window',
    background: 'Former university professor (father) and teacher (mother). Fled after Taliban takeover. Father worked with US military as interpreter. Family spent 18 months in Pakistan transit before SIV approval. Children have had no formal schooling for 2 years.',
    needs: {
      housing: { level: 'critical', detail: 'Family of 6 needs 3-bedroom unit. Limited affordable large-unit inventory.', recommended: 3 },
      employment: { level: 'high', detail: 'Father has transferable skills but credentials not recognized. Mother wants to work but needs childcare solution first.', recommended: 2 },
      language: { level: 'high', detail: 'Father speaks intermediate English (interpreter background). Mother speaks basic English. Children need ESL immersion for school enrollment.', recommended: 3 },
      medical: { level: 'moderate', detail: 'Youngest child needs vaccination catch-up. Mother reports chronic headaches (possible trauma-related). Standard health screening needed.', recommended: 1 },
      cultural: { level: 'moderate', detail: 'Family has some Western cultural exposure through father\'s military work. Primary need is school system navigation and community connection.', recommended: 2 },
    },
    outcomes: {
      good: 'Father secures ESL teaching assistant position within 60 days. All children enrolled in school with ESL support. Family achieves self-sufficiency by month 8.',
      partial: 'Father underemployed in warehouse work. Older children adjust but youngest struggles without adequate childcare. Financial self-sufficiency delayed to month 14.',
      poor: 'Inadequate housing leads to family instability. Father\'s credentials never evaluated. Family becomes dependent on public assistance beyond R&P period.',
    },
  },
  {
    id: 2,
    family: 'Marie & Jean-Pierre Nzamba',
    origin: 'Democratic Republic of Congo',
    size: 3,
    composition: 'Mother (28), Father (31), infant daughter (8 months)',
    arrivalDate: 'Day 1 of 90-day R&P window',
    background: 'Fled ethnic violence in eastern DRC. Spent 4 years in Nyarugusu refugee camp (Tanzania). Father was a mechanic; mother had no formal employment. Both experienced significant trauma. Infant was born in camp with limited prenatal care.',
    needs: {
      housing: { level: 'high', detail: 'Small family but infant needs safe, stable environment. Lead paint and pest-free unit essential.', recommended: 2 },
      employment: { level: 'high', detail: 'Father\'s mechanical skills are immediately transferable. Need certification pathway for auto repair work.', recommended: 2 },
      language: { level: 'critical', detail: 'French/Lingala speakers with zero English. Cannot navigate basic services, medical appointments, or employment without interpretation.', recommended: 3 },
      medical: { level: 'critical', detail: 'Infant needs full pediatric evaluation and vaccination series. Mother shows signs of PTSD and postpartum depression. Father has untreated shoulder injury from camp.', recommended: 2 },
      cultural: { level: 'high', detail: 'No prior exposure to American culture. Need intensive orientation: banking, transportation, grocery shopping, infant car seat laws, heating system operation.', recommended: 2 },
    },
    outcomes: {
      good: 'Intensive language support enables rapid integration. Father employed at auto shop within 45 days. Mother connected to Congolese community group and mental health services. Infant thriving.',
      partial: 'Language barrier slows everything. Father finds informal work but no benefits. Mother isolated without community connection. Medical needs partially addressed.',
      poor: 'Without language access, family cannot navigate systems. Medical appointments missed. Father exploited in informal labor. Mother\'s mental health deteriorates. CPS concern for infant.',
    },
  },
  {
    id: 3,
    family: 'U Myint Than',
    origin: 'Myanmar (Burma)',
    size: 1,
    composition: 'Single male (24), Rohingya ethnic minority',
    arrivalDate: 'Day 1 of 90-day R&P window',
    background: 'Survived Rakhine State violence at age 16. Spent 7 years in Cox\'s Bazar camp (Bangladesh) before individual refugee resettlement. No family members located. Has basic literacy in Burmese but no formal education beyond age 14. Witnessed extreme violence.',
    needs: {
      housing: { level: 'moderate', detail: 'Single individual — can share housing. But isolation is a major risk factor for this profile.', recommended: 1 },
      employment: { level: 'critical', detail: 'No transferable skills, limited education. Needs entry-level placement with on-the-job training. Work provides structure and purpose critical for recovery.', recommended: 2 },
      language: { level: 'critical', detail: 'Speaks Rohingya (no written form) and basic Burmese. Zero English. Extremely limited literacy. Traditional ESL approaches may not work.', recommended: 2 },
      medical: { level: 'high', detail: 'Complex PTSD from witnessing genocide. Nightmares, hypervigilance, difficulty with authority figures. Needs culturally sensitive mental health support.', recommended: 2 },
      cultural: { level: 'critical', detail: 'Has never lived independently. Camp life provided communal structure. Alone in a new country with no community. Highest isolation risk of all cases.', recommended: 2 },
    },
    outcomes: {
      good: 'Connected to local Burmese community (even if not Rohingya). Employment at halal grocery provides cultural bridge. Mental health services with trained interpreter. Stable by month 10.',
      partial: 'Employed but socially isolated. Attends ESL but low literacy makes progress slow. Mental health services not culturally appropriate. Functional but fragile.',
      poor: 'Total isolation. Cannot communicate basic needs. Employment fails due to untreated trauma responses (triggered by supervisor authority). Housing instability. Flight risk from program.',
    },
  },
  {
    id: 4,
    family: 'The Petrov Family',
    origin: 'Ukraine',
    size: 4,
    composition: 'Grandmother (67), Mother (40), two teenagers (15, 17)',
    arrivalDate: 'Day 1 of 90-day R&P window',
    background: 'Fled Mariupol after Russian invasion. Father killed in shelling. Grandmother has mobility limitations (knee injury from fleeing). Mother was an accountant. Older teen was in final years of secondary school. Family arrived through Uniting for Ukraine (U4U) humanitarian parole.',
    needs: {
      housing: { level: 'high', detail: 'Need accessible unit (grandmother\'s mobility). 2-bedroom minimum. Proximity to public transit essential — family has no vehicle.', recommended: 2 },
      employment: { level: 'moderate', detail: 'Mother\'s accounting skills transfer well — she has intermediate English. Older teen wants to work part-time. Grandmother cannot work.', recommended: 1 },
      language: { level: 'moderate', detail: 'Mother speaks intermediate English. Teenagers have basic English from school. Grandmother speaks only Ukrainian/Russian. Family can partially self-navigate.', recommended: 1 },
      medical: { level: 'high', detail: 'Grandmother needs orthopedic evaluation for knee. Both teenagers show grief/trauma responses (father\'s death). Mother suppressing her own trauma to manage family.', recommended: 2 },
      cultural: { level: 'low', detail: 'Strong existing Ukrainian diaspora community. Family has European cultural familiarity. Primary need is connecting to existing community resources.', recommended: 1 },
    },
    outcomes: {
      good: 'Mother employed in accounting firm within 30 days (strongest employment case). Teenagers enrolled in school with grief counseling. Grandmother connected to senior center. Ukrainian community provides robust informal support.',
      partial: 'Mother employed but overworked covering all family needs. Teenagers struggling academically due to unprocessed grief. Grandmother isolated in apartment.',
      poor: 'Grandmother\'s medical needs consume all family energy. Mother cannot work due to caregiving burden. Teenagers disengage from school. Family depletes savings rapidly.',
    },
  },
  {
    id: 5,
    family: 'The Hassan Family',
    origin: 'Somalia',
    size: 5,
    composition: 'Mother (35), 4 children ages 2-11. Father location unknown.',
    arrivalDate: 'Day 1 of 90-day R&P window',
    background: 'Mother fled Al-Shabaab-controlled area after husband\'s disappearance. Spent 5 years in Dadaab camp (Kenya). Mother has no formal education — married at 15. Children born in camp. Mother is resourceful and determined but has never managed finances, rented housing, or held formal employment.',
    needs: {
      housing: { level: 'critical', detail: 'Female-headed household with young children. Needs safe neighborhood, proximity to school and mosque. 2-bedroom minimum.', recommended: 3 },
      employment: { level: 'critical', detail: 'Mother has no formal work experience or education. Needs pre-employment life skills before job placement. Childcare for toddler is essential barrier.', recommended: 2 },
      language: { level: 'critical', detail: 'Somali only. No English, no literacy in any language. Children also monolingual Somali. Everything requires interpretation — every appointment, every form.', recommended: 3 },
      medical: { level: 'moderate', detail: 'Children need full vaccination series and dental (no dental care in camp). Mother reports chronic abdominal pain. Standard refugee health screening.', recommended: 1 },
      cultural: { level: 'high', detail: 'Strong Somali community exists locally — connecting to it is the highest-impact intervention. Community can provide informal childcare, interpretation, cultural guidance.', recommended: 2 },
    },
    outcomes: {
      good: 'Somali community connection transforms trajectory. Community childcare enables mother to attend ESL and pre-employment training. Children thrive in school with Somali-speaking staff. Mother achieves part-time employment by month 12.',
      partial: 'Language barrier limits progress. Mother attends ESL but childcare gaps cause inconsistency. Older children translate for family (parentification risk). Employment delayed beyond R&P window.',
      poor: 'Total system navigation failure without language access. Children miss school enrollment deadlines. Mother overwhelmed and isolated. Untreated medical issues compound. Family at risk of homelessness after R&P period.',
    },
  },
];

// ── Scholarly Micro-Content Tooltips ─────────────────────────
const USCRI_TIPS = {
  refugee_convention: "The 1951 Refugee Convention defines a refugee as someone with a 'well-founded fear of persecution' based on race, religion, nationality, political opinion, or social group membership. But the definition excludes climate refugees, economic migrants, and internally displaced persons. The 70-year-old framework governs a problem it wasn't designed to address \u2014 over 100 million forcibly displaced people worldwide, most fleeing situations the Convention's drafters never anticipated. Updating the Convention is politically impossible because reopening it would likely produce a weaker document.",
  cultural_orientation: "Pre-arrival cultural orientation programs reduce resettlement failure rates by approximately 40% \u2014 but they are chronically underfunded across all nine U.S. resettlement agencies. The content matters less than the method: teaching 'how to use a stove' matters far less than 'how to navigate bureaucracy.' Refugees who understand that the DMV, Social Security office, and school enrollment all require different documents on different timelines integrate faster than those given only survival-level orientation. The gap between knowing English and knowing systems is where resettlement fails.",
  third_country: "Third-country resettlement \u2014 the process that brings refugees to countries like the U.S. \u2014 handles less than 1% of the world's 30+ million refugees. The other 99% remain in first-asylum countries, usually neighboring states that are themselves developing nations. Turkey hosts 3.6 million refugees. Lebanon's refugee population equals 25% of its citizens. The global resettlement system is not a solution to displacement \u2014 it is a pressure valve that serves a tiny fraction of those in need while consuming enormous political attention.",
};

// ── Component ────────────────────────────────────────────────
function UscriView({ setView }) {
  const [mode, setMode] = useState('cases');
  const [journeyHover, setJourneyHover] = useState(null);
  const [selectedCase, setSelectedCase] = useState(0);
  const [tipId, setTipId] = useState(null);
  const [allocations, setAllocations] = useState(() => {
    const init = {};
    CASES.forEach((c, i) => {
      init[i] = { housing: 0, employment: 0, language: 0, medical: 0, cultural: 0 };
    });
    return init;
  });
  const [submitted, setSubmitted] = useState(false);

  // ── Scholarly Micro-Icons & Tooltip ──────────────────────────
  function Tip({ id }) {
    if (tipId !== id || !USCRI_TIPS[id]) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(8,10,14,.92)', border: '1px solid ' + C.accent + '25', borderRadius: 3, maxWidth: 440, fontSize: 11, fontFamily: Mono, color: C.tx2, lineHeight: 1.65, margin: '6px 0 10px' }}>
        {USCRI_TIPS[id]}
      </div>
    );
  }

  const ConventionIcon = () => (
    <svg width="20" height="24" viewBox="0 0 20 24" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='refugee_convention'?null:'refugee_convention')}>
      <rect x="3" y="2" width="14" height="20" rx="1" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <line x1="6" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth=".4"/>
      <line x1="6" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth=".4"/>
      <line x1="6" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth=".4"/>
      <line x1="6" y1="15" x2="10" y2="15" stroke="currentColor" strokeWidth=".4"/>
      <circle cx="10" cy="19" r="1.5" fill="none" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const OrientationIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='cultural_orientation'?null:'cultural_orientation')}>
      <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <path d="M11 3 L11 19 M3 11 L19 11" stroke="currentColor" strokeWidth=".4"/>
      <path d="M5 6 Q11 4 17 6 M5 16 Q11 18 17 16" fill="none" stroke="currentColor" strokeWidth=".4"/>
    </svg>
  );

  const ThirdCountryIcon = () => (
    <svg width="24" height="20" viewBox="0 0 24 20" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='third_country'?null:'third_country')}>
      <path d="M2 10 L8 4 L14 10 L8 16 Z" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <path d="M10 10 L16 4 L22 10 L16 16 Z" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <path d="M14 10 L16 8" stroke="currentColor" strokeWidth=".5" strokeDasharray="1 1"/>
    </svg>
  );

  // Compute totals used
  const totalsUsed = useMemo(() => {
    const sums = { housing: 0, employment: 0, language: 0, medical: 0, cultural: 0 };
    Object.values(allocations).forEach(a => {
      Object.keys(sums).forEach(k => { sums[k] += a[k]; });
    });
    return sums;
  }, [allocations]);

  // Remaining
  const remaining = useMemo(() => {
    const r = {};
    Object.keys(INITIAL_RESOURCES).forEach(k => {
      r[k] = INITIAL_RESOURCES[k].total - totalsUsed[k];
    });
    return r;
  }, [totalsUsed]);

  // Allocate
  const handleAllocate = useCallback((caseIdx, resource, delta) => {
    setAllocations(prev => {
      const curr = prev[caseIdx][resource];
      const newVal = curr + delta;
      if (newVal < 0) return prev;
      const totalOther = totalsUsed[resource] - curr;
      if (totalOther + newVal > INITIAL_RESOURCES[resource].total) return prev;
      return { ...prev, [caseIdx]: { ...prev[caseIdx], [resource]: newVal } };
    });
  }, [totalsUsed]);

  // Compute outcome for a case
  const getOutcome = useCallback((caseIdx) => {
    const c = CASES[caseIdx];
    const a = allocations[caseIdx];
    let metNeeds = 0;
    let totalNeeds = 0;
    Object.keys(c.needs).forEach(k => {
      totalNeeds++;
      const rec = c.needs[k].recommended;
      const alloc = a[k];
      if (alloc >= rec) metNeeds++;
      else if (alloc >= rec * 0.5) metNeeds += 0.5;
    });
    const ratio = metNeeds / totalNeeds;
    if (ratio >= 0.8) return 'good';
    if (ratio >= 0.5) return 'partial';
    return 'poor';
  }, [allocations]);

  // Submit
  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setMode('outcomes');
  }, []);

  // Reset
  const handleReset = useCallback(() => {
    const init = {};
    CASES.forEach((c, i) => {
      init[i] = { housing: 0, employment: 0, language: 0, medical: 0, cultural: 0 };
    });
    setAllocations(init);
    setSubmitted(false);
  }, []);

  // Level color
  const levelColor = useCallback((level) => {
    if (level === 'critical') return C.red;
    if (level === 'high') return C.orange;
    if (level === 'moderate') return C.yellow;
    return C.green;
  }, []);

  // ── Mode Switch ─────────────────────────────────────────────
  const ModeSwitch = useCallback(() => {
    const modes = [
      { id: 'cases', label: 'Cases', desc: '5 Families' },
      { id: 'journeys', label: 'Journeys', desc: 'Migration Paths' },
      { id: 'resources', label: 'Resources', desc: 'Allocation' },
      { id: 'outcomes', label: 'Outcomes', desc: 'Impact' },
    ];
    return (
      <div style={{ display: 'flex', gap: 3, marginBottom: 24, borderBottom:'1px solid rgba(74,128,184,.12)' }}>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1, padding: '10px 12px', cursor: 'pointer',
              background: mode === m.id ? 'rgba(74,128,184,.1)' : 'transparent',
              border: 'none',
              borderBottom: mode === m.id ? '2px solid ' + C.accent : '2px solid transparent',
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

  // ── Journeys Renderer (SVG Migration Paths) ──────────────
  const renderJourneys = useCallback(() => {
    const hoveredJ = journeyHover !== null ? REFUGEE_JOURNEYS.find(j => j.id === journeyHover) : null;
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 12,
        }}>
          REFUGEE MIGRATION PATHS {'\u2014'} CONVERGING ON ALBANY, NY
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 8px' }}>
          <ThirdCountryIcon /><Tip id="third_country" />
        </div>
        <div style={{
          background: 'rgba(12,10,8,.95)', border: '1px solid rgba(74,128,184,.14)',
          borderRadius: 6, padding: 24, marginBottom: 16, position:'relative',
          overflow:'hidden',
        }}>
          {/* Passport stamp decorations */}
          <div style={{ position:'absolute', top:10, right:10, opacity:0.04, pointerEvents:'none' }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" fill="none" stroke={C.unBlue} strokeWidth="2" />
              <text x="40" y="36" textAnchor="middle" fill={C.unBlue} fontSize="7" fontFamily={Mono}>APPROVED</text>
              <text x="40" y="48" textAnchor="middle" fill={C.unBlue} fontSize="5" fontFamily={Mono}>ENTRY VISA</text>
            </svg>
          </div>
          <div style={{ position:'absolute', bottom:15, left:15, opacity:0.04, pointerEvents:'none', transform:'rotate(-15deg)' }}>
            <svg width="70" height="70" viewBox="0 0 70 70">
              <rect x="5" y="5" width="60" height="60" rx="4" fill="none" stroke={C.unBlue} strokeWidth="1.5" />
              <text x="35" y="32" textAnchor="middle" fill={C.unBlue} fontSize="6" fontFamily={Mono}>TRANSIT</text>
              <text x="35" y="44" textAnchor="middle" fill={C.unBlue} fontSize="5" fontFamily={Mono}>VERIFIED</text>
            </svg>
          </div>
          <svg viewBox="0 0 700 400" style={{ width: '100%', display: 'block' }}>
            {/* Column labels */}
            <text x="80" y="18" fill={C.tx3} fontSize="9" fontFamily={Mono} textAnchor="middle">ORIGIN</text>
            <text x="290" y="18" fill={C.tx3} fontSize="9" fontFamily={Mono} textAnchor="middle">TRANSIT</text>
            <text x="600" y="18" fill={C.tx3} fontSize="9" fontFamily={Mono} textAnchor="middle">DESTINATION</text>

            {/* Destination dot (Albany) */}
            <circle cx="600" cy="200" r="10" fill={C.accent + '33'} stroke={C.accent} strokeWidth="2" />
            <text x="600" y="230" fill={C.accent} fontSize="9" fontFamily={Mono} textAnchor="middle" fontWeight="700">Albany, NY</text>

            {/* Journey paths */}
            {REFUGEE_JOURNEYS.map(j => {
              const isHov = journeyHover === j.id;
              const curvePath = `M ${j.origin.x},${j.origin.y} Q ${j.transit.x - 40},${j.origin.y} ${j.transit.x},${j.transit.y} Q ${(j.transit.x + j.dest.x) / 2},${j.transit.y - 20} ${j.dest.x},${j.dest.y}`;
              return (
                <g key={j.id}
                  onMouseEnter={() => setJourneyHover(j.id)}
                  onMouseLeave={() => setJourneyHover(null)}
                  onClick={() => setJourneyHover(journeyHover === j.id ? null : j.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Path curve */}
                  <path d={curvePath} fill="none" stroke={j.color}
                    strokeWidth={isHov ? 3 : 1.5} opacity={isHov ? 1 : 0.5}
                    strokeLinecap="round" style={{ transition: 'all .2s' }} />

                  {/* Origin dot */}
                  <circle cx={j.origin.x} cy={j.origin.y} r={isHov ? 7 : 5}
                    fill={j.color + '44'} stroke={j.color} strokeWidth="1.5"
                    style={{ transition: 'all .15s' }} />
                  <text x={j.origin.x - 20} y={j.origin.y + 4} fill={isHov ? j.color : C.tx3}
                    fontSize="7" fontFamily={Mono} textAnchor="end">
                    {j.origin.label}
                  </text>

                  {/* Transit dot */}
                  <circle cx={j.transit.x} cy={j.transit.y} r="3"
                    fill={j.color} opacity={isHov ? 0.8 : 0.3} />
                  {isHov && (
                    <text x={j.transit.x} y={j.transit.y - 8} fill={j.color}
                      fontSize="7" fontFamily={Mono} textAnchor="middle">
                      {j.transit.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info panel */}
        {hoveredJ ? (
          <div style={{
            background: C.card, border: '1px solid ' + hoveredJ.color + '44',
            borderRadius: 8, padding: 20,
          }}>
            <div style={{
              fontFamily: Serif, fontSize: 18, fontWeight: 600,
              color: hoveredJ.color, marginBottom: 8,
            }}>
              {hoveredJ.label}
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                FROM: <span style={{ color: C.tx }}>{hoveredJ.origin.label}</span>
              </span>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                VIA: <span style={{ color: C.tx }}>{hoveredJ.transit.label}</span>
              </span>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                TO: <span style={{ color: C.accent }}>{hoveredJ.dest.label}</span>
              </span>
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7,
              borderLeft: '3px solid ' + hoveredJ.color, paddingLeft: 14,
            }}>
              {hoveredJ.detail}
            </div>
          </div>
        ) : (
          <div style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3,
            textAlign: 'center', fontStyle: 'italic',
          }}>
            Hover or click a migration path to see the refugee family's story.
          </div>
        )}

        {/* Journey legend */}
        <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {REFUGEE_JOURNEYS.map(j => (
            <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 16, height: 3, borderRadius: 2, background: j.color }} />
              <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>{j.label.split(' (' /* ) */)[0]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }, [journeyHover]);

  // ── Cases Renderer ────────────────────────────────────────
  const renderCases = useCallback(() => {
    const c = CASES[selectedCase];
    const alloc = allocations[selectedCase];
    return (
      <div>
        {/* Case selector */}
        <div style={{
          display: 'flex', gap: 3, marginBottom: 20, overflowX: 'auto', paddingBottom: 4,
        }}>
          {CASES.map((cas, i) => (
            <button
              key={cas.id}
              onClick={() => setSelectedCase(i)}
              style={{
                flex: '0 0 auto', padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
                background: i === selectedCase ? C.accentBg : 'transparent',
                border: i === selectedCase ? '1px solid ' + C.accentDm : '1px solid ' + C.line,
                transition: 'all .12s ease', whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 12, fontWeight: 600,
                color: i === selectedCase ? C.accent : C.tx3, display: 'block',
              }}>
                {cas.origin}
              </span>
              <span style={{
                fontFamily: Sans, fontSize: 12,
                color: i === selectedCase ? C.tx2 : C.tx3,
              }}>
                {cas.size} {cas.size === 1 ? 'person' : 'people'}
              </span>
            </button>
          ))}
        </div>

        {/* Case card — case file styling */}
        <div style={{
          background: 'rgba(16,12,10,.96)', border: '1px solid ' + C.cardBd,
          borderRadius: '1px 6px 6px 6px', padding: 28, marginBottom: 16,
          borderLeft: '4px solid ' + C.accent, position:'relative',
          boxShadow: '0 2px 10px rgba(0,0,0,.3)',
        }}>
          {/* Case file tab */}
          <div style={{
            position:'absolute', top:-1, right:16, padding:'2px 10px',
            background:'rgba(74,128,184,.15)', border:'1px solid rgba(74,128,184,.25)',
            borderTop:'none', borderRadius:'0 0 4px 4px',
            fontFamily:Mono, fontSize:10, color:C.accent, letterSpacing:'.08em', fontWeight:600,
          }}>
            FILE {c.id}
          </div>
          <div style={{
            fontFamily: Mono, fontSize: 11, letterSpacing: '.1em',
            color: C.accent, marginBottom: 6, fontWeight:600,
          }}>
            CASE #{c.id} {'\u2014'} {c.origin.toUpperCase()}
          </div>
          <h2 style={{
            fontFamily: Serif, fontSize: 24, fontWeight: 700,
            color: C.tx, marginBottom: 6,
          }}>
            {c.family}
          </h2>
          <div style={{
            fontFamily: Sans, fontSize: 13, color: C.tx2, marginBottom: 16,
          }}>
            {c.composition} — {c.arrivalDate}
          </div>

          {/* Background */}
          <div style={{
            fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
            paddingLeft: 16, borderLeft: '3px solid ' + C.accentDm, marginBottom: 24,
          }}>
            {c.background}
          </div>

          {/* Needs assessment */}
          <div style={{
            fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
            color: C.accentDm, marginBottom: 12, fontWeight: 600,
          }}>
            NEEDS ASSESSMENT
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {Object.entries(c.needs).map(([key, need]) => (
              <div key={key} style={{
                background: C.accentBg, borderRadius: 6, padding: '12px 16px',
                border: '1px solid ' + C.line,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{
                    fontFamily: Mono, fontSize: 12, fontWeight: 600, color: C.tx,
                    textTransform: 'uppercase',
                  }}>
                    {INITIAL_RESOURCES[key].icon} {INITIAL_RESOURCES[key].label}
                  </span>
                  <span style={{
                    fontFamily: Mono, fontSize: 11, fontWeight: 700,
                    color: levelColor(need.level), padding: '2px 6px',
                    background: need.level === 'critical' ? C.redBg : need.level === 'high' ? C.yellowBg : C.accentBg,
                    borderRadius: 3,
                  }}>
                    {need.level.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6, marginBottom: 8 }}>
                  {need.detail}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>
                    Recommended: {need.recommended} | Allocated:
                  </span>
                  <button onClick={() => handleAllocate(selectedCase, key, -1)} style={{
                    width: 24, height: 24, borderRadius: 4, cursor: 'pointer',
                    background: C.accentBg, border: '1px solid ' + C.line,
                    color: C.tx2, fontFamily: Mono, fontSize: 14, lineHeight: '22px',
                  }}>-</button>
                  <span style={{
                    fontFamily: Mono, fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: 'center',
                    color: alloc[key] >= need.recommended ? C.green : alloc[key] > 0 ? C.yellow : C.tx3,
                  }}>
                    {alloc[key]}
                  </span>
                  <button onClick={() => handleAllocate(selectedCase, key, 1)} style={{
                    width: 24, height: 24, borderRadius: 4, cursor: 'pointer',
                    background: C.accentBg, border: '1px solid ' + C.line,
                    color: C.tx2, fontFamily: Mono, fontSize: 14, lineHeight: '22px',
                  }}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, [selectedCase, allocations, totalsUsed, handleAllocate, levelColor]);

  // ── Resources Renderer ────────────────────────────────────
  const renderResources = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.08em',
          color: C.accent, marginBottom: 6, fontWeight:600,
          padding:'5px 12px', background:'rgba(74,128,184,.06)',
          border:'1px solid rgba(74,128,184,.12)', borderRadius:3,
          display:'inline-block',
        }}>
          RESOURCE ALLOCATION DASHBOARD
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          In refugee resettlement, resources are always scarce. The R&P (Reception & Placement)
          program provides 90 days of core services. You must balance competing critical needs
          across all five families. There are no perfect answers — only trade-offs.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <OrientationIcon /><Tip id="cultural_orientation" />
        </div>

        {/* Resource meters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {Object.entries(INITIAL_RESOURCES).map(([key, res]) => {
            const used = totalsUsed[key];
            const pct = (used / res.total) * 100;
            return (
              <div key={key} style={{
                background: C.card, border: '1px solid ' + C.cardBd,
                borderRadius: 6, padding: '14px 18px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: Mono, fontSize: 11, fontWeight: 600, color: C.tx }}>
                    {res.icon} {res.label}
                  </span>
                  <span style={{
                    fontFamily: Mono, fontSize: 11, fontWeight: 700,
                    color: remaining[key] === 0 ? C.red : remaining[key] <= 2 ? C.yellow : C.green,
                  }}>
                    {used}/{res.total} used — {remaining[key]} remaining
                  </span>
                </div>
                <div style={{ height: 6, background: C.line, borderRadius: 3 }}>
                  <div style={{
                    width: pct + '%', height: '100%', borderRadius: 3,
                    background: pct >= 90 ? C.red : pct >= 70 ? C.yellow : C.accent,
                    transition: 'width .3s ease',
                  }} />
                </div>
                <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx3, marginTop: 4 }}>
                  {res.desc}
                </div>
                {/* Per-case breakdown */}
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  {CASES.map((c, i) => (
                    <div key={i} style={{
                      flex: 1, textAlign: 'center', padding: '4px 2px',
                      background: allocations[i][key] > 0 ? C.accentBg : 'transparent',
                      borderRadius: 3, border: '1px solid ' + C.line,
                    }}>
                      <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>{c.origin.slice(0, 4)}</div>
                      <div style={{
                        fontFamily: Mono, fontSize: 12, fontWeight: 700,
                        color: allocations[i][key] > 0 ? C.accent : C.tx3,
                      }}>
                        {allocations[i][key]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit button */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleSubmit} style={{
            padding: '14px 36px', borderRadius: 6, cursor: 'pointer',
            background: C.accentBg, border: '1px solid ' + C.accent,
            color: C.accent, fontFamily: Mono, fontSize: 13,
            letterSpacing: '.04em', transition: 'all .15s ease',
          }}>
            SUBMIT ALLOCATION PLAN
          </button>
        </div>
      </div>
    );
  }, [totalsUsed, remaining, allocations, handleSubmit]);

  // ── Outcomes Renderer ─────────────────────────────────────
  const renderOutcomes = useCallback(() => {
    if (!submitted) {
      return (
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 8, padding: 32, textAlign: 'center',
        }}>
          <div style={{ fontFamily: Serif, fontSize: 18, color: C.tx, marginBottom: 12 }}>
            Allocate resources and submit your plan first.
          </div>
          <button onClick={() => setMode('resources')} style={{
            padding: '10px 24px', borderRadius: 6, cursor: 'pointer',
            background: C.accentBg, border: '1px solid ' + C.accentDm,
            color: C.accent, fontFamily: Mono, fontSize: 12,
          }}>
            GO TO RESOURCES
          </button>
        </div>
      );
    }

    const outcomeColors = { good: C.green, partial: C.yellow, poor: C.red };
    const outcomeLabels = { good: 'POSITIVE OUTCOME', partial: 'MIXED OUTCOME', poor: 'POOR OUTCOME' };

    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          RESETTLEMENT OUTCOMES — 12-MONTH PROJECTION
        </div>

        {/* Summary */}
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 8, padding: 20, marginBottom: 20, textAlign: 'center',
        }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            {['good', 'partial', 'poor'].map(o => {
              const count = CASES.filter((_, i) => getOutcome(i) === o).length;
              return (
                <div key={o} style={{
                  padding: '10px 20px', background: o === 'good' ? C.greenBg : o === 'partial' ? C.yellowBg : C.redBg,
                  borderRadius: 6, border: '1px solid ' + outcomeColors[o],
                }}>
                  <div style={{ fontFamily: Mono, fontSize: 24, fontWeight: 700, color: outcomeColors[o] }}>
                    {count}
                  </div>
                  <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>{outcomeLabels[o]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Per-case outcomes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CASES.map((c, i) => {
            const outcome = getOutcome(i);
            const oColor = outcomeColors[outcome];
            return (
              <div key={i} style={{
                background: C.card, border: '1px solid ' + C.cardBd,
                borderRadius: 8, padding: 20,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontFamily: Serif, fontSize: 17, fontWeight: 600, color: C.tx }}>
                      {c.family}
                    </div>
                    <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>{c.origin}</div>
                  </div>
                  <span style={{
                    fontFamily: Mono, fontSize: 12, fontWeight: 700, color: oColor,
                    padding: '3px 10px', background: outcome === 'good' ? C.greenBg : outcome === 'partial' ? C.yellowBg : C.redBg,
                    borderRadius: 4, border: '1px solid ' + oColor,
                  }}>
                    {outcomeLabels[outcome]}
                  </span>
                </div>
                <div style={{
                  fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7,
                  paddingLeft: 14, borderLeft: '3px solid ' + oColor,
                }}>
                  {c.outcomes[outcome]}
                </div>
                {/* Allocation vs recommended */}
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  {Object.keys(c.needs).map(k => {
                    const alloc = allocations[i][k];
                    const rec = c.needs[k].recommended;
                    const met = alloc >= rec;
                    return (
                      <div key={k} style={{
                        flex: 1, textAlign: 'center', padding: '4px 2px',
                        background: met ? C.greenBg : alloc > 0 ? C.yellowBg : C.redBg,
                        borderRadius: 3,
                      }}>
                        <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>{k.slice(0, 4).toUpperCase()}</div>
                        <div style={{
                          fontFamily: Mono, fontSize: 11, fontWeight: 700,
                          color: met ? C.green : alloc > 0 ? C.yellow : C.red,
                        }}>
                          {alloc}/{rec}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={handleReset} style={{
            padding: '12px 28px', borderRadius: 6, cursor: 'pointer',
            background: C.accentBg, border: '1px solid ' + C.accentDm,
            color: C.accent, fontFamily: Mono, fontSize: 12,
          }}>
            RESET & TRY DIFFERENT ALLOCATION
          </button>
        </div>
      </div>
    );
  }, [submitted, allocations, getOutcome, handleReset]);

  // ── Main Render ────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', color: C.tx, fontFamily: Sans, position:'relative',
      background: 'linear-gradient(180deg, #0a0808 0%, #0c0a08 50%, #0a0808 100%)',
    }}>
      <WorldMapBg />
      {/* Subtle warm grain overlay */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0, pointerEvents:'none', zIndex:0,
        background:'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(200,180,140,.008) 3px, rgba(200,180,140,.008) 4px)',
      }} />
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,8,8,.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(74,128,184,.15)', padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer',
        }}>
          {'\←'} Back to Coursework
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {/* UN-style olive branch icon */}
          <svg width="16" height="16" viewBox="0 0 20 20" style={{opacity:0.5}}>
            <circle cx="10" cy="10" r="7" fill="none" stroke={C.unBlue} strokeWidth="1.2" />
            <path d="M6,14 Q10,8 14,14" fill="none" stroke={C.unBlue} strokeWidth="0.8" />
            <path d="M10,6 L10,12" stroke={C.unBlue} strokeWidth="0.6" />
          </svg>
          <span style={{ fontFamily: Mono, fontSize: 12, color: C.unBlue, letterSpacing:'.08em', fontWeight:600 }}>
            USCRI {'\u2014'} REFUGEE RESETTLEMENT
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position:'relative', zIndex:2 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display:'inline-block', padding:'3px 10px', marginBottom:12,
            background:'rgba(74,128,184,.08)', border:'1px solid rgba(74,128,184,.2)',
            borderRadius:2, fontFamily:Mono, fontSize:11, color:C.unBlue,
            letterSpacing:'.1em', fontWeight:600,
          }}>
            HUMANITARIAN SERVICES
          </div>
          <h1 style={{
            fontFamily: Serif, fontSize: 32, fontWeight: 700,
            color: C.tx, letterSpacing: '-.03em', marginBottom: 8,
          }}>
            Resettlement Case Manager
          </h1>
          <p style={{
            fontFamily: Serif, fontSize: 15, color: C.tx2,
            lineHeight: 1.6, marginBottom: 4, maxWidth: 720,
          }}>
            Manage five refugee resettlement cases within the 90-day Reception & Placement window.
            Each family arrives from a different country with unique needs. You have limited resources
            to allocate across housing, employment, language, medical, and cultural adjustment services.
            Every allocation decision has real consequences.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 6px' }}>
            <ConventionIcon /><Tip id="refugee_convention" />
          </div>
          <p style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3, lineHeight: 1.65, marginBottom: 12,
          }}>
            USCRI Field Office, ORR R&P Program, Cultural Orientation
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
        </div>

        <ModeSwitch />

        {mode === 'cases' && renderCases()}
        {mode === 'journeys' && renderJourneys()}
        {mode === 'resources' && renderResources()}
        {mode === 'outcomes' && renderOutcomes()}

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
