// CMAnalysisView.jsx — Product Format Switchboard
// Intelligence Communications (MPAI 5612)
//
// The visitor receives raw intelligence and must produce three different
// intelligence products from the same information. Each product has different
// format requirements, audiences, and time constraints — demonstrating mastery
// of intelligence communication across product types: PDB, IA, and IIR.

// ── Palette & Typography: Publications Office / Document Production ──

const CM_PALETTE = {
  bg: '#f8f6f0',
  card: '#ffffff',
  cardBd: '#d8d2c4',
  navy: '#1a2744',
  navyLt: '#2c3e5f',
  tx: '#1a2040',
  tx2: '#4a5268',
  tx3: '#8890a0',
  red: '#b01818',
  redBg: '#fff0f0',
  amber: '#9a6a10',
  amberBg: '#fdf8e8',
  green: '#1a5830',
  greenBg: '#edf8f0',
  blue: '#204888',
  blueBg: '#eaf0fa',
  tsSci: '#8b0000',
  secret: '#b01818',
  confid: '#204888',
  line: '#d4cfc4',
  bannerTs: '#8b0000',
  bannerS: '#b01818',
  bannerU: '#204888',
  highlight: '#fef8d0',
  paperTex: 'rgba(0,0,0,.015)',
};

const CM_SERIF = "'Georgia','Times New Roman','Source Serif 4',serif";
const CM_SANS = "'Inter',Helvetica,sans-serif";
const CM_MONO = "'IBM Plex Mono','Courier New',monospace";

// ── Paper texture overlay ──────────────────────────────────────
const PaperTexture = () => React.createElement('div', {
  style: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: 0,
    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,.018) 28px, rgba(0,0,0,.018) 29px)`,
    mixBlendMode: 'multiply',
  }
});

// Classification banner bar
const ClassBanner = ({ level, text }) => {
  const colors = {
    TS: { bg: '#8b0000', border: '#c03030', text: '#ffffff' },
    S: { bg: '#c8a020', border: '#e0b830', text: '#1a1000' },
    C: { bg: '#1a6830', border: '#28883a', text: '#ffffff' },
    U: { bg: '#204888', border: '#3060a0', text: '#ffffff' },
  };
  const c = colors[level] || colors.U;
  return React.createElement('div', {
    style: {
      background: c.bg, color: c.text, fontFamily: CM_MONO, fontSize: 12,
      letterSpacing: '.16em', textAlign: 'center', padding: '5px 0', fontWeight: 700,
      borderTop: '3px solid ' + c.border, borderBottom: '3px solid ' + c.border,
      textTransform: 'uppercase',
    }
  }, text);
};

// Government document card wrapper
const DocCard = ({ children, classification, style }) => React.createElement('div', {
  style: {
    background: '#ffffff', border: '1px solid #c8c0b0', borderRadius: 1,
    boxShadow: '2px 3px 12px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.06)',
    padding: 0, marginBottom: 20, overflow: 'hidden',
    ...style,
  }
},
  classification ? React.createElement('div', {
    style: {
      background: classification === 'TS' ? '#8b0000' : classification === 'S' ? '#c8a020' : '#204888',
      color: classification === 'S' ? '#1a1000' : '#fff',
      fontFamily: CM_MONO, fontSize: 10, letterSpacing: '.14em', textAlign: 'center',
      padding: '3px 0', fontWeight: 700, textTransform: 'uppercase',
    }
  }, classification === 'TS' ? 'TOP SECRET // SCI' : classification === 'S' ? 'SECRET' : 'CONFIDENTIAL') : null,
  React.createElement('div', { style: { padding: 20 } }, children)
);

// ── Skills & Provenance ──────────────────────────────────────

const CM_SKILLS = [
  "PDB Writing", "Intelligence Assessments", "IIR Formatting",
  "ICD-203 Confidence Language", "BLUF Construction", "Source Protection",
  "Classification Marking", "Analytic Tradecraft", "Key Judgments",
  "Dissemination Controls", "DNI Style Guide", "IC Writing Standards",
];

const CM_PROVENANCE = [
  { label: "ICD-203", desc: "Analytic Standards — confidence levels and sourcing" },
  { label: "IC Writing Standards", desc: "ODNI guidelines for clear intelligence writing" },
  { label: "DNI Style Guide", desc: "Formatting and classification marking conventions" },
  { label: "PDB Tradecraft", desc: "President's Daily Brief writing and presentation norms" },
];

// ── ICD-203 Confidence Levels ────────────────────────────────

const ICD203_LEVELS = [
  {
    level: "HIGH CONFIDENCE",
    definition: "Based on high-quality information from multiple independent sources. Well-corroborated analytic judgments whose underlying assumptions are strongly supported. Assessments at this level are unlikely to change substantially with additional information.",
    indicators: [
      "Multiple independent sources corroborate the judgment",
      "Information quality is high (direct access, technical collection)",
      "Underlying assumptions are well-established and tested",
      "Alternative explanations have been considered and found less compelling",
    ],
    usage: "We assess with high confidence that...",
    color: CM_PALETTE.green,
  },
  {
    level: "MODERATE CONFIDENCE",
    definition: "Credibly sourced and plausible but not of sufficient quality or corroboration to warrant a higher level. Information may come from a single credible source or multiple sources of lesser quality. Interpretation allows for alternative explanations.",
    indicators: [
      "Information is credibly sourced but from limited sources",
      "Plausible interpretation but alternatives exist",
      "Some assumptions are untested or rely on inference",
      "Additional collection could substantially change the assessment",
    ],
    usage: "We assess with moderate confidence that...",
    color: CM_PALETTE.amber,
  },
  {
    level: "LOW CONFIDENCE",
    definition: "Questionable or implausible information; cannot be adequately corroborated; or significant concerns about the source's reliability or access. Judgment is possible but the analytic foundation is thin.",
    indicators: [
      "Questionable or single-source information",
      "Cannot be adequately corroborated",
      "Significant concerns about source reliability or access",
      "High degree of uncertainty in underlying assumptions",
    ],
    usage: "We assess with low confidence that...",
    color: CM_PALETTE.red,
  },
];

// ── Modes ────────────────────────────────────────────────────

const CM_MODES = [
  { id: 'workshop', label: 'Workshop', icon: '\u270F' },
  { id: 'gallery', label: 'Gallery', icon: '\u{1F4CB}' },
  { id: 'standards', label: 'Standards', icon: '\u{1F4D6}' },
  { id: 'flow', label: 'Flow', icon: '\→' },
];

// ── Product Format Definitions ───────────────────────────────

const PRODUCT_FORMATS = [
  {
    id: 'pdb',
    name: "President's Daily Brief",
    abbrev: 'PDB',
    classification: 'TOP SECRET//SCI//NOFORN',
    bannerColor: CM_PALETTE.bannerTs,
    maxWords: 200,
    audience: 'POTUS (one reader, 45 seconds per article)',
    requirements: [
      'Bottom-Line Up Front (BLUF) — lead with the "so what"',
      'Maximum 200 words — every word must earn its place',
      'Action-oriented — what does the President need to know NOW',
      'No jargon, no acronyms unexplained, no hedging',
      'Crisp confidence language per ICD-203',
      'Implications for U.S. interests stated explicitly',
    ],
    sections: ['BLUF', 'Details', 'Implications', 'Outlook'],
    placeholders: {
      BLUF: 'Lead with the single most important takeaway for the President...',
      Details: 'Key supporting evidence in 2-3 sentences...',
      Implications: 'What this means for U.S. interests...',
      Outlook: 'What to watch for next...',
    },
  },
  {
    id: 'ia',
    name: 'Intelligence Assessment',
    abbrev: 'IA',
    classification: 'SECRET//NOFORN',
    bannerColor: CM_PALETTE.bannerS,
    maxWords: 1200,
    audience: 'Senior policymakers and military commanders (15-20 readers, 5 minutes)',
    requirements: [
      'Key Judgments section with numbered, standalone assertions',
      'Evidence summary with source characterization',
      'Explicit confidence levels per ICD-203 for each judgment',
      'Alternative analysis — at least one competing hypothesis',
      'Outlook section with indicators to watch',
      '800-1200 words total',
    ],
    sections: ['Key Judgments', 'Background', 'Evidence', 'Analysis', 'Alternative Analysis', 'Outlook'],
    placeholders: {
      'Key Judgments': '1. We assess with [confidence level] that...\n2. We judge that...',
      Background: 'Context the reader needs to understand this assessment...',
      Evidence: 'Summary of intelligence supporting the key judgments...',
      Analysis: 'Detailed analytic reasoning connecting evidence to judgments...',
      'Alternative Analysis': 'Competing hypotheses and why they are less compelling...',
      Outlook: 'Indicators to monitor and potential trajectories...',
    },
  },
  {
    id: 'iir',
    name: 'Intelligence Information Report',
    abbrev: 'IIR',
    classification: 'SECRET',
    bannerColor: CM_PALETTE.bannerU,
    maxWords: null,
    audience: 'All-source analysts downstream (analyst-to-analyst reporting)',
    requirements: [
      'Source description with reliability and access rating',
      'Structured who/what/when/where information content',
      'Clear separation of information from analyst comments',
      'Evaluation of information accuracy and completeness',
      'Dissemination controls and handling caveats',
      'No analytic judgments in the information section',
    ],
    sections: ['Source', 'Information', 'Comments', 'Evaluation', 'Dissemination'],
    placeholders: {
      Source: 'Source description, reliability rating (A-F), access characterization...',
      Information: '1. (U) WHO:\n2. (U) WHAT:\n3. (U) WHEN:\n4. (U) WHERE:\n5. (U) HOW (source acquired):',
      Comments: 'Analyst comments on context, corroboration, gaps...',
      Evaluation: 'Assessment of information accuracy, completeness, and potential for deception...',
      Dissemination: 'Handling instructions, further dissemination restrictions...',
    },
  },
];

// ── Raw Intelligence Scenarios ───────────────────────────────

const SCENARIOS = [
  {
    id: 'humint',
    title: 'HUMINT: Arms Dealer Meeting',
    collectionType: 'HUMINT',
    icon: '\u{1F464}',
    age: '72 hours',
    raw: `SOURCE: Controlled access agent (crypt: TOPAZ-7), B-2 reliability rating (usually reliable source, information probably true). TOPAZ-7 has reported accurately on 14 of 16 previous intelligence requirements over 3 years of tasking.

INFORMATION: On [date minus 72 hours], General Karim AL-RASHIDI, Deputy Chief of Staff for Procurement, Armed Forces of Country X, met with two individuals identified by source as Viktor PETROV and Dmitri SOKOLOV at the Grand Meridian Hotel, Suite 1204, Capital City of Country Z (neutral third country).

Meeting lasted approximately 3 hours (1400-1700 local time). Source was present in an adjacent room with audio access (wall-mounted listening device, quality: fair, intermittent).

Topics discussed per source:
- Pricing for "the package" — source believes this refers to an air defense system based on context from previous reporting
- Delivery timeline: PETROV stated "we can have it operational within 6 months of signature"
- Payment mechanism: discussion of third-country escrow arrangement
- AL-RASHIDI expressed urgency: "The situation in the south is becoming untenable. We cannot wait for the Americans to decide."

AL-RASHIDI was accompanied by one aide, Colonel Farid HASSAN, who took notes but did not speak.

Source departed before meeting concluded. Source assesses the meeting was "serious" and that AL-RASHIDI had authority to proceed. Source could not determine whether a deal was finalized.

HANDLING NOTE: TOPAZ-7 is a foreign national with access to diplomatic events in Country Z. Source motivation: financial (monthly stipend). Source is NOT a penetration of Country X's military — access is through social and diplomatic channels in Country Z.`,
  },
  {
    id: 'sigint',
    title: 'SIGINT: Operative Communications',
    collectionType: 'SIGINT',
    icon: '\u{1F4E1}',
    age: '48 hours',
    raw: `COLLECTION: Technical intercept of mobile communication, [date minus 48 hours], 0347Z. Circuit: commercial GSM network, Country Y. Selector A associated with DARKWIND-3 (known operative, moderate confidence identification based on voice pattern matching and device fingerprint). Selector B associated with DARKWIND-7 (known operative, moderate confidence identification, same basis).

PARTIAL TRANSCRIPT (translation from original language):

DARKWIND-3: "The timeline has moved. Ibrahim says the window is next week."
DARKWIND-7: "Which day? We are not ready for the capital."
DARKWIND-3: "He did not specify the day. But he was clear — it must happen before the delegation arrives."
DARKWIND-7: "The material is still in the warehouse. Moving it will take two days minimum."
DARKWIND-3: "Then start now. Use the secondary route. The primary is compromised."
DARKWIND-7: "Compromised how?"
DARKWIND-3: "I don't know. Ibrahim's people said the police made inquiries last Thursday."
DARKWIND-7: "This changes the logistics. I need to speak with [name unclear — possibly 'Yusuf' or 'Yunus'] about the vehicles."
DARKWIND-3: "Do what you need to do. But the timeline is fixed. Ibrahim will not change it."

[Call terminated — 2 minutes 14 seconds duration]

TECHNICAL NOTES: Intercept confidence: HIGH (clear audio, minimal interference). Speaker identification: MODERATE (voice match 78% for both selectors). Geolocation: Selector A in [city], Selector B in [different city, same country], approximately 340 km apart. Previous reporting links DARKWIND network to operational planning; no previous specific threat information.

HANDLING: This product derived from sensitive SIGINT methods and sources. Protect accordingly.`,
  },
  {
    id: 'geoint',
    title: 'GEOINT: Missile Facility Construction',
    collectionType: 'GEOINT',
    icon: '\u{1F6F0}',
    age: '24 hours',
    raw: `IMAGERY ANALYSIS REPORT
Collection Platform: National technical means
Date of Imagery: [date minus 24 hours], 1023 local time
Target: FOXFIRE-9 (known intermediate-range ballistic missile development and testing facility, Country W)
Coordinates: [redacted]
Cloud Cover: 12% (imagery quality: GOOD)

FINDINGS:

1. NEW CONSTRUCTION: Three (3) new buildings identified within the northern compound area, designated Buildings N-7, N-8, and N-9.
   - N-7: Dimensions approximately 60m x 40m. Flat roof with ventilation infrastructure consistent with climate-controlled laboratory or clean room environment. Construction appears 80% complete.
   - N-8: Dimensions approximately 45m x 30m. High-bay structure (estimated ceiling height 15m) with rail-accessible loading dock on eastern face. Construction appears 90% complete.
   - N-9: Dimensions approximately 25m x 25m. Hardened structure with reinforced concrete walls (shadow analysis indicates 2m+ wall thickness). Underground access visible on southern approach. Construction appears 60% complete.

2. VEHICLE TRAFFIC: Change detection analysis shows vehicle traffic on facility access roads has increased approximately 400% compared to baseline imagery from 90 days ago. Vehicle types include heavy transport trucks, construction equipment, and what appear to be military escort vehicles.

3. NEW ROAD: A paved access road (2-lane, approximately 3.2 km length) has been constructed connecting the northern compound to the existing rail line at the junction point 4 km northeast of the facility. Road construction is complete. Rail siding construction is approximately 70% complete.

4. CHANGE DETECTION: Comparison with archived imagery confirms construction activity began approximately 60 days ago. Prior to that, the northern compound area was undeveloped scrubland within the facility perimeter.

5. OTHER ACTIVITY: Thermal signatures from Building N-7 suggest internal activity (heating/cooling systems operational) despite construction being incomplete. Two satellite dish installations observed on N-7 roof — not present in imagery from 30 days ago.

ANALYST NOTE: Building dimensions and characteristics of N-8 are consistent with missile component assembly or integration facility based on comparison with similar facilities at [redacted] and [redacted]. N-9 characteristics are consistent with a hardened command-and-control or warhead storage bunker. N-7 purpose is less certain — could be laboratory, telemetry center, or administrative.`,
  },
];

// ── Expert Product Versions ──────────────────────────────────

const EXPERT_PRODUCTS = {
  humint: {
    pdb: {
      title: 'Country X Pursuing Advanced Air Defense System from Russian Brokers',
      sections: {
        BLUF: `Country X's deputy military chief met covertly with Russian arms brokers 72 hours ago to negotiate purchase of what we assess is an advanced air defense system, signaling deepening frustration with U.S. security assistance delays and a potential strategic realignment.`,
        Details: `A proven source with direct access reports that General Karim al-Rashidi met Viktor Petrov and Dmitri Sokolov at a neutral-country hotel for three hours. The discussion centered on pricing, a six-month delivery timeline, and a third-country payment channel. Al-Rashidi stated the situation in Country X's south "is becoming untenable" and expressed unwillingness to wait on Washington.`,
        Implications: `If consummated, this deal would mark Country X's first major Russian defense acquisition in two decades, complicate U.S. interoperability arrangements, and potentially trigger CAATSA sanctions obligations. Al-Rashidi's reference to the southern border suggests Country X views this as an urgent defensive need, not a political signal.`,
        Outlook: `We are monitoring for follow-on meetings and financial movements through the identified escrow channel. A deal signature could come within weeks. The upcoming bilateral defense dialogue offers a narrow window to address Country X's security concerns before the procurement becomes irreversible.`,
      },
      confidence: 'MODERATE',
    },
    ia: {
      title: 'Intelligence Assessment: Country X Military Procurement Shift Toward Russian Defense Systems',
      sections: {
        'Key Judgments': `1. We assess with MODERATE CONFIDENCE that Country X is actively negotiating the purchase of an advanced air defense system from Russian-linked arms brokers. This judgment is based on a single source with a strong track record who had direct access to a meeting between a senior Country X military official and known Russian defense intermediaries.

2. We assess with MODERATE CONFIDENCE that General al-Rashidi is acting with the knowledge of Country X's senior military leadership, given his position as Deputy Chief of Staff for Procurement and the seniority of the Russian interlocutors. We cannot confirm presidential authorization.

3. We judge with LOW CONFIDENCE that the system under discussion is an S-series air defense platform. This is based on source inference from prior reporting context, not direct observation of specifications or model numbers discussed in the meeting.

4. We assess with HIGH CONFIDENCE that Country X's procurement interest is driven by genuine security concerns about its southern border situation, not primarily as diplomatic leverage against the United States. Al-Rashidi's language and the operational urgency described by the source are consistent with a military requirement, not a negotiating tactic.`,
        Background: `Country X has been a U.S. security partner for three decades, receiving approximately $1.2 billion in U.S. defense assistance since 2010. However, Country X's pending requests for upgraded air defense capabilities have been delayed in the U.S. foreign military sales pipeline for 18 months due to Congressional holds and interagency review. During this period, Country X has faced an escalating threat from armed groups operating across its southern border, including at least three cross-border incursions in the past six months.`,
        Evidence: `Our primary source (B-2 reliability: usually reliable, information probably true) has provided 14 accurate reports across 16 taskings over three years. The source was positioned in an adjacent hotel room with audio monitoring capability during the meeting.

The source identified General Karim al-Rashidi, Deputy Chief of Staff for Procurement, meeting with Viktor Petrov and Dmitri Sokolov, both of whom appear in our databases as intermediaries with connections to Russian state defense export entities. The meeting occurred in a neutral third country, consistent with a pattern of sensitive defense negotiations conducted outside both parties' home territories.

Specific details reported include: a six-month delivery timeline, discussion of a third-country escrow payment arrangement, and al-Rashidi's statement expressing urgency related to "the situation in the south."`,
        Analysis: `The convergence of several factors supports the assessment that this represents a genuine procurement effort rather than preliminary exploration. First, al-Rashidi's rank and portfolio give him direct procurement authority. Second, the involvement of Petrov and Sokolov suggests Russian state-connected suppliers are engaged, not freelance brokers. Third, the discussion of specific timelines and payment mechanisms indicates negotiations have progressed beyond initial contact.

Al-Rashidi's remark about being unable to "wait for the Americans to decide" directly links this procurement initiative to frustration with delayed U.S. arms transfers. This is consistent with private complaints Country X officials have made to our diplomats over the past year.`,
        'Alternative Analysis': `An alternative explanation is that al-Rashidi is conducting this outreach as a deliberate signal to the United States to accelerate pending arms sales, without genuine intent to procure Russian systems. Country X has used similar tactics with other suppliers in the past. However, the operational security measures employed (neutral third country, no advance diplomatic notification) and the specificity of commercial discussions argue against a purely theatrical exercise.

A second alternative is that al-Rashidi is acting without senior authorization, pursuing a personal agenda or responding to a factional interest within the military. We cannot rule this out but assess it as less likely given the financial and diplomatic stakes involved.`,
        Outlook: `Key indicators to monitor: (1) Financial movements through third-country escrow channels associated with Petrov's network; (2) Follow-on meetings between Country X military officials and Russian defense intermediaries; (3) Changes in Country X's diplomatic messaging regarding pending U.S. arms sales; (4) Russian diplomatic activity toward Country X, particularly at the defense-ministerial level.

The upcoming U.S.-Country X bilateral defense dialogue in six weeks provides a potential inflection point. If Country X's procurement concerns are not addressed, the probability of a completed deal increases substantially.`,
      },
      confidence: 'MODERATE',
    },
    iir: {
      title: 'IIR: Meeting Between Country X Military Official and Suspected Russian Arms Intermediaries',
      sections: {
        Source: `SOURCE DESCRIPTION: Controlled access agent, cryptonym TOPAZ-7. Reliability: B (Usually Reliable). Information rating: 2 (Probably True). Source is a foreign national with access to diplomatic and social events in Country Z. Source has reported accurately on 14 of 16 previous intelligence requirements over 3 years of active tasking. Source motivation: financial (monthly stipend). Source is NOT a penetration of Country X's military; access to the reported meeting was through social and diplomatic channels in Country Z.`,
        Information: `1. (S) WHO: General Karim AL-RASHIDI, Deputy Chief of Staff for Procurement, Armed Forces of Country X. Accompanied by Colonel Farid HASSAN (aide, did not speak during observed portion). Meeting partners identified by source as Viktor PETROV and Dmitri SOKOLOV.

2. (S) WHAT: Meeting of approximately 3 hours duration at commercial hotel. Topics included: pricing for unspecified defense system (source assesses air defense based on context from prior reporting), delivery timeline of approximately 6 months, third-country escrow payment arrangement. AL-RASHIDI expressed urgency regarding "the situation in the south." Source departed before meeting conclusion and could not determine if agreement was reached.

3. (S) WHEN: [Date minus 72 hours], approximately 1400-1700 local time.

4. (S) WHERE: Grand Meridian Hotel, Suite 1204, Capital City, Country Z.

5. (S) HOW ACQUIRED: Source was positioned in adjacent room with wall-mounted audio monitoring device. Audio quality: fair, intermittent. Source departed prior to meeting conclusion.`,
        Comments: `ANALYST COMMENT: PETROV and SOKOLOV appear in existing reporting as intermediaries connected to Russian state defense export entities. Previous reporting (3 references) links both to facilitation of defense sales to countries under varying degrees of international restriction.

AL-RASHIDI's reference to "the situation in the south" is consistent with the ongoing border security challenge Country X has cited in diplomatic exchanges with the United States over the past 12 months.

Source could not identify the specific defense system under discussion. Source's assessment that it is an air defense system is based on source's familiarity with the context of previous tasking, not on specific technical details observed in this meeting.

GAP: Source departed before meeting concluded. It is unknown whether a deal was finalized, whether financial commitments were made, or whether follow-on meetings were scheduled.`,
        Evaluation: `Information assessment: PROBABLY TRUE. Source has a demonstrated track record (B-2). Source had plausible access to the reported event through established cover. Specific details (names, location, timing) are verifiable through complementary collection methods. The information is internally consistent and consistent with the broader intelligence picture regarding Country X's defense procurement frustrations.

POTENTIAL LIMITATIONS: Audio quality was fair and intermittent, meaning some content may have been missed or misheard. Source interpretation of "air defense system" is inferential. Source departed early, creating a gap in coverage of the meeting's outcome.`,
        Dissemination: `HANDLING: This report contains information from a sensitive human source. Protect source and methods. Do not discuss source identity, cryptonym, or access methodology in any forum below TS//SCI level.

DISSEMINATION: Authorized recipients per standing distribution list for Country X military reporting. Additional dissemination requires originator approval.

FEEDBACK REQUESTED: Consumers are requested to advise the originator of any information that corroborates or contradicts this report, particularly regarding (1) PETROV/SOKOLOV activities, (2) Country X defense procurement developments, (3) Russian defense export activities toward Country X.`,
      },
      confidence: 'N/A (raw reporting)',
    },
  },
  sigint: {
    pdb: {
      title: 'Threat Network Accelerates Operational Timeline in Country Y Capital',
      sections: {
        BLUF: `Known operatives in the DARKWIND network are moving to execute an unspecified operation in Country Y's capital before a visiting diplomatic delegation arrives, likely within the next seven days. They are adapting logistics after learning a transport route may be compromised.`,
        Details: `An intercepted call 48 hours ago between two DARKWIND operatives reveals an accelerated timeline directed by a figure called "Ibrahim." The operatives discussed moving unspecified "material" from a warehouse via a backup route, needing two days for transit. One operative noted police inquiries on their primary route.`,
        Implications: `The combination of a fixed deadline tied to a diplomatic visit, movement of material, and route security concerns is consistent with an operational attack or disruption plot. Country Y's capital hosts a major international conference next week — likely the "delegation" referenced. U.S. personnel will be present.`,
        Outlook: `We are surging collection against DARKWIND selectors and coordinating with Country Y's security services. The 48-hour information gap means logistics movement may already be underway. Recommend the embassy review its security posture immediately.`,
      },
      confidence: 'MODERATE',
    },
    ia: {
      title: 'Intelligence Assessment: DARKWIND Network Operational Planning Against Country Y Capital',
      sections: {
        'Key Judgments': `1. We assess with MODERATE CONFIDENCE that the DARKWIND network is planning an operation targeting Country Y's capital within the next seven days. This is based on a single intercepted communication between two operatives identified with moderate confidence, discussing an accelerated timeline and logistics movement.

2. We assess with LOW CONFIDENCE that the operation is timed to coincide with the international diplomatic delegation scheduled to visit Country Y's capital next week. The intercepted reference to "before the delegation arrives" is suggestive but the delegation is not specifically identified.

3. We judge with MODERATE CONFIDENCE that the operation involves physical materials requiring vehicle transport, based on references to a "warehouse," "material," and the need for "vehicles." The nature of the materials is unknown.

4. We assess with HIGH CONFIDENCE that the DARKWIND network believes at least one of its logistics routes has been detected by local law enforcement, based on the explicit reference to police inquiries. This may force operational adjustments that create additional collection opportunities.`,
        Background: `The DARKWIND network has appeared in previous SIGINT reporting as an operational planning cell with connections to regional extremist organizations. Previous reporting has linked the network to logistical support activities but no prior specific threat information has been collected. The network operates across at least two cities in Country Y, approximately 340 km apart.

Country Y's capital is scheduled to host an international conference next week with delegations from 12 countries, including senior U.S. officials.`,
        Evidence: `A technical intercept captured a 2-minute, 14-second mobile phone conversation between two DARKWIND-associated selectors. Intercept quality was high (clear audio). Speaker identification is at moderate confidence (78% voice match) for both individuals.

The conversation reveals: (a) an authority figure "Ibrahim" has directed an accelerated timeline; (b) the operation must occur "before the delegation arrives"; (c) unspecified "material" is currently in a "warehouse" and requires two days to move; (d) a primary transport route is believed compromised after police inquiries; (e) a secondary route will be used; (f) additional logistical coordination involving vehicles is required with a third individual.

The two operatives were geolocated to different cities, 340 km apart, suggesting the network maintains distributed logistics capability.`,
        Analysis: `The operational indicators in this intercept are concerning. The combination of a fixed external deadline, pre-positioned materials requiring transport, route planning with contingencies, and a distributed cell structure is consistent with preparations for a significant operational activity. The reference to police detection and route adaptation demonstrates operational security awareness.

The identity of "Ibrahim" as a directing authority suggests a hierarchical command structure. The operatives' deference to Ibrahim's timeline — and their statement that he "will not change it" — indicates the operation is planned, not aspirational.

However, significant gaps remain. We do not know: the nature of the "material," the specific target, the nature of the planned operation, or the size of the network beyond the three individuals referenced.`,
        'Alternative Analysis': `An alternative interpretation is that this communication relates to criminal smuggling activity rather than a terrorist or political violence operation. The DARKWIND network's previous reporting links are to logistical support, which could serve criminal as well as violent purposes. The reference to a "delegation" could be a business meeting rather than a diplomatic event.

We assess this alternative as possible but less likely given the network's known associations, the operational security measures employed, and the urgency language used.`,
        Outlook: `Critical indicators: (1) Movement of materials from warehouse locations in either city; (2) Additional communications between DARKWIND selectors; (3) Vehicle procurement or rental activity associated with known identifiers; (4) Contact with the third individual referenced in the call; (5) Any law enforcement reporting from Country Y regarding suspicious logistics activity.

The 48-hour gap between intercept and this assessment means preparatory movement may already be underway. Time-sensitive collection has been tasked.`,
      },
      confidence: 'MODERATE',
    },
    iir: {
      title: 'IIR: Intercepted Communication Between DARKWIND Network Operatives Discussing Operational Timeline',
      sections: {
        Source: `SOURCE DESCRIPTION: Technical intercept of mobile communication via commercial GSM network, Country Y. Collection time: [date minus 48 hours], 0347Z. Duration: 2 minutes, 14 seconds. Intercept confidence: HIGH (clear audio, minimal interference). This product is derived from sensitive SIGINT methods and sources.`,
        Information: `1. (S) WHO: Selector A associated with DARKWIND-3 (identification confidence: MODERATE, based on voice pattern matching at 78% and device fingerprint). Selector B associated with DARKWIND-7 (identification confidence: MODERATE, same basis). Third individual referenced: "Ibrahim" (directing authority, not on line). Fourth individual referenced: name unclear, possibly "Yusuf" or "Yunus" (logistics coordinator).

2. (S) WHAT: DARKWIND-3 informed DARKWIND-7 that "Ibrahim" has accelerated an unspecified operational timeline to "next week," prior to the arrival of an unidentified "delegation" in "the capital." Discussion included movement of unspecified "material" from a "warehouse" requiring minimum two days transit time, using a "secondary route" because the "primary is compromised" due to police inquiries. DARKWIND-7 stated need to coordinate vehicles with third party.

3. (S) WHEN: Communication intercepted [date minus 48 hours], 0347Z.

4. (S) WHERE: Selector A geolocated to [City A], Country Y. Selector B geolocated to [City B], Country Y. Cities are approximately 340 km apart. Operation referenced as occurring in "the capital" of Country Y.

5. (S) HOW ACQUIRED: Technical intercept of commercial GSM communication. Partial transcript provided. Full translated transcript available at originator upon request with appropriate clearances.`,
        Comments: `ANALYST COMMENT: DARKWIND network has appeared in previous SIGINT reporting (4 prior references) as an operational planning cell with connections to regional extremist organizations. Previous reporting has focused on logistical support activities. This is the first intercept containing specific temporal indicators for an operational action.

"Ibrahim" has not been previously identified in DARKWIND reporting. The deference shown by both operatives suggests he occupies a senior position in the network's command structure.

The reference to "the capital" and "the delegation" may refer to the international conference scheduled in Country Y's capital next week, but this is inferential — the intercept does not specify which delegation or event.

GAPS: Nature of "material" is unknown. Specific target or objective is unknown. Warehouse location is unknown. Identity of "Yusuf/Yunus" is unknown. Size of network beyond these individuals is unknown. Whether "compromised" primary route reflects actual law enforcement awareness or operative paranoia is unknown.`,
        Evaluation: `Information assessment: The communication itself is assessed as AUTHENTIC with high confidence based on collection quality. Speaker identifications are at MODERATE confidence. The information content is assessed as operationally significant but requires substantial additional context to evaluate the specific nature and severity of the threat described.

The 48-hour gap between intercept and this report may have allowed operational developments not yet captured in reporting.`,
        Dissemination: `HANDLING: TOP SECRET//SI//NOFORN. This report contains information derived from sensitive SIGINT sources and methods. Protect accordingly. Do not discuss collection methods, selectors, or geolocation data in any forum below TS//SI level.

DISSEMINATION: Per standing SIGINT dissemination guidelines. Law enforcement and diplomatic security channels as authorized by originator.

TIME-SENSITIVE COLLECTION TASKED: Additional collection against DARKWIND-associated selectors has been prioritized. Consumers will be notified of relevant follow-on reporting.`,
      },
      confidence: 'N/A (raw reporting)',
    },
  },
  geoint: {
    pdb: {
      title: 'Country W Rapidly Expanding Missile Facility with Assembly and Hardened Storage',
      sections: {
        BLUF: `Satellite imagery confirms Country W is building what we assess is a missile assembly plant and a hardened weapons storage bunker at its FOXFIRE-9 missile facility, with construction accelerating over the past 60 days and a new rail connection nearing completion.`,
        Details: `Imagery from 24 hours ago shows three new buildings, a 400 percent increase in vehicle traffic, and a new 3.2 km road connecting to the national rail network. One building matches the profile of a missile component integration hall. Another has 2-meter-thick reinforced walls consistent with a weapons-grade storage bunker. A third is already thermally active despite incomplete construction.`,
        Implications: `This expansion suggests Country W is moving toward production-scale missile capability, not just testing. The rail link enables heavy component delivery. The hardened bunker implies intent to store operational warheads on-site. This timeline is 18 months ahead of our previous estimate for this facility's expansion.`,
        Outlook: `We will monitor construction completion rates, the arrival of specialized equipment via the rail link, and any test-launch preparations. Building N-7's early activation warrants priority collection to determine its function.`,
      },
      confidence: 'HIGH (infrastructure), MODERATE (purpose)',
    },
    ia: {
      title: 'Intelligence Assessment: Significant Expansion of Country W FOXFIRE-9 Missile Facility',
      sections: {
        'Key Judgments': `1. We assess with HIGH CONFIDENCE that Country W is conducting a major expansion of its FOXFIRE-9 missile development facility, including at least three new structures, expanded transportation infrastructure, and a direct rail connection. This is based on high-resolution imagery from national technical means with change detection analysis over a 60-day baseline.

2. We assess with MODERATE CONFIDENCE that Building N-8 is intended for missile component assembly or integration, based on dimensional analysis and comparison with known facilities of similar function. The high-bay design with rail-accessible loading and 15-meter ceiling height is consistent with handling of intermediate-range ballistic missile components.

3. We assess with MODERATE CONFIDENCE that Building N-9 is a hardened storage facility, possibly for warheads or other sensitive ordnance. Wall thickness exceeding 2 meters and underground access are consistent with weapons-grade storage standards. Alternative uses (command bunker, data center) cannot be ruled out.

4. We assess with LOW CONFIDENCE regarding the purpose of Building N-7. Thermal signatures and satellite dish installations suggest active use as a laboratory or telemetry center, but the building's function cannot be determined from imagery alone.

5. We assess with HIGH CONFIDENCE that this expansion represents a significant acceleration of Country W's missile program infrastructure, occurring approximately 18 months ahead of previous projections for this facility.`,
        Background: `FOXFIRE-9 is a known intermediate-range ballistic missile development and testing facility that has been monitored for over a decade. Previous activity has been limited to the southern compound, which contains test stands, a motor casting building, and administrative structures. The northern compound had been undeveloped scrubland within the facility perimeter until construction began approximately 60 days ago.

Country W's missile program has historically been assessed as developmental, focused on testing and prototype work rather than production. This expansion may signal a transition toward production-scale capability.`,
        Evidence: `National technical means imagery collected 24 hours ago at good quality (12% cloud cover) reveals three new buildings in the northern compound of FOXFIRE-9:

Building N-7 (60m x 40m): Flat roof with ventilation infrastructure suggesting climate-controlled environment. Approximately 80% construction complete. Thermal signatures indicate internal systems are operational. Two satellite dishes installed within the past 30 days.

Building N-8 (45m x 30m): High-bay structure with estimated 15m ceiling, rail-accessible loading dock. Approximately 90% complete. Dimensional profile is consistent with known missile component assembly facilities.

Building N-9 (25m x 25m): Hardened structure, reinforced concrete walls exceeding 2m thickness per shadow analysis. Underground access on southern approach. Approximately 60% complete.

Supporting infrastructure: Vehicle traffic up 400% from 90-day baseline. New 2-lane paved road (3.2 km) connecting northern compound to existing rail line. Rail siding 70% complete at junction point.`,
        Analysis: `The scale and pace of construction indicate a well-resourced, high-priority expansion. Three simultaneous construction projects with dedicated road and rail infrastructure represent a significant capital investment. The 400% traffic increase reflects sustained heavy logistics activity.

The rail connection is particularly significant. Previous FOXFIRE-9 operations relied on road transport, which limits the size and weight of components that can be delivered. A direct rail link enables delivery of large missile components, heavy manufacturing equipment, or rocket motors — consistent with a transition from developmental to production-scale operations.

Building N-7's early activation (thermal and communications signatures while construction is incomplete) suggests urgency to bring this facility online, which may indicate it serves a time-sensitive function in the program's current phase.`,
        'Alternative Analysis': `An alternative interpretation is that this expansion is defensive in nature — hardened storage and improved infrastructure for existing capabilities rather than new production capacity. Country W faces regional threats that could justify protective measures for existing assets.

A second alternative is that the construction serves a dual-use purpose — civilian space launch support or commercial satellite operations co-located with the missile facility. However, the hardened construction of N-9 is inconsistent with civilian applications, and Country W's space program operates from a separate facility.`,
        Outlook: `Key indicators: (1) Completion of rail siding and first heavy shipments via rail — content and origin of shipments will be diagnostic; (2) Equipment installation in N-8 visible through imagery or MASINT; (3) Purpose of N-7 — additional collection modalities should be tasked; (4) Any personnel surge associated with missile expertise (HUMINT indicator); (5) Completion and activation of N-9 underground access.

Timeline: At current construction pace, N-8 could be operational within 30-45 days. N-7 may already be partially operational. N-9 is 60-90 days from completion.`,
      },
      confidence: 'HIGH/MODERATE',
    },
    iir: {
      title: 'IIR: Imagery Analysis of New Construction at FOXFIRE-9 Missile Facility, Country W',
      sections: {
        Source: `SOURCE DESCRIPTION: National technical means imagery. Collection date: [date minus 24 hours], 1023 local time. Target: FOXFIRE-9, known IRBM development and testing facility, Country W. Imagery quality: GOOD (12% cloud cover). Source reliability: A (Completely Reliable). Information is derived from direct observation by technical means.`,
        Information: `1. (S) WHAT: Three new buildings identified in the northern compound of FOXFIRE-9 facility, designated N-7, N-8, and N-9. Associated infrastructure includes new paved access road (2-lane, 3.2 km) and rail siding under construction.

Building N-7: 60m x 40m, flat roof, ventilation infrastructure, 80% construction complete, thermal signatures active, two satellite dishes installed within past 30 days.

Building N-8: 45m x 30m, high-bay structure (est. 15m ceiling), rail-accessible loading dock on eastern face, 90% complete.

Building N-9: 25m x 25m, hardened structure, reinforced concrete walls (2m+ thickness per shadow analysis), underground access on southern approach, 60% complete.

Vehicle traffic on facility access roads increased approximately 400% from 90-day baseline. Vehicle types: heavy transport trucks, construction equipment, military escort vehicles.

2. (S) WHEN: Imagery collected [date minus 24 hours]. Change detection confirms construction began approximately 60 days ago.

3. (S) WHERE: Northern compound, FOXFIRE-9 facility, Country W. Coordinates: [redacted]. New road connects to rail junction approximately 4 km northeast of facility. Rail siding 70% complete.`,
        Comments: `ANALYST COMMENT: Building N-8 dimensions and configuration are consistent with missile component assembly or integration facilities based on comparison with similar structures at [redacted] and [redacted]. The high-bay design with rail access is specifically suited for handling large missile components.

Building N-9 characteristics (wall thickness, underground access, hardened construction) are consistent with weapons-grade storage bunker specifications.

Building N-7 function is assessed as uncertain. Climate-controlled environment, early thermal activation, and satellite communications installations are consistent with laboratory, telemetry center, or technical operations center. Additional collection modalities recommended.

The 60-day construction timeline for this scale of development indicates high-priority resource allocation.

NOTE: Northern compound was previously undeveloped scrubland. No prior construction or ground preparation was visible in imagery archives before 60 days ago.`,
        Evaluation: `Information assessment: CONFIRMED. Imagery analysis is based on direct technical observation with good collection conditions. Measurements are derived from standard photogrammetric analysis with shadow-length validation. Building purpose assessments are ANALYTICAL JUDGMENTS based on dimensional comparison with known facilities, not direct observation of building contents or function.

Change detection methodology is validated against archived imagery baseline.`,
        Dissemination: `HANDLING: SECRET//NOFORN. Imagery derived from national technical means. Protect sources and methods. Do not reference collection platform or technical parameters in derivative products below the SECRET level.

DISSEMINATION: Per standing requirements for Country W missile program reporting. Imagery products available to authorized consumers through standard GEOINT distribution channels.

COLLECTION RECOMMENDATIONS: (1) Increased revisit rate for FOXFIRE-9 to monitor construction progress; (2) MASINT tasking for Building N-7 to characterize thermal and electromagnetic signatures; (3) HUMINT tasking for personnel and equipment procurement associated with facility expansion.`,
      },
      confidence: 'N/A (raw reporting)',
    },
  },
};

// ── Scoring Rubric ───────────────────────────────────────────

const SCORING_CRITERIA = [
  { id: 'bluf', label: 'BLUF Quality', desc: 'Does the product lead with the bottom line? Is the most important information first?', maxPoints: 25 },
  { id: 'confidence', label: 'Confidence Language', desc: 'Are ICD-203 confidence levels used correctly and consistently?', maxPoints: 25 },
  { id: 'sourceProtect', label: 'Source Protection', desc: 'Is source information appropriately characterized without revealing methods?', maxPoints: 25 },
  { id: 'actionability', label: 'Actionability', desc: 'Can the reader take action based on this product? Is the "so what" clear?', maxPoints: 25 },
];

// ── Scholarly Micro-Content ────────────────────────────────────
const CM_TIPS = {
  bluf: "BLUF (Bottom Line Up Front) is the IC's first commandment of analytic writing. The PDB reader \u2014 often the President \u2014 has 30 seconds per item. If the key judgment isn't in the first sentence, it won't be read. The Army War College formalized BLUF in the 1980s, but the principle dates to Churchill's 1940 memo: 'To do our work, we all have to read a mass of papers. Nearly all of them are far too long. The aim should be reports which set out the main points in a series of short, crisp paragraphs.'",
  icd203: "ICD-203 (Analytic Standards, 2015) established 9 standards that every IC analytic product must meet: objectivity, political independence, timeliness, all-source integration, source characterization, uncertainty expression, alternative analysis, logical argumentation, and visual communication. Standard 6 (uncertainty) is the most frequently violated \u2014 analysts resist expressing low confidence because it feels like admitting ignorance. But 'we assess with LOW CONFIDENCE' is more honest and more useful than a hedged sentence that hides the uncertainty.",
  pdb: "The President's Daily Brief is the IC's most prestigious product \u2014 a 10-15 page classified briefing delivered every morning. Only ~20 people have regular PDB access. The briefing style varies by president: Truman preferred written memos, Kennedy wanted oral briefings, George W. Bush held daily in-person sessions with the CIA director, Obama preferred written tablets. The PDB's influence is not in its content but in its agenda-setting power \u2014 what appears in the PDB becomes a presidential priority.",
  estimative: "Estimative language (ICD-203 Standard 6) maps confidence levels to probability ranges: 'almost certainly' (95%+), 'likely/probably' (55-80%), 'roughly even odds' (45-55%), 'unlikely' (20-45%), 'remote/highly unlikely' (<5%). This lexicon was formalized after the Iraq WMD failure, where 'slam dunk' confidence language contributed to policy decisions based on flawed intelligence. The lexicon forces precision \u2014 'likely' means something specific, not just 'I think so.'",
};

// ── Component ────────────────────────────────────────────────

function CMAnalysisView({ setView }) {
  const [mode, setMode] = useState('workshop');
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [showExpert, setShowExpert] = useState(false);
  const [scores, setScores] = useState({});
  const [galleryScenario, setGalleryScenario] = useState(0);
  const [galleryFormat, setGalleryFormat] = useState('pdb');
  const [flowSelected, setFlowSelected] = useState(null);
  const [tipId, setTipId] = useState(null);

  const C = CM_PALETTE;

  // Scholarly tooltip renderer
  var TipBox = function(key) {
    if (tipId !== key) return null;
    return React.createElement('div', { style: { padding: '10px 14px', background: 'rgba(248,249,251,.96)', border: '1px solid rgba(26,39,68,.12)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(26,39,68,.65)', lineHeight: 1.65, margin: '6px 0 10px', boxShadow: '0 1px 4px rgba(0,0,0,.06)' } }, CM_TIPS[key]);
  };

  // SVG micro-icons for scholarly tooltips
  var BlufDocIcon = React.createElement('svg', { width: 18, height: 22, viewBox: '0 0 18 22', style: { cursor: 'pointer', opacity: 0.35, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'bluf' ? null : 'bluf'); } },
    React.createElement('rect', { x: 2, y: 2, width: 14, height: 18, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 5, y1: 6, x2: 13, y2: 6, stroke: 'currentColor', strokeWidth: 1.2 }),
    React.createElement('line', { x1: 5, y1: 10, x2: 13, y2: 10, stroke: 'currentColor', strokeWidth: '.4' }),
    React.createElement('line', { x1: 5, y1: 13, x2: 11, y2: 13, stroke: 'currentColor', strokeWidth: '.4' }),
    React.createElement('line', { x1: 5, y1: 16, x2: 10, y2: 16, stroke: 'currentColor', strokeWidth: '.4' })
  );

  var ClassBannerIcon = React.createElement('svg', { width: 22, height: 18, viewBox: '0 0 22 18', style: { cursor: 'pointer', opacity: 0.35, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'icd203' ? null : 'icd203'); } },
    React.createElement('rect', { x: 1, y: 1, width: 20, height: 16, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('rect', { x: 1, y: 1, width: 20, height: 5, rx: 2, fill: 'currentColor', fillOpacity: '.1' }),
    React.createElement('line', { x1: 5, y1: 3.5, x2: 17, y2: 3.5, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 5, y1: 10, x2: 15, y2: 10, stroke: 'currentColor', strokeWidth: '.4' }),
    React.createElement('line', { x1: 5, y1: 13, x2: 12, y2: 13, stroke: 'currentColor', strokeWidth: '.4' })
  );

  var BriefBookIcon = React.createElement('svg', { width: 20, height: 22, viewBox: '0 0 20 22', style: { cursor: 'pointer', opacity: 0.35, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'pdb' ? null : 'pdb'); } },
    React.createElement('path', { d: 'M3 2 L3 18 Q3 20 5 20 L17 20 L17 4 Q17 2 15 2Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 3, y1: 18, x2: 17, y2: 18, stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('line', { x1: 7, y1: 6, x2: 13, y2: 6, stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('line', { x1: 7, y1: 9, x2: 14, y2: 9, stroke: 'currentColor', strokeWidth: '.4' }),
    React.createElement('line', { x1: 7, y1: 12, x2: 12, y2: 12, stroke: 'currentColor', strokeWidth: '.4' })
  );

  var ProbDialIcon = React.createElement('svg', { width: 22, height: 22, viewBox: '0 0 22 22', style: { cursor: 'pointer', opacity: 0.35, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'estimative' ? null : 'estimative'); } },
    React.createElement('circle', { cx: 11, cy: 12, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 11, y1: 12, x2: 15, y2: 8, stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 11, cy: 12, r: 1, fill: 'currentColor', fillOpacity: '.3' }),
    React.createElement('line', { x1: 11, y1: 5, x2: 11, y2: 6, stroke: 'currentColor', strokeWidth: '.5' }),
    React.createElement('line', { x1: 18, y1: 12, x2: 17, y2: 12, stroke: 'currentColor', strokeWidth: '.5' }),
    React.createElement('line', { x1: 4, y1: 12, x2: 5, y2: 12, stroke: 'currentColor', strokeWidth: '.5' })
  );

  const scenario = SCENARIOS[selectedScenario];
  const format = selectedFormat !== null ? PRODUCT_FORMATS[selectedFormat] : null;

  // Get or initialize draft for current scenario+format
  const draftKey = useMemo(() => {
    if (!scenario || !format) return null;
    return `${scenario.id}_${format.id}`;
  }, [scenario, format]);

  const currentDraft = useMemo(() => {
    if (!draftKey || !format) return {};
    return drafts[draftKey] || {};
  }, [draftKey, drafts, format]);

  const updateDraft = useCallback((section, value) => {
    if (!draftKey) return;
    setDrafts(prev => ({
      ...prev,
      [draftKey]: { ...(prev[draftKey] || {}), [section]: value },
    }));
  }, [draftKey]);

  // Word count
  const wordCount = useMemo(() => {
    if (!currentDraft) return 0;
    return Object.values(currentDraft).join(' ').split(/\s+/).filter(Boolean).length;
  }, [currentDraft]);

  // Self-assessment scoring
  const handleScore = useCallback((criterionId, points) => {
    if (!draftKey) return;
    setScores(prev => ({
      ...prev,
      [draftKey]: { ...(prev[draftKey] || {}), [criterionId]: points },
    }));
  }, [draftKey]);

  const totalScore = useMemo(() => {
    if (!draftKey || !scores[draftKey]) return 0;
    return Object.values(scores[draftKey]).reduce((a, b) => a + b, 0);
  }, [draftKey, scores]);

  // Expert version for current selection
  const expertVersion = useMemo(() => {
    if (!scenario || !format) return null;
    return EXPERT_PRODUCTS[scenario.id]?.[format.id] || null;
  }, [scenario, format]);

  // ── Styles ─────────────────────────────────────────────────

  const sty = useMemo(() => ({
    root: { minHeight: '100vh', background: C.bg, fontFamily: CM_SERIF, color: C.tx, paddingBottom: 80, position: 'relative' },
    hero: {
      background: '#ffffff', borderBottom: '3px double #1a2040',
      padding: '48px 24px 40px', textAlign: 'center', color: C.navy,
      boxShadow: '0 2px 8px rgba(0,0,0,.06)',
    },
    heroSub: { fontFamily: CM_MONO, fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: C.tx3, marginBottom: 10 },
    heroTitle: { fontFamily: CM_SERIF, fontSize: 34, fontWeight: 700, margin: '0 0 12px', lineHeight: 1.2, color: C.navy },
    heroDesc: { fontSize: 15, fontFamily: CM_SERIF, color: C.tx2, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 },
    container: { maxWidth: 1100, margin: '0 auto', padding: '0 24px' },
    skillsBar: { display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 20 },
    skillTag: { padding: '3px 10px', borderRadius: 2, background: 'rgba(26,32,64,.06)', color: C.tx2, fontSize: 11, fontFamily: CM_MONO, letterSpacing: 0.5, border: '1px solid rgba(26,32,64,.08)' },
    modeBar: { display: 'flex', gap: 0, borderBottom: `2px solid ${C.line}`, marginTop: 32, marginBottom: 32 },
    modeTab: (active) => ({
      padding: '12px 24px', cursor: 'pointer', fontSize: 12, fontFamily: CM_MONO, letterSpacing: 1.5,
      color: active ? C.navy : C.tx3, borderBottom: active ? `3px solid ${C.navy}` : '3px solid transparent',
      marginBottom: -2, transition: 'all .2s', background: 'none', border: 'none',
      fontWeight: active ? 700 : 400, textTransform: 'uppercase',
    }),
    card: { background: '#ffffff', border: '1px solid #c8c0b0', borderRadius: 1, padding: 24, marginBottom: 20, boxShadow: '2px 3px 10px rgba(0,0,0,.07), 0 1px 2px rgba(0,0,0,.05)' },
    cardTitle: { fontFamily: CM_SERIF, fontSize: 20, fontWeight: 700, marginBottom: 12, color: C.navy, borderBottom: '1px solid #d4cfc4', paddingBottom: 8 },
    classBanner: (color) => ({
      background: color, color: color === '#c8a020' ? '#1a1000' : '#ffffff',
      textAlign: 'center', padding: '7px 12px',
      fontFamily: CM_MONO, fontSize: 12, letterSpacing: 3, fontWeight: 700,
      borderTop: '2px solid ' + color, borderBottom: '2px solid ' + color,
    }),
    sectionLabel: { fontFamily: CM_MONO, fontSize: 11, letterSpacing: 1.5, color: C.tx3, textTransform: 'uppercase', marginBottom: 6, marginTop: 16, borderBottom: '1px dotted #d4cfc4', paddingBottom: 4 },
    textarea: {
      width: '100%', minHeight: 100, padding: 14, border: `1px solid ${C.line}`, borderRadius: 1,
      fontFamily: CM_SERIF, fontSize: 14, lineHeight: 1.8, color: C.tx, background: '#fefcf8',
      resize: 'vertical', outline: 'none', boxSizing: 'border-box',
    },
    expertText: { fontFamily: CM_SERIF, fontSize: 14, lineHeight: 1.8, color: C.tx, whiteSpace: 'pre-wrap' },
    badge: (color, bg) => ({
      display: 'inline-block', padding: '2px 8px', borderRadius: 1, fontSize: 11,
      fontFamily: CM_MONO, letterSpacing: 0.5, color, background: bg, fontWeight: 700, border: '1px solid ' + color + '30',
    }),
    formatCard: (active) => ({
      background: active ? '#f0f4fa' : '#ffffff', border: `2px solid ${active ? C.blue : '#c8c0b0'}`,
      borderRadius: 1, padding: 20, cursor: 'pointer', transition: 'all .2s', flex: 1, minWidth: 200,
      boxShadow: active ? '0 2px 8px rgba(32,72,136,.12)' : '1px 2px 6px rgba(0,0,0,.05)',
    }),
    btn: (primary) => ({
      padding: '10px 20px', border: primary ? 'none' : `1px solid ${C.line}`, borderRadius: 1,
      background: primary ? C.navy : 'transparent', color: primary ? '#fff' : C.tx2,
      fontFamily: CM_MONO, fontSize: 12, letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase',
    }),
    provenanceStrip: {
      marginTop: 48, padding: 20, borderTop: `2px solid ${C.line}`,
      display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center',
    },
    provItem: { textAlign: 'center', flex: '0 0 auto' },
    provLabel: { fontFamily: CM_MONO, fontSize: 12, letterSpacing: 1, color: C.tx3 },
    provDesc: { fontSize: 12, fontFamily: CM_SERIF, color: C.tx2, marginTop: 2 },
    scoreRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 },
    scoreBtn: (active) => ({
      width: 28, height: 28, borderRadius: '50%', border: `2px solid ${active ? C.navy : C.line}`,
      background: active ? C.navy : 'transparent', color: active ? '#fff' : C.tx3,
      fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: CM_MONO,
    }),
  }), [C]);

  // ── Render: Classification Banner ──────────────────────────

  const renderBanner = useCallback((text, color) => (
    <div style={sty.classBanner(color)}>{text}</div>
  ), [sty]);

  // ── Render: Workshop Mode ──────────────────────────────────

  const renderWorkshop = () => (
    <div>
      {/* Scenario Selection */}
      <div style={sty.card}>
        <div style={sty.cardTitle}>Select Raw Intelligence</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {SCENARIOS.map((sc, i) => (
            <button key={sc.id} onClick={() => { setSelectedScenario(i); setSelectedFormat(null); setShowExpert(false); }}
              style={{
                ...sty.formatCard(selectedScenario === i), flex: 'none', minWidth: 180,
                display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px',
              }}>
              <span style={{ fontSize: 22 }}>{sc.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: CM_MONO, fontSize: 12, letterSpacing: 1, color: C.tx3 }}>{sc.collectionType}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{sc.title.split(': ')[1]}</div>
                <div style={{ fontSize: 11, color: C.tx3 }}>{sc.age} old</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Raw Intelligence */}
      <div style={sty.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={sty.cardTitle}>Raw Intelligence: {scenario.title}</div>
          <span style={sty.badge(C.blue, C.blueBg)}>{scenario.collectionType} \u2022 {scenario.age}</span>
        </div>
        <div style={{
          background: '#f7f8fa', border: `1px solid ${C.line}`, borderRadius: 4, padding: 16,
          fontFamily: CM_MONO, fontSize: 12, lineHeight: 1.8, color: C.tx2, whiteSpace: 'pre-wrap',
          maxHeight: 300, overflowY: 'auto',
        }}>
          {scenario.raw}
        </div>
      </div>

      {/* Format Selection */}
      <div style={sty.card}>
        <div style={sty.cardTitle}>Select Product Format</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {PRODUCT_FORMATS.map((fmt, i) => (
            <div key={fmt.id} onClick={() => { setSelectedFormat(i); setShowExpert(false); }}
              style={sty.formatCard(selectedFormat === i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: CM_MONO, fontSize: 12, fontWeight: 700, color: C.navy }}>{fmt.abbrev}</span>
                <span style={sty.badge(fmt.bannerColor, fmt.bannerColor + '18')}>
                  {fmt.classification}
                </span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 6 }}>{fmt.name}</div>
              <div style={{ fontSize: 11, color: C.tx3, marginBottom: 8, lineHeight: 1.65 }}>{fmt.audience}</div>
              {fmt.maxWords && (
                <div style={{ fontSize: 11, color: C.amber, fontFamily: CM_MONO }}>{fmt.maxWords} word limit</div>
              )}
              <div style={{ marginTop: 10 }}>
                {fmt.requirements.slice(0, 3).map((r, j) => (
                  <div key={j} style={{ fontSize: 11, color: C.tx3, marginBottom: 2 }}>\u2022 {r}</div>
                ))}
                {fmt.requirements.length > 3 && (
                  <div style={{ fontSize: 12, color: C.tx3, fontStyle: 'italic' }}>+{fmt.requirements.length - 3} more requirements</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Writing Area */}
      {format && (
        <div style={sty.card}>
          {renderBanner(format.classification, format.bannerColor)}

          <div style={{ padding: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={sty.cardTitle}>{format.name}: {scenario.title}</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {format.maxWords && (
                  <span style={{
                    fontFamily: CM_MONO, fontSize: 12,
                    color: wordCount > format.maxWords ? C.red : wordCount > format.maxWords * 0.8 ? C.amber : C.green,
                  }}>
                    {wordCount}/{format.maxWords} words
                  </span>
                )}
                <button onClick={() => setShowExpert(!showExpert)}
                  style={sty.btn(!showExpert)}>
                  {showExpert ? 'Show My Draft' : 'Show Expert Version'}
                </button>
              </div>
            </div>

            {/* Requirements reminder */}
            <div style={{ background: C.highlight, border: `1px solid #e2d87a`, borderRadius: 4, padding: 12, marginBottom: 20 }}>
              <div style={{ fontFamily: CM_MONO, fontSize: 12, letterSpacing: 1, color: C.amber, marginBottom: 6 }}>FORMAT REQUIREMENTS {BlufDocIcon}{ClassBannerIcon}{BriefBookIcon}{ProbDialIcon}</div>
              {TipBox('bluf')}
              {TipBox('icd203')}
              {TipBox('pdb')}
              {TipBox('estimative')}
              {format.requirements.map((r, i) => (
                <div key={i} style={{ fontSize: 12, color: C.tx2, marginBottom: 2 }}>\u2022 {r}</div>
              ))}
            </div>

            {/* Sections */}
            {format.sections.map(section => (
              <div key={section} style={{ marginBottom: 20 }}>
                <div style={sty.sectionLabel}>{section}</div>
                {showExpert && expertVersion ? (
                  <div style={{
                    ...sty.expertText, background: '#f0f4f8', border: `1px solid ${C.line}`,
                    borderRadius: 4, padding: 16,
                  }}>
                    {expertVersion.sections[section]}
                  </div>
                ) : (
                  <textarea
                    value={currentDraft[section] || ''}
                    onChange={e => updateDraft(section, e.target.value)}
                    placeholder={format.placeholders[section]}
                    style={{
                      ...sty.textarea,
                      minHeight: section === 'BLUF' || section === 'Source' ? 80 :
                        format.id === 'ia' && (section === 'Key Judgments' || section === 'Analysis') ? 180 : 120,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {renderBanner(format.classification, format.bannerColor)}

          {/* Self-Assessment */}
          <div style={{ marginTop: 24 }}>
            <div style={sty.cardTitle}>Self-Assessment</div>
            <div style={{ fontSize: 12, color: C.tx3, marginBottom: 16 }}>
              Rate your draft on each criterion (1-5 points each, multiply by 5 for percentage). Compare with the expert version before scoring.
            </div>
            {SCORING_CRITERIA.map(criterion => {
              const currentScore = scores[draftKey]?.[criterion.id] || 0;
              return (
                <div key={criterion.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{criterion.label}</span>
                      <span style={{ fontSize: 11, color: C.tx3, marginLeft: 8 }}>{criterion.desc}</span>
                    </div>
                    <span style={{ fontFamily: CM_MONO, fontSize: 12, color: C.navy }}>{currentScore}/{criterion.maxPoints}</span>
                  </div>
                  <div style={{ ...sty.scoreRow, marginTop: 6 }}>
                    {[5, 10, 15, 20, 25].map(pts => (
                      <button key={pts} onClick={() => handleScore(criterion.id, pts)}
                        style={sty.scoreBtn(currentScore >= pts)}>
                        {pts / 5}
                      </button>
                    ))}
                    <span style={{ fontSize: 11, color: C.tx3, fontFamily: CM_MONO }}>
                      {currentScore === 0 ? '' : currentScore >= 20 ? 'Strong' : currentScore >= 15 ? 'Adequate' : currentScore >= 10 ? 'Developing' : 'Needs work'}
                    </span>
                  </div>
                </div>
              );
            })}
            <div style={{
              marginTop: 16, padding: 12, background: totalScore >= 80 ? C.greenBg : totalScore >= 60 ? C.amberBg : C.redBg,
              borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>Total Score</span>
              <span style={{ fontFamily: CM_MONO, fontSize: 20, fontWeight: 700, color: totalScore >= 80 ? C.green : totalScore >= 60 ? C.amber : C.red }}>
                {totalScore}/100
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ── Render: Gallery Mode ───────────────────────────────────

  const renderGallery = () => {
    const gScenario = SCENARIOS[galleryScenario];
    const gExpert = EXPERT_PRODUCTS[gScenario.id]?.[galleryFormat];
    const gFormat = PRODUCT_FORMATS.find(f => f.id === galleryFormat);

    return (
      <div>
        <div style={sty.card}>
          <div style={sty.cardTitle}>Expert Product Gallery</div>
          <div style={{ fontSize: 13, color: C.tx2, marginBottom: 16, lineHeight: 1.6 }}>
            Browse professionally written intelligence products across all scenarios and formats. Each product demonstrates proper classification markings, ICD-203 confidence language, and format-specific tradecraft.
            {BriefBookIcon}{ProbDialIcon}
          </div>
          {TipBox('pdb')}
          {TipBox('estimative')}

          {/* Scenario picker */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {SCENARIOS.map((sc, i) => (
              <button key={sc.id} onClick={() => setGalleryScenario(i)}
                style={sty.btn(galleryScenario === i)}>
                {sc.icon} {sc.collectionType}
              </button>
            ))}
          </div>

          {/* Format picker */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {PRODUCT_FORMATS.map(fmt => (
              <button key={fmt.id} onClick={() => setGalleryFormat(fmt.id)}
                style={{
                  ...sty.btn(galleryFormat === fmt.id),
                  borderBottom: galleryFormat === fmt.id ? `2px solid ${fmt.bannerColor}` : 'none',
                }}>
                {fmt.abbrev}
              </button>
            ))}
          </div>
        </div>

        {/* Expert product display */}
        {gExpert && gFormat && (
          <div style={{ ...sty.card, padding: 0, overflow: 'hidden' }}>
            {renderBanner(gFormat.classification, gFormat.bannerColor)}

            <div style={{ padding: 24 }}>
              <div style={{ fontFamily: CM_SERIF, fontSize: 20, fontWeight: 700, color: C.navy, marginBottom: 4 }}>
                {gExpert.title}
              </div>
              <div style={{ fontSize: 12, color: C.tx3, marginBottom: 4, fontFamily: CM_MONO }}>
                Source Scenario: {gScenario.title} \u2022 Product: {gFormat.name}
              </div>
              {gExpert.confidence && gExpert.confidence !== 'N/A (raw reporting)' && (
                <div style={{ marginBottom: 20 }}>
                  <span style={sty.badge(
                    gExpert.confidence.includes('HIGH') ? C.green : gExpert.confidence.includes('LOW') ? C.red : C.amber,
                    gExpert.confidence.includes('HIGH') ? C.greenBg : gExpert.confidence.includes('LOW') ? C.redBg : C.amberBg,
                  )}>
                    {gExpert.confidence} CONFIDENCE
                  </span>
                </div>
              )}

              {gFormat.sections.map(section => (
                <div key={section} style={{ marginBottom: 20 }}>
                  <div style={sty.sectionLabel}>{section}</div>
                  <div style={{
                    ...sty.expertText,
                    background: '#fafbfc', border: `1px solid ${C.line}`,
                    borderRadius: 4, padding: 16,
                  }}>
                    {gExpert.sections[section]}
                  </div>
                </div>
              ))}
            </div>

            {renderBanner(gFormat.classification, gFormat.bannerColor)}
          </div>
        )}
      </div>
    );
  };

  // ── Render: Standards Mode ─────────────────────────────────

  // ── IC Product Flow SVG Diagram ────────────────────────
  const renderFlow = () => {
    const stages = [
      { id: 'raw', label: 'Raw\nIntel', x: 20, products: ['HUMINT reports', 'SIGINT intercepts', 'GEOINT imagery', 'OSINT feeds'], standards: ['EO 12333', 'ICD-501'], color: CM_PALETTE.tsSci },
      { id: 'proc', label: 'Processing', x: 155, products: ['Translated transcripts', 'Geolocated data', 'Decrypted comms', 'IIR (draft)'], standards: ['ICD-501', 'DCID 6/3'], color: CM_PALETTE.secret },
      { id: 'analysis', label: 'Analysis', x: 290, products: ['Intelligence Assessment', 'Threat assessment', 'Pattern analysis', 'Link charts'], standards: ['ICD-203', 'ICD-206'], color: CM_PALETTE.confid },
      { id: 'prod', label: 'Production', x: 425, products: ['PDB item', 'SNIE', 'NIE', 'Current intel brief'], standards: ['ICD-203', 'ICD-208', 'ODNI Style Guide'], color: CM_PALETTE.navy },
      { id: 'dissem', label: 'Dissemination', x: 560, products: ['Classified reports', 'Tearline summaries', 'ORCON materials', 'Sanitized briefs'], standards: ['ICD-209', 'ICD-501', 'EO 13526'], color: CM_PALETTE.navyLt },
      { id: 'consumer', label: 'Consumer', x: 695, products: ['President/NSC', 'Combatant Commands', 'Policy makers', 'Law enforcement'], standards: ['ICD-191', 'Customer feedback loop'], color: CM_PALETTE.blue },
    ];

    const nodeW = 100, nodeH = 60;
    const arrowY = 50;

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontFamily: CM_SERIF, fontSize: 22, fontWeight: 600, color: CM_PALETTE.navy, marginBottom: 8 }}>
            IC Product Pipeline Flow
          </h2>
          <p style={{ fontSize: 12, color: CM_PALETTE.tx2, lineHeight: 1.65, maxWidth: '65ch' }}>
            How raw intelligence flows through the Intelligence Community product pipeline from collection to dissemination. Click any stage to see the product types and ICD standards that apply.
          </p>
        </div>

        <div style={{ background: CM_PALETTE.card, border: '1px solid ' + CM_PALETTE.cardBd, borderRadius: 8, padding: 16, overflowX: 'auto' }}>
          <svg viewBox="0 0 800 300" style={{ width: '100%', minWidth: 700, display: 'block' }}>
            {/* Background */}
            <rect x="0" y="0" width="800" height="300" fill={CM_PALETTE.bg} rx="6" />

            {/* Flow arrows between stages */}
            {stages.slice(0, -1).map((s, i) => {
              const next = stages[i + 1];
              const fromX = s.x + nodeW;
              const toX = next.x;
              const midX = (fromX + toX) / 2;
              return (
                <g key={'arrow' + i}>
                  <line x1={fromX + 4} y1={arrowY + nodeH / 2} x2={toX - 8} y2={arrowY + nodeH / 2}
                    stroke={CM_PALETTE.line} strokeWidth={2} markerEnd="url(#flowArrow)" />
                </g>
              );
            })}

            {/* Arrow marker definition */}
            <defs>
              <marker id="flowArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={CM_PALETTE.tx3} />
              </marker>
            </defs>

            {/* Stage nodes */}
            {stages.map((s, i) => {
              const isSel = flowSelected === s.id;
              return (
                <g key={s.id} style={{ cursor: 'pointer' }} onClick={() => setFlowSelected(isSel ? null : s.id)}>
                  {/* Main node */}
                  <rect x={s.x} y={arrowY} width={nodeW} height={nodeH}
                    rx={6} ry={6}
                    fill={isSel ? s.color + '20' : s.color + '0a'}
                    stroke={isSel ? s.color : s.color + '60'}
                    strokeWidth={isSel ? 2 : 1}
                  />
                  {/* Stage number */}
                  <circle cx={s.x + 14} cy={arrowY + 14} r={9} fill={s.color} opacity={0.8} />
                  <text x={s.x + 14} y={arrowY + 15} fill="#ffffff"
                    textAnchor="middle" dominantBaseline="middle"
                    style={{ fontSize: 11, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace" }}>
                    {i + 1}
                  </text>
                  {/* Label */}
                  {s.label.split('\n').map((line, li) => (
                    <text key={li} x={s.x + nodeW / 2} y={arrowY + 30 + li * 14}
                      fill={isSel ? CM_PALETTE.tx : CM_PALETTE.tx2}
                      textAnchor="middle" dominantBaseline="middle"
                      style={{ fontSize: 12, fontWeight: isSel ? 700 : 500, fontFamily: "'Inter',sans-serif" }}>
                      {line}
                    </text>
                  ))}

                  {/* Product types below the node */}
                  <line x1={s.x + nodeW / 2} y1={arrowY + nodeH} x2={s.x + nodeW / 2} y2={arrowY + nodeH + 15}
                    stroke={s.color + '40'} strokeWidth={1} strokeDasharray="2,2" />
                  {s.products.slice(0, 2).map((p, pi) => (
                    <text key={pi} x={s.x + nodeW / 2} y={arrowY + nodeH + 28 + pi * 14}
                      fill={CM_PALETTE.tx3} textAnchor="middle"
                      style={{ fontSize: 12, fontFamily: "'IBM Plex Mono',monospace" }}>
                      {p}
                    </text>
                  ))}
                  {s.products.length > 2 && (
                    <text x={s.x + nodeW / 2} y={arrowY + nodeH + 28 + 28}
                      fill={CM_PALETTE.tx3} textAnchor="middle"
                      style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", fontStyle: 'italic' }}>
                      +{s.products.length - 2} more
                    </text>
                  )}

                  {/* Standards above the node */}
                  {s.standards.slice(0, 1).map((std, si) => (
                    <text key={si} x={s.x + nodeW / 2} y={arrowY - 8 - si * 12}
                      fill={s.color} textAnchor="middle"
                      style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '.03em' }}>
                      {std}
                    </text>
                  ))}
                </g>
              );
            })}

            {/* Pipeline label */}
            <text x={400} y={290} fill={CM_PALETTE.tx3} textAnchor="middle"
              style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '.1em' }}>
              INTELLIGENCE CYCLE PRODUCT PIPELINE
            </text>
          </svg>

          {/* Selected stage detail panel */}
          {flowSelected && (() => {
            const sel = stages.find(s => s.id === flowSelected);
            if (!sel) return null;
            return (
              <div style={{ marginTop: 16, padding: 16, borderRadius: 6, border: '1px solid ' + sel.color + '30', background: sel.color + '05' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontFamily: CM_SERIF, fontSize: 16, fontWeight: 700, color: sel.color }}>
                    {sel.label.replace('\n', ' ')}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <p style={{ fontFamily: CM_MONO, fontSize: 11, color: CM_PALETTE.tx3, marginBottom: 6 }}>PRODUCTS AT THIS STAGE</p>
                    {sel.products.map((p, i) => (
                      <div key={i} style={{ padding: '3px 0', fontSize: 11, color: CM_PALETTE.tx2, borderBottom: '1px solid ' + CM_PALETTE.line }}>
                        <span style={{ color: sel.color, fontFamily: CM_MONO, fontSize: 11, marginRight: 6 }}>{'\u25B8'}</span>{p}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontFamily: CM_MONO, fontSize: 11, color: CM_PALETTE.tx3, marginBottom: 6 }}>APPLICABLE ICD STANDARDS</p>
                    {sel.standards.map((s, i) => (
                      <div key={i} style={{ padding: '4px 8px', marginBottom: 4, borderRadius: 3, background: sel.color + '08', border: '1px solid ' + sel.color + '20', fontFamily: CM_MONO, fontSize: 12, color: sel.color }}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    );
  };

  const renderStandards = () => (
    <div>
      {/* ICD-203 Reference */}
      <div style={sty.card}>
        <div style={sty.cardTitle}>ICD 203: Analytic Standards — Confidence Levels {ClassBannerIcon}{ProbDialIcon}{BlufDocIcon}</div>
        <div style={{ fontSize: 13, color: C.tx2, marginBottom: 20, lineHeight: 1.6 }}>
          Intelligence Community Directive 203 establishes the standards for analytic rigor. Confidence levels communicate the quality and quantity of source information underlying analytic judgments. Every intelligence product must use these levels consistently.
        </div>
        {TipBox('icd203')}
        {TipBox('estimative')}
        {TipBox('bluf')}

        {ICD203_LEVELS.map(level => (
          <div key={level.level} style={{
            marginBottom: 20, padding: 20, borderRadius: 8,
            border: `2px solid ${level.color}20`, background: `${level.color}06`,
          }}>
            <div style={{
              fontFamily: CM_MONO, fontSize: 14, fontWeight: 700, color: level.color,
              letterSpacing: 1, marginBottom: 10,
            }}>
              {level.level}
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: C.tx, marginBottom: 12 }}>
              {level.definition}
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: CM_MONO, fontSize: 12, letterSpacing: 1, color: C.tx3, marginBottom: 6 }}>INDICATORS</div>
              {level.indicators.map((ind, i) => (
                <div key={i} style={{ fontSize: 12, color: C.tx2, marginBottom: 3 }}>\u2022 {ind}</div>
              ))}
            </div>
            <div style={{
              fontFamily: CM_SERIF, fontSize: 13, fontStyle: 'italic', color: level.color,
              padding: '8px 12px', background: `${level.color}10`, borderRadius: 4, marginTop: 8,
            }}>
              Standard usage: "{level.usage}"
            </div>
          </div>
        ))}
      </div>

      {/* IC Writing Standards Quick Reference */}
      <div style={sty.card}>
        <div style={sty.cardTitle}>IC Writing Standards Quick Reference</div>

        <div style={{ marginBottom: 20 }}>
          <div style={sty.sectionLabel}>BLUF Principles</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: C.tx2 }}>
            Lead with the conclusion, not the evidence. The first sentence should answer: "What does the reader need to know right now?" If the reader stops after the first paragraph, they should have the essential judgment. Evidence supports the BLUF; it does not precede it.
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={sty.sectionLabel}>Source Characterization (not identification)</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: C.tx2 }}>
            Describe sources by access and reliability, never by identity. Use formulations like "a source with direct access" or "technical collection with high confidence." The reader needs to assess information quality without knowing the collection method or source identity.
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={sty.sectionLabel}>Hedging vs. Precision</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: C.tx2 }}>
            Avoid vague hedging ("it is possible," "may," "could"). Instead, use ICD-203 confidence levels to communicate uncertainty precisely. "We assess with moderate confidence" is preferable to "it seems likely." Every hedge should map to a confidence level.
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={sty.sectionLabel}>Classification Markings</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: C.tx2 }}>
            Every intelligence product requires classification banners at top and bottom. Portion markings appear at the start of each paragraph. The overall classification is the highest level of any portion. Dissemination controls (NOFORN, FVEY, REL TO) follow the classification level.
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={sty.sectionLabel}>Alternative Analysis Requirements</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: C.tx2 }}>
            ICD-203 requires analysts to consider alternative explanations. Intelligence assessments must address at least one competing hypothesis and explain why it is less compelling than the primary judgment. This is not optional — it is a mandated analytic standard.
          </div>
        </div>

        <div>
          <div style={sty.sectionLabel}>Source Reliability Ratings</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 16px', fontSize: 13 }}>
            {[
              ['A', 'Completely Reliable — No doubt about authenticity, trustworthiness, or competency. History of complete reliability.'],
              ['B', 'Usually Reliable — Minor doubt about authenticity, trustworthiness, or competency. History of valid information most of the time.'],
              ['C', 'Fairly Reliable — Doubt about authenticity, trustworthiness, or competency. Has provided valid information in the past.'],
              ['D', 'Not Usually Reliable — Significant doubt. Has provided valid information in the past but has a history of invalid information.'],
              ['E', 'Unreliable — Lacking in authenticity, trustworthiness, or competency. History of invalid information.'],
              ['F', 'Cannot Be Judged — No basis for evaluating reliability. May be a new source or used for the first time.'],
            ].map(([code, desc]) => (
              <React.Fragment key={code}>
                <div style={{ fontFamily: CM_MONO, fontWeight: 700, color: C.navy }}>{code}</div>
                <div style={{ color: C.tx2 }}>{desc}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Product Format Comparison */}
      <div style={sty.card}>
        <div style={sty.cardTitle}>Product Format Comparison</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.line}` }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', fontFamily: CM_MONO, fontSize: 11, color: C.tx3 }}>Attribute</th>
                {PRODUCT_FORMATS.map(fmt => (
                  <th key={fmt.id} style={{ textAlign: 'left', padding: '10px 12px', fontFamily: CM_MONO, fontSize: 11, color: fmt.bannerColor }}>
                    {fmt.abbrev}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Audience', 'POTUS (1 reader)', 'Senior policymakers (15-20)', 'Downstream analysts'],
                ['Read Time', '45 seconds', '5 minutes', 'Reference document'],
                ['Length', '200 words max', '800-1200 words', 'Structured (variable)'],
                ['Classification', 'TS//SCI//NOFORN', 'SECRET//NOFORN', 'SECRET'],
                ['Purpose', 'Decision support', 'Policy context', 'Raw reporting for analysis'],
                ['Analytic Content', 'High (pure judgment)', 'High (judgment + evidence)', 'Minimal (information only)'],
                ['Confidence Language', 'Implicit or brief', 'Explicit per ICD-203', 'Not applicable'],
                ['Source Detail', 'Characterized, minimal', 'Characterized, moderate', 'Full reliability rating'],
              ].map(([attr, ...vals]) => (
                <tr key={attr} style={{ borderBottom: `1px solid ${C.line}` }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: C.navy }}>{attr}</td>
                  {vals.map((v, i) => (
                    <td key={i} style={{ padding: '8px 12px', color: C.tx2 }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ── Main Render ────────────────────────────────────────────

  return (
    <div style={sty.root}>
      {React.createElement(PaperTexture)}
      {React.createElement(ClassBanner, { level: 'S', text: 'SECRET // NOFORN' })}
      {/* Hero — document cover page */}
      <div style={sty.hero}>
        <div style={{ width: 80, height: 1, background: C.navy, margin: '0 auto 16px', opacity: 0.3 }} />
        <div style={sty.heroSub}>MPAI 5612 -- Intelligence Communications</div>
        <h1 style={sty.heroTitle}>Product Format Switchboard</h1>
        <div style={{ width: 200, height: 1, background: C.navy, margin: '8px auto 16px', opacity: 0.2 }} />
        <p style={sty.heroDesc}>
          Transform raw intelligence into three distinct product formats: the President's Daily Brief, an Intelligence Assessment, and an Intelligence Information Report. Each format demands different tradecraft, audience awareness, and analytic voice.
        </p>
        <div style={sty.skillsBar}>
          {CM_SKILLS.map(s => <span key={s} style={sty.skillTag}>{s}</span>)}
        </div>
        <div style={{ width: 80, height: 1, background: C.navy, margin: '20px auto 0', opacity: 0.3 }} />
      </div>

      <div style={sty.container}>
        {/* Mode Tabs */}
        <div style={sty.modeBar}>
          {CM_MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={sty.modeTab(mode === m.id)}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* Mode Content */}
        {mode === 'workshop' && renderWorkshop()}
        {mode === 'gallery' && renderGallery()}
        {mode === 'standards' && renderStandards()}
        {mode === 'flow' && renderFlow()}

        {/* Provenance Strip */}
        <div style={sty.provenanceStrip}>
          {CM_PROVENANCE.map(p => (
            <div key={p.label} style={sty.provItem}>
              <div style={sty.provLabel}>{p.label}</div>
              <div style={sty.provDesc}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Back button */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={() => setView('home')} style={{
            ...sty.btn(false), fontSize: 13, padding: '10px 32px',
          }}>
            \← Back to Portfolio
          </button>
        </div>
      </div>
      {React.createElement(ClassBanner, { level: 'S', text: 'SECRET // NOFORN' })}
    </div>
  );
}
