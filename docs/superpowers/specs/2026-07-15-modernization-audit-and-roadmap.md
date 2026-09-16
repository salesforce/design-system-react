# Design System React — Modernization Audit & Roadmap

**Original audit date:** 2026-07-15
**Status update:** 2026-09-14
**Branch:** `feat/typescript-modernization`
**Scope:** Full critical review of every artifact + all 71 components, plus SLDS 2 package research.
**Method:** 21-agent parallel audit (7 systemic areas, 12 component batches, 1 SLDS research), key findings independently re-verified against the tree and the live npm registry.

---

## 0. Status update (2026-09-14) — the audit below is largely RESOLVED

> The audit in §1–§9 is a **2026-07-15 snapshot** of an early-stage branch
> (~15–20% complete). It is preserved as the historical baseline. Since then the
> prioritized roadmap (P0–P4) has been executed and the branch is now in a very
> different state. Current reality, verified against the tree on 2026-09-14:

| 2026-07-15 blocker / finding | Status now |
|---|---|
| No root `tsconfig.json`; type-check gate inert | ✅ Fixed — `tsconfig.json` exists; `tsc --noEmit` covers `components/**`, clean |
| Enzyme on React 19 impossible; 1 collectable test | ✅ Fixed — Enzyme fully removed (0 refs); **1216 tests** across Vitest jsdom + a Playwright browser project + story HTML snapshots |
| npm-publish pipeline dead (Node 14, `.tmp-npm`) | ✅ Fixed — real CI (`ci.yml`) + working publish; Node 24; ships Vite `dist/` |
| Install needs `--legacy-peer-deps`; `react-onclickoutside` caps at 18 | ✅ Fixed — `react-onclickoutside` removed (0 imports); clean `npm install` |
| CJS entry unusable (`ERR_REQUIRE_ESM`) | ✅ Fixed — real `.cjs` output; `exports` map with import/require/types |
| `input` ships legacy `.jsx` class | ✅ Fixed — converted; only **2** non-test source `.jsx` remain (`lookup`, `utilities/dialog`) |
| `popper.js` v1 underpins positioning | ✅ Fixed — migrated to `@floating-ui/dom` |
| Dead deps (`create-react-class`, `react-text-truncate`, `react-required-if`, `lodash.isequal`) | ✅ Removed |
| Barrel-only exports; no deep imports; no `sideEffects` | ✅ Fixed — `preserveModules` per-file build + `exports` map restores `components/*` deep imports; `sideEffects:false` |
| dts scope wrong (types folder only) | ✅ Fixed — per-file `.d.ts` tree via `tsc` emitDeclarationOnly, wired through `exports` `types` conditions |
| SLDS 2: vendored 952 KB `slds-plus.css`, Storybook-only | ✅ Swapped to `@salesforce-ux/design-system-2` npm package (Storybook loads from it); `slds-plus.css` now unreferenced |
| Toolchain 1–2 majors behind (Vite 5, Vitest 1, ESLint 8, ts-eslint 7) | ✅ Upgraded — Vite 8, Vitest 4, ESLint 10 (flat config), typescript-eslint 8, TypeScript 7 (side-by-side w/ 6.0 API), Storybook 10.5 |
| Node floor claim | Node **>= 24** |

**Current test/quality gate:** `tsc --noEmit` clean · ESLint **0 errors** (256 warnings, the tracked gradual-migration backlog) · **1216 tests** green · library build + Storybook build succeed · deep-import package contract verified against a packed tarball (ESM/CJS/types).

**Known remaining / deliberate tradeoffs (see `ROADMAP.md`):**
- 2 source `.jsx` not yet converted (`lookup`, `utilities/dialog`).
- `react-highlighter-ts` held (no React-19 release); wrapper casts around it.
- Runtime PropTypes dropped by the TS conversion (intentional; mitigated by shipped `.d.ts` + editor ATA and the surviving `checkProps` dev warnings).
- vitest 5 held at 4.x pending a build-environment registry cutoff.

The remainder of this document is the original 2026-07-15 audit, unchanged.

---

## 1. Verdict *(2026-07-15 snapshot — see §0 for current status; most of this is now resolved)*

**This branch is an early-stage, façade-deep modernization mislabeled as near-complete.** The *dev-time surface* (Vite / Vitest / TS / Storybook 10 config files) exists and looks modern, but the production build, the test suite, the type-check gate, and the publish pipeline are all non-functional or inert.

Honest completion estimate: **~15–20%** by effort-weighting, not the ~90%+ the current `ROADMAP.md` implies. Exactly **1 of 71 components** (`button`) is genuinely, fully migrated.

Treat this branch as a **scaffolding commit**, not a modernization one. The scaffolding is sound in intent; the completion claims should be discarded and replaced with the evidence-backed baseline below before any release decision.

---

## 2. Reality vs. Claims

All figures verified against the tree on `feat/typescript-modernization`.

| ROADMAP / CHANGELOG claim | Verified reality | Verdict |
|---|---|---|
| "React 19 — all components updated" | **416 `.jsx` files still `extends React.Component`**; `findDOMNode` in 6 files; legacy lifecycles in 5; `create-react-class` still a dependency | **False** |
| "63 components converted with full type definitions" | 61 `index.tsx` entry points, but **607 `.jsx` vs 112 `.tsx`**; several `.tsx` are `@ts-ignore` re-export stubs (`data-table`, `menu-dropdown`); `input` resolves to legacy `.jsx` | **Overstated** |
| "TypeScript strict mode" | **No root `tsconfig.json` exists** (only `tsconfig.node.json`). `tsc --noEmit` falls back to defaults and covers essentially nothing | **Not enforced** |
| "Vitest — replacing Karma/Mocha" | **1 collectable Vitest test** (`button`); 55 `*.browser-test.jsx` never collected; `karma.conf.js` still committed | **False** |
| "Removed Enzyme testing library" | **~47 components still on Enzyme** (25–40 files import it depending on count method); Enzyme has **no React 18/19 adapter** | **False** |
| "Vite replacing Webpack / Tree Shaking" | Publish CI still runs Babel `.tmp-npm`; barrel-only `exports`; no `sideEffects` field; no per-component subpath exports | **False** |
| "Dark Mode with `prefers-color-scheme` detection" | `prefers-color-scheme` appears only in `README.md`, 0 times in CSS/TS. Dark mode is Storybook-only | **False** |
| "Stories migrated to CSF" | 57 `.stories.jsx` vs 11 `.stories.tsx`; 13 still use `storiesOf` | **Partial** |
| Category tables ("Core/Nav/Overlay 100%") | `data-table`, `grid`, `input` (ships `.jsx`), `lookup` not converted | **Fabricated-looking** |
| ROADMAP references `.planning/` folder | Directory does not exist | **Dangling** |

---

## 3. Blockers (branch does not work as claimed)

Stop-the-line items. Nothing downstream is trustworthy until these are fixed.

1. **No root `tsconfig.json`.** `build` (`tsc --noEmit && vite build`), `typecheck`, and ESLint's `parserOptions.project` all reference `./tsconfig.json`, which does not exist. The type-check gate guarding "63 typed components" is inert. *This is the central incoherence of the branch.* — **Verified.**
2. **Enzyme on React 19 is structurally impossible.** ~47 suites use `shallow`/`mount`; Enzyme's newest adapter tops out at React 17. These tests cannot run — they must be rewritten, not re-adaptered.
3. **Test suite effectively empty.** Vitest collects exactly **1** file. — **Verified.**
4. **npm publish pipeline is dead and wrong.** `.github/workflows/npm-publish.yml` pins **Node 14** (repo requires ≥20.19; React 19 can't run on 14), calls `build:npm-package` (**not a defined script**), then publishes `.tmp-npm` (artifact of the deleted Babel pipeline). The Vite `dist/` that `package.json` advertises is never produced or shipped by CI.
5. **Install requires `--legacy-peer-deps`.** `react-onclickoutside@^6.13.1` caps its peer at React 18; against `react@^19.2.0` a clean `npm install` fails ERESOLVE.
6. **CJS entry is unusable.** `"type": "module"` + Vite emitting `design-system-react.umd.js` (a `.js` file loaded as ESM) means `require('design-system-react')` throws `ERR_REQUIRE_ESM`. — **Verified** (`main` → `.umd.js`, `type: module`).
7. **`input` ships the legacy class.** `components/input/` contains **both** `index.jsx` (626-line class + PropTypes) and `index.tsx`; with no `resolve.extensions` override, Rollup resolves `.jsx` first, so the barrel ships the legacy class — while ROADMAP claims Input is "Core 100%". — **Verified** (both files present).

---

## 4. Systemic Findings by Area

Severity: **BLOCKER** > HIGH > MED > LOW. Effort: S / M / L / XL.

### Build & Tooling
- **[BLOCKER]** Missing root `tsconfig.json` (§3.1). *Fix:* add real root config (`jsx: react-jsx`, `strict`, path aliases, `include: components/**, utilities/**, types/**`); have `tsconfig.node.json` extend it. **(M)**
- **[HIGH]** Type-declaration scope wrong — `vite-plugin-dts` `include: ['types/**/*.ts']` emits only the shared `types/` folder, not the 112 `.tsx` / 168 component `.d.ts`. Published `dist/types/index.d.ts` won't match the runtime export surface. **(M)**
- **[HIGH]** Unsafe ESM/CJS export map (§3.6). *Fix:* emit a real `.cjs` build; repoint `main`/`exports.require`. **(M)**
- **[MED]** Dead legacy configs — `karma.conf.js` requires a deleted `webpack.config`; `tests/` storyshots/puppeteer/mocha harness unwired. *Fix:* delete. **(M)**
- **[MED]** Tree-shaking claim unsupported — barrel-only `exports`, no `sideEffects`, no subpath exports. **(M)**
- **[LOW]** JSX-in-`.js`, `.tsx` entries importing legacy `.jsx` children. **(L)**
- **[LOW]** Dated pins: Vite 5.4 (eco on 6/7), Vitest 1.6 (current 3.x), ESLint 8 (EOL, legacy `.eslintrc.cjs`), typescript-eslint 7. **(L)**

### Testing Infrastructure
- **[BLOCKER]** 1/61 test files migrated (~1.6%); 55 `browser-test.jsx` never collected. **(XL)**
- **[BLOCKER]** Enzyme has no React 18/19 adapter (§3.2). **(XL)**
- **[HIGH]** Dead Karma/storyshots harness still committed (references `react-test-renderer`, not in deps). **(M)**
- **[HIGH]** No real coverage baseline — ROADMAP % conflates TS-conversion with test coverage. **(S)**
- **[MED]** Vitest 2 majors behind. **(S)**
- **[LOW]** `vitest.setup.ts` lacks IntersectionObserver / scrollIntoView / getBoundingClientRect shims — overlay/combobox tests will fail once migrated. **(S)**

### Dependencies & Security
- **[HIGH]** `prop-types` phantom dependency — imported in ~130 files, **not declared**; resolves only transitively via `react-modal`. Any dedupe breaks it. **(M)**
- **[HIGH]** `popper.js` v1 (deprecated) underpins all positioning (popover / combobox / date-picker / menu / tooltip / dialog); no `@floating-ui` migration started. **(XL)**
- **[HIGH]** `react-onclickoutside` caps at React 18 (§3.5). `useClickOutside` already exists (`utilities/hooks/use-click-outside.ts`); only `lookup` still uses the old lib. *Fix:* finish migration, drop the dep. — **Verified** (26 files still import it). **(M)**
- **[HIGH]** `eslint-plugin-storybook@10` needs `@typescript-eslint/utils@^8`, but repo pins ts-eslint 7 — unmet peer; `npm run lint` likely errors. **(M)**
- **[MED]** `react-highlighter-ts` hard-depends on React 17 → duplicate React / invalid-hook risk. **(M)**
- **[MED]** Dead deps: `react-text-truncate`, `create-react-class`, `react-required-if` (0 imports). **(S)**
- **[MED]** Toolchain 1–2 majors behind; ESLint 8 EOL. **(L)**
- **[LOW]** 8 `lodash.*` micro-packages (+8 `@types`) — several replaceable with native JS. **(M)**

### SLDS / CSS / Design Tokens
- **[HIGH]** Styling depends on a **952 KB vendored internal `slds-plus.css`** (banner-marked "DSE team use only… unsupported… may be withdrawn"), loaded only by Storybook. The **published library ships no CSS** and never imports SLDS CSS from any entry point → consumers get an unstyled library. **(L)**
- **[HIGH]** Version mismatch: bundled CSS is `2.23.0-alpha.1`; peer dep pins `2.25.0-alpha.2`. Markup validated against neither the pinned package. **(M)**
- **[MED]** `design-tokens/dist` is a stale SLDS-1 vendored copy (literal `rgb()` values); the `build:design-tokens` regeneration script was deleted. 3 components consume literal tokens → won't theme/dark-mode. **(M)**
- **[MED]** Dark mode is Storybook-only; no runtime ThemeProvider; library never sets `slds-color-scheme--dark`. **(M)**
- **[MED]** Deep hardcoded `slds-` coupling (395 files) validated against the internal 2.23 artifact, not the pinned package → swap risk with no CSS test coverage. **(L)**
- **[LOW]** Dual icon system; `@salesforce-ux/icons` declared but unused at runtime; full-category inline barrels undercut tree-shaking. **(M)**

### CI/CD & Repo Hygiene
- **[BLOCKER]** npm-publish workflow broken (§3.4). **(M)**
- **[HIGH]** No CI for test/lint/typecheck/build on push/PR — the only workflow triggers on `release`. **(M)**
- **[HIGH]** Husky + lint-staged configured but not installed (deprecated v4 `husky.hooks` format, no `.husky/`, no `prepare`) — pre-commit hooks are dead. **(S)**
- **[MED]** Dead Heroku/Babel release scripts in `scripts/` invoking `babel-node` (not in deps). **(M)**
- **[MED]** Empty CODEOWNERS; **[LOW]** stale `dependabot.yml` (ignores removed deps); **[LOW]** vestigial `eslint-plugin/` (ESLint 3/mocha). **(S)**

### TypeScript Quality
- **[BLOCKER]** Type-check never covers the component tree (§3.1). **(L)**
- **[HIGH]** 98 sidecar `.d.ts` shims over untyped `.jsx` — documentation veneer, not type safety; can drift silently. **(XL)**
- **[HIGH]** 434 `any` in `.d.ts` + 37 in `.tsx`; `as any` prop-spread casts at composition boundaries (Dialog, Input, MenuDropdown) defeat the checker where it matters most. **(L)**
- **[HIGH]** `@ts-ignore` re-export stubs counted as "converted" — `data-table.tsx`, `menu-dropdown.tsx` just re-export the `.jsx`. **(M)**
- **[MED]** `types/components.ts` and `types/theme.ts` are dead code — imported by nothing; `button/index.tsx` defines its own local `ButtonProps`. **(M)**
- **[LOW]** `useClickOutside` untested; `touchstart` bypasses configurable `eventType`; re-subscribes on non-memoized callback. **(S)**

---

## 5. SLDS 2 Migration

**Current state:** SLDS 2 styles are consumed via the bundled `assets/styles/slds-plus.css` (~952 KB, Lightning Design System **2.23.0-alpha.1**), loaded only in Storybook via `.storybook/preview-head.html`. `package.json` declares `@salesforce-ux/design-system@2.25.0-alpha.2` as a peer dep (for icon assets), but the SLDS 2 *styles* are bundled, not consumed from a package. **The library ships no CSS itself.**

**Recommended package (confidence: HIGH — verified on npm registry 2026-07-15):**
`@salesforce-ux/design-system-2` — the official SLDS 2 npm package, `latest` = **2.0.4**.
```
npm install @salesforce-ux/design-system-2
```
CSS at `dist/css/bundled/slds2.cosmos.css` (~980 KB, matches the bundled size). Keep the legacy `@salesforce-ux/design-system` (2.30.x line) as a peer **for icon assets only** — the SLDS 2 package does **not** bundle icons. (`@salesforce-ux/sds` and `@salesforce-ux/tokens` do **not** exist on npm — confirmed 404.)

**Concrete swap path:**
1. `npm i @salesforce-ux/design-system-2` (keep the icon package).
2. Point Storybook at `node_modules/@salesforce-ux/design-system-2/dist/css/bundled/slds2.cosmos.css` (via `staticDirs` in `.storybook/main.ts` → `/slds2`) instead of `slds-plus.css`.
3. Update README install docs to reference the official package CSS; drop the "temporary bundle" note.
4. Delete the vendored `assets/styles/slds-plus.css`.
5. (Optional) Use modular `slds2.base.css` + `slds2.theme.cosmos.css` for runtime theme switching aligned with the dark-mode goal.

**Risks:** version drift (2.23-alpha.1 → 2.0.4 numbering reset during stabilization) may cause visual regressions — mitigate with Storybook visual regression before/after; `@layer` cascade conflicts with consuming apps; breaking change for any consumer referencing the bundled path → warrants a major version bump + migration note. Icons must continue to be served from `@salesforce-ux/design-system` / `@salesforce-ux/icons`.

---

## 6. Component Migration Status (all 71)

### Counts by real state
| Metric | Breakdown |
|---|---|
| `tsStatus` | **full-ts 48**, partial-ts 17, js-only 6 |
| `testStatus` | **enzyme 47**, none 17, storyshots 3, mixed 3, **vitest 1** |
| `reactPattern` | 416 `.jsx` files still `extends React.Component` repo-wide |
| Genuinely complete | **1** (`button`) |
| Claimed complete but NOT actually complete | **60 components** |

### The credibility gap (claimedComplete = true, actuallyComplete = false)
Representative examples:

| Component | tsStatus | Why not complete |
|---|---|---|
| `input` | partial-ts | **Ships legacy class `.jsx`** (resolves before `.tsx`); enzyme test |
| `data-table` | partial-ts | Main is 1341-line class `.jsx`; `.tsx` is `@ts-ignore` stub (XL) |
| `app-launcher` | full-ts shell | All 4 exported subcomponents are legacy classes |
| `global-header` | full-ts shell | Subcomponents `.jsx`; stories use React-19-incompatible `findDOMNode` |
| `global-navigation-bar` | full-ts shell | All subcomponents `.jsx`; `region.jsx` is a class |
| `carousel`, `card`, `page-header`, `tabs`, `split-view`, `progress-indicator`, `date-picker`, `builder-header`, `files`, `expression`, `visual-picker`, `welcome-mat`, `setup-assistant`, `vertical-navigation` | full/partial shell | `.tsx` container over unconverted `.jsx`/class children + sidecar `.d.ts` |
| `avatar`, `brand-band`, `scoped-notification`, `spinner`, `radio` | full-ts | Dead orphaned `check-props.js` → deprecation warnings no longer fire (behavioral regression) |
| `badge`, `checkbox`, `dynamic-icon`, `progress-bar`, `portal-settings` | full-ts | **Zero tests** |
| `icon`, `icon-settings`, `illustration`, `media-object`, `radio-button-group`, `trial-bar`, `notification` | mixed | **Legacy `storiesOf`** stories (contradict "CSF migrated") |
| `bread-crumb`, `navigation`, `popover-tooltip` | js-only | Deprecation alias shims never renamed to `.tsx`, yet counted |

**Honestly NOT claimed complete (ROADMAP accurate here):** `combobox`, `data-table`, `lookup` (deprecated), `menu-picklist` (deprecated), `notification` (deprecated), `panel`, `toast`, `tree`, `filter`, `grid`.

**Only genuinely complete:** `button` — real `forwardRef` TSX, no PropTypes, real Vitest+RTL test, CSF story. **Use it as the migration template.**

---

## 7. Prioritized Roadmap (dependency-ordered)

### P0 — Make the branch coherent and verifiable *(total: L)*
Unblocks everything. Until `npm ci`, `tsc`, and `npm test` run green, every completion claim is unfalsifiable.
- Add root `tsconfig.json`; make `tsc --noEmit` actually cover `components/**`. **(M)**
- Drop `react-onclickoutside` (migrate `lookup` to existing `useClickOutside`); declare `prop-types` explicitly → clean `npm install`. **(M)**
- Fix CJS output (`.cjs`) and dts `include` so the package builds and ships correctly. **(M)**
- Stand up a real CI workflow (Node 20): install → lint → typecheck → test → build on PR. **(M)**

### P1 — Restore the test safety net *(XL)*
You cannot safely finish TS/hooks conversion or swap SLDS/positioning without regression tests. Largest single workstream; gates P2/P3 quality.
- Rewrite the 47 Enzyme suites to Vitest + RTL using `button.test.jsx` as template; add jsdom polyfills; delete `karma.conf.js` and the storyshots harness.

### P2 — Finish the actual TS + hooks conversion *(XL)*
This is where "63 converted" becomes true. Depends on P1 for safety.
- Convert the 17 partial-ts internals and 6 js-only components; delete `@ts-ignore` re-export stubs (`data-table` class rewrite is XL alone); replace 98 sidecar `.d.ts` with real `.tsx`; remove/rewire dead `check-props.js`; drive down `any`.
- Fix `input` extension-resolution so the `.tsx` ships. **(M, high-priority correctness)**

### P3 — Positioning + SLDS 2 *(XL)*
Both touch many components; need P1 tests + P2 typed internals to verify without regressions.
- Migrate the Dialog positioning layer off `popper.js` v1 to `@floating-ui/react` (shared primitive for 6+ components — highest-leverage dep work).
- Swap `slds-plus.css` for `@salesforce-ux/design-system-2@2.0.4`; restore token regeneration; decide on a real theming API vs documented consumer responsibility.

### P4 — Publish, hygiene, docs *(L)*
Publishing an accurate, honestly-documented package is the last step, not the first.
- Rewrite npm-publish for Node 20 + Vite build + `files`/`prepack`; add `sideEffects`; upgrade toolchain (ESLint 9 flat config, Vitest 3, Vite 6/7, ts-eslint 8).
- Delete dead scripts / `eslint-plugin/`, fix CODEOWNERS/dependabot, wire husky.
- Rewrite ROADMAP/CHANGELOG to match reality (done as part of this review — see §8).

---

## 8. Quick Wins vs Long Haul

**Quick wins (S, high signal-to-effort):**
- Add root `tsconfig.json` (turns the type-check gate on).
- Declare `prop-types`; delete dead deps (`react-text-truncate`, `create-react-class`, `react-required-if`).
- Delete `karma.conf.js`, the storyshots harness, dead Heroku/Babel scripts, `eslint-plugin/`.
- Remove/rewire orphaned `check-props.js` (restores lost deprecation warnings in ~10 components).
- Correct the false CHANGELOG "Removed Enzyme/Karma" lines and the `prefers-color-scheme` dark-mode claim.
- Migrate the ~24 components blocked *only* by a test (`pill`, `textarea`, `time-picker`, `tree`, `badge`, `checkbox`, `radio`, `spinner`, `location-map`, `media-object`, …) — each a fast, template-driven RTL rewrite.

**Long haul (XL, unavoidable):**
- Rewriting 47 Enzyme suites to Vitest + RTL (P1).
- Converting `data-table` (1341-line class) + all partial-ts internals + 98 sidecar `.d.ts` (P2).
- `popper.js` v1 → `@floating-ui` positioning migration across the overlay family (P3).
- Genuine SLDS 2 package swap with visual-regression validation (P3).

---

## 9. Provenance

Produced by a 21-agent parallel audit: 7 systemic auditors (build, testing, deps, SLDS/CSS, CI, docs-vs-reality, TS quality), 12 component-batch auditors covering all 71 components, and 1 SLDS 2 package researcher. Blocker findings (missing tsconfig, `input` dual-file, 1 collectable test, CJS export, `react-onclickoutside`) and the SLDS 2 package (`@salesforce-ux/design-system-2@2.0.4`, `latest`) were independently re-verified against the working tree and the live npm registry on 2026-07-15.
