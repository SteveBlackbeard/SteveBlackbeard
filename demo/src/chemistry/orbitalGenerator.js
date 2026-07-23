// NULLA-LABS IUPAC 3D MOLECULAR SYNTHESIS PLATFORM — ORBITAL GENERATOR
// Quantum Wavefunction Density Cloud Generator (|Ψ|² Probability Point Clouds)

import { EL_VISUALS } from '../config/constants.js';

export function generateQuantumOrbitalPoints(z, count = 3500) {
  const el = (typeof PERIODIC_DATA !== 'undefined' ? PERIODIC_DATA[z] : null) || { s:'H', n:'Hydrogen' };
  const atomicNum = el.n || z;

  let orbitalType = '1s';
  if (atomicNum > 2 && atomicNum <= 10) orbitalType = '2p';
  else if (atomicNum > 10 && atomicNum <= 18) orbitalType = '3s_3p';
  else if (atomicNum > 18 && atomicNum <= 30) orbitalType = '3d';
  else if (atomicNum > 30) orbitalType = 'hybrid_sp3d';

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const baseCol = new THREE.Color(EL_VISUALS[z] ? EL_VISUALS[z].col : 0x00F0FF);
  const accentCol = new THREE.Color(0xFF0055);

  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, zPos = 0;
    let probColorRatio = 0;

    if (orbitalType === '1s') {
      const u = Math.random();
      const r = -Math.log(1 - u) * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      x = r * Math.sin(phi) * Math.cos(theta);
      y = r * Math.sin(phi) * Math.sin(theta);
      zPos = r * Math.cos(phi);
      probColorRatio = Math.exp(-r / 3.0);
    } else if (orbitalType === '2p') {
      const lobe = Math.random() > 0.5 ? 1 : -1;
      const r = Math.pow(Math.random(), 0.5) * 8.0;
      const theta = (Math.random() - 0.5) * 0.9;
      const phi = (Math.random() - 0.5) * 0.9;
      y = lobe * (2.0 + r * Math.cos(theta));
      x = r * Math.sin(theta) * Math.cos(phi);
      zPos = r * Math.sin(theta) * Math.sin(phi);
      probColorRatio = lobe > 0 ? 0.9 : 0.2;
    } else if (orbitalType === '3d') {
      const quadrant = Math.floor(Math.random() * 4);
      const r = 3.0 + Math.random() * 7.0;
      const angle = (quadrant * Math.PI / 2) + (Math.random() - 0.5) * 0.7;
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      zPos = (Math.random() - 0.5) * 3.5;
      probColorRatio = (quadrant % 2 === 0) ? 0.95 : 0.25;
    } else {
      const r = Math.pow(Math.random(), 0.6) * 10.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      x = r * Math.sin(phi) * Math.cos(theta);
      y = r * Math.sin(phi) * Math.sin(theta);
      zPos = r * Math.cos(phi);
      probColorRatio = Math.random();
    }

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = zPos;

    const c = baseCol.clone().lerp(accentCol, probColorRatio);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  return { positions, colors, orbitalType };
}
