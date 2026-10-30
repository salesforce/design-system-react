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
- Uncontrolled starting state for ephemeral UI state. A component is controlled when the value prop (`isOpen`, `currentPanel`, `isAutoplayOn`, `expandedIds`) is not `undefined`, and manages its own state otherwise:
  - `defaultIsOpen` on `Popover`, `Tooltip`, `DatePicker`, `ColorPicker`, `Combobox`, `MenuDropdown` and `SetupAssistantStep`
  - `defaultIsOpen` on `ExpandableSection` and `SplitView`, which defaults to `true` so they still start open
  - `Carousel` `defaultCurrentPanel` and `defaultIsAutoplayOn`
  - `Tree` `defaultExpandedIds`
- Request callbacks that fire for every open or close request, controlled or not:
  - `Popover` `onRequestOpen(event, { trigger })`, with `'triggerClick' | 'mouseEnter' | 'focus'`
  - `Tooltip` `onRequestOpen(event, { trigger })` (`'mouseEnter' | 'focus'`) and `onRequestClose(event, { trigger })` (`'mouseLeave' | 'blur' | 'cancel' | 'clickOutside'`)
  - `MenuDropdown` `onRequestOpen` and `onRequestClose`
  - New triggers: `DatePicker` `onRequestClose` `'input-change'` when the user types, and `ColorPicker` `onRequestClose` `'submit'` from Done
- `Tree` `selectedIds` and `expandedIds`, reported as `data.selectedIds` in `onSelect` and `data.expandedIds` in `onRequestToggle`
- `TabsPanel` `value`, and `value` and `previousValue` in `Tabs` `onSelect` data
- `MenuDropdown` `onSelect` data `value`: the requested value, which is the option's value or, with `multiple`, the current array with that value toggled. New types `MenuDropdownValue`, `MenuDropdownRequestOpenData` and `MenuDropdownRequestCloseData`
- `SplitViewListbox` `events.onSelect` data `selection`, the requested list of selected item ids
- `Textarea` `onChange(event, { value })`, with the `TextareaChangeData` type
- `RadioGroupItemProps`, the props type for a `Radio` inside `RadioGroup` or `RadioButtonGroup`, which doesn't need `checked` or `onChange`
- `useControllableState` hook in `utilities/hooks/use-controllable-state`, for state that is controlled when its prop is not `undefined`

### Changed

- **BREAKING**: `Tabs` `onSelect` is called as `onSelect(event, { selectedIndex, previousIndex })` instead of `onSelect(selectedIndex, lastIndex)`. Returning `false` no longer cancels the selection; to stop a tab change, update `value` from `onSelect` only when the change should happen
- **BREAKING**: `MenuDropdown` `onSelect` is called as `onSelect(event, { option, optionIndex })`; the first argument was the option. Change `(option) => …` to `(event, { option }) => …`; handlers that read the second argument need no change. Clicking custom (non-`List`) content no longer calls `onSelect` with an empty option; use `onClose` instead. `SimpleDataTableRowActions` `onAction` is unchanged
- **BREAKING**: `Carousel` `onRequestAutoplayToggle` data `isAutoplayOn` is the requested state, not the current one. Replace `setIsAutoplayOn(!data.isAutoplayOn)` with `setIsAutoplayOn(data.isAutoplayOn)`. Timer-driven `onRequestAutoplayToggle` and `onRequestPanelChange` calls pass `undefined` as the event instead of `{}`, and `onRenderItem` is typed as `({ item }) => ReactElement`, the shape it is called with
- **BREAKING**: `SetupAssistant` `onStepToggleIsOpen` and `SetupAssistantStep` `onToggleIsOpen` data `isOpen` is the requested state. Replace `expanded[data.index] = !data.isOpen` with `expanded[data.index] = data.isOpen`. `data.step` is typed as the step's props, which is what it has always been at runtime
- **BREAKING**: `Popover` `onRequestClose` data always includes a `trigger` from `PopoverRequestCloseTrigger`. A trigger click while open reports `'triggerClick'` and a hover close reports `'mouseLeave'` (both passed `{}` before), and Escape passes the keydown event instead of `undefined`. `onOpen(undefined, { portal })` and `onClose(undefined, { componentWillUnmount })` have exported data types
- **BREAKING**: Data and selection are controlled only. Each component renders its value prop as passed, keeps no internal copy, and reports the requested value through its callback, so update the prop from the callback. A parent that doesn't update it keeps the old value. The removed `default*` props are listed under Removed:
  - `Checkbox`: `checked` is required, and `indeterminate` stays set by the prop after a click
  - `Radio`: `checked` and `onChange` are required
  - `RadioGroup` and `RadioButtonGroup`: `value: string | null` is required and sets each child's `checked`, and `onChange(event, { value, checked })` reports the selected value (`null` on deselect). Pass `value` to the group instead of `checked` to each `Radio`
  - `ButtonStateful`: renders from the required `isActive` (renamed from `active`) and calls `onClick(event, { isActive })` with the requested state instead of toggling itself
  - `Input`: the counter variant no longer changes the input when its buttons are pressed; set `value` from `data.value` in `onChange`
  - `Textarea`: `value` and `onChange` are required, and `onChange` is called as `onChange(event, { value })`
  - `Slider`: `value` is required, and a slider without it no longer displays `0`
  - `Tabs`: `value` and `onSelect` are required. `value` is matched against each `TabsPanel` `value`, or the panel's index as a string (`'0'`, `'1'`, …) when it has none. Without `value` (or the deprecated `selectedIndex`) no tab is selected. `onSelect` no longer fires for the selected tab or for keys other than the arrows
  - `MenuDropdown`: the checkmark and `multiple` selection come only from `value`; update it from `data.value` in `onSelect`. Without `value` nothing is selected (before, the first option without a value matched)
  - `VerticalNavigation`: `selectedId: string | null` and `onSelect` are required, and omitting `selectedId` no longer selects the first item
  - `SimpleDataTable`: `selection` is required when `selectRows` is set, so `SimpleDataTableProps` is a union type alias and can no longer be extended with `interface … extends`. `selection` and `disabledSelection` are matched to `items` by `id` (by identity for items without one) instead of a deep partial match, so fresh item objects from a store match. Columns render `sortDirection` only: a column with `isSorted` and no `sortDirection` no longer flips its own direction, so update `sortDirection` from `onSort`
  - `Tree`: `selectedIds` is required, and `nodes` are never mutated. Apply `data.selectedIds` and `data.expandedIds` instead of relying on `selected` and `expanded` being written to nodes; for example, arrow keys in a multi-select tree no longer clear other nodes' `selected`. The tree has a single tab stop
  - `SplitViewListbox`: `selection` and `events.onSelect` are required, `selection` and `unread` are lists of item ids, and items need an `id`
  - `DatePicker`: `value: Date | null` is required (`undefined` is treated as `null` and warns), and `onChange` `data.date` can be `null`. The typed text re-syncs whenever `value` changes
  - `ColorPicker`: `value` is required, and typing and Done report through `events.onChange` without changing the color. The working color re-syncs from `value`, a controlled `valueWorking` wins over edits, and `errorText` falls back to validating the current `value`
- **BREAKING**: Ephemeral UI state is controlled when its prop is not `undefined`, whether or not a callback is passed. A controlled value is always honored, and callbacks always report the requested state:
  - `ExpandableSection`: `onToggleOpen` `data.isOpen` is the requested state, so replace `setIsOpen(!data.isOpen)` with `setIsOpen(data.isOpen)`. A section without `isOpen` now toggles itself when `onToggleOpen` is passed; before, the callback froze it. This change can't be detected at runtime, so there is no warning
  - `SetupAssistantStep`: a step without `isOpen` toggles itself when `onToggleIsOpen` or `SetupAssistant` `onStepToggleIsOpen` is passed, and its state is no longer seeded from `isOpen`
  - `Carousel`: `onRequestPanelChange` and `onRequestAutoplayToggle` no longer make the carousel controlled. `isAutoplayOn` has no effect without `hasAutoplay`, which also renders the pause button. With `hasAutoplay` and neither `isAutoplayOn` nor `defaultIsAutoplayOn`, autoplay still starts
  - `Tree`: a tree without `expandedIds` expands and collapses on its own
  - `MenuDropdown`: `isOpen` is controlled whenever it is not `undefined` (before, only when it was a boolean). With a controlled `isOpen`, clicks, keys, hover and outside clicks call `onRequestOpen`/`onRequestClose`, so code that set `isOpen` from `onOpen`/`onClose` must use the request callbacks. `onOpen` and `onClose` fire only when the menu actually opens or closes
  - `Combobox`: `events.onRequestOpen` and `events.onRequestClose` fire for every open and close path (Escape, blur, select and Done included), and `events.onOpen` and `events.onClose` only on real transitions. `events.onRequestOpen` is called as `(event, {})`, and only while closed
  - `DatePicker`: passing `onRequestOpen` without `isOpen` no longer stops the calendar from opening itself, and typing requests a close with the `'input-change'` trigger
  - `ColorPicker`: `isOpen` is honored (it only set the initial state before). The swatch button no longer calls `onRequestOpen` when it closes the popover, and Done calls `onRequestClose` with `'submit'`
- `DatePicker`: Down/Up in the closed input go through `onRequestOpen`, and Escape/Enter in the input go through `onRequestClose`, instead of setting internal state directly, so controlled pickers now open from the keyboard
- Content props that are only rendered are typed `ReactNode` instead of `ReactElement`, so strings, fragments, arrays and `null` type-check: `SplitView` `master`/`detail`, `PageHeader` `trail`, `TabsPanel` `label`, `SetupAssistantStep` `figure` (an `Icon` is still resized to `small`), and the return type of the deprecated `Carousel` `onRenderItem`, `SetupAssistantStep` `onRenderFigure` and `MenuDropdown` `listItemRenderer`

### Deprecated

- `Tree` `onClick` (use `onSelect`) and `onExpandClick` (use `onRequestToggle`). They keep their old payloads and behavior, log a one-time warning, and are ignored when the replacement is passed. Neither is required in the types any more
- `Tree` `onScroll` data `percentage` (use `ratio`)
- `SplitView` `events.onOpen` and `events.onClose` (use `events.onToggle`). They are called only when `onToggle` is absent
- `PillContainer` flat `onClickPill` and `onRequestRemovePill` props (use `events.onClickPill` and `events.onRequestRemovePill`)
- Old ways of passing controlled data. They keep working, log a one-time warning, and are ignored when the replacement is passed:
  - `ButtonStateful` `active` (use `isActive`)
  - `Tabs` `selectedIndex` (use `value`)
  - `checked` on each `Radio` inside `RadioGroup` or `RadioButtonGroup` (use the group's `value`)
  - `Tree` node `selected` and `expanded` fields (use `selectedIds` and `expandedIds`), which are read but never written
  - Item objects in `SplitViewListbox` `selection` and `unread` (use item ids), which are still matched by `id`
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
- `SimpleDataTable`: ascending sorted columns have the `slds-is-sorted_asc` class
- `SimpleDataTable`: in development, re-rendering the table with unchanged column children no longer overflows the stack, so a stateful parent can update `selection`
- `SimpleDataTable`: the select-all checkbox counts only selected items that are in `items`
- `Carousel`: autoplay advances through the panels instead of requesting the same next panel on every tick
- `Combobox`: passing only `events.onRequestOpen` no longer leaves the menu unable to open
- `Popover`: a controlled popover no longer writes internal state, which took over if `isOpen` went back to `undefined`
- `SplitViewListbox`: a Shift-click range orders rows numerically and starts at the first selected item when nothing was clicked yet, and Ctrl+A deselects whenever every option is selected
- `Input`: holding a counter button steps from the latest `value`

### Removed

- **BREAKING**: `utilities/design-tokens`, a stale 2018 copy of SLDS 1 token values. The deep imports `@salesforce/design-system-react/utilities/design-tokens/dist/palette-colors.common` and `.../salesforce-skin.common` no longer exist; use SLDS 2 styling hooks (`var(--slds-g-*)`) instead
- **BREAKING**: Uncontrolled props for data. They are removed from the types; at runtime they are ignored, kept off the DOM, and log a development warning that names the replacement:
  - `Checkbox` and `Radio` `defaultChecked` (pass `checked`)
  - `Input`, `Combobox`, `Textarea` and `Slider` `defaultValue` (pass `value`)
  - `Tabs` `defaultSelectedIndex` (pass `value`)
  - `DatePicker` `formattedValue` (pass `value`; the input text is formatted from it with `formatter`)
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
