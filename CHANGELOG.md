# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). v11 is in alpha and published under the `alpha` npm tag; breaking changes can land in any `11.0.0-alpha.*` release. The stable 0.10.x line is maintained on the [`0.10.x` branch](https://github.com/salesforce/design-system-react/tree/0.10.x).

## [Unreleased]

### Added

- `Button`: `xx-small` icon size ([#3228](https://github.com/salesforce/design-system-react/pull/3228))
- `ButtonStateful`: `success` and `text` variants ([#3234](https://github.com/salesforce/design-system-react/pull/3234))
- `Tree`: `onSelect(event, { node, isSelected })` and `onRequestToggle(event, { node, isExpanded })`, both reporting the requested state. `onRequestToggle` fires only for real expand/collapse requests; Left arrow on an item or collapsed branch selects the parent through `onSelect` and leaves it expanded
- `SplitView`: `events.onToggle(event, { isOpen })`, where `isOpen` is the requested state
- `PillContainer`: `events` prop (`{ onClickPill, onRequestRemovePill }`), with the same `(event, { index, option })` signatures as the flat props
- `Tree`: `onScroll` data includes `ratio` (0–1, `0` when the list cannot scroll)
- Callbacks that took no arguments now receive `(event, data)`, so existing handlers keep working:
  - `Toast` `onRequestClose(event, { trigger })`: `trigger` is `'close-button'`, or `'timeout'` with `event` `undefined`
  - `Modal` and `WelcomeMat` `onRequestClose(event, { trigger })`: `'close-button' | 'escape' | 'click-outside'`
  - `DatePicker` `onRequestOpen(event, { trigger })` (`'input-click' | 'icon-click' | 'keyboard'`), `onRequestClose(event, { trigger })` (`'date-select' | 'escape' | 'enter' | 'click-outside'`; the outside-click event is the native `mousedown`/`touchstart`), and `onClose(undefined, { componentWillUnmount })`
  - `MenuDropdown` `onOpen(event, {})` and `onClose(event, {})`
- Exported data types for these callbacks, such as `TabsSelectData`, `MenuDropdownSelectData`, `ToastRequestCloseData`, `ModalRequestCloseData`, `PopoverRequestCloseTrigger`, `TreeNodeSelectData` and `SplitViewToggleData`

### Changed

- **BREAKING**: `Tabs` `onSelect` is called as `onSelect(event, { selectedIndex, previousIndex })` instead of `onSelect(selectedIndex, lastIndex)`. Returning `false` no longer cancels the selection; to stop a tab change, pass `selectedIndex` and update it from `onSelect` only when the change should happen
- **BREAKING**: `MenuDropdown` `onSelect` is called as `onSelect(event, { option, optionIndex })`; the first argument was the option. Change `(option) => …` to `(event, { option }) => …`; handlers that read the second argument need no change. Clicking custom (non-`List`) content no longer calls `onSelect` with an empty option; use `onClose` instead. `SimpleDataTableRowActions` `onAction` is unchanged
- **BREAKING**: `Carousel` `onRequestAutoplayToggle` data `isAutoplayOn` is the requested state, not the current one. Replace `setIsAutoplayOn(!data.isAutoplayOn)` with `setIsAutoplayOn(data.isAutoplayOn)`. Timer-driven `onRequestAutoplayToggle` and `onRequestPanelChange` calls pass `undefined` as the event instead of `{}`, and `onRenderItem` is typed as `({ item }) => ReactElement`, the shape it is called with
- **BREAKING**: `SetupAssistant` `onStepToggleIsOpen` and `SetupAssistantStep` `onToggleIsOpen` data `isOpen` is the requested state. Replace `expanded[data.index] = !data.isOpen` with `expanded[data.index] = data.isOpen`. `data.step` is typed as the step's props, which is what it has always been at runtime
- **BREAKING**: `Popover` `onRequestClose` data always includes a `trigger` from `PopoverRequestCloseTrigger`. A trigger click while open reports `'triggerClick'` and a hover close reports `'mouseLeave'` (both passed `{}` before), and Escape passes the keydown event instead of `undefined`. `onOpen(undefined, { portal })` and `onClose(undefined, { componentWillUnmount })` have exported data types
- `DatePicker`: Down/Up in the closed input go through `onRequestOpen`, and Escape/Enter in the input go through `onRequestClose`, instead of setting internal state directly. Controlled pickers now open from the keyboard; uncontrolled pickers that pass `onRequestOpen` open from your handler, as they already did for clicks
- Content props that are only rendered are typed `ReactNode` instead of `ReactElement`, so strings, fragments, arrays and `null` type-check: `SplitView` `master`/`detail`, `PageHeader` `trail`, `TabsPanel` `label`, `SetupAssistantStep` `figure` (an `Icon` is still resized to `small`), and the return type of the deprecated `Carousel` `onRenderItem`, `SetupAssistantStep` `onRenderFigure` and `MenuDropdown` `listItemRenderer`

### Deprecated

- `Tree` `onClick` (use `onSelect`) and `onExpandClick` (use `onRequestToggle`). They keep their old payloads and behavior, log a one-time warning, and are ignored when the replacement is passed. Neither is required in the types any more
- `Tree` `onScroll` data `percentage` (use `ratio`)
- `SplitView` `events.onOpen` and `events.onClose` (use `events.onToggle`). They are called only when `onToggle` is absent
- `PillContainer` flat `onClickPill` and `onRequestRemovePill` props (use `events.onClickPill` and `events.onRequestRemovePill`)
- Props renamed to follow the v11 naming rules. The old names keep working, log a one-time warning, and are ignored when the new name is passed:
  - `SplitView` `assistiveText.toggleButtonOpen` and `toggleButtonClose`, which were inverted (use `closeToggle` and `openToggle`)
  - `Tree` `heading` and `assistiveText.label` (use `labels.heading` and `assistiveText.heading`)
  - `TrialBar` `labels.timeLeftUnit` and `labels.timeLeftUnitAfter` (use `labels.timeLeftAfter`)
  - `Slider` and `Textarea` `label` and `errorText` (use `labels.label`, and `labels.error` with `hasError`)
- Zero-argument `onRender*` functions, replaced by `ReactNode` slots: `PageHeader` `onRenderActions`/`onRenderControls` (use `actions`/`controls`), `BuilderHeaderToolbar` and `TrialBar` `onRenderActions` (use `actions`), `WelcomeMat` `onRenderInfoActions` (use `infoActions`), `WelcomeMatInfoBadge` `onCompleteRenderActions` (use `completeActions`), `SetupAssistantStep` `onRenderAction`/`onRenderContent`/`onRenderFigure` (use `action`/`content`/`figure`), `ProgressIndicator` `steps[].onRenderSetupAssistantAction` (use `steps[].setupAssistantAction`), and `Checkbox`/`Radio` `onRenderVisualPicker*` (use `visualPickerFigure*`)
- Render props that take data, replaced by `render<Part>(data) => ReactNode` functions. They are called with one data object rather than mounted as components, so pass a component as `(data) => <MyItem {...data} />`:
  - `Carousel` `onRenderItem` (use `renderItem({ item })`)
  - `Combobox` `onRenderMenuItem` and `menuItem`, which took a component (use `renderMenuItem({ assistiveText, isSelected, option })`; `selected` is now `isSelected`)
  - `SimpleDataTable` `onRenderSubHeadingRow` (use `renderSubHeadingRow`, which gets the same data without `key`; the table sets the row's key)
  - `MenuDropdown` `listItemRenderer`, which took a component (use `renderMenuItem({ icon, isSelected, option, optionIndex })`)
  - `SplitViewListbox` `listItem`, which took a component (use `renderListItem({ isFocused, isSelected, isUnread, item })`)

### Fixed

- The `@salesforce-ux/design-system` peer dependency accepts `^2.25.0-alpha.2` instead of exactly `2.25.0-alpha.2`, so installing into a project that already has a newer version no longer fails with `ERESOLVE`
- `Popover`: apply `classNameFooter` (and deprecated `footerClassName`) when rendering walkthrough footers via `footerWalkthroughActions` / `stepText` ([#2744](https://github.com/salesforce/design-system-react/issues/2744))
- `SimpleDataTable`: with `fixedHeader`, the inline border and (with `joined`) border radius use the SLDS 2 hooks `--slds-g-color-border-1` and `--slds-g-radius-border-2` instead of hardcoded SLDS 1 values, so they follow the theme and dark mode
- `Toast`: an inline `onRequestClose` no longer restarts the `duration` timer on every parent render, so the toast auto-dismisses
- `Popover`: opening another popover closes the one already open (`onRequestClose` with `trigger: 'newPopover'` never fired)
- `MenuDropdown`: `onClose` fires once per close instead of twice, and `onSelect` receives the click event for mouse selection
- `DatePicker`: `onRequestClose` no longer fires when the calendar is already closed
- `Tree`: `onScroll` no longer reports `NaN` or `Infinity` when the list cannot scroll
- `Carousel`: autoplay advances through every panel instead of stalling after the first tick, and the slides follow the panel on previous/next, indicator and arrow key navigation instead of lagging a click behind (or staying put) while the indicators move

### Removed

- **BREAKING**: `utilities/design-tokens`, a stale 2018 copy of SLDS 1 token values. The deep imports `@salesforce/design-system-react/utilities/design-tokens/dist/palette-colors.common` and `.../salesforce-skin.common` no longer exist; use SLDS 2 styling hooks (`var(--slds-g-*)`) instead

### Removed

- **BREAKING**: Surface deprecated in 0.10.x, which already warned in development:
  - `InlineEdit` (`components/forms/input/inline`) and its `SLDSInlineEdit` alias. The `inlineEditTrigger` prop on `Input` stays.
  - `ModalTrigger` and its `SLDSModalTrigger` alias. Render `Modal` with `isOpen`; it already portals to `body`.
  - `Modal` props `title` (use `heading`) and `closeButtonAssistiveText` (use `assistiveText.closeButton`).
  - `Tooltip` prop `target` (use `onRequestTargetElement`) and the `variant` values `info` and `error` (use `theme`).
  - String `assistiveText` on `Avatar`, `Breadcrumb`, `Button`, `ButtonStateful`, `Checkbox`, `Search`, `Spinner`, `Textarea`, and `Tree`. Pass an object, such as `assistiveText={{ label: 'Loading' }}`; see each component's `assistiveText` type for its keys.
  - The `components/forms/checkbox` and `components/tabs/pane` aliases, which v11 never shipped as JavaScript, and the `Checkbox` prop `oldEventParameterOrder`, which v11 ignored. Import `components/checkbox` and `components/tabs/panel`.
  - The `FORMS_INLINE_EDIT` constant in `utilities/constants`.

## [11.0.0-alpha.4] - 2026-10-06

### Changed

- **BREAKING**: `DataTable` is renamed to `SimpleDataTable`, with no aliases for the old names. The import path moves from `components/data-table` to `components/simple-data-table`; every subcomponent (`DataTableColumn` → `SimpleDataTableColumn`, `DataTableCell`, `DataTableHighlightCell`, `DataTableRowActions`, `DataTableInteractiveElement`, `DataTableInteractiveLink`), its `SLDS`-prefixed alias, and every exported `DataTable*` type gets the same prefix. The display names change from `SLDSDataTable*` to `SLDSSimpleDataTable*` and the `DATA_TABLE*` constants in `utilities/constants` to `SIMPLE_DATA_TABLE*`, so update any custom cell that copies a display name by hand. ([#3226](https://github.com/salesforce/design-system-react/pull/3226))

### Removed

- **BREAKING**: DataTable column resizing. The `resizable` and `resizableOptions` props, the `DataTableResizableOptions` and `DataTableColumnWidth` types, `assets/styles/table.css`, and the `column-resizer` dependency are removed. `resizable` also implied `fixedHeader`, `fixedLayout`, and `keyboardNavigation`; set those props explicitly to keep the same layout and behavior. ([#3226](https://github.com/salesforce/design-system-react/pull/3226))

## [11.0.0-alpha.3] - 2026-09-28

### Changed

- `alpha` is now the package's default publish tag (`publishConfig.tag`), so a plain `npm install @salesforce/design-system-react` keeps resolving to 0.10.x. Earlier alphas set the tag only in the publish workflow. ([#3220](https://github.com/salesforce/design-system-react/pull/3220))

### Removed

- **BREAKING**: These components and their subcomponents ([#3195](https://github.com/salesforce/design-system-react/pull/3195)):
  - `AppLauncher` (`AppLauncherExpandableSection`, `AppLauncherLink`, `AppLauncherTile`)
  - `BrandBand`
  - `Expression` (`ExpressionCondition`, `ExpressionFormula`, `ExpressionGroup`)
  - `GlobalHeader` (`GlobalHeaderButton`, `GlobalHeaderDropdown`, `GlobalHeaderFavorites`, `GlobalHeaderHelp`, `GlobalHeaderNotifications`, `GlobalHeaderProfile`, `GlobalHeaderSearch`, `GlobalHeaderSetup`, `GlobalHeaderTask`)
  - `GlobalNavigationBar` (`GlobalNavigationBarButton`, `GlobalNavigationBarDropdown`, `GlobalNavigationBarLabel`, `GlobalNavigationBarLink`, `GlobalNavigationBarRegion`)
  - `LocationMap`
  - The `SLDS`-prefixed alias of each component above (`SLDSAppLauncher`, `SLDSBrandBand`, and so on)

### Fixed

- `DatePicker`: the calendar closes on an outside click when the component is uncontrolled ([#3199](https://github.com/salesforce/design-system-react/pull/3199))
- Dialog-based popups compute their floating position once per open instead of on every render ([#3210](https://github.com/salesforce/design-system-react/pull/3210))
- `Combobox`: restored focus on selected pills and multi-selection semantics ([#3213](https://github.com/salesforce/design-system-react/pull/3213))

## [11.0.0-alpha.2] - 2026-09-16

First v11 release on npm: a rewrite for React 19, TypeScript, and SLDS 2.

### Added

- Dependency on [`@salesforce-ux/design-system-2`](https://www.npmjs.com/package/@salesforce-ux/design-system-2), the SLDS 2 stylesheet package
- Light, dark, and system color schemes through the SLDS 2 `slds-color-scheme--*` body classes
- `useClickOutside` hook in `utilities/hooks/use-click-outside`

### Changed

- **BREAKING**: Requires React and React DOM ^19.2.0 (previously >= 16.8)
- **BREAKING**: Requires Node.js >= 24
- **BREAKING**: The package ships ES modules and CommonJS from `dist/`, with a package `exports` map, instead of the `lib/` and `module/` folders. Imports outside the `exports` map no longer resolve. The `@salesforce/babel-preset-design-system-react` preset is no longer needed.
- Components are migrated to TypeScript, many of them rewritten as function components, and the `.d.ts` files are generated from the source
- Popups are positioned with `@floating-ui/dom` instead of `popper.js`

### Removed

- **BREAKING**: These components and their subcomponents:
  - `Lookup` (`LookupDefaultFooter`, `LookupDefaultHeader`, `LookupDefaultSectionDivider`)
  - `Notification`
  - `Picklist` (and its `SLDSMenuPicklist` alias)
  - `TimePicker` (and its `Timepicker` alias)
  - The `SLDS`-prefixed alias of each component above (`SLDSLookup`, `SLDSNotification`, and so on)
- The `create-react-class`, `lodash.isequal`, `popper.js`, `react-onclickoutside`, `react-required-if`, and `react-text-truncate` dependencies
- IE11 support and polyfills

## [11.0.0-alpha.1] - 2026-09-16

Tagged on GitHub but never published to npm; the publish job failed. 11.0.0-alpha.2 has the same content.

## 0.10.65 and earlier

Release notes for the 0.10.x line are in [RELEASENOTES.md on the `0.10.x` branch](https://github.com/salesforce/design-system-react/blob/0.10.x/RELEASENOTES.md) and on [GitHub Releases](https://github.com/salesforce/design-system-react/releases).

[Unreleased]: https://github.com/salesforce/design-system-react/compare/11.0.0-alpha.4...HEAD
[11.0.0-alpha.4]: https://github.com/salesforce/design-system-react/compare/v11.0.0-alpha.3...11.0.0-alpha.4
[11.0.0-alpha.3]: https://github.com/salesforce/design-system-react/compare/v11.0.0-alpha.2...v11.0.0-alpha.3
[11.0.0-alpha.2]: https://github.com/salesforce/design-system-react/releases/tag/v11.0.0-alpha.2
[11.0.0-alpha.1]: https://github.com/salesforce/design-system-react/releases/tag/v11.0.0-alpha.1
