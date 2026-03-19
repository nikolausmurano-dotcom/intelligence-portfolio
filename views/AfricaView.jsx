// AfricaView.jsx — Decolonization Analyzer
// History of Africa & Kenya Theses (HIST)
// Accent: #a06830
//
// Interactive analytical exercise: 5 layers trace the arc from colonialism
// through decolonization with Kenya as deep case study. 3 modes:
// Historical (chronological), Case Study (Kenya), Comparative (Kenya vs
// Algeria, India, South Africa). Self-contained React component.


// ── Palette: Field research station — warm earth & savanna ──────────
const C = {
  bg:      '#0c0806',
  card:    'rgba(20,16,12,.88)',
  cardBd:  'rgba(160,104,48,.16)',
  tx:      '#e0d4c0',
  tx2:     '#c0b498',
  tx3:     '#8b7b63',
  accent:  '#b87838',
  accentDm:'#905828',
  accentBg:'rgba(184,120,56,.06)',
  gold:    '#c8a050',
  goldDm:  '#a88030',
  red:     '#b84038',
  redDm:   '#882820',
  redBg:   'rgba(184,64,56,.06)',
  green:   '#488838',
  greenDm: '#306828',
  greenBg: 'rgba(72,136,56,.06)',
  blue:    '#4878a0',
  blueDm:  '#385888',
  blueBg:  'rgba(72,120,160,.07)',
  ochre:   '#c09040',
  ocrBg:   'rgba(192,144,64,.07)',
  line:    'rgba(160,104,48,.10)',
  kenyaBlack: '#1a1a1a',
  kenyaRed:   '#bb2020',
  kenyaGreen: '#006b3f',
  ruled:   'rgba(160,120,80,.06)',
};
const Mono  = "'IBM Plex Mono',monospace";
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";

// ── SVG Decorative Elements ────────────────────────────────────────
const AcaciaTree = () => (
  <svg style={{position:'absolute',bottom:60,right:30,width:'200px',height:'180px',opacity:0.03,pointerEvents:'none'}} viewBox="0 0 200 180">
    {/* Trunk */}
    <line x1="100" y1="180" x2="100" y2="80" stroke="rgba(120,80,40,1)" strokeWidth="4"/>
    <line x1="100" y1="120" x2="70" y2="90" stroke="rgba(120,80,40,1)" strokeWidth="2.5"/>
    <line x1="100" y1="100" x2="140" y2="70" stroke="rgba(120,80,40,1)" strokeWidth="2.5"/>
    {/* Flat canopy */}
    <ellipse cx="100" cy="55" rx="80" ry="25" fill="rgba(72,120,50,1)"/>
    <ellipse cx="70" cy="65" rx="50" ry="18" fill="rgba(60,100,40,1)"/>
    <ellipse cx="140" cy="50" rx="45" ry="15" fill="rgba(80,130,55,1)"/>
  </svg>
);

const SavannaHorizon = () => (
  <svg style={{position:'absolute',bottom:0,left:0,width:'100%',height:'200px',opacity:0.025,pointerEvents:'none'}} viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax slice">
    <path d="M0 200 L0 140 Q200 120 400 135 Q600 150 800 130 Q1000 110 1200 125 L1200 200Z" fill="rgba(160,104,48,.6)"/>
    <path d="M0 200 L0 160 Q300 145 600 155 Q900 165 1200 150 L1200 200Z" fill="rgba(120,80,40,.4)"/>
    {/* Grass tufts */}
    {[100,250,400,550,700,850,1000,1100].map(x => (
      <g key={x}>
        <path d={'M'+x+' 170 Q'+(x-5)+' 155 '+(x-3)+' 145'} fill="none" stroke="rgba(100,130,50,.5)" strokeWidth="1"/>
        <path d={'M'+x+' 170 Q'+(x+5)+' 150 '+(x+7)+' 140'} fill="none" stroke="rgba(100,130,50,.4)" strokeWidth="1"/>
      </g>
    ))}
  </svg>
);

const FieldNotebookLines = () => (
  <div style={{
    position:'absolute',top:0,left:0,right:0,bottom:0,pointerEvents:'none',opacity:1,
    backgroundImage:'repeating-linear-gradient(0deg, transparent 0px, transparent 23px, rgba(160,120,80,.04) 23px, rgba(160,120,80,.04) 24px)',
  }}/>
);

const KenyaFlagStripe = () => (
  <div style={{ display:'flex', height: 4, marginBottom: 16, borderRadius: 1, overflow:'hidden', opacity: 0.5 }}>
    <div style={{ flex:1, background: C.kenyaBlack }}/>
    <div style={{ flex:1, background: C.kenyaRed }}/>
    <div style={{ flex:1, background: C.kenyaGreen }}/>
  </div>
);

// ── Skills ──────────────────────────────────────────────────────────
const SKILLS = [
  'Colonial Systems Analysis',
  'Decolonization Theory',
  'Subaltern Historiography',
  'Ethnic Politics & Mobilization',
  'Constitutional Design',
  'Comparative Independence Movements',
  'Post-Colonial State Formation',
  'Primary Source Interpretation',
];

// ── Provenance ──────────────────────────────────────────────────────
const PROVENANCE = [
  { label: 'Elkins (2005)',   desc: 'Imperial Reckoning: The Untold Story of Britain\u2019s Gulag in Kenya (Pulitzer Prize)' },
  { label: 'Anderson (2005)', desc: 'Histories of the Hanged: Britain\u2019s Dirty War in Kenya and the End of Empire' },
  { label: 'Branch (2011)',   desc: 'Kenya: Between Hope and Despair, 1963\u20132011' },
  { label: 'Fanon (1961)',    desc: 'The Wretched of the Earth' },
];

// ── Analytical Layers (Historical Mode) ─────────────────────────────
const LAYERS = [
  {
    id: 'colonial',
    num: 'I',
    era: '1880s \u2013 1945',
    title: 'The Colonial Encounter',
    subtitle: 'Scramble, Partition & Settler Colonialism',
    context: 'The Berlin Conference of 1884\u201385 formalized the European partition of Africa, establishing rules for territorial claims that ignored existing African political systems. In East Africa, the Imperial British East Africa Company received a royal charter in 1888, and by 1895 Britain declared the East Africa Protectorate. Kenya became a Crown Colony in 1920. The colonial economy was organized around the "White Highlands"\—fertile land in the Rift Valley and central highlands alienated from Kikuyu, Maasai, and other communities and redistributed to European settlers.',
    primarySources: [
      'The Crown Lands Ordinance (1915): legalized mass land alienation',
      'Lord Delamere\u2019s diaries: settler perspective on "improving" African land',
      'Kenyatta, "Facing Mount Kenya" (1938): ethnographic counter-narrative',
      'Carter Land Commission Report (1934): documented land grievances',
    ],
    analyticalFramework: 'Indirect vs. direct rule: Kenya represented a hybrid\—direct rule over settlers, indirect rule over African "reserves" through appointed chiefs. Mahmood Mamdani\u2019s "Citizen and Subject" framework distinguishes between urban citizens under civil law and rural subjects under "customary" law administered by chiefs\—a bifurcated state designed to control without integrating. The kipande (pass) system, modeled on South African pass laws, restricted African movement and created a coerced labor supply for settler farms.',
    connectionToPresent: 'The land question remains Kenya\u2019s most explosive political issue. The 2010 Constitution created the National Land Commission, but redistribution has been minimal. Ethnic tensions over land in the Rift Valley\—visible in the 2007\u201308 post-election violence\—trace directly to colonial alienation patterns. The "willing buyer, willing seller" model adopted at independence left colonial land distributions largely intact.',
  },
  {
    id: 'maumau',
    num: 'II',
    era: '1952 \u2013 1960',
    title: 'Mau Mau & Resistance',
    subtitle: 'Emergency, Detention & Competing Narratives',
    context: 'By the late 1940s, landless Kikuyu squatters expelled from settler farms, returning WWII veterans, and urban workers in Nairobi formed a volatile constituency. The Mau Mau movement\—a term of disputed origin\—organized oathing ceremonies binding adherents to recover stolen lands. In October 1952, Governor Evelyn Baring declared a State of Emergency after the assassination of Senior Chief Waruhiu. Over the next eight years, Britain waged a counterinsurgency that included mass detention of over 1.5 million Kikuyu in "Pipeline" camps, systematic torture, forced labor, and villagization.',
    primarySources: [
      'Mau Mau detainee testimonies (collected by Elkins, Anderson)',
      'Colonial Office correspondence: Baring\u2019s dispatches to London',
      'Mau Mau oath texts and forest fighter memoirs',
      'Hola Camp massacre documents (1959): 11 detainees beaten to death',
    ],
    analyticalFramework: 'The historiographical debate over Mau Mau is itself an analytical exercise. The colonial narrative framed it as atavistic tribalism\—savagery requiring civilization\u2019s firm hand. Nationalist historians recast fighters as freedom heroes (Kenya renamed a national holiday "Mashujaa Day"). Revisionist scholarship (Lonsdale\u2019s "moral ethnicity" vs. "political tribalism") reveals internal Kikuyu debates about violence, modernity, and legitimate authority. Elkins\u2019s discovery of classified detention records proved systematic British brutality, forcing an official UK government settlement in 2013.',
    connectionToPresent: 'Mau Mau veterans received compensation from the British government only in 2013 after a High Court ruling. The movement\u2019s legacy remains contested: Kenyatta (detained during the Emergency but not a Mau Mau leader) co-opted the movement\u2019s legitimacy while marginalizing actual fighters. The tension between those who fought in the forests and those who negotiated in Lancaster House echoes in Kenyan politics as a debate about who truly "earned" independence.',
  },
  {
    id: 'independence',
    num: 'III',
    era: '1960 \u2013 1978',
    title: 'Independence & Nation-Building',
    subtitle: 'Kenyatta, Harambee & the One-Party State',
    context: 'Kenya achieved independence on December 12, 1963, with Jomo Kenyatta as Prime Minister (President from 1964). The Lancaster House negotiations produced a regional (majimbo) constitution designed to protect minority ethnic groups, but Kenyatta\u2019s KANU party systematically dismantled devolution in favor of centralized presidential power. The motto "Harambee" (pulling together) masked growing ethnic patronage: Kikuyu elites accumulated land and business opportunities, while the Luo opposition under Oginga Odinga was marginalized.',
    primarySources: [
      'Lancaster House Conference transcripts (1960, 1962, 1963)',
      'Kenyatta\u2019s "Suffering Without Bitterness" (1968): official narrative',
      'Tom Mboya assassination files (1969): political violence',
      'Sessional Paper No. 10 (1965): African Socialism framework',
    ],
    analyticalFramework: 'Neo-patrimonialism: the state functions as a network of patron-client relationships rather than through impersonal bureaucratic institutions. Daniel Bach and Mamoudou Gazibo\u2019s framework shows how Kenyatta converted state resources into ethnic loyalty. The abolition of KADU (opposition party) in 1964 and the banning of KPU in 1969 established a de facto one-party state. Joel Barkan\u2019s analysis of Kenyan elections shows that even within single-party systems, competitive primaries created limited accountability\—but accountability ran along ethnic, not programmatic, lines.',
    connectionToPresent: 'The Kenyatta family\u2019s land holdings (estimated at over 500,000 acres) remain a political flashpoint. Uhuru Kenyatta, Jomo\u2019s son, served as President 2013\u20132022. The dynastic pattern\—where political power, ethnic identity, and economic accumulation intertwine\—has been replicated by other families (Moi, Odinga). The 2010 Constitution\u2019s devolution provisions deliberately echo the abandoned majimbo framework, attempting to solve problems Kenyatta Sr. created.',
  },
  {
    id: 'democracy',
    num: 'IV',
    era: '1992 \u2013 2007',
    title: 'Democratization & Ethnic Politics',
    subtitle: 'Multiparty Elections, Mobilization & Violence',
    context: 'Daniel arap Moi\u2019s 24-year presidency (1978\u20132002) deepened authoritarian rule: detention without trial, assassination of political critics (J.M. Kariuki, Robert Ouko), and systematic corruption. International pressure after the Cold War and domestic agitation from lawyers, churches, and civil society forced the reintroduction of multiparty elections in 1991. The 1992 and 1997 elections saw ethnic violence orchestrated to divide the opposition. Moi retired in 2002 and the NARC coalition won a landslide under Mwai Kibaki, generating euphoria.',
    primarySources: [
      'Akiwumi Commission report (1999): state-sponsored ethnic violence',
      'Ndung\u2019u Land Report (2004): illegal/irregular land allocations',
      'Waki Commission report (2008): post-election violence investigation',
      'Kriegler Commission report (2008): electoral irregularities',
    ],
    analyticalFramework: 'The "ethnic census" model (Horowitz, Posner) predicts that in diverse societies with majoritarian elections, politicians mobilize ethnic blocs rather than building cross-cutting coalitions. Kenya\u2019s 42+ ethnic groups create shifting alliance patterns: the 2007 election pitted a Kikuyu-led PNU against a Luo-Kalenjin-led ODM coalition. When Kibaki was declared winner in a disputed count, violence erupted across the Rift Valley, Nairobi\u2019s slums, and the coast\—1,133 killed, 600,000 displaced. The crisis was both an electoral dispute and a culmination of land grievances, inequality, and ethnic mobilization.',
    connectionToPresent: 'The 2007\u201308 violence led directly to the new Constitution (2010), the ICC indictments of Kenyatta and Ruto, and the creation of 47 county governments through devolution. The Kenyatta-Ruto alliance\—forged as co-defendants at The Hague\—dominated politics until their rupture in 2022. Every Kenyan election since 2007 carries the shadow of potential violence, shaping both voter behavior and international engagement.',
  },
  {
    id: 'contemporary',
    num: 'V',
    era: '2010 \u2013 Present',
    title: 'Contemporary Kenya',
    subtitle: 'Constitution, Devolution & Transformation',
    context: 'The 2010 Constitution is widely regarded as one of Africa\u2019s most progressive: a bill of rights, devolution to 47 counties, land reform provisions, an independent judiciary, and a two-thirds gender rule. Implementation has been uneven. Devolution transferred significant resources to counties but also decentralized corruption. Al-Shabaab attacks\—the Westgate Mall siege (2013, 67 killed) and Garissa University massacre (2015, 148 killed)\—prompted security crackdowns that disproportionately affected Somali and Muslim communities. Kenya\u2019s GDP growth (~5% annually) masks deep inequality.',
    primarySources: [
      'Constitution of Kenya (2010): full text with annotated commentary',
      'Kenya National Commission on Human Rights reports',
      'KNBS Economic Survey data (annual): macro indicators',
      'Truth, Justice and Reconciliation Commission report (2013)',
    ],
    analyticalFramework: 'The tension between institutional design and political practice. Yash Ghai\u2019s constitutional analysis shows how progressive provisions can be undermined by weak enforcement. The "Big Man" problem: strong individual leaders (Kenyatta, Ruto) operating through informal networks alongside formal institutions. Kenya as a "hybrid regime"\—neither fully democratic nor fully authoritarian\—using Freedom House and V-Dem indicators. The devolution experiment as a natural experiment in institutional design: comparing service delivery, accountability, and participation across 47 counties.',
    connectionToPresent: 'William Ruto\u2019s presidency (from 2022) campaigned on a "hustler" narrative\—class rather than ethnicity\—though ethnic coalition-building remained central. The 2024 Generation Z protests against the Finance Bill demonstrated new forms of mobilization: leaderless, social-media-driven, cross-ethnic. Kenya\u2019s role as East Africa\u2019s economic hub (Nairobi as "Silicon Savannah"), combined with persistent inequality, creates a laboratory for understanding how colonial legacies interact with 21st-century globalization.',
  },
];

// ── Kenya Deep-Dive Data (Case Study Mode) ──────────────────────────
const CASE_STUDIES = [
  {
    id: 'land',
    title: 'The Land Question',
    icon: '\u{1F33E}',
    thesis: 'Colonial land alienation created structural inequalities that persist because post-independence elites had incentives to maintain, rather than dismantle, the inherited distribution.',
    evidence: [
      'Crown Lands Ordinance (1915) declared all "unoccupied" land Crown property, ignoring African customary tenure',
      'By 1953, 12,000 European settlers held 7.5 million acres; 1.25 million Kikuyu had 2,000 sq. miles in overcrowded reserves',
      'At independence, "willing buyer, willing seller" favored Kenyatta-connected elites who acquired former settler estates',
      'Ndung\u2019u Report (2004) documented 200,000+ illegal land allocations under Kenyatta and Moi governments',
      'National Land Commission (2010 Constitution) has recovered minimal land; political resistance from landed elites',
    ],
    analysis: 'The land question demonstrates path dependence: colonial institutions create winners who then have political power to block reform. Acemoglu and Robinson\u2019s "extractive institutions" framework applies directly\—settler colonialism created a dual economy (modern sector for settlers, subsistence for Africans) that post-independence elites inherited rather than transformed.',
    modernRelevance: 'Rift Valley land disputes fueled 1992, 1997, and 2007\u201308 electoral violence. County governments under devolution now manage some land functions, but the backlog of historical claims remains. Climate change and population growth (52 million, doubling in 25 years) intensify pressure on arable land.',
  },
  {
    id: 'ethnicity',
    title: 'Ethnicity & the State',
    icon: '\u{1F3DB}',
    thesis: 'Ethnicity in Kenya is not primordial but was politically constructed through colonial administrative categories, and is actively reproduced by post-colonial electoral incentives.',
    evidence: [
      'Colonial "tribal reserves" hardened fluid pre-colonial identities into fixed administrative categories',
      'The kipande system required ethnic identification, making "tribe" a bureaucratic reality',
      'Post-independence censuses maintained ethnic enumeration, tying identity to resource allocation',
      'Lonsdale\u2019s "moral ethnicity" vs "political tribalism": internal community debates vs elite manipulation',
      'Voting patterns 1992\u20132022 show 70\u201390% ethnic bloc voting in presidential elections',
    ],
    analysis: 'The constructivist approach (Berman, Lonsdale) shows that colonial indirect rule transformed pre-colonial identities into rigid ethnic categories. Post-colonial politicians then mobilized these categories for electoral purposes. The result: ethnicity functions as a rational strategy for accessing state resources in a winner-take-all political system. Each president distributes patronage disproportionately to co-ethnics, creating a "moral economy of tribalism" where not voting for your group is seen as betrayal.',
    modernRelevance: 'Ruto\u2019s 2022 "hustler vs. dynasty" framing attempted to overlay class onto ethnicity. The Gen Z protests of 2024 were notably cross-ethnic. Whether Kenya can build cross-cutting identities depends on whether devolution creates alternative resource access channels that reduce the stakes of presidential elections.',
  },
  {
    id: 'constitution',
    title: 'Constitutional Design',
    icon: '\u{1F4DC}',
    thesis: 'Kenya\u2019s 2010 Constitution represents a sophisticated attempt to solve the post-colonial "big man" problem through institutional engineering, but implementation reveals the limits of constitutional solutions to political problems.',
    evidence: [
      'The 1963 majimbo constitution was dismantled within two years as Kenyatta centralized power',
      'The 1969 and 1982 constitutional amendments created an imperial presidency',
      'The CKRC/Bomas Draft (2004) was gutted by the Kilifi Draft (2005), rejected by referendum',
      'The 2010 Constitution passed with 67% approval; created devolved government, independent judiciary, bill of rights',
      'Implementation: Supreme Court nullified the 2017 presidential election (first in African history)',
    ],
    analysis: 'Comparative constitutional design (Horowitz, Sartori) asks whether institutions can manage ethnic conflict. Kenya\u2019s 2010 framework combines: (1) devolution to reduce central stakes, (2) a two-round presidential election requiring geographic spread (25% in 24/47 counties), (3) an independent judiciary with power of review, (4) a bill of rights with socioeconomic provisions. The challenge: each provision has been tested by political actors seeking to circumvent it.',
    modernRelevance: 'Devolution has transferred 15%+ of national revenue to counties, creating local patronage networks that both diffuse and replicate central-state dynamics. The Building Bridges Initiative (BBI, 2020\u201321) attempted to amend the Constitution for political accommodation, but was struck down by courts. Kenya\u2019s constitutional experiment is watched across Africa as a test case.',
  },
  {
    id: 'security',
    title: 'Security & Terrorism',
    icon: '\u{1F6E1}',
    thesis: 'Kenya\u2019s counterterrorism response to Al-Shabaab reveals tensions between security imperatives and civil liberties that echo colonial-era Emergency powers, disproportionately affecting Somali and Muslim communities.',
    evidence: [
      'Kenya\u2019s 2011 military incursion into Somalia (Operation Linda Nchi) invited retaliatory attacks',
      'Westgate Mall attack (September 2013): 67 killed, 4-day siege, live-tweeted by attackers',
      'Garissa University College massacre (April 2015): 148 killed, primarily Christian students',
      'Operation Usalama Watch (2014): mass roundup of ethnic Somalis in Eastleigh, Nairobi',
      'ATPU (Anti-Terrorism Police Unit) accused of extrajudicial killings and disappearances',
    ],
    analysis: 'The colonial Emergency (1952\u201360) and post-9/11 counterterrorism share structural similarities: collective punishment of communities, detention without trial, securitization of ethnic identity. Kenya\u2019s northeastern region (formerly the Northern Frontier District) was administered under emergency regulations until 1991\—the Wagalla Massacre (1984) killed hundreds of ethnic Somalis. Contemporary counterterrorism reproduces these patterns, raising the question: can a post-colonial state break free from colonial security logics?',
    modernRelevance: 'Kenya\u2019s dual role as a counterterrorism partner for Western states and a host of the world\u2019s largest refugee camps (Dadaab, Kakuma) creates contradictions. The 2024 deployment of Kenyan police to Haiti under a UN mandate extends Kenya\u2019s security role beyond the region, raising new questions about the projection of state power.',
  },
];

// ── Comparative Paths (Comparative Mode) ─────────────────────────────
const COMPARISONS = [
  {
    id: 'algeria',
    country: 'Algeria',
    flag: '\u{1F1E9}\u{1F1FF}',
    independence: '1962',
    colonizer: 'France',
    type: 'Revolutionary war (1954\u20131962)',
    keyDifference: 'Violent total war for independence; settler population expelled entirely',
    parallels: [
      'Both Kenya and Algeria had significant settler populations invested in maintaining colonial rule',
      'Both experienced brutal counterinsurgency: French torture in Algeria, British detention in Kenya',
      'Both produced competing narratives: FLN vs. harkis in Algeria parallels Mau Mau vs. loyalists',
      'Post-independence: both experienced authoritarian one-party rule justified by liberation credentials',
    ],
    divergences: [
      'Scale: Algeria\u2019s war killed ~1.5 million; Kenya\u2019s Emergency killed ~25,000\u2013100,000',
      'Settler departure: all pieds-noirs left Algeria; Kenya\u2019s settlers partially remained, evolved into tourism/agriculture sector',
      'Economic model: Algeria nationalized oil/gas (rentier state); Kenya maintained capitalist mixed economy',
      'Military role: Algerian military became kingmaker; Kenyan military remained politically subordinate',
    ],
    scholarlyDebate: 'Fanon\u2019s "The Wretched of the Earth" theorized that only revolutionary violence could fully decolonize consciousness. Kenya\u2019s negotiated transition appears to validate the opposing view\—but at the cost of structural continuity. Did Kenya\u2019s "peaceful" transition merely replace white settlers with African elites in the same extractive structure?',
  },
  {
    id: 'india',
    country: 'India',
    flag: '\u{1F1EE}\u{1F1F3}',
    independence: '1947',
    colonizer: 'Britain',
    type: 'Mass mobilization, negotiated transfer',
    keyDifference: 'Non-violent mass movement; partition along religious lines',
    parallels: [
      'Both were British colonies with indirect rule systems that exploited existing social divisions',
      'Both inherited Westminster parliamentary institutions adapted to local conditions',
      'Both faced the challenge of building national identity across ethnic/religious/linguistic diversity',
      'Both experienced post-independence political dynasties (Nehru-Gandhi, Kenyatta)',
    ],
    divergences: [
      'India had a large, Western-educated nationalist elite (Indian National Congress from 1885); Kenya\u2019s educated elite was tiny',
      'Partition: India\u2019s religious partition killed ~2 million; Kenya avoided partition but institutionalized ethnic territories',
      'Democracy: India maintained continuous multi-party democracy; Kenya was a one-party state until 1991',
      'Federalism: India\u2019s linguistic states (1956) managed diversity; Kenya\u2019s devolution came only in 2010',
    ],
    scholarlyDebate: 'Partha Chatterjee\u2019s critique: post-colonial states inherit the "colonial difference"\—modern institutions grafted onto societies structured by colonial categories. Both India and Kenya illustrate how colonial administrative categories (caste/tribe) became political identities in democratic competition. Is this a failure of decolonization or an adaptation of democratic practice?',
  },
  {
    id: 'southafrica',
    country: 'South Africa',
    flag: '\u{1F1FF}\u{1F1E6}',
    independence: '1994 (majority rule)',
    colonizer: 'Britain / Netherlands',
    type: 'Prolonged struggle; negotiated transition from apartheid',
    keyDifference: 'Internal colonialism (apartheid); truth and reconciliation model',
    parallels: [
      'Both had settler-dominated economies with racial land dispossession',
      'Both experienced states of emergency with mass detention and torture',
      'Both adopted progressive constitutions (1996 South Africa, 2010 Kenya) as post-crisis solutions',
      'Both face persistent inequality along racial/ethnic lines despite legal equality',
    ],
    divergences: [
      'Timeline: South Africa\u2019s apartheid was a post-1948 intensification; Kenya\u2019s colony ended in 1963',
      'TRC: South Africa chose truth and reconciliation; Kenya\u2019s TJRC report (2013) was largely shelved',
      'Economic structure: South Africa\u2019s industrial economy vs Kenya\u2019s agrarian/service economy',
      'ANC dominance vs. Kenya\u2019s rotating ethnic coalitions: different models of post-liberation politics',
    ],
    scholarlyDebate: 'Mamdani argues South Africa deracialized without democratizing\—dismantling apartheid\u2019s racial categories without addressing the rural "decentralized despotism" inherited from colonialism. Kenya avoided the racial binary but embedded ethnic competition in its electoral architecture. Which model better serves long-term democratic consolidation?',
  },
];

// ── Independence Timeline Data (SVG mode) ─────────────────────────────
const AFRICA_INDEPENDENCE = [
  { country: 'Sudan', year: 1956, colonial: 'UK/Egypt', method: 'negotiated', x: 20 },
  { country: 'Ghana', year: 1957, colonial: 'UK', method: 'negotiated', x: 60 },
  { country: 'Guinea', year: 1958, colonial: 'France', method: 'negotiated', x: 100 },
  { country: 'Congo', year: 1960, colonial: 'Belgium', method: 'negotiated', x: 180 },
  { country: 'Nigeria', year: 1960, colonial: 'UK', method: 'negotiated', x: 200 },
  { country: 'Algeria', year: 1962, colonial: 'France', method: 'armed', x: 280 },
  { country: 'Kenya', year: 1963, colonial: 'UK', method: 'armed', x: 320, highlight: true },
  { country: 'Tanzania', year: 1964, colonial: 'UK', method: 'negotiated', x: 360 },
  { country: 'Zambia', year: 1964, colonial: 'UK', method: 'negotiated', x: 380 },
  { country: 'Mozambique', year: 1975, colonial: 'Portugal', method: 'armed', x: 560 },
  { country: 'Angola', year: 1975, colonial: 'Portugal', method: 'armed', x: 580 },
  { country: 'Zimbabwe', year: 1980, colonial: 'UK', method: 'armed', x: 720 },
];

// ── Modes ────────────────────────────────────────────────────────────
const MODES = [
  { id: 'historical',   label: 'Historical',   icon: '\u{1F4C5}' },
  { id: 'timeline',     label: 'Timeline',      icon: '\u{1F4CA}' },
  { id: 'casestudy',    label: 'Case Study',    icon: '\u{1F50D}' },
  { id: 'comparative',  label: 'Comparative',   icon: '\u{1F310}' },
];

// ── Scholarly micro-content ──────────────────────────────────────
const AF_TIPS = {
  mau_mau: "The Mau Mau uprising (1952-1960) and Britain's response constituted one of the most brutal episodes of late colonialism. The colonial government declared a State of Emergency and detained approximately 1.5 million Kikuyu in a system of camps and 'enclosed villages.' Historian Caroline Elkins, whose 2005 Pulitzer Prize-winning book 'Imperial Reckoning' documented systematic torture, sexual violence, and forced labor in the camps, estimated deaths in the tens of thousands (her figure of 130,000-300,000 is contested). In 2013, the British government formally acknowledged the abuses and agreed to compensate 5,228 surviving victims. The Mau Mau case demonstrates how colonial 'emergencies' created legal frameworks that normalized violence against civilian populations -- frameworks that later appeared in other counterinsurgency contexts.",
  uhuru: "Kenya's independence on December 12, 1963 (Uhuru Day) was achieved through negotiation rather than armed victory -- a contrast to Algeria's bloody independence war. Jomo Kenyatta, imprisoned by the British from 1952-1961 as the alleged leader of Mau Mau (a charge he denied), chose reconciliation as the founding principle of the new state. His famous declaration 'We do not forget but we forgive' was strategically calculated: Kenya needed white settler expertise and investment capital, and a policy of retribution would trigger the economic collapse that had devastated the post-independence Congo. Kenyatta's approach preserved the settler economy but created unresolved land grievances -- the 'willing seller, willing buyer' land reform failed to redistribute the former White Highlands, sowing seeds for ethnic tensions that erupted decades later in the 2007 election violence.",
  scramble: "The Berlin Conference of 1884-1885 (not to be confused with the post-WWII Berlin conferences) was convened by Otto von Bismarck ostensibly to regulate European trade and colonization in Africa. No African leaders were invited or consulted. Over 14 weeks, European diplomats drew borders on maps that split ethnic groups (the Maasai between Kenya and Tanzania, the Somali across five states) and combined historic rivals within single territories. The conference established the principle of 'effective occupation' -- colonial powers had to demonstrate administrative control to claim territory, triggering a competitive rush to plant flags. King Leopold II's Congo Free State, recognized at Berlin, became the site of atrocities that killed an estimated 10 million Congolese. The borders drawn at Berlin remain largely intact today, structuring political conflicts that Europeans set in motion and Africans inherited.",
  ethnic_politics: "Kenya's 2007-2008 post-election violence killed approximately 1,133 people and displaced over 600,000 following a disputed presidential election between incumbent Mwai Kibaki (Kikuyu) and challenger Raila Odinga (Luo). The violence was not spontaneous -- subsequent investigations revealed organized mobilization along ethnic lines, particularly Kalenjin militias targeting Kikuyu settlers in the Rift Valley (reversing the Kikuyu settlement patterns from the colonial and Kenyatta eras). The International Criminal Court opened an investigation, and in 2011 charges were brought against six Kenyans including Uhuru Kenyatta and William Ruto, who were subsequently elected president and deputy president in 2013. The ICC cases were eventually dropped due to witness intimidation and non-cooperation by the Kenyan government. The episode demonstrated both the promise and limits of international justice: the ICC intervention may have deterred violence in 2013, but the failure to secure convictions raised questions about the court's ability to hold powerful actors accountable.",
};

// ── Main Component ──────────────────────────────────────────────────
function AfricaView({ setView }) {
  const [mode, setMode]           = useState('historical');
  const [tipId, setTipId] = useState(null);
  const [activeLayer, setLayer]   = useState(null);
  const [activeCase, setCase]     = useState(null);
  const [activeComp, setComp]     = useState(null);
  const [tlHover, setTlHover]     = useState(null);
  const topRef                    = useRef(null);

  // Track explored items for progress bar
  const [explored, setExplored] = useState({ layers: {}, cases: {}, comps: {} });

  const toggleLayer = useCallback((id) => {
    setLayer(prev => {
      const next = prev === id ? null : id;
      if (next) setExplored(e => ({ ...e, layers: { ...e.layers, [id]: true } }));
      return next;
    });
  }, []);

  const toggleCase = useCallback((id) => {
    setCase(prev => {
      const next = prev === id ? null : id;
      if (next) setExplored(e => ({ ...e, cases: { ...e.cases, [id]: true } }));
      return next;
    });
  }, []);

  const toggleComp = useCallback((id) => {
    setComp(prev => {
      const next = prev === id ? null : id;
      if (next) setExplored(e => ({ ...e, comps: { ...e.comps, [id]: true } }));
      return next;
    });
  }, []);

  const progress = useMemo(() => {
    const total = LAYERS.length + CASE_STUDIES.length + COMPARISONS.length;
    const done  = Object.keys(explored.layers).length
                + Object.keys(explored.cases).length
                + Object.keys(explored.comps).length;
    return { done, total, pct: Math.round((done / total) * 100) };
  }, [explored]);

  // ── Scholarly tooltip renderer & icons ─────────────────────────
  const TipBox = (key) => {
    if (tipId !== key) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(10,8,7,.94)', border: '1px solid rgba(160,104,48,.15)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(216,204,184,.65)', lineHeight: 1.65, margin: '6px 0 10px' }}>
        {AF_TIPS[key]}
      </div>
    );
  };

  const ChainIcon = (
    <svg width={24} height={18} viewBox="0 0 24 18" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'mau_mau' ? null : 'mau_mau')}>
      <ellipse cx={8} cy={9} rx={5} ry={4} fill="none" stroke="currentColor" strokeWidth=".8" />
      <ellipse cx={16} cy={9} rx={5} ry={4} fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={11} y1={6} x2={13} y2={6} stroke="currentColor" strokeWidth=".6" />
      <line x1={11} y1={12} x2={13} y2={12} stroke="currentColor" strokeWidth=".6" />
    </svg>
  );

  const SunriseIcon = (
    <svg width={24} height={18} viewBox="0 0 24 18" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'uhuru' ? null : 'uhuru')}>
      <path d="M2 14 L22 14" stroke="currentColor" strokeWidth=".6" />
      <path d="M6 14 Q12 4 18 14" fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={12} y1={2} x2={12} y2={6} stroke="currentColor" strokeWidth=".5" />
      <line x1={6} y1={4} x2={8} y2={7} stroke="currentColor" strokeWidth=".4" />
      <line x1={18} y1={4} x2={16} y2={7} stroke="currentColor" strokeWidth=".4" />
    </svg>
  );

  const MapIcon = (
    <svg width={22} height={22} viewBox="0 0 22 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'scramble' ? null : 'scramble')}>
      <rect x={2} y={2} width={18} height={18} rx={2} fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={8} y1={2} x2={8} y2={20} stroke="currentColor" strokeWidth=".5" strokeDasharray="2 1" />
      <line x1={14} y1={2} x2={14} y2={20} stroke="currentColor" strokeWidth=".5" strokeDasharray="2 1" />
      <line x1={2} y1={11} x2={20} y2={11} stroke="currentColor" strokeWidth=".5" strokeDasharray="2 1" />
    </svg>
  );

  const BallotIcon = (
    <svg width={20} height={22} viewBox="0 0 20 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'ethnic_politics' ? null : 'ethnic_politics')}>
      <rect x={2} y={2} width={16} height={18} rx={2} fill="none" stroke="currentColor" strokeWidth=".8" />
      <rect x={5} y={6} width={3} height={3} rx={.5} fill="none" stroke="currentColor" strokeWidth=".5" />
      <rect x={5} y={12} width={3} height={3} rx={.5} fill="none" stroke="currentColor" strokeWidth=".5" />
      <line x1={11} y1={7.5} x2={15} y2={7.5} stroke="currentColor" strokeWidth=".4" />
      <line x1={11} y1={13.5} x2={15} y2={13.5} stroke="currentColor" strokeWidth=".4" />
      <path d="M5.5 7 L6.5 8 L7.5 6" fill="none" stroke="currentColor" strokeWidth=".5" />
    </svg>
  );

  // ── Section label ────────────────────────────────────────────────
  const SectionLabel = useCallback(({ children }) => (
    <div style={{
      fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
      color: C.accentDm, marginBottom: 6,
    }}>
      {children}
    </div>
  ), []);

  // ── Historical Layer Renderer ────────────────────────────────────
  const renderHistorical = useCallback(() => (
    <div>
      <SectionLabel>ANALYTICAL LAYERS \— COLONIALISM THROUGH CONTEMPORARY{MapIcon}{ChainIcon}</SectionLabel>
      {TipBox('scramble')}
      {TipBox('mau_mau')}
      <div style={{
        fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
        marginBottom: 20, maxWidth: 720,
      }}>
        Five chronological layers trace the arc of Kenyan and African history from
        the colonial encounter through the present day. Each layer presents historical
        context, primary sources, an analytical framework, and connections to
        contemporary politics. Open each layer to examine the evidence.
      </div>

      {/* Timeline spine */}
      <div style={{ position: 'relative', paddingLeft: 28 }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 11, top: 0, bottom: 0, width: 2,
          background: `linear-gradient(180deg, ${C.accent}, ${C.accentDm}40)`,
          borderRadius: 1,
        }} />

        {LAYERS.map((layer, idx) => {
          const isOpen = activeLayer === layer.id;
          return (
            <div key={layer.id} style={{ marginBottom: 12, position: 'relative' }}>
              {/* Dot on timeline */}
              <div style={{
                position: 'absolute', left: -22, top: 18,
                width: 12, height: 12, borderRadius: '50%',
                background: isOpen ? C.accent : C.card,
                border: `2px solid ${isOpen ? C.accent : C.accentDm}`,
                transition: 'all .15s ease', zIndex: 2,
              }} />

              <div style={{
                background: C.card,
                border: `1px solid ${isOpen ? C.accentDm : C.cardBd}`,
                borderRadius: 8, overflow: 'hidden',
                transition: 'border-color .15s ease',
              }}>
                <button
                  onClick={() => toggleLayer(layer.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: Serif, fontSize: 18, fontWeight: 700,
                    color: C.accent, width: 36, textAlign: 'center', flexShrink: 0,
                  }}>
                    {layer.num}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 16, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {layer.title}
                    </div>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, color: C.tx3,
                      letterSpacing: '.04em',
                    }}>
                      {layer.era} \— {layer.subtitle}
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
                    padding: '0 20px 20px', borderTop: `1px solid ${C.line}`,
                    paddingTop: 16,
                  }}>
                    {/* Context */}
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.accentDm, marginBottom: 6,
                    }}>
                      HISTORICAL CONTEXT
                    </div>
                    <div style={{
                      fontFamily: Serif, fontSize: 14, color: C.tx,
                      lineHeight: 1.75, marginBottom: 16,
                    }}>
                      {layer.context}
                    </div>

                    {/* Primary sources */}
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.accentDm, marginBottom: 8,
                    }}>
                      PRIMARY SOURCES
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                      {layer.primarySources.map((s, i) => (
                        <li key={i} style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx2,
                          lineHeight: 1.65, padding: '4px 0 4px 16px',
                          borderLeft: `2px solid ${C.line}`, marginBottom: 4,
                        }}>
                          {s}
                        </li>
                      ))}
                    </ul>

                    {/* Analytical framework */}
                    <div style={{
                      background: C.accentBg, borderRadius: 6, padding: '12px 16px',
                      border: `1px solid ${C.line}`, marginBottom: 12,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.accentDm, marginBottom: 6,
                      }}>
                        ANALYTICAL FRAMEWORK
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.gold,
                        lineHeight: 1.7,
                      }}>
                        {layer.analyticalFramework}
                      </div>
                    </div>

                    {/* Connection to present */}
                    <div style={{
                      background: C.greenBg, borderRadius: 6, padding: '12px 16px',
                      border: `1px solid ${C.line}`,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.greenDm, marginBottom: 6,
                      }}>
                        CONNECTION TO PRESENT
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.green,
                        lineHeight: 1.7,
                      }}>
                        {layer.connectionToPresent}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ), [activeLayer, toggleLayer, SectionLabel]);

  // ── Case Study Renderer ──────────────────────────────────────────
  const renderCaseStudy = useCallback(() => (
    <div>
      <SectionLabel>KENYA DEEP DIVE \— THEMATIC CASE STUDIES{SunriseIcon}{BallotIcon}</SectionLabel>
      {TipBox('uhuru')}
      {TipBox('ethnic_politics')}
      <div style={{
        fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
        marginBottom: 20, maxWidth: 720,
      }}>
        Four cross-cutting themes that define Kenyan politics. Each case study
        presents a thesis, marshals evidence, applies analytical frameworks, and
        connects historical patterns to contemporary debates. These themes
        intersect: land fuels ethnicity, ethnicity shapes constitutional design,
        security policies reflect colonial continuities.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CASE_STUDIES.map(cs => {
          const isOpen = activeCase === cs.id;
          return (
            <div
              key={cs.id}
              style={{
                background: C.card,
                border: `1px solid ${isOpen ? C.accentDm : C.cardBd}`,
                borderRadius: 8, overflow: 'hidden',
                transition: 'border-color .15s ease',
              }}
            >
              <button
                onClick={() => toggleCase(cs.id)}
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
                  border: `1px solid ${C.line}`, flexShrink: 0,
                }}>
                  {cs.icon}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: Serif, fontSize: 16, fontWeight: 600,
                    color: C.tx, letterSpacing: '-.01em',
                  }}>
                    {cs.title}
                  </div>
                  <div style={{
                    fontFamily: Sans, fontSize: 11, color: C.tx3,
                    lineHeight: 1.65, marginTop: 2, maxWidth: 560,
                  }}>
                    {cs.thesis.slice(0, 100)}...
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
                  padding: '0 20px 20px', borderTop: `1px solid ${C.line}`,
                  paddingTop: 16,
                }}>
                  {/* Thesis */}
                  <div style={{
                    background: C.ocrBg, borderRadius: 6, padding: '12px 16px',
                    border: `1px solid ${C.line}`, marginBottom: 16,
                  }}>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.goldDm, marginBottom: 6,
                    }}>
                      THESIS
                    </div>
                    <div style={{
                      fontFamily: Serif, fontSize: 14, color: C.gold,
                      lineHeight: 1.7, fontStyle: 'italic',
                    }}>
                      {cs.thesis}
                    </div>
                  </div>

                  {/* Evidence */}
                  <div style={{
                    fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                    color: C.accentDm, marginBottom: 8,
                  }}>
                    EVIDENCE
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                    {cs.evidence.map((e, i) => (
                      <li key={i} style={{
                        fontFamily: Sans, fontSize: 12, color: C.tx2,
                        lineHeight: 1.65, padding: '5px 0 5px 16px',
                        borderLeft: `2px solid ${C.accent}20`,
                        marginBottom: 4,
                      }}>
                        <span style={{ color: C.accent, marginRight: 6, fontFamily: Mono, fontSize: 12 }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {e}
                      </li>
                    ))}
                  </ul>

                  {/* Analysis */}
                  <div style={{
                    background: C.accentBg, borderRadius: 6, padding: '12px 16px',
                    border: `1px solid ${C.line}`, marginBottom: 12,
                  }}>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.accentDm, marginBottom: 6,
                    }}>
                      ANALYTICAL FRAMEWORK
                    </div>
                    <div style={{
                      fontFamily: Serif, fontSize: 13, color: C.tx,
                      lineHeight: 1.75,
                    }}>
                      {cs.analysis}
                    </div>
                  </div>

                  {/* Modern relevance */}
                  <div style={{
                    background: C.greenBg, borderRadius: 6, padding: '12px 16px',
                    border: `1px solid ${C.line}`,
                  }}>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.greenDm, marginBottom: 6,
                    }}>
                      PRESENT-DAY RELEVANCE
                    </div>
                    <div style={{
                      fontFamily: Serif, fontSize: 13, color: C.green,
                      lineHeight: 1.7,
                    }}>
                      {cs.modernRelevance}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  ), [activeCase, toggleCase, SectionLabel]);

  // ── Comparative Renderer ─────────────────────────────────────────
  const renderComparative = useCallback(() => (
    <div>
      <SectionLabel>COMPARATIVE ANALYSIS \— DECOLONIZATION PATHWAYS</SectionLabel>
      <div style={{
        fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
        marginBottom: 20, maxWidth: 720,
      }}>
        Kenya\u2019s decolonization path\—negotiated transition preserving colonial
        economic structures\—was one of several models. Compare with Algeria
        (revolutionary war), India (mass non-violent mobilization), and South Africa
        (prolonged internal struggle). The comparison reveals how the mode of
        independence shapes post-colonial trajectories.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {COMPARISONS.map(comp => {
          const isOpen = activeComp === comp.id;
          return (
            <div
              key={comp.id}
              style={{
                background: C.card,
                border: `1px solid ${isOpen ? C.accentDm : C.cardBd}`,
                borderRadius: 8, overflow: 'hidden',
                transition: 'border-color .15s ease',
              }}
            >
              <button
                onClick={() => toggleComp(comp.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 20px', cursor: 'pointer',
                  background: 'none', border: 'none', textAlign: 'left',
                }}
              >
                <span style={{
                  fontSize: 24, width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: C.blueBg, borderRadius: 8,
                  border: `1px solid ${C.line}`, flexShrink: 0,
                }}>
                  {comp.flag}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: Serif, fontSize: 16, fontWeight: 600,
                    color: C.tx, letterSpacing: '-.01em',
                  }}>
                    Kenya vs. {comp.country}
                  </div>
                  <div style={{
                    fontFamily: Mono, fontSize: 11, color: C.tx3,
                    letterSpacing: '.04em',
                  }}>
                    {comp.colonizer} \— {comp.type} \— Independence {comp.independence}
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
                  padding: '0 20px 20px', borderTop: `1px solid ${C.line}`,
                  paddingTop: 16,
                }}>
                  {/* Key difference */}
                  <div style={{
                    background: C.blueBg, borderRadius: 6, padding: '10px 14px',
                    border: `1px solid ${C.line}`, marginBottom: 16,
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.blueDm, whiteSpace: 'nowrap',
                    }}>
                      KEY DIFFERENCE
                    </span>
                    <span style={{
                      fontFamily: Serif, fontSize: 13, color: C.blue,
                    }}>
                      {comp.keyDifference}
                    </span>
                  </div>

                  {/* Parallels */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    <div>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.greenDm, marginBottom: 8,
                      }}>
                        PARALLELS
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {comp.parallels.map((p, i) => (
                          <li key={i} style={{
                            fontFamily: Sans, fontSize: 11, color: C.tx2,
                            lineHeight: 1.6, padding: '4px 0 4px 12px',
                            borderLeft: `2px solid ${C.green}30`,
                            marginBottom: 4,
                          }}>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.redDm, marginBottom: 8,
                      }}>
                        DIVERGENCES
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {comp.divergences.map((d, i) => (
                          <li key={i} style={{
                            fontFamily: Sans, fontSize: 11, color: C.tx2,
                            lineHeight: 1.6, padding: '4px 0 4px 12px',
                            borderLeft: `2px solid ${C.red}30`,
                            marginBottom: 4,
                          }}>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Scholarly debate */}
                  <div style={{
                    background: C.accentBg, borderRadius: 6, padding: '12px 16px',
                    border: `1px solid ${C.line}`,
                  }}>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.accentDm, marginBottom: 6,
                    }}>
                      SCHOLARLY DEBATE
                    </div>
                    <div style={{
                      fontFamily: Serif, fontSize: 13, color: C.tx,
                      lineHeight: 1.75,
                    }}>
                      {comp.scholarlyDebate}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  ), [activeComp, toggleComp, SectionLabel]);

  // ── Timeline Renderer (SVG Independence Timeline) ─────────────────
  const renderTimeline = useCallback(() => {
    const hoveredItem = tlHover !== null ? AFRICA_INDEPENDENCE.find(a => a.country === tlHover) : null;
    const barH = 250;
    return (
      <div>
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.accentDm, marginBottom: 12 }}>
          AFRICAN INDEPENDENCE TIMELINE (1956&ndash;1980)
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.cardBd}`, borderRadius: 8, padding: 24, marginBottom: 16 }}>
          <svg viewBox="0 0 800 350" style={{ width: '100%', display: 'block' }}>
            {/* Axis */}
            <line x1="15" y1="290" x2="785" y2="290" stroke={C.line} strokeWidth="1" />
            {/* Year labels */}
            {[1956, 1960, 1965, 1970, 1975, 1980].map(yr => {
              const xPos = 20 + ((yr - 1956) / (1980 - 1956)) * 720;
              return (
                <g key={yr}>
                  <line x1={xPos} y1="288" x2={xPos} y2="294" stroke={C.tx3} strokeWidth="1" />
                  <text x={xPos} y="306" fill={C.tx3} fontSize="9" fontFamily={Mono} textAnchor="middle">{yr}</text>
                </g>
              );
            })}
            {/* Wave overlay bands */}
            <rect x="15" y="20" width="240" height="268" fill={C.accentBg} rx="4" opacity="0.4" />
            <text x="135" y="16" fill={C.tx3} fontSize="7" fontFamily={Mono} textAnchor="middle">FIRST WAVE</text>
            <rect x="500" y="20" width="160" height="268" fill={C.redBg} rx="4" opacity="0.4" />
            <text x="580" y="16" fill={C.tx3} fontSize="7" fontFamily={Mono} textAnchor="middle">PORTUGUESE COLONIES</text>
            {/* Country bars */}
            {AFRICA_INDEPENDENCE.map(a => {
              const isHov = tlHover === a.country;
              const barColor = a.highlight ? C.accent : a.method === 'armed' ? C.red : C.ochre;
              const barWidth = 16;
              const barHeight = 40 + Math.random() * 0 + (a.method === 'armed' ? 180 : 120); // deterministic
              const h = a.method === 'armed' ? 200 : 140;
              return (
                <g key={a.country}
                  onMouseEnter={() => setTlHover(a.country)}
                  onMouseLeave={() => setTlHover(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={a.x + 10} y={290 - h} width={barWidth} height={h}
                    rx="2" fill={barColor} opacity={isHov ? 1 : 0.65}
                    stroke={isHov ? C.tx : 'none'} strokeWidth="1.5"
                    style={{ transition: 'all .15s' }}
                  />
                  <text
                    x={a.x + 18} y={290 - h - 4}
                    fill={isHov ? C.tx : C.tx3} fontSize="7" fontFamily={Mono}
                    textAnchor="middle" transform={`rotate(-45, ${a.x + 18}, ${290 - h - 4})`}
                  >
                    {a.country}
                  </text>
                </g>
              );
            })}
            {/* Legend */}
            <rect x="640" y="20" width="10" height="10" rx="2" fill={C.ochre} />
            <text x="654" y="29" fill={C.tx3} fontSize="8" fontFamily={Mono}>Negotiated</text>
            <rect x="640" y="36" width="10" height="10" rx="2" fill={C.red} />
            <text x="654" y="45" fill={C.tx3} fontSize="8" fontFamily={Mono}>Armed</text>
            <rect x="640" y="52" width="10" height="10" rx="2" fill={C.accent} />
            <text x="654" y="61" fill={C.tx3} fontSize="8" fontFamily={Mono}>Kenya</text>
          </svg>
        </div>

        {/* Hover info */}
        {hoveredItem ? (
          <div style={{
            background: C.card, border: `1px solid ${C.cardBd}`,
            borderRadius: 8, padding: 20,
          }}>
            <div style={{ fontFamily: Serif, fontSize: 18, fontWeight: 600, color: hoveredItem.highlight ? C.accent : C.tx, marginBottom: 6 }}>
              {hoveredItem.country} ({hoveredItem.year})
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                Colonial power: <span style={{ color: C.tx }}>{hoveredItem.colonial}</span>
              </span>
              <span style={{ fontFamily: Mono, fontSize: 12, color: hoveredItem.method === 'armed' ? C.red : C.ochre, fontWeight: 600 }}>
                {hoveredItem.method === 'armed' ? 'ARMED STRUGGLE' : 'NEGOTIATED'}
              </span>
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx3, textAlign: 'center', fontStyle: 'italic' }}>
            Hover a bar to see colonial power and independence method. Kenya highlighted in orange.
          </div>
        )}
      </div>
    );
  }, [tlHover]);

  // ── Mode content dispatch ─────────────────────────────────────────
  const modeContent = useMemo(() => {
    switch (mode) {
      case 'historical':  return renderHistorical();
      case 'timeline':    return renderTimeline();
      case 'casestudy':   return renderCaseStudy();
      case 'comparative': return renderComparative();
      default:            return null;
    }
  }, [mode, renderHistorical, renderTimeline, renderCaseStudy, renderComparative]);

  // ── Main Render ───────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: Sans, position: 'relative', overflow: 'hidden' }} ref={topRef}>
      {/* Warm earth gradient */}
      <div style={{
        position:'fixed',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:0,
        background:'radial-gradient(ellipse at 40% 80%, rgba(120,80,40,.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(100,70,30,.06) 0%, transparent 50%)',
      }}/>
      <SavannaHorizon />
      <AcaciaTree />

      {/* Top bar — field station header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'linear-gradient(180deg, rgba(12,8,6,.97) 0%, rgba(12,8,6,.93) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid ' + C.line, padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer', letterSpacing: '.04em',
        }}>
          {'\u2190'} Back to Coursework
        </button>
        <span style={{ fontFamily: Mono, fontSize: 12, color: C.accentDm, letterSpacing: '.06em' }}>
          HIST {'\u2014'} HISTORY OF AFRICA & KENYA
        </span>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Hero section — field notebook cover */}
        <div style={{ marginBottom: 24 }}>
          <KenyaFlagStripe />

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1 style={{
              fontFamily: Serif, fontSize: 32, fontWeight: 700,
              color: C.tx, letterSpacing: '-.01em', marginBottom: 8,
            }}>
              Decolonization Analyzer
            </h1>
            {/* Maasai shield inspired icon */}
            <svg width="44" height="52" viewBox="0 0 44 52" style={{opacity:0.2,flexShrink:0}}>
              <ellipse cx="22" cy="26" rx="14" ry="22" fill="none" stroke={C.kenyaRed} strokeWidth="1.2"/>
              <line x1="22" y1="4" x2="22" y2="48" stroke={C.kenyaBlack} strokeWidth="1.5"/>
              <line x1="8" y1="26" x2="36" y2="26" stroke={C.kenyaBlack} strokeWidth="1"/>
              <circle cx="22" cy="26" r="4" fill="none" stroke={C.kenyaGreen} strokeWidth="1"/>
              <line x1="22" y1="4" x2="22" y2="0" stroke={C.accent} strokeWidth="2"/>
              <path d="M18 0 L22 0 L26 0" stroke={C.accent} strokeWidth="1" fill="none"/>
            </svg>
          </div>
          <p style={{
            fontFamily: Serif, fontSize: 15, color: C.tx2,
            lineHeight: 1.65, marginBottom: 4, maxWidth: 720,
          }}>
            An analytical exercise tracing the arc of African history from colonialism
            through decolonization, with Kenya as a deep case study. Five chronological
            layers connect colonial structures to post-colonial challenges, demonstrating
            how history shapes present-day politics. Three modes: examine the timeline,
            dive into Kenya's defining themes, or compare decolonization pathways
            across Algeria, India, and South Africa.
          </p>
          <p style={{
            fontFamily: Mono, fontSize: 11, color: C.tx3,
            lineHeight: 1.65, marginBottom: 12, maxWidth: 720, letterSpacing: '.06em',
          }}>
            Decolonization, Settler Colonialism, Mau Mau, Neo-Patrimonialism, Devolution
          </p>

          {/* Skills tags — field notebook labels */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            {SKILLS.map((tag, i) => {
              const tagColors = [C.kenyaBlack, C.kenyaRed, C.kenyaGreen];
              return (
                <span key={tag} style={{
                  fontFamily: Mono, fontSize: 11, padding: '3px 10px', borderRadius: 2,
                  background: C.accentBg, color: C.accentDm, letterSpacing: '.03em',
                  borderBottom: '2px solid ' + tagColors[i % 3],
                }}>
                  {tag}
                </span>
              );
            })}
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, letterSpacing: '.04em' }}>
              SECTIONS EXPLORED
            </span>
            <div style={{
              flex: 1, maxWidth: 200, height: 4,
              background: C.line, borderRadius: 2,
            }}>
              <div style={{
                width: (progress.pct) + '%', height: '100%',
                background: C.accent, borderRadius: 2,
                transition: 'width .3s ease',
              }} />
            </div>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.accent }}>
              {progress.done}/{progress.total}
            </span>
          </div>
        </div>

        {/* Mode selector — field notebook tabs */}
        <div style={{
          display: 'flex', gap: 4, marginBottom: 24,
          borderBottom: '1px solid ' + C.line, paddingBottom: 16,
        }}>
          {MODES.map(m => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                style={{
                  padding: '8px 16px', borderRadius: 2,
                  background: active ? 'rgba(184,120,56,.08)' : 'transparent',
                  border: '1px solid ' + (active ? C.accentDm : C.cardBd),
                  borderTop: active ? '2px solid ' + C.accent : '2px solid transparent',
                  color: active ? C.accent : C.tx3,
                  fontFamily: Mono, fontSize: 11, cursor: 'pointer',
                  letterSpacing: '.04em',
                  transition: 'all .15s ease',
                }}
              >
                {m.icon} {m.label}
              </button>
            );
          })}
        </div>

        {/* Mode content */}
        {modeContent}

        {/* Provenance — field research citations */}
        <div style={{
          marginTop: 40, paddingTop: 24,
          borderTop: '1px solid ' + C.line,
        }}>
          <div style={{
            fontFamily: Mono, fontSize: 12, letterSpacing: '.08em',
            color: C.tx3, marginBottom: 12,
          }}>
            SCHOLARLY PROVENANCE
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
            {PROVENANCE.map(p => (
              <div key={p.label} style={{
                background: 'rgba(20,16,12,.85)',
                border: '1px solid ' + C.cardBd,
                borderRadius: 2, padding: '10px 14px',
                position: 'relative',
                borderLeft: '3px solid ' + C.accent,
              }}>
                <FieldNotebookLines />
                <div style={{
                  fontFamily: Mono, fontSize: 11, color: C.accent,
                  marginBottom: 3, position: 'relative',
                }}>
                  {p.label}
                </div>
                <div style={{
                  fontFamily: Serif, fontSize: 12, color: C.tx2,
                  lineHeight: 1.65, position: 'relative',
                }}>
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <KenyaFlagStripe />
      </div>
    </div>
  );
}

