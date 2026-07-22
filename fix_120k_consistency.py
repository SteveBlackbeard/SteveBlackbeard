import os

target_dir = r'C:\Users\esenc\.gemini\antigravity\scratch\github_profile_readme'

files_to_check = [
    'seneschal-chronolith.svg',
    'system-telemetry.svg',
    'ethernium-sentinel.svg',
    'sovereign-matrix.svg',
    'header-ethernium-v10.svg',
    'README.md',
    'demo/index.html',
    'demo/app.js'
]

for filename in files_to_check:
    filepath = os.path.join(target_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace 100,000 and 100K with 120,000 and 120K
        content = content.replace('100,000 Particle Physics Shaders', '120,000 Particle Physics Shaders')
        content = content.replace('100,000 PARTICLES', '120,000 PARTICLES')
        content = content.replace('100,000 Particles', '120,000 Particles')
        content = content.replace('100,000 GPU Particles', '120,000 GPU Particles')
        content = content.replace('100,000 GPU PARTICLES', '120,000 GPU PARTICLES')
        content = content.replace('100K GPU Telemetry', '120K GPU Telemetry')
        content = content.replace('100K SHADER ENGINE', '120K SHADER ENGINE')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print('Successfully updated 120,000 GPU Particles metric consistently across all SVG, HTML, JS, and MD files!')
