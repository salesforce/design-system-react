# Modernization Roadmap

> **Status: Active modernization — the bulk of the migration is complete.**
>
> This branch (`feat/typescript-modernization`) modernizes the library to React 19,
> SLDS 2, and a modern toolchain (Vite / Vitest / TypeScript 5 strict / Storybook 10).
> As of the **2026-08-11** audit, essentially every component ships as real `.tsx`
> with a Storybook (CSF) story, the type-check gate is clean, lint is at **zero
> errors** (blocking in CI), and 56 Vitest test files run in place of the old
> Enzyme suites. Storybook now also auto-deploys to GitHub Pages on every push to
> `master`. The remaining work is the popper.js → @floating-ui migration (which
> blocks the last 3 source files — design in progress, see
> `docs/superpowers/specs/`), test/story gap-fill, the SLDS 2 package swap
> follow-through, and the major-version toolchain bumps.

## Status Snapshot (2026-08-11)

| Area | State | Notes |
|------|-------|-------|
| Component sources | **~68 / 71 on `.tsx`** | Only `lookup/index`, `lookup/lookup`, and `utilities/dialog` remain `.jsx` — all blocked by popper.js |
| TypeScript | **`tsc --noEmit` clean** | Root `tsconfig.json` present; `strict: true` |
| Storybook | **10.5.5**, CSF stories | 68 components have stories; 3 do not (see below); auto-published to GitHub Pages from `master` |
| Tests | **56 Vitest files**, 0 Enzyme | Migration off Enzyme complete; ~15 components still lack a test |
| Lint | **0 errors / 199 warnings, blocking in CI** | Fixed `storybook-static/` build output leaking into the lint glob; warnings are pre-existing quality debt (unused vars, a11y) |
| SLDS 2 CSS | **npm package** | Storybook loads `@salesforce-ux/design-system-2@2.264.0` bundled Lightning Blue; static `slds-plus.css` no longer referenced |
| Positioning | **popper.js v1** | Still the deprecated Popper.js v1 — sole blocker for the last 3 `.jsx` (P1); Floating UI migration design in progress |
| React / tooling | React 19.2.8, Vite 5.4, Vitest 1.6, ESLint 8.57 | Major upgrades (Vite 8, Vitest 4, ESLint 10) pending — P4 |
| `react-onclickoutside` / `enzyme` | **removed** | Clean `npm install` no longer needs `--legacy-peer-deps` for these |

## Prioritized Plan

### P1 — Unblock the last sources: popper.js → @floating-ui
The three remaining `.jsx` sources all depend, directly or transitively, on the
Dialog positioning layer which still uses **popper.js v1** (deprecated, unmaintained).

- [ ] Migrate `components/utilities/dialog/index.jsx` off `popper.js` to `@floating-ui/dom`
      (`computePosition` + `autoUpdate`), keeping the existing class and building a
      `popperData`-shaped adapter so `utilities/dialog-helpers.js` (nubbin math) stays
      untouched. Convert to `.tsx` in the same change. *(Design doc in progress —
      see `docs/superpowers/specs/`.)*
- [ ] Convert `components/lookup/lookup.jsx` → `.tsx` (depends on Dialog).
- [ ] Convert `components/lookup/index.jsx` → `.tsx` (depends on lookup).
- [ ] Remove `popper.js` from dependencies once no source imports it.

### P2 — Close the story & test gaps
**Components with no Storybook story** — add CSF stories:
- [ ] `grid`
- [ ] `navigation`
- [ ] `popover-tooltip`

**Components with no Vitest test** — add tests (template: `components/button/__tests__`):
- [ ] `badge`, `brand-band`, `breadcrumb`, `checkbox`, `dynamic-icon`, `files`,
      `icon-settings`, `panel`, `portal-settings`, `progress-bar`, `progress-ring`,
      `radio`, `scoped-notification`, `trial-bar`

**Story/feature gaps vs. SLDS 2** — from the component-by-component comparison in
[`docs/superpowers/specs/2026-08-07-slds2-vs-react-comparison.md`](docs/superpowers/specs/2026-08-07-slds2-vs-react-comparison.md)
(48 matched pairs). Ordered by leverage; skip anything filed "Legacy Components" upstream.

- [ ] **Token-theming ("Customization") story pattern.** SLDS 2 attaches a live
      styling-hook / design-token panel to ~20 components; React has none. Build a shared
      decorator + exemplar "Theming" stories for `button`, `card`, `input`, `avatar` first,
      then extend. *(Highest-leverage, most on-theme for "components using SLDS 2".)*
- [x] **Wire existing `__examples__` into stories (near-zero cost):**
  - [x] `builder-header` — toolbar, utilities, successful/after-successful/failed-save stories added (`a594203e3`). `base-with-page-type-editable` intentionally deferred — depends on Popover/Dialog positioning, tied to P1.
  - [x] `combobox` — custom-menu-item, disabled-options, and RTL stories added (`8a25a5d11`). Remaining 25+ example files still unwired (dialog-boundary variants, additional icon/subheader combos) — lower leverage, revisit after P1 unblocks Dialog.
- [ ] **Add missing high-value state stories:**
  - [ ] `docked-composer` — voice/telephony call-state suite (~10 states), popped-out, overflow menu, log-a-task.
  - [ ] `card` — Loading, Collapsed, NestedCards, DataTiles.
  - [ ] `checkbox` — fieldset group variants, read-only "view mode", help-text/tooltip.
  - [ ] `expression` — error, disabled-inputs, nested groups, locked filters, formula.
  - [ ] `accordion` — ActionMenu, Nested, WrappedInCard, heading truncation.
  - [ ] `modal` — SizeFull; `tabs` — conditional tab, scoped-with-overflow.
  - [ ] `radio-group` — help-icon(+tooltip), disabled-checked, error-checked, label-placement.

**Component feature gaps (capability missing, not just a story)** — file as
enhancement issues, not story fill-ins:
- [ ] `vertical-navigation` — badge / compact / icon / shaded / overflow / validation variants.
- [ ] `visual-picker` — small size tier, disabled state, non-coverable content.
- [ ] `date-picker` — date-**range** selection (SLDS 2 is a dual single/range picker; React is single-only).
- [ ] `app-launcher` — drag-and-drop tile reordering.
- [ ] `input` — native `type` variants (checkbox / toggle / range / color / file).
- [ ] `global-header` — interactive search + notification panel *(blocked by `react-onclickoutside` / React 19 — ties to P1 dependency work).*

### P3 — SLDS 2 delivery follow-through
- [x] Storybook renders on the npm `@salesforce-ux/design-system-2` package (latest,
      2.264.0) via `/slds2` static dir instead of the committed `slds-plus.css`.
- [ ] Delete the vendored `assets/styles/slds-plus.css` once nothing references it
      (README and the audit spec still mention it).
- [ ] Decide what CSS, if any, the **published package** ships to consumers (peer
      dependency on `@salesforce-ux/design-system-2` vs. documented consumer
      responsibility vs. a re-exported entry stylesheet).
- [ ] Offer a theme choice (Lightning Blue default; Cosmos alternate) and document it.

### P4 — Toolchain major upgrades & publish
- [ ] Vite 5 → 8, `@vitejs/plugin-react` 4 → 6, `vite-plugin-dts` 3 → 5
- [ ] Vitest 1 → 4, `jsdom` 24 → 29
- [ ] ESLint 8 → 10 (flat config), `@typescript-eslint/*` 7 → 8, `eslint-plugin-react-hooks` 4 → 7
- [ ] `@babel/core` 7 → 8, `@types/node` 20 → 26, `nanoid` 5 → 6, `@testing-library/jest-dom` 6 → 7
- [ ] Verify/repair the npm-publish pipeline (Node 20, Vite build, `files`/`prepack`, `sideEffects`)
- [x] **GitHub Pages:** `.github/workflows/pages.yml` builds Storybook and deploys on
      every push to `master`; Pages source set to "GitHub Actions" on the fork. Live at
      https://showerbee.github.io/design-system-react/ once `master` picks up this branch.

## Known Limitations

1. **Node.js** — Requires Node.js >= 24.
2. **React 19 only** — no backward compatibility with React 16/17/18.
3. **Published CSS** — the published package does not yet ship SLDS 2 CSS to consumers;
   Storybook wires it up locally from the npm package (P3).

### Runtime prop validation (intentional tradeoff)

Converting components to TypeScript removed their `static propTypes`. TS types are
erased at build time, so a **plain-JS/Babel consumer no longer gets React's
dev-mode PropTypes console warnings** (wrong prop type / missing required prop) for
converted components. This is a deliberate, conventional tradeoff for a TS
migration (React itself deprecated PropTypes in v19; MUI, Chakra, etc. made the
same move). We accepted it rather than dual-maintaining hand-written PropTypes
alongside the types.

What still protects consumers:

- **Shipped `.d.ts` declarations.** The package now emits per-file declarations
  mirroring the source tree (`dist/types/**`, wired through the `exports` map).
  Modern editors (VS Code et al.) pick these up — for TS users directly, and for
  **plain-JS users via Automatic Type Acquisition (ATA)** — giving rich
  autocomplete and inline type/required-prop warnings at author time, with zero
  runtime overhead. This covers most of what PropTypes did, earlier (in-editor)
  and for both audiences.
- **`checkProps` dev warnings survive.** The `check-props.js` dev-only system
  (deprecation notices and one-of-required-property business rules) is still
  invoked by converted components — a different, narrower check than PropTypes,
  and unaffected by the migration.

If runtime enforcement for JS consumers is later deemed necessary, generating
PropTypes from the TS types at build (e.g. `babel-plugin-typescript-to-proptypes`)
is the path — evaluated and deferred, not precluded.

## How to Help

**Good first issues (P2 template-driven work):**
- Add a Vitest + RTL test for a component that lacks one (template: `components/button/__tests__`)
- Add a CSF story for `grid`, `navigation`, or `popover-tooltip`

## Timeline

Community-driven, no fixed deadlines. Progress depends on contributor availability.
