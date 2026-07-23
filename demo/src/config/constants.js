// NULLA-LABS IUPAC 3D MOLECULAR SYNTHESIS PLATFORM — CONFIG CONSTANTS & GRAPHICS PRESETS
// Centralized Configuration, Visual Styling Tokens, Valence Maps, Pauling Electronegativity, Reactions Table, and Quality Presets

export const MAX_REACTANTS = 5;
export const PREVIEW_SPACING = 28.0;

export const GRAPHICS_PRESETS = {
  LOW:    { atomParticles: 800,  bloomPass: false, particleSpeed: 0.5, label: 'LOW (PERFORMANCE)' },
  MEDIUM: { atomParticles: 2000, bloomPass: true,  particleSpeed: 1.0, label: 'MEDIUM (BALANCED)' },
  ULTRA:  { atomParticles: 4000, bloomPass: true,  particleSpeed: 1.5, label: 'ULTRA (HIGH FIDELITY)' }
};

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

export const PAULING_EN = {
  1: 2.20, 2: 0.00, 3: 0.98, 4: 1.57, 5: 2.04, 6: 2.55, 7: 3.04, 8: 3.44, 9: 3.98, 10: 0.00,
  11: 0.93, 12: 1.31, 13: 1.61, 14: 1.90, 15: 2.19, 16: 2.58, 17: 3.16, 18: 0.00,
  19: 0.82, 20: 1.00, 21: 1.36, 22: 1.54, 23: 1.63, 24: 1.66, 25: 1.55, 26: 1.83, 27: 1.88, 28: 1.91, 29: 1.90, 30: 1.65,
  31: 1.81, 32: 2.01, 33: 2.18, 34: 2.55, 35: 2.96, 36: 3.00,
  37: 0.82, 38: 0.95, 39: 1.22, 40: 1.33, 41: 1.60, 42: 2.16, 43: 1.90, 44: 2.20, 45: 2.28, 46: 2.20, 47: 1.93, 48: 1.69,
  49: 1.78, 50: 1.96, 51: 2.05, 52: 2.10, 53: 2.66, 54: 2.60,
  55: 0.79, 56: 0.89, 72: 1.30, 73: 1.50, 74: 2.36, 75: 1.90, 76: 2.20, 77: 2.20, 78: 2.28, 79: 2.54, 80: 2.00,
  81: 1.62, 82: 2.33, 83: 2.02, 84: 2.00, 85: 2.20, 86: 0.00
};

export const QUIZ_QUESTIONS = [
  {
    question: "¿Cuál es el tipo de enlace dominante en el Cloruro de Sodio (NaCl)?",
    options: ["Covalente No Polar", "Enlace Iónico Crístalino", "Enlace Metálico", "Puente de Hidrógeno"],
    correct: 1,
    explanation: "Debido a la gran diferencia de electronegatividad (ΔEN = 2.23 > 1.7), el NaCl forma una red iónica cristalina."
  },
  {
    question: "¿Qué geometría VSEPR presenta la molécula de Agua (H₂O)?",
    options: ["Lineal 180°", "Tetraédrica 109.5°", "Angular (Bent 104.5°)", "Trigonal Plana"],
    correct: 2,
    explanation: "Los 2 pares de electrones libres en el átomo de Oxígeno empujan los enlaces H-O generando una geometría Angular de 104.5°."
  },
  {
    question: "¿Qué significa que la formación de H₂O tenga una Entalpía ΔHf = -285.8 kJ/mol?",
    options: ["Es una reacción Endotérmica que absorbe calor", "Es una reacción Exotérmica que libera energía", "Es una reacción sin cambio energético", "Representa la energía de ionización"],
    correct: 1,
    explanation: "Una entalpía negativa (ΔHf < 0) indica que la síntesis libera energía en forma de calor (Exotérmica)."
  }
];

export const REACTIONS = {
  'H+H+O': { name:'Water',                 formula:'H₂O',   atoms:[{z:8,c:1},{z:1,c:2}],     type:'Polar Covalent', bonds:'O-H Polar Covalent (×2)', state:'Liquid (25°C)', geom:'Bent (104.5°)', enthalpy:-285.8, dipole:1.85, stabilityScore:98.5, note:'Highly exothermic formation. Strong hydrogen bonding dipole.' },
  'H+O':   { name:'Water',                 formula:'H₂O',   atoms:[{z:8,c:1},{z:1,c:2}],     type:'Polar Covalent', bonds:'O-H Polar Covalent (×2)', state:'Liquid (25°C)', geom:'Bent (104.5°)', enthalpy:-285.8, dipole:1.85, stabilityScore:98.5, note:'Highly exothermic formation. Strong hydrogen bonding dipole.' },
  'Cl+Na': { name:'Sodium Chloride',       formula:'NaCl',  atoms:[{z:11,c:1},{z:17,c:1}],   type:'Ionic Lattice',  bonds:'Na⁺-Cl⁻ Ionic Lattice', state:'Solid (25°C)', geom:'Rock-Salt SC', enthalpy:-411.2, dipole:9.00, stabilityScore:99.2, note:'Exothermic ionic crystal lattice synthesis. High lattice energy.' },
  'Na+Cl': { name:'Sodium Chloride',       formula:'NaCl',  atoms:[{z:11,c:1},{z:17,c:1}],   type:'Ionic Lattice',  bonds:'Na⁺-Cl⁻ Ionic Lattice', state:'Solid (25°C)', geom:'Rock-Salt SC', enthalpy:-411.2, dipole:9.00, stabilityScore:99.2, note:'Exothermic ionic crystal lattice synthesis. High lattice energy.' },
  'C+O+O': { name:'Carbon Dioxide',        formula:'CO₂',   atoms:[{z:6,c:1},{z:8,c:2}],     type:'Non-Polar Cov',  bonds:'C=O Double Bonds (×2)', state:'Gas (25°C)', geom:'Linear (180°)', enthalpy:-393.5, dipole:0.00, stabilityScore:97.8, note:'Complete combustion product. Symmetric double bonds cancel dipole.' },
  'C+O':   { name:'Carbon Dioxide',        formula:'CO₂',   atoms:[{z:6,c:1},{z:8,c:2}],     type:'Non-Polar Cov',  bonds:'C=O Double Bonds (×2)', state:'Gas (25°C)', geom:'Linear (180°)', enthalpy:-393.5, dipole:0.00, stabilityScore:97.8, note:'Complete combustion product. Symmetric double bonds cancel dipole.' },
  'Fe+O':  { name:'Iron(III) Oxide (Rust)', formula:'Fe₂O₃', atoms:[{z:26,c:2},{z:8,c:3}],    type:'Ionic Crystal',  bonds:'Fe³⁺-O²⁻ Ionic Coordination', state:'Solid (25°C)', geom:'Corundum Lattice', enthalpy:-824.2, dipole:0.00, stabilityScore:95.4, note:'Exothermic spontaneous corrosion oxide lattice.' },
  'H+N':   { name:'Ammonia',               formula:'NH₃',   atoms:[{z:7,c:1},{z:1,c:3}],     type:'Polar Covalent', bonds:'N-H Covalent Bonds (×3)', state:'Gas (25°C)', geom:'Trigonal Pyramidal', enthalpy:-45.9, dipole:1.47, stabilityScore:93.1, note:'Haber-Bosch industrial synthesis product. Active lone pair dipole.' },
  'C+H':   { name:'Methane',               formula:'CH₄',   atoms:[{z:6,c:1},{z:1,c:4}],     type:'Non-Polar Cov',  bonds:'C-H Covalent Bonds (×4)', state:'Gas (25°C)', geom:'Tetrahedral (109.5°)', enthalpy:-74.8, dipole:0.00, stabilityScore:96.2, note:'Symmetric sp³ tetrahedral alkanes. Non-polar gas.' },
  'Cl+H':  { name:'Hydrogen Chloride',     formula:'HCl',   atoms:[{z:1,c:1},{z:17,c:1}],    type:'Polar Covalent', bonds:'H-Cl Polar Covalent', state:'Gas (25°C)', geom:'Linear', enthalpy:-92.3, dipole:1.08, stabilityScore:94.0, note:'Strong polar gas. Dissociates completely in aqueous phase.' },
  'Ca+O':  { name:'Calcium Oxide (Quicklime)', formula:'CaO', atoms:[{z:20,c:1},{z:8,c:1}], type:'Ionic Crystal',  bonds:'Ca²⁺-O²⁻ Ionic Lattice', state:'Solid (25°C)', geom:'Cubic Lattice', enthalpy:-634.9, dipole:0.00, stabilityScore:96.8, note:'High thermal stability refractic ionic oxide.' },
  'Mg+O':  { name:'Magnesium Oxide',       formula:'MgO',   atoms:[{z:12,c:1},{z:8,c:1}],    type:'Ionic Crystal',  bonds:'Mg²⁺-O²⁻ Ionic Lattice', state:'Solid (25°C)', geom:'Rock-Salt Lattice', enthalpy:-601.6, dipole:0.00, stabilityScore:97.2, note:'Exothermic bright combustion product. Rock-salt lattice.' },
  'Cu+O':  { name:'Copper(II) Oxide',      formula:'CuO',   atoms:[{z:29,c:1},{z:8,c:1}],    type:'Ionic Crystal',  bonds:'Cu²⁺-O²⁻ Monoclinic', state:'Solid (25°C)', geom:'Monoclinic Lattice', enthalpy:-157.3, dipole:0.00, stabilityScore:91.5, note:'Black semiconductor oxide.' },
  'Au+O':  { name:'Gold(III) Oxide',       formula:'Au₂O₃', atoms:[{z:79,c:2},{z:8,c:3}],    type:'Noble Oxide',    bonds:'Au-O Covalent-Ionic Hybrid', state:'Solid (25°C)', geom:'Square-Planar Units', enthalpy:19.3, dipole:0.00, stabilityScore:62.0, note:'Endothermic metastable noble oxide. Decomposes at elevated temperatures.' },
  'H+H+O+S': { name:'Sulfuric Acid',       formula:'H₂SO₄', atoms:[{z:16,c:1},{z:8,c:4},{z:1,c:2}], type:'Strong Acid', bonds:'S=O Double & S-OH Single', state:'Liquid (25°C)', geom:'Tetrahedral Core', enthalpy:-814.0, dipole:2.72, stabilityScore:98.9, note:'Highly exothermic hydration. Major industrial chemical building block.' },
  'C+Ca+O': { name:'Calcium Carbonate',    formula:'CaCO₃', atoms:[{z:20,c:1},{z:6,c:1},{z:8,c:3}], type:'Ionic Carbonate', bonds:'Ca²⁺ + Trigonal CO₃²⁻', state:'Solid (25°C)', geom:'Calcite Lattice', enthalpy:-1207.6, dipole:0.00, stabilityScore:99.1, note:'Geological limestone mineral lattice. High thermodynamic stability.' },
  'C+H+O':  { name:'Acetic Acid (Vinegar)', formula:'CH₃COOH', atoms:[{z:6,c:2},{z:1,c:4},{z:8,c:2}], type:'Organic Acid', bonds:'C-C, C=O, C-OH Covalent', state:'Liquid (25°C)', geom:'Carboxyl Geometry', enthalpy:-484.5, dipole:1.74, stabilityScore:94.7, note:'Carboxylic organic acid with hydrogen-bonded dimers.' },
  'H+Na+O': { name:'Sodium Hydroxide',     formula:'NaOH',  atoms:[{z:11,c:1},{z:8,c:1},{z:1,c:1}], type:'Strong Base', bonds:'Na⁺ - OH⁻ Ionic Pair', state:'Solid (25°C)', geom:'Orthorhombic Lattice', enthalpy:-425.6, dipole:7.10, stabilityScore:98.1, note:'Highly exothermic dissolution in water. Strong alkaline base.' },
  'C+H+Na+O': { name:'Sodium Bicarbonate', formula:'NaHCO₃', atoms:[{z:11,c:1},{z:1,c:1},{z:6,c:1},{z:8,c:3}], type:'Amphoteric Salt', bonds:'Na⁺ + HCO₃⁻ Hydrogen Network', state:'Solid (25°C)', geom:'Monoclinic Network', enthalpy:-950.8, dipole:0.00, stabilityScore:96.5, note:'Baking soda buffer salt. Decomposes to CO₂ under heating.' },
  'H+N+O':  { name:'Nitric Acid',          formula:'HNO₃',  atoms:[{z:1,c:1},{z:7,c:1},{z:8,c:3}], type:'Strong Acid', bonds:'N=O & N-OH Resonance', state:'Liquid (25°C)', geom:'Trigonal Planar Core', enthalpy:-174.1, dipole:2.17, stabilityScore:95.0, note:'Strong oxidizing acid. Planar resonance electronic structures.' },
  'H+H+O+O': { name:'Hydrogen Peroxide',    formula:'H₂O₂',  atoms:[{z:1,c:2},{z:8,c:2}],     type:'Peroxide',      bonds:'O-O Single & O-H Polar', state:'Liquid (25°C)', geom:'Skewed Non-Planar', enthalpy:-187.8, dipole:2.26, stabilityScore:88.4, note:'Active peroxide bond. Spontaneous exothermic decomposition to water and oxygen.' },
  'K+Mn+O': { name:'Potassium Permanganate', formula:'KMnO₄', atoms:[{z:19,c:1},{z:25,c:1},{z:8,c:4}], type:'Strong Oxidizer', bonds:'K⁺ + Tetrahedral MnO₄⁻', state:'Solid (25°C)', geom:'Orthorhombic Crystal', enthalpy:-837.2, dipole:0.00, stabilityScore:93.8, note:'Deep purple strong oxidizing inorganic crystal lattice.' }
};
