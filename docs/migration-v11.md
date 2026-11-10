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

| 0.10.x path                     | v11 path                                              |
| ------------------------------- | ----------------------------------------------------- |
| `components/bread-crumb`        | `components/breadcrumb`                               |
| `components/navigation`         | `components/vertical-navigation`                      |
| `components/popover-tooltip`    | `components/tooltip`                                  |
| `components/forms/checkbox`     | `components/checkbox`                                 |
| `components/forms/radio`        | `components/radio`                                    |
| `components/forms/textarea`     | `components/textarea`                                 |
| `components/forms/input`        | `components/input`                                    |
| `components/forms/input/search` | `components/input/search`                             |
| `components/tabs/pane`          | `components/tabs/panel`                               |
| `components/data-table/…`       | `components/simple-data-table/…`                      |
| `utilities/design-tokens/…`     | Removed. Use SLDS 2 styling hooks (`var(--slds-g-*)`) |

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

The same move applies to `Combobox` (`classNameCombobox`), `DatePicker` (`classNameMenu`, `classNameTrigger`), `ProgressBar` (`classNameBar`), `RadioGroup` (`classNameControl`), `SimpleDataTable` (`classNameTable`), `WelcomeMat`, `BuilderHeader` and `SetupAssistant`. This is a runtime change: the old code compiles but styles a different element.

Imperative focus props are gone. Use `ref`: `requestFocus` and `onRequestFocus` were removed from `Button`, `Checkbox` and `Radio`.

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

### `children` instead of `body` and `content`

Content a component renders is its `children`. Zero-argument `onRender*` functions became `ReactNode` slots, and render props that take data became `render<Part>(data)` functions:

```tsx
// 0.10.x
<MediaObject figure={icon} body="Acme" />
<Badge content="New" />
<PageHeader variant="object-home" title="Accounts" onRenderActions={() => <Button label="New" />} />

// v11
<MediaObject figure={<Icon category="standard" name="account" />}>Acme</MediaObject>
<Badge>New</Badge>
<PageHeader
	variant="object-home"
	title="Accounts"
	actions={<PageHeaderControl><Button label="New" /></PageHeaderControl>}
/>
```

`body`, `content` and the `onRender*` props are deprecated and still work in 11.x.

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
