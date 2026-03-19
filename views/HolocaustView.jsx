// HolocaustView.jsx — War and the Holocaust in Europe
// Analytical Instruments for the Study of Mass Violence
//
// Five tools built for thinking, not reference:
//   1. Bloodlands — Snyder's Geographic Overlap Engine
//   2. Mechanisms — How Mass Killing Becomes Possible
//   3. Chronology — The Radicalization Spiral
//   4. Perpetrators — Browning's Ordinary Men Analysis
//   5. Never Again — Early Warning Indicators
//
// Sources: Snyder (Bloodlands, Black Earth), Browning (Ordinary Men),
//   Hilberg (Destruction of the European Jews), Arendt (Eichmann in Jerusalem),
//   Stanton (10 Stages of Genocide), UN Framework of Analysis (2014)


// ── Palette: Memorial — charcoal, muted amber, bone ──────────────────
const HC = {
  bg:       '#0c0a08',
  bgCard:   'rgba(16,14,12,.96)',
  cardBd:   'rgba(200,184,136,.12)',
  tx:       '#c8c0a8',
  tx2:      '#8a8068',
  tx3:      '#585040',
  accent:   '#c8b888',
  accentDm: '#a09060',
  accentBg: 'rgba(200,184,136,.06)',
  red:      '#8b3030',
  redSoft:  'rgba(139,48,48,.35)',
  blue:     '#3a5878',
  blueSoft: 'rgba(58,88,120,.35)',
  purple:   '#6a3868',
  purpleSoft:'rgba(106,56,104,.40)',
  bone:     '#d8d0b8',
  warn:     '#a07028',
  warnBg:   'rgba(160,112,40,.08)',
  line:     'rgba(200,184,136,.10)',
  dark:     '#181410',
};
const HMono  = "'IBM Plex Mono',monospace";
const HSerif = "'Source Serif 4',Georgia,serif";
const HSans  = "'Inter',Helvetica,sans-serif";


// ═══════════════════════════════════════════════════════════════════════
//  BLOODLANDS DATA — 15 locations with dual-regime analysis
// ═══════════════════════════════════════════════════════════════════════

const BLOODLANDS_LOCATIONS = [
  { id:'auschwitz', name:'Auschwitz-Birkenau', x:295, y:285, regime:'nazi',
    killed:'1,100,000', period:'1940-1945',
    desc:'Largest Nazi extermination and concentration camp complex. Industrialized killing via Zyklon B gas chambers. Approximately 960,000 Jews, 74,000 Poles, 21,000 Roma, 15,000 Soviet POWs murdered.',
    source:'Piper, Franciszek. "The Number of Victims" in Anatomy of the Auschwitz Death Camp (1994)' },
  { id:'treblinka', name:'Treblinka', x:330, y:240, regime:'nazi',
    killed:'870,000', period:'1942-1943',
    desc:'Operation Reinhard death camp. Second-highest death toll of any camp. Almost entirely Jews from the Warsaw Ghetto and other Polish ghettos. Camp destroyed by SS to hide evidence.',
    source:'Arad, Yitzhak. Belzec, Sobibor, Treblinka: The Operation Reinhard Death Camps (1987)' },
  { id:'sobibor', name:'Sobibor', x:345, y:260, regime:'nazi',
    killed:'167,000', period:'1942-1943',
    desc:'Operation Reinhard camp in eastern Poland. Site of the October 1943 prisoner revolt — one of few successful camp uprisings. Most victims were Dutch, Polish, and Soviet Jews.',
    source:'Schelvis, Jules. Sobibor: A History of a Nazi Death Camp (2007)' },
  { id:'belzec', name:'Belzec', x:350, y:300, regime:'nazi',
    killed:'434,500', period:'1942-1943',
    desc:'First Operation Reinhard camp. Killed primarily Jews from southeastern Poland and western Ukraine. Fewer than 10 known survivors — the lowest survival rate of any camp.',
    source:'Tregenza, Michael. "Belzec Death Camp" in Wiener Library Bulletin (1977)' },
  { id:'babiyar', name:'Babi Yar', x:410, y:275, regime:'both',
    killed:'100,000+', period:'1941-1943',
    desc:'Ravine near Kyiv where Einsatzgruppe C and local collaborators shot 33,771 Jews on September 29-30, 1941 — the largest single massacre of the Holocaust. Soviets later suppressed its specifically Jewish character.',
    source:'Berkhoff, Karel. "Babi Yar" in Harvest of Despair (2004)' },
  { id:'katyn', name:'Katyn Forest', x:370, y:210, regime:'soviet',
    killed:'22,000', period:'April-May 1940',
    desc:'NKVD execution of approximately 22,000 Polish military officers, police, and intellectuals. Stalin ordered the massacre to decapitate Polish leadership. Soviets blamed Germany until 1990.',
    source:'Cienciala, Anna M. Katyn: A Crime Without Punishment (2007)' },
  { id:'vinnytsia', name:'Vinnytsia', x:395, y:310, regime:'both',
    killed:'28,000+', period:'1937-1938 / 1941-1943',
    desc:'Site of NKVD mass executions during the Great Terror (1937-38, approximately 9,400 shot). Later, German forces murdered the Jewish population. The Vinnytsia massacre was used by Nazi propaganda.',
    source:'Snyder, Timothy. Bloodlands: Europe Between Hitler and Stalin (2010)' },
  { id:'minsk', name:'Minsk', x:360, y:195, regime:'both',
    killed:'100,000+', period:'1937-1944',
    desc:'Soviet NKVD killed thousands in the Kurapaty forest (1937-41). German occupation: 100,000 Jews killed in ghetto liquidations and at Maly Trostenets. City lost 25% of its population.',
    source:'Snyder, Timothy. Bloodlands (2010); Epstein, Barbara. The Minsk Ghetto (2008)' },
  { id:'vilnius', name:'Vilnius', x:340, y:180, regime:'both',
    killed:'95,000', period:'1940-1944',
    desc:'The "Jerusalem of Lithuania." Soviet deportations 1940-41. German Einsatzgruppen murdered approximately 95% of Lithuanian Jews. Ponary forest was the primary killing site. FPO ghetto resistance.',
    source:'Arad, Yitzhak. Ghetto in Flames: The Struggle and Destruction of the Jews in Vilna (1980)' },
  { id:'riga', name:'Riga', x:345, y:155, regime:'both',
    killed:'46,000', period:'1940-1944',
    desc:'Soviet deportations of Latvian elites (1940-41). Rumbula forest massacre: 25,000 Jews shot November 30 and December 8, 1941. Riga ghetto held 30,000; virtually all murdered.',
    source:'Ezergailis, Andrew. The Holocaust in Latvia, 1941-1944 (1996)' },
  { id:'rumbula', name:'Rumbula', x:348, y:158, regime:'nazi',
    killed:'25,000', period:'Nov-Dec 1941',
    desc:'Forest outside Riga. Two-day massacre by Einsatzgruppe A and Latvian auxiliaries. Victims marched from the Riga ghetto, forced to undress, shot at the edge of pits. One of the largest two-day massacres.',
    source:'Angrick, Andrej and Klein, Peter. The "Final Solution" in Riga (2009)' },
  { id:'ponary', name:'Ponary (Paneriai)', x:338, y:182, regime:'nazi',
    killed:'100,000', period:'1941-1944',
    desc:'Killing site in forest pits outside Vilnius. 70,000 Jews, 20,000 Poles, 8,000 Soviet POWs shot by Einsatzkommando 9 and Lithuanian collaborators. In 1943, prisoners forced to exhume and burn bodies.',
    source:'Arad, Yitzhak. "The Murder of the Jews in German-Occupied Lithuania" in The Unknown Black Book (2008)' },
  { id:'trostenets', name:'Maly Trostenets', x:365, y:200, regime:'nazi',
    killed:'65,000', period:'1941-1944',
    desc:'Largest Nazi extermination site on Soviet territory. Jews from Minsk ghetto and Western Europe (Austria, Germany, Czech lands) killed. Mass shootings and gas vans. Largely forgotten until 2000s.',
    source:'Rentrop, Petra. "Maly Trostenets" in The United States Holocaust Memorial Museum Encyclopedia (2012)' },
  { id:'lviv', name:'Lviv (Lemberg)', x:355, y:305, regime:'both',
    killed:'130,000+', period:'1939-1944',
    desc:'Soviet NKVD executed thousands of prisoners in June 1941 retreat. Germans used the NKVD murders to incite anti-Jewish pogroms. 130,000+ Jews killed in ghetto, Janowska camp, and shooting actions.',
    source:'Himka, John-Paul. "The Lviv Pogrom of 1941" in Journal of Genocide Research (2011)' },
  { id:'warsaw', name:'Warsaw', x:315, y:250, regime:'nazi',
    killed:'400,000+', period:'1940-1943',
    desc:'Largest ghetto in occupied Europe: 400,000 Jews enclosed in 1.3 square miles. Mass starvation, disease. Treblinka deportations July-September 1942 (265,000 sent). Warsaw Ghetto Uprising April-May 1943.',
    source:'Engelking, Barbara and Leociak, Jacek. The Warsaw Ghetto: A Guide to the Perished City (2009)' },
];

// Holodomor zone (Soviet famine-genocide in Ukraine, 1932-33)
const HOLODOMOR_ZONE = { x:390, y:300, w:80, h:70, killed:'3,500,000-5,000,000', period:'1932-1933',
  desc:'Stalin-engineered famine in Soviet Ukraine. Grain requisitions, internal passport system preventing flight, and blacklisting of entire villages. Largest single-year death toll of any event in the Bloodlands.' };


// ═══════════════════════════════════════════════════════════════════════
//  MECHANISMS DATA — 6 mechanisms of mass killing
// ═══════════════════════════════════════════════════════════════════════

const MECHANISMS_DATA = [
  { id: 1, name: 'Dehumanization',
    def: 'Systematic redefinition of a group as subhuman through language, imagery, and law. Language changes always precede killing — the victims must first be placed outside the moral universe.',
    example: 'Nazi propaganda portrayed Jews as rats, vermin, bacilli. Der Sturmer cartoons. "Life unworthy of life" (lebensunwertes Leben) preceded T4 euthanasia and then the Holocaust.',
    parallels: [
      { case: 'Rwanda 1994', detail: 'RTLM radio called Tutsis "inyenzi" (cockroaches) and "inzoka" (snakes) for months before the genocide began.' },
      { case: 'Myanmar 2017', detail: 'Military and social media campaigns called Rohingya "kalar" (a slur) and "Bengali illegals," denying their existence as a people.' },
      { case: 'Srebrenica 1995', detail: 'Bosnian Serb media referred to Bosniak men as "Turks" and "balijas," invoking Ottoman-era resentments to justify elimination.' },
    ],
    warning: 'Watch for: official or state-media language that redefines a group as non-human, diseased, criminal, or alien. Especially dangerous when dehumanizing language enters legal documents.',
    scholar: 'Arendt, Origins of Totalitarianism; Smith, Less Than Human (2011)' },
  { id: 2, name: 'Bureaucratic Distance',
    def: 'The fragmentation of the killing process into administrative steps so that no single individual feels responsible for the outcome. Each bureaucrat handles only one part of the chain — scheduling trains, filing forms, allocating supplies.',
    example: 'Eichmann organized railway timetables for deportation trains. He never personally killed anyone. At his trial he claimed he was merely "following orders" and managing logistics — Arendt\'s "banality of evil."',
    parallels: [
      { case: 'Rwanda 1994', detail: 'Local officials distributed lists of Tutsi residents to Interahamwe militia. Administrative infrastructure of the state was turned to genocide.' },
      { case: 'Myanmar 2017', detail: 'Military operations followed bureaucratic clearance operations — village-by-village documentation of "Bengali" populations preceded destruction.' },
      { case: 'Srebrenica 1995', detail: 'VRS forces used UN-style organizational procedures: bus requisitions, prisoner registration, systematic execution scheduling.' },
    ],
    warning: 'Watch for: creation of new administrative categories for target populations, special registration requirements, dedicated bureaucratic offices for "the X question."',
    scholar: 'Hilberg, The Destruction of the European Jews; Arendt, Eichmann in Jerusalem' },
  { id: 3, name: 'Cumulative Radicalization',
    def: 'Each escalation step makes the next one thinkable. What was unimaginable yesterday becomes policy today because the previous step normalized it. The process is incremental — no single decision point where genocide was "chosen."',
    example: 'Boycott (1933) made legal exclusion thinkable. Nuremberg Laws (1935) made forced emigration thinkable. Kristallnacht (1938) made ghettoization thinkable. Ghettos made deportation thinkable. Deportation made killing thinkable.',
    parallels: [
      { case: 'Rwanda 1994', detail: 'Decades of escalating persecution: 1959 pogroms, 1963 massacres, 1973 purges, 1990-93 localized killings — each round normalizing greater violence.' },
      { case: 'Myanmar 2017', detail: 'Progressive restriction of Rohingya rights since 1982 citizenship law, escalating through movement restrictions, marriage limits, then "clearance operations."' },
      { case: 'Srebrenica 1995', detail: 'Ethnic cleansing campaigns 1992-94 established precedent. Each "safe area" failure made the next one more likely.' },
    ],
    warning: 'Watch for: policy escalation patterns where each step is "justified" by the inadequacy of the previous measure. Officials saying the current approach "is not enough."',
    scholar: 'Mommsen, "Cumulative Radicalisation" in From Weimar to Auschwitz; Browning, The Path to Genocide' },
  { id: 4, name: 'Institutional Competition',
    def: 'Multiple agencies compete to demonstrate loyalty by being more radical than their rivals. The SS competed with the Wehrmacht, Einsatzgruppen competed with local police. Radicalism becomes the currency of bureaucratic advancement.',
    example: 'The SS, SA, Gestapo, SD, civilian administration, and Wehrmacht all competed for authority over Jewish policy. This "polycratic" competition drove escalation as each agency tried to prove its necessity by being more thorough.',
    parallels: [
      { case: 'Rwanda 1994', detail: 'Presidential Guard, gendarmerie, communal police, and Interahamwe militia competed in killing. Local officials competed to report higher body counts.' },
      { case: 'Myanmar 2017', detail: 'Multiple military divisions and Border Guard Police competed in "clearance operations," each seeking to demonstrate effectiveness to central command.' },
      { case: 'Srebrenica 1995', detail: 'Drina Corps, 10th Sabotage Detachment, and police units competed for operational authority in the Srebrenica enclave.' },
    ],
    warning: 'Watch for: multiple security agencies with overlapping mandates targeting the same group, competition between hardline factions, purges of "moderates" within the perpetrator structure.',
    scholar: 'Kershaw, "Working Towards the Fuhrer" in Contemporary European History; Browning, Ordinary Men' },
  { id: 5, name: 'War as Cover',
    def: 'Wartime conditions provide cover for mass killing: violence is normalized, witnesses are eliminated or discredited, international attention is diverted, and military necessity is invoked to justify any action.',
    example: 'The Final Solution was launched under cover of Operation Barbarossa. The invasion of the USSR provided both the context (war of annihilation ideology) and the cover (combat zone chaos) for the Einsatzgruppen shootings.',
    parallels: [
      { case: 'Rwanda 1994', detail: 'The genocide was launched alongside the RPF civil war. Perpetrators framed mass killing as legitimate wartime self-defense against a Tutsi "fifth column."' },
      { case: 'Myanmar 2017', detail: 'Military framed the genocide as "counter-terrorism" operations against ARSA militants, using a minor border attack as pretext for mass atrocity.' },
      { case: 'Srebrenica 1995', detail: 'The massacre occurred during active military operations. VRS forces presented the killings as military action against combatants, not civilians.' },
    ],
    warning: 'Watch for: military operations used to justify population-level targeting, "counter-terrorism" frameworks applied to entire ethnic groups, media blackouts in conflict zones.',
    scholar: 'Snyder, Black Earth; Bartov, Hitler\'s Army' },
  { id: 6, name: 'Victim Isolation',
    def: 'Destruction of victims\' civil society, records, identity documents, community structures, and connections to the outside world. Isolated victims cannot organize resistance, flee, or bear witness. The goal is to make the victims disappear not just physically but historically.',
    example: 'Ghettoization concentrated and isolated Jews. Confiscation of property removed economic resources. Destruction of communal records erased legal personhood. Deportation severed remaining social ties.',
    parallels: [
      { case: 'Rwanda 1994', detail: 'Roadblocks sealed escape routes. ID cards with ethnic classification enabled identification. Tutsi who sought refuge in churches were betrayed by those they trusted.' },
      { case: 'Myanmar 2017', detail: 'Rohingya denied citizenship (1982), confined to townships, barred from higher education and movement. Complete isolation preceded the "clearance operations."' },
      { case: 'Srebrenica 1995', detail: 'The "safe area" concept itself was a form of concentration. Men separated from women at Potocari — the separation was the prelude to execution.' },
    ],
    warning: 'Watch for: restrictions on movement, confiscation of identity documents, destruction of cultural/religious sites, forced concentration into designated areas, severing of communication.',
    scholar: 'Hilberg, The Destruction of the European Jews; Snyder, Black Earth' },
];


// ═══════════════════════════════════════════════════════════════════════
//  CHRONOLOGY DATA — Radicalization spiral 1933-1945
// ═══════════════════════════════════════════════════════════════════════

const CHRONOLOGY_DATA = [
  { year: '1933', title: 'Boycott & Civil Service Law',
    what: 'April 1 boycott of Jewish businesses. Law for the Restoration of the Professional Civil Service excludes Jews from government employment.',
    why: 'Hitler consolidated power through the Enabling Act (March 23). Anti-Jewish action was the immediate policy priority once constitutional constraints were removed.',
    who: 'Hitler (political direction), Goebbels (boycott organization), Interior Ministry (civil service law)',
    document: 'Gesetz zur Wiederherstellung des Berufsbeamtentums, April 7, 1933',
    alternative: 'The international boycott threat and Hindenburg\'s objections showed that resistance could moderate policy. The Haavara Agreement proved emigration was a viable path.' },
  { year: '1935', title: 'Nuremberg Laws',
    what: 'Reich Citizenship Law strips Jews of citizenship. Law for the Protection of German Blood prohibits marriage and sexual relations between Jews and "Aryans." Jews become subjects, not citizens.',
    why: 'Grassroots violence against Jews was creating disorder. The regime channeled antisemitic energy into legal frameworks — making persecution orderly and "legitimate."',
    who: 'Hitler (announcement at Party Rally), Frick and Losener (Interior Ministry drafting), Reichstag (unanimous passage)',
    document: 'Reichsburgergesetz and Blutschutzgesetz, September 15, 1935',
    alternative: 'International reaction was muted. The 1936 Olympics showed the regime could moderate when international pressure was sufficient. Stronger diplomatic consequences might have changed the calculus.' },
  { year: '1938', title: 'Kristallnacht',
    what: 'November 9-10: state-organized pogrom. 91 Jews killed, 30,000 arrested and sent to camps, 7,500 businesses destroyed, 1,400 synagogues damaged or destroyed. Jewish community fined 1 billion Reichsmarks.',
    why: 'Assassination of diplomat Ernst vom Rath by Herschel Grynszpan provided the pretext. Goebbels orchestrated "spontaneous" violence. The pogrom tested how far violence could go without consequences.',
    who: 'Goebbels (incitement), SA and SS (execution), Heydrich (post-pogrom directives), Goring (economic measures)',
    document: 'Heydrich\'s urgent telegram of November 10, 1938 (instructions for conduct of pogrom)',
    alternative: 'The Evian Conference (July 1938) had already shown that no country would accept large numbers of Jewish refugees. Had even one major power opened its doors, the dynamic would have shifted fundamentally.' },
  { year: '1939-40', title: 'Ghettoization',
    what: 'Following invasion of Poland, Jews concentrated into sealed urban ghettos. Largest: Warsaw (400,000), Lodz (160,000). Starvation rations, forced labor, epidemic disease. Judenrate (Jewish councils) administered internal affairs.',
    why: 'Conquest of Poland brought 2 million Jews under German control. The "territorial solution" (Madagascar Plan, Nisko Plan) failed. Ghettos were conceived as temporary holding — but temporary became permanent.',
    who: 'Heydrich (September 21, 1939 directive), Hans Frank (General Government), local military commanders',
    document: 'Heydrich\'s Schnellbrief of September 21, 1939 — distinguished between "final aim" and "preliminary measures"',
    alternative: 'The ghettos were not initially planned as a step toward extermination. They were an improvised response to a "problem" the regime had created. Different wartime outcomes could have led to different "solutions."' },
  { year: '1941', title: 'Einsatzgruppen & Mobile Killing',
    what: 'Following Operation Barbarossa (June 22), four Einsatzgruppen (A, B, C, D) follow the Wehrmacht into the Soviet Union. By end of 1941, approximately 500,000 Jews shot in mass executions.',
    why: 'The war against the USSR was conceived as a war of racial annihilation from the start. The Commissar Order and Barbarossa Decree removed legal constraints. The ideological framework had been prepared for years.',
    who: 'Heydrich (operational authority), Einsatzgruppen commanders (Stahlecker, Nebe, Rasch, Ohlendorf), local Wehrmacht cooperation, auxiliary police battalions',
    document: 'Operational Situation Reports (Ereignismeldungen) from the Einsatzgruppen to Berlin — detailed daily killing tallies',
    alternative: 'The Wehrmacht could have refused cooperation. Individual commanders like General Blaskowitz had protested atrocities in Poland. But the ideological consensus for a war of annihilation was too deep.' },
  { year: '1942', title: 'Wannsee Conference',
    what: 'January 20, 1942: 15 senior officials meet at Am Grossen Wannsee 56-58 to coordinate the "Final Solution to the Jewish Question." Heydrich presents a plan covering 11 million European Jews.',
    why: 'Mass shooting was psychologically and logistically unsustainable. The regime needed a more "efficient" method. Wannsee did not decide on the Holocaust — it coordinated an already-ongoing process across bureaucratic agencies.',
    who: 'Heydrich (chair), Eichmann (secretary, wrote the protocol), representatives from 8 ministries and the SS',
    document: 'Wannsee Protocol (Besprechungsprotokoll), one of 30 copies — the sole surviving copy found in 1947',
    alternative: 'By January 1942, mass killing was already underway. But the conference reveals how the process depended on inter-agency cooperation. Bureaucratic obstruction at this stage could still have limited the scope.' },
  { year: '1942-45', title: 'Industrial Extermination',
    what: 'Operation Reinhard camps (Belzec, Sobibor, Treblinka) and Auschwitz-Birkenau gas chambers operate at peak capacity. By war\'s end, approximately 6 million Jews and millions of others murdered.',
    why: 'The infrastructure was in place: railway network, camp system, Zyklon B supply chain, trained personnel. Each previous step had made this one operationally and psychologically possible.',
    who: 'Himmler (overall authority), Globocnik (Reinhard camps), Hoss (Auschwitz commandant), Eichmann (deportation logistics), thousands of guards, administrators, railway workers',
    document: 'Korherr Report (March 1943) — SS statistical report counting 1,873,549 Jews "evacuated" (killed) through December 1942',
    alternative: 'Allied bombing of rail lines to Auschwitz was debated and rejected. The Hungarian deportations of 1944 (437,000 in 56 days) happened when the war was clearly lost — showing that killing had become an end in itself.' },
];


// ═══════════════════════════════════════════════════════════════════════
//  PERPETRATORS DATA — Browning's Reserve Police Battalion 101
// ═══════════════════════════════════════════════════════════════════════

const PERPETRATOR_FACTORS = [
  { name: 'Obedience to Authority', detail: 'Milgram\'s experiments (1961-63) showed 65% of ordinary people would administer potentially lethal electric shocks when instructed by an authority figure. In Battalion 101, Major Trapp wept as he gave the order — but gave it nonetheless. Authority removes the burden of individual moral judgment.' },
  { name: 'Conformity Pressure', detail: 'Not wanting to appear weak or to force comrades to carry a heavier burden. Refusing to shoot meant your share would fall on the man beside you. Social bonds within the unit were stronger than abstract moral principles. Those who refused were not punished — but they were ostracized.' },
  { name: 'Gradual Escalation', detail: 'The men began as guards and cordon units. Then they supervised deportations. Then they guarded execution sites. Then they shot. Each step was only slightly beyond the previous one. By the time they were pulling triggers, they had already been participants for months.' },
  { name: 'Deindividuation', detail: 'The uniform, the unit identity, the group ritual of alcohol before and after shooting actions. Individual identity was submerged into the collective. "I" became "we," and "we" were following orders. The individual moral agent dissolved into the institution.' },
  { name: 'Moral Disengagement', detail: 'Distancing language: "resettlement" not "murder," "special treatment" not "execution." Routinization: killing became a job with procedures, schedules, quotas. Victim-blaming: Jews were cast as partisans, threats, vermin. Denial of personal agency: "I had no choice."' },
];

const PERPETRATOR_SCENARIOS = [
  { id: 1, title: 'Jozefow, July 13, 1942',
    situation: 'Major Trapp assembles Battalion 101 at dawn. He informs them they must round up and shoot the 1,800 Jews of Jozefow. He is visibly shaken. He offers any man who feels he cannot participate the option to step out of ranks. There will be no punishment for refusal. The men have minutes to decide.',
    question: 'What percentage of the approximately 500 men in the battalion stepped forward to refuse?',
    actual: 12,
    unit: '%',
    context: 'Approximately 12 men (about 2-3%) stepped out initially. By the end of the day, perhaps 10-20% had found ways to avoid direct shooting — seeking other duties, hiding, or quietly stepping away. But the majority participated in killing 1,500 people in a single day. Most of these men were middle-aged reservists from Hamburg — too old for regular military service. They were fathers, workers, ordinary men.',
    source: 'Browning, Ordinary Men, Chapter 7' },
  { id: 2, title: 'Lomazy, August 19, 1942',
    situation: 'Battalion 101 is ordered to liquidate the Jewish population of Lomazy (approximately 1,700 people). By now, the men have participated in multiple killing operations over five weeks. Lieutenant Gnade, known for cruelty, commands. Unlike Jozefow, no offer to step aside is made. Local Hiwis (auxiliary police from Trawniki) are also participating.',
    question: 'After five weeks of killing operations, what percentage of men in the battalion actively sought to avoid participation?',
    actual: 20,
    unit: '%',
    context: 'Approximately 20% found ways to avoid direct involvement — roughly the same proportion as at Jozefow, despite the lack of a formal offer. The proportion of resisters did not increase with experience. Some men who had refused at Jozefow participated at Lomazy, and vice versa. The decision was not stable — it was situational, depending on peer dynamics, leadership, and opportunity.',
    source: 'Browning, Ordinary Men, Chapter 9' },
  { id: 3, title: 'The "Jew Hunt" Period, Fall 1942 - Spring 1943',
    situation: 'After the major ghetto liquidations, Battalion 101 transitions to "Jew hunts" (Judenjagd) — small-group patrols searching forests and villages for Jews who escaped the roundups. These operations are conducted in squads of 6-12 men. Unlike mass shootings, each patrol acts with significant autonomy. There is no officer standing over them.',
    question: 'During the Jew hunts, when men operated in small autonomous groups without direct officer supervision, what percentage refused to participate in the shooting of captured Jews?',
    actual: 10,
    unit: '%',
    context: 'Even with maximum autonomy and minimal supervision, approximately 90% of the men participated. The small-group dynamics actually made refusal harder — you could not hide in a crowd. Browning notes that the Jew hunts were the most psychologically revealing phase: when men had the most freedom to refuse, the fewest did. The killing had become routine work.',
    source: 'Browning, Ordinary Men, Chapter 14' },
  { id: 4, title: 'The Postwar Testimonies, 1960s',
    situation: 'In the 1960s, West German prosecutors investigated Battalion 101. Of the approximately 500 members, 210 were interrogated. The men were asked to describe what happened and explain their participation. They were not on trial — they were witnesses. They had had 20 years to reflect on what they had done.',
    question: 'Of the 210 men interrogated, what percentage admitted to personal moral failing or expressed genuine remorse for their actions (as opposed to blaming orders, circumstances, or claiming ignorance)?',
    actual: 15,
    unit: '%',
    context: 'Approximately 15% expressed what Browning judged to be genuine remorse or moral self-examination. The majority relied on standard exculpatory narratives: following orders, fear of punishment (though no punishment was ever imposed for refusal), ignorance of the larger picture, or minimization ("I only guarded, I never shot"). The psychological mechanisms of moral disengagement that enabled killing in 1942 continued to function as mechanisms of denial in the 1960s.',
    source: 'Browning, Ordinary Men, Chapter 18; Goldhagen critique in Hitler\'s Willing Executioners' },
];


// ═══════════════════════════════════════════════════════════════════════
//  STANTON'S 10 STAGES + CASE STUDIES
// ═══════════════════════════════════════════════════════════════════════

const STANTON_STAGES = [
  { stage: 1, name: 'Classification', def: 'Societies divide into "us" and "them" by ethnicity, race, religion, or nationality. All cultures have categories to distinguish people. The problem begins when categories harden into permanent, exclusionary identities.',
    holocaust: 'The Nuremberg Laws (1935) legally classified Jews as a separate category of non-citizen. "Mischlinge" (mixed-blood) classifications created elaborate racial hierarchies.',
    cases: {
      myanmar: 'Rohingya classified as "Bengali" — foreign, not one of Myanmar\'s 135 recognized ethnic groups. The 1982 Citizenship Law formalized exclusion.',
      uyghur: 'Han-Uyghur distinction reinforced through separate education systems, language restrictions, and residential segregation in Xinjiang.',
      tigray: 'TPLF leadership and Tigrayan identity conflated by federal government and Amhara nationalists. "TPLF junta" rhetoric extended to Tigrayan civilians.',
    }},
  { stage: 2, name: 'Symbolization', def: 'Names, symbols, or markers are applied to members of the classified group. Yellow stars, identity cards, distinctive clothing. Symbolization becomes dangerous when combined with dehumanization.',
    holocaust: 'Yellow Star of David (September 1941), "J" stamped on passports (1938), names "Israel" and "Sara" required. Visual identification enabled enforcement by any passerby.',
    cases: {
      myanmar: 'White identity cards (as opposed to pink citizenship cards) marked Rohingya as non-citizens, visible at every checkpoint.',
      uyghur: 'QR codes on Uyghur homes for security scanning. Biometric data collection (iris scans, DNA, voice prints) as identification technology.',
      tigray: 'Ethnicity listed on Ethiopian ID cards. Tigrayan identity became a basis for profiling at checkpoints throughout Ethiopia during the conflict.',
    }},
  { stage: 3, name: 'Discrimination', def: 'The dominant group uses law, custom, and political power to deny rights to the targeted group. The group is excluded from full civil rights, voting, employment, education, or property ownership.',
    holocaust: 'Civil Service Law (1933), Nuremberg Laws (1935), Aryanization of businesses (1937-38). Progressive exclusion from professions, schools, public spaces, cultural life.',
    cases: {
      myanmar: '1982 Citizenship Law denied Rohingya citizenship. Restrictions on marriage (two-child policy), movement, education, and employment enforced since 1990s.',
      uyghur: 'Restrictions on religious practice (fasting, veiling, beards), Mandarin-only education policies, employment discrimination, land confiscation.',
      tigray: 'Ethnic profiling and mass arrests of Tigrayans throughout Ethiopia. Freezing of bank accounts, business closures, suspension from federal employment.',
    }},
  { stage: 4, name: 'Dehumanization', def: 'The targeted group is equated with animals, vermin, insects, or diseases. Dehumanization overcomes the normal human revulsion against murder. Propaganda campaigns spread hateful imagery.',
    holocaust: 'Jews depicted as rats (Der Ewige Jude film), parasites, bacilli, subhumans. "Lebensunwertes Leben" (life unworthy of life). The T4 euthanasia program tested the principle on disabled Germans first.',
    cases: {
      myanmar: '"Kalar" slur used widely. Social media campaigns depicting Rohingya as invaders, rapists, terrorists. Buddhist monks spread anti-Muslim hate speech.',
      uyghur: 'Leaked internal documents refer to Uyghur cultural practices as "viruses" and "tumors" requiring "eradication." Detainees described as needing to be "cleansed."',
      tigray: 'Social media campaigns depicted Tigrayans as "cancer," "weeds," "daylight hyenas." Ethiopian and Eritrean officials used eliminationist rhetoric.',
    }},
  { stage: 5, name: 'Organization', def: 'Genocide is always organized, usually by the state or by armed groups. Special army units, militias, or paramilitary forces are trained and armed. Plans are made for genocidal killing.',
    holocaust: 'Einsatzgruppen formed and trained specifically for mass shooting operations. SS-Totenkopfverbaende ran the camps. The entire state apparatus was reorganized around the killing process.',
    cases: {
      myanmar: 'Tatmadaw (military) organized "clearance operations" with dedicated units. Intelligence preparation included mapping Rohingya villages.',
      uyghur: 'Construction of massive detention facility network (estimated 380+ camps). Training of specialized personnel. Digital surveillance infrastructure.',
      tigray: 'ENDF coordinated with Eritrean forces and Amhara militia (Fano). Joint operations planned at national level. Communications blackout organized systematically.',
    }},
  { stage: 6, name: 'Polarization', def: 'Extremists drive the groups apart. Hate groups broadcast propaganda. Moderates from the perpetrator group are silenced, arrested, or killed. The center collapses.',
    holocaust: 'Moderate conservatives eliminated in the Night of the Long Knives (1934). Independent press destroyed by 1933. Churches largely co-opted. Dissent became treason.',
    cases: {
      myanmar: 'Moderate voices in military and government silenced. Aung San Suu Kyi\'s silence on Rohingya persecution eliminated the most credible moderate voice.',
      uyghur: 'Uyghur intellectuals and community leaders detained first. Moderate Han scholars who advocated dialogue (e.g., Ilham Tohti) imprisoned.',
      tigray: 'Ethiopian journalists critical of the war arrested. Internet and communications blackout prevented moderate voices from being heard.',
    }},
  { stage: 7, name: 'Preparation', def: 'National or perpetrator group leaders plan the "Final Solution." Victims are identified and separated. Death lists are drawn up. Armed forces are trained. Weapons are stockpiled.',
    holocaust: 'Wannsee Conference (January 1942) coordinated the Final Solution. Railway schedules prepared. Camp infrastructure expanded. Zyklon B procurement increased.',
    cases: {
      myanmar: 'Military intelligence mapped Rohingya villages before operations. Troops positioned. Helicopter gunships deployed. Communication equipment distributed.',
      uyghur: 'Leaked "China Cables" (2019) revealed detailed operational plans for detention facility management, including quotas and behavioral scoring systems.',
      tigray: 'Military buildup on Tigray border in weeks before November 2020 offensive. Coordination meetings between Ethiopian and Eritrean military leadership.',
    }},
  { stage: 8, name: 'Persecution', def: 'Victims are identified and separated because of their ethnic or religious identity. Property is confiscated. Victims are forced into ghettos, concentration camps, or famine-struck regions.',
    holocaust: 'Ghettoization (1939-42), deportation convoys, concentration in transit camps. Yellow star enforcement. Property confiscation (Aryanization). Forced labor.',
    cases: {
      myanmar: 'Rohingya confined to IDP camps after 2012 violence. Freedom of movement eliminated. Access to healthcare, education, livelihoods denied.',
      uyghur: 'Mass internment in "re-education" camps. Separation of children from families. Forced labor in factories. Cultural and religious practices banned.',
      tigray: 'Siege of Tigray region. Humanitarian aid blocked. Banking services suspended. Crops destroyed and livestock killed. Forced displacement.',
    }},
  { stage: 9, name: 'Extermination', def: 'The killing begins and is called "extermination" by the perpetrators because they do not consider their victims fully human. It is "ethnic cleansing" or "counter-terrorism" — never "murder."',
    holocaust: 'Einsatzgruppen mass shootings (1941-42), Operation Reinhard death camps (1942-43), Auschwitz-Birkenau gas chambers (1942-45). Approximately 6 million Jews and millions of others killed.',
    cases: {
      myanmar: '"Clearance operations" August 2017: mass killings, sexual violence, village burning. UN documented the killing of at least 10,000 Rohingya. 700,000+ fled to Bangladesh.',
      uyghur: 'Credible reports of deaths in detention, forced sterilization, organ harvesting. Some scholars and governments have designated the situation as genocide; evidence is still emerging.',
      tigray: 'Mass killings at Axum, Mai Kadra, and other locations. Sexual violence as weapon of war. Deliberate starvation through aid blockade. Estimated tens of thousands killed.',
    }},
  { stage: 10, name: 'Denial', def: 'Denial is the final stage that lasts throughout and always follows genocide. The perpetrators deny they committed any crimes, blame the victims, block investigations, destroy evidence, and intimidate witnesses.',
    holocaust: 'Holocaust denial began immediately. Himmler ordered camp destruction. Bodies exhumed and burned (Aktion 1005). Postwar: denial movements persist globally despite overwhelming documentation.',
    cases: {
      myanmar: 'Myanmar government denied genocide, claimed "counter-terrorism." Restricted UN access. State media portrayed Rohingya as aggressors.',
      uyghur: 'China denies detention camps exist, then calls them "vocational training centers." Restricts journalist and researcher access. Pressures other nations not to investigate.',
      tigray: 'Ethiopian and Eritrean governments denied targeting civilians. Communications blackout prevented documentation. Mass graves reported but access restricted.',
    }},
];


// ═══════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════

function HolocaustView({ setView }) {
  const [tab, setTab] = useState('bloodlands');
  // Bloodlands state
  const [showNazi, setShowNazi] = useState(true);
  const [showSoviet, setShowSoviet] = useState(true);
  const [selectedLoc, setSelectedLoc] = useState(null);
  // Mechanisms state
  const [activeRisks, setActiveRisks] = useState({});
  const [expandedMech, setExpandedMech] = useState(null);
  // Chronology state
  const [expandedStep, setExpandedStep] = useState(null);
  // Perpetrators state
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [revealed, setRevealed] = useState({});
  const [userGuesses, setUserGuesses] = useState({});
  // Never Again state
  const [naCaseKey, setNaCaseKey] = useState('myanmar');
  const [activeStages, setActiveStages] = useState({});
  // Resistance state
  const [resScenario, setResScenario] = useState(0);
  const [resChoices, setResChoices] = useState({});
  const [resRevealed, setResRevealed] = useState({});
  // Bystander state
  const [byProfile, setByProfile] = useState(0);
  const [byExpanded, setByExpanded] = useState(null);

  const TABS = [
    { key: 'bloodlands', label: 'Bloodlands' },
    { key: 'mechanisms', label: 'Mechanisms' },
    { key: 'chronology', label: 'Chronology' },
    { key: 'perpetrators', label: 'Perpetrators' },
    { key: 'neveragain', label: 'Never Again' },
    { key: 'resistance', label: 'Resistance' },
    { key: 'bystander', label: 'Bystanders' },
  ];

  const riskCount = Object.values(activeRisks).filter(Boolean).length;
  const riskLevel = riskCount === 0 ? 'Baseline' : riskCount <= 2 ? 'Elevated' : riskCount <= 4 ? 'High' : 'Critical';
  const riskColor = riskCount === 0 ? HC.tx3 : riskCount <= 2 ? HC.warn : riskCount <= 4 ? HC.red : '#c03030';

  const naStageCount = Object.values(activeStages).filter(Boolean).length;
  const naHighest = Object.keys(activeStages).filter(k => activeStages[k]).map(Number).sort((a,b) => b - a)[0] || 0;

  // ── Shared styles ──
  const cardStyle = {
    background: HC.bgCard, border: '1px solid ' + HC.cardBd,
    borderRadius: 4, padding: '20px 24px', marginBottom: 16,
  };
  const labelStyle = {
    fontSize: 10, fontFamily: HMono, color: HC.tx3,
    letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6,
  };
  const bodyStyle = {
    fontSize: 14, fontFamily: HSerif, color: HC.tx, lineHeight: 1.7,
  };
  const statStyle = {
    fontSize: 22, fontFamily: HMono, color: HC.accent, fontWeight: 600,
  };

  // ═══════════════════════════════════════════════════════════════════
  //  TAB 1: BLOODLANDS — Snyder's Geographic Overlap Engine
  // ═══════════════════════════════════════════════════════════════════

  function renderBloodlands() {
    var sel = selectedLoc ? BLOODLANDS_LOCATIONS.find(l => l.id === selectedLoc) : null;
    return React.createElement('div', { style: { display: 'flex', gap: 24, flexWrap: 'wrap' } },
      // Left: map
      React.createElement('div', { style: { flex: '1 1 380px', minWidth: 340 } },
        // Toggle controls
        React.createElement('div', { style: { display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' } },
          React.createElement('button', {
            onClick: function() { setShowNazi(!showNazi); },
            style: { padding: '8px 16px', background: showNazi ? HC.redSoft : 'transparent',
              border: '1px solid ' + HC.red, borderRadius: 3, color: showNazi ? '#d08080' : HC.tx3,
              fontSize: 11, fontFamily: HMono, cursor: 'pointer', letterSpacing: '.06em' }
          }, 'NAZI ZONES ' + (showNazi ? 'ON' : 'OFF')),
          React.createElement('button', {
            onClick: function() { setShowSoviet(!showSoviet); },
            style: { padding: '8px 16px', background: showSoviet ? HC.blueSoft : 'transparent',
              border: '1px solid ' + HC.blue, borderRadius: 3, color: showSoviet ? '#80a0c0' : HC.tx3,
              fontSize: 11, fontFamily: HMono, cursor: 'pointer', letterSpacing: '.06em' }
          }, 'SOVIET ZONES ' + (showSoviet ? 'ON' : 'OFF')),
          (showNazi && showSoviet) ? React.createElement('span', {
            style: { padding: '8px 12px', background: HC.purpleSoft, border: '1px solid ' + HC.purple,
              borderRadius: 3, color: '#b090b0', fontSize: 11, fontFamily: HMono, letterSpacing: '.06em' }
          }, 'OVERLAP = BLOODLANDS') : null,
        ),
        // SVG Map
        React.createElement('svg', {
          viewBox: '0 0 600 500', width: '100%',
          style: { background: HC.dark, borderRadius: 4, border: '1px solid ' + HC.cardBd }
        },
          // Country outlines (simplified)
          React.createElement('text', { x: 200, y: 30, fill: HC.tx3, fontSize: 9, fontFamily: HMono, textAnchor: 'middle' }, 'BALTIC SEA'),
          React.createElement('text', { x: 310, y: 150, fill: HC.tx3, fontSize: 8, fontFamily: HMono }, 'LATVIA'),
          React.createElement('text', { x: 310, y: 188, fill: HC.tx3, fontSize: 8, fontFamily: HMono }, 'LITHUANIA'),
          React.createElement('text', { x: 280, y: 260, fill: HC.tx3, fontSize: 9, fontFamily: HMono }, 'POLAND'),
          React.createElement('text', { x: 400, y: 210, fill: HC.tx3, fontSize: 8, fontFamily: HMono }, 'BELARUS'),
          React.createElement('text', { x: 430, y: 310, fill: HC.tx3, fontSize: 9, fontFamily: HMono }, 'UKRAINE'),
          React.createElement('text', { x: 220, y: 340, fill: HC.tx3, fontSize: 8, fontFamily: HMono }, 'SLOVAKIA'),
          React.createElement('text', { x: 500, y: 200, fill: HC.tx3, fontSize: 8, fontFamily: HMono }, 'RUSSIA'),

          // Borders (simplified polygon hints)
          React.createElement('path', {
            d: 'M180,100 L350,90 L380,120 L400,150 L420,190 L440,250 L470,300 L500,350 L480,400 L400,420 L320,400 L260,370 L220,330 L200,290 L190,240 L180,180Z',
            fill: 'none', stroke: HC.tx3, strokeWidth: 0.5, strokeDasharray: '4,3', opacity: 0.4
          }),

          // Nazi killing zones (approximate coverage)
          showNazi ? React.createElement('g', { opacity: 0.25 },
            React.createElement('ellipse', { cx: 310, cy: 270, rx: 80, ry: 60, fill: HC.red, stroke: 'none' }),
            React.createElement('ellipse', { cx: 350, cy: 200, rx: 50, ry: 40, fill: HC.red, stroke: 'none' }),
            React.createElement('ellipse', { cx: 340, cy: 160, rx: 30, ry: 25, fill: HC.red, stroke: 'none' }),
            // Einsatzgruppen routes
            React.createElement('path', { d: 'M350,120 L370,180 L400,240 L430,300 L450,350',
              stroke: HC.red, strokeWidth: 2, fill: 'none', strokeDasharray: '6,4', opacity: 0.6 }),
            React.createElement('path', { d: 'M330,140 L350,180 L380,220 L400,260',
              stroke: HC.red, strokeWidth: 1.5, fill: 'none', strokeDasharray: '6,4', opacity: 0.5 }),
          ) : null,

          // Soviet killing zones
          showSoviet ? React.createElement('g', { opacity: 0.25 },
            React.createElement('ellipse', { cx: 420, cy: 300, rx: 70, ry: 60, fill: HC.blue, stroke: 'none' }),
            React.createElement('ellipse', { cx: 390, cy: 210, rx: 50, ry: 30, fill: HC.blue, stroke: 'none' }),
            // Holodomor zone
            React.createElement('rect', {
              x: HOLODOMOR_ZONE.x - HOLODOMOR_ZONE.w/2, y: HOLODOMOR_ZONE.y - HOLODOMOR_ZONE.h/2,
              width: HOLODOMOR_ZONE.w, height: HOLODOMOR_ZONE.h,
              fill: HC.blue, stroke: HC.blue, strokeWidth: 1, rx: 6, opacity: 0.3
            }),
            React.createElement('text', {
              x: HOLODOMOR_ZONE.x, y: HOLODOMOR_ZONE.y + 4,
              fill: '#8ab0d0', fontSize: 7, fontFamily: HMono, textAnchor: 'middle', opacity: 0.7
            }, 'HOLODOMOR 1932-33'),
            // Gulag deportation route hints
            React.createElement('path', { d: 'M420,200 L480,180 L540,160',
              stroke: HC.blue, strokeWidth: 1.5, fill: 'none', strokeDasharray: '4,4', opacity: 0.5 }),
          ) : null,

          // Location markers
          BLOODLANDS_LOCATIONS.map(function(loc) {
            var isNazi = loc.regime === 'nazi';
            var isBoth = loc.regime === 'both';
            var isSoviet = loc.regime === 'soviet';
            if (isNazi && !showNazi) return null;
            if (isSoviet && !showSoviet) return null;
            if (isBoth && !showNazi && !showSoviet) return null;
            var color = isBoth ? HC.purple : (isNazi ? HC.red : HC.blue);
            var isSelected = selectedLoc === loc.id;
            return React.createElement('g', { key: loc.id, style: { cursor: 'pointer' },
              onClick: function() { setSelectedLoc(selectedLoc === loc.id ? null : loc.id); }
            },
              React.createElement('circle', {
                cx: loc.x, cy: loc.y, r: isSelected ? 7 : 5,
                fill: color, stroke: isSelected ? HC.bone : color,
                strokeWidth: isSelected ? 2 : 1, opacity: isSelected ? 1 : 0.8
              }),
              React.createElement('text', {
                x: loc.x, y: loc.y - 10,
                fill: isSelected ? HC.bone : HC.tx2, fontSize: 7, fontFamily: HMono,
                textAnchor: 'middle', opacity: isSelected ? 1 : 0.6
              }, loc.name.toUpperCase()),
            );
          }),

          // Katyn special marker
          showSoviet ? React.createElement('text', {
            x: 370, y: 220, fill: '#8ab0d0', fontSize: 6, fontFamily: HMono, opacity: 0.5
          }, 'KATYN') : null,

          // Legend
          React.createElement('g', { transform: 'translate(20, 420)' },
            React.createElement('rect', { x: 0, y: 0, width: 160, height: 70, fill: HC.dark, stroke: HC.cardBd, strokeWidth: 0.5, rx: 3, opacity: 0.9 }),
            React.createElement('text', { x: 10, y: 16, fill: HC.tx3, fontSize: 8, fontFamily: HMono }, 'LEGEND'),
            showNazi ? React.createElement('g', null,
              React.createElement('circle', { cx: 18, cy: 30, r: 4, fill: HC.red }),
              React.createElement('text', { x: 28, y: 33, fill: '#d08080', fontSize: 8, fontFamily: HMono }, 'Nazi killing zones'),
            ) : null,
            showSoviet ? React.createElement('g', null,
              React.createElement('circle', { cx: 18, cy: 45, r: 4, fill: HC.blue }),
              React.createElement('text', { x: 28, y: 48, fill: '#8ab0d0', fontSize: 8, fontFamily: HMono }, 'Soviet killing zones'),
            ) : null,
            (showNazi && showSoviet) ? React.createElement('g', null,
              React.createElement('circle', { cx: 18, cy: 60, r: 4, fill: HC.purple }),
              React.createElement('text', { x: 28, y: 63, fill: '#b090b0', fontSize: 8, fontFamily: HMono }, 'Double-occupied (Bloodlands)'),
            ) : null,
          ),
        ),

        // Snyder insight
        React.createElement('div', { style: Object.assign({}, cardStyle, { marginTop: 16, borderLeft: '3px solid ' + HC.accent }) },
          React.createElement('div', { style: labelStyle }, 'SNYDER\'S CORE THESIS'),
          React.createElement('p', { style: bodyStyle },
            'The deadliest zone in twentieth-century Europe was not the heartland of either the Nazi or Soviet regime, but the territory where the two overlapped. Between 1933 and 1945, fourteen million non-combatants were deliberately killed in the lands between Berlin and Moscow. The mass killing occurred precisely where statelessness prevailed — where the prior destruction of one state created the conditions for the next regime\'s killing.'
          ),
        ),
      ),

      // Right: detail panel
      React.createElement('div', { style: { flex: '1 1 320px', minWidth: 280 } },
        sel ? React.createElement('div', { style: cardStyle },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 } },
            React.createElement('h3', { style: { fontSize: 18, fontFamily: HSerif, color: HC.bone, fontWeight: 400 } }, sel.name),
            React.createElement('span', { style: {
              fontSize: 10, fontFamily: HMono, color: sel.regime === 'both' ? '#b090b0' : sel.regime === 'nazi' ? '#d08080' : '#8ab0d0',
              padding: '2px 8px', border: '1px solid ' + (sel.regime === 'both' ? HC.purple : sel.regime === 'nazi' ? HC.red : HC.blue),
              borderRadius: 2
            } }, sel.regime === 'both' ? 'NAZI + SOVIET' : sel.regime === 'nazi' ? 'NAZI' : 'SOVIET'),
          ),
          React.createElement('div', { style: { display: 'flex', gap: 24, marginBottom: 16 } },
            React.createElement('div', null,
              React.createElement('div', { style: labelStyle }, 'KILLED'),
              React.createElement('div', { style: statStyle }, sel.killed),
            ),
            React.createElement('div', null,
              React.createElement('div', { style: labelStyle }, 'PERIOD'),
              React.createElement('div', { style: { fontSize: 16, fontFamily: HMono, color: HC.tx2 } }, sel.period),
            ),
          ),
          React.createElement('p', { style: Object.assign({}, bodyStyle, { marginBottom: 16 }) }, sel.desc),
          React.createElement('div', { style: labelStyle }, 'PRIMARY SOURCE'),
          React.createElement('p', { style: { fontSize: 12, fontFamily: HMono, color: HC.tx3, lineHeight: 1.5, fontStyle: 'italic' } }, sel.source),
        )
        : React.createElement('div', { style: Object.assign({}, cardStyle, { textAlign: 'center', padding: 40 }) },
          React.createElement('p', { style: { color: HC.tx3, fontFamily: HMono, fontSize: 12 } }, 'Select a location on the map to view details'),
          React.createElement('p', { style: { color: HC.tx3, fontFamily: HSerif, fontSize: 14, marginTop: 12 } },
            'Toggle the Nazi and Soviet layers independently. Where they overlap, the "bloodlands" — Snyder\'s term for the double-occupied zone — appear in purple.'
          ),
        ),

        // Location list
        React.createElement('div', { style: Object.assign({}, cardStyle, { maxHeight: 340, overflowY: 'auto' }) },
          React.createElement('div', { style: labelStyle }, '15 DOCUMENTED LOCATIONS'),
          BLOODLANDS_LOCATIONS.map(function(loc) {
            var color = loc.regime === 'both' ? '#b090b0' : loc.regime === 'nazi' ? '#d08080' : '#8ab0d0';
            return React.createElement('div', {
              key: loc.id,
              onClick: function() { setSelectedLoc(loc.id); },
              style: {
                padding: '8px 12px', marginBottom: 4, borderRadius: 3, cursor: 'pointer',
                background: selectedLoc === loc.id ? HC.accentBg : 'transparent',
                borderLeft: selectedLoc === loc.id ? '2px solid ' + HC.accent : '2px solid transparent',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }
            },
              React.createElement('span', { style: { fontSize: 13, fontFamily: HSans, color: selectedLoc === loc.id ? HC.bone : HC.tx2 } }, loc.name),
              React.createElement('span', { style: { fontSize: 10, fontFamily: HMono, color: color } }, loc.killed),
            );
          }),
        ),
      ),
    );
  }


  // ═══════════════════════════════════════════════════════════════════
  //  TAB 2: MECHANISMS — How Mass Killing Becomes Possible
  // ═══════════════════════════════════════════════════════════════════

  function renderMechanisms() {
    return React.createElement('div', null,
      // Risk profile builder
      React.createElement('div', { style: Object.assign({}, cardStyle, { borderLeft: '3px solid ' + riskColor }) },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', null,
            React.createElement('div', { style: labelStyle }, 'ANALYTICAL RISK PROFILE'),
            React.createElement('p', { style: { fontSize: 12, fontFamily: HSerif, color: HC.tx2, maxWidth: 500 } },
              'Toggle the mechanisms currently present in a situation you are analyzing. This is a structured analytical tool for assessing genocide risk — not a prediction engine.'
            ),
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 28, fontFamily: HMono, color: riskColor, fontWeight: 700 } }, riskCount + '/6'),
            React.createElement('div', { style: { fontSize: 11, fontFamily: HMono, color: riskColor, letterSpacing: '.08em' } }, riskLevel + ' RISK'),
          ),
        ),
        // Toggle buttons
        React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
          MECHANISMS_DATA.map(function(m) {
            var active = activeRisks[m.id];
            return React.createElement('button', {
              key: m.id,
              onClick: function() {
                var next = Object.assign({}, activeRisks);
                next[m.id] = !next[m.id];
                setActiveRisks(next);
              },
              style: {
                padding: '6px 14px', fontSize: 11, fontFamily: HMono,
                background: active ? 'rgba(139,48,48,.2)' : 'transparent',
                border: '1px solid ' + (active ? HC.red : HC.tx3),
                borderRadius: 3, color: active ? '#d08080' : HC.tx3,
                cursor: 'pointer', letterSpacing: '.04em',
              }
            }, m.name.toUpperCase());
          }),
        ),
        // Risk bar visualization
        React.createElement('div', { style: { marginTop: 16, height: 6, background: HC.dark, borderRadius: 3, overflow: 'hidden' } },
          React.createElement('div', { style: {
            width: (riskCount / 6 * 100) + '%', height: '100%',
            background: riskColor, transition: 'width .4s ease, background .4s ease',
          } }),
        ),
      ),

      // Mechanism cards
      MECHANISMS_DATA.map(function(m) {
        var expanded = expandedMech === m.id;
        var active = activeRisks[m.id];
        return React.createElement('div', {
          key: m.id,
          style: Object.assign({}, cardStyle, {
            borderLeft: '3px solid ' + (active ? HC.red : HC.tx3),
            cursor: 'pointer',
          }),
          onClick: function() { setExpandedMech(expanded ? null : m.id); }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 12 } },
              React.createElement('span', { style: { fontSize: 14, fontFamily: HMono, color: HC.tx3 } }, m.id + '.'),
              React.createElement('h3', { style: { fontSize: 16, fontFamily: HSerif, color: active ? '#d08080' : HC.bone, fontWeight: 400 } }, m.name),
            ),
            React.createElement('span', { style: { fontSize: 10, fontFamily: HMono, color: HC.tx3 } }, expanded ? 'COLLAPSE' : 'EXPAND'),
          ),
          React.createElement('p', { style: Object.assign({}, bodyStyle, { marginTop: 8 }) }, m.def),

          expanded ? React.createElement('div', { style: { marginTop: 16 } },
            // Historical example
            React.createElement('div', { style: { marginBottom: 16 } },
              React.createElement('div', { style: labelStyle }, 'HISTORICAL EXAMPLE (HOLOCAUST)'),
              React.createElement('p', { style: bodyStyle }, m.example),
            ),
            // Modern parallels
            React.createElement('div', { style: { marginBottom: 16 } },
              React.createElement('div', { style: labelStyle }, 'MODERN PARALLELS'),
              m.parallels.map(function(p) {
                return React.createElement('div', { key: p.case, style: { marginBottom: 10, paddingLeft: 16, borderLeft: '1px solid ' + HC.line } },
                  React.createElement('div', { style: { fontSize: 12, fontFamily: HMono, color: HC.warn, marginBottom: 2 } }, p.case),
                  React.createElement('p', { style: { fontSize: 13, fontFamily: HSerif, color: HC.tx2, lineHeight: 1.6 } }, p.detail),
                );
              }),
            ),
            // Warning indicator
            React.createElement('div', { style: { padding: '12px 16px', background: HC.warnBg, border: '1px solid rgba(160,112,40,.15)', borderRadius: 3 } },
              React.createElement('div', { style: Object.assign({}, labelStyle, { color: HC.warn }) }, 'ANALYST WARNING INDICATOR'),
              React.createElement('p', { style: { fontSize: 13, fontFamily: HSerif, color: HC.tx, lineHeight: 1.6 } }, m.warning),
            ),
            // Scholar reference
            React.createElement('p', { style: { marginTop: 12, fontSize: 11, fontFamily: HMono, color: HC.tx3, fontStyle: 'italic' } }, m.scholar),
          ) : null,
        );
      }),
    );
  }


  // ═══════════════════════════════════════════════════════════════════
  //  TAB 3: CHRONOLOGY — The Radicalization Spiral
  // ═══════════════════════════════════════════════════════════════════

  function renderChronology() {
    return React.createElement('div', null,
      React.createElement('div', { style: Object.assign({}, cardStyle, { borderLeft: '3px solid ' + HC.accent }) },
        React.createElement('div', { style: labelStyle }, 'THE RADICALIZATION SPIRAL'),
        React.createElement('p', { style: bodyStyle },
          'The Holocaust was not a single decision but a process of cumulative radicalization. At each step below, different choices could have been made. The purpose of this timeline is to identify the decision points, the actors, and the enabling conditions — to understand how the unthinkable became thinkable, and then became policy.'
        ),
      ),

      // Timeline
      React.createElement('div', { style: { position: 'relative', paddingLeft: 40 } },
        // Vertical line
        React.createElement('div', { style: {
          position: 'absolute', left: 18, top: 0, bottom: 0, width: 1,
          background: 'linear-gradient(to bottom, ' + HC.accent + ', ' + HC.red + ')',
          opacity: 0.3,
        } }),

        CHRONOLOGY_DATA.map(function(step, i) {
          var expanded = expandedStep === i;
          return React.createElement('div', {
            key: i,
            style: { position: 'relative', marginBottom: 8, cursor: 'pointer' },
            onClick: function() { setExpandedStep(expanded ? null : i); }
          },
            // Dot on timeline
            React.createElement('div', { style: {
              position: 'absolute', left: -28, top: 14, width: 10, height: 10,
              borderRadius: '50%', background: i < 4 ? HC.accent : HC.red,
              border: '2px solid ' + HC.dark,
            } }),

            React.createElement('div', { style: Object.assign({}, cardStyle, {
              borderLeft: expanded ? ('3px solid ' + (i < 4 ? HC.accent : HC.red)) : '3px solid transparent',
            }) },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 12 } },
                  React.createElement('span', { style: { fontSize: 16, fontFamily: HMono, color: i < 4 ? HC.accent : HC.red, fontWeight: 600 } }, step.year),
                  React.createElement('h3', { style: { fontSize: 15, fontFamily: HSerif, color: HC.bone, fontWeight: 400 } }, step.title),
                ),
                React.createElement('span', { style: { fontSize: 10, fontFamily: HMono, color: HC.tx3 } }, expanded ? 'COLLAPSE' : 'EXPAND'),
              ),
              React.createElement('p', { style: Object.assign({}, bodyStyle, { marginTop: 6 }) }, step.what),

              expanded ? React.createElement('div', { style: { marginTop: 16 } },
                React.createElement('div', { style: { marginBottom: 14 } },
                  React.createElement('div', { style: labelStyle }, 'WHY WAS THIS POSSIBLE?'),
                  React.createElement('p', { style: bodyStyle }, step.why),
                ),
                React.createElement('div', { style: { marginBottom: 14 } },
                  React.createElement('div', { style: labelStyle }, 'KEY ACTORS'),
                  React.createElement('p', { style: { fontSize: 13, fontFamily: HMono, color: HC.tx2, lineHeight: 1.6 } }, step.who),
                ),
                React.createElement('div', { style: { marginBottom: 14 } },
                  React.createElement('div', { style: labelStyle }, 'KEY DOCUMENT'),
                  React.createElement('p', { style: { fontSize: 13, fontFamily: HMono, color: HC.accent, lineHeight: 1.5, fontStyle: 'italic' } }, step.document),
                ),
                React.createElement('div', { style: { padding: '12px 16px', background: HC.accentBg, border: '1px solid rgba(200,184,136,.12)', borderRadius: 3 } },
                  React.createElement('div', { style: Object.assign({}, labelStyle, { color: HC.accent }) }, 'ALTERNATIVE PATHS'),
                  React.createElement('p', { style: { fontSize: 13, fontFamily: HSerif, color: HC.tx, lineHeight: 1.6 } }, step.alternative),
                ),
              ) : null,
            ),
          );
        }),
      ),
    );
  }


  // ═══════════════════════════════════════════════════════════════════
  //  TAB 4: PERPETRATORS — Browning's Ordinary Men Analysis
  // ═══════════════════════════════════════════════════════════════════

  function renderPerpetrators() {
    var scenario = PERPETRATOR_SCENARIOS[scenarioIdx];
    var isRevealed = revealed[scenario.id];
    var guess = userGuesses[scenario.id];
    return React.createElement('div', null,
      // Explanatory factors
      React.createElement('div', { style: cardStyle },
        React.createElement('div', { style: labelStyle }, 'RESERVE POLICE BATTALION 101 — WHY ORDINARY MEN BECAME KILLERS'),
        React.createElement('p', { style: Object.assign({}, bodyStyle, { marginBottom: 16 }) },
          'Christopher Browning studied the men of Reserve Police Battalion 101 — middle-aged Hamburg reservists, too old for regular Wehrmacht service. They were not ideological fanatics. They were not SS. They were ordinary men who, over the course of 1942-43, killed approximately 38,000 Jews and deported 45,000 more to Treblinka. Browning identified five psychological mechanisms that enabled their participation.'
        ),
        PERPETRATOR_FACTORS.map(function(f, i) {
          return React.createElement('div', { key: i, style: { marginBottom: 14, paddingLeft: 16, borderLeft: '1px solid ' + HC.line } },
            React.createElement('div', { style: { fontSize: 13, fontFamily: HMono, color: HC.accent, marginBottom: 4 } }, f.name),
            React.createElement('p', { style: { fontSize: 13, fontFamily: HSerif, color: HC.tx2, lineHeight: 1.6 } }, f.detail),
          );
        }),
      ),

      // Scenario navigation
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' } },
        PERPETRATOR_SCENARIOS.map(function(s, i) {
          return React.createElement('button', {
            key: s.id,
            onClick: function() { setScenarioIdx(i); },
            style: {
              padding: '8px 16px', fontSize: 11, fontFamily: HMono,
              background: scenarioIdx === i ? HC.accentBg : 'transparent',
              border: '1px solid ' + (scenarioIdx === i ? HC.accent : HC.tx3),
              borderRadius: 3, color: scenarioIdx === i ? HC.accent : HC.tx3,
              cursor: 'pointer', letterSpacing: '.04em',
            }
          }, 'SCENARIO ' + (i + 1));
        }),
      ),

      // Active scenario
      React.createElement('div', { style: Object.assign({}, cardStyle, { borderLeft: '3px solid ' + HC.accent }) },
        React.createElement('h3', { style: { fontSize: 17, fontFamily: HSerif, color: HC.bone, fontWeight: 400, marginBottom: 4 } }, scenario.title),
        React.createElement('p', { style: Object.assign({}, bodyStyle, { marginBottom: 20 }) }, scenario.situation),

        React.createElement('div', { style: { padding: '16px 20px', background: HC.dark, border: '1px solid ' + HC.cardBd, borderRadius: 3, marginBottom: 16 } },
          React.createElement('div', { style: labelStyle }, 'THE QUESTION'),
          React.createElement('p', { style: { fontSize: 14, fontFamily: HSerif, color: HC.bone, lineHeight: 1.6 } }, scenario.question),
        ),

        // User input
        !isRevealed ? React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('div', { style: labelStyle }, 'YOUR ESTIMATE (%)'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
            React.createElement('input', {
              type: 'range', min: 0, max: 100, value: guess || 50,
              onChange: function(e) {
                var next = Object.assign({}, userGuesses);
                next[scenario.id] = parseInt(e.target.value);
                setUserGuesses(next);
              },
              style: { flex: 1, accentColor: HC.accent }
            }),
            React.createElement('span', { style: { fontSize: 22, fontFamily: HMono, color: HC.accent, fontWeight: 600, minWidth: 50, textAlign: 'right' } },
              (guess || 50) + '%'
            ),
          ),
          React.createElement('button', {
            onClick: function() {
              var next = Object.assign({}, revealed);
              next[scenario.id] = true;
              setRevealed(next);
            },
            style: {
              marginTop: 12, padding: '10px 24px', fontSize: 12, fontFamily: HMono,
              background: 'transparent', border: '1px solid ' + HC.accent,
              borderRadius: 3, color: HC.accent, cursor: 'pointer', letterSpacing: '.06em',
            }
          }, 'REVEAL ACTUAL FIGURE'),
        ) : null,

        // Revealed answer
        isRevealed ? React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('div', { style: { display: 'flex', gap: 24, alignItems: 'baseline', marginBottom: 12 } },
            guess != null ? React.createElement('div', null,
              React.createElement('div', { style: labelStyle }, 'YOUR ESTIMATE'),
              React.createElement('div', { style: { fontSize: 22, fontFamily: HMono, color: HC.tx2 } }, guess + '%'),
            ) : null,
            React.createElement('div', null,
              React.createElement('div', { style: labelStyle }, 'ACTUAL'),
              React.createElement('div', { style: { fontSize: 28, fontFamily: HMono, color: HC.red, fontWeight: 700 } }, scenario.actual + '%'),
            ),
          ),
          React.createElement('p', { style: Object.assign({}, bodyStyle, { marginBottom: 12 }) }, scenario.context),
          React.createElement('p', { style: { fontSize: 11, fontFamily: HMono, color: HC.tx3, fontStyle: 'italic' } }, scenario.source),
        ) : null,
      ),

      // Closing reflection
      React.createElement('div', { style: Object.assign({}, cardStyle, { borderLeft: '3px solid ' + HC.tx3 }) },
        React.createElement('div', { style: labelStyle }, 'ON THE PURPOSE OF THIS EXERCISE'),
        React.createElement('p', { style: bodyStyle },
          'If you overestimated the number who refused, you are not alone. Most people believe they would refuse, and most people believe most others would refuse. This is the fundamental insight of Browning\'s work and Milgram\'s experiments: we systematically overestimate human moral autonomy under institutional pressure. Understanding this is not cynicism — it is the foundation of any serious effort to prevent mass atrocity. The structural conditions matter more than individual character.'
        ),
      ),
    );
  }


  // ═══════════════════════════════════════════════════════════════════
  //  TAB 5: NEVER AGAIN — Early Warning Indicators
  // ═══════════════════════════════════════════════════════════════════

  function renderNeverAgain() {
    var caseLabels = { myanmar: 'Myanmar / Rohingya', uyghur: 'China / Uyghurs', tigray: 'Ethiopia / Tigray' };
    return React.createElement('div', null,
      // Case selector
      React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' } },
        React.createElement('span', { style: { fontSize: 11, fontFamily: HMono, color: HC.tx3, letterSpacing: '.08em' } }, 'COMPARE CASE:'),
        Object.keys(caseLabels).map(function(k) {
          return React.createElement('button', {
            key: k,
            onClick: function() { setNaCaseKey(k); },
            style: {
              padding: '6px 16px', fontSize: 11, fontFamily: HMono,
              background: naCaseKey === k ? HC.accentBg : 'transparent',
              border: '1px solid ' + (naCaseKey === k ? HC.accent : HC.tx3),
              borderRadius: 3, color: naCaseKey === k ? HC.accent : HC.tx3,
              cursor: 'pointer', letterSpacing: '.04em',
            }
          }, caseLabels[k].toUpperCase());
        }),
      ),

      // Assessment header
      React.createElement('div', { style: Object.assign({}, cardStyle, { borderLeft: '3px solid ' + (naHighest >= 8 ? HC.red : naHighest >= 5 ? HC.warn : HC.accent) }) },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: labelStyle }, 'STANTON\'S 10 STAGES OF GENOCIDE — ANALYTICAL ASSESSMENT TOOL'),
            React.createElement('p', { style: { fontSize: 12, fontFamily: HSerif, color: HC.tx2, maxWidth: 500 } },
              'Toggle the stages you assess as currently active for the selected situation. Based on Gregory Stanton (Genocide Watch) and the UN Framework of Analysis for Atrocity Crimes (2014).'
            ),
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 24, fontFamily: HMono, color: naHighest >= 8 ? HC.red : HC.warn, fontWeight: 700 } },
              naStageCount + '/10'
            ),
            React.createElement('div', { style: { fontSize: 10, fontFamily: HMono, color: HC.tx3, letterSpacing: '.06em' } },
              naHighest === 0 ? 'NO STAGES MARKED' :
              'HIGHEST ACTIVE: STAGE ' + naHighest
            ),
          ),
        ),
      ),

      // Escalation ladder
      React.createElement('div', { style: { position: 'relative' } },
        STANTON_STAGES.map(function(st) {
          var isActive = activeStages[st.stage];
          var dangerLevel = st.stage <= 3 ? HC.accent : st.stage <= 6 ? HC.warn : HC.red;
          return React.createElement('div', {
            key: st.stage,
            style: Object.assign({}, cardStyle, {
              borderLeft: '4px solid ' + (isActive ? dangerLevel : HC.tx3 + '40'),
              opacity: isActive ? 1 : 0.7,
            })
          },
            // Stage header with toggle
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 12 } },
                React.createElement('span', { style: { fontSize: 16, fontFamily: HMono, color: isActive ? dangerLevel : HC.tx3, fontWeight: 600 } }, st.stage),
                React.createElement('h3', { style: { fontSize: 15, fontFamily: HSerif, color: isActive ? HC.bone : HC.tx2, fontWeight: 400 } }, st.name),
              ),
              React.createElement('button', {
                onClick: function() {
                  var next = Object.assign({}, activeStages);
                  next[st.stage] = !next[st.stage];
                  setActiveStages(next);
                },
                style: {
                  padding: '4px 14px', fontSize: 10, fontFamily: HMono,
                  background: isActive ? dangerLevel + '25' : 'transparent',
                  border: '1px solid ' + (isActive ? dangerLevel : HC.tx3),
                  borderRadius: 3, color: isActive ? dangerLevel : HC.tx3,
                  cursor: 'pointer', letterSpacing: '.06em',
                }
              }, isActive ? 'ACTIVE' : 'MARK ACTIVE'),
            ),
            React.createElement('p', { style: { fontSize: 13, fontFamily: HSerif, color: HC.tx2, lineHeight: 1.6, marginBottom: 12 } }, st.def),

            // Two-column: Holocaust example + Current case
            React.createElement('div', { style: { display: 'flex', gap: 16, flexWrap: 'wrap' } },
              React.createElement('div', { style: { flex: '1 1 240px', padding: '10px 14px', background: HC.dark, borderRadius: 3 } },
                React.createElement('div', { style: Object.assign({}, labelStyle, { color: HC.tx3 }) }, 'HOLOCAUST'),
                React.createElement('p', { style: { fontSize: 12, fontFamily: HSerif, color: HC.tx2, lineHeight: 1.5 } }, st.holocaust),
              ),
              React.createElement('div', { style: { flex: '1 1 240px', padding: '10px 14px', background: HC.warnBg, borderRadius: 3 } },
                React.createElement('div', { style: Object.assign({}, labelStyle, { color: HC.warn }) }, caseLabels[naCaseKey].toUpperCase()),
                React.createElement('p', { style: { fontSize: 12, fontFamily: HSerif, color: HC.tx, lineHeight: 1.5 } }, st.cases[naCaseKey]),
              ),
            ),
          );
        }),
      ),

      // Provenance
      React.createElement('div', { style: Object.assign({}, cardStyle, { marginTop: 8, borderLeft: '3px solid ' + HC.tx3 }) },
        React.createElement('div', { style: labelStyle }, 'FRAMEWORK SOURCES'),
        React.createElement('p', { style: { fontSize: 12, fontFamily: HMono, color: HC.tx3, lineHeight: 1.7 } },
          'Stanton, Gregory H. "The Ten Stages of Genocide." Genocide Watch (1996, revised 2013). || ' +
          'United Nations. "Framework of Analysis for Atrocity Crimes." UN Office on Genocide Prevention (2014). || ' +
          'Straus, Scott. Making and Unmaking Nations: War, Leadership, and Genocide in Modern Africa (2015).'
        ),
      ),
    );
  }


  // ═══════════════════════════════════════════════════════════════════
  //  TAB 6: RESISTANCE — Decision Analyzer
  // ═══════════════════════════════════════════════════════════════════

  function renderResistance() {
    var RES_SCENARIOS = [
      { id: 'ghetto_info', name: 'Information Vacuum (1941-42)',
        context: 'You are in the Lodz Ghetto, 1942. Rumors circulate about "resettlement to the East." The Judenrat chairman, Chaim Rumkowski, urges compliance, believing labor makes the ghetto indispensable. You have heard fragmentary reports of mass killings but no confirmation. The Germans have told you resettlement means work camps.',
        constraints: [
          'No reliable information about destinations -- the term "Auschwitz" means nothing to you in 1942',
          'Nazi deception was systematic: postcards were forced from victims upon arrival, Red Cross inspections were staged (Theresienstadt)',
          'Rumkowski\'s "work saves lives" strategy had empirical support -- productive ghettos survived longer',
          'Resistance meant not just your death but collective punishment of the entire ghetto',
          'No weapons, no military training, no allied contact, no escape routes through hostile territory',
        ],
        options: [
          { id: 'comply', label: 'Comply with deportation orders', analysis: 'This was the majority response, and it was rational given available information. Without knowledge of the Final Solution, compliance with "resettlement" appeared to maximize survival probability. Rumkowski\'s strategy of making the ghetto economically indispensable did extend Lodz\'s existence longer than any other major ghetto (until August 1944).' },
          { id: 'hide', label: 'Attempt to hide within the ghetto', analysis: 'Hiding was attempted by thousands. In the Warsaw Ghetto, an estimated 20,000-30,000 Jews went into hiding during the 1942 deportations. Success required shelter, food supplies, non-Jewish contacts, and extraordinary luck. Most were eventually discovered.' },
          { id: 'resist', label: 'Organize armed resistance', analysis: 'Armed resistance required weapons (almost impossible to obtain), organization (under constant surveillance), and the willingness to trigger collective punishment. The Warsaw Ghetto Uprising (April 1943) occurred only AFTER 300,000 had already been deported to Treblinka -- the fighters knew they were going to die and chose the manner of their death.' },
          { id: 'flee', label: 'Attempt to escape to the countryside', analysis: 'Escape required passing as non-Jewish (language, appearance, documents), finding shelter in hostile territory where harboring Jews was punishable by death for the entire family, and surviving without resources. In Poland, the countryside was overwhelmingly hostile. Some escaped to forests and joined partisan groups, but survival rates were extremely low.' },
        ],
        actualResistance: 'In Lodz, there was no armed uprising. Rumkowski\'s compliance strategy failed: in August 1944, the entire remaining ghetto population (67,000) was deported to Auschwitz. The question is not "why didn\'t they resist?" but "how could they have known?"',
      },
      { id: 'hostage', name: 'Hostage Dynamics (Warsaw 1942)',
        context: 'You are a member of the Jewish underground in Warsaw, July 1942. The Great Deportation has begun: 6,000-10,000 people per day are being sent to Treblinka. You have managed to obtain 10 pistols and a few grenades. If you attack the deportation apparatus, the Germans will accelerate killing and target the fighters\' families first.',
        constraints: [
          'Hostage dynamics: resistance in one location triggered collective punishment in others',
          '10 pistols against the Wehrmacht -- military calculus makes armed resistance suicidal',
          'The underground has intelligence that deportees are being killed, but most ghetto residents do not believe it',
          'Many residents still believe labor deportation is survivable -- resistance undermines their coping strategy',
          'If you fight now with 10 pistols, you lose the ability to fight later with more weapons',
        ],
        options: [
          { id: 'fight_now', label: 'Attack the deportation points immediately', analysis: 'Morally compelling but strategically catastrophic in July 1942. With 10 pistols against thousands of armed soldiers, the uprising would be crushed in hours. The underground chose to wait, build strength, and fight in April 1943 -- by which time 300,000 had been deported but the remaining fighters had acquired more weapons and built bunker networks.' },
          { id: 'document', label: 'Focus on documenting and transmitting evidence', analysis: 'This is what Oneg Shabbat (Emanuel Ringelblum\'s archive) chose to do. They collected testimonies, statistics, and documents, buried them in milk cans and metal boxes. Two of three caches were recovered after the war. This was a form of resistance: ensuring the truth survived even if the people did not.' },
          { id: 'smuggle', label: 'Smuggle people out and build weapons cache', analysis: 'This was the ZOB (Jewish Fighting Organization) strategy from July 1942 to April 1943. They smuggled weapons through the sewers, built bunker networks, established contacts with the Polish Home Army (which provided minimal support), and trained fighters. When they finally fought in April 1943, they held out for 27 days -- longer than the Polish army lasted against the Wehrmacht in 1939.' },
          { id: 'negotiate', label: 'Attempt to negotiate with the Judenrat for delay', analysis: 'The Judenrat (Jewish Council) was itself a hostage institution. Adam Czerniakow, head of the Warsaw Judenrat, was ordered to sign deportation lists. When he was told children would be included, he committed suicide on July 23, 1942. The Judenrat had no negotiating leverage -- it existed to implement German orders under the illusion of self-governance.' },
        ],
        actualResistance: 'The ZOB chose to wait, accumulate weapons, and fight when they could inflict maximum damage. The Warsaw Ghetto Uprising (April 19 - May 16, 1943) was not an attempt to survive but an assertion of agency: "We shall not go to our deaths like sheep." They killed approximately 20 German soldiers and held the ghetto for 27 days.',
      },
      { id: 'camp', name: 'Death Camp Conditions (Sobibor 1943)',
        context: 'You are a prisoner in Sobibor extermination camp. New arrivals are killed within hours. You are alive only because you were selected for the Sonderkommando -- forced labor in the killing apparatus. You know you will be killed when you are no longer useful. A group of Soviet Jewish POWs has arrived and they have military training.',
        constraints: [
          'The camp is surrounded by minefields, barbed wire, and watchtowers with machine guns',
          'Guards outnumber prisoners with weapons by 50:1',
          'Any escape attempt triggers the execution of remaining prisoners',
          'The surrounding Polish countryside offers no safe haven -- local population may turn you in',
          'You have been systematically starved, are physically weakened, and have no weapons beyond hidden knives',
        ],
        options: [
          { id: 'mass_revolt', label: 'Organize a mass revolt to overwhelm the guards', analysis: 'This is what happened at Sobibor on October 14, 1943. Led by Soviet POW Alexander Pechersky, prisoners killed 11 SS officers with axes and knives, seized weapons from the armory, and approximately 300 of 600 prisoners escaped through the minefields. About 50 survived the war. The camp was demolished by the Germans afterward.' },
          { id: 'selective_escape', label: 'Plan individual escapes through the fence', analysis: 'Individual escape was attempted at multiple camps. At Sobibor, a few prisoners escaped before the uprising, but the minefields and hostile countryside made survival nearly impossible without organization. The collective revolt was chosen because individual escape could not save the group.' },
          { id: 'sabotage', label: 'Sabotage the killing machinery', analysis: 'Sabotage occurred at several camps. At Auschwitz, the Sonderkommando revolt (October 7, 1944) destroyed Crematorium IV using smuggled gunpowder. Four women who smuggled the gunpowder (Roza Robota, Ella Gartner, Regina Safirsztajn, Esther Wajcblum) were executed. Sabotage slowed but could not stop the killing machinery.' },
          { id: 'endure', label: 'Endure and hope for Allied liberation', analysis: 'Waiting for liberation was rational only if you believed the Allies would arrive in time AND that the Germans would not kill all witnesses before retreating. At Sobibor, there was no evidence that liberation was imminent (the Eastern Front was still hundreds of kilometers away in October 1943). The Germans systematically killed Sonderkommando members to eliminate witnesses.' },
        ],
        actualResistance: 'The Sobibor revolt succeeded in its primary goal: breaking the camp. The revolt at Treblinka (August 2, 1943) followed a similar pattern. The Auschwitz Sonderkommando revolt (October 7, 1944) destroyed one crematorium. These were acts of extraordinary courage by people who had witnessed the worst of human capacity and chose to fight despite impossible odds.',
      },
      { id: 'forest', name: 'Forest Partisans (Belarus 1942)',
        context: 'You have escaped from the Minsk Ghetto to the forests of Belarus. You have found a group of 20 Jewish escapees, including women, children, and elderly. Soviet partisan groups operate nearby but are hostile to Jews and sometimes murder Jewish refugees. You must decide how to organize your group for survival.',
        constraints: [
          'Soviet partisan commanders sometimes refuse to accept Jews, especially non-combatants',
          'Women, children, and elderly are considered "useless mouths" by military partisan units',
          'The forests offer cover but no food, shelter, or medical supplies in winter',
          'German anti-partisan sweeps systematically comb the forests with thousands of troops',
          'Local peasants may betray your location for rewards or under threat',
        ],
        options: [
          { id: 'family_camp', label: 'Establish a hidden family camp for all', analysis: 'This is what the Bielski partisans chose. Tuvia Bielski insisted on accepting ALL Jews -- fighters, families, elderly, children. By war\'s end, the Bielski camp sheltered 1,236 people, making it the largest rescue of Jews by Jews during the Holocaust. The camp had workshops, a school, a mill, and a hospital. Bielski\'s rule: "I would rather save one old Jewish woman than kill ten German soldiers."' },
          { id: 'fighters_only', label: 'Form a fighting unit (combatants only)', analysis: 'Many Jewish partisan groups chose this path out of necessity. Fighting units could move quickly, carry weapons, and conduct operations. But abandoning non-combatants meant condemning them to death. Some groups split: fighters operated separately but supplied food to family camps. The moral calculus was agonizing.' },
          { id: 'join_soviets', label: 'Seek integration with Soviet partisan brigades', analysis: 'Joining Soviet partisans offered military structure, weapons, and intelligence networks. But Soviet units were often antisemitic. Jewish partisans faced discrimination, were given the most dangerous assignments, and some were murdered by their supposed allies. Integration meant subordinating Jewish concerns to Soviet military objectives.' },
          { id: 'border_escape', label: 'Attempt to cross borders to neutral territory', analysis: 'Crossing hundreds of kilometers of German-occupied territory with a group including children and elderly was nearly impossible. Some individuals made it to Sweden, Switzerland, or Spain, but organized group escape across Europe was logistically impossible. The forests, for all their dangers, offered the only viable refuge.' },
        ],
        actualResistance: 'The Bielski partisans represent one of the most remarkable stories of the Holocaust. By choosing rescue over revenge, Tuvia Bielski saved more Jews than Schindler. Other forest groups -- the Vilna FPO remnants, the Kovpak partisans, the Atlas group -- fought with extraordinary courage in impossible conditions.',
      },
      { id: 'sonderkommando', name: 'Moral Impossibility (Auschwitz 1944)',
        context: 'You are a member of the Auschwitz Sonderkommando -- prisoners forced to operate the gas chambers and crematoria. You witness the murder of thousands daily. You know you will be killed and replaced every few months. Female prisoners in the Weichsel-Union munitions factory have been smuggling tiny amounts of gunpowder to your group. You have enough to damage one crematorium.',
        constraints: [
          'You handle the bodies of the murdered -- including, sometimes, people from your own community',
          'The SS will execute your entire Kommando when the smuggling is discovered',
          'Destroying one crematorium does not stop the killing -- three others remain operational',
          'The Soviet Army is advancing but still months away from Auschwitz',
          'The four women smuggling gunpowder will certainly be tortured and executed if caught',
        ],
        options: [
          { id: 'revolt', label: 'Launch the revolt now with available explosives', analysis: 'On October 7, 1944, the Sonderkommando of Crematorium IV revolted. They set the crematorium on fire using the smuggled gunpowder, killed several SS guards, and cut through the fence. All 250 rebels were killed. Crematorium IV was destroyed and never rebuilt. The four women who smuggled the gunpowder were hanged on January 6, 1945 -- 20 days before liberation.' },
          { id: 'wait', label: 'Wait for more explosives to destroy multiple crematoria', analysis: 'Waiting risked the entire conspiracy being discovered. The SS periodically killed and replaced Sonderkommando members. The group that planned the revolt knew their time was running out. The decision to act with insufficient resources was a response to the certainty of death -- they chose when and how.' },
          { id: 'document', label: 'Bury written testimonies for posterity', analysis: 'Several Sonderkommando members did exactly this. Zalmen Gradowski, Leyb Langfus, and Zalmen Lewental buried manuscripts in the grounds of the crematoria. These were discovered after the war and represent the only eyewitness accounts from inside the gas chambers. Writing was itself an act of resistance against the Nazi goal of total erasure.' },
          { id: 'smuggle_out', label: 'Focus on smuggling evidence to the outside world', analysis: 'Photographs were smuggled out of Auschwitz by the Sonderkommando in August 1944 -- four blurred images taken at enormous risk, showing bodies being burned in open pits. These are the only photographic evidence taken by victims from inside the killing process. The photographs reached the Polish resistance but did not change Allied policy.' },
        ],
        actualResistance: 'The Sonderkommando revolt and the buried testimonies represent resistance at the extreme boundary of human experience. These were people who had been forced to participate in the murder process and who chose, at the cost of their lives, to fight back, bear witness, or both. The question "why didn\'t they resist?" is answered by the question "what more could resistance possibly mean?"',
      },
    ];
    var scenario = RES_SCENARIOS[resScenario];
    var choiceKey = scenario.id;
    var userChoice = resChoices[choiceKey];
    var isRevealed = resRevealed[choiceKey];

    return React.createElement('div', null,
      // Header
      React.createElement('div', { style: { padding: 16, background: HC.bgCard, border: '1px solid ' + HC.cardBd, borderLeft: '3px solid ' + HC.red, marginBottom: 16, borderRadius: 4 } },
        React.createElement('p', { style: { fontFamily: HMono, fontSize: 10, color: HC.red, letterSpacing: '.12em', marginBottom: 8 } }, 'RESISTANCE DECISION ANALYZER'),
        React.createElement('p', { style: { fontSize: 13, fontFamily: HSerif, color: HC.tx, lineHeight: 1.7 } },
          '"Why didn\'t they resist?" is the most asked and most misunderstood question about the Holocaust. This instrument presents the actual constraints Jews faced in five scenarios. Evaluate the options and see why organized resistance was structurally nearly impossible -- and why the resistance that DID occur was extraordinary.'
        )
      ),
      // Scenario selector
      React.createElement('div', { style: { display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' } },
        RES_SCENARIOS.map(function(s, si) {
          var active = resScenario === si;
          return React.createElement('button', { key: s.id, onClick: function() { setResScenario(si); },
            style: { flex: '1 1 auto', padding: '8px 10px', fontFamily: HMono, fontSize: 10, cursor: 'pointer',
              background: active ? HC.red + '18' : 'transparent', border: '1px solid ' + (active ? HC.red : HC.cardBd),
              color: active ? HC.accent : HC.tx3, borderRadius: 3, textAlign: 'center', minWidth: 100 }
          }, s.name);
        })
      ),
      // Context
      React.createElement('div', { style: { padding: 14, background: HC.bgCard, border: '1px solid ' + HC.cardBd, borderRadius: 4, marginBottom: 12 } },
        React.createElement('div', { style: { fontFamily: HMono, fontSize: 9, color: HC.accent, marginBottom: 6 } }, 'SCENARIO CONTEXT'),
        React.createElement('p', { style: { fontSize: 13, fontFamily: HSerif, color: HC.tx, lineHeight: 1.7 } }, scenario.context)
      ),
      // Constraints
      React.createElement('div', { style: { padding: 14, background: HC.warnBg, border: '1px solid ' + HC.warn + '30', borderRadius: 4, marginBottom: 16 } },
        React.createElement('div', { style: { fontFamily: HMono, fontSize: 9, color: HC.warn, marginBottom: 8 } }, 'STRUCTURAL CONSTRAINTS'),
        scenario.constraints.map(function(c, ci) {
          return React.createElement('div', { key: ci, style: { display: 'flex', gap: 8, marginBottom: 4 } },
            React.createElement('span', { style: { fontFamily: HMono, fontSize: 10, color: HC.warn, flexShrink: 0 } }, (ci + 1) + '.'),
            React.createElement('p', { style: { fontSize: 12, fontFamily: HSerif, color: HC.tx, lineHeight: 1.6 } }, c)
          );
        })
      ),
      // Options
      React.createElement('div', { style: { fontFamily: HMono, fontSize: 9, color: HC.tx3, marginBottom: 8 } }, 'WHAT WOULD YOU DO?'),
      scenario.options.map(function(opt) {
        var selected = userChoice === opt.id;
        return React.createElement('div', { key: opt.id,
          onClick: function() { if (!isRevealed) { setResChoices(function(prev) { var c = Object.assign({}, prev); c[choiceKey] = opt.id; return c; }); } },
          style: { padding: 12, background: selected ? HC.accentBg : HC.bgCard, border: '1px solid ' + (selected ? HC.accent : HC.cardBd), borderRadius: 4, marginBottom: 8, cursor: isRevealed ? 'default' : 'pointer' }
        },
          React.createElement('span', { style: { fontFamily: HMono, fontSize: 12, color: selected ? HC.accent : HC.tx, fontWeight: 600 } }, opt.label),
          isRevealed ? React.createElement('p', { style: { fontSize: 12, fontFamily: HSerif, color: HC.tx2, lineHeight: 1.65, marginTop: 8, paddingTop: 8, borderTop: '1px solid ' + HC.line } }, opt.analysis) : null
        );
      }),
      // Reveal button
      !isRevealed && userChoice ? React.createElement('button', {
        onClick: function() { setResRevealed(function(prev) { var c = Object.assign({}, prev); c[choiceKey] = true; return c; }); },
        style: { padding: '8px 20px', fontFamily: HMono, fontSize: 11, cursor: 'pointer', background: HC.accentBg, border: '1px solid ' + HC.accent, color: HC.accent, borderRadius: 3, marginBottom: 16 }
      }, 'Reveal Historical Analysis') : null,
      // Actual resistance
      isRevealed ? React.createElement('div', { style: { padding: 14, background: HC.bgCard, border: '1px solid ' + HC.red + '30', borderLeft: '3px solid ' + HC.red, borderRadius: 4, marginTop: 16 } },
        React.createElement('div', { style: { fontFamily: HMono, fontSize: 10, color: HC.red, marginBottom: 6 } }, 'WHAT ACTUALLY HAPPENED'),
        React.createElement('p', { style: { fontSize: 12, fontFamily: HSerif, color: HC.tx, lineHeight: 1.7 } }, scenario.actualResistance),
        React.createElement('p', { style: { fontSize: 10, fontFamily: HMono, color: HC.tx3, marginTop: 10, lineHeight: 1.6 } },
          'Sources: Arad, "Ghetto in Flames" (1980). Gutman, "Resistance: The Warsaw Ghetto Uprising" (1994). Rashke, "Escape from Sobibor" (1982). Greif, "We Wept Without Tears: Testimonies of the Jewish Sonderkommando" (2005). Tec, "Defiance: The Bielski Partisans" (1993).'
        )
      ) : null
    );
  }


  // ═══════════════════════════════════════════════════════════════════
  //  TAB 7: BYSTANDER — Spectrum Analyzer
  // ═══════════════════════════════════════════════════════════════════

  function renderBystander() {
    var RESCUER_PROFILES = [
      { id: 'wallenberg', name: 'Raoul Wallenberg', country: 'Sweden / Hungary', motivation: 'Professional / Humanitarian',
        riskLevel: 'extreme', saved: '~20,000-100,000',
        story: 'Swedish diplomat who arrived in Budapest in July 1944 and issued thousands of "protective passports" (Schutzpasse). Created safe houses under Swedish diplomatic protection. Personally confronted Adolf Eichmann. Intervened at deportation trains, pulling people off by claiming they had Swedish papers. Disappeared into Soviet custody in January 1945; believed to have died in Soviet prison.',
        motivationType: 'professional', factors: ['Diplomatic immunity provided protection most rescuers lacked', 'Swedish government support gave institutional backing', 'Arrived late (1944) when the outcome of the war was clear', 'Personal courage far exceeded his diplomatic mandate'] },
      { id: 'sendler', name: 'Irena Sendler', country: 'Poland', motivation: 'Moral / Professional',
        riskLevel: 'extreme', saved: '~2,500 children',
        story: 'Polish social worker who used her access to the Warsaw Ghetto (as a health worker authorized to check for typhus) to smuggle children out in ambulances, toolboxes, suitcases, and through sewer pipes. Kept a list of children\'s real names in jars buried under a tree to reunite them with families after the war. Arrested by the Gestapo in 1943, tortured (legs and feet broken), sentenced to death. Rescued by Zegota (underground) through bribery. Continued rescue work under a false identity.',
        motivationType: 'moral', factors: ['Pre-war social work connections provided infrastructure', 'Professional role gave legitimate access to the ghetto', 'Operated within organized network (Zegota)', 'Accepted torture rather than reveal children\'s locations'] },
      { id: 'schindler', name: 'Oskar Schindler', country: 'Germany / Poland', motivation: 'Situational / Evolving',
        riskLevel: 'high', saved: '~1,200',
        story: 'German industrialist and Nazi Party member who initially employed Jews as cheap labor in his enamelware factory. Gradually transformed from war profiteer to rescuer. Used his factory as a cover to protect Jewish workers, spending his entire fortune bribing officials. Created a famous list of "essential workers" to prevent their deportation to Auschwitz. Died penniless in 1974.',
        motivationType: 'situational', factors: ['Started as opportunist, not humanitarian -- moral evolution over time', 'Nazi Party membership and business connections provided cover', 'Personal relationships with individual workers triggered empathy', 'Used the system\'s own logic (economic productivity) to subvert it'] },
      { id: 'chambon', name: 'Le Chambon-sur-Lignon', country: 'France', motivation: 'Religious / Communal',
        riskLevel: 'high', saved: '~3,500',
        story: 'An entire village of French Huguenots (Protestants) who sheltered Jews and other refugees throughout the occupation. Led by Pastor Andre Trocme and his wife Magda. The village had a collective memory of religious persecution (Huguenots were persecuted for centuries in Catholic France). When asked why they helped, villagers consistently replied: "It was the natural thing to do." The conspiracy of silence involved the entire community -- no one betrayed the refugees.',
        motivationType: 'religious', factors: ['Collective action, not individual heroism -- an entire community participated', 'Huguenot history of persecution created empathic identification', 'Rural isolation provided geographic protection', 'Pastor Trocme provided moral leadership but the village chose collectively'] },
      { id: 'sugihara', name: 'Chiune Sugihara', country: 'Japan / Lithuania', motivation: 'Moral / Professional',
        riskLevel: 'high', saved: '~6,000-10,000',
        story: 'Japanese consul in Kaunas, Lithuania who issued thousands of transit visas to Jewish refugees in 1940, defying explicit orders from Tokyo. Wrote visas by hand for 18-20 hours a day for weeks. Continued writing visas from the train window as he was recalled to Japan. Dismissed from diplomatic service after the war. Not honored by Japan until decades later.',
        motivationType: 'moral', factors: ['Defied his own government\'s direct orders', 'No personal connection to Jewish community', 'Cultural context: disobedience was extremely stigmatized in Japanese society', 'Paid career cost for decades -- not a "costless" moral gesture'] },
    ];
    var SPECTRUM_POSITIONS = [
      { label: 'Perpetrator', desc: 'Active participation in killing, deportation, or persecution', color: '#8b3030', pct: 5 },
      { label: 'Collaborator', desc: 'Assisted perpetrators through denunciation, property seizure, or administrative support', color: '#a05040', pct: 10 },
      { label: 'Passive Bystander', desc: 'Witnessed persecution without acting -- neither helping nor harming', color: '#808060', pct: 70 },
      { label: 'Sympathizer', desc: 'Expressed private sympathy but took no action due to fear or indifference', color: '#607848', pct: 10 },
      { label: 'Rescuer', desc: 'Actively risked personal safety to save persecuted individuals', color: '#3a5878', pct: 5 },
    ];
    var profile = RESCUER_PROFILES[byProfile];
    return React.createElement('div', null,
      // Header
      React.createElement('div', { style: { padding: 16, background: HC.bgCard, border: '1px solid ' + HC.cardBd, borderLeft: '3px solid ' + HC.blue, marginBottom: 16, borderRadius: 4 } },
        React.createElement('p', { style: { fontFamily: HMono, fontSize: 10, color: HC.blue, letterSpacing: '.12em', marginBottom: 8 } }, 'BYSTANDER SPECTRUM ANALYZER'),
        React.createElement('p', { style: { fontSize: 13, fontFamily: HSerif, color: HC.tx, lineHeight: 1.7 } },
          'Yad Vashem has honored approximately 28,000 Righteous Among the Nations -- non-Jews who risked their lives to save Jews. This instrument maps the spectrum from perpetrator to rescuer and examines the factors that pushed individuals toward each end. The analytical question: what made some people act when the overwhelming majority did not?'
        )
      ),
      // Spectrum bar
      React.createElement('div', { style: { padding: 14, background: HC.bgCard, border: '1px solid ' + HC.cardBd, borderRadius: 4, marginBottom: 16 } },
        React.createElement('div', { style: { fontFamily: HMono, fontSize: 9, color: HC.tx3, marginBottom: 8 } }, 'THE BYSTANDER SPECTRUM'),
        React.createElement('div', { style: { display: 'flex', height: 24, borderRadius: 3, overflow: 'hidden', marginBottom: 8 } },
          SPECTRUM_POSITIONS.map(function(sp) {
            return React.createElement('div', { key: sp.label, style: { width: sp.pct + '%', background: sp.color, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement('span', { style: { fontFamily: HMono, fontSize: 8, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden' } }, sp.pct > 8 ? sp.label : '')
            );
          })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          SPECTRUM_POSITIONS.map(function(sp) {
            return React.createElement('div', { key: sp.label, style: { flex: '0 0 ' + sp.pct + '%', textAlign: 'center' } },
              React.createElement('div', { style: { fontFamily: HMono, fontSize: 8, color: sp.color } }, sp.pct + '%'),
              React.createElement('div', { style: { fontSize: 9, color: HC.tx3, lineHeight: 1.3, marginTop: 2 } }, sp.desc)
            );
          })
        )
      ),
      // Profile selector
      React.createElement('div', { style: { fontFamily: HMono, fontSize: 9, color: HC.tx3, marginBottom: 8 } }, 'RESCUER PROFILES'),
      React.createElement('div', { style: { display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' } },
        RESCUER_PROFILES.map(function(p, pi) {
          var active = byProfile === pi;
          return React.createElement('button', { key: p.id, onClick: function() { setByProfile(pi); },
            style: { padding: '8px 12px', fontFamily: HMono, fontSize: 10, cursor: 'pointer',
              background: active ? HC.blue + '18' : 'transparent', border: '1px solid ' + (active ? HC.blue : HC.cardBd),
              color: active ? HC.accent : HC.tx3, borderRadius: 3 }
          }, p.name);
        })
      ),
      // Profile detail
      React.createElement('div', { style: { padding: 16, background: HC.bgCard, border: '1px solid ' + HC.cardBd, borderRadius: 4, marginBottom: 12 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
          React.createElement('div', null,
            React.createElement('h3', { style: { fontSize: 18, fontFamily: HSerif, color: HC.bone, fontWeight: 400, marginBottom: 4 } }, profile.name),
            React.createElement('span', { style: { fontFamily: HMono, fontSize: 10, color: HC.tx2 } }, profile.country)
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontFamily: HMono, fontSize: 18, color: HC.accent } }, profile.saved),
            React.createElement('div', { style: { fontFamily: HMono, fontSize: 9, color: HC.tx3 } }, 'LIVES SAVED')
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 14 } },
          React.createElement('div', { style: { padding: '4px 8px', background: HC.blue + '18', border: '1px solid ' + HC.blue + '40', borderRadius: 3 } },
            React.createElement('span', { style: { fontFamily: HMono, fontSize: 9, color: HC.tx3 } }, 'MOTIVATION: '),
            React.createElement('span', { style: { fontFamily: HMono, fontSize: 10, color: HC.blue } }, profile.motivation)
          ),
          React.createElement('div', { style: { padding: '4px 8px', background: (profile.riskLevel === 'extreme' ? HC.red : HC.warn) + '18', border: '1px solid ' + (profile.riskLevel === 'extreme' ? HC.red : HC.warn) + '40', borderRadius: 3 } },
            React.createElement('span', { style: { fontFamily: HMono, fontSize: 9, color: HC.tx3 } }, 'RISK: '),
            React.createElement('span', { style: { fontFamily: HMono, fontSize: 10, color: profile.riskLevel === 'extreme' ? HC.red : HC.warn } }, profile.riskLevel.toUpperCase())
          )
        ),
        React.createElement('p', { style: { fontSize: 13, fontFamily: HSerif, color: HC.tx, lineHeight: 1.7, marginBottom: 14 } }, profile.story),
        React.createElement('div', { style: { fontFamily: HMono, fontSize: 9, color: HC.accent, marginBottom: 6 } }, 'ANALYTICAL FACTORS'),
        profile.factors.map(function(f, fi) {
          return React.createElement('div', { key: fi, style: { display: 'flex', gap: 8, marginBottom: 4 } },
            React.createElement('span', { style: { fontFamily: HMono, fontSize: 10, color: HC.accent, flexShrink: 0 } }, '\u2022'),
            React.createElement('p', { style: { fontSize: 12, fontFamily: HSerif, color: HC.tx2, lineHeight: 1.6 } }, f)
          );
        })
      ),
      // Bottom analysis
      React.createElement('div', { style: { padding: 14, background: HC.accentBg, border: '1px solid ' + HC.accent + '30', borderRadius: 4, marginTop: 16 } },
        React.createElement('div', { style: { fontFamily: HMono, fontSize: 10, color: HC.accent, marginBottom: 6 } }, 'WHAT MADE RESCUERS DIFFERENT?'),
        React.createElement('p', { style: { fontSize: 12, fontFamily: HSerif, color: HC.tx, lineHeight: 1.7 } },
          'Sociologist Samuel Oliner (himself a rescued child) found that rescuers shared key traits: a strong sense of personal agency, an inclusive moral framework that extended beyond in-group boundaries, and often a history of being outsiders themselves. But situational factors mattered enormously: access to resources, geographic location, institutional cover, and the simple accident of being asked. Many rescuers reported that they did not make a single dramatic decision but rather took small steps that escalated into full commitment. The bystander majority was not necessarily callous -- many were paralyzed by fear, constrained by circumstances, or simply never confronted with a direct opportunity to act.'
        ),
        React.createElement('p', { style: { fontSize: 10, fontFamily: HMono, color: HC.tx3, marginTop: 10, lineHeight: 1.6 } },
          'Sources: Oliner & Oliner, "The Altruistic Personality" (1988). Fogelman, "Conscience and Courage" (1994). Monroe, "The Heart of Altruism" (1996). Todorov, "The Fragility of Goodness" (2001). Yad Vashem Righteous Among the Nations database.'
        )
      )
    );
  }


  // ═══════════════════════════════════════════════════════════════════
  //  MAIN LAYOUT
  // ═══════════════════════════════════════════════════════════════════

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: HC.bg, color: HC.tx,
      fontFamily: HSans, padding: '0 0 60px',
    }
  },
    // Header
    React.createElement('div', { style: {
      padding: '32px 40px 24px', borderBottom: '1px solid ' + HC.line,
      background: 'linear-gradient(180deg, rgba(20,16,12,.98) 0%, ' + HC.bg + ' 100%)',
    } },
      React.createElement('button', {
        onClick: function() { setView('coursework'); },
        style: {
          background: 'none', border: 'none', color: HC.tx3,
          fontFamily: HMono, fontSize: 11, cursor: 'pointer',
          marginBottom: 16, padding: 0, letterSpacing: '.08em',
        }
      }, '< RETURN TO COURSEWORK'),
      React.createElement('div', { style: { marginBottom: 6 } },
        React.createElement('span', { style: { fontSize: 10, fontFamily: HMono, color: HC.tx3, letterSpacing: '.12em' } }, 'HIST 232'),
      ),
      React.createElement('h1', { style: {
        fontSize: 28, fontFamily: HSerif, color: HC.bone, fontWeight: 400,
        letterSpacing: '.02em', marginBottom: 6,
      } }, 'War and the Holocaust in Europe'),
      React.createElement('p', { style: {
        fontSize: 13, fontFamily: HSerif, color: HC.tx2, maxWidth: 700, lineHeight: 1.6,
      } }, 'Five analytical instruments for the study of mass violence. Not reference material — tools for thinking about how genocide becomes possible, who carries it out, and how to detect the warning signs before it is too late.'),

      // Provenance line
      React.createElement('p', { style: {
        fontSize: 10, fontFamily: HMono, color: HC.tx3, marginTop: 12, letterSpacing: '.06em',
      } }, 'SNYDER / BROWNING / HILBERG / ARENDT / STANTON / UN FRAMEWORK'),
    ),

    // Tab navigation
    React.createElement('div', { style: {
      display: 'flex', gap: 0, borderBottom: '1px solid ' + HC.line,
      padding: '0 40px', overflowX: 'auto',
    } },
      TABS.map(function(t) {
        var active = tab === t.key;
        return React.createElement('button', {
          key: t.key,
          onClick: function() { setTab(t.key); },
          style: {
            padding: '14px 20px', fontSize: 11, fontFamily: HMono,
            background: 'none', border: 'none',
            borderBottom: active ? ('2px solid ' + HC.accent) : '2px solid transparent',
            color: active ? HC.accent : HC.tx3,
            cursor: 'pointer', letterSpacing: '.08em', whiteSpace: 'nowrap',
          }
        }, t.label.toUpperCase());
      }),
    ),

    // Tab content
    React.createElement('div', { style: { padding: '24px 40px', maxWidth: 1100 } },
      tab === 'bloodlands' ? renderBloodlands() : null,
      tab === 'mechanisms' ? renderMechanisms() : null,
      tab === 'chronology' ? renderChronology() : null,
      tab === 'perpetrators' ? renderPerpetrators() : null,
      tab === 'neveragain' ? renderNeverAgain() : null,
      tab === 'resistance' ? renderResistance() : null,
      tab === 'bystander' ? renderBystander() : null,
    ),

    // Footer
    React.createElement('div', { style: {
      padding: '24px 40px', borderTop: '1px solid ' + HC.line, marginTop: 40,
    } },
      React.createElement('p', { style: { fontSize: 11, fontFamily: HMono, color: HC.tx3, lineHeight: 1.8, maxWidth: 700 } },
        'This page is an analytical tool built with scholarly rigor and absolute seriousness. ' +
        'The mechanisms, data, and frameworks presented here are drawn from peer-reviewed scholarship and official international frameworks. ' +
        'The purpose is not to memorialize alone, but to equip analysts with the conceptual tools to recognize the structural conditions ' +
        'that make mass atrocity possible — and to act before it is too late.'
      ),
      React.createElement('p', { style: { fontSize: 10, fontFamily: HMono, color: HC.tx3, marginTop: 12, letterSpacing: '.06em' } },
        'PRIMARY SOURCES: Snyder, Bloodlands (2010) / Black Earth (2015). Browning, Ordinary Men (1992). ' +
        'Hilberg, The Destruction of the European Jews (1961/2003). Arendt, Eichmann in Jerusalem (1963). ' +
        'Stanton, "Ten Stages of Genocide" (1996). UN Framework of Analysis for Atrocity Crimes (2014).'
      ),
    ),
  );
}
