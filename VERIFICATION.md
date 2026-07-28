# NULLA-LABS Verification Record

## Reproducible commands

```powershell
node --check demo/app.js
node demo/tests/smoke.mjs
node demo/tests/release-baseline.mjs
git diff --check
```

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

All release gates pass on `codex/system-completion`. The user explicitly authorized
commit and push. The release files are frozen by the SHA-256 manifest in
`demo/tests/release-baseline.json`; the physical backup remains available at
`backups/2026-07-25_1553_45d9fe0`.
