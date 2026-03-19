// WarTheoryView.jsx — Clausewitz Trinity Analyzer
// War Theory & Sociology of Violence (PCS/SOC)
//
// Interactive exploration of 5 theoretical frameworks for understanding
// war and organized violence. Each framework is applied to a real conflict
// case study to show how different analytical lenses produce different
// explanations for the same phenomenon.
// Self-contained React component using Babel in-browser transpilation.
// Globals: useState, useCallback, useMemo from React

// -- Palette: War College Lecture Hall — deep olive/brown with topographic feel
const WT_C = {
  bg:      '#0a0806',
  card:    'rgba(20,18,14,.94)',
  cardBd:  'rgba(144,120,80,.14)',
  tx:      '#d0c8b8',
  tx2:     '#a09080',
  tx3:     '#685848',
  accent:  '#905040',
  accentDm:'#704030',
  accentBg:'rgba(144,80,64,.07)',
  red:     '#b04040',
  redDm:   '#883030',
  redBg:   'rgba(176,64,64,.07)',
  gold:    '#b09848',
  goldDm:  '#887030',
  goldBg:  'rgba(176,152,72,.07)',
  blue:    '#5878a0',
  blueDm:  '#406080',
  blueBg:  'rgba(88,120,160,.07)',
  green:   '#608858',
  greenDm: '#486840',
  greenBg: 'rgba(96,136,88,.07)',
  teal:    '#508888',
  tealDm:  '#386868',
  tealBg:  'rgba(80,136,136,.07)',
  line:    'rgba(144,120,80,.10)',
  olive:   '#606840',
  oliveGlow: 'rgba(96,104,64,.06)',
};
const WT_SERIF = "'Source Serif 4','EB Garamond',Georgia,serif";
const WT_SANS  = "'Inter',Helvetica,sans-serif";
const WT_MONO  = "'IBM Plex Mono',monospace";

// -- Topographic contour line background ─────────────────────────────
const TOPO_BG = `
  radial-gradient(ellipse at 25% 30%, rgba(96,104,64,.04) 0%, transparent 50%),
  radial-gradient(ellipse at 75% 70%, rgba(96,104,64,.03) 0%, transparent 40%)
`.trim();

// -- Topographic contour SVG decoration (rendered as background) ────
const TopoContours = () => React.createElement('svg', {
  style: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.04, zIndex: 0 },
  viewBox: '0 0 1000 800', preserveAspectRatio: 'xMidYMid slice'
},
  React.createElement('ellipse', { cx: 300, cy: 250, rx: 200, ry: 120, fill: 'none', stroke: '#a09060', strokeWidth: 0.8 }),
  React.createElement('ellipse', { cx: 300, cy: 250, rx: 160, ry: 95, fill: 'none', stroke: '#a09060', strokeWidth: 0.7 }),
  React.createElement('ellipse', { cx: 300, cy: 250, rx: 120, ry: 70, fill: 'none', stroke: '#a09060', strokeWidth: 0.6 }),
  React.createElement('ellipse', { cx: 300, cy: 250, rx: 80, ry: 45, fill: 'none', stroke: '#a09060', strokeWidth: 0.5 }),
  React.createElement('ellipse', { cx: 700, cy: 500, rx: 180, ry: 100, fill: 'none', stroke: '#a09060', strokeWidth: 0.8 }),
  React.createElement('ellipse', { cx: 700, cy: 500, rx: 140, ry: 75, fill: 'none', stroke: '#a09060', strokeWidth: 0.7 }),
  React.createElement('ellipse', { cx: 700, cy: 500, rx: 100, ry: 50, fill: 'none', stroke: '#a09060', strokeWidth: 0.6 }),
  React.createElement('ellipse', { cx: 700, cy: 500, rx: 60, ry: 30, fill: 'none', stroke: '#a09060', strokeWidth: 0.5 }),
  React.createElement('ellipse', { cx: 500, cy: 150, rx: 150, ry: 80, fill: 'none', stroke: '#a09060', strokeWidth: 0.7 }),
  React.createElement('ellipse', { cx: 500, cy: 150, rx: 100, ry: 50, fill: 'none', stroke: '#a09060', strokeWidth: 0.5 }),
  React.createElement('ellipse', { cx: 150, cy: 600, rx: 120, ry: 70, fill: 'none', stroke: '#a09060', strokeWidth: 0.6 }),
  React.createElement('ellipse', { cx: 150, cy: 600, rx: 70, ry: 40, fill: 'none', stroke: '#a09060', strokeWidth: 0.4 }),
  React.createElement('ellipse', { cx: 850, cy: 200, rx: 100, ry: 60, fill: 'none', stroke: '#a09060', strokeWidth: 0.5 })
);

// -- Military insignia star decoration ────────────────────────────
const MilitaryStarSVG = ({ size, color, style: extraStyle }) => React.createElement('svg', {
  width: size || 16, height: size || 16, viewBox: '0 0 24 24', style: { ...extraStyle, opacity: extraStyle?.opacity || 0.15, pointerEvents: 'none' }
},
  React.createElement('polygon', { points: '12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9', fill: color || '#a09060', stroke: 'none' })
);

// -- Frameworks Data -----------------------------------------------
const FRAMEWORKS = [
  {
    id: 'clausewitz',
    num: 'I',
    name: 'Clausewitz\'s Trinity',
    thinker: 'Carl von Clausewitz',
    work: 'On War (1832)',
    color: WT_C.accent,
    icon: '\u2694',
    summary: 'War as the interplay of three tendencies: primordial violence and passion (the people), the play of chance and probability (the military commander), and war as an instrument of rational policy (the government). These three poles form a dynamic equilibrium that shifts with each conflict.',
    elements: [
      { name: 'Passion (Volk)', desc: 'The primal hatred, enmity, and violent emotion that fuels conflict. Resides primarily in the people. Can escalate beyond rational control and drive wars toward absolute violence.' },
      { name: 'Chance (Feldherr)', desc: 'The fog of war, friction, and probability that the military commander must navigate. Courage and talent operate within a space of uncertainty where plans dissolve on contact with the enemy.' },
      { name: 'Reason (Regierung)', desc: 'The rational calculus of policy that sets war\'s political objectives. War is the continuation of politics by other means. The government subordinates military means to political ends.' },
    ],
    critique: 'Critics argue the trinity is Eurocentric, designed for state-on-state warfare, and struggles to account for non-state actors, civil wars, or identity-based violence where the people/government/military distinction collapses.',
    caseStudy: {
      conflict: 'World War I (1914-1918)',
      application: 'The July Crisis reveals all three poles in tension. Passion: nationalist fervor across Europe made populations enthusiastic for war. Chance: the Schlieffen Plan\'s rigid timetable collapsed at the Marne, producing unforeseen trench warfare. Reason: statesmen progressively lost control as military logic overtook political objectives, illustrating Clausewitz\'s own warning about escalation toward "absolute war." By 1916, no government could articulate achievable war aims proportionate to the costs being incurred.',
      insight: 'WWI is the canonical case where the passion pole overwhelmed reason. The "short war illusion" reflected a failure to weight chance properly, while total mobilization gave the people\'s passion autonomous momentum that governments could not constrain.',
    },
  },
  {
    id: 'thucydides',
    num: 'II',
    name: 'Thucydidean Triad',
    thinker: 'Thucydides',
    work: 'History of the Peloponnesian War (c. 400 BCE)',
    color: WT_C.gold,
    icon: '\u2656',
    summary: 'Wars arise from three fundamental motivations: fear (phobos), honor (time), and interest (ophelia). Thucydides identified these as the "truest cause" of the Peloponnesian War, distinguishing deep structural drivers from immediate pretexts. The framework emphasizes the systemic logic of power transitions.',
    elements: [
      { name: 'Fear (Phobos)', desc: 'The security dilemma: a rising power\'s growth makes the established power fear for its position, creating a spiral of preemptive thinking. Defensive motivations can drive offensive action when states cannot credibly signal benign intent.' },
      { name: 'Honor (Time)', desc: 'The concern for prestige, status, reputation, and credibility among peers. States fight to maintain standing in the international hierarchy. Loss of honor can be perceived as an existential threat to regime legitimacy.' },
      { name: 'Interest (Ophelia)', desc: 'The rational pursuit of material advantage: territory, resources, trade routes, strategic positions. The most "realist" of the three motivations, often invoked but rarely operating in isolation.' },
    ],
    critique: 'The Thucydidean framework can become tautological: virtually any conflict can be retroactively explained by some combination of fear, honor, and interest. It also underweights ideology, domestic politics, and individual leadership psychology.',
    caseStudy: {
      conflict: 'U.S.-China Strategic Competition (2010s-present)',
      application: 'Graham Allison\'s "Thucydides Trap" thesis directly applies this framework to Sino-American relations. Fear: the U.S. fears China\'s GDP trajectory and military modernization will displace American primacy in Asia. Honor: both states have deep narratives of exceptionalism that make accommodation psychologically difficult. Interest: competition over Taiwan, the South China Sea, semiconductor supply chains, and Belt and Road influence all reflect material stakes.',
      insight: 'The Thucydidean lens highlights the structural danger of power transitions but may overpredict conflict. Of Allison\'s 16 historical cases of a rising power challenging a ruling power, 12 ended in war, but the framework struggles to explain the 4 that did not.',
    },
  },
  {
    id: 'justwar',
    num: 'III',
    name: 'Just War Theory',
    thinker: 'Augustine, Aquinas, Walzer',
    work: 'Just and Unjust Wars (Walzer, 1977)',
    color: WT_C.blue,
    icon: '\u2696',
    summary: 'A normative framework evaluating the moral permissibility of war across three domains: the right to go to war (jus ad bellum), right conduct within war (jus in bello), and justice after war (jus post bellum). Unlike descriptive theories, Just War Theory asks not why wars happen but whether they are morally defensible.',
    elements: [
      { name: 'Jus ad Bellum', desc: 'Criteria for justified resort to force: just cause (typically self-defense against aggression), right authority (legitimate sovereign), right intention, proportionality (expected goods outweigh expected harms), last resort (peaceful alternatives exhausted), and reasonable chance of success.' },
      { name: 'Jus in Bello', desc: 'Rules governing conduct during war: discrimination (combatant/civilian distinction), proportionality of means (no excessive force relative to military advantage), military necessity, and prohibition of inherently immoral weapons or tactics. These apply independently of whether the war itself is just.' },
      { name: 'Jus post Bellum', desc: 'Justice in the aftermath: proportional peace terms, punishment of war crimes, restoration of sovereignty, reconstruction obligations, and legitimate governance. This domain, the most recently developed, addresses the obligations of victors toward the defeated.' },
    ],
    critique: 'Realists argue Just War Theory is naive about power politics. Critical theorists note it was developed within a Western Christian tradition and may encode culturally specific assumptions. The "supreme emergency" exception (Walzer) creates a potentially unlimited loophole.',
    caseStudy: {
      conflict: 'NATO Intervention in Kosovo (1999)',
      application: 'Kosovo tests every pillar. Jus ad bellum: humanitarian intervention without UN Security Council authorization. Was preventing ethnic cleansing a "just cause" sufficient to override sovereignty? Right authority: NATO acted without a UNSC mandate because Russia would veto. Jus in bello: the air campaign killed an estimated 500 civilians and targeted dual-use infrastructure. Was a 15,000-foot bombing altitude (minimizing pilot risk but increasing civilian risk) proportionate? Jus post bellum: Kosovo\'s unilateral declaration of independence in 2008 remains contested.',
      insight: 'Kosovo reveals the tension between legality and legitimacy. The Independent International Commission concluded it was "illegal but legitimate," a formulation that captures Just War Theory\'s uncomfortable relationship with positive international law.',
    },
  },
  {
    id: 'keegan',
    num: 'IV',
    name: 'Keegan\'s Cultural Model',
    thinker: 'John Keegan',
    work: 'A History of Warfare (1993)',
    color: WT_C.green,
    icon: '\u26ED',
    summary: 'War is not merely a political instrument but a cultural phenomenon. Different societies wage war in fundamentally different ways because their military practices express deeper cultural values about honor, masculinity, social hierarchy, and the role of violence in communal life. Clausewitz was wrong: war is not politics by other means but a cultural inheritance.',
    elements: [
      { name: 'Cultural Style', desc: 'Each society develops a characteristic "way of war" reflecting its values: the Greek phalanx expressed civic equality; Mongol mounted archery expressed steppe nomad mobility and freedom; European colonial warfare expressed technological supremacism and racial hierarchy.' },
      { name: 'Ritual & Restraint', desc: 'Many pre-modern societies practiced ritualized warfare with built-in limitations: counting coup among Plains Indians, champion combat in Homeric Greece, seasonal restrictions in medieval chivalry. Total war is the cultural aberration, not the norm.' },
      { name: 'Military Culture', desc: 'Professional military organizations develop their own subcultures with distinctive values, customs, and worldviews that may diverge from civilian society. These cultures shape how wars are fought regardless of political direction.' },
    ],
    critique: 'Critics charge Keegan with cultural essentialism and romanticizing pre-modern warfare. Victor Davis Hanson argues Keegan underestimates the Western way of war\'s decisive, face-to-face battle-seeking character. Anthropologists note that "culture" can become an unfalsifiable explanation.',
    caseStudy: {
      conflict: 'U.S. Wars in Afghanistan and Iraq (2001-2021)',
      application: 'The American "way of war" emphasizes technological superiority, firepower, force protection, and decisive battle. This cultural style produced rapid initial victories (toppling the Taliban in weeks, Baghdad in three weeks) but was profoundly maladapted to counterinsurgency. The insurgents\' cultural styles of warfare -- IEDs, ambushes, propaganda of the deed -- exploited American assumptions about what "war" looks like. Twenty years in Afghanistan ended with the Taliban retaking Kabul.',
      insight: 'Keegan\'s framework explains why military superiority does not guarantee strategic success. The cultural gap between the American way of war and the conflict environment mattered more than the balance of forces. Counterinsurgency doctrine (FM 3-24) was itself a cultural intervention attempting to change how Americans fought.',
    },
  },
  {
    id: 'creveld',
    num: 'V',
    name: 'van Creveld\'s Transformation',
    thinker: 'Martin van Creveld',
    work: 'The Transformation of War (1991)',
    color: WT_C.teal,
    icon: '\⚠',
    summary: 'The Clausewitzian paradigm of state-on-state warfare is obsolete. Since 1945, the vast majority of armed conflicts have been low-intensity wars fought by non-state actors (guerrillas, terrorists, militias, warlords) for non-Clausewitzian reasons (identity, religion, ethnicity, criminal enterprise). The state\'s monopoly on organized violence is eroding, and future war will look less like WWII and more like the Thirty Years\' War.',
    elements: [
      { name: 'Non-Trinitarian War', desc: 'In many modern conflicts, the Clausewitzian distinction between people, army, and government collapses. Child soldiers are simultaneously the people and the army. Warlords are simultaneously the government and the army. Civilians and combatants are indistinguishable.' },
      { name: 'War Beyond the State', desc: 'Non-state actors fight for reasons that do not fit the rational-policy model: religious apocalypticism, ethnic survival, criminal profit, personal power. The motivations are existential and non-negotiable in ways that Clausewitzian "policy" cannot accommodate.' },
      { name: 'Erosion of Legitimacy', desc: 'Western states\' inability to defeat non-state adversaries erodes the legitimacy of the state system itself. If states cannot provide security against these threats, the social contract underlying the Westphalian order weakens.' },
    ],
    critique: 'Mary Kaldor offers an alternative "new wars" thesis that emphasizes globalization and identity politics rather than van Creveld\'s emphasis on state decline. Stathis Kalyvas argues that civil wars have internal logics that neither framework captures. Critics note that state-on-state war has not disappeared (Russia-Ukraine 2022).',
    caseStudy: {
      conflict: 'Syrian Civil War (2011-present)',
      application: 'Syria embodies the transformation thesis. The conflict began as a state-vs-people uprising but rapidly fragmented into a multi-actor war involving: the Assad regime, the Free Syrian Army, ISIS, the YPG/SDF, Jabhat al-Nusra, Hezbollah, Russian and Iranian forces, Turkish-backed factions, and U.S. special operations forces. No Clausewitzian trinity applies. Each faction fights for different reasons: sectarian survival, caliphate-building, Kurdish autonomy, geopolitical influence, personal power.',
      insight: 'Syria shows that van Creveld\'s 1991 predictions were substantially correct. The conflict defies Clausewitzian analysis because there is no unified "government," "military," or "people" on any side. The result is not decisive victory but perpetual fragmentation.',
    },
  },
];

// -- Synthesis Comparisons ------------------------------------------
const SYNTHESIS_DIMENSIONS = [
  {
    dimension: 'Unit of Analysis',
    comparisons: [
      { fwId: 'clausewitz', position: 'The state and its internal tripartite structure (people/army/government)' },
      { fwId: 'thucydides', position: 'The international system and power relationships between states' },
      { fwId: 'justwar', position: 'The moral agent -- individual decision-makers and their obligations' },
      { fwId: 'keegan', position: 'The culture or civilization as a carrier of military tradition' },
      { fwId: 'creveld', position: 'The armed group (state or non-state) and the nature of organized violence' },
    ],
  },
  {
    dimension: 'Why Wars Happen',
    comparisons: [
      { fwId: 'clausewitz', position: 'Wars are rational extensions of policy, driven by political objectives that military force serves' },
      { fwId: 'thucydides', position: 'Wars arise from structural tensions in the international system (power transitions, security dilemmas)' },
      { fwId: 'justwar', position: 'Wars happen for just or unjust reasons; the theory evaluates rather than predicts' },
      { fwId: 'keegan', position: 'Wars arise from cultural traditions of organized violence embedded in societies' },
      { fwId: 'creveld', position: 'Wars arise from identity, survival, religion, and existential motivations that exceed rational calculation' },
    ],
  },
  {
    dimension: 'Can War Be Controlled?',
    comparisons: [
      { fwId: 'clausewitz', position: 'In theory yes (subordination to policy), but inherent tendencies toward escalation make control fragile' },
      { fwId: 'thucydides', position: 'Structural forces constrain choice; prudent statesmanship can mitigate but rarely prevent systemic conflicts' },
      { fwId: 'justwar', position: 'War should be controlled by moral principles; jus in bello rules apply even in unjust wars' },
      { fwId: 'keegan', position: 'Cultural restraints historically limited warfare; modernity removed those restraints, producing total war' },
      { fwId: 'creveld', position: 'Non-state wars resist control by design; the state\'s regulatory monopoly on violence is weakening' },
    ],
  },
  {
    dimension: 'How Wars End',
    comparisons: [
      { fwId: 'clausewitz', position: 'When the political objective is achieved or abandoned; the defeated accept the new political reality' },
      { fwId: 'thucydides', position: 'When the power transition resolves: either the rising power is accommodated or the established power prevails' },
      { fwId: 'justwar', position: 'A just peace requires proportional terms, accountability, and restoration (jus post bellum)' },
      { fwId: 'keegan', position: 'Cultural exhaustion or transformation; societies tire of violence or develop new cultural attitudes toward war' },
      { fwId: 'creveld', position: 'Many contemporary wars do not end; they simmer, fragment, or become self-sustaining economies of violence' },
    ],
  },
  {
    dimension: 'Relevance to 21st Century',
    comparisons: [
      { fwId: 'clausewitz', position: 'Remains essential for understanding state-on-state conflict; less useful for non-state or hybrid warfare' },
      { fwId: 'thucydides', position: 'Directly applicable to U.S.-China competition; the "Thucydides Trap" is the dominant strategic metaphor' },
      { fwId: 'justwar', position: 'Central to debates on humanitarian intervention, drones, autonomous weapons, and cyber warfare ethics' },
      { fwId: 'keegan', position: 'Explains cross-cultural misunderstanding in counterinsurgency and the persistence of non-Western military traditions' },
      { fwId: 'creveld', position: 'Most prescient about failed states, terrorism, and the erosion of the state monopoly on violence' },
    ],
  },
];

// -- Skills / Tags ---------------------------------------------------
const WT_SKILLS = [
  'Clausewitzian Analysis', 'Security Studies', 'Just War Ethics',
  'Military Culture', 'Conflict Theory', 'Historical Case Studies',
];

// -- Trinity Conflict Examples ----------------------------------------
const TRINITY_CONFLICTS = [
  {
    id: 'wwi',
    name: 'World War I',
    period: '1914\u20131918',
    weights: { passion: 80, chance: 55, reason: 20 },
    explanation: 'Nationalist fervor and popular enthusiasm for war drove escalation far beyond any rational political objective. The Schlieffen Plan\'s failure introduced massive uncertainty (chance), while governments progressively lost control of their own war aims. By 1916, passion had overwhelmed reason entirely \— no state could articulate proportionate objectives.',
  },
  {
    id: 'vietnam',
    name: 'Vietnam War',
    period: '1955\u20131975',
    weights: { passion: 40, chance: 75, reason: 35 },
    explanation: 'Guerrilla warfare, jungle terrain, and asymmetric tactics made probability and uncertainty the dominant factor. American firepower advantages were negated by the fog of war in an unconventional conflict. Domestic passion (anti-war movement) eventually constrained policy, while the rational policy objective ("credibility") proved insufficient to sustain the effort.',
  },
  {
    id: 'gulf',
    name: 'Gulf War 1991',
    period: 'Jan\u2013Feb 1991',
    weights: { passion: 20, chance: 25, reason: 85 },
    explanation: 'A textbook Clausewitzian war: precise political objectives (liberate Kuwait), overwhelming force calibrated to those objectives, and deliberate termination once the policy goal was achieved. Passion was contained, chance was minimized through technological superiority and coalition planning. The government maintained rational control throughout.',
  },
  {
    id: 'syria',
    name: 'Syrian Civil War',
    period: '2011\u2013present',
    weights: { passion: 65, chance: 60, reason: 55 },
    explanation: 'All three forces operate in tension with no single pole dominant. Sectarian passion drives communal violence, proxy complexity introduces massive uncertainty, and multiple state actors pursue rational geopolitical objectives simultaneously. The result is a conflict that resists resolution because no equilibrium point satisfies all three poles.',
  },
  {
    id: 'ukraine',
    name: 'Ukraine 2022',
    period: '2022\u2013present',
    weights: { passion: 75, chance: 40, reason: 70 },
    explanation: 'Ukrainian national will (passion) combined with Western strategic calculation (reason) to resist Russian aggression. Chance is moderated by modern intelligence and technology reducing uncertainty. The war shows passion and reason can be mutually reinforcing: popular mobilization serves rational defensive objectives, unlike WWI where they diverged.',
  },
];

// -- Conflict Classification Data ------------------------------------
const CLASSIFY_CONFLICTS = [
  { id: 'wwi_cl', name: 'World War I', period: '1914\u20131918', x: 0.15, y: 0.90, belligerents: 'Central Powers vs Allied Powers (30+ nations)', casualties: '~20 million dead, 21 million wounded', duration: '4 years, 3 months', framework: 'Clausewitz\'s Trinity', why: 'Classical interstate total war. Industrial-age mobilization erased the limited/total boundary. Entire national economies were reorganized for war production. The Clausewitzian trinity explains how passion (nationalism) overwhelmed reason (policy) to produce escalation toward absolute war.' },
  { id: 'wwii_cl', name: 'World War II', period: '1939\u20131945', x: 0.12, y: 0.95, belligerents: 'Axis Powers vs Allied Powers (50+ nations)', casualties: '~70\u201385 million dead (military + civilian)', duration: '6 years', framework: 'Just War Theory', why: 'The paradigm case of total interstate war. Just War Theory is most relevant: self-defense against aggression (jus ad bellum), strategic bombing debates (jus in bello), and post-war reconstruction/Nuremberg (jus post bellum). The unconditional surrender demand reflected total war logic.' },
  { id: 'korea', name: 'Korean War', period: '1950\u20131953', x: 0.20, y: 0.30, belligerents: 'North Korea + China vs South Korea + UN Coalition', casualties: '~2.5 million military + 2 million civilian', duration: '3 years', framework: 'Thucydidean Triad', why: 'Limited interstate war within a superpower framework. The Thucydidean Triad explains it best: fear (communist expansion), honor (American credibility), interest (Korean Peninsula strategic value). Truman\'s decision not to expand into China kept it limited.' },
  { id: 'vietnam_cl', name: 'Vietnam War', period: '1955\u20131975', x: 0.45, y: 0.55, belligerents: 'North Vietnam + Viet Cong vs South Vietnam + United States', casualties: '~1.3 million military + 2 million civilian', duration: '20 years', framework: 'Keegan\'s Cultural Model', why: 'Mixed interstate/intrastate with escalation from limited to near-total. Keegan best explains the outcome: American technological war culture clashed with Vietnamese guerrilla culture. The cultural gap between the combatants mattered more than material superiority.' },
  { id: 'gulf_cl', name: 'Gulf War 1991', period: 'Jan\u2013Feb 1991', x: 0.18, y: 0.20, belligerents: 'Iraq vs 35-nation Coalition led by United States', casualties: '~25,000\u201350,000 Iraqi military + ~300 Coalition', duration: '42 days of combat', framework: 'Clausewitz\'s Trinity', why: 'Textbook limited interstate war. Clausewitz explains its success: the trinity was in perfect balance. Rational policy set clear objectives, chance was minimized by overwhelming force, and passion was carefully managed through media strategy. War terminated when the political objective was achieved.' },
  { id: 'rwanda', name: 'Rwandan Genocide', period: 'Apr\u2013Jul 1994', x: 0.85, y: 0.92, belligerents: 'Hutu extremists (Interahamwe) vs Tutsi population + RPF', casualties: '~800,000\u20131 million killed in 100 days', duration: '100 days', framework: 'van Creveld\'s Transformation', why: 'Total intrastate violence. Van Creveld\'s framework applies: the people/army/government distinction collapsed entirely. Civilians became both perpetrators and victims. The state itself organized genocide through non-state militia proxies. International institutions failed completely.' },
  { id: 'syria_cl', name: 'Syrian Civil War', period: '2011\u2013present', x: 0.72, y: 0.60, belligerents: 'Assad regime + Russia + Iran vs FSA + ISIS + YPG/SDF + Turkey-backed groups + others', casualties: '~500,000+ dead, 13 million displaced', duration: '13+ years', framework: 'van Creveld\'s Transformation', why: 'Intrastate with massive external intervention. Van Creveld predicted exactly this type of conflict: state fragmentation, non-state actor proliferation, and the collapse of Clausewitzian categories. Multiple factions fight for incompatible, non-negotiable goals.' },
  { id: 'ukraine_cl', name: 'Ukraine 2022', period: '2022\u2013present', x: 0.25, y: 0.50, belligerents: 'Russia vs Ukraine (with Western military support)', casualties: 'Hundreds of thousands military casualties on both sides', duration: '3+ years and ongoing', framework: 'Thucydidean Triad', why: 'Interstate war that confounds the "transformation" thesis. Thucydides explains the structural cause: fear (NATO expansion), honor (Russian great-power identity), interest (Ukrainian territory and Black Sea access). The war is limited by nuclear deterrence but escalating in intensity, sitting at the boundary between limited and total.' },
];

// -- Scholarly Micro-Content Tooltips ------------------------------------
const WARTHEORY_TIPS = {
  clausewitz_trinity: "Clausewitz's 'remarkable trinity' \u2014 violence/passion (the people), chance/probability (the military), and rational purpose (the government) \u2014 is not a formula but a dynamic system. The three forces pull against each other like magnets suspended in tension. War becomes uncontrollable when one force dominates: pure passion produces genocide, pure chance produces chaos, and pure rationality produces the illusion that war can be precisely calibrated. Every war in history is a particular configuration of these three forces, and the configuration shifts constantly during the conflict itself.",
  fog_of_war: "Clausewitz's 'fog of war' is often reduced to 'uncertainty' but he meant something more specific and more profound \u2014 the compound effect of small frictions that make simple things extraordinarily difficult in combat. Plans fail not from one dramatic surprise but from a thousand small malfunctions: the messenger who gets lost, the supply wagon that breaks an axle, the unit commander who misreads his map, the soldier who freezes at the critical moment. Clausewitz's insight was that these frictions are not bugs in the system but inherent features of violent human enterprise that cannot be engineered away.",
  total_war: "The concept of 'total war' emerged from the experience of World War I but was theorized most fully by Erich Ludendorff (1935) and practiced most completely in World War II. The key transformation is the collapse of the distinction between combatant and civilian: when entire national economies are mobilized for war production, the factory worker becomes a legitimate military target. This logic produced strategic bombing, submarine campaigns against merchant shipping, and ultimately nuclear weapons \u2014 each step extending the boundary of legitimate violence further into civilian life. The concept remains contested: is total war a description of what happens or a doctrine that enables atrocity?",
};

// -- Main Component --------------------------------------------------
function WarTheoryView({ setView }) {
  const [mode, setMode] = useState('frameworks');
  const [activeFW, setActiveFW] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [synthDim, setSynthDim] = useState(0);
  const [tipId, setTipId] = useState(null);

  // ── Scholarly Micro-Icons & Tooltip ──────────────────────────
  function Tip({ id }) {
    if (tipId !== id || !WARTHEORY_TIPS[id]) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(11,10,8,.92)', border: '1px solid ' + WT_C.accent + '25', borderRadius: 3, maxWidth: 440, fontSize: 11, fontFamily: WT_MONO, color: WT_C.tx2, lineHeight: 1.65, margin: '6px 0 10px' }}>
        {WARTHEORY_TIPS[id]}
      </div>
    );
  }

  const TrinityIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='clausewitz_trinity'?null:'clausewitz_trinity')}>
      <polygon points="11,2 2,20 20,20" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <circle cx="11" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth=".5"/>
      <circle cx="7" cy="16" r="2" fill="none" stroke="currentColor" strokeWidth=".5"/>
      <circle cx="15" cy="16" r="2" fill="none" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const FogIcon = () => (
    <svg width="24" height="20" viewBox="0 0 24 20" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='fog_of_war'?null:'fog_of_war')}>
      <path d="M2 8 Q6 5 10 8 Q14 11 18 8 Q20 7 22 8" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <path d="M2 12 Q6 9 10 12 Q14 15 18 12 Q20 11 22 12" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <path d="M4 16 Q8 13 12 16 Q16 19 20 16" fill="none" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const TotalWarIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='total_war'?null:'total_war')}>
      <circle cx="11" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <line x1="11" y1="2" x2="11" y2="20" stroke="currentColor" strokeWidth=".5"/>
      <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth=".5"/>
      <path d="M8 5 L14 5 L16 8 L14 11 L8 11 L6 8 Z" fill="currentColor" fillOpacity=".06" stroke="currentColor" strokeWidth=".4"/>
    </svg>
  );

  // Trinity mode state
  const [trinityWeights, setTrinityWeights] = useState({ passion: 50, chance: 50, reason: 50 });
  const [selectedConflict, setSelectedConflict] = useState(null);

  // Classify mode state
  const [selectedClassify, setSelectedClassify] = useState(null);

  // Apply mode state
  const [applyFWRatings, setApplyFWRatings] = useState({});

  // Escalation mode state
  const [escalationSelected, setEscalationSelected] = useState(null);

  const CC = WT_C;
  const fw = FRAMEWORKS[activeFW];

  const toggleSection = useCallback((key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // -- Score how many frameworks user has explored
  const explored = useMemo(() => {
    const keys = Object.keys(expandedSections).filter(k => expandedSections[k]);
    const fwIds = new Set(keys.map(k => k.split('_')[0]));
    return fwIds.size;
  }, [expandedSections]);

  // -- Compute center of gravity for trinity
  const trinityCenter = useMemo(() => {
    const w = trinityWeights;
    const total = w.passion + w.chance + w.reason;
    if (total === 0) return { x: 250, y: 220 };
    // Triangle vertices in SVG coords
    const px = 250, py = 55;   // passion (top)
    const cx = 80, cy = 360;   // chance (bottom-left)
    const rx = 420, ry = 360;  // reason (bottom-right)
    return {
      x: (w.passion * px + w.chance * cx + w.reason * rx) / total,
      y: (w.passion * py + w.chance * cy + w.reason * ry) / total,
    };
  }, [trinityWeights]);

  // -- Mode tabs
  const MODES = [
    { id: 'frameworks',  label: 'Frameworks',   icon: '\u2726' },
    { id: 'cases',       label: 'Case Studies', icon: '\u2316' },
    { id: 'synthesis',   label: 'Synthesis',     icon: '\u2261' },
    { id: 'trinity',     label: 'Trinity',       icon: '\u25B3' },
    { id: 'classify',    label: 'Classify',      icon: '\u2316' },
    { id: 'apply',       label: 'Apply',         icon: '\u2694' },
    { id: 'escalation',  label: 'Escalation',    icon: '\u25B2' },
  ];

  // -- Apply Theory to Current War ------------------------------------
  const UKRAINE_FRAMEWORKS = useMemo(() => [
    { id: 'clausewitz', name: 'Clausewitz', framework: 'War as Politics by Other Means',
      analysis: 'The Ukraine war is textbook Clausewitz. Russia\'s invasion is a continuation of policy by other means \u2014 Putin\'s stated goal of preventing NATO expansion and reasserting control over the post-Soviet space. The war demonstrates the Clausewitzian trinity in full operation: Russian popular passion (nationalist mobilization, Z symbol), military chance and friction (the failed northern campaign, logistical disasters, Ukrainian adaptation), and governmental rational purpose (though Putin\'s rationality is debated). Clausewitz would emphasize that the war\'s escalation dynamics reflect the tendency toward the "absolute" \u2014 each side must match or exceed the other\'s commitment, creating a ratchet effect. The key Clausewitzian question: what is the political object, and is the military means proportionate to it? Russia\'s maximalist political goals (regime change, then territorial acquisition) have proven disproportionate to its military capabilities.',
      strength: 'Clausewitz explains WHY the war happens (political objectives drive military action) and why it escalates (the reciprocal nature of violence). His framework correctly predicted that Russia\'s initial "limited" operation would either succeed quickly or escalate indefinitely.',
      weakness: 'Clausewitz assumes rational political direction of war. If Putin\'s objectives are not rationally calibrated to capabilities \u2014 if the war is driven by ideology, personal psychology, or domestic political survival rather than strategic calculation \u2014 then the Clausewitzian framework underestimates the danger of irrational escalation.',
    },
    { id: 'thucydides', name: 'Thucydides', framework: 'Thucydides Trap / Structural Realism',
      analysis: 'Graham Allison\'s "Thucydides Trap" thesis argues that war becomes likely when a rising power threatens a ruling power. Applied to Ukraine: Russia is a declining power attempting to arrest its decline by preventing the further expansion of the Western alliance system. This inverts the classical formulation (Sparta feared rising Athens), but the structural logic is similar \u2014 power transitions create windows of opportunity and desperation. Thucydides would emphasize that the underlying cause is structural (the post-Cold War expansion of NATO into former Soviet space) while the immediate triggers (Maidan, Crimea, Donbas) are pretexts. The "truest cause" is fear: Russia fears permanent strategic marginalization if Ukraine integrates into Western institutions.',
      strength: 'Thucydides explains the DEEP CAUSE of the war \u2014 not Putin\'s personal decisions but the structural dynamics of a shifting power balance in Europe. This framework correctly identifies that the war is about the post-Cold War European order, not just about Ukraine.',
      weakness: 'Structural realism is better at explaining why wars happen in general than why THIS war happened at THIS time. The Thucydides Trap model does not explain why Russia invaded in 2022 rather than 2014, 2008, or never. Individual agency (Putin\'s decision-making, COVID isolation, intelligence failures) matters in ways structural theories cannot capture.',
    },
    { id: 'justwar', name: 'Just War Theory', framework: 'Jus ad Bellum / Jus in Bello',
      analysis: 'Just War Theory provides the sharpest moral assessment. Russia\'s invasion fails every jus ad bellum criterion: (1) Just cause \u2014 preventing NATO expansion is not a just cause for aggressive war; (2) Right intention \u2014 territorial conquest is not a defensive purpose; (3) Legitimate authority \u2014 contested (Putin\'s decision was not endorsed by genuine democratic process); (4) Last resort \u2014 diplomatic options were not exhausted; (5) Proportionality \u2014 the destruction vastly exceeds any threatened harm; (6) Reasonable chance of success \u2014 increasingly doubtful. Russia\'s conduct also violates jus in bello: deliberate attacks on civilian infrastructure (energy grid bombing), deportation of children, documented war crimes in Bucha and elsewhere. Ukraine\'s defensive war satisfies jus ad bellum criteria, though specific Ukrainian actions (cluster munitions use, attacks on Russian territory) raise jus in bello questions.',
      strength: 'Just War Theory provides a MORAL FRAMEWORK that other theories lack. It identifies Russia\'s invasion as unjust aggression \u2014 a clear conclusion that purely descriptive frameworks cannot reach. It also provides criteria for evaluating Ukrainian conduct, preventing the assumption that the just side in a war can do no wrong.',
      weakness: 'Just War Theory tells us who is right but not what will happen. It cannot predict military outcomes, explain strategic dynamics, or guide policy beyond moral judgment. A war can be perfectly unjust and still succeed, or perfectly just and still be lost. The framework needs supplementation by strategic analysis.',
    },
    { id: 'creveld', name: 'van Creveld', framework: 'Transformation of War',
      analysis: 'Martin van Creveld argued that the Clausewitzian paradigm of interstate war fought by regular armies for political objectives is being replaced by "non-trinitarian" warfare: insurgencies, terrorism, ethnic conflict, and state collapse. The Ukraine war appears to REFUTE van Creveld \u2014 it is a large-scale conventional interstate war with massed armor, artillery duels, and trench lines reminiscent of 1916. However, van Creveld would note the non-state elements: Wagner Group (private military company), Chechen Kadyrovtsy, foreign volunteer brigades, partisan warfare in occupied territories, and the cyber domain. The war is a hybrid: conventional in its primary form but deeply intertwined with irregular, privatized, and informational warfare.',
      strength: 'Van Creveld\'s framework captures the HYBRID NATURE of the conflict \u2014 the way conventional and unconventional warfare coexist. Wagner Group, drone warfare, information operations, and economic warfare (sanctions, energy weaponization) demonstrate that modern war transcends the Clausewitzian interstate model.',
      weakness: 'The Ukraine war has largely vindicated traditional military analysis: logistics, artillery, combined arms maneuver, and industrial mobilization remain decisive. Van Creveld\'s prediction that conventional interstate war was obsolete appears premature. The framework overestimates the transformation of war and underestimates the persistence of traditional military dynamics.',
    },
    { id: 'keegan', name: 'Keegan', framework: 'Cultural History of War',
      analysis: 'John Keegan argued that war is a cultural phenomenon \u2014 different societies fight differently because their military traditions reflect their broader cultural values. Applied to Ukraine: Russian military culture emphasizes mass, firepower, and acceptance of casualties (the "Russian way of war" from Kursk to Grozny). Ukrainian military culture has been transformed since 2014 by NATO training, mission command doctrine, and a decentralized initiative-based approach alien to Russian hierarchical tradition. The cultural mismatch helps explain Russian failures: a military culture that punishes subordinate initiative cannot adapt when plans fail. Keegan would also emphasize the "face of battle" \u2014 the experience of individual soldiers \u2014 and the role of morale, cohesion, and motivation. Ukrainian soldiers fighting for national survival show higher morale than Russian conscripts unclear on why they are fighting.',
      strength: 'Keegan explains HOW the war is fought and WHY military performance differs between the two sides. Cultural factors (initiative, morale, adaptability) explain outcomes that purely material analysis (number of tanks, artillery rounds) cannot.',
      weakness: 'Cultural explanations risk stereotyping entire militaries. The Russian military has shown adaptation in some areas (drone warfare, defensive fortification). Cultural analysis also has difficulty explaining change: how did Ukrainian military culture transform so rapidly between 2014 and 2022? Culture is usually treated as slow-moving, but institutional reform can override cultural inertia.',
    },
  ], []);

  const renderApplyToWar = useCallback(() => {
    const ratedCount = Object.keys(applyFWRatings).length;
    return (
      <div>
        <div style={{ fontFamily: WT_MONO, fontSize: 12, letterSpacing: '.06em', color: CC.accent + '88', marginBottom: 6 }}>APPLY THEORY TO CURRENT WAR: UKRAINE</div>
        <div style={{ fontFamily: WT_SERIF, fontSize: 14, color: CC.tx2, lineHeight: 1.7, marginBottom: 16, maxWidth: 720 }}>
          The same conflict, five different frameworks, five different interpretations. This demonstrates the central methodological lesson of war theory: your analytical framework determines what you see. Read all five analyses, then rate which framework you find most useful for understanding this conflict.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {UKRAINE_FRAMEWORKS.map(fw => {
            const rating = applyFWRatings[fw.id];
            const ratings = [1, 2, 3, 4, 5];
            return (
              <div key={fw.id} style={{ background: CC.card, border: `1px solid ${CC.cardBd}`, borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${CC.line}` }}>
                  <div style={{ fontFamily: WT_MONO, fontSize: 12, fontWeight: 600, color: CC.accent, letterSpacing: '.04em' }}>{fw.name}: {fw.framework}</div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontFamily: WT_SERIF, fontSize: 13, color: CC.tx, lineHeight: 1.75, marginBottom: 12 }}>{fw.analysis}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                    <div style={{ padding: '10px 14px', background: CC.greenBg, borderRadius: 4, border: `1px solid ${CC.line}` }}>
                      <div style={{ fontFamily: WT_MONO, fontSize: 9, color: CC.greenDm, letterSpacing: '.06em', marginBottom: 4 }}>STRENGTH</div>
                      <div style={{ fontFamily: WT_SANS, fontSize: 11, color: CC.tx2, lineHeight: 1.6 }}>{fw.strength}</div>
                    </div>
                    <div style={{ padding: '10px 14px', background: CC.redBg, borderRadius: 4, border: `1px solid ${CC.line}` }}>
                      <div style={{ fontFamily: WT_MONO, fontSize: 9, color: CC.redDm, letterSpacing: '.06em', marginBottom: 4 }}>WEAKNESS</div>
                      <div style={{ fontFamily: WT_SANS, fontSize: 11, color: CC.tx2, lineHeight: 1.6 }}>{fw.weakness}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: WT_MONO, fontSize: 10, color: CC.tx3, letterSpacing: '.04em' }}>USEFULNESS:</span>
                    {ratings.map(r => (
                      <button key={r} onClick={() => setApplyFWRatings(prev => ({ ...prev, [fw.id]: r }))} style={{
                        width: 28, height: 28, borderRadius: 4, cursor: 'pointer',
                        background: rating === r ? CC.accent + '22' : 'transparent',
                        border: `1px solid ${rating >= r ? CC.accent : CC.line}`,
                        fontFamily: WT_MONO, fontSize: 11, color: rating >= r ? CC.accent : CC.tx3,
                      }}>{r}</button>
                    ))}
                    {rating && <span style={{ fontFamily: WT_MONO, fontSize: 10, color: CC.accent, marginLeft: 8 }}>{rating}/5</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {ratedCount === 5 && (
          <div style={{ marginTop: 16, padding: '14px 18px', background: CC.accentBg, borderRadius: 6, border: `1px solid ${CC.line}` }}>
            <div style={{ fontFamily: WT_MONO, fontSize: 11, letterSpacing: '.06em', color: CC.accent + '88', marginBottom: 6 }}>YOUR RANKINGS COMPLETE</div>
            <div style={{ fontFamily: WT_SERIF, fontSize: 13, color: CC.tx, lineHeight: 1.75 }}>
              {(() => {
                const sorted = Object.entries(applyFWRatings).sort((a, b) => b[1] - a[1]);
                const topId = sorted[0][0];
                const topFW = UKRAINE_FRAMEWORKS.find(f => f.id === topId);
                return 'You rated "' + topFW.name + '" highest. This suggests you prioritize ' + (topId === 'clausewitz' ? 'political-strategic analysis' : topId === 'thucydides' ? 'structural/systemic explanation' : topId === 'justwar' ? 'moral evaluation' : topId === 'creveld' ? 'attention to warfare\'s transformation' : 'cultural-experiential understanding') + '. No single framework is sufficient \u2014 the most complete analysis combines all five.';
              })()}
            </div>
          </div>
        )}
      </div>
    );
  }, [applyFWRatings, UKRAINE_FRAMEWORKS]);

  // -- Escalation Dynamics Model --------------------------------------
  const ESCALATION_LADDER = useMemo(() => [
    { rung: 1, label: 'Diplomatic protest / recall of ambassador', zone: 'Subcrisis Maneuvering', zoneColor: CC.green },
    { rung: 2, label: 'Economic sanctions / trade restrictions', zone: 'Subcrisis Maneuvering', zoneColor: CC.green },
    { rung: 3, label: 'Military mobilization / force repositioning', zone: 'Subcrisis Maneuvering', zoneColor: CC.green },
    { rung: 4, label: 'Proxy conflict / covert military operations', zone: 'Traditional Crisis', zoneColor: CC.gold },
    { rung: 5, label: 'Limited conventional engagement / border clashes', zone: 'Traditional Crisis', zoneColor: CC.gold },
    { rung: 6, label: 'Major conventional war / sustained combat', zone: 'Traditional Crisis', zoneColor: CC.gold },
    { rung: 7, label: 'Deliberate escalation to break stalemate', zone: 'Intense Crisis', zoneColor: CC.red },
    { rung: 8, label: 'Strategic infrastructure attacks (energy, communications)', zone: 'Intense Crisis', zoneColor: CC.red },
    { rung: 9, label: 'Attacks on homeland / civilian population centers', zone: 'Intense Crisis', zoneColor: CC.red },
    { rung: 10, label: 'Tactical nuclear weapon use / demonstration', zone: 'Nuclear Threshold', zoneColor: '#c040c0' },
    { rung: 11, label: 'Limited nuclear exchange (military targets)', zone: 'Nuclear Threshold', zoneColor: '#c040c0' },
    { rung: 12, label: 'General nuclear war / countervalue targeting', zone: 'Nuclear Threshold', zoneColor: '#c040c0' },
  ], []);

  const ESCALATION_CRISES = useMemo(() => [
    { id: 'cuba', name: 'Cuban Missile Crisis (1962)', rung: 5, detail: 'Reached rung 5: US naval quarantine of Cuba was a limited military engagement. Both sides signaled willingness to go higher (Soviet submarines had nuclear torpedoes; US had invasion plans). Resolved at rung 5 through backchannel negotiation (Jupiter missile withdrawal). Key lesson: direct communication between leaders prevented miscalculation. Closest the Cold War came to nuclear exchange.', color: CC.blue },
    { id: 'berlin', name: 'Berlin Crises (1948, 1961)', rung: 3, detail: 'Peaked at rung 3: military mobilization and force repositioning (Berlin Airlift 1948; tank standoff at Checkpoint Charlie 1961). Neither side was willing to initiate combat over Berlin because both understood escalation to nuclear war was the likely endpoint. The Berlin Wall (1961) was an escalation in political terms but a de-escalation in military terms: it stabilized the boundary and reduced the risk of accidental confrontation.', color: CC.teal },
    { id: 'kargil', name: 'Kargil War (1999)', rung: 5, detail: 'India-Pakistan conventional war in Kashmir reached rung 5 (sustained combat along the Line of Control). Both states were nuclear-armed, creating escalation risk. Pakistan\'s nuclear capability deterred India from crossing the LoC into Pakistan-administered Kashmir, demonstrating how nuclear weapons can simultaneously cap escalation (preventing full-scale war) and enable it (Pakistan initiated the crisis believing nuclear deterrence would protect it from Indian retaliation).', color: CC.gold },
    { id: 'georgia', name: 'Russia-Georgia War (2008)', rung: 6, detail: 'Brief conventional war reached rung 6: Russian forces invaded Georgian territory, occupied South Ossetia and Abkhazia, and advanced toward Tbilisi before stopping. NATO condemned but did not intervene militarily. The crisis demonstrated that Russia was willing to use conventional force against a non-NATO neighbor and that the Western response would be limited to diplomatic protest (rung 1). This calculus directly informed Putin\'s decision-making regarding Ukraine.', color: CC.green },
    { id: 'ukraine', name: 'Ukraine War (2022-present)', rung: 8, detail: 'Currently at rung 8: sustained conventional war (rung 6) with deliberate escalation through strategic infrastructure attacks on energy grid, dam destruction, and systematic targeting of civilian areas (rung 8-9). Nuclear threats have been issued but not acted upon. The war demonstrates escalation dynamics in real time: each side incrementally crosses thresholds (Western arms deliveries, Russian mobilization, drone warfare, ATACMS, North Korean troops) in a pattern Schelling described as "the threat that leaves something to chance."', color: CC.red },
  ], []);

  const renderEscalation = useCallback(() => {
    const selected = escalationSelected ? ESCALATION_CRISES.find(c => c.id === escalationSelected) : null;
    return (
      <div>
        <div style={{ fontFamily: WT_MONO, fontSize: 12, letterSpacing: '.06em', color: CC.accent + '88', marginBottom: 6 }}>ESCALATION DYNAMICS MODEL</div>
        <div style={{ fontFamily: WT_SERIF, fontSize: 14, color: CC.tx2, lineHeight: 1.7, marginBottom: 16, maxWidth: 720 }}>
          Based on Thomas Schelling{'\u2019'}s escalation theory ("Arms and Influence," 1966) and Herman Kahn{'\u2019'}s escalation ladder ("On Escalation," 1965). Twelve rungs from diplomatic protest to nuclear exchange. Five historical crises plotted on the ladder. The critical insight: escalation is not a smooth slope but a series of thresholds, each representing a qualitative change in the nature of the conflict.
        </div>

        {/* Escalation ladder */}
        <div style={{ display: 'flex', gap: 20 }}>
          {/* Ladder */}
          <div style={{ flex: '0 0 420px' }}>
            {ESCALATION_LADDER.slice().reverse().map(step => {
              const crisisHere = ESCALATION_CRISES.filter(c => c.rung === step.rung);
              const isHighlighted = selected && selected.rung === step.rung;
              return (
                <div key={step.rung} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px',
                  background: isHighlighted ? step.zoneColor + '15' : 'transparent',
                  borderLeft: '3px solid ' + step.zoneColor + (isHighlighted ? '' : '44'),
                  marginBottom: 2, borderRadius: '0 4px 4px 0', transition: 'all .15s',
                }}>
                  <span style={{ fontFamily: WT_MONO, fontSize: 11, fontWeight: 600, color: step.zoneColor, width: 20, textAlign: 'center' }}>{step.rung}</span>
                  <span style={{ fontFamily: WT_SANS, fontSize: 11, color: isHighlighted ? CC.tx : CC.tx2, flex: 1, lineHeight: 1.4 }}>{step.label}</span>
                  {crisisHere.map(c => (
                    <button key={c.id} onClick={() => setEscalationSelected(escalationSelected === c.id ? null : c.id)} style={{
                      padding: '2px 8px', borderRadius: 3, cursor: 'pointer',
                      background: escalationSelected === c.id ? c.color + '22' : 'transparent',
                      border: `1px solid ${c.color}66`,
                      fontFamily: WT_MONO, fontSize: 9, color: c.color, letterSpacing: '.02em',
                      whiteSpace: 'nowrap',
                    }}>
                      {c.name.split('(')[0].trim()}
                    </button>
                  ))}
                </div>
              );
            })}

            {/* Zone legend */}
            <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
              {[{ label: 'Subcrisis', color: CC.green }, { label: 'Traditional Crisis', color: CC.gold }, { label: 'Intense Crisis', color: CC.red }, { label: 'Nuclear', color: '#c040c0' }].map(z => (
                <div key={z.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: z.color }} />
                  <span style={{ fontFamily: WT_MONO, fontSize: 9, color: CC.tx3, letterSpacing: '.04em' }}>{z.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div style={{ flex: 1 }}>
            {selected ? (
              <div style={{ background: CC.card, border: `1px solid ${CC.cardBd}`, borderRadius: 10, padding: '20px 24px' }}>
                <div style={{ fontFamily: WT_MONO, fontSize: 12, fontWeight: 600, color: selected.color, letterSpacing: '.04em', marginBottom: 4 }}>{selected.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontFamily: WT_MONO, fontSize: 11, color: CC.tx3 }}>PEAK ESCALATION:</span>
                  <span style={{ fontFamily: WT_MONO, fontSize: 14, fontWeight: 700, color: selected.color }}>RUNG {selected.rung}</span>
                  <span style={{ fontFamily: WT_SANS, fontSize: 11, color: CC.tx3 }}>of 12</span>
                </div>
                <div style={{ fontFamily: WT_SERIF, fontSize: 13, color: CC.tx, lineHeight: 1.75 }}>{selected.detail}</div>
              </div>
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', color: CC.tx3, fontFamily: WT_SERIF, fontSize: 14, fontStyle: 'italic' }}>
                Select a crisis on the ladder to see its escalation analysis. Note how each crisis reached a different rung {'\u2014'} and how the de-escalation mechanisms differed in each case.
              </div>
            )}

            {/* Current Russia-NATO assessment */}
            <div style={{ marginTop: 16, padding: '14px 18px', background: CC.redBg, borderRadius: 6, border: `1px solid ${CC.line}` }}>
              <div style={{ fontFamily: WT_MONO, fontSize: 11, letterSpacing: '.06em', color: CC.red, marginBottom: 6 }}>CURRENT ASSESSMENT: RUSSIA-NATO DYNAMICS</div>
              <div style={{ fontFamily: WT_SERIF, fontSize: 13, color: CC.tx, lineHeight: 1.75 }}>
                The Russia-Ukraine war sits at rung 8 (strategic infrastructure attacks) with periodic signals toward rung 10 (nuclear threats). The critical dynamic is what Schelling called {'\u201C'}the threat that leaves something to chance{'\u201D'}: neither side explicitly chooses to cross the nuclear threshold, but each escalatory step increases the probability of accidental or unauthorized crossing. NATO{'\u2019'}s involvement creates a parallel escalation ladder: arms deliveries, intelligence sharing, training, and sanctions represent rungs 2-4 of a separate NATO-Russia escalation sequence. The question is whether these two ladders remain separate or merge.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [escalationSelected, ESCALATION_LADDER, ESCALATION_CRISES]);

  // -- Handle conflict click on trinity
  const handleConflictClick = useCallback((conflict) => {
    setSelectedConflict(conflict);
    setTrinityWeights({ ...conflict.weights });
  }, []);

  // -- Render: Framework selector sidebar
  // Framework selector — doctrine manual tabs
  const renderFWSelector = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {FRAMEWORKS.map((f, i) => {
        const active = i === activeFW;
        return (
          <button
            key={f.id}
            onClick={() => setActiveFW(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', background: active ? `${f.color}15` : 'transparent',
              border: `1px solid ${active ? f.color + '40' : CC.line}`,
              borderLeft: active ? `4px solid ${f.color}` : `4px solid transparent`,
              borderRadius: '0 4px 4px 0', cursor: 'pointer', textAlign: 'left',
              transition: 'all .15s',
            }}
          >
            <span style={{ fontSize: 18, minWidth: 24, textAlign: 'center' }}>{f.icon}</span>
            <div>
              <div style={{ fontFamily: WT_MONO, fontSize: 10, color: active ? f.color : CC.tx3, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                FM {f.num} &middot; {f.thinker}
              </div>
              <div style={{ fontFamily: WT_SERIF, fontSize: 13, color: active ? CC.tx : CC.tx2, fontWeight: active ? 600 : 400 }}>
                {f.name}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );

  // -- Render: Framework detail panel
  const renderFrameworkDetail = () => (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 28 }}>{fw.icon}</span>
          <div>
            <h2 style={{ fontFamily: WT_SERIF, fontSize: 22, color: fw.color, margin: 0, fontWeight: 600 }}>{fw.name}</h2>
            <div style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.tx3 }}>{fw.thinker} &middot; {fw.work}</div>
          </div>
        </div>
        <p style={{ fontSize: 13, fontFamily: WT_SERIF, color: CC.tx, lineHeight: 1.7, marginTop: 10 }}>{fw.summary}</p>
      </div>

      {/* Elements — doctrine manual section */}
      <div style={{ fontFamily: WT_MONO, fontSize: 10, color: fw.color, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8, borderBottom: `2px solid ${fw.color}30`, paddingBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
        <MilitaryStarSVG size={12} color={fw.color} style={{ opacity: 0.3, display: 'inline-block', verticalAlign: 'middle' }} />
        SECTION 1 // Core Elements
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {fw.elements.map((el, i) => {
          const key = `${fw.id}_el_${i}`;
          const open = expandedSections[key];
          return (
            <div key={key} style={{ background: CC.card, border: `1px solid ${CC.cardBd}`, borderRadius: 6, overflow: 'hidden' }}>
              <button
                onClick={() => toggleSection(key)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: WT_MONO, fontSize: 11, fontWeight: 700, color: fw.color, minWidth: 20 }}>{i + 1}</span>
                  <span style={{ fontFamily: WT_SERIF, fontSize: 14, color: CC.tx, fontWeight: 600 }}>{el.name}</span>
                </div>
                <span style={{ fontSize: 12, color: CC.tx3 }}>{open ? '\▲' : '\▼'}</span>
              </button>
              {open && (
                <div style={{ padding: '0 14px 12px 42px' }}>
                  <p style={{ fontSize: 13, fontFamily: WT_SERIF, color: CC.tx2, lineHeight: 1.7, margin: 0 }}>{el.desc}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Critique */}
      <div style={{ padding: '12px 16px', background: `${fw.color}08`, border: `1px solid ${fw.color}20`, borderRadius: 6, marginBottom: 20 }}>
        <div style={{ fontFamily: WT_MONO, fontSize: 11, color: fw.color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Critique &amp; Limitations</div>
        <p style={{ fontSize: 13, fontFamily: WT_SERIF, color: CC.tx, lineHeight: 1.7, margin: 0 }}>{fw.critique}</p>
      </div>

      {/* Visual: Trinity Diagram for Clausewitz */}
      {fw.id === 'clausewitz' && (
        <div style={{ padding: 16, background: CC.card, border: `1px solid ${CC.cardBd}`, borderRadius: 6, marginBottom: 20, textAlign: 'center' }}>
          <div style={{ fontFamily: WT_MONO, fontSize: 11, color: CC.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>Dynamic Trinity</div>
          <svg viewBox="0 0 200 180" width={200} height={180}>
            <polygon points="100,10 20,170 180,170" fill="none" stroke={CC.accent} strokeWidth="1.5" opacity="0.4" />
            <circle cx="100" cy="10" r="6" fill={CC.red} />
            <text x="100" y="0" textAnchor="middle" fill={CC.red} fontSize="8" fontFamily="Inter">PASSION</text>
            <circle cx="20" cy="170" r="6" fill={CC.gold} />
            <text x="20" y="185" textAnchor="middle" fill={CC.gold} fontSize="8" fontFamily="Inter">CHANCE</text>
            <circle cx="180" cy="170" r="6" fill={CC.blue} />
            <text x="180" y="185" textAnchor="middle" fill={CC.blue} fontSize="8" fontFamily="Inter">REASON</text>
            <circle cx="100" cy="115" r="4" fill={CC.accent} opacity="0.8" />
            <text x="100" y="132" textAnchor="middle" fill={CC.tx2} fontSize="7" fontFamily="Inter">equilibrium</text>
          </svg>
        </div>
      )}
    </div>
  );

  // -- Render: Cases Mode
  const renderCases = () => (
    <div>
      <div style={{ padding: '14px 18px', background: CC.accentBg, border: `1px solid ${CC.accent}20`, borderRadius: 6, marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontFamily: WT_SERIF, color: CC.tx, lineHeight: 1.6, margin: 0 }}>
          Each framework is applied to a real conflict to demonstrate how analytical lenses shape explanation. The same war looks fundamentally different depending on which theory you employ. Select a framework to see its case study analysis.
        </p>
      </div>

      {FRAMEWORKS.map((f, i) => {
        const key = `case_${f.id}`;
        const open = expandedSections[key];
        const cs = f.caseStudy;
        return (
          <div key={f.id} style={{ background: CC.card, border: `1px solid ${CC.cardBd}`, borderRadius: 6, marginBottom: 10, overflow: 'hidden' }}>
            <button
              onClick={() => toggleSection(key)}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{f.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: WT_MONO, fontSize: 11, color: f.color, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {f.name}
                  </div>
                  <div style={{ fontFamily: WT_SERIF, fontSize: 14, color: CC.tx, fontWeight: 600 }}>
                    {cs.conflict}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 12, color: CC.tx3 }}>{open ? '\▲' : '\▼'}</span>
            </button>
            {open && (
              <div style={{ padding: '0 16px 16px' }}>
                <div style={{ fontFamily: WT_MONO, fontSize: 11, color: f.color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6, borderBottom: `1px solid ${CC.line}`, paddingBottom: 4 }}>
                  Application
                </div>
                <p style={{ fontSize: 13, fontFamily: WT_SERIF, color: CC.tx, lineHeight: 1.7 }}>{cs.application}</p>

                <div style={{ padding: '10px 14px', background: `${f.color}08`, border: `1px solid ${f.color}20`, borderRadius: 4 }}>
                  <div style={{ fontFamily: WT_MONO, fontSize: 11, color: f.color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>
                    Key Insight
                  </div>
                  <p style={{ fontSize: 13, fontFamily: WT_SERIF, color: CC.tx, lineHeight: 1.7, margin: 0 }}>{cs.insight}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // -- Render: Synthesis Mode
  const renderSynthesis = () => {
    const dim = SYNTHESIS_DIMENSIONS[synthDim];
    return (
      <div>
        <div style={{ padding: '14px 18px', background: CC.accentBg, border: `1px solid ${CC.accent}20`, borderRadius: 6, marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontFamily: WT_SERIF, color: CC.tx, lineHeight: 1.6, margin: 0 }}>
            Comparing all five frameworks across common analytical dimensions reveals fundamental disagreements about the nature of war. No single framework is sufficient; mastery requires holding multiple lenses simultaneously and knowing which to apply in which context.
          </p>
        </div>

        {/* Dimension selector */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {SYNTHESIS_DIMENSIONS.map((d, i) => (
            <button
              key={i}
              onClick={() => setSynthDim(i)}
              style={{
                padding: '6px 14px', borderRadius: 4,
                background: i === synthDim ? `${CC.accent}20` : 'transparent',
                border: `1px solid ${i === synthDim ? CC.accent : CC.line}`,
                color: i === synthDim ? CC.accent : CC.tx2,
                fontFamily: WT_MONO, fontSize: 12, cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {d.dimension}
            </button>
          ))}
        </div>

        {/* Comparison table */}
        <div style={{ fontFamily: WT_MONO, fontSize: 11, color: CC.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10, fontWeight: 700 }}>
          {dim.dimension}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {dim.comparisons.map(comp => {
            const f = FRAMEWORKS.find(x => x.id === comp.fwId);
            return (
              <div key={comp.fwId} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: CC.card, border: `1px solid ${CC.cardBd}`, borderRadius: 6 }}>
                <div style={{ minWidth: 100, flexShrink: 0 }}>
                  <span style={{ fontSize: 14 }}>{f.icon}</span>
                  <div style={{ fontFamily: WT_MONO, fontSize: 11, color: f.color, marginTop: 2 }}>{f.name}</div>
                </div>
                <p style={{ fontSize: 12, fontFamily: WT_SERIF, color: CC.tx2, lineHeight: 1.6, margin: 0 }}>{comp.position}</p>
              </div>
            );
          })}
        </div>

        {/* Framework complementarity matrix */}
        <div style={{ marginTop: 24, padding: 16, background: CC.card, border: `1px solid ${CC.cardBd}`, borderRadius: 6 }}>
          <div style={{ fontFamily: WT_MONO, fontSize: 11, color: CC.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
            Framework Complementarity
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { pair: 'Clausewitz + Thucydides', note: 'Domestic politics (trinity) meets systemic pressures (triad). Together they explain why states with rational policy goals still stumble into catastrophic wars.' },
              { pair: 'Just War + van Creveld', note: 'Normative framework meets its hardest test. How do jus in bello rules apply when combatant/civilian distinctions have collapsed?' },
              { pair: 'Keegan + Clausewitz', note: 'Culture shapes the "character" of war even as Clausewitz describes its "nature." The Western way of war is a cultural product, not a universal.' },
              { pair: 'Thucydides + van Creveld', note: 'State-system logic meets post-state reality. Power transitions occur between states, but armed violence increasingly occurs below the state level.' },
            ].map(item => (
              <div key={item.pair} style={{ padding: '10px 12px', background: `${CC.accent}06`, border: `1px solid ${CC.line}`, borderRadius: 4 }}>
                <div style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.accent, marginBottom: 4, fontWeight: 600 }}>{item.pair}</div>
                <p style={{ fontSize: 11, fontFamily: WT_SERIF, color: CC.tx2, lineHeight: 1.65, margin: 0 }}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div style={{ marginTop: 20, padding: '10px 14px', background: CC.card, border: `1px solid ${CC.line}`, borderRadius: 6, textAlign: 'center' }}>
          <div style={{ fontFamily: WT_MONO, fontSize: 11, color: CC.tx3, marginBottom: 6 }}>SYNTHESIS PROGRESS</div>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            {SYNTHESIS_DIMENSIONS.map((_, i) => (
              <div key={i} style={{ width: 24, height: 4, borderRadius: 2, background: i <= synthDim ? CC.accent : `${CC.accent}20`, transition: 'background .2s' }} />
            ))}
          </div>
          <div style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.tx2, marginTop: 6 }}>
            {synthDim + 1} / {SYNTHESIS_DIMENSIONS.length} dimensions explored
          </div>
        </div>
      </div>
    );
  };

  // -- Render: Trinity Mode (Interactive Clausewitz Triangle) --------
  const renderTrinity = () => {
    const w = trinityWeights;
    const ctr = trinityCenter;
    // Triangle vertices
    const V = { passion: { x: 250, y: 55 }, chance: { x: 80, y: 360 }, reason: { x: 420, y: 360 } };

    return (
      <div>
        <div style={{ padding: '14px 18px', background: CC.accentBg, border: `1px solid ${CC.accent}20`, borderRadius: 6, marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontFamily: WT_SERIF, color: CC.tx, lineHeight: 1.6, margin: 0 }}>
            The Clausewitz Trinity models war as a dynamic equilibrium among three forces: <strong style={{ color: CC.red }}>Passion</strong> (the people), <strong style={{ color: CC.gold }}>Chance</strong> (the military), and <strong style={{ color: CC.blue }}>Reason</strong> (the government). Adjust the sliders to shift the center of gravity, or click a historical conflict to see where it falls on the triangle.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <FogIcon /><Tip id="fog_of_war" />
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* SVG Triangle */}
          <div style={{ flex: '1 1 500px', background: CC.card, border: `1px solid ${CC.cardBd}`, borderRadius: 8, padding: 16 }}>
            <svg viewBox="0 0 500 450" width="100%" style={{ maxWidth: 500, display: 'block', margin: '0 auto' }}>
              <defs>
                <radialGradient id="trinityGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={CC.accent} stopOpacity="0.15" />
                  <stop offset="100%" stopColor={CC.accent} stopOpacity="0" />
                </radialGradient>
                <filter id="cogGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Background glow */}
              <polygon points={`${V.passion.x},${V.passion.y} ${V.chance.x},${V.chance.y} ${V.reason.x},${V.reason.y}`}
                fill="url(#trinityGlow)" />

              {/* Triangle edges */}
              <line x1={V.passion.x} y1={V.passion.y} x2={V.chance.x} y2={V.chance.y} stroke={CC.red} strokeWidth="1.5" opacity="0.5" />
              <line x1={V.chance.x} y1={V.chance.y} x2={V.reason.x} y2={V.reason.y} stroke={CC.gold} strokeWidth="1.5" opacity="0.5" />
              <line x1={V.reason.x} y1={V.reason.y} x2={V.passion.x} y2={V.passion.y} stroke={CC.blue} strokeWidth="1.5" opacity="0.5" />

              {/* Edge labels */}
              <text x={(V.passion.x + V.chance.x) / 2 - 20} y={(V.passion.y + V.chance.y) / 2}
                textAnchor="end" fill={CC.tx3} fontSize="8" fontFamily="Inter" opacity="0.6">
                Escalation
              </text>
              <text x={(V.chance.x + V.reason.x) / 2} y={(V.chance.y + V.reason.y) / 2 + 18}
                textAnchor="middle" fill={CC.tx3} fontSize="8" fontFamily="Inter" opacity="0.6">
                Friction / Fog of War
              </text>
              <text x={(V.reason.x + V.passion.x) / 2 + 20} y={(V.reason.y + V.passion.y) / 2}
                textAnchor="start" fill={CC.tx3} fontSize="8" fontFamily="Inter" opacity="0.6">
                Subordination
              </text>

              {/* Vertex circles + labels: Passion */}
              <circle cx={V.passion.x} cy={V.passion.y} r="45" fill={`${CC.red}18`} stroke={CC.red} strokeWidth="2" />
              <text x={V.passion.x} y={V.passion.y - 8} textAnchor="middle" fill={CC.red} fontSize="13" fontWeight="700" fontFamily="Inter">PASSION</text>
              <text x={V.passion.x} y={V.passion.y + 8} textAnchor="middle" fill={CC.tx2} fontSize="9" fontFamily="Inter">The People</text>
              <text x={V.passion.x} y={V.passion.y + 20} textAnchor="middle" fill={CC.tx3} fontSize="7" fontFamily="Inter">{w.passion}%</text>

              {/* Vertex circles + labels: Chance */}
              <circle cx={V.chance.x} cy={V.chance.y} r="45" fill={`${CC.gold}18`} stroke={CC.gold} strokeWidth="2" />
              <text x={V.chance.x} y={V.chance.y - 8} textAnchor="middle" fill={CC.gold} fontSize="13" fontWeight="700" fontFamily="Inter">CHANCE</text>
              <text x={V.chance.x} y={V.chance.y + 8} textAnchor="middle" fill={CC.tx2} fontSize="9" fontFamily="Inter">The Military</text>
              <text x={V.chance.x} y={V.chance.y + 20} textAnchor="middle" fill={CC.tx3} fontSize="7" fontFamily="Inter">{w.chance}%</text>

              {/* Vertex circles + labels: Reason */}
              <circle cx={V.reason.x} cy={V.reason.y} r="45" fill={`${CC.blue}18`} stroke={CC.blue} strokeWidth="2" />
              <text x={V.reason.x} y={V.reason.y - 8} textAnchor="middle" fill={CC.blue} fontSize="13" fontWeight="700" fontFamily="Inter">REASON</text>
              <text x={V.reason.x} y={V.reason.y + 8} textAnchor="middle" fill={CC.tx2} fontSize="9" fontFamily="Inter">The Government</text>
              <text x={V.reason.x} y={V.reason.y + 20} textAnchor="middle" fill={CC.tx3} fontSize="7" fontFamily="Inter">{w.reason}%</text>

              {/* Dashed lines from center to each vertex */}
              <line x1={ctr.x} y1={ctr.y} x2={V.passion.x} y2={V.passion.y} stroke={CC.red} strokeWidth="1" strokeDasharray="4,3" opacity="0.3" />
              <line x1={ctr.x} y1={ctr.y} x2={V.chance.x} y2={V.chance.y} stroke={CC.gold} strokeWidth="1" strokeDasharray="4,3" opacity="0.3" />
              <line x1={ctr.x} y1={ctr.y} x2={V.reason.x} y2={V.reason.y} stroke={CC.blue} strokeWidth="1" strokeDasharray="4,3" opacity="0.3" />

              {/* Center of gravity */}
              <circle cx={ctr.x} cy={ctr.y} r="10" fill={CC.accent} opacity="0.9" filter="url(#cogGlow)" />
              <circle cx={ctr.x} cy={ctr.y} r="4" fill="#fff" opacity="0.8" />
              <text x={ctr.x} y={ctr.y - 16} textAnchor="middle" fill={CC.tx} fontSize="8" fontWeight="600" fontFamily="Inter">
                CENTER OF
              </text>
              <text x={ctr.x} y={ctr.y - 7} textAnchor="middle" fill={CC.tx} fontSize="8" fontWeight="600" fontFamily="Inter">
                GRAVITY
              </text>

              {/* Conflict markers on triangle if selected */}
              {selectedConflict && (() => {
                const cw = selectedConflict.weights;
                const ct = cw.passion + cw.chance + cw.reason;
                const scx = (cw.passion * V.passion.x + cw.chance * V.chance.x + cw.reason * V.reason.x) / ct;
                const scy = (cw.passion * V.passion.y + cw.chance * V.chance.y + cw.reason * V.reason.y) / ct;
                return (
                  <g>
                    <circle cx={scx} cy={scy} r="14" fill="none" stroke={CC.accent} strokeWidth="2" strokeDasharray="3,2" opacity="0.6" />
                    <text x={scx} y={scy + 24} textAnchor="middle" fill={CC.accent} fontSize="8" fontWeight="600" fontFamily="Inter">
                      {selectedConflict.name}
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Controls panel */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Sliders */}
            <div style={{ background: CC.card, border: `1px solid ${CC.cardBd}`, borderRadius: 8, padding: 16 }}>
              <div style={{ fontFamily: WT_MONO, fontSize: 11, color: CC.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>
                ADJUST WEIGHTS
              </div>
              {[
                { key: 'passion', label: 'Passion', color: CC.red, sub: 'Violence, hatred, enmity' },
                { key: 'chance', label: 'Chance', color: CC.gold, sub: 'Fog of war, probability' },
                { key: 'reason', label: 'Reason', color: CC.blue, sub: 'Policy, rational calculation' },
              ].map(s => (
                <div key={s.key} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div>
                      <span style={{ fontFamily: WT_SERIF, fontSize: 13, color: s.color, fontWeight: 600 }}>{s.label}</span>
                      <span style={{ fontFamily: WT_MONO, fontSize: 11, color: CC.tx3, marginLeft: 8 }}>{s.sub}</span>
                    </div>
                    <span style={{ fontFamily: WT_MONO, fontSize: 12, color: s.color, fontWeight: 700 }}>{w[s.key]}</span>
                  </div>
                  <input
                    type="range" min="0" max="100" value={w[s.key]}
                    onChange={(e) => {
                      setTrinityWeights(prev => ({ ...prev, [s.key]: parseInt(e.target.value) }));
                      setSelectedConflict(null);
                    }}
                    style={{ width: '100%', accentColor: s.color, cursor: 'pointer' }}
                  />
                </div>
              ))}
            </div>

            {/* Conflict examples */}
            <div style={{ background: CC.card, border: `1px solid ${CC.cardBd}`, borderRadius: 8, padding: 16 }}>
              <div style={{ fontFamily: WT_MONO, fontSize: 11, color: CC.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
                HISTORICAL CONFLICTS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {TRINITY_CONFLICTS.map(c => {
                  const isActive = selectedConflict && selectedConflict.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleConflictClick(c)}
                      style={{
                        padding: '8px 12px', borderRadius: 6, cursor: 'pointer', textAlign: 'left',
                        background: isActive ? `${CC.accent}15` : 'transparent',
                        border: `1px solid ${isActive ? CC.accent + '50' : CC.line}`,
                        transition: 'all .15s',
                      }}
                    >
                      <div style={{ fontFamily: WT_SERIF, fontSize: 13, color: isActive ? CC.accent : CC.tx, fontWeight: isActive ? 600 : 400 }}>
                        {c.name}
                      </div>
                      <div style={{ fontFamily: WT_MONO, fontSize: 11, color: CC.tx3 }}>{c.period}</div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        <span style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.red }}>P:{c.weights.passion}</span>
                        <span style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.gold }}>C:{c.weights.chance}</span>
                        <span style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.blue }}>R:{c.weights.reason}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Detail panel for selected conflict */}
        {selectedConflict && (
          <div style={{ marginTop: 20, padding: 20, background: CC.card, border: `1px solid ${CC.accent}30`, borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <h3 style={{ fontFamily: WT_SERIF, fontSize: 18, color: CC.accent, margin: 0, fontWeight: 600 }}>
                  {selectedConflict.name}
                </h3>
                <div style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.tx3 }}>{selectedConflict.period}</div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: WT_MONO, fontSize: 18, color: CC.red, fontWeight: 700 }}>{selectedConflict.weights.passion}</div>
                  <div style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.tx3 }}>PASSION</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: WT_MONO, fontSize: 18, color: CC.gold, fontWeight: 700 }}>{selectedConflict.weights.chance}</div>
                  <div style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.tx3 }}>CHANCE</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: WT_MONO, fontSize: 18, color: CC.blue, fontWeight: 700 }}>{selectedConflict.weights.reason}</div>
                  <div style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.tx3 }}>REASON</div>
                </div>
              </div>
            </div>
            <div style={{ fontFamily: WT_MONO, fontSize: 11, color: CC.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>
              WHY IT SITS HERE
            </div>
            <p style={{ fontSize: 13, fontFamily: WT_SERIF, color: CC.tx, lineHeight: 1.7, margin: 0 }}>
              {selectedConflict.explanation}
            </p>
          </div>
        )}
      </div>
    );
  };

  // -- Render: Classify Mode (Conflict Classification Matrix) --------
  const renderClassify = () => {
    const pad = { left: 80, right: 30, top: 30, bottom: 60 };
    const plotW = 700, plotH = 400;
    const innerW = plotW - pad.left - pad.right;
    const innerH = plotH - pad.top - pad.bottom;

    return (
      <div>
        <div style={{ padding: '14px 18px', background: CC.accentBg, border: `1px solid ${CC.accent}20`, borderRadius: 6, marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontFamily: WT_SERIF, color: CC.tx, lineHeight: 1.6, margin: 0 }}>
            Conflicts can be classified along two axes: <strong>Interstate vs. Intrastate</strong> (who fights) and <strong>Limited vs. Total</strong> (how far it escalates). Click any conflict to see belligerents, casualties, duration, and which theoretical framework best explains its dynamics.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <TotalWarIcon /><Tip id="total_war" />
        </div>

        {/* SVG Scatter Plot */}
        <div style={{ background: CC.card, border: `1px solid ${CC.cardBd}`, borderRadius: 8, padding: 16, overflowX: 'auto' }}>
          <svg viewBox={`0 0 ${plotW} ${plotH}`} width="100%" style={{ maxWidth: plotW, display: 'block', margin: '0 auto' }}>
            <defs>
              <filter id="dotGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Quadrant backgrounds */}
            <rect x={pad.left} y={pad.top} width={innerW / 2} height={innerH / 2}
              fill={`${CC.blue}08`} />
            <rect x={pad.left + innerW / 2} y={pad.top} width={innerW / 2} height={innerH / 2}
              fill={`${CC.red}08`} />
            <rect x={pad.left} y={pad.top + innerH / 2} width={innerW / 2} height={innerH / 2}
              fill={`${CC.green}08`} />
            <rect x={pad.left + innerW / 2} y={pad.top + innerH / 2} width={innerW / 2} height={innerH / 2}
              fill={`${CC.gold}08`} />

            {/* Quadrant labels */}
            <text x={pad.left + innerW * 0.25} y={pad.top + 18} textAnchor="middle" fill={CC.blue} fontSize="9" fontWeight="600" fontFamily="Inter" opacity="0.7">
              Classical Interstate War
            </text>
            <text x={pad.left + innerW * 0.75} y={pad.top + 18} textAnchor="middle" fill={CC.red} fontSize="9" fontWeight="600" fontFamily="Inter" opacity="0.7">
              Total Civil War
            </text>
            <text x={pad.left + innerW * 0.25} y={pad.top + innerH - 6} textAnchor="middle" fill={CC.green} fontSize="9" fontWeight="600" fontFamily="Inter" opacity="0.7">
              Limited Interstate
            </text>
            <text x={pad.left + innerW * 0.75} y={pad.top + innerH - 6} textAnchor="middle" fill={CC.gold} fontSize="9" fontWeight="600" fontFamily="Inter" opacity="0.7">
              Internal Conflict
            </text>

            {/* Axes */}
            <line x1={pad.left} y1={pad.top + innerH} x2={pad.left + innerW} y2={pad.top + innerH}
              stroke={CC.tx3} strokeWidth="1" />
            <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + innerH}
              stroke={CC.tx3} strokeWidth="1" />

            {/* Axis labels */}
            <text x={pad.left + innerW / 2} y={plotH - 8} textAnchor="middle" fill={CC.tx2} fontSize="10" fontFamily="Inter">
              Interstate ← → Intrastate
            </text>
            <text x={14} y={pad.top + innerH / 2} textAnchor="middle" fill={CC.tx2} fontSize="10" fontFamily="Inter"
              transform={`rotate(-90, 14, ${pad.top + innerH / 2})`}>
              Limited ← → Total
            </text>

            {/* Arrow tips */}
            <text x={pad.left + 4} y={plotH - 8} fill={CC.tx3} fontSize="8" fontFamily="Inter">Interstate</text>
            <text x={pad.left + innerW - 4} y={plotH - 8} textAnchor="end" fill={CC.tx3} fontSize="8" fontFamily="Inter">Intrastate</text>
            <text x={30} y={pad.top + innerH - 2} fill={CC.tx3} fontSize="8" fontFamily="Inter">Limited</text>
            <text x={30} y={pad.top + 10} fill={CC.tx3} fontSize="8" fontFamily="Inter">Total</text>

            {/* Center crosshair */}
            <line x1={pad.left + innerW / 2} y1={pad.top} x2={pad.left + innerW / 2} y2={pad.top + innerH}
              stroke={CC.tx3} strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4" />
            <line x1={pad.left} y1={pad.top + innerH / 2} x2={pad.left + innerW} y2={pad.top + innerH / 2}
              stroke={CC.tx3} strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4" />

            {/* Conflict dots */}
            {CLASSIFY_CONFLICTS.map(c => {
              const cx = pad.left + c.x * innerW;
              const cy = pad.top + (1 - c.y) * innerH;
              const isActive = selectedClassify && selectedClassify.id === c.id;
              const dotColor = c.x < 0.5
                ? (c.y > 0.5 ? CC.blue : CC.green)
                : (c.y > 0.5 ? CC.red : CC.gold);
              return (
                <g key={c.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedClassify(isActive ? null : c)}>
                  {isActive && <circle cx={cx} cy={cy} r="18" fill="none" stroke={CC.accent} strokeWidth="2" strokeDasharray="3,2" />}
                  <circle cx={cx} cy={cy} r={isActive ? 8 : 6} fill={dotColor} opacity={isActive ? 1 : 0.8}
                    filter={isActive ? 'url(#dotGlow)' : undefined} />
                  <text x={cx} y={cy - 12} textAnchor="middle" fill={isActive ? CC.tx : CC.tx2}
                    fontSize={isActive ? '9' : '8'} fontWeight={isActive ? '700' : '400'} fontFamily="Inter">
                    {c.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        {selectedClassify && (
          <div style={{ marginTop: 20, padding: 20, background: CC.card, border: `1px solid ${CC.accent}30`, borderRadius: 8 }}>
            <h3 style={{ fontFamily: WT_SERIF, fontSize: 18, color: CC.accent, margin: '0 0 4px', fontWeight: 600 }}>
              {selectedClassify.name}
            </h3>
            <div style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.tx3, marginBottom: 16 }}>{selectedClassify.period}</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'BELLIGERENTS', value: selectedClassify.belligerents },
                { label: 'CASUALTIES', value: selectedClassify.casualties },
                { label: 'DURATION', value: selectedClassify.duration },
                { label: 'BEST FRAMEWORK', value: selectedClassify.framework },
              ].map(item => (
                <div key={item.label} style={{ padding: '10px 12px', background: `${CC.accent}06`, border: `1px solid ${CC.line}`, borderRadius: 4 }}>
                  <div style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.tx3, letterSpacing: 1.5, marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontFamily: WT_SERIF, fontSize: 12, color: CC.tx, lineHeight: 1.65 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: WT_MONO, fontSize: 11, color: CC.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>
              POSITION RATIONALE
            </div>
            <p style={{ fontSize: 13, fontFamily: WT_SERIF, color: CC.tx, lineHeight: 1.7, margin: 0 }}>
              {selectedClassify.why}
            </p>
          </div>
        )}
      </div>
    );
  };

  // -- Main Return — War College Lecture Hall ────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: CC.bg, backgroundImage: TOPO_BG, color: CC.tx, padding: '40px 20px', fontFamily: WT_SANS, position: 'relative', overflow: 'hidden' }}>
      <TopoContours />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Back */}
        <button
          onClick={() => setView('home')}
          style={{
            background: 'none', border: `1px solid ${CC.line}`, color: CC.tx2,
            fontFamily: WT_SANS, fontSize: 13, padding: '6px 16px', borderRadius: 4,
            cursor: 'pointer', marginBottom: 20, transition: 'all .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = CC.accent; e.currentTarget.style.borderColor = CC.accent; }}
          onMouseLeave={e => { e.currentTarget.style.color = CC.tx2; e.currentTarget.style.borderColor = CC.line; }}
        >
          &larr; Portfolio
        </button>

        {/* Header — OPORD military briefing style */}
        <div style={{ marginBottom: 32, borderBottom: `2px solid ${CC.accent}30`, paddingBottom: 24, position: 'relative' }}>
          {/* Military star decorations */}
          <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: 4 }}>
            <MilitaryStarSVG size={14} color={CC.accent} style={{ opacity: 0.12 }} />
            <MilitaryStarSVG size={14} color={CC.accent} style={{ opacity: 0.08 }} />
            <MilitaryStarSVG size={14} color={CC.accent} style={{ opacity: 0.04 }} />
          </div>
          <div style={{ fontSize: 10, fontFamily: WT_MONO, textTransform: 'uppercase', letterSpacing: 3, color: CC.olive, marginBottom: 4, borderLeft: '3px solid ' + CC.olive, paddingLeft: 8 }}>
            OPORD // ACADEMIC EXERCISE
          </div>
          <div style={{ fontSize: 11, fontFamily: WT_MONO, textTransform: 'uppercase', letterSpacing: 2, color: CC.tx3, marginBottom: 8 }}>
            PCS/SOC &middot; War Theory &amp; Sociology of Violence
          </div>
          <h1 style={{ fontSize: 30, fontFamily: WT_SERIF, color: CC.accent, margin: '0 0 6px', fontWeight: 400, letterSpacing: 0.5 }}>
            Clausewitz Trinity Analyzer
          </h1>
          <p style={{ fontSize: 14, fontFamily: WT_SERIF, color: CC.tx2, margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
            Five theoretical lenses for understanding war &mdash; each applied to a real conflict
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0 2px' }}>
            <TrinityIcon /><Tip id="clausewitz_trinity" />
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
            {WT_SKILLS.map(s => (
              <span key={s} style={{ padding: '3px 8px', borderRadius: 2, background: `${CC.olive}15`, border: `1px solid ${CC.olive}25`, fontSize: 11, fontFamily: WT_MONO, color: `${CC.olive}cc`, letterSpacing: '.06em' }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Mode Tabs — military briefing sections */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: `2px solid ${CC.line}`, paddingBottom: 12, flexWrap: 'wrap' }}>
          {MODES.map(m => {
            const active = m.id === mode;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                style={{
                  padding: '8px 18px', borderRadius: '4px 4px 0 0',
                  background: active ? `${CC.accent}18` : 'transparent',
                  border: active ? `1px solid ${CC.accent}44` : `1px solid transparent`,
                  borderBottom: active ? `2px solid ${CC.accent}` : `2px solid transparent`,
                  color: active ? CC.accent : CC.tx3,
                  fontFamily: WT_MONO, fontSize: 11, cursor: 'pointer',
                  transition: 'all .15s', fontWeight: active ? 600 : 400,
                  letterSpacing: '.08em',
                }}
              >
                {m.icon} {m.label}
              </button>
            );
          })}
        </div>

        {/* Frameworks Mode: two-column layout */}
        {mode === 'frameworks' && (
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, alignItems: 'start' }}>
            {renderFWSelector()}
            {renderFrameworkDetail()}
          </div>
        )}

        {/* Cases Mode */}
        {mode === 'cases' && renderCases()}

        {/* Synthesis Mode */}
        {mode === 'synthesis' && renderSynthesis()}

        {/* Trinity Mode */}
        {mode === 'trinity' && renderTrinity()}

        {/* Classify Mode */}
        {mode === 'classify' && renderClassify()}

        {/* Apply Mode */}
        {mode === 'apply' && renderApplyToWar()}

        {/* Escalation Mode */}
        {mode === 'escalation' && renderEscalation()}

        {/* Provenance */}
        <div style={{ marginTop: 40, paddingTop: 16, borderTop: `1px solid ${CC.line}` }}>
          <p style={{ fontFamily: WT_MONO, fontSize: 12, color: CC.tx3, lineHeight: 1.6 }}>
            PROVENANCE: Clausewitz, "On War" (Howard/Paret trans., 1976); Thucydides, "History of the Peloponnesian War" (Strassler ed., 1996); Walzer, "Just and Unjust Wars" (5th ed., 2015); Keegan, "A History of Warfare" (1993); van Creveld, "The Transformation of War" (1991). Additional: Allison, "Destined for War" (2017); Kaldor, "New and Old Wars" (3rd ed., 2012); Kalyvas, "The Logic of Violence in Civil War" (2006); Hanson, "The Western Way of War" (1989). Conflict case studies drawn from standard secondary sources and course materials.
          </p>
        </div>
      </div>
    </div>
  );
}
