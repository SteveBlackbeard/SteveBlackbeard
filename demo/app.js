// Ethernium Sovereign AAA Invictvs High-Engineering Real-Gravity GPU Physics Engine
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');
  const particleVal = document.getElementById('particle-val');

  // High-Precision WebGL Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020306, 0.008);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 60);

  // 100,000 GPU Particles with Real Newtonian Physics & Velocity Buffers
  const PARTICLE_COUNT = 100000;
  particleVal.textContent = PARTICLE_COUNT.toLocaleString();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const origPositions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);

  const colorCyan = new THREE.Color(0x00F0FF);
  const colorViolet = new THREE.Color(0x7000FF);
  const colorEmerald = new THREE.Color(0x00FF9D);
  const colorWhite = new THREE.Color(0xFFFFFF);

  // Initialize Accretion Disk & Orbital Gravity Velocity Vectors
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    const radius = 8 + Math.pow(Math.random(), 1.5) * 45;
    const angle = Math.random() * Math.PI * 2;
    const height = (Math.random() - 0.5) * (15 * (1.0 - radius / 50));

    positions[i3] = radius * Math.cos(angle);
    positions[i3 + 1] = height;
    positions[i3 + 2] = radius * Math.sin(angle);

    origPositions[i3] = positions[i3];
    origPositions[i3 + 1] = positions[i3 + 1];
    origPositions[i3 + 2] = positions[i3 + 2];

    // Orbital Tangential Velocity Vector: V = sqrt(G*M / R)
    const vMag = Math.sqrt(80.0 / radius);
    velocities[i3] = -Math.sin(angle) * vMag + (Math.random() - 0.5) * 0.2;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.2;
    velocities[i3 + 2] = Math.cos(angle) * vMag + (Math.random() - 0.5) * 0.2;

    // Multi-spectral Color Palette
    const pColor = new THREE.Color();
    const randCol = Math.random();
    if (randCol < 0.40) {
      pColor.copy(colorCyan);
    } else if (randCol < 0.70) {
      pColor.copy(colorViolet);
    } else if (randCol < 0.90) {
      pColor.copy(colorEmerald);
    } else {
      pColor.copy(colorWhite);
    }

    colors[i3] = pColor.r;
    colors[i3 + 1] = pColor.g;
    colors[i3 + 2] = pColor.b;

    scales[i] = 1.0 + Math.random() * 3.0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  // Custom GLSL Shader Material with Sub-Pixel Sharpness & HDR Glow
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uGravityMode: { value: 1.0 } // 1.0 = Attract, -1.0 = Repel
  };

  const vertexShader = `
    uniform float uTime;
    attribute vec3 aColor;
    attribute float aScale;

    varying vec3 vColor;
    varying float vDistance;

    void main() {
      vColor = aColor;
      vec3 p = position;
      vDistance = length(p);

      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = aScale * (360.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec3 vColor;
    varying float vDistance;

    void main() {
      // Sub-Pixel Crisp Gaussian Particle Mask
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // Sharp Core + Volumetric Glow Halo
      float core = smoothstep(0.2, 0.0, dist);
      float halo = smoothstep(0.5, 0.0, dist);

      vec3 finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), core * 0.7);
      finalColor += vec3(0.0, 0.94, 1.0) * pow(halo, 2.5) * 0.4;

      gl_FragColor = vec4(finalColor, halo * 0.9);
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

  // Real Newtonian Physics Simulation Loop (CPU Velocity Update -> GPU Attribute Render)
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
      gravityMultiplier = -2.5; // Right click: Anti-gravity shockwave
    } else {
      gravityMultiplier = 3.0; // Left click: High gravitational sink
    }
  });

  window.addEventListener('mouseup', () => {
    gravityMultiplier = 1.0;
  });

  window.addEventListener('contextmenu', (e) => e.preventDefault());

  // Keyboard Controls
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      // Pulse Shockwave Nova
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const rx = posArray[i3];
        const ry = posArray[i3 + 1];
        const rz = posArray[i3 + 2];
        const len = Math.sqrt(rx * rx + ry * ry + rz * rz) + 0.1;
        velocities[i3] += (rx / len) * 15.0;
        velocities[i3 + 1] += (ry / len) * 15.0;
        velocities[i3 + 2] += (rz / len) * 15.0;
      }
    } else if (e.code === 'KeyG') {
      gravityMultiplier *= -1.0; // Toggle Reverse Gravity
    } else if (e.code === 'KeyR') {
      // Reset Orbits
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

  // Newtonian Physics Solver
  const G_CORE = 40.0;
  const DAMPING = 0.985;
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

      // 1. Central Core Gravity: F = G * M / (r^2 + epsilon)
      const rSqCore = px * px + py * py + pz * pz + 4.0;
      const fCore = (G_CORE / (rSqCore * Math.sqrt(rSqCore)));

      let ax = -px * fCore;
      let ay = -py * fCore;
      let az = -pz * fCore;

      // 2. Interactive Mouse Attractor / Repulsor
      if (isMouseActive) {
        const dx = mx - px;
        const dy = my - py;
        const dz = mz - pz;
        const rSqMouse = dx * dx + dy * dy + dz * dz + 9.0;
        const fMouse = (120.0 * gravityMultiplier / (rSqMouse * Math.sqrt(rSqMouse)));

        ax += dx * fMouse;
        ay += dy * fMouse;
        az += dz * fMouse;
      }

      // Euler Integration
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

  // FPS Counter Logic
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

    uniforms.uTime.value = now * 0.001;
    particleSystem.rotation.y = now * 0.0001;

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
