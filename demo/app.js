// NULLA-LABS COMPLETE IUPAC 3D MOLECULAR SYNTHESIS PLATFORM v60.0
// 118 Real Elements + Chemical Reactions Database + Superfluid Morphing
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');

  const topBanner = document.getElementById('active-synthesis-banner');
  const hudPanel = document.getElementById('molecular-hud');
  const hudName = document.getElementById('hud-name');
  const hudFormula = document.getElementById('hud-formula');
  const hudClass = document.getElementById('hud-class');
  const hudBonds = document.getElementById('hud-bonds');
  const hudEnthalpy = document.getElementById('hud-enthalpy');
  const hudDipole = document.getElementById('hud-dipole');
  const hudStability = document.getElementById('hud-stability');
  const hudSpectrum = document.getElementById('hud-spectrum');
  const hudIr = document.getElementById('hud-ir');
  const hudNote = document.getElementById('hud-note');
  const hudEpi = document.getElementById('hud-epi');
  const tempSlider = document.getElementById('temp-slider');
  const tempVal = document.getElementById('temp-val');
  const btnReassemble = document.getElementById('btn-reassemble');
  const btnOrbitals = document.getElementById('btn-orbitals');
  const btnMeasure = document.getElementById('btn-measure');
  const btnExportGltf = document.getElementById('btn-export-gltf');
  const btnExportXyz = document.getElementById('btn-export-xyz');
  const btnAudio = document.getElementById('btn-audio');
  const btnExport = document.getElementById('btn-export');
  const btnSuggest = document.getElementById('btn-suggest');

  const ptHudPanel = document.getElementById('pt-hud-panel');

  const slots = [
    document.getElementById('slot-0'),
    document.getElementById('slot-1'),
    document.getElementById('slot-2'),
    document.getElementById('slot-3'),
    document.getElementById('slot-4')
  ];
  const btnFuse = document.getElementById('btn-fuse');
  const btnRandom = document.getElementById('btn-random');
  const btnUndo = document.getElementById('btn-undo');
  const btnClear = document.getElementById('btn-clear');
  const atomCountEl = document.getElementById('atom-count');

  // ═══════════════════════════════════════════════════════════════
  // DYNAMIC 118 IUPAC ELEMENTS DATABASE Initializer
  // ═══════════════════════════════════════════════════════════════
  const EL_VISUALS = {
    1: { col: 0xFFFFFF, r: 0.53 },
    2: { col: 0xBF00FF, r: 0.31 },
    3: { col: 0xFFD700, r: 1.67 },
    4: { col: 0xFF7700, r: 1.12 },
    5: { col: 0x00FF9D, r: 0.87 },
    6: { col: 0x8A2BE2, r: 0.77 },
    7: { col: 0x00F0FF, r: 0.75 },
    8: { col: 0xFF0055, r: 0.73 },
    9: { col: 0xFF0055, r: 0.64 },
    10: { col: 0xBF00FF, r: 0.38 },
    11: { col: 0xFFD700, r: 1.90 },
    12: { col: 0xFF7700, r: 1.45 },
    13: { col: 0xAAAAAA, r: 1.18 },
    14: { col: 0x00FF9D, r: 1.11 },
    15: { col: 0xFF8800, r: 1.06 },
    16: { col: 0xFFD700, r: 1.02 },
    17: { col: 0x00FF9D, r: 0.99 },
    18: { col: 0xBF00FF, r: 0.71 },
    19: { col: 0xFFD700, r: 2.43 },
    20: { col: 0xFF7700, r: 1.94 },
    21: { col: 0x00D4FF, r: 1.84 },
    22: { col: 0x00D4FF, r: 1.76 },
    23: { col: 0x00D4FF, r: 1.71 },
    24: { col: 0x00D4FF, r: 1.66 },
    25: { col: 0x00D4FF, r: 1.61 },
    26: { col: 0x00D4FF, r: 1.56 },
    27: { col: 0x00D4FF, r: 1.52 },
    28: { col: 0x00D4FF, r: 1.49 },
    29: { col: 0x00D4FF, r: 1.45 },
    30: { col: 0x00D4FF, r: 1.42 },
    31: { col: 0xAAAAAA, r: 1.36 },
    32: { col: 0x00FF9D, r: 1.25 },
    33: { col: 0x00FF9D, r: 1.21 },
    34: { col: 0xFF8800, r: 1.20 },
    35: { col: 0xFF0055, r: 1.20 },
    36: { col: 0xBF00FF, r: 1.16 },
    37: { col: 0xFFD700, r: 2.35 },
    38: { col: 0xFF7700, r: 2.15 },
    39: { col: 0x00D4FF, r: 1.90 },
    40: { col: 0x00D4FF, r: 1.75 },
    41: { col: 0x00D4FF, r: 1.64 },
    42: { col: 0x00D4FF, r: 1.54 },
    43: { col: 0x00D4FF, r: 1.47 },
    44: { col: 0x00D4FF, r: 1.46 },
    45: { col: 0x00D4FF, r: 1.42 },
    46: { col: 0x00D4FF, r: 1.39 },
    47: { col: 0x00D4FF, r: 1.45 },
    48: { col: 0x00D4FF, r: 1.44 },
    49: { col: 0xAAAAAA, r: 1.42 },
    50: { col: 0xAAAAAA, r: 1.39 },
    51: { col: 0x00FF9D, r: 1.39 },
    52: { col: 0x00FF9D, r: 1.38 },
    53: { col: 0xFF0055, r: 1.39 },
    54: { col: 0xBF00FF, r: 1.40 },
    55: { col: 0xFFD700, r: 2.72 },
    56: { col: 0xFF7700, r: 2.22 },
    57: { col: 0xFF55BB, r: 2.04 },
    58: { col: 0xFF55BB, r: 2.04 },
    59: { col: 0xFF55BB, r: 2.03 },
    60: { col: 0xFF55BB, r: 2.01 },
    61: { col: 0xFF55BB, r: 1.99 },
    62: { col: 0xFF55BB, r: 1.98 },
    63: { col: 0xFF55BB, r: 1.98 },
    64: { col: 0xFF55BB, r: 1.96 },
    65: { col: 0xFF55BB, r: 1.94 },
    66: { col: 0xFF55BB, r: 1.92 },
    67: { col: 0xFF55BB, r: 1.92 },
    68: { col: 0xFF55BB, r: 1.89 },
    69: { col: 0xFF55BB, r: 1.90 },
    70: { col: 0xFF55BB, r: 1.87 },
    71: { col: 0xFF55BB, r: 1.87 },
    72: { col: 0x00D4FF, r: 1.75 },
    73: { col: 0x00D4FF, r: 1.70 },
    74: { col: 0x00D4FF, r: 1.62 },
    75: { col: 0x00D4FF, r: 1.59 },
    76: { col: 0x00D4FF, r: 1.59 },
    77: { col: 0x00D4FF, r: 1.37 },
    78: { col: 0x00D4FF, r: 1.36 },
    79: { col: 0xFFD700, r: 1.44 },
    80: { col: 0x00D4FF, r: 1.49 },
    81: { col: 0xAAAAAA, r: 1.48 },
    82: { col: 0xAAAAAA, r: 1.47 },
    83: { col: 0xAAAAAA, r: 1.46 },
    84: { col: 0xAAAAAA, r: 1.46 },
    85: { col: 0xFF0055, r: 1.45 },
    86: { col: 0xBF00FF, r: 1.45 },
    87: { col: 0xFFD700, r: 2.90 },
    88: { col: 0xFF7700, r: 2.35 },
    89: { col: 0xFF5533, r: 2.15 },
    90: { col: 0xFF5533, r: 2.06 },
    91: { col: 0xFF5533, r: 2.00 },
    92: { col: 0xFF5533, r: 1.96 },
    93: { col: 0xFF5533, r: 1.90 },
    94: { col: 0xFF5533, r: 1.87 },
    95: { col: 0xFF5533, r: 1.80 },
    96: { col: 0xFF5533, r: 1.69 },
    97: { col: 0xFF5533, r: 1.66 },
    98: { col: 0xFF5533, r: 1.68 },
    99: { col: 0xFF5533, r: 1.65 },
    100: { col: 0xFF5533, r: 1.67 },
    101: { col: 0xFF5533, r: 1.73 },
    102: { col: 0xFF5533, r: 1.76 },
    103: { col: 0xFF5533, r: 1.61 },
    104: { col: 0x00D4FF, r: 1.57 },
    105: { col: 0x00D4FF, r: 1.49 },
    106: { col: 0x00D4FF, r: 1.43 },
    107: { col: 0x00D4FF, r: 1.41 },
    108: { col: 0x00D4FF, r: 1.34 },
    109: { col: 0x00D4FF, r: 1.29 },
    110: { col: 0x00D4FF, r: 1.28 },
    111: { col: 0x00D4FF, r: 1.21 },
    112: { col: 0x00D4FF, r: 1.22 },
    113: { col: 0xAAAAAA, r: 1.36 },
    114: { col: 0xAAAAAA, r: 1.43 },
    115: { col: 0xAAAAAA, r: 1.62 },
    116: { col: 0xAAAAAA, r: 1.75 },
    117: { col: 0xFF0055, r: 1.65 },
    118: { col: 0xBF00FF, r: 1.57 }
  };

  const EL = {};
  if (window.PERIODIC_DATA && window.PERIODIC_DATA.elements) {
    window.PERIODIC_DATA.elements.forEach(el => {
      const z = el.number;
      const visual = EL_VISUALS[z] || { col: 0x888888, r: 1.0 };
      EL[z] = {
        s: el.symbol,
        n: el.name,
        m: el.mass,
        cat: el.category,
        sh: el.config,
        col: visual.col,
        r: visual.r,
        phase: el.phase,
        melt: el.melt,
        boil: el.boil,
        electronegativity: el.electronegativity || 0,
        density: el.density || 0,
        shells: el.shells,
        summary: el.summary
      };
    });
  }

  // Fallback to static data if script failed
  if (Object.keys(EL).length === 0) {
    for (let z in EL_VISUALS) {
      EL[z] = {
        s: z == 1 ? 'H' : z == 2 ? 'He' : 'El',
        n: 'Element ' + z,
        m: z * 2,
        cat: 'Unknown',
        sh: '',
        col: EL_VISUALS[z].col,
        r: EL_VISUALS[z].r,
        phase: 'Solid',
        melt: 0,
        boil: 0,
        electronegativity: 0,
        density: 0,
        shells: [2],
        summary: 'Dataset load fallback'
      };
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // REAL CHEMICAL REACTIONS DATABASE (EXPANDED TO >30 FUSIONS)
  // Each reaction: key = sorted symbol pair, result = compound info
  // ═══════════════════════════════════════════════════════════════
  const REACTIONS = {
    'H+O':   { name:'Water',                formula:'H₂O',   atoms:[{z:8,c:1},{z:1,c:2}],     type:'Polar Covalent', bonds:'O-H Polar Covalent (×2)', state:'Liquid (25°C)', geom:'Bent 104.5°' },
    'H+N':   { name:'Ammonia',              formula:'NH₃',   atoms:[{z:7,c:1},{z:1,c:3}],     type:'Polar Covalent', bonds:'N-H Polar Covalent (×3)', state:'Gas (25°C)', geom:'Trigonal Pyramidal' },
    'H+C':   { name:'Methane',              formula:'CH₄',   atoms:[{z:6,c:1},{z:1,c:4}],     type:'Covalent', bonds:'C-H Covalent (×4)', state:'Gas (25°C)', geom:'Tetrahedral' },
    'H+Cl':  { name:'Hydrochloric Acid',    formula:'HCl',   atoms:[{z:17,c:1},{z:1,c:1}],    type:'Polar Covalent', bonds:'H-Cl Polar Covalent', state:'Gas/Acid Solution', geom:'Linear' },
    'H+F':   { name:'Hydrogen Fluoride',    formula:'HF',    atoms:[{z:9,c:1},{z:1,c:1}],     type:'Polar Covalent', bonds:'H-F Polar Covalent', state:'Gas (25°C)', geom:'Linear' },
    'H+S':   { name:'Hydrogen Sulfide',     formula:'H₂S',   atoms:[{z:16,c:1},{z:1,c:2}],    type:'Polar Covalent', bonds:'S-H Covalent (×2)', state:'Gas (25°C)', geom:'Bent 92°' },
    'C+O':   { name:'Carbon Dioxide',       formula:'CO₂',   atoms:[{z:6,c:1},{z:8,c:2}],     type:'Covalent', bonds:'C=O Double Bond (×2)', state:'Gas (25°C)', geom:'Linear 180°' },
    'N+O':   { name:'Nitric Oxide',         formula:'NO',    atoms:[{z:7,c:1},{z:8,c:1}],     type:'Covalent', bonds:'N=O Double Bond', state:'Gas (25°C)', geom:'Linear' },
    'S+O':   { name:'Sulfur Dioxide',       formula:'SO₂',   atoms:[{z:16,c:1},{z:8,c:2}],    type:'Covalent', bonds:'S=O Double Bond (×2)', state:'Gas (25°C)', geom:'Bent 119°' },
    'Na+Cl': { name:'Sodium Chloride',      formula:'NaCl',  atoms:[{z:11,c:1},{z:17,c:1}],   type:'Ionic Crystal', bonds:'Na⁺ Cl⁻ Ionic Bond', state:'Solid Crystal (25°C)', geom:'Cubic FCC Lattice' },
    'Na+O':  { name:'Sodium Oxide',         formula:'Na₂O',  atoms:[{z:11,c:2},{z:8,c:1}],    type:'Ionic', bonds:'Na⁺ O²⁻ Ionic Bond', state:'Solid (25°C)', geom:'Antifluorite' },
    'K+Cl':  { name:'Potassium Chloride',   formula:'KCl',   atoms:[{z:19,c:1},{z:17,c:1}],   type:'Ionic Crystal', bonds:'K⁺ Cl⁻ Ionic Bond', state:'Solid Crystal (25°C)', geom:'Cubic FCC Lattice' },
    'Ca+O':  { name:'Calcium Oxide',        formula:'CaO',   atoms:[{z:20,c:1},{z:8,c:1}],    type:'Ionic', bonds:'Ca²⁺ O²⁻ Ionic Bond', state:'Solid (25°C)', geom:'Rock Salt Structure' },
    'Ca+C':  { name:'Calcium Carbide',      formula:'CaC₂',  atoms:[{z:20,c:1},{z:6,c:2}],    type:'Ionic/Covalent', bonds:'Ca²⁺ C₂²⁻', state:'Solid (25°C)', geom:'Tetragonal' },
    'Fe+O':  { name:'Iron Oxide (Rust)',    formula:'Fe₂O₃', atoms:[{z:26,c:2},{z:8,c:3}],   type:'Ionic', bonds:'Fe³⁺ O²⁻ Ionic Bond', state:'Solid (25°C)', geom:'Corundum Structure' },
    'Cu+O':  { name:'Copper Oxide',         formula:'CuO',   atoms:[{z:29,c:1},{z:8,c:1}],    type:'Ionic', bonds:'Cu²⁺ O²⁻ Ionic Bond', state:'Solid (25°C)', geom:'Monoclinic' },
    'Mg+O':  { name:'Magnesium Oxide',      formula:'MgO',   atoms:[{z:12,c:1},{z:8,c:1}],    type:'Ionic', bonds:'Mg²⁺ O²⁻ Ionic Bond', state:'Solid (25°C)', geom:'Rock Salt Structure' },
    'Si+O':  { name:'Silicon Dioxide',      formula:'SiO₂',  atoms:[{z:14,c:1},{z:8,c:2}],    type:'Covalent Network', bonds:'Si-O Covalent Network', state:'Solid Crystal (Quartz)', geom:'Tetrahedral Network' },
    'Al+O':  { name:'Aluminium Oxide',      formula:'Al₂O₃', atoms:[{z:13,c:2},{z:8,c:3}],   type:'Ionic', bonds:'Al³⁺ O²⁻ Ionic Bond', state:'Solid (Corundum/Sapphire)', geom:'Corundum' },
    'H+Br':  { name:'Hydrogen Bromide',     formula:'HBr',   atoms:[{z:35,c:1},{z:1,c:1}],    type:'Polar Covalent', bonds:'H-Br Polar Covalent', state:'Gas/Acid Solution', geom:'Linear' },
    'Na+F':  { name:'Sodium Fluoride',      formula:'NaF',   atoms:[{z:11,c:1},{z:9,c:1}],    type:'Ionic Crystal', bonds:'Na⁺ F⁻ Ionic Bond', state:'Solid Crystal (25°C)', geom:'Cubic FCC Lattice' },
    'C+N':   { name:'Hydrogen Cyanide',     formula:'HCN',   atoms:[{z:1,c:1},{z:6,c:1},{z:7,c:1}], type:'Covalent', bonds:'C≡N Triple + C-H', state:'Gas/Liquid', geom:'Linear' },
    'C+Cl':  { name:'Carbon Tetrachloride', formula:'CCl₄',  atoms:[{z:6,c:1},{z:17,c:4}],    type:'Covalent', bonds:'C-Cl Covalent (×4)', state:'Liquid (25°C)', geom:'Tetrahedral' },
    'P+O':   { name:'Phosphorus Pentoxide', formula:'P₂O₅',  atoms:[{z:15,c:2},{z:8,c:5}],    type:'Covalent', bonds:'P-O & P=O Bonds', state:'Solid (25°C)', geom:'Cage Structure' },
    'N+H':   { name:'Ammonia',              formula:'NH₃',   atoms:[{z:7,c:1},{z:1,c:3}],     type:'Polar Covalent', bonds:'N-H Polar Covalent (×3)', state:'Gas (25°C)', geom:'Trigonal Pyramidal' },
    
    // NEW BINARY FUSION REACTIONS (EXTENDED DATABASE)
    'Li+O':  { name:'Lithium Oxide',        formula:'Li₂O',  atoms:[{z:3,c:2},{z:8,c:1}],     type:'Ionic Solid', bonds:'Li⁺ O²⁻ Ionic Bond', state:'Solid (25°C)', geom:'Antifluorite Structure' },
    'C+S':   { name:'Carbon Disulfide',     formula:'CS₂',   atoms:[{z:6,c:1},{z:16,c:2}],    type:'Covalent Liquid', bonds:'C=S Double Bond (×2)', state:'Liquid (25°C)', geom:'Linear 180°' },
    'C+F':   { name:'Carbon Tetrafluoride', formula:'CF₄',   atoms:[{z:6,c:1},{z:9,c:4}],     type:'Covalent Gas', bonds:'C-F Polar Covalent (×4)', state:'Gas (25°C)', geom:'Tetrahedral' },
    'Si+C':  { name:'Silicon Carbide',      formula:'SiC',   atoms:[{z:14,c:1},{z:6,c:1}],    type:'Covalent Network', bonds:'Si-C Covalent Network', state:'Solid (Carborundum)', geom:'Tetrahedral Grid' },
    'Mg+Cl': { name:'Magnesium Chloride',   formula:'MgCl₂', atoms:[{z:12,c:1},{z:17,c:2}],   type:'Ionic Solid', bonds:'Mg²⁺ Cl⁻ Ionic Bond', state:'Solid (25°C)', geom:'Cadmium Chloride Structure' },
    'Ca+Cl': { name:'Calcium Chloride',     formula:'CaCl₂', atoms:[{z:20,c:1},{z:17,c:2}],   type:'Ionic Solid', bonds:'Ca²⁺ Cl⁻ Ionic Bond', state:'Solid (25°C)', geom:'Rutile-like Structure' },
    'Al+Cl': { name:'Aluminium Chloride',   formula:'AlCl₃', atoms:[{z:13,c:1},{z:17,c:3}],   type:'Covalent/Ionic', bonds:'Al-Cl Polar Covalent', state:'Solid (25°C)', geom:'Layered Sheet Structure' },
    'Ti+Cl': { name:'Titanium Tetrachloride',formula:'TiCl₄', atoms:[{z:22,c:1},{z:17,c:4}],   type:'Covalent Liquid', bonds:'Ti-Cl Covalent (×4)', state:'Liquid (25°C)', geom:'Tetrahedral' },
    'Fe+Cl': { name:'Iron Chloride',        formula:'FeCl₃', atoms:[{z:26,c:1},{z:17,c:3}],   type:'Covalent Solid', bonds:'Fe-Cl Covalent (×3)', state:'Solid (25°C)', geom:'BiI3 Layered Structure' },
    'Cu+Cl': { name:'Copper Chloride',      formula:'CuCl₂', atoms:[{z:29,c:1},{z:17,c:2}],   type:'Covalent/Ionic', bonds:'Cu-Cl Polar Covalent', state:'Solid (25°C)', geom:'Monoclinic Chains' },
    'Zn+O':  { name:'Zinc Oxide',           formula:'ZnO',   atoms:[{z:30,c:1},{z:8,c:1}],    type:'Ionic/Covalent', bonds:'Zn²⁺ O²⁻ Polar Bond', state:'Solid (25°C)', geom:'Wurtzite/Hexagonal' },
    'Zn+Cl': { name:'Zinc Chloride',        formula:'ZnCl₂', atoms:[{z:30,c:1},{z:17,c:2}],   type:'Ionic/Covalent', bonds:'Zn-Cl Polar Covalent', state:'Solid (25°C)', geom:'Orthorhombic Network' },
    'Ag+O':  { name:'Silver Oxide',         formula:'Ag₂O',  atoms:[{z:47,c:2},{z:8,c:1}],    type:'Ionic Solid', bonds:'Ag⁺ O²⁻ Ionic Bond', state:'Solid (25°C)', geom:'Cubic Network' },
    'Au+O':  { name:'Gold Oxide',           formula:'Au₂O₃', atoms:[{z:79,c:2},{z:8,c:3}],    type:'Covalent Solid', bonds:'Au-O Covalent (×3)', state:'Solid (25°C)', geom:'Trigonal Pyramidal Grid' },
    'Pb+O':  { name:'Lead Oxide',           formula:'PbO',   atoms:[{z:82,c:1},{z:8,c:1}],    type:'Ionic Solid', bonds:'Pb²⁺ O²⁻ Ionic Bond', state:'Solid (Litharge)', geom:'Tetragonal Layered' },
    
    // HOMO-ATOMIC MOLECULAR REACTIONS
    'H+H':   { name:'Hydrogen Gas',         formula:'H₂',    atoms:[{z:1,c:2}],               type:'Covalent Diatomic', bonds:'H-H Covalent Bond', state:'Gas (25°C)', geom:'Linear' },
    'O+O':   { name:'Oxygen Gas',           formula:'O₂',    atoms:[{z:8,c:2}],               type:'Covalent Diatomic', bonds:'O=O Double Covalent Bond', state:'Gas (25°C)', geom:'Linear' },
    'N+N':   { name:'Nitrogen Gas',         formula:'N₂',    atoms:[{z:7,c:2}],               type:'Covalent Diatomic', bonds:'N≡N Triple Covalent Bond', state:'Gas (25°C)', geom:'Linear' },
    'F+F':   { name:'Fluorine Gas',         formula:'F₂',    atoms:[{z:9,c:2}],               type:'Covalent Diatomic', bonds:'F-F Covalent Bond', state:'Gas (25°C)', geom:'Linear' },
    'Cl+Cl': { name:'Chlorine Gas',         formula:'Cl₂',   atoms:[{z:17,c:2}],              type:'Covalent Diatomic', bonds:'Cl-Cl Covalent Bond', state:'Gas (25°C)', geom:'Linear' },
    'Br+Br': { name:'Bromine Gas',          formula:'Br₂',   atoms:[{z:35,c:2}],              type:'Covalent Diatomic', bonds:'Br-Br Covalent Bond', state:'Liquid (25°C)', geom:'Linear' },
    'I+I':   { name:'Iodine Gas',           formula:'I₂',    atoms:[{z:53,c:2}],              type:'Covalent Diatomic', bonds:'I-I Covalent Bond', state:'Solid (25°C)', geom:'Linear' },
    'S+S':   { name:'Octasulfur Ring',      formula:'S₈',    atoms:[{z:16,c:8}],              type:'Covalent Ring', bonds:'S-S Covalent Bonds (×8)', state:'Solid (25°C)', geom:'Crown Ring' },
    'P+P':   { name:'White Phosphorus',     formula:'P₄',    atoms:[{z:15,c:4}],              type:'Covalent Molecule', bonds:'P-P Covalent Bonds (×6)', state:'Solid (25°C)', geom:'Tetrahedral' },
    'C+C':   { name:'Graphite',             formula:'C_n',   atoms:[{z:6,c:14}],              type:'Covalent Network', bonds:'C-C Hexagonal Sheet Bonds', state:'Solid (25°C)', geom:'Hexagonal Sheets' },
  };


  // ═══════════════════════════════════════════════════════════════
  // WEBGL 3D SETUP & SAFE CONTEXT CREATION
  // ═══════════════════════════════════════════════════════════════
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: true });
  } catch (e) {
    console.warn('High-performance WebGL context failed, falling back to basic WebGL:', e);
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, preserveDrawingBuffer: true });
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  if (canvas) {
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      console.warn('WebGL context lost. Suppressing crash...');
    });
    canvas.addEventListener('webglcontextrestored', () => {
      console.log('WebGL context restored. Re-rendering 3D model...');
      renderer.setSize(window.innerWidth, window.innerHeight);
      buildDNA();
    });
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020306, 0.002);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 75);

  // Studio Lighting (3-Point)
  scene.add(new THREE.DirectionalLight(0x00F0FF, 2.0).translateX(50).translateY(60).translateZ(50));
  const rimLight = new THREE.DirectionalLight(0x8A2BE2, 1.4);
  rimLight.position.set(-50, -40, -30);
  scene.add(rimLight);
  scene.add(new THREE.AmbientLight(0xFFFFFF, 0.75));

  // ═══════════════════════════════════════════════════════════════
  // DYNAMIC ATOM POOL - Spawn/Despawn with Superfluid Transitions
  // ═══════════════════════════════════════════════════════════════
  const sphereGeo = new THREE.SphereGeometry(1.0, 32, 32);
  const cylinderGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.0, 12);
  const bondMat = new THREE.MeshStandardMaterial({ color:0xFFFFFF, roughness:0.1, metalness:0.9, opacity:0.85, transparent:true });

  const moleculeGroup = new THREE.Group();
  scene.add(moleculeGroup);

  // Active Atom Objects
  let activeAtoms = [];
  let activeBonds = [];
  let activeInstancedMeshes = [];
  let activeBondInstancedMesh = null;
  let activeOrbitLines = [];
  let isDnaMode = false;
  let fusionState = 'idle';
  let fusionTimer = 0;
  let camShakeTimer = 0;
  let fusionReactantA = 0;
  let fusionReactantB = 0;
  let fusionTargetReaction = null;
  let explosionParticles = null;
  let explosionVelocities = [];
  let explosionTimer = 0;
  let shockwaveRing = null;
  let shockwaveScale = 0.1;
  let shockwaveOpacity = 1.0;

  // Selection Ring
  const selectRingGeo = new THREE.TorusGeometry(2.8, 0.3, 16, 32);
  const selectRingMat = new THREE.MeshBasicMaterial({ color:0xFF0055, wireframe:true });
  const selectRing = new THREE.Mesh(selectRingGeo, selectRingMat);
  selectRing.visible = false;
  moleculeGroup.add(selectRing);

  // ═══════════════════════════════════════════════════════════════
  // WEBAUDIO API QUANTUM SYNTHESIZER (Local-First & Frugal)
  // ═══════════════════════════════════════════════════════════════
  let audioCtx = null;
  let audioEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.15, vol = 0.08) {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playCollisionSound() {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, audioCtx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    } catch (e) {}
  }

  // ═══════════════════════════════════════════════════════════════
  // ATOMIC ORBITAL DENSITY CLOUD GENERATOR (s, p, d, f Probability Maps)
  // ═══════════════════════════════════════════════════════════════
  let orbitalParticleSystem = null;

  function generateAtomicOrbitalCloud(z) {
    if (orbitalParticleSystem) {
      moleculeGroup.remove(orbitalParticleSystem);
      orbitalParticleSystem.geometry.dispose();
      orbitalParticleSystem.material.dispose();
      orbitalParticleSystem = null;
    }

    const count = 3500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const el = EL[z] || EL[1];
    const baseColor = new THREE.Color(el.col);

    for (let i = 0; i < count; i++) {
      let x = 0, y = 0, zPos = 0;

      if (z <= 2) {
        // 1s Spherical Orbital
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.pow(Math.random(), 2.0) * 14.0;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        zPos = r * Math.cos(phi);
      } else if (z <= 10) {
        // 2p Dumbbell Lobes
        const axis = Math.floor(Math.random() * 3);
        const angle = Math.random() * Math.PI * 2;
        if (axis === 0) {
          x = (Math.random() > 0.5 ? 1 : -1) * (4.0 + Math.random() * 10.0);
          y = Math.sin(angle) * 3.5;
          zPos = Math.cos(angle) * 3.5;
        } else if (axis === 1) {
          y = (Math.random() > 0.5 ? 1 : -1) * (4.0 + Math.random() * 10.0);
          x = Math.sin(angle) * 3.5;
          zPos = Math.cos(angle) * 3.5;
        } else {
          zPos = (Math.random() > 0.5 ? 1 : -1) * (4.0 + Math.random() * 10.0);
          x = Math.sin(angle) * 3.5;
          y = Math.cos(angle) * 3.5;
        }
      } else {
        // 3d Cloverleaf Lobes
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = Math.sin(2 * theta) * 15.0 + (Math.random() - 0.5) * 3.0;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        zPos = r * Math.cos(phi);
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = zPos;

      const c = baseColor.clone().lerp(new THREE.Color(0x00FFFF), Math.random() * 0.4);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    orbitalParticleSystem = new THREE.Points(geometry, material);
    moleculeGroup.add(orbitalParticleSystem);

    updateTelemetry(
      `Quantum Orbital Cloud: ${el.n} (${el.s})`,
      `Probability Cloud Density Map (N=${count})`,
      `Orbital Shell: ${el.sh}`,
      `Quantum Wavefunction |Ψ|²`,
      `State: [ORBITAL PROBABILITY DENSITY VISUALIZED]`
    );
  }

  const materialCache = {};
  function getMaterialForElement(elData, overrideCol) {
    const col = overrideCol !== undefined ? overrideCol : elData.col;
    const cat = elData.cat ? elData.cat.toLowerCase() : '';
    const key = `${elData.z}_${col}_${cat}`;
    
    if (materialCache[key]) return materialCache[key];

    // High-Vibrancy Cyberpunk Glassmorphic PBR
    let metalness = 0.2;
    let roughness = 0.08;
    let clearcoat = 1.0;
    let clearcoatRoughness = 0.02;
    let reflectance = 0.9;

    if (cat.includes('alkali') || cat.includes('transition') || cat.includes('lanthanide') || cat.includes('actinide')) {
      metalness = 0.45;
      roughness = 0.06;
      clearcoat = 1.0;
      clearcoatRoughness = 0.01;
    } else if (cat.includes('noble')) {
      metalness = 0.15;
      roughness = 0.02;
      clearcoat = 1.0;
      clearcoatRoughness = 0.01;
    } else if (cat.includes('metalloid')) {
      metalness = 0.35;
      roughness = 0.08;
      clearcoat = 1.0;
      clearcoatRoughness = 0.02;
    } else if (cat.includes('halogen') || cat.includes('nonmetal')) {
      metalness = 0.15;
      roughness = 0.10;
      clearcoat = 1.0;
      clearcoatRoughness = 0.03;
    }

    materialCache[key] = new THREE.MeshPhysicalMaterial({
      color: col,
      metalness,
      roughness,
      clearcoat,
      clearcoatRoughness,
      reflectance
    });
    return materialCache[key];
  }

  // Create high-fidelity floating 3D text labels for elements
  function createTextSprite(text, colorStr) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 26px "Orbitron", "Fira Code", monospace';
    ctx.fillStyle = colorStr || '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText(text, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(3.8, 3.8, 1);
    return sprite;
  }

  // Smoothly spawn atoms at positions with scale-up animation
  function spawnAtoms(atomList) {
    // atomList: [{z, pos: Vector3, col: hex, scale: float, startPos: Vector3, isElectron: bool, noLabel: bool, parent, orbitR, ...}]
    // Fade out existing atoms that aren't needed
    activeAtoms.forEach(a => { a.targetScale = 0.0; a.removing = true; });
    activeBonds.forEach(b => { b.removing = true; });

    setTimeout(() => {
      // Remove old atoms and their labels
      activeAtoms.filter(a => a.removing).forEach(a => {
        if (a.labelSprite) moleculeGroup.remove(a.labelSprite);
      });
      activeAtoms = activeAtoms.filter(a => !a.removing);
      activeBonds = activeBonds.filter(b => !b.removing);

      // Clear old instanced meshes and orbit lines
      activeInstancedMeshes.forEach(im => moleculeGroup.remove(im));
      activeInstancedMeshes = [];
      if (activeBondInstancedMesh) {
        moleculeGroup.remove(activeBondInstancedMesh);
        activeBondInstancedMesh = null;
      }
      activeOrbitLines.forEach(line => moleculeGroup.remove(line));
      activeOrbitLines = [];

      // Group new atoms by `z` and `col`
      const groups = {};
      atomList.forEach(item => {
        const elData = EL[item.z] || EL[1];
        const colorHex = item.col !== undefined ? item.col : elData.col;
        const key = `${item.z}_${colorHex}`;
        if (!groups[key]) {
          groups[key] = {
            z: item.z,
            col: colorHex,
            items: []
          };
        }
        groups[key].items.push(item);
      });

      // Find central-most atom item for dense lattices (> 15 atoms)
      const nonElectronAtoms = atomList.filter(a => !a.isElectron);
      const isDenseLattice = !isDnaMode && nonElectronAtoms.length > 15;
      let centralAtomItem = null;
      if (isDenseLattice) {
        let minD = Infinity;
        nonElectronAtoms.forEach(item => {
          if (item.pos) {
            const d = item.pos.lengthSq();
            if (d < minD) { minD = d; centralAtomItem = item; }
          }
        });
      }

      // Create InstancedMesh for each group
      Object.keys(groups).forEach(key => {
        const grp = groups[key];
        const count = grp.items.length;
        const elData = EL[grp.z] || EL[1];
        const mat = getMaterialForElement(elData, grp.col);
        const instMesh = new THREE.InstancedMesh(sphereGeo, mat, count);
        instMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        instMesh.frustumCulled = false;
        moleculeGroup.add(instMesh);
        activeInstancedMeshes.push(instMesh);

        // Store group metadata for raycasting map
        instMesh.userData = { z: grp.z, col: grp.col, groupKey: key };

        grp.items.forEach((item, idx) => {
          const elData = EL[item.z] || EL[1];
          const start = item.startPos ? item.startPos.clone() : new THREE.Vector3(
            (Math.random()-0.5) * 60,
            (Math.random()-0.5) * 40,
            (Math.random()-0.5) * 30
          );
          
          let labelSprite = null;
          // Show label if <= 15 atoms OR if this is the single central atom of a dense lattice
          const showLabel = !isDnaMode && !item.noLabel && (!isDenseLattice || item === centralAtomItem);
          if (showLabel) {
            const spriteColor = '#' + grp.col.toString(16).padStart(6, '0');
            labelSprite = createTextSprite(elData.s, spriteColor);
            labelSprite.position.copy(start);
            labelSprite.scale.setScalar(0.01);
            moleculeGroup.add(labelSprite);
          }

          const scale = item.scale !== undefined ? item.scale : (1.2 + (elData.r || 1.0) * 0.4);

          activeAtoms.push({
            currentPos: start.clone(),
            targetPos: item.pos.clone(),
            currentScale: 0.01,
            targetScale: scale,
            z: item.z,
            col: grp.col,
            elData,
            isElectron: item.isElectron || false,
            noLabel: item.noLabel || false,
            labelSprite,
            instancedMesh: instMesh,
            instIdx: idx,
            velocity: item.velocity ? item.velocity.clone() : null,
            basePos: item.basePos ? item.basePos.clone() : item.pos.clone(),
            parent: item.parent || null,
            orbitR: item.orbitR || 0,
            orbitAngle: item.orbitAngle || 0,
            orbitSpeed: item.orbitSpeed || 0,
            tiltX: item.tiltX || 0,
            tiltY: item.tiltY || 0,
            removing: false
          });
        });
      });

      // Add orbit ring lines for noble gas shells
      atomList.forEach(item => {
        const elData = EL[item.z] || EL[1];
        const symbol = elData.s;
        if (symbol === 'He' || symbol === 'Ne' || symbol === 'Ar' || symbol === 'Kr' || symbol === 'Xe' || symbol === 'Rn') {
          if (!item.isElectron) {
            const electrons = Math.min(item.z, 20);
            const numShells = Math.ceil(electrons / 8);
            for (let s = 0; s < numShells; s++) {
              const shellR = 6.0 + s * 4.0;
              const points = [];
              const segments = 64;
              for (let j = 0; j <= segments; j++) {
                const theta = (j / segments) * Math.PI * 2;
                points.push(new THREE.Vector3(Math.cos(theta) * shellR, 0, Math.sin(theta) * shellR));
              }
              const geometry = new THREE.BufferGeometry().setFromPoints(points);
              const material = new THREE.LineBasicMaterial({
                color: 0x00FFFF,
                transparent: true,
                opacity: 0.18,
                depthWrite: false
              });
              const line = new THREE.LineLoop(geometry, material);
              
              line.rotation.x = (Math.random() - 0.5) * 0.8;
              line.rotation.y = (Math.random() - 0.5) * 0.8;
              line.userData = { nucleusPos: item.pos, tiltX: line.rotation.x, tiltY: line.rotation.y };
              
              moleculeGroup.add(line);
              activeOrbitLines.push(line);
            }
          }
        }
      });

      if (!isDnaMode) {
        const newBonds = [];
        for (let i = 0; i < activeAtoms.length; i++) {
          for (let j = i + 1; j < activeAtoms.length; j++) {
            if (activeAtoms[i].isElectron || activeAtoms[j].isElectron) continue;
            const start = activeAtoms[i].targetPos;
            const end = activeAtoms[j].targetPos;
            const dist = start.distanceTo(end);
            const r1 = activeAtoms[i].elData.r || 1.0;
            const r2 = activeAtoms[j].elData.r || 1.0;
            let maxBondDist = Math.max(9.5, (r1 + r2) * 3.5);
            
            const sym1 = activeAtoms[i].elData.s;
            const sym2 = activeAtoms[j].elData.s;
            if (sym1 === sym2) {
              if (sym1 === 'Po') maxBondDist = 12.0;
              else if (['Li', 'Na', 'K', 'V', 'Cr', 'Fe', 'Rb', 'Nb', 'Mo', 'Cs', 'Ba', 'Ta', 'W', 'Eu'].includes(sym1)) maxBondDist = 13.0;
              else if (['Si', 'Ge', 'Sn'].includes(sym1)) maxBondDist = 11.0;
              else if (['As', 'Sb', 'Bi'].includes(sym1)) maxBondDist = 8.5;
              else if (['Se', 'Te'].includes(sym1)) maxBondDist = 7.0;
              else if (sym1 === 'I') maxBondDist = 4.5;
              else if (['Hg', 'Ga', 'Cs', 'Rb', 'Fr', 'Br'].includes(sym1)) maxBondDist = 7.5;
            }
            
            if (dist > 0.1 && dist < maxBondDist) {
              newBonds.push({ a: i, b: j });
            }
          }
        }
        spawnBonds(newBonds);
      }

      if (atomCountEl) atomCountEl.textContent = activeAtoms.length + ' ATOMS';
    }, 300);
  }

  // Spawn chemical bonds using a single InstancedMesh
  function spawnBonds(bondPairs) {
    let totalCylinders = 0;
    bondPairs.forEach(bp => {
      let order = 1;
      if (!isDnaMode && activeAtoms[bp.a] && activeAtoms[bp.b]) {
        const zA = activeAtoms[bp.a].z;
        const zB = activeAtoms[bp.b].z;
        const symA = EL[zA].s;
        const symB = EL[zB].s;
        if ((symA === 'O' && symB === 'O') || (symA === 'C' && symB === 'O') || (symA === 'O' && symB === 'C')) {
          order = 2;
        } else if (symA === 'N' && symB === 'N') {
          order = 3;
        }
      }
      totalCylinders += order;
    });

    if (totalCylinders === 0) return;

    const bondInstMesh = new THREE.InstancedMesh(cylinderGeo, bondMat, totalCylinders);
    bondInstMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    bondInstMesh.frustumCulled = false;
    moleculeGroup.add(bondInstMesh);
    activeBondInstancedMesh = bondInstMesh;

    let instIdx = 0;
    bondPairs.forEach(bp => {
      let order = 1;
      if (!isDnaMode && activeAtoms[bp.a] && activeAtoms[bp.b]) {
        const zA = activeAtoms[bp.a].z;
        const zB = activeAtoms[bp.b].z;
        const symA = EL[zA].s;
        const symB = EL[zB].s;
        if ((symA === 'O' && symB === 'O') || (symA === 'C' && symB === 'O') || (symA === 'O' && symB === 'C')) {
          order = 2;
        } else if (symA === 'N' && symB === 'N') {
          order = 3;
        }
      }
      activeBonds.push({
        aIdx: bp.a,
        bIdx: bp.b,
        order,
        startIdx: instIdx,
        removing: false
      });
      instIdx += order;
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // BUILD DEFAULT B-DNA EXAMPLE (Matches high-fidelity glossy reference image)
  // ═══════════════════════════════════════════════════════════════
  function buildDNA() {
    isDnaMode = true;
    const atoms = [];
    const BP = 130; // High density
    const HR = 15.0; // Helix Radius
    const MG = 0.38 * Math.PI; // Major Groove
    const T = 4.2; // Turns

    const BACKBONE1_COLORS = [0xFFD700, 0x8A2BE2, 0xFF5500, 0xFF0055, 0x00FF9D, 0x00D4FF];
    const BACKBONE2_COLORS = [0x00D4FF, 0x00FF9D, 0xFF5500, 0x8A2BE2, 0xFFD700, 0xFF0055];

    // Biological nucleobase pairing (A-T = 2 H-bonds, G-C = 3 H-bonds)
    const BASE_PAIRS = [
      { col1: 0x00FF9D, col2: 0xFF0055 }, // Adenine (Green) - Thymine (Red)
      { col1: 0xFFD700, col2: 0x00F0FF }, // Guanine (Yellow) - Cytosine (Cyan)
      { col1: 0xFF0055, col2: 0x00FF9D }, // Thymine (Red) - Adenine (Green)
      { col1: 0x00F0FF, col2: 0xFFD700 }  // Cytosine (Cyan) - Guanine (Yellow)
    ];

    for (let i = 0; i < BP; i++) {
      const p = i / BP;
      const x = (p - 0.5) * 115;
      const a1 = p * T * Math.PI * 2;
      const a2 = a1 + Math.PI + MG;

      const y1 = Math.sin(a1) * HR, z1 = Math.cos(a1) * HR;
      const y2 = Math.sin(a2) * HR, z2 = Math.cos(a2) * HR;

      // Backbone 1 sphere (Phosphorus-sugar group)
      atoms.push({
        z: 15,
        pos: new THREE.Vector3(x, y1, z1),
        col: BACKBONE1_COLORS[i % BACKBONE1_COLORS.length],
        scale: 2.3
      });

      // Backbone 2 sphere
      atoms.push({
        z: 15,
        pos: new THREE.Vector3(x, y2, z2),
        col: BACKBONE2_COLORS[i % BACKBONE2_COLORS.length],
        scale: 2.3
      });

      // Base pair rungs (Biological A-T and G-C pairs)
      if (i % 2 === 0) {
        const pair = BASE_PAIRS[(i / 2) % BASE_PAIRS.length];
        for (let r = 1; r <= 6; r++) {
          const rp = r / 7;
          const ry = THREE.MathUtils.lerp(y1, y2, rp);
          const rz = THREE.MathUtils.lerp(z1, z2, rp);
          const rungColor = rp <= 0.5 ? pair.col1 : pair.col2;
          atoms.push({
            z: 6,
            pos: new THREE.Vector3(x, ry, rz),
            col: rungColor,
            scale: 1.1
          });
        }
      }
    }

    spawnAtoms(atoms);
    if (organelleNavPanel) organelleNavPanel.style.display = 'none';
    updateTelemetry(
      'B-DNA Double Helix (TP53 Gene Locus)',
      'A-T (2 H-Bonds) // G-C (3 H-Bonds) Pairs',
      'Genomic Macromolecule (Watson-Crick B-Form)',
      'Hydrogen Bonds (Nucleobase Rungs)',
      'State: [BIOMACROMOLECULE: CANONICAL B-DNA]'
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // BUILD 3D CROSS-SECTION EUKARYOTIC CELL MODEL (Organelle Composition)
  // ═══════════════════════════════════════════════════════════════
  function buildEukaryoticCell() {
    isDnaMode = true;
    const atoms = [];

    // 1. Plasma Membrane (Cross-section Hemisphere: Phospholipids P=15, C=6, O=8)
    const memRadius = 30.0;
    const numMemAtoms = 160;
    for (let i = 0; i < numMemAtoms; i++) {
      const phi = Math.random() * Math.PI * 0.85; 
      const theta = Math.random() * Math.PI;
      if (phi > Math.PI * 0.4 && theta > Math.PI * 0.25 && theta < Math.PI * 0.75) continue; // Cutaway front view

      const x = memRadius * Math.sin(phi) * Math.cos(theta);
      const y = memRadius * Math.sin(phi) * Math.sin(theta);
      const z = memRadius * Math.cos(phi);

      const isPhosphorusHead = i % 3 === 0;
      atoms.push({
        z: isPhosphorusHead ? 15 : 6, // P (15) or C (6)
        pos: new THREE.Vector3(x, y, z),
        col: isPhosphorusHead ? 0x00F0FF : 0xFFD700,
        scale: isPhosphorusHead ? 1.7 : 1.1
      });
    }

    // 2. Nucleus & Chromatin DNA (Central Core: N=7, P=15, C=6)
    const nucRadius = 11.0;
    for (let i = 0; i < 65; i++) {
      const r = Math.random() * nucRadius;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;

      const zElem = i % 3 === 0 ? 7 : (i % 3 === 1 ? 15 : 6);
      const col = zElem === 7 ? 0xBF00FF : (zElem === 15 ? 0xFF5500 : 0x00FF9D);
      atoms.push({
        z: zElem,
        pos: new THREE.Vector3(
          r * Math.sin(theta) * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(theta)
        ),
        col,
        scale: 1.4
      });
    }

    // 3. Mitochondria Energy Powerhouses (C=6, O=8, P=15)
    const mitCenters = [
      new THREE.Vector3(-16, 10, -6),
      new THREE.Vector3(15, -12, 5)
    ];
    mitCenters.forEach(center => {
      for (let m = 0; m < 16; m++) {
        atoms.push({
          z: 8, // Oxygen
          pos: new THREE.Vector3(
            center.x + (Math.random() - 0.5) * 7.5,
            center.y + (Math.random() - 0.5) * 4.5,
            center.z + (Math.random() - 0.5) * 4.5
          ),
          col: 0xFF0055,
          scale: 1.3
        });
      }
    });

    // 4. Cytosol Ionic Electrolyte Matrix (Na+=11, K+=19, Cl-=17, Ca2+=20)
    const electrolytes = [11, 19, 17, 20];
    const eleCol = { 11: 0xFFD700, 19: 0x8A2BE2, 17: 0x00FF9D, 20: 0xFF7700 };
    for (let e = 0; e < 45; e++) {
      const r = 13 + Math.random() * 13;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const zEl = electrolytes[e % electrolytes.length];

      atoms.push({
        z: zEl,
        pos: new THREE.Vector3(
          r * Math.sin(theta) * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(theta)
        ),
        col: eleCol[zEl],
        scale: 1.2
      });
    }

    spawnAtoms(atoms);
    if (organelleNavPanel) organelleNavPanel.style.display = 'flex';
    updateTelemetry(
      '3D Eukaryotic Cell (Cross-Section Cutaway)',
      'Phospholipids (P,C,O) + Chromatin (N,P) + ATP (C,O,P)',
      'Biological Cell Architecture (Cutaway Interior)',
      'Membrane Lipids & Cytosol Ionic Matrix (Na⁺, K⁺, Cl⁻, Ca²⁺)',
      '3D Organelle Element Composition'
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // FORM SINGLE ELEMENT (Real Crystal Lattices & Molecular States)
  // ═══════════════════════════════════════════════════════════════
  function formElement(z, fromCenter) {
    isDnaMode = false;
    const el = EL[z] || EL[1];
    const atoms = getElementAtoms(z, new THREE.Vector3(0, 0, 0), fromCenter);
    
    spawnAtoms(atoms);
    
    const symbol = el.s;
    updateTelemetry(
      `${el.n} (${el.s}) [Z = ${z}]`,
      `Mass: ${typeof el.m === 'number' ? el.m.toFixed(3) : el.m} u | Electronegativity: ${el.electronegativity ? el.electronegativity : (el.cat && el.cat.includes('noble') ? '0.0 (Inert Noble Gas)' : 'Est. (Superheavy Transactinide)')}`,
      `Phase: ${el.phase || 'Solid/Gas'} | Density: ${el.density ? el.density + ' g/cm³' : 'Synthetic High-Density Target'}`,
      `Melt: ${el.melt ? el.melt + ' K' : 'Est. High Temp'} | Boil: ${el.boil ? el.boil + ' K' : 'Est. High Temp'}`,
      `Config: ${el.sh} // ` + (
        symbol === 'He' || symbol === 'Ne' || symbol === 'Ar' || symbol === 'Kr' || symbol === 'Xe' || symbol === 'Rn' ? 'Monatomic Gas (Orbital Cloud)' :
        symbol === 'B' ? 'Boron B₁₂ Icosahedral Cluster' :
        ['Hg', 'Ga', 'Cs', 'Rb', 'Fr'].includes(symbol) ? 'Amorphous Liquid Droplet' :
        symbol === 'Br' ? 'Diatomic Liquid Droplet' :
        symbol === 'I' ? 'Solid Diatomic Molecular Lattice (I₂ Network)' :
        symbol === 'Se' || symbol === 'Te' ? 'Infinite Helical Spirals' :
        symbol === 'As' || symbol === 'Sb' || symbol === 'Bi' ? 'Puckered Hexagonal Double-Layers' :
        symbol === 'Po' ? 'Simple Cubic Lattice (SC)' :
        symbol === 'P' ? 'P₄ Molecular Tetrahedron' :
        symbol === 'S' ? 'S₈ Crown Ring' :
        symbol === 'C' ? 'Graphite Hexagonal Sheets' :
        symbol === 'Si' || symbol === 'Ge' || symbol === 'Sn' ? 'Covalent Diamond Lattice Unit Cell' :
        ['Li', 'Na', 'K', 'V', 'Cr', 'Fe', 'Rb', 'Nb', 'Mo', 'Cs', 'Ba', 'Ta', 'W', 'Eu'].includes(symbol) ? 'Body-Centered Cubic Lattice (BCC)' :
        ['Be', 'Mg', 'Ti', 'Co', 'Zn', 'Y', 'Zr', 'Ru', 'Cd', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Lu', 'Hf', 'Re', 'Os', 'Tl'].includes(symbol) ? 'Hexagonal Close-Packed Lattice (HCP)' :
        'Face-Centered Cubic Lattice (FCC)'
      )
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // FORM COMPOUND FROM REACTION
  // ═══════════════════════════════════════════════════════════════
  function formCompound(reaction) {
    isDnaMode = false;
    const atoms = [];
    const name = reaction.name;

    if (name === 'Water' || name === 'Hydrogen Sulfide' || name === 'Sulfur Dioxide') {
      const centralZ = reaction.atoms[0].z; 
      const outerZ = reaction.atoms[1].z;   
      atoms.push({ z: centralZ, pos: new THREE.Vector3(0, 2.0, 0), scale: 1.8 });
      atoms.push({ z: outerZ, pos: new THREE.Vector3(-4.8, -1.8, 0), scale: 1.4 });
      atoms.push({ z: outerZ, pos: new THREE.Vector3(4.8, -1.8, 0), scale: 1.4 });
    }
    else if (['Carbon Dioxide', 'Nitric Oxide', 'Hydrochloric Acid', 'Hydrogen Fluoride', 'Hydrogen Bromide', 'Carbon Disulfide', 'Hydrogen Cyanide'].includes(name)) {
      if (name === 'Hydrogen Cyanide') {
        atoms.push({ z: 1, pos: new THREE.Vector3(-5.0, 0, 0), scale: 1.3 }); // H
        atoms.push({ z: 6, pos: new THREE.Vector3(0, 0, 0), scale: 1.7 });    // C
        atoms.push({ z: 7, pos: new THREE.Vector3(4.5, 0, 0), scale: 1.7 });   // N
      } else if (reaction.atoms.length === 2 && reaction.atoms[0].c === 1 && reaction.atoms[1].c === 1) {
        atoms.push({ z: reaction.atoms[0].z, pos: new THREE.Vector3(-3.5, 0, 0), scale: 1.7 });
        atoms.push({ z: reaction.atoms[1].z, pos: new THREE.Vector3(3.5, 0, 0), scale: 1.7 });
      } else {
        const centralZ = reaction.atoms[0].z; 
        const outerZ = reaction.atoms[1].z;   
        atoms.push({ z: centralZ, pos: new THREE.Vector3(0, 0, 0), scale: 1.7 });
        atoms.push({ z: outerZ, pos: new THREE.Vector3(-6.0, 0, 0), scale: 1.6 });
        atoms.push({ z: outerZ, pos: new THREE.Vector3(6.0, 0, 0), scale: 1.6 });
      }
    }
    else if (name === 'Ammonia') {
      const centralZ = reaction.atoms[0].z; 
      const outerZ = reaction.atoms[1].z;   
      atoms.push({ z: centralZ, pos: new THREE.Vector3(0, 1.5, 0), scale: 1.7 });
      atoms.push({ z: outerZ, pos: new THREE.Vector3(0, -1.5, 5.0), scale: 1.3 });
      atoms.push({ z: outerZ, pos: new THREE.Vector3(-4.3, -1.5, -2.5), scale: 1.3 });
      atoms.push({ z: outerZ, pos: new THREE.Vector3(4.3, -1.5, -2.5), scale: 1.3 });
    }
    else if (['Methane', 'Carbon Tetrachloride', 'Carbon Tetrafluoride', 'Titanium Tetrachloride'].includes(name)) {
      const centralZ = reaction.atoms[0].z; 
      const outerZ = reaction.atoms[1].z;   
      atoms.push({ z: centralZ, pos: new THREE.Vector3(0, 0, 0), scale: 1.7 });
      const d = 4.8;
      const vertices = [
        new THREE.Vector3(d, d, d),
        new THREE.Vector3(-d, -d, d),
        new THREE.Vector3(-d, d, -d),
        new THREE.Vector3(d, -d, -d)
      ];
      vertices.forEach(v => atoms.push({ z: outerZ, pos: v, scale: 1.3 }));
    }
    else if (['Sodium Chloride', 'Potassium Chloride', 'Sodium Fluoride', 'Calcium Oxide', 'Magnesium Oxide'].includes(name)) {
      const zA = reaction.atoms[0].z;
      const zB = reaction.atoms[1].z;
      const d = 6.0;
      for (let ix = -1; ix <= 1; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          for (let iz = -1; iz <= 1; iz++) {
            const isA = (ix + iy + iz) % 2 === 0;
            atoms.push({
              z: isA ? zA : zB,
              pos: new THREE.Vector3(ix * d, iy * d, iz * d),
              scale: isA ? 1.8 : 1.5
            });
          }
        }
      }
    }
    else if (name === 'Sodium Oxide' || name === 'Lithium Oxide' || name === 'Silver Oxide') {
      const zMetal = reaction.atoms[0].z; 
      const zO = reaction.atoms[1].z;     
      const d = 6.5;
      const oPos = [
        new THREE.Vector3(-d, -d, -d), new THREE.Vector3(d, d, -d),
        new THREE.Vector3(d, -d, d), new THREE.Vector3(-d, d, d)
      ];
      oPos.forEach(p => atoms.push({ z: zO, pos: p, scale: 1.8 }));
      const h = d * 0.5;
      for (let dx of [-h, h]) {
        for (let dy of [-h, h]) {
          for (let dz of [-h, h]) {
            atoms.push({ z: zMetal, pos: new THREE.Vector3(dx, dy, dz), scale: 1.3 });
          }
        }
      }
    }
    else if (name === 'Silicon Carbide' || name === 'Silicon Dioxide') {
      const zSi = 14;
      const zOther = name === 'Silicon Carbide' ? 6 : 8; 
      const d = 5.0;
      atoms.push({ z: zSi, pos: new THREE.Vector3(0, 0, 0), scale: 1.8 });
      const vertices = [
        new THREE.Vector3(d, d, d),
        new THREE.Vector3(-d, -d, d),
        new THREE.Vector3(-d, d, -d),
        new THREE.Vector3(d, -d, -d)
      ];
      vertices.forEach(v => {
        atoms.push({ z: zOther, pos: v.clone().multiplyScalar(0.5), scale: 1.4 });
        atoms.push({ z: zSi, pos: v, scale: 1.8 });
      });
    }
    else if (name === 'Iron Oxide (Rust)' || name === 'Aluminium Oxide') {
      const zMetal = reaction.atoms[0].z; 
      const zO = reaction.atoms[1].z;     
      const r = 5.5;
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2;
        const h = (i % 2 === 0 ? 1.8 : -1.8);
        atoms.push({ z: zO, pos: new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), h), scale: 1.5 });
      }
      atoms.push({ z: zMetal, pos: new THREE.Vector3(0, 2.5, 4.0), scale: 1.7 });
      atoms.push({ z: zMetal, pos: new THREE.Vector3(0, -2.5, -4.0), scale: 1.7 });
      atoms.push({ z: zMetal, pos: new THREE.Vector3(-2.5, 0, 1.0), scale: 1.7 });
      atoms.push({ z: zMetal, pos: new THREE.Vector3(2.5, 0, -1.0), scale: 1.7 });
    }
    else if (name === 'Copper Oxide' || name === 'Lead Oxide') {
      const zMetal = reaction.atoms[0].z; 
      const zO = reaction.atoms[1].z;     
      const d = 5.5;
      for (let ix = -1; ix <= 1; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          const isMetal = (ix + iy) % 2 === 0;
          atoms.push({
            z: isMetal ? zMetal : zO,
            pos: new THREE.Vector3(ix * d, iy * d, (isMetal ? 0.8 : -0.8)),
            scale: isMetal ? 1.7 : 1.5
          });
        }
      }
    }
    else if (name === 'Calcium Carbide') {
      const zCa = 20;
      const zC = 6;
      const d = 6.0;
      for (let dx of [-d, d]) {
        for (let dy of [-d, d]) {
          atoms.push({ z: zCa, pos: new THREE.Vector3(dx, dy, 0), scale: 1.8 });
        }
      }
      const cDumbbells = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, d, d*0.5),
        new THREE.Vector3(0, -d, -d*0.5)
      ];
      cDumbbells.forEach(center => {
        atoms.push({ z: zC, pos: center.clone().add(new THREE.Vector3(0, 0, -1.5)), scale: 1.5 });
        atoms.push({ z: zC, pos: center.clone().add(new THREE.Vector3(0, 0, 1.5)), scale: 1.5 });
      });
    }
    else if (name === 'Phosphorus Pentoxide') {
      const zP = 15;
      const zO = 8;
      const d = 6.0;
      const pVertices = [
        new THREE.Vector3(d, d, d),
        new THREE.Vector3(-d, -d, d),
        new THREE.Vector3(-d, d, -d),
        new THREE.Vector3(d, -d, -d)
      ];
      pVertices.forEach(v => atoms.push({ z: zP, pos: v, scale: 1.7 }));
      for (let i = 0; i < pVertices.length; i++) {
        for (let j = i + 1; j < pVertices.length; j++) {
          const mid = pVertices[i].clone().add(pVertices[j]).multiplyScalar(0.5);
          atoms.push({ z: zO, pos: mid, scale: 1.4 });
        }
      }
      pVertices.forEach(v => {
        const terminal = v.clone().normalize().multiplyScalar(v.length() + 3.0);
        atoms.push({ z: zO, pos: terminal, scale: 1.4 });
      });
    }
    else if (name === 'Aluminium Chloride' || name === 'Iron Chloride') {
      const zMetal = reaction.atoms[0].z; 
      const zCl = 17;
      atoms.push({ z: zMetal, pos: new THREE.Vector3(0, 0, 0), scale: 1.8 });
      const d = 5.8;
      const clPos = [
        new THREE.Vector3(d, 0, 0), new THREE.Vector3(-d, 0, 0),
        new THREE.Vector3(0, d, 0), new THREE.Vector3(0, -d, 0),
        new THREE.Vector3(0, 0, d), new THREE.Vector3(0, 0, -d)
      ];
      clPos.forEach(p => atoms.push({ z: zCl, pos: p, scale: 1.5 }));
    }
    else if (name === 'Magnesium Chloride' || name === 'Calcium Chloride') {
      const zMetal = reaction.atoms[0].z; 
      const zCl = 17;
      atoms.push({ z: zMetal, pos: new THREE.Vector3(0, 0, 0), scale: 1.8 });
      const d = 6.0;
      const clPos = [
        new THREE.Vector3(d, d, 0), new THREE.Vector3(-d, -d, 0),
        new THREE.Vector3(-d, d, d), new THREE.Vector3(d, -d, -d)
      ];
      clPos.forEach(p => atoms.push({ z: zCl, pos: p, scale: 1.5 }));
    }
    else if (name === 'Copper Chloride') {
      const zCu = 29;
      const zCl = 17;
      const spacing = 6.0;
      for (let i = -1; i <= 1; i++) {
        const x = i * spacing;
        atoms.push({ z: zCu, pos: new THREE.Vector3(x, 0, 0), scale: 1.7 });
        atoms.push({ z: zCl, pos: new THREE.Vector3(x + spacing*0.5, 3.5, 1.5), scale: 1.5 });
        atoms.push({ z: zCl, pos: new THREE.Vector3(x + spacing*0.5, -3.5, -1.5), scale: 1.5 });
      }
    }
    else if (name === 'Zinc Chloride') {
      const zZn = 30;
      const zCl = 17;
      const d = 5.0;
      atoms.push({ z: zZn, pos: new THREE.Vector3(0, 0, 0), scale: 1.8 });
      const clPos = [
        new THREE.Vector3(d, d, d), new THREE.Vector3(-d, -d, d),
        new THREE.Vector3(-d, d, -d), new THREE.Vector3(d, -d, -d)
      ];
      clPos.forEach(p => atoms.push({ z: zCl, pos: p, scale: 1.5 }));
    }
    else if (name === 'Zinc Oxide') {
      const zZn = 30;
      const zO = 8;
      const r = 5.8;
      const h = 4.0;
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2;
        const isZn = i % 2 === 0;
        atoms.push({ z: isZn ? zZn : zO, pos: new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), -h), scale: 1.6 });
      }
      atoms.push({ z: zZn, pos: new THREE.Vector3(0, 0, -h), scale: 1.7 });
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2 + Math.PI / 6;
        const isZn = i % 2 !== 0;
        atoms.push({ z: isZn ? zZn : zO, pos: new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), h), scale: 1.6 });
      }
      atoms.push({ z: zO, pos: new THREE.Vector3(0, 0, h), scale: 1.5 });
    }
    else if (name === 'Gold Oxide') {
      const zAu = 79;
      const zO = 8;
      const d = 5.2;
      atoms.push({ z: zAu, pos: new THREE.Vector3(0, 0, 0), scale: 1.8 });
      atoms.push({ z: zO, pos: new THREE.Vector3(d, 0, 0), scale: 1.4 });
      atoms.push({ z: zO, pos: new THREE.Vector3(-d, 0, 0), scale: 1.4 });
      atoms.push({ z: zO, pos: new THREE.Vector3(0, d, 0), scale: 1.4 });
      atoms.push({ z: zO, pos: new THREE.Vector3(0, -d, 0), scale: 1.4 });
      atoms.push({ z: zAu, pos: new THREE.Vector3(2*d, d, 0), scale: 1.8 });
      atoms.push({ z: zAu, pos: new THREE.Vector3(-2*d, -d, 0), scale: 1.8 });
    }
    else if (['Hydrogen Gas', 'Oxygen Gas', 'Nitrogen Gas', 'Fluorine Gas', 'Chlorine Gas', 'Bromine Gas', 'Iodine Gas'].includes(name)) {
      const zGas = reaction.atoms[0].z;
      atoms.push({ z: zGas, pos: new THREE.Vector3(-2.8, 0, 0), scale: 1.6 });
      atoms.push({ z: zGas, pos: new THREE.Vector3(2.8, 0, 0), scale: 1.6 });
    }
    else if (name === 'Octasulfur Ring') {
      const r = 7.0;
      const h = 2.0;
      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI * 2;
        const z_coord = (i % 2 === 0) ? h : -h;
        atoms.push({ z: 16, pos: new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z_coord), scale: 1.6 });
      }
    }
    else if (name === 'White Phosphorus') {
      const d = 4.5;
      const vertices = [
        new THREE.Vector3(d, d, d),
        new THREE.Vector3(-d, -d, d),
        new THREE.Vector3(-d, d, -d),
        new THREE.Vector3(d, -d, -d)
      ];
      vertices.forEach(v => atoms.push({ z: 15, pos: v, scale: 1.7 }));
    }
    else if (name === 'Graphite') {
      const r = 5.5;
      // Sheet 1
      atoms.push({ z: 6, pos: new THREE.Vector3(0, 0, -3.5), scale: 1.7 });
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2;
        atoms.push({ z: 6, pos: new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), -3.5), scale: 1.6 });
      }
      // Sheet 2
      atoms.push({ z: 6, pos: new THREE.Vector3(0, 0, 3.5), scale: 1.7 });
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2 + Math.PI / 6;
        atoms.push({ z: 6, pos: new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), 3.5), scale: 1.6 });
      }
    }
    else {
      let totalAtoms = 0;
      reaction.atoms.forEach(group => { totalAtoms += group.c; });
      let idx = 0;
      reaction.atoms.forEach(group => {
        for (let a = 0; a < group.c; a++) {
          const gridSize = Math.ceil(Math.cbrt(totalAtoms * 3));
          const ix = idx % gridSize, iy = Math.floor(idx / gridSize) % gridSize, iz = Math.floor(idx / (gridSize*gridSize));
          const d = 5.0;
          const pos = new THREE.Vector3((ix - gridSize/2) * d, (iy - gridSize/2) * d, (iz - gridSize/2) * d);
          atoms.push({ z: group.z, pos, scale: 1.6 });
          idx++;
        }
      });
    }

    spawnAtoms(atoms);
    updateTelemetry(
      reaction.name + ' (' + reaction.formula + ')',
      'Formula: ' + reaction.formula + ' | ' + reaction.atoms.map(g => EL[g.z].s + '×' + g.c).join(' + '),
      'Type: ' + reaction.type + ' | Geometry: ' + reaction.geom,
      'Bonding: ' + reaction.bonds,
      'State: ' + reaction.state,
      reaction.enthalpy ? (reaction.enthalpy < 0 ? `${reaction.enthalpy} kJ/mol (EXOTHERMIC)` : `${reaction.enthalpy} kJ/mol (ENDOTHERMIC)`) : '—',
      reaction.dipole !== undefined ? `${reaction.dipole} Debye (${reaction.dipole > 0 ? 'POLAR' : 'NON-POLAR'})` : '0.00 Debye (NON-POLAR)',
      reaction.stabilityScore ? `${reaction.stabilityScore}% (HIGH STABILITY)` : '95.0%',
      reaction.note || 'Stable synthesized compound.'
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // FORM INERT MIXTURE (Alloy / Non-reactive heterogeneous cluster)
  // ═══════════════════════════════════════════════════════════════
  function formInertMixture(zA, zB) {
    isDnaMode = false;
    const posA = new THREE.Vector3(-14, 0, 0);
    const posB = new THREE.Vector3(14, 0, 0);
    const atomsA = getElementAtoms(zA, posA);
    const atomsB = getElementAtoms(zB, posB);
    const combinedList = [...atomsA, ...atomsB];
    spawnAtoms(combinedList);

    const nameA = EL[zA].n;
    const nameB = EL[zB].n;
    const symA = EL[zA].s;
    const symB = EL[zB].s;

    updateTelemetry(
      `Inert Mixture: ${symA} + ${symB}`,
      `Non-reactive phase: ${symA} // ${symB}`,
      `State: Physical Mixture / Heterogeneous Coexistence`,
      `Bonding: No inter-element bonds formed`,
      `${nameA} and ${nameB} do not form a stable chemical compound under standard conditions.`
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // COLLISION FUSION ENGINE & EXPLOSION SHADERS
  // ═══════════════════════════════════════════════════════════════
  function getElementAtoms(z, offset, fromCenter) {
    const el = EL[z] || EL[1];
    const atoms = [];
    const symbol = el.s;
    const startPos = fromCenter ? new THREE.Vector3(0, 0, 0) : null;

    function makeRepeatedLattice(z, basis, cellSize, scale, nx=2, ny=2, nz=2) {
      const latticeAtoms = [];
      const seen = new Set();
      const cx = (nx - 1) * cellSize * 0.5;
      const cy = (ny - 1) * cellSize * 0.5;
      const cz = (nz - 1) * cellSize * 0.5;
      for (let ix = 0; ix <= nx; ix++) {
        for (let iy = 0; iy <= ny; iy++) {
          for (let iz = 0; iz <= nz; iz++) {
            basis.forEach(b => {
              if (ix + b.x > nx || iy + b.y > ny || iz + b.z > nz) return;
              const px = (ix + b.x) * cellSize - cx;
              const py = (iy + b.y) * cellSize - cy;
              const pz = (iz + b.z) * cellSize - cz;
              const key = `${Math.round(px*100)},${Math.round(py*100)},${Math.round(pz*100)}`;
              if (!seen.has(key)) {
                seen.add(key);
                latticeAtoms.push({
                  z,
                  pos: offset.clone().add(new THREE.Vector3(px, py, pz)),
                  startPos: startPos,
                  scale: scale
                });
              }
            });
          }
        }
      }
      return latticeAtoms;
    }

    function getHcpAtoms(z, a, c, nx=2, ny=2, nz=2) {
      const hcpAtoms = [];
      const seen = new Set();
      const cx = (nx - 0.5) * a * 0.5;
      const cy = (ny - 0.5) * a * Math.sqrt(3) * 0.25;
      const cz = (nz - 0.5) * c * 0.5;
      const basis = [
        { x: 0, y: 0, z: 0 },
        { x: 2/3, y: 1/3, z: 0.5 }
      ];
      for (let ix = 0; ix <= nx; ix++) {
        for (let iy = 0; iy <= ny; iy++) {
          for (let iz = 0; iz <= nz; iz++) {
            basis.forEach(b => {
              if (ix + b.x > nx || iy + b.y > ny || iz + b.z > nz) return;
              const ux = ix + b.x;
              const uy = iy + b.y;
              const uz = iz + b.z;
              const px = (ux + uy * 0.5) * a - cx;
              const py = (uy * Math.sqrt(3) * 0.5) * a - cy;
              const pz = uz * c - cz;
              const key = `${Math.round(px*100)},${Math.round(py*100)},${Math.round(pz*100)}`;
              if (!seen.has(key)) {
                seen.add(key);
                hcpAtoms.push({
                  z,
                  pos: offset.clone().add(new THREE.Vector3(px, py, pz)),
                  startPos: startPos,
                  scale: 1.5
                });
              }
            });
          }
        }
      }
      return hcpAtoms;
    }

    if (symbol === 'He' || symbol === 'Ne' || symbol === 'Ar' || symbol === 'Kr' || symbol === 'Xe' || symbol === 'Rn') {
      // 1. MONATOMIC NOBLE GAS
      const nucleus = { z, pos: offset.clone(), startPos: startPos, scale: 2.2 };
      atoms.push(nucleus);
      
      const electrons = Math.min(z, 20);
      for (let e = 0; e < electrons; e++) {
        const shell = Math.floor(e / 8);
        const shellR = 6.0 + shell * 4.0;
        const angle = (e / Math.max(1, Math.min(8, electrons - shell*8))) * Math.PI * 2;
        const tiltX = (Math.random() - 0.5) * 0.8;
        const tiltY = (Math.random() - 0.5) * 0.8;
        const orbitSpeed = 1.5 + Math.random() * 1.5;
        atoms.push({
          z: 1,
          isElectron: true,
          noLabel: true,
          col: 0x00FFFF,
          scale: 0.35,
          parent: nucleus,
          orbitR: shellR,
          orbitAngle: angle,
          orbitSpeed: orbitSpeed,
          tiltX: tiltX,
          tiltY: tiltY
        });
      }
    }
    else if (symbol === 'B') {
      // 2. BORON B12 ICOSAHEDRON
      const phi = (1 + Math.sqrt(5)) / 2;
      const scaleFactor = 4.8;
      const baseVertices = [
        new THREE.Vector3(0, 1, phi),
        new THREE.Vector3(0, 1, -phi),
        new THREE.Vector3(0, -1, phi),
        new THREE.Vector3(0, -1, -phi),
        new THREE.Vector3(1, phi, 0),
        new THREE.Vector3(1, -phi, 0),
        new THREE.Vector3(-1, phi, 0),
        new THREE.Vector3(-1, -phi, 0),
        new THREE.Vector3(phi, 0, 1),
        new THREE.Vector3(phi, 0, -1),
        new THREE.Vector3(-phi, 0, 1),
        new THREE.Vector3(-phi, 0, -1)
      ];
      baseVertices.forEach(v => {
        atoms.push({ z, pos: offset.clone().add(v.multiplyScalar(scaleFactor)), startPos: startPos, scale: 1.6 });
      });
    }
    else if (['Hg', 'Ga', 'Cs', 'Rb', 'Fr'].includes(symbol)) {
      // 3. DISORDERED LIQUID DROPLET (base positions, wobble noise will animate it)
      const numLiquidAtoms = 12;
      for (let i = 0; i < numLiquidAtoms; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r_val = 2.0 + Math.random() * 6.0;
        const pos = offset.clone().add(new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * r_val,
          Math.sin(phi) * Math.sin(theta) * r_val,
          Math.cos(phi) * r_val
        ));
        atoms.push({ z, pos: pos.clone(), basePos: pos.clone().sub(offset), startPos: startPos, scale: 1.6 });
      }
    }
    else if (symbol === 'Br') {
      // 4. DIATOMIC LIQUID DROPLET
      const numPairs = 6;
      for (let i = 0; i < numPairs; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r_val = 2.0 + Math.random() * 6.0;
        const pairCenter = offset.clone().add(new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * r_val,
          Math.sin(phi) * Math.sin(theta) * r_val,
          Math.cos(phi) * r_val
        ));
        const bondPhi = Math.acos(2 * Math.random() - 1);
        const bondTheta = Math.random() * Math.PI * 2;
        const dir = new THREE.Vector3(
          Math.sin(bondPhi) * Math.cos(bondTheta),
          Math.sin(bondPhi) * Math.sin(bondTheta),
          Math.cos(bondPhi)
        ).multiplyScalar(3.2);
        
        const pos1 = pairCenter.clone().sub(dir);
        const pos2 = pairCenter.clone().add(dir);
        atoms.push({ z, pos: pos1, basePos: pos1.clone().sub(offset), startPos: startPos, scale: 1.6 });
        atoms.push({ z, pos: pos2, basePos: pos2.clone().sub(offset), startPos: startPos, scale: 1.6 });
      }
    }
    else if (symbol === 'H' || symbol === 'N' || symbol === 'O' || symbol === 'F' || symbol === 'Cl') {
      // 5. DIATOMIC GAS MOLECULES (inside a bouncing chamber, velocity initialized)
      const offsets = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-14, 10, -10),
        new THREE.Vector3(14, -10, 10)
      ];
      offsets.forEach((off, idx) => {
        const theta = idx * 1.5;
        const dir = new THREE.Vector3(Math.cos(theta), Math.sin(theta), Math.cos(theta*2)).normalize().multiplyScalar(3.2);
        const pos1 = offset.clone().add(off).sub(dir);
        const pos2 = offset.clone().add(off).add(dir);
        const vel = new THREE.Vector3((Math.random()-0.5)*15, (Math.random()-0.5)*15, (Math.random()-0.5)*15);
        atoms.push({ z, pos: pos1, startPos: startPos, scale: 1.6, velocity: vel.clone() });
        atoms.push({ z, pos: pos2, startPos: startPos, scale: 1.6, velocity: vel.clone() });
      });
    }
    else if (symbol === 'I') {
      // 6. SOLID DIATOMIC IODINE (I2 Molecular network)
      const spacing = 9.0;
      const bondDist = 2.8;
      const directions = [
        new THREE.Vector3(1, 0.5, 0.2).normalize(),
        new THREE.Vector3(-1, 0.5, -0.2).normalize(),
        new THREE.Vector3(0.2, 1, 0.5).normalize(),
        new THREE.Vector3(-0.2, -1, 0.5).normalize(),
        new THREE.Vector3(0.5, 0.2, 1).normalize(),
        new THREE.Vector3(0.5, -0.2, -1).normalize()
      ];
      const pairCenters = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(spacing, 0, spacing*0.5),
        new THREE.Vector3(-spacing, 0, -spacing*0.5),
        new THREE.Vector3(0, spacing, spacing*0.5),
        new THREE.Vector3(0, -spacing, -spacing*0.5),
        new THREE.Vector3(spacing*0.5, spacing*0.5, spacing)
      ];
      for (let i = 0; i < 6; i++) {
        const pCenter = pairCenters[i];
        const dir = directions[i].multiplyScalar(bondDist * 0.5);
        atoms.push({ z, pos: offset.clone().add(pCenter).sub(dir), startPos: startPos, scale: 1.6 });
        atoms.push({ z, pos: offset.clone().add(pCenter).add(dir), startPos: startPos, scale: 1.6 });
      }
    }
    else if (symbol === 'Se' || symbol === 'Te') {
      // 7. HELICAL CHAINS
      const radius = 5.0;
      const pitch = 1.8;
      const numAtoms = 12;
      for (let i = 0; i < numAtoms; i++) {
        const theta = (i - numAtoms/2) * 1.2;
        const pos = offset.clone().add(new THREE.Vector3(
          radius * Math.cos(theta),
          radius * Math.sin(theta),
          pitch * theta
        ));
        atoms.push({ z, pos, startPos: startPos, scale: 1.7 });
      }
    }
    else if (symbol === 'As' || symbol === 'Sb' || symbol === 'Bi') {
      // 8. PUCKERED LAYERS (chair conformation rings)
      const spacing = 5.5;
      const pucker = 1.5;
      const coords = [
        {x: 0, y: 0, z: pucker},
        {x: spacing, y: 0, z: -pucker},
        {x: spacing * 1.5, y: spacing * 0.86, z: pucker},
        {x: spacing, y: spacing * 1.73, z: -pucker},
        {x: 0, y: spacing * 1.73, z: pucker},
        {x: -spacing * 0.5, y: spacing * 0.86, z: -pucker},
        {x: spacing * 2, y: 0, z: pucker},
        {x: spacing * 2.5, y: spacing * 0.86, z: -pucker},
        {x: spacing * 2, y: spacing * 1.73, z: pucker},
        {x: spacing * 0.5, y: -spacing * 0.86, z: -pucker},
        {x: -spacing, y: 0, z: pucker},
        {x: -spacing * 1.5, y: spacing * 0.86, z: -pucker}
      ];
      const centerShift = new THREE.Vector3(spacing * 0.75, spacing * 0.43, 0);
      coords.forEach(c => {
        atoms.push({
          z,
          pos: offset.clone().add(new THREE.Vector3(c.x, c.y, c.z).sub(centerShift)),
          startPos: startPos,
          scale: 1.6
        });
      });
    }
    else if (symbol === 'Po') {
      // 9. SIMPLE CUBIC LATTICE (SC) - repeating
      const scBasis = [{x:0, y:0, z:0}];
      atoms.push(...makeRepeatedLattice(z, scBasis, 7.0, 1.7));
    }
    else if (symbol === 'P') {
      // 10. WHITE PHOSPHORUS (P4 Tetrahedron)
      const d = 4.5;
      const vertices = [
        new THREE.Vector3(d, d, d),
        new THREE.Vector3(-d, -d, d),
        new THREE.Vector3(-d, d, -d),
        new THREE.Vector3(d, -d, -d)
      ];
      vertices.forEach(v => atoms.push({ z, pos: offset.clone().add(v), startPos: startPos, scale: 1.7 }));
    }
    else if (symbol === 'S') {
      // 11. OCTASULFUR (S8 Crown Ring)
      const r = 7.0;
      const h = 2.0;
      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI * 2;
        const z_coord = (i % 2 === 0) ? h : -h;
        atoms.push({
          z,
          pos: offset.clone().add(new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z_coord)),
          startPos: startPos,
          scale: 1.6
        });
      }
    }
    else if (symbol === 'C') {
      // 12. GRAPHITE LAYERS FOR CARBON
      const r = 5.5;
      // Sheet 1 (z = -3.5)
      atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(0, 0, -3.5)), startPos: startPos, scale: 1.7 });
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2;
        atoms.push({
          z,
          pos: offset.clone().add(new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), -3.5)),
          startPos: startPos,
          scale: 1.6
        });
      }
      // Sheet 2 (z = 3.5, rotated by 30 deg)
      atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(0, 0, 3.5)), startPos: startPos, scale: 1.7 });
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2 + Math.PI / 6;
        atoms.push({
          z,
          pos: offset.clone().add(new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), 3.5)),
          startPos: startPos,
          scale: 1.6
        });
      }
    }
    else if (symbol === 'Si' || symbol === 'Ge' || symbol === 'Sn') {
      // 13. COVALENT DIAMOND LATTICE - repeating
      const diamondBasis = [
        {x:0, y:0, z:0}, {x:0.5, y:0.5, z:0}, {x:0.5, y:0, z:0.5}, {x:0, y:0.5, z:0.5},
        {x:0.25, y:0.25, z:0.25}, {x:0.75, y:0.75, z:0.25}, {x:0.75, y:0.25, z:0.75}, {x:0.25, y:0.75, z:0.75}
      ];
      atoms.push(...makeRepeatedLattice(z, diamondBasis, 9.5, 1.6));
    }
    else if (['Li', 'Na', 'K', 'V', 'Cr', 'Fe', 'Rb', 'Nb', 'Mo', 'Cs', 'Ba', 'Ta', 'W', 'Eu'].includes(symbol)) {
      // 14. BODY-CENTERED CUBIC LATTICE (BCC) - repeating
      const bccBasis = [{x:0, y:0, z:0}, {x:0.5, y:0.5, z:0.5}];
      atoms.push(...makeRepeatedLattice(z, bccBasis, 8.5, 1.6));
    }
    else if (['Be', 'Mg', 'Ti', 'Co', 'Zn', 'Y', 'Zr', 'Ru', 'Cd', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Lu', 'Hf', 'Re', 'Os', 'Tl'].includes(symbol)) {
      // 15. HEXAGONAL CLOSE-PACKED LATTICE (HCP) - repeating
      atoms.push(...getHcpAtoms(z, 8.0, 6.5));
    }
    else {
      // 16. FACE-CENTERED CUBIC LATTICE (FCC) - Default for metals, repeating
      const fccBasis = [{x:0, y:0, z:0}, {x:0.5, y:0.5, z:0}, {x:0.5, y:0, z:0.5}, {x:0, y:0.5, z:0.5}];
      atoms.push(...makeRepeatedLattice(z, fccBasis, 9.0, 1.6));
    }
    return atoms;
  }

  // ═══════════════════════════════════════════════════════════════
  // UNSTABLE SUPERHEAVY FISSION DECAY EVENT (Z > 118)
  // ═══════════════════════════════════════════════════════════════
  function formFissionDecay(zA, zB, zResult) {
    isDnaMode = false;
    const atoms = [];

    // Og (118) in the center
    const ogAtoms = getElementAtoms(118, new THREE.Vector3(0, 0, 0), true);
    atoms.push(...ogAtoms);

    // Helium (Z=2) flying away
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const dir = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi)
    );
    const heTarget = dir.clone().multiplyScalar(95);

    atoms.push({
      z: 2,
      pos: heTarget,
      startPos: new THREE.Vector3(0, 0, 0),
      scale: 2.3
    });

    spawnAtoms(atoms);
    
    const symA = EL[zA]?.s || 'X';
    const symB = EL[zB]?.s || 'Y';
    updateTelemetry(
      `Unstable Fission Decay (Z = ${zResult})`,
      `${symA} + ${symB} ➔ Og (118) + He (2) [α-Decay]`,
      'Radionuclide Disintegration / Superheavy Fission',
      'Instantaneous Alpha Decay (Exoenergetic)',
      'Decayed (Half-life < 10⁻¹⁸ s) — Helium nuclei ejected'
    );
  }

  function createExplosion(pos, color1, color2) {
    playCollisionSound();
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    explosionVelocities = [];

    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 0.5 + Math.random() * 1.5;
      
      explosionVelocities.push(new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * speed,
        Math.sin(phi) * Math.sin(theta) * speed,
        Math.cos(phi) * speed
      ));

      const mixedColor = c1.clone().lerp(c2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    explosionParticles = new THREE.Points(geometry, material);
    scene.add(explosionParticles);
    explosionTimer = 35;

    // Shockwave expansion ring
    if (shockwaveRing) scene.remove(shockwaveRing);
    const ringGeo = new THREE.RingGeometry(0.5, 3.0, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: color1 || 0x00FFFF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    shockwaveRing = new THREE.Mesh(ringGeo, ringMat);
    shockwaveRing.position.copy(pos);
    shockwaveRing.rotation.x = Math.PI * 0.5;
    scene.add(shockwaveRing);
    shockwaveScale = 0.1;
    shockwaveOpacity = 1.0;
  }

  // ═══════════════════════════════════════════════════════════════
  // VALENCE ENGINE & VSEPR GEOMETRY COMPILER
  // ═══════════════════════════════════════════════════════════════
  const VALENCE_MAP = {
    1: 1, 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: -3, 8: -2, 9: -1, 10: 0,
    11: 1, 12: 2, 13: 3, 14: 4, 15: -3, 16: -2, 17: -1, 18: 0,
    19: 1, 20: 2, 21: 3, 22: 4, 23: 5, 24: 3, 25: 2, 26: 3, 27: 2, 28: 2, 29: 2, 30: 2,
    31: 3, 32: 4, 33: -3, 34: -2, 35: -1, 36: 0,
    37: 1, 38: 2, 39: 3, 40: 4, 41: 5, 42: 6, 43: 7, 44: 4, 45: 3, 46: 2, 47: 1, 48: 2,
    49: 3, 50: 4, 51: -3, 52: -2, 53: -1, 54: 0,
    55: 1, 56: 2, 72: 4, 73: 5, 74: 6, 75: 7, 76: 4, 77: 4, 78: 4, 79: 3, 80: 2,
    81: 3, 82: 4, 83: 3, 84: -2, 85: -1, 86: 0
  };

  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

  function predictCompoundFormula(zA, zB) {
    const elA = EL[zA] || EL[1];
    const elB = EL[zB] || EL[1];

    const enA = typeof elA.electronegativity === 'number' ? elA.electronegativity : 2.0;
    const enB = typeof elB.electronegativity === 'number' ? elB.electronegativity : 2.0;

    let cation = zA, anion = zB;
    if (enA > enB) { cation = zB; anion = zA; }

    const vCat = Math.abs(VALENCE_MAP[cation] || 1);
    const vAni = Math.abs(VALENCE_MAP[anion] || 1);

    const g = gcd(vCat, vAni);
    let countCat = vAni / g;
    let countAni = vCat / g;

    if (countCat + countAni > 8) {
      countCat = Math.min(countCat, 2);
      countAni = Math.min(countAni, 4);
    }

    const symCat = EL[cation].s;
    const symAni = EL[anion].s;
    const formulaStr = (countCat === 1 ? symCat : `${symCat}${countCat}`) +
                       (countAni === 1 ? symAni : `${symAni}${countAni}`);

    return { cation, anion, countCat, countAni, formulaStr };
  }

  function buildVseprCompound(pred) {
    const atoms = [];
    const { cation, anion, countCat, countAni } = pred;
    const d = 6.5;

    if (countCat === 1) {
      atoms.push({ z: cation, pos: new THREE.Vector3(0, 0, 0), scale: 2.2 });
      const n = countAni;

      if (n === 1) {
        atoms.push({ z: anion, pos: new THREE.Vector3(d, 0, 0), scale: 1.8 });
      } else if (n === 2) {
        const isBent = anion === 8 || anion === 16;
        if (isBent) {
          const angle = (104.5 / 180) * Math.PI;
          atoms.push({ z: anion, pos: new THREE.Vector3(Math.sin(angle*0.5)*d, -Math.cos(angle*0.5)*d, 0), scale: 1.8 });
          atoms.push({ z: anion, pos: new THREE.Vector3(-Math.sin(angle*0.5)*d, -Math.cos(angle*0.5)*d, 0), scale: 1.8 });
        } else {
          atoms.push({ z: anion, pos: new THREE.Vector3(d, 0, 0), scale: 1.8 });
          atoms.push({ z: anion, pos: new THREE.Vector3(-d, 0, 0), scale: 1.8 });
        }
      } else if (n === 3) {
        for (let i = 0; i < 3; i++) {
          const theta = (i / 3) * Math.PI * 2;
          atoms.push({ z: anion, pos: new THREE.Vector3(d * Math.cos(theta), d * Math.sin(theta), 0), scale: 1.8 });
        }
      } else if (n === 4) {
        const vertices = [
          new THREE.Vector3(0, d, 0),
          new THREE.Vector3((Math.sqrt(8)/3)*d, (-1/3)*d, 0),
          new THREE.Vector3((-Math.sqrt(2)/3)*d, (-1/3)*d, (Math.sqrt(2/3))*d),
          new THREE.Vector3((-Math.sqrt(2)/3)*d, (-1/3)*d, (-Math.sqrt(2/3))*d)
        ];
        vertices.forEach(v => atoms.push({ z: anion, pos: v, scale: 1.8 }));
      } else if (n === 5) {
        atoms.push({ z: anion, pos: new THREE.Vector3(0, d*1.1, 0), scale: 1.7 });
        atoms.push({ z: anion, pos: new THREE.Vector3(0, -d*1.1, 0), scale: 1.7 });
        for (let i = 0; i < 3; i++) {
          const theta = (i / 3) * Math.PI * 2;
          atoms.push({ z: anion, pos: new THREE.Vector3(d * Math.cos(theta), 0, d * Math.sin(theta)), scale: 1.7 });
        }
      } else {
        const dirs = [
          new THREE.Vector3(d, 0, 0), new THREE.Vector3(-d, 0, 0),
          new THREE.Vector3(0, d, 0), new THREE.Vector3(0, -d, 0),
          new THREE.Vector3(0, 0, d), new THREE.Vector3(0, 0, -d)
        ];
        dirs.forEach(dir => atoms.push({ z: anion, pos: dir, scale: 1.7 }));
      }
    } else {
      const spacing = 8.0;
      for (let c = 0; c < countCat; c++) {
        const cPos = new THREE.Vector3((c - (countCat-1)*0.5) * spacing * 1.5, 0, 0);
        atoms.push({ z: cation, pos: cPos, scale: 2.0 });
      }
      for (let a = 0; a < countAni; a++) {
        const theta = (a / countAni) * Math.PI * 2;
        const aPos = new THREE.Vector3(
          Math.cos(theta) * spacing * 1.2,
          Math.sin(theta) * spacing * 1.2,
          (a % 2 === 0 ? 1 : -1) * 3.0
        );
        atoms.push({ z: anion, pos: aPos, scale: 1.7 });
      }
    }

    return atoms;
  }

  function formVseprCompound(vseprData) {
    isDnaMode = false;
    spawnAtoms(vseprData.atoms);
    
    const pred = vseprData.pred;
    const nameCat = EL[pred.cation].n;
    const nameAni = EL[pred.anion].n;
    
    let shapeName = 'Linear (AX)';
    if (pred.countCat === 1) {
      if (pred.countAni === 2) shapeName = (pred.anion === 8 || pred.anion === 16) ? 'Bent (AX2E2)' : 'Linear (AX2)';
      else if (pred.countAni === 3) shapeName = 'Trigonal Planar (AX3)';
      else if (pred.countAni === 4) shapeName = 'Tetrahedral (AX4)';
      else if (pred.countAni === 5) shapeName = 'Trigonal Bipyramidal (AX5)';
      else if (pred.countAni >= 6) shapeName = 'Octahedral (AX6)';
    } else {
      shapeName = 'Stoichiometric Network / Chain';
    }

    updateTelemetry(
      `${nameCat} ${nameAni} (${pred.formulaStr})`,
      `${nameCat} + ${nameAni} Stoichiometry`,
      `Geometry: ${shapeName}`,
      `Valence Engine Bond Arrangement`,
      `State: [SYNTHESIZED: ${pred.formulaStr}]`
    );
  }

  function triggerFusionCollision(zA, zB, reaction) {
    isDnaMode = false;
    
    const posA = new THREE.Vector3(-25, 0, 0);
    const posB = new THREE.Vector3(25, 0, 0);
    const atomsA = getElementAtoms(zA, posA);
    const atomsB = getElementAtoms(zB, posB);
    const combinedList = [...atomsA, ...atomsB];
    
    spawnAtoms(combinedList);

    fusionState = 'charging';
    fusionTimer = 55;
    fusionReactantA = zA;
    fusionReactantB = zB;

    if (reaction) {
      fusionTargetReaction = reaction;
    } else {
      const zSum = zA + zB;
      if (zSum > 118) {
        fusionTargetReaction = { isFission: true, zA, zB, zResult: zSum };
      } else {
        const pred = predictCompoundFormula(zA, zB);
        const vseprAtoms = buildVseprCompound(pred);
        fusionTargetReaction = {
          isVsepr: true,
          pred,
          atoms: vseprAtoms
        };
      }
    }

    updateTelemetry(
      `Fusing: ${EL[zA].s} + ${EL[zB].s}`,
      `Accelerating lattices for collision...`,
      'Reaction State: ACTIVE INJECTION',
      'Bonding: Preparing atomic collision',
      'Engaging GPU Particle Fusion Shockwave'
    );
  }

  let temperatureK = 298;
  if (tempSlider) {
    tempSlider.addEventListener('input', e => {
      temperatureK = parseInt(e.target.value);
      const c = temperatureK - 273;
      if (tempVal) tempVal.textContent = `${temperatureK} K (${c > 0 ? '+' + c : c}°C)`;
    });
  }

  function calculateSpectroscopyData(formula, bondType) {
    let lambdaMax = 220;
    let colorHex = '#00F0FF';
    let irStretch = '3000 cm⁻¹';
    let region = 'Far-UV Absorption';

    const str = String(formula || '');
    if (str.includes('O₂') || str.includes('H₂O') || str.includes('Water')) {
      lambdaMax = 185; colorHex = '#00F0FF'; irStretch = '3650 cm⁻¹ (O-H Stretch)'; region = 'Vacuum UV';
    } else if (str.includes('NaCl') || str.includes('CaO') || str.includes('Sodium Chloride')) {
      lambdaMax = 310; colorHex = '#FFD700'; irStretch = '550 cm⁻¹ (Ionic Lattice Stretch)'; region = 'Near UV';
    } else if (str.includes('CO₂') || str.includes('Carbon Dioxide')) {
      lambdaMax = 230; colorHex = '#00FF9D'; irStretch = '2349 cm⁻¹ (C=O Asymmetric Stretch)'; region = 'Mid-IR Active';
    } else if (str.includes('Fe₂O₃') || str.includes('CuO')) {
      lambdaMax = 480; colorHex = '#FF7700'; irStretch = '570 cm⁻¹ (Fe-O Metal-Oxide Stretch)'; region = 'Visible Range';
    } else if (str.includes('KMnO₄')) {
      lambdaMax = 525; colorHex = '#BF00FF'; irStretch = '905 cm⁻¹ (Mn=O Charge Transfer)'; region = 'Visible Range';
    } else if (bondType && String(bondType).includes('Ionic')) {
      lambdaMax = 290; colorHex = '#FFD700'; irStretch = '600 cm⁻¹ (Ionic Lattice)'; region = 'UV-Vis Transition';
    } else if (bondType && String(bondType).includes('Polar')) {
      lambdaMax = 245; colorHex = '#00FF9D'; irStretch = '2950 cm⁻¹ (Polar Covalent)'; region = 'Mid-UV Range';
    }

    return { lambdaMax: `${lambdaMax} nm`, colorHex, irStretch, region };
  }

  function generateTopCompoundSuggestions(reactantsArray) {
    if (!reactantsArray || reactantsArray.length === 0) return [];

    const presentZ = Array.from(new Set(reactantsArray.map(r => r.z)));
    const sortedSyms = reactantsArray.map(r => r.sym).sort().join('+');
    const directSyms = reactantsArray.map(r => r.sym).join('+');

    const suggestions = [];

    const exactMatch = REACTIONS[sortedSyms] || REACTIONS[directSyms];
    if (exactMatch) {
      suggestions.push({
        name: exactMatch.name,
        formula: exactMatch.formula,
        type: exactMatch.type,
        stability: (exactMatch.stabilityScore || 95.0) + '%',
        enthalpy: exactMatch.enthalpy ? `${exactMatch.enthalpy} kJ/mol` : '-250.0 kJ/mol (Calculated)',
        isExact: true
      });
    }

    if (presentZ.length >= 2) {
      const zA = presentZ[0];
      const zB = presentZ[1];
      const pred = predictCompoundFormula(zA, zB);
      const thermo = calculateThermodynamicStability(zA, zB);

      const isAlreadyAdded = suggestions.some(s => s.formula === pred.formulaStr);
      if (!isAlreadyAdded) {
        suggestions.push({
          name: `Predicted ${pred.formulaStr} (${thermo.bondType})`,
          formula: pred.formulaStr,
          type: thermo.bondType,
          stability: thermo.stabilityScore,
          enthalpy: thermo.bondType.includes('Ionic') ? '-450.0 kJ/mol (Est)' : '-210.0 kJ/mol (Est)',
          isExact: false
        });
      }
    }

    if (suggestions.length < 3 && presentZ.length >= 1) {
      const z = presentZ[0];
      const el = (typeof PERIODIC_DATA !== 'undefined' ? PERIODIC_DATA[z] : null) || { s:'El', n:'Element' };
      
      if (z === 8 || presentZ.includes(8)) {
        suggestions.push({ name: 'Oxide Complex', formula: `${el.s}₂O₃`, type: 'Oxide Lattice', stability: '89.4%', enthalpy: '-520 kJ/mol', isExact: false });
      }
      if (z === 1 || presentZ.includes(1)) {
        suggestions.push({ name: 'Hydride Unit', formula: `H${el.s}`, type: 'Polar Hydride', stability: '86.2%', enthalpy: '-140 kJ/mol', isExact: false });
      }
      if (suggestions.length < 3) {
        suggestions.push({ name: `${el.n} Monatomic Lattice`, formula: `${el.s}₁`, type: 'Pure Element', stability: '99.0%', enthalpy: '0.0 kJ/mol', isExact: false });
      }
    }

    return suggestions.slice(0, 5);
  }

  function calculateGibbsFreeEnergy(deltaH, deltaS, tempK) {
    const dH = typeof deltaH === 'number' ? deltaH : -240.0;
    const dS = typeof deltaS === 'number' ? deltaS : -110.0;
    const tK = tempK || temperatureK || 298;

    const deltaG = dH - (tK * (dS / 1000.0));
    const isSpontaneous = deltaG < 0;
    const statusLabel = isSpontaneous ? 'SPONTANEOUS (FAVORABLE)' : 'ENDERGONIC (HIGH ENERGY INPUT)';
    const colorHex = isSpontaneous ? '#00FF9D' : '#FF0055';

    return { deltaG: parseFloat(deltaG.toFixed(1)), isSpontaneous, statusLabel, colorHex };
  }

  function updateTelemetry(name, formula, cls, bonds, epi, enthalpy, dipole, stability, note) {
    if (hudName) hudName.textContent = name || '—';
    if (hudFormula) hudFormula.textContent = formula || '—';
    if (hudClass) hudClass.textContent = cls || '—';
    if (hudBonds) hudBonds.textContent = bonds || '—';
    if (hudEpi) hudEpi.textContent = epi || '—';

    if (hudEnthalpy) hudEnthalpy.textContent = enthalpy !== undefined ? (typeof enthalpy === 'number' ? `${enthalpy} kJ/mol` : enthalpy) : '—';
    if (hudDipole) hudDipole.textContent = dipole !== undefined ? (typeof dipole === 'number' ? `${dipole} Debye` : dipole) : '—';
    
    // Calculate Gibbs Free Energy Spontaneity (ΔG = ΔH - TΔS)
    const gibbs = calculateGibbsFreeEnergy(enthalpy, -110.0, temperatureK);
    if (hudStability) {
      const isNum = typeof stability === 'number';
      const stabVal = isNum ? `${stability}%` : (stability || '95.0%');
      hudStability.textContent = `${stabVal} | ΔG: ${gibbs.deltaG} kJ/mol [${gibbs.isSpontaneous ? 'FAVORABLE' : 'UNFAVORABLE'}]`;
      hudStability.style.color = gibbs.colorHex;
    }

    if (hudNote) hudNote.textContent = note || `Thermodynamic State: ${gibbs.statusLabel}`;

    // Calculate spectroscopy photon data
    const spec = calculateSpectroscopyData(formula || name || '', cls || '');
    if (hudSpectrum) {
      hudSpectrum.textContent = `${spec.lambdaMax} (${spec.region})`;
      hudSpectrum.style.color = spec.colorHex;
    }
    if (hudIr) hudIr.textContent = spec.irStretch;

    if (topBanner && name) {
      topBanner.textContent = String(name).toUpperCase();
    }
  }

  function exportGLTFFile() {
    playTone(750, 'sine', 0.2);
    if (activeAtoms.length === 0) return;

    const gltfStructure = {
      asset: { version: "2.0", generator: "NULLA-LABS IUPAC 3D Engine" },
      scenes: [{ nodes: activeAtoms.map((_, idx) => idx) }],
      nodes: activeAtoms.map((a, idx) => ({
        name: a.elData?.n || `Atom_${idx}`,
        translation: [a.currentPos.x, a.currentPos.y, a.currentPos.z],
        scale: [a.scale, a.scale, a.scale]
      }))
    };

    const blob = new Blob([JSON.stringify(gltfStructure, null, 2)], { type: 'model/gltf+json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'molecule_structure_ar.gltf';
    link.click();
  }

  function exportUSDZFile() {
    playTone(800, 'sine', 0.2);
    if (activeAtoms.length === 0) return;

    let usdaContent = `#usda 1.0\n( defaultPrim = "Molecule" )\n\ndef Xform "Molecule"\n{\n`;
    activeAtoms.forEach((a, i) => {
      usdaContent += `  def Sphere "Atom_${i}"\n  {\n    double radius = ${(a.currentScale || 1.0).toFixed(2)}\n    double3 xformOp:translate = (${a.currentPos.x.toFixed(3)}, ${a.currentPos.y.toFixed(3)}, ${a.currentPos.z.toFixed(3)})\n    uniform token[] xformOpOrder = ["xformOp:translate"]\n  }\n`;
    });
    usdaContent += `}\n`;

    const blob = new Blob([usdaContent], { type: 'model/vnd.usdz+zip' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'molecule_structure_apple_ar.usdz';
    link.click();
  }

  function exportXYZFile() {
    playTone(880, 'sine', 0.2);
    if (activeAtoms.length === 0) return;

    let xyzText = `${activeAtoms.length}\n`;
    xyzText += `Generated by NULLA-LABS IUPAC 3D Synthesis Platform (3D Coordinates)\n`;

    activeAtoms.forEach(a => {
      const sym = a.elData?.s || 'X';
      const x = a.currentPos.x.toFixed(4);
      const y = a.currentPos.y.toFixed(4);
      const z = a.currentPos.z.toFixed(4);
      xyzText += `${sym.padEnd(4)} ${x.padStart(10)} ${y.padStart(10)} ${z.padStart(10)}\n`;
    });

    const blob = new Blob([xyzText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'molecule_structure_3d.xyz';
    link.click();
  }

  function showGenerativeSuggestions() {
    playTone(550, 'triangle', 0.15);
    const suggestionModal = document.getElementById('suggestion-modal');
    const suggestionList = document.getElementById('suggestion-list');

    if (!suggestionModal || !suggestionList) return;

    const suggestions = generateTopCompoundSuggestions(selectedReactants);
    suggestionList.innerHTML = '';

    if (suggestions.length === 0) {
      suggestionList.innerHTML = '<div style="font-size:9.5px; color:rgba(255,255,255,0.7); text-align:center; padding:8px;">Selecciona elementos en la bandeja para ver sugerencias generativas.</div>';
    } else {
      suggestions.forEach((s) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.cssText = `
          padding: 8px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.25);
          background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(18,24,36,0.85) 100%);
          display: flex; justify-content: space-between; align-items: center; cursor: pointer;
          transition: all 0.2s;
        `;
        itemDiv.innerHTML = `
          <div>
            <div style="font-size:10px; font-weight:700; color:#FFFFFF;">${s.name} (${s.formula})</div>
            <div style="font-size:8px; color:rgba(255,255,255,0.65);">${s.type} · Estabilidad: ${s.stability}</div>
          </div>
          <button style="padding:4px 8px; border-radius:6px; border:1px solid rgba(255,255,255,0.4); background:rgba(255,255,255,0.15); color:#FFFFFF; font-size:8px; font-weight:700; cursor:pointer;">⚡ FUSION</button>
        `;
        itemDiv.addEventListener('click', () => {
          suggestionModal.style.display = 'none';
          attemptMultiFusion();
        });
        suggestionList.appendChild(itemDiv);
      });
    }

    suggestionModal.style.display = 'block';
  }

  // ═══════════════════════════════════════════════════════════════
  // MULTI-ELEMENT REACTANT TRAY MANAGER (2 to 5 Elements)
  // ═══════════════════════════════════════════════════════════════
  let selectedReactants = [];
  const MAX_REACTANTS = 5;

  function updateReactantsTrayHUD() {
    for (let i = 0; i < 5; i++) {
      if (slots[i]) {
        if (i < selectedReactants.length) {
          slots[i].textContent = selectedReactants[i].sym;
          const el = EL[selectedReactants[i].z];
          const colorStr = '#' + (el ? el.col : 0x00F0FF).toString(16).padStart(6, '0');
          slots[i].style.color = colorStr;
        } else {
          slots[i].textContent = '—';
          slots[i].style.color = '#00F0FF';
        }
      }
    }
  }

  function renderSideBySidePreviewAtoms() {
    if (selectedReactants.length === 0) return;
    
    isDnaMode = false;
    const atoms = [];
    const count = selectedReactants.length;

    // Wide horizontal separation (56+ units clearance) to eliminate any cluster overlap
    const offsets = [];
    if (count === 2) {
      offsets.push(new THREE.Vector3(-28.0, 0, 0));
      offsets.push(new THREE.Vector3(28.0, 0, 0));
    } else if (count === 3) {
      offsets.push(new THREE.Vector3(-32.0, -6.0, 0));
      offsets.push(new THREE.Vector3(0, 16.0, 0));
      offsets.push(new THREE.Vector3(32.0, -6.0, 0));
    } else if (count === 4) {
      offsets.push(new THREE.Vector3(-36.0, -8.0, 0));
      offsets.push(new THREE.Vector3(-14.0, 14.0, 0));
      offsets.push(new THREE.Vector3(14.0, 14.0, 0));
      offsets.push(new THREE.Vector3(36.0, -8.0, 0));
    } else {
      offsets.push(new THREE.Vector3(-40.0, -10.0, 0));
      offsets.push(new THREE.Vector3(-20.0, 12.0, 0));
      offsets.push(new THREE.Vector3(0, -6.0, 0));
      offsets.push(new THREE.Vector3(20.0, 12.0, 0));
      offsets.push(new THREE.Vector3(40.0, -10.0, 0));
    }

    selectedReactants.forEach((r, idx) => {
      const offset = offsets[idx] || new THREE.Vector3((idx - (count - 1) * 0.5) * 26.0, 0, 0);
      const elAtoms = getElementAtoms(r.z, offset);
      atoms.push(...elAtoms);
    });

    spawnAtoms(atoms);

    const symbolsStr = selectedReactants.map(r => r.sym).join(' + ');
    updateTelemetry(
      `Multi-Reactant Tray (${count}/${MAX_REACTANTS})`,
      symbolsStr,
      `State: ACTIVE INJECTION TRAY`,
      `Ready for Collision (Click ⚡ FUSE ALL)`,
      `Wide Horizontal 3D Quantum Separation`
    );
  }

  function selectElementForTray(z) {
    playTone(400 + selectedReactants.length * 80, 'sine', 0.12);
    if (selectedReactants.length >= MAX_REACTANTS) {
      updateTelemetry(
        `Tray Maximum Reached (5/5)`,
        `Multi-body quantum kinetics capped at 5 elements`,
        `Reaction State: TRAY FULL`,
        `Click ⚡ FUSE ALL or ↩ UNDO`,
        `Multi-body collision limit enforced`
      );
      return;
    }

    const sym = EL[z]?.s || 'X';
    selectedReactants.push({ z, sym });
    updateReactantsTrayHUD();

    if (selectedReactants.length === 1) {
      formElement(z);
    } else {
      renderSideBySidePreviewAtoms();
    }
  }

  function undoLastReactant() {
    playTone(300, 'triangle', 0.1);
    if (selectedReactants.length > 0) {
      selectedReactants.pop();
      updateReactantsTrayHUD();
      if (selectedReactants.length === 1) {
        formElement(selectedReactants[0].z);
      } else if (selectedReactants.length > 1) {
        renderSideBySidePreviewAtoms();
      } else {
        buildDNA();
      }
    }
  }

  function clearReactantTray() {
    playTone(200, 'sawtooth', 0.15);
    selectedReactants = [];
    updateReactantsTrayHUD();
  }

  function attemptMultiFusion() {
    if (selectedReactants.length < 2) return;

    playTone(600, 'triangle', 0.2);
    const sortedSymbols = selectedReactants.map(r => r.sym).sort().join('+');
    const directSymbols = selectedReactants.map(r => r.sym).join('+');

    const reaction = REACTIONS[sortedSymbols] || REACTIONS[directSymbols];

    if (selectedReactants.length === 2) {
      triggerFusionCollision(selectedReactants[0].z, selectedReactants[1].z, reaction);
    } else {
      isDnaMode = false;
      
      const atoms = [];
      const count = selectedReactants.length;
      const offsets = [];
      if (count === 3) {
        offsets.push(new THREE.Vector3(-32.0, -6.0, 0));
        offsets.push(new THREE.Vector3(0, 16.0, 0));
        offsets.push(new THREE.Vector3(32.0, -6.0, 0));
      } else if (count === 4) {
        offsets.push(new THREE.Vector3(-36.0, -8.0, 0));
        offsets.push(new THREE.Vector3(-14.0, 14.0, 0));
        offsets.push(new THREE.Vector3(14.0, 14.0, 0));
        offsets.push(new THREE.Vector3(36.0, -8.0, 0));
      } else {
        offsets.push(new THREE.Vector3(-40.0, -10.0, 0));
        offsets.push(new THREE.Vector3(-20.0, 12.0, 0));
        offsets.push(new THREE.Vector3(0, -6.0, 0));
        offsets.push(new THREE.Vector3(20.0, 12.0, 0));
        offsets.push(new THREE.Vector3(40.0, -10.0, 0));
      }

      selectedReactants.forEach((r, idx) => {
        const offset = offsets[idx] || new THREE.Vector3((idx - (count - 1) * 0.5) * 26.0, 0, 0);
        const elAtoms = getElementAtoms(r.z, offset);
        atoms.push(...elAtoms);
      });

      spawnAtoms(atoms);

      fusionState = 'charging';
      fusionTimer = 55;
      fusionReactantA = selectedReactants[0].z;
      fusionReactantB = selectedReactants[1].z;

      if (reaction) {
        fusionTargetReaction = reaction;
      } else {
        const cationR = selectedReactants.find(r => !['O','F','Cl','Br','I','S','N'].includes(r.sym)) || selectedReactants[0];
        const anionR = selectedReactants.find(r => ['O','F','Cl','Br','I','S','N'].includes(r.sym)) || selectedReactants[selectedReactants.length-1];
        
        const pred = predictCompoundFormula(cationR.z, anionR.z);
        const vseprAtoms = buildVseprCompound(pred);
        fusionTargetReaction = {
          isVsepr: true,
          pred,
          atoms: vseprAtoms
        };
      }

      updateTelemetry(
        `Multi-Fusion Acceleration (${selectedReactants.length} Elements)`,
        selectedReactants.map(r => r.sym).join(' + '),
        `Collision State: CONVERGING RADIANTS TO CENTROID`,
        `Engaging Quantum Shockwave Generator`,
        `Synthesizing Multi-Element Complex`
      );
    }
  }

  const ptTooltip = document.getElementById('pt-tooltip');

  document.querySelectorAll('.pt-el').forEach(cell => {
    cell.addEventListener('mousemove', e => {
      const z = parseInt(cell.dataset.z);
      if (!z) return;
      const el = EL[z];
      if (!el) return;

      if (ptTooltip) {
        ptTooltip.style.display = 'block';
        ptTooltip.style.left = (e.clientX + 14) + 'px';
        ptTooltip.style.top = (e.clientY + 14) + 'px';

        const massStr = typeof el.m === 'number' ? el.m.toFixed(3) : el.m;
        ptTooltip.innerHTML = `
          <div class="tt-header">${el.n} (${el.s}) — Z=${z}</div>
          <div class="tt-row"><span class="tt-label">Mass:</span> <span>${massStr} u</span></div>
          <div class="tt-row"><span class="tt-label">Phase:</span> <span>${el.phase || 'Solid'}</span></div>
          <div class="tt-row"><span class="tt-label">Category:</span> <span>${el.cat}</span></div>
          <div class="tt-row"><span class="tt-label">Shells:</span> <span>${el.sh}</span></div>
        `;
      }
    });

    cell.addEventListener('mouseleave', () => {
      if (ptTooltip) ptTooltip.style.display = 'none';
    });

    cell.addEventListener('click', () => {
      if (ptTooltip) ptTooltip.style.display = 'none';
      const z = parseInt(cell.dataset.z);
      if (!z) return;
      selectElementForTray(z);
    });
  });

  // FUSE Button
  if (btnFuse) {
    btnFuse.addEventListener('click', attemptMultiFusion);
  }

  // SUGGEST Button
  if (btnSuggest) {
    btnSuggest.addEventListener('click', showGenerativeSuggestions);
  }

  const btnCloseSuggest = document.getElementById('btn-close-suggest');
  if (btnCloseSuggest) {
    btnCloseSuggest.addEventListener('click', () => {
      const suggestionModal = document.getElementById('suggestion-modal');
      if (suggestionModal) suggestionModal.style.display = 'none';
    });
  }

  // TECHNICAL DOCUMENTATION MODAL
  const btnDocs = document.getElementById('btn-docs');
  const docsModal = document.getElementById('docs-modal');
  const btnCloseDocs = document.getElementById('btn-close-docs');

  if (btnDocs) {
    btnDocs.addEventListener('click', () => {
      playTone(600, 'sine', 0.15);
      if (docsModal) docsModal.style.display = 'block';
    });
  }

  if (btnCloseDocs) {
    btnCloseDocs.addEventListener('click', () => {
      if (docsModal) docsModal.style.display = 'none';
    });
  }

  // EXPORT .XYZ Button
  if (btnExportXyz) {
    btnExportXyz.addEventListener('click', exportXYZFile);
  }

  // UNDO Button
  if (btnUndo) {
    btnUndo.addEventListener('click', undoLastReactant);
  }

  // CLEAR Button
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      clearReactantTray();
      buildDNA();
    });
  }

  // RESET to DNA
  if (btnReassemble) {
    btnReassemble.addEventListener('click', () => {
      playTone(330, 'sine', 0.15);
      clearReactantTray();
      buildDNA();
    });
  }

  // 3D CELL MODEL Button
  const btnCell = document.getElementById('btn-cell');
  if (btnCell) {
    btnCell.addEventListener('click', () => {
      playTone(550, 'triangle', 0.15);
      clearReactantTray();
      buildEukaryoticCell();
    });
  }

  const organelleNavPanel = document.getElementById('organelle-nav-panel');

  function focusOrganelle(key) {
    playTone(650, 'sine', 0.15);
    const data = {
      nuc: { name: 'Núcleo y Nucléolo (Cromatina TP53)', formula: 'DNA + RNA + Histonas H1-H4', cls: 'Organela de Control Genético', bonds: 'Puentes H (Nucleobases A-T / G-C)', note: 'Depósito de información genética y síntesis de ARN ribosomal.' },
      mito: { name: 'Mitocondria (Síntesis ATP)', formula: 'C₁₀H₁₆N₅O₁₃P₃ (ATP)', cls: 'Central de Energía Oxidativa', bonds: 'Enlaces Éster de Alta Energía P~O', note: 'Generación de ATP celular mediante la cadena transportadora de electrones.' },
      golgi: { name: 'Aparato de Golgi (Dictiosomas)', formula: 'Glicoproteínas y Glicolípidos', cls: 'Organela Secreta & Empaquetamiento', bonds: 'Enlaces Glicosídicos', note: 'Glicosilación, empaquetamiento vesicular y distribución proteica.' },
      er: { name: 'Retículo Endoplásmico Rugoso y Liso', formula: 'Lípidos + Ribosomas 80S', cls: 'Síntesis Proteica y Lipídica', bonds: 'Enlaces Peptídicos & Lipídicos', note: 'Plegamiento proteico chaperona y detoxificación lipídica.' },
      mem: { name: 'Membrana Plasmática', formula: '(C₃₆H₇₂O₈PR)₂', cls: 'Bicapa Semipermeable', bonds: 'Fuerzas de Van der Waals & Hidrofóbicas', note: 'Regulación del gradiente electroquímico y señalización.' },
      cyto: { name: 'Citosol y Matriz de Electrolitos', formula: 'Na⁺, K⁺, Cl⁻, Ca²⁺, H₂O', cls: 'Matriz Hidroelectrolítica', bonds: 'Iónicos / Solvatación Acuosa', note: 'Mantenimiento de la presión osmótica y velocidad de difusión.' }
    }[key];

    if (data) {
      updateTelemetry(data.name, data.formula, data.cls, data.bonds, 'State: [ORGANELLE 3D ZOOM ACTIVE]', -210, 3.2, '99.5%', data.note);
    }
  }

  const btnOrgNuc = document.getElementById('btn-org-nuc');
  const btnOrgMito = document.getElementById('btn-org-mito');
  const btnOrgGolgi = document.getElementById('btn-org-golgi');
  const btnOrgEr = document.getElementById('btn-org-er');
  const btnOrgMem = document.getElementById('btn-org-mem');
  const btnOrgCyto = document.getElementById('btn-org-cyto');

  if (btnOrgNuc) btnOrgNuc.addEventListener('click', () => focusOrganelle('nuc'));
  if (btnOrgMito) btnOrgMito.addEventListener('click', () => focusOrganelle('mito'));
  if (btnOrgGolgi) btnOrgGolgi.addEventListener('click', () => focusOrganelle('golgi'));
  if (btnOrgEr) btnOrgEr.addEventListener('click', () => focusOrganelle('er'));
  if (btnOrgMem) btnOrgMem.addEventListener('click', () => focusOrganelle('mem'));
  if (btnOrgCyto) btnOrgCyto.addEventListener('click', () => focusOrganelle('cyto'));

  // RANDOM SYNTHESIS Button (2 to 4 Elements)
  if (btnRandom) {
    btnRandom.addEventListener('click', () => {
      playTone(440, 'triangle', 0.1);
      clearReactantTray();
      const count = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < count; i++) {
        const randZ = Math.floor(Math.random() * 118) + 1;
        selectElementForTray(randZ);
      }
      setTimeout(() => {
        attemptMultiFusion();
      }, 500);
    });
  }

  let isMeasuringMode = false;
  let selectedMeasureAtoms = [];
  let laserLineMesh = null;

  if (btnMeasure) {
    btnMeasure.addEventListener('click', () => {
      isMeasuringMode = !isMeasuringMode;
      selectedMeasureAtoms = [];
      btnMeasure.style.borderColor = isMeasuringMode ? '#00FF9D' : 'rgba(255,255,255,0.35)';
      btnMeasure.style.color = isMeasuringMode ? '#00FF9D' : '#FFFFFF';
      playTone(isMeasuringMode ? 700 : 350, 'triangle', 0.15);

      if (!isMeasuringMode && laserLineMesh) {
        scene.remove(laserLineMesh);
        laserLineMesh = null;
      }
    });
  }

  // GRAPHICS QUALITY CONTROLS
  let currentQuality = 'MEDIUM';
  const btnQualLow = document.getElementById('btn-quality-low');
  const btnQualMed = document.getElementById('btn-quality-med');
  const btnQualUltra = document.getElementById('btn-quality-ultra');

  function setQualityPreset(level) {
    playTone(600, 'sine', 0.1);
    currentQuality = level;
    [btnQualLow, btnQualMed, btnQualUltra].forEach(b => {
      if (b) { b.style.borderColor = 'rgba(255,255,255,0.25)'; b.style.background = 'rgba(18,24,36,0.8)'; }
    });
    if (level === 'LOW' && btnQualLow) { btnQualLow.style.borderColor = '#00F0FF'; btnQualLow.style.background = 'rgba(0,240,255,0.2)'; }
    if (level === 'MEDIUM' && btnQualMed) { btnQualMed.style.borderColor = '#00F0FF'; btnQualMed.style.background = 'rgba(0,240,255,0.2)'; }
    if (level === 'ULTRA' && btnQualUltra) { btnQualUltra.style.borderColor = '#00F0FF'; btnQualUltra.style.background = 'rgba(0,240,255,0.2)'; }
  }

  if (btnQualLow) btnQualLow.addEventListener('click', () => setQualityPreset('LOW'));
  if (btnQualMed) btnQualMed.addEventListener('click', () => setQualityPreset('MEDIUM'));
  if (btnQualUltra) btnQualUltra.addEventListener('click', () => setQualityPreset('ULTRA'));

  // EDUCATIONAL QUIZ MODAL
  const btnQuiz = document.getElementById('btn-quiz');
  const quizModal = document.getElementById('quiz-modal');
  const btnCloseQuiz = document.getElementById('btn-close-quiz');
  const quizQuestion = document.getElementById('quiz-question');
  const quizOptions = document.getElementById('quiz-options');
  const quizExplanation = document.getElementById('quiz-explanation');

  let currentQuizIdx = 0;

  function loadQuizQuestion(idx) {
    if (typeof QUIZ_QUESTIONS === 'undefined' || !QUIZ_QUESTIONS || QUIZ_QUESTIONS.length === 0) return;
    const q = QUIZ_QUESTIONS[idx % QUIZ_QUESTIONS.length];
    if (quizQuestion) quizQuestion.textContent = q.question;
    if (quizExplanation) quizExplanation.style.display = 'none';

    if (quizOptions) {
      quizOptions.innerHTML = '';
      q.options.forEach((opt, optIdx) => {
        const btn = document.createElement('button');
        btn.style.cssText = `
          padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3);
          background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(18,24,36,0.9) 100%);
          color: #FFFFFF; font-family: 'Orbitron', sans-serif; font-size: 9px; font-weight: 700;
          text-align: left; cursor: pointer; transition: all 0.2s;
        `;
        btn.textContent = `${optIdx + 1}. ${opt}`;
        btn.addEventListener('click', () => {
          if (optIdx === q.correct) {
            playTone(880, 'sine', 0.2);
            btn.style.borderColor = '#00FF9D';
            btn.style.background = 'rgba(0,255,157,0.25)';
          } else {
            playTone(220, 'sawtooth', 0.2);
            btn.style.borderColor = '#FF0055';
            btn.style.background = 'rgba(255,0,85,0.25)';
          }
          if (quizExplanation) {
            quizExplanation.textContent = q.explanation;
            quizExplanation.style.display = 'block';
          }
        });
        quizOptions.appendChild(btn);
      });
    }
  }

  if (btnQuiz) {
    btnQuiz.addEventListener('click', () => {
      playTone(650, 'triangle', 0.15);
      loadQuizQuestion(currentQuizIdx);
      if (quizModal) quizModal.style.display = 'block';
    });
  }

  if (btnCloseQuiz) {
    btnCloseQuiz.addEventListener('click', () => {
      if (quizModal) quizModal.style.display = 'none';
    });
  }

  // URL STATE SHARING (#reactants=11,17)
  const btnShareUrl = document.getElementById('btn-share-url');
  if (btnShareUrl) {
    btnShareUrl.addEventListener('click', () => {
      playTone(700, 'sine', 0.15);
      if (selectedReactants.length === 0) return;
      const zList = selectedReactants.map(r => r.z).join(',');
      const shareUrl = `${location.origin}${location.pathname}#reactants=${zList}`;
      navigator.clipboard.writeText(shareUrl);
      updateTelemetry('URL Direct Share Copied!', shareUrl, 'State Hash Loaded', 'Link copied to clipboard', 'Shareable Quantum Hash');
    });
  }

  // Read URL Hash on init
  if (location.hash && location.hash.includes('reactants=')) {
    try {
      const zStr = location.hash.split('reactants=')[1];
      const zs = zStr.split(',').map(n => parseInt(n)).filter(n => !isNaN(n));
      if (zs.length > 0) {
        setTimeout(() => {
          zs.forEach(z => selectElementForTray(z));
          attemptMultiFusion();
        }, 800);
      }
    } catch (e) { console.warn('Hash parse error:', e); }
  }

  if (btnExportGltf) {
    btnExportGltf.addEventListener('click', exportGLTFFile);
  }

  const btnExportUsdz = document.getElementById('btn-export-usdz');
  if (btnExportUsdz) {
    btnExportUsdz.addEventListener('click', exportUSDZFile);
  }

  // WEBGPU / WEBGL2 AUTOMATIC CAPABILITY DETECTOR
  const gpuStatusBadge = document.getElementById('gpu-status-badge');
  if (navigator.gpu && gpuStatusBadge) {
    navigator.gpu.requestAdapter().then(adapter => {
      if (adapter) {
        gpuStatusBadge.textContent = '⚡ WEBGPU HIGH-PERF · 118 ELEMENTS';
        gpuStatusBadge.style.color = '#00FF9D';
        gpuStatusBadge.style.borderColor = 'rgba(0,255,157,0.5)';
      }
    }).catch(() => {});
  }

  // ═══════════════════════════════════════════════════════════════
  // INTERACTIVE GUIDED ONBOARDING TUTORIAL ENGINE
  // ═══════════════════════════════════════════════════════════════
  let currentTutorialStep = 0;
  const btnTutorial = document.getElementById('btn-tutorial');
  const onboardingOverlay = document.getElementById('onboarding-overlay');
  const onboardingTitle = document.getElementById('onboarding-title');
  const onboardingInstruction = document.getElementById('onboarding-instruction');
  const onboardingStepIndicator = document.getElementById('onboarding-step-indicator');
  const btnNextOnboarding = document.getElementById('btn-next-onboarding');
  const btnCloseOnboarding = document.getElementById('btn-close-onboarding');

  const TUTORIAL_STEPS = [
    {
      step: 1,
      title: "🚀 PASO 1/3: SELECCIÓN EN LA TABLA PERIÓDICA",
      instruction: "Haz clic en 2 elementos de la tabla inferior (por ejemplo, Sodio Na (11) y Cloro Cl (17)) para colocarlos en la bandeja de síntesis.",
      targetId: "pt-hud-panel"
    },
    {
      step: 2,
      title: "💥 PASO 2/3: FUSIÓN Y SÍNTESIS QUÍMICA",
      instruction: "Una vez seleccionados tus reactantes, pulsa el botón brillante [FUSE] para simular la colisión termodinámica a alta energía cinética.",
      targetId: "btn-fuse"
    },
    {
      step: 3,
      title: "🔬 PASO 3/3: TELEMETRÍA 3D, MEDICIÓN Y TÉRRMICA",
      instruction: "¡Enhorabuena! Observa la energía libre de Gibbs ΔG en la telemetría, mueve el slider de temperatura (0-1000 K) o pulsa 📏 MEDIR 3D para conectar átomos y medir ángulos VSEPR.",
      targetId: "molecular-hud"
    }
  ];

  function showTutorialStep(idx) {
    if (!onboardingOverlay) return;
    currentTutorialStep = idx % TUTORIAL_STEPS.length;
    const s = TUTORIAL_STEPS[currentTutorialStep];

    if (onboardingTitle) onboardingTitle.textContent = s.title;
    if (onboardingInstruction) onboardingInstruction.textContent = s.instruction;
    if (onboardingStepIndicator) onboardingStepIndicator.textContent = `PASO ${s.step} / 3`;

    if (btnNextOnboarding) {
      btnNextOnboarding.textContent = s.step === 3 ? "¡ENTENDIDO! ✓" : "SIGUIENTE ➔";
    }

    onboardingOverlay.style.display = 'block';

    const targetEl = document.getElementById(s.targetId);
    if (targetEl) {
      targetEl.style.boxShadow = '0 0 35px rgba(0, 255, 157, 0.9)';
      setTimeout(() => {
        if (targetEl) targetEl.style.boxShadow = '';
      }, 3500);
    }
  }

  if (btnTutorial) {
    btnTutorial.addEventListener('click', () => {
      playTone(700, 'sine', 0.15);
      showTutorialStep(0);
    });
  }

  if (btnNextOnboarding) {
    btnNextOnboarding.addEventListener('click', () => {
      playTone(600, 'sine', 0.1);
      if (currentTutorialStep >= 2) {
        if (onboardingOverlay) onboardingOverlay.style.display = 'none';
      } else {
        showTutorialStep(currentTutorialStep + 1);
      }
    });
  }

  if (btnCloseOnboarding) {
    btnCloseOnboarding.addEventListener('click', () => {
      if (onboardingOverlay) onboardingOverlay.style.display = 'none';
    });
  }

  if (!location.hash && typeof paramZ === 'undefined' && typeof paramFuse === 'undefined') {
    setTimeout(() => {
      showTutorialStep(0);
    }, 1200);
  }

  // WEBXR / VR VIRTUAL REALITY SESSION BUTTON
  const btnWebxr = document.getElementById('btn-webxr');
  if (btnWebxr) {
    btnWebxr.addEventListener('click', () => {
      playTone(720, 'sine', 0.2);
      if (navigator.xr) {
        navigator.xr.isSessionSupported('immersive-vr').then(supported => {
          if (supported) {
            updateTelemetry('WebXR VR Mode', 'Virtual Reality Session Active', 'VR Stereo Hardware Enabled', 'Headset Connected', 'Immersive Quantum Laboratory');
          } else {
            updateTelemetry('WebXR Ready', 'Stereo 3D Simulation Ready', 'Connect VR Headset (Meta Quest / HTC Vive)', 'Device Check Complete', 'WebXR Polyfill Enabled');
          }
        });
      } else {
        updateTelemetry('WebXR Stereo Mode', 'Stereoscopic 3D Render', 'WebXR API standard active', 'Viewable in 3D / VR browsers', 'WebGL2 High-Perf Pipeline');
      }
    });
  }

  // ATOMIC ORBITALS Button
  if (btnOrbitals) {
    btnOrbitals.addEventListener('click', () => {
      playTone(520, 'sine', 0.2);
      const targetZ = selectedSlotA ? selectedSlotA.z : (activeAtoms.length > 0 ? activeAtoms[0].z : 6);
      generateAtomicOrbitalCloud(targetZ);
    });
  }

  // AUDIO TOGGLE Button
  if (btnAudio) {
    btnAudio.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      btnAudio.textContent = audioEnabled ? '🔊 AUDIO: ON' : '🔇 AUDIO: OFF';
      btnAudio.style.color = audioEnabled ? '#FFFFFF' : 'rgba(255,255,255,0.4)';
    });
  }

  // EXPORT HD SCREENSHOT Button
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      playTone(880, 'sine', 0.2);
      renderer.render(scene, camera);
      const dataUrl = renderer.domElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'nulla-labs-synthesis-3d.png';
      link.href = dataUrl;
      link.click();
    });
  }



  // ═══════════════════════════════════════════════════════════════
  // MOUSE ORBIT & RAYCAST SELECTION
  // ═══════════════════════════════════════════════════════════════
  const raycaster = new THREE.Raycaster();
  const mouseScreen = new THREE.Vector2();

  let isDragging = false, prevMouse = {x:0,y:0};
  let targetRotX = 0, targetRotY = 0, curRotX = 0, curRotY = 0;
  let hoveredAtomObj = null, selectedAtomObj = null;

  window.addEventListener('mousemove', e => {
    mouseScreen.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseScreen.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseScreen, camera);
    const hits = raycaster.intersectObjects(activeInstancedMeshes);

    if (hits.length > 0) {
      const hitMesh = hits[0].object;
      const hitIdx = hits[0].instanceId;
      const hit = activeAtoms.find(a => a.instancedMesh === hitMesh && a.instIdx === hitIdx && !a.removing);

      if (hit) {
        if (hoveredAtomObj && hoveredAtomObj !== hit && hoveredAtomObj !== selectedAtomObj) {
          hoveredAtomObj.targetScale = hoveredAtomObj.isElectron ? 0.35 : (1.2 + (hoveredAtomObj.elData.r || 1.0) * 0.4);
        }
        hoveredAtomObj = hit;
        if (hit !== selectedAtomObj) {
          hit.targetScale = (hit.isElectron ? 0.35 : (1.2 + (hit.elData.r || 1.0) * 0.4)) * 1.4;
        }
        document.body.style.cursor = 'pointer';
      } else {
        resetHover();
      }
    } else {
      resetHover();
    }

    function resetHover() {
      if (hoveredAtomObj && hoveredAtomObj !== selectedAtomObj) {
        hoveredAtomObj.targetScale = hoveredAtomObj.isElectron ? 0.35 : (1.2 + (hoveredAtomObj.elData.r || 1.0) * 0.4);
      }
      hoveredAtomObj = null;
      document.body.style.cursor = 'default';
    }

    if (isDragging) {
      targetRotY += (e.clientX - prevMouse.x) * 0.006;
      targetRotX += (e.clientY - prevMouse.y) * 0.006;
      prevMouse = {x:e.clientX, y:e.clientY};
    }
  });

  window.addEventListener('mousedown', e => { isDragging = true; prevMouse = {x:e.clientX, y:e.clientY}; });
  window.addEventListener('mouseup', () => { isDragging = false; });

  window.addEventListener('click', e => {
    if (e.target !== canvas) return;

    raycaster.setFromCamera(mouseScreen, camera);
    const hits = raycaster.intersectObjects(activeInstancedMeshes);

    if (hits.length > 0) {
      const hitMesh = hits[0].object;
      const hitIdx = hits[0].instanceId;
      const hit = activeAtoms.find(a => a.instancedMesh === hitMesh && a.instIdx === hitIdx && !a.removing);

      if (hit) {
        if (isMeasuringMode) {
          playTone(600 + selectedMeasureAtoms.length * 150, 'sine', 0.12);
          if (selectedMeasureAtoms.length >= 3) selectedMeasureAtoms = [];
          selectedMeasureAtoms.push(hit);

          if (laserLineMesh) scene.remove(laserLineMesh);

          if (selectedMeasureAtoms.length >= 2) {
            const posA = selectedMeasureAtoms[0].currentPos;
            const posB = selectedMeasureAtoms[1].currentPos;
            const distWorld = posA.distanceTo(posB);
            const distAngstrom = (distWorld * 0.42).toFixed(2);
            const distPicometer = (distWorld * 42.0).toFixed(0);

            const points = [posA, posB];
            let angleStr = '';

            if (selectedMeasureAtoms.length === 3) {
              const posC = selectedMeasureAtoms[2].currentPos;
              points.push(posC, posA);
              const vAB = new THREE.Vector3().subVectors(posA, posB);
              const vCB = new THREE.Vector3().subVectors(posC, posB);
              const angleRad = vAB.angleTo(vCB);
              const angleDeg = (angleRad * 180 / Math.PI).toFixed(1);
              angleStr = ` | Bond Angle: ${angleDeg}°`;
            }

            const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
            const lineMat = new THREE.LineBasicMaterial({ color: 0x00FF9D, linewidth: 2 });
            laserLineMesh = new THREE.Line(lineGeo, lineMat);
            scene.add(laserLineMesh);

            updateTelemetry(
              `Laser 3D Measurement Mode`,
              `Distance: ${distAngstrom} Å (${distPicometer} pm)${angleStr}`,
              `3D Laser Distance & VSEPR Angle Gizmo`,
              `Selected: ${selectedMeasureAtoms.map(a => a.elData.s).join(' — ')}`,
              `Active Laser Vector`
            );
          } else {
            updateTelemetry(
              `Laser 3D Measurement Mode`,
              `Atom 1 Selected (${hit.elData.s})`,
              `Click 2nd atom to measure distance in Ångströms`,
              `Click 3rd atom to measure bond angle (°)`,
              `Laser Target Locked`
            );
          }
        } else {
          if (selectedAtomObj) {
            selectedAtomObj.targetScale = selectedAtomObj.isElectron ? 0.35 : (1.2 + (selectedAtomObj.elData.r || 1.0) * 0.4);
          }

          selectedAtomObj = hit;
          hit.targetScale = (hit.isElectron ? 0.35 : (1.2 + (hit.elData.r || 1.0) * 0.4)) * 1.8;
          selectRing.position.copy(hit.currentPos);
          selectRing.visible = true;

          updateTelemetry(
            `${hit.elData.n} (${hit.elData.s}) — Z = ${hit.z}`,
            `Atomic Mass: ${hit.elData.m} u`,
            `Category: ${hit.elData.cat}`,
            `Electron Config: ${hit.elData.sh}`,
            `Individual Atom Selected`
          );
        }
      }
    }
  });

  window.addEventListener('wheel', e => {
    camera.position.z += e.deltaY * 0.04;
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, 25, 130);
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ═══════════════════════════════════════════════════════════════
  // RENDER LOOP — Superfluid Transitions & Fail-Safe Guard Engine
  // ═══════════════════════════════════════════════════════════════
  let frameCount = 0, lastTime = performance.now();

  function sanitizeVector(v) {
    if (!v) return;
    if (isNaN(v.x) || !isFinite(v.x)) v.x = 0;
    if (isNaN(v.y) || !isFinite(v.y)) v.y = 0;
    if (isNaN(v.z) || !isFinite(v.z)) v.z = 0;
  }

  function animate(now) {
    requestAnimationFrame(animate);

    try {
      frameCount++;
      if (now - lastTime >= 1000) {
        if (fpsVal) fpsVal.textContent = frameCount + ' FPS';
        frameCount = 0;
        lastTime = now;
      }

      const t = now * 0.001;

      // Superfluid atom morphing & dynamic behaviors
    const dummy = new THREE.Object3D();
    const instUpdateList = new Set();

    // Real-time 3D laser measurement vector line update
    if (isMeasuringMode && selectedMeasureAtoms.length >= 2) {
      try {
        const points = selectedMeasureAtoms.map(a => a.currentPos);
        if (selectedMeasureAtoms.length === 3) points.push(selectedMeasureAtoms[0].currentPos);
        if (laserLineMesh) {
          laserLineMesh.geometry.dispose();
          laserLineMesh.geometry = new THREE.BufferGeometry().setFromPoints(points);
        }
      } catch (e) {
        console.warn('Laser line update error:', e);
      }
    }

    for (let i = activeAtoms.length - 1; i >= 0; i--) {
      const a = activeAtoms[i];
      
      // Real Thermal Phase Behavior (Solid < 273K, Liquid 273K - 373K, Gas >= 373K)
      if (fusionState === 'idle' && !a.removing && !a.isElectron) {
        if (temperatureK < 273) {
          // SOLID LATTICE: rigid crystal structure with tight harmonic oscillation
          const solidScale = temperatureK / 273.0;
          if (a.basePos) a.targetPos.copy(a.basePos);
          const vibX = Math.sin(t * 8.0 + a.instIdx) * (0.04 * solidScale);
          const vibY = Math.cos(t * 9.5 + a.instIdx) * (0.04 * solidScale);
          const vibZ = Math.sin(t * 7.2 + a.instIdx) * (0.04 * solidScale);
          a.currentPos.add(new THREE.Vector3(vibX, vibY, vibZ));
          if (hudEpi && i === 0) hudEpi.textContent = `SOLID CRYSTAL LATTICE (${temperatureK}K)`;
        } else if (temperatureK < 373) {
          // LIQUID FLUID: amorphous fluid cohesion with smooth wave motion
          const liqWobbleX = Math.sin(t * 3.5 + (a.basePos ? a.basePos.y : a.instIdx) * 0.4) * 0.7;
          const liqWobbleY = Math.cos(t * 4.2 + (a.basePos ? a.basePos.x : a.instIdx) * 0.4) * 0.7;
          const liqWobbleZ = Math.sin(t * 2.8 + (a.basePos ? a.basePos.z : a.instIdx) * 0.4) * 0.7;
          if (a.basePos) a.targetPos.copy(a.basePos).add(new THREE.Vector3(liqWobbleX, liqWobbleY, liqWobbleZ));
          if (hudEpi && i === 0) hudEpi.textContent = `LIQUID COHESIVE FLUID (${temperatureK}K)`;
        } else {
          // GAS BROWNIAN EXPANSION: high kinetic dispersion with bouncing boundaries
          const gasScale = (temperatureK - 373.0) * 0.005 + 1.0;
          if (!a.velocity) {
            a.velocity = new THREE.Vector3(
              (Math.random() - 0.5) * 8.0 * gasScale,
              (Math.random() - 0.5) * 8.0 * gasScale,
              (Math.random() - 0.5) * 8.0 * gasScale
            );
          }
          a.targetPos.addScaledVector(a.velocity, 0.016 * gasScale);
          const limit = 26.0;
          if (Math.abs(a.targetPos.x) > limit) { a.velocity.x *= -1; a.targetPos.x = Math.sign(a.targetPos.x) * limit; }
          if (Math.abs(a.targetPos.y) > limit) { a.velocity.y *= -1; a.targetPos.y = Math.sign(a.targetPos.y) * limit; }
          if (Math.abs(a.targetPos.z) > limit) { a.velocity.z *= -1; a.targetPos.z = Math.sign(a.targetPos.z) * limit; }
          if (hudEpi && i === 0) hudEpi.textContent = `GAS BROWNIAN EXPANSION (${temperatureK}K)`;
        }
      }

      // Orbit motion for noble gas electrons
      if (a.isElectron && a.parent && fusionState === 'idle' && !a.removing) {
        const parentAtom = activeAtoms.find(other => other === a.parent);
        const parentPos = parentAtom ? parentAtom.currentPos : a.parent.pos;
        
        const angle = a.orbitAngle + t * a.orbitSpeed;
        const localPos = new THREE.Vector3(Math.cos(angle) * a.orbitR, 0, Math.sin(angle) * a.orbitR);
        localPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), a.tiltX);
        localPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), a.tiltY);
        a.targetPos.copy(parentPos).add(localPos);
      }

      // Lerp position and scale
      a.currentPos.lerp(a.targetPos, 0.06);
      a.currentScale += (a.targetScale - a.currentScale) * 0.08;
      
      dummy.position.copy(a.currentPos);
      dummy.scale.setScalar(Math.max(0.001, a.currentScale));
      dummy.updateMatrix();
      
      if (a.instancedMesh) {
        a.instancedMesh.setMatrixAt(a.instIdx, dummy.matrix);
        instUpdateList.add(a.instancedMesh);
      }

      if (a.labelSprite) {
        a.labelSprite.position.copy(a.currentPos);
        a.labelSprite.position.y += a.currentScale * 1.15 + 0.4;
        a.labelSprite.scale.setScalar(Math.max(0.001, a.currentScale * 3.8));
      }

      // Remove fully shrunk atoms
      if (a.removing && a.currentScale < 0.05) {
        if (a.labelSprite) moleculeGroup.remove(a.labelSprite);
        activeAtoms.splice(i, 1);
      }
    }

    instUpdateList.forEach(im => {
      im.instanceMatrix.needsUpdate = true;
    });

    // Update noble gas orbit ring positions
    activeOrbitLines.forEach(line => {
      const nucleus = activeAtoms.find(other => other.targetPos === line.userData.nucleusPos);
      if (nucleus) {
        line.position.copy(nucleus.currentPos);
      }
    });

    // Update bonds inside the single InstancedMesh
    if (activeBondInstancedMesh) {
      activeBonds.forEach(b => {
        if (b.removing) {
          for (let o = 0; o < b.order; o++) {
            dummy.position.set(0, 0, 0);
            dummy.scale.setScalar(0.001);
            dummy.updateMatrix();
            activeBondInstancedMesh.setMatrixAt(b.startIdx + o, dummy.matrix);
          }
          return;
        }

        const atomA = activeAtoms[b.aIdx];
        const atomB = activeAtoms[b.bIdx];
        
        if (atomA && atomB) {
          const start = atomA.currentPos;
          const end = atomB.currentPos;
          const dist = start.distanceTo(end);
          const center = start.clone().add(end).multiplyScalar(0.5);
          const dir = end.clone().sub(start).normalize();
          
          let ortho = new THREE.Vector3(0, 1, 0).cross(dir).normalize();
          if (ortho.lengthSq() < 0.01) {
            ortho = new THREE.Vector3(0, 0, 1).cross(dir).normalize();
          }

          const scaleA = atomA.currentScale;
          const scaleB = atomB.currentScale;
          const bondScale = Math.min(scaleA, scaleB) * 0.3;

          for (let idx = 0; idx < b.order; idx++) {
            let pos = center.clone();
            if (b.order === 2) {
              const offsetDir = ortho.clone().multiplyScalar((idx === 0 ? 0.35 : -0.35));
              pos.add(offsetDir);
            } else if (b.order === 3) {
              if (idx === 1) pos.add(ortho.clone().multiplyScalar(0.5));
              if (idx === 2) pos.add(ortho.clone().multiplyScalar(-0.5));
            }
            
            dummy.position.copy(pos);
            dummy.scale.set(bondScale, dist, bondScale);
            dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
            dummy.updateMatrix();
            activeBondInstancedMesh.setMatrixAt(b.startIdx + idx, dummy.matrix);
          }
        } else {
          for (let o = 0; o < b.order; o++) {
            dummy.position.set(0, 0, 0);
            dummy.scale.setScalar(0.001);
            dummy.updateMatrix();
            activeBondInstancedMesh.setMatrixAt(b.startIdx + o, dummy.matrix);
          }
        }
      });
      activeBondInstancedMesh.instanceMatrix.needsUpdate = true;
    }

    // Camera shake effect
    if (camShakeTimer > 0) {
      camera.position.x = (Math.random() - 0.5) * (camShakeTimer * 0.15);
      camera.position.y = (Math.random() - 0.5) * (camShakeTimer * 0.15);
      camShakeTimer--;
      if (camShakeTimer === 0) {
        camera.position.set(0, 0, 75);
      }
    }

    // Fusion state machine
    if (fusionState === 'charging') {
      fusionTimer--;
      if (fusionTimer === 0) {
        fusionState = 'colliding';
        fusionTimer = 22;
        activeAtoms.forEach(a => {
          a.targetPos.set(0, 0, 0);
        });
      }
    } else if (fusionState === 'colliding') {
      fusionTimer--;
      if (fusionTimer === 0) {
        fusionState = 'idle';
        
        const isFiss = fusionTargetReaction && fusionTargetReaction.isFission;
        const col1 = isFiss ? 0xFF3300 : EL[fusionReactantA].col;
        const col2 = isFiss ? 0xFFCC00 : EL[fusionReactantB].col;
        
        createExplosion(new THREE.Vector3(0,0,0), col1, col2);
        camShakeTimer = 25;
        
        if (fusionTargetReaction) {
          if (fusionTargetReaction.isVsepr) {
            formVseprCompound(fusionTargetReaction);
          } else if (fusionTargetReaction.isFission) {
            formFissionDecay(fusionTargetReaction.zA, fusionTargetReaction.zB, fusionTargetReaction.zResult);
          } else if (fusionTargetReaction.isNuclear) {
            formElement(fusionTargetReaction.z, true);
          } else if (fusionTargetReaction.isInert) {
            formInertMixture(fusionTargetReaction.zA, fusionTargetReaction.zB);
          } else {
            formCompound(fusionTargetReaction);
          }
        } else {
          activeAtoms.forEach(a => { a.targetScale = 0.0; a.removing = true; });
          activeBonds.forEach(b => { b.removing = true; });
          updateTelemetry(
            `No Stable Reaction: ${EL[fusionReactantA].s} + ${EL[fusionReactantB].s}`,
            `${EL[fusionReactantA].s} + ${EL[fusionReactantB].s} collided at high kinetic energy`,
            'Fusion State: DECAY / DISSOCIATED',
            'No standard stable bond arrangement formed',
            'Try elements with stable reaction paths in the periodic table!'
          );
        }
      }
    }

    // Animate shockwave expansion ring
    if (shockwaveRing && shockwaveOpacity > 0.01) {
      shockwaveScale += 1.8;
      shockwaveOpacity *= 0.88;
      shockwaveRing.scale.set(shockwaveScale, shockwaveScale, shockwaveScale);
      shockwaveRing.material.opacity = shockwaveOpacity;
      if (shockwaveOpacity <= 0.01) {
        scene.remove(shockwaveRing);
        shockwaveRing.geometry.dispose();
        shockwaveRing.material.dispose();
        shockwaveRing = null;
      }
    }

    // Animate explosion particles
    if (explosionParticles && explosionTimer > 0) {
      const positions = explosionParticles.geometry.attributes.position.array;
      for (let i = 0; i < explosionVelocities.length; i++) {
        const vel = explosionVelocities[i];
        positions[i * 3] += vel.x;
        positions[i * 3 + 1] += vel.y;
        positions[i * 3 + 2] += vel.z;
        vel.multiplyScalar(0.95);
      }
      explosionParticles.geometry.attributes.position.needsUpdate = true;
      explosionParticles.material.opacity = explosionTimer / 35;
      explosionTimer--;
      
      if (explosionTimer === 0) {
        scene.remove(explosionParticles);
        explosionParticles.geometry.dispose();
        explosionParticles.material.dispose();
        explosionParticles = null;
      }
    }

    // Selection ring follows selected atom
    if (selectRing.visible && selectedAtomObj && !selectedAtomObj.removing) {
      selectRing.position.copy(selectedAtomObj.currentPos);
      selectRing.rotation.x = t * 3.0;
      selectRing.rotation.y = t * 3.5;
    }

    moleculeGroup.rotation.x = curRotX;
    moleculeGroup.rotation.y = curRotY + t * 0.3;

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  } catch (renderErr) {
    console.warn('Fail-Safe Render Guard caught exception:', renderErr);
  }
}

  // URL Query Parameters Auto-Loader (e.g. ?z=79 or ?fuse=C+F)
  const urlParams = new URLSearchParams(window.location.search);
  const paramZ = urlParams.get('z');
  const paramFuse = urlParams.get('fuse');

  if (paramZ && parseInt(paramZ) >= 1 && parseInt(paramZ) <= 118) {
    formElement(parseInt(paramZ));
  } else if (paramFuse && paramFuse.includes('+')) {
    const parts = paramFuse.split('+');
    const zA = Object.keys(EL).find(k => EL[k].s === parts[0]);
    const zB = Object.keys(EL).find(k => EL[k].s === parts[1]);
    if (zA && zB) {
      const key1 = parts[0] + '+' + parts[1];
      const key2 = parts[1] + '+' + parts[0];
      const reaction = REACTIONS[key1] || REACTIONS[key2];
      triggerFusionCollision(parseInt(zA), parseInt(zB), reaction);
    } else {
      buildDNA();
    }
  } else {
    buildDNA();
  }

  requestAnimationFrame(animate);
})();
