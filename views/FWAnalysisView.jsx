// FWAnalysisView.jsx — Experiment Control Panel
// Capstone: Cognitive Firewalls (MPAI 7990)
//
// Interactive 2x3 factorial experiment designer for testing whether
// Structured Analytic Techniques defend intelligence analysts against
// adversarial AI-generated disinformation. Georgetown SFS MSFS thesis,
// defense September 2026. Advisor: Dr. Shay Hershkovitz.
//
// Self-contained React component using Babel in-browser transpilation
// Globals: useState, useCallback, useMemo from React

// ── Palette: Research laboratory — clean dark with grid paper and clinical precision
const FW_C = {
  bg: '#080a10',
  card: 'rgba(14,18,24,.92)',
  cardBd: 'rgba(100,180,220,.12)',
  tx: '#d0d4dc',
  tx2: '#8a9098',
  tx3: '#585e68',
  amber: '#e89020',
  amberDm: '#c07818',
  amberBg: 'rgba(232,144,32,.07)',
  gold: '#c4a050',
  goldDm: '#9a7e38',
  goldBg: 'rgba(196,160,80,.06)',
  green: '#50a060',
  greenDm: '#3a8048',
  greenBg: 'rgba(80,160,96,.06)',
  red: '#c04040',
  redDm: '#983030',
  redBg: 'rgba(192,64,64,.06)',
  blue: '#5080b8',
  blueDm: '#3a6898',
  blueBg: 'rgba(80,128,184,.06)',
  line: 'rgba(100,180,220,.08)',
  grid: 'rgba(80,140,180,.03)',
  labGreen: '#40b878',
};
const FW_Mono = "'IBM Plex Mono',monospace";
const FW_Serif = "'Source Serif 4','EB Garamond',Georgia,serif";
const FW_Sans = "'Inter',Helvetica,sans-serif";

// ── Lab grid paper background ─────────────────────────────────────
const LAB_GRID = 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(80,140,180,.025) 19px, rgba(80,140,180,.025) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(80,140,180,.025) 19px, rgba(80,140,180,.025) 20px)';
const LAB_GRID_MAJOR = 'repeating-linear-gradient(0deg, transparent, transparent 99px, rgba(80,140,180,.045) 99px, rgba(80,140,180,.045) 100px), repeating-linear-gradient(90deg, transparent, transparent 99px, rgba(80,140,180,.045) 99px, rgba(80,140,180,.045) 100px)';

// ── Lab equipment silhouette decorations ──────────────────────────
const FlaskSVG = () => React.createElement('svg', { width: 60, height: 80, viewBox: '0 0 60 80', style: { position: 'absolute', opacity: 0.03, pointerEvents: 'none' } },
  React.createElement('path', { d: 'M22 5 L22 30 L8 65 Q5 72 12 75 L48 75 Q55 72 52 65 L38 30 L38 5 Z', fill: 'none', stroke: '#80c0e0', strokeWidth: 1.5 }),
  React.createElement('line', { x1: 18, y1: 5, x2: 42, y2: 5, stroke: '#80c0e0', strokeWidth: 1.5 }),
  React.createElement('ellipse', { cx: 30, cy: 58, rx: 14, ry: 6, fill: '#80c0e0', opacity: 0.3 })
);

const BeakerSVG = () => React.createElement('svg', { width: 50, height: 70, viewBox: '0 0 50 70', style: { position: 'absolute', opacity: 0.03, pointerEvents: 'none' } },
  React.createElement('path', { d: 'M8 5 L8 55 Q8 62 15 62 L35 62 Q42 62 42 55 L42 5', fill: 'none', stroke: '#80c0e0', strokeWidth: 1.5 }),
  React.createElement('line', { x1: 5, y1: 5, x2: 45, y2: 5, stroke: '#80c0e0', strokeWidth: 1.5 }),
  React.createElement('line', { x1: 8, y1: 20, x2: 14, y2: 20, stroke: '#80c0e0', strokeWidth: 0.8 }),
  React.createElement('line', { x1: 8, y1: 35, x2: 14, y2: 35, stroke: '#80c0e0', strokeWidth: 0.8 }),
  React.createElement('line', { x1: 8, y1: 50, x2: 14, y2: 50, stroke: '#80c0e0', strokeWidth: 0.8 })
);

const MicroscopeSVG = () => React.createElement('svg', { width: 60, height: 90, viewBox: '0 0 60 90', style: { position: 'absolute', opacity: 0.03, pointerEvents: 'none' } },
  React.createElement('path', { d: 'M30 10 L30 35 Q30 40 25 42 L20 44 L20 65', fill: 'none', stroke: '#80c0e0', strokeWidth: 1.5 }),
  React.createElement('ellipse', { cx: 30, cy: 8, rx: 6, ry: 4, fill: 'none', stroke: '#80c0e0', strokeWidth: 1.2 }),
  React.createElement('rect', { x: 12, y: 65, width: 36, height: 4, rx: 2, fill: 'none', stroke: '#80c0e0', strokeWidth: 1.2 }),
  React.createElement('rect', { x: 8, y: 72, width: 44, height: 6, rx: 3, fill: 'none', stroke: '#80c0e0', strokeWidth: 1.2 }),
  React.createElement('line', { x1: 35, y1: 35, x2: 45, y2: 30, stroke: '#80c0e0', strokeWidth: 1 }),
  React.createElement('rect', { x: 42, y: 25, width: 10, height: 10, rx: 2, fill: 'none', stroke: '#80c0e0', strokeWidth: 0.8 })
);

// ── Skills tags ──────────────────────────────────────────────────
const FW_SKILLS = [
  'Factorial Experimental Design',
  'Structured Analytic Techniques',
  'ACH / Key Assumptions Check',
  'Adversarial AI / Disinformation',
  'Monte Carlo Simulation',
  'Two-Way ANOVA',
  'Cohen\'s d Effect Sizes',
  'Power Analysis',
  'Confidence Calibration',
  'Intelligence Community Doctrine',
  'IRB Protocol Design',
  'Python / R Statistical Computing',
];

// ── Tab definitions ──────────────────────────────────────────────
const FW_TABS = [
  { id: 'design', label: 'Design', num: '01' },
  { id: 'hypotheses', label: 'Hypotheses', num: '02' },
  { id: 'simulation', label: 'Simulation', num: '03' },
  { id: 'analysis', label: 'Analysis', num: '04' },
  { id: 'implications', label: 'Implications', num: '05' },
];

// ── Experimental conditions (2x3 matrix) ─────────────────────────
const SAT_LEVELS = [
  { id: 'control', label: 'No SAT Training', short: 'Control', desc: 'Standard IC analytic baseline. Analysts receive scenario briefing and standard collection but no structured debiasing tools.' },
  { id: 'treatment', label: 'SAT Trained', short: 'SAT', desc: 'Analysts complete 90-min training on ACH, Key Assumptions Check, and Pre-Mortem Analysis before scenario exposure.' },
];

const DISINFO_TYPES = [
  { id: 'A', label: 'Deepfake Video', short: 'Deepfake', color: FW_C.red, desc: 'AI-generated video purporting to show a foreign leader making a provocative statement. Visual deception with high emotional salience.' },
  { id: 'B', label: 'False HUMINT Report', short: 'HUMINT', color: FW_C.amber, desc: 'AI-generated human intelligence report with plausible sourcing, fabricated sub-source chain, and internally consistent detail. Textual deception designed to exploit source credibility heuristics.' },
  { id: 'C', label: 'Disinfo Campaign', short: 'Campaign', color: FW_C.blue, desc: 'Coordinated AI-generated social media campaign across 200+ accounts pushing a false narrative. Volume-based manipulation exploiting availability heuristic.' },
];

const DEPENDENT_VARS = [
  { id: 'detection', label: 'Detection Accuracy', unit: '%', desc: 'Did the analyst correctly identify the disinformation as fabricated?', baseline: 0.55 },
  { id: 'calibration', label: 'Confidence Calibration', unit: 'Brier', desc: 'Was stated confidence appropriate to actual accuracy? Lower Brier score = better calibration.', baseline: 0.32 },
  { id: 'decision', label: 'Decision Quality', unit: '%', desc: 'Did the analyst make the correct policy recommendation despite disinformation exposure?', baseline: 0.60 },
  { id: 'time', label: 'Time to Decision', unit: 'min', desc: 'Total time from scenario exposure to final recommendation. Proxy for cognitive load.', baseline: 28 },
];

// ── Hypotheses ───────────────────────────────────────────────────
const HYPOTHESES = [
  { id: 'H1', label: 'Main Effect of SAT Training', text: 'SAT-trained analysts will detect disinformation at significantly higher rates than control group analysts (main effect of training).', stat: 'F(1, N-6) for SAT factor, alpha = .05', expected: 'Large effect (d >= 0.8)' },
  { id: 'H2', label: 'Differential SAT Efficacy by Type', text: 'SATs are more effective against textual deception (Type B: false HUMINT) than visual deception (Type A: deepfake) or volume-based deception (Type C: campaign).', stat: 'Interaction term F(2, N-6), planned contrasts B vs. A, B vs. C', expected: 'Medium interaction (partial eta-sq >= .06)' },
  { id: 'H3', label: 'Confidence Calibration Improvement', text: 'SAT training improves confidence calibration, reducing overconfidence in incorrect judgments and increasing appropriate uncertainty.', stat: 'Brier score comparison, SAT vs. Control', expected: 'Brier reduction >= 0.08' },
  { id: 'H4', label: 'Subtlety Interaction', text: 'The SAT x Type interaction is strongest where disinformation is most subtle (Type B), because structured techniques force explicit evidence evaluation that catches fabricated sourcing.', stat: 'Simple effects analysis within interaction', expected: 'Largest SAT benefit in Cell 5 vs. Cell 2' },
];

// ── Provenance sources ───────────────────────────────────────────
const PROVENANCE = [
  { author: 'Heuer', year: 1999, work: 'Psychology of Intelligence Analysis', relevance: 'Cognitive bias taxonomy; ACH methodology' },
  { author: 'Kahneman', year: 2011, work: 'Thinking, Fast and Slow', relevance: 'System 1/2 framework; overconfidence calibration' },
  { author: 'Tetlock & Gardner', year: 2015, work: 'Superforecasting', relevance: 'Calibration training; foxhedge vs. hedgehog cognition' },
  { author: 'Chang et al.', year: 2023, work: 'Deepfake Detection in IC Contexts', relevance: 'Visual deception detection baselines' },
  { author: 'Goldstein et al.', year: 2023, work: 'Generative AI and Disinformation', relevance: 'LLM-generated text persuasiveness data' },
  { author: 'ODNI ICD 203', year: 2015, work: 'Analytic Standards', relevance: 'IC analytic tradecraft standards; SAT mandate' },
];

// ── Statistical helpers ──────────────────────────────────────────

// Box-Muller transform for normal random variates
function rnorm(mu, sigma) {
  let u1 = 0, u2 = 0;
  while (u1 === 0) u1 = Math.random();
  while (u2 === 0) u2 = Math.random();
  return mu + sigma * Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
}

// Seeded PRNG (Mulberry32)
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Seeded normal
function srnorm(rng, mu, sigma) {
  let u1 = 0, u2 = 0;
  while (u1 === 0) u1 = rng();
  while (u2 === 0) u2 = rng();
  return mu + sigma * Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
}

// Cohen's d
function cohensD(m1, s1, n1, m2, s2, n2) {
  const pooledS = Math.sqrt(((n1 - 1) * s1 * s1 + (n2 - 1) * s2 * s2) / (n1 + n2 - 2));
  return pooledS === 0 ? 0 : (m1 - m2) / pooledS;
}

// F distribution critical value approximation (for p-value estimation)
// Uses Wilson-Hilferty approximation for chi-square then constructs F
function fPValue(fStat, df1, df2) {
  if (fStat <= 0) return 1.0;
  // Beta incomplete approximation via continued fraction is complex;
  // use a simpler lookup-based approach for display
  const x = df2 / (df2 + df1 * fStat);
  // Regularized incomplete beta approximation (Abramowitz & Stegun 26.5.22)
  if (x >= 1) return 1.0;
  if (x <= 0) return 0.0;
  const a = df2 / 2, b = df1 / 2;
  const lnBeta = lnGamma(a) + lnGamma(b) - lnGamma(a + b);
  let sum = 0, term = 1;
  for (let k = 0; k < 200; k++) {
    if (k === 0) term = Math.pow(x, a) * Math.pow(1 - x, b) / (a * Math.exp(lnBeta));
    else {
      term *= x * (a + b + k - 1) * (b - k) / ((a + k) * (a + k + 1));
      if (Math.abs(term) < 1e-12) break;
    }
    sum += term;
  }
  return Math.max(0, Math.min(1, 1 - sum));
}

function lnGamma(z) {
  // Stirling-Lanczos approximation
  const c = [76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let x = z, y = z, tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += c[j] / ++y;
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}

// Quick p-value from F statistic using a simplified approach
function quickFP(f, df1, df2) {
  if (f <= 0 || df1 <= 0 || df2 <= 0) return 1.0;
  // Use the regularized beta approach
  const x = df2 / (df2 + df1 * f);
  return regBetaI(df2 / 2, df1 / 2, x);
}

function regBetaI(a, b, x) {
  if (x <= 0) return 1.0;
  if (x >= 1) return 0.0;
  const lnB = lnGamma(a) + lnGamma(b) - lnGamma(a + b);
  const front = Math.exp(a * Math.log(x) + b * Math.log(1 - x) - lnB);
  // Continued fraction (Lentz's method)
  let f = 1, c = 1, d = 1 - (a + b) * x / (a + 1);
  if (Math.abs(d) < 1e-30) d = 1e-30;
  d = 1 / d; f = d;
  for (let m = 1; m <= 100; m++) {
    let num = m * (b - m) * x / ((a + 2 * m - 1) * (a + 2 * m));
    d = 1 + num * d; if (Math.abs(d) < 1e-30) d = 1e-30; d = 1 / d;
    c = 1 + num / c; if (Math.abs(c) < 1e-30) c = 1e-30;
    f *= d * c;
    num = -(a + m) * (a + b + m) * x / ((a + 2 * m) * (a + 2 * m + 1));
    d = 1 + num * d; if (Math.abs(d) < 1e-30) d = 1e-30; d = 1 / d;
    c = 1 + num / c; if (Math.abs(c) < 1e-30) c = 1e-30;
    const delta = d * c; f *= delta;
    if (Math.abs(delta - 1) < 1e-10) break;
  }
  const Ix = front * f / a;
  return 1 - Ix; // upper tail
}

// Power analysis: probability of rejecting H0 given effect size, n, alpha
function powerForN(n, effectSize, alpha, dfNum, dfDenom) {
  // Non-central F approximation
  const lambda = n * effectSize * effectSize / 2; // non-centrality parameter
  const fCrit = fCriticalApprox(alpha, dfNum, dfDenom);
  // Approximate power using shifted F
  const shiftedF = fCrit - lambda / dfDenom;
  if (shiftedF <= 0) return 0.99;
  return 1 - quickFP(shiftedF, dfNum, dfDenom);
}

function fCriticalApprox(alpha, df1, df2) {
  // Rough approximation: use quantile lookup for common alpha=.05
  // Wilson-Hilferty normal approximation for F quantile
  const z = 1.645; // alpha=.05 one-tail
  const a = 1 - 2 / (9 * df2);
  const b = 1 - 2 / (9 * df1);
  const c = z * Math.sqrt(2 / (9 * df1) + 2 / (9 * df2));
  const ratio = Math.pow((a - c) / b, 3);
  return ratio > 0 ? 1 / ratio : 4.0;
}


// ── True effect parameters (plausible ground truth) ──────────────
const TRUE_EFFECTS = {
  detection: {
    // Control group baselines by disinfo type
    control: { A: 0.48, B: 0.42, C: 0.55 },
    // SAT treatment effects (additive)
    satEffect: { A: 0.12, B: 0.28, C: 0.10 },
    sigma: 0.18,
  },
  calibration: {
    control: { A: 0.35, B: 0.30, C: 0.38 },
    satEffect: { A: -0.04, B: -0.12, C: -0.03 },
    sigma: 0.10,
  },
  decision: {
    control: { A: 0.52, B: 0.48, C: 0.58 },
    satEffect: { A: 0.10, B: 0.22, C: 0.08 },
    sigma: 0.20,
  },
  time: {
    control: { A: 32, B: 26, C: 30 },
    satEffect: { A: 4, B: 8, C: 2 },
    sigma: 8,
  },
};


// ── Scholarly micro-content ──────────────────────────────────────
const FW_TIPS = {
  replication_crisis: "The Open Science Collaboration's 2015 Estimating the Reproducibility of Psychological Science project attempted to replicate 100 published psychology studies. Only 36% produced statistically significant results on replication, and effect sizes were on average half the originals. The crisis was not merely about p-hacking or small samples -- it revealed structural incentives in academic publishing that reward novelty over reliability. The 'file drawer problem' (Rosenthal, 1979) means null results go unpublished, creating a literature biased toward false positives. For intelligence analysis, the implication is severe: if the social science foundations underlying SATs are unreliable, the techniques built on them may be defending against threats with untested armor.",
  factorial_design: "Ronald Fisher invented factorial experimental design while working at the Rothamsted Experimental Station in 1935, solving a practical problem: how to test multiple agricultural variables (fertilizer type, planting depth, irrigation) simultaneously without running separate experiments for each. His insight was that interactions between factors are often more important than main effects -- fertilizer X works differently in wet versus dry soil. The 2x3 factorial design used in this thesis tests SAT condition (present/absent) crossed with disinformation type (statistical/narrative/hybrid), producing 6 cells. The key advantage over one-at-a-time testing: we can detect whether SATs defend better against statistical disinformation than narrative disinformation, an interaction effect invisible to simpler designs.",
  effect_size: "Jacob Cohen introduced his d statistic in 1962 and formalized the benchmarks in his 1988 'Statistical Power Analysis for the Behavioral Sciences': small (d=0.2), medium (d=0.5), large (d=0.8). Cohen himself called these 'conventions' and warned against rigid application. The critical point Cohen made -- and which most researchers ignore -- is that statistical significance (p < .05) tells you nothing about practical importance. A study with N=10,000 can detect a d=0.02 effect as 'significant' -- an effect so small it has zero practical value. For this thesis, we need d >= 0.5 (medium) to claim SATs provide meaningful defense. A statistically significant but tiny effect would mean SATs 'work' in a way that does not matter.",
  adversarial_ml: "Microsoft's Tay chatbot lasted 16 hours on Twitter in March 2016 before being shut down. Users discovered they could make Tay repeat and amplify extremist content through targeted conversational manipulation -- a form of data poisoning where the training signal is corrupted by adversarial inputs. More technically, Goodfellow et al. (2014) demonstrated that adding imperceptible perturbations to images could cause state-of-the-art neural networks to misclassify with high confidence -- a panda becomes a gibbon with 99.3% confidence after adding noise invisible to humans. For intelligence analysis, adversarial ML represents a new attack surface: if analysts increasingly rely on AI-assisted tools, adversaries who understand the models can craft disinformation specifically optimized to exploit their weaknesses.",
};

// ══════════════════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════════════════
function FWAnalysisView({ setView }) {
  const C = FW_C;
  const Mono = FW_Mono;
  const Serif = FW_Serif;
  const Sans = FW_Sans;

  const [tab, setTab] = useState('design');
  const [sampleN, setSampleN] = useState(30); // per cell
  const [seed, setSeed] = useState(42);
  const [simRun, setSimRun] = useState(false);
  const [simData, setSimData] = useState(null);
  const [selectedDV, setSelectedDV] = useState('detection');
  const [hypothesisNotes, setHypothesisNotes] = useState({ H1: '', H2: '', H3: '', H4: '' });
  const [tipId, setTipId] = useState(null);

  // ── Scholarly tooltip renderer & icons ─────────────────────────
  const TipBox = (key) => {
    if (tipId !== key) return null;
    return (
      <div style={{ padding: '10px 14px', background: 'rgba(10,12,16,.94)', border: '1px solid rgba(232,144,32,.15)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(212,208,196,.65)', lineHeight: 1.65, margin: '6px 0 10px' }}>
        {FW_TIPS[key]}
      </div>
    );
  };

  const ReplicateIcon = (
    <svg width={22} height={20} viewBox="0 0 22 20" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'replication_crisis' ? null : 'replication_crisis')}>
      <rect x={1} y={3} width={10} height={14} rx={1} fill="none" stroke="currentColor" strokeWidth=".8" />
      <rect x={11} y={3} width={10} height={14} rx={1} fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={4} y1={8} x2={8} y2={8} stroke="currentColor" strokeWidth=".4" />
      <line x1={14} y1={8} x2={18} y2={8} stroke="currentColor" strokeWidth=".4" strokeDasharray="1 1" />
      <text x={6} y={15} textAnchor="middle" fontSize={6} fill="currentColor" fillOpacity=".3">p</text>
      <text x={16} y={15} textAnchor="middle" fontSize={6} fill="currentColor" fillOpacity=".3">?</text>
    </svg>
  );

  const FactorialIcon = (
    <svg width={24} height={20} viewBox="0 0 24 20" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'factorial_design' ? null : 'factorial_design')}>
      <rect x={2} y={2} width={9} height={7} rx={1} fill="none" stroke="currentColor" strokeWidth=".8" />
      <rect x={13} y={2} width={9} height={7} rx={1} fill="none" stroke="currentColor" strokeWidth=".8" />
      <rect x={2} y={11} width={9} height={7} rx={1} fill="none" stroke="currentColor" strokeWidth=".8" />
      <rect x={13} y={11} width={9} height={7} rx={1} fill="none" stroke="currentColor" strokeWidth=".8" />
      <circle cx={6.5} cy={5.5} r={1.5} fill="currentColor" fillOpacity=".15" />
      <circle cx={17.5} cy={14.5} r={1.5} fill="currentColor" fillOpacity=".15" />
    </svg>
  );

  const EffectSizeIcon = (
    <svg width={24} height={20} viewBox="0 0 24 20" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'effect_size' ? null : 'effect_size')}>
      <path d="M2 16 Q6 16 8 10 Q10 4 12 4 Q14 4 16 10 Q18 16 22 16" fill="none" stroke="currentColor" strokeWidth=".8" />
      <line x1={8} y1={2} x2={8} y2={18} stroke="currentColor" strokeWidth=".4" strokeDasharray="2 1" />
      <line x1={16} y1={2} x2={16} y2={18} stroke="currentColor" strokeWidth=".4" strokeDasharray="2 1" />
      <line x1={8} y1={10} x2={16} y2={10} stroke="currentColor" strokeWidth=".6" />
      <text x={12} y={9} textAnchor="middle" fontSize={5} fill="currentColor" fillOpacity=".3">d</text>
    </svg>
  );

  const AdversarialIcon = (
    <svg width={22} height={22} viewBox="0 0 22 22" style={{ cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }} onClick={() => setTipId(tipId === 'adversarial_ml' ? null : 'adversarial_ml')}>
      <circle cx={11} cy={11} r={9} fill="none" stroke="currentColor" strokeWidth=".8" />
      <path d="M7 7 L15 15 M15 7 L7 15" stroke="currentColor" strokeWidth=".6" />
      <circle cx={11} cy={11} r={4} fill="none" stroke="currentColor" strokeWidth=".5" strokeDasharray="2 1" />
    </svg>
  );

  // ── Power curve data ───────────────────────────────────────────
  const powerCurve = useMemo(() => {
    const points = [];
    for (let n = 5; n <= 80; n += 1) {
      const totalN = n * 6;
      const df1 = 1; // SAT factor
      const df2 = totalN - 6;
      const power = 1 - Math.exp(-0.018 * n * 0.8 * 0.8); // simplified approximation
      points.push({ n, totalN, power: Math.min(power, 0.999) });
    }
    return points;
  }, []);

  const requiredN = useMemo(() => {
    const target = 0.80;
    for (const p of powerCurve) {
      if (p.power >= target) return p;
    }
    return powerCurve[powerCurve.length - 1];
  }, [powerCurve]);

  // ── Run simulation ─────────────────────────────────────────────
  const runSimulation = useCallback(() => {
    const rng = mulberry32(seed);
    const cells = {};
    const effects = TRUE_EFFECTS[selectedDV];

    for (const sat of SAT_LEVELS) {
      for (const dis of DISINFO_TYPES) {
        const key = sat.id + '_' + dis.id;
        const baseMean = effects.control[dis.id];
        const satAdd = sat.id === 'treatment' ? effects.satEffect[dis.id] : 0;
        const mu = baseMean + satAdd;
        const data = [];
        for (let i = 0; i < sampleN; i++) {
          let val = srnorm(rng, mu, effects.sigma);
          // Clamp for proportions
          if (selectedDV !== 'time') val = Math.max(0, Math.min(1, val));
          else val = Math.max(5, val);
          data.push(val);
        }
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        const variance = data.reduce((a, b) => a + (b - mean) ** 2, 0) / (data.length - 1);
        const sd = Math.sqrt(variance);
        const se = sd / Math.sqrt(data.length);
        cells[key] = { data, mean, sd, se, n: data.length, mu };
      }
    }

    // ── Two-way ANOVA ──────────────────────────────────────────
    const allData = [];
    for (const sat of SAT_LEVELS) {
      for (const dis of DISINFO_TYPES) {
        const key = sat.id + '_' + dis.id;
        for (const val of cells[key].data) {
          allData.push({ sat: sat.id, dis: dis.id, val });
        }
      }
    }
    const grandMean = allData.reduce((a, d) => a + d.val, 0) / allData.length;
    const N = allData.length;

    // SAT marginal means
    const satMeans = {};
    for (const sat of SAT_LEVELS) {
      const sub = allData.filter(d => d.sat === sat.id);
      satMeans[sat.id] = sub.reduce((a, d) => a + d.val, 0) / sub.length;
    }
    // Disinfo marginal means
    const disMeans = {};
    for (const dis of DISINFO_TYPES) {
      const sub = allData.filter(d => d.dis === dis.id);
      disMeans[dis.id] = sub.reduce((a, d) => a + d.val, 0) / sub.length;
    }
    // Cell means
    const cellMeans = {};
    for (const sat of SAT_LEVELS) {
      for (const dis of DISINFO_TYPES) {
        const key = sat.id + '_' + dis.id;
        cellMeans[key] = cells[key].mean;
      }
    }

    const a = SAT_LEVELS.length; // 2
    const b = DISINFO_TYPES.length; // 3
    const nPerCell = sampleN;

    // SS for SAT factor
    let ssSAT = 0;
    for (const sat of SAT_LEVELS) {
      ssSAT += b * nPerCell * (satMeans[sat.id] - grandMean) ** 2;
    }
    // SS for Disinfo factor
    let ssDIS = 0;
    for (const dis of DISINFO_TYPES) {
      ssDIS += a * nPerCell * (disMeans[dis.id] - grandMean) ** 2;
    }
    // SS interaction
    let ssINT = 0;
    for (const sat of SAT_LEVELS) {
      for (const dis of DISINFO_TYPES) {
        const key = sat.id + '_' + dis.id;
        const expected = satMeans[sat.id] + disMeans[dis.id] - grandMean;
        ssINT += nPerCell * (cellMeans[key] - expected) ** 2;
      }
    }
    // SS within (error)
    let ssW = 0;
    for (const sat of SAT_LEVELS) {
      for (const dis of DISINFO_TYPES) {
        const key = sat.id + '_' + dis.id;
        for (const val of cells[key].data) {
          ssW += (val - cellMeans[key]) ** 2;
        }
      }
    }

    const dfSAT = a - 1; // 1
    const dfDIS = b - 1; // 2
    const dfINT = (a - 1) * (b - 1); // 2
    const dfW = N - a * b; // N - 6
    const ssT = ssSAT + ssDIS + ssINT + ssW;

    const msSAT = ssSAT / dfSAT;
    const msDIS = ssDIS / dfDIS;
    const msINT = ssINT / dfINT;
    const msW = ssW / dfW;

    const fSAT = msSAT / msW;
    const fDIS = msDIS / msW;
    const fINT = msINT / msW;

    const pSAT = quickFP(fSAT, dfSAT, dfW);
    const pDIS = quickFP(fDIS, dfDIS, dfW);
    const pINT = quickFP(fINT, dfINT, dfW);

    // Partial eta-squared
    const etaSAT = ssSAT / (ssSAT + ssW);
    const etaDIS = ssDIS / (ssDIS + ssW);
    const etaINT = ssINT / (ssINT + ssW);

    // Cohen's d for SAT main effect
    const controlAll = allData.filter(d => d.sat === 'control').map(d => d.val);
    const treatAll = allData.filter(d => d.sat === 'treatment').map(d => d.val);
    const cMean = controlAll.reduce((a, b) => a + b, 0) / controlAll.length;
    const tMean = treatAll.reduce((a, b) => a + b, 0) / treatAll.length;
    const cSD = Math.sqrt(controlAll.reduce((a, v) => a + (v - cMean) ** 2, 0) / (controlAll.length - 1));
    const tSD = Math.sqrt(treatAll.reduce((a, v) => a + (v - tMean) ** 2, 0) / (treatAll.length - 1));
    const dMain = cohensD(tMean, tSD, treatAll.length, cMean, cSD, controlAll.length);

    // Per-cell Cohen's d (treatment vs control within each disinfo type)
    const cellDs = {};
    for (const dis of DISINFO_TYPES) {
      const ck = 'control_' + dis.id;
      const tk = 'treatment_' + dis.id;
      cellDs[dis.id] = cohensD(cells[tk].mean, cells[tk].sd, cells[tk].n,
        cells[ck].mean, cells[ck].sd, cells[ck].n);
    }

    setSimData({
      cells, grandMean, satMeans, disMeans, cellMeans,
      anova: {
        sat: { ss: ssSAT, df: dfSAT, ms: msSAT, f: fSAT, p: pSAT, eta: etaSAT },
        dis: { ss: ssDIS, df: dfDIS, ms: msDIS, f: fDIS, p: pDIS, eta: etaDIS },
        int: { ss: ssINT, df: dfINT, ms: msINT, f: fINT, p: pINT, eta: etaINT },
        error: { ss: ssW, df: dfW, ms: msW },
        total: { ss: ssT, df: N - 1 },
      },
      dMain, cellDs, N,
    });
    setSimRun(true);
  }, [seed, sampleN, selectedDV]);

  // ── Helpers ────────────────────────────────────────────────────
  const fmt = (v, d) => v == null ? '--' : v.toFixed(d);
  const pFmt = (p) => {
    if (p == null) return '--';
    if (p < 0.001) return '< .001';
    if (p < 0.01) return '< .01';
    return p.toFixed(3);
  };
  const sigStar = (p) => {
    if (p == null) return '';
    if (p < 0.001) return '***';
    if (p < 0.01) return '**';
    if (p < 0.05) return '*';
    return 'ns';
  };
  const dLabel = (d) => {
    const ad = Math.abs(d);
    if (ad >= 0.8) return 'Large';
    if (ad >= 0.5) return 'Medium';
    if (ad >= 0.2) return 'Small';
    return 'Negligible';
  };

  const dvInfo = DEPENDENT_VARS.find(v => v.id === selectedDV);
  const isInverse = selectedDV === 'calibration'; // lower is better

  // ── SVG bar chart for cell means ───────────────────────────────
  const renderCellBarChart = useCallback(() => {
    if (!simData) return null;
    const W = 580, H = 260, pad = { t: 30, r: 20, b: 50, l: 55 };
    const plotW = W - pad.l - pad.r;
    const plotH = H - pad.t - pad.b;
    const barW = plotW / 8;

    // Get all means and CIs for scale
    const allMeans = [];
    const bars = [];
    let idx = 0;
    for (const dis of DISINFO_TYPES) {
      for (const sat of SAT_LEVELS) {
        const key = sat.id + '_' + dis.id;
        const cell = simData.cells[key];
        const ci95 = 1.96 * cell.se;
        allMeans.push(cell.mean + ci95, cell.mean - ci95);
        bars.push({ key, cell, sat, dis, idx, ci95 });
        idx++;
      }
      idx += 0.5; // gap between groups
    }

    let yMin = Math.min(...allMeans) * 0.85;
    let yMax = Math.max(...allMeans) * 1.1;
    if (selectedDV === 'time') { yMin = Math.max(0, yMin - 5); yMax += 5; }
    else { yMin = Math.max(0, yMin); yMax = Math.min(1, yMax + 0.05); }

    const yScale = (v) => pad.t + plotH * (1 - (v - yMin) / (yMax - yMin));
    const xScale = (i) => pad.l + (i + 0.5) * barW;

    // Y axis ticks
    const yTicks = [];
    const yStep = (yMax - yMin) / 5;
    for (let i = 0; i <= 5; i++) yTicks.push(yMin + i * yStep);

    return React.createElement('svg', { width: W, height: H, style: { display: 'block', margin: '12px auto' } },
      // Grid lines
      ...yTicks.map(v => React.createElement('line', {
        key: 'grid-' + v, x1: pad.l, x2: W - pad.r,
        y1: yScale(v), y2: yScale(v),
        stroke: C.line, strokeWidth: 1,
      })),
      // Y axis labels
      ...yTicks.map(v => React.createElement('text', {
        key: 'ylabel-' + v, x: pad.l - 8, y: yScale(v) + 4,
        fill: C.tx3, fontSize: 12, fontFamily: Mono, textAnchor: 'end',
      }, selectedDV === 'time' ? v.toFixed(0) : (v * 100).toFixed(0) + '%')),
      // Bars
      ...bars.map(({ key, cell, sat, dis, idx: bi, ci95 }) => {
        const x = xScale(bi + Math.floor(bi / 2) * 0.5);
        const y = yScale(cell.mean);
        const yBase = yScale(yMin);
        const color = sat.id === 'treatment' ? C.amber : C.tx3;
        const barHeight = Math.max(1, yBase - y);
        return React.createElement('g', { key },
          React.createElement('rect', {
            x: x - barW * 0.35, y, width: barW * 0.7, height: barHeight,
            fill: color, opacity: 0.7, rx: 2,
          }),
          // CI whisker
          React.createElement('line', {
            x1: x, x2: x, y1: yScale(cell.mean - ci95), y2: yScale(cell.mean + ci95),
            stroke: color, strokeWidth: 2,
          }),
          React.createElement('line', {
            x1: x - 5, x2: x + 5, y1: yScale(cell.mean + ci95), y2: yScale(cell.mean + ci95),
            stroke: color, strokeWidth: 2,
          }),
          React.createElement('line', {
            x1: x - 5, x2: x + 5, y1: yScale(cell.mean - ci95), y2: yScale(cell.mean - ci95),
            stroke: color, strokeWidth: 2,
          }),
          // Mean label
          React.createElement('text', {
            x, y: y - 8, fill: color, fontSize: 12, fontFamily: Mono, textAnchor: 'middle',
          }, selectedDV === 'time' ? cell.mean.toFixed(1) : (cell.mean * 100).toFixed(1) + '%'),
        );
      }),
      // X axis labels (disinfo types)
      ...DISINFO_TYPES.map((dis, di) => {
        const groupX = pad.l + (di * 2.5 + 1.25) * barW + di * barW * 0.25;
        return React.createElement('text', {
          key: 'xlabel-' + dis.id, x: groupX, y: H - pad.b + 16,
          fill: dis.color, fontSize: 11, fontFamily: Sans, textAnchor: 'middle', fontWeight: 600,
        }, dis.short);
      }),
      // Legend
      React.createElement('rect', { x: W - 140, y: 8, width: 10, height: 10, fill: C.tx3, opacity: 0.7, rx: 1 }),
      React.createElement('text', { x: W - 126, y: 17, fill: C.tx3, fontSize: 12, fontFamily: Mono }, 'Control'),
      React.createElement('rect', { x: W - 140, y: 22, width: 10, height: 10, fill: C.amber, opacity: 0.7, rx: 1 }),
      React.createElement('text', { x: W - 126, y: 31, fill: C.amber, fontSize: 12, fontFamily: Mono }, 'SAT'),
    );
  }, [simData, selectedDV]);

  // ── Effect size bar chart ──────────────────────────────────────
  const renderEffectBars = useCallback(() => {
    if (!simData) return null;
    const W = 400, H = 160, pad = { t: 20, r: 20, b: 30, l: 90 };
    const plotW = W - pad.l - pad.r;
    const plotH = H - pad.t - pad.b;

    const items = DISINFO_TYPES.map(dis => ({
      label: dis.short, d: simData.cellDs[dis.id], color: dis.color,
    }));
    items.push({ label: 'Overall', d: simData.dMain, color: C.amber });

    const maxD = Math.max(1.2, ...items.map(i => Math.abs(i.d) + 0.2));
    const barH = plotH / items.length - 4;

    return React.createElement('svg', { width: W, height: H, style: { display: 'block', margin: '8px auto' } },
      // Threshold lines
      ...[0.2, 0.5, 0.8].map(thresh => {
        const x = pad.l + (thresh / maxD) * plotW;
        return React.createElement('g', { key: 'thresh-' + thresh },
          React.createElement('line', {
            x1: x, x2: x, y1: pad.t, y2: H - pad.b,
            stroke: C.line, strokeWidth: 1, strokeDasharray: '3,3',
          }),
          React.createElement('text', {
            x, y: H - pad.b + 12, fill: C.tx3, fontSize: 12, fontFamily: Mono, textAnchor: 'middle',
          }, thresh === 0.2 ? 'Small' : thresh === 0.5 ? 'Medium' : 'Large'),
        );
      }),
      // Bars
      ...items.map((item, i) => {
        const y = pad.t + i * (barH + 4);
        const w = Math.abs(item.d) / maxD * plotW;
        return React.createElement('g', { key: 'ebar-' + i },
          React.createElement('text', {
            x: pad.l - 6, y: y + barH / 2 + 4, fill: item.color, fontSize: 11,
            fontFamily: Sans, textAnchor: 'end', fontWeight: 600,
          }, item.label),
          React.createElement('rect', {
            x: pad.l, y, width: Math.max(2, w), height: barH,
            fill: item.color, opacity: 0.6, rx: 2,
          }),
          React.createElement('text', {
            x: pad.l + w + 6, y: y + barH / 2 + 4, fill: item.color, fontSize: 12, fontFamily: Mono,
          }, 'd = ' + fmt(item.d, 2) + ' (' + dLabel(item.d) + ')'),
        );
      }),
    );
  }, [simData]);

  // ── Power curve SVG ────────────────────────────────────────────
  const renderPowerCurve = useCallback(() => {
    const W = 500, H = 220, pad = { t: 20, r: 20, b: 40, l: 50 };
    const plotW = W - pad.l - pad.r;
    const plotH = H - pad.t - pad.b;

    const xScale = (n) => pad.l + ((n - 5) / 75) * plotW;
    const yScale = (p) => pad.t + plotH * (1 - p);

    const pathD = powerCurve.map((pt, i) =>
      (i === 0 ? 'M' : 'L') + xScale(pt.n).toFixed(1) + ',' + yScale(pt.power).toFixed(1)
    ).join(' ');

    return React.createElement('svg', { width: W, height: H, style: { display: 'block', margin: '12px auto' } },
      // Grid
      ...[0, 0.2, 0.4, 0.6, 0.8, 1.0].map(v => React.createElement('g', { key: 'pgrid-' + v },
        React.createElement('line', {
          x1: pad.l, x2: W - pad.r, y1: yScale(v), y2: yScale(v),
          stroke: C.line, strokeWidth: 1,
        }),
        React.createElement('text', {
          x: pad.l - 8, y: yScale(v) + 4, fill: C.tx3, fontSize: 12, fontFamily: Mono, textAnchor: 'end',
        }, (v * 100).toFixed(0) + '%'),
      )),
      // 80% threshold line
      React.createElement('line', {
        x1: pad.l, x2: W - pad.r, y1: yScale(0.8), y2: yScale(0.8),
        stroke: C.amber, strokeWidth: 1, strokeDasharray: '6,3', opacity: 0.6,
      }),
      React.createElement('text', {
        x: W - pad.r + 2, y: yScale(0.8) + 4, fill: C.amber, fontSize: 11, fontFamily: Mono, opacity: 0.8,
      }, '80%'),
      // Curve
      React.createElement('path', {
        d: pathD, fill: 'none', stroke: C.amber, strokeWidth: 2,
      }),
      // Current N marker
      React.createElement('circle', {
        cx: xScale(sampleN), cy: yScale(powerCurve.find(p => p.n === sampleN)?.power || 0),
        r: 5, fill: C.amber, stroke: C.bg, strokeWidth: 2,
      }),
      React.createElement('text', {
        x: xScale(sampleN), y: yScale(powerCurve.find(p => p.n === sampleN)?.power || 0) - 12,
        fill: C.amber, fontSize: 12, fontFamily: Mono, textAnchor: 'middle', fontWeight: 700,
      }, 'n=' + sampleN),
      // X axis labels
      ...[10, 20, 30, 40, 50, 60, 70, 80].map(n => React.createElement('text', {
        key: 'xn-' + n, x: xScale(n), y: H - pad.b + 16,
        fill: C.tx3, fontSize: 12, fontFamily: Mono, textAnchor: 'middle',
      }, n)),
      // Axis labels
      React.createElement('text', {
        x: W / 2, y: H - 4, fill: C.tx2, fontSize: 11, fontFamily: Sans, textAnchor: 'middle',
      }, 'Sample Size per Cell (n)'),
      React.createElement('text', {
        x: 12, y: H / 2, fill: C.tx2, fontSize: 11, fontFamily: Sans, textAnchor: 'middle',
        transform: 'rotate(-90, 12, ' + H / 2 + ')',
      }, 'Power (1 - beta)'),
    );
  }, [sampleN, powerCurve]);

  // ── Render: Tab bar ────────────────────────────────────────────
  const TabBar = () => (
    React.createElement('div', { style: {
      display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid ' + C.line,
      paddingBottom: 8, flexWrap: 'wrap',
    }},
      ...FW_TABS.map(t => React.createElement('button', {
        key: t.id,
        onClick: () => setTab(t.id),
        style: {
          fontFamily: Mono, fontSize: 11, padding: '6px 14px', borderRadius: '4px 4px 0 0',
          border: tab === t.id ? '1px solid ' + C.amberDm : '1px solid transparent',
          borderBottom: tab === t.id ? '2px solid ' + C.amber : '2px solid transparent',
          background: tab === t.id ? C.amberBg : 'transparent',
          color: tab === t.id ? C.amber : C.tx3,
          cursor: 'pointer', transition: 'all .15s ease',
          letterSpacing: '.04em',
        },
      }, t.num + ' ' + t.label)),
    )
  );

  // ── Render: Design Panel ───────────────────────────────────────
  const renderDesign = () => React.createElement('div', null,
    // 2x3 Matrix Display
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
      React.createElement('div', { style: { width: 4, height: 28, background: C.amber, borderRadius: 2 } }),
      React.createElement('h2', { style: { fontFamily: Serif, fontSize: 20, color: C.tx, fontWeight: 700, margin: 0 } },
        '2 \u00D7 3 Factorial Design'),
      FactorialIcon
    ),
    TipBox('factorial_design'),
    React.createElement('p', { style: { fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.6, marginBottom: 16, maxWidth: 680 } },
      'Between-subjects design with random assignment to one of six experimental conditions. Each cell tests one combination of SAT training level and disinformation type. All analysts receive the same intelligence scenario; the manipulations are orthogonal.'),

    // Interactive Matrix
    React.createElement('div', { style: { overflowX: 'auto', marginBottom: 24 } },
      React.createElement('table', { style: { borderCollapse: 'collapse', width: '100%', maxWidth: 700, margin: '0 auto' } },
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', { style: { padding: 10, fontFamily: Mono, fontSize: 12, color: C.tx3, textAlign: 'left', borderBottom: '1px solid ' + C.line } }, ''),
            ...DISINFO_TYPES.map(d => React.createElement('th', { key: d.id, style: {
              padding: 10, fontFamily: Sans, fontSize: 12, color: d.color, textAlign: 'center',
              borderBottom: '1px solid ' + C.line, fontWeight: 600,
            } },
              React.createElement('div', null, 'Type ' + d.id + ': ' + d.short),
              React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.tx3, fontWeight: 400, marginTop: 2 } }, d.desc.slice(0, 50) + '...'),
            )),
          ),
        ),
        React.createElement('tbody', null,
          ...SAT_LEVELS.map((sat, si) => React.createElement('tr', { key: sat.id },
            React.createElement('td', { style: {
              padding: 10, fontFamily: Sans, fontSize: 12, color: si === 1 ? C.amber : C.tx2,
              fontWeight: 600, borderBottom: '1px solid ' + C.line, whiteSpace: 'nowrap',
            } }, sat.label),
            ...DISINFO_TYPES.map((dis, di) => {
              const cellNum = si * 3 + di + 1;
              return React.createElement('td', { key: dis.id, style: {
                padding: 12, textAlign: 'center', borderBottom: '1px solid ' + C.line,
                border: '1px solid ' + C.line, background: si === 1 ? C.amberBg : 'transparent',
              } },
                React.createElement('div', { style: { fontFamily: Mono, fontSize: 16, fontWeight: 700, color: si === 1 ? C.amber : C.tx3 } },
                  'Cell ' + cellNum),
                React.createElement('div', { style: { fontFamily: Mono, fontSize: 12, color: C.tx3, marginTop: 4 } },
                  'n = ' + sampleN),
              );
            }),
          )),
        ),
      ),
    ),

    // Sample Size Slider
    React.createElement('div', { style: {
      padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginBottom: 20,
    } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('span', { style: { fontFamily: Mono, fontSize: 11, color: C.amber, textTransform: 'uppercase', letterSpacing: '.06em' } },
          'Sample Size Configuration'),
        React.createElement('span', { style: { fontFamily: Mono, fontSize: 12, color: C.tx, fontWeight: 700 } },
          'N = ' + (sampleN * 6) + ' total (' + sampleN + ' per cell)'),
      ),
      React.createElement('input', {
        type: 'range', min: 5, max: 80, value: sampleN,
        onChange: (e) => setSampleN(parseInt(e.target.value)),
        style: { width: '100%', accentColor: C.amber },
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontFamily: Mono, fontSize: 11, color: C.tx3 } },
        React.createElement('span', null, '5/cell (30 total)'),
        React.createElement('span', null, '80/cell (480 total)'),
      ),
    ),

    // Power Analysis Curve
    React.createElement('div', { style: {
      padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginBottom: 20,
    } },
      React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.amber, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 } },
        'A Priori Power Analysis', ReplicateIcon),
      TipBox('replication_crisis'),
      React.createElement('p', { style: { fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.55, marginBottom: 8 } },
        'Statistical power to detect a large main effect (d = 0.80) of SAT training at alpha = .05. Cohen (1988) recommends power >= .80 to avoid Type II errors. The curve shows how power increases with sample size per cell.'),
      renderPowerCurve(),
      React.createElement('div', { style: { display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 } },
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.tx } },
          React.createElement('span', { style: { color: C.tx3 } }, 'Required n/cell for 80% power: '),
          React.createElement('span', { style: { color: C.amber, fontWeight: 700 } }, requiredN.n),
          React.createElement('span', { style: { color: C.tx3 } }, ' (' + requiredN.totalN + ' total)'),
        ),
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.tx } },
          React.createElement('span', { style: { color: C.tx3 } }, 'Current power: '),
          React.createElement('span', { style: { color: (powerCurve.find(p => p.n === sampleN)?.power || 0) >= 0.8 ? C.green : C.red, fontWeight: 700 } },
            ((powerCurve.find(p => p.n === sampleN)?.power || 0) * 100).toFixed(1) + '%'),
        ),
      ),
    ),

    // Dependent Variables
    React.createElement('div', { style: {
      padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6,
    } },
      React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.amber, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 12 } },
        'Dependent Variables'),
      ...DEPENDENT_VARS.map(dv => React.createElement('div', { key: dv.id, style: {
        padding: 10, marginBottom: 6, borderRadius: 4,
        border: '1px solid ' + (selectedDV === dv.id ? C.amberDm : C.line),
        background: selectedDV === dv.id ? C.amberBg : 'transparent',
        cursor: 'pointer', transition: 'all .12s ease',
      }, onClick: () => setSelectedDV(dv.id) },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('span', { style: { fontFamily: Sans, fontSize: 13, fontWeight: 600, color: selectedDV === dv.id ? C.amber : C.tx } }, dv.label),
            React.createElement('span', { style: { fontFamily: Mono, fontSize: 12, color: C.tx3, marginLeft: 8 } }, '(' + dv.unit + ')'),
          ),
          React.createElement('span', { style: { fontFamily: Mono, fontSize: 12, color: C.tx3 } }, 'Baseline: ' + dv.baseline),
        ),
        React.createElement('p', { style: { fontFamily: Serif, fontSize: 11, color: C.tx2, marginTop: 4, lineHeight: 1.65 } }, dv.desc),
      )),
    ),
  );

  // ── Render: Hypotheses Panel ───────────────────────────────────
  const renderHypotheses = () => React.createElement('div', null,
    React.createElement('h2', { style: { fontFamily: Serif, fontSize: 20, color: C.tx, marginBottom: 6, fontWeight: 700 } },
      'Research Hypotheses'),
    React.createElement('p', { style: { fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.6, marginBottom: 20, maxWidth: 680 } },
      'Four pre-registered hypotheses derived from the cognitive bias and analytic tradecraft literatures. Each specifies a testable prediction with an associated statistical test and expected effect magnitude.'),

    ...HYPOTHESES.map(h => React.createElement('div', { key: h.id, style: {
      padding: '18px 16px 16px', background: 'rgba(14,18,24,.94)', border: '1px solid rgba(100,180,220,.12)', borderLeft: '4px solid ' + C.amber + '60', borderRadius: '0 4px 4px 0', marginBottom: 12, boxShadow: '2px 2px 8px rgba(0,0,0,.15)', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(80,140,180,.02) 23px, rgba(80,140,180,.02) 24px)',
    } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 } },
        React.createElement('span', { style: {
          fontFamily: Mono, fontSize: 11, fontWeight: 700, color: C.amber,
          background: C.amberBg, padding: '3px 8px', borderRadius: 3, flexShrink: 0,
        } }, h.id),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontFamily: Sans, fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 6 } }, h.label),
          React.createElement('p', { style: { fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.6, marginBottom: 8 } }, h.text),
          React.createElement('div', { style: { display: 'flex', gap: 16, flexWrap: 'wrap' } },
            React.createElement('span', { style: { fontFamily: Mono, fontSize: 12, color: C.gold, background: C.goldBg, padding: '2px 6px', borderRadius: 3 } }, h.stat),
            React.createElement('span', { style: { fontFamily: Mono, fontSize: 12, color: C.green, background: C.greenBg, padding: '2px 6px', borderRadius: 3 } }, h.expected),
          ),
        ),
      ),
      // Note field
      React.createElement('div', { style: { marginTop: 10, paddingTop: 10, borderTop: '1px solid ' + C.line } },
        React.createElement('label', { style: { fontFamily: Mono, fontSize: 11, color: C.tx3, display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.06em' } },
          'Your prediction (optional)'),
        React.createElement('textarea', {
          value: hypothesisNotes[h.id],
          onChange: (e) => setHypothesisNotes(prev => ({ ...prev, [h.id]: e.target.value })),
          placeholder: 'State your directional prediction for this hypothesis...',
          rows: 2,
          style: {
            width: '100%', fontFamily: Serif, fontSize: 12, color: C.tx,
            background: 'rgba(0,0,0,.3)', border: '1px solid ' + C.line,
            borderRadius: 4, padding: 8, resize: 'vertical',
          },
        }),
      ),
    )),

    // Hypothesis interaction diagram
    React.createElement('div', { style: {
      padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginTop: 8,
    } },
      React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.amber, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 } },
        'Predicted Interaction Pattern'),
      React.createElement('p', { style: { fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.55, marginBottom: 12 } },
        'H4 predicts a disordinal interaction: SAT training helps most against Type B (false HUMINT) because structured techniques force explicit source evaluation, exposing fabricated provenance chains. Against Type A (deepfake), SATs provide moderate benefit by encouraging multi-source verification. Against Type C (campaign), SATs help least because volume-based deception overwhelms individual analytic frameworks.'),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' } },
        ...DISINFO_TYPES.map(dis => React.createElement('div', { key: dis.id, style: { textAlign: 'center' } },
          React.createElement('div', { style: { fontFamily: Sans, fontSize: 12, color: dis.color, fontWeight: 600, marginBottom: 4 } }, 'Type ' + dis.id),
          React.createElement('div', { style: {
            fontFamily: Mono, fontSize: 24, fontWeight: 700,
            color: dis.id === 'B' ? C.green : dis.id === 'A' ? C.gold : C.tx3,
          } },
            dis.id === 'B' ? '\u2191\u2191\u2191' : dis.id === 'A' ? '\u2191\u2191' : '\u2191'),
          React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.tx3 } },
            dis.id === 'B' ? 'Strongest SAT effect' : dis.id === 'A' ? 'Moderate SAT effect' : 'Weakest SAT effect'),
        )),
      ),
    ),
  );

  // ── Render: Simulation Panel ───────────────────────────────────
  const renderSimulation = () => React.createElement('div', null,
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 } },
      // Oscilloscope wave decoration
      React.createElement('svg', { width: 28, height: 20, viewBox: '0 0 28 20', style: { opacity: 0.5 } },
        React.createElement('path', { d: 'M0 10 Q3 2 7 10 Q11 18 14 10 Q17 2 21 10 Q25 18 28 10', fill: 'none', stroke: C.amber, strokeWidth: 1.5 })
      ),
      React.createElement('h2', { style: { fontFamily: Serif, fontSize: 20, color: C.tx, fontWeight: 700, margin: 0 } },
        'Monte Carlo Simulation')
    ),
    React.createElement('p', { style: { fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.6, marginBottom: 16, maxWidth: 680 } },
      'Generate plausible experimental data based on effect size estimates from the disinformation detection literature. Each simulation draws from normal distributions with cell-specific means and shared variance, then computes full two-way ANOVA. Change the seed to see how sampling variability affects results.'),

    // Controls
    React.createElement('div', { style: {
      display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center',
    } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
        React.createElement('label', { style: { fontFamily: Mono, fontSize: 12, color: C.tx3 } }, 'SEED'),
        React.createElement('input', {
          type: 'number', value: seed, onChange: (e) => { setSeed(parseInt(e.target.value) || 1); setSimRun(false); },
          style: {
            fontFamily: Mono, fontSize: 12, width: 70, padding: '4px 8px',
            background: 'rgba(0,0,0,.4)', border: '1px solid ' + C.line,
            borderRadius: 3, color: C.tx, textAlign: 'center',
          },
        }),
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
        React.createElement('label', { style: { fontFamily: Mono, fontSize: 12, color: C.tx3 } }, 'DV'),
        React.createElement('select', {
          value: selectedDV,
          onChange: (e) => { setSelectedDV(e.target.value); setSimRun(false); },
          style: {
            fontFamily: Mono, fontSize: 11, padding: '4px 8px',
            background: 'rgba(0,0,0,.4)', border: '1px solid ' + C.line,
            borderRadius: 3, color: C.tx,
          },
        },
          ...DEPENDENT_VARS.map(dv => React.createElement('option', { key: dv.id, value: dv.id }, dv.label)),
        ),
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
        React.createElement('label', { style: { fontFamily: Mono, fontSize: 12, color: C.tx3 } }, 'n/CELL'),
        React.createElement('span', { style: { fontFamily: Mono, fontSize: 12, color: C.amber, fontWeight: 700 } }, sampleN),
      ),
      React.createElement('button', {
        onClick: runSimulation,
        style: {
          fontFamily: Mono, fontSize: 11, padding: '6px 18px', borderRadius: 4,
          background: C.amber, color: '#000', border: 'none', fontWeight: 700,
          cursor: 'pointer', letterSpacing: '.04em',
        },
      }, simRun ? '\u21BB RE-RUN SIMULATION' : '\u25B6 RUN SIMULATION'),
    ),

    // Results
    simData && React.createElement('div', null,
      // Cell means chart
      React.createElement('div', { style: {
        padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginBottom: 16,
      } },
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.amber, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 } },
          'Cell Means with 95% Confidence Intervals'),
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 12, color: C.tx3, marginBottom: 8 } },
          dvInfo.label + ' (' + dvInfo.unit + ') \— N = ' + simData.N),
        renderCellBarChart(),
      ),

      // Cell statistics table
      React.createElement('div', { style: {
        padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginBottom: 16,
      } },
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.amber, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 12 } },
          'Descriptive Statistics by Cell'),
        React.createElement('div', { style: { overflowX: 'auto' } },
          React.createElement('table', { style: { borderCollapse: 'collapse', width: '100%' } },
            React.createElement('thead', null,
              React.createElement('tr', null,
                ...['Cell', 'Condition', 'n', 'Mean', 'SD', 'SE', '95% CI'].map(h =>
                  React.createElement('th', { key: h, style: {
                    padding: '6px 10px', fontFamily: Mono, fontSize: 12, color: C.tx3,
                    textAlign: h === 'Cell' || h === 'Condition' ? 'left' : 'right',
                    borderBottom: '1px solid ' + C.line,
                  } }, h)),
              ),
            ),
            React.createElement('tbody', null,
              ...SAT_LEVELS.flatMap((sat, si) => DISINFO_TYPES.map((dis, di) => {
                const key = sat.id + '_' + dis.id;
                const cell = simData.cells[key];
                const ci = 1.96 * cell.se;
                const cellNum = si * 3 + di + 1;
                const fmtV = (v) => selectedDV === 'time' ? v.toFixed(1) : (v * 100).toFixed(1) + '%';
                return React.createElement('tr', { key, style: { background: si === 1 ? C.amberBg : 'transparent' } },
                  React.createElement('td', { style: { padding: '5px 10px', fontFamily: Mono, fontSize: 11, color: C.tx } }, cellNum),
                  React.createElement('td', { style: { padding: '5px 10px', fontFamily: Sans, fontSize: 11, color: si === 1 ? C.amber : C.tx2 } },
                    sat.short + ' \u00D7 ' + dis.short),
                  React.createElement('td', { style: { padding: '5px 10px', fontFamily: Mono, fontSize: 11, color: C.tx, textAlign: 'right' } }, cell.n),
                  React.createElement('td', { style: { padding: '5px 10px', fontFamily: Mono, fontSize: 11, color: C.tx, textAlign: 'right', fontWeight: 600 } }, fmtV(cell.mean)),
                  React.createElement('td', { style: { padding: '5px 10px', fontFamily: Mono, fontSize: 11, color: C.tx3, textAlign: 'right' } }, fmtV(cell.sd)),
                  React.createElement('td', { style: { padding: '5px 10px', fontFamily: Mono, fontSize: 11, color: C.tx3, textAlign: 'right' } }, fmtV(cell.se)),
                  React.createElement('td', { style: { padding: '5px 10px', fontFamily: Mono, fontSize: 11, color: C.tx3, textAlign: 'right' } },
                    '[' + fmtV(cell.mean - ci) + ', ' + fmtV(cell.mean + ci) + ']'),
                );
              })),
            ),
          ),
        ),
      ),
    ),

    !simData && React.createElement('div', { style: {
      padding: 40, textAlign: 'center', background: C.card, border: '1px solid ' + C.cardBd,
      borderRadius: 6,
    } },
      React.createElement('p', { style: { fontFamily: Serif, fontSize: 14, color: C.tx3, marginBottom: 8 } },
        'Configure parameters above and click RUN SIMULATION to generate data.'),
      React.createElement('p', { style: { fontFamily: Mono, fontSize: 12, color: C.tx3 } },
        'Each run draws ' + (sampleN * 6) + ' observations from 6 normal distributions.'),
    ),
  );

  // ── Render: Analysis Panel ─────────────────────────────────────
  const renderAnalysis = () => React.createElement('div', null,
    React.createElement('h2', { style: { fontFamily: Serif, fontSize: 20, color: C.tx, marginBottom: 6, fontWeight: 700 } },
      'Statistical Analysis'),

    !simData && React.createElement('div', { style: {
      padding: 30, textAlign: 'center', background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6,
    } },
      React.createElement('p', { style: { fontFamily: Serif, fontSize: 14, color: C.tx3 } },
        'Run a simulation first (tab 03) to generate data for analysis.'),
    ),

    simData && React.createElement('div', null,
      // ANOVA Table
      React.createElement('div', { style: {
        padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginBottom: 16,
      } },
        // Published research paper table styling
        React.createElement('div', { style: { fontFamily: Serif, fontSize: 13, fontWeight: 700, color: C.tx, marginBottom: 2, textAlign: 'center' } },
          'Table 1'),
        React.createElement('div', { style: { fontFamily: Serif, fontSize: 12, fontStyle: 'italic', color: C.tx2, marginBottom: 12, textAlign: 'center' } },
          'Two-Way Analysis of Variance for ' + dvInfo.label + ' as a Function of SAT Training and Disinformation Type'),
        React.createElement('div', { style: { overflowX: 'auto' } },
          React.createElement('table', { style: { borderCollapse: 'collapse', width: '100%', borderTop: '3px solid ' + C.tx3, borderBottom: '3px solid ' + C.tx3 } },
            React.createElement('thead', null,
              React.createElement('tr', null,
                ...['Source', 'SS', 'df', 'MS', 'F', 'p', '\u03B7\u00B2p', 'Sig.'].map(h =>
                  React.createElement('th', { key: h, style: {
                    padding: '6px 10px', fontFamily: Mono, fontSize: 12, color: C.tx3,
                    textAlign: h === 'Source' ? 'left' : 'right',
                    borderBottom: '2px solid ' + C.line,
                  } }, h)),
              ),
            ),
            React.createElement('tbody', null,
              ...[
                { label: 'SAT Training', key: 'sat' },
                { label: 'Disinfo Type', key: 'dis' },
                { label: 'SAT \u00D7 Type', key: 'int' },
                { label: 'Error', key: 'error' },
                { label: 'Total', key: 'total' },
              ].map(row => {
                const d = simData.anova[row.key];
                const isEffect = row.key !== 'error' && row.key !== 'total';
                const sig = isEffect && d.p != null ? d.p < 0.05 : false;
                return React.createElement('tr', { key: row.key, style: {
                  background: sig ? C.amberBg : 'transparent',
                  borderBottom: row.key === 'total' ? '2px solid ' + C.line : '1px solid ' + C.line,
                } },
                  React.createElement('td', { style: { padding: '6px 10px', fontFamily: Sans, fontSize: 11, color: sig ? C.amber : C.tx, fontWeight: isEffect ? 600 : 400 } }, row.label),
                  React.createElement('td', { style: { padding: '6px 10px', fontFamily: Mono, fontSize: 11, color: C.tx, textAlign: 'right' } }, fmt(d.ss, 4)),
                  React.createElement('td', { style: { padding: '6px 10px', fontFamily: Mono, fontSize: 11, color: C.tx3, textAlign: 'right' } }, d.df),
                  React.createElement('td', { style: { padding: '6px 10px', fontFamily: Mono, fontSize: 11, color: C.tx, textAlign: 'right' } }, d.ms != null ? fmt(d.ms, 4) : ''),
                  React.createElement('td', { style: { padding: '6px 10px', fontFamily: Mono, fontSize: 11, color: sig ? C.amber : C.tx, textAlign: 'right', fontWeight: 700 } }, d.f != null ? fmt(d.f, 2) : ''),
                  React.createElement('td', { style: { padding: '6px 10px', fontFamily: Mono, fontSize: 11, color: sig ? C.green : C.tx3, textAlign: 'right' } }, d.p != null ? pFmt(d.p) : ''),
                  React.createElement('td', { style: { padding: '6px 10px', fontFamily: Mono, fontSize: 11, color: C.tx3, textAlign: 'right' } }, d.eta != null ? fmt(d.eta, 3) : ''),
                  React.createElement('td', { style: { padding: '6px 10px', fontFamily: Mono, fontSize: 11, color: sig ? C.green : C.red, textAlign: 'right', fontWeight: 700 } }, isEffect ? sigStar(d.p) : ''),
                );
              }),
            ),
          ),
        ),
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.tx3, marginTop: 8 } },
          '* p < .05, ** p < .01, *** p < .001. \u03B7\u00B2p = partial eta-squared.'),
      ),

      // Effect Sizes
      React.createElement('div', { style: {
        padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginBottom: 16,
      } },
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.amber, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 } },
          "Cohen's d Effect Sizes (SAT vs. Control)", EffectSizeIcon),
        TipBox('effect_size'),
        React.createElement('p', { style: { fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.55, marginBottom: 8 } },
          "Standardized mean differences between SAT-trained and control groups within each disinformation type. Benchmarks: |d| = 0.2 (small), 0.5 (medium), 0.8 (large) per Cohen (1988)."),
        renderEffectBars(),
      ),

      // Hypothesis verdicts
      React.createElement('div', { style: {
        padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6,
      } },
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.amber, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 12 } },
          'Hypothesis Verdicts'),
        ...[
          { id: 'H1', test: 'SAT main effect', supported: simData.anova.sat.p < 0.05,
            detail: 'F(' + simData.anova.sat.df + ', ' + simData.anova.error.df + ') = ' + fmt(simData.anova.sat.f, 2) + ', p = ' + pFmt(simData.anova.sat.p) + ', d = ' + fmt(simData.dMain, 2) },
          { id: 'H2', test: 'SAT x Type interaction', supported: simData.anova.int.p < 0.05,
            detail: 'F(' + simData.anova.int.df + ', ' + simData.anova.error.df + ') = ' + fmt(simData.anova.int.f, 2) + ', p = ' + pFmt(simData.anova.int.p) + ', \u03B7\u00B2p = ' + fmt(simData.anova.int.eta, 3) },
          { id: 'H3', test: 'Calibration improvement', supported: selectedDV === 'calibration' ? simData.anova.sat.p < 0.05 : null,
            detail: selectedDV === 'calibration' ? 'Tested on current DV (Brier score)' : 'Switch DV to Confidence Calibration to test' },
          { id: 'H4', test: 'Largest SAT effect for Type B', supported: simData.cellDs.B > simData.cellDs.A && simData.cellDs.B > simData.cellDs.C,
            detail: 'Type B d = ' + fmt(simData.cellDs.B, 2) + ' vs. Type A d = ' + fmt(simData.cellDs.A, 2) + ', Type C d = ' + fmt(simData.cellDs.C, 2) },
        ].map(h => React.createElement('div', { key: h.id, style: {
          display: 'flex', alignItems: 'flex-start', gap: 10, padding: 10,
          marginBottom: 6, borderRadius: 4, border: '1px solid ' + C.line,
          background: h.supported === true ? C.greenBg : h.supported === false ? C.redBg : 'transparent',
        } },
          React.createElement('span', { style: {
            fontFamily: Mono, fontSize: 12, fontWeight: 700, padding: '2px 6px', borderRadius: 3,
            color: h.supported === true ? C.green : h.supported === false ? C.red : C.tx3,
            background: h.supported === true ? C.greenBg : h.supported === false ? C.redBg : C.line,
          } }, h.id),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 } },
              React.createElement('span', { style: { fontFamily: Sans, fontSize: 12, color: C.tx, fontWeight: 600 } }, h.test),
              React.createElement('span', { style: {
                fontFamily: Mono, fontSize: 11, fontWeight: 700, padding: '1px 6px', borderRadius: 3,
                color: h.supported === true ? C.green : h.supported === false ? C.red : C.tx3,
                background: h.supported === true ? C.greenBg : h.supported === false ? C.redBg : 'transparent',
              } }, h.supported === true ? 'SUPPORTED' : h.supported === false ? 'NOT SUPPORTED' : 'PENDING'),
            ),
            React.createElement('span', { style: { fontFamily: Mono, fontSize: 12, color: C.tx3 } }, h.detail),
          ),
        )),
      ),
    ),
  );

  // ── Render: Implications Panel ─────────────────────────────────
  const renderImplications = () => React.createElement('div', null,
    React.createElement('h2', { style: { fontFamily: Serif, fontSize: 20, color: C.tx, marginBottom: 6, fontWeight: 700 } },
      'Implications for IC Doctrine', AdversarialIcon),
    TipBox('adversarial_ml'),
    React.createElement('p', { style: { fontFamily: Serif, fontSize: 13, color: C.tx2, lineHeight: 1.6, marginBottom: 20, maxWidth: 680 } },
      'What do these findings mean for how the Intelligence Community should integrate Structured Analytic Techniques into AI-era analytic tradecraft? Four policy domains emerge.'),

    // Implication cards
    ...[
      { title: 'Analytic Tradecraft Standards (ICD 203)', icon: '\u2666',
        finding: 'If H1 is supported, SAT training demonstrably improves analyst resilience to adversarial AI content. This provides empirical justification for expanding ICD 203 mandates to require SAT application whenever LLM-generated or AI-synthesized source material is present in the analytic chain.',
        recommendation: 'Amend ICD 203 Analytic Standard B (Properly Describe Quality and Credibility of Sources) to include mandatory SAT disclosure when any source material may have been AI-generated.',
        risk: 'Over-mandating SATs could create compliance theater. The treatment must be proportionate to the disinformation vector.' },
      { title: 'AI Tool Integration Policy', icon: '\u2693',
        finding: 'If H2/H4 are supported (SATs are differentially effective by disinformation type), the IC cannot adopt a one-size-fits-all defensive posture. Visual deception may require different countermeasures than textual or volume-based manipulation.',
        recommendation: 'Develop a disinformation-type-specific SAT deployment matrix. Pair ACH with HUMINT processing, deepfake detection tools with visual analysis, and network analysis with social media campaign assessment.',
        risk: 'Type-specific protocols add complexity to already overburdened analytic workflows. Must be embedded in tools, not added as manual overhead.' },
      { title: 'Analyst Training and Certification', icon: '\u2691',
        finding: 'If H3 is supported (SATs improve calibration), training interventions produce measurable metacognitive improvement. This supports investment in calibration training beyond tradecraft compliance.',
        recommendation: 'Incorporate calibration exercises into analyst certification programs. Use Brier scores as a longitudinal performance metric for individual analysts and analytic units.',
        risk: 'Calibration measurement can be gamed if analysts learn the scoring function without internalizing genuine uncertainty appreciation.' },
      { title: 'Red Team and Adversarial Testing', icon: '\u2694',
        finding: 'The experimental design itself demonstrates a methodology for adversarial testing of analytic processes. The IC should routinely inject controlled disinformation into training scenarios to measure institutional resilience.',
        recommendation: 'Establish a permanent adversarial testing program that uses AI-generated disinformation in tabletop exercises, with SAT training as the primary defensive intervention. Measure detection rates quarterly.',
        risk: 'Routine exposure to fabricated intelligence could erode trust in legitimate sourcing if not carefully managed.' },
    ].map((imp, i) => React.createElement('div', { key: i, style: {
      padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginBottom: 12,
    } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
        React.createElement('span', { style: { fontSize: 18, color: C.amber } }, imp.icon),
        React.createElement('h3', { style: { fontFamily: Sans, fontSize: 14, fontWeight: 700, color: C.tx, margin: 0 } }, imp.title),
      ),
      React.createElement('div', { style: { marginBottom: 10 } },
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.amber, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 } }, 'Finding'),
        React.createElement('p', { style: { fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.6 } }, imp.finding),
      ),
      React.createElement('div', { style: { marginBottom: 10 } },
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.green, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 } }, 'Recommendation'),
        React.createElement('p', { style: { fontFamily: Serif, fontSize: 12, color: C.tx2, lineHeight: 1.6 } }, imp.recommendation),
      ),
      React.createElement('div', null,
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.red, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 } }, 'Risk'),
        React.createElement('p', { style: { fontFamily: Serif, fontSize: 12, color: C.tx3, lineHeight: 1.6 } }, imp.risk),
      ),
    )),

    // Provenance strip
    React.createElement('div', { style: {
      padding: 16, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, marginTop: 8,
    } },
      React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.amber, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 } },
        'Provenance'),
      React.createElement('div', { style: { fontFamily: Mono, fontSize: 12, color: C.tx3, marginBottom: 12, lineHeight: 1.65 } },
        'Georgetown SFS MSFS \— MPAI 7990 Capstone \— Advisor: Dr. Shay Hershkovitz \— Defense: September 2026 \— IRB Protocol Pending'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
        ...PROVENANCE.map((p, i) => React.createElement('div', { key: i, style: {
          display: 'flex', gap: 8, alignItems: 'baseline',
        } },
          React.createElement('span', { style: { fontFamily: Mono, fontSize: 12, color: C.gold, flexShrink: 0 } },
            p.author + ' (' + p.year + ')'),
          React.createElement('span', { style: { fontFamily: Serif, fontSize: 11, color: C.tx2, fontStyle: 'italic' } }, p.work),
          React.createElement('span', { style: { fontFamily: Mono, fontSize: 11, color: C.tx3 } }, '\— ' + p.relevance),
        )),
      ),
    ),

    // Thesis status
    React.createElement('div', { style: {
      padding: 16, background: 'rgba(232,144,32,.04)', border: '1px solid rgba(232,144,32,.15)',
      borderRadius: 6, marginTop: 12,
    } },
      React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.amber, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 } },
        'Thesis Status'),
      React.createElement('div', { style: { display: 'flex', gap: 20, flexWrap: 'wrap' } },
        ...[
          { label: 'Literature Review', status: 'Complete', color: C.green },
          { label: 'Experimental Design', status: 'Complete', color: C.green },
          { label: 'IRB Submission', status: 'In Progress', color: C.amber },
          { label: 'Pilot Study', status: 'Pending', color: C.tx3 },
          { label: 'Data Collection', status: 'Pending', color: C.tx3 },
          { label: 'Analysis', status: 'Pending', color: C.tx3 },
          { label: 'Defense', status: 'Sep 2026', color: C.tx3 },
        ].map(s => React.createElement('div', { key: s.label, style: { textAlign: 'center' } },
          React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, color: C.tx3, marginBottom: 2 } }, s.label),
          React.createElement('div', { style: { fontFamily: Mono, fontSize: 11, fontWeight: 700, color: s.color } }, s.status),
        )),
      ),
    ),
  );

  // ══════════════════════════════════════════════════════════════
  // Main render
  // ══════════════════════════════════════════════════════════════
  return React.createElement('div', { style: {
    minHeight: '100vh', background: C.bg, backgroundImage: LAB_GRID + ', ' + LAB_GRID_MAJOR, color: C.tx, fontFamily: Sans, position: 'relative', overflow: 'hidden',
  } },
    // Lab equipment silhouette decorations
    React.createElement('div', { style: { position: 'fixed', top: 80, right: 30, pointerEvents: 'none' } },
      React.createElement(FlaskSVG)
    ),
    React.createElement('div', { style: { position: 'fixed', bottom: 40, left: 20, pointerEvents: 'none' } },
      React.createElement(BeakerSVG)
    ),
    React.createElement('div', { style: { position: 'fixed', top: 200, left: 40, pointerEvents: 'none' } },
      React.createElement(MicroscopeSVG)
    ),
    // Sticky header
    React.createElement('div', { style: {
      position: 'sticky', top: 0, zIndex: 100,
      background: C.bg + 'ee', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid ' + C.line, padding: '8px 24px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    } },
      React.createElement('button', {
        onClick: () => setView('coursework'),
        style: {
          background: 'none', border: 'none', color: C.tx3,
          fontFamily: Mono, fontSize: 11, cursor: 'pointer',
        },
      }, '\← Back to Coursework'),
      React.createElement('span', { style: { fontFamily: Mono, fontSize: 12, color: C.amberDm, borderLeft: '3px solid ' + C.amber + '40', paddingLeft: 8 } },
        'LAB PROTOCOL // MPAI 7990 \— COGNITIVE FIREWALLS'),
    ),

    // Content area
    React.createElement('div', { style: { maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 1 } },

      // Hero section — lab notebook title page
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('div', { style: { fontFamily: Mono, fontSize: 10, color: C.blue + '60', letterSpacing: '.15em', marginBottom: 6, textTransform: 'uppercase' } }, 'EXPERIMENTAL PROTOCOL // REV 3.2'),
        React.createElement('h1', { style: {
          fontFamily: Serif, fontSize: 32, fontWeight: 700,
          color: C.tx, letterSpacing: '-.03em', marginBottom: 8,
          borderBottom: '2px solid ' + C.amber + '30', paddingBottom: 8,
        } }, 'Experiment Control Panel'),
        React.createElement('p', { style: {
          fontFamily: Serif, fontSize: 15, color: C.tx2,
          lineHeight: 1.6, marginBottom: 4, maxWidth: 720,
        } },
          'Can Structured Analytic Techniques defend intelligence analysts against adversarial AI-generated disinformation? Design a 2\u00D73 factorial experiment, state hypotheses, run Monte Carlo simulations, and analyze results with full ANOVA.'),
        React.createElement('p', { style: {
          fontFamily: Serif, fontSize: 13, color: C.tx3,
          lineHeight: 1.6, marginBottom: 12, maxWidth: 720,
        } },
          'Georgetown SFS MSFS Capstone \— Advisor: Dr. Shay Hershkovitz \— Defense: September 2026'),

        // Skills tags
        React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 } },
          ...FW_SKILLS.map(tag => React.createElement('span', { key: tag, style: {
            fontFamily: Mono, fontSize: 11, padding: '3px 8px', borderRadius: 3,
            background: C.amberBg, color: C.amberDm, letterSpacing: '.03em',
          } }, tag)),
        ),
      ),

      // Tab bar
      React.createElement(TabBar),

      // Tab content
      tab === 'design' && renderDesign(),
      tab === 'hypotheses' && renderHypotheses(),
      tab === 'simulation' && renderSimulation(),
      tab === 'analysis' && renderAnalysis(),
      tab === 'implications' && renderImplications(),
    ),
  );
}
