// Ethernium Sovereign Scientific B-DNA Double Helix GPU Particle Engine v11.0
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
  const targetDNA = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);

  // B-DNA Anatomical Parameters
  const MAJOR_GROOVE_OFFSET = 0.38 * Math.PI; // 140 degree minor groove angle
  const TURNS = 6.0; // 6 full 360-degree helical turns across horizontal span

  // Nucleotide Spectral Palette
  const colAdenine = new THREE.Color(0x00F0FF);  // Cyan (A)
  const colThymine = new THREE.Color(0x7000FF);  // Violet (T)
  const colCytosine = new THREE.Color(0x00FF9D); // Emerald (C)
  const colGuanine = new THREE.Color(0xFFD700);  // Gold (G)
  const colPhosphate = new THREE.Color(0xFFFFFF); // White Backbone

  // Build Scientifically Accurate Horizontal Human B-DNA Double Helix Target
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    const progress = i / PARTICLE_COUNT;
    const x = (progress - 0.5) * 88.0; // Spans horizontally from X = -44 to +44

    const angle1 = progress * TURNS * Math.PI * 2.0;
    const angle2 = angle1 + Math.PI + MAJOR_GROOVE_OFFSET;

    const helixRadius = 13.0;

    let targetX, targetY, targetZ;
    let particleColor = new THREE.Color();

    const isBackbone = (i % 5 < 3); // 60% backbone, 40% hydrogen rungs & nucleotide cloud

    if (isBackbone) {
      // Phosphate-Sugar Backbone Strands
      const isStrand1 = (i % 2 === 0);
      const angle = isStrand1 ? angle1 : angle2;

      targetX = x + (Math.random() - 0.5) * 0.8;
      targetY = Math.sin(angle) * helixRadius + (Math.random() - 0.5) * 0.8;
      targetZ = Math.cos(angle) * helixRadius + (Math.random() - 0.5) * 0.8;

      particleColor.copy(colPhosphate);
    } else {
      // Hydrogen-Bonded Base Pair Rungs (A-T & C-G)
      const rungProgress = Math.random(); // Interpolate between Strand 1 and Strand 2
      const y1 = Math.sin(angle1) * helixRadius;
      const z1 = Math.cos(angle1) * helixRadius;

      const y2 = Math.sin(angle2) * helixRadius;
      const z2 = Math.cos(angle2) * helixRadius;

      targetX = x + (Math.random() - 0.5) * 0.5;
      targetY = THREE.MathUtils.lerp(y1, y2, rungProgress) + (Math.random() - 0.5) * 0.6;
      targetZ = THREE.MathUtils.lerp(z1, z2, rungProgress) + (Math.random() - 0.5) * 0.6;

      // Base Pair Color Assignment (A-T or C-G)
      const basePairType = Math.floor(progress * 120) % 4;
      if (basePairType === 0) particleColor.copy(colAdenine);
      else if (basePairType === 1) particleColor.copy(colThymine);
      else if (basePairType === 2) particleColor.copy(colCytosine);
      else particleColor.copy(colGuanine);
    }

    targetDNA[i3] = targetX;
    targetDNA[i3 + 1] = targetY;
    targetDNA[i3 + 2] = targetZ;

    // Initial Positions
    positions[i3] = targetX;
    positions[i3 + 1] = targetY;
    positions[i3 + 2] = targetZ;

    colors[i3] = particleColor.r;
    colors[i3 + 1] = particleColor.g;
    colors[i3 + 2] = particleColor.b;

    scales[i] = 1.0 + Math.random() * 3.2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  // Custom GPU Shader
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

  // Cycle Physics Loop: Continuous 360 Horizontal B-DNA Helical Rotation
  const posAttr = geometry.attributes.position;
  const posArray = posAttr.array;

  function updateDNAPhysics(dt, t) {
    if (cycleVal) cycleVal.textContent = 'HUMAN_B_DNA_DOUBLE_HELIX';

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      let tx = targetDNA[i3];
      let ty = targetDNA[i3 + 1];
      let tz = targetDNA[i3 + 2];

      // Dynamic Helical Rotation along X-axis
      const rotAngle = t * 0.8;
      const cosA = Math.cos(rotAngle);
      const sinA = Math.sin(rotAngle);

      const rx = tx;
      const ry = ty * cosA - tz * sinA;
      const rz = ty * sinA + tz * cosA;

      posArray[i3] = rx;
      posArray[i3 + 1] = ry;
      posArray[i3 + 2] = rz;
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

    updateDNAPhysics(dt, t);

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
