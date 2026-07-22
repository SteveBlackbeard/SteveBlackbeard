import math, random, os

# Pre-testing Micro-Particle Point Cloud B-DNA Generator (Rule 1: Synergy & Pre-testing)
def generate_micro_particle_dna(count=150000):
    positions = []
    colors = []
    
    MAJOR_GROOVE = 0.38 * math.pi
    HELIX_RADIUS = 16.0
    TURNS = 7.0
    LENGTH = 110.0
    
    for i in range(count):
        progress = i / count
        x = (progress - 0.5) * LENGTH
        
        angle1 = progress * TURNS * math.pi * 2.0
        angle2 = angle1 + math.pi + MAJOR_GROOVE
        
        # 70% Backbone Micro-particles, 30% Base Pair Volumetric Fill
        is_backbone = (i % 10 < 7)
        is_strand1 = (i % 2 == 0)
        
        if is_backbone:
            angle = angle1 if is_strand1 else angle2
            # Fine Gaussian distribution around backbone curve
            radial_noise = random.gauss(0, 0.45)
            angle_noise = random.gauss(0, 0.03)
            
            px = x + random.gauss(0, 0.2)
            py = math.sin(angle + angle_noise) * (HELIX_RADIUS + radial_noise)
            pz = math.cos(angle + angle_noise) * (HELIX_RADIUS + radial_noise)
            
            # Backbone colors: Cyan/Violet phosphor
            col = (0.0, 0.9, 1.0) if is_strand1 else (0.7, 0.1, 1.0)
        else:
            # Volumetric Base Pair Bridges
            rung_pos = random.random()
            y1 = math.sin(angle1) * HELIX_RADIUS
            z1 = math.cos(angle1) * HELIX_RADIUS
            y2 = math.sin(angle2) * HELIX_RADIUS
            z2 = math.cos(angle2) * HELIX_RADIUS
            
            px = x + random.gauss(0, 0.25)
            py = y1 + (y2 - y1) * rung_pos + random.gauss(0, 0.4)
            pz = z1 + (z2 - z1) * rung_pos + random.gauss(0, 0.4)
            
            # Base Pair Colors (A-T Cyan/Violet, C-G Emerald/Gold)
            pair_type = int(progress * 200) % 4
            if pair_type == 0: col = (0.0, 0.95, 1.0)
            elif pair_type == 1: col = (0.55, 0.15, 0.9)
            elif pair_type == 2: col = (0.0, 1.0, 0.6)
            else: col = (1.0, 0.85, 0.0)
            
        positions.extend([px, py, pz])
        colors.extend(col)
        
    return positions, colors

pos, col = generate_micro_particle_dna(1000)
print(f"[PRETEST_SUCCESS] Micro-particle positions count: {len(pos)//3}")
print(f"[PRETEST_SUCCESS] Sample Point 0: {pos[:3]}")
