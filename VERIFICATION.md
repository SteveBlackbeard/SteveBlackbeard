# NULLA-LABS Verification Record

## Reproducible commands

```powershell
node --check demo/app.js
node demo/tests/smoke.mjs
node demo/tests/release-baseline.mjs
git diff --check
```

## v101.2 progressive-science verification

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
- The local v101.2 candidate returned HTTP 200 for the page and all 18 runtime scripts.
  Public v101.2 HTTP/SHA verification remains pending until this candidate is pushed.
- The latest published v101.1 evidence is GitHub Pages run `30344648961` and
  companion telemetry run `30344648907` for commit `46e97d6`; all 19 allowlisted
  public files match that release's portable hashes. This is rollback evidence,
  not a claim that the v101.2 candidate is already deployed.
- `/demo/tests/smoke.mjs`, `/demo/ARCHITECTURE.md` and
  `/demo/SCIENTIFIC_METHOD.md` return 404, proving the Pages allowlist excludes
  internal tests and documentation.

## Browser runtime evidence

The final browser audit captured the following empirical diagnostics. The startup
baseline was the published v101.1 build; the corrected zero-bond mixture and final
i18n/accessibility checks were exercised on the local v101.2 candidate. Public
v101.2 hashes remain a post-push gate.

| Scenario | Observed result |
|---|---|
| Startup B-DNA | 650 visual particles; zero runtime errors |
| Materials | NaCl 216/540 atoms/bonds; diamond 216/333; C60 60/90; nanotube 384/564; graphene 218/307; solvation 37/24 |
| Temperature boundaries | Solvation checked at 273, 298, 373 and 400 K; NaCl at 1073, 1074, 1200, 1738 and 1800 K |
| Chemical combination | NaCl product reached 216 atoms and 540 explicit bonds |
| Physical mixture | Local v101.2 Na/Cl mixture reached 41 particles and exactly zero bonds |
| D-T fusion | 5 nucleons (`p=2`, `n=3`); mass-derived `Q=17.589 MeV` |
| U-235 + n fission | 236 nucleons (`p=92`, `n=144`); Q disclosed as representative |
| Nuclear domain mismatch | Opposite-domain selected route was rejected; no fallback route ran |
| Internationalization | All 11 locale controls and ARIA labels exercised; Arabic RTL verified |
| Responsive layout | 390x844 and 768x1024 checked with `overflowX=0` |
| Tutorial | Mission 1 completed from runtime state and advanced to the next mission |

## Evidence matrix

| Scenario | Automated evidence | State |
|---|---|---|
| 118 elements and phase thresholds | Pure/static contracts | PASS |
| Curated compositions | Formula/composition audit plus catalogue contracts | PASS; P₄O₁₀ cage now exact |
| Seven fusion + three fission routes | A/Z, Q status and balanced-layout contracts | PASS |
| Opposite-domain nuclear selector | Static regression contract | PASS |
| Eleven locales and accessible labels | Exact key parity plus browser UI/ARIA/RTL sweep | PASS |
| Default startup and canvas rendering | Browser diagnostics; v101.2 does not alter scene geometry | PASS |
| Six material buttons and integrated temperature motion | Browser counts and boundary-temperature sweep | PASS |
| Chemical combination versus physical mixture | Browser atom/bond diagnostics | PASS |
| D-T fusion, U-235 fission and domain mismatch | Browser nucleon/Q/status diagnostics | PASS |
| Tutorial mission 1 | Runtime-state completion and navigation | PASS |
| Recording and WebXR | Requires compatible capture/browser/headset capability | DEVICE PENDING |
| Visual/responsive layout | Browser checks at 390x844 and 768x1024 | PASS AT TESTED VIEWPORTS |
| Long-duration soak and automated pixel-golden regression | No current reproducible artifact | NON-BLOCKING FOLLOW-UP |

## Scientific boundaries

- Chemical products are created only from the catalogue; unknown combinations are rejected.
- Nuclear channels operate on isotopes and must conserve mass number `A` and atomic number `Z`.
- Fission entries are representative evaluated channels, not deterministic yield predictions.
- Particle motion and phase visuals are educational models, not ab-initio molecular dynamics.
- Nuclear timing, scale, plasma, shockwave, and fragment motion are illustrative, not reactor simulation.
- Lennard-Jones is a reduced pair model. Ionic crystals additionally require electrostatic treatment for predictive dynamics.

## Release state

The v101.2 static and pure-science gates are the release-candidate gates on
`codex/system-completion`. The
release files are frozen by the portable SHA-256 manifest in
`demo/tests/release-baseline.json`. The v100 rollback is preserved by tag
`demo-v100.0.0`, branch `backup/pre-basic-mode-20260728`, and physical archive
`backups/SteveBlackbeard-demo-v100.0.0-20abb92.zip`.

An initial in-app browser transport failed before attachment with an environment
asset-path error; a subsequent real-browser audit produced the scenario evidence
above. Recording and WebXR remain device/capability gates and were not promoted to
passes. The previous v101.1 public HTTP/hash verification passes; v101.2 public
hashes remain the post-push release gate. A longer WebGL soak and automated
pixel-golden regression are documented hardening follow-ups, not missing visual
verification of the browser flows listed above.
