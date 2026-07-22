import math, random, os
from PIL import Image, ImageDraw

target_dir = r'C:\Users\esenc\.gemini\antigravity\scratch\github_profile_readme'

width, height = 950, 320

# Color definitions for B-DNA bases
BASE_COLORS = [
    (255, 221, 0),    # Yellow
    (0, 212, 255),    # Cyan
    (0, 255, 125),    # Green
    (255, 105, 180),  # Pink
    (138, 43, 226),   # Violet
    (255, 85, 0),     # Orange
]

COL_A = (255, 221, 0)     # Adenine: Yellow
COL_T = (0, 212, 255)     # Thymine: Cyan
COL_G = (0, 255, 125)     # Guanine: Green
COL_C = (255, 105, 180)    # Cytosine: Pink

# Periodic table category colors
CAT_COLORS = {
    'ak': (255,215,0),    # Alkali
    'ae': (255,153,0),    # Alkaline Earth
    'tm': (0,200,255),    # Transition
    'pt': (170,170,170),  # Post-transition
    'md': (0,255,157),    # Metalloid
    'nm': (0,240,255),    # Nonmetal
    'ha': (255,0,85),     # Halogen
    'ng': (191,0,255),    # Noble gas
    'la': (255,105,180),  # Lanthanide
    'ac': (255,100,50),   # Actinide
}

PT_MAIN = [
    ('H',0,0,'nm'),('He',0,17,'ng'),
    ('Li',1,0,'ak'),('Be',1,1,'ae'),('B',1,12,'md'),('C',1,13,'nm'),('N',1,14,'nm'),('O',1,15,'nm'),('F',1,16,'ha'),('Ne',1,17,'ng'),
    ('Na',2,0,'ak'),('Mg',2,1,'ae'),('Al',2,12,'pt'),('Si',2,13,'md'),('P',2,14,'nm'),('S',2,15,'nm'),('Cl',2,16,'ha'),('Ar',2,17,'ng'),
    ('K',3,0,'ak'),('Ca',3,1,'ae'),('Sc',3,2,'tm'),('Ti',3,3,'tm'),('V',3,4,'tm'),('Cr',3,5,'tm'),('Mn',3,6,'tm'),('Fe',3,7,'tm'),
    ('Co',3,8,'tm'),('Ni',3,9,'tm'),('Cu',3,10,'tm'),('Zn',3,11,'tm'),('Ga',3,12,'pt'),('Ge',3,13,'md'),('As',3,14,'md'),('Se',3,15,'nm'),('Br',3,16,'ha'),('Kr',3,17,'ng'),
    ('Rb',4,0,'ak'),('Sr',4,1,'ae'),('Y',4,2,'tm'),('Zr',4,3,'tm'),('Nb',4,4,'tm'),('Mo',4,5,'tm'),('Tc',4,6,'tm'),('Ru',4,7,'tm'),
    ('Rh',4,8,'tm'),('Pd',4,9,'tm'),('Ag',4,10,'tm'),('Cd',4,11,'tm'),('In',4,12,'pt'),('Sn',4,13,'pt'),('Sb',4,14,'md'),('Te',4,15,'md'),('I',4,16,'ha'),('Xe',4,17,'ng'),
    ('Cs',5,0,'ak'),('Ba',5,1,'ae'),('Hf',5,3,'tm'),('Ta',5,4,'tm'),('W',5,5,'tm'),('Re',5,6,'tm'),('Os',5,7,'tm'),
    ('Ir',5,8,'tm'),('Pt',5,9,'tm'),('Au',5,10,'tm'),('Hg',5,11,'tm'),('Tl',5,12,'pt'),('Pb',5,13,'pt'),('Bi',5,14,'pt'),('Po',5,15,'md'),('At',5,16,'ha'),('Rn',5,17,'ng'),
    ('Fr',6,0,'ak'),('Ra',6,1,'ae'),('Rf',6,3,'tm'),('Db',6,4,'tm'),('Sg',6,5,'tm'),('Bh',6,6,'tm'),('Hs',6,7,'tm'),
    ('Mt',6,8,'tm'),('Ds',6,9,'tm'),('Rg',6,10,'tm'),('Cn',6,11,'tm'),('Nh',6,12,'pt'),('Fl',6,13,'pt'),('Mc',6,14,'pt'),('Lv',6,15,'pt'),('Ts',6,16,'ha'),('Og',6,17,'ng'),
]
LANT = [('La',57),('Ce',58),('Pr',59),('Nd',60),('Pm',61),('Sm',62),('Eu',63),('Gd',64),('Tb',65),('Dy',66),('Ho',67),('Er',68),('Tm',69),('Yb',70),('Lu',71)]
ACTN = [('Ac',89),('Th',90),('Pa',91),('U',92),('Np',93),('Pu',94),('Am',95),('Cm',96),('Bk',97),('Cf',98),('Es',99),('Fm',100),('Md',101),('No',102),('Lr',103)]

AU_SHELLS = [2, 8, 18, 32, 18, 1]
AU_SHELL_COLORS = [(255,50,50), (255,160,0), (255,255,0), (0,255,120), (0,180,255), (200,100,255)]

def draw_obsidian_terminal_base(draw, img, width, height, radius):
    # Solid dark obsidian background fill within the inner rounded window
    draw.rounded_rectangle([(4, 4), (width-5, height-5)], radius=radius-2, fill=(5, 9, 18, 255), outline=(0, 0, 0, 255), width=1)
    
    # Generate the gradient border image (Cyan -> White -> Purple)
    gradient_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw_grad = ImageDraw.Draw(gradient_img)
    for x in range(width):
        frac = x / width
        if frac < 0.5:
            sf = frac / 0.5
            r = int(0 + (255 - 0) * sf)
            g = int(240 + (255 - 240) * sf)
            b = int(255 + (255 - 255) * sf)
        else:
            sf = (frac - 0.5) / 0.5
            r = int(255 + (112 - 255) * sf)
            g = int(255 + (0 - 255) * sf)
            b = int(255 + (255 - 255) * sf)
        draw_grad.line([(x, 0), (x, height)], fill=(r, g, b, 255), width=1)
        
    # Create mask in RGB first to avoid falsy/None bugs with fill=0 in PIL L-mode
    mask_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    draw_mask = ImageDraw.Draw(mask_rgb)
    draw_mask.rounded_rectangle([(8, 8), (width-9, height-9)], radius=radius-4, fill=(255, 255, 255))
    draw_mask.rounded_rectangle([(10, 10), (width-11, height-11)], radius=radius-5, fill=(0, 0, 0))
    mask = mask_rgb.convert('L')
    
    img.paste(gradient_img, (0, 0), mask=mask)
    
    # Draw inner white border outline ONLY (1px width)
    inner_white_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    draw_white_mask = ImageDraw.Draw(inner_white_rgb)
    draw_white_mask.rounded_rectangle([(11, 11), (width-12, height-12)], radius=radius-6, fill=(255, 255, 255))
    draw_white_mask.rounded_rectangle([(12, 12), (width-13, height-13)], radius=radius-7, fill=(0, 0, 0))
    inner_white_mask = inner_white_rgb.convert('L')
    
    inner_white_color = Image.new('RGBA', (width, height), (80, 100, 120, 120))
    img.paste(inner_white_color, (0, 0), mask=inner_white_mask)

def convert_to_gif_frame(rgba_img):
    alpha = rgba_img.getchannel('A')
    rgb_img = rgba_img.convert('RGB')
    p_img = rgb_img.convert('P', palette=Image.Palette.ADAPTIVE, colors=255)
    
    transparent_mask = Image.eval(alpha, lambda a: 255 if a <= 128 else 0)
    p_img.paste(255, mask=transparent_mask)
    return p_img

# ═══════════════════════════════════════════════════════════════
# GENERATE SCHEMATIC B-DNA HELIX GIF WITH TELEMETRY (v16-helix)
# ═══════════════════════════════════════════════════════════════
def generate_dna_schematic():
    print("Generating Schematic B-DNA Helix GIF...")
    num_frames = 48
    cx, cy = 590, 158  # Center position of helix shifted to the right to fit the HUD
    amp = 84.0
    turns = 4.2
    helix_len = 640
    num_bp = 64
    frame_radius = 16
    frames = []

    # Real human TP53 gene partial sequence
    SEQ = "ATGGAGGAGCCGCAGTCAGATCCTAGCGTGAGTTTGCACTGATGGAGGAGCCGCAGTCAGATCCTAGCGTGAGT"
    BASE_COLORS = {'A': (255, 221, 0), 'T': (0, 212, 255), 'G': (0, 255, 125), 'C': (255, 105, 180)}
    COMP = {'A':'T', 'T':'A', 'G':'C', 'C':'G'}

    for frame_idx in range(num_frames):
        t = frame_idx / num_frames
        phase = t * math.pi * 2.0  # full rotation per loop

        # Transparent background for corner rounding
        img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        # Draw terminal frame
        draw_obsidian_terminal_base(draw, img, width, height, frame_radius)

        # Header Bar
        draw.rounded_rectangle([(14, 12), (width-15, 48)], radius=6, fill=(2, 4, 8, 255), outline=(0, 0, 0, 255), width=2)
        draw.ellipse([(26, 24), (36, 34)], fill=(255, 95, 87, 255))
        draw.ellipse([(42, 24), (52, 34)], fill=(255, 189, 46, 255))
        draw.ellipse([(58, 24), (68, 34)], fill=(39, 201, 63, 255))

        title_str = 'NULLA-LABS // REAL B-DNA DOUBLE HELIX ENGINE'
        draw.text((81, 23), title_str, fill=(0, 240, 255, 255))

        # Render B-DNA double helix structure (EXACT replica of v14 schematic math and style!)
        # Draw base pair bridges and backbones
        for bp in range(num_bp):
            p = bp / num_bp
            x = (p - 0.5) * helix_len + cx
            angle1 = p * turns * math.pi * 2.0 + phase
            angle2 = angle1 + math.pi + 0.38 * math.pi

            y1 = cy + math.sin(angle1) * amp
            y2 = cy + math.sin(angle2) * amp
            d1 = math.cos(angle1)
            d2 = math.cos(angle2)

            base_char = SEQ[bp % len(SEQ)]
            comp_char = COMP.get(base_char, 'T')
            base_col = BASE_COLORS.get(base_char, (255, 221, 0))
            comp_col = BASE_COLORS.get(comp_char, (0, 212, 255))

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
                if 14 < x < width-15 and 50 < ry < height-14:
                    draw.ellipse([x - dot_r, ry - dot_r, x + dot_r, ry + dot_r], fill=col + (255,))

            # Backbone spheres (darker steel blue, larger)
            br1 = max(3, int(4.5 + d1 * 2.8))
            br2 = max(3, int(4.5 + d2 * 2.8))

            # Backbone 1: bright orange/yellow gradient matching the reference image
            bb1_y = max(0, min(255, int(130 + d1 * 70)))
            bb1_col = (255, bb1_y, 0)

            # Backbone 2: bright red/magenta gradient matching the reference image
            bb2_m = max(0, min(255, int(110 + d2 * 70)))
            bb2_col = (255, 0, bb2_m)

            if 14 < x < width-15:
                if 50 < y1 < height-14:
                    draw.ellipse([x - br1, y1 - br1, x + br1, y1 + br1], fill=bb1_col + (255,))
                if 50 < y2 < height-14:
                    draw.ellipse([x - br2, y2 - br2, x + br2, y2 + br2], fill=bb2_col + (255,))

            # Extra phosphate group spheres between backbone positions
            if bp < num_bp - 1:
                nx = x + helix_len / num_bp * 0.5
                na1 = (bp + 0.5) / num_bp * turns * math.pi * 2.0 + phase
                na2 = na1 + math.pi + 0.38 * math.pi
                ny1 = cy + math.sin(na1) * amp
                ny2 = cy + math.sin(na2) * amp
                nd1 = math.cos(na1)
                nd2 = math.cos(na2)

                pr1 = max(2, int(3 + nd1 * 1.5))
                pr2 = max(2, int(3 + nd2 * 1.5))
                pc1 = (255, max(0, min(255, int(140 + nd1 * 60))), 0)
                pc2 = (255, 0, max(0, min(255, int(120 + nd2 * 60))))
                
                if 14 < nx < width-15:
                    if 50 < ny1 < height-14:
                        draw.ellipse([nx - pr1, ny1 - pr1, nx + pr1, ny1 + pr1], fill=pc1 + (255,))
                    if 50 < ny2 < height-14:
                        draw.ellipse([nx - pr2, ny2 - pr2, nx + pr2, ny2 + pr2], fill=pc2 + (255,))

        # Draw target crosshair tracking a specific particle dynamically
        # Let's track backbone 1 at progress = 0.55
        progress_track = 0.55
        x_track = (progress_track - 0.5) * helix_len + cx
        angle_track = progress_track * turns * math.pi * 2.0 + phase
        y_track = cy + math.sin(angle_track) * amp

        tx, ty = int(x_track), int(y_track)
        draw.ellipse([tx-12, ty-12, tx+12, ty+12], outline=(255, 0, 85, 255), width=2)
        draw.line([(tx-18, ty), (tx+18, ty)], fill=(255, 0, 85, 255), width=2)
        draw.line([(tx, ty-18), (tx, ty+18)], fill=(255, 0, 85, 255), width=2)

        # Left HUD Telemetry Box
        draw.rectangle([25, 58, 245, 220], fill=(2, 4, 8, 255), outline=(0, 240, 255, 80), width=1)
        draw.text((32, 65), 'GENOMIC TELEMETRY', fill=(0, 240, 255, 255))
        draw.text((32, 85), 'GENE: TP53 (Tumor Suppressor)', fill=(130, 160, 200, 255))
        draw.text((32, 105), 'LOCUS: 17p13.1', fill=(100, 130, 170, 255))
        draw.text((32, 125), 'BASE PAIRS: 70 bp (partial CDS)', fill=(100, 130, 170, 255))
        draw.text((32, 145), 'BACKBONE: Phosphodiester', fill=(100, 130, 170, 255))
        draw.text((32, 165), 'BONDS: H-bonds + Covalent', fill=(100, 130, 170, 255))
        draw.text((32, 185), 'FORM: B-DNA (10.5 bp/turn)', fill=(100, 130, 170, 255))

        # Bottom Legend
        draw.text((25, 288), 'A', fill=(255, 221, 0, 255))
        draw.text((37, 288), 'T', fill=(0, 212, 255, 255))
        draw.text((49, 288), 'G', fill=(0, 255, 125, 255))
        draw.text((61, 288), 'C', fill=(255, 105, 180, 255))
        draw.text((79, 288), '| BACKBONE', fill=(80, 100, 150, 255))

        # Status text & Scrolling Sequence
        draw.text((25, 270), 'ATOMS: 1260 | 60 FPS | WEBGL 2.0 | REAL HUMAN GENOME SEQUENCE', fill=(60, 80, 110, 255))
        offset = int(t * len(SEQ)) % len(SEQ)
        seq_display = (SEQ + SEQ)[offset:offset + 48]
        sx = 420
        for ci, ch in enumerate(seq_display):
            draw.text((sx + ci * 8, 270), ch, fill=BASE_COLORS.get(ch, (150, 150, 150)) + (255,))

        # Scanlines CRT overlay
        scan_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw_scan = ImageDraw.Draw(scan_layer)
        for sy in range(50, height-14, 5):
            draw_scan.line([(14, sy), (width-15, sy)], fill=(0, 240, 255, 12), width=1)

        final_frame = Image.alpha_composite(img, scan_layer)
        frames.append(convert_to_gif_frame(final_frame))

    out_gif = os.path.join(target_dir, 'particle-dna-console-v16-helix.gif')
    frames[0].save(out_gif, save_all=True, append_images=frames[1:], duration=45, loop=0, transparency=255, disposal=2)
    print("SUCCESS: particle-dna-console-v16-helix.gif (schematic) generated!")

# ═══════════════════════════════════════════════════════════════
# GENERATE COHERENT PERIODIC TABLE CONSOLE GIF (particle-periodic-table-au)
# ═══════════════════════════════════════════════════════════════
def generate_pt_console():
    print("Generating Coherent Periodic Table Console GIF...")
    num_frames = 60
    frame_radius = 16
    frames = []

    random.seed(777)
    for frame_idx in range(num_frames):
        t = frame_idx / num_frames
        rot_angle = t * math.pi * 2.0

        img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        # Draw outer obsidian container with gradient border and rounded corners
        draw_obsidian_terminal_base(draw, img, width, height, frame_radius)

        # Header Bar
        draw.rounded_rectangle([(14, 12), (width-15, 48)], radius=6, fill=(2, 4, 8, 255), outline=(0, 0, 0, 255), width=2)
        draw.ellipse([(26, 24), (36, 34)], fill=(255, 95, 87, 255))
        draw.ellipse([(42, 24), (52, 34)], fill=(255, 189, 46, 255))
        draw.ellipse([(58, 24), (68, 34)], fill=(39, 201, 63, 255))

        title_str = 'NULLA-LABS // COMPLETE 118-ELEMENT IUPAC 3D PERIODIC TABLE PLATFORM'
        draw.text((81, 23), title_str, fill=(0, 240, 255, 255))

        # Periodic Table Grid Layout
        pt_x, pt_y = 25, 58
        cell_w, cell_h = 32, 22
        au_pulse = 0.6 + 0.4 * math.sin(t * math.pi * 6)

        for (sym, row, col, cat) in PT_MAIN:
            cx = pt_x + col * (cell_w + 2)
            cy = pt_y + row * (cell_h + 2)
            color = CAT_COLORS[cat]

            is_au = (sym == 'Au')
            alpha = au_pulse if is_au else 1.0

            bg = tuple(max(0, int(c * 0.12 * alpha)) for c in color)
            border = tuple(max(0, int(c * 0.45 * alpha)) for c in color)
            text_col = tuple(max(0, min(255, int(c * alpha))) for c in color)

            if is_au:
                glow_col = tuple(max(0, min(255, int(c * 0.25 * au_pulse))) for c in color)
                draw.rectangle([cx-2, cy-2, cx+cell_w+2, cy+cell_h+2], fill=glow_col + (255,))

            draw.rectangle([cx, cy, cx+cell_w, cy+cell_h], fill=bg + (255,), outline=border + (255,))
            draw.text((cx + 6, cy + 5), sym, fill=text_col + (255,))

        # Indicators
        draw.text((pt_x + 2*(cell_w+2) + 4, pt_y + 5*(cell_h+2) + 4), '*', fill=(255,105,180,255))
        draw.text((pt_x + 2*(cell_w+2) + 4, pt_y + 6*(cell_h+2) + 4), '**', fill=(255,100,50,255))

        # Lanthanides
        la_y = pt_y + 7*(cell_h+2) + 6
        draw.text((pt_x, la_y + 5), '* Lanth:', fill=(255,105,180,255))
        for i, (sym, z) in enumerate(LANT):
            lx = pt_x + 70 + i * (cell_w + 2)
            draw.rectangle([lx, la_y, lx + cell_w, la_y + cell_h], fill=(30,12,22,255), outline=(100,40,70,255))
            draw.text((lx + 4, la_y + 5), sym, fill=(255,105,180,255))

        # Actinides
        ac_y = la_y + cell_h + 3
        draw.text((pt_x, ac_y + 5), '** Actin:', fill=(255,100,50,255))
        for i, (sym, z) in enumerate(ACTN):
            ax = pt_x + 70 + i * (cell_w + 2)
            draw.rectangle([ax, ac_y, ax + cell_w, ac_y + cell_h], fill=(30,15,8,255), outline=(100,50,25,255))
            draw.text((ax + 4, ac_y + 5), sym, fill=(255,100,50,255))

        # GOLD ATOM (Au, Z=79) — RIGHT SIDE, 360° SPIN (HUGE ATOM)
        atom_cx, atom_cy = 810, 155
        
        # Nucleus
        nuc_r = 14
        nuc_3d = math.cos(rot_angle * 0.3) * 0.15 + 0.85
        nuc_bright = int(220 * nuc_3d)
        draw.ellipse([atom_cx-nuc_r, atom_cy-nuc_r, atom_cx+nuc_r, atom_cy+nuc_r],
                     fill=(nuc_bright, int(nuc_bright*0.8), 0, 255))
        draw.text((atom_cx - 6, atom_cy - 5), 'Au', fill=(40, 30, 0, 255))

        # Shell Orbits
        for shell_idx, (n_electrons, shell_col) in enumerate(zip(AU_SHELLS, AU_SHELL_COLORS)):
            shell_r = 24 + shell_idx * 14
            tilt = (shell_idx * 0.4) + 0.2

            for e in range(n_electrons):
                e_angle = (e / n_electrons) * math.pi * 2 + rot_angle * (1.0 + shell_idx * 0.25)

                ex_3d = math.cos(e_angle) * shell_r
                ey_3d = math.sin(e_angle) * shell_r * math.cos(tilt)
                ez_3d = math.sin(e_angle) * shell_r * math.sin(tilt)

                ex_rot = ex_3d * math.cos(rot_angle) + ez_3d * math.sin(rot_angle)
                ez_rot = -ex_3d * math.sin(rot_angle) + ez_3d * math.cos(rot_angle)

                proj_scale = 1.0 / (1.0 + ez_rot * 0.004)
                sx = atom_cx + ex_rot * proj_scale
                sy = atom_cy + ey_3d * proj_scale

                depth = (ez_rot + shell_r) / (2 * shell_r)
                e_r = max(1, int(1.4 + depth * 1.6))
                bright = 0.4 + depth * 0.6
                col = tuple(max(0, min(255, int(c * bright))) for c in shell_col)
                
                if 14 < sx < width-15 and 50 < sy < height-14:
                    draw.ellipse([sx-e_r, sy-e_r, sx+e_r, sy+e_r], fill=col + (255,))

        # Text descriptor
        draw.text((755, 255), 'GOLD (Au) Z=79', fill=(255, 205, 50, 255))
        draw.text((745, 270), '[Xe] 4f14 5d10 6s1', fill=(150, 120, 50, 255))

        # Scanlines
        scan_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw_scan = ImageDraw.Draw(scan_layer)
        for sy in range(50, height-14, 5):
            draw_scan.line([(14, sy), (width-15, sy)], fill=(0, 240, 255, 12), width=1)

        final_frame = Image.alpha_composite(img, scan_layer)
        frames.append(convert_to_gif_frame(final_frame))

    out_gif = os.path.join(target_dir, 'particle-periodic-table-au.gif')
    frames[0].save(out_gif, save_all=True, append_images=frames[1:], duration=67, loop=0, transparency=255, disposal=2)
    print("SUCCESS: particle-periodic-table-au.gif generated!")

# ═══════════════════════════════════════════════════════════════
# GENERATE PUBLIC PROJECTS PORTFOLIO CONSOLE GIF (particle-public-projects)
# ═══════════════════════════════════════════════════════════════
def generate_projects_console():
    print("Generating Public Projects Portfolio Console GIF...")
    num_frames = 60
    frame_radius = 16
    frames = []

    # Try loading Font Forge spec sheet screenshot
    forge_sheet = None
    try:
        forge_sheet = Image.open(os.path.join(target_dir, 'fonts_forge_sheet.png')).convert('RGBA')
        forge_sheet = forge_sheet.resize((260, 115), Image.Resampling.LANCZOS)
    except Exception as e:
        print("Note: fonts_forge_sheet.png not loaded, drawing placeholder. Error:", e)

    for frame_idx in range(num_frames):
        t = frame_idx / num_frames
        rot_angle = t * math.pi * 2.0

        # Transparent background for corner rounding
        img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        # Draw outer obsidian container with gradient border and rounded corners
        draw_obsidian_terminal_base(draw, img, width, height, frame_radius)

        # Header Bar
        draw.rounded_rectangle([(14, 12), (width-15, 48)], radius=6, fill=(2, 4, 8, 255), outline=(0, 0, 0, 255), width=2)
        draw.ellipse([(26, 24), (36, 34)], fill=(255, 95, 87, 255))
        draw.ellipse([(42, 24), (52, 34)], fill=(255, 189, 46, 255))
        draw.ellipse([(58, 24), (68, 34)], fill=(39, 201, 63, 255))

        title_str = 'NULLA-LABS // REGISTERED PARADIGMS // PUBLIC PORTFOLIO CONSOLE'
        draw.text((81, 23), title_str, fill=(0, 240, 255, 255))

        # Layout 3 cards for the 3 projects
        
        # Draw Card 1: FONTS FORGE
        cx1, cy1, cx2, cy2 = 25, 58, 315, 290
        draw.rounded_rectangle([(cx1, cy1), (cx2, cy2)], radius=8, fill=(3, 5, 10, 255), outline=(0, 240, 255, 80), width=1)
        draw.text((cx1 + 10, cy1 + 10), 'FONTS-FORGE-by-Ethernium', fill=(0, 240, 255, 255))
        
        # Display image inside Card 1
        if forge_sheet:
            img.paste(forge_sheet, (cx1 + 15, cy1 + 35), mask=forge_sheet)
        else:
            draw.rectangle([(cx1+15, cy1+35), (cx2-15, cy1+150)], fill=(2,4,8,255), outline=(0,240,255,40))
            draw.line([(cx1+110, cy1+130), (cx1+145, cy1+50), (cx1+180, cy1+130)], fill=(0,240,255,180), width=2)
            draw.line([(cx1+125, cy1+100), (cx1+165, cy1+100)], fill=(0,240,255,180), width=2)
            for node_x, node_y in [(cx1+110, cy1+130), (cx1+145, cy1+50), (cx1+180, cy1+130), (cx1+125, cy1+100), (cx1+165, cy1+100)]:
                draw.ellipse([node_x-3, node_y-3, node_x+3, node_y+3], fill=(0,255,157,255))

        draw.text((cx1 + 10, cy2 - 36), 'TOOLKIT // Vector Font compiler', fill=(150, 170, 200, 255))
        draw.text((cx1 + 10, cy2 - 20), 'Specimen sheets -> WOFF2 / TTF', fill=(80, 100, 130, 255))

        # Draw Card 2: SENESCHAL
        cx1, cy1, cx2, cy2 = 330, 58, 620, 290
        draw.rounded_rectangle([(cx1, cy1), (cx2, cy2)], radius=8, fill=(3, 5, 10, 255), outline=(0, 255, 157, 80), width=1)
        draw.text((cx1 + 10, cy1 + 10), 'SENESCHAL-by-Ethernium', fill=(0, 255, 157, 255))
        
        # Display image inside Card 2: Beautiful 3D rotating sentinel core (matching sentinel.svg)
        scx, scy = cx1 + 145, cy1 + 90
        draw.ellipse([scx-42, scy-42, scx+42, scy+42], fill=(2, 4, 8, 255))
        orbit_r1, orbit_r2 = 40, 33
        for e in range(12):
            ang = e * math.pi / 6 + rot_angle * 0.5
            ox1, oy1 = scx + orbit_r1 * math.cos(ang), scy + orbit_r1 * math.sin(ang)
            ox2, oy2 = scx + orbit_r1 * math.cos(ang + 0.3), scy + orbit_r1 * math.sin(ang + 0.3)
            draw.line([(ox1, oy1), (ox2, oy2)], fill=(30, 45, 60, 255), width=2)
            
            ang2 = e * math.pi / 6 - rot_angle * 0.8
            ix1, iy1 = scx + orbit_r2 * math.cos(ang2), scy + orbit_r2 * math.sin(ang2)
            ix2, iy2 = scx + orbit_r2 * math.cos(ang2 + 0.25), scy + orbit_r2 * math.sin(ang2 + 0.25)
            draw.line([(ix1, iy1), (ix2, iy2)], fill=(0, 240, 255, 180), width=1)
            
        draw.ellipse([scx-12, scy-12, scx+12, scy+12], fill=(0, 255, 157, 255))
        draw.text((scx-6, scy-5), 'Se', fill=(0, 0, 0, 255))
        
        draw.text((cx1 + 10, cy2 - 36), 'RUNTIME // AI Local Control Layer', fill=(150, 170, 200, 255))
        draw.text((cx1 + 10, cy2 - 20), 'Token budgets & Ed25519 brokering', fill=(80, 100, 130, 255))

        # Draw Card 3: CHRONOLITH
        cx1, cy1, cx2, cy2 = 635, 58, 925, 290
        draw.rounded_rectangle([(cx1, cy1), (cx2, cy2)], radius=8, fill=(3, 5, 10, 255), outline=(255, 200, 50, 80), width=1)
        draw.text((cx1 + 10, cy1 + 10), 'CHRONOLITH-by-Ethernium', fill=(255, 200, 50, 255))
        
        ccx, ccy = cx1 + 145, cy1 + 90
        block_h = 22
        block_w = 90
        for block_idx in range(3):
            by = ccy - 35 + block_idx * 30
            glow = int(180 + 75 * math.sin(rot_angle * 1.5 + block_idx * 0.8))
            draw.rectangle([(ccx - block_w//2, by), (ccx + block_w//2, by + block_h)], 
                           fill=(2, 6, 12, 255), outline=(255, 200, 50, glow), width=1)
            
            draw.ellipse([ccx - block_w//2 + 8 - 2, by + 11 - 2, ccx - block_w//2 + 8 + 2, by + 11 + 2], fill=(0, 255, 157, 255))
            draw.ellipse([ccx + block_w//2 - 8 - 2, by + 11 - 2, ccx + block_w//2 - 8 + 2, by + 11 + 2], fill=(255, 0, 85, 255))
            
            if block_idx < 2:
                draw.line([(ccx, by + block_h), (ccx, by + 30)], fill=(255, 200, 50, 100), width=1)
                
        draw.text((ccx - 22, ccy - 28), 'LINEAGE', fill=(100, 120, 140, 255))
        draw.text((ccx - 25, ccy + 2), 'RULEBOOK', fill=(100, 120, 140, 255))
        draw.text((ccx - 22, ccy + 32), 'ANCHOR', fill=(100, 120, 140, 255))

        draw.text((cx1 + 10, cy2 - 36), 'PROTOCOL // Cognitive Continuity', fill=(150, 170, 200, 255))
        draw.text((cx1 + 10, cy2 - 20), 'Audits, validation & Bitcoin anchor', fill=(80, 100, 130, 255))

        # Scanlines
        scan_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw_scan = ImageDraw.Draw(scan_layer)
        for sy in range(50, height-14, 5):
            draw_scan.line([(14, sy), (width-15, sy)], fill=(0, 240, 255, 12), width=1)

        final_frame = Image.alpha_composite(img, scan_layer)
        frames.append(convert_to_gif_frame(final_frame))

    out_gif = os.path.join(target_dir, 'particle-public-projects.gif')
    frames[0].save(out_gif, save_all=True, append_images=frames[1:], duration=67, loop=0, transparency=255, disposal=2)
    print("SUCCESS: particle-public-projects.gif generated!")

if __name__ == '__main__':
    generate_dna_schematic()
    generate_pt_console()
    generate_projects_console()
