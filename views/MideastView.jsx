// MideastView.jsx — Timeline & Narrative Analyzer
// Israel-Palestine Conflict (HIST/PCS)
//
// Interactive chronological analysis: 7 key periods examined through
// dual narratives (Israeli and Palestinian perspectives). Four modes:
// Timeline (chronological walkthrough), Narratives (side-by-side comparison),
// Documents (key texts), Territory (interactive SVG map of territorial control).
// Demonstrates how identical events are interpreted through fundamentally
// different historical frameworks.
// Self-contained React component with JSX syntax.


// ── Palette: Warm sandstone diplomatic briefing room ─────────────
const C = {
  bg:      '#141008',
  card:    'rgba(24,20,12,.92)',
  cardBd:  'rgba(196,160,64,.15)',
  tx:      '#d4cbb0',
  tx2:     '#b4ac8c',
  tx3:     '#8b8373',
  accent:  '#c4a040',
  accentDm:'#9a7e30',
  accentBg:'rgba(196,160,64,.08)',
  olive:   '#7a9050',
  oliveDm: '#587038',
  oliveBg: 'rgba(122,144,80,.10)',
  blue:    '#5080a8',
  blueDm:  '#3c6488',
  blueBg:  'rgba(80,128,168,.10)',
  red:     '#a85040',
  redDm:   '#803828',
  redBg:   'rgba(168,80,64,.07)',
  terra:   '#b88050',
  terraDm: '#906838',
  terraBg: 'rgba(184,128,80,.07)',
  line:    'rgba(196,160,64,.12)',
  sand:    '#2a2218',
  sandLight: 'rgba(184,160,120,.06)',
};
const Mono  = "'IBM Plex Mono',monospace";
const Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const Sans  = "'Inter',Helvetica,sans-serif";

// ── Decorative SVG patterns for diplomatic briefing room ─────────
const IslamicArchPattern = () => (
  <svg width="100%" height="32" viewBox="0 0 960 32" preserveAspectRatio="none" style={{ display: 'block', opacity: 0.12 }}>
    {Array.from({ length: 16 }).map((_, i) => (
      React.createElement('g', { key: i, transform: 'translate(' + (i * 60) + ', 0)' },
        React.createElement('path', { d: 'M0 32 Q15 4 30 32 Q45 4 60 32', fill: 'none', stroke: '#c4a040', strokeWidth: '0.8' }),
        React.createElement('circle', { cx: 30, cy: 8, r: 3, fill: 'none', stroke: '#c4a040', strokeWidth: '0.5' }),
        React.createElement('path', { d: 'M26 8 L30 4 L34 8 L30 12Z', fill: 'none', stroke: '#c4a040', strokeWidth: '0.4' })
      )
    ))}
  </svg>
);

const IslamicStarPattern = () => (
  <svg width="100%" height="24" viewBox="0 0 960 24" preserveAspectRatio="none" style={{ display: 'block', opacity: 0.08 }}>
    {Array.from({ length: 24 }).map((_, i) => (
      React.createElement('g', { key: i, transform: 'translate(' + (i * 40) + ', 12)' },
        React.createElement('path', { d: 'M0 -6 L2 -2 L6 0 L2 2 L0 6 L-2 2 L-6 0 L-2 -2Z', fill: 'none', stroke: '#c4a040', strokeWidth: '0.5', transform: 'translate(20, 0)' }),
        React.createElement('line', { x1: 8, y1: 0, x2: 12, y2: 0, stroke: '#c4a040', strokeWidth: '0.3' }),
        React.createElement('line', { x1: 28, y1: 0, x2: 32, y2: 0, stroke: '#c4a040', strokeWidth: '0.3' })
      )
    ))}
  </svg>
);

const SandTextureBg = () => (
  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', opacity: 0.03 }}>
    <defs>
      <pattern id="sandGrain" patternUnits="userSpaceOnUse" width="200" height="200">
        {Array.from({ length: 80 }).map((_, i) => (
          React.createElement('circle', {
            key: i,
            cx: (i * 37 + i * i * 3) % 200,
            cy: (i * 23 + i * i * 7) % 200,
            r: (i % 3 === 0) ? 1.2 : 0.6,
            fill: '#c4a040',
            opacity: 0.3 + (i % 5) * 0.1,
          })
        ))}
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#sandGrain)" />
  </svg>
);

const NarrativeDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(80,128,168,.3), transparent)' }} />
    <svg width="24" height="24" viewBox="0 0 24 24" style={{ opacity: 0.2, flexShrink: 0 }}>
      <path d="M4 12 L8 8 L12 12 L16 8 L20 12" fill="none" stroke="#c4a040" strokeWidth="1" />
      <path d="M4 16 L8 12 L12 16 L16 12 L20 16" fill="none" stroke="#c4a040" strokeWidth="0.6" />
    </svg>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(122,144,80,.3), transparent)' }} />
  </div>
);

// ── Skills ──────────────────────────────────────────────────────────
const SKILLS = [
  'Dual-Narrative Analysis',
  'Historiographical Method',
  'International Law (UN Resolutions)',
  'Settler-Colonial Theory',
  'National Self-Determination',
  'Peace & Conflict Studies',
  'Primary Document Interpretation',
  'Competing Memory Frameworks',
];

// ── Provenance ──────────────────────────────────────────────────────
const PROVENANCE = [
  { label: 'Morris (1999)', desc: 'Righteous Victims: A History of the Zionist-Arab Conflict' },
  { label: 'Khalidi (2006)', desc: 'The Iron Cage: The Story of the Palestinian Struggle for Statehood' },
  { label: 'Shlaim (2000)', desc: 'The Iron Wall: Israel and the Arab World' },
  { label: 'Said (1979)', desc: 'The Question of Palestine' },
];

// ── Period Data ─────────────────────────────────────────────────────
const PERIODS = [
  {
    id: 'ottoman',
    num: 1,
    era: '1880 \u2013 1917',
    title: 'Ottoman Palestine & Early Zionism',
    factual: 'In the late 19th century, Palestine was a province of the Ottoman Empire with a predominantly Arab population of roughly 500,000\u2013600,000, alongside small Jewish communities concentrated in Jerusalem, Safed, Tiberias, and Hebron. Beginning in the 1880s, waves of Jewish immigration (aliyot) arrived, driven by European antisemitism and inspired by the emerging Zionist movement formalized in Theodor Herzl\'s 1896 pamphlet "Der Judenstaat." The First Aliyah (1882\u20131903) brought approximately 25,000\u201335,000 settlers. The Second Aliyah (1904\u20131914) brought 35,000\u201340,000 more, many of whom established agricultural settlements and the first kibbutzim. In November 1917, British Foreign Secretary Arthur Balfour issued a letter to Lord Rothschild declaring British support for "a national home for the Jewish people" in Palestine, while stipulating that "nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities."',
    israeliNarrative: 'The Jewish people maintained continuous connection to the Land of Israel across two millennia of exile. Jews never ceased praying for return to Zion, and small communities persisted in the holy cities throughout Ottoman rule. European Zionism was a national liberation movement responding to centuries of persecution culminating in violent pogroms in Russia and Eastern Europe. The settlers of the First and Second Aliyot purchased land legally from willing sellers, often absentee Ottoman landlords. They did not displace anyone by force \— they built on empty or neglected land through extraordinary labor. The Balfour Declaration represented international recognition of the Jewish people\'s legitimate right to reconstitute their national homeland in the territory from which they had been expelled. As historian Anita Shapira argues, Zionism was fundamentally a movement of refugees seeking safety and self-determination.',
    palestinianNarrative: 'Palestine was not "a land without a people." It was home to a settled Arab society with ancient roots, vibrant cities (Jaffa, Haifa, Nablus, Jerusalem), and established agricultural communities. Palestinian identity, while evolving through the Ottoman period, was tied to the land through continuous habitation, cultivation, and cultural practice. Zionist immigration was experienced as a colonial project from its inception \— settlers arrived with the explicit goal of establishing political sovereignty over an already-inhabited territory. Land purchases, while legal under Ottoman law, frequently resulted in the displacement of tenant farmers (fellahin) who had worked the land for generations but held no formal title under the Ottoman system. The Balfour Declaration was an imperial promise made by a European power disposing of another people\'s homeland without consulting the indigenous population. As Rashid Khalidi emphasizes, no one asked the Palestinians.',
    documents: ['Herzl, "Der Judenstaat" (1896)', 'Balfour Declaration (1917)', 'McMahon-Hussein Correspondence (1915\u20131916)'],
    israeliFailure: 'The failure of European nations to protect their Jewish minorities, making the national homeland an urgent necessity rather than a mere aspiration.',
    palestinianFailure: 'The failure of the Ottoman system to register indigenous land rights, and the willingness of European powers to promise Arab land to a European settler movement without consent.',
  },
  {
    id: 'mandate',
    num: 2,
    era: '1920 \u2013 1948',
    title: 'British Mandate Period',
    factual: 'Britain received the League of Nations Mandate for Palestine in 1920, incorporating the Balfour Declaration into its terms. Jewish immigration accelerated, particularly during the Fifth Aliyah (1929\u20131939) when approximately 250,000 Jews arrived fleeing Nazism. The Jewish population rose from roughly 11% in 1922 to 33% by 1947. Arab resistance intensified: the 1929 Hebron massacre killed 67 Jews; the 1936\u20131939 Arab Revolt was a sustained uprising against British rule and Jewish immigration. Britain crushed the revolt militarily, destroying Palestinian political leadership. The 1939 White Paper restricted Jewish immigration at the worst possible moment \— as the Holocaust began. After World War II, with hundreds of thousands of displaced Jews in Europe, Britain referred the issue to the United Nations. On November 29, 1947, the UN General Assembly passed Resolution 181, proposing partition into a Jewish state (56% of the territory for 33% of the population) and an Arab state (44% for 67%), with Jerusalem as an international zone.',
    israeliNarrative: 'The Mandate period demonstrated the desperate urgency of Jewish statehood. As European antisemitism escalated toward genocide, Britain progressively restricted the one refuge available to persecuted Jews. The 1939 White Paper was a betrayal that condemned hundreds of thousands to death in the Holocaust. Despite this, the Yishuv (Jewish community in Palestine) built democratic institutions, a modern economy, a Hebrew cultural revival, and a defense force (Haganah). The Jewish leadership accepted the UN Partition Plan as a painful but necessary compromise, gaining sovereignty on only part of their historic homeland. The Arab rejection of partition \— and the subsequent invasion by five Arab armies \— demonstrated that the conflict was not about borders but about the legitimacy of any Jewish state.',
    palestinianNarrative: 'The Mandate was a form of colonialism that empowered a settler movement at the expense of the indigenous majority. Britain permitted massive immigration that fundamentally altered Palestine\'s demographics against the wishes of its existing population. The 1936\u20131939 revolt was a legitimate national uprising against colonial dispossession; its suppression destroyed Palestinian political and military capacity at the critical moment. The UN Partition Plan was unjust on its face \— it awarded 56% of the territory to a community that comprised 33% of the population and owned approximately 7% of the land. Palestinians were asked to surrender their homeland to accommodate a European refugee crisis they had not caused. As Walid Khalidi documented, rejection of partition was not rejection of compromise but rejection of an inherently inequitable proposal imposed by outside powers.',
    documents: ['League of Nations Mandate (1922)', 'Peel Commission Report (1937)', 'White Paper of 1939', 'UN General Assembly Resolution 181 (1947)'],
    israeliFailure: 'The White Paper of 1939, which restricted Jewish immigration during the Holocaust, demonstrated that Jewish survival required sovereign control over immigration policy.',
    palestinianFailure: 'The suppression of the 1936\u20131939 revolt destroyed Palestinian political and military organization at the moment they needed it most, leaving the community leaderless and militarily incapable on the eve of partition.',
  },
  {
    id: 'war1948',
    num: 3,
    era: '1948 \u2013 1949',
    title: '1948: Independence / Nakba',
    factual: 'On May 14, 1948, David Ben-Gurion declared the establishment of the State of Israel. The next day, armies from Egypt, Transjordan, Syria, Iraq, and Lebanon invaded. The war lasted until early 1949, ending with armistice agreements. Israel controlled 78% of Mandate Palestine (more than the 56% allocated by the Partition Plan). Transjordan controlled the West Bank and East Jerusalem; Egypt controlled the Gaza Strip. Between 700,000 and 750,000 Palestinian Arabs fled or were expelled from areas that became Israel. Approximately 150,000 remained and became Israeli citizens. Hundreds of Palestinian villages were depopulated and later demolished. The Israeli historian Benny Morris documented cases of voluntary flight, expulsion by military order, and flight caused by the atmosphere of war. The debate over the relative proportions of flight versus expulsion remains one of the most contested questions in the historiography.',
    israeliNarrative: 'The 1948 War of Independence was an existential struggle for survival. Five Arab armies invaded with the declared aim of destroying the newborn state just three years after the Holocaust. Israel was outgunned and outnumbered, and its survival was not assured. The displacement of Arab civilians, while tragic, occurred in the context of a war that the Arab states initiated. Many Palestinians left at the urging of Arab leaders who promised a swift return after victory. Israel accepted 800,000\u2013900,000 Jewish refugees expelled from Arab countries in subsequent years, integrating them as citizens. The war created two refugee populations; only the Palestinian refugees were denied resettlement by their host countries.',
    palestinianNarrative: 'The Nakba ("catastrophe") was an act of ethnic cleansing. Recent Israeli scholarship, including Morris\'s own work and Ilan Pappe\'s research, has documented systematic expulsions, massacres (most notoriously at Deir Yassin, where over 100 villagers were killed), and a deliberate policy of preventing return. The displacement was not an unfortunate byproduct of war but a precondition for the creation of a Jewish-majority state in a territory where Jews were a minority in most regions. Palestinians did not leave voluntarily \— they were driven out by military force, psychological terror, and the destruction of their communities. The refugees\' right of return, recognized by UN General Assembly Resolution 194, has never been implemented. The Nakba is the foundational trauma of Palestinian national identity.',
    documents: ['Israeli Declaration of Independence (May 14, 1948)', 'UN General Assembly Resolution 194 (1948)', 'Armistice Agreements (1949)', 'Deir Yassin: competing accounts and investigations'],
    israeliFailure: 'The Arab states\' refusal to accept the partition plan and their decision to invade, turning what could have been a peaceful division into a war with catastrophic consequences for all sides.',
    palestinianFailure: 'The international community\'s failure to enforce Resolution 194 (right of return) and to hold the new state accountable for the expulsions, establishing a pattern of impunity that continues to the present.',
  },
  {
    id: 'war1967',
    num: 4,
    era: '1967 \u2013 1987',
    title: '1967 War & Occupation',
    factual: 'In June 1967, Israel fought the Six-Day War against Egypt, Syria, and Jordan. Israel captured the Sinai Peninsula and Gaza Strip from Egypt, the Golan Heights from Syria, and the West Bank (including East Jerusalem) from Jordan. The war tripled the territory under Israeli control and placed over one million Palestinians under military occupation. UN Security Council Resolution 242 (November 1967) called for Israeli withdrawal from "territories occupied in the recent conflict" in exchange for peace and recognition. The ambiguity of the phrasing \— "territories" versus "the territories" (the French version says "des territoires") \— remains disputed. Israel began establishing civilian settlements in the occupied territories almost immediately. By 1987, approximately 60,000 Israeli settlers lived in the West Bank and Gaza.',
    israeliNarrative: 'The 1967 war was a preemptive defensive action against an existential threat. Egypt expelled UN peacekeepers from Sinai, blockaded the Straits of Tiran (an act of war under international law), and mobilized its army on Israel\'s border. Syria and Jordan joined the coalition. Israel\'s victory was not a war of conquest but a war of survival that produced territorial gains as a buffer against future aggression. Resolution 242 deliberately did not require withdrawal from all territories, recognizing that the pre-1967 borders (the 1949 armistice lines) were not defensible. The settlement enterprise was driven partly by strategic depth, partly by religious conviction about the biblical heartland (Judea and Samaria), and partly by the failure of Arab states to negotiate peace.',
    palestinianNarrative: 'The 1967 occupation was the completion of the Nakba \— the entire territory of historic Palestine now fell under Israeli control. Military occupation imposed a regime of permits, checkpoints, land confiscation, and administrative detention. Settlement construction was a deliberate policy of colonizing occupied territory in violation of the Fourth Geneva Convention (Article 49), which prohibits the transfer of an occupying power\'s civilian population into occupied territory. The settlements were designed to create irreversible "facts on the ground" that would prevent the establishment of a viable Palestinian state. As the occupation deepened, Palestinians experienced daily humiliation, economic strangulation, and the progressive loss of land.',
    documents: ['UN Security Council Resolution 242 (1967)', 'Fourth Geneva Convention, Article 49', 'Allon Plan (1967, never officially adopted)', 'Khartoum Resolution: "Three Nos" (1967)'],
    israeliFailure: 'The Khartoum Resolution\'s "Three Nos" (no peace, no recognition, no negotiation with Israel) closed the door on immediate post-war diplomacy when a land-for-peace exchange might have been achievable.',
    palestinianFailure: 'The failure of the Arab states to protect Palestinian rights during and after the war, and the international community\'s inability to enforce Resolution 242 or halt settlement construction from its inception.',
  },
  {
    id: 'intifada1',
    num: 5,
    era: '1987 \u2013 2000',
    title: 'First Intifada & Oslo',
    factual: 'In December 1987, a Palestinian popular uprising (intifada, meaning "shaking off") erupted in the occupied territories. It was initially characterized by strikes, boycotts, stone-throwing, and civil disobedience. Israel responded with force: Defense Minister Yitzhak Rabin reportedly ordered soldiers to "break the bones" of demonstrators. Over 1,000 Palestinians and approximately 160 Israelis were killed during the uprising (1987\u20131993). The intifada demonstrated that the status quo was unsustainable and shifted international attention to the occupation. Secret negotiations in Oslo, Norway, led to the 1993 Declaration of Principles (Oslo Accords), signed on the White House lawn by Rabin and Yasser Arafat. The accords established the Palestinian Authority, created a framework for interim self-governance, and envisioned a five-year process leading to final-status negotiations on borders, Jerusalem, refugees, and settlements. The Oslo process produced further agreements (Oslo II, 1995; Wye River, 1998) but never resolved the core issues. The Camp David Summit (July 2000) between Israeli PM Ehud Barak and Arafat ended without agreement.',
    israeliNarrative: 'The First Intifada was painful evidence that occupation was untenable. Israel\'s peace camp gained strength, leading to Oslo \— the first direct Israeli-Palestinian negotiation and mutual recognition. At Camp David, Barak offered unprecedented concessions: approximately 90\u201395% of the West Bank, a Palestinian capital in East Jerusalem, and a solution for refugees. Arafat rejected the offer without making a counter-proposal, revealing that the Palestinian leadership was unwilling to accept a two-state solution that required ending the conflict. As Dennis Ross and other American negotiators argued, the failure at Camp David was primarily Arafat\'s responsibility.',
    palestinianNarrative: 'The First Intifada was a popular uprising against twenty years of military occupation, demonstrating Palestinian agency and resilience. Oslo was a deeply flawed process that required Palestinians to negotiate under occupation, without the leverage that international law provided. The accords did not freeze settlement construction \— the settler population doubled during the "peace process" (from approximately 110,000 in 1993 to over 200,000 by 2000). At Camp David, Barak\'s offer, as described by Palestinian negotiators and later by Robert Malley (a member of the American team), was not the generous proposal portrayed in Israeli accounts: it would have divided the West Bank into non-contiguous cantons, maintained Israeli control over borders and water, and denied meaningful sovereignty in Jerusalem. The failure at Camp David was a failure of the Oslo framework itself.',
    documents: ['Oslo Declaration of Principles (1993)', 'Oslo II / Interim Agreement (1995)', 'Wye River Memorandum (1998)', 'Camp David 2000 proposals (disputed accounts)'],
    israeliFailure: 'Arafat\'s rejection of the Camp David proposals and his failure to present a counter-offer, which persuaded much of the Israeli public that there was "no partner for peace."',
    palestinianFailure: 'The structural asymmetry of Oslo, which allowed Israel to continue settlement expansion throughout the "peace process," progressively undermining the territorial basis for a Palestinian state.',
  },
  {
    id: 'intifada2',
    num: 6,
    era: '2000 \u2013 2005',
    title: 'Second Intifada & Barrier',
    factual: 'In September 2000, Ariel Sharon visited the Temple Mount / Haram al-Sharif compound in Jerusalem, accompanied by a large security contingent. The visit sparked protests that escalated into the Second Intifada, far more violent than the first. Palestinian armed groups, including Hamas and Islamic Jihad, carried out suicide bombings targeting Israeli civilians in buses, restaurants, and public spaces, killing over 1,000 Israelis. Israeli military operations in the West Bank and Gaza killed over 3,000 Palestinians, including combatants and civilians. Israel launched Operation Defensive Shield (2002), reoccupying West Bank cities. Beginning in 2002, Israel constructed a separation barrier (wall/fence) largely within or along the West Bank, which Israel described as a security necessity and Palestinians condemned as a land grab that separated farming communities from their land. The International Court of Justice issued an advisory opinion in 2004 declaring the barrier\'s route through occupied territory illegal under international law.',
    israeliNarrative: 'The Second Intifada was a campaign of terror against Israeli civilians. Suicide bombers targeted ordinary people in the most routine settings \— riding buses, eating pizza, celebrating Passover. The violence was not a spontaneous popular uprising but an organized campaign by groups committed to Israel\'s destruction. The separation barrier, while imposing hardships on Palestinians, was a security necessity that reduced suicide bombings by over 90%. The wall saved lives. Israel\'s military operations in the West Bank, however painful, were directed at terrorist infrastructure, not at the civilian population. The Second Intifada destroyed the Israeli peace camp and convinced a majority that unilateral separation was preferable to negotiation.',
    palestinianNarrative: 'The Second Intifada erupted from the frustration of a failed peace process and the provocation of Sharon\'s visit to the Haram al-Sharif, the third holiest site in Islam. While Palestinian armed groups committed inexcusable attacks on civilians, the Israeli military response was vastly disproportionate: the ratio of Palestinian to Israeli deaths was roughly 3:1, with significant civilian casualties including children. The separation barrier was not built along the 1967 border but deep inside the West Bank, annexing settlement blocs and fertile agricultural land. It separated villages from their fields, students from schools, and patients from hospitals. The ICJ advisory opinion confirmed that the barrier\'s route constituted a violation of international law. The violence of the period cannot be understood outside the context of 35 years of military occupation.',
    documents: ['Mitchell Report (2001)', 'Arab Peace Initiative (2002)', 'ICJ Advisory Opinion on the Wall (2004)', 'Geneva Accord (2003, unofficial)'],
    israeliFailure: 'The Palestinian Authority\'s failure or unwillingness to prevent suicide bombings, which made the separation barrier necessary and destroyed public support for territorial compromise.',
    palestinianFailure: 'The militarization of the intifada and the use of suicide bombings, which undermined international sympathy, provided justification for the barrier, and destroyed the Israeli peace camp.',
  },
  {
    id: 'post2005',
    num: 7,
    era: '2005 \u2013 Present',
    title: 'Post-Disengagement Era',
    factual: 'In 2005, Israel unilaterally withdrew from the Gaza Strip, evacuating approximately 8,000 settlers and military forces. In 2006, Hamas won Palestinian legislative elections. After a brief civil conflict, Hamas took control of Gaza in 2007, while the Palestinian Authority under Fatah retained control of the West Bank. Israel and Egypt imposed a blockade on Gaza. Multiple military operations followed: Operation Cast Lead (2008\u20132009), Operation Pillar of Defense (2012), Operation Protective Edge (2014), and further escalations. West Bank settlement construction continued, with the settler population growing from approximately 250,000 in 2005 to over 700,000 (including East Jerusalem) by the 2020s. Negotiations have been largely frozen since 2014. The situation is characterized by Palestinian political division, ongoing settlement expansion, periodic violence, and increasing international debate about whether a two-state solution remains viable.',
    israeliNarrative: 'Israel\'s withdrawal from Gaza was a test case for territorial concession: land was exchanged not for peace but for rocket fire. Hamas\'s takeover of Gaza and its continued attacks on Israeli civilians demonstrated the security risks of withdrawal without a reliable partner. The blockade is a legitimate security measure against a hostile entity that fires rockets at Israeli cities, builds attack tunnels, and is committed to Israel\'s destruction. Settlement construction in the major blocs (which would be retained under any realistic peace agreement) reflects demographic reality. Israel faces an adversary that refuses to recognize its right to exist, making territorial compromise a potential existential threat.',
    palestinianNarrative: 'The "withdrawal" from Gaza was a repackaging of control, not an end to occupation. Israel maintained authority over Gaza\'s airspace, coastline, borders, population registry, and electromagnetic spectrum. The blockade constitutes collective punishment of two million people in violation of international humanitarian law. Settlement expansion in the West Bank has been relentless and systematic, fragmenting Palestinian territory into disconnected enclaves that cannot form a viable state. The situation increasingly resembles apartheid as defined by international law: two populations under one sovereign authority, with fundamentally different legal rights based on ethnicity. The question is no longer whether there will be a two-state solution but whether there can be one.',
    documents: ['Disengagement Plan (2005)', 'Hamas Charter (1988) and 2017 Document of General Principles', 'Goldstone Report (2009)', 'ICC jurisdiction ruling on Palestine (2021)'],
    israeliFailure: 'The international community\'s failure to hold Hamas accountable for attacks on civilians or to recognize the security constraints Israel faces, which makes risk-taking for peace politically impossible.',
    palestinianFailure: 'The Hamas-Fatah split, which divided the Palestinian national movement, weakened its international position, and provided Israel with justification for claiming there is no unified partner for negotiations.',
  },
];

// ── Key Documents ───────────────────────────────────────────────────
const DOCUMENTS = [
  {
    id: 'balfour',
    name: 'Balfour Declaration',
    year: 1917,
    type: 'DIPLOMATIC LETTER',
    summary: 'A letter from British Foreign Secretary Arthur Balfour to Lord Walter Rothschild declaring British support for "the establishment in Palestine of a national home for the Jewish people." The letter included the caveat that "nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities in Palestine."',
    significance: 'The foundational document of the conflict. It committed a colonial power to supporting a national home for one people in territory inhabited by another. The tension between the two clauses \— supporting a Jewish national home while protecting existing rights \— proved irreconcilable.',
    israeliReading: 'International recognition of the Jewish people\'s historic right to self-determination in their ancestral homeland. The declaration reflected growing understanding that Jews needed a sovereign refuge.',
    palestinianReading: 'An imperial promise disposing of another people\'s homeland. Britain gave away what it did not own. The reference to Palestinians as "existing non-Jewish communities" erased their national identity and political rights.',
    scholarlyNote: 'Morris notes that Balfour himself acknowledged the inherent contradiction. Khalidi describes it as "a declaration of war by the British Empire on the indigenous population of Palestine."',
  },
  {
    id: 'res181',
    name: 'UN Resolution 181',
    year: 1947,
    type: 'GENERAL ASSEMBLY RESOLUTION',
    summary: 'The United Nations Partition Plan for Palestine, adopted by the General Assembly on November 29, 1947. It recommended dividing Palestine into a Jewish state (56% of the territory), an Arab state (44%), and an international zone encompassing Jerusalem and Bethlehem. The plan allocated a majority of the territory to the Jewish state despite Jews constituting approximately one-third of the population, partly because of the Negev desert (largely uninhabited) and the expectation of continued immigration.',
    significance: 'The international community\'s attempt to resolve competing claims through territorial division. Its acceptance by Jewish leaders and rejection by Arab leaders set the stage for the 1948 war.',
    israeliReading: 'A legitimate exercise of international authority offering a workable, if imperfect, compromise. Jewish acceptance demonstrated willingness to share the land; Arab rejection demonstrated unwillingness to accept any Jewish sovereignty.',
    palestinianReading: 'An unjust imposition by an institution dominated by Western powers, awarding a majority of the territory to a minority of the population. No democratic or legal principle justified asking the majority to surrender its homeland to accommodate a colonial immigration project.',
    scholarlyNote: 'Shlaim observes that the plan was more favorable to the Jewish side than demographics warranted. Khalidi argues that the General Assembly exceeded its authority, as it could only recommend, not impose, partition.',
  },
  {
    id: 'res242',
    name: 'UN Resolution 242',
    year: 1967,
    type: 'SECURITY COUNCIL RESOLUTION',
    summary: 'Adopted unanimously by the Security Council following the 1967 war. It affirmed the "inadmissibility of the acquisition of territory by war" and called for "withdrawal of Israeli armed forces from territories occupied in the recent conflict" in exchange for termination of belligerency and acknowledgment of sovereignty and territorial integrity of every state in the area. The resolution did not mention Palestinians by name, referring only to "a just settlement of the refugee problem."',
    significance: 'The legal foundation for the "land for peace" formula that has shaped all subsequent diplomacy. The deliberate ambiguity of the English text ("territories" vs. "all the territories") created an enduring interpretive dispute.',
    israeliReading: 'The resolution calls for withdrawal from "territories" (not "the territories" or "all territories"), implying that Israel is not required to withdraw to the exact pre-1967 lines. It conditions withdrawal on peace and recognition, which Arab states refused for decades.',
    palestinianReading: 'The resolution\'s preamble emphasizes the inadmissibility of acquiring territory by war. The French text ("des territoires") implies withdrawal from the occupied territories. The resolution has been routinely ignored by Israel, which has expanded settlements rather than withdrawing.',
    scholarlyNote: 'Morris documents the deliberate ambiguity as a diplomatic compromise between the U.S. and Soviet drafts. Shlaim argues the resolution established a framework that Israel subsequently undermined through settlement construction.',
  },
  {
    id: 'oslo',
    name: 'Oslo Accords',
    year: 1993,
    type: 'BILATERAL AGREEMENT',
    summary: 'The Declaration of Principles on Interim Self-Government Arrangements, signed on September 13, 1993, at the White House. Israel and the PLO mutually recognized each other. The accords established the Palestinian Authority, created three categories of territorial control (Area A: Palestinian civil and security control; Area B: Palestinian civil, Israeli security; Area C: full Israeli control), and envisioned a five-year transition period leading to final-status negotiations on Jerusalem, borders, refugees, settlements, and security.',
    significance: 'The first direct agreement between Israel and the Palestinian national movement. It represented mutual recognition but deferred all core issues. The interim period was never completed, and the permanent-status negotiations failed.',
    israeliReading: 'A historic breakthrough demonstrating Israel\'s commitment to peace and willingness to negotiate directly with its adversary. The framework was undermined by Palestinian terrorism during the implementation period.',
    palestinianReading: 'A structurally flawed agreement that required Palestinians to negotiate from a position of weakness while occupation continued. Oslo did not freeze settlements, did not address international law, and created a Palestinian Authority with responsibility but no sovereignty \— effectively subcontracting the occupation.',
    scholarlyNote: 'Said criticized Oslo as a "Palestinian Versailles" that legitimized the occupation. Shlaim argues it was undermined from within by both sides: Israeli settlement expansion and Palestinian armed factions.',
  },
];

// ── Territory Map Data ──────────────────────────────────────────────
const MAP_PERIODS = [
  { id: 'ottoman', year: '1917', label: 'Ottoman Palestine', description: 'Single administrative unit under Ottoman Empire. No partition. Mixed population: ~600K Arab, ~60K Jewish.' },
  { id: 'mandate', year: '1920-1947', label: 'British Mandate', description: 'League of Nations mandate. Balfour Declaration promises "national home for the Jewish people." Arab majority, growing Jewish immigration. Three Arab revolts (1920, 1929, 1936-39).' },
  { id: 'partition', year: '1947', label: 'UN Partition Plan', description: 'Resolution 181: 56% to Jewish state (33% of population), 43% to Arab state, Jerusalem internationalized. Arabs reject. Jews accept.' },
  { id: '1948', year: '1948-1949', label: 'After 1948 War', description: 'Israel controls 78% (more than partition allocated). Jordan controls West Bank + East Jerusalem. Egypt controls Gaza. 700,000+ Palestinian refugees (Nakba).' },
  { id: '1967', year: '1967', label: 'After Six-Day War', description: 'Israel occupies West Bank, Gaza, Sinai, Golan Heights. East Jerusalem annexed. UN Resolution 242: "inadmissibility of acquisition of territory by war." Beginning of settlement enterprise.' },
  { id: 'oslo', year: '1993-2000', label: 'Oslo Accords Era', description: 'Area A (PA control), Area B (PA civil/Israeli security), Area C (full Israeli control = 60% of West Bank). Gaza under PA. Settlements continue expanding.' },
  { id: 'present', year: '2024', label: 'Present Day', description: 'West Bank: ~700K settlers in 150+ settlements. Gaza: blockaded since 2007, Hamas governance. East Jerusalem: annexed, ~220K settlers. Area C: 60% of West Bank, full Israeli control. Two-state solution increasingly difficult geographically.' },
];

const MAP_REGIONS = {
  galilee: { path: 'M 120,40 L 280,30 L 300,120 L 200,140 L 100,120 Z', label: 'Galilee', cx: 190, cy: 80 },
  haifa_coast: { path: 'M 60,80 L 120,60 L 100,140 L 50,160 Z', label: 'Haifa Coast', cx: 80, cy: 110 },
  tel_aviv: { path: 'M 40,160 L 100,140 L 110,220 L 50,240 Z', label: 'Tel Aviv / Jaffa', cx: 72, cy: 190 },
  west_bank: { path: 'M 200,140 L 300,120 L 320,280 L 260,340 L 180,300 L 160,220 Z', label: 'West Bank', cx: 235, cy: 230 },
  jerusalem: { path: 'M 190,250 L 230,240 L 240,270 L 200,280 Z', label: 'Jerusalem', cx: 215, cy: 260 },
  negev: { path: 'M 50,240 L 160,220 L 180,300 L 260,340 L 200,480 L 100,490 L 40,380 Z', label: 'Negev / Naqab', cx: 140, cy: 380 },
  gaza: { path: 'M 30,260 L 70,250 L 80,320 L 40,330 Z', label: 'Gaza Strip', cx: 55, cy: 290 },
  golan: { path: 'M 300,30 L 340,20 L 350,100 L 310,110 Z', label: 'Golan Heights', cx: 325, cy: 65 },
  sinai: { path: 'M 20,340 L 60,330 L 100,490 L 20,500 Z', label: 'Sinai (Egypt)', cx: 50, cy: 420 },
};

const TERRITORY_CONTROL = {
  ottoman: { galilee: 'ottoman', haifa_coast: 'ottoman', tel_aviv: 'ottoman', west_bank: 'ottoman', jerusalem: 'ottoman', negev: 'ottoman', gaza: 'ottoman', golan: 'ottoman', sinai: 'ottoman' },
  mandate: { galilee: 'british', haifa_coast: 'british', tel_aviv: 'british', west_bank: 'british', jerusalem: 'british', negev: 'british', gaza: 'british', golan: 'british', sinai: 'british' },
  partition: { galilee: 'jewish', haifa_coast: 'jewish', tel_aviv: 'jewish', west_bank: 'arab', jerusalem: 'international', negev: 'jewish', gaza: 'arab', golan: 'arab', sinai: 'arab' },
  '1948': { galilee: 'jewish', haifa_coast: 'jewish', tel_aviv: 'jewish', west_bank: 'jordan', jerusalem: 'mixed', negev: 'jewish', gaza: 'egypt', golan: 'arab', sinai: 'egypt' },
  '1967': { galilee: 'jewish', haifa_coast: 'jewish', tel_aviv: 'jewish', west_bank: 'jewish', jerusalem: 'jewish', negev: 'jewish', gaza: 'jewish', golan: 'jewish', sinai: 'jewish' },
  oslo: { galilee: 'jewish', haifa_coast: 'jewish', tel_aviv: 'jewish', west_bank: 'area_c', jerusalem: 'jewish', negev: 'jewish', gaza: 'pa', golan: 'jewish', sinai: 'egypt' },
  present: { galilee: 'jewish', haifa_coast: 'jewish', tel_aviv: 'jewish', west_bank: 'area_c', jerusalem: 'jewish', negev: 'jewish', gaza: 'mixed', golan: 'jewish', sinai: 'egypt' },
};

const CONTROL_COLORS = {
  ottoman: '#8a7040',
  british: '#607090',
  jewish: '#4080c0',
  arab: '#60a050',
  jordan: '#a06830',
  egypt: '#c4a040',
  pa: '#408050',
  mixed: '#906050',
  international: '#9070a0',
  area_a: '#408050',
  area_b: '#708060',
  area_c: '#4080c0',
};

const CONTROL_LABELS = {
  ottoman: 'Ottoman',
  british: 'British Mandate',
  jewish: 'Israeli / Jewish',
  arab: 'Arab / Palestinian',
  jordan: 'Jordanian',
  egypt: 'Egyptian',
  pa: 'Palestinian Authority',
  mixed: 'Contested / Mixed',
  international: 'International Zone',
  area_a: 'PA Full Control (Area A)',
  area_b: 'PA Civil / Israeli Security (Area B)',
  area_c: 'Israeli Full Control (Area C)',
};

// Refugee displacement arrows for 1948 and 1967
const REFUGEE_ARROWS = {
  '1948': [
    { from: [72, 190], to: [55, 290], label: 'To Gaza' },
    { from: [190, 80], to: [340, 50], label: 'To Lebanon/Syria' },
    { from: [235, 230], to: [320, 250], label: 'To Jordan' },
    { from: [72, 190], to: [50, 420], label: 'To Egypt' },
  ],
  '1967': [
    { from: [235, 230], to: [350, 220], label: 'To Jordan' },
    { from: [55, 290], to: [50, 420], label: 'To Egypt' },
  ],
};

// Settlement dots for Oslo and present
const SETTLEMENT_DOTS = {
  oslo: [
    { x: 220, y: 160 }, { x: 260, y: 180 }, { x: 240, y: 200 },
    { x: 270, y: 220 }, { x: 210, y: 255 }, { x: 250, y: 270 },
    { x: 230, y: 300 }, { x: 280, y: 250 },
  ],
  present: [
    { x: 220, y: 155 }, { x: 260, y: 175 }, { x: 240, y: 195 },
    { x: 270, y: 215 }, { x: 210, y: 250 }, { x: 250, y: 265 },
    { x: 230, y: 295 }, { x: 280, y: 245 }, { x: 200, y: 170 },
    { x: 290, y: 200 }, { x: 255, y: 310 }, { x: 215, y: 225 },
    { x: 245, y: 155 }, { x: 275, y: 290 }, { x: 205, y: 285 },
  ],
};

const MAP_POPULATION = {
  ottoman: 'Arab: ~600,000 | Jewish: ~60,000 | Total: ~660,000',
  mandate: 'Arab: ~1,200,000 | Jewish: ~600,000 (33%) | Total: ~1,800,000',
  partition: 'Arab: ~1,300,000 | Jewish: ~630,000 | Total: ~1,930,000',
  '1948': 'Israel: ~870,000 (incl. 150K Arab) | WB/Gaza: ~1,000,000 | Refugees: ~700,000+',
  '1967': 'Israel: ~2,800,000 | Occupied Territories: ~1,100,000 | Refugees: ~1,500,000',
  oslo: 'Israel: ~6,000,000 | WB: ~2,000,000 | Gaza: ~1,100,000 | Settlers: ~200,000',
  present: 'Israel: ~9,800,000 | WB: ~3,200,000 | Gaza: ~2,100,000 | Settlers: ~700,000+',
};


// ── Scholarly micro-content ──────────────────────────────────────
const ME_TIPS = {
  nakba: "The 1948 Palestinian exodus displaced approximately 700,000 Palestinians from their homes during the Arab-Israeli War. Palestinians call this event 'al-Nakba' (the Catastrophe), and it remains the foundational trauma of Palestinian national identity. The causes are debated by historians along a spectrum: Israeli 'New Historians' like Benny Morris documented systematic expulsion by Haganah/IDF forces (Plan Dalet, Operation Hiram), while also noting that some departures were voluntary or encouraged by Arab leaders. Morris found that most expulsions were driven by military logic rather than a master plan, but that Ben-Gurion welcomed the outcome. The right of return for these refugees and their descendants (now numbering over 5 million) remains the single most intractable issue in peace negotiations -- Israel views it as demographically existential, Palestinians view it as legally guaranteed under UN Resolution 194.",
  oslo_handshake: "The 1993 Oslo Accords were negotiated in secret through a backchannel that Norwegian diplomats Terje Rod-Larsen and Mona Juul facilitated, centered on a farmhouse outside Oslo. The official US-brokered talks in Washington between Israeli and Palestinian delegations were, in effect, a cover for the real negotiations. The Norwegian channel succeeded partly because the negotiators were mid-level officials (not senior leaders with political constraints) and partly because the small, informal setting built personal trust. The fatal flaw was structural: Oslo created a 5-year interim arrangement (the Palestinian Authority) with final-status issues (Jerusalem, borders, refugees, settlements) deferred. Both sides had incentive to avoid the hardest questions, and the interim arrangement calcified into permanence. Yitzhak Rabin, who signed the accords, was assassinated by an Israeli extremist in 1995.",
  camp_david: "The Camp David Summit of July 2000 collapsed after 14 days. The conventional narrative that Ehud Barak made a 'generous offer' which Yasser Arafat rejected is contested by participants. Robert Malley (US negotiator) and Hussein Agha later argued that no formal written offer was ever made, that the territorial proposal excluded key Palestinian requirements (contiguous sovereignty, East Jerusalem, refugee acknowledgment), and that the power asymmetry meant Arafat faced a take-it-or-leave-it dynamic. Barak's offer reportedly included 73-92% of the West Bank (depending on how you count), but with Israeli settlement blocs fragmenting Palestinian territory. The failure demonstrated a recurring pattern: bilateral negotiations between asymmetric powers often fail without external guarantees, because the weaker party cannot accept terms that look reasonable to the stronger party without losing domestic legitimacy.",
  un181: "UN General Assembly Resolution 181 (November 29, 1947) proposed partitioning Mandatory Palestine into a Jewish state (56% of the land), an Arab state (43%), and an internationally administered Jerusalem. At the time, Jews constituted approximately 33% of the population and owned about 7% of the land. The demographic-territorial mismatch made conflict structurally inevitable: the proposed Jewish state would have had a near-equal Arab minority (just under 50%), creating a state whose legitimacy as 'Jewish' required either continued immigration or demographic engineering. The Arab Higher Committee rejected partition; the Jewish Agency accepted it (as a strategic starting point). Within hours of the vote, intercommunal violence erupted. Resolution 181 was a recommendation, never implemented, but it established the principle of partition that shaped all subsequent negotiations.",
};

// ── Component ───────────────────────────────────────────────────────
function MideastView({ setView }) {
  const [mode, setMode] = useState('timeline');
  const [tipId, setTipId] = useState(null);
  const [activePeriod, setActivePeriod] = useState(0);
  const [expandedNarratives, setExpandedNarratives] = useState({});
  const [expandedDocs, setExpandedDocs] = useState(null);
  const [narrativeSide, setNarrativeSide] = useState('both'); // 'israeli', 'palestinian', 'both'
  const topRef = useRef(null);

  // Negotiations mode state
  const [negoSelected, setNegoSelected] = useState(0);
  const [negoUserAnswers, setNegoUserAnswers] = useState({});
  const [negoRevealed, setNegoRevealed] = useState({});

  // Water mode state
  const [waterPopGrowth, setWaterPopGrowth] = useState(1.0);
  const [waterRainReduction, setWaterRainReduction] = useState(0);
  const [waterSelectedSource, setWaterSelectedSource] = useState(null);

  // Territory map state
  const [mapPeriodIdx, setMapPeriodIdx] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playRef = useRef(null);

  // ── Scholarly tooltip renderer & icons ─────────────────────────
  const TipBox = (key) => {
    if (tipId !== key) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(10,9,8,.94)', border: '1px solid rgba(196,160,64,.15)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(212,203,176,.65)', lineHeight: 1.65, margin: '6px 0 10px' }}>
        {ME_TIPS[key]}
      </div>
    );
  };

  const ExodusIcon = (
    <svg width={24} height={20} viewBox="0 0 24 20" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'nakba' ? null : 'nakba')}>
      <circle cx={6} cy={6} r={3} fill="none" stroke="currentColor" strokeWidth=".7" />
      <circle cx={12} cy={8} r={3} fill="none" stroke="currentColor" strokeWidth=".7" />
      <circle cx={18} cy={6} r={3} fill="none" stroke="currentColor" strokeWidth=".7" />
      <path d="M4 14 L20 14" stroke="currentColor" strokeWidth=".4" />
      <path d="M6 14 L4 18 M12 14 L10 18 M18 14 L16 18" stroke="currentColor" strokeWidth=".4" />
    </svg>
  );

  const HandshakeIcon = (
    <svg width={24} height={20} viewBox="0 0 24 20" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'oslo_handshake' ? null : 'oslo_handshake')}>
      <path d="M2 10 L8 10 L12 7 L16 10 L22 10" fill="none" stroke="currentColor" strokeWidth=".8" />
      <path d="M8 10 L8 16" fill="none" stroke="currentColor" strokeWidth=".5" />
      <path d="M16 10 L16 16" fill="none" stroke="currentColor" strokeWidth=".5" />
      <circle cx={12} cy={7} r={2} fill="none" stroke="currentColor" strokeWidth=".6" />
    </svg>
  );

  const SummitIcon = (
    <svg width={22} height={22} viewBox="0 0 22 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'camp_david' ? null : 'camp_david')}>
      <path d="M3 18 L11 4 L19 18Z" fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={7} y1={14} x2={15} y2={14} stroke="currentColor" strokeWidth=".5" />
      <circle cx={11} cy={10} r={2} fill="none" stroke="currentColor" strokeWidth=".5" strokeDasharray="1 1" />
    </svg>
  );

  const PartitionIcon = (
    <svg width={22} height={22} viewBox="0 0 22 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'un181' ? null : 'un181')}>
      <rect x={2} y={2} width={18} height={18} rx={2} fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={11} y1={2} x2={11} y2={20} stroke="currentColor" strokeWidth=".6" strokeDasharray="2 1" />
      <text x={6.5} y={13} textAnchor="middle" fontSize={6} fill="currentColor" fillOpacity=".25">A</text>
      <text x={15.5} y={13} textAnchor="middle" fontSize={6} fill="currentColor" fillOpacity=".25">B</text>
    </svg>
  );

  const toggleNarrative = useCallback((id) => {
    setExpandedNarratives(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleDoc = useCallback((id) => {
    setExpandedDocs(prev => prev === id ? null : id);
  }, []);

  const exploredCount = useMemo(
    () => Object.values(expandedNarratives).filter(Boolean).length,
    [expandedNarratives],
  );

  // Play timeline auto-advance
  useEffect(() => {
    if (!isPlaying) return;
    playRef.current = setInterval(() => {
      setMapPeriodIdx(prev => {
        if (prev >= MAP_PERIODS.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => clearInterval(playRef.current);
  }, [isPlaying]);

  // ── Mode Switch ─────────────────────────────────────────────────
  const ModeSwitch = useCallback(() => {
    const modes = [
      { id: 'timeline', label: 'Timeline', desc: '7 Key Periods' },
      { id: 'narratives', label: 'Narratives', desc: 'Side-by-Side' },
      { id: 'documents', label: 'Documents', desc: '4 Key Texts' },
      { id: 'territory', label: 'Territory', desc: 'Control Map' },
      { id: 'negotiations', label: 'Negotiations', desc: 'Failure Analysis' },
      { id: 'water', label: 'Water', desc: 'Resource Conflict' },
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

  // ── Timeline Renderer ─────────────────────────────────────────────
  const renderTimeline = useCallback(() => {
    const period = PERIODS[activePeriod];
    const isExplored = expandedNarratives[period.id];
    return (
      <div>
        {/* Period selector */}
        <div style={{
          display: 'flex', gap: 3, marginBottom: 20, overflowX: 'auto',
          paddingBottom: 4,
        }}>
          {PERIODS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActivePeriod(i)}
              style={{
                flex: '0 0 auto', padding: '8px 12px', borderRadius: 4, cursor: 'pointer',
                background: i === activePeriod ? C.accentBg : 'transparent',
                border: i === activePeriod
                  ? '1px solid ' + C.accentDm
                  : '1px solid ' + C.line,
                transition: 'all .12s ease', whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 12, fontWeight: 600,
                color: i === activePeriod ? C.accent : C.tx3,
                display: 'block',
              }}>
                {p.era}
              </span>
              <span style={{
                fontFamily: Sans, fontSize: 11,
                color: i === activePeriod ? C.tx2 : C.tx3,
              }}>
                {p.title.length > 22 ? p.title.slice(0, 22) + '\u2026' : p.title}
              </span>
            </button>
          ))}
        </div>

        {/* Period card */}
        <div style={{
          background: C.card, border: '1px solid ' + C.cardBd,
          borderRadius: 8, padding: 28, marginBottom: 16,
        }}>
          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.1em',
              color: C.accentDm, marginBottom: 6, textTransform: 'uppercase',
            }}>
              Period {period.num} of 7 {'\—'} {period.era}
            </div>
            <h2 style={{
              fontFamily: Serif, fontSize: 26, fontWeight: 700,
              color: C.tx, marginBottom: 10, letterSpacing: '-.02em',
            }}>
              {period.title}{ExodusIcon}
            </h2>
            {TipBox('nakba')}
          </div>

          {/* Factual summary */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
              color: C.tx3, marginBottom: 8, fontWeight: 600,
            }}>
              FACTUAL SUMMARY {'\—'} AGREED-UPON EVENTS
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
              paddingLeft: 16, borderLeft: '3px solid ' + C.accentDm,
            }}>
              {period.factual}
            </div>
          </div>

          {/* Reveal narratives button / dual narratives */}
          {!isExplored ? (
            <button
              onClick={() => toggleNarrative(period.id)}
              style={{
                width: '100%', padding: '14px 20px', borderRadius: 6,
                background: C.accentBg, border: '1px solid ' + C.accentDm,
                color: C.accent, fontFamily: Mono, fontSize: 12,
                letterSpacing: '.04em', cursor: 'pointer',
                transition: 'all .15s ease',
              }}
            >
              {'\u2696'} EXAMINE DUAL NARRATIVES{HandshakeIcon}
            </button>
          ) : (
            <div>
              {/* Israeli Narrative */}
              <div style={{
                background: C.blueBg, borderRadius: 6, padding: '16px 20px',
                border: '1px solid ' + C.blueDm, marginBottom: 14,
              }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                  color: C.blue, marginBottom: 8, fontWeight: 600,
                }}>
                  ISRAELI NARRATIVE
                </div>
                <div style={{
                  fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75,
                }}>
                  {period.israeliNarrative}
                </div>
                <div style={{
                  marginTop: 12, padding: '10px 14px',
                  background: 'rgba(80,128,168,.05)', borderRadius: 4,
                  border: '1px solid rgba(80,128,168,.12)',
                }}>
                  <div style={{
                    fontFamily: Mono, fontSize: 12, letterSpacing: '.08em',
                    color: C.blueDm, marginBottom: 4,
                  }}>
                    CRITICAL FAILURE (ISRAELI VIEW)
                  </div>
                  <div style={{
                    fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6,
                  }}>
                    {period.israeliFailure}
                  </div>
                </div>
              </div>

              <NarrativeDivider />
              {/* Palestinian Narrative */}
              <div style={{
                background: C.oliveBg, borderRadius: 6, padding: '16px 20px',
                border: '1px solid ' + C.oliveDm, marginBottom: 14,
              }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                  color: C.olive, marginBottom: 8, fontWeight: 600,
                }}>
                  PALESTINIAN NARRATIVE
                </div>
                <div style={{
                  fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.75,
                }}>
                  {period.palestinianNarrative}
                </div>
                <div style={{
                  marginTop: 12, padding: '10px 14px',
                  background: 'rgba(122,144,80,.05)', borderRadius: 4,
                  border: '1px solid rgba(122,144,80,.12)',
                }}>
                  <div style={{
                    fontFamily: Mono, fontSize: 12, letterSpacing: '.08em',
                    color: C.oliveDm, marginBottom: 4,
                  }}>
                    CRITICAL FAILURE (PALESTINIAN VIEW)
                  </div>
                  <div style={{
                    fontFamily: Sans, fontSize: 12, color: C.tx2, lineHeight: 1.6,
                  }}>
                    {period.palestinianFailure}
                  </div>
                </div>
              </div>

              {/* Key Documents */}
              <div style={{
                background: C.terraBg, borderRadius: 6, padding: '14px 18px',
                border: '1px solid ' + C.line,
              }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                  color: C.terraDm, marginBottom: 8,
                }}>
                  KEY DOCUMENTS / AGREEMENTS
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {period.documents.map((d, i) => (
                    <li key={i} style={{
                      fontFamily: Sans, fontSize: 12, color: C.tx2,
                      lineHeight: 1.65, padding: '3px 0 3px 14px',
                      borderLeft: '2px solid ' + C.line,
                      marginBottom: 3,
                    }}>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: Mono, fontSize: 12, color: C.tx3,
        }}>
          <span>PERIODS EXPLORED</span>
          <div style={{
            flex: 1, maxWidth: 160, height: 4,
            background: C.line, borderRadius: 2,
          }}>
            <div style={{
              width: (exploredCount / 7 * 100) + '%',
              height: '100%', borderRadius: 2,
              background: exploredCount === 7 ? C.olive : C.accent,
              transition: 'width .3s ease',
            }} />
          </div>
          <span style={{ color: exploredCount === 7 ? C.olive : C.accent }}>
            {exploredCount}/7
          </span>
        </div>
      </div>
    );
  }, [activePeriod, expandedNarratives, exploredCount, toggleNarrative]);

  // ── Narratives Renderer (side-by-side comparison) ─────────────────
  const renderNarratives = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          DUAL-NARRATIVE COMPARISON {'\—'} SAME EVENTS, DIFFERENT FRAMEWORKS{SummitIcon}
        </div>
        {TipBox('oslo_handshake')}
        {TipBox('camp_david')}
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 16, maxWidth: 720,
        }}>
          The same historical events are understood through fundamentally different
          frameworks of meaning. What follows is not "balance" in the sense of splitting
          the difference, but scholarly acknowledgment that both narratives are internally
          coherent, grounded in real experience, and held with deep conviction.
        </div>

        {/* Filter toggle */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {[
            { id: 'both', label: 'Both Narratives' },
            { id: 'israeli', label: 'Israeli Lens' },
            { id: 'palestinian', label: 'Palestinian Lens' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setNarrativeSide(s.id)}
              style={{
                padding: '6px 14px', borderRadius: 4, cursor: 'pointer',
                background: narrativeSide === s.id ? C.accentBg : 'transparent',
                border: narrativeSide === s.id ? '1px solid ' + C.accentDm : '1px solid ' + C.line,
                fontFamily: Mono, fontSize: 12, letterSpacing: '.03em',
                color: narrativeSide === s.id ? C.accent : C.tx3,
                transition: 'all .12s ease',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Period comparison cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PERIODS.map(period => (
            <div key={period.id} style={{
              background: C.card, border: '1px solid ' + C.cardBd,
              borderRadius: 8, padding: 24,
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                marginBottom: 16, flexWrap: 'wrap', gap: 8,
              }}>
                <h3 style={{
                  fontFamily: Serif, fontSize: 18, fontWeight: 600,
                  color: C.tx, letterSpacing: '-.01em', margin: 0,
                }}>
                  {period.title}
                </h3>
                <span style={{
                  fontFamily: Mono, fontSize: 12, color: C.accentDm,
                }}>
                  {period.era}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: narrativeSide === 'both' ? '1fr 1fr' : '1fr',
                gap: 14,
              }}>
                {(narrativeSide === 'both' || narrativeSide === 'israeli') && (
                  <div style={{
                    background: 'rgba(80,128,168,.08)', borderRadius: 6, padding: '16px 18px',
                    border: '1px solid rgba(80,128,168,.25)',
                    borderTop: '3px solid ' + C.blue,
                  }}>
                    <div style={{
                      fontFamily: Mono, fontSize: 12, letterSpacing: '.1em',
                      color: C.blue, marginBottom: 8, fontWeight: 600,
                    }}>
                      ISRAELI NARRATIVE
                    </div>
                    <div style={{
                      fontFamily: Serif, fontSize: 12, color: C.tx,
                      lineHeight: 1.7,
                    }}>
                      {period.israeliNarrative}
                    </div>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, color: C.blueDm,
                      marginTop: 10, fontStyle: 'italic',
                    }}>
                      Critical failure: {period.israeliFailure}
                    </div>
                  </div>
                )}

                {(narrativeSide === 'both' || narrativeSide === 'palestinian') && (
                  <div style={{
                    background: 'rgba(122,144,80,.08)', borderRadius: 6, padding: '16px 18px',
                    border: '1px solid rgba(122,144,80,.25)',
                    borderTop: '3px solid ' + C.olive,
                  }}>
                    <div style={{
                      fontFamily: Mono, fontSize: 12, letterSpacing: '.1em',
                      color: C.olive, marginBottom: 8, fontWeight: 600,
                    }}>
                      PALESTINIAN NARRATIVE
                    </div>
                    <div style={{
                      fontFamily: Serif, fontSize: 12, color: C.tx,
                      lineHeight: 1.7,
                    }}>
                      {period.palestinianNarrative}
                    </div>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, color: C.oliveDm,
                      marginTop: 10, fontStyle: 'italic',
                    }}>
                      Critical failure: {period.palestinianFailure}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }, [narrativeSide]);

  // ── Documents Renderer ────────────────────────────────────────────
  const renderDocuments = useCallback(() => {
    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          PRIMARY DOCUMENTS {'\—'} 4 TEXTS THAT SHAPED THE CONFLICT{PartitionIcon}
        </div>
        {TipBox('un181')}
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          These four documents define the legal, diplomatic, and moral framework
          within which both sides argue their claims. Each is read differently by
          the two parties, illustrating how the same text can sustain opposing
          interpretations.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {DOCUMENTS.map(doc => {
            const isOpen = expandedDocs === doc.id;
            return (
              <div
                key={doc.id}
                style={{
                  background: C.card,
                  border: '1px solid ' + (isOpen ? C.accentDm : C.cardBd),
                  borderRadius: 8, overflow: 'hidden',
                  transition: 'border-color .15s ease',
                }}
              >
                <button
                  onClick={() => toggleDoc(doc.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', cursor: 'pointer',
                    background: 'none', border: 'none', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 14, width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.accentBg, borderRadius: 6,
                    border: '1px solid ' + C.line, flexShrink: 0,
                    fontFamily: Mono, fontWeight: 700, color: C.accent,
                  }}>
                    {doc.year}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: Serif, fontSize: 16, fontWeight: 600,
                      color: C.tx, letterSpacing: '-.01em',
                    }}>
                      {doc.name}
                    </div>
                    <div style={{
                      fontFamily: Mono, fontSize: 11, color: C.tx3,
                      letterSpacing: '.04em',
                    }}>
                      {doc.type}
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
                    {/* Summary */}
                    <div style={{
                      fontFamily: Serif, fontSize: 14, color: C.tx,
                      lineHeight: 1.75, marginBottom: 16,
                    }}>
                      {doc.summary}
                    </div>

                    {/* Significance */}
                    <div style={{
                      background: C.accentBg, borderRadius: 6, padding: '12px 16px',
                      border: '1px solid ' + C.line, marginBottom: 14,
                    }}>
                      <div style={{
                        fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
                        color: C.accentDm, marginBottom: 6,
                      }}>
                        SIGNIFICANCE
                      </div>
                      <div style={{
                        fontFamily: Serif, fontSize: 13, color: C.accent,
                        lineHeight: 1.7,
                      }}>
                        {doc.significance}
                      </div>
                    </div>

                    {/* Dual readings */}
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                      marginBottom: 14,
                    }}>
                      <div style={{
                        background: C.blueBg, borderRadius: 6, padding: '12px 14px',
                        border: '1px solid ' + C.blueDm,
                      }}>
                        <div style={{
                          fontFamily: Mono, fontSize: 12, letterSpacing: '.1em',
                          color: C.blue, marginBottom: 6, fontWeight: 600,
                        }}>
                          ISRAELI READING
                        </div>
                        <div style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx,
                          lineHeight: 1.65,
                        }}>
                          {doc.israeliReading}
                        </div>
                      </div>
                      <div style={{
                        background: C.oliveBg, borderRadius: 6, padding: '12px 14px',
                        border: '1px solid ' + C.oliveDm,
                      }}>
                        <div style={{
                          fontFamily: Mono, fontSize: 12, letterSpacing: '.1em',
                          color: C.olive, marginBottom: 6, fontWeight: 600,
                        }}>
                          PALESTINIAN READING
                        </div>
                        <div style={{
                          fontFamily: Sans, fontSize: 12, color: C.tx,
                          lineHeight: 1.65,
                        }}>
                          {doc.palestinianReading}
                        </div>
                      </div>
                    </div>

                    {/* Scholarly note */}
                    <div style={{
                      fontStyle: 'italic', fontFamily: Serif, fontSize: 12,
                      color: C.tx2, lineHeight: 1.7, paddingLeft: 16,
                      borderLeft: '2px solid ' + C.line,
                    }}>
                      {doc.scholarlyNote}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [expandedDocs, toggleDoc]);

  // ── Territory Map Renderer ──────────────────────────────────────────
  const renderTerritory = useCallback(() => {
    const currentPeriod = MAP_PERIODS[mapPeriodIdx];
    const control = TERRITORY_CONTROL[currentPeriod.id];
    const arrows = REFUGEE_ARROWS[currentPeriod.id] || [];
    const dots = SETTLEMENT_DOTS[currentPeriod.id] || [];
    const pop = MAP_POPULATION[currentPeriod.id];

    // Collect unique control types for this period's legend
    const activeControls = {};
    Object.values(control).forEach(c => { activeControls[c] = true; });

    return (
      <div>
        <div style={{
          fontFamily: Mono, fontSize: 12, letterSpacing: '.06em',
          color: C.accentDm, marginBottom: 6,
        }}>
          TERRITORIAL CONTROL MAP {'\—'} 7 PERIODS, 100 YEARS OF CHANGE
        </div>
        <div style={{
          fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.7,
          marginBottom: 20, maxWidth: 720,
        }}>
          Territorial control has changed fundamentally five times in one hundred years.
          Each change created facts on the ground that constrained the next negotiation.
          Select a period to see how control shifted. Click any region for details.
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {/* SVG Map — Visual Centerpiece */}
          <div style={{ flex: '1 1 460px', minWidth: 360 }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(24,20,12,.95), rgba(30,24,14,.95))',
              border: '2px solid rgba(196,160,64,.2)',
              borderRadius: 10, padding: 20,
              boxShadow: '0 8px 32px rgba(0,0,0,.4), inset 0 1px 0 rgba(196,160,64,.08)',
            }}>
              {/* Period title above map */}
              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, letterSpacing: '.1em',
                  color: C.accentDm, textTransform: 'uppercase',
                }}>
                  {currentPeriod.year}
                </div>
                <div style={{
                  fontFamily: Serif, fontSize: 20, fontWeight: 700,
                  color: C.tx, letterSpacing: '-.02em',
                }}>
                  {currentPeriod.label}
                </div>
              </div>

              <svg
                viewBox="0 0 400 520"
                style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto' }}
              >
                {/* Background */}
                <rect x="0" y="0" width="400" height="520" fill="transparent" />

                {/* Water hint (Mediterranean) */}
                <path d="M 0,0 L 40,0 L 30,260 L 20,340 L 0,500 L 0,0 Z" fill="rgba(60,80,120,.15)" />
                <text x="8" y="200" fill="rgba(60,80,120,.3)" fontFamily={Mono} fontSize="9" transform="rotate(-90, 8, 200)">
                  Mediterranean Sea
                </text>

                {/* Regions */}
                {Object.entries(MAP_REGIONS).map(([key, region]) => {
                  const status = control[key];
                  const color = CONTROL_COLORS[status] || '#555';
                  const isSelected = selectedRegion === key;
                  return (
                    <g key={key}>
                      <path
                        d={region.path}
                        fill={color}
                        fillOpacity={isSelected ? 0.9 : 0.6}
                        stroke={isSelected ? '#fff' : 'rgba(255,255,255,.2)'}
                        strokeWidth={isSelected ? 2 : 0.8}
                        style={{ cursor: 'pointer', transition: 'fill-opacity .3s ease, fill .3s ease' }}
                        onClick={() => setSelectedRegion(prev => prev === key ? null : key)}
                      />
                      <text
                        x={region.cx}
                        y={region.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="rgba(255,255,255,.85)"
                        fontFamily={Sans}
                        fontSize="9"
                        fontWeight="600"
                        style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,.7)' }}
                      >
                        {region.label}
                      </text>
                    </g>
                  );
                })}

                {/* Refugee arrows */}
                {arrows.length > 0 && (
                  <defs>
                    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="#e05040" />
                    </marker>
                  </defs>
                )}
                {arrows.map((arrow, i) => (
                  <g key={'arrow-' + i}>
                    <line
                      x1={arrow.from[0]} y1={arrow.from[1]}
                      x2={arrow.to[0]} y2={arrow.to[1]}
                      stroke="#e05040" strokeWidth="2" strokeDasharray="6,3"
                      markerEnd="url(#arrowhead)" opacity="0.7"
                    />
                    <text
                      x={(arrow.from[0] + arrow.to[0]) / 2 + 8}
                      y={(arrow.from[1] + arrow.to[1]) / 2}
                      fill="#e05040" fontFamily={Mono} fontSize="7" opacity="0.8"
                    >
                      {arrow.label}
                    </text>
                  </g>
                ))}

                {/* Settlement dots */}
                {dots.map((dot, i) => (
                  <circle
                    key={'dot-' + i}
                    cx={dot.x} cy={dot.y} r={2.5}
                    fill="#f0d060" stroke="rgba(0,0,0,.4)" strokeWidth="0.5"
                    opacity="0.85"
                  />
                ))}

                {/* Border/frame */}
                <rect x="0" y="0" width="400" height="520" fill="none" stroke="rgba(196,160,64,.15)" strokeWidth="1" />
              </svg>

              {/* Legend */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '6px 14px',
                marginTop: 14, justifyContent: 'center',
              }}>
                {Object.entries(activeControls).map(([key]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: 2,
                      background: CONTROL_COLORS[key], opacity: 0.7,
                    }} />
                    <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
                      {CONTROL_LABELS[key]}
                    </span>
                  </div>
                ))}
                {arrows.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 14, height: 2, background: '#e05040', borderRadius: 1 }} />
                    <span style={{ fontFamily: Mono, fontSize: 12, color: '#e05040' }}>Refugee displacement</span>
                  </div>
                )}
                {dots.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f0d060' }} />
                    <span style={{ fontFamily: Mono, fontSize: 12, color: '#f0d060' }}>Settlements</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div style={{ flex: '1 1 280px', minWidth: 240 }}>
            {/* Region detail */}
            {selectedRegion && (
              <div style={{
                background: C.card, border: '1px solid ' + C.cardBd,
                borderRadius: 8, padding: 18, marginBottom: 16,
              }}>
                <div style={{
                  fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                  color: C.accentDm, marginBottom: 6,
                }}>
                  SELECTED REGION
                </div>
                <div style={{
                  fontFamily: Serif, fontSize: 18, fontWeight: 700,
                  color: C.tx, marginBottom: 8,
                }}>
                  {MAP_REGIONS[selectedRegion].label}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: 3,
                    background: CONTROL_COLORS[control[selectedRegion]],
                  }} />
                  <span style={{
                    fontFamily: Sans, fontSize: 13, color: C.tx,
                  }}>
                    {CONTROL_LABELS[control[selectedRegion]]}
                  </span>
                </div>
                <div style={{
                  fontFamily: Mono, fontSize: 12, color: C.tx3, marginTop: 6,
                }}>
                  Period: {currentPeriod.label} ({currentPeriod.year})
                </div>
              </div>
            )}

            {/* Period description */}
            <div style={{
              background: C.card, border: '1px solid ' + C.cardBd,
              borderRadius: 8, padding: 18, marginBottom: 16,
            }}>
              <div style={{
                fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                color: C.accentDm, marginBottom: 6,
              }}>
                PERIOD CONTEXT
              </div>
              <div style={{
                fontFamily: Serif, fontSize: 13, color: C.tx, lineHeight: 1.7,
              }}>
                {currentPeriod.description}
              </div>
            </div>

            {/* Population */}
            <div style={{
              background: C.card, border: '1px solid ' + C.cardBd,
              borderRadius: 8, padding: 18, marginBottom: 16,
            }}>
              <div style={{
                fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
                color: C.accentDm, marginBottom: 6,
              }}>
                POPULATION
              </div>
              <div style={{
                fontFamily: Mono, fontSize: 11, color: C.tx2, lineHeight: 1.8,
              }}>
                {pop}
              </div>
            </div>
          </div>
        </div>

        {/* Period selector buttons */}
        <div style={{
          display: 'flex', gap: 3, marginTop: 20, overflowX: 'auto',
          paddingBottom: 4, alignItems: 'center',
        }}>
          {/* Play button */}
          <button
            onClick={() => {
              if (isPlaying) {
                setIsPlaying(false);
              } else {
                setMapPeriodIdx(0);
                setIsPlaying(true);
              }
            }}
            style={{
              flex: '0 0 auto', padding: '8px 14px', borderRadius: 4, cursor: 'pointer',
              background: isPlaying ? C.redBg : C.accentBg,
              border: '1px solid ' + (isPlaying ? C.redDm : C.accentDm),
              fontFamily: Mono, fontSize: 12, fontWeight: 600,
              color: isPlaying ? C.red : C.accent,
              transition: 'all .12s ease', whiteSpace: 'nowrap',
            }}
          >
            {isPlaying ? '\u25A0 Stop' : '\u25B6 Play Timeline'}
          </button>

          {MAP_PERIODS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setMapPeriodIdx(i); setIsPlaying(false); }}
              style={{
                flex: '0 0 auto', padding: '8px 12px', borderRadius: 4, cursor: 'pointer',
                background: i === mapPeriodIdx ? C.accentBg : 'transparent',
                border: i === mapPeriodIdx
                  ? '1px solid ' + C.accentDm
                  : '1px solid ' + C.line,
                transition: 'all .12s ease', whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: Mono, fontSize: 12, fontWeight: 600,
                color: i === mapPeriodIdx ? C.accent : C.tx3,
                display: 'block',
              }}>
                {p.year}
              </span>
              <span style={{
                fontFamily: Sans, fontSize: 11,
                color: i === mapPeriodIdx ? C.tx2 : C.tx3,
              }}>
                {p.label.length > 18 ? p.label.slice(0, 18) + '\u2026' : p.label}
              </span>
            </button>
          ))}
        </div>

        {/* Timeline progress bar */}
        <div style={{
          marginTop: 12, height: 4, background: C.line, borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            width: ((mapPeriodIdx + 1) / MAP_PERIODS.length * 100) + '%',
            height: '100%', borderRadius: 2,
            background: C.accent,
            transition: 'width .4s ease',
          }} />
        </div>

        {/* Key insight */}
        <div style={{
          marginTop: 24, padding: '16px 20px', borderRadius: 8,
          background: C.terraBg, border: '1px solid ' + C.line,
        }}>
          <div style={{
            fontFamily: Mono, fontSize: 11, letterSpacing: '.08em',
            color: C.terraDm, marginBottom: 8,
          }}>
            KEY INSIGHT
          </div>
          <div style={{
            fontFamily: Serif, fontSize: 14, color: C.tx, lineHeight: 1.75,
            paddingLeft: 16, borderLeft: '3px solid ' + C.terraDm,
          }}>
            The territorial reality has changed fundamentally five times in one hundred years.
            Each change created facts on the ground that constrained the next negotiation.
            The map IS the argument {'\—'} geography determines what peace looks like.
            From a single Ottoman province to the fragmented patchwork of today, the progressive
            division and re-division of this land has made each successive peace proposal more
            constrained than the last.
          </div>
        </div>
      </div>
    );
  }, [mapPeriodIdx, selectedRegion, isPlaying]);

  // ── Negotiations Renderer ──────────────────────────────────────────
  const NEGOTIATIONS = useMemo(() => [
    { id: 'camp_david', name: 'Camp David 2000', year: 2000,
      parties: 'Barak / Arafat / Clinton',
      offered: 'Israel offered ~91% of West Bank, Palestinian state with limited sovereignty, shared arrangements in Jerusalem, Israeli retention of major settlement blocs, no return to 1967 borders in Jerusalem.',
      rejected: 'Palestinians rejected: no contiguous state, no sovereignty over East Jerusalem (including Haram al-Sharif/Temple Mount), no right of return, security zones fragmenting territory.',
      obstacles: ['jerusalem', 'refugees', 'borders', 'security'],
      why: 'The offer required Palestinians to accept permanent Israeli control over the Old City and refugee renunciation without compensation framework. Barak presented it as take-it-or-leave-it. The gaps on Jerusalem and refugees were unbridgeable within the summit format.' },
    { id: 'taba', name: 'Taba 2001', year: 2001,
      parties: 'Negotiating teams (post-Camp David)',
      offered: 'Closest to agreement ever reached: ~97% of West Bank with land swaps, shared sovereignty in Jerusalem Old City, limited refugee return (tens of thousands over years), international force in Jordan Valley.',
      rejected: 'Ran out of time. Israeli elections ended talks. Barak lost to Sharon. Neither side formally rejected the other\'s position -- the political calendar killed it.',
      obstacles: ['jerusalem', 'refugees'],
      why: 'Taba demonstrated that professional negotiators COULD bridge most gaps. But negotiations required political cover that neither leader had. Barak was a lame duck; Arafat could not sell partial refugee return. Structural obstacle: democratic legitimacy timelines vs negotiation timelines.' },
    { id: 'annapolis', name: 'Annapolis 2007', year: 2007,
      parties: 'Olmert / Abbas / Bush',
      offered: 'Olmert offered 93.5% of West Bank with 5.8% land swap, division of Jerusalem along demographic lines (Jewish neighborhoods to Israel, Arab to Palestine), international trusteeship for Old City, symbolic refugee return of 5,000 over 5 years.',
      rejected: 'Abbas never formally responded. The offer was verbal, never written. Abbas later said he could not accept without studying maps he was shown but not given. Olmert resigned over corruption charges.',
      obstacles: ['jerusalem', 'refugees', 'borders'],
      why: 'The most generous offer in the conflict\'s history died because of domestic politics on both sides. Olmert lacked political legitimacy (corruption scandal). Abbas feared being seen as the leader who traded away refugee rights. Structure: leaders who can negotiate lack mandates; leaders with mandates cannot negotiate.' },
    { id: 'kerry', name: 'Kerry Framework 2013-14', year: 2013,
      parties: 'Netanyahu / Abbas / Kerry',
      offered: 'Kerry proposed: 1967 lines with swaps, phased Israeli withdrawal, Palestinian capital in East Jerusalem, security arrangements with international presence, agreed compensation mechanism for refugees (no mass return).',
      rejected: 'Netanyahu rejected 1967 baseline. Abbas rejected no right of return. Settlement expansion continued throughout talks. Both sides accused the other of bad faith. Israel released prisoners as talks incentive, then announced new settlements.',
      obstacles: ['jerusalem', 'refugees', 'borders', 'security'],
      why: 'All four structural obstacles were active simultaneously. Netanyahu\'s coalition included settlers who would topple government over concessions. Abbas could not survive politically accepting refugee compensation-not-return. Nine months of talks produced zero written agreements. Structure: coalition politics make territorial compromise coalition-ending.' },
    { id: 'trump', name: 'Trump Plan 2020', year: 2020,
      parties: 'Trump / Netanyahu (Palestinians excluded)',
      offered: 'Palestinian state on ~70% of West Bank (non-contiguous), Israeli sovereignty over Jordan Valley and all settlements, Jerusalem as undivided Israeli capital, no refugee return, Palestinian capital in Abu Dis (outside Jerusalem municipal boundary).',
      rejected: 'Palestinians rejected entirely and refused to participate. Plan was developed with Israeli input only. Offered less than any previous proposal. International community largely dismissed it.',
      obstacles: ['jerusalem', 'refugees', 'borders', 'security'],
      why: 'Demonstrated that bypassing one party produces proposals the other cannot accept. The plan gave Israel everything it wanted on all four structural issues, making Palestinian acceptance structurally impossible. Revealed that "deal-making" frameworks fail when they ignore the structural equilibrium both sides must accept.' },
  ], []);

  const STRUCTURAL_OBSTACLES = useMemo(() => ({
    jerusalem: { label: 'Jerusalem', color: C.accent, desc: 'Both sides claim sovereignty over the Old City. Religious sites (Haram al-Sharif/Temple Mount) cannot be divided without alienating core constituencies on both sides.' },
    refugees: { label: 'Refugees', color: C.blue, desc: 'Right of return for ~5.9 million registered refugees. Israel sees mass return as demographic threat to Jewish state; Palestinians see it as fundamental right under international law.' },
    borders: { label: 'Borders', color: C.olive, desc: '1967 lines vs current settlement reality. 700,000+ settlers in West Bank and East Jerusalem create facts on the ground that make contiguous Palestinian state increasingly difficult.' },
    security: { label: 'Security', color: C.red, desc: 'Israel demands demilitarized Palestinian state, control of airspace, Jordan Valley presence. Palestinians see these as negating sovereignty. Neither side trusts the other to maintain agreements.' },
  }), []);

  const renderNegotiations = useCallback(() => {
    const nego = NEGOTIATIONS[negoSelected];
    var obstacleKeys = ['jerusalem', 'refugees', 'borders', 'security'];
    var userAnswerSet = negoUserAnswers[nego.id] || {};
    var isRevealed = negoRevealed[nego.id];
    var userCorrect = 0;
    var userTotal = Object.keys(userAnswerSet).length;
    if (isRevealed) {
      obstacleKeys.forEach(function(k) { if (userAnswerSet[k] && nego.obstacles.indexOf(k) !== -1) userCorrect++; });
    }
    var allNegosRevealed = NEGOTIATIONS.filter(function(n) { return negoRevealed[n.id]; }).length;

    return (
      <div>
        {/* Insight banner */}
        {allNegosRevealed === 5 && (
          <div style={{ padding: 16, marginBottom: 20, background: 'rgba(196,160,64,.08)', border: '1px solid rgba(196,160,64,.2)', borderRadius: 4 }}>
            <div style={{ fontFamily: Serif, fontSize: 15, color: C.accent, marginBottom: 6 }}>Pattern Revealed: Structural Lock-In</div>
            <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>
              Across 20 years and 5 major attempts, the same 4 structural obstacles blocked every negotiation.
              Personalities changed (Barak, Olmert, Netanyahu, Arafat, Abbas), mediators changed (Clinton, Bush, Kerry, Trump),
              formats changed (summits, frameworks, unilateral plans) -- but Jerusalem, refugees, borders, and security
              remained immovable. This is not a failure of diplomacy; it is a structural equilibrium that diplomacy alone cannot break.
            </div>
          </div>
        )}

        {/* Negotiation selector */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, flexWrap: 'wrap' }}>
          {NEGOTIATIONS.map(function(n, i) {
            var active = i === negoSelected;
            var done = negoRevealed[n.id];
            return (
              <button key={n.id} onClick={function() { setNegoSelected(i); }}
                style={{ flex: '1 1 auto', minWidth: 100, padding: '8px 10px', borderRadius: 4, cursor: 'pointer',
                  background: active ? C.accentBg : 'transparent',
                  border: active ? '1px solid ' + C.accentDm : '1px solid ' + C.line,
                  textAlign: 'center', transition: 'all .15s ease' }}>
                <span style={{ fontFamily: Mono, fontSize: 11, fontWeight: 600, color: active ? C.accent : C.tx3, display: 'block' }}>
                  {n.year}
                </span>
                <span style={{ fontFamily: Sans, fontSize: 11, color: done ? C.olive : C.tx3 }}>
                  {n.name} {done ? ' [done]' : ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected negotiation detail */}
        <div style={{ background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 20, marginBottom: 16 }}>
          <div style={{ fontFamily: Serif, fontSize: 18, color: C.accent, marginBottom: 4 }}>{nego.name}</div>
          <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, marginBottom: 12 }}>{nego.parties}</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: Mono, fontSize: 11, color: C.olive, marginBottom: 4, letterSpacing: 1 }}>WHAT WAS OFFERED</div>
              <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>{nego.offered}</div>
            </div>
            <div>
              <div style={{ fontFamily: Mono, fontSize: 11, color: C.red, marginBottom: 4, letterSpacing: 1 }}>WHAT WAS REJECTED / WHAT HAPPENED</div>
              <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>{nego.rejected}</div>
            </div>
          </div>

          {/* Interactive obstacle identification */}
          <div style={{ borderTop: '1px solid ' + C.line, paddingTop: 16 }}>
            <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 10, letterSpacing: 1 }}>
              WHICH STRUCTURAL OBSTACLES BLOCKED THIS NEGOTIATION? (select all that apply)
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              {obstacleKeys.map(function(key) {
                var ob = STRUCTURAL_OBSTACLES[key];
                var selected = userAnswerSet[key];
                var correct = isRevealed && nego.obstacles.indexOf(key) !== -1;
                var wrong = isRevealed && selected && nego.obstacles.indexOf(key) === -1;
                var bgColor = isRevealed ? (correct ? 'rgba(122,144,80,.15)' : (wrong ? 'rgba(168,80,64,.15)' : 'transparent')) : (selected ? 'rgba(196,160,64,.1)' : 'transparent');
                var bdColor = isRevealed ? (correct ? C.oliveDm : (wrong ? C.redDm : C.line)) : (selected ? C.accentDm : C.line);
                return (
                  <button key={key} disabled={isRevealed}
                    onClick={function() {
                      setNegoUserAnswers(function(prev) {
                        var copy = Object.assign({}, prev);
                        var inner = Object.assign({}, copy[nego.id] || {});
                        if (inner[key]) { delete inner[key]; } else { inner[key] = true; }
                        copy[nego.id] = inner;
                        return copy;
                      });
                    }}
                    style={{ padding: '8px 16px', borderRadius: 4, cursor: isRevealed ? 'default' : 'pointer',
                      background: bgColor, border: '1px solid ' + bdColor, transition: 'all .15s ease', opacity: isRevealed && !correct && !selected ? 0.5 : 1 }}>
                    <span style={{ fontFamily: Mono, fontSize: 12, color: ob.color }}>{ob.label}</span>
                  </button>
                );
              })}
            </div>
            {!isRevealed && (
              <button onClick={function() { setNegoRevealed(function(prev) { var c = Object.assign({}, prev); c[nego.id] = true; return c; }); }}
                style={{ padding: '8px 20px', borderRadius: 4, cursor: 'pointer', background: C.accentBg, border: '1px solid ' + C.accentDm, fontFamily: Mono, fontSize: 12, color: C.accent }}>
                Reveal Answer
              </button>
            )}
            {isRevealed && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, marginBottom: 6 }}>
                  Your accuracy: {userCorrect}/{nego.obstacles.length} obstacles correctly identified
                </div>
                <div style={{ fontFamily: Mono, fontSize: 11, color: C.terra, marginBottom: 8, letterSpacing: 1 }}>WHY IT FAILED (STRUCTURAL ANALYSIS)</div>
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx, lineHeight: 1.6, padding: 12, background: C.sandLight, borderRadius: 4 }}>
                  {nego.why}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Obstacle reference */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {obstacleKeys.map(function(key) {
            var ob = STRUCTURAL_OBSTACLES[key];
            var hitCount = NEGOTIATIONS.filter(function(n) { return n.obstacles.indexOf(key) !== -1; }).length;
            return (
              <div key={key} style={{ padding: 12, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontFamily: Mono, fontSize: 12, color: ob.color }}>{ob.label}</span>
                  <span style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>Blocked {hitCount}/5 negotiations</span>
                </div>
                <div style={{ fontFamily: Sans, fontSize: 12, color: C.tx3, lineHeight: 1.5 }}>{ob.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div style={{ marginTop: 16, textAlign: 'center', fontFamily: Mono, fontSize: 12, color: C.tx3 }}>
          Negotiations analyzed: {allNegosRevealed}/5
        </div>
      </div>
    );
  }, [negoSelected, negoUserAnswers, negoRevealed, NEGOTIATIONS, STRUCTURAL_OBSTACLES]);

  // ── Water Renderer ────────────────────────────────────────────────
  const WATER_SOURCES = useMemo(() => [
    { id: 'jordan', name: 'Jordan River', baseFlow: 1287, israelShare: 0.60, palShare: 0.03, jordanShare: 0.37,
      controller: 'Israel (since 1967)',
      x: 320, y: 60, w: 40, h: 220,
      desc: 'Israel diverts most of the upper Jordan via the National Water Carrier (1964). Palestinians have no access. Jordan gets a fixed allocation under the 1994 peace treaty. The river\'s flow has dropped ~90% at its southern end.' },
    { id: 'galilee', name: 'Sea of Galilee', baseFlow: 630, israelShare: 1.0, palShare: 0.0, jordanShare: 0.0,
      controller: 'Israel (exclusive)',
      x: 280, y: 40, w: 80, h: 50,
      desc: 'Israel\'s largest freshwater reservoir. Entirely within Israeli territory. Supplies ~25% of Israel\'s water. Water levels have dropped critically in drought years, prompting desalination investment.' },
    { id: 'mountain', name: 'Mountain Aquifer', baseFlow: 679, israelShare: 0.80, palShare: 0.20, jordanShare: 0.0,
      controller: 'Israel (military control of recharge zones)',
      x: 140, y: 120, w: 120, h: 140,
      desc: 'Three sub-basins under the West Bank highlands. Israel extracts ~80% despite the aquifer recharging primarily from Palestinian territory. Palestinians need Israeli permits to drill wells. The aquifer is being over-extracted by both sides.' },
    { id: 'coastal', name: 'Coastal Aquifer', baseFlow: 450, israelShare: 0.20, palShare: 0.80, jordanShare: 0.0,
      controller: 'Gaza (depleted/contaminated)',
      x: 60, y: 200, w: 100, h: 100,
      desc: 'Gaza\'s primary water source. Over-pumped to crisis levels: 96% of water exceeds WHO safety standards. Seawater intrusion and sewage contamination make it largely undrinkable. The UN warned it would be unusable by 2020 -- it already is.' },
  ], []);

  const renderWater = useCallback(() => {
    var popFactor = waterPopGrowth;
    var rainFactor = 1 - (waterRainReduction / 100);
    var totalDemandIsrael = 1800 * popFactor;
    var totalDemandPal = 450 * popFactor;
    var totalSupply = WATER_SOURCES.reduce(function(sum, s) { return sum + s.baseFlow * rainFactor; }, 0);
    var israelSupply = WATER_SOURCES.reduce(function(sum, s) { return sum + s.baseFlow * rainFactor * s.israelShare; }, 0);
    var palSupply = WATER_SOURCES.reduce(function(sum, s) { return sum + s.baseFlow * rainFactor * s.palShare; }, 0);
    var israelGap = Math.max(0, totalDemandIsrael - israelSupply);
    var palGap = Math.max(0, totalDemandPal - palSupply);
    var selected = waterSelectedSource ? WATER_SOURCES.find(function(s) { return s.id === waterSelectedSource; }) : null;

    return (
      <div>
        <div style={{ fontFamily: Serif, fontSize: 14, color: C.tx2, lineHeight: 1.6, marginBottom: 20 }}>
          Water is the hidden dimension of the Israeli-Palestinian conflict. Control over aquifers and rivers
          determines which communities can grow, which agriculture survives, and who holds structural leverage.
          Adjust population growth and rainfall to see how climate change transforms a political dispute into an existential one.
        </div>

        {/* SVG Water Map */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          <div style={{ flex: '0 0 420px' }}>
            <svg viewBox="0 0 420 380" style={{ width: '100%', height: 'auto', background: 'rgba(20,16,8,.5)', borderRadius: 6, border: '1px solid ' + C.cardBd }}>
              {/* West Bank outline */}
              <path d="M150 50 L300 50 L320 120 L310 200 L280 280 L200 320 L140 280 L120 200 L130 120Z" fill="rgba(122,144,80,.06)" stroke="rgba(122,144,80,.2)" strokeWidth="1" strokeDasharray="4,4"/>
              <text x="210" y="180" textAnchor="middle" fill={C.tx3} style={{fontSize:10,fontFamily:Mono}}>West Bank</text>
              {/* Gaza strip */}
              <path d="M50 200 L90 200 L90 310 L50 310Z" fill="rgba(168,80,64,.06)" stroke="rgba(168,80,64,.2)" strokeWidth="1" strokeDasharray="4,4"/>
              <text x="70" y="260" textAnchor="middle" fill={C.tx3} style={{fontSize:9,fontFamily:Mono}}>Gaza</text>
              {/* Mediterranean */}
              <rect x="0" y="0" width="45" height="380" fill="rgba(80,128,168,.04)"/>
              <text x="22" y="190" textAnchor="middle" fill="rgba(80,128,168,.3)" style={{fontSize:10,fontFamily:Mono}} transform="rotate(-90,22,190)">Mediterranean</text>

              {/* Water sources */}
              {WATER_SOURCES.map(function(src) {
                var isSelected = waterSelectedSource === src.id;
                var adjustedFlow = src.baseFlow * rainFactor;
                var fillOpacity = 0.12 + (adjustedFlow / 1400) * 0.25;
                return (
                  <g key={src.id} onClick={function() { setWaterSelectedSource(isSelected ? null : src.id); }} style={{cursor:'pointer'}}>
                    {src.id === 'jordan' ? (
                      <path d={'M' + src.x + ' ' + src.y + ' Q' + (src.x+10) + ' ' + (src.y+src.h/2) + ' ' + (src.x-5) + ' ' + (src.y+src.h)}
                        fill="none" stroke={'rgba(80,128,168,' + (0.3 + fillOpacity) + ')'} strokeWidth={isSelected ? 6 : 4}/>
                    ) : src.id === 'galilee' ? (
                      <ellipse cx={src.x+src.w/2} cy={src.y+src.h/2} rx={src.w/2} ry={src.h/2}
                        fill={'rgba(80,128,168,' + fillOpacity + ')'} stroke={isSelected ? C.accent : 'rgba(80,128,168,.3)'} strokeWidth={isSelected ? 2 : 1}/>
                    ) : (
                      <rect x={src.x} y={src.y} width={src.w} height={src.h} rx="8"
                        fill={'rgba(80,128,168,' + fillOpacity + ')'} stroke={isSelected ? C.accent : 'rgba(80,128,168,.2)'} strokeWidth={isSelected ? 2 : 1}/>
                    )}
                    <text x={src.id === 'jordan' ? src.x + 20 : src.x + src.w/2} y={src.id === 'jordan' ? src.y + src.h/2 + 4 : src.y + src.h/2 + 4}
                      textAnchor="middle" fill={isSelected ? C.accent : C.tx2} style={{fontSize:10,fontFamily:Mono,pointerEvents:'none'}}>
                      {src.name}
                    </text>
                    <text x={src.id === 'jordan' ? src.x + 20 : src.x + src.w/2} y={src.id === 'jordan' ? src.y + src.h/2 + 18 : src.y + src.h/2 + 18}
                      textAnchor="middle" fill={C.tx3} style={{fontSize:9,fontFamily:Mono,pointerEvents:'none'}}>
                      {Math.round(adjustedFlow)} MCM/yr
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Controls and metrics */}
          <div style={{ flex: 1 }}>
            {/* Sliders */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 6, letterSpacing: 1 }}>POPULATION GROWTH MULTIPLIER: {popFactor.toFixed(1)}x</div>
              <input type="range" min="1.0" max="3.0" step="0.1" value={waterPopGrowth}
                onChange={function(e) { setWaterPopGrowth(parseFloat(e.target.value)); }}
                style={{ width: '100%', accentColor: C.accent }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: Mono, fontSize: 10, color: C.tx3 }}>
                <span>Current</span><span>2x (2040s)</span><span>3x (2060s)</span>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 6, letterSpacing: 1 }}>RAINFALL REDUCTION: {waterRainReduction}%</div>
              <input type="range" min="0" max="40" step="5" value={waterRainReduction}
                onChange={function(e) { setWaterRainReduction(parseInt(e.target.value)); }}
                style={{ width: '100%', accentColor: C.blue }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: Mono, fontSize: 10, color: C.tx3 }}>
                <span>Current</span><span>-20% (moderate)</span><span>-40% (severe)</span>
              </div>
            </div>

            {/* Gap meters */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ padding: 12, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 4 }}>
                <div style={{ fontFamily: Mono, fontSize: 11, color: C.blue, letterSpacing: 1 }}>ISRAEL</div>
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, marginTop: 4 }}>Supply: {Math.round(israelSupply)} MCM/yr</div>
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2 }}>Demand: {Math.round(totalDemandIsrael)} MCM/yr</div>
                <div style={{ fontFamily: Mono, fontSize: 13, color: israelGap > 0 ? C.red : C.olive, marginTop: 4 }}>
                  Gap: {israelGap > 0 ? '-' + Math.round(israelGap) : 'Surplus'}
                </div>
                <div style={{ marginTop: 6, height: 6, background: 'rgba(80,128,168,.1)', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: Math.min(100, (israelSupply / totalDemandIsrael) * 100) + '%', background: israelGap > 0 ? C.red : C.olive, borderRadius: 3, transition: 'width .3s ease' }}/>
                </div>
                <div style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, marginTop: 2 }}>Note: Israel offsets via desalination (~585 MCM/yr)</div>
              </div>
              <div style={{ padding: 12, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 4 }}>
                <div style={{ fontFamily: Mono, fontSize: 11, color: C.olive, letterSpacing: 1 }}>PALESTINE</div>
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, marginTop: 4 }}>Supply: {Math.round(palSupply)} MCM/yr</div>
                <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2 }}>Demand: {Math.round(totalDemandPal)} MCM/yr</div>
                <div style={{ fontFamily: Mono, fontSize: 13, color: palGap > 0 ? C.red : C.olive, marginTop: 4 }}>
                  Gap: {palGap > 0 ? '-' + Math.round(palGap) : 'Surplus'}
                </div>
                <div style={{ marginTop: 6, height: 6, background: 'rgba(122,144,80,.1)', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: Math.min(100, (palSupply / totalDemandPal) * 100) + '%', background: palGap > 0 ? C.red : C.olive, borderRadius: 3, transition: 'width .3s ease' }}/>
                </div>
                <div style={{ fontFamily: Mono, fontSize: 10, color: C.tx3, marginTop: 2 }}>No desalination capacity in Gaza or West Bank</div>
              </div>
            </div>

            {/* Per-capita comparison */}
            <div style={{ padding: 12, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 4 }}>
              <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3, letterSpacing: 1, marginBottom: 6 }}>PER CAPITA DAILY (liters)</div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: Mono, fontSize: 11, color: C.blue }}>Israel: ~280 L/day</div>
                  <div style={{ height: 8, background: 'rgba(80,128,168,.15)', borderRadius: 4, marginTop: 4 }}>
                    <div style={{ height: '100%', width: '93%', background: C.blue, borderRadius: 4 }}/>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: Mono, fontSize: 11, color: C.olive }}>Palestine: ~73 L/day</div>
                  <div style={{ height: 8, background: 'rgba(122,144,80,.15)', borderRadius: 4, marginTop: 4 }}>
                    <div style={{ height: '100%', width: '24%', background: C.olive, borderRadius: 4 }}/>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: Mono, fontSize: 11, color: C.tx3 }}>WHO minimum: 100 L/day</div>
                  <div style={{ height: 8, background: 'rgba(196,160,64,.15)', borderRadius: 4, marginTop: 4 }}>
                    <div style={{ height: '100%', width: '33%', background: C.accent, borderRadius: 4 }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected source detail */}
        {selected && (
          <div style={{ padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginBottom: 12 }}>
            <div style={{ fontFamily: Serif, fontSize: 16, color: C.accent, marginBottom: 4 }}>{selected.name}</div>
            <div style={{ fontFamily: Mono, fontSize: 12, color: C.tx3, marginBottom: 8 }}>Controller: {selected.controller}</div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
              <div style={{ fontFamily: Mono, fontSize: 12, color: C.blue }}>Israel: {Math.round(selected.israelShare * 100)}%</div>
              <div style={{ fontFamily: Mono, fontSize: 12, color: C.olive }}>Palestine: {Math.round(selected.palShare * 100)}%</div>
              {selected.jordanShare > 0 && <div style={{ fontFamily: Mono, fontSize: 12, color: C.terra }}>Jordan: {Math.round(selected.jordanShare * 100)}%</div>}
            </div>
            <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>{selected.desc}</div>
          </div>
        )}

        {/* Structural insight */}
        <div style={{ padding: 12, background: 'rgba(168,80,64,.05)', border: '1px solid rgba(168,80,64,.15)', borderRadius: 4 }}>
          <div style={{ fontFamily: Mono, fontSize: 11, color: C.red, letterSpacing: 1, marginBottom: 4 }}>STRUCTURAL INSIGHT</div>
          <div style={{ fontFamily: Sans, fontSize: 13, color: C.tx2, lineHeight: 1.6 }}>
            Water asymmetry is self-reinforcing. Israel controls the sources and has invested in desalination;
            Palestinians cannot build infrastructure under occupation. Climate change does not create the conflict --
            it amplifies a structural inequality that already exists. At 2x population with -20% rainfall,
            Palestinian supply drops below survival thresholds while Israeli supply remains manageable through technology.
            Water is not just a resource issue -- it is a sovereignty issue.
          </div>
        </div>
      </div>
    );
  }, [waterPopGrowth, waterRainReduction, waterSelectedSource, WATER_SOURCES]);

  // ── Main Render ───────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #141008 0%, #1a150e 30%, #141008 100%)', color: C.tx, fontFamily: Sans, position: 'relative' }} ref={topRef}>
      <SandTextureBg />
      {/* Top bar — diplomatic briefing header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(20,16,8,.95)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(196,160,64,.18)', padding: '0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px' }}>
          <button onClick={() => setView('coursework')} style={{
            background: 'none', border: 'none', color: C.tx3,
            fontFamily: Mono, fontSize: 11, cursor: 'pointer',
          }}>
            {'\u2190'} Back to Coursework
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ opacity: 0.4 }}>
              <circle cx="9" cy="9" r="7" fill="none" stroke="#c4a040" strokeWidth="0.8" />
              <path d="M9 2 L10 5 L9 4.5 L8 5Z M9 16 L10 13 L9 13.5 L8 13Z M2 9 L5 8 L4.5 9 L5 10Z M16 9 L13 8 L13.5 9 L13 10Z" fill="#c4a040" fillOpacity="0.3" />
              <circle cx="9" cy="9" r="3" fill="none" stroke="#c4a040" strokeWidth="0.5" />
            </svg>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.accentDm, letterSpacing: '.08em' }}>
              DIPLOMATIC BRIEFING {'\u2014'} HIST/PCS
            </span>
          </div>
        </div>
        <IslamicStarPattern />
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Hero section with diplomatic gravitas */}
        <div style={{ marginBottom: 24 }}>
          <IslamicArchPattern />
          <div style={{ marginTop: 16 }}>
            <div style={{ fontFamily: Mono, fontSize: 10, letterSpacing: '.2em', color: C.accentDm, marginBottom: 8, textTransform: 'uppercase' }}>
              Israel-Palestine Conflict Analysis
            </div>
            <h1 style={{
              fontFamily: Serif, fontSize: 34, fontWeight: 700,
              color: C.tx, letterSpacing: '-.02em', marginBottom: 8,
              borderBottom: '2px solid rgba(196,160,64,.15)', paddingBottom: 12,
            }}>
              Timeline & Narrative Analyzer
            </h1>
          </div>
          <p style={{
            fontFamily: Serif, fontSize: 15, color: C.tx2,
            lineHeight: 1.6, marginBottom: 4, maxWidth: 720,
          }}>
            Seven key periods of the Israeli-Palestinian conflict examined through
            dual narratives. Each event is presented through both Israeli and Palestinian
            historical frameworks, demonstrating how the same facts sustain fundamentally
            different interpretations. This is not a search for "the truth in the middle"
            but an exercise in understanding how each side constructs a coherent, internally
            consistent account of the conflict.
          </p>
          <p style={{
            fontFamily: Sans, fontSize: 12, color: C.tx3,
            lineHeight: 1.65, marginBottom: 12, maxWidth: 720,
          }}>
            Historiography, Dual Narratives, International Law, Peace & Conflict Studies
          </p>

          {/* Skills tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
            {SKILLS.map(tag => (
              <span key={tag} style={{
                fontFamily: Mono, fontSize: 11, padding: '3px 8px', borderRadius: 3,
                background: C.accentBg, color: C.accentDm, letterSpacing: '.03em',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <span style={{ fontFamily: Mono, fontSize: 12, color: C.tx3 }}>PERIODS EXPLORED</span>
            <div style={{ flex: 1, maxWidth: 200, height: 4, background: C.line, borderRadius: 2 }}>
              <div style={{
                width: (exploredCount / 7 * 100) + '%',
                height: '100%', borderRadius: 2,
                background: exploredCount === 7 ? C.olive : C.accent,
                transition: 'width .3s ease',
              }} />
            </div>
            <span style={{
              fontFamily: Mono, fontSize: 12,
              color: exploredCount === 7 ? C.olive : C.accent,
            }}>
              {exploredCount}/7
            </span>
          </div>

          {/* Scholarly note */}
          <div style={{
            marginTop: 16, padding: '12px 16px', borderRadius: 6,
            background: C.terraBg, border: '1px solid ' + C.line,
          }}>
            <div style={{
              fontFamily: Mono, fontSize: 11, letterSpacing: '.06em',
              color: C.terraDm, marginBottom: 4,
            }}>
              NOTE ON METHOD
            </div>
            <div style={{
              fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.65,
            }}>
              This analysis draws on scholars from multiple traditions: Benny Morris
              and Avi Shlaim (Israeli "New Historians"), Rashid Khalidi and Edward Said
              (Palestinian intellectual tradition), as well as international legal frameworks.
              Both narratives are presented with equal scholarly seriousness. The goal is
              not to adjudicate but to understand the internal logic of each perspective.
            </div>
          </div>
        </div>

        <ModeSwitch />

        {mode === 'timeline' && renderTimeline()}
        {mode === 'narratives' && renderNarratives()}
        {mode === 'documents' && renderDocuments()}
        {mode === 'territory' && renderTerritory()}
        {mode === 'negotiations' && renderNegotiations()}
        {mode === 'water' && renderWater()}

        {/* Provenance Strip */}
        <IslamicArchPattern />
        <div style={{
          marginTop: 16, padding: 20, borderTop: 'none',
          display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center',
        }}>
          {PROVENANCE.map(p => (
            <div key={p.label} style={{ textAlign: 'center', flex: '0 0 auto' }}>
              <div style={{
                fontFamily: Mono, fontSize: 12, letterSpacing: 1, color: C.tx3,
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
            padding: '10px 32px', border: '1px solid ' + C.line, borderRadius: 6,
            background: 'transparent', color: C.tx2,
            fontFamily: Mono, fontSize: 13, letterSpacing: 0.5, cursor: 'pointer',
          }}>
            {'\←'} Back to Coursework
          </button>
        </div>
      </div>
    </div>
  );
}
