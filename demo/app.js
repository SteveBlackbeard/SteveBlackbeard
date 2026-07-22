// NULLA-LABS ULTIMATE MULTIDISCIPLINARY WEBGL 3D ENGINE v20.0
// Disciplines: Genetics, Molecular Biology, Precision Medicine, Control Theory & VFX
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');
  const particleVal = document.getElementById('particle-val');
  const cycleVal = document.getElementById('cycle-val');

  // HUD Elements
  const hudPanel = document.getElementById('molecular-hud');
  const hudName = document.getElementById('hud-name');
  const hudFormula = document.getElementById('hud-formula');
  const hudClass = document.getElementById('hud-class');
  const hudBonds = document.getElementById('hud-bonds');
  const hudEpi = document.getElementById('hud-epi');
  const btnReassemble = document.getElementById('btn-reassemble');

  // Mode Buttons
  const btnModeBDNA = document.getElementById('btn-mode-bdna');
  const btnModeChromatin = document.getElementById('btn-mode-chromatin');
  const btnModeUnzip = document.getElementById('btn-mode-unzip');
  const btnModeClinvar = document.getElementById('btn-mode-clinvar');

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020306, 0.005);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 70);

  const PARTICLE_COUNT = 120000;
  if (particleVal) particleVal.textContent = PARTICLE_COUNT.toLocaleString();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const targetDNA = new Float32Array(PARTICLE_COUNT * 3);
  const targetChromatin = new Float32Array(PARTICLE_COUNT * 3);
  const targetUnzipped = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);

  const MAJOR_GROOVE_OFFSET = 0.38 * Math.PI;
  const HELIX_RADIUS = 18.0;
  const TURNS = 6.0;

  // Multi-Spectral Palette
  const colAdenine = new THREE.Color(0x00F0FF);   // Cyan (A)
  const colThymine = new THREE.Color(0x8A2BE2);   // Electric Violet (T)
  const colCytosine = new THREE.Color(0x00FF9D);  // Emerald (C)
  const colGuanine = new THREE.Color(0xFFD700);   // Gold (G)
  const colBackbone1 = new THREE.Color(0x00D4FF);
  const colBackbone2 = new THREE.Color(0xBF00FF);
  const colPathogenic = new THREE.Color(0xFF0055); // ClinVar Pathogenic Red

  const componentData = [];

  // ClinVar Pathogenic Variant Locus Hotspots
  const clinvarHotspots = [
    { index: 12000, rsid: "rs121913527", gene: "TP53 (p.R273H)", Significance: "PATHOGENIC / HARD POSITIVE", disease: "Li-Fraumeni Syndrome" },
    { index: 35000, rsid: "rs334", gene: "HBB (p.E6V)", Significance: "PATHOGENIC BENCHMARK", disease: "Sickle Cell Anemia" },
    { index: 68000, rsid: "rs113993960", gene: "CFTR (p.F508del)", Significance: "PATHOGENIC CLINVAR", disease: "Cystic Fibrosis" }
  ];

  // 3D Histone Core Octamers (Genetics Discipline)
  const histoneGroup = new THREE.Group();
  const histoneCenters = [-35.0, 0.0, 35.0];
  histoneCenters.forEach(hx => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(7.5, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xFF7700,
        roughness: 0.3,
        metalness: 0.8,
        emissive: 0x551100,
        wireframe: false
      })
    );
    mesh.position.set(hx, 0, 0);
    histoneGroup.add(mesh);
  });
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.6);
  const pointLight = new THREE.PointLight(0x00F0FF, 2, 100);
  pointLight.position.set(0, 20, 30);
  scene.add(histoneGroup);
  scene.add(ambientLight);
  scene.add(pointLight);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    const progress = i / PARTICLE_COUNT;
    const x = (progress - 0.5) * 110.0;

    const angle1 = progress * TURNS * Math.PI * 2.0;
    const angle2 = angle1 + Math.PI + MAJOR_GROOVE_OFFSET;

    const isBackbone = (i % 5 < 3);
    const isStrand1 = (i % 2 === 0);

    // 1. Target B-DNA Positions
    let bX = x;
    let bY = Math.sin(isStrand1 ? angle1 : angle2) * HELIX_RADIUS;
    let bZ = Math.cos(isStrand1 ? angle1 : angle2) * HELIX_RADIUS;

    // 2. Target Chromatin Nucleosome Positions (Supercoiled 1.65 turns around Histones)
    const histoneIdx = Math.floor(progress * 3);
    const hx = histoneCenters[Math.min(histoneIdx, 2)];
    const wrapAngle = (progress * 15.0) * Math.PI * 2.0;
    let cX = hx + Math.cos(wrapAngle) * 12.0;
    let cY = Math.sin(wrapAngle) * 12.0;
    let cZ = (progress - 0.5) * 15.0;

    // 3. Target Unzipped Positions (Replication Fork)
    const sep = isStrand1 ? 26.0 : -26.0;
    let uX = bX;
    let uY = bY + sep;
    let uZ = bZ * 0.5;

    let particleColor = new THREE.Color();

    // Check if ClinVar Hotspot
    const isHotspot = clinvarHotspots.find(h => Math.abs(h.index - i) < 150);

    if (isHotspot) {
      particleColor.copy(colPathogenic);
      componentData[i] = {
        name: `ClinVar Hotspot (${isHotspot.rsid})`,
        formula: isHotspot.gene,
        type: isHotspot.Significance,
        bonds: "Pathogenic Variant Locus",
        epi: `Associated Condition: ${isHotspot.disease}`
      };
    } else if (isBackbone) {
      particleColor.copy(isStrand1 ? colBackbone1 : colBackbone2);
    } else {
      const basePairType = Math.floor(progress * 150) % 4;
      if (basePairType === 0) {
        particleColor.copy(colAdenine);
        componentData[i] = { name: "Adenine (A)", formula: "C5 H5 N5", type: "Purine (Double Ring)", bonds: "2 Hydrogen Bonds with Thymine", epi: "Non-Methylated Locus" };
      } else if (basePairType === 1) {
        particleColor.copy(colThymine);
        componentData[i] = { name: "Thymine (T)", formula: "C5 H6 N2 O2", type: "Pyrimidine (Single Ring)", bonds: "2 Hydrogen Bonds with Adenine", epi: "Non-Methylated Locus" };
      } else if (basePairType === 2) {
        particleColor.copy(colCytosine);
        componentData[i] = { name: "Cytosine (C)", formula: "C4 H5 N3 O", type: "Pyrimidine (Single Ring)", bonds: "3 Hydrogen Bonds with Guanine", epi: "5mC Epigenetic Methylation Tag" };
      } else {
        particleColor.copy(colGuanine);
        componentData[i] = { name: "Guanine (G)", formula: "C5 H5 N5 O", type: "Purine (Double Ring)", bonds: "3 Hydrogen Bonds with Cytosine", epi: "CpG Island Active" };
      }
    }

    targetDNA[i3] = bX;
    targetDNA[i3 + 1] = bY;
    targetDNA[i3 + 2] = bZ;

    targetChromatin[i3] = cX;
    targetChromatin[i3 + 1] = cY;
    targetChromatin[i3 + 2] = cZ;

    targetUnzipped[i3] = uX;
    targetUnzipped[i3 + 1] = uY;
    targetUnzipped[i3 + 2] = uZ;

    positions[i3] = bX;
    positions[i3 + 1] = bY;
    positions[i3 + 2] = bZ;

    colors[i3] = particleColor.r;
    colors[i3 + 1] = particleColor.g;
    colors[i3 + 2] = particleColor.b;

    scales[i] = isHotspot ? 4.5 : (1.3 + Math.random() * 2.2);
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  // Multi-Spectral GPU Shader
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) }
  };

  const vertexShader = `
    uniform float uTime;
    uniform vec3 uMouse;
    attribute vec3 aColor;
    attribute float aScale;

    varying vec3 vColor;
    varying float vGlow;

    void main() {
      vColor = aColor;
      vec3 p = position;

      vec3 mouseDelta = p - uMouse;
      float distToMouse = length(mouseDelta);
      if (distToMouse < 24.0) {
        float force = (24.0 - distToMouse) / 24.0;
        p += normalize(mouseDelta) * force * 10.0;
      }

      vGlow = smoothstep(24.0, 0.0, distToMouse);

      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = (aScale + vGlow * 2.5) * (440.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec3 vColor;
    varying float vGlow;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      float edge = smoothstep(0.48, 0.40, dist);
      float core = smoothstep(0.18, 0.0, dist);

      vec3 glowColor = vColor * 1.4;
      vec3 finalColor = mix(vColor, glowColor, core);
      finalColor += vColor * vGlow * 0.45;

      gl_FragColor = vec4(finalColor, edge * 0.95);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // Mouse Raycasting & Orbit
  const raycaster = new THREE.Raycaster();
  const mouseScreen = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mouse3D = new THREE.Vector3();

  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;

  // Multidisciplinary Mode State: 0 = B-DNA, 1 = Chromatin, 2 = Unzipped, 3 = ClinVar
  let currentMode = 0;
  let modeMorphProgress = [1.0, 0.0, 0.0, 0.0];
  let modeTargetProgress = [1.0, 0.0, 0.0, 0.0];

  function setMode(modeIdx) {
    currentMode = modeIdx;
    modeTargetProgress = [0.0, 0.0, 0.0, 0.0];
    modeTargetProgress[modeIdx] = 1.0;

    histoneGroup.visible = (modeIdx === 1);

    const modeNames = ['HUMAN_B_DNA_HELIX', 'CHROMATIN_NUCLEOSOMES_3D', 'UNZIPPED_REPLICATION_FORK', 'CLINVAR_GENOMIC_MEDICINE'];
    if (cycleVal) cycleVal.textContent = modeNames[modeIdx];
  }

  if (btnModeBDNA) btnModeBDNA.addEventListener('click', () => setMode(0));
  if (btnModeChromatin) btnModeChromatin.addEventListener('click', () => setMode(1));
  if (btnModeUnzip) btnModeUnzip.addEventListener('click', () => setMode(2));
  if (btnModeClinvar) btnModeClinvar.addEventListener('click', () => setMode(3));

  window.addEventListener('mousemove', (e) => {
    mouseScreen.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseScreen.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseScreen, camera);
    raycaster.ray.intersectPlane(plane, mouse3D);
    uniforms.uMouse.value.copy(mouse3D);

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

  // Raycast Component & ClinVar Variant Selection
  window.addEventListener('click', (e) => {
    if (e.target !== canvas) return;

    raycaster.setFromCamera(mouseScreen, camera);
    const intersects = raycaster.intersectObject(particleSystem);

    if (intersects.length > 0) {
      const particleIdx = intersects[0].index;
      const data = componentData[particleIdx];

      if (data) {
        if (hudPanel) hudPanel.style.display = 'block';
        if (hudName) hudName.textContent = data.name;
        if (hudFormula) hudFormula.textContent = data.formula;
        if (hudClass) hudClass.textContent = data.type;
        if (hudBonds) hudBonds.textContent = data.bonds;
        if (hudEpi) hudEpi.textContent = data.epi;
      }
    }
  });

  if (btnReassemble) {
    btnReassemble.addEventListener('click', () => {
      setMode(0);
      if (hudPanel) hudPanel.style.display = 'none';
    });
  }

  window.addEventListener('wheel', (e) => {
    camera.position.z += e.deltaY * 0.04;
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, 25, 130);
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Render Loop
  const posAttr = geometry.attributes.position;
  const posArray = posAttr.array;

  let frameCount = 0;
  let lastTime = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);

    const dt = Math.min((now - lastTime) * 0.001, 0.05);

    frameCount++;
    if (now - lastTime >= 1000) {
      if (fpsVal) fpsVal.textContent = frameCount + ' FPS';
      frameCount = 0;
      lastTime = now;
    }

    const t = now * 0.001;
    uniforms.uTime.value = t;

    // Smooth Multi-Mode Morphing Matrix
    for (let k = 0; k < 4; k++) {
      modeMorphProgress[k] += (modeTargetProgress[k] - modeMorphProgress[k]) * 0.06;
    }

    const pBDNA = modeMorphProgress[0];
    const pChr = modeMorphProgress[1];
    const pUnz = modeMorphProgress[2];
    const pClin = modeMorphProgress[3];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const bx = targetDNA[i3];
      const by = targetDNA[i3 + 1];
      const bz = targetDNA[i3 + 2];

      const cx = targetChromatin[i3];
      const cy = targetChromatin[i3 + 1];
      const cz = targetChromatin[i3 + 2];

      const ux = targetUnzipped[i3];
      const uy = targetUnzipped[i3 + 1];
      const uz = targetUnzipped[i3 + 2];

      const isHotspot = clinvarHotspots.find(h => Math.abs(h.index - i) < 150);

      let px = bx * pBDNA + cx * pChr + ux * pUnz + (isHotspot ? bx * 1.2 : bx) * pClin;
      let py = by * pBDNA + cy * pChr + uy * pUnz + (isHotspot ? by * 1.2 : by) * pClin;
      let pz = bz * pBDNA + cz * pChr + uz * pUnz + (isHotspot ? bz * 1.2 : bz) * pClin;

      posArray[i3] = px;
      posArray[i3 + 1] = py;
      posArray[i3 + 2] = pz;
    }

    posAttr.needsUpdate = true;

    // Orbiting Rotations
    currentRotationX += (targetRotationX - currentRotationX) * 0.08;
    currentRotationY += (targetRotationY - currentRotationY) * 0.08;

    particleSystem.rotation.x = currentRotationX;
    particleSystem.rotation.y = currentRotationY + (currentMode === 2 ? 0 : t * 0.35);

    if (histoneGroup.visible) {
      histoneGroup.rotation.y = t * 0.2;
    }

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
