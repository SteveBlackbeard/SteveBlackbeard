// Ethernium Sovereign AAA High-Engineering Particle Shader Engine (Invictvs Paradigm)
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');
  const particleVal = document.getElementById('particle-val');

  // High-Precision WebGL Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020306, 0.012);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 50);

  // AAA High-Density 60,000 Particles Allocation
  const PARTICLE_COUNT = 60000;
  particleVal.textContent = PARTICLE_COUNT.toLocaleString();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const randoms = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);
  const phases = new Float32Array(PARTICLE_COUNT);

  const colorCyan = new THREE.Color(0x00F0FF);
  const colorViolet = new THREE.Color(0x7000FF);
  const colorEmerald = new THREE.Color(0x00FF9D);
  const colorWhite = new THREE.Color(0xFFFFFF);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    // Toroidal & Vortex Distribution
    const radius = 12 + Math.random() * 38;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    randoms[i3] = (Math.random() - 0.5) * 2;
    randoms[i3 + 1] = (Math.random() - 0.5) * 2;
    randoms[i3 + 2] = (Math.random() - 0.5) * 2;

    // Multi-spectral Color Palette Palette
    const pColor = new THREE.Color();
    const randCol = Math.random();
    if (randCol < 0.45) {
      pColor.copy(colorCyan);
    } else if (randCol < 0.75) {
      pColor.copy(colorViolet);
    } else if (randCol < 0.93) {
      pColor.copy(colorEmerald);
    } else {
      pColor.copy(colorWhite);
    }

    colors[i3] = pColor.r;
    colors[i3 + 1] = pColor.g;
    colors[i3 + 2] = pColor.b;

    scales[i] = 1.0 + Math.random() * 3.5;
    phases[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

  // AAA GLSL Custom Shaders with Curl-Noise Dynamics & Mouse Attractor Physics
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uClickImpulse: { value: 0 }
  };

  const vertexShader = `
    uniform float uTime;
    uniform vec3 uMouse;
    uniform float uClickImpulse;
    attribute vec3 aRandom;
    attribute vec3 aColor;
    attribute float aScale;
    attribute float aPhase;

    varying vec3 vColor;
    varying float vDistance;
    varying float vGlow;

    // Simplex Noise 3D Helper
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

      // 1. Orbital Vortex Rotation
      float angle = uTime * 0.4 + length(p.xz) * 0.08;
      mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      p.xz = rot * p.xz;

      // 2. Simplex Noise Turbulence Turbulence
      vec3 noiseVec = vec3(
        snoise(p * 0.05 + vec3(uTime * 0.2, 0.0, 0.0)),
        snoise(p * 0.05 + vec3(0.0, uTime * 0.2, 0.0)),
        snoise(p * 0.05 + vec3(0.0, 0.0, uTime * 0.2))
      );
      p += noiseVec * 3.5;

      // 3. Interactive Mouse Attractor & Radial Shockwave
      vec3 mouseDelta = p - uMouse;
      float distToMouse = length(mouseDelta);
      if (distToMouse < 22.0) {
        float force = (22.0 - distToMouse) / 22.0;
        p += normalize(mouseDelta) * force * 8.0 * (1.0 + uClickImpulse * 3.0);
      }

      vDistance = length(p);
      vGlow = smoothstep(35.0, 0.0, distToMouse);

      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = (aScale + vGlow * 3.0) * (380.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec3 vColor;
    varying float vDistance;
    varying float vGlow;

    void main() {
      // High-precision Gaussian particle mask
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      float alpha = smoothstep(0.5, 0.0, dist);

      // Core glow amplification
      vec3 finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), vGlow * 0.6);
      finalColor += vec3(0.0, 0.94, 1.0) * pow(1.0 - dist * 2.0, 3.0) * 0.5;

      gl_FragColor = vec4(finalColor, alpha * 0.85);
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

  // Mouse Interaction Attractor
  const raycaster = new THREE.Raycaster();
  const mouseScreen = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const targetPoint = new THREE.Vector3();

  window.addEventListener('mousemove', (e) => {
    mouseScreen.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseScreen.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseScreen, camera);
    raycaster.ray.intersectPlane(plane, targetPoint);
    uniforms.uMouse.value.copy(targetPoint);
  });

  window.addEventListener('mousedown', () => {
    uniforms.uClickImpulse.value = 1.0;
  });

  window.addEventListener('mouseup', () => {
    uniforms.uClickImpulse.value = 0.0;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

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

    uniforms.uTime.value = now * 0.001;

    // Decay impulse smoothly
    if (uniforms.uClickImpulse.value > 0.01) {
      uniforms.uClickImpulse.value *= 0.92;
    }

    particleSystem.rotation.y = now * 0.00012;
    particleSystem.rotation.x = Math.sin(now * 0.00008) * 0.15;

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
