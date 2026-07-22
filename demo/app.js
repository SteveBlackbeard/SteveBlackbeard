// NULLA-LABS 3D PERIODIC TABLE & CHEMICAL SYNTHESIS ENGINE v45.0
// Real-Time Chemical Synthesis, Levitating Fluid Morphing & 100% Locked Selection
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');
  const particleVal = document.getElementById('particle-val');

  const hudPanel = document.getElementById('molecular-hud');
  const hudName = document.getElementById('hud-name');
  const hudFormula = document.getElementById('hud-formula');
  const hudClass = document.getElementById('hud-class');
  const hudBonds = document.getElementById('hud-bonds');
  const hudEpi = document.getElementById('hud-epi');
  const btnReassemble = document.getElementById('btn-reassemble');

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020306, 0.002);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 75);

  // 3-Point Studio Lighting
  const dirLight1 = new THREE.DirectionalLight(0x00F0FF, 2.0);
  dirLight1.position.set(50, 60, 50);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x8A2BE2, 1.4);
  dirLight2.position.set(-50, -40, -30);
  scene.add(dirLight2);

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.75);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x00FF9D, 2.5, 90);
  scene.add(pointLight);

  // CPK Physical Materials
  const matHydrogen   = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.1, metalness: 0.9 });
  const matCarbon     = new THREE.MeshStandardMaterial({ color: 0x8A2BE2, roughness: 0.25, metalness: 0.65 });
  const matNitrogen   = new THREE.MeshStandardMaterial({ color: 0x00F0FF, roughness: 0.2, metalness: 0.8 });
  const matOxygen     = new THREE.MeshStandardMaterial({ color: 0xFF0055, roughness: 0.3, metalness: 0.5 });
  const matPhosphorus = new THREE.MeshStandardMaterial({ color: 0xFF8800, roughness: 0.25, metalness: 0.7 });
  const matSodium     = new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.2, metalness: 0.9 });
  const matChlorine   = new THREE.MeshStandardMaterial({ color: 0x00FF9D, roughness: 0.2, metalness: 0.8 });
  const matBond       = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.1, metalness: 0.9, opacity: 0.9, transparent: true });

  const sphereGeo = new THREE.SphereGeometry(1.0, 32, 32);
  const cylinderGeo = new THREE.CylinderGeometry(0.25, 0.25, 1.0, 16);

  const dnaGroup = new THREE.Group();
  scene.add(dnaGroup);

  const BASE_PAIRS = 70;
  const HELIX_RADIUS = 16.0;
  const MAJOR_GROOVE = 0.38 * Math.PI;
  const TURNS = 5.5;

  const atomMeshes = [];
  const componentData = [];
  const defaultPositions = [];
  const targetPositions = [];

  for (let i = 0; i < BASE_PAIRS; i++) {
    const progress = i / BASE_PAIRS;
    const x = (progress - 0.5) * 110.0;

    const angle1 = progress * TURNS * Math.PI * 2.0;
    const angle2 = angle1 + Math.PI + MAJOR_GROOVE;

    const y1 = Math.sin(angle1) * HELIX_RADIUS;
    const z1 = Math.cos(angle1) * HELIX_RADIUS;

    const y2 = Math.sin(angle2) * HELIX_RADIUS;
    const z2 = Math.cos(angle2) * HELIX_RADIUS;

    // Phosphate Backbone Atoms (P, O)
    const meshP1 = new THREE.Mesh(sphereGeo, matPhosphorus);
    meshP1.position.set(x, y1, z1);
    meshP1.scale.setScalar(1.4);
    dnaGroup.add(meshP1);
    atomMeshes.push(meshP1);
    defaultPositions.push(new THREE.Vector3(x, y1, z1));

    const meshP2 = new THREE.Mesh(sphereGeo, matPhosphorus);
    meshP2.position.set(x, y2, z2);
    meshP2.scale.setScalar(1.4);
    dnaGroup.add(meshP2);
    atomMeshes.push(meshP2);
    defaultPositions.push(new THREE.Vector3(x, y2, z2));

    const meshO1 = new THREE.Mesh(sphereGeo, matOxygen);
    meshO1.position.set(x + 0.8, y1 + 0.8, z1);
    meshO1.scale.setScalar(1.0);
    dnaGroup.add(meshO1);
    atomMeshes.push(meshO1);
    defaultPositions.push(new THREE.Vector3(x + 0.8, y1 + 0.8, z1));

    const meshO2 = new THREE.Mesh(sphereGeo, matOxygen);
    meshO2.position.set(x + 0.8, y2 + 0.8, z2);
    meshO2.scale.setScalar(1.0);
    dnaGroup.add(meshO2);
    atomMeshes.push(meshO2);
    defaultPositions.push(new THREE.Vector3(x + 0.8, y2 + 0.8, z2));

    // Base Pair Cross-Bonds & Nitrogenous Atoms (N, C)
    const basePairType = i % 4;
    let baseData;
    if (basePairType === 0) baseData = { name: "Adenine (A) - Thymine (T)", formula: "C5 H5 N5 / C5 H6 N2 O2", type: "Purine-Pyrimidine Base Pair", bonds: "2 Hydrogen Bonds", epi: "Non-Methylated Locus" };
    else if (basePairType === 1) baseData = { name: "Cytosine (C) - Guanine (G)", formula: "C4 H5 N3 O / C5 H5 N5 O", type: "Pyrimidine-Purine Base Pair", bonds: "3 Hydrogen Bonds", epi: "5mC Epigenetic Methylation Tag" };
    else if (basePairType === 2) baseData = { name: "Guanine (G) - Cytosine (C)", formula: "C5 H5 N5 O / C4 H5 N3 O", type: "Purine-Pyrimidine Base Pair", bonds: "3 Hydrogen Bonds", epi: "CpG Island Active" };
    else baseData = { name: "Thymine (T) - Adenine (A)", formula: "C5 H6 N2 O2 / C5 H5 N5", type: "Pyrimidine-Purine Base Pair", bonds: "2 Hydrogen Bonds", epi: "Non-Methylated Locus" };

    const rungAtoms = 5;
    for (let r = 0; r < rungAtoms; r++) {
      const rPos = (r + 1) / (rungAtoms + 1);
      const rx = x;
      const ry = THREE.MathUtils.lerp(y1, y2, rPos);
      const rz = THREE.MathUtils.lerp(z1, z2, rPos);

      const mat = (r % 2 === 0) ? matNitrogen : matCarbon;
      const meshAtom = new THREE.Mesh(sphereGeo, mat);
      meshAtom.position.set(rx, ry, rz);
      meshAtom.scale.setScalar(1.1);
      dnaGroup.add(meshAtom);
      atomMeshes.push(meshAtom);
      defaultPositions.push(new THREE.Vector3(rx, ry, rz));

      componentData[atomMeshes.length - 1] = baseData;
    }

    // Chemical Bond Stick Mesh
    const bondMesh = new THREE.Mesh(cylinderGeo, matBond);
    const start = new THREE.Vector3(x, y1, z1);
    const end = new THREE.Vector3(x, y2, z2);
    const dist = start.distanceTo(end);

    bondMesh.position.copy(start.clone().add(end).multiplyScalar(0.5));
    bondMesh.scale.set(0.3, dist, 0.3);
    bondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(start).normalize());
    dnaGroup.add(bondMesh);
  }

  for (let i = 0; i < atomMeshes.length; i++) {
    targetPositions.push(defaultPositions[i].clone());
  }

  if (particleVal) particleVal.textContent = atomMeshes.length.toLocaleString() + " CPK ATOMS";

  // Selection Ring Mesh Attached Directly inside dnaGroup (100% Locked Target Position!)
  const selectRingGeometry = new THREE.TorusGeometry(2.8, 0.35, 16, 32);
  const selectRingMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0055, wireframe: true });
  const selectRingMesh = new THREE.Mesh(selectRingGeometry, selectRingMaterial);
  selectRingMesh.visible = false;
  dnaGroup.add(selectRingMesh);

  // Levitating Shockwave Particle System for Chemical Fusion
  const shockwaveGeo = new THREE.BufferGeometry();
  const shockwaveCount = 1200;
  const shockwavePos = new Float32Array(shockwaveCount * 3);
  for (let s = 0; s < shockwaveCount * 3; s++) shockwavePos[s] = (Math.random() - 0.5) * 80;
  shockwaveGeo.setAttribute('position', new THREE.BufferAttribute(shockwavePos, 3));
  const shockwaveMat = new THREE.PointsMaterial({ color: 0x00FF9D, size: 1.2, transparent: true, opacity: 0.0 });
  const shockwavePoints = new THREE.Points(shockwaveGeo, shockwaveMat);
  scene.add(shockwavePoints);

  // Periodic Table Element Selection & Live Chemical Synthesis Morphing
  function morphToStructure(type) {
    selectRingMesh.visible = false;

    if (type === 'H') {
      for (let i = 0; i < atomMeshes.length; i++) {
        const rad = 8.0 + (i % 10) * 2.0;
        const a = (i / atomMeshes.length) * Math.PI * 12.0;
        targetPositions[i].set(Math.cos(a) * rad, Math.sin(a) * rad, (i / atomMeshes.length - 0.5) * 30.0);
      }
      updateTelemetry("Hydrogen Gas (H2)", "H2", "Diatomic Hydrogen Gas", "Single Covalent Bond (H-H)", "Monatomic / Diatomic State");
    } else if (type === 'C') {
      for (let i = 0; i < atomMeshes.length; i++) {
        const phi = Math.acos(-1 + (2 * i) / atomMeshes.length);
        const theta = Math.sqrt(atomMeshes.length * Math.PI) * phi;
        targetPositions[i].setFromSphericalCoords(18.0, phi, theta);
      }
      updateTelemetry("Carbon Diamond Lattice (C)", "C60 / Diamond", "Fullerene / Diamond Allotrope", "Tetrahedral Sp3 Covalent Network", "Solid Carbon Crystal");
    } else if (type === 'H2O') {
      for (let i = 0; i < atomMeshes.length; i++) {
        const clusterIdx = Math.floor(i / 3);
        const subIdx = i % 3;
        const cx = (clusterIdx % 10 - 5) * 12.0;
        const cy = (Math.floor(clusterIdx / 10) - 3) * 12.0;
        
        if (subIdx === 0) targetPositions[i].set(cx, cy, 0); // Oxygen
        else if (subIdx === 1) targetPositions[i].set(cx - 3.5, cy + 3.0, 0); // Hydrogen 1 (104.5 deg)
        else targetPositions[i].set(cx + 3.5, cy + 3.0, 0); // Hydrogen 2
      }
      updateTelemetry("Water Molecule (H2O)", "H2O", "Polar Covalent Molecule", "Polar Bent Geometry (104.5°)", "Liquid Phase Equilibrium");
    } else if (type === 'CO2') {
      for (let i = 0; i < atomMeshes.length; i++) {
        const clusterIdx = Math.floor(i / 3);
        const subIdx = i % 3;
        const cx = (clusterIdx % 10 - 5) * 14.0;
        const cy = (Math.floor(clusterIdx / 10) - 3) * 10.0;
        
        if (subIdx === 0) targetPositions[i].set(cx, cy, 0); // Carbon Center
        else if (subIdx === 1) targetPositions[i].set(cx - 5.0, cy, 0); // Oxygen 1
        else targetPositions[i].set(cx + 5.0, cy, 0); // Oxygen 2
      }
      updateTelemetry("Carbon Dioxide (CO2)", "CO2", "Linear Covalent Gas", "Double Bonds (O=C=O)", "Gaseous Phase");
    } else if (type === 'NaCl') {
      for (let i = 0; i < atomMeshes.length; i++) {
        const ix = (i % 6) * 6.0 - 15.0;
        const iy = (Math.floor(i / 6) % 6) * 6.0 - 15.0;
        const iz = Math.floor(i / 36) * 6.0 - 15.0;
        targetPositions[i].set(ix, iy, iz);
      }
      updateTelemetry("Sodium Chloride Crystal (NaCl)", "NaCl", "Ionic Salt Lattice", "Ionic Bond Network (Na+ Cl-)", "Crystalline Solid");
    } else { // Reset to DNA Example
      for (let i = 0; i < atomMeshes.length; i++) {
        targetPositions[i].copy(defaultPositions[i]);
      }
      updateTelemetry("B-DNA Double Helix (Example)", "P70 O140 N350 C350", "Genetic Macromolecule", "Phosphodiester & Hydrogen Bonds", "Levitating Fluid Equilibrium");
    }

    // Trigger Levitating Fusion Shockwave
    shockwaveMat.opacity = 1.0;
  }

  function updateTelemetry(name, formula, type, bonds, epi) {
    if (hudName) hudName.textContent = name;
    if (hudFormula) hudFormula.textContent = formula;
    if (hudClass) hudClass.textContent = type;
    if (hudBonds) hudBonds.textContent = bonds;
    if (hudEpi) hudEpi.textContent = epi;
  }

  // Bind Periodic Table Cells
  document.querySelectorAll('.pt-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const sym = cell.getAttribute('data-symbol');
      morphToStructure(sym);
    });
  });

  const btnFuseH2O = document.getElementById('btn-fuse-h2o');
  if (btnFuseH2O) btnFuseH2O.addEventListener('click', () => morphToStructure('H2O'));

  const btnFuseNaCl = document.getElementById('btn-fuse-nacl');
  if (btnFuseNaCl) btnFuseNaCl.addEventListener('click', () => morphToStructure('NaCl'));

  if (btnReassemble) btnReassemble.addEventListener('click', () => morphToStructure('DNA'));

  // Mouse Raycasting & Orbit Controls
  const raycaster = new THREE.Raycaster();
  const mouseScreen = new THREE.Vector2();

  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  let hoveredAtom = null;
  let selectedAtom = null;

  window.addEventListener('mousemove', (e) => {
    mouseScreen.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseScreen.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseScreen, camera);
    const intersects = raycaster.intersectObjects(atomMeshes);

    if (intersects.length > 0) {
      if (hoveredAtom && hoveredAtom !== intersects[0].object && hoveredAtom !== selectedAtom) {
        hoveredAtom.scale.setScalar(1.0);
      }
      hoveredAtom = intersects[0].object;
      if (hoveredAtom !== selectedAtom) hoveredAtom.scale.setScalar(1.6);
      document.body.style.cursor = 'pointer';
    } else {
      if (hoveredAtom && hoveredAtom !== selectedAtom) hoveredAtom.scale.setScalar(1.0);
      hoveredAtom = null;
      document.body.style.cursor = 'default';
    }

    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.006;
      targetRotationX += deltaY * 0.006;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });

  window.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  // Direct 3D Raycast Atom Selection (100% Position Lock inside dnaGroup)
  window.addEventListener('click', (e) => {
    if (e.target !== canvas) return;

    raycaster.setFromCamera(mouseScreen, camera);
    const intersects = raycaster.intersectObjects(atomMeshes);

    if (intersects.length > 0) {
      if (selectedAtom) selectedAtom.scale.setScalar(1.0);

      selectedAtom = intersects[0].object;
      const idx = atomMeshes.indexOf(selectedAtom);
      const data = componentData[idx] || { name: "Phosphate-Deoxyribose Backbone Node", formula: "PO4 (3-) / C5 H10 O4", type: "Structural Backbone Monomer", bonds: "Phosphodiester Bond", epi: "Structural Scaffold" };

      selectRingMesh.position.copy(selectedAtom.position);
      selectRingMesh.visible = true;

      selectedAtom.scale.setScalar(2.4);

      if (hudPanel) hudPanel.style.display = 'block';
      updateTelemetry(data.name, data.formula, data.type, data.bonds, data.epi);
    }
  });

  window.addEventListener('wheel', (e) => {
    camera.position.z += e.deltaY * 0.04;
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, 25, 130);
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Render Loop (Smooth Levitating Morph Animation)
  let frameCount = 0;
  let lastTime = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);

    frameCount++;
    if (now - lastTime >= 1000) {
      if (fpsVal) fpsVal.textContent = frameCount + ' FPS';
      frameCount = 0;
      lastTime = now;
    }

    const t = now * 0.001;
    pointLight.position.x = Math.sin(t) * 40.0;

    // Smooth Levitating Atomic Morphing (Lerp)
    for (let i = 0; i < atomMeshes.length; i++) {
      atomMeshes[i].position.lerp(targetPositions[i], 0.05);
    }

    // Shockwave Fading
    if (shockwaveMat.opacity > 0.01) {
      shockwaveMat.opacity -= 0.02;
      shockwavePoints.rotation.y += 0.02;
    }

    if (selectRingMesh.visible) {
      selectRingMesh.rotation.x = t * 3.0;
      selectRingMesh.rotation.y = t * 3.5;
    }

    currentRotationX += (targetRotationX - currentRotationX) * 0.08;
    currentRotationY += (targetRotationY - currentRotationY) * 0.08;

    dnaGroup.rotation.x = currentRotationX;
    dnaGroup.rotation.y = currentRotationY + t * 0.3;

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
