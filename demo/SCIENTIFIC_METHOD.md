# NULLA-LABS scientific method and evidence contract

## What the demo is

NULLA-LABS is an interactive educational visualizer. It combines curated data,
deterministic geometric models, tested calculations and deliberately cinematic
illustrations. It is not an ab-initio chemistry package, a molecular-dynamics solver,
a plasma code or a reactor simulator.

Every scientific statement belongs to one of these levels:

- `DATA`: a value with units, conditions and an external source.
- `MODEL`: a deterministic calculation with assumptions and automated tests.
- `SIMULATION`: a numerical model with timestep, units and stability limits.
- `ILLUSTRATION`: explanatory motion or rendering that is not predictive.
- `HYPOTHESIS`: a speculative route, isolated from observed data.

The current runtime uses `CATALOGUED` for checked composition entries and
`LEGACY_CURATED_ILLUSTRATION` for visually useful legacy entries whose full reaction
conditions are not yet catalogued. Missing thermodynamic or kinetic quantities are
shown as unavailable; they are never silently estimated.

## Chemistry scope

- The periodic table contains the 118 currently named elements, with contiguous
  atomic numbers 1–118.
- A chemical result is produced only when its route exists in the local catalogue.
- Formula atom counts are checked against the rendered composition.
- Explicit molecular bond graphs preserve bond order where the model declares it;
  for example H–C≡N contains one single and one triple bond.
- NaCl is a 6×6×6 rock-salt lattice: 108 Na + 108 Cl. Interior ions have coordination
  number 6. Its phase control uses a documented NaCl reference profile; compounds
  without phase data keep temperature physics disabled.
- A catalogue composition is not automatically a balanced synthesis equation.
  Enthalpy, activation energy, rate, pressure range, competing products and hazards
  remain `N/D` until sourced individually.

## Nuclear scope

- Fusion and fission are separate controls and accept isotope channels, not sums of
  periodic-table atomic numbers.
- Each route is checked for conservation of mass number `A` and atomic number `Z`.
- Fusion Q-values are recalculated from isotope masses with
  `Q = (m_reactants - m_products)c²`, using `1 u = 931.49410242 MeV/c²`, and must agree
  with the catalogue value within 0.03 MeV.
- D–T, both D–D branches, p–B11, He3–He3 and two C12–C12 branches are selectable.
- U-235, Pu-239 and Cf-252 fission scenes are representative mass-balanced channels;
  actual fission products follow yield distributions and are not deterministic.
- The renderer shows one visual particle per physical nucleon. Plasma glow, Coulomb
  approach, deformation, scission, shockwaves, timing and scale are illustrations.

## Materials geometry contracts

| Structure | Runtime contract |
|---|---|
| NaCl | 216 ions, Na:Cl = 1:1, interior degree 6 |
| Diamond | tetrahedral carbon network, interior degree 4 |
| C60 | 60 carbon vertices, 90 edges, degree 3 |
| SWCNT | rolled `(12,0)` graphene model, no degree-1 carbon |
| Graphene | single hexagonal sheet, no degree-1 carbon |
| Solvation | Na + 12 H2O, 37 atoms, 24 explicit O–H bonds, 104.5° model angle |

## Thermodynamics and measurement

The phase selector applies only where the entity has an explicit profile. Solid,
liquid and gas motion are educational regimes. Lennard-Jones is a reduced pair
potential with tested equilibrium behavior, not predictive ionic dynamics. Distance
uses the active scene's declared Å/world-unit scale and also reports pm; angle uses
three selected points. Nuclear scenes disable molecular length-scale verification.

## Primary references

- IUPAC, Periodic Table of Elements: https://iupac.org/what-we-do/periodic-table-of-elements/
- NIST, Atomic Weights and Isotopic Compositions: https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl
- Atomic Mass Evaluation 2020: https://amdc.impcas.ac.cn/web/masseval.html
- NNDC NuDat 3: https://www.nndc.bnl.gov/nudat3/
- IAEA LiveChart of Nuclides: https://nucleus.iaea.org/Pages/livechart-of-nuclides-av.aspx
- NIST Chemistry WebBook, sodium chloride: https://webbook.nist.gov/cgi/cbook.cgi?ID=C7647145&Mask=6&Units=SI

## Deliberate exclusions

Historical alchemy may appear as cultural history, nomenclature or visual storytelling.
It does not enter compatibility scores, isotope arithmetic, thermodynamics or product
prediction. Superheavy-element synthesis must remain a separately labelled hypothesis
workspace and cannot be generated merely by adding atomic numbers.
