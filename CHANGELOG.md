# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- TypeScript support with strict mode
- Vitest test framework with React Testing Library
- Storybook 10 with CSF stories
- Dark mode support via `@vueless/storybook-dark-mode`
- `useClickOutside` hook for click-outside detection

### Changed

- **BREAKING**: Requires React 19.x and Node.js >= 20.19.0
- **BREAKING**: Requires `@salesforce-ux/design-system` 2.25.x
- Build system migrated from Webpack to Vite
- Components progressively migrated to TypeScript functional components
- Stories migrated from `storiesOf` API to CSF format
- Removed `react-onclickoutside` dependency (use `useClickOutside` hook)
- **BREAKING**: `DataTable` is renamed to `SimpleDataTable`, with no aliases for the old names. The import path moves from `components/data-table` to `components/simple-data-table`; every subcomponent (`DataTableColumn` → `SimpleDataTableColumn`, `DataTableCell`, `DataTableHighlightCell`, `DataTableRowActions`, `DataTableInteractiveElement`, `DataTableInteractiveLink`), its `SLDS`-prefixed alias, and every exported `DataTable*` type gets the same prefix. The display names change from `SLDSDataTable*` to `SLDSSimpleDataTable*` and the `DATA_TABLE*` constants in `utilities/constants` to `SIMPLE_DATA_TABLE*`, so update any custom cell that copies a display name by hand.

### Removed

- Webpack configuration
- Karma/Mocha/Chai test framework
- Enzyme testing library
- `create-react-class` dependency
- IE11 support and polyfills
- **BREAKING**: DataTable column resizing. The `resizable` and `resizableOptions` props, the `DataTableResizableOptions` and `DataTableColumnWidth` types, `assets/styles/table.css`, and the `column-resizer` dependency are removed. `resizable` also implied `fixedHeader`, `fixedLayout`, and `keyboardNavigation`; set those props explicitly to keep the same layout and behavior.

### Components Converted to TypeScript

- Accordion, Alert, AppLauncher, Avatar
- Badge, Breadcrumb, BrandBand, BuilderHeader, Button, ButtonGroup, ButtonStateful
- Card, Carousel, Checkbox, ColorPicker, Combobox
- DataTable, DatePicker, DockedComposer, DynamicIcon
- ExpandableSection, Expression
- Files, Filter
- GlobalHeader, GlobalNavigationBar
- Icon, IconSettings, Input
- LocationMap
- MediaObject, MenuDropdown, MenuPicklist, Modal
- PageHeader, Panel, Pill, PillContainer, Popover, ProgressBar, ProgressIndicator, ProgressRing
- Radio, RadioButtonGroup, RadioGroup
- ScopedNotification, Search, SetupAssistant, Slider, Spinner, SplitView
- Tabs, Textarea, TimePicker, Toast, Tooltip, Tree, TrialBar
- VerticalNavigation, VisualPicker
- WelcomeMat

---

For historical release notes prior to the React 19 modernization, see `.planning/RELEASENOTES.md`.
