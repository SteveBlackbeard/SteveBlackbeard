// NULLA-LABS IUPAC 3D MOLECULAR SYNTHESIS PLATFORM — CHEMISTRY ENGINE
// Stoichiometry, Valence Predictions, Reaction Lookups, and VSEPR Compiler

import { VALENCE_MAP, REACTIONS } from '../config/constants.js';

export function predictCompoundFormula(zA, zB) {
  const elA = (typeof PERIODIC_DATA !== 'undefined' ? PERIODIC_DATA[zA] : null) || { s:'A', n:'Element A', en:1.5 };
  const elB = (typeof PERIODIC_DATA !== 'undefined' ? PERIODIC_DATA[zB] : null) || { s:'B', n:'Element B', en:2.5 };

  const valA = Math.abs(VALENCE_MAP[zA] !== undefined ? VALENCE_MAP[zA] : 1);
  const valB = Math.abs(VALENCE_MAP[zB] !== undefined ? VALENCE_MAP[zB] : 1);

  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

  let countA = valB === 0 ? 1 : valB;
  let countB = valA === 0 ? 1 : valA;
  const common = gcd(countA, countB);
  countA /= common;
  countB /= common;

  const isACation = (elA.en || 1.5) <= (elB.en || 2.5);
  const cation = isACation ? zA : zB;
  const anion = isACation ? zB : zA;
  const countCat = isACation ? countA : countB;
  const countAni = isACation ? countB : countA;

  const catSymbol = (typeof PERIODIC_DATA !== 'undefined' ? PERIODIC_DATA[cation] : null)?.s || 'X';
  const aniSymbol = (typeof PERIODIC_DATA !== 'undefined' ? PERIODIC_DATA[anion] : null)?.s || 'Y';

  const strCat = countCat > 1 ? `${catSymbol}<sub>${countCat}</sub>` : catSymbol;
  const strAni = countAni > 1 ? `${aniSymbol}<sub>${countAni}</sub>` : aniSymbol;
  const formulaHTML = `${strCat}${strAni}`;
  const formulaStr = `${catSymbol}${countCat > 1 ? countCat : ''}${aniSymbol}${countAni > 1 ? countAni : ''}`;

  return { cation, anion, countCat, countAni, formulaHTML, formulaStr, valA, valB };
}

export function buildVseprCompound(pred) {
  const { cation, anion, countCat, countAni } = pred;
  const atoms = [];
  const spacing = 4.2;

  if (countCat === 1) {
    atoms.push({ z: cation, pos: new THREE.Vector3(0, 0, 0), scale: 2.2 });

    if (countAni === 1) {
      atoms.push({ z: anion, pos: new THREE.Vector3(spacing * 1.5, 0, 0), scale: 1.7 });
    } else if (countAni === 2) {
      const isBent = (anion === 8 || anion === 16);
      const angle = isBent ? (104.5 * Math.PI / 180) : Math.PI;
      const r = spacing * 1.6;
      atoms.push({ z: anion, pos: new THREE.Vector3(r * Math.cos(-angle / 2), r * Math.sin(-angle / 2), 0), scale: 1.7 });
      atoms.push({ z: anion, pos: new THREE.Vector3(r * Math.cos(angle / 2), r * Math.sin(angle / 2), 0), scale: 1.7 });
    } else if (countAni === 3) {
      const r = spacing * 1.7;
      for (let i = 0; i < 3; i++) {
        const theta = (i / 3) * Math.PI * 2 - Math.PI / 2;
        atoms.push({ z: anion, pos: new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), 0), scale: 1.7 });
      }
    } else if (countAni === 4) {
      const r = spacing * 1.8;
      const t = [
        new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(r),
        new THREE.Vector3(-1, -1, 1).normalize().multiplyScalar(r),
        new THREE.Vector3(-1, 1, -1).normalize().multiplyScalar(r),
        new THREE.Vector3(1, -1, -1).normalize().multiplyScalar(r)
      ];
      t.forEach(pos => atoms.push({ z: anion, pos, scale: 1.7 }));
    } else if (countAni === 5) {
      const r = spacing * 1.9;
      atoms.push({ z: anion, pos: new THREE.Vector3(0, r * 1.1, 0), scale: 1.7 });
      atoms.push({ z: anion, pos: new THREE.Vector3(0, -r * 1.1, 0), scale: 1.7 });
      for (let i = 0; i < 3; i++) {
        const theta = (i / 3) * Math.PI * 2;
        atoms.push({ z: anion, pos: new THREE.Vector3(r * Math.cos(theta), 0, r * Math.sin(theta)), scale: 1.7 });
      }
    } else {
      const d = spacing * 1.8;
      const dirs = [
        new THREE.Vector3(d, 0, 0), new THREE.Vector3(-d, 0, 0),
        new THREE.Vector3(0, d, 0), new THREE.Vector3(0, -d, 0),
        new THREE.Vector3(0, 0, d), new THREE.Vector3(0, 0, -d)
      ];
      dirs.forEach(dir => atoms.push({ z: anion, pos: dir, scale: 1.7 }));
    }
  } else {
    for (let c = 0; c < countCat; c++) {
      const cPos = new THREE.Vector3((c - (countCat - 1) * 0.5) * spacing * 1.5, 0, 0);
      atoms.push({ z: cation, pos: cPos, scale: 2.0 });
    }
    for (let a = 0; a < countAni; a++) {
      const theta = (a / countAni) * Math.PI * 2;
      const aPos = new THREE.Vector3(
        Math.cos(theta) * spacing * 1.2,
        Math.sin(theta) * spacing * 1.2,
        (a % 2 === 0 ? 1 : -1) * 3.0
      );
      atoms.push({ z: anion, pos: aPos, scale: 1.7 });
    }
  }

  return atoms;
}

export function findReaction(reactantsArray) {
  const sortedSymbols = reactantsArray.map(r => r.sym).sort().join('+');
  const directSymbols = reactantsArray.map(r => r.sym).join('+');
  return REACTIONS[sortedSymbols] || REACTIONS[directSymbols] || null;
}
