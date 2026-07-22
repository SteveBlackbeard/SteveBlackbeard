import math, random
from PIL import Image, ImageDraw

width, height = 960, 340
num_frames = 48
random.seed(42)
frames = []

CATS = {
    'alkali': (255,215,0), 'alkaline': (255,153,0), 'transition': (0,212,255),
    'post': (170,170,170), 'metalloid': (0,255,157), 'nonmetal': (0,240,255),
    'halogen': (255,0,85), 'noble': (191,0,255), 'lanthanide': (255,105,180),
    'actinide': (255,100,50)
}

PT = [
    ('H',0,0,'nonmetal'),('He',0,17,'noble'),
    ('Li',1,0,'alkali'),('Be',1,1,'alkaline'),('B',1,12,'metalloid'),('C',1,13,'nonmetal'),
    ('N',1,14,'nonmetal'),('O',1,15,'nonmetal'),('F',1,16,'halogen'),('Ne',1,17,'noble'),
    ('Na',2,0,'alkali'),('Mg',2,1,'alkaline'),('Al',2,12,'post'),('Si',2,13,'metalloid'),
    ('P',2,14,'nonmetal'),('S',2,15,'nonmetal'),('Cl',2,16,'halogen'),('Ar',2,17,'noble'),
]
p4 = ['K','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr']
p4c = ['alkali','alkaline']+['transition']*10+['post','metalloid','metalloid','nonmetal','halogen','noble']
for i,s in enumerate(p4): PT.append((s,3,i,p4c[i]))
p5 = ['Rb','Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe']
p5c = ['alkali','alkaline']+['transition']*10+['post','post','metalloid','metalloid','halogen','noble']
for i,s in enumerate(p5): PT.append((s,4,i,p5c[i]))

equations = [
    ('H + O  -->  H2O  (Water)',        (255, 0, 85)),
    ('Na + Cl --> NaCl (Salt)',          (255, 215, 0)),
    ('C + O  -->  CO2  (Carbon Dioxide)',(0, 240, 255)),
    ('Fe + O --> Fe2O3 (Rust)',          (0, 212, 255)),
]

for frame_idx in range(num_frames):
    img = Image.new('RGB', (width, height), (2, 3, 6))
    draw = ImageDraw.Draw(img)
    t = frame_idx / num_frames

    # DNA helix left side
    cx, cy = 240, 170
    amp = 52.0
    for bp in range(55):
        p = bp / 55
        x = (p - 0.5) * 380 + cx
        a1 = p * 4.0 * math.pi * 2 + t * math.pi * 2
        a2 = a1 + math.pi + 0.38 * math.pi
        y1 = cy + math.sin(a1) * amp
        y2 = cy + math.sin(a2) * amp
        d1 = math.cos(a1)
        d2 = math.cos(a2)

        for r in range(5):
            rp = (r+1)/6
            ry = y1 + (y2 - y1) * rp
            rd = d1 + (d2 - d1) * rp
            bright = int(60 + rd * 40)
            col = (0, max(0, bright), max(0, bright + 30))
            dot_r = max(1, int(2 + rd * 1.5))
            draw.ellipse([x-dot_r, ry-dot_r, x+dot_r, ry+dot_r], fill=col)

        br1 = max(2, int(3.5 + d1 * 2.5))
        br2 = max(2, int(3.5 + d2 * 2.5))
        c1 = (255, max(0, int(130 + d1 * 80)), 0)
        c2 = (0, max(0, int(200 + d2 * 55)), 255)
        draw.ellipse([x-br1, y1-br1, x+br1, y1+br1], fill=c1)
        draw.ellipse([x-br2, y2-br2, x+br2, y2+br2], fill=c2)

    # Mini periodic table right side
    pt_x, pt_y = 560, 45
    cell_w, cell_h = 17, 15
    for (sym, row, col, cat) in PT:
        cx2 = pt_x + col * (cell_w + 1)
        cy2 = pt_y + row * (cell_h + 1)
        color = CATS[cat]
        bg = tuple(max(0, int(c * 0.18)) for c in color)
        border = tuple(max(0, int(c * 0.45)) for c in color)
        draw.rectangle([cx2, cy2, cx2+cell_w, cy2+cell_h], fill=bg, outline=border)

    # Equation cycling
    eq_idx = int(t * len(equations)) % len(equations)
    eq_text, eq_col = equations[eq_idx]
    draw.text((570, 135), eq_text, fill=eq_col)

    # Molecule visualization (center-right)
    mol_cx, mol_cy = 700, 230
    progress = (t * 4) % 1.0

    if eq_idx == 0:
        # Water: O in center, 2 H
        draw.ellipse([mol_cx-9, mol_cy-9, mol_cx+9, mol_cy+9], fill=(255,0,85))
        h1x = mol_cx - 20 - int((1-progress)*15)
        h1y = mol_cy - 12
        h2x = mol_cx + 16 + int((1-progress)*15)
        h2y = mol_cy + 10
        draw.ellipse([h1x-5, h1y-5, h1x+5, h1y+5], fill=(220,220,255))
        draw.ellipse([h2x-5, h2y-5, h2x+5, h2y+5], fill=(220,220,255))
        if progress > 0.35:
            draw.line([(mol_cx,mol_cy),(h1x,h1y)], fill=(100,120,180), width=2)
            draw.line([(mol_cx,mol_cy),(h2x,h2y)], fill=(100,120,180), width=2)
        draw.text((660, 265), 'WATER (H2O)', fill=(255,100,130))
    elif eq_idx == 1:
        # NaCl
        draw.ellipse([mol_cx-12-6, mol_cy-6, mol_cx-12+6, mol_cy+6], fill=(255,215,0))
        draw.ellipse([mol_cx+12-6, mol_cy-6, mol_cx+12+6, mol_cy+6], fill=(0,255,157))
        if progress > 0.3:
            draw.line([(mol_cx-6,mol_cy),(mol_cx+6,mol_cy)], fill=(200,200,150), width=2)
        draw.text((660, 265), 'SALT (NaCl)', fill=(255,215,0))
    elif eq_idx == 2:
        # CO2
        draw.ellipse([mol_cx-8, mol_cy-8, mol_cx+8, mol_cy+8], fill=(138,43,226))
        draw.ellipse([mol_cx-25-6, mol_cy-6, mol_cx-25+6, mol_cy+6], fill=(255,0,85))
        draw.ellipse([mol_cx+25-6, mol_cy-6, mol_cx+25+6, mol_cy+6], fill=(255,0,85))
        if progress > 0.25:
            draw.line([(mol_cx-8,mol_cy),(mol_cx-19,mol_cy)], fill=(120,50,160), width=2)
            draw.line([(mol_cx+8,mol_cy),(mol_cx+19,mol_cy)], fill=(120,50,160), width=2)
        draw.text((640, 265), 'CARBON DIOXIDE (CO2)', fill=(0,240,255))
    else:
        # Fe2O3
        for ix in range(2):
            fx = mol_cx - 15 + ix * 30
            draw.ellipse([fx-7, mol_cy-7, fx+7, mol_cy+7], fill=(0,180,255))
        for ix in range(3):
            ox = mol_cx - 20 + ix * 20
            oy = mol_cy - 20
            draw.ellipse([ox-5, oy-5, ox+5, oy+5], fill=(255,0,85))
        draw.text((650, 265), 'IRON OXIDE (Fe2O3)', fill=(0,212,255))

    # Header and footer
    draw.text((10, 8), 'NULLA-LABS // IUPAC 3D MOLECULAR SYNTHESIS', fill=(0, 180, 200))
    draw.text((10, 310), 'FPS: 60 | ATOMS: 630 | 118 ELEMENTS | WEBGL', fill=(80, 100, 130))

    # Telemetry panel
    draw.rectangle([10, 35, 200, 155], outline=(0, 40, 50))
    draw.text((15, 40), 'MOLECULAR TELEMETRY', fill=(0, 140, 160))
    name = eq_text.split('(')[1].rstrip(')') if '(' in eq_text else 'B-DNA'
    draw.text((15, 58), 'ASSEMBLY: ' + name, fill=(130, 160, 200))
    draw.text((15, 73), 'BONDING: Covalent', fill=(100, 130, 170))
    draw.text((15, 88), 'STATE: Active', fill=(100, 130, 170))

    # Open PT button
    draw.rectangle([15, 120, 190, 145], outline=(0, 100, 120))
    draw.text((22, 126), 'OPEN PERIODIC TABLE', fill=(0, 200, 220))

    frames.append(img)

out = r'C:\Users\esenc\.gemini\antigravity\scratch\github_profile_readme\particle-dna-console-v15-synthesis.gif'
frames[0].save(out, save_all=True, append_images=frames[1:], duration=83, loop=0, optimize=True)
print('SUCCESS: particle-dna-console-v15-synthesis.gif rendered')
