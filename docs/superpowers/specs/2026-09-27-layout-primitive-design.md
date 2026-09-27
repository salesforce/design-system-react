# Layout + LayoutItem — Design Spec

- **Status:** Draft, pending review
- **Date:** 2026-09-27
- **Branch:** `worktree-feat-layout-primitive` (off `origin/master`)
- **Author:** design-system-react team (drafted with Claude Code)

## 1. Problem & Motivation

DSR has **no layout primitive**. Every recipe, example, and component hand-writes
SLDS grid utility classes (`slds-grid`, `slds-col`, `slds-size_*`, `slds-grid_align-*`,
`slds-col_bump-*`). A designer flagged this as by far the biggest gap versus the
Lightning Base Components (LBC): `lightning-layout` / `lightning-layout-item` are used
~62 times in equivalent surfaces, and DSR forces everyone to reconstruct that grid by hand.

Quantified demand in this repo (hand-written inline usage today):

- `slds-grid` in **78 files**, `slds-col` in **64 files**, `slds-size_*` in **16 files**.
- `slds-grid_vertical-align-center` (59), `slds-grid_align-spread` (35), `slds-grid_vertical` (46),
  `slds-grid_align-end` (11), `slds-grid_vertical-align-start` (6), `slds-grid_align-center` (2).
- `slds-col_bump-left` (19), `slds-col_bump-right` (1).
- `slds-wrap` (21), `slds-nowrap` (4).
- Fractional sizes: `slds-size_1-of-1` (67), `slds-size_1-of-4` (42), `slds-size_1-of-2` (22),
  `slds-size_1-of-3` (20), `slds-size_3-of-4` (10).

A typed `Layout` / `LayoutItem` pair mirroring the LBC API replaces these hand-written
class strings with a familiar, type-safe, documented primitive.

## 2. Goals

- Ship a typed `Layout` (container) and `LayoutItem` (child) mirroring `lightning-layout` /
  `lightning-layout-item` **prop names and value enums exactly**, so migration is 1:1 and the
  mental model is already known to consumers.
- Achieve **de facto full parity** with the LBC API (see §5 gap analysis) — the deliberate
  decision (2026-09-27) is to fold in the small remaining gaps rather than log them for later.
- Follow the repo's modern component-authoring conventions (`docs/codebase-overview.md`):
  functional + `forwardRef`, `types.ts`, `classnames`, dual exports, CSF3 stories, Vitest tests.
- Add **zero new runtime dependencies** (`classnames` is already a dependency).

## 3. Non-Goals / Out of Scope

- **Oddball SLDS fractions** (`slds-size_1-of-5`, `1-of-7`, etc.). LBC's 12-column model does
  not support them either; we intentionally match LBC and leave these to hand-written classes.
  This is the *only* documented gap remaining after v1 (see §5).
- **SLDS named absolute sizes** (`slds-size_xx-small … slds-size_full`) and `slds-order_*` —
  not part of the LBC layout-item API; out of scope for v1.
- **Gutters** (`slds-gutters*`) as a distinct prop — LBC models spacing via `pullToBoundary`
  (container) + `padding` (item), which we mirror; raw `slds-gutters` is not exposed.
- Rewriting existing consumers to adopt `Layout`. This spec delivers the primitive; migrating
  the 62+ hand-written sites is follow-up work.

## 4. Public API

Both components are functional, use `forwardRef` to their root `<div>`, set `displayName`,
extend `HTMLAttributes<HTMLDivElement>` (so arbitrary `id` / `style` / `data-*` / `aria-*`
pass through via `...rest`), and compose classes with `classnames`. `className` lands on the
root `.slds-grid` / `.slds-col` node only.

### 4.1 `Layout` (container → `slds-grid`)

```ts
interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Horizontal distribution of items. Default (unset) = start (flex-start). */
  horizontalAlign?: 'center' | 'space' | 'spread' | 'end';
  /** Vertical alignment of items. Default (unset) = default cross-axis behavior. */
  verticalAlign?: 'start' | 'center' | 'end' | 'stretch';
  /** Pull items to the layout boundaries (pairs with LayoutItem `padding`). */
  pullToBoundary?: 'small' | 'medium' | 'large';
  /** Wrap items to subsequent rows when they exceed the layout width. */
  multipleRows?: boolean;
  className?: string;
  children?: ReactNode;
}
```

Prop → class mapping (root `<div className="slds-grid …">`):

| Prop / value | Class appended |
|---|---|
| `horizontalAlign="center"` | `slds-grid_align-center` |
| `horizontalAlign="space"` | `slds-grid_align-space` |
| `horizontalAlign="spread"` | `slds-grid_align-spread` |
| `horizontalAlign="end"` | `slds-grid_align-end` |
| `verticalAlign="start"` | `slds-grid_vertical-align-start` |
| `verticalAlign="center"` | `slds-grid_vertical-align-center` |
| `verticalAlign="end"` | `slds-grid_vertical-align-end` |
| `verticalAlign="stretch"` | `slds-grid_vertical-stretch` |
| `pullToBoundary="small"` | `slds-grid_pull-padded` |
| `pullToBoundary="medium"` | `slds-grid_pull-padded-medium` |
| `pullToBoundary="large"` | `slds-grid_pull-padded-large` |
| `multipleRows` (true) | `slds-wrap` |
| (any align/boundary unset) | *no class* |

### 4.2 `LayoutItem` (child → `slds-col`)

```ts
type Flexibility = 'auto' | 'shrink' | 'no-shrink' | 'grow' | 'no-grow' | 'no-flex';

interface LayoutItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Relative width in a 12-column grid, all device types. 1–12. */
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Width on small devices and up (requires `size`). 1–12. */
  smallDeviceSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Width on medium devices and up (requires `size`). 1–12. */
  mediumDeviceSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Width on large devices and up (requires `size`). 1–12. */
  largeDeviceSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Fluidity. A single token or an array/comma-list combining tokens. */
  flexibility?: Flexibility | Flexibility[];
  /** Padding on the item. */
  padding?:
    | 'horizontal-small' | 'horizontal-medium' | 'horizontal-large'
    | 'around-small' | 'around-medium' | 'around-large';
  /** Bump alignment of adjacent items in a direction (the SLDS `_bump` utility). */
  alignmentBump?: 'left' | 'top' | 'right' | 'bottom';
  className?: string;
  children?: ReactNode;
}
```

Prop → class mapping (root `<div className="slds-col …">`):

| Prop / value | Class appended |
|---|---|
| `size={n}` | `slds-size_{n}-of-12` |
| `smallDeviceSize={n}` | `slds-small-size_{n}-of-12` |
| `mediumDeviceSize={n}` | `slds-medium-size_{n}-of-12` |
| `largeDeviceSize={n}` | `slds-large-size_{n}-of-12` |
| `flexibility="auto"` | fluid grow behavior — exact class confirmed at impl (see §10) |
| `flexibility="shrink"` | `slds-shrink` |
| `flexibility="no-shrink"` | `slds-shrink-none` |
| `flexibility="grow"` | `slds-grow` |
| `flexibility="no-grow"` | `slds-grow-none` |
| `flexibility="no-flex"` | `slds-no-flex` |
| `padding="around-medium"` (etc.) | spacing class per token — `slds-p-*` vs `slds-col_padded*` confirmed at impl (see §10) |
| `alignmentBump="left"` | `slds-col_bump-left` |
| `alignmentBump="top"` | `slds-col_bump-top` |
| `alignmentBump="right"` | `slds-col_bump-right` |
| `alignmentBump="bottom"` | `slds-col_bump-bottom` |

**Notes / decisions:**

1. **12-column model.** `size` and the device sizes map to `slds-size_{n}-of-12`. Common
   fractions are expressible (`size={6}` = 1/2, `size={4}` = 1/3, `size={3}` = 1/4, `size={9}` = 3/4).
   This matches LBC exactly. Non-12 denominators are out of scope (§3).
2. **`flexibility` accepts a list.** LBC allows a comma-separated list (e.g. `"auto, no-shrink"`).
   We accept a single token or an array (`flexibility={['grow', 'no-shrink']}`) and join the
   resulting classes. `auto` maps to the fluid grow behavior; combinations are additive.
3. **`padding` token → SLDS spacing class.** The 6 LBC tokens map to the SLDS spacing scale:
   `around-{s,m,l}` → `slds-p-around_{small,medium,large}`; `horizontal-{s,m,l}` →
   `slds-p-horizontal_{small,medium,large}`. (Implementation will confirm the exact class the
   LBC component emits; the token set is fixed to LBC's 6.)
4. **Dev-time guardrail.** If any device size is set without `size`, emit a `warning()` (LBC
   documents that device sizes require `size`). Mirrors the repo's `check-props` convention.
5. **`Layout.Item` alias.** Canonical usage is the two named exports; `Layout.Item = LayoutItem`
   is attached as a free convenience alias.

### 4.3 Usage example

```tsx
import { Layout, LayoutItem } from '@salesforce/design-system-react';

<Layout horizontalAlign="spread" verticalAlign="center" multipleRows>
  <LayoutItem size={6} mediumDeviceSize={4} padding="around-small">…</LayoutItem>
  <LayoutItem flexibility="auto">…</LayoutItem>
  <LayoutItem alignmentBump="left">…</LayoutItem>
</Layout>
```

## 5. LBC Parity Gap Analysis

> This section is written to be shared with the team. It compares what we ship in v1 against
> the full `lightning-layout` / `lightning-layout-item` API so the team can confirm parity or
> flag anything they'd rather scope differently before release.

**Doc-source caveat for reviewers:** `lightning-layout-item` has **no standalone Component
Library page** — its bundle URL silently redirects to `lightning-layout`, which shows only the
4 *container* attributes. The authoritative item attribute table lives at
`developer.salesforce.com/docs/platform/lightning-component-reference/guide/lightning-layout-item.html`.
Verified against both sources on 2026-09-27.

### `lightning-layout` (container) — 4 attributes

| LBC attribute | Accepted values | v1 | Notes |
|---|---|---|---|
| `horizontalAlign` | center, space, spread, end | ✅ full | — |
| `verticalAlign` | start, center, end, stretch | ✅ full | `end` folded in (0 current repo uses, but free) |
| `pullToBoundary` | small, medium, large | ✅ full | pairs with item `padding` |
| `multipleRows` | boolean | ✅ full | — |

### `lightning-layout-item` — 7 attributes

| LBC attribute | Accepted values | v1 | Notes |
|---|---|---|---|
| `size` | 1–12 | ✅ full | 12-column |
| `smallDeviceSize` | 1–12 | ✅ full | requires `size` (dev warning) |
| `mediumDeviceSize` | 1–12 | ✅ full | requires `size` |
| `largeDeviceSize` | 1–12 | ✅ full | requires `size` |
| `flexibility` | auto, shrink, no-shrink, grow, no-grow, no-flex (list) | ✅ full | single or array/comma-list |
| `padding` | horizontal-/around- × small/medium/large | ✅ full | 6 tokens |
| `alignmentBump` | left, top, right, bottom | ✅ full | the designer's `_bump` |

### Remaining documented gaps after v1

1. **Non-12 SLDS fractions** (`1-of-5`, `1-of-7`, …): out of scope. LBC does not support these
   either, so this is parity-neutral — a recipe needing them still hand-writes the class.
2. **SLDS named absolute sizes / `slds-order_*` / raw `slds-gutters`:** not part of the LBC layout
   API; intentionally not exposed.

**Bottom line:** v1 is a *superset-safe, de facto full match* of the LBC `lightning-layout` /
`lightning-layout-item` prop surface. There is nothing in the LBC layout API that a consumer
could set that our `Layout` / `LayoutItem` cannot express.

## 6. Existing `Grid` component — deprecation

`components/grid/index.tsx` already exists: a legacy class-based `Grid` / `Grid.Column` covering
only `slds-grid`, `slds-grid_{flavor}`, and `slds-col`. It is **unexported** from
`components/index.js`, has **no story and no test**, and is flagged in `ROADMAP.md`. It is
effectively dead code.

**Plan:** build `Layout` / `LayoutItem` fresh; mark `Grid` deprecated.

- Add `@deprecated` JSDoc to `Grid`, `GridProps`, `GridColumnProps` pointing to `Layout` / `LayoutItem`.
- Add a dev-only `warning()` on `Grid` render.
- Leave `Grid` in place (still unexported) so nothing that shipped breaks; note the supersession
  in `ROADMAP.md`.
- No public API break: `Grid` was never exported.

## 7. Component Structure & Files

```
components/layout/
├── index.tsx              # re-export Layout, LayoutItem; attach Layout.Item = LayoutItem
├── layout.tsx             # Layout: forwardRef<HTMLDivElement>, displayName = 'Layout'
├── layout-item.tsx        # LayoutItem: forwardRef<HTMLDivElement>, displayName = 'LayoutItem'
├── types.ts               # LayoutProps, LayoutItemProps (extend HTMLAttributes<HTMLDivElement>)
├── component.json         # metadata
├── __docs__/Layout.stories.tsx
└── __tests__/layout.test.jsx
```

- Files stay well under the 500-line guideline; container and item are separate files.
- **Exports** (`components/index.js`): add both plain and `SLDS`-prefixed, matching repo convention:
  `Layout` / `SLDSLayout`, `LayoutItem` / `SLDSLayoutItem`.
- **`component.json`**: `{ "component": "layout", "status": "prod", "display-name": "Layout",
  "classKey": "Layout", "url-slug": "layout", "SLDS-component-path": "/components/layout" }`.

## 8. Testing Plan

Location: `components/layout/__tests__/layout.test.jsx` — jsdom `unit` Vitest project.
Follows the repo's **actual** shared checklist (verified across button/input/pill/icon/spinner);
notably the repo does **not** write `forwardRef` tests, per-component snapshots, or `jest-axe`
unit tests — a global `components/__tests__/story-snapshots.test.jsx` auto-composes every story,
so our stories get snapshot coverage for free, and axe runs over stories via the Storybook a11y addon.

Imports: `{ render, screen, fireEvent }` from `@testing-library/react`, `{ describe, it, expect }`
from `vitest`. No `IconSettings` wrapper needed (Layout renders no icons), unlike most components.

Test cases:

- **Layout**
  - renders a `<div className="slds-grid">` with children.
  - each `horizontalAlign` value → correct `slds-grid_align-*` class.
  - each `verticalAlign` value → correct `slds-grid_vertical-align-*` / `slds-grid_vertical-stretch` class.
  - each `pullToBoundary` value → correct `slds-grid_pull-padded[-size]` class.
  - `multipleRows` → `slds-wrap`; absent → no `slds-wrap`.
  - unset align/boundary props → none of those classes present ("default = no class").
  - custom `className` merged onto the root alongside `slds-grid`.
  - `...rest` passthrough: `id`, `style`, `data-*`, `aria-*` land on the root.
- **LayoutItem**
  - renders `<div className="slds-col">` with children.
  - `size={n}` → `slds-size_{n}-of-12`; device sizes → `slds-{small,medium,large}-size_{n}-of-12`.
  - each `flexibility` token → its class; array/list → all classes present.
  - each `padding` token → its spacing class.
  - each `alignmentBump` value → `slds-col_bump-*`.
  - device size without `size` → dev warning emitted.
  - `className` merge + `...rest` passthrough as above.

Target ≥90% coverage (repo standard). Run: `npm run test:unit`.

## 9. Storybook Plan

Location: `components/layout/__docs__/Layout.stories.tsx` — CSF3 TypeScript, auto-discovered.
`Meta<typeof Layout>`, `title: 'Components/Layout'`, `tags: ['autodocs']`,
decorator wrapping in `slds-p-around_medium` (no `IconSettings` needed).
Thoroughness modeled on the SDS `layout.stories.js` reference (Flexbox/Grid/Nested/Responsive
structure) adapted to our SLDS-grid prop model, with per-prop `argTypes` select/boolean controls
and a small styled demo cell so alignment is visible.

Stories:

1. **Default** — basic 3-item row.
2. **HorizontalAlign** — showcase center / space / spread / end (controllable via args).
3. **VerticalAlign** — start / center / end / stretch, in a fixed-height container.
4. **MultipleRows** — many items wrapping.
5. **PullToBoundary** — with padded items, showing boundary pull.
6. **FixedSizes** — items using `size` (e.g. 6/3/3, 4/4/4).
7. **ResponsiveSizes** — `size` + `smallDeviceSize` / `mediumDeviceSize` / `largeDeviceSize`.
8. **Flexibility** — `auto` / `grow` / `no-flex` combinations.
9. **AlignmentBump** — `alignmentBump="left"` pushing an item to the far edge (toolbar pattern).
10. **Padding** — item `padding` variants.
11. **Nested** — a `Layout` inside a `LayoutItem` (composed showcase).
12. **KitchenSink / Playground** — args-driven story exercising the full control set.

## 10. Risks & Open Questions

- **`flexibility="auto"` exact class:** LBC's "auto" (fluid, absorbs extra space) maps to the SLDS
  grow behavior; implementation will confirm the exact class(es) the LBC component emits and match
  them. Low risk — additive utility classes.
- **`padding` exact class:** confirm whether LBC emits `slds-p-*` spacing classes or `slds-col_padded*`
  flavors for its `padding` tokens; match whichever LBC produces. Token set is fixed regardless.
- **Branch/push:** per team memory, DSR PRs push to `origin` via the `showerbee` account (not a fork)
  so Chromatic runs. This branch (`worktree-feat-layout-primitive`) branches off `origin/master`;
  final branch name to be confirmed at PR time.

## 11. Rollout

1. Implement `Layout` / `LayoutItem` + types (TDD per repo conventions).
2. Add tests (§8) and stories (§9); confirm the global story-snapshot suite picks them up.
3. Add `component.json` + dual exports; deprecate `Grid` (§6).
4. `npm run lint`, `npm run typecheck`, `npm run test:unit`, `npm run build-storybook` green.
5. PR with the §5 gap analysis in the description for the team's parity confirmation.
6. (Follow-up) migrate hand-written `slds-grid`/`slds-col` sites incrementally.
