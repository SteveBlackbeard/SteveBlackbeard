# Pre-testing Studio-Grade Molecular Atomic DNA Architecture (Rule 1)
import math

def generate_studio_atomic_dna(base_pairs=50):
    atoms = []
    bonds = []
    
    MAJOR_GROOVE = 0.38 * math.pi
    HELIX_RADIUS = 16.0
    TURNS = 5.0
    
    for i in range(base_pairs):
        progress = i / base_pairs
        x = (progress - 0.5) * 100.0
        
        angle1 = progress * TURNS * math.pi * 2.0
        angle2 = angle1 + math.pi + MAJOR_GROOVE
        
        # 1. Phosphate Backbone Atoms (P, O)
        y1, z1 = math.sin(angle1) * HELIX_RADIUS, math.cos(angle1) * HELIX_RADIUS
        y2, z2 = math.sin(angle2) * HELIX_RADIUS, math.cos(angle2) * HELIX_RADIUS
        
        # Phosphorus Atoms (Orange/Gold)
        atoms.append({'x': x, 'y': y1, 'z': z1, 'elem': 'P', 'radius': 1.2, 'color': (1.0, 0.5, 0.0)})
        atoms.append({'x': x, 'y': y2, 'z': z2, 'elem': 'P', 'radius': 1.2, 'color': (1.0, 0.5, 0.0)})
        
        # Oxygen Atoms (Red)
        atoms.append({'x': x + 0.8, 'y': y1 + 0.8, 'z': z1, 'elem': 'O', 'radius': 0.9, 'color': (1.0, 0.2, 0.2)})
        atoms.append({'x': x + 0.8, 'y': y2 + 0.8, 'z': z2, 'elem': 'O', 'radius': 0.9, 'color': (1.0, 0.2, 0.2)})
        
        # 2. Base Pair Nitrogenous Rings (N = Blue/Cyan, C = Gray/Cyan, H = White)
        for r in range(5):
            r_pos = (r + 1) / 6.0
            bx = x
            by = y1 + (y2 - y1) * r_pos
            bz = z1 + (z2 - z1) * r_pos
            
            elem = 'N' if r % 2 == 0 else 'C'
            col = (0.0, 0.9, 1.0) if elem == 'N' else (0.4, 0.8, 0.9)
            atoms.append({'x': bx, 'y': by, 'z': bz, 'elem': elem, 'radius': 1.0, 'color': col})
            
            bonds.append({'x1': x, 'y1': y1, 'z1': z1, 'x2': bx, 'y2': by, 'z2': bz})

    return atoms, bonds

atoms, bonds = generate_studio_atomic_dna(10)
print(f"[STUDIO_PRETEST_PASSED] Total CPK Atoms: {len(atoms)}, Total Bonds: {len(bonds)}")
print(f"[STUDIO_PRETEST_PASSED] Sample Atom 0: {atoms[0]}")
