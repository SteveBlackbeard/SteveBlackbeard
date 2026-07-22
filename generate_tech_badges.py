import os

target_dir = r'C:\Users\esenc\.gemini\antigravity\scratch\github_profile_readme'
badges_dir = os.path.join(target_dir, 'badges')
os.makedirs(badges_dir, exist_ok=True)

tech_list = [
    # Languages & Compute
    ('badge-c.svg', 'C', '#00F0FF', '100'),
    ('badge-cpp.svg', 'C++', '#00F0FF', '110'),
    ('badge-python.svg', 'Python', '#FFD700', '125'),
    ('badge-rust.svg', 'Rust', '#FF5555', '110'),
    ('badge-android.svg', 'Android', '#00FF9D', '125'),
    ('badge-markdown.svg', 'Markdown', '#94A3B8', '135'),
    ('badge-yolov5.svg', 'YOLOv5', '#FF7700', '125'),
    ('badge-openmpi.svg', 'OpenMPI', '#00F0FF', '130'),

    # Hardware & Embedded
    ('badge-raspberrypi.svg', 'Raspberry Pi', '#FF0055', '150'),
    ('badge-arduino.svg', 'Arduino', '#00FF9D', '125'),
    ('badge-esp32.svg', 'ESP32 / ESP8266', '#FF5555', '165'),
    ('badge-stm32.svg', 'STM32', '#00F0FF', '115'),
    ('badge-rk3568.svg', 'RK3568 / RK3588', '#FF7700', '170'),

    # Git & Ops
    ('badge-git.svg', 'Git', '#FF5555', '100'),
    ('badge-gitlab.svg', 'GitLab', '#FF7700', '115'),
    ('badge-github.svg', 'GitHub', '#FFFFFF', '120'),
    ('badge-gitea.svg', 'Gitea', '#00FF9D', '110'),

    # Tools & IDEs
    ('badge-vscode.svg', 'VS Code', '#00F0FF', '125'),
    ('badge-pycharm.svg', 'PyCharm', '#00FF9D', '130'),
    ('badge-clion.svg', 'CLion', '#7000FF', '115'),
    ('badge-vim.svg', 'Vim', '#00FF9D', '100'),
    ('badge-docker.svg', 'Docker', '#00F0FF', '120'),
    ('badge-bash.svg', 'GNU Bash', '#FFD700', '130'),

    # OS & Platforms
    ('badge-arch.svg', 'Arch Linux', '#00F0FF', '135'),
    ('badge-debian.svg', 'Debian', '#FF0055', '115'),
    ('badge-ubuntu.svg', 'Ubuntu', '#FF7700', '120'),
    ('badge-windows.svg', 'Windows', '#00F0FF', '130'),
    ('badge-quest3.svg', 'Meta Quest 3', '#7000FF', '150')
]

for filename, label, glow_color, width in tech_list:
    w = int(width)
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} 32" width="{w}" height="32">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&amp;display=swap');
      .tech-text {{
        font-family: 'Fira Code', monospace;
        font-weight: 700;
        font-size: 11px;
        fill: #FFFFFF !important;
        stroke: #000000;
        stroke-width: 1.2px;
        paint-order: stroke fill;
        letter-spacing: 1px;
      }}
      .sheen-move {{
        animation: moveSheen 3.2s ease-in-out infinite alternate;
      }}
      @keyframes moveSheen {{
        0% {{ transform: translateX(-{w}px); }}
        100% {{ transform: translateX({w}px); }}
      }}
    </style>

    <clipPath id="tech-clip">
      <rect width="{w}" height="32" rx="7" />
    </clipPath>

    <linearGradient id="bg-obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#142138" />
      <stop offset="50%" stop-color="#080D1A" />
      <stop offset="100%" stop-color="#03050A" />
    </linearGradient>

    <linearGradient id="moving-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0" />
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>
  </defs>

  <g clip-path="url(#tech-clip)">
    <rect width="{w}" height="32" rx="7" fill="url(#bg-obsidian)" stroke="#1E293B" stroke-width="1.5"/>

    <g class="sheen-move">
      <polygon points="20,0 70,0 35,32 -15,32" fill="url(#moving-sheen)" />
    </g>

    <rect x="2" y="2" width="{w-4}" height="28" rx="5" fill="none" stroke="{glow_color}" stroke-width="1" opacity="0.8"/>
    <rect x="4" y="4" width="{w-8}" height="24" rx="4" fill="none" stroke="#FFFFFF" stroke-width="0.8" opacity="0.4"/>

    <text x="{w/2}" y="20" text-anchor="middle" class="tech-text">{label}</text>
  </g>
</svg>'''

    filepath = os.path.join(badges_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(svg_content)

print(f'Successfully generated {len(tech_list)} 3D Obsidian Tech Badges!')
