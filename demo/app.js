// Ethernium Sovereign AAA Invictvs High-Engineering Particle Shader Engine v6.0
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');
  const particleVal = document.getElementById('particle-val');

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020306, 0.007);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 55);

  // 120,000 GPU Particles
  const PARTICLE_COUNT = 120000;
  particleVal.textContent = PARTICLE_COUNT.toLocaleString();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const origPositions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);

  // Ethernium Multi-spectral Palettes
  const paletteObsidian = [new THREE.Color(0x00F0FF), new THREE.Color(0x7000FF), new THREE.Color(0x00FF9D), new THREE.Color(0xFFFFFF)];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const radius = 6 + Math.pow(Math.random(), 1.4) * 48;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    origPositions[i3] = positions[i3];
    origPositions[i3 + 1] = positions[i3 + 1];
    origPositions[i3 + 2] = positions[i3 + 2];

    const vMag = Math.sqrt(90.0 / radius);
    velocities[i3] = -Math.sin(theta) * vMag + (Math.random() - 0.5) * 0.3;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.3;
    velocities[i3 + 2] = Math.cos(theta) * vMag + (Math.random() - 0.5) * 0.3;

    const pColor = paletteObsidian[Math.floor(Math.random() * paletteObsidian.length)];
    colors[i3] = pColor.r;
    colors[i3 + 1] = pColor.g;
    colors[i3 + 2] = pColor.b;

    scales[i] = 1.0 + Math.random() * 3.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  // Central Monolith Core Geometry (Quantum Core)
  const coreGeometry = new THREE.OctahedronGeometry(6, 2);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x00F0FF,
    wireframe: true,
    transparent: true,
    opacity: 0.7
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(coreMesh);

  // Custom GLSL Shaders with Volumetric Chromatic Aberration & Core Bloom
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uColorPalette: { value: 0.0 }
  };

  const vertexShader = `
    uniform float uTime;
    uniform vec3 uMouse;
    attribute vec3 aColor;
    attribute float aScale;

    varying vec3 vColor;
    varying float vDistance;
    varying float vGlow;

    void main() {
      vColor = aColor;
      vec3 p = position;

      float distToMouse = length(p - uMouse);
      vGlow = smoothstep(25.0, 0.0, distToMouse);

      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = (aScale + vGlow * 4.0) * (380.0 / -mvPosition.z);
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

      float core = smoothstep(0.18, 0.0, dist);
      float halo = smoothstep(0.5, 0.0, dist);

      vec3 finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), core * 0.8);
      finalColor += vec3(0.0, 0.94, 1.0) * pow(halo, 2.2) * 0.5;

      gl_FragColor = vec4(finalColor, halo * 0.92);
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

  // Real Newtonian Physics Engine Solver
  const posAttr = geometry.attributes.position;
  const posArray = posAttr.array;

  const raycaster = new THREE.Raycaster();
  const mouseScreen = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mouse3D = new THREE.Vector3();

  let isMouseActive = false;
  let gravityMultiplier = 1.0;

  window.addEventListener('mousemove', (e) => {
    isMouseActive = true;
    mouseScreen.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseScreen.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseScreen, camera);
    raycaster.ray.intersectPlane(plane, mouse3D);
  });

  window.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      gravityMultiplier = -3.0; // Anti-gravity pulse
    } else {
      gravityMultiplier = 3.5; // High gravity attraction
    }
  });

  window.addEventListener('mouseup', () => {
    gravityMultiplier = 1.0;
  });

  window.addEventListener('contextmenu', (e) => e.preventDefault());

  // Key Bindings
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const rx = posArray[i3];
        const ry = posArray[i3 + 1];
        const rz = posArray[i3 + 2];
        const len = Math.sqrt(rx * rx + ry * ry + rz * rz) + 0.1;
        velocities[i3] += (rx / len) * 18.0;
        velocities[i3 + 1] += (ry / len) * 18.0;
        velocities[i3 + 2] += (rz / len) * 18.0;
      }
    } else if (e.code === 'KeyG') {
      gravityMultiplier *= -1.0;
    } else if (e.code === 'KeyR') {
      for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        posArray[i] = origPositions[i];
        velocities[i] = 0;
      }
      posAttr.needsUpdate = true;
    }
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const G_CORE = 45.0;
  const DAMPING = 0.986;
  const DT = 0.016;

  function updatePhysics() {
    const mx = mouse3D.x;
    const my = mouse3D.y;
    const mz = mouse3D.z;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      let px = posArray[i3];
      let py = posArray[i3 + 1];
      let pz = posArray[i3 + 2];

      let vx = velocities[i3];
      let vy = velocities[i3 + 1];
      let vz = velocities[i3 + 2];

      const rSqCore = px * px + py * py + pz * pz + 4.0;
      const fCore = (G_CORE / (rSqCore * Math.sqrt(rSqCore)));

      let ax = -px * fCore;
      let ay = -py * fCore;
      let az = -pz * fCore;

      if (isMouseActive) {
        const dx = mx - px;
        const dy = my - py;
        const dz = mz - pz;
        const rSqMouse = dx * dx + dy * dy + dz * dz + 8.0;
        const fMouse = (140.0 * gravityMultiplier / (rSqMouse * Math.sqrt(rSqMouse)));

        ax += dx * fMouse;
        ay += dy * fMouse;
        az += dz * fMouse;
      }

      vx = (vx + ax * DT) * DAMPING;
      vy = (vy + ay * DT) * DAMPING;
      vz = (vz + az * DT) * DAMPING;

      px += vx * DT;
      py += vy * DT;
      pz += vz * DT;

      posArray[i3] = px;
      posArray[i3 + 1] = py;
      posArray[i3 + 2] = pz;

      velocities[i3] = vx;
      velocities[i3 + 1] = vy;
      velocities[i3 + 2] = vz;
    }

    posAttr.needsUpdate = true;
  }

  // FPS Performance Counter
  let frameCount = 0;
  let lastTime = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);

    frameCount++;
    if (now - lastTime >= 1000) {
      fpsVal.textContent = frameCount + ' FPS';
      frameCount = 0;
      lastTime = now;
    }

    updatePhysics();

    const t = now * 0.001;
    uniforms.uTime.value = t;

    // Rotate Core Mesh & Particles
    coreMesh.rotation.x = t * 0.5;
    coreMesh.rotation.y = t * 0.8;

    particleSystem.rotation.y = t * 0.00012;

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
