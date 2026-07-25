(function exposeVerifiedChemistry(root) {
  'use strict';
  const reactions = {
    'Br+K': {name:'Potassium Bromide',formula:'KBr',atoms:[{z:19,c:1},{z:35,c:1}],type:'Ionic Crystal',bonds:'K⁺ Br⁻ ionic lattice',state:'Solid (25°C)',geom:'Rock-salt lattice',evidenceLevel:'CATALOGUED'},
    'F+Li': {name:'Lithium Fluoride',formula:'LiF',atoms:[{z:3,c:1},{z:9,c:1}],type:'Ionic Crystal',bonds:'Li⁺ F⁻ ionic lattice',state:'Solid (25°C)',geom:'Rock-salt lattice',evidenceLevel:'CATALOGUED'},
    'Ca+F': {name:'Calcium Fluoride',formula:'CaF₂',atoms:[{z:20,c:1},{z:9,c:2}],type:'Ionic Crystal',bonds:'Ca²⁺ F⁻ ionic lattice',state:'Solid (25°C)',geom:'Fluorite lattice',evidenceLevel:'CATALOGUED'},
    'Br+Na': {name:'Sodium Bromide',formula:'NaBr',atoms:[{z:11,c:1},{z:35,c:1}],type:'Ionic Crystal',bonds:'Na⁺ Br⁻ ionic lattice',state:'Solid (25°C)',geom:'Rock-salt lattice',evidenceLevel:'CATALOGUED'},
    'Ag+Cl': {name:'Silver Chloride',formula:'AgCl',atoms:[{z:47,c:1},{z:17,c:1}],type:'Ionic Solid',bonds:'Ag⁺ Cl⁻',state:'Solid (25°C)',geom:'Rock-salt lattice',evidenceLevel:'CATALOGUED'},
    'Ag+Br': {name:'Silver Bromide',formula:'AgBr',atoms:[{z:47,c:1},{z:35,c:1}],type:'Ionic Solid',bonds:'Ag⁺ Br⁻',state:'Solid (25°C)',geom:'Rock-salt lattice',evidenceLevel:'CATALOGUED'},
    'Ag+I': {name:'Silver Iodide',formula:'AgI',atoms:[{z:47,c:1},{z:53,c:1}],type:'Ionic Solid',bonds:'Ag⁺ I⁻',state:'Solid (25°C)',geom:'Wurtzite/zinc-blende polymorphs',evidenceLevel:'CATALOGUED'},
    'Cu+S': {name:'Copper(II) Sulfide',formula:'CuS',atoms:[{z:29,c:1},{z:16,c:1}],type:'Ionic/Covalent Solid',bonds:'Cu–S lattice bonding',state:'Solid (25°C)',geom:'Covellite lattice',evidenceLevel:'CATALOGUED'},
    'Fe+S': {name:'Iron(II) Sulfide',formula:'FeS',atoms:[{z:26,c:1},{z:16,c:1}],type:'Ionic/Covalent Solid',bonds:'Fe–S lattice bonding',state:'Solid (25°C)',geom:'Troilite-like lattice',evidenceLevel:'CATALOGUED'},
    'S+Zn': {name:'Zinc Sulfide',formula:'ZnS',atoms:[{z:30,c:1},{z:16,c:1}],type:'Ionic/Covalent Solid',bonds:'Zn–S tetrahedral network',state:'Solid (25°C)',geom:'Zinc-blende/wurtzite',evidenceLevel:'CATALOGUED'},
    'H+I': {name:'Hydrogen Iodide',formula:'HI',atoms:[{z:1,c:1},{z:53,c:1}],type:'Polar Covalent',bonds:'H–I polar covalent',state:'Gas (25°C)',geom:'Linear',evidenceLevel:'CATALOGUED'},
    'Mg+N': {name:'Magnesium Nitride',formula:'Mg₃N₂',atoms:[{z:12,c:3},{z:7,c:2}],type:'Ionic Solid',bonds:'Mg²⁺ N³⁻ lattice',state:'Solid (25°C)',geom:'Antibixbyite lattice',evidenceLevel:'CATALOGUED'},
    'Ca+N': {name:'Calcium Nitride',formula:'Ca₃N₂',atoms:[{z:20,c:3},{z:7,c:2}],type:'Ionic Solid',bonds:'Ca²⁺ N³⁻ lattice',state:'Solid (25°C)',geom:'Antibixbyite lattice',evidenceLevel:'CATALOGUED'},
    'Al+N': {name:'Aluminium Nitride',formula:'AlN',atoms:[{z:13,c:1},{z:7,c:1}],type:'Covalent/Ionic Network',bonds:'Al–N tetrahedral network',state:'Solid (25°C)',geom:'Wurtzite lattice',evidenceLevel:'CATALOGUED'},
    'B+N': {name:'Boron Nitride',formula:'BN',atoms:[{z:5,c:1},{z:7,c:1}],type:'Covalent Network',bonds:'B–N covalent network',state:'Solid (25°C)',geom:'Hexagonal/cubic polymorphs',evidenceLevel:'CATALOGUED'},
    'O+Ti': {name:'Titanium Dioxide',formula:'TiO₂',atoms:[{z:22,c:1},{z:8,c:2}],type:'Ionic/Covalent Solid',bonds:'Ti–O network',state:'Solid (25°C)',geom:'Rutile/anatase polymorphs',evidenceLevel:'CATALOGUED'},
    'Cl+Li': {name:'Lithium Chloride',formula:'LiCl',atoms:[{z:3,c:1},{z:17,c:1}],type:'Ionic Crystal',bonds:'Li⁺ Cl⁻ lattice',state:'Solid (25°C)',geom:'Rock-salt lattice',evidenceLevel:'CATALOGUED'},
    'Ba+O': {name:'Barium Oxide',formula:'BaO',atoms:[{z:56,c:1},{z:8,c:1}],type:'Ionic Solid',bonds:'Ba²⁺ O²⁻ lattice',state:'Solid (25°C)',geom:'Rock-salt lattice',evidenceLevel:'CATALOGUED'},
    'K+O': {name:'Potassium Oxide',formula:'K₂O',atoms:[{z:19,c:2},{z:8,c:1}],type:'Ionic Solid',bonds:'K⁺ O²⁻ lattice',state:'Solid (25°C)',geom:'Antifluorite lattice',evidenceLevel:'CATALOGUED'},
    'C+Ti': {name:'Titanium Carbide',formula:'TiC',atoms:[{z:22,c:1},{z:6,c:1}],type:'Interstitial Ceramic',bonds:'Ti–C mixed metallic/covalent',state:'Solid (25°C)',geom:'Rock-salt lattice',evidenceLevel:'CATALOGUED'}
  };
  root.NULLA_VERIFIED_REACTIONS = Object.freeze(reactions);
})(globalThis);
