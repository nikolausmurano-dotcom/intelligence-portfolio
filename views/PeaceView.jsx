// PeaceView.jsx — Peace Process Simulator
// Practices of Peace & Conflict (PCS)
//
// The visitor manages a peace process between two warring factions.
// They must sequence interventions (ceasefire, negotiations, DDR,
// transitional justice, elections) in the right order with the right
// timing. Wrong sequencing produces realistic failure cascades.
// Self-contained React component using Babel in-browser transpilation.
// Globals: useState, useCallback, useMemo from React

// -- Palette: UN Mediation Chamber — diplomatic white paper ──────────
const PC_C = {
  bg:      '#f0f4f8',
  card:    'rgba(248,250,252,.96)',
  cardBd:  'rgba(60,120,190,.16)',
  tx:      '#1a2030',
  tx2:     '#4a5a70',
  tx3:     '#7a8a9a',
  accent:  '#4b92db',
  accentDm:'#3070b0',
  accentBg:'rgba(75,146,219,.10)',
  green:   '#2a8848',
  greenDm: '#1a6830',
  greenBg: 'rgba(42,136,72,.08)',
  amber:   '#987820',
  amberDm: '#786010',
  amberBg: 'rgba(152,120,32,.08)',
  red:     '#a04040',
  redDm:   '#782828',
  redBg:   'rgba(160,64,64,.08)',
  blue:    '#3870a0',
  blueDm:  '#285878',
  blueBg:  'rgba(56,112,160,.08)',
  olive:   '#687838',
  oliveDm: '#506028',
  oliveBg: 'rgba(104,120,56,.08)',
  line:    'rgba(60,120,190,.14)',
  unBlue:  '#4b92db',
  white:   '#1a2030',
  gold:    '#987828',
  goldGlow:'rgba(152,120,40,.06)',
};
const PC_SERIF = "'Source Serif 4','EB Garamond',Georgia,serif";
const PC_SANS  = "'Inter',Helvetica,sans-serif";
const PC_MONO  = "'IBM Plex Mono',monospace";

// -- Dove/olive branch watermark SVG ────────────────────────────────
const DoveWatermark = () => React.createElement('svg', {
  style: { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 400, opacity: 0.05, pointerEvents: 'none', zIndex: 0 },
  viewBox: '0 0 500 400'
},
  // Dove body
  React.createElement('path', { d: 'M150 200 Q180 140 250 130 Q320 120 370 160 L400 140 L380 170 Q360 210 300 230 L260 250 Q220 260 190 250 Q160 240 150 220 Z', fill: '#a0c0c0', stroke: 'none' }),
  // Wing
  React.createElement('path', { d: 'M200 180 Q240 120 300 110 Q340 105 370 120 Q330 130 280 140 Q240 150 220 170 Z', fill: '#80a0a0', stroke: 'none' }),
  // Olive branch
  React.createElement('path', { d: 'M180 240 Q140 270 100 290 Q80 300 60 310', fill: 'none', stroke: '#80a080', strokeWidth: 2 }),
  React.createElement('ellipse', { cx: 120, cy: 275, rx: 12, ry: 6, fill: '#80a080', transform: 'rotate(-30, 120, 275)' }),
  React.createElement('ellipse', { cx: 95, cy: 290, rx: 10, ry: 5, fill: '#80a080', transform: 'rotate(-20, 95, 290)' }),
  React.createElement('ellipse', { cx: 75, cy: 302, rx: 8, ry: 4, fill: '#80a080', transform: 'rotate(-15, 75, 302)' }),
  React.createElement('circle', { cx: 60, cy: 310, r: 4, fill: '#90a870' })
);

// -- UN Laurel wreath decoration ────────────────────────────────────
const LaurelWreath = ({ size, style: extraStyle }) => React.createElement('svg', {
  width: size || 40, height: size || 40, viewBox: '0 0 40 40', style: { ...extraStyle, opacity: extraStyle?.opacity || 0.08, pointerEvents: 'none' }
},
  // Left branch
  React.createElement('path', { d: 'M18 36 Q8 30 6 22 Q4 14 8 8', fill: 'none', stroke: '#80b0a0', strokeWidth: 1 }),
  React.createElement('ellipse', { cx: 8, cy: 12, rx: 4, ry: 2.5, fill: '#80b0a0', transform: 'rotate(-60, 8, 12)' }),
  React.createElement('ellipse', { cx: 6, cy: 18, rx: 4, ry: 2.5, fill: '#80b0a0', transform: 'rotate(-40, 6, 18)' }),
  React.createElement('ellipse', { cx: 7, cy: 24, rx: 4, ry: 2.5, fill: '#80b0a0', transform: 'rotate(-20, 7, 24)' }),
  React.createElement('ellipse', { cx: 10, cy: 30, rx: 4, ry: 2.5, fill: '#80b0a0', transform: 'rotate(-5, 10, 30)' }),
  // Right branch
  React.createElement('path', { d: 'M22 36 Q32 30 34 22 Q36 14 32 8', fill: 'none', stroke: '#80b0a0', strokeWidth: 1 }),
  React.createElement('ellipse', { cx: 32, cy: 12, rx: 4, ry: 2.5, fill: '#80b0a0', transform: 'rotate(60, 32, 12)' }),
  React.createElement('ellipse', { cx: 34, cy: 18, rx: 4, ry: 2.5, fill: '#80b0a0', transform: 'rotate(40, 34, 18)' }),
  React.createElement('ellipse', { cx: 33, cy: 24, rx: 4, ry: 2.5, fill: '#80b0a0', transform: 'rotate(20, 33, 24)' }),
  React.createElement('ellipse', { cx: 30, cy: 30, rx: 4, ry: 2.5, fill: '#80b0a0', transform: 'rotate(5, 30, 30)' })
);

// -- Peace Pipeline Data (SVG mode) ------------------------------------
const PEACE_PHASES_SVG = [
  { id: 'ceasefire', label: 'Ceasefire', x: 30, cases: { ni: 'pass', rwanda: 'fail', colombia: 'pass' } },
  { id: 'negotiation', label: 'Negotiation', x: 180, cases: { ni: 'pass', rwanda: 'partial', colombia: 'pass' } },
  { id: 'agreement', label: 'Agreement', x: 330, cases: { ni: 'pass', rwanda: 'partial', colombia: 'pass' } },
  { id: 'ddr', label: 'DDR / Reform', x: 480, cases: { ni: 'pass', rwanda: 'pass', colombia: 'partial' } },
  { id: 'reconciliation', label: 'Reconciliation', x: 630, cases: { ni: 'partial', rwanda: 'partial', colombia: 'partial' } },
];

// -- Phase Data ------------------------------------------------------
const PHASES = [
  {
    id: 'prenegotiation',
    num: 1,
    name: 'Pre-Negotiation',
    subtitle: 'Track II Diplomacy & Confidence Building',
    color: PC_C.blue,
    icon: '\u2637',
    overview: 'Before formal talks can begin, Track II diplomacy creates communication channels between adversaries. Confidence-building measures reduce suspicion. Key stakeholders must be identified and potential spoilers managed. The goal is not agreement but the establishment of conditions under which agreement becomes possible.',
    interventions: [
      { name: 'Track II Dialogue', desc: 'Unofficial, informal contacts between non-state actors (academics, religious leaders, retired officials) who can explore possibilities without committing their governments. Deniable but essential for mapping the political space.', timing: 'Must precede formal negotiations by months or years', risk: 'Can be dismissed as irrelevant by hardliners; participants may lack authority to deliver commitments' },
      { name: 'Confidence-Building Measures', desc: 'Reciprocal gestures that demonstrate good faith: prisoner exchanges, humanitarian corridors, cultural exchanges, joint infrastructure projects. Each measure is small individually but cumulative trust-building is significant.', timing: 'Continuous throughout pre-negotiation; must begin early', risk: 'Spoilers may sabotage CBMs to derail the process; premature CBMs without security guarantees can be exploited' },
      { name: 'Stakeholder Mapping', desc: 'Identifying all parties with the capacity to advance or obstruct peace: armed factions, civil society, diaspora communities, regional powers, international organizations. Excluding key stakeholders creates spoiler problems later.', timing: 'Before Track II begins; updated continuously', risk: 'Inclusive mapping may empower extremists by granting them recognition; exclusive mapping creates grievances' },
    ],
    keyPrinciple: 'Lederach\'s concept of "moral imagination" -- the capacity to imagine oneself in a web of relationship with the enemy. Peace processes fail when they treat the adversary as a problem to be solved rather than a relationship to be transformed.',
    failure: 'Rushing to formal negotiations without adequate pre-negotiation typically produces agreements that lack buy-in from key constituencies. The Oslo Accords (1993) moved directly to Track I talks between Israeli and PLO negotiators without adequately preparing domestic constituencies on either side, contributing to the process\'s eventual collapse.',
  },
  {
    id: 'ceasefire',
    num: 2,
    name: 'Ceasefire & Mediation',
    subtitle: 'Stopping the Violence & Beginning Formal Talks',
    color: PC_C.green,
    icon: '\u2696',
    overview: 'The transition from violence to negotiation is the most dangerous moment. Ceasefires must be monitored and verified. Mediation requires a credible third party acceptable to all sides. The sequencing of agenda items in formal talks determines which issues create momentum and which create deadlock.',
    interventions: [
      { name: 'Ceasefire Agreement', desc: 'A formal commitment to stop fighting. May be partial (limited to certain areas or forces) or comprehensive. Requires clear definitions of prohibited actions, verification mechanisms, and consequences for violations.', timing: 'After sufficient Track II progress; may need security guarantees from external parties', risk: 'Ceasefires may be used tactically to rearm and reposition; asymmetric compliance creates cynicism' },
      { name: 'Third-Party Mediation', desc: 'A neutral facilitator manages the negotiation process: setting agendas, managing emotions, proposing formulas, maintaining momentum. The mediator\'s leverage depends on their ability to offer carrots (aid, recognition) and sticks (sanctions, threats).', timing: 'Must be established before or concurrent with ceasefire', risk: 'Mediator bias (real or perceived) can delegitimize the process; "mediator\'s dilemma" between neutrality and pressure' },
      { name: 'Monitoring & Verification', desc: 'International observers, UN peacekeepers, or joint monitoring commissions verify compliance with ceasefire terms. Technology (satellites, drones, electronic sensors) supplements human observation.', timing: 'Must be in place before or immediately upon ceasefire', risk: 'Inadequate monitoring enables cheating; monitoring forces may become targets; mission creep' },
    ],
    keyPrinciple: 'William Zartman\'s concept of "ripeness" -- parties negotiate seriously only when they reach a "mutually hurting stalemate" where neither side can achieve its goals through violence and both perceive a "way out" through negotiation. Premature mediation before ripeness wastes political capital.',
    failure: 'The Darfur peace process (2006) produced the Darfur Peace Agreement signed by only one of three rebel factions. Insufficient ceasefire monitoring allowed continued violence, while the mediation timeline was driven by international donor fatigue rather than local readiness. The agreement collapsed within months.',
  },
  {
    id: 'agreement',
    num: 3,
    name: 'Peace Agreement',
    subtitle: 'Negotiating the Settlement Architecture',
    color: PC_C.accent,
    icon: '\u270D',
    overview: 'The formal peace agreement defines the post-conflict political order: power-sharing arrangements, constitutional reform, security sector restructuring, economic redistribution, territorial questions, and transitional governance. The agreement must be specific enough to be implementable but flexible enough to accommodate changing circumstances.',
    interventions: [
      { name: 'Power-Sharing Design', desc: 'Mechanisms for distributing political power among former adversaries: coalition governments, reserved seats, rotating presidencies, federalism, consociational democracy. The design must balance inclusion (bringing former fighters into politics) against accountability (not rewarding violence).', timing: 'Central to peace agreement negotiations', risk: 'Power-sharing can entrench ethnic/sectarian divisions (as in Bosnia); may create permanent vetoes that paralyze governance' },
      { name: 'Security Sector Reform', desc: 'Restructuring the military, police, and intelligence services to serve a unified state rather than factional interests. Integration of former combatants into a reformed security sector. Civilian oversight mechanisms.', timing: 'Must be specified in agreement; implementation extends years beyond signing', risk: 'Former enemies in the same army creates internal security risks; dominance by one faction in SSR reproduces pre-war dynamics' },
      { name: 'Constitutional Framework', desc: 'The legal architecture of the post-conflict state: distribution of powers, rights protections, electoral system design, amendment procedures. Must balance majority rule with minority protections.', timing: 'May be part of the peace agreement or delegated to a constituent assembly', risk: 'Constitutions imposed externally lack domestic legitimacy; constitutions negotiated under duress may be repudiated later' },
    ],
    keyPrinciple: 'Stedman\'s "spoiler management" framework: peace agreements must anticipate that actors excluded from or dissatisfied with the settlement will attempt to undermine it. Strategies include inducement (buying off spoilers), socialization (integrating them), and coercion (marginalizing them). The strategy must match the spoiler type.',
    failure: 'The Arusha Accords (1993) for Rwanda created an elaborate power-sharing framework between the Hutu-dominated government and the Tutsi-led RPF. The agreement was detailed and comprehensive on paper but failed to account for extremist Hutu spoilers who had no interest in implementation. Within six months, those spoilers launched the genocide that killed 800,000 people.',
  },
  {
    id: 'ddr',
    num: 4,
    name: 'DDR Process',
    subtitle: 'Disarmament, Demobilization & Reintegration',
    color: PC_C.olive,
    icon: '\u2693',
    overview: 'DDR transforms combatants into civilians. Disarmament collects weapons. Demobilization dissolves military structures. Reintegration provides former fighters with economic alternatives to violence. DDR is perhaps the most practically challenging phase: it asks fighters to surrender the source of their power and livelihood on the promise of a future that does not yet exist.',
    interventions: [
      { name: 'Disarmament', desc: 'Collection, documentation, and destruction or safe storage of weapons. Includes small arms, heavy weapons, ammunition, and explosives. Must address both formal arsenals and the vast quantities of informal weapons circulating in conflict zones.', timing: 'Begins during or immediately after ceasefire; may take years to complete', risk: 'Combatants hide weapons as insurance against process failure; disarming one side first creates vulnerability; black market weapons flows continue' },
      { name: 'Demobilization', desc: 'Formal dissolution of armed units: registration of combatants, separation from command structures, encampment, orientation, and discharge. Creates the administrative infrastructure for tracking ex-combatants through reintegration.', timing: 'Follows initial disarmament; requires cantonment sites and logistics', risk: 'Cantonment sites can become sources of unrest if conditions are poor; delays in processing create frustration; commanders may resist losing their forces' },
      { name: 'Reintegration', desc: 'Long-term process of providing former combatants with economic opportunities, psychosocial support, education/training, and community acceptance. Must address both the practical needs of ex-combatants and the resentment of communities who suffered at their hands.', timing: 'Begins during demobilization; extends 3-10 years post-conflict', risk: 'Inadequate funding creates "revolving door" re-recruitment; benefits to ex-combatants may be resented by civilian victims; PTSD and trauma go unaddressed' },
    ],
    keyPrinciple: 'Berdal\'s insight that DDR is fundamentally a political process, not a technical one. The willingness of combatants to disarm depends on their confidence in the political settlement, not on the efficiency of weapons collection. DDR programs that treat disarmament as a logistical exercise without addressing the underlying political bargain consistently fail.',
    failure: 'The DDR process in Liberia (2003-2004) initially offered $300 per weapon turned in, creating perverse incentives: weapons flooded in from neighboring countries, some combatants sold their weapons on the black market and bought cheaper ones to turn in, and the program ran out of funds before addressing the harder reintegration challenge. Only 27% of demobilized fighters accessed reintegration programs.',
  },
  {
    id: 'justice',
    num: 5,
    name: 'Transitional Justice',
    subtitle: 'Truth, Accountability & Reconciliation',
    color: PC_C.amber,
    icon: '\u2618',
    overview: 'How a society addresses past atrocities shapes its post-conflict future. The fundamental tension is between peace (which may require amnesty to bring perpetrators to the table) and justice (which demands accountability). There is no universally correct balance; each society must navigate this dilemma in its own context.',
    interventions: [
      { name: 'Truth Commissions', desc: 'Official bodies that investigate, document, and publicly acknowledge patterns of past violence. Create an authoritative historical record. May name perpetrators without criminal prosecution. Provide victims a space to tell their stories. South Africa\'s TRC is the paradigmatic example.', timing: 'Typically established within 1-3 years of peace agreement', risk: 'Can re-traumatize victims without delivering material justice; may be seen as "truth without consequences"; political manipulation of findings' },
      { name: 'Criminal Tribunals', desc: 'Prosecution of individuals for war crimes, crimes against humanity, and genocide. May be international (ICC, ad hoc tribunals), hybrid (mixed international/domestic courts), or purely domestic. Focus on individual rather than collective responsibility.', timing: 'Can begin concurrently with peace process or years later; ICC investigations may predate peace agreement', risk: 'Arrest warrants for sitting leaders may obstruct peace talks (ICC warrant for Bashir); "victor\'s justice" perception; capacity limitations on number of prosecutions' },
      { name: 'Amnesty & Conditional Immunity', desc: 'Blanket or conditional pardons for conflict-related offenses. May be unconditional (full amnesty) or conditional on truth-telling (South Africa model), community service, or restitution. Controversial under international law but sometimes pragmatically necessary.', timing: 'Often negotiated as part of peace agreement; implementation extends years', risk: 'Blanket amnesty for serious crimes may violate international obligations; conditional amnesty requires enforcement capacity; victims may perceive impunity' },
    ],
    keyPrinciple: 'The "peace vs. justice" dilemma is not binary but a spectrum. Different mechanisms can operate simultaneously: criminal prosecution for top leaders, truth commissions for mid-level perpetrators, traditional/community justice for low-level offenders, and institutional reform for systemic causes. The art is calibrating the mix to the specific context.',
    failure: 'The amnesty provisions in Sierra Leone\'s Lome Peace Agreement (1999) granted blanket amnesty to all combatants including RUF leader Foday Sankoh, who had ordered mass amputations of civilians. When Sankoh subsequently violated the agreement and resumed violence, the amnesty was rescinded and the Special Court for Sierra Leone was established. The initial amnesty had sacrificed justice without securing peace.',
  },
];

// -- Case Studies Data -----------------------------------------------
const CASE_STUDIES = [
  {
    id: 'nireland',
    name: 'Northern Ireland',
    period: '1968-1998',
    agreement: 'Good Friday Agreement (1998)',
    color: PC_C.green,
    summary: 'Thirty years of sectarian violence between Unionist/Loyalist and Nationalist/Republican communities, with British state forces as a third actor. The peace process took over a decade of secret backchannel talks, multiple failed ceasefires, and creative constitutional engineering.',
    phases: {
      prenegotiation: 'Track II contacts between MI6 and IRA began as early as 1972. John Hume-Gerry Adams dialogue (1988-1993) established the principle that Sinn Fein could participate in talks if the IRA committed to a ceasefire. The Hume-Adams framework became the basis for the Downing Street Declaration (1993).',
      ceasefire: 'IRA ceasefire (August 1994) followed by Loyalist ceasefire (October 1994). The IRA broke its ceasefire in February 1996 (Canary Wharf bombing) after frustration with the pace of talks, then restored it in July 1997. Senator George Mitchell served as mediator, establishing the "Mitchell Principles" of non-violence.',
      agreement: 'The Good Friday Agreement (1998) created: a Northern Ireland Assembly with power-sharing executive; a North-South Ministerial Council linking Northern Ireland and the Republic; a British-Irish Council; reform of the Royal Ulster Constabulary; early prisoner release. The agreement was endorsed by referendums in both Northern Ireland (71%) and the Republic (94%).',
      ddr: 'IRA decommissioning was the most contentious issue, taking until 2005 to complete. The Independent International Commission on Decommissioning (IICD), led by General John de Chastelain, oversaw the process. Loyalist decommissioning was even slower. The process required enormous patience and creative ambiguity about timelines.',
      justice: 'No comprehensive truth commission was established. The Historical Enquiries Team (2005-2014) re-examined 3,260 deaths. Victims\' groups have persistently demanded a formal truth process. The 2014 Stormont House Agreement proposed an Independent Commission on Information Retrieval, but implementation has stalled. Legacy cases remain one of the most contentious issues in Northern Irish politics.',
    },
    lessons: 'Demonstrates the value of patience, backchannel diplomacy, creative constitutional design, and the principle that "nothing is agreed until everything is agreed." Also shows that transitional justice deficits can haunt a peace process for decades.',
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    period: '1990-2003',
    agreement: 'Arusha Accords (1993) / Post-Genocide Settlement',
    color: PC_C.red,
    summary: 'The Rwandan case is a dual lesson: the catastrophic failure of the Arusha peace process (which ended in genocide) and the innovative post-genocide justice mechanisms. The 1994 genocide killed approximately 800,000 Tutsi and moderate Hutu in 100 days.',
    phases: {
      prenegotiation: 'The RPF invasion from Uganda (1990) and subsequent civil war created conditions for negotiation. International pressure (especially from France and the OAU) pushed both sides toward talks. However, Hutu extremist factions within the government had no intention of implementing any agreement and were already planning the genocide.',
      ceasefire: 'Multiple ceasefires (1991, 1992, 1993) were violated. The Arusha talks, mediated by Tanzania, produced a comprehensive agreement in August 1993. UNAMIR (UN peacekeeping mission) deployed but with a mandate too weak to prevent violence. When President Habyarimana\'s plane was shot down on April 6, 1994, the genocide began within hours.',
      agreement: 'The Arusha Accords included power-sharing, integration of the RPF into the national army, refugee return, and transitional institutions. On paper, it was a model agreement. In practice, it was dead on arrival because the genocidaire faction had no intention of sharing power and used the agreement as cover for genocide planning.',
      ddr: 'Post-genocide, the RPF-led government conducted demobilization of the former Rwandan army (ex-FAR) and integration of both forces into the new Rwanda Defence Force. The Rwanda Demobilisation and Reintegration Commission processed approximately 69,000 ex-combatants between 1997 and 2008. The process was relatively successful in military terms but politically dominated by RPF interests.',
      justice: 'Rwanda employed a multi-layered approach: the International Criminal Tribunal for Rwanda (ICTR, Arusha) prosecuted top leaders; national courts handled mid-level perpetrators; and the Gacaca community courts (2005-2012) processed approximately 1.9 million cases at the community level using a modified traditional justice mechanism combining confession, community testimony, and reduced sentences.',
    },
    lessons: 'Demonstrates that peace agreements without spoiler management can be catastrophically counterproductive. Also demonstrates innovative transitional justice: Gacaca courts processed an unprecedented volume of cases but raised concerns about due process and were criticized by some as instruments of RPF political control.',
  },
  {
    id: 'colombia',
    name: 'Colombia',
    period: '1964-2016',
    agreement: 'Final Agreement (2016)',
    color: PC_C.amber,
    summary: 'The longest-running armed conflict in the Western Hemisphere ended with a comprehensive peace agreement between the Colombian government and the FARC-EP after more than fifty years of war. The process is notable for its innovative approach to transitional justice, victim participation, and rural reform.',
    phases: {
      prenegotiation: 'Secret exploratory talks in Havana began in 2012, facilitated by Cuba and Norway. The agenda was structured around six points: rural reform, political participation, ceasefire, illicit drugs, victims\' rights, and implementation. Previous peace attempts (1984, 1999-2002) had failed, creating deep public skepticism.',
      ceasefire: 'A bilateral ceasefire was implemented only after substantive agreement was reached on most agenda items (2016), reflecting lessons from previous attempts where premature ceasefires had been exploited. Verification was handled by a tripartite mechanism including the UN Political Mission, government forces, and FARC.',
      agreement: 'The 310-page Final Agreement addressed comprehensive rural reform, political opening for the FARC, crop substitution for coca growers, a Special Jurisdiction for Peace (JEP), and a truth commission (CEV). The initial agreement was rejected in a 2016 referendum (50.2% against) and had to be renegotiated and ratified by Congress.',
      ddr: 'Approximately 13,000 FARC combatants demobilized into 26 Territorial Areas for Training and Reintegration. Weapons were collected by the UN and melted down into three monuments. The reintegration process has faced significant challenges: slow implementation of productive projects, security threats from dissidents and criminal groups, and inadequate government support for former combatant cooperatives.',
      justice: 'The Special Jurisdiction for Peace (JEP) is the most ambitious transitional justice mechanism ever attempted. It offers reduced sentences (5-8 years of "effective restrictions on liberty") for those who confess fully and make reparations, versus 15-20 years in prison for those who do not. The Truth Commission (CEV) operated 2018-2022 and produced a comprehensive final report. A Unit for the Search of Disappeared Persons was also established.',
    },
    lessons: 'Demonstrates that victim-centered transitional justice can be embedded in a peace agreement from the beginning rather than added as an afterthought. The referendum rejection shows the risk of insufficient public communication. The ongoing implementation challenges illustrate Paris\'s warning that peace agreements are not self-executing.',
  },
];

// -- Toolkit Data ---------------------------------------------------
const TOOLKIT = [
  {
    category: 'Structural Peacebuilding',
    color: PC_C.accent,
    tools: [
      { name: 'Conflict Transformation', desc: 'Lederach\'s approach: moving beyond conflict resolution (settling the immediate dispute) toward transforming the underlying relationships, structures, and cultures that produce violence. Focuses on the web of relationships within which the conflict exists.', source: 'Lederach, "Building Peace" (1997)' },
      { name: 'Multi-Track Diplomacy', desc: 'Nine tracks of peacebuilding operating simultaneously: government, professional, business, private citizen, research, activism, religion, funding, and media. Effective peacebuilding requires coordination across all tracks, not just government-to-government negotiation.', source: 'Diamond & McDonald, "Multi-Track Diplomacy" (1996)' },
      { name: 'Liberal Peace Critique', desc: 'Paris argues that rapid democratization and marketization in post-conflict societies can be destabilizing. "Institutionalization before liberalization": build state capacity and the rule of law before opening political and economic competition.', source: 'Paris, "At War\'s End" (2004)' },
    ],
  },
  {
    category: 'Process Design',
    color: PC_C.blue,
    tools: [
      { name: 'Ripeness Theory', desc: 'Zartman\'s framework: mediation is most effective when parties have reached a "mutually hurting stalemate" and perceive a "way out." Timing matters more than technique. Intervention before ripeness wastes resources; after ripeness, opportunities may be lost.', source: 'Zartman, "Ripe for Resolution" (1989)' },
      { name: 'Spoiler Management', desc: 'Stedman\'s typology: total spoilers (fundamentally opposed to peace), greedy spoilers (willing to sign if they get enough), and limited spoilers (opposed to specific provisions). Each type requires a different response: coercion, inducement, or socialization.', source: 'Stedman, "Spoiler Problems" (1997)' },
      { name: 'Sequencing & Timing', desc: 'The order in which peace process steps are taken matters enormously. Premature elections can entrench wartime leaders. DDR before political settlement leaves combatants without assurance. Justice before peace may obstruct negotiations. Each context requires a customized sequence.', source: 'Reilly, "Post-War Elections" (2008)' },
    ],
  },
  {
    category: 'DDR & Security',
    color: PC_C.olive,
    tools: [
      { name: 'Community-Based Reintegration', desc: 'Rather than targeting ex-combatants exclusively (which creates resentment), community-based approaches provide resources to entire communities that absorb former fighters. Reduces stigma and addresses the needs of civilian victims simultaneously.', source: 'Berdal, "Disarmament and Demobilisation" (1996)' },
      { name: 'Security Sector Reform (SSR)', desc: 'Comprehensive reform of military, police, intelligence, and justice institutions to create legitimate, accountable, and effective security provision. Includes vetting, retraining, integration of former combatants, and civilian oversight mechanisms.', source: 'Brzoska, "Security Sector Reform" (2006)' },
      { name: 'Small Arms Control', desc: 'Post-conflict societies are awash in weapons. Programs include buyback schemes, weapons-for-development exchanges, destruction events, safe storage laws, and regional arms control agreements. No DDR succeeds without addressing the broader weapons ecology.', source: 'Muggah, "No Magic Bullet" (2006)' },
    ],
  },
  {
    category: 'Justice & Reconciliation',
    color: PC_C.amber,
    tools: [
      { name: 'Complementarity Principle', desc: 'The ICC acts only when national courts are unwilling or unable to prosecute. This creates incentives for domestic justice efforts while maintaining international accountability as a backstop. The principle shapes how national and international justice interact.', source: 'Rome Statute, Article 17 (1998)' },
      { name: 'Memorialization', desc: 'Physical sites (museums, memorials, renamed streets), commemorative practices (annual ceremonies, education curricula), and narrative projects (oral histories, documentary film) that maintain collective memory of violence and its causes. How a society remembers shapes whether it repeats.', source: 'Jelin, "State Repression and Memory" (2003)' },
      { name: 'Reparations Programs', desc: 'Material and symbolic compensation for victims: cash payments, land restitution, educational scholarships, health services, public apologies, and institutional reform. Individual vs. collective reparations; the challenge of prioritizing among millions of victims.', source: 'de Greiff, "Handbook of Reparations" (2006)' },
    ],
  },
];

// -- Skills ----------------------------------------------------------
const PC_SKILLS = [
  'Peace Process Design', 'Mediation & Negotiation', 'DDR Programming',
  'Transitional Justice', 'Conflict Transformation', 'Case Analysis',
];

// -- Simulation Scoring Logic ----------------------------------------
const CORRECT_SEQUENCE = ['prenegotiation', 'ceasefire', 'agreement', 'ddr', 'justice'];

function scoreSequence(userSeq) {
  let score = 0;
  let feedback = [];

  // Check if pre-negotiation is first
  if (userSeq[0] === 'prenegotiation') {
    score += 20;
    feedback.push({ phase: 'Pre-Negotiation', status: 'correct', msg: 'Correctly placed first. Track II diplomacy must establish communication channels before formal talks.' });
  } else {
    feedback.push({ phase: 'Pre-Negotiation', status: 'error', msg: 'Should come first. Skipping pre-negotiation means formal talks lack the informal groundwork needed for trust.' });
  }

  // Check ceasefire before agreement
  const cIdx = userSeq.indexOf('ceasefire');
  const aIdx = userSeq.indexOf('agreement');
  if (cIdx < aIdx) {
    score += 20;
    feedback.push({ phase: 'Ceasefire', status: 'correct', msg: 'Correctly placed before peace agreement. Negotiations under fire rarely produce durable settlements.' });
  } else {
    feedback.push({ phase: 'Ceasefire', status: 'warning', msg: 'Placing ceasefire after agreement is risky. While some processes negotiate while fighting, this increases the chance of spoiler attacks during talks.' });
    score += 5;
  }

  // Check agreement before DDR
  const dIdx = userSeq.indexOf('ddr');
  if (aIdx < dIdx) {
    score += 20;
    feedback.push({ phase: 'Peace Agreement', status: 'correct', msg: 'Correctly placed before DDR. Combatants will not disarm without a political settlement that addresses their concerns.' });
  } else {
    feedback.push({ phase: 'Peace Agreement', status: 'error', msg: 'DDR before a political settlement asks fighters to surrender their leverage without assurance. This is the most common sequencing error in practice.' });
  }

  // Check DDR before justice
  const jIdx = userSeq.indexOf('justice');
  if (dIdx < jIdx) {
    score += 20;
    feedback.push({ phase: 'DDR', status: 'correct', msg: 'Correctly placed before transitional justice. Disarming combatants before prosecuting them reduces the risk of return to violence.' });
  } else {
    feedback.push({ phase: 'DDR', status: 'warning', msg: 'Pursuing justice before DDR may deter combatants from disarming. The "peace vs. justice" dilemma is real: amnesty provisions in a peace deal may be necessary even if morally uncomfortable.' });
    score += 10;
  }

  // Check justice is last
  if (userSeq[4] === 'justice') {
    score += 20;
    feedback.push({ phase: 'Transitional Justice', status: 'correct', msg: 'Correctly placed last. Long-term reconciliation requires that immediate security and political concerns are addressed first.' });
  } else {
    feedback.push({ phase: 'Transitional Justice', status: 'warning', msg: 'Transitional justice is most effective when security has been established and political institutions are functioning. Premature justice processes can be destabilizing.' });
    score += 10;
  }

  return { score, feedback };
}

// -- Scholarly Micro-Content Tooltips ------------------------------------
const PEACE_TIPS = {
  negative_peace: "Johan Galtung distinguished 'negative peace' (the absence of direct violence) from 'positive peace' (the absence of structural violence \u2014 poverty, inequality, discrimination). Most peace agreements achieve only negative peace: the guns stop, but the underlying grievances that caused the war remain intact. This is why roughly half of all peace agreements fail within five years. The ceasefire holds until the unaddressed structural conditions regenerate the motivation for violence. Galtung's framework redefines peace from an event (signing a treaty) to a condition (just social structures).",
  spoiler_problem: "Stephen Stedman's 'spoiler problem' (1997) identified the parties who benefit from continued conflict and will actively sabotage peace processes. Spoilers come in three types: total spoilers (who reject peace entirely), limited spoilers (who want a better deal), and greedy spoilers (who expand demands as concessions are made). The assassination of Yitzhak Rabin in 1995 by an Israeli extremist who opposed the Oslo Accords is a textbook spoiler action. The mediator's challenge is distinguishing spoiler types because each requires a different strategy: total spoilers must be marginalized, limited spoilers must be brought in, and greedy spoilers must be contained.",
  ddr: "Disarmament, Demobilization, and Reintegration (DDR) is the most dangerous phase of any peace process. Armed combatants must surrender their weapons and believe they will be safer without them \u2014 a leap of faith in post-conflict environments where trust is shattered. If DDR fails, the peace collapses. Sierra Leone's DDR succeeded partly because ex-combatants were offered vocational training programs that provided an alternative identity to 'fighter.' Liberia's DDR nearly failed when combatants showed up at collection points with broken weapons, having hidden their real arms. The fundamental challenge: how do you make peace attractive to people whose only source of status, income, and identity is war?",
};

// -- Main Component --------------------------------------------------
function PeaceView({ setView }) {
  const [mode, setMode] = useState('simulator');
  const [simSequence, setSimSequence] = useState([]);
  const [simSubmitted, setSimSubmitted] = useState(false);
  const [simResult, setSimResult] = useState(null);
  const [activeCase, setActiveCase] = useState(0);
  const [casePhase, setCasePhase] = useState('prenegotiation');
  const [activeTool, setActiveTool] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [seqHover, setSeqHover] = useState(null);
  const [tipId, setTipId] = useState(null);
  const [spoilerCase, setSpoilerCase] = useState(0);
  const [spoilerChoices, setSpoilerChoices] = useState({});
  const [spoilerRevealed, setSpoilerRevealed] = useState({});
  const [justiceExpanded, setJusticeExpanded] = useState(null);

  // ── Mediation technique selector state ──────────────────
  const [medScenario, setMedScenario] = useState(0);
  const [medChoices, setMedChoices] = useState({});
  const [medRevealed, setMedRevealed] = useState({});

  // ── Peace process timeline state ────────────────────────
  const [tlSort, setTlSort] = useState('duration');
  const [tlFactor, setTlFactor] = useState('none');
  const [tlExpanded, setTlExpanded] = useState(null);

  const C = PC_C;

  // ── Scholarly Micro-Icons & Tooltip ──────────────────────────
  function Tip({ id }) {
    if (tipId !== id || !PEACE_TIPS[id]) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(235,240,245,.92)', border: '1px solid ' + C.accent + '25', borderRadius: 3, maxWidth: 440, fontSize: 11, fontFamily: PC_MONO, color: C.tx2, lineHeight: 1.65, margin: '6px 0 10px' }}>
        {PEACE_TIPS[id]}
      </div>
    );
  }

  const DoveIcon = () => (
    <svg width="24" height="20" viewBox="0 0 24 20" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='negative_peace'?null:'negative_peace')}>
      <path d="M4 14 Q8 6 14 6 Q18 6 20 10 L22 8 L20 12 Q18 16 12 16 L8 18 L10 14 Z" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <line x1="14" y1="10" x2="18" y2="8" stroke="currentColor" strokeWidth=".4"/>
    </svg>
  );

  const SpoilerIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='spoiler_problem'?null:'spoiler_problem')}>
      <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <line x1="5" y1="5" x2="17" y2="17" stroke="currentColor" strokeWidth=".7"/>
      <line x1="17" y1="5" x2="5" y2="17" stroke="currentColor" strokeWidth=".7"/>
    </svg>
  );

  const DDRIcon = () => (
    <svg width="24" height="22" viewBox="0 0 24 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='ddr'?null:'ddr')}>
      <path d="M4 4 L8 4 L8 14 L4 14 Z" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <line x1="6" y1="14" x2="6" y2="20" stroke="currentColor" strokeWidth=".5" strokeDasharray="1 1"/>
      <path d="M12 6 L16 6 L14 2 Z" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <line x1="14" y1="6" x2="14" y2="12" stroke="currentColor" strokeWidth=".5"/>
      <circle cx="20" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <path d="M18 10 L20 12 L22 8" fill="none" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const toggleSection = useCallback((key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const addToSequence = useCallback((phaseId) => {
    if (simSubmitted) return;
    setSimSequence(prev => {
      if (prev.includes(phaseId)) return prev.filter(p => p !== phaseId);
      if (prev.length >= 5) return prev;
      return [...prev, phaseId];
    });
  }, [simSubmitted]);

  const submitSequence = useCallback(() => {
    if (simSequence.length !== 5) return;
    const result = scoreSequence(simSequence);
    setSimResult(result);
    setSimSubmitted(true);
  }, [simSequence]);

  const resetSim = useCallback(() => {
    setSimSequence([]);
    setSimSubmitted(false);
    setSimResult(null);
  }, []);

  const MODES = [
    { id: 'simulator', label: 'Simulator',    icon: '\u2699' },
    { id: 'sequence',  label: 'Sequence',     icon: '\u2192' },
    { id: 'cases',     label: 'Case Studies', icon: '\u2316' },
    { id: 'toolkit',   label: 'Toolkit',      icon: '\u2692' },
    { id: 'spoiler',   label: 'Spoilers',     icon: '\u26A0' },
    { id: 'justice',   label: 'Justice',      icon: '\u2696' },
    { id: 'mediation', label: 'Mediation',    icon: '\u2637' },
    { id: 'timeline',  label: 'Timeline',     icon: '\u23F1' },
  ];

  // -- Spoiler Management Simulator -----------------------------------
  const SPOILER_CASES = useMemo(() => [
    {
      id: 'nireland', name: 'Northern Ireland (1994-1998)',
      context: 'The Northern Ireland peace process culminated in the 1998 Good Friday Agreement. Multiple spoiler groups threatened the process at every stage.',
      spoilers: [
        { name: 'Real IRA', type: 'Total spoiler', goal: 'Rejected any settlement short of united Ireland. Broke from Provisional IRA when Sinn Fein entered negotiations.', keyAct: 'Omagh bombing (August 1998): 29 killed, 220 injured \u2014 the deadliest single attack of the Troubles, perpetrated AFTER the Agreement was signed.' },
        { name: 'Loyalist Volunteer Force (LVF)', type: 'Total spoiler', goal: 'Opposed any accommodation with Republicans. Billy Wright faction rejected Combined Loyalist Military Command ceasefire.', keyAct: 'Sectarian assassinations of Catholics to provoke IRA retaliation and collapse the ceasefire.' },
        { name: 'Ian Paisley / DUP', type: 'Limited spoiler (initially)', goal: 'Opposed specific terms (prisoner release, Sinn Fein in government without IRA decommissioning) but not the concept of agreement itself.', keyAct: 'Led "No" campaign in 1998 referendum. Eventually entered power-sharing government with Sinn Fein in 2007 \u2014 demonstrating spoiler transformation.' },
      ],
      strategies: {
        accommodate: { result: 'Mixed success. Accommodating the DUP eventually worked (Paisley became First Minister alongside McGuinness in 2007). But accommodating total spoilers like the Real IRA was impossible \u2014 their goals were non-negotiable. The key lesson: accommodation works with limited spoilers whose demands can be partially met.', effectiveness: 'medium' },
        marginalize: { result: 'Effective against total spoilers. The Real IRA was isolated through intelligence operations, community rejection (Omagh bombing turned public opinion decisively against them), and cross-border security cooperation. The LVF was marginalized through arrests and internal factional collapse. Marginalization requires that the spoiler lacks broad community support.', effectiveness: 'high' },
        socialize: { result: 'The defining success of the process. Sinn Fein/IRA were socialized from armed movement to political party through incremental inclusion: ceasefire, talks participation, electoral politics, power-sharing. The critical mechanism was making political participation more rewarding than armed struggle. Took 15+ years.', effectiveness: 'high' },
      },
    },
    {
      id: 'colombia', name: 'Colombia (2012-2016)',
      context: 'The Santos-FARC peace process (2012-2016) negotiated an end to 52 years of armed conflict. Multiple actors had interests in continuing war.',
      spoilers: [
        { name: 'Alvaro Uribe / Centro Democratico', type: 'Limited spoiler', goal: 'Former president opposed the terms of the agreement (transitional justice provisions, FARC political participation) rather than peace itself. Led the "No" campaign in the 2016 plebiscite.', keyAct: 'Successfully campaigned for "No" in the October 2016 plebiscite (50.2% to 49.8%), forcing renegotiation of the agreement.' },
        { name: 'ELN (National Liberation Army)', type: 'Greedy spoiler', goal: 'The second-largest guerrilla group was excluded from FARC negotiations. Used the peace process to expand into territory vacated by demobilizing FARC.', keyAct: 'Continued attacks during FARC negotiations, including the 2017 bombing of a Bogota police academy (22 killed). Began and broke off its own peace talks repeatedly.' },
        { name: 'FARC Dissident Factions', type: 'Total spoiler', goal: 'FARC commanders who rejected the peace deal (Ivan Marquez, Jesus Santrich) re-armed, citing government non-compliance. Approximately 2,500 fighters refused to demobilize.', keyAct: 'Ivan Marquez announced re-armament in August 2019. Dissidents now control significant drug trafficking territory in eastern Colombia and Venezuela border regions.' },
      ],
      strategies: {
        accommodate: { result: 'Worked with Uribe to a degree \u2014 the agreement was renegotiated after the plebiscite defeat, incorporating some opposition concerns (reduced transitional justice concessions). But accommodation emboldened Uribe\'s maximalist demands and weakened the agreement. Did not work with FARC dissidents whose real interest was drug trafficking, not politics.', effectiveness: 'low-medium' },
        marginalize: { result: 'Attempted against FARC dissidents through military operations, with limited success. Dissidents retreated to Venezuela border regions beyond state control. ELN has proven resistant to marginalization due to decentralized structure. Marginalization requires state territorial control that Colombia lacks in key regions.', effectiveness: 'low' },
        socialize: { result: 'The core strategy with FARC-EP. The FARC transformed into a political party (Comunes), won guaranteed congressional seats, and former commanders entered electoral politics. But socialization is incomplete: reintegration programs are underfunded, former combatants face assassination (over 300 killed since 2016), and the party has minimal electoral support. Socialization without security guarantees fails.', effectiveness: 'medium' },
      },
    },
    {
      id: 'ssoudan', name: 'South Sudan (2005-2016)',
      context: 'The 2005 Comprehensive Peace Agreement ended Sudan\'s north-south civil war and led to South Sudan\'s independence in 2011. But peace between the new country\'s factions proved impossible to sustain.',
      spoilers: [
        { name: 'Riek Machar / SPLM-IO', type: 'Greedy spoiler', goal: 'Sought greater power-sharing within the new state. Alternated between political opposition and armed rebellion depending on whether his demands were met. Ethnic Nuer base vs. Dinka-dominated government.', keyAct: 'The December 2013 crisis: Kiir accused Machar of coup attempt; Machar denied it. Presidential guard killed Nuer civilians in Juba, triggering civil war. 400,000 killed, 4 million displaced.' },
        { name: 'Salva Kiir\'s hardliners', type: 'Inside spoiler', goal: 'Elements within Kiir\'s government who benefited from war economy (oil revenue, arms procurement, land seizures). Peace threatened their economic interests.', keyAct: 'Systematic obstruction of the 2015 and 2018 peace agreements through delayed implementation, continued military operations during ceasefires, and refusal to integrate opposition forces into the national army.' },
        { name: 'Ethnic militias (multiple)', type: 'Total spoilers', goal: 'Various community-based militias (Murle, Shilluk, Nuer factions) pursued localized ethnic cleansing and cattle-raiding objectives unrelated to the national peace process.', keyAct: 'The 2013-2016 ethnic massacres in Unity State, Bor, and Malakal involved militias that were nominally aligned with one side but pursued autonomous ethnic agendas.' },
      ],
      strategies: {
        accommodate: { result: 'Repeatedly attempted and repeatedly failed. Machar was made Vice President (2005, 2016), but accommodation of his power demands without institutional reform created a patronage structure dependent on personal relationships rather than rules. When personal trust collapsed, so did the peace. Accommodating greedy spoilers without binding institutions creates fragile peace.', effectiveness: 'very low' },
        marginalize: { result: 'Attempted by Kiir against Machar (removal as VP in 2013, military campaign 2013-2015). Failed because Machar retained ethnic Nuer support and external backing (Sudan). Marginalization of a spoiler with a genuine constituency produces civil war, not peace. This is the key lesson of South Sudan.', effectiveness: 'very low' },
        socialize: { result: 'Never seriously attempted. The international community provided mediation and threatened sanctions but did not invest in the institutional transformation required for socialization. There was no equivalent of Northern Ireland\'s decade-long patient process of building trust through incremental confidence-building measures. South Sudan went from ceasefire directly to power-sharing without the intermediate steps that make socialization possible.', effectiveness: 'not attempted' },
      },
    },
  ], []);

  const renderSpoiler = () => {
    const sc = SPOILER_CASES[spoilerCase];
    const strategies = ['accommodate', 'marginalize', 'socialize'];
    const stratLabels = { accommodate: 'Accommodate', marginalize: 'Marginalize', socialize: 'Socialize' };
    const stratDescs = { accommodate: 'Give the spoiler what they want (partially or fully) to bring them into the process.', marginalize: 'Isolate the spoiler through military, intelligence, or political means to reduce their capacity to disrupt.', socialize: 'Gradually transform the spoiler from armed actor to political actor through sustained engagement and incentives.' };
    const effColors = { high: C.green, medium: C.amber, 'low-medium': C.amber, low: C.red, 'very low': C.red, 'not attempted': C.tx3 };
    return (
      <div>
        <div style={{ fontFamily: PC_MONO, fontSize: 12, letterSpacing: '.06em', color: C.accent + '88', marginBottom: 6 }}>SPOILER MANAGEMENT SIMULATOR</div>
        <div style={{ fontFamily: PC_SERIF, fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 16, maxWidth: 720 }}>
          Based on Stephen Stedman{'\u2019'}s spoiler theory (1997). Every peace process generates actors who benefit from continued conflict. The mediator{'\u2019'}s challenge: identify the spoilers, classify their type, and choose the right management strategy. The wrong choice can collapse the entire process.
        </div>

        {/* Case selector */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {SPOILER_CASES.map((s, i) => (
            <button key={s.id} onClick={() => { setSpoilerCase(i); }} style={{
              flex: 1, padding: '10px 12px', borderRadius: 4, cursor: 'pointer',
              background: i === spoilerCase ? C.accentBg : 'transparent',
              border: i === spoilerCase ? `1px solid ${C.accent}44` : `1px solid ${C.line}`,
              textAlign: 'center', transition: 'all .15s',
            }}>
              <div style={{ fontFamily: PC_MONO, fontSize: 11, fontWeight: 600, color: i === spoilerCase ? C.accent : C.tx3 }}>{s.name}</div>
            </button>
          ))}
        </div>

        {/* Context */}
        <div style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontFamily: PC_MONO, fontSize: 11, letterSpacing: '.06em', color: C.accent + '88', marginBottom: 8 }}>CONTEXT</div>
          <div style={{ fontFamily: PC_SERIF, fontSize: 14, color: C.tx, lineHeight: 1.75 }}>{sc.context}</div>
        </div>

        {/* Spoilers */}
        <div style={{ fontFamily: PC_MONO, fontSize: 11, letterSpacing: '.06em', color: C.accent + '88', marginBottom: 10 }}>IDENTIFIED SPOILERS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {sc.spoilers.map(sp => (
            <div key={sp.name} style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 8, padding: '14px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontFamily: PC_MONO, fontSize: 12, fontWeight: 600, color: C.tx }}>{sp.name}</span>
                <span style={{ fontFamily: PC_MONO, fontSize: 10, color: sp.type.includes('Total') ? C.red : sp.type.includes('Greedy') ? C.amber : C.blue, letterSpacing: '.04em', textTransform: 'uppercase' }}>{sp.type}</span>
              </div>
              <div style={{ fontFamily: PC_SANS, fontSize: 12, color: C.tx2, lineHeight: 1.6, marginBottom: 4 }}>{sp.goal}</div>
              <div style={{ fontFamily: PC_SANS, fontSize: 11, color: C.red, lineHeight: 1.5, fontStyle: 'italic' }}>Key act: {sp.keyAct}</div>
            </div>
          ))}
        </div>

        {/* Strategy selection */}
        <div style={{ fontFamily: PC_MONO, fontSize: 11, letterSpacing: '.06em', color: C.accent + '88', marginBottom: 10 }}>CHOOSE YOUR MANAGEMENT STRATEGY</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {strategies.map(s => {
            const chosen = spoilerChoices[sc.id] === s;
            return (
              <button key={s} onClick={() => { setSpoilerChoices(prev => ({ ...prev, [sc.id]: s })); setSpoilerRevealed(prev => ({ ...prev, [sc.id]: true })); }} style={{
                flex: 1, padding: '14px 16px', borderRadius: 6, cursor: 'pointer',
                background: chosen ? C.accentBg : C.card,
                border: chosen ? `1px solid ${C.accent}66` : `1px solid ${C.cardBd}`,
                textAlign: 'left', transition: 'all .15s',
              }}>
                <div style={{ fontFamily: PC_MONO, fontSize: 12, fontWeight: 600, color: chosen ? C.accent : C.tx2, marginBottom: 4 }}>{stratLabels[s]}</div>
                <div style={{ fontFamily: PC_SANS, fontSize: 11, color: C.tx3, lineHeight: 1.5 }}>{stratDescs[s]}</div>
              </button>
            );
          })}
        </div>

        {/* Results */}
        {spoilerRevealed[sc.id] && (
          <div style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 10, padding: '20px 24px' }}>
            <div style={{ fontFamily: PC_MONO, fontSize: 11, letterSpacing: '.06em', color: C.accent + '88', marginBottom: 12 }}>HISTORICAL OUTCOMES BY STRATEGY</div>
            {strategies.map(s => {
              const outcome = sc.strategies[s];
              const isChosen = spoilerChoices[sc.id] === s;
              return (
                <div key={s} style={{ marginBottom: 12, padding: '12px 16px', background: isChosen ? 'rgba(75,146,219,.06)' : 'transparent', borderRadius: 6, border: isChosen ? `1px solid ${C.accent}33` : '1px solid transparent' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontFamily: PC_MONO, fontSize: 11, fontWeight: 600, color: C.tx2, letterSpacing: '.04em' }}>{stratLabels[s]} {isChosen ? '(YOUR CHOICE)' : ''}</span>
                    <span style={{ fontFamily: PC_MONO, fontSize: 10, color: effColors[outcome.effectiveness] || C.tx3, letterSpacing: '.04em' }}>EFFECTIVENESS: {outcome.effectiveness.toUpperCase()}</span>
                  </div>
                  <div style={{ fontFamily: PC_SANS, fontSize: 12, color: C.tx2, lineHeight: 1.7 }}>{outcome.result}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // -- Transitional Justice Comparator --------------------------------
  const TJ_APPROACHES = useMemo(() => [
    { id: 'nuremberg', name: 'Nuremberg (Prosecution)', country: 'Germany', period: '1945-1949', mechanism: 'International Military Tribunal: criminal prosecution of major perpetrators by victorious Allied powers. Established individual criminal responsibility for crimes against peace, war crimes, and crimes against humanity.', accountability: { rating: 'High (for top leaders)', color: C.green, detail: '24 defendants tried, 12 sentenced to death, 7 imprisoned. Subsequent Nuremberg trials prosecuted 185 additional defendants (doctors, judges, industrialists). But: vast majority of Nazi perpetrators were never prosecuted. Denazification programs reached further but were inconsistently applied and largely abandoned by 1951.' }, reconciliation: { rating: 'Low', color: C.red, detail: 'Nuremberg was perceived by many Germans as "victors\' justice" rather than genuine accountability. The trials did not produce national soul-searching; that came decades later (the 1960s Auschwitz trials, the 1968 student movement). The prosecutorial model identifies individual guilt but does not address collective responsibility or social reconciliation.' }, stability: { rating: 'High (with caveats)', color: C.green, detail: 'Germany became a stable democracy, but this was driven by Allied occupation, Marshall Plan economics, and Cold War geopolitics rather than by the trials themselves. The stability argument for Nuremberg is that it delegitimized the Nazi regime legally and symbolically, preventing rehabilitation of Nazi ideology. Counter-argument: many former Nazis were quietly reintegrated into West German institutions.' }, precedent: { rating: 'Foundational', color: C.green, detail: 'Established: (1) individual criminal responsibility under international law; (2) crimes against humanity as a legal category; (3) "following orders" is not a defense; (4) heads of state can be prosecuted. The Nuremberg principles became the foundation of the ICC Rome Statute (1998). Every subsequent international tribunal traces its legitimacy to Nuremberg.' } },
    { id: 'trc', name: 'South Africa (Truth & Reconciliation)', country: 'South Africa', period: '1996-2003', mechanism: 'Truth and Reconciliation Commission (TRC): public hearings where perpetrators of apartheid-era human rights violations could receive amnesty in exchange for full and truthful disclosure. Victims testified publicly about their suffering.', accountability: { rating: 'Low-Medium', color: C.amber, detail: '7,112 amnesty applications received; 1,500 granted. Those denied amnesty could theoretically face prosecution, but almost none were. The ANC negotiated the TRC framework because prosecution of apartheid security forces would have triggered a military coup. Accountability was deliberately sacrificed for peaceful transition. Archbishop Tutu argued that "restorative justice" (repairing relationships) was more appropriate than retributive justice for South Africa\'s circumstances.' }, reconciliation: { rating: 'Medium-High', color: C.green, detail: 'The TRC\'s greatest achievement was creating a shared, undeniable factual record of apartheid\'s violence. Public hearings broadcast nationally forced white South Africans to confront testimonies they could no longer deny. But: many victims felt betrayed by amnesty for their torturers. Reparations were inadequate (R30,000 one-time payment). Reconciliation at the political level did not translate to economic justice.' }, stability: { rating: 'High', color: C.green, detail: 'South Africa avoided the civil war that many predicted. The TRC contributed to this by providing a mechanism for dealing with the past that satisfied enough actors on all sides. The transition from apartheid to democracy was remarkably peaceful, though the TRC was one factor among many (Mandela\'s leadership, negotiated constitutional settlement, economic continuity).' }, precedent: { rating: 'Influential', color: C.green, detail: 'The TRC model was adopted (with variations) in Sierra Leone, Liberia, East Timor, Canada (residential schools), and 40+ other countries. Established truth-telling as a complement or alternative to prosecution. Demonstrated that amnesty-for-truth can work in specific circumstances. Critics argue the model has been applied too uncritically in contexts where conditions differ from South Africa\'s.' } },
    { id: 'gacaca', name: 'Rwanda (Gacaca / Hybrid)', country: 'Rwanda', period: '2001-2012', mechanism: 'Gacaca courts: community-based justice system adapted from traditional Rwandan dispute resolution. 12,000 courts processed approximately 1.9 million cases related to the 1994 genocide. Complemented by the International Criminal Tribunal for Rwanda (ICTR) in Arusha for senior perpetrators.', accountability: { rating: 'High (breadth)', color: C.green, detail: '1.9 million cases processed by gacaca courts \u2014 the most extensive transitional justice program in history. But quality of justice was uneven: community judges had limited training, procedural protections were minimal, and false accusations were used to settle personal scores. The ICTR convicted 61 individuals including former PM Kambanda. RPF crimes (Kagame\'s forces killed tens of thousands of Hutu civilians) were explicitly excluded from gacaca jurisdiction.' }, reconciliation: { rating: 'Contested', color: C.amber, detail: 'The Rwandan government claims gacaca promoted reconciliation through community-level truth-telling and reintegration of perpetrators. Independent research is more skeptical: mandatory participation, government control of the narrative, and prohibition of ethnic identification ("we are all Rwandans") may suppress rather than resolve intergroup tensions. Reconciliation under authoritarianism is difficult to assess because dissent is punished.' }, stability: { rating: 'High (authoritarian)', color: C.amber, detail: 'Rwanda under Kagame is remarkably stable and economically growing. But stability is maintained through authoritarian control: opposition is suppressed, media is controlled, ethnic discussion is criminalized. The question is whether this is sustainable stability (genuine reconciliation) or suppressed instability (ethnic tensions controlled but unresolved). The 2024 election gave Kagame 99.2% of the vote \u2014 a number that raises obvious questions.' }, precedent: { rating: 'Unique', color: C.amber, detail: 'Gacaca has not been replicated elsewhere because it was uniquely adapted to Rwandan conditions: a pre-existing traditional justice system, government willingness to mobilize the entire population, and the specific characteristics of genocide (mass participation requiring mass justice). Its lessons are context-dependent rather than universally applicable.' } },
    { id: 'jep', name: 'Colombia (Special Jurisdiction)', country: 'Colombia', period: '2017-present', mechanism: 'Special Jurisdiction for Peace (JEP): judicial body created by the 2016 peace agreement to investigate and judge conflict-related crimes. Combines elements of prosecution, truth-telling, and restorative justice. Those who confess fully receive reduced sentences of "effective restrictions on liberty" (5-8 years) rather than prison.', accountability: { rating: 'Medium (evolving)', color: C.amber, detail: 'JEP has opened macro-cases covering kidnapping, false positives (military extrajudicial killings), sexual violence, and recruitment of children. Former FARC commanders have testified publicly about crimes, a first in Latin American peace processes. But: the system is slow (no final sentences yet as of 2024), underfunded, and politically contested. Uribe\'s supporters argue it provides impunity; victims\' groups argue it provides insufficient reparation.' }, reconciliation: { rating: 'Low-Medium', color: C.amber, detail: 'The JEP\'s public hearings have produced extraordinary moments of acknowledgment and apology by former combatants. But Colombia remains deeply polarized about the peace agreement itself. Reconciliation in a country where 9 million people were victimized by the conflict (internal displacement, 260,000 killed, 80,000 disappeared) requires economic transformation that the peace agreement has not yet delivered.' }, stability: { rating: 'Fragile', color: C.amber, detail: 'The peace agreement survived a change of government (Duque, 2018-2022, was skeptical but did not dismantle it; Petro, 2022-present, supports it). But: 300+ former combatants assassinated, FARC dissidents control drug trafficking territory, ELN negotiations have stalled, and coca cultivation increased after the agreement. The peace is holding but not consolidating.' }, precedent: { rating: 'Innovative', color: C.green, detail: 'The JEP is the most sophisticated transitional justice mechanism ever designed, combining criminal investigation, truth-telling, victim participation, and calibrated sanctions within a single institution. If it works, it demonstrates that accountability and peace are not necessarily incompatible \u2014 the central question of transitional justice. Its success or failure will shape how future peace agreements handle this tension.' } },
  ], []);

  const TJ_OUTCOMES = ['accountability', 'reconciliation', 'stability', 'precedent'];

  const renderJustice = () => {
    return (
      <div>
        <div style={{ fontFamily: PC_MONO, fontSize: 12, letterSpacing: '.06em', color: C.accent + '88', marginBottom: 6 }}>TRANSITIONAL JUSTICE COMPARATOR</div>
        <div style={{ fontFamily: PC_SERIF, fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 16, maxWidth: 720 }}>
          Four approaches to the same impossible question: after mass atrocity, how does a society achieve accountability for perpetrators, healing for victims, and stability for the future {'\u2014'} when these three goals frequently conflict? Click any cell for the evidence.
        </div>

        {/* Matrix */}
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '130px repeat(4, 1fr)', gap: 2, minWidth: 700 }}>
            {/* Header */}
            <div style={{ padding: 8, background: 'rgba(232,238,244,.6)' }} />
            {TJ_APPROACHES.map(a => (
              <div key={a.id} style={{ padding: '10px 8px', background: C.accentBg, borderRadius: 2, textAlign: 'center' }}>
                <div style={{ fontFamily: PC_MONO, fontSize: 11, fontWeight: 600, color: C.accent, letterSpacing: '.04em' }}>{a.name}</div>
                <div style={{ fontFamily: PC_SANS, fontSize: 9, color: C.tx3, marginTop: 2 }}>{a.country} | {a.period}</div>
              </div>
            ))}

            {/* Rows */}
            {TJ_OUTCOMES.map(outcome => (
              <React.Fragment key={outcome}>
                <div style={{ padding: '10px 8px', background: 'rgba(232,238,244,.6)', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: PC_MONO, fontSize: 10, fontWeight: 600, color: C.tx2, letterSpacing: '.04em', textTransform: 'uppercase' }}>{outcome}</span>
                </div>
                {TJ_APPROACHES.map(a => {
                  const cell = a[outcome];
                  const cellKey = a.id + '-' + outcome;
                  const isOpen = justiceExpanded === cellKey;
                  return (
                    <div key={cellKey}>
                      <button onClick={() => setJusticeExpanded(isOpen ? null : cellKey)} style={{
                        width: '100%', padding: '10px 8px', cursor: 'pointer', textAlign: 'center',
                        background: isOpen ? 'rgba(75,146,219,.10)' : 'rgba(232,238,244,.4)',
                        border: isOpen ? `1px solid ${C.accent}44` : `1px solid rgba(75,146,219,.06)`,
                        borderRadius: 2, transition: 'all .15s',
                      }}>
                        <span style={{ fontFamily: PC_MONO, fontSize: 10, fontWeight: 600, color: cell.color, letterSpacing: '.04em' }}>{cell.rating}</span>
                      </button>
                      {isOpen && (
                        <div style={{ padding: '8px 10px', background: 'rgba(75,146,219,.04)', border: `1px solid ${C.line}`, borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
                          <div style={{ fontFamily: PC_SANS, fontSize: 11, color: C.tx2, lineHeight: 1.65 }}>{cell.detail}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mechanism descriptions */}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TJ_APPROACHES.map(a => (
            <div key={a.id} style={{ padding: '10px 14px', background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 6 }}>
              <div style={{ fontFamily: PC_MONO, fontSize: 11, fontWeight: 600, color: C.accent, letterSpacing: '.04em', marginBottom: 4 }}>{a.name} {'\u2014'} MECHANISM</div>
              <div style={{ fontFamily: PC_SANS, fontSize: 12, color: C.tx2, lineHeight: 1.6 }}>{a.mechanism}</div>
            </div>
          ))}
        </div>

        {/* Synthesis */}
        <div style={{ marginTop: 16, padding: '14px 18px', background: C.accentBg, borderRadius: 6, border: `1px solid ${C.line}` }}>
          <div style={{ fontFamily: PC_MONO, fontSize: 11, letterSpacing: '.06em', color: C.accent + '88', marginBottom: 6 }}>THE TRANSITIONAL JUSTICE DILEMMA</div>
          <div style={{ fontFamily: PC_SERIF, fontSize: 13, color: C.tx, lineHeight: 1.75 }}>
            No society has achieved perfect accountability, full reconciliation, and lasting stability simultaneously. Nuremberg prioritized accountability at the expense of reconciliation. South Africa prioritized reconciliation at the expense of accountability. Rwanda achieved stability through authoritarian control. Colombia is attempting the most ambitious synthesis but remains fragile. The honest conclusion: transitional justice is not a solvable problem but a managed tension, and the "right" approach depends on the specific balance of power, the scale of atrocity, and the political constraints at the moment of transition.
          </div>
        </div>
      </div>
    );
  };

  // -- Render: Sequence (SVG Pipeline) -----------------------------------
  const renderSequence = () => {
    const hoveredPhase = seqHover !== null ? PEACE_PHASES_SVG.find(p => p.id === seqHover) : null;
    const caseColors = { pass: C.green, partial: C.amber, fail: C.red };
    const caseLabels = { ni: 'N. Ireland', rwanda: 'Rwanda', colombia: 'Colombia' };
    const boxW = 100;
    const boxH = 50;
    return (
      <div>
        <div style={{ fontFamily: PC_MONO, fontSize: 12, letterSpacing: '.06em', color: `${C.accent}88`, marginBottom: 12 }}>
          PEACEBUILDING PIPELINE &mdash; 5-PHASE SEQUENCE
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 8, padding: 24, marginBottom: 16 }}>
          <svg viewBox="0 0 750 350" style={{ width: '100%', display: 'block' }}>
            {/* Connection arrows */}
            {PEACE_PHASES_SVG.slice(0, -1).map((ph, i) => {
              const next = PEACE_PHASES_SVG[i + 1];
              return (
                <line key={ph.id + '-arrow'} x1={ph.x + boxW} y1={60} x2={next.x} y2={60}
                  stroke={C.accent} strokeWidth="2" markerEnd="url(#seqArrow)" opacity="0.4" />
              );
            })}
            <defs>
              <marker id="seqArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill={C.accent} />
              </marker>
            </defs>

            {/* Phase boxes */}
            {PEACE_PHASES_SVG.map(ph => {
              const isHov = seqHover === ph.id;
              return (
                <g key={ph.id}
                  onMouseEnter={() => setSeqHover(ph.id)}
                  onMouseLeave={() => setSeqHover(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect x={ph.x} y={35} width={boxW} height={boxH} rx="6"
                    fill={isHov ? `${C.accent}22` : C.card}
                    stroke={isHov ? C.accent : `${C.accent}44`}
                    strokeWidth={isHov ? 2 : 1}
                    style={{ transition: 'all .15s' }} />
                  <text x={ph.x + boxW / 2} y={55} fill={isHov ? C.accent : C.tx}
                    fontSize="10" fontFamily={PC_MONO} textAnchor="middle" fontWeight="600">
                    {ph.label.split(' / ')[0]}
                  </text>
                  {ph.label.includes('/') && (
                    <text x={ph.x + boxW / 2} y={68} fill={C.tx3}
                      fontSize="8" fontFamily={PC_MONO} textAnchor="middle">
                      {ph.label.split(' / ')[1]}
                    </text>
                  )}

                  {/* Case indicators below each phase */}
                  {Object.entries(ph.cases).map(([caseKey, status], ci) => (
                    <g key={caseKey}>
                      <circle cx={ph.x + 25 + ci * 28} cy={110 + ci * 0} r="8"
                        fill={caseColors[status] + '33'} stroke={caseColors[status]}
                        strokeWidth="1.5" />
                      <text x={ph.x + 25 + ci * 28} y={113 + ci * 0} fill={caseColors[status]}
                        fontSize="7" fontFamily={PC_MONO} textAnchor="middle" fontWeight="700">
                        {status === 'pass' ? '\✓' : status === 'fail' ? '\✗' : '\u25CB'}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })}

            {/* Case legend at bottom */}
            {Object.entries(caseLabels).map(([key, label], i) => (
              <g key={key}>
                <circle cx={250 + i * 100} cy={160} r="6" fill={Object.values(caseColors)[0] + '33'}
                  stroke={C.tx3} strokeWidth="1" />
                <text x={260 + i * 100} y={163} fill={C.tx2} fontSize="9" fontFamily={PC_MONO}>
                  {label}
                </text>
              </g>
            ))}
            {/* Status legend */}
            <g>
              <circle cx={250} cy={185} r="5" fill={C.green + '33'} stroke={C.green} strokeWidth="1" />
              <text x={258} y={188} fill={C.tx3} fontSize="8" fontFamily={PC_MONO}>Pass</text>
              <circle cx={310} cy={185} r="5" fill={C.amber + '33'} stroke={C.amber} strokeWidth="1" />
              <text x={318} y={188} fill={C.tx3} fontSize="8" fontFamily={PC_MONO}>Partial</text>
              <circle cx={380} cy={185} r="5" fill={C.red + '33'} stroke={C.red} strokeWidth="1" />
              <text x={388} y={188} fill={C.tx3} fontSize="8" fontFamily={PC_MONO}>Fail</text>
            </g>
          </svg>
        </div>

        {/* Hover detail */}
        {hoveredPhase ? (
          <div style={{
            background: C.card, border: `1px solid ${C.cardBd}`,
            borderRadius: 8, padding: 20,
          }}>
            <div style={{ fontFamily: PC_SERIF, fontSize: 18, fontWeight: 600, color: C.accent, marginBottom: 10 }}>
              {hoveredPhase.label}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {Object.entries(hoveredPhase.cases).map(([caseKey, status]) => (
                <div key={caseKey} style={{
                  padding: '8px 14px', borderRadius: 6,
                  background: caseColors[status] + '15',
                  border: `1px solid ${caseColors[status]}44`,
                }}>
                  <div style={{ fontFamily: PC_MONO, fontSize: 12, fontWeight: 700, color: caseColors[status] }}>
                    {caseLabels[caseKey]}
                  </div>
                  <div style={{ fontFamily: PC_MONO, fontSize: 11, color: C.tx3, marginTop: 2 }}>
                    {status.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: PC_SANS, fontSize: 12, color: C.tx3, textAlign: 'center', fontStyle: 'italic' }}>
            Hover a phase to see how three real peace processes performed at each stage.
          </div>
        )}
      </div>
    );
  };

  // -- Render: Simulator -----------------------------------------------
  const renderSimulator = () => (
    <div>
      <div style={{ padding: '14px 18px', background: C.accentBg, border: `1px solid ${C.accent}20`, borderRadius: 6, marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontFamily: PC_SERIF, color: C.tx, lineHeight: 1.6, margin: 0 }}>
          You are managing a peace process between two warring factions. Sequence the five phases in the order you believe will produce the most durable peace. Click phases to add them to your sequence, then submit to see how your sequencing would play out in practice.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
        <SpoilerIcon /><Tip id="spoiler_problem" />
      </div>

      {/* Available phases — negotiation table items */}
      <div style={{ fontFamily: PC_MONO, fontSize: 10, color: C.gold + '80', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <LaurelWreath size={18} style={{ opacity: 0.15, display: 'inline-block' }} />
        Available Phases &mdash; Click to Add
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
        {PHASES.map(phase => {
          const inSeq = simSequence.includes(phase.id);
          const seqNum = simSequence.indexOf(phase.id) + 1;
          return (
            <button
              key={phase.id}
              onClick={() => addToSequence(phase.id)}
              disabled={simSubmitted}
              style={{
                padding: '12px 14px', textAlign: 'left',
                background: inSeq ? `${phase.color}12` : 'rgba(238,242,246,.94)',
                border: `1px solid ${inSeq ? phase.color + '40' : C.cardBd}`,
                borderLeft: `3px solid ${inSeq ? phase.color : C.accent + '30'}`,
                borderRadius: '0 4px 4px 0', cursor: simSubmitted ? 'default' : 'pointer',
                opacity: simSubmitted ? 0.7 : 1,
                transition: 'all .15s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{phase.icon}</span>
                  <span style={{ fontFamily: PC_SERIF, fontSize: 13, color: inSeq ? C.tx : C.tx2, fontWeight: 600 }}>{phase.name}</span>
                </div>
                {inSeq && (
                  <span style={{ fontFamily: PC_MONO, fontSize: 11, fontWeight: 700, color: phase.color, background: `${phase.color}20`, padding: '2px 8px', borderRadius: 3 }}>
                    #{seqNum}
                  </span>
                )}
              </div>
              <p style={{ fontSize: 11, color: C.tx3, margin: 0, lineHeight: 1.6 }}>{phase.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Sequence display */}
      <div style={{ fontFamily: PC_MONO, fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
        Your Sequence ({simSequence.length}/5)
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, minHeight: 44, alignItems: 'center', flexWrap: 'wrap' }}>
        {simSequence.length === 0 ? (
          <span style={{ fontFamily: PC_MONO, fontSize: 11, color: C.tx3, fontStyle: 'italic' }}>Click phases above to build your sequence...</span>
        ) : (
          simSequence.map((phaseId, i) => {
            const phase = PHASES.find(p => p.id === phaseId);
            return (
              <div key={phaseId} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{
                  padding: '6px 12px', borderRadius: 4,
                  background: `${phase.color}15`, border: `1px solid ${phase.color}30`,
                  fontFamily: PC_MONO, fontSize: 12, color: phase.color, fontWeight: 600,
                }}>
                  {i + 1}. {phase.name}
                </span>
                {i < simSequence.length - 1 && (
                  <span style={{ color: C.tx3, fontSize: 14 }}>&rarr;</span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Submit / Reset */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {!simSubmitted ? (
          <button
            onClick={submitSequence}
            disabled={simSequence.length !== 5}
            style={{
              padding: '10px 24px', borderRadius: 4,
              background: simSequence.length === 5 ? C.accent : C.tx3,
              border: 'none', color: '#fff',
              fontFamily: PC_MONO, fontSize: 11, fontWeight: 600,
              cursor: simSequence.length === 5 ? 'pointer' : 'default',
              opacity: simSequence.length === 5 ? 1 : 0.5,
            }}
          >
            SUBMIT SEQUENCE
          </button>
        ) : (
          <button
            onClick={resetSim}
            style={{
              padding: '10px 24px', borderRadius: 4,
              background: C.blue, border: 'none', color: '#fff',
              fontFamily: PC_MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer',
            }}
          >
            TRY AGAIN
          </button>
        )}
      </div>

      {/* Results */}
      {simSubmitted && simResult && (
        <div>
          {/* Score */}
          <div style={{ padding: 16, background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 6, marginBottom: 16, textAlign: 'center' }}>
            <div style={{ fontFamily: PC_MONO, fontSize: 11, color: C.tx3, marginBottom: 4 }}>SEQUENCING SCORE</div>
            <span style={{ fontFamily: PC_MONO, fontSize: 36, fontWeight: 700, color: simResult.score >= 80 ? C.green : simResult.score >= 50 ? C.amber : C.red }}>
              {simResult.score}
            </span>
            <span style={{ fontFamily: PC_MONO, fontSize: 14, color: C.tx3 }}>/100</span>
            <p style={{ fontSize: 12, color: C.tx2, marginTop: 8, maxWidth: '55ch', margin: '8px auto 0' }}>
              {simResult.score === 100 ? 'Perfect sequencing. You have correctly identified the optimal order for a durable peace process.' :
               simResult.score >= 80 ? 'Strong sequencing with minor timing concerns. The core logic is sound.' :
               simResult.score >= 50 ? 'Some sequencing errors that would create real risks in practice. Review the feedback below.' :
               'Significant sequencing problems that would likely lead to process collapse. The order matters.'}
            </p>
          </div>

          {/* Per-phase feedback */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {simResult.feedback.map((fb, i) => (
              <div key={i} style={{
                padding: '10px 14px', borderRadius: 6,
                background: fb.status === 'correct' ? C.greenBg : fb.status === 'warning' ? C.amberBg : C.redBg,
                border: `1px solid ${fb.status === 'correct' ? C.green + '20' : fb.status === 'warning' ? C.amber + '20' : C.red + '20'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: PC_MONO, fontSize: 12, fontWeight: 700, color: fb.status === 'correct' ? C.green : fb.status === 'warning' ? C.amber : C.red }}>
                    {fb.status === 'correct' ? '\✓' : fb.status === 'warning' ? '\⚠' : '\✗'} {fb.phase}
                  </span>
                </div>
                <p style={{ fontSize: 12, fontFamily: PC_SERIF, color: C.tx2, lineHeight: 1.65, margin: 0 }}>{fb.msg}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phase deep-dives (always visible below simulator) */}
      <div style={{ marginTop: 30, fontFamily: PC_MONO, fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10, borderBottom: `1px solid ${C.line}`, paddingBottom: 4 }}>
        Phase Reference
      </div>
      {PHASES.map(phase => {
        const key = `ref_${phase.id}`;
        const open = expandedSections[key];
        return (
          <div key={phase.id} style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 6, marginBottom: 8, overflow: 'hidden' }}>
            <button
              onClick={() => toggleSection(key)}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>{phase.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: PC_MONO, fontSize: 11, color: phase.color, letterSpacing: 1, textTransform: 'uppercase' }}>Phase {phase.num}</div>
                  <span style={{ fontFamily: PC_SERIF, fontSize: 13, color: C.tx, fontWeight: 600 }}>{phase.name}: {phase.subtitle}</span>
                </div>
              </div>
              <span style={{ fontSize: 12, color: C.tx3 }}>{open ? '\▲' : '\▼'}</span>
            </button>
            {open && (
              <div style={{ padding: '0 14px 14px' }}>
                <p style={{ fontSize: 13, fontFamily: PC_SERIF, color: C.tx, lineHeight: 1.7 }}>{phase.overview}</p>
                {/* Interventions */}
                {phase.interventions.map((intv, j) => (
                  <div key={j} style={{ padding: '8px 12px', background: `${phase.color}06`, border: `1px solid ${phase.color}15`, borderRadius: 4, marginBottom: 6 }}>
                    <div style={{ fontFamily: PC_MONO, fontSize: 12, color: phase.color, fontWeight: 600, marginBottom: 4 }}>{intv.name}</div>
                    <p style={{ fontSize: 12, fontFamily: PC_SERIF, color: C.tx2, lineHeight: 1.6, margin: '0 0 4px' }}>{intv.desc}</p>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, color: C.tx3 }}><strong style={{ color: C.green }}>Timing:</strong> {intv.timing}</span>
                      <span style={{ fontSize: 12, color: C.tx3 }}><strong style={{ color: C.red }}>Risk:</strong> {intv.risk}</span>
                    </div>
                  </div>
                ))}
                {/* Key principle */}
                <div style={{ padding: '10px 12px', background: C.accentBg, border: `1px solid ${C.accent}20`, borderRadius: 4, marginTop: 8 }}>
                  <div style={{ fontFamily: PC_MONO, fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Key Principle</div>
                  <p style={{ fontSize: 12, fontFamily: PC_SERIF, color: C.tx, lineHeight: 1.6, margin: 0 }}>{phase.keyPrinciple}</p>
                </div>
                {/* Failure case */}
                <div style={{ padding: '10px 12px', background: C.redBg, border: `1px solid ${C.red}20`, borderRadius: 4, marginTop: 8 }}>
                  <div style={{ fontFamily: PC_MONO, fontSize: 11, color: C.red, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Historical Failure</div>
                  <p style={{ fontSize: 12, fontFamily: PC_SERIF, color: C.tx2, lineHeight: 1.6, margin: 0 }}>{phase.failure}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // -- Render: Case Studies -----------------------------------------------
  const renderCases = () => {
    const cs = CASE_STUDIES[activeCase];
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <DDRIcon /><Tip id="ddr" />
        </div>
        {/* Case selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {CASE_STUDIES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { setActiveCase(i); setCasePhase('prenegotiation'); }}
              style={{
                padding: '8px 16px', borderRadius: 4,
                background: i === activeCase ? `${c.color}15` : 'transparent',
                border: `1px solid ${i === activeCase ? c.color + '40' : C.line}`,
                color: i === activeCase ? c.color : C.tx2,
                fontFamily: PC_MONO, fontSize: 11, cursor: 'pointer',
                transition: 'all .15s', fontWeight: i === activeCase ? 600 : 400,
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Case header — diplomatic communique style */}
        <div style={{ marginBottom: 20, background: 'rgba(238,242,246,.94)', border: '1px solid ' + C.cardBd, borderTop: '3px solid ' + cs.color + '60', borderRadius: '0 0 6px 6px', padding: '18px 18px 16px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 10, right: 14 }}>
            <LaurelWreath size={32} style={{ opacity: 0.06 }} />
          </div>
          <div style={{ fontFamily: PC_MONO, fontSize: 9, color: C.gold + '50', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 6 }}>COMMUNIQUE // CASE ANALYSIS</div>
          <h2 style={{ fontFamily: PC_SERIF, fontSize: 22, color: cs.color, margin: '0 0 4px', fontWeight: 600 }}>{cs.name}</h2>
          <div style={{ fontFamily: PC_MONO, fontSize: 12, color: C.tx3, marginBottom: 8 }}>{cs.period} &middot; {cs.agreement}</div>
          <p style={{ fontSize: 13, fontFamily: PC_SERIF, color: C.tx, lineHeight: 1.7 }}>{cs.summary}</p>
        </div>

        {/* Phase selector */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
          {PHASES.map(phase => (
            <button
              key={phase.id}
              onClick={() => setCasePhase(phase.id)}
              style={{
                padding: '6px 12px', borderRadius: 4,
                background: casePhase === phase.id ? `${phase.color}15` : 'transparent',
                border: `1px solid ${casePhase === phase.id ? phase.color + '30' : C.line}`,
                color: casePhase === phase.id ? phase.color : C.tx3,
                fontFamily: PC_MONO, fontSize: 12, cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {phase.icon} {phase.name}
            </button>
          ))}
        </div>

        {/* Phase detail */}
        <div style={{ padding: '14px 18px', background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 6, marginBottom: 20 }}>
          <div style={{ fontFamily: PC_MONO, fontSize: 11, color: PHASES.find(p => p.id === casePhase).color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
            {cs.name} &mdash; {PHASES.find(p => p.id === casePhase).name}
          </div>
          <p style={{ fontSize: 13, fontFamily: PC_SERIF, color: C.tx, lineHeight: 1.7, margin: 0 }}>
            {cs.phases[casePhase]}
          </p>
        </div>

        {/* Lessons learned */}
        <div style={{ padding: '14px 18px', background: C.accentBg, border: `1px solid ${C.accent}20`, borderRadius: 6 }}>
          <div style={{ fontFamily: PC_MONO, fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
            Lessons Learned
          </div>
          <p style={{ fontSize: 13, fontFamily: PC_SERIF, color: C.tx, lineHeight: 1.7, margin: 0 }}>{cs.lessons}</p>
        </div>

        {/* Cross-case comparison prompt */}
        <div style={{ marginTop: 20, padding: '12px 16px', background: C.card, border: `1px solid ${C.line}`, borderRadius: 6 }}>
          <div style={{ fontFamily: PC_MONO, fontSize: 11, color: C.tx3, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>
            Comparative Analysis
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {CASE_STUDIES.map(c => (
              <div key={c.id} style={{ padding: '8px 10px', background: `${c.color}06`, border: `1px solid ${c.color}15`, borderRadius: 4 }}>
                <div style={{ fontFamily: PC_MONO, fontSize: 11, color: c.color, fontWeight: 600, marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: C.tx3 }}>{c.period}</div>
                <div style={{ fontSize: 12, color: C.tx2, marginTop: 4 }}>
                  {c.id === 'nireland' ? 'Creative ambiguity; patience' :
                   c.id === 'rwanda' ? 'Spoiler catastrophe; justice innovation' :
                   'Victim-centered; referendum risk'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // -- Render: Toolkit -----------------------------------------------
  const renderToolkit = () => (
    <div>
      <div style={{ padding: '14px 18px', background: C.accentBg, border: `1px solid ${C.accent}20`, borderRadius: 6, marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontFamily: PC_SERIF, color: C.tx, lineHeight: 1.6, margin: 0 }}>
          The peacebuilder's toolkit: analytical frameworks and practical tools for designing, implementing, and evaluating peace processes. Each tool is grounded in both theory and field experience from actual peace operations.
        </p>
      </div>

      {/* Category selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {TOOLKIT.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveTool(i)}
            style={{
              padding: '6px 14px', borderRadius: 4,
              background: i === activeTool ? `${cat.color}15` : 'transparent',
              border: `1px solid ${i === activeTool ? cat.color + '40' : C.line}`,
              color: i === activeTool ? cat.color : C.tx2,
              fontFamily: PC_MONO, fontSize: 12, cursor: 'pointer',
              transition: 'all .15s', fontWeight: i === activeTool ? 600 : 400,
            }}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Tools in selected category */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {TOOLKIT[activeTool].tools.map((tool, i) => {
          const key = `tool_${activeTool}_${i}`;
          const open = expandedSections[key];
          return (
            <div key={key} style={{ background: 'rgba(238,242,246,.94)', border: `1px solid ${C.cardBd}`, borderLeft: `3px solid ${TOOLKIT[activeTool].color}30`, borderRadius: '0 4px 4px 0', overflow: 'hidden' }}>
              <button
                onClick={() => toggleSection(key)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LaurelWreath size={16} style={{ opacity: 0.12, flexShrink: 0 }} />
                  <span style={{ fontFamily: PC_SERIF, fontSize: 14, color: C.tx, fontWeight: 600 }}>{tool.name}</span>
                </div>
                <span style={{ fontSize: 12, color: C.tx3 }}>{open ? '\u25B2' : '\u25BC'}</span>
              </button>
              {open && (
                <div style={{ padding: '0 14px 12px 38px' }}>
                  <p style={{ fontSize: 13, fontFamily: PC_SERIF, color: C.tx2, lineHeight: 1.7, margin: '0 0 8px' }}>{tool.desc}</p>
                  <span style={{ fontFamily: PC_MONO, fontSize: 11, color: TOOLKIT[activeTool].color, fontStyle: 'italic', borderTop: '1px solid ' + C.line, paddingTop: 6, display: 'block' }}>{tool.source}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interconnections */}
      <div style={{ marginTop: 24, padding: 16, background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 6 }}>
        <div style={{ fontFamily: PC_MONO, fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
          Framework Interconnections
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { pair: 'Ripeness + Track II', note: 'Track II dialogue can help create ripeness by revealing that the adversary is also suffering. But Track II cannot manufacture ripeness where structural conditions do not support it.' },
            { pair: 'Spoiler Mgmt + DDR', note: 'DDR is the moment when spoilers are most dangerous: they are being asked to surrender their weapons and power. Effective spoiler management must be designed into DDR programs, not bolted on afterward.' },
            { pair: 'Liberal Peace + SSR', note: 'Paris\'s warning about premature liberalization applies directly to security sector reform: building professional, accountable security forces requires institutional capacity that may not exist in post-conflict states.' },
            { pair: 'Complementarity + Truth Commissions', note: 'Truth commissions and criminal prosecution are not alternatives but complements. Commissions establish the historical record; prosecutions assign individual responsibility. The ICC\'s complementarity principle creates space for domestic justice innovations.' },
          ].map(item => (
            <div key={item.pair} style={{ padding: '10px 12px', background: `${C.accent}06`, border: `1px solid ${C.line}`, borderRadius: 4 }}>
              <div style={{ fontFamily: PC_MONO, fontSize: 12, color: C.accent, marginBottom: 4, fontWeight: 600 }}>{item.pair}</div>
              <p style={{ fontSize: 11, fontFamily: PC_SERIF, color: C.tx2, lineHeight: 1.65, margin: 0 }}>{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // -- Mediation Technique Selector ──────────────────────────────────
  const renderMediation = () => {
    const MED_SCENARIOS = [
      { id: 'territorial', name: 'Territorial Dispute', context: 'Two neighboring states claim the same border region. Both have historical and ethnic ties to the area. Sporadic border clashes have killed 200+ people. An international border commission exists but lacks enforcement power. Neither side can achieve military victory.', bgColor: C.blue,
        approaches: {
          facilitative: { fit: 'medium', reason: 'Facilitative mediation helps when parties can talk but need process management. Here, the power asymmetry and sovereignty stakes make pure facilitation insufficient -- the mediator needs to propose solutions, not just manage dialogue.' },
          evaluative: { fit: 'high', reason: 'Evaluative mediation fits well. The mediator can reference international law (uti possidetis juris), precedent from similar disputes (Eritrea-Ethiopia Boundary Commission), and propose boundary demarcation with independent verification. The legitimacy of legal frameworks gives evaluative judgments traction.' },
          transformative: { fit: 'low', reason: 'Transformative mediation focuses on relationship change and empowerment. While important long-term, territorial disputes are fundamentally about sovereignty and control -- transformation without a concrete border solution leaves the core issue unresolved.' },
          shuttle: { fit: 'high', reason: 'Shuttle diplomacy is often essential in territorial disputes where direct contact is politically toxic. The mediator can explore concessions privately that neither side can offer publicly. Kissinger\'s Sinai shuttle (1974-75) is the paradigm case.' },
          track_two: { fit: 'medium', reason: 'Track-two can prepare the ground by allowing academics and retired officials to explore creative solutions (joint sovereignty zones, phased handovers, resource-sharing agreements) that official negotiators cannot publicly consider.' },
        },
      },
      { id: 'ethnic', name: 'Ethnic Violence', context: 'A multi-ethnic state has experienced escalating intercommunal violence. The dominant ethnic group controls the military and government. A minority group has formed armed militias after a massacre of 300 civilians. Neighboring states are arming proxies. 50,000 displaced.', bgColor: C.red,
        approaches: {
          facilitative: { fit: 'low', reason: 'Pure facilitation fails here because the power asymmetry is too great. The dominant group has no incentive to make concessions in a facilitated process where the mediator cannot apply pressure. The minority group will not trust a process that treats unequal parties as equal.' },
          evaluative: { fit: 'medium', reason: 'Evaluative mediation can invoke international humanitarian law and R2P norms. However, evaluative judgments against the dominant group may cause them to withdraw. Works best when backed by credible threat of sanctions or intervention.' },
          transformative: { fit: 'high', reason: 'Transformative mediation addresses the deeper relational dynamics: dehumanization, historical grievances, identity threats. Lederach\'s "moral imagination" framework is built for this context. Must be combined with security guarantees, but relationship transformation is the long-term key.' },
          shuttle: { fit: 'high', reason: 'Essential when direct contact could trigger violence or political backlash. The mediator can build separate trust with each community, identify moderates within the dominant group, and construct a framework before bringing parties together. Zartman\'s "ripeness" assessment is critical before attempting direct talks.' },
          track_two: { fit: 'high', reason: 'Track-two is critical here. Religious leaders, women\'s organizations, and civil society can create cross-ethnic dialogue spaces that armed actors cannot. The Northern Ireland model shows track-two can sustain contact when official channels collapse.' },
        },
      },
      { id: 'resource', name: 'Resource Competition', context: 'Three countries share a major river basin. Upstream country is building a massive dam that will reduce downstream water flow by 40%. Downstream countries depend on the river for agriculture feeding 30 million people. Diplomatic relations are deteriorating. Climate change is reducing overall water availability.', bgColor: C.green,
        approaches: {
          facilitative: { fit: 'high', reason: 'Facilitative mediation excels in resource disputes because the parties often share underlying interests (water security, economic development) even when positions conflict. A skilled facilitator can reframe zero-sum water allocation into positive-sum water management. The 1995 Mekong Agreement used facilitative processes.' },
          evaluative: { fit: 'high', reason: 'Evaluative mediation can apply international water law (UN Watercourses Convention 1997, Helsinki Rules). The "equitable and reasonable utilization" and "no significant harm" principles provide frameworks for expert-driven allocation. Technical hydrological assessments give evaluative mediators strong analytical ground.' },
          transformative: { fit: 'low', reason: 'Transformative mediation is less suited to resource disputes, which are fundamentally technical and distributional rather than relational. The parties are not in an identity conflict -- they have a practical resource allocation problem that requires engineering and legal solutions.' },
          shuttle: { fit: 'medium', reason: 'Shuttle diplomacy is useful early in the process when direct negotiation is politically difficult. The upstream country may resist multilateral formats where it is outnumbered. However, the technical complexity of water-sharing eventually requires joint sessions with engineers and hydrologists.' },
          track_two: { fit: 'medium', reason: 'Track-two involving water engineers, agricultural scientists, and environmental NGOs can generate creative technical solutions (water banking, seasonal flow agreements, joint dam management) before politicians engage. The Indus Waters Treaty (1960) benefited from extensive technical track-two work.' },
        },
      },
    ];
    var scenario = MED_SCENARIOS[medScenario];
    var APPROACHES = [
      { id: 'facilitative', name: 'Facilitative', desc: 'Mediator manages the process but does not suggest solutions. Empowers parties to generate their own agreement. Based on Fisher/Ury\'s principled negotiation.' },
      { id: 'evaluative', name: 'Evaluative', desc: 'Mediator assesses the merits of each side\'s position and proposes solutions based on legal or normative frameworks. More directive than facilitative.' },
      { id: 'transformative', name: 'Transformative', desc: 'Mediator focuses on changing the relationship between parties -- building empathy, recognition, and empowerment. Based on Bush & Folger\'s relational framework.' },
      { id: 'shuttle', name: 'Shuttle Diplomacy', desc: 'Mediator meets each side separately, carrying proposals back and forth. Allows face-saving concessions and private exploration of positions. Kissinger\'s model.' },
      { id: 'track_two', name: 'Track-Two Diplomacy', desc: 'Unofficial channels involving non-state actors (academics, religious leaders, civil society). Creates space for creative solutions without official commitment.' },
    ];
    var choiceKey = scenario.id;
    var userChoice = medChoices[choiceKey];
    var isRevealed = medRevealed[choiceKey];
    return (
      <div>
        <div style={{ padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderLeft: '3px solid ' + C.accent, marginBottom: 16, borderRadius: 6 }}>
          <p style={{ fontFamily: PC_MONO, fontSize: 10, color: C.accent, letterSpacing: '.12em', marginBottom: 8 }}>MEDIATION TECHNIQUE SELECTOR</p>
          <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.7, marginBottom: 8 }}>
            Select a conflict scenario and choose the mediation approach you believe is most appropriate. The system evaluates each approach's fit using Zartman's ripeness theory, Fisher and Ury's principled negotiation framework, and Lederach's conflict transformation model.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {MED_SCENARIOS.map(function(s, si) {
            var active = medScenario === si;
            return (
              <button key={s.id} onClick={function() { setMedScenario(si); }}
                style={{ flex: 1, padding: '10px 12px', textAlign: 'center', fontFamily: PC_MONO, fontSize: 11, cursor: 'pointer', background: active ? s.bgColor + '18' : 'transparent', border: '1px solid ' + (active ? s.bgColor : C.line), color: active ? C.tx : C.tx3, borderRadius: 4 }}>
                {s.name}
              </button>
            );
          })}
        </div>
        <div style={{ padding: 14, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginBottom: 16 }}>
          <div style={{ fontFamily: PC_MONO, fontSize: 9, color: scenario.bgColor, marginBottom: 6 }}>SCENARIO BRIEFING</div>
          <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.7 }}>{scenario.context}</p>
        </div>
        <div style={{ fontFamily: PC_MONO, fontSize: 10, color: C.tx3, marginBottom: 8 }}>SELECT YOUR APPROACH:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {APPROACHES.map(function(a) {
            var selected = userChoice === a.id;
            var fitData = isRevealed ? scenario.approaches[a.id] : null;
            var fitColor = fitData ? (fitData.fit === 'high' ? C.green : fitData.fit === 'medium' ? C.amber : C.red) : C.tx3;
            return (
              <div key={a.id} style={{ padding: 12, background: selected ? C.accentBg : C.card, border: '1px solid ' + (selected ? C.accent : C.cardBd), borderRadius: 4, cursor: isRevealed ? 'default' : 'pointer' }}
                onClick={function() { if (!isRevealed) { setMedChoices(function(prev) { var c = Object.assign({}, prev); c[choiceKey] = a.id; return c; }); } }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontFamily: PC_MONO, fontSize: 12, color: selected ? C.accent : C.tx, fontWeight: 600 }}>{a.name}</span>
                    <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.5, marginTop: 4 }}>{a.desc}</p>
                  </div>
                  {fitData && (
                    <span style={{ fontFamily: PC_MONO, fontSize: 10, padding: '3px 8px', borderRadius: 3, background: fitColor + '18', color: fitColor, border: '1px solid ' + fitColor + '40', whiteSpace: 'nowrap', marginLeft: 12 }}>
                      {fitData.fit.toUpperCase()} FIT
                    </span>
                  )}
                </div>
                {fitData && (
                  <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: '1px solid ' + C.line }}>{fitData.reason}</p>
                )}
              </div>
            );
          })}
        </div>
        {!isRevealed && userChoice && (
          <button onClick={function() { setMedRevealed(function(prev) { var c = Object.assign({}, prev); c[choiceKey] = true; return c; }); }}
            style={{ padding: '8px 20px', fontFamily: PC_MONO, fontSize: 11, cursor: 'pointer', background: C.accentBg, border: '1px solid ' + C.accent, color: C.accent, borderRadius: 3 }}>
            Evaluate All Approaches
          </button>
        )}
        {isRevealed && (
          <div style={{ padding: 14, background: C.accentBg, border: '1px solid ' + C.accent + '30', borderRadius: 3, marginTop: 16 }}>
            <div style={{ fontFamily: PC_MONO, fontSize: 10, color: C.accent, marginBottom: 6 }}>FRAMEWORK REFERENCE</div>
            <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.7 }}>
              Zartman's ripeness theory holds that mediation succeeds only when parties reach a "mutually hurting stalemate" and perceive a "way out." The choice of technique must match the conflict's ripeness. Fisher and Ury's "Getting to Yes" (1981) established principled negotiation: focus on interests not positions, generate options for mutual gain, use objective criteria. Lederach's conflict transformation framework extends beyond settlement to address relational and structural causes of violence.
            </p>
            <p style={{ fontSize: 10, color: C.tx3, fontFamily: PC_MONO, marginTop: 8, lineHeight: 1.6 }}>
              Zartman, "Ripe for Resolution" (1989). Fisher & Ury, "Getting to Yes" (1981). Lederach, "The Moral Imagination" (2005). Bush & Folger, "The Promise of Mediation" (1994). Bercovitch, "International Mediation" (1996).
            </p>
          </div>
        )}
      </div>
    );
  };

  // -- Peace Process Duration Analyzer ──────────────────────────────
  const renderTimeline = () => {
    var PROCESSES = [
      { id: 'ireland', name: 'Northern Ireland', years: 30, start: 1968, end: 1998, outcome: 'Success (Good Friday Agreement)', status: 'resolved', factors: { complexity: 'medium', spoilers: 'high', external: 'high', institutions: 'strong', identity: 'high' }, note: 'Track-II contacts from 1972. Multiple failed ceasefires. Creative constitutional engineering. Decommissioning took until 2005. Legacy justice issues unresolved 25+ years later.' },
      { id: 'colombia', name: 'Colombia (FARC)', years: 52, start: 1964, end: 2016, outcome: 'Success (Havana Agreement)', status: 'resolved', factors: { complexity: 'high', spoilers: 'high', external: 'medium', institutions: 'medium', identity: 'medium' }, note: 'Multiple failed negotiations (1984, 1991, 1999). Havana talks 2012-2016. Initial referendum rejected the agreement (50.2% No). Revised agreement ratified by Congress. Implementation ongoing with significant challenges.' },
      { id: 'palestine', name: 'Israel-Palestine', years: 75, start: 1948, end: null, outcome: 'Ongoing / No resolution', status: 'ongoing', factors: { complexity: 'extreme', spoilers: 'extreme', external: 'extreme', institutions: 'weak', identity: 'extreme' }, note: 'Oslo Accords (1993) created interim framework but no final status agreement. Camp David (2000) and Annapolis (2007) failed. Settlement expansion, Gaza conflicts, and political fragmentation have progressively narrowed the space for negotiation.' },
      { id: 'mozambique', name: 'Mozambique', years: 2, start: 1990, end: 1992, outcome: 'Success (Rome Agreement)', status: 'resolved', factors: { complexity: 'low', spoilers: 'low', external: 'medium', institutions: 'weak', identity: 'low' }, note: 'Mediated by the Community of Sant\'Egidio (Catholic lay organization). Cold War end removed external drivers. Both parties exhausted. Relatively clean bilateral conflict without ethnic dimension made resolution simpler.' },
      { id: 'bosnia', name: 'Bosnia', years: 3, start: 1992, end: 1995, outcome: 'Imposed (Dayton Agreement)', status: 'frozen', factors: { complexity: 'high', spoilers: 'high', external: 'high', institutions: 'weak', identity: 'extreme' }, note: 'NATO intervention forced the parties to Dayton. Agreement imposed rather than negotiated. Created dysfunctional governance structure that persists. Ethnic divisions institutionalized. Technically at peace but functionally divided.' },
      { id: 'rwanda', name: 'Rwanda', years: 4, start: 1990, end: 1994, outcome: 'Failed (Arusha) / Military victory', status: 'failed_then_imposed', factors: { complexity: 'extreme', spoilers: 'extreme', external: 'low', institutions: 'weak', identity: 'extreme' }, note: 'Arusha Accords (1993) were comprehensive on paper but failed catastrophically. Extremist spoilers launched genocide. RPF military victory ended the genocide. Post-genocide justice via Gacaca courts processed 1.9 million cases.' },
      { id: 'aceh', name: 'Aceh (Indonesia)', years: 29, start: 1976, end: 2005, outcome: 'Success (Helsinki MoU)', status: 'resolved', factors: { complexity: 'medium', spoilers: 'medium', external: 'low', institutions: 'medium', identity: 'high' }, note: 'The 2004 tsunami created a humanitarian crisis that opened a window for peace. Former Finnish President Ahtisaari mediated. The disaster shifted the cost-benefit calculation for both sides. A natural disaster as catalyst for peace is analytically significant.' },
      { id: 'srilanka', name: 'Sri Lanka', years: 26, start: 1983, end: 2009, outcome: 'Military victory (no negotiated peace)', status: 'military_end', factors: { complexity: 'high', spoilers: 'high', external: 'medium', institutions: 'medium', identity: 'extreme' }, note: 'Norwegian-mediated ceasefire (2002) collapsed by 2006. Government chose military solution over negotiation. LTTE defeated in 2009 with significant civilian casualties. No transitional justice process. Underlying grievances largely unaddressed.' },
    ];
    var sorted = PROCESSES.slice().sort(function(a, b) {
      if (tlSort === 'duration') return b.years - a.years;
      if (tlSort === 'start') return a.start - b.start;
      if (tlSort === 'outcome') return (a.status > b.status ? 1 : -1);
      return 0;
    });
    var maxYears = 80;
    var FACTORS = [
      { id: 'none', label: 'No adjustment' },
      { id: 'complexity', label: 'Conflict complexity' },
      { id: 'spoilers', label: 'Spoiler intensity' },
      { id: 'external', label: 'External involvement' },
      { id: 'institutions', label: 'Institutional strength' },
      { id: 'identity', label: 'Identity dimension' },
    ];
    var factorScale = { low: 0.2, medium: 0.5, high: 0.75, extreme: 1.0, strong: 0.3, weak: 0.8 };
    return (
      <div>
        <div style={{ padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderLeft: '3px solid ' + C.gold, marginBottom: 16, borderRadius: 6 }}>
          <p style={{ fontFamily: PC_MONO, fontSize: 10, color: C.gold, letterSpacing: '.12em', marginBottom: 8 }}>PEACE PROCESS DURATION ANALYZER</p>
          <p style={{ fontSize: 13, color: C.tx, lineHeight: 1.7 }}>
            Comparing 8 peace processes by duration and outcome. Adjustable factors reveal what accelerates or decelerates resolution. The core insight: longer processes are not necessarily worse -- rushed agreements (Arusha, Dayton) often fail or produce frozen conflicts, while patient processes (Northern Ireland, Aceh) can produce durable peace.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: PC_MONO, fontSize: 9, color: C.tx3, marginBottom: 4 }}>SORT BY</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[['duration','Duration'],['start','Start year'],['outcome','Outcome']].map(function(s) {
                return (
                  <button key={s[0]} onClick={function() { setTlSort(s[0]); }}
                    style={{ padding: '4px 10px', fontFamily: PC_MONO, fontSize: 10, cursor: 'pointer', background: tlSort === s[0] ? C.accentBg : 'transparent', border: '1px solid ' + (tlSort === s[0] ? C.accent : C.line), color: tlSort === s[0] ? C.accent : C.tx3, borderRadius: 3 }}>
                    {s[1]}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: PC_MONO, fontSize: 9, color: C.tx3, marginBottom: 4 }}>HIGHLIGHT FACTOR</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {FACTORS.map(function(f) {
                return (
                  <button key={f.id} onClick={function() { setTlFactor(f.id); }}
                    style={{ padding: '4px 10px', fontFamily: PC_MONO, fontSize: 10, cursor: 'pointer', background: tlFactor === f.id ? C.accentBg : 'transparent', border: '1px solid ' + (tlFactor === f.id ? C.accent : C.line), color: tlFactor === f.id ? C.accent : C.tx3, borderRadius: 3 }}>
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {sorted.map(function(p) {
          var barWidth = Math.min(p.years / maxYears * 100, 100);
          var statusColor = p.status === 'resolved' ? C.green : p.status === 'ongoing' ? C.amber : p.status === 'frozen' ? C.blue : C.red;
          var factorVal = tlFactor !== 'none' && p.factors[tlFactor] ? p.factors[tlFactor] : null;
          var factorColor = factorVal ? (factorScale[factorVal] > 0.7 ? C.red : factorScale[factorVal] > 0.4 ? C.amber : C.green) : null;
          var expanded = tlExpanded === p.id;
          return (
            <div key={p.id} style={{ padding: 12, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 4, marginBottom: 8, cursor: 'pointer' }}
              onClick={function() { setTlExpanded(expanded ? null : p.id); }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: PC_MONO, fontSize: 12, color: C.tx, fontWeight: 600 }}>{p.name}</span>
                  <span style={{ fontFamily: PC_MONO, fontSize: 10, padding: '2px 6px', borderRadius: 2, background: statusColor + '18', color: statusColor, border: '1px solid ' + statusColor + '40' }}>
                    {p.status === 'resolved' ? 'RESOLVED' : p.status === 'ongoing' ? 'ONGOING' : p.status === 'frozen' ? 'FROZEN' : 'FAILED'}
                  </span>
                  {factorVal && (
                    <span style={{ fontFamily: PC_MONO, fontSize: 9, padding: '2px 6px', borderRadius: 2, background: factorColor + '18', color: factorColor }}>
                      {tlFactor}: {factorVal}
                    </span>
                  )}
                </div>
                <span style={{ fontFamily: PC_MONO, fontSize: 11, color: C.tx2 }}>{p.years}{p.end ? '' : '+'} years ({p.start}-{p.end || 'present'})</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,.04)', borderRadius: 4, overflow: 'hidden', marginBottom: 4 }}>
                <div style={{ width: barWidth + '%', height: '100%', background: statusColor, borderRadius: 4, opacity: 0.7 }} />
              </div>
              <div style={{ fontSize: 11, color: C.tx2 }}>{p.outcome}</div>
              {expanded && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid ' + C.line }}>
                  <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.7, marginBottom: 10 }}>{p.note}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {Object.entries(p.factors).map(function(entry) {
                      var fKey = entry[0]; var fVal = entry[1];
                      var fc = factorScale[fVal] > 0.7 ? C.red : factorScale[fVal] > 0.4 ? C.amber : C.green;
                      return (
                        <div key={fKey} style={{ padding: '4px 8px', background: fc + '10', border: '1px solid ' + fc + '30', borderRadius: 3 }}>
                          <span style={{ fontFamily: PC_MONO, fontSize: 9, color: C.tx3 }}>{fKey}: </span>
                          <span style={{ fontFamily: PC_MONO, fontSize: 10, color: fc }}>{fVal}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div style={{ padding: 14, background: C.accentBg, border: '1px solid ' + C.accent + '30', borderRadius: 3, marginTop: 16 }}>
          <div style={{ fontFamily: PC_MONO, fontSize: 10, color: C.accent, marginBottom: 6 }}>KEY INSIGHT</div>
          <p style={{ fontSize: 12, color: C.tx, lineHeight: 1.7 }}>
            Mozambique resolved in 2 years; Colombia took 52. But Mozambique's agreement held because the conflict was bilateral, non-ethnic, and the Cold War's end removed external drivers. Colombia's longer process reflected genuine complexity -- multiple armed groups, narco-economics, land reform, and transitional justice all had to be addressed. Rwanda's "quick" Arusha process (3 years) produced an agreement that collapsed into genocide. Dayton "resolved" Bosnia in 3 years but created a dysfunctional state. Duration is not the measure of success -- durability is.
          </p>
          <p style={{ fontSize: 10, color: C.tx3, fontFamily: PC_MONO, marginTop: 8, lineHeight: 1.6 }}>
            Stedman, "Implementing Peace Agreements in Civil Wars" (2002). Darby & Mac Ginty, "The Management of Peace Processes" (2000). Fortna, "Does Peacekeeping Work?" (2008). Walter, "Committing to Peace" (2002).
          </p>
        </div>
      </div>
    );
  };

  // -- Main Return — UN Mediation Chamber ────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.tx, padding: '40px 20px', fontFamily: PC_SANS, position: 'relative', overflow: 'hidden' }}>
      <DoveWatermark />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Back */}
        <button
          onClick={() => setView('home')}
          style={{
            background: 'none', border: `1px solid ${C.line}`, color: C.tx2,
            fontFamily: PC_SANS, fontSize: 13, padding: '6px 16px', borderRadius: 4,
            cursor: 'pointer', marginBottom: 20, transition: 'all .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = C.accent; e.currentTarget.style.borderColor = C.accent; }}
          onMouseLeave={e => { e.currentTarget.style.color = C.tx2; e.currentTarget.style.borderColor = C.line; }}
        >
          &larr; Portfolio
        </button>

        {/* Header — UN mediation chamber style */}
        <div style={{ marginBottom: 32, borderBottom: `1px solid ${C.gold}20`, paddingBottom: 24, position: 'relative' }}>
          {/* Laurel wreath decoration */}
          <div style={{ position: 'absolute', top: -5, right: 0 }}>
            <LaurelWreath size={48} style={{ opacity: 0.1 }} />
          </div>
          <div style={{ fontSize: 10, fontFamily: PC_MONO, textTransform: 'uppercase', letterSpacing: 3, color: C.gold + '60', marginBottom: 4 }}>
            DIPLOMATIC PROTOCOL
          </div>
          <div style={{ fontSize: 11, fontFamily: PC_MONO, textTransform: 'uppercase', letterSpacing: 2, color: C.tx3, marginBottom: 8 }}>
            PCS &middot; Practices of Peace &amp; Conflict
          </div>
          <h1 style={{ fontSize: 30, fontFamily: PC_SERIF, color: C.accent, margin: '0 0 6px', fontWeight: 400, letterSpacing: 0.5 }}>
            Peace Process Simulator
          </h1>
          <p style={{ fontSize: 14, fontFamily: PC_SERIF, color: C.tx2, margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
            Sequence interventions to build a durable peace &mdash; order matters as much as content
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0 2px' }}>
            <DoveIcon /><Tip id="negative_peace" />
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
            {PC_SKILLS.map(s => (
              <span key={s} style={{ padding: '3px 8px', borderRadius: 2, background: `${C.accent}08`, border: `1px solid ${C.accent}18`, fontSize: 11, fontFamily: PC_MONO, color: `${C.accent}88`, letterSpacing: '.04em' }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Mode Tabs — diplomatic sections */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: `1px solid ${C.line}`, paddingBottom: 12 }}>
          {MODES.map(m => {
            const active = m.id === mode;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                style={{
                  padding: '8px 18px', borderRadius: 4,
                  background: active ? `${C.accent}18` : 'transparent',
                  border: `1px solid ${active ? C.accent + '44' : 'transparent'}`,
                  color: active ? C.accent : C.tx3,
                  fontFamily: PC_MONO, fontSize: 11, cursor: 'pointer',
                  transition: 'all .15s', fontWeight: active ? 600 : 400,
                }}
              >
                {m.icon} {m.label}
              </button>
            );
          })}
        </div>

        {/* Mode content */}
        {mode === 'simulator' && renderSimulator()}
        {mode === 'sequence' && renderSequence()}
        {mode === 'cases' && renderCases()}
        {mode === 'toolkit' && renderToolkit()}
        {mode === 'spoiler' && renderSpoiler()}
        {mode === 'justice' && renderJustice()}
        {mode === 'mediation' && renderMediation()}
        {mode === 'timeline' && renderTimeline()}

        {/* Provenance */}
        <div style={{ marginTop: 40, paddingTop: 16, borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontFamily: PC_MONO, fontSize: 12, color: C.tx3, lineHeight: 1.6 }}>
            PROVENANCE: Lederach, "Building Peace: Sustainable Reconciliation in Divided Societies" (1997); Paris, "At War's End: Building Peace After Civil Conflict" (2004); Berdal, "Disarmament and Demobilisation After Civil Wars" (1996); Zartman, "Ripe for Resolution" (1989); Stedman, "Spoiler Problems in Peace Processes" (1997); Walzer, "Just and Unjust Wars" (1977). Case studies: Darby, "The Effects of Violence on Peace Processes" (2001); Des Forges, "Leave None to Tell the Story: Genocide in Rwanda" (1999); Pizarro, "Paz en Colombia" (2017). Transitional justice: de Greiff, "Handbook of Reparations" (2006); Hayner, "Unspeakable Truths" (2011).
          </p>
        </div>
      </div>
    </div>
  );
}
