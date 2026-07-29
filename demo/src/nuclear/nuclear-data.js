(function exposeNuclearData(root) {
  'use strict';

  const isotopes = {
    p: { id:'p', symbol:'¹H', name:'Proton', Z:1, A:1, massU:1.00782503223 },
    D: { id:'D', symbol:'²H', name:'Deuterium', Z:1, A:2, massU:2.01410177812 },
    T: { id:'T', symbol:'³H', name:'Tritium', Z:1, A:3, massU:3.0160492779 },
    n: { id:'n', symbol:'n', name:'Neutron', Z:0, A:1, massU:1.00866491595 },
    He3: { id:'He3', symbol:'³He', name:'Helium-3', Z:2, A:3, massU:3.0160293201 },
    He4: { id:'He4', symbol:'⁴He', name:'Helium-4', Z:2, A:4, massU:4.00260325413 },
    B11: { id:'B11', symbol:'¹¹B', name:'Boron-11', Z:5, A:11, massU:11.00930536 },
    C12: { id:'C12', symbol:'¹²C', name:'Carbon-12', Z:6, A:12, massU:12 },
    Ne20: { id:'Ne20', symbol:'²⁰Ne', name:'Neon-20', Z:10, A:20, massU:19.9924401762 },
    Na23: { id:'Na23', symbol:'²³Na', name:'Sodium-23', Z:11, A:23, massU:22.9897692820 },
    Mg24: { id:'Mg24', symbol:'²⁴Mg', name:'Magnesium-24', Z:12, A:24 },
    U235: { id:'U235', symbol:'²³⁵U', name:'Uranium-235', Z:92, A:235 },
    U238: { id:'U238', symbol:'²³⁸U', name:'Uranium-238', Z:92, A:238 },
    Pu239: { id:'Pu239', symbol:'²³⁹Pu', name:'Plutonium-239', Z:94, A:239 },
    Cf252: { id:'Cf252', symbol:'²⁵²Cf', name:'Californium-252', Z:98, A:252 },
    Kr92: { id:'Kr92', symbol:'⁹²Kr', name:'Krypton-92', Z:36, A:92 },
    Ba141: { id:'Ba141', symbol:'¹⁴¹Ba', name:'Barium-141', Z:56, A:141 },
    Xe140: { id:'Xe140', symbol:'¹⁴⁰Xe', name:'Xenon-140', Z:54, A:140 },
    Xe134: { id:'Xe134', symbol:'¹³⁴Xe', name:'Xenon-134', Z:54, A:134 },
    Zr103: { id:'Zr103', symbol:'¹⁰³Zr', name:'Zirconium-103', Z:40, A:103 },
    Sr94: { id:'Sr94', symbol:'⁹⁴Sr', name:'Strontium-94', Z:38, A:94 },
    Zr100: { id:'Zr100', symbol:'¹⁰⁰Zr', name:'Zirconium-100', Z:40, A:100 },
    Cs140: { id:'Cs140', symbol:'¹⁴⁰Cs', name:'Caesium-140', Z:55, A:140 },
    Ru110: { id:'Ru110', symbol:'¹¹⁰Ru', name:'Ruthenium-110', Z:44, A:110 }
  };

  const fusion = {
    'H+H': [
      { id:'dt', reactants:['D','T'], products:[['He4',1],['n',1]], qMeV:17.589, label:'Deuterium–Tritium fusion', branch:'dominant laboratory route' },
      { id:'ddn', reactants:['D','D'], products:[['He3',1],['n',1]], qMeV:3.269, label:'Deuterium–Deuterium fusion', branch:'neutron branch ≈50%' },
      { id:'ddp', reactants:['D','D'], products:[['T',1],['p',1]], qMeV:4.033, label:'Deuterium–Deuterium fusion', branch:'proton branch ≈50%' }
    ],
    'B+H': [
      { id:'pb11', reactants:['p','B11'], products:[['He4',3]], qMeV:8.68, label:'Proton–Boron-11 fusion', branch:'aneutronic idealized final products' }
    ],
    'He+He': [
      { id:'he3he3', reactants:['He3','He3'], products:[['He4',1],['p',2]], qMeV:12.86, label:'Helium-3 fusion', branch:'solar-chain branch' }
    ],
    'C+C': [
      { id:'c12c12a', reactants:['C12','C12'], products:[['Ne20',1],['He4',1]], qMeV:4.617, label:'Carbon burning', branch:'alpha branch' },
      { id:'c12c12p', reactants:['C12','C12'], products:[['Na23',1],['p',1]], qMeV:2.241, label:'Carbon burning', branch:'proton branch' }
    ]
  };

  const fission = {
    U: { id:'u235-thermal', reactants:['U235','n'], products:[['Kr92',1],['Ba141',1],['n',3]], qMeV:200, label:'Thermal-neutron fission of Uranium-235', note:'Representative yield channel; real fission has a product distribution.' },
    Pu: { id:'pu239-thermal', reactants:['Pu239','n'], products:[['Xe134',1],['Zr103',1],['n',3]], qMeV:207, label:'Thermal-neutron fission of Plutonium-239', note:'Representative mass-balanced channel, not a unique deterministic split.' },
    Cf: { id:'cf252-spontaneous', reactants:['Cf252'], products:[['Ru110',1],['Xe140',1],['n',2]], qMeV:200, label:'Spontaneous fission of Californium-252', note:'Illustrative mass-balanced channel; measured yields are distributed.' }
  };

  function totals(entries) {
    return entries.reduce((sum, [id, count = 1]) => {
      const isotope = isotopes[id];
      return { A:sum.A + isotope.A * count, Z:sum.Z + isotope.Z * count };
    }, { A:0, Z:0 });
  }

  function validateReaction(reaction) {
    const left = totals(reaction.reactants.map(id => [id, 1]));
    const right = totals(reaction.products);
    const leftMass = reaction.reactants.reduce((sum,id) => sum + (isotopes[id]?.massU ?? NaN),0);
    const rightMass = reaction.products.reduce((sum,[id,count=1]) => sum + (isotopes[id]?.massU ?? NaN) * count,0);
    const qCalculatedMeV = Number.isFinite(leftMass) && Number.isFinite(rightMass)
      ? (leftMass - rightMass) * 931.49410242 : null;
    const qDeltaMeV = Number.isFinite(qCalculatedMeV) ? Math.abs(qCalculatedMeV - reaction.qMeV) : null;
    const conservationValid = left.A === right.A && left.Z === right.Z;
    const qStatus = qDeltaMeV == null ? 'UNVERIFIED' : qDeltaMeV <= 0.03 ? 'VERIFIED' : 'INCONSISTENT';
    const qValid = qStatus === 'VERIFIED';
    const fullyValidated = conservationValid && qValid;
    return {
      valid:conservationValid && qStatus !== 'INCONSISTENT',
      conservationValid,
      qValid,
      qStatus,
      fullyValidated,
      left,
      right,
      qCalculatedMeV,
      qDeltaMeV
    };
  }

  function balancedProductLayout(reaction, spread = 1) {
    const products = reaction.products.flatMap(([id,count=1]) => Array.from({length:count},() => isotopes[id]));
    const count = products.length;
    const directions = products.map((_,index) => {
      if (count === 1) return {x:0,y:0,z:0};
      if (count === 2) return {x:index === 0 ? -1 : 1,y:0,z:0};
      if (count === 3) {
        const angle = index * Math.PI * 2 / 3;
        return {x:Math.cos(angle),y:Math.sin(angle),z:0};
      }
      const y = 1 - (index / Math.max(1,count - 1)) * 2;
      const ring = Math.sqrt(Math.max(0,1-y*y));
      const theta = Math.PI * (3-Math.sqrt(5)) * index;
      return {x:Math.cos(theta)*ring,y,z:Math.sin(theta)*ring};
    });
    const totalA = products.reduce((sum,isotope) => sum + isotope.A,0);
    const center = directions.reduce((sum,direction,index) => ({
      x:sum.x + direction.x * products[index].A,
      y:sum.y + direction.y * products[index].A,
      z:sum.z + direction.z * products[index].A
    }),{x:0,y:0,z:0});
    center.x /= Math.max(1,totalA);
    center.y /= Math.max(1,totalA);
    center.z /= Math.max(1,totalA);
    return products.map((isotope,index) => ({
      id:isotope.id,
      A:isotope.A,
      Z:isotope.Z,
      x:(directions[index].x-center.x)*spread,
      y:(directions[index].y-center.y)*spread,
      z:(directions[index].z-center.z)*spread
    }));
  }

  root.NULLA_NUCLEAR = Object.freeze({ isotopes, fusion, fission, totals, validateReaction, balancedProductLayout });
})(globalThis);
