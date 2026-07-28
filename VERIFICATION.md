# NULLA-LABS Verification Record

## Reproducible commands

```powershell
node --check demo/app.js
node demo/tests/smoke.mjs
node demo/tests/release-baseline.mjs
git diff --check
```

## v101 progressive-science verification

- `MODO BÁSICO` is the default disclosure layer; Laboratory and Scientific Data
  toggle visibility and accessibility only, preserving one renderer and one state.
- The seven tutorial missions have stable IDs, real DOM targets and equivalent
  content in all eleven locales. Progress is checked against runtime state.
- Chemical combination and physical mixing are separate controls.
- Fusion Q is mass-derived and verified; fission Q is explicitly representative
  and unverified when channel masses are incomplete. Every route still conserves A/Z.
- Nuclear products use an A-weighted balanced layout; automated tests reject overlap
  and non-zero mass-weighted centre for all seven fusion and three fission routes.
- Partial phase profiles no longer enable the temperature controller. Solvation
  reports when its fixed shell is outside liquid-phase applicability.
- Schematic B-DNA no longer claims TP53, calibrated Å scale or predictive phase data.
- XYZ export is blocked for nuclear or uncalibrated structures and converts calibrated
  world coordinates to Å.
- The local server returned HTTP 200 for the page and every one of its 18 runtime
  scripts with the unified `v=101.0` cache key.

## Verified runtime scenarios

| Scenario | Expected contract | Observed result |
|---|---|---|
| Default startup | B-DNA, no blank canvas | Pass |
| Na + Cl chemical combination | NaCl rock-salt display, nearest neighbours only | 216 ions (108/108), 540 bonds, interior CN=6 |
| H + C + N combination | Explicit molecular graph and unavailable phase handling | HCN, 3 atoms, BO1×1 + BO3×1, thermal disabled |
| D-T nuclear fusion | Isotope-selected, FPS-independent completion | `nuclear-dt`, A=5, 5 nucleons, 0 chemical bonds |
| C-12 + C-12 fusion | Selectable alpha branch, A/Z conservation | `nuclear-c12c12a`, A=24, 24 nucleons |
| U-235 fission | Two visible fragments plus three neutrons | `nuclear-u235-thermal`, A=236, 236 nucleons, 0 bonds |
| Shared D-T URL | Restore through nuclear, not chemical, engine | Pass |
| Six-material topology matrix | NaCl, diamond, C60, SWCNT, graphene, solvation | 216/216/60/384/218/37 atoms; all coordinates finite |
| Material transition soak | 60 alternating material changes | Geometries ≤3; textures ≤1; runtime errors 0 |
| Arabic dynamic telemetry | Korean→Arabic live remap, RTL, tutorial and quiz | Pass; no stale-language values |
| Mobile 390×844 | Telemetry and periodic controller remain separate; nuclear controls visible | Pass |
| Desktop 1440×900 | Existing composition remains intact | Pass |

## Scientific boundaries

- Chemical products are created only from the catalogue; unknown combinations are rejected.
- Nuclear channels operate on isotopes and must conserve mass number `A` and atomic number `Z`.
- Fission entries are representative evaluated channels, not deterministic yield predictions.
- Particle motion and phase visuals are educational models, not ab-initio molecular dynamics.
- Nuclear timing, scale, plasma, shockwave, and fragment motion are illustrative, not reactor simulation.
- Lennard-Jones is a reduced pair model. Ionic crystals additionally require electrostatic treatment for predictive dynamics.

## Release state

The v101 automated gates pass on `codex/system-completion` and GitHub Pages. The
release files are frozen by the portable SHA-256 manifest in
`demo/tests/release-baseline.json`. The v100 rollback is preserved by tag
`demo-v100.0.0`, branch `backup/pre-basic-mode-20260728`, and physical archive
`backups/SteveBlackbeard-demo-v100.0.0-20abb92.zip`.

The in-app browser automation transport failed before page attachment with an
environment asset-path error. This is recorded as unavailable rather than reported
as a v101 visual pass. Local/public HTTP checks and prior v100 visual evidence passed;
final human visual comparison remains a manual release review.
