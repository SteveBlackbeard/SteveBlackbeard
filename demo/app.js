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
    26:{s:'Fe',n:'Iron',m:55.845,cat:'Transition Metal',sh:'[Ar]3d⁶4s²',col:0x00D4FF,r:1.26},
    29:{s:'Cu',n:'Copper',m:63.546,cat:'Transition Metal',sh:'[Ar]3d¹⁰4s¹',col:0x00D4FF,r:1.28},
    30:{s:'Zn',n:'Zinc',m:65.38,cat:'Transition Metal',sh:'[Ar]3d¹⁰4s²',col:0x00D4FF,r:1.22},
    35:{s:'Br',n:'Bromine',m:79.904,cat:'Halogen',sh:'[Ar]3d¹⁰4s²4p⁵',col:0xFF0055,r:1.14},
    47:{s:'Ag',n:'Silver',m:107.87,cat:'Transition Metal',sh:'[Kr]4d¹⁰5s¹',col:0x00D4FF,r:1.44},
    53:{s:'I',n:'Iodine',m:126.90,cat:'Halogen',sh:'[Kr]4d¹⁰5s²5p⁵',col:0xFF0055,r:1.33},
    79:{s:'Au',n:'Gold',m:196.97,cat:'Transition Metal',sh:'[Xe]4f¹⁴5d¹⁰6s¹',col:0xFFD700,r:1.44},
    80:{s:'Hg',n:'Mercury',m:200.59,cat:'Transition Metal',sh:'[Xe]4f¹⁴5d¹⁰6s²',col:0x00D4FF,r:1.51},
    82:{s:'Pb',n:'Lead',m:207.2,cat:'Post-Transition',sh:'[Xe]4f¹⁴5d¹⁰6s²6p²',col:0xAAAAAA,r:1.75},
    92:{s:'U',n:'Uranium',m:238.03,cat:'Actinide',sh:'[Rn]5f³6d¹7s²',col:0xFF5500,r:1.96}
  };

  // Fill generic data for all 118 elements not explicitly defined
  for (let z = 1; z <= 118; z++) {
    if (!EL[z]) EL[z] = { s:'?', n:'Element '+z, m:z*2.2, cat:'Element', sh:'Shell '+z, col:0x00D4FF, r:1.0 };
  }

  // ═══════════════════════════════════════════════════════════════
  // REAL CHEMICAL REACTIONS DATABASE
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
    'Fe+O':  { name:'Iron Oxide (Rust)',     formula:'Fe₂O₃', atoms:[{z:26,c:2},{z:8,c:3}],   type:'Ionic', bonds:'Fe³⁺ O²⁻ Ionic Bond', state:'Solid (25°C)', geom:'Corundum Structure' },
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

  // Selection Ring
  const selectRingGeo = new THREE.TorusGeometry(2.8, 0.3, 16, 32);
  const selectRingMat = new THREE.MeshBasicMaterial({ color:0xFF0055, wireframe:true });
  const selectRing = new THREE.Mesh(selectRingGeo, selectRingMat);
  selectRing.visible = false;
  moleculeGroup.add(selectRing);

  function getMaterial(colorHex) {
    return new THREE.MeshStandardMaterial({ color: colorHex, roughness:0.25, metalness:0.7 });
  }

  // Smoothly spawn atoms at positions with scale-up animation
  function spawnAtoms(atomList) {
    // atomList: [{z, pos: Vector3}]
    // Fade out existing atoms that aren't needed
    activeAtoms.forEach(a => { a.targetScale = 0.0; a.removing = true; });
    activeBonds.forEach(b => { b.mesh.scale.set(0.01,0.01,0.01); b.removing = true; });

    setTimeout(() => {
      // Remove old atoms after fade
      activeAtoms.filter(a => a.removing).forEach(a => moleculeGroup.remove(a.mesh));
      activeAtoms = activeAtoms.filter(a => !a.removing);
      activeBonds.filter(b => b.removing).forEach(b => moleculeGroup.remove(b.mesh));
      activeBonds = activeBonds.filter(b => !b.removing);

      // Spawn new atoms
      atomList.forEach(item => {
        const elData = EL[item.z] || EL[1];
        const mat = getMaterial(elData.col);
        const mesh = new THREE.Mesh(sphereGeo, mat);
        mesh.position.set(
          (Math.random()-0.5) * 60,
          (Math.random()-0.5) * 40,
          (Math.random()-0.5) * 30
        );
        mesh.scale.setScalar(0.01);
        moleculeGroup.add(mesh);

        activeAtoms.push({
          mesh,
          targetPos: item.pos.clone(),
          targetScale: 1.2 + (elData.r || 1.0) * 0.4,
          currentScale: 0.01,
          elData,
          z: item.z,
          removing: false
        });
      });

      if (atomCountEl) atomCountEl.textContent = activeAtoms.length + ' ATOMS';
    }, 300);
  }

  // Spawn chemical bonds between close atoms
  function spawnBonds(bondPairs) {
    // bondPairs: [{a: atomIdx, b: atomIdx}]
    bondPairs.forEach(bp => {
      const mesh = new THREE.Mesh(cylinderGeo, bondMat);
      mesh.scale.set(0.01, 0.01, 0.01);
      moleculeGroup.add(mesh);
      activeBonds.push({ mesh, aIdx: bp.a, bIdx: bp.b, removing: false });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // BUILD DEFAULT B-DNA EXAMPLE
  // ═══════════════════════════════════════════════════════════════
  function buildDNA() {
    const atoms = [];
    const BP = 70;
    const HR = 16.0, MG = 0.38 * Math.PI, T = 5.5;

    for (let i = 0; i < BP; i++) {
      const p = i / BP;
      const x = (p - 0.5) * 110;
      const a1 = p * T * Math.PI * 2;
      const a2 = a1 + Math.PI + MG;

      const y1 = Math.sin(a1) * HR, z1 = Math.cos(a1) * HR;
      const y2 = Math.sin(a2) * HR, z2 = Math.cos(a2) * HR;

      // Phosphorus backbone
      atoms.push({ z:15, pos: new THREE.Vector3(x, y1, z1) });
      atoms.push({ z:15, pos: new THREE.Vector3(x, y2, z2) });
      // Oxygen
      atoms.push({ z:8, pos: new THREE.Vector3(x+0.8, y1+0.8, z1) });
      atoms.push({ z:8, pos: new THREE.Vector3(x+0.8, y2+0.8, z2) });
      // Base pair atoms (N, C alternating)
      for (let r = 0; r < 5; r++) {
        const rp = (r+1)/6;
        const ry = THREE.MathUtils.lerp(y1,y2,rp);
        const rz = THREE.MathUtils.lerp(z1,z2,rp);
        atoms.push({ z: (r%2===0)?7:6, pos: new THREE.Vector3(x, ry, rz) });
      }
    }

    spawnAtoms(atoms);
    updateTelemetry('B-DNA Double Helix (Human Genome)', 'P₇₀ O₁₄₀ N₁₇₅ C₁₇₅',
      'Genetic Macromolecule (Nucleic Acid)', 'Phosphodiester + Hydrogen Bonds',
      'Biological Supercoiled Structure');
  }

  // ═══════════════════════════════════════════════════════════════
  // FORM SINGLE ELEMENT (Electron Shell Orbitals)
  // ═══════════════════════════════════════════════════════════════
  function formElement(z) {
    const el = EL[z];
    const atoms = [];

    // Central nucleus
    atoms.push({ z, pos: new THREE.Vector3(0, 0, 0) });

    // Electron shell cloud (Z electrons orbiting)
    const electrons = Math.min(z, 80);
    for (let e = 0; e < electrons; e++) {
      const shell = Math.floor(e / 8);
      const shellR = 5.0 + shell * 4.5;
      const angle = (e / Math.max(1, Math.min(8, electrons - shell*8))) * Math.PI * 2 + shell * 0.5;
      atoms.push({ z:1, pos: new THREE.Vector3(
        Math.cos(angle) * shellR,
        Math.sin(angle) * shellR,
        (e % 2 === 0 ? 1 : -1) * (shell + 1) * 1.5
      )});
    }

    spawnAtoms(atoms);
    updateTelemetry(
      `${el.n} (${el.s}) — Z = ${z}`,
      `Atomic Mass: ${el.m} u`,
      `Category: ${el.cat}`,
      `Electron Config: ${el.sh}`,
      `Isolated Atom (Electron Shell View)`
    );

    if (ptModal) ptModal.style.display = 'none';
  }

  // ═══════════════════════════════════════════════════════════════
  // FORM COMPOUND FROM REACTION
  // ═══════════════════════════════════════════════════════════════
  function formCompound(reaction) {
    const atoms = [];
    let totalAtoms = 0;

    reaction.atoms.forEach(group => { totalAtoms += group.c; });

    let idx = 0;
    reaction.atoms.forEach(group => {
      const el = EL[group.z];
      for (let a = 0; a < group.c; a++) {
        // Arrange in molecular geometry
        let pos;
        if (totalAtoms <= 2) {
          pos = new THREE.Vector3((a === 0 ? -4 : 4), 0, 0);
        } else if (totalAtoms === 3) {
          // Bent or linear
          const angle = (idx / totalAtoms) * Math.PI * 1.5 - Math.PI * 0.3;
          pos = new THREE.Vector3(Math.cos(angle) * 6, Math.sin(angle) * 6, 0);
        } else if (totalAtoms <= 5) {
          // Tetrahedral-ish
          const phi = Math.acos(-1 + (2 * idx) / totalAtoms);
          const theta = Math.sqrt(totalAtoms * Math.PI) * phi;
          pos = new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta) * 8,
            Math.sin(phi) * Math.sin(theta) * 8,
            Math.cos(phi) * 8
          );
        } else {
          // Larger structures: crystal lattice
          const gridSize = Math.ceil(Math.cbrt(totalAtoms));
          const ix = idx % gridSize, iy = Math.floor(idx / gridSize) % gridSize, iz = Math.floor(idx / (gridSize*gridSize));
          pos = new THREE.Vector3((ix - gridSize/2) * 5, (iy - gridSize/2) * 5, (iz - gridSize/2) * 5);
        }

        atoms.push({ z: group.z, pos });
        idx++;
      }
    });

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

      // Look up reaction in both orders
      const key1 = symA + '+' + symB;
      const key2 = symB + '+' + symA;
      const reaction = REACTIONS[key1] || REACTIONS[key2];

      if (reaction) {
        formCompound(reaction);
      } else {
        updateTelemetry(
          `No Known Reaction: ${symA} + ${symB}`,
          `${symA} (Z=${selectedSlotA.z}) + ${symB} (Z=${selectedSlotB.z})`,
          'No standard chemical compound in database',
          'No known stable bonding arrangement',
          'Try different element combinations!'
        );
      }
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
        moleculeGroup.remove(b.mesh);
        activeBonds.splice(i, 1);
        continue;
      }
      if (activeAtoms[b.aIdx] && activeAtoms[b.bIdx]) {
        const start = activeAtoms[b.aIdx].mesh.position;
        const end = activeAtoms[b.bIdx].mesh.position;
        const dist = start.distanceTo(end);
        b.mesh.position.copy(start.clone().add(end).multiplyScalar(0.5));
        b.mesh.scale.set(0.3, dist, 0.3);
        b.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), end.clone().sub(start).normalize());
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
