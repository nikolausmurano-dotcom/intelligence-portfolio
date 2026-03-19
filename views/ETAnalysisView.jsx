// ETAnalysisView.jsx — Bellaby Escalation Ladder
// Ethics of Intelligence (MPAI 5000)
//
// The visitor climbs a 7-rung ethical escalation ladder. At each rung,
// they face an intelligence scenario of increasing moral complexity and
// must evaluate it against Bellaby's Just Intelligence framework —
// seven criteria adapted from Just War Theory for intelligence ethics.
// Expert analysis reveals legal precedents, oversight failures, and
// the ethical fault lines that separate lawful collection from abuse.

// ── Palette: Dark wood courtroom with judicial gravitas ─────────────────
const ET_C = {
  bg: '#0e0a06',
  card: 'rgba(18,14,8,.92)',
  cardBd: 'rgba(180,160,100,.12)',
  tx: '#d0ccc0',
  tx2: '#a8a290',
  tx3: '#837f73',
  gold: '#c4a040',
  goldDm: '#9a7e30',
  goldBg: 'rgba(196,160,64,.08)',
  green: '#4a9060',
  greenDm: '#387048',
  greenBg: 'rgba(74,144,96,.07)',
  red: '#b04040',
  redDm: '#8a2e2e',
  redBg: 'rgba(176,64,64,.07)',
  amber: '#c08820',
  amberDm: '#9a6e18',
  amberBg: 'rgba(192,136,32,.07)',
  blue: '#4870a8',
  blueDm: '#385888',
  blueBg: 'rgba(72,112,168,.07)',
  line: 'rgba(180,160,100,.10)',
  wood: 'rgba(80,50,20,.08)',
};
const ET_Mono = "'IBM Plex Mono',monospace";
const ET_Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const ET_Sans = "'Inter',Helvetica,sans-serif";

// ── Courtroom / Tribunal decorative elements ─────────────────

var ScalesOfJustice = function(props) {
  var size = props.size || 120;
  var opacity = props.opacity || 0.03;
  return React.createElement('svg', {
    width: size, height: size, viewBox: '0 0 120 120',
    style: Object.assign({ opacity: opacity, pointerEvents: 'none' }, props.style || {})
  },
    // Central pillar
    React.createElement('line', { x1: 60, y1: 15, x2: 60, y2: 95, stroke: '#c4a040', strokeWidth: 2 }),
    // Base
    React.createElement('path', { d: 'M35 95 L60 90 L85 95 L85 100 L35 100Z', fill: '#c4a040', fillOpacity: 0.3 }),
    React.createElement('line', { x1: 30, y1: 100, x2: 90, y2: 100, stroke: '#c4a040', strokeWidth: 1.5 }),
    // Beam
    React.createElement('line', { x1: 15, y1: 25, x2: 105, y2: 25, stroke: '#c4a040', strokeWidth: 1.5 }),
    // Left pan
    React.createElement('line', { x1: 15, y1: 25, x2: 15, y2: 55, stroke: '#c4a040', strokeWidth: 0.8 }),
    React.createElement('line', { x1: 35, y1: 25, x2: 35, y2: 55, stroke: '#c4a040', strokeWidth: 0.8 }),
    React.createElement('path', { d: 'M10 55 Q25 65 40 55', fill: 'none', stroke: '#c4a040', strokeWidth: 1 }),
    React.createElement('line', { x1: 10, y1: 55, x2: 15, y2: 55, stroke: '#c4a040', strokeWidth: 0.8 }),
    React.createElement('line', { x1: 35, y1: 55, x2: 40, y2: 55, stroke: '#c4a040', strokeWidth: 0.8 }),
    // Right pan
    React.createElement('line', { x1: 85, y1: 25, x2: 85, y2: 55, stroke: '#c4a040', strokeWidth: 0.8 }),
    React.createElement('line', { x1: 105, y1: 25, x2: 105, y2: 55, stroke: '#c4a040', strokeWidth: 0.8 }),
    React.createElement('path', { d: 'M80 55 Q95 65 110 55', fill: 'none', stroke: '#c4a040', strokeWidth: 1 }),
    React.createElement('line', { x1: 80, y1: 55, x2: 85, y2: 55, stroke: '#c4a040', strokeWidth: 0.8 }),
    React.createElement('line', { x1: 105, y1: 55, x2: 110, y2: 55, stroke: '#c4a040', strokeWidth: 0.8 }),
    // Pivot ornament
    React.createElement('circle', { cx: 60, cy: 15, r: 5, fill: 'none', stroke: '#c4a040', strokeWidth: 1 }),
    React.createElement('circle', { cx: 60, cy: 15, r: 2, fill: '#c4a040', fillOpacity: 0.4 })
  );
};

var GavelIcon = function(props) {
  return React.createElement('svg', {
    width: props.size || 20, height: props.size || 20, viewBox: '0 0 24 24',
    style: { opacity: 0.5, verticalAlign: 'middle', marginRight: 6 }
  },
    // Handle
    React.createElement('line', { x1: 4, y1: 20, x2: 14, y2: 10, stroke: '#c4a040', strokeWidth: 1.5, strokeLinecap: 'round' }),
    // Head
    React.createElement('rect', { x: 12, y: 4, width: 10, height: 5, rx: 1, fill: 'none', stroke: '#c4a040', strokeWidth: 1, transform: 'rotate(-45, 17, 6.5)' }),
    // Sounding block
    React.createElement('rect', { x: 2, y: 21, width: 12, height: 2, rx: 0.5, fill: '#c4a040', fillOpacity: 0.3 })
  );
};

var WoodGrainBg = function() {
  return React.createElement('div', {
    style: {
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none', zIndex: 0,
      background: 'repeating-linear-gradient(90deg, rgba(80,50,20,.02) 0px, transparent 1px, transparent 60px, rgba(80,50,20,.02) 61px), repeating-linear-gradient(180deg, rgba(80,50,20,.015) 0px, transparent 1px, transparent 120px, rgba(80,50,20,.015) 121px)',
    }
  });
};

var LegalArticleHeader = function(props) {
  return React.createElement('div', {
    style: {
      display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
      padding: '6px 12px',
      borderBottom: '2px solid rgba(196,160,64,.12)',
    }
  },
    React.createElement(GavelIcon, { size: 16 }),
    React.createElement('span', { style: { fontFamily: ET_Mono, fontSize: 10, color: ET_C.goldDm, letterSpacing: '.12em', textTransform: 'uppercase' } }, props.label || 'ARTICLE')
  );
};

var CourtSeal = function() {
  return React.createElement('svg', {
    width: '160', height: '160', viewBox: '0 0 160 160',
    style: { position: 'absolute', top: '50px', right: '10px', opacity: 0.02, pointerEvents: 'none' }
  },
    React.createElement('circle', { cx: 80, cy: 80, r: 75, fill: 'none', stroke: '#c4a040', strokeWidth: 1.5 }),
    React.createElement('circle', { cx: 80, cy: 80, r: 65, fill: 'none', stroke: '#c4a040', strokeWidth: 0.8 }),
    React.createElement('circle', { cx: 80, cy: 80, r: 55, fill: 'none', stroke: '#c4a040', strokeWidth: 0.5 }),
    // Scales in center
    React.createElement('line', { x1: 80, y1: 50, x2: 80, y2: 100, stroke: '#c4a040', strokeWidth: 1 }),
    React.createElement('line', { x1: 55, y1: 60, x2: 105, y2: 60, stroke: '#c4a040', strokeWidth: 1 }),
    React.createElement('path', { d: 'M50 75 Q60 82 70 75', fill: 'none', stroke: '#c4a040', strokeWidth: 0.8 }),
    React.createElement('path', { d: 'M90 75 Q100 82 110 75', fill: 'none', stroke: '#c4a040', strokeWidth: 0.8 }),
    React.createElement('line', { x1: 55, y1: 60, x2: 50, y2: 75, stroke: '#c4a040', strokeWidth: 0.6 }),
    React.createElement('line', { x1: 70, y1: 60, x2: 70, y2: 75, stroke: '#c4a040', strokeWidth: 0.6 }),
    React.createElement('line', { x1: 90, y1: 60, x2: 90, y2: 75, stroke: '#c4a040', strokeWidth: 0.6 }),
    React.createElement('line', { x1: 105, y1: 60, x2: 110, y2: 75, stroke: '#c4a040', strokeWidth: 0.6 }),
    React.createElement('line', { x1: 65, y1: 100, x2: 95, y2: 100, stroke: '#c4a040', strokeWidth: 1 })
  );
};

const ET_SKILLS = [
  'Just Intelligence Theory (Bellaby)',
  'Just War Theory Adaptation',
  'Ethical Proportionality Analysis',
  'Intelligence Oversight Frameworks',
  'Fourth Amendment Jurisprudence',
  'Church Committee Legacy',
  'EO 12333 / FISA Compliance',
  'Covert Action Ethics',
];

// ── The 7 Bellaby Criteria ─────────────────────────────────────────
const CRITERIA = [
  { id: 'just_cause', label: 'Just Cause', short: 'JC', desc: 'Is there a genuine security threat that warrants intelligence action? The threat must be real, identifiable, and of sufficient gravity to justify the intrusion.' },
  { id: 'right_intention', label: 'Right Intention', short: 'RI', desc: 'Is the purpose to protect the public from harm, not to gain political advantage, punish dissent, or consolidate power?' },
  { id: 'proper_authority', label: 'Proper Authority', short: 'PA', desc: 'Does the authorizing body have a legitimate oversight mandate? Has the operation been approved through lawful channels with democratic accountability?' },
  { id: 'last_resort', label: 'Last Resort', short: 'LR', desc: 'Have less intrusive methods been exhausted or genuinely considered? Intelligence collection should not leap to invasive measures when open-source or diplomatic alternatives exist.' },
  { id: 'proportionality', label: 'Proportionality', short: 'PR', desc: 'Is the intelligence gain proportional to the harm caused? The value of the expected product must outweigh the moral cost of the collection method.' },
  { id: 'discrimination', label: 'Discrimination', short: 'DS', desc: 'Are innocent parties protected from collateral intrusion? Collection must be targeted, not dragnet, and must minimize harm to bystanders.' },
  { id: 'success', label: 'Reasonable Success', short: 'RS', desc: 'Will the operation likely yield actionable intelligence? Speculative collection that causes real harm without probable benefit fails this criterion.' },
];

const EVAL_OPTIONS = [
  { value: 'justified', label: 'Justified', color: ET_C.green, colorDm: ET_C.greenDm },
  { value: 'partial', label: 'Partially Justified', color: ET_C.amber, colorDm: ET_C.amberDm },
  { value: 'not_justified', label: 'Not Justified', color: ET_C.red, colorDm: ET_C.redDm },
];

// ── 7 Scenarios (escalating ethical complexity) ────────────────────
const SCENARIOS = [
  {
    rung: 1,
    title: 'Open-Source Monitoring',
    classification: 'UNCLASSIFIED // FOR OFFICIAL USE ONLY',
    brief: 'A known extremist with ties to a designated foreign terrorist organization maintains active public social media accounts. He posts propaganda, recruitment material, and thinly veiled operational planning in open forums. The domestic intelligence service proposes systematic monitoring and archiving of all public posts, follower networks, and interaction patterns.',
    context: 'The subject has been identified by name in a UN sanctions list. His posts are publicly accessible. No court order is required for open-source collection under current law.',
    criteria_notes: {
      just_cause: 'Designated terrorist with documented propaganda activity. Threat is established and specific.',
      right_intention: 'Purpose is threat monitoring and early warning of radicalization networks. No political motive.',
      proper_authority: 'Open-source collection requires minimal authorization. Agency has standing authority for publicly available information.',
      last_resort: 'This is the least intrusive method available. OSINT is the baseline before any other collection.',
      proportionality: 'Minimal intrusion — information is voluntarily published. Intelligence value is moderate to high.',
      discrimination: 'Follower network mapping may sweep in innocent contacts. Must be bounded to operationally relevant connections.',
      success: 'High probability of yielding actionable intelligence. OSINT on known extremists has established track record.',
    },
    expert: {
      verdict: 'Clearly justified under all seven criteria with one caveat.',
      analysis: 'This scenario represents the ethical floor — the easiest case on the ladder. Open-source monitoring of designated terrorists is well within established legal authority and minimal intrusion standards. The one nuance is discrimination: follower-network mapping can inadvertently create dossiers on journalists, researchers, and curious bystanders who follow extremist accounts. The Church Committee (1975) warned that even lawful collection can create chilling effects on legitimate speech. Best practice: apply a relevance filter before archiving secondary contacts.',
      precedents: [
        'Smith v. Maryland (1979): no reasonable expectation of privacy in information voluntarily shared with third parties',
        'EO 12333 Section 2.3: authorizes collection of publicly available information',
        'ODNI Open Source Enterprise: standing authority for OSINT on designated threats',
      ],
    },
  },
  {
    rung: 2,
    title: 'Allied SIGINT Collection',
    classification: 'TOP SECRET // SI // REL FVEY',
    brief: 'A senior diplomat from a close NATO ally is suspected of passing classified alliance military plans to a non-allied state. SIGINT capabilities can intercept the diplomat\'s encrypted communications by exploiting a known vulnerability in the embassy\'s cipher system. The operation would require tasking assets currently allocated to counterterrorism.',
    context: 'The ally is a Five Eyes partner. The diplomat has diplomatic immunity. Evidence of espionage comes from a single HUMINT source of moderate reliability. The ally\'s counterintelligence service has not been notified.',
    criteria_notes: {
      just_cause: 'Potential compromise of alliance military plans is a serious security threat. But evidence rests on a single moderate-reliability source.',
      right_intention: 'Intent is to protect alliance security. However, intercepting an ally\'s diplomat creates a dual motive: security plus intelligence advantage over the ally.',
      proper_authority: 'SIGINT collection on diplomatic communications requires senior authorization. Intercepting an ally raises FVEY agreement complications — the "no-spy" understanding.',
      last_resort: 'Alternative: notify the ally\'s CI service and let them investigate. But this risks tipping off the diplomat if the ally\'s service is compromised.',
      proportionality: 'Alliance military plans are high-value. But burning a cipher vulnerability is a significant cost, and discovery could damage a critical alliance.',
      discrimination: 'Intercepting embassy communications will capture other diplomats\' communications. Cannot target one individual without sweeping others.',
      success: 'Moderate-to-high if the cipher exploitation works. But the diplomat may use alternative channels for the most sensitive transfers.',
    },
    expert: {
      verdict: 'Partially justified — serious concerns on authority, last resort, and discrimination.',
      analysis: 'Allied espionage is a genuine threat (Aldrich Ames, Robert Hanssen, and Jonathan Pollard demonstrated that allies do spy on each other). However, this scenario tests whether "we can" means "we should." The FVEY understanding, while not a binding treaty, creates a normative expectation. Unilateral SIGINT on an ally\'s diplomat without exhausting the liaison channel first inverts the last-resort principle. The proportionality calculation must include alliance damage if discovered — the fallout from the Snowden revelations on NSA collection against allied leaders (Merkel\'s phone) demonstrates the strategic cost.',
      precedents: [
        'NSA surveillance of Angela Merkel (revealed 2013): demonstrated catastrophic alliance damage from allied SIGINT',
        'Pollard case (1985): ally-on-ally espionage is real but handling it through CI liaison is preferred',
        'Vienna Convention on Diplomatic Relations (1961): diplomatic immunity complicates any direct action',
        'PPD-28 (2014): post-Snowden reform restricting bulk SIGINT on allied leaders',
      ],
    },
  },
  {
    rung: 3,
    title: 'HUMINT Recruitment Under Duress',
    classification: 'TOP SECRET // HCS-O // NOFORN',
    brief: 'A mid-level official in a hostile state\'s nuclear weapons program has family members living in a third country. The family\'s immigration status is precarious — they face deportation back to the hostile state if their visas are not renewed. A case officer proposes approaching the official and offering to secure the family\'s status in exchange for information on the weapons program. The implicit message: cooperate, or we cannot help your family.',
    context: 'The hostile state is known to be accelerating weapons development. The official has access to centrifuge design specifications. The family has not been threatened directly, but the case officer\'s approach leverages their vulnerability.',
    criteria_notes: {
      just_cause: 'Nuclear proliferation by a hostile state is among the gravest security threats. Just cause is strong.',
      right_intention: 'The intent is nonproliferation intelligence. But the method exploits family vulnerability — the line between recruitment and coercion is thin.',
      proper_authority: 'HUMINT recruitment of foreign officials is within CIA statutory authority. But coercive recruitment may require additional legal review.',
      last_resort: 'Other collection methods (SIGINT, MASINT, satellite imagery) can detect program progress but not design specifics. HUMINT is arguably necessary for this intelligence requirement.',
      proportionality: 'Centrifuge design intelligence is extremely high-value. But the moral cost of leveraging family safety is significant — this is soft coercion.',
      discrimination: 'The family members are innocent third parties being used as leverage. They did not choose to be intelligence pawns.',
      success: 'If the official cooperates, the intelligence would be uniquely valuable. But coerced sources are unreliable — they may fabricate, delay, or become double agents.',
    },
    expert: {
      verdict: 'Partially justified — strong just cause undermined by discrimination and right-intention concerns.',
      analysis: 'This scenario sits at the heart of Bellaby\'s framework: when does legitimate recruitment become coercion? The distinction matters because coerced sources produce inferior intelligence (they tell handlers what they want to hear) and create moral hazard (once you leverage families, where does it stop?). The just cause is powerful — nuclear proliferation is an existential threat. But Bellaby argues that right intention requires not merely a good objective but ethical means. Using innocent family members as implicit hostages fails the discrimination criterion regardless of the cause\'s legitimacy. The preferred approach: offer genuine asylum to the family independently, then approach the official with a clean recruitment pitch.',
      precedents: [
        'Tolkachev case (1977-1985): voluntary HUMINT source in Soviet defense — gold standard for non-coercive recruitment',
        'CIA KUBARK manual (1963): documented coercive interrogation techniques later repudiated as both unethical and ineffective',
        'EO 12333 Section 2.11: prohibits assassination but is silent on coercive recruitment — a legal gray zone',
        'Bellaby (2019) Ch. 6: argues coercion invalidates the moral legitimacy of intelligence even when the cause is just',
      ],
    },
  },
  {
    rung: 4,
    title: 'Bulk Domestic Metadata Collection',
    classification: 'TOP SECRET // SI // ORCON // NOFORN',
    brief: 'Following intelligence indicating that a terrorist cell is operating domestically but communicating through ordinary commercial channels, the NSA proposes collecting metadata (call records, timing, duration, and routing — not content) on all domestic communications for a 90-day period. The metadata would be queried only against known terrorist selectors. A FISA court order is obtained, but the order is classified and the program is not disclosed to the full Congress.',
    context: 'The terrorist threat is assessed as credible and imminent by multiple intelligence agencies. Previous targeted surveillance failed to map the full network because the cell uses burner phones and rotating numbers. Only bulk collection can identify the pattern.',
    criteria_notes: {
      just_cause: 'Imminent domestic terrorist threat corroborated by multiple agencies. Just cause is compelling.',
      right_intention: 'Counter-terrorism purpose is genuine. But bulk domestic collection creates infrastructure that can be repurposed for political surveillance.',
      proper_authority: 'FISA court order provides legal authority. But classified proceedings with no adversarial representation, and limited Congressional notification, strains democratic accountability.',
      last_resort: 'Targeted surveillance has failed due to burner-phone tradecraft. Bulk collection may be the only method to map the network. But has the government genuinely exhausted all targeted approaches?',
      proportionality: 'Preventing a mass-casualty attack is the highest-value outcome. But collecting metadata on 300 million Americans to find a handful of terrorists is an enormous ratio of intrusion to target.',
      discrimination: 'By definition, bulk collection does not discriminate. Every American\'s metadata is collected regardless of suspicion. The discrimination principle is structurally violated.',
      success: 'The NSA\'s own internal reviews found that bulk metadata collection rarely produced intelligence that could not have been obtained through targeted methods (PCLOB Report, 2014).',
    },
    expert: {
      verdict: 'Not justified under the Bellaby framework despite compelling just cause.',
      analysis: 'This scenario is modeled directly on the NSA Section 215 bulk metadata program revealed by Edward Snowden in 2013. It is the hardest test of Bellaby\'s framework because just cause and right intention are genuinely strong, yet the program fails on discrimination (inherently non-targeted), proportionality (300M records to find a dozen targets), proper authority (secret court with no adversarial process), and — critically — reasonable success (the PCLOB found the program produced only one significant case in its entire operation). The lesson for ethics of intelligence: even when the threat is real, the method must satisfy all seven criteria. A program that is legally authorized but ethically unjustified erodes democratic legitimacy. The USA FREEDOM Act (2015) reformed this program, requiring the government to use specific selectors rather than bulk collection.',
      precedents: [
        'Klayman v. Obama (2013): federal judge called bulk metadata collection "almost Orwellian" and likely unconstitutional',
        'ACLU v. Clapper (2015): Second Circuit ruled Section 215 did not authorize bulk collection',
        'PCLOB Report (2014): found the program was not essential to preventing any terrorist attack',
        'USA FREEDOM Act (2015): ended bulk metadata collection, required specific selectors',
        'Church Committee (1975): warned that surveillance infrastructure will inevitably be abused for political purposes',
      ],
    },
  },
  {
    rung: 5,
    title: 'Journalist Surveillance',
    classification: 'SECRET // ORCON // NOFORN',
    brief: 'A national security journalist has published three stories containing classified information about covert operations. The leak has compromised an active HUMINT source whose life is now in danger. The FBI proposes placing the journalist under electronic surveillance — email monitoring, phone intercepts, and physical surveillance — to identify the leaker within the intelligence community. The journalist is not suspected of espionage, only of receiving and publishing classified information.',
    context: 'The First Amendment protects press freedom. The journalist has published information that is genuinely damaging to national security. An intelligence officer\'s life is at immediate risk. The DOJ has a policy requiring Attorney General approval for journalist surveillance.',
    criteria_notes: {
      just_cause: 'A HUMINT source\'s life is in immediate danger. Identifying the leaker is an urgent security requirement. Just cause is strong.',
      right_intention: 'The stated purpose is source protection. But journalist surveillance has historically been used to intimidate the press and chill investigative reporting.',
      proper_authority: 'AG approval provides legal authority. But the DOJ guidelines exist precisely because the government has a documented history of abusing journalist surveillance for political purposes.',
      last_resort: 'Has the investigation exhausted internal methods — polygraphs, access audits, digital forensics on classified networks? Surveilling the journalist should be the absolute last option.',
      proportionality: 'Saving a source\'s life is high-value. But surveilling a journalist creates a chilling effect on all investigative reporting about intelligence matters — a systemic harm.',
      discrimination: 'Electronic surveillance of the journalist will capture communications with other sources on other stories — collateral intrusion on unrelated press activity.',
      success: 'Surveillance may identify the leaker. But sophisticated leakers use dead drops, air-gapped devices, and intermediaries that surveillance may not detect.',
    },
    expert: {
      verdict: 'Partially justified — the immediate threat to life creates urgency, but the systemic harm to press freedom demands extreme caution.',
      analysis: 'This scenario crystallizes the tension between security and liberty that defines intelligence ethics. The immediate moral claim — an intelligence officer will die if the leaker is not found — is powerful. But Bellaby argues that proportionality must account for systemic effects, not just the immediate case. Every time the government surveils a journalist, it signals to all potential sources that speaking to the press is dangerous. This chills the accountability mechanisms that prevent intelligence abuse. The historical record is cautionary: the FBI surveilled reporters during COINTELPRO, the Nixon administration wiretapped journalists, and the Obama DOJ secretly obtained AP phone records. In each case, the stated justification was national security, but the systemic effect was democratic erosion. The ethical path: exhaust all internal investigative methods, seek the leak through the classified system, and treat journalist surveillance as genuinely last-resort with maximum minimization procedures.',
      precedents: [
        'Branzburg v. Hayes (1972): limited reporter privilege but recognized the vital role of press freedom',
        'DOJ Media Guidelines (28 CFR 50.10): require AG approval and exhaustion of alternatives before journalist surveillance',
        'AP phone records seizure (2013): DOJ secretly obtained two months of AP call records, drawing bipartisan condemnation',
        'Risen v. United States (2014): reporter nearly jailed for refusing to reveal a CIA source',
        'First Amendment: "Congress shall make no law...abridging the freedom...of the press"',
      ],
    },
  },
  {
    rung: 6,
    title: 'Covert Regime Destabilization',
    classification: 'TOP SECRET // SAP // NOFORN // ORCON',
    brief: 'A hostile authoritarian regime is developing advanced cyber weapons capable of disabling critical infrastructure in allied nations. Diplomatic pressure and sanctions have failed. The CIA proposes a covert action program to destabilize the regime\'s command structure: funding opposition media, supporting dissident networks, conducting cyber operations against regime communications, and providing non-lethal aid to opposition groups. The program is briefed to the Congressional intelligence committees.',
    context: 'The regime has used cyber weapons against civilian targets in three countries. The opposition is fragmented and includes both democratic reformers and ethno-nationalist militants. Previous covert action programs in the region have had catastrophic blowback.',
    criteria_notes: {
      just_cause: 'Active cyber warfare against civilian infrastructure is a genuine security threat. But regime change goes beyond threat mitigation — it is a political objective.',
      right_intention: 'Is the purpose to stop cyber attacks, or to install a more favorable government? The history of covert action suggests these motives are inseparable.',
      proper_authority: 'Congressional notification satisfies legal requirements under the Hughes-Ryan Amendment. But covert action operates in a space where democratic accountability is structurally limited.',
      last_resort: 'Diplomatic and economic measures have been tried. But have cyber deterrence, defensive hardening, and international coalition-building been genuinely exhausted?',
      proportionality: 'Destabilizing a regime affects millions of civilians. The humanitarian cost of regime instability — civil war, refugee crises, power vacuums — may vastly exceed the cyber threat.',
      discrimination: 'The opposition includes ethno-nationalist militants. Aid will inevitably reach groups that commit human rights abuses. The program cannot discriminate between democratic and extremist opposition.',
      success: 'The historical success rate of covert regime destabilization is poor. Iran (1953), Guatemala (1954), Chile (1973), Libya (2011) — each produced decades of blowback.',
    },
    expert: {
      verdict: 'Not justified — fails proportionality, discrimination, and reasonable success criteria despite legitimate just cause.',
      analysis: 'Covert action to destabilize regimes represents the most consequential category of intelligence operations. Bellaby argues that covert action must satisfy all seven criteria at a higher threshold than collection, because the potential for irreversible harm is greater. This scenario fails on three criteria. Proportionality: the humanitarian cost of regime instability (civil war, refugees, power vacuum) dwarfs the cyber threat, which can be mitigated through defensive measures. Discrimination: when opposition groups include militants, the program cannot ensure that aid reaches only democratic actors — the CIA\'s experience in Syria (2012-2017) demonstrated that weapons and funds flow to the most militarily capable factions, not the most morally legitimate. Reasonable success: the historical record of covert regime change is a catalog of unintended consequences. The preferred approach: defensive cyber hardening, international coalition for attribution and deterrence, and targeted sanctions on regime leadership — all of which avoid the catastrophic downside risks.',
      precedents: [
        'Iran coup (1953, Operation AJAX): installed the Shah, produced the 1979 revolution and 45 years of hostility',
        'Guatemala coup (1954, Operation PBSUCCESS): installed military junta, produced 36-year civil war and 200,000 dead',
        'Chile coup support (1973): Pinochet dictatorship, thousands tortured and killed',
        'Covert Action Statute (50 U.S.C. 3093): requires presidential finding and Congressional notification',
        'Church Committee Final Report (1976): documented systematic abuse of covert action authority',
        'Bellaby (2019) Ch. 8: covert action requires the highest ethical threshold due to irreversibility',
      ],
    },
  },
  {
    rung: 7,
    title: 'Enhanced Interrogation — Ticking Bomb',
    classification: 'TOP SECRET // SAP // NOFORN // WAIVED',
    brief: 'A detained operative of a terrorist organization has been identified through signals intelligence as having direct knowledge of an imminent attack on a major civilian target. Standard interrogation over 72 hours has produced no actionable intelligence. The detainee has confirmed his identity and his organization\'s intent but refuses to provide details. The intelligence community assesses with high confidence that an attack will occur within 48 hours. A senior official proposes enhanced interrogation techniques — sleep deprivation, stress positions, and environmental manipulation — to extract the operational details.',
    context: 'This is the "ticking bomb" scenario that has dominated post-9/11 ethics debates. The detainee is a confirmed terrorist operative. The attack is assessed as imminent and potentially mass-casualty. Standard methods have failed. The question is not whether the threat is real, but whether the means are justified.',
    criteria_notes: {
      just_cause: 'An imminent mass-casualty attack is the most compelling just cause imaginable. This criterion is fully satisfied.',
      right_intention: 'The intent is to save civilian lives. But the history of "enhanced interrogation" shows that once authorized, techniques are applied far more broadly than the original justification.',
      proper_authority: 'Who authorizes torture? The DOJ memos (Yoo/Bybee, 2002) attempted to provide legal cover, but were later withdrawn as legally deficient. International law (CAT, Geneva Conventions) prohibits torture absolutely.',
      last_resort: 'Standard interrogation has been tried for 72 hours. But rapport-based interrogation experts (like Ali Soufan) argue that 72 hours is insufficient and that coercive techniques actually delay cooperation.',
      proportionality: 'Saving hundreds or thousands of lives appears to outweigh the suffering of one guilty individual. But this calculus assumes the techniques will work — if they fail, you have inflicted suffering for nothing.',
      discrimination: 'The detainee is a confirmed operative, not an innocent. But the principle of human dignity applies regardless of guilt. And the precedent extends to future detainees who may be innocent.',
      success: 'The Senate Intelligence Committee\'s Torture Report (2014) found that enhanced interrogation did not produce intelligence that could not have been obtained through standard methods. The CIA\'s own records showed that key intelligence was obtained before, not after, enhanced techniques were applied.',
    },
    expert: {
      verdict: 'Not justified — the strongest possible just cause cannot overcome the absolute prohibition on torture and the empirical evidence of ineffectiveness.',
      analysis: 'The ticking bomb scenario is the ultimate stress test of consequentialist ethics versus deontological constraints. Bellaby addresses it directly: even if one accepts a purely consequentialist framework (the greatest good for the greatest number), enhanced interrogation fails on its own terms because it does not reliably produce accurate intelligence. The Senate Torture Report examined the CIA\'s 20 most-cited cases of intelligence attributed to enhanced interrogation and found that in every case, the information was either available through other means, obtained before enhanced techniques were applied, or fabricated by the detainee to stop the pain. The ticking bomb scenario assumes perfect knowledge (we know he knows, we know there is an attack, we know the timeline) that never exists in practice. In reality, the detainee might not know, might know less than we think, or might provide false information under duress. More fundamentally, Bellaby argues that some constraints are absolute: the prohibition on torture reflects not a cost-benefit calculation but a statement about what kind of society we choose to be. The absolutist position is not naive — it is a recognition that once you cross this line, there is no principled stopping point.',
      precedents: [
        'Senate Select Committee on Intelligence: Torture Report (2014) — 6,700 pages documenting ineffectiveness and abuse',
        'Ali Soufan testimony (2009): FBI interrogator who obtained actionable intelligence from Abu Zubaydah using rapport-based methods before CIA enhanced techniques were applied',
        'Convention Against Torture (1984): Article 2.2 — "No exceptional circumstances whatsoever...may be invoked as a justification of torture"',
        'Geneva Conventions Common Article 3: prohibits "cruel treatment and torture" and "outrages upon personal dignity"',
        'Hamdan v. Rumsfeld (2006): Supreme Court ruled that Common Article 3 applies to War on Terror detainees',
        'DOJ OLC Memos (Yoo/Bybee 2002, withdrawn 2004): attempted legal justification for enhanced interrogation, later repudiated',
        'Bellaby (2019) Ch. 9: argues the ticking bomb scenario is a philosophical thought experiment that never maps to operational reality',
      ],
    },
  },
];

// ── Provenance sources ─────────────────────────────────────────────
const PROVENANCE = [
  { tier: 'Primary Framework', color: ET_C.gold, items: [
    'Bellaby, Ross W. The Ethics of Intelligence: A New Framework. Routledge, 2019.',
    'Walzer, Michael. Just and Unjust Wars. Basic Books, 1977 (5th ed. 2015).',
  ]},
  { tier: 'Legal & Oversight', color: ET_C.blue, items: [
    'Church Committee Final Report (1975-1976): Intelligence Activities and the Rights of Americans',
    'Executive Order 12333: United States Intelligence Activities (1981, as amended)',
    'Foreign Intelligence Surveillance Act (FISA), 50 U.S.C. ch. 36',
    'USA FREEDOM Act of 2015 (P.L. 114-23)',
    'Hughes-Ryan Amendment (1974) / Covert Action Statute (50 U.S.C. 3093)',
  ]},
  { tier: 'Case Law & Reports', color: ET_C.amber, items: [
    'Senate Select Committee on Intelligence: Torture Report (2014)',
    'PCLOB Report on the Telephone Records Program (2014)',
    'Klayman v. Obama, 957 F. Supp. 2d 1 (D.D.C. 2013)',
    'Hamdan v. Rumsfeld, 548 U.S. 557 (2006)',
    'Smith v. Maryland, 442 U.S. 735 (1979)',
  ]},
  { tier: 'Course Teaching', color: ET_C.green, items: [
    'MPAI 5000: Ethics of Intelligence — escalation frameworks and Just Intelligence Theory',
    'Applied scenario methodology adapted from structured analytic techniques curriculum',
  ]},
];

// ── Scholarly Micro-Content ────────────────────────────────────────
const ET_TIPS = {
  bellaby: "Ross Bellaby's The Ethics of Intelligence (2019) adapts Just War Theory to intelligence operations. His 7 criteria (just cause, right intention, proper authority, last resort, proportionality, discrimination, reasonable chance of success) create a decision framework that acknowledges intelligence is sometimes necessary but insists it must be bounded. The framework's power is that it gives analysts language to push back \u2014 'this operation fails the proportionality test' is more effective than 'this feels wrong.'",
  church: "The Church Committee (1975) exposed decades of IC abuses: assassination plots against foreign leaders, illegal domestic surveillance (COINTELPRO), mail opening programs (HTLINGUAL), and drug experimentation on unwitting subjects (MKULTRA). The committee's recommendations created the modern oversight architecture: FISA courts, congressional intelligence committees, inspectors general, and executive orders (EO 12333) restricting IC activities. Every constraint an analyst works under today traces back to the Church Committee.",
  torture: "The Senate Intelligence Committee's Torture Report (2014) found that CIA enhanced interrogation techniques (EITs) were more brutal than represented to policymakers and did not produce intelligence that couldn't have been obtained through standard methods. The report's 6,700 pages (525 released) documented waterboarding, rectal feeding, sleep deprivation exceeding 180 hours, and confinement boxes. The ethical lesson is not just that torture is wrong \u2014 it's that it doesn't work, and the institutional incentives to believe it works are powerful.",
  oversight: "Intelligence oversight operates on three levels: executive (the President via NSC and IOB), legislative (SSCI and HPSCI), and judicial (FISA Court). The system is designed so that no single branch controls IC activities. The tension is structural: effective oversight requires access to classified programs, but broader access increases leak risk. The FISA Court operates in secret, raising due-process concerns. Transparency and security are genuinely in tension \u2014 there is no costless solution.",
};

// ── Component ──────────────────────────────────────────────────────
function ETAnalysisView({ setView }) {
  const C = ET_C;
  const Mono = ET_Mono;
  const Serif = ET_Serif;
  const Sans = ET_Sans;

  const [mode, setMode] = React.useState('challenge'); // challenge | review | framework | ladder
  const [currentRung, setCurrentRung] = React.useState(0);
  const [evaluations, setEvaluations] = React.useState({});
  const [decisions, setDecisions] = React.useState({});
  const [revealed, setRevealed] = React.useState({});
  const [tipId, setTipId] = React.useState(null);

  const topRef = React.useRef(null);

  // Scholarly tooltip renderer
  var TipBox = function(key) {
    if (tipId !== key) return null;
    return React.createElement('div', { style: { padding: '10px 14px', background: 'rgba(9,11,16,.94)', border: '1px solid rgba(196,160,64,.12)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(208,204,192,.7)', lineHeight: 1.65, margin: '6px 0 10px' } }, ET_TIPS[key]);
  };

  // SVG micro-icons for scholarly tooltips
  var ScaleIcon = React.createElement('svg', { width: 24, height: 20, viewBox: '0 0 24 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'bellaby' ? null : 'bellaby'); } },
    React.createElement('line', { x1: 12, y1: 2, x2: 12, y2: 18, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 4, y1: 4, x2: 20, y2: 4, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M2 12 L4 4 L6 12', fill: 'none', stroke: 'currentColor', strokeWidth: '.7' }),
    React.createElement('path', { d: 'M2 12 Q4 14 6 12', fill: 'none', stroke: 'currentColor', strokeWidth: '.7' }),
    React.createElement('path', { d: 'M18 12 L20 4 L22 12', fill: 'none', stroke: 'currentColor', strokeWidth: '.7' }),
    React.createElement('path', { d: 'M18 12 Q20 14 22 12', fill: 'none', stroke: 'currentColor', strokeWidth: '.7' }),
    React.createElement('rect', { x: 9, y: 17, width: 6, height: 2, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: '.6' })
  );

  var GavelIcon2 = React.createElement('svg', { width: 22, height: 20, viewBox: '0 0 22 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'church' ? null : 'church'); } },
    React.createElement('rect', { x: 3, y: 4, width: 10, height: 4, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: '.8', transform: 'rotate(-30 8 6)' }),
    React.createElement('line', { x1: 8, y1: 9, x2: 12, y2: 16, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 5, y1: 16, x2: 19, y2: 16, stroke: 'currentColor', strokeWidth: 1.2 })
  );

  var StrikeEyeIcon = React.createElement('svg', { width: 24, height: 18, viewBox: '0 0 24 18', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'torture' ? null : 'torture'); } },
    React.createElement('path', { d: 'M2 9 Q6 3 12 3 Q18 3 22 9 Q18 15 12 15 Q6 15 2 9Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.7' }),
    React.createElement('circle', { cx: 12, cy: 9, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: '.7' }),
    React.createElement('line', { x1: 4, y1: 2, x2: 20, y2: 16, stroke: 'currentColor', strokeWidth: 1 })
  );

  var ShieldCheckIcon = React.createElement('svg', { width: 20, height: 22, viewBox: '0 0 20 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'oversight' ? null : 'oversight'); } },
    React.createElement('path', { d: 'M10 2 L2 6 L2 12 Q2 18 10 20 Q18 18 18 12 L18 6Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M7 11 L9 13 L13 9', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' })
  );

  const scrollToTop = React.useCallback(() => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // ── Evaluation helpers ──────────────────────────────────────────
  const setEval = React.useCallback((rung, criterionId, value) => {
    setEvaluations(prev => ({
      ...prev,
      [rung]: { ...(prev[rung] || {}), [criterionId]: value },
    }));
  }, []);

  const setDecision = React.useCallback((rung, value) => {
    setDecisions(prev => ({ ...prev, [rung]: value }));
  }, []);

  const revealExpert = React.useCallback((rung) => {
    setRevealed(prev => ({ ...prev, [rung]: true }));
  }, []);

  const rungComplete = React.useCallback((rung) => {
    const ev = evaluations[rung] || {};
    return CRITERIA.every(c => ev[c.id]) && decisions[rung];
  }, [evaluations, decisions]);

  const completedCount = React.useMemo(() => {
    return SCENARIOS.filter((_, i) => rungComplete(i)).length;
  }, [rungComplete]);

  const advanceRung = React.useCallback(() => {
    if (currentRung < SCENARIOS.length - 1) {
      setCurrentRung(currentRung + 1);
      scrollToTop();
    }
  }, [currentRung, scrollToTop]);

  // ── Score summary ───────────────────────────────────────────────
  const scoreSummary = React.useMemo(() => {
    const counts = { justified: 0, partial: 0, not_justified: 0 };
    Object.values(evaluations).forEach(rungEvals => {
      Object.values(rungEvals).forEach(val => {
        if (counts[val] !== undefined) counts[val]++;
      });
    });
    return counts;
  }, [evaluations]);

  // ── Eval color helper ───────────────────────────────────────────
  const evalColor = React.useCallback((val) => {
    const opt = EVAL_OPTIONS.find(o => o.value === val);
    return opt ? opt.color : C.tx3;
  }, []);

  // ── Render: Ladder visual ───────────────────────────────────────
  const renderLadder = React.useCallback(() => {
    var diffColors = [C.green, C.green, C.amber, C.amber, C.red, C.red, C.redDm];
    var diffLabels = ['EASY', 'EASY', 'MODERATE', 'MODERATE', 'HARD', 'HARD', 'EXTREME'];
    return (
      <div style={{ position: 'relative', marginBottom: 28, paddingLeft: 40 }}>
        {/* Physical ladder rails */}
        <div style={{ position: 'absolute', left: 12, top: 0, bottom: 0, width: 3, background: 'linear-gradient(to bottom, rgba(196,160,64,.25), rgba(196,160,64,.08))', borderRadius: 2 }} />
        <div style={{ position: 'absolute', left: 32, top: 0, bottom: 0, width: 3, background: 'linear-gradient(to bottom, rgba(196,160,64,.25), rgba(196,160,64,.08))', borderRadius: 2 }} />
        <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 3 }}>
          {SCENARIOS.map(function(sc, i) {
            var done = rungComplete(i);
            var active = i === currentRung && mode === 'challenge';
            return React.createElement('button', {
              key: i,
              onClick: function() { setCurrentRung(i); if (mode !== 'challenge') setMode('challenge'); scrollToTop(); },
              style: {
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px',
                background: active ? 'rgba(196,160,64,.08)' : 'rgba(14,10,6,.6)',
                border: active ? '2px solid ' + C.goldDm : '1px solid rgba(180,160,100,.08)',
                borderRadius: 4, cursor: 'pointer', textAlign: 'left',
                transition: 'all .15s ease',
                marginLeft: 0,
                position: 'relative',
              }
            },
              // Rung crossbar connector
              React.createElement('div', { style: { position: 'absolute', left: -28, top: '50%', width: 28, height: 3, background: done ? 'rgba(74,144,96,.3)' : active ? 'rgba(196,160,64,.3)' : 'rgba(180,160,100,.1)', marginTop: -1 } }),
              // Rung number circle
              React.createElement('div', { style: {
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? 'rgba(74,144,96,.15)' : active ? 'rgba(196,160,64,.12)' : 'rgba(180,160,100,.05)',
                border: '2px solid ' + (done ? C.green : active ? C.gold : 'rgba(180,160,100,.12)'),
                fontFamily: Mono, fontSize: 11, fontWeight: 700,
                color: done ? C.green : active ? C.gold : C.tx3,
              } }, done ? '\u2713' : String(i + 1)),
              // Title
              React.createElement('span', { style: {
                fontFamily: Sans, fontSize: 12,
                color: active ? C.tx : C.tx2, flex: 1,
              } }, sc.title),
              // Difficulty
              React.createElement('span', { style: {
                fontFamily: Mono, fontSize: 10, letterSpacing: '.06em',
                color: diffColors[i], opacity: 0.7,
                padding: '2px 6px', borderRadius: 3,
                background: diffColors[i] + '10',
                border: '1px solid ' + diffColors[i] + '20',
              } }, diffLabels[i])
            );
          })}
        </div>
      </div>
    );
  }, [currentRung, mode, rungComplete, scrollToTop]);

  // ── Render: Criterion evaluation row ────────────────────────────
  const renderCriterionRow = React.useCallback((criterion, rungIdx, scenarioNotes) => {
    const ev = (evaluations[rungIdx] || {})[criterion.id];
    return (
      <div key={criterion.id} style={{
        padding: 14, background: 'rgba(18,14,8,.9)', border: '1px solid rgba(180,160,100,.1)',
        borderRadius: 4, marginBottom: 8,
        borderLeft: '3px solid rgba(196,160,64,.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
          <span style={{
            fontFamily: Mono, fontSize: 12, fontWeight: 700, color: C.gold,
            background: C.goldBg, padding: '2px 6px', borderRadius: 3,
            flexShrink: 0, marginTop: 2,
          }}>
            {criterion.short}
          </span>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: Sans, fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 4 }}>
              {criterion.label}
            </p>
            <p style={{ fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.55 }}>
              {scenarioNotes}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, paddingLeft: 40 }}>
          {EVAL_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setEval(rungIdx, criterion.id, opt.value)}
              style={{
                fontFamily: Mono, fontSize: 12, padding: '5px 12px', borderRadius: 3,
                border: ev === opt.value ? '1px solid ' + opt.color : '1px solid ' + C.line,
                background: ev === opt.value ? opt.color + '18' : 'transparent',
                color: ev === opt.value ? opt.color : C.tx3,
                cursor: 'pointer', transition: 'all .12s ease',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }, [evaluations, setEval]);

  // ── Render: GO/NO-GO decision ───────────────────────────────────
  const renderDecision = React.useCallback((rungIdx) => {
    const dec = decisions[rungIdx];
    return (
      <div style={{
        padding: 20, background: 'rgba(14,10,6,.95)', border: '2px solid rgba(180,160,100,.12)',
        borderRadius: 8, marginTop: 20, marginBottom: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,.3), inset 0 1px 0 rgba(196,160,64,.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          {React.createElement(GavelIcon, { size: 18 })}
          <p style={{ fontFamily: Mono, fontSize: 11, fontWeight: 700, color: C.gold, textTransform: 'uppercase', letterSpacing: '.1em' }}>
            JUDICIAL DETERMINATION
          </p>
        </div>
        <div style={{ height: 1, background: 'linear-gradient(to right, rgba(196,160,64,.2), transparent)', marginBottom: 14 }} />
        <div style={{ display: 'flex', gap: 16 }}>
          <button
            onClick={() => setDecision(rungIdx, 'go')}
            style={{
              flex: 1, padding: '16px 20px', borderRadius: 6, cursor: 'pointer',
              fontFamily: Mono, fontSize: 14, fontWeight: 700, letterSpacing: '.06em',
              border: dec === 'go' ? '3px solid ' + C.green : '2px solid rgba(74,144,96,.15)',
              background: dec === 'go' ? 'rgba(74,144,96,.1)' : 'rgba(74,144,96,.02)',
              color: dec === 'go' ? C.green : C.tx3,
              transition: 'all .2s ease',
              boxShadow: dec === 'go' ? '0 0 20px rgba(74,144,96,.1)' : 'none',
            }}
          >
            {React.createElement(ScalesOfJustice, { size: 24, opacity: dec === 'go' ? 0.4 : 0.1, style: { display: 'block', margin: '0 auto 6px' } })}
            GO {'\u2014'} Operation Justified
          </button>
          <button
            onClick={() => setDecision(rungIdx, 'nogo')}
            style={{
              flex: 1, padding: '16px 20px', borderRadius: 6, cursor: 'pointer',
              fontFamily: Mono, fontSize: 14, fontWeight: 700, letterSpacing: '.06em',
              border: dec === 'nogo' ? '3px solid ' + C.red : '2px solid rgba(176,64,64,.15)',
              background: dec === 'nogo' ? 'rgba(176,64,64,.1)' : 'rgba(176,64,64,.02)',
              color: dec === 'nogo' ? C.red : C.tx3,
              transition: 'all .2s ease',
              boxShadow: dec === 'nogo' ? '0 0 20px rgba(176,64,64,.1)' : 'none',
            }}
          >
            {React.createElement(GavelIcon, { size: 24 })}
            <div style={{ marginTop: 4 }}>NO-GO {'\u2014'} Operation Not Justified</div>
          </button>
        </div>
      </div>
    );
  }, [decisions, setDecision]);

  // ── Render: Expert analysis ─────────────────────────────────────
  const renderExpert = React.useCallback((scenario, rungIdx) => {
    const isRevealed = revealed[rungIdx];
    const expert = scenario.expert;
    if (!rungComplete(rungIdx) && !isRevealed) {
      return (
        <div style={{ padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginTop: 8, opacity: 0.5 }}>
          <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, textAlign: 'center' }}>
            Complete all seven criteria evaluations and make your GO/NO-GO decision to unlock the expert analysis.
          </p>
        </div>
      );
    }
    if (!isRevealed) {
      return (
        <button
          onClick={() => revealExpert(rungIdx)}
          style={{
            width: '100%', padding: '14px 16px', marginTop: 8,
            background: C.goldBg, border: '1px solid ' + C.goldDm,
            borderRadius: 6, cursor: 'pointer', textAlign: 'center',
            fontFamily: Mono, fontSize: 12, color: C.gold,
            transition: 'all .15s ease',
          }}
        >
          Reveal Expert Analysis
        </button>
      );
    }
    // Determine user's verdict alignment
    const userDec = decisions[rungIdx];
    const expertLeans = expert.verdict.toLowerCase().includes('not justified') ? 'nogo'
      : expert.verdict.toLowerCase().includes('clearly justified') ? 'go' : 'mixed';
    const aligned = (userDec === 'go' && expertLeans === 'go') ||
                    (userDec === 'nogo' && expertLeans === 'nogo') ||
                    expertLeans === 'mixed';

    return (
      <div style={{
        padding: 20, background: 'rgba(10,14,22,.95)', border: '1px solid ' + C.goldDm + '40',
        borderLeft: '4px solid ' + C.gold, borderRadius: 6, marginTop: 12,
      }}>
        <p style={{ fontFamily: Mono, fontSize: 12, color: C.goldDm, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
          Expert Analysis
        </p>
        {/* Verdict */}
        <p style={{ fontFamily: Serif, fontSize: 15, fontWeight: 600, color: C.tx, marginBottom: 12, lineHeight: 1.65 }}>
          {expert.verdict}
        </p>
        {/* Alignment note */}
        {userDec && (
          <div style={{
            padding: '8px 12px', borderRadius: 4, marginBottom: 14,
            background: aligned ? C.greenBg : C.amberBg,
            border: '1px solid ' + (aligned ? C.greenDm + '30' : C.amberDm + '30'),
          }}>
            <p style={{ fontFamily: Mono, fontSize: 12, color: aligned ? C.green : C.amber }}>
              {aligned
                ? 'Your recommendation aligns with the expert assessment.'
                : 'Your recommendation diverges from the expert assessment. This divergence is itself instructive — review the analysis below.'}
            </p>
          </div>
        )}
        {/* Full analysis */}
        <p style={{ fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.65, marginBottom: 16 }}>
          {expert.analysis}
        </p>
        {/* Precedents */}
        <div>
          <p style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>
            Legal & Ethical Precedents
          </p>
          {expert.precedents.map((p, i) => (
            <div key={i} style={{
              padding: '6px 10px', marginBottom: 4,
              borderLeft: '2px solid ' + C.blueDm + '40',
              background: C.blueBg,
              borderRadius: '0 4px 4px 0',
            }}>
              <p style={{ fontFamily: Serif, fontSize: 11, color: C.tx2, lineHeight: 1.65 }}>{p}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }, [revealed, rungComplete, decisions, revealExpert]);

  // ── Render: Challenge mode ──────────────────────────────────────
  const renderChallenge = React.useCallback(() => {
    const sc = SCENARIOS[currentRung];
    return (
      <div>
        {renderLadder()}
        {/* Scenario card */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{
              fontFamily: Mono, fontSize: 20, fontWeight: 800, color: C.gold,
            }}>
              {'R' + (currentRung + 1)}
            </span>
            <div>
              <h2 style={{ fontFamily: Serif, fontSize: 22, fontWeight: 600, color: C.tx, marginBottom: 2 }}>
                {sc.title}
              </h2>
              <span style={{ fontFamily: Mono, fontSize: 11, color: C.redDm, letterSpacing: '.04em' }}>
                {sc.classification}
              </span>
            </div>
          </div>
          {/* Brief — Legal Case File */}
          <div style={{
            padding: 20, background: 'rgba(18,14,8,.95)', border: '1px solid rgba(180,160,100,.12)',
            borderRadius: 6, marginBottom: 12,
            borderTop: '3px solid rgba(196,160,64,.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              {React.createElement(GavelIcon, { size: 14 })}
              <p style={{ fontFamily: Mono, fontSize: 10, color: C.goldDm, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em' }}>
                CASE FILE {'\u2014'} SCENARIO BRIEF
              </p>
              {StrikeEyeIcon}{ShieldCheckIcon}
            </div>
            <div style={{ height: 1, background: 'rgba(196,160,64,.1)', marginBottom: 10 }} />
            {TipBox('torture')}
            {TipBox('oversight')}
            <p style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.65, marginBottom: 12 }}>
              {sc.brief}
            </p>
            <p style={{ fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.55, fontStyle: 'italic' }}>
              {sc.context}
            </p>
          </div>
          {/* Criteria evaluation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, padding: '8px 12px', borderBottom: '2px solid rgba(196,160,64,.1)' }}>
            {React.createElement(ScalesOfJustice, { size: 28, opacity: 0.15, style: {} })}
            <p style={{ fontFamily: Mono, fontSize: 11, color: C.gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>
              ARTICLES OF REVIEW {'\u2014'} BELLABY CRITERIA {ScaleIcon}{GavelIcon2}
            </p>
          </div>
          {TipBox('bellaby')}
          {TipBox('church')}
          {CRITERIA.map(criterion =>
            renderCriterionRow(criterion, currentRung, sc.criteria_notes ? sc.criteria_notes[criterion.id] : '')
          )}
          {/* GO / NO-GO */}
          {renderDecision(currentRung)}
          {/* Expert analysis */}
          {renderExpert(sc, currentRung)}
          {/* Navigation */}
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            {currentRung > 0 && (
              <button
                onClick={() => { setCurrentRung(currentRung - 1); scrollToTop(); }}
                style={{
                  padding: '8px 18px', borderRadius: 4, cursor: 'pointer',
                  background: 'transparent', border: '1px solid ' + C.line,
                  fontFamily: Mono, fontSize: 11, color: C.tx3,
                }}
              >
                {'\←'} Previous Rung
              </button>
            )}
            {currentRung < SCENARIOS.length - 1 && rungComplete(currentRung) && (
              <button
                onClick={advanceRung}
                style={{
                  padding: '8px 18px', borderRadius: 4, cursor: 'pointer',
                  background: C.goldBg, border: '1px solid ' + C.goldDm,
                  fontFamily: Mono, fontSize: 11, color: C.gold,
                }}
              >
                Ascend to Rung {currentRung + 2} {'\→'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }, [currentRung, renderLadder, renderCriterionRow, renderDecision, renderExpert, rungComplete, advanceRung, scrollToTop]);

  // ── Render: Review mode ─────────────────────────────────────────
  const renderReview = React.useCallback(() => {
    if (completedCount === 0) {
      return (
        <div style={{ padding: 32, textAlign: 'center' }}>
          <p style={{ fontFamily: Serif, fontSize: 15, color: C.tx2 }}>
            Complete at least one scenario in Challenge mode to see your results here.
          </p>
        </div>
      );
    }
    return (
      <div>
        {/* Summary statistics */}
        <div style={{
          padding: 16, background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 6, marginBottom: 20,
        }}>
          <p style={{ fontFamily: Mono, fontSize: 12, color: C.goldDm, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 12 }}>
            Evaluation Summary — {completedCount} of 7 Rungs Complete
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {EVAL_OPTIONS.map(opt => (
              <div key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 10, height: 10, borderRadius: 2,
                  background: opt.color, display: 'inline-block',
                }} />
                <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx2 }}>
                  {opt.label}: {scoreSummary[opt.value]}
                </span>
              </div>
            ))}
          </div>
          {/* Per-scenario decision summary */}
          <div style={{ marginTop: 16, display: 'grid', gap: 4 }}>
            {SCENARIOS.map((sc, i) => {
              const dec = decisions[i];
              const done = rungComplete(i);
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '6px 10px', borderRadius: 4,
                  background: done ? 'rgba(20,24,32,.6)' : 'transparent',
                  opacity: done ? 1 : 0.4,
                }}>
                  <span style={{ fontFamily: Mono, fontSize: 12, color: C.gold, minWidth: 24, fontWeight: 700 }}>
                    R{i + 1}
                  </span>
                  <span style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, flex: 1 }}>
                    {sc.title}
                  </span>
                  {done && (
                    <span style={{
                      fontFamily: Mono, fontSize: 12, fontWeight: 700,
                      color: dec === 'go' ? C.green : C.red,
                      padding: '2px 8px', borderRadius: 3,
                      background: dec === 'go' ? C.greenBg : C.redBg,
                    }}>
                      {dec === 'go' ? 'GO' : 'NO-GO'}
                    </span>
                  )}
                  {done && (
                    <div style={{ display: 'flex', gap: 3 }}>
                      {CRITERIA.map(cr => {
                        const val = (evaluations[i] || {})[cr.id];
                        return (
                          <span key={cr.id} style={{
                            width: 8, height: 8, borderRadius: 2,
                            background: evalColor(val),
                            display: 'inline-block',
                          }} title={cr.label + ': ' + (val || 'N/A')} />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Criteria heatmap */}
        <div style={{
          padding: 16, background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 6, marginBottom: 20,
        }}>
          <p style={{ fontFamily: Mono, fontSize: 12, color: C.goldDm, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 12 }}>
            Criteria Heatmap
          </p>
          {/* Header row */}
          <div style={{ display: 'flex', gap: 2, marginBottom: 4, paddingLeft: 60 }}>
            {CRITERIA.map(cr => (
              <span key={cr.id} style={{
                fontFamily: Mono, fontSize: 12, color: C.tx3, width: 34, textAlign: 'center',
              }}>
                {cr.short}
              </span>
            ))}
          </div>
          {/* Data rows */}
          {SCENARIOS.map((sc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
              <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, width: 58, textAlign: 'right', paddingRight: 6 }}>
                R{i + 1}
              </span>
              {CRITERIA.map(cr => {
                const val = (evaluations[i] || {})[cr.id];
                return (
                  <div key={cr.id} style={{
                    width: 34, height: 18, borderRadius: 2,
                    background: val ? evalColor(val) + '30' : C.line,
                    border: '1px solid ' + (val ? evalColor(val) + '40' : C.line),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {val && (
                      <span style={{ fontFamily: Mono, fontSize: 10, color: evalColor(val), fontWeight: 700 }}>
                        {val === 'justified' ? 'J' : val === 'partial' ? 'P' : 'N'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
            <span style={{ fontFamily: Mono, fontSize: 11, color: C.green }}>J = Justified</span>
            <span style={{ fontFamily: Mono, fontSize: 11, color: C.amber }}>P = Partial</span>
            <span style={{ fontFamily: Mono, fontSize: 11, color: C.red }}>N = Not Justified</span>
          </div>
        </div>
        {/* Provenance */}
        <div style={{ marginTop: 24 }}>
          <p style={{ fontFamily: Mono, fontSize: 12, color: C.goldDm, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>
            Sources & Provenance
          </p>
          <div style={{ display: 'grid', gap: 6 }}>
            {PROVENANCE.map(section => (
              <div key={section.tier} style={{
                padding: 12, background: C.card, border: '1px solid ' + C.cardBd,
                borderLeft: '3px solid ' + section.color, borderRadius: 6,
              }}>
                <p style={{ fontFamily: Mono, fontSize: 12, color: section.color, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>
                  {section.tier}
                </p>
                {section.items.map((item, i) => (
                  <p key={i} style={{ fontSize: 11, color: C.tx2, lineHeight: 1.55, marginBottom: 4, paddingLeft: 12, borderLeft: '2px solid ' + section.color + '30' }}>
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, [completedCount, scoreSummary, evaluations, decisions, rungComplete, evalColor]);

  // ── Render: Framework reference mode ────────────────────────────
  // ── SVG Escalation Ladder Visualization ────────────────────
  const renderLadderSVG = React.useCallback(() => {
    const levels = [
      { id: 1, title: 'Open Source Monitoring', desc: 'OSINT collection from publicly available sources', status: 'clearly justified', color: '#2d8a4e' },
      { id: 2, title: 'Diplomatic SIGINT', desc: 'Signals intelligence on foreign government communications', status: 'mostly justified', color: '#3a9a5a' },
      { id: 3, title: 'Allied Intelligence Sharing', desc: 'Five Eyes and bilateral sharing agreements', status: 'justified with caveats', color: '#7aaa3a' },
      { id: 4, title: 'Covert HUMINT Recruitment', desc: 'Clandestine recruitment of human sources', status: 'gray area', color: '#c0a030' },
      { id: 5, title: 'Bulk Domestic Collection', desc: 'Mass surveillance of domestic communications', status: 'contested', color: '#cc7830' },
      { id: 6, title: 'Journalist/Source Surveillance', desc: 'Targeting press and their confidential sources', status: 'problematic', color: '#c04030' },
      { id: 7, title: 'Enhanced Interrogation', desc: 'Coercive interrogation techniques', status: 'prohibited', color: '#8a2020' },
    ];

    const svgW = 400, svgH = 600;
    const rungH = 60, rungW = 320, startY = 30, gapY = 18;
    const leftX = (svgW - rungW) / 2;

    // Find which level the current scenario corresponds to
    const climberLevel = currentRung + 1; // 1-indexed

    // Escalation connection lines: each level connects to next
    const connections = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]];

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontFamily: Serif, fontSize: 22, fontWeight: 600, color: C.tx, marginBottom: 8 }}>
            Escalation Ladder Visualization
          </h2>
          <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.65, maxWidth: '60ch' }}>
            Seven levels of intelligence activity from clearly justified (bottom) to clearly prohibited (top). The climber marker shows where your current scenario falls on the ethical spectrum. Click any rung to jump to that scenario.
          </p>
        </div>

        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 16 }}>
          <svg viewBox={'0 0 ' + svgW + ' ' + svgH} style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto' }}>
            {/* Background gradient: green (bottom) to red (top) */}
            <defs>
              <linearGradient id="ladderGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#2d8a4e" stopOpacity="0.12" />
                <stop offset="40%" stopColor="#c0a030" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#8a2020" stopOpacity="0.12" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width={svgW} height={svgH} fill="url(#ladderGrad)" rx="8" />

            {/* Ladder side rails */}
            <line x1={leftX - 8} y1={startY - 5} x2={leftX - 8} y2={startY + 7 * (rungH + gapY) - gapY + 5} stroke={C.tx3 + '40'} strokeWidth={3} />
            <line x1={leftX + rungW + 8} y1={startY - 5} x2={leftX + rungW + 8} y2={startY + 7 * (rungH + gapY) - gapY + 5} stroke={C.tx3 + '40'} strokeWidth={3} />

            {/* Connection lines between rungs */}
            {connections.map(([from, to]) => {
              const fromY = startY + (7 - from) * (rungH + gapY) + rungH;
              const toY = startY + (7 - to) * (rungH + gapY);
              return (
                <line key={from + '-' + to} x1={svgW / 2} y1={fromY} x2={svgW / 2} y2={toY}
                  stroke={C.tx3 + '30'} strokeWidth={1} strokeDasharray="3,3" />
              );
            })}

            {/* Rungs (drawn top to bottom: level 7 at top, level 1 at bottom) */}
            {levels.slice().reverse().map((lvl, vi) => {
              const y = startY + vi * (rungH + gapY);
              const isActive = lvl.id === climberLevel;
              return (
                <g key={lvl.id} style={{ cursor: 'pointer' }}
                  onClick={() => { setCurrentRung(lvl.id - 1); if (mode !== 'challenge') setMode('challenge'); }}>
                  {/* Rung bar */}
                  <rect x={leftX} y={y} width={rungW} height={rungH}
                    rx={6} ry={6}
                    fill={isActive ? lvl.color + '30' : lvl.color + '15'}
                    stroke={isActive ? lvl.color : lvl.color + '60'}
                    strokeWidth={isActive ? 2 : 1}
                  />
                  {/* Level number */}
                  <text x={leftX + 14} y={y + 24} fill={lvl.color}
                    style={{ fontSize: 14, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace" }}>
                    {lvl.id}
                  </text>
                  {/* Title */}
                  <text x={leftX + 36} y={y + 22} fill={isActive ? C.tx : C.tx2}
                    style={{ fontSize: 11, fontWeight: isActive ? 700 : 400, fontFamily: "'Inter',sans-serif" }}>
                    {lvl.title}
                  </text>
                  {/* Status badge */}
                  <text x={leftX + 36} y={y + 40} fill={lvl.color}
                    style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {lvl.status}
                  </text>
                  {/* Description (right side) */}
                  <text x={leftX + rungW - 10} y={y + 52} fill={C.tx3}
                    textAnchor="end"
                    style={{ fontSize: 12, fontFamily: "'IBM Plex Mono',monospace" }}>
                    {lvl.desc.length > 50 ? lvl.desc.slice(0, 50) + '...' : lvl.desc}
                  </text>

                  {/* Climber indicator */}
                  {isActive && (
                    <g>
                      <circle cx={leftX - 20} cy={y + rungH / 2} r={8} fill={C.gold} stroke={C.bg} strokeWidth={2} />
                      <text x={leftX - 20} y={y + rungH / 2 + 1} fill={C.bg}
                        textAnchor="middle" dominantBaseline="middle"
                        style={{ fontSize: 11, fontWeight: 700 }}>
                        {'\u25B6'}
                      </text>
                    </g>
                  )}

                  {/* Completed checkmark */}
                  {rungComplete(lvl.id - 1) && (
                    <text x={leftX + rungW - 28} y={y + 24} fill={C.green}
                      style={{ fontSize: 14, fontWeight: 700 }}>
                      {'\✓'}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Zone labels on the right edge */}
            <text x={svgW - 8} y={startY + 0.5 * (rungH + gapY)} fill="#8a2020" textAnchor="end"
              style={{ fontSize: 12, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '.08em' }} transform={'rotate(-90,' + (svgW - 8) + ',' + (startY + 0.8 * (rungH + gapY)) + ')'}>
              RED ZONE
            </text>
            <text x={svgW - 8} y={startY + 3.5 * (rungH + gapY)} fill="#c0a030" textAnchor="end"
              style={{ fontSize: 12, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '.08em' }} transform={'rotate(-90,' + (svgW - 8) + ',' + (startY + 3.5 * (rungH + gapY)) + ')'}>
              AMBER ZONE
            </text>
            <text x={svgW - 8} y={startY + 5.8 * (rungH + gapY)} fill="#2d8a4e" textAnchor="end"
              style={{ fontSize: 12, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '.08em' }} transform={'rotate(-90,' + (svgW - 8) + ',' + (startY + 5.8 * (rungH + gapY)) + ')'}>
              GREEN ZONE
            </text>
          </svg>

          {/* Active scenario detail card */}
          <div style={{ marginTop: 16, padding: 12, borderRadius: 6, border: '1px solid ' + levels[climberLevel - 1].color + '40', background: levels[climberLevel - 1].color + '08' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontFamily: Mono, fontSize: 11, fontWeight: 700, color: levels[climberLevel - 1].color }}>
                Level {climberLevel}: {levels[climberLevel - 1].title}
              </span>
              <span style={{ fontFamily: Mono, fontSize: 11, color: levels[climberLevel - 1].color, textTransform: 'uppercase' }}>
                {levels[climberLevel - 1].status}
              </span>
            </div>
            <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.65 }}>
              {SCENARIOS[currentRung] ? SCENARIOS[currentRung].title + ' \— ' + (SCENARIOS[currentRung].scenario || '').slice(0, 120) + '...' : levels[climberLevel - 1].desc}
            </p>
            <button onClick={() => setMode('challenge')} style={{
              marginTop: 8, padding: '4px 12px', borderRadius: 3, cursor: 'pointer',
              background: C.goldBg, border: '1px solid ' + C.goldDm, fontFamily: Mono,
              fontSize: 12, color: C.gold,
            }}>
              {'\→'} Evaluate This Scenario
            </button>
          </div>
        </div>
      </div>
    );
  }, [currentRung, mode, rungComplete, C, Mono, Serif, Sans]);

  const renderFramework = React.useCallback(() => {
    return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: Serif, fontSize: 22, fontWeight: 600, color: C.tx, marginBottom: 8 }}>
            The Bellaby Just Intelligence Framework {ScaleIcon}{GavelIcon2}{StrikeEyeIcon}{ShieldCheckIcon}
          </h2>
          <p style={{ fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.65, marginBottom: 16 }}>
            Ross Bellaby adapts Just War Theory to intelligence ethics, arguing that intelligence operations — like the use of military force — require moral justification beyond mere legal authorization. An operation may be lawful yet unethical, or ethically defensible yet legally ambiguous. The framework demands that all seven criteria be satisfied; failure on any single criterion renders the operation ethically unjustified regardless of how strongly the others are met.
          </p>
          {TipBox('bellaby')}
          {TipBox('church')}
          {TipBox('torture')}
          {TipBox('oversight')}
        </div>
        {/* Criteria cards — Legal Code Articles */}
        {CRITERIA.map((cr, i) => (
          <div key={cr.id} style={{
            padding: 18, background: 'rgba(18,14,8,.92)', border: '1px solid rgba(180,160,100,.1)',
            borderLeft: '4px solid rgba(196,160,64,.25)', borderRadius: 4, marginBottom: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, borderBottom: '1px solid rgba(180,160,100,.06)', paddingBottom: 8 }}>
              <span style={{
                fontFamily: Mono, fontSize: 10, fontWeight: 700, color: C.goldDm, letterSpacing: '.1em',
              }}>
                ARTICLE {String.fromCharCode(73 + i > 86 ? 73 : 73 + i)}
              </span>
              <span style={{ color: 'rgba(180,160,100,.2)' }}>|</span>
              <h3 style={{ fontFamily: Serif, fontSize: 16, fontWeight: 600, color: C.tx }}>
                {cr.label}
              </h3>
              <span style={{
                fontFamily: Mono, fontSize: 10, color: C.goldDm, background: 'rgba(196,160,64,.06)',
                padding: '2px 8px', borderRadius: 3, border: '1px solid rgba(196,160,64,.12)', letterSpacing: '.06em',
              }}>
                {cr.short}
              </span>
            </div>
            <p style={{ fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.65, paddingLeft: 12, borderLeft: '2px solid rgba(180,160,100,.06)' }}>
              {cr.desc}
            </p>
          </div>
        ))}
        {/* Just War Theory lineage */}
        <div style={{
          padding: 16, background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 6, marginTop: 20, marginBottom: 20,
        }}>
          <p style={{ fontFamily: Mono, fontSize: 12, color: C.blueDm, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>
            Just War Theory Lineage
          </p>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              { jwc: 'Jus ad Bellum — Just Cause', jic: 'Just Intelligence maps "just cause" from armed conflict to intelligence: the threat need not be military, but it must be real and specific.', author: 'Walzer (1977)' },
              { jwc: 'Jus ad Bellum — Right Intention', jic: 'Bellaby extends right intention to prohibit intelligence collection motivated by political advantage, institutional turf, or personal ambition.', author: 'Aquinas / Walzer' },
              { jwc: 'Jus ad Bellum — Legitimate Authority', jic: 'Proper authority in intelligence requires not just legal authorization but democratic oversight — secret courts with no adversarial process are insufficient.', author: 'Church Committee (1976)' },
              { jwc: 'Jus ad Bellum — Last Resort', jic: 'Intelligence last resort means exhausting open-source, diplomatic, and less intrusive collection before escalating to invasive methods.', author: 'Bellaby (2019)' },
              { jwc: 'Jus in Bello — Proportionality', jic: 'Intelligence proportionality weighs the value of expected intelligence against the moral cost of the collection method, including systemic effects.', author: 'Walzer / Bellaby' },
              { jwc: 'Jus in Bello — Discrimination', jic: 'The discrimination principle prohibits intelligence collection that cannot distinguish between legitimate targets and innocent bystanders.', author: 'Bellaby (2019)' },
              { jwc: 'Jus ad Bellum — Reasonable Success', jic: 'Speculative collection that causes real harm without probable benefit violates the reasonable success criterion. The burden of proof is on the collector.', author: 'Bellaby (2019)' },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12,
                padding: '8px 10px', borderRadius: 4,
                background: i % 2 === 0 ? 'rgba(20,24,32,.4)' : 'transparent',
              }}>
                <div>
                  <p style={{ fontFamily: Mono, fontSize: 12, color: C.blue, fontWeight: 600 }}>{row.jwc}</p>
                  <p style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginTop: 2 }}>{row.author}</p>
                </div>
                <p style={{ fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.55 }}>{row.jic}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Key oversight milestones */}
        <div style={{
          padding: 16, background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 6, marginBottom: 20,
        }}>
          <p style={{ fontFamily: Mono, fontSize: 12, color: C.amberDm, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>
            Intelligence Oversight Milestones
          </p>
          {[
            { year: '1975', event: 'Church Committee', detail: 'Senate investigation reveals systematic domestic surveillance abuses by CIA, FBI, and NSA. Establishes the principle that intelligence agencies require democratic oversight.' },
            { year: '1976', event: 'EO 11905', detail: 'Ford bans political assassination. First executive constraint on covert action authority.' },
            { year: '1978', event: 'FISA Enacted', detail: 'Creates the Foreign Intelligence Surveillance Court to provide judicial review of domestic intelligence collection. Establishes the warrant requirement for electronic surveillance of U.S. persons.' },
            { year: '1981', event: 'EO 12333', detail: 'Reagan codifies the intelligence community structure and authorities. Section 2.3 defines permissible collection on U.S. persons. Remains the foundational executive order for intelligence activities.' },
            { year: '2001', event: 'USA PATRIOT Act', detail: 'Post-9/11 expansion of surveillance authorities. Section 215 later interpreted to authorize bulk metadata collection — a reading the law\'s author (Sensenbrenner) publicly repudiated.' },
            { year: '2013', event: 'Snowden Revelations', detail: 'Disclosure of NSA bulk collection programs forces public reckoning with the gap between legal authorization and ethical justification.' },
            { year: '2014', event: 'PCLOB Report', detail: 'Privacy and Civil Liberties Oversight Board finds the Section 215 bulk metadata program was not essential to preventing any terrorist attack.' },
            { year: '2015', event: 'USA FREEDOM Act', detail: 'Ends bulk metadata collection. Requires the government to use specific selectors. Establishes a panel of advocates before the FISA Court.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, padding: '8px 0',
              borderBottom: i < 7 ? '1px solid ' + C.line : 'none',
            }}>
              <span style={{ fontFamily: Mono, fontSize: 12, fontWeight: 700, color: C.amber, minWidth: 44 }}>
                {item.year}
              </span>
              <div>
                <p style={{ fontFamily: Sans, fontSize: 12, fontWeight: 600, color: C.tx, marginBottom: 2 }}>{item.event}</p>
                <p style={{ fontFamily: Serif, fontSize: 11, color: C.tx2, lineHeight: 1.65 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }, []);

  // ── Mode switch ─────────────────────────────────────────────────
  const ModeSwitch = React.useCallback(() => {
    const modes = [
      { id: 'challenge', label: 'Challenge', desc: 'Climb the Ladder' },
      { id: 'ladder', label: 'Ladder', desc: 'SVG Visualization' },
      { id: 'review', label: 'Review', desc: 'Your Results' },
      { id: 'framework', label: 'Framework', desc: '7 Criteria Reference' },
    ];
    return (
      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1, padding: '8px 12px', borderRadius: 4, cursor: 'pointer',
              background: mode === m.id ? C.goldBg : 'transparent',
              border: mode === m.id ? '1px solid ' + C.goldDm : '1px solid ' + C.line,
              textAlign: 'center', transition: 'all .12s ease',
            }}
          >
            <span style={{ fontFamily: Mono, fontSize: 11, fontWeight: 600, color: mode === m.id ? C.gold : C.tx3, display: 'block' }}>
              {m.label}
            </span>
            <span style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{m.desc}</span>
          </button>
        ))}
      </div>
    );
  }, [mode]);

  // ── Main render ─────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0e0a06 0%, #120e08 30%, #0e0a06 100%)', color: C.tx, fontFamily: Sans, position: 'relative' }} ref={topRef}>
      {React.createElement(WoodGrainBg)}
      {/* Top bar — Tribunal header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(14,10,6,.96)', backdropFilter: 'blur(16px)',
        borderBottom: '2px solid rgba(180,160,100,.1)', padding: '0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px' }}>
          <button onClick={() => setView('coursework')} style={{
            background: 'none', border: 'none', color: C.tx3,
            fontFamily: Mono, fontSize: 11, cursor: 'pointer',
          }}>
            {'\u2190'} Back to Coursework
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {React.createElement(ScalesOfJustice, { size: 22, opacity: 0.3, style: {} })}
            <span style={{ fontFamily: Mono, fontSize: 10, color: C.goldDm, letterSpacing: '.15em' }}>
              ETHICS TRIBUNAL {'\u2014'} MPAI 5000 {'\u2014'} INTELLIGENCE ETHICS
            </span>
            {React.createElement(GavelIcon, { size: 16 })}
          </div>
        </div>
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(196,160,64,.15), transparent)' }} />
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {React.createElement(CourtSeal)}
        {/* Hero section — Courtroom entrance */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            {React.createElement(ScalesOfJustice, { size: 56, opacity: 0.1, style: { flexShrink: 0 } })}
            <div>
              <div style={{ fontFamily: Mono, fontSize: 9, letterSpacing: '.2em', color: C.goldDm, marginBottom: 6 }}>JUST INTELLIGENCE THEORY {'\u2014'} ETHICAL ESCALATION REVIEW</div>
              <h1 style={{
                fontFamily: Serif, fontSize: 34, fontWeight: 700,
                color: C.tx, letterSpacing: '-.02em', marginBottom: 0,
              }}>
                Bellaby Escalation Ladder
              </h1>
            </div>
          </div>
          <div style={{ borderLeft: '3px solid rgba(196,160,64,.15)', paddingLeft: 16, marginBottom: 12 }}>
            <p style={{
              fontFamily: Serif, fontSize: 15, color: C.tx2,
              lineHeight: 1.65, marginBottom: 0, maxWidth: 720,
            }}>
              Seven intelligence scenarios of escalating ethical complexity, evaluated against Ross Bellaby's Just Intelligence framework. Each rung tests whether an operation satisfies the seven criteria adapted from Just War Theory for intelligence ethics. Climb the ladder. Make the hard calls. See what the experts say.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            {ET_SKILLS.map(tag => (
              <span key={tag} style={{
                fontFamily: Mono, fontSize: 11, padding: '3px 8px', borderRadius: 3,
                background: C.goldBg, color: C.goldDm, letterSpacing: '.03em',
                borderLeft: '2px solid rgba(196,160,64,.2)',
              }}>
                {tag}
              </span>
            ))}
          </div>
          {/* Progress indicator — Case docket */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, padding: '8px 12px', background: 'rgba(196,160,64,.03)', borderRadius: 4, border: '1px solid rgba(180,160,100,.08)' }}>
            {React.createElement(GavelIcon, { size: 14 })}
            <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: '.05em' }}>CASES ADJUDICATED</span>
            <div style={{ flex: 1, maxWidth: 200, height: 4, background: C.line, borderRadius: 2 }}>
              <div style={{
                width: (completedCount / 7 * 100) + '%',
                height: '100%', borderRadius: 2,
                background: completedCount === 7 ? C.green : C.gold,
                transition: 'width .3s ease',
              }} />
            </div>
            <span style={{ fontFamily: Mono, fontSize: 12, color: completedCount === 7 ? C.green : C.gold, fontWeight: 600 }}>
              {completedCount}/7
            </span>
          </div>
        </div>

        <ModeSwitch />

        {mode === 'challenge' && renderChallenge()}
        {mode === 'ladder' && renderLadderSVG()}
        {mode === 'review' && renderReview()}
        {mode === 'framework' && renderFramework()}
      </div>
    </div>
  );
}
