// ETHERNIUM / NULLA-LABS AAA 3D UNZIPPING & MOLECULAR COMPONENT ENGINE v18.0
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');
  const particleVal = document.getElementById('particle-val');
  const cycleVal = document.getElementById('cycle-val');

  // HUD Component Breakdown Elements
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

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020306, 0.005);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 65);

  const PARTICLE_COUNT = 120000;
  if (particleVal) particleVal.textContent = PARTICLE_COUNT.toLocaleString();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const targetDNA = new Float32Array(PARTICLE_COUNT * 3);
  const unzippedPositions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);

  // Anatomically Precise B-DNA Parameters
  const MAJOR_GROOVE_OFFSET = 0.38 * Math.PI;
  const HELIX_RADIUS = 18.0;
  const TURNS = 6.0;

  // Multi-Spectral Color Glow Palette (No plain white!)
  const colAdenine = new THREE.Color(0x00F0FF);  // Cyan (A)
  const colThymine = new THREE.Color(0x8A2BE2);  // Electric Violet (T)
  const colCytosine = new THREE.Color(0x00FF9D); // Emerald (C)
  const colGuanine = new THREE.Color(0xFFD700);  // Gold (G)
  const colBackbone1 = new THREE.Color(0x00D4FF); // Neon Cyan Backbone
  const colBackbone2 = new THREE.Color(0xBF00FF); // Neon Violet Backbone

  const componentData = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    const progress = i / PARTICLE_COUNT;
    const x = (progress - 0.5) * 110.0;

    const angle1 = progress * TURNS * Math.PI * 2.0;
    const angle2 = angle1 + Math.PI + MAJOR_GROOVE_OFFSET;

    let targetX, targetY, targetZ;
    let unzippedX, unzippedY, unzippedZ;
    let particleColor = new THREE.Color();

    const isBackbone = (i % 5 < 3);
    const isStrand1 = (i % 2 === 0);

    if (isBackbone) {
      const angle = isStrand1 ? angle1 : angle2;

      targetX = x + (Math.random() - 0.5) * 0.4;
      targetY = Math.sin(angle) * HELIX_RADIUS + (Math.random() - 0.5) * 0.4;
      targetZ = Math.cos(angle) * HELIX_RADIUS + (Math.random() - 0.5) * 0.4;

      // Unzipped Position (Replication Fork separation)
      const separation = isStrand1 ? 28.0 : -28.0;
      unzippedX = targetX;
      unzippedY = targetY + separation;
      unzippedZ = targetZ * 0.5;

      particleColor.copy(isStrand1 ? colBackbone1 : colBackbone2);
    } else {
      const rungProgress = Math.random();
      const y1 = Math.sin(angle1) * HELIX_RADIUS;
      const z1 = Math.cos(angle1) * HELIX_RADIUS;

      const y2 = Math.sin(angle2) * HELIX_RADIUS;
      const z2 = Math.cos(angle2) * HELIX_RADIUS;

      targetX = x + (Math.random() - 0.5) * 0.3;
      targetY = THREE.MathUtils.lerp(y1, y2, rungProgress) + (Math.random() - 0.5) * 0.3;
      targetZ = THREE.MathUtils.lerp(z1, z2, rungProgress) + (Math.random() - 0.5) * 0.3;

      const basePairType = Math.floor(progress * 150) % 4;
      if (basePairType === 0) {
        particleColor.copy(colAdenine);
        componentData[i] = { name: "Adenine (A)", formula: "C5 H5 N5", type: "Purine (Double Heterocyclic Ring)", bonds: "2 Hydrogen Bonds with Thymine", epi: "Non-Methylated Locus" };
      } else if (basePairType === 1) {
        particleColor.copy(colThymine);
        componentData[i] = { name: "Thymine (T)", formula: "C5 H6 N2 O2", type: "Pyrimidine (Single Ring)", bonds: "2 Hydrogen Bonds with Adenine", epi: "Non-Methylated Locus" };
      } else if (basePairType === 2) {
        particleColor.copy(colCytosine);
        componentData[i] = { name: "Cytosine (C)", formula: "C4 H5 N3 O", type: "Pyrimidine (Single Ring)", bonds: "3 Hydrogen Bonds with Guanine", epi: "5mC Epigenetic Methylation Tag" };
      } else {
        particleColor.copy(colGuanine);
        componentData[i] = { name: "Guanine (G)", formula: "C5 H5 N5 O", type: "Purine (Double Heterocyclic Ring)", bonds: "3 Hydrogen Bonds with Cytosine", epi: "CpG Island Active" };
      }

      // Unzipped Exploded Base Pair Position
      const side = (rungProgress < 0.5) ? 22.0 : -22.0;
      unzippedX = targetX + (Math.random() - 0.5) * 8.0;
      unzippedY = targetY + side + (Math.random() - 0.5) * 12.0;
      unzippedZ = targetZ + (Math.random() - 0.5) * 10.0;
    }

    targetDNA[i3] = targetX;
    targetDNA[i3 + 1] = targetY;
    targetDNA[i3 + 2] = targetZ;

    unzippedPositions[i3] = unzippedX;
    unzippedPositions[i3 + 1] = unzippedY;
    unzippedPositions[i3 + 2] = unzippedZ;

    positions[i3] = targetX;
    positions[i3 + 1] = targetY;
    positions[i3 + 2] = targetZ;

    colors[i3] = particleColor.r;
    colors[i3 + 1] = particleColor.g;
    colors[i3 + 2] = particleColor.b;

    scales[i] = 1.3 + Math.random() * 2.4;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  // Multi-Spectral Color Glow Shader (No plain white core)
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uUnzipProgress: { value: 0.0 }
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

      // Restored Cursor Physics Repulsion Force
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

      // Multi-Spectral Color Glow (No Plain White Core)
      float edge = smoothstep(0.48, 0.40, dist);
      float core = smoothstep(0.18, 0.0, dist);

      vec3 glowColor = vColor * 1.35;
      vec3 finalColor = mix(vColor, glowColor, core);
      finalColor += vColor * vGlow * 0.4;

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

  // Mouse Raycasting & Plane Drag Orbiting
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
  let isUnzipped = false;
  let unzipTargetProgress = 0.0;
  let unzipCurrentProgress = 0.0;

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

  // Click Raycasting for Component Selection & Kinetic Unzipping
  window.addEventListener('click', (e) => {
    if (e.target !== canvas) return;

    raycaster.setFromCamera(mouseScreen, camera);
    const intersects = raycaster.intersectObject(particleSystem);

    if (intersects.length > 0) {
      const particleIdx = intersects[0].index;
      const data = componentData[particleIdx];

      if (data) {
        isUnzipped = true;
        unzipTargetProgress = 1.0;

        if (hudPanel) hudPanel.style.display = 'block';
        if (hudName) hudName.textContent = data.name;
        if (hudFormula) hudFormula.textContent = data.formula;
        if (hudClass) hudClass.textContent = data.type;
        if (hudBonds) hudBonds.textContent = data.bonds;
        if (hudEpi) hudEpi.textContent = data.epi;
        if (cycleVal) cycleVal.textContent = 'UNZIPPED_COMPONENT_INSPECTION';
      }
    }
  });

  if (btnReassemble) {
    btnReassemble.addEventListener('click', () => {
      isUnzipped = false;
      unzipTargetProgress = 0.0;
      if (hudPanel) hudPanel.style.display = 'none';
      if (cycleVal) cycleVal.textContent = 'HUMAN_B_DNA_HELIX';
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

  // Render Physics Loop
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

    // Smooth Kinetic Unzipping Morph Transition
    unzipCurrentProgress += (unzipTargetProgress - unzipCurrentProgress) * 0.06;
    uniforms.uUnzipProgress.value = unzipCurrentProgress;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const tx = targetDNA[i3];
      const ty = targetDNA[i3 + 1];
      const tz = targetDNA[i3 + 2];

      const ux = unzippedPositions[i3];
      const uy = unzippedPositions[i3 + 1];
      const uz = unzippedPositions[i3 + 2];

      // Interpolate between Helix and Unzipped Exploded View
      const curX = THREE.MathUtils.lerp(tx, ux, unzipCurrentProgress);
      const curY = THREE.MathUtils.lerp(ty, uy, unzipCurrentProgress);
      const curZ = THREE.MathUtils.lerp(tz, uz, unzipCurrentProgress);

      posArray[i3] = curX;
      posArray[i3 + 1] = curY;
      posArray[i3 + 2] = curZ;
    }

    posAttr.needsUpdate = true;

    // Orbit Rotations
    currentRotationX += (targetRotationX - currentRotationX) * 0.08;
    currentRotationY += (targetRotationY - currentRotationY) * 0.08;

    particleSystem.rotation.x = currentRotationX;
    particleSystem.rotation.y = currentRotationY + (isUnzipped ? 0 : t * 0.35);

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
