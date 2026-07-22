// Ethernium Sovereign GPU Particle Shader Simulation Engine
(function() {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  const fpsVal = document.getElementById('fps-val');
  const particleVal = document.getElementById('particle-val');

  // Renderer Setup
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020306, 0.015);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 45);

  // 25,000 Particles BufferGeometry Allocation
  const PARTICLE_COUNT = 25000;
  particleVal.textContent = PARTICLE_COUNT.toLocaleString();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const randoms = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const radius = 10 + Math.random() * 35;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    randoms[i3] = (Math.random() - 0.5) * 2;
    randoms[i3 + 1] = (Math.random() - 0.5) * 2;
    randoms[i3 + 2] = (Math.random() - 0.5) * 2;

    scales[i] = 1.0 + Math.random() * 2.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  // Custom GLSL Shader Material
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) }
  };

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    attribute vec3 aRandom;
    attribute float aScale;
    varying vec3 vPosition;
    varying float vDistance;

    void main() {
      vPosition = position;
      vec3 p = position;

      // Wave dynamics & particle oscillation
      float wave = sin(uTime * 1.5 + p.x * 0.1) * cos(uTime * 1.5 + p.y * 0.1);
      p += aRandom * wave * 2.0;

      // Mouse shockwave distortion
      vec2 mouseDist = p.xy - uMouse * 30.0;
      float dist = length(mouseDist);
      if (dist < 15.0) {
        p.z += (15.0 - dist) * 1.5 * sin(uTime * 4.0);
      }

      vDistance = length(p);

      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = aScale * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec3 vPosition;
    varying float vDistance;

    void main() {
      // Circle particle mask
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;

      // Neon Gradient Tint: Cyan (#00F0FF) to Magenta (#7000FF) to Emerald (#00FF9D)
      vec3 colorCyan = vec3(0.0, 0.94, 1.0);
      vec3 colorMagenta = vec3(0.44, 0.0, 1.0);
      vec3 colorEmerald = vec3(0.0, 1.0, 0.61);

      float t = sin(vDistance * 0.1 - uTime * 0.5) * 0.5 + 0.5;
      vec3 color = mix(colorCyan, colorMagenta, t);
      color = mix(color, colorEmerald, sin(uTime + vPosition.z * 0.05) * 0.5 + 0.5);

      float alpha = (1.0 - dist * 2.0) * 0.8;
      gl_FragColor = vec4(color, alpha);
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

  const particlePoints = new THREE.Points(geometry, material);
  scene.add(particlePoints);

  // Mouse Interactivity
  const mouse = new THREE.Vector2();
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    uniforms.uMouse.value.copy(mouse);
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
    particlePoints.rotation.y = now * 0.00015;
    particlePoints.rotation.x = Math.sin(now * 0.0001) * 0.1;

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
