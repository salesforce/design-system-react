# Migrating from 0.10.x to v11

v11 is a rewrite of Design System React for React 19, TypeScript and SLDS 2. This guide maps each 0.10.x pattern to its v11 replacement. Use it to update an app, or to fix 0.10.x code that an editor or coding agent wrote from memory.

The TypeScript types are the contract. Most 0.10.x code that no longer works is now a type error, and this guide tells you what to write instead. A few changes are runtime-only and are called out as such. For the complete list, including bug fixes, see [CHANGELOG.md](../CHANGELOG.md).

Every v11 snippet below compiles, and every 0.10.x snippet marked "rejected" fails to compile. Both are checked by [`docs/__tests__/migration-v11.type-test.tsx`](__tests__/migration-v11.type-test.tsx) on every `npm run typecheck`.

- [Platform](#platform)
- [Cross-cutting patterns](#cross-cutting-patterns)
- [Per-component changes](#per-component-changes)

## Platform

### Install

```bash
npm install @salesforce/design-system-react@alpha
```

v11 is published under the `alpha` tag until GA. A plain `npm install` still installs 0.10.x.

|                     | 0.10.x                                  | v11                                                                                                  |
| ------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| React and React DOM | `>= 16.8`                               | `^19.2.0`                                                                                            |
| Node.js             | any                                     | `>= 24`                                                                                              |
| SLDS stylesheet     | `@salesforce-ux/design-system` (SLDS 1) | `@salesforce-ux/design-system-2` (SLDS 2), a regular dependency. See [Styling](../README.md#styling) |
| Icons               | `@salesforce-ux/design-system` sprites  | Unchanged: the `@salesforce-ux/design-system` peer dependency, now `^2.25.0-alpha.2`                 |
| Positioning         | `popper.js`                             | `@floating-ui/dom` (internal; no API change)                                                         |
| Browsers            | IE11 with polyfills                     | Evergreen browsers; no polyfills                                                                     |

### Module format and imports

0.10.x shipped untranspiled source at the package root plus `lib/` and `module/` builds, and needed `@salesforce/babel-preset-design-system-react` for the source imports. v11 ships ES modules, CommonJS and `.d.ts` files from `dist/` behind a package `exports` map. Drop the Babel preset.

```tsx
// Both work in v11, from ESM or CommonJS
import { Button, IconSettings } from '@salesforce/design-system-react';
import Button from '@salesforce/design-system-react/components/button';
```

The `exports` map allows the package root, `components/<path>` and `utilities/<path>`. Anything else no longer resolves, including `lib/…`, `module/…` and file paths with an extension. Your bundler must understand `exports` (Vite, webpack 5, Rollup, esbuild).

These deep paths were removed. Import the canonical path instead:

| 0.10.x path                                                  | v11 path                                              |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| `components/bread-crumb`                                     | `components/breadcrumb`                               |
| `components/navigation`                                      | `components/vertical-navigation`                      |
| `components/popover-tooltip`                                 | `components/tooltip`                                  |
| `components/forms/checkbox`                                  | `components/checkbox`                                 |
| `components/forms/radio`                                     | `components/radio`                                    |
| `components/forms/textarea`                                  | `components/textarea`                                 |
| `components/forms/input`                                     | `components/input`                                    |
| `components/forms/input/search`                              | `components/input/search`                             |
| `components/tabs/pane`                                       | `components/tabs/panel`                               |
| `components/data-table/…`                                    | `components/simple-data-table/…`                      |
| `utilities/design-tokens/…`                                  | Removed. Use SLDS 2 styling hooks (`var(--slds-g-*)`) |
| `FORMS_INLINE_EDIT`, `ILLUSTRATION` in `utilities/constants` | Removed with their components                         |

The `SLDS`-prefixed aliases (`SLDSButton`, …) are still exported for every component that remains.

### `DataTable` is `SimpleDataTable`

Every `DataTable` export is renamed, with no alias for the old names:

| 0.10.x                                                                                                                                         | v11                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `DataTable`                                                                                                                                    | `SimpleDataTable`                                               |
| `DataTableColumn`, `DataTableCell`, `DataTableHighlightCell`, `DataTableRowActions`, `DataTableInteractiveElement`, `DataTableInteractiveLink` | `SimpleDataTableColumn`, `SimpleDataTableCell`, … (same suffix) |
| `DataTable*` types                                                                                                                             | `SimpleDataTable*` types                                        |
| `components/data-table`                                                                                                                        | `components/simple-data-table`                                  |
| `DATA_TABLE*` constants, `SLDSDataTable*` display names                                                                                        | `SIMPLE_DATA_TABLE*`, `SLDSSimpleDataTable*`                    |

Column resizing is gone: `resizable`, `resizableOptions` and the `column-resizer` dependency were removed. `resizable` also turned on `fixedHeader`, `fixedLayout` and `keyboardNavigation`, so set those explicitly to keep the layout. The deprecated `onChange(selection, event)` was removed; selection is controlled and reported through `onRowChange(event, data)`:

```tsx
// 0.10.x (rejected)
<DataTable items={items} selectRows="checkbox" selection={selection}
	onChange={(selection) => setSelection(selection)}>
	<DataTableColumn label="Name" property="name" />
</DataTable>

// v11
<SimpleDataTable
	items={items}
	selectRows="checkbox"
	selection={selection}
	onRowChange={(event, data) => setSelection(data.selection)}
>
	<SimpleDataTableColumn label="Name" property="name" />
</SimpleDataTable>
```

Items need a string `id`: selection is matched by `id`, not by deep comparison.

### Removed components

These components and their subcomponents and `SLDS` aliases are gone. Build the replacement from the listed component or from the SLDS blueprint.

| 0.10.x                                                                                 | Use instead                                                                                                                                                     |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AppLauncher` (`AppLauncherExpandableSection`, `AppLauncherLink`, `AppLauncherTile`)   | No replacement; not an SLDS 2 pattern                                                                                                                           |
| `BrandBand`                                                                            | No replacement; not an SLDS 2 pattern                                                                                                                           |
| `Expression` (`ExpressionCondition`, `ExpressionFormula`, `ExpressionGroup`)           | No replacement; not an SLDS 2 pattern                                                                                                                           |
| `GlobalHeader` and its 9 subcomponents                                                 | No replacement; not an SLDS 2 pattern                                                                                                                           |
| `GlobalNavigationBar` and its 5 subcomponents                                          | No replacement; not an SLDS 2 pattern                                                                                                                           |
| `Illustration`                                                                         | Copy the markup from the [SLDS Illustration blueprint](https://www.lightningdesignsystem.com/components/illustration/). The `ILLUSTRATION` constant is gone too |
| `InlineEdit` (`components/forms/input/inline`)                                         | `Input` with `inlineEditTrigger`                                                                                                                                |
| `LocationMap`                                                                          | No replacement; not an SLDS 2 pattern                                                                                                                           |
| `Lookup` (`LookupDefaultFooter`, `LookupDefaultHeader`, `LookupDefaultSectionDivider`) | `Combobox` with `variant="inline-listbox"`                                                                                                                      |
| `ModalTrigger`                                                                         | `Modal` with `isOpen`; it already portals to `body`                                                                                                             |
| `Notification`                                                                         | `Alert` or `Toast`                                                                                                                                              |
| `Picklist` (`SLDSMenuPicklist`)                                                        | `Combobox` with `variant="readonly"`                                                                                                                            |
| `TimePicker` (`Timepicker`)                                                            | `Combobox` with time options                                                                                                                                    |

## Cross-cutting patterns

These rules apply across the library. Each is shown once; the [per-component table](#per-component-changes) lists where it changed a prop.

### Callbacks are `(event, data)`

Every callback takes the triggering event first and a data object second. Callbacks that took positional values or no arguments now take `(event, data)`. Where the event comes from a timer, it is `undefined`.

```tsx
// 0.10.x (rejected)
<Tabs onSelect={(selectedIndex, lastIndex) => setIndex(selectedIndex)}>…</Tabs>
<MenuDropdown options={options} onSelect={(option) => run(option.value)} />

// v11
<Tabs value={value} onSelect={(event, data) => setValue(data.value)}>
	<TabsPanel label="Details" value="details">Details</TabsPanel>
	<TabsPanel label="Related" value="related">Related</TabsPanel>
</Tabs>
<MenuDropdown label="Actions" options={options} onSelect={(event, { option }) => option.label} />
```

Two more rules:

- **Toggle callbacks report the requested state.** `data.isOpen`, `data.isAutoplayOn` and `data.isExpanded` are the state the user asked for, not the current one. Replace `setIsOpen(!data.isOpen)` with `setIsOpen(data.isOpen)` (`ExpandableSection`, `SetupAssistantStep`, `Carousel`, `Tree`, `SplitView`). This is a runtime change: the old code still compiles but toggles the wrong way.
- **Returning `false` no longer cancels.** To refuse a change, don't update the controlled prop.

Callback data types are exported, for example `TabsSelectData`, `MenuDropdownSelectData`, `ModalRequestCloseData`, `ToastRequestCloseData` and `TreeNodeSelectData`.

### `className`, `style` and `ref` land on the root

`className`, `style` and `ref` apply to the outermost element a component renders. Inner elements take a suffixed prop, `className<Part>` and `style<Part>`. Where `className` used to land on an inner element, it moved:

```tsx
// 0.10.x: className styled the .slds-popover dialog
<Popover body="Body" className="my-dialog">…</Popover>

// v11: className is on the trigger wrapper; the dialog has its own props
<Popover
	body="Body"
	className="my-trigger-wrapper"
	classNameDialog="my-dialog"
	styleDialog={{ width: '20rem' }}
>
	<Button label="Open" />
</Popover>
```

`Slider`, `Spinner`, `Tree`, `Modal`, `WelcomeMat` and `VerticalNavigation` follow the same rule, and `WelcomeMat` moved its `className` from the info content to `.slds-welcome-mat`. This is a runtime change: the old code compiles but styles a different element.

Focus through a ref instead of the imperative focus props. `requestFocus` and `onRequestFocus` on `Button`, `Checkbox` and `Radio` still work in 11.x and warn once.

```tsx
const ref = useRef<HTMLButtonElement>(null);
<Button ref={ref} label="Save" onClick={() => ref.current?.focus()} />;
```

### Text is in `labels` and `assistiveText` objects

Visible text goes in `labels`, and screen-reader-only text goes in `assistiveText`. Both are objects; a string `assistiveText` is rejected. Flat text props that duplicated a key were removed.

```tsx
// 0.10.x (rejected)
<Spinner assistiveText="Loading" />
<Radio checked onChange={onChange} label="Email" />
<Modal isOpen title="Delete record">Are you sure?</Modal>

// v11
<Spinner assistiveText={{ label: 'Loading' }} />
<Radio checked onChange={() => {}} labels={{ label: 'Email' }} />
<Modal isOpen heading="Delete record" assistiveText={{ closeButton: 'Close' }}>
	Are you sure?
</Modal>
```

The flat `assistiveText*` props on `DatePicker`, `PanelFilterGroup`, `Popover`, `Modal` and `SimpleDataTable` are removed; use the matching key in `assistiveText`.

### The control model

**Data is controlled.** A value the user edits or selects (`checked`, `value`, `selection`, `selectedIds`, `selectedId`, `isActive`) is a required prop. The component renders it as passed and reports the requested value through its callback, so update the prop from the callback. Every `default*` prop for data was removed, and the callback is required unless the control is `disabled` (or `readOnly` for `Checkbox`).

```tsx
// 0.10.x (rejected)
<Checkbox defaultChecked />
<Input defaultValue="Acme" />

// v11
const [checked, setChecked] = useState(false);
<Checkbox
	checked={checked}
	labels={{ label: 'Subscribe' }}
	onChange={(event, data) => setChecked(data.checked)}
/>
```

Groups own their value. Pass `value` to `RadioGroup` or `RadioButtonGroup`, not `checked` to each `Radio`, and import the group's `Radio` from `components/radio-group/radio`, which is typed without `checked` and `onChange`:

```tsx
import RadioGroup from '@salesforce/design-system-react/components/radio-group';
import Radio from '@salesforce/design-system-react/components/radio-group/radio';

<RadioGroup
	labels={{ label: 'Contact by' }}
	value={value}
	onChange={(event, data) => setValue(data.value)}
>
	<Radio labels={{ label: 'Email' }} value="email" />
	<Radio labels={{ label: 'Phone' }} value="phone" />
</RadioGroup>;
```

`Tree` never writes `selected` or `expanded` onto your `nodes`. Pass `selectedIds` (and optionally `expandedIds`) and apply `data.selectedIds` and `data.expandedIds`:

```tsx
<Tree
	id="tree"
	labels={{ heading: 'Files' }}
	nodes={nodes}
	selectedIds={selectedIds}
	onSelect={(event, data) => setSelectedIds(data.selectedIds)}
/>
```

**Ephemeral UI state may be uncontrolled.** Open state, the current carousel panel and tree expansion are controlled when the prop is not `undefined`, and the component manages them otherwise. Use `defaultIsOpen` (or `defaultCurrentPanel`, `defaultIsAutoplayOn`, `defaultExpandedIds`) for the starting state:

```tsx
// Uncontrolled: starts closed, toggles itself
<ExpandableSection title="Details" defaultIsOpen={false}>Body</ExpandableSection>

// Controlled: the parent applies the requested state
<ExpandableSection
	title="Details"
	isOpen={isOpen}
	onToggleOpen={(event, data) => setIsOpen(data.isOpen)}
>
	Body
</ExpandableSection>
```

A controlled `isOpen={false}` keeps a popup closed; it no longer means "disabled". Use `Tooltip` `isDisabled` to turn a tooltip off:

```tsx
<Tooltip content="Help" isDisabled trigger={<Button label="Save" />} />
```

Open-state components fire `onRequestOpen` and `onRequestClose` for every request, controlled or not, with a `data.trigger` naming the cause. `onOpen` and `onClose` fire only when the popup actually opens or closes. A parent that set `isOpen` from `onOpen`/`onClose` must switch to the request callbacks.

### Slots instead of render functions

Zero-argument `onRender*` functions became `ReactNode` slots, and render props that take data became `render<Part>(data)` functions:

```tsx
// 0.10.x
<PageHeader variant="object-home" title="Accounts" onRenderActions={() => <Button label="New" />} />

// v11
<PageHeader
	variant="object-home"
	title="Accounts"
	actions={<PageHeaderControl><Button label="New" /></PageHeaderControl>}
/>
```

The `onRender*` props are deprecated and still work in 11.x.

Triggers are a `trigger` prop on `Tooltip` and `MenuDropdown`, and the component merges its props into your element:

```tsx
// 0.10.x (rejected)
<Button label="Save" tooltip="Saves" />

// v11
<Tooltip content="Saves the record" trigger={<Button label="Save" />} />
```

### Unions reject ignored props

Props are discriminated unions on `variant`, `type` and similar switches. A prop the chosen variant ignores is a compile error rather than a silent no-op. The fix is to remove the prop, or to set the variant it belongs to:

```tsx
// 0.10.x (rejected): iconVariant needs variant="icon"
<Button iconName="settings" iconVariant="border" label="Settings" />

// v11
<Button
	variant="icon"
	iconCategory="utility"
	iconName="settings"
	iconVariant="border"
	assistiveText={{ icon: 'Settings' }}
/>
```

Related type changes:

- **No index signatures.** Item and option objects (`PillContainer` options, `SimpleDataTable` items and columns, `VerticalNavigation` items, `SplitViewListbox` items) reject unknown keys.
- **Numbers are numbers.** `tabIndex`, `maxLength` and `minLength` take numbers, not strings.
- **Props types are type aliases.** Union props types can't be extended with `interface … extends`. Use an intersection: `type MyProps = ButtonProps & { … }`.
- **Native attributes pass through.** `Button`, `Textarea` and others extend the matching React DOM attribute types, so `name`, `value`, `role` and `aria-*` take their React types.
- **Children are typed.** Slots that take library components are typed with those components' props (`Tabs` children are `TabsPanel` elements, `Alert` `icon` is an `Icon` element). Parents match children by component, not by `displayName`, so a wrapper that copies a `displayName` is no longer recognized.

## Per-component changes

Status:

- **Breaking**: 0.10.x code is a type error in v11. The fix is in the v11 column.
- **Breaking (runtime)**: 0.10.x code still compiles but behaves differently. Check these by hand.
- **Deprecated**: the 0.10.x or early-v11 name still works in 11.x and logs a one-time development warning. Move to the v11 name; the old one will be removed in the next major version.

Removed props are ignored at runtime, kept off the DOM, and log a development warning that names the replacement.

| Component                                                                                                       | 0.10.x                                                                                                                       | v11                                                                                                                                                                  | Status                                                        |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `Alert`                                                                                                         | `variant` required                                                                                                           | `variant` optional, defaults to `info`                                                                                                                               | Non-breaking                                                  |
| `Alert`, `Toast`                                                                                                | `icon` any node                                                                                                              | `icon` is an `Icon` element                                                                                                                                          | Breaking                                                      |
| `Avatar`, `Breadcrumb`, `Button`, `ButtonStateful`, `Checkbox`, `Icon`, `Search`, `Spinner`, `Textarea`, `Tree` | String `assistiveText`                                                                                                       | `assistiveText={{ label: '…' }}` (see each type for its keys)                                                                                                        | Breaking                                                      |
| `Badge`                                                                                                         | `style` on the icon container                                                                                                | `style` on the badge; `styleIcon` for the icon container                                                                                                             | Breaking (runtime)                                            |
| `BuilderHeaderToolbar`                                                                                          | `onRenderActions`                                                                                                            | `actions`                                                                                                                                                            | Deprecated                                                    |
| `Button`                                                                                                        | `tooltip`                                                                                                                    | Wrap it: `<Tooltip content={…} trigger={<Button … />} />`                                                                                                            | Breaking                                                      |
| `Button`                                                                                                        | `requestFocus`, `onRequestFocus`                                                                                             | `ref` (or `buttonRef`), then `ref.current.focus()`                                                                                                                   | Deprecated                                                    |
| `Button`                                                                                                        | `iconVariant` with any `variant`                                                                                             | `iconVariant` only with `variant="icon"`; `tabIndex` is a number                                                                                                     | Breaking                                                      |
| `ButtonStateful`                                                                                                | `active`, internal toggle                                                                                                    | `isActive` (required) and `onClick(event, { isActive })`; the parent toggles it                                                                                      | Breaking (`active` deprecated)                                |
| `Card`                                                                                                          | `empty={true}` for the default empty state                                                                                   | `isEmpty`; `empty` takes custom content only                                                                                                                         | Deprecated                                                    |
| `Carousel`                                                                                                      | `onRequestAutoplayToggle` data `isAutoplayOn` was the current state                                                          | The requested state: `setIsAutoplayOn(data.isAutoplayOn)`                                                                                                            | Breaking (runtime)                                            |
| `Carousel`                                                                                                      | `onRequestPanelChange`/`onRequestAutoplayToggle` made it controlled                                                          | Controlled only by `currentPanel`/`isAutoplayOn`; `defaultCurrentPanel`, `defaultIsAutoplayOn`                                                                       | Breaking (runtime)                                            |
| `Carousel`                                                                                                      | `onRenderItem`                                                                                                               | `renderItem({ item })`                                                                                                                                               | Deprecated                                                    |
| `Checkbox`                                                                                                      | `defaultChecked`, uncontrolled                                                                                               | `checked` and `onChange` required (unless `disabled` or `readOnly`)                                                                                                  | Breaking                                                      |
| `Checkbox`                                                                                                      | `requestFocus`, `onRequestFocus`                                                                                             | `ref` (forwarded to the `<input>`)                                                                                                                                   | Deprecated                                                    |
| `Checkbox`                                                                                                      | `oldEventParameterOrder`                                                                                                     | Removed; `onChange(event, data)`                                                                                                                                     | Breaking                                                      |
| `Checkbox`                                                                                                      | Enter toggled the box                                                                                                        | Only Space toggles; `readOnly` blocks `onChange`                                                                                                                     | Breaking (runtime)                                            |
| `Checkbox`                                                                                                      | Any prop with any `variant`                                                                                                  | `indeterminate` rejected with `toggle`; `className`, `errorText`, `required`, `tabIndex` rejected with `button-group` and `visual-picker`                            | Breaking                                                      |
| `Checkbox`, `Radio`                                                                                             | `onRenderVisualPicker*`                                                                                                      | `visualPickerFigure*`                                                                                                                                                | Deprecated                                                    |
| `ColorPicker`                                                                                                   | Uncontrolled color                                                                                                           | `value` and `events.onChange` required; `isOpen` is honored                                                                                                          | Breaking                                                      |
| `ColorPicker`                                                                                                   | `swatchColors`, `defaultSelectedTab` with any `variant`                                                                      | Only on the variants that show those tabs                                                                                                                            | Breaking                                                      |
| `ColorPicker`                                                                                                   | `events.onValidateColor`, `events.onValidateWorkingColor`                                                                    | `validateColor`, `validateWorkingColor`                                                                                                                              | Deprecated                                                    |
| `ColorPicker`                                                                                                   | Top-level `onOpen`, `onClose`, `onRequestOpen`, `onRequestClose`                                                             | The `events` keys                                                                                                                                                    | Deprecated                                                    |
| `Combobox`                                                                                                      | `defaultValue`                                                                                                               | `value` and `events.onChange`                                                                                                                                        | Breaking                                                      |
| `Combobox`                                                                                                      | `optionsSearchEntity`/`optionsAddItem` clicks went to `onSelect`                                                             | `events.onSelectActionItem`; action rows never enter `selection`                                                                                                     | Breaking (runtime)                                            |
| `Combobox`                                                                                                      | Item `onClick` on action rows                                                                                                | `events.onSelectActionItem`                                                                                                                                          | Deprecated                                                    |
| `Combobox`                                                                                                      | `onRenderMenuItem`, `menuItem` (a component)                                                                                 | `renderMenuItem({ assistiveText, isSelected, option })`                                                                                                              | Deprecated                                                    |
| `Combobox`                                                                                                      | Option `type` for grouping                                                                                                   | `category`; `type` is for structural rows                                                                                                                            | Deprecated                                                    |
| `Combobox`                                                                                                      | Option `icon` any node                                                                                                       | An `Icon` element                                                                                                                                                    | Breaking                                                      |
| `Combobox`                                                                                                      | `popover` variant without its props                                                                                          | Requires `popover` and `assistiveText.popoverLabel`; listbox variants require `options`                                                                              | Breaking                                                      |
| `Combobox`                                                                                                      | `singleInputDisabled`                                                                                                        | `disabled` (now disables the input in every variant)                                                                                                                 | Deprecated                                                    |
| `Combobox`                                                                                                      | `events.onClose` on a requested close                                                                                        | `events.onRequestClose` fires for every close path; `events.onClose` on real transitions                                                                             | Breaking (runtime)                                            |
| `Combobox`                                                                                                      | `input`, `popover` props overwritten                                                                                         | They win over the defaults; `input` `onChange` runs alongside                                                                                                        | Breaking (runtime)                                            |
| `DataTable`                                                                                                     | See [`DataTable` is `SimpleDataTable`](#datatable-is-simpledatatable)                                                        | `SimpleDataTable`                                                                                                                                                    | Breaking                                                      |
| `DatePicker`                                                                                                    | `children`                                                                                                                   | `input`                                                                                                                                                              | Breaking                                                      |
| `DatePicker`                                                                                                    | `label`, `placeholder`, `assistiveTextOpenCalendar`                                                                          | `labels.label`, `labels.placeholder`, `assistiveText.openCalendar`                                                                                                   | Breaking                                                      |
| `DatePicker`                                                                                                    | Uncontrolled date, `formattedValue`                                                                                          | `value: Date \| null` and `onChange` required; `data.date` can be `null`                                                                                             | Breaking                                                      |
| `DatePicker`                                                                                                    | `onRequestOpen`, `onRequestClose` with no arguments                                                                          | `(event, { trigger })`                                                                                                                                               | Non-breaking                                                  |
| `DatePicker`                                                                                                    | Keyboard and typing set the open state directly; `onRequestOpen` without `isOpen` stopped it opening                         | Down/Up, Escape/Enter and typing go through `onRequestOpen`/`onRequestClose` (typing uses `'input-change'`), so controlled pickers open from the keyboard            | Breaking (runtime)                                            |
| `DockedComposer`                                                                                                | Body mounted while closed                                                                                                    | Body unmounted while closed; `defaultIsOpen`                                                                                                                         | Breaking (runtime)                                            |
| `DynamicIcon`                                                                                                   | Variant props with any `variant`                                                                                             | `scorePolarity`, `strengthLevel` (-3 to 3), `trendDirection` only with their variant                                                                                 | Breaking                                                      |
| `ExpandableSection`                                                                                             | `onToggleOpen` data `isOpen` was the current state                                                                           | The requested state: `setIsOpen(data.isOpen)`                                                                                                                        | Breaking (runtime)                                            |
| `ExpandableSection`                                                                                             | `isOpen={false}` with `nonCollapsible`                                                                                       | Rejected; a non-collapsible section is always open                                                                                                                   | Breaking                                                      |
| `File` (`Files`)                                                                                                | `labels.title` optional, `href` default                                                                                      | `labels.title` required; no `href` default                                                                                                                           | Breaking                                                      |
| `Filter`                                                                                                        | Clicking opened a popover with `isOpen` set                                                                                  | `isOpen` controls it; `defaultIsOpen` starts it open                                                                                                                 | Breaking (runtime)                                            |
| `Grid`                                                                                                          | Any `flavor` string                                                                                                          | One of the SLDS grid modifiers                                                                                                                                       | Breaking                                                      |
| `Icon`                                                                                                          | String `assistiveText`                                                                                                       | `assistiveText={{ label: '…' }}`                                                                                                                                     | Breaking                                                      |
| `Input`                                                                                                         | `defaultValue`                                                                                                               | `value` and `onChange`; the counter no longer steps itself                                                                                                           | Breaking                                                      |
| `Input`                                                                                                         | `assistiveText.fieldLevelHelpButton`                                                                                         | `assistiveText.triggerLearnMoreIcon` on the `Tooltip` in `fieldLevelHelpTooltip`                                                                                     | Breaking                                                      |
| `Input`                                                                                                         | Counter props on the base variant; `label` with `assistiveText.label`; `fixedTextLeft` with `fixedTextRight`; string lengths | Rejected. `tabIndex`, `maxLength`, `minLength` are numbers                                                                                                           | Breaking                                                      |
| `InputIcon`, `ButtonIcon`                                                                                       | Extra props                                                                                                                  | Rejected; a clickable `InputIcon` requires `assistiveText.icon`                                                                                                      | Breaking                                                      |
| `MenuDropdown`                                                                                                  | `onSelect(option, data)`                                                                                                     | `onSelect(event, { option, optionIndex, value })`                                                                                                                    | Breaking                                                      |
| `MenuDropdown`                                                                                                  | Internal selection                                                                                                           | `value` drives the checkmark; update it from `data.value`                                                                                                            | Breaking (runtime)                                            |
| `MenuDropdown`                                                                                                  | `tooltip`, `offset`, `isInline`                                                                                              | Wrap the trigger in a `Tooltip`; no replacement (automatic); `menuPosition="relative"`                                                                               | Breaking                                                      |
| `MenuDropdown`                                                                                                  | `DropdownTrigger` child                                                                                                      | `trigger`                                                                                                                                                            | Deprecated                                                    |
| `MenuDropdown`                                                                                                  | `listItemRenderer` (a component)                                                                                             | `renderMenuItem({ icon, isSelected, option, optionIndex })`                                                                                                          | Deprecated                                                    |
| `MenuDropdown`                                                                                                  | `isOpen` controlled only when a boolean; `onOpen`/`onClose` for requests                                                     | Controlled when not `undefined`; use `onRequestOpen`/`onRequestClose`                                                                                                | Breaking (runtime)                                            |
| `MenuDropdown`                                                                                                  | String `tabIndex`, `width="bottom"`, `length={null}`, `iconVariant="small"`                                                  | Number `tabIndex`; others removed; an icon trigger needs `iconName` or `trigger`                                                                                     | Breaking                                                      |
| `MenuDropdown`                                                                                                  | Options of any shape                                                                                                         | `MenuDropdownOption` is a union on `type`; icon `category` is checked                                                                                                | Breaking                                                      |
| `Modal`                                                                                                         | `title`, `closeButtonAssistiveText`                                                                                          | `heading`, `assistiveText.closeButton`                                                                                                                               | Breaking                                                      |
| `Modal`                                                                                                         | `containerClassName`, `contentClassName`, `contentStyle`, `footerClassName`, `headerClassName`, `portalClassName`            | `classNameContainer`, `classNameContent`, `styleContent`, `classNameFooter`, `classNameHeader`, `classNamePortal`                                                    | Deprecated                                                    |
| `Modal`, `WelcomeMat`                                                                                           | `onRequestClose()`                                                                                                           | `onRequestClose(event, { trigger })`                                                                                                                                 | Non-breaking                                                  |
| `ModalTrigger`                                                                                                  | `ModalTrigger.open(…)`                                                                                                       | `Modal` with `isOpen`                                                                                                                                                | Breaking                                                      |
| `PageHeader`                                                                                                    | Any prop with any `variant`                                                                                                  | Union on `variant`: no `trail`, `label` or `details` on `base`; no `details` on `object-home`/`related-list`; `details` flavor is `n-of-m`                           | Breaking                                                      |
| `PageHeader`                                                                                                    | `onRenderActions`, `onRenderControls`                                                                                        | `actions`, `controls`                                                                                                                                                | Deprecated                                                    |
| `PanelFilterGroup`                                                                                              | `assistiveTextCloseFilterPanel`                                                                                              | `assistiveText.closeButton`                                                                                                                                          | Breaking                                                      |
| `PanelFilterGroup`                                                                                              | `header`/`footer` with `variant="panel"`; panel callbacks without it                                                         | Rejected                                                                                                                                                             | Breaking                                                      |
| `Pill`                                                                                                          | Any combination                                                                                                              | `href` rejected on the option variant; one of `icon`/`avatar`, one of `labels.label`/`children`; number `tabIndex`                                                   | Breaking                                                      |
| `PillContainer`                                                                                                 | Options without `id`, extra keys                                                                                             | `id` required; no extra keys                                                                                                                                         | Breaking                                                      |
| `PillContainer`                                                                                                 | `onClickPill`, `onRequestRemovePill`                                                                                         | `events.onClickPill`, `events.onRequestRemovePill`                                                                                                                   | Deprecated                                                    |
| `Popover`                                                                                                       | `closeButtonAssistiveText`, `offset`                                                                                         | `assistiveText.closeButton`; no replacement                                                                                                                          | Breaking                                                      |
| `Popover`                                                                                                       | `className`, `style` on the dialog                                                                                           | On the trigger wrapper; `classNameDialog`, `styleDialog` for the dialog                                                                                              | Breaking (runtime)                                            |
| `Popover`                                                                                                       | `contentsClassName`, `triggerClassName`, `footerClassName`, `footerStyle`                                                    | `classNameDialog`, `className`, `classNameFooter`, `styleFooter`                                                                                                     | Deprecated                                                    |
| `Popover`                                                                                                       | `heading` with `ariaLabelledby`                                                                                              | One or the other                                                                                                                                                     | Breaking                                                      |
| `Popover`                                                                                                       | `icon` on any variant                                                                                                        | `icon` only with `variant="feature"`                                                                                                                                 | Breaking                                                      |
| `Popover`                                                                                                       | `onRequestClose` passed `{}` for a trigger click or hover close, `undefined` for Escape                                      | Always `(event, { trigger })`: `'triggerClick'`, `'mouseLeave'`; Escape passes the keydown event                                                                     | Breaking (runtime)                                            |
| `EditDialog` (`components/popover/edit-dialog`)                                                                 | Unknown props                                                                                                                | Rejected                                                                                                                                                             | Breaking                                                      |
| `ProgressIndicator`                                                                                             | `completedSteps`, `disabledSteps`, `errorSteps`                                                                              | `steps[].status`                                                                                                                                                     | Deprecated                                                    |
| `ProgressIndicator`                                                                                             | `selectedStep` object matched by fields                                                                                      | A step `id` (an object matches by `id`)                                                                                                                              | Breaking (runtime)                                            |
| `ProgressIndicator`                                                                                             | Any prop with any `type`                                                                                                     | `errorSteps`, `disabledSteps`, `tooltip`, `orientation`, `variant` rejected with `type="path"`; `orientation="horizontal"` rejected with `variant="setup-assistant"` | Breaking                                                      |
| `ProgressIndicator`                                                                                             | `steps[].onRenderSetupAssistantAction`                                                                                       | `steps[].setupAssistantAction`                                                                                                                                       | Deprecated                                                    |
| `ProgressRing`                                                                                                  | `icon` without `hasIcon`                                                                                                     | Requires `hasIcon`                                                                                                                                                   | Breaking                                                      |
| `Radio`                                                                                                         | `label`                                                                                                                      | `labels.label`                                                                                                                                                       | Breaking                                                      |
| `Radio`                                                                                                         | `defaultChecked`, uncontrolled                                                                                               | `checked` and `onChange` required                                                                                                                                    | Breaking                                                      |
| `Radio`                                                                                                         | `requestFocus`, `onRequestFocus`                                                                                             | `refs.input`                                                                                                                                                         | Deprecated                                                    |
| `Radio`                                                                                                         | `description`; visual-picker props on any variant; string `tabIndex`                                                         | Removed; `coverable`, `vertical`, `size`, `visualPicker*` need `variant="visual-picker"`, `style` needs `variant="swatch"`; number `tabIndex`                        | Breaking                                                      |
| `RadioGroup`, `RadioButtonGroup`                                                                                | `checked` on each child                                                                                                      | `value: string \| null` and `onChange(event, { value })` on the group; children from `components/radio-group/radio`                                                  | Breaking (`checked` on children deprecated)                   |
| `RadioGroup`                                                                                                    | `style` on `base`                                                                                                            | `style` only with `variant="button-group"`                                                                                                                           | Breaking                                                      |
| `ScopedNotification`                                                                                            | `iconName`                                                                                                                   | `icon={<Icon … />}`                                                                                                                                                  | Breaking                                                      |
| `SetupAssistant`                                                                                                | `progressBar` without `isCard`                                                                                               | Requires `isCard`                                                                                                                                                    | Breaking                                                      |
| `SetupAssistant`, `SetupAssistantStep`                                                                          | `onStepToggleIsOpen`/`onToggleIsOpen` data `isOpen` was the current state                                                    | The requested state; a step without `isOpen` toggles itself (`defaultIsOpen`)                                                                                        | Breaking (runtime)                                            |
| `SetupAssistantStep`                                                                                            | `onRenderAction`, `onRenderContent`, `onRenderFigure`                                                                        | `action`, `content`, `figure`                                                                                                                                        | Deprecated                                                    |
| `SimpleDataTable`                                                                                               | `onChange(selection, event)`                                                                                                 | `onRowChange(event, { selection })`, required with `selectRows`                                                                                                      | Breaking                                                      |
| `SimpleDataTable`                                                                                               | `assistiveTextFor*` props (table and column)                                                                                 | The matching `assistiveText` key on the table                                                                                                                        | Breaking                                                      |
| `SimpleDataTable`                                                                                               | Selection matched by deep comparison; `isSorted` flipped its own direction                                                   | Matched by `id`; columns render `sortDirection`, update it from `onSort`                                                                                             | Breaking (runtime)                                            |
| `SimpleDataTable`                                                                                               | Extra keys on items, columns, `assistiveText`                                                                                | Rejected; item `type` is `'header-row'` or unset                                                                                                                     | Breaking                                                      |
| `SimpleDataTable`                                                                                               | `resizable`, `resizableOptions`                                                                                              | Removed; set `fixedHeader`, `fixedLayout`, `keyboardNavigation`                                                                                                      | Breaking                                                      |
| `SimpleDataTable`                                                                                               | `fixedLayout` added `slds-table_resizable-cols` and `role="grid"`                                                            | `role="grid"`/`"gridcell"` only with both `fixedLayout` and `keyboardNavigation`; no resizable class                                                                 | Breaking (runtime)                                            |
| `SimpleDataTable`                                                                                               | `onRenderSubHeadingRow`                                                                                                      | `renderSubHeadingRow`                                                                                                                                                | Deprecated                                                    |
| `SimpleDataTable`                                                                                               | `onFixedHeaderResize`, `onToggleFixedHeaderListeners`                                                                        | No replacement (a `ResizeObserver` handles it)                                                                                                                       | Deprecated                                                    |
| `Slider`                                                                                                        | `defaultValue`                                                                                                               | `value` and `onChange` required                                                                                                                                      | Breaking                                                      |
| `Slider`                                                                                                        | `classNameContainer`                                                                                                         | `className`                                                                                                                                                          | Deprecated                                                    |
| `Slider`, `Textarea`                                                                                            | `label`, `errorText`                                                                                                         | `labels.label`; `labels.error` with `hasError`                                                                                                                       | Deprecated                                                    |
| `Spinner`                                                                                                       | `isInline`, `isInput`                                                                                                        | `placement="inline"`, `placement="input"`                                                                                                                            | Deprecated                                                    |
| `Spinner`                                                                                                       | `containerClassName`, `containerStyle`                                                                                       | `className`, `style`                                                                                                                                                 | Deprecated                                                    |
| `SplitView`                                                                                                     | `events.onOpen`, `events.onClose`                                                                                            | `events.onToggle(event, { isOpen })`                                                                                                                                 | Deprecated                                                    |
| `SplitView`                                                                                                     | `assistiveText.toggleButtonOpen`, `toggleButtonClose` (inverted)                                                             | `closeToggle`, `openToggle`                                                                                                                                          | Deprecated                                                    |
| `SplitViewHeader`, `SplitViewListbox` items                                                                     | Extra keys                                                                                                                   | Rejected                                                                                                                                                             | Breaking                                                      |
| `SplitViewListbox`                                                                                              | Item objects in `selection`/`unread`, uncontrolled                                                                           | Item ids; `selection` and `events.onSelect` required; items need `id`                                                                                                | Breaking (item objects deprecated)                            |
| `SplitViewListbox`                                                                                              | `listItem` (a component)                                                                                                     | `renderListItem({ isFocused, isSelected, isUnread, item })`                                                                                                          | Deprecated                                                    |
| `Tabs`                                                                                                          | `onSelect(selectedIndex, lastIndex)`; returning `false` cancelled                                                            | `onSelect(event, { value, previousValue, selectedIndex, previousIndex })`; don't update `value` to refuse                                                            | Breaking                                                      |
| `Tabs`                                                                                                          | `defaultSelectedIndex`, uncontrolled                                                                                         | `value` (matched to `TabsPanel` `value`) and `onSelect` required                                                                                                     | Breaking                                                      |
| `Tabs`                                                                                                          | `selectedIndex`                                                                                                              | `value`                                                                                                                                                              | Deprecated                                                    |
| `Tabs`                                                                                                          | `components/tabs/pane`                                                                                                       | `components/tabs/panel` (`TabsPanel`)                                                                                                                                | Breaking                                                      |
| `TabChildProps`, `FileChildProps` types                                                                         |                                                                                                                              | `TabsPanelProps`, `FileProps`                                                                                                                                        | Deprecated                                                    |
| `Textarea`                                                                                                      | `defaultValue`, string `maxLength`                                                                                           | `value` and `onChange(event, { value })` required; number `maxLength`; aria props use `TextareaHTMLAttributes`                                                       | Breaking                                                      |
| `Toast`                                                                                                         | Close button always rendered                                                                                                 | Only with `dismissible`                                                                                                                                              | Breaking (runtime)                                            |
| `Toast`                                                                                                         | `onClickHeadingLink` typed loosely                                                                                           | `(event: MouseEvent<HTMLAnchorElement>) => void`, the click event only                                                                                               | Breaking                                                      |
| `Toast`                                                                                                         | `onRequestClose()`                                                                                                           | `onRequestClose(event, { trigger })`                                                                                                                                 | Non-breaking                                                  |
| `Toast`                                                                                                         | `variant` required                                                                                                           | Optional, defaults to `info`                                                                                                                                         | Non-breaking                                                  |
| `Tooltip`                                                                                                       | `target`, `variant="info" \| "error"`                                                                                        | `onRequestTargetElement`, `theme`                                                                                                                                    | Breaking                                                      |
| `Tooltip`                                                                                                       | `isOpen={false}` to turn it off                                                                                              | `isDisabled`; `isOpen` is controlled                                                                                                                                 | Breaking (runtime)                                            |
| `Tooltip`                                                                                                       | Trigger as `children`                                                                                                        | `trigger`                                                                                                                                                            | Deprecated                                                    |
| `Tree`                                                                                                          | `onClick`, `onExpandClick`; writes `selected`/`expanded` to nodes                                                            | `selectedIds` (required) with `onSelect(event, { node, isSelected, selectedIds })`; `expandedIds`/`defaultExpandedIds` with `onRequestToggle`                        | Breaking (`onClick`, `onExpandClick`, node fields deprecated) |
| `Tree`                                                                                                          | `heading`, `assistiveText.label`                                                                                             | `labels.heading` or `assistiveText.heading`, not both                                                                                                                | Deprecated                                                    |
| `Tree`                                                                                                          | `listClassName`, `listStyle`                                                                                                 | `classNameList`, `styleList`                                                                                                                                         | Deprecated                                                    |
| `Tree`                                                                                                          | `onScroll` data `percentage`                                                                                                 | `ratio`                                                                                                                                                              | Deprecated                                                    |
| `Tree`                                                                                                          | `TreeNode` `type` any string; `FlattenedNode` export                                                                         | `'branch'` or `'item'` (only branches take `nodes`, `expanded`, `loading`); `FlattenedNode` removed                                                                  | Breaking                                                      |
| `TrialBar`                                                                                                      | `labels.timeLeftUnit`, `labels.timeLeftUnitAfter`; `onRenderActions`                                                         | `labels.timeLeftAfter`; `actions`                                                                                                                                    | Deprecated                                                    |
| `TrialBarDropdown`                                                                                              | `inverse`                                                                                                                    | Removed (always inverse)                                                                                                                                             | Breaking                                                      |
| `VerticalNavigation`                                                                                            | Uncontrolled; first item selected by default                                                                                 | `selectedId: string \| null` and `onSelect` required                                                                                                                 | Breaking                                                      |
| `VerticalNavigation`                                                                                            | Items without `url` rendered `<a href="#">`                                                                                  | `<button>`; `onSelect` event is `MouseEvent<HTMLAnchorElement \| HTMLButtonElement>`; items reject extra keys                                                        | Breaking                                                      |
| `VisualPicker`                                                                                                  | `links` pickers took `className`, `id`, `label`, `labels`, `assistiveText`, `coverable`, `size`, `vertical`                  | Rejected                                                                                                                                                             | Breaking                                                      |
| `VisualPickerLink`                                                                                              | `href` optional                                                                                                              | `href` required                                                                                                                                                      | Breaking                                                      |
| `WelcomeMat`                                                                                                    | `className` on the info content                                                                                              | `className` on `.slds-welcome-mat`                                                                                                                                   | Breaking (runtime)                                            |
| `WelcomeMat`                                                                                                    | Any prop with any `variant`                                                                                                  | Union on `variant`; `splash` rejects tiles                                                                                                                           | Breaking                                                      |
| `WelcomeMat`                                                                                                    | `onRenderInfoActions`; `WelcomeMatInfoBadge` `onCompleteRenderActions`                                                       | `infoActions`; `completeActions`                                                                                                                                     | Deprecated                                                    |
