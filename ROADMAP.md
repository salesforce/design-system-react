# v11 Roadmap

> **Status: alpha.** v11 (React 19, TypeScript, SLDS 2) is published under the
> `alpha` npm tag; the latest release is `11.0.0-alpha.4`. The stable 0.10.x line
> stays on the `latest` tag and the [`0.10.x` branch](https://github.com/salesforce/design-system-react/tree/0.10.x).
> See [CHANGELOG.md](CHANGELOG.md) for what each alpha changed.

## Status Snapshot (2026-10-11)

| Area              | State                                     | Notes                                                                                                                                     |
| ----------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Component sources | **TypeScript**                            | `components/utilities/dialog/index.jsx` is the last `.jsx` source; the rest of the `.jsx` files are sample data                           |
| Positioning       | **`@floating-ui/dom`**                    | `popper.js` is gone; `computeFloatingData` in `utilities/dialog` still reshapes Floating UI output into the old popper shape              |
| TypeScript        | **`tsc --noEmit` clean**, `strict: true`  | `.d.ts` files are generated into `dist/types`                                                                                             |
| Storybook         | **10**, CSF stories                       | 2 component folders have no story: `grid`, `menu-list`                                                                                    |
| Tests             | **48 Vitest files**                       | jsdom `unit` project plus a Playwright `browser` project; story HTML snapshots cover non-portal stories in a top-level `__docs__/` folder |
| Lint              | **0 errors / 223 warnings**               | Errors block CI; warnings are the tracked migration backlog                                                                               |
| Toolchain         | Vite 8, Vitest 4, ESLint 10, Storybook 10 | Node.js 24 (`.nvmrc`)                                                                                                                     |
| SLDS 2 CSS        | **npm dependency**                        | `@salesforce-ux/design-system-2` installs with the package; consumers add the stylesheet themselves (see the README)                      |
| Publishing        | **GitHub Release → npm, `alpha` tag**     | `.github/workflows/npm-publish.yml`; alpha.3 and alpha.4 published from it                                                                |

## Prioritized Plan

### P1 — Path to a stable v11

- [ ] Fix the `components/<name>` entry points for `ColorPicker`, `Filter`, and `Tree`.
      `scripts/generate-entry-shims.mjs` only emits a shim beside a built `index` file,
      and these three have none in `dist/`, so the subpath import fails to resolve.
- [ ] Loosen the `@salesforce-ux/design-system` peer dependency. It is pinned to
      `2.25.0-alpha.2`, which npm 7+ auto-installs and which conflicts with any newer
      version already in the consumer's tree. It is only needed for the icon sprites.
- [ ] Write a 0.10.x → v11 migration guide (removed components, `DataTable` rename,
      React 19, module format).
- [ ] Publish hosted docs for v11. `react.lightningdesignsystem.com` redirects to
      GitHub, and there is no public v11 documentation site (Chromatic builds Storybook
      on push, but only for review).
- [ ] Use one tag format for releases. `11.0.0-alpha.4` has no `v` prefix, unlike the
      earlier `v11.0.0-alpha.*` tags.
- [ ] At GA: change `publishConfig.tag` from `alpha` to `latest` and update the
      README's version table.

### P2 — Close the story & test gaps

**Component folders with no Storybook story:**

- [ ] `grid`
- [ ] `menu-list`

**Component folders with no Vitest test** (template: `components/button/__tests__`):

- [ ] `badge`, `breadcrumb`, `checkbox`, `dynamic-icon`, `files`, `grid`, `icon-settings`,
      `menu-list`, `panel`, `portal-settings`, `progress-bar`, `progress-ring`, `radio`,
      `scoped-notification`, `trial-bar`

**Stories missing from the HTML snapshot suite:** the snapshot test only globs
`__docs__/*.stories.*`, so these nested stories are rendered by Storybook but not snapshotted:

- [ ] `components/forms/input/__docs__/inline/InlineInput.stories.jsx`
- [ ] `components/input/__docs__/search/SearchInput.stories.jsx`

**Story/feature gaps vs. SLDS 2** — from the component-by-component comparison in
[`docs/superpowers/specs/2026-08-07-slds2-vs-react-comparison.md`](docs/superpowers/specs/2026-08-07-slds2-vs-react-comparison.md).
Ordered by leverage; skip anything filed "Legacy Components" upstream.

- [ ] **Token-theming ("Customization") story pattern.** SLDS 2 attaches a live
      styling-hook / design-token panel to ~20 components; React has none. Build a shared
      decorator + exemplar "Theming" stories for `button`, `card`, `input`, `avatar` first,
      then extend.
- [x] **Wire existing `__examples__` into stories:**
  - [x] `builder-header` — toolbar, utilities, successful/after-successful/failed-save stories.
  - [x] `combobox` — Storybook coverage lost in the TypeScript rewrite restored ([#3221](https://github.com/salesforce/design-system-react/pull/3221)).
- [ ] **Add missing high-value state stories:**
  - [ ] `docked-composer` — voice/telephony call-state suite (~10 states), popped-out, overflow menu, log-a-task.
  - [ ] `card` — Loading, Collapsed, NestedCards, DataTiles.
  - [ ] `checkbox` — fieldset group variants, read-only "view mode", help-text/tooltip.
  - [ ] `accordion` — ActionMenu, Nested, WrappedInCard, heading truncation.
  - [ ] `modal` — SizeFull; `tabs` — conditional tab, scoped-with-overflow.
  - [ ] `radio-group` — help-icon(+tooltip), disabled-checked, error-checked, label-placement.

**Component feature gaps (capability missing, not just a story)** — file as
enhancement issues, not story fill-ins:

- [ ] `vertical-navigation` — badge / compact / icon / shaded / overflow / validation variants.
- [ ] `visual-picker` — small size tier, disabled state.
- [ ] `date-picker` — date-**range** selection (SLDS 2 is a dual single/range picker; React is single-only).
- [ ] `input` — native `type` variants (checkbox / toggle / range / color / file).

### P3 — Cleanup

- [ ] Convert `components/utilities/dialog/index.jsx` to `.tsx`, and drop the
      popper-shaped adapter (`computeFloatingData`, consumed by `utilities/dialog-helpers.js`).
- [ ] Delete the vendored `assets/styles/slds-plus.css`; nothing outside planning docs
      references it.
- [ ] Work down the lint warning backlog.

## Done since the 2026-08-11 snapshot

- popper.js → `@floating-ui/dom` for all positioning
- Toolchain majors: Vite 8, Vitest 4, ESLint 10 (flat config), Babel 8, jsdom 30
- Publish pipeline repaired and switched to the `alpha` npm tag (Node 24)
- Storybook theme toolbar for Lightning Blue / Cosmos and light / dark / system color schemes
- Removed in v11: `AppLauncher`, `BrandBand`, `Expression`, `GlobalHeader`,
  `GlobalNavigationBar`, `LocationMap`, `Lookup`, `Notification`, `Picklist`, `TimePicker`;
  `DataTable` renamed to `SimpleDataTable`

## Known Limitations

1. **Node.js** — Requires Node.js >= 24.
2. **React 19 only** — no backward compatibility with React 16/17/18. Use 0.10.x for those.
3. **No bundled CSS** — the package does not ship a stylesheet; consumers add one from
   `@salesforce-ux/design-system-2`.

### Runtime prop validation (intentional tradeoff)

Converting components to TypeScript removed their `static propTypes`. TS types are
erased at build time, so a **plain-JS/Babel consumer no longer gets React's
dev-mode PropTypes console warnings** (wrong prop type / missing required prop) for
converted components. This is a deliberate, conventional tradeoff for a TS
migration (React itself deprecated PropTypes in v19; MUI, Chakra, etc. made the
same move). We accepted it rather than dual-maintaining hand-written PropTypes
alongside the types.

What still protects consumers:

- **Shipped `.d.ts` declarations.** The package emits per-file declarations
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
- Add a CSF story for `grid` or `menu-list`

## Timeline

Community-driven, no fixed deadlines. Progress depends on contributor availability.
