// CrusadesView.jsx — Crusade Campaign Analyzer
// The Crusades (HIST)
//
// An interactive dual-perspective analysis of four major Crusades.
// The visitor examines strategic decisions, turning points, and
// long-term consequences through both Christian and Muslim lenses.
// Three modes: Campaigns (strategic analysis per crusade),
// Perspectives (Christian vs Muslim historiography),
// Legacy (lasting impact on East-West relations).


// ── Palette: Illuminated Manuscript — aged vellum & gold leaf ──────
const C = {
  bg:      '#1a1610',
  card:    'rgba(22,20,16,.94)',
  cardBd:  'rgba(176,132,58,.16)',
  tx:      '#d4caba',
  tx2:     '#9a8e78',
  tx3:     '#605848',
  accent:  '#b0843a',
  accentDm:'#8e6a28',
  accentBg:'rgba(176,132,58,.08)',
  gold:    '#d4a850',
  goldDm:  '#b08830',
  red:     '#a84038',
  redDm:   '#802820',
  redBg:   'rgba(168,64,56,.07)',
  blue:    '#4878a0',
  blueDm:  '#385880',
  blueBg:  'rgba(72,120,160,.07)',
  green:   '#5a8a50',
  greenDm: '#406a38',
  greenBg: 'rgba(90,138,80,.07)',
  cross:   '#c44030',
  crescent:'#38a070',
  line:    'rgba(176,132,58,.14)',
  vellum:  '#2a2418',
};
const Mono  = "'IBM Plex Mono',monospace";
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";

// ── Decorative SVG Components (Illuminated Manuscript Theme) ──────────

// Manuscript-style decorative line divider
function ManuscriptDivider({ color }) {
  var c = color || C.gold;
  return (
    <div style={{ textAlign: 'center', margin: '20px 0', overflow: 'hidden' }}>
      <svg width="100%" height="14" viewBox="0 0 500 14" preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', maxWidth: 480, margin: '0 auto', opacity: 0.3 }}>
        {/* Left flourish */}
        <path d="M60 7 Q50 2 40 7 Q30 12 20 7 Q10 2 0 7" fill="none" stroke={c} strokeWidth=".8" />
        <line x1="60" y1="7" x2="200" y2="7" stroke={c} strokeWidth=".6" />
        {/* Center cross motif */}
        <line x1="210" y1="2" x2="210" y2="12" stroke={c} strokeWidth="1" />
        <line x1="205" y1="7" x2="215" y2="7" stroke={c} strokeWidth="1" />
        {/* Center crescent */}
        <path d="M230 3 Q237 7 230 11" fill="none" stroke={c} strokeWidth=".7" />
        {/* Dots */}
        <circle cx="222" cy="7" r="1" fill={c} fillOpacity=".5" />
        <circle cx="240" cy="7" r="1" fill={c} fillOpacity=".5" />
        {/* Center diamond */}
        <path d="M248 7 L252 3 L256 7 L252 11 Z" fill="none" stroke={c} strokeWidth=".7" />
        <line x1="260" y1="7" x2="440" y2="7" stroke={c} strokeWidth=".6" />
        {/* Right flourish */}
        <path d="M440 7 Q450 2 460 7 Q470 12 480 7 Q490 2 500 7" fill="none" stroke={c} strokeWidth=".8" />
      </svg>
    </div>
  );
}

// Medieval-style double-line card border with corner flourishes
function MedievalCardBorder({ color }) {
  var c = color || C.cardBd;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
      {/* Outer border */}
      <rect x="1" y="1" width="398" height="298" rx="4" fill="none" stroke={c} strokeWidth="1" />
      {/* Inner border */}
      <rect x="5" y="5" width="390" height="290" rx="2" fill="none" stroke={c} strokeWidth=".5" strokeOpacity=".5" />
      {/* Corner flourishes — top-left */}
      <path d="M2 18 Q2 2 18 2" fill="none" stroke={C.gold} strokeWidth="1.2" strokeOpacity=".3" />
      <path d="M2 24 Q2 6 24 2" fill="none" stroke={C.gold} strokeWidth=".5" strokeOpacity=".2" />
      {/* Top-right */}
      <path d="M382 2 Q398 2 398 18" fill="none" stroke={C.gold} strokeWidth="1.2" strokeOpacity=".3" />
      <path d="M376 2 Q398 6 398 24" fill="none" stroke={C.gold} strokeWidth=".5" strokeOpacity=".2" />
      {/* Bottom-left */}
      <path d="M2 282 Q2 298 18 298" fill="none" stroke={C.gold} strokeWidth="1.2" strokeOpacity=".3" />
      <path d="M2 276 Q2 298 24 298" fill="none" stroke={C.gold} strokeWidth=".5" strokeOpacity=".2" />
      {/* Bottom-right */}
      <path d="M382 298 Q398 298 398 282" fill="none" stroke={C.gold} strokeWidth="1.2" strokeOpacity=".3" />
      <path d="M376 298 Q398 298 398 276" fill="none" stroke={C.gold} strokeWidth=".5" strokeOpacity=".2" />
    </svg>
  );
}

// Illuminated drop cap — renders first letter large in gold
function DropCap({ children, color }) {
  if (!children || typeof children !== 'string' || children.length < 2) return children;
  var first = children.charAt(0);
  var rest = children.substring(1);
  return (
    <span>
      <span style={{
        fontFamily: Serif, fontSize: 42, fontWeight: 700, lineHeight: 1,
        color: color || C.gold, float: 'left', marginRight: 6, marginTop: 2, marginBottom: -4,
        textShadow: '0 0 8px rgba(212,168,80,.15)',
      }}>
        {first}
      </span>
      {rest}
    </span>
  );
}

// Cross and crescent decorative elements
function CrossCrescentDecor({ style: extraStyle }) {
  return (
    <svg width="60" height="20" viewBox="0 0 60 20" style={Object.assign({ opacity: 0.15 }, extraStyle || {})}>
      {/* Cross */}
      <line x1="12" y1="3" x2="12" y2="17" stroke={C.cross} strokeWidth="1.2" />
      <line x1="6" y1="8" x2="18" y2="8" stroke={C.cross} strokeWidth="1.2" />
      {/* Separator dot */}
      <circle cx="30" cy="10" r="1.5" fill={C.gold} />
      {/* Crescent */}
      <path d="M42 4 Q50 10 42 16" fill="none" stroke={C.crescent} strokeWidth="1.2" />
      <circle cx="44" cy="4" r="1" fill={C.crescent} />
    </svg>
  );
}

// ── Crusader States Data (SVG mode) ──────────────────────────────────
const CRUSADER_STATES = [
  { id: 'edessa', label: 'County of Edessa', path: 'M 140,40 L 220,30 L 240,100 L 180,120 L 130,90 Z', color: '#b04030', ruler1144: 'Joscelin II', ruler1291: 'Fell 1144 (first to fall)', status1291: 'fallen' },
  { id: 'antioch', label: 'Principality of Antioch', path: 'M 100,90 L 180,80 L 200,180 L 120,200 L 80,150 Z', color: '#c06040', ruler1144: 'Raymond of Poitiers', ruler1291: 'Fell 1268 (Baibars)', status1291: 'fallen' },
  { id: 'tripoli', label: 'County of Tripoli', path: 'M 80,200 L 140,190 L 150,280 L 90,290 L 70,250 Z', color: '#d08050', ruler1144: 'Raymond II', ruler1291: 'Fell 1289', status1291: 'fallen' },
  { id: 'jerusalem', label: 'Kingdom of Jerusalem', path: 'M 70,280 L 150,270 L 170,440 L 100,460 L 60,380 Z', color: '#e0a060', ruler1144: 'Fulk of Anjou', ruler1291: 'Fell 1291 (Acre, last city)', status1291: 'fallen' },
];
const MUSLIM_STATES = [
  { id: 'zengid', label: 'Zengid Mosul', path: 'M 220,30 L 290,50 L 280,140 L 230,120 Z', color: '#408050' },
  { id: 'fatimid', label: 'Fatimid/Ayyubid Egypt', path: 'M 40,400 L 100,380 L 80,480 L 30,490 Z', color: '#306040' },
  { id: 'seljuk', label: 'Seljuk Rum', path: 'M 80,20 L 140,10 L 130,80 L 80,70 Z', color: '#305030' },
];

// ── Skills ───────────────────────────────────────────────────────────
const SKILLS = [
  'Medieval Military Strategy',
  'Dual-Perspective Analysis',
  'Primary Source Interpretation',
  'Crusader State Geopolitics',
  'Siege Warfare & Logistics',
  'Interfaith Historiography',
  'Long-Duration Consequence Mapping',
  'Treaty & Diplomacy Analysis',
];

// ── Provenance ───────────────────────────────────────────────────────
const PROVENANCE = [
  { label: 'Riley-Smith (2005)', desc: 'The Crusades: A History' },
  { label: 'Maalouf (1984)', desc: 'The Crusades Through Arab Eyes' },
  { label: 'Asbridge (2010)', desc: 'The Crusades: The War for the Holy Land' },
  { label: 'Fulcher of Chartres', desc: 'Chronicle of the First Crusade (c. 1127)' },
  { label: 'Ibn al-Athir', desc: 'The Complete History (al-Kamil, c. 1231)' },
];

// ── Campaign Data ────────────────────────────────────────────────────
const CRUSADES = [
  {
    id: 'first',
    num: 'I',
    name: 'First Crusade',
    year: '1096\u20131099',
    region: 'Anatolia \→ Levant \→ Jerusalem',
    subtitle: 'The Surprise Success',
    christianForces: 'Frankish, Norman, Flemish knights; ~35,000 combatants by Syria',
    muslimForces: 'Seljuk Turks (fragmented), Fatimid Egypt; no unified command',
    strategicContext:
      'Pope Urban II called the First Crusade at Clermont in 1095, channeling European martial energy toward Jerusalem. The strategic landscape heavily favored the defenders: Crusaders faced a 3,000-km march through hostile territory, no supply chain, internal rivalries between Frankish lords, and summer heat their heavy cavalry was not designed for. Yet the Muslim world was catastrophically fragmented. The Seljuk sultanate had splintered into competing atabegs. Fatimid Egypt and the Seljuks were bitter rivals. No unified Islamic response existed.',
    christianPerspective:
      'The Crusaders saw themselves as armed pilgrims fulfilling a sacred vow (votum). Urban II promised remission of sins, and the response was electrifying. The Gesta Francorum portrays the campaign as divine providence: miraculous visions at Antioch, the Holy Lance discovery, and God-given victory at Jerusalem. Strategic decisions were framed as spiritual imperatives. The siege of Antioch (October 1097 \u2013 June 1098) was sustained through famine and plague because retreat meant spiritual damnation. The eventual fall of Jerusalem on July 15, 1099 was interpreted as the fulfillment of apocalyptic prophecy.',
    muslimPerspective:
      'Ibn al-Athir, writing a century later, framed the Crusade as a consequence of Muslim disunity. The Franks were seen not as a religious movement but as one more group of barbarian invaders in a region already torn by Sunni-Shia conflict. Local rulers like Kilij Arslan of Rum underestimated the Franks after easily destroying the People\'s Crusade. The fall of Antioch shocked the Islamic world but prompted no coordinated response. The massacre at Jerusalem \— where chroniclers recorded wholesale slaughter of Muslims and Jews \— became a rallying trauma that would fuel jihad rhetoric for generations.',
    keyDecisions: [
      'Urban II\'s framing as armed pilgrimage rather than territorial war mobilized unprecedented numbers',
      'Decision to besiege Antioch for 8 months rather than bypass it secured the flank but nearly destroyed the army',
      'Bohemond\'s negotiation with an Armenian insider to open Antioch\'s gates turned the siege',
      'Fatimid Egypt attempted diplomacy rather than military intervention, allowing the Crusaders to reach Jerusalem',
    ],
    primarySource: {
      author: 'Fulcher of Chartres',
      text: 'On this day, the Franks gloriously entered the city of Jerusalem at the ninth hour, the same hour at which our Lord Jesus Christ deigned to suffer for us upon the cross.',
      work: 'Historia Hierosolymitana, Book I',
    },
    legacy: 'Created four Crusader States (Jerusalem, Antioch, Edessa, Tripoli) that would endure for nearly two centuries. Established the template for European colonial ventures. The massacre at Jerusalem became a foundational grievance in Muslim collective memory.',
    outcomeVerdict: 'Decisive Christian victory',
    verdictColor: C.cross,
  },
  {
    id: 'third',
    num: 'III',
    name: 'Third Crusade',
    year: '1189\u20131192',
    region: 'Cyprus \→ Acre \→ Jaffa coast',
    subtitle: 'Richard vs Saladin',
    christianForces: 'English, French, remnant German forces; ~17,000 at peak strength',
    muslimForces: 'Ayyubid sultanate under Saladin; ~20,000\u201325,000 field army',
    strategicContext:
      'Saladin\'s recapture of Jerusalem at Hattin (1187) shocked Europe. Three kings \— Frederick Barbarossa, Philip II of France, and Richard I of England \— took the cross. Barbarossa drowned in Cilicia, gutting the German contingent. Philip and Richard arrived at Acre but feuded constantly. The strategic problem shifted: the Crusaders could not retake Jerusalem without first securing the coast, but Saladin could trade space for time. This Crusade became a chess match between two of the medieval world\'s finest military minds.',
    christianPerspective:
      'Richard I ("the Lionheart") conducted one of history\'s great amphibious campaigns. He captured Cyprus en route (securing a permanent offshore base), broke the two-year siege of Acre, and executed a disciplined coastal march from Acre to Jaffa that Saladin could not disrupt despite repeated attacks. The Battle of Arsuf (September 1191) demonstrated Richard\'s tactical genius: holding his cavalry in check under arrow fire until the precise moment for a devastating charge. Yet Richard recognized that taking Jerusalem was strategically untenable \— he could storm it but not hold it without supply lines. The Treaty of Jaffa was a pragmatic masterstroke disguised as failure.',
    muslimPerspective:
      'Saladin had unified Egypt and Syria through years of patient coalition-building. His victory at Hattin and recovery of Jerusalem fulfilled a generation of jihad ideology. But facing Richard, Saladin struggled. His army was a coalition that could not sustain prolonged campaigns \— emirs returned home for harvest, troops deserted. Saladin\'s scorched-earth strategy along the coast slowed but did not stop Richard. The loss at Arsuf was painful but not decisive. Saladin\'s real victory was strategic patience: he kept Jerusalem just beyond Richard\'s reach. The Treaty of Jaffa preserved Muslim control of Jerusalem while conceding the coast \— a territorial compromise Saladin could justify to his emirs.',
    keyDecisions: [
      'Richard\'s seizure of Cyprus created a permanent Crusader supply base that outlasted the mainland states',
      'Execution of 2,700 Muslim prisoners at Acre was a calculated terror strategy that haunted Richard\'s reputation',
      'Richard\'s refusal to march on Jerusalem twice showed strategic maturity over religious imperative',
      'The Treaty of Jaffa secured coastal access and Christian pilgrimage rights without the cost of holding Jerusalem',
    ],
    primarySource: {
      author: 'Ibn al-Athir',
      text: 'The Muslims were put to a tremendous rout. Saladin was full of grief. He gathered his dispersed troops and stood against the enemy until nightfall.',
      work: 'al-Kamil fi\'l-Tarikh, on the Battle of Arsuf',
    },
    legacy: 'Established the precedent that diplomacy could achieve what warfare could not. The coastal Crusader States survived another century. Richard and Saladin became mutual legends \— their chivalric rivalry shaped European and Islamic ideals of noble warfare.',
    outcomeVerdict: 'Strategic draw, diplomatic resolution',
    verdictColor: C.gold,
  },
  {
    id: 'fourth',
    num: 'IV',
    name: 'Fourth Crusade',
    year: '1202\u20131204',
    region: 'Venice \→ Zara \→ Constantinople',
    subtitle: 'The Great Betrayal',
    christianForces: 'Frankish knights, Venetian fleet; ~20,000 total',
    muslimForces: 'No Muslim engagement \— Crusade diverted to Christian Constantinople',
    strategicContext:
      'Pope Innocent III called the Fourth Crusade to strike Egypt, the center of Ayyubid power. But the Crusaders contracted with Venice for transport and could not pay. Venice\'s Doge Enrico Dandolo, blind and in his nineties, redirected the Crusade first to sack the Christian city of Zara (a Venetian commercial rival), then to Constantinople itself. The Byzantine prince Alexios IV promised vast payment and military support if the Crusaders restored his father to the throne. When Alexios could not pay, the Crusaders sacked the richest city in Christendom.',
    christianPerspective:
      'Western chroniclers struggled to justify the diversion. Robert de Clari\'s account frames the sack as provoked by Byzantine treachery \— Alexios IV\'s broken promises, Greek hostility to Latins. The Crusaders established the Latin Empire of Constantinople (1204\u20131261), which the papacy reluctantly accepted. But Innocent III was horrified, denouncing the diversion. The theological justification that Eastern schismatics "deserved" correction was widely repeated but never convincing. In reality, Venetian commercial interests and Crusader debt drove every decision.',
    muslimPerspective:
      'The Muslim world watched in astonishment as Christians turned on Christians. Ibn al-Athir recorded the sack with sardonic satisfaction, noting that the Franks proved more destructive to their co-religionists than to Muslims. The Fourth Crusade permanently weakened the Byzantine Empire, which had been the primary shield between Islamic expansion and Europe. Muslim strategists recognized that Western Crusading zeal was now bankrupt \— the movement could be redirected by commerce and politics. The event confirmed what Usama ibn Munqidh had long observed: the Franks were unpredictable and often irrational by Islamic standards of statecraft.',
    keyDecisions: [
      'Venice\'s contract structure created a debt trap that gave Dandolo effective control of the Crusade\'s direction',
      'Pope Innocent III excommunicated the Crusaders for sacking Zara but could not stop the momentum',
      'Alexios IV\'s impossible promises (200,000 marks + 10,000 soldiers) set up inevitable betrayal',
      'The decision to sack Constantinople rather than continue to Egypt ended the Crusade\'s religious legitimacy',
    ],
    primarySource: {
      author: 'Usama ibn Munqidh',
      text: 'Among the Franks there are some who have become acclimated and frequent the company of Muslims. They are far better than those who have freshly arrived from their lands.',
      work: 'Kitab al-I\'tibar (Book of Learning by Example)',
    },
    legacy: 'Fatally weakened the Byzantine Empire, which never fully recovered before falling to the Ottomans in 1453. Discredited the Crusading ideal in the eyes of many European Christians. Enriched Venice enormously and shifted Mediterranean power westward.',
    outcomeVerdict: 'Catastrophic own-goal for Christendom',
    verdictColor: C.red,
  },
  {
    id: 'acre',
    num: '\u2020',
    name: 'Fall of Acre',
    year: '1291',
    region: 'Acre (modern Akko), Palestine',
    subtitle: 'End of the Crusader States',
    christianForces: 'Garrison of ~15,000 (Knights Templar, Hospitaller, Teutonic, Italian merchants)',
    muslimForces: 'Mamluk Sultan al-Ashraf Khalil; ~60,000+ with massive siege train',
    strategicContext:
      'By 1291, the Crusader States had shrunk to a narrow coastal strip centered on Acre. The Mamluks, who had defeated the Mongols at Ain Jalut (1260) and built a formidable military slave state, systematically reduced Crusader fortresses throughout the 1260s\u20131280s under Baybars and Qalawun. Acre was the last significant stronghold. Europe was exhausted and divided; no relief expedition was forthcoming. The city\'s polyglot garrison \— military orders that despised each other, Italian merchant republics pursuing rival commercial interests \— could not coordinate its own defense.',
    christianPerspective:
      'The fall of Acre was experienced as an apocalyptic catastrophe. The Templars made their last stand in their fortress at the southwestern corner, which collapsed killing both defenders and attackers. William of Tyre\'s continuators recorded the desperate final days: women and children evacuated by sea, knights fighting room by room. The military orders lost their grandmasters and the flower of their membership. The event triggered existential questioning in Europe: had God abandoned the Crusading enterprise? The loss catalyzed both recrimination (blamed on Italian mercantile selfishness) and institutional reform (proposals for new Crusades that never materialized).',
    muslimPerspective:
      'For the Mamluks, Acre was the culmination of a thirty-year strategic campaign of methodical fortress reduction. Al-Ashraf Khalil deployed overwhelming force and the latest siege technology, including massive trebuchets and Greek fire. The victory was celebrated across the Islamic world as the final expulsion of the Frankish invaders. The Mamluks systematically demolished every coastal fortress to prevent any future Crusader landing \— a scorched-earth strategy that reshaped the Levantine coastline. Muslim chroniclers framed the victory as divine vindication, mirroring how Christians had framed the First Crusade\'s success two centuries earlier.',
    keyDecisions: [
      'European monarchs refused to mount a relief expedition, sealing Acre\'s fate before the siege began',
      'The garrison\'s internal divisions (Templars vs Hospitallers vs Venetians vs Genoese) prevented unified command',
      'Al-Ashraf Khalil rejected negotiation, choosing total annihilation to send an unmistakable signal',
      'Mamluk demolition of all coastal fortresses ensured no Crusader bridgehead could ever be reestablished',
    ],
    primarySource: {
      author: 'William of Tyre (continuators)',
      text: 'The city was lost, and with it all the hopes of those who had fought so long to hold the Holy Land for Christendom.',
      work: 'Continuation of William of Tyre (Old French recension)',
    },
    legacy: 'Ended nearly 200 years of Crusader presence in the Levant. The military orders relocated (Templars to Cyprus then dissolution, Hospitallers to Rhodes, Teutonic Knights to the Baltic). Crusading ideology persisted in rhetoric but never again produced a major expedition to the Holy Land.',
    outcomeVerdict: 'Decisive Muslim victory, end of an era',
    verdictColor: C.crescent,
  },
];

// ── Perspective Themes ───────────────────────────────────────────────
const PERSPECTIVES = [
  {
    id: 'motivation',
    theme: 'Motivation & Justification',
    christian: {
      title: 'Sacred Obligation',
      analysis: 'The Crusades were framed as an act of Christian love \— armed pilgrimage to liberate the Holy Sepulchre and aid Eastern Christians. Urban II\'s call at Clermont fused penitential theology with martial culture. The crusader took a vow (votum crucis) that was a legal and spiritual obligation. Plenary indulgence promised remission of all sins. This was not cynical manipulation but a genuine theological framework that motivated peasants and kings alike.',
      sources: 'Riley-Smith\'s "What Were the Crusades?" reframes motivation as primarily devotional, challenging older materialist interpretations.',
    },
    muslim: {
      title: 'Invasion & Colonial Occupation',
      analysis: 'Muslim chroniclers initially treated the Crusades as one more Frankish incursion among many. The concept of "Crusade" as a unified movement did not register in Islamic historiography until much later. Local rulers saw the Franks as opportunistic invaders exploiting Muslim disunity. The jihad counter-response developed gradually \— Zengi, Nur ad-Din, then Saladin built a unified front over decades. The Crusades were ultimately understood as a colonial occupation of Muslim lands, not a religious war.',
      sources: 'Maalouf\'s "The Crusades Through Arab Eyes" reconstructs the Muslim experience from primary Arabic sources.',
    },
  },
  {
    id: 'warfare',
    theme: 'Warfare & Chivalry',
    christian: {
      title: 'Chivalric Ideal',
      analysis: 'The Crusades helped define European chivalry. The military orders (Templars, Hospitallers) fused monastic discipline with martial prowess. Knightly combat was ritualized and honor-bound. Richard I\'s respect for Saladin became a foundational chivalric narrative. Yet the reality was brutal: massacres at Jerusalem (1099), Acre (1191), and the sack of Constantinople (1204) reveal that chivalric codes applied selectively. The ideal was aspiration, not practice.',
      sources: 'Asbridge documents the gap between chivalric rhetoric and actual Crusader conduct systematically.',
    },
    muslim: {
      title: 'Futuwwa & Pragmatic Defense',
      analysis: 'Islamic martial culture had its own honor code (futuwwa). Saladin embodied it: mercy to prisoners, respect for worthy opponents, religious piety in command. But Muslim warfare was also pragmatic \— Baybars used assassination, scorched earth, and total war without apology. The Mamluks were professional soldiers who saw warfare as craft, not romance. Muslim commanders judged Crusader tactics as brave but often strategically incoherent, driven by vows and honor rather than operational logic.',
      sources: 'Usama ibn Munqidh\'s autobiography provides a uniquely personal Muslim perspective on Frankish behavior.',
    },
  },
  {
    id: 'coexistence',
    theme: 'Coexistence & Exchange',
    christian: {
      title: 'Outremer Culture',
      analysis: 'The Crusader States developed a hybrid culture. Second-generation Franks (poulains) adopted Eastern dress, food, bathing habits, and diplomatic conventions. Intermarriage occurred. The Frankish legal system (Assizes of Jerusalem) accommodated Muslim and Eastern Christian communities. Trade flourished through Italian merchant networks. This cultural exchange transmitted Arabic science, medicine, and philosophy westward \— contributing to the European Renaissance.',
      sources: 'Riley-Smith documents Outremer society as genuinely multicultural, not merely colonial.',
    },
    muslim: {
      title: 'Accommodation Under Occupation',
      analysis: 'Muslim communities under Crusader rule experienced a range of conditions. Rural Muslims often continued farming with new Frankish lords replacing old Muslim ones. Urban Muslims faced more disruption but commerce continued. Usama ibn Munqidh describes both friendships and exasperation with Frankish neighbors. The Crusader period saw continued Islamic intellectual production \— Ibn al-Athir wrote during Crusader presence. Muslim merchants pragmatically traded with Frankish ports even during active hostilities.',
      sources: 'Ibn Munqidh\'s "Book of Learning by Example" provides eyewitness accounts of daily Muslim-Frankish interaction.',
    },
  },
  {
    id: 'memory',
    theme: 'Historical Memory',
    christian: {
      title: 'From Glory to Guilt',
      analysis: 'In medieval Europe, the Crusades were remembered as heroic. Crusader ancestry was a source of noble prestige. By the Enlightenment, they were reinterpreted as barbaric fanaticism. Modern Western scholarship has oscillated between these poles. Riley-Smith\'s work restored the devotional dimension. Today, the Crusades function in Western discourse as a cautionary tale about religious violence and colonial ambition \— a narrative that would puzzle the Crusaders themselves.',
      sources: 'Riley-Smith traces the evolution of Crusade memory in Western culture across eight centuries.',
    },
    muslim: {
      title: 'From Footnote to Founding Grievance',
      analysis: 'Remarkably, the Crusades were not central to Islamic historical memory for centuries. The Mongol invasions (1258 destruction of Baghdad) overshadowed them. It was only in the 19th\u201320th centuries, under European colonialism, that the Crusades were rediscovered as a paradigm for Western aggression against Islam. Saladin was rehabilitated as a pan-Arab hero. This modern politicization of Crusade memory shapes contemporary East-West tensions in ways the medieval participants would not recognize.',
      sources: 'Maalouf explicitly connects Crusade memory to modern Arab political consciousness.',
    },
  },
];

// ── Legacy Items ─────────────────────────────────────────────────────
const LEGACY_ITEMS = [
  {
    id: 'political',
    icon: '\u2694\uFE0F',
    name: 'Political Reconfiguration',
    period: '1099\u20131453',
    description: 'The Crusades permanently altered the political map of the Eastern Mediterranean. The Byzantine Empire, already weakened, received its death blow from the Fourth Crusade (1204). The Crusader States created a two-century experiment in colonial governance that influenced later European expansionism. The Mamluk consolidation of power in Egypt and Syria was partly a response to the Crusader threat. The Ottoman Empire eventually inherited both the Byzantine and Mamluk legacies.',
    effects: [
      'Byzantine Empire fatally weakened, falling to Ottomans in 1453',
      'Mamluk military state consolidated as bulwark against both Crusaders and Mongols',
      'Italian maritime republics (Venice, Genoa, Pisa) gained dominant Mediterranean trade positions',
      'Papal authority initially enhanced then undermined by Crusade failures and the Fourth Crusade scandal',
    ],
    significance: 'The Crusades accelerated the transition from the Byzantine-centered Mediterranean order to the Ottoman-European rivalry that would define the early modern period.',
  },
  {
    id: 'cultural',
    icon: '\uD83D\uDCDC',
    name: 'Cultural & Intellectual Exchange',
    period: '11th\u201314th century',
    description: 'Despite the violence, the Crusades created channels for significant cultural transfer. Arabic texts on mathematics, astronomy, medicine, and philosophy reached Europe through Crusader-period contacts and the translation movement. Architectural techniques, agricultural practices (sugar cane, citrus cultivation), and luxury goods transformed European material culture. The concept of the hospital was refined through Hospitaller institutions modeled partly on Islamic bimaristans.',
    effects: [
      'Arabic numerals, algebra, and astronomical knowledge transmitted to Europe',
      'Medical knowledge from Islamic scholars influenced European university curricula',
      'Gothic architecture shows possible influence from Islamic pointed arch and ribbed vault techniques',
      'Sugar, spices, silk, and cotton became staples of European commerce',
    ],
    significance: 'The intellectual transmission catalyzed by Crusade-era contact contributed to the conditions for the European Renaissance, though the exchange was more complex and multi-directional than simple "borrowing."',
  },
  {
    id: 'religious',
    icon: '\u2721',
    name: 'Interfaith Relations',
    period: '1096\u2013present',
    description: 'The Crusades poisoned Christian-Muslim and Christian-Jewish relations for centuries. The Rhineland pogroms of 1096, where Crusaders massacred Jewish communities en route, established a terrible precedent. Muslim-Christian relations, which had included significant cooperation and coexistence, became framed through a lens of existential conflict. The concept of "holy war" was amplified on both sides, creating rhetorical frameworks that persist in modern political discourse.',
    effects: [
      'Rhineland pogroms of 1096 established patterns of anti-Jewish violence in Europe',
      'Jihad concept militarized and politicized in response to Crusader aggression',
      'Eastern Christian communities (Maronites, Armenians) alternately allied with and were betrayed by Crusaders',
      'Modern "clash of civilizations" rhetoric draws directly on Crusade-era framing',
    ],
    significance: 'The religious legacy is the most contested. The Crusades did not create interfaith tension, but they weaponized it in ways that shaped identity politics for a millennium.',
  },
  {
    id: 'military',
    icon: '\uD83C\uDFF0',
    name: 'Military Innovation',
    period: '1096\u20131291',
    description: 'The Crusades drove significant military innovation on both sides. Castle design evolved rapidly: the concentric castle (Krak des Chevaliers) represented the peak of medieval fortification. The military orders created standing professional armies centuries before European nation-states achieved the same. Siege technology advanced through cross-pollination. Naval warfare and amphibious operations became sophisticated. Supply chain logistics for transoceanic campaigns were pioneered.',
    effects: [
      'Concentric castle design perfected in the Levant then exported to Europe (e.g., Edward I\'s Welsh castles)',
      'Military orders (Templars, Hospitallers) pioneered international banking to fund logistics',
      'Crossbow and siege engine technology advanced through competitive adoption',
      'Combined arms tactics (heavy cavalry + infantry + naval support) developed through Crusade campaigns',
    ],
    significance: 'The military lessons of the Crusades were studied for centuries. Richard I\'s coastal march, Saladin\'s strategic patience, and the Mamluk system of professional soldiery all influenced later military thinking.',
  },
  {
    id: 'modern',
    icon: '\uD83C\uDF0D',
    name: 'Modern Political Echoes',
    period: '19th century\u2013present',
    description: 'The Crusades remain politically charged. European colonizers in the 19th\u201320th centuries explicitly invoked Crusade imagery (General Allenby entering Jerusalem in 1917). Arab nationalist movements used Saladin as a symbol of resistance. The term "crusade" itself carries different connotations in Western and Islamic contexts. Modern scholarship attempts to study the Crusades historically while acknowledging that they function as a live political metaphor in contemporary East-West relations.',
    effects: [
      'Colonial-era rhetoric explicitly framed European expansion as "new crusades"',
      'Saladin rehabilitated as pan-Arab and pan-Islamic hero in the 20th century',
      'The word "crusade" remains politically sensitive in diplomatic and military contexts',
      'Crusade scholarship itself is shaped by modern geopolitical tensions',
    ],
    significance: 'Understanding how Crusade memory is constructed and deployed is essential to navigating contemporary discourse about the relationship between the Western and Islamic worlds.',
  },
];

// ── Commander's Choice Quiz Data ──────────────────────────────────
const COMMANDER_QUIZ = [
  {
    id: 'cq1',
    title: 'Richard at Arsuf (September 1191)',
    scenario: 'You are Richard I of England, marching south along the coast from Acre to Jaffa with ~17,000 troops. Saladin\'s army shadows you inland, launching constant harassing attacks with horse archers. Your infantry is taking casualties but holding formation. Your Hospitaller knights in the rearguard are furious — they want to charge. But if the cavalry charges too early, Saladin\'s forces will scatter and reform, and your infantry will be left exposed. If you never charge, the harassment will bleed you dry. The day is brutally hot. Discipline is cracking. What do you order?',
    options: [
      { id: 'a', text: 'Order an immediate cavalry charge — the Hospitallers are right, aggression wins battles and morale is collapsing', score: 1, feedback: 'This is exactly what Saladin wanted. His horse archers were designed to provoke premature charges. Once the heavy cavalry was strung out in pursuit, Saladin\'s main force would counterattack the exposed infantry. The Crusaders had lost at Hattin four years earlier by doing precisely this — breaking formation in pursuit.' },
      { id: 'b', text: 'Hold formation and endure — absorb the harassment, maintain the march discipline, and reach Jaffa without engaging', score: 1, feedback: 'This might seem prudent, but it was not sustainable. The Hospitallers were taking devastating losses in the rearguard. Morale was collapsing. A commander who never strikes back loses the army\'s confidence. Richard needed to fight — but at the right moment.' },
      { id: 'c', text: 'Hold discipline until Saladin commits his main force, then unleash a coordinated cavalry charge at the decisive moment — turn defense into a devastating counterattack', score: 3, feedback: 'This is what Richard did, and it was a masterpiece of tactical patience. He held formation for hours under withering fire, waiting for Saladin to commit more and more troops to the harassment. When the Hospitallers finally broke and charged (slightly before Richard planned), he instantly committed the entire cavalry in a coordinated strike. The timing was devastating — Saladin\'s forces were fully committed and could not disengage. The charge shattered the Ayyubid formation. Richard then halted pursuit before overextension. The discipline to wait, the judgment to recognize the decisive moment, and the control to stop the charge — this was generalship of the highest order.' },
      { id: 'd', text: 'Halt the march, form a defensive square, and force Saladin to either commit to a full assault or withdraw', score: 2, feedback: 'Defensible as a tactic, but it surrenders the initiative. Richard needed to reach Jaffa; stopping the march accomplished Saladin\'s objective of delaying the Crusader advance. The genius of Richard\'s actual approach was turning the defensive march into an offensive opportunity without abandoning his strategic objective.' },
    ],
    historicalOutcome: 'Richard held formation for hours under fire, then unleashed a devastating cavalry charge when Saladin\'s forces were overcommitted. The Battle of Arsuf was a crushing Crusader tactical victory. But Richard then showed equal genius by halting pursuit — he would not repeat the mistake of Hattin. Saladin\'s field army was broken but not destroyed, and Richard used the victory to negotiate from strength.',
  },
  {
    id: 'cq2',
    title: 'Saladin Before Hattin (July 1187)',
    scenario: 'You are Saladin, and you have just taken the fortress of Tiberias on the Sea of Galilee. The Crusader field army under King Guy is camped at Sephoria, 16 miles away, with access to water and a strong defensive position. Your goal is to destroy the Crusader army in open battle — but they are too smart to leave their water source. The Countess of Tripoli is besieged in Tiberias Castle, and some Crusader lords are urging King Guy to march to her rescue across waterless terrain in July heat. How do you draw the Crusaders out?',
    options: [
      { id: 'a', text: 'Assault the Crusader camp directly at Sephoria — use numerical superiority to overwhelm their position', score: 1, feedback: 'Attacking the Crusaders in a prepared position with water access would negate your advantages. Crusader heavy cavalry in a defensive position, supported by infantry and with secure supply, would be extremely difficult to dislodge. Saladin understood that the Crusaders had to be caught in the open, away from water.' },
      { id: 'b', text: 'Take Tiberias Castle and threaten further conquests — use the political pressure of the Countess\'s capture to force a rescue march across waterless terrain in summer heat', score: 3, feedback: 'This is Saladin\'s brilliant strategy. By threatening Tiberias, he created irresistible political pressure on King Guy. Raymond of Tripoli actually advised against marching — his wife was in the castle and he still said don\'t go. But Guy, pressured by Reynald de Chatillon and the Templars, chose to march. The 16-mile crossing in July without water destroyed the Crusader army before the battle even began. At the Horns of Hattin, dehydrated and exhausted Crusaders faced Saladin\'s fresh troops. The result was total annihilation — the worst Crusader defeat in history.' },
      { id: 'c', text: 'Launch diversionary raids across Crusader territory to split their forces — pick off detachments rather than seeking a decisive battle', score: 2, feedback: 'A reasonable attrition strategy and consistent with much of Saladin\'s earlier campaigning. But Saladin recognized that this was a unique opportunity — the entire Crusader field army was concentrated in one place. Destroying it in a single battle would be far more decisive than years of raids. The strategic patience to create the conditions for that one decisive battle was Saladin\'s genius.' },
    ],
    historicalOutcome: 'Saladin\'s capture of Tiberias was bait. When King Guy marched to the rescue across waterless terrain in July heat, Saladin\'s forces harassed the column, set fires to increase thirst, and cut off the route to water. At the Horns of Hattin, the dehydrated Crusader army was annihilated. Saladin then captured Jerusalem and nearly every Crusader stronghold within months — the greatest Muslim military victory of the Crusading era.',
  },
  {
    id: 'cq3',
    title: 'The Fourth Crusade Decision (1203)',
    scenario: 'You are a Crusade leader at Venice. Your army contracted with Venice for transport to Egypt — the strategic center of Ayyubid power. But you cannot pay the agreed price. Doge Enrico Dandolo offers a deal: first help Venice capture the Christian city of Zara (a commercial rival), then divert to Constantinople where a deposed Byzantine prince promises 200,000 marks and 10,000 soldiers if you restore his father. The Pope has excommunicated you for sacking Zara. Do you continue to Constantinople, or find another way to Egypt?',
    options: [
      { id: 'a', text: 'Refuse the diversion — find independent transport to Egypt and fulfill the Crusade\'s actual purpose, even with a smaller force', score: 2, feedback: 'This is what the Crusade should have done, and some Crusaders did exactly this — Simon de Montfort and others refused to participate in the Constantinople diversion and went to the Holy Land independently. But most of the army was trapped by debt to Venice. Without Venetian ships, they had no way to reach Egypt. The debt trap was the decisive constraint.' },
      { id: 'b', text: 'Accept the Constantinople diversion — the Byzantine money and soldiers would make the eventual Egyptian campaign far stronger', score: 1, feedback: 'This is what actually happened — and it was a catastrophe. The Byzantine prince\'s promises were impossible to fulfill. When he couldn\'t pay, the Crusaders sacked Constantinople itself — the richest Christian city in the world. The Fourth Crusade never reached Muslim territory. It fatally weakened Byzantium (which never recovered), enriched Venice, and permanently discredited the Crusading ideal. The "reasonable" justification led to the worst outcome.' },
      { id: 'c', text: 'Negotiate directly with Dandolo — offer Venice long-term trade concessions in the Levant in exchange for reducing the transport debt and proceeding to Egypt', score: 3, feedback: 'This was the strategically optimal solution that no one pursued. Venice\'s real interest was commercial dominance in the Eastern Mediterranean — trade concessions in conquered Egyptian ports would have been more valuable long-term than the Zara or Constantinople diversions. But Crusade leaders lacked the diplomatic sophistication to negotiate commercial terms, and Dandolo had his own agenda regarding Constantinople. The tragedy of the Fourth Crusade was that the rational solution existed but the political dynamics made it unreachable.' },
    ],
    historicalOutcome: 'The Crusaders accepted the Constantinople diversion. When the Byzantine prince could not pay, they sacked Constantinople in 1204 — destroying irreplaceable art, libraries, and relics. The Latin Empire they established lasted only 57 years. The Fourth Crusade never fought a single Muslim. It fatally weakened the Byzantine Empire (which fell to the Ottomans in 1453), enriched Venice, and proved that Crusading zeal could be hijacked by commercial interests.',
  },
];

// ── Scholarly micro-content ──────────────────────────────────────
const CR_TIPS = {
  crusader_states: "The four Crusader States -- the Kingdom of Jerusalem, County of Tripoli, Principality of Antioch, and County of Edessa -- constituted the first sustained European colonial experiment, predating Portuguese exploration by two centuries. They survived from 1098 to 1291, developing hybrid Frankish-Levantine institutions, trade networks, and military architecture (the krak des Chevaliers remains one of the finest medieval fortifications ever built). The states' survival depended on continuous reinforcement from Europe and exploitation of Muslim political fragmentation. When Saladin unified Egypt and Syria, the strategic calculus shifted permanently. The colonial analogy is imperfect but instructive: like later European empires, the Crusader States were demographically thin, militarily overextended, and dependent on divided local populations.",
  saladin: "Saladin's reputation for chivalry -- releasing Guy de Lusignan, offering his personal physician to Richard I -- was genuine but selective. After the Battle of Hattin (July 4, 1187), Saladin personally executed Reynald de Chatillon and then ordered the mass execution of approximately 200 captured Knights Templar and Knights Hospitaller. Sufi mystics were given the honor of performing the executions. The logic was strategic: the military orders were the professional core of Crusader armies and could not be ransomed back. Ordinary knights and soldiers were ransomed or enslaved, but the military orders were too dangerous to release. Saladin understood that chivalry toward kings was diplomacy, while eliminating military professionals was sound strategy.",
  byzantine_betrayal: "The Fourth Crusade's 1204 sack of Constantinople is arguably the most consequential friendly-fire incident in military history. Diverted by Venetian commercial interests and Byzantine dynastic politics, Crusaders who had taken vows to recapture Jerusalem instead besieged and looted the greatest Christian city in the world. The three-day sack destroyed irreplaceable libraries, melted down bronze statues for coinage, and shattered relics. The Latin Empire they established lasted only 57 years (1204-1261), but the damage to Byzantine military and economic power was permanent. When the Ottomans finally took Constantinople in 1453, they conquered a city that had never fully recovered from the Crusaders' destruction 250 years earlier.",
  assassins: "The Nizari Ismailis, pejoratively called 'Assassins' by their enemies (possibly from 'hashishin,' though the etymology is disputed), operated history's most sophisticated targeted killing program from their fortress at Alamut (1090-1256). Their leader, the 'Old Man of the Mountain,' deployed fidai (self-sacrificing agents) who would spend months or years infiltrating a target's household before striking. The strategic logic was elegant: rather than fielding armies they could not afford, the Nizaris achieved deterrence through the credible threat of assassination. Their most famous operation -- the murder of Conrad of Montferrat in 1192, just days after his election as King of Jerusalem -- demonstrated that no leader was beyond reach. Marco Polo's account of drug-induced paradise gardens is almost certainly fabrication.",
};

// ── Supply / Logistics Data ─────────────────────────────────────────
var SUPPLY_CAMPAIGNS = [
  {
    id: 'first',
    name: 'First Crusade (1096-1099)',
    verdict: 'SUCCESS despite logistics',
    verdictColor: C.green,
    distance: '~3,000 km overland from Constantinople to Jerusalem',
    armySize: '~60,000 departed, ~20,000 reached Jerusalem',
    supplyMethod: 'Foraging, Byzantine resupply (Alexios I), local plunder',
    route: 'Overland through Anatolia, then south through Syria',
    season: 'Departed August 1096, arrived Jerusalem June 1099',
    challenge: 'No supply chain whatsoever. The army lived off the land and depended on Byzantine goodwill that evaporated after Antioch. Starvation at Antioch was so severe that chroniclers recorded cannibalism at Ma\'arra. Disease killed more than combat. The army shrank by two-thirds before reaching Jerusalem.',
    commanderPlan: 'There was no unified logistical plan. Each contingent (Bohemond, Raymond, Godfrey, Robert) managed its own supplies. The Byzantines provided initial support expecting the Crusaders to return conquered territory. The "plan" was faith and improvisation.',
    whatHappened: 'The army survived through a combination of Byzantine aid (until relations collapsed), local Christian communities providing food, plunder of Muslim towns, and sheer attrition removing mouths to feed. The survivors who reached Jerusalem were hardened, desperate, and just numerous enough to storm the walls.',
    structuralReason: 'Muslim political fragmentation was the key. No unified force could cut the Crusader supply line because there was no supply line to cut. The Seljuk successor states, Fatimid Egypt, and local emirs each dealt with the Crusaders independently. The First Crusade succeeded not because of logistics but because the strategic environment forgave logistical failure.',
  },
  {
    id: 'second',
    name: 'Second Crusade (1147-1149)',
    verdict: 'FAILURE -- dual route disaster',
    verdictColor: C.red,
    distance: '~2,800 km (Conrad III via Anatolia), ~3,200 km (Louis VII via coast)',
    armySize: '~50,000 Germans + ~30,000 French, ~70,000 total',
    supplyMethod: 'Split columns, each foraging independently',
    route: 'Conrad III: direct Anatolian crossing. Louis VII: coastal Anatolian route.',
    season: 'Departed May-June 1147, disastrous autumn/winter crossing',
    challenge: 'Two enormous armies tried to cross Anatolia separately. Neither could forage enough for its size. The Byzantines under Manuel I were hostile -- they had learned from the First Crusade that Crusader armies were as dangerous to allies as enemies. Seljuk light cavalry harassed constantly.',
    commanderPlan: 'Conrad III attempted a rapid crossing of central Anatolia to reach Crusader territory quickly. Louis VII chose the longer but supposedly safer coastal route. Both assumed Byzantine markets would supply them. Neither coordinated with the other.',
    whatHappened: 'Conrad\'s army was annihilated at the Battle of Dorylaeum (October 1147) -- Seljuk horse archers destroyed the column in detail. Louis\'s army survived the crossing but was badly mauled, losing most of its baggage. The remnants combined at Antioch but could not agree on a target. The ill-conceived attack on Damascus (July 1148) failed in four days, partly because the local Crusader lords had existing treaties with Damascus that the newcomers ignored.',
    structuralReason: 'Army size exceeded carrying capacity. The First Crusade succeeded with ~35,000 combatants reaching Syria. The Second Crusade tried to move twice that number through the same territory, which could not support them. Additionally, Muslim unity had improved -- Zengi had already taken Edessa (1144), demonstrating coordinated resistance. The fundamental lesson: larger armies are not better if the logistical environment cannot sustain them.',
  },
  {
    id: 'third_supply',
    name: 'Third Crusade (1189-1192)',
    verdict: 'PARTIAL SUCCESS -- maritime innovation',
    verdictColor: C.gold,
    distance: '~3,500 km by sea from Marseilles/Messina to Acre',
    armySize: '~17,000 English/French, ~15,000 Germans (Barbarossa, lost en route)',
    supplyMethod: 'Maritime supply via Richard I\'s fleet; Barbarossa overland (failed)',
    route: 'Richard: sea via Sicily and Cyprus. Philip II: sea direct. Barbarossa: overland (drowned).',
    season: 'Departed 1190, operations 1191-1192 (coastal campaign avoided interior heat)',
    challenge: 'Frederick Barbarossa proved the overland route was now impossible -- he drowned crossing the Saleph River and his army disintegrated. Richard I recognized that only maritime logistics could sustain a Crusade. But ships could only supply coastal operations, not an inland march to Jerusalem.',
    commanderPlan: 'Richard\'s genius was logistical as much as tactical. He assembled a fleet of ~200 ships, conquered Cyprus en route (creating a permanent supply base), and conducted the entire campaign along the coast where his fleet could resupply the army. He never attempted to march inland to Jerusalem because he understood the supply mathematics.',
    whatHappened: 'The maritime approach worked brilliantly for coastal operations. Richard retook Acre, won at Arsuf, and secured the coast from Tyre to Jaffa. But Jerusalem lay 50 km inland. Richard marched toward it twice and turned back both times, not from cowardice but from logistical realism: he could take Jerusalem but not hold it without supply lines. The Treaty of Jaffa was a logistical compromise.',
    structuralReason: 'Richard solved the supply problem for coastal warfare but could not solve it for inland operations. This was the fundamental paradox of later Crusading: maritime logistics gave reliable access to the coast, but Jerusalem was not on the coast. The strategic problem was unsolvable within the available technology. This is why no subsequent Crusade retook Jerusalem.',
  },
  {
    id: 'fourth_supply',
    name: 'Fourth Crusade (1202-1204)',
    verdict: 'DIVERTED -- logistics of debt',
    verdictColor: C.red,
    distance: 'Venice to Egypt (planned), Venice to Constantinople (actual)',
    armySize: '~12,000 (expected 33,500 -- only 1/3 showed up)',
    supplyMethod: 'Venetian transport contract (85,000 marks)',
    route: 'Planned: Venice to Alexandria. Actual: Venice to Zara to Constantinople.',
    season: 'Assembled Venice summer 1202, sacked Constantinople April 1204',
    challenge: 'Pope Innocent III\'s plan targeted Egypt, the center of Ayyubid power. The Crusaders contracted with Venice for transport: 85,000 silver marks for ships to carry 33,500 men and 4,500 horses. But only ~12,000 Crusaders arrived. The debt was unpayable. Venice held the army hostage.',
    commanderPlan: 'The original plan was strategically sound: strike Egypt to destroy Ayyubid power at its economic base, then negotiate Jerusalem\'s return from a position of strength. The Venetian contract was supposed to provide the logistical foundation that previous overland Crusades had lacked.',
    whatHappened: 'Venice\'s Doge Dandolo offered to defer the debt if the Crusaders first attacked Zara (a Venetian commercial rival on the Adriatic), then diverted to Constantinople where a deposed Byzantine prince promised 200,000 marks. Each diversion created a new debt. The Crusade became a debt-driven spiral that ended in the sack of Constantinople -- the richest Christian city in the world.',
    structuralReason: 'The Fourth Crusade demonstrates that logistics is not just food and transport -- it is finance. The Venetian contract created a debt trap that gave commercial interests control over a religious military expedition. When the Crusaders could not pay, they lost strategic autonomy. Every subsequent decision was driven by the need to service debt, not achieve military objectives. The logistics of finance can be as fatal as the logistics of supply.',
  },
  {
    id: 'fifth',
    name: 'Fifth Crusade (1217-1221)',
    verdict: 'FAILURE -- environment as enemy',
    verdictColor: C.red,
    distance: 'Acre to Damietta (Egypt), ~500 km by sea',
    armySize: '~30,000 at peak (rotating contingents from multiple nations)',
    supplyMethod: 'Maritime supply to Damietta, then attempted river advance up the Nile',
    route: 'Sea from Acre to Damietta, then up the Nile Delta toward Cairo',
    season: 'Captured Damietta November 1219, advanced south summer 1221 (fatal error)',
    challenge: 'The Fifth Crusade correctly targeted Egypt but underestimated the Nile itself. Damietta was captured after a long siege, but the real objective was Cairo. The route south ran along Nile channels through flat delta terrain where the Egyptians controlled the water systems.',
    commanderPlan: 'Cardinal Pelagius (papal legate commanding) rejected Sultan al-Kamil\'s extraordinary offer to trade Jerusalem for Damietta. Pelagius believed God would grant total victory and ordered an advance on Cairo up the Nile in July 1221. The army was to follow the river, maintaining supply by boat.',
    whatHappened: 'Al-Kamil opened the sluice gates. The annual Nile flood, perfectly predictable to any Egyptian, turned the delta into a swamp. The Crusader army was trapped between rising waters and Egyptian forces. Supply boats could not navigate the flooded channels. The entire army was forced to surrender. Damietta was returned. The Crusade gained nothing.',
    structuralReason: 'Environmental intelligence is logistics. The Nile flood cycle was common knowledge in Egypt but unknown to European commanders. Pelagius advanced in July -- the worst possible month -- because he did not understand the terrain he was fighting in. Al-Kamil did not need to defeat the Crusaders in battle; he let the river do it. This pattern recurs throughout military history: armies that do not understand local environmental conditions lose to those who do.',
  },
];

var SUPPLY_VARIABLES = [
  { id: 'armySize', label: 'Army Size', options: [
    { id: 'small', label: 'Small (<20,000)', desc: 'Easier to feed, harder to fight' },
    { id: 'medium', label: 'Medium (20-40,000)', desc: 'Balanced force, marginal supply' },
    { id: 'large', label: 'Large (>40,000)', desc: 'Overwhelming force, unsustainable logistics' },
  ]},
  { id: 'supplyMethod', label: 'Supply Method', options: [
    { id: 'forage', label: 'Foraging/Plunder', desc: 'No supply chain, depends on terrain' },
    { id: 'maritime', label: 'Maritime Supply', desc: 'Reliable but limits you to the coast' },
    { id: 'contract', label: 'Commercial Contract', desc: 'Professional but creates debt dependency' },
  ]},
  { id: 'route', label: 'Route', options: [
    { id: 'overland', label: 'Overland (Anatolia)', desc: 'Direct but hostile, no supply' },
    { id: 'coastal', label: 'Coastal March', desc: 'Longer but fleet can resupply' },
    { id: 'sea', label: 'Full Maritime', desc: 'Fast but depends on ports and weather' },
  ]},
  { id: 'season', label: 'Campaign Season', options: [
    { id: 'spring', label: 'Spring Departure', desc: 'Arrive summer, heat but good sailing' },
    { id: 'summer', label: 'Summer Campaign', desc: 'Peak heat, disease risk, but dry roads' },
    { id: 'autumn', label: 'Autumn/Winter', desc: 'Cooler but rains, floods, short days' },
  ]},
];

// Mapping: each combination of choices maps to a closest-match campaign
var SUPPLY_MATCH_RULES = [
  // First Crusade: large + forage + overland + any
  { match: function(c) { return c.armySize === 'large' && c.supplyMethod === 'forage' && c.route === 'overland'; }, campaignId: 'second', note: 'Your configuration closely mirrors the Second Crusade: a massive army foraging overland. Conrad III and Louis VII proved this combination is catastrophic. The terrain cannot sustain armies of this size without a supply chain.' },
  { match: function(c) { return c.armySize === 'small' && c.supplyMethod === 'forage' && c.route === 'overland'; }, campaignId: 'first', note: 'A smaller army foraging overland most closely matches the First Crusade. You might succeed -- but only if Muslim political fragmentation prevents coordinated resistance. The First Crusade was unrepeatable precisely because that condition never recurred.' },
  { match: function(c) { return c.supplyMethod === 'maritime' && c.route === 'coastal'; }, campaignId: 'third_supply', note: 'Maritime supply along the coast matches Richard I\'s Third Crusade approach. This is the most sustainable configuration, but it constrains you to coastal objectives. Jerusalem remains 50 km inland -- logistically unreachable.' },
  { match: function(c) { return c.supplyMethod === 'maritime' && c.route === 'sea'; }, campaignId: 'fifth', note: 'Full maritime to a distant target matches the Fifth Crusade\'s Damietta expedition. Sea supply works for the landing but breaks down when you advance inland, especially if you do not understand local environmental conditions.' },
  { match: function(c) { return c.supplyMethod === 'contract'; }, campaignId: 'fourth_supply', note: 'Commercial transport contracts match the Fourth Crusade. When you depend on a commercial partner (Venice), your strategic autonomy is subordinated to their financial interests. Debt becomes the real enemy.' },
  { match: function(c) { return c.armySize === 'medium' && c.supplyMethod === 'forage'; }, campaignId: 'first', note: 'A medium-sized army foraging matches the First Crusade\'s effective strength in Syria (~35,000). This can work if the political environment is favorable, but it is a gamble on enemy disunity.' },
  { match: function(c) { return c.route === 'overland' && c.season === 'autumn'; }, campaignId: 'second', note: 'Overland in autumn/winter matches the Second Crusade\'s fatal timing. Conrad III\'s army was destroyed crossing Anatolia in autumn rains and early winter. The combination of mud, cold, and Seljuk harassment is lethal.' },
  { match: function(c) { return c.armySize === 'large' && c.season === 'summer'; }, campaignId: 'fifth', note: 'A large army campaigning in summer resembles the Fifth Crusade\'s advance up the Nile in July. Heat, disease, and environmental hazards (floods, swamps) destroy large armies that cannot adapt to local conditions.' },
];

// Fallback
var SUPPLY_DEFAULT_MATCH = { campaignId: 'third_supply', note: 'Your configuration has elements of multiple historical campaigns. The closest sustainable model is Richard I\'s Third Crusade: maritime logistics supporting coastal operations. Any deviation toward overland routes, massive armies, or commercial debt reintroduces the failure modes that doomed the Second, Fourth, and Fifth Crusades.' };

// ── Military Balance Data ──────────────────────────────────────────
var MILITARY_DIMENSIONS = [
  {
    id: 'heavy_cav',
    label: 'Heavy Cavalry',
    crusaderScore: 90,
    muslimScore: 35,
    advantage: 'Crusader',
    analysis: 'The Frankish knight was the most powerful individual combatant on the medieval battlefield. A charge by armored heavy cavalry could shatter any formation. At Arsuf (1191), Richard I\'s cavalry charge broke Saladin\'s center decisively. The knight\'s weakness was heat, fatigue, and the inability to pursue nimble horse archers. Once committed, a charge could not be recalled. At Hattin (1187), Saladin exploited this by provoking premature charges that left Crusader infantry exposed.',
    battles: 'Arsuf (1191): Richard\'s disciplined charge shattered Ayyubid center. Hattin (1187): Crusader cavalry charges failed against Saladin\'s tactical patience. Dorylaeum (1097): Norman heavy cavalry broke Seljuk encirclement.',
  },
  {
    id: 'light_cav',
    label: 'Light Cavalry',
    crusaderScore: 25,
    muslimScore: 85,
    advantage: 'Muslim',
    analysis: 'Turkic horse archers were the defining Muslim military advantage. They could harass, encircle, and attrit Crusader columns without ever committing to close combat. The composite bow fired from horseback gave them range and mobility that European cavalry could not match. The feigned retreat -- firing while riding away -- was devastatingly effective against undisciplined Crusaders. Only commanders who maintained strict march discipline (like Richard I) could neutralize this advantage.',
    battles: 'Hattin (1187): Turkic horse archers dehydrated and demoralized the Crusader column before the main engagement. Myriokephalon (1176): Seljuk light cavalry ambushed Byzantine heavy cavalry in a mountain pass. Mongol campaigns (1250s-60s): demonstrated horse archer supremacy at scale.',
  },
  {
    id: 'siege',
    label: 'Siege Capability',
    crusaderScore: 65,
    muslimScore: 70,
    advantage: 'Roughly equal (Muslim edge by 13th C)',
    analysis: 'Siege warfare saw the most technological cross-pollination. Crusaders brought Western siege tower and battering ram techniques; Muslims contributed the counterweight trebuchet (manjaniq), Greek fire, and undermining expertise. By the 13th century, the Mamluks had decisively surpassed Crusader siege capability. At Acre (1291), al-Ashraf Khalil deployed trebuchets of unprecedented size that could reduce Crusader fortifications that had withstood a century of assault.',
    battles: 'Antioch (1097-98): 8-month Crusader siege, resolved by treachery not technology. Acre (1189-91): 2-year siege required both naval blockade and land assault. Acre (1291): Mamluk siege engines overwhelmed the strongest Crusader fortifications in weeks.',
  },
  {
    id: 'naval',
    label: 'Naval Power',
    crusaderScore: 80,
    muslimScore: 40,
    advantage: 'Crusader (Italian republics)',
    analysis: 'The Italian maritime republics -- Venice, Genoa, Pisa -- gave the Crusader states their most decisive strategic advantage. Italian fleets controlled the eastern Mediterranean, enabling reinforcement, supply, and trade that kept the coastal Crusader states alive. Fatimid and later Ayyubid fleets were competent but could not match Italian naval technology or commercial organization. This naval superiority is why the Crusader states survived as a coastal strip for 200 years even after losing inland territory.',
    battles: 'Siege of Acre (1189-91): Crusader naval blockade was decisive. Richard I\'s fleet enabled the coastal march strategy. Fourth Crusade (1202-04): Venice\'s fleet was the most powerful naval force in the Mediterranean.',
  },
  {
    id: 'fortification',
    label: 'Fortification',
    crusaderScore: 85,
    muslimScore: 55,
    advantage: 'Crusader (until Mamluk era)',
    analysis: 'Crusader castle-building in the Levant produced the finest medieval fortifications ever constructed. Krak des Chevaliers, Kerak, Beaufort, and Margat were concentric castles that could withstand prolonged siege with small garrisons. A single castle could control an entire region. The Hospitallers held Krak des Chevaliers with 2,000 men against armies of 20,000+. But the Mamluks eventually developed siege techniques that could reduce even these fortresses, and by the 1260s-80s, Baybars was systematically demolishing the castle network.',
    battles: 'Krak des Chevaliers: held by Hospitallers 1142-1271, finally taken by Baybars through negotiated surrender. Kerak: withstood multiple Ayyubid sieges. Beaufort: captured by Saladin 1190, Mamluks 1268.',
  },
  {
    id: 'logistics_sust',
    label: 'Logistics Sustainability',
    crusaderScore: 30,
    muslimScore: 85,
    advantage: 'Muslim (decisive)',
    analysis: 'This was the dimension that ultimately determined the outcome of the Crusades. Muslim forces operated on interior lines with local supply, familiar terrain, and populations that supported them (or at least did not resist). Crusader forces depended on maritime resupply from Europe, reinforcements that arrived irregularly, and a hostile or indifferent local population. Every Crusader campaign was a logistical race against time. Muslim commanders could simply wait. Saladin\'s strategy at the Third Crusade was essentially logistical patience: outlast Richard\'s ability to sustain operations far from home.',
    battles: 'Hattin (1187): Saladin used water denial as a logistical weapon. Third Crusade (1189-92): Richard could not sustain an inland march to Jerusalem. Fifth Crusade (1221): Nile flood destroyed Crusader supply lines.',
  },
];

var BALANCE_INSIGHT = 'The Crusader states survived for nearly 200 years (1098-1291) not because of overall military superiority -- they were inferior in light cavalry, logistics, and increasingly in siege capability. They survived because of three factors: (1) Muslim political disunity prevented coordinated responses until Saladin, (2) Italian naval supremacy kept the coast supplied, and (3) the castle network multiplied defensive capability. When Saladin unified Egypt and Syria (1174-1186), he eliminated factor (1). The Mamluks, who succeeded the Ayyubids, then developed the siege capability to eliminate factor (3). By 1291, only Italian naval power remained -- enough to evacuate survivors from Acre, but not enough to sustain the Crusader states.';

// ── Coexistence Data ───────────────────────────────────────────────
var COEXISTENCE_ASPECTS = [
  {
    id: 'trade',
    label: 'Trade & Commerce',
    icon: '\u2696',
    analysis: 'The Crusader states were commercial enterprises as much as religious colonies. Italian merchant quarters (fondachi) in Acre, Tyre, and Tripoli created the infrastructure for East-West trade that predated and outlasted the Crusades themselves. Muslims, Christians, and Jews traded in shared markets (suqs). The Venetian quarter in Acre was essentially an autonomous commercial zone. Trade continued even during active hostilities -- a fact that scandalized religious authorities on both sides. Saladin\'s truce with Italian merchants guaranteed commercial access even as he planned to destroy the Crusader states militarily.',
    comparison: 'The Italian fondaco system anticipated the later Ottoman capitulations and European extraterritorial concessions in the 19th century. The principle was identical: foreign merchants receive autonomous legal and commercial rights within a host territory in exchange for trade revenue.',
  },
  {
    id: 'law',
    label: 'Legal Pluralism',
    icon: '\u2696',
    analysis: 'The Kingdom of Jerusalem operated a system of parallel courts: the High Court for Frankish nobility (using the Assizes of Jerusalem), the Court of the Bourgeois for Frankish commoners, and separate courts for Muslim, Eastern Christian, and Jewish communities that applied their own religious law. This was not tolerance in the modern sense -- it was administrative pragmatism. The Crusader lords lacked the population to impose uniform law and needed local communities to function economically.',
    comparison: 'This closely parallels the later Ottoman millet system, where each religious community (Greek Orthodox, Armenian, Jewish) governed its own personal law under Ottoman sovereignty. Both systems recognized that multi-confessional societies require legal flexibility. The key difference: the Ottoman millet system was a conscious policy of imperial governance, while the Crusader system was improvised from necessity.',
  },
  {
    id: 'language',
    label: 'Language & Communication',
    icon: '\u270E',
    analysis: 'The Crusader states were genuinely multilingual. Arabic was the language of commerce, agriculture, and daily interaction with local populations. Latin was the language of ecclesiastical administration and formal documents. Old French (langue d\'oil) was the language of the Frankish aristocracy and the courts. Greek persisted among Eastern Christian communities. The dragoman (interpreter, from Arabic tarjuman) was an essential figure in Crusader administration. Second-generation Franks (poulains) often spoke Arabic fluently, which newly arrived Crusaders from Europe found shocking.',
    comparison: 'This multilingual environment mirrors other frontier societies: Moorish Spain (Arabic, Castilian, Hebrew, Romance), Norman Sicily (Arabic, Greek, Latin), and later Ottoman Constantinople (Turkish, Greek, Armenian, Ladino). Linguistic diversity in the Crusader states was a sign of genuine cultural contact, not merely coexistence.',
  },
  {
    id: 'architecture',
    label: 'Architecture & Material Culture',
    icon: '\u2302',
    analysis: 'Crusader architecture in the Levant is a remarkable hybrid of Romanesque and Islamic traditions. The Church of the Holy Sepulchre in its Crusader-era form combines Romanesque structural elements with Islamic decorative patterns. Crusader castles incorporated Muslim defensive innovations (machicolations, bent entrances, concentric walls). Domestic architecture adopted Islamic features: interior courtyards, pointed arches, decorative stonework, and sophisticated water systems. These techniques were then exported back to Europe -- Edward I\'s Welsh castles directly adopted Crusader concentric design.',
    comparison: 'The architectural synthesis parallels Mudeejar art in Spain, where Christian patrons employed Muslim artisans to create hybrid buildings. In both cases, the military conflict did not prevent aesthetic and technical exchange. Architecture was a domain where practical superiority overrode religious boundaries.',
  },
  {
    id: 'medicine',
    label: 'Medicine & Learning',
    icon: '\u2625',
    analysis: 'Islamic medicine was vastly superior to European medicine in the 12th century. Ibn Sina\'s Canon of Medicine was the authoritative text, and Crusader physicians eventually adopted Islamic diagnostic and pharmacological practices. Usama ibn Munqidh records both horrifying examples of Frankish medicine (a knight\'s leg amputated when a poultice might have saved it) and examples of Franks seeking Muslim physicians. The Hospitaller order operated hospitals that drew on both Western and Islamic medical traditions, creating institutions that were among the most advanced in the medieval world.',
    comparison: 'Usama ibn Munqidh\'s famous anecdote about Frankish medicine illustrates the dynamic: a Frankish physician treated a woman\'s headache with a cross-shaped incision in her skull, killing her. A Muslim physician had been treating her successfully with diet. Yet within decades, Crusader physicians were studying Arabic medical texts. The exchange was real but uneven and often painful.',
  },
];

var COEXISTENCE_SCENARIOS = [
  {
    id: 'usama_temple',
    source: 'Usama ibn Munqidh, Kitab al-I\'tibar (c. 1175)',
    title: 'The Templar and the Prayer',
    narrative: 'Usama describes visiting the al-Aqsa Mosque (then the Templar headquarters) to pray. The Templars, who knew him as a diplomatic visitor, allowed him to use a corner to pray toward Mecca. A newly arrived Crusader -- unfamiliar with local customs -- seized Usama and tried to force him to pray facing east in the Christian manner. The Templars intervened, apologized, and explained that the newcomer "had just arrived from the land of the Franks and had never seen anyone praying except eastward."',
    tension: 'coexistence',
    interpretation: 'This episode captures the duality perfectly. The established Templars had developed working relationships with Muslims that included religious accommodation. But every new wave of Crusaders from Europe brought people who had no experience of interfaith coexistence and saw any Muslim practice as threatening. The Crusader states existed in constant tension between acculturated residents and zealous newcomers.',
  },
  {
    id: 'fulcher_settlement',
    source: 'Fulcher of Chartres, Historia Hierosolymitana (c. 1127)',
    title: 'Becoming Eastern',
    narrative: 'Fulcher, a chaplain who settled in Jerusalem, wrote with wonder about how Franks had adapted: "We who were Occidentals have now become Orientals. He who was a Roman or a Frank has in this land been made into a Galilean or a Palestinian. He who was of Rheims or Chartres has now become a citizen of Tyre or Antioch. We have already forgotten the places of our birth." He describes Franks who married local women, spoke multiple languages, and lived in ways unrecognizable to their European relatives.',
    tension: 'coexistence',
    interpretation: 'Fulcher documents genuine cultural transformation, not mere conquest. The poulains (second-generation Franks) developed a hybrid identity that was neither European nor Muslim but something new. This challenges the narrative of the Crusades as purely destructive. The Crusader states produced a creole society with its own culture, customs, and identity.',
  },
  {
    id: 'william_massacre',
    source: 'William of Tyre, Historia (c. 1170s)',
    title: 'The Massacre at Jerusalem (1099)',
    narrative: 'William of Tyre, writing decades later, describes the fall of Jerusalem with ambivalence. He records the massacre of Muslim and Jewish inhabitants with detail that suggests discomfort: the Temple Mount running with blood, civilians killed without distinction, the Jewish community burned alive in their synagogue. William was born in the Crusader states and understood both the triumphalism of the conquest and its moral cost. His account is notably more restrained than the exultant descriptions by participants like Raymond of Aguilers.',
    tension: 'violence',
    interpretation: 'William\'s account reveals that even within Crusader society, the massacre was recognized as problematic. The first generation celebrated the conquest as divine vindication. By William\'s time (born c. 1130), Crusader intellectuals understood that the massacre had created a permanent grievance. The coexistence that developed in the 12th century existed in the shadow of 1099 -- both sides knew what had happened and what could happen again.',
  },
];

// ═════════════════════════════════════════════════════════════════════
//  CrusadesView Component
// ═════════════════════════════════════════════════════════════════════
function CrusadesView({ setView }) {
  const topRef = useRef(null);
  const [tipId, setTipId] = useState(null);
  const [mode, setMode] = useState('campaigns');
  const [selectedCrusade, setSelectedCrusade] = useState(0);
  const [revealedMap, setRevealedMap] = useState({});
  const [expandedPerspective, setExpandedPerspective] = useState(null);
  const [expandedLegacy, setExpandedLegacy] = useState(null);
  const [perspectiveSide, setPerspectiveSide] = useState('both');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizRevealed, setQuizRevealed] = useState({});
  const [csYear, setCsYear] = useState(1144);
  const [csHover, setCsHover] = useState(null);

  // Supply mode state
  const [supplyExpanded, setSupplyExpanded] = useState(null);
  const [supplyChoices, setSupplyChoices] = useState({ armySize: null, supplyMethod: null, route: null, season: null });
  var supplyResult = useMemo(function() {
    var c = supplyChoices;
    if (!c.armySize || !c.supplyMethod || !c.route || !c.season) return null;
    for (var i = 0; i < SUPPLY_MATCH_RULES.length; i++) {
      if (SUPPLY_MATCH_RULES[i].match(c)) {
        var camp = SUPPLY_CAMPAIGNS.find(function(x) { return x.id === SUPPLY_MATCH_RULES[i].campaignId; });
        return { campaign: camp, note: SUPPLY_MATCH_RULES[i].note };
      }
    }
    var defCamp = SUPPLY_CAMPAIGNS.find(function(x) { return x.id === SUPPLY_DEFAULT_MATCH.campaignId; });
    return { campaign: defCamp, note: SUPPLY_DEFAULT_MATCH.note };
  }, [supplyChoices]);

  // Balance mode state
  const [balanceDimension, setBalanceDimension] = useState(null);

  // Coexistence mode state
  const [coexAspect, setCoexAspect] = useState(null);
  const [coexScenario, setCoexScenario] = useState(0);
  const [coexVotes, setCoexVotes] = useState({});

  const revealedCount = useMemo(() => Object.keys(revealedMap).length, [revealedMap]);

  // ── Scholarly tooltip renderer & icons ─────────────────────────
  const TipBox = (key) => {
    if (tipId !== key) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(10,8,7,.94)', border: '1px solid rgba(176,132,58,.15)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(212,202,186,.65)', lineHeight: 1.65, margin: '6px 0 10px' }}>
        {CR_TIPS[key]}
      </div>
    );
  };

  const CastleIcon = (
    <svg width={22} height={22} viewBox="0 0 22 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'crusader_states' ? null : 'crusader_states')}>
      <rect x={3} y={10} width={16} height={10} fill="none" stroke="currentColor" strokeWidth=".8" />
      <rect x={3} y={6} width={4} height={4} fill="none" stroke="currentColor" strokeWidth=".6" />
      <rect x={9} y={6} width={4} height={4} fill="none" stroke="currentColor" strokeWidth=".6" />
      <rect x={15} y={6} width={4} height={4} fill="none" stroke="currentColor" strokeWidth=".6" />
      <rect x={9} y={14} width={4} height={6} fill="none" stroke="currentColor" strokeWidth=".5" />
    </svg>
  );

  const SwordIcon = (
    <svg width={20} height={24} viewBox="0 0 20 24" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'saladin' ? null : 'saladin')}>
      <line x1={10} y1={2} x2={10} y2={16} stroke="currentColor" strokeWidth=".8" />
      <line x1={5} y1={16} x2={15} y2={16} stroke="currentColor" strokeWidth="1" />
      <line x1={10} y1={16} x2={10} y2={20} stroke="currentColor" strokeWidth="1.2" />
      <circle cx={10} cy={21} r={1.5} fill="none" stroke="currentColor" strokeWidth=".6" />
      <path d="M8 2 L10 0 L12 2" fill="none" stroke="currentColor" strokeWidth=".6" />
    </svg>
  );

  const FlameIcon = (
    <svg width={20} height={22} viewBox="0 0 20 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'byzantine_betrayal' ? null : 'byzantine_betrayal')}>
      <path d="M10 2 Q6 8 6 12 Q6 18 10 20 Q14 18 14 12 Q14 8 10 2Z" fill="none" stroke="currentColor" strokeWidth=".8" />
      <path d="M10 8 Q8 12 8 14 Q8 17 10 18 Q12 17 12 14 Q12 12 10 8Z" fill="currentColor" fillOpacity=".1" />
    </svg>
  );

  const DaggerIcon = (
    <svg width={18} height={24} viewBox="0 0 18 24" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'assassins' ? null : 'assassins')}>
      <line x1={9} y1={2} x2={9} y2={14} stroke="currentColor" strokeWidth=".7" />
      <path d="M7 2 L9 0 L11 2" fill="none" stroke="currentColor" strokeWidth=".5" />
      <line x1={5} y1={14} x2={13} y2={14} stroke="currentColor" strokeWidth=".8" />
      <line x1={9} y1={14} x2={9} y2={22} stroke="currentColor" strokeWidth=".6" strokeDasharray="1.5 1" />
    </svg>
  );

  const revealCrusade = useCallback((id) => {
    setRevealedMap(prev => ({ ...prev, [id]: true }));
  }, []);

  const togglePerspective = useCallback((id) => {
    setExpandedPerspective(prev => prev === id ? null : id);
  }, []);

  const toggleLegacy = useCallback((id) => {
    setExpandedLegacy(prev => prev === id ? null : id);
  }, []);

  // ── States Renderer (SVG Crusader States Map) ─────────────────────
  const renderStates = useCallback(() => {
    const hoveredState = csHover !== null
      ? (CRUSADER_STATES.find(s => s.id === csHover) || MUSLIM_STATES.find(s => s.id === csHover))
      : null;
    const isCrusader = hoveredState ? CRUSADER_STATES.some(s => s.id === csHover) : false;
    return (
      <div>
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.accentDm, marginBottom: 12 }}>
          CRUSADER STATES &mdash; LEVANTINE COAST{CastleIcon}
        </div>
        {TipBox('crusader_states')}

        {/* Year toggle */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {[1144, 1291].map(yr => (
            <button key={yr} onClick={() => setCsYear(yr)} style={{
              padding: '8px 20px', borderRadius: 4, cursor: 'pointer',
              background: csYear === yr ? C.accentBg : 'transparent',
              border: '1px solid ' + (csYear === yr ? C.accent : C.line),
              color: csYear === yr ? C.accent : C.tx3,
              fontFamily: Mono, fontSize: 12, fontWeight: csYear === yr ? 700 : 400,
            }}>
              {yr === 1144 ? 'Peak (1144)' : 'Fall (1291)'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {/* SVG map */}
          <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 20, flex: '0 0 auto' }}>
            <svg viewBox="0 0 300 500" style={{ width: 260, display: 'block' }}>
              {/* Mediterranean label */}
              <text x="20" y="250" fill={C.tx3} fontSize="8" fontFamily={Mono} transform="rotate(-90 20 250)">MEDITERRANEAN</text>

              {/* Muslim states (dashed borders) */}
              {MUSLIM_STATES.map(ms => (
                <g key={ms.id}
                  onMouseEnter={() => setCsHover(ms.id)}
                  onMouseLeave={() => setCsHover(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <path d={ms.path} fill={ms.color + '22'} stroke={ms.color}
                    strokeWidth={csHover === ms.id ? 2 : 1} strokeDasharray="4,3"
                    style={{ transition: 'all .2s' }} />
                  <text x={parseInt(ms.path.split(' ')[1].split(',')[0]) + 20}
                    y={parseInt(ms.path.split(' ')[1].split(',')[1]) + 30}
                    fill={ms.color} fontSize="7" fontFamily={Mono} textAnchor="middle">
                    {ms.label.split('/')[0]}
                  </text>
                </g>
              ))}

              {/* Crusader states */}
              {CRUSADER_STATES.map(cs => {
                const fallen = csYear === 1291 && cs.status1291 === 'fallen';
                const isHov = csHover === cs.id;
                return (
                  <g key={cs.id}
                    onMouseEnter={() => setCsHover(cs.id)}
                    onMouseLeave={() => setCsHover(null)}
                    onClick={() => setCsHover(csHover === cs.id ? null : cs.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <path d={cs.path}
                      fill={fallen ? (C.redBg || 'rgba(168,64,56,.15)') : cs.color + (isHov ? '55' : '33')}
                      stroke={fallen ? C.red : cs.color}
                      strokeWidth={isHov ? 2.5 : 1.5}
                      strokeDasharray={fallen ? '6,3' : 'none'}
                      style={{ transition: 'all .2s' }} />
                    {fallen && (
                      <text x={parseInt(cs.path.split(' ')[3].split(',')[0]) - 10}
                        y={parseInt(cs.path.split(' ')[3].split(',')[1]) - 5}
                        fill={C.red} fontSize="10" textAnchor="middle">{'\u2716'}</text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Info panel */}
          <div style={{ flex: 1, minWidth: 240 }}>
            {hoveredState ? (
              <div style={{
                background: C.card, border: '1px solid ' + C.cardBd,
                borderRadius: 8, padding: 20,
              }}>
                <div style={{ fontFamily: Serif, fontSize: 18, fontWeight: 600, color: isCrusader ? C.cross : C.crescent, marginBottom: 8 }}>
                  {hoveredState.label}
                </div>
                {isCrusader && (
                  <div>
                    <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 4 }}>
                      RULER ({csYear})
                    </div>
                    <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, marginBottom: 12 }}>
                      {csYear === 1144 ? hoveredState.ruler1144 : hoveredState.ruler1291}
                    </div>
                    {csYear === 1291 && hoveredState.status1291 === 'fallen' && (
                      <div style={{
                        fontFamily: Mono, fontSize: 12, color: C.red,
                        padding: '4px 8px', background: C.redBg, borderRadius: 4,
                        display: 'inline-block',
                      }}>
                        FALLEN
                      </div>
                    )}
                  </div>
                )}
                {!isCrusader && (
                  <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.6 }}>
                    Muslim counter-state opposing Crusader presence.
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                background: C.card, border: '1px solid ' + C.cardBd,
                borderRadius: 8, padding: 20, textAlign: 'center',
              }}>
                <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx3, fontStyle: 'italic' }}>
                  Hover or click a region to see details. Toggle between peak (1144) and fall (1291) to see how the Crusader States collapsed.
                </div>
              </div>
            )}

            {/* Legend */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 6 }}>LEGEND</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {CRUSADER_STATES.map(cs => (
                  <div key={cs.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 2, background: cs.color }} />
                    <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx2 }}>{cs.label}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid ' + C.line, paddingTop: 4, marginTop: 4 }}>
                  {MUSLIM_STATES.map(ms => (
                    <div key={ms.id} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 2, border: '1px dashed ' + ms.color, background: ms.color + '22' }} />
                      <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx2 }}>{ms.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [csYear, csHover]);

  // ── Mode Switcher ──────────────────────────────────────────────────
  const ModeSwitch = useCallback(() => {
    const modes = [
      { key: 'campaigns',    label: 'Campaigns',    icon: '\u2694' },
      { key: 'states',       label: 'States',       icon: '\u2690' },
      { key: 'perspectives', label: 'Perspectives', icon: '\u2696' },
      { key: 'legacy',       label: 'Legacy',       icon: '\uD83C\uDFDB' },
      { key: 'quiz',         label: "Commander\u2019s Choice", icon: '\u2726' },
      { key: 'supply',       label: 'Logistics',    icon: '\u2042' },
      { key: 'balance',      label: 'Military Balance', icon: '\u2720' },
      { key: 'coexistence',  label: 'Coexistence',  icon: '\u2668' },
    ];
    return (
      <div style={{
        display: 'flex', gap: 4, marginBottom: 24,
        background: C.card, border: '1px solid ' + C.cardBd,
        borderRadius: 8, padding: 4,
      }}>
        {modes.map(m => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            style={{
              flex: 1, padding: '10px 8px', borderRadius: 6,
              border: 'none', cursor: 'pointer',
              background: mode === m.key ? C.accentBg : 'transparent',
              color: mode === m.key ? C.accent : C.tx3,
              fontFamily: Mono, fontSize: 11, letterSpacing: '.04em',
              transition: 'all .15s ease',
              borderBottom: mode === m.key ? '2px solid ' + C.accent : '2px solid transparent',
            }}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>
    );
  }, [mode]);

  // ── Campaign Renderer ──────────────────────────────────────────────
  const renderCampaigns = useCallback(() => {
    const cr = CRUSADES[selectedCrusade];
    const isRevealed = revealedMap[cr.id];

    return (
      <div>
        {/* Campaign selector tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
          {CRUSADES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelectedCrusade(i)}
              style={{
                padding: '10px 16px', borderRadius: 6, cursor: 'pointer',
                border: '1px solid ' + (selectedCrusade === i ? C.accent : C.cardBd),
                background: selectedCrusade === i ? C.accentBg : C.card,
                color: selectedCrusade === i ? C.accent : C.tx2,
                fontFamily: Mono, fontSize: 12, letterSpacing: '.03em',
                transition: 'all .15s ease',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 2 }}>{c.num} {c.name}</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{c.year}</div>
            </button>
          ))}
        </div>

        {/* Campaign detail card — illuminated manuscript style */}
        <div style={{
          background: C.card, border: 'none',
          borderRadius: 6, overflow: 'hidden', position: 'relative',
        }}>
          <MedievalCardBorder />
          {/* Header — manuscript illumination style */}
          <div style={{
            padding: '24px 28px 20px',
            borderBottom: '1px solid ' + C.line,
            background: C.accentBg,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
              {/* Illuminated numeral */}
              <span style={{
                fontFamily: Serif, fontSize: 44, fontWeight: 700, color: C.gold,
                lineHeight: 1, textShadow: '0 0 10px rgba(212,168,80,.2)',
              }}>
                {cr.num}
              </span>
              <div>
                <h2 style={{
                  fontFamily: Serif, fontSize: 24, fontWeight: 600, color: C.tx,
                  margin: 0, letterSpacing: '.01em',
                }}>
                  {cr.name}{SwordIcon}
                </h2>
                {TipBox('saladin')}
                <div style={{
                  fontFamily: Serif, fontSize: 14, color: C.tx2, fontStyle: 'italic',
                }}>
                  {cr.subtitle}
                </div>
              </div>
            </div>
            <div style={{
              fontFamily: Mono, fontSize: 12, color: C.tx3, letterSpacing: '.04em',
              marginTop: 8,
            }}>
              {cr.year} &middot; {cr.region}
            </div>
          </div>

          {/* Forces comparison */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
            borderBottom: '1px solid ' + C.line,
          }}>
            <div style={{
              padding: '16px 24px',
              borderRight: '1px solid ' + C.line,
            }}>
              <div style={{
                fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                color: C.cross, marginBottom: 6,
              }}>
                {'\u271A'} CHRISTIAN FORCES
              </div>
              <div style={{
                fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6,
              }}>
                {cr.christianForces}
              </div>
            </div>
            <div style={{ padding: '16px 24px' }}>
              <div style={{
                fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                color: C.crescent, marginBottom: 6,
              }}>
                {'\u262A'} MUSLIM FORCES
              </div>
              <div style={{
                fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6,
              }}>
                {cr.muslimForces}
              </div>
            </div>
          </div>

          {/* Strategic Context */}
          <div style={{ padding: '20px 28px', borderBottom: '1px solid ' + C.line }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.accentDm, marginBottom: 8,
            }}>
              STRATEGIC CONTEXT
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
            }}>
              {cr.strategicContext}
            </div>
          </div>

          {/* Dual Perspective */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
            borderBottom: '1px solid ' + C.line,
          }}>
            <div style={{
              padding: '20px 24px',
              borderRight: '1px solid ' + C.line,
              background: 'rgba(196,64,48,.03)',
            }}>
              <div style={{
                fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                color: C.cross, marginBottom: 10,
              }}>
                {'\u271A'} CHRISTIAN PERSPECTIVE
              </div>
              <div style={{
                fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75,
              }}>
                {cr.christianPerspective}
              </div>
            </div>
            <div style={{
              padding: '20px 24px',
              background: 'rgba(56,160,112,.03)',
            }}>
              <div style={{
                fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                color: C.crescent, marginBottom: 10,
              }}>
                {'\u262A'} MUSLIM PERSPECTIVE
              </div>
              <div style={{
                fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75,
              }}>
                {cr.muslimPerspective}
              </div>
            </div>
          </div>

          {/* Key Decisions (revealed on click) */}
          <div style={{ padding: '20px 28px', borderBottom: '1px solid ' + C.line }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.accentDm, marginBottom: 10,
            }}>
              KEY DECISION POINTS
            </div>
            {!isRevealed ? (
              <button
                onClick={() => revealCrusade(cr.id)}
                style={{
                  width: '100%', padding: '14px 20px', borderRadius: 6,
                  border: '1px dashed ' + C.accent, background: C.accentBg,
                  color: C.accent, fontFamily: Mono, fontSize: 12,
                  cursor: 'pointer', letterSpacing: '.03em',
                }}
              >
                {'\u25B6'} Reveal {cr.keyDecisions.length} Critical Decisions
              </button>
            ) : (
              <ol style={{ margin: 0, paddingLeft: 20 }}>
                {cr.keyDecisions.map((d, i) => (
                  <li key={i} style={{
                    fontFamily: Sans, fontSize: 13, color: C.tx,
                    lineHeight: 1.7, padding: '6px 0',
                    borderBottom: i < cr.keyDecisions.length - 1
                      ? '1px solid ' + C.line : 'none',
                  }}>
                    {d}
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* Primary Source */}
          <div style={{
            padding: '20px 28px',
            background: C.accentBg, borderBottom: '1px solid ' + C.line,
          }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.accentDm, marginBottom: 10,
            }}>
              PRIMARY SOURCE
            </div>
            <blockquote style={{
              fontFamily: Serif, fontSize: 15, color: C.gold,
              fontStyle: 'italic', lineHeight: 1.7,
              margin: 0, paddingLeft: 16,
              borderLeft: '3px solid ' + C.accent,
            }}>
              &ldquo;{cr.primarySource.text}&rdquo;
            </blockquote>
            <div style={{
              fontFamily: Mono, fontSize: 12, color: C.tx3, marginTop: 8,
            }}>
              &mdash; {cr.primarySource.author}, {cr.primarySource.work}
            </div>
          </div>

          {/* Legacy & Verdict */}
          <div style={{ padding: '20px 28px' }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.accentDm, marginBottom: 8,
            }}>
              LEGACY ASSESSMENT{DaggerIcon}
            </div>
            {TipBox('assassins')}
            <div style={{
              fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.75,
              marginBottom: 14,
            }}>
              {cr.legacy}
            </div>
            <div style={{
              display: 'inline-block', padding: '6px 16px',
              borderRadius: 4, fontFamily: Mono, fontSize: 11,
              letterSpacing: '.04em',
              color: cr.verdictColor,
              background: cr.verdictColor + '14',
              border: '1px solid ' + cr.verdictColor + '30',
            }}>
              {cr.outcomeVerdict}
            </div>
          </div>
        </div>
      </div>
    );
  }, [selectedCrusade, revealedMap, revealCrusade]);

  // ── Perspectives Renderer ──────────────────────────────────────────
  const renderPerspectives = useCallback(() => {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <CrossCrescentDecor />
          <span style={{
            fontFamily: Mono, fontSize: 12, letterSpacing: '.08em',
            color: C.accentDm,
          }}>
            HISTORIOGRAPHIC PERSPECTIVES {'\u2014'} CHRISTIAN VS MUSLIM
          </span>
          {FlameIcon}
        </div>
        {TipBox('byzantine_betrayal')}
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.75,
          marginBottom: 16, maxWidth: 720,
        }}>
          <DropCap>{'The same events look radically different depending on which sources you read. This section presents four thematic comparisons drawn from both Western and Arabic primary sources and modern scholarship.'}</DropCap>
        </div>

        {/* Side filter */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {[
            { key: 'both', label: 'Both Sides' },
            { key: 'christian', label: '\u271A Christian' },
            { key: 'muslim', label: '\u262A Muslim' },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setPerspectiveSide(s.key)}
              style={{
                padding: '6px 14px', borderRadius: 4, border: 'none',
                cursor: 'pointer', fontFamily: Mono, fontSize: 12,
                background: perspectiveSide === s.key ? C.accentBg : 'transparent',
                color: perspectiveSide === s.key ? C.accent : C.tx3,
                letterSpacing: '.03em',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PERSPECTIVES.map(p => {
            const isOpen = expandedPerspective === p.id;
            return (
              <div
                key={p.id}
                style={{
                  background: C.card,
                  border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
                  borderRadius: 4, overflow: 'hidden',
                  transition: 'border-color .15s ease',
                  position: 'relative',
                  boxShadow: isOpen ? '0 0 20px rgba(176,132,58,.05)' : 'none',
                }}
              >
                <button
                  onClick={() => togglePerspective(p.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: Mono, fontSize: 18, width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.accentBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                  }}>
                    {'\u2696'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 16, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {p.theme}
                    </div>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, color: C.tx3,
                      letterSpacing: '.04em',
                    }}>
                      {p.christian.title} vs {p.muslim.title}
                    </div>
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
                    borderTop: '1px solid ' + C.line,
                    padding: '0 20px 20px', paddingTop: 16,
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: perspectiveSide === 'both' ? '1fr 1fr' : '1fr',
                      gap: 16,
                    }}>
                      {(perspectiveSide === 'both' || perspectiveSide === 'christian') && (
                        <div style={{
                          background: 'rgba(196,64,48,.04)',
                          borderRadius: 6, padding: 16,
                          border: '1px solid rgba(196,64,48,.12)',
                        }}>
                          <div style={{
                            fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                            color: C.cross, marginBottom: 8,
                          }}>
                            {'\u271A'} {p.christian.title.toUpperCase()}
                          </div>
                          <div style={{
                            fontFamily: Serif, fontSize: 13, color: C.tx,
                            lineHeight: 1.75, marginBottom: 12,
                          }}>
                            {p.christian.analysis}
                          </div>
                          <div style={{
                            fontFamily: Mono, fontSize: 11, color: C.tx3,
                            lineHeight: 1.6, fontStyle: 'italic',
                          }}>
                            {p.christian.sources}
                          </div>
                        </div>
                      )}
                      {(perspectiveSide === 'both' || perspectiveSide === 'muslim') && (
                        <div style={{
                          background: 'rgba(56,160,112,.04)',
                          borderRadius: 6, padding: 16,
                          border: '1px solid rgba(56,160,112,.12)',
                        }}>
                          <div style={{
                            fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                            color: C.crescent, marginBottom: 8,
                          }}>
                            {'\u262A'} {p.muslim.title.toUpperCase()}
                          </div>
                          <div style={{
                            fontFamily: Serif, fontSize: 13, color: C.tx,
                            lineHeight: 1.75, marginBottom: 12,
                          }}>
                            {p.muslim.analysis}
                          </div>
                          <div style={{
                            fontFamily: Mono, fontSize: 11, color: C.tx3,
                            lineHeight: 1.6, fontStyle: 'italic',
                          }}>
                            {p.muslim.sources}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [expandedPerspective, togglePerspective, perspectiveSide]);

  // ── Legacy Renderer ────────────────────────────────────────────────
  const renderLegacy = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          LEGACY ANALYSIS {'\u2014'} LASTING IMPACT ON EAST-WEST RELATIONS
        </div>
        <ManuscriptDivider color={C.accentDm} />
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.75,
          marginBottom: 20, maxWidth: 720,
        }}>
          <DropCap>{'The Crusades lasted two centuries but their consequences have shaped a millennium. Five domains of lasting impact reveal how medieval holy war continues to echo in modern geopolitics, culture, and interfaith relations.'}</DropCap>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LEGACY_ITEMS.map(item => {
            const isOpen = expandedLegacy === item.id;
            return (
              <div
                key={item.id}
                style={{
                  background: C.card,
                  border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
                  borderRadius: 4, overflow: 'hidden',
                  transition: 'border-color .15s ease',
                  boxShadow: isOpen ? '0 0 16px rgba(176,132,58,.05)' : 'none',
                }}
              >
                <button
                  onClick={() => toggleLegacy(item.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 22, width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.accentBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                  }}>
                    {item.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 16, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {item.name}
                    </div>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, color: C.tx3,
                      letterSpacing: '.04em',
                    }}>
                      {item.period}
                    </div>
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
                    padding: '0 20px 20px',
                    borderTop: '1px solid ' + C.line,
                    paddingTop: 16,
                  }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 14, color: C.tx,
                      lineHeight: 1.75, marginBottom: 16,
                    }}>
                      {item.description}
                    </div>

                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.tx3, marginBottom: 8,
                    }}>
                      KEY EFFECTS
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                      {item.effects.map((e, i) => (
                        <li key={i} style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx2,
                          lineHeight: 1.65, padding: '4px 0 4px 16px',
                          borderLeft: '2px solid ' + C.line,
                          marginBottom: 4,
                        }}>
                          {e}
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
                        SIGNIFICANCE
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.gold,
                        lineHeight: 1.7,
                      }}>
                        {item.significance}
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
  }, [expandedLegacy, toggleLegacy]);

  // ── Quiz Renderer (Commander's Choice) ───────────────────────────
  const renderQuiz = useCallback(() => {
    const answeredCount = Object.keys(quizAnswers).length;
    return (
      <div>
        {/* Intro */}
        <div style={{
          padding: '16px 20px', background: C.accentBg,
          border: '1px solid ' + C.accent + '22', borderRadius: 6, marginBottom: 24,
        }}>
          <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.6 }}>
            <strong style={{ color: C.accent }}>{'\u2726'} Commander{'\u2019'}s Choice: </strong>
            Step into the command tent at three decisive moments of the Crusades. You will advise both Christian and Muslim commanders facing genuine strategic dilemmas. Each scenario tests whether you can see the battlefield as they did{'\—'}and whether their actual decisions were the best ones available.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>PROGRESS</span>
            <div style={{ flex: 1, maxWidth: 160, height: 4, background: C.line, borderRadius: 2 }}>
              <div style={{
                width: (answeredCount / 3 * 100) + '%', height: '100%', borderRadius: 2,
                background: answeredCount === 3 ? C.green : C.accent, transition: 'width .3s',
              }} />
            </div>
            <span style={{ fontFamily: Mono, fontSize: 12, color: answeredCount === 3 ? C.green : C.accent }}>
              {answeredCount}/3 answered
            </span>
          </div>
        </div>

        {/* Questions */}
        {COMMANDER_QUIZ.map((q, qi) => {
          const myAnswer = quizAnswers[q.id];
          const isRevealed = quizRevealed[q.id];
          const selectedOpt = myAnswer ? q.options.find(o => o.id === myAnswer) : null;

          return (
            <div key={q.id} style={{
              marginBottom: 20, border: '1px solid ' + (isRevealed ? C.accent + '44' : C.cardBd),
              borderRadius: 8, background: C.card, overflow: 'hidden',
            }}>
              {/* Question header */}
              <div style={{ padding: '18px 20px', borderBottom: '1px solid ' + C.line }}>
                <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.08em', color: C.accentDm, marginBottom: 6 }}>
                  SCENARIO {qi + 1} OF 3
                </div>
                <div style={{ fontFamily: Serif, fontSize: 18, fontWeight: 600, color: C.tx, marginBottom: 10 }}>
                  {q.title}
                </div>
                <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7 }}>
                  {q.scenario}
                </div>
              </div>

              {/* Options */}
              <div style={{ padding: '16px 20px' }}>
                {q.options.map(opt => {
                  const isSelected = myAnswer === opt.id;
                  const borderClr = !myAnswer ? C.cardBd :
                    isSelected ? (opt.score === 3 ? C.green : opt.score === 2 ? C.gold : C.red) + '66' : C.cardBd;
                  const bgClr = !myAnswer ? 'transparent' :
                    isSelected ? (opt.score === 3 ? C.greenBg : opt.score === 2 ? C.accentBg : C.redBg) : 'transparent';

                  return (
                    <button
                      key={opt.id}
                      onClick={() => { if (!myAnswer) setQuizAnswers(prev => ({ ...prev, [q.id]: opt.id })); }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '12px 16px', marginBottom: 8,
                        border: '1px solid ' + borderClr, borderRadius: 6,
                        background: bgClr, cursor: myAnswer ? 'default' : 'pointer',
                        transition: 'all .2s', opacity: myAnswer && !isSelected ? 0.5 : 1,
                      }}
                    >
                      <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.6 }}>
                        <span style={{ fontFamily: Mono, fontSize: 11, color: C.accent, marginRight: 8 }}>
                          {opt.id.toUpperCase()}.
                        </span>
                        {opt.text}
                      </div>
                      {myAnswer && isSelected && (
                        <div style={{
                          marginTop: 6, fontFamily: Mono, fontSize: 12,
                          color: opt.score === 3 ? C.green : opt.score === 2 ? C.gold : C.red,
                        }}>
                          {opt.score === 3 ? '\✓ Matches historical command decision' : opt.score === 2 ? '\u25CB Strategically viable alternative' : '\✗ Would likely have led to defeat'}
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* Reveal button */}
                {myAnswer && !isRevealed && (
                  <button
                    onClick={() => setQuizRevealed(prev => ({ ...prev, [q.id]: true }))}
                    style={{
                      display: 'block', width: '100%', padding: '12px 16px', marginTop: 8,
                      border: '1px solid ' + C.accent + '44', borderRadius: 6,
                      background: C.accentBg, color: C.accent,
                      fontFamily: Mono, fontSize: 12, cursor: 'pointer',
                      textAlign: 'center', letterSpacing: '.04em',
                    }}
                  >
                    {'\u25B6'} Reveal Full Analysis
                  </button>
                )}

                {/* Revealed analysis */}
                {isRevealed && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{
                      padding: '12px 16px', background: C.blueBg,
                      border: '1px solid ' + C.blueDm + '22', borderRadius: 6, marginBottom: 12,
                    }}>
                      <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.blue, marginBottom: 6 }}>
                        YOUR CHOICE {'\—'} ANALYSIS
                      </div>
                      <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7 }}>
                        {selectedOpt.feedback}
                      </div>
                    </div>
                    <div style={{
                      padding: '12px 16px', background: C.greenBg,
                      border: '1px solid ' + C.greenDm + '22', borderRadius: 6,
                    }}>
                      <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.green, marginBottom: 6 }}>
                        HISTORICAL OUTCOME
                      </div>
                      <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7 }}>
                        {q.historicalOutcome}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Score summary */}
        {answeredCount === 3 && (
          <div style={{
            padding: '20px 24px', background: C.card,
            border: '1px solid ' + C.accent + '33', borderRadius: 8, marginTop: 8,
          }}>
            <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.08em', color: C.accent, marginBottom: 10 }}>
              ASSESSMENT COMPLETE
            </div>
            <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.7 }}>
              {(() => {
                const total = COMMANDER_QUIZ.reduce((sum, q) => {
                  const opt = q.options.find(o => o.id === quizAnswers[q.id]);
                  return sum + (opt ? opt.score : 0);
                }, 0);
                if (total >= 8) return 'Exceptional command instinct. You consistently identified the strategically optimal decision at each juncture. Both Richard and Saladin succeeded through the same principle: patience combined with decisive action at the precise moment of maximum advantage. The Fourth Crusade scenario reveals that sometimes the best strategy is the one no one had the political power to execute.';
                if (total >= 5) return 'Solid strategic thinking. You recognized the complexity of each situation and chose defensible alternatives. The Crusades were defined by commanders who understood that tactical brilliance must serve strategic objectives\—and that political constraints often override military logic.';
                return 'You favored aggressive or cautious extremes. The Crusades\u2019 best commanders\—Richard and Saladin alike\—succeeded through calibrated responses: neither pure aggression nor pure defense, but the judgment to know which the moment demanded. The Fourth Crusade shows what happens when that judgment is absent.';
              })()}
            </div>
          </div>
        )}
      </div>
    );
  }, [quizAnswers, quizRevealed]);

  // ── Supply / Logistics Renderer ──────────────────────────────────
  var renderSupply = useCallback(function() {
    var choiceCount = [supplyChoices.armySize, supplyChoices.supplyMethod, supplyChoices.route, supplyChoices.season].filter(Boolean).length;
    return React.createElement('div', null,
      // Header
      React.createElement('div', { style: { fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.accentDm, marginBottom: 6 } },
        'CRUSADER LOGISTICS FAILURE ANALYZER'
      ),
      React.createElement(ManuscriptDivider, { color: C.accentDm }),
      React.createElement('div', { style: { fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.75, marginBottom: 20, maxWidth: 720 } },
        React.createElement(DropCap, null, 'Most Crusades failed not because of combat but because of logistics. Armies that won every battle still lost campaigns when they could not feed themselves, pay their debts, or survive the terrain. This analyzer examines five campaigns through the lens of supply, transport, finance, and environmental intelligence.')
      ),

      // Campaign cards
      SUPPLY_CAMPAIGNS.map(function(sc) {
        var isOpen = supplyExpanded === sc.id;
        return React.createElement('div', { key: sc.id, style: {
          marginBottom: 12, background: C.card, border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
          borderRadius: 6, overflow: 'hidden', transition: 'border-color .15s',
        }},
          // Header button
          React.createElement('button', {
            onClick: function() { setSupplyExpanded(isOpen ? null : sc.id); },
            style: {
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px', cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left',
            }
          },
            React.createElement('div', { style: {
              width: 10, height: 10, borderRadius: '50%', background: sc.verdictColor, flexShrink: 0, opacity: 0.7,
            }}),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: Serif, fontSize: 16, fontWeight: 600, color: C.tx } }, sc.name),
              React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: sc.verdictColor, letterSpacing: '.04em' } }, sc.verdict)
            ),
            React.createElement('span', { style: {
              fontFamily: Mono, fontSize: 14, color: C.tx3, transition: 'transform .15s',
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
            }}, '\u25B6')
          ),

          // Expanded detail
          isOpen && React.createElement('div', { style: { borderTop: '1px solid ' + C.line, padding: '16px 20px' } },
            // Stats grid
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 } },
              [
                { label: 'DISTANCE', val: sc.distance },
                { label: 'ARMY SIZE', val: sc.armySize },
                { label: 'SUPPLY METHOD', val: sc.supplyMethod },
                { label: 'ROUTE', val: sc.route },
              ].map(function(s) {
                return React.createElement('div', { key: s.label, style: { padding: '8px 12px', background: C.accentBg, borderRadius: 4, border: '1px solid ' + C.line } },
                  React.createElement('div', { style: { fontFamily: Mono, fontSize: 10, letterSpacing: '.06em', color: C.accentDm, marginBottom: 4 } }, s.label),
                  React.createElement('div', { style: { fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.5 } }, s.val)
                );
              })
            ),
            React.createElement('div', { style: { fontFamily: Mono, fontSize: 10, letterSpacing: '.06em', color: C.accentDm, marginBottom: 2 } }, 'CAMPAIGN SEASON'),
            React.createElement('div', { style: { fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.5, marginBottom: 16 } }, sc.season),

            // Narrative sections
            [
              { label: 'THE LOGISTICAL CHALLENGE', text: sc.challenge, color: C.red },
              { label: 'THE COMMANDER\'S PLAN', text: sc.commanderPlan, color: C.blue },
              { label: 'WHAT ACTUALLY HAPPENED', text: sc.whatHappened, color: C.gold },
              { label: 'STRUCTURAL REASON FOR OUTCOME', text: sc.structuralReason, color: C.green },
            ].map(function(sec) {
              return React.createElement('div', { key: sec.label, style: { marginBottom: 14 } },
                React.createElement('div', { style: { fontFamily: Mono, fontSize: 10, letterSpacing: '.06em', color: sec.color, marginBottom: 4 } }, sec.label),
                React.createElement('div', { style: { fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75, paddingLeft: 12, borderLeft: '2px solid ' + sec.color + '44' } }, sec.text)
              );
            })
          )
        );
      }),

      // Interactive configurator
      React.createElement('div', { style: {
        marginTop: 24, padding: 20, background: C.card, border: '1px solid ' + C.accent + '33',
        borderRadius: 8,
      }},
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.accent, marginBottom: 4 } },
          'CAMPAIGN CONFIGURATOR'
        ),
        React.createElement('div', { style: { fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.6, marginBottom: 16 } },
          'Adjust four variables to see which historical Crusade your configuration most closely resembles \u2014 and therefore what your likely outcome would be.'
        ),

        // Progress
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 } },
          React.createElement('span', { style: { fontFamily: Mono, fontSize: 11, color: C.tx3 } }, 'CONFIGURED'),
          React.createElement('div', { style: { flex: 1, maxWidth: 140, height: 4, background: C.line, borderRadius: 2 } },
            React.createElement('div', { style: { width: (choiceCount / 4 * 100) + '%', height: '100%', borderRadius: 2, background: choiceCount === 4 ? C.green : C.accent, transition: 'width .3s' } })
          ),
          React.createElement('span', { style: { fontFamily: Mono, fontSize: 11, color: choiceCount === 4 ? C.green : C.accent } }, choiceCount + '/4')
        ),

        // Variable selectors
        SUPPLY_VARIABLES.map(function(sv) {
          return React.createElement('div', { key: sv.id, style: { marginBottom: 14 } },
            React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.accentDm, marginBottom: 6 } }, sv.label.toUpperCase()),
            React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
              sv.options.map(function(opt) {
                var sel = supplyChoices[sv.id] === opt.id;
                return React.createElement('button', {
                  key: opt.id,
                  onClick: function() {
                    setSupplyChoices(function(prev) {
                      var next = {};
                      for (var k in prev) next[k] = prev[k];
                      next[sv.id] = opt.id;
                      return next;
                    });
                  },
                  style: {
                    padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
                    border: '1px solid ' + (sel ? C.accent : C.line),
                    background: sel ? C.accentBg : 'transparent',
                    color: sel ? C.accent : C.tx3,
                    fontFamily: Sans, fontSize: 12, textAlign: 'left',
                    flex: '1 1 auto', minWidth: 140,
                  }
                },
                  React.createElement('div', { style: { fontWeight: 600, marginBottom: 2 } }, opt.label),
                  React.createElement('div', { style: { fontSize: 11, opacity: 0.7 } }, opt.desc)
                );
              })
            )
          );
        }),

        // Result
        supplyResult && React.createElement('div', { style: {
          marginTop: 16, padding: 16, background: supplyResult.campaign.verdictColor + '11',
          border: '1px solid ' + supplyResult.campaign.verdictColor + '33', borderRadius: 6,
        }},
          React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: supplyResult.campaign.verdictColor, marginBottom: 6 } },
            'YOUR CONFIGURATION RESEMBLES: ' + supplyResult.campaign.name.toUpperCase()
          ),
          React.createElement('div', { style: { fontFamily: Mono, fontSize: 12, color: supplyResult.campaign.verdictColor, marginBottom: 10 } },
            'PREDICTED OUTCOME: ' + supplyResult.campaign.verdict
          ),
          React.createElement('div', { style: { fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75 } },
            supplyResult.note
          )
        )
      )
    );
  }, [supplyExpanded, supplyChoices, supplyResult]);

  // ── Military Balance Renderer ──────────────────────────────────────
  var renderBalance = useCallback(function() {
    // Radar chart dimensions
    var cx = 150, cy = 150, r = 120;
    var dims = MILITARY_DIMENSIONS;
    var n = dims.length;

    function polarX(idx, val) { var angle = (Math.PI * 2 * idx / n) - Math.PI / 2; return cx + r * (val / 100) * Math.cos(angle); }
    function polarY(idx, val) { var angle = (Math.PI * 2 * idx / n) - Math.PI / 2; return cy + r * (val / 100) * Math.sin(angle); }

    var crusaderPoints = dims.map(function(d, i) { return polarX(i, d.crusaderScore) + ',' + polarY(i, d.crusaderScore); }).join(' ');
    var muslimPoints = dims.map(function(d, i) { return polarX(i, d.muslimScore) + ',' + polarY(i, d.muslimScore); }).join(' ');

    var selectedDim = balanceDimension ? dims.find(function(d) { return d.id === balanceDimension; }) : null;

    return React.createElement('div', null,
      React.createElement('div', { style: { fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.accentDm, marginBottom: 6 } },
        'MILITARY BALANCE COMPARATOR'
      ),
      React.createElement(ManuscriptDivider, { color: C.accentDm }),
      React.createElement('div', { style: { fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.75, marginBottom: 20, maxWidth: 720 } },
        React.createElement(DropCap, null, 'The military balance between Crusader and Muslim forces was not a simple equation. Each side held decisive advantages in specific domains. This comparator maps those advantages across six dimensions and reveals why the Crusader states survived for 200 years \u2014 and why they ultimately fell.')
      ),

      // Radar chart + legend
      React.createElement('div', { style: { display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 } },
        // SVG radar
        React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 16 } },
          React.createElement('svg', { viewBox: '0 0 300 300', style: { width: 300, display: 'block' } },
            // Grid rings
            [20, 40, 60, 80, 100].map(function(pct) {
              var pts = [];
              for (var i = 0; i < n; i++) pts.push(polarX(i, pct) + ',' + polarY(i, pct));
              return React.createElement('polygon', { key: pct, points: pts.join(' '), fill: 'none', stroke: C.line, strokeWidth: 0.5 });
            }),
            // Axis lines
            dims.map(function(d, i) {
              return React.createElement('line', { key: d.id, x1: cx, y1: cy, x2: polarX(i, 100), y2: polarY(i, 100), stroke: C.line, strokeWidth: 0.5 });
            }),
            // Crusader polygon
            React.createElement('polygon', { points: crusaderPoints, fill: C.cross + '22', stroke: C.cross, strokeWidth: 1.5 }),
            // Muslim polygon
            React.createElement('polygon', { points: muslimPoints, fill: C.crescent + '22', stroke: C.crescent, strokeWidth: 1.5 }),
            // Labels + clickable dots
            dims.map(function(d, i) {
              var lx = polarX(i, 115);
              var ly = polarY(i, 115);
              var isActive = balanceDimension === d.id;
              return React.createElement('g', { key: d.id, style: { cursor: 'pointer' }, onClick: function() { setBalanceDimension(isActive ? null : d.id); } },
                React.createElement('circle', { cx: polarX(i, d.crusaderScore), cy: polarY(i, d.crusaderScore), r: isActive ? 5 : 3, fill: C.cross }),
                React.createElement('circle', { cx: polarX(i, d.muslimScore), cy: polarY(i, d.muslimScore), r: isActive ? 5 : 3, fill: C.crescent }),
                React.createElement('text', {
                  x: lx, y: ly, textAnchor: 'middle', dominantBaseline: 'middle',
                  fill: isActive ? C.accent : C.tx3, fontSize: 8, fontFamily: Mono,
                  fontWeight: isActive ? 700 : 400,
                }, d.label)
              );
            })
          )
        ),

        // Legend
        React.createElement('div', { style: { flex: 1, minWidth: 220 } },
          React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.tx3, marginBottom: 10 } }, 'LEGEND'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
            React.createElement('div', { style: { width: 14, height: 14, background: C.cross + '44', border: '2px solid ' + C.cross, borderRadius: 2 } }),
            React.createElement('span', { style: { fontFamily: Mono, fontSize: 12, color: C.cross } }, 'Crusader Forces')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 } },
            React.createElement('div', { style: { width: 14, height: 14, background: C.crescent + '44', border: '2px solid ' + C.crescent, borderRadius: 2 } }),
            React.createElement('span', { style: { fontFamily: Mono, fontSize: 12, color: C.crescent } }, 'Muslim Forces')
          ),
          React.createElement('div', { style: { fontFamily: Sans, fontSize: 12, color: C.tx3, lineHeight: 1.6, marginBottom: 12 } },
            'Click any dimension on the radar chart to see detailed analysis with battle examples.'
          ),
          // Dimension list
          dims.map(function(d) {
            var isActive = balanceDimension === d.id;
            return React.createElement('button', {
              key: d.id,
              onClick: function() { setBalanceDimension(isActive ? null : d.id); },
              style: {
                display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left',
                padding: '6px 10px', marginBottom: 4, borderRadius: 4, cursor: 'pointer',
                border: '1px solid ' + (isActive ? C.accent : 'transparent'),
                background: isActive ? C.accentBg : 'transparent',
              }
            },
              React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: d.advantage.indexOf('Crusader') >= 0 ? C.cross : d.advantage.indexOf('Muslim') >= 0 ? C.crescent : C.gold } }),
              React.createElement('span', { style: { fontFamily: Mono, fontSize: 11, color: isActive ? C.accent : C.tx2, flex: 1 } }, d.label),
              React.createElement('span', { style: { fontFamily: Mono, fontSize: 10, color: C.tx3 } }, d.advantage)
            );
          })
        )
      ),

      // Selected dimension detail
      selectedDim && React.createElement('div', { style: {
        background: C.card, border: '1px solid ' + C.accentDm, borderRadius: 8, padding: 20, marginBottom: 20,
      }},
        React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 } },
          React.createElement('span', { style: { fontFamily: Serif, fontSize: 20, fontWeight: 600, color: C.tx } }, selectedDim.label),
          React.createElement('span', { style: { fontFamily: Mono, fontSize: 11, color: selectedDim.advantage.indexOf('Crusader') >= 0 ? C.cross : selectedDim.advantage.indexOf('Muslim') >= 0 ? C.crescent : C.gold } },
            'Advantage: ' + selectedDim.advantage
          )
        ),
        // Score bars
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: Mono, fontSize: 10, color: C.cross, marginBottom: 4 } }, '\u271A CRUSADER: ' + selectedDim.crusaderScore + '/100'),
            React.createElement('div', { style: { height: 6, background: C.line, borderRadius: 3 } },
              React.createElement('div', { style: { width: selectedDim.crusaderScore + '%', height: '100%', borderRadius: 3, background: C.cross, transition: 'width .3s' } })
            )
          ),
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: Mono, fontSize: 10, color: C.crescent, marginBottom: 4 } }, '\u262A MUSLIM: ' + selectedDim.muslimScore + '/100'),
            React.createElement('div', { style: { height: 6, background: C.line, borderRadius: 3 } },
              React.createElement('div', { style: { width: selectedDim.muslimScore + '%', height: '100%', borderRadius: 3, background: C.crescent, transition: 'width .3s' } })
            )
          )
        ),
        React.createElement('div', { style: { fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75, marginBottom: 14 } }, selectedDim.analysis),
        React.createElement('div', { style: { padding: '10px 14px', background: C.accentBg, borderRadius: 4, border: '1px solid ' + C.line } },
          React.createElement('div', { style: { fontFamily: Mono, fontSize: 10, letterSpacing: '.06em', color: C.accentDm, marginBottom: 4 } }, 'BATTLE EXAMPLES'),
          React.createElement('div', { style: { fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6 } }, selectedDim.battles)
        )
      ),

      // Key insight
      React.createElement('div', { style: {
        padding: '16px 20px', background: C.accentBg, border: '1px solid ' + C.accent + '22', borderRadius: 6,
      }},
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.accent, marginBottom: 6 } }, 'KEY INSIGHT: WHY 200 YEARS?'),
        React.createElement('div', { style: { fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75 } }, BALANCE_INSIGHT)
      )
    );
  }, [balanceDimension]);

  // ── Coexistence Renderer ───────────────────────────────────────────
  var renderCoexistence = useCallback(function() {
    var scenario = COEXISTENCE_SCENARIOS[coexScenario];
    var totalVotes = Object.keys(coexVotes).length;

    return React.createElement('div', null,
      React.createElement('div', { style: { fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.accentDm, marginBottom: 6 } },
        'INTERFAITH COEXISTENCE ANALYZER'
      ),
      React.createElement(ManuscriptDivider, { color: C.accentDm }),
      React.createElement('div', { style: { fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.75, marginBottom: 20, maxWidth: 720 } },
        React.createElement(DropCap, null, 'The Crusader states were not merely theaters of war. For nearly 200 years, Christians, Muslims, and Jews lived alongside each other in a complex web of trade, law, language, and material culture. This analyzer examines the structures of daily coexistence and asks the essential question: was the dominant pattern cooperation or conflict?')
      ),

      // Aspect cards
      React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.accentDm, marginBottom: 10 } }, 'FIVE ASPECTS OF DAILY LIFE'),
      COEXISTENCE_ASPECTS.map(function(asp) {
        var isOpen = coexAspect === asp.id;
        return React.createElement('div', { key: asp.id, style: {
          marginBottom: 10, background: C.card, border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
          borderRadius: 6, overflow: 'hidden', transition: 'border-color .15s',
        }},
          React.createElement('button', {
            onClick: function() { setCoexAspect(isOpen ? null : asp.id); },
            style: {
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 18px', cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left',
            }
          },
            React.createElement('span', { style: { fontSize: 18, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.accentBg, borderRadius: 6, border: '1px solid ' + C.line, flexShrink: 0 } }, asp.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: Serif, fontSize: 15, fontWeight: 600, color: C.tx } }, asp.label)
            ),
            React.createElement('span', { style: { fontFamily: Mono, fontSize: 14, color: C.tx3, transition: 'transform .15s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' } }, '\u25B6')
          ),
          isOpen && React.createElement('div', { style: { borderTop: '1px solid ' + C.line, padding: '16px 18px' } },
            React.createElement('div', { style: { fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75, marginBottom: 14 } }, asp.analysis),
            React.createElement('div', { style: { padding: '10px 14px', background: C.blueBg, borderRadius: 4, border: '1px solid ' + C.blueDm + '22' } },
              React.createElement('div', { style: { fontFamily: Mono, fontSize: 10, letterSpacing: '.06em', color: C.blue, marginBottom: 4 } }, 'COMPARATIVE NOTE'),
              React.createElement('div', { style: { fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6 } }, asp.comparison)
            )
          )
        );
      }),

      // Primary source scenarios
      React.createElement('div', { style: { marginTop: 28 } },
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.accentDm, marginBottom: 10 } }, 'PRIMARY SOURCE SCENARIOS'),
        React.createElement('div', { style: { fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.6, marginBottom: 16 } },
          'Three episodes from primary sources. For each, evaluate whether the dominant pattern is cooperation or conflict. The answer reveals why the Crusader states are historically unique.'
        ),

        // Scenario selector
        React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 16 } },
          COEXISTENCE_SCENARIOS.map(function(sc, i) {
            var isSel = coexScenario === i;
            return React.createElement('button', {
              key: sc.id, onClick: function() { setCoexScenario(i); },
              style: {
                flex: 1, padding: '8px 12px', borderRadius: 4, cursor: 'pointer',
                border: '1px solid ' + (isSel ? C.accent : C.line),
                background: isSel ? C.accentBg : 'transparent',
                color: isSel ? C.accent : C.tx3,
                fontFamily: Mono, fontSize: 11, textAlign: 'center',
              }
            }, 'Source ' + (i + 1));
          })
        ),

        // Active scenario
        React.createElement('div', { style: {
          background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 20, position: 'relative',
        }},
          React.createElement(MedievalCardBorder, null),
          React.createElement('div', { style: { fontFamily: Mono, fontSize: 10, letterSpacing: '.06em', color: C.tx3, marginBottom: 4 } }, scenario.source),
          React.createElement('div', { style: { fontFamily: Serif, fontSize: 18, fontWeight: 600, color: C.tx, marginBottom: 12 } }, scenario.title),
          React.createElement('div', { style: { fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75, marginBottom: 16, paddingLeft: 14, borderLeft: '3px solid ' + C.accent + '44' } }, scenario.narrative),

          // Vote buttons
          React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.accentDm, marginBottom: 8 } }, 'YOUR EVALUATION'),
          !coexVotes[scenario.id] ? React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('button', {
              onClick: function() { setCoexVotes(function(prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[scenario.id] = 'cooperation'; return n; }); },
              style: { flex: 1, padding: '10px 14px', borderRadius: 4, cursor: 'pointer', border: '1px solid ' + C.crescent + '44', background: 'transparent', color: C.crescent, fontFamily: Mono, fontSize: 12 }
            }, 'Cooperation'),
            React.createElement('button', {
              onClick: function() { setCoexVotes(function(prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[scenario.id] = 'conflict'; return n; }); },
              style: { flex: 1, padding: '10px 14px', borderRadius: 4, cursor: 'pointer', border: '1px solid ' + C.cross + '44', background: 'transparent', color: C.cross, fontFamily: Mono, fontSize: 12 }
            }, 'Conflict')
          ) : React.createElement('div', null,
            React.createElement('div', { style: {
              fontFamily: Mono, fontSize: 12, marginBottom: 8,
              color: coexVotes[scenario.id] === 'cooperation' ? C.crescent : C.cross,
            }}, 'You evaluated: ' + coexVotes[scenario.id].toUpperCase()),
            React.createElement('div', { style: {
              padding: '12px 16px', background: C.accentBg, borderRadius: 4, border: '1px solid ' + C.line,
            }},
              React.createElement('div', { style: { fontFamily: Mono, fontSize: 10, letterSpacing: '.06em', color: C.accent, marginBottom: 4 } }, 'INTERPRETATION'),
              React.createElement('div', { style: { fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75 } }, scenario.interpretation)
            )
          )
        ),

        // Synthesis (appears after voting on all 3)
        totalVotes >= 3 && React.createElement('div', { style: {
          marginTop: 20, padding: '16px 20px', background: C.accentBg, border: '1px solid ' + C.accent + '22', borderRadius: 6,
        }},
          React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.accent, marginBottom: 6 } }, 'SYNTHESIS: THE ANSWER IS BOTH'),
          React.createElement('div', { style: { fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75 } },
            'The Crusader states were simultaneously zones of coexistence and zones of violence. Trade flourished alongside massacre. Legal pluralism coexisted with systematic discrimination. Physicians shared knowledge while armies burned each other\'s cities. This is not a contradiction \u2014 it is the defining characteristic of frontier societies throughout history. The Crusader states were not unique in experiencing interfaith contact; they were unique in the intensity and duration of that contact, compressed into a narrow coastal strip where cooperation and conflict were not alternatives but coexisting realities. Usama ibn Munqidh\'s memoir captures this perfectly: he records genuine friendships with Templars in the same text where he describes Frankish barbarism. Both were true. The historical error is choosing one narrative over the other. The complexity is the point.'
          )
        )
      )
    );
  }, [coexAspect, coexScenario, coexVotes]);

  // ── Main Render ────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: Sans, position: 'relative', overflow: 'hidden' }} ref={topRef}>
      {/* Cross-hatch background pattern (very low opacity) */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><line x1="0" y1="0" x2="20" y2="20" stroke="rgba(176,132,58,.03)" stroke-width=".3"/><line x1="20" y1="0" x2="0" y2="20" stroke="rgba(176,132,58,.03)" stroke-width=".3"/></svg>') + '")',
        backgroundSize: '20px 20px',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Vellum texture overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="v"><feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#v)" opacity=".02"/></svg>') + '")',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: C.bg + 'f0', backdropFilter: 'blur(12px)',
        borderBottom: 'none', padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer',
        }}>
          {'\u2190'} Back to Coursework
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CrossCrescentDecor />
          <span style={{ fontFamily: Mono, fontSize: 12, color: C.accentDm, letterSpacing: '.08em' }}>
            HIST {'\u2014'} THE CRUSADES
          </span>
          <CrossCrescentDecor />
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Hero section — illuminated manuscript style */}
        <div style={{ marginBottom: 28, position: 'relative' }}>
          {/* Decorative cross/crescent background */}
          <div style={{ position: 'absolute', top: -10, right: 0, opacity: 0.04, pointerEvents: 'none' }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              {/* Large ornamental cross */}
              <line x1="100" y1="10" x2="100" y2="190" stroke={C.cross} strokeWidth="8" />
              <line x1="30" y1="70" x2="170" y2="70" stroke={C.cross} strokeWidth="8" />
              {/* Crescent */}
              <path d="M140 130 Q180 160 140 190" fill="none" stroke={C.crescent} strokeWidth="4" />
              <circle cx="142" cy="128" r="5" fill={C.crescent} />
            </svg>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1 style={{
              fontFamily: Serif, fontSize: 36, fontWeight: 700,
              color: C.tx, letterSpacing: '.02em', marginBottom: 8,
            }}>
              {/* Gold illuminated initial letter */}
              <span style={{
                fontSize: 52, fontWeight: 700, color: C.gold,
                textShadow: '0 0 12px rgba(212,168,80,.2)',
                marginRight: 2,
              }}>C</span>rusade Campaign Analyzer
            </h1>
            <svg width="44" height="44" viewBox="0 0 44 44" style={{opacity:0.2,flexShrink:0,color:C.cross}}>
              <path d="M22 4 L18 16 L4 16 L4 28 L18 28 L22 40 L26 28 L40 28 L40 16 L26 16 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <p style={{
            fontFamily: Serif, fontSize: 15, color: C.tx2,
            lineHeight: 1.75, marginBottom: 4, maxWidth: 720, letterSpacing: '.01em',
          }}>
            <DropCap color={C.accent}>{'Four major Crusades examined through dual Christian and Muslim perspectives. Each campaign reveals the strategic decisions, turning points, and long-term consequences that shaped two centuries of holy war and eight centuries of collective memory. Analyze the strategy. Compare the sources. Trace the legacy.'}</DropCap>
          </p>
          <p style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3,
            lineHeight: 1.65, marginBottom: 12, maxWidth: 720, letterSpacing: '.04em',
          }}>
            Holy Land, Interfaith Conflict, Medieval Geopolitics
          </p>

          {/* Skills tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            {SKILLS.map(tag => (
              <span key={tag} style={{
                fontFamily: Mono, fontSize: 11, padding: '3px 10px', borderRadius: 2,
                background: C.accentBg, color: C.accentDm, letterSpacing: '.04em',
                border: '1px solid ' + C.accent + '12',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>CAMPAIGNS ANALYZED</span>
            <div style={{ flex: 1, maxWidth: 200, height: 4, background: C.line, borderRadius: 2 }}>
              <div style={{
                width: (revealedCount / 4 * 100) + '%',
                height: '100%', borderRadius: 2,
                background: revealedCount === 4 ? C.green : C.accent,
                transition: 'width .3s ease',
              }} />
            </div>
            <span style={{
              fontFamily: Mono, fontSize: 12,
              color: revealedCount === 4 ? C.green : C.accent,
            }}>
              {revealedCount}/4
            </span>
          </div>

          <ManuscriptDivider />
        </div>

        <ModeSwitch />

        {mode === 'campaigns' && renderCampaigns()}
        {mode === 'states' && renderStates()}
        {mode === 'perspectives' && renderPerspectives()}
        {mode === 'legacy' && renderLegacy()}
        {mode === 'quiz' && renderQuiz()}
        {mode === 'supply' && renderSupply()}
        {mode === 'balance' && renderBalance()}
        {mode === 'coexistence' && renderCoexistence()}

        {/* Manuscript divider before provenance */}
        <ManuscriptDivider />

        {/* Provenance Strip */}
        <div style={{
          marginTop: 24, padding: 20,
          display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center',
        }}>
          {PROVENANCE.map(p => (
            <div key={p.label} style={{ textAlign: 'center', flex: '0 0 auto' }}>
              <div style={{
                fontFamily: Mono, fontSize: 12, letterSpacing: 1.5, color: C.tx3,
              }}>
                {p.label}
              </div>
              <div style={{ fontSize: 12, color: C.tx2, marginTop: 2 }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Cross/Crescent footer decoration */}
        <div style={{ textAlign: 'center', marginTop: 16, marginBottom: 8 }}>
          <CrossCrescentDecor />
        </div>

        {/* Back button */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button onClick={() => setView('coursework')} style={{
            padding: '10px 32px', border: '1px solid ' + C.line, borderRadius: 4,
            background: 'transparent', color: C.tx2,
            fontFamily: Mono, fontSize: 13, letterSpacing: 0.5, cursor: 'pointer',
          }}>
            {'\u2190'} Back to Coursework
          </button>
        </div>
      </div>
    </div>
  );
}
