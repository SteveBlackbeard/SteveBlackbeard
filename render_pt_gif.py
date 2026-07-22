import math, random
from PIL import Image, ImageDraw

width, height = 960, 340
num_frames = 60  # More frames for smooth 360 rotation
random.seed(777)
frames = []

# ═══ COMPLETE IUPAC PERIODIC TABLE DATA ═══
# (symbol, period_row, group_col, category)
PT_MAIN = [
    # Period 1
    ('H',0,0,'nm'),('He',0,17,'ng'),
    # Period 2
    ('Li',1,0,'ak'),('Be',1,1,'ae'),('B',1,12,'md'),('C',1,13,'nm'),('N',1,14,'nm'),('O',1,15,'nm'),('F',1,16,'ha'),('Ne',1,17,'ng'),
    # Period 3
    ('Na',2,0,'ak'),('Mg',2,1,'ae'),('Al',2,12,'pt'),('Si',2,13,'md'),('P',2,14,'nm'),('S',2,15,'nm'),('Cl',2,16,'ha'),('Ar',2,17,'ng'),
    # Period 4
    ('K',3,0,'ak'),('Ca',3,1,'ae'),('Sc',3,2,'tm'),('Ti',3,3,'tm'),('V',3,4,'tm'),('Cr',3,5,'tm'),('Mn',3,6,'tm'),('Fe',3,7,'tm'),
    ('Co',3,8,'tm'),('Ni',3,9,'tm'),('Cu',3,10,'tm'),('Zn',3,11,'tm'),('Ga',3,12,'pt'),('Ge',3,13,'md'),('As',3,14,'md'),('Se',3,15,'nm'),('Br',3,16,'ha'),('Kr',3,17,'ng'),
    # Period 5
    ('Rb',4,0,'ak'),('Sr',4,1,'ae'),('Y',4,2,'tm'),('Zr',4,3,'tm'),('Nb',4,4,'tm'),('Mo',4,5,'tm'),('Tc',4,6,'tm'),('Ru',4,7,'tm'),
    ('Rh',4,8,'tm'),('Pd',4,9,'tm'),('Ag',4,10,'tm'),('Cd',4,11,'tm'),('In',4,12,'pt'),('Sn',4,13,'pt'),('Sb',4,14,'md'),('Te',4,15,'md'),('I',4,16,'ha'),('Xe',4,17,'ng'),
    # Period 6
    ('Cs',5,0,'ak'),('Ba',5,1,'ae'),('Hf',5,3,'tm'),('Ta',5,4,'tm'),('W',5,5,'tm'),('Re',5,6,'tm'),('Os',5,7,'tm'),
    ('Ir',5,8,'tm'),('Pt',5,9,'tm'),('Au',5,10,'tm'),('Hg',5,11,'tm'),('Tl',5,12,'pt'),('Pb',5,13,'pt'),('Bi',5,14,'pt'),('Po',5,15,'md'),('At',5,16,'ha'),('Rn',5,17,'ng'),
    # Period 7
    ('Fr',6,0,'ak'),('Ra',6,1,'ae'),('Rf',6,3,'tm'),('Db',6,4,'tm'),('Sg',6,5,'tm'),('Bh',6,6,'tm'),('Hs',6,7,'tm'),
    ('Mt',6,8,'tm'),('Ds',6,9,'tm'),('Rg',6,10,'tm'),('Cn',6,11,'tm'),('Nh',6,12,'pt'),('Fl',6,13,'pt'),('Mc',6,14,'pt'),('Lv',6,15,'pt'),('Ts',6,16,'ha'),('Og',6,17,'ng'),
]

# Lanthanides
LANT = [('La',57),('Ce',58),('Pr',59),('Nd',60),('Pm',61),('Sm',62),('Eu',63),('Gd',64),('Tb',65),('Dy',66),('Ho',67),('Er',68),('Tm',69),('Yb',70),('Lu',71)]
# Actinides
ACTN = [('Ac',89),('Th',90),('Pa',91),('U',92),('Np',93),('Pu',94),('Am',95),('Cm',96),('Bk',97),('Cf',98),('Es',99),('Fm',100),('Md',101),('No',102),('Lr',103)]

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

# Gold atom electron shells: [Xe] 4f14 5d10 6s1 = 79 electrons
AU_SHELLS = [2, 8, 18, 32, 18, 1]  # K L M N O P
AU_SHELL_COLORS = [
    (255, 50, 50),   # K - red
    (255, 160, 0),   # L - orange
    (255, 255, 0),   # M - yellow
    (0, 255, 120),   # N - green
    (0, 180, 255),   # O - blue
    (200, 100, 255), # P - violet
]

for frame_idx in range(num_frames):
    img = Image.new('RGB', (width, height), (2, 3, 6))
    draw = ImageDraw.Draw(img)
    t = frame_idx / num_frames
    rot_angle = t * math.pi * 2  # Full 360 rotation

    # ═══ PERIODIC TABLE (left/center) ═══
    pt_x, pt_y = 30, 55
    cell_w, cell_h = 37, 26

    # Highlight Au (gold) with a pulsing glow
    au_pulse = 0.6 + 0.4 * math.sin(t * math.pi * 6)

    for (sym, row, col, cat) in PT_MAIN:
        cx = pt_x + col * (cell_w + 2)
        cy = pt_y + row * (cell_h + 2)
        color = CAT_COLORS[cat]

        is_au = (sym == 'Au')
        alpha = au_pulse if is_au else 1.0

        bg = tuple(max(0, int(c * 0.12 * alpha)) for c in color)
        border = tuple(max(0, int(c * 0.4 * alpha)) for c in color)
        text_col = tuple(max(0, min(255, int(c * alpha))) for c in color)

        if is_au:
            # Bright gold glow box
            glow_col = tuple(max(0, min(255, int(c * 0.25 * au_pulse))) for c in color)
            draw.rectangle([cx-2, cy-2, cx+cell_w+2, cy+cell_h+2], fill=glow_col)

        draw.rectangle([cx, cy, cx+cell_w, cy+cell_h], fill=bg, outline=border)
        draw.text((cx + 8, cy + 7), sym, fill=text_col)

    # Lanthanide/Actinide indicator markers
    draw.text((pt_x + 2*(cell_w+2) + 4, pt_y + 5*(cell_h+2) + 6), '*', fill=(255,105,180))
    draw.text((pt_x + 2*(cell_w+2) + 4, pt_y + 6*(cell_h+2) + 6), '**', fill=(255,100,50))

    # Lanthanides row
    la_y = pt_y + 7*(cell_h+2) + 8
    draw.text((pt_x, la_y + 6), '* Lanthanides:', fill=(255,105,180))
    for i, (sym, z) in enumerate(LANT):
        lx = pt_x + 120 + i * (cell_w + 2)
        draw.rectangle([lx, la_y, lx + cell_w, la_y + cell_h], fill=(30,12,22), outline=(100,40,70))
        draw.text((lx + 6, la_y + 7), sym, fill=(255,105,180))

    # Actinides row
    ac_y = la_y + cell_h + 4
    draw.text((pt_x, ac_y + 6), '** Actinides:', fill=(255,100,50))
    for i, (sym, z) in enumerate(ACTN):
        ax = pt_x + 120 + i * (cell_w + 2)
        draw.rectangle([ax, ac_y, ax + cell_w, ac_y + cell_h], fill=(30,15,8), outline=(100,50,25))
        draw.text((ax + 6, ac_y + 7), sym, fill=(255,100,50))

    # ═══ GOLD ATOM (Au, Z=79) — TOP RIGHT, 360° ROTATION ═══
    atom_cx, atom_cy = 830, 105
    atom_radius_max = 80

    # Draw nucleus (large golden sphere)
    nuc_r = 12
    nuc_3d = math.cos(rot_angle * 0.3) * 0.15 + 0.85
    nuc_bright = int(200 * nuc_3d)
    draw.ellipse([atom_cx-nuc_r, atom_cy-nuc_r, atom_cx+nuc_r, atom_cy+nuc_r],
                 fill=(nuc_bright, int(nuc_bright*0.78), 0))

    # "Au" label
    draw.text((atom_cx - 6, atom_cy - 5), 'Au', fill=(40, 30, 0))

    # Draw electron shells rotating in 3D (each shell at a different orbital tilt)
    for shell_idx, (n_electrons, shell_col) in enumerate(zip(AU_SHELLS, AU_SHELL_COLORS)):
        shell_r = 22 + shell_idx * 12
        tilt = (shell_idx * 0.4) + 0.2  # Each shell has different tilt

        # Orbital ellipse (3D projected as tilted ellipse)
        for e in range(n_electrons):
            e_angle = (e / n_electrons) * math.pi * 2 + rot_angle * (1.0 + shell_idx * 0.3)

            # 3D position on a tilted orbit
            ex_3d = math.cos(e_angle) * shell_r
            ey_3d = math.sin(e_angle) * shell_r * math.cos(tilt)
            ez_3d = math.sin(e_angle) * shell_r * math.sin(tilt)

            # Apply Y-axis rotation (the 360 spin)
            ex_rot = ex_3d * math.cos(rot_angle) + ez_3d * math.sin(rot_angle)
            ez_rot = -ex_3d * math.sin(rot_angle) + ez_3d * math.cos(rot_angle)

            # Project to 2D
            proj_scale = 1.0 / (1.0 + ez_rot * 0.004)
            sx = atom_cx + ex_rot * proj_scale
            sy = atom_cy + ey_3d * proj_scale

            depth = (ez_rot + shell_r) / (2 * shell_r)  # 0 = far, 1 = near
            e_r = max(1, int(1.5 + depth * 1.5))

            bright = 0.4 + depth * 0.6
            col = tuple(max(0, min(255, int(c * bright))) for c in shell_col)
            draw.ellipse([sx-e_r, sy-e_r, sx+e_r, sy+e_r], fill=col)

    # Atom label
    draw.text((atom_cx - 30, atom_cy + atom_radius_max - 6), 'GOLD (Au) Z=79', fill=(255, 200, 50))
    draw.text((atom_cx - 35, atom_cy + atom_radius_max + 8), '[Xe]4f14 5d10 6s1', fill=(150, 120, 40))

    # Header
    draw.text((10, 8), 'NULLA-LABS // COMPLETE IUPAC PERIODIC TABLE (118 ELEMENTS)', fill=(0, 180, 200))
    draw.text((10, 22), 'Interactive 3D Molecular Synthesis Platform', fill=(60, 90, 120))

    # Legend
    legend_y = height - 22
    labels = [('Alkali','ak'),('Alkaline','ae'),('Transition','tm'),('Post-T','pt'),('Metalloid','md'),('Nonmetal','nm'),('Halogen','ha'),('Noble','ng'),('Lanthan.','la'),('Actinide','ac')]
    lx = 30
    for name, cat in labels:
        col = CAT_COLORS[cat]
        draw.rectangle([lx, legend_y, lx+6, legend_y+6], fill=col)
        draw.text((lx+9, legend_y-2), name, fill=(100,120,150))
        lx += len(name) * 7 + 16

    frames.append(img)

out = r'C:\Users\esenc\.gemini\antigravity\scratch\github_profile_readme\particle-periodic-table-au.gif'
frames[0].save(out, save_all=True, append_images=frames[1:], duration=67, loop=0, optimize=True)
print('SUCCESS: particle-periodic-table-au.gif rendered')
