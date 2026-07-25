import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const nuclearSource = readFileSync(new URL('../src/nuclear/nuclear-data.js', import.meta.url), 'utf8');
const i18nSource = readFileSync(new URL('../src/i18n/i18n.js', import.meta.url), 'utf8');
const chemistrySource = readFileSync(new URL('../src/chemistry/verified-reactions.js', import.meta.url), 'utf8');
const compatibilitySource = readFileSync(new URL('../src/analysis/compatibility-engine.js', import.meta.url), 'utf8');

const materials = [
  ['btn-nacl', 'buildNaclCrystal'],
  ['btn-diamond', 'buildDiamondLattice'],
  ['btn-c60', 'buildFullereneC60'],
  ['btn-nanotube', 'buildCarbonNanotube'],
  ['btn-graphene', 'buildGrapheneSheet'],
  ['btn-solvation', 'buildSolvationShell']
];

for (const [buttonId, builder] of materials) {
  assert.match(html, new RegExp(`id="${buttonId}"`), `missing ${buttonId}`);
  assert.match(app, new RegExp(`function ${builder}\\(`), `missing ${builder}`);
  assert.match(app, new RegExp(`'${buttonId}': ${builder}`), `uncoupled ${buttonId}`);
}

assert.doesNotMatch(html, /id="btn-cell"|organelle-nav-panel/, 'cell UI must stay removed');
assert.doesNotMatch(app, /buildEukaryoticCell/, 'cell builder must stay removed');
assert.match(app, /new MediaRecorder\(/, 'video recorder is not connected');
assert.match(app, /lennardJonesForceMagnitude/, 'Lennard-Jones model is absent');
assert.match(app, /activeThermalProfile/, 'material-specific phase profile is absent');
assert.match(app, /angstromPerWorldUnit/, 'physical measurement scale is absent');
assert.match(html, /btn-nuclear-fusion/, 'nuclear fusion control is absent');
assert.match(html, /btn-nuclear-fission/, 'nuclear fission control is absent');
assert.doesNotMatch(app, /zSum\s*>\s*118/, 'atomic-number addition must never fabricate fission');
assert.match(app, /formNuclearProducts/, 'nuclear products are not rendered');
assert.match(html, /id="runtime-diagnostics"/, 'runtime diagnostics output is absent');
assert.match(app, /getDiagnosticsSnapshot/, 'runtime diagnostics are not connected');
assert.match(app, /disposeLabelSprite/, 'label texture disposal is not centralized');

const nuclearSandbox = {};
nuclearSandbox.globalThis = nuclearSandbox;
vm.runInNewContext(nuclearSource, nuclearSandbox);
const nuclear = nuclearSandbox.NULLA_NUCLEAR;
for (const routes of Object.values(nuclear.fusion)) {
  for (const reaction of routes) assert.equal(nuclear.validateReaction(reaction).valid, true, `${reaction.id} violates A/Z conservation`);
}
for (const reaction of Object.values(nuclear.fission)) {
  assert.equal(nuclear.validateReaction(reaction).valid, true, `${reaction.id} violates A/Z conservation`);
}

const i18nSandbox = {
  document:{ addEventListener(){} },
  CustomEvent:class {},
  globalThis:null
};
i18nSandbox.globalThis = i18nSandbox;
vm.runInNewContext(i18nSource, i18nSandbox);
const catalogs = i18nSandbox.NULLA_I18N.messages;
assert.equal(Object.keys(catalogs).length, 11, 'exactly 11 Chronolith locales are required');
const canonicalKeys = Object.keys(catalogs.es).sort();
for (const [locale, catalog] of Object.entries(catalogs)) {
  assert.deepEqual(Object.keys(catalog).sort(), canonicalKeys, `${locale} translation keys diverge`);
  assert.ok(Object.values(catalog).every(value => String(value).trim()), `${locale} contains an empty translation`);
}

const chemistrySandbox = {};
chemistrySandbox.globalThis = chemistrySandbox;
vm.runInNewContext(chemistrySource, chemistrySandbox);
const subscriptDigits = {'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9'};
function parseFormula(formula) {
  const normalized = formula.replace(/[₀-₉]/g, digit => subscriptDigits[digit]);
  const counts = {};
  for (const match of normalized.matchAll(/([A-Z][a-z]?)(\d*)/g)) counts[match[1]] = (counts[match[1]] || 0) + Number(match[2] || 1);
  return counts;
}
for (const [key, reaction] of Object.entries(chemistrySandbox.NULLA_VERIFIED_REACTIONS)) {
  const formulaCounts = parseFormula(reaction.formula);
  const symbolsByZ = {1:'H',3:'Li',5:'B',6:'C',7:'N',8:'O',9:'F',11:'Na',12:'Mg',13:'Al',16:'S',17:'Cl',19:'K',20:'Ca',22:'Ti',26:'Fe',29:'Cu',30:'Zn',35:'Br',47:'Ag',53:'I',56:'Ba'};
  const atomCounts = Object.fromEntries(reaction.atoms.map(group => [symbolsByZ[group.z], group.c]));
  assert.deepEqual(formulaCounts, atomCounts, `${key} formula does not match atom groups`);
  assert.equal(reaction.evidenceLevel, 'CATALOGUED', `${key} lacks evidence classification`);
}

const compatibilitySandbox = {};
compatibilitySandbox.globalThis = compatibilitySandbox;
vm.runInNewContext(compatibilitySource, compatibilitySandbox);
const compatibility = compatibilitySandbox.NULLA_COMPATIBILITY;
const unknownCompatibility = compatibility.chemical({reactants:[],reaction:null,temperatureK:298});
assert.equal(unknownCompatibility.status, 'NO_CATALOGUED_PATH');
assert.equal(unknownCompatibility.score, null);
const knownCompatibility = compatibility.chemical({
  reactants:[{electronegativity:0.82},{electronegativity:2.96}],
  reaction:chemistrySandbox.NULLA_VERIFIED_REACTIONS['Br+K'],
  temperatureK:298
});
assert.match(knownCompatibility.status, /^CATALOGUED_/);
assert.ok(knownCompatibility.factors.some(item => item.includes('Δχ=')));
const dtCompatibility = compatibility.nuclear({reaction:nuclear.fusion['H+H'][0],isotopes:nuclear.isotopes});
assert.equal(dtCompatibility.status, 'EXOENERGETIC_EVALUATED_CHANNEL');
assert.ok(dtCompatibility.barrierMeV > 0);

console.log('Smoke contracts passed.');
