// AmfpView.jsx — Doctrine Tracker
// American Foreign Relations 1776-1916 (HIST)
// "From Neutrality to Intervention"
//
// Interactive chronological analysis: 6 doctrinal eras traced through
// the evolution of American foreign policy — from Washington's Farewell
// Address to Wilson's road to WWI. Three modes: Doctrines (chronological),
// Case Studies (key events), Themes (recurring patterns).
// Self-contained React component using Babel in-browser transpilation.
// Globals: useState, useCallback, useMemo, useRef from React


// ── Palette: Oval Office navy — presidential authority ──────────────
const C = {
  bg:      '#040818',
  card:    'rgba(8,14,32,.90)',
  cardBd:  'rgba(60,90,140,.18)',
  tx:      '#d0d8e8',
  tx2:     '#9cacc8',
  tx3:     '#6878a0',
  blue:    '#4070a8',
  blueDm:  '#2a5080',
  blueBg:  'rgba(64,112,168,.07)',
  navy:    '#0c1830',
  gold:    '#d4b850',
  goldDm:  '#b09830',
  goldBg:  'rgba(212,184,80,.06)',
  red:     '#b83838',
  redDm:   '#8a2828',
  redBg:   'rgba(184,56,56,.06)',
  green:   '#48886a',
  greenDm: '#306850',
  greenBg: 'rgba(72,136,106,.07)',
  cream:   '#e8dcc0',
  white:   '#e0e4f0',
  line:    'rgba(60,90,140,.12)',
  stripe:  'rgba(184,56,56,.04)',
};
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";
const Mono  = "'IBM Plex Mono',monospace";

// ── SVG Decorative Elements ────────────────────────────────────────
const EagleWatermark = () => (
  <svg style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'500px',height:'500px',opacity:0.018,pointerEvents:'none'}} viewBox="0 0 200 200">
    {/* Great Seal Eagle silhouette */}
    <path d="M100 30 Q80 40 60 55 Q40 70 35 85 Q30 100 40 110 L55 105 L70 115 L85 108 L100 120 L115 108 L130 115 L145 105 L160 110 Q170 100 165 85 Q160 70 140 55 Q120 40 100 30Z" fill="currentColor"/>
    <path d="M100 120 L100 160 L80 170 L100 165 L120 170 L100 160Z" fill="currentColor"/>
    {/* Shield on breast */}
    <rect x="88" y="70" width="24" height="35" rx="2" fill="rgba(0,0,0,.3)"/>
    <line x1="93" y1="70" x2="93" y2="105" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
    <line x1="100" y1="70" x2="100" y2="105" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
    <line x1="107" y1="70" x2="107" y2="105" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
    <rect x="88" y="70" width="24" height="10" fill="rgba(0,0,0,.15)"/>
    {/* Olive branch and arrows */}
    <path d="M70 115 Q55 130 45 145" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M130 115 Q145 130 155 145" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    {/* Stars arc */}
    {[65,75,85,95,105,110,120,125,135].map((x,i) => <circle key={i} cx={x} cy={50-Math.sin((x-100)/30)*8} r="1.5" fill="currentColor"/>)}
  </svg>
);

const StarsPattern = () => (
  <div style={{
    position:'fixed',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:0,opacity:0.02,
    backgroundImage: 'radial-gradient(circle, rgba(200,210,240,.5) 1px, transparent 1px)',
    backgroundSize: '80px 80px',
  }}/>
);

const StripesOverlay = () => (
  <div style={{
    position:'fixed',top:0,left:0,right:0,height:'6px',pointerEvents:'none',zIndex:50,
    background:'linear-gradient(90deg, '+C.red+' 0%, '+C.red+' 40%, '+C.white+' 40%, '+C.white+' 47%, '+C.blue+' 47%, '+C.blue+' 100%)',
    opacity:0.4,
  }}/>
);

// ── Skills ────────────────────────────────────────────────────────
const SKILLS = [
  'Diplomatic History',
  'Grand Strategy Analysis',
  'Doctrine Formation',
  'Treaty Interpretation',
  'Imperial Expansion Theory',
  'Neutrality & International Law',
  'Commerce & Power Dynamics',
  'Executive War Powers',
];

// ── Provenance ────────────────────────────────────────────────────
const PROVENANCE = [
  { label: 'Herring (2008)', desc: 'From Colony to Superpower: U.S. Foreign Relations Since 1776' },
  { label: 'Mead (2001)', desc: 'Special Providence: American Foreign Policy and How It Changed the World' },
  { label: 'LaFeber (1994)', desc: 'The American Age: U.S. Foreign Policy at Home and Abroad' },
];

// ── Doctrinal Eras ────────────────────────────────────────────────
const ERAS = [
  {
    id: 'washington',
    num: 'I',
    era: '1789\u20131823',
    title: 'Washington-Jefferson Era',
    subtitle: 'Neutrality & Non-Entanglement',
    architects: ['George Washington', 'Thomas Jefferson', 'Alexander Hamilton', 'John Adams'],
    doctrine: 'The foundational American foreign policy rested on neutrality, non-entanglement with European alliances, and the primacy of commercial relations over political commitments. Washington\'s Farewell Address (1796) warned against "permanent alliances with any portion of the foreign world," while Jefferson\'s inaugural refined this to "peace, commerce, and honest friendship with all nations; entangling alliances with none." Hamilton, despite his Anglophilia, agreed that the young republic lacked the military capacity for European power politics and should build wealth through trade.',
    caseStudy: 'The Jay Treaty (1794) and the Quasi-War with France (1798-1800) tested these principles immediately. When revolutionary France and Britain went to war, both sides pressured the U.S. to choose. Washington\'s Proclamation of Neutrality (1793) infuriated the French, who considered the 1778 alliance binding. The Jay Treaty normalized relations with Britain at the cost of appearing to abandon France. Adams navigated the undeclared naval war with France through diplomacy rather than full war, despite Federalist hawks demanding it. Jefferson\'s Embargo Act of 1807 attempted to use economic coercion as an alternative to military force — a bold experiment that largely failed, devastating American commerce while barely inconveniencing Britain or France.',
    impact: 'The neutrality doctrine established the template for American foreign relations for over a century. It created a powerful ideological framework: the United States as a republic fundamentally different from European monarchies, whose virtue depended on avoiding Old World corruption. This was not isolationism in the modern sense — the founders eagerly pursued global trade — but rather a strategic calculation that entanglement in European wars would destroy the republic before it could consolidate. The precedent of executive authority in foreign affairs (Washington acting without congressional authorization on neutrality) also established a constitutional pattern that persists today.',
    quote: '"The great rule of conduct for us in regard to foreign nations is, in extending our commercial relations, to have with them as little political connection as possible."',
    quoteSource: 'George Washington, Farewell Address (1796)',
  },
  {
    id: 'monroe',
    num: 'II',
    era: '1823',
    title: 'The Monroe Doctrine',
    subtitle: 'Western Hemisphere Exclusion Zone',
    architects: ['James Monroe', 'John Quincy Adams', 'George Canning (indirectly)'],
    doctrine: 'Articulated in Monroe\'s December 1823 message to Congress, the doctrine declared the Western Hemisphere closed to further European colonization and asserted that any European attempt to extend their system to the Americas would be viewed as "dangerous to our peace and safety." In exchange, the U.S. pledged non-interference in existing European colonies and in European internal affairs. The intellectual architect was Secretary of State John Quincy Adams, who rejected British Foreign Secretary Canning\'s proposal for a joint declaration, insisting America act unilaterally rather than appear "a cockboat in the wake of the British man-of-war."',
    caseStudy: 'The immediate context was the independence movements sweeping Latin America. Spain\'s former colonies had broken free, and the Holy Alliance (Russia, Prussia, Austria) discussed restoring Spanish authority. Britain opposed restoration for commercial reasons and proposed a joint Anglo-American statement. Adams persuaded Monroe to act alone, recognizing that British naval power would enforce hemisphere exclusion regardless — the U.S. could claim the credit without the obligation. Russia\'s colonization efforts on the Pacific Northwest coast added urgency. The doctrine was initially received with skepticism in Europe, where diplomats recognized the U.S. lacked the military power to enforce it. It was British sea power, not American resolve, that actually kept the Holy Alliance out.',
    impact: 'The Monroe Doctrine became the most enduring principle in American foreign policy, invoked continuously for two centuries. Its meaning expanded far beyond Monroe\'s original intent: Polk used it to justify Oregon and Texas annexation; Theodore Roosevelt\'s Corollary transformed it from a defensive shield into a justification for intervention; Cold War presidents cited it regarding Cuba and Central America. The doctrine established the Western Hemisphere as an American sphere of influence and created the conceptual framework for U.S. regional hegemony. It also established the pattern of unilateral declaration — America announcing rules for international conduct without negotiation or treaty.',
    quote: '"The American continents, by the free and independent condition which they have assumed and maintain, are henceforth not to be considered as subjects for future colonization by any European powers."',
    quoteSource: 'James Monroe, Annual Message to Congress (December 2, 1823)',
  },
  {
    id: 'manifest',
    num: 'III',
    era: '1840s\u20131860s',
    title: 'Manifest Destiny',
    subtitle: 'Continental Expansion & Moral Conquest',
    architects: ['James K. Polk', 'John L. O\'Sullivan', 'William Walker', 'Stephen Douglas'],
    doctrine: 'Manifest Destiny fused territorial expansion with moral mission. John L. O\'Sullivan coined the phrase in 1845, arguing it was "the fulfillment of our manifest destiny to overspread the continent allotted by Providence for the free development of our yearly multiplying millions." This was not merely strategic opportunism but a quasi-religious conviction: American expansion was divinely ordained, racially inevitable, and morally necessary. The doctrine provided ideological cover for the annexation of Texas (1845), the Oregon settlement (1846), the Mexican-American War (1846-1848), and the Gadsden Purchase (1853).',
    caseStudy: 'The Mexican-American War (1846-1848) was the defining application. Polk provoked war by sending troops into disputed territory between the Nueces and Rio Grande, then told Congress that "Mexico has shed American blood upon the American soil." Abraham Lincoln, then a congressman, introduced his "Spot Resolutions" demanding Polk identify the exact spot where blood was shed — challenging the casus belli. The war was militarily decisive: Scott\'s march from Veracruz to Mexico City was a masterpiece of operational art. The Treaty of Guadalupe Hidalgo transferred half of Mexico\'s territory to the United States — California, New Mexico, Arizona, Nevada, Utah, and parts of Colorado and Wyoming. The war created the continental United States but also deepened the slavery crisis, as the Wilmot Proviso debate over slavery in acquired territories foreshadowed the Civil War.',
    impact: 'Manifest Destiny transformed the United States from an Atlantic seaboard republic into a continental power, tripling the national territory in a generation. It established a pattern of expansion justified by ideological conviction rather than pure realpolitik — Americans did not merely want territory, they believed they deserved it. This moral framework for power projection persisted: the "civilizing mission" of the 1890s imperial era and the "democratization" agenda of the 20th century are direct descendants. The doctrine also embedded deep contradictions: a republic founded on consent expanding through conquest; a nation opposed to European imperialism practicing its own version; freedom\'s champions dispossessing indigenous peoples. These tensions remain unresolved.',
    quote: '"The fulfillment of our manifest destiny to overspread the continent allotted by Providence for the free development of our yearly multiplying millions."',
    quoteSource: 'John L. O\'Sullivan, "Annexation," United States Magazine and Democratic Review (1845)',
  },
  {
    id: 'reconstruction',
    num: 'IV',
    era: '1865\u20131890',
    title: 'Reconstruction & Isolation',
    subtitle: 'Inward Focus & Continental Consolidation',
    architects: ['William Seward', 'Ulysses S. Grant', 'Hamilton Fish', 'James G. Blaine'],
    doctrine: 'The post-Civil War era is often characterized as an age of isolation, but this oversimplifies a more complex reality. The dominant priority was domestic: Reconstruction, industrialization, westward settlement, and continental consolidation (the completion of the transcontinental railroad in 1869, subjugation of remaining indigenous resistance). Foreign policy was not absent but was conducted with limited ambition and smaller instruments. Seward\'s purchase of Alaska (1867) and his failed attempts to acquire Caribbean territories showed continued expansionist impulses, while Blaine\'s Pan-American Conference (1889) anticipated the coming era of hemispheric assertion.',
    caseStudy: 'The Alabama Claims dispute with Britain (1871-1872) demonstrated the era\'s approach: diplomatic resolution of grievances through international arbitration rather than force. During the Civil War, Britain had allowed Confederate commerce raiders (including the CSS Alabama) to be built in British shipyards. The U.S. demanded compensation. Secretary of State Hamilton Fish negotiated the Treaty of Washington (1871), which submitted the dispute to an international tribunal in Geneva — the first major arbitration case in modern international law. The tribunal awarded the U.S. $15.5 million. Grant\'s attempt to annex Santo Domingo (1870) failed in the Senate, demonstrating congressional resistance to overseas expansion. The era\'s restraint was partly ideological (anti-imperial republicanism) and partly practical (the army was occupied with Indian Wars and Reconstruction).',
    impact: 'The Reconstruction-era pause in foreign ambition allowed the United States to build the industrial and demographic base that would make global power projection possible after 1890. By 1890, the U.S. had surpassed Britain as the world\'s largest industrial economy. The Alabama Claims arbitration established a precedent for peaceful dispute resolution that influenced international law for decades. The failure of Grant\'s Santo Domingo annexation showed that congressional and public opinion could constrain executive foreign policy ambitions — a check that would weaken dramatically in the imperial era. The period also saw the beginning of the "new navy" under Chester Arthur and the intellectual groundwork for expansion laid by Alfred Thayer Mahan, whose "The Influence of Sea Power Upon History" (1890) provided the strategic rationale for overseas empire.',
    quote: '"The nation has been too busy with its domestic development to give close attention to affairs beyond its borders."',
    quoteSource: 'Attributed to Secretary of State Hamilton Fish, reflecting the era\'s priorities',
  },
  {
    id: 'imperialism',
    num: 'V',
    era: '1890\u20131914',
    title: 'American Imperialism',
    subtitle: 'From Republic to Empire',
    architects: ['William McKinley', 'Theodore Roosevelt', 'Alfred Thayer Mahan', 'John Hay'],
    doctrine: 'The 1890s saw a dramatic reversal: the United States rapidly acquired an overseas empire, intervened repeatedly in Latin America and Asia, and asserted great-power status on the world stage. Mahan\'s sea-power thesis provided strategic rationale; the closing of the frontier (Frederick Jackson Turner, 1893) provided psychological urgency; commercial interests seeking Asian markets provided economic motivation; Social Darwinism and Anglo-Saxon racial ideology provided moral justification. Theodore Roosevelt\'s presidency (1901-1909) synthesized these impulses into a coherent doctrine: the United States as a "civilized" power with the right and duty to police its hemisphere (Roosevelt Corollary to the Monroe Doctrine, 1904) and project force globally.',
    caseStudy: 'The Spanish-American War (1898) was the hinge event. The destruction of the USS Maine in Havana harbor, sensationalized by the Hearst and Pulitzer press, provided the immediate trigger, but the underlying causes were strategic. The war lasted barely four months but transformed the United States from a continental republic into a global empire: Spain ceded the Philippines, Puerto Rico, and Guam; Cuba became a protectorate under the Platt Amendment. The Philippine-American War (1899-1902) that followed was far bloodier and more morally compromising — an estimated 200,000-750,000 Filipino civilians died, and American troops employed torture, reconcentration camps, and scorched-earth tactics. The Open Door Notes (1899-1900) asserted equal commercial access to China, establishing American interest in Asian affairs. Roosevelt\'s mediation of the Russo-Japanese War (1905) and the construction of the Panama Canal (1904-1914) cemented the U.S. as a world power.',
    impact: 'The imperial turn permanently altered American foreign relations. The United States acquired overseas territories, a two-ocean navy, and global strategic commitments that could not be undone. The debate between imperialists and anti-imperialists (the Anti-Imperialist League included Mark Twain, Andrew Carnegie, and William James) established the template for every subsequent argument about American power abroad. The Roosevelt Corollary transformed the Monroe Doctrine from a defensive shield into an interventionist mandate, justifying over 30 U.S. military interventions in Latin America and the Caribbean over the next three decades. The contradiction between democratic ideals and imperial practice — most acute in the Philippines — became a permanent feature of American foreign policy.',
    quote: '"In strict confidence... I should welcome almost any war, for I think this country needs one."',
    quoteSource: 'Theodore Roosevelt, letter to a friend (1897), reflecting pre-Spanish-American War sentiment',
  },
  {
    id: 'wilson',
    num: 'VI',
    era: '1914\u20131916',
    title: 'Wilson & Intervention',
    subtitle: 'Neutrality Tested, Idealism Ascendant',
    architects: ['Woodrow Wilson', 'William Jennings Bryan', 'Robert Lansing', 'Edward House'],
    doctrine: 'Wilson entered office in 1913 with minimal foreign policy experience but strong moral convictions. He articulated a new doctrine: American foreign policy should be guided not by strategic interest but by moral principle, democratic values, and international law. "The force of America is the force of moral principle," he declared. Wilson\'s idealism manifested in contradictory ways: he intervened repeatedly in Latin America (Mexico, Haiti, Dominican Republic, Nicaragua) while claiming to promote democracy and constitutionalism. When the Great War erupted in August 1914, Wilson proclaimed neutrality and urged Americans to be "impartial in thought as well as in action" — but the structural tilt toward Britain (cultural affinity, trade dependency, financial ties) made true neutrality impossible.',
    caseStudy: 'The neutrality crisis of 1914-1916 tested every assumption of American foreign policy. German submarine warfare — particularly the sinking of the Lusitania (May 1915, killing 1,198 including 128 Americans) — challenged the principle that neutral nations could trade freely with belligerents. Wilson\'s response was legalistic: he demanded Germany respect neutral rights and warned of "strict accountability." Secretary of State Bryan, a genuine pacifist, resigned in protest, believing Wilson\'s notes were too provocative. The Sussex Pledge (1916) provided temporary relief when Germany agreed to restrict submarine warfare, but Wilson recognized the fragility of peace. His "preparedness" campaign (1916) expanded the army and navy while his re-election slogan — "He Kept Us Out of War" — acknowledged that most Americans still opposed intervention. Wilson attempted mediation in 1916, proposing "peace without victory," but neither side would accept terms.',
    impact: 'Wilson\'s pre-war years established Wilsonianism as a permanent strand in American foreign policy: the belief that the United States has a special obligation to spread democracy, uphold international law, and create institutions for collective security. His rhetoric of moral leadership — the "city on a hill" tradition secularized — would echo through every subsequent president\'s foreign policy pronouncements. The practical failure of neutrality demonstrated that in an industrialized, interconnected world, the Washington-Jefferson doctrine of non-entanglement was no longer tenable. The United States was too economically integrated with the belligerents, too powerful to be ignored, and too morally engaged to remain on the sidelines. The entry into war in April 1917 would vindicate this analysis — but Wilson\'s subsequent failure at Versailles and in the League of Nations fight would reveal the limits of idealism in international politics.',
    quote: '"The force of America is the force of moral principle. No other force is worth thinking about."',
    quoteSource: 'Woodrow Wilson, address in New York (1915)',
  },
];

// ── Case Studies (Key Events Per Era) ─────────────────────────────
const CASE_STUDIES = [
  {
    id: 'jay_treaty',
    era: 'washington',
    year: '1794',
    title: 'Jay Treaty with Britain',
    summary: 'John Jay negotiated normalization of relations with Britain, securing withdrawal from frontier forts and limited trade access. Domestically explosive — Republicans accused the Federalists of betraying revolutionary France.',
    significance: 'Established the precedent of executive treaty-making generating fierce partisan conflict. Demonstrated that neutrality had costs: maintaining peace with one belligerent meant alienating another.',
    actors: ['John Jay', 'George Washington', 'Alexander Hamilton'],
  },
  {
    id: 'louisiana',
    era: 'washington',
    year: '1803',
    title: 'Louisiana Purchase',
    summary: 'Jefferson purchased 828,000 square miles from Napoleonic France for $15 million, doubling the national territory. Jefferson privately acknowledged the purchase exceeded his constitutional authority — the Constitution nowhere authorizes territorial acquisition.',
    significance: 'Transformed the United States from a coastal republic into a continental power. Established the precedent of executive action exceeding strict constitutional authority in foreign affairs when opportunity demanded it.',
    actors: ['Thomas Jefferson', 'Napoleon Bonaparte', 'James Monroe', 'Robert Livingston'],
  },
  {
    id: 'monroe_1823',
    era: 'monroe',
    year: '1823',
    title: 'Monroe Doctrine Proclamation',
    summary: 'Adams convinced Monroe to reject Canning\'s joint-declaration proposal and issue a unilateral statement. The doctrine\'s enforcement depended entirely on British naval power — a fact both Adams and Canning understood.',
    significance: 'Established the principle of unilateral American declaration as international law, backed by the silent partnership of British sea power. Created the conceptual framework for all subsequent American hemispheric policy.',
    actors: ['James Monroe', 'John Quincy Adams', 'George Canning'],
  },
  {
    id: 'mexican_war',
    era: 'manifest',
    year: '1846\u20131848',
    title: 'Mexican-American War',
    summary: 'Polk provoked war by deploying troops to disputed territory, then asked Congress to recognize a state of war. The Treaty of Guadalupe Hidalgo transferred California, New Mexico, and the entire Southwest. Ulysses Grant later called it "one of the most unjust ever waged by a stronger against a weaker nation."',
    significance: 'Created the continental United States but intensified the slavery crisis. The Wilmot Proviso debate over slavery in acquired territories led directly to the Compromise of 1850 and ultimately the Civil War.',
    actors: ['James K. Polk', 'Winfield Scott', 'Abraham Lincoln', 'David Wilmot'],
  },
  {
    id: 'alabama_claims',
    era: 'reconstruction',
    year: '1871\u20131872',
    title: 'Alabama Claims Arbitration',
    summary: 'The U.S. sought compensation for damage inflicted by Confederate raiders built in British shipyards. The Geneva Tribunal awarded $15.5 million — the first major international arbitration case in modern history.',
    significance: 'Established the precedent of great-power disputes resolved through international law rather than military force. Demonstrated that even in an era of limited foreign engagement, the U.S. could achieve objectives through legal institutions.',
    actors: ['Hamilton Fish', 'Charles Francis Adams', 'Ulysses S. Grant'],
  },
  {
    id: 'spanish_american',
    era: 'imperialism',
    year: '1898',
    title: 'Spanish-American War',
    summary: 'A ten-week war triggered by the Maine explosion and Cuban independence agitation. The U.S. acquired the Philippines, Puerto Rico, and Guam; Cuba became a protectorate. Secretary of State John Hay called it "a splendid little war."',
    significance: 'Transformed the United States from a continental republic into a global empire overnight. The subsequent Philippine-American War revealed the human costs of imperialism and generated the first organized anti-war movement since the Mexican-American War.',
    actors: ['William McKinley', 'Theodore Roosevelt', 'George Dewey', 'John Hay'],
  },
  {
    id: 'panama_canal',
    era: 'imperialism',
    year: '1903\u20131914',
    title: 'Panama Canal Construction',
    summary: 'Roosevelt supported Panamanian independence from Colombia to secure canal rights, then oversaw construction of the greatest engineering project of the era. "I took the Isthmus," Roosevelt later boasted.',
    significance: 'The canal was both a strategic asset (connecting the Atlantic and Pacific fleets) and a symbol of American engineering prowess and imperial ambition. The method of acquisition — engineering a revolution in a sovereign nation — epitomized Roosevelt\'s approach to hemispheric dominance.',
    actors: ['Theodore Roosevelt', 'Philippe-Jean Bunau-Varilla', 'John Hay'],
  },
  {
    id: 'lusitania',
    era: 'wilson',
    year: '1915',
    title: 'Sinking of the Lusitania',
    summary: 'A German U-boat sank the British liner RMS Lusitania off the coast of Ireland, killing 1,198 passengers including 128 Americans. Wilson demanded Germany respect neutral rights; Bryan resigned rather than risk war.',
    significance: 'The Lusitania became the defining symbol of the neutrality crisis. Wilson\'s response — firm rhetoric without military action — bought time but could not resolve the fundamental contradiction: neutral trade rights were incompatible with unrestricted submarine warfare.',
    actors: ['Woodrow Wilson', 'William Jennings Bryan', 'Robert Lansing'],
  },
];

// ── Themes (Recurring Patterns) ───────────────────────────────────
const THEMES = [
  {
    id: 'isolationism_vs_interventionism',
    title: 'Isolationism vs. Interventionism',
    icon: '\u2696',
    description: 'The central tension in American foreign relations: the pull toward separation from the Old World versus the drive to engage, reform, and dominate. This is not a simple binary — "isolationism" always coexisted with commercial engagement and continental expansion. What changed was the scope: from hemispheric assertion (Monroe) to global projection (Roosevelt, Wilson).',
    eraManifestations: [
      { era: 'I', note: 'Washington\'s Farewell Address as founding statement of non-entanglement' },
      { era: 'II', note: 'Monroe Doctrine as hemispheric engagement paired with European avoidance' },
      { era: 'III', note: 'Aggressive continental expansion while avoiding European commitments' },
      { era: 'IV', note: 'Post-Civil War inward focus — but Seward\'s Alaska and Blaine\'s Pan-Americanism show continued ambition' },
      { era: 'V', note: 'Decisive break: overseas empire, global naval projection, Open Door in Asia' },
      { era: 'VI', note: 'Wilson\'s attempt to reconcile neutrality with moral engagement — the contradiction that forced entry into WWI' },
    ],
    historiography: 'Mead identifies four distinct American foreign policy traditions: Hamiltonians (commercial realism), Jeffersonians (protection of domestic liberty), Jacksonians (populist nationalism), and Wilsonians (missionary internationalism). The "isolationism vs. interventionism" framework oversimplifies what was always a multi-dimensional debate.',
  },
  {
    id: 'commerce_vs_idealism',
    title: 'Commerce vs. Idealism',
    icon: '\u2692',
    description: 'American foreign policy has always oscillated between economic interest and moral mission. The founders prioritized "peace, commerce, and honest friendship" — trade as the primary instrument of international relations. By Wilson\'s era, moral rhetoric had become primary: "the force of America is the force of moral principle." In practice, the two were rarely separable — commercial interests drove the Open Door policy in China, but idealistic rhetoric justified it.',
    eraManifestations: [
      { era: 'I', note: 'Hamilton: trade with Britain for economic development. Jefferson: trade without political ties' },
      { era: 'II', note: 'Monroe Doctrine partly motivated by desire for Latin American commercial access' },
      { era: 'III', note: 'Manifest Destiny blended commercial desire for Pacific ports with moral justification of expansion' },
      { era: 'IV', note: 'Limited diplomacy focused on commercial disputes (Alabama Claims) and trade agreements' },
      { era: 'V', note: 'Open Door Notes as commercial policy dressed in language of sovereignty and fair play' },
      { era: 'VI', note: 'Wilson\'s moral rhetoric masking the reality that U.S. trade with the Allies made neutrality impossible' },
    ],
    historiography: 'LaFeber emphasizes the economic drivers of expansion, arguing that the "new empire" of the 1890s was fundamentally about markets. Herring provides a more balanced account, showing how commercial, strategic, and ideological motivations interacted in ways that defy simple economic determinism.',
  },
  {
    id: 'power_vs_principles',
    title: 'Power vs. Principles',
    icon: '\u2694',
    description: 'Can a republic be an empire? The United States was founded on the rejection of monarchical power projection, yet it acquired territory by conquest, subjugated indigenous peoples, and built an overseas empire within a century. Every era confronted this contradiction: the gap between democratic principles and the exercise of power.',
    eraManifestations: [
      { era: 'I', note: 'Jefferson: the "empire of liberty" — expansion as extension of freedom, not conquest' },
      { era: 'II', note: 'Monroe Doctrine as defensive principle that later justified aggressive intervention' },
      { era: 'III', note: 'Manifest Destiny: divine sanction for conquest — the most explicit fusion of moral claims and territorial power' },
      { era: 'IV', note: 'Grant\'s failed Santo Domingo annexation: republican scruples restraining imperial ambition' },
      { era: 'V', note: 'Philippine-American War: democratic republic using reconcentration camps and torture against independence movement' },
      { era: 'VI', note: 'Wilson intervening in Mexico and Haiti while preaching self-determination — the contradiction personified' },
    ],
    historiography: 'This tension is central to Herring\'s narrative. He argues that American foreign policy has always been shaped by the interaction of power realities and principled aspirations, and that neither pure realism nor pure idealism adequately explains U.S. behavior. The rhetoric of principles is genuine but always operates within constraints of power — and power is always exercised with reference to principles.',
  },
];

// ── Doctrine Timeline Bands ──────────────────────────────────────
const DOCTRINE_BANDS = [
  { id: 'neutrality', label: 'Washington\'s Neutrality', start: 1793, peak: 1800, end: 1823, color: '#3a6090', y: 60, insight: 'Neutrality was not isolationism \— it was strategic non-entanglement that preserved freedom of action for a weak republic.' },
  { id: 'monroe', label: 'Monroe Doctrine', start: 1823, peak: 1845, end: 1920, color: '#4a80b0', y: 120, insight: 'The Doctrine had no enforcement mechanism until the 1890s. For 70 years it was a bluff backed by the British Navy, not the American one.' },
  { id: 'manifest', label: 'Manifest Destiny', start: 1840, peak: 1855, end: 1870, color: '#906040', y: 180, insight: 'Manifest Destiny was never official policy \— it was a journalist\'s phrase that became a justification. It died at Appomattox because continental expansion required slave-state arithmetic.' },
  { id: 'imperialism', label: 'American Imperialism', start: 1893, peak: 1905, end: 1920, color: '#c05040', y: 240, insight: 'The shift from continental to overseas empire happened in 6 years (1893-1899). Mahan\'s naval theory + closing of the frontier + economic depression = imperial moment.' },
  { id: 'wilson', label: 'Wilsonian Idealism', start: 1913, peak: 1918, end: 1920, color: '#60a080', y: 300, insight: 'Wilson\'s "make the world safe for democracy" created the template every subsequent president either embraces or reacts against. The tension between idealism and interest IS American foreign policy.' },
];

// ── Scholarly micro-content ──────────────────────────────────────
const AM_TIPS = {
  monroe: "The Monroe Doctrine of 1823 was a bold statement backed by no military capability. The United States Navy in 1823 consisted of fewer than 40 vessels, most of them small frigates -- incapable of challenging any major European fleet. The doctrine's real enforcement mechanism was the Royal Navy: Britain, for its own commercial reasons, opposed European re-colonization of Latin America and was prepared to use naval power to prevent it. Secretary of State John Quincy Adams, who drafted the doctrine, understood this perfectly but chose to make it a unilateral American declaration rather than a joint Anglo-American statement (as British Foreign Secretary George Canning had proposed) to establish the principle of American hemispheric leadership. The doctrine's power was aspirational for decades -- it became operational only after the Civil War, when US industrial and naval capacity finally matched the rhetoric.",
  manifest_destiny: "John O'Sullivan, editor of the Democratic Review, coined 'manifest destiny' in an 1845 article arguing for the annexation of Texas, writing that it was America's 'manifest destiny to overspread the continent.' But the phrase was less ideological conviction than post-hoc justification for expansion already underway. American settlers were already in Texas (independent since 1836), already moving into Oregon Territory, and already eyeing California. The ideology served a political function: it reframed land seizure from indigenous peoples and Mexican citizens as divinely ordained progress rather than imperial conquest. The concept's racial dimension was explicit -- O'Sullivan's 'Anglo-Saxon race' was destined to civilize the continent. The Mexican-American War (1846-48), which Ulysses Grant later called 'one of the most unjust ever waged by a stronger against a weaker nation,' was manifest destiny's purest military expression.",
  spanish_american: "The explosion that sank the USS Maine in Havana harbor on February 15, 1898, killed 266 sailors and became the casus belli for the Spanish-American War. A 1976 US Navy investigation concluded the most likely cause was accidental ignition of coal dust in a bunker adjacent to the forward magazine -- not a Spanish mine. But in 1898, William Randolph Hearst's New York Journal and Joseph Pulitzer's New York World competed to publish the most inflammatory coverage, creating the 'yellow journalism' that made war politically irresistible. The 10-week war transformed the US from a continental republic into an imperial power, acquiring the Philippines (where a brutal insurgency followed), Guam, and Puerto Rico. Theodore Roosevelt's charge up San Juan Hill (actually Kettle Hill) made him a national hero and propelled him to the presidency -- demonstrating how wars create political careers.",
  zimmermann: "The Zimmermann Telegram, intercepted by British Naval Intelligence's Room 40 on January 17, 1917, was a coded message from German Foreign Secretary Arthur Zimmermann to the German ambassador in Mexico proposing a military alliance against the United States. Germany offered Mexico the recovery of Texas, New Mexico, and Arizona. The British decoded it within days but faced a dilemma: revealing the telegram would help bring America into the war, but would also reveal that Britain was reading German diplomatic codes. The British waited until late February, then arranged for the telegram to be 'discovered' through a different channel (the Mexico City telegraph office) to protect their codebreaking capability. Zimmermann himself confirmed its authenticity when asked by journalists -- a catastrophic intelligence failure. The episode is a textbook case of intelligence as influence operation: the British calculated the optimal moment to release the information for maximum political effect on American public opinion.",
};

// ── Component ─────────────────────────────────────────────────────
function AmfpView({ setView }) {
  const [mode, setMode] = useState('doctrines');
  const [tipId, setTipId] = useState(null);
  const [selectedEra, setSelectedEra] = useState(0);
  const [expandedCase, setExpandedCase] = useState(null);
  const [expandedTheme, setExpandedTheme] = useState(null);
  const [revealedImpacts, setRevealedImpacts] = useState({});
  const [selectedBand, setSelectedBand] = useState(null);
  const [cursorYear, setCursorYear] = useState(null);
  const svgRef = useRef(null);
  const topRef = useRef(null);

  // Pendulum mode state
  const [pendulumSelected, setPendulumSelected] = useState(null);

  // Power mode state
  const [powerScenario, setPowerScenario] = useState(0);
  const [powerEra, setPowerEra] = useState('current');

  // Toggle impact reveal per doctrine era
  const toggleImpact = useCallback((id) => {
    setRevealedImpacts(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // ── Scholarly tooltip renderer & icons ─────────────────────────
  const TipBox = (key) => {
    if (tipId !== key) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(7,9,14,.94)', border: '1px solid rgba(58,96,144,.18)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(204,212,224,.65)', lineHeight: 1.65, margin: '6px 0 10px' }}>
        {AM_TIPS[key]}
      </div>
    );
  };

  const ShieldIcon = (
    <svg width={20} height={22} viewBox="0 0 20 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'monroe' ? null : 'monroe')}>
      <path d="M10 2 L18 6 L18 12 Q18 18 10 20 Q2 18 2 12 L2 6Z" fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={10} y1={6} x2={10} y2={16} stroke="currentColor" strokeWidth=".4" />
      <line x1={6} y1={11} x2={14} y2={11} stroke="currentColor" strokeWidth=".4" />
    </svg>
  );

  const CompassIcon = (
    <svg width={22} height={22} viewBox="0 0 22 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'manifest_destiny' ? null : 'manifest_destiny')}>
      <circle cx={11} cy={11} r={9} fill="none" stroke="currentColor" strokeWidth=".8" />
      <polygon points="11,4 13,10 11,8 9,10" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth=".4" />
      <polygon points="11,18 13,12 11,14 9,12" fill="none" stroke="currentColor" strokeWidth=".4" />
      <circle cx={11} cy={11} r={1.5} fill="none" stroke="currentColor" strokeWidth=".5" />
    </svg>
  );

  const AnchorIcon = (
    <svg width={20} height={24} viewBox="0 0 20 24" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'spanish_american' ? null : 'spanish_american')}>
      <circle cx={10} cy={5} r={3} fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={10} y1={8} x2={10} y2={20} stroke="currentColor" strokeWidth=".8" />
      <path d="M4 16 Q4 20 10 20 Q16 20 16 16" fill="none" stroke="currentColor" strokeWidth=".7" />
      <line x1={5} y1={12} x2={15} y2={12} stroke="currentColor" strokeWidth=".6" />
    </svg>
  );

  const TelegramIcon = (
    <svg width={22} height={20} viewBox="0 0 22 20" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'zimmermann' ? null : 'zimmermann')}>
      <rect x={2} y={4} width={18} height={12} rx={2} fill="none" stroke="currentColor" strokeWidth=".8" />
      <path d="M2 4 L11 11 L20 4" fill="none" stroke="currentColor" strokeWidth=".6" />
      <line x1={6} y1={12} x2={8} y2={12} stroke="currentColor" strokeWidth="1.5" opacity=".2" />
      <line x1={10} y1={12} x2={14} y2={12} stroke="currentColor" strokeWidth="1.5" opacity=".2" />
    </svg>
  );

  // Toggle case study expansion
  const toggleCase = useCallback((id) => {
    setExpandedCase(prev => prev === id ? null : id);
  }, []);

  // Toggle theme expansion
  const toggleTheme = useCallback((id) => {
    setExpandedTheme(prev => prev === id ? null : id);
  }, []);

  // Progress tracking
  const revealedCount = useMemo(
    () => Object.values(revealedImpacts).filter(Boolean).length,
    [revealedImpacts],
  );

  // Filtered case studies for current era
  const currentEraCases = useMemo(
    () => CASE_STUDIES.filter(cs => cs.era === ERAS[selectedEra]?.id),
    [selectedEra],
  );

  // ── Mode Switch ───────────────────────────────────────────────
  const ModeSwitch = useCallback(() => {
    const modes = [
      { id: 'doctrines', label: 'Doctrines', desc: '6 Doctrinal Eras' },
      { id: 'cases', label: 'Case Studies', desc: 'Key Events' },
      { id: 'themes', label: 'Themes', desc: 'Recurring Patterns' },
      { id: 'doctrinemap', label: 'Doctrine Map', desc: 'SVG Timeline' },
      { id: 'pendulum', label: 'Pendulum', desc: 'Isol. vs Interv.' },
      { id: 'power', label: 'Projection', desc: 'Cost Calculator' },
    ];
    return (
      <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1, padding: '10px 12px', borderRadius: 4, cursor: 'pointer',
              background: mode === m.id ? C.blueBg : 'transparent',
              border: mode === m.id ? '1px solid ' + C.blueDm : '1px solid ' + C.line,
              textAlign: 'center', transition: 'all .15s ease',
            }}
          >
            <span style={{
              fontFamily: Mono, fontSize: 11, fontWeight: 600,
              color: mode === m.id ? C.blue : C.tx3, display: 'block',
            }}>
              {m.label}
            </span>
            <span style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{m.desc}</span>
          </button>
        ))}
      </div>
    );
  }, [mode]);

  // ── Doctrines Renderer ────────────────────────────────────────
  const renderDoctrines = useCallback(() => {
    const era = ERAS[selectedEra];
    const isRevealed = revealedImpacts[era.id];
    return (
      <div>
        {/* Era selector tabs */}
        <div style={{
          display: 'flex', gap: 3, marginBottom: 20, overflowX: 'auto',
          paddingBottom: 4,
        }}>
          {ERAS.map((e, i) => (
            <button
              key={e.id}
              onClick={() => setSelectedEra(i)}
              style={{
                flex: '0 0 auto', padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
                background: i === selectedEra ? C.blueBg : 'transparent',
                border: i === selectedEra
                  ? '1px solid ' + C.blueDm
                  : '1px solid ' + C.line,
                transition: 'all .12s ease', whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 12, fontWeight: 600,
                color: i === selectedEra ? C.blue : C.tx3,
                display: 'block',
              }}>
                {e.era}
              </span>
              <span style={{
                fontFamily: Sans, fontSize: 12,
                color: i === selectedEra ? C.tx2 : C.tx3,
              }}>
                Era {e.num}
              </span>
            </button>
          ))}
        </div>

        {/* Era briefing card — executive order styling */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(8,14,32,.94) 0%, rgba(12,18,38,.90) 100%)',
          border: '1px solid ' + C.cardBd,
          borderRadius: 2, padding: 28, marginBottom: 16,
          borderTop: '3px solid rgba(212,184,80,.2)',
          position: 'relative',
          boxShadow: '0 4px 24px rgba(0,0,0,.3), inset 0 1px 0 rgba(212,184,80,.05)',
        }}>
          {/* Gold corner accents */}
          <div style={{position:'absolute',top:0,left:0,width:20,height:20,borderLeft:'2px solid rgba(212,184,80,.15)',borderTop:'2px solid rgba(212,184,80,.15)'}}/>
          <div style={{position:'absolute',top:0,right:0,width:20,height:20,borderRight:'2px solid rgba(212,184,80,.15)',borderTop:'2px solid rgba(212,184,80,.15)'}}/>
          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.12em',
              color: C.gold, marginBottom: 6, textTransform: 'uppercase', opacity: 0.7,
            }}>
              Doctrinal Era {era.num} {'\u2014'} {era.era}
            </div>
            <h2 style={{
              fontFamily: Serif, fontSize: 28, fontWeight: 700,
              color: C.white, marginBottom: 6, letterSpacing: '-.01em',
            }}>
              {era.title}{ShieldIcon}{CompassIcon}
            </h2>
            {TipBox('monroe')}
            {TipBox('manifest_destiny')}
            <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.65 }}>
              {era.subtitle}
            </div>
          </div>

          {/* Architects */}
          <div style={{
            display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24,
          }}>
            {era.architects.map(a => (
              <span key={a} style={{
                fontFamily: Mono, fontSize: 12, padding: '4px 10px', borderRadius: 4,
                background: C.blueBg, color: C.blue, border: '1px solid ' + C.line,
                letterSpacing: '.03em',
              }}>
                {a}
              </span>
            ))}
          </div>

          {/* The Doctrine */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
              color: C.blue, marginBottom: 8, fontWeight: 600,
            }}>
              {'\u2606'} THE DOCTRINE
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
              paddingLeft: 16, borderLeft: '3px solid ' + C.blueDm,
            }}>
              {era.doctrine}
            </div>
          </div>

          {/* Case Study of Application */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
              color: C.gold, marginBottom: 8, fontWeight: 600,
            }}>
              {'\⚠'} CASE STUDY: APPLICATION IN PRACTICE
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
              paddingLeft: 16, borderLeft: '3px solid ' + C.goldDm,
            }}>
              {era.caseStudy}
            </div>
          </div>

          {/* Reveal button / Lasting Impact */}
          {!isRevealed ? (
            <button
              onClick={() => toggleImpact(era.id)}
              style={{
                width: '100%', padding: '14px 20px', borderRadius: 6,
                background: C.blueBg, border: '1px solid ' + C.blueDm,
                color: C.blue, fontFamily: Mono, fontSize: 12,
                letterSpacing: '.04em', cursor: 'pointer',
                transition: 'all .15s ease',
              }}
            >
              {'\→'} REVEAL LASTING IMPACT
            </button>
          ) : (
            <div>
              <div style={{
                fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
                color: C.green, marginBottom: 8, fontWeight: 600,
              }}>
                {'\✓'} LASTING IMPACT
              </div>
              <div style={{
                fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
                paddingLeft: 16, borderLeft: '3px solid ' + C.greenDm,
                marginBottom: 20,
              }}>
                {era.impact}
              </div>

              {/* Quote */}
              <div style={{
                fontStyle: 'italic', fontFamily: Serif, fontSize: 13,
                color: C.tx2, lineHeight: 1.7, paddingLeft: 16,
                borderLeft: '2px solid ' + C.line, marginBottom: 4,
              }}>
                {era.quote}
              </div>
              <div style={{
                fontFamily: Mono, fontSize: 11, color: C.tx3,
                paddingLeft: 16, letterSpacing: '.03em',
              }}>
                {'\— '}{era.quoteSource}
              </div>
            </div>
          )}
        </div>

        {/* Doctrine progress */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: Mono, fontSize: 12, color: C.tx3,
        }}>
          <span>IMPACTS REVEALED</span>
          <div style={{
            flex: 1, maxWidth: 160, height: 4,
            background: C.line, borderRadius: 2,
          }}>
            <div style={{
              width: (revealedCount / 6 * 100) + '%',
              height: '100%', borderRadius: 2,
              background: revealedCount === 6 ? C.green : C.blue,
              transition: 'width .3s ease',
            }} />
          </div>
          <span style={{
            color: revealedCount === 6 ? C.green : C.blue,
          }}>
            {revealedCount}/6
          </span>
        </div>
      </div>
    );
  }, [selectedEra, revealedImpacts, revealedCount, toggleImpact]);

  // ── Case Studies Renderer ─────────────────────────────────────
  const renderCases = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.blueDm, marginBottom: 6,
        }}>
          KEY EVENTS IN AMERICAN FOREIGN RELATIONS {'\—'} 8 CASE STUDIES{AnchorIcon}
        </div>
        {TipBox('spanish_american')}
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          Each case study represents a decision point where American policymakers confronted
          the tension between principles and power, neutrality and engagement, commerce and
          idealism. The events are ordered chronologically, spanning the full arc from the
          early republic to the eve of the Great War.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CASE_STUDIES.map(cs => {
            const isOpen = expandedCase === cs.id;
            const eraObj = ERAS.find(e => e.id === cs.era);
            return (
              <div
                key={cs.id}
                style={{
                  background: C.card,
                  border: '1px solid ' + (isOpen ? C.blueDm : C.cardBd),
                  borderRadius: 8, overflow: 'hidden',
                  transition: 'border-color .15s ease',
                }}
              >
                {/* Card header */}
                <button
                  onClick={() => toggleCase(cs.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 13, fontFamily: Mono, fontWeight: 700,
                    width: 52, height: 44,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.blueBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                    color: C.blue, letterSpacing: '.04em',
                  }}>
                    {cs.year}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                      color: C.blueDm, marginBottom: 2,
                    }}>
                      ERA {eraObj?.num} {'\—'} {eraObj?.title}
                    </div>
                    <div style={{
                      fontFamily: Serif, fontSize: 17, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {cs.title}
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
                      {cs.summary}
                    </div>

                    {/* Key actors */}
                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.tx3, marginBottom: 8,
                    }}>
                      KEY ACTORS
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                      {cs.actors.map(a => (
                        <span key={a} style={{
                          fontFamily: Mono, fontSize: 11, padding: '3px 8px', borderRadius: 3,
                          background: C.goldBg, color: C.goldDm, letterSpacing: '.03em',
                          border: '1px solid ' + C.line,
                        }}>
                          {a}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      background: C.blueBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.blueDm, marginBottom: 6,
                      }}>
                        HISTORICAL SIGNIFICANCE
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.blue,
                        lineHeight: 1.7,
                      }}>
                        {cs.significance}
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
  }, [expandedCase, toggleCase]);

  // ── Themes Renderer ───────────────────────────────────────────
  const renderThemes = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.blueDm, marginBottom: 6,
        }}>
          RECURRING PATTERNS {'\—'} 3 THEMATIC LENSES{TelegramIcon}
        </div>
        {TipBox('zimmermann')}
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          These three themes recur across every era of American foreign relations.
          They are not resolved but perpetually renegotiated as circumstances change.
          Tracing their evolution reveals the deep structural tensions in American
          foreign policy that persist to the present day.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {THEMES.map(theme => {
            const isOpen = expandedTheme === theme.id;
            return (
              <div
                key={theme.id}
                style={{
                  background: C.card,
                  border: '1px solid ' + (isOpen ? C.blueDm : C.cardBd),
                  borderRadius: 8, overflow: 'hidden',
                  transition: 'border-color .15s ease',
                }}
              >
                <button
                  onClick={() => toggleTheme(theme.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 24, width: 44, height: 44,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.blueBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                  }}>
                    {theme.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 17, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {theme.title}
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
                      {theme.description}
                    </div>

                    <div style={{
                      fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                      color: C.tx3, marginBottom: 8,
                    }}>
                      MANIFESTATION ACROSS ERAS
                    </div>
                    <ul style={{
                      listStyle: 'none', padding: 0, margin: '0 0 16px',
                    }}>
                      {theme.eraManifestations.map((m, i) => (
                        <li key={i} style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx2,
                          lineHeight: 1.65, padding: '6px 0 6px 16px',
                          borderLeft: '2px solid ' + C.line,
                          marginBottom: 4, display: 'flex', gap: 8,
                        }}>
                          <span style={{
                            fontFamily: Mono, fontSize: 12, color: C.blue,
                            fontWeight: 700, flexShrink: 0, minWidth: 24,
                          }}>
                            {m.era}
                          </span>
                          <span>{m.note}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{
                      background: C.blueBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.blueDm, marginBottom: 6,
                      }}>
                        HISTORIOGRAPHIC NOTE
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.blue,
                        lineHeight: 1.7,
                      }}>
                        {theme.historiography}
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
  }, [expandedTheme, toggleTheme]);

  // ── Doctrine Map Renderer (SVG Timeline) ─────────────────────
  const renderDoctrineMap = useCallback(() => {
    const timelineStart = 1780;
    const timelineEnd = 1920;
    const range = timelineEnd - timelineStart;
    const xPad = 30;
    const svgW = 860;
    const chartW = svgW - xPad * 2;
    const yearToX = (yr) => xPad + ((yr - timelineStart) / range) * chartW;

    const handleSvgMouseMove = (e) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * svgW;
      const yr = timelineStart + ((svgX - xPad) / chartW) * range;
      if (yr >= timelineStart && yr <= timelineEnd) {
        setCursorYear(Math.round(yr));
      } else {
        setCursorYear(null);
      }
    };

    const handleSvgMouseLeave = () => setCursorYear(null);

    // Build opacity points for a band: fade in from start to peak, fade out from peak to end
    const bandPath = (b) => {
      const pts = [];
      const steps = 40;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const yr = b.start + t * (b.end - b.start);
        const x = yearToX(yr);
        let opacity;
        if (yr <= b.peak) {
          opacity = (yr - b.start) / (b.peak - b.start);
        } else {
          opacity = 1 - (yr - b.peak) / (b.end - b.peak);
        }
        opacity = Math.max(0.05, Math.min(1, opacity));
        pts.push({ x, opacity });
      }
      return pts;
    };

    const tickYears = [1780, 1800, 1820, 1840, 1860, 1880, 1900, 1920];
    const activeBand = DOCTRINE_BANDS.find(b => b.id === selectedBand);

    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.blueDm, marginBottom: 6,
        }}>
          DOCTRINE INFLUENCE MAP {'\—'} 1780{'\u2013'}1920
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 16, maxWidth: 720,
        }}>
          How American foreign policy doctrines waxed, waned, and overlapped.
          Each band shows a doctrine's influence over time {'\—'} opacity represents intensity.
          Click a band to reveal its core insight. Hover to track years.
        </div>

        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 10, padding: '20px 12px', marginBottom: 16, overflowX: 'auto',
        }}>
          <svg
            ref={svgRef}
            viewBox={'0 0 ' + svgW + ' 380'}
            style={{ width: '100%', height: 'auto', display: 'block', cursor: 'crosshair' }}
            onMouseMove={handleSvgMouseMove}
            onMouseLeave={handleSvgMouseLeave}
          >
            {/* Background grid lines */}
            {tickYears.map(yr => (
              <line
                key={'grid-' + yr}
                x1={yearToX(yr)} y1={30} x2={yearToX(yr)} y2={350}
                stroke={C.line} strokeWidth={1}
              />
            ))}

            {/* X-axis labels */}
            {tickYears.map(yr => (
              <text
                key={'lbl-' + yr}
                x={yearToX(yr)} y={370}
                textAnchor="middle" fill={C.tx3}
                style={{ fontFamily: Mono, fontSize: 12 }}
              >
                {yr}
              </text>
            ))}

            {/* Doctrine bands */}
            {DOCTRINE_BANDS.map(b => {
              const pts = bandPath(b);
              const isSelected = selectedBand === b.id;
              const bandH = 36;
              return (
                <g key={b.id}
                  onClick={() => setSelectedBand(prev => prev === b.id ? null : b.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Band segments with varying opacity */}
                  {pts.map((pt, i) => {
                    if (i === pts.length - 1) return null;
                    const next = pts[i + 1];
                    return (
                      <rect
                        key={i}
                        x={pt.x}
                        y={b.y - bandH / 2}
                        width={Math.max(1, next.x - pt.x + 0.5)}
                        height={bandH}
                        fill={b.color}
                        opacity={pt.opacity * (isSelected ? 1.0 : 0.7)}
                        rx={i === 0 ? 4 : 0}
                      />
                    );
                  })}

                  {/* Selection highlight border */}
                  {isSelected && (
                    <rect
                      x={yearToX(b.start)} y={b.y - bandH / 2 - 2}
                      width={yearToX(b.end) - yearToX(b.start)} height={bandH + 4}
                      fill="none" stroke={b.color} strokeWidth={2}
                      rx={4} opacity={0.9}
                    />
                  )}

                  {/* Label */}
                  <text
                    x={yearToX(b.peak)}
                    y={b.y + 4}
                    textAnchor="middle"
                    fill="#fff"
                    style={{ fontFamily: Sans, fontSize: 11, fontWeight: 600, pointerEvents: 'none' }}
                  >
                    {b.label}
                  </text>
                </g>
              );
            })}

            {/* Cursor line */}
            {cursorYear !== null && cursorYear >= timelineStart && cursorYear <= timelineEnd && (
              <g>
                <line
                  x1={yearToX(cursorYear)} y1={30}
                  x2={yearToX(cursorYear)} y2={350}
                  stroke={C.gold} strokeWidth={1.5} strokeDasharray="4,3" opacity={0.7}
                />
                <rect
                  x={yearToX(cursorYear) - 22} y={18}
                  width={44} height={18} rx={4}
                  fill={C.navy} opacity={0.95}
                />
                <text
                  x={yearToX(cursorYear)} y={31}
                  textAnchor="middle" fill={C.gold}
                  style={{ fontFamily: Mono, fontSize: 11, fontWeight: 700 }}
                >
                  {cursorYear}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Insight panel */}
        {activeBand && (
          <div style={{
            background: C.card, border: '1px solid ' + C.cardBd,
            borderRadius: 8, padding: 20, marginBottom: 16,
            borderLeft: '4px solid ' + activeBand.color,
          }}>
            <div style={{
              fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
              color: activeBand.color, marginBottom: 8, fontWeight: 600,
            }}>
              {'\u2606'} {activeBand.label.toUpperCase()} ({activeBand.start}{'\u2013'}{activeBand.end})
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
            }}>
              {activeBand.insight}
            </div>
          </div>
        )}

        {!activeBand && (
          <div style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3,
            textAlign: 'center', padding: '12px 0',
          }}>
            Click a doctrine band above to reveal its core insight.
          </div>
        )}

        {/* Legend */}
        <div style={{
          display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
          marginTop: 8,
        }}>
          {DOCTRINE_BANDS.map(b => (
            <div key={b.id} style={{
              display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
              opacity: selectedBand && selectedBand !== b.id ? 0.4 : 1,
              transition: 'opacity .15s ease',
            }}
              onClick={() => setSelectedBand(prev => prev === b.id ? null : b.id)}
            >
              <div style={{
                width: 12, height: 12, borderRadius: 2, background: b.color,
              }} />
              <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx2 }}>
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }, [selectedBand, cursorYear]);

  // ── Pendulum Renderer ──────────────────────────────────────────
  const PENDULUM_POINTS = useMemo(() => [
    { id: 'p1', year: 1789, label: 'Washington\'s Farewell', angle: -70, pole: 'isolationism',
      trigger: 'Founding of the republic; fear of European entanglements',
      policy: 'Neutrality proclamation, no permanent alliances, focus on continental development',
      duration: '~1789-1823 (34 years)',
      ended: 'Monroe Doctrine asserted hemispheric interest, beginning tentative outward turn' },
    { id: 'p2', year: 1823, label: 'Monroe Doctrine', angle: -40, pole: 'isolationism',
      trigger: 'Latin American independence movements; European recolonization threat',
      policy: 'Hemispheric non-interference claim. Still isolationist re: Europe, but asserting regional sphere',
      duration: '~1823-1846 (23 years)',
      ended: 'Mexican-American War demonstrated willingness to use force for expansion' },
    { id: 'p3', year: 1846, label: 'Mexican-American War', angle: -10, pole: 'transitional',
      trigger: 'Manifest Destiny ideology; Texas annexation; Polk\'s expansionism',
      policy: 'Continental expansion by force. Not yet overseas intervention, but aggressive territorial acquisition',
      duration: '~1846-1865 (19 years)',
      ended: 'Civil War turned focus inward; post-war reconstruction absorbed national energy' },
    { id: 'p4', year: 1865, label: 'Post-Civil War Retrenchment', angle: -50, pole: 'isolationism',
      trigger: 'Exhaustion from Civil War; Reconstruction demands; industrial growth',
      policy: 'Inward focus. Building transcontinental railroad, settling West, industrializing. Foreign policy minimal.',
      duration: '~1865-1898 (33 years)',
      ended: 'Spanish-American War -- the explosion of overseas interventionism' },
    { id: 'p5', year: 1898, label: 'Spanish-American War', angle: 60, pole: 'interventionism',
      trigger: 'USS Maine, yellow journalism, strategic interest in Caribbean/Pacific, Mahan\'s sea power thesis',
      policy: 'First overseas empire: Philippines, Puerto Rico, Guam, Cuba protectorate. Dramatic swing to global power projection.',
      duration: '~1898-1920 (22 years)',
      ended: 'Senate rejected League of Nations; war weariness triggered isolationist backlash' },
    { id: 'p6', year: 1904, label: 'Roosevelt Corollary', angle: 70, pole: 'interventionism',
      trigger: 'Venezuelan crisis; European debt collection in Latin America; Panama Canal',
      policy: 'US as international police power in Western Hemisphere. Maximum interventionist extension of Monroe Doctrine.',
      duration: '~1904-1913 (9 years, within broader interventionist era)',
      ended: 'Wilson shifted from "big stick" to moral internationalism, then back to intervention (WWI)' },
    { id: 'p7', year: 1917, label: 'Wilson\'s WWI Entry', angle: 55, pole: 'interventionism',
      trigger: 'Unrestricted submarine warfare; Zimmermann Telegram; Wilson\'s "make the world safe for democracy"',
      policy: 'First massive overseas military deployment. 2 million troops to Europe. League of Nations proposal.',
      duration: '~1917-1920 (3 years of war, then rapid retrenchment)',
      ended: 'Senate rejected Versailles Treaty/League; public turned sharply isolationist' },
    { id: 'p8', year: 1920, label: 'Interwar Isolationism', angle: -65, pole: 'isolationism',
      trigger: 'Disillusionment with WWI; Senate rejection of League; Nye Committee (arms dealers profited from war)',
      policy: 'Neutrality Acts (1935-37), Kellogg-Briand Pact (outlawing war), refusal to join League or World Court',
      duration: '~1920-1941 (21 years)',
      ended: 'Pearl Harbor made isolationism politically impossible overnight' },
    { id: 'p9', year: 1941, label: 'Pearl Harbor / WWII', angle: 75, pole: 'interventionism',
      trigger: 'Japanese attack eliminated isolationist argument; Hitler declared war on US',
      policy: 'Total war mobilization. 16 million in uniform. Global two-theater campaign. Atomic weapons. UN founding.',
      duration: '~1941-1945 (4 years of war, then permanent global posture)',
      ended: 'Never fully ended -- transitioned directly into Cold War interventionism' },
    { id: 'p10', year: 1947, label: 'Truman Doctrine / Cold War', angle: 65, pole: 'interventionism',
      trigger: 'Soviet expansion; containment theory (Kennan); Greek/Turkish crisis',
      policy: 'Permanent global alliance system. NATO, SEATO, CENTO. Forward-deployed forces worldwide. Nuclear deterrence.',
      duration: '~1947-1975 (28 years until Vietnam collapse)',
      ended: 'Vietnam War discredited interventionism; Nixon Doctrine pulled back from direct engagement' },
    { id: 'p11', year: 1975, label: 'Post-Vietnam Retrenchment', angle: -25, pole: 'isolationism',
      trigger: 'Fall of Saigon; War Powers Act; Church Committee; public distrust of military intervention',
      policy: 'Partial retrenchment. Carter human rights focus. Reagan re-armed but used proxies (contras, mujahideen) not direct intervention.',
      duration: '~1975-1991 (16 years)',
      ended: 'Gulf War demonstrated renewed willingness for large-scale deployment; Soviet collapse removed constraint' },
    { id: 'p12', year: 1991, label: 'Unipolar Moment', angle: 50, pole: 'interventionism',
      trigger: 'Soviet collapse; Gulf War success; "end of history" thesis; sole superpower status',
      policy: 'Humanitarian intervention (Somalia, Bosnia, Kosovo), democracy promotion, NATO expansion, then 9/11 maximalism (Afghanistan, Iraq).',
      duration: '~1991-2021 (30 years)',
      ended: 'Afghanistan withdrawal (2021); rising public opposition to "forever wars"; pivot toward great power competition and selective engagement' },
  ], []);

  const renderPendulum = useCallback(() => {
    var selected = pendulumSelected !== null ? PENDULUM_POINTS.find(function(p) { return p.id === pendulumSelected; }) : null;
    var svgW = 700;
    var svgH = 400;
    var pivotX = svgW / 2;
    var pivotY = 40;
    var armLen = 300;

    return (
      <div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.6, marginBottom: 20 }}>
          American foreign policy swings between isolationism and interventionism in roughly 20-30 year cycles.
          Click any point on the pendulum arc to see what triggered each swing, what the policy looked like,
          and what ended it. The pattern is remarkably consistent across 237 years.
        </div>

        {/* SVG Pendulum */}
        <svg viewBox={'0 0 ' + svgW + ' ' + svgH} style={{ width: '100%', height: 'auto', background: 'rgba(8,14,32,.5)', borderRadius: 6, border: '1px solid ' + C.line, marginBottom: 16 }}>
          {/* Arc */}
          <path d={'M ' + (pivotX - armLen * Math.sin(75 * Math.PI / 180)) + ' ' + (pivotY + armLen * Math.cos(75 * Math.PI / 180)) +
            ' A ' + armLen + ' ' + armLen + ' 0 0 1 ' + (pivotX + armLen * Math.sin(75 * Math.PI / 180)) + ' ' + (pivotY + armLen * Math.cos(75 * Math.PI / 180))}
            fill="none" stroke="rgba(60,90,140,.15)" strokeWidth="1" strokeDasharray="4,4"/>
          {/* Pivot */}
          <circle cx={pivotX} cy={pivotY} r="4" fill={C.gold}/>
          {/* Labels */}
          <text x={pivotX - armLen * Math.sin(65 * Math.PI / 180) - 10} y={pivotY + armLen * Math.cos(65 * Math.PI / 180)}
            textAnchor="end" fill={C.blue} style={{fontSize:11,fontFamily:Mono,fontWeight:700}}>ISOLATIONISM</text>
          <text x={pivotX + armLen * Math.sin(65 * Math.PI / 180) + 10} y={pivotY + armLen * Math.cos(65 * Math.PI / 180)}
            textAnchor="start" fill={C.red} style={{fontSize:11,fontFamily:Mono,fontWeight:700}}>INTERVENTIONISM</text>
          <text x={pivotX} y={svgH - 10} textAnchor="middle" fill={C.tx3} style={{fontSize:10,fontFamily:Mono}}>CENTER (selective engagement)</text>

          {/* Data points */}
          {PENDULUM_POINTS.map(function(pt) {
            var rad = pt.angle * Math.PI / 180;
            var px = pivotX + armLen * Math.sin(rad);
            var py = pivotY + armLen * Math.cos(rad);
            var isSelected = pendulumSelected === pt.id;
            var dotColor = pt.angle < -20 ? C.blue : (pt.angle > 20 ? C.red : C.gold);
            return (
              <g key={pt.id} onClick={function() { setPendulumSelected(isSelected ? null : pt.id); }} style={{cursor:'pointer'}}>
                {isSelected && <line x1={pivotX} y1={pivotY} x2={px} y2={py} stroke={dotColor} strokeWidth="1.5" opacity="0.5"/>}
                <circle cx={px} cy={py} r={isSelected ? 8 : 5} fill={dotColor} opacity={isSelected ? 1 : 0.7}
                  stroke={isSelected ? '#fff' : 'none'} strokeWidth="1.5"/>
                <text x={px} y={py - 10} textAnchor="middle" fill={isSelected ? '#fff' : C.tx3}
                  style={{fontSize:8,fontFamily:Mono,pointerEvents:'none'}}>
                  {pt.year}
                </text>
              </g>
            );
          })}

          {/* Connecting line through points in chronological order */}
          <polyline
            points={PENDULUM_POINTS.map(function(pt) {
              var rad = pt.angle * Math.PI / 180;
              return (pivotX + armLen * Math.sin(rad)) + ',' + (pivotY + armLen * Math.cos(rad));
            }).join(' ')}
            fill="none" stroke="rgba(212,184,80,.15)" strokeWidth="1"/>
        </svg>

        {/* Selected point detail */}
        {selected && (
          <div style={{ padding: 16, background: C.card, border: '1px solid ' + C.line, borderRadius: 6, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div style={{ fontFamily: Serif, fontSize: 18, color: selected.angle < -20 ? C.blue : (selected.angle > 20 ? C.red : C.gold) }}>
                {selected.label} ({selected.year})
              </div>
              <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                {selected.pole.toUpperCase()}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: 1, marginBottom: 4 }}>TRIGGER</div>
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>{selected.trigger}</div>
              </div>
              <div>
                <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: 1, marginBottom: 4 }}>POLICY</div>
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>{selected.policy}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12, borderTop: '1px solid ' + C.line, paddingTop: 12 }}>
              <div>
                <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: 1, marginBottom: 4 }}>DURATION</div>
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>{selected.duration}</div>
              </div>
              <div>
                <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: 1, marginBottom: 4 }}>WHAT ENDED IT</div>
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>{selected.ended}</div>
              </div>
            </div>
          </div>
        )}

        {/* Analytical insight */}
        <div style={{ padding: 12, background: C.goldBg, border: '1px solid rgba(212,184,80,.15)', borderRadius: 4 }}>
          <div style={{ fontFamily: Mono, fontSize: 11, color: C.gold, letterSpacing: 1, marginBottom: 4 }}>ANALYTICAL PATTERN</div>
          <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>
            The pendulum swings with striking regularity: isolationist phases average ~25 years, interventionist
            phases average ~20 years. Each interventionist phase ends with public exhaustion and overreach
            (WWI disillusionment, Vietnam syndrome, post-Iraq fatigue). Each isolationist phase ends with a shock
            that makes withdrawal impossible (Pearl Harbor, Soviet expansion, 9/11). The current post-Afghanistan
            moment resembles previous retrenchments -- suggesting the next interventionist swing may be triggered
            by a crisis the current consensus cannot absorb.
          </div>
        </div>
      </div>
    );
  }, [pendulumSelected, PENDULUM_POINTS]);

  // ── Power Projection Renderer ─────────────────────────────────────
  const POWER_SCENARIOS = useMemo(() => [
    { id: 'gulf', label: 'Persian Gulf Deployment',
      desc: 'Maintaining carrier strike group presence in the Persian Gulf to deter Iran and protect oil shipping lanes.',
      eras: {
        coldwar: { ships: 25, personnel: 35000, dailyCost: 18, deployDays: 14, chainKm: 12000, label: 'Cold War (1980s)' },
        post911: { ships: 40, personnel: 65000, dailyCost: 55, deployDays: 10, chainKm: 12000, label: 'Post-9/11 (2003)' },
        current: { ships: 15, personnel: 20000, dailyCost: 35, deployDays: 12, chainKm: 12000, label: 'Current (2024)' },
      }},
    { id: 'nato', label: 'NATO Reinforcement',
      desc: 'Surging forces to Eastern Europe in response to Russian aggression. Requires transatlantic logistics chain.',
      eras: {
        coldwar: { ships: 60, personnel: 300000, dailyCost: 120, deployDays: 7, chainKm: 6000, label: 'Cold War (pre-positioned)' },
        post911: { ships: 20, personnel: 30000, dailyCost: 25, deployDays: 21, chainKm: 6000, label: 'Post-9/11 (reduced posture)' },
        current: { ships: 35, personnel: 80000, dailyCost: 65, deployDays: 14, chainKm: 6000, label: 'Current (post-Ukraine)' },
      }},
    { id: 'pacific', label: 'Pacific Pivot',
      desc: 'Repositioning forces to the Western Pacific to counter Chinese military buildup. The Indo-Pacific rebalance.',
      eras: {
        coldwar: { ships: 45, personnel: 100000, dailyCost: 50, deployDays: 5, chainKm: 8000, label: 'Cold War (forward-based)' },
        post911: { ships: 30, personnel: 60000, dailyCost: 40, deployDays: 10, chainKm: 9000, label: 'Post-9/11 (distracted)' },
        current: { ships: 60, personnel: 90000, dailyCost: 80, deployDays: 8, chainKm: 9000, label: 'Current (priority theater)' },
      }},
    { id: 'humanitarian', label: 'Humanitarian Intervention',
      desc: 'Rapid deployment for disaster relief or civilian protection. Requires different capabilities than combat operations.',
      eras: {
        coldwar: { ships: 8, personnel: 5000, dailyCost: 5, deployDays: 7, chainKm: 'varies', label: 'Cold War (rare)' },
        post911: { ships: 12, personnel: 15000, dailyCost: 12, deployDays: 5, chainKm: 'varies', label: 'Post-9/11 (2004 tsunami)' },
        current: { ships: 10, personnel: 8000, dailyCost: 10, deployDays: 4, chainKm: 'varies', label: 'Current (contested access)' },
      }},
  ], []);

  const renderPower = useCallback(() => {
    var scenario = POWER_SCENARIOS[powerScenario];
    var eraData = scenario.eras[powerEra];
    var eraKeys = ['coldwar', 'post911', 'current'];

    return (
      <div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.6, marginBottom: 20 }}>
          Power projection is not abstract -- it has concrete costs in ships, personnel, dollars, and time.
          Select a scenario and compare across eras to see how American force projection capabilities and
          costs have changed.
        </div>

        {/* Scenario selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {POWER_SCENARIOS.map(function(s, i) {
            var active = powerScenario === i;
            return (
              <button key={s.id} onClick={function() { setPowerScenario(i); }}
                style={{ flex: '1 1 auto', minWidth: 120, padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
                  background: active ? C.blueBg : 'transparent',
                  border: active ? '1px solid ' + C.blueDm : '1px solid ' + C.line,
                  fontFamily: Mono, fontSize: 12, color: active ? C.blue : C.tx3, textAlign: 'center', transition: 'all .15s ease' }}>
                {s.label}
              </button>
            );
          })}
        </div>

        <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.5, marginBottom: 16, padding: 12, background: C.card, border: '1px solid ' + C.line, borderRadius: 4 }}>
          {scenario.desc}
        </div>

        {/* Era selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {eraKeys.map(function(ek) {
            var active = powerEra === ek;
            var eLabel = ek === 'coldwar' ? 'Cold War' : (ek === 'post911' ? 'Post-9/11' : 'Current');
            return (
              <button key={ek} onClick={function() { setPowerEra(ek); }}
                style={{ flex: 1, padding: '8px 12px', borderRadius: 4, cursor: 'pointer',
                  background: active ? C.goldBg : 'transparent',
                  border: active ? '1px solid ' + C.goldDm : '1px solid ' + C.line,
                  fontFamily: Mono, fontSize: 12, color: active ? C.gold : C.tx3, transition: 'all .15s ease' }}>
                {eLabel}
              </button>
            );
          })}
        </div>

        {/* Metrics display */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          {[
            { label: 'SHIPS REQUIRED', value: eraData.ships, unit: 'vessels', maxVal: 80, color: C.blue },
            { label: 'PERSONNEL', value: eraData.personnel, unit: 'troops', maxVal: 350000, color: C.gold },
            { label: 'DAILY COST', value: eraData.dailyCost, unit: '$M/day', maxVal: 150, color: C.red },
          ].map(function(m) {
            var pct = Math.min(100, (m.value / m.maxVal) * 100);
            return (
              <div key={m.label} style={{ padding: 14, background: C.card, border: '1px solid ' + C.line, borderRadius: 4 }}>
                <div style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, letterSpacing: 1, marginBottom: 6 }}>{m.label}</div>
                <div style={{ fontFamily: Serif, fontSize: 24, color: m.color, marginBottom: 4 }}>
                  {typeof m.value === 'number' ? m.value.toLocaleString() : m.value}
                </div>
                <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>{m.unit}</div>
                <div style={{ marginTop: 8, height: 6, background: 'rgba(60,90,140,.1)', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: pct + '%', background: m.color, borderRadius: 3, transition: 'width .3s ease', opacity: 0.7 }}/>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ padding: 14, background: C.card, border: '1px solid ' + C.line, borderRadius: 4 }}>
            <div style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, letterSpacing: 1, marginBottom: 6 }}>TIME TO DEPLOY</div>
            <div style={{ fontFamily: Serif, fontSize: 24, color: C.blue }}>{eraData.deployDays} days</div>
            <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>from order to operational</div>
          </div>
          <div style={{ padding: 14, background: C.card, border: '1px solid ' + C.line, borderRadius: 4 }}>
            <div style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, letterSpacing: 1, marginBottom: 6 }}>LOGISTICAL CHAIN</div>
            <div style={{ fontFamily: Serif, fontSize: 24, color: C.gold }}>{eraData.chainKm}{typeof eraData.chainKm === 'number' ? ' km' : ''}</div>
            <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>supply line length</div>
          </div>
        </div>

        {/* Cross-era comparison bar chart */}
        <div style={{ padding: 16, background: C.card, border: '1px solid ' + C.line, borderRadius: 6, marginBottom: 16 }}>
          <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: 1, marginBottom: 12 }}>CROSS-ERA COMPARISON: DAILY COST ($M)</div>
          <svg viewBox="0 0 500 120" style={{ width: '100%', height: 'auto' }}>
            {eraKeys.map(function(ek, i) {
              var d = scenario.eras[ek];
              var barW = Math.min(400, (d.dailyCost / 150) * 400);
              var yPos = 10 + i * 35;
              var eLabel = ek === 'coldwar' ? 'Cold War' : (ek === 'post911' ? 'Post-9/11' : 'Current');
              var barColor = ek === powerEra ? C.gold : 'rgba(60,90,140,.4)';
              return (
                <g key={ek}>
                  <text x="0" y={yPos + 12} fill={ek === powerEra ? C.gold : C.tx3} style={{fontSize:10,fontFamily:Mono}}>{eLabel}</text>
                  <rect x="80" y={yPos} width={barW} height={18} rx="2" fill={barColor} opacity="0.7"/>
                  <text x={80 + barW + 8} y={yPos + 13} fill={C.tx2} style={{fontSize:11,fontFamily:Mono}}>${d.dailyCost}M/day</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Structural insight */}
        <div style={{ padding: 12, background: C.redBg, border: '1px solid rgba(184,56,56,.15)', borderRadius: 4 }}>
          <div style={{ fontFamily: Mono, fontSize: 11, color: C.red, letterSpacing: 1, marginBottom: 4 }}>STRUCTURAL OBSERVATION</div>
          <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>
            Power projection costs have increased dramatically even as force sizes decreased. The US spends more
            per deployed soldier than any nation in history. Technology has replaced personnel but not reduced
            total cost. The logistical tail (supply chain) now exceeds the combat force in both size and cost.
            This means the US can project overwhelming force -- but not cheaply, not quickly, and not indefinitely.
            Every deployment is a fiscal decision as much as a strategic one.
          </div>
        </div>
      </div>
    );
  }, [powerScenario, powerEra, POWER_SCENARIOS]);

  // ── Main Render ───────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: Sans, position: 'relative', overflow: 'hidden' }} ref={topRef}>
      {/* Stars-and-stripes subtle background */}
      <StarsPattern />
      <StripesOverlay />
      <div style={{ position: 'relative' }}>
        <EagleWatermark />
      </div>
      {/* Navy radial glow */}
      <div style={{
        position:'fixed',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:0,
        background:'radial-gradient(ellipse at 50% 30%, rgba(40,60,100,.12) 0%, transparent 60%)',
      }}/>

      {/* Top bar — presidential seal styling */}
      <div style={{
        position: 'sticky', top: 6, zIndex: 100,
        background: 'linear-gradient(180deg, rgba(4,8,24,.97) 0%, rgba(8,14,32,.95) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '2px solid rgba(212,184,80,.15)', padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer', letterSpacing: '.04em',
        }}>
          {'\u2190'} Back to Coursework
        </button>
        <span style={{ fontFamily: Mono, fontSize: 12, color: C.gold, letterSpacing: '.08em' }}>
          HIST {'\u2014'} AMERICAN FOREIGN RELATIONS 1776{'\u2013'}1916
        </span>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Hero section — State Department cable styling */}
        <div style={{ marginBottom: 24 }}>
          {/* Gold pinstripe */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,184,80,.2) 20%, rgba(212,184,80,.3) 50%, rgba(212,184,80,.2) 80%, transparent)', marginBottom: 20 }}/>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1 style={{
              fontFamily: Serif, fontSize: 34, fontWeight: 700,
              color: C.white, letterSpacing: '-.01em', marginBottom: 8,
              textShadow: '0 0 40px rgba(64,112,168,.15)',
            }}>
              Doctrine Tracker
            </h1>
            {/* Shield / Eagle icon */}
            <svg width="52" height="44" viewBox="0 0 52 44" style={{opacity:0.2,flexShrink:0,color:C.gold}}>
              <path d="M26 4 L6 18 L6 32 Q6 40 26 42 Q46 40 46 32 L46 18 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
              <line x1="18" y1="18" x2="18" y2="38" stroke="currentColor" strokeWidth="0.5"/>
              <line x1="26" y1="14" x2="26" y2="40" stroke="currentColor" strokeWidth="0.5"/>
              <line x1="34" y1="18" x2="34" y2="38" stroke="currentColor" strokeWidth="0.5"/>
              <rect x="10" y="14" width="32" height="6" fill="currentColor" fillOpacity="0.08"/>
              {[14,20,26,32,38].map(x => <circle key={x} cx={x} cy="10" r="1.2" fill="currentColor" fillOpacity="0.3"/>)}
            </svg>
          </div>

          {/* Double gold line */}
          <div style={{ display:'flex', gap:2, marginBottom: 12 }}>
            <div style={{ flex:1, height: 1, background: 'rgba(212,184,80,.15)' }}/>
            <div style={{ flex:1, height: 1, background: 'rgba(212,184,80,.1)' }}/>
          </div>

          <p style={{
            fontFamily: Serif, fontSize: 15, color: C.tx2,
            lineHeight: 1.65, marginBottom: 4, maxWidth: 720,
          }}>
            Trace the evolution of American foreign policy through its defining doctrines,
            from Washington's Farewell Address to Wilson's road to intervention. Each era
            presents a strategic decision point that reshaped America's relationship with
            the world. Analyze the doctrines, study the case studies, identify the recurring
            patterns that persist to the present day.
          </p>
          <p style={{
            fontFamily: Mono, fontSize: 11, color: C.tx3,
            lineHeight: 1.65, marginBottom: 12, maxWidth: 720, letterSpacing: '.06em',
          }}>
            Neutrality, Monroe Doctrine, Manifest Destiny, Imperialism, Wilsonianism
          </p>

          {/* Skills tags — red/white/blue chips */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            {SKILLS.map((tag, i) => {
              const colors = [C.blueBg, C.redBg, C.goldBg];
              const borders = [C.blueDm, C.redDm, C.goldDm];
              return (
                <span key={tag} style={{
                  fontFamily: Mono, fontSize: 11, padding: '3px 10px', borderRadius: 2,
                  background: colors[i % 3], color: borders[i % 3], letterSpacing: '.04em',
                  borderLeft: '2px solid ' + borders[i % 3],
                }}>
                  {tag}
                </span>
              );
            })}
          </div>

          {/* Progress — red/white/blue bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, letterSpacing: '.04em' }}>DOCTRINES ANALYZED</span>
            <div style={{ flex: 1, maxWidth: 200, height: 4, background: C.line, borderRadius: 2 }}>
              <div style={{
                width: (revealedCount / 6 * 100) + '%',
                height: '100%', borderRadius: 2,
                background: revealedCount === 6 ? C.gold : C.blue,
                transition: 'width .3s ease',
              }} />
            </div>
            <span style={{
              fontFamily: Mono, fontSize: 12,
              color: revealedCount === 6 ? C.gold : C.blue,
            }}>
              {revealedCount}/6
            </span>
          </div>
        </div>

        <ModeSwitch />

        {mode === 'doctrines' && renderDoctrines()}
        {mode === 'cases' && renderCases()}
        {mode === 'themes' && renderThemes()}
        {mode === 'doctrinemap' && renderDoctrineMap()}
        {mode === 'pendulum' && renderPendulum()}
        {mode === 'power' && renderPower()}

        {/* Provenance Strip — presidential library styling */}
        <div style={{
          marginTop: 48, padding: 20,
          borderTop: '2px solid rgba(212,184,80,.1)',
          display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center',
        }}>
          {PROVENANCE.map(p => (
            <div key={p.label} style={{
              textAlign: 'center', flex: '0 0 auto',
              padding: '8px 16px',
              borderLeft: '2px solid rgba(212,184,80,.12)',
            }}>
              <div style={{
                fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.gold, opacity: 0.7,
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
            padding: '10px 32px', border: '1px solid rgba(212,184,80,.15)', borderRadius: 2,
            background: 'transparent', color: C.tx2,
            fontFamily: Mono, fontSize: 13, letterSpacing: '.04em', cursor: 'pointer',
          }}>
            {'\u2190'} Back to Coursework
          </button>
        </div>
      </div>
    </div>
  );
}
