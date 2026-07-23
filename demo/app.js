// NULLA-LABS COMPLETE IUPAC 3D MOLECULAR SYNTHESIS PLATFORM v60.0
// 118 Real Elements + Chemical Reactions Database + Superfluid Morphing
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');

  const hudPanel = document.getElementById('molecular-hud');
  const hudName = document.getElementById('hud-name');
  const hudFormula = document.getElementById('hud-formula');
  const hudClass = document.getElementById('hud-class');
  const hudBonds = document.getElementById('hud-bonds');
  const hudEpi = document.getElementById('hud-epi');
  const btnReassemble = document.getElementById('btn-reassemble');

  const ptHudPanel = document.getElementById('pt-hud-panel');

  const slotA = document.getElementById('slot-a');
  const slotB = document.getElementById('slot-b');
  const btnFuse = document.getElementById('btn-fuse');
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
  // WEBGL 3D SETUP
  // ═══════════════════════════════════════════════════════════════
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference:'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

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
  let activeAtoms = [];    // { mesh, targetPos, targetScale, currentScale, elData }
  let activeBonds = [];    // { mesh, startAtom, endAtom }
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

  // Selection Ring
  const selectRingGeo = new THREE.TorusGeometry(2.8, 0.3, 16, 32);
  const selectRingMat = new THREE.MeshBasicMaterial({ color:0xFF0055, wireframe:true });
  const selectRing = new THREE.Mesh(selectRingGeo, selectRingMat);
  selectRing.visible = false;
  moleculeGroup.add(selectRing);

  function getMaterial(colorHex) {
    return new THREE.MeshPhysicalMaterial({
      color: colorHex,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04
    });
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
    // atomList: [{z, pos: Vector3, col: hex, scale: float, startPos: Vector3}]
    // Fade out existing atoms that aren't needed
    activeAtoms.forEach(a => { a.targetScale = 0.0; a.removing = true; });
    activeBonds.forEach(b => { 
      b.meshes.forEach(m => m.scale.set(0.01,0.01,0.01)); 
      b.removing = true; 
    });

    setTimeout(() => {
      // Remove old atoms after fade
      activeAtoms.filter(a => a.removing).forEach(a => {
        moleculeGroup.remove(a.mesh);
        if (a.labelSprite) moleculeGroup.remove(a.labelSprite);
      });
      activeAtoms = activeAtoms.filter(a => !a.removing);
      activeBonds.filter(b => b.removing).forEach(b => b.meshes.forEach(m => moleculeGroup.remove(m)));
      activeBonds = activeBonds.filter(b => !b.removing);

      // Spawn new atoms
      atomList.forEach(item => {
        const elData = EL[item.z] || EL[1];
        const colorHex = item.col !== undefined ? item.col : elData.col;
        const mat = getMaterial(colorHex);
        const mesh = new THREE.Mesh(sphereGeo, mat);
        
        if (item.startPos) {
          mesh.position.copy(item.startPos);
        } else {
          mesh.position.set(
            (Math.random()-0.5) * 60,
            (Math.random()-0.5) * 40,
            (Math.random()-0.5) * 30
          );
        }
        
        mesh.scale.setScalar(0.01);
        moleculeGroup.add(mesh);

        let labelSprite = null;
        if (!isDnaMode && !item.noLabel) {
          const spriteColor = '#' + colorHex.toString(16).padStart(6, '0');
          labelSprite = createTextSprite(elData.s, spriteColor);
          labelSprite.position.copy(mesh.position);
          labelSprite.scale.setScalar(0.01);
          moleculeGroup.add(labelSprite);
        }

        const scale = item.scale !== undefined ? item.scale : (1.2 + (elData.r || 1.0) * 0.4);

        activeAtoms.push({
          mesh,
          labelSprite,
          targetPos: item.pos.clone(),
          targetScale: scale,
          currentScale: 0.01,
          elData,
          z: item.z,
          removing: false
        });
      });

      if (!isDnaMode) {
        const newBonds = [];
        for (let i = 0; i < activeAtoms.length; i++) {
          for (let j = i + 1; j < activeAtoms.length; j++) {
            const start = activeAtoms[i].targetPos;
            const end = activeAtoms[j].targetPos;
            const dist = start.distanceTo(end);
            const r1 = activeAtoms[i].elData.r || 1.0;
            const r2 = activeAtoms[j].elData.r || 1.0;
            let maxBondDist = Math.max(9.5, (r1 + r2) * 3.5);
            
            // Custom bonding thresholds to ensure physical rods (barillas) show for element lattices
            if (!isDnaMode) {
              const sym1 = activeAtoms[i].elData.s;
              const sym2 = activeAtoms[j].elData.s;
              if (sym1 === sym2) {
                if (sym1 === 'Po') maxBondDist = 12.0; // Simple Cubic Cube Frame
                else if (['Li', 'Na', 'K', 'V', 'Cr', 'Fe', 'Rb', 'Nb', 'Mo', 'Cs', 'Ba', 'Ta', 'W', 'Eu'].includes(sym1)) maxBondDist = 13.0; // BCC center-to-corners
                else if (['Si', 'Ge', 'Sn'].includes(sym1)) maxBondDist = 11.0; // Diamond tetrahedral bonds
                else if (['As', 'Sb', 'Bi'].includes(sym1)) maxBondDist = 8.5; // Puckered sheets
                else if (['Se', 'Te'].includes(sym1)) maxBondDist = 7.0; // Helical chain
                else if (sym1 === 'I') maxBondDist = 4.5; // I2 molecular bonds only
                else if (['Hg', 'Ga', 'Cs', 'Rb', 'Fr', 'Br'].includes(sym1)) maxBondDist = 7.5; // Liquid dynamic clusters
              }
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

  // Spawn chemical bonds between close atoms (supporting single, double, and triple bonds)
  function spawnBonds(bondPairs) {
    // bondPairs: [{a: atomIdx, b: atomIdx}]
    bondPairs.forEach(bp => {
      let order = 1;
      if (!isDnaMode && activeAtoms[bp.a] && activeAtoms[bp.b]) {
        const zA = activeAtoms[bp.a].z;
        const zB = activeAtoms[bp.b].z;
        const symA = EL[zA].s;
        const symB = EL[zB].s;
        
        if ((symA === 'O' && symB === 'O') || (symA === 'C' && symB === 'O') || (symA === 'O' && symB === 'C')) {
          order = 2; // Double bond in O2 or CO2
        } else if (symA === 'N' && symB === 'N') {
          order = 3; // Triple bond in N2
        }
      }

      const meshes = [];
      for (let o = 0; o < order; o++) {
        const mesh = new THREE.Mesh(cylinderGeo, bondMat);
        mesh.scale.set(0.01, 0.01, 0.01);
        moleculeGroup.add(mesh);
        meshes.push(mesh);
      }
      
      activeBonds.push({ meshes, order, aIdx: bp.a, bIdx: bp.b, removing: false });
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
    const RUNG_COLOR = 0x1E2B3E; // Dark navy/slate for rungs

    for (let i = 0; i < BP; i++) {
      const p = i / BP;
      const x = (p - 0.5) * 115;
      const a1 = p * T * Math.PI * 2;
      const a2 = a1 + Math.PI + MG;

      const y1 = Math.sin(a1) * HR, z1 = Math.cos(a1) * HR;
      const y2 = Math.sin(a2) * HR, z2 = Math.cos(a2) * HR;

      // Backbone 1 sphere (thick, glossy, colorful)
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

      // Base pair rungs (every 2 steps to avoid overlapping too much)
      if (i % 2 === 0) {
        for (let r = 1; r <= 6; r++) {
          const rp = r / 7;
          const ry = THREE.MathUtils.lerp(y1, y2, rp);
          const rz = THREE.MathUtils.lerp(z1, z2, rp);
          atoms.push({
            z: 6,
            pos: new THREE.Vector3(x, ry, rz),
            col: RUNG_COLOR,
            scale: 1.1
          });
        }
      }
    }

    spawnAtoms(atoms);
    updateTelemetry(
      'B-DNA Double Helix (TP53 Gene Locus)',
      'Highly Dense Polypeptide & Nucleic Acid Sequence',
      'Genomic Macromolecule',
      'Hydrogen Bonds (Nucleobase Rungs)',
      'Full 120,000 Particle Invictvs 3D Simulation'
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
      `Mass: ${typeof el.m === 'number' ? el.m.toFixed(3) : el.m} u | Electronegativity: ${el.electronegativity || 'N/A'}`,
      `Phase: ${el.phase} | Density: ${el.density || 'N/A'} g/cm³`,
      `Melt: ${el.melt || 'N/A'} K | Boil: ${el.boil || 'N/A'} K`,
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
      'State: ' + reaction.state
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

    if (symbol === 'He' || symbol === 'Ne' || symbol === 'Ar' || symbol === 'Kr' || symbol === 'Xe' || symbol === 'Rn') {
      // 1. MONATOMIC NOBLE GAS
      atoms.push({ z, pos: offset.clone(), startPos: startPos, scale: 2.2 });
      
      const electrons = Math.min(z, 20);
      for (let e = 0; e < electrons; e++) {
        const shell = Math.floor(e / 8);
        const shellR = 6.0 + shell * 5.0;
        const angle = (e / Math.max(1, Math.min(8, electrons - shell*8))) * Math.PI * 2;
        const pos = offset.clone().add(new THREE.Vector3(
          Math.cos(angle) * shellR,
          Math.sin(angle) * shellR,
          (e % 2 === 0 ? 1 : -1) * (shell + 1) * 2.0
        ));
        atoms.push({ z: 1, pos, startPos: startPos, scale: 0.35, isElectron: true, noLabel: true, col: 0x00FFFF });
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
      // 3. DISORDERED LIQUID DROPLET
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
        atoms.push({ z, pos, startPos: startPos, scale: 1.6 });
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
        
        atoms.push({ z, pos: pairCenter.clone().sub(dir), startPos: startPos, scale: 1.6 });
        atoms.push({ z, pos: pairCenter.clone().add(dir), startPos: startPos, scale: 1.6 });
      }
    }
    else if (symbol === 'H' || symbol === 'N' || symbol === 'O' || symbol === 'F' || symbol === 'Cl') {
      // 5. DIATOMIC GAS MOLECULES
      const offsets = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-14, 10, -10),
        new THREE.Vector3(14, -10, 10)
      ];
      offsets.forEach((off, idx) => {
        const theta = idx * 1.5;
        const dir = new THREE.Vector3(Math.cos(theta), Math.sin(theta), Math.cos(theta*2)).normalize().multiplyScalar(3.2);
        atoms.push({ z, pos: offset.clone().add(off).sub(dir), startPos: startPos, scale: 1.6 });
        atoms.push({ z, pos: offset.clone().add(off).add(dir), startPos: startPos, scale: 1.6 });
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
      // 9. SIMPLE CUBIC LATTICE (SC)
      const d = 5.5;
      for (let dx of [-d, d]) {
        for (let dy of [-d, d]) {
          for (let dz of [-d, d]) {
            atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(dx, dy, dz)), startPos: startPos, scale: 1.7 });
          }
        }
      }
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
      // 12. GRAPHITE LAYERS FOR CARBON (2 parallel sheets of hexagonal rings)
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
      // 13. COVALENT DIAMOND LATTICE (5 atoms)
      const d = 6.0;
      atoms.push({ z, pos: offset.clone(), startPos: startPos, scale: 1.8 });
      const vertices = [
        new THREE.Vector3(d, d, d),
        new THREE.Vector3(-d, -d, d),
        new THREE.Vector3(-d, d, -d),
        new THREE.Vector3(d, -d, -d)
      ];
      vertices.forEach(v => atoms.push({ z, pos: offset.clone().add(v), startPos: startPos, scale: 1.7 }));
    }
    else if (['Li', 'Na', 'K', 'V', 'Cr', 'Fe', 'Rb', 'Nb', 'Mo', 'Cs', 'Ba', 'Ta', 'W', 'Eu'].includes(symbol)) {
      // 14. BODY-CENTERED CUBIC LATTICE (BCC)
      const d = 7.0;
      atoms.push({ z, pos: offset.clone(), startPos: startPos, scale: 1.9 });
      for (let dx of [-d, d]) {
        for (let dy of [-d, d]) {
          for (let dz of [-d, d]) {
            atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(dx, dy, dz)), startPos: startPos, scale: 1.5 });
          }
        }
      }
    }
    else if (['Be', 'Mg', 'Ti', 'Co', 'Zn', 'Y', 'Zr', 'Ru', 'Cd', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Lu', 'Hf', 'Re', 'Os', 'Tl'].includes(symbol)) {
      // 15. HEXAGONAL CLOSE-PACKED LATTICE (HCP)
      const r = 6.0;
      const h = 5.0;
      // Lower hexagon + center
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2;
        atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), -h)), startPos: startPos, scale: 1.5 });
      }
      atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(0, 0, -h)), startPos: startPos, scale: 1.6 });
      // Upper hexagon + center
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2;
        atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), h)), startPos: startPos, scale: 1.5 });
      }
      atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(0, 0, h)), startPos: startPos, scale: 1.6 });
      // Mid layer triangle
      const r_mid = r * 0.58;
      for (let i = 0; i < 3; i++) {
        const theta = (i / 3) * Math.PI * 2 + Math.PI / 6;
        atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(r_mid * Math.cos(theta), r_mid * Math.sin(theta), 0)), startPos: startPos, scale: 1.5 });
      }
    }
    else {
      // 16. FACE-CENTERED CUBIC LATTICE (FCC) - Default for metals (Au, Ag, Cu, Pt, Pb, etc.)
      const d = 7.5;
      for (let dx of [-d, d]) {
        for (let dy of [-d, d]) {
          for (let dz of [-d, d]) {
            atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(dx, dy, dz)), startPos: startPos, scale: 1.5 });
          }
        }
      }
      atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(d, 0, 0)), startPos: startPos, scale: 1.6 });
      atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(-d, 0, 0)), startPos: startPos, scale: 1.6 });
      atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(0, d, 0)), startPos: startPos, scale: 1.6 });
      atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(0, -d, 0)), startPos: startPos, scale: 1.6 });
      atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(0, 0, d)), startPos: startPos, scale: 1.6 });
      atoms.push({ z, pos: offset.clone().add(new THREE.Vector3(0, 0, -d)), startPos: startPos, scale: 1.6 });
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
  }

  function triggerFusionCollision(zA, zB, reaction) {
    isDnaMode = false;
    
    activeAtoms.forEach(a => {
      moleculeGroup.remove(a.mesh);
      if (a.labelSprite) moleculeGroup.remove(a.labelSprite);
    });
    activeAtoms = [];
    activeBonds.forEach(b => { b.meshes.forEach(m => moleculeGroup.remove(m)); });
    activeBonds = [];

    const posA = new THREE.Vector3(-25, 0, 0);
    const posB = new THREE.Vector3(25, 0, 0);
    const atomsA = getElementAtoms(zA, posA);
    const atomsB = getElementAtoms(zB, posB);

    const combinedList = [...atomsA, ...atomsB];
    
    combinedList.forEach((item, idx) => {
      const elData = EL[item.z] || EL[1];
      const mat = getMaterial(elData.col);
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.copy(item.pos).add(new THREE.Vector3(
        (Math.random()-0.5)*4,
        (Math.random()-0.5)*4,
        (Math.random()-0.5)*4
      ));
      mesh.scale.setScalar(0.01);
      moleculeGroup.add(mesh);

      const spriteColor = '#' + elData.col.toString(16).padStart(6, '0');
      const labelSprite = createTextSprite(elData.s, spriteColor);
      labelSprite.position.copy(mesh.position);
      labelSprite.scale.setScalar(0.01);
      moleculeGroup.add(labelSprite);

      const scale = 1.2 + (elData.r || 1.0) * 0.4;
      activeAtoms.push({
        mesh,
        labelSprite,
        targetPos: item.pos.clone(),
        targetScale: scale,
        currentScale: 0.01,
        elData,
        z: item.z,
        removing: false
      });
    });

    const newBonds = [];
    for (let i = 0; i < activeAtoms.length; i++) {
      for (let j = i + 1; j < activeAtoms.length; j++) {
        const start = activeAtoms[i].targetPos;
        const end = activeAtoms[j].targetPos;
        const dist = start.distanceTo(end);
        
        const r1 = activeAtoms[i].elData.r || 1.0;
        const r2 = activeAtoms[j].elData.r || 1.0;
        const maxBondDist = Math.max(9.5, (r1 + r2) * 3.5);
        
        if (dist > 0.1 && dist < maxBondDist) {
          newBonds.push({ a: i, b: j });
        }
      }
    }
    spawnBonds(newBonds);

    if (atomCountEl) atomCountEl.textContent = activeAtoms.length + ' ATOMS';

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
        fusionTargetReaction = { isInert: true, zA, zB };
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

  function updateTelemetry(name, formula, cls, bonds, epi) {
    if (hudName) hudName.textContent = name;
    if (hudFormula) hudFormula.textContent = formula;
    if (hudClass) hudClass.textContent = cls;
    if (hudBonds) hudBonds.textContent = bonds;
    if (hudEpi) hudEpi.textContent = epi;
  }

  // ═══════════════════════════════════════════════════════════════
  // PERIODIC TABLE CLICK → ELEMENT SELECTION & MIXING
  // ═══════════════════════════════════════════════════════════════
  let selectedSlotA = null;
  let selectedSlotB = null;

  document.querySelectorAll('.pt-el').forEach(cell => {
    cell.addEventListener('click', () => {
      const z = parseInt(cell.dataset.z);
      const sym = cell.dataset.symbol;
      if (!z) return;

      // If no slot filled → fill slot A and also show the element
      if (!selectedSlotA) {
        selectedSlotA = { z, sym };
        if (slotA) slotA.textContent = sym;
        formElement(z);
      } else if (!selectedSlotB) {
        selectedSlotB = { z, sym };
        if (slotB) slotB.textContent = sym;
        // Don't auto-fuse, let user click FUSE
      } else {
        // Replace slot A, clear B
        selectedSlotA = { z, sym };
        selectedSlotB = null;
        if (slotA) slotA.textContent = sym;
        if (slotB) slotB.textContent = '—';
        formElement(z);
      }
    });
  });

  // FUSE Button
  if (btnFuse) {
    btnFuse.addEventListener('click', () => {
      if (!selectedSlotA || !selectedSlotB) return;
      const symA = EL[selectedSlotA.z].s;
      const symB = EL[selectedSlotB.z].s;
      const key1 = symA + '+' + symB;
      const key2 = symB + '+' + symA;
      const reaction = REACTIONS[key1] || REACTIONS[key2];
      triggerFusionCollision(selectedSlotA.z, selectedSlotB.z, reaction);
    });
  }

  // CLEAR Button
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      selectedSlotA = null;
      selectedSlotB = null;
      if (slotA) slotA.textContent = '—';
      if (slotB) slotB.textContent = '—';
    });
  }

  // RESET to DNA
  if (btnReassemble) {
    btnReassemble.addEventListener('click', () => {
      selectedSlotA = null;
      selectedSlotB = null;
      if (slotA) slotA.textContent = '—';
      if (slotB) slotB.textContent = '—';
      buildDNA();
    });
  }



  // ═══════════════════════════════════════════════════════════════
  // MOUSE ORBIT & RAYCAST SELECTION
  // ═══════════════════════════════════════════════════════════════
  const raycaster = new THREE.Raycaster();
  const mouseScreen = new THREE.Vector2();

  let isDragging = false, prevMouse = {x:0,y:0};
  let targetRotX = 0, targetRotY = 0, curRotX = 0, curRotY = 0;
  let hoveredAtom = null, selectedAtomObj = null;

  window.addEventListener('mousemove', e => {
    mouseScreen.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseScreen.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseScreen, camera);
    const meshes = activeAtoms.filter(a => !a.removing).map(a => a.mesh);
    const hits = raycaster.intersectObjects(meshes);

    if (hits.length > 0) {
      if (hoveredAtom && hoveredAtom !== hits[0].object && hoveredAtom !== (selectedAtomObj && selectedAtomObj.mesh)) {
        const ha = activeAtoms.find(a => a.mesh === hoveredAtom);
        if (ha) ha.targetScale = 1.2 + (ha.elData.r || 1.0) * 0.4;
      }
      hoveredAtom = hits[0].object;
      const ha = activeAtoms.find(a => a.mesh === hoveredAtom);
      if (ha && ha.mesh !== (selectedAtomObj && selectedAtomObj.mesh)) ha.targetScale = (1.2 + (ha.elData.r || 1.0) * 0.4) * 1.4;
      document.body.style.cursor = 'pointer';
    } else {
      if (hoveredAtom && hoveredAtom !== (selectedAtomObj && selectedAtomObj.mesh)) {
        const ha = activeAtoms.find(a => a.mesh === hoveredAtom);
        if (ha) ha.targetScale = 1.2 + (ha.elData.r || 1.0) * 0.4;
      }
      hoveredAtom = null;
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
    const meshes = activeAtoms.filter(a => !a.removing).map(a => a.mesh);
    const hits = raycaster.intersectObjects(meshes);

    if (hits.length > 0) {
      if (selectedAtomObj) selectedAtomObj.targetScale = 1.2 + (selectedAtomObj.elData.r || 1.0) * 0.4;

      const hit = activeAtoms.find(a => a.mesh === hits[0].object);
      if (hit) {
        selectedAtomObj = hit;
        hit.targetScale = (1.2 + (hit.elData.r || 1.0) * 0.4) * 1.8;
        selectRing.position.copy(hit.mesh.position);
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
  // RENDER LOOP — Superfluid Transitions
  // ═══════════════════════════════════════════════════════════════
  let frameCount = 0, lastTime = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);

    frameCount++;
    if (now - lastTime >= 1000) {
      if (fpsVal) fpsVal.textContent = frameCount + ' FPS';
      frameCount = 0;
      lastTime = now;
    }

    const t = now * 0.001;

    // Superfluid atom morphing — smooth position lerp + scale lerp
    for (let i = activeAtoms.length - 1; i >= 0; i--) {
      const a = activeAtoms[i];
      
      // Brownian motion for liquid elements when idle
      const isLiquid = ['Hg', 'Br', 'Ga', 'Cs', 'Rb', 'Fr'].includes(a.elData.s);
      if (isLiquid && fusionState === 'idle' && !a.removing) {
        a.targetPos.x += (Math.random() - 0.5) * 0.35 - a.targetPos.x * 0.015;
        a.targetPos.y += (Math.random() - 0.5) * 0.35 - a.targetPos.y * 0.015;
        a.targetPos.z += (Math.random() - 0.5) * 0.35 - a.targetPos.z * 0.015;
      }
      a.mesh.position.lerp(a.targetPos, 0.06);
      a.currentScale += (a.targetScale - a.currentScale) * 0.08;
      a.mesh.scale.setScalar(Math.max(0.001, a.currentScale));

      if (a.labelSprite) {
        a.labelSprite.position.copy(a.mesh.position);
        a.labelSprite.position.y += a.currentScale * 1.15 + 0.4;
        a.labelSprite.scale.setScalar(Math.max(0.001, a.currentScale * 3.8));
      }

      // Remove fully shrunk atoms
      if (a.removing && a.currentScale < 0.05) {
        moleculeGroup.remove(a.mesh);
        if (a.labelSprite) moleculeGroup.remove(a.labelSprite);
        activeAtoms.splice(i, 1);
      }
    }

    // Update bond stick positions
    for (let i = activeBonds.length - 1; i >= 0; i--) {
      const b = activeBonds[i];
      if (b.removing) {
        b.meshes.forEach(m => moleculeGroup.remove(m));
        activeBonds.splice(i, 1);
        continue;
      }
      if (activeAtoms[b.aIdx] && activeAtoms[b.bIdx]) {
        const start = activeAtoms[b.aIdx].mesh.position;
        const end = activeAtoms[b.bIdx].mesh.position;
        const dist = start.distanceTo(end);
        const center = start.clone().add(end).multiplyScalar(0.5);
        const dir = end.clone().sub(start).normalize();
        
        // Find orthogonal offset vector for multiple bonds
        let ortho = new THREE.Vector3(0, 1, 0).cross(dir).normalize();
        if (ortho.lengthSq() < 0.01) {
          ortho = new THREE.Vector3(0, 0, 1).cross(dir).normalize();
        }
        
        b.meshes.forEach((mesh, idx) => {
          let pos = center.clone();
          if (b.order === 2) {
            const offsetDir = ortho.clone().multiplyScalar((idx === 0 ? 0.35 : -0.35));
            pos.add(offsetDir);
          } else if (b.order === 3) {
            if (idx === 1) pos.add(ortho.clone().multiplyScalar(0.5));
            if (idx === 2) pos.add(ortho.clone().multiplyScalar(-0.5));
          }
          
          mesh.position.copy(pos);
          mesh.scale.set(0.3, dist, 0.3);
          mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        });
      }
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
        
        // Custom explosion colors for fission
        const isFiss = fusionTargetReaction && fusionTargetReaction.isFission;
        const col1 = isFiss ? 0xFF3300 : EL[fusionReactantA].col;
        const col2 = isFiss ? 0xFFCC00 : EL[fusionReactantB].col;
        
        createExplosion(new THREE.Vector3(0,0,0), col1, col2);
        camShakeTimer = 25;
        
        if (fusionTargetReaction) {
          if (fusionTargetReaction.isFission) {
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
          activeBonds.forEach(b => { 
            b.meshes.forEach(m => m.scale.set(0.01,0.01,0.01)); 
            b.removing = true; 
          });
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
      selectRing.position.copy(selectedAtomObj.mesh.position);
      selectRing.rotation.x = t * 3.0;
      selectRing.rotation.y = t * 3.5;
    }

    curRotX += (targetRotX - curRotX) * 0.08;
    curRotY += (targetRotY - curRotY) * 0.08;

    moleculeGroup.rotation.x = curRotX;
    moleculeGroup.rotation.y = curRotY + t * 0.3;

    renderer.render(scene, camera);
  }

  // Initialize with B-DNA example
  buildDNA();
  requestAnimationFrame(animate);
})();
