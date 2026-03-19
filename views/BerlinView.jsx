// BerlinView.jsx — Cold War Pressure Gauge
// History of the Berlin Wall (HIST)
//
// The visitor experiences the Berlin Wall crisis as a real-time strategic
// pressure analysis. The wall's construction, existence, and fall are
// presented through the lens of Cold War strategic calculus — each side's
// decision-making, escalation dynamics, and the signals that preceded
// the wall's fall. Four modes: Phases (chronological), Intelligence
// (espionage operations), Counterfactuals (what-if divergences),
// Pressure Graph (interactive SVG escalation timeline 1945-1989).
// Self-contained React component using Babel in-browser transpilation.
// Globals: useState, useCallback, useMemo from React


// ── Palette: Cold War surveillance station — concrete & iron ──────────────
const C = {
  bg:      '#12141a',
  card:    'rgba(22,24,30,.95)',
  cardBd:  'rgba(100,105,115,.22)',
  tx:      '#c8ccd4',
  tx2:     '#9ca0ac',
  tx3:     '#6b6f7b',
  accent:  '#708090',
  accentDm:'#566474',
  accentBg:'rgba(112,128,144,.08)',
  red:     '#b04048',
  redDm:   '#883038',
  redBg:   'rgba(176,64,72,.08)',
  gold:    '#b8a060',
  goldDm:  '#907840',
  goldBg:  'rgba(184,160,96,.07)',
  green:   '#508868',
  greenDm: '#387050',
  greenBg: 'rgba(80,136,104,.07)',
  east:    '#a05050',
  eastDm:  '#804040',
  eastBg:  'rgba(160,80,80,.06)',
  west:    '#b8a060',
  westDm:  '#907840',
  westBg:  'rgba(184,160,96,.06)',
  line:    'rgba(100,105,115,.15)',
};
const Mono  = "'IBM Plex Mono','Courier New',monospace";
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";

// ── Decorative SVG Components ──────────────────────────────────
const BarbedWireSVG = () => React.createElement('svg', {
  viewBox: '0 0 800 24', style: { width: '100%', height: 24, opacity: 0.12, margin: '16px 0' }
},
  React.createElement('line', { x1: 0, y1: 12, x2: 800, y2: 12, stroke: '#708090', strokeWidth: 1.5 }),
  Array.from({ length: 20 }, (_, i) => React.createElement('g', { key: i, transform: 'translate(' + (i * 40 + 10) + ', 12)' },
    React.createElement('line', { x1: -6, y1: -6, x2: 6, y2: 6, stroke: '#708090', strokeWidth: 1 }),
    React.createElement('line', { x1: -6, y1: 6, x2: 6, y2: -6, stroke: '#708090', strokeWidth: 1 }),
    React.createElement('circle', { cx: 0, cy: 0, r: 2, fill: '#708090' })
  ))
);

const WallDividerSVG = () => React.createElement('div', {
  style: { position: 'absolute', left: '50%', top: 0, bottom: 0, width: 4, zIndex: 0, pointerEvents: 'none' }
},
  React.createElement('div', { style: {
    width: 4, height: '100%',
    background: 'repeating-linear-gradient(to bottom, rgba(100,105,115,.12) 0px, rgba(100,105,115,.12) 20px, rgba(100,105,115,.04) 20px, rgba(100,105,115,.04) 24px)',
  }}),
  React.createElement('div', { style: {
    position: 'absolute', top: 0, left: -8, width: 20, height: '100%',
    background: 'linear-gradient(90deg, transparent 0%, rgba(100,105,115,.03) 50%, transparent 100%)',
  }})
);

const CheckpointSign = ({ label }) => React.createElement('div', {
  style: {
    display: 'inline-block', padding: '3px 12px',
    background: 'rgba(100,105,115,.06)',
    border: '2px solid rgba(100,105,115,.25)',
    fontFamily: Mono, fontSize: 11, letterSpacing: '.12em',
    color: C.tx3, textTransform: 'uppercase', fontWeight: 700,
    position: 'relative',
  }
},
  React.createElement('div', { style: {
    position: 'absolute', top: -1, left: -1, right: -1, bottom: -1,
    border: '1px solid rgba(100,105,115,.1)', pointerEvents: 'none',
  }}),
  label
);

const StencilHeader = ({ children, color }) => React.createElement('div', {
  style: {
    fontFamily: Mono, fontSize: 12, letterSpacing: '.14em',
    color: color || C.tx3, textTransform: 'uppercase', fontWeight: 700,
    padding: '6px 0',
    textShadow: '1px 1px 0 rgba(0,0,0,.3)',
    borderBottom: '2px solid ' + (color || C.tx3) + '30',
    marginBottom: 10,
  }
}, children);

// ── Skills ──────────────────────────────────────────────────────────
const SKILLS = [
  'Cold War Strategic Calculus',
  'Escalation & De-escalation Dynamics',
  'Intelligence & Espionage Analysis',
  'Berlin Blockade & Airlift Logistics',
  'Nuclear Brinkmanship Assessment',
  'Stasi Surveillance Architecture',
  'Ostpolitik & Detente Diplomacy',
  'Regime Collapse Signal Detection',
];

// ── Provenance ──────────────────────────────────────────────────────
const PROVENANCE = [
  { label: 'Taylor (2006)', desc: 'The Berlin Wall: A World Divided, 1961\u20131989' },
  { label: 'Kempe (2011)', desc: 'Berlin 1961: Kennedy, Khrushchev, and the Most Dangerous Place on Earth' },
  { label: 'Hertle (2011)', desc: 'The Berlin Wall: Monument of the Cold War' },
  { label: 'Harrison (2003)', desc: 'Driving the Soviets up the Wall: Soviet\u2013East German Relations 1953\u20131961' },
];

// ── Phase Data ──────────────────────────────────────────────────────
const PHASES = [
  {
    id: 'division',
    num: 'I',
    era: '1945\u20131961',
    title: 'Division',
    subtitle: 'Occupation Zones & the Refugee Hemorrhage',
    pressureLevel: 62,
    sovietCalc: 'Stalin viewed Germany as both reparations source and ideological frontier. The Soviet zone was stripped of industrial capacity. East Germany (DDR, est. 1949) was designed as a showcase socialist state, but its economy bled skilled workers westward through the open border in Berlin. By 1961, 3.5 million East Germans had fled \— roughly 20% of the population \— a demographic catastrophe threatening the DDR with collapse.',
    westernCalc: 'Truman, then Eisenhower, saw Berlin as the non-negotiable symbol of Western resolve. The 1948\u201349 Berlin Blockade \— Stalin cutting all road and rail access to West Berlin \— was countered by the Berlin Airlift: 277,000 flights delivering 2.3 million tons of supplies over 11 months. The airlift proved the West would not abandon Berlin, but it also revealed that ground access was indefensible. West Berlin existed at Soviet sufferance.',
    decisionPoints: [
      'Stalin gambles on the blockade (June 1948) \— tests whether the West will fight for Berlin or concede',
      'Truman chooses the airlift over armed convoy \— avoids military confrontation while refusing surrender',
      'Adenauer anchors West Germany in NATO (1955) \— permanently divides Germany along Cold War lines',
      'Khrushchev issues the Berlin Ultimatum (1958) \— demands Western withdrawal within 6 months',
    ],
    intelDimension: 'Berlin was the espionage capital of the world. Both sides operated major intelligence stations: CIA Berlin Operations Base and KGB Karlshorst compound. The Berlin Tunnel (Operation Gold/Stopwatch, 1955\u201356) tapped Soviet military communications from a 450-meter tunnel under the sector border \— though the KGB knew about it from the start via mole George Blake.',
    quote: '"Berlin is the testicles of the West. Every time I want to make the West scream, I squeeze on Berlin."',
    quoteSource: 'Attributed to Nikita Khrushchev',
  },
  {
    id: 'construction',
    num: 'II',
    era: 'August 13, 1961',
    title: 'Construction',
    subtitle: 'The Night the Wall Went Up',
    pressureLevel: 88,
    sovietCalc: 'Ulbricht had been begging Moscow for permission to close the border since 1953. Khrushchev resisted for years \— a wall would be a propaganda disaster, an admission that people had to be imprisoned to keep them in the socialist paradise. But by mid-1961, the refugee flow had become existential: 1,000 people per day were leaving. The DDR was hemorrhaging doctors, engineers, and young workers. Khrushchev calculated that the political cost of the wall was less than the cost of losing East Germany entirely.',
    westernCalc: 'Kennedy had been president for seven months and had just been humiliated at the Bay of Pigs. At the Vienna Summit (June 1961), Khrushchev bullied him on Berlin. Kennedy privately told aides the critical distinction: access to West Berlin (non-negotiable) versus movement within Berlin (negotiable). When the wall went up, Kennedy recognized it as a Soviet concession \— Khrushchev was solving his German problem defensively, not offensively. Kennedy chose not to act. His advisor McGeorge Bundy said the wall was "a hell of a lot better than a war."',
    decisionPoints: [
      'Khrushchev authorizes "Operation Rose" \— the border closure plan finalized at a Warsaw Pact meeting',
      'Ulbricht deploys 40,000 troops and police at 1:00 AM on August 13 \— barbed wire first, concrete later',
      'Kennedy deliberately does not mobilize \— accepts the wall as a stabilizing move within the Cold War logic',
      'West Berlin Mayor Willy Brandt denounces Western inaction \— a political wound that shapes Ostpolitik later',
    ],
    intelDimension: 'Western intelligence had ample warning. CIA and BND (West German intelligence) had tracked the buildup of construction materials, the redeployment of border troops, and the emergency Warsaw Pact consultations. But the political leadership did not act on the intelligence \— the wall, paradoxically, served Western interests by stabilizing the Berlin crisis without war. The intelligence failure was not collection; it was policy.',
    quote: '"Nobody has the intention of building a wall."',
    quoteSource: 'Walter Ulbricht, press conference, June 15, 1961 \— two months before ordering precisely that',
  },
  {
    id: 'checkpoint',
    num: 'III',
    era: 'October 1961',
    title: 'Checkpoint Charlie',
    subtitle: 'Tanks at the Brink',
    pressureLevel: 95,
    sovietCalc: 'After the wall went up, the Soviets tested Western access rights by demanding that US diplomats show identification at Checkpoint Charlie \— previously, allied personnel crossed freely as an expression of four-power sovereignty. The Soviets wanted to establish that East Berlin was sovereign DDR territory, not an occupied zone. When the Americans refused, the Soviets deployed T-55 tanks to the checkpoint. The standoff was deliberate: Khrushchev wanted to see if Kennedy would blink.',
    westernCalc: 'General Lucius Clay, Kennedy\'s personal representative in Berlin, matched the Soviet tanks with American M48 Pattons. For 16 hours on October 27\u201328, 1961, Soviet and American tanks faced each other at point-blank range with live ammunition \— the only direct US-Soviet military confrontation of the Cold War. Kennedy used backchannel communication through GRU officer Georgi Bolshakov to signal that if the Soviets withdrew their tanks, the Americans would follow. The Soviets pulled back first \— one tank at a time \— and the Americans reciprocated.',
    decisionPoints: [
      'Clay deploys M48 Pattons to Checkpoint Charlie \— escalation to demonstrate resolve',
      'Kennedy activates the Bolshakov backchannel \— diplomatic de-escalation parallel to military posture',
      'Khrushchev orders withdrawal first \— concedes the access principle while keeping the wall',
      'Both sides learn the lesson: Berlin crises must have off-ramps or they lead to nuclear war',
    ],
    intelDimension: 'The backchannel through Bolshakov was itself an intelligence operation. Robert Kennedy had been meeting secretly with Bolshakov for months, exchanging messages between the two leaders outside normal diplomatic channels. This created a direct leader-to-leader communication pathway that bypassed the bureaucracies on both sides \— crucial when hours mattered and the formal diplomatic machinery was too slow.',
    quote: '"We\'re not going to start a war over a damn checkpoint."',
    quoteSource: 'Attributed to John F. Kennedy during the standoff',
  },
  {
    id: 'life',
    num: 'IV',
    era: '1961\u20131989',
    title: 'Life Under the Wall',
    subtitle: 'Escape, Surveillance & Ostpolitik',
    pressureLevel: 55,
    sovietCalc: 'Once the wall stabilized the DDR, Moscow settled into managing the status quo. The Brezhnev Doctrine (1968) formalized the principle that no socialist state would be allowed to defect. East Germany became the most efficient police state in history: the Stasi employed 91,000 full-time officers and recruited an estimated 189,000 civilian informants \— in a country of 16 million. Roughly 1 in 63 citizens was a Stasi informant. The surveillance was so pervasive that it corroded social trust at every level.',
    westernCalc: 'Willy Brandt, who became West German Chancellor in 1969, pursued Ostpolitik \— "change through rapprochement." Rather than confrontation, Brandt normalized relations with the DDR and the Soviet Union, recognizing the Oder-Neisse border with Poland and signing the Moscow Treaty (1970). This was controversial: critics called it appeasement. But Ostpolitik gradually increased contact between East and West Germans, created economic dependencies, and planted seeds of change that bore fruit in 1989.',
    decisionPoints: [
      'Stasi builds the most comprehensive surveillance state in history \— control through total information awareness',
      'Brandt launches Ostpolitik (1969) \— shifts from confrontation to engagement, trading legitimacy for access',
      'Helsinki Accords (1975) \— the USSR accepts human rights language in exchange for border recognition, creating a tool dissidents will use later',
      'Reagan\'s "Tear down this wall" speech (1987) \— symbolic pressure that both sides know is rhetorical, not operational',
    ],
    intelDimension: 'The Stasi was simultaneously an intelligence service and a tool of social control. Its foreign intelligence arm (HVA) under Markus Wolf ran some of the Cold War\'s most successful operations, including placing Gunter Guillaume as a personal aide to Chancellor Brandt himself \— a penetration that forced Brandt\'s resignation in 1974. Domestically, the Stasi\'s psychological operations (Zersetzung) systematically destroyed dissidents\' lives through harassment, disinformation, and social isolation rather than overt imprisonment.',
    quote: '"In order to be a state, East Germany had to become a prison."',
    quoteSource: 'Paraphrased from Taylor, The Berlin Wall',
  },
  {
    id: 'fall',
    num: 'V',
    era: 'November 9, 1989',
    title: 'The Fall',
    subtitle: 'Schabowski\'s Mistake & the Cascade',
    pressureLevel: 30,
    sovietCalc: 'By 1989, Gorbachev had signaled that the Brezhnev Doctrine was dead. Perestroika and glasnost had unleashed forces Moscow could no longer control. Hungary opened its border with Austria in September 1989, creating a route for East Germans to flee through a third country. Thousands of East Germans camped in West German embassies in Prague and Warsaw. The DDR leadership was paralyzed: Honecker wanted a Tiananmen-style crackdown, but his own Politburo removed him on October 18. His replacement, Egon Krenz, tried controlled reform but events outpaced him.',
    westernCalc: 'The Bush administration adopted a deliberately cautious posture. Secretary of State James Baker worked to reassure Gorbachev that German reunification would not threaten Soviet security. When the wall fell, Bush conspicuously did not gloat \— no victory speeches, no triumphalism. This was strategic: he understood that humiliating Gorbachev could provoke a hardline backlash in Moscow. The restraint helped enable peaceful reunification through the "Two Plus Four" negotiations (1990).',
    decisionPoints: [
      'Gorbachev abandons the Brezhnev Doctrine \— signals to Eastern European states that Soviet tanks will not rescue them',
      'Hungary opens the Austrian border (September 1989) \— punctures the Iron Curtain, triggering an exodus',
      'Schabowski\'s press conference (November 9, 7:00 PM) \— announces new travel regulations, asked "when?", says "immediately, without delay" \— a miscommunication that opens the wall',
      'Border guards at Bornholmer Strasse open the gates (11:30 PM) \— overwhelmed by crowds, they choose not to shoot',
    ],
    intelDimension: 'The fall of the wall exposed the greatest intelligence trove in history. The Stasi had maintained files on approximately 5.6 million people. As the DDR collapsed, Stasi officers frantically shredded documents \— 600 million pages survived intact, with another 16,000 bags of shredded material that German authorities have spent decades reconstructing. The files revealed the depth of penetration into Western governments, peace movements, and institutions.',
    quote: '"That applies, as far as I know \u2026 immediately, without delay."',
    quoteSource: 'G\u00FCnter Schabowski, the accidental statement that opened the Berlin Wall',
  },
];

// ── Intelligence Operations Data ────────────────────────────────────
const INTEL_OPS = [
  {
    id: 'tunnel57',
    name: 'Tunnel 57',
    year: '1964',
    icon: '\u26CF',
    category: 'ESCAPE OPERATION',
    summary: 'A 145-meter tunnel dug by West Berlin students from a bakery on Bernauer Strasse to a courtyard toilet in East Berlin. Over two nights in October 1964, 57 people crawled through the narrow passage to freedom \— the largest single escape through a Berlin Wall tunnel.',
    details: [
      'The tunnel was 70cm wide and 12 meters deep \— dug over six months by hand, with the earth hauled out in bags.',
      'Funding came partly from NBC television, which paid for exclusive filming rights \— a controversial arrangement mixing journalism and escape operations.',
      'On the second night, an East German border guard was shot dead \— the only fatality associated with a tunnel escape, and it caused a diplomatic crisis.',
      'The Stasi had infiltrated multiple tunnel projects; Tunnel 57 succeeded partly because its organizers maintained strict operational security.',
    ],
    significance: 'Tunnel 57 became symbolic of the desperation and ingenuity the wall provoked. It demonstrated that ordinary civilians would risk their lives and break the law to escape a system that claimed to represent their interests.',
  },
  {
    id: 'gold',
    name: 'Operation Gold / Stopwatch',
    year: '1955\u20131956',
    icon: '\u260E',
    category: 'SIGNALS INTELLIGENCE',
    summary: 'A joint CIA-MI6 operation that tunneled 450 meters under the Soviet sector to tap into Soviet military communication cables. The tunnel operated for 11 months and 11 days before the Soviets "discovered" it \— though they had known from the start through their mole George Blake.',
    details: [
      'The tunnel ran from a fake radar station in Rudow (American sector) to the cable junction at Sch\u00F6nefeld in the Soviet sector.',
      'CIA processing centers recorded 443,000 telephone conversations and 6 million hours of teletype traffic.',
      'George Blake, a British SIS officer secretly working for the KGB, had betrayed the operation before construction began.',
      'The KGB allowed the tunnel to operate anyway to protect Blake \— revealing it too early would have exposed their mole.',
    ],
    significance: 'Operation Gold illustrates the hall-of-mirrors quality of Cold War espionage. The Soviets knew about the tap but could not reveal their knowledge without compromising their agent. The intelligence gathered may have been genuine (the Soviets could not easily sanitize thousands of routine military communications), or it may have been subtly manipulated. Scholars still debate the net intelligence value.',
  },
  {
    id: 'wolf',
    name: 'Markus Wolf\'s HVA',
    year: '1952\u20131986',
    icon: '\u2618',
    category: 'HUMAN INTELLIGENCE',
    summary: 'Markus Wolf ran East Germany\'s foreign intelligence service (Hauptverwaltung Aufkl\u00E4rung) for 34 years, becoming the most successful spymaster of the Cold War. His specialty: "Romeo agents" \— male operatives who seduced lonely secretaries in West German government offices to gain access to classified information.',
    details: [
      'Wolf\'s greatest coup: placing G\u00FCnter Guillaume as personal aide to Chancellor Willy Brandt (1970\u20131974). Guillaume\'s exposure forced Brandt\'s resignation.',
      'The HVA recruited an estimated 4,000 agents in West Germany, infiltrating virtually every major institution.',
      'Wolf was so secretive that Western intelligence agencies had no photograph of him until 1979 \— earning him the nickname "the man without a face."',
      'After reunification, Wolf\'s files revealed that the West German counterintelligence service (BfV) had itself been penetrated by HVA moles.',
    ],
    significance: 'Wolf demonstrated that a small, disciplined intelligence service could achieve strategic penetration of a much larger adversary. His success was built on exploiting human vulnerabilities \— loneliness, ideology, greed, and compromise \— rather than technical collection.',
  },
  {
    id: 'spyswap',
    name: 'Glienicke Bridge Exchanges',
    year: '1962\u20131986',
    icon: '\u2694',
    category: 'SPY EXCHANGES',
    summary: 'The Glienicke Bridge connecting West Berlin to Potsdam became the iconic site for Cold War spy exchanges. Three major swaps occurred here, each a carefully choreographed ritual of Cold War theatre where agents walked from one side to the other in simultaneous exchange.',
    details: [
      'February 10, 1962: Francis Gary Powers (U-2 pilot shot down over the USSR) exchanged for Rudolf Abel (KGB illegal operating in New York). The most famous spy swap of the Cold War.',
      'June 12, 1985: 23 Western agents exchanged for 4 Eastern bloc spies \— the largest spy swap in Cold War history.',
      'February 11, 1986: Soviet dissident Natan Sharansky exchanged along with other agents in a complex multi-party deal.',
      'The bridge was chosen because it was isolated, controlled by both sides, and visually dramatic \— a physical representation of the Cold War divide.',
    ],
    significance: 'The Glienicke exchanges reveal the tacit rules of Cold War espionage: both sides recognized the other\'s right to spy, and both maintained a back-channel mechanism for recovering captured agents. The swaps were adversarial cooperation \— enemies agreeing on rules of engagement.',
  },
  {
    id: 'stasi',
    name: 'Stasi Files',
    year: '1950\u20131989',
    icon: '\u2623',
    category: 'SURVEILLANCE STATE',
    summary: 'The Ministry for State Security (Stasi) built the most pervasive surveillance apparatus in human history. At its peak, the Stasi maintained files on approximately 5.6 million people \— one-third of the entire East German population. The archives that survived contain 111 kilometers of shelf space of paper documents.',
    details: [
      'Zersetzung ("decomposition"): the Stasi\'s signature method of destroying dissidents without imprisonment. Tactics included spreading false rumors, manipulating careers, staging burglaries, and gaslighting targets into questioning their own sanity.',
      'Smell samples: the Stasi collected cloth impregnated with the body odor of suspects and stored them in sealed jars for use with tracking dogs.',
      'Mail surveillance: every piece of international mail passing through East Germany was opened, photographed, resealed, and analyzed. Special teams could open and reseal a letter in under 2 minutes.',
      'After November 1989, Stasi officers began destroying files. Citizens stormed Stasi headquarters on January 15, 1990, stopping the destruction and preserving the bulk of the archive.',
    ],
    significance: 'The Stasi files represent both a historical resource and an ongoing moral dilemma. Millions of Germans discovered that friends, colleagues, spouses, and family members had informed on them. The question of how a society processes this knowledge \— justice vs. reconciliation \— remains unresolved.',
  },
];

// ── Counterfactual Scenarios ────────────────────────────────────────
const COUNTERFACTUALS = [
  {
    id: 'nowall',
    title: 'What If the Wall Was Never Built?',
    icon: '\u26D4',
    premise: 'Suppose Khrushchev refused Ulbricht\'s requests and the Berlin border remained open through the 1960s.',
    analysis: 'Without the wall, the refugee hemorrhage would have continued at 1,000+ per day. East Germany would have lost its professional class \— doctors, engineers, teachers, skilled workers \— within a few years. The DDR\'s economic model depended on captive labor; without it, the state would have collapsed by the mid-1960s. Khrushchev would have faced three options: accept East German collapse (intolerable), use military force to block emigration without a wall (risking Western military response), or negotiate a unified neutral Germany (unacceptable to both superpowers). The most likely outcome: a faster but more chaotic German reunification, possibly in the mid-1960s, under conditions far more dangerous than 1989.',
    implications: [
      'The DDR collapses 20\u201325 years earlier, destabilizing the entire Soviet bloc',
      'No Ostpolitik \— Brandt\'s engagement strategy has no target',
      'Soviet hardliners may attempt a military solution, risking direct confrontation',
      'The Cold War\'s central European front becomes far more volatile',
    ],
    historicalBasis: 'Harrison\'s archival research shows that Soviet planners genuinely feared DDR collapse without the wall. Ulbricht explicitly warned Moscow that the state had "perhaps two or three years" of viability if the border stayed open.',
  },
  {
    id: 'jfkacts',
    title: 'What If JFK Had Acted on August 13?',
    icon: '\u2693',
    premise: 'Suppose Kennedy ordered American forces to tear down the barbed wire on the morning of August 13, 1961, before the concrete was poured.',
    analysis: 'Militarily, the initial barbed wire barrier could have been bulldozed by American armor within hours. But this would have directly confronted Soviet-backed East German forces with American troops \— exactly the scenario both sides had spent 16 years avoiding. The key question is Khrushchev\'s response. He had explicitly told Kennedy at Vienna that Berlin was worth nuclear war. If American forces crossed into the Soviet sector, Khrushchev faced the choice of humiliating retreat or military escalation. Given the psychological dynamics of 1961 (Khrushchev under pressure from Chinese critics calling him soft, Kennedy already perceived as weak after the Bay of Pigs), escalation was disturbingly likely.',
    implications: [
      'Direct US-Soviet military confrontation in Berlin \— the one scenario both sides most feared',
      'Nuclear escalation probability estimated by historians at 15\u201330% depending on the scenario',
      'Even without nuclear war, a conventional clash would destroy Berlin and possibly trigger broader European conflict',
      'Kennedy\'s restraint, though politically costly, may have been the most consequential act of nuclear-age statesmanship',
    ],
    historicalBasis: 'Kempe argues Kennedy was too passive and could have tested the barrier early. But Trachtenberg and other nuclear historians note that the risk calculus strongly favored restraint: the wall solved the Berlin crisis without war.',
  },
  {
    id: 'tiananmen',
    title: 'What If the DDR Had Chosen Tiananmen?',
    icon: '\u2622',
    premise: 'Suppose Honecker had not been removed, and East German security forces opened fire on the Leipzig demonstrators on October 9, 1989.',
    analysis: 'The Leipzig Monday demonstration of October 9 was the hinge point. 70,000 people marched; the Stasi had assembled armed units, hospitals had been ordered to prepare for mass casualties, and blood supplies had been stockpiled. A Chinese-style crackdown was operationally prepared. But local SED officials, recognizing that Gorbachev would not support a massacre, negotiated a peaceful outcome. If Honecker had remained in power and ordered the troops to fire, the immediate result would have been hundreds or thousands of deaths. But the long-term outcome is uncertain: mass repression might have postponed the DDR\'s collapse but could not have prevented it given the broader collapse of Soviet power.',
    implications: [
      'Hundreds to thousands killed in Leipzig, with rolling repression across the DDR',
      'International isolation of East Germany \— even the Soviet Union would have condemned it publicly',
      'Gorbachev faces pressure to intervene, potentially splitting Soviet leadership',
      'German reunification delayed but not prevented \— perhaps occurring in 1991\u201392 under more chaotic conditions',
      'The moral authority of the peaceful revolution \— crucial to post-reunification reconciliation \— is lost',
    ],
    historicalBasis: 'Hertle\'s research on the Stasi files confirms that the security apparatus was prepared for violence on October 9. The peaceful outcome was not inevitable; it depended on specific decisions by local officials who chose restraint.',
  },
  {
    id: 'gorbachev',
    title: 'What If Gorbachev Had Been Overthrown in 1987?',
    icon: '\u2620',
    premise: 'Suppose Soviet hardliners had successfully removed Gorbachev before perestroika weakened central control, replacing him with a neo-Brezhnevite leader.',
    analysis: 'A hardline successor would have faced the same structural problems Gorbachev confronted \— economic stagnation, technological backwardness, imperial overstretch \— but would have addressed them through repression rather than reform. The Brezhnev Doctrine would have been reaffirmed. Eastern European reform movements would have been crushed, as Hungary was in 1956 and Czechoslovakia in 1968. The Berlin Wall would have stood. But the fundamental economic trajectory would not have changed: the Soviet system was structurally incapable of competing with the West technologically. The wall might have lasted another decade, but the underlying pressures would have continued to build.',
    implications: [
      'Eastern European reform movements suppressed through force or threat of force',
      'The Berlin Wall stands through the 1990s, possibly into the 2000s',
      'Economic stagnation deepens \— the Soviet system was running out of options regardless of leadership',
      'When collapse eventually comes, it is more sudden and potentially violent \— no managed transition',
      'The Soviet Union may fragment along ethnic lines in a more chaotic scenario than the actual 1991 dissolution',
    ],
    historicalBasis: 'The 1991 coup attempt shows that hardliners existed and were willing to act. The question is whether an earlier, more organized coup \— before Gorbachev had weakened the security apparatus through glasnost \— could have succeeded. Most historians believe it could have.',
  },
];

// ── Pressure Timeline Data (SVG visualization) ───────────────────────
const PRESSURE_EVENTS = [
  { year: 1945, month: 5, pressure: 30, label: 'Allied Occupation Begins', side: 'both', detail: 'Four-power control established. Berlin divided into sectors. Cooperation still expected. Pressure is administrative, not military.' },
  { year: 1948, month: 6, pressure: 85, label: 'Berlin Blockade', side: 'soviet', detail: 'Stalin cuts road/rail access. 2.5M Berliners face starvation. Truman faces the defining decision: airlift, ground convoy (risk of war), or abandon Berlin. The airlift delivers 2.3M tons over 15 months.' },
  { year: 1949, month: 5, pressure: 45, label: 'Blockade Lifted', side: 'both', detail: 'Stalin backs down. NATO founded. Two Germanys established. The crisis proves Western resolve but hardens the division.' },
  { year: 1953, month: 6, pressure: 65, label: 'East German Uprising', side: 'east', detail: 'Workers revolt. Soviet tanks crush the uprising. 55 dead. The DDR learns: the Wall is needed not to keep Westerners out but to keep East Germans in.' },
  { year: 1958, month: 11, pressure: 75, label: 'Khrushchev Ultimatum', side: 'soviet', detail: 'Demands Western withdrawal from Berlin within 6 months. Eisenhower refuses. The ultimatum expires without action \— but the refugee crisis accelerates. 3.5M have fled East.' },
  { year: 1961, month: 8, pressure: 95, label: 'Wall Construction', side: 'east', detail: 'Aug 13, 3AM: barbed wire goes up. Within days, concrete. Families separated. The world holds its breath. Kennedy says "a wall is better than a war."' },
  { year: 1961, month: 10, pressure: 90, label: 'Checkpoint Charlie Standoff', side: 'both', detail: 'US and Soviet tanks face each other at 100 meters. 16 hours. One miscalculation = WWIII. Backchannel diplomacy (RFK-Bolshakov) de-escalates.' },
  { year: 1962, month: 10, pressure: 70, label: 'Cuban Missile Crisis (spillover)', side: 'both', detail: 'Berlin is the secondary pressure point. Khrushchev considers trading Cuba for Berlin. Kennedy refuses to link them. Berlin pressure drops as Cuba dominates attention.' },
  { year: 1963, month: 6, pressure: 55, label: 'Kennedy "Ich bin ein Berliner"', side: 'west', detail: 'Symbolic solidarity. No policy change. But the speech signals: the West will not abandon Berlin. Pressure stabilizes into the new normal.' },
  { year: 1971, month: 9, pressure: 40, label: 'Four Power Agreement', side: 'both', detail: 'Access rights formalized. Transit guaranteed. The Wall remains but movement rules are codified. Detente lowers temperature.' },
  { year: 1972, month: 12, pressure: 35, label: 'Basic Treaty (Ostpolitik)', side: 'both', detail: 'Brandt\'s "change through rapprochement." West Germany recognizes DDR. Diplomatic normalization. Pressure at its lowest since 1948.' },
  { year: 1983, month: 11, pressure: 60, label: 'Able Archer / Pershing II', side: 'both', detail: 'NATO exercise nearly triggers Soviet nuclear launch. Pershing II missiles deployed in Europe. The Doomsday Clock moves to 3 minutes. Berlin pressure rises with global tension.' },
  { year: 1987, month: 6, pressure: 45, label: 'Reagan "Tear Down This Wall"', side: 'west', detail: 'State Dept tried to remove the line. Reagan kept it. Gorbachev hears it. The speech is performative but prescient \— the Wall falls 29 months later.' },
  { year: 1989, month: 11, pressure: 30, label: 'The Wall Falls', side: 'both', detail: 'Nov 9. Schabowski\'s press conference gaffe: "immediately, without delay." Crowds surge. Guards stand down. No shot fired. The most consequential accident in Cold War history.' },
];

const PRESSURE_ANNOTATIONS = [
  { startYear: 1948, endYear: 1949, label: 'Berlin Blockade', color: 'rgba(204,56,56,.15)' },
  { startYear: 1958, endYear: 1962, label: 'Berlin Crisis', color: 'rgba(204,160,48,.15)' },
  { startYear: 1969, endYear: 1975, label: 'Detente', color: 'rgba(48,160,204,.15)' },
  { startYear: 1979, endYear: 1985, label: 'Second Cold War', color: 'rgba(204,56,56,.10)' },
];

// ── Scholarly micro-content ──────────────────────────────────────
const B_TIPS = {
  tunnel: "Between 1961 and 1989, at least 70 escape tunnels were dug under the Berlin Wall, though most were discovered before completion. Tunnel 57, dug in 1964 by a group led by engineering students, was the longest at 145 meters and ran 12 meters deep. It enabled 57 people to escape in two nights before an East German informant betrayed it. The most famous tunnel operation was not an escape but an intelligence operation: the CIA/MI6 'Berlin Tunnel' (Operation Gold/Stopwatch, 1953-1956) tapped Soviet military communications from a tunnel running from the American sector into East Berlin. The KGB knew about the tunnel from the start -- their mole George Blake had revealed it -- but let it operate for 11 months to protect Blake's cover. The intelligence collected was voluminous but strategically compromised.",
  stasi: "The Ministry for State Security (Ministerium fur Staatssicherheit, or Stasi) employed 91,000 full-time staff and maintained approximately 189,000 unofficial collaborators (Inoffizielle Mitarbeiter, or IMs) -- roughly 1 in 63 East German citizens was reporting to state security. By comparison, the Gestapo operated with about 1 agent per 2,000 citizens. The Stasi's surveillance was not merely extensive but psychologically sophisticated: their 'Zersetzung' (decomposition) program used gaslighting techniques -- rearranging furniture, making anonymous phone calls, spreading rumors -- to psychologically destroy dissidents without creating martyrs. After reunification, the Stasi archives contained over 111 kilometers of files. The records revealed that trust had been systematically weaponized: spouses had reported on spouses, children on parents.",
  checkpoint_charlie: "On October 27, 1961, Soviet and American tanks faced each other across Checkpoint Charlie at a distance of approximately 100 meters for 16 hours -- the closest the Cold War came to direct shooting war in Europe. The crisis began when East German border guards refused to allow a US diplomat to cross without showing his passport, violating the Four Power Agreement that guaranteed unimpeded Allied access. General Lucius Clay, JFK's personal representative in Berlin, sent military police escorts with tanks. Khrushchev responded with Soviet T-55 tanks. The standoff was resolved through a backchannel: Bobby Kennedy contacted a Soviet intelligence officer (Georgi Bolshakov), and both sides agreed to withdraw one tank at a time in alternating sequence. The choreography of de-escalation was as carefully staged as the confrontation.",
  glienicke: "The Glienicke Bridge connecting West Berlin to Potsdam became the stage for Cold War's most theatrical spy swaps. The February 1962 exchange of U-2 pilot Francis Gary Powers for Soviet master spy Rudolf Abel (real name Vilyam Fisher) established the template: each side walked its released prisoner to the center line simultaneously, confirming identity before completing the exchange. The bridge was chosen precisely because it connected two worlds -- American-sector West Berlin and Soviet-controlled East Germany -- while being remote enough to control press access. The 1986 exchange of Natan Sharansky (Soviet dissident) for Karl Koecher (Czech spy) was the last major Glienicke swap. These exchanges served multiple functions beyond the obvious: they demonstrated that even adversaries maintained channels of communication, they created personal relationships between intelligence officers who negotiated the terms, and they reinforced the fiction that espionage operated under gentlemen's rules.",
};

// ── Component ───────────────────────────────────────────────────────
function BerlinView({ setView }) {
  const [mode, setMode] = useState('phases');
  const [tipId, setTipId] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [expandedIntel, setExpandedIntel] = useState(null);
  const [expandedCF, setExpandedCF] = useState(null);
  const [revealedAnalyses, setRevealedAnalyses] = useState({});
  const [selectedPressureEvt, setSelectedPressureEvt] = useState(null);
  const topRef = useRef(null);

  // ── Scholarly tooltip renderer & icons ─────────────────────────
  const TipBox = (key) => {
    if (tipId !== key) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(8,9,14,.94)', border: '1px solid rgba(96,112,144,.18)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(200,204,216,.65)', lineHeight: 1.65, margin: '6px 0 10px' }}>
        {B_TIPS[key]}
      </div>
    );
  };

  const TunnelIcon = (
    <svg width={24} height={20} viewBox="0 0 24 20" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'tunnel' ? null : 'tunnel')}>
      <rect x={2} y={2} width={8} height={16} rx={1} fill="none" stroke="currentColor" strokeWidth=".8" />
      <rect x={14} y={2} width={8} height={16} rx={1} fill="none" stroke="currentColor" strokeWidth=".8" />
      <path d="M10 14 Q12 16 14 14" fill="none" stroke="currentColor" strokeWidth=".6" strokeDasharray="1.5 1" />
      <line x1={10} y1={10} x2={14} y2={10} stroke="currentColor" strokeWidth=".5" strokeDasharray="1 1" />
    </svg>
  );

  const StasiIcon = (
    <svg width={22} height={22} viewBox="0 0 22 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'stasi' ? null : 'stasi')}>
      <circle cx={11} cy={8} r={4} fill="none" stroke="currentColor" strokeWidth=".8" />
      <path d="M4 20 Q4 14 11 14 Q18 14 18 20" fill="none" stroke="currentColor" strokeWidth=".8" />
      <circle cx={11} cy={8} r={1.5} fill="currentColor" fillOpacity=".15" />
      <line x1={7} y1={8} x2={4} y2={5} stroke="currentColor" strokeWidth=".4" />
      <line x1={15} y1={8} x2={18} y2={5} stroke="currentColor" strokeWidth=".4" />
    </svg>
  );

  const TankIcon = (
    <svg width={28} height={18} viewBox="0 0 28 18" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'checkpoint_charlie' ? null : 'checkpoint_charlie')}>
      <rect x={4} y={8} width={20} height={6} rx={2} fill="none" stroke="currentColor" strokeWidth=".8" />
      <rect x={8} y={4} width={10} height={4} rx={1} fill="none" stroke="currentColor" strokeWidth=".7" />
      <line x1={18} y1={6} x2={26} y2={6} stroke="currentColor" strokeWidth=".8" />
      <circle cx={8} cy={16} r={2} fill="none" stroke="currentColor" strokeWidth=".5" />
      <circle cx={14} cy={16} r={2} fill="none" stroke="currentColor" strokeWidth=".5" />
      <circle cx={20} cy={16} r={2} fill="none" stroke="currentColor" strokeWidth=".5" />
    </svg>
  );

  const BridgeIcon = (
    <svg width={26} height={18} viewBox="0 0 26 18" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'glienicke' ? null : 'glienicke')}>
      <path d="M2 14 Q7 4 13 4 Q19 4 24 14" fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={2} y1={14} x2={24} y2={14} stroke="currentColor" strokeWidth=".6" />
      <line x1={7} y1={9} x2={7} y2={14} stroke="currentColor" strokeWidth=".4" />
      <line x1={13} y1={4} x2={13} y2={14} stroke="currentColor" strokeWidth=".4" strokeDasharray="1.5 1" />
      <line x1={19} y1={9} x2={19} y2={14} stroke="currentColor" strokeWidth=".4" />
    </svg>
  );

  const toggleAnalysis = useCallback((id) => {
    setRevealedAnalyses(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleIntel = useCallback((id) => {
    setExpandedIntel(prev => prev === id ? null : id);
  }, []);

  const toggleCF = useCallback((id) => {
    setExpandedCF(prev => prev === id ? null : id);
  }, []);

  const revealedCount = useMemo(
    () => Object.values(revealedAnalyses).filter(Boolean).length,
    [revealedAnalyses],
  );

  // ── Pressure Gauge Visual ───────────────────────────────────────
  const PressureGauge = useCallback(({ level }) => {
    const color = level > 80 ? C.red : level > 50 ? C.gold : C.green;
    const colorDm = level > 80 ? C.redDm : level > 50 ? C.goldDm : C.greenDm;
    const label = level > 80 ? 'CRITICAL' : level > 50 ? 'ELEVATED' : 'STABLE';
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
      }}>
        <span style={{
          fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
          color: C.tx3,
        }}>
          CRISIS PRESSURE
        </span>
        <div style={{
          flex: 1, maxWidth: 200, height: 6,
          background: C.line, borderRadius: 3, overflow: 'hidden',
        }}>
          <div style={{
            width: level + '%', height: '100%', borderRadius: 3,
            background: color, transition: 'width .5s ease',
          }} />
        </div>
        <span style={{
          fontFamily: Mono, fontSize: 12, fontWeight: 600,
          color: colorDm, letterSpacing: '.04em',
        }}>
          {level}% {label}
        </span>
      </div>
    );
  }, []);

  // ── Mode Switch ─────────────────────────────────────────────────
  const ModeSwitch = useCallback(() => {
    const modes = [
      { id: 'phases', label: 'Phases', desc: '5 Strategic Periods' },
      { id: 'intelligence', label: 'Intelligence', desc: '5 Espionage Ops' },
      { id: 'counterfactuals', label: 'Counterfactuals', desc: '4 Divergences' },
      { id: 'pressure', label: 'Pressure Graph', desc: '14 Events, 1945\u201389' },
    ];
    return (
      <div>
        <BarbedWireSVG />
        <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
          {modes.map((m, mi) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              style={{
                flex: 1, padding: '10px 12px', borderRadius: 0, cursor: 'pointer',
                background: mode === m.id ? 'rgba(112,128,144,.1)' : 'transparent',
                border: '2px solid ' + (mode === m.id ? 'rgba(112,128,144,.3)' : 'rgba(100,105,115,.1)'),
                borderLeft: mi > 0 ? 'none' : undefined,
                textAlign: 'center', transition: 'all .15s ease',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 10, fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                color: mode === m.id ? C.accent : C.tx3, display: 'block',
              }}>
                {m.label}
              </span>
              <span style={{ fontFamily: Mono, fontSize: 10, color: C.tx3 }}>{m.desc}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }, [mode]);

  // ── Phases Renderer ─────────────────────────────────────────────
  const renderPhases = useCallback(() => {
    const phase = PHASES[selectedPhase];
    const isRevealed = revealedAnalyses[phase.id];
    return (
      <div>
        {/* Phase selector tabs — checkpoint signage style */}
        <div style={{
          display: 'flex', gap: 0, marginBottom: 20, overflowX: 'auto',
          paddingBottom: 4,
        }}>
          {PHASES.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(i)}
              style={{
                flex: '0 0 auto', padding: '8px 14px', borderRadius: 0, cursor: 'pointer',
                background: i === selectedPhase ? 'rgba(112,128,144,.1)' : 'transparent',
                border: '2px solid ' + (i === selectedPhase ? 'rgba(112,128,144,.3)' : 'rgba(100,105,115,.1)'),
                borderLeft: i > 0 ? 'none' : undefined,
                transition: 'all .12s ease', whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 10, fontWeight: 700,
                letterSpacing: '.08em', textTransform: 'uppercase',
                color: i === selectedPhase ? C.accent : C.tx3,
                display: 'block',
              }}>
                {p.era}
              </span>
              <span style={{
                fontFamily: Mono, fontSize: 10,
                color: i === selectedPhase ? C.tx2 : C.tx3,
              }}>
                {p.title}
              </span>
            </button>
          ))}
        </div>

        {/* Phase briefing card — brutalist concrete */}
        <div style={{
          background: 'rgba(22,24,30,.95)', border: '3px solid rgba(100,105,115,.2)',
          borderRadius: 0, padding: 28, marginBottom: 16,
          boxShadow: '4px 4px 0 rgba(0,0,0,.2)',
          position: 'relative',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 16 }}>
            <StencilHeader color={C.accentDm}>
              Phase {phase.num} // {phase.era}
            </StencilHeader>
            <h2 style={{
              fontFamily: Mono, fontSize: 24, fontWeight: 900,
              color: C.tx, marginBottom: 6, letterSpacing: '.04em',
              textTransform: 'uppercase',
              textShadow: '1px 1px 0 rgba(0,0,0,.3)',
            }}>
              {phase.title}
            </h2>
            <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.65 }}>
              {phase.subtitle}
            </div>
          </div>

          <PressureGauge level={phase.pressureLevel} />

          {/* Dual strategic analysis */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16, marginBottom: 24,
          }}>
            {/* Soviet calculus — cold blue-gray tint (EAST) */}
            <div style={{
              background: C.eastBg, borderRadius: 0, padding: '14px 18px',
              border: '2px solid ' + C.eastDm,
              borderLeft: '4px solid ' + C.east,
              boxShadow: '2px 2px 0 rgba(0,0,0,.15)',
            }}>
              <StencilHeader color={C.east}>
                SOVIET / EAST GERMAN CALCULUS
              </StencilHeader>
              <div style={{
                fontFamily: Serif, fontSize: 13, color: '#b0bcc8', lineHeight: 1.75,
              }}>
                {phase.sovietCalc}
              </div>
            </div>

            {/* Western calculus — warmer tint (WEST) */}
            <div style={{
              background: C.westBg, borderRadius: 0, padding: '14px 18px',
              border: '2px solid ' + C.westDm,
              borderLeft: '4px solid ' + C.west,
              boxShadow: '2px 2px 0 rgba(0,0,0,.15)',
            }}>
              <StencilHeader color={C.west}>
                WESTERN / US CALCULUS
              </StencilHeader>
              <div style={{
                fontFamily: Serif, fontSize: 13, color: '#c8c0b4', lineHeight: 1.75,
              }}>
                {phase.westernCalc}
              </div>
            </div>
          </div>

          {/* Decision points */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
              color: C.gold, marginBottom: 10, fontWeight: 600,
            }}>
              KEY DECISION POINTS
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {(phase.decisionPoints || []).map((dp, i) => (
                <li key={i} style={{
                  fontFamily: Sans, fontSize: 12, color: C.tx2,
                  lineHeight: 1.65, padding: '6px 0 6px 16px',
                  borderLeft: '2px solid ' + C.goldDm,
                  marginBottom: 4,
                }}>
                  {dp}
                </li>
              ))}
            </ul>
          </div>

          {/* Reveal intel dimension */}
          {!isRevealed ? (
            <button
              onClick={() => toggleAnalysis(phase.id)}
              style={{
                width: '100%', padding: '14px 20px', borderRadius: 6,
                background: C.accentBg, border: '1px solid ' + C.accentDm,
                color: C.accent, fontFamily: Mono, fontSize: 12,
                letterSpacing: '.04em', cursor: 'pointer',
                transition: 'all .15s ease',
              }}
            >
              REVEAL INTELLIGENCE DIMENSION
            </button>
          ) : (
            <div>
              <div style={{
                fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
                color: C.green, marginBottom: 8, fontWeight: 600,
              }}>
                INTELLIGENCE DIMENSION
              </div>
              <div style={{
                fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
                paddingLeft: 16, borderLeft: '3px solid ' + C.greenDm,
                marginBottom: 20,
              }}>
                {phase.intelDimension}
              </div>

              {/* Quote */}
              <div style={{
                fontStyle: 'italic', fontFamily: Serif, fontSize: 13,
                color: C.tx2, lineHeight: 1.7, paddingLeft: 16,
                borderLeft: '2px solid ' + C.line, marginBottom: 4,
              }}>
                {phase.quote}
              </div>
              <div style={{
                fontFamily: Mono, fontSize: 11, color: C.tx3,
                paddingLeft: 16, letterSpacing: '.03em',
              }}>
                {'\— '}{phase.quoteSource}
              </div>
            </div>
          )}
        </div>

        {/* Phase progress */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: Mono, fontSize: 12, color: C.tx3,
        }}>
          <span>INTEL REVEALED</span>
          <div style={{
            flex: 1, maxWidth: 160, height: 4,
            background: C.line, borderRadius: 2,
          }}>
            <div style={{
              width: (revealedCount / 5 * 100) + '%',
              height: '100%', borderRadius: 2,
              background: revealedCount === 5 ? C.green : C.accent,
              transition: 'width .3s ease',
            }} />
          </div>
          <span style={{
            color: revealedCount === 5 ? C.green : C.accent,
          }}>
            {revealedCount}/5
          </span>
        </div>
      </div>
    );
  }, [selectedPhase, revealedAnalyses, revealedCount, toggleAnalysis, PressureGauge]);

  // ── Intelligence Renderer ─────────────────────────────────────────
  const renderIntelligence = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          ESPIONAGE OPERATIONS BOARD \— 5 INTELLIGENCE CASES{TunnelIcon}{StasiIcon}
        </div>
        {TipBox('tunnel')}
        {TipBox('stasi')}
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          Berlin was the espionage capital of the Cold War. Both superpowers operated
          massive intelligence stations, and the divided city created unique conditions
          for human intelligence, signals interception, and covert operations that defined
          the craft of espionage for a generation.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {INTEL_OPS.map(op => {
            const isOpen = expandedIntel === op.id;
            return (
              <div
                key={op.id}
                style={{
                  background: C.card,
                  border: '2px solid ' + (isOpen ? C.accentDm : C.cardBd),
                  borderRadius: 0, overflow: 'hidden',
                  transition: 'border-color .15s ease',
                  boxShadow: '3px 3px 0 rgba(0,0,0,.15)',
                }}
              >
                <button
                  onClick={() => toggleIntel(op.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 24, width: 44, height: 44,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.accentBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                  }}>
                    {op.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                      color: C.accentDm, marginBottom: 2,
                    }}>
                      {op.category} \— {op.year}
                    </div>
                    <div style={{
                      fontFamily: Serif, fontSize: 17, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {op.name}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: Mono, fontSize: 14, color: C.tx3,
                    transition: 'transform .15s ease',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                  }}>
                    \u25B6
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px',
                    borderTop: '1px solid ' + C.line,
                    paddingTop: 16,
                  }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 14, color: C.tx,
                      lineHeight: 1.75, marginBottom: 16,
                    }}>
                      {op.summary}
                    </div>

                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.tx3, marginBottom: 8,
                    }}>
                      OPERATIONAL DETAILS
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                      {(op.details || []).map((d, i) => (
                        <li key={i} style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx2,
                          lineHeight: 1.65, padding: '4px 0 4px 16px',
                          borderLeft: '2px solid ' + C.line,
                          marginBottom: 4,
                        }}>
                          {d}
                        </li>
                      ))}
                    </ul>

                    <div style={{
                      background: C.accentBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.accentDm, marginBottom: 6,
                      }}>
                        INTELLIGENCE SIGNIFICANCE
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.accent,
                        lineHeight: 1.7,
                      }}>
                        {op.significance}
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
  }, [expandedIntel, toggleIntel]);

  // ── Counterfactuals Renderer ───────────────────────────────────────
  const renderCounterfactuals = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          COUNTERFACTUAL ANALYSIS \— 4 HISTORICAL DIVERGENCES{TankIcon}{BridgeIcon}
        </div>
        {TipBox('checkpoint_charlie')}
        {TipBox('glienicke')}
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          Counterfactual reasoning is not idle speculation \— it reveals which decisions
          actually mattered by examining what would have changed if they had gone differently.
          Each scenario below identifies a decision point and traces its consequences through
          the strategic logic of the Cold War.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {COUNTERFACTUALS.map(cf => {
            const isOpen = expandedCF === cf.id;
            return (
              <div
                key={cf.id}
                style={{
                  background: C.card,
                  border: '2px solid ' + (isOpen ? C.goldDm : C.cardBd),
                  borderRadius: 0, overflow: 'hidden',
                  transition: 'border-color .15s ease',
                  boxShadow: '3px 3px 0 rgba(0,0,0,.15)',
                }}
              >
                <button
                  onClick={() => toggleCF(cf.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 24, width: 44, height: 44,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.goldBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                  }}>
                    {cf.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 16, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {cf.title}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: Mono, fontSize: 14, color: C.tx3,
                    transition: 'transform .15s ease',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                  }}>
                    \u25B6
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px',
                    borderTop: '1px solid ' + C.line,
                    paddingTop: 16,
                  }}>
                    {/* Premise */}
                    <div style={{
                      background: C.goldBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line, marginBottom: 16,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.goldDm, marginBottom: 6,
                      }}>
                        PREMISE
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.gold,
                        lineHeight: 1.7, fontStyle: 'italic',
                      }}>
                        {cf.premise}
                      </div>
                    </div>

                    {/* Analysis */}
                    <div style={{
                      fontFamily: Serif, fontSize: 14, color: C.tx,
                      lineHeight: 1.75, marginBottom: 16,
                    }}>
                      {cf.analysis}
                    </div>

                    {/* Implications */}
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.tx3, marginBottom: 8,
                    }}>
                      STRATEGIC IMPLICATIONS
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                      {(cf.implications || []).map((imp, i) => (
                        <li key={i} style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx2,
                          lineHeight: 1.65, padding: '4px 0 4px 16px',
                          borderLeft: '2px solid ' + C.goldDm,
                          marginBottom: 4,
                        }}>
                          {imp}
                        </li>
                      ))}
                    </ul>

                    {/* Historical basis */}
                    <div style={{
                      background: C.accentBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.accentDm, marginBottom: 6,
                      }}>
                        EVIDENTIAL BASIS
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.accent,
                        lineHeight: 1.7,
                      }}>
                        {cf.historicalBasis}
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
  }, [expandedCF, toggleCF]);

  // ── Pressure Graph Renderer (SVG) ─────────────────────────────────
  const renderPressureGraph = useCallback(() => {
    // SVG dimensions
    const W = 860, H = 400;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const plotW = W - margin.left - margin.right;
    const plotH = H - margin.top - margin.bottom;
    const minYear = 1945, maxYear = 1990;
    const yearSpan = maxYear - minYear;

    // Map data to SVG coordinates
    const toX = (year, month) => margin.left + ((year + (month - 1) / 12 - minYear) / yearSpan) * plotW;
    const toY = (pressure) => margin.top + plotH - (pressure / 100) * plotH;

    // Build smooth Catmull-Rom path through pressure points
    const pts = PRESSURE_EVENTS.map(e => ({ x: toX(e.year, e.month), y: toY(e.pressure) }));

    // Catmull-Rom to cubic Bezier conversion helper
    const catmullRomToBezier = (points) => {
      if (points.length < 2) return '';
      const result = ['M ' + points[0].x + ' ' + points[0].y];
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(i - 1, 0)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(i + 2, points.length - 1)];
        const alpha = 0.5;
        const cp1x = p1.x + (p2.x - p0.x) / (6 * alpha);
        const cp1y = p1.y + (p2.y - p0.y) / (6 * alpha);
        const cp2x = p2.x - (p3.x - p1.x) / (6 * alpha);
        const cp2y = p2.y - (p3.y - p1.y) / (6 * alpha);
        result.push('C ' + cp1x + ' ' + cp1y + ', ' + cp2x + ' ' + cp2y + ', ' + p2.x + ' ' + p2.y);
      }
      return result.join(' ');
    };

    const linePath = catmullRomToBezier(pts);
    // Area path: line path + close to baseline
    const areaPath = linePath + ' L ' + pts[pts.length - 1].x + ' ' + (margin.top + plotH) + ' L ' + pts[0].x + ' ' + (margin.top + plotH) + ' Z';

    // Event marker sizing
    const getMarkerRadius = (evt) => {
      if (evt.pressure >= 90) return 8;
      if (evt.pressure >= 70) return 6.5;
      return 5;
    };
    const getSideColor = (side) => {
      if (side === 'soviet' || side === 'east') return C.red;
      if (side === 'west') return C.west;
      return C.tx2;
    };
    const getSideColorDm = (side) => {
      if (side === 'soviet' || side === 'east') return C.redDm;
      if (side === 'west') return C.westDm;
      return C.tx3;
    };

    const selEvt = selectedPressureEvt !== null ? PRESSURE_EVENTS[selectedPressureEvt] : null;

    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          COLD WAR ESCALATION TIMELINE \— BERLIN PRESSURE INDEX 1945\u20131989
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          An area chart of tension levels across the Berlin Wall era. Click any event
          marker to reveal strategic context. Color bands mark sustained crisis periods.
          The dashed line at 80 marks the crisis threshold \— the point where miscalculation
          risks nuclear escalation.
        </div>

        {/* SVG Chart */}
        <div style={{
          background: C.card, border: '2px solid ' + C.cardBd,
          borderRadius: 0, padding: '20px 10px 16px', marginBottom: 16,
          overflowX: 'auto', boxShadow: '3px 3px 0 rgba(0,0,0,.15)',
        }}>
          <svg
            viewBox={'0 0 ' + W + ' ' + H}
            width="100%"
            style={{ display: 'block', maxWidth: W, margin: '0 auto' }}
          >
            <defs>
              {/* Vertical gradient for area fill: green(bottom) -> amber(mid) -> red(top) */}
              <linearGradient id="pressureGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={C.green} stopOpacity="0.05" />
                <stop offset="35%" stopColor={C.green} stopOpacity="0.15" />
                <stop offset="50%" stopColor={C.gold} stopOpacity="0.25" />
                <stop offset="80%" stopColor={C.red} stopOpacity="0.30" />
                <stop offset="100%" stopColor={C.red} stopOpacity="0.45" />
              </linearGradient>
              {/* Glow filter for selected marker */}
              <filter id="markerGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Annotation bands */}
            {PRESSURE_ANNOTATIONS.map((a, i) => {
              const x1 = toX(a.startYear, 1);
              const x2 = toX(a.endYear, 12);
              return (
                <g key={'ann-' + i}>
                  <rect
                    x={x1} y={margin.top} width={x2 - x1} height={plotH}
                    fill={a.color}
                  />
                  <text
                    x={(x1 + x2) / 2} y={margin.top + 14}
                    textAnchor="middle"
                    style={{
                      fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
                      fill: C.tx3, opacity: 0.7,
                    }}
                  >
                    {a.label.toUpperCase()}
                  </text>
                </g>
              );
            })}

            {/* Grid lines (horizontal) */}
            {[0, 20, 40, 60, 80, 100].map(v => (
              <g key={'grid-' + v}>
                <line
                  x1={margin.left} y1={toY(v)} x2={margin.left + plotW} y2={toY(v)}
                  stroke={C.line} strokeWidth={v === 80 ? 0 : 0.5}
                />
                {/* Y-axis labels */}
                <text
                  x={margin.left - 8} y={toY(v) + 3}
                  textAnchor="end"
                  style={{ fontFamily: Mono, fontSize: 11, fill: C.tx3 }}
                >
                  {v}
                </text>
              </g>
            ))}

            {/* Crisis threshold dashed line at 80 */}
            <line
              x1={margin.left} y1={toY(80)} x2={margin.left + plotW} y2={toY(80)}
              stroke={C.red} strokeWidth={1} strokeDasharray="6 4" opacity={0.5}
            />
            <text
              x={margin.left + plotW + 4} y={toY(80) + 3}
              style={{ fontFamily: Mono, fontSize: 12, fill: C.red, opacity: 0.7 }}
            >
              CRISIS
            </text>

            {/* X-axis labels (every 5 years) */}
            {[1945, 1950, 1955, 1960, 1965, 1970, 1975, 1980, 1985, 1990].map(yr => (
              <g key={'xlab-' + yr}>
                <line
                  x1={toX(yr, 1)} y1={margin.top + plotH}
                  x2={toX(yr, 1)} y2={margin.top + plotH + 6}
                  stroke={C.tx3} strokeWidth={0.5}
                />
                <text
                  x={toX(yr, 1)} y={margin.top + plotH + 20}
                  textAnchor="middle"
                  style={{ fontFamily: Mono, fontSize: 12, fill: C.tx3 }}
                >
                  {yr}
                </text>
              </g>
            ))}

            {/* Y-axis title */}
            <text
              x={14} y={margin.top + plotH / 2}
              textAnchor="middle"
              transform={'rotate(-90, 14, ' + (margin.top + plotH / 2) + ')'}
              style={{ fontFamily: Mono, fontSize: 11, fill: C.tx3, letterSpacing: '.06em' }}
            >
              TENSION LEVEL
            </text>

            {/* X-axis title */}
            <text
              x={margin.left + plotW / 2} y={H - 6}
              textAnchor="middle"
              style={{ fontFamily: Mono, fontSize: 11, fill: C.tx3, letterSpacing: '.06em' }}
            >
              YEAR
            </text>

            {/* Area fill */}
            <path d={areaPath} fill="url(#pressureGrad)" />

            {/* Pressure line */}
            <path d={linePath} fill="none" stroke={C.accent} strokeWidth={2} opacity={0.8} />

            {/* Event markers */}
            {PRESSURE_EVENTS.map((evt, i) => {
              const cx = toX(evt.year, evt.month);
              const cy = toY(evt.pressure);
              const r = getMarkerRadius(evt);
              const col = getSideColor(evt.side);
              const isSelected = selectedPressureEvt === i;
              return (
                <g
                  key={'evt-' + i}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPressureEvt(isSelected ? null : i)}
                >
                  {/* Hover/select ring */}
                  <circle
                    cx={cx} cy={cy} r={r + 4}
                    fill="transparent" stroke={isSelected ? col : 'transparent'}
                    strokeWidth={1.5} opacity={0.6}
                  />
                  {/* Marker */}
                  <circle
                    cx={cx} cy={cy} r={r}
                    fill={isSelected ? col : getSideColorDm(evt.side)}
                    stroke={col} strokeWidth={1.5}
                    filter={isSelected ? 'url(#markerGlow)' : undefined}
                  />
                  {/* Year label (only for selected or high-pressure) */}
                  {(isSelected || evt.pressure >= 85) && (
                    <text
                      x={cx} y={cy - r - 6}
                      textAnchor="middle"
                      style={{
                        fontFamily: Mono, fontSize: 12,
                        fill: isSelected ? col : C.tx3,
                        fontWeight: isSelected ? 600 : 400,
                      }}
                    >
                      {evt.year}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Axes */}
            <line
              x1={margin.left} y1={margin.top}
              x2={margin.left} y2={margin.top + plotH}
              stroke={C.tx3} strokeWidth={0.5}
            />
            <line
              x1={margin.left} y1={margin.top + plotH}
              x2={margin.left + plotW} y2={margin.top + plotH}
              stroke={C.tx3} strokeWidth={0.5}
            />
          </svg>

          {/* Legend */}
          <div style={{
            display: 'flex', gap: 16, justifyContent: 'center',
            marginTop: 12, flexWrap: 'wrap',
          }}>
            {[
              { color: C.red, label: 'Soviet / East German action' },
              { color: C.west, label: 'Western / US action' },
              { color: C.tx2, label: 'Bilateral / Mutual' },
            ].map(leg => (
              <div key={leg.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
                  background: leg.color, border: '1px solid ' + leg.color,
                }} />
                <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>{leg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected event detail card */}
        {selEvt && (
          <div style={{
            background: C.card, border: '2px solid ' + getSideColorDm(selEvt.side),
            borderRadius: 0, padding: 24, marginBottom: 16,
            transition: 'all .2s ease', boxShadow: '3px 3px 0 rgba(0,0,0,.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
              <span style={{
                fontFamily: Mono, fontSize: 11, fontWeight: 700,
                color: getSideColor(selEvt.side), letterSpacing: '.04em',
              }}>
                {selEvt.year}
              </span>
              <span style={{
                fontFamily: Serif, fontSize: 20, fontWeight: 700, color: C.tx,
                letterSpacing: '-.02em',
              }}>
                {selEvt.label}
              </span>
              <span style={{
                fontFamily: Mono, fontSize: 12, color: C.tx3, marginLeft: 'auto',
              }}>
                PRESSURE: {selEvt.pressure}/100
              </span>
            </div>
            <div style={{
              display: 'flex', gap: 8, marginBottom: 14,
            }}>
              <span style={{
                fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                color: getSideColor(selEvt.side),
                background: selEvt.side === 'soviet' || selEvt.side === 'east' ? C.redBg
                  : selEvt.side === 'west' ? C.accentBg : 'rgba(136,144,168,.08)',
                padding: '2px 8px', borderRadius: 3,
                border: '1px solid ' + getSideColorDm(selEvt.side),
              }}>
                {selEvt.side === 'soviet' ? 'SOVIET ACTION'
                  : selEvt.side === 'east' ? 'EAST GERMAN ACTION'
                  : selEvt.side === 'west' ? 'WESTERN ACTION'
                  : 'BILATERAL'}
              </span>
              <span style={{
                fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                color: selEvt.pressure > 80 ? C.red : selEvt.pressure > 50 ? C.gold : C.green,
                background: selEvt.pressure > 80 ? C.redBg : selEvt.pressure > 50 ? C.goldBg : C.greenBg,
                padding: '2px 8px', borderRadius: 3,
                border: '1px solid ' + (selEvt.pressure > 80 ? C.redDm : selEvt.pressure > 50 ? C.goldDm : C.greenDm),
              }}>
                {selEvt.pressure > 80 ? 'CRITICAL' : selEvt.pressure > 50 ? 'ELEVATED' : 'STABLE'}
              </span>
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.8,
            }}>
              {selEvt.detail}
            </div>
          </div>
        )}

        {/* Key insight panel */}
        <div style={{
          background: C.accentBg, border: '1px solid ' + C.accentDm,
          borderRadius: 8, padding: '18px 22px',
        }}>
          <div style={{
            fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
            color: C.accentDm, marginBottom: 8,
          }}>
            KEY INSIGHT
          </div>
          <div style={{
            fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.8,
          }}>
            The Berlin Wall existed for 28 years. For 26 of those years, pressure was{' '}
            <span style={{ color: C.accent, fontWeight: 600 }}>BELOW</span> the crisis
            threshold. The Wall was not a permanent crisis \— it was a stabilized
            abnormality. The danger came at transition points (construction, Checkpoint
            Charlie), not during the Wall's existence. The graph reveals a pattern:
            each spike was followed by a negotiated descent, and the oscillation damped
            over time as both sides learned the rules of coexistence. By 1972, the
            pressure settled into a low-grade equilibrium that held for over a decade
            \— until Gorbachev changed the underlying variables.
          </div>
        </div>
      </div>
    );
  }, [selectedPressureEvt]);

  // ── Main Render ─────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: C.bg,
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(100,105,115,.04) 39px, rgba(100,105,115,.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(100,105,115,.04) 39px, rgba(100,105,115,.04) 40px)',
      color: C.tx, fontFamily: Sans, position: 'relative',
    }} ref={topRef}>

      {/* RESTRICTED AREA watermark */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) rotate(-35deg)',
        fontFamily: Mono, fontSize: 120, fontWeight: 900,
        color: 'rgba(100,105,115,.03)', letterSpacing: '.15em',
        whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 0,
        userSelect: 'none',
      }}>
        RESTRICTED AREA
      </div>

      {/* Top bar — checkpoint signage style */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(18,20,26,.96)', backdropFilter: 'blur(12px)',
        borderBottom: '3px solid rgba(100,105,115,.2)', padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer',
          letterSpacing: '.06em',
        }}>
          {'\u25C0'} CHECKPOINT EXIT
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.1em', color: C.tx3, padding: '2px 8px', border: '1px solid rgba(100,105,115,.2)' }}>SECTOR B</span>
          <span style={{ fontFamily: Mono, fontSize: 12, color: C.accentDm, letterSpacing: '.08em', fontWeight: 700 }}>
            HIST // BERLIN WALL
          </span>
          <span style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.1em', color: C.tx3, padding: '2px 8px', border: '1px solid rgba(100,105,115,.2)' }}>1945-1989</span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Hero section */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1 style={{
              fontFamily: Mono, fontSize: 28, fontWeight: 900,
              color: C.tx, letterSpacing: '.06em', marginBottom: 8,
              textTransform: 'uppercase',
              textShadow: '2px 2px 0 rgba(0,0,0,.3)',
            }}>
              Cold War Pressure Gauge
            </h1>
            <svg width="56" height="40" viewBox="0 0 56 40" style={{opacity:0.15,flexShrink:0,color:C.accent}}>
              <path d="M8 8 L28 2 L48 8" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              {[12,18,24,30,36,42].map(x => <line key={x} x1={x} y1={8} x2={x} y2={36} stroke="currentColor" strokeWidth="1.5"/>)}
              <line x1="8" y1="36" x2="48" y2="36" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="8" y1="8" x2="48" y2="8" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <div style={{
            fontFamily: Sans, fontSize: 14, color: C.tx2, lineHeight: 1.7,
            maxWidth: 720, marginBottom: 16,
          }}>
            The Berlin Wall existed for 28 years, 2 months, and 27 days. Its construction,
            existence, and fall are best understood through the strategic calculus of both
            superpowers \— each side\'s decision-making, escalation dynamics, intelligence
            operations, and the signals that preceded the wall\'s collapse. This analysis
            traces the pressure that built, held, and ultimately broke.
          </div>

          {/* Skills tags — checkpoint badge style */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20,
          }}>
            {SKILLS.map(s => (
              <span key={s} style={{
                fontFamily: Mono, fontSize: 10, letterSpacing: '.08em',
                color: C.accent, background: 'rgba(112,128,144,.05)',
                border: '2px solid rgba(112,128,144,.15)',
                borderRadius: 0, padding: '4px 10px',
                textTransform: 'uppercase', fontWeight: 600,
              }}>
                {s}
              </span>
            ))}
          </div>

          {/* Pressure timeline visual */}
          <div style={{
            background: C.card, border: '2px solid ' + C.cardBd,
            borderRadius: 0, padding: '16px 20px', marginBottom: 20,
            boxShadow: '3px 3px 0 rgba(0,0,0,.15)',
          }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
              color: C.tx3, marginBottom: 12,
            }}>
              CRISIS PRESSURE TIMELINE
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 60 }}>
              {PHASES.map((p, i) => {
                const barH = (p.pressureLevel / 100) * 56;
                const color = p.pressureLevel > 80 ? C.red
                  : p.pressureLevel > 50 ? C.gold : C.green;
                return (
                  <button
                    key={p.id}
                    onClick={() => { setMode('phases'); setSelectedPhase(i); }}
                    style={{
                      flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: 4, cursor: 'pointer',
                      background: 'none', border: 'none', padding: 0,
                    }}
                  >
                    <div style={{
                      width: '100%', height: barH, borderRadius: '3px 3px 0 0',
                      background: i === selectedPhase && mode === 'phases'
                        ? color : color + '66',
                      transition: 'all .2s ease',
                      border: i === selectedPhase && mode === 'phases'
                        ? '1px solid ' + color : '1px solid transparent',
                    }} />
                    <span style={{
                      fontFamily: Mono, fontSize: 12, color: C.tx3,
                      whiteSpace: 'nowrap',
                    }}>
                      {p.num}
                    </span>
                  </button>
                );
              })}
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginTop: 6,
              fontFamily: Mono, fontSize: 12, color: C.tx3,
            }}>
              <span>1945</span>
              <span>1961</span>
              <span>Oct 61</span>
              <span>1961\u201389</span>
              <span>1989</span>
            </div>
          </div>
        </div>

        {/* Mode switch */}
        <ModeSwitch />

        {/* Content */}
        {mode === 'phases' && renderPhases()}
        {mode === 'intelligence' && renderIntelligence()}
        {mode === 'counterfactuals' && renderCounterfactuals()}
        {mode === 'pressure' && renderPressureGraph()}

        {/* Provenance */}
        <BarbedWireSVG />
        <div style={{
          marginTop: 20, paddingTop: 24,
          borderTop: '2px solid rgba(100,105,115,.15)',
        }}>
          <StencilHeader color={C.tx3}>
            PROVENANCE // SOURCES
          </StencilHeader>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 10,
          }}>
            {PROVENANCE.map(p => (
              <div key={p.label} style={{
                background: C.card, borderRadius: 0, padding: '10px 14px',
                border: '2px solid ' + C.cardBd,
                boxShadow: '2px 2px 0 rgba(0,0,0,.1)',
              }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, color: C.accent,
                  fontWeight: 700, marginBottom: 4, letterSpacing: '.06em',
                  textTransform: 'uppercase',
                }}>
                  {p.label}
                </div>
                <div style={{
                  fontFamily: Serif, fontSize: 12, color: C.tx2,
                  lineHeight: 1.65, fontStyle: 'italic',
                }}>
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
