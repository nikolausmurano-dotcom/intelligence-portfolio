// WesternView.jsx — Great Conversation
// Western Traditions (CORE)
// "The Great Conversation" — Six thinkers across two millennia, each responding
// to the previous one's ideas. Plato through Locke, tracing the evolution of
// Western political thought in an interactive dialogue format.
// Three modes: Dialogue (chronological conversation), Debates (paired thinkers
// on key questions), Legacy (modern relevance and enduring tensions).


// ── Palette: Warm marble & stone — classical academy on white marble ──
const C = {
  bg:      '#f5f3ef',
  card:    'rgba(250,248,244,.96)',
  cardBd:  'rgba(120,104,68,.20)',
  tx:      '#2a2820',
  tx2:     '#5a5440',
  tx3:     '#8a8068',
  accent:  '#806c48',
  accentDm:'#6a5838',
  accentBg:'rgba(128,108,72,.10)',
  gold:    '#a08830',
  goldDm:  '#887020',
  red:     '#984838',
  redDm:   '#783828',
  redBg:   'rgba(152,72,56,.08)',
  blue:    '#4a6890',
  blueDm:  '#3a5878',
  blueBg:  'rgba(74,104,144,.08)',
  green:   '#487850',
  greenDm: '#386038',
  greenBg: 'rgba(72,120,80,.08)',
  line:    'rgba(120,104,68,.15)',
  marble:  'rgba(160,140,100,.06)',
  column:  'rgba(120,104,68,.10)',
};
const Serif = "'EB Garamond','Source Serif 4',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";
const Mono  = "'IBM Plex Mono',monospace";

// ── SVG Decorative Elements ────────────────────────────────────────
const GreekKeyBorder = ({width}) => (
  <svg style={{width: width || '100%', height: '16px', opacity: 0.25}} viewBox="0 0 400 16" preserveAspectRatio="none">
    {[0,40,80,120,160,200,240,280,320,360].map(x => (
      <path key={x} d={'M'+x+' 0 L'+x+' 12 L'+(x+8)+' 12 L'+(x+8)+' 4 L'+(x+16)+' 4 L'+(x+16)+' 16 L'+(x+24)+' 16 L'+(x+24)+' 4 L'+(x+32)+' 4 L'+(x+32)+' 0 L'+(x+40)+' 0'}
        fill="none" stroke="rgba(160,144,96,.8)" strokeWidth="1.5"/>
    ))}
  </svg>
);

const ColumnDecor = ({side}) => (
  <div style={{
    position:'absolute',top:0,[side]:0,width:'30px',height:'100%',pointerEvents:'none',opacity:0.08,
    background:'linear-gradient(to '+(side==='left'?'right':'left')+', rgba(160,144,96,.3), transparent)',
  }}>
    <svg style={{width:'100%',height:'100%'}} viewBox="0 0 30 800" preserveAspectRatio="xMidYMin slice">
      {/* Column shaft with fluting */}
      <rect x="5" y="0" width="20" height="800" fill="rgba(160,144,96,.3)"/>
      <line x1="10" y1="0" x2="10" y2="800" stroke="rgba(120,100,60,.4)" strokeWidth="0.5"/>
      <line x1="15" y1="0" x2="15" y2="800" stroke="rgba(120,100,60,.4)" strokeWidth="0.5"/>
      <line x1="20" y1="0" x2="20" y2="800" stroke="rgba(120,100,60,.4)" strokeWidth="0.5"/>
      {/* Capital */}
      <rect x="2" y="0" width="26" height="8" rx="2" fill="rgba(160,144,96,.4)"/>
      <path d="M2 8 Q8 14 15 8 Q22 14 28 8" fill="none" stroke="rgba(160,144,96,.3)" strokeWidth="1"/>
    </svg>
  </div>
);

const MarbleTexture = () => (
  <div style={{
    position:'fixed',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:0,opacity:0.04,
    backgroundImage: 'radial-gradient(ellipse at 20% 40%, rgba(200,190,160,.5) 0%, transparent 40%), radial-gradient(ellipse at 70% 60%, rgba(180,170,140,.3) 0%, transparent 35%), radial-gradient(ellipse at 50% 20%, rgba(160,144,96,.4) 0%, transparent 30%)',
  }}/>
);

const LaurelDecor = () => (
  <svg style={{position:'absolute',top:10,right:20,width:'50px',height:'60px',opacity:0.10,pointerEvents:'none'}} viewBox="0 0 50 60">
    {/* Left branch */}
    <path d="M25 55 Q15 40 12 25" fill="none" stroke="rgba(160,144,96,1)" strokeWidth="1.5"/>
    {[45,38,31,24].map((y,i) => <ellipse key={'l'+i} cx={14-i*1.5} cy={y} rx="5" ry="3" fill="none" stroke="rgba(96,136,104,.6)" strokeWidth="0.8" transform={'rotate(-20,'+(14-i*1.5)+','+y+')'}/>)}
    {/* Right branch */}
    <path d="M25 55 Q35 40 38 25" fill="none" stroke="rgba(160,144,96,1)" strokeWidth="1.5"/>
    {[45,38,31,24].map((y,i) => <ellipse key={'r'+i} cx={36+i*1.5} cy={y} rx="5" ry="3" fill="none" stroke="rgba(96,136,104,.6)" strokeWidth="0.8" transform={'rotate(20,'+(36+i*1.5)+','+y+')'}/>)}
  </svg>
);

// ── Skills ──────────────────────────────────────────────────────────────
const SKILLS = [
  'History of Political Thought',
  'Classical Philosophy',
  'Social Contract Theory',
  'Natural Law Tradition',
  'Political Realism',
  'Enlightenment Liberalism',
  'Constitutional Theory',
  'Textual Interpretation',
];

// ── Provenance ──────────────────────────────────────────────────────────
const PROVENANCE = [
  { label: 'Strauss & Cropsey', desc: 'History of Political Philosophy (3rd ed.)' },
  { label: 'Wolin (2004)', desc: 'Politics and Vision: Expanded Edition' },
  { label: 'Primary Texts', desc: 'Republic, Politics, Summa, Prince, Leviathan, Second Treatise' },
  { label: 'Skinner (1978)', desc: 'The Foundations of Modern Political Thought' },
];

// ── Thinker Data ────────────────────────────────────────────────────────
const THINKERS = [
  {
    id: 'plato',
    num: 'I',
    name: 'Plato',
    dates: '428\u2013348 BCE',
    era: 'Classical Athens',
    subtitle: 'Philosopher Kings & the Ideal State',
    icon: '\u2609',
    coreArgument: 'Justice in the city mirrors justice in the soul. Just as the soul has three parts \— reason, spirit, and appetite \— the ideal city has three classes: philosopher-rulers who govern through wisdom, guardians who defend through courage, and producers who sustain through temperance. The philosopher king, having ascended from the Cave of illusion to perceive the Form of the Good, is uniquely qualified to rule because only one who understands transcendent truth can order human affairs justly.',
    historicalContext: 'Plato wrote in the aftermath of Athens\u2019 catastrophic defeat in the Peloponnesian War (404 BCE) and the execution of his teacher Socrates by Athenian democracy (399 BCE). The democracy that killed Socrates was, in Plato\u2019s view, a system where ignorance held power over wisdom. The demagogues who led Athens to ruin \— Cleon, Alcibiades \— exemplified rule by appetite rather than reason.',
    respondsTo: 'Plato initiates the Western political conversation. He responds not to a prior philosopher but to the lived experience of democratic failure. His Republic is a direct challenge to the Athenian democratic premise that every citizen\u2019s opinion is equally valid for governance. Against the Sophists who taught that justice is merely the interest of the stronger, Plato argues that justice has an objective, knowable nature rooted in transcendent Forms.',
    modernRelevance: 'Plato\u2019s critique of democracy remains unsettlingly relevant. His description of how democracies degenerate into tyrannies through demagogic manipulation, the prioritization of freedom over competence, and the erosion of shared truth reads like a diagnosis of contemporary populism. His insistence that governance requires specialized knowledge anticipates technocratic arguments, while his philosopher king raises the fundamental question: who watches the watchmen?',
    keyTexts: ['Republic (esp. Books II\u2013VII)', 'Statesman', 'Laws'],
    keyQuote: '"Until philosophers rule as kings, or those who are now called kings and leading men genuinely philosophize\u2026 cities will have no rest from evils."',
    quoteSource: 'Republic 473c\u2013d',
  },
  {
    id: 'aristotle',
    num: 'II',
    name: 'Aristotle',
    dates: '384\u2013322 BCE',
    era: 'Late Classical Athens',
    subtitle: 'Practical Politics & the Golden Mean',
    icon: '\u2641',
    coreArgument: 'Man is by nature a political animal (zoon politikon); the city exists not merely for survival but for the good life. Unlike Plato, Aristotle grounds politics in empirical observation rather than transcendent ideals. The best practicable regime is a mixed constitution \— polity \— combining democratic and oligarchic elements, governed by the middle class whose moderation prevents the extremes of rich and poor from destabilizing the state. Virtue is a habit of choosing the mean between excess and deficiency.',
    historicalContext: 'Aristotle studied under Plato for 20 years at the Academy but broke decisively with his teacher\u2019s idealism. He tutored Alexander the Great, observed the constitutions of 158 Greek city-states, and witnessed the transformation of the polis system as Macedonian power rendered city-state independence obsolete. His Politics is grounded in comparative constitutional analysis, not utopian speculation.',
    respondsTo: 'Aristotle directly challenges Plato\u2019s idealism. Where Plato seeks the perfect city, Aristotle asks: what is the best city achievable given human nature as it actually is? He rejects the philosopher king as impractical \— no city will voluntarily submit to such rule, and even if one did, the concentration of power corrupts. He replaces Plato\u2019s transcendent Forms with empirical classification: six regime types (three correct, three deviant), each analyzed for stability and justice.',
    modernRelevance: 'Aristotle\u2019s mixed constitution is the direct ancestor of modern constitutionalism \— the American system of checks and balances explicitly draws on his analysis of how combining democratic and oligarchic elements prevents tyranny. His emphasis on the middle class as the anchor of political stability informs contemporary debates about inequality and democratic erosion. His classification of regime types remains the starting point for comparative politics.',
    keyTexts: ['Politics (esp. Books III\u2013IV)', 'Nicomachean Ethics', 'Constitution of Athens'],
    keyQuote: '"The state is a creation of nature, and man is by nature a political animal. He who is without a city by nature rather than by chance is either a beast or a god."',
    quoteSource: 'Politics 1253a',
  },
  {
    id: 'aquinas',
    num: 'III',
    name: 'Thomas Aquinas',
    dates: '1225\u20131274',
    era: 'Medieval Christendom',
    subtitle: 'Natural Law & the Synthesis of Faith and Reason',
    icon: '\u271A',
    coreArgument: 'Law is an ordinance of reason, directed toward the common good, made by legitimate authority, and promulgated. There are four types of law forming a hierarchy: eternal law (God\u2019s rational governance of creation), natural law (human participation in eternal law through reason), human law (specific legislation derived from natural law principles), and divine law (revelation needed for salvation). Natural law is knowable by reason alone, providing a universal moral framework that binds all persons regardless of faith.',
    historicalContext: 'Aquinas wrote during the 13th-century recovery of Aristotle\u2019s complete works via Arabic translation, which created a crisis for Christian theology: Aristotle\u2019s naturalistic philosophy appeared to contradict Church doctrine on creation, the soul, and divine providence. The University of Paris repeatedly banned Aristotle\u2019s works. Aquinas\u2019s project was to demonstrate that faith and reason, properly understood, cannot contradict each other \— that Aristotelian philosophy, far from threatening Christianity, provides its rational foundation.',
    respondsTo: 'Aquinas synthesizes Aristotle and Christian theology. He accepts Aristotle\u2019s conclusion that man is naturally political and that the good life requires political community, but embeds this within a theological framework: the natural order, including political life, is created by God and directed toward divine purposes. He corrects Aristotle\u2019s paganism while preserving his empiricism. Against pure Augustinian pessimism about human nature, Aquinas argues that reason can discover moral truths independently of revelation \— natural law is accessible to all.',
    modernRelevance: 'Natural law theory, as formulated by Aquinas, remains a living tradition in jurisprudence. The idea that there are moral limits on what positive law can legitimately command \— that an unjust law is no law at all \— was invoked by Martin Luther King Jr. in his Letter from Birmingham Jail. Catholic social teaching on human dignity, just war, and the common good descends directly from Aquinas. The natural law tradition offers a non-relativistic basis for human rights that does not depend on social contract fiction.',
    keyTexts: ['Summa Theologica (I\u2013II, QQ.90\u201397)', 'De Regno', 'Commentary on Aristotle\u2019s Politics'],
    keyQuote: '"An unjust law is a human law that is not rooted in eternal law and natural law. Any law that degrades human personality is unjust."',
    quoteSource: 'Summa Theologica I\u2013II, Q.95, Art.2 (paraphrased)',
  },
  {
    id: 'machiavelli',
    num: 'IV',
    name: 'Niccol\u00F2 Machiavelli',
    dates: '1469\u20131527',
    era: 'Renaissance Florence',
    subtitle: 'Political Realism & the Autonomy of Politics',
    icon: '\u2694',
    coreArgument: 'Politics must be understood as it is, not as it ought to be. The effective ruler must learn how not to be good, because a prince who practices virtue in all circumstances will be destroyed by those who do not. The gap between how men live and how they ought to live is so great that anyone who abandons what is done for what ought to be done brings about his own ruin. Political success requires virt\u00F9 \— a combination of skill, audacity, and adaptability \— exercised in response to fortuna, the unpredictable flow of events.',
    historicalContext: 'Machiavelli served as a senior diplomat for the Florentine Republic (1498\u20131512), observing power politics firsthand across Italy, France, and the Papal States. He witnessed the French invasion of Italy (1494), the rise and fall of Cesare Borgia, and the Medici restoration that ended his political career and led to his arrest and torture. The Prince was written in exile, partly as a bid for Medici patronage, partly as a distillation of political wisdom gained through bitter experience.',
    respondsTo: 'Machiavelli deliberately breaks with the entire classical and Christian tradition. He rejects Plato\u2019s ideal republic as a fantasy. He rejects Aristotle\u2019s moral foundation for politics. He rejects Aquinas\u2019s subordination of politics to theology. His famous chapter on whether it is better to be loved or feared is a direct assault on Christian ethics as a guide to statecraft. He creates the modern concept of the autonomous political sphere \— politics judged by its own standards of effectiveness, not by moral or theological criteria external to it.',
    modernRelevance: 'Machiavelli is the founder of modern political science as an empirical discipline. His insistence on analyzing politics as it actually operates \— through power, interest, and strategic calculation \— anticipates realist international relations theory, rational choice political science, and the entire tradition of separating political analysis from moral prescription. Every political advisor who counsels pragmatism over principle, every strategist who calculates costs and benefits of military intervention, is speaking Machiavelli\u2019s language.',
    keyTexts: ['The Prince (esp. chapters XV\u2013XIX)', 'Discourses on Livy', 'The Art of War'],
    keyQuote: '"Everyone sees what you appear to be, few experience what you really are. And those few dare not oppose themselves to the opinion of the many."',
    quoteSource: 'The Prince, ch. XVIII',
  },
  {
    id: 'hobbes',
    num: 'V',
    name: 'Thomas Hobbes',
    dates: '1588\u20131679',
    era: 'English Civil War',
    subtitle: 'The Social Contract & the Leviathan State',
    icon: '\u26A1',
    coreArgument: 'In the state of nature \— without government \— human life is a war of all against all: solitary, poor, nasty, brutish, and short. Rational self-interest compels individuals to surrender their natural freedom to an absolute sovereign (the Leviathan) through a social contract. The sovereign\u2019s power must be undivided and irrevocable because any limitation on sovereignty recreates the conditions of civil war. Peace and order are the supreme political goods; liberty is meaningful only within the security the sovereign provides.',
    historicalContext: 'Hobbes lived through the English Civil War (1642\u20131651), the execution of Charles I, Cromwell\u2019s Commonwealth, and the Restoration \— a generation of political violence that killed proportionally more Englishmen than World War I. He wrote Leviathan in Parisian exile while Royalists and Parliamentarians tore England apart. The book is a philosophical response to lived catastrophe: what minimal conditions must be met to prevent civilized society from collapsing into murderous chaos?',
    respondsTo: 'Hobbes completes Machiavelli\u2019s break with classical philosophy but replaces Machiavelli\u2019s unsystematic realism with rigorous deductive argument. He rejects Aristotle\u2019s natural sociability \— for Hobbes, political society is entirely artificial, created by covenant for self-preservation. He rejects Aquinas\u2019s natural law as knowable by reason \— for Hobbes, natural law commands only self-preservation, and its enforcement requires sovereign power. He shares Machiavelli\u2019s pessimism about human nature but draws a radically different conclusion: not princely virt\u00F9 but institutional absolutism is the remedy for human wickedness.',
    modernRelevance: 'Hobbes is the architect of modern state theory. His argument that legitimate authority derives from consent (however coerced by necessity) rather than from divine right or natural hierarchy is the foundation of liberal political theory \— even though his conclusions are illiberal. His analysis of sovereignty as the monopoly of legitimate violence anticipates Max Weber. His description of the state of nature informs game theory, international relations realism, and debates about failed states. Every argument for strong government in the name of security \— from anti-terrorism legislation to pandemic emergency powers \— is fundamentally Hobbesian.',
    keyTexts: ['Leviathan (esp. Parts I\u2013II)', 'De Cive', 'Elements of Law'],
    keyQuote: '"The condition of man is a condition of war of everyone against everyone; in which case everyone has a right to everything, even to one another\u2019s body."',
    quoteSource: 'Leviathan, ch. XIV',
  },
  {
    id: 'locke',
    num: 'VI',
    name: 'John Locke',
    dates: '1632\u20131704',
    era: 'Glorious Revolution',
    subtitle: 'Natural Rights & the Consent of the Governed',
    icon: '\u2606',
    coreArgument: 'The state of nature is not a war of all against all but a state of freedom and equality governed by natural law, which reason teaches that no one ought to harm another in his life, health, liberty, or possessions. Government is established by consent to protect pre-existing natural rights \— especially property, which is created when individuals mix their labor with nature. When government violates the trust for which it was established, the people retain the right of revolution. Legislative power is supreme but limited; the executive is subordinate to law.',
    historicalContext: 'Locke\u2019s Two Treatises of Government were published in 1689 to justify the Glorious Revolution, which replaced James II with William and Mary. But they were largely written earlier, during the Exclusion Crisis (1679\u20131681), when Locke\u2019s patron, the Earl of Shaftesbury, led the effort to exclude the Catholic Duke of York from the succession. Locke fled to Holland in 1683 to avoid arrest. His political philosophy is forged in the crucible of resistance to arbitrary royal power.',
    respondsTo: 'Locke directly refutes Hobbes while accepting the social contract framework. He agrees that government requires consent but denies that rational individuals would ever consent to absolute sovereignty \— surrendering all rights to an unaccountable ruler is less rational than the state of nature itself. He recovers natural law from Hobbes\u2019s radical reinterpretation, arguing (with Aquinas) that reason can discover substantive moral truths, especially regarding property and liberty. Against Hobbes\u2019s indivisible sovereign, Locke insists on separation of powers, legislative supremacy, and the right of revolution as safeguards against tyranny.',
    modernRelevance: 'Locke is arguably the most influential political philosopher in the Anglo-American tradition. Jefferson drew directly on the Second Treatise when drafting the Declaration of Independence. Locke\u2019s labor theory of property influenced Adam Smith and the development of liberal economics. His theory of religious toleration anticipates the First Amendment. His argument that government authority is conditional on performance \— that sovereignty resides ultimately in the people \— is the philosophical foundation of modern liberal democracy. The American Constitution is a Lockean document.',
    keyTexts: ['Two Treatises of Government (esp. Second Treatise)', 'A Letter Concerning Toleration', 'Essay Concerning Human Understanding'],
    keyQuote: '"The end of law is not to abolish or restrain, but to preserve and enlarge freedom. For liberty is to be free from restraint and violence from others."',
    quoteSource: 'Second Treatise, \u00A757',
  },
];

// ── Debate Data ─────────────────────────────────────────────────────────
const DEBATES = [
  {
    id: 'ideal_vs_real',
    question: 'Should politics aim at the ideal or deal with reality as it is?',
    side1: { thinker: 'Plato', position: 'Politics must be guided by knowledge of the Good. Without a transcendent standard, political life degenerates into a contest of appetites. The philosopher who perceives the Forms can design a just city because justice has an objective, eternal nature. Pragmatism without ideals is merely sophisticated corruption.' },
    side2: { thinker: 'Machiavelli', position: 'Imagined republics and ideal kingdoms have ruined more men than they have saved. A ruler who insists on being good in all circumstances will be destroyed by those who are not. The effective prince studies what men actually do, not what they ought to do, and adapts his conduct to necessity. Idealism in politics is a form of irresponsibility.' },
    tension: 'This debate defines the fundamental division in Western political thought. Every policy argument involves a tension between aspirational ideals and operational constraints. Plato asks: what are we aiming at? Machiavelli asks: what actually works? Neither question can be answered without the other.',
  },
  {
    id: 'human_nature',
    question: 'Is human nature fundamentally social or fundamentally competitive?',
    side1: { thinker: 'Aristotle', position: 'Man is by nature a political animal. The impulse toward community is implanted in all humans by nature, and the person who first founded a city was the greatest of benefactors. Outside the polis, a human being cannot develop the virtues that constitute the good life. Solitary existence is for beasts or gods, not for humans.' },
    side2: { thinker: 'Hobbes', position: 'In the natural condition, without a common power to keep them in awe, humans are in a state of war. Competition for scarce resources, diffidence about others\u2019 intentions, and the desire for glory drive men into conflict. Political society is not natural but artificial \— constructed out of fear and rational calculation to escape the misery of the state of nature.' },
    tension: 'The answer to this question determines the entire structure of political thought that follows. If Aristotle is right, government should cultivate virtue and the good life. If Hobbes is right, government\u2019s primary function is preventing violence. Modern liberal democracies awkwardly combine both answers \— securing order (Hobbes) while promoting welfare and human development (Aristotle).',
  },
  {
    id: 'source_of_law',
    question: 'What is the ultimate source of political authority and law?',
    side1: { thinker: 'Aquinas', position: 'All law derives from the eternal law of God, mediated through natural law accessible to human reason. Human positive law has authority only insofar as it participates in natural law \— an unjust law is not truly law at all. The authority of the state is real but subordinate to a higher moral order that transcends any human legislator.' },
    side2: { thinker: 'Locke', position: 'Political authority derives from the consent of the governed. In the state of nature, individuals possess natural rights to life, liberty, and property. They establish government by compact to better protect these rights. When government fails this trust, authority reverts to the people. No transcendent order is needed \— rational self-interest and natural law (discoverable by reason) suffice to ground legitimate government.' },
    tension: 'This debate frames the modern struggle between religious and secular foundations for law. Aquinas argues that law requires a metaphysical anchor; without God, moral authority becomes arbitrary. Locke grounds authority in consent and reason, making democracy possible without theological premises. Both positions remain active in contemporary jurisprudence \— natural law theory vs. legal positivism.',
  },
  {
    id: 'liberty_vs_order',
    question: 'Should the state prioritize liberty or security?',
    side1: { thinker: 'Hobbes', position: 'The sovereign\u2019s first obligation is to provide peace and security. Liberty in the state of nature is meaningless because it exists alongside mortal danger. True freedom is freedom within the protection of the Leviathan \— the ability to pursue one\u2019s life without fear of violent death. Any limitation on sovereign power risks the return of civil war. Security is the precondition for all other goods.' },
    side2: { thinker: 'Locke', position: 'The end of law is to preserve and enlarge freedom. Government exists to protect pre-existing natural rights, not to absorb them. A government that sacrifices liberty for security has betrayed the very purpose for which it was established. The people retain the right of revolution precisely because no amount of security justifies absolute power \— absolute power is itself the greatest threat to security.' },
    tension: 'This is perhaps the most immediately relevant debate in contemporary politics. Every expansion of surveillance power, every emergency decree, every balance between civil liberties and national security recapitulates the Hobbes-Locke argument. The tension is irresolvable because both thinkers identify real dangers: anarchy (Hobbes) and tyranny (Locke).',
  },
  {
    id: 'virtue_vs_mechanism',
    question: 'Does good government depend on virtuous rulers or good institutions?',
    side1: { thinker: 'Plato', position: 'The quality of government depends entirely on the quality of the souls who govern. No institutional arrangement can compensate for rulers who lack wisdom and virtue. The philosopher king is not a constitutional mechanism but a transformed human being \— one who has seen the Good and can therefore order the city accordingly. Bad rulers will corrupt any institution; good rulers need few constraints.' },
    side2: { thinker: 'Locke', position: 'Good government requires separation of powers, legislative supremacy, and the right of revolution \— institutional mechanisms that constrain power regardless of the character of those who hold it. The assumption of virtue in rulers is naive and dangerous. Constitutional design must assume the worst about human nature and create structures that channel self-interest toward the common good.' },
    tension: 'Modern constitutionalism has largely sided with Locke, designing institutions that function even with imperfect occupants. Yet crises repeatedly reveal the limits of institutional design \— norms depend on voluntary compliance, and constitutional systems can be gamed by sufficiently determined actors. The character of leaders still matters, as Plato insisted.',
  },
];

// ── Legacy Data ─────────────────────────────────────────────────────────
const LEGACY_ITEMS = [
  {
    id: 'constitutionalism',
    name: 'Constitutional Government',
    icon: '\u2696',
    trace: 'Aristotle \→ Aquinas \→ Locke \→ American Founders',
    description: 'The idea that government should be limited by law, with power divided among institutions that check one another, traces directly through this lineage. Aristotle\u2019s mixed constitution, filtered through Aquinas\u2019s insistence on law\u2019s rational and moral foundations, and Locke\u2019s theory of consent and separation of powers, produced the constitutional frameworks of modern liberal democracies.',
    modernExamples: [
      'The U.S. Constitution\u2019s separation of powers (Locke\u2019s legislative supremacy + Aristotle\u2019s mixed regime)',
      'Judicial review as a check on legislative power (the Aquinas principle that unjust law is no law)',
      'The European Convention on Human Rights (Lockean natural rights in institutional form)',
      'Parliamentary sovereignty vs. constitutional courts (the unresolved Hobbes-Locke tension)',
    ],
  },
  {
    id: 'realism',
    name: 'Political Realism',
    icon: '\u2694',
    trace: 'Machiavelli \→ Hobbes \→ Weber \→ Morgenthau',
    description: 'Machiavelli\u2019s separation of politics from morality and Hobbes\u2019s analysis of power and fear created the realist tradition in political thought. This lineage leads directly to Max Weber\u2019s definition of the state as a monopoly on legitimate violence, Hans Morgenthau\u2019s realist theory of international relations, and contemporary strategic studies.',
    modernExamples: [
      'International relations realism: states pursue power and security in an anarchic system (Hobbes\u2019s state of nature scaled up)',
      'Nuclear deterrence theory rests on Hobbesian logic: mutual fear prevents war',
      'Machiavelli\u2019s virt\u00F9 reappears in strategic studies as adaptive leadership under uncertainty',
      'The "realist" critique of humanitarian intervention: good intentions do not guarantee good outcomes',
    ],
  },
  {
    id: 'natural_rights',
    name: 'Human Rights',
    icon: '\u2606',
    trace: 'Aquinas \→ Locke \→ Jefferson \→ Universal Declaration',
    description: 'The concept of inherent, inalienable human rights derives from the natural law tradition. Aquinas established that moral truths are accessible to reason and binding on all persons. Locke secularized this into natural rights to life, liberty, and property. Jefferson translated Locke into the Declaration of Independence. The 1948 Universal Declaration of Human Rights universalized the tradition.',
    modernExamples: [
      'The Declaration of Independence\u2019s "self-evident truths" are pure Locke via Aquinas',
      'Martin Luther King Jr.\u2019s Letter from Birmingham Jail explicitly invokes Aquinas on unjust law',
      'International humanitarian law rests on the natural law premise of universal human dignity',
      'The tension between universal rights and cultural relativism recapitulates the Aquinas-Machiavelli divide',
    ],
  },
  {
    id: 'democracy_critique',
    name: 'Democratic Self-Critique',
    icon: '\⚠',
    trace: 'Plato \→ Tocqueville \→ Mill \→ Contemporary Populism',
    description: 'Plato\u2019s critique of democracy \— that it degenerates through flattery, ignorance, and the elevation of freedom over competence \— has been the persistent shadow companion of democratic theory. Every generation of democrats has had to answer Plato\u2019s challenge: how do you prevent self-governance from becoming self-destruction?',
    modernExamples: [
      'Tocqueville\u2019s "tyranny of the majority" restates Plato\u2019s concern in democratic terms',
      'Mill\u2019s On Liberty addresses the Platonic worry that democratic conformity suppresses wisdom',
      'Contemporary debates about populism, misinformation, and epistemic decline echo Republic Book VIII',
      'Technocratic governance (expert panels, central banks) attempts to embed Platonic guardianship within democratic systems',
    ],
  },
  {
    id: 'social_contract',
    name: 'Legitimacy & Consent',
    icon: '\u270D',
    trace: 'Hobbes \→ Locke \→ Rousseau \→ Rawls',
    description: 'The social contract tradition, initiated by Hobbes and transformed by Locke, remains the dominant framework for thinking about political legitimacy in Western philosophy. Rousseau radicalized it into popular sovereignty; Rawls revived it as a method for deriving principles of justice. The central insight \— that legitimate authority requires the consent of the governed \— is the philosophical bedrock of modern democracy.',
    modernExamples: [
      'Rawls\u2019s "veil of ignorance" is a thought experiment in the social contract tradition',
      'Constitutional referendums and ratification processes enact the Lockean social contract',
      'The legitimacy crisis of international institutions (WTO, UN) reflects the absence of a global social contract',
      'Debates about immigration and citizenship are debates about who is party to the social contract',
    ],
  },
];

// ── Thinker Graph Data (SVG Dialogue Flow) ───────────────────────────
const THINKER_NODES = [
  { id: 'plato', x: 80, y: 80, label: 'Plato', era: '428-348 BC', core: 'Philosopher-kings should rule. Justice = each part doing its function.', color: '#a08040' },
  { id: 'aristotle', x: 280, y: 80, label: 'Aristotle', era: '384-322 BC', core: 'The good life is found in moderation. Politics is the master science.', color: '#6080a0' },
  { id: 'aquinas', x: 180, y: 200, label: 'Aquinas', era: '1225-1274', core: 'Natural law bridges faith and reason. An unjust law is no law at all.', color: '#a06030' },
  { id: 'machiavelli', x: 80, y: 320, label: 'Machiavelli', era: '1469-1527', core: 'Politics is about power, not virtue. The effective truth is what matters.', color: '#c04040' },
  { id: 'hobbes', x: 280, y: 320, label: 'Hobbes', era: '1588-1679', core: 'Without sovereign authority, life is war of all against all. Security > freedom.', color: '#505080' },
  { id: 'locke', x: 180, y: 440, label: 'Locke', era: '1632-1704', core: 'Natural rights precede government. Consent of the governed. Right of revolution.', color: '#408060' },
];

const THINKER_EDGES = [
  { from: 'plato', to: 'aristotle', label: 'Student critiques teacher', detail: 'Aristotle rejects Plato\'s ideal Forms. "Plato is dear to me, but dearer still is truth." Moves from abstract idealism to empirical observation.' },
  { from: 'plato', to: 'aquinas', label: 'Christianized Platonism', detail: 'Aquinas synthesizes Platonic idealism with Christian theology via Augustine. The Forms become divine archetypes.' },
  { from: 'aristotle', to: 'aquinas', label: 'Aristotelian framework baptized', detail: 'Aquinas recovers Aristotle\'s logic and natural philosophy for Christian thought. The Summa Theologica is structured as Aristotelian syllogism.' },
  { from: 'aquinas', to: 'machiavelli', label: 'Rejection of natural law', detail: 'Machiavelli breaks with the Thomistic tradition entirely. Politics is not about virtue or divine order \— it is about effectual truth and maintaining power.' },
  { from: 'aquinas', to: 'hobbes', label: 'Secularized natural law', detail: 'Hobbes takes the natural law framework but strips it of theological content. The law of nature becomes self-preservation, not divine command.' },
  { from: 'machiavelli', to: 'hobbes', label: 'Both reject classical virtue', detail: 'Hobbes shares Machiavelli\'s realism but systematizes it. Where Machiavelli advises princes, Hobbes builds a complete theory of sovereignty.' },
  { from: 'hobbes', to: 'locke', label: 'Same starting point, opposite conclusion', detail: 'Both begin with state of nature. Hobbes: life is nasty and brutish \→ absolute sovereign. Locke: humans are rational \→ limited government with consent. The divergence defines modern politics.' },
  { from: 'machiavelli', to: 'locke', label: 'Power constrained by rights', detail: 'Locke accepts Machiavelli\'s insight that politics involves power, but insists power must be constrained by natural rights and consent.' },
];

const TRACE_ARGUMENTS = [
  { id: 'liberty', label: 'Liberty', path: ['plato', 'aquinas', 'locke'], color: '#408060', description: 'The concept of liberty evolves from Plato\'s freedom through knowledge of the Good, through Aquinas\'s natural law that grounds human dignity, to Locke\'s natural rights that government exists to protect. Each thinker transforms what "freedom" means.' },
  { id: 'power', label: 'Power', path: ['plato', 'machiavelli', 'hobbes'], color: '#c04040', description: 'Power begins as Plato\'s philosopher-king exercising wisdom for the city\'s good. Machiavelli strips power of moral pretense: it is about effectiveness. Hobbes systematizes: absolute sovereign power is the only alternative to anarchy.' },
  { id: 'justice', label: 'Justice', path: ['aristotle', 'aquinas', 'hobbes', 'locke'], color: '#6080a0', description: 'Justice transforms from Aristotle\'s virtue of giving each their due, through Aquinas\'s universal natural law accessible to reason, to Hobbes\'s justice as covenant-keeping under sovereign authority, to Locke\'s justice as protection of natural rights through consent.' },
];

// ── Scholarly Micro-Content Tooltips ─────────────────────────────────
const WESTERN_TIPS = {
  cave_allegory: "Plato's Cave allegory (Republic, Book VII) is not merely about ignorance \u2014 it is about the violent resistance to enlightenment. The freed prisoner who returns to the cave to tell others about the sun is met with hostility and threats of death. Plato is warning that truth-tellers face persecution, not gratitude. The allegory is often taught as an epistemological parable, but its political implication is darker: democratic publics actively resist being told that their beliefs are shadows. Socrates himself was executed for exactly this offense. The allegory is not abstract philosophy \u2014 it is Plato processing his teacher's murder.",
  machiavelli_misread: "Machiavelli is routinely misread as advocating amorality in politics. The Prince (1513) was a job application to the Medici family \u2014 a practical manual written by an exiled Florentine diplomat trying to return to power after being imprisoned and tortured. His far more substantial Discourses on Livy reveals a committed republican who believed mixed government (combining monarchical, aristocratic, and democratic elements) was superior to principality. Reading only The Prince and concluding that Machiavelli endorsed tyranny is like reading only a cover letter and concluding you know the applicant's entire worldview.",
  social_contract: "The social contract tradition \u2014 Hobbes, Locke, Rousseau \u2014 is not a historical claim that people actually gathered and signed a contract to form society. It is a thought experiment asking: what would rational people agree to if they were designing political institutions from scratch? The power of the concept is that it makes political authority conditional on performance rather than divine right. If the government fails to fulfill the terms of the hypothetical contract, the people retain the right to revoke their consent. This idea \u2014 that legitimate authority requires ongoing justification \u2014 is the foundation of every modern democratic constitution.",
};

// ── Component ───────────────────────────────────────────────────────────
function WesternView({ setView }) {
  const [mode, setMode] = useState('dialogue');
  const [selectedThinker, setSelectedThinker] = useState(0);
  const [expandedDebate, setExpandedDebate] = useState(null);
  const [expandedLegacy, setExpandedLegacy] = useState(null);
  const [revealedThinkers, setRevealedThinkers] = useState({});
  const [graphSelectedEdge, setGraphSelectedEdge] = useState(null);
  const [graphSelectedNode, setGraphSelectedNode] = useState(null);
  const [graphActiveTrace, setGraphActiveTrace] = useState(null);
  const [tipId, setTipId] = useState(null);
  const [applyDilemma, setApplyDilemma] = useState(0);
  const [applyVotes, setApplyVotes] = useState({});
  const [lineageConcept, setLineageConcept] = useState(null);
  const topRef = useRef(null);

  // ── Scholarly Micro-Icons & Tooltip ──────────────────────────
  function Tip({ id }) {
    if (tipId !== id || !WESTERN_TIPS[id]) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(240,238,232,.92)', border: '1px solid ' + C.accent + '25', borderRadius: 3, maxWidth: 440, fontSize: 11, fontFamily: Mono, color: C.tx2, lineHeight: 1.65, margin: '6px 0 10px' }}>
        {WESTERN_TIPS[id]}
      </div>
    );
  }

  const CaveIcon = () => (
    <svg width="24" height="20" viewBox="0 0 24 20" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='cave_allegory'?null:'cave_allegory')}>
      <path d="M2 18 Q4 4 12 2 Q20 4 22 18" fill="none" stroke="currentColor" strokeWidth=".8"/>
      <line x1="2" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth=".8"/>
      <circle cx="12" cy="6" r="2" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth=".5"/>
      <line x1="12" y1="8" x2="8" y2="14" stroke="currentColor" strokeWidth=".4" strokeDasharray="1 1"/>
      <line x1="12" y1="8" x2="16" y2="14" stroke="currentColor" strokeWidth=".4" strokeDasharray="1 1"/>
    </svg>
  );

  const PrinceIcon = () => (
    <svg width="20" height="24" viewBox="0 0 20 24" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='machiavelli_misread'?null:'machiavelli_misread')}>
      <path d="M6 4 L10 2 L14 4 L14 8 L10 10 L6 8 Z" fill="none" stroke="currentColor" strokeWidth=".7"/>
      <path d="M4 10 L10 10 L10 22 L4 22 Z" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <path d="M10 10 L16 10 L16 22 L10 22 Z" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <line x1="6" y1="14" x2="8" y2="14" stroke="currentColor" strokeWidth=".3"/>
      <line x1="6" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth=".3"/>
    </svg>
  );

  const ContractIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{cursor:'pointer',opacity:0.3,flexShrink:0}} onClick={()=>setTipId(tipId==='social_contract'?null:'social_contract')}>
      <circle cx="7" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <circle cx="15" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <path d="M5 14 L17 14 L19 20 L3 20 Z" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <line x1="11" y1="14" x2="11" y2="20" stroke="currentColor" strokeWidth=".4" strokeDasharray="1 1"/>
    </svg>
  );

  const toggleReveal = useCallback((id) => {
    setRevealedThinkers(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleDebate = useCallback((id) => {
    setExpandedDebate(prev => prev === id ? null : id);
  }, []);

  const toggleLegacy = useCallback((id) => {
    setExpandedLegacy(prev => prev === id ? null : id);
  }, []);

  const revealedCount = useMemo(
    () => Object.values(revealedThinkers).filter(Boolean).length,
    [revealedThinkers],
  );

  // ── Mode Switch ─────────────────────────────────────────────────────
  const ModeSwitch = useCallback(() => {
    const modes = [
      { id: 'dialogue', label: 'Dialogue', desc: '6 Thinkers, Chronological' },
      { id: 'debates', label: 'Debates', desc: '5 Key Questions' },
      { id: 'legacy', label: 'Legacy', desc: 'Modern Relevance' },
      { id: 'graph', label: 'Graph', desc: 'Intellectual Lineage' },
      { id: 'apply', label: 'Apply', desc: 'Modern Dilemmas' },
      { id: 'lineage', label: 'Lineage', desc: 'Concept Genealogy' },
    ];
    return (
      <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1, padding: '10px 12px', borderRadius: 4, cursor: 'pointer',
              background: mode === m.id ? C.accentBg : 'transparent',
              border: mode === m.id ? '1px solid ' + C.accentDm : '1px solid ' + C.line,
              textAlign: 'center', transition: 'all .15s ease',
            }}
          >
            <span style={{
              fontFamily: Mono, fontSize: 11, fontWeight: 600,
              color: mode === m.id ? C.accent : C.tx3, display: 'block',
            }}>
              {m.label}
            </span>
            <span style={{ fontFamily: Sans, fontSize: 11, color: C.tx3 }}>{m.desc}</span>
          </button>
        ))}
      </div>
    );
  }, [mode]);

  // ── Dialogue Renderer ───────────────────────────────────────────────
  const renderDialogue = useCallback(() => {
    const t = THINKERS[selectedThinker];
    const isRevealed = revealedThinkers[t.id];
    return (
      <div>
        {/* Thinker selector */}
        <div style={{
          display: 'flex', gap: 3, marginBottom: 20, overflowX: 'auto',
          paddingBottom: 4,
        }}>
          {THINKERS.map((th, i) => (
            <button
              key={th.id}
              onClick={() => setSelectedThinker(i)}
              style={{
                flex: '0 0 auto', padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
                background: i === selectedThinker ? C.accentBg : 'transparent',
                border: i === selectedThinker
                  ? '1px solid ' + C.accentDm
                  : '1px solid ' + C.line,
                transition: 'all .12s ease', whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 12, fontWeight: 600,
                color: i === selectedThinker ? C.accent : C.tx3,
                display: 'block',
              }}>
                {th.num}. {th.name}
              </span>
              <span style={{
                fontFamily: Sans, fontSize: 10.5, color: C.tx3,
              }}>
                {th.dates}
              </span>
            </button>
          ))}
        </div>

        {/* Thinker card */}
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 10, overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid ' + C.line }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
              <span style={{
                fontSize: 26, width: 48, height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: C.accentBg, borderRadius: 8,
                border: '1px solid ' + C.line, flexShrink: 0,
              }}>
                {t.icon}
              </span>
              <div>
                <div style={{
                  fontFamily: Serif, fontSize: 22, fontWeight: 700,
                  color: C.tx, letterSpacing: '-.02em',
                }}>
                  {t.name}
                </div>
                <div style={{
                  fontFamily: Mono, fontSize: 12, color: C.tx3, letterSpacing: '.04em',
                }}>
                  {t.dates} {'\—'} {t.era}
                </div>
              </div>
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 15, color: C.accent, fontStyle: 'italic',
            }}>
              {t.subtitle}
            </div>
          </div>

          {/* Core argument */}
          <div style={{ padding: '20px 24px' }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.accentDm, marginBottom: 8,
            }}>
              CORE ARGUMENT
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
              marginBottom: 20,
            }}>
              {t.coreArgument}
            </div>

            {/* Historical context */}
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.tx3, marginBottom: 8,
            }}>
              HISTORICAL CONTEXT
            </div>
            <div style={{
              fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.7,
              marginBottom: 20,
            }}>
              {t.historicalContext}
            </div>

            {/* Responds to predecessors — reveal toggle */}
            <button
              onClick={() => toggleReveal(t.id)}
              style={{
                width: '100%', padding: '14px 18px', borderRadius: 6, cursor: 'pointer',
                background: isRevealed ? C.accentBg : 'transparent',
                border: '1px solid ' + (isRevealed ? C.accentDm : C.line),
                textAlign: 'left', marginBottom: 16,
                transition: 'all .15s ease',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
                color: isRevealed ? C.accent : C.tx3,
              }}>
                {isRevealed ? '\▼' : '\u25B6'} RESPONDS TO PREDECESSORS
              </span>
            </button>

            {isRevealed && (
              <div style={{
                background: C.accentBg, borderRadius: 8, padding: '16px 20px',
                border: '1px solid ' + C.line, marginBottom: 20,
              }}>
                <div style={{
                  fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
                }}>
                  {t.respondsTo}
                </div>
              </div>
            )}

            {/* Modern relevance */}
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.tx3, marginBottom: 8,
            }}>
              MODERN RELEVANCE
            </div>
            <div style={{
              fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.7,
              marginBottom: 20,
            }}>
              {t.modernRelevance}
            </div>

            {/* Key quote */}
            <div style={{
              background: 'rgba(128,112,80,.05)', borderRadius: 6,
              padding: '14px 18px', borderLeft: '3px solid ' + C.accent,
              marginBottom: 16,
            }}>
              <div style={{
                fontFamily: Serif, fontSize: 14, color: C.gold,
                lineHeight: 1.7, fontStyle: 'italic', marginBottom: 6,
              }}>
                {t.keyQuote}
              </div>
              <div style={{
                fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: '.04em',
              }}>
                {'\—'} {t.quoteSource}
              </div>
            </div>

            {/* Key texts */}
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.tx3, marginBottom: 6,
            }}>
              KEY TEXTS
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {t.keyTexts.map(text => (
                <span key={text} style={{
                  fontFamily: Sans, fontSize: 11, padding: '3px 10px', borderRadius: 3,
                  background: C.accentBg, color: C.tx2, letterSpacing: '.02em',
                  border: '1px solid ' + C.line,
                }}>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 16,
        }}>
          <button
            onClick={() => setSelectedThinker(Math.max(0, selectedThinker - 1))}
            disabled={selectedThinker === 0}
            style={{
              padding: '8px 16px', borderRadius: 4, cursor: selectedThinker === 0 ? 'default' : 'pointer',
              background: 'transparent', border: '1px solid ' + C.line,
              color: selectedThinker === 0 ? C.tx3 : C.tx2,
              fontFamily: Mono, fontSize: 11, opacity: selectedThinker === 0 ? 0.4 : 1,
            }}
          >
            {'\←'} {selectedThinker > 0 ? THINKERS[selectedThinker - 1].name : 'Previous'}
          </button>
          <button
            onClick={() => setSelectedThinker(Math.min(5, selectedThinker + 1))}
            disabled={selectedThinker === 5}
            style={{
              padding: '8px 16px', borderRadius: 4, cursor: selectedThinker === 5 ? 'default' : 'pointer',
              background: 'transparent', border: '1px solid ' + C.line,
              color: selectedThinker === 5 ? C.tx3 : C.tx2,
              fontFamily: Mono, fontSize: 11, opacity: selectedThinker === 5 ? 0.4 : 1,
            }}
          >
            {selectedThinker < 5 ? THINKERS[selectedThinker + 1].name : 'Next'} {'\→'}
          </button>
        </div>
      </div>
    );
  }, [selectedThinker, revealedThinkers, toggleReveal]);

  // ── Debates Renderer ────────────────────────────────────────────────
  const renderDebates = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          PAIRED DEBATES {'\—'} ENDURING QUESTIONS OF POLITICAL PHILOSOPHY
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          Each debate pairs two thinkers on a question that has defined Western political thought for centuries. These are not historical curiosities {'\—'} they are live arguments that recur in every generation, in every polity, in every crisis.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <PrinceIcon /><Tip id="machiavelli_misread" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {DEBATES.map(d => {
            const isOpen = expandedDebate === d.id;
            return (
              <div
                key={d.id}
                style={{
                  background: C.card,
                  border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
                  borderRadius: 8, overflow: 'hidden',
                  transition: 'border-color .15s ease',
                }}
              >
                <button
                  onClick={() => toggleDebate(d.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 18, width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.accentBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                    fontFamily: Mono, color: C.accent,
                  }}>
                    ?
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 15, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {d.question}
                    </div>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, color: C.tx3,
                      letterSpacing: '.04em', marginTop: 2,
                    }}>
                      {d.side1.thinker} vs. {d.side2.thinker}
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
                    {/* Side 1 */}
                    <div style={{
                      background: C.blueBg, borderRadius: 6, padding: '14px 16px',
                      border: '1px solid ' + C.line, marginBottom: 10,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.blueDm, marginBottom: 6,
                      }}>
                        {d.side1.thinker.toUpperCase()}
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7,
                      }}>
                        {d.side1.position}
                      </div>
                    </div>

                    {/* Side 2 */}
                    <div style={{
                      background: C.redBg, borderRadius: 6, padding: '14px 16px',
                      border: '1px solid ' + C.line, marginBottom: 16,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.redDm, marginBottom: 6,
                      }}>
                        {d.side2.thinker.toUpperCase()}
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7,
                      }}>
                        {d.side2.position}
                      </div>
                    </div>

                    {/* Enduring tension */}
                    <div style={{
                      background: C.accentBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.accentDm, marginBottom: 6,
                      }}>
                        ENDURING TENSION
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.gold, lineHeight: 1.7,
                      }}>
                        {d.tension}
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
  }, [expandedDebate, toggleDebate]);

  // ── Legacy Renderer ─────────────────────────────────────────────────
  const renderLegacy = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          LEGACY {'\—'} LIVING TRADITIONS IN MODERN POLITICS
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          These six thinkers did not merely describe politics {'\—'} they created the conceptual vocabulary through which modern political life is understood, debated, and contested. Every constitutional provision, every rights claim, every realist calculation speaks their language.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
          <ContractIcon /><Tip id="social_contract" />
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
                      {item.trace}
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
                      MODERN EXAMPLES
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 8px' }}>
                      {item.modernExamples.map((ex, i) => (
                        <li key={i} style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx2,
                          lineHeight: 1.65, padding: '4px 0 4px 16px',
                          borderLeft: '2px solid ' + C.line,
                          marginBottom: 4,
                        }}>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [expandedLegacy, toggleLegacy]);

  // ── Graph Renderer (SVG Dialogue Flow) ─────────────────────────────
  const renderGraph = useCallback(() => {
    const nodeById = {};
    THINKER_NODES.forEach(n => { nodeById[n.id] = n; });

    // Determine which edges are highlighted
    const isEdgeHighlighted = (edge) => {
      if (graphActiveTrace) {
        const trace = TRACE_ARGUMENTS.find(t => t.id === graphActiveTrace);
        if (trace) {
          for (let i = 0; i < trace.path.length - 1; i++) {
            if (edge.from === trace.path[i] && edge.to === trace.path[i + 1]) return true;
          }
        }
        return false;
      }
      if (graphSelectedNode) {
        return edge.from === graphSelectedNode || edge.to === graphSelectedNode;
      }
      if (graphSelectedEdge !== null) {
        return THINKER_EDGES.indexOf(edge) === graphSelectedEdge;
      }
      return false;
    };

    const isNodeHighlighted = (node) => {
      if (graphActiveTrace) {
        const trace = TRACE_ARGUMENTS.find(t => t.id === graphActiveTrace);
        return trace ? trace.path.includes(node.id) : false;
      }
      if (graphSelectedNode) return node.id === graphSelectedNode;
      if (graphSelectedEdge !== null) {
        const e = THINKER_EDGES[graphSelectedEdge];
        return e && (e.from === node.id || e.to === node.id);
      }
      return false;
    };

    // Compute bezier control point for an edge
    const getEdgePath = (edge) => {
      const from = nodeById[edge.from];
      const to = nodeById[edge.to];
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2;
      // Offset control point perpendicular to the edge
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const offset = 30;
      const cpx = mx + nx * offset;
      const cpy = my + ny * offset;
      return { path: 'M ' + from.x + ' ' + from.y + ' Q ' + cpx + ' ' + cpy + ' ' + to.x + ' ' + to.y, cpx, cpy, mx, my };
    };

    // Compute arrow position at end of edge (slightly before the node circle)
    const getArrowPos = (edge) => {
      const from = nodeById[edge.from];
      const to = nodeById[edge.to];
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const t = 35 / len; // offset by node radius
      return { x: to.x - dx * t, y: to.y - dy * t };
    };

    const activeTrace = graphActiveTrace ? TRACE_ARGUMENTS.find(t => t.id === graphActiveTrace) : null;
    const activeEdge = graphSelectedEdge !== null ? THINKER_EDGES[graphSelectedEdge] : null;

    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          INTELLECTUAL LINEAGE {'\—'} A CONVERSATION ACROSS CENTURIES
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          Each thinker is a node. Each edge is an intellectual response {'\—'} a critique, a synthesis, or a transformation. Click edges to see how ideas travel between minds. Click nodes to highlight all their connections.
        </div>

        {/* Trace Argument buttons */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: '.06em', alignSelf: 'center', marginRight: 4 }}>TRACE:</span>
          {TRACE_ARGUMENTS.map(tr => {
            const active = graphActiveTrace === tr.id;
            return (
              <button key={tr.id} onClick={() => { setGraphActiveTrace(active ? null : tr.id); setGraphSelectedEdge(null); setGraphSelectedNode(null); }} style={{
                padding: '5px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontFamily: Mono,
                background: active ? tr.color + '22' : 'transparent',
                color: active ? tr.color : C.tx3,
                border: '1px solid ' + (active ? tr.color + '66' : C.line),
                fontWeight: active ? 600 : 400, transition: 'all .15s',
              }}>
                {tr.label}
              </button>
            );
          })}
          {(graphActiveTrace || graphSelectedEdge !== null || graphSelectedNode) && (
            <button onClick={() => { setGraphActiveTrace(null); setGraphSelectedEdge(null); setGraphSelectedNode(null); }} style={{
              padding: '5px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontFamily: Mono,
              background: 'transparent', color: C.tx3, border: '1px solid ' + C.line,
            }}>
              Clear
            </button>
          )}
        </div>

        {/* SVG Graph */}
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 10, padding: 16, overflow: 'hidden',
        }}>
          <svg viewBox="0 0 380 520" style={{ width: '100%', maxWidth: 520, display: 'block', margin: '0 auto' }}>
            {/* Defs for arrow markers */}
            <defs>
              <marker id="arrowGold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill={C.gold} />
              </marker>
              <marker id="arrowDim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill={C.tx3} />
              </marker>
              {TRACE_ARGUMENTS.map(tr => (
                React.createElement('marker', { key: 'arrow-' + tr.id, id: 'arrow-' + tr.id, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse' },
                  React.createElement('path', { d: 'M 0 0 L 10 5 L 0 10 Z', fill: tr.color })
                )
              ))}
            </defs>

            {/* Era bands */}
            <rect x="0" y="40" width="380" height="80" fill="rgba(128,112,80,.03)" rx="4" />
            <rect x="0" y="160" width="380" height="80" fill="rgba(128,112,80,.03)" rx="4" />
            <rect x="0" y="280" width="380" height="80" fill="rgba(128,112,80,.03)" rx="4" />
            <rect x="0" y="400" width="380" height="80" fill="rgba(128,112,80,.03)" rx="4" />
            <text x="370" y="56" fill={C.tx3} fontSize="7" fontFamily={Mono} textAnchor="end" opacity="0.5">CLASSICAL</text>
            <text x="370" y="176" fill={C.tx3} fontSize="7" fontFamily={Mono} textAnchor="end" opacity="0.5">MEDIEVAL</text>
            <text x="370" y="296" fill={C.tx3} fontSize="7" fontFamily={Mono} textAnchor="end" opacity="0.5">EARLY MODERN</text>
            <text x="370" y="416" fill={C.tx3} fontSize="7" fontFamily={Mono} textAnchor="end" opacity="0.5">ENLIGHTENMENT</text>

            {/* Edges */}
            {THINKER_EDGES.map((edge, idx) => {
              const ep = getEdgePath(edge);
              const highlighted = isEdgeHighlighted(edge);
              const traceColor = graphActiveTrace ? TRACE_ARGUMENTS.find(t => t.id === graphActiveTrace)?.color : null;
              const edgeColor = highlighted ? (traceColor || C.gold) : C.tx3;
              const markerId = highlighted ? (graphActiveTrace ? 'arrow-' + graphActiveTrace : 'arrowGold') : 'arrowDim';
              const anyActive = graphActiveTrace || graphSelectedEdge !== null || graphSelectedNode;
              return React.createElement('g', { key: 'edge-' + idx, style: { cursor: 'pointer' }, onClick: (e) => { e.stopPropagation(); setGraphSelectedEdge(graphSelectedEdge === idx ? null : idx); setGraphSelectedNode(null); setGraphActiveTrace(null); } },
                React.createElement('path', {
                  d: ep.path, fill: 'none', stroke: edgeColor,
                  strokeWidth: highlighted ? 2.5 : 1.2,
                  opacity: anyActive ? (highlighted ? 0.9 : 0.15) : 0.4,
                  markerEnd: 'url(#' + markerId + ')',
                  style: { transition: 'all .2s ease' },
                }),
                // Invisible wider path for easier clicking
                React.createElement('path', {
                  d: ep.path, fill: 'none', stroke: 'transparent', strokeWidth: 12,
                }),
                // Edge label on highlighted
                highlighted && React.createElement('text', {
                  x: ep.cpx, y: ep.cpy - 6, fill: edgeColor, fontSize: 10.5, fontFamily: Mono,
                  textAnchor: 'middle', letterSpacing: '.03em',
                }, edge.label)
              );
            })}

            {/* Nodes */}
            {THINKER_NODES.map(node => {
              const highlighted = isNodeHighlighted(node);
              const anyActive = graphActiveTrace || graphSelectedEdge !== null || graphSelectedNode;
              const traceColor = graphActiveTrace ? TRACE_ARGUMENTS.find(t => t.id === graphActiveTrace)?.color : null;
              const fillColor = highlighted ? (traceColor || node.color) : node.color;
              return React.createElement('g', {
                key: 'node-' + node.id,
                style: { cursor: 'pointer' },
                onClick: (e) => { e.stopPropagation(); setGraphSelectedNode(graphSelectedNode === node.id ? null : node.id); setGraphSelectedEdge(null); setGraphActiveTrace(null); },
              },
                React.createElement('circle', {
                  cx: node.x, cy: node.y, r: 35,
                  fill: fillColor + '18', stroke: fillColor,
                  strokeWidth: highlighted ? 2.5 : 1.5,
                  opacity: anyActive ? (highlighted ? 1 : 0.25) : 0.8,
                  style: { transition: 'all .2s ease' },
                }),
                React.createElement('text', {
                  x: node.x, y: node.y - 6, fill: anyActive ? (highlighted ? C.tx : C.tx3) : C.tx,
                  fontSize: 11, fontFamily: Serif, fontWeight: 600, textAnchor: 'middle',
                  opacity: anyActive ? (highlighted ? 1 : 0.3) : 1,
                  style: { transition: 'opacity .2s ease' },
                }, node.label),
                React.createElement('text', {
                  x: node.x, y: node.y + 8, fill: anyActive ? (highlighted ? C.tx2 : C.tx3) : C.tx3,
                  fontSize: 10.5, fontFamily: Mono, textAnchor: 'middle',
                  opacity: anyActive ? (highlighted ? 0.8 : 0.2) : 0.6,
                  style: { transition: 'opacity .2s ease' },
                }, node.era)
              );
            })}
          </svg>
        </div>

        {/* Detail panel below map */}
        {activeTrace && (
          <div style={{
            background: activeTrace.color + '0a', borderRadius: 8, padding: '14px 18px',
            border: '1px solid ' + activeTrace.color + '33', marginTop: 12,
          }}>
            <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: activeTrace.color, marginBottom: 6 }}>
              TRACING: {activeTrace.label.toUpperCase()}
            </div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {activeTrace.path.map((nodeId, i) => {
                const n = nodeById[nodeId];
                return React.createElement(React.Fragment, { key: nodeId },
                  React.createElement('span', { style: { fontFamily: Serif, fontSize: 13, color: C.tx, fontWeight: 600 } }, n.label),
                  i < activeTrace.path.length - 1 && React.createElement('span', { style: { fontFamily: Mono, fontSize: 11, color: activeTrace.color, margin: '0 2px' } }, '\→')
                );
              })}
            </div>
            <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.75 }}>
              {activeTrace.description}
            </div>
          </div>
        )}

        {activeEdge && !graphActiveTrace && (
          <div style={{
            background: C.accentBg, borderRadius: 8, padding: '14px 18px',
            border: '1px solid ' + C.line, marginTop: 12,
          }}>
            <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.accentDm, marginBottom: 6 }}>
              {nodeById[activeEdge.from].label.toUpperCase()} {'\→'} {nodeById[activeEdge.to].label.toUpperCase()}
            </div>
            <div style={{ fontFamily: Serif, fontSize: 14, color: C.gold, marginBottom: 8, fontWeight: 600 }}>
              {activeEdge.label}
            </div>
            <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75 }}>
              {activeEdge.detail}
            </div>
          </div>
        )}

        {graphSelectedNode && !graphActiveTrace && graphSelectedEdge === null && (() => {
          const node = nodeById[graphSelectedNode];
          const incoming = THINKER_EDGES.filter(e => e.to === graphSelectedNode);
          const outgoing = THINKER_EDGES.filter(e => e.from === graphSelectedNode);
          return (
            <div style={{
              background: node.color + '0a', borderRadius: 8, padding: '14px 18px',
              border: '1px solid ' + node.color + '33', marginTop: 12,
            }}>
              <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: node.color, marginBottom: 6 }}>
                {node.label.toUpperCase()} ({node.era})
              </div>
              <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.7, marginBottom: 12 }}>
                {node.core}
              </div>
              {incoming.length > 0 && (
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, letterSpacing: '.06em' }}>INFLUENCED BY: </span>
                  {incoming.map((e, i) => (
                    React.createElement('span', { key: i, style: { fontFamily: Sans, fontSize: 11, color: C.tx2 } },
                      (i > 0 ? ', ' : '') + nodeById[e.from].label + ' (' + e.label + ')'
                    )
                  ))}
                </div>
              )}
              {outgoing.length > 0 && (
                <div>
                  <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, letterSpacing: '.06em' }}>INFLUENCED: </span>
                  {outgoing.map((e, i) => (
                    React.createElement('span', { key: i, style: { fontFamily: Sans, fontSize: 11, color: C.tx2 } },
                      (i > 0 ? ', ' : '') + nodeById[e.to].label + ' (' + e.label + ')'
                    )
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>
    );
  }, [graphSelectedEdge, graphSelectedNode, graphActiveTrace]);

  // ── Apply Philosophy to Modern Dilemma ─────────────────────────────
  const APPLY_DILEMMAS = useMemo(() => [
    {
      id: 'surveillance', title: 'AI Mass Surveillance',
      scenario: 'A democratic government proposes deploying AI-powered facial recognition across all public spaces, arguing it will reduce violent crime by 40%. Civil liberties organizations warn this creates a permanent panopticon. The technology has a 2% false positive rate, disproportionately affecting minority populations.',
      responses: [
        { thinker: 'Plato', position: 'If the surveillance is administered by those who genuinely know the Good \u2014 philosopher-guardians who use data wisely \u2014 it could serve justice. The real question is not whether to surveil but whether the rulers possess wisdom. The guardians in the Republic already live under complete transparency; why not extend this to the city? But if ignorant demagogues control the system, it becomes a tool of the Cave, deepening illusion rather than revealing truth.' },
        { thinker: 'Aristotle', position: 'This is a question of the mean between extremes. Total surveillance is excess (tyranny); zero surveillance is deficiency (chaos). The virtuous policy employs targeted, proportionate monitoring with judicial oversight. The 2% false positive rate reveals a practical defect: the system fails the test of equity (epieikeia). A just policy must account for differential impact on communities.' },
        { thinker: 'Aquinas', position: 'Human law must serve the common good and conform to natural law, which protects human dignity. Surveillance that treats persons as objects to be monitored rather than rational agents with inherent dignity violates natural law regardless of its utilitarian benefits. However, if the surveillance is genuinely directed toward the common good and includes proportionate safeguards, it may be permissible under the principle of double effect \u2014 the intended good (safety) may justify the unintended side effect (privacy loss).' },
        { thinker: 'Machiavelli', position: 'The effective ruler asks: does this work? If AI surveillance actually reduces crime by 40%, the prince who refuses to deploy it is responsible for the preventable violence. The 2% false positive rate is a political problem, not a moral one \u2014 manage it through targeted compensation and public messaging. The real danger is not surveillance itself but being perceived as tyrannical. Deploy it quietly, incrementally, and ensure the benefits are visible.' },
        { thinker: 'Hobbes', position: 'The sovereign\'s primary obligation is the security of the commonwealth. In the state of nature, there is no privacy \u2014 only fear. Subjects surrendered their natural liberty precisely to obtain the security that surveillance provides. Those who protest surveillance while demanding safety contradict themselves. The sovereign must have the power to watch, or the Leviathan is blind.' },
        { thinker: 'Locke', position: 'Government exists to protect natural rights, including the right to be free from arbitrary interference. Mass surveillance without individual suspicion violates the social contract. No rational person would consent to permanent monitoring as a condition of citizenship. The 2% false positive rate means thousands of innocent people will be wrongly flagged \u2014 a violation of due process. If the government deploys this, the people retain the right to resist.' },
      ],
    },
    {
      id: 'inequality', title: 'Extreme Wealth Inequality',
      scenario: 'A nation\'s top 0.1% owns more wealth than the bottom 50%. Social mobility has declined for three decades. A proposed wealth tax of 2% annually on assets above $50 million would fund universal healthcare and education. Opponents argue it violates property rights, will trigger capital flight, and punishes success.',
      responses: [
        { thinker: 'Plato', position: 'Extreme wealth inequality is a symptom of a diseased city \u2014 one ruled by appetite rather than reason. In the Republic, guardians own no property at all, because wealth corrupts judgment. The wealthy who oppose redistribution are prisoners in Plato\'s Cave, mistaking accumulation for the Good. A philosopher-ruler would redistribute not out of envy but because concentrated wealth prevents citizens from pursuing the virtuous life.' },
        { thinker: 'Aristotle', position: 'The middle class is the anchor of a stable polity. When wealth concentrates at the extremes, the city splits into two hostile factions \u2014 the rich who fear expropriation and the poor who desire it. This is the path to revolution or tyranny. A moderate wealth tax that strengthens the middle class serves political stability and the common good. Property rights are important but not absolute \u2014 they exist to serve the polis, not the reverse.' },
        { thinker: 'Aquinas', position: 'Private property is legitimate under natural law, but it carries a social obligation. Aquinas argues (following Aristotle) that private ownership is permissible for incentive and stewardship reasons, but the use of property must serve the common good. In extreme necessity, taking from the wealthy to feed the starving is not theft \u2014 it is justice. A wealth tax that funds basic human needs (health, education) conforms to the natural law requirement that goods ultimately serve all.' },
        { thinker: 'Machiavelli', position: 'The prince must keep the people satisfied and the nobles manageable. Extreme inequality breeds the dangerous kind of discontent that produces revolution. But confiscating wealth from the powerful creates determined enemies. The effective ruler taxes just enough to fund popular programs (bread and circuses) while keeping the wealthy class aligned through favorable trade policies. Never make the mistake of being both hated by the rich and untrusted by the poor.' },
        { thinker: 'Hobbes', position: 'The sovereign\'s power includes the right to tax as necessary to maintain the commonwealth. There is no natural right to property that precedes the sovereign \u2014 property exists only because the Leviathan enforces it. If extreme inequality threatens civil peace, the sovereign may redistribute to prevent the return of the state of nature. Capital flight is a form of rebellion against sovereign authority.' },
        { thinker: 'Locke', position: 'Property is a natural right created when individuals mix their labor with nature. Taxation requires consent through legitimate legislative process. A democratically enacted wealth tax is legitimate if it serves the public good and follows due process. But Locke also argues that property rights have a natural limit: no one may claim more than they can use while others lack basic necessities. The question is whether $50 million exceeds Locke\'s sufficiency condition.' },
      ],
    },
    {
      id: 'disobedience', title: 'Climate Civil Disobedience',
      scenario: 'Climate activists block major highways, disrupt oil company operations, and vandalize SUV dealerships to protest government inaction on climate change. They argue the democratic process has failed: despite scientific consensus, governments continue subsidizing fossil fuels. Their actions are illegal but nonviolent (against property, not persons).',
      responses: [
        { thinker: 'Plato', position: 'Socrates chose to drink the hemlock rather than flee Athens, because violating the city\'s laws \u2014 even unjust ones \u2014 destroys the social order that makes philosophy possible. But Socrates also spent his life challenging the city\'s beliefs. The activists\' error is not their cause but their method: they act from passion rather than reason. True political change requires educating the rulers, not blocking highways. If the democratic process fails, it is because citizens lack wisdom, not because they lack roadblocks.' },
        { thinker: 'Aristotle', position: 'A well-ordered polity has mechanisms for addressing grievances within the constitutional framework. Civil disobedience that circumvents these mechanisms undermines the rule of law, which is the foundation of the good life. However, Aristotle acknowledges that constitutions can become corrupted. If the democratic process has been captured by oligarchic interests (fossil fuel lobbies), the activists may be attempting to restore the proper balance. The question is proportionality: does the disruption serve the common good or merely express frustration?' },
        { thinker: 'Aquinas', position: 'An unjust law is no law at all. If government climate policy violates natural law by knowingly permitting the destruction of creation \u2014 the common heritage of all humanity \u2014 then resistance may be justified. But Aquinas insists that resistance must be proportionate, directed at the unjust law rather than the legal system as a whole, and unlikely to produce greater disorder than the injustice it opposes. Vandalizing dealerships fails this test; peacefully blocking emissions does not necessarily fail it.' },
        { thinker: 'Machiavelli', position: 'The activists should ask: does this work? Do highway blockages actually change government policy, or do they alienate potential supporters and provide the government with a pretext for repression? Machiavelli would counsel strategic calculation: target actions that create political leverage, build coalitions with powerful interests (insurance companies threatened by climate risk, military planners concerned about resource conflicts), and avoid actions that make your cause look disruptive rather than just.' },
        { thinker: 'Hobbes', position: 'Civil disobedience is a step toward the state of nature. Every person who decides which laws to obey based on private judgment undermines the sovereign\'s authority. If climate activists may block highways for their cause, then anti-vaccine activists may block hospitals for theirs. The sovereign alone determines what constitutes the public good. If the democratic process is inadequate, the solution is to improve the sovereign\'s knowledge, not to challenge sovereign authority from below.' },
        { thinker: 'Locke', position: 'The people retain the right to resist when government betrays the trust for which it was established. If government knowingly subsidizes the destruction of the conditions for human life (a right more fundamental than property), it has broken the social contract. Locke would distinguish between property damage (defensible as a form of political expression) and violence against persons (never defensible). The activists are exercising the Lockean right of resistance \u2014 but they must accept legal consequences, as this legitimizes rather than undermines their moral claim.' },
      ],
    },
  ], []);

  const renderApply = useCallback(() => {
    const dilemma = APPLY_DILEMMAS[applyDilemma];
    const votedThinker = applyVotes[dilemma.id];
    const voteCount = Object.keys(applyVotes).length;
    return (
      <div>
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.accentDm, marginBottom: 6 }}>
          APPLY PHILOSOPHY TO MODERN DILEMMA
        </div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 16, maxWidth: 720 }}>
          Three contemporary dilemmas, each analyzed through all six thinkers{'\u2019'} frameworks. These are not guesses about what dead philosophers might say {'\u2014'} they are rigorous applications of documented positions. Read all six, then vote for the most persuasive.
        </div>

        {/* Dilemma selector */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {APPLY_DILEMMAS.map((d, i) => (
            <button key={d.id} onClick={() => setApplyDilemma(i)} style={{
              flex: 1, padding: '10px 12px', borderRadius: 4, cursor: 'pointer',
              background: i === applyDilemma ? C.accentBg : 'transparent',
              border: i === applyDilemma ? '1px solid ' + C.accentDm : '1px solid ' + C.line,
              textAlign: 'center', transition: 'all .15s',
            }}>
              <span style={{ fontFamily: Mono, fontSize: 11, fontWeight: 600, color: i === applyDilemma ? C.accent : C.tx3, display: 'block' }}>{d.title}</span>
            </button>
          ))}
        </div>

        {/* Scenario */}
        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.accentDm, marginBottom: 8 }}>THE DILEMMA</div>
          <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75 }}>{dilemma.scenario}</div>
        </div>

        {/* Thinker responses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {dilemma.responses.map(r => {
            const isVoted = votedThinker === r.thinker;
            const colors = { Plato: '#a08040', Aristotle: '#6080a0', Aquinas: '#a06030', Machiavelli: '#c04040', Hobbes: '#505080', Locke: '#408060' };
            const clr = colors[r.thinker] || C.accent;
            return (
              <div key={r.thinker} style={{
                background: isVoted ? clr + '12' : C.card,
                border: '1px solid ' + (isVoted ? clr + '66' : C.cardBd),
                borderRadius: 8, padding: '16px 20px', transition: 'all .15s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: Mono, fontSize: 12, fontWeight: 600, color: clr, letterSpacing: '.04em' }}>{r.thinker.toUpperCase()}</span>
                  <button onClick={() => setApplyVotes(prev => ({ ...prev, [dilemma.id]: r.thinker }))} style={{
                    padding: '4px 12px', borderRadius: 4, cursor: 'pointer',
                    background: isVoted ? clr + '22' : 'transparent',
                    border: '1px solid ' + (isVoted ? clr : C.line),
                    fontFamily: Mono, fontSize: 10, color: isVoted ? clr : C.tx3,
                    letterSpacing: '.04em',
                  }}>
                    {isVoted ? 'SELECTED' : 'MOST PERSUASIVE'}
                  </button>
                </div>
                <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75 }}>{r.position}</div>
              </div>
            );
          })}
        </div>

        {voteCount > 0 && (
          <div style={{ marginTop: 16, padding: '12px 16px', background: C.accentBg, borderRadius: 6, border: '1px solid ' + C.line }}>
            <span style={{ fontFamily: Mono, fontSize: 11, color: C.accentDm, letterSpacing: '.06em' }}>
              YOUR SELECTIONS: {Object.entries(applyVotes).map(([k, v]) => v).join(', ')} ({voteCount}/3 dilemmas)
            </span>
          </div>
        )}
      </div>
    );
  }, [applyDilemma, applyVotes, APPLY_DILEMMAS]);

  // ── Intellectual Lineage Tracker ──────────────────────────────────
  const LINEAGE_CONCEPTS = useMemo(() => [
    {
      id: 'democracy', name: 'Representative Democracy', modern: 'Elected legislatures, universal suffrage, majority rule with minority rights',
      genealogy: [
        { thinker: 'Aristotle', contribution: 'Classified democracy as a deviant form of polity, but argued the many can collectively possess wisdom exceeding any individual. His mixed constitution (polity) combines democratic and oligarchic elements \u2014 the direct ancestor of representative government.' },
        { thinker: 'Locke', contribution: 'Government by consent of the governed. Legislative supremacy. The right of the majority to bind the minority through elected representatives. The people retain the right to replace a government that fails them.' },
        { thinker: 'Aquinas (indirect)', contribution: 'The principle that law must serve the common good, not the ruler\'s interest, provides a moral foundation for democratic accountability that purely procedural theories lack.' },
      ],
    },
    {
      id: 'social_contract', name: 'Social Contract', modern: 'Constitutions, referendums, the idea that government legitimacy requires popular consent',
      genealogy: [
        { thinker: 'Hobbes', contribution: 'Invented the modern social contract as a thought experiment: rational individuals in a state of nature agree to surrender liberty for security. Government authority is artificial, not natural or divine. This was revolutionary \u2014 it made political authority conditional on performance.' },
        { thinker: 'Locke', contribution: 'Transformed Hobbes\'s absolutist contract into a limited one: people consent to protect pre-existing natural rights. The contract is revocable. Government that violates its terms may be legitimately overthrown. This version directly produced the American and French revolutions.' },
      ],
    },
    {
      id: 'natural_law', name: 'Natural Law / Human Rights', modern: 'Universal Declaration of Human Rights, international humanitarian law, constitutional rights',
      genealogy: [
        { thinker: 'Aquinas', contribution: 'Formalized natural law as rational participation in eternal law. Key insight: moral truths accessible to reason, binding on all humans regardless of culture or faith. "An unjust law is no law at all" \u2014 the foundation of civil disobedience from MLK to Mandela.' },
        { thinker: 'Locke', contribution: 'Secularized natural law into natural rights: life, liberty, property. These rights precede government and cannot be legitimately surrendered. Jefferson\'s Declaration of Independence is almost verbatim Locke.' },
        { thinker: 'Aristotle (indirect)', contribution: 'Natural justice (dikaion physikon) as distinct from conventional justice. The idea that some principles are right everywhere, not just where local law says so.' },
      ],
    },
    {
      id: 'separation', name: 'Separation of Powers', modern: 'Executive, legislative, judicial branches; checks and balances; federalism',
      genealogy: [
        { thinker: 'Locke', contribution: 'Distinguished legislative (supreme), executive (subordinate), and federative (foreign affairs) powers. Insisted that the same persons must not hold legislative and executive power simultaneously. Madison\'s Federalist No. 47 cites Locke and Montesquieu directly.' },
        { thinker: 'Aristotle', contribution: 'Mixed constitution theory: the best practicable regime combines democratic, oligarchic, and monarchical elements so that no single class dominates. This is the conceptual ancestor of institutional checks and balances.' },
        { thinker: 'Montesquieu (via Locke)', contribution: 'Added judicial independence as a distinct power. But Montesquieu was explicitly building on Locke\'s framework and Aristotle\'s mixed constitution.' },
      ],
    },
    {
      id: 'realpolitik', name: 'Realpolitik / Political Realism', modern: 'International relations realism, balance of power, national interest over ideology',
      genealogy: [
        { thinker: 'Machiavelli', contribution: 'Broke politics free from moral philosophy. "The effectual truth of the thing" matters more than "the imagination of it." Power, interest, and strategic calculation \u2014 not virtue or divine mandate \u2014 determine political outcomes. Every realist IR theorist (Morgenthau, Waltz, Mearsheimer) descends from this.' },
        { thinker: 'Hobbes', contribution: 'Extended Machiavelli\'s domestic realism to the international sphere: sovereign states in a state of nature, with no authority above them. International anarchy \u2014 the foundational assumption of structural realism \u2014 is Hobbes\'s state of nature scaled up.' },
        { thinker: 'Thucydides (pre-Machiavelli)', contribution: '"The strong do what they can and the weak suffer what they must." The Melian Dialogue is the ur-text of political realism, 2,000 years before Machiavelli.' },
      ],
    },
    {
      id: 'consent', name: 'Government by Consent', modern: 'Elections, legitimacy crises, revolution, peaceful transfer of power',
      genealogy: [
        { thinker: 'Locke', contribution: 'The foundational argument: legitimate authority requires the consent of the governed. Consent is ongoing, not one-time. Government that loses consent may be lawfully resisted. This is the philosophical engine of every democratic revolution.' },
        { thinker: 'Hobbes', contribution: 'Paradoxically, Hobbes also grounds sovereignty in consent \u2014 but consent driven by fear in the state of nature, and irrevocable once given. Hobbes\'s consent is a one-time deal; Locke\'s is a continuing relationship. The tension between these two versions defines modern debates about emergency powers.' },
        { thinker: 'Aquinas (indirect)', contribution: 'Political authority serves the common good by divine and natural design, but rulers who manifestly violate the common good may be resisted. This provides a theological foundation for consent theory that precedes Hobbes and Locke by centuries.' },
      ],
    },
  ], []);

  const renderLineage = useCallback(() => {
    const selected = lineageConcept ? LINEAGE_CONCEPTS.find(c => c.id === lineageConcept) : null;
    return (
      <div>
        <div style={{ fontFamily: Mono, fontSize: 12, letterSpacing: '.06em', color: C.accentDm, marginBottom: 6 }}>
          INTELLECTUAL LINEAGE TRACKER
        </div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7, marginBottom: 16, maxWidth: 720 }}>
          Every modern political institution traces to specific thinkers in this tradition. Click a concept to see its intellectual genealogy {'\u2014'} which thinkers contributed which ideas, and how ancient arguments became institutional reality.
        </div>

        {/* Concept grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8, marginBottom: 20 }}>
          {LINEAGE_CONCEPTS.map(c => {
            const isActive = lineageConcept === c.id;
            return (
              <button key={c.id} onClick={() => setLineageConcept(isActive ? null : c.id)} style={{
                padding: '14px 16px', borderRadius: 6, cursor: 'pointer', textAlign: 'left',
                background: isActive ? C.accentBg : C.card,
                border: '1px solid ' + (isActive ? C.accentDm : C.cardBd),
                transition: 'all .15s',
              }}>
                <div style={{ fontFamily: Serif, fontSize: 14, fontWeight: 600, color: isActive ? C.accent : C.tx, marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontFamily: Sans, fontSize: 11, color: C.tx3, lineHeight: 1.5 }}>{c.modern}</div>
              </button>
            );
          })}
        </div>

        {/* Genealogy detail */}
        {selected && (
          <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid ' + C.line }}>
              <div style={{ fontFamily: Serif, fontSize: 20, fontWeight: 700, color: C.tx, marginBottom: 4 }}>{selected.name}</div>
              <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>Modern form: {selected.modern}</div>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ fontFamily: Mono, fontSize: 11, letterSpacing: '.06em', color: C.accentDm, marginBottom: 12 }}>INTELLECTUAL GENEALOGY</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {selected.genealogy.map((g, i) => {
                  const colors = { Plato: '#a08040', Aristotle: '#6080a0', 'Aquinas': '#a06030', 'Aquinas (indirect)': '#a06030', Machiavelli: '#c04040', Hobbes: '#505080', Locke: '#408060', 'Aristotle (indirect)': '#6080a0', 'Montesquieu (via Locke)': '#408060', 'Thucydides (pre-Machiavelli)': '#7a6850' };
                  const clr = colors[g.thinker] || C.accent;
                  return (
                    <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{
                        flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                      }}>
                        <div style={{
                          width: 10, height: 10, borderRadius: '50%', background: clr,
                          border: '2px solid ' + clr + '44',
                        }} />
                        {i < selected.genealogy.length - 1 && (
                          <div style={{ width: 1, height: 40, background: C.line }} />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: Mono, fontSize: 12, fontWeight: 600, color: clr, letterSpacing: '.04em', marginBottom: 4 }}>{g.thinker.toUpperCase()}</div>
                        <div style={{ fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75 }}>{g.contribution}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {!selected && (
          <div style={{ padding: '24px', textAlign: 'center', color: C.tx3, fontFamily: Serif, fontSize: 14, fontStyle: 'italic' }}>
            Select a modern concept above to trace its intellectual genealogy back through the Western tradition.
          </div>
        )}
      </div>
    );
  }, [lineageConcept, LINEAGE_CONCEPTS]);

  // ── Main Render ─────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: Sans, position: 'relative', overflow: 'hidden' }} ref={topRef}>
      {/* Marble texture overlay */}
      <MarbleTexture />
      <LaurelDecor />
      {/* Warm marble radial */}
      <div style={{
        position:'fixed',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:0,
        background:'radial-gradient(ellipse at 50% 40%, rgba(160,144,96,.08) 0%, transparent 60%)',
      }}/>

      {/* Top bar — pediment styling */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'linear-gradient(180deg, rgba(245,243,239,.97) 0%, rgba(245,243,239,.93) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid ' + C.line, padding: '8px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setView('coursework')} style={{
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Serif, fontSize: 12, cursor: 'pointer', letterSpacing: '.06em',
        }}>
          {'\u2190'} Back to Coursework
        </button>
        <span style={{ fontFamily: Serif, fontSize: 13, color: C.accentDm, letterSpacing: '.12em', fontStyle: 'italic' }}>
          CORE {'\u2014'} WESTERN TRADITIONS
        </span>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Column decorations on sides */}
        <ColumnDecor side="left" />
        <ColumnDecor side="right" />

        {/* Hero section — academy entrance */}
        <div style={{ marginBottom: 24, paddingLeft: 40, paddingRight: 40 }}>
          {/* Greek key meander border - top */}
          <GreekKeyBorder />

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
            <h1 style={{
              fontFamily: Serif, fontSize: 36, fontWeight: 400,
              color: C.tx, letterSpacing: '.04em', marginBottom: 8,
              textShadow: '0 0 40px rgba(160,144,96,.1)',
            }}>
              The Great Conversation
            </h1>
            {/* Owl of Athena */}
            <svg width="36" height="40" viewBox="0 0 36 40" style={{opacity:0.12,flexShrink:0,color:C.gold}}>
              <ellipse cx="18" cy="18" rx="14" ry="15" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="12" cy="15" r="4" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <circle cx="24" cy="15" r="4" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <circle cx="12" cy="15" r="1.5" fill="currentColor" fillOpacity="0.3"/>
              <circle cx="24" cy="15" r="1.5" fill="currentColor" fillOpacity="0.3"/>
              <path d="M16 20 L18 23 L20 20" fill="currentColor" fillOpacity="0.3"/>
              <path d="M4 14 L8 10 Q12 4 18 3 Q24 4 28 10 L32 14" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <line x1="18" y1="33" x2="18" y2="38" stroke="currentColor" strokeWidth="1"/>
              <line x1="12" y1="38" x2="24" y2="38" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <p style={{
            fontFamily: Serif, fontSize: 17, color: C.tx2,
            lineHeight: 1.7, marginBottom: 4, maxWidth: 720, letterSpacing: '.02em',
          }}>
            Six thinkers across two millennia, each responding to the one before. Trace the evolution of Western political thought from Plato{'\u2019'}s philosopher kings through Locke{'\u2019'}s natural rights {'\u2014'} a conversation that created the conceptual vocabulary of modern politics.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 6px' }}>
            <CaveIcon /><Tip id="cave_allegory" />
          </div>
          <p style={{
            fontFamily: Serif, fontSize: 13, color: C.tx3,
            lineHeight: 1.65, marginBottom: 12, maxWidth: 720, letterSpacing: '.08em', fontStyle: 'italic',
          }}>
            Political Philosophy, Social Contract Theory, Natural Law, Constitutional Government
          </p>

          {/* Skills tags — stone tablet chips */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            {SKILLS.map(tag => (
              <span key={tag} style={{
                fontFamily: Serif, fontSize: 11, padding: '4px 10px', borderRadius: 1,
                background: C.accentBg, color: C.accentDm, letterSpacing: '.06em',
                border: '1px solid rgba(140,124,88,.1)',
                fontStyle: 'italic',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <span style={{ fontFamily: Serif, fontSize: 12, color: C.tx3, letterSpacing: '.06em', fontStyle: 'italic' }}>THINKERS EXPLORED</span>
            <div style={{ flex: 1, maxWidth: 200, height: 4, background: C.line, borderRadius: 2 }}>
              <div style={{
                width: (revealedCount / 6 * 100) + '%',
                height: '100%', borderRadius: 2,
                background: revealedCount === 6 ? C.green : C.gold,
                transition: 'width .3s ease',
              }} />
            </div>
            <span style={{
              fontFamily: Mono, fontSize: 12,
              color: revealedCount === 6 ? C.green : C.gold,
            }}>
              {revealedCount}/6
            </span>
          </div>

          {/* Greek key meander border - bottom */}
          <div style={{ marginTop: 16 }}>
            <GreekKeyBorder />
          </div>
        </div>

        <ModeSwitch />

        {mode === 'dialogue' && renderDialogue()}
        {mode === 'debates' && renderDebates()}
        {mode === 'legacy' && renderLegacy()}
        {mode === 'graph' && renderGraph()}
        {mode === 'apply' && renderApply()}
        {mode === 'lineage' && renderLineage()}

        {/* Provenance Strip — academy references */}
        <div style={{ marginTop: 16 }}>
          <GreekKeyBorder />
        </div>
        <div style={{
          marginTop: 16, padding: 20,
          display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center',
        }}>
          {PROVENANCE.map(p => (
            <div key={p.label} style={{
              textAlign: 'center', flex: '0 0 auto',
              padding: '8px 16px',
              borderBottom: '1px solid rgba(140,124,88,.1)',
            }}>
              <div style={{
                fontFamily: Serif, fontSize: 12, letterSpacing: '.06em', color: C.gold, fontStyle: 'italic', opacity: 0.7,
              }}>
                {p.label}
              </div>
              <div style={{ fontFamily: Serif, fontSize: 12, color: C.tx2, marginTop: 2, letterSpacing: '.03em' }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Back button */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={() => setView('coursework')} style={{
            padding: '10px 32px', border: '1px solid rgba(140,124,88,.12)',
            background: 'transparent', color: C.tx2,
            fontFamily: Serif, fontSize: 14, letterSpacing: '.06em', cursor: 'pointer',
            fontStyle: 'italic',
          }}>
            {'\u2190'} Back to Coursework
          </button>
        </div>
      </div>
    </div>
  );
}
