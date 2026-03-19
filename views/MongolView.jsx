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

// ── Logistics Calculator Data ────────────────────────────────────────
var TERRAIN_DATA = {
  steppe: { name: 'Open Steppe', marchRate: 80, grazingMod: 1.0, waterMod: 1.0, desc: 'Ideal Mongol terrain. Endless grass for horses, few obstacles. The Mongol army could cover 80+ km/day on open steppe, with scouts ranging 100+ km ahead.' },
  mountain: { name: 'Mountain Passes', marchRate: 30, grazingMod: 2.5, waterMod: 0.8, desc: 'Severely reduced mobility. Narrow passes forced the army into column formation, negating numerical advantage. The Hindu Kush and Caucasus crossings cost weeks.' },
  desert: { name: 'Desert', marchRate: 40, grazingMod: 3.0, waterMod: 3.5, desc: 'The Kyzylkum crossing (1220) was considered impossible for armies. Mongol horses survived on scrub vegetation. Water discipline was absolute — wells mapped by advance scouts.' },
  forest: { name: 'Dense Forest', marchRate: 25, grazingMod: 2.0, waterMod: 0.6, desc: 'The worst terrain for Mongol operations. Forests in Russia and Hungary neutralized cavalry mobility. Visibility dropped to meters. Ambush risk was extreme.' },
};
var SEASON_DATA = {
  spring: { name: 'Spring', speedMod: 0.9, waterMod: 0.7, grazingMod: 0.8, desc: 'Fresh grass emerging but rivers swollen with snowmelt. River crossings dangerous. Mud slows wagons. Horses recovering from winter weight loss.' },
  summer: { name: 'Summer', speedMod: 1.0, waterMod: 1.2, grazingMod: 1.0, desc: 'Peak campaign season. Maximum grass availability, longest daylight for marching. Heat stress on horses in desert terrain. The preferred season for major operations.' },
  autumn: { name: 'Autumn', speedMod: 0.95, waterMod: 1.0, grazingMod: 1.3, desc: 'Horses at peak weight after summer grazing. Cooling temperatures favor sustained movement. Urgency increases before winter. Many Mongol campaigns launched in late autumn.' },
  winter: { name: 'Winter', speedMod: 0.7, waterMod: 0.5, grazingMod: 3.0, desc: 'Mongols uniquely capable of winter campaigns. Frozen rivers became highways. Opponents expected respite. Subotai invaded Hungary in winter 1241, crossing frozen Danube. But horses needed supplemental feed.' },
};
var CRUSADER_MULTIPLIERS = {
  horsesPerWarrior: 1.5,
  dailyGrain_kg: 8,
  wagonsPer1000: 30,
  marchRate: 20,
  supplyLineRequired: true,
  campFollowerRatio: 3,
};

// ── Doctrine Analyzer Data ──────────────────────────────────────────
var DOCTRINE_TACTICS = [
  {
    id: 'feigned_retreat', name: 'Feigned Retreat & Encirclement',
    category: 'BATTLEFIELD MANEUVER',
    description: 'Mongol vanguard engages the enemy, fights briefly, then breaks and flees in apparent disorder. Pursuing enemy cavalry stretches out over kilometers, losing cohesion. Hidden flanking forces close behind. The fleeing vanguard wheels around. The enemy is surrounded and annihilated.',
    whyItWorked: 'European and Middle Eastern heavy cavalry doctrine was built on the decisive charge. Knights were trained to pursue broken enemies — it was how battles were won. The feigned retreat exploited this deeply ingrained reflex. Discipline was the key: Mongol units had to retreat convincingly while maintaining formation readiness to reverse instantly.',
    battles: [
      { name: 'Battle of Mohi (1241)', detail: 'Subotai lured Hungarian cavalry across the Sajo River, then encircled them. Left a deliberate gap (the "golden bridge") so fleeing troops spread panic instead of fighting to the death.' },
      { name: 'Battle of the Kalka River (1223)', detail: 'Jebe and Subotai feigned retreat for 9 days, drawing the combined Russian-Cuman army deep into the steppe. Then turned and destroyed them piecemeal as the coalition fragmented during pursuit.' },
    ],
    enemyAdaptation: 'Almost none during the Mongol era. European commanders were repeatedly warned about the tactic but could not overcome the instinct to pursue. The Mamluks at Ain Jalut (1260) were among the few to counter it — they held formation under Baibars and refused to pursue.',
    modernEquivalent: 'Mobile defense doctrine. NATO forces practice "fighting withdrawal" where units retreat through prepared positions while counterattack forces strike the pursuing enemy on the flanks. The US Marine Corps "maneuver warfare" doctrine draws on the same principle of luring the enemy into a disadvantageous position.',
    svgDiagram: 'feigned',
  },
  {
    id: 'mangudai', name: 'Mangudai Skirmish Tactics',
    category: 'LIGHT CAVALRY DOCTRINE',
    description: 'Specialized light cavalry units (mangudai) would ride parallel to enemy formations at 200-300m range, firing volleys of arrows. They never closed to melee. If the enemy charged, they dispersed like smoke, reforming behind the pursuit. If the enemy held position, they died under sustained arrow fire. An enemy that did nothing was slowly destroyed; an enemy that reacted was drawn into a trap.',
    whyItWorked: 'Heavy cavalry and infantry had no answer. Charging light horse archers was futile — the mangudai were faster. Standing in formation meant absorbing thousands of arrows. The tactic imposed a lethal dilemma: react and be drawn into ambush, or hold and be ground down by attrition.',
    battles: [
      { name: 'Battle of Legnica (1241)', detail: 'Mangudai used smoke screens (possibly burning reeds with fat) to obscure their movements. Duke Henry II of Silesia\'s knights charged into the smoke and were cut down in isolation.' },
      { name: 'Invasion of Khwarezmia (1220)', detail: 'Mangudai screened the advance of the main army, engaging garrison sorties and preventing reconnaissance.' },
    ],
    enemyAdaptation: 'Some Islamic armies developed their own light cavalry counter-screens. The Mamluks trained horse archers specifically to match mangudai tactics. European armies never developed an effective counter — they had no equivalent troop type.',
    modernEquivalent: 'Standoff precision fires. Modern air support and precision-guided munitions achieve the same effect: destroying the enemy from a range at which they cannot respond. The mangudai were the medieval equivalent of attack helicopters.',
    svgDiagram: 'mangudai',
  },
  {
    id: 'nervewar', name: 'Nerve War (Psychological Operations)',
    category: 'INFORMATION WARFARE',
    description: 'Before any army arrived, the Mongols\' reputation preceded them. Merchants were allowed to flee cities, carrying stories of total destruction. Agents infiltrated target cities months before the army, spreading rumors and encouraging surrender. Cities that surrendered were spared; cities that resisted were destroyed with calculated, theatrical brutality. The calculus was simple and universally publicized.',
    whyItWorked: 'Every city facing the Mongols confronted the same game theory: resist and face annihilation, or surrender and survive. The Mongols spent the first few campaigns establishing the credibility of this threat through extreme violence. After that, many cities surrendered without a fight. Each surrender reduced Mongol casualties, reinforcing the strategy. It was a self-amplifying cycle.',
    battles: [
      { name: 'Fall of Bukhara (1220)', detail: 'Genghis told the people: "I am the punishment of God. If you had not committed great sins, God would not have sent a punishment like me." The quote (possibly apocryphal) circulated across Central Asia within weeks.' },
      { name: 'Siege of Baghdad (1258)', detail: 'Hulagu sent envoys warning the Caliph of total destruction. The Caliph refused. Baghdad was sacked and the irrigation systems destroyed. The example terrified the entire Middle East — Damascus surrendered without a fight.' },
    ],
    enemyAdaptation: 'Difficult to counter. Some rulers tried to match Mongol brutality in reverse (executing Mongol envoys), which invariably provoked catastrophic retaliation. The most effective counter was simply surrendering early, which Mongol policy explicitly incentivized.',
    modernEquivalent: 'Strategic communication and "shock and awe" doctrine. The 2003 Iraq invasion was explicitly designed to achieve psychological paralysis through overwhelming initial strikes. The Mongol approach was the medieval precursor — using information as a weapon system.',
    svgDiagram: 'nervewar',
  },
  {
    id: 'siege_adopt', name: 'Siege Technology Adoption',
    category: 'TECHNOLOGY INTEGRATION',
    description: 'Steppe nomads had no siege tradition. The Mongols solved this fundamental limitation by absorbing engineers from every civilization they conquered. Chinese sappers provided gunpowder and mining. Persian engineers built counterweight trebuchets (capable of hurling 100kg projectiles 300m). Arab specialists contributed naphtha incendiaries. All were organized into dedicated engineering corps attached to field armies.',
    whyItWorked: 'No other nomadic empire successfully integrated sedentary siege technology. The Mongols\' willingness to adopt foreign expertise — without cultural prejudice — gave them a capability no steppe army had ever possessed. By 1258, Mongol siege capability matched or exceeded any contemporary civilization.',
    battles: [
      { name: 'Siege of Xiangyang (1268-1273)', detail: 'Muslim engineers Ismail and Ala al-Din built hui-hui pao (counterweight trebuchets) that could hurl 150kg stones. These outranged all Song defenses. The 5-year siege was won by engineering superiority.' },
      { name: 'Siege of Baghdad (1258)', detail: 'Combined Chinese, Persian, and Mongol engineering corps breached the walls in 12 days. Environmental warfare: Hulagu broke the river dykes, flooding the Abbasid cavalry\'s retreat route.' },
    ],
    enemyAdaptation: 'Defenders improved fortifications — thicker walls, deeper moats, counter-trebuchets. The Song Dynasty developed explosive bombs and fire-lances (proto-firearms). But the Mongols absorbed these innovations too, creating an arms race they consistently won.',
    modernEquivalent: 'Joint capability integration. Modern militaries combine air, land, sea, cyber, and space capabilities from diverse sources into unified operational concepts. The Mongol siege corps — combining Chinese, Persian, and European technology under Mongol command — was the first successful multi-national military technology integration program.',
    svgDiagram: 'siege_adopt',
  },
  {
    id: 'intel_network', name: 'Intelligence Network & Yam C2',
    category: 'COMMAND & CONTROL',
    description: 'The Mongol Empire operated the most sophisticated intelligence network of the medieval world. Merchants served as intelligence collectors, reporting on military dispositions, political instability, and economic conditions. The yam (relay post) system provided command-and-control (C2) communications across thousands of miles. Intelligence products informed campaign planning months or years before forces deployed.',
    whyItWorked: 'The Mongols knew more about their enemies than their enemies knew about themselves. Before the invasion of Khwarezmia, Mongol intelligence had mapped garrison dispositions, identified political rivalries, and recruited defectors. This information asymmetry was a decisive advantage — the Mongols never fought blind.',
    battles: [
      { name: 'Invasion of Europe (1241)', detail: 'Subotai had intelligence on European military organization, castle locations, and political divisions from merchants and Cuman refugees years before the campaign. The route through the Carpathian passes was pre-scouted.' },
      { name: 'Invasion of Khwarezmia (1219)', detail: 'Mongol merchants had mapped the Shah\'s troop dispositions across the empire. When the invasion came, Genghis knew exactly where each garrison was stationed and exploited the gaps between them.' },
    ],
    enemyAdaptation: 'Some rulers tried to restrict Mongol merchant access, which ironically provided less intelligence to the defenders (they lost trade revenue) while confirming Mongol suspicions of hostility. The intelligence advantage was nearly impossible to counter because the Mongol merchant network was too large and too deeply embedded.',
    modernEquivalent: 'HUMINT (human intelligence) networks and modern C4ISR (Command, Control, Communications, Computers, Intelligence, Surveillance, Reconnaissance). The yam system was functionally equivalent to a fiber-optic communications backbone — providing real-time situational awareness across continental distances.',
    svgDiagram: 'intel',
  },
  {
    id: 'decimal_org', name: 'Decimal Organization',
    category: 'FORCE STRUCTURE',
    description: 'The entire Mongol military was organized in base-10 units: arban (10), zuun/jagun (100), mingghan (1,000), and tumen (10,000). Each level was a self-contained combined-arms formation with its own commander. Units were deliberately composed across tribal lines. Promotions were meritocratic. Any formation from 10 to 10,000 could operate independently.',
    whyItWorked: 'The decimal system solved the fundamental problem of steppe military organization: tribal loyalty. By mixing tribesmen into multi-clan units, Genghis destroyed the tribal power structure and redirected loyalty to the chain of command. This created professional soldiers out of tribal warriors. The modular structure also allowed rapid task-organization — tumens could be split or combined as the situation demanded.',
    battles: [
      { name: 'Multi-front campaigns', detail: 'The decimal system enabled simultaneous operations across thousands of miles. At Mohi and Legnica (1241), separate tumens operated 300 miles apart with precise coordination — impossible without standardized organization.' },
      { name: 'Garrison duty', detail: 'After conquests, mingghans were detached for garrison duty while the main force continued operations. The modular structure made this seamless — no reorganization required.' },
    ],
    enemyAdaptation: 'European feudal armies were organized by personal loyalty to lords, making them inflexible and slow to reorganize. Some Islamic armies adopted decimal-like structures (the Mamluk system), but none achieved the Mongol level of meritocratic flexibility.',
    modernEquivalent: 'Modern military task organization. US Army brigade combat teams (BCTs) are modular, self-contained formations that can be attached to different divisions as needed — the direct descendant of the tumen concept. NATO\'s standardized unit structure serves the same purpose: interoperability across national boundaries.',
    svgDiagram: 'decimal_org',
  },
];

var BATTLE_SCENARIOS = [
  {
    id: 'bs1',
    title: 'Fortress City Refuses Surrender (c. 1220)',
    situation: 'Your tumen approaches a fortified city of 50,000 people with strong walls, a deep moat, and a garrison of 8,000. The governor has executed your envoys and hung their bodies from the walls. You have 10,000 mounted troops, no siege engines, and a campaign timetable that does not permit a prolonged siege. Other cities in the region are watching to see what happens here.',
    options: [
      { tacticId: 'nervewar', label: 'Psychological warfare: devastate the surrounding countryside, display captured prisoners, send messengers to other cities describing what awaits resisters', result: 'Historically effective. After devastating the area and making examples of smaller settlements, many garrisons reconsidered. At Nishapur (1221), the Mongols razed the city completely after it resisted, and neighboring cities surrendered immediately. However, this takes time — weeks of demonstration before the garrison might break.' },
      { tacticId: 'siege_adopt', label: 'Bring up siege engineers: construct trebuchets from local timber, mine under the walls, divert water sources', result: 'The Mongol solution from mid-campaign onward. Once Chinese engineers were integrated, the Mongols could reduce fortified cities systematically. At Baghdad (1258), walls fell in 12 days. But this requires having engineers available — in early campaigns, this capability was limited.' },
      { tacticId: 'intel_network', label: 'Exploit intelligence: identify disaffected factions inside the city, bribe gatekeepers, send agents to open gates at night', result: 'Used repeatedly throughout the conquests. The Mongols bribed Khitan gatekeepers to open sections of the Great Wall. At several Central Asian cities, internal factions opened gates rather than face siege. This was the preferred approach when available — it cost the fewest Mongol lives.' },
    ],
  },
  {
    id: 'bs2',
    title: 'Heavy Cavalry Force on Open Field (c. 1241)',
    situation: 'Your 30,000 Mongol cavalry face 20,000 European heavy cavalry — armored knights trained for the massed charge. The terrain is a broad river plain with scattered tree lines. The enemy has formed a dense line of battle and is advancing at the walk, building to a charge. Their armor is nearly impervious to arrows at range. Once they reach full gallop, their mass charge will crush anything in its path. You cannot match them in melee combat.',
    options: [
      { tacticId: 'feigned_retreat', label: 'Feigned retreat: engage briefly, break, flee in apparent disorder, draw the knights into a pursuit that stretches their formation over kilometers, then encircle', result: 'The classic Mongol answer to heavy cavalry. At Mohi (1241), Subotai executed exactly this. Hungarian knights charged, Mongols fled, the pursuit stretched over miles. Flanking forces closed in. The "golden bridge" escape gap ensured fleeing knights spread panic rather than fighting to the death. Total Hungarian casualties: ~10,000 killed.' },
      { tacticId: 'mangudai', label: 'Mangudai harassment: keep maximum distance, fire arrow volleys at horses (not riders), force the enemy to charge repeatedly into empty space until their horses are exhausted', result: 'Highly effective against armored opponents. Arrows could not penetrate plate armor, but horses were less protected. Killing or wounding horses dismounted knights, who were nearly helpless on foot in heavy armor. At Legnica (1241), Mongol archers systematically targeted horses. The key was patience — this could take hours.' },
      { tacticId: 'decimal_org', label: 'Coordinated multi-axis attack: split into three tumens, pin the enemy frontally with one while the other two swing wide and strike both flanks simultaneously', result: 'Standard Mongol operational doctrine when forces were sufficient. The decimal organization made rapid task-organization possible. Three independent forces could coordinate because each tumen commander understood the intent. Used at the decisive phase of most major battles. Risk: if the pinning force was overrun before flanking forces arrived, the plan collapsed.' },
    ],
  },
  {
    id: 'bs3',
    title: 'Naval Defense Blocks Advance (c. 1270)',
    situation: 'Your army of 100,000 has conquered everything north of the great river. But the enemy controls the river with a powerful fleet of armored warships, and their richest territories lie to the south. Cavalry cannot swim across — the river is 1-2 km wide with strong currents. Enemy river fortresses at key crossing points have resisted all previous attempts. Your army has no naval tradition whatsoever. Retreat is politically impossible.',
    options: [
      { tacticId: 'siege_adopt', label: 'Cross-domain adaptation: recruit shipwrights and naval specialists from conquered peoples, build a river fleet from scratch, besiege the key river fortresses with combined land-naval operations', result: 'Exactly what Kublai Khan did at Xiangyang (1268-1273). He recruited Chinese and Korean shipwrights, built hundreds of river vessels, and conducted a 5-year combined-arms siege. Muslim engineers provided the trebuchets that broke the fortress defenses. It required extraordinary patience and resource commitment, but it worked — after Xiangyang fell, the river defenses collapsed in sequence.' },
      { tacticId: 'intel_network', label: 'Find alternate crossings: use intelligence networks to locate fords, undefended stretches, or seasonal low-water points where a forced crossing might succeed', result: 'Attempted by several Mongol commanders. Forced river crossings were extremely costly against prepared defenses. The Song Dynasty had centuries of experience defending the Yangtze. Secondary crossings might succeed but would leave the force isolated on the far bank without supply lines. This approach complemented but could not replace a systematic naval campaign.' },
      { tacticId: 'nervewar', label: 'Blockade and psychological pressure: cut all trade across the river, starve the southern economy, demonstrate willingness to wait indefinitely, and encourage defection by offering favorable terms to surrendering commanders', result: 'Partially effective. Economic pressure weakened Song resolve over time, and several Song commanders defected to the Mongols (notably Liu Zheng, whose defection was crucial). But the Song economy was largely self-sufficient south of the Yangtze. Blockade alone would take decades. Kublai used this approach alongside, not instead of, the military campaign.' },
    ],
  },
];

// ── Empire Sustainability Data ──────────────────────────────────────
var KHANATES = ['Yuan Dynasty', 'Chagatai Khanate', 'Golden Horde', 'Ilkhanate'];
var KHANATE_KEYS = ['yuan', 'chagatai', 'golden_horde', 'ilkhanate'];
var EMPIRE_FACTORS = ['Geographic Coherence', 'Cultural Absorption', 'Succession Mechanism', 'Economic Base', 'Military Capability'];
var FACTOR_KEYS = ['geography', 'culture', 'succession', 'economy', 'military'];

var EMPIRE_MATRIX = {
  yuan: {
    duration: '1271-1368 (97 years)',
    geography: { rating: 'green', summary: 'Compact, well-defined territory centered on China proper. Internal communications via Grand Canal and road networks. Natural boundaries (seas, mountains, deserts) provided defensible borders.', detail: 'The Yuan controlled the most administratively coherent territory of any successor state. China had millennia of unified governance precedent. The Grand Canal connected north and south. The Great Wall system provided a northern defense line. Geographic coherence was the Yuan\'s greatest structural advantage.' },
    culture: { rating: 'red', summary: 'Fatal cultural divide. Mongol rulers remained a foreign elite ruling 60+ million Chinese. Four-class racial hierarchy (Mongols, Semu, Han, Southerners) bred resentment.', detail: 'Kublai Khan adopted Chinese administrative forms but maintained Mongol cultural separation. The four-class system placed ethnic Chinese at the bottom. Mongols refused to learn Chinese; Chinese scholars were excluded from top positions. This cultural apartheid generated the popular resentment that fueled the Red Turban Rebellion and the Ming restoration. Cultural absorption was the Yuan\'s fatal weakness.' },
    succession: { rating: 'red', summary: 'Catastrophic succession instability. 11 emperors in 97 years. Multiple civil wars. No stable succession mechanism after Kublai.', detail: 'After Kublai Khan\'s death (1294), the Yuan experienced chronic succession crises. Between 1328 and 1332, four emperors ruled. Court factions assassinated and deposed rulers repeatedly. The Mongol tradition of lateral succession (brother to brother) clashed with Chinese primogeniture, creating perpetual ambiguity about legitimate succession. This instability fatally weakened central authority.' },
    economy: { rating: 'green', summary: 'Strongest economic base of any khanate. Controlled China\'s agricultural surplus, silk production, and the world\'s largest internal market. Pioneered paper currency.', detail: 'The Yuan inherited the most productive economy on Earth. Tax revenues from Chinese agriculture, commerce, and manufactures dwarfed all other khanates combined. The Grand Canal carried grain from south to north. Paper currency (chao) facilitated internal trade. International trade via maritime routes to Southeast Asia and the Indian Ocean. The economic base was never the problem — governance was.' },
    military: { rating: 'amber', summary: 'Initially powerful but declined as Mongol warrior culture eroded. Failed invasions of Japan (1274, 1281) and Java (1293) exposed naval limitations.', detail: 'The Yuan military combined Mongol cavalry with Chinese infantry and naval forces. On land, it remained formidable. At sea, it was a disaster — typhoons (kamikaze) destroyed invasion fleets targeting Japan twice. The failed overseas expeditions drained resources and prestige. Over time, garrison Mongols adopted sedentary lifestyles and lost combat effectiveness. By the 1340s, the military could not suppress domestic rebellion.' },
  },
  chagatai: {
    duration: '1227-1347 (120 years as unified state)',
    geography: { rating: 'red', summary: 'Worst geographic coherence. Vast territory spanning deserts, mountains, and oases with no natural unity. The Tian Shan mountains split the khanate into eastern (nomadic) and western (sedentary) halves.', detail: 'The Chagatai Khanate was geographically incoherent — a strip of Central Asian territory stretching from the Altai Mountains to Afghanistan, bisected by the Tian Shan range. The eastern half was nomadic steppe; the western half contained the sedentary oasis cities of Transoxiana (Samarkand, Bukhara). These two zones had fundamentally different economies, cultures, and political needs. The khanate eventually split along this geographic fault line.' },
    culture: { rating: 'amber', summary: 'Complex cultural dynamics. Western khans Islamized and urbanized; eastern khans maintained nomadic Mongol traditions. The cultural split mirrored the geographic divide.', detail: 'The Chagatai Khanate experienced the most dramatic cultural transformation of any successor state. Western rulers like Kebek Khan (r. 1318-1326) adopted Islamic culture, built cities, and patronized Persian literature. Eastern rulers maintained traditional Mongol shamanism and nomadic lifestyle. Neither group could govern the other\'s territory effectively. The cultural bifurcation was both cause and consequence of the geographic split.' },
    succession: { rating: 'red', summary: 'Extremely unstable. Frequent civil wars between eastern and western factions. Multiple rival khans. The khanate split permanently around 1340.', detail: 'Chagatai succession was the most contested of any khanate. The western-eastern cultural divide produced rival claimants from both factions. Between 1334 and 1347, the khanate disintegrated through civil war. Tamerlane (Timur) emerged from the western Chagatai political chaos in the 1360s, but he was not a Chinggisid — he ruled through puppet khans, demonstrating the complete collapse of legitimate succession.' },
    economy: { rating: 'amber', summary: 'Silk Road transit revenues were significant but vulnerable. The oasis cities (Samarkand, Bukhara) generated wealth; the steppe zones produced little surplus.', detail: 'The Chagatai economy depended heavily on Silk Road transit trade — tolls, caravanserais, and commercial services. This revenue was real but vulnerable to disruption. When political instability increased, merchants rerouted through safer territories. The oasis cities had productive agriculture (irrigation-based), but the nomadic eastern territories generated minimal surplus beyond livestock. The economic base was adequate but not robust enough to survive political fragmentation.' },
    military: { rating: 'amber', summary: 'Retained traditional Mongol cavalry capability longer than other khanates but lacked the manpower for sustained campaigns. Effective at raiding, less so at holding territory.', detail: 'The eastern Chagatai maintained the purest form of traditional Mongol military organization. Their cavalry remained formidable in open steppe warfare. However, the khanate lacked the population base for large-scale campaigns. Military strength was sufficient for internal warfare and raiding but could not project power externally. Tamerlane later rebuilt Central Asian military power by drawing on Chagatai traditions combined with sedentary resources.' },
  },
  golden_horde: {
    duration: '1227-1502 (275 years)',
    geography: { rating: 'amber', summary: 'Vast steppe territory from Ukraine to Siberia. Geographic coherence was moderate — the steppe provided natural unity for nomadic governance, but the enormous distances strained communications.', detail: 'The Golden Horde controlled the western steppe zone from the Ural River to the Danube. This was ideal nomadic territory — flat, grassy, and suited to horse-based governance. The Russian principalities (Moscow, Novgorod, etc.) were tributary states rather than directly governed. The southern frontier faced the Ilkhanate across the Caucasus. Geographic coherence was moderate: the steppe itself was unified, but controlling the Russian tributaries required a different governance model.' },
    culture: { rating: 'green', summary: 'Gradual Islamization without alienating the Mongol military elite. Maintained Mongol political traditions while adopting Turkic-Islamic cultural forms. Relatively smooth cultural synthesis.', detail: 'The Golden Horde achieved the most successful cultural integration of any successor state. Berke Khan (r. 1260-1266) converted to Islam, but Mongol political and military traditions continued. The Horde adopted Turkic as a lingua franca while maintaining Mongol administrative structures. Russian tributaries were governed indirectly, avoiding the cultural confrontation that destroyed the Yuan. This pragmatic synthesis sustained the state for nearly three centuries.' },
    succession: { rating: 'amber', summary: 'Relatively stable for two centuries, then catastrophic decline. The Chinggisid principle held until the 1360s. Tokhtamysh restored unity briefly (1380s) before Tamerlane\'s invasions.', detail: 'Golden Horde succession was more stable than other khanates for most of its history. The Batuid dynasty maintained control through the 13th century. Succession became contested in the 1360s ("Great Troubles"), but Tokhtamysh reunified the state in 1380 — even sacking Moscow. Tamerlane\'s devastating invasions (1395-1396) permanently weakened the Horde. After 1400, fragmentation into successor khanates (Kazan, Crimea, Astrakhan) was irreversible.' },
    economy: { rating: 'amber', summary: 'Based on tribute from Russian principalities, Silk Road northern route trade, and livestock. Less productive than China or Persia but sufficient for a nomadic state.', detail: 'The Golden Horde\'s economy combined nomadic pastoralism with tribute extraction from Russian principalities (the "Mongol yoke"). Sarai, the capital on the Volga, became a major trade hub connecting the Silk Road\'s northern branch to the Black Sea ports. Slave trade was significant. The economic base was sustainable but vulnerable — when Russian principalities grew stronger (especially Moscow), tribute payments declined. The economy was adequate for the Horde\'s low administrative overhead.' },
    military: { rating: 'green', summary: 'Maintained effective cavalry forces for nearly three centuries. Successfully defended against the Ilkhanate, controlled Russian tributaries, and projected power into Eastern Europe.', detail: 'The Golden Horde maintained the most consistently effective military of any successor state. Mongol-Turkic cavalry traditions were well-suited to the steppe environment. The Horde defeated the Ilkhanate in multiple Caucasus campaigns, sacked Moscow in 1382, and projected power into Poland and Lithuania. Military decline came from external shock (Tamerlane\'s invasions) rather than internal decay. Even the successor khanates (Crimea, Kazan) remained significant military powers into the 16th century.' },
  },
  ilkhanate: {
    duration: '1256-1335 (79 years)',
    geography: { rating: 'green', summary: 'Compact territory centered on the Iranian plateau with natural mountain boundaries. The Zagros and Caucasus provided defensive barriers. Internal communications via established Persian road networks.', detail: 'The Ilkhanate inherited one of the most geographically coherent regions in Asia. The Iranian plateau provided a natural core. Mountain ranges (Zagros, Caucasus, Hindu Kush) defined defensible borders. The Persian road and postal system predated the Mongols and provided excellent internal communications. The territory matched a historical political unit — Persia had been governed as a unified state for millennia.' },
    culture: { rating: 'green', summary: 'Successful cultural synthesis. Ilkhans converted to Islam (1295) and became patrons of Persian culture. Persian administrative traditions were adopted wholesale. The Mongol-Persian synthesis produced remarkable art and architecture.', detail: 'Ghazan Khan\'s conversion to Islam (1295) marked the decisive moment. Unlike the Yuan\'s racial hierarchy, the Ilkhans embraced Persian civilization — adopting Persian as the administrative language, patronizing Persian arts, and ruling through the established Persian bureaucracy. Rashid al-Din\'s Jami\' al-Tawarikh (Compendium of Chronicles) exemplifies the Mongol-Persian cultural synthesis. The Ilkhanate achieved genuine cultural integration rather than the cultural apartheid that destroyed the Yuan.' },
    succession: { rating: 'red', summary: 'Stable under strong rulers (Hulagu through Ghazan) but collapsed rapidly after Abu Said\'s death (1335). No succession mechanism survived the Chinggisid line\'s extinction.', detail: 'The Ilkhanate had strong governance under Ghazan (r. 1295-1304) and Oljeitu (r. 1304-1316). But when Abu Said died without an heir in 1335, the Chinggisid line in Persia was extinct. Without a legitimate successor, the state fragmented into competing successor dynasties within months. The Ilkhanate\'s short duration (79 years) was primarily caused by this succession failure — the structural dependence on Chinggisid legitimacy left no fallback when the line ended.' },
    economy: { rating: 'amber', summary: 'Persian agricultural and trade revenues were substantial but damaged by Mongol conquest. Irrigation systems destroyed in 1258 never fully recovered. Ghazan\'s tax reforms stabilized but could not fully restore the pre-conquest economy.', detail: 'The Mongol conquest devastated Persian and Mesopotamian agriculture — particularly the destruction of Baghdad\'s irrigation infrastructure (1258), which permanently reduced Mesopotamian productivity. Ghazan Khan implemented significant tax reforms (standardized rates, direct collection) that stabilized revenues. Silk Road trade through Tabriz generated substantial commercial income. But the pre-conquest economic peak was never regained, and heavy military expenditure (wars against the Mamluks and Golden Horde) strained finances.' },
    military: { rating: 'amber', summary: 'Initially powerful but unable to defeat the Mamluks in Syria. Failed campaigns at Ain Jalut (1260) and subsequent battles defined the southern frontier. Caucasus wars with the Golden Horde drained resources.', detail: 'The Ilkhanate military was formidable but fought on two fronts simultaneously — against the Mamluks in Syria and the Golden Horde across the Caucasus. The defeat at Ain Jalut (1260) was the first major Mongol loss in open battle, establishing that the Mongols were not invincible. Subsequent campaigns in Syria achieved temporary successes but never permanent conquest. The two-front military commitment gradually exhausted Ilkhanate resources and contributed to the state\'s relatively short duration.' },
  },
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
      { id: 'logistics', label: 'Logistics', desc: 'Campaign Calculator' },
      { id: 'doctrine', label: 'Doctrine', desc: '6 Tactical Systems' },
      { id: 'empire', label: 'Empire', desc: 'Fragmentation Analysis' },
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

  // ── Logistics Calculator Renderer ─────────────────────────────
  var renderLogistics = useCallback(function () {
    var t = TERRAIN_DATA[logTerrain];
    var s = SEASON_DATA[logSeason];
    var horsesPerWarrior = 4;
    var totalHorses = logArmySize * horsesPerWarrior;
    var dailyGrazingAcres = totalHorses * 10;
    var dailyGrazingKm2 = (dailyGrazingAcres * 0.00405).toFixed(1);
    var waterHorsesLiters = totalHorses * 40 * s.waterMod * t.waterMod;
    var waterMenLiters = logArmySize * 4 * s.waterMod;
    var totalWaterLiters = waterHorsesLiters + waterMenLiters;
    var totalWaterM3 = (totalWaterLiters / 1000).toFixed(0);
    var marchRateKm = Math.round(t.marchRate * s.speedMod);
    var campaignDays = Math.ceil(logDistance / marchRateKm);
    var campaignWeeks = (campaignDays / 7).toFixed(1);
    var grazingStress = dailyGrazingAcres * t.grazingMod * s.grazingMod;
    var grazingStressKm2 = (grazingStress * 0.00405).toFixed(1);
    // Crusader comparison
    var cHorses = Math.round(logArmySize * CRUSADER_MULTIPLIERS.horsesPerWarrior);
    var cGrainKg = logArmySize * CRUSADER_MULTIPLIERS.dailyGrain_kg;
    var cWagons = Math.round(logArmySize / 1000 * CRUSADER_MULTIPLIERS.wagonsPer1000);
    var cMarchRate = CRUSADER_MULTIPLIERS.marchRate;
    var cCampDays = Math.ceil(logDistance / cMarchRate);
    var cFollowers = logArmySize * CRUSADER_MULTIPLIERS.campFollowerRatio;
    var cTotalMouths = logArmySize + cFollowers;

    function SliderRow(props) {
      return (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: '.06em' }}>{props.label}</span>
            <span style={{ fontFamily: Mono, fontSize: 13, color: C.amber, fontWeight: 700 }}>{props.display}</span>
          </div>
          <input type="range" min={props.min} max={props.max} step={props.step || 1} value={props.value}
            onChange={function (e) { props.onChange(Number(e.target.value)); }}
            style={{ width: '100%', accentColor: C.amber, cursor: 'pointer' }} />
        </div>
      );
    }

    function ToggleRow(props) {
      return (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: '.06em', marginBottom: 6 }}>{props.label}</div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {props.options.map(function (opt) {
              var active = props.value === opt.id;
              return (
                <button key={opt.id} onClick={function () { props.onChange(opt.id); }}
                  style={{
                    padding: '6px 14px', borderRadius: 4, cursor: 'pointer',
                    background: active ? C.amberBg : 'transparent',
                    border: '1px solid ' + (active ? C.amberDm : C.line),
                    fontFamily: Mono, fontSize: 12, color: active ? C.amber : C.tx3,
                    transition: 'all .15s',
                  }}>
                  {opt.name}
                </button>
              );
            })}
          </div>
          <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6, marginTop: 8, paddingLeft: 12, borderLeft: '2px solid ' + C.line }}>
            {props.options.find(function (o) { return o.id === props.value; }).desc}
          </div>
        </div>
      );
    }

    function StatBlock(props) {
      return (
        <div style={{ background: props.bg || C.amberBg, borderRadius: 6, padding: '10px 14px', border: '1px solid ' + (props.borderColor || C.line) }}>
          <div style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.08em', color: props.labelColor || C.amberDm, marginBottom: 3 }}>{props.label}</div>
          <div style={{ fontFamily: Mono, fontSize: 18, fontWeight: 700, color: props.valueColor || C.amber }}>{props.value}</div>
          {props.sub && <div style={{ fontFamily: Sans, fontSize: 11, color: C.tx3, marginTop: 2 }}>{props.sub}</div>}
        </div>
      );
    }

    return (
      <div>
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.1em', color: C.amberDm, marginBottom: 6 }}>
          MONGOL LOGISTICS CALCULATOR
        </div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 20, maxWidth: 720 }}>
          The Mongol army's greatest innovation was not a weapon or a tactic -- it was a logistics system that required no supply lines. Every warrior was his own supply train: 3-5 horses (rotated during march), dried meat and fermented mare's milk, and the ability to drink horse blood in extremis. This calculator reveals why the Mongol system could sustain campaigns that would have been logistically impossible for any contemporary army.
        </div>
        <RopeHr style={{ marginBottom: 16 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Left: inputs */}
          <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 20 }}>
            <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.08em', color: C.tx3, marginBottom: 16 }}>CAMPAIGN PARAMETERS</div>
            <SliderRow label="ARMY SIZE" display={logArmySize.toLocaleString() + ' warriors'} min={10000} max={150000} step={5000} value={logArmySize} onChange={setLogArmySize} />
            <SliderRow label="CAMPAIGN DISTANCE" display={logDistance.toLocaleString() + ' km'} min={500} max={5000} step={100} value={logDistance} onChange={setLogDistance} />
            <ToggleRow label="TERRAIN TYPE" value={logTerrain} onChange={setLogTerrain}
              options={Object.keys(TERRAIN_DATA).map(function (k) { return Object.assign({ id: k }, TERRAIN_DATA[k]); })} />
            <ToggleRow label="SEASON" value={logSeason} onChange={setLogSeason}
              options={Object.keys(SEASON_DATA).map(function (k) { return Object.assign({ id: k }, SEASON_DATA[k]); })} />
          </div>

          {/* Right: outputs */}
          <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 20 }}>
            <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.08em', color: C.tx3, marginBottom: 16 }}>MONGOL ARMY REQUIREMENTS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              <StatBlock label="HORSES REQUIRED" value={totalHorses.toLocaleString()} sub={horsesPerWarrior + ' per warrior (rotated)'} />
              <StatBlock label="DAILY GRAZING" value={dailyGrazingKm2 + ' km\u00B2'} sub={dailyGrazingAcres.toLocaleString() + ' acres minimum'} />
              <StatBlock label="DAILY WATER" value={totalWaterM3 + ' m\u00B3'} sub={'Horses: ' + Math.round(waterHorsesLiters / 1000) + ' m\u00B3 / Men: ' + Math.round(waterMenLiters / 1000) + ' m\u00B3'} />
              <StatBlock label="MARCH RATE" value={marchRateKm + ' km/day'} sub={t.name + ' / ' + s.name} />
              <StatBlock label="CAMPAIGN DURATION" value={campaignDays + ' days'} sub={'~' + campaignWeeks + ' weeks at sustained pace'} />
              <StatBlock label="GRAZING STRESS" value={grazingStressKm2 + ' km\u00B2/day'} sub="Adjusted for terrain + season" />
            </div>

            {/* Key insight */}
            <div style={{ background: C.greenBg, border: '1px solid ' + C.greenDm + '33', borderRadius: 6, padding: '12px 16px', marginBottom: 12 }}>
              <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.green, marginBottom: 6 }}>KEY INSIGHT: NO SUPPLY LINES</div>
              <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7 }}>
                The Mongol army required <strong style={{ color: C.green }}>zero wagons</strong> and <strong style={{ color: C.green }}>zero supply lines</strong>. Horses grazed on available pasture. Warriors carried dried meat (borts) and fermented mare's milk (airag). In extremis, warriors drank horse blood by opening a vein, then sealing it. This self-sufficiency meant there was no supply line to cut, no wagon train to ambush, and no logistical tail to slow the advance.
              </div>
            </div>
          </div>
        </div>

        {/* Crusader comparison */}
        <ArrowDivider />
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.08em', color: C.red, marginBottom: 12 }}>
          COMPARATIVE ANALYSIS: EUROPEAN CRUSADER ARMY OF EQUAL SIZE
        </div>
        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
            <StatBlock label="HORSES (WAR + PACK)" value={cHorses.toLocaleString()} sub="Only 1.5 per warrior (no rotation)" labelColor={C.red} valueColor={C.red} bg={C.redBg} borderColor={C.redDm + '33'} />
            <StatBlock label="DAILY GRAIN" value={Math.round(cGrainKg / 1000) + ' tonnes'} sub={cGrainKg.toLocaleString() + ' kg (no grass-only horses)'} labelColor={C.red} valueColor={C.red} bg={C.redBg} borderColor={C.redDm + '33'} />
            <StatBlock label="SUPPLY WAGONS" value={cWagons.toLocaleString()} sub="30 per 1,000 men (ox-drawn)" labelColor={C.red} valueColor={C.red} bg={C.redBg} borderColor={C.redDm + '33'} />
            <StatBlock label="CAMP FOLLOWERS" value={cFollowers.toLocaleString()} sub="3:1 ratio (servants, smiths, clergy)" labelColor={C.red} valueColor={C.red} bg={C.redBg} borderColor={C.redDm + '33'} />
            <StatBlock label="TOTAL MOUTHS" value={cTotalMouths.toLocaleString()} sub="Army + followers (all need food)" labelColor={C.red} valueColor={C.red} bg={C.redBg} borderColor={C.redDm + '33'} />
            <StatBlock label="CAMPAIGN DURATION" value={cCampDays + ' days'} sub={'At ' + cMarchRate + ' km/day (vs Mongol ' + marchRateKm + ')'} labelColor={C.red} valueColor={C.red} bg={C.redBg} borderColor={C.redDm + '33'} />
          </div>

          {/* Speed comparison bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 8 }}>CAMPAIGN COMPLETION TIME</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: Mono, fontSize: 11, color: C.amber, width: 80 }}>Mongol</span>
              <div style={{ flex: 1, height: 18, background: C.line, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: Math.min(100, campaignDays / Math.max(campaignDays, cCampDays) * 100) + '%', height: '100%', background: C.amber, borderRadius: 3 }} />
              </div>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.amber, width: 80, textAlign: 'right' }}>{campaignDays} days</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: Mono, fontSize: 11, color: C.red, width: 80 }}>Crusader</span>
              <div style={{ flex: 1, height: 18, background: C.line, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: Math.min(100, cCampDays / Math.max(campaignDays, cCampDays) * 100) + '%', height: '100%', background: C.red, borderRadius: 3 }} />
              </div>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.red, width: 80, textAlign: 'right' }}>{cCampDays} days</span>
            </div>
          </div>

          <div style={{ background: C.redBg, border: '1px solid ' + C.redDm + '33', borderRadius: 6, padding: '12px 16px' }}>
            <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.red, marginBottom: 6 }}>THE LOGISTICS GAP</div>
            <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7 }}>
              A Crusader army of {logArmySize.toLocaleString()} warriors would require <strong style={{ color: C.red }}>{cWagons.toLocaleString()} supply wagons</strong>, <strong style={{ color: C.red }}>{Math.round(cGrainKg / 1000)} tonnes of grain per day</strong>, and <strong style={{ color: C.red }}>{cFollowers.toLocaleString()} camp followers</strong>. Its supply line would stretch hundreds of miles behind the army -- vulnerable to raiding, dependent on roads, and requiring constant guarding. Cut the supply line and the army starves within days. The Mongol army had no supply line to cut. It was, in the words of military historians, a "self-propelled weapons platform" that consumed nothing but grass.
            </div>
          </div>
        </div>
      </div>
    );
  }, [logArmySize, logDistance, logTerrain, logSeason]);

  // ── Doctrine Analyzer Renderer ────────────────────────────────
  var renderDoctrine = useCallback(function () {
    var tactic = DOCTRINE_TACTICS[doctrineSelected];

    function TacticDiagram(props) {
      var tid = props.tacticId;
      var w = 320, h = 180;
      if (tid === 'feigned') return (
        <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', maxWidth: w, display: 'block', margin: '0 auto 16px' }}>
          <rect width={w} height={h} fill={C.leather} rx="4" />
          {/* Enemy line */}
          <rect x="200" y="60" width="80" height="30" rx="3" fill={C.red} fillOpacity=".2" stroke={C.red} strokeWidth="1" />
          <text x="240" y="80" fill={C.red} fontSize="9" fontFamily={Mono} textAnchor="middle">ENEMY</text>
          {/* Phase 1: Mongol vanguard retreats */}
          <circle cx="140" cy="75" r="12" fill={C.amber} fillOpacity=".15" stroke={C.amber} strokeWidth="1" />
          <text x="140" y="78" fill={C.amber} fontSize="7" fontFamily={Mono} textAnchor="middle">VAN</text>
          <path d="M128 75 L80 90" stroke={C.amber} strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#darr)" />
          <text x="90" y="105" fill={C.tx3} fontSize="8" fontFamily={Mono}>1. RETREAT</text>
          {/* Phase 2: Enemy pursues */}
          <path d="M200 75 L160 82" stroke={C.red} strokeWidth="1" strokeDasharray="3,3" />
          <text x="170" y="115" fill={C.red} fontSize="8" fontFamily={Mono}>2. PURSUIT</text>
          {/* Phase 3: Flanking forces */}
          <circle cx="60" cy="40" r="10" fill={C.green} fillOpacity=".15" stroke={C.green} strokeWidth="1" />
          <text x="60" y="43" fill={C.green} fontSize="6" fontFamily={Mono} textAnchor="middle">FLANK</text>
          <path d="M70 45 L150 70" stroke={C.green} strokeWidth="1.2" markerEnd="url(#darr)" />
          <circle cx="60" cy="120" r="10" fill={C.green} fillOpacity=".15" stroke={C.green} strokeWidth="1" />
          <text x="60" y="123" fill={C.green} fontSize="6" fontFamily={Mono} textAnchor="middle">FLANK</text>
          <path d="M70 115 L150 85" stroke={C.green} strokeWidth="1.2" markerEnd="url(#darr)" />
          <text x="40" y="155" fill={C.green} fontSize="8" fontFamily={Mono}>3. ENCIRCLE</text>
          {/* Golden bridge gap */}
          <path d="M280 75 L310 75" stroke={C.gold} strokeWidth="2" strokeDasharray="2,4" />
          <text x="280" y="50" fill={C.gold} fontSize="7" fontFamily={Mono}>GOLDEN</text>
          <text x="280" y="58" fill={C.gold} fontSize="7" fontFamily={Mono}>BRIDGE</text>
          <defs><marker id="darr" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,6 2.5,0 5" fill={C.amber} /></marker></defs>
        </svg>
      );
      if (tid === 'mangudai') return (
        <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', maxWidth: w, display: 'block', margin: '0 auto 16px' }}>
          <rect width={w} height={h} fill={C.leather} rx="4" />
          {/* Enemy formation (static block) */}
          <rect x="140" y="50" width="60" height="80" rx="3" fill={C.red} fillOpacity=".15" stroke={C.red} strokeWidth="1" />
          <text x="170" y="95" fill={C.red} fontSize="9" fontFamily={Mono} textAnchor="middle">ENEMY</text>
          <text x="170" y="105" fill={C.red} fontSize="7" fontFamily={Mono} textAnchor="middle">(static)</text>
          {/* Mangudai circling */}
          <ellipse cx="170" cy="90" rx="120" ry="70" fill="none" stroke={C.amber} strokeWidth="1" strokeDasharray="6,4" opacity=".5" />
          {/* Mangudai riders */}
          {[30, 90, 240, 300].map(function (angle, i) {
            var rad = angle * Math.PI / 180;
            var cx = 170 + 120 * Math.cos(rad);
            var cy = 90 + 70 * Math.sin(rad);
            return <g key={i}><circle cx={cx} cy={cy} r="8" fill={C.amber} fillOpacity=".2" stroke={C.amber} strokeWidth=".8" /><text x={cx} y={cy + 3} fill={C.amber} fontSize="6" fontFamily={Mono} textAnchor="middle">M</text></g>;
          })}
          {/* Arrows (arrow volleys) */}
          <line x1="70" y1="55" x2="135" y2="70" stroke={C.gold} strokeWidth=".6" strokeDasharray="2,2" />
          <line x1="70" y1="125" x2="135" y2="110" stroke={C.gold} strokeWidth=".6" strokeDasharray="2,2" />
          <line x1="270" y1="55" x2="205" y2="70" stroke={C.gold} strokeWidth=".6" strokeDasharray="2,2" />
          <line x1="270" y1="125" x2="205" y2="110" stroke={C.gold} strokeWidth=".6" strokeDasharray="2,2" />
          <text x="20" y="170" fill={C.tx3} fontSize="8" fontFamily={Mono}>Continuous arrow fire from 200-300m. Never close to melee.</text>
        </svg>
      );
      if (tid === 'nervewar') return (
        <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', maxWidth: w, display: 'block', margin: '0 auto 16px' }}>
          <rect width={w} height={h} fill={C.leather} rx="4" />
          {/* City */}
          <rect x="120" y="40" width="80" height="60" rx="2" fill={C.tx3} fillOpacity=".1" stroke={C.tx3} strokeWidth="1" />
          <text x="160" y="65" fill={C.tx3} fontSize="8" fontFamily={Mono} textAnchor="middle">TARGET</text>
          <text x="160" y="75" fill={C.tx3} fontSize="8" fontFamily={Mono} textAnchor="middle">CITY</text>
          {/* Refugees fleeing ahead */}
          <path d="M200 50 Q240 30 280 20" stroke={C.gold} strokeWidth="1" strokeDasharray="3,3" />
          <text x="250" y="15" fill={C.gold} fontSize="7" fontFamily={Mono}>REFUGEES</text>
          <text x="250" y="23" fill={C.gold} fontSize="7" fontFamily={Mono}>(spreading terror)</text>
          {/* Agents inside */}
          <circle cx="145" cy="60" r="4" fill={C.amber} fillOpacity=".4" />
          <text x="145" y="90" fill={C.amber} fontSize="7" fontFamily={Mono} textAnchor="middle">AGENTS</text>
          {/* Destroyed city example */}
          <rect x="20" y="130" width="50" height="30" rx="2" fill={C.red} fillOpacity=".1" stroke={C.red} strokeWidth=".8" strokeDasharray="3,2" />
          <text x="45" y="150" fill={C.red} fontSize="7" fontFamily={Mono} textAnchor="middle">RAZED</text>
          <path d="M70 145 L120 85" stroke={C.red} strokeWidth=".8" strokeDasharray="3,3" />
          <text x="80" y="120" fill={C.red} fontSize="7" fontFamily={Mono}>EXAMPLE</text>
          {/* Army approaching */}
          <path d="M30 60 L110 65" stroke={C.amber} strokeWidth="1.5" markerEnd="url(#darr)" />
          <text x="30" y="50" fill={C.amber} fontSize="8" fontFamily={Mono}>ARMY</text>
        </svg>
      );
      if (tid === 'siege_adopt') return (
        <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', maxWidth: w, display: 'block', margin: '0 auto 16px' }}>
          <rect width={w} height={h} fill={C.leather} rx="4" />
          {/* Fortress wall */}
          <rect x="160" y="20" width="100" height="140" rx="2" fill={C.tx3} fillOpacity=".08" stroke={C.tx3} strokeWidth="1.5" />
          <text x="210" y="95" fill={C.tx3} fontSize="9" fontFamily={Mono} textAnchor="middle">FORTRESS</text>
          {/* Trebuchet */}
          <line x1="60" y1="120" x2="60" y2="70" stroke={C.amber} strokeWidth="1.5" />
          <line x1="40" y1="120" x2="80" y2="120" stroke={C.amber} strokeWidth="1" />
          <line x1="60" y1="70" x2="50" y2="80" stroke={C.amber} strokeWidth="1" />
          <path d="M60 70 Q100 20 155 40" stroke={C.gold} strokeWidth=".8" strokeDasharray="3,2" />
          <circle cx="155" cy="40" r="4" fill={C.gold} fillOpacity=".3" stroke={C.gold} strokeWidth=".6" />
          <text x="40" y="140" fill={C.amber} fontSize="7" fontFamily={Mono}>PERSIAN</text>
          <text x="40" y="148" fill={C.amber} fontSize="7" fontFamily={Mono}>TREBUCHET</text>
          {/* Sappers */}
          <line x1="100" y1="150" x2="160" y2="150" stroke={C.green} strokeWidth="1" strokeDasharray="2,2" />
          <text x="110" y="165" fill={C.green} fontSize="7" fontFamily={Mono}>CHINESE SAPPERS</text>
          {/* Legend */}
          <text x="200" y="170" fill={C.tx3} fontSize="7" fontFamily={Mono}>Multi-civilization siege corps</text>
        </svg>
      );
      if (tid === 'intel') return (
        <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', maxWidth: w, display: 'block', margin: '0 auto 16px' }}>
          <rect width={w} height={h} fill={C.leather} rx="4" />
          {/* Central hub (Karakorum) */}
          <circle cx="160" cy="90" r="20" fill={C.amber} fillOpacity=".1" stroke={C.amber} strokeWidth="1" />
          <text x="160" y="88" fill={C.amber} fontSize="7" fontFamily={Mono} textAnchor="middle">KARAKORUM</text>
          <text x="160" y="97" fill={C.amber} fontSize="6" fontFamily={Mono} textAnchor="middle">HQ</text>
          {/* Yam stations radiating out */}
          {[
            { x: 40, y: 40, label: 'EUROPE' }, { x: 280, y: 30, label: 'CHINA' },
            { x: 40, y: 140, label: 'PERSIA' }, { x: 280, y: 150, label: 'KOREA' },
          ].map(function (node) {
            return (
              <g key={node.label}>
                <line x1="160" y1="90" x2={node.x} y2={node.y} stroke={C.gold} strokeWidth=".6" strokeDasharray="4,3" />
                <circle cx={node.x} cy={node.y} r="6" fill={C.gold} fillOpacity=".15" stroke={C.gold} strokeWidth=".6" />
                <text x={node.x} y={node.y + 16} fill={C.gold} fontSize="7" fontFamily={Mono} textAnchor="middle">{node.label}</text>
                {/* Intermediate yam stations */}
                <circle cx={(160 + node.x) / 2} cy={(90 + node.y) / 2} r="3" fill={C.tx3} fillOpacity=".3" />
              </g>
            );
          })}
          <text x="160" y="170" fill={C.tx3} fontSize="7" fontFamily={Mono} textAnchor="middle">YAM relay: 200+ miles/day. Merchants = intelligence collectors.</text>
        </svg>
      );
      if (tid === 'decimal_org') return (
        <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', maxWidth: w, display: 'block', margin: '0 auto 16px' }}>
          <rect width={w} height={h} fill={C.leather} rx="4" />
          {/* Tumen (10,000) */}
          <circle cx="160" cy="25" r="14" fill={C.amber} fillOpacity=".15" stroke={C.amber} strokeWidth="1" />
          <text x="160" y="28" fill={C.amber} fontSize="7" fontFamily={Mono} textAnchor="middle">TUMEN</text>
          <text x="200" y="28" fill={C.tx3} fontSize="7" fontFamily={Mono}>10,000</text>
          {/* Mingghans */}
          {[80, 160, 240].map(function (cx, i) {
            return (
              <g key={i}>
                <line x1="160" y1="39" x2={cx} y2="55" stroke={C.amber} strokeWidth=".6" />
                <circle cx={cx} cy="65" r="10" fill={C.gold} fillOpacity=".1" stroke={C.gold} strokeWidth=".8" />
                <text x={cx} y="68" fill={C.gold} fontSize="6" fontFamily={Mono} textAnchor="middle">1,000</text>
              </g>
            );
          })}
          {/* Jaguns from middle mingghan */}
          {[120, 160, 200].map(function (cx, i) {
            return (
              <g key={i}>
                <line x1="160" y1="75" x2={cx} y2="95" stroke={C.gold} strokeWidth=".4" />
                <circle cx={cx} cy="102" r="7" fill={C.green} fillOpacity=".1" stroke={C.green} strokeWidth=".6" />
                <text x={cx} y="104" fill={C.green} fontSize="5" fontFamily={Mono} textAnchor="middle">100</text>
              </g>
            );
          })}
          {/* Arbans from middle jagun */}
          {[140, 160, 180].map(function (cx, i) {
            return (
              <g key={i}>
                <line x1="160" y1="109" x2={cx} y2="125" stroke={C.green} strokeWidth=".3" />
                <circle cx={cx} cy="130" r="5" fill={C.blue} fillOpacity=".1" stroke={C.blue} strokeWidth=".5" />
                <text x={cx} y="132" fill={C.blue} fontSize="4" fontFamily={Mono} textAnchor="middle">10</text>
              </g>
            );
          })}
          <text x="160" y="155" fill={C.tx3} fontSize="7" fontFamily={Mono} textAnchor="middle">Modular, meritocratic, cross-tribal. Each level self-contained.</text>
          <text x="160" y="165" fill={C.tx3} fontSize="7" fontFamily={Mono} textAnchor="middle">Tumen = 10 mingghan = 100 jagun = 1,000 arban</text>
        </svg>
      );
      return null;
    }

    return (
      <div>
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.1em', color: C.amberDm, marginBottom: 6 }}>
          MONGOL TACTICAL DOCTRINE ANALYZER
        </div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 20, maxWidth: 720 }}>
          Six innovations that made the Mongol military system qualitatively different from any contemporary force. Each was not merely a trick but a systematized doctrine trained, practiced, and executed with professional discipline. Together they constituted a military system that would not be matched in sophistication until the modern era.
        </div>
        <RopeHr style={{ marginBottom: 16 }} />

        {/* Tactic selector */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {DOCTRINE_TACTICS.map(function (dt, i) {
            var active = i === doctrineSelected;
            return (
              <button key={dt.id} onClick={function () { setDoctrineSelected(i); }}
                style={{
                  flex: '0 0 auto', padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
                  background: active ? C.amberBg : 'transparent',
                  border: '1px solid ' + (active ? C.amberDm : C.line),
                  transition: 'all .12s', whiteSpace: 'nowrap',
                }}>
                <span style={{ fontFamily: Mono, fontSize: 11, fontWeight: 600, color: active ? C.amber : C.tx3, display: 'block' }}>{dt.category}</span>
                <span style={{ fontFamily: Sans, fontSize: 11, color: active ? C.tx2 : C.tx3 }}>{dt.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected tactic detail */}
        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: 24, marginBottom: 20 }}>
          <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.1em', color: C.amberDm, marginBottom: 6 }}>{tactic.category}</div>
          <h3 style={{ fontFamily: Serif, fontSize: 22, fontWeight: 700, color: C.tx, marginBottom: 12 }}>{tactic.name}</h3>

          <TacticDiagram tacticId={tactic.svgDiagram} />

          <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75, marginBottom: 20 }}>{tactic.description}</div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.green, marginBottom: 8 }}>WHY IT WORKED</div>
            <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.7, paddingLeft: 14, borderLeft: '3px solid ' + C.greenDm }}>{tactic.whyItWorked}</div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.amber, marginBottom: 8 }}>HISTORICAL BATTLES</div>
            {tactic.battles.map(function (b) {
              return (
                <div key={b.name} style={{ background: C.amberBg, borderRadius: 6, padding: '10px 14px', border: '1px solid ' + C.line, marginBottom: 8 }}>
                  <div style={{ fontFamily: Mono, fontSize: 11, color: C.gold, marginBottom: 4 }}>{b.name}</div>
                  <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6 }}>{b.detail}</div>
                </div>
              );
            })}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.red, marginBottom: 8 }}>ENEMY ADAPTATION (OR FAILURE TO ADAPT)</div>
            <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.7, paddingLeft: 14, borderLeft: '3px solid ' + C.redDm }}>{tactic.enemyAdaptation}</div>
          </div>

          <div style={{ background: C.blueBg, border: '1px solid ' + C.blueDm + '33', borderRadius: 6, padding: '12px 16px' }}>
            <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.blue, marginBottom: 6 }}>MODERN EQUIVALENT</div>
            <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7 }}>{tactic.modernEquivalent}</div>
          </div>
        </div>

        {/* Battle Scenarios */}
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.08em', color: C.amberDm, marginBottom: 12 }}>TACTICAL EXERCISE: DEPLOY A MONGOL DOCTRINE</div>
        <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.6, marginBottom: 16 }}>
          Three scenarios drawn from historical situations. Select which Mongol tactical doctrine to deploy in each case. The outcome is based on what actually happened when the Mongols faced comparable challenges.
        </div>

        {BATTLE_SCENARIOS.map(function (sc) {
          var myChoice = battleChoice[sc.id];
          return (
            <div key={sc.id} style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, marginBottom: 16, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid ' + C.line }}>
                <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.08em', color: C.amberDm, marginBottom: 6 }}>SCENARIO</div>
                <div style={{ fontFamily: Serif, fontSize: 17, fontWeight: 600, color: C.tx, marginBottom: 8 }}>{sc.title}</div>
                <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.7 }}>{sc.situation}</div>
              </div>
              <div style={{ padding: '12px 20px 16px' }}>
                {sc.options.map(function (opt) {
                  var isSelected = myChoice === opt.tacticId;
                  var hasChosen = !!myChoice;
                  return (
                    <div key={opt.tacticId} style={{ marginBottom: 8 }}>
                      <button
                        onClick={function () { if (!hasChosen) setBattleChoice(function (prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[sc.id] = opt.tacticId; return n; }); }}
                        style={{
                          display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px',
                          border: '1px solid ' + (isSelected ? C.amberDm : C.cardBd), borderRadius: 6,
                          background: isSelected ? C.amberBg : 'transparent',
                          cursor: hasChosen ? 'default' : 'pointer', transition: 'all .15s',
                          opacity: hasChosen && !isSelected ? 0.5 : 1,
                        }}>
                        <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.6 }}>{opt.label}</div>
                      </button>
                      {isSelected && (
                        <div style={{ padding: '10px 14px', background: C.greenBg, border: '1px solid ' + C.greenDm + '22', borderRadius: 6, marginTop: 6 }}>
                          <div style={{ fontFamily: Mono, fontSize: 11, color: C.green, letterSpacing: '.06em', marginBottom: 4 }}>HISTORICAL OUTCOME</div>
                          <div style={{ fontFamily: Serif, fontSize: 12, color: C.tx, lineHeight: 1.7 }}>{opt.result}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [doctrineSelected, battleChoice]);

  // ── Empire Sustainability Renderer ────────────────────────────
  var renderEmpire = useCallback(function () {
    var ratingColors = { green: C.green, amber: C.gold, red: C.red };
    var ratingLabels = { green: 'STRONG', amber: 'MODERATE', red: 'WEAK' };
    var ratingBgs = { green: C.greenBg, amber: C.amberBg, red: C.redBg };

    function getCellData(kKey, fKey) {
      var k = EMPIRE_MATRIX[kKey];
      if (!k) return null;
      return k[fKey] || null;
    }

    var selectedCell = empireCell;
    var selData = null;
    var selKhanate = null;
    var selFactor = null;
    if (selectedCell) {
      var parts = selectedCell.split('::');
      selKhanate = parts[0];
      selFactor = parts[1];
      selData = getCellData(selKhanate, selFactor);
    }

    // Compute longevity ranking
    var khanateData = KHANATE_KEYS.map(function (kk, i) {
      var data = EMPIRE_MATRIX[kk];
      var greens = 0, ambers = 0, reds = 0;
      FACTOR_KEYS.forEach(function (fk) {
        var cell = data[fk];
        if (cell && cell.rating === 'green') greens++;
        else if (cell && cell.rating === 'amber') ambers++;
        else reds++;
      });
      return { key: kk, name: KHANATES[i], duration: data.duration, greens: greens, ambers: ambers, reds: reds, score: greens * 3 + ambers * 2 + reds * 1 };
    });

    return (
      <div>
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.1em', color: C.amberDm, marginBottom: 6 }}>
          EMPIRE SUSTAINABILITY ANALYZER
        </div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 10, maxWidth: 720 }}>
          After Mongke Khan's death in 1259, the unified Mongol Empire fragmented into four successor states. Why did some last nearly three centuries while others collapsed within a lifetime? This matrix reveals the structural factors that determined each khanate's durability. The pattern is clear: geographic coherence and cultural integration mattered more than military strength.
        </div>
        <RopeHr style={{ marginBottom: 16 }} />

        {/* Interactive matrix */}
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 3, minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.06em', color: C.tx3, textAlign: 'left', padding: '8px 10px', width: 140 }}>FACTOR</th>
                {KHANATES.map(function (kName, ki) {
                  return (
                    <th key={kName} style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.06em', color: C.amber, textAlign: 'center', padding: '8px 10px' }}>
                      <div>{kName}</div>
                      <div style={{ fontSize: 9, color: C.tx3, fontWeight: 400, marginTop: 2 }}>{EMPIRE_MATRIX[KHANATE_KEYS[ki]].duration}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {EMPIRE_FACTORS.map(function (fName, fi) {
                var fKey = FACTOR_KEYS[fi];
                return (
                  <tr key={fKey}>
                    <td style={{ fontFamily: Mono, fontSize: 11, color: C.tx2, padding: '8px 10px', verticalAlign: 'middle' }}>{fName}</td>
                    {KHANATE_KEYS.map(function (kKey, ki) {
                      var cell = getCellData(kKey, fKey);
                      if (!cell) return <td key={kKey} />;
                      var cellId = kKey + '::' + fKey;
                      var isSelected = selectedCell === cellId;
                      return (
                        <td key={kKey} onClick={function () { setEmpireCell(empireCell === cellId ? null : cellId); }}
                          style={{
                            padding: '8px 10px', borderRadius: 4, cursor: 'pointer',
                            background: isSelected ? ratingBgs[cell.rating] : (ratingColors[cell.rating] + '0a'),
                            border: '1px solid ' + (isSelected ? ratingColors[cell.rating] + '66' : ratingColors[cell.rating] + '22'),
                            textAlign: 'center', transition: 'all .15s', verticalAlign: 'middle',
                          }}>
                          <div style={{ fontFamily: Mono, fontSize: 10, fontWeight: 700, color: ratingColors[cell.rating], marginBottom: 2 }}>
                            {ratingLabels[cell.rating]}
                          </div>
                          <div style={{ fontFamily: Sans, fontSize: 10, color: C.tx3, lineHeight: 1.4 }}>{cell.summary.slice(0, 60) + (cell.summary.length > 60 ? '...' : '')}</div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        {selData && (
          <div style={{ background: C.card, border: '1px solid ' + ratingColors[selData.rating] + '44', borderRadius: 8, padding: 20, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.08em', color: C.amberDm, marginBottom: 4 }}>
                  {KHANATES[KHANATE_KEYS.indexOf(selKhanate)]} -- {EMPIRE_FACTORS[FACTOR_KEYS.indexOf(selFactor)]}
                </div>
                <div style={{
                  display: 'inline-block', fontFamily: Mono, fontSize: 11, fontWeight: 700,
                  color: ratingColors[selData.rating], padding: '2px 10px', borderRadius: 3,
                  background: ratingBgs[selData.rating], border: '1px solid ' + ratingColors[selData.rating] + '33',
                }}>
                  {ratingLabels[selData.rating]}
                </div>
              </div>
              <button onClick={function () { setEmpireCell(null); }}
                style={{ background: 'none', border: 'none', color: C.tx3, fontFamily: Mono, fontSize: 14, cursor: 'pointer' }}>
                {'\u2715'}
              </button>
            </div>
            <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75, marginBottom: 12 }}>
              {selData.summary}
            </div>
            <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.7, paddingLeft: 14, borderLeft: '3px solid ' + ratingColors[selData.rating] }}>
              {selData.detail}
            </div>
          </div>
        )}

        {!selData && (
          <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx3, textAlign: 'center', fontStyle: 'italic', marginBottom: 20 }}>
            Click any cell in the matrix to see detailed evidence and analysis.
          </div>
        )}

        {/* Structural analysis summary */}
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.08em', color: C.amberDm, marginBottom: 12 }}>STRUCTURAL ANALYSIS: WHY SOME KHANATES LASTED LONGER</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
          {khanateData.sort(function (a, b) { return b.score - a.score; }).map(function (kd) {
            return (
              <div key={kd.key} style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 8, padding: '14px 16px' }}>
                <div style={{ fontFamily: Serif, fontSize: 15, fontWeight: 600, color: C.tx, marginBottom: 4 }}>{kd.name}</div>
                <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 10 }}>{kd.duration}</div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  {Array(kd.greens).fill(0).map(function (_, i) { return <div key={'g' + i} style={{ width: 18, height: 8, borderRadius: 2, background: C.green }} />; })}
                  {Array(kd.ambers).fill(0).map(function (_, i) { return <div key={'a' + i} style={{ width: 18, height: 8, borderRadius: 2, background: C.gold }} />; })}
                  {Array(kd.reds).fill(0).map(function (_, i) { return <div key={'r' + i} style={{ width: 18, height: 8, borderRadius: 2, background: C.red }} />; })}
                </div>
                <div style={{ fontFamily: Mono, fontSize: 10, color: C.tx3 }}>
                  <span style={{ color: C.green }}>{kd.greens} strong</span>{' / '}
                  <span style={{ color: C.gold }}>{kd.ambers} moderate</span>{' / '}
                  <span style={{ color: C.red }}>{kd.reds} weak</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: C.card, border: '1px solid ' + C.amberDm + '33', borderRadius: 8, padding: '16px 20px' }}>
          <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.amber, marginBottom: 8 }}>THE PATTERN</div>
          <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75 }}>
            The Golden Horde lasted 275 years; the Ilkhanate lasted 79. The difference was not military capability (both were strong) but structural sustainability. The Golden Horde achieved cultural integration without losing Mongol identity, maintained relatively stable succession for two centuries, and governed through indirect rule that avoided cultural confrontation. The Yuan had the strongest economy but the worst cultural integration -- a foreign ruling class sitting atop 60 million resentful subjects. The Ilkhanate achieved excellent cultural synthesis but collapsed when the ruling dynasty went extinct. Succession mechanism was the universal vulnerability: every khanate's decline began with a succession crisis.
          </div>
        </div>
      </div>
    );
  }, [empireCell]);

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
        {mode === 'logistics' && renderLogistics()}
        {mode === 'doctrine' && renderDoctrine()}
        {mode === 'empire' && renderEmpire()}

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
