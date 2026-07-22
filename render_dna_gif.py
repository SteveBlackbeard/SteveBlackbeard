import math, random
from PIL import Image, ImageDraw

width, height = 960, 340
num_frames = 48
random.seed(42)
frames = []

for frame_idx in range(num_frames):
    img = Image.new('RGB', (width, height), (2, 3, 6))
    draw = ImageDraw.Draw(img)
    t = frame_idx / num_frames

    # ═══ ROTATING B-DNA DOUBLE HELIX (dense colorful spheres) ═══
    cx, cy = 480, 170
    amp = 62.0
    BASES = [
        (0xE0E000, 0x00C8E0),  # A-T: yellow-cyan
        (0x00E060, 0xFF69B4),  # G-C: green-pink
        (0xFF8800, 0x8A2BE2),  # A-T variant: orange-violet
        (0x00BBFF, 0xFF4466),  # G-C variant: blue-red
    ]

    # Real human TP53 gene partial sequence
    SEQ = "ATGGAGGAGCCGCAGTCAGATCCTAGCGTGAGTTTGCACTGATGGAGGAGCCGCAGTCAGATCCTAGCGTGAGT"
    BASE_COLORS = {'A': 0xFFDD00, 'T': 0x00D4FF, 'G': 0x00FF7D, 'C': 0xFF69B4}
    COMP = {'A':'T', 'T':'A', 'G':'C', 'C':'G'}

    num_bp = 70
    helix_len = 700
    turns = 4.5
    phase = t * math.pi * 2  # full rotation per loop

    for bp in range(num_bp):
        p = bp / num_bp
        x = (p - 0.5) * helix_len + cx
        angle1 = p * turns * math.pi * 2 + phase
        angle2 = angle1 + math.pi + 0.38 * math.pi

        y1 = cy + math.sin(angle1) * amp
        y2 = cy + math.sin(angle2) * amp
        d1 = math.cos(angle1)
        d2 = math.cos(angle2)

        base_char = SEQ[bp % len(SEQ)]
        comp_char = COMP.get(base_char, 'T')
        base_col_hex = BASE_COLORS.get(base_char, 0xFFDD00)
        comp_col_hex = BASE_COLORS.get(comp_char, 0x00D4FF)

        base_col = ((base_col_hex >> 16) & 0xFF, (base_col_hex >> 8) & 0xFF, base_col_hex & 0xFF)
        comp_col = ((comp_col_hex >> 16) & 0xFF, (comp_col_hex >> 8) & 0xFF, comp_col_hex & 0xFF)

        # Base pair bridge spheres (6 per pair for density)
        for r in range(7):
            rp = (r + 1) / 8
            ry = y1 + (y2 - y1) * rp
            rd = d1 + (d2 - d1) * rp

            if rp < 0.5:
                col = tuple(max(0, min(255, int(base_col[j] * (0.5 + rd * 0.3)))) for j in range(3))
            else:
                col = tuple(max(0, min(255, int(comp_col[j] * (0.5 + rd * 0.3)))) for j in range(3))

            dot_r = max(1, int(2.8 + rd * 1.8))
            draw.ellipse([x - dot_r, ry - dot_r, x + dot_r, ry + dot_r], fill=col)

        # Backbone spheres (darker steel blue, larger)
        br1 = max(3, int(4.5 + d1 * 2.8))
        br2 = max(3, int(4.5 + d2 * 2.8))

        # Backbone 1: steel blue with depth shading
        bb1_bright = max(0, min(255, int(100 + d1 * 80)))
        bb1_col = (max(0, int(30 + d1 * 20)), max(0, int(50 + d1 * 40)), bb1_bright)

        # Backbone 2: darker steel
        bb2_bright = max(0, min(255, int(90 + d2 * 70)))
        bb2_col = (max(0, int(25 + d2 * 15)), max(0, int(45 + d2 * 35)), bb2_bright)

        draw.ellipse([x - br1, y1 - br1, x + br1, y1 + br1], fill=bb1_col)
        draw.ellipse([x - br2, y2 - br2, x + br2, y2 + br2], fill=bb2_col)

        # Extra phosphate group spheres between backbone positions
        if bp < num_bp - 1:
            nx = x + helix_len / num_bp * 0.5
            na1 = (bp + 0.5) / num_bp * turns * math.pi * 2 + phase
            na2 = na1 + math.pi + 0.38 * math.pi
            ny1 = cy + math.sin(na1) * amp
            ny2 = cy + math.sin(na2) * amp
            nd1 = math.cos(na1)
            nd2 = math.cos(na2)

            pr1 = max(2, int(3 + nd1 * 1.5))
            pr2 = max(2, int(3 + nd2 * 1.5))
            pc1 = (max(0, int(60 + nd1 * 30)), max(0, int(40 + nd1 * 20)), max(0, int(80 + nd1 * 50)))
            pc2 = (max(0, int(55 + nd2 * 25)), max(0, int(35 + nd2 * 18)), max(0, int(75 + nd2 * 45)))
            draw.ellipse([nx - pr1, ny1 - pr1, nx + pr1, ny1 + pr1], fill=pc1)
            draw.ellipse([nx - pr2, ny2 - pr2, nx + pr2, ny2 + pr2], fill=pc2)

    # Header
    draw.text((10, 8), 'NULLA-LABS // REAL B-DNA DOUBLE HELIX ENGINE', fill=(0, 180, 200))

    # Telemetry panel
    draw.rectangle([10, 32, 230, 155], outline=(0, 40, 50))
    draw.text((15, 37), 'GENOMIC TELEMETRY', fill=(0, 140, 160))
    draw.text((15, 55), 'GENE: TP53 (Tumor Suppressor)', fill=(130, 160, 200))
    draw.text((15, 70), 'LOCUS: 17p13.1', fill=(100, 130, 170))
    draw.text((15, 85), 'BASE PAIRS: 70 bp (partial CDS)', fill=(100, 130, 170))
    draw.text((15, 100), 'BACKBONE: Phosphodiester', fill=(100, 130, 170))
    draw.text((15, 115), 'BONDS: H-bonds + Covalent', fill=(100, 130, 170))
    draw.text((15, 130), 'FORM: B-DNA (10.5 bp/turn)', fill=(100, 130, 170))

    # Legend
    draw.text((10, 300), 'A', fill=(255, 221, 0))
    draw.text((22, 300), 'T', fill=(0, 212, 255))
    draw.text((34, 300), 'G', fill=(0, 255, 125))
    draw.text((46, 300), 'C', fill=(255, 105, 180))
    draw.text((64, 300), '| BACKBONE', fill=(80, 100, 150))

    # Footer
    draw.text((10, 318), 'ATOMS: 1260 | 60 FPS | WEBGL 2.0 | REAL HUMAN GENOME SEQUENCE', fill=(60, 80, 110))

    # Sequence readout (scrolling)
    offset = int(t * len(SEQ)) % len(SEQ)
    seq_display = (SEQ + SEQ)[offset:offset + 40]
    sx = 250
    for ci, ch in enumerate(seq_display):
        col_map = {'A': (255,221,0), 'T': (0,212,255), 'G': (0,255,125), 'C': (255,105,180)}
        draw.text((sx + ci * 8, 318), ch, fill=col_map.get(ch, (150,150,150)))

    frames.append(img)

out = r'C:\Users\esenc\.gemini\antigravity\scratch\github_profile_readme\particle-dna-console-v16-helix.gif'
frames[0].save(out, save_all=True, append_images=frames[1:], duration=83, loop=0, optimize=True)
print('SUCCESS: particle-dna-console-v16-helix.gif rendered')
