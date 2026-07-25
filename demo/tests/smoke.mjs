import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');

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

console.log('Smoke contracts passed.');
