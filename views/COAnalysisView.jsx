// COAnalysisView.jsx — Multi-INT Fusion Console
// Intelligence Collection (INAF 5613)
//
// The visitor is a collection manager at an IC fusion center. They receive
// a priority intelligence requirement (PIR) and must task the right
// combination of collection disciplines (INTs) to answer it. Each INT
// returns partial intelligence; the visitor fuses them into an all-source
// assessment and receives expert feedback on their collection strategy.

// ── Palette: SCIF dark blue-black intelligence facility ───────────
const CO_C = {
  bg: '#060a10',
  card: 'rgba(8,14,24,.94)',
  cardBd: 'rgba(50,90,160,.12)',
  tx: '#b0bcd0',
  tx2: '#6878a0',
  tx3: '#404a68',
  teal: '#3a8cc8',
  tealDm: '#2a6898',
  tealBg: 'rgba(58,140,200,.07)',
  green: '#38b060',
  greenDm: '#288848',
  greenBg: 'rgba(56,176,96,.06)',
  amber: '#d4a838',
  amberDm: '#a88028',
  amberBg: 'rgba(212,168,56,.07)',
  red: '#c05040',
  redDm: '#903830',
  redBg: 'rgba(192,80,64,.06)',
  blue: '#5090d0',
  blueDm: '#3868a0',
  blueBg: 'rgba(80,144,208,.07)',
  purple: '#8868b8',
  purpleDm: '#685098',
  purpleBg: 'rgba(136,104,184,.06)',
  cyan: '#38b0c8',
  cyanDm: '#288898',
  cyanBg: 'rgba(56,176,200,.06)',
  line: 'rgba(50,90,160,.10)',
  // INT-specific identities
  humintWarm: '#d49838',
  humintBg: 'rgba(212,152,56,.08)',
  sigintCool: '#4090d8',
  sigintBg: 'rgba(64,144,216,.07)',
  geointEarth: '#6a9848',
  geointBg: 'rgba(106,152,72,.07)',
  classStrip: '#c83030',
};
const CO_MONO = "'IBM Plex Mono','Courier New',monospace";
const CO_SANS = "'Inter',Helvetica,sans-serif";

// ── SCIF Background SVG Elements ─────────────────────────────────
const SCIFRadarSweep = () => {
  const keyframes = `@keyframes radarSweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
  return React.createElement('div', {
    style: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }
  },
    React.createElement('style', null, keyframes),
    React.createElement('svg', { width: '100%', height: '100%', viewBox: '0 0 1200 900', preserveAspectRatio: 'xMidYMid slice', style: { position: 'absolute', opacity: 0.06 } },
      // Radar circles
      React.createElement('circle', { cx: 900, cy: 200, r: 80, fill: 'none', stroke: '#3a8cc8', strokeWidth: 0.5 }),
      React.createElement('circle', { cx: 900, cy: 200, r: 160, fill: 'none', stroke: '#3a8cc8', strokeWidth: 0.4 }),
      React.createElement('circle', { cx: 900, cy: 200, r: 240, fill: 'none', stroke: '#3a8cc8', strokeWidth: 0.3 }),
      React.createElement('circle', { cx: 900, cy: 200, r: 320, fill: 'none', stroke: '#3a8cc8', strokeWidth: 0.2 }),
      // Radar sweep line
      React.createElement('line', { x1: 900, y1: 200, x2: 900, y2: -120, stroke: '#3a8cc8', strokeWidth: 1.5, style: { transformOrigin: '900px 200px', animation: 'radarSweep 8s linear infinite' } }),
      // Satellite orbit arcs
      React.createElement('ellipse', { cx: 600, cy: 450, rx: 550, ry: 120, fill: 'none', stroke: '#3a8cc8', strokeWidth: 0.4, strokeDasharray: '8 12' }),
      React.createElement('ellipse', { cx: 600, cy: 450, rx: 500, ry: 200, fill: 'none', stroke: '#2a6898', strokeWidth: 0.3, strokeDasharray: '6 14', transform: 'rotate(-15,600,450)' }),
      // Small satellite dots on orbit
      React.createElement('circle', { cx: 150, cy: 410, r: 2.5, fill: '#3a8cc8' }),
      React.createElement('circle', { cx: 1050, cy: 490, r: 2, fill: '#2a6898' }),
      React.createElement('circle', { cx: 600, cy: 330, r: 1.8, fill: '#3a8cc8' }),
      // Grid lines
      React.createElement('line', { x1: 0, y1: 0, x2: 1200, y2: 900, stroke: '#1a2a48', strokeWidth: 0.3 }),
      React.createElement('line', { x1: 1200, y1: 0, x2: 0, y2: 900, stroke: '#1a2a48', strokeWidth: 0.3 }),
    )
  );
};

const ClassificationStrip = ({ text, color }) => React.createElement('div', {
  style: {
    background: color || '#8b0000', color: '#fff', fontFamily: CO_MONO, fontSize: 11,
    letterSpacing: '.18em', textAlign: 'center', padding: '4px 0', fontWeight: 700,
    borderTop: '2px solid ' + (color || '#c03030'), borderBottom: '2px solid ' + (color || '#c03030'),
    textTransform: 'uppercase', marginBottom: 16,
  }
}, text);

const CableHeader = ({ routing, priority, color }) => React.createElement('div', {
  style: {
    background: '#e8e0cc', color: '#1a1a18', fontFamily: CO_MONO, fontSize: 11,
    letterSpacing: '.1em', padding: '6px 14px', borderRadius: '3px 3px 0 0',
    borderBottom: '2px solid ' + (color || '#3a8cc8'), display: 'flex',
    justifyContent: 'space-between', alignItems: 'center', fontWeight: 600,
  }
}, React.createElement('span', null, 'CABLE // ' + routing),
   React.createElement('span', { style: { color: priority === 'FLASH' ? '#a02020' : priority === 'PRIORITY' ? '#a07020' : '#404040', fontSize: 10 } }, priority || 'ROUTINE')
);

// ── INT Discipline Definitions ───────────────────────────────
const INT_DEFS = [
  { id: 'HUMINT', label: 'HUMINT', full: 'Human Intelligence', color: CO_C.humintWarm, bg: CO_C.humintBg, icon: '\u{1F464}',
    desc: 'Agents, assets, diplomatic reporting, debriefings, attache contacts.',
    strength: 'Intentions, plans, motivations, leadership mindset, context behind actions.',
    weakness: 'Slow collection cycle, high personal risk, vulnerable to deception and fabrication.',
    doctrine: 'ICD 304 (Human Intelligence), EO 12333 Part 2' },
  { id: 'SIGINT', label: 'SIGINT', full: 'Signals Intelligence', color: CO_C.sigintCool, bg: CO_C.sigintBg, icon: '\u{1F4E1}',
    desc: 'Intercepted communications (COMINT), electronic emissions (ELINT), foreign instrumentation signals (FISINT).',
    strength: 'High volume, technical certainty, real-time intercept capability.',
    weakness: 'Encryption degrades access, context-poor without HUMINT, collection gaps in denied areas.',
    doctrine: 'USSID 18, EO 12333, FISA (Foreign Intelligence Surveillance Act)' },
  { id: 'GEOINT', label: 'GEOINT', full: 'Geospatial Intelligence', color: CO_C.geointEarth, bg: CO_C.geointBg, icon: '\u{1F6F0}',
    desc: 'Satellite imagery, aerial photography, mapping, terrain analysis, change detection.',
    strength: 'Physical evidence of activity, infrastructure changes, order-of-battle verification.',
    weakness: 'Denied areas with cloud cover, camouflage/concealment/deception (CCD), revisit rate limits.',
    doctrine: 'NGA Standards, NSGP, ICD 701 (Geospatial Intelligence)' },
  { id: 'OSINT', label: 'OSINT', full: 'Open Source Intelligence', color: CO_C.teal, bg: CO_C.tealBg, icon: '\u{1F4F0}',
    desc: 'Public media, social media, academic publications, commercial data, government filings.',
    strength: 'Cheap, broad coverage, fast turnaround, publicly shareable.',
    weakness: 'Noise-to-signal ratio, adversary deception via influence operations, volume overload.',
    doctrine: 'ICD 301 (National Open Source Enterprise), ODNI OSINT Strategy' },
  { id: 'MASINT', label: 'MASINT', full: 'Measurement & Signature Intelligence', color: CO_C.purple, bg: CO_C.purpleBg, icon: '\u{2622}',
    desc: 'Radar signatures, nuclear/chemical/biological detection, acoustic, seismic, spectroscopic analysis.',
    strength: 'Technical specificity, hard to deny or fabricate, unique detection capabilities.',
    weakness: 'Narrow applicability, expensive collection platforms, requires specialized analysis.',
    doctrine: 'MASINT Committee Charter, ICD 501, AFTAC (Air Force Technical Applications Center)' },
  { id: 'CYBER', label: 'CYBER', full: 'Cyber Intelligence', color: CO_C.cyan, bg: CO_C.cyanBg, icon: '\u{1F5A5}',
    desc: 'Network exploitation, malware analysis, digital forensics, intrusion detection artifacts.',
    strength: 'Deep access to digital infrastructure, real-time monitoring, metadata analysis.',
    weakness: 'Attribution difficulty, access fragility (burned once detected), legal constraints.',
    doctrine: 'PPD-20, NSPM-13, US Cyber Command authorities' },
];

// ── PIR Scenarios ─────────────────────────────────────────────
const PIR_SCENARIOS = [
  {
    id: 'PIR1',
    title: 'Clandestine Nuclear Program',
    classification: 'TOP SECRET // SI // TK // NOFORN',
    pir: 'Is Country X developing a clandestine nuclear weapons program?',
    context: 'Satellite imagery shows construction at a suspected enrichment facility. Diplomatic sources report Country X has been purchasing dual-use centrifuge components through front companies. The IAEA has been denied access to two declared sites for 18 months. NSC requires a collection strategy within 72 hours.',
    optimalInts: ['GEOINT', 'MASINT', 'HUMINT', 'SIGINT'],
    intReturns: {
      HUMINT: { confidence: 'MODERATE', classification: 'TOP SECRET // HCS-O // NOFORN', source: 'HUMINT Sub-source EMERALD (reliability B, information 2)', report: 'Sub-source reports that a senior scientist from Country X\'s atomic energy commission privately stated that "the timeline has accelerated" and referenced a "second pathway." Sub-source could not clarify whether this refers to plutonium reprocessing or HEU enrichment. Sub-source has direct access to the scientist through an academic conference relationship. Last meeting was 3 weeks ago. CAVEAT: Sub-source has provided 6 reports over 18 months; 4 were corroborated. One was assessed as embellishment.', gaps: 'Cannot confirm technical details. Source does not have access to facility. Reporting on intentions, not capabilities.' },
      SIGINT: { confidence: 'HIGH', classification: 'TOP SECRET // SI // REL FVEY', source: 'NSA SIGINT Report, Collection Station [REDACTED]', report: 'Intercepted communications between Country X procurement officials and a European engineering firm reference "gas centrifuge balancing equipment" and "UF6 handling containers." Procurement volume is consistent with a 3,000-centrifuge cascade. Separately, a military communications network near the suspected facility has shifted to burst transmission mode — a pattern previously associated with heightened security around sensitive installations. CAVEAT: Encryption on the military net prevents content access; analysis is based on traffic patterns only.', gaps: 'Cannot determine enrichment levels. Cannot confirm facility purpose from communications alone. Need MASINT for isotopic confirmation.' },
      GEOINT: { confidence: 'HIGH', classification: 'SECRET // REL FVEY', source: 'NGA Imagery Analysis, Tasking [REDACTED]', report: 'Multi-temporal analysis of the suspected facility shows: (1) Significant underground construction consistent with centrifuge hall dimensions, (2) New electrical infrastructure with capacity exceeding any declared industrial purpose, (3) Extensive earth-moving to create bermed perimeter — consistent with blast/radiation containment, (4) Vehicle traffic patterns show security cordons typical of nuclear facilities. Change detection over 12 months shows accelerated construction pace. CAVEAT: Underground activity cannot be directly observed. Surface signatures are consistent with but not proof of nuclear enrichment.', gaps: 'Cannot determine what is underground. Need MASINT sensors for effluent analysis. Weather limited 3 of last 8 collection windows.' },
      OSINT: { confidence: 'LOW', classification: 'UNCLASSIFIED // FOUO', source: 'OSINT Analytic Cell, Open Source Center', report: 'Academic publications from Country X\'s nuclear scientists have decreased 60% in the last 2 years — a pattern historically associated with scientists being redirected to classified programs. Country X\'s state media has increased "nuclear sovereignty" rhetoric. Commercial satellite imagery (Planet Labs) shows the facility but at lower resolution than NGA products. Social media monitoring of nearby towns shows no unusual activity. CAVEAT: Publication gaps can have benign explanations (funding cuts, institutional reorganization). Rhetoric may be diplomatic posturing.', gaps: 'Open sources provide context but cannot penetrate classified programs. Social media from denied areas is heavily monitored/censored by target country.' },
      MASINT: { confidence: 'HIGH', classification: 'TOP SECRET // SI // NOFORN', source: 'AFTAC Collection Report, Sensor Platform [REDACTED]', report: 'Atmospheric sampling downwind of the suspected facility detected trace quantities of UF6 (uranium hexafluoride) at 2.3x background levels. Isotopic analysis indicates enrichment levels between 3.5-5.0% — consistent with low-enriched uranium (LEU) but above levels required for declared civilian reactor program (which uses purchased fuel rods). Separately, infrasound monitoring detected underground vibrations consistent with high-speed centrifuge cascades operating at ~63,000 RPM. CAVEAT: LEU enrichment does not prove weapons intent — could be fuel fabrication research. However, the undeclared nature of the activity is a significant indicator.', gaps: 'Cannot determine total HEU production capacity from atmospheric sampling alone. Need sustained collection over months to establish production rate estimates.' },
      CYBER: { confidence: 'LOW', classification: 'TOP SECRET // SI // REL FVEY', source: 'Cyber Collection Cell, NSA TAO', report: 'Limited network access within Country X\'s atomic energy infrastructure. Recovered metadata from a compromised email server shows communications between the facility director and a military procurement office referencing "delivery schedule" and "assembly specifications." No technical documents recovered. A connected SCADA network was identified but not penetrated due to risk of detection. CAVEAT: Attribution is firm (infrastructure matches known Country X government networks) but content recovery is fragmentary. Access is fragile — any further exploitation risks burn.', gaps: 'Cannot access classified internal networks. SCADA penetration would provide definitive technical intelligence but risks compromising the access entirely.' },
    },
    fusionKey: ['Underground facility construction + UF6 atmospheric detection = strong physical evidence', 'Procurement intercepts + centrifuge vibration signatures = corroborated technical indicators', 'HUMINT on "accelerated timeline" + construction pace increase = temporal convergence', 'Optimal collection: GEOINT+MASINT for physical evidence, SIGINT for procurement, HUMINT for intentions'],
    expertFeedback: {
      optimal: 'Outstanding collection strategy. GEOINT and MASINT provide the physical evidence backbone — satellite imagery shows the facility while MASINT confirms isotopic signatures. SIGINT fills the procurement picture and HUMINT provides the intentions piece that technical collection cannot reach. This is textbook multi-INT convergence for a WMD proliferation requirement.',
      good: 'Strong strategy with good coverage. You have most of the critical INT contributions. Consider whether the missing discipline would have provided a unique perspective that the others cannot replicate.',
      weak: 'Your collection strategy has significant gaps. For a WMD proliferation question, you need technical confirmation (MASINT for isotopic/signature data), physical evidence (GEOINT for facility characterization), intercepts (SIGINT for procurement), and human sources (HUMINT for intentions). Relying on fewer than these four leaves critical intelligence gaps.'
    },
  },
  {
    id: 'PIR2',
    title: 'Terrorist Attack Planning',
    classification: 'TOP SECRET // SI // HCS-O // NOFORN',
    pir: 'What are the plans and intentions of Terrorist Group Y for attacks on Western targets?',
    context: 'A recent uptick in encrypted messaging activity among known Group Y operatives has been detected by SIGINT. A walk-in source in a third country claims knowledge of operational planning. DHS has elevated the threat level for transportation infrastructure. The NSC Deputies Committee meets in 48 hours and requires an all-source assessment.',
    optimalInts: ['HUMINT', 'SIGINT', 'OSINT', 'CYBER'],
    intReturns: {
      HUMINT: { confidence: 'MODERATE', classification: 'TOP SECRET // HCS-P // NOFORN', source: 'CIA HUMINT Reporting, Source SAPPHIRE (reliability C, information 3)', report: 'Walk-in source SAPPHIRE, debriefed at [REDACTED] station, claims to have attended a planning meeting where Group Y leadership discussed "a spectacular operation in Europe within 90 days." Source identified three operatives by alias who were tasked with logistics, surveillance, and procurement. Source provided a partial phone number and a neighborhood in a European capital as a safe house location. CAVEAT: SAPPHIRE is a walk-in with no established track record. Motivations unclear — may be seeking asylum, financial reward, or may be a dangle. Information requires urgent corroboration before elevation. Source polygraph scheduled but not yet completed.', gaps: 'Source reliability unestablished. Cannot confirm planning details independently. Walk-ins carry high deception risk.' },
      SIGINT: { confidence: 'MODERATE-HIGH', classification: 'TOP SECRET // SI // NOFORN', source: 'NSA SIGINT Summary, Priority Target [REDACTED]', report: 'Communications pattern analysis shows a 340% increase in encrypted messaging among 12 known Group Y selectors over the past 21 days. Three previously dormant accounts have reactivated — historically a pre-operational indicator. One partially decrypted message references "the brothers in [European city]" and "after the preparation is complete." A new communication node was identified linking Group Y\'s external operations wing with a previously unknown contact in a European diaspora community. CAVEAT: Encrypted content is largely inaccessible. Pattern analysis provides indicators but not specifics. "Preparation" could refer to propaganda, recruitment, or operational planning.', gaps: 'Cannot break current encryption on primary channels. Need HUMINT to contextualize communications content. Cannot identify the European contact from SIGINT alone.' },
      GEOINT: { confidence: 'LOW', classification: 'SECRET // NOFORN', source: 'NGA Geospatial Analysis Cell', report: 'Satellite monitoring of known Group Y training camps shows normal activity patterns — no surge in personnel or vehicle movement. One camp in [REDACTED] province shows new construction of a small structure consistent with a planning/briefing facility, but could also be a storage building. Urban geospatial analysis of the European city mentioned by SAPPHIRE identified 14 properties matching the partial address description. CAVEAT: Terrorist attack planning occurs in urban environments where satellite imagery has limited utility. Training camp activity may not correlate with external operations planning.', gaps: 'GEOINT is a poor fit for urban CT requirements. Cannot observe planning meetings, safe houses, or urban surveillance. Better suited to military/infrastructure targets.' },
      OSINT: { confidence: 'MODERATE', classification: 'SECRET // REL FVEY', source: 'OSINT Fusion Cell, FBI/DHS', report: 'Social media monitoring detected Group Y propaganda shift: 3 new videos in 14 days emphasize "striking the far enemy" rather than local governance — a rhetorical pattern that preceded the 2015 and 2017 European attacks. Online recruitment messaging has pivoted to European-language content. Dark web forum monitoring shows increased chatter about transportation infrastructure vulnerabilities in European capitals, with specific discussion of metro systems and rail stations. A Group Y-affiliated media outlet published a "target suggestion list" that includes the European city referenced in SIGINT. CAVEAT: Online rhetoric does not always translate to operational intent. Target lists are aspirational — Group Y publishes them routinely. However, convergence with SIGINT and HUMINT reporting is concerning.', gaps: 'Cannot distinguish aspirational from operational. OSINT provides context but requires corroboration from clandestine sources for threat confirmation.' },
      MASINT: { confidence: 'NOT APPLICABLE', classification: 'SECRET // NOFORN', source: 'MASINT Requirements Cell', report: 'MASINT collection has limited applicability to this PIR. No chemical/biological/radiological indicators associated with Group Y at this time. Acoustic monitoring of known training camps shows small-arms activity at baseline levels. MASINT sensors are not deployed in the European urban environment relevant to this threat. CAVEAT: MASINT would become relevant if intelligence indicated a CBRN dimension to the plot. Current intelligence does not support this.', gaps: 'MASINT is designed for technical signatures, not human planning activity. Tasking MASINT for this PIR diverts expensive platforms from higher-yield requirements.' },
      CYBER: { confidence: 'MODERATE-HIGH', classification: 'TOP SECRET // SI // REL FVEY', source: 'NSA/CSS Cyber Operations, Special Access', report: 'Exploitation of a Group Y-linked cloud storage account recovered fragmentary documents including: a hand-drawn map of a European metro station (not yet geolocated), a list of 8 names with European passport numbers (being run against TIDE/TSDB), and a budget spreadsheet showing $42,000 in cryptocurrency transfers through mixing services. Digital forensics show the documents were created within the last 30 days. Separately, a Group Y operative\'s compromised device shows encrypted app installation and map application queries for the same European city. CAVEAT: Access was achieved through a third-party vulnerability that may not persist. Documents may be planning for multiple contingencies, not a committed operation. Cryptocurrency tracing is ongoing.', gaps: 'Access fragility means collection may terminate at any time. Cannot determine if recovered documents represent the actual plan or one of several options being considered.' },
    },
    fusionKey: ['HUMINT walk-in + SIGINT pattern surge + CYBER recovered documents = convergent indicators of active plotting', 'OSINT propaganda shift provides strategic context for operational reporting', 'GEOINT adds minimal value for urban CT — resources better allocated elsewhere', 'MASINT has no applicable collection capability for this PIR'],
    expertFeedback: {
      optimal: 'Excellent collection strategy for a counterterrorism PIR. HUMINT provides the human dimension — intentions, planning details, identities. SIGINT captures the communications signature of pre-operational activity. CYBER yields digital artifacts and metadata that corroborate both HUMINT and SIGINT. OSINT provides the open-source context layer. This combination maximizes coverage while avoiding the low-yield disciplines (GEOINT/MASINT) for this target type.',
      good: 'Good strategy with solid coverage of the key disciplines. For CT requirements, the human and digital dimensions are paramount. Review whether your selection captures both the intentions (HUMINT) and the technical communications/digital artifacts (SIGINT/CYBER).',
      weak: 'Your collection strategy misses critical disciplines for a CT requirement. Terrorist planning is fundamentally a human activity — HUMINT and SIGINT are essential. CYBER provides the digital forensics layer. OSINT gives context. Disciplines focused on physical signatures (GEOINT, MASINT) have limited utility for urban CT operations.'
    },
  },
  {
    id: 'PIR3',
    title: 'Military Invasion Preparation',
    classification: 'TOP SECRET // SI // NOFORN',
    pir: 'Is Country Z preparing a military invasion of its neighbor?',
    context: 'Country Z has conducted three "snap military exercises" near its border in the past 6 months. Each exercise involved larger force deployments than the last. Diplomatic engagement has failed to produce de-escalation. NATO allies are requesting intelligence support for contingency planning. Theater commander requires a collection-informed assessment within 96 hours.',
    optimalInts: ['GEOINT', 'SIGINT', 'OSINT', 'HUMINT'],
    intReturns: {
      HUMINT: { confidence: 'MODERATE', classification: 'TOP SECRET // HCS-O // NOFORN', source: 'CIA/DIA HUMINT, Source GRANITE (reliability B, information 2)', report: 'Source GRANITE, a mid-level official in Country Z\'s defense ministry, reports that a "special planning group" has been established outside normal military command channels, reporting directly to the head of state. GRANITE has not been briefed into the group but learned of its existence through a colleague. The group is allegedly developing "contingency options for the southern border scenario." GRANITE separately reports that military leave has been cancelled for three brigades and that field hospitals are being pre-positioned — both indicators that were absent during previous exercises. CAVEAT: GRANITE does not have direct access to the planning group. "Contingency options" could range from coercive diplomacy to full invasion. GRANITE\'s information on leave cancellation and hospital pre-positioning is corroborated by SIGINT.', gaps: 'Cannot determine decision-maker intent. GRANITE lacks access to the inner circle. Need higher-level source for strategic intentions.' },
      SIGINT: { confidence: 'HIGH', classification: 'TOP SECRET // SI // REL FVEY', source: 'NSA SIGINT Analysis, European Theater', report: 'Electronic order of battle (EOB) analysis shows: (1) Three armored brigades have moved from garrison to forward assembly areas within 50km of the border, (2) Air defense radar emissions indicate SA-400 batteries repositioned to provide coverage over the border region, (3) Military logistics communications reference "Phase 2 supply allocation" using terminology not seen in previous exercises, (4) Encrypted strategic communications between the general staff and field commanders increased 800% in 72 hours — the highest level since Country Z\'s last military intervention 8 years ago. CAVEAT: Force movements are consistent with either exercise escalation or invasion preparation. The distinguishing indicator — bridging equipment deployment — has not yet been detected.', gaps: 'Cannot determine political decision to invade from military communications alone. Need HUMINT for leadership intent. Bridging equipment detection would be a high-confidence invasion indicator — tasking GEOINT for this.' },
      GEOINT: { confidence: 'HIGH', classification: 'SECRET // REL NATO', source: 'NGA/Allied GEOINT Fusion Cell', report: 'Multi-source imagery analysis confirms: (1) Three armored brigade tactical groups (BTGs) in forward assembly areas with full combat loads, (2) Field hospital deployment at 3 locations — NOT present in previous exercises, (3) POL (petroleum/oil/lubricant) storage pre-positioned at volumes exceeding exercise requirements by 400%, (4) Engineering equipment including pontoon bridging assets moving toward two river crossing points, (5) Rail transport of additional ammunition from strategic reserves — 47 railcar loads identified in 72 hours. Change detection shows force posture has transitioned from "exercise" to "pre-assault" configuration based on historical pattern matching from 2014 and 2008 precedents. CAVEAT: Country Z could still pull back. Deployment alone does not confirm decision to attack. However, the logistical indicators (hospitals, POL, ammunition) exceed any plausible exercise scenario.', gaps: 'Cannot determine D-day timing. Need SIGINT for execute orders. Need HUMINT for political decision confirmation. Weather/cloud cover limited collection windows by 30% this week.' },
      OSINT: { confidence: 'MODERATE', classification: 'UNCLASSIFIED // REL NATO', source: 'NATO OSINT Cell / Allied Open Source Analysis', report: 'Open source indicators show: (1) State media narratives have shifted to "protection of ethnic compatriots" framing — a rhetorical precursor used before the 2014 intervention, (2) Country Z\'s legislature passed an emergency "authorization to use force abroad" resolution (publicly reported), (3) Commercial flight tracking shows military charter aircraft repositioned to forward airfields, (4) Social media from border towns shows civilian evacuation preparations and military vehicle movements on public roads filmed by residents, (5) Country Z\'s stock market dropped 4.2% on heavy selling — insider trading pattern consistent with anticipated conflict. CAVEAT: Information operations may be designed to create invasion impression without actual intent. State media framing is a necessary but not sufficient condition.', gaps: 'Open sources confirm observable indicators but cannot determine whether this is coercive posturing or genuine invasion preparation. Need classified INT to resolve ambiguity.' },
      MASINT: { confidence: 'LOW', classification: 'SECRET // NOFORN', source: 'MASINT Analysis Cell', report: 'Seismic monitoring stations detected ground vibrations consistent with heavy tracked vehicle movement along three primary road corridors toward the border. Vibration patterns match T-90 main battle tank signatures. Infrared overhead detected elevated thermal signatures at forward assembly areas consistent with armored vehicle engines being run (maintenance/readiness activity). No chemical/biological indicators detected. CAVEAT: MASINT provides confirmation of vehicle types and movement but adds limited value beyond what GEOINT and SIGINT already provide for this scenario. Collection platforms are better prioritized for the nuclear proliferation PIR.', gaps: 'MASINT is supplementary for conventional military scenarios. High-value sensors should not be diverted from WMD monitoring unless specifically directed.' },
      CYBER: { confidence: 'LOW-MODERATE', classification: 'TOP SECRET // SI // NOFORN', source: 'NSA Cyber Threat Cell', report: 'Increased cyber reconnaissance activity detected against the target country\'s government networks, power grid SCADA systems, and telecommunications infrastructure — consistent with pre-conflict cyber preparation. Attribution to Country Z\'s military intelligence cyber units (confidence: HIGH). A previously implanted access in Country Z\'s railway logistics system shows rolling stock being redirected to military-priority routes. CAVEAT: Cyber preparation could be contingency planning rather than imminent attack indicator. Country Z maintains persistent cyber access to neighboring countries as standard practice.', gaps: 'Cyber intelligence confirms preparation activities but cannot determine attack timing. Use of implanted access risks detection — must balance intelligence value against access preservation.' },
    },
    fusionKey: ['GEOINT force posture + SIGINT communications surge + HUMINT planning group = convergent invasion indicators', 'OSINT legislative authorization + media framing provides political context', 'Key distinguishing indicator: bridging equipment detected by GEOINT resolves exercise-vs-invasion ambiguity', 'MASINT and CYBER provide supplementary confirmation but are not primary disciplines for conventional military scenarios'],
    expertFeedback: {
      optimal: 'Textbook collection strategy for an indications and warning (I&W) requirement. GEOINT provides the physical evidence of force deployment — the backbone of any military assessment. SIGINT captures the communications surge and logistics coordination that distinguish real preparation from exercise. OSINT provides the publicly observable political and economic indicators. HUMINT adds the intentions dimension that technical collection cannot reach. This four-INT combination is exactly what the IC used successfully in analogous historical cases.',
      good: 'Solid approach with good coverage. For I&W of military action, the physical evidence (GEOINT) and communications (SIGINT) are essential. Consider whether your selection captures the political intentions dimension (HUMINT) and the open-source context layer (OSINT) that policymakers need.',
      weak: 'Your collection strategy has gaps for a conventional military I&W requirement. GEOINT and SIGINT are the foundational disciplines — they provide the force posture and communications indicators. Without HUMINT, you lack the intentions dimension. Without OSINT, you miss the publicly observable political indicators that policymakers can discuss in unclassified settings.'
    },
  },
  {
    id: 'PIR4',
    title: 'Cyber Offensive Capabilities',
    classification: 'TOP SECRET // SI // REL FVEY',
    pir: 'What is the current status of Country W\'s cyber offensive capabilities?',
    context: 'Country W has been attributed to three major cyber operations in the past 18 months targeting critical infrastructure in allied nations. The NSC Cyber Directorate is developing a deterrence strategy and requires an updated assessment of Country W\'s cyber order of battle, capability maturity, and operational tempo.',
    optimalInts: ['CYBER', 'SIGINT', 'HUMINT', 'OSINT'],
    intReturns: {
      HUMINT: { confidence: 'MODERATE', classification: 'TOP SECRET // HCS-O // NOFORN', source: 'DIA HUMINT Reporting, Source TUNGSTEN (reliability B, information 2)', report: 'Source TUNGSTEN, a former contractor for Country W\'s signals intelligence directorate, reports that Country W has reorganized its cyber operations into three directorates: (1) offensive operations targeting foreign governments, (2) economic espionage targeting technology sectors, and (3) influence operations via social media manipulation. TUNGSTEN estimates 6,000-8,000 personnel across the three directorates. Separately, TUNGSTEN reports that Country W has invested heavily in zero-day vulnerability research, maintaining a stockpile of "at least 15-20 unpatched exploits at any given time." CAVEAT: TUNGSTEN left Country W\'s service 14 months ago. Organizational details may have changed. Numerical estimates are TUNGSTEN\'s assessments, not documented figures.', gaps: 'Source information is 14 months old. Cannot confirm current organizational structure or capability improvements since departure. Need CYBER/SIGINT for current operational picture.' },
      SIGINT: { confidence: 'HIGH', classification: 'TOP SECRET // SI // REL FVEY', source: 'NSA TAO / Cyber Threat Intelligence Integration Center', report: 'SIGINT collection on Country W\'s cyber infrastructure identifies: (1) 47 active command-and-control (C2) servers attributed to Country W\'s offensive units (HIGH confidence), (2) Three new malware families deployed in the last 6 months — designated GHOSTPIPE, SHADOWLATCH, and IRONTHREAD — with capabilities including firmware-level persistence, air-gap bridging, and supply chain injection, (3) Operational tempo has increased 25% year-over-year based on observed intrusion attempts against allied networks, (4) Country W operators are increasingly using living-off-the-land techniques to evade detection. CAVEAT: Attribution is based on infrastructure overlap and TTP consistency. Country W uses false-flag operations to complicate attribution. Some activity may be criminal rather than state-directed.', gaps: 'Cannot fully assess Country W\'s defensive cyber capabilities. Offensive collection reveals tools and techniques but not strategic doctrine or escalation thresholds. Need HUMINT for doctrine/intent.' },
      GEOINT: { confidence: 'LOW', classification: 'SECRET // REL FVEY', source: 'NGA Infrastructure Analysis', report: 'Satellite imagery of known Country W cyber facilities shows: (1) Expansion of a suspected cyber operations center — new wing under construction with significant power infrastructure, (2) Vehicle traffic analysis shows 24/7 operations at three facilities (shift change patterns), (3) New fiber optic cable installation connecting military and civilian telecommunications infrastructure. CAVEAT: GEOINT can identify facilities and infrastructure but cannot determine what cyber operations are being conducted inside them. Physical analysis provides order-of-battle context but not capability assessment.', gaps: 'GEOINT is supplementary for cyber requirements. Cannot observe digital operations from overhead imagery. Better suited to identifying facilities than assessing capabilities.' },
      OSINT: { confidence: 'MODERATE', classification: 'SECRET // REL FVEY', source: 'OSINT Analysis Cell / Mandiant / CrowdStrike Open Reporting', report: 'Commercial threat intelligence firms have published extensive analysis of Country W\'s cyber operations: (1) Mandiant tracks 4 distinct APT groups attributed to Country W with differing target profiles, (2) Academic research from Country W\'s universities shows active publication in offensive security techniques (exploit development, post-exploitation frameworks), (3) Country W\'s government has publicly announced a "cyber sovereignty" doctrine and created a dedicated "Strategic Support Force" for information warfare, (4) Dark web monitoring shows Country W-linked actors purchasing zero-day exploits for industrial control systems. CAVEAT: Commercial threat intelligence has attribution confidence variance. Some APT group delineation may be organizational or tooling differences rather than distinct units. Government announcements may overstate or understate actual capabilities.', gaps: 'Open sources provide excellent context but cannot access classified capabilities. Commercial intel provides TTP analysis but not strategic intent or future capability trajectory.' },
      MASINT: { confidence: 'NOT APPLICABLE', classification: 'SECRET // NOFORN', source: 'MASINT Requirements Cell', report: 'MASINT has minimal applicability to assessing cyber capabilities. Electromagnetic emissions from known facilities have been collected but provide no actionable intelligence on cyber operations conducted within those facilities. MASINT platforms are not optimized for digital/cyber intelligence requirements. CAVEAT: MASINT collection against this PIR would divert expensive technical platforms from higher-yield requirements (WMD monitoring, conventional military I&W).', gaps: 'MASINT is not a productive discipline for cyber capability assessment. Resources should be allocated to SIGINT, CYBER, HUMINT, and OSINT.' },
      CYBER: { confidence: 'HIGH', classification: 'TOP SECRET // SI // NOFORN', source: 'NSA/CSS Cyber Operations Division', report: 'Direct observation of Country W\'s cyber operations provides the most granular assessment: (1) Reverse engineering of GHOSTPIPE malware reveals sophisticated anti-forensics and a modular architecture allowing rapid capability updates, (2) Observed intrusion operations demonstrate advanced tradecraft: multi-hop infrastructure, timestomping, credential harvesting at scale, (3) Country W has compromised at least 3 managed service providers (MSPs) to achieve supply-chain access to hundreds of downstream targets, (4) Defensive assessment: Country W\'s own networks have significant vulnerabilities in legacy systems, but critical military/intelligence networks are hardened, (5) Capability trajectory: Country W is investing in AI-assisted vulnerability discovery and automated exploitation tools. CAVEAT: Our observation capability depends on accesses that Country W is actively trying to identify and close. Collection sustainability is assessed as 6-12 months before significant access degradation.', gaps: 'Cannot fully assess classified programs that do not touch networks we can observe. Defensive capability assessment is incomplete. Need HUMINT for strategic doctrine and escalation policy.' },
    },
    fusionKey: ['CYBER direct observation + SIGINT infrastructure mapping = comprehensive technical picture', 'HUMINT provides organizational structure and insider perspective on capability investments', 'OSINT commercial threat intel provides shareable layer for allied coordination', 'GEOINT/MASINT have minimal applicability — avoid diverting collection resources'],
    expertFeedback: {
      optimal: 'Excellent strategy for a cyber capability assessment. CYBER provides the direct technical observation of adversary tools, techniques, and infrastructure. SIGINT maps the communications and C2 architecture. HUMINT adds the organizational and doctrinal dimension that technical collection cannot reach. OSINT leverages the robust commercial threat intelligence ecosystem. This combination gives you the full picture: technical capabilities (CYBER/SIGINT), organizational capacity (HUMINT), and context (OSINT).',
      good: 'Good selection with strong coverage. For cyber capability assessment, CYBER and SIGINT are the foundational disciplines. Consider whether your remaining selections capture the human/organizational dimension (HUMINT) and the shareable context layer (OSINT).',
      weak: 'Your collection strategy misses key disciplines for cyber assessment. CYBER and SIGINT provide the technical foundation — without them, you cannot assess actual capabilities. HUMINT and OSINT round out the organizational and contextual picture. GEOINT and MASINT have minimal applicability to cyber requirements.'
    },
  },
  {
    id: 'PIR5',
    title: 'Foreign Espionage Operations',
    classification: 'TOP SECRET // HCS-O // SI // NOFORN',
    pir: 'Is a foreign intelligence service conducting espionage operations against our technology sector?',
    context: 'Three defense contractors have reported suspicious insider incidents in the past year. An FBI investigation uncovered a foreign national with ties to a foreign intelligence service (FIS) working at a semiconductor company. The DNI has directed a cross-community assessment of the scope of the threat.',
    optimalInts: ['CYBER', 'HUMINT', 'SIGINT', 'MASINT'],
    intReturns: {
      HUMINT: { confidence: 'HIGH', classification: 'TOP SECRET // HCS-P // NOFORN', source: 'FBI CI Division / CIA Counterintelligence', report: 'Three converging HUMINT streams: (1) FBI investigation of the semiconductor company insider reveals the subject was recruited by the FIS during graduate studies abroad and tasked with acquiring chip fabrication process documentation, (2) A CIA source within the FIS reports that the service has a dedicated "Science and Technology Acquisition" division with 200+ officers targeting Western technology companies, (3) A defector from the FIS (2 years ago) provided a partial list of technology acquisition priorities — 7 of 12 items match technologies held by the three affected defense contractors. CAVEAT: FBI investigation is ongoing — premature disclosure could compromise the case. CIA source reporting is 6 months old. Defector information is 2 years old and priorities may have evolved.', gaps: 'Cannot determine full scope of FIS operations from these three sources alone. Need CYBER/SIGINT to map the digital dimension of the espionage campaign.' },
      SIGINT: { confidence: 'MODERATE-HIGH', classification: 'TOP SECRET // SI // NOFORN', source: 'NSA Counterintelligence SIGINT Cell', report: 'Communications analysis of the known FIS officer linked to the semiconductor insider reveals: (1) Contact with 7 additional individuals in the U.S. technology sector via encrypted messaging apps, (2) Regular communication with FIS headquarters using a covert communication system previously identified by NSA, (3) Metadata analysis suggests a handler-agent relationship with at least 3 of the 7 contacts based on communication patterns (regular schedules, short duration, post-meeting check-ins), (4) Separately, SIGINT detected the FIS discussing "Operation [CODENAME]" which references "technology transfer" and "the American program." CAVEAT: Encrypted content is inaccessible. Handler-agent assessment is based on pattern analysis, not content. The 7 additional contacts could be legitimate professional relationships.', gaps: 'Cannot confirm espionage activity from communications patterns alone. Need HUMINT/FBI to identify and assess the 7 additional contacts. Need CYBER to examine digital exfiltration indicators.' },
      GEOINT: { confidence: 'LOW', classification: 'SECRET // NOFORN', source: 'NGA / FBI Surveillance Support', report: 'Geospatial analysis supported FBI surveillance operations: tracked FIS officer movements showing regular visits to technology corridor locations and meetings at locations consistent with operational tradecraft (counter-surveillance routes, brief stops at hotels). No anomalous activity observed at the FIS diplomatic facility. CAVEAT: GEOINT provides surveillance support but cannot determine the content of meetings or the nature of relationships. Urban surveillance is human-intensive and GEOINT adds marginal value.', gaps: 'GEOINT is a support function for this PIR, not a primary collection discipline. Cannot detect digital espionage, insider threats, or technology transfer from overhead imagery.' },
      OSINT: { confidence: 'LOW-MODERATE', classification: 'UNCLASSIFIED // FOUO', source: 'OSINT Analysis Cell, NCSC', report: 'Open source research reveals: (1) The FIS\'s home country has published a national technology acquisition strategy listing 10 priority technology areas — 6 overlap with known defense contractor capabilities, (2) Academic exchange programs between the FIS\'s home country and U.S. universities have increased 200% in targeted STEM fields, (3) Patent filings by the FIS\'s home country in semiconductor technology show a suspicious acceleration in sophistication that may indicate access to proprietary research, (4) LinkedIn analysis shows a pattern of the FIS\'s nationals taking positions at U.S. tech companies matching acquisition priority areas. CAVEAT: Academic and professional exchange is legal and mostly benign. Cannot distinguish legitimate scholarship from intelligence operations using open sources alone.', gaps: 'OSINT provides strategic context but cannot identify specific espionage operations. Legal professional activity is indistinguishable from intelligence cover using only open sources.' },
      MASINT: { confidence: 'MODERATE', classification: 'TOP SECRET // SI // NOFORN', source: 'MASINT Technical Analysis / NSA TEMPEST Program', report: 'TEMPEST (emanations security) assessment of the three affected defense contractors revealed: (1) Electromagnetic emanations from two facilities were detectable at ranges that would allow interception from nearby locations, (2) A technical survey of the building adjacent to one contractor (leased to a company linked to the FIS) found equipment consistent with TEMPEST collection (wideband receivers, signal processing equipment, directional antennas), (3) RF analysis confirmed that classified processing equipment at one contractor produced exploitable emanations through a window-facing wall. CAVEAT: TEMPEST vulnerability does not prove exploitation occurred. Equipment found in adjacent building could have legitimate commercial purposes. Technical assessment is based on capability analysis, not observed collection.', gaps: 'Cannot confirm actual intelligence collection from TEMPEST analysis alone. Need CYBER/HUMINT to confirm whether intercepted emanations were processed and transmitted to the FIS.' },
      CYBER: { confidence: 'HIGH', classification: 'TOP SECRET // SI // NOFORN', source: 'NSA/FBI Joint Cyber Counterintelligence Cell', report: 'Digital forensics across the three affected defense contractors revealed: (1) Advanced persistent threat (APT) activity attributed to the FIS (HIGH confidence) on all three networks, (2) Data exfiltration of 2.4TB of controlled technical data over 14 months using a custom implant that mimicked legitimate cloud backup traffic, (3) The insider at the semiconductor company was used to install a hardware implant on an air-gapped development network — providing persistent access that bypassed all network security, (4) Supply chain compromise: a software update from a common vendor used by all three contractors was trojanized to establish initial access, (5) Attribution links the APT infrastructure to the same FIS cyber unit identified by SIGINT. CAVEAT: Full scope of exfiltration is unknown — 2.4TB is confirmed but the actual total may be larger. Hardware implant recovery is needed for complete forensic analysis.', gaps: 'Cannot determine what the FIS has done with the exfiltrated data. Need HUMINT for assessment of how stolen technology is being integrated into adversary programs.' },
    },
    fusionKey: ['CYBER forensics + HUMINT insider investigation + SIGINT handler communications = comprehensive espionage picture', 'MASINT TEMPEST finding adds a unique collection vector that other INTs cannot detect', 'OSINT provides strategic context on national technology acquisition priorities', 'GEOINT adds minimal value — espionage detection is a digital/human problem'],
    expertFeedback: {
      optimal: 'Outstanding collection strategy for a counterintelligence requirement. CYBER reveals the digital dimension — the actual exfiltration, implants, and supply chain compromise. HUMINT provides the human network — the insider, the handler, the FIS organizational structure. SIGINT maps the communications between handler and agents. MASINT contributes a unique finding — the TEMPEST exploitation vector — that no other discipline could detect. This is a sophisticated four-INT approach that covers both the digital and human dimensions of a modern espionage campaign.',
      good: 'Strong strategy. For an espionage assessment, the key dimensions are digital (CYBER), human (HUMINT), and communications (SIGINT). Consider whether your fourth selection provides a unique intelligence perspective that the others cannot replicate.',
      weak: 'Your collection strategy misses critical disciplines for counterintelligence. Modern espionage operates across digital (CYBER) and human (HUMINT) domains simultaneously. SIGINT maps the handler-agent communications. Without these three, you cannot assess the scope of the operation. MASINT adds the TEMPEST dimension, while GEOINT and OSINT provide limited value for detecting active espionage.'
    },
  },
];

// ── Skills & Provenance ─────────────────────────────────────
const CO_SKILLS = [
  'Multi-INT Fusion', 'Collection Management', 'ICD-203 Compliance',
  'All-Source Analysis', 'INT Tradecraft', 'PIR Development',
  'Source Evaluation', 'Confidence Assessment', 'Collection Gaps Analysis',
];

const CO_PROVENANCE = [
  { label: 'ICD-203', note: 'Analytic Standards' },
  { label: 'IRTPA 2004', note: 'Intelligence Reform and Terrorism Prevention Act' },
  { label: 'Lowenthal', note: 'Intelligence: From Secrets to Policy (9th ed.)' },
  { label: 'Clark', note: 'Intelligence Collection (2nd ed.)' },
  { label: 'EO 12333', note: 'United States Intelligence Activities' },
];

const CO_MODES = [
  { id: 'mission', label: 'Mission', icon: '\u{1F3AF}' },
  { id: 'review', label: 'Review', icon: '\u{1F4CA}' },
  { id: 'tradecraft', label: 'Tradecraft', icon: '\u{1F4D6}' },
  { id: 'coverage', label: 'Coverage', icon: '\u{1F5FA}' },
];

// ── INT Coverage Overlay Data ──────────────────────────────
const INT_COVERAGE = [
  { id: 'humint', label: 'HUMINT', color: '#cc6030', description: 'Human intelligence: agents in specific locations. Point coverage, high value, high risk.', coverage: 'point', locations: [[120,180],[250,220],[180,350]], radius: 30 },
  { id: 'sigint', label: 'SIGINT', color: '#30a0cc', description: 'Signals intelligence: intercepting communications. Broad coverage of electromagnetic spectrum, constrained by antenna placement.', coverage: 'arc', locations: [[80,100],[350,150]], radius: 120, arc: 90 },
  { id: 'geoint', label: 'GEOINT', color: '#50a050', description: 'Geospatial intelligence: satellite imagery. Wide-area coverage but dependent on orbit timing and weather.', coverage: 'stripe', locations: [[0,80],[0,240]], width: 400, height: 60 },
  { id: 'masint', label: 'MASINT', color: '#a050a0', description: 'Measurement & signature intelligence: detecting emissions, nuclear, chemical. Specialized sensors at fixed sites.', coverage: 'point', locations: [[200,120],[300,300]], radius: 50 },
  { id: 'osint', label: 'OSINT', color: '#a0a050', description: 'Open source intelligence: publicly available information. Covers population centers, limited in denied areas.', coverage: 'area', locations: [[100,150,150,200],[220,180,120,160]], radius: 0 },
  { id: 'cyber', label: 'CYBER', color: '#cc5050', description: 'Cyber intelligence: network exploitation. Covers digital infrastructure, not physical terrain.', coverage: 'network', locations: [[150,200],[250,180],[200,320],[300,250]], radius: 0 },
];

// ── Fusion assessment options for each PIR ────────────────────
const FUSION_OPTIONS = {
  PIR1: [
    { id: 'A', text: 'Country X is almost certainly developing a clandestine nuclear weapons program. Convergent evidence from multiple INTs — facility construction, isotopic detection, procurement intercepts, and human source reporting — indicates an active enrichment program beyond declared civilian needs. Confidence: HIGH.', quality: 'excellent' },
    { id: 'B', text: 'Country X is probably conducting undeclared nuclear enrichment activities, but the evidence does not yet confirm a weapons program specifically. LEU enrichment could support fuel fabrication research. Additional collection is needed to determine enrichment levels and weapons intent. Confidence: MODERATE.', quality: 'good' },
    { id: 'C', text: 'Country X may be developing nuclear capabilities, but we cannot rule out peaceful purposes. The construction could be for civilian energy research. More evidence is needed before making a judgment. Confidence: LOW.', quality: 'poor' },
  ],
  PIR2: [
    { id: 'A', text: 'Group Y is actively planning an attack against a European target, likely within the next 90 days. Convergent indicators from HUMINT, SIGINT, CYBER, and OSINT indicate operational planning is underway targeting transportation infrastructure. The specific city has been identified across multiple INT streams. Confidence: MODERATE (would be HIGH with corroboration of walk-in source). Confidence: MODERATE.', quality: 'excellent' },
    { id: 'B', text: 'Group Y has increased operational activity and rhetoric suggesting attack planning against Western targets. Specific details from a walk-in source require corroboration. Indicators are concerning but not yet definitive. Recommend elevated posture and accelerated collection. Confidence: MODERATE.', quality: 'good' },
    { id: 'C', text: 'There are some indicators that Group Y may be planning attacks, but the information is fragmentary. The walk-in source could be fabricating. Recommend continued monitoring. Confidence: LOW.', quality: 'poor' },
  ],
  PIR3: [
    { id: 'A', text: 'Country Z is almost certainly preparing for a military invasion of its neighbor. Force deployment exceeds any plausible exercise scenario — field hospitals, ammunition resupply from strategic reserves, and bridging equipment indicate genuine operational preparation. The political conditions (legislative authorization, media framing) are set. Decision timing remains uncertain but preparation is assessed as largely complete. Confidence: HIGH.', quality: 'excellent' },
    { id: 'B', text: 'Country Z has deployed forces in a configuration consistent with invasion preparation, but the deployment could also represent coercive posturing designed to extract diplomatic concessions. Key indicators (bridging equipment, strategic ammunition draws) suggest genuine preparation, but the political decision to invade has not been confirmed. Confidence: MODERATE-HIGH.', quality: 'good' },
    { id: 'C', text: 'Country Z is conducting military exercises near the border that are larger than previous exercises. The situation is concerning but exercises have ended peacefully before. Recommend continued monitoring. Confidence: MODERATE.', quality: 'poor' },
  ],
  PIR4: [
    { id: 'A', text: 'Country W possesses advanced and rapidly maturing cyber offensive capabilities organized across three directorates with an estimated 6,000-8,000 personnel. Current capabilities include sophisticated custom malware, supply chain compromise techniques, and living-off-the-land tradecraft. Operational tempo is increasing 25% year-over-year. Country W is investing in AI-assisted tools that will further enhance capability. Confidence: HIGH.', quality: 'excellent' },
    { id: 'B', text: 'Country W has significant cyber offensive capabilities evidenced by multiple attributed operations and identified malware families. The organizational structure and personnel estimates rely on somewhat dated HUMINT. Technical capabilities are well-documented through CYBER and SIGINT. Capability trajectory is upward. Confidence: MODERATE-HIGH.', quality: 'good' },
    { id: 'C', text: 'Country W appears to have growing cyber capabilities based on attributed operations. However, attribution is challenging and some activity may be criminal rather than state-directed. Recommend continued monitoring. Confidence: MODERATE.', quality: 'poor' },
  ],
  PIR5: [
    { id: 'A', text: 'A foreign intelligence service is conducting a multi-vector espionage campaign against our technology sector. The campaign combines human intelligence operations (insider recruitment), cyber exploitation (APT intrusions, supply chain compromise, hardware implants), and technical collection (TEMPEST). At least three defense contractors are confirmed compromised with 2.4TB+ of controlled data exfiltrated. The scope is likely larger than currently identified. Confidence: HIGH.', quality: 'excellent' },
    { id: 'B', text: 'The FIS is conducting espionage operations targeting U.S. technology companies through both human and cyber means. The confirmed insider case and APT activity indicate a coordinated campaign. Full scope remains undetermined. Additional investigation needed to identify other potential insiders and compromised entities. Confidence: MODERATE-HIGH.', quality: 'good' },
    { id: 'C', text: 'There are indicators of foreign intelligence interest in our technology sector, including one confirmed insider case. Cyber activity attributed to the FIS has been detected. The connection between the human and cyber operations is not yet firmly established. Confidence: MODERATE.', quality: 'poor' },
  ],
};

// ── Helper: score INT selection ───────────────────────────────
function scoreIntSelection(selected, optimal) {
  const overlap = selected.filter(i => optimal.includes(i)).length;
  const wasted = selected.filter(i => !optimal.includes(i)).length;
  if (overlap === 4 && wasted === 0) return 'optimal';
  if (overlap >= 3) return 'good';
  return 'weak';
}

// ══════════════════════════════════════════════════════════════
// ── Scholarly Micro-Content ────────────────────────────────────
const CO_TIPS = {
  humint: "HUMINT (Human Intelligence) is the oldest and most politically sensitive INT. Running a human source requires a case officer to spot, assess, develop, recruit, handle, and eventually terminate the relationship. The recruitment cycle can take years. The ethical weight is real \u2014 you are asking someone to betray their country, often at risk of imprisonment or death. The Soviets called their recruited agents 'agents' but the people who recruited them 'illegals' \u2014 a linguistic distinction that reveals which side bears the moral burden.",
  sigint: "SIGINT (Signals Intelligence) intercepts and analyzes electronic communications and emissions. NSA processes billions of communications daily. The legal framework (FISA, EO 12333, Section 702) creates different rules for foreign targets, domestic targets, and US persons incidentally collected. The Snowden revelations (2013) exposed the scale of bulk collection programs and triggered the most significant reform of IC authorities since the Church Committee (1975).",
  geoint: "GEOINT (Geospatial Intelligence) includes imagery intelligence (IMINT) and geospatial information. The 1962 Cuban Missile Crisis was resolved partly by U-2 imagery showing Soviet MRBM sites under construction. Modern commercial satellite imagery (Maxar, Planet) has democratized GEOINT \u2014 open-source analysts can now track military movements that were once classified. The Bellingcat investigation of MH17 used commercial imagery to track the BUK missile launcher from Russia into Ukraine and back.",
  masint: "MASINT (Measurement and Signatures Intelligence) detects nuclear tests (seismic), missile launches (infrared), submarine movements (acoustic), and chemical weapons (spectral). It's the least-known INT but arguably the most technically sophisticated. The Comprehensive Nuclear-Test-Ban Treaty verification system relies on a global network of 337 MASINT stations detecting seismic, hydroacoustic, infrasound, and radionuclide signatures.",
  osint: "OSINT (Open Source Intelligence) was once dismissed as 'just reading newspapers.' Now it's the foundation layer for all other INTs. The IC estimates that 80-90% of intelligence can be derived from open sources. The challenge isn't access \u2014 it's curation. A single day's social media output exceeds the entire Library of Congress. The analytical skill is knowing what to ignore, not what to collect.",
};

// Component
// ══════════════════════════════════════════════════════════════
function COAnalysisView({ setView }) {
  const [mode, setMode] = useState('mission');
  const [selectedPIR, setSelectedPIR] = useState(null);
  const [taskedInts, setTaskedInts] = useState([]);
  const [missionPhase, setMissionPhase] = useState('select_pir'); // select_pir | task_ints | collect | fuse | debrief
  const [selectedFusion, setSelectedFusion] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [expandedInt, setExpandedInt] = useState(null);
  const [tradecraftCard, setTradecraftCard] = useState(null);
  const [covActiveInts, setCovActiveInts] = useState({ humint: true, sigint: true, geoint: false, masint: false, osint: false, cyber: false });
  const [covShowGaps, setCovShowGaps] = useState(false);
  const [covSelectedDesc, setCovSelectedDesc] = useState(null);
  const [tipId, setTipId] = useState(null);

  const C = CO_C;

  // Scholarly tooltip renderer
  var TipBox = function(key) {
    if (tipId !== key) return null;
    return React.createElement('div', { style: { padding: '10px 14px', background: 'rgba(6,11,10,.94)', border: '1px solid rgba(42,184,154,.12)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(184,208,200,.7)', lineHeight: 1.65, margin: '6px 0 10px' } }, CO_TIPS[key]);
  };

  // SVG micro-icons for scholarly tooltips
  var SilhouetteIcon = React.createElement('svg', { width: 18, height: 22, viewBox: '0 0 18 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'humint' ? null : 'humint'); } },
    React.createElement('circle', { cx: 9, cy: 6, r: 4, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M2 20 Q2 14 9 14 Q16 14 16 20', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' })
  );

  var AntennaIcon = React.createElement('svg', { width: 22, height: 20, viewBox: '0 0 22 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'sigint' ? null : 'sigint'); } },
    React.createElement('line', { x1: 11, y1: 18, x2: 11, y2: 8, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M6 6 Q11 2 16 6', fill: 'none', stroke: 'currentColor', strokeWidth: '.7' }),
    React.createElement('path', { d: 'M4 3 Q11 -2 18 3', fill: 'none', stroke: 'currentColor', strokeWidth: '.5' }),
    React.createElement('circle', { cx: 11, cy: 8, r: 1.5, fill: 'currentColor', fillOpacity: '.3' })
  );

  var SatelliteIcon = React.createElement('svg', { width: 22, height: 22, viewBox: '0 0 22 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'geoint' ? null : 'geoint'); } },
    React.createElement('rect', { x: 7, y: 7, width: 8, height: 8, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 3, y1: 5, x2: 7, y2: 7, stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('line', { x1: 3, y1: 1, x2: 3, y2: 5, stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('line', { x1: 15, y1: 15, x2: 19, y2: 17, stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('line', { x1: 19, y1: 17, x2: 19, y2: 21, stroke: 'currentColor', strokeWidth: '.6' })
  );

  var SensorIcon = React.createElement('svg', { width: 22, height: 20, viewBox: '0 0 22 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'masint' ? null : 'masint'); } },
    React.createElement('path', { d: 'M2 14 L6 14 L8 6 L10 16 L12 4 L14 14 L16 10 L18 14 L20 14', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 11, cy: 3, r: 2, fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('line', { x1: 11, y1: 5, x2: 11, y2: 8, stroke: 'currentColor', strokeWidth: '.5', strokeDasharray: '1 1' })
  );

  var GlobeMagIcon = React.createElement('svg', { width: 22, height: 22, viewBox: '0 0 22 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'osint' ? null : 'osint'); } },
    React.createElement('circle', { cx: 10, cy: 10, r: 7, fill: 'none', stroke: 'currentColor', strokeWidth: '.7' }),
    React.createElement('ellipse', { cx: 10, cy: 10, rx: 3, ry: 7, fill: 'none', stroke: 'currentColor', strokeWidth: '.4' }),
    React.createElement('line', { x1: 3, y1: 10, x2: 17, y2: 10, stroke: 'currentColor', strokeWidth: '.4' }),
    React.createElement('line', { x1: 15, y1: 15, x2: 20, y2: 20, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 20, cy: 20, r: 1, fill: 'currentColor', fillOpacity: '.3' })
  );

  // Toggle INT tasking (max 4)
  const toggleInt = useCallback((intId) => {
    setTaskedInts(prev => {
      if (prev.includes(intId)) return prev.filter(i => i !== intId);
      if (prev.length >= 4) return prev;
      return [...prev, intId];
    });
  }, []);

  const pir = useMemo(() => PIR_SCENARIOS.find(p => p.id === selectedPIR), [selectedPIR]);
  const grade = useMemo(() => {
    if (!pir || taskedInts.length !== 4) return null;
    return scoreIntSelection(taskedInts, pir.optimalInts);
  }, [pir, taskedInts]);
  const feedback = useMemo(() => {
    if (!pir || !grade) return null;
    return pir.expertFeedback[grade];
  }, [pir, grade]);

  // ── Shared styles (SCIF aesthetic) ────────────────────────
  const sCard = useMemo(() => ({
    background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 2, padding: 20, marginBottom: 16,
    boxShadow: '0 1px 8px rgba(0,0,0,.3), inset 0 1px 0 rgba(50,90,160,.06)',
  }), []);
  const sMono = { fontFamily: CO_MONO, fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase' };
  const sBtn = (active, color) => ({
    padding: '8px 16px', borderRadius: 2, cursor: 'pointer', fontSize: 12, fontFamily: CO_MONO,
    letterSpacing: '.06em', textTransform: 'uppercase',
    background: active ? (color || C.teal) : 'transparent',
    color: active ? '#000' : (color || C.tx2),
    border: `1px solid ${active ? 'transparent' : (color || C.line)}`,
    fontWeight: active ? 600 : 400, transition: 'all .2s',
  });

  // ── Reset mission ─────────────────────────────────────
  const resetMission = useCallback(() => {
    setSelectedPIR(null); setTaskedInts([]); setMissionPhase('select_pir');
    setSelectedFusion(null); setSubmitted(false); setExpandedInt(null);
  }, []);

  // ── Fusion matrix data ────────────────────────────────
  const fusionMatrix = useMemo(() => {
    if (!pir) return null;
    const gaps = ['Capabilities', 'Intentions', 'Timeline', 'Scope'];
    const rows = taskedInts.map(intId => {
      const def = INT_DEFS.find(d => d.id === intId);
      const ret = pir.intReturns[intId];
      const gapMap = {};
      gaps.forEach(g => {
        const text = (ret?.report || '').toLowerCase();
        if (g === 'Capabilities') gapMap[g] = text.includes('capabilit') || text.includes('equipment') || text.includes('enrich') || text.includes('malware') || text.includes('force') ? 'filled' : 'gap';
        else if (g === 'Intentions') gapMap[g] = text.includes('intent') || text.includes('plan') || text.includes('decision') || text.includes('accelerat') || text.includes('spectacular') ? 'partial' : 'gap';
        else if (g === 'Timeline') gapMap[g] = text.includes('days') || text.includes('months') || text.includes('week') || text.includes('hours') || text.includes('90 day') ? 'partial' : 'gap';
        else if (g === 'Scope') gapMap[g] = text.includes('scope') || text.includes('full') || text.includes('total') || text.includes('across') || text.includes('three') ? 'partial' : 'gap';
      });
      // Override some specifics based on INT type
      if (intId === 'HUMINT') { gapMap['Intentions'] = 'filled'; gapMap['Timeline'] = 'partial'; }
      if (intId === 'SIGINT') { gapMap['Capabilities'] = 'filled'; gapMap['Scope'] = 'partial'; }
      if (intId === 'GEOINT') { gapMap['Capabilities'] = 'filled'; gapMap['Scope'] = 'filled'; }
      if (intId === 'CYBER') { gapMap['Capabilities'] = 'filled'; gapMap['Scope'] = 'partial'; }
      if (intId === 'MASINT') { gapMap['Capabilities'] = 'filled'; }
      if (intId === 'OSINT') { gapMap['Scope'] = 'partial'; gapMap['Timeline'] = 'partial'; }
      return { intId, def, gapMap };
    });
    return { gaps, rows };
  }, [pir, taskedInts]);

  // ══════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: CO_SANS, padding: 0, position: 'relative' }}>
      {React.createElement(SCIFRadarSweep)}
      {React.createElement(ClassificationStrip, { text: 'TOP SECRET // SI // TK // NOFORN // REL TO FVEY', color: '#8b0000' })}
      <div style={{ maxWidth: 1020, margin: '0 auto', padding: '0 24px 32px', position: 'relative', zIndex: 1 }}>

        {/* ── Back button ──────────────────────────────── */}
        <button onClick={() => setView('home')} style={{ background: 'none', border: 'none', color: C.tx3, fontFamily: CO_MONO, fontSize: 12, letterSpacing: '.1em', cursor: 'pointer', marginBottom: 20, marginTop: 20, padding: 0 }}>
          &larr; PORTFOLIO
        </button>

        {/* ── Hero (SCIF briefing header) ────────────── */}
        <div style={{ marginBottom: 32 }}>
          {React.createElement(CableHeader, { routing: 'INAF 5613 // INTELLIGENCE COLLECTION', priority: 'FLASH' })}
          <div style={{ background: 'rgba(8,14,24,.96)', border: '1px solid rgba(50,90,160,.15)', borderTop: 'none', borderRadius: '0 0 3px 3px', padding: '24px 20px' }}>
            <h1 style={{ fontFamily: CO_MONO, fontWeight: 700, fontSize: 28, color: '#c8d0e0', margin: 0, lineHeight: 1.2, letterSpacing: '.04em', textTransform: 'uppercase' }}>
              Multi-INT Fusion Console
            </h1>
            <div style={{ width: 60, height: 2, background: C.teal, marginTop: 10, marginBottom: 14 }} />
            <p style={{ color: C.tx2, fontSize: 14, lineHeight: 1.7, marginTop: 0, maxWidth: 680 }}>
              You are a collection manager at an all-source fusion center. Receive a priority intelligence
              requirement, task the right combination of collection disciplines under budget constraints,
              evaluate partial returns, and fuse them into an all-source assessment.
            </p>
          </div>
        </div>

        {/* ── Skills tags (SCIF compartment markers) ───── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
          {CO_SKILLS.map(s => (
            <span key={s} style={{ ...sMono, fontSize: 10, color: C.teal, background: 'rgba(58,140,200,.05)', padding: '3px 10px', borderRadius: 1, border: '1px solid rgba(58,140,200,.18)', borderLeft: '3px solid rgba(58,140,200,.4)' }}>{s}</span>
          ))}
        </div>

        {/* ── Mode tabs ────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, borderBottom: `1px solid ${C.line}`, paddingBottom: 12 }}>
          {CO_MODES.map(m => (
            <button key={m.id} onClick={() => { setMode(m.id); if (m.id === 'mission') resetMission(); }} style={sBtn(mode === m.id, C.teal)}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* TRADECRAFT MODE — INT Reference Cards          */}
        {/* ═══════════════════════════════════════════════ */}
        {mode === 'tradecraft' && (
          <div>
            <h2 style={{ fontFamily: CO_MONO, fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#c8d0e0', letterSpacing: '.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(50,90,160,.2)', paddingBottom: 10 }}>CABLE // INT DISCIPLINES // REFERENCE CARDS {SilhouetteIcon}{AntennaIcon}{SatelliteIcon}{SensorIcon}{GlobeMagIcon}</h2>
            <p style={{ color: C.tx2, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
              The six collection disciplines of the U.S. Intelligence Community. Each has unique strengths,
              limitations, and doctrinal authorities. Effective collection management requires understanding
              what each INT can and cannot provide.
            </p>
            {TipBox('humint')}
            {TipBox('sigint')}
            {TipBox('geoint')}
            {TipBox('masint')}
            {TipBox('osint')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {INT_DEFS.map(d => {
                const expanded = tradecraftCard === d.id;
                return (
                  <div key={d.id} onClick={() => setTradecraftCard(expanded ? null : d.id)} style={{ ...sCard, borderLeft: `3px solid ${d.color}`, cursor: 'pointer', transition: 'all .2s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 22 }}>{d.icon}</span>
                      <div>
                        <div style={{ ...sMono, color: d.color, fontSize: 12 }}>{d.label}</div>
                        <div style={{ color: C.tx2, fontSize: 11 }}>{d.full}</div>
                      </div>
                    </div>
                    <p style={{ color: C.tx2, fontSize: 12, lineHeight: 1.6, margin: '8px 0' }}>{d.desc}</p>
                    {expanded && (
                      <div style={{ marginTop: 12, borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
                        <div style={{ marginBottom: 10 }}>
                          <div style={{ ...sMono, color: C.green, fontSize: 11, marginBottom: 4 }}>STRENGTHS</div>
                          <div style={{ color: C.tx, fontSize: 12, lineHeight: 1.65 }}>{d.strength}</div>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                          <div style={{ ...sMono, color: C.red, fontSize: 11, marginBottom: 4 }}>WEAKNESSES</div>
                          <div style={{ color: C.tx, fontSize: 12, lineHeight: 1.65 }}>{d.weakness}</div>
                        </div>
                        <div>
                          <div style={{ ...sMono, color: C.tx3, fontSize: 11, marginBottom: 4 }}>DOCTRINE</div>
                          <div style={{ color: C.tx2, fontSize: 11, fontFamily: CO_MONO }}>{d.doctrine}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* REVIEW MODE — All PIR results summary          */}
        {/* ═══════════════════════════════════════════════ */}
        {mode === 'review' && (
          <div>
            <h2 style={{ fontFamily: CO_MONO, fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#c8d0e0', letterSpacing: '.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(50,90,160,.2)', paddingBottom: 10 }}>CABLE // COLLECTION STRATEGY // REVIEW</h2>
            <p style={{ color: C.tx2, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
              For each PIR, the optimal collection strategy reflects the nature of the intelligence requirement.
              WMD requires technical signatures (MASINT/GEOINT). Terrorism requires human and digital sources (HUMINT/SIGINT/CYBER).
              Military I&W requires physical observation and communications (GEOINT/SIGINT).
            </p>
            {PIR_SCENARIOS.map(sc => (
              <div key={sc.id} style={{ ...sCard, marginBottom: 20 }}>
                <div style={{ ...sMono, color: C.teal, fontSize: 11, marginBottom: 6 }}>{sc.id} // {sc.classification}</div>
                <h3 style={{ fontFamily: CO_SANS, fontSize: 16, fontWeight: 600, color: C.tx, margin: '0 0 8px 0' }}>{sc.title}</h3>
                <p style={{ color: C.tx2, fontSize: 12, lineHeight: 1.65, marginBottom: 12 }}>{sc.pir}</p>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ ...sMono, color: C.green, fontSize: 11, marginBottom: 6 }}>OPTIMAL COLLECTION STRATEGY</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {sc.optimalInts.map(intId => {
                      const d = INT_DEFS.find(x => x.id === intId);
                      return (
                        <span key={intId} style={{ ...sMono, fontSize: 12, color: d.color, background: d.bg, padding: '4px 10px', borderRadius: 3, border: `1px solid ${d.color}33` }}>
                          {d.icon} {d.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div style={{ ...sMono, color: C.amber, fontSize: 11, marginBottom: 6 }}>FUSION KEY JUDGMENTS</div>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {sc.fusionKey.map((k, i) => (
                      <li key={i} style={{ color: C.tx2, fontSize: 11, lineHeight: 1.6, marginBottom: 4 }}>{k}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* MISSION MODE — Interactive Collection Exercise  */}
        {/* ═══════════════════════════════════════════════ */}
        {mode === 'mission' && (
          <div>
            {/* Phase indicator */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
              {['Select PIR', 'Task INTs', 'Collect', 'Fuse', 'Debrief'].map((label, i) => {
                const phases = ['select_pir', 'task_ints', 'collect', 'fuse', 'debrief'];
                const current = phases.indexOf(missionPhase);
                const isActive = i === current;
                const isDone = i < current;
                return (
                  <div key={label} style={{ flex: 1, textAlign: 'center', padding: '6px 4px', borderRadius: 3, background: isActive ? C.tealBg : isDone ? 'rgba(42,184,154,.03)' : 'transparent', border: `1px solid ${isActive ? C.teal + '44' : C.line}` }}>
                    <div style={{ ...sMono, fontSize: 12, color: isActive ? C.teal : isDone ? C.tealDm : C.tx3 }}>{label}</div>
                  </div>
                );
              })}
            </div>

            {/* ── PHASE 1: Select PIR ────────────────── */}
            {missionPhase === 'select_pir' && (
              <div>
                <h2 style={{ fontFamily: CO_MONO, fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#c8d0e0', letterSpacing: '.06em', textTransform: 'uppercase' }}>CABLE // PIR // PRIORITY INTELLIGENCE REQUIREMENTS</h2>
                <p style={{ color: C.tx2, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                  Select an incoming PIR from the National Intelligence Priorities Framework.
                  Each requires a different collection strategy. You have budget authority to task 4 of 6 disciplines.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {PIR_SCENARIOS.map(sc => (
                    <div key={sc.id} onClick={() => { setSelectedPIR(sc.id); setMissionPhase('task_ints'); }} style={{ ...sCard, cursor: 'pointer', borderLeft: `3px solid ${C.teal}`, transition: 'border-color .2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderLeftColor = C.green}
                      onMouseLeave={e => e.currentTarget.style.borderLeftColor = C.teal}>
                      <div style={{ ...sMono, color: C.teal, fontSize: 11, marginBottom: 6 }}>{sc.id} // {sc.classification}</div>
                      <h3 style={{ fontFamily: CO_SANS, fontSize: 15, fontWeight: 600, color: C.tx, margin: '0 0 6px 0' }}>{sc.title}</h3>
                      <p style={{ color: C.tx, fontSize: 13, lineHeight: 1.65, margin: '0 0 8px 0', fontStyle: 'italic' }}>"{sc.pir}"</p>
                      <p style={{ color: C.tx3, fontSize: 11, lineHeight: 1.65, margin: 0 }}>{sc.context.substring(0, 150)}...</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── PHASE 2: Task INTs ─────────────────── */}
            {missionPhase === 'task_ints' && pir && (
              <div>
                <div style={{ ...sCard, borderLeft: `3px solid ${C.amber}`, marginBottom: 24 }}>
                  <div style={{ ...sMono, color: C.amber, fontSize: 11, marginBottom: 6 }}>ACTIVE PIR // {pir.classification}</div>
                  <h3 style={{ fontFamily: CO_SANS, fontSize: 16, fontWeight: 600, color: C.tx, margin: '0 0 8px 0' }}>{pir.title}</h3>
                  <p style={{ color: C.tx, fontSize: 13, lineHeight: 1.65, fontStyle: 'italic', margin: '0 0 10px 0' }}>"{pir.pir}"</p>
                  <p style={{ color: C.tx2, fontSize: 12, lineHeight: 1.6, margin: 0 }}>{pir.context}</p>
                </div>

                <h2 style={{ fontFamily: CO_MONO, fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#c8d0e0', letterSpacing: '.06em', textTransform: 'uppercase' }}>CABLE // TASKING // COLLECTION DISCIPLINES</h2>
                <p style={{ color: C.tx2, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                  Budget constraint: you may task <strong style={{ color: C.amber }}>4 of 6</strong> disciplines.
                  Consider which INTs are best suited to answer this specific requirement.
                  Selected: <strong style={{ color: taskedInts.length === 4 ? C.green : C.amber }}>{taskedInts.length}/4</strong>
                  {SilhouetteIcon}{AntennaIcon}{SatelliteIcon}{SensorIcon}{GlobeMagIcon}
                </p>
                {TipBox('humint')}
                {TipBox('sigint')}
                {TipBox('geoint')}
                {TipBox('masint')}
                {TipBox('osint')}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 12, marginBottom: 20 }}>
                  {INT_DEFS.map(d => {
                    const selected = taskedInts.includes(d.id);
                    const disabled = !selected && taskedInts.length >= 4;
                    return (
                      <div key={d.id} onClick={() => !disabled && toggleInt(d.id)} style={{
                        ...sCard, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
                        borderLeft: `3px solid ${selected ? d.color : C.line}`,
                        background: selected ? d.bg : C.card, transition: 'all .2s',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 20 }}>{d.icon}</span>
                            <div>
                              <div style={{ ...sMono, color: selected ? d.color : C.tx2, fontSize: 11 }}>{d.label}</div>
                              <div style={{ color: C.tx3, fontSize: 12 }}>{d.full}</div>
                            </div>
                          </div>
                          <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${selected ? d.color : C.line}`, background: selected ? d.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#000', fontWeight: 700 }}>
                            {selected ? '\✓' : ''}
                          </div>
                        </div>
                        <p style={{ color: C.tx2, fontSize: 11, lineHeight: 1.65, marginTop: 8, marginBottom: 4 }}>{d.strength}</p>
                        <p style={{ color: C.tx3, fontSize: 12, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>Limitation: {d.weakness.substring(0, 80)}...</p>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => { setMissionPhase('select_pir'); setTaskedInts([]); setSelectedPIR(null); }} style={sBtn(false, C.tx3)}>
                    &larr; Back
                  </button>
                  <button onClick={() => taskedInts.length === 4 && setMissionPhase('collect')} disabled={taskedInts.length !== 4} style={{ ...sBtn(taskedInts.length === 4, C.teal), opacity: taskedInts.length === 4 ? 1 : 0.4 }}>
                    Deploy Collection &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* ── PHASE 3: Collect — INT Returns ──────── */}
            {missionPhase === 'collect' && pir && (
              <div>
                <div style={{ ...sMono, color: C.teal, fontSize: 11, marginBottom: 12 }}>COLLECTION RETURNS // {pir.classification}</div>
                <h2 style={{ fontFamily: CO_MONO, fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#c8d0e0', letterSpacing: '.06em', textTransform: 'uppercase' }}>CABLE // COLLECTION // INTELLIGENCE RETURNS</h2>
                <p style={{ color: C.tx2, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                  Your tasked disciplines have reported back. Review each return, noting confidence levels,
                  caveats, and remaining gaps. Click each INT to expand the full report.
                </p>

                {/* Fusion Matrix */}
                {fusionMatrix && (
                  <div style={{ ...sCard, marginBottom: 20, overflowX: 'auto' }}>
                    <div style={{ ...sMono, color: C.amber, fontSize: 11, marginBottom: 12 }}>FUSION MATRIX // INTELLIGENCE GAPS {SilhouetteIcon}{AntennaIcon}</div>
                    {TipBox('humint')}
                    {TipBox('sigint')}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'left', padding: '6px 10px', borderBottom: `1px solid ${C.line}`, color: C.tx3, fontFamily: CO_MONO, fontSize: 11, fontWeight: 400 }}>DISCIPLINE</th>
                          {fusionMatrix.gaps.map(g => (
                            <th key={g} style={{ textAlign: 'center', padding: '6px 10px', borderBottom: `1px solid ${C.line}`, color: C.tx3, fontFamily: CO_MONO, fontSize: 11, fontWeight: 400 }}>{g.toUpperCase()}</th>
                          ))}
                          <th style={{ textAlign: 'center', padding: '6px 10px', borderBottom: `1px solid ${C.line}`, color: C.tx3, fontFamily: CO_MONO, fontSize: 11, fontWeight: 400 }}>CONFIDENCE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fusionMatrix.rows.map(row => {
                          const ret = pir.intReturns[row.intId];
                          return (
                            <tr key={row.intId}>
                              <td style={{ padding: '8px 10px', borderBottom: `1px solid ${C.line}`, fontFamily: CO_MONO, fontSize: 12, color: row.def.color, fontWeight: 600 }}>
                                {row.def.icon} {row.def.label}
                              </td>
                              {fusionMatrix.gaps.map(g => {
                                const status = row.gapMap[g];
                                const fill = status === 'filled' ? C.green : status === 'partial' ? C.amber : C.red;
                                const label = status === 'filled' ? '\u25A0' : status === 'partial' ? '\u25A3' : '\u25A1';
                                return (
                                  <td key={g} style={{ textAlign: 'center', padding: '8px 10px', borderBottom: `1px solid ${C.line}`, color: fill, fontSize: 14 }}>
                                    {label}
                                  </td>
                                );
                              })}
                              <td style={{ textAlign: 'center', padding: '8px 10px', borderBottom: `1px solid ${C.line}`, fontFamily: CO_MONO, fontSize: 11, color: ret.confidence === 'HIGH' ? C.green : ret.confidence.includes('MODERATE') ? C.amber : C.red }}>
                                {ret.confidence}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12, color: C.tx3, fontFamily: CO_MONO }}>
                      <span><span style={{ color: C.green }}>{'\u25A0'}</span> Filled</span>
                      <span><span style={{ color: C.amber }}>{'\u25A3'}</span> Partial</span>
                      <span><span style={{ color: C.red }}>{'\u25A1'}</span> Gap</span>
                    </div>
                  </div>
                )}

                {/* Individual INT reports */}
                {taskedInts.map(intId => {
                  const d = INT_DEFS.find(x => x.id === intId);
                  const ret = pir.intReturns[intId];
                  const expanded = expandedInt === intId;
                  return (
                    <div key={intId} onClick={() => setExpandedInt(expanded ? null : intId)} style={{ ...sCard, borderLeft: `3px solid ${d.color}`, cursor: 'pointer', transition: 'all .2s' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 20 }}>{d.icon}</span>
                          <div>
                            <span style={{ ...sMono, color: d.color, fontSize: 11 }}>{d.label}</span>
                            <span style={{ color: C.tx3, fontSize: 11, marginLeft: 8 }}>{d.full}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ ...sMono, fontSize: 11, color: ret.confidence === 'HIGH' ? C.green : ret.confidence.includes('MODERATE') ? C.amber : ret.confidence === 'NOT APPLICABLE' ? C.tx3 : C.red }}>
                            {ret.confidence}
                          </span>
                          <span style={{ color: C.tx3, fontSize: 14, transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>{'\▼'}</span>
                        </div>
                      </div>

                      {expanded && (
                        <div style={{ marginTop: 14, borderTop: `1px solid ${C.line}`, paddingTop: 14 }}>
                          <div style={{ ...sMono, color: C.red, fontSize: 12, marginBottom: 8, padding: '3px 8px', background: C.redBg, display: 'inline-block', borderRadius: 2 }}>
                            {ret.classification}
                          </div>
                          <div style={{ marginBottom: 10 }}>
                            <div style={{ ...sMono, color: C.tx3, fontSize: 12, marginBottom: 4 }}>SOURCE</div>
                            <div style={{ color: C.tx2, fontSize: 11, fontFamily: CO_MONO, lineHeight: 1.65 }}>{ret.source}</div>
                          </div>
                          <div style={{ marginBottom: 10 }}>
                            <div style={{ ...sMono, color: C.tx3, fontSize: 12, marginBottom: 4 }}>REPORT</div>
                            <div style={{ color: C.tx, fontSize: 12, lineHeight: 1.7 }}>{ret.report}</div>
                          </div>
                          <div>
                            <div style={{ ...sMono, color: C.amber, fontSize: 12, marginBottom: 4 }}>COLLECTION GAPS</div>
                            <div style={{ color: C.amber, fontSize: 11, lineHeight: 1.6, fontStyle: 'italic' }}>{ret.gaps}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button onClick={() => { setMissionPhase('task_ints'); setExpandedInt(null); }} style={sBtn(false, C.tx3)}>
                    &larr; Retask
                  </button>
                  <button onClick={() => setMissionPhase('fuse')} style={sBtn(true, C.teal)}>
                    Proceed to Fusion &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* ── PHASE 4: Fuse — Write Assessment ───── */}
            {missionPhase === 'fuse' && pir && (
              <div>
                <div style={{ ...sMono, color: C.teal, fontSize: 11, marginBottom: 12 }}>ALL-SOURCE FUSION // {pir.classification}</div>
                <h2 style={{ fontFamily: CO_MONO, fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#c8d0e0', letterSpacing: '.06em', textTransform: 'uppercase' }}>CABLE // FUSION // ALL-SOURCE ASSESSMENT</h2>
                <p style={{ color: C.tx2, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                  Based on the intelligence returns from your tasked disciplines, select the assessment
                  that best represents a fused all-source judgment. Consider convergence, confidence levels,
                  caveats, and remaining gaps per ICD-203 analytic standards.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                  {(FUSION_OPTIONS[pir.id] || []).map(opt => {
                    const selected = selectedFusion === opt.id;
                    const colorMap = { excellent: C.green, good: C.amber, poor: C.red };
                    const qualColor = submitted ? colorMap[opt.quality] : C.teal;
                    return (
                      <div key={opt.id} onClick={() => !submitted && setSelectedFusion(opt.id)} style={{
                        ...sCard, cursor: submitted ? 'default' : 'pointer',
                        borderLeft: `3px solid ${selected ? qualColor : C.line}`,
                        background: selected ? (submitted ? opt.quality === 'excellent' ? C.greenBg : opt.quality === 'good' ? C.amberBg : C.redBg : C.tealBg) : C.card,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                          <div style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${selected ? qualColor : C.line}`, background: selected ? qualColor : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: selected ? '#000' : C.tx3, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                            {selected ? '\✓' : opt.id}
                          </div>
                          <div>
                            <p style={{ color: C.tx, fontSize: 12, lineHeight: 1.7, margin: 0 }}>{opt.text}</p>
                            {submitted && (
                              <div style={{ ...sMono, fontSize: 11, color: qualColor, marginTop: 8 }}>
                                {opt.quality === 'excellent' ? 'EXCELLENT — ICD-203 compliant, multi-INT convergence acknowledged, appropriate confidence level' : opt.quality === 'good' ? 'ADEQUATE — reasonable assessment but missing nuance or over/under-stating confidence' : 'INSUFFICIENT — fails to integrate available intelligence, inappropriate confidence level'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setMissionPhase('collect')} style={sBtn(false, C.tx3)}>
                    &larr; Review Returns
                  </button>
                  {!submitted ? (
                    <button onClick={() => selectedFusion && setSubmitted(true)} disabled={!selectedFusion} style={{ ...sBtn(!!selectedFusion, C.teal), opacity: selectedFusion ? 1 : 0.4 }}>
                      Submit Assessment &rarr;
                    </button>
                  ) : (
                    <button onClick={() => setMissionPhase('debrief')} style={sBtn(true, C.teal)}>
                      Proceed to Debrief &rarr;
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ── PHASE 5: Debrief ──────────────────── */}
            {missionPhase === 'debrief' && pir && (
              <div>
                <div style={{ ...sMono, color: C.teal, fontSize: 11, marginBottom: 12 }}>COLLECTION DEBRIEF // {pir.id}</div>
                <h2 style={{ fontFamily: CO_MONO, fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#c8d0e0', letterSpacing: '.06em', textTransform: 'uppercase' }}>CABLE // DEBRIEF // EXPERT FEEDBACK</h2>

                {/* Collection strategy grade */}
                <div style={{ ...sCard, borderLeft: `3px solid ${grade === 'optimal' ? C.green : grade === 'good' ? C.amber : C.red}`, marginBottom: 20 }}>
                  <div style={{ ...sMono, fontSize: 12, color: grade === 'optimal' ? C.green : grade === 'good' ? C.amber : C.red, marginBottom: 8 }}>
                    COLLECTION STRATEGY: {grade ? grade.toUpperCase() : 'N/A'}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                    <span style={{ ...sMono, fontSize: 11, color: C.tx3 }}>YOUR SELECTION:</span>
                    {taskedInts.map(intId => {
                      const d = INT_DEFS.find(x => x.id === intId);
                      const isOptimal = pir.optimalInts.includes(intId);
                      return (
                        <span key={intId} style={{ ...sMono, fontSize: 11, color: isOptimal ? d.color : C.red, background: isOptimal ? d.bg : C.redBg, padding: '2px 8px', borderRadius: 2 }}>
                          {d.icon} {d.label} {isOptimal ? '\✓' : '\✗'}
                        </span>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                    <span style={{ ...sMono, fontSize: 11, color: C.tx3 }}>OPTIMAL:</span>
                    {pir.optimalInts.map(intId => {
                      const d = INT_DEFS.find(x => x.id === intId);
                      return (
                        <span key={intId} style={{ ...sMono, fontSize: 11, color: d.color, background: d.bg, padding: '2px 8px', borderRadius: 2 }}>
                          {d.icon} {d.label}
                        </span>
                      );
                    })}
                  </div>
                  <p style={{ color: C.tx, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{feedback}</p>
                </div>

                {/* Assessment quality */}
                {selectedFusion && (
                  <div style={{ ...sCard, marginBottom: 20 }}>
                    <div style={{ ...sMono, fontSize: 12, color: C.amber, marginBottom: 8 }}>ASSESSMENT QUALITY</div>
                    {(FUSION_OPTIONS[pir.id] || []).map(opt => (
                      <div key={opt.id} style={{ padding: '8px 12px', marginBottom: 6, borderRadius: 4, background: opt.id === selectedFusion ? (opt.quality === 'excellent' ? C.greenBg : opt.quality === 'good' ? C.amberBg : C.redBg) : 'transparent', border: opt.id === selectedFusion ? `1px solid ${opt.quality === 'excellent' ? C.green : opt.quality === 'good' ? C.amber : C.red}33` : `1px solid ${C.line}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ ...sMono, fontSize: 11, color: opt.id === selectedFusion ? (opt.quality === 'excellent' ? C.green : opt.quality === 'good' ? C.amber : C.red) : C.tx3 }}>
                            {opt.id === selectedFusion ? '\u25B6' : '\u00A0\u00A0'} OPTION {opt.id}
                          </span>
                          <span style={{ ...sMono, fontSize: 12, color: opt.quality === 'excellent' ? C.green : opt.quality === 'good' ? C.amber : C.red }}>
                            [{opt.quality.toUpperCase()}]
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Fusion key */}
                <div style={{ ...sCard, marginBottom: 20 }}>
                  <div style={{ ...sMono, fontSize: 12, color: C.teal, marginBottom: 10 }}>FUSION KEY — HOW THE INTs CONVERGE</div>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {pir.fusionKey.map((k, i) => (
                      <li key={i} style={{ color: C.tx, fontSize: 12, lineHeight: 1.7, marginBottom: 6 }}>{k}</li>
                    ))}
                  </ul>
                </div>

                {/* INT contributions not tasked */}
                {(() => {
                  const missed = INT_DEFS.filter(d => !taskedInts.includes(d.id));
                  if (missed.length === 0) return null;
                  return (
                    <div style={{ ...sCard, marginBottom: 20 }}>
                      <div style={{ ...sMono, fontSize: 12, color: C.red, marginBottom: 10 }}>DISCIPLINES NOT TASKED — WHAT YOU MISSED</div>
                      {missed.map(d => {
                        const ret = pir.intReturns[d.id];
                        return (
                          <div key={d.id} style={{ padding: '10px 0', borderBottom: `1px solid ${C.line}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                              <span style={{ fontSize: 16 }}>{d.icon}</span>
                              <span style={{ ...sMono, color: d.color, fontSize: 12 }}>{d.label}</span>
                              <span style={{ ...sMono, color: ret.confidence === 'NOT APPLICABLE' ? C.tx3 : C.amber, fontSize: 12, marginLeft: 8 }}>
                                CONFIDENCE: {ret.confidence}
                              </span>
                            </div>
                            <p style={{ color: C.tx2, fontSize: 11, lineHeight: 1.6, margin: 0 }}>
                              {ret.confidence === 'NOT APPLICABLE'
                                ? 'This discipline had minimal applicability to this PIR. Not tasking it was a sound resource allocation decision.'
                                : ret.report.substring(0, 200) + '...'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                <button onClick={resetMission} style={sBtn(true, C.teal)}>
                  New Mission &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* COVERAGE MODE — INT Coverage Overlay Map       */}
        {/* ═══════════════════════════════════════════════ */}
        {mode === 'coverage' && (() => {
          const toggleCovInt = (id) => {
            setCovActiveInts(prev => ({ ...prev, [id]: !prev[id] }));
            setCovSelectedDesc(id);
          };
          const activeCount = Object.values(covActiveInts).filter(Boolean).length;

          // SVG overlay renderers per coverage type
          const renderCovOverlays = () => {
            const overlays = [];
            INT_COVERAGE.forEach(intDef => {
              if (!covActiveInts[intDef.id]) return;
              const opacity = 0.3;
              if (intDef.coverage === 'point') {
                intDef.locations.forEach(([cx, cy], i) => {
                  overlays.push(
                    React.createElement('circle', { key: intDef.id + '-pt-' + i, cx: cx, cy: cy, r: intDef.radius, fill: intDef.color, opacity: opacity, stroke: intDef.color, strokeWidth: 1.5, strokeOpacity: 0.6 })
                  );
                });
              } else if (intDef.coverage === 'arc') {
                intDef.locations.forEach(([cx, cy], i) => {
                  const r = intDef.radius;
                  const startAngle = -45 * (Math.PI / 180);
                  const endAngle = 45 * (Math.PI / 180);
                  const x1 = cx + r * Math.cos(startAngle);
                  const y1 = cy + r * Math.sin(startAngle);
                  const x2 = cx + r * Math.cos(endAngle);
                  const y2 = cy + r * Math.sin(endAngle);
                  const d = 'M ' + cx + ' ' + cy + ' L ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 0 1 ' + x2 + ' ' + y2 + ' Z';
                  overlays.push(
                    React.createElement('path', { key: intDef.id + '-arc-' + i, d: d, fill: intDef.color, opacity: opacity, stroke: intDef.color, strokeWidth: 1, strokeOpacity: 0.5 })
                  );
                });
              } else if (intDef.coverage === 'stripe') {
                intDef.locations.forEach(([x, y], i) => {
                  overlays.push(
                    React.createElement('rect', { key: intDef.id + '-stripe-' + i, x: x, y: y, width: intDef.width, height: intDef.height, fill: intDef.color, opacity: opacity * 0.8, stroke: intDef.color, strokeWidth: 1, strokeOpacity: 0.4, strokeDasharray: '6 3' })
                  );
                });
              } else if (intDef.coverage === 'area') {
                intDef.locations.forEach((loc, i) => {
                  const [rx, ry, rw, rh] = loc;
                  overlays.push(
                    React.createElement('rect', { key: intDef.id + '-area-' + i, x: rx, y: ry, width: rw, height: rh, fill: intDef.color, opacity: opacity, stroke: intDef.color, strokeWidth: 1.5, strokeOpacity: 0.5, rx: 4 })
                  );
                });
              } else if (intDef.coverage === 'network') {
                const locs = intDef.locations;
                for (let i = 0; i < locs.length; i++) {
                  for (let j = i + 1; j < locs.length; j++) {
                    overlays.push(
                      React.createElement('line', { key: intDef.id + '-net-' + i + '-' + j, x1: locs[i][0], y1: locs[i][1], x2: locs[j][0], y2: locs[j][1], stroke: intDef.color, strokeWidth: 2, opacity: opacity + 0.1, strokeDasharray: '4 2' })
                    );
                  }
                }
                locs.forEach(([cx, cy], i) => {
                  overlays.push(
                    React.createElement('circle', { key: intDef.id + '-node-' + i, cx: cx, cy: cy, r: 6, fill: intDef.color, opacity: 0.7, stroke: intDef.color, strokeWidth: 2, strokeOpacity: 0.9 })
                  );
                });
              }
            });
            return overlays;
          };

          // Gap analysis: find cells in a grid not covered by any active INT
          const renderGapOverlay = () => {
            if (!covShowGaps) return null;
            const gridSize = 20;
            const gaps = [];
            for (let gx = 0; gx < 400; gx += gridSize) {
              for (let gy = 0; gy < 450; gy += gridSize) {
                const cx = gx + gridSize / 2;
                const cy = gy + gridSize / 2;
                let covered = false;
                INT_COVERAGE.forEach(intDef => {
                  if (!covActiveInts[intDef.id] || covered) return;
                  if (intDef.coverage === 'point') {
                    intDef.locations.forEach(([px, py]) => {
                      if (Math.hypot(cx - px, cy - py) <= intDef.radius) covered = true;
                    });
                  } else if (intDef.coverage === 'arc') {
                    intDef.locations.forEach(([px, py]) => {
                      const dist = Math.hypot(cx - px, cy - py);
                      const angle = Math.atan2(cy - py, cx - px) * 180 / Math.PI;
                      if (dist <= intDef.radius && angle >= -45 && angle <= 45) covered = true;
                    });
                  } else if (intDef.coverage === 'stripe') {
                    intDef.locations.forEach(([sx, sy]) => {
                      if (cx >= sx && cx <= sx + intDef.width && cy >= sy && cy <= sy + intDef.height) covered = true;
                    });
                  } else if (intDef.coverage === 'area') {
                    intDef.locations.forEach(([rx, ry, rw, rh]) => {
                      if (cx >= rx && cx <= rx + rw && cy >= ry && cy <= ry + rh) covered = true;
                    });
                  } else if (intDef.coverage === 'network') {
                    intDef.locations.forEach(([nx, ny]) => {
                      if (Math.hypot(cx - nx, cy - ny) <= 30) covered = true;
                    });
                  }
                });
                if (!covered) {
                  gaps.push(
                    React.createElement('rect', { key: 'gap-' + gx + '-' + gy, x: gx, y: gy, width: gridSize, height: gridSize, fill: '#ff2020', opacity: 0.15 })
                  );
                }
              }
            }
            return gaps;
          };

          const selectedIntDef = covSelectedDesc ? INT_COVERAGE.find(d => d.id === covSelectedDesc) : null;

          return (
            <div>
              <h2 style={{ fontFamily: CO_MONO, fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#c8d0e0', letterSpacing: '.06em', textTransform: 'uppercase' }}>CABLE // GEOINT // INT COVERAGE OVERLAY MAP</h2>
              <p style={{ color: C.tx2, fontSize: 13, marginBottom: 20, lineHeight: 1.6, maxWidth: 700 }}>
                A simplified theater map showing how different intelligence disciplines provide geographic coverage.
                Toggle each INT to visualize its collection footprint, then run Gap Analysis to identify areas with zero coverage.
                {SatelliteIcon}{SensorIcon}{GlobeMagIcon}
              </p>
              {TipBox('geoint')}
              {TipBox('masint')}
              {TipBox('osint')}

              {/* INT Toggle Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {INT_COVERAGE.map(d => {
                  const active = covActiveInts[d.id];
                  return (
                    <button key={d.id} onClick={() => toggleCovInt(d.id)} style={{
                      padding: '6px 14px', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontFamily: CO_MONO,
                      background: active ? d.color + '22' : 'transparent',
                      color: active ? d.color : C.tx3,
                      border: '1px solid ' + (active ? d.color + '66' : C.line),
                      fontWeight: active ? 600 : 400, transition: 'all .15s',
                      letterSpacing: '.05em',
                    }}>
                      {active ? '\u25A0' : '\u25A1'} {d.label}
                    </button>
                  );
                })}
                <button onClick={() => setCovShowGaps(!covShowGaps)} style={{
                  padding: '6px 14px', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontFamily: CO_MONO,
                  background: covShowGaps ? C.redBg : 'transparent',
                  color: covShowGaps ? C.red : C.tx3,
                  border: '1px solid ' + (covShowGaps ? C.red + '66' : C.line),
                  fontWeight: covShowGaps ? 600 : 400, transition: 'all .15s',
                  letterSpacing: '.05em',
                }}>
                  {covShowGaps ? '\⚠' : '\u25CB'} GAP ANALYSIS
                </button>
              </div>

              {/* Active INT count */}
              <div style={{ ...sMono, fontSize: 11, color: activeCount > 0 ? C.teal : C.tx3, marginBottom: 12 }}>
                {activeCount} OF 6 DISCIPLINES ACTIVE {covShowGaps ? ' // GAP ANALYSIS ON' : ''}
              </div>

              {/* SVG Map */}
              <div style={{ ...sCard, padding: 16, overflow: 'hidden' }}>
                <svg viewBox="0 0 400 450" style={{ width: '100%', maxWidth: 600, display: 'block', margin: '0 auto' }}>
                  {/* Background */}
                  <rect x="0" y="0" width="400" height="450" fill="#0a1210" />

                  {/* Simplified country outline */}
                  <path d="M 10,60 Q 5,100 20,140 Q 10,180 30,220 Q 15,260 25,300 Q 20,340 35,380 Q 30,410 50,440 L 380,440 L 390,400 Q 370,350 380,300 Q 395,250 385,200 Q 390,150 375,100 Q 380,70 360,50 L 200,30 Q 100,25 10,60 Z"
                    fill="#0e1a16" stroke="#1a3830" strokeWidth="1.5" />

                  {/* Mountain range along top */}
                  <path d="M 60,55 L 80,30 L 100,50 L 120,25 L 145,48 L 165,20 L 190,45 L 210,22 L 235,42 L 260,18 L 280,40 L 305,28 L 325,45 L 345,35 L 360,50"
                    fill="none" stroke="#2a4a40" strokeWidth="2" strokeLinecap="round" />

                  {/* Coastline indicator on left */}
                  <path d="M 10,60 Q 5,100 20,140 Q 10,180 30,220 Q 15,260 25,300 Q 20,340 35,380 Q 30,410 50,440"
                    fill="none" stroke="#1a5048" strokeWidth="3" strokeDasharray="8 4" />

                  {/* Rivers */}
                  <path d="M 165,20 Q 170,80 160,140 Q 150,200 170,260 Q 180,320 160,400 Q 155,420 150,440"
                    fill="none" stroke="#1a4050" strokeWidth="1.5" opacity="0.6" />
                  <path d="M 260,18 Q 270,70 290,120 Q 310,180 280,240 Q 260,280 270,340"
                    fill="none" stroke="#1a4050" strokeWidth="1" opacity="0.5" />

                  {/* City markers */}
                  {[[120,170,'Brevenia City'],[250,210,'Port Corath'],[180,340,'South Junction'],[200,120,'Mountain Pass'],[310,290,'Eastern Hub']].map(([cx,cy,name], i) => (
                    React.createElement('g', { key: 'city-' + i },
                      React.createElement('rect', { x: cx - 4, y: cy - 4, width: 8, height: 8, fill: '#1a3830', stroke: '#2a6050', strokeWidth: 1, transform: 'rotate(45 ' + cx + ' ' + cy + ')' }),
                      React.createElement('text', { x: cx + 10, y: cy + 3, fill: '#3a7060', fontSize: 12, fontFamily: CO_MONO }, name)
                    )
                  ))}

                  {/* Grid lines for reference */}
                  {[100, 200, 300].map(x => React.createElement('line', { key: 'vg-' + x, x1: x, y1: 0, x2: x, y2: 450, stroke: '#1a2a24', strokeWidth: 0.5, strokeDasharray: '2 4' }))}
                  {[100, 200, 300, 400].map(y => React.createElement('line', { key: 'hg-' + y, x1: 0, y1: y, x2: 400, y2: y, stroke: '#1a2a24', strokeWidth: 0.5, strokeDasharray: '2 4' }))}

                  {/* INT coverage overlays */}
                  {renderCovOverlays()}

                  {/* Gap analysis overlay */}
                  {renderGapOverlay()}

                  {/* MASINT concentric rings (only when active) */}
                  {covActiveInts.masint && INT_COVERAGE.find(d => d.id === 'masint').locations.map(([cx, cy], i) => (
                    React.createElement('g', { key: 'masint-rings-' + i },
                      React.createElement('circle', { cx: cx, cy: cy, r: 50, fill: 'none', stroke: '#a050a0', strokeWidth: 1, opacity: 0.4, strokeDasharray: '3 2' }),
                      React.createElement('circle', { cx: cx, cy: cy, r: 35, fill: 'none', stroke: '#a050a0', strokeWidth: 0.8, opacity: 0.3, strokeDasharray: '3 2' }),
                      React.createElement('circle', { cx: cx, cy: cy, r: 20, fill: 'none', stroke: '#a050a0', strokeWidth: 0.6, opacity: 0.25 })
                    )
                  ))}

                  {/* Labels */}
                  <text x="10" y="14" fill="#2a6050" fontSize="9" fontFamily={CO_MONO}>THEATER: BREVENIA-CORATH AOR</text>
                  <text x="10" y="446" fill="#1a3830" fontSize="7" fontFamily={CO_MONO}>GRID REF // UNCLASSIFIED TRAINING AID</text>
                </svg>
              </div>

              {/* Selected INT description */}
              {selectedIntDef && (
                <div style={{ ...sCard, borderLeft: '3px solid ' + selectedIntDef.color, marginTop: 4 }}>
                  <div style={{ ...sMono, color: selectedIntDef.color, fontSize: 12, marginBottom: 6 }}>{selectedIntDef.label} COVERAGE</div>
                  <p style={{ color: C.tx, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{selectedIntDef.description}</p>
                </div>
              )}

              {/* Key Insight */}
              <div style={{ ...sCard, background: 'rgba(42,184,154,.04)', border: '1px solid rgba(42,184,154,.15)', marginTop: 16 }}>
                <div style={{ ...sMono, color: C.teal, fontSize: 11, marginBottom: 8 }}>KEY INSIGHT</div>
                <p style={{ color: C.tx, fontSize: 13, lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>
                  No single INT provides complete coverage. Intelligence collection planning is about LAYERING disciplines to minimize gaps. The fusion problem is deciding what to do when INTs contradict each other.
                </p>
              </div>

              {/* Coverage legend */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
                {[
                  { shape: 'Circles', desc: 'HUMINT point coverage', color: '#cc6030' },
                  { shape: 'Arcs', desc: 'SIGINT antenna sectors', color: '#30a0cc' },
                  { shape: 'Stripes', desc: 'GEOINT satellite swaths', color: '#50a050' },
                  { shape: 'Rings', desc: 'MASINT sensor zones', color: '#a050a0' },
                  { shape: 'Rectangles', desc: 'OSINT population centers', color: '#a0a050' },
                  { shape: 'Network', desc: 'CYBER digital nodes', color: '#cc5050' },
                ].map(item => (
                  <div key={item.shape} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color, opacity: 0.6 }} />
                    <span style={{ fontFamily: CO_MONO, fontSize: 11, color: C.tx3 }}>{item.shape}: {item.desc}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: '#ff2020', opacity: 0.3 }} />
                  <span style={{ fontFamily: CO_MONO, fontSize: 11, color: C.red }}>Red cells: ZERO coverage (gaps)</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── Provenance strip (SCIF doc footer) ────────── */}
        <div style={{ marginTop: 48, paddingTop: 20, borderTop: '1px solid rgba(50,90,160,.15)' }}>
          <div style={{ ...sMono, color: C.tx3, fontSize: 12, marginBottom: 10, letterSpacing: '.12em' }}>DOCTRINAL PROVENANCE // UNCLASSIFIED TRAINING REFERENCES</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {CO_PROVENANCE.map(p => (
              <div key={p.label} style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 3, padding: '6px 12px' }}>
                <span style={{ fontFamily: CO_MONO, fontSize: 12, color: C.teal, fontWeight: 600 }}>{p.label}</span>
                <span style={{ color: C.tx3, fontSize: 12, marginLeft: 6 }}>{p.note}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
      {React.createElement(ClassificationStrip, { text: 'TOP SECRET // SI // TK // NOFORN // REL TO FVEY', color: '#8b0000' })}
    </div>
  );
}
