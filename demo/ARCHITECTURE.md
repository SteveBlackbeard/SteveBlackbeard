# NULLA-LABS runtime architecture

The deployed demo remains a static, dependency-free GitHub Pages application. Modularization follows a strangler pattern: pure scientific contracts are extracted first while `app.js` remains the rendering façade, preserving the established DOM and Three.js scene.

## Active modules

| Module | Contract | Side effects |
|---|---|---|
| `src/nuclear/nuclear-data.js` | Evaluated isotope/reaction catalogue and A/Z conservation validator | Exposes immutable `NULLA_NUCLEAR` |
| `src/chemistry/verified-reactions.js` | Catalogued binary compounds with explicit evidence level | Exposes immutable `NULLA_VERIFIED_REACTIONS` |
| `src/analysis/compatibility-engine.js` | Chemical compatibility, nuclear Q-value and Coulomb-barrier estimates | Exposes immutable `NULLA_COMPATIBILITY` |
| `src/i18n/i18n.js` | Eleven-locale static UI catalogue and locale lifecycle | Updates translated DOM bindings |
| `src/i18n/runtime-i18n.js` | Runtime status translations and interpolation | Extends the i18n façade |
| `app.js` | Three.js rendering, interactions, media capture and compatibility façade | Owns the scene and DOM event wiring |

## Safety rules

1. `index.html` is the authoritative module load list.
2. Pure modules may not access Three.js or mutate the DOM.
3. Unknown chemical inputs return `NO_CATALOGUED_PATH`; they never synthesize a fabricated product.
4. Nuclear reactions must pass conservation of mass number A and atomic number Z.
5. The cell renderer, cell control and organelle navigation are absent.
6. Any extraction from `app.js` requires characterization tests before changing the call site.
7. Renderer resources created per structure must be disposed or demonstrably stable across repeated cycles.

## Deliberately local-first

There is no silent PubChem or remote-data request. External verification should be introduced later only as an explicit, cached, failure-tolerant user action; the current scientific catalogue remains deterministic and works offline.
