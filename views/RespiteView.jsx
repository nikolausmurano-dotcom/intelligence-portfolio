// RespiteView.jsx — Recovery Support Dashboard
// Hospitality House — Respite Staff (HOSP HOUSE)
// "Managing a Respite Facility for Individuals in Substance Recovery"
//
// Interactive respite facility simulation: assess incoming clients using
// ASAM criteria, create support plans, manage crisis situations, and
// run crisis de-escalation simulations with scored outcomes.
// Four modes: Intake (ASAM assessment), Support (individualized plans),
// Crisis (de-escalation info), Crisis Sim (interactive simulator).
// Self-contained React component. Globals: useState, useCallback, useMemo

// ── Palette: Calming dark blue-gray — clinical facility ─────
const C = {
  bg:      '#080a10',
  card:    'rgba(12,14,20,.95)',
  cardBd:  'rgba(80,100,140,.14)',
  tx:      '#ccd0d8',
  tx2:     '#9ca4b8',
  tx3:     '#737b90',
  accent:  '#5870a0',
  accentDm:'#4a5a80',
  accentBg:'rgba(88,112,160,.08)',
  green:   '#48a060',
  greenDm: '#308048',
  greenBg: 'rgba(72,160,96,.08)',
  yellow:  '#b8a038',
  yellowDm:'#988020',
  yellowBg:'rgba(184,160,56,.08)',
  red:     '#a84848',
  redDm:   '#883030',
  redBg:   'rgba(168,72,72,.08)',
  teal:    '#3a9090',
  tealDm:  '#287070',
  tealBg:  'rgba(58,144,144,.08)',
  line:    'rgba(80,100,140,.10)',
};
const Mono  = "'IBM Plex Mono',monospace";
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";

// ── SVG: Calming wave/circle patterns ──────────────────────
const CalmingPatternBg = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{
    position:'fixed', top:0, left:0, right:0, bottom:0,
    opacity:0.02, pointerEvents:'none', zIndex:0,
  }}>
    {/* Concentric calming circles */}
    {[100,160,220,280,340,400].map(r => (
      <circle key={r} cx="700" cy="500" r={r} fill="none" stroke="#5870a0" strokeWidth="0.5" />
    ))}
    {/* Gentle wave lines */}
    {[100,200,300,400,500].map(y => (
      <path key={y} d={`M0,${y} Q200,${y-15} 400,${y} Q600,${y+15} 800,${y}`}
        fill="none" stroke="#5870a0" strokeWidth="0.3" />
    ))}
  </svg>
);

// ── Clinical intake form card ──────────────────────────────
const ClinicalCard = ({ children, style = {}, label }) => (
  <div style={{
    background: C.card, border: '1px solid ' + C.cardBd,
    borderRadius: 4, padding: 24, position:'relative',
    borderLeft: '3px solid ' + C.accent,
    boxShadow: '0 1px 6px rgba(0,0,0,.2)',
    ...style,
  }}>
    {label && (
      <div style={{
        position:'absolute', top:-10, left:12,
        padding:'2px 8px', background:'rgba(88,112,160,.12)',
        border:'1px solid rgba(88,112,160,.2)', borderRadius:2,
        fontFamily:Mono, fontSize:9, color:C.accent, letterSpacing:'.1em', fontWeight:600,
      }}>
        {label}
      </div>
    )}
    {children}
  </div>
);

const SKILLS = [
  'ASAM Criteria Assessment',
  'Trauma-Informed Care',
  'Motivational Interviewing',
  'Crisis De-Escalation',
  'Safety Planning',
  'Wraparound Services Coordination',
  'Harm Reduction Principles',
  'Peer Support Facilitation',
];

const PROVENANCE = [
  { label: 'ASAM', desc: 'American Society of Addiction Medicine Criteria' },
  { label: 'SAMHSA', desc: 'Substance Abuse & Mental Health Services Admin' },
  { label: 'Hosp House', desc: 'Hospitality House Respite Program' },
  { label: 'CCAR', desc: 'CT Community for Addiction Recovery' },
];

// ── ASAM Dimensions ──────────────────────────────────────────
const ASAM_DIMENSIONS = [
  { id: 'd1', name: 'Withdrawal Potential', desc: 'Acute intoxication or withdrawal risk. History of withdrawal seizures, DTs, or complicated withdrawal.', icon: '\⚠' },
  { id: 'd2', name: 'Biomedical Conditions', desc: 'Physical health conditions that may complicate treatment or require medical monitoring.', icon: '\u2695' },
  { id: 'd3', name: 'Emotional/Behavioral', desc: 'Mental health conditions, cognitive status, emotional stability. Co-occurring disorders.', icon: '\u{1F9E0}' },
  { id: 'd4', name: 'Treatment Readiness', desc: 'Readiness to change, stage of change (precontemplation through maintenance), motivation level.', icon: '\u{1F4CA}' },
  { id: 'd5', name: 'Relapse Potential', desc: 'Historical pattern of use, triggers, coping skills, relapse history, protective factors.', icon: '\u21BA' },
  { id: 'd6', name: 'Recovery Environment', desc: 'Living situation, family support, employment, peer influences, access to substances.', icon: '\u{1F3E0}' },
];

// ── Client Profiles ──────────────────────────────────────────
const CLIENTS = [
  {
    id: 1,
    name: 'Marcus T.',
    age: 38,
    substance: 'Alcohol (severe use disorder)',
    background: 'Recently completed 14-day medical detox. History of 3 prior treatment episodes. Last use: 16 days ago. Currently homeless after partner ended relationship. Employed as a line cook but on leave. Two DUI convictions. Father of 9-year-old daughter (limited custody). Reports wanting to "do it right this time" but expresses ambivalence about 12-step approach.',
    asam: {
      d1: { score: 2, note: 'Post-acute withdrawal managed. No seizure history. Mild sleep disturbance and anxiety. Medically stable for respite-level care.' },
      d2: { score: 1, note: 'Elevated liver enzymes (AST/ALT). Mild hypertension managed with medication. No acute medical needs.' },
      d3: { score: 3, note: 'Moderate depression (PHQ-9: 14). History of childhood trauma (ACE score: 5). No active suicidal ideation but reports "not caring if I wake up" during last relapse.' },
      d4: { score: 2, note: 'Contemplation/Preparation stage. Ambivalent about treatment approach but voluntarily seeking help. Previous treatment experiences create both knowledge and cynicism.' },
      d5: { score: 3, note: 'High relapse risk: 3 prior episodes, strong triggers (relationship loss, housing instability). Limited coping skills beyond avoidance. Recognizes triggers but struggles with alternative responses.' },
      d6: { score: 3, note: 'Currently homeless. Partner relationship ended. Employment at risk. Limited sober social network. Daughter provides motivation but also guilt/shame trigger.' },
    },
    supportPlan: [
      'Priority 1: Housing stabilization — connect with transitional housing program within 72 hours',
      'Priority 2: Outpatient treatment enrollment — evaluate fit for IOP (Intensive Outpatient) vs. standard OP',
      'Priority 3: Employer communication — facilitate medical leave paperwork, plan for return',
      'Priority 4: Family services — supervised visitation scheduling, family therapy referral',
      'Priority 5: Peer recovery support — connect with recovery coach, explore SMART Recovery as 12-step alternative',
      'Priority 6: Mental health — psychiatric evaluation for depression, trauma-focused therapy referral',
    ],
  },
  {
    id: 2,
    name: 'Aisha R.',
    age: 27,
    substance: 'Opioids (heroin → fentanyl, IV use)',
    background: 'Discharged from ER after non-fatal overdose (Narcan-reversed). First time seeking help voluntarily. Using for 6 years, started with prescription opioids after knee surgery at age 21. Currently on MAT (buprenorphine/naloxone, started in ER). Has housing but roommate also uses. Works part-time at retail store. Estranged from family due to theft during active use. History of sex trafficking during periods of homelessness.',
    asam: {
      d1: { score: 1, note: 'On buprenorphine — withdrawal managed. Stable on current dose (16mg/day). No additional withdrawal concerns.' },
      d2: { score: 2, note: 'IV use history requires infectious disease screening (Hep C, HIV). Recent overdose — cardiac monitoring during first 48 hours recommended. Nutritional deficiencies likely.' },
      d3: { score: 3, note: 'Complex PTSD from trafficking experiences. Hypervigilance, difficulty trusting staff (especially male). Reports nightmares and dissociative episodes. No formal mental health diagnosis or treatment history.' },
      d4: { score: 3, note: 'Crisis-motivated (near-death overdose). High readiness NOW but this may fade. "Window of opportunity" — engagement within 72 hours of ER discharge is critical for retention.' },
      d5: { score: 3, note: 'Extremely high risk: fentanyl supply makes any relapse potentially fatal. Roommate actively using. Limited clean time. However, first voluntary treatment-seeking is significant.' },
      d6: { score: 3, note: 'Housing exists but is a using environment. No sober support network. Family estranged. Employment provides structure but is part-time with no benefits.' },
    },
    supportPlan: [
      'URGENT: Naloxone kit and overdose response training before any community pass',
      'Priority 1: MAT continuation — connect with prescribing physician for ongoing buprenorphine management',
      'Priority 2: Housing — roommate situation is immediate relapse trigger. Explore sober living or housing swap',
      'Priority 3: Infectious disease screening — Hep C and HIV testing, linkage to treatment if positive',
      'Priority 4: Trauma-specific services — female counselor, trauma-informed peer support, trafficking survivor group',
      'Priority 5: Family reconnection — only when clinically appropriate and if family willing. Do not pressure.',
      'Priority 6: Harm reduction plan — if relapse occurs: never use alone, carry Narcan, test supply for fentanyl',
    ],
  },
  {
    id: 3,
    name: 'David K.',
    age: 52,
    substance: 'Cocaine and alcohol (polysubstance)',
    background: 'Self-referred after being asked to leave Oxford House for violating no-use policy. Reports 8 months of recovery prior to relapse. Trigger: ex-wife filed to modify child support upward. Vietnam-era veteran (peacetime service). Retired postal worker on disability (back injury). Diabetes and chronic pain managed with non-opioid medications. Strong connection to AA community but "can\'t face them after this."',
    asam: {
      d1: { score: 1, note: 'Cocaine: no physiological withdrawal but significant crash (fatigue, depression, anhedonia). Alcohol: moderate prior use, no history of complicated withdrawal. Monitor for rebound hypertension.' },
      d2: { score: 2, note: 'Diabetes requires daily medication management and blood glucose monitoring. Chronic pain (non-opioid regimen). Both conditions require medication continuity during respite stay.' },
      d3: { score: 2, note: 'Post-cocaine anhedonia and shame after 8-month recovery loss. Not clinically depressed but emotionally devastated. Strong shame about "failing" his AA community. Veterans status provides community identity.' },
      d4: { score: 3, note: 'High motivation — immediately self-referred. Relapse occurred within existing recovery framework (AA, Oxford House). Needs to process what happened without abandoning what worked.' },
      d5: { score: 2, note: 'Moderate risk: had 8 months, relapse was situational (legal stress), has existing recovery capital (AA network, recovery skills). Biggest risk: shame-driven isolation from support system.' },
      d6: { score: 2, note: 'Lost Oxford House placement but has financial stability (disability income). AA community exists but he\'s avoiding it. No active using relationships. Legal stress is ongoing.' },
    },
    supportPlan: [
      'Priority 1: Shame processing — normalize relapse within recovery journey. 8 months is significant recovery capital, not failure.',
      'Priority 2: AA re-engagement — facilitate conversation with sponsor. Relapse is an AA concept; the community expects it.',
      'Priority 3: Housing — Oxford House re-application or alternative sober living. Financial stability helps.',
      'Priority 4: Legal support — connect with legal aid for child support modification response',
      'Priority 5: Medical continuity — ensure diabetes medications and pain management uninterrupted',
      'Priority 6: Veterans services — explore VA treatment options and peer support as supplementary resource',
    ],
  },
  {
    id: 4,
    name: 'Lily M.',
    age: 22,
    substance: 'Cannabis and benzodiazepines (prescribed Xanax, escalated to street supply)',
    background: 'College student on medical leave. Parents brought her after finding her unresponsive (benzodiazepine overdose, non-intentional). Reports using cannabis daily for 3 years and Xanax "as needed" for anxiety for 2 years, escalating to 6-8mg daily from street supply. Diagnosed GAD and panic disorder. Reports sexual assault during freshman year that preceded escalation. Parents are supportive but controlling. Academic performance declined from 3.8 to 1.4 GPA.',
    asam: {
      d1: { score: 3, note: 'CRITICAL: Benzodiazepine withdrawal can be life-threatening. Street supply means unknown dosing. Requires medically supervised taper — respite alone is NOT sufficient for benzo detox. Must coordinate with medical provider.' },
      d2: { score: 2, note: 'Recent overdose. Otherwise healthy 22-year-old. Primary medical concern is safe benzo taper protocol.' },
      d3: { score: 3, note: 'GAD/panic disorder (diagnosed). Trauma history (sexual assault). Benzodiazepine use began as self-medication for legitimate anxiety. Removing the drug without treating the underlying condition will fail.' },
      d4: { score: 2, note: 'Ambivalent. Brought by parents, not fully self-motivated. Recognizes cannabis use is problematic but views Xanax as "medication" not drug use. Developmental stage: establishing autonomy from parents while needing their support.' },
      d5: { score: 2, note: 'Moderate: first treatment episode, using as self-medication (functional use), triggers are anxiety and trauma. If anxiety is properly treated, substance use rationale diminishes.' },
      d6: { score: 2, note: 'Parental support is both asset and complication (controlling dynamics). College environment has triggers but also recovery resources. No sober peer group but pre-substance friendships may be recoverable.' },
    },
    supportPlan: [
      'CRITICAL: Medical referral for supervised benzodiazepine taper — DO NOT cold turkey benzo withdrawal',
      'Priority 1: Psychiatric evaluation — GAD/panic disorder treatment with non-addictive alternatives (SSRIs, buspirone, CBT)',
      'Priority 2: Trauma therapy — trauma-informed care, EMDR or CPT for sexual assault processing',
      'Priority 3: Family dynamics — family therapy to shift from controlling to supportive. Parents need psychoeducation.',
      'Priority 4: Academic planning — coordinate with college disability services for medical leave and return plan',
      'Priority 5: Age-appropriate peer support — young people\'s recovery group, not primarily older adults in AA/NA',
      'Priority 6: Autonomous decision-making — treatment plan must be HERS, not parents\'. Build self-efficacy.',
    ],
  },
];

// ── Crisis Scenarios (informational) ─────────────────────────
const CRISES = [
  {
    id: 'agitation',
    title: 'Escalating Agitation',
    scenario: 'Marcus returns from a phone call with his ex-partner and is visibly agitated. He is pacing rapidly, cursing, and slammed his fist on the common area table. Other residents are becoming anxious. He has not made threats toward anyone but his body language is escalating. You are the only staff member on the floor.',
    deEscalation: [
      'Approach calmly from the side, not head-on. Maintain open body posture.',
      'Use his name: "Marcus, I can see you\'re upset. I\'m here."',
      'Offer a change of environment: "Let\'s step outside / to the quiet room."',
      'Validate the emotion, not the behavior: "It sounds like that call was really difficult."',
      'Do NOT say "calm down" — it invalidates. Do NOT touch without permission.',
      'Give choices: "Do you want to talk about it, or do you need some space first?"',
      'If behavior escalates to threats or property destruction: ensure other residents\' safety first, call supervisor/crisis line.',
    ],
    principle: 'De-escalation works when we address the emotion underneath the behavior. Marcus is not angry AT the table — he is in pain about his family. Our job is to be a safe presence, not an authority figure demanding compliance. The goal is to lower the emotional temperature, not to win a confrontation.',
  },
  {
    id: 'relapse',
    title: 'Suspected Relapse',
    scenario: 'Aisha returned from an approved community pass 2 hours late. She is drowsy, her pupils are constricted, and her speech is slightly slurred. She insists she is "just tired." You notice a fresh injection mark on her forearm that was not present this morning. She becomes defensive when you express concern.',
    deEscalation: [
      'Prioritize safety: assess for overdose signs (respiratory rate, responsiveness). Have Narcan accessible.',
      'Express concern without accusation: "Aisha, I\'m worried about you right now. Your safety matters."',
      'Do NOT force a confession or demand drug testing in the moment of crisis.',
      'If medically stable: ensure she is in a monitored area. Check on her every 15 minutes.',
      'Document observations objectively: behavior, physical signs, timeline. Do not document assumptions.',
      'Address substance use in the next clinical meeting, not during the acute situation.',
      'Harm reduction: "If you did use, I need to know what you took so I can keep you safe. I\'m not here to punish you."',
    ],
    principle: 'Relapse is not a moral failure — it is a clinical event. Our response must prioritize physical safety (fentanyl makes any opioid use potentially fatal), preserve the therapeutic relationship (shaming drives people out of care), and treat the relapse as clinical data (what triggered it? what does the support plan need to change?). Punitive responses increase mortality risk.',
  },
  {
    id: 'suicidal',
    title: 'Suicidal Ideation Disclosure',
    scenario: 'During evening check-in, David quietly tells you: "I\'ve been thinking that everyone would be better off without me. My kids, my ex, my AA group — I just make everything worse." He is not making a specific plan statement but his tone is flat and he avoids eye contact.',
    deEscalation: [
      'Stay present. Do NOT leave him alone. Do NOT panic or overreact visibly.',
      'Ask directly: "David, are you thinking about killing yourself?" — direct language is safer than euphemisms.',
      'If yes: "Do you have a plan? Do you have access to means?" (assess lethality)',
      'Listen without trying to fix: "Thank you for telling me. That took courage."',
      'Do NOT argue ("your kids need you") — this can increase guilt and shame.',
      'Implement safety protocol: notify supervisor, initiate 1:1 observation, remove access to means.',
      'Connect to crisis resources: 988 Suicide & Crisis Lifeline, mobile crisis team if available.',
      'Document using Columbia Suicide Severity Rating Scale (C-SSRS) framework.',
    ],
    principle: 'Passive suicidal ideation ("everyone would be better off") is a clinical emergency that requires direct assessment, not reassurance. Many people disclose suicidal thinking indirectly, hoping someone will ask the direct question. Asking about suicide does NOT increase risk — it reduces it. Our job is to keep him alive tonight and connect him to the right level of care tomorrow.',
  },
  {
    id: 'conflict',
    title: 'Resident Conflict',
    scenario: 'Lily and another resident (not one of your primary clients) are in a heated argument in the kitchen over food storage. The other resident made a comment that Lily interpreted as minimizing her substance use: "You\'re just here for weed, that\'s not even a real addiction." Lily is crying and shouting that nobody takes her seriously. The other resident is doubling down.',
    deEscalation: [
      'Separate immediately: "I need both of you to pause. Lily, step over here. [Name], give us the kitchen for a minute."',
      'Address Lily first (she is your client and is more emotionally activated).',
      'Validate: "What she said was hurtful. Your recovery is real and it matters."',
      'Do NOT referee who was "right" — address the emotional injury.',
      'Separately address the other resident: gatekeeping addiction is harmful to recovery community.',
      'Process with Lily later: this triggered core wound (not being believed/taken seriously — connects to assault disclosure).',
      'Community meeting: address substance hierarchy without naming individuals. All substances can cause suffering.',
    ],
    principle: 'Substance hierarchy ("my addiction is worse/more real than yours") is toxic to recovery communities. It shames people out of seeking help and reflects a fundamental misunderstanding of addiction. For Lily specifically, not being taken seriously connects to her trauma history of not being believed after sexual assault. What looks like a kitchen argument is actually a therapeutic crisis that needs skilled intervention.',
  },
];

// ── Crisis Simulator Scenarios (interactive) ─────────────────
const CRISIS_SCENARIOS = [
  {
    id: 'agitation',
    title: 'Escalating Agitation',
    client: 'Marcus (alcohol, 47 days sober)',
    setup: 'Marcus returns from a family visit visibly agitated. He is pacing the common room, voice rising, saying his ex-wife is "poisoning his kids against him." Two other residents are watching nervously. You are the only staff on shift.',
    stages: [
      {
        situation: 'Marcus kicks a chair and shouts "Nobody in this place gives a damn about me!" Other residents are backing away.',
        options: [
          { id: 'validate', label: 'Validate his feelings: "Marcus, I can see you\'re really hurting right now. That sounds incredibly frustrating."', safety: 8, alliance: 9, compliance: 8, outcome: 'Marcus pauses. His breathing slows slightly. He looks at you. "You don\'t know what it\'s like." But he stops pacing.', optimal: true },
          { id: 'boundary', label: 'Set a firm boundary: "Marcus, I need you to stop kicking furniture right now. That behavior isn\'t acceptable."', safety: 6, alliance: 3, compliance: 7, outcome: 'Marcus turns on you. "Oh, so now YOU\'RE telling me what to do too?" He picks up a water bottle and throws it at the wall. The other residents leave the room quickly.' },
          { id: 'call', label: 'Immediately call your supervisor for backup.', safety: 5, alliance: 4, compliance: 9, outcome: 'Marcus sees you reach for the phone and says "Great, calling the cops on me now. I\'m out of here." He moves toward the exit. If he leaves, he\'s at high relapse risk.' },
          { id: 'redirect', label: 'Try to redirect: "Hey Marcus, have you eaten today? Let\'s go to the kitchen."', safety: 4, alliance: 5, compliance: 5, outcome: 'Marcus stares at you like you\'re insane. "Are you serious right now? I\'m telling you my life is falling apart and you want to talk about FOOD?" His agitation increases.' },
        ],
      },
      {
        situation: 'Marcus has calmed slightly but is now crying. He says "I just want to see my kids. What\'s the point of being sober if I can\'t even see my kids?"',
        options: [
          { id: 'reflect', label: 'Reflective listening: "It sounds like being separated from your kids is the hardest part of all this."', safety: 8, alliance: 10, compliance: 8, outcome: 'Marcus nods. "It is. It really is." He sits down. You\'ve moved from crisis to therapeutic conversation.', optimal: true },
          { id: 'solution', label: 'Problem-solve: "Let\'s talk about what steps you could take to get visitation."', safety: 7, alliance: 5, compliance: 7, outcome: 'Marcus says "I\'ve tried everything." He\'s not ready for solutions yet — he needs to be heard first. But he\'s not escalating.' },
          { id: 'confront', label: 'Gentle confrontation: "Marcus, drinking won\'t get your kids back. Staying sober is the path to custody."', safety: 6, alliance: 2, compliance: 6, outcome: 'Marcus says "You think I don\'t know that?" He stands up again. You\'ve accidentally invalidated his pain. Trust drops.' },
        ],
      },
    ],
    debrief: {
      bestPath: 'Validate \→ Reflect',
      principle: 'De-escalation follows a predictable sequence: safety first (physical environment), then emotional validation, then reflective listening. Solutions come AFTER the person feels heard. The biggest mistake is jumping to problem-solving or boundary-setting before the emotional temperature drops.',
      framework: 'Motivational Interviewing (Miller & Rollnick): Express empathy, develop discrepancy, roll with resistance, support self-efficacy',
      realWorld: 'This scenario is based on common residential treatment dynamics. Family conflict is the #1 trigger for relapse in the first 90 days. Staff who validate first and redirect second have 3x better outcomes than staff who lead with boundaries (SAMHSA TIP 35).',
    },
  },
  {
    id: 'relapse',
    title: 'Suspected Relapse',
    client: 'Denise (opioids, 23 days clean)',
    setup: 'Denise missed morning group \— unusual for her. You find her in her room, drowsy, pupils constricted. She insists she "just didn\'t sleep well." Her speech is slightly slurred. There\'s no paraphernalia visible, but her behavior is inconsistent with fatigue alone.',
    stages: [
      {
        situation: 'You need to assess the situation. Denise is not in immediate medical danger but her presentation is concerning.',
        options: [
          { id: 'observe', label: 'Conduct a clinical observation: check vitals (pulse, breathing rate, pupil response), document findings objectively.', safety: 9, alliance: 7, compliance: 10, outcome: 'Pulse 58 bpm (low), resp rate 10 (borderline low), pupils 2mm (constricted). These findings are consistent with opioid use but not overdose. You now have documented clinical data.', optimal: true },
          { id: 'accuse', label: 'Directly ask: "Denise, did you use? I need you to be honest with me."', safety: 5, alliance: 2, compliance: 5, outcome: 'Denise becomes defensive. "I told you, I didn\'t sleep. Why does everyone always assume the worst?" She refuses further interaction. You\'ve lost the therapeutic alliance and gained no clinical data.' },
          { id: 'test', label: 'Tell her she needs to take a urine drug screen immediately.', safety: 6, alliance: 3, compliance: 8, outcome: 'Denise says "Fine, whatever." She complies but is visibly angry. The test will take 15 minutes. Meanwhile, if she IS on opioids, her condition could change.' },
          { id: 'ignore', label: 'Accept her explanation and check back in an hour.', safety: 2, alliance: 6, compliance: 1, outcome: 'If this IS an opioid relapse, respiratory depression can worsen rapidly. Waiting an hour without clinical assessment violates duty of care and could be fatal if she took a high dose.' },
        ],
      },
      {
        situation: 'Your clinical assessment confirms suspected opioid use. Denise is stable but needs monitoring. She starts crying: "Please don\'t kick me out. I can\'t go back to the streets."',
        options: [
          { id: 'reassure', label: 'Reassure and plan: "Denise, relapse is part of recovery. We\'re not kicking you out. But we need to keep you safe and adjust your treatment plan."', safety: 9, alliance: 9, compliance: 9, outcome: 'Denise sobs with relief. "I\'m sorry. I found a bag in my old coat pocket and I just... I wasn\'t even thinking." She agrees to increased monitoring, naloxone availability, and a revised safety plan.', optimal: true },
          { id: 'discharge', label: 'Inform her that per program rules, relapse requires discharge.', safety: 4, alliance: 0, compliance: 6, outcome: 'Denise goes silent. She packs her bag. Within 48 hours she is using again, this time without any support system. Zero-tolerance policies save programs liability but kill clients.' },
          { id: 'condition', label: 'Tell her she can stay but only if she agrees to daily drug testing.', safety: 7, alliance: 5, compliance: 7, outcome: 'Denise agrees reluctantly. The condition is reasonable but was delivered as an ultimatum rather than a collaborative safety plan. The alliance is strained but functional.' },
        ],
      },
    ],
    debrief: {
      bestPath: 'Observe clinically \→ Reassure and plan',
      principle: 'Suspected relapse requires clinical assessment FIRST (document, don\'t accuse), then harm reduction SECOND (safety plan, not punishment). Zero-tolerance discharge policies are correlated with increased mortality (Hawk et al., 2017). The SAMHSA harm reduction framework treats relapse as clinical data, not moral failure.',
      framework: 'SAMHSA Harm Reduction Framework + ASAM Criteria for treatment planning adjustment',
      realWorld: 'Fentanyl-era relapse is uniquely dangerous because tolerance drops rapidly during abstinence. A dose that was survivable 23 days ago may now be fatal. This is why clinical observation (not accusation) is the first priority \— you need to know if naloxone might be needed.',
    },
  },
  {
    id: 'suicidal',
    title: 'Suicidal Ideation Disclosure',
    client: 'James (polysubstance, 60 days sober)',
    setup: 'During a routine one-on-one check-in, James says quietly: "I\'ve been thinking... maybe everyone would be better off without me." He\'s looking at the floor. His tone is flat, not dramatic.',
    stages: [
      {
        situation: 'James has just disclosed passive suicidal ideation. You need to assess lethality.',
        options: [
          { id: 'ask_directly', label: 'Ask directly: "James, are you thinking about killing yourself?"', safety: 10, alliance: 8, compliance: 10, outcome: 'James looks up, surprised. "I... yeah. Sometimes. Not like a plan. Just the thought." You\'ve opened the door to a genuine assessment. Research shows asking directly does NOT increase suicidal ideation \— it reduces it (Dazzi et al., 2014).', optimal: true },
          { id: 'minimize', label: 'Reassure: "Come on James, things aren\'t that bad. You\'ve been doing great in the program."', safety: 2, alliance: 1, compliance: 1, outcome: 'James shuts down completely. He says "Yeah, you\'re right, forget I said anything." He has learned that disclosing to you is unsafe. If his ideation progresses, he will not tell you.' },
          { id: 'deflect', label: 'Redirect to positive: "What about your sobriety milestone? 60 days is amazing."', safety: 3, alliance: 3, compliance: 2, outcome: 'James nods mechanically. "Sure." You\'ve communicated that his pain is less important than his progress. He withdraws from the conversation.' },
          { id: 'panic', label: 'Immediately call 911.', safety: 6, alliance: 2, compliance: 7, outcome: 'James says "Wait, no, I don\'t need an ambulance." But protocol was followed. The issue: calling 911 for passive ideation (without a plan, means, or timeline) is a disproportionate response that may traumatize the client and destroy the therapeutic relationship.' },
        ],
      },
      {
        situation: 'James confirms passive ideation without a specific plan. He says he doesn\'t have means or a timeline, but "the thoughts won\'t stop." He hasn\'t told anyone else.',
        options: [
          { id: 'safety_plan', label: 'Collaboratively develop a safety plan: identify warning signs, coping strategies, people to contact, professional resources, and means restriction.', safety: 10, alliance: 10, compliance: 10, outcome: 'James engages with the safety plan. He identifies two warning signs (isolation and insomnia), three coping strategies (walking, calling his sponsor, journaling), and agrees to tell you if ideation intensifies. You document the plan and schedule a psychiatry referral.', optimal: true },
          { id: 'contract', label: 'Ask him to sign a "no-suicide contract."', safety: 4, alliance: 4, compliance: 3, outcome: 'James signs it because you asked him to. But no-suicide contracts have NO evidence of efficacy (Rudd et al., 2006) and create a false sense of security. They are a liability shield, not a clinical intervention.' },
          { id: 'refer_only', label: 'Tell him you\'ll schedule a psychiatry appointment and follow up tomorrow.', safety: 6, alliance: 5, compliance: 6, outcome: 'Appropriate but insufficient. Between now and the appointment, James has no safety plan. The gap between disclosure and professional intervention is the highest-risk period.' },
        ],
      },
    ],
    debrief: {
      bestPath: 'Ask directly \→ Collaborative safety plan',
      principle: 'The Columbia Suicide Severity Rating Scale (C-SSRS) provides structured assessment: ideation type (passive vs active), plan specificity, means access, timeline, and protective factors. Asking directly about suicide does not cause harm \— NOT asking is what causes harm. Safety planning (Stanley & Brown, 2012) is the evidence-based intervention, not no-suicide contracts.',
      framework: 'Columbia Protocol (C-SSRS) + Stanley-Brown Safety Planning Intervention + Zero Suicide Initiative',
      realWorld: 'Substance use disorder doubles suicide risk. The first 90 days of recovery are the highest-risk period because the coping mechanism (substance use) has been removed but healthy alternatives haven\'t been fully established. James\'s disclosure is a clinical opportunity, not just a crisis.',
    },
  },
];

// ── Scholarly Micro-Content Tooltips ─────────────────────────
const RESPITE_TIPS = {
  harm_reduction: "Harm reduction acknowledges that abstinence-only approaches fail for many people \u2014 needle exchanges, naloxone distribution, and supervised consumption sites reduce death without requiring sobriety as a precondition. The evidence base is extensive and clear: syringe service programs reduce HIV transmission by 50%+ and serve as entry points to treatment. But the politics are contentious because harm reduction appears to 'enable' substance use. The fundamental question is whether the goal of drug policy is to reduce drug use or to reduce death. These are not the same objective, and they often require opposite interventions.",
  asam_criteria: "The ASAM (American Society of Addiction Medicine) placement criteria use 6 dimensions to match patients to appropriate treatment intensity: acute intoxication/withdrawal potential, biomedical conditions, emotional/behavioral/cognitive conditions, readiness to change, relapse/continued use potential, and recovery/living environment. The system replaced clinical intuition with structured assessment, which matters because intuition-based placement systematically over-referred some populations and under-referred others. The criteria are not a formula \u2014 they're a framework that makes clinical reasoning transparent and auditable.",
  therapeutic_alliance: "The therapeutic alliance \u2014 the working relationship between provider and client \u2014 is the single strongest predictor of treatment outcomes across all therapeutic modalities, accounting for more outcome variance than the specific technique used. This finding, replicated across hundreds of studies, means that a strong relationship with a provider using an 'inferior' technique outperforms a weak relationship with a provider using the 'gold standard.' In substance use treatment, this is why 'test immediately and confront results' can be clinically counterproductive even when institutional rules require it \u2014 destroying the alliance to enforce a protocol may produce worse outcomes than the protocol violation.",
};

// ── Component ────────────────────────────────────────────────
function RespiteView({ setView }) {
  const [mode, setMode] = useState('intake');
  const [selectedClient, setSelectedClient] = useState(0);
  const [expandedDimension, setExpandedDimension] = useState(null);
  const [expandedCrisis, setExpandedCrisis] = useState(null);
  const [revealedPlans, setRevealedPlans] = useState({});
  const [revealedSteps, setRevealedSteps] = useState({});
  const [tipId, setTipId] = useState(null);

  // Crisis Sim state
  const [simScenario, setSimScenario] = useState(null);
  const [simStage, setSimStage] = useState(0);
  const [simChoices, setSimChoices] = useState([]);
  const [simShowOutcome, setSimShowOutcome] = useState(false);
  const [simComplete, setSimComplete] = useState(false);

  // ── Scholarly Micro-Icons & Tooltip ──────────────────────────
  function Tip({ id }) {
    if (tipId !== id || !RESPITE_TIPS[id]) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(9,10,12,.92)', border: '1px solid ' + C.accent + '25', borderRadius: 3, maxWidth: 440, fontSize: 11, fontFamily: Mono, color: C.tx2, lineHeight: 1.65, margin: '6px 0 10px' }}>
        {RESPITE_TIPS[id]}
      </div>
    );
  }

  const HarmReductionIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='harm_reduction'?null:'harm_reduction')}>
      <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <path d="M7 11 L10 14 L15 8" fill="none" stroke="currentColor" strokeWidth=".8"/>
    </svg>
  );

  const AsamIcon = () => (
    <svg width="24" height="20" viewBox="0 0 24 20" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='asam_criteria'?null:'asam_criteria')}>
      <rect x="2" y="2" width="6" height="16" rx="1" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <rect x="9" y="5" width="6" height="13" rx="1" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <rect x="16" y="8" width="6" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <line x1="4" y1="10" x2="6" y2="10" stroke="currentColor" strokeWidth=".4"/>
      <line x1="11" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth=".4"/>
      <line x1="18" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth=".4"/>
    </svg>
  );

  const AllianceIcon = () => (
    <svg width="24" height="22" viewBox="0 0 24 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='therapeutic_alliance'?null:'therapeutic_alliance')}>
      <circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <circle cx="16" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <path d="M8 12 Q8 18 12 18 Q16 18 16 12" fill="none" stroke="currentColor" strokeWidth=".6"/>
    </svg>
  );

  const togglePlan = useCallback((id) => {
    setRevealedPlans(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleSteps = useCallback((id) => {
    setRevealedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const scoreColor = useCallback((score) => {
    if (score >= 3) return C.red;
    if (score === 2) return C.yellow;
    return C.green;
  }, []);

  // Crisis Sim helpers
  const startSim = useCallback((scenario) => {
    setSimScenario(scenario);
    setSimStage(0);
    setSimChoices([]);
    setSimShowOutcome(false);
    setSimComplete(false);
  }, []);

  const selectOption = useCallback((option) => {
    setSimChoices(prev => [...prev, option]);
    setSimShowOutcome(true);
  }, []);

  const advanceStage = useCallback(() => {
    const scenario = simScenario;
    if (simStage + 1 >= scenario.stages.length) {
      setSimComplete(true);
    } else {
      setSimStage(prev => prev + 1);
      setSimShowOutcome(false);
    }
  }, [simScenario, simStage]);

  const resetSim = useCallback(() => {
    setSimScenario(null);
    setSimStage(0);
    setSimChoices([]);
    setSimShowOutcome(false);
    setSimComplete(false);
  }, []);

  // Compute cumulative sim scores
  const simScores = useMemo(() => {
    if (!simChoices.length) return { safety: 0, alliance: 0, compliance: 0, total: 0, max: 0, pct: 0 };
    const s = simChoices.reduce((a, c) => ({
      safety: a.safety + c.safety,
      alliance: a.alliance + c.alliance,
      compliance: a.compliance + c.compliance,
    }), { safety: 0, alliance: 0, compliance: 0 });
    const maxPerStage = 10;
    const stageCount = simChoices.length;
    const max = maxPerStage * 3 * stageCount;
    const total = s.safety + s.alliance + s.compliance;
    return { ...s, total, max, pct: Math.round(total / max * 100) };
  }, [simChoices]);

  const simGrade = useMemo(() => {
    if (!simComplete || !simChoices.length) return null;
    const pct = simScores.pct;
    if (pct >= 90) return { letter: 'A', label: 'Expert Clinician', color: C.green, desc: 'Your responses demonstrated exceptional clinical judgment. You prioritized safety, preserved the therapeutic alliance, and maintained regulatory compliance. This is the standard of care.' };
    if (pct >= 75) return { letter: 'B', label: 'Competent Responder', color: C.teal, desc: 'Your responses were generally effective. You made sound clinical decisions but missed some opportunities to strengthen the therapeutic alliance or optimize safety. Review the debrief for areas of growth.' };
    if (pct >= 60) return { letter: 'C', label: 'Developing Skills', color: C.yellow, desc: 'Your responses kept the situation from worsening but missed key opportunities. Common patterns: jumping to solutions before validation, or prioritizing compliance over alliance. These are learnable skills.' };
    if (pct >= 40) return { letter: 'D', label: 'Needs Training', color: C.red, desc: 'Several responses risked escalating the crisis or damaging the therapeutic relationship. This is a sign you need additional supervised training in de-escalation and motivational interviewing. Review the debrief carefully.' };
    return { letter: 'F', label: 'Harmful Responses', color: C.red, desc: 'Your responses would likely result in client harm, discharge, or loss of life. This is not a moral judgment \— these are skills that must be taught and practiced. Seek supervised clinical training before handling crisis situations independently.' };
  }, [simComplete, simChoices, simScores]);

  // ── Score Bar Component ────────────────────────────────────
  const ScoreBar = useCallback(({ label, value, max }) => {
    const pct = Math.round(value / max * 100);
    const barColor = pct >= 80 ? C.green : pct >= 60 ? C.yellow : C.red;
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3,
        }}>
          <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: '.06em' }}>
            {label}
          </span>
          <span style={{ fontFamily: Mono, fontSize: 11, fontWeight: 700, color: barColor }}>
            {value}/{max}
          </span>
        </div>
        <div style={{ height: 6, background: C.line, borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            width: pct + '%', height: '100%', borderRadius: 3, background: barColor,
            transition: 'width .4s ease',
          }} />
        </div>
      </div>
    );
  }, []);

  // ── Mode Switch ──────────────────────────────────────────
  const ModeSwitch = useCallback(() => {
    const modes = [
      { id: 'intake', label: 'Intake', desc: 'ASAM Assessment' },
      { id: 'support', label: 'Support Plans', desc: 'Individualized Care' },
      { id: 'crisis', label: 'Crisis', desc: 'De-Escalation' },
      { id: 'sim', label: 'Crisis Sim', desc: 'Interactive Simulator' },
    ];
    return (
      <div style={{ display: 'flex', gap: 2, marginBottom: 24, borderBottom:'1px solid rgba(88,112,160,.1)' }}>
        {modes.map(m => {
          const isActive = mode === m.id;
          const isCrisis = m.id === 'crisis' || m.id === 'sim';
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              style={{
                flex: 1, padding: '10px 12px', cursor: 'pointer',
                background: isActive ? (isCrisis ? 'rgba(168,72,72,.08)' : 'rgba(88,112,160,.08)') : 'transparent',
                border: 'none',
                borderBottom: isActive ? ('2px solid ' + (isCrisis ? C.red : C.accent)) : '2px solid transparent',
                borderRadius: '4px 4px 0 0',
                textAlign: 'center', transition: 'all .15s ease',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 11, fontWeight: 600,
                color: isActive ? (isCrisis ? C.red : C.accent) : C.tx3, display: 'block',
                letterSpacing:'.04em',
              }}>{m.label}</span>
              <span style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{m.desc}</span>
            </button>
          );
        })}
      </div>
    );
  }, [mode]);

  // ── Intake Renderer ───────────────────────────────────────
  const renderIntake = useCallback(() => {
    const client = CLIENTS[selectedClient];
    return (
      <div>
        {/* Client selector */}
        <div style={{
          display: 'flex', gap: 3, marginBottom: 20, overflowX: 'auto', paddingBottom: 4,
        }}>
          {CLIENTS.map((c, i) => (
            <button key={c.id} onClick={() => setSelectedClient(i)} style={{
              flex: '1 0 auto', padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
              background: i === selectedClient ? C.accentBg : 'transparent',
              border: i === selectedClient ? '1px solid ' + C.accentDm : '1px solid ' + C.line,
              transition: 'all .12s ease',
            }}>
              <span style={{
                fontFamily: Mono, fontSize: 12, fontWeight: 600,
                color: i === selectedClient ? C.accent : C.tx3, display: 'block',
              }}>{c.name}</span>
              <span style={{
                fontFamily: Sans, fontSize: 11,
                color: i === selectedClient ? C.tx2 : C.tx3,
              }}>Age {c.age} | {c.substance.split('(' /* ) */)[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Client card */}
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 8, padding: 28, marginBottom: 16,
        }}>
          <div style={{
            fontFamily: Mono, fontSize: 11, letterSpacing: '.1em',
            color: C.accentDm, marginBottom: 6,
          }}>INTAKE ASSESSMENT</div>
          <h2 style={{
            fontFamily: Serif, fontSize: 24, fontWeight: 700, color: C.tx, marginBottom: 4,
          }}>{client.name}, age {client.age}</h2>
          <div style={{ fontFamily: Mono, fontSize: 11, color: C.teal, marginBottom: 16 }}>
            {client.substance}
          </div>

          <div style={{
            fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
            paddingLeft: 16, borderLeft: '3px solid ' + C.accentDm, marginBottom: 24,
          }}>
            {client.background}
          </div>

          {/* ASAM Dimensions */}
          <div style={{
            fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
            color: C.teal, marginBottom: 12, fontWeight: 600,
          }}>ASAM MULTIDIMENSIONAL ASSESSMENT</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 8px' }}>
            <AsamIcon /><Tip id="asam_criteria" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ASAM_DIMENSIONS.map(dim => {
              const data = client.asam[dim.id];
              const isOpen = expandedDimension === client.id + ':' + dim.id;
              return (
                <div key={dim.id} style={{
                  background: C.accentBg, border: '1px solid ' + (isOpen ? C.accentDm : C.line),
                  borderRadius: 6, overflow: 'hidden', transition: 'border-color .15s ease',
                }}>
                  <button
                    onClick={() => setExpandedDimension(prev => prev === client.id + ':' + dim.id ? null : client.id + ':' + dim.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                      padding: '12px 16px', cursor: 'pointer',
                      background: 'none', border: 'none', textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: 18, width: 32, textAlign: 'center' }}>{dim.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: Sans, fontSize: 13, fontWeight: 600, color: C.tx }}>
                        {dim.name}
                      </div>
                      <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx3 }}>{dim.desc}</div>
                    </div>
                    <span style={{
                      fontFamily: Mono, fontSize: 14, fontWeight: 700, color: scoreColor(data.score),
                      padding: '2px 8px', borderRadius: 3,
                      background: data.score >= 3 ? C.redBg : data.score === 2 ? C.yellowBg : C.greenBg,
                    }}>
                      {data.score}/3
                    </span>
                    <span style={{
                      fontFamily: Mono, fontSize: 14, color: C.tx3,
                      transition: 'transform .15s ease',
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                    }}>{'\u25B6'}</span>
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 16px 14px', borderTop: '1px solid ' + C.line, paddingTop: 12,
                    }}>
                      <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7 }}>
                        {data.note}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Total acuity */}
          <div style={{
            marginTop: 16, display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 16px', background: C.accentBg, borderRadius: 6, border: '1px solid ' + C.line,
          }}>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>TOTAL ACUITY</span>
            <div style={{ flex: 1, height: 6, background: C.line, borderRadius: 3 }}>
              <div style={{
                width: (Object.values(client.asam).reduce((s, d) => s + d.score, 0) / 18 * 100) + '%',
                height: '100%', borderRadius: 3, background: C.teal, transition: 'width .3s ease',
              }} />
            </div>
            <span style={{ fontFamily: Mono, fontSize: 12, fontWeight: 700, color: C.teal }}>
              {Object.values(client.asam).reduce((s, d) => s + d.score, 0)}/18
            </span>
          </div>
        </div>
      </div>
    );
  }, [selectedClient, expandedDimension, scoreColor]);

  // ── Support Plans Renderer ────────────────────────────────
  const renderSupport = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>INDIVIDUALIZED SUPPORT PLANS</div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          Each support plan is built from the ASAM assessment, addressing the highest-acuity
          dimensions first. Plans follow harm reduction principles: meet people where they are,
          prioritize safety over abstinence demands, and build on existing strengths. A good
          plan is the client's plan — not ours.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CLIENTS.map((client) => {
            const isRevealed = revealedPlans[client.id];
            const acuity = Object.values(client.asam).reduce((s, d) => s + d.score, 0);
            return (
              <div key={client.id} style={{
                background: C.card, border: '1px solid ' + C.cardBd,
                borderRadius: 8, overflow: 'hidden',
              }}>
                <button
                  onClick={() => togglePlan(client.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: Serif, fontSize: 16, fontWeight: 600, color: C.tx }}>
                      {client.name}, {client.age}
                    </div>
                    <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                      {client.substance.split('(' /* ) */)[0].trim()} | Acuity: {acuity}/18
                    </div>
                  </div>
                  <span style={{
                    fontFamily: Mono, fontSize: 14, color: C.tx3,
                    transition: 'transform .15s ease',
                    transform: isRevealed ? 'rotate(90deg)' : 'rotate(0)',
                  }}>{'\u25B6'}</span>
                </button>
                {isRevealed && (
                  <div style={{
                    padding: '0 20px 20px', borderTop: '1px solid ' + C.line, paddingTop: 16,
                  }}>
                    {client.supportPlan.map((item, i) => {
                      const isCritical = item.startsWith('CRITICAL') || item.startsWith('URGENT');
                      return (
                        <div key={i} style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.65,
                          padding: '6px 0 6px 16px',
                          borderLeft: '2px solid ' + (isCritical ? C.red : i === 0 ? C.teal : C.line),
                          marginBottom: 4,
                          background: isCritical ? C.redBg : 'transparent',
                          borderRadius: isCritical ? 4 : 0,
                          paddingRight: isCritical ? 12 : 0,
                        }}>
                          {isCritical && <span style={{ color: C.red, fontWeight: 700 }}>{'\⚠'} </span>}
                          {item}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [revealedPlans, togglePlan]);

  // ── Crisis Renderer (informational) ────────────────────────
  const renderCrisis = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>CRISIS DE-ESCALATION SCENARIOS</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 8px' }}>
          <AllianceIcon /><Tip id="therapeutic_alliance" />
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          Crisis situations in respite settings require immediate, skilled responses that
          prioritize safety while preserving dignity and the therapeutic relationship. These
          scenarios represent the real situations that respite staff encounter. There are no
          perfect responses — only responses that keep people safe and connected.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CRISES.map(crisis => {
            const isOpen = expandedCrisis === crisis.id;
            const stepsRevealed = revealedSteps[crisis.id];
            return (
              <div key={crisis.id} style={{
                background: C.card, border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
                borderRadius: 8, padding: 22,
              }}>
                <div style={{
                  fontFamily: Serif, fontSize: 18, fontWeight: 600, color: C.tx, marginBottom: 10,
                }}>
                  {crisis.title}
                </div>
                <div style={{
                  fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.7,
                  paddingLeft: 14, borderLeft: '3px solid ' + C.redDm, marginBottom: 16,
                }}>
                  {crisis.scenario}
                </div>

                {!stepsRevealed ? (
                  <button onClick={() => toggleSteps(crisis.id)} style={{
                    width: '100%', padding: '12px 20px', borderRadius: 6, cursor: 'pointer',
                    background: C.tealBg, border: '1px solid ' + C.tealDm,
                    color: C.teal, fontFamily: Mono, fontSize: 12,
                    letterSpacing: '.04em', transition: 'all .15s ease',
                  }}>
                    REVEAL DE-ESCALATION APPROACH
                  </button>
                ) : (
                  <div>
                    <div style={{ fontFamily: Mono, fontSize: 11, color: C.teal, marginBottom: 8, letterSpacing: '.06em' }}>
                      DE-ESCALATION STEPS
                    </div>
                    {crisis.deEscalation.map((step, i) => (
                      <div key={i} style={{
                        fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.65,
                        padding: '4px 0 4px 16px', borderLeft: '2px solid ' + C.tealDm,
                        marginBottom: 4,
                      }}>
                        {step}
                      </div>
                    ))}
                    <div style={{
                      marginTop: 14, background: C.tealBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{ fontFamily: Mono, fontSize: 11, color: C.tealDm, marginBottom: 6, letterSpacing: '.06em' }}>
                        GUIDING PRINCIPLE
                      </div>
                      <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7 }}>
                        {crisis.principle}
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
  }, [expandedCrisis, revealedSteps, toggleSteps]);

  // ── Crisis Simulator Renderer ──────────────────────────────
  const renderSim = useCallback(() => {
    // Scenario selection screen
    if (!simScenario) {
      return (
        <div>
          <div style={{
            fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
            color: C.redDm, marginBottom: 6,
          }}>CRISIS DE-ESCALATION SIMULATOR</div>
          <div style={{
            fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
            marginBottom: 12, maxWidth: 720,
          }}>
            You are a respite staff member facing a real-time crisis. Each scenario presents
            a multi-stage situation where your choices have consequences. Every response is
            scored on three dimensions: client safety, therapeutic alliance, and regulatory
            compliance. There are no do-overs. Choose carefully.
          </div>
          <div style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3, lineHeight: 1.65,
            marginBottom: 24, maxWidth: 720,
            padding: '10px 14px', background: C.yellowBg, borderRadius: 6,
            border: '1px solid ' + C.yellowDm,
          }}>
            <strong style={{ color: C.yellow }}>Note:</strong> These scenarios are based on
            real clinical situations. The "right" answers are drawn from evidence-based
            frameworks (SAMHSA, C-SSRS, Motivational Interviewing). Your composite score
            determines your clinical readiness grade.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CRISIS_SCENARIOS.map(sc => (
              <div key={sc.id} style={{
                background: C.card, border: '1px solid ' + C.cardBd,
                borderRadius: 8, padding: 22,
              }}>
                <div style={{
                  fontFamily: Serif, fontSize: 18, fontWeight: 600, color: C.tx, marginBottom: 4,
                }}>
                  {sc.title}
                </div>
                <div style={{
                  fontFamily: Mono, fontSize: 12, color: C.teal, marginBottom: 10,
                }}>
                  Client: {sc.client} {'\u2022'} {sc.stages.length} stages
                </div>
                <div style={{
                  fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.7,
                  marginBottom: 16,
                }}>
                  {sc.setup}
                </div>
                <button onClick={() => startSim(sc)} style={{
                  width: '100%', padding: '12px 20px', borderRadius: 6, cursor: 'pointer',
                  background: C.redBg, border: '1px solid ' + C.redDm,
                  color: C.red, fontFamily: Mono, fontSize: 12, fontWeight: 600,
                  letterSpacing: '.04em', transition: 'all .15s ease',
                }}>
                  BEGIN SCENARIO
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Debrief screen (simulation complete)
    if (simComplete) {
      const db = simScenario.debrief;
      const grade = simGrade;
      const stageCount = simScenario.stages.length;
      const maxPerAxis = 10 * stageCount;
      return (
        <div>
          <div style={{
            fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
            color: C.redDm, marginBottom: 6,
          }}>SCENARIO COMPLETE \— DEBRIEF</div>

          {/* Grade card */}
          <div style={{
            background: C.card, border: '1px solid ' + C.cardBd,
            borderRadius: 8, padding: 28, marginBottom: 20, textAlign: 'center',
          }}>
            <div style={{
              fontFamily: Mono, fontSize: 72, fontWeight: 700,
              color: grade.color, lineHeight: 1,
            }}>{grade.letter}</div>
            <div style={{
              fontFamily: Serif, fontSize: 20, fontWeight: 600, color: C.tx, marginTop: 8,
            }}>{grade.label}</div>
            <div style={{
              fontFamily: Mono, fontSize: 12, color: C.tx3, marginTop: 4,
            }}>Composite Score: {simScores.total}/{simScores.max} ({simScores.pct}%)</div>
            <div style={{
              fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.7,
              marginTop: 14, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto',
            }}>
              {grade.desc}
            </div>
          </div>

          {/* Score breakdown */}
          <div style={{
            background: C.card, border: '1px solid ' + C.cardBd,
            borderRadius: 8, padding: 22, marginBottom: 20,
          }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.accentDm, marginBottom: 14,
            }}>SCORE BREAKDOWN</div>
            <ScoreBar label="CLIENT SAFETY" value={simScores.safety} max={maxPerAxis} />
            <ScoreBar label="THERAPEUTIC ALLIANCE" value={simScores.alliance} max={maxPerAxis} />
            <ScoreBar label="REGULATORY COMPLIANCE" value={simScores.compliance} max={maxPerAxis} />
          </div>

          {/* Choice review */}
          <div style={{
            background: C.card, border: '1px solid ' + C.cardBd,
            borderRadius: 8, padding: 22, marginBottom: 20,
          }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.accentDm, marginBottom: 14,
            }}>YOUR CHOICES</div>
            {simChoices.map((choice, idx) => {
              const stage = simScenario.stages[idx];
              const wasOptimal = choice.optimal;
              const optimalChoice = stage.options.find(o => o.optimal);
              return (
                <div key={idx} style={{
                  marginBottom: idx < simChoices.length - 1 ? 16 : 0,
                  padding: '14px 16px', borderRadius: 6,
                  background: wasOptimal ? C.greenBg : C.yellowBg,
                  border: '1px solid ' + (wasOptimal ? C.greenDm : C.yellowDm),
                }}>
                  <div style={{
                    fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                    color: wasOptimal ? C.green : C.yellow, marginBottom: 6,
                  }}>
                    STAGE {idx + 1} {wasOptimal ? '\— OPTIMAL CHOICE' : '\— SUBOPTIMAL'}
                  </div>
                  <div style={{
                    fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.6, marginBottom: 8,
                  }}>
                    You chose: {choice.label}
                  </div>
                  {!wasOptimal && optimalChoice && (
                    <div style={{
                      fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6,
                      paddingLeft: 12, borderLeft: '2px solid ' + C.greenDm,
                    }}>
                      Better choice: {optimalChoice.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Debrief content */}
          <div style={{
            background: C.card, border: '1px solid ' + C.cardBd,
            borderRadius: 8, padding: 22, marginBottom: 20,
          }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.tealDm, marginBottom: 14,
            }}>CLINICAL DEBRIEF</div>

            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontFamily: Mono, fontSize: 12, color: C.green, marginBottom: 6,
              }}>BEST PATH</div>
              <div style={{
                fontFamily: Serif, fontSize: 15, fontWeight: 600, color: C.tx,
              }}>{db.bestPath}</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontFamily: Mono, fontSize: 12, color: C.teal, marginBottom: 6,
              }}>CORE PRINCIPLE</div>
              <div style={{
                fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75,
                paddingLeft: 14, borderLeft: '3px solid ' + C.tealDm,
              }}>{db.principle}</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontFamily: Mono, fontSize: 12, color: C.accent, marginBottom: 6,
              }}>EVIDENCE-BASED FRAMEWORK</div>
              <div style={{
                fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.65,
              }}>{db.framework}</div>
            </div>

            <div>
              <div style={{
                fontFamily: Mono, fontSize: 12, color: C.yellow, marginBottom: 6,
              }}>REAL-WORLD CONTEXT</div>
              <div style={{
                fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.65,
              }}>{db.realWorld}</div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={resetSim} style={{
              flex: 1, padding: '12px 20px', borderRadius: 6, cursor: 'pointer',
              background: C.accentBg, border: '1px solid ' + C.accentDm,
              color: C.accent, fontFamily: Mono, fontSize: 12,
              letterSpacing: '.04em',
            }}>
              {'\←'} ALL SCENARIOS
            </button>
            <button onClick={() => startSim(simScenario)} style={{
              flex: 1, padding: '12px 20px', borderRadius: 6, cursor: 'pointer',
              background: C.redBg, border: '1px solid ' + C.redDm,
              color: C.red, fontFamily: Mono, fontSize: 12,
              letterSpacing: '.04em',
            }}>
              RETRY THIS SCENARIO
            </button>
          </div>
        </div>
      );
    }

    // Active simulation stage
    const stage = simScenario.stages[simStage];
    const currentChoice = simChoices[simStage];
    const stageCount = simScenario.stages.length;
    return (
      <div>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 16,
        }}>
          <div>
            <div style={{
              fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
              color: C.redDm, marginBottom: 2,
            }}>ACTIVE SCENARIO</div>
            <div style={{
              fontFamily: Serif, fontSize: 20, fontWeight: 600, color: C.tx,
            }}>{simScenario.title}</div>
            <div style={{
              fontFamily: Mono, fontSize: 12, color: C.teal,
            }}>Client: {simScenario.client}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: Mono, fontSize: 12, color: C.tx3,
            }}>STAGE</div>
            <div style={{
              fontFamily: Mono, fontSize: 24, fontWeight: 700, color: C.accent,
            }}>{simStage + 1}/{stageCount}</div>
          </div>
        </div>

        {/* Stage progress bar */}
        <div style={{
          height: 4, background: C.line, borderRadius: 2, marginBottom: 20, overflow: 'hidden',
        }}>
          <div style={{
            width: ((simStage + (simShowOutcome ? 1 : 0.5)) / stageCount * 100) + '%',
            height: '100%', borderRadius: 2, background: C.red,
            transition: 'width .3s ease',
          }} />
        </div>

        {/* Setup context (shown on first stage) */}
        {simStage === 0 && !simShowOutcome && (
          <div style={{
            background: C.card, border: '1px solid ' + C.cardBd,
            borderRadius: 8, padding: 18, marginBottom: 16,
          }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.accentDm, marginBottom: 8,
            }}>CONTEXT</div>
            <div style={{
              fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.7,
            }}>{simScenario.setup}</div>
          </div>
        )}

        {/* Situation */}
        <div style={{
          background: C.card, border: '1px solid ' + C.redDm,
          borderRadius: 8, padding: 20, marginBottom: 16,
        }}>
          <div style={{
            fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
            color: C.redDm, marginBottom: 8,
          }}>SITUATION</div>
          <div style={{
            fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
          }}>{stage.situation}</div>
        </div>

        {/* Options or outcome */}
        {!simShowOutcome ? (
          <div>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.accent, marginBottom: 10,
            }}>CHOOSE YOUR RESPONSE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {stage.options.map(opt => (
                <button key={opt.id} onClick={() => selectOption(opt)} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '14px 18px', borderRadius: 6, cursor: 'pointer',
                  background: C.accentBg, border: '1px solid ' + C.line,
                  transition: 'all .15s ease',
                }}>
                  <div style={{
                    fontFamily: Sans, fontSize: 13, color: C.tx, lineHeight: 1.65,
                  }}>{opt.label}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Selected choice indicator */}
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: currentChoice.optimal ? C.green : C.yellow, marginBottom: 10,
            }}>
              {currentChoice.optimal ? 'OPTIMAL RESPONSE SELECTED' : 'RESPONSE SELECTED'}
            </div>

            {/* Your choice */}
            <div style={{
              background: currentChoice.optimal ? C.greenBg : C.yellowBg,
              border: '1px solid ' + (currentChoice.optimal ? C.greenDm : C.yellowDm),
              borderRadius: 6, padding: '12px 16px', marginBottom: 12,
            }}>
              <div style={{
                fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.6, marginBottom: 8,
              }}>{currentChoice.label}</div>
            </div>

            {/* Outcome */}
            <div style={{
              background: C.card, border: '1px solid ' + C.cardBd,
              borderRadius: 8, padding: 20, marginBottom: 16,
            }}>
              <div style={{
                fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                color: C.teal, marginBottom: 8,
              }}>OUTCOME</div>
              <div style={{
                fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75,
                paddingLeft: 14, borderLeft: '3px solid ' + C.tealDm,
              }}>{currentChoice.outcome}</div>
            </div>

            {/* Stage scores */}
            <div style={{
              background: C.card, border: '1px solid ' + C.cardBd,
              borderRadius: 8, padding: 18, marginBottom: 16,
            }}>
              <div style={{
                fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                color: C.accentDm, marginBottom: 12,
              }}>STAGE {simStage + 1} SCORES</div>
              <ScoreBar label="CLIENT SAFETY" value={currentChoice.safety} max={10} />
              <ScoreBar label="THERAPEUTIC ALLIANCE" value={currentChoice.alliance} max={10} />
              <ScoreBar label="REGULATORY COMPLIANCE" value={currentChoice.compliance} max={10} />
            </div>

            {/* Cumulative scores */}
            {simChoices.length > 1 && (
              <div style={{
                background: C.card, border: '1px solid ' + C.cardBd,
                borderRadius: 8, padding: 18, marginBottom: 16,
              }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                  color: C.accentDm, marginBottom: 12,
                }}>CUMULATIVE SCORES ({simScores.pct}%)</div>
                <ScoreBar label="SAFETY (CUMULATIVE)" value={simScores.safety} max={10 * simChoices.length} />
                <ScoreBar label="ALLIANCE (CUMULATIVE)" value={simScores.alliance} max={10 * simChoices.length} />
                <ScoreBar label="COMPLIANCE (CUMULATIVE)" value={simScores.compliance} max={10 * simChoices.length} />
              </div>
            )}

            {/* Advance button */}
            <button onClick={advanceStage} style={{
              width: '100%', padding: '14px 20px', borderRadius: 6, cursor: 'pointer',
              background: simStage + 1 >= stageCount ? C.tealBg : C.redBg,
              border: '1px solid ' + (simStage + 1 >= stageCount ? C.tealDm : C.redDm),
              color: simStage + 1 >= stageCount ? C.teal : C.red,
              fontFamily: Mono, fontSize: 12, fontWeight: 600,
              letterSpacing: '.04em', transition: 'all .15s ease',
            }}>
              {simStage + 1 >= stageCount ? 'VIEW DEBRIEF & GRADE' : 'CONTINUE TO STAGE ' + (simStage + 2)}
            </button>
          </div>
        )}

        {/* Abort button */}
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <button onClick={resetSim} style={{
            background: 'none', border: 'none', color: C.tx3,
            fontFamily: Mono, fontSize: 12, cursor: 'pointer',
          }}>
            {'\←'} Abandon scenario
          </button>
        </div>
      </div>
    );
  }, [simScenario, simStage, simChoices, simShowOutcome, simComplete, simScores, simGrade, startSim, selectOption, advanceStage, resetSim, ScoreBar]);

  // ── Main Render ────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', color: C.tx, fontFamily: Sans, position:'relative',
      background: 'linear-gradient(180deg, #080a10 0%, #0a0c14 40%, #080a10 100%)',
    }}>
      <CalmingPatternBg />
      {/* Soft radial gradient overlay */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0, pointerEvents:'none', zIndex:0,
        background:'radial-gradient(ellipse at 30% 20%, rgba(88,112,160,.04) 0%, transparent 60%)',
      }} />
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(8,10,16,.94)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(88,112,160,.15)', padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer',
        }}>{'\←'} Back to Coursework</button>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {/* Heart/care icon */}
          <svg width="16" height="16" viewBox="0 0 20 20" style={{opacity:0.5}}>
            <path d="M10,16 Q4,12 2,8 Q0,4 4,3 Q8,2 10,6 Q12,2 16,3 Q20,4 18,8 Q16,12 10,16 Z" fill="none" stroke={C.accent} strokeWidth="1.2" />
          </svg>
          <span style={{ fontFamily: Mono, fontSize: 12, color: C.accent, letterSpacing:'.08em', fontWeight:600 }}>
            HOSP HOUSE {'\u2014'} RESPITE STAFF
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position:'relative', zIndex:2 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display:'inline-block', padding:'3px 10px', marginBottom:12,
            background:'rgba(88,112,160,.06)', border:'1px solid rgba(88,112,160,.18)',
            borderRadius:2, fontFamily:Mono, fontSize:11, color:C.accent,
            letterSpacing:'.1em', fontWeight:600,
          }}>
            BEHAVIORAL HEALTH
          </div>
          <h1 style={{
            fontFamily: Serif, fontSize: 32, fontWeight: 700,
            color: C.tx, letterSpacing: '-.03em', marginBottom: 8,
          }}>Recovery Support Dashboard</h1>
          <p style={{
            fontFamily: Serif, fontSize: 15, color: C.tx2,
            lineHeight: 1.6, marginBottom: 4, maxWidth: 720,
          }}>
            Manage a respite facility for individuals in substance use recovery. Assess incoming
            clients using the ASAM multidimensional criteria, develop individualized support plans
            using harm reduction and trauma-informed principles, navigate real crisis situations,
            and test your clinical judgment in interactive de-escalation simulations.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 6px' }}>
            <HarmReductionIcon /><Tip id="harm_reduction" />
          </div>
          <p style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3, lineHeight: 1.65, marginBottom: 12,
          }}>
            Hospitality House Respite Staff, Recovery Support Specialist
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {SKILLS.map(tag => (
              <span key={tag} style={{
                fontFamily: Mono, fontSize: 11, padding: '3px 8px', borderRadius: 3,
                background: C.accentBg, color: C.accentDm, letterSpacing: '.03em',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        <ModeSwitch />

        {mode === 'intake' && renderIntake()}
        {mode === 'support' && renderSupport()}
        {mode === 'crisis' && renderCrisis()}
        {mode === 'sim' && renderSim()}

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
