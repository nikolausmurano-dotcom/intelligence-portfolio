// HabitatView.jsx — Build Day Coordinator
// Habitat for Humanity (HABITAT)
// "Coordinating a Habitat Build Day: Volunteers, Safety, and Construction"
//
// Interactive construction coordination simulator with 4 modes:
// Build Day (sequencing game), Safety (OSHA quiz), Crew (assignment puzzle),
// Timeline (Gantt with what-if).
// Self-contained React component. Globals: useState, useCallback, useMemo

// ── Palette: Warm brown — construction site office ──────────
const C = {
  bg:      '#0a0806',
  card:    'rgba(16,14,10,.95)',
  cardBd:  'rgba(160,120,60,.14)',
  tx:      '#d0ccc0',
  tx2:     '#a8a090',
  tx3:     '#787060',
  accent:  '#b08030',
  accentDm:'#906820',
  accentBg:'rgba(176,128,48,.08)',
  green:   '#40a050',
  greenDm: '#288838',
  greenBg: 'rgba(64,160,80,.08)',
  yellow:  '#c0a030',
  yellowDm:'#a08020',
  yellowBg:'rgba(192,160,48,.10)',
  red:     '#c04848',
  redDm:   '#a03030',
  redBg:   'rgba(192,72,72,.08)',
  orange:  '#c07830',
  orangeDm:'#a06020',
  orangeBg:'rgba(192,120,48,.08)',
  line:    'rgba(160,120,60,.10)',
  osha:    '#c0a020',
  oshaBg:  'rgba(192,160,32,.08)',
  blueprint:'#2060a0',
  blueprintBg:'rgba(32,96,160,.06)',
};
const Mono  = "'IBM Plex Mono',monospace";
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";

// ── SVG: Blueprint grid background ─────────────────────────
const BlueprintGridBg = () => (
  <div style={{
    position:'fixed', top:0, left:0, right:0, bottom:0, pointerEvents:'none', zIndex:0,
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(32,96,160,.04) 39px, rgba(32,96,160,.04) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(32,96,160,.04) 39px, rgba(32,96,160,.04) 40px)
    `,
  }} />
);

// ── SVG: House frame + tools watermark ─────────────────────
const ConstructionBg = () => (
  <svg width="240" height="260" viewBox="0 0 120 130" style={{
    position:'fixed', bottom:30, right:30, opacity:0.025, pointerEvents:'none', zIndex:0,
  }}>
    {/* House frame */}
    <path d="M20,65 L60,25 L100,65" fill="none" stroke="#b08030" strokeWidth="2" />
    <rect x="25" y="65" width="70" height="50" fill="none" stroke="#b08030" strokeWidth="1.5" />
    <rect x="45" y="80" width="20" height="35" fill="none" stroke="#b08030" strokeWidth="1" />
    <rect x="30" y="75" width="12" height="12" fill="none" stroke="#b08030" strokeWidth="0.8" />
    <line x1="36" y1="75" x2="36" y2="87" stroke="#b08030" strokeWidth="0.5" />
    <line x1="30" y1="81" x2="42" y2="81" stroke="#b08030" strokeWidth="0.5" />
    <rect x="73" y="75" width="12" height="12" fill="none" stroke="#b08030" strokeWidth="0.8" />
    <line x1="79" y1="75" x2="79" y2="87" stroke="#b08030" strokeWidth="0.5" />
    <line x1="73" y1="81" x2="85" y2="81" stroke="#b08030" strokeWidth="0.5" />
    {/* Hard hat */}
    <path d="M5,120 Q5,105 15,105 Q25,105 25,120" fill="none" stroke="#b08030" strokeWidth="1.5" />
    <line x1="3" y1="120" x2="27" y2="120" stroke="#b08030" strokeWidth="1.5" />
    {/* Hammer */}
    <line x1="95" y1="125" x2="110" y2="110" stroke="#b08030" strokeWidth="1.5" />
    <rect x="107" y="105" width="10" height="6" rx="1" fill="none" stroke="#b08030" strokeWidth="1" transform="rotate(-45,112,108)" />
  </svg>
);

const SKILLS = [
  'Residential Construction',
  'Volunteer Crew Management',
  'OSHA Safety Compliance',
  'Framing & Structural Systems',
  'Electrical Rough-In',
  'Plumbing Basics',
  'Material Estimation',
  'Quality Inspection',
];

const PROVENANCE = [
  { label: 'Habitat', desc: 'Habitat for Humanity International' },
  { label: 'OSHA', desc: 'Occupational Safety & Health Administration' },
  { label: 'IRC', desc: 'International Residential Code' },
  { label: 'Field Manual', desc: 'Habitat Construction Standards' },
];

// ── BUILD TASKS (Mode 1: Sequencing Game) ─────────────────────
const BUILD_TASKS = [
  { id: 'site_prep', name: 'Site Preparation & Foundation', description: 'Clear lot, grade soil, pour concrete foundation. Requires building permit approval.', prerequisites: [], duration: '3-5 days', crew: 4, critical: true, consequences_if_late: 'Everything downstream delays. Foundation must cure 7 days minimum before framing.' },
  { id: 'framing', name: 'Framing & Structural', description: 'Wall framing, roof trusses, sheathing. The skeleton of the house.', prerequisites: ['site_prep'], duration: '5-7 days', crew: 6, critical: true, consequences_if_late: 'No trades can start until framing passes inspection.' },
  { id: 'roofing', name: 'Roofing & Weather Protection', description: 'Shingles, flashing, ridge vent. Makes the structure weather-tight.', prerequisites: ['framing'], duration: '2-3 days', crew: 4, critical: true, consequences_if_late: 'Rain damage to interior framing, subfloor, and any started interior work.' },
  { id: 'rough_electric', name: 'Rough Electrical', description: 'Run wiring through walls before drywall. Install boxes, panels, circuits.', prerequisites: ['framing'], duration: '2-3 days', crew: 2, critical: false, consequences_if_late: 'Must be done before insulation and drywall. Requires separate inspection.' },
  { id: 'rough_plumb', name: 'Rough Plumbing', description: 'Install supply lines, drain/waste/vent pipes, water heater rough-in.', prerequisites: ['framing'], duration: '2-3 days', crew: 2, critical: false, consequences_if_late: 'Must be done before insulation. Plumbing inspection required before covering walls.' },
  { id: 'insulation', name: 'Insulation', description: 'Wall and attic insulation. Must be inspected before drywall.', prerequisites: ['rough_electric', 'rough_plumb', 'roofing'], duration: '1-2 days', crew: 3, critical: false, consequences_if_late: 'Drywall cannot proceed. Energy code compliance at stake.' },
  { id: 'drywall', name: 'Drywall & Taping', description: 'Hang, tape, mud, sand. Three coats of joint compound, each requiring dry time.', prerequisites: ['insulation'], duration: '5-7 days', crew: 4, critical: false, consequences_if_late: 'Finish work (paint, trim, cabinets) cannot start. Usually the longest interior phase.' },
  { id: 'finish', name: 'Finish Work', description: 'Paint, trim, cabinets, countertops, fixtures, flooring, final electrical/plumbing connections.', prerequisites: ['drywall'], duration: '7-10 days', crew: 6, critical: true, consequences_if_late: 'Certificate of occupancy delayed. Family cannot move in.' },
];

const CORRECT_ORDER = ['site_prep', 'framing', 'roofing', 'rough_electric', 'rough_plumb', 'insulation', 'drywall', 'finish'];

const SEQUENCING_ERRORS = {
  'drywall_before_insulation': 'CRITICAL: Drywall installed before insulation. You\'ll need to tear out all drywall, insulate, then re-drywall. Cost: $3,000+ and 2 weeks delay.',
  'drywall_before_electric': 'CRITICAL: Drywall before rough electrical. Electricians now have to cut holes in your new drywall to run wire. Patching required. $1,500 and 1 week.',
  'insulation_before_plumbing': 'Insulation before rough plumbing. Plumber has to remove insulation to run pipes, then you re-insulate. $800 and 3 days.',
  'finish_before_drywall': 'Finish work before drywall? You can\'t install cabinets, trim, or paint on bare framing. Complete rework required.',
  'framing_before_foundation': 'Framing before foundation? You cannot frame on dirt. This is a fundamental construction error.',
  'roofing_before_framing': 'Roofing before the frame exists? There\'s nothing to attach the roof to.',
};

// ── SAFETY SCENARIOS (Mode 2: OSHA Quiz) ─────────────────────
const SAFETY_SCENARIOS = [
  { scenario: 'A volunteer is cutting lumber with a circular saw. They\'re wearing safety glasses but no hearing protection. The saw guard is zip-tied in the retracted position "because it keeps getting in the way."', hazards: ['Disabled saw guard \— amputation risk', 'No hearing protection \— permanent hearing damage above 85dB', 'Potential kickback without guard'], correct: 'stop_work', options: [
    { id: 'stop_work', label: 'Stop work immediately. Address the saw guard first \— this is an imminent danger.', score: 10, feedback: 'Correct. A disabled saw guard is an OSHA "imminent danger" \— the most serious category. Work must stop until the guard is functioning. Circular saw kickback without a guard can sever fingers or worse. Hearing protection is also required but the guard is the immediate life-safety issue.' },
    { id: 'remind', label: 'Remind them about the guard but let them finish the current cut.', score: 2, feedback: 'Dangerous. "Just finish this cut" with a disabled guard is how amputations happen. OSHA\'s hierarchy of controls requires eliminating the hazard immediately, not after the current task.' },
    { id: 'hearing', label: 'Get them hearing protection first \— that\'s the most common construction injury.', score: 4, feedback: 'Hearing protection matters, but the disabled saw guard is the imminent danger. Hearing loss is cumulative; amputation is instantaneous. Prioritize the life-safety hazard.' },
    { id: 'supervisor', label: 'Report it to the site supervisor and continue your own work.', score: 3, feedback: 'You have a duty to act on imminent dangers, not just report them. While notifying the supervisor is appropriate, you should ALSO stop the unsafe work immediately. Bystander inaction enables injuries.' },
  ]},
  { scenario: 'It\'s a hot July day (95\u00B0F, high humidity). A volunteer has been working on the roof for 3 hours. She says she feels dizzy and her skin is hot and dry (not sweating).', hazards: ['Heat stroke \— medical emergency', 'Fall risk from dizziness on elevated surface', 'Hot dry skin = body has stopped sweating = thermoregulatory failure'], correct: 'emergency', options: [
    { id: 'water', label: 'Tell her to drink water and take a 10-minute break in the shade.', score: 3, feedback: 'Insufficient. Hot dry skin with dizziness after prolonged heat exposure is heat STROKE, not heat exhaustion. Heat stroke is a medical emergency with potential organ damage. Water and shade are for heat exhaustion (sweating, headache). Heat stroke requires immediate cooling and emergency medical response.' },
    { id: 'emergency', label: 'Call 911 immediately. Move her to shade, begin active cooling (cold water on skin, ice packs to neck/armpits/groin).', score: 10, feedback: 'Correct. Hot dry skin + dizziness + prolonged heat exposure = heat stroke until proven otherwise. Heat stroke can cause brain damage, organ failure, and death. Active cooling must begin IMMEDIATELY while waiting for EMS. This is not "take a break" \— this is a medical emergency.' },
    { id: 'monitor', label: 'Have her come down from the roof and rest. Check on her in 30 minutes.', score: 2, feedback: 'Getting her off the roof is correct (fall risk), but waiting 30 minutes with suspected heat stroke could be fatal. Core temperature above 104\u00B0F causes rapid organ damage. Every minute of delay reduces survival odds.' },
    { id: 'home', label: 'Drive her home so she can rest in air conditioning.', score: 1, feedback: 'Never transport a suspected heat stroke victim yourself. She needs EMS \— she could lose consciousness during transport. Heat stroke requires IV fluids and core temperature monitoring that only paramedics can provide.' },
  ]},
  { scenario: 'You\'re organizing volunteers for a wall-raising. The plan calls for tilting up a pre-assembled 12-foot wall section. You have 8 volunteers, none of whom have done this before.', hazards: ['Crush injury if wall falls during tilt-up', 'Back injuries from improper lifting', 'Untrained volunteers don\'t know wall behavior during raising'], correct: 'brief', options: [
    { id: 'brief', label: 'Conduct a full safety briefing: demonstrate the technique, assign specific positions, establish a "drop" command, and do a dry run without the wall.', score: 10, feedback: 'Correct. Wall-raising is one of the most dangerous operations on a Habitat site. OSHA requires a competent person to supervise, specific positioning (nobody on the fall side), a clear communication system, and the wall must be immediately braced once vertical. Dry runs save lives.' },
    { id: 'strong', label: 'Put the strongest volunteers on the bottom and let everyone else help where they can.', score: 3, feedback: 'Strength matters less than coordination. Wall-raising injuries happen when someone steps out of position, the wall shifts unexpectedly, or there\'s no unified "raise" command. An uncoordinated strong team is more dangerous than a coordinated average team.' },
    { id: 'crane', label: 'Skip the manual raising and wait for a crane.', score: 5, feedback: 'Mechanized raising is safer when available, but Habitat residential builds rarely have crane access. The answer isn\'t to avoid the task \— it\'s to do it safely with proper training, positioning, and bracing.' },
    { id: 'go', label: 'Have everyone grab on and lift on the count of three.', score: 1, feedback: 'This is how wall-raising injuries happen. Without assigned positions, bracing plan, escape routes, and a "drop" command, you\'re relying on luck. One person stumbles, the wall shifts, and someone gets pinned.' },
  ]},
  { scenario: 'A delivery truck has arrived with 80 sheets of 4x8 plywood. The forklift is broken. The site supervisor asks you to organize volunteers to hand-carry sheets from the truck to the second-floor deck \— up a ladder.', hazards: ['Plywood sheet acts as a sail in wind \— loss of control', 'Ladder carry with bulky load violates 3-point contact', 'Repetitive heavy lifting \— back injuries', 'Pinch points carrying sheet material'], correct: 'refuse_ladder', options: [
    { id: 'refuse_ladder', label: 'Refuse the ladder carry. Stage plywood at ground level and use the crane/boom when available, or rig a rope-and-pulley system to lift sheets to the deck.', score: 10, feedback: 'Correct. Carrying sheet material up a ladder is extremely dangerous \— you cannot maintain 3 points of contact while holding a 4x8 sheet. OSHA prohibits carrying loads that prevent safe ladder use. Staging at ground level and mechanically lifting is the safe approach. A simple rope-and-pulley through a second-floor window opening costs $20 and prevents a fall.' },
    { id: 'two_person', label: 'Have two people carry each sheet up the ladder \— one above, one below.', score: 2, feedback: 'Two people on a ladder with a sheet of plywood is MORE dangerous than one. If the person below loses grip, the sheet slides down onto them. If the person above loses grip, it falls on the person below. Neither can maintain 3-point contact.' },
    { id: 'relay', label: 'Set up a relay line \— pass sheets hand-to-hand up the ladder.', score: 3, feedback: 'A relay is better than individual carries but still puts people on the ladder with unwieldy loads. The fundamental problem \— you can\'t safely carry sheet goods up a ladder \— hasn\'t been solved.' },
    { id: 'just_do', label: 'It\'s only 80 sheets. Get it done quickly before anyone gets tired.', score: 1, feedback: 'Speed increases injury risk. 80 sheets at ~60 lbs each = 4,800 lbs total. Fatigue sets in fast. The injury usually happens on sheet 50, not sheet 5 \— when people are tired and rushing to finish.' },
  ]},
  { scenario: 'You discover that yesterday\'s concrete footer pour has a 6-inch section where the rebar is exposed and sticking up vertically from the top of the footer. Volunteers are working nearby.', hazards: ['Impalement hazard from exposed rebar', 'Trip-and-fall onto rebar \— potentially fatal', 'OSHA requires rebar caps on all exposed vertical rebar'], correct: 'cap_immediately', options: [
    { id: 'cap_immediately', label: 'Stop nearby work, install rebar caps (mushroom caps) on every exposed bar immediately. Mark the area with caution tape until capped.', score: 10, feedback: 'Correct. Exposed vertical rebar is an impalement hazard \— OSHA requires protective caps on all exposed rebar ends. A fall onto uncapped rebar can be fatal. Mushroom-style rebar caps cost $0.15 each. This is a $3 fix that prevents a fatality. Caution tape until capped keeps people away from the immediate danger zone.' },
    { id: 'bend', label: 'Bend the rebar over so it\'s not sticking up.', score: 5, feedback: 'Bending rebar changes the structural design and may violate the engineering specs. The rebar is vertical for a reason \— it ties the footer to the wall above. Caps protect without altering the structural intent.' },
    { id: 'sign', label: 'Put up a warning sign and remind volunteers to watch their step.', score: 2, feedback: 'Signs don\'t prevent falls. A volunteer carrying lumber, looking at their work, won\'t see a sign. OSHA\'s hierarchy of controls ranks signage as the LEAST effective control. Physical protection (caps) is required.' },
    { id: 'tomorrow', label: 'Add it to tomorrow\'s task list \— it\'s not in the active work zone right now.', score: 1, feedback: 'People don\'t stay in designated zones. Someone will walk through that area \— to get a tool, take a shortcut, or check on the pour. Impalement hazards must be addressed immediately, not scheduled.' },
  ]},
];

// ── CREW ASSIGNMENT PUZZLE (Mode 3) ─────────────────────────
const CREW_TYPES = [
  { id: 'corporate', name: 'Corporate Group', size: 20, skill: 1, physical: 3, description: 'Enthusiastic first-timers. Great numbers but need constant guidance. Best with simple repetitive tasks.' },
  { id: 'faith', name: 'Faith Community', size: 12, skill: 2, physical: 2, description: 'Mixed experience. 2-3 skilled builders, rest are helpers. Good internal leadership. Consistent.' },
  { id: 'regulars', name: 'Experienced Regulars', size: 5, skill: 4, physical: 3, description: 'Skilled repeat volunteers. Can work independently. Know tools, codes, and techniques.' },
];

const CREW_TASKS = [
  { id: 'framing_walls', name: 'Wall Framing Assembly', skillReq: 3, physicalReq: 3, crewNeeded: 6, bestCrew: 'regulars', description: 'Measuring, cutting studs, assembling wall sections. Requires accuracy and power tool competence.', goodMatch: { regulars: 'Excellent \— they know the process and can work fast with minimal supervision.', faith: 'Good \— pair their experienced builders with helpers for an apprentice model.', corporate: 'Risky \— inaccurate cuts waste lumber and slow the build. Needs heavy oversight.' } },
  { id: 'painting', name: 'Interior Painting', skillReq: 1, physicalReq: 1, crewNeeded: 8, bestCrew: 'corporate', description: 'Walls, ceilings, trim. Large area coverage. Low skill barrier, high visual impact.', goodMatch: { corporate: 'Perfect \— large crew handles big areas fast. Satisfying visual results keep morale high.', faith: 'Good \— but their skilled builders are wasted on painting. Use them elsewhere.', regulars: 'Wasteful \— experienced volunteers should be on skilled tasks, not painting.' } },
  { id: 'insulation', name: 'Insulation Installation', skillReq: 1, physicalReq: 2, crewNeeded: 4, bestCrew: 'faith', description: 'Friction-fit batts in wall cavities. Straightforward but requires PPE discipline and attention to gaps.', goodMatch: { faith: 'Good \— moderate crew size matches, experienced members ensure quality.', corporate: 'Acceptable \— they can handle it with close supervision on PPE compliance.', regulars: 'Overkill \— this task doesn\'t need their skills. Assign them to framing.' } },
  { id: 'trim_install', name: 'Finish Trim Carpentry', skillReq: 4, physicalReq: 1, crewNeeded: 3, bestCrew: 'regulars', description: 'Base molding, door casing, window trim. Requires precision measurement, coping, and miter cuts.', goodMatch: { regulars: 'Essential \— this is skilled finish work. Only experienced volunteers should attempt it.', faith: 'Only if they have a skilled carpenter. Bad trim is worse than no trim.', corporate: 'No \— trim carpentry has zero tolerance for error. This wastes material and time.' } },
  { id: 'site_cleanup', name: 'Site Cleanup & Material Staging', skillReq: 0, physicalReq: 3, crewNeeded: 6, bestCrew: 'corporate', description: 'Sort lumber deliveries, clean debris, organize tool stations, prep next-day materials.', goodMatch: { corporate: 'Great \— physical work with clear objectives. Numbers help move material fast.', faith: 'Acceptable \— but underutilizes their experienced members.', regulars: 'Poor use \— never assign skilled volunteers to cleanup when framing needs doing.' } },
];

// ── TIMELINE DATA (Mode 4: Gantt) ──────────────────────────
const GANTT_TASKS = [
  { id: 'site_prep', name: 'Site Prep & Foundation', start: 0, duration: 5, deps: [], color: C.accent, critical: true },
  { id: 'framing', name: 'Framing', start: 5, duration: 7, deps: ['site_prep'], color: C.accent, critical: true },
  { id: 'roofing', name: 'Roofing', start: 12, duration: 3, deps: ['framing'], color: C.green, critical: true },
  { id: 'rough_electric', name: 'Rough Electrical', start: 12, duration: 3, deps: ['framing'], color: C.yellow, critical: false },
  { id: 'rough_plumb', name: 'Rough Plumbing', start: 12, duration: 3, deps: ['framing'], color: C.yellow, critical: false },
  { id: 'insulation', name: 'Insulation', start: 15, duration: 2, deps: ['roofing', 'rough_electric', 'rough_plumb'], color: C.orange, critical: false },
  { id: 'drywall', name: 'Drywall & Taping', start: 17, duration: 7, deps: ['insulation'], color: C.orange, critical: false },
  { id: 'finish', name: 'Finish Work', start: 24, duration: 10, deps: ['drywall'], color: C.green, critical: true },
];

// ── Scholarly Micro-Content Tooltips ─────────────────────────
const HABITAT_TIPS = {
  sweat_equity: "Habitat's sweat equity model requires future homeowners to contribute 200-500 hours of construction labor before receiving their home. This is not free labor exploitation \u2014 it is a dignity mechanism rooted in the theology of partnership rather than charity. Research shows that ownership built through personal investment creates stronger community attachment and significantly higher mortgage repayment rates than pure subsidy housing. The homeowner who hung drywall in their own living room has a psychological stake in the home that a lottery winner does not. Sweat equity transforms the recipient from beneficiary to partner.",
  critical_path: "Construction critical path analysis determines which tasks must be completed before others can begin \u2014 you cannot install roofing before framing, or run drywall before rough electrical passes inspection. Violating the critical path doesn't just cause delay; it creates rework that costs 3-5x the original task. Drywall installed over uninspected electrical has to be torn out. A foundation poured before the plumber runs under-slab drains has to be jack-hammered. On a Habitat build with donated materials and volunteer labor, rework is not just expensive \u2014 it can kill a project entirely.",
  volunteer_management: "Managing unskilled volunteers on an active construction site is fundamentally a safety leadership challenge, not a productivity one. The crew leader must balance getting meaningful work done with protecting people who have never held a power tool. An enthusiastic volunteer with a nail gun is a liability, not an asset. The key insight is that the best crew leaders assign critical-path work to skilled volunteers and give unskilled volunteers tasks that are physically real but safety-contained: painting, cleanup, simple material staging. The goal is dignity without danger.",
};

// ── Component ────────────────────────────────────────────────
function HabitatView({ setView }) {
  const [mode, setMode] = useState('build');
  const [tipId, setTipId] = useState(null);

  // ── Scholarly Micro-Icons & Tooltip ──────────────────────────
  function Tip({ id }) {
    if (tipId !== id || !HABITAT_TIPS[id]) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(8,10,16,.92)', border: '1px solid ' + C.accent + '25', borderRadius: 3, maxWidth: 440, fontSize: 11, fontFamily: Mono, color: C.tx2, lineHeight: 1.65, margin: '6px 0 10px' }}>
        {HABITAT_TIPS[id]}
      </div>
    );
  }

  const HammerIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='sweat_equity'?null:'sweat_equity')}>
      <rect x="9" y="2" width="4" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <line x1="11" y1="12" x2="11" y2="20" stroke="currentColor" strokeWidth="1"/>
      <line x1="9" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const CriticalPathIcon = () => (
    <svg width="28" height="20" viewBox="0 0 28 20" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='critical_path'?null:'critical_path')}>
      <rect x="1" y="4" width="6" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <rect x="11" y="2" width="6" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <rect x="11" y="10" width="6" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <rect x="21" y="6" width="6" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <line x1="7" y1="6" x2="11" y2="4" stroke="currentColor" strokeWidth=".4"/>
      <line x1="7" y1="6" x2="11" y2="12" stroke="currentColor" strokeWidth=".4"/>
      <line x1="17" y1="4" x2="21" y2="8" stroke="currentColor" strokeWidth=".5" stroke="currentColor"/>
      <line x1="17" y1="12" x2="21" y2="8" stroke="currentColor" strokeWidth=".4"/>
    </svg>
  );

  const HardhatIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='volunteer_management'?null:'volunteer_management')}>
      <path d="M4 14 Q4 6 11 4 Q18 6 18 14" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <line x1="3" y1="14" x2="19" y2="14" stroke="currentColor" strokeWidth="1"/>
      <line x1="4" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth=".6"/>
      <line x1="11" y1="4" x2="11" y2="14" stroke="currentColor" strokeWidth=".4" strokeDasharray="1 1"/>
    </svg>
  );

  // Mode 1: Build Day sequencing
  const [buildSequence, setBuildSequence] = useState([]);
  const [buildSubmitted, setBuildSubmitted] = useState(false);
  const [buildErrors, setBuildErrors] = useState([]);
  const [buildScore, setBuildScore] = useState(null);

  // Mode 2: Safety quiz
  const [safetyQuestion, setSafetyQuestion] = useState(0);
  const [safetyAnswers, setSafetyAnswers] = useState({});
  const [safetyRevealed, setSafetyRevealed] = useState({});
  const [safetyComplete, setSafetyComplete] = useState(false);

  // Mode 3: Crew assignment
  const [crewAssignments, setCrewAssignments] = useState({});
  const [crewSubmitted, setCrewSubmitted] = useState(false);
  const [crewScore, setCrewScore] = useState(null);

  // Mode 4: Timeline
  const [whatIf, setWhatIf] = useState(false);
  const [failedInspection, setFailedInspection] = useState(null);

  // ── Build Day: add/remove tasks from sequence ──────────────
  const addToSequence = useCallback((taskId) => {
    setBuildSequence(prev => {
      if (prev.includes(taskId)) return prev;
      return [...prev, taskId];
    });
  }, []);

  const removeFromSequence = useCallback((taskId) => {
    setBuildSequence(prev => prev.filter(id => id !== taskId));
  }, []);

  const resetBuild = useCallback(() => {
    setBuildSequence([]);
    setBuildSubmitted(false);
    setBuildErrors([]);
    setBuildScore(null);
  }, []);

  const submitBuildSequence = useCallback(() => {
    if (buildSequence.length !== 8) return;
    const errors = [];
    const posMap = {};
    buildSequence.forEach((id, i) => { posMap[id] = i; });

    // Check each task's prerequisites
    BUILD_TASKS.forEach(task => {
      const taskPos = posMap[task.id];
      task.prerequisites.forEach(preReq => {
        const prePos = posMap[preReq];
        if (prePos >= taskPos) {
          const preTask = BUILD_TASKS.find(t => t.id === preReq);
          errors.push({
            task: task.name,
            prereq: preTask ? preTask.name : preReq,
            taskId: task.id,
            preReqId: preReq,
            severity: task.critical ? 'CRITICAL' : 'ERROR',
          });
        }
      });
    });

    // Check for specific known bad patterns
    const specificErrors = [];
    if (posMap['drywall'] < posMap['insulation']) specificErrors.push(SEQUENCING_ERRORS['drywall_before_insulation']);
    if (posMap['drywall'] < posMap['rough_electric']) specificErrors.push(SEQUENCING_ERRORS['drywall_before_electric']);
    if (posMap['insulation'] < posMap['rough_plumb']) specificErrors.push(SEQUENCING_ERRORS['insulation_before_plumbing']);
    if (posMap['finish'] < posMap['drywall']) specificErrors.push(SEQUENCING_ERRORS['finish_before_drywall']);
    if (posMap['framing'] < posMap['site_prep']) specificErrors.push(SEQUENCING_ERRORS['framing_before_foundation']);
    if (posMap['roofing'] < posMap['framing']) specificErrors.push(SEQUENCING_ERRORS['roofing_before_framing']);

    // Score: start at 100, deduct per error
    const deduction = errors.length * 12 + specificErrors.length * 5;
    const score = Math.max(0, 100 - deduction);

    setBuildErrors([...errors.map(e => e.task + ' scheduled before ' + e.prereq + ' (' + e.severity + ')'), ...specificErrors]);
    setBuildScore(score);
    setBuildSubmitted(true);
  }, [buildSequence]);

  // ── Safety Quiz: select answer ────────────────────────────
  const selectSafetyAnswer = useCallback((qIdx, optId) => {
    if (safetyRevealed[qIdx]) return;
    setSafetyAnswers(prev => ({ ...prev, [qIdx]: optId }));
    setSafetyRevealed(prev => ({ ...prev, [qIdx]: true }));
  }, [safetyRevealed]);

  const safetyTotalScore = useMemo(() => {
    let total = 0;
    Object.entries(safetyAnswers).forEach(([qIdx, optId]) => {
      const q = SAFETY_SCENARIOS[parseInt(qIdx)];
      if (q) {
        const opt = q.options.find(o => o.id === optId);
        if (opt) total += opt.score;
      }
    });
    return total;
  }, [safetyAnswers]);

  const safetyMaxScore = SAFETY_SCENARIOS.length * 10;

  const finishSafetyQuiz = useCallback(() => {
    setSafetyComplete(true);
  }, []);

  const resetSafety = useCallback(() => {
    setSafetyQuestion(0);
    setSafetyAnswers({});
    setSafetyRevealed({});
    setSafetyComplete(false);
  }, []);

  // ── Crew Assignment ────────────────────────────────────────
  const assignCrew = useCallback((taskId, crewId) => {
    setCrewAssignments(prev => ({ ...prev, [taskId]: crewId }));
  }, []);

  const submitCrewAssignments = useCallback(() => {
    let score = 0;
    let total = 0;
    CREW_TASKS.forEach(task => {
      total += 10;
      const assigned = crewAssignments[task.id];
      if (assigned === task.bestCrew) score += 10;
      else if (assigned) score += 4;
    });
    setCrewScore({ score, total, pct: Math.round(score / total * 100) });
    setCrewSubmitted(true);
  }, [crewAssignments]);

  const resetCrew = useCallback(() => {
    setCrewAssignments({});
    setCrewSubmitted(false);
    setCrewScore(null);
  }, []);

  // ── Gantt data with what-if ────────────────────────────────
  const ganttData = useMemo(() => {
    if (!whatIf || !failedInspection) return GANTT_TASKS;
    const delay = failedInspection === 'framing' ? 5 : failedInspection === 'roofing' ? 3 : 2;
    const failIdx = GANTT_TASKS.findIndex(t => t.id === failedInspection);
    if (failIdx === -1) return GANTT_TASKS;
    return GANTT_TASKS.map((t, i) => {
      if (i <= failIdx) return t;
      return { ...t, start: t.start + delay, delayed: true };
    });
  }, [whatIf, failedInspection]);

  const ganttTotalDays = useMemo(() => {
    return Math.max(...ganttData.map(t => t.start + t.duration));
  }, [ganttData]);

  // ── Mode Switch ──────────────────────────────────────────
  const modes = [
    { id: 'build', label: 'Build Day', desc: 'Sequencing Game' },
    { id: 'safety', label: 'Safety', desc: 'OSHA Quiz' },
    { id: 'crew', label: 'Crew', desc: 'Assignment Puzzle' },
    { id: 'timeline', label: 'Timeline', desc: 'Gantt Chart' },
  ];

  // ── Render: Build Day (Mode 1) ─────────────────────────────
  const renderBuild = useCallback(() => {
    const availableTasks = BUILD_TASKS.filter(t => !buildSequence.includes(t.id));
    return (
      <div>
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.accentDm, marginBottom: 6 }}>
          CONSTRUCTION PHASE SEQUENCING
        </div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 20, maxWidth: 720 }}>
          A Habitat house has 8 major construction phases. Sequence them in the correct order.
          Wrong sequencing creates cascading problems: drywall before electrical means tearing it
          all out. Click tasks to add them to your build schedule, then submit to check your work.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <CriticalPathIcon /><Tip id="critical_path" />
        </div>

        {!buildSubmitted ? (
          <div>
            {/* Current sequence */}
            <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 20, marginBottom: 16 }}>
              <div style={{ fontFamily: Mono, fontSize: 12, color: C.accent, marginBottom: 12, letterSpacing: '.06em' }}>
                YOUR BUILD SCHEDULE ({buildSequence.length}/8)
              </div>
              {buildSequence.length === 0 ? (
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx3, padding: '20px 0', textAlign: 'center' }}>
                  Click tasks below to add them to your schedule
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {buildSequence.map((id, i) => {
                    const task = BUILD_TASKS.find(t => t.id === id);
                    return (
                      <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: C.accentBg, borderRadius: 6, border: '1px solid ' + C.line }}>
                        <span style={{ fontFamily: Mono, fontSize: 16, fontWeight: 700, color: C.accent, width: 28, textAlign: 'center' }}>{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: Sans, fontSize: 13, fontWeight: 600, color: C.tx }}>{task.name}</div>
                          <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>{task.duration} | Crew: {task.crew}{task.critical ? ' | CRITICAL PATH' : ''}</div>
                        </div>
                        <button onClick={() => removeFromSequence(id)} style={{ background: 'none', border: '1px solid ' + C.redDm, borderRadius: 4, color: C.red, fontFamily: Mono, fontSize: 12, padding: '4px 10px', cursor: 'pointer' }}>
                          REMOVE
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              {buildSequence.length === 8 && (
                <button onClick={submitBuildSequence} style={{ marginTop: 16, width: '100%', padding: '12px 0', borderRadius: 6, cursor: 'pointer', background: C.accentBg, border: '1px solid ' + C.accentDm, color: C.accent, fontFamily: Mono, fontSize: 12, fontWeight: 700, letterSpacing: '.06em' }}>
                  SUBMIT BUILD SCHEDULE
                </button>
              )}
            </div>

            {/* Available tasks */}
            <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, marginBottom: 10, letterSpacing: '.06em' }}>
              AVAILABLE TASKS ({availableTasks.length} remaining)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {availableTasks.map(task => (
                <button key={task.id} onClick={() => addToSequence(task.id)} style={{ width: '100%', textAlign: 'left', background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: '14px 18px', cursor: 'pointer', transition: 'border-color .12s ease' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: Sans, fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 4 }}>{task.name}</div>
                      <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6, marginBottom: 6 }}>{task.description}</div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>Duration: {task.duration}</span>
                        <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>Crew: {task.crew}</span>
                        {task.critical && <span style={{ fontFamily: Mono, fontSize: 12, color: C.red, fontWeight: 700 }}>CRITICAL PATH</span>}
                        {task.prerequisites.length > 0 && (
                          <span style={{ fontFamily: Mono, fontSize: 12, color: C.yellow }}>
                            Needs: {task.prerequisites.map(p => BUILD_TASKS.find(t => t.id === p)?.name.split('&')[0].split('(' /* ) */)[0].trim()).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                    <span style={{ fontFamily: Mono, fontSize: 12, color: C.accent, padding: '4px 10px', border: '1px solid ' + C.accentDm, borderRadius: 4, flexShrink: 0, marginLeft: 12 }}>+ ADD</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Results */
          <div>
            <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 24, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: Mono, fontSize: 12, color: C.accentDm, letterSpacing: '.06em', marginBottom: 4 }}>BUILD SCHEDULE EVALUATION</div>
                  <div style={{ fontFamily: Serif, fontSize: 24, fontWeight: 700, color: buildScore >= 80 ? C.green : buildScore >= 50 ? C.yellow : C.red }}>
                    {buildScore}/100
                  </div>
                </div>
                <div style={{ fontFamily: Mono, fontSize: 11, color: buildScore >= 80 ? C.green : buildScore >= 50 ? C.yellow : C.red, padding: '6px 14px', background: buildScore >= 80 ? C.greenBg : buildScore >= 50 ? C.yellowBg : C.redBg, borderRadius: 4 }}>
                  {buildScore === 100 ? 'PERFECT SCHEDULE' : buildScore >= 80 ? 'MINOR ISSUES' : buildScore >= 50 ? 'SIGNIFICANT PROBLEMS' : 'MAJOR REWORK NEEDED'}
                </div>
              </div>

              {/* Show the submitted sequence */}
              <div style={{ marginBottom: 16 }}>
                {buildSequence.map((id, i) => {
                  const task = BUILD_TASKS.find(t => t.id === id);
                  const hasError = buildErrors.some(e => e.toLowerCase().includes(task.name.toLowerCase().split('&')[0].trim().toLowerCase()));
                  return (
                    <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px', marginBottom: 2, background: hasError ? C.redBg : C.greenBg, borderRadius: 4, border: '1px solid ' + (hasError ? C.redDm : C.greenDm) + '33' }}>
                      <span style={{ fontFamily: Mono, fontSize: 14, fontWeight: 700, color: hasError ? C.red : C.green, width: 28, textAlign: 'center' }}>{i + 1}</span>
                      <span style={{ fontFamily: Sans, fontSize: 13, color: C.tx }}>{task.name}</span>
                      <span style={{ fontFamily: Mono, fontSize: 12, color: hasError ? C.red : C.green, marginLeft: 'auto' }}>{hasError ? '\✗' : '\✓'}</span>
                    </div>
                  );
                })}
              </div>

              {/* Errors */}
              {buildErrors.length > 0 && (
                <div>
                  <div style={{ fontFamily: Mono, fontSize: 12, color: C.red, marginBottom: 8, letterSpacing: '.06em' }}>SEQUENCING ERRORS ({buildErrors.length})</div>
                  {buildErrors.map((err, i) => (
                    <div key={i} style={{ fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.65, padding: '8px 14px', background: C.redBg, borderRadius: 6, border: '1px solid ' + C.line, marginBottom: 6 }}>
                      {err}
                    </div>
                  ))}
                </div>
              )}
              {buildErrors.length === 0 && (
                <div style={{ fontFamily: Sans, fontSize: 14, color: C.green, padding: '12px 0' }}>
                  No sequencing errors. You understand construction dependencies. This schedule would result in an efficient build with no rework.
                </div>
              )}

              {/* Consequences summary */}
              {buildScore < 100 && (
                <div style={{ marginTop: 16, padding: '12px 16px', background: C.orangeBg, borderRadius: 6, border: '1px solid ' + C.line }}>
                  <div style={{ fontFamily: Mono, fontSize: 12, color: C.orange, marginBottom: 6 }}>REAL-WORLD IMPACT</div>
                  <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6 }}>
                    These sequencing errors would cost approximately ${buildErrors.length * 1500 + (100 - buildScore) * 50} in rework and add {buildErrors.length * 5 + Math.floor((100 - buildScore) / 10)} days to the build schedule. On a Habitat build with limited funding, this directly reduces the number of families served.
                  </div>
                </div>
              )}

              <button onClick={resetBuild} style={{ marginTop: 16, padding: '10px 24px', borderRadius: 6, cursor: 'pointer', background: 'transparent', border: '1px solid ' + C.accentDm, color: C.accent, fontFamily: Mono, fontSize: 11 }}>
                TRY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }, [buildSequence, buildSubmitted, buildErrors, buildScore, addToSequence, removeFromSequence, submitBuildSequence, resetBuild]);

  // ── Render: Safety Quiz (Mode 2) ─────────────────────────
  const renderSafety = useCallback(() => {
    if (safetyComplete) {
      const pct = Math.round(safetyTotalScore / safetyMaxScore * 100);
      const rating = pct >= 90 ? 'Site Supervisor Ready' : pct >= 70 ? 'Crew Leader Material' : pct >= 50 ? 'Needs More Training' : 'Safety Hazard';
      return (
        <div>
          <div style={{
            background: 'rgba(16,14,10,.96)', border: '2px solid rgba(192,160,32,.25)', borderRadius: 4, padding: 28,
            borderTop: '4px solid ' + C.osha,
            boxShadow: '0 2px 12px rgba(0,0,0,.3)',
          }}>
            <div style={{
              fontFamily: Mono, fontSize: 12, color: C.osha, letterSpacing: '.08em', marginBottom: 6, fontWeight:700,
              padding:'4px 10px', background:'rgba(192,160,32,.08)', border:'1px solid rgba(192,160,32,.15)',
              borderRadius:2, display:'inline-block',
            }}>OSHA SAFETY ASSESSMENT COMPLETE</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: Serif, fontSize: 28, fontWeight: 700, color: pct >= 70 ? C.green : pct >= 50 ? C.yellow : C.red }}>
                  {safetyTotalScore}/{safetyMaxScore}
                </div>
                <div style={{ fontFamily: Sans, fontSize: 14, color: C.tx2 }}>{pct}% correct</div>
              </div>
              <div style={{ fontFamily: Mono, fontSize: 12, color: pct >= 70 ? C.green : pct >= 50 ? C.yellow : C.red, padding: '8px 16px', background: pct >= 70 ? C.greenBg : pct >= 50 ? C.yellowBg : C.redBg, borderRadius: 6 }}>
                {rating}
              </div>
            </div>

            {/* Review all answers */}
            {SAFETY_SCENARIOS.map((q, qIdx) => {
              const chosen = safetyAnswers[qIdx];
              const chosenOpt = q.options.find(o => o.id === chosen);
              const correctOpt = q.options.find(o => o.id === q.correct);
              const isCorrect = chosen === q.correct;
              return (
                <div key={qIdx} style={{ marginBottom: 16, padding: '14px 16px', background: isCorrect ? C.greenBg : C.redBg, borderRadius: 6, border: '1px solid ' + C.line }}>
                  <div style={{ fontFamily: Mono, fontSize: 12, color: isCorrect ? C.green : C.red, marginBottom: 4 }}>
                    SCENARIO {qIdx + 1}: {isCorrect ? 'CORRECT' : 'INCORRECT'} ({chosenOpt ? chosenOpt.score : 0}/10)
                  </div>
                  <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.65 }}>
                    {isCorrect ? chosenOpt.feedback : 'You chose: "' + (chosenOpt ? chosenOpt.label : '') + '" \— ' + (chosenOpt ? chosenOpt.feedback : '')}
                  </div>
                  {!isCorrect && (
                    <div style={{ fontFamily: Sans, fontSize: 12, color: C.green, marginTop: 6 }}>
                      Correct answer: {correctOpt.label}
                    </div>
                  )}
                </div>
              );
            })}

            <button onClick={resetSafety} style={{ marginTop: 12, padding: '10px 24px', borderRadius: 6, cursor: 'pointer', background: 'transparent', border: '1px solid ' + C.accentDm, color: C.accent, fontFamily: Mono, fontSize: 11 }}>
              RETAKE QUIZ
            </button>
          </div>
        </div>
      );
    }

    const q = SAFETY_SCENARIOS[safetyQuestion];
    const answeredCount = Object.keys(safetyAnswers).length;
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.08em', color: C.osha, marginBottom: 6, fontWeight:700,
          padding:'6px 12px', background:'rgba(192,160,32,.06)', border:'2px solid rgba(192,160,32,.2)',
          borderRadius:2, display:'inline-block', borderLeft:'4px solid '+C.osha,
        }}>
          OSHA CONSTRUCTION SAFETY QUIZ
        </div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 16, maxWidth: 720 }}>
          Five real-world safety scenarios. Identify the hazard and choose the best response.
          On a Habitat site, every volunteer is responsible for safety \— not just the supervisor.
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>QUESTION {safetyQuestion + 1}/{SAFETY_SCENARIOS.length}</span>
          <div style={{ flex: 1, maxWidth: 200, height: 4, background: C.line, borderRadius: 2 }}>
            <div style={{ width: ((safetyQuestion + 1) / SAFETY_SCENARIOS.length * 100) + '%', height: '100%', borderRadius: 2, background: C.accent, transition: 'width .3s ease' }} />
          </div>
          <span style={{ fontFamily: Mono, fontSize: 12, color: C.accent }}>Score: {safetyTotalScore}/{safetyMaxScore}</span>
        </div>

        {/* Scenario card — OSHA poster styling */}
        <div style={{
          background: 'rgba(16,14,10,.96)', border: '1px solid rgba(192,160,32,.18)',
          borderRadius: 4, padding: 24, marginBottom: 16,
          borderTop: '3px solid ' + C.osha,
          boxShadow: '0 2px 8px rgba(0,0,0,.3)',
        }}>
          <div style={{ fontFamily: Mono, fontSize: 12, color: C.osha, marginBottom: 8, letterSpacing: '.08em', fontWeight:700 }}>SCENARIO</div>
          <div style={{ fontFamily: Serif, fontSize: 15, color: C.tx, lineHeight: 1.7, marginBottom: 16, paddingLeft: 16, borderLeft: '3px solid ' + C.orangeDm }}>
            {q.scenario}
          </div>

          <div style={{ fontFamily: Mono, fontSize: 12, color: C.red, marginBottom: 8, letterSpacing: '.06em' }}>IDENTIFIED HAZARDS</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {q.hazards.map((h, i) => (
              <span key={i} style={{ fontFamily: Sans, fontSize: 11, padding: '4px 10px', background: C.redBg, border: '1px solid ' + C.line, borderRadius: 4, color: C.tx2 }}>{h}</span>
            ))}
          </div>

          <div style={{ fontFamily: Mono, fontSize: 12, color: C.accent, marginBottom: 10, letterSpacing: '.06em' }}>CHOOSE YOUR RESPONSE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {q.options.map(opt => {
              const chosen = safetyAnswers[safetyQuestion] === opt.id;
              const revealed = safetyRevealed[safetyQuestion];
              const isCorrect = opt.id === q.correct;
              let borderColor = C.line;
              let bg = 'transparent';
              if (revealed && chosen) { borderColor = isCorrect ? C.greenDm : C.redDm; bg = isCorrect ? C.greenBg : C.redBg; }
              else if (revealed && isCorrect) { borderColor = C.greenDm; bg = C.greenBg; }
              return (
                <div key={opt.id}>
                  <button onClick={() => selectSafetyAnswer(safetyQuestion, opt.id)} style={{
                    width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: 6, cursor: revealed ? 'default' : 'pointer',
                    background: bg, border: '1px solid ' + borderColor, transition: 'all .12s ease',
                    opacity: revealed && !chosen && !isCorrect ? 0.5 : 1,
                  }}>
                    <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx, lineHeight: 1.6 }}>{opt.label}</div>
                    {revealed && chosen && (
                      <div style={{ fontFamily: Mono, fontSize: 12, color: isCorrect ? C.green : C.red, marginTop: 4 }}>
                        {isCorrect ? '\✓ CORRECT' : '\✗ INCORRECT'} \— {opt.score}/10 points
                      </div>
                    )}
                  </button>
                  {revealed && chosen && (
                    <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6, padding: '8px 16px', marginTop: 4, background: C.accentBg, borderRadius: 6, border: '1px solid ' + C.line }}>
                      {opt.feedback}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setSafetyQuestion(prev => Math.max(0, prev - 1))} disabled={safetyQuestion === 0} style={{
            padding: '8px 18px', borderRadius: 4, cursor: safetyQuestion === 0 ? 'default' : 'pointer',
            background: 'transparent', border: '1px solid ' + C.line, color: safetyQuestion === 0 ? C.tx3 : C.tx2,
            fontFamily: Mono, fontSize: 11, opacity: safetyQuestion === 0 ? 0.4 : 1,
          }}>
            {'\←'} PREV
          </button>

          {safetyQuestion < SAFETY_SCENARIOS.length - 1 ? (
            <button onClick={() => setSafetyQuestion(prev => Math.min(SAFETY_SCENARIOS.length - 1, prev + 1))} style={{
              padding: '8px 18px', borderRadius: 4, cursor: 'pointer',
              background: 'transparent', border: '1px solid ' + C.accentDm, color: C.accent,
              fontFamily: Mono, fontSize: 11,
            }}>
              NEXT {'\→'}
            </button>
          ) : (
            <button onClick={finishSafetyQuiz} disabled={answeredCount < SAFETY_SCENARIOS.length} style={{
              padding: '8px 18px', borderRadius: 4, cursor: answeredCount < SAFETY_SCENARIOS.length ? 'default' : 'pointer',
              background: answeredCount < SAFETY_SCENARIOS.length ? 'transparent' : C.accentBg,
              border: '1px solid ' + C.accentDm, color: C.accent,
              fontFamily: Mono, fontSize: 11, fontWeight: 700,
              opacity: answeredCount < SAFETY_SCENARIOS.length ? 0.4 : 1,
            }}>
              FINISH QUIZ
            </button>
          )}
        </div>
      </div>
    );
  }, [safetyQuestion, safetyAnswers, safetyRevealed, safetyComplete, safetyTotalScore, safetyMaxScore, selectSafetyAnswer, finishSafetyQuiz, resetSafety]);

  // ── Render: Crew Assignment (Mode 3) ────────────────────────
  const renderCrew = useCallback(() => {
    return (
      <div>
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.accentDm, marginBottom: 6 }}>
          VOLUNTEER CREW ASSIGNMENT
        </div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 16, maxWidth: 720 }}>
          You have three volunteer crews arriving tomorrow. Assign each crew to the task that best
          matches their skill level, physical capacity, and team size. Mismatched assignments waste
          skilled labor and create safety risks.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <HardhatIcon /><Tip id="volunteer_management" />
        </div>

        {/* Crew profiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 24 }}>
          {CREW_TYPES.map(crew => (
            <div key={crew.id} style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ fontFamily: Sans, fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 4 }}>{crew.name}</div>
              <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, marginBottom: 8 }}>{crew.size} volunteers</div>
              <div style={{ fontFamily: Sans, fontSize: 11, color: C.tx2, lineHeight: 1.65, marginBottom: 8 }}>{crew.description}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ fontFamily: Mono, fontSize: 11, padding: '2px 6px', background: C.accentBg, borderRadius: 3, color: C.accent }}>Skill: {'\u2605'.repeat(crew.skill)}{'\u2606'.repeat(4 - crew.skill)}</span>
                <span style={{ fontFamily: Mono, fontSize: 11, padding: '2px 6px', background: C.orangeBg, borderRadius: 3, color: C.orange }}>Phys: {'\u2605'.repeat(crew.physical)}{'\u2606'.repeat(4 - crew.physical)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Task assignments */}
        <div style={{ fontFamily: Mono, fontSize: 12, color: C.accent, marginBottom: 10, letterSpacing: '.06em' }}>
          ASSIGN CREWS TO TASKS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {CREW_TASKS.map(task => {
            const assigned = crewAssignments[task.id];
            return (
              <div key={task.id} style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: Sans, fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 2 }}>{task.name}</div>
                    <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.65, marginBottom: 6 }}>{task.description}</div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>Skill needed: {task.skillReq}/4</span>
                      <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>Physical: {task.physicalReq}/3</span>
                      <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>Crew size: {task.crewNeeded}+</span>
                    </div>
                  </div>
                </div>

                {/* Crew selector */}
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  {CREW_TYPES.map(crew => {
                    const isAssigned = assigned === crew.id;
                    return (
                      <button key={crew.id} onClick={() => !crewSubmitted && assignCrew(task.id, crew.id)} style={{
                        flex: 1, padding: '8px 10px', borderRadius: 4, cursor: crewSubmitted ? 'default' : 'pointer',
                        background: isAssigned ? C.accentBg : 'transparent',
                        border: '1px solid ' + (isAssigned ? C.accentDm : C.line),
                        transition: 'all .12s ease',
                      }}>
                        <span style={{ fontFamily: Mono, fontSize: 12, color: isAssigned ? C.accent : C.tx3, display: 'block' }}>{crew.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Show feedback after submission */}
                {crewSubmitted && assigned && (
                  <div style={{
                    marginTop: 8, padding: '8px 12px', borderRadius: 4,
                    background: assigned === task.bestCrew ? C.greenBg : C.yellowBg,
                    border: '1px solid ' + (assigned === task.bestCrew ? C.greenDm : C.yellowDm) + '44',
                  }}>
                    <div style={{ fontFamily: Mono, fontSize: 12, color: assigned === task.bestCrew ? C.green : C.yellow, marginBottom: 2 }}>
                      {assigned === task.bestCrew ? '\✓ OPTIMAL MATCH' : '\u25CB SUBOPTIMAL'}
                    </div>
                    <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.65 }}>
                      {task.goodMatch[assigned]}
                    </div>
                    {assigned !== task.bestCrew && (
                      <div style={{ fontFamily: Sans, fontSize: 11, color: C.green, marginTop: 4 }}>
                        Best match: {CREW_TYPES.find(c => c.id === task.bestCrew)?.name} \— {task.goodMatch[task.bestCrew]}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit / Score */}
        {!crewSubmitted ? (
          <button onClick={submitCrewAssignments} disabled={Object.keys(crewAssignments).length < CREW_TASKS.length} style={{
            width: '100%', padding: '12px 0', borderRadius: 6,
            cursor: Object.keys(crewAssignments).length < CREW_TASKS.length ? 'default' : 'pointer',
            background: Object.keys(crewAssignments).length < CREW_TASKS.length ? 'transparent' : C.accentBg,
            border: '1px solid ' + C.accentDm, color: C.accent, fontFamily: Mono, fontSize: 12, fontWeight: 700,
            opacity: Object.keys(crewAssignments).length < CREW_TASKS.length ? 0.4 : 1,
          }}>
            SUBMIT ASSIGNMENTS ({Object.keys(crewAssignments).length}/{CREW_TASKS.length})
          </button>
        ) : (
          <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 20, textAlign: 'center' }}>
            <div style={{ fontFamily: Mono, fontSize: 12, color: C.accentDm, letterSpacing: '.06em', marginBottom: 6 }}>CREW ASSIGNMENT SCORE</div>
            <div style={{ fontFamily: Serif, fontSize: 28, fontWeight: 700, color: crewScore.pct >= 80 ? C.green : crewScore.pct >= 50 ? C.yellow : C.red }}>
              {crewScore.score}/{crewScore.total}
            </div>
            <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, marginBottom: 12 }}>
              {crewScore.pct >= 80 ? 'Excellent crew management. You maximize both safety and productivity.' : crewScore.pct >= 50 ? 'Decent allocation. Some crews are underutilized or mismatched to the task difficulty.' : 'Significant mismatches. Skilled volunteers are wasted on simple tasks while complex work lacks expertise.'}
            </div>
            <button onClick={resetCrew} style={{ padding: '8px 20px', borderRadius: 4, cursor: 'pointer', background: 'transparent', border: '1px solid ' + C.accentDm, color: C.accent, fontFamily: Mono, fontSize: 11 }}>
              TRY AGAIN
            </button>
          </div>
        )}
      </div>
    );
  }, [crewAssignments, crewSubmitted, crewScore, assignCrew, submitCrewAssignments, resetCrew]);

  // ── Render: Timeline / Gantt (Mode 4) ──────────────────────
  const renderTimeline = useCallback(() => {
    const dayWidth = 22;
    const barH = 24;
    const rowH = 38;
    const leftCol = 140;
    const totalW = leftCol + ganttTotalDays * dayWidth + 40;
    const inspectionOptions = [
      { id: 'framing', label: 'Framing inspection fails (+5 days)', delay: 5 },
      { id: 'roofing', label: 'Roofing inspection fails (+3 days)', delay: 3 },
      { id: 'insulation', label: 'Insulation inspection fails (+2 days)', delay: 2 },
    ];

    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.08em', color: C.accent, marginBottom: 6, fontWeight:600,
          padding:'5px 12px', background:'rgba(176,128,48,.06)', border:'1px solid rgba(176,128,48,.15)',
          borderRadius:3, display:'inline-block',
        }}>
          PROJECT TIMELINE {'\u2014'} GANTT VIEW
        </div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 16, maxWidth: 720 }}>
          Visualize construction dependencies. Tasks that share a start day run in parallel
          (rough electrical and plumbing happen simultaneously). Toggle "What If" to see how
          a failed inspection cascades through the entire schedule.
        </div>

        {/* What-If controls */}
        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: '14px 18px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: whatIf ? 12 : 0 }}>
            <button onClick={() => { setWhatIf(prev => !prev); if (whatIf) setFailedInspection(null); }} style={{
              padding: '6px 14px', borderRadius: 4, cursor: 'pointer',
              background: whatIf ? C.redBg : 'transparent',
              border: '1px solid ' + (whatIf ? C.redDm : C.line),
              color: whatIf ? C.red : C.tx3, fontFamily: Mono, fontSize: 11, fontWeight: 600,
            }}>
              {whatIf ? '\✓ WHAT-IF MODE' : 'ENABLE WHAT-IF'}
            </button>
            <span style={{ fontFamily: Sans, fontSize: 12, color: C.tx3 }}>
              {whatIf ? 'Select a failed inspection to see the cascade delay.' : 'Simulate inspection failures and see downstream impact.'}
            </span>
          </div>
          {whatIf && (
            <div style={{ display: 'flex', gap: 6 }}>
              {inspectionOptions.map(opt => (
                <button key={opt.id} onClick={() => setFailedInspection(opt.id)} style={{
                  padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
                  background: failedInspection === opt.id ? C.redBg : 'transparent',
                  border: '1px solid ' + (failedInspection === opt.id ? C.redDm : C.line),
                  color: failedInspection === opt.id ? C.red : C.tx3,
                  fontFamily: Mono, fontSize: 12,
                }}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Gantt chart */}
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <div style={{ minWidth: totalW, position: 'relative' }}>
            {/* Day headers */}
            <div style={{ display: 'flex', marginLeft: leftCol, marginBottom: 6 }}>
              {Array.from({ length: ganttTotalDays }, (_, i) => (
                <div key={i} style={{ width: dayWidth, textAlign: 'center', fontFamily: Mono, fontSize: 12, color: i % 5 === 0 ? C.tx3 : C.line }}>
                  {i % 5 === 0 ? 'D' + i : ''}
                </div>
              ))}
            </div>

            {/* Task rows */}
            {ganttData.map((task, i) => {
              const isDelayed = task.delayed;
              const original = GANTT_TASKS[i];
              const delayDays = isDelayed ? task.start - original.start : 0;
              return (
                <div key={task.id} style={{ display: 'flex', alignItems: 'center', height: rowH, position: 'relative' }}>
                  <div style={{ width: leftCol, paddingRight: 10, flexShrink: 0 }}>
                    <div style={{ fontFamily: Sans, fontSize: 11, color: isDelayed ? C.red : C.tx, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {task.name}
                    </div>
                    {isDelayed && (
                      <div style={{ fontFamily: Mono, fontSize: 11, color: C.red }}>+{delayDays}d delay</div>
                    )}
                  </div>
                  <div style={{ position: 'relative', flex: 1, height: barH }}>
                    {/* Grid lines */}
                    {Array.from({ length: ganttTotalDays }, (_, d) => (
                      <div key={d} style={{ position: 'absolute', left: d * dayWidth, top: 0, width: 1, height: barH, background: d % 5 === 0 ? C.line : 'transparent' }} />
                    ))}
                    {/* Ghost bar (original position if delayed) */}
                    {isDelayed && (
                      <div style={{
                        position: 'absolute', left: original.start * dayWidth, top: (rowH - barH) / 2,
                        width: original.duration * dayWidth - 2, height: barH - 4, borderRadius: 3,
                        background: 'transparent', border: '1px dashed ' + C.tx3 + '44',
                      }} />
                    )}
                    {/* Actual bar */}
                    <div style={{
                      position: 'absolute', left: task.start * dayWidth, top: (rowH - barH) / 2,
                      width: task.duration * dayWidth - 2, height: barH - 4, borderRadius: 3,
                      background: isDelayed ? C.redBg : task.color + '33',
                      border: '1px solid ' + (isDelayed ? C.redDm : task.color + '66'),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontFamily: Mono, fontSize: 11, color: isDelayed ? C.red : C.tx2 }}>
                        {task.duration}d
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Total project line */}
            <div style={{ display: 'flex', alignItems: 'center', height: 30, marginTop: 8, borderTop: '1px solid ' + C.line, paddingTop: 8 }}>
              <div style={{ width: leftCol, fontFamily: Mono, fontSize: 12, color: C.accent, fontWeight: 600 }}>
                TOTAL: {ganttTotalDays} days
              </div>
              <div style={{ flex: 1 }}>
                {whatIf && failedInspection && (
                  <span style={{ fontFamily: Mono, fontSize: 12, color: C.red }}>
                    (+{ganttTotalDays - Math.max(...GANTT_TASKS.map(t => t.start + t.duration))} days from baseline)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Legend & dependency explanation */}
        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: '16px 20px' }}>
          <div style={{ fontFamily: Mono, fontSize: 12, color: C.accentDm, marginBottom: 10, letterSpacing: '.06em' }}>DEPENDENCY NOTES</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6, padding: '6px 10px', background: C.accentBg, borderRadius: 4 }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.yellow, display: 'block', marginBottom: 2 }}>PARALLEL TASKS</span>
              Rough Electrical and Rough Plumbing start at the same time. Both require framing to be complete but are independent of each other. This is where smart scheduling saves days.
            </div>
            <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6, padding: '6px 10px', background: C.accentBg, borderRadius: 4 }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.red, display: 'block', marginBottom: 2 }}>CRITICAL PATH</span>
              Site Prep {'\→'} Framing {'\→'} Roofing {'\→'} Insulation {'\→'} Drywall {'\→'} Finish. Any delay on this path delays the entire project. Parallel tasks have float.
            </div>
            <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6, padding: '6px 10px', background: C.orangeBg, borderRadius: 4 }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.orange, display: 'block', marginBottom: 2 }}>INSPECTION GATES</span>
              Framing, rough-in, insulation, and final inspections are required before the next phase. A failed inspection means rework + re-inspection scheduling (2-5 day delay typical).
            </div>
            <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6, padding: '6px 10px', background: C.greenBg, borderRadius: 4 }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.green, display: 'block', marginBottom: 2 }}>WEATHER RISK</span>
              Roofing is the weather gate. Until the roof is on, interior work risks water damage. Smart scheduling puts roofing immediately after framing to minimize exposure window.
            </div>
          </div>
        </div>
      </div>
    );
  }, [ganttData, ganttTotalDays, whatIf, failedInspection]);

  // ── Main Render ────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', color: C.tx, fontFamily: Sans, position:'relative',
      background: 'linear-gradient(180deg, #0a0806 0%, #0c0a06 40%, #0a0806 100%)',
    }}>
      <BlueprintGridBg />
      <ConstructionBg />
      {/* Warm dust-particle overlay */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0, pointerEvents:'none', zIndex:0,
        background:'radial-gradient(ellipse at 60% 30%, rgba(176,128,48,.03) 0%, transparent 50%)',
      }} />
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,8,6,.94)', backdropFilter: 'blur(12px)',
        borderBottom: '2px solid rgba(176,128,48,.2)', padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer',
        }}>{'\←'} Back to Coursework</button>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {/* House/construction icon */}
          <svg width="16" height="16" viewBox="0 0 20 20" style={{opacity:0.5}}>
            <path d="M3,12 L10,5 L17,12" fill="none" stroke={C.accent} strokeWidth="1.5" />
            <rect x="5" y="12" width="10" height="7" fill="none" stroke={C.accent} strokeWidth="1" />
            <rect x="8" y="14" width="4" height="5" fill="none" stroke={C.accent} strokeWidth="0.8" />
          </svg>
          <span style={{ fontFamily: Mono, fontSize: 12, color: C.accent, letterSpacing:'.08em', fontWeight:600 }}>
            HABITAT {'\u2014'} HABITAT FOR HUMANITY
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position:'relative', zIndex:2 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display:'inline-block', padding:'3px 10px', marginBottom:12,
            background:'rgba(176,128,48,.06)', border:'1px solid rgba(176,128,48,.2)',
            borderRadius:2, fontFamily:Mono, fontSize:11, color:C.accent,
            letterSpacing:'.1em', fontWeight:600,
          }}>
            CONSTRUCTION SERVICES
          </div>
          <h1 style={{
            fontFamily: Serif, fontSize: 32, fontWeight: 700,
            color: C.tx, letterSpacing: '-.03em', marginBottom: 8,
          }}>Build Day Coordinator</h1>
          <p style={{
            fontFamily: Serif, fontSize: 15, color: C.tx2,
            lineHeight: 1.6, marginBottom: 4, maxWidth: 720,
          }}>
            Coordinate a Habitat for Humanity build from foundation to finish. Sequence
            construction phases, pass the OSHA safety quiz, assign volunteer crews to tasks,
            and visualize the project timeline with what-if analysis.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 6px' }}>
            <HammerIcon /><Tip id="sweat_equity" />
          </div>
          <p style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3, lineHeight: 1.65, marginBottom: 12,
          }}>
            Habitat for Humanity Volunteer, Build Day Crew Leader
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            {SKILLS.map(tag => (
              <span key={tag} style={{
                fontFamily: Mono, fontSize: 11, padding: '3px 8px', borderRadius: 3,
                background: C.accentBg, color: C.accentDm, letterSpacing: '.03em',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Mode Switch — construction tabs with OSHA safety highlight */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 24, borderBottom:'2px solid rgba(176,128,48,.12)' }}>
          {modes.map(m => {
            const isActive = mode === m.id;
            const isSafety = m.id === 'safety';
            return (
              <button key={m.id} onClick={() => setMode(m.id)} style={{
                flex: 1, padding: '10px 12px', cursor: 'pointer',
                background: isActive ? (isSafety ? 'rgba(192,160,32,.1)' : 'rgba(176,128,48,.08)') : 'transparent',
                border: 'none',
                borderBottom: isActive ? ('2px solid ' + (isSafety ? C.osha : C.accent)) : '2px solid transparent',
                borderRadius: '4px 4px 0 0',
                textAlign: 'center', transition: 'all .15s ease',
              }}>
                <span style={{
                  fontFamily: Mono, fontSize: 11, fontWeight: 700,
                  color: isActive ? (isSafety ? C.osha : C.accent) : C.tx3, display: 'block',
                  letterSpacing:'.05em',
                }}>{m.label}</span>
                <span style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{m.desc}</span>
              </button>
            );
          })}
        </div>

        {mode === 'build' && renderBuild()}
        {mode === 'safety' && renderSafety()}
        {mode === 'crew' && renderCrew()}
        {mode === 'timeline' && renderTimeline()}

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
          }}>{'\←'} Back to Coursework</button>
        </div>
      </div>
    </div>
  );
}
