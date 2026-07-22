import base64
import os
from PIL import Image

target_dir = r'C:\Users\esenc\.gemini\antigravity\scratch\github_profile_readme'

logo_path = os.path.join(target_dir, 'ethernium-brand-logo1.png')
img = Image.open(logo_path)

# Crop tight bounding box (remove all transparent padding)
bbox = img.getbbox()
print('Original size:', img.size, 'Tight Bounding Box:', bbox)
cropped_img = img.crop(bbox)

cropped_path = os.path.join(target_dir, 'ethernium-brand-logo1-cropped.png')
cropped_img.save(cropped_path)

with open(cropped_path, 'rb') as f:
    b64_logo1 = 'data:image/png;base64,' + base64.b64encode(f.read()).decode('utf-8')

header_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 300" width="100%" height="300">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&amp;family=Fira+Code:wght@500;700&amp;display=swap');
      
      .subtitle-text {{
        font-family: 'Nebula', 'Orbitron', 'Fira Code', monospace;
        font-weight: 700;
        font-size: 14px;
        fill: #00F0FF;
        letter-spacing: 4px;
        filter: drop-shadow(0px 0px 6px rgba(112, 0, 255, 0.6));
      }}
      
      .badge-text {{
        font-family: 'Fira Code', monospace;
        font-size: 11.5px;
        font-weight: 700;
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
      <rect width="950" height="300" rx="16" />
    </clipPath>

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
    <rect width="950" height="300" rx="16" fill="url(#engraved-base)" stroke="#000000" stroke-width="4"/>
    <rect x="3" y="3" width="944" height="294" rx="14" fill="none" stroke="#000000" stroke-width="3" opacity="0.9"/>
    <rect x="5" y="5" width="940" height="290" rx="13" fill="none" stroke="url(#glass-bevel-glow)" stroke-width="1.5" />
    <rect x="7" y="7" width="936" height="286" rx="12" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3" />

    <g class="sheen-anim">
      <polygon points="100,0 350,0 150,300 -100,300" fill="url(#moving-sheen)" />
    </g>

    <path d="M 18 18 L 75 18 M 18 18 L 18 75" class="glow-border" stroke-width="3.5" fill="none" />
    <path d="M 932 18 L 875 18 M 932 18 L 932 75" class="glow-border" stroke-width="3.5" fill="none" />
    <path d="M 18 282 L 75 282 M 18 282 L 18 225" class="glow-border" stroke-width="3.5" fill="none" />
    <path d="M 932 282 L 875 282 M 932 282 L 932 225" class="glow-border" stroke-width="3.5" fill="none" />

    <rect x="40" y="16" width="870" height="28" rx="8" fill="#020408" stroke="#000000" stroke-width="2"/>
    <circle cx="60" cy="30" r="4.5" class="pulse-dot" />
    <text x="76" y="34" class="badge-text">NULLA-LABS // OFFICIAL ETHERNIUM ENGRAVED OBSIDIAN MONOLITH</text>
    <text x="790" y="34" class="badge-text" fill="#00FF9D">[BRAND_ACTIVE]</text>

    <!-- CROPPED TIGHT ETHERNIUM LOGO EXPANDED TO FULL 900x215 CANVAS -->
    <image href="{b64_logo1}" x="25" y="42" width="900" height="215" />

    <g transform="translate(475, 272)">
      <text text-anchor="middle" class="subtitle-text">AUTONOMOUS ARCHITECTURES • GPU ENGINE • CONTROL SYSTEMS</text>
    </g>

    <line x1="140" y1="284" x2="810" y2="284" stroke="url(#glass-bevel-glow)" stroke-width="2.5" />
  </g>
</svg>'''

with open(os.path.join(target_dir, 'header-ethernium-v10.svg'), 'w', encoding='utf-8') as f:
    f.write(header_svg)

print('Successfully created header-ethernium-v10.svg with CROPPED TIGHT logo expanded to 900x215!')
