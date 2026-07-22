// Ethernium Sovereign 3D Mask Morphing & Kinetic Explosion Particle Engine v8.0
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');
  const particleVal = document.getElementById('particle-val');
  const cycleVal = document.getElementById('cycle-val');

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020306, 0.0075);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 52);

  // 90,000 GPU Particles
  const PARTICLE_COUNT = 90000;
  particleVal.textContent = PARTICLE_COUNT.toLocaleString();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const targetPositions = new Float32Array(PARTICLE_COUNT * 3); // 3D Mask Target Coordinates
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);

  const PHI = (1.0 + Math.sqrt(5.0)) / 2.0;
  const GOLDEN_ANGLE = Math.PI * (3.0 - Math.sqrt(5.0));

  // Nucleotide & Invictvs Gold/Cyan Palette
  const colCyan = new THREE.Color(0x00F0FF);   // Invictvs Cyan
  const colViolet = new THREE.Color(0x7000FF); // Deep Violet
  const colEmerald = new THREE.Color(0x00FF9D); // Emerald
  const colGold = new THREE.Color(0xFFD700);   // Invictvs Gold
  const colWhite = new THREE.Color(0xFFFFFF);

  // Generate Invictvs Cybernetic 3D Mask Target Geometry
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    // 3D Mask Surface Coordinates
    const u = (i / PARTICLE_COUNT) * Math.PI * 2.0 * 25.0; // Multi-wrap surface
    const v = ((i % 300) / 300.0) * Math.PI - Math.PI / 2.0;

    let y = Math.sin(v) * 22.0;
    let rad = (Math.cos(v) * 0.7 + 0.3) * 14.0;

    if (y < -4.0) {
      rad *= (1.0 + (y + 4.0) * 0.035); // Jawline taper
    }

    let x = Math.cos(u) * rad;
    let z = Math.sin(u) * rad * 0.65;

    // Eye Socket Cavity Indentation
    if (y > 1.5 && y < 7.5 && Math.abs(x) > 2.5 && Math.abs(x) < 9.5) {
      z -= 3.5;
    }

    targetPositions[i3] = x;
    targetPositions[i3 + 1] = y;
    targetPositions[i3 + 2] = z;

    // Initial Random Position Cloud
    const r = Math.sqrt(i / PARTICLE_COUNT) * 45.0 + 5.0;
    const theta = i * GOLDEN_ANGLE;
    positions[i3] = r * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(theta);
    positions[i3 + 2] = (Math.random() - 0.5) * 30.0;

    // Color Palette
    const pColor = new THREE.Color();
    const rCol = Math.random();
    if (rCol < 0.40) {
      pColor.copy(colCyan);
    } else if (rCol < 0.70) {
      pColor.copy(colViolet);
    } else if (rCol < 0.88) {
      pColor.copy(colEmerald);
    } else if (rCol < 0.96) {
      pColor.copy(colGold);
    } else {
      pColor.copy(colWhite);
    }

    colors[i3] = pColor.r;
    colors[i3 + 1] = pColor.g;
    colors[i3 + 2] = pColor.b;

    scales[i] = 1.0 + Math.random() * 3.0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  // Custom GPU Shader
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uExplode: { value: 0.0 }
  };

  const vertexShader = `
    uniform float uTime;
    uniform vec3 uMouse;
    uniform float uExplode;
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

      vGlow = smoothstep(25.0, 0.0, distToMouse);

      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = (aScale + vGlow * 3.5) * (380.0 / -mvPosition.z);
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

      vec3 finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), core * 0.82);
      finalColor += vec3(0.0, 0.94, 1.0) * pow(halo, 2.2) * 0.45;

      gl_FragColor = vec4(finalColor, halo * 0.90);
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

  // Mouse Interaction
  const raycaster = new THREE.Raycaster();
  const mouseScreen = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mouse3D = new THREE.Vector3();

  window.addEventListener('mousemove', (e) => {
    mouseScreen.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseScreen.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseScreen, camera);
    raycaster.ray.intersectPlane(plane, mouse3D);
    uniforms.uMouse.value.copy(mouse3D);
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // State Machine Loop: 12 Second Cycle (Form -> Hold -> Explode -> Reform)
  const posAttr = geometry.attributes.position;
  const posArray = posAttr.array;

  let cycleTime = 0;
  const CYCLE_DURATION = 10.0; // 10s total loop

  function updateMaskPhysics(dt) {
    cycleTime = (cycleTime + dt) % CYCLE_DURATION;

    // Phase 0 to 4s: Form Mask
    // Phase 4 to 6.5s: Hold & Rotate Mask
    // Phase 6.5 to 7.5s: Kinetic Shockwave Explosion
    // Phase 7.5 to 10s: Gravitational Reform

    let isExploding = false;

    if (cycleTime >= 6.5 && cycleTime < 7.5) {
      isExploding = true;
      if (cycleVal) cycleVal.textContent = 'EXPLOSION_KINETIC';
    } else if (cycleTime >= 4.0 && cycleTime < 6.5) {
      if (cycleVal) cycleVal.textContent = 'MASK_HOLD_PULSE';
    } else {
      if (cycleVal) cycleVal.textContent = 'FORMING_3D_MASK';
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      let px = posArray[i3];
      let py = posArray[i3 + 1];
      let pz = posArray[i3 + 2];

      let tx = targetPositions[i3];
      let ty = targetPositions[i3 + 1];
      let tz = targetPositions[i3 + 2];

      let vx = velocities[i3];
      let vy = velocities[i3 + 1];
      let vz = velocities[i3 + 2];

      if (isExploding) {
        // Explode outward radially
        const len = Math.sqrt(px * px + py * py + pz * pz) + 0.1;
        vx += (px / len) * 45.0 * dt;
        vy += (py / len) * 45.0 * dt;
        vz += (pz / len) * 45.0 * dt;
      } else {
        // Morph interpolation toward 3D Mask Target
        const dx = tx - px;
        const dy = ty - py;
        const dz = tz - pz;

        vx = vx * 0.88 + dx * 3.5 * dt;
        vy = vy * 0.88 + dy * 3.5 * dt;
        vz = vz * 0.88 + dz * 3.5 * dt;
      }

      px += vx * dt * 60.0 * 0.016;
      py += vy * dt * 60.0 * 0.016;
      pz += vz * dt * 60.0 * 0.016;

      posArray[i3] = px;
      posArray[i3 + 1] = py;
      posArray[i3 + 2] = pz;

      velocities[i3] = vx;
      velocities[i3 + 1] = vy;
      velocities[i3 + 2] = vz;
    }

    posAttr.needsUpdate = true;
  }

  // Render Loop
  let frameCount = 0;
  let lastTime = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);

    const dt = Math.min((now - lastTime) * 0.001, 0.05);

    frameCount++;
    if (now - lastTime >= 1000) {
      fpsVal.textContent = frameCount + ' FPS';
      frameCount = 0;
      lastTime = now;
    }

    const t = now * 0.001;
    uniforms.uTime.value = t;

    updateMaskPhysics(dt);

    // Rotate 3D Mask System
    particleSystem.rotation.y = t * 0.35;

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
