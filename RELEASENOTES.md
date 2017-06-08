# Release notes
_Salesforce Lightning Design System :: React Components :: design-system-react_

## Future Breaking Changes

These are changes that have backwards-compatible solutions present and that compatibility will be removed at a breaking change release in the future.

- `Checkbox`'s `onChange` now receives `event, { checked: [boolean], indeterminate: [boolean] }`. Previously, `checked` was the first parameter.
- `TabsPane` has been replaced with `TabsPanel`.
- `Input`'s props: `iconPosition`, `iconAssistiveText`, `iconCategory`, `iconName`, `onIconClick` are deprecated. An `Icon` component should be used instead.
- `DataTable`'s `collection`, `onSelect`, `onDeselect` are deprecated.
- The prop `modal` in `DatePicker`, `Lookup`, `MenuDropdown`, `MenuPicklist`, `TimePicker` is deprecated
- Remove `openByDefault` from `PopoverTooltip`.
- Remove alias component files. Please update the following removed files to their new file name.
    - tabs/pane
    - SLDSSettings
    - lookup/menu/
    - lookup/menu/default-footer
    - lookup/menu/default-header
    - lookup/menu/default-section-divider
    - lookup/menu/item/
    - menu-list/list-item-label
    - menu-list/list-item
    - menu-list/list
- BreadCrumb is now Breadcrumb (bread-crumb -> breadcrumb)

---
## Release 0.6.9
**Minor Changes**
- Modal: Allow Modal footer prop to accept either an arry or node
- Modal: Allow Modal to be rendered inside of custom DOM node instead of `<body>` tag. Pass function to `parentSelector` prop - it should return the container DOM node (ie.`return document.querySelector('#myModalContainer');`).


## Release 0.6.8
**New Components**
- Checkbox button group
- Exported SLDSSearch (`forms/input/search`) in bundled package

**Minor Changes**
- Started using assistiveText prop object instead of individual prop strings (Datepicker). Will follow suit in other components.
- Change React.PropTypes to prop-types in preparation for React upgrade
- Added a11y html markup to Filter
- Allow devs to pass in link to Icon for external icons

**Bugs**
- Fixed filter but where 'ESC' didn't close popover

## Release 0.6.7

**Minor Changes**

- `Checkbox` Toggle variant added

**Minor Changes**

- `MenuPicklist`: Add inline error state similar to `Input`
- `Input`: correct spelling and usage of `aria-labelledby`

## Release 0.6.6

**Minor Changes**

- Fix focus transfer on close of "modal" `Picklist`
- Remove title attribute on column header if `DataTable` column label is not a string
- Pass `iconPosition` prop from `Dropdown` to a custom trigger
- Add `onClick` callback prop to `Filter`
- Add `DataTable` width prop to column header
- Add `className` prop to `Filter`

## Release 0.6.5

**Minor Changes**

- `Datepicker` has a `dateDisabled` callback to allow disabling of arbitary dates.
- `Filter` has a `popover` prop that allows custom props to be passed in and allows the `Filter`'s popover to be controlled by the developer instead of the `Filter`.
- `Lookup` has an additional item compare to see if it should update its internal state. This is a temporary hack until state can be removed from `Lookup` and it can directly use props.
- Inline icons are now [v7.7.0](https://github.com/salesforce-ux/icons/releases/tag/v7.7.0). Version was just updated in a prior release.
- Add `DataTable` width to table headers

## Release 0.6.4

**Major Changes**

- Filtering `Panel` component added with variants New, Error, and Locked.
  - Filters component added.
  - _Forward looking statement:_ `FilterGroup` may be broken out of `Panel` and into it's own component in the future so that it can be used outside of a `Panel`, but was not broken out in this release due to pattern not existing outside of Panel in SLDS.

**MAINTENANCE**

- Reference of `undefined` variable in `Tabs` removed.

## Release 0.6.3

**Major Changes**

- `BreadCrumb` component is now `Breadcrumb` with a backwards compatible alias.
- ElementS are now allowed within Tab's `label` prop.
- `DataTable`
  - Markup updates to SLDS 2.2.1
  - If you are using `id` attributes, to query the DOM (tsk, tsk), the `id`s have changed format.
  - `DataTable` is now bordered by default. This is a visual breaking change, but will not be considered one for semver, due to SLDS's change to bordered tables being the default style.
  - Advanced/Fixed Table supports "title" attribute for truncated cells
  - `DataTable` Column `label` can be a node.
  - `DataTable` column sort arrow issues resolved, including ARIA issues.
- Icons are now [v7.7.0](https://github.com/salesforce-ux/icons/releases/tag/v7.7.0).
- Added `closeButtonAssistiveText` to Modal for i18n

**MAINTENANCE**

- Documentation build out now occurs on all pull requests to catch issue sooner.
- Internal components use ES6's `export default`. Public components were not affected, but will be moved ES6's `export default` in the future.
- ESlint issues reduced to less than 300.
- Added Greenkeeper for dependency management

## Release 0.6.2

**Major Changes**

- Added Navigation component

**Minor Changes**

- Markup updates to Modal, Button, Card, Input, and Page Header

## Release 0.6.1

- Documentation site updates. *No production code changes in this release*.

## Release 0.6.0

**MAJOR CHANGES**

- Datepicker updates
    - `className` now is added to the node with `slds-datepicker` class within the dialog. Use `triggerClassName` for the outer wrapping `div`. *[BREAKING CHANGE]*
    - `onChange` (formerly onDateChange) now provides callback with event and a data object in the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}`
    - Many new props and features: calendar alignment, assistive text props, accepts custom input, supports ISO weekday (Monday first), new props to allow calendar to be controlled (onClose, onOpen, onRequestClose, onRequestOpen), `portalMount` prop for testing React root nodes, more alignment with other menu/dialog components
    - Additional accessiblity and testing
    - See [Date Picker documentation](https://react.lightningdesignsystem.com/components/datepickers/) for fullset of changes
- `id` on GlobalNav Link move to list item instead of `a` *[BREAKING CHANGE]*
- In Button, `aria-*` props now use hyphen instead of camelCase. Use `aria-expanded` and not `ariaExpanded`. *[BREAKING CHANGE]*

**MINOR CHANGES**

- Picklist bugfix where the value might be available before the options object is. This would make the active item index be incorrect.
- Fix sort arrow bug in DataTable. Only one column can be actively sorted at a time. Column heading padding has also been updated.
- Add `disabled` prop to Lookup.
- Popover's `onRequestClose` and `onClose` now fire once when Dialog component closes.
- Popover spacing from target/trigger is correct.
- `checkProp`'s `oneOfComponent` parses `displayName` properly

## Release 0.5.4

**MINOR CHANGES**

- Add icon/figure support to Page header (Object home variant)
- Correct dropdown trigger styling within a button group (e.g.- more button)
- Fix bug caused by DST and hours calculation in Datepicker.

## Release 0.5.3

**DOCUMENTATION**

- Moves stories into examples folder, doc site examples are now aligned with SLDS website. *No production code changes in this release*.

## Release 0.5.2

**MINOR CHANGES**

- React components that are really are just sub-renders and are not meant to be consumed by end-users of this project have been moved to `components/[COMPONENT_NAME]/private`. Feel free to continue using components that are still in `components/[COMPONENT_NAME]` folder and consider them part of the public API. Hopefully, this adds clarity to what components can and should be used.
- In order to automate more the documentation site, more components are listed in package.json and an `examples` folder has been added to the `-es` tagged package to be used by the doc site.


## Release 0.5.1

**DOCUMENTATION**

- Adds mention of setting `AppElement` for `Modal` and `AppLauncher` to component documenation, so that the entire `body` is not hidden for assistive technology users.

## Release 0.5.0

**MINOR FEATURES**

- Add `portalClassName` to Modal.
- Tabs: Add scoped variant

**BUG FIX**

- Removed {...props} from DOM nodes in components to prevent non-valid ones from being passed on (ie. `<input myFunkyprop .. />`). If users need specific props passed onto DOM nodes, please submit a Github issue.
- Fix icons and alert texture in Notification

## Release 0.4.7

**MINOR FEATURES**

- Add indeterminate state support to `Checkbox`.
- Add indeterminate state support to selectable variant of `DataTable`.
- Export `InputIcon`.

## Release 0.4.6

**MINOR FEATURE**

- Allow custom classes on menu list items with item object key, `classname`, within `options` prop.

## Release 0.4.5

**MINOR FEATURE**

- App Launcher has a `modalClassName` that will be added to the `Modal` when rendered.

## Release 0.4.4

**BUG FIX**

- Tabs' `Panel` changed to `TabsPanel` to align with other component names.

## Release 0.4.3

**BUG FIX**

- Manages CSS imports better for ES6, CommonJS and AMD packages. Previously, CSS imports would fail if a CSS file imports were present in the ECMAScript. This will remove the CSS imports from CommonJS and AMD packages.
- Changes Tabs' `Pane` to `Panel`
- Removes prototype status from Tabs

## Release 0.4.1

**BUG FIX**

- Fixes bugs in allowing parent to control state of dropdown.


## Release 0.4.0

**BREAKING CHANGES**

- Replaces `modal` with `isInline` for all dropdown-like components.

**MAJOR CHANGES**

- Adds a Tabs component.
- Allow parent to control state of dropdown.

**BUG FIX**

- Tweaks the class names on dropdown trigger to match SLDS.


## Release 0.3.16

**BUG FIX**

- Due to deprecations in v0.3.15 of `Input`'s `onIconClick`, an `onSearch` callback has been added to `Search`.


## Release 0.3.15

**MAJOR CHANGES**

- Allow icon on the left and right of inputs.
- Search can be `clearable` now with right clear icon.
- Input now uses `iconRight` and `iconLeft` and [accepts](https://github.com/salesforce-ux/design-system-react/blob/master/stories/forms/input/index.jsx#L36) an `InputIcon` component. Use of `onClick` [makes it clickable](https://github.com/salesforce-ux/design-system-react/blob/master/stories/forms/input/index.jsx#L11).
- The wrapping span has been removed from `ButtonIcon`. `ButtonIcon` is just a CSS customization of `UtilityIcon` now.
- Be sure to check inputs for deprecation notices.


## Release 0.3.14

- Remove top divider as default of `MenuDropdown` list menu heading items.
- Adds `divider` key with values `top` and `bottom` to `MenuDropdown` options to allow for a divider to be added to a heading.


## Release 0.3.13

**BUG FIX**
- In App Launcher, Tile Truncate utility uses new props to prevent UI state from being out-of-sync with props.


## Release 0.3.12

**BUG FIX**
- In Picklist, pressing enter now triggers the `onClick` prop
- Add Dropdown wrapping `div` to align with SLDS and allow menu nubbins to be positioned with default CSS. [DOM change]
- Make Global Header dropdowns inline instead of "modal"


## Release 0.3.11

**BUG FIX**
- In Picklist, tabbing moves focus to the next tabbable DOM element, instead of opening the menu.
- In Dropdown, an `onCLick` prop is passed down to all custom content children, so that they can close the menu.


## Release 0.3.10

**MAJOR CHANGES**
- Adds `hybrid` to `openOn` options. This allows a click to open and hover out to close in case one does not have control of the DOM outside of the navigation.


## Release 0.3.9

**Bug Fix**
- Prevent Global Nav menus from flipping up at small screen heights


## Release 0.3.8

**Bug Fix**
- Make App Launcher Tile More tooltip trigger a span tag
- Make inline input’s edit icon smaller
- Make DatePicker and TimePicker value prop the source of future state

**Documentation**
- Add mention of classnames library to `contributing.md`
- Add test coverage comments, surfacing in-browser tests


## Release 0.3.7

**MAJOR CHANGES**
- Global Navigation menus no longer are fixed to a height of `5`. They're as high as their content.
- Card heading can also be a node to allow full customization of a Card header
- Card control is now fully stateless to better match React patterns

**Bug Fix**
- Sets App Launcher modal to 90% height
- Sends correct `href` to App Launcher Tile click callback
- Corrects markup for menu separators and headers in Global Navigation


## Release 0.3.6

**MAJOR CHANGES**
- Add Tree as a prototype component. Tree is not accessible to assistive technology at this time.
- Add GlobalHeader to default library export.

**Bug Fix**
- Detect PageHeader detail field truncation on update instead of mount.


## Release 0.3.5

**MAJOR CHANGES**
- Add `style` and `bodyClassName` props to Card to allow overflow on Card body.
- Add `length` prop to GlobalNavigationMenuDropdown. It can be set to `null` to remove scrolling.


## Release 0.3.4

**MAJOR CHANGES - SLDSPageHeader**
- Make field truncation optional.
- If field truncates, then show PopoverTooltip on hover/focus to view full field text.

**Bug Fix**
- Lookup component had a bug where updating the selectedItem prop did not work. Now it does. To clear the item, pass in -1.
- Focus on search input when App Launcher opens
- No longer renders a close button if modal type is prompt.
- Lookup search icon default should be on right side.


## Release 0.3.2

**MAJOR CHANGES**
- Add an AMD tag for users of Require.JS
- Makes the keyboard navigation logic less greedy
- Closes dropdown menu on second click of trigger
- Closes dropdown menu when another modal opens
- Closes dropdown menu when tabbed away from
- Opens hoverable dropdown menu on focus
- Provides a workaround for closing dropdown menus when clicking in another iframe
- Returns focus to the dropdown menu trigger when clicking escape
- Removes the default divider from the primary Global Navigation region when no secondary region is present

**OTHER**
- Remove SLDS media figure when no icon present in page header
- Adds a default iconPosition to Lookup
- Fixes modal Prompt heading style


## Release 0.3.1

**MAJOR CHANGES**
- Allow setting of active navigation bar item background color

**OTHER**
- Allows you to put the navigation bar right into the header if desired


## Release 0.3.0

**BREAKING CHANGES**
- AppLauncher now accepts a search node rather than `onSearch` and `searchPlaceholderText`
- Popover `openByDefault` has been replaced with `isOpen`

**MAJOR CHANGES**
- Adds special support for Global Header icons


## Release 0.2.4

**MAJOR CHANGES**
- Add `toggleable` prop to `AppLauncherSection`
- Add `GlobalNavBarLabel` child component
- Make `GlobalHeader` search to use left side icon
- Correct letter spacing of `AppLauncherTile` sub-heading

**OTHER**
- Adds 'tile' and 'section' imports to `AppLauncher` for site


## Release 0.2.3

**MAJOR CHANGES**
- Bugfixes and documentation for AppLauncher


## Release 0.2.2

**MAJOR CHANGES**
- Add Modal `header` and `headerClassName` props to allow for custom headers

**OTHER**
- Update the truncation logic to account for AppLauncher's description headings
- Center AppLauncher search bar with CSS
- AppLauncher makes use of Modal's new `header` prop
- Remove `id` generator from button component (let parent generate it, if needed)


## Release 0.2.1

**BREAKING CHANGES**
- Updates the GlobalNavigationBarLink to pass `{ href }` as the second parameter

**MAJOR CHANGES**
- Remove `trapEvent` from GlobalNavigationBarLink and replace with `preventDefault` to allow clicks to bubble up
- Adds support for custom content to Global Header profile
- Cleans up the dividerPosition of Nav Region

**OTHER**
- Updates the icon script to lowercase names
- Makes the Nav Menu trigger use chevron icon
- Corrects check props for profile children


## Release 0.2.0

**BREAKING CHANGES**
- Changes to how the `inverse` prop works for icons and removal of the default value of `true`
- Button component: Inverse style of Button (white color to go on dark backgrounds) is now declared with a bool prop, inverse
- Button component: `inverse` and `icon-inverse` are no longer supported in the variants prop

**MAJOR CHANGES**
- Add support for custom svg icons
- Update Icon to the latest markup
- Update Tooltip to the latest markup
- Allow custom styles to be passed to icons

**OTHER**
- Allow menus and buttons used in the Global Nav Bar to be marked as active
- Animates the App Launcher icon based on the latest SLDS markup
- Button component: when button icon had an iconVariant prop, the iconSize prop did not render. It is now fixed
- Timepicker wasn't working correctly after the menu updates in 0.1.1. It is now fixed
- Update the logo used in the Global Header story


## Release 0.1.2

**MAJOR CHANGES**
- Add the App Launcher component
- Add support for the title attribute for icons

**OTHER**
- Additional code cleanup


## Release 0.1.1

**MAJOR CHANGES**
- Add support for icons, headers, links, and dividers to Dropdown and Picklist menus
- Add support for custom content in Dropdown menus
- Update Lookup to the latest markup
- Update Picklist to the latest markup

**OTHER**
- Add name attributes to Checkbox and Input
- Add Button support to Global Navigation Bar
- Update the keyboard navigation logic used by menus
- Update profile icon used in the Global Header


## Release 0.1.0

**BREAKING CHANGES**
- Rename ContextBar to GlobalNavigationBar

**MAJOR CHANGES**
- Add the Global Header component
- Add a Search component
- Update BreadCrumb to the latest markup
- Update PageHeader to the latest markup

**OTHER**
- Begin counting versions from 0.1.0
- Add buffered option to DataTable


## Release 0.0.35

**MAJOR CHANGES**
- Reversed Flippable prop due to bug with Tether.js
- Use Popover component in Datepicker
- Add required and disabled props to Datepicker and Timepicker


## Release 0.0.34

**BREAKING CHANGES**
- Flippable prop on Timepicker and Datepicker used to default to true. Now, it defaults to false and you must explicitly add it.


## Release 0.0.33

**MAJOR CHANGES**
- Added new InlineEdit component
- Clickable Input icons now use Button

**OTHER**
- Remove unused Popover class on Picklist
- Additional code cleanup


## Release 0.0.32
- Added containerClassName prop to Spinner


## Release 0.0.31

**MAJOR CHANGES**
- Added new Spinner component
- Updated the ContextBar component
- Added a highlighting utility
- Added a custom cell type to DataTable using the highlighter

**OTHER**
- Remove isRequired for iconCategory in ButtonGroup
- Additional bug fixes and code cleanup


## Release 0.0.29

**MAJOR CHANGES**
- New release process

**SITE AND DOCS**
- Moved site to external repo


## Release 0.0.28

**MAJOR CHANGES**
- New Components:
  - SLDSBreadCrumb
  - SLDSDataTable
  - SLDSGrid
  - SLDSPageHeader
- Lookup component no longer requires icons for menu items


## Release 0.0.27

**MAJOR CHANGES**
- SLDSIcons.Icon refactored to SLDSIcon
- Picklist renamed to PicklistBase
- Dropdown renamed to DropdownBase

**SITE AND DOCS**
- New Getting Started and FAQ pages

**OTHER**
- custom_renderer code moved into demo/code_snippets
- new tests
- a multitude of bug fixes and TLC
