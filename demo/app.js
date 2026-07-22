// Ethernium Sovereign Invictvs 3D Cybernetic Mask GPU Engine v10.0
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

  // 100,000 High-Precision GPU Particles
  const PARTICLE_COUNT = 100000;
  particleVal.textContent = PARTICLE_COUNT.toLocaleString();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const targetMask = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);

  const PHI = (1.0 + Math.sqrt(5.0)) / 2.0;

  // Invictvs Palette
  const colCyan = new THREE.Color(0x00F0FF);   // Invictvs Cyan
  const colViolet = new THREE.Color(0x7000FF); // Deep Violet
  const colEmerald = new THREE.Color(0x00FF9D); // Emerald
  const colGold = new THREE.Color(0xFFD700);   // Invictvs Gold
  const colWhite = new THREE.Color(0xFFFFFF);

  // Generate High-Precision Invictvs Cybernetic 3D Mask Geometry
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    // Parametric Face Mesh Distribution
    const u = Math.random() * Math.PI * 2.0;
    const v = Math.random(); // 0 to 1

    const y = -24.0 + v * 48.0; // Y height from chin to forehead

    // Sculpted Face Radius Profile
    let rad = 17.0;
    if (y > 14.0) {
      rad = 16.0 * (1.0 - (y - 14.0) * 0.04); // Forehead Crown
    } else if (y > 0.0) {
      rad = 18.5 - Math.pow(Math.abs(y - 7.0) * 0.1, 2.0) * 3.5; // Cheekbone width
    } else if (y > -10.0) {
      rad = 16.5 * (1.0 - (Math.abs(y) * 0.03));
    } else {
      rad = 14.0 * (1.0 - (Math.abs(y + 10.0) * 0.055)); // Sharp V-Jawline
    }

    let x = Math.cos(u) * rad;
    let z = Math.sin(u) * rad * 0.55;

    // Eye Socket Cavity Indentation (Deep Eye Sockets)
    if (3.0 < y && y < 11.0 && Math.abs(x) > 2.5 && Math.abs(x) < 11.5 && z > 0) {
      z -= 6.5;
    }

    // Protruding Nasal Bridge
    if (0.0 < y && y < 13.0 && Math.abs(x) < 3.2 && z > 0) {
      z += 4.5;
    }

    targetMask[i3] = x;
    targetMask[i3 + 1] = y;
    targetMask[i3 + 2] = z;

    // Initial Random Cloud
    const rStart = Math.sqrt(Math.random()) * 45.0 + 5.0;
    const thetaStart = Math.random() * Math.PI * 2.0;
    positions[i3] = rStart * Math.cos(thetaStart);
    positions[i3 + 1] = rStart * Math.sin(thetaStart);
    positions[i3 + 2] = (Math.random() - 0.5) * 30.0;

    // Color Palette Assignment (Eye Pupils get Glowing Gold/White)
    const pColor = new THREE.Color();
    if (3.0 < y && y < 11.0 && Math.abs(x) > 3.5 && Math.abs(x) < 8.5 && z < 0) {
      pColor.copy(colGold); // Eye Pupil Gold Glow
    } else {
      const rCol = Math.random();
      if (rCol < 0.45) pColor.copy(colCyan);
      else if (rCol < 0.75) pColor.copy(colViolet);
      else if (rCol < 0.90) pColor.copy(colEmerald);
      else pColor.copy(colWhite);
    }

    colors[i3] = pColor.r;
    colors[i3 + 1] = pColor.g;
    colors[i3 + 2] = pColor.b;

    scales[i] = 1.0 + Math.random() * 3.0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  // Custom Shader
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

  // Cycle Physics Loop: 10s Cycle (Form Invictvs 3D Mask -> Hold & Pulse -> Kinetic Explosion -> Re-assemble)
  const posAttr = geometry.attributes.position;
  const posArray = posAttr.array;

  let cycleTime = 0;
  const CYCLE_DURATION = 10.0;

  function updatePhysicsCycle(dt) {
    cycleTime = (cycleTime + dt) % CYCLE_DURATION;

    let isExploding = false;

    if (cycleTime >= 6.5 && cycleTime < 7.8) {
      isExploding = true;
      if (cycleVal) cycleVal.textContent = 'KINETIC_SHOCKWAVE';
    } else if (cycleTime >= 4.0 && cycleTime < 6.5) {
      if (cycleVal) cycleVal.textContent = 'INVICTVS_MASK_HOLD';
    } else {
      if (cycleVal) cycleVal.textContent = 'FORMING_INVICTVS_MASK';
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      let px = posArray[i3];
      let py = posArray[i3 + 1];
      let pz = posArray[i3 + 2];

      let tx = targetMask[i3];
      let ty = targetMask[i3 + 1];
      let tz = targetMask[i3 + 2];

      let vx = velocities[i3];
      let vy = velocities[i3 + 1];
      let vz = velocities[i3 + 2];

      if (isExploding) {
        const len = Math.sqrt(px * px + py * py + pz * pz) + 0.1;
        vx += (px / len) * 48.0 * dt;
        vy += (py / len) * 48.0 * dt;
        vz += (pz / len) * 48.0 * dt;
      } else {
        const dx = tx - px;
        const dy = ty - py;
        const dz = tz - pz;

        vx = vx * 0.88 + dx * 3.8 * dt;
        vy = vy * 0.88 + dy * 3.8 * dt;
        vz = vz * 0.88 + dz * 3.8 * dt;
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

    updatePhysicsCycle(dt);

    particleSystem.rotation.y = t * 0.35;

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
