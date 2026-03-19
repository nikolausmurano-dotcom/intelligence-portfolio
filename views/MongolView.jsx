// MongolView.jsx — Empire Builder: Strategic Simulation
// The Mongol Empire (HIST)
//
// An interactive strategic simulation where the visitor takes the role
// of a Mongol commander. Five major campaigns reveal how Mongol military
// innovations — composite bow, decimal organization, feigned retreat,
// siege adoption, psychological warfare, and the yam relay system —
// created the largest contiguous land empire in history. Three modes:
// Campaigns (strategic analysis), Innovations (tactical cards),
// and Legacy (Pax Mongolica and lasting impact).


// ── Palette: Campaign Tent — warm dark leather & steppe warfare ────────────
const C = {
  bg: '#0c0806',
  card: 'rgba(22,18,12,.94)',
  cardBd: 'rgba(196,136,58,.16)',
  tx: '#d4cbb8',
  tx2: '#aea494',
  tx3: '#837b6b',
  amber: '#c4883a',
  amberDm: '#a06e28',
  amberBg: 'rgba(196,136,58,.08)',
  gold: '#d4a850',
  goldDm: '#b08830',
  red: '#a84030',
  redDm: '#802818',
  redBg: 'rgba(168,64,48,.07)',
  green: '#5a9050',
  greenDm: '#407038',
  greenBg: 'rgba(90,144,80,.07)',
  blue: '#4878a0',
  blueDm: '#385888',
  blueBg: 'rgba(72,120,160,.07)',
  line: 'rgba(196,136,58,.12)',
  leather: '#1a1410',
  ropeBrown: '#8a6a3a',
};
const Mono = "'IBM Plex Mono',monospace";
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans = "'Inter',Helvetica,sans-serif";

// ── Decorative SVG Components (Campaign Tent Theme) ──────────────

// Braided rope divider for section headers
function RopeHr({ color, style: extraStyle }) {
  var c = color || C.ropeBrown;
  return (
    <svg width="100%" height="10" viewBox="0 0 600 10" preserveAspectRatio="xMidYMid meet"
      style={Object.assign({ display: 'block', opacity: 0.4, margin: '8px 0' }, extraStyle || {})}>
      <path d="M0 5 Q10 0 20 5 Q30 10 40 5 Q50 0 60 5 Q70 10 80 5 Q90 0 100 5 Q110 10 120 5 Q130 0 140 5 Q150 10 160 5 Q170 0 180 5 Q190 10 200 5 Q210 0 220 5 Q230 10 240 5 Q250 0 260 5 Q270 10 280 5 Q290 0 300 5 Q310 10 320 5 Q330 0 340 5 Q350 10 360 5 Q370 0 380 5 Q390 10 400 5 Q410 0 420 5 Q430 10 440 5 Q450 0 460 5 Q470 10 480 5 Q490 0 500 5 Q510 10 520 5 Q530 0 540 5 Q550 10 560 5 Q570 0 580 5 Q590 10 600 5"
        fill="none" stroke={c} strokeWidth="1.2" />
      <path d="M0 5 Q10 10 20 5 Q30 0 40 5 Q50 10 60 5 Q70 0 80 5 Q90 10 100 5 Q110 0 120 5 Q130 10 140 5 Q150 0 160 5 Q170 10 180 5 Q190 0 200 5 Q210 10 220 5 Q230 0 240 5 Q250 10 260 5 Q270 0 280 5 Q290 10 300 5 Q310 0 320 5 Q330 10 340 5 Q350 0 360 5 Q370 10 380 5 Q390 0 400 5 Q410 10 420 5 Q430 0 440 5 Q450 10 460 5 Q470 0 480 5 Q490 10 500 5 Q510 0 520 5 Q530 10 540 5 Q550 0 560 5 Q570 10 580 5 Q590 0 600 5"
        fill="none" stroke={c} strokeWidth="0.7" strokeOpacity=".5" />
    </svg>
  );
}

// Steppe landscape silhouette background
function SteppeSkyline() {
  return (
    <svg viewBox="0 0 960 140" preserveAspectRatio="xMidYMax slice"
      style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 140, opacity: 0.035, pointerEvents: 'none' }}>
      {/* Mountains */}
      <path d="M0 140 L60 80 L100 100 L160 50 L200 90 L260 40 L310 75 L340 55 L380 85 L420 30 L460 70 L500 45 L540 80 L580 60 L620 90 L660 35 L700 70 L740 55 L780 85 L820 50 L860 75 L900 60 L940 90 L960 70 L960 140 Z"
        fill={C.amber} />
      {/* Grassland horizon */}
      <path d="M0 140 L0 120 Q40 115 80 118 Q120 121 160 116 Q200 112 240 117 Q280 122 320 118 Q360 114 400 119 Q440 124 480 118 Q520 112 560 117 Q600 122 640 118 Q680 114 720 119 Q760 124 800 118 Q840 112 880 117 Q920 122 960 118 L960 140 Z"
        fill={C.amber} opacity=".6" />
    </svg>
  );
}

// Arrow/bow decorative element between sections
function ArrowDivider() {
  return (
    <div style={{ textAlign: 'center', margin: '24px 0 20px', overflow: 'hidden' }}>
      <svg width="200" height="16" viewBox="0 0 200 16" style={{ opacity: 0.25 }}>
        <line x1="0" y1="8" x2="70" y2="8" stroke={C.amber} strokeWidth=".6" />
        {/* Bow shape */}
        <path d="M80 8 Q90 2 100 8 Q90 14 80 8Z" fill="none" stroke={C.amber} strokeWidth=".7" />
        {/* Arrow through bow */}
        <line x1="75" y1="8" x2="135" y2="8" stroke={C.amber} strokeWidth=".8" />
        {/* Arrowhead */}
        <path d="M130 5 L138 8 L130 11" fill={C.amber} fillOpacity=".4" stroke={C.amber} strokeWidth=".5" />
        {/* Fletching */}
        <path d="M78 6 L72 4 M78 10 L72 12" stroke={C.amber} strokeWidth=".4" />
        <line x1="145" y1="8" x2="200" y2="8" stroke={C.amber} strokeWidth=".6" />
      </svg>
    </div>
  );
}

// Rough hand-drawn card border style
var roughCardStyle = {
  background: C.card,
  border: 'none',
  borderRadius: 4,
  position: 'relative',
  overflow: 'visible',
};

// SVG rough border overlay for cards
function RoughBorder({ borderColor }) {
  var bc = borderColor || C.cardBd;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none"
      style={{ position: 'absolute', top: -1, left: -1, right: -1, bottom: -1, width: 'calc(100% + 2px)', height: 'calc(100% + 2px)', pointerEvents: 'none', overflow: 'visible' }}>
      <path d="M4 2 Q2 2 2 4 L2 296 Q2 298 4 298 L396 298 Q398 298 398 296 L398 4 Q398 2 396 2 Z"
        fill="none" stroke={bc} strokeWidth="1.2"
        strokeDasharray="none"
        style={{ filter: 'url(#roughen)' }} />
      <defs>
        <filter id="roughen">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

// ── Campaign Routes Data (SVG mode) ──────────────────────────────────
const MONGOL_CAMPAIGNS = [
  { id: 'khwarezmia', label: 'Khwarezmia (1219-1221)', path: 'M 400,200 Q 350,180 300,160 Q 250,140 200,150', color: '#c44030', army: '150,000-200,000', distance: '3,200 km', duration: '2 years', detail: 'Shah Muhammad executed envoys. Genghis responded with total war. Cities that surrendered were spared. Cities that resisted were destroyed. Samarkand fell in 5 days.' },
  { id: 'jin', label: 'Jin Dynasty (1211-1234)', path: 'M 500,180 Q 520,200 540,220 Q 560,240 580,260', color: '#cc8830', army: '100,000+', distance: '1,800 km', duration: '23 years', detail: 'The longest Mongol campaign. Jin had 600,000 troops and fortified cities. Mongols adapted: adopted siege engines, Chinese engineers, and starvation tactics.' },
  { id: 'europe', label: 'Europe (1241)', path: 'M 400,200 Q 350,170 280,130 Q 220,110 160,100', color: '#4080c0', army: '130,000', distance: '4,500 km', duration: '1 year', detail: 'Subutai defeated Hungary and Poland in a single month. Europe was saved not by resistance but by Ogedei Khan\'s death \— the army withdrew to elect a new khan.' },
  { id: 'song', label: 'Song Dynasty (1268-1279)', path: 'M 500,200 Q 530,230 550,270 Q 560,300 570,330', color: '#50a050', army: '200,000+', distance: '2,400 km', duration: '11 years', detail: 'Kublai Khan\'s conquest. Required naval warfare \— the Mongols built a fleet. The Song had the world\'s most advanced economy. Conquest took a generation.' },
  { id: 'mideast', label: 'Middle East (1258)', path: 'M 400,200 Q 360,210 320,230 Q 280,250 240,260', color: '#a050a0', army: '120,000', distance: '2,800 km', duration: '3 years', detail: 'Hulagu destroyed Baghdad, ending the Abbasid Caliphate. An estimated 200,000-2,000,000 killed. The House of Wisdom\'s library thrown into the Tigris. Stopped at Ain Jalut by the Mamluks.' },
];
const SPEED_COMPARISON = [
  { label: 'Mongol cavalry', kmday: 120, color: '#c4883a' },
  { label: 'Roman legion', kmday: 30, color: '#607090' },
  { label: 'Medieval European', kmday: 20, color: '#506050' },
  { label: 'Crusader army', kmday: 15, color: '#905040' },
];

// ── Skills ──────────────────────────────────────────────────────────
const SKILLS = [
  'Steppe Warfare Doctrine',
  'Siege Technology Adoption',
  'Decimal Military Organization',
  'Psychological Operations',
  'Intelligence & Relay Networks',
  'Nomadic Logistics',
  'Cross-Cultural Administration',
  'Pax Mongolica & Silk Road',
];

// ── Provenance ──────────────────────────────────────────────────────
const PROVENANCE = [
  { label: 'Weatherford (2004)', desc: 'Genghis Khan and the Making of the Modern World' },
  { label: 'Ratchnevsky (1991)', desc: 'Genghis Khan: His Life and Legacy' },
  { label: 'May (2012)', desc: 'The Mongol Conquests in World History' },
  { label: 'Secret History', desc: 'The Secret History of the Mongols (c. 1240)' },
];

// ── Campaign Data ───────────────────────────────────────────────────
const CAMPAIGNS = [
  {
    id: 'khwarezmia',
    name: 'Khwarezmian Empire',
    year: '1219\u20131221',
    region: 'Central Asia & Persia',
    terrain: 'Deserts, fortified cities, mountain passes',
    enemyStrength: '~400,000 soldiers across dispersed garrisons',
    mongolForce: '~150,000\u2013200,000 in coordinated columns',
    strategicProblem:
      'The Khwarezmian Shah Muhammad II commanded a numerically superior force spread across a vast empire with heavily fortified cities. His strategy was defensive — holding garrisons at Bukhara, Samarkand, Otrar, and Urgench. The terrain mixed open steppe (favoring Mongols) with irrigated urban centers (favoring defenders). A conventional campaign of sequential sieges would take decades and bleed Mongol forces dry.',
    mongolSolution:
      'Genghis Khan executed a multi-axis invasion that remains studied in military academies today. He split his army into four columns advancing simultaneously from different directions, making it impossible for Shah Muhammad to determine the main thrust. Jebe and Subotai led a diversionary force around the Caspian Sea — a 1,600-mile flanking movement. The main force under Genghis crossed the Kyzylkum Desert (thought impassable for armies) to appear behind Bukhara, bypassing the frontier defenses entirely. Each city fell in isolation, unable to reinforce its neighbors. The Shah fled and died on an island in the Caspian.',
    keyInnovation: 'Multi-axis deep penetration — strategic paralysis through simultaneous independent operations that overwhelm the enemy\'s decision cycle',
    outcome: 'Complete destruction of the Khwarezmian Empire in ~2 years. Established Mongol control over Central Asia and opened the route to Persia.',
    quote: '"With Heaven\'s aid I have conquered for you a huge empire. But my life was too short to achieve the conquest of the world."',
    quoteSource: 'Attributed to Genghis Khan, addressing his sons (Ratchnevsky)',
  },
  {
    id: 'jin',
    name: 'Jin Dynasty',
    year: '1211\u20131234',
    region: 'Northern China',
    terrain: 'Great Wall fortifications, river networks, dense urban centers',
    enemyStrength: '~600,000+ soldiers, fortified behind the Great Wall',
    mongolForce: '~65,000\u201395,000 (early campaigns), growing with defectors',
    strategicProblem:
      'The Jurchen Jin Dynasty fielded one of the largest standing armies in the world, protected by the Great Wall system and a network of fortified cities. The Jin had centuries of experience defending against steppe raiders. Their heavy cavalry and crossbow-equipped infantry were designed specifically to counter nomadic horse archers. The terrain of northern China — rivers, mountains, walled cities — neutralized Mongol mobility advantages.',
    mongolSolution:
      'The Mongols adapted rather than brute-forcing. First, Genghis exploited Khitan and Chinese defectors who knew Jin weak points and provided siege engineering knowledge. The Mongols breached the Great Wall at multiple points through bribed gatekeepers and Khitan guides. They adopted Chinese siege technology — trebuchets, gunpowder bombs, and mining operations — integrating captured engineers into their army. When the Jin abandoned Zhongdu (Beijing) for Kaifeng, the Mongols methodically reduced the northern territory, turning Jin vassals into Mongol collaborators. The final campaign under Ogedei used combined Mongol-Chinese-Khitan forces.',
    keyInnovation: 'Technology absorption and military integration — incorporating conquered engineers, defectors, and local specialists into a unified force',
    outcome: 'Destruction of the Jin Dynasty. Mongol control of northern China. Acquisition of siege technology that enabled all subsequent campaigns.',
    quote: '"The greatest happiness is to vanquish your enemies, to chase them before you, to rob them of their wealth."',
    quoteSource: 'Attributed to Genghis Khan (Ratchnevsky)',
  },
  {
    id: 'song',
    name: 'Song Dynasty',
    year: '1268\u20131279',
    region: 'Southern China',
    terrain: 'Subtropical rivers, rice paddies, naval strongholds',
    enemyStrength: '~1,000,000+ soldiers, strongest navy in the world',
    mongolForce: '~200,000 combined land and naval forces under Kublai Khan',
    strategicProblem:
      'The Southern Song Dynasty was the wealthiest state on Earth, protected by the Yangtze River and a powerful navy the Mongols could not match. Previous steppe conquerors had never crossed the Yangtze successfully. The Song had gunpowder weapons, paddle-wheel warships, and a vast network of waterways that rendered cavalry charges meaningless. Frontal assault across the river would be suicidal.',
    mongolSolution:
      'Kublai Khan conducted a 5-year siege of the twin fortress cities Xiangyang and Fancheng (1268\u20131273), which controlled the middle Yangtze crossing. He employed Muslim engineers from Persia who built massive counterweight trebuchets (Hui-hui pao) that outranged Song defenses. He built a river navy from scratch using Chinese and Korean shipwrights. After the twin fortresses fell, Mongol forces advanced along the waterways rather than overland, adopting the very naval warfare that had been the Song\'s advantage. Bayan\'s campaign down the Yangtze was a masterpiece of combined arms — cavalry, infantry, and naval forces coordinated across hundreds of miles.',
    keyInnovation: 'Cross-domain adaptation — building a navy from nothing, integrating Persian siege engineers with Chinese naval expertise to overcome a fundamentally different military environment',
    outcome: 'Fall of the Song Dynasty. Unification of all China under Mongol (Yuan) rule. The largest economy in the world absorbed into the Mongol Empire.',
    quote: '"In the space of seven years you have conquered all of southern China. Since the beginning of the world, no one has known such accomplishment."',
    quoteSource: 'Kublai Khan commending Bayan (May)',
  },
  {
    id: 'europe',
    name: 'Eastern Europe',
    year: '1241\u20131242',
    region: 'Poland, Hungary, the Balkans',
    terrain: 'Forests, rivers, feudal castle networks',
    enemyStrength: '~80,000 across divided feudal kingdoms',
    mongolForce: '~30,000\u201340,000 under Batu and Subotai',
    strategicProblem:
      'European heavy cavalry — armored knights charging in formation — was the dominant military technology of the era. European kingdoms, though politically divided, could field large feudal levies behind castle fortifications. The terrain of Central Europe (forests, hills, river crossings) was unfavorable for steppe cavalry tactics. Hungarian King Bela IV had fortified the Carpathian passes and assembled a coalition army at Pest.',
    mongolSolution:
      'Subotai, perhaps the greatest general of the medieval world, executed a stunning two-front campaign. He split the Mongol force: one column invaded Poland under Baidar and Kadan to pin down the northern European response, while the main force under Batu invaded Hungary. On April 9, 1241, the northern force destroyed the combined Polish-German army at Legnica. Two days later, on April 11, the main force annihilated King Bela\'s Hungarian army at Mohi — the two battles coordinated across 300 miles of enemy territory without radio or telegraph. At Mohi, Subotai executed a classic feigned retreat, lured the Hungarian cavalry into a crossfire, then left a deliberate gap in the encirclement (the "golden bridge") so fleeing troops would spread panic rather than fight to the death.',
    keyInnovation: 'Operational-level coordination across multiple theaters, feigned retreat as doctrine, and the "golden bridge" concept — leaving a controlled escape route to prevent desperate resistance',
    outcome: 'Destruction of Polish and Hungarian field armies. Europe lay open to conquest. The Mongols withdrew only because Great Khan Ogedei died and Batu returned for the succession.',
    quote: '"The Tatars fight as if joyous. They retreat and return so fast you think they are flying."',
    quoteSource: 'Friar Julian, Hungarian reconnaissance report to the Pope (1238)',
  },
  {
    id: 'middleeast',
    name: 'Middle East',
    year: '1258\u20131260',
    region: 'Mesopotamia, the Abbasid Caliphate',
    terrain: 'Desert, irrigated river valleys, fortified cities',
    enemyStrength: '~50,000 Abbasid defenders + political fragmentation',
    mongolForce: '~150,000 under Hulagu Khan (multi-ethnic force)',
    strategicProblem:
      'Baghdad was the jewel of the Islamic world — a city of perhaps 1\u20132 million people, the seat of the Abbasid Caliphate for 500 years, protected by massive walls and an irrigation network that could be used to flood approaches. The Caliph Al-Musta\'sim believed the city was impregnable and that the Islamic world would rally to his defense. His advisors assured him the Mongols would not dare attack the Commander of the Faithful.',
    mongolSolution:
      'Hulagu assembled the most diverse army in Mongol history — Mongol cavalry, Chinese siege engineers, Persian administrators, Georgian Christian auxiliaries, and Turkic allied contingents. He advanced on multiple axes (now a standard Mongol approach). When the Caliph sent his cavalry outside the walls, Hulagu broke the river dykes and flooded the ground behind them, trapping the Abbasid army in mud. The siege lasted only 12 days. The Mongols then systematically destroyed Baghdad\'s irrigation infrastructure — canals that had sustained civilization for millennia — ending Mesopotamia\'s role as an agricultural superpower. The Caliph was executed (reportedly rolled in a carpet and trampled by horses, avoiding the spilling of royal blood on the ground).',
    keyInnovation: 'Environmental warfare — weaponizing the enemy\'s own infrastructure (irrigation systems, river dykes) and systematic destruction of agricultural capacity to ensure permanent subjugation',
    outcome: 'Fall of the Abbasid Caliphate after 500 years. End of Baghdad as the center of the Islamic world. Permanent destruction of Mesopotamian irrigation systems that had sustained civilization since Sumerian times.',
    quote: '"He who defied our command — let his city be an example."',
    quoteSource: 'Hulagu Khan to his generals before the siege (Weatherford)',
  },
];

// ── Innovation Data ─────────────────────────────────────────────────
const INNOVATIONS = [
  {
    id: 'decimal',
    name: 'Decimal Organization',
    icon: '\u2694',
    category: 'COMMAND STRUCTURE',
    summary: 'The Mongol army was organized in base-10 units: arban (10), jagun (100), mingghan (1,000), and tumen (10,000). This created a modular, scalable command hierarchy that could be rapidly combined or dispersed.',
    details: [
      'Units were composed across tribal lines, deliberately breaking clan loyalties and building loyalty to the Khan instead.',
      'Any commander from arban to tumen level could operate independently with a balanced combined-arms force.',
      'Promotions were meritocratic — a herder\'s son could command a tumen if he proved capable.',
      'The system allowed Genghis to maintain unified command over armies spread across thousands of miles.',
    ],
    historicalImpact: 'This structure was revolutionary. European feudal armies were organized by personal loyalty to lords. The Mongol decimal system created the first professional meritocratic army since Rome — and arguably surpassed Roman organization in flexibility.',
  },
  {
    id: 'feigned_retreat',
    name: 'Feigned Retreat',
    icon: '\u21A9',
    category: 'BATTLEFIELD TACTIC',
    summary: 'The Mongols elevated the feigned retreat from a simple trick into a systematic operational doctrine. Units would simulate panic and flee, drawing enemy cavalry into pursuit over kilometers, then turn and annihilate the disordered pursuers.',
    details: [
      'Retreats were practiced and coordinated — requiring extraordinary discipline, not chaos.',
      'The pursuing enemy would become strung out, separated from infantry support and reserves.',
      'Flanking units would close behind the pursuers, creating a double envelopment.',
      'The tactic exploited European heavy cavalry doctrine, which prized the aggressive charge above all else.',
    ],
    historicalImpact: 'At Mohi (1241), Subotai used this tactic to destroy the Hungarian army. At the Kalka River (1223), it annihilated the combined Russian-Cuman force. European armies never developed an effective counter during the Mongol campaigns.',
  },
  {
    id: 'siege',
    name: 'Adopted Siege Warfare',
    icon: '\u26F0',
    category: 'TECHNOLOGY INTEGRATION',
    summary: 'Steppe nomads traditionally could not take walled cities. The Mongols solved this by absorbing siege engineers from every civilization they conquered — Chinese, Persian, Arab, and European specialists all served in Mongol siege trains.',
    details: [
      'Chinese engineers provided trebuchets, gunpowder bombs, and mining techniques.',
      'Persian engineers built the massive counterweight trebuchets that broke Xiangyang.',
      'Captured populations were sometimes driven ahead of the army as labor or human shields during sieges.',
      'By 1258, the Mongol siege capability matched or exceeded any contemporary civilization.',
    ],
    historicalImpact: 'This technology absorption is perhaps the Mongols\' most underappreciated innovation. No other nomadic empire successfully integrated sedentary siege technology at this scale. It transformed the Mongols from raiders into conquerors.',
  },
  {
    id: 'yam',
    name: 'Yam Relay System',
    icon: '\u2709',
    category: 'INTELLIGENCE & LOGISTICS',
    summary: 'The yam was a network of relay stations spaced ~25 miles apart across the entire empire. Fresh horses, supplies, and riders at each station allowed messages to travel 200+ miles per day — faster than any communication system until the telegraph.',
    details: [
      'Riders carried a gerege (passport tablet) granting authority to commandeer horses and supplies.',
      'The system doubled as an intelligence network — station keepers reported on local conditions, troop movements, and dissent.',
      'Diplomatic envoys, merchants, and officials could traverse the empire under yam protection.',
      'Marco Polo described 10,000 relay stations with 200,000 horses in the Yuan Dynasty alone.',
    ],
    historicalImpact: 'The yam enabled centralized control over the largest contiguous land empire in history. Without it, the empire would have fragmented immediately. It also facilitated the Pax Mongolica trade networks that connected East and West.',
  },
  {
    id: 'psywar',
    name: 'Psychological Warfare',
    icon: '\u2620',
    category: 'INFORMATION OPERATIONS',
    summary: 'The Mongols deliberately cultivated a reputation for terrifying brutality — then leveraged that reputation to force surrenders without fighting. Cities that resisted were destroyed; cities that surrendered were spared. The calculus was simple and widely publicized.',
    details: [
      'Merchants and refugees were deliberately allowed to flee ahead of the army, spreading terror narratives.',
      'The destruction of cities like Merv, Nishapur, and Baghdad served as strategic messaging to future targets.',
      'Mongol agents would infiltrate cities before sieges, spreading panic and encouraging surrender.',
      'The reputation saved Mongol lives — many cities surrendered without a fight after hearing what happened to resisters.',
    ],
    historicalImpact: 'This was arguably the first systematic use of information operations in military history. The Mongols understood that reputation was a force multiplier. The terror was not random cruelty — it was calculated policy designed to minimize Mongol casualties.',
  },
  {
    id: 'composite_bow',
    name: 'Composite Bow',
    icon: '\u27B3',
    category: 'WEAPONS TECHNOLOGY',
    summary: 'The Mongol composite bow — laminated horn, wood, and sinew — could deliver aimed shots at 250+ meters and penetrate armor at close range. Used from horseback at full gallop, it gave every Mongol warrior the firepower of a mounted machine gun by medieval standards.',
    details: [
      'Each warrior carried 2\u20133 bows and 60\u201390 arrows of various types (armor-piercing, incendiary, whistling for signaling).',
      'Training began at age 3. By adulthood, Mongol warriors could fire accurately while riding at full speed.',
      'The composite bow had a draw weight of ~75 kg (166 lbs), exceeding the English longbow while being half the size.',
      'Rate of fire was 6\u201310 aimed shots per minute from horseback — devastating against slow-moving infantry formations.',
    ],
    historicalImpact: 'The composite bow was not a Mongol invention, but no other civilization integrated it so completely into a military system. Combined with the Mongol horse (which required no supply train, as warriors carried dried meat and milk), it created a self-sustaining weapons platform with strategic range.',
  },
];

// ── Legacy Data ─────────────────────────────────────────────────────
const LEGACY_ITEMS = [
  {
    id: 'pax',
    name: 'Pax Mongolica',
    period: 'c. 1250\u20131350',
    icon: '\u2696',
    description: 'For roughly a century, the Mongol Empire enforced peace across the entire Eurasian trade corridor. The Silk Road, previously fragmented among dozens of competing states and bandit zones, operated under a single political authority for the first and only time in history.',
    effects: [
      'Trade volume between East and West increased by an estimated factor of 10.',
      'Chinese technologies (printing, gunpowder, compass) accelerated westward. Islamic mathematics and astronomy moved eastward.',
      'The Mongol imperial postal system (yam) guaranteed safe passage for merchants carrying a gerege.',
      'Standardized weights, measures, and trade regulations across the empire reduced transaction costs.',
    ],
    significance: 'The Pax Mongolica was arguably the first true globalization event. It connected civilizations that had been largely isolated and set the stage for the early modern world system.',
  },
  {
    id: 'plague',
    name: 'Black Death Transmission',
    period: '1346\u20131353',
    icon: '\u2623',
    description: 'The same trade routes that carried silk and spices also carried Yersinia pestis. The Mongol-maintained Silk Road became a superhighway for plague transmission, enabling the Black Death to travel from Central Asian rodent reservoirs to the ports of the Black Sea and thence to Europe.',
    effects: [
      'The siege of Caffa (1346): Mongol forces reportedly catapulted plague-infected corpses over the walls — one of the first recorded instances of biological warfare.',
      'Genoese merchants fleeing Caffa carried the plague to Constantinople, Sicily, and Marseille.',
      'Europe lost 30\u201360% of its population. The resulting labor shortage ended serfdom and reshaped social structures.',
      'The Islamic world suffered comparable devastation, with major impacts on Mamluk Egypt and the Levant.',
    ],
    significance: 'The Black Death was a direct consequence of the connectivity the Mongol Empire created. It demonstrates that networks of exchange are also networks of contagion — a lesson that resonates through COVID-19.',
  },
  {
    id: 'tolerance',
    name: 'Religious Tolerance',
    period: 'Mongol Empire era',
    icon: '\u2638',
    description: 'The Mongol Empire practiced a remarkable degree of religious tolerance, unusual for any medieval state. Genghis Khan\'s law code (the Yasa) mandated freedom of worship, and the Mongol court hosted debates between Buddhist, Christian, Muslim, and Taoist scholars.',
    effects: [
      'The Yasa exempted all religious institutions from taxation, regardless of faith.',
      'Mongol rulers patronized multiple religions simultaneously — Kublai Khan employed Tibetan Buddhist advisors, Nestorian Christian secretaries, and Muslim administrators.',
      'The early Mongol khans viewed religion pragmatically: they wanted the prayers of every faith as insurance.',
      'This tolerance facilitated the movement of missionaries, scholars, and ideas across the empire.',
    ],
    significance: 'Mongol tolerance was strategic, not idealistic. A multi-ethnic empire spanning Buddhists, Muslims, Christians, Taoists, and Shamanists could not function through religious coercion. The tolerance was a feature of imperial administration, not personal conviction.',
  },
  {
    id: 'meritocracy',
    name: 'Administrative Meritocracy',
    period: 'Mongol Empire era',
    icon: '\u2605',
    description: 'The Mongol Empire promoted talent over birth to a degree unprecedented in the medieval world. Genghis Khan\'s own rise from an abandoned, enslaved youth to world conqueror informed a system where ability mattered more than aristocratic lineage.',
    effects: [
      'Commanders were promoted based on demonstrated ability, not tribal rank or noble birth.',
      'Conquered peoples could rise to high positions — Mahmud Yalavach (Muslim merchant) administered Central Asia, and Yelu Chucai (Khitan scholar) reformed Chinese imperial administration.',
      'The Mongol legal code (Yasa) applied equally to nobles and commoners, including the Khan\'s own family.',
      'Census-taking and tax standardization replaced arbitrary tribute, creating more predictable governance.',
    ],
    significance: 'The Mongol meritocratic impulse, while imperfect, influenced successor states across Eurasia. The Yuan Dynasty\'s civil service reforms and the Mughal Empire\'s mansabdari system both drew on Mongol administrative precedents.',
  },
  {
    id: 'trade',
    name: 'Silk Road Protection',
    period: 'c. 1220\u20131350',
    icon: '\u26F5',
    description: 'The Mongol Empire did not merely tolerate Silk Road trade — it actively protected, regulated, and invested in it. Mongol policy explicitly favored merchants, who served as intelligence sources, diplomatic intermediaries, and economic connectors.',
    effects: [
      'The ortaq (merchant-partner) system provided state capital to merchants in exchange for a share of profits — essentially a sovereign wealth fund.',
      'Mongol law imposed the death penalty for banditry along trade routes.',
      'Caravanserais (rest stations) were maintained at government expense throughout the empire.',
      'The Mongols introduced paper currency (chao) to facilitate long-distance trade, backed initially by silver reserves.',
    ],
    significance: 'Mongol trade policy was not mere facilitation — it was active economic statecraft. The ortaq system, paper currency, and enforced security created the first integrated Eurasian economic zone.',
  },
];

// ── Khan's Council Quiz Data ──────────────────────────────────────
const KHAN_QUIZ = [
  {
    id: 'kq1',
    title: 'The Khwarezmian Problem (1219)',
    scenario: 'You sit in the Khan\'s war council. The Khwarezmian Shah has executed your trade envoys and mutilated your ambassador — an unforgivable insult. His empire spans Central Asia with ~400,000 soldiers garrisoned in heavily fortified cities. Your army of ~150,000 excels on open steppe but has limited siege experience. The Shah expects you to attack his border fortresses sequentially, bleeding your forces city by city. What strategy do you recommend?',
    options: [
      { id: 'a', text: 'Launch a single overwhelming thrust at the capital Samarkand — decapitate the empire by seizing its heart', score: 1, feedback: 'A direct assault on the most heavily fortified city without first isolating it would play into the Shah\'s defensive strategy. The garrison would resist fiercely, and reinforcements from other cities could arrive to trap your army. Genghis Khan understood that conventional siege warfare against a numerically superior force in prepared defenses was a losing proposition.' },
      { id: 'b', text: 'Split the army into four columns attacking simultaneously from different directions — create strategic paralysis by making the Shah unable to determine the main thrust', score: 3, feedback: 'This is exactly what Genghis Khan did — and it remains studied in military academies today. Four columns advanced simultaneously, each appearing to be the main attack. Jebe and Subotai led a 1,600-mile flanking sweep around the Caspian Sea. The main force crossed the "impassable" Kyzylkum Desert to appear behind Bukhara, bypassing frontier defenses entirely. Each city fell in isolation. The Shah, paralyzed by the multi-axis threat, could not concentrate his forces anywhere. The entire empire collapsed in two years.' },
      { id: 'c', text: 'Conduct a methodical frontier campaign — reduce border fortresses one by one, building siege expertise as you go', score: 1, feedback: 'This is what the Shah expected and prepared for. Sequential siege warfare would take decades against hundreds of fortified cities, cost enormous casualties, and give the Shah time to rally allies. The Mongol genius was precisely in refusing to fight the war the enemy had planned for.' },
    ],
    historicalOutcome: 'Genghis Khan executed a multi-axis invasion that achieved strategic paralysis — the Shah could never determine the main threat. The simultaneous advance from multiple directions, including a desert crossing thought impossible for armies, destroyed the Khwarezmian Empire in approximately two years despite being outnumbered roughly 2:1.',
  },
  {
    id: 'kq2',
    title: 'The European Campaign (1241)',
    scenario: 'You are Subotai, commanding ~35,000 Mongol troops in Hungary. King Bela IV has assembled a large army at Pest. To your north, a Polish-German coalition threatens your flank. European heavy cavalry — armored knights in mass charges — is unlike anything you have faced. The terrain is forested with river crossings, not open steppe. You cannot afford to fight two European armies simultaneously. How do you handle this?',
    options: [
      { id: 'a', text: 'Concentrate all forces against Hungary first — the larger army — then turn north to deal with Poland', score: 1, feedback: 'Concentrating against Hungary alone would leave the northern flank exposed. The Polish-German force could march south and catch you between two armies. This violates the fundamental Mongol principle of never allowing the enemy to coordinate their forces against you.' },
      { id: 'b', text: 'Split forces: send a detachment north to pin Poland while the main army engages Hungary — coordinate both battles within days of each other', score: 3, feedback: 'This is precisely what Subotai orchestrated — perhaps the most remarkable feat of operational coordination in medieval military history. He sent Baidar and Kadan north with a smaller force. On April 9, 1241, the northern column destroyed the Polish-German army at Legnica. Two days later, on April 11, the main force annihilated King Bela\'s Hungarians at Mohi. Two battles won 300 miles apart within 48 hours, without radio or telegraph. At Mohi, Subotai used a feigned retreat, crossfire envelopment, and the famous "golden bridge" — a deliberate gap in the encirclement so fleeing troops would spread panic rather than fight to the death.' },
      { id: 'c', text: 'Avoid pitched battle entirely — raid and devastate the countryside to draw the European armies into pursuit on your terms', score: 2, feedback: 'A classic steppe strategy and not unreasonable. Raiding would exploit Mongol mobility advantages. But Subotai recognized that European armies, once assembled, would not dissolve quickly — they had feudal obligations to serve. Destroying them in the field was more efficient than a prolonged raiding campaign. The opportunity to defeat both armies before they could coordinate was too valuable to pass up.' },
    ],
    historicalOutcome: 'Subotai coordinated a two-front campaign across 300 miles of enemy territory with no telecommunications, winning at Legnica and Mohi within 48 hours. At Mohi, he employed a feigned retreat, crossfire trap, and the "golden bridge" escape gap. Europe lay open to conquest — the Mongols withdrew only because Great Khan Ogedei died and Batu returned for the succession.',
  },
  {
    id: 'kq3',
    title: 'The Song Dynasty Problem (1268)',
    scenario: 'You advise Kublai Khan. The Southern Song Dynasty is the wealthiest state on Earth, protected by the Yangtze River and the most powerful navy in the world. No steppe army has ever crossed the Yangtze successfully. Your cavalry is useless on the water. The Song have gunpowder weapons, paddle-wheel warships, and a network of river fortresses. The twin fortress cities of Xiangyang and Fancheng control the middle Yangtze crossing. Without taking them, you cannot reach the Song heartland. What approach do you recommend?',
    options: [
      { id: 'a', text: 'Bypass the Yangtze entirely — invade through the mountainous southwest via Yunnan and attack from an unexpected direction', score: 1, feedback: 'The Mongols actually tried this earlier under Mongke Khan in the 1250s — it ended in stalemate and Mongke\'s death at Diaoyu Fortress. The mountainous terrain in southwest China neutralized cavalry even more completely than rivers did. This approach was already proven to fail.' },
      { id: 'b', text: 'Settle in for a prolonged siege of Xiangyang using the best engineers from across the empire — Persian trebuchet specialists, Chinese sappers, Korean shipwrights — and build a river navy from scratch', score: 3, feedback: 'This is what Kublai Khan did. The siege of Xiangyang lasted five years (1268-1273) — a remarkable commitment of patience for Mongol commanders accustomed to rapid campaigns. He imported Muslim engineers from Persia who built massive counterweight trebuchets (Hui-hui pao) that outranged Song defenses. He built an entire river navy using Chinese and Korean shipwrights. After the twin fortresses fell, Mongol forces advanced along the waterways, beating the Song at their own naval game. This was cross-domain adaptation at its most impressive.' },
      { id: 'c', text: 'Negotiate — offer the Song favorable trade terms and a peace treaty, accepting control of northern China as sufficient', score: 2, feedback: 'Pragmatic and arguably wise. The Song were trade partners as much as enemies, and controlling northern China was already an enormous achievement. But Kublai\'s legitimacy as Great Khan partly rested on completing the conquest his grandfather had begun. Stopping at the Yangtze would have been seen as weakness by rival Mongol princes. The political logic demanded total conquest even when the military logic counseled patience.' },
    ],
    historicalOutcome: 'Kublai Khan conducted a five-year siege of Xiangyang (1268-1273), importing Persian siege engineers and building a river navy from scratch. After the fortresses fell, combined Mongol land and naval forces swept down the Yangtze. The Song Dynasty — the wealthiest state on Earth — fell in 1279. It was the Mongols\' greatest feat of cross-domain military adaptation: steppe warriors who conquered the world\'s strongest naval power.',
  },
];

// ── Scholarly Micro-Content Tooltips ─────────────────────────────────
const MONGOL_TIPS = {
  bow: "The Mongol composite bow had a draw weight of 75kg (165 lbs) \u2014 nearly twice a European longbow. Made from horn, sinew, and birch bark laminated together, it could be fired accurately from horseback at full gallop. Its recurve design stored more energy per unit length, making it shorter than infantry bows while being more powerful. This technological advantage was equivalent to a modern military having precision-guided munitions while opponents had unguided rockets.",
  yam: "The Yam relay system covered 8,000+ miles with stations every 25-30 miles. A rider could cover 200 miles per day by changing horses at each station. Marco Polo called it the most efficient postal system in the world. It wasn\u2019t just mail \u2014 it was an intelligence network. Station masters reported unusual activity, troop movements, and local grievances. The Mongol Empire\u2019s real weapon wasn\u2019t the army \u2014 it was information velocity.",
  gerege: "The gerege (passport tablet) was a flat metal plate carried by authorized travelers. Gold gerege granted imperial authority. Silver gerege granted safe passage. Iron gerege was for standard messengers. Forging one was punishable by death. This was the world\u2019s first standardized identification system \u2014 700 years before the modern passport.",
  decimal: "Chinggis Khan organized his army in decimal units: arban (10), zuun (100), mingghan (1,000), tumen (10,000). This seems obvious but was revolutionary \u2014 it broke tribal loyalties by mixing men from different clans into the same units. A soldier\u2019s loyalty shifted from his tribe to his unit commander. This deliberate social engineering destroyed the tribal structure that had kept the steppe nomads fragmented for centuries.",
  feigned: "The feigned retreat was not a trick \u2014 it was a doctrine. Mongol units would engage, appear to break, and flee for 1-3 days. European knights, trained to pursue broken enemies, would charge after them in disordered groups. When the pursuing force was strung out over miles of terrain, the Mongol reserve \u2014 hidden behind terrain features \u2014 would sweep in from the flanks. At Legnica (1241), the Polish-German army was destroyed by exactly this tactic. They had been warned. They fell for it anyway.",
  siege: "The Mongols had no siege tradition \u2014 steppe nomads don\u2019t build walls. So they recruited Chinese and Persian engineers. By the siege of Baghdad (1258), Mongol siege trains included trebuchets, mangonels, and naphtha projectors operated by specialists from three different civilizations. This willingness to adopt foreign expertise \u2014 rather than dismissing it as \u2018un-Mongol\u2019 \u2014 was the empire\u2019s greatest strategic advantage.",
  horse: "A Mongol warrior brought 3-5 horses on campaign. When one tired, he switched to another without stopping. Mongol horses (Przewalski descendants) survived on grass alone \u2014 no grain supply train needed. This meant Mongol armies had no supply line to cut. They were self-sufficient for weeks. European armies, dependent on grain wagons and forage, could be starved into submission simply by the Mongols riding around them.",
};

// ── Component ───────────────────────────────────────────────────────
function MongolView({ setView }) {
  const [mode, setMode] = useState('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const [expandedInnovation, setExpandedInnovation] = useState(null);
  const [expandedLegacy, setExpandedLegacy] = useState(null);
  const [campHover, setCampHover] = useState(null);
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizRevealed, setQuizRevealed] = useState({});
  const [tipId, setTipId] = useState(null);
  const topRef = useRef(null);

  // ── Logistics Calculator State ──────────────────────────────────
  var [logArmySize, setLogArmySize] = useState(60000);
  var [logDistance, setLogDistance] = useState(2000);
  var [logTerrain, setLogTerrain] = useState('steppe');
  var [logSeason, setLogSeason] = useState('summer');

  // ── Doctrine Analyzer State ─────────────────────────────────────
  var [doctrineSelected, setDoctrineSelected] = useState(0);
  var [battleScenario, setBattleScenario] = useState(null);
  var [battleChoice, setBattleChoice] = useState({});

  // ── Empire Sustainability State ─────────────────────────────────
  var [empireCell, setEmpireCell] = useState(null);

  // ── Scholarly Micro-Icons & Tooltip ──────────────────────────────
  function Tip({ id }) {
    if (tipId !== id || !MONGOL_TIPS[id]) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(10,8,4,.92)', border: '1px solid ' + C.amber + '25', borderRadius: 3, maxWidth: 440, fontSize: 11, fontFamily: Mono, color: C.tx2, lineHeight: 1.65, margin: '6px 0 10px' }}>
        {MONGOL_TIPS[id]}
      </div>
    );
  }

  const BowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='bow'?null:'bow')}>
      <path d="M6 4 Q2 12 6 20" fill="none" stroke="currentColor" strokeWidth="1"/>
      <line x1="6" y1="4" x2="6" y2="20" stroke="currentColor" strokeWidth=".5"/>
      <line x1="6" y1="12" x2="20" y2="10" stroke="currentColor" strokeWidth=".7"/>
      <path d="M18 8 L22 10 L18 12" fill="none" stroke="currentColor" strokeWidth=".6"/>
    </svg>
  );

  const HorseIcon = () => (
    <svg width="28" height="20" viewBox="0 0 28 20" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='horse'?null:'horse')}>
      <path d="M4 16 Q6 10 10 8 Q14 6 16 8 L18 6 L20 4 L20 8 Q22 10 22 14 L24 18 M18 12 L18 18 M10 12 L8 18 M12 12 L12 18" fill="none" stroke="currentColor" strokeWidth=".8"/>
    </svg>
  );

  const YurtIcon = () => (
    <svg width="24" height="20" viewBox="0 0 24 20" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='yam'?null:'yam')}>
      <path d="M2 16 Q4 8 12 6 Q20 8 22 16" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <line x1="2" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth=".8"/>
      <rect x="10" y="12" width="4" height="4" fill="none" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const GeregeIcon = () => (
    <svg width="20" height="24" viewBox="0 0 20 24" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='gerege'?null:'gerege')}>
      <rect x="3" y="2" width="14" height="18" rx="2" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth=".8"/>
      <circle cx="10" cy="22" r="1.5" fill="none" stroke="currentColor" strokeWidth=".5"/>
      <line x1="6" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth=".4"/>
      <line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth=".4"/>
      <line x1="6" y1="13" x2="12" y2="13" stroke="currentColor" strokeWidth=".4"/>
    </svg>
  );

  const SiegeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='siege'?null:'siege')}>
      <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1"/>
      <line x1="6" y1="20" x2="18" y2="20" stroke="currentColor" strokeWidth="1"/>
      <line x1="8" y1="20" x2="12" y2="8" stroke="currentColor" strokeWidth=".7"/>
      <line x1="16" y1="20" x2="12" y2="8" stroke="currentColor" strokeWidth=".7"/>
      <path d="M12 4 Q16 2 20 6" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <circle cx="20" cy="6" r="1.5" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const DecimalIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='decimal'?null:'decimal')}>
      <circle cx="11" cy="5" r="2" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <circle cx="5" cy="13" r="2" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <circle cx="11" cy="13" r="2" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <circle cx="17" cy="13" r="2" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <line x1="11" y1="7" x2="5" y2="11" stroke="currentColor" strokeWidth=".5"/>
      <line x1="11" y1="7" x2="11" y2="11" stroke="currentColor" strokeWidth=".5"/>
      <line x1="11" y1="7" x2="17" y2="11" stroke="currentColor" strokeWidth=".5"/>
    </svg>
  );

  const FeignedIcon = () => (
    <svg width="24" height="20" viewBox="0 0 24 20" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='feigned'?null:'feigned')}>
      <path d="M4 10 L10 10 L14 4 L18 16 L22 10" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <path d="M20 8 L22 10 L20 12" fill="none" stroke="currentColor" strokeWidth=".6"/>
    </svg>
  );

  // Toggle solution reveal per campaign
  const toggleSolution = useCallback((id) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Toggle innovation expansion
  const toggleInnovation = useCallback((id) => {
    setExpandedInnovation(prev => prev === id ? null : id);
  }, []);

  // Toggle legacy expansion
  const toggleLegacy = useCallback((id) => {
    setExpandedLegacy(prev => prev === id ? null : id);
  }, []);

  // Progress tracking
  const revealedCount = useMemo(
    () => Object.values(revealedSolutions).filter(Boolean).length,
    [revealedSolutions],
  );

  // ── Routes Renderer (SVG Campaign Map) ──────────────────────────
  const renderRoutes = useCallback(() => {
    const hoveredCamp = campHover !== null ? MONGOL_CAMPAIGNS.find(c => c.id === campHover) : null;
    const maxSpeed = 120;
    return (
      <div>
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.amberDm, marginBottom: 12 }}>
          CAMPAIGN ROUTES &mdash; EURASIA
        </div>
        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 24, marginBottom: 16 }}>
          <svg viewBox="0 0 700 400" style={{ width: '100%', display: 'block' }}>
            {/* Simplified landmass outline */}
            <ellipse cx="400" cy="200" rx="280" ry="160" fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="4,4" />
            {/* Mongolia label */}
            <text x="470" y="190" fill={C.tx3} fontSize="9" fontFamily={Mono}>MONGOLIA</text>
            <circle cx="460" cy="195" r="4" fill={C.amber} />
            {/* Campaign arrows */}
            {MONGOL_CAMPAIGNS.map(camp => {
              const isHov = campHover === camp.id;
              return (
                <g key={camp.id}
                  onMouseEnter={() => setCampHover(camp.id)}
                  onMouseLeave={() => setCampHover(null)}
                  onClick={() => setCampHover(campHover === camp.id ? null : camp.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <path d={camp.path} fill="none" stroke={camp.color}
                    strokeWidth={isHov ? 4 : 2} opacity={isHov ? 1 : 0.6}
                    strokeLinecap="round" style={{ transition: 'all .2s' }}
                    markerEnd="url(#arrowhead)" />
                  {/* Label at end of path */}
                  <text x={parseInt(camp.path.split(' ').slice(-1)[0].split(',')[0]) || 200}
                    y={(parseInt(camp.path.split(' ').slice(-1)[0].split(',')[1]) || 200) + 14}
                    fill={isHov ? camp.color : C.tx3} fontSize="8" fontFamily={Mono}
                    textAnchor="middle">
                    {camp.label.split(' (' /* ) */)[0]}
                  </text>
                </g>
              );
            })}
            {/* Arrow marker */}
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill={C.amber} />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Info panel */}
        {hoveredCamp ? (
          <div style={{
            background: C.card, border: '1px solid ' + hoveredCamp.color + '44',
            borderRadius: 8, padding: 20, marginBottom: 16,
          }}>
            <div style={{ fontFamily: Serif, fontSize: 18, fontWeight: 600, color: hoveredCamp.color, marginBottom: 8 }}>
              {hoveredCamp.label}
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                ARMY: <span style={{ color: C.tx }}>{hoveredCamp.army}</span>
              </span>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                DISTANCE: <span style={{ color: C.tx }}>{hoveredCamp.distance}</span>
              </span>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                DURATION: <span style={{ color: C.tx }}>{hoveredCamp.duration}</span>
              </span>
            </div>
            <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7, borderLeft: '3px solid ' + hoveredCamp.color, paddingLeft: 14 }}>
              {hoveredCamp.detail}
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx3, textAlign: 'center', fontStyle: 'italic', marginBottom: 16 }}>
            Hover or click a campaign route to see army size, distance, and strategic detail.
          </div>
        )}

        {/* Speed comparison */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.amberDm }}>
            MARCH SPEED COMPARISON (KM/DAY)
          </div>
          <HorseIcon />
          <YurtIcon />
        </div>
        <Tip id="horse" />
        <Tip id="yam" />
        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 20 }}>
          {SPEED_COMPARISON.map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx2, width: 130, flexShrink: 0 }}>{s.label}</span>
              <div style={{ flex: 1, height: 14, background: C.line, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  width: (s.kmday / maxSpeed * 100) + '%', height: '100%',
                  background: s.color, borderRadius: 3, transition: 'width .3s',
                }} />
              </div>
              <span style={{ fontFamily: Mono, fontSize: 11, fontWeight: 700, color: s.color, width: 40, textAlign: 'right' }}>
                {s.kmday}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }, [campHover, tipId]);

  // ── Mode Switch ─────────────────────────────────────────────────
  const ModeSwitch = useCallback(() => {
    const modes = [
      { id: 'campaigns', label: 'Campaigns', desc: '5 Strategic Analyses' },
      { id: 'routes', label: 'Routes', desc: 'Campaign Map' },
      { id: 'innovations', label: 'Innovations', desc: '6 Tactical Cards' },
      { id: 'legacy', label: 'Legacy', desc: 'Historical Impact' },
      { id: 'quiz', label: "Khan\u2019s Council", desc: '3 Tactical Scenarios' },
    ];
    return (
      <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1, padding: '10px 12px', borderRadius: 4, cursor: 'pointer',
              background: mode === m.id ? C.amberBg : 'transparent',
              border: mode === m.id ? '1px solid ' + C.amberDm : '1px solid ' + C.line,
              textAlign: 'center', transition: 'all .15s ease',
            }}
          >
            <span style={{
              fontFamily: Mono, fontSize: 11, fontWeight: 600,
              color: mode === m.id ? C.amber : C.tx3, display: 'block',
            }}>
              {m.label}
            </span>
            <span style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{m.desc}</span>
          </button>
        ))}
      </div>
    );
  }, [mode]);

  // ── Campaigns Renderer ──────────────────────────────────────────
  const renderCampaigns = useCallback(() => {
    const camp = CAMPAIGNS[selectedCampaign];
    const isRevealed = revealedSolutions[camp.id];
    return (
      <div>
        {/* Campaign selector tabs */}
        <div style={{
          display: 'flex', gap: 3, marginBottom: 20, overflowX: 'auto',
          paddingBottom: 4,
        }}>
          {CAMPAIGNS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelectedCampaign(i)}
              style={{
                flex: '0 0 auto', padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
                background: i === selectedCampaign ? C.amberBg : 'transparent',
                border: i === selectedCampaign
                  ? '1px solid ' + C.amberDm
                  : '1px solid ' + C.line,
                transition: 'all .12s ease', whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 12, fontWeight: 600,
                color: i === selectedCampaign ? C.amber : C.tx3,
                display: 'block',
              }}>
                {c.year}
              </span>
              <span style={{
                fontFamily: Sans, fontSize: 12,
                color: i === selectedCampaign ? C.tx2 : C.tx3,
              }}>
                {c.name}
              </span>
            </button>
          ))}
        </div>

        {/* Campaign briefing card — rough-edged dispatch style */}
        <div style={{
          background: C.card, borderRadius: 4, padding: 28, marginBottom: 16,
          position: 'relative', border: '1px solid ' + C.cardBd,
          boxShadow: 'inset 0 0 40px rgba(12,8,6,.3)',
        }}>
          <RoughBorder borderColor={C.cardBd} />
          {/* Header — campaign dispatch style */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.14em',
              color: C.amberDm, marginBottom: 6, textTransform: 'uppercase',
            }}>
              CAMPAIGN DISPATCH {'\u2014'} {camp.year}
            </div>
            <h2 style={{
              fontFamily: Serif, fontSize: 28, fontWeight: 700,
              color: C.tx, marginBottom: 6, letterSpacing: '.02em',
            }}>
              {camp.name}
            </h2>
            <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.65, letterSpacing: '.03em' }}>
              {camp.region}
            </div>
            <RopeHr />
          </div>

          {/* Intel grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12, marginBottom: 24,
          }}>
            {[
              { label: 'TERRAIN', value: camp.terrain },
              { label: 'ENEMY STRENGTH', value: camp.enemyStrength },
              { label: 'MONGOL FORCE', value: camp.mongolForce },
            ].map(item => (
              <div key={item.label} style={{
                background: C.amberBg, borderRadius: 6, padding: '10px 14px',
                border: '1px solid ' + C.line,
              }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                  color: C.amberDm, marginBottom: 4,
                }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx, lineHeight: 1.65 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Scholarly micro-icons: campaign-relevant */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <HorseIcon />
            {(camp.id === 'khwarezmia' || camp.id === 'europe') && <FeignedIcon />}
            {(camp.id === 'middleeast' || camp.id === 'song') && <SiegeIcon />}
            {camp.id === 'jin' && <BowIcon />}
          </div>
          <Tip id="horse" />
          <Tip id="feigned" />
          <Tip id="siege" />
          <Tip id="bow" />

          {/* Strategic Problem */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
              color: C.red, marginBottom: 8, fontWeight: 600,
            }}>
              \u26A0 THE STRATEGIC PROBLEM
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
              paddingLeft: 16, borderLeft: '3px solid ' + C.redDm,
            }}>
              {camp.strategicProblem}
            </div>
          </div>

          {/* Reveal button / Mongol Solution */}
          {!isRevealed ? (
            <button
              onClick={() => toggleSolution(camp.id)}
              style={{
                width: '100%', padding: '14px 20px', borderRadius: 6,
                background: C.amberBg, border: '1px solid ' + C.amberDm,
                color: C.amber, fontFamily: Mono, fontSize: 12,
                letterSpacing: '.04em', cursor: 'pointer',
                transition: 'all .15s ease',
              }}
            >
              \u2694 REVEAL THE MONGOL SOLUTION
            </button>
          ) : (
            <div>
              <div style={{
                fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
                color: C.green, marginBottom: 8, fontWeight: 600,
              }}>
                \u2694 THE MONGOL SOLUTION
              </div>
              <div style={{
                fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
                paddingLeft: 16, borderLeft: '3px solid ' + C.greenDm,
                marginBottom: 20,
              }}>
                {camp.mongolSolution}
              </div>

              {/* Key Innovation highlight */}
              <div style={{
                background: C.amberBg, borderRadius: 6, padding: '14px 18px',
                border: '1px solid ' + C.amberDm, marginBottom: 20,
              }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                  color: C.amberDm, marginBottom: 6,
                }}>
                  KEY INNOVATION
                </div>
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.gold, lineHeight: 1.6 }}>
                  {camp.keyInnovation}
                </div>
              </div>

              {/* Outcome */}
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                  color: C.tx3, marginBottom: 6,
                }}>
                  OUTCOME
                </div>
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>
                  {camp.outcome}
                </div>
              </div>

              {/* Quote */}
              <div style={{
                fontStyle: 'italic', fontFamily: Serif, fontSize: 13,
                color: C.tx2, lineHeight: 1.7, paddingLeft: 16,
                borderLeft: '2px solid ' + C.line, marginBottom: 4,
              }}>
                {camp.quote}
              </div>
              <div style={{
                fontFamily: Mono, fontSize: 11, color: C.tx3,
                paddingLeft: 16, letterSpacing: '.03em',
              }}>
                {'\— '}{camp.quoteSource}
              </div>
            </div>
          )}
        </div>

        {/* Campaign progress */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: Mono, fontSize: 12, color: C.tx3,
        }}>
          <span>SOLUTIONS REVEALED</span>
          <div style={{
            flex: 1, maxWidth: 160, height: 4,
            background: C.line, borderRadius: 2,
          }}>
            <div style={{
              width: (revealedCount / 5 * 100) + '%',
              height: '100%', borderRadius: 2,
              background: revealedCount === 5 ? C.green : C.amber,
              transition: 'width .3s ease',
            }} />
          </div>
          <span style={{
            color: revealedCount === 5 ? C.green : C.amber,
          }}>
            {revealedCount}/5
          </span>
        </div>
      </div>
    );
  }, [selectedCampaign, revealedSolutions, revealedCount, toggleSolution, tipId]);

  // ── Innovations Renderer ────────────────────────────────────────
  const renderInnovations = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.1em',
          color: C.amberDm, marginBottom: 8,
        }}>
          TACTICAL INNOVATIONS BOARD {'\u2014'} 6 MONGOL MILITARY ADVANTAGES
        </div>
        <RopeHr style={{ marginBottom: 16 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {INNOVATIONS.map(inn => {
            const isOpen = expandedInnovation === inn.id;
            return (
              <div
                key={inn.id}
                style={{
                  background: C.card,
                  border: '1px solid ' + (isOpen ? C.amberDm : C.cardBd),
                  borderRadius: 8, overflow: 'hidden',
                  transition: 'border-color .15s ease',
                }}
              >
                {/* Card header */}
                <button
                  onClick={() => toggleInnovation(inn.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 24, width: 44, height: 44,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.amberBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                  }}>
                    {inn.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                      color: C.amberDm, marginBottom: 2,
                    }}>
                      {inn.category}
                    </div>
                    <div style={{
                      fontFamily: Serif, fontSize: 17, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {inn.name}
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

                {/* Card body */}
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
                      {inn.summary}
                    </div>

                    {/* Scholarly micro-icons per innovation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      {inn.id === 'composite_bow' && <BowIcon />}
                      {inn.id === 'decimal' && <DecimalIcon />}
                      {inn.id === 'feigned_retreat' && <FeignedIcon />}
                      {inn.id === 'siege' && <SiegeIcon />}
                      {inn.id === 'yam' && <><YurtIcon /><GeregeIcon /></>}
                      {inn.id === 'psywar' && <HorseIcon />}
                    </div>
                    {inn.id === 'composite_bow' && <Tip id="bow" />}
                    {inn.id === 'decimal' && <Tip id="decimal" />}
                    {inn.id === 'feigned_retreat' && <Tip id="feigned" />}
                    {inn.id === 'siege' && <Tip id="siege" />}
                    {inn.id === 'yam' && <><Tip id="yam" /><Tip id="gerege" /></>}
                    {inn.id === 'psywar' && <Tip id="horse" />}

                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.tx3, marginBottom: 8,
                    }}>
                      OPERATIONAL DETAILS
                    </div>
                    <ul style={{
                      listStyle: 'none', padding: 0, margin: '0 0 16px',
                    }}>
                      {inn.details.map((d, i) => (
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
                      background: C.amberBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.amberDm, marginBottom: 6,
                      }}>
                        HISTORICAL SIGNIFICANCE
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.gold,
                        lineHeight: 1.7,
                      }}>
                        {inn.historicalImpact}
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
  }, [expandedInnovation, toggleInnovation, tipId]);

  // ── Legacy Renderer ─────────────────────────────────────────────
  const renderLegacy = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.amberDm, marginBottom: 6,
        }}>
          LEGACY ANALYSIS \— PAX MONGOLICA & LASTING IMPACT
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          The Mongol Empire was not merely a destructive force. Its century of dominance reshaped the political, economic, and biological landscape of Eurasia in ways that still echo today. The empire facilitated unprecedented exchange \— of goods, ideas, technologies, religions, and disease.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LEGACY_ITEMS.map(item => {
            const isOpen = expandedLegacy === item.id;
            return (
              <div
                key={item.id}
                style={{
                  background: C.card,
                  border: '1px solid ' + (isOpen ? C.amberDm : C.cardBd),
                  borderRadius: 8, overflow: 'hidden',
                  transition: 'border-color .15s ease',
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
                    background: C.amberBg, borderRadius: 6,
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
                      {item.description}
                    </div>

                    {/* Scholarly micro-icons per legacy item */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      {(item.id === 'pax' || item.id === 'trade') && <><YurtIcon /><GeregeIcon /></>}
                      {item.id === 'plague' && <HorseIcon />}
                      {item.id === 'tolerance' && <DecimalIcon />}
                      {item.id === 'meritocracy' && <DecimalIcon />}
                    </div>
                    {(item.id === 'pax' || item.id === 'trade') && <><Tip id="yam" /><Tip id="gerege" /></>}
                    {item.id === 'plague' && <Tip id="horse" />}
                    {item.id === 'tolerance' && <Tip id="decimal" />}
                    {item.id === 'meritocracy' && <Tip id="decimal" />}

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
                      background: C.amberBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.amberDm, marginBottom: 6,
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
  }, [expandedLegacy, toggleLegacy, tipId]);

  // ── Quiz Renderer (Khan's Council) ─────────────────────────────
  const renderQuiz = useCallback(() => {
    const answeredCount = Object.keys(quizAnswers).length;
    return (
      <div>
        {/* Intro */}
        <div style={{
          padding: '16px 20px', background: C.amberBg,
          border: '1px solid ' + C.amberDm + '44', borderRadius: 6, marginBottom: 24,
        }}>
          <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.6 }}>
            <strong style={{ color: C.amber }}>{'\u2694'} Khan{'\u2019'}s Council: </strong>
            You sit in the war council at three pivotal moments of Mongol expansion. Each scenario presents the actual strategic problem facing Mongol commanders. Choose your strategy{'\—'}then see what Genghis Khan and his generals actually did, and why their solutions are still studied today.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>PROGRESS</span>
            <div style={{ flex: 1, maxWidth: 160, height: 4, background: C.line, borderRadius: 2 }}>
              <div style={{
                width: (answeredCount / 3 * 100) + '%', height: '100%', borderRadius: 2,
                background: answeredCount === 3 ? C.green : C.amber, transition: 'width .3s',
              }} />
            </div>
            <span style={{ fontFamily: Mono, fontSize: 12, color: answeredCount === 3 ? C.green : C.amber }}>
              {answeredCount}/3 answered
            </span>
          </div>
        </div>

        {/* Questions */}
        {KHAN_QUIZ.map((q, qi) => {
          const myAnswer = quizAnswers[q.id];
          const isRevealed = quizRevealed[q.id];
          const selectedOpt = myAnswer ? q.options.find(o => o.id === myAnswer) : null;

          return (
            <div key={q.id} style={{
              marginBottom: 20, border: '1px solid ' + (isRevealed ? C.amberDm + '44' : C.cardBd),
              borderRadius: 8, background: C.card, overflow: 'hidden',
            }}>
              {/* Question header */}
              <div style={{ padding: '18px 20px', borderBottom: '1px solid ' + C.line }}>
                <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.08em', color: C.amberDm, marginBottom: 6 }}>
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
                    isSelected ? (opt.score === 3 ? C.greenBg : opt.score === 2 ? C.amberBg : C.redBg) : 'transparent';

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
                        <span style={{ fontFamily: Mono, fontSize: 11, color: C.amber, marginRight: 8 }}>
                          {opt.id.toUpperCase()}.
                        </span>
                        {opt.text}
                      </div>
                      {myAnswer && isSelected && (
                        <div style={{
                          marginTop: 6, fontFamily: Mono, fontSize: 12,
                          color: opt.score === 3 ? C.green : opt.score === 2 ? C.gold : C.red,
                        }}>
                          {opt.score === 3 ? '\✓ Matches Mongol strategy' : opt.score === 2 ? '\u25CB Reasonable but not what happened' : '\✗ Plays into the enemy\'s hands'}
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
                      border: '1px solid ' + C.amberDm + '44', borderRadius: 6,
                      background: C.amberBg, color: C.amber,
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
            border: '1px solid ' + C.amberDm + '33', borderRadius: 8, marginTop: 8,
          }}>
            <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.08em', color: C.amber, marginBottom: 10 }}>
              ASSESSMENT COMPLETE
            </div>
            <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.7 }}>
              {(() => {
                const total = KHAN_QUIZ.reduce((sum, q) => {
                  const opt = q.options.find(o => o.id === quizAnswers[q.id]);
                  return sum + (opt ? opt.score : 0);
                }, 0);
                if (total >= 8) return 'Outstanding strategic thinking. You matched the Mongol approach consistently\—you understand why their military system was revolutionary. The multi-axis advance, operational coordination, and cross-domain adaptation were not brute force but sophisticated strategic art.';
                if (total >= 5) return 'Good analytical instincts. You identified viable alternatives that real commanders might have chosen. Understanding why the Mongol approach was superior to conventional alternatives is the key insight\—they consistently refused to fight the war their enemies had prepared for.';
                return 'You chose the conventional approaches\—which is exactly what the Mongols\u2019 enemies chose. The Mongol genius was in systematically violating their opponents\u2019 assumptions. Every enemy expected a conventional campaign; every enemy was wrong.';
              })()}
            </div>
          </div>
        )}
      </div>
    );
  }, [quizAnswers, quizRevealed]);

  // ── Main Render ─────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: Sans, position: 'relative', overflow: 'hidden' }} ref={topRef}>
      {/* Leather grain texture overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#g)" opacity=".03"/></svg>') + '")',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Steppe landscape silhouette (fixed background) */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 200, pointerEvents: 'none', zIndex: 0 }}>
        <SteppeSkyline />
      </div>

      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: C.bg + 'f0', backdropFilter: 'blur(12px)',
        borderBottom: 'none', padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <RopeHr style={{ position: 'absolute', bottom: 0, left: 0, right: 0, margin: 0 }} />
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer', letterSpacing: '.06em',
        }}>
          {'\u2190'} Back to Coursework
        </button>
        <span style={{ fontFamily: Mono, fontSize: 12, color: C.amberDm, letterSpacing: '.1em' }}>
          HIST {'\u2014'} THE MONGOL EMPIRE
        </span>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Hero section */}
        <div style={{ marginBottom: 28, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1 style={{
              fontFamily: Serif, fontSize: 36, fontWeight: 700,
              color: C.tx, letterSpacing: '.04em', marginBottom: 8,
            }}>
              Empire Builder
            </h1>
            {/* Larger horse-tail banner */}
            <svg width="52" height="62" viewBox="0 0 52 62" style={{opacity:0.25,flexShrink:0,color:C.amber}}>
              <line x1="26" y1="2" x2="26" y2="58" stroke="currentColor" strokeWidth="2"/>
              <circle cx="26" cy="2" r="4" fill="none" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M22 14 Q12 22 8 36 M26 14 Q22 24 20 36 M30 14 Q38 22 42 36 M26 14 Q30 24 32 36" stroke="currentColor" strokeWidth="1" fill="none"/>
              <path d="M18 36 Q14 44 10 50 M24 36 Q22 44 20 52 M28 36 Q30 44 32 52 M34 36 Q38 44 42 50" stroke="currentColor" strokeWidth="0.6" fill="none" opacity=".5"/>
            </svg>
            <BowIcon />
            <HorseIcon />
            <SiegeIcon />
          </div>
          <Tip id="bow" />
          <Tip id="horse" />
          <Tip id="siege" />
          <p style={{
            fontFamily: Serif, fontSize: 15, color: C.tx2,
            lineHeight: 1.7, marginBottom: 4, maxWidth: 720, letterSpacing: '.02em',
          }}>
            A strategic simulation of five Mongol campaigns that reshaped the world. Each campaign presents the strategic problem facing Mongol commanders and reveals the innovations that created the largest contiguous land empire in history. Analyze the tactics. Understand the system. See why military academies still study these campaigns.
          </p>
          <p style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3,
            lineHeight: 1.65, marginBottom: 12, maxWidth: 720, letterSpacing: '.06em',
          }}>
            Genghis Khan, Steppe Warfare, Golden Horde
          </p>

          {/* Skills tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            {SKILLS.map(tag => (
              <span key={tag} style={{
                fontFamily: Mono, fontSize: 11, padding: '3px 10px', borderRadius: 2,
                background: C.amberBg, color: C.amberDm, letterSpacing: '.05em',
                border: '1px solid ' + C.amber + '15',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, letterSpacing: '.06em' }}>CAMPAIGNS ANALYZED</span>
            <div style={{ flex: 1, maxWidth: 200, height: 4, background: C.line, borderRadius: 2 }}>
              <div style={{
                width: (revealedCount / 5 * 100) + '%',
                height: '100%', borderRadius: 2,
                background: revealedCount === 5 ? C.green : C.amber,
                transition: 'width .3s ease',
              }} />
            </div>
            <span style={{
              fontFamily: Mono, fontSize: 12,
              color: revealedCount === 5 ? C.green : C.amber,
            }}>
              {revealedCount}/5
            </span>
          </div>

          <RopeHr style={{ marginTop: 16 }} />
        </div>

        <ModeSwitch />

        {mode === 'campaigns' && renderCampaigns()}
        {mode === 'routes' && renderRoutes()}
        {mode === 'innovations' && renderInnovations()}
        {mode === 'legacy' && renderLegacy()}
        {mode === 'quiz' && renderQuiz()}

        {/* Arrow divider before provenance */}
        <ArrowDivider />

        {/* Provenance Strip */}
        <div style={{
          marginTop: 24, padding: 20,
          display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center',
        }}>
          <RopeHr style={{ width: '100%', marginBottom: 12 }} />
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

        {/* Back button */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={() => setView('coursework')} style={{
            padding: '10px 32px', border: '1px solid ' + C.line, borderRadius: 4,
            background: 'transparent', color: C.tx2,
            fontFamily: Mono, fontSize: 13, letterSpacing: 1, cursor: 'pointer',
          }}>
            {'\u2190'} Back to Coursework
          </button>
        </div>
      </div>
    </div>
  );
}
