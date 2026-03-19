// RussiaView.jsx — Imperial Timeline
// Formation of the Russian Empire (HIST)
// "Boyars, Tsars, Orthodox Expansion"
//
// Interactive chronological analysis: 6 pivotal transformations traced
// through turning-point decisions where history could have diverged.
// Self-contained React component using Babel in-browser transpilation.
// Globals: useState, useCallback, useMemo from React

// ── Palette: Imperial Parchment — warm ivory with gold leaf & dark ink ────────
const RU_C = {
  bg:      "#f5f0e6",
  card:    "rgba(250,247,240,.95)",
  cardBd:  "rgba(180,140,60,.3)",
  tx:      "#2a1a0a",
  tx2:     "#5a4a3a",
  tx3:     "#8a7a6a",
  gold:    "#b8922a",
  goldDm:  "#96750e",
  goldBg:  "rgba(184,146,42,.1)",
  red:     "#8b1c23",
  redDm:   "#6b1520",
  redBg:   "rgba(139,28,35,.08)",
  blue:    "#1a2855",
  blueDm:  "#142040",
  blueBg:  "rgba(26,40,85,.08)",
  green:   "#2d6b4a",
  greenDm: "#1e4a35",
  greenBg: "rgba(45,107,74,.06)",
  bronze:  "#8a6e30",
  ivory:   "#faf7f0",
  kremlin: "#6b1c23",
  line:    "rgba(120,90,30,.2)",
};
const RU_Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const RU_Sans  = "'Inter',Helvetica,sans-serif";
const RU_Mono  = "'IBM Plex Mono',monospace";

// ── SVG Decorative Definitions (Tsarist Imperial Theme) ──────────────
var RU_DEFS_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>' +
  '<filter id="ruParchment"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feBlend in="SourceGraphic" mode="multiply"/></filter>' +
  '<pattern id="ruFiligree" width="60" height="60" patternUnits="userSpaceOnUse">' +
    '<path d="M30 0 Q35 5 30 10 Q25 5 30 0Z" fill="none" stroke="rgba(140,110,40,.12)" stroke-width=".5"/>' +
    '<path d="M0 30 Q5 35 10 30 Q5 25 0 30Z" fill="none" stroke="rgba(140,110,40,.10)" stroke-width=".5"/>' +
    '<path d="M60 30 Q55 35 50 30 Q55 25 60 30Z" fill="none" stroke="rgba(140,110,40,.10)" stroke-width=".5"/>' +
    '<path d="M30 60 Q35 55 30 50 Q25 55 30 60Z" fill="none" stroke="rgba(140,110,40,.12)" stroke-width=".5"/>' +
    '<circle cx="30" cy="30" r="1" fill="rgba(140,110,40,.08)"/>' +
  '</pattern>' +
  '</defs></svg>';

// Ornamental gold divider with diamond motifs
function RuOrnamentalDivider({ color, width }) {
  var c = color || RU_C.gold;
  return React.createElement("div", { style: { textAlign: "center", margin: "20px 0", overflow: "hidden" } },
    React.createElement("svg", { width: width || "100%", height: 16, viewBox: "0 0 400 16", preserveAspectRatio: "xMidYMid meet", style: { display: "block", margin: "0 auto", maxWidth: 500, opacity: 0.35 } },
      React.createElement("line", { x1: 0, y1: 8, x2: 160, y2: 8, stroke: c, strokeWidth: ".8" }),
      React.createElement("line", { x1: 240, y1: 8, x2: 400, y2: 8, stroke: c, strokeWidth: ".8" }),
      React.createElement("path", { d: "M170 8 L180 2 L190 8 L180 14 Z", fill: "none", stroke: c, strokeWidth: ".8" }),
      React.createElement("path", { d: "M195 8 L200 5 L205 8 L200 11 Z", fill: c, fillOpacity: ".3" }),
      React.createElement("path", { d: "M210 8 L220 2 L230 8 L220 14 Z", fill: "none", stroke: c, strokeWidth: ".8" }),
      React.createElement("circle", { cx: 200, cy: 8, r: 1.5, fill: c, fillOpacity: ".4" }),
      React.createElement("line", { x1: 165, y1: 4, x2: 165, y2: 12, stroke: c, strokeWidth: ".4" }),
      React.createElement("line", { x1: 235, y1: 4, x2: 235, y2: 12, stroke: c, strokeWidth: ".4" })
    )
  );
}

// Gold corner ornaments for cards (SVG L-shapes)
function RuCornerOrnaments() {
  var c = RU_C.gold;
  var ornStyle = { position: "absolute", width: 20, height: 20, opacity: 0.3 };
  return React.createElement(React.Fragment, null,
    React.createElement("svg", Object.assign({ viewBox: "0 0 20 20", style: Object.assign({}, ornStyle, { top: 4, left: 4 }) }),
      React.createElement("path", { d: "M0 12 L0 0 L12 0", fill: "none", stroke: c, strokeWidth: "1.2" }),
      React.createElement("path", { d: "M0 8 L0 3 L3 0", fill: "none", stroke: c, strokeWidth: ".5", strokeDasharray: "2,2" })
    ),
    React.createElement("svg", Object.assign({ viewBox: "0 0 20 20", style: Object.assign({}, ornStyle, { top: 4, right: 4 }) }),
      React.createElement("path", { d: "M20 12 L20 0 L8 0", fill: "none", stroke: c, strokeWidth: "1.2" }),
      React.createElement("path", { d: "M20 8 L20 3 L17 0", fill: "none", stroke: c, strokeWidth: ".5", strokeDasharray: "2,2" })
    ),
    React.createElement("svg", Object.assign({ viewBox: "0 0 20 20", style: Object.assign({}, ornStyle, { bottom: 4, left: 4 }) }),
      React.createElement("path", { d: "M0 8 L0 20 L12 20", fill: "none", stroke: c, strokeWidth: "1.2" }),
      React.createElement("path", { d: "M0 12 L0 17 L3 20", fill: "none", stroke: c, strokeWidth: ".5", strokeDasharray: "2,2" })
    ),
    React.createElement("svg", Object.assign({ viewBox: "0 0 20 20", style: Object.assign({}, ornStyle, { bottom: 4, right: 4 }) }),
      React.createElement("path", { d: "M20 8 L20 20 L8 20", fill: "none", stroke: c, strokeWidth: "1.2" }),
      React.createElement("path", { d: "M20 12 L20 17 L17 20", fill: "none", stroke: c, strokeWidth: ".5", strokeDasharray: "2,2" })
    )
  );
}

// Onion dome silhouette background for hero
function RuOnionDomeSkyline() {
  return React.createElement("svg", {
    viewBox: "0 0 800 120",
    style: { position: "absolute", bottom: 0, left: 0, width: "100%", height: 120, opacity: 0.1, pointerEvents: "none" },
    preserveAspectRatio: "xMidYMax meet",
  },
    React.createElement("path", { d: "M80 120 L80 70 Q80 40 90 30 Q100 20 100 10 Q100 20 110 30 Q120 40 120 70 L120 120", fill: RU_C.gold }),
    React.createElement("line", { x1: 100, y1: 0, x2: 100, y2: 12, stroke: RU_C.gold, strokeWidth: "1.5" }),
    React.createElement("line", { x1: 97, y1: 4, x2: 103, y2: 4, stroke: RU_C.gold, strokeWidth: "1" }),
    React.createElement("path", { d: "M200 120 L200 80 Q200 55 215 42 Q230 30 230 18 Q230 30 245 42 Q260 55 260 80 L260 120", fill: RU_C.gold }),
    React.createElement("line", { x1: 230, y1: 6, x2: 230, y2: 20, stroke: RU_C.gold, strokeWidth: "1.5" }),
    React.createElement("line", { x1: 226, y1: 10, x2: 234, y2: 10, stroke: RU_C.gold, strokeWidth: "1" }),
    React.createElement("path", { d: "M360 120 L360 60 Q360 35 380 22 Q400 10 400 2 Q400 10 420 22 Q440 35 440 60 L440 120", fill: RU_C.gold }),
    React.createElement("line", { x1: 400, y1: -8, x2: 400, y2: 6, stroke: RU_C.gold, strokeWidth: "2" }),
    React.createElement("line", { x1: 396, y1: -2, x2: 404, y2: -2, stroke: RU_C.gold, strokeWidth: "1.2" }),
    React.createElement("path", { d: "M540 120 L540 75 Q540 50 555 38 Q570 26 570 16 Q570 26 585 38 Q600 50 600 75 L600 120", fill: RU_C.gold }),
    React.createElement("line", { x1: 570, y1: 4, x2: 570, y2: 18, stroke: RU_C.gold, strokeWidth: "1.5" }),
    React.createElement("line", { x1: 567, y1: 8, x2: 573, y2: 8, stroke: RU_C.gold, strokeWidth: "1" }),
    React.createElement("path", { d: "M680 120 L680 85 Q680 60 690 50 Q700 40 700 30 Q700 40 710 50 Q720 60 720 85 L720 120", fill: RU_C.gold }),
    React.createElement("line", { x1: 700, y1: 20, x2: 700, y2: 32, stroke: RU_C.gold, strokeWidth: "1.5" }),
    React.createElement("line", { x1: 697, y1: 24, x2: 703, y2: 24, stroke: RU_C.gold, strokeWidth: "1" })
  );
}

// Cyrillic marginalia text strings for atmosphere
var RU_MARGINALIA = [
  "\u0421\u043B\u0430\u0432\u0430 \u0420\u043E\u0441\u0441\u0438\u0438",
  "\u041F\u0440\u0430\u0432\u043E\u0441\u043B\u0430\u0432\u0438\u0435",
  "\u0421\u0430\u043C\u043E\u0434\u0435\u0440\u0436\u0430\u0432\u0438\u0435",
  "\u041D\u0430\u0440\u043E\u0434\u043D\u043E\u0441\u0442\u044C",
  "\u0422\u0440\u0435\u0442\u0438\u0439 \u0420\u0438\u043C",
  "\u041C\u043E\u0441\u043A\u0432\u0430",
  "\u0418\u043C\u043F\u0435\u0440\u0438\u044F",
  "\u0426\u0430\u0440\u0441\u0442\u0432\u043E",
];
// Extended marginalia: key Cyrillic phrases for right edge + date markers
var RU_MARGINALIA_EXT = [
  "\u041E\u043A\u043D\u043E \u0432 \u0415\u0432\u0440\u043E\u043F\u0443",            // Okno v Evropu (Window to Europe)
  "\u0420\u043E\u0441\u0441\u0438\u044F \u2014 \u043D\u0435 \u0415\u0432\u0440\u043E\u043F\u0430", // Rossiya — ne Evropa
  "\u0417\u0435\u043C\u0441\u043A\u0438\u0439 \u0421\u043E\u0431\u043E\u0440",        // Zemsky Sobor
  "\u0421\u0443\u0434\u0435\u0431\u043D\u0438\u043A",                                   // Sudebnik
  "\u041E\u043F\u0440\u0438\u0447\u043D\u0438\u043D\u0430",                             // Oprichnina
  "\u0412\u0435\u0447\u043D\u0430\u044F \u043F\u0430\u043C\u044F\u0442\u044C",         // Vechnaya pamyat (Eternal memory)
  "\u0427\u0435\u043A\u0438\u0441\u0442",                                               // Chekist
  "\u0412\u0440\u0430\u0433 \u043D\u0430\u0440\u043E\u0434\u0430",                     // Vrag naroda (Enemy of the People)
  "\u0413\u0443\u043B\u0430\u0433",                                                     // Gulag
  "\u041F\u0435\u0440\u0435\u0441\u0442\u0440\u043E\u0439\u043A\u0430",               // Perestroika
  "\u0413\u043B\u0430\u0441\u043D\u043E\u0441\u0442\u044C",                           // Glasnost
  "\u0412\u0441\u0435 \u0441\u043B\u043E\u0436\u043D\u043E",                           // Vse slozhno (It's complicated)
  "\u0421\u043C\u0443\u0442\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",       // Smutnoye vremya (Time of Troubles)
  "\u041D\u0430\u0440\u043E\u0434\u043D\u0430\u044F \u0432\u043E\u043B\u044F",       // Narodnaya volya (People's Will)
  "\u041A\u0440\u043E\u0432\u0430\u0432\u043E\u0435 \u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", // Krovavoye voskresenye (Bloody Sunday)
  "\u0414\u0435\u043A\u0430\u0431\u0440\u0438\u0441\u0442\u044B",                     // Dekabristy (Decembrists)
  "\u0422\u0440\u0435\u0442\u044C\u0435 \u043E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435", // Tretye otdeleniye (Third Section)
  "\u0421\u0442\u043E\u043B\u044B\u043F\u0438\u043D\u0441\u043A\u0438\u0439 \u0433\u0430\u043B\u0441\u0442\u0443\u043A", // Stolypinsky galstuk (Stolypin's necktie)
  "\u0415\u0436\u043E\u0432\u0449\u0438\u043D\u0430",                                 // Yezhovshchina
  "\u0422\u0440\u043E\u0439\u043A\u0430 \u041D\u041A\u0412\u0414",                   // Troyka NKVD
  "\u041B\u0443\u0431\u044F\u043D\u043A\u0430",                                       // Lubyanka
  "\u041A\u043E\u043B\u044B\u043C\u0430",                                               // Kolyma
  "\u0414\u043E\u0432\u0435\u0440\u044F\u0439, \u043D\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0439", // Doveryai, no proveryai (Trust, but verify)
  "\u041F\u043E\u0442\u0451\u043C\u043A\u0438\u043D\u0441\u043A\u0438\u0435 \u0434\u0435\u0440\u0435\u0432\u043D\u0438", // Potyomkinskiye derevni (Potemkin villages)
  "\u0422\u0430\u0431\u0435\u043B\u044C \u043E \u0440\u0430\u043D\u0433\u0430\u0445", // Tabel o rangakh (Table of Ranks)
  "\u0427\u0435\u0440\u0442\u0430 \u043E\u0441\u0435\u0434\u043B\u043E\u0441\u0442\u0438", // Cherta osedlosti (Pale of Settlement)
  "\u041D\u042D\u041F",                                                                 // NEP (New Economic Policy)
  "\u0414\u0435\u043D\u044C \u041F\u043E\u0431\u0435\u0434\u044B",                   // Den Pobedy (Victory Day)
];
// Historical date markers for decorative use
var RU_DATES = [
  { year: "862", label: "Rurik" },
  { year: "988", label: "Baptism" },
  { year: "1240", label: "Neva" },
  { year: "1380", label: "Kulikovo" },
  { year: "1547", label: "Tsar" },
  { year: "1613", label: "Romanov" },
  { year: "1703", label: "Piter" },
  { year: "1812", label: "Napoleon" },
  { year: "1825", label: "Decembrist" },
  { year: "1861", label: "Emancipation" },
  { year: "1881", label: "Assassination" },
  { year: "1905", label: "Bloody Sunday" },
  { year: "1914", label: "Great War" },
  { year: "1917", label: "Revolution" },
  { year: "1918", label: "Civil War" },
  { year: "1924", label: "Lenin dies" },
  { year: "1937", label: "Great Purge" },
  { year: "1941", label: "Barbarossa" },
  { year: "1945", label: "Victory" },
  { year: "1953", label: "Stalin dies" },
  { year: "1956", label: "Secret Speech" },
  { year: "1968", label: "Prague Spring" },
  { year: "1979", label: "Afghanistan" },
  { year: "1985", label: "Gorbachev" },
  { year: "1991", label: "August coup" },
  { year: "1993", label: "Crisis" },
  { year: "1999", label: "Putin" },
];

// ── St. Basil's Cathedral silhouette (multi-dome) ────────────
function RuStBasilsSilhouette() {
  return React.createElement("svg", {
    viewBox: "0 0 200 100",
    style: { position: "absolute", bottom: 0, right: 40, width: 200, height: 100, opacity: 0.09, pointerEvents: "none" },
    preserveAspectRatio: "xMidYMax meet",
  },
    // Central tall dome
    React.createElement("path", { d: "M100 10 Q106 18 106 28 Q106 36 100 36 Q94 36 94 28 Q94 18 100 10Z", fill: RU_C.gold }),
    React.createElement("rect", { x: 96, y: 36, width: 8, height: 55, fill: RU_C.gold }),
    React.createElement("line", { x1: 100, y1: 4, x2: 100, y2: 12, stroke: RU_C.gold, strokeWidth: "1.5" }),
    React.createElement("line", { x1: 98, y1: 7, x2: 102, y2: 7, stroke: RU_C.gold, strokeWidth: "1" }),
    // Left dome 1 (twisted)
    React.createElement("path", { d: "M70 22 Q75 28 75 38 Q75 44 70 44 Q65 44 65 38 Q65 28 70 22Z", fill: RU_C.gold }),
    React.createElement("rect", { x: 67, y: 44, width: 6, height: 47, fill: RU_C.gold }),
    React.createElement("line", { x1: 70, y1: 16, x2: 70, y2: 24, stroke: RU_C.gold, strokeWidth: "1.2" }),
    React.createElement("line", { x1: 68, y1: 19, x2: 72, y2: 19, stroke: RU_C.gold, strokeWidth: ".8" }),
    // Right dome 1
    React.createElement("path", { d: "M130 20 Q136 27 136 36 Q136 42 130 42 Q124 42 124 36 Q124 27 130 20Z", fill: RU_C.gold }),
    React.createElement("rect", { x: 127, y: 42, width: 6, height: 49, fill: RU_C.gold }),
    React.createElement("line", { x1: 130, y1: 14, x2: 130, y2: 22, stroke: RU_C.gold, strokeWidth: "1.2" }),
    React.createElement("line", { x1: 128, y1: 17, x2: 132, y2: 17, stroke: RU_C.gold, strokeWidth: ".8" }),
    // Left dome 2 (smaller)
    React.createElement("path", { d: "M48 34 Q52 39 52 46 Q52 50 48 50 Q44 50 44 46 Q44 39 48 34Z", fill: RU_C.gold }),
    React.createElement("rect", { x: 46, y: 50, width: 4, height: 41, fill: RU_C.gold }),
    React.createElement("line", { x1: 48, y1: 29, x2: 48, y2: 36, stroke: RU_C.gold, strokeWidth: "1" }),
    // Right dome 2 (smaller)
    React.createElement("path", { d: "M152 32 Q156 37 156 44 Q156 48 152 48 Q148 48 148 44 Q148 37 152 32Z", fill: RU_C.gold }),
    React.createElement("rect", { x: 150, y: 48, width: 4, height: 43, fill: RU_C.gold }),
    React.createElement("line", { x1: 152, y1: 27, x2: 152, y2: 34, stroke: RU_C.gold, strokeWidth: "1" }),
    // Base wall
    React.createElement("rect", { x: 30, y: 88, width: 140, height: 12, fill: RU_C.gold })
  );
}

// ── Kremlin swallow-tail merlon divider ──────────────────────
function RuKremlinMerlonDivider({ color, width }) {
  var c = color || RU_C.gold;
  // Swallow-tail (lastochkin khvost) merlons — the distinctive forked crenellation
  var merlons = [];
  var mCount = 12;
  for (var mi = 0; mi < mCount; mi++) {
    var mx = 10 + mi * 32;
    merlons.push(
      React.createElement("path", {
        key: "m" + mi,
        d: "M" + mx + " 16 L" + mx + " 6 L" + (mx + 6) + " 0 L" + (mx + 12) + " 6 L" + (mx + 12) + " 10 L" + (mx + 10) + " 8 L" + (mx + 6) + " 4 L" + (mx + 2) + " 8 L" + mx + " 10 Z",
        fill: "none", stroke: c, strokeWidth: ".6", opacity: 0.4,
      })
    );
  }
  return React.createElement("div", { style: { textAlign: "center", margin: "16px 0", overflow: "hidden" } },
    React.createElement("svg", { width: width || "100%", height: 20, viewBox: "0 0 400 20", preserveAspectRatio: "xMidYMid meet", style: { display: "block", margin: "0 auto", maxWidth: 500, opacity: 0.35 } },
      React.createElement("line", { x1: 0, y1: 16, x2: 400, y2: 16, stroke: c, strokeWidth: ".5" }),
      merlons
    )
  );
}

// ── Russian Orthodox Cross (with slanted bottom crossbar) ────
function RuOrthodoxCross({ size, opacity, style }) {
  var s = size || 20;
  return React.createElement("svg", {
    width: s, height: s * 1.4, viewBox: "0 0 20 28",
    style: Object.assign({ opacity: opacity || 0.12, pointerEvents: "none", display: "inline-block" }, style || {}),
  },
    React.createElement("line", { x1: 10, y1: 1, x2: 10, y2: 27, stroke: RU_C.gold, strokeWidth: "1.2" }),
    React.createElement("line", { x1: 6, y1: 5, x2: 14, y2: 5, stroke: RU_C.gold, strokeWidth: "1" }),
    React.createElement("line", { x1: 4, y1: 11, x2: 16, y2: 11, stroke: RU_C.gold, strokeWidth: "1.2" }),
    // Slanted bottom crossbar (the distinctive feature)
    React.createElement("line", { x1: 6, y1: 22, x2: 14, y2: 19, stroke: RU_C.gold, strokeWidth: "1" })
  );
}

// ── Faberge Egg outline ──────────────────────────────────────
function RuFabergeEgg({ size, opacity, style }) {
  var s = size || 40;
  return React.createElement("svg", {
    width: s, height: s * 1.4, viewBox: "0 0 40 56",
    style: Object.assign({ opacity: opacity || 0.08, pointerEvents: "none" }, style || {}),
  },
    // Egg shape
    React.createElement("path", {
      d: "M20 4 Q32 10 32 24 Q32 40 20 52 Q8 40 8 24 Q8 10 20 4Z",
      fill: "none", stroke: RU_C.gold, strokeWidth: "1",
    }),
    // Decorative band
    React.createElement("ellipse", { cx: 20, cy: 24, rx: 12, ry: 3, fill: "none", stroke: RU_C.gold, strokeWidth: ".6" }),
    // Gemstone dots
    React.createElement("circle", { cx: 20, cy: 16, r: 1.5, fill: RU_C.gold, fillOpacity: ".3" }),
    React.createElement("circle", { cx: 20, cy: 32, r: 1.5, fill: RU_C.gold, fillOpacity: ".3" }),
    React.createElement("circle", { cx: 14, cy: 24, r: 1, fill: RU_C.gold, fillOpacity: ".3" }),
    React.createElement("circle", { cx: 26, cy: 24, r: 1, fill: RU_C.gold, fillOpacity: ".3" }),
    // Top crown ornament
    React.createElement("path", { d: "M18 5 L20 2 L22 5", fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    React.createElement("circle", { cx: 20, cy: 1, r: 1, fill: RU_C.gold, fillOpacity: ".2" }),
    // Filigree lines
    React.createElement("path", { d: "M14 14 Q20 12 26 14", fill: "none", stroke: RU_C.gold, strokeWidth: ".4" }),
    React.createElement("path", { d: "M12 34 Q20 36 28 34", fill: "none", stroke: RU_C.gold, strokeWidth: ".4" })
  );
}

// ── Romanov Double-Headed Eagle (more detailed) ──────────────
function RuRomanovEagle({ size, opacity, style }) {
  var s = size || 80;
  return React.createElement("svg", {
    width: s, height: s, viewBox: "0 0 80 80",
    style: Object.assign({ opacity: opacity || 0.06, pointerEvents: "none" }, style || {}),
  },
    // Body shield
    React.createElement("path", { d: "M40 20 L48 28 L48 50 L40 58 L32 50 L32 28Z", fill: RU_C.gold, fillOpacity: ".15", stroke: RU_C.gold, strokeWidth: ".8" }),
    // St. George rider on shield
    React.createElement("circle", { cx: 40, cy: 38, r: 6, fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    React.createElement("line", { x1: 40, y1: 33, x2: 44, y2: 42, stroke: RU_C.gold, strokeWidth: ".5" }),
    // Left head
    React.createElement("circle", { cx: 28, cy: 16, r: 5, fill: "none", stroke: RU_C.gold, strokeWidth: ".8" }),
    React.createElement("path", { d: "M24 14 L20 12", stroke: RU_C.gold, strokeWidth: ".6" }),
    React.createElement("path", { d: "M26 12 L24 8 L28 10", fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Right head
    React.createElement("circle", { cx: 52, cy: 16, r: 5, fill: "none", stroke: RU_C.gold, strokeWidth: ".8" }),
    React.createElement("path", { d: "M56 14 L60 12", stroke: RU_C.gold, strokeWidth: ".6" }),
    React.createElement("path", { d: "M54 12 L56 8 L52 10", fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Crown above left head
    React.createElement("path", { d: "M24 11 L26 7 L28 9 L30 5 L32 9 L34 7 L36 11", fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Crown above right head
    React.createElement("path", { d: "M44 11 L46 7 L48 9 L50 5 L52 9 L54 7 L56 11", fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Imperial crown (top center)
    React.createElement("path", { d: "M34 8 L37 2 L40 5 L43 2 L46 8", fill: "none", stroke: RU_C.gold, strokeWidth: ".7" }),
    React.createElement("circle", { cx: 40, cy: 1, r: 1.5, fill: RU_C.gold, fillOpacity: ".25" }),
    // Left wing
    React.createElement("path", { d: "M32 24 L24 20 L16 24 L8 22 L4 28 L10 30 L16 28 L22 32 L28 28Z", fill: "none", stroke: RU_C.gold, strokeWidth: ".6" }),
    // Right wing
    React.createElement("path", { d: "M48 24 L56 20 L64 24 L72 22 L76 28 L70 30 L64 28 L58 32 L52 28Z", fill: "none", stroke: RU_C.gold, strokeWidth: ".6" }),
    // Scepter (left talon)
    React.createElement("line", { x1: 30, y1: 52, x2: 22, y2: 66, stroke: RU_C.gold, strokeWidth: ".6" }),
    React.createElement("circle", { cx: 22, cy: 67, r: 2, fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Orb (right talon)
    React.createElement("line", { x1: 50, y1: 52, x2: 58, y2: 64, stroke: RU_C.gold, strokeWidth: ".6" }),
    React.createElement("circle", { cx: 58, cy: 67, r: 3, fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    React.createElement("line", { x1: 58, y1: 64, x2: 58, y2: 62, stroke: RU_C.gold, strokeWidth: ".4" }),
    React.createElement("line", { x1: 56.5, y1: 63, x2: 59.5, y2: 63, stroke: RU_C.gold, strokeWidth: ".4" }),
    // Tail feathers
    React.createElement("path", { d: "M36 56 L34 68 M38 56 L37 70 M40 58 L40 72 M42 56 L43 70 M44 56 L46 68", stroke: RU_C.gold, strokeWidth: ".4" })
  );
}

// ── Troika (three-horse sleigh) silhouette ────────────────────
function RuTroikaSilhouette({ opacity, style }) {
  return React.createElement("svg", {
    width: 120, height: 50, viewBox: "0 0 120 50",
    style: Object.assign({ opacity: opacity || 0.06, pointerEvents: "none" }, style || {}),
  },
    // Sleigh body
    React.createElement("path", { d: "M80 35 Q85 28 95 28 L110 28 Q115 28 115 33 L115 38 Q110 42 90 42 L80 42Z", fill: "none", stroke: RU_C.gold, strokeWidth: ".8" }),
    // Runner
    React.createElement("path", { d: "M78 42 Q76 44 70 44 L115 44 Q118 44 118 42", fill: "none", stroke: RU_C.gold, strokeWidth: ".6" }),
    // Center horse (lead)
    React.createElement("path", { d: "M45 30 Q48 22 52 18 L54 14 L56 16 Q58 20 58 28 L60 34 Q62 38 58 40 L50 40 Q46 38 45 34Z", fill: "none", stroke: RU_C.gold, strokeWidth: ".7" }),
    React.createElement("circle", { cx: 53, cy: 15, r: 3, fill: "none", stroke: RU_C.gold, strokeWidth: ".6" }),
    // Left horse
    React.createElement("path", { d: "M28 32 Q30 24 34 20 L36 16 L38 18 Q40 22 40 30 L42 36 Q44 40 40 42 L32 42 Q28 40 28 36Z", fill: "none", stroke: RU_C.gold, strokeWidth: ".6" }),
    React.createElement("circle", { cx: 35, cy: 17, r: 2.5, fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Right horse
    React.createElement("path", { d: "M60 32 Q62 24 66 20 L68 16 L70 18 Q72 22 72 30 L74 36 Q76 40 72 42 L64 42 Q60 40 60 36Z", fill: "none", stroke: RU_C.gold, strokeWidth: ".6" }),
    React.createElement("circle", { cx: 67, cy: 17, r: 2.5, fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Reins/harness
    React.createElement("path", { d: "M53 18 L85 30 M35 20 L85 32 M67 20 L85 28", fill: "none", stroke: RU_C.gold, strokeWidth: ".3" }),
    // Duga (wooden arch) over center horse
    React.createElement("path", { d: "M46 14 Q52 4 60 14", fill: "none", stroke: RU_C.gold, strokeWidth: ".7" }),
    // Bell on duga
    React.createElement("circle", { cx: 53, cy: 8, r: 1.5, fill: RU_C.gold, fillOpacity: ".2" })
  );
}

// ── Bronze Horseman (Peter the Great statue) ─────────────────
function RuBronzeHorseman({ opacity, style }) {
  return React.createElement("svg", {
    width: 70, height: 80, viewBox: "0 0 70 80",
    style: Object.assign({ opacity: opacity || 0.06, pointerEvents: "none" }, style || {}),
  },
    // Thunder Stone base
    React.createElement("path", { d: "M10 75 Q15 60 35 55 Q55 60 60 75Z", fill: RU_C.gold, fillOpacity: ".15", stroke: RU_C.gold, strokeWidth: ".6" }),
    // Rearing horse
    React.createElement("path", { d: "M35 55 Q38 42 40 35 Q42 28 38 22 L36 18 Q34 16 36 14 L38 12 Q40 10 42 12 L44 16 Q46 20 44 26 Q42 32 44 38 L46 44 Q48 50 44 54", fill: "none", stroke: RU_C.gold, strokeWidth: ".8" }),
    // Horse rear legs
    React.createElement("path", { d: "M35 55 L32 62 M38 54 L36 60", fill: "none", stroke: RU_C.gold, strokeWidth: ".6" }),
    // Horse front legs (rearing)
    React.createElement("path", { d: "M42 28 L48 22 M44 30 L50 26", fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Peter (rider)
    React.createElement("path", { d: "M38 34 L36 28 Q35 24 37 20", fill: "none", stroke: RU_C.gold, strokeWidth: ".7" }),
    // Outstretched arm
    React.createElement("line", { x1: 36, y1: 24, x2: 46, y2: 18, stroke: RU_C.gold, strokeWidth: ".6" }),
    // Head
    React.createElement("circle", { cx: 37, cy: 18, r: 3, fill: "none", stroke: RU_C.gold, strokeWidth: ".6" }),
    // Serpent under hoof (crushed)
    React.createElement("path", { d: "M30 58 Q28 56 32 54 Q36 52 34 56", fill: "none", stroke: RU_C.gold, strokeWidth: ".5" })
  );
}

// ── Samovar silhouette ───────────────────────────────────────
function RuSamovar({ size, opacity, style }) {
  var s = size || 30;
  return React.createElement("svg", {
    width: s, height: s * 1.5, viewBox: "0 0 30 45",
    style: Object.assign({ opacity: opacity || 0.08, pointerEvents: "none", display: "inline-block" }, style || {}),
  },
    // Chimney top
    React.createElement("rect", { x: 12, y: 0, width: 6, height: 4, fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Lid
    React.createElement("path", { d: "M8 6 Q15 2 22 6", fill: "none", stroke: RU_C.gold, strokeWidth: ".6" }),
    // Body (urn shape)
    React.createElement("path", { d: "M8 6 Q6 8 6 15 Q6 28 8 32 L10 34 Q15 36 20 34 L22 32 Q24 28 24 15 Q24 8 22 6Z", fill: RU_C.gold, fillOpacity: ".08", stroke: RU_C.gold, strokeWidth: ".7" }),
    // Spigot
    React.createElement("path", { d: "M6 20 L2 20 L2 22 L6 22", fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    React.createElement("circle", { cx: 2, cy: 21, r: 1, fill: RU_C.gold, fillOpacity: ".2" }),
    // Handles
    React.createElement("path", { d: "M24 14 Q28 14 28 20 Q28 26 24 26", fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Base/pedestal
    React.createElement("path", { d: "M10 34 L8 38 Q15 40 22 38 L20 34", fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    React.createElement("ellipse", { cx: 15, cy: 40, rx: 8, ry: 2, fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Decorative band
    React.createElement("ellipse", { cx: 15, cy: 18, rx: 8, ry: 1.5, fill: "none", stroke: RU_C.gold, strokeWidth: ".3" })
  );
}

// ── Hammer and Sickle (historical context) ───────────────────
function RuHammerSickle({ size, opacity, style }) {
  var s = size || 20;
  return React.createElement("svg", {
    width: s, height: s, viewBox: "0 0 24 24",
    style: Object.assign({ opacity: opacity || 0.06, pointerEvents: "none", display: "inline-block" }, style || {}),
  },
    // Sickle blade (curved)
    React.createElement("path", { d: "M8 6 Q4 8 4 14 Q4 18 8 20 Q12 22 16 18 Q14 20 10 18 Q6 16 6 12 Q6 8 10 6Z", fill: "none", stroke: RU_C.gold, strokeWidth: ".8" }),
    // Sickle handle
    React.createElement("line", { x1: 8, y1: 6, x2: 12, y2: 2, stroke: RU_C.gold, strokeWidth: ".7" }),
    // Hammer head
    React.createElement("rect", { x: 14, y: 4, width: 6, height: 3, rx: .5, fill: "none", stroke: RU_C.gold, strokeWidth: ".7" }),
    // Hammer handle
    React.createElement("line", { x1: 17, y1: 7, x2: 10, y2: 18, stroke: RU_C.gold, strokeWidth: ".7" })
  );
}

// ── Matryoshka nesting doll outline ──────────────────────────
function RuMatryoshka({ size, opacity, style }) {
  var s = size || 30;
  return React.createElement("svg", {
    width: s, height: s * 1.4, viewBox: "0 0 30 42",
    style: Object.assign({ opacity: opacity || 0.07, pointerEvents: "none", display: "inline-block" }, style || {}),
  },
    // Head (circle)
    React.createElement("circle", { cx: 15, cy: 10, r: 7, fill: "none", stroke: RU_C.gold, strokeWidth: ".8" }),
    // Face circle
    React.createElement("circle", { cx: 15, cy: 10, r: 4, fill: RU_C.gold, fillOpacity: ".06", stroke: RU_C.gold, strokeWidth: ".4" }),
    // Headscarf tie
    React.createElement("path", { d: "M9 14 Q8 16 9 17 M21 14 Q22 16 21 17", fill: "none", stroke: RU_C.gold, strokeWidth: ".5" }),
    // Body
    React.createElement("path", { d: "M8 16 Q6 22 6 30 Q6 38 15 40 Q24 38 24 30 Q24 22 22 16Z", fill: RU_C.gold, fillOpacity: ".06", stroke: RU_C.gold, strokeWidth: ".8" }),
    // Apron decoration
    React.createElement("ellipse", { cx: 15, cy: 28, rx: 5, ry: 6, fill: "none", stroke: RU_C.gold, strokeWidth: ".4" }),
    // Flower in apron
    React.createElement("circle", { cx: 15, cy: 27, r: 1.5, fill: RU_C.gold, fillOpacity: ".15" }),
    React.createElement("circle", { cx: 13, cy: 29, r: 1, fill: RU_C.gold, fillOpacity: ".1" }),
    React.createElement("circle", { cx: 17, cy: 29, r: 1, fill: RU_C.gold, fillOpacity: ".1" }),
    // Base
    React.createElement("ellipse", { cx: 15, cy: 40, rx: 9, ry: 2, fill: "none", stroke: RU_C.gold, strokeWidth: ".5" })
  );
}

// ── Hohloma-style golden floral scrollwork (decorative border) ─
function RuHohlomaBorder({ width }) {
  return React.createElement("div", { style: { textAlign: "center", margin: "12px 0", overflow: "hidden" } },
    React.createElement("svg", { width: width || "100%", height: 24, viewBox: "0 0 500 24", preserveAspectRatio: "xMidYMid meet", style: { display: "block", margin: "0 auto", maxWidth: 600, opacity: 0.2 } },
      // Flowing vine with berries (Hohloma signature: gold on dark)
      React.createElement("path", { d: "M0 12 Q30 4 60 12 Q90 20 120 12 Q150 4 180 12 Q210 20 240 12 Q270 4 300 12 Q330 20 360 12 Q390 4 420 12 Q450 20 480 12 Q495 6 500 12", fill: "none", stroke: RU_C.gold, strokeWidth: ".7" }),
      // Berry clusters
      React.createElement("circle", { cx: 60, cy: 12, r: 3, fill: RU_C.red, fillOpacity: ".4" }),
      React.createElement("circle", { cx: 56, cy: 10, r: 2, fill: RU_C.red, fillOpacity: ".3" }),
      React.createElement("circle", { cx: 180, cy: 12, r: 3, fill: RU_C.red, fillOpacity: ".4" }),
      React.createElement("circle", { cx: 184, cy: 14, r: 2, fill: RU_C.red, fillOpacity: ".3" }),
      React.createElement("circle", { cx: 300, cy: 12, r: 3, fill: RU_C.red, fillOpacity: ".4" }),
      React.createElement("circle", { cx: 296, cy: 10, r: 2, fill: RU_C.red, fillOpacity: ".3" }),
      React.createElement("circle", { cx: 420, cy: 12, r: 3, fill: RU_C.red, fillOpacity: ".4" }),
      React.createElement("circle", { cx: 424, cy: 14, r: 2, fill: RU_C.red, fillOpacity: ".3" }),
      // Leaf sprays
      React.createElement("path", { d: "M30 8 Q35 4 38 8 Q35 10 30 8Z", fill: RU_C.gold, fillOpacity: ".3" }),
      React.createElement("path", { d: "M90 16 Q95 20 98 16 Q95 14 90 16Z", fill: RU_C.gold, fillOpacity: ".3" }),
      React.createElement("path", { d: "M150 8 Q155 4 158 8 Q155 10 150 8Z", fill: RU_C.gold, fillOpacity: ".3" }),
      React.createElement("path", { d: "M210 16 Q215 20 218 16 Q215 14 210 16Z", fill: RU_C.gold, fillOpacity: ".3" }),
      React.createElement("path", { d: "M270 8 Q275 4 278 8 Q275 10 270 8Z", fill: RU_C.gold, fillOpacity: ".3" }),
      React.createElement("path", { d: "M330 16 Q335 20 338 16 Q335 14 330 16Z", fill: RU_C.gold, fillOpacity: ".3" }),
      React.createElement("path", { d: "M390 8 Q395 4 398 8 Q395 10 390 8Z", fill: RU_C.gold, fillOpacity: ".3" }),
      React.createElement("path", { d: "M450 16 Q455 20 458 16 Q455 14 450 16Z", fill: RU_C.gold, fillOpacity: ".3" })
    )
  );
}

// ── Historical Date Markers (along page edges) ───────────────
function RuDateMarkers() {
  return React.createElement("div", {
    style: {
      position: "fixed", right: 18, top: "10%", bottom: "10%",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      pointerEvents: "none", zIndex: 1,
    },
  },
    RU_DATES.map(function(d) {
      return React.createElement("div", {
        key: d.year,
        style: {
          fontFamily: RU_Mono, fontSize: 9, color: "rgba(140,110,40,.2)",
          textAlign: "right", letterSpacing: ".5px", lineHeight: 1.2,
        },
      },
        React.createElement("div", { style: { fontSize: 10, fontWeight: 600 } }, d.year),
        React.createElement("div", { style: { fontSize: 7, opacity: 0.7 } }, d.label)
      );
    })
  );
}

// ── Izrazets tile pattern (Yaroslavl churches) ───────────────
function RuIzrazetsPattern() {
  return React.createElement("svg", {
    width: "100%", height: 16, viewBox: "0 0 480 16", preserveAspectRatio: "xMidYMid meet",
    style: { display: "block", margin: "8px auto", opacity: 0.12, maxWidth: 500 },
  },
    // Repeating diamond-in-square tile motif (izrazets)
    [0,40,80,120,160,200,240,280,320,360,400,440].map(function(x, i) {
      return React.createElement("g", { key: i },
        React.createElement("rect", { x: x+2, y: 2, width: 12, height: 12, fill: "none", stroke: RU_C.gold, strokeWidth: ".4", transform: "rotate(45," + (x+8) + ",8)" }),
        React.createElement("circle", { cx: x+8, cy: 8, r: 2, fill: RU_C.gold, fillOpacity: ".15" }),
        React.createElement("line", { x1: x+16, y1: 4, x2: x+16, y2: 12, stroke: RU_C.gold, strokeWidth: ".3" })
      );
    })
  );
}

// ── Territory Expansion Data (SVG mode) ──────────────────────
var RUSSIA_ERAS = [
  { id: 'muscovy', label: 'Muscovy (1462)', width: 120, y: 40, color: '#8a6040', gained: 'Grand Duchy consolidated. ~430,000 km\u00b2. Moscow as center.', cost: 'Mongol tribute ended. Internal wars with Novgorod, Tver.' },
  { id: 'peter', label: 'Peter I (1725)', width: 280, y: 100, color: '#a07050', gained: 'Baltic access (St. Petersburg). ~2,500,000 km\u00b2. Window to Europe.', cost: 'Great Northern War (1700-1721). 200,000+ casualties. Forced modernization.' },
  { id: 'catherine', label: 'Catherine II (1796)', width: 420, y: 160, color: '#b08060', gained: 'Crimea, Poland partitions, Black Sea access. ~4,500,000 km\u00b2.', cost: 'Pugachev Rebellion suppressed. Serfdom intensified to fund expansion.' },
  { id: 'alexander', label: 'Alexander I (1825)', width: 520, y: 220, color: '#c09070', gained: 'Finland, Bessarabia, Caucasus, Napoleon defeated. ~5,400,000 km\u00b2.', cost: 'Napoleonic Wars: 300,000+ dead. Decembrist revolt follows. Reform stalls.' },
  { id: 'nicholas', label: 'Nicholas II (1914)', width: 650, y: 280, color: '#c4a862', gained: 'Central Asia, Manchuria, largest contiguous empire. ~22,800,000 km\u00b2.', cost: 'Russo-Japanese War defeat (1905). Revolution of 1905. WWI collapse imminent.' },
];

// ── Turning Point Data ─────────────────────────────────────
const TURNING_POINTS = [
  {
    id: "kievan",
    num: "I",
    era: "882 \u2013 1240",
    title: "Kievan Rus\u2019",
    subtitle: "Viking Origins & Byzantine Faith",
    context: "Varangian warrior-traders from Scandinavia established trading posts along the Dnieper river system, linking the Baltic to Constantinople. By 882, Oleg of Novgorod seized Kiev, creating a loose federation of Slavic tribes under a Norse ruling dynasty. The Rurikid princes governed through retinue politics\—personal loyalty rather than institutional law.",
    decision: "In 988, Grand Prince Vladimir of Kiev adopted Orthodox Christianity from Byzantium rather than Islam, Judaism, or Latin Christianity. The Primary Chronicle records his envoys\u2019 awe at the Hagia Sophia: they \u201cknew not whether they were in heaven or on earth.\u201d Vladimir ordered mass baptism of Kievans in the Dnieper, destroyed pagan idols, and imported Byzantine liturgy, alphabet, and legal concepts wholesale.",
    counterfactual: "Had Vladimir chosen Latin Christianity, Rus\u2019 would have entered the Western ecclesiastical orbit\—papal authority, Latin literacy, Scholastic philosophy. The cultural bifurcation between \u201cEastern\u201d and \u201cWestern\u201d Europe might never have crystallized so sharply. Alternatively, adoption of Islam (as the Volga Bulgars had done) would have aligned Rus\u2019 with the Abbasid cultural sphere, fundamentally altering Eurasian geopolitics.",
    legacy: "The Byzantine inheritance gave Russia its alphabet (Cyrillic, adapted from Glagolitic by Saints Cyril and Methodius), its conception of sacred kingship (the tsar as God\u2019s anointed), its architectural tradition (onion domes derive from Byzantine church forms), and its deep suspicion of Western rationalism. The Orthodox Church became the ideological backbone of Russian statehood for a millennium.",
    sources: ["Riasanovsky, ch. 2\u20134", "Franklin & Shepard, \u201cThe Emergence of Rus\u201d", "Hosking, ch. 1"],
    themeLinks: ["autocracy", "religion", "westVsEast"],
  },
  {
    id: "mongol",
    num: "II",
    era: "1240 \u2013 1480",
    title: "The Mongol Yoke",
    subtitle: "Tribute, Isolation & Moscow\u2019s Rise",
    context: "The Mongol invasion of 1237\u20131240 was catastrophic. Batu Khan\u2019s armies destroyed Kiev, Vladimir, Ryazan, and dozens of other cities. The Russian principalities became tributaries of the Golden Horde, required to pay yasak (tribute), supply military levies, and receive yarlyks (patents of authority) from the Khan to rule.",
    decision: "Moscow\u2019s princes, beginning with Ivan I Kalita (\u201cMoneybag,\u201d r. 1325\u20131340), chose collaboration over resistance. Ivan secured the right to collect tribute on behalf of the Horde across all Russian lands, transforming Moscow from a minor principality into the fiscal center of northeastern Rus\u2019. The Moscow princes also obtained the Metropolitan\u2019s residence, making their city the religious capital.",
    counterfactual: "Had Novgorod or Tver emerged as the dominant principality instead of Moscow, Russian political culture might have developed differently. Novgorod\u2019s veche (popular assembly) represented a proto-republican tradition; Tver\u2019s princes favored open resistance to the Horde. Moscow\u2019s triumph entrenched a model of centralized, autocratic rule built on fiscal extraction and collaboration with overwhelming external power.",
    legacy: "The Mongol period isolated Russia from the Renaissance, the Reformation, and the development of Western legal institutions. It embedded tribute-collection as the primary relationship between ruler and ruled, and it made Moscow the unquestioned center of Russian political gravity. Historians debate the depth of Mongol influence: Vernadsky argued it was profound; Halperin maintained Russian institutions were largely indigenous.",
    sources: ["Halperin, \u201cRussia and the Golden Horde\u201d", "Riasanovsky, ch. 6\u20137", "Hosking, ch. 2"],
    themeLinks: ["autocracy", "expansion", "westVsEast"],
  },
  {
    id: "ivan3",
    num: "III",
    era: "1462 \u2013 1505",
    title: "Ivan III & the Third Rome",
    subtitle: "Consolidation & Imperial Ideology",
    context: "By the mid-15th century, the Golden Horde had fractured into successor khanates. Constantinople fell to the Ottomans in 1453, leaving Russia as the largest Orthodox state. Ivan III inherited a Muscovite principality that was still formally a Horde tributary, surrounded by rival Russian princes and the powerful Grand Duchy of Lithuania.",
    decision: "Ivan III undertook three transformations simultaneously. First, he annexed Novgorod (1478), Tver (1485), and other principalities, tripling Muscovy\u2019s territory. Second, he renounced tribute to the Horde in the Great Stand on the Ugra River (1480), ending 240 years of nominal Mongol sovereignty. Third, he married Sophia Palaiologina, niece of the last Byzantine emperor, adopted the double-headed eagle, and allowed the monk Filofei to articulate the \u201cThird Rome\u201d doctrine: Moscow as successor to Rome and Constantinople.",
    counterfactual: "Without the Third Rome ideology, Russian expansionism might have remained purely territorial rather than acquiring its messianic, civilizational dimension. If Novgorod had maintained independence\—perhaps with Lithuanian backing\—a viable alternative polity with commercial connections to the Hanseatic League could have persisted in northwestern Russia, creating a fundamentally different political geography.",
    legacy: "Ivan III\u2019s reign established the template for Russian imperial governance: territorial consolidation through annexation, ideological legitimation through religious mission, and the elimination of alternative power centers. The Sudebnik of 1497 began codifying law across the expanded state. The double-headed eagle remains Russia\u2019s state symbol today.",
    sources: ["Riasanovsky, ch. 8\u201310", "Figes, \u201cNatasha\u2019s Dance,\u201d pp. 297\u2013312", "Hosking, ch. 3"],
    themeLinks: ["autocracy", "expansion", "religion"],
  },
  {
    id: "ivan4",
    num: "IV",
    era: "1547 \u2013 1584",
    title: "Ivan IV (The Terrible)",
    subtitle: "Terror as Governance",
    context: "Ivan IV was crowned the first \u201cTsar of All Russia\u201d in 1547, a title deliberately evoking the Caesars of Rome and Byzantium. His early reign featured promising reforms: the Chosen Council, the Stoglav Church Council, the first Zemsky Sobor (assembly of the land), and legal codification. The conquest of the Kazan and Astrakhan khanates (1552\u20131556) opened the Volga corridor and the path to Siberia.",
    decision: "After 1560, Ivan turned to institutional terror. The oprichnina (1565\u20131572) created a state-within-a-state: oprichniki enforcers, clad in black and riding black horses, were given license to expropriate and murder the boyar aristocracy. The sack of Novgorod (1570) killed thousands. Ivan personally participated in torture. The oprichnina shattered the boyar class as an independent political force and established a precedent: the autocrat could destroy any social group that appeared to constrain his power.",
    counterfactual: "Had Ivan continued with the reformist approach of his early reign\—the Chosen Council model of constrained monarchy\—Russia might have developed something resembling the limited monarchies emerging in Western Europe. The boyars could have evolved into a constitutionally significant aristocracy, as happened with English barons or Polish szlachta. Instead, terror eliminated the social basis for any check on autocratic power.",
    legacy: "The oprichnina created what Pipes called the \u201cpatrimonial state\u201d\—the idea that the tsar owned Russia as personal property, that all land and people were his to dispose of. This principle persisted through the Romanov dynasty and, in transformed form, through the Soviet era. Ivan\u2019s reign also began Russian expansion into Siberia (Yermak\u2019s expedition, 1581), initiating the continental imperial project that would eventually reach the Pacific.",
    sources: ["Pipes, \u201cRussia Under the Old Regime,\u201d ch. 4\u20135", "Riasanovsky, ch. 11\u201313", "Hosking, ch. 4"],
    themeLinks: ["autocracy", "expansion", "terror"],
  },
  {
    id: "troubles",
    num: "V",
    era: "1598 \u2013 1613",
    title: "The Time of Troubles",
    subtitle: "Succession Crisis & National Survival",
    context: "Ivan IV\u2019s death in 1584 left a devastated realm. His capable son Ivan was dead (killed by his father in a rage), and the surviving heir, Feodor I, was weak-willed. When Feodor died childless in 1598, the Rurikid dynasty ended after 700 years. Boris Godunov, a boyar who had effectively ruled under Feodor, was elected tsar by a Zemsky Sobor, but his legitimacy was never secure.",
    decision: "The period 1598\u20131613 saw the near-dissolution of the Russian state. A series of pretenders (False Dmitris) claimed to be Ivan IV\u2019s miraculously surviving son. Polish-Lithuanian forces occupied Moscow itself in 1610\u20131612. Famine, civil war, and foreign invasion reduced Russia to anarchy. The crisis was resolved by a national militia led by the butcher Kuzma Minin and Prince Dmitry Pozharsky, who liberated Moscow. A Zemsky Sobor in 1613 elected the sixteen-year-old Mikhail Romanov as tsar, founding the dynasty that would rule until 1917.",
    counterfactual: "Had the Polish candidate W\u0142adys\u0142aw been accepted as tsar (as some boyars proposed), Russia might have entered into a personal union with Poland-Lithuania, potentially evolving toward the szlachta model of noble democracy. Alternatively, prolonged fragmentation could have resulted in permanent partition\—a western, Catholic-influenced zone under Polish suzerainty and an eastern, Orthodox zone centered on secondary cities. The modern Russian state might never have formed.",
    legacy: "The Time of Troubles became Russia\u2019s founding trauma\—the proof that without strong autocratic authority, the state would collapse and foreign powers would dismember it. This narrative justified autocracy for centuries: disorder was the alternative. November 4 (the liberation of Moscow) is still a Russian national holiday. The Romanov dynasty\u2019s legitimacy rested on the 1613 election, though they quickly moved to make their authority hereditary and absolute.",
    sources: ["Dunning, \u201cRussia\u2019s First Civil War\u201d", "Riasanovsky, ch. 14\u201315", "Figes, ch. 4"],
    themeLinks: ["autocracy", "westVsEast", "religion"],
  },
  {
    id: "peter",
    num: "VI",
    era: "1682 \u2013 1725",
    title: "Peter the Great",
    subtitle: "Westernization & the Window to Europe",
    context: "By the late 17th century, Russia was militarily and technologically inferior to Western Europe. The Ottoman Empire blocked the south, Sweden dominated the Baltic, and Russia had no warm-water port. Peter I, who became sole ruler in 1696 after deposing his half-sister Sofia\u2019s regency, had spent time in Moscow\u2019s \u201cGerman Quarter\u201d and was consumed with Western technology, especially shipbuilding and artillery.",
    decision: "Peter\u2019s reforms were revolutionary in scope. He created a professional army and navy modeled on European lines. He built St. Petersburg (founded 1703) on conquered Swedish marshland as a \u201cwindow to Europe,\u201d forcibly relocating the capital from Moscow. He abolished the Patriarchate and subordinated the Church to a Holy Synod controlled by a government official. He imposed Western dress, mandated beard-shaving, reformed the calendar, created the Table of Ranks (replacing hereditary nobility with a merit-based service hierarchy), and established the first Russian newspaper and the Academy of Sciences.",
    counterfactual: "Without Peter, Russia might have followed an evolutionary path more similar to the Ottoman Empire\u2019s\—gradual, incomplete modernization that preserved traditional institutions. The Old Believers\u2019 revolt against Nikon\u2019s reforms (1650s\u201360s) showed significant social resistance to Westernization. A ruler less ruthlessly determined might have compromised, producing a hybrid state that modernized selectively without the wholesale cultural revolution Peter imposed. St. Petersburg would not exist; Moscow would have remained the capital, and Russia\u2019s orientation would have been more continental than maritime.",
    legacy: "Peter created the fundamental tension in modern Russian identity: the split between Westernizers and Slavophiles that persists to this day. He demonstrated that modernization in Russia would be imposed from above, by state coercion, rather than emerging organically from society. The Table of Ranks created a service nobility dependent on the state\—the ancestor of the Soviet nomenklatura. St. Petersburg became one of Europe\u2019s great cities and the symbol of Russia\u2019s European aspiration.",
    sources: ["Hughes, \u201cRussia in the Age of Peter the Great\u201d", "Riasanovsky, ch. 17\u201319", "Figes, \u201cNatasha\u2019s Dance,\u201d pp. 1\u201348"],
    themeLinks: ["autocracy", "westVsEast", "expansion"],
  },
];

// ── Recurring Themes ───────────────────────────────────────
const THEMES = [
  {
    id: "autocracy",
    title: "Autocratic Continuity",
    icon: "\u2655",
    description: "Every turning point reinforced centralized, personal rule. From Vladimir\u2019s baptismal decree through Ivan IV\u2019s oprichnina to Peter\u2019s forced modernization, transformative change in Russia has consistently been driven by a single will imposed on a vast, resistant territory. Alternative models\—Novgorod\u2019s veche, the boyar duma, the Zemsky Sobor\—were systematically eliminated or co-opted.",
    evidence: [
      "Vladimir\u2019s unilateral adoption of Christianity (988)",
      "Moscow\u2019s princes centralizing tribute collection (1325\u2013)",
      "Ivan III annexing Novgorod and ending its assembly (1478)",
      "Ivan IV\u2019s oprichnina destroying boyar independence (1565\u201372)",
      "Time of Troubles narrative justifying autocracy as necessity",
      "Peter\u2019s Table of Ranks replacing hereditary with service nobility",
    ],
    analysis: "The pattern suggests that Russia\u2019s geographic scale\—spanning 11 time zones by Peter\u2019s death\—created structural incentives for centralized command. But path dependency matters: each autocratic \u201csuccess\u201d destroyed the social institutions that might have provided alternative governance models, making the next round of autocracy more likely.",
  },
  {
    id: "westVsEast",
    title: "The East\u2013West Tension",
    icon: "\u2694",
    description: "Russia has oscillated between European aspiration and Asian reality since its founding. The choice of Byzantium over Rome, the Mongol isolation, the Third Rome doctrine, and Peter\u2019s Westernization all represent different resolutions of the same fundamental question: is Russia part of Europe, or something distinct?",
    evidence: [
      "Byzantine Christianity vs. Latin (988)",
      "Mongol period isolating Russia from Renaissance (1240\u20131480)",
      "Third Rome doctrine asserting civilizational independence (1510s)",
      "Ivan IV\u2019s Livonian War seeking Baltic access and failing (1558\u201383)",
      "Time of Troubles: Polish occupation as Western threat (1610\u201312)",
      "Peter building St. Petersburg as deliberate Western orientation (1703)",
    ],
    analysis: "The Slavophile\u2013Westernizer debate that dominated 19th-century Russian intellectual life was prefigured in every major turning point. The tension is structural, not merely ideological: Russia\u2019s Eurasian geography means it will always face both directions. Each \u201cresolution\u201d has been temporary.",
  },
  {
    id: "expansion",
    title: "Territorial Imperialism",
    icon: "\u2690",
    description: "The Russian state has expanded almost continuously since 1462. Ivan III tripled Muscovy\u2019s territory; Ivan IV conquered the Volga corridor and began the Siberian conquest; Peter seized the Baltic coast. This expansion was driven by security logic (buffer zones), economic motives (fur trade, warm-water ports), and ideological mission (Orthodox civilization, Third Rome).",
    evidence: [
      "Annexation of Novgorod, Tver, Pskov (1478\u20131510)",
      "Conquest of Kazan and Astrakhan khanates (1552\u201356)",
      "Yermak\u2019s Siberian expedition (1581)",
      "Acquisition of Left-Bank Ukraine (1667)",
      "Peter\u2019s conquest of Baltic provinces (1721)",
      "Territorial expansion averaging 50 sq. miles per day for 400 years (Hosking)",
    ],
    analysis: "Hosking\u2019s famous observation that \u201cRussia has been an empire before it was a nation\u201d captures the paradox: the imperial project preceded and arguably prevented the development of Russian national identity. The state\u2019s resources were consumed by administering and defending an ever-expanding frontier, leaving little capacity for institutional development.",
  },
  {
    id: "religion",
    title: "Orthodoxy as State Ideology",
    icon: "\u2626",
    description: "The Orthodox Church served as the ideological infrastructure of Russian statehood from 988 to 1917. It provided legitimation (the tsar as God\u2019s anointed), cultural cohesion (shared liturgy and alphabet across vast territory), and civilizational identity (the Third Rome doctrine distinguishing Russia from both Catholic West and Islamic East).",
    evidence: [
      "Vladimir\u2019s adoption of Byzantine Christianity (988)",
      "Metropolitan\u2019s relocation to Moscow (1326)",
      "Third Rome doctrine (Filofei, c. 1510)",
      "Stoglav Council standardizing religious practice (1551)",
      "Old Believers\u2019 schism over liturgical reform (1650s\u201360s)",
      "Peter\u2019s subordination of Church to state via Holy Synod (1721)",
    ],
    analysis: "Peter\u2019s abolition of the Patriarchate in 1721 transformed the Church from a semi-independent institution into a department of state. This anticipated the Soviet regime\u2019s instrumentalization of ideology: in both cases, the belief system served the state rather than constraining it. The Church\u2019s post-Soviet revival under Putin continues this pattern.",
  },
  {
    id: "terror",
    title: "Violence as State-Building",
    icon: "\u2620",
    description: "Institutional violence\—not merely war but systematic terror directed at domestic populations\—recurs as a tool of state transformation. Ivan IV\u2019s oprichnina, Peter\u2019s forced labor building St. Petersburg (estimated 30,000\u2013100,000 deaths), and the precedent they set for Soviet state violence represent a pattern unique among European states in its scale and duration.",
    evidence: [
      "Mongol invasion devastation (1237\u201340)",
      "Oprichnina mass executions (1565\u201372)",
      "Sack of Novgorod killing thousands (1570)",
      "Time of Troubles famine and civil war (1601\u201313)",
      "Peter\u2019s forced construction of St. Petersburg (1703\u201312)",
      "Streltsy executions and public display of bodies (1698)",
    ],
    analysis: "The regularity of state violence against its own population distinguishes Russian state-building from Western European patterns, where violence was primarily directed outward. The Mongol invasion may have established the template: survival required the capacity for overwhelming force, and the distinction between external and internal enemies was never firmly established.",
  },
];

// ── Tsar's Dilemma Quiz Data ─────────────────────────────
const RU_QUIZ = [
  {
    id: "q1",
    title: "The Faith Question (988)",
    scenario: "You are advising Grand Prince Vladimir of Kiev. Envoys have returned from Rome, Constantinople, the Khazar Khagonate, and the Volga Bulgars. Each offers a different faith. Your realm straddles the trade route between Scandinavia and Byzantium. The Bulgars offer Islam but ban alcohol. Rome offers Latin Christianity but demands papal supremacy. The Khazars offer Judaism but their empire is declining. Constantinople offers Orthodoxy with a spectacular liturgy and no requirement to subordinate to a foreign patriarch permanently. Which do you recommend?",
    options: [
      { id: "a", text: "Accept Latin Christianity from Rome — align with the rising Western European powers and gain access to Scholastic learning", score: 1, feedback: "This is strategically plausible. Western alignment might have integrated Rus' into the European legal and intellectual tradition earlier. However, Vladimir rejected this — papal authority over a prince who saw himself as sovereign was unacceptable. The Primary Chronicle frames Rome's demand for obedience as the dealbreaker." },
      { id: "b", text: "Accept Orthodox Christianity from Constantinople — the trade relationship already exists and the liturgy awed your envoys", score: 3, feedback: "This matches history. Vladimir chose Byzantium because it aligned with existing commercial ties (the Dnieper trade route to Constantinople was Rus' economic lifeline), offered a model of sacred kingship without papal interference, and — as the Chronicle famously records — his envoys could not tell whether they were in heaven or on earth at the Hagia Sophia. The choice shaped Russian civilization for a millennium." },
      { id: "c", text: "Accept Islam from the Volga Bulgars — the steppe trade networks are expanding and the Abbasid world leads in science", score: 1, feedback: "An intriguing counterfactual. The Volga Bulgars had already converted, demonstrating Islam's viability in the steppe. But the Chronicle records Vladimir's objection to the alcohol prohibition — 'Drinking is the joy of the Russes.' Beyond the anecdote, Islam would have oriented Rus' toward Central Asia rather than the Mediterranean, fundamentally altering Eurasian geopolitics." },
    ],
    historicalOutcome: "Vladimir chose Orthodox Christianity. The decision gave Russia its alphabet (Cyrillic), its conception of sacred kingship, its church architecture, and its civilizational orientation toward Byzantium rather than Rome. It created the cultural fault line between 'Eastern' and 'Western' Europe that persists today.",
  },
  {
    id: "q2",
    title: "Moscow's Gamble (1325)",
    scenario: "You advise Ivan I of Moscow, a minor principality in northeastern Rus'. The Golden Horde demands tribute from all Russian lands. Your rivals — Tver and Novgorod — are larger and richer. Tver's prince has just murdered a Mongol tax collector and called for open rebellion. The Khan is sending a punitive expedition. You have three options: join the rebellion for Russian freedom, stay neutral and wait, or offer to lead the Khan's punitive expedition against Tver yourself and collect all Russian tribute on the Horde's behalf.",
    options: [
      { id: "a", text: "Join Tver's rebellion — unite the Russian principalities against the Horde while they are distracted by internal succession disputes", score: 1, feedback: "Heroic but suicidal. In 1327, Tver did rebel. The Horde's response was devastating — Tver was burned and its prince fled. No Russian coalition could match Mongol military power in the 14th century. Premature resistance meant annihilation." },
      { id: "b", text: "Stay neutral — preserve your forces and wait for the Horde to weaken through internal conflict", score: 2, feedback: "Cautious and defensible. This is essentially what Novgorod did. But neutrality meant someone else would collect the tribute and gain the Khan's favor. Moscow would have remained a minor principality, and Russian unification might have taken a very different path." },
      { id: "c", text: "Volunteer to crush Tver for the Khan — gain the right to collect tribute across all Russian lands and become the Horde's indispensable agent", score: 3, feedback: "This is exactly what Ivan Kalita ('Moneybag') did. By leading a Mongol-Muscovite force to destroy Tver, he won the Khan's trust and the lucrative tribute-collection franchise. Moscow became the fiscal center of all Rus'. Morally compromising? Absolutely. Strategically brilliant? Undeniably. It laid the foundation for Moscow's eventual dominance — built, paradoxically, on collaboration with the conqueror." },
    ],
    historicalOutcome: "Ivan Kalita chose collaboration. He personally led Mongol troops against Tver, earning the tribute-collection rights. This transformed Moscow from a backwater into the financial and eventually political center of Russia. The strategy was cynical but effective — Moscow used Mongol power to eliminate its Russian rivals, then eventually overthrew the Horde itself 150 years later.",
  },
  {
    id: "q3",
    title: "Peter's Dilemma (1703)",
    scenario: "You are Peter I, fresh from your Grand Embassy tour of Western Europe. Russia has just won access to the Neva River delta after defeating Sweden at Nöteborg. The land is a frozen, disease-ridden swamp. Your advisors urge you to fortify the position and return to Moscow. But you are obsessed with making Russia a naval power with a 'window to Europe.' You could: build a modest fortress and naval base, expand Moscow as a modernized capital, or construct an entirely new European-style capital city on the swamp — by force if necessary.",
    options: [
      { id: "a", text: "Build a modest naval fortress — secure the Baltic outlet without the ruinous expense of a new capital", score: 2, feedback: "Strategically sound and far less costly in lives and treasure. A naval base would have achieved the military objective. But it would not have achieved Peter's cultural objective — physically relocating Russia's center of gravity toward Europe. The fortress-only approach was what most practical advisors recommended." },
      { id: "b", text: "Modernize Moscow as the capital — invest in Western-style institutions, industry, and education within the existing city", score: 1, feedback: "This approach would have been less traumatic and arguably more sustainable. But Peter explicitly rejected it. Moscow represented everything he despised — the boyars, the Patriarchate, Old Muscovy. For Peter, modernization required a physical break with the past. Moscow could not be reformed; it had to be bypassed." },
      { id: "c", text: "Build an entirely new capital on the swamp — drag the Russian elite to Europe by force, making Westernization inescapable", score: 3, feedback: "This is what Peter actually did, and it was spectacularly ruthless. St. Petersburg was built by conscript labor at an estimated cost of 30,000-100,000 lives. Peter forced the nobility to relocate, build stone houses in prescribed Western styles, and abandon their Moscow estates. The city was a statement: Russia's future was European, and the autocrat's will could remake geography itself. Was it a good decision? That depends on whether you value the cultural transformation it enabled more than the human cost it exacted." },
    ],
    historicalOutcome: "Peter built St. Petersburg from nothing, at enormous human cost. The city became Russia's capital for two centuries, one of Europe's great cultural centers, and the physical embodiment of the Westernizer-Slavophile tension that defines modern Russian identity. It proved that in Russia, modernization would be imposed from above by state coercion — a pattern that repeated through Stalin's industrialization and beyond.",
  },
];

// ── Helper: small reusable sub-components (functions) ──────
function RuBadge({ label, color }) {
  return React.createElement("span", {
    style: {
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 3,
      fontSize: 11,
      fontFamily: RU_Mono,
      letterSpacing: 0.5,
      color: color || RU_C.gold,
      border: "1px solid " + (color || RU_C.gold) + "44",
      background: (color || RU_C.gold) + "10",
    },
  }, label);
}

function RuSection({ title, children, color }) {
  return React.createElement("div", {
    style: { marginBottom: 20 },
  },
    React.createElement("div", {
      style: {
        fontSize: 11,
        fontFamily: RU_Mono,
        textTransform: "uppercase",
        letterSpacing: 2,
        color: color || RU_C.gold,
        marginBottom: 8,
        paddingBottom: 6,
        position: "relative",
      },
    },
      title,
      React.createElement("svg", { width: "100%", height: 6, viewBox: "0 0 400 6", preserveAspectRatio: "xMinYMid meet", style: { display: "block", marginTop: 4, opacity: 0.4 } },
        React.createElement("line", { x1: 0, y1: 3, x2: 180, y2: 3, stroke: color || RU_C.gold, strokeWidth: ".6" }),
        React.createElement("path", { d: "M185 3 L188 1 L191 3 L188 5 Z", fill: color || RU_C.gold, fillOpacity: ".5" }),
        React.createElement("line", { x1: 196, y1: 3, x2: 400, y2: 3, stroke: color || RU_C.gold, strokeWidth: ".3", strokeDasharray: "4,3" })
      )
    ),
    React.createElement("div", {
      style: { fontSize: 14, fontFamily: RU_Serif, lineHeight: 1.75, color: RU_C.tx, letterSpacing: ".01em" },
    }, children)
  );
}

// ── Main Component ─────────────────────────────────────────
function RussiaView({ setView }) {
  const [mode, setMode]       = useState("timeline");
  const [activeTP, setActiveTP] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizRevealed, setQuizRevealed] = useState({});
  const [eraHover, setEraHover] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [hybridCell, setHybridCell] = useState(null);
  const [sistemaPoint, setSistemaPoint] = useState(null);
  const [sistemaScenario, setSistemaScenario] = useState({});
  const [ratchetOpen, setRatchetOpen] = useState({});
  const [ratchetCount, setRatchetCount] = useState(0);
  const [coalitionRemoved, setCoalitionRemoved] = useState({});
  const [coalitionDetail, setCoalitionDetail] = useState(null);

  // Court (Kremlin factional balance)
  const [courtFactions, setCourtFactions] = useState({
    hawks:      { name: "Security Hawks",     figures: "Patrushev clan", domain: "FSB / Security Council", stance: "Confrontation with West", power: 85 },
    military:   { name: "Military-Industrial", figures: "Chemezov / Rostec", domain: "Defense industry", stance: "Contracts & modernization", power: 70 },
    energy:     { name: "Energy Oligarchs",    figures: "Sechin / Miller", domain: "Rosneft, Gazprom", stance: "Stability & exports", power: 75 },
    technocrats:{ name: "Technocrats",         figures: "Nabiullina / Siluanov", domain: "Central Bank, Finance Ministry", stance: "Fiscal discipline", power: 50 },
    political:  { name: "Political Managers",  figures: "Kiriyenko", domain: "Elections, media, governors", stance: "Managed democracy", power: 60 },
    rogue:      { name: "Rogue Actors",        figures: "Post-Prigozhin remnants", domain: "PMCs, irregular forces", stance: "Unpredictable leverage", power: 30 },
  });
  const [courtLog, setCourtLog] = useState([]);
  const [courtPutinControl, setCourtPutinControl] = useState(92);

  // Vory (state-crime nexus)
  const [vorySelectedFlow, setVorySelectedFlow] = useState(null);

  // Kompromat (mutual vulnerability web)
  const [kompSelectedEdge, setKompSelectedEdge] = useState(null);
  const [kompScenario, setKompScenario] = useState(null);

  // Compare (structured comparison engine)
  const [compareEventA, setCompareEventA] = useState(0);
  const [compareEventB, setCompareEventB] = useState(1);

  // Correlate (multi-variable correlation dashboard)
  const [corrToggles, setCorrToggles] = useState({ oil: true, sanctions: true, military: true, protest: true, aggression: true });
  const [corrRangeStart, setCorrRangeStart] = useState(null);
  const [corrRangeEnd, setCorrRangeEnd] = useState(null);

  // Scenario (branching decision tree with indicator tracking)
  const [scenarioIndicators, setScenarioIndicators] = useState({});

  // Advocate (Devil's Advocate Framework)
  const [advocateThesis, setAdvocateThesis] = useState("");
  const [advocateSubmitted, setAdvocateSubmitted] = useState(false);
  const [advocateResponses, setAdvocateResponses] = useState({});
  const [advocateStatuses, setAdvocateStatuses] = useState({});

  // Lexicon (Strategic Lexicon Decoder)
  const [lexiconSearch, setLexiconSearch] = useState("");
  const [lexiconExpanded, setLexiconExpanded] = useState(null);

  // Breaks (Pattern Break Detector)
  const [breaksSelected, setBreaksSelected] = useState(null);
  const [breaksBreakpoint, setBreaksBreakpoint] = useState(null);

  // Contract (Authoritarian Social Contract Dashboard)
  const [contractSelected, setContractSelected] = useState(null);
  const [contractExplanation, setContractExplanation] = useState(null);

  // Briefing (Briefing Prep Generator)
  const [briefAudience, setBriefAudience] = useState("european_defense");
  const [briefTopic, setBriefTopic] = useState("ukraine_trajectory");
  const [briefDuration, setBriefDuration] = useState("30");
  const [briefDetailMode, setBriefDetailMode] = useState("brief");
  const [briefExpanded, setBriefExpanded] = useState({});

  // ── Scholarly micro-icon tooltip content ────────────────
  var tooltipContent = {
    dome: "The onion dome emerged in Muscovy around the 13th century \u2014 its shape may derive from the need to shed heavy snow loads. By Ivan III\u2019s reign, the domes of the Moscow Kremlin cathedrals (rebuilt 1475\u20131508 by Italian architects under Ivan\u2019s direction) had become the architectural signature of Orthodox power.",
    eagle: "Ivan III adopted the double-headed eagle after marrying Sophia Palaiologina (1472), niece of the last Byzantine emperor. This was not merely decorative \u2014 it was a deliberate claim that Moscow had inherited Constantinople\u2019s role as guardian of Orthodox Christianity. The doctrine of Moscow as the \u2018Third Rome\u2019 (after Rome and Constantinople) was formalized by the monk Filofei around 1510, but Ivan III laid its political foundation.",
    horse: "The Standing on the Ugra River (1480) ended Mongol suzerainty without a battle. Both armies faced each other across the river for weeks. When Khan Ahmad withdrew, the \u2018Tatar Yoke\u2019 \u2014 240 years of Mongol overlordship \u2014 ended not with a sword stroke but with a logistical calculation. Ahmad\u2019s alliance with Lithuania had collapsed, and winter was approaching. Sometimes the decisive moment in history is when nothing happens.",
    scroll: "The Sudebnik of 1497 was Russia\u2019s first unified legal code \u2014 but its most consequential provision was Article 57, which restricted peasant movement to a two-week window around St. George\u2019s Day (November 26). This seemingly minor administrative measure planted the seed of serfdom. Over the next 150 years, the window was progressively narrowed until Boris Godunov abolished it entirely in 1597. The full enserfment of the Russian peasantry grew from a scheduling rule in a law code.",
    kremlin: "Ivan III rebuilt the Moscow Kremlin in stone (1485\u20131495) using Italian architects \u2014 Aristotele Fioravanti, Pietro Antonio Solari, Marco Ruffo. This was not mere construction: it was a propaganda statement. The red brick walls and towers that survive today were designed to rival Italian fortresses, signaling that Moscow was a European capital, not a Mongol vassal outpost. The irony: Russia\u2019s most \u2018Russian\u2019 monument was designed by Italians.",
    oprichnina: "The oprichniki wore black robes and carried brooms and severed dog\u2019s heads tied to their saddles \u2014 symbols of sweeping away treason and biting the tsar\u2019s enemies. This was not mere theater: the visual semiotics were deliberately designed to invoke terror. Ivan IV understood that political violence is most effective when ritualized and spectacular. The oprichnina anticipated modern totalitarian aesthetics by four centuries.",
    streltsy: "Peter\u2019s suppression of the Streltsy rebellion (1698) was deliberately spectacular. He personally participated in the executions, forced his courtiers to serve as executioners, and left bodies displayed on the walls of Moscow\u2019s Kremlin for months. The message was unmistakable: the old Muscovite order was being physically destroyed. Peter\u2019s violence was not irrational \u2014 it was a calculated act of political theater, breaking the military caste that might have reversed his reforms.",
    veche: "Novgorod\u2019s veche (popular assembly) represented the road not taken in Russian political development. This was genuine participatory governance: the veche could invite or dismiss princes, approve wars, and negotiate treaties. When Ivan III conquered Novgorod in 1478, he symbolically removed the veche bell \u2014 physically silencing the only institution in Russia that approximated democratic deliberation. The bell was taken to Moscow, where it rang for no one.",
    cross: "The raskol (Great Schism) of the 1650s\u201360s split Russian Orthodoxy over seemingly trivial liturgical reforms \u2014 crossing oneself with two fingers or three, spelling \u2018Jesus\u2019 with one \u2018i\u2019 or two. But the Old Believers who refused to conform were defending something deeper: the principle that sacred tradition could not be altered by state decree. Their persecution (mass self-immolations, exile to Siberia) demonstrated that in Russia, even God answered to the tsar.",
    anchor: "Peter\u2019s obsession with shipbuilding was not mere hobbyism. He personally worked in Dutch and English shipyards during his Grand Embassy (1697\u201398), learning carpentry alongside common laborers. The navy he created from nothing defeated Sweden at Gangut (1714) and Grengam (1720). But the deeper significance was symbolic: a navy required integration with global maritime trade networks, permanently connecting Russia to the Western economic system.",
    // ── Post-Imperial & Soviet scholarly tooltips ──────────────
    okhrana: "The Okhrana (Okhrannye otdeleniya) was the Tsarist secret police from 1881\u20131917. Under Sergei Zubatov, it pioneered agent provocateur infiltration of revolutionary movements and even created police-controlled trade unions (\u2018Zubatovshchina\u2019) to channel worker discontent. The Okhrana\u2019s Paris bureau monitored \u00e9migr\u00e9s including Lenin. Its files, captured in 1917, revealed that Bolshevik organizations had been thoroughly penetrated\u2014some Okhrana agents rose to senior party positions, most notoriously Roman Malinovsky.",
    iron_felix: "Felix Dzerzhinsky (\u2018Iron Felix\u2019) founded the Cheka (VChK) on December 20, 1917, just six weeks after the Bolshevik seizure of power. Operating from the Lubyanka building\u2014a former insurance company headquarters\u2014the Cheka became the instrument of Red Terror. Dzerzhinsky\u2019s motto was \u2018a clean heart, cool head, and warm hands.\u2019 His statue outside the Lubyanka, toppled in August 1991, became the iconic image of Soviet collapse. The building itself remains FSB headquarters today.",
    nkvd_troika: "The NKVD troikas were extrajudicial three-person panels established during the Great Purge (1937\u201338) under NKVD Order No. 00447. Each troika consisted of the regional NKVD chief, the local party secretary, and a prosecutor. They processed cases in minutes without defense counsel, appeal, or the defendant\u2019s presence. An estimated 680,000 people were executed through this mechanism. The troikas represented the bureaucratization of mass murder\u2014state terror reduced to administrative procedure.",
    beria: "Lavrentiy Beria headed the NKVD from 1938 to 1945 and became one of Stalin\u2019s most powerful lieutenants. He oversaw the Gulag system, the Soviet nuclear program (using intelligence from Klaus Fuchs), and wartime deportations of entire ethnic groups. After Stalin\u2019s death in March 1953, Beria briefly positioned himself as a reformer. His arrest in June 1953 by Khrushchev and military leaders including Zhukov, and his execution in December, demonstrated that without Stalin\u2019s arbitration, the system consumed its own architects.",
    gulag: "The Gulag (Glavnoye upravleniye lagerey) peaked at 1.5 million prisoners in 1953 across 476 camp complexes. Kolyma in northeast Siberia was the deadliest\u2014winter temperatures reached \u221250\u00b0C and gold miners worked 14-hour shifts. Solzhenitsyn\u2019s \u2018The Gulag Archipelago\u2019 (published in Paris, 1973) mapped the system\u2019s geography. Varlam Shalamov\u2019s \u2018Kolyma Tales\u2019 described the camps with even starker realism. The Gulag was not merely punitive\u2014it was an economic institution that built canals, mined gold, and felled timber at costs no free labor market could match.",
    potemkin: "The \u2018Potemkin village\u2019 story\u2014that Prince Grigory Potemkin erected fake village facades along Catherine II\u2019s 1787 Crimea tour\u2014was largely fabricated by the Saxon diplomat Georg von Helbig. Potemkin had genuinely developed Crimea after its 1783 annexation, founding Sevastopol and Kherson. The myth, however, became more historically significant than the reality: it captured a deeper truth about Russian governance\u2014the systemic incentive for subordinates to present falsified success reports (ochkovtiratelstvo) that persisted through Soviet collective farm statistics and beyond.",
    table_of_ranks: "Peter I\u2019s Table of Ranks (Tabel o rangakh, 1722) replaced hereditary nobility (mestnichestvo, abolished 1682) with a 14-grade hierarchy across military, civil, and court service. Any man reaching Grade 8 in civil service earned hereditary nobility. This was revolutionary: it created a meritocratic path to elite status and tied the nobility\u2019s privileges to state service. By Catherine II\u2019s reign, however, the system had been undermined\u2014the 1762 Manifesto on the Liberty of the Nobility freed nobles from compulsory service while retaining their privileges, creating a rentier aristocracy.",
    zemstvo: "The zemstvo system, created by Alexander II\u2019s reforms in 1864, established elected local councils responsible for roads, schools, and public health. Zemstvo doctors and teachers became the infrastructure of rural modernization. But the zemstvos also became seedbeds of liberal opposition\u2014their congresses in 1904\u20131905 demanded a national parliament. The Tsarist regime\u2019s paradox: local self-governance created the competent, educated constituency that ultimately demanded national political representation. Shipov, Petrunkevich, and other zemstvo liberals became key figures in the constitutional movement.",
    stolypin: "\u2018Stolypin\u2019s necktie\u2019 (Stolypinsky galstuk) was the contemptuous term coined by the Kadet deputy Rodichev in 1907 for the hangman\u2019s noose, after Prime Minister Pyotr Stolypin\u2019s field courts-martial executed approximately 3,000 revolutionaries between 1906\u20131911. But Stolypin was simultaneously Russia\u2019s most ambitious reformer since Alexander II: his agrarian reform aimed to create a class of independent peasant proprietors by dissolving the commune (mir). Had he lived\u2014he was assassinated in 1911 by a double agent\u2014Russia might have developed a stable rural middle class. Lenin understood this threat, writing that Stolypin\u2019s reforms could make revolution impossible.",
    pale: "The Pale of Settlement (Cherta osedlosti, 1791\u20131917) confined most Jews to the western borderlands of the Russian Empire\u2014roughly the territories of modern Poland, Lithuania, Belarus, and Ukraine. Five million Jews lived within the Pale by 1900. Catherine II established it after the Partitions of Poland brought large Jewish populations under Russian sovereignty. Periodic pogroms (1881\u201382, 1903\u20131906) combined with economic restrictions drove mass emigration\u2014roughly two million Jews left for America between 1880\u20131914. The Pale shaped both the geography of the Holocaust and the demographics of the American Jewish diaspora.",
    smuta: "The Time of Troubles (Smutnoe vremya, 1598\u20131613) saw the near-dissolution of the Russian state. Three False Dmitris claimed the throne. The Polish king\u2019s son was briefly acknowledged as Tsar. A \u2018Seven Boyars\u2019 council (Semiboyarshchina) invited Polish occupation of the Kremlin. Russia lost Smolensk and the western borderlands. The trauma became the founding myth of Russian statecraft: without autocratic authority, the state collapses, foreigners invade, and the people suffer. This narrative was invoked to justify authoritarianism from the Romanovs through Putin.",
    pugachev: "Pugachev\u2019s Rebellion (1773\u201375) was the largest peasant uprising in Russian history before 1917. Emelyan Pugachev, a Don Cossack, impersonated the murdered Peter III and raised an army of Cossacks, Bashkirs, and serfs across the Urals and Volga region. He established a shadow court with his own \u2018College of War.\u2019 Catherine II required major military forces to suppress the revolt. Its legacy was paradoxical: it convinced Catherine that serfdom needed reform but also that reform was too dangerous\u2014the serfs might interpret loosened bonds as license for further rebellion. She tightened serfdom instead.",
    decembrist: "The Decembrist Revolt (December 14, 1825) was mounted by liberal army officers who had seen European governance during the Napoleonic Wars. They demanded a constitution and the abolition of serfdom. The revolt was militarily pathetic\u2014poorly coordinated, with soldiers on Senate Square unsure of their objectives. Nicholas I crushed it in hours, executed five leaders, and exiled over 100 to Siberia. But the Decembrists became martyrs\u2014Herzen called them \u2018a constellation of heroes.\u2019 Their wives\u2019 voluntary exile to Siberia became a potent symbol. Lenin later claimed them as the first link in the revolutionary chain.",
    third_section: "Nicholas I\u2019s Third Section of His Imperial Majesty\u2019s Own Chancellery (1826\u20131880) was Russia\u2019s first permanent political police. Under Count Alexander Benckendorff, its blue-uniformed gendarmes monitored dissent, censored publications, and compiled dossiers. The Third Section had only about 40 staff in Petersburg, relying on a network of informants. Its most famous target was Pushkin, whose correspondence it monitored. Chaadaev was declared officially insane for criticizing Russia. The Third Section established the enduring Russian institution of political police as guardian of ideological orthodoxy\u2014a role inherited by the Okhrana, Cheka, NKVD, KGB, and FSB.",
    alexander_ii: "Alexander II\u2019s assassination on March 1, 1881, by Narodnaya Volya (People\u2019s Will) was one of history\u2019s great tragic ironies. The \u2018Tsar-Liberator\u2019 who emancipated the serfs (1861), reformed the judiciary (1864), created the zemstvos, and introduced universal military service was murdered on the very day he approved the Loris-Melikov Constitution\u2014a proto-parliamentary body. His son Alexander III, traumatized by watching his father bleed to death, reversed the reforms. Terrorism achieved the opposite of its intent: it strengthened reaction and delayed constitutionalism by a generation.",
    witte: "Sergei Witte, Finance Minister (1892\u20131903) and first Prime Minister (1905\u20131906), was the architect of Russia\u2019s industrial revolution. He imposed a gold standard (1897), built the Trans-Siberian Railway, attracted French capital investment, and used protective tariffs and state-directed industrialization. Russia\u2019s industrial output grew 8% annually in the 1890s. But Witte\u2019s modernization created the urban proletariat that would make the 1917 revolution possible. His October Manifesto (1905) conceded a parliament (Duma) that satisfied moderates while enraging both left and right\u2014the classic reformer\u2019s dilemma.",
    bloody_sunday: "Bloody Sunday (January 9/22, 1905) shattered the myth of the \u2018Little Father Tsar.\u2019 Father Georgy Gapon, an Okhrana-connected priest who organized police trade unions, led roughly 150,000 workers to the Winter Palace carrying icons and portraits of Nicholas II. They carried a petition asking for an eight-hour day and a constituent assembly. Troops opened fire, killing at least 130 (Soviet sources claimed 4,600). The massacre destroyed popular monarchism overnight. Gapon fled abroad, was later exposed as a police agent, and was murdered by Socialist Revolutionary Rutenberg in 1906.",
    rasputin: "Grigory Rasputin\u2019s actual role was far more complex than the debauched mystic of popular legend. He appears to have genuinely helped the hemophiliac Tsarevich Alexei\u2014possibly through hypnotic suggestion that reduced stress-related bleeding. His political influence was real but narrower than legend suggests: he influenced ministerial appointments through Empress Alexandra, who believed his prayers kept her son alive. His murder in December 1916 by Prince Yusupov and Grand Duke Dmitri Pavlovich revealed the desperation of the monarchist elite. As Galeotti notes, Rasputin was more symptom than cause of the regime\u2019s dysfunction.",
    whites_reds: "The Russian Civil War (1918\u20131921) was not a simple binary conflict. The \u2018Whites\u2019 were a fractious coalition: monarchists, liberals, SRs, Cossack atamans, and regional separatists who agreed only on opposing Bolshevism. Denikin, Kolchak, Wrangel, and Yudenich never coordinated effectively. The Reds held the strategic center (Moscow-Petrograd industrial heartland), controlled interior lines of communication, and had a unified command under Trotsky. The Whites\u2019 failure to promise land reform to peasants proved fatal\u2014peasants feared White victory would restore landlords. An estimated 7\u201312 million died from combat, disease, and famine combined.",
    kronstadt: "The Kronstadt Rebellion (March 1921) was mounted by the same Baltic Fleet sailors who had been \u2018the pride and glory of the revolution\u2019 in 1917. They demanded free elections to the soviets, freedom of speech, and an end to War Communism. Trotsky ordered the assault across the frozen Gulf of Finland. The Red Army stormed the fortress, killing approximately 2,000 rebels. Kronstadt demonstrated that the Bolsheviks would suppress dissent even from their own base. Lenin pivoted to the New Economic Policy within weeks\u2014a strategic retreat that acknowledged War Communism had brought the regime to the brink.",
    nep: "The New Economic Policy (NEP, 1921\u20131928) was Lenin\u2019s strategic retreat: state control of the \u2018commanding heights\u2019 (banks, heavy industry, foreign trade) combined with market agriculture and small-scale private enterprise. Nepmen (private traders) and kulaks (prosperous peasants) flourished. The economy recovered to pre-war levels by 1926. But the NEP created a political contradiction: a Marxist party presiding over capitalism. Bukharin defended the NEP as the road to socialism (\u2018Enrich yourselves!\u2019). Stalin destroyed both the NEP and Bukharin by 1929, launching forced collectivization and the First Five-Year Plan.",
    collectivization: "Collectivization (1929\u20131933) destroyed Russia\u2019s peasant civilization. Approximately 25 million individual farms were merged into 250,000 collective farms (kolkhozy). Kulaks\u2014broadly defined as any peasant who resisted\u2014were \u2018dekulakized\u2019: property confiscated, families deported to Siberia or Central Asia. An estimated 530,000\u2013600,000 died in deportation. The resulting agricultural collapse, combined with state grain requisitions, caused the Holodomor famine of 1932\u201333, killing 3.5\u20135 million in Ukraine alone. Stalin called this \u2018the revolution from above.\u2019 The peasant commune that had survived the Mongols, the tsars, and the Civil War was annihilated in four years.",
    great_purge: "The Great Purge (Yezhovshchina, 1936\u201338) consumed the revolution\u2019s own architects. Of the 1,966 delegates to the 1934 \u2018Congress of Victors,\u2019 1,108 were arrested. Three of the five marshals of the Soviet Union were shot. The show trials of Zinoviev, Kamenev, Bukharin, and Radek produced impossible confessions to fantastical conspiracies. NKVD chief Nikolai Yezhov (\u2018the Bloody Dwarf\u2019) implemented Stalin\u2019s quotas: regional troikas received target numbers for Category I (execution) and Category II (camp sentences). Yezhov was himself arrested in 1939 and executed in 1940\u2014photographically erased from history.",
    barbarossa: "Operation Barbarossa (June 22, 1941) achieved strategic surprise despite over 80 intelligence warnings, including from Richard Sorge in Tokyo. Stalin\u2019s refusal to believe the intelligence\u2014he annotated one report with an obscenity directed at the source\u2014reflected not stupidity but the logic of his system: no subordinate dared insist when the vozhd had decided. The Wehrmacht destroyed 4,000 aircraft in the first week. But German planning assumed the campaign would end in 8\u201310 weeks. The failure to take Moscow by December 1941 transformed a blitzkrieg into the attritional war that Germany could not win.",
    leningrad_siege: "The Siege of Leningrad (September 8, 1941 \u2013 January 27, 1944) lasted 872 days and killed approximately 800,000 civilians\u2014more than all British and American casualties in the entire war combined. The daily bread ration fell to 125 grams (roughly four thin slices) of adulterated bread. The city maintained cultural life throughout\u2014Shostakovich\u2019s Seventh Symphony was performed in August 1942 by skeletal musicians. The Ice Road (Doroga zhizni) across Lake Ladoga provided the only supply route. The siege became the foundational myth of Leningrad/Petersburg\u2019s identity and a centerpiece of Soviet patriotic memory.",
    zhukov: "Georgy Zhukov was arguably the most important military commander of World War II. He organized the defense of Leningrad (September 1941), commanded the Moscow counteroffensive (December 1941), coordinated the Stalingrad encirclement (November 1942), planned Operation Bagration (June 1944), and led the assault on Berlin (April 1945). His relationship with Stalin was uniquely confrontational\u2014he was one of the few subordinates who argued back. After the war, Stalin exiled him to minor commands out of jealousy. Khrushchev rehabilitated him, then fired him too. Zhukov\u2019s career illustrated how the system consumed even its greatest servants.",
    secret_speech: "Khrushchev\u2019s \u2018Secret Speech\u2019 (February 25, 1956) to a closed session of the 20th Party Congress denounced Stalin\u2019s \u2018cult of personality\u2019 and documented his crimes against the Party (carefully omitting crimes against non-Communists and the non-Russian peoples). The text leaked within weeks and was published by the CIA in June. Its impact was seismic: it triggered the Hungarian Revolution (October 1956), permanently fractured the international communist movement, and created the template for controlled de-legitimization of a predecessor. But Khrushchev preserved the system itself\u2014he attacked Stalin, not Stalinism.",
    gulag_archipelago: "The publication of Solzhenitsyn\u2019s \u2018The Gulag Archipelago\u2019 in Paris (December 1973) was a literary-political earthquake. The KGB had seized the manuscript in 1965, prompting Solzhenitsyn to authorize Western publication. Based on testimony from 227 former prisoners, it documented the camp system\u2019s origins in Lenin (not merely Stalin), its legal foundations, its economic function, and its geography. The French left\u2019s response was particularly significant\u2014Sartre\u2019s dismissals looked increasingly untenable. The book contributed to the collapse of Western Marxist credibility and the rise of the \u2018New Philosophers\u2019 (Glucksmann, L\u00e9vy).",
    andropov: "Yuri Andropov\u2019s 15-year tenure as KGB chairman (1967\u20131982) transformed the agency from a blunt instrument of repression into a sophisticated intelligence service. He pioneered \u2018active measures\u2019 (disinformation campaigns), managed the suppression of dissidents through psychiatric internment rather than mass imprisonment, and cultivated a network of young, reform-minded proteg\u00e9s including Gorbachev. As General Secretary (1982\u201384), his anti-corruption campaigns and discipline drives hinted at reform. His brief rule shaped a generation of KGB officers, including Vladimir Putin, who internalized Andropov\u2019s vision of modernization-through-security-state.",
    gorbachev: "Gorbachev\u2019s twin reforms\u2014glasnost (openness) and perestroika (restructuring)\u2014were intended to save the Soviet system, not destroy it. He envisioned a reformed socialism with media transparency and economic decentralization. But glasnost exposed historical crimes that delegitimized the Party, while perestroika disrupted the command economy without creating market mechanisms. The \u2018Sinatra Doctrine\u2019 (letting Eastern Europe go its own way) unwound the outer empire in 1989. Gorbachev\u2019s tragedy was that his reforms were too radical for the Party apparatus and too cautious for the newly empowered public. He liberated more people than any leader in history and was despised by his own nation for it.",
    august_coup: "The August 1991 coup (August 19\u201321) was mounted by the \u2018Gang of Eight\u2019\u2014hardline Party, military, and KGB leaders including KGB chief Kryuchkov, Defense Minister Yazov, and Vice President Yanayev (whose trembling hands at the press conference became an iconic image of the old regime\u2019s decrepitude). Yeltsin\u2019s stand on a tank outside the White House, the refusal of Alpha Group commandos to storm the building, and the withdrawal of tank units turned the coup into the USSR\u2019s death knell. The Soviet Union formally dissolved four months later on December 25, 1991. Gorbachev resigned that evening.",
    table_of_ranks_detail: "The Table of Ranks created 14 parallel grades across military, civil, and court service. Promotion through the ranks was theoretically merit-based, transforming the principle of governance from birth (rod) to service (sluzhba). A commoner reaching Grade 8 (Collegiate Assessor) automatically received hereditary noble status. This created extraordinary social mobility\u2014Mikhail Speransky, son of a village priest, became Alexander I\u2019s chief reformer. But it also created a bureaucratic culture of chin-worship (chinopochtitaniye) that Gogol satirized mercilessly in \u2018The Inspector General\u2019 and \u2018Dead Souls.\u2019",
    wrangel: "Baron Pyotr Wrangel was the last White commander, holding Crimea until November 1920. A Baltic German aristocrat and cavalry officer, he was more competent than his predecessors Denikin and Kolchak\u2014he implemented land reform in Crimea, attempting to win peasant support. His evacuation of 150,000 soldiers and civilians from Sevastopol and other Crimean ports was organized with remarkable efficiency. The \u00e9migr\u00e9 community he led became \u2018Russia Abroad\u2019 (Zarubezhnaya Rossiya)\u2014a diaspora that preserved pre-revolutionary culture in Paris, Berlin, and Harbin for decades.",
    katyn: "The Katyn massacre (April\u2013May 1940) saw the NKVD execute approximately 22,000 Polish officers, policemen, and intellectuals in the Katyn forest and other sites. The order was signed by Stalin and the Politburo. The Soviet Union blamed the Germans until 1990, when Gorbachev finally acknowledged Soviet responsibility. Katyn poisoned Polish-Russian relations for generations and demonstrated Stalin\u2019s methodology: eliminate the potential leadership class of a conquered nation to prevent future resistance. The Katyn files, released in 1992, bore Stalin\u2019s handwritten approval for execution.",
    doctors_plot: "The Doctors\u2019 Plot (January 1953) was Stalin\u2019s final purge initiative\u2014a fabricated conspiracy alleging that predominantly Jewish Kremlin physicians had murdered Soviet leaders including Zhdanov. It appeared to signal a planned mass deportation of Soviet Jews. Stalin\u2019s death on March 5, 1953, halted the campaign. The Doctors\u2019 Plot demonstrated that Stalin\u2019s terror had no natural stopping point\u2014even at 73, he was prepared to launch new waves of persecution. Beria\u2019s immediate reversal of the charges after Stalin\u2019s death underscored how completely the terror had depended on one man\u2019s will.",
  };

  // ── Micro-icon SVG builders ─────────────────────────────
  function iconOnionDome() {
    return React.createElement("svg", {
      width: 20, height: 24, viewBox: "0 0 20 24",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "dome" ? null : "dome"); },
    },
      React.createElement("path", { d: "M10 2 Q14 6 14 10 Q14 14 10 14 Q6 14 6 10 Q6 6 10 2Z", fill: "currentColor", fillOpacity: ".15", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("rect", { x: 8, y: 14, width: 4, height: 8, fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 10, y1: 0, x2: 10, y2: 3, stroke: "currentColor", strokeWidth: ".6" }),
      React.createElement("line", { x1: 9, y1: 1, x2: 11, y2: 1, stroke: "currentColor", strokeWidth: ".6" })
    );
  }
  function iconEagle() {
    return React.createElement("svg", {
      width: 24, height: 24, viewBox: "0 0 24 24",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "eagle" ? null : "eagle"); },
    },
      React.createElement("circle", { cx: 12, cy: 10, r: 4, fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("path", { d: "M8 10 L3 6 M8 10 L3 14", stroke: "currentColor", strokeWidth: ".7" }),
      React.createElement("path", { d: "M16 10 L21 6 M16 10 L21 14", stroke: "currentColor", strokeWidth: ".7" }),
      React.createElement("path", { d: "M10 6 L12 2 L14 6", stroke: "currentColor", strokeWidth: ".7", fill: "none" }),
      React.createElement("line", { x1: 12, y1: 14, x2: 12, y2: 22, stroke: "currentColor", strokeWidth: ".6" })
    );
  }
  function iconHorse() {
    return React.createElement("svg", {
      width: 28, height: 24, viewBox: "0 0 28 24",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "horse" ? null : "horse"); },
    },
      React.createElement("path", { d: "M8 18 Q10 12 14 10 Q18 8 20 10 L22 8 L24 10 L22 12 Q20 14 18 16 L20 20 M14 14 L12 20 M8 18 L6 20", fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("circle", { cx: 14, cy: 7, r: 2, fill: "none", stroke: "currentColor", strokeWidth: ".7" })
    );
  }
  function iconScroll() {
    return React.createElement("svg", {
      width: 20, height: 24, viewBox: "0 0 20 24",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "scroll" ? null : "scroll"); },
    },
      React.createElement("path", { d: "M4 4 Q4 2 6 2 L16 2 Q18 2 18 4 L18 18 Q18 22 14 22 L6 22 Q4 22 4 20Z", fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 7, y1: 6, x2: 15, y2: 6, stroke: "currentColor", strokeWidth: ".5" }),
      React.createElement("line", { x1: 7, y1: 9, x2: 15, y2: 9, stroke: "currentColor", strokeWidth: ".5" }),
      React.createElement("line", { x1: 7, y1: 12, x2: 13, y2: 12, stroke: "currentColor", strokeWidth: ".5" }),
      React.createElement("line", { x1: 7, y1: 15, x2: 14, y2: 15, stroke: "currentColor", strokeWidth: ".5" }),
      React.createElement("line", { x1: 7, y1: 18, x2: 11, y2: 18, stroke: "currentColor", strokeWidth: ".5" })
    );
  }
  function iconKremlin() {
    return React.createElement("svg", {
      width: 20, height: 28, viewBox: "0 0 20 28",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "kremlin" ? null : "kremlin"); },
    },
      React.createElement("rect", { x: 6, y: 10, width: 8, height: 16, fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("path", { d: "M4 10 L10 4 L16 10", fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 10, y1: 2, x2: 10, y2: 5, stroke: "currentColor", strokeWidth: ".6" }),
      React.createElement("rect", { x: 8, y: 18, width: 4, height: 4, fill: "none", stroke: "currentColor", strokeWidth: ".5" }),
      React.createElement("line", { x1: 10, y1: 0, x2: 10, y2: 3, stroke: "currentColor", strokeWidth: ".5" }),
      React.createElement("line", { x1: 9, y1: 1.5, x2: 11, y2: 1.5, stroke: "currentColor", strokeWidth: ".5" })
    );
  }
  function iconOprichnina() {
    return React.createElement("svg", {
      width: 22, height: 24, viewBox: "0 0 22 24",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "oprichnina" ? null : "oprichnina"); },
    },
      React.createElement("path", { d: "M11 2 L14 8 L20 9 L15.5 13.5 L17 20 L11 17 L5 20 L6.5 13.5 L2 9 L8 8Z", fill: "currentColor", fillOpacity: ".08", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 11, y1: 17, x2: 11, y2: 23, stroke: "currentColor", strokeWidth: ".6" })
    );
  }
  function iconStreltsy() {
    return React.createElement("svg", {
      width: 20, height: 26, viewBox: "0 0 20 26",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "streltsy" ? null : "streltsy"); },
    },
      React.createElement("line", { x1: 10, y1: 2, x2: 10, y2: 18, stroke: "currentColor", strokeWidth: "1" }),
      React.createElement("path", { d: "M6 18 L10 22 L14 18", fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 4, y1: 8, x2: 16, y2: 8, stroke: "currentColor", strokeWidth: ".7" }),
      React.createElement("circle", { cx: 10, cy: 4, r: 2, fill: "currentColor", fillOpacity: ".15", stroke: "currentColor", strokeWidth: ".6" })
    );
  }
  function iconVeche() {
    return React.createElement("svg", {
      width: 22, height: 24, viewBox: "0 0 22 24",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "veche" ? null : "veche"); },
    },
      React.createElement("path", { d: "M7 4 Q11 0 15 4", fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("rect", { x: 6, y: 4, width: 10, height: 12, rx: 1, fill: "currentColor", fillOpacity: ".08", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 11, y1: 16, x2: 11, y2: 22, stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 7, y1: 22, x2: 15, y2: 22, stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("circle", { cx: 11, cy: 2, r: 1, fill: "currentColor", fillOpacity: ".3" })
    );
  }
  function iconCross() {
    return React.createElement("svg", {
      width: 20, height: 26, viewBox: "0 0 20 26",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "cross" ? null : "cross"); },
    },
      React.createElement("line", { x1: 10, y1: 2, x2: 10, y2: 22, stroke: "currentColor", strokeWidth: "1" }),
      React.createElement("line", { x1: 4, y1: 8, x2: 16, y2: 8, stroke: "currentColor", strokeWidth: "1" }),
      React.createElement("line", { x1: 5, y1: 14, x2: 15, y2: 14, stroke: "currentColor", strokeWidth: ".7" }),
      React.createElement("line", { x1: 6, y1: 20, x2: 14, y2: 20, stroke: "currentColor", strokeWidth: ".7" })
    );
  }
  function iconAnchor() {
    return React.createElement("svg", {
      width: 22, height: 26, viewBox: "0 0 22 26",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "anchor" ? null : "anchor"); },
    },
      React.createElement("circle", { cx: 11, cy: 4, r: 3, fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 11, y1: 7, x2: 11, y2: 22, stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("path", { d: "M3 16 Q3 22 11 22 Q19 22 19 16", fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 5, y1: 14, x2: 17, y2: 14, stroke: "currentColor", strokeWidth: ".7" })
    );
  }

  // ── Chekist sword-and-shield (security services icon) ──
  function iconSwordShield() {
    return React.createElement("svg", {
      width: 22, height: 24, viewBox: "0 0 22 24",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "iron_felix" ? null : "iron_felix"); },
    },
      // Shield
      React.createElement("path", { d: "M11 2 L18 6 L18 14 Q18 20 11 22 Q4 20 4 14 L4 6Z", fill: "currentColor", fillOpacity: ".08", stroke: "currentColor", strokeWidth: ".8" }),
      // Sword
      React.createElement("line", { x1: 11, y1: 5, x2: 11, y2: 19, stroke: "currentColor", strokeWidth: "1" }),
      React.createElement("line", { x1: 8, y1: 8, x2: 14, y2: 8, stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("path", { d: "M10 19 L11 22 L12 19", fill: "currentColor", fillOpacity: ".2", stroke: "currentColor", strokeWidth: ".5" })
    );
  }
  // ── Gallows (Stolypin's necktie) ─────────────────────────
  function iconGallows() {
    return React.createElement("svg", {
      width: 20, height: 24, viewBox: "0 0 20 24",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "stolypin" ? null : "stolypin"); },
    },
      React.createElement("line", { x1: 4, y1: 22, x2: 4, y2: 2, stroke: "currentColor", strokeWidth: "1" }),
      React.createElement("line", { x1: 4, y1: 2, x2: 14, y2: 2, stroke: "currentColor", strokeWidth: "1" }),
      React.createElement("line", { x1: 14, y1: 2, x2: 14, y2: 8, stroke: "currentColor", strokeWidth: ".7" }),
      React.createElement("path", { d: "M14 8 Q14 14 11 14 Q8 14 8 8", fill: "none", stroke: "currentColor", strokeWidth: ".7" }),
      React.createElement("line", { x1: 2, y1: 22, x2: 8, y2: 22, stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 4, y1: 6, x2: 8, y2: 2, stroke: "currentColor", strokeWidth: ".5" })
    );
  }
  // ── Prison bars (Gulag) ──────────────────────────────────
  function iconPrisonBars() {
    return React.createElement("svg", {
      width: 20, height: 24, viewBox: "0 0 20 24",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "gulag" ? null : "gulag"); },
    },
      React.createElement("line", { x1: 4, y1: 2, x2: 4, y2: 22, stroke: "currentColor", strokeWidth: "1" }),
      React.createElement("line", { x1: 8, y1: 2, x2: 8, y2: 22, stroke: "currentColor", strokeWidth: "1" }),
      React.createElement("line", { x1: 12, y1: 2, x2: 12, y2: 22, stroke: "currentColor", strokeWidth: "1" }),
      React.createElement("line", { x1: 16, y1: 2, x2: 16, y2: 22, stroke: "currentColor", strokeWidth: "1" }),
      React.createElement("line", { x1: 2, y1: 6, x2: 18, y2: 6, stroke: "currentColor", strokeWidth: ".6" }),
      React.createElement("line", { x1: 2, y1: 18, x2: 18, y2: 18, stroke: "currentColor", strokeWidth: ".6" })
    );
  }
  // ── Crown breaking (Revolution) ──────────────────────────
  function iconBrokenCrown() {
    return React.createElement("svg", {
      width: 24, height: 24, viewBox: "0 0 24 24",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "bloody_sunday" ? null : "bloody_sunday"); },
    },
      React.createElement("path", { d: "M4 16 L6 8 L9 12 L12 4 L15 12 L18 8 L20 16", fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 4, y1: 16, x2: 20, y2: 16, stroke: "currentColor", strokeWidth: ".8" }),
      // crack through crown
      React.createElement("line", { x1: 11, y1: 6, x2: 13, y2: 16, stroke: "currentColor", strokeWidth: ".6", strokeDasharray: "2,1" }),
      React.createElement("line", { x1: 13, y1: 10, x2: 11, y2: 14, stroke: "currentColor", strokeWidth: ".4" })
    );
  }
  // ── Tractor (Collectivization) ───────────────────────────
  function iconTractor() {
    return React.createElement("svg", {
      width: 26, height: 22, viewBox: "0 0 26 22",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "collectivization" ? null : "collectivization"); },
    },
      // body
      React.createElement("rect", { x: 6, y: 4, width: 12, height: 8, rx: 1, fill: "currentColor", fillOpacity: ".08", stroke: "currentColor", strokeWidth: ".8" }),
      // cab
      React.createElement("rect", { x: 14, y: 2, width: 6, height: 10, rx: 1, fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      // exhaust
      React.createElement("line", { x1: 8, y1: 4, x2: 8, y2: 1, stroke: "currentColor", strokeWidth: ".7" }),
      // big rear wheel
      React.createElement("circle", { cx: 8, cy: 16, r: 5, fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("circle", { cx: 8, cy: 16, r: 2, fill: "currentColor", fillOpacity: ".1", stroke: "currentColor", strokeWidth: ".4" }),
      // small front wheel
      React.createElement("circle", { cx: 20, cy: 18, r: 3, fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("circle", { cx: 20, cy: 18, r: 1, fill: "currentColor", fillOpacity: ".1" })
    );
  }
  // ── Tank (WWII) ──────────────────────────────────────────
  function iconTank() {
    return React.createElement("svg", {
      width: 28, height: 20, viewBox: "0 0 28 20",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "barbarossa" ? null : "barbarossa"); },
    },
      // turret
      React.createElement("rect", { x: 10, y: 4, width: 10, height: 5, rx: 1, fill: "currentColor", fillOpacity: ".08", stroke: "currentColor", strokeWidth: ".8" }),
      // gun barrel
      React.createElement("line", { x1: 20, y1: 6, x2: 27, y2: 4, stroke: "currentColor", strokeWidth: "1" }),
      // hull
      React.createElement("path", { d: "M4 9 L24 9 L26 12 L24 15 L4 15 L2 12Z", fill: "currentColor", fillOpacity: ".06", stroke: "currentColor", strokeWidth: ".8" }),
      // tracks
      React.createElement("circle", { cx: 7, cy: 12, r: 2, fill: "none", stroke: "currentColor", strokeWidth: ".6" }),
      React.createElement("circle", { cx: 14, cy: 12, r: 2, fill: "none", stroke: "currentColor", strokeWidth: ".6" }),
      React.createElement("circle", { cx: 21, cy: 12, r: 2, fill: "none", stroke: "currentColor", strokeWidth: ".6" }),
      // star
      React.createElement("path", { d: "M15 6 L15.5 7.5 L17 7 L15.8 8 L16.5 9.5 L15 8.5 L13.5 9.5 L14.2 8 L13 7 L14.5 7.5Z", fill: "currentColor", fillOpacity: ".2" })
    );
  }
  // ── Wall/barrier (Iron Curtain) ──────────────────────────
  function iconWall() {
    return React.createElement("svg", {
      width: 22, height: 22, viewBox: "0 0 22 22",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "august_coup" ? null : "august_coup"); },
    },
      // brick wall pattern
      React.createElement("rect", { x: 2, y: 2, width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: ".8" }),
      React.createElement("line", { x1: 2, y1: 6, x2: 20, y2: 6, stroke: "currentColor", strokeWidth: ".5" }),
      React.createElement("line", { x1: 2, y1: 10, x2: 20, y2: 10, stroke: "currentColor", strokeWidth: ".5" }),
      React.createElement("line", { x1: 2, y1: 14, x2: 20, y2: 14, stroke: "currentColor", strokeWidth: ".5" }),
      React.createElement("line", { x1: 2, y1: 18, x2: 20, y2: 18, stroke: "currentColor", strokeWidth: ".5" }),
      // staggered verticals
      React.createElement("line", { x1: 11, y1: 2, x2: 11, y2: 6, stroke: "currentColor", strokeWidth: ".4" }),
      React.createElement("line", { x1: 7, y1: 6, x2: 7, y2: 10, stroke: "currentColor", strokeWidth: ".4" }),
      React.createElement("line", { x1: 15, y1: 6, x2: 15, y2: 10, stroke: "currentColor", strokeWidth: ".4" }),
      React.createElement("line", { x1: 11, y1: 10, x2: 11, y2: 14, stroke: "currentColor", strokeWidth: ".4" }),
      React.createElement("line", { x1: 7, y1: 14, x2: 7, y2: 18, stroke: "currentColor", strokeWidth: ".4" }),
      React.createElement("line", { x1: 15, y1: 14, x2: 15, y2: 18, stroke: "currentColor", strokeWidth: ".4" }),
      // crack
      React.createElement("line", { x1: 10, y1: 8, x2: 13, y2: 16, stroke: "currentColor", strokeWidth: ".6", strokeDasharray: "1.5,1" })
    );
  }
  // ── Microphone (KGB surveillance) ────────────────────────
  function iconMicrophone() {
    return React.createElement("svg", {
      width: 18, height: 24, viewBox: "0 0 18 24",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === "andropov" ? null : "andropov"); },
    },
      // mic head
      React.createElement("rect", { x: 6, y: 2, width: 6, height: 10, rx: 3, fill: "currentColor", fillOpacity: ".08", stroke: "currentColor", strokeWidth: ".8" }),
      // grill lines
      React.createElement("line", { x1: 7, y1: 5, x2: 11, y2: 5, stroke: "currentColor", strokeWidth: ".3" }),
      React.createElement("line", { x1: 7, y1: 7, x2: 11, y2: 7, stroke: "currentColor", strokeWidth: ".3" }),
      React.createElement("line", { x1: 7, y1: 9, x2: 11, y2: 9, stroke: "currentColor", strokeWidth: ".3" }),
      // U-bracket
      React.createElement("path", { d: "M4 8 L4 12 Q4 16 9 16 Q14 16 14 12 L14 8", fill: "none", stroke: "currentColor", strokeWidth: ".7" }),
      // stand
      React.createElement("line", { x1: 9, y1: 16, x2: 9, y2: 20, stroke: "currentColor", strokeWidth: ".7" }),
      React.createElement("line", { x1: 5, y1: 20, x2: 13, y2: 20, stroke: "currentColor", strokeWidth: ".8" })
    );
  }
  // ── Generic icon builders for tooltips without unique icons ──
  function makeTooltipIcon(key, paths) {
    return React.createElement("svg", {
      width: 20, height: 20, viewBox: "0 0 20 20",
      style: { cursor: "pointer", opacity: 0.3, display: "inline-block", verticalAlign: "middle", marginLeft: 6 },
      onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === key ? null : key); },
    },
      React.createElement("circle", { cx: 10, cy: 10, r: 8, fill: "currentColor", fillOpacity: ".04", stroke: "currentColor", strokeWidth: ".6" }),
      React.createElement("text", { x: 10, y: 14, textAnchor: "middle", fontSize: 9, fontFamily: RU_Mono, fill: "currentColor", fillOpacity: ".5" }, "?")
    );
  }

  // ── Tooltip renderer ────────────────────────────────────
  function renderTooltip() {
    if (!activeTooltip || !tooltipContent[activeTooltip]) return null;
    return React.createElement("div", {
      style: {
        padding: "12px 16px",
        background: "rgba(12,10,8,.95)",
        border: "1px solid rgba(140,110,40,.2)",
        borderRadius: 4,
        maxWidth: 400,
        fontSize: 12,
        fontFamily: RU_Mono,
        color: "rgba(200,195,180,.75)",
        lineHeight: 1.65,
        marginTop: 8,
        marginBottom: 12,
      },
    }, tooltipContent[activeTooltip]);
  }

  const toggleSection = useCallback(function(key) {
    setExpandedSections(function(prev) {
      var next = Object.assign({}, prev);
      next[key] = !prev[key];
      return next;
    });
  }, []);

  // ── Back button ──────────────────────────────────────────
  var backBtn = React.createElement("button", {
    onClick: function() { setView("home"); },
    style: {
      background: "none",
      border: "1px solid " + RU_C.line,
      color: RU_C.tx2,
      fontFamily: RU_Sans,
      fontSize: 13,
      padding: "6px 16px",
      borderRadius: 4,
      cursor: "pointer",
      marginBottom: 20,
      transition: "all .2s",
    },
    onMouseEnter: function(e) { e.currentTarget.style.color = RU_C.gold; e.currentTarget.style.borderColor = RU_C.gold; },
    onMouseLeave: function(e) { e.currentTarget.style.color = RU_C.tx2; e.currentTarget.style.borderColor = RU_C.line; },
  }, "\← Portfolio");

  // ── Header (Imperial Document Style) ───────────────────────────
  var header = React.createElement("div", {
    style: { marginBottom: 36, paddingBottom: 28, position: "relative", overflow: "hidden" },
  },
    // Onion dome silhouette background (left)
    RuOnionDomeSkyline(),
    // St. Basil's Cathedral silhouette (right)
    RuStBasilsSilhouette(),
    // Romanov Double-Headed Eagle watermark (center)
    React.createElement("div", { style: { position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)" } },
      RuRomanovEagle({ size: 120, opacity: 0.10 })
    ),
    // Ornamental top border
    React.createElement("svg", { width: "100%", height: 8, viewBox: "0 0 600 8", preserveAspectRatio: "xMidYMid meet", style: { display: "block", marginBottom: 16, opacity: 0.3 } },
      React.createElement("line", { x1: 0, y1: 4, x2: 250, y2: 4, stroke: RU_C.gold, strokeWidth: "1" }),
      React.createElement("path", { d: "M255 4 L260 1 L265 4 L260 7 Z", fill: RU_C.gold, fillOpacity: ".4" }),
      React.createElement("path", { d: "M270 4 L278 0 L286 4 L278 8 Z", fill: "none", stroke: RU_C.gold, strokeWidth: ".7" }),
      React.createElement("path", { d: "M291 4 L296 1 L301 4 L296 7 Z", fill: RU_C.gold, fillOpacity: ".4" }),
      React.createElement("line", { x1: 306, y1: 4, x2: 600, y2: 4, stroke: RU_C.gold, strokeWidth: "1" })
    ),
    React.createElement("div", {
      style: { fontSize: 11, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 3, color: RU_C.tx3, marginBottom: 10, textAlign: "center" },
    }, "HIST \· Formation of the Russian Empire"),
    React.createElement("div", {
      style: { display: "flex", alignItems: "center", gap: 16, justifyContent: "center" },
    },
      React.createElement("h1", {
        style: { fontSize: 38, fontFamily: RU_Serif, color: RU_C.gold, margin: "0 0 6px", fontWeight: 400, letterSpacing: 3, textAlign: "center" },
      }, "Imperial Timeline"),
      // Prominent Romanov double-headed eagle next to title
      React.createElement("svg", { width: 56, height: 56, viewBox: "0 0 80 80", style: { opacity: 0.28, flexShrink: 0, color: RU_C.gold } },
        // Body shield with St. George
        React.createElement("path", { d: "M40 18 L50 28 L50 50 L40 60 L30 50 L30 28Z", fill: "currentColor", fillOpacity: ".1", stroke: "currentColor", strokeWidth: 1.2 }),
        React.createElement("circle", { cx: 40, cy: 38, r: 6, fill: "none", stroke: "currentColor", strokeWidth: ".6" }),
        // Two heads
        React.createElement("circle", { cx: 26, cy: 16, r: 6, fill: "none", stroke: "currentColor", strokeWidth: 1 }),
        React.createElement("path", { d: "M22 14 L18 12", stroke: "currentColor", strokeWidth: ".8" }),
        React.createElement("circle", { cx: 54, cy: 16, r: 6, fill: "none", stroke: "currentColor", strokeWidth: 1 }),
        React.createElement("path", { d: "M58 14 L62 12", stroke: "currentColor", strokeWidth: ".8" }),
        // Wings spread
        React.createElement("path", { d: "M30 24 L22 18 L14 22 L6 20 L4 28 L12 28 L20 30Z", fill: "none", stroke: "currentColor", strokeWidth: .8 }),
        React.createElement("path", { d: "M50 24 L58 18 L66 22 L74 20 L76 28 L68 28 L60 30Z", fill: "none", stroke: "currentColor", strokeWidth: .8 }),
        // Three crowns
        React.createElement("path", { d: "M22 10 L24 6 L26 8 L28 4 L30 8 L32 6 L34 10", fill: "none", stroke: "currentColor", strokeWidth: ".5" }),
        React.createElement("path", { d: "M46 10 L48 6 L50 8 L52 4 L54 8 L56 6 L58 10", fill: "none", stroke: "currentColor", strokeWidth: ".5" }),
        React.createElement("path", { d: "M34 8 L37 2 L40 5 L43 2 L46 8", fill: "none", stroke: "currentColor", strokeWidth: ".7" }),
        React.createElement("circle", { cx: 40, cy: 1, r: 1.5, fill: "currentColor", fillOpacity: ".3" }),
        // Scepter and orb
        React.createElement("line", { x1: 28, y1: 52, x2: 20, y2: 68, stroke: "currentColor", strokeWidth: ".6" }),
        React.createElement("circle", { cx: 20, cy: 69, r: 2, fill: "none", stroke: "currentColor", strokeWidth: ".5" }),
        React.createElement("line", { x1: 52, y1: 52, x2: 60, y2: 66, stroke: "currentColor", strokeWidth: ".6" }),
        React.createElement("circle", { cx: 60, cy: 69, r: 3, fill: "none", stroke: "currentColor", strokeWidth: ".5" }),
        React.createElement("line", { x1: 60, y1: 66, x2: 60, y2: 63, stroke: "currentColor", strokeWidth: ".4" }),
        React.createElement("line", { x1: 58.5, y1: 64, x2: 61.5, y2: 64, stroke: "currentColor", strokeWidth: ".4" })
      )
    ),
    React.createElement("p", {
      style: { fontSize: 16, fontFamily: RU_Serif, color: RU_C.tx2, margin: "4px 0 0", fontStyle: "italic", lineHeight: 1.7, textAlign: "center", letterSpacing: ".02em" },
    }, "Boyars, Tsars, Orthodox Expansion \— Six turning points where the Russian state was forged"),
    // More prominent Cyrillic marginalia
    React.createElement("div", {
      style: { display: "flex", justifyContent: "center", gap: 24, marginTop: 10 },
    },
      React.createElement("span", {
        style: { fontFamily: "'Times New Roman', serif", fontSize: 16, color: "rgba(140,110,40,.25)", fontStyle: "italic", letterSpacing: ".12em" },
      }, "\u0422\u0440\u0435\u0442\u0438\u0439 \u0420\u0438\u043C"),
      React.createElement("span", {
        style: { fontFamily: "'Times New Roman', serif", fontSize: 14, color: "rgba(140,110,40,.15)", letterSpacing: ".08em" },
      }, "\u2014"),
      React.createElement("span", {
        style: { fontFamily: "'Times New Roman', serif", fontSize: 16, color: "rgba(140,110,40,.25)", fontStyle: "italic", letterSpacing: ".12em" },
      }, "\u041C\u043E\u0441\u043A\u0432\u0430"),
      React.createElement("span", {
        style: { fontFamily: "'Times New Roman', serif", fontSize: 14, color: "rgba(140,110,40,.15)", letterSpacing: ".08em" },
      }, "\u2014"),
      React.createElement("span", {
        style: { fontFamily: "'Times New Roman', serif", fontSize: 16, color: "rgba(140,110,40,.25)", fontStyle: "italic", letterSpacing: ".12em" },
      }, "\u0421\u0430\u043C\u043E\u0434\u0435\u0440\u0436\u0430\u0432\u0438\u0435")
    ),
    // Filofei's full Third Rome doctrine quote
    React.createElement("div", {
      style: { textAlign: "center", marginTop: 6, fontFamily: "'Times New Roman', serif", fontSize: 11, color: "rgba(140,110,40,.12)", fontStyle: "italic", letterSpacing: ".06em", lineHeight: 1.5 },
    }, "\u041C\u043E\u0441\u043A\u0432\u0430 \u2014 \u0422\u0440\u0435\u0442\u0438\u0439 \u0420\u0438\u043C, \u0430 \u0447\u0435\u0442\u0432\u0451\u0440\u0442\u043E\u043C\u0443 \u043D\u0435 \u0431\u044B\u0432\u0430\u0442\u044C"),
    // Nicholas I's triad
    React.createElement("div", {
      style: { textAlign: "center", marginTop: 3, fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.09)", letterSpacing: ".08em" },
    }, "\u0421\u0430\u043C\u043E\u0434\u0435\u0440\u0436\u0430\u0432\u0438\u0435, \u041F\u0440\u0430\u0432\u043E\u0441\u043B\u0430\u0432\u0438\u0435, \u041D\u0430\u0440\u043E\u0434\u043D\u043E\u0441\u0442\u044C"),
    React.createElement("div", {
      style: { display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap", justifyContent: "center" },
    },
      RuBadge({ label: "6 Turning Points" }),
      RuBadge({ label: "Counterfactual Analysis" }),
      RuBadge({ label: "5 Recurring Themes" }),
      RuBadge({ label: "882\u20131725 CE" })
    ),
    // Ornamental bottom border
    RuOrnamentalDivider({})
  );

  // ── Mode Switcher ────────────────────────────────────────
  var modes = [
    { id: "timeline",       label: "Timeline",        icon: "\u23f3" },
    { id: "territory",      label: "Territory",       icon: "\u2690" },
    { id: "counterfactuals", label: "Counterfactuals", icon: "\u2696" },
    { id: "themes",         label: "Themes",           icon: "\u2726" },
    { id: "quiz",           label: "Tsar\u2019s Dilemma", icon: "\u2655" },
    { id: "services",       label: "Services",         icon: "\ud83d\udd75" },
    { id: "cycles",         label: "Cycles",           icon: "\u267b" },
    { id: "hybrid",         label: "Hybrid",           icon: "\u2694" },
    { id: "sistema",        label: "Sistema",          icon: "\u260E" },
    { id: "ratchet",        label: "Ratchet",          icon: "\ud83d\udd12" },
    { id: "coalitions",     label: "Coalitions",       icon: "\ud83d\udc51" },
    { id: "court",          label: "Court",            icon: "\u265a" },
    { id: "vory",           label: "Vory",             icon: "\ud83d\udd78\ufe0f" },
    { id: "kompromat",      label: "Kompromat",        icon: "\ud83d\udcdc" },
    { id: "compare",        label: "Compare",          icon: "\u2922" },
    { id: "correlate",      label: "Correlate",        icon: "\u2248" },
    { id: "scenario",       label: "Scenario",         icon: "\u2394" },
    { id: "advocate",       label: "Advocate",         icon: "\u2620" },
    { id: "lexicon",        label: "Lexicon",          icon: "\u0416" },
    { id: "breaks",         label: "Breaks",           icon: "\u26a0" },
    { id: "contract",       label: "Contract",         icon: "\u2611" },
    { id: "briefing",       label: "Briefing",         icon: "\u2709" },
  ];
  var modeSwitcher = React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 4,
      marginBottom: 28,
      background: RU_C.card,
      border: "1px solid " + RU_C.line,
      borderRadius: 6,
      padding: 4,
      width: "fit-content",
    },
  }, modes.map(function(m) {
    var active = mode === m.id;
    return React.createElement("button", {
      key: m.id,
      onClick: function() { setMode(m.id); },
      style: {
        padding: "8px 20px",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        fontFamily: RU_Sans,
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        color: active ? "#faf7f0" : RU_C.tx2,
        background: active ? RU_C.gold : "transparent",
        transition: "all .2s",
        letterSpacing: 0.3,
      },
    }, m.icon + " " + m.label);
  }));

  // ── Timeline navigator (left rail) ───────────────────────
  function renderTimelineNav() {
    return React.createElement("div", {
      style: {
        width: 220,
        flexShrink: 0,
        borderRight: "1px solid " + RU_C.line,
        paddingRight: 20,
      },
    },
      React.createElement("div", {
        style: { fontSize: 12, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.tx3, marginBottom: 12 },
      }, "Turning Points"),
      TURNING_POINTS.map(function(tp, i) {
        var active = i === activeTP;
        return React.createElement("button", {
          key: tp.id,
          onClick: function() { setActiveTP(i); },
          style: {
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "10px 12px",
            marginBottom: 4,
            border: active ? "1px solid " + RU_C.gold + "44" : "1px solid transparent",
            borderRadius: 4,
            background: active ? RU_C.goldBg : "transparent",
            cursor: "pointer",
            transition: "all .2s",
          },
        },
          React.createElement("div", {
            style: { fontSize: 12, fontFamily: RU_Mono, color: active ? RU_C.gold : RU_C.tx3, marginBottom: 2 },
          }, tp.num + " \· " + tp.era),
          React.createElement("div", {
            style: { fontSize: 13, fontFamily: RU_Serif, color: active ? RU_C.gold : RU_C.tx2, fontWeight: active ? 600 : 400 },
          }, tp.title),
          // Old Style (Julian) year in Anno Mundi
          React.createElement("div", {
            style: { fontSize: 8, fontFamily: RU_Mono, color: active ? RU_C.gold + "66" : RU_C.tx3 + "44", marginTop: 1 },
          }, tp.id === "kievan" ? "AM 6390\u20136748" : tp.id === "mongol" ? "AM 6748\u20136988" : tp.id === "ivan3" ? "AM 6970\u20137013" : tp.id === "ivan4" ? "AM 7055\u20137092" : tp.id === "troubles" ? "AM 7106\u20137121" : "AM 7190\u20137233")
        );
      })
    );
  }

  // ── Timeline Detail Panel ────────────────────────────────
  function renderTimelineDetail() {
    var tp = TURNING_POINTS[activeTP];
    return React.createElement("div", {
      style: { flex: 1, minWidth: 0 },
    },
      // title area
      React.createElement("div", {
        style: { marginBottom: 24, color: RU_C.gold },
      },
        React.createElement("div", {
          style: { display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4, flexWrap: "wrap" },
        },
          React.createElement("span", {
            style: { fontSize: 40, fontFamily: RU_Serif, color: RU_C.gold, fontWeight: 300, lineHeight: 1 },
          }, tp.num),
          React.createElement("span", {
            style: { fontSize: 24, fontFamily: RU_Serif, color: RU_C.tx, fontWeight: 400 },
          }, tp.title),
          // Contextual micro-icons per turning point
          tp.id === "kievan" && iconOnionDome(),
          tp.id === "kievan" && iconCross(),
          tp.id === "mongol" && iconHorse(),
          tp.id === "mongol" && iconVeche(),
          tp.id === "ivan3" && iconEagle(),
          tp.id === "ivan3" && iconKremlin(),
          tp.id === "ivan3" && iconScroll(),
          tp.id === "ivan4" && iconOprichnina(),
          tp.id === "troubles" && iconKremlin(),
          tp.id === "peter" && iconAnchor(),
          tp.id === "peter" && iconStreltsy(),
          // New scholarly icons wired to post-imperial tooltips
          tp.id === "ivan4" && iconSwordShield(),
          tp.id === "kievan" && iconBrokenCrown(),
          tp.id === "peter" && iconGallows()
        ),
        React.createElement("div", {
          style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx2, fontStyle: "italic", marginBottom: 4 },
        }, tp.subtitle),
        React.createElement("div", {
          style: { fontSize: 12, fontFamily: RU_Mono, color: RU_C.tx3 },
        }, tp.era),
        renderTooltip()
      ),

      // "Tretiy Rim" (Third Rome) marginalia for Ivan III
      tp.id === "ivan3" && React.createElement("div", {
        style: { textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: 14, color: "rgba(140,110,40,.15)", fontStyle: "italic", letterSpacing: ".1em", marginBottom: 12 },
      }, "\u0422\u0440\u0435\u0442\u0438\u0439 \u0420\u0438\u043C \u2014 Third Rome"),
      // "Zemsky Sobor" for Time of Troubles
      tp.id === "troubles" && React.createElement("div", {
        style: { textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: 12, color: "rgba(140,110,40,.12)", fontStyle: "italic", letterSpacing: ".08em", marginBottom: 8 },
      }, "\u0417\u0435\u043C\u0441\u043A\u0438\u0439 \u0421\u043E\u0431\u043E\u0440 \u2014 Assembly of the Land"),
      // content sections
      RuSection({ title: "Historical Context", color: RU_C.blue },
        tp.context),
      RuSection({ title: "The Decision / Transformation", color: RU_C.gold },
        tp.decision),
      RuSection({ title: "Counterfactual: What If?", color: RU_C.red },
        tp.counterfactual),
      RuSection({ title: "Legacy & Modern Impact", color: RU_C.green },
        tp.legacy),

      // Kremlin merlon divider before sources
      RuKremlinMerlonDivider({ color: RU_C.tx3 }),
      // "Vechnaya pamyat" (Eternal memory) near legacy section
      React.createElement("div", {
        style: { textAlign: "right", fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.1)", fontStyle: "italic", marginTop: -8, marginBottom: 4, letterSpacing: ".08em" },
      }, "\u0412\u0435\u0447\u043D\u0430\u044F \u043F\u0430\u043C\u044F\u0442\u044C"),
      // Bronze Horseman near Peter's section, Samovar near cultural content
      tp.id === "peter" && React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: -12, marginBottom: 8 } },
        RuBronzeHorseman({ opacity: 0.12 }),
        React.createElement("div", { style: { marginLeft: 8 } },
          RuSamovar({ size: 20, opacity: 0.12 })
        )
      ),
      // "Okno v Evropu" (Window to Europe) near Peter
      tp.id === "peter" && React.createElement("div", {
        style: { textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: 11, color: "rgba(140,110,40,.12)", fontStyle: "italic", marginBottom: 8, letterSpacing: ".06em" },
      }, "\u041E\u043A\u043D\u043E \u0432 \u0415\u0432\u0440\u043E\u043F\u0443 \u2014 Window to Europe"),
      // "Oprichnina" in old-style near Ivan IV
      tp.id === "ivan4" && React.createElement("div", {
        style: { textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: 13, color: "rgba(139,28,35,.15)", fontStyle: "italic", marginBottom: 8, letterSpacing: ".1em" },
      }, "\u041E\u043F\u0440\u0438\u0447\u043D\u0438\u043D\u0430"),
      // Hammer and Sickle near the legacy section for Bolshevik continuity references
      tp.id === "ivan4" && React.createElement("div", { style: { textAlign: "right", marginBottom: 4 } },
        RuHammerSickle({ size: 16, opacity: 0.10 })
      ),
      // "Sudebnik" near Ivan III (legal code)
      tp.id === "ivan3" && React.createElement("div", {
        style: { textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: 12, color: "rgba(140,110,40,.12)", fontStyle: "italic", marginBottom: 8, letterSpacing: ".08em" },
      }, "\u0421\u0443\u0434\u0435\u0431\u043D\u0438\u043A 1497"),
      // "Zemsky Sobor" near the Troubles section (governance)
      tp.id === "troubles" && React.createElement("div", {
        style: { textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: 12, color: "rgba(140,110,40,.12)", fontStyle: "italic", marginBottom: 8, letterSpacing: ".08em" },
      }, "\u0417\u0435\u043C\u0441\u043A\u0438\u0439 \u0421\u043E\u0431\u043E\u0440 1613"),
      // Danilevsky quote near East-West content
      tp.id === "kievan" && React.createElement("div", {
        style: { textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.1)", fontStyle: "italic", marginBottom: 8, letterSpacing: ".06em" },
      }, "\u0420\u043E\u0441\u0441\u0438\u044F \u2014 \u043D\u0435 \u0415\u0432\u0440\u043E\u043F\u0430 \u2014 Danilevsky"),

      // ── Scholarly post-imperial easter eggs & date badges ──────────
      // Chekist label near security/terror themes
      tp.id === "ivan4" && React.createElement("div", {
        style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
      },
        React.createElement("span", {
          style: { fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(139,28,35,.12)", fontStyle: "italic", letterSpacing: ".1em" },
        }, "\u0427\u0435\u043A\u0438\u0441\u0442 \u2014 The sword and shield of the Party"),
        React.createElement("span", {
          style: { fontFamily: RU_Mono, fontSize: 8, color: "rgba(140,110,40,.12)" },
        }, "1565 \u2192 1917 \u2192 1991")
      ),
      // Stolypin's necktie reference near reform/terror tension
      tp.id === "ivan4" && React.createElement("div", {
        style: { textAlign: "right", fontFamily: "'Times New Roman', serif", fontSize: 9, color: "rgba(140,110,40,.08)", fontStyle: "italic", marginBottom: 4, letterSpacing: ".06em" },
      }, "\u0421\u0442\u043E\u043B\u044B\u043F\u0438\u043D\u0441\u043A\u0438\u0439 \u0433\u0430\u043B\u0441\u0442\u0443\u043A \u2014 reform and repression, always twinned"),
      // Gulag reference near state violence theme
      tp.id === "ivan4" && React.createElement("div", {
        style: { textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(139,28,35,.1)", letterSpacing: ".08em", marginBottom: 6 },
      }, "\u041E\u043F\u0440\u0438\u0447\u043D\u0438\u043D\u0430 \u2192 \u0422\u0440\u0435\u0442\u044C\u0435 \u043E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u2192 \u041E\u0445\u0440\u0430\u043D\u0430 \u2192 \u0427\u041A \u2192 \u041D\u041A\u0412\u0414 \u2192 \u041A\u0413\u0411 \u2192 \u0424\u0421\u0411"),
      // Decembrist date badge near Time of Troubles (dynastic themes)
      tp.id === "troubles" && React.createElement("div", {
        style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 },
      },
        React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 9, padding: "2px 6px", border: "1px solid rgba(140,110,40,.12)", borderRadius: 3, color: "rgba(140,110,40,.2)" } }, "1598 \u0421\u043C\u0443\u0442\u0430"),
        React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 9, padding: "2px 6px", border: "1px solid rgba(140,110,40,.12)", borderRadius: 3, color: "rgba(140,110,40,.2)" } }, "1613 \u0420\u043E\u043C\u0430\u043D\u043E\u0432\u044B"),
        React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 9, padding: "2px 6px", border: "1px solid rgba(140,110,40,.12)", borderRadius: 3, color: "rgba(140,110,40,.2)" } }, "1825 \u0414\u0435\u043A\u0430\u0431\u0440\u0438\u0441\u0442\u044B")
      ),
      // "Vse slozhno" meta-comment
      tp.id === "troubles" && React.createElement("div", {
        style: { textAlign: "right", fontFamily: "'Times New Roman', serif", fontSize: 9, color: "rgba(140,110,40,.08)", fontStyle: "italic", marginBottom: 6 },
      }, "\u0412\u0441\u0435 \u0441\u043B\u043E\u0436\u043D\u043E"),
      // Peter's reform chain — Table of Ranks, Zemstvo connections
      tp.id === "peter" && React.createElement("div", {
        style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 },
      },
        React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 8, padding: "2px 5px", border: "1px solid rgba(140,110,40,.1)", borderRadius: 3, color: "rgba(140,110,40,.15)" } }, "1722 \u0422\u0430\u0431\u0435\u043B\u044C"),
        React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 8, padding: "2px 5px", border: "1px solid rgba(140,110,40,.1)", borderRadius: 3, color: "rgba(140,110,40,.15)" } }, "1864 \u0417\u0435\u043C\u0441\u0442\u0432\u043E"),
        React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 8, padding: "2px 5px", border: "1px solid rgba(140,110,40,.1)", borderRadius: 3, color: "rgba(140,110,40,.15)" } }, "1861 \u041E\u0441\u0432\u043E\u0431\u043E\u0436\u0434\u0435\u043D\u0438\u0435"),
        React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 8, padding: "2px 5px", border: "1px solid rgba(140,110,40,.1)", borderRadius: 3, color: "rgba(140,110,40,.15)" } }, "1881 \u0423\u0431\u0438\u0439\u0441\u0442\u0432\u043E"),
        React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 8, padding: "2px 5px", border: "1px solid rgba(140,110,40,.1)", borderRadius: 3, color: "rgba(140,110,40,.15)" } }, "1905 \u041A\u0440\u043E\u0432\u044C")
      ),
      // Potemkin village reference near Peter (state display vs reality)
      tp.id === "peter" && React.createElement("div", {
        style: { textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.1)", fontStyle: "italic", marginBottom: 6, letterSpacing: ".06em" },
      }, "\u041F\u043E\u0442\u0451\u043C\u043A\u0438\u043D\u0441\u043A\u0438\u0435 \u0434\u0435\u0440\u0435\u0432\u043D\u0438 \u2014 the state as performance"),
      // Pale of Settlement reference near Ivan III (territorial themes)
      tp.id === "ivan3" && React.createElement("div", {
        style: { textAlign: "right", fontFamily: "'Times New Roman', serif", fontSize: 9, color: "rgba(140,110,40,.08)", fontStyle: "italic", marginBottom: 4, letterSpacing: ".06em" },
      }, "\u0427\u0435\u0440\u0442\u0430 \u043E\u0441\u0435\u0434\u043B\u043E\u0441\u0442\u0438 \u2014 boundaries within the empire"),
      // Mongol legacy — Pugachev's rebellion date badge
      tp.id === "mongol" && React.createElement("div", {
        style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 },
      },
        React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 8, padding: "2px 5px", border: "1px solid rgba(140,110,40,.1)", borderRadius: 3, color: "rgba(140,110,40,.15)" } }, "1380 \u041A\u0443\u043B\u0438\u043A\u043E\u0432\u043E"),
        React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 8, padding: "2px 5px", border: "1px solid rgba(140,110,40,.1)", borderRadius: 3, color: "rgba(140,110,40,.15)" } }, "1480 \u0423\u0433\u0440\u0430"),
        React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 8, padding: "2px 5px", border: "1px solid rgba(140,110,40,.1)", borderRadius: 3, color: "rgba(140,110,40,.15)" } }, "1773 \u041F\u0443\u0433\u0430\u0447\u0451\u0432")
      ),
      // Narodnaya Volya / People's Will near Kievan (foreshadowing)
      tp.id === "kievan" && React.createElement("div", {
        style: { textAlign: "left", fontFamily: "'Times New Roman', serif", fontSize: 9, color: "rgba(140,110,40,.06)", fontStyle: "italic", marginBottom: 4, letterSpacing: ".06em" },
      }, "\u041D\u0430\u0440\u043E\u0434\u043D\u0430\u044F \u0432\u043E\u043B\u044F \u2014 the people\u2019s will, from 988 to 1881 to 1991"),

      // sources
      React.createElement("div", {
        style: { marginTop: 20, padding: "16px 20px", background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 6, position: "relative" },
      },
        RuCornerOrnaments(),
        React.createElement("div", {
          style: { fontSize: 12, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.tx3, marginBottom: 8 },
        }, "Primary & Secondary Sources"),
        tp.sources.map(function(s, i) {
          return React.createElement("div", {
            key: i,
            style: { fontSize: 12, fontFamily: RU_Mono, color: RU_C.tx2, marginBottom: 3 },
          }, "\u2022 " + s);
        })
      ),

      // navigation arrows
      React.createElement("div", {
        style: { display: "flex", justifyContent: "space-between", marginTop: 24 },
      },
        activeTP > 0
          ? React.createElement("button", {
              onClick: function() { setActiveTP(activeTP - 1); },
              style: {
                background: "none", border: "1px solid " + RU_C.line, color: RU_C.tx2,
                padding: "8px 16px", borderRadius: 4, cursor: "pointer", fontFamily: RU_Sans, fontSize: 13,
              },
            }, "\← " + TURNING_POINTS[activeTP - 1].title)
          : React.createElement("span", null),
        activeTP < TURNING_POINTS.length - 1
          ? React.createElement("button", {
              onClick: function() { setActiveTP(activeTP + 1); },
              style: {
                background: "none", border: "1px solid " + RU_C.line, color: RU_C.tx2,
                padding: "8px 16px", borderRadius: 4, cursor: "pointer", fontFamily: RU_Sans, fontSize: 13,
              },
            }, TURNING_POINTS[activeTP + 1].title + " \→")
          : React.createElement("span", null)
      )
    );
  }

  // ── Timeline Mode ────────────────────────────────────────
  function renderTimeline() {
    return React.createElement("div", {
      style: { display: "flex", gap: 28 },
    },
      renderTimelineNav(),
      renderTimelineDetail()
    );
  }

  // ── Counterfactuals Mode ─────────────────────────────────
  function renderCounterfactuals() {
    return React.createElement("div", { style: { color: RU_C.gold, position: "relative" } },
      // Subtle Romanov eagle behind the section
      React.createElement("div", { style: { position: "absolute", top: 100, right: -10, pointerEvents: "none" } },
        RuRomanovEagle({ size: 100, opacity: 0.08 })
      ),
      React.createElement("div", {
        style: {
          padding: "16px 20px",
          background: RU_C.redBg,
          border: "1px solid " + RU_C.redDm + "44",
          borderRadius: 6,
          marginBottom: 24,
        },
      },
        React.createElement("div", {
          style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.6 },
        },
          React.createElement("strong", { style: { color: RU_C.red } }, "Counterfactual Method: "),
          "Each turning point contained a moment of contingency\—a juncture where plausible alternatives existed. By examining what ",
          React.createElement("em", null, "could"),
          " have happened, we illuminate what the actual outcome reveals about structural forces versus individual agency in Russian state formation. This approach follows the methodology of Niall Ferguson\u2019s ",
          React.createElement("em", null, "Virtual History"),
          " (1997): counterfactuals must be historically plausible, not mere fantasy."
        ),
        // Post-imperial counterfactual date badges
        React.createElement("div", {
          style: { display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 },
        },
          [
            "1825: What if the Decembrists had won?",
            "1881: What if Alexander II survived?",
            "1905: What if the Duma had real power?",
            "1917: What if Kerensky held?",
            "1924: What if Trotsky succeeded Lenin?",
            "1941: What if Stalin heeded Sorge?",
            "1953: What if Beria seized power?",
            "1991: What if the coup succeeded?",
          ].map(function(cf) {
            return React.createElement("span", {
              key: cf,
              style: { fontFamily: RU_Mono, fontSize: 8, padding: "2px 6px", border: "1px solid rgba(139,28,35,.12)", borderRadius: 3, color: "rgba(139,28,35,.2)" },
            }, cf);
          })
        ),
        React.createElement("div", {
          style: { textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: 9, color: "rgba(140,110,40,.08)", fontStyle: "italic", marginTop: 6, letterSpacing: ".06em" },
        }, "\u0412\u0441\u0435 \u0441\u043B\u043E\u0436\u043D\u043E \u2014 It\u2019s complicated")
      ),

      TURNING_POINTS.map(function(tp, i) {
        var expanded = expandedSections["cf_" + i];
        return React.createElement("div", {
          key: tp.id,
          style: {
            marginBottom: 16,
            border: "1px solid " + RU_C.line,
            borderRadius: 6,
            background: RU_C.card,
            overflow: "hidden",
          },
        },
          // header (clickable)
          React.createElement("button", {
            onClick: function() { toggleSection("cf_" + i); },
            style: {
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 18px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            },
          },
            React.createElement("div", null,
              React.createElement("span", {
                style: { fontSize: 12, fontFamily: RU_Mono, color: RU_C.gold, marginRight: 10 },
              }, tp.num),
              React.createElement("span", {
                style: { fontSize: 15, fontFamily: RU_Serif, color: RU_C.tx },
              }, tp.title),
              React.createElement("span", {
                style: { fontSize: 12, fontFamily: RU_Mono, color: RU_C.tx3, marginLeft: 10 },
              }, tp.era)
            ),
            React.createElement("span", {
              style: { color: RU_C.tx3, fontSize: 16, transition: "transform .2s", transform: expanded ? "rotate(180deg)" : "rotate(0)" },
            }, "\u25BE")
          ),

          // expanded body
          expanded && React.createElement("div", {
            style: { padding: "0 18px 18px" },
          },
            // what actually happened
            React.createElement("div", {
              style: {
                padding: "12px 16px",
                background: RU_C.goldBg,
                border: "1px solid " + RU_C.gold + "22",
                borderRadius: 4,
                marginBottom: 14,
              },
            },
              React.createElement("div", {
                style: { fontSize: 12, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.gold, marginBottom: 6 },
              }, "What Happened"),
              React.createElement("div", {
                style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.7 },
              }, tp.decision)
            ),

            // the counterfactual
            React.createElement("div", {
              style: {
                padding: "12px 16px",
                background: RU_C.redBg,
                border: "1px solid " + RU_C.redDm + "22",
                borderRadius: 4,
                marginBottom: 14,
              },
            },
              React.createElement("div", {
                style: { fontSize: 12, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.red, marginBottom: 6 },
              }, "What If?"),
              React.createElement("div", {
                style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.7 },
              }, tp.counterfactual)
            ),

            // structural vs agency assessment
            React.createElement("div", {
              style: {
                padding: "12px 16px",
                background: RU_C.blueBg,
                border: "1px solid " + RU_C.blueDm + "22",
                borderRadius: 4,
              },
            },
              React.createElement("div", {
                style: { fontSize: 12, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.blue, marginBottom: 6 },
              }, "Structure vs. Agency"),
              React.createElement("div", {
                style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.7 },
              },
                i === 0 ? "High agency: Vladimir\u2019s personal choice among religions shaped civilizational trajectory. Geographic and commercial factors (Constantinople trade route) provided structural context, but the specific choice was contingent." :
                i === 1 ? "Mixed: Structural forces (Mongol military superiority) constrained options, but Moscow\u2019s strategy of collaboration was a deliberate choice that Tver and Novgorod rejected. The agent operated within tight structural constraints." :
                i === 2 ? "Moderate agency: The fall of Constantinople (structural) created the ideological opening, but Ivan III\u2019s systematic annexation campaign and marriage alliance were deliberate strategic choices that other princes might not have made." :
                i === 3 ? "High agency: Nothing in Russia\u2019s structural position required the oprichnina. Ivan IV\u2019s personality\—possibly shaped by childhood trauma\—drove the turn to terror. This is the strongest case for individual agency reshaping institutional development." :
                i === 4 ? "High structure: The dynastic extinction and ensuing chaos were structural\—the Rurikid system had no mechanism for peaceful succession beyond the bloodline. Individual actors (Minin, Pozharsky) mattered for the resolution, but the crisis itself was systemic." :
                "Mixed: Structural military inferiority drove the modernization imperative, but Peter\u2019s specific method\—wholesale cultural revolution rather than selective borrowing\—was a high-agency choice. A different tsar might have modernized the army without mandating beard-shaving."
              )
            )
          )
        );
      })
    );
  }

  // ── Themes Mode ──────────────────────────────────────────
  function renderThemes() {
    return React.createElement("div", { style: { color: RU_C.gold } },
      React.createElement("div", {
        style: {
          padding: "16px 20px",
          background: RU_C.goldBg,
          border: "1px solid " + RU_C.gold + "22",
          borderRadius: 6,
          marginBottom: 24,
        },
      },
        React.createElement("div", {
          style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.6 },
        },
          React.createElement("strong", { style: { color: RU_C.gold } }, "Thematic Analysis: "),
          "Five recurring patterns emerge across the six turning points. These themes are not independent\—they interact and reinforce each other, creating the distinctive character of Russian political development. The analytical framework draws on longue dur\u00e9e historiography (Braudel) and path-dependence theory (North, Pierson)."
        )
      ),

      THEMES.map(function(theme, ti) {
        var expanded = expandedSections["th_" + ti];
        // count which turning points link to this theme
        var linkedTPs = TURNING_POINTS.filter(function(tp) {
          return tp.themeLinks.indexOf(theme.id) !== -1;
        });

        return React.createElement("div", {
          key: theme.id,
          style: {
            marginBottom: 16,
            border: "1px solid " + RU_C.line,
            borderRadius: 6,
            background: RU_C.card,
            overflow: "hidden",
          },
        },
          // header
          React.createElement("button", {
            onClick: function() { toggleSection("th_" + ti); },
            style: {
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 18px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            },
          },
            React.createElement("div", {
              style: { display: "flex", alignItems: "center", gap: 12 },
            },
              React.createElement("span", {
                style: { fontSize: 24, lineHeight: 1 },
              }, theme.icon),
              React.createElement("div", { style: { color: RU_C.gold } },
                React.createElement("div", {
                  style: { fontSize: 16, fontFamily: RU_Serif, color: RU_C.tx, fontWeight: 500, display: "flex", alignItems: "center" },
                },
                  theme.title,
                  theme.id === "autocracy" && iconKremlin(),
                  theme.id === "autocracy" && React.createElement("span", { style: { marginLeft: 8, fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.15)", fontStyle: "italic" } }, "\u0421\u0430\u043C\u043E\u0434\u0435\u0440\u0436\u0430\u0432\u0438\u0435"),
                  theme.id === "religion" && iconOnionDome(),
                  theme.id === "religion" && iconCross(),
                  theme.id === "religion" && React.createElement("span", { style: { marginLeft: 6, fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.15)", fontStyle: "italic" } }, "\u041F\u0440\u0430\u0432\u043E\u0441\u043B\u0430\u0432\u0438\u0435"),
                  theme.id === "expansion" && iconHorse(),
                  theme.id === "expansion" && React.createElement("span", { style: { marginLeft: 6 } }, RuTroikaSilhouette({ opacity: 0.12, style: { width: 60, height: 25, display: "inline-block", verticalAlign: "middle" } })),
                  theme.id === "westVsEast" && iconEagle(),
                  theme.id === "westVsEast" && React.createElement("span", { style: { marginLeft: 6, fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.15)", fontStyle: "italic" } }, "\u041E\u043A\u043D\u043E \u0432 \u0415\u0432\u0440\u043E\u043F\u0443"),
                  theme.id === "terror" && iconOprichnina(),
                  theme.id === "terror" && React.createElement("span", { style: { marginLeft: 6 } }, RuHammerSickle({ size: 14, opacity: 0.15 })),
                  theme.id === "terror" && iconSwordShield(),
                  theme.id === "terror" && iconPrisonBars(),
                  theme.id === "terror" && React.createElement("span", { style: { marginLeft: 6, fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(139,28,35,.12)", fontStyle: "italic" } }, "\u0412\u0440\u0430\u0433 \u043D\u0430\u0440\u043E\u0434\u0430"),
                  theme.id === "autocracy" && iconSwordShield(),
                  theme.id === "autocracy" && React.createElement("span", { style: { marginLeft: 6, fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.12)", fontStyle: "italic" } }, "\u0422\u0430\u0431\u0435\u043B\u044C \u043E \u0440\u0430\u043D\u0433\u0430\u0445"),
                  theme.id === "expansion" && iconTank(),
                  theme.id === "expansion" && iconTractor(),
                  theme.id === "expansion" && React.createElement("span", { style: { marginLeft: 6, fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.12)", fontStyle: "italic" } }, "\u0414\u0435\u043D\u044C \u041F\u043E\u0431\u0435\u0434\u044B"),
                  theme.id === "westVsEast" && iconBrokenCrown(),
                  theme.id === "westVsEast" && iconWall(),
                  theme.id === "westVsEast" && iconMicrophone(),
                  theme.id === "westVsEast" && React.createElement("span", { style: { marginLeft: 6, fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.12)", fontStyle: "italic" } }, "\u041F\u0435\u0440\u0435\u0441\u0442\u0440\u043E\u0439\u043A\u0430"),
                  theme.id === "religion" && React.createElement("span", { style: { marginLeft: 6, fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.12)", fontStyle: "italic" } }, "\u0413\u043B\u0430\u0441\u043D\u043E\u0441\u0442\u044C")
                ),
                React.createElement("div", {
                  style: { fontSize: 11, fontFamily: RU_Mono, color: RU_C.tx3, marginTop: 2 },
                }, "Appears in " + linkedTPs.length + "/6 turning points")
              )
            ),
            React.createElement("span", {
              style: { color: RU_C.tx3, fontSize: 16, transition: "transform .2s", transform: expanded ? "rotate(180deg)" : "rotate(0)" },
            }, "\u25BE")
          ),

          // expanded body
          expanded && React.createElement("div", {
            style: { padding: "0 18px 18px" },
          },
            // tooltip for any active icon in themes
            renderTooltip(),
            // description
            React.createElement("div", {
              style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.7, marginBottom: 16 },
            }, theme.description),

            // evidence grid
            React.createElement("div", {
              style: { marginBottom: 16 },
            },
              React.createElement("div", {
                style: { fontSize: 12, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.gold, marginBottom: 8 },
              }, "Evidence Across Turning Points"),
              React.createElement("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 6,
                },
              },
                theme.evidence.map(function(ev, ei) {
                  return React.createElement("div", {
                    key: ei,
                    style: {
                      padding: "8px 12px",
                      background: RU_C.goldBg,
                      border: "1px solid " + RU_C.gold + "15",
                      borderRadius: 4,
                      fontSize: 12,
                      fontFamily: RU_Serif,
                      color: RU_C.tx2,
                      lineHeight: 1.65,
                    },
                  }, ev);
                })
              )
            ),

            // analysis
            React.createElement("div", {
              style: {
                padding: "12px 16px",
                background: RU_C.blueBg,
                border: "1px solid " + RU_C.blueDm + "22",
                borderRadius: 4,
                marginBottom: 16,
              },
            },
              React.createElement("div", {
                style: { fontSize: 12, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.blue, marginBottom: 6 },
              }, "Analytical Assessment"),
              React.createElement("div", {
                style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.7 },
              }, theme.analysis)
            ),

            // linked turning points
            React.createElement("div", {
              style: { display: "flex", gap: 6, flexWrap: "wrap" },
            },
              React.createElement("span", {
                style: { fontSize: 11, fontFamily: RU_Mono, color: RU_C.tx3, marginRight: 4, alignSelf: "center" },
              }, "Linked:"),
              linkedTPs.map(function(ltp) {
                return React.createElement("button", {
                  key: ltp.id,
                  onClick: function() {
                    var idx = TURNING_POINTS.indexOf(ltp);
                    setActiveTP(idx);
                    setMode("timeline");
                  },
                  style: {
                    padding: "3px 10px",
                    borderRadius: 3,
                    fontSize: 11,
                    fontFamily: RU_Mono,
                    color: RU_C.gold,
                    border: "1px solid " + RU_C.gold + "44",
                    background: RU_C.goldBg,
                    cursor: "pointer",
                  },
                }, ltp.num + " " + ltp.title);
              })
            )
          )
        );
      }),

      // Hohloma border before synthesis
      RuHohlomaBorder({}),

      // cross-theme synthesis
      React.createElement("div", {
        style: {
          marginTop: 24,
          padding: "20px 24px",
          background: RU_C.card,
          border: "1px solid " + RU_C.gold + "33",
          borderRadius: 6,
          position: "relative",
        },
      },
        // Romanov eagle watermark behind synthesis
        React.createElement("div", { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } },
          RuRomanovEagle({ size: 160, opacity: 0.08 })
        ),
        React.createElement("div", {
          style: { fontSize: 11, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.gold, marginBottom: 12, display: "flex", alignItems: "center" },
        },
          "Cross-Theme Synthesis",
          iconEagle(),
          iconScroll(),
          iconSwordShield(),
          iconPrisonBars(),
          iconMicrophone(),
          iconWall()
        ),
        renderTooltip(),
        React.createElement("div", {
          style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.8, marginBottom: 14 },
        },
          "The five themes are not parallel tracks but an interlocking system. Autocratic continuity required territorial expansion to generate the resources and legitimacy that sustained centralized rule. Expansion required the ideological justification provided by Orthodoxy (civilizing mission) and was enforced through state violence. The East\u2013West tension created recurring crises that justified both autocracy (as defense against Western encroachment) and periodic Westernization (as military necessity)."
        ),
        React.createElement("div", {
          style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.8, marginBottom: 14 },
        },
          "This systemic interdependence explains the remarkable persistence of Russian political patterns across centuries and regime changes. The Soviet Union replicated the pattern: centralized autocracy (Communist Party), territorial expansion (Eastern Europe, Central Asia), state ideology (Marxism-Leninism replacing Orthodoxy), East\u2013West tension (Cold War), and institutional violence (Gulag). Post-Soviet Russia under Putin has partially reconstructed the same architecture."
        ),
        React.createElement("div", {
          style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx2, lineHeight: 1.8, fontStyle: "italic" },
        },
          "The historiographical question remains open: is this path dependency (Pierson), where early choices constrain later options through institutional lock-in? Or is it geographic determinism (Mackinder), where ruling the Eurasian heartland imposes certain political requirements regardless of ideology? The turning-point analysis above suggests a combination: geographic and structural forces create incentives, but specific agents at specific moments made choices that were not inevitable."
        )
      ),

      // ── Scholarly Post-Imperial Timeline: Hoverable Date Badges ──────────
      React.createElement("div", {
        style: { marginTop: 20, padding: "16px 20px", background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 6, position: "relative" },
      },
        React.createElement("div", {
          style: { fontSize: 11, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.tx3, marginBottom: 12, display: "flex", alignItems: "center" },
        },
          "Post-Imperial Continuities",
          iconSwordShield(),
          iconPrisonBars(),
          iconTank(),
          iconMicrophone()
        ),
        renderTooltip(),
        React.createElement("div", {
          style: { fontSize: 13, fontFamily: RU_Serif, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 12 },
        },
          "The patterns traced above\u2014autocracy, expansion, state violence, ideological mission, East\u2013West oscillation\u2014did not end in 1725. They intensified through the imperial, Soviet, and post-Soviet periods. A Galeotti-worthy reading of Russian history reveals the institutional DNA replicating across regime changes:"
        ),
        // Security service lineage with icons
        React.createElement("div", {
          style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, alignItems: "center" },
        },
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 9, color: RU_C.tx3 } }, "SECURITY LINEAGE:"),
          [
            { yr: "1826", lbl: "\u0422\u0440\u0435\u0442\u044C\u0435 \u043E\u0442\u0434.", tip: "third_section" },
            { yr: "1881", lbl: "\u041E\u0445\u0440\u0430\u043D\u0430", tip: "okhrana" },
            { yr: "1917", lbl: "\u0427\u041A", tip: "iron_felix" },
            { yr: "1934", lbl: "\u041D\u041A\u0412\u0414", tip: "nkvd_troika" },
            { yr: "1954", lbl: "\u041A\u0413\u0411", tip: "andropov" },
            { yr: "1995", lbl: "\u0424\u0421\u0411", tip: "august_coup" },
          ].map(function(item) {
            return React.createElement("span", {
              key: item.yr,
              onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === item.tip ? null : item.tip); },
              style: {
                fontFamily: RU_Mono, fontSize: 9, padding: "3px 7px",
                border: "1px solid " + (activeTooltip === item.tip ? RU_C.gold + "66" : "rgba(140,110,40,.15)"),
                borderRadius: 3, color: activeTooltip === item.tip ? RU_C.gold : "rgba(140,110,40,.25)",
                cursor: "pointer", transition: "all .2s",
                background: activeTooltip === item.tip ? RU_C.goldBg : "transparent",
              },
            }, item.yr + " " + item.lbl);
          })
        ),
        // Reform/repression cycle with dates
        React.createElement("div", {
          style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, alignItems: "center" },
        },
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 9, color: RU_C.tx3 } }, "REFORM CYCLE:"),
          [
            { yr: "1861", lbl: "Emancipation", tip: "alexander_ii" },
            { yr: "1864", lbl: "\u0417\u0435\u043C\u0441\u0442\u0432\u043E", tip: "zemstvo" },
            { yr: "1881", lbl: "Assassination", tip: "alexander_ii" },
            { yr: "1906", lbl: "Stolypin", tip: "stolypin" },
            { yr: "1921", lbl: "\u041D\u042D\u041F", tip: "nep" },
            { yr: "1956", lbl: "XX Congress", tip: "secret_speech" },
            { yr: "1985", lbl: "\u041F\u0435\u0440\u0435\u0441\u0442\u0440\u043E\u0439\u043A\u0430", tip: "gorbachev" },
          ].map(function(item) {
            return React.createElement("span", {
              key: item.yr + item.lbl,
              onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === item.tip ? null : item.tip); },
              style: {
                fontFamily: RU_Mono, fontSize: 9, padding: "3px 7px",
                border: "1px solid " + (activeTooltip === item.tip ? RU_C.gold + "66" : "rgba(140,110,40,.15)"),
                borderRadius: 3, color: activeTooltip === item.tip ? RU_C.gold : "rgba(140,110,40,.25)",
                cursor: "pointer", transition: "all .2s",
                background: activeTooltip === item.tip ? RU_C.goldBg : "transparent",
              },
            }, item.yr + " " + item.lbl);
          })
        ),
        // Violence/terror cycle
        React.createElement("div", {
          style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, alignItems: "center" },
        },
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 9, color: RU_C.tx3 } }, "STATE TERROR:"),
          [
            { yr: "1565", lbl: "\u041E\u043F\u0440\u0438\u0447\u043D\u0438\u043D\u0430", tip: "oprichnina" },
            { yr: "1773", lbl: "\u041F\u0443\u0433\u0430\u0447\u0451\u0432", tip: "pugachev" },
            { yr: "1825", lbl: "\u0414\u0435\u043A\u0430\u0431\u0440\u0438\u0441\u0442\u044B", tip: "decembrist" },
            { yr: "1905", lbl: "\u041A\u0440\u043E\u0432\u044C", tip: "bloody_sunday" },
            { yr: "1918", lbl: "\u041A\u0440\u0430\u0441\u043D\u044B\u0439 \u0442\u0435\u0440\u0440\u043E\u0440", tip: "whites_reds" },
            { yr: "1930", lbl: "\u041A\u043E\u043B\u043B\u0435\u043A\u0442.", tip: "collectivization" },
            { yr: "1937", lbl: "\u0415\u0436\u043E\u0432\u0449\u0438\u043D\u0430", tip: "great_purge" },
            { yr: "1940", lbl: "\u041A\u0430\u0442\u044B\u043D\u044C", tip: "katyn" },
          ].map(function(item) {
            return React.createElement("span", {
              key: item.yr + item.lbl,
              onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === item.tip ? null : item.tip); },
              style: {
                fontFamily: RU_Mono, fontSize: 9, padding: "3px 7px",
                border: "1px solid " + (activeTooltip === item.tip ? RU_C.red + "44" : "rgba(139,28,35,.15)"),
                borderRadius: 3, color: activeTooltip === item.tip ? RU_C.red : "rgba(139,28,35,.25)",
                cursor: "pointer", transition: "all .2s",
                background: activeTooltip === item.tip ? RU_C.redBg : "transparent",
              },
            }, item.yr + " " + item.lbl);
          })
        ),
        // War/expansion cycle
        React.createElement("div", {
          style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, alignItems: "center" },
        },
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 9, color: RU_C.tx3 } }, "WAR & EMPIRE:"),
          [
            { yr: "1812", lbl: "Napoleon", tip: "horse" },
            { yr: "1853", lbl: "Crimea", tip: "potemkin" },
            { yr: "1905", lbl: "Tsushima", tip: "bloody_sunday" },
            { yr: "1914", lbl: "WWI", tip: "rasputin" },
            { yr: "1941", lbl: "\u0411\u0430\u0440\u0431\u0430\u0440\u043E\u0441\u0441\u0430", tip: "barbarossa" },
            { yr: "1942", lbl: "\u041B\u0435\u043D\u0438\u043D\u0433\u0440\u0430\u0434", tip: "leningrad_siege" },
            { yr: "1945", lbl: "\u041F\u043E\u0431\u0435\u0434\u0430", tip: "zhukov" },
            { yr: "1979", lbl: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", tip: "gorbachev" },
          ].map(function(item) {
            return React.createElement("span", {
              key: item.yr + item.lbl,
              onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === item.tip ? null : item.tip); },
              style: {
                fontFamily: RU_Mono, fontSize: 9, padding: "3px 7px",
                border: "1px solid " + (activeTooltip === item.tip ? RU_C.blue + "44" : "rgba(26,40,85,.2)"),
                borderRadius: 3, color: activeTooltip === item.tip ? "#6b8ccc" : "rgba(26,40,85,.35)",
                cursor: "pointer", transition: "all .2s",
                background: activeTooltip === item.tip ? RU_C.blueBg : "transparent",
              },
            }, item.yr + " " + item.lbl);
          })
        ),
        // Collapse/dissolution
        React.createElement("div", {
          style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, alignItems: "center" },
        },
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 9, color: RU_C.tx3 } }, "COLLAPSE:"),
          [
            { yr: "1598", lbl: "\u0421\u043C\u0443\u0442\u0430", tip: "smuta" },
            { yr: "1917", lbl: "\u0420\u0435\u0432\u043E\u043B\u044E\u0446\u0438\u044F", tip: "kronstadt" },
            { yr: "1921", lbl: "\u041A\u0440\u043E\u043D\u0448\u0442\u0430\u0434\u0442", tip: "kronstadt" },
            { yr: "1953", lbl: "\u0411\u0435\u0440\u0438\u044F", tip: "beria" },
            { yr: "1991", lbl: "\u041F\u0443\u0442\u0447", tip: "august_coup" },
          ].map(function(item) {
            return React.createElement("span", {
              key: item.yr + item.lbl,
              onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === item.tip ? null : item.tip); },
              style: {
                fontFamily: RU_Mono, fontSize: 9, padding: "3px 7px",
                border: "1px solid " + (activeTooltip === item.tip ? RU_C.green + "44" : "rgba(45,107,74,.2)"),
                borderRadius: 3, color: activeTooltip === item.tip ? RU_C.green : "rgba(45,107,74,.3)",
                cursor: "pointer", transition: "all .2s",
                background: activeTooltip === item.tip ? RU_C.greenBg : "transparent",
              },
            }, item.yr + " " + item.lbl);
          })
        ),
        // Famous Russian quotes in Cyrillic
        React.createElement("div", {
          style: { marginTop: 8, padding: "10px 14px", background: "rgba(140,110,40,.03)", borderRadius: 4, borderLeft: "2px solid rgba(140,110,40,.12)" },
        },
          React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 9, color: RU_C.tx3, marginBottom: 6, letterSpacing: 1 } }, "VOICES FROM THE ARCHIVE"),
          [
            { text: "\u00ab\u0423 \u0420\u043E\u0441\u0441\u0438\u0438 \u0434\u0432\u0430 \u0441\u043E\u044E\u0437\u043D\u0438\u043A\u0430: \u0430\u0440\u043C\u0438\u044F \u0438 \u0444\u043B\u043E\u0442\u00BB", attr: "\u2014 Alexander III" },
            { text: "\u00ab\u0423\u0447\u0438\u0442\u044C\u0441\u044F, \u0443\u0447\u0438\u0442\u044C\u0441\u044F \u0438 \u0443\u0447\u0438\u0442\u044C\u0441\u044F\u00bb", attr: "\u2014 Lenin, 1923" },
            { text: "\u00ab\u0421\u043C\u0435\u0440\u0442\u044C \u043E\u0434\u043D\u043E\u0433\u043E \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430 \u2014 \u0442\u0440\u0430\u0433\u0435\u0434\u0438\u044F, \u0441\u043C\u0435\u0440\u0442\u044C \u043C\u0438\u043B\u043B\u0438\u043E\u043D\u043E\u0432 \u2014 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430\u00bb", attr: "\u2014 attr. Stalin" },
            { text: "\u00ab\u041C\u044B \u0432\u0430\u0441 \u043F\u043E\u0445\u043E\u0440\u043E\u043D\u0438\u043C\u00bb", attr: "\u2014 Khrushchev, 1956" },
            { text: "\u00ab\u0414\u043E\u0432\u0435\u0440\u044F\u0439, \u043D\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0439\u00bb", attr: "\u2014 Russian proverb / Reagan" },
            { text: "\u00ab\u0416\u0438\u0442\u044C \u0441\u0442\u0430\u043B\u043E \u043B\u0443\u0447\u0448\u0435, \u0436\u0438\u0442\u044C \u0441\u0442\u0430\u043B\u043E \u0432\u0435\u0441\u0435\u043B\u0435\u0435\u00bb", attr: "\u2014 Stalin, 1935" },
            { text: "\u00ab\u0413\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u043E \u2014 \u044D\u0442\u043E \u044F\u00bb", attr: "\u2014 attr. Louis XIV / Russian tsars" },
            { text: "\u00ab\u041D\u0435\u0442 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430 \u2014 \u043D\u0435\u0442 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B\u00bb", attr: "\u2014 attr. Stalin (via Rybakov)" },
          ].map(function(q, qi) {
            return React.createElement("div", {
              key: qi,
              style: { fontFamily: "'Times New Roman', serif", fontSize: 11, color: "rgba(140,110,40,.18)", fontStyle: "italic", marginBottom: 3, lineHeight: 1.5 },
            },
              React.createElement("span", null, q.text),
              React.createElement("span", { style: { fontSize: 9, marginLeft: 6, color: "rgba(140,110,40,.12)" } }, q.attr)
            );
          })
        ),
        // Additional literary/cultural references
        React.createElement("div", {
          style: { marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 },
        },
          [
            { lbl: "Solzhenitsyn", tip: "gulag_archipelago" },
            { lbl: "Potemkin", tip: "potemkin" },
            { lbl: "Table of Ranks", tip: "table_of_ranks" },
            { lbl: "Rasputin", tip: "rasputin" },
            { lbl: "Witte", tip: "witte" },
            { lbl: "Wrangel", tip: "wrangel" },
            { lbl: "Kronstadt", tip: "kronstadt" },
            { lbl: "NEP", tip: "nep" },
            { lbl: "Doctors' Plot", tip: "doctors_plot" },
            { lbl: "Katyn", tip: "katyn" },
            { lbl: "Pale", tip: "pale" },
            { lbl: "Zemstvo", tip: "zemstvo" },
          ].map(function(item) {
            return React.createElement("span", {
              key: item.lbl,
              onClick: function(e) { e.stopPropagation(); setActiveTooltip(activeTooltip === item.tip ? null : item.tip); },
              style: {
                fontFamily: RU_Mono, fontSize: 10, padding: "3px 8px",
                border: "1px solid " + (activeTooltip === item.tip ? RU_C.gold + "55" : "rgba(140,110,40,.12)"),
                borderRadius: 3, color: activeTooltip === item.tip ? RU_C.gold : "rgba(140,110,40,.2)",
                cursor: "pointer", transition: "all .2s",
                background: activeTooltip === item.tip ? RU_C.goldBg : "transparent",
              },
            }, item.lbl);
          })
        )
      ),

      // Izrazets tile pattern divider
      RuIzrazetsPattern(),

      // provenance
      React.createElement("div", {
        style: {
          marginTop: 20,
          padding: "14px 18px",
          background: RU_C.card,
          border: "1px solid " + RU_C.line,
          borderRadius: 6,
        },
      },
        React.createElement("div", {
          style: { fontSize: 12, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.tx3, marginBottom: 8 },
        }, "Core Bibliography"),
        [
          "Figes, Orlando. Natasha\u2019s Dance: A Cultural History of Russia. Picador, 2002.",
          "Hosking, Geoffrey. Russia: People and Empire, 1552\u20131917. Harvard UP, 1997.",
          "Riasanovsky, Nicholas V. A History of Russia. 8th ed., Oxford UP, 2011.",
          "Pipes, Richard. Russia Under the Old Regime. Penguin, 1974.",
          "Dunning, Chester. Russia\u2019s First Civil War. Penn State UP, 2001.",
          "Hughes, Lindsey. Russia in the Age of Peter the Great. Yale UP, 1998.",
          "Halperin, Charles. Russia and the Golden Horde. Indiana UP, 1985.",
          "Ferguson, Niall, ed. Virtual History: Alternatives and Counterfactuals. Basic Books, 1997.",
          "Galeotti, Mark. The Vory: Russia\u2019s Super Mafia. Yale UP, 2018.",
          "Galeotti, Mark. A Short History of Russia. Hanover Square, 2021.",
          "Galeotti, Mark. We Need to Talk About Putin. Ebury, 2019.",
          "Applebaum, Anne. Gulag: A History. Doubleday, 2003.",
          "Conquest, Robert. The Great Terror: A Reassessment. Oxford UP, 1990.",
          "Solzhenitsyn, Aleksandr. The Gulag Archipelago, 1918\u20131956. Harper & Row, 1973.",
          "Shalamov, Varlam. Kolyma Tales. Penguin, 1994.",
          "Service, Robert. A History of Modern Russia. 3rd ed., Penguin, 2009.",
          "Kotkin, Stephen. Stalin: Paradoxes of Power. Penguin, 2014.",
          "Snyder, Timothy. Bloodlands: Europe Between Hitler and Stalin. Basic Books, 2010.",
          "Fitzpatrick, Sheila. Everyday Stalinism. Oxford UP, 1999.",
          "Andrew, Christopher & Mitrokhin, Vasili. The Sword and the Shield. Basic Books, 1999.",
        ].map(function(ref, ri) {
          return React.createElement("div", {
            key: ri,
            style: { fontSize: 12, fontFamily: RU_Serif, color: RU_C.tx2, marginBottom: 4, paddingLeft: 16, textIndent: -16 },
          }, ref);
        })
      )
    );
  }

  // ── Quiz Mode (Tsar's Dilemma) ──────────────────────────
  function renderQuiz() {
    var answeredCount = Object.keys(quizAnswers).length;
    return React.createElement("div", { style: { color: RU_C.gold, position: "relative" } },
      // Faberge egg decorative element near quiz
      React.createElement("div", { style: { position: "absolute", top: -10, right: 20 } },
        RuFabergeEgg({ size: 36, opacity: 0.14 })
      ),
      // Orthodox crosses scattered
      React.createElement("div", { style: { position: "absolute", top: 60, right: 8 } },
        RuOrthodoxCross({ size: 14, opacity: 0.14 })
      ),
      React.createElement("div", { style: { position: "absolute", top: 200, left: -20 } },
        RuOrthodoxCross({ size: 12, opacity: 0.12 })
      ),
      // intro banner
      React.createElement("div", {
        style: {
          padding: "16px 20px",
          background: RU_C.goldBg,
          border: "1px solid " + RU_C.gold + "22",
          borderRadius: 6,
          marginBottom: 24,
        },
      },
        React.createElement("div", {
          style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.6 },
        },
          React.createElement("strong", { style: { color: RU_C.gold } }, "\u2655 Tsar\u2019s Dilemma: "),
          "You are an advisor at three critical junctures in Russian history. Each scenario presents a genuine decision point where the outcome was not inevitable. Choose wisely\—then see what actually happened and why."
        ),
        React.createElement("div", {
          style: { display: "flex", alignItems: "center", gap: 8, marginTop: 12 },
        },
          React.createElement("span", {
            style: { fontFamily: RU_Mono, fontSize: 12, color: RU_C.tx3 },
          }, "PROGRESS"),
          React.createElement("div", {
            style: { flex: 1, maxWidth: 160, height: 4, background: RU_C.line, borderRadius: 2 },
          },
            React.createElement("div", {
              style: {
                width: (answeredCount / 3 * 100) + "%",
                height: "100%",
                borderRadius: 2,
                background: answeredCount === 3 ? RU_C.green : RU_C.gold,
                transition: "width .3s",
              },
            })
          ),
          React.createElement("span", {
            style: { fontFamily: RU_Mono, fontSize: 12, color: answeredCount === 3 ? RU_C.green : RU_C.gold },
          }, answeredCount + "/3 answered")
        )
      ),

      // quiz questions
      RU_QUIZ.map(function(q, qi) {
        var myAnswer = quizAnswers[q.id];
        var isRevealed = quizRevealed[q.id];
        var selectedOpt = myAnswer ? q.options.find(function(o) { return o.id === myAnswer; }) : null;

        return React.createElement("div", {
          key: q.id,
          style: {
            marginBottom: 20,
            border: "1px solid " + (isRevealed ? RU_C.gold + "44" : RU_C.line),
            borderRadius: 6,
            background: RU_C.card,
            overflow: "hidden",
          },
        },
          // question header
          React.createElement("div", {
            style: { padding: "18px 20px", borderBottom: "1px solid " + RU_C.line },
          },
            React.createElement("div", {
              style: { fontSize: 12, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.gold, marginBottom: 6 },
            }, "Scenario " + (qi + 1) + " of 3"),
            React.createElement("div", {
              style: { fontSize: 18, fontFamily: RU_Serif, color: RU_C.tx, fontWeight: 500, marginBottom: 10, display: "flex", alignItems: "center" },
            },
              q.title,
              qi === 0 && iconCross(),
              qi === 0 && iconBrokenCrown(),
              qi === 1 && iconHorse(),
              qi === 1 && iconSwordShield(),
              qi === 2 && iconAnchor(),
              qi === 2 && iconGallows()
            ),
            renderTooltip(),
            React.createElement("div", {
              style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx2, lineHeight: 1.7 },
            }, q.scenario)
          ),

          // options
          React.createElement("div", {
            style: { padding: "16px 20px" },
          },
            q.options.map(function(opt) {
              var isSelected = myAnswer === opt.id;
              var borderColor = !myAnswer ? RU_C.line :
                isSelected ? (opt.score === 3 ? RU_C.green : opt.score === 2 ? RU_C.gold : RU_C.red) + "66" : RU_C.line;
              var bgColor = !myAnswer ? "transparent" :
                isSelected ? (opt.score === 3 ? RU_C.greenBg : opt.score === 2 ? RU_C.goldBg : RU_C.redBg) : "transparent";

              return React.createElement("button", {
                key: opt.id,
                onClick: function() {
                  if (!myAnswer) {
                    setQuizAnswers(function(prev) {
                      var next = Object.assign({}, prev);
                      next[q.id] = opt.id;
                      return next;
                    });
                  }
                },
                style: {
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  marginBottom: 8,
                  border: "1px solid " + borderColor,
                  borderRadius: 4,
                  background: bgColor,
                  cursor: myAnswer ? "default" : "pointer",
                  transition: "all .2s",
                  opacity: myAnswer && !isSelected ? 0.5 : 1,
                },
              },
                React.createElement("div", {
                  style: { fontSize: 13, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.6 },
                },
                  React.createElement("span", {
                    style: { fontFamily: RU_Mono, fontSize: 11, color: RU_C.gold, marginRight: 8 },
                  }, opt.id.toUpperCase() + "."),
                  opt.text
                ),
                // show score badge if answered
                myAnswer && isSelected && React.createElement("div", {
                  style: {
                    marginTop: 6,
                    fontSize: 12,
                    fontFamily: RU_Mono,
                    color: opt.score === 3 ? RU_C.green : opt.score === 2 ? RU_C.gold : RU_C.red,
                  },
                }, opt.score === 3 ? "\✓ Matches historical outcome" : opt.score === 2 ? "\u25CB Plausible but not what happened" : "\✗ Historically unlikely to succeed")
              );
            }),

            // reveal analysis button
            myAnswer && !isRevealed && React.createElement("button", {
              onClick: function() {
                setQuizRevealed(function(prev) {
                  var next = Object.assign({}, prev);
                  next[q.id] = true;
                  return next;
                });
              },
              style: {
                display: "block",
                width: "100%",
                padding: "12px 16px",
                marginTop: 8,
                border: "1px solid " + RU_C.gold + "44",
                borderRadius: 4,
                background: RU_C.goldBg,
                color: RU_C.gold,
                fontFamily: RU_Mono,
                fontSize: 12,
                cursor: "pointer",
                textAlign: "center",
                letterSpacing: 0.5,
              },
            }, "\u25B6 Reveal Full Analysis"),

            // revealed analysis
            isRevealed && React.createElement("div", {
              style: { marginTop: 12 },
            },
              // feedback for selected answer
              React.createElement("div", {
                style: {
                  padding: "12px 16px",
                  background: RU_C.blueBg,
                  border: "1px solid " + RU_C.blueDm + "22",
                  borderRadius: 4,
                  marginBottom: 12,
                },
              },
                React.createElement("div", {
                  style: { fontSize: 12, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.blue, marginBottom: 6 },
                }, "Your Choice \— Analysis"),
                React.createElement("div", {
                  style: { fontSize: 13, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.7 },
                }, selectedOpt.feedback)
              ),

              // what actually happened
              React.createElement("div", {
                style: {
                  padding: "12px 16px",
                  background: RU_C.greenBg,
                  border: "1px solid " + RU_C.greenDm + "22",
                  borderRadius: 4,
                },
              },
                React.createElement("div", {
                  style: { fontSize: 12, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.green, marginBottom: 6 },
                }, "Historical Outcome"),
                React.createElement("div", {
                  style: { fontSize: 13, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.7 },
                }, q.historicalOutcome)
              )
            )
          )
        );
      }),

      // Hohloma border before score
      answeredCount === 3 && RuHohlomaBorder({}),

      // score summary (when all answered)
      answeredCount === 3 && React.createElement("div", {
        style: {
          padding: "20px 24px",
          background: RU_C.card,
          border: "1px solid " + RU_C.gold + "33",
          borderRadius: 6,
          marginTop: 8,
          position: "relative",
        },
      },
        // Matryoshka in corner of score summary
        React.createElement("div", { style: { position: "absolute", top: 12, right: 16 } },
          RuMatryoshka({ size: 24, opacity: 0.12 })
        ),
        // Samovar in other corner
        React.createElement("div", { style: { position: "absolute", bottom: 12, right: 16 } },
          RuSamovar({ size: 18, opacity: 0.10 })
        ),
        React.createElement("div", {
          style: { fontSize: 11, fontFamily: RU_Mono, textTransform: "uppercase", letterSpacing: 1.5, color: RU_C.gold, marginBottom: 10 },
        }, "Assessment Complete"),
        React.createElement("div", {
          style: { fontSize: 14, fontFamily: RU_Serif, color: RU_C.tx, lineHeight: 1.7 },
        }, (function() {
          var total = RU_QUIZ.reduce(function(sum, q) {
            var ans = quizAnswers[q.id];
            var opt = q.options.find(function(o) { return o.id === ans; });
            return sum + (opt ? opt.score : 0);
          }, 0);
          if (total >= 8) return "Excellent strategic instinct. You matched the historical outcomes consistently\—you understand the structural logic of Russian state-building. The autocratic, pragmatic choices that built Russia were not accidents but calculated responses to specific constraints.";
          if (total >= 5) return "Solid analytical thinking. You identified plausible alternatives that real historical actors considered. Understanding why certain paths were not taken is as important as knowing what happened\—counterfactual reasoning reveals the forces that constrained choice.";
          return "You chose the idealistic options. In Russian history, the idealistic path was consistently the one not taken\—and when it was attempted (Tver\u2019s rebellion, the early promise of Ivan IV\u2019s reign), the results were catastrophic. Russian state-building rewarded ruthless pragmatism over noble principle.";
        })())
      )
    );
  }

  // ── Territory Renderer (SVG) ─────────────────────────────
  function renderTerritory() {
    var hoveredEra = eraHover !== null ? RUSSIA_ERAS.find(function(e) { return e.id === eraHover; }) : null;
    return React.createElement("div", { style: { marginBottom: 32, color: RU_C.gold } },
      React.createElement("div", {
        style: { fontFamily: RU_Mono, fontSize: 12, letterSpacing: 2, color: RU_C.tx3, marginBottom: 12, textTransform: "uppercase", display: "flex", alignItems: "center" },
      },
        "TERRITORIAL EXPANSION \— WEST\→EAST AXIS",
        iconHorse(),
        iconKremlin()
      ),
      renderTooltip(),
      // Troika silhouette — three-horse sleigh for the expansion/territory section
      React.createElement("div", { style: { position: "relative", float: "right", marginTop: -30 } },
        RuTroikaSilhouette({ opacity: 0.14 })
      ),
      React.createElement("div", {
        style: { background: RU_C.card, border: "1px solid " + RU_C.cardBd, borderRadius: 8, padding: 24 },
      },
        React.createElement("svg", {
          viewBox: "0 0 700 320", width: "100%", style: { display: "block" },
        },
          // Subtle Russia outline silhouette behind the bars (territorial map)
          React.createElement("path", {
            d: "M680 80 Q650 60 600 70 Q560 50 520 55 Q480 45 440 50 Q400 40 360 55 Q320 50 280 60 Q240 55 200 65 Q160 60 120 70 Q80 65 60 75 L50 90 Q60 100 80 95 Q120 105 160 100 Q200 110 240 105 Q280 115 320 110 Q360 120 400 115 Q440 125 480 120 Q520 130 560 125 Q600 135 640 130 Q660 125 680 120Z",
            fill: RU_C.gold, fillOpacity: ".02", stroke: "none",
          }),
          // Axis line
          React.createElement("line", { x1: 20, y1: 310, x2: 680, y2: 310, stroke: RU_C.line, strokeWidth: 1 }),
          React.createElement("text", { x: 20, y: 308, fill: RU_C.tx3, fontSize: 12, fontFamily: RU_Mono }, "WEST"),
          React.createElement("text", { x: 660, y: 308, fill: RU_C.tx3, fontSize: 12, fontFamily: RU_Mono, textAnchor: "end" }, "EAST"),
          // Julian/Old Style date markers along the top
          React.createElement("text", { x: 35, y: 20, fill: RU_C.tx3, fontSize: 8, fontFamily: RU_Mono, opacity: .3 }, "6970 AM"),
          React.createElement("text", { x: 175, y: 20, fill: RU_C.tx3, fontSize: 8, fontFamily: RU_Mono, opacity: .3 }, "7233 AM"),
          React.createElement("text", { x: 340, y: 20, fill: RU_C.tx3, fontSize: 8, fontFamily: RU_Mono, opacity: .3 }, "7304 AM"),
          React.createElement("text", { x: 480, y: 20, fill: RU_C.tx3, fontSize: 8, fontFamily: RU_Mono, opacity: .3 }, "7333 AM"),
          React.createElement("text", { x: 600, y: 20, fill: RU_C.tx3, fontSize: 8, fontFamily: RU_Mono, opacity: .3 }, "7422 AM"),
          // Era bars
          RUSSIA_ERAS.map(function(era) {
            var isHovered = eraHover === era.id;
            return React.createElement("g", { key: era.id,
              onMouseEnter: function() { setEraHover(era.id); },
              onMouseLeave: function() { setEraHover(null); },
              onClick: function() { setEraHover(eraHover === era.id ? null : era.id); },
              style: { cursor: "pointer" },
            },
              React.createElement("rect", {
                x: 25, y: era.y - 16, width: era.width, height: 28,
                rx: 4, fill: era.color, opacity: isHovered ? 1 : 0.7,
                stroke: isHovered ? RU_C.gold : "none", strokeWidth: 2,
                style: { transition: "all .2s" },
              }),
              React.createElement("text", {
                x: 32, y: era.y + 2, fill: "#fff", fontSize: 12, fontFamily: RU_Mono, fontWeight: 600,
              }, era.label)
            );
          })
        ),
        // Info panel below SVG
        hoveredEra ? React.createElement("div", {
          style: {
            marginTop: 16, padding: 16,
            background: RU_C.goldBg, border: "1px solid " + RU_C.goldDm,
            borderRadius: 6,
          },
        },
          React.createElement("div", {
            style: { fontFamily: RU_Serif, fontSize: 16, fontWeight: 600, color: RU_C.gold, marginBottom: 8 },
          }, hoveredEra.label),
          React.createElement("div", {
            style: { display: "flex", gap: 16, flexWrap: "wrap" },
          },
            React.createElement("div", { style: { flex: 1, minWidth: 200 } },
              React.createElement("div", {
                style: { fontFamily: RU_Mono, fontSize: 11, color: RU_C.tx3, marginBottom: 4, letterSpacing: 1 },
              }, "TERRITORY GAINED"),
              React.createElement("div", {
                style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx, lineHeight: 1.6 },
              }, hoveredEra.gained)
            ),
            React.createElement("div", { style: { flex: 1, minWidth: 200 } },
              React.createElement("div", {
                style: { fontFamily: RU_Mono, fontSize: 11, color: RU_C.tx3, marginBottom: 4, letterSpacing: 1 },
              }, "COST OF EXPANSION"),
              React.createElement("div", {
                style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.red, lineHeight: 1.6 },
              }, hoveredEra.cost)
            )
          )
        ) : React.createElement("div", {
          style: { marginTop: 12, fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx3, textAlign: "center", fontStyle: "italic" },
        }, "Hover or click an era bar to see territory gained and the cost of expansion."),
      // Scholarly date badges for territorial milestones
      React.createElement("div", {
        style: { display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12 },
      },
        [
          { yr: "1478", lbl: "Novgorod annexed" },
          { yr: "1552", lbl: "Kazan falls" },
          { yr: "1556", lbl: "Astrakhan falls" },
          { yr: "1581", lbl: "Yermak enters Siberia" },
          { yr: "1667", lbl: "Left-Bank Ukraine" },
          { yr: "1721", lbl: "Baltic provinces" },
          { yr: "1783", lbl: "Crimea annexed" },
          { yr: "1795", lbl: "Poland partitioned" },
          { yr: "1809", lbl: "Finland acquired" },
          { yr: "1860", lbl: "Vladivostok founded" },
          { yr: "1865", lbl: "Tashkent taken" },
        ].map(function(d) {
          return React.createElement("span", {
            key: d.yr,
            style: { fontFamily: RU_Mono, fontSize: 8, padding: "2px 5px", border: "1px solid rgba(140,110,40,.1)", borderRadius: 2, color: "rgba(140,110,40,.18)" },
          }, d.yr + " " + d.lbl);
        })
      ),
      // Cyrillic territorial phrase
      React.createElement("div", {
        style: { textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: 10, color: "rgba(140,110,40,.08)", fontStyle: "italic", marginTop: 8, letterSpacing: ".06em" },
      }, "\u0421\u043E\u0431\u0438\u0440\u0430\u043D\u0438\u0435 \u0437\u0435\u043C\u0435\u043B\u044C \u0440\u0443\u0441\u0441\u043A\u0438\u0445 \u2014 the gathering of the Russian lands")
      )
    );
  }

  // ══════════════════════════════════════════════════════════
  // ── INSTRUMENT 4: SISTEMA — Informal Power Network Visualizer
  // ══════════════════════════════════════════════════════════
  var SISTEMA_INTERFERENCE = [
    { id: "telefonnoe", label: "Telephone Justice", x: 350, y: 80,
      text: "Telefonnoe pravo: a judge receives a phone call from an official indicating the 'correct' verdict. In 2013, a leaked recording revealed a regional judge consulting with the governor's office before ruling on a land dispute. The formal appeals process becomes theater." },
    { id: "ruchnoe", label: "Manual Control", x: 350, y: 170,
      text: "Ruchnoe upravlenie: Putin personally intervenes to resolve what institutions should handle autonomously. When wildfires hit in 2010, Putin flew to the scene, publicly berated officials on camera, and personally directed firefighting \u2014 because the bureaucracy could not self-organize without a direct order from the top." },
    { id: "kompromat_i", label: "Kompromat", x: 350, y: 260,
      text: "Compromising material held in reserve as leverage. Everyone in the elite has a 'file.' Compliance is ensured not by law but by the implicit threat of selective prosecution. Khodorkovsky was not the only oligarch who evaded taxes \u2014 he was the only one who challenged Putin politically." },
    { id: "krysha", label: "Krysha (Roof)", x: 350, y: 350,
      text: "Protection from prosecution provided by a powerful patron. Every businessman needs a 'roof' \u2014 a security service contact or official who ensures competitors cannot weaponize the legal system against them. Without krysha, any business can be raided, audited, or seized overnight." },
  ];

  var SISTEMA_SCENARIOS = [
    { id: "s1", question: "A mid-level businessman wants a construction permit in a Russian city.",
      formal: { label: "Normative: Apply through the municipal office", outcome: "The application enters a queue. Inspectors find 'violations.' Months of delays. Competitors with connections get approved first. The permit may never arrive." },
      sistema: { label: "Sistema: Call a friend who knows the deputy mayor", outcome: "An 'understanding' is reached. The businessman contributes to a local 'social project' (the deputy mayor's fund). The permit appears within a week. Both parties now have leverage over each other." } },
    { id: "s2", question: "An oligarch's company is targeted by a competitor using tax police raids.",
      formal: { label: "Normative: File a complaint with the courts", outcome: "The courts are slow and the judge may have received a phone call. Meanwhile, assets are frozen, employees are interrogated, and business operations halt. By the time the court rules, the damage is done." },
      sistema: { label: "Sistema: Escalate to your patron in the Kremlin", outcome: "Your roof makes a call to the competitor's roof. A negotiation occurs at a level invisible to the public. Either a deal is struck (territory divided) or the competitor's patron is outranked, and their raids are called off." } },
    { id: "s3", question: "A journalist investigates corruption at the regional governor level.",
      formal: { label: "Normative: Publish findings in a newspaper", outcome: "The article runs. The governor's press office denies everything. Libel charges are filed against the journalist. The newspaper's landlord receives a fire inspection. Advertisers are warned. The story dies." },
      sistema: { label: "Sistema: The journalist's material reaches a rival faction in Moscow", outcome: "If the governor has fallen out of favor, Moscow leaks supporting material to federal media. The governor is replaced \u2014 not for corruption, but for 'loss of confidence.' The journalist is neither rewarded nor protected; they were merely a tool in an inter-elite conflict." } },
  ];

  function renderSistema() {
    var boxW = 140, boxH = 44, svgW = 700, svgH = 440;
    var formalSteps = [
      { label: "Law / Statute", y: 50 },
      { label: "Ministry Order", y: 130 },
      { label: "Department Action", y: 210 },
      { label: "Implementation", y: 290 },
      { label: "Outcome (legal)", y: 370 },
    ];
    var sistemaSteps = [
      { label: "Phone Call from Kremlin", y: 50 },
      { label: "Intermediary", y: 130, sub: "(classmate / judo partner)" },
      { label: "\"Understanding\" Reached", y: 210 },
      { label: "Favor Exchanged", y: 290 },
      { label: "Outcome (may contradict law)", y: 370 },
    ];
    var fX = 60, sX = 530;

    var svgChildren = [];

    // Arrow marker def
    svgChildren.push(React.createElement("defs", { key: "defs" },
      React.createElement("marker", { id: "ruArrowB", markerWidth: 8, markerHeight: 6, refX: 8, refY: 3, orient: "auto" },
        React.createElement("path", { d: "M0 0 L8 3 L0 6Z", fill: RU_C.blue })
      )
    ));

    // Left path label
    svgChildren.push(React.createElement("text", { key: "fl", x: fX + boxW / 2, y: 25, textAnchor: "middle", fill: RU_C.tx2, fontSize: 10, fontFamily: RU_Mono }, "NORMATIVE STATE"));
    svgChildren.push(React.createElement("text", { key: "fl2", x: fX + boxW / 2, y: 38, textAnchor: "middle", fill: RU_C.tx3, fontSize: 8, fontFamily: RU_Sans }, "(what the constitution says)"));
    // Right path label
    svgChildren.push(React.createElement("text", { key: "sl", x: sX + boxW / 2, y: 25, textAnchor: "middle", fill: RU_C.gold, fontSize: 10, fontFamily: RU_Mono }, "SISTEMA"));
    svgChildren.push(React.createElement("text", { key: "sl2", x: sX + boxW / 2, y: 38, textAnchor: "middle", fill: RU_C.goldDm, fontSize: 8, fontFamily: RU_Sans }, "(how it actually works)"));

    // Formal boxes and arrows
    formalSteps.forEach(function(st, i) {
      svgChildren.push(React.createElement("rect", { key: "fb" + i, x: fX, y: st.y, width: boxW, height: boxH, rx: 4, fill: RU_C.blueBg, stroke: RU_C.blue, strokeWidth: 1 }));
      svgChildren.push(React.createElement("text", { key: "ft" + i, x: fX + boxW / 2, y: st.y + boxH / 2 + 4, textAnchor: "middle", fill: RU_C.tx2, fontSize: 9, fontFamily: RU_Sans }, st.label));
      if (i < formalSteps.length - 1) {
        svgChildren.push(React.createElement("line", { key: "fa" + i, x1: fX + boxW / 2, y1: st.y + boxH, x2: fX + boxW / 2, y2: formalSteps[i + 1].y, stroke: RU_C.blue, strokeWidth: 1.5, markerEnd: "url(#ruArrowB)" }));
      }
    });

    // Sistema boxes and curved arrows
    sistemaSteps.forEach(function(st, i) {
      svgChildren.push(React.createElement("rect", { key: "sb" + i, x: sX, y: st.y, width: boxW, height: boxH, rx: 4, fill: RU_C.goldBg, stroke: RU_C.goldDm, strokeWidth: 1, strokeDasharray: "4,2" }));
      svgChildren.push(React.createElement("text", { key: "st" + i, x: sX + boxW / 2, y: st.sub ? st.y + 16 : st.y + boxH / 2 + 4, textAnchor: "middle", fill: RU_C.gold, fontSize: 9, fontFamily: RU_Sans }, st.label));
      if (st.sub) {
        svgChildren.push(React.createElement("text", { key: "st_sub" + i, x: sX + boxW / 2, y: st.y + 30, textAnchor: "middle", fill: RU_C.goldDm, fontSize: 7, fontFamily: RU_Sans }, st.sub));
      }
      if (i < sistemaSteps.length - 1) {
        var midY = (st.y + boxH + sistemaSteps[i + 1].y) / 2;
        svgChildren.push(React.createElement("path", { key: "sa" + i, d: "M" + (sX + boxW / 2) + " " + (st.y + boxH) + " Q" + (sX + boxW / 2 + 30) + " " + midY + " " + (sX + boxW / 2) + " " + sistemaSteps[i + 1].y, fill: "none", stroke: RU_C.gold, strokeWidth: 1.5, strokeDasharray: "4,3" }));
      }
    });

    // Interference points (center column)
    SISTEMA_INTERFERENCE.forEach(function(ipt) {
      var isActive = sistemaPoint === ipt.id;
      svgChildren.push(React.createElement("g", { key: "ip_" + ipt.id, style: { cursor: "pointer" }, onClick: function() { setSistemaPoint(isActive ? null : ipt.id); } },
        React.createElement("rect", { x: ipt.x - 60, y: ipt.y - 12, width: 120, height: 24, rx: 12, fill: isActive ? RU_C.redBg : "rgba(139,28,35,.04)", stroke: isActive ? RU_C.red : RU_C.redDm, strokeWidth: isActive ? 1.5 : 0.8 }),
        React.createElement("text", { x: ipt.x, y: ipt.y + 4, textAnchor: "middle", fill: isActive ? RU_C.red : RU_C.tx3, fontSize: 9, fontFamily: RU_Mono, fontWeight: isActive ? "bold" : "normal" }, ipt.label),
        React.createElement("line", { x1: fX + boxW, y1: ipt.y, x2: ipt.x - 62, y2: ipt.y, stroke: RU_C.redDm, strokeWidth: 0.5, strokeDasharray: "2,2" }),
        React.createElement("line", { x1: ipt.x + 62, y1: ipt.y, x2: sX, y2: ipt.y, stroke: RU_C.redDm, strokeWidth: 0.5, strokeDasharray: "2,2" })
      ));
    });

    // Interference detail popup
    var interferenceDetail = null;
    if (sistemaPoint) {
      var foundPt = SISTEMA_INTERFERENCE.find(function(p) { return p.id === sistemaPoint; });
      if (foundPt) {
        interferenceDetail = React.createElement("div", {
          style: { marginTop: 16, padding: "14px 18px", background: RU_C.redBg, border: "1px solid " + RU_C.redDm, borderRadius: 6, fontSize: 13, lineHeight: 1.6, color: RU_C.tx, fontFamily: RU_Sans },
        },
          React.createElement("strong", { style: { color: RU_C.red } }, foundPt.label + ": "),
          foundPt.text
        );
      }
    }

    // Stress test scenarios
    var stressTest = React.createElement("div", { style: { marginTop: 32 } },
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 18, color: RU_C.gold, marginBottom: 12, borderBottom: "1px solid " + RU_C.line, paddingBottom: 8 } }, "\u26A0 SISTEMA STRESS TEST"),
      React.createElement("p", { style: { fontSize: 12, color: RU_C.tx3, marginBottom: 16, fontStyle: "italic" } }, "For each scenario: does this get resolved by the normative state or by sistema?"),
      SISTEMA_SCENARIOS.map(function(sc) {
        var chosen = sistemaScenario[sc.id];
        return React.createElement("div", { key: sc.id, style: { marginBottom: 24, padding: "16px 20px", background: RU_C.card, border: "1px solid " + RU_C.cardBd, borderRadius: 6, position: "relative" } },
          RuCornerOrnaments(),
          React.createElement("p", { style: { fontSize: 14, color: RU_C.tx, marginBottom: 12, fontFamily: RU_Serif, fontWeight: 600 } }, sc.question),
          React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } },
            React.createElement("button", {
              onClick: function() { var sid = sc.id; setSistemaScenario(function(prev) { var n = Object.assign({}, prev); n[sid] = "formal"; return n; }); },
              style: { flex: 1, minWidth: 200, padding: "10px 14px", background: chosen === "formal" ? RU_C.blueBg : "transparent", border: "1px solid " + (chosen === "formal" ? RU_C.blue : RU_C.line), borderRadius: 4, color: chosen === "formal" ? RU_C.ivory : RU_C.tx2, cursor: "pointer", textAlign: "left", fontSize: 12, fontFamily: RU_Sans, transition: "all .2s" },
            }, sc.formal.label),
            React.createElement("button", {
              onClick: function() { var sid = sc.id; setSistemaScenario(function(prev) { var n = Object.assign({}, prev); n[sid] = "sistema"; return n; }); },
              style: { flex: 1, minWidth: 200, padding: "10px 14px", background: chosen === "sistema" ? RU_C.goldBg : "transparent", border: "1px solid " + (chosen === "sistema" ? RU_C.gold : RU_C.line), borderRadius: 4, color: chosen === "sistema" ? RU_C.gold : RU_C.tx2, cursor: "pointer", textAlign: "left", fontSize: 12, fontFamily: RU_Sans, transition: "all .2s" },
            }, sc.sistema.label)
          ),
          chosen && React.createElement("div", {
            style: { marginTop: 12, padding: "10px 14px", background: chosen === "formal" ? RU_C.blueBg : RU_C.goldBg, borderLeft: "3px solid " + (chosen === "formal" ? RU_C.blue : RU_C.gold), borderRadius: "0 4px 4px 0", fontSize: 12, lineHeight: 1.6, color: RU_C.tx },
          }, chosen === "formal" ? sc.formal.outcome : sc.sistema.outcome)
        );
      })
    );

    return React.createElement("div", null,
      React.createElement("h2", { style: { fontFamily: RU_Serif, fontSize: 24, color: RU_C.gold, marginBottom: 4 } }, "\u260E Sistema \u2014 Informal Power Network Visualizer"),
      React.createElement("p", { style: { fontSize: 12, color: RU_C.tx3, marginBottom: 20, lineHeight: 1.6, maxWidth: 700 } },
        "Based on Alena Ledeneva's framework: Russia's actual governance operates through informal personal networks, mutual compromises, and unwritten 'understandings' that run parallel to \u2014 and frequently override \u2014 formal institutions. Click the interference points to see how sistema overrides the normative state."),
      RuOrnamentalDivider({}),
      React.createElement("div", { style: { overflowX: "auto" } },
        React.createElement("svg", { width: svgW, height: svgH, viewBox: "0 0 " + svgW + " " + svgH, style: { display: "block", margin: "0 auto" } }, svgChildren)
      ),
      interferenceDetail,
      stressTest
    );
  }

  // ══════════════════════════════════════════════════════════
  // ── INSTRUMENT 5: RATCHET \u2014 Securitization Ratchet Since 1999
  // ══════════════════════════════════════════════════════════
  var RATCHET_CLICKS = [
    { yr: "1999", trigger: "Apartment bombings", action: "Anti-terrorism framework enacted", lost: "FSB gains autonomous operational authority; oversight mechanisms bypassed", severity: 1 },
    { yr: "2000", trigger: "NTV seizure (Gusinsky)", action: "State takeover of independent TV", lost: "Last independent national television network eliminated", severity: 2 },
    { yr: "2003", trigger: "Khodorkovsky arrest", action: "Yukos dismantled, oligarch class subordinated", lost: "Business autonomy from the state; private wealth exists only at Kremlin's pleasure", severity: 3 },
    { yr: "2004", trigger: "Beslan school siege", action: "Regional governor elections abolished", lost: "Federalism: governors now appointed from Moscow; power vertical completed", severity: 4 },
    { yr: "2006", trigger: "Color revolution fears", action: "NGO 'foreign agent' law (expanded 2012, 2020)", lost: "Independent civil society organizations squeezed out of public space", severity: 5 },
    { yr: "2007", trigger: "Munich Security Conference speech", action: "Confrontation doctrine declared", lost: "Cooperative security framework with the West abandoned as policy", severity: 5 },
    { yr: "2008", trigger: "Georgia war (South Ossetia)", action: "Military reform launched (Serdyukov/Shoigu)", lost: "Defensive posture: Russia demonstrates willingness to use force on neighbors", severity: 6 },
    { yr: "2011", trigger: "Bolotnaya Square protests", action: "Protest laws tightened, 'foreign agent' expansion", lost: "Right to peaceful assembly without risk of criminal prosecution", severity: 7 },
    { yr: "2012", trigger: "Putin's third term begins", action: "Opposition leaders prosecuted (Navalny, Pussy Riot)", lost: "Organized political opposition criminalized or exiled", severity: 8 },
    { yr: "2014", trigger: "Crimea annexation", action: "Sanctions/counter-sanctions regime", lost: "Economic integration with the West; beginning of autarky", severity: 9 },
    { yr: "2017", trigger: "Undesirable organizations law enforced", action: "International NGOs expelled en masse", lost: "International civil society presence inside Russia", severity: 10 },
    { yr: "2020", trigger: "Constitutional amendments (plebiscite)", action: "Presidential term limits voided \u2014 Putin to 2036", lost: "Institutional mechanism for leadership transition", severity: 11 },
    { yr: "2022", trigger: "Full-scale invasion of Ukraine", action: "Martial censorship, mass mobilization", lost: "Remaining space for public dissent; independent media fully destroyed", severity: 13 },
    { yr: "2023", trigger: "Prigozhin mutiny", action: "Wagner PMC absorbed into state control", lost: "Private military autonomy; all armed force now under Kremlin command", severity: 14 },
    { yr: "2024", trigger: "Expanded digital surveillance laws", action: "Sovereign internet controls, VPN crackdowns", lost: "Unsupervised access to global information space", severity: 14 },
  ];

  function renderRatchet() {
    var totalClicks = RATCHET_CLICKS.length;
    var maxSeverity = 14;
    var barMaxW = 540;
    var rowH = 52;
    var svgH = totalClicks * rowH + 80;
    var svgW = 700;

    var svgChildren = [];

    // Title text inside SVG
    svgChildren.push(React.createElement("text", { key: "rtitle", x: svgW / 2, y: 24, textAnchor: "middle", fill: RU_C.gold, fontSize: 13, fontFamily: RU_Mono }, "SECURITIZATION RATCHET: IRREVERSIBLE ACCUMULATION OF STATE POWER"));
    svgChildren.push(React.createElement("text", { key: "rsub", x: svgW / 2, y: 40, textAnchor: "middle", fill: RU_C.tx3, fontSize: 9, fontFamily: RU_Sans }, "Each click of the ratchet represents a permanent reduction in freedom. The ratchet never reverses."));

    // Ratchet bars
    RATCHET_CLICKS.forEach(function(rc, i) {
      var y = 60 + i * rowH;
      var barW = (rc.severity / maxSeverity) * barMaxW;
      var darkness = 0.3 + (rc.severity / maxSeverity) * 0.7;
      var isOpen = ratchetOpen[i];
      var fillColor = "rgba(139,28,35," + darkness.toFixed(2) + ")";

      // Year label
      svgChildren.push(React.createElement("text", { key: "ryr" + i, x: 40, y: y + 18, textAnchor: "middle", fill: RU_C.gold, fontSize: 10, fontFamily: RU_Mono, fontWeight: "bold" }, rc.yr));

      // Clickable bar (closure-safe index)
      svgChildren.push((function(idx) {
        return React.createElement("g", { key: "rbar" + idx, style: { cursor: "pointer" }, onClick: function() {
          setRatchetOpen(function(prev) { var n = Object.assign({}, prev); n[idx] = !prev[idx]; return n; });
        } },
          React.createElement("rect", { x: 70, y: y + 2, width: barW, height: 26, rx: 3, fill: fillColor, stroke: isOpen ? RU_C.red : "transparent", strokeWidth: isOpen ? 1.5 : 0 }),
          React.createElement("text", { x: 78, y: y + 19, fill: RU_C.ivory, fontSize: 9, fontFamily: RU_Sans, style: { pointerEvents: "none" } },
            rc.trigger.length > 45 ? rc.trigger.substring(0, 42) + "..." : rc.trigger
          ),
          React.createElement("path", { d: "M" + (70 + barW + 6) + " " + (y + 2) + " l8 0 l0 26 l-8 0 l0 -8 l-4 -5 l4 -5z", fill: fillColor, stroke: RU_C.redDm, strokeWidth: 0.5 })
        );
      })(i));

      // Connecting line to next
      if (i < totalClicks - 1) {
        svgChildren.push(React.createElement("line", { key: "rconn" + i, x1: 40, y1: y + 30, x2: 40, y2: y + rowH + 2, stroke: RU_C.redDm, strokeWidth: 1, strokeDasharray: "2,2" }));
      }
    });

    // Counter at bottom
    var counterY = 60 + totalClicks * rowH;
    var openCount = Object.keys(ratchetOpen).filter(function(k) { return ratchetOpen[k]; }).length;
    svgChildren.push(React.createElement("rect", { key: "rcbox", x: svgW / 2 - 120, y: counterY - 5, width: 240, height: 28, rx: 4, fill: RU_C.card, stroke: RU_C.red, strokeWidth: 1 }));
    svgChildren.push(React.createElement("text", { key: "rctxt", x: svgW / 2, y: counterY + 14, textAnchor: "middle", fill: RU_C.red, fontSize: 11, fontFamily: RU_Mono, fontWeight: "bold" },
      "TOTAL RESTRICTIONS EXAMINED: " + openCount + " / " + totalClicks
    ));

    // Detail panels for opened ratchet clicks
    var detailPanels = RATCHET_CLICKS.map(function(rc, i) {
      if (!ratchetOpen[i]) return null;
      return React.createElement("div", {
        key: "rd" + i,
        style: { marginBottom: 12, padding: "12px 16px", background: "rgba(139,28,35," + (0.04 + (rc.severity / maxSeverity) * 0.06).toFixed(3) + ")", border: "1px solid " + RU_C.redDm, borderRadius: 6, borderLeft: "4px solid rgba(139,28,35," + (0.3 + (rc.severity / maxSeverity) * 0.7).toFixed(2) + ")" },
      },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 } },
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 12, color: RU_C.gold, fontWeight: "bold" } }, rc.yr),
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 10, color: RU_C.red, padding: "2px 8px", background: "rgba(139,28,35,.15)", borderRadius: 10 } }, "Severity " + rc.severity + "/" + maxSeverity)
        ),
        React.createElement("div", { style: { fontSize: 13, color: RU_C.tx, fontWeight: 600, marginBottom: 4 } }, rc.trigger),
        React.createElement("div", { style: { fontSize: 12, color: RU_C.tx2, marginBottom: 4 } }, "\u2192 " + rc.action),
        React.createElement("div", { style: { fontSize: 12, color: RU_C.red, fontStyle: "italic" } }, "\u2716 Lost: " + rc.lost)
      );
    }).filter(Boolean);

    // Key insight panel
    var insightPanel = React.createElement("div", {
      style: { marginTop: 28, padding: "18px 22px", background: RU_C.card, border: "1px solid " + RU_C.gold, borderRadius: 6, position: "relative" },
    },
      RuCornerOrnaments(),
      React.createElement("h4", { style: { fontFamily: RU_Serif, fontSize: 15, color: RU_C.gold, marginBottom: 8 } }, "KEY INSIGHT: THE RATCHET MECHANISM"),
      React.createElement("p", { style: { fontSize: 13, lineHeight: 1.7, color: RU_C.tx } },
        "The ratchet never reverses. Each crisis \u2014 whether genuine (Beslan) or manufactured (apartment bombings) \u2014 produces permanent security infrastructure that remains long after the crisis passes. The 2022 invasion did not create a new system; it activated capabilities that had been accumulating since 1999. Each row above represents a freedom that was removed and never restored. The cumulative weight is what distinguishes Putin's Russia from an ordinary authoritarian state: it is not a single act of repression but a quarter-century of incremental, irreversible closure."),
      React.createElement("p", { style: { fontSize: 11, color: RU_C.tx3, marginTop: 8, fontStyle: "italic" } },
        "Analytical framework: Brian Taylor, 'The Code of Putinism' (2018); Timothy Frye, 'Weak Strongman' (2021)")
    );

    return React.createElement("div", null,
      React.createElement("h2", { style: { fontFamily: RU_Serif, fontSize: 24, color: RU_C.gold, marginBottom: 4 } }, "\ud83d\udd12 Securitization Ratchet \u2014 Since 1999"),
      React.createElement("p", { style: { fontSize: 12, color: RU_C.tx3, marginBottom: 20, lineHeight: 1.6, maxWidth: 700 } },
        "An irreversible accumulation of security state power. Click each bar to examine the trigger, state action, and freedom permanently lost. The bars get wider and darker as restrictions accumulate, visualizing how the system gets heavier over time."),
      RuOrnamentalDivider({}),
      React.createElement("div", { style: { overflowX: "auto" } },
        React.createElement("svg", { width: svgW, height: svgH + 40, viewBox: "0 0 " + svgW + " " + (svgH + 40), style: { display: "block", margin: "0 auto" } }, svgChildren)
      ),
      detailPanels.length > 0 && React.createElement("div", { style: { marginTop: 20 } },
        React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 16, color: RU_C.red, marginBottom: 12 } }, "Ratchet Click Details"),
        detailPanels
      ),
      insightPanel
    );
  }

  // ══════════════════════════════════════════════════════════
  // ── INSTRUMENT 6: COALITIONS \u2014 Winning Coalition Calculator
  // ══════════════════════════════════════════════════════════
  var COALITION_NODES = [
    { id: "fsb", name: "FSB Director", inst: "Federal Security Service (domestic intelligence + counterintelligence)", leverage: "FORCE", replace: "LOW", loyalty: "PERSONAL", group: "Security",
      removal: { lost: "Domestic surveillance apparatus, counterintelligence operations", replacement: "Deputy director (institutional continuity), but personal intelligence networks lost", risk: "CRITICAL", parallel: "No FSB director has been removed under Putin \u2014 speaks to the position's centrality" } },
    { id: "gru", name: "GRU Chief", inst: "Military Intelligence (foreign operations, cyber, assassinations)", leverage: "FORCE", replace: "MEDIUM", loyalty: "INSTITUTIONAL", group: "Security",
      removal: { lost: "Foreign covert operations, cyber warfare capability", replacement: "Deputy chief (GRU is institutional, less personality-dependent)", risk: "MEDIUM", parallel: "GRU leadership transitions have occurred without systemic disruption" } },
    { id: "mod", name: "Defense Minister", inst: "Ministry of Defense (conventional military)", leverage: "FORCE", replace: "MEDIUM", loyalty: "PERSONAL", group: "Security",
      removal: { lost: "Military logistics, procurement networks, institutional knowledge", replacement: "Belousov replaced Shoigu in 2024 \u2014 technocrat swap to optimize war economy", risk: "MEDIUM", parallel: "Shoigu to Belousov (2024): replaced for inefficiency, not disloyalty" } },
    { id: "rosgv", name: "Rosgvardia Commander", inst: "National Guard (domestic riot control, regime protection)", leverage: "FORCE", replace: "LOW", loyalty: "PERSONAL", group: "Security",
      removal: { lost: "400,000-troop internal security force answering directly to president", replacement: "Deputy commander, but Rosgvardia was created specifically for Zolotov", risk: "HIGH", parallel: "Rosgvardia created in 2016 for Zolotov personally \u2014 a praetorian guard" } },
    { id: "secco", name: "Security Council Secretary", inst: "Coordinates all security agencies, sets strategic doctrine", leverage: "INFORMATION", replace: "MEDIUM", loyalty: "PERSONAL", group: "Security",
      removal: { lost: "Inter-agency coordination, strategic planning", replacement: "Patrushev moved to advisor role (2024) \u2014 influence persists informally", risk: "MEDIUM", parallel: "Patrushev to advisor (2024): title changed, informal power may persist" } },
    { id: "cbr", name: "Central Bank Governor", inst: "Monetary policy, ruble stability, sanctions countermeasures", leverage: "MONEY", replace: "LOW", loyalty: "INSTITUTIONAL", group: "Economic",
      removal: { lost: "Macroeconomic competence, sanctions navigation (Nabiullina uniquely skilled)", replacement: "No obvious replacement with comparable technical ability and credibility", risk: "CRITICAL", parallel: "Nabiullina reportedly tried to resign after 2022 invasion \u2014 was refused" } },
    { id: "rosneft", name: "Rosneft CEO (Sechin)", inst: "Largest oil company, energy geopolitics", leverage: "MONEY", replace: "LOW", loyalty: "PERSONAL", group: "Economic",
      removal: { lost: "Oil revenue management, energy diplomacy leverage", replacement: "No obvious successor with same personal network and ruthlessness", risk: "HIGH", parallel: "Sechin is 'Putin's enforcer' \u2014 architect of Khodorkovsky's destruction" } },
    { id: "gazprom", name: "Gazprom CEO (Miller)", inst: "Gas monopoly, European energy leverage", leverage: "MONEY", replace: "MEDIUM", loyalty: "PERSONAL", group: "Economic",
      removal: { lost: "Gas export strategy, European pressure tool (diminished post-2022)", replacement: "Gazprom is institutional enough to function under new management", risk: "LOW", parallel: "Gazprom's leverage collapsed after Europe diversified \u2014 Miller's importance declining" } },
    { id: "olig1", name: "Inner Circle Oligarchs", inst: "Construction, energy trading, media/banking (Rotenberg, Timchenko, Kovalchuk)", leverage: "MONEY", replace: "MEDIUM", loyalty: "PERSONAL", group: "Economic",
      removal: { lost: "Wealth management channels, sanctions evasion networks, personal loyalty fund", replacement: "Other loyalists can fill roles, but personal trust bonds are irreplaceable", risk: "MEDIUM", parallel: "Putin's inner circle from 1990s St. Petersburg \u2014 'Ozero' cooperative members" } },
    { id: "pm", name: "Prime Minister (Mishustin)", inst: "Government administration, economic management", leverage: "LEGITIMACY", replace: "HIGH", loyalty: "INSTITUTIONAL", group: "Political",
      removal: { lost: "Day-to-day governance management, tax collection efficiency", replacement: "Easily replaced \u2014 PM is a technocratic manager, not a power center", risk: "LOW", parallel: "Medvedev to Mishustin: PMs are interchangeable administrators" } },
    { id: "duma", name: "Duma Speaker (Volodin)", inst: "Parliamentary rubber stamp, legislative process management", leverage: "LEGITIMACY", replace: "HIGH", loyalty: "INSTITUTIONAL", group: "Political",
      removal: { lost: "Legislative facade management", replacement: "Any United Russia loyalist can fill this ceremonial role", risk: "LOW", parallel: "The Duma has not rejected a Kremlin bill in 20+ years" } },
    { id: "chech", name: "Kadyrov (Chechnya)", inst: "Controls 30,000+ personal forces, Chechnya autonomy", leverage: "FORCE", replace: "LOW", loyalty: "PERSONAL", group: "Political",
      removal: { lost: "Chechen stability, frontline shock troops, internal intimidation capacity", replacement: "No Kadyrov heir has comparable authority; Chechnya could destabilize", risk: "CRITICAL", parallel: "Kadyrov Sr. was assassinated 2004; succession was not smooth" } },
    { id: "mosgov", name: "Moscow Mayor (Sobyanin)", inst: "Controls capital city resources, 12M+ population", leverage: "LEGITIMACY", replace: "MEDIUM", loyalty: "INSTITUTIONAL", group: "Political",
      removal: { lost: "Capital city management, election result manufacturing in Moscow", replacement: "Replaceable but disruption risk \u2014 Moscow is the most politically sensitive city", risk: "MEDIUM", parallel: "Luzhkov was removed 2010 for insufficient loyalty \u2014 Moscow survived" } },
    { id: "spbgov", name: "St. Petersburg Governor", inst: "Putin's home city, second capital", leverage: "LEGITIMACY", replace: "HIGH", loyalty: "INSTITUTIONAL", group: "Political",
      removal: { lost: "Symbolic home-base management", replacement: "Easily replaced \u2014 St. Petersburg governors have changed multiple times", risk: "LOW", parallel: "Multiple governors post-Matvienko; institutional continuity maintained" } },
    { id: "rt", name: "RT Head (Simonyan)", inst: "International propaganda, information warfare", leverage: "INFORMATION", replace: "MEDIUM", loyalty: "PERSONAL", group: "Media",
      removal: { lost: "International information operations, English-language narrative control", replacement: "RT's infrastructure is institutional but Simonyan's brand is personal", risk: "MEDIUM", parallel: "Simonyan has built a personal media brand intertwined with the state" } },
    { id: "stv", name: "State TV (Kiselyov, Solovyov)", inst: "Domestic propaganda, public opinion management", leverage: "INFORMATION", replace: "MEDIUM", loyalty: "INSTITUTIONAL", group: "Media",
      removal: { lost: "Domestic narrative coherence, prime-time opinion manipulation", replacement: "Other propagandists exist but top presenters have personal followings", risk: "MEDIUM", parallel: "Propagandists are instruments, not decision-makers \u2014 replaceable in theory" } },
  ];

  function renderCoalitions() {
    var groups = { Security: [], Economic: [], Political: [], Media: [] };
    var groupColors = { Security: RU_C.red, Economic: RU_C.gold, Political: RU_C.blue, Media: RU_C.green };
    var leverageSymbols = { FORCE: "\u2694", MONEY: "\ud83d\udcb0", INFORMATION: "\ud83d\udce1", LEGITIMACY: "\ud83c\udfdb" };

    COALITION_NODES.forEach(function(n) { if (groups[n.group]) groups[n.group].push(n); });

    var activeNodes = COALITION_NODES.filter(function(n) { return !coalitionRemoved[n.id]; });
    var removedNodes = COALITION_NODES.filter(function(n) { return coalitionRemoved[n.id]; });

    // Fragility calculation
    var fragileCount = activeNodes.filter(function(n) { return n.replace === "LOW" && n.loyalty === "PERSONAL"; }).length;
    var totalActive = activeNodes.length;
    var fragScore = totalActive > 0 ? Math.round((fragileCount / totalActive) * 100) : 0;
    var fragLabel = fragScore >= 30 ? "HIGH FRAGILITY" : fragScore >= 15 ? "MODERATE FRAGILITY" : "LOW FRAGILITY";
    var fragColor = fragScore >= 30 ? RU_C.red : fragScore >= 15 ? RU_C.gold : RU_C.green;

    // SVG node map
    var svgW = 700, svgH = 420;
    var svgChildren = [];
    var groupXPositions = { Security: 90, Economic: 260, Political: 430, Media: 600 };

    // Group headers
    Object.keys(groups).forEach(function(g) {
      var gx = groupXPositions[g];
      svgChildren.push(React.createElement("text", { key: "cgh_" + g, x: gx, y: 24, textAnchor: "middle", fill: groupColors[g], fontSize: 11, fontFamily: RU_Mono, fontWeight: "bold" }, g.toUpperCase()));
      svgChildren.push(React.createElement("line", { key: "cgl_" + g, x1: gx - 50, y1: 32, x2: gx + 50, y2: 32, stroke: groupColors[g], strokeWidth: 0.8, opacity: 0.5 }));
    });

    // Central Putin node
    svgChildren.push(React.createElement("circle", { key: "cputin", cx: svgW / 2, cy: svgH / 2, r: 28, fill: RU_C.kremlin, stroke: RU_C.gold, strokeWidth: 2 }));
    svgChildren.push(React.createElement("text", { key: "cputinT", x: svgW / 2, y: svgH / 2 + 4, textAnchor: "middle", fill: RU_C.ivory, fontSize: 10, fontFamily: RU_Serif, fontWeight: "bold" }, "PUTIN"));

    // Nodes per group
    Object.keys(groups).forEach(function(g) {
      var gx = groupXPositions[g];
      var gnodes = groups[g];
      gnodes.forEach(function(n, i) {
        var ny = 55 + i * (g === "Security" ? 68 : g === "Economic" ? 80 : g === "Political" ? 64 : 120);
        var isRemoved = coalitionRemoved[n.id];
        var isSelected = coalitionDetail === n.id;
        var nodeOpacity = isRemoved ? 0.25 : 1;

        // Connection line to Putin
        svgChildren.push(React.createElement("line", { key: "cline_" + n.id, x1: gx, y1: ny + 14, x2: svgW / 2, y2: svgH / 2, stroke: groupColors[g], strokeWidth: isRemoved ? 0.3 : 0.8, strokeDasharray: isRemoved ? "4,4" : "none", opacity: isRemoved ? 0.2 : 0.3 }));

        // Node circle + label
        svgChildren.push((function(nodeId) {
          return React.createElement("g", { key: "cnode_" + nodeId, style: { cursor: "pointer", opacity: nodeOpacity }, onClick: function() { setCoalitionDetail(isSelected ? null : nodeId); } },
            React.createElement("circle", { cx: gx, cy: ny + 14, r: 16, fill: isSelected ? groupColors[g] : (isRemoved ? RU_C.card : "rgba(24,12,16,.8)"), stroke: isSelected ? RU_C.ivory : groupColors[g], strokeWidth: isSelected ? 2 : 1, strokeDasharray: isRemoved ? "3,3" : "none" }),
            React.createElement("text", { x: gx, y: ny + 18, textAnchor: "middle", fill: isSelected ? RU_C.ivory : (isRemoved ? RU_C.tx3 : RU_C.tx2), fontSize: 8, fontFamily: RU_Sans }, leverageSymbols[n.leverage] || "?"),
            React.createElement("text", { x: gx, y: ny + 38, textAnchor: "middle", fill: isRemoved ? RU_C.tx3 : RU_C.tx2, fontSize: 7, fontFamily: RU_Sans, textDecoration: isRemoved ? "line-through" : "none" },
              n.name.length > 18 ? n.name.substring(0, 16) + ".." : n.name
            )
          );
        })(n.id));
      });
    });

    // Detail panel for selected node
    var detailPanel = null;
    if (coalitionDetail) {
      var nd = COALITION_NODES.find(function(n) { return n.id === coalitionDetail; });
      if (nd) {
        var isRem = coalitionRemoved[nd.id];
        detailPanel = React.createElement("div", {
          style: { marginTop: 20, padding: "16px 20px", background: RU_C.card, border: "1px solid " + groupColors[nd.group], borderRadius: 6, position: "relative" },
        },
          RuCornerOrnaments(),
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 } },
            React.createElement("h4", { style: { fontFamily: RU_Serif, fontSize: 16, color: groupColors[nd.group], margin: 0 } }, nd.name),
            React.createElement("button", {
              onClick: function() { var nid = nd.id; setCoalitionRemoved(function(prev) { var o = Object.assign({}, prev); o[nid] = !prev[nid]; return o; }); },
              style: { padding: "4px 14px", background: isRem ? RU_C.greenBg : RU_C.redBg, border: "1px solid " + (isRem ? RU_C.green : RU_C.red), borderRadius: 4, color: isRem ? RU_C.green : RU_C.red, cursor: "pointer", fontSize: 11, fontFamily: RU_Mono },
            }, isRem ? "RESTORE NODE" : "REMOVE NODE")
          ),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", fontSize: 12, marginBottom: 12 } },
            React.createElement("div", null, React.createElement("span", { style: { color: RU_C.tx3 } }, "Institutional Base: "), React.createElement("span", { style: { color: RU_C.tx } }, nd.inst)),
            React.createElement("div", null, React.createElement("span", { style: { color: RU_C.tx3 } }, "Leverage Type: "), React.createElement("span", { style: { color: groupColors[nd.group], fontWeight: 600 } }, nd.leverage)),
            React.createElement("div", null, React.createElement("span", { style: { color: RU_C.tx3 } }, "Replaceability: "), React.createElement("span", { style: { color: nd.replace === "LOW" ? RU_C.red : nd.replace === "MEDIUM" ? RU_C.gold : RU_C.green, fontWeight: 600 } }, nd.replace)),
            React.createElement("div", null, React.createElement("span", { style: { color: RU_C.tx3 } }, "Loyalty Basis: "), React.createElement("span", { style: { color: nd.loyalty === "PERSONAL" ? RU_C.gold : RU_C.tx2 } }, nd.loyalty))
          ),
          isRem && React.createElement("div", { style: { marginTop: 12, padding: "12px 14px", background: RU_C.redBg, borderRadius: 4, borderLeft: "3px solid " + RU_C.red } },
            React.createElement("div", { style: { fontSize: 12, color: RU_C.red, fontWeight: 600, marginBottom: 4 } }, "COALITION IMPACT ANALYSIS"),
            React.createElement("div", { style: { fontSize: 12, color: RU_C.tx, marginBottom: 4 } }, "\u2716 Capability lost: " + nd.removal.lost),
            React.createElement("div", { style: { fontSize: 12, color: RU_C.tx2, marginBottom: 4 } }, "\u21bb Replacement: " + nd.removal.replacement),
            React.createElement("div", { style: { fontSize: 12, marginBottom: 4 } }, React.createElement("span", { style: { color: RU_C.tx3 } }, "Stability risk: "), React.createElement("span", { style: { color: nd.removal.risk === "CRITICAL" ? RU_C.red : nd.removal.risk === "HIGH" ? "#c07020" : nd.removal.risk === "MEDIUM" ? RU_C.gold : RU_C.green, fontWeight: 600 } }, nd.removal.risk)),
            React.createElement("div", { style: { fontSize: 11, color: RU_C.tx3, fontStyle: "italic" } }, "\ud83d\udccc " + nd.removal.parallel)
          )
        );
      }
    }

    // Fragility score panel
    var fragPanel = React.createElement("div", {
      style: { marginTop: 24, padding: "16px 20px", background: RU_C.card, border: "1px solid " + fragColor, borderRadius: 6, position: "relative" },
    },
      RuCornerOrnaments(),
      React.createElement("h4", { style: { fontFamily: RU_Serif, fontSize: 15, color: fragColor, marginBottom: 8 } }, "COALITION FRAGILITY SCORE"),
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" } },
        React.createElement("div", { style: { width: 80, height: 80, borderRadius: "50%", border: "3px solid " + fragColor, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" } },
          React.createElement("div", { style: { fontSize: 24, fontWeight: "bold", color: fragColor, fontFamily: RU_Mono } }, fragScore + "%"),
          React.createElement("div", { style: { fontSize: 8, color: RU_C.tx3 } }, fragLabel)
        ),
        React.createElement("div", { style: { flex: 1, minWidth: 250 } },
          React.createElement("div", { style: { fontSize: 12, color: RU_C.tx, marginBottom: 6 } },
            "Active nodes: " + totalActive + "/" + COALITION_NODES.length +
            " | Removed: " + removedNodes.length +
            " | LOW-replaceability + PERSONAL-loyalty: " + fragileCount
          ),
          React.createElement("div", { style: { fontSize: 11, color: RU_C.tx3, lineHeight: 1.6 } },
            "Fragility measures dependence on specific irreplaceable individuals with personal loyalty bonds. High fragility means the system cannot survive the loss of key nodes through institutional mechanisms alone \u2014 it depends on personal relationships that die with their holders."
          ),
          React.createElement("div", { style: { marginTop: 8, height: 8, background: RU_C.line, borderRadius: 4, overflow: "hidden" } },
            React.createElement("div", { style: { width: fragScore + "%", height: "100%", background: fragColor, borderRadius: 4, transition: "width .5s" } })
          )
        )
      )
    );

    // Legend
    var legend = React.createElement("div", {
      style: { display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16, padding: "10px 14px", background: "rgba(24,12,16,.5)", borderRadius: 4, border: "1px solid " + RU_C.line },
    },
      React.createElement("span", { style: { fontSize: 11, color: RU_C.tx3, fontFamily: RU_Sans } }, "Leverage:"),
      Object.keys(leverageSymbols).map(function(k) {
        return React.createElement("span", { key: "lk" + k, style: { fontSize: 11, color: RU_C.tx2 } }, leverageSymbols[k] + " " + k);
      }),
      React.createElement("span", { style: { fontSize: 11, color: RU_C.tx3, marginLeft: 12 } }, "|  Groups:"),
      Object.keys(groupColors).map(function(g) {
        return React.createElement("span", { key: "gc" + g, style: { fontSize: 11, color: groupColors[g] } }, "\u25cf " + g);
      })
    );

    // Framework attribution
    var framework = React.createElement("div", {
      style: { marginTop: 20, padding: "14px 18px", background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 6, position: "relative" },
    },
      RuCornerOrnaments(),
      React.createElement("h4", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.gold, marginBottom: 6 } }, "ANALYTICAL FRAMEWORK"),
      React.createElement("p", { style: { fontSize: 12, lineHeight: 1.6, color: RU_C.tx3 } },
        "Based on Bueno de Mesquita et al., 'The Logic of Political Survival' (2003): every leader maintains power by satisfying a 'winning coalition' \u2014 the minimum set of supporters whose defection would end the regime. The selectorate (those with some voice) is large; the winning coalition is small. Autocrats keep the coalition small to minimize the cost of loyalty. Putin's coalition is analyzed here through four leverage dimensions: FORCE (coercive capacity), MONEY (resource control), INFORMATION (narrative control), and LEGITIMACY (institutional authority). Remove nodes to simulate succession scenarios and identify structural vulnerabilities.")
    );

    return React.createElement("div", null,
      React.createElement("h2", { style: { fontFamily: RU_Serif, fontSize: 24, color: RU_C.gold, marginBottom: 4 } }, "\ud83d\udc51 Winning Coalition Calculator"),
      React.createElement("p", { style: { fontSize: 12, color: RU_C.tx3, marginBottom: 20, lineHeight: 1.6, maxWidth: 700 } },
        "Selectorate theory applied to Putin's Russia. Each node represents a key member of the winning coalition whose support is essential. Click nodes to examine their role, then remove them to simulate what happens when that support disappears."),
      RuOrnamentalDivider({}),
      legend,
      React.createElement("div", { style: { overflowX: "auto", marginTop: 16 } },
        React.createElement("svg", { width: svgW, height: svgH, viewBox: "0 0 " + svgW + " " + svgH, style: { display: "block", margin: "0 auto" } }, svgChildren)
      ),
      detailPanel,
      fragPanel,
      framework
    );
  }

  // ══════════════════════════════════════════════════════════
  // ── INSTRUMENT 7: Court \u2014 Putin's Kremlin Court Simulator \u2500
  // ══════════════════════════════════════════════════════════
  var COURT_RIVALS = {
    hawks: "technocrats", technocrats: "hawks",
    military: "rogue", rogue: "military",
    energy: "political", political: "energy",
  };
  var COURT_PARALLELS = {
    promote_hawks: "Resembles the post-Crimea 2014 consolidation \u2014 security hawks gained leverage as Putin framed all policy as existential defense.",
    promote_military: "Echoes Chemezov\u2019s rise through Rostec \u2014 defense contracts became the primary patronage currency after 2022.",
    promote_energy: "Recalls Sechin\u2019s expansion of Rosneft via the Yukos seizure (2004) \u2014 energy barons gain when state needs revenue.",
    promote_technocrats: "Resembles Nabiullina\u2019s elevation during the 2014-15 ruble crisis \u2014 fiscal discipline temporarily outweighs hawkish spending.",
    promote_political: "Echoes Surkov\u2019s peak influence (2011-12) \u2014 managed democracy requires its managers when legitimacy is questioned.",
    promote_rogue: "Resembles Prigozhin\u2019s rise (2016-2023) \u2014 useful irregulars gain power when the state needs deniable capability.",
    shuffle: "This is Putin\u2019s signature move. The 2024 Shoigu-to-Security-Council shuffle disrupted the military-industrial faction without purging anyone \u2014 classic rebalancing.",
    purge_hawks: "Resembles nothing in Putin\u2019s actual record \u2014 he has never purged the security establishment. This would be unprecedented and destabilizing.",
    purge_military: "Echoes the post-mutiny Prigozhin elimination (2023) \u2014 the military-adjacent actor who overreached was physically destroyed.",
    purge_energy: "Recalls the Khodorkovsky arrest (2003) \u2014 the richest oligarch crushed as a warning to all others.",
    purge_technocrats: "Would resemble Glazyev displacing reformers \u2014 abandoning fiscal discipline for war-economy mobilization.",
    purge_political: "Resembles Surkov\u2019s sidelining (2020) \u2014 political managers become expendable when their narratives fail.",
    purge_rogue: "Directly parallels the Prigozhin plane crash (August 2023) \u2014 the rogue actor who challenged the arbiter was eliminated.",
  };

  function courtAction(type, factionId, shuffleTarget) {
    var facs = {};
    var keys = Object.keys(courtFactions);
    keys.forEach(function(k) { facs[k] = Object.assign({}, courtFactions[k]); });
    var logEntry = "";
    var parallelKey = "";

    if (type === "promote") {
      facs[factionId].power = Math.min(100, facs[factionId].power + 15);
      var rival = COURT_RIVALS[factionId];
      if (rival) facs[rival].power = Math.max(0, facs[rival].power - 10);
      logEntry = "PROMOTED " + facs[factionId].name + " (+15). " + (rival ? facs[rival].name + " weakened (-10)." : "");
      parallelKey = "promote_" + factionId;
    } else if (type === "shuffle" && shuffleTarget) {
      var avg = Math.round((facs[factionId].power + facs[shuffleTarget].power) / 2);
      facs[factionId].power = avg;
      facs[shuffleTarget].power = avg;
      logEntry = "SHUFFLED " + facs[factionId].name + " \u2194 " + facs[shuffleTarget].name + ". Both reset to " + avg + ".";
      parallelKey = "shuffle";
    } else if (type === "purge") {
      facs[factionId].power = Math.max(0, facs[factionId].power - 40);
      keys.forEach(function(k) { if (k !== factionId) facs[k].power = Math.min(100, facs[k].power + 5); });
      logEntry = "PURGED " + facs[factionId].name + " (-40). All others +5 from fear.";
      parallelKey = "purge_" + factionId;
    }

    // Calculate stability
    var powers = keys.map(function(k) { return facs[k].power; });
    var maxP = Math.max.apply(null, powers);
    var minP = Math.min.apply(null, powers);
    var spread = maxP - minP;
    var unstable = maxP > 90 || spread > 60;
    var putinCtrl = Math.max(0, 100 - Math.max(0, maxP - 80) * 3 - (spread > 50 ? (spread - 50) : 0));

    var parallel = COURT_PARALLELS[parallelKey] || "A novel move with no direct historical parallel.";
    logEntry += unstable ? " \u26a0 SYSTEM UNSTABLE." : " System holds.";
    logEntry += " [Putin control: " + putinCtrl + "%]";

    setCourtFactions(facs);
    setCourtPutinControl(putinCtrl);
    setCourtLog([{ text: logEntry, parallel: parallel, unstable: unstable }].concat(courtLog.slice(0, 6)));
  }

  const [courtShuffleFrom, setCourtShuffleFrom] = useState(null);

  function renderCourt() {
    var fKeys = Object.keys(courtFactions);
    var powers = fKeys.map(function(k) { return courtFactions[k].power; });
    var maxP = Math.max.apply(null, powers);
    var minP = Math.min.apply(null, powers);
    var spread = maxP - minP;
    var unstable = maxP > 90 || spread > 60;
    var stabilityPct = Math.max(0, 100 - (spread > 40 ? (spread - 40) * 1.5 : 0) - (maxP > 85 ? (maxP - 85) * 2 : 0));

    return React.createElement("div", { style: { marginTop: 12 } },
      // Title
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } }, "\u265a Putin\u2019s Kremlin Court Simulator"),
      React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 20 } },
        "Putin rules like a Tsar managing boyars. He balances competing factions, shuffles figures between positions, promotes rivals against each other, and eliminates threats only as a last resort. His power comes from being the ONLY person all factions accept as arbiter."
      ),

      // Putin arbiter bar
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 6, padding: "14px 20px", marginBottom: 20, position: "relative" } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } },
          React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 13, fontWeight: 700, color: RU_C.gold, letterSpacing: 1 } }, "PUTIN \u2014 THE ARBITER"),
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 12, color: unstable ? "#c94040" : RU_C.green } },
            unstable ? "\u26a0 SYSTEM UNSTABLE" : "\u2713 System stable"
          )
        ),
        React.createElement("div", { style: { display: "flex", gap: 16 } },
          React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, marginBottom: 4 } }, "Putin\u2019s Control"),
            React.createElement("div", { style: { height: 8, background: "rgba(255,255,255,.06)", borderRadius: 4, overflow: "hidden" } },
              React.createElement("div", { style: { width: courtPutinControl + "%", height: "100%", background: courtPutinControl > 70 ? RU_C.gold : courtPutinControl > 40 ? RU_C.bronze : "#c94040", borderRadius: 4, transition: "width .4s" } })
            ),
            React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 10, color: RU_C.tx3, marginTop: 2 } }, courtPutinControl + "%")
          ),
          React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, marginBottom: 4 } }, "Stability Index"),
            React.createElement("div", { style: { height: 8, background: "rgba(255,255,255,.06)", borderRadius: 4, overflow: "hidden" } },
              React.createElement("div", { style: { width: Math.round(stabilityPct) + "%", height: "100%", background: stabilityPct > 60 ? RU_C.green : stabilityPct > 30 ? RU_C.bronze : "#c94040", borderRadius: 4, transition: "width .4s" } })
            ),
            React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 10, color: RU_C.tx3, marginTop: 2 } }, Math.round(stabilityPct) + "% (spread: " + spread + ")")
          )
        )
      ),

      // Faction columns
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 12, marginBottom: 20 } },
        fKeys.map(function(k) {
          var f = courtFactions[k];
          var barColor = f.power > 85 ? "#c94040" : f.power > 65 ? RU_C.gold : f.power > 40 ? RU_C.bronze : RU_C.tx3;
          return React.createElement("div", {
            key: k,
            style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 6, padding: 14, position: "relative" },
          },
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, fontWeight: 700, color: RU_C.gold, marginBottom: 2 } }, f.name),
            React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 10, color: RU_C.tx3, marginBottom: 2 } }, f.figures),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 10, color: RU_C.tx3, fontStyle: "italic", marginBottom: 8 } }, f.domain),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 10, color: RU_C.tx3, marginBottom: 4 } }, "Stance: " + f.stance),
            // Power bar
            React.createElement("div", { style: { height: 8, background: "rgba(255,255,255,.06)", borderRadius: 4, overflow: "hidden", marginBottom: 4 } },
              React.createElement("div", { style: { width: f.power + "%", height: "100%", background: barColor, borderRadius: 4, transition: "width .4s" } })
            ),
            React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 11, color: barColor, fontWeight: 700, marginBottom: 10 } }, "Power: " + f.power),
            // Action buttons
            React.createElement("div", { style: { display: "flex", gap: 4, flexWrap: "wrap" } },
              React.createElement("button", {
                onClick: function() { courtAction("promote", k); },
                style: { padding: "4px 8px", fontSize: 10, fontFamily: RU_Sans, background: "rgba(45,107,74,.2)", color: RU_C.green, border: "1px solid rgba(45,107,74,.3)", borderRadius: 3, cursor: "pointer" },
              }, "\u2191 Promote"),
              React.createElement("button", {
                onClick: function() {
                  if (courtShuffleFrom && courtShuffleFrom !== k) {
                    courtAction("shuffle", courtShuffleFrom, k);
                    setCourtShuffleFrom(null);
                  } else {
                    setCourtShuffleFrom(k);
                  }
                },
                style: { padding: "4px 8px", fontSize: 10, fontFamily: RU_Sans, background: "rgba(212,168,71,.12)", color: RU_C.bronze, border: "1px solid rgba(212,168,71,.25)", borderRadius: 3, cursor: "pointer" },
              }, "\u21c4 Shuffle"),
              React.createElement("button", {
                onClick: function() { courtAction("purge", k); },
                style: { padding: "4px 8px", fontSize: 10, fontFamily: RU_Sans, background: "rgba(139,28,35,.15)", color: "#c94040", border: "1px solid rgba(139,28,35,.3)", borderRadius: 3, cursor: "pointer" },
              }, "\u2717 Purge")
            )
          );
        })
      ),

      // Shuffle hint
      React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, fontStyle: "italic", textAlign: "center", marginBottom: 16 } },
        "Shuffle: click \u21c4 on one faction, then \u21c4 on another to swap them."
      ),

      // Action log
      courtLog.length > 0 && React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 6, padding: 16, marginBottom: 20 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, fontWeight: 700, color: RU_C.gold, marginBottom: 10, letterSpacing: 0.5 } }, "ACTION LOG"),
        courtLog.map(function(entry, i) {
          return React.createElement("div", { key: i, style: { marginBottom: 10, paddingBottom: 10, borderBottom: i < courtLog.length - 1 ? "1px solid " + RU_C.line : "none" } },
            React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 11, color: entry.unstable ? "#c94040" : RU_C.tx, marginBottom: 4 } }, entry.text),
            React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, fontStyle: "italic", lineHeight: 1.6 } }, "\u25b6 " + entry.parallel)
          );
        })
      ),

      // Key insight
      React.createElement("div", { style: { background: "rgba(212,168,71,.06)", border: "1px solid rgba(212,168,71,.15)", borderRadius: 6, padding: 16 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.gold, marginBottom: 6, letterSpacing: 1 } }, "KEY INSIGHT"),
        React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx, lineHeight: 1.75, margin: 0 } },
          "Putin\u2019s power doesn\u2019t come from strength. It comes from being the ONLY person all factions accept as arbiter. The moment a credible alternative arbiter appears, the system cracks. Every promotion, shuffle, and purge serves one purpose: ensuring no faction becomes strong enough to propose an alternative, and no faction becomes weak enough to seek one."
        )
      )
    );
  }

  // ══════════════════════════════════════════════════════════
  // ── INSTRUMENT 8: Vory — State-Criminal Nexus Map ─────────
  // ══════════════════════════════════════════════════════════
  var VORY_LAYERS = [
    { id: "kremlin", label: "Kremlin / Security Services", sub: "FSB, GRU, Security Council", y: 30, color: RU_C.red },
    { id: "oligarchs", label: "Oligarchs / State Corporations", sub: "Rosneft, Gazprom, Rostec", y: 140, color: RU_C.gold },
    { id: "fixers", label: "Intermediaries / Fixers", sub: "Lawyers, consultants, ex-intelligence", y: 250, color: RU_C.bronze },
    { id: "crime", label: "Organized Crime", sub: "Vory v Zakone, Solntsevskaya, Tambovskaya", y: 360, color: "#8a5050" },
  ];
  var VORY_FLOWS = [
    { from: "kremlin", to: "crime", label: "Krysha (protection)", dir: "down",
      detail: "The FSB provides selective law enforcement \u2014 protecting favored criminal organizations while destroying their rivals. In exchange, criminal groups handle tasks the state cannot officially perform.",
      mechanism: "A regional FSB chief signals which criminal operations will be tolerated. Police investigations are opened or closed on command. Court cases are fixed through \u2018telephone justice.\u2019",
      framework: "Galeotti terms this \u2018the nationalization of crime\u2019 \u2014 the state absorbed organized crime\u2019s enforcement capability rather than eliminating it." },
    { from: "crime", to: "kremlin", label: "Black cash & deniable violence", dir: "up",
      detail: "Criminal networks provide untraceable funds for political operations and carry out violence that cannot be linked to the state \u2014 from intimidating journalists to eliminating dissidents abroad.",
      mechanism: "Money flows through layers of shell companies, cryptocurrency, and cash businesses. Violence is contracted through intermediaries with multiple cutouts.",
      framework: "The \u2018useful criminal\u2019 model: the state tolerates criminal profit in exchange for operational services. The criminal becomes a deniable state instrument." },
    { from: "oligarchs", to: "crime", label: "Money laundering & protection", dir: "down",
      detail: "Oligarchs use criminal networks for laundering funds, protecting property (especially abroad), and enforcing business agreements outside the legal system.",
      mechanism: "Funds move through real estate, art purchases, shell companies in Cyprus/Dubai/London. Criminal groups provide physical security for disputed assets.",
      framework: "Galeotti\u2019s \u2018criminal service economy\u2019: organized crime provides professional services to legitimate business, blurring the boundary completely." },
    { from: "crime", to: "oligarchs", label: "Enforcement & hostile takeover muscle", dir: "up",
      detail: "Criminal organizations provide the muscle for corporate raiding (\u2018reiderstvo\u2019), debt collection, and labor discipline that courts cannot or will not enforce.",
      mechanism: "A corporate raider hires a \u2018security firm\u2019 staffed by former criminals. The firm physically occupies a factory, intimidates shareholders, and forces a below-market sale.",
      framework: "Where property rights are weak, private violence fills the enforcement gap. The criminal becomes an alternative judiciary." },
    { from: "kremlin", to: "oligarchs", label: "State contracts & regulatory favor", dir: "down",
      detail: "The Kremlin directs state contracts, regulatory decisions, and legal protection to favored oligarchs. In return, oligarchs fund state priorities and remain politically compliant.",
      mechanism: "A phone call from the Kremlin secures a pipeline contract. A tax investigation is opened against a non-compliant oligarch. The message is clear without being explicit.",
      framework: "The \u2018vertical of power\u2019 in economic form: loyalty is rewarded with profit, disloyalty with ruin. Property is conditional on political compliance." },
    { from: "oligarchs", to: "kremlin", label: "Political compliance & project funding", dir: "up",
      detail: "Oligarchs fund the Kremlin\u2019s priority projects \u2014 from the Sochi Olympics to the Crimean bridge \u2014 and maintain absolute political neutrality.",
      mechanism: "The Khodorkovsky lesson (2003) taught every oligarch: fund whatever the Kremlin asks, never fund opposition, never seek independent political power.",
      framework: "Galeotti\u2019s formulation: Russian oligarchs are not capitalists. They are custodians of state assets who are permitted to profit." },
    { from: "kremlin", to: "fixers", label: "Intelligence tasking", dir: "down",
      detail: "Former intelligence officers operate as \u2018consultants\u2019 who bridge the gap between state institutions and the gray economy. They carry out sensitive tasks with plausible deniability.",
      mechanism: "An ex-FSB colonel runs a \u2018consulting firm\u2019 that handles sanctions evasion, arranges meetings between officials and businessmen, and manages compromising information.",
      framework: "The fixer layer is where the system\u2019s true architecture becomes visible \u2014 formal institutions above, informal networks below, connected by people who speak both languages." },
    { from: "fixers", to: "crime", label: "Operational coordination", dir: "down",
      detail: "Fixers coordinate between criminal organizations and their state patrons, ensuring that criminal operations serve state interests and state protection serves criminal interests.",
      mechanism: "A lawyer with connections to both the prosecutor\u2019s office and the Solntsevskaya bratva arranges for charges to be dropped in exchange for \u2018cooperation\u2019 on a sensitive matter.",
      framework: "The fixer is the system\u2019s essential lubricant. Without fixers, the state-crime nexus would require direct contact between officials and criminals \u2014 too risky for both sides." },
    { from: "crime", to: "fixers", label: "Intelligence on rivals & foreign contacts", dir: "up",
      detail: "Criminal networks provide intelligence that formal agencies cannot easily obtain \u2014 particularly on diaspora communities, foreign criminal organizations, and sanctions evasion routes.",
      mechanism: "A vory leader with contacts in London\u2019s Russian diaspora provides information on an exile\u2019s movements. This intelligence flows through a fixer to the FSB.",
      framework: "After 2022, criminal networks became essential for sanctions evasion \u2014 moving money, goods, and technology through channels that formal institutions cannot access." },
  ];

  function renderVory() {
    var svgW = 700, svgH = 430, boxW = 520, boxX = 90;
    return React.createElement("div", { style: { marginTop: 12 } },
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } }, "\ud83d\udd78\ufe0f The Vory \u2014 State-Criminal Nexus Map"),
      React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 20 } },
        "Based on Galeotti\u2019s The Vory: the blurred boundary between Russian state power and organized crime. The Russian state didn\u2019t defeat organized crime. It absorbed it."
      ),

      // SVG network
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 20, marginBottom: 20, overflowX: "auto" } },
        React.createElement("svg", { viewBox: "0 0 " + svgW + " " + svgH, style: { width: "100%", maxWidth: svgW } },
          // Layer boxes
          VORY_LAYERS.map(function(layer) {
            return React.createElement("g", { key: layer.id },
              React.createElement("rect", { x: boxX, y: layer.y, width: boxW, height: 70, rx: 6, fill: "rgba(255,255,255,.03)", stroke: layer.color, strokeWidth: 1, strokeOpacity: 0.4 }),
              React.createElement("text", { x: boxX + 16, y: layer.y + 28, fill: layer.color, fontFamily: RU_Sans, fontSize: 13, fontWeight: 700 }, layer.label),
              React.createElement("text", { x: boxX + 16, y: layer.y + 48, fill: RU_C.tx3, fontFamily: RU_Mono, fontSize: 10 }, layer.sub)
            );
          }),
          // Flow arrows
          VORY_FLOWS.map(function(flow, i) {
            var fromLayer = VORY_LAYERS.filter(function(l) { return l.id === flow.from; })[0];
            var toLayer = VORY_LAYERS.filter(function(l) { return l.id === flow.to; })[0];
            if (!fromLayer || !toLayer) return null;
            var isDown = flow.dir === "down";
            var xOffset = isDown ? boxX + boxW * 0.3 + (i % 3) * 60 : boxX + boxW * 0.5 + (i % 3) * 60;
            var y1 = isDown ? fromLayer.y + 70 : fromLayer.y;
            var y2 = isDown ? toLayer.y : toLayer.y + 70;
            var midY = (y1 + y2) / 2;
            var selected = vorySelectedFlow === i;
            var arrowColor = selected ? RU_C.gold : "rgba(140,110,40,.3)";
            return React.createElement("g", {
              key: i,
              onClick: function() { setVorySelectedFlow(selected ? null : i); },
              style: { cursor: "pointer" },
            },
              React.createElement("line", { x1: xOffset, y1: y1, x2: xOffset, y2: y2, stroke: arrowColor, strokeWidth: selected ? 2 : 1, strokeDasharray: selected ? "none" : "4,3" }),
              // Arrowhead
              React.createElement("polygon", {
                points: isDown
                  ? (xOffset - 4) + "," + (y2 - 8) + " " + xOffset + "," + y2 + " " + (xOffset + 4) + "," + (y2 - 8)
                  : (xOffset - 4) + "," + (y2 + 8) + " " + xOffset + "," + y2 + " " + (xOffset + 4) + "," + (y2 + 8),
                fill: arrowColor,
              }),
              // Label
              React.createElement("text", {
                x: xOffset + 8, y: midY, fill: selected ? RU_C.gold : RU_C.tx3,
                fontFamily: RU_Sans, fontSize: 9, transform: "rotate(-90," + (xOffset + 8) + "," + midY + ")",
                textAnchor: "middle",
              }, flow.label)
            );
          })
        ),
        // Click hint
        React.createElement("div", { style: { textAlign: "center", fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, fontStyle: "italic", marginTop: 8 } },
          "Click any flow arrow to see how it works."
        )
      ),

      // Selected flow detail
      vorySelectedFlow !== null && React.createElement("div", { style: { background: "rgba(139,28,35,.08)", border: "1px solid rgba(139,28,35,.2)", borderRadius: 6, padding: 16, marginBottom: 20 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 13, fontWeight: 700, color: RU_C.gold, marginBottom: 8 } },
          "\u25b6 " + VORY_FLOWS[vorySelectedFlow].label
        ),
        React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx, lineHeight: 1.7, marginBottom: 10 } }, VORY_FLOWS[vorySelectedFlow].detail),
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.bronze, marginBottom: 4 } }, "MECHANISM"),
        React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 10 } }, VORY_FLOWS[vorySelectedFlow].mechanism),
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.bronze, marginBottom: 4 } }, "ANALYTICAL FRAMEWORK"),
        React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.7 } }, VORY_FLOWS[vorySelectedFlow].framework)
      ),

      // Legitimacy vs Capability tradeoff
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 6, padding: 16, marginBottom: 20 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, fontWeight: 700, color: RU_C.gold, marginBottom: 10, letterSpacing: 0.5 } }, "LEGITIMACY vs. OPERATIONAL CAPABILITY"),
        React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 8 } },
          React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 10, color: RU_C.tx3, width: 80 } }, "Legitimacy"),
          React.createElement("div", { style: { flex: 1, height: 10, background: "rgba(255,255,255,.06)", borderRadius: 5, overflow: "hidden", position: "relative" } },
            React.createElement("div", { style: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", background: "linear-gradient(to right, #c94040, " + RU_C.bronze + ", " + RU_C.green + ")", opacity: 0.3 } }),
            React.createElement("div", { style: { position: "absolute", left: "35%", top: 0, width: 3, height: "100%", background: RU_C.gold, borderRadius: 2 } })
          ),
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 10, color: RU_C.tx3, width: 30 } }, "35%")
        ),
        React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 12 } },
          React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 10, color: RU_C.tx3, width: 80 } }, "Capability"),
          React.createElement("div", { style: { flex: 1, height: 10, background: "rgba(255,255,255,.06)", borderRadius: 5, overflow: "hidden", position: "relative" } },
            React.createElement("div", { style: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", background: "linear-gradient(to right, #c94040, " + RU_C.bronze + ", " + RU_C.green + ")", opacity: 0.3 } }),
            React.createElement("div", { style: { position: "absolute", left: "78%", top: 0, width: 3, height: "100%", background: RU_C.gold, borderRadius: 2 } })
          ),
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 10, color: RU_C.tx3, width: 30 } }, "78%")
        ),
        React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, lineHeight: 1.7, margin: 0 } },
          "As the state-crime nexus deepens, the regime\u2019s operational capability increases \u2014 it can move money, project violence, and evade sanctions through informal networks. But legitimacy erodes: citizens see a state that protects criminals rather than protecting them from criminals. After 2022, this tradeoff sharpened dramatically as sanctions evasion made criminal networks essential infrastructure."
        )
      ),

      // Key data points
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 6, padding: 16, marginBottom: 20 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, fontWeight: 700, color: RU_C.gold, marginBottom: 10, letterSpacing: 0.5 } }, "HISTORICAL TRAJECTORY"),
        [
          { period: "1990s", text: "State collapse: organized crime fills the governance vacuum. Vory v zakone become de facto authorities in many regions. The term \u2018wild capitalism\u2019 (dikiy kapitalizm) captures the era." },
          { period: "2000s", text: "Putin\u2019s \u2018vertical of power\u2019: crime is not eliminated but subordinated. The vory who accept FSB oversight survive; those who resist are imprisoned or killed. The Yaponchik case (2009) demonstrates the new rules." },
          { period: "2014+", text: "Post-Crimea sanctions make criminal networks useful for circumvention. The Kremlin increasingly relies on deniable actors (Wagner, cybercrime groups) for foreign operations." },
          { period: "2022+", text: "Full-scale sanctions regime transforms criminal networks from useful to essential. Sanctions evasion, parallel imports, and technology smuggling all require the infrastructure only organized crime can provide." },
        ].map(function(item) {
          return React.createElement("div", { key: item.period, style: { display: "flex", gap: 12, marginBottom: 10 } },
            React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 11, color: RU_C.gold, minWidth: 50, fontWeight: 700 } }, item.period),
            React.createElement("span", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.6 } }, item.text)
          );
        })
      ),

      // Bibliography
      React.createElement("div", { style: { borderTop: "1px solid " + RU_C.line, paddingTop: 12 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, marginBottom: 6, letterSpacing: 0.5 } }, "GALEOTTI BIBLIOGRAPHY"),
        ["The Vory: Russia\u2019s Super Mafia (2018)", "We Need to Talk About Putin (2019)", "A Short History of Russia (2020)", "Putin\u2019s Wars: From Chechnya to Ukraine (2022)"].map(function(b) {
          return React.createElement("div", { key: b, style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx3, fontStyle: "italic", marginBottom: 2 } }, "\u2022 " + b);
        })
      )
    );
  }

  // ══════════════════════════════════════════════════════════
  // ── INSTRUMENT 9: Kompromat — Mutual Vulnerability Web ────
  // ══════════════════════════════════════════════════════════
  var KOMP_NODES = [
    { id: "security",    label: "The Security Chief",      x: 350, y: 60,  color: RU_C.red },
    { id: "energy",      label: "The Energy Baron",        x: 560, y: 120, color: RU_C.gold },
    { id: "defense",     label: "The Defense Contractor",  x: 600, y: 260, color: RU_C.bronze },
    { id: "governor",    label: "The Governor",            x: 520, y: 390, color: "#7a6a50" },
    { id: "banker",      label: "The Banker",              x: 350, y: 440, color: RU_C.green },
    { id: "media",       label: "The Media Controller",    x: 180, y: 390, color: "#6a5a8a" },
    { id: "courtOlig",   label: "The Court Oligarch",      x: 100, y: 260, color: RU_C.gold },
    { id: "intel",       label: "The Intelligence Director",x: 140, y: 120, color: RU_C.red },
    { id: "military",    label: "The Military Commander",  x: 250, y: 30,  color: "#5a7a6a" },
    { id: "polman",      label: "The Political Manager",   x: 460, y: 30,  color: "#7a5a5a" },
    { id: "foreign",     label: "The Foreign Operator",    x: 620, y: 190, color: "#5a6a7a" },
    { id: "fixer",       label: "The Fixer",               x: 350, y: 250, color: "#8a7050" },
  ];
  var KOMP_EDGES = [
    { a: "security", b: "energy", aKnows: "Knows about the Baron\u2019s offshore accounts in Cyprus and Dubai, documented through FSB surveillance of foreign banking transactions.", bKnows: "Knows the Chief authorized extrajudicial operations during the Chechen campaigns \u2014 documented in military intelligence files the Baron acquired through a retired GRU general.", whyStalemate: "The Baron\u2019s energy revenues fund the Chief\u2019s operational budgets off-book. The Chief\u2019s security apparatus protects the Baron\u2019s monopoly position. Mutual destruction would collapse both.", ifBroken: "The Chief releases banking records \u2192 EU freezes the Baron\u2019s accounts. The Baron leaks operational files \u2192 ICC investigation. Both lose everything." },
    { a: "security", b: "fixer", aKnows: "Knows the Fixer brokered deals between sanctioned entities and Western companies \u2014 documented through signals intelligence.", bKnows: "Knows which operations the Chief personally authorized that violated even Russia\u2019s own laws. The Fixer keeps copies of signed orders.", whyStalemate: "The Fixer is the Chief\u2019s essential intermediary for deniable operations. The Chief is the Fixer\u2019s essential protector from prosecution.", ifBroken: "Without the Fixer, the Chief loses deniable capability. Without the Chief, the Fixer faces 15 years in Lefortovo." },
    { a: "energy", b: "banker", aKnows: "Knows the Banker laundered proceeds from privatization fraud in the 1990s \u2014 paper trail preserved in Zurich.", bKnows: "Knows the Baron\u2019s real production costs vs. reported figures \u2014 the gap represents billions in skimmed revenue.", whyStalemate: "The Banker manages the Baron\u2019s global financial architecture. The Baron provides the cash flows that keep the bank solvent. Interdependence is total.", ifBroken: "Leaked production data triggers a shareholder revolt and Western legal action. Leaked laundering records trigger Swiss prosecution. Both dynasties end." },
    { a: "defense", b: "military", aKnows: "Knows the Commander\u2019s staff inflated readiness reports to secure promotion \u2014 documented in contract discrepancy records.", bKnows: "Knows the Contractor delivered substandard equipment and billed for premium \u2014 soldiers in the field know the difference.", whyStalemate: "The Commander needs functioning equipment. The Contractor needs military contracts. Each covers for the other\u2019s corruption.", ifBroken: "Readiness fraud exposed \u2192 Commander cashiered. Equipment fraud exposed \u2192 Contractor loses all state contracts. Both destroyed." },
    { a: "governor", b: "media", aKnows: "Knows the Controller fabricated viewership numbers to inflate advertising revenue \u2014 documented by regional media monitors.", bKnows: "Knows the Governor\u2019s real election margins (fabricated by 15-20 points) and where the bodies are buried from the 1990s.", whyStalemate: "The Governor delivers the vote counts the Kremlin demands. The Controller provides the narrative that makes those counts plausible. Symbiotic.", ifBroken: "Real election data released \u2192 Governor removed for incompetence (the sin isn\u2019t fraud, it\u2019s getting caught). Fabricated ratings exposed \u2192 Controller\u2019s advertising empire collapses." },
    { a: "courtOlig", b: "polman", aKnows: "Knows the Manager diverted campaign funds to personal accounts \u2014 documented through banking sources.", bKnows: "Knows the Oligarch\u2019s wealth derives from a rigged privatization auction that the Manager helped arrange \u2014 with Presidential blessing at the time.", whyStalemate: "The Oligarch funds the Manager\u2019s political operations. The Manager ensures the Oligarch\u2019s business interests are protected in legislation. Classic patron-client.", ifBroken: "Fund diversion exposed \u2192 Manager imprisoned (Ulyukayev precedent). Privatization fraud exposed \u2192 Oligarch\u2019s assets renationalized (Khodorkovsky precedent). Both precedents exist." },
    { a: "intel", b: "foreign", aKnows: "Knows the Operator ran unauthorized side operations abroad \u2014 using state resources for personal enrichment.", bKnows: "Knows the Director\u2019s agents were compromised in a Western country \u2014 and that the Director covered it up rather than report to superiors.", whyStalemate: "The Director needs the Operator\u2019s foreign networks. The Operator needs the Director\u2019s diplomatic cover. Both have career-ending information on each other.", ifBroken: "Unauthorized operations exposed \u2192 Operator recalled and imprisoned. Agent compromise exposed \u2192 Director dismissed in disgrace. Mutual professional death." },
    { a: "fixer", b: "governor", aKnows: "Knows the Governor\u2019s family owns property abroad through shell companies \u2014 in violation of declared asset rules.", bKnows: "Knows the Fixer arranged contract kickbacks for federal officials using the Governor\u2019s regional budget.", whyStalemate: "The Fixer channels federal resources to the Governor\u2019s region. The Governor provides local cover for the Fixer\u2019s operations. Both are embedded in the same patronage chain.", ifBroken: "Foreign property exposed \u2192 Governor dismissed and assets seized. Kickback scheme exposed \u2192 Fixer loses federal protection and faces prosecution." },
    { a: "fixer", b: "banker", aKnows: "Knows the Banker provided false compliance certificates for international transactions \u2014 potentially triggering correspondent banking sanctions.", bKnows: "Knows the Fixer moved money for designated sanctioned individuals \u2014 with documentation that would trigger Western legal action.", whyStalemate: "The Banker needs the Fixer\u2019s connections to generate business. The Fixer needs the Banker\u2019s infrastructure to move money. They are the financial plumbing of the system.", ifBroken: "Compliance fraud exposed \u2192 Western banks sever correspondent relationships. Sanctions evasion exposed \u2192 Western asset freezes and criminal prosecution. Systemic financial disruption." },
    { a: "security", b: "military", aKnows: "Knows about procurement fraud and inflated casualty reporting in active operations.", bKnows: "Knows the Chief\u2019s department ran parallel intelligence operations that contradicted official military assessments provided to the President.", whyStalemate: "The Shoigu-Patrushev dynamic: military and security establishments must cooperate operationally while competing for Presidential favor. Neither can destroy the other without weakening the state\u2019s coercive capacity.", ifBroken: "This is the most dangerous fracture line. Military-security splits in authoritarian regimes are historically the most common trigger for regime collapse." },
  ];

  var KOMP_SCENARIOS = [
    { id: "defector", title: "The Defector", icon: "\ud83c\udfc3",
      description: "One node tries to leave the system \u2014 like Berezovsky fleeing to London in 2000.",
      mechanics: "The moment a figure defects, every connected node becomes hostile. The defector\u2019s kompromat is preemptively devalued by releasing counter-kompromat. Assets inside Russia are seized immediately (often within hours). Western assets are targeted through Interpol red notices, civil litigation, and hired investigators. The defector\u2019s family members still in Russia become leverage points.",
      outcome: "Berezovsky died in London in 2013, having lost his fortune, his court cases, and his political relevance. The system demonstrated that exit is not a viable strategy. Every subsequent potential defector saw the lesson and stayed.",
      insight: "The system is designed so that the cost of exit always exceeds the cost of compliance. This is not accidental \u2014 it is the system\u2019s central design principle." },
    { id: "challenger", title: "The Challenger", icon: "\u2694\ufe0f",
      description: "One node tries to accumulate too much power \u2014 like Khodorkovsky in 2003.",
      mechanics: "When a node breaks the unwritten rule of proportional power, other nodes cooperate to bring them down \u2014 not because they like the system, but because unchecked power by any one node threatens everyone else. The Kremlin provides legal cover (selective prosecution), security services provide evidence (real or manufactured), media provides narrative framing, and the judiciary provides the sentence.",
      outcome: "Khodorkovsky was Russia\u2019s richest man. He funded opposition parties, contemplated a presidential run, and demanded transparency in state oil deals. Within 18 months he was in a Siberian prison camp. Yukos was dismembered and absorbed by Rosneft (Sechin). Every oligarch got the message.",
      insight: "The system tolerates individual enrichment but not individual power accumulation. Wealth is permitted; independent political capability is fatal. The distinction is the system\u2019s core operating logic." },
    { id: "succession", title: "The Successor Crisis", icon: "\ud83d\udc80",
      description: "The central arbiter node (Putin) disappears. The web fragments.",
      mechanics: "Without the arbiter, there is no mechanism to prevent kompromat from being activated. Every node has the incentive to strike first \u2014 using their kompromat before it can be used against them. The security services fragment along factional lines. Oligarchs begin moving assets abroad. Regional governors start making independent deals. The military faces contradictory orders from competing claimants.",
      outcome: "No direct historical parallel exists in the Putin era. The closest analogy is the post-Soviet collapse (1991): when the central authority disappeared, every actor grabbed what they could. The result was a decade of chaos, oligarchic predation, and state disintegration. The current system has MORE mutual compromise than the Soviet system, making a succession crisis potentially more violent.",
      insight: "This is the system\u2019s fatal design flaw. Personalist autocracies that rely on a single arbiter have no succession mechanism. The arbiter cannot designate a successor without empowering a rival. The system that is optimized for stability under one ruler is optimized for chaos the moment that ruler departs." },
  ];

  function renderKompromat() {
    var svgW = 700, svgH = 500;
    return React.createElement("div", { style: { marginTop: 12 } },
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } }, "\ud83d\udcdc Kompromat \u2014 Mutual Vulnerability Web"),
      React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 20 } },
        "Krugovaya poruka \u2014 mutual responsibility. The system\u2019s stability comes from mutual compromise: everyone has compromising material on everyone else. This isn\u2019t blackmail. It\u2019s a governance mechanism."
      ),

      // SVG Web
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 20, marginBottom: 20, overflowX: "auto" } },
        React.createElement("svg", { viewBox: "0 0 " + svgW + " " + svgH, style: { width: "100%", maxWidth: svgW } },
          // Edges
          KOMP_EDGES.map(function(edge, i) {
            var nodeA = KOMP_NODES.filter(function(n) { return n.id === edge.a; })[0];
            var nodeB = KOMP_NODES.filter(function(n) { return n.id === edge.b; })[0];
            if (!nodeA || !nodeB) return null;
            var selected = kompSelectedEdge === i;
            return React.createElement("line", {
              key: "e" + i,
              x1: nodeA.x, y1: nodeA.y, x2: nodeB.x, y2: nodeB.y,
              stroke: selected ? RU_C.gold : "rgba(140,110,40,.12)",
              strokeWidth: selected ? 2.5 : 0.8,
              style: { cursor: "pointer" },
              onClick: function() { setKompSelectedEdge(selected ? null : i); },
            });
          }),
          // Nodes
          KOMP_NODES.map(function(node) {
            var isInvolved = kompSelectedEdge !== null && (KOMP_EDGES[kompSelectedEdge].a === node.id || KOMP_EDGES[kompSelectedEdge].b === node.id);
            return React.createElement("g", { key: node.id },
              React.createElement("circle", {
                cx: node.x, cy: node.y, r: isInvolved ? 22 : 16,
                fill: isInvolved ? node.color : "rgba(255,255,255,.05)",
                stroke: node.color, strokeWidth: isInvolved ? 2 : 1,
                style: { transition: "all .3s" },
              }),
              React.createElement("text", {
                x: node.x, y: node.y + 32, textAnchor: "middle",
                fill: isInvolved ? RU_C.gold : RU_C.tx3,
                fontFamily: RU_Sans, fontSize: 9, fontWeight: isInvolved ? 700 : 400,
              }, node.label)
            );
          })
        ),
        React.createElement("div", { style: { textAlign: "center", fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, fontStyle: "italic", marginTop: 8 } },
          "Click any connection line to see what each side knows."
        )
      ),

      // Selected edge detail
      kompSelectedEdge !== null && React.createElement("div", { style: { background: "rgba(212,168,71,.06)", border: "1px solid rgba(212,168,71,.15)", borderRadius: 6, padding: 16, marginBottom: 20 } },
        (function() {
          var edge = KOMP_EDGES[kompSelectedEdge];
          var nodeA = KOMP_NODES.filter(function(n) { return n.id === edge.a; })[0];
          var nodeB = KOMP_NODES.filter(function(n) { return n.id === edge.b; })[0];
          return React.createElement(React.Fragment, null,
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 13, fontWeight: 700, color: RU_C.gold, marginBottom: 12 } },
              nodeA.label + " \u2194 " + nodeB.label
            ),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 } },
              React.createElement("div", null,
                React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: nodeA.color, marginBottom: 4 } }, nodeA.label + " KNOWS:"),
                React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, lineHeight: 1.6 } }, edge.aKnows)
              ),
              React.createElement("div", null,
                React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: nodeB.color, marginBottom: 4 } }, nodeB.label + " KNOWS:"),
                React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, lineHeight: 1.6 } }, edge.bKnows)
              )
            ),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.bronze, marginBottom: 4 } }, "WHY NEITHER CAN USE IT"),
            React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, lineHeight: 1.6, marginBottom: 10 } }, edge.whyStalemate),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: "#c94040", marginBottom: 4 } }, "IF THE RELATIONSHIP BROKE"),
            React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, lineHeight: 1.6 } }, edge.ifBroken)
          );
        })()
      ),

      // Scenarios
      React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 13, fontWeight: 700, color: RU_C.gold, marginBottom: 12, letterSpacing: 0.5 } }, "SYSTEM STRESS SCENARIOS"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 } },
        KOMP_SCENARIOS.map(function(sc) {
          var active = kompScenario === sc.id;
          return React.createElement("button", {
            key: sc.id,
            onClick: function() { setKompScenario(active ? null : sc.id); },
            style: {
              background: active ? "rgba(212,168,71,.1)" : RU_C.card,
              border: "1px solid " + (active ? "rgba(212,168,71,.3)" : RU_C.line),
              borderRadius: 6, padding: 16, cursor: "pointer", textAlign: "left",
            },
          },
            React.createElement("div", { style: { fontSize: 20, marginBottom: 6 } }, sc.icon),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 13, fontWeight: 700, color: active ? RU_C.gold : RU_C.tx, marginBottom: 4 } }, sc.title),
            React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, lineHeight: 1.5 } }, sc.description)
          );
        })
      ),

      // Active scenario detail
      kompScenario && (function() {
        var sc = KOMP_SCENARIOS.filter(function(s) { return s.id === kompScenario; })[0];
        if (!sc) return null;
        return React.createElement("div", { style: { background: "rgba(139,28,35,.08)", border: "1px solid rgba(139,28,35,.2)", borderRadius: 6, padding: 16, marginBottom: 20 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 14, fontWeight: 700, color: RU_C.gold, marginBottom: 10 } }, sc.icon + " " + sc.title),
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.bronze, marginBottom: 4 } }, "HOW IT WORKS"),
          React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx, lineHeight: 1.7, marginBottom: 12 } }, sc.mechanics),
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.bronze, marginBottom: 4 } }, "HISTORICAL OUTCOME"),
          React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 12 } }, sc.outcome),
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, marginBottom: 4 } }, "KEY INSIGHT"),
          React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx, lineHeight: 1.7, fontStyle: "italic" } }, sc.insight)
        );
      })(),

      // Core insight
      React.createElement("div", { style: { background: "rgba(212,168,71,.06)", border: "1px solid rgba(212,168,71,.15)", borderRadius: 6, padding: 16, marginBottom: 20 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.gold, marginBottom: 6, letterSpacing: 1 } }, "THE OPERATING SYSTEM"),
        React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx, lineHeight: 1.75, margin: 0 } },
          "Kompromat isn\u2019t a bug in the Russian system. It\u2019s the operating system. Everyone is complicit, so everyone is trapped. The system\u2019s stability comes not from loyalty or fear alone, but from the mathematical certainty that defection is worse than compliance for every individual node. This is a Nash equilibrium: no actor can improve their position by unilaterally changing strategy. The only moves that break the equilibrium are collective \u2014 which is precisely why the system works so hard to prevent coordination among its members."
        )
      ),

      // Bibliography
      React.createElement("div", { style: { borderTop: "1px solid " + RU_C.line, paddingTop: 12 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, marginBottom: 6, letterSpacing: 0.5 } }, "GALEOTTI BIBLIOGRAPHY"),
        ["The Vory: Russia\u2019s Super Mafia (2018)", "We Need to Talk About Putin (2019)", "A Short History of Russia (2020)", "Putin\u2019s Wars: From Chechnya to Ukraine (2022)"].map(function(b) {
          return React.createElement("div", { key: b, style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx3, fontStyle: "italic", marginBottom: 2 } }, "\u2022 " + b);
        })
      )
    );
  }


  // ══════════════════════════════════════════════════════════
  // ── INSTRUMENT: Security Services Evolution Engine ───────
  // ══════════════════════════════════════════════════════════

  var SECURITY_SERVICES = [
    {
      id: "okhrana", name: "Okhrana", years: "1881\u20131917", color: "#7a6b3a",
      founder: "Alexander III (via Vyacheslav von Plehve)",
      mandate: "Protection of the Tsar and suppression of revolutionary movements. Operated under the Department of Police within the Ministry of Internal Affairs.",
      innovations: ["Pioneered agent provocateur methodology at industrial scale", "Created police-controlled trade unions (Zubatovshchina)", "Established foreign surveillance bureaus (Paris, London, Berlin)", "Developed systematic mail interception (perlustration) networks"],
      operations: ["The Protocols of the Elders of Zion \u2014 fabricated by Okhrana agents in Paris (c.1903), history\u2019s most destructive forgery", "The Azef Affair \u2014 Yevno Azef served simultaneously as head of the SR Combat Organization and Okhrana\u2019s top agent, organizing assassinations of officials he was paid to protect", "Infiltration of every major revolutionary party \u2014 Bolsheviks, Mensheviks, SRs all penetrated at senior levels", "Zubatov\u2019s experiment \u2014 police-run workers\u2019 organizations in Moscow and Odessa to channel labor unrest away from politics"],
      focus: "80% domestic / 20% external (\u00e9migr\u00e9 monitoring)",
      dnaForward: "Agent provocateur methodology, institutional paranoia about internal enemies, conflation of dissent with treason, the file as instrument of control",
      keyFigure: "Sergei Zubatov",
      keyFigureNote: "Head of Moscow Okhrana who invented \u2018police socialism\u2019 \u2014 the idea that the state could co-opt revolutionary movements by meeting workers\u2019 economic demands while suppressing political ones. Dismissed in 1903 when his creation spiraled beyond control."
    },
    {
      id: "cheka", name: "Cheka (VChK)", years: "1917\u20131922", color: "#8b1c23",
      founder: "Felix Dzerzhinsky (\u2018Iron Felix\u2019)",
      mandate: "All-Russian Extraordinary Commission for Combating Counter-Revolution and Sabotage. Answerable only to the Sovnarkom.",
      innovations: ["Institutionalized extrajudicial execution as state policy", "Established the hostage-taking doctrine \u2014 collective punishment of class enemies", "Created the template for ideological police (defending the revolution, not just the state)", "Fused intelligence gathering with immediate punitive action \u2014 no separation of investigation and execution"],
      operations: ["Red Terror (September 1918\u2013) \u2014 officially declared after the assassination attempt on Lenin; estimated 10,000\u201315,000 executed", "Kronstadt Suppression (1921) \u2014 crushed the naval mutiny that demanded \u2018Soviets without Bolsheviks\u2019", "\u2018We stand for organized terror\u2019 \u2014 Dzerzhinsky\u2019s explicit doctrine that terror was not an excess but a method", "Hostage system \u2014 bourgeois families held as guarantees against sabotage; executed in reprisal quotas"],
      focus: "95% domestic (class enemies, counter-revolutionaries) / 5% external",
      dnaForward: "The Lubyanka headquarters, extrajudicial authority, the principle that security organs stand above the law, \u2018revolutionary justice\u2019 as euphemism for summary execution",
      keyFigure: "Felix Dzerzhinsky",
      keyFigureNote: "Polish-born revolutionary who created the Cheka from nothing in 6 weeks. His ascetic lifestyle and fanatical devotion became the model for the \u2018honest Chekist\u2019 mythology that persists in FSB culture today. His statue outside the Lubyanka, toppled in 1991, was the iconic image of Soviet collapse."
    },
    {
      id: "gpu", name: "GPU/OGPU", years: "1922\u20131934", color: "#5a3a1a",
      founder: "Felix Dzerzhinsky (continued), then Vyacheslav Menzhinsky",
      mandate: "State Political Directorate. Broader economic security mandate than the Cheka.",
      innovations: ["Expanded into economic intelligence and industrial security", "Created the early Gulag system (SLON \u2014 Solovetsky camps)", "Established border troops as a permanent armed force", "Pioneered \u2018show trials\u2019 as political theater (Shakhty Trial, 1928)"],
      operations: ["Shakhty Trial (1928) \u2014 first major show trial, accusing engineers of sabotage; template for the Great Purge", "Dekulakization (1930\u201333) \u2014 OGPU organized deportation of ~1.8 million \u2018kulaks\u2019", "SLON (Solovetsky Special Purpose Camp) \u2014 prototype of the Gulag archipelago", "Operation TRUST (1921\u201326) \u2014 one of history\u2019s greatest deception operations, creating a fake monarchist organization to neutralize \u00e9migr\u00e9 opposition"],
      focus: "85% domestic / 15% external (TRUST, \u00e9migr\u00e9 neutralization)",
      dnaForward: "Economic security mandate, forced labor as economic tool, show trials as political instrument, the camp system as parallel state",
      keyFigure: "Vyacheslav Menzhinsky",
      keyFigureNote: "Succeeded Dzerzhinsky in 1926. Cultured, multilingual, and largely bedridden \u2014 ran the OGPU from a couch while his deputy Yagoda did the operational work. His death in 1934 (possibly poisoned by Yagoda) cleared the path for the NKVD consolidation."
    },
    {
      id: "nkvd", name: "NKVD", years: "1934\u20131946", color: "#6b1520",
      founder: "Genrikh Yagoda (1934\u201336), Nikolai Yezhov (1936\u201338), Lavrentiy Beria (1938\u201345)",
      mandate: "People\u2019s Commissariat for Internal Affairs. Total internal security monopoly: regular police, border troops, Gulag system, fire departments.",
      innovations: ["Industrialized mass terror through quota systems (Order No. 00447)", "Extrajudicial troika courts \u2014 three officials deciding life and death in minutes", "Created the sharashka system \u2014 prison design bureaus for arrested scientists", "Perfected the \u2018conveyor\u2019 interrogation method \u2014 relays of interrogators breaking prisoners through sleep deprivation"],
      operations: ["Great Purge / Yezhovshchina (1937\u201338) \u2014 ~750,000 executed, 1.3 million sentenced to Gulag", "Katyn Massacre (April\u2013May 1940) \u2014 execution of ~22,000 Polish officers and intellectuals; covered up until 1990", "NKVD Order No. 00447 (July 1937) \u2014 \u2018mass operations\u2019 order specifying quotas by region", "Gulag at peak scale \u2014 1.5 million prisoners across 476 camp complexes"],
      focus: "90% domestic terror / 10% foreign intelligence (later split to NKGB)",
      dnaForward: "The quota system for repression, bureaucratized terror, institutional willingness to consume its own (Yagoda executed 1938, Yezhov executed 1940)",
      keyFigure: "Nikolai Yezhov (\u2018The Bloody Dwarf\u2019)",
      keyFigureNote: "At 5 feet tall, Yezhov oversaw the most intense phase of Stalin\u2019s terror. His name became the era\u2019s label: Yezhovshchina. When Stalin decided the purge had gone far enough, Yezhov himself was arrested and shot in 1940 \u2014 erased from photographs, executed in the building where he had ordered thousands killed."
    },
    {
      id: "mgb", name: "MGB", years: "1946\u20131954", color: "#3a2a55",
      founder: "Viktor Abakumov (1946\u201351), then Semyon Ignatiev (1951\u201353)",
      mandate: "Ministry of State Security. Foreign intelligence, counterintelligence, and political police.",
      innovations: ["Postwar counterintelligence against returning POWs", "Expanded foreign intelligence leveraging wartime networks", "Filtration camps for repatriated citizens", "Late-Stalin paranoid campaigns: Doctors\u2019 Plot"],
      operations: ["Leningrad Affair (1948\u201350) \u2014 purge of Leningrad party leadership", "Doctors\u2019 Plot (1953) \u2014 fabricated conspiracy; halted by Stalin\u2019s death", "Repatriation screening \u2014 millions filtered through camps", "Nuclear intelligence \u2014 continued exploitation of wartime espionage networks"],
      focus: "70% domestic (postwar paranoia) / 30% foreign (Cold War intelligence)",
      dnaForward: "Foreign intelligence tradecraft matured, Cold War counterintelligence methodology, institutional capacity for antisemitic campaigns disguised as security operations",
      keyFigure: "Viktor Abakumov",
      keyFigureNote: "SMERSH wartime chief who became MGB head. Personally tortured prisoners. Arrested in 1951. Executed in 1954 \u2014 another case of the security apparatus devouring its own."
    },
    {
      id: "kgb", name: "KGB", years: "1954\u20131991", color: "#1a2855",
      founder: "Ivan Serov (1954\u201358), key figure: Yuri Andropov (1967\u201382)",
      mandate: "Committee for State Security. Comprehensive: foreign intelligence, counterintelligence, military CI, border troops, SIGINT, leadership protection, ideological security.",
      innovations: ["Active Measures (aktivnye meropriyatiya) \u2014 disinformation elevated to strategic discipline", "Psychiatric abuse \u2014 dissidents diagnosed with \u2018sluggish schizophrenia\u2019", "Andropov\u2019s modernization \u2014 recruited educated officers, built the KGB\u2019s elite self-image", "Comprehensive SIGINT and technical surveillance capabilities"],
      operations: ["Berlin Tunnel (1955\u201356) \u2014 KGB knew about the CIA/MI6 tunnel from the start via George Blake", "Penkovsky Case (1962) \u2014 GRU Colonel passed critical intelligence during Cuban Missile Crisis", "Active Measures \u2014 Operation INFEKTION (AIDS disinformation), forgeries targeting NATO", "Dissident monitoring \u2014 Sakharov\u2019s exile, Solzhenitsyn\u2019s expulsion, suppression of samizdat"],
      focus: "50% domestic (dissident monitoring) / 50% foreign (intelligence, active measures, illegals program)",
      dnaForward: "Active Measures doctrine (ancestor of modern information warfare), the \u2018Chekist\u2019 identity, intelligence tradecraft, the belief that security services are the true guardians of the state",
      keyFigure: "Yuri Andropov",
      keyFigureNote: "KGB chairman for 15 years (1967\u201382), then General Secretary (1982\u201384). Modernized the KGB from blunt instrument to sophisticated service. Promoted a generation of educated officers \u2014 including Vladimir Putin. The KGB Putin joined was Andropov\u2019s creation."
    },
    {
      id: "fsb", name: "FSB + SVR + GRU", years: "1991\u2013present", color: "#4a1a1a",
      founder: "FSB: transformed under Putin. SVR: Yevgeny Primakov. GRU: continuous.",
      mandate: "FSB: domestic CI, counterterrorism, economic security. SVR: foreign HUMINT. GRU: military intelligence, special ops, cyber.",
      innovations: ["FSB: economic \u2018security\u2019 as tool for corporate raiding", "Weaponized assassination abroad (Polonium-210, Novichok) as deliberate signals", "GRU cyber units (26165/74455) \u2014 state-level offensive cyber", "Information warfare as permanent non-wartime activity (IRA, RT)"],
      operations: ["Apartment bombings (1999) \u2014 293 killed; pretext for Second Chechen War; Ryazan \u2018training exercise\u2019 incident deeply suspicious", "Litvinenko assassination (2006) \u2014 Polonium-210 in London; radioactive trail was either incompetence or a message", "Skripal poisoning (2018) \u2014 Novichok in Salisbury; GRU officers identified by Bellingcat via open-source intelligence", "SORM surveillance \u2014 FSB has direct access to all Russian telecoms; no real judicial oversight"],
      focus: "FSB: 70% domestic / 30% external. SVR: 100% external. GRU: 80% external / 20% cyber-domestic.",
      dnaForward: "This is not a successor \u2014 it is the culmination. Putin has built a state where siloviki control politics, business, media, and the judiciary. The Chekist identity is the governing ideology of modern Russia.",
      keyFigure: "Vladimir Putin",
      keyFigureNote: "Lt. Colonel, KGB (resigned 1991). Director, FSB (1998\u201399). President (1999\u2013present). Putin is not a politician who served in the KGB; he is a KGB officer who entered politics. His worldview \u2014 primacy of the state, suspicion of civil society, conviction that Russia is surrounded by enemies \u2014 is the institutional DNA of every organization on this timeline."
    },
  ];

  var SERVICES_CONTINUITY_THREADS = [
    "Institutional paranoia: every iteration assumed the state faced existential internal threats requiring extraordinary measures",
    "Primacy of state security over individual rights: from the Okhrana\u2019s mail interception to the FSB\u2019s SORM system, the principle never changed",
    "The use of provocation: the Okhrana\u2019s agent provocateurs, the NKVD\u2019s fabricated conspiracies, the FSB\u2019s alleged apartment bombings \u2014 creating or exaggerating threats to justify the apparatus",
    "Conflation of dissent with treason: Old Believers, Decembrists, kulaks, dissidents, \u2018foreign agents\u2019 \u2014 the category changes, the logic remains identical",
    "The devouring of its own: Yagoda executed by Yezhov, Yezhov executed by Beria, Beria executed by Khrushchev \u2014 periodic consumption of leadership as renewal",
    "The Lubyanka continuity: the same building has served as headquarters from the Cheka through the FSB \u2014 a physical manifestation of institutional persistence",
  ];

  function renderServices() {
    var svgW = 900, svgH = 120, boxH = 50, boxY = 35;
    var svcCount = SECURITY_SERVICES.length;
    var gap = svgW / svcCount;
    return React.createElement("div", { style: { maxWidth: 960, margin: "0 auto" } },
      React.createElement("h2", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4, letterSpacing: ".02em" } }, "\ud83d\udd75 Security Services Evolution Engine"),
      React.createElement("p", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx3, marginBottom: 24, lineHeight: 1.6 } }, "From Okhrana to FSB: 140 years of institutional continuity. Click any service to examine its DNA."),
      React.createElement("div", { style: { overflowX: "auto", marginBottom: 24 } },
        React.createElement("svg", { viewBox: "0 0 " + svgW + " " + svgH, style: { width: "100%", minWidth: 700, height: svgH, display: "block" } },
          React.createElement("line", { x1: gap * 0.5, y1: boxY + boxH / 2, x2: gap * (svcCount - 0.5), y2: boxY + boxH / 2, stroke: RU_C.gold, strokeWidth: 2, strokeDasharray: "6,3", opacity: 0.4 }),
          SECURITY_SERVICES.map(function(svc, i) {
            if (i === svcCount - 1) return null;
            var x1 = gap * i + gap * 0.5 + 50, x2 = gap * (i + 1) + gap * 0.5 - 50, cy = boxY + boxH / 2;
            return React.createElement("g", { key: "arrow-" + i },
              React.createElement("line", { x1: x1, y1: cy, x2: x2, y2: cy, stroke: RU_C.gold, strokeWidth: 1.5, opacity: 0.6 }),
              React.createElement("polygon", { points: (x2 - 5) + "," + (cy - 4) + " " + x2 + "," + cy + " " + (x2 - 5) + "," + (cy + 4), fill: RU_C.gold, opacity: 0.6 })
            );
          }),
          SECURITY_SERVICES.map(function(svc, i) {
            var bx = gap * i + gap * 0.5 - 48, isSel = selectedService && selectedService.id === svc.id;
            return React.createElement("g", { key: svc.id, style: { cursor: "pointer" }, onClick: function() { setSelectedService(isSel ? null : svc); } },
              React.createElement("rect", { x: bx, y: boxY, width: 96, height: boxH, rx: 5, fill: isSel ? svc.color : RU_C.card, stroke: isSel ? RU_C.gold : svc.color, strokeWidth: isSel ? 2 : 1, opacity: isSel ? 1 : 0.85 }),
              React.createElement("text", { x: bx + 48, y: boxY + 20, textAnchor: "middle", fontSize: 11, fontFamily: RU_Sans, fontWeight: 600, fill: isSel ? "#fff" : RU_C.tx }, svc.name),
              React.createElement("text", { x: bx + 48, y: boxY + 36, textAnchor: "middle", fontSize: 9, fontFamily: RU_Mono, fill: isSel ? "rgba(255,255,255,.7)" : RU_C.tx3 }, svc.years),
              React.createElement("text", { x: bx + 48, y: boxY - 8, textAnchor: "middle", fontSize: 8, fontFamily: RU_Mono, fill: RU_C.tx3 }, svc.years.split("\u2013")[0])
            );
          })
        )
      ),
      selectedService ? React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + selectedService.color, borderRadius: 8, padding: 28, marginBottom: 28, borderLeft: "4px solid " + selectedService.color } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 } },
          React.createElement("div", null,
            React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 20, color: RU_C.gold, margin: 0 } }, selectedService.name + " (" + selectedService.years + ")"),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx2, marginTop: 4 } }, "Founded by: " + selectedService.founder)
          ),
          React.createElement("button", { onClick: function() { setSelectedService(null); }, style: { background: "none", border: "1px solid " + RU_C.line, borderRadius: 4, color: RU_C.tx3, cursor: "pointer", padding: "4px 10px", fontFamily: RU_Sans, fontSize: 11 } }, "\u2715 Close")
        ),
        React.createElement("div", { style: { marginBottom: 18 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 } }, "Mandate"),
          React.createElement("p", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx, lineHeight: 1.65, margin: 0 } }, selectedService.mandate)
        ),
        React.createElement("div", { style: { background: "rgba(212,168,71,.06)", border: "1px solid rgba(212,168,71,.15)", borderRadius: 6, padding: 16, marginBottom: 18 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 } }, "Key Figure: " + selectedService.keyFigure),
          React.createElement("p", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx, lineHeight: 1.65, margin: 0 } }, selectedService.keyFigureNote)
        ),
        React.createElement("div", { style: { marginBottom: 18 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 } }, "Notable Operations"),
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, selectedService.operations.map(function(op, i) { return React.createElement("div", { key: i, style: { background: "rgba(139,28,35,.06)", border: "1px solid rgba(139,28,35,.12)", borderRadius: 4, padding: "10px 14px" } }, React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx, lineHeight: 1.6 } }, op)); }))
        ),
        React.createElement("div", { style: { marginBottom: 18 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 } }, "Institutional Innovations"),
          React.createElement("ul", { style: { margin: 0, paddingLeft: 18 } }, selectedService.innovations.map(function(inn, i) { return React.createElement("li", { key: i, style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 4 } }, inn); }))
        ),
        React.createElement("div", { style: { marginBottom: 18 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 } }, "Operational Focus"),
          React.createElement("p", { style: { fontFamily: RU_Mono, fontSize: 12, color: RU_C.tx2, margin: 0 } }, selectedService.focus)
        ),
        React.createElement("div", { style: { background: "rgba(26,40,85,.1)", border: "1px solid rgba(26,40,85,.2)", borderRadius: 6, padding: 16 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: "#6a8ad0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 } }, "\u2192 DNA Carried Forward to Successors"),
          React.createElement("p", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx, lineHeight: 1.65, margin: 0 } }, selectedService.dnaForward)
        )
      ) : null,
      React.createElement("div", { style: { background: "rgba(212,168,71,.04)", border: "1px solid rgba(212,168,71,.12)", borderRadius: 8, padding: 24, marginBottom: 16 } },
        React.createElement("h4", { style: { fontFamily: RU_Serif, fontSize: 16, color: RU_C.gold, margin: "0 0 14px 0" } }, "The Continuity Thread: What Persisted Across All Iterations"),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, SERVICES_CONTINUITY_THREADS.map(function(thread, i) { return React.createElement("div", { key: i, style: { display: "flex", gap: 10, alignItems: "flex-start" } }, React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 11, color: RU_C.gold, flexShrink: 0, marginTop: 2 } }, String(i + 1) + "."), React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx, lineHeight: 1.6 } }, thread)); }))
      ),
      React.createElement("div", { style: { textAlign: "center", fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx3, fontStyle: "italic", marginTop: 12 } }, "The names change, the building remains. The Lubyanka has been headquarters since 1917.")
    );
  }

  // ══════════════════════════════════════════════════════════
  // ── INSTRUMENT: Reform-Reaction Cycle Visualizer ─────────
  // ══════════════════════════════════════════════════════════

  var REFORM_CYCLES = [
    { id: 1, title: "The Petrine Transformation", phases: [
      { type: "reform", label: "Peter I Reforms", years: "1689\u20131725", detail: "Comprehensive westernization: new capital, Table of Ranks, secular education, military modernization. Peter physically shaved boyars\u2019 beards \u2014 modernization as bodily violence.", reformerGoal: "Transform Russia from a Muscovite theocratic state into a European-style military-fiscal empire." },
      { type: "crisis", label: "Palace Coups Era", years: "1725\u20131762", detail: "Six rulers in 37 years, most installed by guards regiments. The army had become the real electorate.", reactionCause: "Peter I destroyed the old system of succession without creating a stable new one." },
      { type: "reform", label: "Catherine II Reforms", years: "1762\u20131796", detail: "Legislative Commission, provincial reform, Charter to the Nobility, expansion of education, annexation of Crimea. Catherine corresponded with Voltaire while expanding serfdom.", reformerGoal: "Enlightened absolutism: modernize governance while maintaining autocratic control." },
      { type: "reaction", label: "Paul I Reaction", years: "1796\u20131801", detail: "Reversed Catherine\u2019s noble privileges, imposed Prussian discipline. Assassinated by nobles in 1801 \u2014 the reaction to the reaction.", unsolvedProblem: "No mechanism for power transfer. No institutional check on autocratic caprice." }
    ], insight: "Peter proved that Russia could be forcibly modernized from above. But modernization without institutional development just creates new forms of instability." },
    { id: 2, title: "The Liberal Autocrat\u2019s Dilemma", phases: [
      { type: "reform", label: "Alexander I Liberal Phase", years: "1801\u20131815", detail: "Speransky\u2019s constitutional proposals, educational reform, ministerial government, talk of emancipating serfs.", reformerGoal: "Constitutional monarchy with emancipated serfs. Speransky drafted a complete constitution in 1809." },
      { type: "crisis", label: "Decembrist Crisis", years: "1825", detail: "Liberal officers revolted on December 14, 1825. Crushed in hours. Five hanged, 121 exiled to Siberia.", reactionCause: "Alexander retreated into mysticism after 1815. The gap between raised expectations and frozen policy radicalized the officers." },
      { type: "reaction", label: "Nicholas I Reaction", years: "1825\u20131855", detail: "Third Section (secret police), censorship, Orthodoxy-Autocracy-Nationality as official ideology.", reactionCause: "The Decembrist trauma convinced Nicholas that any liberalization invited revolution." },
      { type: "crisis", label: "Crimean War Defeat", years: "1853\u20131856", detail: "Humiliating loss exposed 30 years of stagnation. Serf armies with smoothbore muskets against industrial powers. Defeat is the mother of reform.", unsolvedProblem: "Autocracy cannot honestly assess its own weaknesses. The system only learns it has fallen behind when it loses a war." }
    ], insight: "The Decembrist Revolt taught exactly the wrong lesson: that reform is dangerous. It took military defeat to force the next cycle." },
    { id: 3, title: "The Great Reforms and Their Destruction", phases: [
      { type: "reform", label: "Alexander II Great Reforms", years: "1855\u20131881", detail: "Emancipation (1861), zemstvos (1864), judicial reform, military reform. The most comprehensive modernization since Peter I.", reformerGoal: "Modernize Russia to compete as a Great Power while preserving autocracy." },
      { type: "crisis", label: "Assassination of the Tsar-Liberator", years: "1881", detail: "Alexander II killed by Narodnaya Volya bomb on March 1, 1881 \u2014 the same day he approved a proto-parliamentary proposal. Terrorism achieved the exact opposite of its intent.", reactionCause: "The reforms created new social actors who demanded political representation." },
      { type: "reaction", label: "Alexander III Counter-Reforms", years: "1881\u20131894", detail: "Pobedonostsev\u2019s influence: zemstvo powers curtailed, universities surveilled, press censored, pogroms tolerated.", reactionCause: "The assassination convinced Alexander III that liberalization bred radicalism." },
      { type: "crisis", label: "Revolutionary Pressure", years: "1894\u20131905", detail: "Witte\u2019s industrialization created an urban proletariat. The 1905 Revolution forced a Duma. The fundamental problem remained.", unsolvedProblem: "Economic modernization creates social complexity that demands political representation. Importing Western technology without Western institutions never works for more than a generation." }
    ], insight: "Alexander II\u2019s fate is the central tragedy: the reformer who does the most is the most vulnerable. The reforms create forces that demand more than the autocracy can give." },
    { id: 4, title: "The Last Chance: Stolypin to Stalin", phases: [
      { type: "reform", label: "Stolypin Reforms", years: "1906\u20131911", detail: "Agricultural reform to create independent peasant proprietors. Field courts-martial for revolutionaries. Simultaneous modernization and repression.", reformerGoal: "Create a conservative peasant middle class as bulwark against revolution. Lenin recognized the threat." },
      { type: "crisis", label: "WWI and Revolution", years: "1914\u20131917", detail: "Stolypin assassinated in 1911. WWI exposed incompetence: 2 million dead by 1917. The autocracy collapsed under its own weight.", reactionCause: "Stolypin was killed before his reforms could mature. WWI imposed demands the unreformed system could not meet." },
      { type: "reform", label: "NEP Experiment", years: "1921\u20131928", detail: "Lenin\u2019s New Economic Policy: partial market economy, cultural experimentation. The 1920s were genuinely open-ended.", reformerGoal: "Bukharin\u2019s line: grow into socialism gradually through market mechanisms." },
      { type: "reaction", label: "Stalinist Reaction", years: "1928\u20131953", detail: "Forced collectivization (5\u20137 million dead), Gulag industrialization, Great Purge (750,000 executed), total state control. Stalin completed the authoritarian logic.", unsolvedProblem: "How to modernize a peasant empire without liberalizing or resorting to mass coercion. Stalin chose coercion without limit." }
    ], insight: "Stolypin represented the last possibility of evolutionary modernization. His assassination closed that path." },
    { id: 5, title: "The Final Cycle: Thaw to Putin", phases: [
      { type: "reform", label: "Khrushchev Thaw", years: "1956\u20131964", detail: "Secret Speech denouncing Stalin, de-Stalinization, Gulag releases, cultural relaxation, space program.", reformerGoal: "Reform communism from within: preserve the system while removing its worst excesses." },
      { type: "reaction", label: "Brezhnev Stagnation", years: "1964\u20131982", detail: "Khrushchev ousted by Politburo coup. \u2018Stability of cadres.\u2019 Military buildup, d\u00e9tente abroad, cynicism at home. The system stopped believing in itself.", reactionCause: "The elite concluded that reform was destabilizing. The lesson repeated from 1825 and 1881." },
      { type: "reform", label: "Gorbachev Reforms", years: "1985\u20131991", detail: "Glasnost, perestroika, democratization. Gorbachev tried to reform the unreformable. When the party loosened its grip, the empire disintegrated.", reformerGoal: "Save socialism by making it honest and democratic. Wrong about the system, right about the values." },
      { type: "reaction", label: "Putin Reaction", years: "1999\u2013present", detail: "After 1990s chaos, Putin rebuilt the vertical of power: media control, elimination of independent politics, rehabilitation of security-service identity.", unsolvedProblem: "The same problem since Peter I: how to modernize the economy without modernizing politics. The security services control everything but cannot create anything. The cycle is not over." }
    ], insight: "The pattern is not that reforms fail \u2014 it\u2019s that Russian autocracy can only reform itself by weakening the very structures that hold it together. This is not a bug \u2014 it is the architecture." },
  ];

  var CYCLE_PHASE_COLORS = {
    reform: { bg: "rgba(45,107,74,.12)", border: "rgba(45,107,74,.35)", dot: "#2d6b4a", label: "Reform" },
    reaction: { bg: "rgba(139,28,35,.12)", border: "rgba(139,28,35,.35)", dot: "#8b1c23", label: "Reaction" },
    crisis: { bg: "rgba(212,168,71,.1)", border: "rgba(212,168,71,.3)", dot: "#d4a847", label: "Crisis" },
  };

  function renderCycles() {
    var sel = selectedCycle;
    return React.createElement("div", { style: { maxWidth: 960, margin: "0 auto" } },
      React.createElement("h2", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } }, "\u267b Reform\u2013Reaction Cycle Visualizer"),
      React.createElement("p", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx3, marginBottom: 20, lineHeight: 1.6 } }, "Five complete cycles across 300 years. Click a cycle to examine its anatomy."),
      React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 } },
        REFORM_CYCLES.map(function(cycle) {
          var isActive = sel && sel.id === cycle.id;
          return React.createElement("button", { key: cycle.id, onClick: function() { setSelectedCycle(isActive ? null : cycle); }, style: { flex: "1 1 170px", padding: "14px 16px", background: isActive ? "rgba(212,168,71,.12)" : RU_C.card, border: "1px solid " + (isActive ? RU_C.gold : RU_C.line), borderRadius: 6, cursor: "pointer", textAlign: "left" } },
            React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 10, color: RU_C.gold, marginBottom: 4 } }, "CYCLE " + cycle.id),
            React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 14, color: isActive ? RU_C.gold : RU_C.tx, fontWeight: 600 } }, cycle.title),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, marginTop: 4 } }, cycle.phases[0].years.split("\u2013")[0] + " \u2013 " + cycle.phases[cycle.phases.length - 1].years.split("\u2013").pop())
          );
        })
      ),
      sel ? React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 28, marginBottom: 28 } },
        React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 18, color: RU_C.gold, margin: "0 0 20px 0" } }, "Cycle " + sel.id + ": " + sel.title),
        React.createElement("svg", { viewBox: "0 0 600 160", style: { width: "100%", height: 160, display: "block", marginBottom: 20 } },
          React.createElement("path", { d: "M 30 130 Q 150 10 300 10 Q 450 10 570 130", fill: "none", stroke: RU_C.gold, strokeWidth: 1.5, strokeDasharray: "6,4", opacity: 0.3 }),
          sel.phases.map(function(ph, i) {
            var t = i / Math.max(sel.phases.length - 1, 1);
            var cx = (1-t)*(1-t)*30 + 2*(1-t)*t*300 + t*t*570;
            var cy = (1-t)*(1-t)*130 + 2*(1-t)*t*(-10) + t*t*130;
            var pc = CYCLE_PHASE_COLORS[ph.type];
            return React.createElement("g", { key: i },
              React.createElement("circle", { cx: cx, cy: cy, r: 18, fill: pc.bg, stroke: pc.border, strokeWidth: 2 }),
              React.createElement("circle", { cx: cx, cy: cy, r: 6, fill: pc.dot }),
              React.createElement("text", { x: cx, y: cy + 32, textAnchor: "middle", fontSize: 9, fontFamily: RU_Sans, fontWeight: 600, fill: pc.dot }, pc.label),
              React.createElement("text", { x: cx, y: cy + 44, textAnchor: "middle", fontSize: 8, fontFamily: RU_Mono, fill: RU_C.tx3 }, ph.years)
            );
          })
        ),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
          sel.phases.map(function(ph, i) {
            var pc = CYCLE_PHASE_COLORS[ph.type];
            return React.createElement("div", { key: i, style: { background: pc.bg, border: "1px solid " + pc.border, borderRadius: 6, padding: 20, borderLeft: "4px solid " + pc.dot } },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } },
                React.createElement("h4", { style: { fontFamily: RU_Serif, fontSize: 15, color: pc.dot, margin: 0 } }, ph.label),
                React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 11, color: RU_C.tx3, background: "rgba(0,0,0,.2)", padding: "2px 8px", borderRadius: 3 } }, ph.years)
              ),
              React.createElement("p", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx, lineHeight: 1.65, margin: "0 0 12px 0" } }, ph.detail),
              ph.reformerGoal ? React.createElement("div", { style: { background: "rgba(45,107,74,.08)", borderRadius: 4, padding: "10px 14px", marginBottom: 8 } },
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: "#2d6b4a", textTransform: "uppercase", letterSpacing: .8 } }, "What the reformer tried to change: "),
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx } }, ph.reformerGoal)
              ) : null,
              ph.reactionCause ? React.createElement("div", { style: { background: "rgba(139,28,35,.06)", borderRadius: 4, padding: "10px 14px", marginBottom: 8 } },
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: "#8b1c23", textTransform: "uppercase", letterSpacing: .8 } }, "Why the reaction happened: "),
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx } }, ph.reactionCause)
              ) : null,
              ph.unsolvedProblem ? React.createElement("div", { style: { background: "rgba(212,168,71,.08)", borderRadius: 4, padding: "10px 14px" } },
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: .8 } }, "Structural problem that remained unsolved: "),
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx } }, ph.unsolvedProblem)
              ) : null
            );
          })
        ),
        React.createElement("div", { style: { marginTop: 20, padding: 18, background: "rgba(212,168,71,.06)", border: "1px solid rgba(212,168,71,.15)", borderRadius: 6, borderLeft: "4px solid " + RU_C.gold } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 } }, "Analytical Insight"),
          React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx, lineHeight: 1.7, margin: 0, fontStyle: "italic" } }, sel.insight)
        )
      ) : null,
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 24, marginBottom: 16, borderLeft: "4px solid " + RU_C.gold } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 } }, "The Master Pattern"),
        React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 15, color: RU_C.tx, lineHeight: 1.7, margin: 0 } }, "The pattern is not that reforms fail \u2014 it\u2019s that Russian autocracy can only reform itself by weakening the very structures that hold it together. Every reforming tsar discovers that the edifice he is trying to repair is also the edifice he is standing on.")
      )
    );
  }

  // ══════════════════════════════════════════════════════════
  // ── INSTRUMENT: Hybrid Warfare Taxonomy ──────────────────
  // ══════════════════════════════════════════════════════════

  var HYBRID_OPS = [
    { id: "georgia", label: "Georgia 2008", year: 2008 }, { id: "crimea", label: "Crimea 2014", year: 2014 },
    { id: "syria", label: "Syria 2015", year: 2015 }, { id: "ukraine", label: "Ukraine 2022", year: 2022 },
  ];
  var HYBRID_TOOLS = [
    { id: "conventional", label: "Conventional Military Force" }, { id: "info", label: "Information Ops / Propaganda" },
    { id: "cyber", label: "Cyber Operations" }, { id: "covert", label: "Covert Action" },
    { id: "economic", label: "Economic Coercion" }, { id: "diplomatic", label: "Diplomatic Manipulation" },
    { id: "proxy", label: "Proxy Forces" },
  ];
  var HYBRID_INTENSITY = {
    none: { color: "rgba(255,255,255,.04)", label: "Not Used", textColor: RU_C.tx3 },
    limited: { color: "rgba(212,168,71,.12)", label: "Limited", textColor: "#c0a060" },
    significant: { color: "rgba(139,28,35,.18)", label: "Significant", textColor: "#c04040" },
    primary: { color: "rgba(139,28,35,.35)", label: "Primary", textColor: "#e05050" },
  };
  var HYBRID_DATA = {
    georgia: {
      conventional: { intensity: "primary", what: "58th Army invaded through Roki Tunnel. Air strikes, naval blockade, rapid armored advance to within 40km of Tbilisi.", effectiveness: "Militarily decisive but operationally sloppy \u2014 friendly fire, poor coordination, officers using personal phones.", lesson: "The Russian military needed fundamental modernization. This led to the Serdyukov/Shoigu reforms (2008\u20132012)." },
      info: { intensity: "significant", what: "Narrative of \u2018protecting Russian citizens\u2019 in South Ossetia. RT framed Russia as defender.", effectiveness: "Partially effective regionally, failed to convince Western audiences. Campaign was reactive, not pre-positioned.", lesson: "Russia needed pre-conflict narrative positioning. Information operations must prepare the battlespace before kinetic operations." },
      cyber: { intensity: "limited", what: "DDoS attacks against Georgian government websites. Relatively unsophisticated.", effectiveness: "Disrupted communications but did not achieve strategic effect.", lesson: "Cyber operations needed professionalization and integration into military planning." },
      covert: { intensity: "limited", what: "South Ossetian militias as proxies. Russian \u2018peacekeepers\u2019 pre-positioned. Some GRU units deployed ahead.", effectiveness: "Provided trigger and pretext. \u2018Peacekeepers\u2019 gave Russia forces in theater before the war.", lesson: "Pre-positioned forces under peacekeeping cover \u2014 a lesson applied directly in Crimea." },
      economic: { intensity: "none", what: "No significant pre-war economic coercion. Georgia not sufficiently dependent on Russia.", effectiveness: "N/A", lesson: "Economic coercion requires dependency. Where it doesn\u2019t exist, military force is the only option." },
      diplomatic: { intensity: "significant", what: "Recognized South Ossetian and Abkhazian \u2018independence.\u2019 Exploited Kosovo precedent.", effectiveness: "Created frozen conflicts preventing Georgia\u2019s NATO integration.", lesson: "Recognizing breakaway territories creates permanent leverage. The frozen conflict model works." },
      proxy: { intensity: "significant", what: "South Ossetian/Abkhazian militias conducted initial provocations. Cossack volunteers.", effectiveness: "Provided deniability and local knowledge. But undisciplined proxies committed atrocities.", lesson: "Proxy forces useful for provocation but must be controlled. Undisciplined proxies undermine the information campaign." },
    },
    crimea: {
      conventional: { intensity: "significant", what: "Black Sea Fleet marines already in Sevastopol. Additional forces flown in. Border exercises as distraction.", effectiveness: "Existing basing meant Russia had legal forces in theater. \u2018Polite people\u2019 seized infrastructure before Ukraine could respond.", lesson: "When you have forces in theater, the challenge is political, not military. Speed and surprise neutralize a larger adversary." },
      info: { intensity: "primary", what: "Pre-positioned narrative: \u2018protecting Russian speakers,\u2019 \u2018fascist coup in Kyiv,\u2019 \u2018referendum\u2019 legitimacy. RT and trolls created alternative reality.", effectiveness: "Highly effective. Created enough confusion to paralyze Western response.", lesson: "Information dominance before and during the operation is as important as military control. The narrative is a weapon system." },
      cyber: { intensity: "significant", what: "Attacks on Ukrainian telecoms and government networks. Phone/internet disruption in Crimea.", effectiveness: "Contributed to Ukrainian military\u2019s inability to coordinate.", lesson: "Cyber integrated with physical operations can paralyze command and control at the critical moment." },
      covert: { intensity: "primary", what: "\u2018Little green men\u2019 \u2014 unmarked soldiers seizing parliament, airports, bases. The defining image of hybrid warfare.", effectiveness: "Achieved strategic surprise. By the time the world acknowledged what was happening, it was over.", lesson: "Ambiguity is a weapon. The delay in recognition is itself the victory." },
      economic: { intensity: "limited", what: "Gas pricing as background leverage. Ukraine\u2019s economic dependence was contextual, not directly weaponized.", effectiveness: "Structural dependency limited Ukraine\u2019s options.", lesson: "Economic dependency creates the environment in which military operations become possible." },
      diplomatic: { intensity: "significant", what: "UNSC veto. \u2018Referendum\u2019 for pseudo-democratic legitimacy. Kosovo precedent cited.", effectiveness: "Referendum provided justification. UNSC veto blocked authorized response.", lesson: "The UNSC veto and pseudo-democratic legitimacy are strategic assets." },
      proxy: { intensity: "limited", what: "Local \u2018self-defense\u2019 units, Crimean Cossacks, Night Wolves motorcycle club.", effectiveness: "Window dressing. The operation was fundamentally Russian military.", lesson: "In Crimea, proxies were cosmetic. In Donbas, the model shifted toward greater proxy reliance." },
    },
    syria: {
      conventional: { intensity: "primary", what: "Aerospace forces (Su-34, Su-35, Tu-22M3), Caspian flotilla cruise missiles, Khmeimim air base. Ground forces limited to advisors/SOF.", effectiveness: "Decisive in turning the war for Assad. Russian air power compensated for Syrian ground weakness.", lesson: "Air power plus local ground force is the most cost-effective intervention model." },
      info: { intensity: "significant", what: "Framed as \u2018fighting terrorism.\u2019 RT emphasized anti-ISIS narrative while downplaying strikes on non-ISIS opposition.", effectiveness: "Successfully reframed the operation as counterterrorism.", lesson: "Counterterrorism framing provides maximum legitimacy." },
      cyber: { intensity: "limited", what: "Electronic warfare systems (Krasukha-4) jammed GPS and drone signals.", effectiveness: "EW highly effective against drones and opposition communications.", lesson: "EW is a battlefield tool distinct from strategic cyber. Russia\u2019s capabilities exceeded expectations." },
      covert: { intensity: "limited", what: "GRU SOF for target acquisition and forward air control. Wagner Group\u2019s first major deployment.", effectiveness: "Spetsnaz forward air controllers dramatically improved bombing accuracy.", lesson: "SOF integrated with air power is highly effective with minimal visible footprint." },
      economic: { intensity: "none", what: "Not applicable (Syria was client, not target). Some leverage through reconstruction contracts.", effectiveness: "N/A for coercion.", lesson: "In patron-client relationships, economic tools are carrots, not sticks." },
      diplomatic: { intensity: "primary", what: "16 UNSC vetoes blocked sanctions. Astana process (Russia-Turkey-Iran) sidelined the West.", effectiveness: "Masterful. Russia became a key Middle Eastern power broker.", lesson: "Military intervention creates diplomatic leverage. Alternative frameworks can exclude the West." },
      proxy: { intensity: "primary", what: "Wagner Group provided deniable ground forces. Iranian-backed militias (Hezbollah). Syrian Arab Army rebuilt with Russian training.", effectiveness: "Wagner and Iranian proxies provided the ground force Russia wouldn\u2019t deploy at scale.", lesson: "Wagner proved the PMC model works. But Deir ez-Zor showed limits: proxies against professional forces get destroyed." },
    },
    ukraine: {
      conventional: { intensity: "primary", what: "Full-scale invasion from three axes. 190,000+ troops. Attempted decapitation strike on Kyiv. Largest European operation since 1945.", effectiveness: "Catastrophically poor. Failed to take Kyiv. Massive equipment losses. Mobilization required. Exposed corruption.", lesson: "Performance shattered the post-2008 reform narrative. Corruption had hollowed out the force." },
      info: { intensity: "significant", what: "Pre-war denials. \u2018Denazification,\u2019 \u2018special military operation\u2019 framing. Domestic media control. Bucha denial.", effectiveness: "Complete failure internationally. Zelenskyy\u2019s social media mastery outclassed Russian narrative.", lesson: "Information operations fail against a charismatic opponent with smartphone access and Western media sympathy." },
      cyber: { intensity: "significant", what: "WhisperGate, HermeticWiper. Viasat satellite hack. Ongoing infrastructure attacks.", effectiveness: "Viasat disrupted initial communications but Ukraine\u2019s cyber resilience, aided by Western tech, exceeded expectations.", lesson: "Cyber operations are not war-winners. Defenders with international support achieve remarkable resilience." },
      covert: { intensity: "limited", what: "Attempted NATO sabotage. GRU networks exposed by Western intelligence sharing.", effectiveness: "Largely neutralized by unprecedented intelligence declassification.", lesson: "When your adversary publishes your plans before execution, covert action loses its primary advantage." },
      economic: { intensity: "significant", what: "Gas supply weaponization. Grain export blockade. Sanction-busting through parallel networks.", effectiveness: "Gas weaponization backfired: Europe accelerated away from Russian energy permanently.", lesson: "Economic weapons are one-shot. Russia permanently lost its most valuable leverage for a temporary advantage." },
      diplomatic: { intensity: "limited", what: "UNSC veto. Global South outreach. Nuclear threats. Istanbul negotiations collapsed.", effectiveness: "International isolation exceeded expectations. Nuclear threats created anxiety but didn\u2019t change policy.", lesson: "Full-scale invasion collapses diplomatic options. The tools from Georgia/Crimea don\u2019t work with 190,000 troops on live television." },
      proxy: { intensity: "significant", what: "DNR/LNR forces. Wagner Group (Bakhmut, prison recruitment). Kadyrovtsy. North Korean troops (2024\u2013).", effectiveness: "Wagner at Bakhmut: human-wave tactics can take ground at enormous cost. But Prigozhin\u2019s mutiny exposed the danger.", lesson: "Proxy forces in a full-scale war signal manpower shortage, not sophistication. Wagner\u2019s rebellion proved PMCs are double-edged." },
    },
  };

  function renderHybrid() {
    var intensities = ["none", "limited", "significant", "primary"];
    return React.createElement("div", { style: { maxWidth: 1000, margin: "0 auto" } },
      React.createElement("h2", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } }, "\u2694 Hybrid Warfare Taxonomy"),
      React.createElement("p", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx3, marginBottom: 20, lineHeight: 1.6 } }, "Comparative analysis of four Russian military operations across seven hybrid warfare dimensions. Click any cell to examine specifics."),
      React.createElement("div", { style: { background: "rgba(26,40,85,.12)", border: "1px solid rgba(26,40,85,.25)", borderRadius: 6, padding: 18, marginBottom: 24, borderLeft: "4px solid " + RU_C.blue } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: "#6a8ad0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 } }, "A Note on the \u201cGerasimov Doctrine\u201d"),
        React.createElement("p", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx, lineHeight: 1.65, margin: 0 } }, "The so-called \u2018Gerasimov Doctrine\u2019 is largely a Western construct. General Valery Gerasimov\u2019s February 2013 article described what he saw the WEST doing \u2014 using non-military tools for regime change. He was analyzing a threat to Russia, not prescribing strategy. Mark Galeotti, who popularized the term, has acknowledged this misattribution. Russia practices hybrid warfare, but it is improvising with available tools and learning from each operation, not following a single doctrine.")
      ),
      React.createElement("div", { style: { display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" } },
        intensities.map(function(k) { var hi = HYBRID_INTENSITY[k]; return React.createElement("div", { key: k, style: { display: "flex", alignItems: "center", gap: 6 } }, React.createElement("div", { style: { width: 16, height: 16, borderRadius: 3, background: hi.color, border: "1px solid rgba(255,255,255,.1)" } }), React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 11, color: hi.textColor } }, hi.label)); })
      ),
      React.createElement("div", { style: { overflowX: "auto", marginBottom: 24 } },
        React.createElement("table", { style: { width: "100%", minWidth: 700, borderCollapse: "separate", borderSpacing: 3, fontFamily: RU_Sans, fontSize: 12 } },
          React.createElement("thead", null,
            React.createElement("tr", null,
              React.createElement("th", { style: { textAlign: "left", padding: "10px 12px", background: RU_C.card, color: RU_C.tx3, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, borderRadius: 4, width: 180 } }, "Tool Category"),
              HYBRID_OPS.map(function(op) { return React.createElement("th", { key: op.id, style: { textAlign: "center", padding: "10px 12px", background: RU_C.card, color: RU_C.gold, fontSize: 12, fontWeight: 600, borderRadius: 4, fontFamily: RU_Serif } }, op.label); })
            )
          ),
          React.createElement("tbody", null,
            HYBRID_TOOLS.map(function(tool) {
              return React.createElement("tr", { key: tool.id },
                React.createElement("td", { style: { padding: "10px 12px", background: RU_C.card, color: RU_C.tx2, fontSize: 12, fontWeight: 500, borderRadius: 4 } }, tool.label),
                HYBRID_OPS.map(function(op) {
                  var cell = HYBRID_DATA[op.id][tool.id], hi = HYBRID_INTENSITY[cell.intensity];
                  var isSel = hybridCell && hybridCell.opId === op.id && hybridCell.toolId === tool.id;
                  return React.createElement("td", { key: op.id, onClick: function() { setHybridCell(isSel ? null : { opId: op.id, toolId: tool.id }); }, style: { padding: "10px 12px", background: hi.color, textAlign: "center", borderRadius: 4, cursor: "pointer", border: isSel ? "2px solid " + RU_C.gold : "2px solid transparent", transition: "border .2s" } },
                    React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: hi.textColor } }, hi.label)
                  );
                })
              );
            })
          )
        )
      ),
      hybridCell ? (function() {
        var op = HYBRID_OPS.filter(function(o) { return o.id === hybridCell.opId; })[0];
        var tool = HYBRID_TOOLS.filter(function(t) { return t.id === hybridCell.toolId; })[0];
        var cell = HYBRID_DATA[hybridCell.opId][hybridCell.toolId], hi = HYBRID_INTENSITY[cell.intensity];
        return React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 24, marginBottom: 24, borderLeft: "4px solid " + (hi.textColor || RU_C.gold) } },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 } },
            React.createElement("div", null,
              React.createElement("h4", { style: { fontFamily: RU_Serif, fontSize: 17, color: RU_C.gold, margin: "0 0 4px 0" } }, op.label + " \u2014 " + tool.label),
              React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: hi.textColor, background: hi.color, padding: "3px 10px", borderRadius: 3, border: "1px solid " + hi.textColor } }, "Intensity: " + hi.label)
            ),
            React.createElement("button", { onClick: function() { setHybridCell(null); }, style: { background: "none", border: "1px solid " + RU_C.line, borderRadius: 4, color: RU_C.tx3, cursor: "pointer", padding: "4px 10px", fontFamily: RU_Sans, fontSize: 11 } }, "\u2715 Close")
          ),
          React.createElement("div", { style: { marginBottom: 16 } },
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 } }, "What Russia Did"),
            React.createElement("p", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx, lineHeight: 1.65, margin: 0 } }, cell.what)
          ),
          React.createElement("div", { style: { marginBottom: 16 } },
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 } }, "How Effective Was It"),
            React.createElement("p", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx, lineHeight: 1.65, margin: 0 } }, cell.effectiveness)
          ),
          React.createElement("div", { style: { background: "rgba(212,168,71,.06)", border: "1px solid rgba(212,168,71,.15)", borderRadius: 6, padding: 16 } },
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 } }, "Lesson Learned for Next Operation"),
            React.createElement("p", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx, lineHeight: 1.65, margin: 0, fontStyle: "italic" } }, cell.lesson)
          )
        );
      })() : null,
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 24, borderLeft: "4px solid " + RU_C.gold, marginBottom: 16 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 } }, "Cross-Operation Evolution"),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
          ["Georgia (2008) was a conventional war that revealed Russia\u2019s military weakness and triggered comprehensive reform.",
           "Crimea (2014) was the masterpiece \u2014 speed, ambiguity, information dominance, minimal casualties. It set expectations that Ukraine 2022 would shatter.",
           "Syria (2015) demonstrated expeditionary capability, the air-power-plus-proxies model, and diplomatic leverage through military action.",
           "Ukraine (2022) exposed the limits of everything: conventional capability degraded by corruption, information operations defeated by transparency, covert action neutralized by intelligence sharing, economic coercion that backfired.",
           "The trajectory is not a line of improvement but a parabola: capability rose from 2008 to 2015, then crashed in 2022. Russia learned the wrong lessons from its own successes."
          ].map(function(txt, i) { return React.createElement("div", { key: i, style: { display: "flex", gap: 10, alignItems: "flex-start" } }, React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 11, color: RU_C.gold, flexShrink: 0, marginTop: 2 } }, "\u2022"), React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx, lineHeight: 1.6 } }, txt)); })
        )
      )
    );
  }

  // ── INSTRUMENT: Devil's Advocate Framework ─────────────────
  function renderAdvocate() {
    var CHALLENGE_LENSES = [
      {
        id: "alt_actor",
        name: "Alternative Actor",
        template: function(thesis) {
          return "Consider that the dynamic described in your thesis (\"" + thesis + "\") was actually driven by a different person or faction pursuing their own interest, not by the stated actor. Who else had motive, opportunity, and capability? Intelligence services, rival clans, or external actors may be the real driver, with the visible actor as a front or instrument.";
        },
        question: "Who else could have been the real driver?",
        color: RU_C.red,
      },
      {
        id: "structural",
        name: "Structural Determinism",
        template: function(thesis) {
          return "The structural conditions -- oil price, institutional decay, demographic pressure, imperial overreach -- may have produced the outcome you describe (\"" + thesis + "\") regardless of who was in power. Would a different leader in the same structural position have acted differently? If Medvedev, Patrushev, or even Navalny had been in charge, would the constraints of Russia's resource economy, nuclear arsenal, and geographic insecurity have produced a similar result?";
        },
        question: "Was this inevitable regardless of who held power?",
        color: RU_C.blue,
      },
      {
        id: "mirror",
        name: "Mirror Image Check",
        template: function(thesis) {
          return "A Russian security analyst examining your thesis (\"" + thesis + "\") might frame it completely differently. Are you projecting Western assumptions about rationality, institutional behavior, or strategic goals? Russian strategic culture values strategic depth over efficiency, regime survival over economic growth, and great-power status over prosperity. What looks irrational from Washington may be perfectly logical from Moscow.";
        },
        question: "Are you projecting Western logic onto a non-Western actor?",
        color: RU_C.bronze,
      },
      {
        id: "missing",
        name: "What's Missing",
        template: function(thesis) {
          return "Your thesis (\"" + thesis + "\") would be falsified if specific observable evidence appeared. What would disprove it? What data would you need to see? Have you looked for that disconfirming evidence, or only for evidence that supports your conclusion? The strongest analytical claims are those that have survived genuine attempts at falsification. Name three things that, if true, would destroy your thesis -- then check whether they are true.";
        },
        question: "What evidence would DISPROVE your thesis?",
        color: RU_C.green,
      },
      {
        id: "precedent",
        name: "Historical Precedent",
        template: function(thesis) {
          return "Your thesis (\"" + thesis + "\") invokes a pattern. But when this pattern occurred before, the outcome was often different from what analysts predicted:\n\n(1) 1956 -- Khrushchev's 'Secret Speech' appeared to signal liberalization. Instead it triggered the Hungarian uprising and a hardline backlash that lasted a decade.\n\n(2) 2008 -- Georgia appeared to show Russia would only act against small, isolated targets. Analysts dismissed the possibility of action against Ukraine for 6 years -- incorrectly.\n\n(3) 1991 -- Western analysts assumed Soviet economic collapse would produce democratic reform. Instead it produced oligarchic capture and eventual authoritarian restoration.\n\nDoes your thesis account for these kinds of non-linear outcomes?";
        },
        question: "When this pattern occurred before, what actually happened?",
        color: "#7a5c8a",
      },
      {
        id: "cui_bono",
        name: "Cui Bono Deep",
        template: function(thesis) {
          return "Your thesis (\"" + thesis + "\") identifies an obvious beneficiary. But look deeper. In Russian power dynamics, the visible winner is often not the real one. Who gained quietly while attention was on the main actor? Consider: the defense industry wins from any escalation regardless of who ordered it. The security services gain from any crisis that justifies expanded surveillance. Regional governors gain from any central weakness. Money always flows somewhere -- follow the contracts, the appointments, and the property transfers, not the speeches.";
        },
        question: "Who ACTUALLY benefits beyond the obvious?",
        color: RU_C.goldDm,
      },
    ];

    var validChallenges = Object.keys(advocateStatuses).filter(function(k) { return advocateStatuses[k] === "valid"; }).length;
    var addressed = Object.keys(advocateStatuses).filter(function(k) { return advocateStatuses[k] === "addressed"; }).length;
    var total = Object.keys(advocateStatuses).length;
    var strengthLabel = total < 6 ? "INCOMPLETE" : validChallenges <= 1 ? "STRONG" : validChallenges <= 3 ? "MODERATE" : "WEAK -- REVISE";
    var strengthColor = total < 6 ? RU_C.tx3 : validChallenges <= 1 ? RU_C.green : validChallenges <= 3 ? RU_C.gold : RU_C.red;

    return React.createElement("div", { style: { marginTop: 12 } },
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } },
        "Devil's Advocate Framework"
      ),
      React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 20 } },
        "Enter a thesis about Russia and stress-test it against six structured challenge lenses. Designed to surface blind spots, mirror-image bias, and analytical overconfidence."
      ),

      // Input area
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 20, marginBottom: 20 } },
        React.createElement("label", { style: { fontFamily: RU_Sans, fontSize: 12, fontWeight: 700, color: RU_C.gold, letterSpacing: 0.8, display: "block", marginBottom: 8 } }, "YOUR THESIS"),
        React.createElement("input", {
          type: "text",
          value: advocateThesis,
          onChange: function(e) { setAdvocateThesis(e.target.value); },
          placeholder: "e.g., Putin removed Shoigu to consolidate personal control over the military",
          disabled: advocateSubmitted,
          style: {
            width: "100%", boxSizing: "border-box", padding: "10px 14px", fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx,
            background: advocateSubmitted ? "rgba(255,255,255,.03)" : "rgba(255,255,255,.06)",
            border: "1px solid " + RU_C.line, borderRadius: 4, outline: "none",
          },
        }),
        React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12 } },
          !advocateSubmitted && React.createElement("button", {
            onClick: function() { if (advocateThesis.trim()) { setAdvocateSubmitted(true); setAdvocateStatuses({}); setAdvocateResponses({}); } },
            disabled: !advocateThesis.trim(),
            style: {
              padding: "8px 20px", border: "none", borderRadius: 4, cursor: advocateThesis.trim() ? "pointer" : "default",
              fontFamily: RU_Sans, fontSize: 12, fontWeight: 600, color: "#fff",
              background: advocateThesis.trim() ? RU_C.red : RU_C.tx3,
            },
          }, "SUBMIT FOR CHALLENGE"),
          advocateSubmitted && React.createElement("button", {
            onClick: function() { setAdvocateSubmitted(false); setAdvocateThesis(""); setAdvocateStatuses({}); setAdvocateResponses({}); },
            style: {
              padding: "8px 20px", border: "1px solid " + RU_C.line, borderRadius: 4, cursor: "pointer",
              fontFamily: RU_Sans, fontSize: 12, fontWeight: 600, color: RU_C.tx2, background: "transparent",
            },
          }, "RESET & NEW THESIS")
        )
      ),

      // Challenge lenses
      advocateSubmitted && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 } },
        CHALLENGE_LENSES.map(function(lens, idx) {
          var status = advocateStatuses[lens.id];
          var response = advocateResponses[lens.id] || "";
          return React.createElement("div", {
            key: lens.id,
            style: {
              background: RU_C.card, border: "1px solid " + (status === "addressed" ? RU_C.green : status === "valid" ? RU_C.red : RU_C.line),
              borderRadius: 8, padding: 20, position: "relative",
            },
          },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 10 } },
              React.createElement("div", {
                style: {
                  width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: lens.color, fontFamily: RU_Sans, fontSize: 12, fontWeight: 700, color: "#fff",
                },
              }, String(idx + 1)),
              React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 14, fontWeight: 700, color: RU_C.gold } }, lens.name),
              status && React.createElement("div", {
                style: {
                  marginLeft: "auto", padding: "3px 10px", borderRadius: 3, fontFamily: RU_Sans, fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                  color: "#fff", background: status === "addressed" ? RU_C.green : RU_C.red,
                },
              }, status === "addressed" ? "ADDRESSED" : "VALID CHALLENGE")
            ),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: lens.color, marginBottom: 6 } }, lens.question),
            React.createElement("div", {
              style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 14,
                background: "rgba(255,255,255,.02)", padding: 12, borderRadius: 4, borderLeft: "3px solid " + lens.color },
            }, lens.template(advocateThesis)),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.tx3, marginBottom: 6 } }, "YOUR RESPONSE"),
            React.createElement("textarea", {
              value: response,
              onChange: function(e) {
                var next = Object.assign({}, advocateResponses);
                next[lens.id] = e.target.value;
                setAdvocateResponses(next);
              },
              placeholder: "How do you address this challenge?",
              rows: 3,
              style: {
                width: "100%", boxSizing: "border-box", padding: "8px 12px", fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx,
                background: "rgba(255,255,255,.04)", border: "1px solid " + RU_C.line, borderRadius: 4, outline: "none", resize: "vertical",
              },
            }),
            React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
              React.createElement("button", {
                onClick: function() {
                  var next = Object.assign({}, advocateStatuses);
                  next[lens.id] = "addressed";
                  setAdvocateStatuses(next);
                },
                style: {
                  padding: "6px 14px", border: "1px solid " + RU_C.green, borderRadius: 3, cursor: "pointer",
                  fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.green,
                  background: status === "addressed" ? "rgba(45,107,74,.15)" : "transparent",
                },
              }, "ADDRESSED"),
              React.createElement("button", {
                onClick: function() {
                  var next = Object.assign({}, advocateStatuses);
                  next[lens.id] = "valid";
                  setAdvocateStatuses(next);
                },
                style: {
                  padding: "6px 14px", border: "1px solid " + RU_C.red, borderRadius: 3, cursor: "pointer",
                  fontFamily: RU_Sans, fontSize: 11, fontWeight: 600, color: RU_C.red,
                  background: status === "valid" ? "rgba(139,28,35,.15)" : "transparent",
                },
              }, "VALID CHALLENGE")
            )
          );
        })
      ),

      // Thesis Strength Meter
      advocateSubmitted && total === 6 && React.createElement("div", {
        style: { background: RU_C.card, border: "2px solid " + strengthColor, borderRadius: 8, padding: 20, textAlign: "center" },
      },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1, marginBottom: 8 } }, "THESIS STRENGTH METER"),
        React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 28, fontWeight: 700, color: strengthColor, marginBottom: 6 } }, strengthLabel),
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx2, marginBottom: 12 } },
          addressed + " addressed / " + validChallenges + " valid challenges / 6 lenses evaluated"
        ),
        React.createElement("div", { style: { display: "flex", gap: 4, justifyContent: "center" } },
          [0,1,2,3,4,5].map(function(i) {
            var s = Object.values(advocateStatuses)[i];
            return React.createElement("div", {
              key: i,
              style: {
                width: 40, height: 8, borderRadius: 2,
                background: s === "addressed" ? RU_C.green : s === "valid" ? RU_C.red : "rgba(255,255,255,.1)",
              },
            });
          })
        ),
        React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx3, fontStyle: "italic", marginTop: 14, lineHeight: 1.6 } },
          validChallenges <= 1 ? "Your thesis has survived rigorous challenge. Confidence is warranted, but continue monitoring for new evidence." :
          validChallenges <= 3 ? "Your thesis has significant unaddressed weaknesses. Consider qualifying your claims or gathering additional evidence before presenting." :
          "Your thesis has more holes than substance. Fundamental revision is needed before this analysis is useful."
        )
      ),
      advocateSubmitted && total < 6 && React.createElement("div", {
        style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx3, fontStyle: "italic", textAlign: "center", marginTop: 8 },
      }, "Evaluate all 6 lenses to see your thesis strength rating. (" + total + "/6 complete)")
    );
  }

  // ── INSTRUMENT: Strategic Lexicon Decoder ──────────────────
  function renderLexicon() {
    var LEXICON = [
      { term: "Indivisible security", cyrillic: "\u043d\u0435\u0434\u0435\u043b\u0438\u043c\u0430\u044f \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c", western: "Cooperative security", actual: "You cannot make security decisions that affect us without our consent", example: "Russia's December 2021 draft treaties demanded NATO legally commit to no further eastward expansion -- framed as 'indivisible security' per the 1999 Istanbul Charter. The West heard a negotiating position; Russia meant a non-negotiable precondition.", gap: "Western policymakers assumed this was an opening bid. Russia treated NATO's refusal as confirmation that diplomacy was exhausted, contributing directly to the February 2022 invasion timeline." },
      { term: "Near abroad", cyrillic: "\u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u0437\u0430\u0440\u0443\u0431\u0435\u0436\u044c\u0435", western: "Neighboring countries", actual: "Our sphere of influence where we have veto rights", example: "When Russia refers to Georgia, Ukraine, Moldova, or the Baltics as the 'near abroad,' it signals that these are not fully sovereign entities in Moscow's mental map. They exist in a gray zone between Russian and Western order.", gap: "Western diplomats hear a geographic descriptor. Russian strategists mean a zone where Moscow claims special rights, including the right to intervene militarily to prevent 'unfavorable' geopolitical alignment." },
      { term: "Sovereign democracy", cyrillic: "\u0441\u0443\u0432\u0435\u0440\u0435\u043d\u043d\u0430\u044f \u0434\u0435\u043c\u043e\u043a\u0440\u0430\u0442\u0438\u044f", western: "Democracy with Russian characteristics", actual: "We decide our system, you don't get to comment", example: "Vladislav Surkov coined this term around 2006 to preempt Western criticism of Russia's political trajectory under Putin. It was deployed specifically to reject the 'color revolution' model of externally-encouraged democratization.", gap: "The term sounds like an adaptation of democracy. It is actually a rejection of universal democratic standards -- asserting that 'democracy' means whatever the sovereign state says it means." },
      { term: "Denazification", cyrillic: "\u0434\u0435\u043d\u0430\u0446\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044f", western: "Fighting actual Nazis", actual: "Regime change + cultural subordination", example: "Putin cited 'denazification' as a war aim for the 2022 invasion of Ukraine. Western audiences heard a reference to far-right groups like the Azov Battalion. Russian state media defined it as the elimination of Ukrainian national identity as a political force.", gap: "The term deliberately invokes WWII to make opposition morally impossible within Russia's domestic frame. 'Denazification' in practice means eliminating any Ukrainian leadership that orients the country toward the West." },
      { term: "Provocation", cyrillic: "\u043f\u0440\u043e\u0432\u043e\u043a\u0430\u0446\u0438\u044f", western: "Something that provokes", actual: "Any Western action we don't like", example: "NATO exercises in the Baltics, arms deliveries to Ukraine, even diplomatic statements of support for Georgia -- all are labeled 'provocations' by Moscow regardless of whether they are offensive or defensive in nature.", gap: "In Western usage, a provocation implies an aggressive act. In Russian diplomatic usage, it means any action that challenges Russian preferences, shifting the blame for Russian responses onto the other party." },
      { term: "Color revolution", cyrillic: "\u0446\u0432\u0435\u0442\u043d\u0430\u044f \u0440\u0435\u0432\u043e\u043b\u044e\u0446\u0438\u044f", western: "Democratic uprising", actual: "CIA-orchestrated regime change", example: "The Rose Revolution (Georgia 2003), Orange Revolution (Ukraine 2004), and Tulip Revolution (Kyrgyzstan 2005) are all described by Moscow as Western intelligence operations, not genuine popular movements.", gap: "Moscow genuinely believes -- or at least acts as if it believes -- that popular protests against post-Soviet autocrats are manufactured by Western intelligence. This belief drives preemptive crackdowns on NGOs and civil society." },
      { term: "Russophobia", cyrillic: "\u0440\u0443\u0441\u043e\u0444\u043e\u0431\u0438\u044f", western: "Anti-Russian prejudice", actual: "Any criticism of Russian state policy", example: "When European parliaments vote to designate Russia a state sponsor of terrorism, or when Western media report on Russian war crimes, Moscow labels this 'Russophobia' -- collapsing the distinction between prejudice against Russian people and opposition to Russian government actions.", gap: "The term is designed to make policy criticism socially unacceptable by equating it with ethnic bigotry. It immunizes Russian state behavior from legitimate scrutiny by casting all critics as racists." },
      { term: "Escalate to de-escalate", cyrillic: "\u044d\u0441\u043a\u0430\u043b\u0430\u0446\u0438\u044f \u0434\u043b\u044f \u0434\u0435\u044d\u0441\u043a\u0430\u043b\u0430\u0446\u0438\u0438", western: "Nuclear first-use doctrine", actual: "Threaten nuclear use to freeze a conflict at a favorable position", example: "Russia's 2020 nuclear deterrence policy lowers the threshold for nuclear use to include conventional threats to state existence. In the Ukraine context, nuclear rhetoric has been used to deter direct NATO intervention.", gap: "Western analysts debate whether this is real doctrine or bluff. The ambiguity is the point -- Russia benefits from Western uncertainty about where the nuclear threshold actually lies." },
      { term: "Managed democracy", cyrillic: "\u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c\u0430\u044f \u0434\u0435\u043c\u043e\u043a\u0440\u0430\u0442\u0438\u044f", western: "Guided democratic process", actual: "Elections happen, outcomes are predetermined", example: "Russia holds regular elections with multiple candidates on the ballot. But the Presidential Administration pre-selects permitted opposition candidates, controls media access, and uses 'administrative resources' to guarantee results.", gap: "The facade of competitive elections serves a legitimation function both domestically and internationally. Understanding that elections are performative rather than competitive changes how you interpret Russian 'political dynamics.'" },
      { term: "Siloviki", cyrillic: "\u0441\u0438\u043b\u043e\u0432\u0438\u043a\u0438", western: "Security officials", actual: "The warrior-administrators who actually run the country", example: "Under Putin, former FSB and military officers occupy governorships, run state corporations, and dominate the Security Council. Patrushev, Bortnikov, Naryshkin, and Shoigu (until 2024) formed the core of this class.", gap: "Westerners think of security officials as one faction among many. In Putin's Russia, the siloviki are not a faction -- they are the ruling class. Understanding Russia as a 'securocracy' rather than an 'autocracy' changes the analysis." },
      { term: "Vertical of power", cyrillic: "\u0432\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c \u0432\u043b\u0430\u0441\u0442\u0438", western: "Centralized authority", actual: "All decisions flow through one person -- and that's the feature, not the bug", example: "Putin re-centralized authority after the chaos of the 1990s by abolishing gubernatorial elections (2004), creating federal districts with presidential envoys, and making regional budgets dependent on Moscow.", gap: "Westerners see centralization as a governance weakness. Many Russians see it as the solution to the 1990s collapse. The 'vertical of power' is not an aberration -- it is the restoration of the historical norm." },
      { term: "Informational warfare", cyrillic: "\u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u043e\u043d\u043d\u0430\u044f \u0432\u043e\u0439\u043d\u0430", western: "Disinformation", actual: "Controlling the narrative space as a domain of war equal to land/sea/air", example: "The 2013 Gerasimov article (often misquoted) described a continuum of conflict where information operations, economic pressure, and political subversion are as important as kinetic force. RT, Sputnik, and troll farms are instruments in this framework.", gap: "Western analysts often treat Russian disinformation as propaganda. Russian military doctrine treats information as a warfare domain with its own operations, objectives, and success metrics -- on par with conventional military campaigns." },
      { term: "Polite people", cyrillic: "\u0432\u0435\u0436\u043b\u0438\u0432\u044b\u0435 \u043b\u044e\u0434\u0438", western: "Friendly soldiers", actual: "Unmarked special forces conducting deniable operations (Crimea 2014)", example: "During the seizure of Crimea in February-March 2014, soldiers without insignia appeared at key installations. Russian media called them 'polite people' -- a euphemism that became a meme celebrating the operation.", gap: "The term sanitized an illegal military operation by framing it as courteous rather than coercive. Putin initially denied they were Russian soldiers, then admitted it proudly. The gap between the euphemism and reality is the point." },
      { term: "Hybrid warfare", cyrillic: "\u0433\u0438\u0431\u0440\u0438\u0434\u043d\u0430\u044f \u0432\u043e\u0439\u043d\u0430", western: "Russian combined arms", actual: "Western analysts projecting unified strategy onto opportunistic tactics", example: "The term was coined by Western analysts to describe Russia's approach in Crimea and Donbas. Russian strategists find it amusing -- they see it as Westerners attributing more coherence to Russian operations than actually exists.", gap: "The danger of 'hybrid warfare' as an analytical framework is that it can make ad-hoc, improvised Russian actions look like a masterful grand strategy. Sometimes Russia is just making it up as it goes." },
      { term: "Multi-polar world", cyrillic: "\u043c\u043d\u043e\u0433\u043e\u043f\u043e\u043b\u044f\u0440\u043d\u044b\u0439 \u043c\u0438\u0440", western: "Multiple power centers", actual: "A world where America is not the sole superpower and Russia has a seat at the table", example: "Russia, China, and BRICS nations invoke multi-polarity as an organizing principle for the international order. Moscow's 2023 Foreign Policy Concept made multi-polarity a central theme.", gap: "For Russia, multi-polarity is not about diffusing power equitably. It is about ensuring Russia retains great-power status and veto rights over regional security arrangements in its neighborhood." },
      { term: "Strategic stability", cyrillic: "\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u0441\u0442\u0430\u0431\u0438\u043b\u044c\u043d\u043e\u0441\u0442\u044c", western: "Arms control", actual: "A framework that preserves Russia's nuclear parity and prevents American first-strike capability", example: "Russia's objections to US missile defense in Europe (2007-present) are framed as concerns about 'strategic stability.' The fear is that missile defense could neutralize Russia's second-strike capability, making a US first strike theoretically survivable.", gap: "Americans hear 'stability' and think of mutual security. Russians hear it and think of preventing American strategic dominance. The word is the same; the meaning is almost opposite." },
      { term: "Compatriots abroad", cyrillic: "\u0441\u043e\u043e\u0442\u0435\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a\u0438 \u0437\u0430 \u0440\u0443\u0431\u0435\u0436\u043e\u043c", western: "Russian diaspora", actual: "Ethnic Russians in former Soviet states who give us pretexts for intervention", example: "Russia's 2008 war with Georgia was partly justified by 'protecting' South Ossetian and Abkhaz populations with Russian passports. The 2014 Crimea operation invoked the need to protect ethnic Russians.", gap: "The 'compatriot' doctrine means Russia claims the right to intervene militarily in any country with a significant ethnic Russian population. This is not diaspora politics -- it is a standing casus belli against every former Soviet state." },
      { term: "Frozen conflict", cyrillic: "\u0437\u0430\u043c\u043e\u0440\u043e\u0436\u0435\u043d\u043d\u044b\u0439 \u043a\u043e\u043d\u0444\u043b\u0438\u043a\u0442", western: "Unresolved dispute", actual: "A lever we maintain to prevent former Soviet states from joining NATO/EU", example: "Transnistria (Moldova), South Ossetia and Abkhazia (Georgia), and Nagorno-Karabakh (until 2023) were all 'frozen conflicts' where Russian military presence prevented resolution -- and prevented the host countries from meeting NATO/EU membership criteria.", gap: "Frozen conflicts look like diplomatic failures. They are actually strategic successes from Moscow's perspective: they keep former Soviet states in a permanent gray zone, unable to fully integrate with Western institutions." },
      { term: "Active measures", cyrillic: "\u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u043c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f", western: "Covert operations", actual: "The full spectrum of political warfare: agents of influence, forgeries, front organizations, assassinations", example: "Soviet active measures included the 'Operation INFEKTION' campaign (1980s) that spread the claim AIDS was a US bioweapon. Modern equivalents include the Internet Research Agency's 2016 US election interference and the GRU's hack of the DNC.", gap: "Western intelligence agencies conduct covert operations too. The distinction is that Russian 'active measures' treat the entire political and information environment of target countries as a battlespace, not just specific intelligence targets." },
      { term: "Controlled chaos", cyrillic: "\u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c\u044b\u0439 \u0445\u0430\u043e\u0441", western: "Strategic confusion", actual: "We don't need to win -- we need you to be unable to form consensus", example: "Russian information operations around the 2016 US election and Brexit referendum did not aim to install a specific outcome. They aimed to deepen existing divisions, making coherent Western policy responses to Russian actions more difficult.", gap: "Analysts who look for a Russian 'preferred outcome' miss the point. The objective is often process disruption -- preventing your adversary from acting coherently -- rather than achieving a specific result." },
      { term: "Krysha", cyrillic: "\u043a\u0440\u044b\u0448\u0430", western: "Roof / protection", actual: "The protection racket that substitutes for rule of law", example: "In 1990s Russia, every business needed a krysha -- a protector who could be a criminal group, a corrupt police unit, or an FSB officer. The krysha resolved disputes, enforced contracts, and protected against competitors. Payment was mandatory.", gap: "Krysha is not corruption in the Western sense. It is an alternative governance system that emerged because the official legal system could not enforce property rights or contracts. Understanding this explains why 'anti-corruption' campaigns in Russia are about politics, not law." },
      { term: "Blat", cyrillic: "\u0431\u043b\u0430\u0442", western: "Connections / influence", actual: "The informal exchange network that is the real operating system of Russian society", example: "In the Soviet era, blat was how you obtained scarce goods, got your child into a good school, or secured a hospital bed. Post-Soviet, blat networks evolved into business relationships. The person who 'knows someone' is more valuable than the person who knows the rules.", gap: "Western institutions run on formal rules. Russian institutions run on personal relationships. Policies that assume rule-based behavior will consistently fail to predict Russian institutional outcomes." },
      { term: "Kompromat", cyrillic: "\u043a\u043e\u043c\u043f\u0440\u043e\u043c\u0430\u0442", western: "Compromising material", actual: "Not blackmail but MUTUAL ASSURED DESTRUCTION -- everyone has files on everyone", example: "The Russian system operates on mutual vulnerability. Everyone in the elite has compromising material on everyone else. This is not a bug -- it is the glue that holds the system together, ensuring that no one can defect without being destroyed.", gap: "Westerners see kompromat as a tool for coercion. Russians understand it as a system of mutual deterrence. This is why the system is so stable -- betrayal guarantees your own destruction." },
      { term: "Derzhavnost", cyrillic: "\u0434\u0435\u0440\u0436\u0430\u0432\u043d\u043e\u0441\u0442\u044c", western: "Great power status", actual: "Russia's civilizational self-concept as a great power -- not optional, not negotiable, existential", example: "Derzhavnost explains why Russia maintains a global military posture and UN Security Council veto despite an economy smaller than Italy's. Great-power status is not a policy choice -- it is an identity. Losing it would be psychologically equivalent to Russia ceasing to exist.", gap: "Western analysts who propose that Russia could become a 'normal country' like Germany or South Korea fundamentally misunderstand derzhavnost. Russia would rather be poor and powerful than rich and ordinary." },
      { term: "Zagranitza", cyrillic: "\u0437\u0430\u0433\u0440\u0430\u043d\u0438\u0446\u0430", western: "Foreign countries", actual: "Everything beyond Russia's borders -- simultaneously feared, admired, and despised", example: "The Russian relationship to 'abroad' is deeply ambivalent. Russian elites educate their children in London and buy property in Nice while denouncing Western decadence. This is not hypocrisy -- it is the genuine complexity of a civilization that has always defined itself partly in opposition to the West.", gap: "Understanding zagranitza as an emotional and civilizational concept -- not just a geographic one -- explains the seemingly contradictory behavior of Russian elites who condemn the West while living there." },
    ];

    var filtered = LEXICON.filter(function(entry) {
      if (!lexiconSearch.trim()) return true;
      var q = lexiconSearch.toLowerCase();
      return entry.term.toLowerCase().indexOf(q) !== -1 ||
             entry.actual.toLowerCase().indexOf(q) !== -1 ||
             entry.western.toLowerCase().indexOf(q) !== -1 ||
             entry.cyrillic.toLowerCase().indexOf(q) !== -1;
    });

    return React.createElement("div", { style: { marginTop: 12 } },
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } },
        "Strategic Lexicon Decoder"
      ),
      React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 20 } },
        "25 Russian strategic terms that mean something different from what Western audiences assume. Click any term to see the full analytical breakdown."
      ),

      // Search
      React.createElement("div", { style: { marginBottom: 20 } },
        React.createElement("input", {
          type: "text", value: lexiconSearch,
          onChange: function(e) { setLexiconSearch(e.target.value); setLexiconExpanded(null); },
          placeholder: "Search terms, meanings, or Cyrillic...",
          style: {
            width: "100%", boxSizing: "border-box", padding: "10px 14px", fontFamily: RU_Sans, fontSize: 13, color: RU_C.tx,
            background: "rgba(255,255,255,.06)", border: "1px solid " + RU_C.line, borderRadius: 4, outline: "none",
          },
        }),
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, marginTop: 4 } },
          filtered.length + " of " + LEXICON.length + " terms"
        )
      ),

      // Cards grid
      React.createElement("div", {
        style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 },
      },
        filtered.map(function(entry, idx) {
          var isExpanded = lexiconExpanded === entry.term;
          return React.createElement("div", {
            key: entry.term,
            onClick: function() { setLexiconExpanded(isExpanded ? null : entry.term); },
            style: {
              background: RU_C.card, border: "1px solid " + (isExpanded ? RU_C.gold : RU_C.line), borderRadius: 8,
              padding: 16, cursor: "pointer", transition: "border-color .2s",
              gridColumn: isExpanded ? "1 / -1" : "auto",
            },
          },
            // Header
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 } },
              React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 14, fontWeight: 700, color: RU_C.gold } }, entry.term),
              React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx3, fontStyle: "italic" } }, entry.cyrillic)
            ),
            // Western vs Actual compact
            React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: isExpanded ? 16 : 0 } },
              React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 9, fontWeight: 700, color: RU_C.tx3, letterSpacing: 0.5, marginBottom: 2 } }, "WESTERN HEARING"),
                React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, lineHeight: 1.5 } }, entry.western)
              ),
              React.createElement("div", { style: { width: 1, background: RU_C.line, alignSelf: "stretch" } }),
              React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 9, fontWeight: 700, color: RU_C.red, letterSpacing: 0.5, marginBottom: 2 } }, "ACTUAL MEANING"),
                React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx, lineHeight: 1.5, fontWeight: 500 } }, entry.actual)
              )
            ),
            // Expanded detail
            isExpanded && React.createElement("div", { style: { borderTop: "1px solid " + RU_C.line, paddingTop: 14, marginTop: 4 } },
              React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 10, fontWeight: 700, color: RU_C.bronze, letterSpacing: 0.5, marginBottom: 4 } }, "IN PRACTICE"),
              React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 14 } }, entry.example),
              React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 10, fontWeight: 700, color: RU_C.red, letterSpacing: 0.5, marginBottom: 4 } }, "WHY THE GAP MATTERS"),
              React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.7 } }, entry.gap)
            ),
            !isExpanded && React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 10, color: RU_C.tx3, marginTop: 8, fontStyle: "italic" } }, "Click to expand full analysis")
          );
        })
      )
    );
  }

  // ── INSTRUMENT: Pattern Break Detector ────────────────────
  function renderBreaks() {
    var PATTERNS = [
      {
        id: "escalate_weak",
        name: "Escalate when weak",
        desc: "Russia escalates externally when facing domestic pressure.",
        instances: [
          { year: 1905, label: "Manchuria", held: true },
          { year: 2008, label: "Georgia / financial crisis", held: true },
          { year: 2014, label: "Crimea / oil crash", held: true },
          { year: 2022, label: "Ukraine / ?", held: true },
        ],
        breakYear: 2004,
        breakLabel: "7 NATO countries joined; Russia barely responded despite being weak",
        breakWhy: "Russia was economically recovering and oil prices were rising. Putin calculated that confrontation over NATO expansion was unwinnable in 2004 and chose instead to consolidate domestically. The 'escalate when weak' pattern may actually be 'escalate when weak AND believe you can get away with it.'",
        breakMeaning: "The pattern is not mechanical. It requires both domestic pressure and a perceived window of opportunity. When Russia is weak but the adversary is strong and attentive, the pattern breaks.",
        range: [1900, 2026],
      },
      {
        id: "consolidate_crisis",
        name: "Consolidate after crisis",
        desc: "Every Russian crisis produces stronger centralization.",
        instances: [
          { year: 1917, label: "Revolution to Bolshevik dictatorship", held: true },
          { year: 1991, label: "Soviet collapse to Yeltsin super-presidency", held: true },
          { year: 1993, label: "Constitutional crisis to new Constitution", held: true },
          { year: 1999, label: "Apartment bombings to Putin", held: true },
          { year: 2022, label: "War to martial economy", held: true },
        ],
        breakYear: 1861,
        breakLabel: "Alexander II decentralized after Crimean War defeat",
        breakWhy: "The Crimean War defeat (1856) convinced Alexander II that Russia's backwardness required liberalization, not tightening. He emancipated the serfs, created elected local councils (zemstvos), reformed the judiciary, and introduced universal military service. This was genuine decentralization in response to crisis.",
        breakMeaning: "The consolidation-after-crisis pattern holds when elites perceive the crisis as caused by insufficient control. When elites perceive the crisis as caused by excessive rigidity, the opposite occurs. The critical variable is the elite's diagnosis of the crisis.",
        range: [1850, 2026],
      },
      {
        id: "security_terrorism",
        name: "Security services grow after terrorism",
        desc: "Each terrorist attack expands state security powers.",
        instances: [
          { year: 1881, label: "Alexander II assassination -> Okhrana expansion", held: true },
          { year: 1934, label: "Kirov assassination -> Great Purge", held: true },
          { year: 1999, label: "Apartment bombings -> Second Chechen War + Putin", held: true },
          { year: 2004, label: "Beslan -> abolished gubernatorial elections", held: true },
        ],
        breakYear: null,
        breakLabel: "This pattern has NEVER broken",
        breakWhy: "In every single instance across 140+ years, terrorism or political violence has led to expanded security powers. Not once has a terrorist attack in Russia led to liberalization, investigation of root causes, or restraint of security services. The ratchet only turns one way.",
        breakMeaning: "The unbroken nature of this pattern is itself the most important finding. It means any future terrorist attack or security crisis in Russia will almost certainly produce further securitization, regardless of the specifics.",
        range: [1870, 2026],
      },
      {
        id: "reform_reaction",
        name: "Reform then reaction",
        desc: "Every reformer is followed by a reactionary.",
        instances: [
          { year: 1855, label: "Alexander II (reform)", held: true },
          { year: 1881, label: "Alexander III (reaction)", held: true },
          { year: 1905, label: "Witte/Stolypin reforms", held: true },
          { year: 1917, label: "Revolutionary reaction", held: true },
          { year: 1956, label: "Khrushchev Thaw", held: true },
          { year: 1964, label: "Brezhnev stagnation", held: true },
          { year: 1985, label: "Gorbachev reform", held: true },
          { year: 2000, label: "Putin restoration", held: true },
        ],
        breakYear: 2008,
        breakLabel: "Putin -> Medvedev -> Putin was not reform -> reaction",
        breakWhy: "The Medvedev interregnum (2008-2012) superficially looked like the reform-reaction cycle. But Medvedev's 'reforms' were cosmetic, Putin retained real power, and the 'reaction' of Putin's return was pre-planned. This was a managed transition that mimicked the pattern without actually following it.",
        breakMeaning: "The pattern may have ended because the system has learned to simulate reform cycles without actually undergoing them. If the system can produce the appearance of reform-reaction without the substance, the pattern loses predictive power.",
        range: [1850, 2026],
      },
      {
        id: "allies_temporary",
        name: "Allies are temporary",
        desc: "Russia's alliances are always instrumental and disposable.",
        instances: [
          { year: 1807, label: "Tilsit treaty with Napoleon (abandoned 1812)", held: true },
          { year: 1939, label: "Molotov-Ribbentrop Pact (broken 1941)", held: true },
          { year: 1950, label: "Sino-Soviet alliance (split 1960s)", held: true },
          { year: 1955, label: "Warsaw Pact (collapsed 1989-91)", held: true },
        ],
        breakYear: 2022,
        breakLabel: "China relationship -- Russia has become genuinely dependent",
        breakWhy: "Post-2022 sanctions pushed Russia into unprecedented economic dependence on China. Russian oil exports to China doubled; Chinese goods replaced Western imports across sectors. Russia became China's junior partner -- a historically unprecedented asymmetry for Moscow.",
        breakMeaning: "If this pattern has truly broken, it means Russia's strategic autonomy -- the ability to switch alliances -- has been compromised. A dependent Russia is an analytically different actor from an independent Russia. Watch for signs of Russian resentment at Chinese leverage.",
        range: [1800, 2026],
      },
      {
        id: "nuclear_bluff",
        name: "Nuclear threats don't lead to use",
        desc: "Russia has threatened nuclear use many times without following through.",
        instances: [
          { year: 1956, label: "Suez crisis nuclear threats", held: true },
          { year: 1962, label: "Cuban missile crisis", held: true },
          { year: 1969, label: "Sino-Soviet border conflict", held: true },
          { year: 1983, label: "Able Archer scare", held: true },
          { year: 2014, label: "Crimea nuclear readiness", held: true },
          { year: 2022, label: "Ukraine invasion rhetoric", held: true },
        ],
        breakYear: null,
        breakLabel: "None yet -- but Ukraine war is most sustained nuclear rhetoric since Cuba 1962",
        breakWhy: "The pattern has held for 70 years, which creates a dangerous analytical complacency. The Ukraine conflict introduced new elements: sustained (not crisis-specific) nuclear rhetoric, tactical nuclear weapons moved to Belarus, and Medvedev's near-daily nuclear threats. The pattern may be under unprecedented stress even though it has not yet broken.",
        breakMeaning: "This is the most consequential pattern on the list. If it breaks, the consequences are catastrophic. The fact that it has never broken does NOT mean it cannot break. Analysts must resist the temptation to treat historical pattern-holding as a guarantee.",
        range: [1950, 2026],
      },
      {
        id: "sanctions_loyalty",
        name: "Elite loyalty holds under sanctions",
        desc: "Sanctions have never caused elite defection from the regime.",
        instances: [
          { year: 2012, label: "Magnitsky Act -- no defections", held: true },
          { year: 2014, label: "Crimea sanctions -- elites rallied", held: true },
          { year: 2018, label: "Skripal sanctions -- no cracks", held: true },
        ],
        breakYear: 2022,
        breakLabel: "Unprecedented oligarch capital flight and quiet distancing",
        breakWhy: "The 2022 sanctions were qualitatively different: SWIFT disconnection, central bank asset freeze ($300B), yacht seizures, and travel bans on hundreds of elites. Several oligarchs made rare public anti-war statements. Capital flight accelerated through UAE, Turkey, and Central Asia. Some billionaires quietly relocated families and assets.",
        breakMeaning: "The break is partial -- no elite has openly defected. But the quiet distancing is historically unprecedented. If sanctions pressure continues for years, the pattern may break further. Watch for: assassination of a defecting oligarch (would signal the system sees a real threat) or a public split.",
        range: [2010, 2026],
      },
      {
        id: "info_control",
        name: "Information control works domestically",
        desc: "The state has always controlled the domestic narrative.",
        instances: [
          { year: 1917, label: "Bolshevik press monopoly", held: true },
          { year: 1953, label: "Stalin's death managed messaging", held: true },
          { year: 1986, label: "Chernobyl -- delayed but eventually controlled", held: true },
          { year: 2000, label: "Putin media consolidation (NTV takeover)", held: true },
          { year: 2022, label: "War narrative -- blocked independent media", held: true },
        ],
        breakYear: 2011,
        breakLabel: "Social media enabled Bolotnaya protests that the state couldn't suppress through traditional media control",
        breakWhy: "The 2011-12 Bolotnaya protests were organized via social media (LiveJournal, VKontakte, Facebook) after fraudulent Duma elections. For the first time, the state could not control the domestic narrative through TV alone. Tens of thousands protested in Moscow. The state eventually prevailed through repression, not narrative control.",
        breakMeaning: "The state learned from this break and subsequently tightened internet controls (Sovereign Internet Law 2019, VPN restrictions, Telegram blocks). The pattern was restored through technological repression rather than narrative dominance. But each new communication technology creates a new window of vulnerability.",
        range: [1910, 2026],
      },
    ];

    var timelineMinYear = 1850;
    var timelineMaxYear = 2030;
    var barW = 700;
    var barH = 36;

    function yearToX(year) {
      return Math.round(((year - timelineMinYear) / (timelineMaxYear - timelineMinYear)) * barW);
    }

    return React.createElement("div", { style: { marginTop: 12 } },
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } },
        "Pattern Break Detector"
      ),
      React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 20 } },
        "Eight recurring Russian patterns shown as timelines. Green segments where the pattern held, red markers where it broke. Breaks reveal the conditions under which 'rules' stop working -- the most valuable analytical information."
      ),

      // Pattern list
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 } },
        PATTERNS.map(function(pat, pi) {
          var isSelected = breaksSelected === pat.id;
          var minY = pat.range[0];
          var maxY = pat.range[1];
          var localBarW = barW;
          function localX(year) {
            return Math.round(((year - minY) / (maxY - minY)) * localBarW);
          }

          return React.createElement("div", {
            key: pat.id,
            style: {
              background: RU_C.card, border: "1px solid " + (isSelected ? RU_C.gold : RU_C.line),
              borderRadius: 8, padding: 16, cursor: "pointer", transition: "border-color .2s",
            },
            onClick: function() { setBreaksSelected(isSelected ? null : pat.id); setBreaksBreakpoint(null); },
          },
            // Header
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } },
              React.createElement("div", null,
                React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 14, fontWeight: 700, color: RU_C.gold } }, pat.name),
                React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, marginTop: 2 } }, pat.desc)
              ),
              React.createElement("div", {
                style: {
                  padding: "3px 10px", borderRadius: 3, fontFamily: RU_Sans, fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                  color: "#fff", background: pat.breakYear ? RU_C.red : RU_C.green, whiteSpace: "nowrap",
                },
              }, pat.breakYear ? "BROKEN " + pat.breakYear : "UNBROKEN")
            ),

            // Timeline bar (SVG)
            React.createElement("div", { style: { overflowX: "auto", marginTop: 4, marginBottom: 4 } },
              React.createElement("svg", { viewBox: "0 0 " + localBarW + " " + barH, style: { width: "100%", maxWidth: localBarW, display: "block" } },
                // Background bar
                React.createElement("rect", { x: 0, y: 10, width: localBarW, height: 16, rx: 3, fill: "rgba(255,255,255,.04)" }),
                // Green segments for held instances
                pat.instances.map(function(inst, ii) {
                  var nextYear = ii < pat.instances.length - 1 ? pat.instances[ii + 1].year : maxY;
                  var x1 = localX(inst.year);
                  var x2 = localX(Math.min(nextYear, maxY));
                  return React.createElement("rect", {
                    key: "seg" + ii, x: x1, y: 10, width: Math.max(x2 - x1, 2), height: 16, rx: 2,
                    fill: inst.held ? "rgba(45,107,74,.35)" : "rgba(139,28,35,.35)",
                  });
                }),
                // Instance markers (green dots)
                pat.instances.map(function(inst, ii) {
                  return React.createElement("circle", {
                    key: "dot" + ii, cx: localX(inst.year), cy: 18, r: 4,
                    fill: RU_C.green, stroke: RU_C.card, strokeWidth: 1.5,
                  });
                }),
                // Break marker (red diamond)
                pat.breakYear && React.createElement("g", { key: "break",
                  onClick: function(e) { e.stopPropagation(); setBreaksSelected(pat.id); setBreaksBreakpoint(pat.id); },
                  style: { cursor: "pointer" },
                },
                  React.createElement("path", {
                    d: "M" + localX(pat.breakYear) + " 8 l6 10 l-6 10 l-6 -10 Z",
                    fill: RU_C.red, stroke: "#fff", strokeWidth: 1,
                  })
                ),
                // Year labels
                React.createElement("text", { x: 2, y: 8, fontFamily: RU_Sans, fontSize: 8, fill: RU_C.tx3 }, String(minY)),
                React.createElement("text", { x: localBarW - 2, y: 8, fontFamily: RU_Sans, fontSize: 8, fill: RU_C.tx3, textAnchor: "end" }, String(maxY))
              )
            ),

            // Instance labels (compact)
            React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 } },
              pat.instances.map(function(inst, ii) {
                return React.createElement("div", {
                  key: ii, style: { fontFamily: RU_Sans, fontSize: 10, color: RU_C.tx3, padding: "2px 6px",
                    background: "rgba(45,107,74,.1)", borderRadius: 3 },
                }, inst.year + ": " + inst.label);
              }),
              pat.breakYear && React.createElement("div", {
                style: { fontFamily: RU_Sans, fontSize: 10, color: "#fff", padding: "2px 6px",
                  background: "rgba(139,28,35,.4)", borderRadius: 3, fontWeight: 600 },
              }, "BREAK " + pat.breakYear + ": " + pat.breakLabel)
            ),

            // Expanded break analysis
            isSelected && React.createElement("div", {
              style: { borderTop: "1px solid " + RU_C.line, paddingTop: 14, marginTop: 12 },
              onClick: function(e) { e.stopPropagation(); },
            },
              React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: pat.breakYear ? RU_C.red : RU_C.green, letterSpacing: 0.5, marginBottom: 6 } },
                pat.breakYear ? "WHY THE PATTERN BROKE" : "WHY THIS PATTERN HAS NEVER BROKEN"
              ),
              React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 14 } }, pat.breakWhy),
              React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.bronze, letterSpacing: 0.5, marginBottom: 6 } }, "WHAT IT MEANS FOR THE PATTERN'S PREDICTIVE POWER"),
              React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.7 } }, pat.breakMeaning)
            )
          );
        })
      ),

      // Analyst's Question
      React.createElement("div", {
        style: {
          background: "rgba(212,168,71,.06)", border: "1px solid rgba(212,168,71,.2)", borderRadius: 8,
          padding: 20, textAlign: "center",
        },
      },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.gold, letterSpacing: 1, marginBottom: 8 } }, "ANALYST'S QUESTION"),
        React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 15, color: RU_C.tx, lineHeight: 1.7, fontStyle: "italic" } },
          "Which patterns are currently under the most stress? Where should you watch for the next break? The patterns that have never broken (security ratchet, nuclear restraint) are the ones where a break would be most consequential -- and where analytical complacency is most dangerous."
        )
      )
    );
  }

  // ── Progress bar (timeline mode) ─────────────────────────
  var progressBar = mode === "timeline" ? React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      marginBottom: 20,
    },
  },
    TURNING_POINTS.map(function(tp, i) {
      return React.createElement("div", {
        key: tp.id,
        onClick: function() { setActiveTP(i); },
        style: {
          flex: 1,
          height: 4,
          borderRadius: 2,
          cursor: "pointer",
          background: i <= activeTP ? RU_C.gold : RU_C.line,
          transition: "background .3s",
        },
        title: tp.num + " " + tp.title,
      });
    })
  ) : null;

  // ── Assemble ─────────────────────────────────────────────
  // Cyrillic marginalia along left edge
  var marginalia = React.createElement("div", {
    style: {
      position: "fixed", left: 6, top: "50%", transform: "translateY(-50%) rotate(-90deg)",
      fontFamily: "'Times New Roman', serif", fontSize: 13, color: "rgba(140,110,40,.15)",
      letterSpacing: "0.3em", whiteSpace: "nowrap", pointerEvents: "none", zIndex: 1,
    },
  }, RU_MARGINALIA.join("  \u2022  "));

  // Right-edge marginalia (extended Cyrillic phrases)
  var marginaliaR = React.createElement("div", {
    style: {
      position: "fixed", right: 6, top: "50%", transform: "translateY(-50%) rotate(90deg)",
      fontFamily: "'Times New Roman', serif", fontSize: 13, color: "rgba(140,110,40,.15)",
      letterSpacing: "0.3em", whiteSpace: "nowrap", pointerEvents: "none", zIndex: 1,
    },
  }, RU_MARGINALIA_EXT.concat(RU_MARGINALIA.slice().reverse()).join("  \u2022  "));

  // Snow animation CSS (injected once)
  var snowStyleId = "ru-snow-style";
  useEffect(function() {
    if (document.getElementById(snowStyleId)) return;
    var style = document.createElement("style");
    style.id = snowStyleId;
    style.textContent = "@keyframes ruSnowFall{0%{transform:translateY(-10px) translateX(0)}25%{transform:translateY(25vh) translateX(30px)}50%{transform:translateY(50vh) translateX(-15px)}75%{transform:translateY(75vh) translateX(25px)}100%{transform:translateY(100vh) translateX(-10px)}}@keyframes ruSnowDrift{0%{transform:translateY(-10px) translateX(0)}20%{transform:translateY(20vh) translateX(50px)}40%{transform:translateY(40vh) translateX(-20px)}60%{transform:translateY(60vh) translateX(40px)}80%{transform:translateY(80vh) translateX(-10px)}100%{transform:translateY(100vh) translateX(30px)}}";
    document.head.appendChild(style);
    return function() { var el = document.getElementById(snowStyleId); if (el) el.remove(); };
  }, []);

  // Generate snow particles
  var snowParticles = useMemo(function() {
    var particles = [];
    for (var i = 0; i < 40; i++) {
      var size = 1.5 + Math.random() * 2.5;
      var left = Math.random() * 100;
      var delay = Math.random() * 12;
      var duration = 8 + Math.random() * 10;
      var opacity = 0.15 + Math.random() * 0.25;
      var anim = i % 3 === 0 ? "ruSnowDrift" : "ruSnowFall";
      particles.push(React.createElement("div", {
        key: "snow" + i,
        style: {
          position: "fixed", top: -10, left: left + "%",
          width: size, height: size, borderRadius: "50%",
          background: "#c8b890", opacity: opacity * 0.5,
          animation: anim + " " + duration + "s linear " + delay + "s infinite",
          pointerEvents: "none", zIndex: 2,
        },
      }));
    }
    return particles;
  }, []);

  // ── COMPARE: Structured Comparison Engine (20 events) ─────────────
  var COMPARE_EVENTS = [
    { name: "Decembrist Revolt", year: 1825, trigger: "Succession crisis after Alexander I death", actors: "Liberal army officers, Nicholas I", factionalShift: "Conservatives consolidate, reformers purged", domesticImpact: "Decades of reactionary rule under Nicholas I", internationalReaction: "European liberals sympathize, governments relieved", unintended: "Created revolutionary martyr mythology", resolution: "Military suppression within hours", pattern: "Elite fracture" },
    { name: "Emancipation of Serfs", year: 1861, trigger: "Crimean War defeat exposed backwardness", actors: "Alexander II, landed nobility, peasant communes", factionalShift: "Reform faction temporarily ascendant", domesticImpact: "23 million freed but land terms punitive", internationalReaction: "Western approval, parallels to US abolition", unintended: "Created land-hungry peasantry fueling future revolution", resolution: "Imperial decree with 49-year redemption payments", pattern: "Top-down reform" },
    { name: "Alexander II Assassination", year: 1881, trigger: "Narodnaya Volya campaign of terror", actors: "People's Will terrorists, Alexander II, Alexander III", factionalShift: "Reformers discredited, reactionaries triumphant", domesticImpact: "Loris-Melikov constitution shelved, counter-reforms", internationalReaction: "Horror at regicide, sympathy for autocracy", unintended: "Delayed constitutionalism by 25 years", resolution: "Assassins executed, reaction entrenched", pattern: "Violent disruption" },
    { name: "Bloody Sunday", year: 1905, trigger: "Russo-Japanese War losses, worker grievances", actors: "Father Gapon, workers, Nicholas II, troops", factionalShift: "Popular monarchism destroyed overnight", domesticImpact: "1905 Revolution, October Manifesto, first Duma", internationalReaction: "International condemnation, socialist solidarity", unintended: "Created revolutionary template for 1917", resolution: "Constitutional concessions then retraction", pattern: "Mass mobilization" },
    { name: "February Revolution", year: 1917, trigger: "WWI losses, bread shortages, war exhaustion", actors: "Petrograd workers, soldiers, Duma liberals", factionalShift: "Monarchy collapses, power vacuum between Duma and Soviet", domesticImpact: "Provisional Government, dual power paralysis", internationalReaction: "Allied relief at potential democratic ally", unintended: "Power vacuum enabled Bolshevik seizure", resolution: "Nicholas II abdication", pattern: "Regime collapse" },
    { name: "October Revolution", year: 1917, trigger: "Provisional Government failure, Bolshevik organization", actors: "Lenin, Trotsky, Bolshevik party, Red Guards", factionalShift: "All non-Bolshevik factions eliminated within years", domesticImpact: "Civil war, War Communism, Red Terror", internationalReaction: "Western intervention, global communist movement born", unintended: "Created totalitarian state template", resolution: "Bolshevik seizure of Winter Palace", pattern: "Revolutionary seizure" },
    { name: "Stalin's Great Purge", year: 1937, trigger: "Stalin's paranoia, Kirov assassination pretext", actors: "Stalin, NKVD (Yezhov), Old Bolsheviks, military", factionalShift: "All independent power centers destroyed", domesticImpact: "750,000 executed, millions imprisoned, army decapitated", internationalReaction: "Western leftists divided, show trials debated", unintended: "Military weakness exposed in 1941", resolution: "Yezhov replaced by Beria, purge wound down", pattern: "Internal terror" },
    { name: "Khrushchev's Secret Speech", year: 1956, trigger: "Post-Stalin succession, de-Stalinization pressure", actors: "Khrushchev, CPSU delegates, ghost of Stalin", factionalShift: "Stalinists weakened but not eliminated", domesticImpact: "Thaw in culture, limited rehabilitation of victims", internationalReaction: "Hungarian Revolution, Sino-Soviet split begins", unintended: "Delegitimized Soviet system's founding violence", resolution: "Controlled denunciation preserving party rule", pattern: "Controlled disclosure" },
    { name: "Prague Spring Invasion", year: 1968, trigger: "Dubcek's socialism with a human face", actors: "Warsaw Pact forces, Czechoslovak reformers, Brezhnev", factionalShift: "Hardliners vindicated, Brezhnev Doctrine established", domesticImpact: "Dissent crushed, stagnation normalized", internationalReaction: "Western condemnation, Eurocommunism diverges", unintended: "Killed reform communism as viable path", resolution: "Military occupation, normalization", pattern: "External suppression" },
    { name: "Afghanistan Invasion", year: 1979, trigger: "PDPA instability, Cold War logic, Brezhnev circle", actors: "Soviet military, Afghan factions, CIA-backed mujahideen", factionalShift: "Military-industrial complex empowered then discredited", domesticImpact: "15,000 Soviet dead, veterans' disillusionment", internationalReaction: "US boycott Olympics, sanctions, arms to rebels", unintended: "Accelerated Soviet collapse, created jihadist networks", resolution: "Withdrawal under Gorbachev 1989", pattern: "Imperial overreach" },
    { name: "August 1991 Coup", year: 1991, trigger: "Gorbachev's Union Treaty threatened hardliners", actors: "GKChP plotters, Yeltsin, military units, Gorbachev", factionalShift: "Communist hardliners destroyed, Yeltsin ascendant", domesticImpact: "USSR dissolution, 15 independent states", internationalReaction: "Western celebration, rapid diplomatic recognition", unintended: "Chaotic transition created oligarch class", resolution: "Coup collapsed in 3 days, Yeltsin on tank", pattern: "Elite fracture" },
    { name: "Yeltsin's Tank", year: 1993, trigger: "Constitutional crisis, parliament vs president", actors: "Yeltsin, Rutskoy, Khasbulatov, military", factionalShift: "Presidential power consolidated, parliament marginalized", domesticImpact: "New constitution with super-presidential powers", internationalReaction: "West backed Yeltsin despite democratic concerns", unintended: "Created constitutional framework Putin later exploited", resolution: "Military shelled parliament building", pattern: "Violent disruption" },
    { name: "First Chechen War", year: 1994, trigger: "Chechen independence declaration, Yeltsin's weakness", actors: "Russian military, Dudayev's forces, Chechen civilians", factionalShift: "Military humiliated, hawks demand revenge", domesticImpact: "Massive casualties, Khasavyurt peace deal", internationalReaction: "International criticism of Russian methods", unintended: "Set stage for Second Chechen War and Putin's rise", resolution: "Ceasefire 1996, de facto Chechen independence", pattern: "Imperial overreach" },
    { name: "Khodorkovsky Arrest", year: 2003, trigger: "Khodorkovsky funded opposition, challenged Putin", actors: "Putin, FSB, Khodorkovsky, Yukos shareholders", factionalShift: "Oligarchs subordinated to state, siloviki dominant", domesticImpact: "Business elite learned submission or exile", internationalReaction: "Western investors alarmed, rule of law questioned", unintended: "Renationalization of energy sector, capital flight", resolution: "Show trial, 10-year sentence, Yukos dismantled", pattern: "Consolidation" },
    { name: "Georgia War", year: 2008, trigger: "South Ossetia conflict, NATO expansion fears", actors: "Russian military, Saakashvili, separatist proxies", factionalShift: "Military modernization advocates empowered", domesticImpact: "Patriotic rally effect, Medvedev sidelined", internationalReaction: "Brief Western outrage, reset policy followed", unintended: "Tested Western response limits for future actions", resolution: "5-day war, Russian recognition of breakaway regions", pattern: "External aggression" },
    { name: "Crimea Annexation", year: 2014, trigger: "Ukraine Euromaidan, Yanukovych flight", actors: "Putin, little green men, Crimean population, Ukraine", factionalShift: "Hawks fully dominant, liberals marginalized", domesticImpact: "89% approval rating, patriotic mobilization", internationalReaction: "Sanctions, G8 expulsion, NATO reinforcement", unintended: "Locked Russia into confrontation trajectory", resolution: "Referendum under occupation, formal annexation", pattern: "External aggression" },
    { name: "Navalny Poisoning", year: 2020, trigger: "Navalny's anti-corruption investigations threatened elite", actors: "FSB operatives, Navalny, Bellingcat investigators", factionalShift: "Security services demonstrated impunity", domesticImpact: "Protests suppressed, opposition organizations banned", internationalReaction: "EU sanctions, diplomatic expulsions", unintended: "Bellingcat exposure humiliated FSB tradecraft", resolution: "Navalny imprisoned on return, died in custody 2024", pattern: "Internal terror" },
    { name: "Ukraine Invasion", year: 2022, trigger: "NATO expansion fears, imperial ambition, intelligence failure", actors: "Putin, Russian military, Ukraine, NATO allies", factionalShift: "War economy empowers military-industrial complex", domesticImpact: "Mobilization, brain drain, war economy", internationalReaction: "Unprecedented sanctions, NATO unity, arms to Ukraine", unintended: "NATO expansion (Finland, Sweden), Russian isolation", resolution: "Ongoing conflict, attritional warfare", pattern: "Imperial overreach" },
    { name: "Prigozhin Mutiny", year: 2023, trigger: "Wagner-MoD rivalry, ammunition disputes", actors: "Prigozhin, Wagner forces, Shoigu, Putin, Lukashenko", factionalShift: "PMC model discredited, MoD temporarily strengthened", domesticImpact: "Exposed cracks in Putin's authority narrative", internationalReaction: "Western surprise, reassessment of stability", unintended: "Demonstrated fragility of vertical power", resolution: "Deal brokered by Lukashenko, Prigozhin killed 2 months later", pattern: "Elite fracture" },
    { name: "Shoigu Removal", year: 2024, trigger: "Military underperformance, corruption scandals", actors: "Putin, Shoigu, Belousov (replacement), military brass", factionalShift: "Technocratic war management over loyalist incompetence", domesticImpact: "Signal of wartime efficiency prioritization", internationalReaction: "Analysts debated whether reform or purge", unintended: "Acknowledged war not going to plan", resolution: "Shoigu moved to Security Council, Belousov appointed", pattern: "Consolidation" },
  ];
  var COMPARE_DIMS = ["trigger", "actors", "factionalShift", "domesticImpact", "internationalReaction", "unintended", "resolution", "pattern"];
  var COMPARE_DIM_LABELS = { trigger: "TRIGGER", actors: "KEY ACTORS", factionalShift: "FACTIONAL SHIFT", domesticImpact: "DOMESTIC IMPACT", internationalReaction: "INTERNATIONAL REACTION", unintended: "UNINTENDED CONSEQUENCES", resolution: "RESOLUTION", pattern: "PATTERN CATEGORY" };

  function computeSimilarity(a, b) {
    if (a === b) return { score: 100, matches: COMPARE_DIMS.length, dimScores: {}, keyDiff: "Identical events selected" };
    var evA = COMPARE_EVENTS[a]; var evB = COMPARE_EVENTS[b];
    var matches = 0; var dimScores = {};
    COMPARE_DIMS.forEach(function(d) {
      var match = false;
      if (d === "pattern") { match = evA.pattern === evB.pattern; }
      else {
        var wordsA = evA[d].toLowerCase().split(/\s+/);
        var wordsB = evB[d].toLowerCase().split(/\s+/);
        var shared = 0;
        wordsA.forEach(function(w) { if (w.length > 3 && wordsB.indexOf(w) !== -1) shared++; });
        match = shared >= 2 || (d === "factionalShift" && evA[d].toLowerCase().indexOf("consolidat") !== -1 && evB[d].toLowerCase().indexOf("consolidat") !== -1);
      }
      dimScores[d] = match;
      if (match) matches++;
    });
    var keyDiff = "No significant divergence";
    for (var i = 0; i < COMPARE_DIMS.length; i++) {
      if (!dimScores[COMPARE_DIMS[i]]) {
        keyDiff = COMPARE_DIM_LABELS[COMPARE_DIMS[i]] + ": \"" + evA[COMPARE_DIMS[i]].substring(0, 80) + "\" vs. \"" + evB[COMPARE_DIMS[i]].substring(0, 80) + "\"";
        break;
      }
    }
    return { score: Math.round((matches / COMPARE_DIMS.length) * 100), matches: matches, dimScores: dimScores, keyDiff: keyDiff };
  }

  function renderCompare() {
    var evA = COMPARE_EVENTS[compareEventA];
    var evB = COMPARE_EVENTS[compareEventB];
    var sim = computeSimilarity(compareEventA, compareEventB);
    var selectStyle = { padding: "8px 12px", fontFamily: RU_Sans, fontSize: 13, background: RU_C.card, color: RU_C.tx, border: "1px solid " + RU_C.line, borderRadius: 4, cursor: "pointer", maxWidth: 320 };

    return React.createElement("div", { style: { marginTop: 12 } },
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } }, "Structured Comparison Engine"),
      React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 20 } },
        "Select two events from Russian political history. The engine compares them across 8 analytical dimensions and computes a structural similarity score based on pattern matching."
      ),
      // Event selectors
      React.createElement("div", { style: { display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" } },
        React.createElement("div", null,
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.gold, marginBottom: 6, letterSpacing: 1 } }, "EVENT A"),
          React.createElement("select", { value: compareEventA, onChange: function(e) { setCompareEventA(Number(e.target.value)); }, style: selectStyle },
            COMPARE_EVENTS.map(function(ev, i) { return React.createElement("option", { key: i, value: i, style: { background: "#1a0f12", color: RU_C.tx } }, ev.year + " -- " + ev.name); })
          )
        ),
        React.createElement("div", null,
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.gold, marginBottom: 6, letterSpacing: 1 } }, "EVENT B"),
          React.createElement("select", { value: compareEventB, onChange: function(e) { setCompareEventB(Number(e.target.value)); }, style: selectStyle },
            COMPARE_EVENTS.map(function(ev, i) { return React.createElement("option", { key: i, value: i, style: { background: "#1a0f12", color: RU_C.tx } }, ev.year + " -- " + ev.name); })
          )
        )
      ),
      // Similarity score banner
      React.createElement("div", { style: { background: sim.score > 60 ? "rgba(212,168,71,.12)" : sim.score > 30 ? "rgba(45,107,74,.08)" : "rgba(139,28,35,.08)", border: "1px solid " + (sim.score > 60 ? "rgba(212,168,71,.3)" : sim.score > 30 ? "rgba(45,107,74,.2)" : "rgba(139,28,35,.2)"), borderRadius: 8, padding: 20, marginBottom: 24, textAlign: "center" } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1.5, marginBottom: 8 } }, "STRUCTURAL SIMILARITY SCORE"),
        React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 48, fontWeight: 700, color: sim.score > 60 ? RU_C.gold : sim.score > 30 ? RU_C.green : RU_C.red, marginBottom: 8 } }, sim.score + "%"),
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx2 } }, sim.matches + " of " + COMPARE_DIMS.length + " dimensions match"),
        React.createElement("div", { style: { width: "60%", margin: "12px auto 0", height: 6, background: "rgba(255,255,255,.05)", borderRadius: 3, overflow: "hidden" } },
          React.createElement("div", { style: { width: sim.score + "%", height: "100%", background: sim.score > 60 ? RU_C.gold : sim.score > 30 ? RU_C.green : RU_C.red, borderRadius: 3, transition: "width .4s" } })
        )
      ),
      // Side-by-side comparison table
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, overflow: "hidden", marginBottom: 24 } },
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "160px 1fr 1fr", borderBottom: "1px solid " + RU_C.line } },
          React.createElement("div", { style: { padding: "12px 16px", fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1 } }, "DIMENSION"),
          React.createElement("div", { style: { padding: "12px 16px", fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.gold, letterSpacing: 0.5, borderLeft: "1px solid " + RU_C.line } }, evA.name + " (" + evA.year + ")"),
          React.createElement("div", { style: { padding: "12px 16px", fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.gold, letterSpacing: 0.5, borderLeft: "1px solid " + RU_C.line } }, evB.name + " (" + evB.year + ")")
        ),
        COMPARE_DIMS.map(function(dim, i) {
          var isMatch = sim.dimScores && sim.dimScores[dim];
          return React.createElement("div", { key: dim, style: { display: "grid", gridTemplateColumns: "160px 1fr 1fr", borderBottom: i < COMPARE_DIMS.length - 1 ? "1px solid " + RU_C.line : "none", background: isMatch ? "rgba(45,107,74,.06)" : "transparent" } },
            React.createElement("div", { style: { padding: "10px 16px", fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: isMatch ? RU_C.green : RU_C.tx3, letterSpacing: 0.5, display: "flex", alignItems: "center", gap: 6 } },
              React.createElement("span", { style: { fontSize: 10 } }, isMatch ? "[MATCH]" : ""),
              COMPARE_DIM_LABELS[dim]
            ),
            React.createElement("div", { style: { padding: "10px 16px", fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, lineHeight: 1.6, borderLeft: "1px solid " + RU_C.line } }, evA[dim]),
            React.createElement("div", { style: { padding: "10px 16px", fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, lineHeight: 1.6, borderLeft: "1px solid " + RU_C.line } }, evB[dim])
          );
        })
      ),
      // Key difference callout
      React.createElement("div", { style: { background: "rgba(139,28,35,.08)", border: "1px solid rgba(139,28,35,.2)", borderRadius: 6, padding: 16, marginBottom: 20 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.red, letterSpacing: 1, marginBottom: 6 } }, "KEY DIVERGENCE"),
        React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.6 } }, sim.keyDiff)
      ),
      // Pattern category legend
      React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1, marginBottom: 8 } }, "PATTERN CATEGORIES IN DATABASE"),
      React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 } },
        ["Elite fracture", "Top-down reform", "Violent disruption", "Mass mobilization", "Regime collapse", "Revolutionary seizure", "Internal terror", "Controlled disclosure", "External suppression", "Imperial overreach", "Consolidation", "External aggression"].map(function(p) {
          var count = COMPARE_EVENTS.filter(function(e) { return e.pattern === p; }).length;
          if (count === 0) return null;
          return React.createElement("span", { key: p, style: { padding: "4px 10px", background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 4, fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx2 } }, p + " (" + count + ")");
        })
      )
    );
  }

  // ── CORRELATE: Multi-Variable Correlation Dashboard ─────────────
  var CORR_YEARS = [];
  for (var cy = 2000; cy <= 2024; cy++) CORR_YEARS.push(cy);
  var CORR_DATA = {
    oil:        [25,22,24,28,38,55,65,72,100,62,80,110,112,108,99,52,43,54,72,64,42,71,100,82,78],
    sanctions:  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,35,40,40,40,40,40,42,42,90,92,88],
    military:   [30,32,34,36,38,38,40,42,44,48,42,44,48,52,54,60,62,58,56,58,62,64,72,76,78],
    protest:    [5,5,5,5,5,5,5,5,5,5,8,55,60,15,10,8,12,40,10,12,70,15,5,3,3],
    aggression: [5,5,5,5,5,5,5,5,65,10,8,8,8,8,80,55,55,50,50,50,50,50,100,85,80],
  };
  var CORR_OIL_NORM = CORR_DATA.oil.map(function(v) { return Math.round(v / 1.12); });
  var CORR_COLORS = { oil: "#d4a847", sanctions: "#8b1c23", military: "#1a5c88", protest: "#2d6b4a", aggression: "#b05020" };
  var CORR_LABELS = { oil: "Oil Price ($/bbl)", sanctions: "Sanctions Pressure", military: "Military Spending", protest: "Protest Activity", aggression: "External Aggression" };
  var CORR_EVENTS_MARKERS = [
    { year: 2008, label: "Georgia" }, { year: 2011, label: "Bolotnaya" },
    { year: 2014, label: "Crimea" }, { year: 2015, label: "Syria" }, { year: 2022, label: "Ukraine" },
  ];

  function corrGetNorm(key) { return key === "oil" ? CORR_OIL_NORM : CORR_DATA[key]; }

  function corrPearson(xs, ys) {
    var n = xs.length; if (n < 3) return 0;
    var sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    for (var i = 0; i < n; i++) { sumX += xs[i]; sumY += ys[i]; sumXY += xs[i]*ys[i]; sumX2 += xs[i]*xs[i]; sumY2 += ys[i]*ys[i]; }
    var denom = Math.sqrt((n*sumX2 - sumX*sumX) * (n*sumY2 - sumY*sumY));
    return denom === 0 ? 0 : (n*sumXY - sumX*sumY) / denom;
  }

  function renderCorrelate() {
    var svgW = 800, svgH = 400, padL = 60, padR = 20, padT = 30, padB = 50;
    var chartW = svgW - padL - padR, chartH = svgH - padT - padB;
    var nYears = CORR_YEARS.length;
    var keys = Object.keys(CORR_DATA);
    var activeKeys = keys.filter(function(k) { return corrToggles[k]; });
    function yearX(yr) { return padL + ((yr - 2000) / 24) * chartW; }
    function valY(v) { return padT + chartH - (v / 100) * chartH; }
    var rangeActive = corrRangeStart !== null && corrRangeEnd !== null && corrRangeStart !== corrRangeEnd;
    var rS = rangeActive ? Math.min(corrRangeStart, corrRangeEnd) : null;
    var rE = rangeActive ? Math.max(corrRangeStart, corrRangeEnd) : null;
    var corrMatrix = [];
    if (rangeActive) {
      var idxS = rS - 2000; var idxE = rE - 2000;
      for (var ai = 0; ai < activeKeys.length; ai++) {
        for (var bi = ai + 1; bi < activeKeys.length; bi++) {
          var r = corrPearson(corrGetNorm(activeKeys[ai]).slice(idxS, idxE + 1), corrGetNorm(activeKeys[bi]).slice(idxS, idxE + 1));
          corrMatrix.push({ a: activeKeys[ai], b: activeKeys[bi], r: r });
        }
      }
    }
    function handleYearClick(yr) {
      if (corrRangeStart === null || (corrRangeStart !== null && corrRangeEnd !== null)) { setCorrRangeStart(yr); setCorrRangeEnd(null); }
      else { setCorrRangeEnd(yr); }
    }

    return React.createElement("div", { style: { marginTop: 12 } },
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } }, "Multi-Variable Correlation Dashboard"),
      React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 16 } },
        "Five variables tracked across Putin-era Russia (2000-2024), normalized to a 0-100 scale. Toggle variables on/off. Click a year to set analysis window start, click another to set end. The tool computes pairwise Pearson correlations within your selected window."
      ),
      // Toggle buttons
      React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 } },
        keys.map(function(k) {
          var active = corrToggles[k];
          return React.createElement("button", {
            key: k,
            onClick: function() { var next = Object.assign({}, corrToggles); next[k] = !next[k]; setCorrToggles(next); },
            style: { padding: "6px 14px", fontFamily: RU_Sans, fontSize: 12, fontWeight: active ? 700 : 400, background: active ? CORR_COLORS[k] + "22" : "transparent", color: active ? CORR_COLORS[k] : RU_C.tx3, border: "1px solid " + (active ? CORR_COLORS[k] : RU_C.line), borderRadius: 4, cursor: "pointer" }
          }, (active ? "[ON] " : "[OFF] ") + CORR_LABELS[k]);
        })
      ),
      // SVG Chart
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 16, marginBottom: 20, overflowX: "auto" } },
        React.createElement("svg", { viewBox: "0 0 " + svgW + " " + svgH, style: { width: "100%", maxWidth: svgW } },
          // Grid lines
          [0, 25, 50, 75, 100].map(function(v) {
            return React.createElement("g", { key: "grid" + v },
              React.createElement("line", { x1: padL, y1: valY(v), x2: svgW - padR, y2: valY(v), stroke: "rgba(255,255,255,.06)", strokeWidth: 0.5 }),
              React.createElement("text", { x: padL - 8, y: valY(v) + 4, textAnchor: "end", fill: RU_C.tx3, fontFamily: RU_Sans, fontSize: 9 }, String(v))
            );
          }),
          // Year labels
          CORR_YEARS.filter(function(yr) { return yr % 4 === 0; }).map(function(yr) {
            return React.createElement("text", { key: "yl" + yr, x: yearX(yr), y: svgH - 8, textAnchor: "middle", fill: RU_C.tx3, fontFamily: RU_Sans, fontSize: 9 }, String(yr));
          }),
          // Clickable year columns
          CORR_YEARS.map(function(yr) {
            var isInRange = rangeActive && yr >= rS && yr <= rE;
            var isEndpoint = yr === corrRangeStart || yr === corrRangeEnd;
            return React.createElement("rect", {
              key: "ycol" + yr, x: yearX(yr) - (chartW / nYears / 2), y: padT, width: chartW / nYears, height: chartH,
              fill: isEndpoint ? "rgba(212,168,71,.2)" : isInRange ? "rgba(212,168,71,.08)" : "transparent",
              style: { cursor: "pointer" }, onClick: function() { handleYearClick(yr); },
            });
          }),
          // Event markers
          CORR_EVENTS_MARKERS.map(function(ev) {
            return React.createElement("g", { key: "evmk" + ev.year },
              React.createElement("line", { x1: yearX(ev.year), y1: padT, x2: yearX(ev.year), y2: padT + chartH, stroke: "rgba(139,28,35,.4)", strokeWidth: 1, strokeDasharray: "4,3" }),
              React.createElement("text", { x: yearX(ev.year), y: padT - 6, textAnchor: "middle", fill: RU_C.red, fontFamily: RU_Sans, fontSize: 8, fontWeight: 600 }, ev.label)
            );
          }),
          // Data lines
          activeKeys.map(function(k) {
            var norm = corrGetNorm(k);
            var pts = norm.map(function(v, i) { return yearX(2000 + i) + "," + valY(v); }).join(" ");
            return React.createElement("polyline", { key: "line" + k, points: pts, fill: "none", stroke: CORR_COLORS[k], strokeWidth: 2, strokeLinejoin: "round" });
          }),
          // Data points
          activeKeys.map(function(k) {
            var norm = corrGetNorm(k);
            return norm.map(function(v, i) {
              return React.createElement("circle", { key: "pt" + k + i, cx: yearX(2000 + i), cy: valY(v), r: 2.5, fill: CORR_COLORS[k], stroke: RU_C.card, strokeWidth: 1 });
            });
          }),
          // Range labels
          corrRangeStart !== null && React.createElement("text", { x: yearX(corrRangeStart), y: padT + chartH + 22, textAnchor: "middle", fill: RU_C.gold, fontFamily: RU_Sans, fontSize: 10, fontWeight: 700 }, String(corrRangeStart)),
          corrRangeEnd !== null && React.createElement("text", { x: yearX(corrRangeEnd), y: padT + chartH + 22, textAnchor: "middle", fill: RU_C.gold, fontFamily: RU_Sans, fontSize: 10, fontWeight: 700 }, String(corrRangeEnd))
        ),
        React.createElement("div", { style: { textAlign: "center", fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, fontStyle: "italic", marginTop: 8 } },
          corrRangeStart !== null && corrRangeEnd === null ? "Click another year to set analysis window end" : "Click a year to set analysis window start"
        )
      ),
      // Correlation matrix
      rangeActive && React.createElement("div", { style: { background: "rgba(212,168,71,.06)", border: "1px solid rgba(212,168,71,.15)", borderRadius: 8, padding: 20, marginBottom: 20 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 13, fontWeight: 700, color: RU_C.gold, marginBottom: 12 } }, "CORRELATION ANALYSIS: " + rS + " -- " + rE + " (" + (rE - rS + 1) + " years)"),
        corrMatrix.length === 0 && React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx3 } }, "Enable at least 2 variables to see correlations."),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 } },
          corrMatrix.map(function(cm) {
            var rAbs = Math.abs(cm.r);
            var strength = rAbs > 0.7 ? "Strong" : rAbs > 0.4 ? "Moderate" : "Weak";
            var direction = cm.r > 0 ? "positive" : "negative";
            var barColor = cm.r > 0 ? RU_C.green : RU_C.red;
            return React.createElement("div", { key: cm.a + cm.b, style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 6, padding: 14 } },
              React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx2, marginBottom: 6 } }, CORR_LABELS[cm.a] + "  vs.  " + CORR_LABELS[cm.b]),
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 } },
                React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 22, fontWeight: 700, color: barColor } }, (cm.r >= 0 ? "+" : "") + cm.r.toFixed(2)),
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3 } }, strength + " " + direction)
              ),
              React.createElement("div", { style: { height: 6, background: "rgba(255,255,255,.05)", borderRadius: 3, overflow: "hidden" } },
                React.createElement("div", { style: { width: (rAbs * 100) + "%", height: "100%", background: barColor, borderRadius: 3 } })
              )
            );
          })
        )
      ),
      // Interpretation
      React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, lineHeight: 1.6, marginTop: 8 } },
        "Interpretation: r > +0.7 = strong positive (variables move together). r < -0.7 = strong inverse. Slide the analysis window to see how relationships shift across periods. Oil-aggression correlation typically inverts depending on whether resource wealth funds adventurism or sanctions constrain it."
      )
    );
  }

  // ── SCENARIO: Branching Decision Tree with Indicator Tracking ──────
  var SCENARIO_BRANCHES = [
    { id: "A", name: "Frozen Posture", baseProbability: 65, color: RU_C.green,
      description: "Russia maintains current force levels, continues information operations, no kinetic action against NATO members. Deterrence holds through mutual risk calculation.",
      indicators: [
        { id: "A1", text: "Diplomatic engagement maintained with Baltic states" },
        { id: "A2", text: "No additional force deployments beyond current posture" },
        { id: "A3", text: "Information operations at baseline levels" },
        { id: "A4", text: "Energy supply contracts honored without coercion" },
      ] },
    { id: "B", name: "Hybrid Escalation", baseProbability: 25, color: RU_C.gold,
      description: "Increased cyber operations, energy coercion, gray-zone provocations against Latvia/Estonia. Tests NATO Article 5 thresholds without crossing into conventional warfare.",
      indicators: [
        { id: "B1", text: "Cyber attacks on Baltic critical infrastructure" },
        { id: "B2", text: "GPS jamming incidents in Baltic airspace" },
        { id: "B3", text: "Kaliningrad missile system deployments (Iskander)" },
        { id: "B4", text: "Ethnic Russian minority mobilization in Latvia/Estonia" },
      ] },
    { id: "C", name: "Direct Confrontation", baseProbability: 10, color: RU_C.red,
      description: "Suwalki Gap scenario -- conventional military probe triggered by domestic political crisis requiring external diversion. Maximum escalation risk.",
      indicators: [
        { id: "C1", text: "Forward deployment of combat units to Belarus border" },
        { id: "C2", text: "Naval exercises blocking Baltic Sea shipping lanes" },
        { id: "C3", text: "Embassy evacuation signals from Moscow" },
        { id: "C4", text: "Escalated nuclear rhetoric from senior officials" },
      ] },
  ];

  function computeScenarioProbabilities() {
    var counts = { A: 0, B: 0, C: 0 }; var total = 0;
    SCENARIO_BRANCHES.forEach(function(br) {
      br.indicators.forEach(function(ind) { if (scenarioIndicators[ind.id]) { counts[br.id]++; total++; } });
    });
    if (total === 0) return SCENARIO_BRANCHES.map(function(br) { return { id: br.id, probability: br.baseProbability }; });
    var raw = SCENARIO_BRANCHES.map(function(br) {
      var observedFraction = counts[br.id] / br.indicators.length;
      var otherObserved = total - counts[br.id];
      return { id: br.id, raw: br.baseProbability * (1 + observedFraction * 3) / (1 + otherObserved * 0.3) };
    });
    var sumRaw = raw.reduce(function(s, r) { return s + r.raw; }, 0);
    return raw.map(function(r) { return { id: r.id, probability: Math.round((r.raw / sumRaw) * 100) }; });
  }

  function renderScenario() {
    var probs = computeScenarioProbabilities();
    var totalObserved = Object.keys(scenarioIndicators).filter(function(k) { return scenarioIndicators[k]; }).length;
    var confidence = totalObserved >= 8 ? "HIGH" : totalObserved >= 4 ? "MODERATE" : "LOW";
    var confColor = confidence === "HIGH" ? RU_C.green : confidence === "MODERATE" ? RU_C.gold : RU_C.red;

    return React.createElement("div", { style: { marginTop: 12 } },
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } }, "Scenario Tree -- Baltic Escalation Assessment"),
      React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 20 } },
        "Current assessment: Will Russia escalate in the Baltics (2024-2025)? Three branching scenarios with observable indicators. Toggle indicators as OBSERVED to update the probability distribution in real time using Bayesian weighting."
      ),
      // Scenario tree SVG
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 20, marginBottom: 24, overflowX: "auto" } },
        React.createElement("svg", { viewBox: "0 0 700 220", style: { width: "100%", maxWidth: 700 } },
          React.createElement("rect", { x: 270, y: 10, width: 160, height: 40, rx: 6, fill: "rgba(255,255,255,.06)", stroke: RU_C.gold, strokeWidth: 1.5 }),
          React.createElement("text", { x: 350, y: 28, textAnchor: "middle", fill: RU_C.gold, fontFamily: RU_Sans, fontSize: 10, fontWeight: 700 }, "CURRENT SITUATION"),
          React.createElement("text", { x: 350, y: 42, textAnchor: "middle", fill: RU_C.tx3, fontFamily: RU_Sans, fontSize: 8 }, "2024-2025"),
          React.createElement("line", { x1: 350, y1: 50, x2: 120, y2: 100, stroke: SCENARIO_BRANCHES[0].color, strokeWidth: 1.5 }),
          React.createElement("line", { x1: 350, y1: 50, x2: 350, y2: 100, stroke: SCENARIO_BRANCHES[1].color, strokeWidth: 1.5 }),
          React.createElement("line", { x1: 350, y1: 50, x2: 580, y2: 100, stroke: SCENARIO_BRANCHES[2].color, strokeWidth: 1.5 }),
          SCENARIO_BRANCHES.map(function(br, i) {
            var xPos = [120, 350, 580][i];
            var prob = probs.filter(function(p) { return p.id === br.id; })[0];
            return React.createElement("g", { key: br.id },
              React.createElement("rect", { x: xPos - 80, y: 100, width: 160, height: 90, rx: 6, fill: br.color + "15", stroke: br.color, strokeWidth: 1.2 }),
              React.createElement("text", { x: xPos, y: 118, textAnchor: "middle", fill: br.color, fontFamily: RU_Sans, fontSize: 10, fontWeight: 700 }, "SCENARIO " + br.id),
              React.createElement("text", { x: xPos, y: 134, textAnchor: "middle", fill: RU_C.tx2, fontFamily: RU_Sans, fontSize: 9 }, br.name),
              React.createElement("rect", { x: xPos - 50, y: 148, width: 100, height: 8, rx: 4, fill: "rgba(255,255,255,.05)" }),
              React.createElement("rect", { x: xPos - 50, y: 148, width: Math.max(2, prob.probability), height: 8, rx: 4, fill: br.color, style: { transition: "width .4s" } }),
              React.createElement("text", { x: xPos, y: 172, textAnchor: "middle", fill: br.color, fontFamily: RU_Mono, fontSize: 14, fontWeight: 700 }, prob.probability + "%"),
              React.createElement("text", { x: xPos, y: 184, textAnchor: "middle", fill: RU_C.tx3, fontFamily: RU_Sans, fontSize: 8 }, "probability")
            );
          })
        )
      ),
      // Indicator panels
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 24 } },
        SCENARIO_BRANCHES.map(function(br) {
          var prob = probs.filter(function(p) { return p.id === br.id; })[0];
          return React.createElement("div", { key: br.id, style: { background: RU_C.card, border: "1px solid " + br.color + "40", borderRadius: 8, padding: 16, borderTop: "3px solid " + br.color } },
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 13, fontWeight: 700, color: br.color, marginBottom: 4 } }, "SCENARIO " + br.id + ": " + br.name),
            React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 12, color: RU_C.tx2, lineHeight: 1.6, marginBottom: 12 } }, br.description),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1, marginBottom: 8 } }, "OBSERVABLE INDICATORS"),
            br.indicators.map(function(ind) {
              var observed = !!scenarioIndicators[ind.id];
              return React.createElement("div", {
                key: ind.id,
                onClick: function() { var next = Object.assign({}, scenarioIndicators); next[ind.id] = !next[ind.id]; setScenarioIndicators(next); },
                style: { display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 8px", marginBottom: 4, background: observed ? br.color + "18" : "transparent", border: "1px solid " + (observed ? br.color + "40" : RU_C.line), borderRadius: 4, cursor: "pointer", transition: "all .2s" }
              },
                React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 14, color: observed ? br.color : RU_C.tx3, flexShrink: 0, marginTop: -1 } }, observed ? "[X]" : "[ ]"),
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 12, color: observed ? RU_C.tx : RU_C.tx2, lineHeight: 1.5 } }, ind.text)
              );
            }),
            React.createElement("div", { style: { marginTop: 10, display: "flex", alignItems: "center", gap: 8 } },
              React.createElement("div", { style: { flex: 1, height: 8, background: "rgba(255,255,255,.05)", borderRadius: 4, overflow: "hidden" } },
                React.createElement("div", { style: { width: prob.probability + "%", height: "100%", background: br.color, borderRadius: 4, transition: "width .4s" } })
              ),
              React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 13, fontWeight: 700, color: br.color, minWidth: 36, textAlign: "right" } }, prob.probability + "%")
            )
          );
        })
      ),
      // Confidence assessment
      React.createElement("div", { style: { background: confColor + "10", border: "1px solid " + confColor + "30", borderRadius: 8, padding: 20, marginBottom: 20 } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1.5, marginBottom: 4 } }, "CONFIDENCE ASSESSMENT"),
            React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 28, fontWeight: 700, color: confColor } }, confidence),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx2, marginTop: 4 } }, totalObserved + " of 12 indicators observed")
          ),
          React.createElement("div", { style: { display: "flex", gap: 4 } },
            [1,2,3,4,5,6,7,8,9,10,11,12].map(function(n) {
              return React.createElement("div", { key: n, style: { width: 12, height: 32, borderRadius: 2, background: n <= totalObserved ? confColor : "rgba(255,255,255,.06)", transition: "background .3s" } });
            })
          )
        ),
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, lineHeight: 1.6, marginTop: 12 } },
          confidence === "LOW" ? "Insufficient indicators observed. Assessment based primarily on baseline probabilities derived from structural analysis. Collect more observable data before drawing conclusions." :
          confidence === "MODERATE" ? "Partial indicator coverage. Probability distribution reflects meaningful signal but significant uncertainty remains. Monitor for additional indicators to increase confidence." :
          "Strong indicator coverage. Probability distribution reflects substantial observed evidence. High confidence in scenario direction, though tail risks remain. Reassess if contradictory indicators emerge."
        )
      ),
      // Reset button
      React.createElement("div", { style: { textAlign: "center" } },
        React.createElement("button", {
          onClick: function() { setScenarioIndicators({}); },
          style: { padding: "8px 24px", fontFamily: RU_Sans, fontSize: 12, background: "transparent", color: RU_C.tx3, border: "1px solid " + RU_C.line, borderRadius: 4, cursor: "pointer" }
        }, "Reset All Indicators")
      )
    );
  }

  // ── CONTRACT: Authoritarian Social Contract Dashboard ────────────
  function renderContract() {
    var CONTRACT_TERMS = [
      {
        id: "living_standards",
        name: "Rising Living Standards",
        segments: [
          { start: 2000, end: 2014, status: "delivered", label: "Real wages doubled, poverty halved from 29% to 11%, consumer economy emerged. Oil revenues funded public sector pay rises and pension increases. A new middle class appeared in Moscow and St. Petersburg." },
          { start: 2014, end: 2022, status: "strained", label: "Sanctions after Crimea + oil price collapse halved real disposable income growth. Ruble lost 50% of value in 2014-15. Real wages stagnated 2014-2018, partial recovery 2019-2021. Inflation eroded gains for lower-income Russians." },
          { start: 2022, end: 2026, status: "broken", label: "War economy: military spending at 40% of federal budget (2025). Inflation running 8-9%. Labor shortages from mobilization and emigration driving wage growth in nominal terms, but real purchasing power declining. Import substitution failing in consumer goods. Quality of life measurably declining outside defense sector." },
        ],
      },
      {
        id: "physical_security",
        name: "Physical Security",
        segments: [
          { start: 2000, end: 2022, status: "delivered", label: "Chechnya pacified (brutally). Apartment bombings stopped. Street crime declined dramatically through 2000s-2010s. Russians felt physically safer than at any point since the Soviet era. Terrorism incidents declined after 2004 Beslan." },
          { start: 2022, end: 2026, status: "broken", label: "Catastrophically broken. Estimated 1.28 million Russian military casualties by March 2026 (killed, wounded, captured, missing). Loss rate approximately 40,000/month in late 2025. Partial mobilization (September 2022) shattered the illusion that war would not touch ordinary families. Drone strikes reaching Russian territory. Kursk incursion demonstrated territorial vulnerability." },
        ],
      },
      {
        id: "no_1990s",
        name: "No Return to 1990s Chaos",
        segments: [
          { start: 2000, end: 2022, status: "delivered", label: "This was the deepest emotional chord. The 1990s trauma (hyperinflation, oligarch theft, state collapse, Chechen wars, poverty) made stability the paramount value. Putin delivered predictability: pensions paid on time, salaries not months in arrears, no gang wars in the streets." },
          { start: 2022, end: 2026, status: "strained", label: "Partial mobilization and war economy introduced 1990s-adjacent anxieties: sons being drafted, economic uncertainty, emigration of educated class. But crucially NOT 1990s-level chaos: no hyperinflation, no state collapse, no gang warfare. The regime can still argue it is holding the line against chaos, even if the margin has narrowed." },
        ],
      },
      {
        id: "national_pride",
        name: "National Pride / Great Power Status",
        segments: [
          { start: 2000, end: 2014, status: "delivered", label: "Sochi Olympics (2014), G8 membership, energy superpower narrative, military modernization. Russians felt their country mattered on the world stage again after the humiliation of the 1990s." },
          { start: 2014, end: 2022, status: "delivered", label: "Crimea annexation produced genuine popular euphoria (86% approval). Syria intervention (2015) demonstrated global military reach. Nuclear modernization. World Cup 2018. The pride narrative was sustained and deepened." },
          { start: 2022, end: 2026, status: "strained", label: "Mixed signals. International isolation (sanctions, ICC warrant, sport bans) vs. domestic narrative of standing up to the West. BRICS expansion provides alternative status framework. Nuclear posturing maintains great power self-image. Domestic polls still show majority support for great power narrative, but the evidence base is increasingly strained." },
        ],
      },
      {
        id: "apolitical",
        name: "\"You Don't Have to Care About Politics\"",
        segments: [
          { start: 2000, end: 2022, status: "delivered", label: "Successful depoliticization of Russian society. The implicit deal: we handle politics, you handle your private life. Consumer culture, foreign travel, social media usage all grew while political engagement declined. Turnout managed, opposition marginalized, most Russians genuinely uninterested in politics." },
          { start: 2022, end: 2026, status: "broken", label: "Impossible to maintain when your son, husband, or brother is drafted. Mobilization (300,000 called up September 2022, ongoing covert recruitment) forced politics into every household. War casualties create families with direct political grievances. Emigration of 500,000-700,000 (mostly young, educated) was itself a political act. The war made apoliticism impossible." },
        ],
      },
      {
        id: "personal_freedom",
        name: "Personal Freedom (Within Limits)",
        segments: [
          { start: 2000, end: 2014, status: "delivered", label: "Russians could travel abroad, use the internet relatively freely, start businesses, consume Western culture. Political freedom was curtailed but personal freedom was broadly maintained. The deal was explicit: don't challenge the regime politically and you can live as you wish." },
          { start: 2014, end: 2022, status: "strained", label: "NGO 'foreign agent' laws (2012, expanded), protest crackdowns (Bolotnaya 2012, Navalny protests 2017-2021), internet restrictions (VPN blocks, Telegram ban attempt), independent media closures. The space for personal freedom was narrowing but still recognizable." },
          { start: 2022, end: 2026, status: "broken", label: "Martial law provisions, 15-year sentences for 'discrediting' the military, mass emigration pressure, social media monitoring, denunciation culture returning. Personal freedom severely eroded: what you say, post, or share can result in prosecution. The 'within limits' qualifier has expanded to consume most of the freedom it was supposed to protect." },
        ],
      },
    ];

    var statusColor = function(s) {
      return s === "delivered" ? RU_C.green : s === "strained" ? RU_C.gold : RU_C.red;
    };
    var statusLabel = function(s) {
      return s === "delivered" ? "DELIVERED" : s === "strained" ? "STRAINED" : "BROKEN";
    };

    var termsDelivered = 0;
    var termsBroken = 0;
    var termsStrained = 0;
    CONTRACT_TERMS.forEach(function(t) {
      var last = t.segments[t.segments.length - 1];
      if (last.status === "delivered") termsDelivered++;
      else if (last.status === "broken") termsBroken++;
      else termsStrained++;
    });

    var EXPLANATIONS = [
      { id: "A", label: "Repression is sufficient to suppress dissent", detail: "The coercive apparatus (FSB, Rosgvardiya, police, courts) has been dramatically expanded since 2022. Protest is effectively criminalized. Independent media destroyed. Opposition leaders dead (Navalny), imprisoned, or exiled. The cost of dissent is now 15 years in prison. This explanation argues that raw coercion can substitute for legitimacy indefinitely. Counter-evidence: No authoritarian regime has maintained pure coercion without some legitimacy source for more than 10-15 years. The costs of repression compound over time." },
      { id: "B", label: "The 1990s trauma makes ANY order preferable to chaos", detail: "Russians aged 40+ carry deep psychological scars from the 1990s collapse. The fear of state failure is more powerful than dissatisfaction with state performance. Putin's implicit argument -- 'without me, the 1990s return' -- resonates precisely because it is empirically grounded in living memory. Counter-evidence: This effect is generational. Russians under 30 have no memory of the 1990s. As the traumatized generation ages out, this brake on political action will weaken. Timeline: 10-15 years before the 1990s cohort loses demographic dominance." },
      { id: "C", label: "Nationalist war framing has temporarily replaced the old contract", detail: "The war has created a new implicit contract: 'We are fighting for Russia's survival against NATO encirclement. Personal sacrifices are patriotic duty, not contract violations.' This transforms broken promises into acceptable wartime costs. The Great Patriotic War (WWII) narrative provides the cultural template. Counter-evidence: WWII framing worked because the threat was existential and visible (German invasion). The Ukraine war does not map cleanly: Russia invaded, is not defending its territory (Kursk notwithstanding), and the enemy is not at the gates of Moscow. The framing is sustainable only as long as the war can be presented as defensive." },
      { id: "D", label: "There is no organized opposition capable of capitalizing", detail: "Even if millions are dissatisfied, dissatisfaction without organization produces nothing. Navalny's network was destroyed. Civil society was gutted. There is no alternative power center, no credible alternative leader, no institutional channel for opposition. Dissatisfaction is atomized and individual. Counter-evidence: This is the strongest explanation but also the most historically fragile. In 1989, there was no organized opposition in East Germany either. The Stasi had penetrated everything. Then the Berlin Wall fell in weeks. Authoritarian regimes appear stable until suddenly they are not. The absence of visible opposition is not evidence of regime stability -- it may be evidence of how quickly things can change when a trigger event occurs." },
    ];

    var timelineStart = 2000;
    var timelineEnd = 2026;
    var totalYears = timelineEnd - timelineStart;

    return React.createElement("div", { style: { marginTop: 12 } },
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } }, "Authoritarian Social Contract Dashboard"),
      React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 24 } },
        "The social contract Putin made with the Russian public: \"I give you stability, rising wages, national pride. You give me power and don't ask questions.\" Track delivery status of 6 contract terms across the Putin era (2000-2026)."
      ),
      // Timeline bars
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 } },
        CONTRACT_TERMS.map(function(term) {
          return React.createElement("div", { key: term.id, style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: "14px 18px" } },
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 13, fontWeight: 700, color: RU_C.tx, marginBottom: 8 } }, term.name),
            // Year axis
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
              [2000, 2005, 2010, 2015, 2020, 2025].map(function(y) {
                return React.createElement("span", { key: y, style: { fontFamily: RU_Mono, fontSize: 9, color: RU_C.tx3 } }, y);
              })
            ),
            // Bar
            React.createElement("div", { style: { display: "flex", height: 28, borderRadius: 4, overflow: "hidden", border: "1px solid " + RU_C.line, cursor: "pointer" } },
              term.segments.map(function(seg, si) {
                var widthPct = ((seg.end - seg.start) / totalYears * 100) + "%";
                var sc = statusColor(seg.status);
                var isSelected = contractSelected === term.id + "-" + si;
                return React.createElement("div", {
                  key: si,
                  onClick: function() { setContractSelected(isSelected ? null : term.id + "-" + si); },
                  style: {
                    width: widthPct,
                    height: "100%",
                    background: sc + (isSelected ? "40" : "25"),
                    borderRight: si < term.segments.length - 1 ? "1px solid " + RU_C.bg : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background .2s",
                    position: "relative",
                  },
                },
                  React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 10, fontWeight: 600, color: sc, letterSpacing: 0.5 } }, statusLabel(seg.status))
                );
              })
            ),
            // Expanded detail
            contractSelected && contractSelected.indexOf(term.id) === 0 ? (function() {
              var si = parseInt(contractSelected.split("-")[1]);
              var seg = term.segments[si];
              var sc = statusColor(seg.status);
              return React.createElement("div", { style: { marginTop: 10, padding: 14, background: sc + "10", border: "1px solid " + sc + "30", borderRadius: 6 } },
                React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: sc, marginBottom: 4, letterSpacing: 1 } }, statusLabel(seg.status) + " (" + seg.start + "-" + seg.end + ")"),
                React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.7 } }, seg.label)
              );
            })() : null
          );
        })
      ),
      // Contract Status Assessment
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 24, marginBottom: 28 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1.5, marginBottom: 16 } }, "CONTRACT STATUS ASSESSMENT"),
        React.createElement("div", { style: { display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 20 } },
          React.createElement("div", { style: { textAlign: "center" } },
            React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 32, fontWeight: 700, color: RU_C.green } }, termsDelivered),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, marginTop: 2 } }, "Terms Delivered")
          ),
          React.createElement("div", { style: { textAlign: "center" } },
            React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 32, fontWeight: 700, color: RU_C.gold } }, termsStrained),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, marginTop: 2 } }, "Terms Strained")
          ),
          React.createElement("div", { style: { textAlign: "center" } },
            React.createElement("div", { style: { fontFamily: RU_Mono, fontSize: 32, fontWeight: 700, color: RU_C.red } }, termsBroken),
            React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, marginTop: 2 } }, "Terms Broken")
          )
        ),
        React.createElement("div", { style: { background: RU_C.redBg, border: "1px solid " + RU_C.red + "30", borderRadius: 6, padding: 16, marginBottom: 16 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.red, letterSpacing: 1, marginBottom: 6 } }, "HISTORICAL PRECEDENT"),
          React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.7 } },
            "When the Soviet social contract broke in the late 1980s (economic stagnation + Afghanistan casualties + Chernobyl), the regime fell within 5 years. The current contract is objectively broken on " + termsBroken + " of 6 terms and strained on " + termsStrained + " more. The parallel is not exact -- the Soviet system was ideologically exhausted in ways Putin's is not -- but the structural similarity is notable."
          )
        )
      ),
      // Key analytical question
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.gold + "30", borderRadius: 8, padding: 24 } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, fontWeight: 700, color: RU_C.gold, letterSpacing: 1.5, marginBottom: 8 } }, "KEY ANALYTICAL QUESTION"),
        React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 15, color: RU_C.tx, lineHeight: 1.7, marginBottom: 20 } },
          "The contract is objectively broken on " + termsBroken + " of 6 terms. Why hasn't this produced political consequences? Four possible explanations:"
        ),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
          EXPLANATIONS.map(function(ex) {
            var isOpen = contractExplanation === ex.id;
            return React.createElement("div", {
              key: ex.id,
              style: { background: isOpen ? RU_C.goldBg : "transparent", border: "1px solid " + (isOpen ? RU_C.gold + "40" : RU_C.line), borderRadius: 6, overflow: "hidden", transition: "all .2s" },
            },
              React.createElement("div", {
                onClick: function() { setContractExplanation(isOpen ? null : ex.id); },
                style: { padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 },
              },
                React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 14, fontWeight: 700, color: RU_C.gold, flexShrink: 0 } }, ex.id + ")" /* ( */),
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 13, color: isOpen ? RU_C.tx : RU_C.tx2, fontWeight: isOpen ? 600 : 400 } }, ex.label)
              ),
              isOpen ? React.createElement("div", { style: { padding: "0 16px 16px 42px" } },
                React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.8 } }, ex.detail)
              ) : null
            );
          })
        )
      )
    );
  }

  // ── BRIEFING: Briefing Prep Generator ──────────────────────────
  function renderBriefing() {
    var AUDIENCES = [
      { id: "european_defense", label: "European Defense Ministry" },
      { id: "us_congressional", label: "US Congressional Staffers" },
      { id: "corporate_risk", label: "Corporate Risk Assessment" },
      { id: "academic", label: "Academic Conference" },
      { id: "journalism", label: "Journalism Interview" },
    ];
    var TOPICS = [
      { id: "ukraine_trajectory", label: "Ukraine War Trajectory" },
      { id: "domestic_stability", label: "Russian Domestic Stability" },
      { id: "nato_russia", label: "NATO-Russia Dynamics" },
      { id: "hybrid_warfare", label: "Russian Hybrid Warfare" },
      { id: "energy_coercion", label: "Energy Coercion" },
      { id: "china_russia", label: "China-Russia Relationship" },
    ];
    var DURATIONS = [
      { id: "15", label: "15 min" },
      { id: "30", label: "30 min" },
      { id: "45", label: "45 min" },
      { id: "60", label: "60 min" },
    ];

    var isPolicyAudience = briefAudience === "european_defense" || briefAudience === "us_congressional" || briefAudience === "corporate_risk";

    // Pre-built briefing skeletons
    var BRIEFINGS = {
      "european_defense|ukraine_trajectory": {
        title: "Ukraine War Trajectory -- European Defense Ministry (30 min)",
        judgments: [
          {
            text: "Russia cannot achieve its maximalist objectives (regime change in Kyiv, NATO withdrawal from Eastern Europe) but retains capacity to sustain the current war of attrition for 2-3 more years.",
            confidence: "HIGH",
            evidence: [
              "Russian defense spending at 40% of federal budget (2025) is unsustainable beyond 2027-2028 without structural economic damage.",
              "Russian casualty rate of approximately 40,000/month exceeds recruitment capacity; covert mobilization ongoing but insufficient.",
              "Russian defense industrial base producing 3x pre-war output but still below consumption rate for precision munitions.",
            ],
            contrarian: [
              "Russia's war economy may prove more resilient than Western models predict -- Soviet precedent shows command economies can sustain wartime production for decades at the cost of living standards.",
              "Chinese economic support (purchasing Russian energy above market rates, providing dual-use technology) may extend Russia's timeline significantly beyond 2028.",
            ],
          },
          {
            text: "A negotiated settlement is possible in 2026-2027 but will require both sides to accept outcomes they currently reject publicly.",
            confidence: "MODERATE",
            evidence: [
              "Backchannel communications between Moscow and Washington have intensified since late 2025.",
              "Russian economic indicators suggest growing pressure for settlement: labor shortages, inflation, capital flight.",
            ],
            contrarian: [
              "Putin has no incentive to negotiate from a position that would be perceived domestically as defeat -- the political costs of an unsatisfactory peace may exceed the costs of continued war.",
            ],
          },
          {
            text: "European NATO members face a 3-5 year window of elevated Russian conventional threat, peaking if/when the Ukraine war concludes and Russian forces reconstitute.",
            confidence: "HIGH",
            evidence: [
              "Russian military doctrine treats post-conflict reconstitution as a strategic priority.",
              "Baltic states remain vulnerable during the NATO force buildup period (2024-2028).",
              "Russian hybrid warfare capabilities (cyber, sabotage, political interference) are operational regardless of the Ukraine war status.",
            ],
            contrarian: [
              "Russian conventional forces have been so degraded by the Ukraine war that meaningful reconstitution will take 7-10 years, not 3-5.",
            ],
          },
        ],
        policyOptions: [
          "Accelerate ammunition production to sustain Ukrainian defensive operations through 2027.",
          "Pre-position NATO rapid reaction forces in Baltic states to deter opportunistic Russian escalation during any ceasefire negotiations.",
          "Develop sanctions off-ramp framework tied to verifiable Russian withdrawal milestones.",
        ],
        questions: [
          "What is the realistic timeline for Ukrainian counteroffensive capability and what equipment is needed?",
          "How should European defense planning account for a possible US disengagement from NATO support?",
          "What are the indicators that Russia is preparing for escalation beyond Ukraine (Baltic probes, Moldovan destabilization)?",
        ],
        classifiedNote: "Open source covers force disposition and economic indicators. Classified sources needed for: Russian leadership decision-making dynamics, specific intelligence on Russian military readiness timelines, and details of backchannel negotiations.",
      },
      "us_congressional|domestic_stability": {
        title: "Russian Domestic Stability -- US Congressional Staffers (15 min)",
        judgments: [
          {
            text: "The Putin regime is stable in the short term (12-18 months) but faces compounding structural pressures that create medium-term vulnerability (3-5 years).",
            confidence: "HIGH",
            evidence: [
              "No organized opposition exists; Navalny's network destroyed, civil society gutted.",
              "Security apparatus (FSB, Rosgvardiya) remains loyal and well-resourced.",
              "However: war casualties creating millions of grievance-bearing families, brain drain of 500-700K educated Russians, defense spending crowding out social services.",
            ],
            contrarian: [
              "Authoritarian regimes rarely collapse from domestic pressure alone -- external shock (military defeat, succession crisis) is typically the trigger.",
            ],
          },
          {
            text: "Succession planning is the single greatest vulnerability in the Russian political system.",
            confidence: "HIGH",
            evidence: [
              "Putin (age 73) has no designated successor and has systematically prevented any figure from accumulating independent power.",
              "Historical pattern: every Russian leadership transition since 1725 has been contested, violent, or both.",
            ],
            contrarian: [
              "The 'sistema' (informal power network) may be capable of managing a transition without external visibility, as it did in 1999 (Yeltsin to Putin).",
            ],
          },
          {
            text: "Sanctions are degrading Russian economic capacity but are not, by themselves, sufficient to produce regime change.",
            confidence: "HIGH",
            evidence: [
              "Russian GDP contracted only 2.1% in 2022 despite unprecedented sanctions, recovered partially in 2023-2024.",
              "Sanctions evasion through third countries (UAE, Turkey, Central Asia, China) remains extensive.",
            ],
            contrarian: [
              "Sanctions effects are cumulative and may reach a tipping point when deferred maintenance (infrastructure, technology) creates cascading failures.",
            ],
          },
        ],
        policyOptions: [
          "Maintain sanctions pressure while targeting specific evasion networks through third-country enforcement.",
          "Invest in Russian-language independent media broadcasting to maintain information access for Russian citizens.",
          "Develop contingency planning for Russian political instability scenarios (succession crisis, regional fragmentation).",
        ],
        questions: [
          "What is the US strategy if Putin dies or is incapacitated -- do we have a framework for engaging a successor regime?",
          "Are sanctions actually working or are we just punishing Russian civilians while elites evade through Dubai and Istanbul?",
          "What is the risk of Russian domestic instability producing loose nuclear materials or unauthorized nuclear use?",
        ],
        classifiedNote: "Open source covers economic data, demographic trends, and protest indicators. Classified sources needed for: Putin's health status, elite factional dynamics, and specific intelligence on succession planning within the Kremlin.",
      },
      "corporate_risk|energy_coercion": {
        title: "Energy Coercion -- Corporate Risk Assessment (45 min)",
        judgments: [
          {
            text: "Russia's capacity for energy coercion against Europe has been permanently reduced by the destruction of Nord Stream pipelines and European diversification, but residual leverage remains significant in specific markets.",
            confidence: "HIGH",
            evidence: [
              "European LNG import capacity expanded from 150 bcm to 220+ bcm (2022-2025).",
              "Russian pipeline gas deliveries to Europe fell from 155 bcm (2021) to approximately 15 bcm (2025).",
              "However: Central/Eastern European countries remain more exposed; nuclear fuel supply chains still Russia-dependent for several EU members.",
            ],
            contrarian: [
              "A severe winter combined with Asian LNG demand surge could still create European energy vulnerability, particularly if remaining Russian gas flows through Ukraine are cut (transit agreement expired December 2024).",
            ],
          },
          {
            text: "Russian energy revenue has been redirected to Asian markets, maintaining fiscal viability but at significantly lower margins and with increased buyer leverage.",
            confidence: "HIGH",
            evidence: [
              "Russian oil exports to China and India doubled post-2022 but at discounts of 15-30% to Brent benchmark.",
              "Russian federal budget increasingly dependent on non-energy revenue and reserve fund drawdowns.",
              "Yamal LNG and Arctic LNG-2 projects face technology access challenges from sanctions on Western equipment.",
            ],
            contrarian: [
              "If oil prices rise above $100/barrel due to Middle East instability, Russian fiscal position improves significantly regardless of discount levels.",
            ],
          },
          {
            text: "Corporate entities with Russian energy exposure face regulatory, reputational, and operational risks that will persist regardless of conflict resolution.",
            confidence: "MODERATE",
            evidence: [
              "Secondary sanctions risk for entities facilitating Russian energy trade is increasing.",
              "ESG frameworks increasingly classify Russian energy partnerships as material governance risks.",
            ],
            contrarian: [
              "A negotiated settlement in Ukraine could rapidly rehabilitate Russian energy partnerships, particularly in gas -- the infrastructure still exists and European demand has not disappeared, only been redirected at higher cost.",
            ],
          },
          {
            text: "The nuclear fuel supply chain represents an underappreciated corporate risk: Russia controls 44% of global uranium enrichment capacity.",
            confidence: "HIGH",
            evidence: [
              "Rosatom remains unsanctioned. Multiple EU nuclear utilities depend on VVER fuel assemblies that only Rosatom produces.",
              "Westinghouse and Framatome are developing alternative fuel assemblies but commercial availability is 2027-2028 at earliest.",
            ],
            contrarian: [
              "Sanctioning Rosatom would create more disruption for Western nuclear operators than for Russia in the short term.",
            ],
          },
        ],
        policyOptions: [
          "Conduct supply chain audit of all Russian energy dependencies including nuclear fuel, enrichment services, and critical mineral inputs.",
          "Develop hedging strategies for energy price volatility driven by Russian supply disruption scenarios.",
          "Evaluate regulatory exposure under current and anticipated secondary sanctions regimes.",
          "Establish scenario-based contingency plans for both conflict escalation (energy supply disruption) and resolution (market rebalancing).",
        ],
        questions: [
          "What is the financial exposure if Russian gas transit through Ukraine is permanently terminated?",
          "How should we assess the risk of investing in alternative energy infrastructure that may become stranded assets if Russian energy returns to European markets post-conflict?",
          "What is the timeline for regulatory action on nuclear fuel supply diversification and what are the cost implications?",
        ],
        classifiedNote: "Open source covers market data, trade flows, regulatory frameworks, and corporate disclosures. Classified sources would add: intelligence on Russian energy policy decision-making, specific sanctions evasion schemes, and advance knowledge of regulatory actions. Most corporate risk assessment can be conducted entirely on open source.",
      },
    };

    var briefKey = briefAudience + "|" + briefTopic;
    var activeBriefing = BRIEFINGS[briefKey] || null;

    var toggleSection = function(key) {
      var next = Object.assign({}, briefExpanded);
      next[key] = !next[key];
      setBriefExpanded(next);
    };

    var renderSection = function(title, content, sectionKey) {
      var isOpen = !!briefExpanded[sectionKey];
      return React.createElement("div", { key: sectionKey, style: { marginBottom: 8, border: "1px solid " + RU_C.line, borderRadius: 6, overflow: "hidden" } },
        React.createElement("div", {
          onClick: function() { toggleSection(sectionKey); },
          style: { padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: isOpen ? RU_C.goldBg : "transparent", transition: "background .2s" },
        },
          React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 12, fontWeight: 700, color: isOpen ? RU_C.gold : RU_C.tx3, letterSpacing: 1 } }, title),
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 12, color: RU_C.tx3 } }, isOpen ? "[-]" : "[+]")
        ),
        isOpen ? React.createElement("div", { style: { padding: "12px 14px", borderTop: "1px solid " + RU_C.line } }, content) : null
      );
    };

    var renderJudgment = function(j, idx) {
      var confColor = j.confidence === "HIGH" ? RU_C.green : j.confidence === "MODERATE" ? RU_C.gold : RU_C.red;
      var jKey = "j-" + idx;
      var isDetailed = briefDetailMode === "detailed";
      return React.createElement("div", { key: jKey, style: { marginBottom: 16, padding: 14, background: confColor + "08", border: "1px solid " + confColor + "25", borderRadius: 6 } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 } },
          React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 10, fontWeight: 700, color: confColor, padding: "2px 8px", background: confColor + "20", borderRadius: 3, letterSpacing: 1 } }, j.confidence),
          React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3 } }, "Confidence")
        ),
        React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx, lineHeight: 1.7, marginBottom: isDetailed ? 12 : 0 } }, j.text),
        isDetailed ? React.createElement(React.Fragment, null,
          renderSection("SUPPORTING EVIDENCE (" + j.evidence.length + ")", React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
            j.evidence.map(function(e, ei) {
              return React.createElement("div", { key: ei, style: { display: "flex", gap: 8, alignItems: "flex-start" } },
                React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 11, color: RU_C.gold, flexShrink: 0, marginTop: 2 } }, "[" + (ei + 1) + "]"),
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx2, lineHeight: 1.6 } }, e)
              );
            })
          ), jKey + "-evidence"),
          renderSection("ALTERNATIVE VIEWS (" + j.contrarian.length + ")", React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
            j.contrarian.map(function(c, ci) {
              return React.createElement("div", { key: ci, style: { display: "flex", gap: 8, alignItems: "flex-start" } },
                React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 11, color: RU_C.red, flexShrink: 0, marginTop: 2 } }, "ALT"),
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx2, lineHeight: 1.6 } }, c)
              );
            })
          ), jKey + "-contrarian")
        ) : null
      );
    };

    return React.createElement("div", { style: { marginTop: 12 } },
      React.createElement("h3", { style: { fontFamily: RU_Serif, fontSize: 22, color: RU_C.gold, marginBottom: 4 } }, "Briefing Prep Generator"),
      React.createElement("p", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 20 } },
        "Select audience, topic, and duration to generate a structured briefing skeleton with key judgments, evidence, alternative views, and anticipated questions."
      ),
      // Selectors
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 } },
        // Audience
        React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 14 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1, marginBottom: 8 } }, "AUDIENCE"),
          AUDIENCES.map(function(a) {
            var sel = briefAudience === a.id;
            return React.createElement("div", {
              key: a.id,
              onClick: function() { setBriefAudience(a.id); setBriefExpanded({}); },
              style: { padding: "6px 10px", marginBottom: 4, borderRadius: 4, cursor: "pointer", background: sel ? RU_C.gold + "20" : "transparent", border: "1px solid " + (sel ? RU_C.gold + "40" : "transparent"), fontFamily: RU_Sans, fontSize: 12, color: sel ? RU_C.gold : RU_C.tx2, fontWeight: sel ? 600 : 400, transition: "all .2s" },
            }, a.label);
          })
        ),
        // Topic
        React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 14 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1, marginBottom: 8 } }, "TOPIC"),
          TOPICS.map(function(t) {
            var sel = briefTopic === t.id;
            return React.createElement("div", {
              key: t.id,
              onClick: function() { setBriefTopic(t.id); setBriefExpanded({}); },
              style: { padding: "6px 10px", marginBottom: 4, borderRadius: 4, cursor: "pointer", background: sel ? RU_C.gold + "20" : "transparent", border: "1px solid " + (sel ? RU_C.gold + "40" : "transparent"), fontFamily: RU_Sans, fontSize: 12, color: sel ? RU_C.gold : RU_C.tx2, fontWeight: sel ? 600 : 400, transition: "all .2s" },
            }, t.label);
          })
        ),
        // Duration + Mode
        React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 14 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1, marginBottom: 8 } }, "DURATION"),
          React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" } },
            DURATIONS.map(function(d) {
              var sel = briefDuration === d.id;
              return React.createElement("button", {
                key: d.id,
                onClick: function() { setBriefDuration(d.id); },
                style: { padding: "6px 14px", borderRadius: 4, cursor: "pointer", background: sel ? RU_C.gold + "20" : "transparent", border: "1px solid " + (sel ? RU_C.gold + "40" : RU_C.line), fontFamily: RU_Sans, fontSize: 12, color: sel ? RU_C.gold : RU_C.tx2, fontWeight: sel ? 600 : 400 },
              }, d.label);
            })
          ),
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1, marginBottom: 8 } }, "DETAIL LEVEL"),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            [{ id: "brief", label: "BRIEF" }, { id: "detailed", label: "DETAILED" }].map(function(m) {
              var sel = briefDetailMode === m.id;
              return React.createElement("button", {
                key: m.id,
                onClick: function() { setBriefDetailMode(m.id); },
                style: { padding: "6px 14px", borderRadius: 4, cursor: "pointer", background: sel ? RU_C.gold + "20" : "transparent", border: "1px solid " + (sel ? RU_C.gold + "40" : RU_C.line), fontFamily: RU_Mono, fontSize: 11, color: sel ? RU_C.gold : RU_C.tx2, fontWeight: sel ? 700 : 400, letterSpacing: 1 },
              }, m.label);
            })
          )
        )
      ),
      // Briefing content
      activeBriefing ? React.createElement("div", { style: { marginBottom: 20 } },
        // Title bar
        React.createElement("div", { style: { background: RU_C.gold + "12", border: "1px solid " + RU_C.gold + "30", borderRadius: "8px 8px 0 0", padding: "14px 18px", borderBottom: "none" } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 14, fontWeight: 700, color: RU_C.gold } }, activeBriefing.title),
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, marginTop: 4 } }, "Duration: " + briefDuration + " minutes | Detail: " + briefDetailMode.toUpperCase())
        ),
        // Judgments
        React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: "0 0 8px 8px", padding: 18 } },
          React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1.5, marginBottom: 14 } }, "KEY JUDGMENTS (" + activeBriefing.judgments.length + ")"),
          activeBriefing.judgments.map(function(j, i) { return renderJudgment(j, i); }),
          // Policy options
          isPolicyAudience && activeBriefing.policyOptions ? renderSection("RECOMMENDED POLICY OPTIONS (" + activeBriefing.policyOptions.length + ")", React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
            activeBriefing.policyOptions.map(function(p, pi) {
              return React.createElement("div", { key: pi, style: { display: "flex", gap: 8, alignItems: "flex-start" } },
                React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 11, color: RU_C.green, flexShrink: 0, marginTop: 2 } }, "OPT " + (pi + 1)),
                React.createElement("span", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx2, lineHeight: 1.6 } }, p)
              );
            })
          ), "policy") : null,
          // Anticipated questions
          renderSection("ANTICIPATED QUESTIONS (" + activeBriefing.questions.length + ")", React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
            activeBriefing.questions.map(function(q, qi) {
              return React.createElement("div", { key: qi, style: { display: "flex", gap: 8, alignItems: "flex-start" } },
                React.createElement("span", { style: { fontFamily: RU_Mono, fontSize: 11, color: RU_C.gold, flexShrink: 0, marginTop: 2 } }, "Q" + (qi + 1)),
                React.createElement("span", { style: { fontFamily: RU_Serif, fontSize: 13, color: RU_C.tx2, lineHeight: 1.6, fontStyle: "italic" } }, q)
              );
            })
          ), "questions"),
          // Classification note
          renderSection("CLASSIFIED vs OPEN SOURCE", React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx2, lineHeight: 1.7 } },
            activeBriefing.classifiedNote
          ), "classified")
        )
      ) :
      // Template for non-pre-built combinations
      React.createElement("div", { style: { background: RU_C.card, border: "1px solid " + RU_C.line, borderRadius: 8, padding: 24, textAlign: "center" } },
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 12, fontWeight: 700, color: RU_C.tx3, letterSpacing: 1.5, marginBottom: 12 } }, "BRIEFING SKELETON TEMPLATE"),
        React.createElement("div", { style: { fontFamily: RU_Serif, fontSize: 14, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 20, maxWidth: 600, margin: "0 auto 20px" } },
          "Pre-built briefing content is available for 3 combinations: European defense / Ukraine trajectory, US congressional / Domestic stability, and Corporate risk / Energy coercion. For this combination, use the following structure:"
        ),
        React.createElement("div", { style: { textAlign: "left", maxWidth: 500, margin: "0 auto" } },
          [
            "1. KEY JUDGMENTS: Draft 3-5 assessments with HIGH/MODERATE/LOW confidence tags. Each judgment should be one declarative sentence that a policymaker can act on.",
            "2. SUPPORTING EVIDENCE: 2-3 specific, sourced data points per judgment. Prefer quantitative over qualitative.",
            "3. ALTERNATIVE VIEWS: 1-2 contrarian perspectives per judgment. These demonstrate analytical rigor, not weakness.",
            isPolicyAudience ? "4. POLICY OPTIONS: 2-4 actionable recommendations tied to judgments. Each should specify who acts, what they do, and by when." : null,
            (isPolicyAudience ? "5" : "4") + ". ANTICIPATED QUESTIONS: List 3 questions this audience will definitely ask. Prepare 2-minute responses for each.",
            (isPolicyAudience ? "6" : "5") + ". CLASSIFICATION: Note what can be discussed in open session vs. what requires restricted settings.",
          ].filter(Boolean).map(function(item, i) {
            return React.createElement("div", { key: i, style: { fontFamily: RU_Sans, fontSize: 12, color: RU_C.tx2, lineHeight: 1.7, marginBottom: 10, paddingLeft: 8, borderLeft: "2px solid " + RU_C.gold + "30" } }, item);
          })
        ),
        React.createElement("div", { style: { fontFamily: RU_Sans, fontSize: 11, color: RU_C.tx3, marginTop: 16, fontStyle: "italic" } },
          "Tip: Select one of the pre-built combinations to see a fully worked example of this structure in action."
        )
      )
    );
  }

  return React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: RU_C.bg,
      color: RU_C.tx,
      fontFamily: RU_Sans,
      position: "relative",
      overflow: "hidden",
    },
  },
    // Snow particles
    React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2 } }, snowParticles),
    // Frost edge vignette
    React.createElement("div", {
      style: {
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 3,
        background: "radial-gradient(ellipse at center, transparent 55%, rgba(180,150,100,.04) 70%, rgba(160,130,80,.08) 85%, rgba(140,110,60,.12) 95%)",
        boxShadow: "inset 0 0 80px rgba(180,150,100,.06), inset 0 0 160px rgba(160,130,80,.03)",
      },
    }),
    // SVG parchment noise overlay
    React.createElement("div", {
      style: {
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url(\"data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="4" stitchTiles="stitch"/></filter><rect width="200" height="200" filter="url(#n)" opacity=".04"/></svg>') + "\")",
        pointerEvents: "none", zIndex: 0,
      },
    }),
    // Gold filigree border (four edges)
    React.createElement("div", {
      style: {
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        border: "3px solid transparent",
        borderImage: "url(\"data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><path d="M30 0 Q35 5 30 10 Q25 5 30 0Z" fill="none" stroke="rgba(140,110,40,.25)" stroke-width=".8"/><path d="M0 30 Q5 35 10 30 Q5 25 0 30Z" fill="none" stroke="rgba(140,110,40,.20)" stroke-width=".8"/><path d="M60 30 Q55 35 50 30 Q55 25 60 30Z" fill="none" stroke="rgba(140,110,40,.20)" stroke-width=".8"/><path d="M30 60 Q35 55 30 50 Q25 55 30 60Z" fill="none" stroke="rgba(140,110,40,.25)" stroke-width=".8"/><circle cx="30" cy="30" r="1.5" fill="rgba(140,110,40,.12)"/></svg>') + "\") 30 round",
        pointerEvents: "none", zIndex: 2,
      },
    }),
    // Inner gold line border
    React.createElement("div", {
      style: {
        position: "fixed", top: 8, left: 8, right: 8, bottom: 8,
        border: "1px solid rgba(140,110,40,.18)",
        pointerEvents: "none", zIndex: 2,
      },
    }),
    marginalia,
    marginaliaR,
    // Historical date markers along right edge
    RuDateMarkers(),
    // Scattered Orthodox crosses (decorative, low opacity)
    React.createElement("div", { style: { position: "fixed", left: 24, top: "15%", pointerEvents: "none", zIndex: 1 } },
      RuOrthodoxCross({ size: 16, opacity: 0.12 })
    ),
    React.createElement("div", { style: { position: "fixed", left: 30, top: "45%", pointerEvents: "none", zIndex: 1 } },
      RuOrthodoxCross({ size: 12, opacity: 0.09 })
    ),
    React.createElement("div", { style: { position: "fixed", left: 22, top: "75%", pointerEvents: "none", zIndex: 1 } },
      RuOrthodoxCross({ size: 14, opacity: 0.10 })
    ),
    // Matryoshka near bottom-left corner
    React.createElement("div", { style: { position: "fixed", left: 14, bottom: 40, pointerEvents: "none", zIndex: 1 } },
      RuMatryoshka({ size: 22, opacity: 0.09 })
    ),
    // Hammer and Sickle near bottom-right (historical context)
    React.createElement("div", { style: { position: "fixed", right: 40, bottom: 30, pointerEvents: "none", zIndex: 1 } },
      RuHammerSickle({ size: 18, opacity: 0.07 })
    ),
    // Faberge egg near top-right
    React.createElement("div", { style: { position: "fixed", right: 50, top: "20%", pointerEvents: "none", zIndex: 1 } },
      RuFabergeEgg({ size: 28, opacity: 0.07 })
    ),
    // Additional Cyrillic ghost text: Chekist lineage
    React.createElement("div", {
      style: { position: "fixed", bottom: 8, left: "50%", transform: "translateX(-50%)", fontFamily: "'Times New Roman', serif", fontSize: 9, color: "rgba(140,110,40,.1)", letterSpacing: ".15em", whiteSpace: "nowrap", pointerEvents: "none", zIndex: 1 },
    }, "\u041E\u0445\u0440\u0430\u043D\u0430 \u2022 \u0427\u041A \u2022 \u041D\u041A\u0412\u0414 \u2022 \u041A\u0413\u0411 \u2022 \u0424\u0421\u0411 \u2014 the sword and the shield, unbroken"),
    // Ghosted security service phrase near top
    React.createElement("div", {
      style: { position: "fixed", top: 8, left: "50%", transform: "translateX(-50%)", fontFamily: "'Times New Roman', serif", fontSize: 8, color: "rgba(140,110,40,.08)", letterSpacing: ".2em", whiteSpace: "nowrap", pointerEvents: "none", zIndex: 1 },
    }, "\u0413\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u043E \u2014 \u044D\u0442\u043E \u044F"),
    // Main content
    React.createElement("div", {
      style: {
        padding: "40px 56px",
        maxWidth: 1100,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      },
    },
      backBtn,
      header,
      // Kremlin wall crenellation border between header and content
      RuKremlinMerlonDivider({}),
      modeSwitcher,
      progressBar,
      mode === "timeline"        && renderTimeline(),
      mode === "territory"       && renderTerritory(),
      mode === "counterfactuals" && renderCounterfactuals(),
      mode === "themes"          && renderThemes(),
      mode === "quiz"            && renderQuiz(),
      mode === "court"           && renderCourt(),
      mode === "vory"            && renderVory(),
      mode === "kompromat"       && renderKompromat(),
      mode === "sistema"         && renderSistema(),
      mode === "ratchet"         && renderRatchet(),
      mode === "coalitions"      && renderCoalitions(),
      mode === "services"        && renderServices(),
      mode === "cycles"          && renderCycles(),
      mode === "hybrid"          && renderHybrid(),
      mode === "advocate"        && renderAdvocate(),
      mode === "lexicon"         && renderLexicon(),
      mode === "breaks"          && renderBreaks(),
      mode === "compare"         && renderCompare(),
      mode === "correlate"       && renderCorrelate(),
      mode === "scenario"        && renderScenario(),
      mode === "contract"        && renderContract(),
      mode === "briefing"        && renderBriefing()
    )
  );
}
