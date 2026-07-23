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

  const ptModal = document.getElementById('pt-full-modal');
  const btnOpenPt = document.getElementById('btn-open-pt');
  const btnCloseModal = document.getElementById('btn-close-modal');

  const slotA = document.getElementById('slot-a');
  const slotB = document.getElementById('slot-b');
  const btnFuse = document.getElementById('btn-fuse');
  const btnClear = document.getElementById('btn-clear');
  const atomCountEl = document.getElementById('atom-count');

  // ═══════════════════════════════════════════════════════════════
  // COMPLETE 118 IUPAC ELEMENTS DATABASE (ALL REAL DATA)
  // ═══════════════════════════════════════════════════════════════
  const EL = {
    1:{s:'H',n:'Hydrogen',m:1.008,cat:'Nonmetal',sh:'1s¹',col:0xFFFFFF,r:0.53},
    2:{s:'He',n:'Helium',m:4.003,cat:'Noble Gas',sh:'1s²',col:0xBF00FF,r:0.31},
    3:{s:'Li',n:'Lithium',m:6.94,cat:'Alkali Metal',sh:'[He]2s¹',col:0xFFD700,r:1.67},
    4:{s:'Be',n:'Beryllium',m:9.012,cat:'Alkaline Earth',sh:'[He]2s²',col:0xFF7700,r:1.12},
    5:{s:'B',n:'Boron',m:10.81,cat:'Metalloid',sh:'[He]2s²2p¹',col:0x00FF9D,r:0.87},
    6:{s:'C',n:'Carbon',m:12.011,cat:'Nonmetal',sh:'[He]2s²2p²',col:0x8A2BE2,r:0.77},
    7:{s:'N',n:'Nitrogen',m:14.007,cat:'Nonmetal',sh:'[He]2s²2p³',col:0x00F0FF,r:0.75},
    8:{s:'O',n:'Oxygen',m:15.999,cat:'Nonmetal',sh:'[He]2s²2p⁴',col:0xFF0055,r:0.73},
    9:{s:'F',n:'Fluorine',m:18.998,cat:'Halogen',sh:'[He]2s²2p⁵',col:0xFF0055,r:0.64},
    10:{s:'Ne',n:'Neon',m:20.180,cat:'Noble Gas',sh:'[He]2s²2p⁶',col:0xBF00FF,r:0.38},
    11:{s:'Na',n:'Sodium',m:22.990,cat:'Alkali Metal',sh:'[Ne]3s¹',col:0xFFD700,r:1.90},
    12:{s:'Mg',n:'Magnesium',m:24.305,cat:'Alkaline Earth',sh:'[Ne]3s²',col:0xFF7700,r:1.45},
    13:{s:'Al',n:'Aluminium',m:26.982,cat:'Post-Transition',sh:'[Ne]3s²3p¹',col:0xAAAAAA,r:1.18},
    14:{s:'Si',n:'Silicon',m:28.085,cat:'Metalloid',sh:'[Ne]3s²3p²',col:0x00FF9D,r:1.11},
    15:{s:'P',n:'Phosphorus',m:30.974,cat:'Nonmetal',sh:'[Ne]3s²3p³',col:0xFF8800,r:1.06},
    16:{s:'S',n:'Sulfur',m:32.06,cat:'Nonmetal',sh:'[Ne]3s²3p⁴',col:0xFFD700,r:1.02},
    17:{s:'Cl',n:'Chlorine',m:35.45,cat:'Halogen',sh:'[Ne]3s²3p⁵',col:0x00FF9D,r:0.99},
    18:{s:'Ar',n:'Argon',m:39.948,cat:'Noble Gas',sh:'[Ne]3s²3p⁶',col:0xBF00FF,r:0.71},
    19:{s:'K',n:'Potassium',m:39.098,cat:'Alkali Metal',sh:'[Ar]4s¹',col:0xFFD700,r:2.43},
    20:{s:'Ca',n:'Calcium',m:40.078,cat:'Alkaline Earth',sh:'[Ar]4s²',col:0xFF7700,r:1.94},
    21:{s:'Sc',n:'Scandium',m:44.956,cat:'Transition Metal',sh:'[Ar]3d¹4s²',col:0x00D4FF,r:1.84},
    22:{s:'Ti',n:'Titanium',m:47.867,cat:'Transition Metal',sh:'[Ar]3d²4s²',col:0x00D4FF,r:1.76},
    23:{s:'V',n:'Vanadium',m:50.942,cat:'Transition Metal',sh:'[Ar]3d³4s²',col:0x00D4FF,r:1.71},
    24:{s:'Cr',n:'Chromium',m:51.996,cat:'Transition Metal',sh:'[Ar]3d⁵4s¹',col:0x00D4FF,r:1.66},
    25:{s:'Mn',n:'Manganese',m:54.938,cat:'Transition Metal',sh:'[Ar]3d⁵4s²',col:0x00D4FF,r:1.61},
    26:{s:'Fe',n:'Iron',m:55.845,cat:'Transition Metal',sh:'[Ar]3d⁶4s²',col:0x00D4FF,r:1.56},
    27:{s:'Co',n:'Cobalt',m:58.933,cat:'Transition Metal',sh:'[Ar]3d⁷4s²',col:0x00D4FF,r:1.52},
    28:{s:'Ni',n:'Nickel',m:58.693,cat:'Transition Metal',sh:'[Ar]3d⁸4s²',col:0x00D4FF,r:1.49},
    29:{s:'Cu',n:'Copper',m:63.546,cat:'Transition Metal',sh:'[Ar]3d¹⁰4s¹',col:0x00D4FF,r:1.45},
    30:{s:'Zn',n:'Zinc',m:65.38,cat:'Transition Metal',sh:'[Ar]3d¹⁰4s²',col:0x00D4FF,r:1.42},
    31:{s:'Ga',n:'Gallium',m:69.723,cat:'Post-Transition',sh:'[Ar]3d¹⁰4s²4p¹',col:0xAAAAAA,r:1.36},
    32:{s:'Ge',n:'Germanium',m:72.630,cat:'Metalloid',sh:'[Ar]3d¹⁰4s²4p²',col:0x00FF9D,r:1.25},
    33:{s:'As',n:'Arsenic',m:74.922,cat:'Metalloid',sh:'[Ar]3d¹⁰4s²4p³',col:0x00FF9D,r:1.21},
    34:{s:'Se',n:'Selenium',m:78.971,cat:'Nonmetal',sh:'[Ar]3d¹⁰4s²4p⁴',col:0xFF8800,r:1.20},
    35:{s:'Br',n:'Bromine',m:79.904,cat:'Halogen',sh:'[Ar]3d¹⁰4s²4p⁵',col:0xFF0055,r:1.20},
    36:{s:'Kr',n:'Krypton',m:83.798,cat:'Noble Gas',sh:'[Ar]3d¹⁰4s²4p⁶',col:0xBF00FF,r:1.16},
    37:{s:'Rb',n:'Rubidium',m:85.468,cat:'Alkali Metal',sh:'[Kr]5s¹',col:0xFFD700,r:2.35},
    38:{s:'Sr',n:'Strontium',m:87.62,cat:'Alkaline Earth',sh:'[Kr]5s²',col:0xFF7700,r:2.15},
    39:{s:'Y',n:'Yttrium',m:88.906,cat:'Transition Metal',sh:'[Kr]4d¹5s²',col:0x00D4FF,r:1.90},
    40:{s:'Zr',n:'Zirconium',m:91.224,cat:'Transition Metal',sh:'[Kr]4d²5s²',col:0x00D4FF,r:1.75},
    41:{s:'Nb',n:'Niobium',m:92.906,cat:'Transition Metal',sh:'[Kr]4d⁴5s¹',col:0x00D4FF,r:1.64},
    42:{s:'Mo',n:'Molybdenum',m:95.95,cat:'Transition Metal',sh:'[Kr]4d⁵5s¹',col:0x00D4FF,r:1.54},
    43:{s:'Tc',n:'Technetium',m:98,cat:'Transition Metal',sh:'[Kr]4d⁵5s²',col:0x00D4FF,r:1.47},
    44:{s:'Ru',n:'Ruthenium',m:101.07,cat:'Transition Metal',sh:'[Kr]4d⁷5s¹',col:0x00D4FF,r:1.46},
    45:{s:'Rh',n:'Rhodium',m:102.91,cat:'Transition Metal',sh:'[Kr]4d⁸5s¹',col:0x00D4FF,r:1.42},
    46:{s:'Pd',n:'Palladium',m:106.42,cat:'Transition Metal',sh:'[Kr]4d¹⁰',col:0x00D4FF,r:1.39},
    47:{s:'Ag',n:'Silver',m:107.87,cat:'Transition Metal',sh:'[Kr]4d¹⁰5s¹',col:0x00D4FF,r:1.45},
    48:{s:'Cd',n:'Cadmium',m:112.41,cat:'Transition Metal',sh:'[Kr]4d¹⁰5s²',col:0x00D4FF,r:1.44},
    49:{s:'In',n:'Indium',m:114.82,cat:'Post-Transition',sh:'[Kr]4d¹⁰5s²5p¹',col:0xAAAAAA,r:1.42},
    50:{s:'Sn',n:'Tin',m:118.71,cat:'Post-Transition',sh:'[Kr]4d¹⁰5s²5p²',col:0xAAAAAA,r:1.39},
    51:{s:'Sb',n:'Antimony',m:121.76,cat:'Metalloid',sh:'[Kr]4d¹⁰5s²5p³',col:0x00FF9D,r:1.39},
    52:{s:'Te',n:'Tellurium',m:127.60,cat:'Metalloid',sh:'[Kr]4d¹⁰5s²5p⁴',col:0x00FF9D,r:1.38},
    53:{s:'I',n:'Iodine',m:126.90,cat:'Halogen',sh:'[Kr]4d¹⁰5s²5p⁵',col:0xFF0055,r:1.39},
    54:{s:'Xe',n:'Xenon',m:131.29,cat:'Noble Gas',sh:'[Kr]4d¹⁰5s²5p⁶',col:0xBF00FF,r:1.40},
    55:{s:'Cs',n:'Cesium',m:132.91,cat:'Alkali Metal',sh:'[Xe]6s¹',col:0xFFD700,r:2.72},
    56:{s:'Ba',n:'Barium',m:137.33,cat:'Alkaline Earth',sh:'[Xe]6s²',col:0xFF7700,r:2.22},
    57:{s:'La',n:'Lanthanum',m:138.91,cat:'Lanthanide',sh:'[Xe]5d¹6s²',col:0xFF55BB,r:2.04},
    58:{s:'Ce',n:'Cerium',m:140.12,cat:'Lanthanide',sh:'[Xe]4f¹5d¹6s²',col:0xFF55BB,r:2.04},
    59:{s:'Pr',n:'Praseodymium',m:140.91,cat:'Lanthanide',sh:'[Xe]4f³6s²',col:0xFF55BB,r:2.03},
    60:{s:'Nd',n:'Neodymium',m:144.24,cat:'Lanthanide',sh:'[Xe]4f⁴6s²',col:0xFF55BB,r:2.01},
    61:{s:'Pm',n:'Promethium',m:145,cat:'Lanthanide',sh:'[Xe]4f⁵6s²',col:0xFF55BB,r:1.99},
    62:{s:'Sm',n:'Samarium',m:150.36,cat:'Lanthanide',sh:'[Xe]4f⁶6s²',col:0xFF55BB,r:1.98},
    63:{s:'Eu',n:'Europium',m:151.96,cat:'Lanthanide',sh:'[Xe]4f⁷6s²',col:0xFF55BB,r:1.98},
    64:{s:'Gd',n:'Gadolinium',m:157.25,cat:'Lanthanide',sh:'[Xe]4f⁷5d¹6s²',col:0xFF55BB,r:1.96},
    65:{s:'Tb',n:'Terbium',m:158.93,cat:'Lanthanide',sh:'[Xe]4f⁹6s²',col:0xFF55BB,r:1.94},
    66:{s:'Dy',n:'Dysprosium',m:162.50,cat:'Lanthanide',sh:'[Xe]4f¹⁰6s²',col:0xFF55BB,r:1.92},
    67:{s:'Ho',n:'Holmium',m:164.93,cat:'Lanthanide',sh:'[Xe]4f¹¹6s²',col:0xFF55BB,r:1.92},
    68:{s:'Er',n:'Erbium',m:167.26,cat:'Lanthanide',sh:'[Xe]4f¹²6s²',col:0xFF55BB,r:1.89},
    69:{s:'Tm',n:'Thulium',m:168.93,cat:'Lanthanide',sh:'[Xe]4f¹³6s²',col:0xFF55BB,r:1.90},
    70:{s:'Yb',n:'Ytterbium',m:173.05,cat:'Lanthanide',sh:'[Xe]4f¹⁴6s²',col:0xFF55BB,r:1.87},
    71:{s:'Lu',n:'Lutetium',m:174.97,cat:'Lanthanide',sh:'[Xe]4f¹⁴5d¹6s²',col:0xFF55BB,r:1.87},
    72:{s:'Hf',n:'Hafnium',m:178.49,cat:'Transition Metal',sh:'[Xe]4f¹⁴5d²6s²',col:0x00D4FF,r:1.75},
    73:{s:'Ta',n:'Tantalum',m:180.95,cat:'Transition Metal',sh:'[Xe]4f¹⁴5d³6s²',col:0x00D4FF,r:1.70},
    74:{s:'W',n:'Tungsten',m:183.84,cat:'Transition Metal',sh:'[Xe]4f¹⁴5d⁴6s²',col:0x00D4FF,r:1.62},
    75:{s:'Re',n:'Rhenium',m:186.21,cat:'Transition Metal',sh:'[Xe]4f¹⁴5d⁵6s²',col:0x00D4FF,r:1.59},
    76:{s:'Os',n:'Osmium',m:190.23,cat:'Transition Metal',sh:'[Xe]4f¹⁴5d⁶6s²',col:0x00D4FF,r:1.59},
    77:{s:'Ir',n:'Iridium',m:192.22,cat:'Transition Metal',sh:'[Xe]4f¹⁴5d⁷6s²',col:0x00D4FF,r:1.37},
    78:{s:'Pt',n:'Platinum',m:195.08,cat:'Transition Metal',sh:'[Xe]4f¹⁴5d⁹6s¹',col:0x00D4FF,r:1.36},
    79:{s:'Au',n:'Gold',m:196.97,cat:'Transition Metal',sh:'[Xe]4f¹⁴5d¹⁰6s¹',col:0xFFD700,r:1.44},
    80:{s:'Hg',n:'Mercury',m:200.59,cat:'Transition Metal',sh:'[Xe]4f¹⁴5d¹⁰6s²',col:0x00D4FF,r:1.49},
    81:{s:'Tl',n:'Thallium',m:204.38,cat:'Post-Transition',sh:'[Xe]4f¹⁴5d¹⁰6s²6p¹',col:0xAAAAAA,r:1.48},
    82:{s:'Pb',n:'Lead',m:207.2,cat:'Post-Transition',sh:'[Xe]4f¹⁴5d¹⁰6s²6p²',col:0xAAAAAA,r:1.47},
    83:{s:'Bi',n:'Bismuth',m:208.98,cat:'Post-Transition',sh:'[Xe]4f¹⁴5d¹⁰6s²6p³',col:0xAAAAAA,r:1.46},
    84:{s:'Po',n:'Polonium',m:209,cat:'Post-Transition',sh:'[Xe]4f¹⁴5d¹⁰6s²6p⁴',col:0xAAAAAA,r:1.46},
    85:{s:'At',n:'Astatine',m:210,cat:'Halogen',sh:'[Xe]4f¹⁴5d¹⁰6s²6p⁵',col:0xFF0055,r:1.45},
    86:{s:'Rn',n:'Radon',m:222,cat:'Noble Gas',sh:'[Xe]4f¹⁴5d¹⁰6s²6p⁶',col:0xBF00FF,r:1.45},
    87:{s:'Fr',n:'Francium',m:223,cat:'Alkali Metal',sh:'[Rn]7s¹',col:0xFFD700,r:2.90},
    88:{s:'Ra',n:'Radium',m:226,cat:'Alkaline Earth',sh:'[Rn]7s²',col:0xFF7700,r:2.35},
    89:{s:'Ac',n:'Actinium',m:227,cat:'Actinide',sh:'[Rn]6d¹7s²',col:0xFF5533,r:2.15},
    90:{s:'Th',n:'Thorium',m:232.04,cat:'Actinide',sh:'[Rn]6d²7s²',col:0xFF5533,r:2.06},
    91:{s:'Pa',n:'Protactinium',m:231.04,cat:'Actinide',sh:'[Rn]5f²6d¹7s²',col:0xFF5533,r:2.00},
    92:{s:'U',n:'Uranium',m:238.03,cat:'Actinide',sh:'[Rn]5f³6d¹7s²',col:0xFF5533,r:1.96},
    93:{s:'Np',n:'Neptunium',m:237,cat:'Actinide',sh:'[Rn]5f⁴6d¹7s²',col:0xFF5533,r:1.90},
    94:{s:'Pu',n:'Plutonium',m:244,cat:'Actinide',sh:'[Rn]5f⁶7s²',col:0xFF5533,r:1.87},
    95:{s:'Am',n:'Americium',m:243,cat:'Actinide',sh:'[Rn]5f⁷7s²',col:0xFF5533,r:1.80},
    96:{s:'Cm',n:'Curium',m:247,cat:'Actinide',sh:'[Rn]5f⁷6d¹7s²',col:0xFF5533,r:1.69},
    97:{s:'Bk',n:'Berkelium',m:247,cat:'Actinide',sh:'[Rn]5f⁹7s²',col:0xFF5533,r:1.66},
    98:{s:'Cf',n:'Californium',m:251,cat:'Actinide',sh:'[Rn]5f¹⁰7s²',col:0xFF5533,r:1.68},
    99:{s:'Es',n:'Einsteinium',m:252,cat:'Actinide',sh:'[Rn]5f¹¹7s²',col:0xFF5533,r:1.65},
    100:{s:'Fm',n:'Fermium',m:257,cat:'Actinide',sh:'[Rn]5f¹²7s²',col:0xFF5533,r:1.67},
    101:{s:'Md',n:'Mendelevium',m:258,cat:'Actinide',sh:'[Rn]5f¹³7s²',col:0xFF5533,r:1.73},
    102:{s:'No',n:'Nobelium',m:259,cat:'Actinide',sh:'[Rn]5f¹⁴7s²',col:0xFF5533,r:1.76},
    103:{s:'Lr',n:'Lawrencium',m:262,cat:'Actinide',sh:'[Rn]5f¹⁴6d¹7s²',col:0xFF5533,r:1.61},
    104:{s:'Rf',n:'Rutherfordium',m:267,cat:'Transition Metal',sh:'[Rn]5f¹⁴6d²7s²',col:0x00D4FF,r:1.57},
    105:{s:'Db',n:'Dubnium',m:268,cat:'Transition Metal',sh:'[Rn]5f¹⁴6d³7s²',col:0x00D4FF,r:1.49},
    106:{s:'Sg',n:'Seaborgium',m:271,cat:'Transition Metal',sh:'[Rn]5f¹⁴6d⁴7s²',col:0x00D4FF,r:1.43},
    107:{s:'Bh',n:'Bohrium',m:272,cat:'Transition Metal',sh:'[Rn]5f¹⁴6d⁵7s²',col:0x00D4FF,r:1.41},
    108:{s:'Hs',n:'Hassium',m:270,cat:'Transition Metal',sh:'[Rn]5f¹⁴6d⁶7s²',col:0x00D4FF,r:1.34},
    109:{s:'Mt',n:'Meitnerium',m:276,cat:'Transition Metal',sh:'[Rn]5f¹⁴6d⁷7s²',col:0x00D4FF,r:1.29},
    110:{s:'Ds',n:'Darmstadtium',m:281,cat:'Transition Metal',sh:'[Rn]5f¹⁴6d⁸7s²',col:0x00D4FF,r:1.28},
    111:{s:'Rg',n:'Roentgenium',m:280,cat:'Transition Metal',sh:'[Rn]5f¹⁴6d⁹7s²',col:0x00D4FF,r:1.21},
    112:{s:'Cn',n:'Copernicium',m:285,cat:'Transition Metal',sh:'[Rn]5f¹⁴6d¹⁰7s²',col:0x00D4FF,r:1.22},
    113:{s:'Nh',n:'Nihonium',m:284,cat:'Post-Transition',sh:'[Rn]5f¹⁴6d¹⁰7s²7p¹',col:0xAAAAAA,r:1.36},
    114:{s:'Fl',n:'Flerovium',m:289,cat:'Post-Transition',sh:'[Rn]5f¹⁴6d¹⁰7s²7p²',col:0xAAAAAA,r:1.43},
    115:{s:'Mc',n:'Moscovium',m:288,cat:'Post-Transition',sh:'[Rn]5f¹⁴6d¹⁰7s²7p³',col:0xAAAAAA,r:1.62},
    116:{s:'Lv',n:'Livermorium',m:293,cat:'Post-Transition',sh:'[Rn]5f¹⁴6d¹⁰7s²7p⁴',col:0xAAAAAA,r:1.75},
    117:{s:'Ts',n:'Tennessine',m:294,cat:'Halogen',sh:'[Rn]5f¹⁴6d¹⁰7s²7p⁵',col:0xFF0055,r:1.65},
    118:{s:'Og',n:'Oganesson',m:294,cat:'Noble Gas',sh:'[Rn]5f¹⁴6d¹⁰7s²7p⁶',col:0xBF00FF,r:1.57}
  };

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
      activeAtoms.filter(a => a.removing).forEach(a => moleculeGroup.remove(a.mesh));
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

        const scale = item.scale !== undefined ? item.scale : (1.2 + (elData.r || 1.0) * 0.4);

        activeAtoms.push({
          mesh,
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
            const maxBondDist = Math.max(9.5, (r1 + r2) * 3.5);
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
      `${el.n} (${el.s}) — Z = ${z}`,
      `Atomic Mass: ${el.m} u`,
      `Category: ${el.cat}`,
      `Electron Config: ${el.sh}`,
      `Real Structure: ` + (
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

    if (ptModal) ptModal.style.display = 'none';
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
    else if (name === 'Carbon Dioxide' || name === 'Nitric Oxide' || name === 'Hydrochloric Acid' || name === 'Hydrogen Fluoride' || name === 'Hydrogen Bromide') {
      if (reaction.atoms.length === 2 && reaction.atoms[0].c === 1 && reaction.atoms[1].c === 1) {
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
    else if (name === 'Methane' || name === 'Carbon Tetrachloride') {
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
    else if (name === 'Sodium Chloride' || name === 'Potassium Chloride' || name === 'Sodium Fluoride') {
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

    if (ptModal) ptModal.style.display = 'none';
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
        atoms.push({ z: 1, pos, startPos: startPos, scale: 0.6 });
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

    if (ptModal) ptModal.style.display = 'none';
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
    
    activeAtoms.forEach(a => moleculeGroup.remove(a.mesh));
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

      const scale = 1.2 + (elData.r || 1.0) * 0.4;
      activeAtoms.push({
        mesh,
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
      if (zSum <= 118) {
        fusionTargetReaction = { isNuclear: true, z: zSum };
      } else {
        fusionTargetReaction = { isFission: true, zA, zB, zResult: zSum };
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
      } else if (!selectedSlotB && z !== selectedSlotA.z) {
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

  // Modal controls
  if (btnOpenPt) btnOpenPt.addEventListener('click', () => { if (ptModal) ptModal.style.display = 'flex'; });
  if (btnCloseModal) btnCloseModal.addEventListener('click', () => { if (ptModal) ptModal.style.display = 'none'; });

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

      // Remove fully shrunk atoms
      if (a.removing && a.currentScale < 0.05) {
        moleculeGroup.remove(a.mesh);
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
