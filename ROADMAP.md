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
- [x] Loosen the `@salesforce-ux/design-system` peer dependency. It was pinned to
      `2.25.0-alpha.2`, which conflicted with any newer version already in the
      consumer's tree. It is now `^2.25.0-alpha.2`.
- [ ] Write a 0.10.x → v11 migration guide (removed components, `DataTable` rename,
      React 19, module format).
- [ ] Publish hosted docs for v11. `react.lightningdesignsystem.com` redirects to
      GitHub, and there is no public v11 documentation site (Chromatic builds Storybook
      on push, but only for review).
- [ ] Use one tag format for releases. `11.0.0-alpha.4` has no `v` prefix, unlike the
      earlier `v11.0.0-alpha.*` tags.
- [ ] At GA: change `publishConfig.tag` from `alpha` to `latest` and update the
      README's version table.

### P1 — Prop API freeze review (before GA)

Props are being reviewed against [docs/codebase-overview.md](docs/codebase-overview.md)
in groups of five components, in directory order, so that no breaking prop change is
needed after 11.0. Changes below are **breaking if they ship after GA**; land them
(with `utilities/warning/*` shims for the old names where practical) before the tag
moves to `latest`.

**Review complete (all components except `utilities`). Breaking changes by theme:**

1. **Removals of deprecated surface.** `forms/input/inline` (InlineEdit), the `forms/checkbox`
   alias, `tabs/pane.ts`; `modal` deprecated `title`/`closeButtonAssistiveText` and
   `ModalTrigger`; `assistiveText: string | object` becomes object-only (avatar, breadcrumb,
   spinner, textarea, tree); `tooltip` dead/legacy props (`openByDefault`, `isInline`,
   `target`, `info`/`error` variants).
2. **Uncontrolled data and selection.** Rule of thumb: if it would reasonably live in
   Redux/app state, it is controlled. Remove `default*` twins and internal copies from
   checkbox, radio, input, combobox, slider, textarea and tabs. Selection is controlled in
   menu-dropdown, radio-group, simple-data-table, split-view, tree, vertical-navigation,
   color-picker, date-picker and button-stateful (tree also stops mutating consumer nodes).
   Ephemeral and allowed to stay uncontrolled (mode by `value !== undefined`, plus
   `defaultIsOpen`): `isOpen` on popover, tooltip, expandable-section, date-picker,
   setup-assistant and split-view; carousel `currentPanel`/autoplay; tree expansion.
3. **Child and slot contracts.** Allowed when every accepted child is an existing library
   component with typed props (accordion, setup-assistant, radio-group, simple-data-table,
   tabs, visual-picker, welcome-mat, panel, button-group, builder-header, files, icon/badge
   slots in alert, toast, scoped-notification, vertical-navigation, input); just type the
   children, keep injected props out of the public type, and match by reference rather than
   `displayName`. Still breaking: slots that take arbitrary consumer elements (menu-dropdown,
   popover and tooltip triggers). Where a parent merges a child's props with its own,
   consumer props win (combobox `popover`/`input`/`tooltipMenuItemDisabled`; `onChange` is
   wrapped so both handlers run).
4. **Callback shapes.** Move to `(event, data)` and report the _requested_ state: toast,
   tabs (also drop `return false` veto), tree, split-view, menu-dropdown, date-picker,
   popover, welcome-mat, carousel, setup-assistant; wrap pill-container's callbacks in an
   `events` object.
5. **Booleans.** `is*`/`has*` renames (slider `vertical`, pill `bare`, visual-picker
   `coverable`/`vertical`, 11 in simple-data-table, combobox `multiple`/
   `predefinedOptionsOnly`; split-view `multiple` pending the native-attribute rule);
   booleans defaulting to true (spinner `hasContainer`, welcome-mat `isOpen`); shared
   `isDismissible` for toast and alert.
6. **`className` and root.** `className` lands on the real root (slider, tree, welcome-mat,
   popover, spinner, modal, vertical-navigation); other parts use `className*`; `forwardRef`
   targets the root.
7. **Labels, `assistiveText` and naming.** Inverted split-view toggle keys, split labels
   (tree heading, trial-bar time), `errorText` becomes `labels.error` + `hasError` (slider,
   textarea), duplicate `label`/`assistiveText.label`, `onRender*` props renamed to slot or
   render names.
8. **Typing the contract.** Discriminated unions (tree nodes, welcome-mat variants, combobox,
   menu-dropdown and color-picker variants/options), no index signatures
   (vertical-navigation, split-view), textarea `maxLength` as a number.
9. **Fix now (bugs, not breaking).** simple-data-table `getAssistiveText` argument order,
   grid `"undefined slds-col"`, split-view `bottomRightText` title, vertical-navigation
   `aria-current`, tabs `disabled` type, toast timer re-arm.

_Reviewed: accordion, alert, avatar, badge, breadcrumb, builder-header, button, button-group, button-stateful, card, carousel, checkbox, color-picker, combobox, date-picker, docked-composer, dynamic-icon, expandable-section, files, filter, forms, grid, icon, icon-settings, illustration, input, media-object, menu-dropdown, menu-list, modal, page-header, panel, pill, pill-container, popover, portal-settings, progress-bar, progress-indicator, progress-ring, radio, radio-button-group, radio-group, scoped-notification, setup-assistant, simple-data-table, slider, spinner, split-view, tabs, textarea, toast, tooltip, tree, trial-bar, vertical-navigation, visual-picker, welcome-mat._

- [ ] `alert` — rename `dismissible` → `isDismissible`.
- [ ] `avatar` — rename `inverse` → `isInverse`.
- [ ] `alert` — decide `variant`: required, or optional with a documented default (it is
      required in the type but defaults to `'info'`).
- [ ] `alert` — stop `cloneElement`-injecting `containerClassName`/`inverse`/`size` into the
      `icon` prop, or document it as the contract.
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `alert` — decide whether focusing the close button on mount (and restoring focus on
      unmount) stays the default or becomes opt-in.
- [ ] `accordion` — replace the `cloneElement` + `Children.count` child contract (implicit
      `refs`/`onClickSummary`/`onKeyDownSummary` injection) with context or an `items` prop.
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `accordion` — decide whether the first summary button should be focused on mount
      (currently it is, from `currButtonIndex` starting at `0`).
- [ ] `breadcrumb` — decide `trail: ReactNode[]` (positional, index keys) vs `items` with ids;
      replace `styleContainer` with `className` on the root `nav`.
- [ ] `avatar`, `breadcrumb` — drop the `assistiveText: string | object` union (object only).
- [ ] `badge` — decide `content` prop vs `children`; `style` currently lands on the icon
      span, not the root.
- [ ] `avatar` — move the `title` default (`'user avatar'`) out of the prop default and into
      `assistiveText`/`labels`.
- [ ] `button-stateful` — remove the uncontrolled path (it is data): `active` → `isActive` (required,
      controlled), and `onClick` carries the next value. Today it falls back to internal
      `useState` when `active` is not a boolean.
- [ ] `button-stateful` — replace `stateOne`/`stateTwo`/`stateThree` (positional names) with
      named states; move the English defaults (`Follow`/`Following`/`Unfollow`) into
      `labels` and decide whether they stay as defaults.
- [ ] `button-stateful` — stop calling `currentTarget.blur()` on mouse leave and blur (it
      drops keyboard focus); `onMouseDown` is accepted but ignored outside the icon variants.
- [ ] `button` — rename the non-native booleans `inverse`, `hint`, `responsive` and
      `requestFocus` to `is*`/`has*`. `disabled` keeps its name: attributes that pass through
      to the DOM keep their HTML names (see Naming Conventions). `requestFocus`/`onRequestFocus`
      also misuse the `onRequest*` prefix.
- [ ] `button` — pick one ref API (`ref` vs `buttonRef`); model `variant: 'icon'` +
      `iconVariant`/`iconSize` as a discriminated union; give the deprecated `tooltip` prop a
      sunset path (`utilities/warning/sunset-property`) or remove it.
- [ ] `button`, `button-stateful` — extend `ButtonHTMLAttributes` so `name`, `value`, `role`,
      `autoFocus`, etc. pass through (only `aria-*`/`data-*`/`form*` do today). Settle `tabIndex`
      type (`button` takes `number | string`, `button-stateful` only `string`).
- [ ] `button-group` — replace the implicit `cloneElement` contract (`triggerClassName` on the
      last child, `variant: 'button-group'` on checkbox children); make `variant` an explicit
      union including the default; type `labels` as `ReactNode`.
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `builder-header` — keep the `events: { onClickBack, onClickHelp }` object (decided).
- [ ] `builder-header` — replace children-by-`displayName` slot detection (and the same in
      `-nav`, `-toolbar`) with named slot props; `-toolbar` silently drops non-`ButtonGroup`
      children and `-nav` drops anything but link/dropdown.
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `builder-header` — remove the hardcoded `position: relative; height: 100px` wrapper
      (so `className` lands on the real root), and decide the English default labels.
- [ ] `builder-header/nav-dropdown` — stop extending `MenuDropdownProps` wholesale so
      `menu-dropdown` changes don't leak into this API.
- [ ] `card` — rename `bodyClassName` → `classNameBody`; make `empty: boolean | ReactNode`
      two props or one `ReactNode`; decide the English defaults (`heading = 'Related Items'`,
      `'No Related Items'`); `header` is `cloneElement`-merged with a media-object contract.

**Control model (decided).** _Data and values are always controlled_ — they are app state
(`checked`, `value`, `selection`, `isActive`, a date): required prop plus `onChange`, no
`default*` twin and no internal copy. _Ephemeral UI state may be uncontrolled_ (`isOpen`,
current carousel panel, autoplay on/off, roving focus, image-load error): internal state,
optional controlled prop, and an optional `default*` prop. For ephemeral state the mode is
chosen by whether the **value prop** is `!== undefined`, never by whether a callback is
present, and a controlled prop is always honored (no internal flip, no seeding via effect).
Callbacks stay grouped in an `events` object where components already use one
(`color-picker`, `combobox`, `builder-header`); do not flatten them.

- [ ] `carousel` — `currentPanel`/`isAutoplayOn` are ephemeral UI (re-audited with the "would it live in Redux?" test: a slide position and autoplay toggle would not): keep both uncontrolled-capable
      but key the mode off the value prop (today they only update internal state when
      `onRequestPanelChange`/`onRequestAutoplayToggle` is _absent_, so a callback without a
      value freezes the carousel). Add `defaultCurrentPanel`/`defaultIsAutoplayOn`, and stop
      `hasAutoplay` doubling as "start playing".
- [ ] `carousel` — `onRequestAutoplayToggle` reports the _current_ `isAutoplayOn`, not the
      requested one; `event` may be `{}` or a stale event; `onRenderItem` is typed
      `(item)` but called with `{ item, ... }`; `CarouselItemData.id` is `string` but
      examples pass numbers; `itemsPerPanel` is unvalidated.
- [ ] `color-picker` — `value` is data: make it fully controlled (required, no seeding into
      `useState`, no uncontrolled typing when `onChange` is missing; a parent that rejects a
      change must be able to revert). The in-popover working color is a draft: keep it
      internal and treat `valueWorking` as controlled-if-provided, not seeded.
      `isOpen` stays uncontrolled-capable but must be honored when provided (today a
      controlled `isOpen={false}` still opens); add `defaultIsOpen`. Derive `errorText`
      instead of seeding it once.
- [ ] `color-picker` — keep the `events` object. Wire or remove the four entries that are
      typed but ignored (`events.onClose`/`onOpen`/`onRequestClose`/`onRequestOpen`; only the
      top-level props are wired) and make `events` referentially stable (`events = {}` is a
      new object every render). Rename the boolean-returning `onValidateColor`/
      `onValidateWorkingColor` (return values are not allowed; they are not events);
      `onRequestClose` closes before the parent can veto and `trigger` is an untyped `string`;
      `onRequestOpen()` takes no `(event, data)` and fires on close too.
- [ ] `color-picker` — `variant` + `defaultSelectedTab` + `swatchColors` as a discriminated
      union; `hideInput` → `isInputHidden`; decide where `id` lands (no DOM node today).
- [ ] `combobox` — keep the `events` object, but make it referentially stable (rebuilt every
      render today) and type each callback's `data`. `selection` and `value` are data and
      stay controlled: drop `defaultValue`. `isOpen` is ephemeral: uncontrolled-capable, mode
      keyed off the `isOpen` value (supplying `onRequestOpen` without `isOpen` currently means
      it can never open), add `defaultIsOpen`. `onRequestClose` fires and the component closes
      anyway; `onClose` fires after an internal change even when `isOpen` is controlled;
      `onSelect` is really a request (`selection` is controlled).
- [ ] `combobox` — enforce `variant` as a discriminated union (`popover`/`assistiveText.
popoverLabel` are runtime-warned only; `options` is "required unless popover" only at
      runtime); `value` + `defaultValue` feed one input and flip controlled/uncontrolled (resolved by dropping `defaultValue`).
- [ ] `combobox` — `multiple` → `isMultiple`, `predefinedOptionsOnly` →
      `hasPredefinedOptionsOnly`, `singleInputDisabled` (drop or rename), `selected` →
      `isSelected` on the `onRenderMenuItem` component. `disabled` keeps its name but
      currently does not reach the input at all (only suppresses the dialog).
- [ ] `combobox` — type `popover`, `input` and `tooltipMenuItemDisabled` as the library components
      (today all three are bare `ReactElement`): `ReactElement<Partial<PopoverProps>>`,
      `ReactElement<Partial<InputProps>>`, `ReactElement<Partial<TooltipProps>>`; the child-contract
      exception covers them. Typing `input` exposes a real mismatch: the element's props are spread
      _last_ onto the private `InnerInput` (`{...userDefinedInputProps}`), whose `onChange(event)` is
      native, while `Input`'s is `(event, data)`. Maintainer decisions: consumer props override
      library props when present, so the spread order stays (`id`, `value`, `onKeyDown`, `onFocus`,
      `onBlur`, `onClick` stay overridable); `onChange` is the one exception: combobox wraps the
      consumer's `onChange` so it is called with `(event, data)` and runs _alongside_ combobox's own
      `handleInputChange` (`InnerInput` is private, not exported, and outside semver, so the
      adapter is non-breaking). Document that `popover`'s `body` is supplied and `children` dropped.
- [ ] `combobox` — `ComboboxOption.label: string | fn` is cast to string in many places
      and `filter.js` throws on a function label; `type: ... | string` collapses the union;
      `icon: ReactNode` is cloned and must be an `<Icon>`.
- [ ] `combobox` — callback `data` is `Record<string, unknown>` and always `{}`; `onRequestOpen`
      has no `(event, data)`; `className` lands on the inner `.slds-combobox` and the root is
      `classNameContainer`; decide the `ref` target (forwarded but unused).
- [ ] `date-picker` — `value` is data: fully controlled, typed `Date | null` (null = empty;
      today `value={undefined}` flips to uncontrolled with stale text and a date cannot be
      cleared). Remove `formattedValue` and the seeded `internalValue`. The typed-text
      buffer stays internal (it must hold partial input) but re-syncs from `value`. `isOpen`
      is ephemeral: keep uncontrolled-capable, add `defaultIsOpen`, and route keyboard open/
      close through the same path as the mouse.
- [ ] `date-picker` — `onChange` fires per keystroke with a possibly Invalid `Date`; make the
      contract `date: Date | null` plus `isValid`, add `source`. `parser` cannot signal
      "invalid" (decide `Date | null` return now).
- [ ] `date-picker` — `onRequestOpen`/`onRequestClose`/`onClose` take no `(event, data)`;
      `onRequestClose` fires when already closed and sets internal state even when `isOpen` is
      controlled; keyboard handling bypasses `onRequest*` entirely.
- [ ] `date-picker` — `className` lands on the dialog and `triggerClassName` on the trigger:
      move to `className` (root) + `classNameTrigger` + `classNameMenu`. `forwardRef` in
      `index.tsx` drops the ref; the `input` prop's merge order lets a consumer's `onChange`/
      `inputRef` override the picker's (breaking focus-on-close). Type `onCalendarFocus`'s
      `direction` as `'next' | 'previous'`. Settle `children`, `label`, `placeholder`,
      `assistiveTextOpenCalendar`, `formattedValue`: remove at GA or keep permanently.
- [ ] `date-picker` — range selection: do not widen `date`/`value` to `Date | [Date, Date]`;
      plan a separate `DateRangePicker` (or `mode="range"` with distinct props).
- [ ] `checkbox` — `checked` is data: controlled only. Remove `defaultChecked` (the
      `onChange` data computes `!checked` from the prop, which is wrong without it). Keep
      `indeterminate` controlled and clear it from the DOM when it goes back to `undefined`.
- [ ] `checkbox` — remove dead `oldEventParameterOrder` (never read; the `forms/checkbox` alias, removed
      in this release, is the only caller) and the Enter/Space `handleKeyDown` that fakes a `ChangeEvent`; wire or
      remove `readOnly` (destructured, never applied).
- [ ] `checkbox` — `variant` (`base | toggle | button-group | visual-picker`) as a discriminated
      union (`indeterminate` with `toggle`, and `errorText`/`className`/`required`/`tabIndex`
      on `button-group`/`visual-picker`, compile but are dropped); `coverable`/`vertical` →
      `isCoverable`/`isVertical`; `requestFocus`/`onRequestFocus` → delete (use `ref`);
      `tabIndex` `string` → `number`; `assistiveText: string | object` → object only; decide
      where `className` lands and whether unknown props spread to the `<input>`.

- [ ] `expandable-section` — `isOpen` is ephemeral, so uncontrolled is fine, but the mode is
      keyed off `onToggleOpen` being present: with a callback and no `isOpen` the section is
      stuck open. Key it off `isOpen !== undefined`, always call `onToggleOpen`, and add a
      `defaultIsOpen` (note it must not be a boolean that defaults to `true`; today the
      internal default is open). `onToggleOpen` reports the _current_ `isOpen`, not the
      requested one.
- [ ] `expandable-section` — rename `nonCollapsible` → `isNonCollapsible`; decide `title`
      now (it is the visible heading, so it will collide with the HTML `title` attribute if
      the component ever extends `HTMLAttributes`; consider `labels.title`/`heading`, typed
      `ReactNode`); `isOpen={false}` with `nonCollapsible` hides content forever (illegal
      combination: make it a union).
- [ ] `docked-composer` — decide whether the body stays mounted when closed (it is unmounted,
      which drops any uncontrolled state inside it); `isOpen` is controlled-only today, so
      plan `defaultIsOpen` if it should also work uncontrolled; keep the `events` object but
      add a `data` argument to `onRequestMinimize`/`onRequestExpand`/`onRequestClose`
      (currently `(event)` only); `role="dialog"` on a non-modal bar needs a focus decision,
      and `aria-describedby` points at a body id that does not exist when closed.
- [ ] `dynamic-icon` — `variant` + `scorePolarity`/`strengthLevel`/`trendDirection` as a
      discriminated union; the `waffle` variant renders a `<button>` with no `type`, no
      `onClick` and no rest props (it submits forms and cannot be wired up), so decide its
      API now (union member with `onClick`, or a separate component); `title` is required but
      doubles as the fallback assistive text; `StrengthLevel` accepts strings and numbers.
- [ ] `files` — `Files.crop` is dead: `File` sets `crop: '16-by-9'` through `defaultProps`, so
      `Files` always reads a defined `childProps.crop` and never applies its own (from
      reading; React resolves class `defaultProps` at element creation, confirm in a test).
      Decide whether `crop` defaults live on `Files` or `File`.
- [ ] `files` — `moreActionsDropdown` is `cloneElement`-injected with `MenuDropdown` props
      (`overlay`, `buttonVariant`, `buttonInverse`, `className`, `triggerClassName`) and
      `Files` clones `crop` into children: both are implicit contracts. `File.labels.title`
      is documented as required but optional in the type; `href` defaults to `'#'`.
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `filter` — `popoverIsOpen` is seeded from `popover.props.isOpen` and never re-synced, then
      overridden by the merged popover props; define one rule (ephemeral: uncontrolled with
      an `isOpen` override and `defaultIsOpen`). `onClick` takes no `(event, data)`.
- [ ] `filter` — the default `removeFilter` text is built by interpolating `property` and
      `predicate` (both `ReactNode`), which renders `[object Object]` for non-strings: take a
      full string via `assistiveText.removeFilter` or a callback. `isError` points
      `aria-describedby` at `${id}-error`, which nothing renders. `"Done"` and the
      `predicate = 'New Filter'` default are English outside `labels`.

- [ ] Remove the deprecated `forms/input/inline` (`InlineEdit`, also exported as
      `SLDSInlineEdit`) in 11.0. It already warns and points to a read-only `Input` swapped
      with a base `Input`, or a `Popover` with an icon `Button` trigger. Delete the component,
      `inline-check-props.js`, its stories/examples/tests and snapshots, the `index.js` and
      `index.d.ts` exports, and the `lodash.isfunction` dependency if nothing else uses it.
      Breaking: `refactor(forms)!:` with a `BREAKING CHANGE:` footer and a migration note.
      No prop redesign is planned for it.
- [ ] Remove the deprecated `components/forms/checkbox` alias in 11.0 (it is only reachable by
      deep import and wraps `checkbox` with the old `onChange(value, event, { value })`
      parameter order). Delete `forms/checkbox` and the warning branch in
      `checkbox/check-props.js`, then drop `oldEventParameterOrder` from `checkbox` (see the
      `checkbox` item above). Breaking for deep importers: needs a migration note pointing at
      `components/checkbox` and the `onChange(event, { value })` signature.
- [ ] `icon` — `assistiveText: object | string` union (pick the object); `inverse` →
      `isInverse`; `category: string` should be a union.
- [ ] `icon/button-icon` — `hint`/`inverse` → `isHint`/`isInverse` (match `button`); `size`
      union lacks `xx-small` while `button`'s `iconSize` accepts it; drop the index signature.
- [ ] `icon/input-icon` — rendering switches between `Button` and a plain icon on whether
      `onClick` is passed (callback-presence mode switch): make it an explicit prop or split
      the component; `iconPosition` vs `ButtonIcon`'s `position`; drop the index signature.
- [ ] `grid` — `flavor: string` should be a union of the supported flavors;
      `Grid.Column` static-property composition: decide the final API (named exports) now.
- [ ] `icon-settings` — `onRequestIconPath` is a return-value lookup, not a request: rename or
      document the exception before it is frozen.
- [ ] `illustration` — deprecated (XSS via `path`); `internalIllustration = true` defaults a
      boolean to `true` and looks unused; `illustration`/`path`/`name` precedence is
      implicit: either remove in 11.0 or freeze as-is.

- [ ] `input` — `defaultValue` is a data twin of `value` (`index.tsx:116`); the counter variant
      also mutates and reads the DOM value in uncontrolled mode. Remove `defaultValue` and the
      DOM-reading paths. `combobox` passes `defaultValue` through `InnerInput`, so fix both
      together (see the `combobox` control item).
- [ ] `input` — `variant: 'base' | 'counter'` as a discriminated union: `minValue`/`maxValue`/
      `step` and the numeric `onChange` data are counter-only, `type` is silently forced to
      `'number'` for counter, and `inlineEditTrigger` only renders with `isStatic`. Same for
      `label` vs `assistiveText.label` and `fixedTextLeft` vs `fixedTextRight`, which are
      exclusive only in `check-props.js`.
- [ ] `input` — `iconLeft`/`iconRight` are `ReactNode` but `cloneElement` injects
      `iconPosition`: replace with a named icon prop. `styleContainer`/`styleInput` →
      `style` plus `className*` naming (and decide where `className` lands; it targets the
      container today). Drop `onSubmit`/`onKeyPress` (meaningless/deprecated on an input) and
      keep one of `required`/`aria-required`. Decide `tabIndex`/`maxLength`/`minLength`
      types (`string | number` today) and the ref target (`forwardRef` points at the wrapper
      div; `inputRef` is callback-only).
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `input` — remove the sunset API from the contract: `assistiveText.fieldLevelHelpButton`,
      the string form of `search`'s `assistiveText`, and the dead `check-props.js` checks for
      `iconCategory`/`iconName`/`iconPosition`/`iconAssistiveText`/`onIconClick`.
- [ ] `input/search` — `clearable` → `isClearable`; `onClear`/`onSearch` take `(event)` only,
      move to `(event, data)`; make it a `forwardRef`.
- [ ] `media-object` — `verticalCenter` → `isVerticallyCentered`; decide `body` prop vs
      `children` (consistent with the `badge` `content` decision); `canTruncate` already
      follows the `can*` rule.
- [ ] `menu-dropdown` — `isOpen` is half-controlled: the mode is `typeof isOpenProp ===
'boolean'` (`menu-dropdown.tsx:374`), the internal state and `onOpen`/`onClose` still
      run when controlled, and there is no `defaultIsOpen`. Use `isOpen !== undefined`, add
      `defaultIsOpen`, and add `onRequestOpen`/`onRequestClose` so a parent can veto; give
      `onOpen`/`onClose` `(event, data)`.
- [ ] `menu-dropdown` — selection is data and must be controlled: `value` is copied into
      `selectedIndex`/`selectedIndices` state (`:347`, `:412`, `:591`) and multi mode toggles
      locally even when `value` is set. Make `value` the only source (array when multiple) and
      have `onSelect` report the next value.
- [ ] `menu-dropdown` — `onSelect` is `(option, { option, optionIndex })`, not `(event, data)`
      (and the custom-content path fires a fake empty option). Option shape: `type`
      (`header | divider | item`) plus a separate `divider: 'top' | 'bottom'` field, optional
      `value` (`string | number` only), `label: string`, `leftIcon.category: string`. Make
      it a discriminated union before consumers lock in the data.
- [ ] `menu-dropdown` — `multiple` → `isMultiple` (better: a union tying `multiple` to an array
      `value`); `checkmark`, `hint`, `inverse`, `buttonInverse`, `inheritTargetWidth` need
      `is*`/`has*` names; `options` vs `children` exclusive only at runtime; `tabIndex` is a
      `string`; `width` accepts `'bottom'` (looks like a typo); `length` accepts `null`;
      `assistiveText: Record<string, unknown>`; `iconVariant` includes `'small'` but
      `ButtonTrigger`'s does not; `buttonVariant: 'icon'` + `iconName` allows invalid combos.
- [ ] `menu-dropdown` — child contracts: a custom trigger is found by
      `displayName === MENU_DROPDOWN_TRIGGER` (`:1000`), the list by `displayName === LIST`
      (`:883`), and every other child is cloned with an injected `onClick` and
      `key: generateId()` (`:893`, new key each render, so it remounts). `ButtonTrigger` finds
      a `Button` child by `displayName` (`button-trigger.tsx:127`). Replace with a `trigger`
      prop and explicit list props. Also decide the ref story (`FC`, no `forwardRef`;
      `requestFocus` is a positional hack) and whether `ListItem`/`ListItemLabel` stay public
      (`index.tsx` exports them), and drop the deprecated `tooltip`, `offset`, `isInline`.
      **Child-contract rule:** this slot accepts arbitrary consumer elements, so the contract is NOT covered by the library-components exception; the finding stands.
- [ ] `menu-list` — `components/menu-list/*` are 4-line aliases of `utilities/menu-list`, not
      exported from `index.js` (deep import only). Remove them, or promote the real
      component. It is class-based, `cloneElement`s a tooltip template into items
      (`item.tsx:221`), has index-based `onSelect(index)`, `checkmark?: boolean` (a
      tri-state with `null`), and `selectedIndex`/`selectedIndices` (indexes, not values):
      decide before exposing it.
- [ ] `modal` — remove deprecated `title` (use `heading`) and `closeButtonAssistiveText` (use
      `assistiveText.closeButton`); `disableClose` → `isDismissible` (inverted, matching
      `alert`), `directional` → `isDirectional`; `ariaHideApp` defaults to `true`: rename
      to a non-negative `is*` that defaults to `false`, or document it as a `react-modal`
      pass-through exception; `containerClassName`/`contentClassName`/`footerClassName`/
      `headerClassName`/`portalClassName` → `className*`; `onRequestClose: () => void` →
      `(event, data)`; `dismissOnClickOutside` has a derived default (`!disableClose`).
- [ ] Remove the deprecated `modal/trigger` (`ModalTrigger.open`, also `SLDSModalTrigger`) in
      11.0: it creates a root it can never unmount or close and only wraps `Modal`.

- [ ] `page-header` — props are one flat bag, not a union on `variant`: `details` is
      record-home only, `nameSwitcherDropdown`/`trail` object-home only, `label`/`info` only
      some variants; `base` ignores `onRenderActions`, `trail`, `label`, `details`. Make it a
      discriminated union before callers depend on the ignored props.
- [ ] `page-header` — `onRenderActions`/`onRenderControls` must return `PageHeaderControl`
      elements, found by `displayName === PAGE_HEADER_CONTROL` (`private/controls.tsx:69`);
      anything else is silently dropped. Replace with `actions`/`controls` slots (or arrays)
      and drop the `on*` names, which are not callbacks. `icon` is `cloneElement`-injected
      with a class in `base`, `object-home` and `record-home`.
- [ ] `page-header` — `details` items: `truncate` → `isTruncated`, `flavor` is a raw SLDS size
      string, no `id`/`key` (index keys); `joined` → `isJoined`; `truncate` defaults to
      `true` in the exported `Title`/`DetailBlock` (freeze or unexport them); remove the
      unreachable legacy props (`iconCategory`, `iconName`, `contentRight`, `navRight`, …)
      and branches. Hardcoded `h1` title (add a heading-level prop) and `title` of `0` drops.
- [ ] `panel` — `PanelFilterGroup` `variant?: 'panel'` is a one-value variant that changes
      structure (built-in header/footer vs `header`/`footer` slots): make it a union or
      two components; `modified` → `isModified`; flat `addFilterLabel`/`cancelLabel`/
      `saveLabel`/`removeAllLabel`/`errorLabel`/`heading` → `labels`; remove
      `assistiveTextCloseFilterPanel` (deprecated twin of `assistiveText.closeButton`);
      `onClickAdd`/`onClickRemoveAll`/`onRequestCancel|Close|Save` → `(event, data)` with one
      naming scheme; drop the `[key: string]: unknown` signature (`...rest` is destructured
      and never spread); English strings live in `defaultProps`.
- [ ] `panel` — `PanelFilterList` uses `Children.map` and `cloneElement(child, { isError })`,
      wraps each child in `<li>`, and generates an error `<p>` not tied to the child by
      `aria-describedby`: replace with an item component taking `errorLabel`. `list-heading`:
      `heading`/`lockedHeading` → `labels`; hardcoded `locked` assistive text.
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `pill` — `bare` → `isBare`; `onRemove: () => void` is called without an event on keyboard
      and as the click handler elsewhere, and its presence toggles the remove button: move to
      `(event, data)` and an explicit prop; `labels.label` vs `children` and `icon` vs
      `avatar` are exclusive only in practice (union); `variant: 'link' | 'option'` drives the
      role, `href` is link-only and defaults to `'#'`, and the link variant nests an `<a>`
      in a `role="button"` span; `tabIndex: number | string` → `number`; the ref is an
      imperative handle (`PillRef`), not the root element.
- [ ] `pill-container` — `PillOption` has `[key: string]: unknown`, unprefixed `bare`/`error`
      (→ `isBare`/`hasError`) and an optional `id` used as the React key (make it required);
      `avatar`/`icon` are `ReactNode | { config }` detected at runtime (pick one);
      `variant: 'base' | 'bare'` is a boolean in disguise; `onRequestRemove`'s `index` is
      optional and removals are dropped when it is missing; wrap the flat `onClickPill`/`onRequestRemovePill` in an `events` object
      (decided: keep `events` objects, as in `combobox`/`color-picker`), each `(event, data)`;
      align
      `assistiveText.listboxLabel` with the internal `selectedListboxLabel`; the consumer
      `id` is suffixed (`-listbox-of-pill-options`) and never reaches an element.
- [ ] `popover` — `isOpen` mode is correctly keyed off `!== undefined`, but `handleOpen`/
      `handleClose` still write the internal copy when controlled (`popover.tsx:320`, `:343`),
      there is no `defaultIsOpen`, and no `onRequestOpen` (`onOpen` fires from the Dialog
      mount, so a controlled consumer cannot request opening). Decide `onOpen`/`onClose`/
      `onRequestClose` as `(event, data)` together (the event is `undefined` for hover closes).
- [ ] `popover` — trigger contract: the first child is `cloneElement`ed with `id`, `onClick`,
      `onFocus`, `onMouseDown`, `onMouseEnter`, `onMouseLeave`, `tabIndex`, `aria-haspopup`
      (`:740-764`; `tabIndex: child.tabIndex || 0` cannot express `-1`), other children become
      body siblings, and `check-props.js` validates it by `displayName` list. Add a `trigger`
      prop (or render-prop) now, since it changes the meaning of `children`.
      **Child-contract rule:** this slot accepts arbitrary consumer elements, so the contract is NOT covered by the library-components exception; the finding stands.
- [ ] `popover` — naming: `className` lands on the dialog, not the root (root takes
      `triggerClassName`); `className` and `contentsClassName` hit the same node;
      `ariaLabelledby` → `aria-labelledby`/`labels`; `disabled` → `isDisabled` (it only
      forces closed, not a DOM pass-through); `hasNoCloseButton`/`hasNoNubbin`/
      `hasNoTriggerStyles` negatives (decide: a positive form would default to `true`);
      `overlay: boolean | function` (the function receives a shared DOM element); remove
      deprecated `footerClassName`, `closeButtonAssistiveText`, `offset`; `heading` vs
      `ariaLabelledby` as a union; `icon` only for the `feature` variant (union).
- [ ] `popover/edit-dialog` — class component with an index signature cast to `PopoverProps`;
      `handleOpen` → `onClick`/`onRequestOpen`; `isModified` → `hasChanges`; a consumer
      `onClose`/`onOpen` silently replaces EditDialog's own handlers (spread last); stale
      `popover` doc and an unused internal `isOpen`.

- [ ] `progress-indicator` — step status is three parallel `ProgressStep[]` arrays
      (`completedSteps`/`disabledSteps`/`errorSteps`) matched by `id` then by
      `JSON.stringify` of the whole step (`findStep`, `index.tsx:126`); a step can be both
      error and completed (error silently wins). Move to one `status` per step (or one status
      map) before `StepEventData` (`isCompleted`/`isDisabled`/`isError`/`isSelected`) freezes.
      `selectedStep` is a required step object with the same matching and a silent fall back
      to index 0: use an id or index. `steps: invalid` silently falls back to `defaultSteps`.
- [ ] `progress-indicator` — `orientation` and `variant` are independent, but
      `variant="setup-assistant"` forces vertical; make it a union. `onRenderSetupAssistantAction`
      (a `ReactNode`, not a render function) and `setupAssistantEstimatedTime` exist only on the
      private vertical step type, so TypeScript users cannot pass them. Step `assistiveText` is
      a plain string; `tooltipIsOpenSteps` ("for development") and `tooltipPosition` are flat.
      `step.id || index` treats an id of `0` as missing (bug: changes DOM ids when fixed).
- [ ] `progress-bar` — `color: 'success'` and `radius: 'circular'` are one-value unions acting as
      booleans: decide `isCircular` / a wider `variant` before GA. `className` lands on the inner
      `role="progressbar"` div while `id`/`style` go on the root: move `className` to the root
      (rendered-output change) and add `className*` for the bar.
- [ ] `progress-ring` — `theme` mixes status and style (`active | warning | expired |
complete`) and `THEME_OPTIONS` is a second public surface; `icon` is only honored with
      `hasIcon` (implicit coupling: drop `hasIcon` or make a union); hardcoded English icon
      titles ("Warning", "Expired", "Complete") need `assistiveText` keys.
- [ ] `radio` — `defaultChecked` is a data twin of `checked` (`radio/index.tsx:60`); make
      `checked` + `onChange` required and drop it. `onChange` data is `{ checked: !checked }`,
      which reports `true` every time when uncontrolled. Remove the deprecated `label`.
- [ ] `radio` — `variant` (`base | button-group | swatch | visual-picker`) as a discriminated
      union: `coverable`, `vertical`, `size`, `onRenderVisualPicker*` and swatch `style` are
      visual-picker/swatch only; `description` is declared and never rendered; `size` has no
      default so `slds-visual-picker_undefined` is emitted; `button-group`/`swatch` depend on
      a parent group. `deselectable`/`coverable`/`vertical`/`requestFocus` need `is*`/`can*`
      names; `tabIndex: string` is `parseInt`ed (→ `number`); `refs: { input }` and
      `requestFocus`/`onRequestFocus` are a non-native ref/focus API (decide `forwardRef` to the
      input); `onRender*` props are named like callbacks.
- [ ] `radio-group` (seen from `radio`) — `RadioGroup` injects `name`, `onChange`,
      `aria-describedby`, `disabled` with `Children.map` + `cloneElement`
      (`radio-group/index.tsx:98`): the `Radio` props are part of that contract; decide the
      group's data model (a `value` + `options`/context) before freezing `Radio`. Reviewed
      with the next batch.

- [ ] `radio-group` / `radio-button-group` — no group-level selection model: selection lives on
      each child `Radio` (`checked`/`defaultChecked`) and the group `onChange` payload is
      `{ checked }`, so consumers read `event.target.value`. Recommended: required `value` +
      `options: { value, label, disabled? }[]` (or a context that `Radio` reads) +
      `onChange(event, { value })`. `RadioGroup` `cloneElement`s `name`, `onChange`,
      `aria-describedby`, `disabled` into its children (`radio-group/index.tsx:98`),
      overwriting the child's own handlers and breaking for fragments/wrapped children.
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `radio-group` — `labels.error` is a string with a separate `errorId` and no invalid flag
      (add `hasError`, derive the id); `assistiveText.label` replaces `labels.label` in the
      legend; `radio-button-group` duplicates the `variant: 'button-group'` surface (pick one
      public API) and the button-group-only `style` prop needs a union; `className` lands on
      `.slds-form-element__control`, not the root `fieldset`; `displayName` exists only for the
      old clone contract.
- [ ] `scoped-notification` — `icon` is a `ReactElement` that gets `cloneElement`ed to merge
      `assistiveText` (`:71`): render an icon node, or take `iconName`/`iconCategory` and
      build it; the deprecated `iconName` is still live (`:83`), remove or keep; `theme:
'dark' | 'light'` has an implicit third state (no default).
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `setup-assistant` — steps are found by `displayName === SETUP_ASSISTANT_STEP` (other
      children are silently dropped) and `cloneElement`ed with `index`, `onToggleIsOpen`,
      `stepNumber` (`index.tsx:61-73`); `onRenderFigure` is checked by `displayName === ICON`
      and cloned with `size: 'small'` (`step.tsx:210`). Replace with context or a `steps` array;
      remove the injected props from the public `Step` type; `onRenderAction`/`onRenderContent`/
      `onRenderFigure` are nodes, not callbacks (→ `action`/`content`/`figure`).
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `setup-assistant` — step `isOpen` mode is keyed off callback presence: `toggleIsOpen`
      calls `onToggleIsOpen` if provided, else sets state, while `getIsOpen` uses
      `isOpen !== undefined` (`step.tsx:133-148`), so `onToggleIsOpen` without `isOpen` never
      toggles. `isOpen` is ephemeral: choose by `isOpen !== undefined`, add `defaultIsOpen`.
      `data.isOpen` reports the current rather than the requested state, and `data.step`
      (the props object) differs from the parent's `step: ReactElement`.
- [ ] `setup-assistant` — `progressBar` is only shown with `isCard` (union); `progress` (0–100)
      derives the ring theme from its value and ties the ring icon to `stepNumber`: decide a
      `status` and `progressRingProps` before freezing; `id`/`className` sit on the `ol`, which
      is not the root in card mode (`section`) or non-card mode (fragment).
- [ ] `simple-data-table` — columns are children matched by `displayName ===
SimpleDataTableColumn.displayName` (cells and `RowActions` likewise), the row actions are
      `cloneElement`ed, and keyboard nav sizes itself with `React.Children.count`
      (`index.tsx:146-198`, `:600`). Replace with a `columns` array prop, a named `rowActions`
      prop and a cell renderer. This is the largest remaining break in the component.
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `simple-data-table` — selection is data: `selection` and `disabledSelection` are optional
      with `[]` defaults and compared by reference (`item` identity); make `selection` +
      one `onChange(event, { selection })` required and key by `id`. Two callbacks fire
      today (deprecated `onChange(selection, event)` and `onRowChange`); settle the name before
      the deprecated one goes. `selectRows: boolean | 'checkbox' | 'radio'` →
      `selectionMode: 'none' | 'checkbox' | 'radio'`.
- [ ] `simple-data-table` — sort state is split across columns (`isSorted`, `sortDirection`,
      `isDefaultSortDescending`) so two columns can both be sorted, and `header-cell` keeps an
      internal `sortDirection` copy that drifts from the prop. Use a table-level
      `sort={{ property, direction }}` + `onSort(event, data)` (today `onSort(data, event)`).
- [ ] `simple-data-table` — booleans need `is*`/`has*`/`can*` names: `columnBordered`,
      `fixedHeader`, `fixedLayout`, `joined`, `keyboardNavigation`, `noRowHover`, `stacked`,
      `stackedHorizontal`, `striped`, `unborderedRow`, `unbufferedCell` (negations: positive
      names that default to `false`), column `primaryColumn`/`sortable`/`truncate`, cell
      `rowHeader` (library boolean, not a DOM pass-through), `noHint` on row actions.
- [ ] `simple-data-table` — callbacks and types: `onLoadMore()` has no event; the
      `onToggleFixedHeaderListeners` and `onFixedHeaderResize` escape hatches (a fake `{}`
      event) exist because of a `window` resize listener; `onAction(item, selection)` →
      `(event, data)`; `className` lands on `<table>` but `fixedHeader` wraps it in two divs;
      `[key: string]: unknown` on items, columns and `assistiveText`; `type: 'header-row'` is
      magic and collapses to `string`; `options: unknown[]`, `dropdown: ReactNode` on row
      actions; `SimpleDataTableRowActionsProps` and the column props are defined twice
      (`types.ts` vs `column.tsx`/`row-actions.tsx`); remove the deprecated
      `assistiveTextFor*` props; `fixedLayout` still adds the vestigial `slds-table_resizable-cols`
      class and `role="grid"` after resizing was removed.

- [ ] `slider` — `value` + `defaultValue` twin (`index.tsx:34-35,119,169-171`) and
      `displayValue = value ?? defaultValue ?? 0` goes stale when uncontrolled. Require `value` +
      `onChange(event, { value })`, drop `defaultValue`. Also: `vertical` → `isVertical`;
      `classNameContainer` sits on the root (should be `className`); `errorText` → `labels.error` + `hasError`; `label` duplicates `assistiveText.label`; `onInput` duplicates `onChange`.
- [ ] `spinner` — `assistiveText: object | string` (string form deprecated; `check-props` is
      unwired, so no warning fires) → object only; `containerClassName`/`containerStyle` →
      `className*`; `hasContainer = true` defaults a boolean to true (rename to a non-true default, e.g. `hasNoContainer`, or a `variant`); `isInline`/`isInput`
      look mutually exclusive → a single `placement` union.
- [ ] `textarea` — `value` + `defaultValue` passthrough → required `value` + `onChange`;
      `onChange(event)` has no `data` arg; `maxLength: string` parsed to a number → `number`;
      `assistiveText` object|string and `label` duplicate each other; `errorText` → `labels.error` + `hasError`; hand-typed aria props (`aria-autocomplete: string`, `aria-haspopup: boolean`)
      → extend `TextareaHTMLAttributes`; `onSubmit` on a textarea never fires; `children` render
      after the control.
- [ ] `toast` — `onRequestClose: () => void` has no event/data (timer path has no event; `alert`
      declares `(event: MouseEvent) => void`) → `(event | null, { trigger: 'timeout' | 'close-button' })`.
      Auto-dismiss: the timer effect depends on `handleClose`, which depends on `onRequestClose`,
      so an inline callback re-arms the timer on every parent render and may never dismiss;
      cleanup also returns focus. Decide `duration` 0 semantics and rename (`autoCloseDelay`?).
      `icon` is `cloneElement`ed (`index.tsx:144`, same pattern in `alert`) → decide both
      together. `variant` is required in the type but defaulted to `'info'`. `assistiveText.closeButton`
      is `ReactNode` cast to string. `labels.headingLink` + top-level `onClickHeadingLink` split.
      Close button is always rendered: add `isDismissible` to toast and rename `alert`'s
      `dismissible` to match (both before GA). `ToastContainer` is a class with `displayName`,
      a looser `className` type, and no `forwardRef`.
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `tooltip` — `isOpen` mode is keyed correctly (`isOpenProp === undefined`) but there is no
      `defaultIsOpen`, `onRequestOpen`/`onRequestClose` or `events`. `isOpen={false}` is documented
      as "disables interaction", which conflicts with the controlled-false rule (combobox
      `private/menu.tsx:411` relies on it) → add `isDisabled`. Dead/legacy: `openByDefault` (warned,
      not typed), `isInline`, deprecated-but-live `target`, `variant` still accepts `info`/`error`;
      `learnMore` content only renders when `onClickTrigger` is set. The trigger is passed as
      `children` and `cloneElement`ed through `Children.map` (`index.tsx:441`), overwriting the
      child's handlers/`aria-describedby`, forcing `key`, with no ref → `trigger` render prop or
      `asChild`-style slot; `content` defaults to `<span>Tooltip</span>`. `triggerClassName`/
      `triggerStyle`/`dialogClassName` → `className*`; `id` is the popover id; `onRequestTargetElement`
      is a getter; `position` mixes in the portal strategy. Consumers to migrate together:
      combobox menu (cloneElement of a user Tooltip), `FieldLevelHelpTooltip` (reads `.props` from a
      Tooltip element), progress-indicator step, button.
      **Child-contract rule:** this slot accepts arbitrary consumer elements, so the contract is NOT covered by the library-components exception; the finding stands.
- [ ] `tree` — selection and expansion live on mutated node objects: `TreeNode.expanded`/
      `selected`/`loading` (`types.ts:15-23`), `handleSelect` writes `node.selected = false` on the
      consumer's data (`tree.tsx:184-190`), and the tree keeps its own selection/focus copy seeded
      once from `node.selected`. Recommended: required `selectedId` + `onSelect`, `expandedIds`
      (+ optional `defaultExpandedIds`), immutable nodes, and rename node fields `isExpanded`/
      `isSelected`/`isLoading`.
- [ ] `tree` callbacks — `onClick` is really selection and also fires from Enter/arrows/focus
      with `{ node, select, treeIndex }` (`select` derives from the mutated field; `treeIndex` is a
      positional string) → `onSelect(event, { node, isSelected })`. `onExpandClick` also fires for
      keyboard and, with `select: true`, for "focus parent" on Left-arrow → split into
      `onRequestToggle(event, { node, isExpanded })` and focus handling. `onScroll` data
      `{ percentage }` is NaN/Infinity when unscrollable and reads `event.target` → 0-1 ratio from
      `currentTarget`.
- [ ] `tree` shape — `getNodes` makes a second source of truth next to `nodes` (`tree.tsx:70-71`,
      used only below the first level) → drop or apply uniformly; `type: 'branch' | 'item' | string`
      collapses to `string` and `nodes` is allowed on any node → discriminated union
      `{ type: 'branch'; nodes } | { type: 'item' }`; `assistiveText` is typed `{ label }` but also
      accepts a string, `label` is really the heading, `heading`/`assistiveText` are an XOR enforced
      only at runtime → `labels.heading` + `assistiveText.heading` union; hard-coded `<h4>`; `id` is
      required (generate one; derived ids are markup contracts); `className` is on the
      `slds-tree_container` wrapper while `slds-tree` is the inner `ul`; `listClassName`/`listStyle`
      → `className*`; no `forwardRef` (`React.FC` + `displayName`); internal `FlattenedNode` is exported.
- [ ] `trial-bar` — `onRenderActions: () => ReactNode` → `renderActions` or `actions` slot;
      `labels.timeLeft`/`timeLeftUnit`/`timeLeftUnitAfter` are concatenated with the English
      default "left in trial" → one formatter or a single `labels.timeLeft` node;
      `TrialBarDropdownProps extends MenuDropdownProps` yet forces `inverse` after the spread
      (consumer's ignored) → `Omit`; `TrialBarButton` overrides `style`/`className` after the spread
      (drops the consumer's); inherits menu-dropdown's trigger-child pattern.
- [ ] `vertical-navigation` — `selectedId` is optional and defaults to the first item
      (`index.tsx:55,73`) and `onSelect` is optional → require both (allow `null`);
      `NavigationItem` has an index signature (`:20`) with undeclared `icon`/`notificationBadge` →
      declare them; `item.tsx:73,92` `cloneElement`s className into `icon`/`notificationBadge` and
      reads `icon.props.size` → accept a name/props or render-prop; items without `url` render
      `href="#"` → button; `aria-current={true}` (`item.tsx:66`) should be `"page"` (fix now);
      `<nav>` has no `aria-label` → `assistiveText.label`; `className` cast `as string`;
      `displayName`; `lodash.isfunction`.
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.

- [ ] `split-view` — `isOpen` is hybrid (mode by `typeof === 'boolean'`, uncontrolled start
      hard-coded `true`, no `defaultIsOpen`) → `value !== undefined` detection + `defaultIsOpen`.
      `events.onOpen`/`onClose` take only `(event)` → single `onToggle(event, { isOpen })`.
      `assistiveText.toggleButtonOpen` is the text shown while open ("Close split view") and
      `toggleButtonClose` the text shown while closed — inverted names; rename (`closeToggle`/
      `openToggle`) before GA. Closed state unmounts `master` (`index.tsx:124`), losing listbox
      focus/state — decide whether that is the contract. `master`/`detail` typed
      `ReactElement | ReactElement[]` → `ReactNode`.
- [ ] `split-view` listbox — `selection` matches by object identity (`includes(item)`, also
      `unread`) and is optional with an internal `currentSelectedItem` copy feeding range/select-all
      logic → required `selection` of ids (`item.id`) + required `onSelect` (selection drives the detail pane, so it is controlled); `events.onSelect` is
      required in the type while `events` is optional. `multiple` → `isMultiple` (it is the ARIA
      name, so confirm under the native-attr rule). `sortDirection: 'up' | 'down'` →
      `'ascending' | 'descending'`, and the sort button appears only when `events.onSort` exists
      (mode by callback presence) → explicit `isSortable`. `SplitViewListboxItem` has an index
      signature; `listItem` is wrapped once by an HOC created in the constructor (later changes
      ignored) and receives internal props. `SplitViewHeaderProps` has an index signature and loses
      PageHeader types → `Omit<PageHeaderProps, …>`; narrow the wide `className` types.
- [ ] `tabs` — selection is half-controlled: `selectedIndex` + `defaultSelectedIndex`, mode chosen
      by `Number.isInteger` (`index.tsx:115`), internal state written even when controlled, and the
      `index !== internalSelectedIndex` guard compares the stale copy, so controlled `onSelect` can
      fire or be skipped wrongly. Index is identity (ids derive from it; reorder/removal changes
      selection) → `value`/`id` on `TabsPanel`, required `value` + `onSelect`, no `defaultSelectedIndex`
      (selection drives other UI, so it is controlled — maintainer decision).
- [ ] `tabs` callbacks — `onSelect(selectedIndex, lastIndex) => boolean | void` is positional and
      can veto by `return false` → `onSelect(event, { selectedValue, previousValue })`; drop the
      veto or replace with a `onRequestSelect` pre-state callback. Tabs has no `events` object:
      choose top-level `onSelect`.
- [ ] `tabs` children — `Tabs` reads `label`/`disabled`/`hasError`/`assistiveText` off
      `Children.toArray` results (`index.tsx:111,243-246`) so wrapped panels and fragments lose
      props; `private/tab-panel.tsx:76` reaches into `children.props.children`. `TabsPanelProps`
      lacks `disabled` (typed only on the internal `TabChildProps`) — add it now; `label` is
      `string | ReactElement` on the panel but `ReactNode` internally; decide a `tabs` data array or
      context registration. `assistiveText.withErrorIcon` → final key name (`errorIcon`). Delete the
      `tabs/pane.ts` alias ("Remove at next breaking release"; only `TabsPanel` is exported).
      `className` is `string | string[] | Record` cast `as string`; no `forwardRef` (target root
      `div`).
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.

- [ ] `visual-picker` — children contract: `VisualPicker` `cloneElement`s `index`, `coverable`,
      `variant: 'visual-picker'`, `name`, `size`, `vertical` into each `Checkbox`/`Radio` (recursing
      through fragments), so wrapped options silently lose them and a consumer's own `name`/
      `variant` is overwritten. It owns no selection: each option keeps its own `checked`/
      `onChange` (data stays controlled there; the picker must not add any). Recommended: context
      read by `Checkbox`/`Radio` (or an `options` array with `value` + `onChange(event, { value })`).
      Also: `links` boolean switches to a different component (a bare `div` with no
      fieldset/legend/className/id) → drop it and use `VisualPickerLink` inside a distinct
      container or a `type` union; `coverable`/`vertical` → `isCoverable`/`isVertical`; `label` →
      `labels.label` (legend is rendered empty when absent → `assistiveText.label`); `vertical` is
      coerced `!!vertical`; `className` goes on the `fieldset` but cast `as string`; no `forwardRef`.
      The `VisualPickerChildProps` interface is exported but is an injection contract, not an API.
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `visual-picker` link — `VisualPickerLink` is a class with `displayName`; `title`/`description`
      are strings only (→ `ReactNode`); `href` optional renders an anchor with no href; `className`
      type is `unknown[] | Record<string, unknown> | string`; unused `id`/rest pass-through
      (`onClick`, `target`, `rel` are not accepted, so SPA routing is impossible) → extend
      `AnchorHTMLAttributes`; `<h2>` hard-coded (heading level should be configurable).
- [ ] `welcome-mat` — `isOpen = true` defaults a boolean to true and the component is always a
      modal; `onRequestClose: () => void` has no `(event, data)` (modal passes none) → align with
      the modal decision; `onRenderInfoActions` → `renderInfoActions`/slot; `doNotShowAgainCheckbox`
      and `infoBadge` are ReactNode slots with `infoBadge` `cloneElement`ed to inject `isComplete`
      → pass `isComplete` explicitly from the parent; progress is derived by `cloneElement`/
      counting `children` for `isComplete` (wrapped tiles and fragments miscount, and
      `Children.count` counts non-elements) and `variant` is cloned into each tile → context or a
      `steps` data array; `variant: 'splash'` vs `'info-only'` render the same actions branch while
      `slds-welcome-mat_splash` is keyed off "no children" instead of `variant` → define the
      variant matrix as a discriminated union (`steps`/`trailhead-connected` take tiles and
      progress; `info-only`/`splash` take actions); `className` lands on the inner info content,
      not the root; `labels.unitsCompletedAfter` splits a sentence (render `x/y` + label as one
      formatter); `labels.title`/`description` are strings (→ `ReactNode`).
      **Re-scoped by the child-contract rule:** children here are library components, so the `cloneElement`/child-props contract is allowed. Keep the other findings. Still required: type the accepted children (`ReactElement<XProps>` or exported subcomponents), keep injected props out of the public child type, and match by component reference instead of `displayName`.
- [ ] `welcome-mat` tile/info-badge — both are classes with `displayName` and `generateId()`;
      `Tile` `title`/`description` strings, `href` only (no `onClick`/`target`; the info-only
      variant renders a non-link) and `variant` is a duplicate prop injected by the parent
      (consumers can set it, then it is overwritten) → remove from the public type; `Tile` default
      `assistiveText` replaces the merged object shape; `InfoBadge` `image: string` renders an
      `<img alt="">` with fixed 50×50 (→ `imageSrc`/`ReactNode`, alt text), shows the check icon
      even when `isComplete` is false, and `onCompleteRenderActions` → `renderCompleteActions`;
      `className` on `InfoBadge` replaces the root class entirely.

### P2 — Additive hardening (safe after GA)

From the same review; none of these change existing props.

- [ ] `forwardRef` (typed to the real root element), `className`, and `...rest` on
      `accordion`, `alert`, `avatar`, `badge`, `breadcrumb`.
- [ ] `avatar` — reset `imgLoadError` when `imgSrc` changes (track the failed src).
- [ ] Move inline prop types into `types.ts` for the reviewed components.
- [ ] `alert`, `avatar`, `breadcrumb` — `check-props.js` is not imported by these
      components, contrary to the note under _Runtime prop validation_. Wire it up or delete it
      (`alert`'s `onDismiss` check also tests `props.isOpen`).
- [ ] `alert/container` — convert the class component to a function component.
- [ ] `accordion` — `summaryButtonsRef` never removes stale refs.
- [ ] `builder-header/nav-link` — React 19 ignores `defaultProps` on function components;
      move the defaults into the signature. Also renders `<a href="#">` for an action
      (should be a button), and `-toolbar` reads `aria-label` from `child.props.label`, but
      `ButtonGroup`'s label lives at `labels.label`, so it is always `undefined`.
- [ ] `builder-header/toolbar` — `role="toolbar"` has no roving focus.
- [ ] `button`, `button-stateful`, `button-group` — `check-props.js` (button, button-stateful)
      is not imported anywhere; wire it up or delete it.
- [ ] `button-stateful` — drop `lodash.isfunction` for a `typeof` check.
- [ ] `card/private/header` — comment refers to `querySelectorAll(cssClasses.base)`, which
      the docs forbid; `card/empty` ignores its documented `id`.
- [ ] `forwardRef`, `...rest` and `className` on `button-group`, `button-stateful`, `card`,
      `builder-header` (and its sub-components).
- [ ] `checkbox` — `title="required"` on the `<abbr>` needs `assistiveText.required`; widen
      `labels`/`errorText` to `ReactNode`; error markup is missing on `button-group` and
      `visual-picker`; `check-props.js` is not imported (its toggle+indeterminate check should
      become a type error).
- [ ] `carousel` — arrow keys are swallowed inside custom item content; Next/Prev wrap even
      when `isInfinite` is false (guard lives in callers); autoplay's `setInterval` closes over
      a stale `currentPanel` in controlled mode (verify in a browser test); all panels are
      `aria-hidden="false"`; no `aria-roledescription`/label on the root; replace the
      `window` resize listener with `ResizeObserver`; add a `*.browser.test.jsx`.
- [ ] `color-picker` — `Toggle Transparency` and `Saturation ${hue}% Brightness: ${v}%` are
      hardcoded (add `assistiveText` keys); `ColorPickerProps` lives in `color-picker.tsx`,
      not `types.ts`; `check-props.js` is wired but only validates `labels.label` vs
      `assistiveText.label`.
- [ ] `combobox` — click-outside is dead: `comboboxRef` in `index.tsx` is never attached and
      `handleClickOutside` is not exposed, so closing relies on a 200ms blur timeout that is
      never cleared; page-global `currentOpenDropdown` limits the page to one open combobox
      (and `handleOpen` looks inverted); `check-props.js` reads `assistiveText.popoverLabel`
      unguarded and references `isInline`/`readOnlyMenuItemVisibleLength`; split the 1,576-line
      `combobox.tsx`; type `filter.js`/`add-subheadings.js`; `"${n} options selected"` is
      concatenated English.
- [ ] `date-picker` — `check-props.js` warns on props that no longer exist (`abbrWeekDayLabels`,
      `onDateChange`, `strValue`, `isInline`) and its `required` check tests `props.onFocus`;
      `defaultFormatter` is hardcoded `M/D/YYYY`; year picklist `Year` placeholder is
      hardcoded; add `firstDayOfWeek`/`locale`; `selectedDate: new Date()` in
      `calendar-wrapper` is evaluated once at module load; `Dialog`/`Input` are cast to `any`.
- [ ] `files` — `File` and `MoreFiles` are still class components (`defaultProps`,
      `generateId` in the constructor); `File` injects a `<style>` tag per instance with
      non-SLDS `dsr-file__*` classes; `FileActions` hardcodes the `Download` title; no tests.
- [ ] `dynamic-icon` — no tests; English fallbacks (`User is typing`, `Open App Launcher`);
      `forwardRef`/`...rest`.
- [ ] `expandable-section` — fixed `h3` (add a heading-level prop), `aria-hidden` on content
      that stays in the tree.
- [ ] `docked-composer` — `displayName` is a literal, not a `DOCKED_COMPOSER` constant;
      add `className` for the section and `forwardRef`/`...rest`; story gaps already listed
      under P2 (call states, popped-out, footer) can be added as new props.
- [ ] `filter` — props live in `filter.tsx` while `types.ts` holds only helper types;
      `@ts-expect-error` on the `Popover` spread; `forwardRef`/`...rest`.
- [ ] `forms/private/label` — `title="required"` hardcoded (needs `assistiveText.required`).
- [ ] `grid` — `GridColumn.getClassName` yields `"undefined slds-col"` without `className`
      (bug, fix now); class components; add `forwardRef`/`...rest`, a story and tests.
- [ ] `icon-settings` — memoize the context value (rebuilt every render); add tests.
- [ ] `icon`, `icon/button-icon`, `icon/input-icon` — `forwardRef`/`...rest`; `checkProps`
      runs every render in `button-icon`; inline `productTheme` background.
- [ ] `illustration` — `sanitizePath` uses `console.log`; hardcoded 400px inline height;
      `...rest` is accepted but unused; `heading: string`.
- [ ] `input` — `Search` drops every `assistiveText` key but `label`, and a consumer
      `onKeyDown` overwrites its Enter handler (spread last); counter Enter handler checks
      only `keyCode === 13`; the stepping timeout is not cleared on unmount; nothing sets
      `aria-invalid` with `errorText`; no rest props (`data-*`, `autoFocus`, `pattern`,
      `inputMode`, `form`); widen `label` to `ReactNode` and `inputRef` to accept
      `RefObject`; dev warning for `value` without `onChange`.
- [ ] `media-object` — `forwardRef`/`...rest`; `figure &&` renders `0`; missing SLDS variants
      (small/large, reversed figure, responsive).
- [ ] `menu-dropdown` — the shared module-level `overlay` span and `currentOpenDropdown`
      global; `event.keyCode` (`:716`); hover timeouts can leak; `hover` silently becomes
      `click` in `ButtonTrigger`; the `querySelector('button')` fallback in
      `saveRefToTriggerContainer`; `checkProps` runs every render; type `List` (`any`) and the
      `@ts-ignore` imports; widen option `value`; `onRenderItem` alias for `listItemRenderer`.
- [ ] `menu-list` — convert `List`/`ListItem` to function components; `ListItem` has
      `href: '#'` default and an inline `<style>` block in `List`.
- [ ] `modal` — `returnFocusTo` is captured at mount, not when it opens, so a modal mounted
      closed returns focus to the wrong element and focus is not restored when the parent
      closes it; `toast` is dropped when there is no `heading`/`title`/`tagline` or a custom
      `header`; body `overflow` is reset to `inherit` (clobbers prior value, breaks stacked
      modals); `stopPropagation` on content clicks hides events from parent handlers; `role`
      flips to `alertdialog` with `disableClose` (add an explicit `role`); defaults of
      `dialogLabelledBy: ''`; no `forwardRef`/`...rest`.
- [ ] `page-header` — `check-props.js` is never imported (wire it or delete); `related-list`
      passes `label` to both `Label` and `Title` (likely a duplicate render, confirm against the
      snapshot); `forwardRef`/`...rest`; `className*` for internals; extract the triplicated
      icon-resolution block; unused `fieldContentRef`; class components in `private/`.
- [ ] `panel` — `forwardRef`/`...rest`/`className` on `Panel` and `PanelFilterGroup`; memoize the
      merged `assistiveText`; convert `PanelFilterList` to a function component with `className`.
- [ ] `pill` — the remove control is a `<span role="button">` without `tabIndex` or its own
      key handler (keyboard removal depends on the root being focusable); deprecated
      `keyCode`; `onClick` is attached conditionally; inline `cursor: pointer`; `id`/`data-*`/
      rest props.
- [ ] `pill-container` — `forwardRef`; the effect at `:139` uses `resetActiveSelectedOption`
      before it is declared with missing deps; optional controlled active index; Home/End.
- [ ] `popover` — `forwardRef`; clear the `hoverCloseDelay` timer on unmount; hover/hybrid
      modes ignore `disabled` and are mouse-first for keyboard users; `aria-describedby` is
      set with no body and `aria-haspopup` on a disabled popover; module-level
      `currentOpenPopover`/shared `overlay` leak across React roots.
- [ ] `portal-settings` — memoize the context value (`{ renderTo }` is new each render); accept an
      `HTMLElement` as well as a selector string. No breaking issues found.
- [ ] `progress-indicator` — `forwardRef`; vertical mode ignores `onStepFocus`, tooltip props and
      `isDisabled` (still a clickable button), and the always-passed default `onStepClick`
      makes the non-interactive `span` branch dead; disabled horizontal steps are
      `<a role="button" tabIndex={0} aria-disabled>` with no handler; localise the `Step N:`
      string; add `assistiveText.percentage` to the defaults.
- [ ] `progress-bar` — no accessible name without `labels.label` (add an `aria-label`
      fallback); `aria-valuetext` and the assistive-text span are both emitted; hardcoded
      `height: '100%'`; clamp `value` to 0–100; `forwardRef`/`...rest`.
- [ ] `progress-ring` — `role="progressbar"` has no accessible name; `aria-valuenow` can show
      float noise; clamp `value`; `forwardRef`/`...rest`.
- [ ] `radio` — `check-props.js` is never imported (wire or delete); `onKeyPress` is deprecated
      (use `onKeyDown`, Space only); no `onBlur`; forward `name`/`required`/`readOnly`; swatch
      `<label style={{ border: '1px' }}>` is invalid CSS; `assistiveText` goes to `Icon` in the
      visual-picker variant (confirm intent); `forwardRef`; `radio-group/radio.ts` and
      `radio-button-group/radio.ts` are one-line aliases of `radio`.
- [ ] `radio-group` — `aria-describedby` only goes to children; `required` should add
      `aria-required`; `forwardRef` (root is a `fieldset`).
- [ ] `scoped-notification` — allow overriding the hardcoded `role="status"`; `id`/rest props/
      `forwardRef`; the default `'Info'` label is English outside `assistiveText`.
- [ ] `setup-assistant` — `aria-expanded` on the step toggles (only `aria-controls` is set; the
      heading and icon buttons both toggle the same state); step detail is collapsed by CSS
      only; label support for the `ol`; normalize the step `className` type; convert `Step`
      from a class (`defaultProps`, lodash `assign`, `generateId`) to a function component.
- [ ] `simple-data-table` — **bug:** `getAssistiveText` takes `(…, actionsHeader, columnSort,
ascending, descending, selectAllRows, selectRow)` but the call passes `selectAllRows`
      third and `columnSort` sixth (`index.tsx:801`), so the deprecated `assistiveTextFor*`
      props land in the wrong slots (fix now). Also: `keyboardNavigation` and the initial
      `activeCell` are seeded from props in the constructor and go stale; `rowId` falls back to
      `generateId()` on every render without `item.id`; `UNSAFE_componentWillUpdate` resets
      `interactiveElements` (not concurrent-safe); direct `style`/`tabIndex`/`focus()` DOM
      writes; `role="grid"` only with `fixedLayout` while grid-style arrow navigation runs
      whenever `keyboardNavigation` is on; the loading spinner has no `aria-live`; hardcoded
      `Actions` title/`data-label`; convert to a function component with `forwardRef`.
- [ ] `slider` — add `forwardRef`; type the full `aria-*` set (only `aria-describedby` today) and
      stop duplicating the consumer's describedby id on the error div; no `check-props`.
- [ ] `spinner` — drop redundant `aria-hidden="false"`; add `forwardRef`.
- [ ] `textarea` — simplify the describedby/error logic; wire or delete `check-props.js`.
- [ ] `toast` — `check-props.js` is dead and copy-pasted from alert (message says "alert", tests
      `props.isOpen`); `role="status"` + `tabIndex={0}` + focus-on-mount is a questionable pairing;
      pause the timer on hover/focus; close button and heading link are `<a href="#">` → buttons;
      pass through `data-*`/`aria-*`.
- [ ] `tooltip` — Esc is handled only on the trigger with `stopPropagation` and an uncleared
      timeout; `aria-describedby` exists only while open (should be constant); fragile string class
      checks in mouse-leave; hard-coded `#16325c` plus a raw `<style>`; `generateId()` on each
      render → `useId`; `checkProps` runs only on mount; `displayName`.
- [ ] `tree` — items remount every render (`key={generateId()}`, `branch.tsx:123`) which loses focus
      → `childNode.id`; `Item.handleFocus` omits `fromFocus: true` (`item.tsx:159`, unlike
      `render-branch.tsx:188`), risking a double callback; hard-coded 'Expand Tree Branch'
      (`render-branch.tsx:283`) and `icon: ''` → `assistiveText`; `flattenedNodes` is state synced by
      an effect → `useMemo`; `checkProps` cast to `any`; loader uses hard-coded inline styles → SLDS
      skeleton; sibling lookup via `findIndex({id})` assumes unique ids (dev warning); no Home/End/
      typeahead and no Right-arrow on items; extract the duplicated key handling into a hook.
- [ ] `trial-bar` — no landmark/`aria-label`; no `forwardRef`/attribute pass-through; inconsistent
      `classnames` import.
- [ ] `vertical-navigation` — `check-props.js` is dead and warns on a nonexistent `variant`;
      `isDisabled`/`isUnread` item flags; `forwardRef`.
- [ ] `split-view` — `list-item-content.tsx:48` sets `title={item.bottomLeftText}` on the
      `bottomRightText` span (bug, fix now); `aria-sort` is set to a localized string (must be
      `ascending|descending|other`; move the text to the assistive span); shift-range `.sort()`
      is lexicographic (`listbox.tsx:294`, wrong for indices >= 10 — numeric sort); `focusItem`
      assumes `listItemComponents[index]` exists; `selectAll` compares `options === selection` by
      identity; Ctrl+A only (no Cmd+A), no Home/End/typeahead, Space does not activate the
      `role="option"` anchors; focus is initialized only at mount; odd default list `aria-label`;
      confirm `Button` forwards `aria-expanded`/`aria-controls`; convert listbox/HOC to function
      components; inline `height: 100%` with no `style` override.
- [ ] `tabs` — `event.keyCode` is deprecated (`index.tsx:206-209`); no Home/End; vertical still
      binds Left/Right; arrows select and focus together (fires `onSelect` per press); click/key
      handlers sniff DOM classes and `aria-disabled` (`:65-84`) → per-tab handlers; `focus` state
      cleared in a ref callback; all panels mounted with `slds-hide` (optional lazy mount); no
      rest/`data-*` pass-through.
- [ ] `visual-picker` — no `forwardRef`/attribute pass-through on either part; `useId` is fine
      but `Radio`/`Checkbox` receive `index` and `name` as props → verify the names stay unique
      with multiple pickers; add keyboard/roving-focus guidance for the radio case; legend is
      empty (not omitted) when no `label`.
- [ ] `welcome-mat` — Tile uses `<a>` for non-navigating tiles (button when no `href`); completed
      state is announced only by the icon text, not on the link; progress `ProgressBar` has no
      label; `trailhead-connected` hides the progress text on completion without an announcement;
      no `forwardRef`; `WelcomeMatInfoBadge`/`Tile` class → function components; focus and return-focus rely on `Modal` (see `modal` P1 note on focus captured at mount).
- [ ] Tests for `badge` and `breadcrumb` (already listed under the P2 test gaps below).

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
