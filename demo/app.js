// Ethernium Sovereign Multidisciplinary 3-6-9 Fibonacci & Visual Genetics GPU Engine v7.0
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');
  const particleVal = document.getElementById('particle-val');

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020306, 0.0075);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 52);

  // 90,000 High-Precision GPU Particles (3-6-9 Multiples: 90,000 = 9 * 10,000)
  const PARTICLE_COUNT = 90000;
  particleVal.textContent = PARTICLE_COUNT.toLocaleString();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const origPositions = new Float32Array(PARTICLE_COUNT * 3);
  const randoms = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);
  const nodeTypes = new Float32Array(PARTICLE_COUNT); // 3, 6, 9 Nodal Frequency Assignment

  const PHI = (1.0 + Math.sqrt(5.0)) / 2.0; // Golden Ratio 1.61803398875
  const GOLDEN_ANGLE = Math.PI * (3.0 - Math.sqrt(5.0)); // 137.5077 degrees

  // Nucleotide Spectral Palette (Adenine, Thymine, Cytosine, Guanine + Tesla White)
  const colAdenine = new THREE.Color(0x00F0FF);  // Cyan
  const colThymine = new THREE.Color(0x7000FF);  // Violet
  const colCytosine = new THREE.Color(0x00FF9D); // Emerald
  const colGuanine = new THREE.Color(0xFFD700);  // Gold
  const colTeslaWhite = new THREE.Color(0xFFFFFF);

  // Multidisciplinary Initialization: Fibonacci Phyllotaxis + DNA Double Helix + Tesla 3-6-9 Nodes
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    // Tesla 3-6-9 Nodal Category (0 = Node 3, 1 = Node 6, 2 = Node 9)
    const nodeCat = i % 3;
    nodeTypes[i] = nodeCat === 0 ? 3.0 : (nodeCat === 1 ? 6.0 : 9.0);

    // Fibonacci Golden Spiral Radii
    const r = Math.sqrt(i / PARTICLE_COUNT) * 42.0 + 3.0;
    const theta = i * GOLDEN_ANGLE;

    // DNA Double Helix Strand Offset
    const strand = (i % 2 === 0) ? 1.0 : -1.0;
    const helixZ = Math.sin(theta * 3.0) * 8.0 * strand + (Math.random() - 0.5) * 4.0;

    // Arched Rotational Vortex Position
    positions[i3] = r * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(theta);
    positions[i3 + 2] = helixZ;

    origPositions[i3] = positions[i3];
    origPositions[i3 + 1] = positions[i3 + 1];
    origPositions[i3 + 2] = positions[i3 + 2];

    randoms[i3] = (Math.random() - 0.5) * 2.0;
    randoms[i3 + 1] = (Math.random() - 0.5) * 2.0;
    randoms[i3 + 2] = (Math.random() - 0.5) * 2.0;

    // Color Assignment by Genetic Base Pair & Tesla Frequency
    const pColor = new THREE.Color();
    const rCol = Math.random();
    if (rCol < 0.35) {
      pColor.copy(colAdenine);
    } else if (rCol < 0.65) {
      pColor.copy(colThymine);
    } else if (rCol < 0.85) {
      pColor.copy(colCytosine);
    } else if (rCol < 0.95) {
      pColor.copy(colGuanine);
    } else {
      pColor.copy(colTeslaWhite);
    }

    colors[i3] = pColor.r;
    colors[i3 + 1] = pColor.g;
    colors[i3 + 2] = pColor.b;

    scales[i] = 1.0 + Math.random() * 3.2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute('aNodeType', new THREE.BufferAttribute(nodeTypes, 1));

  // Central 3D Sacred Geometry Monolith (Dual Stellated Octahedron Core)
  const coreGroup = new THREE.Group();

  const coreGeo1 = new THREE.OctahedronGeometry(5, 1);
  const coreMat1 = new THREE.MeshBasicMaterial({ color: 0x00F0FF, wireframe: true, transparent: true, opacity: 0.75 });
  const mesh1 = new THREE.Mesh(coreGeo1, coreMat1);

  const coreGeo2 = new THREE.IcosahedronGeometry(7, 1);
  const coreMat2 = new THREE.MeshBasicMaterial({ color: 0xFFD700, wireframe: true, transparent: true, opacity: 0.45 });
  const mesh2 = new THREE.Mesh(coreGeo2, coreMat2);

  coreGroup.add(mesh1);
  coreGroup.add(mesh2);
  scene.add(coreGroup);

  // Pure GPU Shader Engine with 3-6-9 Vortex Dynamics & Fibonacci Gravitational Lensing
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uImpulse: { value: 0.0 }
  };

  const vertexShader = `
    uniform float uTime;
    uniform vec3 uMouse;
    uniform float uImpulse;
    attribute vec3 aRandom;
    attribute vec3 aColor;
    attribute float aScale;
    attribute float aNodeType;

    varying vec3 vColor;
    varying float vGlow;

    #define PHI 1.61803398875

    // 3D Simplex Noise Function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vColor = aColor;
      vec3 p = position;

      // Tesla 3-6-9 Frequency Modulated Oscillation
      float freqMod = aNodeType / 3.0; // 1.0 for Node 3, 2.0 for Node 6, 3.0 for Node 9
      float teslaWave = sin(uTime * freqMod * 0.7 + length(p) * 0.1) * cos(uTime * 0.5);

      // Arched Spinning Rotational Geodesics (Toroidal Flow)
      float angle = uTime * 0.4 * freqMod + length(p) * 0.04;
      mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      p.xy = rot * p.xy;
      p.z += teslaWave * 2.5;

      // Fibonacci 3D Simplex Flow
      vec3 noise = vec3(
        snoise(p * 0.035 + vec3(uTime * 0.12, 0.0, 0.0)),
        snoise(p * 0.035 + vec3(0.0, uTime * 0.12, 0.0)),
        snoise(p * 0.035 + vec3(0.0, 0.0, uTime * 0.12))
      );
      p += noise * (3.0 * PHI);

      // Mouse Gravitational Lensing & Kinetic Impulse Shockwave
      vec3 delta = p - uMouse;
      float dist = length(delta);
      if (dist < 26.0) {
        float force = (26.0 - dist) / 26.0;
        p += normalize(delta) * force * (12.0 + uImpulse * 15.0);
      }

      vGlow = smoothstep(26.0, 0.0, dist);

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

      vec3 finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), core * 0.82);
      finalColor += vec3(1.0, 0.84, 0.0) * pow(halo, 2.0) * 0.35; // Golden Tesla Glow

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

  window.addEventListener('mousedown', () => {
    uniforms.uImpulse.value = 1.0;
  });

  window.addEventListener('mouseup', () => {
    uniforms.uImpulse.value = 0.0;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Render Loop
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

    const t = now * 0.001;
    uniforms.uTime.value = t;

    if (uniforms.uImpulse.value > 0.01) {
      uniforms.uImpulse.value *= 0.90;
    }

    // 3D Sacred Geometry Rotation
    mesh1.rotation.x = t * 0.5;
    mesh1.rotation.y = t * 0.7;

    mesh2.rotation.x = -t * 0.3;
    mesh2.rotation.z = t * 0.4;

    particleSystem.rotation.z = t * 0.05;

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
