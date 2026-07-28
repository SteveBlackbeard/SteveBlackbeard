# NULLA-LABS Verification Record

## Reproducible commands

```powershell
node --check demo/app.js
node demo/tests/smoke.mjs
node demo/tests/release-baseline.mjs
git diff --check
```

## v101.1 progressive-science verification

- `MODO BÁSICO` is the default disclosure layer; Laboratory and Scientific Data
  toggle visibility and accessibility only, preserving one renderer and one state.
- The seven tutorial missions have stable IDs, real DOM targets and equivalent
  content in all eleven locales. Progress is checked against runtime state.
- Chemical combination and physical mixing are separate controls.
- Fusion Q is mass-derived and verified; fission Q is explicitly representative
  and unverified when channel masses are incomplete. Every route still conserves A/Z.
- A route selected from the opposite nuclear domain is rejected explicitly; fusion
  can never substitute a selected fission channel (or vice versa) with a default.
- Nuclear products use an A-weighted balanced layout; automated tests reject overlap
  and non-zero mass-weighted centre for all seven fusion and three fission routes.
- Partial phase profiles no longer enable the temperature controller. Solvation
  reports when its fixed shell is outside liquid-phase applicability.
- Schematic B-DNA no longer claims TP53, calibrated Å scale or predictive phase data.
- XYZ, glTF coordinate and USDA exports are blocked for nuclear or uncalibrated
  structures. Calibrated glTF translations use metres; USDA declares `metersPerUnit`.
- The local v101.1 candidate returned HTTP 200 for the page and all 18 runtime scripts.
  GitHub Pages run `30344414867` and companion telemetry run `30344416491` passed
  for commit `8e31545`; all 19 allowlisted public files match the portable hashes.
- `/demo/tests/smoke.mjs`, `/demo/ARCHITECTURE.md` and
  `/demo/SCIENTIFIC_METHOD.md` return 404, proving the Pages allowlist excludes
  internal tests and documentation.

## Evidence matrix

| Scenario | Automated evidence | State |
|---|---|---|
| 118 elements and phase thresholds | Pure/static contracts | PASS |
| Curated compositions | Formula/composition audit plus catalogue contracts | PASS; P₄O₁₀ cage now exact |
| Seven fusion + three fission routes | A/Z, Q status and balanced-layout contracts | PASS |
| Opposite-domain nuclear selector | Static regression contract | PASS |
| Eleven locales, tutorial and accessible labels | Exact key parity and stable target contracts | PASS |
| Default startup and canvas rendering | No current executable browser attachment | PENDING |
| Six material buttons and integrated temperature motion | No current executable browser attachment | PENDING |
| Full tutorial interaction, recording, sharing, WebXR | No current executable browser attachment/device | PENDING |
| Mobile/desktop visual comparison and WebGL soak | No current approved artifact | PENDING |

## Scientific boundaries

- Chemical products are created only from the catalogue; unknown combinations are rejected.
- Nuclear channels operate on isotopes and must conserve mass number `A` and atomic number `Z`.
- Fission entries are representative evaluated channels, not deterministic yield predictions.
- Particle motion and phase visuals are educational models, not ab-initio molecular dynamics.
- Nuclear timing, scale, plasma, shockwave, and fragment motion are illustrative, not reactor simulation.
- Lennard-Jones is a reduced pair model. Ionic crystals additionally require electrostatic treatment for predictive dynamics.

## Release state

The v101.1 static and pure-science gates are the release-candidate gates on
`codex/system-completion`. The
release files are frozen by the portable SHA-256 manifest in
`demo/tests/release-baseline.json`. The v100 rollback is preserved by tag
`demo-v100.0.0`, branch `backup/pre-basic-mode-20260728`, and physical archive
`backups/SteveBlackbeard-demo-v100.0.0-20abb92.zip`.

The in-app browser automation transport failed before page attachment with an
environment asset-path error. This is recorded as unavailable rather than reported
as a v101.1 visual pass. Public HTTP/hash verification passes; final desktop/mobile
visual comparison and integrated WebGL interaction remain a manual release review.
