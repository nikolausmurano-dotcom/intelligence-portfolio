// CYAnalysisView.jsx — ATT&CK Kill Chain Replay + Forensics + Debrief
// Cyber Intelligence (MPAI 6770)
//
// An APT intrusion plays out in stages. The visitor steps through
// each kill chain phase, applies defensive measures, attributes
// TTPs using Diamond Model, and decides: observe or disrupt.
// Disrupting early = less intelligence. Waiting = more damage.
//
// Three modes:
//   Replay    — interactive kill chain walkthrough
//   Forensics — IOC timeline and attribution confidence
//   Debrief   — after-action review and scoring

// ── Data ─────────────────────────────────────────────────────

const CY_PALETTE = {
  bg: '#0a0a0a',
  card: 'rgba(8,14,10,.95)',
  cardBd: 'rgba(32,180,64,.1)',
  tx: '#88cc99',
  tx2: '#609970',
  tx3: '#407050',
  green: '#20ee50',
  greenDm: '#18aa38',
  greenBg: 'rgba(32,238,80,.05)',
  red: '#ee3030',
  redDm: '#aa2020',
  redBg: 'rgba(238,48,48,.06)',
  amber: '#eea020',
  amberDm: '#aa7010',
  amberBg: 'rgba(238,160,32,.05)',
  cyan: '#20ccee',
  cyanDm: '#1090aa',
  cyanBg: 'rgba(32,204,238,.05)',
  line: 'rgba(32,238,80,.06)',
};
const CY_MONO = "'IBM Plex Mono','Courier New',monospace";
const CY_SANS = "'IBM Plex Mono','Courier New',monospace";

// ── Matrix Rain Background (very low opacity) ──────────────
var MatrixRain = function() {
  var cols = [];
  for (var i = 0; i < 30; i++) {
    var chars = '';
    for (var j = 0; j < 40; j++) {
      chars += String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
      if (j < 39) chars += '\n';
    }
    cols.push(React.createElement('div', {
      key: i,
      style: {
        position: 'absolute',
        left: (i * 3.33) + '%',
        top: -(Math.random() * 50) + '%',
        fontFamily: CY_MONO,
        fontSize: 12,
        lineHeight: '16px',
        color: '#20ee50',
        opacity: 0.015 + Math.random() * 0.015,
        whiteSpace: 'pre',
        pointerEvents: 'none',
        userSelect: 'none',
        animation: 'none',
        letterSpacing: '0',
        writingMode: 'vertical-rl',
      }
    }, chars));
  }
  return React.createElement('div', {
    style: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
    }
  }, cols);
};

// ── CRT Scanlines Overlay ──────────────────────────────────
var ScanlineOverlay = function() {
  return React.createElement('div', {
    style: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.08) 2px, rgba(0,0,0,.08) 4px)',
      pointerEvents: 'none', zIndex: 1,
    }
  });
};

// ── Blinking Cursor ──────────────────────────────────
var BlinkingCursor = function() {
  var _v = useState(true);
  var visible = _v[0];
  var setVisible = _v[1];
  React.useEffect(function() {
    var interval = setInterval(function() { setVisible(function(v) { return !v; }); }, 530);
    return function() { clearInterval(interval); };
  }, []);
  return React.createElement('span', {
    style: {
      display: 'inline-block',
      width: 8, height: 14,
      background: visible ? '#20ee50' : 'transparent',
      marginLeft: 4,
      verticalAlign: 'middle',
    }
  });
};

// ── LED Status Indicator ──────────────────────────────────
var LEDIndicator = function(props) {
  return React.createElement('span', {
    style: {
      display: 'inline-block',
      width: 8, height: 8,
      borderRadius: '50%',
      background: props.color || '#20ee50',
      boxShadow: '0 0 4px ' + (props.color || '#20ee50') + ', 0 0 8px ' + (props.color || '#20ee50') + '60',
      marginRight: 6,
      verticalAlign: 'middle',
    }
  });
};

// ── Terminal Border Card ──────────────────────────────────
var TerminalCard = function(props) {
  var borderChar = '+' + Array(60).fill('-').join('') + '+';
  return React.createElement('div', {
    style: Object.assign({
      background: 'rgba(8,14,10,.95)',
      border: '1px solid rgba(32,180,64,.15)',
      borderRadius: 0,
      overflow: 'hidden',
      fontFamily: CY_MONO,
      position: 'relative',
    }, props.style || {})
  },
    // Top border text
    React.createElement('div', {
      style: {
        fontFamily: CY_MONO, fontSize: 10, color: 'rgba(32,238,80,.15)',
        overflow: 'hidden', whiteSpace: 'nowrap', lineHeight: '12px',
        borderBottom: '1px solid rgba(32,180,64,.08)', padding: '2px 8px',
        letterSpacing: '-.02em',
      }
    }, borderChar),
    // Header with LED
    props.title && React.createElement('div', {
      style: {
        padding: '6px 12px',
        borderBottom: '1px solid rgba(32,180,64,.08)',
        display: 'flex', alignItems: 'center', gap: 6,
      }
    },
      React.createElement(LEDIndicator, { color: props.ledColor || '#20ee50' }),
      React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 10, color: '#20ee50', letterSpacing: '.08em', fontWeight: 700, textTransform: 'uppercase' } }, props.title)
    ),
    // Content
    React.createElement('div', { style: { padding: props.padding || 14 } }, props.children),
    // Bottom border text
    React.createElement('div', {
      style: {
        fontFamily: CY_MONO, fontSize: 10, color: 'rgba(32,238,80,.15)',
        overflow: 'hidden', whiteSpace: 'nowrap', lineHeight: '12px',
        borderTop: '1px solid rgba(32,180,64,.08)', padding: '2px 8px',
        letterSpacing: '-.02em',
      }
    }, borderChar)
  );
};

const KILL_CHAIN = [
  { id: 'recon', phase: 'Reconnaissance', attck: 'TA0043',
    narrative: 'APT29 conducts open-source reconnaissance on MERIDIAN SYSTEMS, a defense contractor. LinkedIn scraping identifies 3 employees with privileged access. DNS enumeration reveals an unpatched VPN gateway (CVE-2024-XXXX).',
    ttps: ['T1593 — Search Open Websites/Domains', 'T1589 — Gather Victim Identity Information', 'T1590 — Gather Victim Network Information'],
    diamond: { adversary: 'APT29 (Cozy Bear)', capability: 'OSINT collection, vulnerability scanning', infrastructure: 'Commercial VPN, Tor exit nodes', victim: 'MERIDIAN SYSTEMS — defense contractor' },
    defenses: [
      { id: 'osint_audit', label: 'Conduct OSINT audit of own exposure', effect: 'Reduces attack surface by 40% but does not detect this specific recon', cost: 1 },
      { id: 'honeypot', label: 'Deploy network honeypots on perimeter', effect: 'May detect scanning activity, generates intelligence on attacker tools', cost: 2 },
    ],
    damage: 0, intel: 0 },
  { id: 'weapon', phase: 'Weaponization', attck: 'TA0042',
    narrative: 'APT29 crafts a spearphishing payload: a trojanized PDF disguised as a conference agenda. The payload exploits a known Office vulnerability to deliver a first-stage loader. C2 infrastructure is staged on compromised WordPress sites.',
    ttps: ['T1587.001 — Develop Capabilities: Malware', 'T1608.001 — Stage Capabilities: Upload Malware', 'T1584.004 — Compromise Infrastructure: Server'],
    diamond: { adversary: 'APT29', capability: 'Custom malware, spearphishing craft', infrastructure: 'Compromised WordPress C2 servers in 3 countries', victim: 'Targeted: Sr. Network Engineer, MERIDIAN' },
    defenses: [
      { id: 'threat_intel', label: 'Subscribe to threat intel feed covering APT29 IOCs', effect: 'May flag known C2 infrastructure, but APT29 rotates domains frequently', cost: 1 },
    ],
    damage: 0, intel: 1 },
  { id: 'delivery', phase: 'Delivery', attck: 'TA0001',
    narrative: 'Spearphishing email sent to 3 employees. Subject line mimics an upcoming industry conference. One employee opens the PDF and enables macros. The first-stage loader executes.',
    ttps: ['T1566.001 — Phishing: Spearphishing Attachment', 'T1204.002 — User Execution: Malicious File'],
    diamond: { adversary: 'APT29', capability: 'Social engineering, document exploit', infrastructure: 'Spoofed email from conference organizer domain', victim: 'Employee clicked — Sr. Network Engineer' },
    defenses: [
      { id: 'email_filter', label: 'Advanced email filtering with sandbox detonation', effect: 'Blocks 85% of phishing. This payload may evade if custom enough', cost: 2 },
      { id: 'training', label: 'Phishing awareness training (recent)', effect: 'Reduces click rate by 60%. One of three employees still clicked', cost: 1 },
    ],
    damage: 2, intel: 2 },
  { id: 'exploit', phase: 'Exploitation', attck: 'TA0002',
    narrative: 'The loader exploits CVE-2024-XXXX to gain code execution. It drops a DLL into the user\'s AppData folder and establishes persistence via a scheduled task masquerading as a Windows Update check.',
    ttps: ['T1203 — Exploitation for Client Execution', 'T1053.005 — Scheduled Task/Job', 'T1574.001 — Hijack Execution Flow: DLL Search Order'],
    diamond: { adversary: 'APT29', capability: 'Zero-day or recently patched exploit', infrastructure: 'Local persistence mechanism', victim: 'Workstation compromised — MERIDIAN-WS-0847' },
    defenses: [
      { id: 'edr', label: 'EDR with behavioral detection', effect: 'Detects suspicious DLL loading and scheduled task creation. High confidence alert generated', cost: 3 },
      { id: 'patch', label: 'Ensure CVE-2024-XXXX is patched', effect: 'Would have prevented exploitation entirely. But patch was available for 45 days and not applied', cost: 1 },
    ],
    damage: 4, intel: 3 },
  { id: 'install', phase: 'Installation', attck: 'TA0003',
    narrative: 'Second-stage payload downloaded: a custom backdoor (SUNSPOT variant) with encrypted C2 channel. Installs as a Windows service. Begins environment enumeration — Active Directory queries, network share discovery.',
    ttps: ['T1543.003 — Create or Modify System Process: Windows Service', 'T1087.002 — Account Discovery: Domain Account', 'T1135 — Network Share Discovery'],
    diamond: { adversary: 'APT29', capability: 'SUNSPOT variant backdoor, AD enumeration', infrastructure: 'Encrypted C2 over HTTPS to rotating domains', victim: 'Full workstation compromise + AD foothold' },
    defenses: [
      { id: 'ad_monitor', label: 'Monitor anomalous AD queries from workstations', effect: 'Flags unusual LDAP queries from non-admin workstation. High-value alert', cost: 2 },
      { id: 'segment', label: 'Network segmentation limiting lateral movement', effect: 'Constrains blast radius. Attacker needs additional exploitation to move laterally', cost: 3 },
    ],
    damage: 6, intel: 5 },
  { id: 'c2', phase: 'Command & Control', attck: 'TA0011',
    narrative: 'C2 channel fully established. Operator connects during business hours to blend with normal traffic. Begins targeted collection: searches for "classified," "ITAR," "proposal," "clearance" across network shares.',
    ttps: ['T1071.001 — Application Layer Protocol: Web Protocols', 'T1573.001 — Encrypted Channel: Symmetric Cryptography', 'T1083 — File and Directory Discovery'],
    diamond: { adversary: 'APT29 operator (human-on-keyboard)', capability: 'Interactive C2, targeted file search', infrastructure: 'HTTPS C2 blended with legitimate traffic', victim: 'Network shares containing ITAR-controlled data' },
    defenses: [
      { id: 'dlp', label: 'Data Loss Prevention on classified keywords', effect: 'Alerts on bulk access to files matching classified patterns. May catch exfil preparation', cost: 3 },
      { id: 'nta', label: 'Network traffic analysis for C2 beaconing', effect: 'Identifies periodic HTTPS callbacks to unusual domains. Behavioral detection', cost: 2 },
    ],
    damage: 8, intel: 7 },
  { id: 'actions', phase: 'Actions on Objectives', attck: 'TA0010',
    narrative: 'APT29 exfiltrates 2.3GB of ITAR-controlled defense proposal documents via encrypted channel to a cloud storage intermediary. Simultaneously, a logic bomb is planted in the backup system — insurance against detection.',
    ttps: ['T1041 — Exfiltration Over C2 Channel', 'T1567.002 — Exfiltration to Cloud Storage', 'T1485 — Data Destruction (planted)'],
    diamond: { adversary: 'APT29 (SVR)', capability: 'Data exfiltration, destructive payload', infrastructure: 'Cloud storage intermediary, encrypted tunnel', victim: '2.3GB ITAR data exfiltrated. Logic bomb in backup system' },
    defenses: [
      { id: 'disrupt', label: 'DISRUPT NOW — sever C2 and isolate host', effect: 'Stops exfiltration immediately but alerts adversary. They may trigger logic bomb or destroy forensic evidence', cost: 5 },
      { id: 'observe', label: 'Continue monitoring — maximize intelligence collection', effect: 'Identifies full extent of compromise, C2 infrastructure, and operator TTPs. But more data is exfiltrated every hour', cost: 0 },
    ],
    damage: 10, intel: 10 },
];

const CY_SKILLS = [
  "MITRE ATT&CK", "Diamond Model", "Kill Chain Analysis",
  "Threat Intelligence Platforms", "APT Attribution",
  "Incident Response", "Network Forensics",
];

// ── Scholarly Tips ────────────────────────────────────────────
const CY_TIPS = {
  apt: "Advanced Persistent Threat (APT) groups are state-sponsored cyber units with specific designations. APT28 (Fancy Bear/GRU Unit 26165) conducted the 2016 DNC hack. APT29 (Cozy Bear/SVR) executed SolarWinds. APT1 (PLA Unit 61398) was the first APT publicly attributed by name (Mandiant, 2013). The numbering is assigned by threat intelligence firms, not the groups themselves \u2014 they don\u2019t call themselves APT28.",
  zeroday: "A zero-day is a vulnerability unknown to the vendor \u2014 the defender has had zero days to patch it. The Stuxnet worm (2010) used FOUR zero-days simultaneously, an unprecedented expenditure of intelligence resources. A single zero-day on the black market can sell for $500K-$2M. Using one burns it permanently. Stuxnet\u2019s designers considered the Iranian nuclear program worth burning four.",
  c2: "Command and Control (C2) infrastructure is the adversary\u2019s communication backbone. Modern C2 uses domain fronting (hiding traffic behind legitimate CDNs), fast flux DNS (rapidly rotating IP addresses), and encrypted channels over social media APIs. The 2020 SolarWinds attack used DNS CNAME records to a legitimate-looking subdomain for C2 \u2014 the traffic looked like normal software update checks.",
  ioc: "Indicators of Compromise are forensic breadcrumbs: IP addresses, file hashes, registry keys, mutex names. But sophisticated adversaries rotate IOCs rapidly \u2014 an IP address used today is abandoned tomorrow. The real analytical value is in TTPs (Tactics, Techniques, Procedures), which are behavioral patterns harder to change. MITRE ATT&CK codifies 200+ TTPs precisely for this reason.",
  lateral: "Lateral movement is how an attacker expands from initial access to high-value targets. Pass-the-Hash, Kerberoasting, and token impersonation let attackers move through a network using legitimate credentials. The Colonial Pipeline attack (2021) began with a single compromised VPN password \u2014 but lateral movement through IT systems eventually threatened OT (operational technology) control systems, triggering the shutdown of 5,500 miles of pipeline.",
};

// ── Forensics Data ───────────────────────────────────────────

const IOC_TIMELINE = [
  { time: 'T+0h', type: 'network', indicator: '185.220.101.xx \— Tor exit node used for initial recon', confidence: 'low', phase: 'recon', mitre: 'T1590' },
  { time: 'T+72h', type: 'email', indicator: 'From: events@conf-agenda[.]org (typosquat of real conference domain)', confidence: 'high', phase: 'delivery', mitre: 'T1566.001' },
  { time: 'T+72h', type: 'file', indicator: 'SHA256: 4a7b...c3d2 \— Trojanized PDF "Q4_Defense_Summit_Agenda.pdf"', confidence: 'high', phase: 'delivery', mitre: 'T1204.002' },
  { time: 'T+72.5h', type: 'process', indicator: 'svchost_update.dll loaded from %APPDATA%\\Microsoft\\WindowsUpdate\\', confidence: 'high', phase: 'exploit', mitre: 'T1574.001' },
  { time: 'T+73h', type: 'registry', indicator: 'Scheduled task "WindowsUpdateCheck" \— persistence mechanism', confidence: 'high', phase: 'exploit', mitre: 'T1053.005' },
  { time: 'T+74h', type: 'network', indicator: 'HTTPS beacon to update-service[.]cloud (compromised WordPress)', confidence: 'medium', phase: 'install', mitre: 'T1071.001' },
  { time: 'T+74h', type: 'network', indicator: 'LDAP queries from non-admin workstation to DC \— AD enumeration', confidence: 'high', phase: 'install', mitre: 'T1087.002' },
  { time: 'T+80h', type: 'network', indicator: 'Encrypted HTTPS C2 callbacks every 45\u00b115min to 3 rotating domains', confidence: 'medium', phase: 'c2', mitre: 'T1573.001' },
  { time: 'T+96h', type: 'file', indicator: 'Bulk access to \\\\MERIDIAN-FS01\\Proposals\\ITAR\\ (2.3GB staged)', confidence: 'high', phase: 'c2', mitre: 'T1083' },
  { time: 'T+100h', type: 'network', indicator: 'Exfiltration to storage.googleapis[.]com via encrypted tunnel', confidence: 'high', phase: 'actions', mitre: 'T1567.002' },
  { time: 'T+101h', type: 'file', indicator: 'Logic bomb planted in backup service \— triggered on admin detection', confidence: 'medium', phase: 'actions', mitre: 'T1485' },
];

const ATTRIBUTION_FACTORS = [
  { factor: 'TTP Overlap with Known APT29 Campaigns', confidence: 92, evidence: 'SUNSPOT variant matches SolarWinds backdoor code structure. Scheduled task persistence matches CISA Advisory AA21-116A. C2 beacon pattern matches FireEye APT29 report (2020).', source: 'MITRE ATT&CK Group G0016' },
  { factor: 'Infrastructure Overlap', confidence: 78, evidence: 'Two of three C2 domains previously attributed to SVR operations in CISA reporting. WordPress compromise technique matches known APT29 infrastructure staging. However, infrastructure can be shared or false-flagged.', source: 'CISA Advisory AA21-116A' },
  { factor: 'Victimology Pattern', confidence: 85, evidence: 'APT29 consistently targets defense contractors with ITAR-controlled data. Target selection pattern matches SVR collection priorities documented in DNI Annual Threat Assessment 2024.', source: 'DNI ATA 2024' },
  { factor: 'Operational Timing', confidence: 65, evidence: 'Operations conducted during Moscow business hours (UTC+3). However, this could be deliberate misdirection. Weekend operational pauses align with Russian government work patterns.', source: 'Mandiant APT29 Timeline Analysis' },
  { factor: 'Linguistic Artifacts', confidence: 45, evidence: 'Debug strings in malware contain Cyrillic characters. Variable naming conventions match Russian-language programming patterns. However, these are easily planted for false flag operations.', source: 'Forensic analysis \— low confidence indicator' },
  { factor: 'Alternative Hypothesis: APT28 (GRU)', confidence: 25, evidence: 'Some TTPs overlap with GRU operations, but SUNSPOT variant is SVR-specific. GRU typically uses different persistence mechanisms. Exfiltration method does not match APT28 patterns.', source: 'Comparative analysis' },
];

const FORENSIC_LESSONS = [
  { title: 'Attribution is Probabilistic, Not Binary', text: 'No single indicator provides definitive attribution. The Diamond Model requires convergence across adversary, capability, infrastructure, and victim axes. Even high-confidence attribution carries uncertainty \— false flag operations are a known CI technique.' },
  { title: 'IOCs Have Half-Lives', text: 'Network indicators (IPs, domains) have short half-lives \— APT29 rotates infrastructure frequently. File hashes are more durable but can be polymorphic. Behavioral indicators (TTPs) are the most persistent and hardest to change. This is why MITRE ATT&CK focuses on behaviors, not signatures.' },
  { title: 'The Collection-Attribution Tension', text: 'Aggressive forensic collection (disk imaging, memory dumps) can alert the adversary. But waiting for more data means more damage. The forensic timeline must be constructed in parallel with ongoing operations, not after containment.' },
  { title: 'Chain of Custody Matters', text: 'If attribution leads to diplomatic or legal action, every IOC must have forensic chain of custody. Screenshots are not evidence. Disk images with cryptographic hashes are. This is where cyber intelligence intersects with law enforcement and international relations.' },
];

// ── IOC type colors ──────────────────────────────────────────

const IOC_TYPE_COLORS = {
  network: CY_PALETTE.cyan,
  email: CY_PALETTE.amber,
  file: CY_PALETTE.green,
  process: CY_PALETTE.red,
  registry: CY_PALETTE.amber,
};

// ── IOC Graph SVG Component ──────────────────────────────────

function IOCGraphSVG({ iocNodes, phaseNodes, C }) {
  var _s = useState(null), selectedIOC = _s[0], setSelectedIOC = _s[1];
  var _p = useState(null), selectedPhase = _p[0], setSelectedPhase = _p[1];

  var handleIOCClick = useCallback(function(idx) {
    setSelectedPhase(null);
    setSelectedIOC(function(prev) { return prev === idx ? null : idx; });
  }, []);

  var handlePhaseClick = useCallback(function(pid) {
    setSelectedIOC(null);
    setSelectedPhase(function(prev) { return prev === pid ? null : pid; });
  }, []);

  var isIOCHighlighted = useCallback(function(node) {
    if (selectedIOC !== null) return node.idx === selectedIOC;
    if (selectedPhase !== null) return node.phase === selectedPhase;
    return true;
  }, [selectedIOC, selectedPhase]);

  var isPhaseHighlighted = useCallback(function(pid) {
    if (selectedPhase !== null) return pid === selectedPhase;
    if (selectedIOC !== null) return iocNodes[selectedIOC] && iocNodes[selectedIOC].phase === pid;
    return true;
  }, [selectedIOC, selectedPhase, iocNodes]);

  var detailNode = selectedIOC !== null ? iocNodes[selectedIOC] : null;

  return React.createElement('div', null,
    React.createElement('svg', {
      viewBox: '0 0 700 400',
      style: { width: '100%', maxWidth: 700, display: 'block', margin: '0 auto', background: 'rgba(8,14,10,.95)', borderRadius: 0, border: '1px solid rgba(32,180,64,.12)' }
    },
      // Edges: IOC to phase
      iocNodes.map(function(node) {
        var target = phaseNodes.find(function(p) { return p.id === node.phase; });
        if (!target) return null;
        var highlighted = isIOCHighlighted(node);
        return React.createElement('line', {
          key: 'edge-' + node.idx,
          x1: node.x, y1: node.y,
          x2: target.x, y2: target.y - 18,
          stroke: highlighted ? node.color : C.line,
          strokeWidth: highlighted ? 1.5 : 0.5,
          strokeDasharray: highlighted ? 'none' : '3,3',
          opacity: highlighted ? 0.7 : 0.15,
        });
      }),

      // Phase nodes (squares along bottom)
      phaseNodes.map(function(pn) {
        var highlighted = isPhaseHighlighted(pn.id);
        return React.createElement('g', { key: 'phase-' + pn.id, style: { cursor: 'pointer' }, onClick: function() { handlePhaseClick(pn.id); } },
          React.createElement('rect', {
            x: pn.x - 40, y: pn.y - 18, width: 80, height: 32, rx: 4,
            fill: highlighted ? C.greenBg : C.bg,
            stroke: highlighted ? C.green : C.line,
            strokeWidth: highlighted ? 2 : 1,
          }),
          React.createElement('text', {
            x: pn.x, y: pn.y + 2,
            textAnchor: 'middle', dominantBaseline: 'middle',
            fill: highlighted ? C.green : C.tx3,
            fontSize: 12, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600,
          }, pn.label)
        );
      }),

      // IOC nodes (small circles)
      iocNodes.map(function(node) {
        var highlighted = isIOCHighlighted(node);
        return React.createElement('g', { key: 'ioc-' + node.idx, style: { cursor: 'pointer' }, onClick: function() { handleIOCClick(node.idx); } },
          // Glow
          highlighted && React.createElement('circle', {
            cx: node.x, cy: node.y, r: 14,
            fill: node.color, opacity: 0.12,
          }),
          React.createElement('circle', {
            cx: node.x, cy: node.y, r: 8,
            fill: highlighted ? node.color : C.bg,
            stroke: node.color,
            strokeWidth: highlighted ? 2 : 1,
            opacity: highlighted ? 1 : 0.3,
          }),
          // Type label
          React.createElement('text', {
            x: node.x, y: node.y - 14,
            textAnchor: 'middle',
            fill: highlighted ? node.color : C.tx3,
            fontSize: 10, fontFamily: "'IBM Plex Mono',monospace",
            opacity: highlighted ? 0.9 : 0.3,
          }, node.time),
          // Mitre label on right
          highlighted && React.createElement('text', {
            x: node.x + 14, y: node.y + 3,
            fill: C.green, fontSize: 10, fontFamily: "'IBM Plex Mono',monospace",
          }, node.mitre)
        );
      }),

      // Legend
      React.createElement('g', { transform: 'translate(550, 20)' },
        React.createElement('text', { x: 0, y: 0, fill: C.tx3, fontSize: 12, fontFamily: "'IBM Plex Mono',monospace" }, 'IOC TYPES'),
        [
          { label: 'Network', color: C.cyan },
          { label: 'File', color: C.green },
          { label: 'Email/Registry', color: C.amber },
          { label: 'Process', color: C.red },
        ].map(function(item, i) {
          return React.createElement('g', { key: item.label, transform: 'translate(0,' + (14 + i * 16) + ')' },
            React.createElement('circle', { cx: 5, cy: 0, r: 5, fill: item.color, opacity: 0.8 }),
            React.createElement('text', { x: 16, y: 3, fill: C.tx2, fontSize: 12, fontFamily: "'IBM Plex Mono',monospace" }, item.label)
          );
        })
      )
    ),

    // Detail panel below SVG
    detailNode && React.createElement('div', {
      style: {
        marginTop: 12, padding: 14, background: C.card,
        border: '1px solid ' + detailNode.color + '40', borderRadius: 6,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, fontWeight: 600, color: detailNode.color } }, detailNode.time),
          React.createElement('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, padding: '1px 6px', borderRadius: 3, background: detailNode.color + '18', color: detailNode.color, textTransform: 'uppercase' } }, detailNode.type)
        ),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
          React.createElement('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 600, padding: '1px 6px', borderRadius: 3, background: (detailNode.confidence === 'high' ? C.green : detailNode.confidence === 'medium' ? C.amber : C.red) + '18', color: detailNode.confidence === 'high' ? C.green : detailNode.confidence === 'medium' ? C.amber : C.red, textTransform: 'uppercase' } }, detailNode.confidence),
          React.createElement('span', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: C.green, padding: '1px 5px', borderRadius: 3, background: C.greenBg } }, detailNode.mitre)
        )
      ),
      React.createElement('p', { style: { fontSize: 12, color: C.tx, lineHeight: 1.6, fontFamily: "'IBM Plex Mono',monospace", wordBreak: 'break-word', margin: 0 } }, detailNode.indicator),
      React.createElement('div', { style: { marginTop: 8, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: C.tx3 } },
        'Kill Chain Phase: ', React.createElement('span', { style: { color: C.green } }, detailNode.phase)
      )
    ),

    // Phase detail panel
    selectedPhase && !detailNode && React.createElement('div', {
      style: {
        marginTop: 12, padding: 14, background: C.card,
        border: '1px solid ' + C.green + '40', borderRadius: 6,
      }
    },
      React.createElement('div', { style: { fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, fontWeight: 600, color: C.green, marginBottom: 8 } },
        'Phase: ' + selectedPhase.toUpperCase() + ' \— Connected IOCs'
      ),
      iocNodes.filter(function(n) { return n.phase === selectedPhase; }).map(function(n) {
        return React.createElement('div', { key: n.idx, style: { fontSize: 11, color: C.tx, lineHeight: 1.6, padding: '4px 0 4px 12px', borderLeft: '2px solid ' + n.color, marginBottom: 4, fontFamily: "'IBM Plex Mono',monospace" } },
          React.createElement('span', { style: { color: n.color, fontSize: 11, marginRight: 6 } }, n.time),
          n.indicator.substring(0, 80) + (n.indicator.length > 80 ? '...' : '')
        );
      })
    )
  );
}

// ── Component ────────────────────────────────────────────────

function CYAnalysisView({ setView }) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [defensesApplied, setDefensesApplied] = useState(new Set());
  const [showDiamond, setShowDiamond] = useState(false);
  const [finalChoice, setFinalChoice] = useState(null); // 'disrupt' | 'observe'
  const [viewMode, setViewMode] = useState('replay'); // 'replay' | 'forensics' | 'debrief'
  const [expandedAttribution, setExpandedAttribution] = useState(new Set());
  const [expandedLesson, setExpandedLesson] = useState(new Set());
  const [tipId, setTipId] = useState(null);

  const C = CY_PALETTE;

  // Scholarly tooltip renderer
  var TipBox = function(key) {
    if (tipId !== key) return null;
    return React.createElement('div', { style: { padding: '10px 14px', background: 'rgba(6,8,8,.94)', border: '1px solid rgba(48,204,96,.15)', borderRadius: 3, maxWidth: 440, fontSize: 11, color: 'rgba(184,208,192,.7)', lineHeight: 1.65, margin: '6px 0 10px' } }, CY_TIPS[key]);
  };

  // SVG micro-icons for scholarly tooltips
  var TerminalIcon = React.createElement('svg', { width: 22, height: 18, viewBox: '0 0 22 18', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'apt' ? null : 'apt'); } },
    React.createElement('rect', { x: 1, y: 1, width: 20, height: 16, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M5 7 L9 10 L5 13', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 11, y1: 13, x2: 16, y2: 13, stroke: 'currentColor', strokeWidth: '.8' })
  );

  var ShieldCrackIcon = React.createElement('svg', { width: 20, height: 24, viewBox: '0 0 20 24', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'zeroday' ? null : 'zeroday'); } },
    React.createElement('path', { d: 'M10 2 L2 6 L2 14 Q2 20 10 22 Q18 20 18 14 L18 6Z', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M10 6 L8 10 L12 12 L9 18', fill: 'none', stroke: 'currentColor', strokeWidth: '.8', strokeLinecap: 'round' })
  );

  var NetworkNodesIcon = React.createElement('svg', { width: 24, height: 22, viewBox: '0 0 24 22', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'c2' ? null : 'c2'); } },
    React.createElement('circle', { cx: 12, cy: 4, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 4, cy: 18, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 20, cy: 18, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('line', { x1: 10, y1: 7, x2: 5, y2: 15, stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('line', { x1: 14, y1: 7, x2: 19, y2: 15, stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('line', { x1: 7, y1: 18, x2: 17, y2: 18, stroke: 'currentColor', strokeWidth: '.6', strokeDasharray: '2 1.5' })
  );

  var FingerprintIcon = React.createElement('svg', { width: 20, height: 24, viewBox: '0 0 20 24', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'ioc' ? null : 'ioc'); } },
    React.createElement('path', { d: 'M4 16 Q4 8 10 6 Q16 8 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M7 16 Q7 10 10 9 Q13 10 13 16', fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M9.5 16 L9.5 12', fill: 'none', stroke: 'currentColor', strokeWidth: '.8', strokeLinecap: 'round' })
  );

  var ArrowPathIcon = React.createElement('svg', { width: 28, height: 20, viewBox: '0 0 28 20', style: { cursor: 'pointer', opacity: 0.3, verticalAlign: 'middle', marginLeft: 6 }, onClick: function() { setTipId(tipId === 'lateral' ? null : 'lateral'); } },
    React.createElement('circle', { cx: 4, cy: 10, r: 2.5, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 14, cy: 4, r: 2.5, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 14, cy: 16, r: 2.5, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('circle', { cx: 24, cy: 10, r: 2.5, fill: 'none', stroke: 'currentColor', strokeWidth: '.8' }),
    React.createElement('path', { d: 'M6.5 9 L11.5 5', fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('path', { d: 'M6.5 11 L11.5 15', fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('path', { d: 'M16.5 5 L21.5 9', fill: 'none', stroke: 'currentColor', strokeWidth: '.6' }),
    React.createElement('path', { d: 'M16.5 15 L21.5 11', fill: 'none', stroke: 'currentColor', strokeWidth: '.6' })
  );
  const phase = KILL_CHAIN[currentPhase];

  const totalDamage = useMemo(() => {
    let d = 0;
    for (let i = 0; i <= currentPhase; i++) {
      const p = KILL_CHAIN[i];
      const mitigated = p.defenses.some(def => defensesApplied.has(def.id));
      d += mitigated ? Math.floor(p.damage * 0.4) : p.damage;
    }
    return d;
  }, [currentPhase, defensesApplied]);

  const totalIntel = useMemo(() => {
    let intel = 0;
    for (let i = 0; i <= currentPhase; i++) {
      intel += KILL_CHAIN[i].intel;
    }
    return intel;
  }, [currentPhase]);

  const toggleDefense = useCallback((defId) => {
    setDefensesApplied(prev => {
      const next = new Set(prev);
      if (next.has(defId)) next.delete(defId); else next.add(defId);
      return next;
    });
  }, []);

  // ── Computed debrief metrics ─────────────────────────────

  const defenseCount = defensesApplied.size;

  const totalCost = useMemo(() => {
    let cost = 0;
    KILL_CHAIN.forEach(p => {
      p.defenses.forEach(d => {
        if (defensesApplied.has(d.id)) cost += d.cost;
      });
    });
    return cost;
  }, [defensesApplied]);

  const maxPossibleDamage = useMemo(() => {
    return KILL_CHAIN.reduce((sum, p) => sum + p.damage, 0);
  }, []);

  const damageReduction = useMemo(() => {
    if (maxPossibleDamage === 0) return 0;
    const unreducedDamage = KILL_CHAIN.slice(0, currentPhase + 1).reduce((s, p) => s + p.damage, 0);
    if (unreducedDamage === 0) return 0;
    return Math.round(((unreducedDamage - totalDamage) / unreducedDamage) * 100);
  }, [totalDamage, currentPhase, maxPossibleDamage]);

  const grade = useMemo(() => {
    if (defenseCount === 0) return 'F';
    if (defenseCount >= 8 && totalIntel >= 20 && finalChoice) return 'A';
    if (defenseCount >= 5 && totalIntel >= 15) return 'B';
    if (defenseCount >= 3 && totalIntel >= 10) return 'C';
    return 'D';
  }, [defenseCount, totalIntel, finalChoice]);

  const gradeColor = useMemo(() => {
    if (grade === 'A') return C.green;
    if (grade === 'B') return C.cyan;
    if (grade === 'C') return C.amber;
    return C.red;
  }, [grade]);

  const overallAttribution = useMemo(() => {
    const validFactors = ATTRIBUTION_FACTORS.filter(f => f.confidence > 30);
    if (validFactors.length === 0) return 0;
    const total = validFactors.reduce((s, f) => s + f.confidence, 0);
    return Math.round(total / validFactors.length);
  }, []);

  const toggleAttribution = useCallback((idx) => {
    setExpandedAttribution(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }, []);

  const toggleLesson = useCallback((idx) => {
    setExpandedLesson(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }, []);

  // ── Confidence badge helper ──────────────────────────────

  const confidenceBadge = (level) => {
    const colors = { high: C.green, medium: C.amber, low: C.red };
    const col = colors[level] || C.tx3;
    return React.createElement('span', {
      style: {
        padding: '1px 6px', borderRadius: 3, fontSize: 12,
        fontFamily: CY_MONO, fontWeight: 600,
        background: col + '18', border: '1px solid ' + col + '40',
        color: col, textTransform: 'uppercase',
      }
    }, level);
  };

  // ── Phase review for debrief ─────────────────────────────

  const phaseReview = useMemo(() => {
    return KILL_CHAIN.map((p, i) => {
      const applied = p.defenses.filter(d => defensesApplied.has(d.id));
      const available = p.defenses.length;
      const allDefenseNames = p.defenses.map(d => d.label);
      const appliedNames = applied.map(d => d.label);
      const missed = allDefenseNames.filter(n => !appliedNames.includes(n));
      const wasReached = i <= currentPhase;
      const optimal = available > 0 ? 'Apply: ' + allDefenseNames.join('; ') : 'No defenses available at this phase';
      return { phase: p.phase, attck: p.attck, wasReached, applied: appliedNames, missed, optimal, damage: p.damage, available };
    });
  }, [defensesApplied, currentPhase]);

  // ── Mode tabs ────────────────────────────────────────────

  const modeTabStyle = (mode) => ({
    padding: '8px 20px', borderRadius: 4,
    background: viewMode === mode ? C.greenBg : 'transparent',
    border: viewMode === mode ? '1px solid ' + C.green : '1px solid ' + C.line,
    color: viewMode === mode ? C.green : C.tx3,
    fontFamily: CY_MONO, fontSize: 11, fontWeight: viewMode === mode ? 600 : 400,
    cursor: 'pointer', transition: 'all 0.2s',
  });

  // ── Render ───────────────────────────────────────────────

  return (
    React.createElement('div', { style: { minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: CY_SANS, position: 'relative' } },

      /* Matrix rain background */
      React.createElement(MatrixRain),

      /* CRT scanline overlay */
      React.createElement(ScanlineOverlay),

      /* Top bar — SOC status bar */
      React.createElement('div', { style: { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid ' + C.green + '20', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('button', { onClick: () => setView('coursework'), style: { background: 'none', border: 'none', color: C.tx3, fontFamily: CY_MONO, fontSize: 10, cursor: 'pointer', letterSpacing: '.06em' } }, '> EXIT_SOC'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement(LEDIndicator, { color: C.green }),
          React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 10, color: C.green, letterSpacing: '.1em' } }, 'SOC OPERATIONAL // MPAI 6770')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12 } },
          React.createElement('span', { style: { display: 'flex', alignItems: 'center' } },
            React.createElement(LEDIndicator, { color: C.red }),
            React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.red } }, 'DMG:' + totalDamage)
          ),
          React.createElement('span', { style: { display: 'flex', alignItems: 'center' } },
            React.createElement(LEDIndicator, { color: C.cyan }),
            React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.cyan } }, 'INTEL:' + totalIntel)
          )
        )
      ),

      React.createElement('div', { style: { maxWidth: 960, margin: '0 auto', padding: '24px 24px 80px', position: 'relative', zIndex: 2 } },

        /* Hero — terminal style */
        React.createElement('div', { style: { marginBottom: 24 } },
          React.createElement('h1', { style: { fontFamily: CY_MONO, fontSize: 22, fontWeight: 700, color: C.green, letterSpacing: '.04em', marginBottom: 4 } },
            '> ATT&CK Kill Chain Replay',
            React.createElement(BlinkingCursor),
            TerminalIcon,
            ShieldCrackIcon
          ),
          TipBox('apt'),
          TipBox('zeroday'),
          React.createElement('p', { style: { fontSize: 12, color: C.tx2, lineHeight: 1.6, maxWidth: '60ch' } },
            'APT29 has breached a defense contractor. Step through each kill chain phase. At each stage: observe the TTPs, apply defenses, and decide \u2014 disrupt now (stop the bleeding) or keep watching (gather intelligence). Every choice has consequences.',
            NetworkNodesIcon
          ),
          TipBox('c2'),
          React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 } },
            CY_SKILLS.map(s =>
              React.createElement('span', { key: s, style: { padding: '3px 8px', borderRadius: 0, background: C.green + '08', border: '1px solid ' + C.green + '15', fontSize: 10, fontFamily: CY_MONO, color: C.green + '88', letterSpacing: '.04em' } }, s)
            )
          )
        ),

        /* Mode tabs — terminal tabs */
        React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid ' + C.green + '15' } },
          ['replay', 'forensics', 'iocgraph', 'debrief'].map(function(m, mi) {
            var labels = { replay: '> replay', forensics: '> forensics', iocgraph: '> ioc_graph', debrief: '> debrief' };
            return React.createElement('button', {
              key: m,
              onClick: function() { setViewMode(m); },
              style: {
                padding: '8px 16px', borderRadius: 0, cursor: 'pointer',
                background: viewMode === m ? C.greenBg : 'transparent',
                border: '1px solid ' + (viewMode === m ? C.green + '30' : 'transparent'),
                borderBottom: viewMode === m ? '2px solid ' + C.green : '2px solid transparent',
                color: viewMode === m ? C.green : C.tx3,
                fontFamily: CY_MONO, fontSize: 11, fontWeight: viewMode === m ? 700 : 400,
                letterSpacing: '.04em',
              }
            }, labels[m]);
          })
        ),

        /* ================================================================ */
        /* MODE 1: REPLAY                                                    */
        /* ================================================================ */
        viewMode === 'replay' && React.createElement(React.Fragment, null,

          /* Kill chain timeline — SIEM style */
          React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 20, overflow: 'auto', border: '1px solid ' + C.green + '15', borderRadius: 0 } },
            KILL_CHAIN.map((p, i) =>
              React.createElement('button', {
                key: p.id,
                onClick: () => i <= currentPhase && setCurrentPhase(i),
                style: {
                  flex: 1, padding: '8px 4px', textAlign: 'center',
                  background: i === currentPhase ? C.greenBg : i < currentPhase ? C.green + '05' : 'transparent',
                  borderRight: i < KILL_CHAIN.length - 1 ? '1px solid ' + C.green + '10' : 'none',
                  border: 'none', borderBottom: i === currentPhase ? '2px solid ' + C.green : '2px solid transparent',
                  borderRadius: 0, cursor: i <= currentPhase ? 'pointer' : 'default',
                  opacity: i > currentPhase ? 0.3 : 1,
                }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 2 } },
                  i <= currentPhase && React.createElement(LEDIndicator, { color: i === currentPhase ? C.green : C.green + '60' }),
                  React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 10, color: i <= currentPhase ? C.green : C.tx3, letterSpacing: '.04em' } }, p.attck)
                ),
                React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 10, color: i === currentPhase ? C.tx : C.tx2, fontWeight: i === currentPhase ? 700 : 400 } }, p.phase)
              )
            )
          ),

          /* Current phase detail — terminal card */
          React.createElement(TerminalCard, { title: 'PHASE: ' + phase.phase.toUpperCase(), ledColor: C.green, padding: 20, style: { marginBottom: 16 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
              React.createElement('div', null,
                React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 12, color: C.green } }, phase.attck),
                React.createElement('h2', { style: { fontFamily: CY_MONO, fontSize: 18, fontWeight: 700, color: C.tx, marginTop: 2 } }, phase.phase)
              ),
              React.createElement('button', {
                onClick: () => setShowDiamond(!showDiamond),
                style: {
                  padding: '4px 10px', background: showDiamond ? C.cyanBg : 'transparent',
                  border: '1px solid ' + (showDiamond ? C.cyan : C.line), borderRadius: 4,
                  color: showDiamond ? C.cyan : C.tx3, fontFamily: CY_MONO, fontSize: 12, cursor: 'pointer',
                }
              }, 'Diamond Model')
            ),

            /* Narrative */
            React.createElement('p', { style: { fontSize: 13, color: C.tx, lineHeight: 1.7, marginBottom: 16 } }, phase.narrative, ArrowPathIcon),
            TipBox('lateral'),

            /* TTPs */
            React.createElement('div', { style: { marginBottom: 16 } },
              React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.tx3, marginBottom: 6, textTransform: 'uppercase' } }, 'MITRE ATT&CK TTPs', FingerprintIcon),
              TipBox('ioc'),
              React.createElement('div', { style: { display: 'flex', gap: 4, flexWrap: 'wrap' } },
                phase.ttps.map(ttp =>
                  React.createElement('span', { key: ttp, style: { padding: '3px 8px', borderRadius: 3, background: C.greenBg, border: '1px solid ' + C.green + '20', fontFamily: CY_MONO, fontSize: 11, color: C.green } }, ttp)
                )
              )
            ),

            /* Diamond Model (expandable) */
            showDiamond && React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16, padding: 12, background: C.cyanBg, borderRadius: 6, border: '1px solid ' + C.cyan + '20' } },
              Object.entries(phase.diamond).map(([key, val]) =>
                React.createElement('div', { key: key },
                  React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 12, color: C.cyan, textTransform: 'uppercase' } }, key),
                  React.createElement('p', { style: { fontSize: 11, color: C.tx, marginTop: 2 } }, val)
                )
              )
            ),

            /* Defensive options */
            React.createElement('div', null,
              React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.tx3, marginBottom: 6, textTransform: 'uppercase' } }, 'Defensive Measures'),
              React.createElement('div', { style: { display: 'grid', gap: 6 } },
                phase.defenses.map(def => {
                  const applied = defensesApplied.has(def.id);
                  return React.createElement('button', {
                    key: def.id,
                    onClick: () => toggleDefense(def.id),
                    style: {
                      textAlign: 'left', padding: 10,
                      background: applied ? C.greenBg : 'rgba(255,255,255,.02)',
                      border: '1px solid ' + (applied ? C.green : C.line),
                      borderRadius: 4, cursor: 'pointer', color: C.tx,
                    }
                  },
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
                      React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 11, fontWeight: 600, color: applied ? C.green : C.tx } }, (applied ? '\✓ ' : '') + def.label),
                      React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.amberDm } }, 'Cost: ' + def.cost)
                    ),
                    React.createElement('p', { style: { fontSize: 12, color: C.tx2, lineHeight: 1.6 } }, def.effect)
                  );
                })
              )
            )
          ),

          /* Damage vs Intel meters */
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 } },
            React.createElement('div', { style: { padding: 12, background: C.redBg, borderRadius: 6, border: '1px solid ' + C.red + '20' } },
              React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.red, marginBottom: 4 } }, 'CUMULATIVE DAMAGE'),
              React.createElement('div', { style: { height: 10, background: C.red + '15', borderRadius: 4, overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', width: Math.min(totalDamage * 2.5, 100) + '%', background: C.red, borderRadius: 4, transition: 'width 0.3s' } })
              ),
              React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 12, color: C.red, fontWeight: 700 } }, totalDamage + '/40')
            ),
            React.createElement('div', { style: { padding: 12, background: C.cyanBg, borderRadius: 6, border: '1px solid ' + C.cyan + '20' } },
              React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.cyan, marginBottom: 4 } }, 'INTELLIGENCE GATHERED'),
              React.createElement('div', { style: { height: 10, background: C.cyan + '15', borderRadius: 4, overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', width: Math.min(totalIntel * 3.5, 100) + '%', background: C.cyan, borderRadius: 4, transition: 'width 0.3s' } })
              ),
              React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 12, color: C.cyan, fontWeight: 700 } }, totalIntel + '/28')
            )
          ),

          /* Next phase / final decision */
          currentPhase < KILL_CHAIN.length - 1
            ? React.createElement('button', {
                onClick: () => setCurrentPhase(currentPhase + 1),
                style: { padding: '10px 24px', background: C.green, border: 'none', borderRadius: 4, color: '#000', fontFamily: CY_MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer' }
              }, 'Advance to ' + KILL_CHAIN[currentPhase + 1].phase + ' \→')
            : !finalChoice
              ? React.createElement('div', { style: { display: 'flex', gap: 8 } },
                  React.createElement('button', {
                    onClick: () => setFinalChoice('disrupt'),
                    style: { flex: 1, padding: '14px 20px', background: C.redBg, border: '1px solid ' + C.red, borderRadius: 6, color: C.red, fontFamily: CY_MONO, fontSize: 12, fontWeight: 600, cursor: 'pointer' }
                  }, 'DISRUPT \— Sever C2, isolate, contain'),
                  React.createElement('button', {
                    onClick: () => setFinalChoice('observe'),
                    style: { flex: 1, padding: '14px 20px', background: C.cyanBg, border: '1px solid ' + C.cyan, borderRadius: 6, color: C.cyan, fontFamily: CY_MONO, fontSize: 12, fontWeight: 600, cursor: 'pointer' }
                  }, 'OBSERVE \— Continue collection')
                )
              : React.createElement('div', { style: { padding: 16, background: C.card, borderRadius: 6, border: '1px solid ' + (finalChoice === 'disrupt' ? C.red : C.cyan) } },
                  React.createElement('h3', { style: { fontFamily: CY_MONO, fontSize: 13, color: finalChoice === 'disrupt' ? C.red : C.cyan, marginBottom: 8 } },
                    finalChoice === 'disrupt' ? 'DISRUPTION EXECUTED' : 'CONTINUED OBSERVATION'
                  ),
                  React.createElement('p', { style: { fontSize: 12, color: C.tx, lineHeight: 1.6, marginBottom: 12 } },
                    finalChoice === 'disrupt'
                      ? 'C2 channel severed. Host isolated. Forensic imaging initiated. The adversary is alerted and may trigger the logic bomb in the backup system. You have partial intelligence on their infrastructure but lost visibility on the full scope of compromise. The 2.3GB already exfiltrated cannot be recovered.'
                      : 'Observation continues. You now have comprehensive visibility on APT29\'s C2 infrastructure, operator TTPs, and exfiltration methods. However, an additional 800MB has been exfiltrated during observation. The logic bomb remains planted. You now face a harder decision: when IS the right time to disrupt?'
                  ),
                  React.createElement('p', { style: { fontSize: 11, color: C.tx2, lineHeight: 1.65 } },
                    'This is the core tension of cyber intelligence: the observe-disrupt tradeoff. Every hour of observation improves attribution and defensive intelligence \— but every hour also means more damage. There is no universally correct answer. The right decision depends on the value of the intelligence relative to the cost of continued compromise.'
                  )
                )
        ),

        /* ================================================================ */
        /* MODE 2: FORENSICS                                                 */
        /* ================================================================ */
        viewMode === 'forensics' && React.createElement(React.Fragment, null,

          /* Section: IOC Timeline — log output style */
          React.createElement('div', { style: { marginBottom: 32 } },
            React.createElement('h2', { style: { fontFamily: CY_MONO, fontSize: 14, fontWeight: 700, color: C.cyan, marginBottom: 4, letterSpacing: '.06em' } }, '> IOC_TIMELINE --verbose', React.createElement(BlinkingCursor), FingerprintIcon, NetworkNodesIcon),
            TipBox('ioc'),
            TipBox('c2'),
            React.createElement('p', { style: { fontSize: 12, color: C.tx2, lineHeight: 1.65, marginBottom: 16 } },
              'Indicators of compromise ordered by discovery time. Each IOC is linked to the corresponding MITRE ATT&CK technique and assigned a confidence level based on forensic certainty.',
              TerminalIcon
            ),
            TipBox('apt'),

            /* Vertical timeline */
            React.createElement('div', { style: { position: 'relative', paddingLeft: 28 } },
              /* Vertical line */
              React.createElement('div', { style: { position: 'absolute', left: 8, top: 0, bottom: 0, width: 1, background: C.line } }),

              IOC_TIMELINE.map((ioc, idx) => {
                var dotColor = IOC_TYPE_COLORS[ioc.type] || C.tx3;
                return React.createElement('div', { key: idx, style: { position: 'relative', marginBottom: 14, paddingLeft: 16 } },
                  /* Dot */
                  React.createElement('div', { style: {
                    position: 'absolute', left: -24, top: 6,
                    width: 10, height: 10, borderRadius: '50%',
                    background: dotColor, border: '2px solid ' + C.bg,
                    boxShadow: '0 0 6px ' + dotColor + '60',
                  } }),

                  /* Card — log entry style */
                  React.createElement('div', { style: { background: 'rgba(8,14,10,.95)', border: '1px solid ' + C.green + '10', borderRadius: 0, padding: 12, borderLeft: '2px solid ' + dotColor } },
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
                      React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
                        React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 12, fontWeight: 600, color: dotColor } }, ioc.time),
                        React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 12, padding: '1px 5px', borderRadius: 3, background: dotColor + '15', color: dotColor, textTransform: 'uppercase' } }, ioc.type)
                      ),
                      React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
                        confidenceBadge(ioc.confidence),
                        React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.green, padding: '1px 5px', borderRadius: 3, background: C.greenBg, border: '1px solid ' + C.green + '20' } }, ioc.mitre)
                      )
                    ),
                    React.createElement('p', { style: { fontSize: 11, color: C.tx, lineHeight: 1.65, fontFamily: CY_MONO, wordBreak: 'break-word' } }, ioc.indicator)
                  )
                );
              })
            )
          ),

          /* Section: Attribution Confidence */
          React.createElement('div', { style: { marginBottom: 32 } },
            React.createElement('h2', { style: { fontFamily: CY_MONO, fontSize: 14, fontWeight: 700, color: C.cyan, marginBottom: 4, letterSpacing: '.06em' } }, '> attribution_confidence --analyze'),
            React.createElement('p', { style: { fontSize: 12, color: C.tx2, lineHeight: 1.65, marginBottom: 16 } },
              'Each factor contributes to the overall attribution assessment. Expand any factor to see the supporting evidence and analytical caveats.'
            ),

            /* Overall assessment */
            React.createElement('div', { style: { background: 'rgba(8,14,10,.95)', border: '1px solid ' + C.cyan + '20', borderRadius: 0, padding: 16, marginBottom: 16, textAlign: 'center' } },
              React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.tx3, textTransform: 'uppercase', marginBottom: 4 } }, 'Overall Attribution Confidence \— APT29 (SVR)'),
              React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 36, fontWeight: 700, color: C.cyan } }, overallAttribution + '%'),
              React.createElement('div', { style: { height: 8, background: C.cyan + '15', borderRadius: 4, overflow: 'hidden', marginTop: 8, maxWidth: 400, margin: '8px auto 0' } },
                React.createElement('div', { style: { height: '100%', width: overallAttribution + '%', background: C.cyan, borderRadius: 4, transition: 'width 0.3s' } })
              ),
              React.createElement('p', { style: { fontSize: 12, color: C.tx2, marginTop: 8 } }, 'Weighted average of factors with >30% individual confidence')
            ),

            /* Factor bars */
            ATTRIBUTION_FACTORS.map((af, idx) => {
              var isExpanded = expandedAttribution.has(idx);
              var barColor = af.confidence >= 70 ? C.green : af.confidence >= 50 ? C.amber : C.red;
              return React.createElement('div', { key: idx, style: { marginBottom: 8 } },
                React.createElement('button', {
                  onClick: () => toggleAttribution(idx),
                  style: {
                    width: '100%', textAlign: 'left', padding: 12,
                    background: C.card, border: '1px solid ' + C.cardBd, borderRadius: isExpanded ? '6px 6px 0 0' : 6,
                    cursor: 'pointer', color: C.tx,
                  }
                },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
                    React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 11, fontWeight: 600, color: C.tx } }, af.factor),
                    React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 12, fontWeight: 700, color: barColor } }, af.confidence + '%')
                  ),
                  React.createElement('div', { style: { height: 6, background: barColor + '15', borderRadius: 3, overflow: 'hidden' } },
                    React.createElement('div', { style: { height: '100%', width: af.confidence + '%', background: barColor, borderRadius: 3, transition: 'width 0.3s' } })
                  ),
                  React.createElement('p', { style: { fontSize: 11, color: C.tx3, fontFamily: CY_MONO, marginTop: 4 } }, af.source)
                ),

                /* Expanded evidence */
                isExpanded && React.createElement('div', { style: { padding: 12, background: C.cyanBg, border: '1px solid ' + C.cyan + '20', borderRadius: '0 0 6px 6px', borderTop: 'none' } },
                  React.createElement('p', { style: { fontSize: 11, color: C.tx, lineHeight: 1.6 } }, af.evidence)
                )
              );
            })
          ),

          /* Section: Forensic Lessons */
          React.createElement('div', { style: { marginBottom: 32 } },
            React.createElement('h2', { style: { fontFamily: CY_MONO, fontSize: 14, fontWeight: 700, color: C.cyan, marginBottom: 4, letterSpacing: '.06em' } }, '> forensic_lessons --list'),
            React.createElement('p', { style: { fontSize: 12, color: C.tx2, lineHeight: 1.65, marginBottom: 16 } },
              'Key analytical takeaways from this case study.'
            ),

            FORENSIC_LESSONS.map((lesson, idx) => {
              var isOpen = expandedLesson.has(idx);
              return React.createElement('div', { key: idx, style: { marginBottom: 6 } },
                React.createElement('button', {
                  onClick: () => toggleLesson(idx),
                  style: {
                    width: '100%', textAlign: 'left', padding: '10px 14px',
                    background: C.card, border: '1px solid ' + C.cardBd,
                    borderRadius: isOpen ? '6px 6px 0 0' : 6,
                    cursor: 'pointer', color: C.tx,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }
                },
                  React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 12, fontWeight: 600 } }, lesson.title),
                  React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 12, color: C.tx3 } }, isOpen ? '\▲' : '\▼')
                ),
                isOpen && React.createElement('div', { style: { padding: 14, background: C.card, border: '1px solid ' + C.cardBd, borderTop: 'none', borderRadius: '0 0 6px 6px' } },
                  React.createElement('p', { style: { fontSize: 12, color: C.tx, lineHeight: 1.7 } }, lesson.text)
                )
              );
            })
          )
        ),

        /* ================================================================ */
        /* MODE 2.5: IOC NETWORK GRAPH                                        */
        /* ================================================================ */
        viewMode === 'iocgraph' && React.createElement(React.Fragment, null,
          React.createElement('div', { style: { marginBottom: 16 } },
            React.createElement('h2', { style: { fontFamily: CY_MONO, fontSize: 14, fontWeight: 700, color: C.cyan, marginBottom: 4, letterSpacing: '.06em' } }, '> ioc_graph --network', ArrowPathIcon, ShieldCrackIcon),
            TipBox('lateral'),
            TipBox('zeroday'),
            React.createElement('p', { style: { fontSize: 12, color: C.tx2, lineHeight: 1.65, marginBottom: 12 } },
              'Indicators of Compromise mapped to kill chain phases. IOC nodes are color-coded by type: network (cyan), file (green), email/registry (amber), process (red). Click an IOC to see details. Click a phase to highlight all connected IOCs.'
            )
          ),
          (function() {
            var graphSelectedIOC = null;
            var graphSelectedPhase = null;

            // Build unique phases from IOC_TIMELINE
            var phaseIds = ['recon', 'delivery', 'exploit', 'install', 'c2', 'actions'];
            var phaseLabels = { recon: 'Recon', delivery: 'Delivery', exploit: 'Exploit', install: 'Install', c2: 'C2', actions: 'Actions' };

            // Phase node positions along bottom
            var phaseNodes = phaseIds.map(function(pid, i) {
              return { id: pid, x: 70 + i * 105, y: 360, label: phaseLabels[pid] };
            });

            // IOC nodes positioned in upper area
            var iocNodes = IOC_TIMELINE.map(function(ioc, i) {
              var col = Math.floor(i / 3);
              var row = i % 3;
              return {
                idx: i,
                x: 60 + col * 170 + (row % 2) * 40,
                y: 50 + row * 80,
                type: ioc.type,
                phase: ioc.phase,
                indicator: ioc.indicator,
                time: ioc.time,
                confidence: ioc.confidence,
                mitre: ioc.mitre,
                color: IOC_TYPE_COLORS[ioc.type] || C.tx3,
              };
            });

            return React.createElement(IOCGraphSVG, { iocNodes: iocNodes, phaseNodes: phaseNodes, C: C });
          })()
        ),

        /* ================================================================ */
        /* MODE 3: DEBRIEF                                                   */
        /* ================================================================ */
        viewMode === 'debrief' && React.createElement(React.Fragment, null,

          /* Grade banner — terminal output */
          React.createElement('div', { style: { background: 'rgba(8,14,10,.95)', border: '1px solid ' + gradeColor + '30', borderRadius: 0, padding: 24, textAlign: 'center', marginBottom: 24, boxShadow: '0 0 20px ' + gradeColor + '10' } },
            React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.tx3, textTransform: 'uppercase', marginBottom: 4 } }, 'After-Action Assessment'),
            React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 64, fontWeight: 700, color: gradeColor, lineHeight: 1 } }, grade),
            React.createElement('p', { style: { fontSize: 12, color: C.tx2, marginTop: 8 } },
              grade === 'A' ? 'Exceptional response \— comprehensive defenses with maximum intelligence yield'
                : grade === 'B' ? 'Competent response \— solid defensive posture with good intelligence gathering'
                : grade === 'C' ? 'Adequate response \— some defenses deployed, moderate intelligence collected'
                : grade === 'D' ? 'Minimal response \— few defenses, limited situational awareness'
                : 'No defenses applied \— the adversary operated without resistance'
            )
          ),

          /* Defense efficiency */
          React.createElement('div', { style: { marginBottom: 24 } },
            React.createElement('h2', { style: { fontFamily: CY_MONO, fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 12, letterSpacing: '.06em' } }, '> defense_efficiency --summary'),
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 } },
              React.createElement('div', { style: { padding: 14, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 0, textAlign: 'center' } },
                React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.tx3, textTransform: 'uppercase', marginBottom: 4 } }, 'Defenses Applied'),
                React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 28, fontWeight: 700, color: C.green } }, String(defenseCount)),
                React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 12, color: C.tx3, marginTop: 2 } }, 'of 13 available')
              ),
              React.createElement('div', { style: { padding: 14, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 0, textAlign: 'center' } },
                React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.tx3, textTransform: 'uppercase', marginBottom: 4 } }, 'Total Cost'),
                React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 28, fontWeight: 700, color: C.amber } }, String(totalCost)),
                React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 12, color: C.tx3, marginTop: 2 } }, 'resource units spent')
              ),
              React.createElement('div', { style: { padding: 14, background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 0, textAlign: 'center' } },
                React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.tx3, textTransform: 'uppercase', marginBottom: 4 } }, 'Damage Reduction'),
                React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 28, fontWeight: 700, color: damageReduction > 30 ? C.green : damageReduction > 10 ? C.amber : C.red } }, damageReduction + '%'),
                React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 12, color: C.tx3, marginTop: 2 } }, 'from applied defenses')
              )
            )
          ),

          /* Phase-by-phase review */
          React.createElement('div', { style: { marginBottom: 24 } },
            React.createElement('h2', { style: { fontFamily: CY_MONO, fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 12, letterSpacing: '.06em' } }, '> phase_review --all'),
            phaseReview.map((pr, idx) =>
              React.createElement('div', { key: idx, style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 14, marginBottom: 8, opacity: pr.wasReached ? 1 : 0.4 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
                  React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
                    React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.green } }, pr.attck),
                    React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 12, fontWeight: 600, color: C.tx } }, pr.phase)
                  ),
                  React.createElement('span', { style: {
                    fontFamily: CY_MONO, fontSize: 11, padding: '2px 8px', borderRadius: 3,
                    background: pr.applied.length === pr.available && pr.available > 0 ? C.green + '18' : pr.applied.length > 0 ? C.amber + '18' : C.red + '18',
                    color: pr.applied.length === pr.available && pr.available > 0 ? C.green : pr.applied.length > 0 ? C.amber : C.red,
                  } }, pr.applied.length + '/' + pr.available + ' applied')
                ),

                pr.applied.length > 0 && React.createElement('div', { style: { marginBottom: 4 } },
                  React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.green, marginBottom: 2 } }, 'APPLIED:'),
                  pr.applied.map((a, i) =>
                    React.createElement('span', { key: i, style: { display: 'inline-block', fontSize: 12, color: C.tx, marginRight: 8 } }, '\✓ ' + a)
                  )
                ),

                pr.missed.length > 0 && React.createElement('div', null,
                  React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.red, marginBottom: 2 } }, 'MISSED:'),
                  pr.missed.map((m, i) =>
                    React.createElement('span', { key: i, style: { display: 'inline-block', fontSize: 12, color: C.tx2, marginRight: 8 } }, '\✗ ' + m)
                  )
                ),

                !pr.wasReached && React.createElement('p', { style: { fontSize: 12, color: C.tx3, fontStyle: 'italic' } }, 'Phase not reached during replay')
              )
            )
          ),

          /* Intelligence value assessment */
          React.createElement('div', { style: { marginBottom: 24 } },
            React.createElement('h2', { style: { fontFamily: CY_MONO, fontSize: 14, fontWeight: 700, color: C.cyan, marginBottom: 12, letterSpacing: '.06em' } }, '> intel_assessment --value'),
            React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 16 } },
              React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 } },
                React.createElement('div', null,
                  React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.tx3, textTransform: 'uppercase', marginBottom: 4 } }, 'Phases Observed'),
                  React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 20, fontWeight: 700, color: C.cyan } }, (currentPhase + 1) + '/' + KILL_CHAIN.length),
                  React.createElement('p', { style: { fontSize: 12, color: C.tx2, marginTop: 2 } },
                    currentPhase >= 5 ? 'Full kill chain observed \— maximum TTP coverage for attribution'
                    : currentPhase >= 3 ? 'Substantial coverage \— post-exploitation TTPs partially captured'
                    : 'Limited observation \— insufficient data for confident attribution'
                  )
                ),
                React.createElement('div', null,
                  React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.tx3, textTransform: 'uppercase', marginBottom: 4 } }, 'Final Decision'),
                  React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 14, fontWeight: 600, color: finalChoice === 'disrupt' ? C.red : finalChoice === 'observe' ? C.cyan : C.tx3 } },
                    finalChoice ? (finalChoice === 'disrupt' ? 'DISRUPT' : 'OBSERVE') : 'NOT YET DECIDED'
                  ),
                  React.createElement('p', { style: { fontSize: 12, color: C.tx2, marginTop: 2 } },
                    finalChoice === 'disrupt' ? 'Immediate containment prioritized over intelligence collection. Appropriate when damage rate exceeds intel value.'
                    : finalChoice === 'observe' ? 'Continued observation chosen. Maximizes attribution confidence but increases total damage.'
                    : 'Complete the replay to make a final decision.'
                  )
                )
              ),
              React.createElement('p', { style: { fontSize: 11, color: C.tx, lineHeight: 1.6, borderTop: '1px solid ' + C.line, paddingTop: 12 } },
                totalIntel >= 20
                  ? 'With ' + totalIntel + ' intelligence points, you have sufficient data for high-confidence attribution, full TTP mapping, and actionable defensive intelligence. This level of collection supports both tactical incident response and strategic threat assessment.'
                  : totalIntel >= 10
                    ? 'With ' + totalIntel + ' intelligence points, you have moderate data. Attribution is possible but may lack the depth needed for diplomatic or legal action. Some TTP gaps remain.'
                    : 'With only ' + totalIntel + ' intelligence points, attribution confidence is low. The adversary\'s full capability set remains unknown, limiting future defensive value.'
              )
            )
          ),

          /* Grading rubric */
          React.createElement('div', { style: { marginBottom: 24 } },
            React.createElement('h2', { style: { fontFamily: CY_MONO, fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 12, letterSpacing: '.06em' } }, '> grading_rubric'),
            React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 0, overflow: 'hidden' } },
              [
                { g: 'A', req: '8+ defenses, 20+ intel, final choice consistent with damage level', col: C.green },
                { g: 'B', req: '5\u20137 defenses, 15+ intel gathered', col: C.cyan },
                { g: 'C', req: '3\u20134 defenses, 10+ intel gathered', col: C.amber },
                { g: 'D', req: '1\u20132 defenses, minimal intel', col: C.red },
                { g: 'F', req: '0 defenses applied \— no resistance offered', col: C.red },
              ].map((row, idx) =>
                React.createElement('div', { key: row.g, style: {
                  display: 'flex', alignItems: 'center', gap: 12, padding: '8px 14px',
                  borderBottom: idx < 4 ? '1px solid ' + C.line : 'none',
                  background: grade === row.g ? row.col + '08' : 'transparent',
                } },
                  React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 16, fontWeight: 700, color: row.col, width: 28 } }, row.g),
                  React.createElement('span', { style: { fontSize: 11, color: grade === row.g ? C.tx : C.tx2 } }, row.req),
                  grade === row.g && React.createElement('span', { style: { fontFamily: CY_MONO, fontSize: 11, color: row.col, marginLeft: 'auto' } }, '\u25C0 YOUR GRADE')
                )
              )
            )
          ),

          /* Real-world parallels */
          React.createElement('div', { style: { marginBottom: 24 } },
            React.createElement('h2', { style: { fontFamily: CY_MONO, fontSize: 14, fontWeight: 700, color: C.amber, marginBottom: 12, letterSpacing: '.06em' } }, '> case_studies --realworld'),
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } },
              React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 0, padding: 14 } },
                React.createElement('h3', { style: { fontFamily: CY_MONO, fontSize: 12, fontWeight: 600, color: C.amber, marginBottom: 6 } }, 'SolarWinds (2020)'),
                React.createElement('p', { style: { fontSize: 11, color: C.tx, lineHeight: 1.6, marginBottom: 6 } },
                  'APT29 compromised the SolarWinds Orion build process, distributing SUNBURST malware to 18,000+ organizations. The campaign operated undetected for 9+ months. Detection came from FireEye when their own red team tools were stolen \— an accidental discovery, not planned detection.'
                ),
                React.createElement('p', { style: { fontSize: 12, color: C.tx2, lineHeight: 1.65 } },
                  'Key lesson: supply chain attacks bypass perimeter defenses entirely. The observe-disrupt decision was effectively made for defenders \— they didn\'t know they were compromised.'
                )
              ),
              React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 0, padding: 14 } },
                React.createElement('h3', { style: { fontFamily: CY_MONO, fontSize: 12, fontWeight: 600, color: C.amber, marginBottom: 6 } }, 'Colonial Pipeline (2021)'),
                React.createElement('p', { style: { fontSize: 11, color: C.tx, lineHeight: 1.6, marginBottom: 6 } },
                  'DarkSide ransomware shut down 5,500 miles of fuel pipeline. Colonial paid $4.4M ransom within hours. The rapid payment decision prioritized operational restoration over intelligence collection or law enforcement coordination.'
                ),
                React.createElement('p', { style: { fontSize: 12, color: C.tx2, lineHeight: 1.65 } },
                  'Key lesson: when critical infrastructure is at stake, the observe-disrupt calculus changes dramatically. The cost of continued observation (fuel shortages, public safety) outweighed intelligence value.'
                )
              )
            )
          ),

          /* Methodology note */
          React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 6, padding: 14, marginBottom: 12 } },
            React.createElement('h3', { style: { fontFamily: CY_MONO, fontSize: 12, fontWeight: 600, color: C.tx2, marginBottom: 8 } }, 'Analytical Methodology'),
            React.createElement('p', { style: { fontSize: 11, color: C.tx2, lineHeight: 1.6, marginBottom: 8 } },
              'This simulation models a realistic APT intrusion scenario based on documented TTPs from MITRE ATT&CK Group G0016 (APT29/Cozy Bear). The kill chain structure follows the Lockheed Martin Cyber Kill Chain framework (Hutchins, Cloppert, Amin, 2011), while attribution analysis applies the Diamond Model of Intrusion Analysis (Caltagirone, Pendergast, Betz, 2013).'
            ),
            React.createElement('p', { style: { fontSize: 11, color: C.tx2, lineHeight: 1.6, marginBottom: 8 } },
              'Grading criteria reflect real-world incident response evaluation standards. Defense cost values are normalized representations of resource allocation decisions. The observe-disrupt tradeoff is the central tension in operational cyber intelligence \— there is no objectively correct answer, only context-dependent optimization.'
            ),
            React.createElement('p', { style: { fontSize: 11, color: C.tx2, lineHeight: 1.6 } },
              'IOC confidence levels follow the Admiralty Code / NATO evaluation system: HIGH (confirmed by multiple independent sources), MEDIUM (corroborated but with caveats), LOW (single-source or circumstantial). Attribution confidence percentages represent analytic judgment, not mathematical certainty.'
            )
          ),

          /* Provenance strip */
          React.createElement('div', { style: { background: C.card, border: '1px solid ' + C.cardBd, borderRadius: 0, padding: 14 } },
            React.createElement('p', { style: { fontFamily: CY_MONO, fontSize: 11, color: C.tx3, textTransform: 'uppercase', marginBottom: 8 } }, 'Provenance & Sources'),
            React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
              [
                'MITRE ATT&CK Framework v14',
                'Diamond Model (Caltagirone et al., 2013)',
                'Lockheed Kill Chain (Hutchins et al., 2011)',
                'FireEye APT29 Report (2020)',
                'CISA Advisory AA21-116A',
                'DNI Annual Threat Assessment 2024',
                'Mandiant APT29 Timeline Analysis',
              ].map(src =>
                React.createElement('span', { key: src, style: {
                  padding: '3px 8px', borderRadius: 3, fontSize: 11, fontFamily: CY_MONO,
                  background: C.green + '08', border: '1px solid ' + C.green + '15', color: C.tx2,
                } }, src)
              )
            )
          )
        )
      )
    )
  );
}
