# NULLA-LABS Verification Record

## Reproducible commands

```powershell
node --check demo/app.js
node demo/tests/smoke.mjs
git diff --check
```

## Verified runtime scenarios

| Scenario | Expected contract | Observed result |
|---|---|---|
| Default startup | B-DNA, no blank canvas | Pass |
| Na + Cl chemical combination | NaCl rock-salt display, nearest neighbours only | 27 ions, 54 bonds |
| K + Br chemical combination | Catalogue geometry selects rock-salt builder | `compound-KBr`, 27 ions, 54 bonds |
| H + H nuclear fusion | D-T evaluated channel, FPS-independent completion | `nuclear-dt`, 5 particles, 0 chemical bonds |
| U-235 fission | Two visible fragments plus three neutrons | 191 particles, 0 chemical bonds |
| Shared D-T URL | Restore through nuclear, not chemical, engine | Pass |
| Material transition soak | 60 alternating material changes | Renderer geometries remained at 3; textures at 1 |
| Arabic nuclear result | RTL and translated core state telemetry | Pass |
| Mobile 390×844 | Telemetry and periodic controller do not overlap | Pass |
| Desktop 1440×900 | Existing composition remains intact | Pass |

## Scientific boundaries

- Chemical products are created only from the catalogue; unknown combinations are rejected.
- Nuclear channels operate on isotopes and must conserve mass number `A` and atomic number `Z`.
- Fission entries are representative evaluated channels, not deterministic yield predictions.
- Particle motion and phase visuals are educational models, not ab-initio molecular dynamics.
- Nuclear timing, scale, plasma, shockwave, and fragment motion are illustrative, not reactor simulation.
- Lennard-Jones is a reduced pair model. Ionic crystals additionally require electrostatic treatment for predictive dynamics.

## Release state

The work is isolated on `codex/system-completion`. No public deployment is authorized
or performed. The baseline backup remains available at
`backups/2026-07-25_1553_45d9fe0`.

