# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). v11 is in alpha and published under the `alpha` npm tag; breaking changes can land in any `11.0.0-alpha.*` release. The stable 0.10.x line is maintained on the [`0.10.x` branch](https://github.com/salesforce/design-system-react/tree/0.10.x).

## [Unreleased]

### Added

- `Button`: `xx-small` icon size ([#3228](https://github.com/salesforce/design-system-react/pull/3228))
- `ButtonStateful`: `success` and `text` variants ([#3234](https://github.com/salesforce/design-system-react/pull/3234))

## [11.0.0-alpha.4] - 2026-10-06

### Changed

- **BREAKING**: `DataTable` is renamed to `SimpleDataTable`, with no aliases for the old names. The import path moves from `components/data-table` to `components/simple-data-table`; every subcomponent (`DataTableColumn` → `SimpleDataTableColumn`, `DataTableCell`, `DataTableHighlightCell`, `DataTableRowActions`, `DataTableInteractiveElement`, `DataTableInteractiveLink`), its `SLDS`-prefixed alias, and every exported `DataTable*` type gets the same prefix. The display names change from `SLDSDataTable*` to `SLDSSimpleDataTable*` and the `DATA_TABLE*` constants in `utilities/constants` to `SIMPLE_DATA_TABLE*`, so update any custom cell that copies a display name by hand. ([#3226](https://github.com/salesforce/design-system-react/pull/3226))

### Removed

- **BREAKING**: DataTable column resizing. The `resizable` and `resizableOptions` props, the `DataTableResizableOptions` and `DataTableColumnWidth` types, `assets/styles/table.css`, and the `column-resizer` dependency are removed. `resizable` also implied `fixedHeader`, `fixedLayout`, and `keyboardNavigation`; set those props explicitly to keep the same layout and behavior. ([#3226](https://github.com/salesforce/design-system-react/pull/3226))

## [11.0.0-alpha.3] - 2026-09-28

### Changed

- Releases publish under the `alpha` npm tag, so a plain `npm install @salesforce/design-system-react` keeps resolving to 0.10.x ([#3220](https://github.com/salesforce/design-system-react/pull/3220))

### Removed

- **BREAKING**: These components and their subcomponents ([#3195](https://github.com/salesforce/design-system-react/pull/3195)):
  - `AppLauncher` (`AppLauncherExpandableSection`, `AppLauncherLink`, `AppLauncherTile`)
  - `BrandBand`
  - `Expression` (`ExpressionCondition`, `ExpressionFormula`, `ExpressionGroup`)
  - `GlobalHeader` (`GlobalHeaderButton`, `GlobalHeaderDropdown`, `GlobalHeaderFavorites`, `GlobalHeaderHelp`, `GlobalHeaderNotifications`, `GlobalHeaderProfile`, `GlobalHeaderSearch`, `GlobalHeaderSetup`, `GlobalHeaderTask`)
  - `GlobalNavigationBar` (`GlobalNavigationBarButton`, `GlobalNavigationBarDropdown`, `GlobalNavigationBarLabel`, `GlobalNavigationBarLink`, `GlobalNavigationBarRegion`)
  - `LocationMap`

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
- Components are rewritten as TypeScript function components, and the `.d.ts` files are generated from the source
- Popups are positioned with `@floating-ui/dom` instead of `popper.js`

### Removed

- **BREAKING**: These components and their subcomponents:
  - `Lookup` (`LookupDefaultFooter`, `LookupDefaultHeader`, `LookupDefaultSectionDivider`)
  - `Notification`
  - `Picklist`
  - `TimePicker` (and its `Timepicker` alias)
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
