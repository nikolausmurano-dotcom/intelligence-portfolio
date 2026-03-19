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
