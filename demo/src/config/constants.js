// NULLA-LABS IUPAC 3D MOLECULAR SYNTHESIS PLATFORM — CONFIG CONSTANTS
// Centralized Data, Visual Styling Tokens, Valence Maps, and Reaction Tables

export const MAX_REACTANTS = 5;
export const PREVIEW_SPACING = 28.0;

export const VALENCE_MAP = {
  1: 1, 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: -3, 8: -2, 9: -1, 10: 0,
  11: 1, 12: 2, 13: 3, 14: 4, 15: -3, 16: -2, 17: -1, 18: 0,
  19: 1, 20: 2, 21: 3, 22: 4, 23: 5, 24: 3, 25: 2, 26: 3, 27: 2, 28: 2, 29: 2, 30: 2,
  31: 3, 32: 4, 33: -3, 34: -2, 35: -1, 36: 0,
  37: 1, 38: 2, 39: 3, 40: 4, 41: 5, 42: 6, 43: 7, 44: 4, 45: 3, 46: 2, 47: 1, 48: 2,
  49: 3, 50: 4, 51: -3, 52: -2, 53: -1, 54: 0,
  55: 1, 56: 2, 72: 4, 73: 5, 74: 6, 75: 7, 76: 4, 77: 4, 78: 4, 79: 3, 80: 2,
  81: 3, 82: 4, 83: 3, 84: -2, 85: -1, 86: 0
};

export const EL_VISUALS = {
  1: { col: 0xFFFFFF, r: 0.53 }, 2: { col: 0xBF00FF, r: 0.31 }, 3: { col: 0xFFD700, r: 1.67 },
  4: { col: 0xFF7700, r: 1.12 }, 5: { col: 0x00FF9D, r: 0.87 }, 6: { col: 0x8A2BE2, r: 0.77 },
  7: { col: 0x00F0FF, r: 0.75 }, 8: { col: 0xFF0055, r: 0.73 }, 9: { col: 0xFF0055, r: 0.64 },
  10: { col: 0xBF00FF, r: 0.38 }, 11: { col: 0xFFD700, r: 1.90 }, 12: { col: 0xFF7700, r: 1.45 },
  13: { col: 0xAAAAAA, r: 1.18 }, 14: { col: 0x00FF9D, r: 1.11 }, 15: { col: 0xFF8800, r: 1.06 },
  16: { col: 0xFFD700, r: 1.02 }, 17: { col: 0x00FF9D, r: 0.99 }, 18: { col: 0xBF00FF, r: 0.71 },
  19: { col: 0xFFD700, r: 2.43 }, 20: { col: 0xFF7700, r: 1.94 }, 21: { col: 0x00D4FF, r: 1.84 },
  22: { col: 0x00D4FF, r: 1.76 }, 23: { col: 0x00D4FF, r: 1.71 }, 24: { col: 0x00D4FF, r: 1.66 },
  25: { col: 0x00D4FF, r: 1.61 }, 26: { col: 0x00D4FF, r: 1.56 }, 27: { col: 0x00D4FF, r: 1.52 },
  28: { col: 0x00D4FF, r: 1.49 }, 29: { col: 0x00D4FF, r: 1.45 }, 30: { col: 0x00D4FF, r: 1.42 },
  31: { col: 0xAAAAAA, r: 1.36 }, 32: { col: 0x00FF9D, r: 1.25 }, 33: { col: 0x00FF9D, r: 1.21 },
  34: { col: 0xFF8800, r: 1.20 }, 35: { col: 0xFF0055, r: 1.20 }, 36: { col: 0xBF00FF, r: 1.16 },
  37: { col: 0xFFD700, r: 2.35 }, 38: { col: 0xFF7700, r: 2.15 }, 39: { col: 0x00D4FF, r: 1.90 },
  40: { col: 0x00D4FF, r: 1.75 }, 41: { col: 0x00D4FF, r: 1.64 }, 42: { col: 0x00D4FF, r: 1.54 },
  43: { col: 0x00D4FF, r: 1.47 }, 44: { col: 0x00D4FF, r: 1.46 }, 45: { col: 0x00D4FF, r: 1.42 },
  46: { col: 0x00D4FF, r: 1.39 }, 47: { col: 0x00D4FF, r: 1.45 }, 48: { col: 0x00D4FF, r: 1.44 },
  49: { col: 0xAAAAAA, r: 1.42 }, 50: { col: 0xAAAAAA, r: 1.39 }, 51: { col: 0x00FF9D, r: 1.39 },
  52: { col: 0x00FF9D, r: 1.38 }, 53: { col: 0xFF0055, r: 1.39 }, 54: { col: 0xBF00FF, r: 1.40 },
  55: { col: 0xFFD700, r: 2.72 }, 56: { col: 0xFF7700, r: 2.22 }, 57: { col: 0xFF55BB, r: 2.04 },
  58: { col: 0xFF55BB, r: 2.04 }, 59: { col: 0xFF55BB, r: 2.03 }, 60: { col: 0xFF55BB, r: 2.01 },
  61: { col: 0xFF55BB, r: 1.99 }, 62: { col: 0xFF55BB, r: 1.98 }, 63: { col: 0xFF55BB, r: 1.98 },
  64: { col: 0xFF55BB, r: 1.96 }, 65: { col: 0xFF55BB, r: 1.94 }, 66: { col: 0xFF55BB, r: 1.92 },
  67: { col: 0xFF55BB, r: 1.92 }, 68: { col: 0xFF55BB, r: 1.89 }, 69: { col: 0xFF55BB, r: 1.90 },
  70: { col: 0xFF55BB, r: 1.87 }, 71: { col: 0xFF55BB, r: 1.87 }, 72: { col: 0x00D4FF, r: 1.75 },
  73: { col: 0x00D4FF, r: 1.70 }, 74: { col: 0x00D4FF, r: 1.62 }, 75: { col: 0x00D4FF, r: 1.59 },
  76: { col: 0x00D4FF, r: 1.59 }, 77: { col: 0x00D4FF, r: 1.37 }, 78: { col: 0x00D4FF, r: 1.36 },
  79: { col: 0xFFD700, r: 1.44 }, 80: { col: 0x00D4FF, r: 1.49 }, 81: { col: 0xAAAAAA, r: 1.48 },
  82: { col: 0xAAAAAA, r: 1.47 }, 83: { col: 0xAAAAAA, r: 1.46 }, 84: { col: 0xAAAAAA, r: 1.46 },
  85: { col: 0xFF0055, r: 1.45 }, 86: { col: 0xBF00FF, r: 1.45 }, 87: { col: 0xFFD700, r: 2.90 },
  88: { col: 0xFF7700, r: 2.35 }, 89: { col: 0xFF5533, r: 2.15 }, 90: { col: 0xFF5533, r: 2.06 },
  91: { col: 0xFF5533, r: 2.00 }, 92: { col: 0xFF5533, r: 1.96 }, 93: { col: 0xFF5533, r: 1.90 },
  94: { col: 0xFF5533, r: 1.87 }, 95: { col: 0xFF5533, r: 1.80 }, 96: { col: 0xFF5533, r: 1.69 },
  97: { col: 0xFF5533, r: 1.66 }, 98: { col: 0xFF5533, r: 1.68 }, 99: { col: 0xFF5533, r: 1.65 },
  100: { col: 0xFF5533, r: 1.67 }, 101: { col: 0xFF5533, r: 1.73 }, 102: { col: 0xFF5533, r: 1.76 },
  103: { col: 0xFF5533, r: 1.61 }, 104: { col: 0x00D4FF, r: 1.57 }, 105: { col: 0x00D4FF, r: 1.49 },
  106: { col: 0x00D4FF, r: 1.43 }, 107: { col: 0x00D4FF, r: 1.41 }, 108: { col: 0x00D4FF, r: 1.34 },
  109: { col: 0x00D4FF, r: 1.29 }, 110: { col: 0x00D4FF, r: 1.28 }, 111: { col: 0x00D4FF, r: 1.21 },
  112: { col: 0x00D4FF, r: 1.22 }, 113: { col: 0xAAAAAA, r: 1.36 }, 114: { col: 0xAAAAAA, r: 1.43 },
  115: { col: 0xAAAAAA, r: 1.62 }, 116: { col: 0xAAAAAA, r: 1.75 }, 117: { col: 0xFF0055, r: 1.65 },
  118: { col: 0xBF00FF, r: 1.57 }
};

export const REACTIONS = {
  'H+H+O': { name:'Water',                 formula:'H₂O',   atoms:[{z:8,c:1},{z:1,c:2}],     type:'Polar Covalent', bonds:'O-H Polar Covalent (×2)', state:'Liquid (25°C)', geom:'Bent (104.5°)' },
  'H+O':   { name:'Water',                 formula:'H₂O',   atoms:[{z:8,c:1},{z:1,c:2}],     type:'Polar Covalent', bonds:'O-H Polar Covalent (×2)', state:'Liquid (25°C)', geom:'Bent (104.5°)' },
  'Cl+Na': { name:'Sodium Chloride',       formula:'NaCl',  atoms:[{z:11,c:1},{z:17,c:1}],   type:'Ionic Lattice',  bonds:'Na⁺-Cl⁻ Ionic Lattice', state:'Solid (25°C)', geom:'Rock-Salt SC' },
  'Na+Cl': { name:'Sodium Chloride',       formula:'NaCl',  atoms:[{z:11,c:1},{z:17,c:1}],   type:'Ionic Lattice',  bonds:'Na⁺-Cl⁻ Ionic Lattice', state:'Solid (25°C)', geom:'Rock-Salt SC' },
  'C+O+O': { name:'Carbon Dioxide',        formula:'CO₂',   atoms:[{z:6,c:1},{z:8,c:2}],     type:'Non-Polar Cov',  bonds:'C=O Double Bonds (×2)', state:'Gas (25°C)', geom:'Linear (180°)' },
  'C+O':   { name:'Carbon Dioxide',        formula:'CO₂',   atoms:[{z:6,c:1},{z:8,c:2}],     type:'Non-Polar Cov',  bonds:'C=O Double Bonds (×2)', state:'Gas (25°C)', geom:'Linear (180°)' },
  'Fe+O':  { name:'Iron(III) Oxide (Rust)', formula:'Fe₂O₃', atoms:[{z:26,c:2},{z:8,c:3}],    type:'Ionic Crystal',  bonds:'Fe³⁺-O²⁻ Ionic Coordination', state:'Solid (25°C)', geom:'Corundum Lattice' },
  'H+N':   { name:'Ammonia',               formula:'NH₃',   atoms:[{z:7,c:1},{z:1,c:3}],     type:'Polar Covalent', bonds:'N-H Covalent Bonds (×3)', state:'Gas (25°C)', geom:'Trigonal Pyramidal' },
  'C+H':   { name:'Methane',               formula:'CH₄',   atoms:[{z:6,c:1},{z:1,c:4}],     type:'Non-Polar Cov',  bonds:'C-H Covalent Bonds (×4)', state:'Gas (25°C)', geom:'Tetrahedral (109.5°)' },
  'Cl+H':  { name:'Hydrogen Chloride',     formula:'HCl',   atoms:[{z:1,c:1},{z:17,c:1}],    type:'Polar Covalent', bonds:'H-Cl Polar Covalent', state:'Gas (25°C)', geom:'Linear' },
  'Ca+O':  { name:'Calcium Oxide (Quicklime)', formula:'CaO', atoms:[{z:20,c:1},{z:8,c:1}], type:'Ionic Crystal',  bonds:'Ca²⁺-O²⁻ Ionic Lattice', state:'Solid (25°C)', geom:'Cubic Lattice' },
  'Mg+O':  { name:'Magnesium Oxide',       formula:'MgO',   atoms:[{z:12,c:1},{z:8,c:1}],    type:'Ionic Crystal',  bonds:'Mg²⁺-O²⁻ Ionic Lattice', state:'Solid (25°C)', geom:'Rock-Salt Lattice' },
  'Cu+O':  { name:'Copper(II) Oxide',      formula:'CuO',   atoms:[{z:29,c:1},{z:8,c:1}],    type:'Ionic Crystal',  bonds:'Cu²⁺-O²⁻ Monoclinic', state:'Solid (25°C)', geom:'Monoclinic Lattice' },
  'Au+O':  { name:'Gold(III) Oxide',       formula:'Au₂O₃', atoms:[{z:79,c:2},{z:8,c:3}],    type:'Noble Oxide',    bonds:'Au-O Covalent-Ionic Hybrid', state:'Solid (25°C)', geom:'Square-Planar Units' },
  'H+H+O+S': { name:'Sulfuric Acid',       formula:'H₂SO₄', atoms:[{z:16,c:1},{z:8,c:4},{z:1,c:2}], type:'Strong Acid', bonds:'S=O Double & S-OH Single', state:'Liquid (25°C)', geom:'Tetrahedral Core' },
  'C+Ca+O': { name:'Calcium Carbonate',    formula:'CaCO₃', atoms:[{z:20,c:1},{z:6,c:1},{z:8,c:3}], type:'Ionic Carbonate', bonds:'Ca²⁺ + Trigonal CO₃²⁻', state:'Solid (25°C)', geom:'Calcite Lattice' },
  'C+H+O':  { name:'Acetic Acid (Vinegar)', formula:'CH₃COOH', atoms:[{z:6,c:2},{z:1,c:4},{z:8,c:2}], type:'Organic Acid', bonds:'C-C, C=O, C-OH Covalent', state:'Liquid (25°C)', geom:'Carboxyl Geometry' },
  'H+Na+O': { name:'Sodium Hydroxide',     formula:'NaOH',  atoms:[{z:11,c:1},{z:8,c:1},{z:1,c:1}], type:'Strong Base', bonds:'Na⁺ - OH⁻ Ionic Pair', state:'Solid (25°C)', geom:'Orthorhombic Lattice' },
  'C+H+Na+O': { name:'Sodium Bicarbonate', formula:'NaHCO₃', atoms:[{z:11,c:1},{z:1,c:1},{z:6,c:1},{z:8,c:3}], type:'Amphoteric Salt', bonds:'Na⁺ + HCO₃⁻ Hydrogen Network', state:'Solid (25°C)', geom:'Monoclinic Network' },
  'H+N+O':  { name:'Nitric Acid',          formula:'HNO₃',  atoms:[{z:1,c:1},{z:7,c:1},{z:8,c:3}], type:'Strong Acid', bonds:'N=O & N-OH Resonance', state:'Liquid (25°C)', geom:'Trigonal Planar Core' },
  'H+H+O+O': { name:'Hydrogen Peroxide',    formula:'H₂O₂',  atoms:[{z:1,c:2},{z:8,c:2}],     type:'Peroxide',      bonds:'O-O Single & O-H Polar', state:'Liquid (25°C)', geom:'Skewed Non-Planar' },
  'K+Mn+O': { name:'Potassium Permanganate', formula:'KMnO₄', atoms:[{z:19,c:1},{z:25,c:1},{z:8,c:4}], type:'Strong Oxidizer', bonds:'K⁺ + Tetrahedral MnO₄⁻', state:'Solid (25°C)', geom:'Orthorhombic Crystal' }
};
