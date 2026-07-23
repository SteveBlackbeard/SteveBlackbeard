// NULLA-LABS IUPAC 3D MOLECULAR SYNTHESIS PLATFORM — ATOM RENDERER
// InstancedMesh Pooling, MeshPhysicalMaterial with Clearcoat & Reflectance, Lerps, Text Sprites, Shockwaves, and Explosion Particles

import { EL_VISUALS } from '../config/constants.js';

const sphereGeo = new THREE.SphereGeometry(1.0, 32, 32);
const cylinderGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.0, 12);
const bondMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.1, metalness: 0.9, opacity: 0.85, transparent: true });

const materialCache = {};

export function getMaterialForElement(elData, overrideCol) {
  const col = overrideCol !== undefined ? overrideCol : (elData ? elData.col : 0x00F0FF);
  const cat = (elData && elData.cat) ? String(elData.cat).toLowerCase() : '';
  const key = `${elData ? elData.z : 1}_${col}_${cat}`;

  if (materialCache[key]) return materialCache[key];

  let metalness = 0.2;
  let roughness = 0.08;
  let clearcoat = 1.0;
  let clearcoatRoughness = 0.02;
  let reflectance = 0.9;

  if (cat.includes('alkali') || cat.includes('transition') || cat.includes('lanthanide') || cat.includes('actinide')) {
    metalness = 0.45;
    roughness = 0.06;
    clearcoat = 1.0;
    clearcoatRoughness = 0.01;
  } else if (cat.includes('noble')) {
    metalness = 0.15;
    roughness = 0.02;
    clearcoat = 1.0;
    clearcoatRoughness = 0.01;
  } else if (cat.includes('metalloid')) {
    metalness = 0.35;
    roughness = 0.08;
    clearcoat = 1.0;
    clearcoatRoughness = 0.02;
  } else if (cat.includes('halogen') || cat.includes('nonmetal')) {
    metalness = 0.15;
    roughness = 0.10;
    clearcoat = 1.0;
    clearcoatRoughness = 0.03;
  }

  materialCache[key] = new THREE.MeshPhysicalMaterial({
    color: col,
    metalness,
    roughness,
    clearcoat,
    clearcoatRoughness,
    reflectance
  });
  return materialCache[key];
}

export function createTextSprite(text, colorStr) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.font = 'bold 26px "Orbitron", "Fira Code", monospace';
  ctx.fillStyle = colorStr || '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText(text, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(3, 3, 1);
  return sprite;
}
