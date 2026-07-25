# NULLA-LABS Platform Completion Master Plan

## Execution status

| Gate | Current state | Required evidence |
|---|---|---|
| Reversible baseline | PASS | Backup `backups/2026-07-25_1553_45d9fe0` and branch `codex/system-completion` |
| Startup / white canvas | PASS | Default B-DNA plus guarded URL parameters |
| Materials bar | PASS | Six connected builders and smoke contracts |
| Chemical catalogue | PASS | Unknown routes rejected; catalogued formulas validated |
| Chemical geometry | PASS | Nearest-neighbour bond cutoff; rock-salt family visual test |
| Nuclear separation | PASS | Independent fusion/fission controls and A/Z validation |
| Nuclear runtime | PASS | FPS-independent timing, visible products, zero chemical nucleon bonds |
| Thermodynamics | PASS WITH MODEL LIMIT | Entity profiles; educational motion explicitly labelled non-predictive |
| Measurement | PASS | Å/pm distance and angle calculation contracts |
| Recording / sharing / XR | PASS | MediaRecorder, state URL, and real immersive-session request |
| Eleven-language static UI | PASS | Identical locale keys, tutorial, guide, quiz, RTL Arabic |
| Eleven-language dynamic telemetry | IN PROGRESS | Runtime state/result matrix in every locale |
| Responsive / accessibility | PASS WITH FINAL MATRIX PENDING | Mobile panel separation, keyboard elements, dialog semantics |
| Soak / performance | PENDING | Repeated transitions with bounded memory and stable renderer resources |
| Release | BLOCKED BY FINAL GATES | No public deployment before every pending gate passes |

### Regression rule

Any user-visible break in combination, fusion, fission, startup, or the default
composition is a release blocker. The affected gate returns to `IN PROGRESS`,
is reproduced in the local browser, receives a regression contract, and must pass
again before work continues downstream.

## Non-negotiable invariants

1. Preserve the current visual identity and default B-DNA opening scene.
2. Every migration is reversible through Git and the verified baseline backup.
3. No feature may claim more scientific fidelity than it implements.
4. Chemistry, nuclear fusion, and nuclear fission are separate domains and controls.
5. All user-visible features ship with the same keys in the 11 Chronolith locales:
   `es`, `en`, `ja`, `ru`, `zh`, `fr`, `it`, `de`, `pt`, `ko`, `ar`.
6. Arabic must render RTL; equations and isotope notation remain LTR where required.
7. Frugal budgets: no runtime framework, no network requirement for core operation,
   no duplicated renderer, capped particle counts, cached geometry/materials.

## Safe modularization strategy

The platform uses an incremental strangler migration. `app.js` remains the façade and
the existing renderer remains authoritative. Pure data and pure calculations move
first; rendering code moves only after contract and screenshot equivalence tests pass.

Migration order:

1. Pure catalogs (`nuclear-data.js`, reaction data, material data).
2. Pure calculations (A/Z conservation, phase selection, units, LJ force).
3. i18n catalogs and parity validation.
4. State adapters used by the existing event handlers.
5. Renderer helpers with identical inputs/outputs.
6. Optional UI components only after golden visual comparisons.

No bundler or framework is introduced until the static GitHub Pages build has a
reproducible test matrix proving that the change is neutral.

## Scientific capability levels

- **DATA**: externally sourced value with units, conditions, provenance, and revision.
- **MODEL**: deterministic calculation with documented assumptions and tests.
- **SIMULATION**: numerical integration with timestep, units, stability checks, and limits.
- **ILLUSTRATION**: visual behavior that is not quantitatively predictive.
- **HYPOTHESIS**: explicitly speculative route; never presented as an observed element.

## Synergistic discipline matrix

### Mathematics

- Graph theory validates molecular/lattice topology, coordination, connected components,
  C60 degree/edge counts, and reaction-network reachability.
- Linear algebra drives transforms, calibrated measurements, angles, inertia tensors,
  principal axes, and camera-independent geometry tests.
- Numerical analysis defines fixed timesteps, error tolerances, convergence, stability,
  energy drift, cutoffs, and deterministic seeded tests.
- Probability represents branching ratios, isotope yields, uncertainty intervals,
  competing pathways, and confidence without disguising uncertainty as certainty.
- Dimensional analysis prevents mixing world units, Å, pm, kelvin, kJ/mol, eV, and MeV.

### Physics and materials science

- Classical mechanics: momentum, elastic/inelastic collisions, constraints, and boundaries.
- Statistical mechanics: Maxwell-Boltzmann sampling, thermostats, phase limitations.
- Electromagnetism: Coulomb interactions, ionic lattices, dipoles, and plasma visuals.
- Solid-state physics: unit cells, coordination, phonon-like illustration, defects,
  polymorphs, thermal expansion, and lattice compatibility.
- Materials compatibility: thermal, electrochemical, structural, and mechanical axes.

### Nuclear physics

- Isotope identity `(A,Z)`, mass/charge conservation, Q-values, half-lives, and decay modes.
- Coulomb barrier and Gamow tunnelling as explicit approximations.
- Cross sections and branching ratios conditioned on projectile energy.
- Two-/three-body product kinematics and momentum conservation.
- Fission yield distributions rather than a single universal fragment pair.
- Superheavy synthesis only in a separate hypothesis workspace with observed/unobserved status.

### Chemistry

- Balanced equations, oxidation states, valence, formal charge, electronegativity,
  molecular geometry, phase, solvent, temperature, and pressure.
- Thermodynamics (`ΔH`, `ΔS`, `ΔG`) separated from kinetics and activation energy.
- Competing products, catalysts, passivation, decomposition, toxicity, and hazards.
- Provenance and conditions attached to every empirical datum.

### Historical alchemy

- Optional educational timeline: symbols, apparatus, metallurgy, pigments, distillation,
  and the historical transition toward experimental chemistry.
- Alchemical correspondence may guide storytelling and visual nomenclature only.
- It never contributes numerical predictions, compatibility scores, or scientific claims.

## Compatibility and instability contract

Compatibility is a vector, not a decorative universal percentage.

### Chemical compatibility

- `catalogue`: balanced and known route or unknown.
- `thermodynamic`: sign/range of `ΔG` under documented conditions.
- `kinetic`: activation barrier, catalyst, rate regime.
- `electronic`: oxidation-state and electronegativity compatibility.
- `phase`: contact/mixing feasibility at selected `T/P`.
- `selectivity`: competing products and branching.
- `stability`: decomposition, hydrolysis, oxidation, photolysis, and metastability.
- `safety`: corrosive, toxic, explosive, radioactive, or unknown.

### Nuclear compatibility

- exact isotope channel;
- `A`, `Z`, and charge conservation;
- Q-value and threshold;
- Coulomb barrier/contact estimate;
- cross section at incident energy;
- tunnelling probability where applicable;
- competing branches;
- product half-lives and decay chains;
- neutron balance and delayed radiation.

### Materials compatibility

- lattice mismatch and interface strain;
- thermal-expansion mismatch and melting/decomposition limits;
- galvanic/electrochemical compatibility;
- diffusion and intermetallic formation;
- mechanical modulus, brittleness, and fatigue;
- environmental compatibility with solvent, humidity, oxygen, and radiation.

Every result exposes:

`status`, `evidence level`, `confidence`, `factors`, `required conditions`,
`instabilities`, `competing paths`, `units`, and `provenance`.

## Nuclear engine

### Implemented baseline

- Separate nuclear fusion and nuclear fission controls.
- Isotope-aware curated routes.
- Conservation validation for mass number `A` and atomic number `Z`.
- Q-value shown in MeV.
- Curated D–T, D–D, p–B11, He3–He3, C12–C12 routes.
- Representative U-235, Pu-239, and Cf-252 fission channels.
- Distinct plasma/confinement and scission visual language.

### Remaining empirical hardening

- Add isotope/branch selector rather than cycling routes.
- Attach source metadata and uncertainty to every Q-value and branching ratio.
- Add momentum allocation from two/three-body kinematics.
- Add Coulomb-barrier/Gamow factor visualization with explicit non-reactor scale.
- Add a separate, opt-in hypothetical superheavy-element workspace.
- Never create a new element solely by adding atomic numbers.

## Chemistry engine

1. Replace heuristic fallback products with `unknown/not catalogued`.
2. Store balanced equations, phase, pressure, temperature range, hazards, and provenance.
3. Expand by high-value families: oxides, halides, hydrides, common acids/bases,
   simple organics, minerals, and educational VSEPR examples.
4. Validate element counts and charge for every equation.
5. Distinguish formation thermodynamics from reaction rate and activation energy.
6. Keep generated stoichiometry behind an explicit `ESTIMATE` badge.

## Thermodynamics and particle motion

1. Use entity-specific transition data and pressure conditions.
2. Mark sublimation/decomposition instead of fabricating melting.
3. Keep the current motion as an educational visual model.
4. Move LJ to a deterministic fixed-timestep integrator before calling it molecular
   dynamics; add cutoff, shifted potential, neighbor list, units, and energy drift tests.
5. Ionic NaCl requires Coulomb plus short-range repulsion; LJ alone is insufficient.

## Validation matrix

- Startup: default, `?z=79`, fusion state URL, each material state URL.
- Nuclear: every route conserves A/Z and exposes positive/negative Q correctly.
- Chemistry: every catalogued reaction balances elements and charge.
- Geometry: NaCl coordination, diamond angle, C60 V/E/degree, graphene/SWCNT degree.
- Measurement: calibrated distances and angles with tolerances.
- i18n: identical key sets for all 11 locales; Arabic RTL; no clipped controls.
- Visual: golden screenshots at 1920×1080, 1366×768, 900×700, and 390×844.
- Performance: FPS percentile and renderer memory before/after 100 structure changes.
- Soak: 20 minutes and 500 transitions without unbounded geometry/texture growth.
- Accessibility: keyboard access, focus visibility, dialog semantics, reduced motion.

## Release gates

1. Syntax, static contracts, and scientific invariants pass.
2. Browser smoke tests produce no errors or warnings.
3. Visual diff is approved at every target viewport.
4. Performance and GPU memory remain within baseline tolerance.
5. Claims in UI/docs match the implemented capability level.
6. Only then merge and deploy; keep the previous GitHub Pages commit recoverable.
