import base64
import os

target_dir = r'C:\Users\esenc\.gemini\antigravity\scratch\github_profile_readme'

with open(os.path.join(target_dir, 'ethernium-brand-logo1.png'), 'rb') as f:
    b64_logo1 = 'data:image/png;base64,' + base64.b64encode(f.read()).decode('utf-8')

with open(os.path.join(target_dir, 'ethernium-emblem-circle.png'), 'rb') as f:
    b64_emblem = 'data:image/png;base64,' + base64.b64encode(f.read()).decode('utf-8')

# 1. Update header-ethernium.svg (Engraved Inset Monolith)
header_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 240" width="100%" height="240">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&amp;family=Fira+Code:wght@500;700&amp;display=swap');
      
      .subtitle-text {{
        font-family: 'Nebula', 'Orbitron', 'Fira Code', monospace;
        font-weight: 700;
        font-size: 13.5px;
        fill: #00F0FF;
        letter-spacing: 4px;
        filter: drop-shadow(0px 0px 6px rgba(112, 0, 255, 0.6));
      }}
      
      .badge-text {{
        font-family: 'Fira Code', monospace;
        font-size: 10.5px;
        fill: #94A3B8;
        letter-spacing: 2px;
      }}
      
      .pulse-dot {{
        animation: pulse 1.8s infinite;
      }}
      
      @keyframes pulse {{
        0% {{ fill: #00FF9D; opacity: 1; filter: drop-shadow(0 0 6px #00FF9D); }}
        50% {{ fill: #00F0FF; opacity: 0.3; filter: drop-shadow(0 0 2px #00F0FF); }}
        100% {{ fill: #00FF9D; opacity: 1; filter: drop-shadow(0 0 6px #00FF9D); }}
      }}

      .glow-border {{
        animation: borderGlow 4s ease-in-out infinite alternate;
      }}

      @keyframes borderGlow {{
        0% {{ stroke: #00F0FF; filter: drop-shadow(0 0 4px #00F0FF); }}
        50% {{ stroke: #7000FF; filter: drop-shadow(0 0 6px #7000FF); }}
        100% {{ stroke: #00FF9D; filter: drop-shadow(0 0 4px #00FF9D); }}
      }}

      .sheen-anim {{
        animation: moveSheen 5s ease-in-out infinite alternate;
      }}

      @keyframes moveSheen {{
        0% {{ transform: translateX(-350px); }}
        100% {{ transform: translateX(350px); }}
      }}
    </style>

    <clipPath id="header-corner-clip">
      <rect width="950" height="240" rx="16" />
    </clipPath>

    <!-- Engraved Inset 3D Obsidian Gradients -->
    <linearGradient id="engraved-base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020306" />
      <stop offset="30%" stop-color="#070B14" />
      <stop offset="70%" stop-color="#0A0F1E" />
      <stop offset="100%" stop-color="#010204" />
    </linearGradient>

    <linearGradient id="glass-bevel-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="30%" stop-color="#00F0FF" stop-opacity="0.8" />
      <stop offset="70%" stop-color="#7000FF" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#00FF9D" stop-opacity="0.9" />
    </linearGradient>

    <linearGradient id="moving-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0" />
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>
  </defs>

  <g clip-path="url(#header-corner-clip)">
    <!-- Engraved Inset Outer Shadow & Base Frame -->
    <rect width="950" height="240" rx="16" fill="url(#engraved-base)" stroke="#000000" stroke-width="4"/>
    
    <!-- Inset Engraved Bevel Stroke (Graving Inward Effect) -->
    <rect x="3" y="3" width="944" height="234" rx="14" fill="none" stroke="#000000" stroke-width="3" opacity="0.9"/>
    <rect x="5" y="5" width="940" height="230" rx="13" fill="none" stroke="url(#glass-bevel-glow)" stroke-width="1.5" />
    <rect x="7" y="7" width="936" height="226" rx="12" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3" />

    <!-- Moving Light Sheen -->
    <g class="sheen-anim">
      <polygon points="100,0 350,0 150,240 -100,240" fill="url(#moving-sheen)" />
    </g>

    <!-- Corner Accents -->
    <path d="M 18 18 L 75 18 M 18 18 L 18 75" class="glow-border" stroke-width="3.5" fill="none" />
    <path d="M 932 18 L 875 18 M 932 18 L 932 75" class="glow-border" stroke-width="3.5" fill="none" />
    <path d="M 18 222 L 75 222 M 18 222 L 18 165" class="glow-border" stroke-width="3.5" fill="none" />
    <path d="M 932 222 L 875 222 M 932 222 L 932 165" class="glow-border" stroke-width="3.5" fill="none" />

    <!-- Engraved Header Top Bar -->
    <rect x="40" y="20" width="870" height="28" rx="8" fill="#020408" stroke="#000000" stroke-width="2"/>
    <rect x="41" y="21" width="868" height="26" rx="7" fill="none" stroke="#1E293B" stroke-width="1"/>
    
    <circle cx="60" cy="34" r="4.5" class="pulse-dot" />
    <text x="76" y="38" class="badge-text">ETH-CORP // OFFICIAL ETHERNIUM ENGRAVED OBSIDIAN MONOLITH</text>
    <text x="790" y="38" class="badge-text" fill="#00FF9D">[ENGRAVED_ACTIVE]</text>

    <!-- Inline Base64 Brand Logo -->
    <image href="{b64_logo1}" x="225" y="52" width="500" height="125" />

    <g transform="translate(475, 198)">
      <text text-anchor="middle" class="subtitle-text">AUTONOMOUS ARCHITECTURES • GPU ENGINE • CONTROL SYSTEMS</text>
    </g>

    <line x1="140" y1="216" x2="810" y2="216" stroke="url(#glass-bevel-glow)" stroke-width="2.5" />
  </g>
</svg>'''

with open(os.path.join(target_dir, 'header-ethernium.svg'), 'w', encoding='utf-8') as f:
    f.write(header_svg)

# 2. Update seneschal-chronolith.svg (Engraved Inset Systemic Architecture)
chronolith_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 420" width="100%" height="420">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&amp;family=Fira+Code:wght@500;700&amp;display=swap');

      .node-title {{
        font-family: 'Nebula', 'Orbitron', monospace;
        font-weight: 900;
        font-size: 13.5px;
        fill: #FFFFFF !important;
        stroke: #000000;
        stroke-width: 1.5px;
        paint-order: stroke fill;
        letter-spacing: 1.5px;
      }}

      .node-subtitle {{
        font-family: 'Fira Code', monospace;
        font-size: 11px;
        fill: #00F0FF;
        letter-spacing: 0.5px;
      }}

      .core-title {{
        font-family: 'Nebula', 'Orbitron', monospace;
        font-weight: 900;
        font-size: 15px;
        fill: #FFFFFF !important;
        stroke: #000000;
        stroke-width: 1.5px;
        paint-order: stroke fill;
        letter-spacing: 2px;
        filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.9));
      }}

      .line-glow {{
        stroke: #00F0FF;
        stroke-width: 2px;
        stroke-dasharray: 6 4;
        animation: dashMove 2.5s linear infinite;
      }}

      @keyframes dashMove {{
        from {{ stroke-dashoffset: 20; }}
        to {{ stroke-dashoffset: 0; }}
      }}
    </style>

    <clipPath id="arch-corner-clip">
      <rect width="950" height="420" rx="16" />
    </clipPath>

    <linearGradient id="engraved-base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020306" />
      <stop offset="30%" stop-color="#070B14" />
      <stop offset="70%" stop-color="#0A0F1E" />
      <stop offset="100%" stop-color="#010204" />
    </linearGradient>

    <linearGradient id="bevel-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#7000FF" />
    </linearGradient>

    <linearGradient id="node-obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080D1A" />
      <stop offset="50%" stop-color="#03050A" />
      <stop offset="100%" stop-color="#0E1726" />
    </linearGradient>
  </defs>

  <g clip-path="url(#arch-corner-clip)">
    <!-- Engraved Inset Outer Shadow & Base Frame -->
    <rect width="950" height="420" rx="16" fill="url(#engraved-base)" stroke="#000000" stroke-width="4"/>
    <rect x="3" y="3" width="944" height="414" rx="14" fill="none" stroke="#000000" stroke-width="3" opacity="0.9"/>
    <rect x="5" y="5" width="940" height="410" rx="13" fill="none" stroke="url(#bevel-glow)" stroke-width="1.5" />
    <rect x="7" y="7" width="936" height="406" rx="12" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3" />

    <!-- Top Architecture Header Bar -->
    <rect x="30" y="18" width="890" height="34" rx="8" fill="#020408" stroke="#000000" stroke-width="2"/>
    <text x="475" y="41" text-anchor="middle" class="node-title" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" paint-order="stroke fill">🏛️ ETHERNIUM CORPORATE SYSTEMIC ARCHITECTURE</text>

    <!-- Connecting Dynamic Flow Lines -->
    <line x1="220" y1="120" x2="475" y2="210" class="line-glow" />
    <line x1="730" y1="120" x2="475" y2="210" class="line-glow" />
    <line x1="220" y1="320" x2="475" y2="210" class="line-glow" />
    <line x1="730" y1="320" x2="475" y2="210" class="line-glow" />

    <!-- NODE 1: SENESCHAL-v5 (Engraved Inset) -->
    <g transform="translate(80, 80)">
      <rect width="280" height="80" rx="12" fill="url(#node-obsidian)" stroke="#000000" stroke-width="2.5"/>
      <rect x="2" y="2" width="276" height="76" rx="10" fill="none" stroke="#00F0FF" stroke-width="1.5"/>
      <rect x="4" y="4" width="272" height="72" rx="9" fill="none" stroke="#FFFFFF" stroke-width="0.8" opacity="0.3"/>
      <text x="140" y="34" text-anchor="middle" class="node-title" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" paint-order="stroke fill">🤖 SENESCHAL-v5</text>
      <text x="140" y="58" text-anchor="middle" class="node-subtitle">Autonomous Sovereign Companion</text>
    </g>

    <!-- NODE 2: CHRONOLITH (Engraved Inset) -->
    <g transform="translate(590, 80)">
      <rect width="280" height="80" rx="12" fill="url(#node-obsidian)" stroke="#000000" stroke-width="2.5"/>
      <rect x="2" y="2" width="276" height="76" rx="10" fill="none" stroke="#7000FF" stroke-width="1.5"/>
      <rect x="4" y="4" width="272" height="72" rx="9" fill="none" stroke="#FFFFFF" stroke-width="0.8" opacity="0.3"/>
      <text x="140" y="34" text-anchor="middle" class="node-title" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" paint-order="stroke fill">🔮 CHRONOLITH</text>
      <text x="140" y="58" text-anchor="middle" class="node-subtitle">Cognitive Governance Protocol</text>
    </g>

    <!-- CENTER CORE: OFFICIAL WHITE CIRCULAR ETHERNIUM EMBLEM (Engraved Inset Circle) -->
    <g transform="translate(375, 140)">
      <circle cx="100" cy="80" r="78" fill="#000000"/>
      <circle cx="100" cy="80" r="75" fill="#040A14" stroke="url(#bevel-glow)" stroke-width="2.5"/>
      
      <image href="{b64_emblem}" x="27" y="7" width="146" height="146" />

      <rect x="-10" y="165" width="220" height="26" rx="6" fill="#020408" stroke="#00FF9D" stroke-width="1.5"/>
      <text x="100" y="182" text-anchor="middle" class="core-title" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" paint-order="stroke fill">ETHERNIUM CORE</text>
    </g>

    <!-- NODE 3: INVICTVS GPU ENGINE (Engraved Inset) -->
    <g transform="translate(80, 280)">
      <rect width="280" height="80" rx="12" fill="url(#node-obsidian)" stroke="#000000" stroke-width="2.5"/>
      <rect x="2" y="2" width="276" height="76" rx="10" fill="none" stroke="#00FF9D" stroke-width="1.5"/>
      <rect x="4" y="4" width="272" height="72" rx="9" fill="none" stroke="#FFFFFF" stroke-width="0.8" opacity="0.3"/>
      <text x="140" y="34" text-anchor="middle" class="node-title" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" paint-order="stroke fill">⚡ INVICTVS GPU ENGINE</text>
      <text x="140" y="58" text-anchor="middle" class="node-subtitle">100,000 Particle Physics Shaders</text>
    </g>

    <!-- NODE 4: SOVEREIGN MATRIX (Engraved Inset) -->
    <g transform="translate(590, 280)">
      <rect width="280" height="80" rx="12" fill="url(#node-obsidian)" stroke="#000000" stroke-width="2.5"/>
      <rect x="2" y="2" width="276" height="76" rx="10" fill="none" stroke="#FFD700" stroke-width="1.5"/>
      <rect x="4" y="4" width="272" height="72" rx="9" fill="none" stroke="#FFFFFF" stroke-width="0.8" opacity="0.3"/>
      <text x="140" y="34" text-anchor="middle" class="node-title" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" paint-order="stroke fill">🏛️ SOVEREIGN MATRIX</text>
      <text x="140" y="58" text-anchor="middle" class="node-subtitle">Local-First Bare-Metal Compute</text>
    </g>
  </g>
</svg>'''

with open(os.path.join(target_dir, 'seneschal-chronolith.svg'), 'w', encoding='utf-8') as f:
    f.write(chronolith_svg)

# 3. Update ethernium-sentinel.svg (Engraved Inset Companion)
sentinel_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 240" width="100%" height="240">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&amp;family=Fira+Code:wght@500;700&amp;display=swap');
      
      .main-title {{
        font-family: 'Nebula', 'Orbitron', monospace;
        font-weight: 900;
        font-size: 15px;
        fill: #FFFFFF !important;
        stroke: #000000;
        stroke-width: 1.5px;
        paint-order: stroke fill;
        letter-spacing: 2.5px;
        filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.8));
      }}

      .sub-title {{
        font-family: 'Nebula', 'Orbitron', monospace;
        font-weight: 800;
        font-size: 12.5px;
        fill: #FFFFFF !important;
        stroke: #000000;
        stroke-width: 1.5px;
        paint-order: stroke fill;
        letter-spacing: 1.5px;
      }}
      
      .label-text {{
        font-family: 'Fira Code', monospace;
        font-size: 11px;
        fill: #E2E8F0;
        letter-spacing: 0.5px;
      }}
      
      .val-text {{
        font-family: 'Fira Code', monospace;
        font-weight: 700;
        font-size: 11px;
        fill: #00FF9D;
        letter-spacing: 1px;
      }}
    </style>

    <clipPath id="sentinel-corner-clip">
      <rect width="950" height="240" rx="16" />
    </clipPath>

    <linearGradient id="engraved-base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020306" />
      <stop offset="30%" stop-color="#070B14" />
      <stop offset="70%" stop-color="#0A0F1E" />
      <stop offset="100%" stop-color="#010204" />
    </linearGradient>

    <linearGradient id="bevel-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#7000FF" />
    </linearGradient>
  </defs>

  <g clip-path="url(#sentinel-corner-clip)">
    <!-- Engraved Inset Outer Shadow & Base Frame -->
    <rect width="950" height="240" rx="16" fill="url(#engraved-base)" stroke="#000000" stroke-width="4"/>
    <rect x="3" y="3" width="944" height="234" rx="14" fill="none" stroke="#000000" stroke-width="3" opacity="0.9"/>
    <rect x="5" y="5" width="940" height="230" rx="13" fill="none" stroke="url(#bevel-glow)" stroke-width="1.5" />
    <rect x="7" y="7" width="936" height="226" rx="12" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3" />

    <!-- Top Title Bar -->
    <rect x="25" y="16" width="900" height="34" rx="6" fill="#020408" stroke="#000000" stroke-width="2"/>
    <text x="475" y="38" text-anchor="middle" class="main-title" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" paint-order="stroke fill">SENESCHAL-v5 // ETHERNIUM AUTONOMOUS SOVEREIGN COMPANION</text>

    <!-- LEFT COMPANION HOLOGRAPHIC CORE -->
    <g transform="translate(110, 135)">
      <circle r="60" fill="#000000"/>
      <circle r="58" fill="none" stroke="#1E293B" stroke-width="2" stroke-dasharray="6 4"/>
      <circle r="48" fill="none" stroke="#00F0FF" stroke-width="1.5" stroke-dasharray="12 6" opacity="0.8"/>
      
      <image href="{b64_emblem}" x="-40" y="-40" width="80" height="80" />

      <rect x="-65" y="62" width="130" height="20" rx="4" fill="#020408" stroke="#00FF9D" stroke-width="1"/>
      <text x="0" y="76" text-anchor="middle" class="val-text">[COMPANION_ONLINE]</text>
    </g>

    <!-- RIGHT COMPANION DIRECTIVES -->
    <g transform="translate(220, 62)">
      <rect width="705" height="158" rx="8" fill="#03050A" stroke="#000000" stroke-width="2.5" />
      <rect x="2" y="2" width="701" height="154" rx="7" fill="none" stroke="#00F0FF" stroke-width="1.5" />
      <rect x="4" y="4" width="697" height="150" rx="6" fill="none" stroke="#FFFFFF" stroke-width="0.8" opacity="0.3" />

      <text x="20" y="26" class="sub-title" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" paint-order="stroke fill">🤖 COMPANION AUTONOMOUS CAPABILITIES &amp; AGENTIC DIRECTIVES</text>
      <line x1="20" y1="36" x2="685" y2="36" stroke="#1E293B" stroke-width="1"/>

      <text x="20" y="60" class="label-text">▪ <tspan fill="#FFFFFF">Isolated Pre-testing &amp; Sandboxing:</tspan></text>
      <text x="310" y="60" class="val-text">[AUTOMATED TESTBEDS]</text>

      <text x="20" y="84" class="label-text">▪ <tspan fill="#FFFFFF">GLSL &amp; GPU Shader Compilation:</tspan></text>
      <text x="310" y="84" class="val-text">[60 FPS REAL-TIME OPTICS]</text>

      <text x="20" y="108" class="label-text">▪ <tspan fill="#FFFFFF">Multidisciplinary Control Theory:</tspan></text>
      <text x="310" y="108" class="val-text">[OPTIMAL CONTROL LOOPS]</text>

      <rect x="20" y="122" width="665" height="26" rx="4" fill="#010204" stroke="#1E293B" stroke-width="1"/>
      <text x="30" y="139" class="label-text" fill="#00F0FF">> SENESCHAL_LOG: Engraved Inset 3D Shader Architecture verified. Operational 60 FPS.</text>
    </g>
  </g>
</svg>'''

with open(os.path.join(target_dir, 'ethernium-sentinel.svg'), 'w', encoding='utf-8') as f:
    f.write(sentinel_svg)

# 4. Update sovereign-matrix.svg (Engraved Inset Sovereign Matrix)
matrix_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 300" width="100%" height="300">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&amp;family=Fira+Code:wght@500;700&amp;display=swap');
      .title-text {{
        font-family: 'Nebula', 'Orbitron', monospace;
        font-weight: 900;
        font-size: 15px;
        fill: #FFFFFF !important;
        stroke: #000000;
        stroke-width: 1.5px;
        paint-order: stroke fill;
        letter-spacing: 2px;
      }}
      .cell-title {{
        font-family: 'Nebula', 'Orbitron', monospace;
        font-weight: 800;
        font-size: 12px;
        fill: #00F0FF;
        letter-spacing: 1px;
      }}
      .cell-desc {{
        font-family: 'Fira Code', monospace;
        font-size: 10.5px;
        fill: #94A3B8;
      }}
    </style>
    <clipPath id="matrix-corner-clip">
      <rect width="950" height="300" rx="16" />
    </clipPath>
    <linearGradient id="engraved-base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020306" />
      <stop offset="30%" stop-color="#070B14" />
      <stop offset="70%" stop-color="#0A0F1E" />
      <stop offset="100%" stop-color="#010204" />
    </linearGradient>
    <linearGradient id="bevel-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#7000FF" />
    </linearGradient>
    <linearGradient id="cell-obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080D1A" />
      <stop offset="50%" stop-color="#03050A" />
      <stop offset="100%" stop-color="#0E1726" />
    </linearGradient>
  </defs>
  <g clip-path="url(#matrix-corner-clip)">
    <rect width="950" height="300" rx="16" fill="url(#engraved-base)" stroke="#000000" stroke-width="4"/>
    <rect x="3" y="3" width="944" height="294" rx="14" fill="none" stroke="#000000" stroke-width="3" opacity="0.9"/>
    <rect x="5" y="5" width="940" height="290" rx="13" fill="none" stroke="url(#bevel-glow)" stroke-width="1.5" />
    <rect x="7" y="7" width="936" height="286" rx="12" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3" />

    <rect x="30" y="18" width="890" height="34" rx="8" fill="#020408" stroke="#000000" stroke-width="2"/>
    <text x="475" y="41" text-anchor="middle" class="title-text" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" paint-order="stroke fill">⚡ ETHERNIUM SOVEREIGN COMPUTE MATRIX</text>

    <!-- 4 Engraved Inset Grid Cards -->
    <g transform="translate(40, 70)">
      <rect width="415" height="95" rx="10" fill="url(#cell-obsidian)" stroke="#000000" stroke-width="2.5"/>
      <rect x="2" y="2" width="411" height="91" rx="8" fill="none" stroke="#00F0FF" stroke-width="1.5"/>
      <text x="20" y="30" class="cell-title">CORE_KERNEL // LOCAL SOVEREIGNTY</text>
      <text x="20" y="55" class="cell-desc">Zero external lock-in. Deterministic sandbox execution.</text>
      <text x="20" y="75" class="cell-desc">Bare-metal hardware optimization @ maximum throughput.</text>
    </g>

    <g transform="translate(495, 70)">
      <rect width="415" height="95" rx="10" fill="url(#cell-obsidian)" stroke="#000000" stroke-width="2.5"/>
      <rect x="2" y="2" width="411" height="91" rx="8" fill="none" stroke="#7000FF" stroke-width="1.5"/>
      <text x="20" y="30" class="cell-title">GPU_KINETICS // 100K SHADER ENGINE</text>
      <text x="20" y="55" class="cell-desc">BufferGeometry allocation via native Float32Array.</text>
      <text x="20" y="75" class="cell-desc">GLSL Simplex Noise 3D &amp; Newtonian gravity physics.</text>
    </g>

    <g transform="translate(40, 180)">
      <rect width="415" height="95" rx="10" fill="url(#cell-obsidian)" stroke="#000000" stroke-width="2.5"/>
      <rect x="2" y="2" width="411" height="91" rx="8" fill="none" stroke="#00FF9D" stroke-width="1.5"/>
      <text x="20" y="30" class="cell-title">CONTROL_LOOPS // AGENTIC DIRECTIVES</text>
      <text x="20" y="55" class="cell-desc">Multidisciplinary synthesis: control theory &amp; discrete math.</text>
      <text x="20" y="75" class="cell-desc">Self-verifying automated regression testbeds.</text>
    </g>

    <g transform="translate(495, 180)">
      <rect width="415" height="95" rx="10" fill="url(#cell-obsidian)" stroke="#000000" stroke-width="2.5"/>
      <rect x="2" y="2" width="411" height="91" rx="8" fill="none" stroke="#FFD700" stroke-width="1.5"/>
      <text x="20" y="30" class="cell-title">OBSIDIAN_UI // GLASSMORPHIC SHADERS</text>
      <text x="20" y="55" class="cell-desc">Engraved inset 3D bevels with white glowing Nebula font.</text>
      <text x="20" y="75" class="cell-desc">Zero placeholders. High-fidelity corporate aesthetics.</text>
    </g>
  </g>
</svg>'''

with open(os.path.join(target_dir, 'sovereign-matrix.svg'), 'w', encoding='utf-8') as f:
    f.write(matrix_svg)

# 5. Update system-telemetry.svg (Engraved Inset System Telemetry)
telemetry_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 220" width="100%" height="220">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&amp;family=Fira+Code:wght@500;700&amp;display=swap');
      .title-text {{
        font-family: 'Nebula', 'Orbitron', monospace;
        font-weight: 900;
        font-size: 15px;
        fill: #FFFFFF !important;
        stroke: #000000;
        stroke-width: 1.5px;
        paint-order: stroke fill;
        letter-spacing: 2px;
      }}
      .metric-title {{
        font-family: 'Fira Code', monospace;
        font-size: 10.5px;
        fill: #94A3B8;
        text-transform: uppercase;
        letter-spacing: 1px;
      }}
      .metric-value {{
        font-family: 'Nebula', 'Orbitron', monospace;
        font-weight: 900;
        font-size: 16px;
        fill: #00F0FF;
        letter-spacing: 1px;
      }}
    </style>
    <clipPath id="tele-corner-clip">
      <rect width="950" height="220" rx="16" />
    </clipPath>
    <linearGradient id="engraved-base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020306" />
      <stop offset="30%" stop-color="#070B14" />
      <stop offset="70%" stop-color="#0A0F1E" />
      <stop offset="100%" stop-color="#010204" />
    </linearGradient>
    <linearGradient id="bevel-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#7000FF" />
    </linearGradient>
    <linearGradient id="card-obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080D1A" />
      <stop offset="50%" stop-color="#03050A" />
      <stop offset="100%" stop-color="#0E1726" />
    </linearGradient>
  </defs>
  <g clip-path="url(#tele-corner-clip)">
    <rect width="950" height="220" rx="16" fill="url(#engraved-base)" stroke="#000000" stroke-width="4"/>
    <rect x="3" y="3" width="944" height="214" rx="14" fill="none" stroke="#000000" stroke-width="3" opacity="0.9"/>
    <rect x="5" y="5" width="940" height="210" rx="13" fill="none" stroke="url(#bevel-glow)" stroke-width="1.5" />
    <rect x="7" y="7" width="936" height="206" rx="12" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3" />

    <rect x="30" y="18" width="890" height="34" rx="8" fill="#020408" stroke="#000000" stroke-width="2"/>
    <text x="475" y="41" text-anchor="middle" class="title-text" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" paint-order="stroke fill">📊 ETHERNIUM SYSTEM TELEMETRY &amp; HARDWARE METRICS</text>

    <!-- 3 Engraved Metric Cards -->
    <g transform="translate(40, 75)">
      <rect width="270" height="115" rx="10" fill="url(#card-obsidian)" stroke="#000000" stroke-width="2.5"/>
      <rect x="2" y="2" width="266" height="111" rx="8" fill="none" stroke="#00F0FF" stroke-width="1.5"/>
      <text x="20" y="30" class="metric-title">GPU PARTICLES</text>
      <text x="20" y="60" class="metric-value">100,000 GPU PARTICLES</text>
      <text x="20" y="85" class="metric-title" fill="#00FF9D">BUFFERGEOMETRY ACTIVE</text>
    </g>

    <g transform="translate(340, 75)">
      <rect width="270" height="115" rx="10" fill="url(#card-obsidian)" stroke="#000000" stroke-width="2.5"/>
      <rect x="2" y="2" width="266" height="111" rx="8" fill="none" stroke="#7000FF" stroke-width="1.5"/>
      <text x="20" y="30" class="metric-title">FRAME RATE BASELINE</text>
      <text x="20" y="60" class="metric-value">60 FPS STABLE</text>
      <text x="20" y="85" class="metric-title" fill="#00FF9D">HARDWARE ACCELERATED</text>
    </g>

    <g transform="translate(640, 75)">
      <rect width="270" height="115" rx="10" fill="url(#card-obsidian)" stroke="#000000" stroke-width="2.5"/>
      <rect x="2" y="2" width="266" height="111" rx="8" fill="none" stroke="#FFD700" stroke-width="1.5"/>
      <text x="20" y="30" class="metric-title">PHYSICS ENGINE</text>
      <text x="20" y="60" class="metric-value">NEWTONIAN GRAVITY</text>
      <text x="20" y="85" class="metric-title" fill="#00FF9D">INVICTVS 3D MASK CYCLE</text>
    </g>
  </g>
</svg>'''

with open(os.path.join(target_dir, 'system-telemetry.svg'), 'w', encoding='utf-8') as f:
    f.write(telemetry_svg)

print('Successfully re-built all 5 main SVGs with Engraved Inset 3D Obsidiana Depth and Rounded Corners!')
