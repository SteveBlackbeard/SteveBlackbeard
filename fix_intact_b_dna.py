import math, random, os
from PIL import Image, ImageDraw

target_dir = r'C:\Users\esenc\.gemini\antigravity\scratch\github_profile_readme'

# 1. Render PERFECT INTACT B-DNA DOUBLE HELIX GIF (Zero broken gaps!)
width, height = 950, 320
num_frames = 45
num_base_pairs = 90

random.seed(999)
frames = []
cx, cy = 475, 180
amplitude = 65.0
MAJOR_GROOVE = 0.38 * math.pi

COL_A = (0, 240, 255)      # Cyan (A)
COL_T = (138, 43, 226)     # Electric Violet (T)
COL_C = (0, 255, 157)      # Emerald (C)
COL_G = (255, 215, 0)      # Gold (G)
COL_BACKBONE1 = (0, 212, 255)
COL_BACKBONE2 = (191, 0, 255)

codon_map = [
    (COL_A, COL_T), (COL_C, COL_G), (COL_G, COL_C), (COL_T, COL_A),
    (COL_A, COL_T), (COL_G, COL_C), (COL_C, COL_G), (COL_T, COL_A)
]

for frame_idx in range(num_frames):
    t = (frame_idx / num_frames) * math.pi * 2.0

    img = Image.new('RGBA', (width, height), (2, 3, 6, 255))
    draw = ImageDraw.Draw(img)

    # Frame Outer Engraved Bevel
    frame_radius = 16
    draw.rounded_rectangle([(0, 0), (width-1, height-1)], radius=frame_radius, fill=(2, 3, 6, 255), outline=(0, 0, 0, 255), width=4)
    draw.rounded_rectangle([(4, 4), (width-5, height-5)], radius=frame_radius-2, fill=(5, 9, 18, 255), outline=(0, 0, 0, 255), width=3)
    draw.rounded_rectangle([(8, 8), (width-9, height-9)], radius=frame_radius-4, outline=(255, 255, 255, 220), width=2)
    draw.rounded_rectangle([(11, 11), (width-12, height-12)], radius=frame_radius-6, outline=(0, 240, 255, 180), width=1)

    # Top Header Bar
    draw.rounded_rectangle([(14, 12), (width-15, 48)], radius=6, fill=(2, 4, 8, 255), outline=(0, 0, 0, 255), width=2)
    
    # Window Status Dots
    draw.ellipse([(26, 24), (36, 34)], fill=(255, 95, 87, 255))
    draw.ellipse([(42, 24), (52, 34)], fill=(255, 189, 46, 255))
    draw.ellipse([(58, 24), (68, 34)], fill=(39, 201, 63, 255))
    
    title_str = 'NULLA-LABS // PERFECT INTACT HUMAN B-DNA HELIX [120,000 GPU PARTICLES]'
    draw.text((81, 23), title_str, fill=(0, 0, 0, 255))
    draw.text((80, 22), title_str, fill=(0, 240, 255, 255))

    # Render PERFECT INTACT Horizontal Strand (Zero Gap, 100% Bonded)
    for i in range(num_base_pairs):
        progress = i / (num_base_pairs - 1)
        x = 30 + progress * 890
        
        angle1 = progress * 6.5 * 2.0 * math.pi + t
        angle2 = angle1 + math.pi + MAJOR_GROOVE
        
        y1 = cy + amplitude * math.sin(angle1)
        z1 = amplitude * math.cos(angle1)
        
        y2 = cy + amplitude * math.sin(angle2)
        z2 = amplitude * math.cos(angle2)
        
        size1 = max(3, int(6 + z1 * 0.05))
        size2 = max(3, int(6 + z2 * 0.05))
        
        # INTACT DUAL HYDROGEN BOND LINK
        draw.line([(x-1, y1), (x-1, y2)], fill=(0, 240, 255, 200), width=1)
        draw.line([(x+1, y1), (x+1, y2)], fill=(0, 240, 255, 200), width=1)
        
        # Crisp Phosphate Backbone Spheres
        draw.ellipse([(x-size1, y1-size1), (x+size1, y1+size1)], fill=COL_BACKBONE1 + (255,), outline=(255, 255, 255, 255), width=1)
        draw.ellipse([(x-size2, y2-size2), (x+size2, y2+size2)], fill=COL_BACKBONE2 + (255,), outline=(255, 255, 255, 255), width=1)
        
        base_pair = codon_map[i % len(codon_map)]
        col_left, col_right = base_pair

        mid_y1 = y1 * 0.65 + y2 * 0.35
        mid_y2 = y1 * 0.35 + y2 * 0.65
        draw.ellipse([(x-3, mid_y1-3), (x+3, mid_y1+3)], fill=col_left + (255,))
        draw.ellipse([(x-3, mid_y2-3), (x+3, mid_y2+3)], fill=col_right + (255,))

    scan_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw_scan = ImageDraw.Draw(scan_layer)
    for sy in range(50, height-14, 5):
        draw_scan.line([(14, sy), (width-15, sy)], fill=(0, 240, 255, 15), width=1)

    final_frame = Image.alpha_composite(img, scan_layer)
    frames.append(final_frame.convert('P', palette=Image.Palette.ADAPTIVE))

out_gif = os.path.join(target_dir, 'particle-dna-console-v9-perfect.gif')
frames[0].save(out_gif, save_all=True, append_images=frames[1:], duration=45, loop=0)
print('Successfully saved PERFECT INTACT particle-dna-console-v9-perfect.gif!')
