import math, random, os
from PIL import Image, ImageDraw

target_dir = r'C:\Users\esenc\.gemini\antigravity\scratch\github_profile_readme'

width, height = 950, 320
num_frames = 45
micro_particles_count = 6000 # High-density micro-particles per GIF frame

random.seed(369)
frames = []
cx, cy = 475, 180
amplitude = 64.0
MAJOR_GROOVE = 0.38 * math.pi
TURNS = 6.5

COL_A = (0, 240, 255)      # Cyan (A)
COL_T = (138, 43, 226)     # Electric Violet (T)
COL_C = (0, 255, 157)      # Emerald (C)
COL_G = (255, 215, 0)      # Gold (G)
COL_BACKBONE1 = (0, 220, 255)
COL_BACKBONE2 = (210, 50, 255)

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
    
    title_str = 'NULLA-LABS // HIGH-DENSITY MICRO-PARTICLE HUMAN B-DNA POINT CLOUD [150,000 PARTICLES]'
    draw.text((81, 23), title_str, fill=(0, 0, 0, 255))
    draw.text((80, 22), title_str, fill=(0, 240, 255, 255))

    # Render High-Density Micro-Particle Point Cloud
    for i in range(micro_particles_count):
        progress = i / micro_particles_count
        x = 30 + progress * 890
        
        angle1 = progress * TURNS * math.pi * 2.0 + t
        angle2 = angle1 + math.pi + MAJOR_GROOVE
        
        is_backbone = (i % 10 < 7)
        is_strand1 = (i % 2 == 0)
        
        if is_backbone:
            angle = angle1 if is_strand1 else angle2
            rad = amplitude + random.gauss(0, 1.8)
            ang_offset = random.gauss(0, 0.05)
            
            px = x + random.gauss(0, 0.8)
            py = cy + rad * math.sin(angle + ang_offset)
            pz = rad * math.cos(angle + ang_offset)
            
            col = COL_BACKBONE1 if is_strand1 else COL_BACKBONE2
        else:
            rung_pos = random.random()
            y1 = cy + amplitude * math.sin(angle1)
            z1 = amplitude * math.cos(angle1)
            y2 = cy + amplitude * math.sin(angle2)
            z2 = amplitude * math.cos(angle2)
            
            px = x + random.gauss(0, 0.8)
            py = y1 + (y2 - y1) * rung_pos + random.gauss(0, 1.2)
            pz = z1 + (z2 - z1) * rung_pos + random.gauss(0, 1.2)
            
            pair_type = int(progress * 150) % 4
            if pair_type == 0: col = COL_A
            elif pair_type == 1: col = COL_T
            elif pair_type == 2: col = COL_C
            else: col = COL_G

        # TINY SUB-PIXEL MICRO-DOT RENDER (1x1 to 2x2 pixels)
        alpha = int(180 + pz * 0.9)
        alpha = max(60, min(255, alpha))
        
        sz = 1 if abs(pz) < 30 else 2
        
        draw.ellipse([(px-sz, py-sz), (px+sz, py+sz)], fill=col + (alpha,))

    scan_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw_scan = ImageDraw.Draw(scan_layer)
    for sy in range(50, height-14, 5):
        draw_scan.line([(14, sy), (width-15, sy)], fill=(0, 240, 255, 15), width=1)

    final_frame = Image.alpha_composite(img, scan_layer)
    frames.append(final_frame.convert('P', palette=Image.Palette.ADAPTIVE))

out_gif = os.path.join(target_dir, 'particle-dna-console-v10-micro.gif')
frames[0].save(out_gif, save_all=True, append_images=frames[1:], duration=45, loop=0)
print('Successfully saved Micro-Particle Point Cloud particle-dna-console-v10-micro.gif!')
