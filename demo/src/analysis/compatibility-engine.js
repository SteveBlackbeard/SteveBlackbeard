(function exposeCompatibilityEngine(root) {
  'use strict';

  function clamp01(value) { return Math.max(0, Math.min(1, value)); }

  function chemical({ reactants, reaction, temperatureK = 298 }) {
    const factors = [];
    const requirements = [];
    const instability = [];
    if (!reaction) {
      return {
        domain:'chemical', status:'NO_CATALOGUED_PATH', score:null, confidence:0,
        factors:['CATALOGUE: N/D'],
        requirements:['ΔHf°, Ea and k(T): N/D'],
        instability:['Products / competing pathways: N/D']
      };
    }
    const electronegativities = reactants.map(item => Number(item.electronegativity)).filter(Number.isFinite);
    const deltaEN = electronegativities.length >= 2 ? Math.max(...electronegativities) - Math.min(...electronegativities) : null;
    if (deltaEN !== null) factors.push(`Δχ=${deltaEN.toFixed(2)}`);
    factors.push(`CATALOGUE: ${reaction.evidenceLevel || 'LEGACY_ENTRY'}`);
    if (reaction.enthalpy !== undefined) factors.push(`ΔH=${reaction.enthalpy} kJ/mol`);
    else requirements.push('ΔHf°: N/D');
    if (!reaction.activationEnergy) requirements.push('Ea / k(T): N/D');
    if (!reaction.pressure) requirements.push('p° ≈ 1 atm · SOURCE: N/D');
    if (!reaction.temperatureRange) requirements.push(`T=${temperatureK} K · RANGE: N/D`);
    if (/metastable|decompose|unstable/i.test(reaction.note || '')) instability.push(reaction.note);
    const suppliedFields = ['enthalpy','activationEnergy','pressure','temperatureRange']
      .filter(field => reaction[field] !== undefined && reaction[field] !== null).length;
    const score = clamp01((reaction.evidenceLevel === 'CATALOGUED' ? 0.55 : 0.35) + suppliedFields * 0.1125);
    return {
      domain:'chemical',
      status:reaction.evidenceLevel === 'CATALOGUED'
        ? (score >= 0.9 ? 'CATALOGUED_CONDITION_DEPENDENT' : 'CATALOGUED_INCOMPLETE_DATA')
        : 'REFERENCE_MODEL_INCOMPLETE_DATA',
      score, confidence:reaction.evidenceLevel === 'CATALOGUED' ? 0.75 : 0.5,
      factors, requirements, instability
    };
  }

  function nuclear({ reaction, isotopes }) {
    if (!reaction) return {domain:'nuclear',status:'NO_EVALUATED_CHANNEL',score:null,confidence:0,factors:[],requirements:['ISOTOPE CHANNEL: N/D'],instability:['σ(E) / products: N/D']};
    const reactants = reaction.reactants.map(id => isotopes[id]);
    const charged = reactants.filter(item => item && item.Z > 0);
    let barrierMeV = 0;
    if (charged.length >= 2) {
      const [a,b] = charged;
      barrierMeV = (1.44 * a.Z * b.Z) / (1.2 * (Math.cbrt(a.A) + Math.cbrt(b.A)));
    }
    const qPositive = Number(reaction.qMeV) > 0;
    const factors = [`Q≈${reaction.qMeV} MeV`, 'A/Z: CONSERVED'];
    if (barrierMeV) factors.push(`V꜀≈${barrierMeV.toFixed(2)} MeV (contact estimate)`);
    const requirements = reaction.id.includes('thermal') ? ['nₜₕ + TARGET'] : barrierMeV ? [`E_cm / P_tunnel → V꜀≈${barrierMeV.toFixed(2)} MeV`] : [];
    const instability = [];
    if (reaction.note) instability.push('YIELDS = DISTRIBUTED · CHANNEL ≠ UNIQUE');
    if (reaction.branch) instability.push('BRANCH SET ≠ UNIQUE');
    return {
      domain:'nuclear', status:qPositive ? 'EXOENERGETIC_EVALUATED_CHANNEL' : 'ENERGY_INPUT_REQUIRED',
      score:null, confidence:0.85, barrierMeV, factors, requirements, instability
    };
  }

  root.NULLA_COMPATIBILITY = Object.freeze({ chemical, nuclear });
})(globalThis);
