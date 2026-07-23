// NULLA-LABS IUPAC 3D MOLECULAR SYNTHESIS PLATFORM — CHEMISTRY & THERMODYNAMIC ENGINE
// Stoichiometry, Pauling Electronegativity Stability Predictions, Top 3-5 Generative Recommender, VSEPR Compiler & Spectroscopy Data

import { VALENCE_MAP, PAULING_EN, REACTIONS } from '../config/constants.js';

export function calculateThermodynamicStability(zA, zB) {
  const enA = PAULING_EN[zA] !== undefined ? PAULING_EN[zA] : 1.5;
  const enB = PAULING_EN[zB] !== undefined ? PAULING_EN[zB] : 2.5;
  const deltaEN = Math.abs(enA - enB);

  let bondType = 'Non-Polar Covalent';
  let score = 72.0 + deltaEN * 8.5;

  if (deltaEN >= 1.7) {
    bondType = 'Ionic Lattice';
    score = 88.0 + (deltaEN - 1.7) * 4.5;
  } else if (deltaEN >= 0.4) {
    bondType = 'Polar Covalent';
    score = 80.0 + deltaEN * 7.0;
  }

  score = Math.min(99.5, Math.max(45.0, score));
  return {
    deltaEN: deltaEN.toFixed(2),
    bondType,
    stabilityScore: score.toFixed(1) + '%'
  };
}

export function calculateGibbsFreeEnergy(deltaH = -250, deltaS = -120, tempK = 298) {
  const deltaG = deltaH - (tempK * (deltaS / 1000.0));
  const isSpontaneous = deltaG < 0;
  const statusLabel = isSpontaneous ? 'SPONTANEOUS (FAVORABLE)' : 'NON-SPONTANEOUS (ENDERGONIC)';
  const colorHex = isSpontaneous ? '#00FF9D' : '#FF0055';
  
  return {
    deltaG: parseFloat(deltaG.toFixed(1)),
    isSpontaneous,
    statusLabel,
    colorHex
  };
}

export function calculateSpectroscopyData(formula, bondType) {
  let lambdaMax = 220;
  let colorHex = '#00F0FF';
  let irStretch = '3000 cm⁻¹';
  let region = 'Far-UV Absorption';

  if (formula.includes('O₂') || formula.includes('H₂O')) {
    lambdaMax = 185; colorHex = '#00F0FF'; irStretch = '3650 cm⁻¹ (O-H Stretch)'; region = 'Vacuum UV';
  } else if (formula.includes('NaCl') || formula.includes('CaO')) {
    lambdaMax = 310; colorHex = '#FFD700'; irStretch = '550 cm⁻¹ (Ionic Lattice Stretch)'; region = 'Near UV';
  } else if (formula.includes('CO₂')) {
    lambdaMax = 230; colorHex = '#00FF9D'; irStretch = '2349 cm⁻¹ (C=O Asymmetric Stretch)'; region = 'Mid-IR Active';
  } else if (formula.includes('Fe₂O₃') || formula.includes('CuO')) {
    lambdaMax = 480; colorHex = '#FF7700'; irStretch = '570 cm⁻¹ (Fe-O Metal-Oxide Stretch)'; region = 'Visible Range (Blue Absorbed)';
  } else if (formula.includes('KMnO₄')) {
    lambdaMax = 525; colorHex = '#BF00FF'; irStretch = '905 cm⁻¹ (Mn=O Charge Transfer)'; region = 'Visible Range (Green Absorbed)';
  } else if (bondType.includes('Ionic')) {
    lambdaMax = 290; colorHex = '#FFD700'; irStretch = '600 cm⁻¹ (Ionic Lattice)'; region = 'UV-Vis Transition';
  } else if (bondType.includes('Polar')) {
    lambdaMax = 245; colorHex = '#00FF9D'; irStretch = '2950 cm⁻¹ (Polar Covalent)'; region = 'Mid-UV Range';
  }

  return { lambdaMax: `${lambdaMax} nm`, colorHex, irStretch, region };
}

export function generateTopCompoundSuggestions(reactantsArray) {
  if (!reactantsArray || reactantsArray.length === 0) return [];

  const presentZ = Array.from(new Set(reactantsArray.map(r => r.z)));
  const sortedSyms = reactantsArray.map(r => r.sym).sort().join('+');
  const directSyms = reactantsArray.map(r => r.sym).join('+');

  const suggestions = [];

  const exactMatch = REACTIONS[sortedSyms] || REACTIONS[directSyms];
  if (exactMatch) {
    suggestions.push({
      name: exactMatch.name,
      formula: exactMatch.formula,
      type: exactMatch.type,
      stability: (exactMatch.stabilityScore || 95.0) + '%',
      enthalpy: exactMatch.enthalpy ? `${exactMatch.enthalpy} kJ/mol` : '-250.0 kJ/mol (Calculated)',
      isExact: true
    });
  }

  if (presentZ.length >= 2) {
    const zA = presentZ[0];
    const zB = presentZ[1];
    const pred = predictCompoundFormula(zA, zB);
    const thermo = calculateThermodynamicStability(zA, zB);

    const isAlreadyAdded = suggestions.some(s => s.formula === pred.formulaStr);
    if (!isAlreadyAdded) {
      suggestions.push({
        name: `Predicted ${pred.formulaStr} (${thermo.bondType})`,
        formula: pred.formulaStr,
        type: thermo.bondType,
        stability: thermo.stabilityScore,
        enthalpy: thermo.bondType.includes('Ionic') ? '-450.0 kJ/mol (Est)' : '-210.0 kJ/mol (Est)',
        isExact: false
      });
    }
  }

  if (suggestions.length < 3 && presentZ.length >= 1) {
    const z = presentZ[0];
    const el = (typeof PERIODIC_DATA !== 'undefined' ? PERIODIC_DATA[z] : null) || { s:'El', n:'Element' };
    
    if (z === 8 || presentZ.includes(8)) {
      suggestions.push({ name: 'Oxide Complex', formula: `${el.s}₂O₃`, type: 'Oxide Lattice', stability: '89.4%', enthalpy: '-520 kJ/mol', isExact: false });
    }
    if (z === 1 || presentZ.includes(1)) {
      suggestions.push({ name: 'Hydride Unit', formula: `H${el.s}`, type: 'Polar Hydride', stability: '86.2%', enthalpy: '-140 kJ/mol', isExact: false });
    }
    if (suggestions.length < 3) {
      suggestions.push({ name: `${el.n} Monatomic Lattice`, formula: `${el.s}₁`, type: 'Pure Element', stability: '99.0%', enthalpy: '0.0 kJ/mol', isExact: false });
    }
  }

  return suggestions.slice(0, 5);
}

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

  const enValA = PAULING_EN[zA] || 1.5;
  const enValB = PAULING_EN[zB] || 2.5;

  const isACation = enValA <= enValB;
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
