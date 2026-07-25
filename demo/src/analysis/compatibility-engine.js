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
        factors:['No balanced catalogue entry for this selection'],
        requirements:['Experimental data or an explicitly labelled estimate'],
        instability:['Unknown products, kinetics, and competing pathways']
      };
    }
    const electronegativities = reactants.map(item => Number(item.electronegativity)).filter(Number.isFinite);
    const deltaEN = electronegativities.length >= 2 ? Math.max(...electronegativities) - Math.min(...electronegativities) : null;
    if (deltaEN !== null) factors.push(`Δχ=${deltaEN.toFixed(2)} (${deltaEN >= 1.7 ? 'ionic tendency' : deltaEN >= 0.4 ? 'polar/covalent tendency' : 'low polarity contrast'})`);
    factors.push(`Catalogue: ${reaction.evidenceLevel || 'LEGACY_ENTRY'}`);
    if (reaction.enthalpy !== undefined) factors.push(`ΔH=${reaction.enthalpy} kJ/mol`);
    else requirements.push('Formation enthalpy not supplied');
    if (!reaction.activationEnergy) requirements.push('Activation energy/kinetics not modelled');
    if (!reaction.pressure) requirements.push('Reference pressure assumed: 1 atm');
    if (!reaction.temperatureRange) requirements.push(`Displayed at ${temperatureK} K; validated reaction range unavailable`);
    if (/metastable|decompose|unstable/i.test(reaction.note || '')) instability.push(reaction.note);
    const evidence = reaction.evidenceLevel === 'CATALOGUED' ? 0.78 : 0.55;
    const thermo = reaction.enthalpy !== undefined ? (reaction.enthalpy < 0 ? 0.12 : -0.05) : 0;
    const score = clamp01(evidence + thermo - requirements.length * 0.035);
    return {
      domain:'chemical',
      status:score >= 0.8 ? 'CATALOGUED_FAVORABLE' : score >= 0.6 ? 'CATALOGUED_CONDITION_DEPENDENT' : 'CATALOGUED_INCOMPLETE_DATA',
      score, confidence:reaction.evidenceLevel === 'CATALOGUED' ? 0.75 : 0.5,
      factors, requirements, instability
    };
  }

  function nuclear({ reaction, isotopes }) {
    if (!reaction) return {domain:'nuclear',status:'NO_EVALUATED_CHANNEL',score:null,confidence:0,factors:[],requirements:['Select an evaluated isotope channel'],instability:['Unknown cross section and products']};
    const reactants = reaction.reactants.map(id => isotopes[id]);
    const charged = reactants.filter(item => item && item.Z > 0);
    let barrierMeV = 0;
    if (charged.length >= 2) {
      const [a,b] = charged;
      barrierMeV = (1.44 * a.Z * b.Z) / (1.2 * (Math.cbrt(a.A) + Math.cbrt(b.A)));
    }
    const qPositive = Number(reaction.qMeV) > 0;
    const factors = [`Q≈${reaction.qMeV} MeV`, `A/Z conservation required`];
    if (barrierMeV) factors.push(`Coulomb barrier≈${barrierMeV.toFixed(2)} MeV (contact estimate)`);
    const requirements = reaction.id.includes('thermal') ? ['Thermal neutron capture'] : barrierMeV ? [`Center-of-mass energy/tunnelling sufficient to cross ≈${barrierMeV.toFixed(2)} MeV barrier`] : [];
    const instability = [];
    if (reaction.note) instability.push(reaction.note);
    if (reaction.branch) instability.push(`Competing branch: ${reaction.branch}`);
    return {
      domain:'nuclear', status:qPositive ? 'EXOENERGETIC_EVALUATED_CHANNEL' : 'ENERGY_INPUT_REQUIRED',
      score:null, confidence:0.85, barrierMeV, factors, requirements, instability
    };
  }

  root.NULLA_COMPATIBILITY = Object.freeze({ chemical, nuclear });
})(globalThis);
