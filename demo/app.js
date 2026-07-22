// ETHERNIUM / NULLA-LABS AAA 3D INTERACTIVE B-DNA SHADER ENGINE v15.0
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');
  const particleVal = document.getElementById('particle-val');
  const cycleVal = document.getElementById('cycle-val');

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

  // 120,000 High-Precision GPU Particles
  const PARTICLE_COUNT = 120000;
  if (particleVal) particleVal.textContent = PARTICLE_COUNT.toLocaleString();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const targetDNA = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);

  // Anatomically Precise B-DNA Parameters
  const MAJOR_GROOVE_OFFSET = 0.38 * Math.PI; // 140 degree minor groove
  const HELIX_RADIUS = 18.0; // Wider, AAA majestic strand width
  const TURNS = 6.0;

  // Nucleotide AAA High-Contrast Palette
  const colAdenine = new THREE.Color(0x00F0FF);  // Cyan (A)
  const colThymine = new THREE.Color(0x8A2BE2);  // Electric Violet (T)
  const colCytosine = new THREE.Color(0x00FF9D); // Emerald Green (C)
  const colGuanine = new THREE.Color(0xFFD700);  // Bright Gold (G)
  const colPhosphate = new THREE.Color(0xFFFFFF); // Crisp White

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    const progress = i / PARTICLE_COUNT;
    const x = (progress - 0.5) * 110.0; // Spans X = -55 to +55

    const angle1 = progress * TURNS * Math.PI * 2.0;
    const angle2 = angle1 + Math.PI + MAJOR_GROOVE_OFFSET;

    let targetX, targetY, targetZ;
    let particleColor = new THREE.Color();

    const isBackbone = (i % 5 < 3);

    if (isBackbone) {
      // Crisp Phosphate-Sugar Backbone Strands
      const isStrand1 = (i % 2 === 0);
      const angle = isStrand1 ? angle1 : angle2;

      targetX = x + (Math.random() - 0.5) * 0.4;
      targetY = Math.sin(angle) * HELIX_RADIUS + (Math.random() - 0.5) * 0.4;
      targetZ = Math.cos(angle) * HELIX_RADIUS + (Math.random() - 0.5) * 0.4;

      particleColor.copy(colPhosphate);
    } else {
      // Hydrogen-Bonded Base Pair Rung Bridges
      const rungProgress = Math.random();
      const y1 = Math.sin(angle1) * HELIX_RADIUS;
      const z1 = Math.cos(angle1) * HELIX_RADIUS;

      const y2 = Math.sin(angle2) * HELIX_RADIUS;
      const z2 = Math.cos(angle2) * HELIX_RADIUS;

      targetX = x + (Math.random() - 0.5) * 0.3;
      targetY = THREE.MathUtils.lerp(y1, y2, rungProgress) + (Math.random() - 0.5) * 0.3;
      targetZ = THREE.MathUtils.lerp(z1, z2, rungProgress) + (Math.random() - 0.5) * 0.3;

      const basePairType = Math.floor(progress * 150) % 4;
      if (basePairType === 0) particleColor.copy(colAdenine);
      else if (basePairType === 1) particleColor.copy(colThymine);
      else if (basePairType === 2) particleColor.copy(colCytosine);
      else particleColor.copy(colGuanine);
    }

    targetDNA[i3] = targetX;
    targetDNA[i3 + 1] = targetY;
    targetDNA[i3 + 2] = targetZ;

    positions[i3] = targetX;
    positions[i3 + 1] = targetY;
    positions[i3 + 2] = targetZ;

    colors[i3] = particleColor.r;
    colors[i3 + 1] = particleColor.g;
    colors[i3 + 2] = particleColor.b;

    scales[i] = 1.2 + Math.random() * 2.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  // AAA Crisp Shader (Zero Blur, Sharp Point Definition)
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

    void main() {
      vColor = aColor;
      vec3 p = position;

      vec3 mouseDelta = p - uMouse;
      float distToMouse = length(mouseDelta);
      if (distToMouse < 20.0) {
        float force = (20.0 - distToMouse) / 20.0;
        p += normalize(mouseDelta) * force * 8.0;
      }

      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = aScale * (420.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec3 vColor;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // AAA Sharp Edge Definition (Crisp Non-Blurry Circles)
      float edge = smoothstep(0.48, 0.42, dist);
      float core = smoothstep(0.20, 0.0, dist);

      vec3 finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), core * 0.75);

      gl_FragColor = vec4(finalColor, edge * 0.95);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
    transparent: true,
    depthWrite: true,
    blending: THREE.NormalBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // Full 3D Mouse Drag Orbiting Controls
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;

  window.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.006;
      targetRotationX += deltaY * 0.006;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  window.addEventListener('wheel', (e) => {
    camera.position.z += e.deltaY * 0.04;
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, 25, 130);
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Render Animation Loop
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

    // Smooth Orbit Inertia
    currentRotationX += (targetRotationX - currentRotationX) * 0.08;
    currentRotationY += (targetRotationY - currentRotationY) * 0.08;

    particleSystem.rotation.x = currentRotationX;
    particleSystem.rotation.y = currentRotationY + t * 0.4;

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
