// CiccView.jsx — ICC Jurisdiction Analyzer
// Coalition for the International Criminal Court (CICC/UN)
// "Evaluating ICC Jurisdiction Over Real-World Situations"
//
// Interactive legal analysis: 4 real-world ICC situations evaluated across
// 4 jurisdiction dimensions. Visitor evaluates complementarity, gravity,
// political barriers, and prosecution merit. Two modes: Analysis (case
// evaluation) and Framework (Rome Statute reference).
// Self-contained React component. Globals: useState, useCallback, useMemo

// ── Palette: Formal dark blue — The Hague tribunal ──────────
const C = {
  bg:      '#060810',
  card:    'rgba(10,12,22,.95)',
  cardBd:  'rgba(48,80,140,.15)',
  tx:      '#c8cce0',
  tx2:     '#98a4c0',
  tx3:     '#6f7b98',
  accent:  '#3070a0',
  accentDm:'#205890',
  accentBg:'rgba(48,112,160,.08)',
  green:   '#38a060',
  greenDm: '#288048',
  greenBg: 'rgba(56,160,96,.08)',
  yellow:  '#b8a030',
  yellowDm:'#988020',
  yellowBg:'rgba(184,160,48,.08)',
  red:     '#a04848',
  redDm:   '#883030',
  redBg:   'rgba(160,72,72,.08)',
  gold:    '#c8a850',
  line:    'rgba(48,80,140,.10)',
  amber:   '#d4a030',
  amberBg: 'rgba(212,160,48,.08)',
  navy:    '#182848',
};
const Mono  = "'IBM Plex Mono',monospace";
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";

// ── ICC Crest watermark SVG ─────────────────────────────────
const IccCrestBg = () => (
  <svg width="260" height="260" viewBox="0 0 100 100" style={{
    position:'fixed', bottom:40, right:40, opacity:0.025, pointerEvents:'none', zIndex:0,
  }}>
    {/* Simplified scales of justice */}
    <line x1="50" y1="15" x2="50" y2="75" stroke="#3070a0" strokeWidth="2" />
    <line x1="25" y1="30" x2="75" y2="30" stroke="#3070a0" strokeWidth="1.5" />
    <circle cx="50" cy="15" r="4" fill="none" stroke="#3070a0" strokeWidth="1.5" />
    <path d="M25,30 L20,50 L30,50 Z" fill="none" stroke="#3070a0" strokeWidth="1" />
    <path d="M75,30 L70,50 L80,50 Z" fill="none" stroke="#3070a0" strokeWidth="1" />
    <path d="M20,50 Q25,55 30,50" fill="none" stroke="#3070a0" strokeWidth="1" />
    <path d="M70,50 Q75,55 80,50" fill="none" stroke="#3070a0" strokeWidth="1" />
    <rect x="40" y="75" width="20" height="5" rx="2" fill="none" stroke="#3070a0" strokeWidth="1" />
    {/* Laurel wreath */}
    <path d="M25,65 Q20,45 30,25" fill="none" stroke="#3070a0" strokeWidth="0.8" />
    <path d="M75,65 Q80,45 70,25" fill="none" stroke="#3070a0" strokeWidth="0.8" />
    {[30,40,50,55].map((y,i) => (
      <g key={i}>
        <ellipse cx={23-i*0.5} cy={y} rx="4" ry="2" fill="none" stroke="#3070a0" strokeWidth="0.5" transform={`rotate(-20,${23-i*0.5},${y})`} />
        <ellipse cx={77+i*0.5} cy={y} rx="4" ry="2" fill="none" stroke="#3070a0" strokeWidth="0.5" transform={`rotate(20,${77+i*0.5},${y})`} />
      </g>
    ))}
  </svg>
);

// ── Legal filing card wrapper ─────────────────────────────
const LegalCard = ({ children, style = {}, caseNo }) => (
  <div style={{
    background: C.card, border: '1px solid ' + C.cardBd,
    borderRadius: 2, padding: 28, position: 'relative',
    borderTop: '2px solid rgba(48,112,160,.3)',
    boxShadow: '0 1px 8px rgba(0,0,0,.3)',
    ...style,
  }}>
    {caseNo && (
      <div style={{
        position:'absolute', top:8, right:12,
        fontFamily:Mono, fontSize:9, color:C.tx3, letterSpacing:'.1em',
        padding:'2px 8px', border:'1px solid rgba(48,80,140,.15)', borderRadius:2,
      }}>
        No. ICC-{caseNo}
      </div>
    )}
    {children}
  </div>
);

const SKILLS = [
  'Rome Statute Interpretation',
  'Complementarity Analysis',
  'International Criminal Law',
  'Gravity Threshold Assessment',
  'Political Feasibility Analysis',
  'Transitional Justice',
  'Civil Society Advocacy',
  'UN System Navigation',
];

const PROVENANCE = [
  { label: 'Rome Statute', desc: 'ICC Founding Treaty (1998/2002)' },
  { label: 'CICC', desc: 'Coalition for the International Criminal Court' },
  { label: 'ASP', desc: 'Assembly of States Parties' },
  { label: 'OTP Policy', desc: 'Office of the Prosecutor Strategy Papers' },
];

// ── Jurisdiction Framework ───────────────────────────────────
const FRAMEWORK = [
  {
    id: 'complementarity',
    title: 'Complementarity (Art. 17)',
    subtitle: 'Is the ICC the court of last resort?',
    explanation: 'The ICC operates on the principle of complementarity: it can only exercise jurisdiction when national courts are unwilling or genuinely unable to investigate or prosecute. This is the bedrock of the Rome Statute — the ICC is not meant to replace domestic courts but to serve as a safety net when they fail.',
    criteria: [
      'Is the state investigating the same persons for substantially the same conduct?',
      'If proceedings occurred, were they genuine or designed to shield the accused?',
      'Has the national judicial system collapsed or is it unavailable?',
      'Is there an unjustified delay inconsistent with intent to bring the person to justice?',
    ],
    keyCase: 'In the Kenya situation, the Pre-Trial Chamber found admissibility because Kenya\'s domestic proceedings did not target the same individuals for the same conduct, despite Kenya\'s argument that its courts were functional.',
  },
  {
    id: 'gravity',
    title: 'Gravity Threshold (Art. 17(1)(d))',
    subtitle: 'Are the crimes serious enough for the ICC?',
    explanation: 'Not every violation of international criminal law warrants ICC attention. The OTP uses a gravity assessment considering: scale (number of victims), nature (type of crimes), manner of commission (degree of cruelty), and impact (harm to communities). The ICC\'s limited resources demand selectivity.',
    criteria: [
      'Scale: How many victims? Geographic spread of crimes?',
      'Nature: Which Rome Statute crimes are alleged (genocide, crimes against humanity, war crimes, aggression)?',
      'Manner: Were crimes committed with particular cruelty or systematic planning?',
      'Impact: What is the long-term harm to affected communities and international peace?',
    ],
    keyCase: 'In the Comoros referral (the Mavi Marmara incident), the OTP initially declined investigation partly on gravity grounds — 10 deaths, though serious, did not reach the threshold given the ICC\'s caseload. The ASP reviewed this decision.',
  },
  {
    id: 'political',
    title: 'Political Barriers',
    subtitle: 'What geopolitical obstacles exist?',
    explanation: 'The ICC depends on state cooperation for arrests, evidence, and witness protection. The court has no police force. Political realities — UN Security Council dynamics, non-state-party status, regional alliances — profoundly shape what the ICC can actually accomplish, independent of legal merit.',
    criteria: [
      'Is the accused state a party to the Rome Statute?',
      'Can the UNSC refer the situation (even if non-party)? Would P5 members veto?',
      'Will regional organizations (AU, EU, Arab League) cooperate or obstruct?',
      'Are suspects in positions that make arrest practically impossible?',
    ],
    keyCase: 'The Bashir arrest warrant (Darfur) demonstrates political barriers. Despite a UNSC referral and arrest warrants since 2009, al-Bashir traveled to ICC member states without arrest for over a decade, exposing the gap between legal authority and enforcement capacity.',
  },
  {
    id: 'merit',
    title: 'Prosecution Merit',
    subtitle: 'Would prosecution serve justice?',
    explanation: 'Beyond legal jurisdiction, the OTP considers the interests of justice: would prosecution contribute to accountability, deterrence, and victim recognition? Or could it destabilize peace processes, endanger witnesses, or produce outcomes worse than alternatives like truth commissions?',
    criteria: [
      'Would prosecution contribute to ending impunity for the most serious crimes?',
      'Are there viable alternatives (truth commissions, hybrid courts, domestic reform)?',
      'Could prosecution endanger ongoing peace negotiations?',
      'Would victims benefit from ICC proceedings specifically?',
    ],
    keyCase: 'In Colombia, the ICC\'s OTP conducted a prolonged preliminary examination while Colombia developed its own transitional justice system (JEP). The OTP ultimately deferred to the domestic process — a complementarity success story if the JEP delivers genuine accountability.',
  },
];

// ── Situation Data ───────────────────────────────────────────
const SITUATIONS = [
  {
    id: 'darfur',
    name: 'Darfur, Sudan',
    period: '2003 \u2013 Present',
    referral: 'UNSC Resolution 1593 (2005)',
    background: 'Beginning in 2003, the Sudanese government and allied Janjaweed militia conducted a systematic campaign against the Fur, Masalit, and Zaghawa populations in Darfur. The violence included mass killings, sexual violence, destruction of villages, and forced displacement affecting over 2.5 million people.',
    charges: 'Genocide, crimes against humanity (murder, extermination, forcible transfer, torture, rape), war crimes',
    accused: 'Omar al-Bashir (then-President), Ahmad Harun, Ali Kushayb, others',
    dimensions: {
      complementarity: {
        assessment: 'strong',
        analysis: 'Sudan showed zero willingness to prosecute. Al-Bashir was the sitting president and chief architect. The Sudanese judiciary was not investigating the same conduct. Special courts established by Sudan were widely regarded as cosmetic. The government actively obstructed international investigations. This is a textbook case of unwillingness.',
      },
      gravity: {
        assessment: 'strong',
        analysis: 'Among the most serious situations before the ICC. Scale: 300,000+ estimated deaths, 2.5 million displaced. Nature: genocide charges (the ICC\'s first). Manner: systematic village destruction, organized sexual violence, ethnic targeting. Impact: generational destruction of communities. The gravity threshold is overwhelmingly met.',
      },
      political: {
        assessment: 'severe',
        analysis: 'Sudan is not a Rome Statute party — the UNSC referral was essential but created enforcement paradoxes. China and Russia abstained on the referral and subsequently blocked follow-up. The African Union formally opposed the Bashir warrant, calling it neo-colonial. Bashir traveled to ICC member states (Chad, South Africa, Jordan) without arrest. The case exposed the ICC\'s enforcement dependence.',
      },
      merit: {
        assessment: 'strong',
        analysis: 'Despite enforcement failures, the arrest warrants established that sitting heads of state can be charged with genocide. The symbolic and precedential value is enormous. After Bashir\'s ouster in 2019, Sudan\'s transitional government signaled potential cooperation. The warrants maintained pressure across regime change — a long-game accountability argument.',
      },
    },
  },
  {
    id: 'kenya',
    name: 'Kenya',
    period: '2007 \u2013 2008 Post-Election Violence',
    referral: 'OTP proprio motu investigation (2010)',
    background: 'Following disputed December 2007 elections, Kenya erupted into ethnic violence killing over 1,100 people and displacing 600,000. Violence was organized along ethnic lines, with political leaders allegedly orchestrating attacks through ethnic militias. A Commission of Inquiry (Waki Commission) recommended ICC referral after the Kenyan parliament failed to establish a special tribunal.',
    charges: 'Crimes against humanity (murder, deportation, persecution, rape, other inhumane acts)',
    accused: 'Uhuru Kenyatta, William Ruto, Joshua Sang, others',
    dimensions: {
      complementarity: {
        assessment: 'moderate',
        analysis: 'Kenya had a functional judiciary but showed unwillingness to prosecute the powerful. The Waki Commission gave Kenya a sealed envelope of suspects and a deadline to establish a domestic tribunal. Parliament rejected the tribunal bill multiple times. The OTP\'s investigation was the first using proprio motu powers — a test of the Court\'s independence. Kenya challenged admissibility, arguing its courts were capable, but the PTC found the domestic proceedings did not cover the same persons and conduct.',
      },
      gravity: {
        assessment: 'moderate',
        analysis: 'Over 1,100 killed and 600,000 displaced meets the gravity threshold, though it is less severe in scale than Darfur or the Rohingya crisis. The systematic organization of violence along ethnic lines, and the involvement of senior political figures in allegedly planning it, elevates gravity beyond the raw numbers. The OTP\'s initial assessment identified organized rather than spontaneous violence.',
      },
      political: {
        assessment: 'severe',
        analysis: 'Kenya is an ICC member state but mobilized aggressive opposition once its leaders were charged. Kenyatta and Ruto ran a joint presidential ticket in 2013 partly unified by their shared ICC cases — and won. As sitting President and Deputy President, they led diplomatic campaigns to withdraw Kenya from the Rome Statute and lobbied the AU for mass withdrawal. Witnesses were intimidated, recanted, or died. The UNSC was asked for a deferral. Kenya demonstrated how a state party can undermine the court from within.',
      },
      merit: {
        assessment: 'weak',
        analysis: 'The Kenya cases ultimately collapsed: charges against Kenyatta were withdrawn in 2014, and Ruto was acquitted in 2016, both due to insufficient evidence largely caused by witness interference. The cases demonstrated the ICC\'s vulnerability when suspects hold state power. However, the investigation itself catalyzed domestic reform — Kenya\'s 2010 constitution included an independent judiciary, and the threat of ICC prosecution influenced the relatively peaceful 2013 election.',
      },
    },
  },
  {
    id: 'palestine',
    name: 'Palestine',
    period: '2014 \u2013 Present',
    referral: 'State referral by Palestine (2015) + OTP investigation (2021)',
    background: 'Palestine acceded to the Rome Statute in 2015 and referred the situation to the ICC. After a prolonged preliminary examination, the OTP opened a formal investigation in 2021 covering crimes in the West Bank (including East Jerusalem) and Gaza since June 2014. The situation encompasses alleged crimes by Israeli forces, Hamas, and other Palestinian armed groups.',
    charges: 'War crimes (settlement activity, targeting civilians, disproportionate attacks, use of human shields), crimes against humanity (persecution, murder, deportation)',
    accused: 'Investigation ongoing — both Israeli and Palestinian actors',
    dimensions: {
      complementarity: {
        assessment: 'moderate',
        analysis: 'This is a split complementarity situation. Israel conducts some military investigations (MAG Corps) but critics argue these are structurally inadequate for senior decision-makers. Israel has not investigated settlement activity as a war crime. Palestine has limited capacity to investigate armed groups operating in its territory. The PTC\'s jurisdictional ruling was itself contested — Israel argued Palestine is not a state and therefore cannot be a state party.',
      },
      gravity: {
        assessment: 'strong',
        analysis: 'Multiple military operations in Gaza (2014, 2021, 2023) each caused massive civilian casualties and infrastructure destruction. The ongoing settlement enterprise affects hundreds of thousands. The duration and systematic nature of alleged crimes over decades substantially elevates gravity. The 2023 escalation dramatically expanded the scale of civilian harm, with tens of thousands of casualties.',
      },
      political: {
        assessment: 'severe',
        analysis: 'The most politically charged situation before the ICC. Israel is not a state party and rejects ICC jurisdiction entirely. The United States actively opposes the investigation and has sanctioned ICC officials. The EU is divided. The situation intersects with the Israeli-Palestinian conflict\'s geopolitical dimensions, involving UNSC P5 members on opposing sides. Any prosecution would face unprecedented enforcement challenges.',
      },
      merit: {
        assessment: 'moderate',
        analysis: 'The investigation\'s merit is debated. Proponents argue it addresses a decades-long accountability gap that no other institution has filled. The issuance of arrest warrants in 2024 represented a historic assertion of international law over political pressure. Critics argue the ICC cannot achieve justice without Israeli cooperation and risks delegitimizing itself. The investigation does provide a legal framework where political discourse dominates.',
      },
    },
  },
  {
    id: 'myanmar',
    name: 'Myanmar / Rohingya',
    period: '2016 \u2013 Present',
    referral: 'OTP proprio motu investigation (2019)',
    background: 'The Myanmar military (Tatmadaw) conducted systematic campaigns against the Rohingya population in Rakhine State, culminating in massive operations in August 2017 that drove over 700,000 Rohingya into Bangladesh. Investigations by the UN Fact-Finding Mission documented murder, sexual violence, arson, and acts potentially constituting genocide.',
    charges: 'Crimes against humanity (deportation, persecution), genocide (under investigation)',
    accused: 'Senior military officials including Commander-in-Chief Min Aung Hlaing',
    dimensions: {
      complementarity: {
        assessment: 'strong',
        analysis: 'Myanmar has shown absolute unwillingness to prosecute. The military denied atrocities occurred, promoted implicated commanders, and established sham domestic inquiries. After the 2021 military coup, the Tatmadaw controls the judiciary entirely. No genuine domestic proceedings exist or are foreseeable. This satisfies unwillingness and inability criteria simultaneously.',
      },
      gravity: {
        assessment: 'strong',
        analysis: 'The scale and systematic nature of the violence meets the highest gravity threshold. Over 700,000 forcibly deported. The UN Fact-Finding Mission documented patterns consistent with genocide: intent to destroy the Rohingya as a group through killings, sexual violence, and conditions of life calculated to bring about physical destruction. Villages systematically razed by military units following consistent operational patterns.',
      },
      political: {
        assessment: 'moderate',
        analysis: 'Myanmar is not a Rome Statute party, but the ICC asserted jurisdiction based on the cross-border element: the deportation was completed in Bangladesh, which is a state party. This creative jurisdictional theory was upheld by the PTC. China shields Myanmar at the UNSC, blocking a referral. However, Bangladesh\'s cooperation, the ICJ parallel proceedings (Gambia v. Myanmar), and broad international condemnation provide some political tailwinds. The 2021 coup further isolated Myanmar.',
      },
      merit: {
        assessment: 'strong',
        analysis: 'Strong prosecution merit. The Rohingya have no realistic domestic justice pathway. The ICJ ordered provisional measures. The evidence base is robust (UN FFM, independent investigations, satellite imagery, survivor testimony). Multiple jurisdictional pathways exist (ICC, ICJ, universal jurisdiction cases in Argentina and Germany). The situation represents exactly what the ICC was designed for: accountability when national systems completely fail an entire population.',
      },
    },
  },
];

const assessColors = { strong: C.green, moderate: C.yellow, weak: C.red, severe: C.red };
const assessLabels = { strong: 'STRONG', moderate: 'MODERATE', weak: 'WEAK', severe: 'SEVERE BARRIERS' };

// ── Decision Tree Data ──────────────────────────────────────
const TREE_NODES = [
  { id: 'start', type: 'decision', label: 'Has a crime\nbeen committed?', x: 350, y: 30, w: 140, h: 50 },
  { id: 'no_crime', type: 'end_red', label: 'No crime,\nno jurisdiction', x: 100, y: 30, w: 130, h: 44 },
  { id: 'core_crimes', type: 'decision', label: 'Is it one of the\n4 core crimes?', x: 350, y: 120, w: 140, h: 50,
    detail: 'The 4 core crimes: Genocide (Art. 6), Crimes Against Humanity (Art. 7), War Crimes (Art. 8), Aggression (Art. 8bis). All other international offenses (terrorism, drug trafficking, piracy) fall outside ICC jurisdiction.' },
  { id: 'not_icc', type: 'end_red', label: 'NOT an\nICC crime', x: 100, y: 120, w: 110, h: 44,
    detail: 'Terrorism, drug trafficking, and most transnational organized crime are not within ICC jurisdiction, even if they violate international law.' },
  { id: 'national', type: 'decision', label: 'Is the accused a\nnational of a\nState Party?', x: 350, y: 215, w: 140, h: 56 },
  { id: 'juris_nat', type: 'end_green', label: 'ICC has\njurisdiction', x: 560, y: 215, w: 120, h: 44,
    detail: 'Example: Kenya. Kenyatta and Ruto were Kenyan nationals, and Kenya is a State Party. The ICC had jurisdiction based on the nationality principle (Art. 12(2)(b)).' },
  { id: 'territory', type: 'decision', label: 'Did the crime occur\non State Party\nterritory?', x: 350, y: 305, w: 140, h: 56 },
  { id: 'juris_terr', type: 'end_green', label: 'ICC has\njurisdiction', x: 560, y: 305, w: 120, h: 44,
    detail: 'Example: Myanmar/Rohingya. Myanmar is not a State Party, but deportation was completed in Bangladesh (a State Party). The ICC asserted territorial jurisdiction based on the cross-border element.' },
  { id: 'unsc', type: 'decision', label: 'Did the UNSC\nrefer the situation?\n(Chapter VII)', x: 350, y: 395, w: 140, h: 56 },
  { id: 'juris_unsc', type: 'end_green', label: 'ICC has\njurisdiction', x: 560, y: 395, w: 120, h: 44,
    detail: 'Example: Darfur, Sudan. UNSC Resolution 1593 (2005) referred the situation, even though Sudan is not a State Party. This is how the arrest warrant for President Bashir was issued.' },
  { id: 'adhoc', type: 'decision', label: 'Did the state accept\njurisdiction ad hoc?\n(Art. 12(3))', x: 350, y: 475, w: 140, h: 56 },
  { id: 'juris_adhoc', type: 'end_green', label: 'ICC has\njurisdiction', x: 560, y: 475, w: 120, h: 44,
    detail: 'Example: Palestine accepted ICC jurisdiction via Art. 12(3) declaration before formally acceding to the Rome Statute. Cote d\'Ivoire also used this mechanism during the 2010-2011 post-election crisis.' },
  { id: 'no_juris', type: 'end_red', label: 'NO ICC\njurisdiction', x: 350, y: 555, w: 120, h: 44,
    detail: 'Example: Syria (without UNSC referral). Syria is not a State Party, the accused are Syrian nationals, crimes occurred on Syrian territory, and Russia/China have vetoed UNSC referral. The ICC cannot act despite overwhelming evidence of atrocities.' },
];

const TREE_EDGES = [
  { from: 'start', to: 'no_crime', label: 'NO' },
  { from: 'start', to: 'core_crimes', label: 'YES' },
  { from: 'core_crimes', to: 'not_icc', label: 'NO' },
  { from: 'core_crimes', to: 'national', label: 'YES' },
  { from: 'national', to: 'juris_nat', label: 'YES' },
  { from: 'national', to: 'territory', label: 'NO' },
  { from: 'territory', to: 'juris_terr', label: 'YES' },
  { from: 'territory', to: 'unsc', label: 'NO' },
  { from: 'unsc', to: 'juris_unsc', label: 'YES' },
  { from: 'unsc', to: 'adhoc', label: 'NO' },
  { from: 'adhoc', to: 'juris_adhoc', label: 'YES' },
  { from: 'adhoc', to: 'no_juris', label: 'NO' },
];

// ── ICC Member State Map Data ───────────────────────────────
const ICC_REGIONS = [
  { id: 'africa', name: 'Africa', parties: 33, total: 54, x: 360, y: 175, w: 100, h: 80, color: C.green },
  { id: 'europe', name: 'Europe', parties: 41, total: 44, x: 340, y: 80, w: 110, h: 60, color: C.green },
  { id: 'americas', name: 'Americas', parties: 28, total: 35, x: 120, y: 130, w: 130, h: 100, color: C.green },
  { id: 'asia', name: 'Asia-Pacific', parties: 19, total: 55, x: 480, y: 110, w: 130, h: 90, color: C.yellow },
  { id: 'mena', name: 'Middle East', parties: 2, total: 17, x: 400, y: 120, w: 60, h: 50, color: C.red },
];

const NOTABLE_NON_PARTIES = [
  { country: 'United States', reason: 'Fears politically motivated prosecution of U.S. military personnel and officials. Signed the Rome Statute under Clinton (2000) but Bush "unsigned" it in 2002. Has enacted the American Service-Members\' Protection Act (dubbed the "Hague Invasion Act") authorizing the President to use force to free Americans detained by the ICC. Under Trump, imposed sanctions on ICC officials investigating U.S. and Israeli conduct.' },
  { country: 'Russia', reason: 'Signed the Rome Statute in 2000 but withdrew its signature in 2016 after the ICC classified Russian actions in Crimea as an occupation. The ICC subsequently issued an arrest warrant for President Putin in 2023 over the deportation of Ukrainian children. Russia views the ICC as a tool of Western geopolitical interests and rejects its authority.' },
  { country: 'China', reason: 'Never signed the Rome Statute. Opposes the ICC on sovereignty grounds, arguing that international criminal justice should operate through the UNSC (where China has a veto). Concerned about potential investigations into Tibet, Xinjiang, and Hong Kong. China also shields allies (Myanmar, Sudan) from ICC action at the UNSC.' },
  { country: 'India', reason: 'Participated in Rome Statute negotiations but ultimately voted against adoption. Objections center on the inclusion of internal armed conflicts within ICC jurisdiction (India faces numerous insurgencies), the crime of aggression definition, and the prosecutor\'s proprio motu powers. India prefers bilateral and regional justice mechanisms.' },
  { country: 'Israel', reason: 'Signed but never ratified the Rome Statute. Withdrew its signature in 2002 after the inclusion of settlement activity as a war crime (Art. 8(2)(b)(viii)). Rejects the ICC investigation into the Palestine situation entirely, arguing Palestine is not a state. The 2024 arrest warrants for Israeli officials represented a dramatic escalation of the jurisdictional conflict.' },
];

const ICC_WITHDREW = [
  { country: 'Burundi', year: 2017, reason: 'Withdrew after the ICC opened a preliminary examination into the 2015 political crisis. First country to leave the Rome Statute. President Nkurunziza\'s government called the ICC a tool of Western powers.' },
  { country: 'Philippines', year: 2019, reason: 'Withdrew after the ICC opened a preliminary examination into President Duterte\'s "war on drugs" that killed thousands of suspected drug dealers and users. The ICC ruled it retains jurisdiction over crimes committed during membership.' },
];

// ── Scholarly Micro-Content Tooltips ─────────────────────────
const CICC_TIPS = {
  complementarity: "The ICC's complementarity principle (Article 17 of the Rome Statute) means the court only acts when national courts are 'unwilling or unable genuinely' to prosecute. This creates a perverse incentive structure: states can conduct sham investigations \u2014 opening cases with no intention of prosecution \u2014 specifically to block ICC jurisdiction. Libya, Sudan, and Kenya have all been accused of using domestic proceedings as a jurisdictional shield. The principle was designed to respect sovereignty, but it provides a playbook for avoiding accountability.",
  rome_statute: "122 states are parties to the Rome Statute, but the United States, Russia, China, India, and Israel are not \u2014 meaning the court's legitimacy is structurally compromised by the absence of the world's major military powers. The U.S. position is particularly contradictory: it has supported ICC referrals to investigate adversaries (Sudan, Libya) while threatening sanctions against ICC personnel who investigate American conduct. The court operates in a system where the most powerful actors are exempt from its jurisdiction by choice.",
  victor_justice: "The ICC faced sustained criticism for prosecuting only African situations in its first 20 years of operation. All early situations were either self-referred by African states or referred by the UN Security Council \u2014 but the optics of selectivity undermined the court's universalist claim. The African Union formally accused the ICC of 'hunting Africans.' The court has since opened investigations in Georgia, Bangladesh/Myanmar, and Ukraine, but the legacy of perceived selectivity remains a legitimacy problem that shapes every new investigation.",
};

// ── Component ────────────────────────────────────────────────
function CiccView({ setView }) {
  const [mode, setMode] = useState('analysis');
  const [selectedSituation, setSelectedSituation] = useState(0);
  const [expandedDimension, setExpandedDimension] = useState(null);
  const [expandedFramework, setExpandedFramework] = useState(null);
  const [revealedAnalyses, setRevealedAnalyses] = useState({});
  const [tipId, setTipId] = useState(null);

  // Jurisdiction tree state
  const [selectedTreeNode, setSelectedTreeNode] = useState(null);

  // Map state
  const [selectedNonParty, setSelectedNonParty] = useState(null);
  const [selectedWithdrew, setSelectedWithdrew] = useState(null);

  // ── Scholarly Micro-Icons & Tooltip ──────────────────────────
  function Tip({ id }) {
    if (tipId !== id || !CICC_TIPS[id]) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(8,10,16,.92)', border: '1px solid ' + C.accent + '25', borderRadius: 3, maxWidth: 440, fontSize: 11, fontFamily: Mono, color: C.tx2, lineHeight: 1.65, margin: '6px 0 10px' }}>
        {CICC_TIPS[id]}
      </div>
    );
  }

  const ScalesIcon = () => (
    <svg width="24" height="22" viewBox="0 0 24 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='complementarity'?null:'complementarity')}>
      <line x1="12" y1="2" x2="12" y2="18" stroke="currentColor" strokeWidth=".8"/>
      <line x1="4" y1="4" x2="20" y2="4" stroke="currentColor" strokeWidth=".8"/>
      <path d="M2 10 L4 4 L6 10" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <path d="M2 10 Q4 12 6 10" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <path d="M18 8 L20 4 L22 8" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <path d="M18 8 Q20 10 22 8" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <line x1="8" y1="18" x2="16" y2="18" stroke="currentColor" strokeWidth=".8"/>
    </svg>
  );

  const StatuteIcon = () => (
    <svg width="20" height="24" viewBox="0 0 20 24" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='rome_statute'?null:'rome_statute')}>
      <path d="M4 4 L10 2 L16 4 L16 20 L10 22 L4 20 Z" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <line x1="7" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth=".4"/>
      <line x1="7" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth=".4"/>
      <line x1="7" y1="14" x2="11" y2="14" stroke="currentColor" strokeWidth=".4"/>
    </svg>
  );

  const GavelIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='victor_justice'?null:'victor_justice')}>
      <rect x="3" y="8" width="8" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth=".7" transform="rotate(-45 7 10)"/>
      <line x1="10" y1="13" x2="16" y2="19" stroke="currentColor" strokeWidth=".8"/>
      <line x1="4" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );

  const toggleReveal = useCallback((sitId, dimId) => {
    const key = sitId + ':' + dimId;
    setRevealedAnalyses(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const revealedCount = useMemo(() =>
    Object.values(revealedAnalyses).filter(Boolean).length,
    [revealedAnalyses],
  );

  // ── Mode Switch ──────────────────────────────────────────
  const allModes = [
    { id: 'analysis', label: 'Analysis', desc: '4 Situations' },
    { id: 'framework', label: 'Framework', desc: 'Rome Statute' },
    { id: 'jurisdiction', label: 'Jurisdiction', desc: 'Decision Tree' },
    { id: 'map', label: 'Map', desc: 'Member States' },
  ];

  // ── Analysis Renderer ─────────────────────────────────────
  const renderAnalysis = useCallback(() => {
    const sit = SITUATIONS[selectedSituation];
    return (
      <div>
        {/* Situation selector */}
        <div style={{
          display: 'flex', gap: 3, marginBottom: 20, overflowX: 'auto', paddingBottom: 4,
        }}>
          {SITUATIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSelectedSituation(i)}
              style={{
                flex: '1 0 auto', padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
                background: i === selectedSituation ? C.accentBg : 'transparent',
                border: i === selectedSituation ? '1px solid ' + C.accentDm : '1px solid ' + C.line,
                transition: 'all .12s ease',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 12, fontWeight: 600,
                color: i === selectedSituation ? C.accent : C.tx3, display: 'block',
              }}>
                {s.name}
              </span>
              <span style={{
                fontFamily: Sans, fontSize: 11,
                color: i === selectedSituation ? C.tx2 : C.tx3,
              }}>
                {s.period}
              </span>
            </button>
          ))}
        </div>

        {/* Situation briefing */}
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 8, padding: 28, marginBottom: 16,
        }}>
          <div style={{
            fontFamily: Mono, fontSize: 11, letterSpacing: '.1em',
            color: C.accentDm, marginBottom: 6,
          }}>
            SITUATION BRIEFING
          </div>
          <h2 style={{
            fontFamily: Serif, fontSize: 26, fontWeight: 700,
            color: C.tx, marginBottom: 6,
          }}>
            {sit.name}
          </h2>
          <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, marginBottom: 4 }}>
            {sit.period}
          </div>
          <div style={{
            fontFamily: Mono, fontSize: 12, color: C.gold, marginBottom: 16,
            padding: '4px 10px', background: C.accentBg, borderRadius: 4, display: 'inline-block',
          }}>
            Referral: {sit.referral}
          </div>

          <div style={{
            fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
            paddingLeft: 16, borderLeft: '3px solid ' + C.accentDm, marginBottom: 20,
          }}>
            {sit.background}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12, marginBottom: 24,
          }}>
            <div style={{ background: C.accentBg, borderRadius: 6, padding: '10px 14px', border: '1px solid ' + C.line }}>
              <div style={{ fontFamily: Mono, fontSize: 11, color: C.accentDm, marginBottom: 4, letterSpacing: '.08em' }}>CHARGES</div>
              <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.65 }}>{sit.charges}</div>
            </div>
            <div style={{ background: C.accentBg, borderRadius: 6, padding: '10px 14px', border: '1px solid ' + C.line }}>
              <div style={{ fontFamily: Mono, fontSize: 11, color: C.accentDm, marginBottom: 4, letterSpacing: '.08em' }}>ACCUSED</div>
              <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.65 }}>{sit.accused}</div>
            </div>
          </div>

          {/* Four dimensions */}
          <div style={{
            fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
            color: C.accent, marginBottom: 12, fontWeight: 600,
          }}>
            JURISDICTION ANALYSIS — 4 DIMENSIONS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FRAMEWORK.map(dim => {
              const data = sit.dimensions[dim.id];
              const revKey = sit.id + ':' + dim.id;
              const isRevealed = revealedAnalyses[revKey];
              const aColor = assessColors[data.assessment];
              return (
                <div key={dim.id} style={{
                  background: C.card, border: '1px solid ' + (isRevealed ? C.accentDm : C.cardBd),
                  borderRadius: 6, overflow: 'hidden', transition: 'border-color .15s ease',
                }}>
                  <button
                    onClick={() => toggleReveal(sit.id, dim.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                      padding: '14px 18px', cursor: 'pointer',
                      background: 'none', border: 'none', textAlign: 'left',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: Serif, fontSize: 15, fontWeight: 600, color: C.tx }}>
                        {dim.title}
                      </div>
                      <div style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{dim.subtitle}</div>
                    </div>
                    <span style={{
                      fontFamily: Mono, fontSize: 11, fontWeight: 700, color: aColor,
                      padding: '3px 8px', borderRadius: 3,
                      background: data.assessment === 'strong' ? C.greenBg : data.assessment === 'moderate' ? C.yellowBg : C.redBg,
                    }}>
                      {assessLabels[data.assessment]}
                    </span>
                    <span style={{
                      fontFamily: Mono, fontSize: 14, color: C.tx3,
                      transition: 'transform .15s ease',
                      transform: isRevealed ? 'rotate(90deg)' : 'rotate(0)',
                    }}>
                      {'\u25B6'}
                    </span>
                  </button>

                  {isRevealed && (
                    <div style={{
                      padding: '0 18px 18px', borderTop: '1px solid ' + C.line, paddingTop: 14,
                    }}>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75,
                      }}>
                        {data.analysis}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reveal progress */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: Mono, fontSize: 12, color: C.tx3,
        }}>
          <span>ANALYSES EXPLORED</span>
          <div style={{ flex: 1, maxWidth: 160, height: 4, background: C.line, borderRadius: 2 }}>
            <div style={{
              width: (revealedCount / 16 * 100) + '%',
              height: '100%', borderRadius: 2,
              background: revealedCount === 16 ? C.green : C.accent,
              transition: 'width .3s ease',
            }} />
          </div>
          <span style={{ color: revealedCount === 16 ? C.green : C.accent }}>
            {revealedCount}/16
          </span>
        </div>
      </div>
    );
  }, [selectedSituation, revealedAnalyses, revealedCount, toggleReveal]);

  // ── Framework Renderer ────────────────────────────────────
  const renderFramework = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          ROME STATUTE — JURISDICTION FRAMEWORK
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          The Rome Statute of the International Criminal Court, adopted in 1998 and entered
          into force in 2002, established the world's first permanent international criminal court.
          The ICC has jurisdiction over genocide, crimes against humanity, war crimes, and the
          crime of aggression. However, jurisdiction is not automatic — it must be established
          through a rigorous legal framework.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <StatuteIcon /><Tip id="rome_statute" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FRAMEWORK.map(f => {
            const isOpen = expandedFramework === f.id;
            return (
              <div key={f.id} style={{
                background: C.card, border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
                borderRadius: 8, overflow: 'hidden', transition: 'border-color .15s ease',
              }}>
                <button
                  onClick={() => setExpandedFramework(prev => prev === f.id ? null : f.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: Serif, fontSize: 17, fontWeight: 600, color: C.tx }}>
                      {f.title}
                    </div>
                    <div style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{f.subtitle}</div>
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
                      {f.explanation}
                    </div>

                    <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 8, letterSpacing: '.06em' }}>
                      KEY CRITERIA
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                      {f.criteria.map((cr, i) => (
                        <li key={i} style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx2,
                          lineHeight: 1.65, padding: '4px 0 4px 16px',
                          borderLeft: '2px solid ' + C.line, marginBottom: 4,
                        }}>
                          {cr}
                        </li>
                      ))}
                    </ul>

                    <div style={{
                      background: C.accentBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{ fontFamily: Mono, fontSize: 11, color: C.accentDm, marginBottom: 6, letterSpacing: '.06em' }}>
                        ILLUSTRATIVE CASE
                      </div>
                      <div style={{ fontFamily: Serif, fontSize: 13, color: C.gold, lineHeight: 1.7 }}>
                        {f.keyCase}
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
  }, [expandedFramework]);

  // ── Jurisdiction Decision Tree Renderer ────────────────────
  const renderJurisdiction = () => {
    const selNode = selectedTreeNode ? TREE_NODES.find(n => n.id === selectedTreeNode) : null;

    return (
      <div>
        <div style={{ padding: '14px 18px', background: C.accentBg, border: `1px solid ${C.accent}20`, borderRadius: 6, marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontFamily: Serif, color: C.tx, lineHeight: 1.6, margin: 0 }}>
            How does the ICC determine whether it has jurisdiction over a situation? This flowchart traces the legal decision tree from the Rome Statute. Click any node to see real-world examples of how each gateway has been applied.
          </p>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 8, padding: 16, overflowX: 'auto' }}>
          <svg viewBox="0 0 700 610" width="100%" style={{ maxWidth: 700, display: 'block', margin: '0 auto' }}>
            <defs>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <marker id="arrowYes" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill={C.green} />
              </marker>
              <marker id="arrowNo" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill={C.red} />
              </marker>
            </defs>

            {/* Draw edges */}
            {TREE_EDGES.map((edge, i) => {
              const from = TREE_NODES.find(n => n.id === edge.from);
              const to = TREE_NODES.find(n => n.id === edge.to);
              const isYes = edge.label === 'YES';
              const fromCx = from.x + from.w / 2;
              const fromCy = from.y + from.h / 2;
              const toCx = to.x + to.w / 2;
              const toCy = to.y + to.h / 2;

              // Calculate edge endpoints on node boundaries
              let x1, y1, x2, y2;
              if (Math.abs(fromCy - toCy) > Math.abs(fromCx - toCx)) {
                // Vertical dominant
                x1 = fromCx; y1 = fromCy + from.h / 2;
                x2 = toCx; y2 = toCy - to.h / 2;
              } else {
                // Horizontal dominant
                if (toCx < fromCx) {
                  x1 = fromCx - from.w / 2; y1 = fromCy;
                  x2 = toCx + to.w / 2; y2 = toCy;
                } else {
                  x1 = fromCx + from.w / 2; y1 = fromCy;
                  x2 = toCx - to.w / 2; y2 = toCy;
                }
              }

              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;

              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={isYes ? C.green : C.red} strokeWidth="1.5" opacity="0.6"
                    markerEnd={isYes ? 'url(#arrowYes)' : 'url(#arrowNo)'} />
                  <rect x={midX - 14} y={midY - 8} width="28" height="16" rx="3"
                    fill={isYes ? `${C.green}30` : `${C.red}30`} />
                  <text x={midX} y={midY + 4} textAnchor="middle"
                    fill={isYes ? C.green : C.red} fontSize="8" fontWeight="700" fontFamily="Inter">
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Draw nodes */}
            {TREE_NODES.map(node => {
              const isSelected = selectedTreeNode === node.id;
              const isDecision = node.type === 'decision';
              const isGreen = node.type === 'end_green';
              const isRed = node.type === 'end_red';

              const fillColor = isDecision
                ? (isSelected ? `${C.accent}30` : `${C.accent}12`)
                : isGreen
                  ? (isSelected ? `${C.green}30` : `${C.green}15`)
                  : (isSelected ? `${C.red}30` : `${C.red}15`);
              const strokeColor = isDecision ? C.accent : isGreen ? C.green : C.red;
              const textColor = isDecision ? C.tx : isGreen ? C.green : C.red;

              const lines = node.label.split('\n');

              if (isDecision) {
                // Diamond shape
                const cx = node.x + node.w / 2;
                const cy = node.y + node.h / 2;
                const hw = node.w / 2;
                const hh = node.h / 2;
                return (
                  <g key={node.id} style={{ cursor: node.detail ? 'pointer' : 'default' }}
                    onClick={() => node.detail && setSelectedTreeNode(isSelected ? null : node.id)}>
                    <polygon
                      points={`${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`}
                      fill={fillColor} stroke={strokeColor}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      filter={isSelected ? 'url(#nodeGlow)' : undefined}
                    />
                    {lines.map((line, li) => (
                      <text key={li} x={cx} y={cy - (lines.length - 1) * 5 + li * 10 + 3}
                        textAnchor="middle" fill={textColor} fontSize="8" fontFamily="Inter"
                        fontWeight={isSelected ? '700' : '400'}>
                        {line}
                      </text>
                    ))}
                  </g>
                );
              } else {
                // Rectangular outcome node
                return (
                  <g key={node.id} style={{ cursor: node.detail ? 'pointer' : 'default' }}
                    onClick={() => node.detail && setSelectedTreeNode(isSelected ? null : node.id)}>
                    <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="6"
                      fill={fillColor} stroke={strokeColor}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      filter={isSelected ? 'url(#nodeGlow)' : undefined}
                    />
                    {lines.map((line, li) => (
                      <text key={li} x={node.x + node.w / 2} y={node.y + node.h / 2 - (lines.length - 1) * 5 + li * 10 + 3}
                        textAnchor="middle" fill={textColor} fontSize="9" fontWeight="700" fontFamily="Inter">
                        {line}
                      </text>
                    ))}
                  </g>
                );
              }
            })}

            {/* Title */}
            <text x="350" y="600" textAnchor="middle" fill={C.tx3} fontSize="8" fontFamily="Inter">
              Rome Statute Jurisdiction Decision Tree — Click nodes for real-world examples
            </text>
          </svg>
        </div>

        {/* Detail panel */}
        {selNode && selNode.detail && (
          <div style={{ marginTop: 16, padding: 18, background: C.card, border: `1px solid ${C.accent}30`, borderRadius: 8 }}>
            <div style={{ fontFamily: Mono, fontSize: 11, color: C.accentDm, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
              REAL-WORLD EXAMPLE
            </div>
            <h4 style={{ fontFamily: Serif, fontSize: 16, color: selNode.type === 'end_green' ? C.green : selNode.type === 'end_red' ? C.red : C.accent, margin: '0 0 8px', fontWeight: 600 }}>
              {selNode.label.replace(/\n/g, ' ')}
            </h4>
            <p style={{ fontSize: 13, fontFamily: Serif, color: C.tx, lineHeight: 1.7, margin: 0 }}>
              {selNode.detail}
            </p>
          </div>
        )}
      </div>
    );
  };

  // ── Map Renderer ──────────────────────────────────────────
  const renderMap = () => {
    return (
      <div>
        <div style={{ padding: '14px 18px', background: C.accentBg, border: `1px solid ${C.accent}20`, borderRadius: 6, marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontFamily: Serif, color: C.tx, lineHeight: 1.6, margin: 0 }}>
            As of 2024, 124 states are parties to the Rome Statute, 2 have withdrawn, and some of the world's most powerful nations remain outside the system. This visualization shows the geographic distribution of ICC membership and explores why key states have chosen not to join.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <GavelIcon /><Tip id="victor_justice" />
        </div>

        {/* SVG Map */}
        <div style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 8, padding: 16, overflowX: 'auto' }}>
          <svg viewBox="0 0 700 350" width="100%" style={{ maxWidth: 700, display: 'block', margin: '0 auto' }}>
            <defs>
              <filter id="regionGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Background ocean */}
            <rect x="0" y="0" width="700" height="350" fill={`${C.accent}05`} rx="8" />

            {/* Simplified continental blocks */}
            {/* Americas */}
            <path d="M 80,40 L 150,35 L 190,80 L 210,120 L 200,160 L 180,200 L 160,250 L 140,290 L 120,300 L 100,280 L 90,240 L 80,200 L 70,160 L 60,120 L 70,80 Z"
              fill={`${C.green}20`} stroke={C.green} strokeWidth="1.5" opacity="0.7" />
            <text x="130" y="160" textAnchor="middle" fill={C.green} fontSize="10" fontWeight="600" fontFamily="Inter">Americas</text>
            <text x="130" y="175" textAnchor="middle" fill={C.tx2} fontSize="8" fontFamily="Inter">28/35 parties</text>

            {/* Europe */}
            <path d="M 290,30 L 380,25 L 430,40 L 440,70 L 420,100 L 390,110 L 340,105 L 310,90 L 280,70 L 275,50 Z"
              fill={`${C.green}25`} stroke={C.green} strokeWidth="1.5" opacity="0.8" />
            <text x="360" y="65" textAnchor="middle" fill={C.green} fontSize="10" fontWeight="700" fontFamily="Inter">Europe</text>
            <text x="360" y="80" textAnchor="middle" fill={C.tx2} fontSize="8" fontFamily="Inter">41/44 parties</text>

            {/* Africa */}
            <path d="M 310,120 L 380,110 L 420,130 L 430,170 L 420,220 L 400,260 L 370,280 L 340,290 L 320,270 L 305,230 L 300,190 L 295,150 Z"
              fill={`${C.green}18`} stroke={C.green} strokeWidth="1.5" opacity="0.65" />
            <text x="360" y="195" textAnchor="middle" fill={C.green} fontSize="10" fontWeight="600" fontFamily="Inter">Africa</text>
            <text x="360" y="210" textAnchor="middle" fill={C.tx2} fontSize="8" fontFamily="Inter">33/54 parties</text>

            {/* Middle East */}
            <path d="M 410,90 L 460,85 L 480,110 L 470,140 L 440,150 L 415,135 L 405,110 Z"
              fill={`${C.red}20`} stroke={C.red} strokeWidth="1.5" opacity="0.7" />
            <text x="443" y="118" textAnchor="middle" fill={C.red} fontSize="9" fontWeight="600" fontFamily="Inter">MENA</text>
            <text x="443" y="130" textAnchor="middle" fill={C.tx2} fontSize="7" fontFamily="Inter">2/17</text>

            {/* Asia-Pacific */}
            <path d="M 480,60 L 580,50 L 640,80 L 660,130 L 650,180 L 620,220 L 570,240 L 530,230 L 500,200 L 490,160 L 480,120 L 470,90 Z"
              fill={`${C.yellow}15`} stroke={C.yellow} strokeWidth="1.5" opacity="0.6" />
            <text x="570" y="140" textAnchor="middle" fill={C.yellow} fontSize="10" fontWeight="600" fontFamily="Inter">Asia-Pacific</text>
            <text x="570" y="155" textAnchor="middle" fill={C.tx2} fontSize="8" fontFamily="Inter">19/55 parties</text>

            {/* Notable non-party markers */}
            {[
              { label: 'US', x: 140, y: 100, color: C.red },
              { label: 'RUS', x: 460, y: 50, color: C.red },
              { label: 'CHN', x: 530, y: 100, color: C.red },
              { label: 'IND', x: 500, y: 150, color: C.red },
              { label: 'ISR', x: 430, y: 110, color: C.red },
            ].map(m => (
              <g key={m.label}>
                <circle cx={m.x} cy={m.y} r="10" fill={`${m.color}30`} stroke={m.color} strokeWidth="1.5" />
                <text x={m.x} y={m.y + 3} textAnchor="middle" fill={m.color} fontSize="7" fontWeight="700" fontFamily="Inter">
                  {m.label}
                </text>
              </g>
            ))}

            {/* Withdrew markers */}
            {[
              { label: 'BDI', x: 375, y: 220, color: C.amber },
              { label: 'PHL', x: 590, y: 180, color: C.amber },
            ].map(m => (
              <g key={m.label}>
                <circle cx={m.x} cy={m.y} r="10" fill={`${m.color}30`} stroke={m.color} strokeWidth="1.5" strokeDasharray="3,2" />
                <text x={m.x} y={m.y + 3} textAnchor="middle" fill={m.color} fontSize="7" fontWeight="700" fontFamily="Inter">
                  {m.label}
                </text>
              </g>
            ))}

            {/* Legend */}
            <g transform="translate(10, 305)">
              <rect width="680" height="38" rx="4" fill={`${C.accent}08`} />
              {[
                { color: C.green, label: 'State Party (124)', x: 20 },
                { color: C.red, label: 'Non-Party (notable)', x: 180 },
                { color: C.amber, label: 'Withdrew (2)', x: 370 },
              ].map(l => (
                <g key={l.label} transform={`translate(${l.x}, 14)`}>
                  <circle cx="0" cy="5" r="5" fill={`${l.color}40`} stroke={l.color} strokeWidth="1.5" />
                  <text x="12" y="9" fill={C.tx2} fontSize="9" fontFamily="Inter">{l.label}</text>
                </g>
              ))}
              <text x="540" y="23" fill={C.tx3} fontSize="8" fontFamily="Inter">
                Total UN members: 193
              </text>
            </g>
          </svg>
        </div>

        {/* Summary stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginTop: 16, marginBottom: 20 }}>
          {[
            { label: 'STATE PARTIES', value: '124', color: C.green, sub: '64% of UN members' },
            { label: 'SIGNED ONLY', value: '31', color: C.yellow, sub: 'Not yet ratified' },
            { label: 'NON-PARTIES', value: '41', color: C.red, sub: 'Never signed' },
            { label: 'WITHDREW', value: '2', color: C.amber, sub: 'Burundi, Philippines' },
          ].map(s => (
            <div key={s.label} style={{ padding: '12px 14px', background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 6, textAlign: 'center' }}>
              <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, letterSpacing: 1.5, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: Mono, fontSize: 22, color: s.color, fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Notable Non-Parties */}
        <div style={{ fontFamily: Mono, fontSize: 12, color: C.accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12, fontWeight: 600 }}>
          NOTABLE NON-PARTIES — WHY THEY HAVEN'T JOINED
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {NOTABLE_NON_PARTIES.map(np => {
            const isOpen = selectedNonParty === np.country;
            return (
              <div key={np.country} style={{ background: C.card, border: `1px solid ${isOpen ? C.red + '50' : C.cardBd}`, borderRadius: 6, overflow: 'hidden', transition: 'border-color .15s' }}>
                <button
                  onClick={() => setSelectedNonParty(isOpen ? null : np.country)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: Mono, fontSize: 11, fontWeight: 700, color: C.red, padding: '2px 6px', borderRadius: 3, background: `${C.red}15` }}>NON-PARTY</span>
                    <span style={{ fontFamily: Serif, fontSize: 15, color: C.tx, fontWeight: 600 }}>{np.country}</span>
                  </div>
                  <span style={{ fontSize: 12, color: C.tx3, transition: 'transform .15s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }}>{'\u25B6'}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 16px 14px', borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
                    <p style={{ fontSize: 13, fontFamily: Serif, color: C.tx, lineHeight: 1.7, margin: 0 }}>{np.reason}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Withdrew States */}
        <div style={{ fontFamily: Mono, fontSize: 12, color: C.amber, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12, fontWeight: 600 }}>
          STATES THAT WITHDREW
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ICC_WITHDREW.map(ws => {
            const isOpen = selectedWithdrew === ws.country;
            return (
              <div key={ws.country} style={{ background: C.card, border: `1px solid ${isOpen ? C.amber + '50' : C.cardBd}`, borderRadius: 6, overflow: 'hidden', transition: 'border-color .15s' }}>
                <button
                  onClick={() => setSelectedWithdrew(isOpen ? null : ws.country)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: Mono, fontSize: 11, fontWeight: 700, color: C.amber, padding: '2px 6px', borderRadius: 3, background: `${C.amber}15` }}>WITHDREW {ws.year}</span>
                    <span style={{ fontFamily: Serif, fontSize: 15, color: C.tx, fontWeight: 600 }}>{ws.country}</span>
                  </div>
                  <span style={{ fontSize: 12, color: C.tx3, transition: 'transform .15s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }}>{'\u25B6'}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 16px 14px', borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
                    <p style={{ fontSize: 13, fontFamily: Serif, color: C.tx, lineHeight: 1.7, margin: 0 }}>{ws.reason}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Main Render ────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', color: C.tx, fontFamily: Sans, position:'relative',
      background: 'linear-gradient(180deg, #060810 0%, #080c18 40%, #060810 100%)',
    }}>
      <IccCrestBg />
      {/* Subtle vertical pinstripe pattern */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0, pointerEvents:'none', zIndex:0,
        backgroundImage:'repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(48,80,140,.02) 59px, rgba(48,80,140,.02) 60px)',
      }} />
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(6,8,16,.94)', backdropFilter: 'blur(12px)',
        borderBottom: '2px solid rgba(48,80,140,.2)', padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer',
        }}>
          {'\←'} Back to Coursework
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {/* Scales of justice mini icon */}
          <svg width="16" height="16" viewBox="0 0 20 20" style={{opacity:0.5}}>
            <line x1="10" y1="3" x2="10" y2="16" stroke={C.accent} strokeWidth="1.2" />
            <line x1="4" y1="7" x2="16" y2="7" stroke={C.accent} strokeWidth="1" />
            <path d="M4,7 L2,12 L6,12 Z" fill="none" stroke={C.accent} strokeWidth="0.8" />
            <path d="M16,7 L14,12 L18,12 Z" fill="none" stroke={C.accent} strokeWidth="0.8" />
            <rect x="7" y="16" width="6" height="2" rx="1" fill="none" stroke={C.accent} strokeWidth="0.8" />
          </svg>
          <span style={{ fontFamily: Mono, fontSize: 12, color: C.accent, letterSpacing:'.08em', fontWeight:600 }}>
            CICC/UN {'\u2014'} INTERNATIONAL CRIMINAL COURT
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position:'relative', zIndex:2 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display:'inline-block', padding:'3px 10px', marginBottom:12,
            background:'rgba(48,112,160,.06)', border:'1px solid rgba(48,80,140,.2)',
            borderRadius:2, fontFamily:Mono, fontSize:11, color:C.accent,
            letterSpacing:'.1em', fontWeight:600,
          }}>
            INTERNATIONAL JUSTICE
          </div>
          <h1 style={{
            fontFamily: Serif, fontSize: 32, fontWeight: 700,
            color: C.tx, letterSpacing: '-.03em', marginBottom: 8,
          }}>
            ICC Jurisdiction Analyzer
          </h1>
          <p style={{
            fontFamily: Serif, fontSize: 15, color: C.tx2,
            lineHeight: 1.6, marginBottom: 4, maxWidth: 720,
          }}>
            Evaluate four real-world ICC situations across four jurisdiction dimensions:
            complementarity, gravity, political barriers, and prosecution merit. Each analysis
            draws on Rome Statute principles, OTP policy, and the actual legal and political
            dynamics that determine whether international justice is achievable.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 6px' }}>
            <ScalesIcon /><Tip id="complementarity" />
          </div>
          <p style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3, lineHeight: 1.65, marginBottom: 12,
          }}>
            CICC Intern, UN Headquarters, Assembly of States Parties Observer
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

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>ANALYSES EXPLORED</span>
            <div style={{ flex: 1, maxWidth: 200, height: 4, background: C.line, borderRadius: 2 }}>
              <div style={{
                width: (revealedCount / 16 * 100) + '%', height: '100%', borderRadius: 2,
                background: revealedCount === 16 ? C.green : C.accent, transition: 'width .3s ease',
              }} />
            </div>
            <span style={{
              fontFamily: Mono, fontSize: 12,
              color: revealedCount === 16 ? C.green : C.accent,
            }}>
              {revealedCount}/16
            </span>
          </div>
        </div>

        {/* Mode tabs — formal legal tabs */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 24, flexWrap: 'wrap', borderBottom:'2px solid rgba(48,80,140,.15)' }}>
          {allModes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              style={{
                flex: 1, padding: '10px 12px', cursor: 'pointer',
                background: mode === m.id ? 'rgba(48,112,160,.08)' : 'transparent',
                border: 'none',
                borderBottom: mode === m.id ? '2px solid ' + C.accent : '2px solid transparent',
                borderTop: mode === m.id ? '1px solid rgba(48,80,140,.2)' : '1px solid transparent',
                textAlign: 'center', transition: 'all .15s ease', minWidth: 100,
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

        {mode === 'analysis' && renderAnalysis()}
        {mode === 'framework' && renderFramework()}
        {mode === 'jurisdiction' && renderJurisdiction()}
        {mode === 'map' && renderMap()}

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
