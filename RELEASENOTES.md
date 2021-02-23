# Release notes

_Salesforce Lightning Design System :: React Components :: design-system-react_
All releases must use a level two heading.

### Future Breaking Changes

These are changes that have backwards-compatible solutions present and that compatibility will be removed at a breaking change release in the future.

- `Checkbox`'s `onChange` now receives `event, { checked: [boolean], indeterminate: [boolean] }`. Previously, `checked` was the first parameter.
- `TabsPane` has been replaced with `TabsPanel`.
- `Input`'s props: `iconPosition`, `iconAssistiveText`, `iconCategory`, `iconName`, `onIconClick` are deprecated. An `Icon` component should be used instead.
- `DataTable`'s `collection`, `onSelect`, `onDeselect` are deprecated.
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

## Upcoming release

- You can now check this library's dependency on SLDS to make sure you have the CSS that this library is being developed with. The NPM git URL can be found in the published `package.json`. `SLDS: { gitURL: [URL]}`.

### Latest Release

## Release 0.10.30

**Bugfixes**

- Move `webpack-cli` to dev dependency

## Release 0.10.29

**Bugfixes**

- `Combobox`: Fix style breakage due to SLDS CSS being on ARIA 1.1. This introduces a “double combobox role” in the component. It is a temporary, non-semantic update. It has been tested in NVDA and VoiceOver with no side effects. If you are using aXe or sa11y testing, please update your configuration until further notice to the following to avoid failing: https://github.com/salesforce/design-system-react/pull/2761/files#diff-93bc89e11753fdb252273d1a27f7bd40c68f6ffb9dad64ad77eba41831477748

## Release 0.10.28

**Bugfixes**

- `Combobox`: Update markup from ARIA 1.1 to ARIA 1.2 to better support assistive technology
## Release 0.10.27

**Bugfixes**

- `Combobox`: Auto-scroll menu to selected item in listbox

## Release 0.10.26

**Bugfixes**

- `DataTable`: `onRenderSubHeadingRow` de-selecting de-selects all rows

## Release 0.10.25

**Minor Features**

- `Combobox`: Match search terms against subtitles
- `DataTable`: Add support for custom header rows

**Bugfixes**

- `Combobox` and `PillContainer`: Fix focus when clicking on a pill
- `Input`: Fix alignment of inline help text when Input is used with an icon

## Release 0.10.24

**Minor Features**

- `Badge`: Add success, warning, and error colors

**Bugfixes**

- `DataTable`: Properly display column label for `stacked` and `stackedHorizontal` variants

**Maintenance**

- Update Storybook to 6.1
- Get accessibility tests running again
- Add UNSAFE_ prefix for deprecated lifecycle hooks

## Release 0.10.23

**Minor Features**

- `DataTable`: Add infinite scrolling support
- `Tab`: Add vertical tab variant

## Release 0.10.22

**Minor Features**

- `Tab`: Add error icon support

**Bugfixes**

- `Combobox`: Clear selection when closing popover
- `Combobox`: Fix keyboard navigation when used as a controlled component
- Update `Combobox` and `Popover` markup

**Maintenance**

- Use `lint-staged` to run linters on commit
- Update project to use Node 12

## Release 0.10.21

**Minor Features**

- `BuilderHeader`: Ability to customize the title icon

**Bugfixes**

- `Popover`: Close `EditDialog` when clicking outside

**Documentation**

- Minor corrections in `BuilderHeader`, `Tooltip`, and `Tree`

## Release 0.10.20

**Minor Features**

- `Popover`: Add `disabled` prop to `EditDialog`
- `Spinner`: Add `isInline` and `hasContainer` props
- `StatefulButton`: Ability to pass in custom `aria-*` attributes

**Bugfixes**

- `DatePicker`: Correctly determine first day of week when `isIsoWeekday` is true

**Maintenance**

- Bump `@babel/node` from 7.2.2 to 7.10.4
- Bump `@babel/plugin-proposal-export-default-from` from 7.2.0 to 7.10.4
- Bump `@babel/plugin-transform-modules-commonjs` from 7.5.0 to 7.10.4
- Bump `@babel/preset-react` from 7.0.0 to 7.10.4
- Bump `concurrently` from 4.1.0 to 5.2.0
- Bump `cross-env` from 5.2.1 to 7.0.2
- Bump `lint-staged` from 8.2.0 to 10.2.11
- Bump `object.entries` from 1.1.0 to 1.1.2
- Bump `prop-types` from 15.6.0 to 15.7.2
- Bump `react-contenteditable` from 3.3.2 to 3.3.5
- Bump `regenerator-runtime` from 0.13.3 to 0.13.5
- Bump `websocket-extensions` from 0.1.3 to 0.1.4 (security)
- Change `npm start` to run processes in foreground

## Release 0.10.19

**Bugfixes**

- `Spinner`: Add `xx-small` variant
- `Filter` and `Panel`: Minor markup updates
- `DatePicker`: Typing in input closes the calendar
- `DataTable`: Add ability to specify a custom class for a row

## Release 0.10.18

**Bugfixes**

- `Combobox`: Fix issue with subheaders sorting incorrectly
- `Icon`: Fix issue with icons sometimes disappearing due to `<use xlink:href>`

## Release 0.10.17

**Bugfixes**

- `DataTableCell`: Prevent boolean PropTypes for `children` prop
- `Tooltip`: Fix issue with `hasAnchoredNubbin` appearing at inappropriate times on hover

**Maintenance**

- Remove `componentWillReceiveProps` from `ColorPicker`, `Combobox`, `DatePicker`, `Lookup`, `MenuDropdown`, `MenuPicklist`, `Notification`, `TimePicker`, and `Tree`

## Release 0.10.16

**Minor Features**

- `Datepicker`: Add `canInputMaintainFocus` prop
- `Tooltip`: Add `onRequestTargetElement` callback
- `Tooltip`: Add `hasAnchoredNubbin` prop

**Bugfixes**

- `Colorpicker`: Add support for named colors in default validator

## Release 0.10.15

**Bugfixes**

- Fix accessibility issues in `ProgressBar`, `ProgressRing`, and `Toast`
- `Map`: Rename `Map` to `LocationMap`. Map was not a part of the default export.

**Maintainance**

- Make console error / warning fail tests in CI

**Documentation**

- Add example headings to site
- Add accessibility statement to readme

## Release 0.10.14

**Bugfixes**

- Remove console warnings in DataTable and Combobox

## Release 0.10.13

**Minor Features**

- `Maps`: Make controlled component
- `Checkbox`: Add grouped checkboxes with `indeterminate` state working example that matches ARIA spec.
- `Combobox`: Support menu item scrolling in all variants
- Move all prototype components to production status

**Bugfixes**

- `Accordion`: Prevent grabbing focus on every render
- `Accordion`: Hotfix to work with one `AccordionPanel` child
- `Toast`: Focus on dialog container on render instead of close button
- `Popover`: Pass `aria-haspopup` to triggering component
- `Combobox`: Make `dialog` variant work. Update menu down icon style.
- `Combobox`, `DataTable`, `Expression`, `Map`, and `Dropdown`: Accessibility audit fixes. See https://github.com/salesforce/design-system-react/pull/2359
- `RadioGroup`, `Slider`, `SplitView`, `Spinner`, `Toast`: Accessibility audit fixes. See https://github.com/salesforce/design-system-react/pull/2337
- `ProgressBar`: Make read "{value}%" instead of just "{value}" for screenreaders
- `ProgressIndicator`: Read "Disabled" for disabled steps
- `ButtonGroup`: Checkbox should read "this field is required"

**Maintainance**

- Deprecate and EOL Illustration component
- `ProgressRing`: Add `assistiveText` to icons in examples
- `TextArea`: Making textarea error & required examples match their SLDS counterparts
- `Button`: Add margin between buttons in examples

## Release 0.10.12

**Minor Features**

- `Popover`: Add feature variant
- `SplitView`: `onSelect` now called with `enter` key
- `BuilderHeader`: Add miscellaneous section sub-component
- `BuilderHeader`: Use Error Popover in Utility Bar example
- `Accordion`: Update Base example to allow a panel to be toggled
- Add ARIA attributes to all `input` tags in library in order to enable increased accessibility support for consumers
- `SetupAssistant`: Add capacity to pass Icons into a `SetupAssistantStep`
- `Dropdown`: Adds `hover` capabilities w/ keyboard interactions
- `Accordion`: Add arrow key panel support (accessibility)

**Bugfixes**

- `Dropdown`: Menu Tooltip content now works with `options` array
- `Tabs`: White space around words in disabled tabs no longer trigger tab change. Disabled Tab style `import '!style-loader!css-loader!@salesforce/design-system-react/styles/tabs/tab.css';` updated to SLDS's modified BEM.
- `Expression`: Static markup accessibility violations fixed.
- `Files`: Add inverse classname to download button
- `BuilderHeader`: Make Tooltips in example accessible
- `TimePicker`: Remove default time-picker placeholder text

**Maintainance**

- `SplitView` Example: File name change
- Add functional programming eslint rules to increase maintainability
- `TravisCI`: Enable matrix build to speed up CI time
- Remove `PhantomJS` legacy code and instructions
- Bump `eslint-plugin-filenames` from 1.2.0 to 1.3.2
- Bump `babel-plugin-istanbul` from 5.1.4 to 5.2.0
- Bump `karma-chrome-launcher` from 2.2.0 to 3.1.0
- Bump `react` from 16.8.6 to 16.9.0
- Bump `@babel/polyfill` from 7.4.4 to 7.6.0
- Bump `cross-env` from 5.2.0 to 5.2.1
- Bump `fs-extra` from 3.0.1 to 8.1.0
- Bump `@storybook/addon-storyshots-puppeteer` from 5.1.9 to 5.1.11
- Bump `normalizr` from 3.2.4 to 3.4.1
- Bump `chownr` from 1.1.0 to 1.1.2
- Bump `eslint-plugin-import` from 2.17.3 to 2.18.2
- Bump `mocha-loader` from 2.0.1 to 3.0.0
- Bump `babel-eslint` from 10.0.2 to 10.0.3
- Bump `karma-coverage` from 1.1.2 to 2.0.1
- Bump `eslint-config-prettier` from 3.0.1 to 6.1.0

## Release 0.10.11

**Major Features**

- `Badges`: Add component
- `Expression`: Add component

**Minor Features**

- `ButtonGroup`: Add label support for all variants
- `ButtonStateful`: Add icon prop
- `Combobox`: Add header and footer items
- `MenuDropdown`: Add "center" `align` prop value
- `MenuDropdown`: Add tooltip menu item
- `MenuDropdown`: Add hover capabilities with keyboard interactions
- `Tooltip`: Add `hoverOpenDelay` prop

**Bugfixes**

- `Checkbox`: Fix error text ids
- `Tabs`: Use class name instead of presentation role for event conditional
- `TimePicker`: Fix issue with `strValue` not updating `value` correctly
- Fix all existing aXe issues

**Maintainance**

- Automate `package.json`, `index.js`, and `site-stories.js` creation
- `classnames` update from 2.2.5 to 2.2.6
- `sinon-chai` update from 2.14.0 to 3.3.0
- `fstream` update from 1.0.11 to 1.0.12
- `regenerator-runtime` update from 0.11.1 to 0.13.3
- `eslint-plugin-react` update from 7.13.0 to 7.14.3
- `react-onclickoutside` update from 6.8.0 to 6.9.0
- `chai` update from 4.1.2 to 4.2.0
- `file-loader` update from 1.1.11 to 4.2.0
- `basic-auth` update from 1.1.0 to 2.0.1
- `webpack` update from 4.36.1 to 4.39.3
- `@storybook/addon-storyshots` update from 5.1.10 to 5.1.11
- `eslint-config-prettier` update from 3.0.1 to 6.1.0
- `mixin-deep` update from 1.3.1 to 1.3.2 (security)

# Release 0.10.10

**Bug with release script caused this version to be skipped. Please use 0.10.11**

## Release 0.10.9

**Major Features**

- `Files`: Add new component

**Minor Features**

- `ScopedNotification`: Add icon prop

**Bugfixes**

- `Colorpicker`: Pass aXe static markup accessibility testing
- `ProgressBar`: Use `getId` for id instead of hard-coded strings
- `Tabs`: prevent panel children clicks from changing tabs at unexpected times
- `WelcomeMat`: Add `slds-welcome-mat_info-only` class to container
- Add additional context types to components with portals

**Documentation**

- `WelcomeMat`: update icons

**Maintainance**

- Upgrade to Storybook 5
- Add accessibility tests to continuous integration
- Prevent literal strings in component code
- Add React fragment rule
- `@babel/plugin-transform-modules-commonjs` update from 7.4.4 to 7.5.0
- `@storybook/addon-actions` update from 5.1.9 to 5.1.10
- `@storybook/addon-storyshots` update from 5.1.9 to 5.1.10

## Release 0.10.8

**Major Features**

- `WelcomeMat`: Add new component
- `Colorpicker`: Add right to left language support
- `Datepicker`: Add right to left language support
- `Dropdown`: Add right to left language support
- `Icon`: Add right to left language support

**Minor Features**

- `PageHeader`: Update markup
- `PageHeader`: Add support for custom icons
- `PageHeader`: Add support for `Breadcrumbs`
- `PageHeader`: Support joined styling with `DataTable`

**Bugfixes**

- `ProgressRing`: Fix for layout issue in IE11
- `Dialog`: Fix for "invalid prop `direction` of value `[object Object]` supplied
- `BuilderHeader`: Fix type
- Remove unneeded imports (fixing DeepScan issues)
- Update jest config to include all snapshots

**Documentation**

- Update `create-react-app.md`
- Update `CONTRIBUTING.md` readme to new Jest script process
- Update `release.md` readme

**Maintainance**

- Add Storybook stories to DOM, image, and a11y tests by default unless excluded
- Limit use of root `~` babel alias to example files
- Divide image snapshots into chunks, then remove them from standard tests (for now)
- `@salesforce-ux/design-system` update from 2.8.3 to 2.9.3 (SLDS)
- `@salesforce-ux/icons` update from 7.34.0 to 9.27.0
- `webpack-dev-middleware` update from 1.12.2 to 2.0.6
- `babel-loader` update from 8.0.0-beta.3 to 8.0.6
- `react-test-renderer` update from 16.4.2 to 16.8.6
- `warning` update from 3.0.0 to 4.0.3
- `eslint-loader` update from 1.9.0 to 2.1.2
- `enzyme-adapter-react-16` update from 1.12.1 to 1.14.0
- `karma-cli` update from 1.0.1 to 2.0.0
- `object.entries` update from 1.0.4 to 1.1.0
- `babel-eslint` update from 8.2.3 to 10.0.2
- `babel-plugin-instabul` update from 4.1.6 to 5.1.4
- `mocha` update from 3.5.3 to 6.1.4
- `react-onclickoutside` update from 6.7.1 to 6.8.0
- `react-highlighter` update from 0.4.2 to 0.4.3
- `express` update from 4.16.2 to 4.17.1

## Release 0.10.7

**Major Features**

- `VisualPicker`: Add new component
- `TrialBar`: Add new component
- `ProgressBar`: Add "vertical" `orientation` option

**Minor Features**

- Add snapshot testing to `Dropdown`, `Pill`, `ProgressRing`, `RadioGroup`, `RadioButtonGroup`, `Search`, `Slider`, `SplitView`, `Tabs`, `Textarea`, `Toast`, and `VerticalNavigation` components

**Bugfixes**

- `Button`: Pass form props to button DOM node
- `Carousel`: Alter styling to better match designs
- `Combobox`: ARIA attribute fixes
- `SetupAssistant`: Active theme now shown for `ProgressRing` at appropriate times
- `EditDialogPopover`: Now defined on site
- `ExpandableSection`: Add to `site-stories.js`
- `Checkbox` and `Radio`: Fix typo in `labels` prop
- Fixed issue with component paths that was causing build errors in some projects

**Documentation**

- `DatePicker`: Fix prop description typo
- `BuilderHeader`: Fix typo for `PropType` comment

**Maintainance**

- `@babel/parser` update from 7.4.4 to 7.4.5
- `enzyme` update from 3.9.0 to 3.10.0
- `react-text-truncate` update from 0.12.1 to 0.14.1
- `react-modal` update from 3.4.4 to 3.8.1
- `@babel/preset-env` update from 7.4.4 to 7.4.5
- `karma-coverage` update from 1.1.1 to 1.1.2
- `webpack-hot-middleware` update from 2.21.0 to 2.25.0
- `eslint-plugin-import` update from 2.17.2 to 2.17.3
- `eslint-plugin-json` update from 1.2.0 to 1.4.0
- `shortid` update from 2.2.8 to 2.2.14
- `concurrently` update from 4.0.1 to 4.1.0
- `lint-staged` update from 3.6.1 to 8.2.0
- `sinon` update from 2.4.1 to 4.5.0
- `compression` update from 1.7.1 to 1.7.4
- `tar` update from 2.2.1 to 2.2.2 (security)
- `extend` update from 3.0.1 to 3.0.2 (security)
- `sshpk` update from 1.13.0 to 1.16.1 (security)
- `stringstream` update from 0.0.5 to 0.0.6 (security)
- `tough-cookie` update from 2.3.2 to 2.3.4 (security)
- `is-my-json-valid` update from 2.17.1 to 2.20.0 (security)
- `macaddress` update from 0.2.8 to 0.2.9 (security)
- `merge` update from 1.2.0 to 1.2.1 (security)
- `react-dev-utils` update from 5.0.1 to 5.0.3 (security)

## Release 0.10.6

**Please use 0.10.7 instead as there was a bug in this release causing build errors in some projects**

## Release 0.10.5

**Major Features**

- `Setup Assistant`: Add Component

**Minor Features**

- `ProgressRing`: Add active theme
- `ButtonGroup`: Adds `list` variant
- `Modal`: Add `small` size support

**Bugfixes**

- Radio Group: Update labels from props after instance construction. Label and error label did not update after component is initialzied.
- `SetupAssistant`: Design review and red-lining of component such as padding, spacing, and borders.
- `ColorPicker`: Removes some differences between SLDS `ColorPicker` pattern and this library

**Documentation**

- Codebase: Add default prop change warning
- `SLDSAccordian`: 3 dropdowns in base whereas only 2 in base-open
- `Combobox`: Dialog variant documation site example fix

**Maintainance**

- Merge Radio Button Group and Radio Group, so that one is composed over the other.

## Release 0.10.4

**Major Features**

- `BuilderHeader`: Add component
- `Expandable Section`: Add component

**Minor Features**

- `ProgressRing`: Added `flowDirection` prop
- `Carousel`: Add Mocha tests
- `Carousel`: Add props to allow controlled component
- `Carousel`: Align design closer to SLDS and update non-SLDS design
- `ProgressIndicator`: Adds `setup-assistant` variant
- `Modal`: Refactor `border-radius` render logic based on header and footer
- `GlobalNavigation`: Align closer to SLDS
- `AppLauncher`: Align closer to SLDS

**Bugfixes**

- `Carousel`: Prevent focus grab when slide changes
- `DataTable`: Fixed header scrolling bugfix when `tab` is used
- `Illustration`: Minor bugfix for `style` object

**Maintainance**

- Add a Gitter chat badge to `README.md`
- Fix accessibility issues in doc site examples
- `GlobalNavigation`: Add a11y exception to region
- Sync up the `package-lock.json` file

## Release 0.10.3

**Major Features**

- `ProgressBar`: Add Component
- `ScopedNotification`: Add Component
- `DynamicIcon`: Add Component
- `Popover`: Add `edit-dialog` variant

**Minor Features**

- `Dropdown`: Add menu width prop
- `DatePicker`: Triggers a console warning on using default parser
- `PageHeader`: Remove all caps heading

**Bugfixes**

- Modal: fix error with dismissModalOnClickOutside
- Tree Buttons: Adds `aria-hidden=true` to align with SLDS
- Accordion: Add event parameter in example code
- Update Popover to use `section` tag

**Maintainance**

- Rename prop `title` to `heading` in Modal
- Update `PageHeader` prop `variant` to accept kebab-case and otherwise show deprecation warning
- Button Stateful: Changes background color to make the text more legible
- Alert: Adds padding to story container to prevent overlap
- AppLauncher: Changes icon text in tile to be consistent with heading
- Progress Indicator: Adds `vertical` variant to docsite examples
- Button: Add `outline-brand` variant to doc site examples
- Deprecate custom content for Dropdown component
- Add Icon Container assistive text in example

## Release 0.10.2

**Bugfixes**

- `Carousel`: `Button` import path was incorrect. Resulting in a `Error: Can't resolve '../../../../components/button'` message

## Release 0.10.1

**Bugfixes**

- `Carousel`: `Button` import path was incorrect. Resulting in a `Error: Can't resolve '../../../../components/button'` message

**Maintainance**

- `Carousel`: Add `isPrototype` warning
- `Dropdown`: Add `sunsetProperty` for `tooltip` prop

## Release 0.10.0

It has been more than a year since the release of React 16. With the release of v0.10, React 16.3 or later is required to consume this library. Features are present in the library now that are React v16 only.

**Major Features**

- `Carousel`: In addition, to the SLDS one-panel blueprint. This component adds a non-SLDS three-item panel option for use on product home pages to aid in user on-boarding.
- `Combobox`: Adds Dialog variant. This allows “custom menus” such as checkboxes and other form elements to determine the input value.
- `Popover`: Walkthrough and Walkthrough Action variants were added. Along with this, Popover now allows custom targets which is helpful in feature highlighting and other user engagement stories. Use `onRequestTargetElement` to set a custom target.
- `GlobalHeader``: Align markup and latest UX pattern to SLDS
- Remove all caps text from all components
- Progress Indicator: Add vertical orientation

**Minor Features**

- `Tooltip`: Add dialog `className` prop
- `Button`: Add `outline-brand` variant
- `Avatar`: Add `inverse` variant
- `Card`: Add `hasNoHeader` prop to remove header
- `PillContainer`: Return null if options is empty
- `Spinner`: Adds `isDelayed` prop to component

**Bugfixes**

- `Combobox`: Cancel mouseDown bubble from listbox div tag in order to help not trigger onBlur when uses clicks menu scrollbar
- `Popover`: Change ARIA role to `dialog`
- `ButtonStateful`: Use prevState to update state in component
- `Input`: Remove always true condition, 'props.hasSpinner'
- `Input`: Update error icon from warning icon to error icon
- `Tree`: Adds unneeded `aria-hidden=true` to closer align with SLDS markup
- `Popover`: Change ARIA `role` to `dialog`
- `ProgressRing`: Fixe examples page
- `AppLauncher`: Fixes arrow direction in Sections

**Maintainance**

- Require React >16.3
- Add snapshot update npm command
- `Toast`: Use role='status'
- Add instructions to set up LDSR with Create React App 2.x
- Removed propTypes which are not used from different components
- `Modal`: Replace `dismissible` with `disableClose` in
- `Button`: Fix assistive text in small icon hint inverse example
- `Alert`: Add ability for example to close
- `Combobox`: Update `menuItem` to `onRenderMenuItem`
- `Vertical Navigation`: Remove `shade` variant
- Move storyshot DOM snapshots to individual files
- Remove unused variables from tests
- Support React fragment syntax
- Update to SLDS 2.8.x
- Improve docs for codebase-overview.md and CONTRIBUTING.md
- `Button` Examples: Update function call for "Outline brand button" story
- `GlobalNavigationBar`: Remove overlapping items from example
- `Lookup`: Add visual deprecation heading to component

## Release 0.10.0

It has been more than a year since the release of React 16. With the release of v0.10, **React 16.3 or later is required** to consume this library. Features are present in the library now that are React v16 only.

**Major Features**

- `Carousel`: In addition, to the SLDS one-panel blueprint. This component adds a non-SLDS three-item panel option for use on product home pages to aid in user on-boarding.
- `Combobox`: Adds Dialog variant. This allows “custom menus” such as checkboxes and other form elements to determine the input value.
- `Popover`: Walkthrough and Walkthrough Action variants were added. Along with this, Popover now allows custom targets which is helpful in feature highlighting and other user engagement stories. Use `onRequestTargetElement` to set a custom target.
- `GlobalHeader``: Align markup and latest UX pattern to SLDS
- Remove all caps text from all components
- `ProgressIndicator`: Add vertical orientation

**Minor Features**

- `Tooltip`: Add dialog `className` prop
- `Button`: Add `outline-brand` variant
- `Avatar`: Add `inverse` variant
- `Card`: Add `hasNoHeader` prop to remove header
- `PillContainer`: Return null if options is empty
- `Spinner`: Adds `isDelayed` prop to component

**Bugfixes**

- `Combobox`: Cancel mouseDown bubble from listbox div tag in order to help not trigger onBlur when uses clicks menu scrollbar
- `Popover`: Change ARIA role to `dialog`
- `ButtonStateful`: Use prevState to update state in component
- `Input`: Remove always true condition, 'props.hasSpinner'
- `Input`: Update error icon from warning icon to error icon
- `Tree`: Adds unneeded `aria-hidden=true` to closer align with SLDS markup
- `Popover`: Change ARIA `role` to `dialog`
- `ProgressRing`: Fixe examples page
- `AppLauncher`: Fixes arrow direction in Sections

**Maintainance**

- Require React >16.3
- Add snapshot update npm command
- `Toast`: Use role='status'
- Add instructions to set up LDSR with Create React App 2.x
- Removed propTypes which are not used from different components
- `Modal`: Replace `dismissible` with `disableClose` in
- `Button`: Fix assistive text in small icon hint inverse example
- `Alert`: Add ability for example to close
- `Combobox`: Update `menuItem` to `onRenderMenuItem`
- `Vertical Navigation`: Remove `shade` variant
- Move storyshot DOM snapshots to individual files
- Remove unused variables from tests
- Support React fragment syntax
- Update to SLDS 2.8.x
- Improve docs for codebase-overview.md and CONTRIBUTING.md
- `Button` Examples: Update function call for "Outline brand button" story
- `GlobalNavigationBar`: Remove overlapping items from example
- `Lookup`: Add visual deprecation heading to component

## Release 0.9.6

**Minor Features**

- `Popover`: Add `error` and `warning` variants
- `DataTable`: Add `isDefaultSortDescending` prop to allow descending as first time sort direction
- `Combobox`: Add `disabled` prop to readonly and inline-listbox variants
- `PillContainer`: Return null if options is empty
- `Input`: Add `autoComplete` prop. (Newer versions of Chrome browser ignore `autocomplete="off"`).
- `Combobox`: Add `Input` prop on in order to expose all `Input` props within `Combobox`

**Bugfixes**

- `BrandBand`: Lightning Theme Fix - Styles were intermittently applied before
- `DataTable`: Add missing top gray border to fixed header tables
- `IconSettings`: Add additional inheritance of context for `overflowBoundaryElement` Dialog position which uses portals.
- `Input`: Update error icon from warning icon to error icon
- `Input`: Prevent `PropTypes` warning in `forms/private/label` when `label` prop contains a React `node`

**Maintainance**

- Update Brand Band documentation: Depending on your server settings, you may get this error due to stye injection and may want to directly add styles to your CSS file.
- Update `README.md` to run install command in right directory
- Datepicker: Clarify MomentJS usage in props/docs
- Add ESLINT skipBlankLines/skipComments max lines rule
- Combobox: Give each Storybook example a unique ID
- Define pull request expectations in more detail
- Document how to release a tag on a fork
- Add how to release a tag to 1st time PR bot
- Correct Typos in Contributor's Guidelines
- Improve docs for codebase-overview.md and CONTRIBUTING.md
- Remove non-breaking text from Tooltip Storybook examples
- Contributing docs: Add mention of adding new components to `package.json`

## Release 0.9.5

**Minor Features**

- Combobox: Allow disabled menu items and disabled menu items with Tooltips
- Input: Add `styleContainer` prop
- ProgressIndicator: `tooltipPosition` prop added to allow additional positioning logic
- Dropdown: `length` prop now allows numbers

**Bugfixes**

- BrandBand: Lightning Theme CSS injection was intermittantly working.
- Dropdown: Adds `aria-checked` and role="menuitemcheckbox" for selectable menus with checkmarks

**Maintainance**

- Warnings removed from snapshot tests and 404s from browser Mocha tests. "CI is now prettier."
- Add first time contributor survey to allow additional feedback to library maintainers.
- Imports additional examples from doc site examples that did not exist in Storybook

## Release 0.9.4

**Minor Features**

- `PageHeader`: Allow actions in Base variant with support of `navRight`
- `Combobox`: Add field-level tooltip with `fieldLevelHelpTooltip` prop on `input` prop. Deprecate `Combobox`'s `assistiveText.fieldLevelHelpButton` in favor of using `input` prop's prop. See [#1689](https://github.com/salesforce/design-system-react/pull/1689) for more details. You will see a console warning if you are doing it wrong.
- `Tooltip`: Require `onClickTrigger` for learn more pattern
  - If `learnMore` Tooltip variant is used without `onClickTrigger`, then the “no click” basic info icon tooltip will be used with a “disabled” button.
  - If `onClickTrigger` is defined, a link will be rendered (this is the current behavior for learn more tooltips).
- Add `AppLauncher` `Tile` and `Section` components to main module export to allow use in CommonJS build.

**Bugfixes**

- `DataTable`: A UX pattern of Radio Group / Single Select with a Fixed Header works now.

**Documentation**

- `Combobox`: Site examples now have unique id's
- Re-organize [Codebase Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md)
- Add maximum lines in a file lint rule of 500

## Release 0.9.3

**Bugfixes**

- `DataTable`: Adds event listeners to listen for window resize by default. This creates a behavior that truncates horizontal cells and is similar to how a `DataTable` on the Salesforce Platform works.

## Release 0.9.2

**Major Features**

- `DataTable` supports fixed headers and this allows the table headings to be visible while the table vertically scrolls.

## Release 0.9.1

**Notes**

- Tree `nodes` are now compared with node `id` key instead of object compare when using keyboard events
- Testing suite runs on Windows now to enable contributions from Windows users. Use `git-bash`, please--no Powershell.

**Major Features**

- **Pill Container:** Add [Listbox of Pill Options](https://www.lightningdesignsystem.com/components/pills/) component. Previously `Pill` components used in a group were not accessible. This component creates a pillbox or group option. Isoloated `Pill` component is still present, but should not be used for user input/selection.
- **Input Counter:** Add [Counter](https://www.lightningdesignsystem.com/components/input/) Example. This is useful for number input.

**Minor Features**

- **Combobox (Read-Only / Picklist):** Add "press a letter to scroll to an option" (similar to HTML `select` behavior)
- **Combobox (Read-Only / Picklist):** Add auto-scroll behavior on keyboard menu item selection (similar to HTML `select` behavior)
- **Combobox filter):** Make combobox filtering more performant by not creating RegExp in a loop
- **Combobox (filter):** Remove selected options based on `option.id` only
- **Input Counter:** Disable increment/decrement buttons when min/max is hit
- **Datepicker:** Add `input` render prop for Input customization

**Bugfixes**

- **Tree:** Compare cached flattened nodes with id key
- **Illustration:** Remove `<title>`
- **Input:** `inlineHelpText` can be `node` as well as `string` proptype update.
- **Combobox/PillContainer:** Pill aria-selected state is always true
- **Combobox/PillContainer:** Tab propagation bug introduced with menu letter jump feature
- **DataTable:** Update `stackedHorizontal` class name
- **Tooltip:** Do not console error `isTriggerTabbable` if no children of tooltip.
- **Toast:** Clear duration timeout in `componentWillUnmount()` to avoid memory leaks
- **DataTable:** Generates row `id` if none is present

**Maintenance**

- **Contributor Productivity:** Enable test suite on Windows and run tests concurrently by default. This update allows entire testing suite (500+ browser tests, 320+ snapshot DOM/images, prop comment validation, Prettier style, ESlint code quality) to run in less than 2 minute on most machines. This pull request also aligns npm script names. Please use `npm run` to view new names.
- **Contributor Productivity:** Replace PhantomJS with Headless Chrome (also speeds up browser tests slightly)

## Release 0.9.0

**Major Features**

- Update CSS class names so that they align with the modified-BEM structure that [Salesforce Lightning Design System](https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_lds.htm) switched to in June 2017. These changes are were promised to be backwards compatible for 18 months.\*\* . (In short, the `className` contains `--` instead of `_` now).

**Minor Features**

- Input: Add `styleInput` prop
- Radio: Add `ref`, `data` attribute, and `className` props
- Toast: Add `style` prop
- Alert: Add `style` prop
- Tooltip: Align "learn more" variant with SLDS
- Allow SLDS Token import for inline styles
- Allow Storybook (`npm start`) on Windows 10
- Vertical Navigation: Update SLDS markup/classes

**Bugfixes**

- Popover (all dialogs): Prevent scroll to bottom on focus in dialogs
- DataTable: Update `stackedHorizontal` class name
- Dialog: Remove isNaN gaurds since ‘inherit’ is not a number
- Page header: Details not truncating
- Page header: Align Media Objects and header text
- Adding missing `docs.json` to some components

**Maintenance and Documentation**

- Clarify new component contribution section
- Convert `createReactClass` components to ES6 Classes
- Move keyboard navigate mixin into picklist (deprecated)
- Remove some unneeded dependencies
- Fix typo in `Spinner` example
- Update prettier CI command to fail on style issues
- Fix lint errors

## Release 0.8.28

**Major Features**

- Adds [Color Picker](https://www.lightningdesignsystem.com/components/color-picker/)

## Release 0.8.27

This version reverts CSS class changes in 0.8.26 that align with the modified-BEM structure that [Salesforce Lightning Design System](https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_lds.htm) switched to in June 2017. These changes are were promised to be backwards compatible for 18 months.\*\* .

Please use the upcoming 0.9.x for components that use the modified BEM (that is the `className` contains `--` instead of `_`).

## Release 0.8.26

**Bugfixes**

- Fixes DataTable fixed layout width prop issue

- Do not dismiss combobox lookup menu when clicking on menu scrollbar

**Minor Features**

- Adds additional helpful instruction for the pr template

**Maintenance**

- Converts Dropdown to ES6 class

- Removes find dom node from Dropdown

- Creates local ESLint plugin and rule to disallow double-dash (`--`) modifier class names

- Makes eslint plugin for SLDS external

- Removes Mocha console errors

## Release 0.8.25

**Minor Features**

- `onRequestIconPath` added to `IconSettings` to allow developers to return a custom icon path--for instance, on the same page with a local anchor (`#down`). This is helpful for when there are Cross-Origin Resource Sharing (CORS) issues with SVGs that are located on another domain such as a CDN.

**Bugfixes**

- Brand Band not exported in CJS/ESM packages

## Release 0.8.24

**Bugfixes**

- Missing `docs.json` for each component added to build. Component meta data is now stored with each component folder in `docs.json`. This library's release script was not copying the new file which makes all components imports fail.

## Release 0.8.23

**Do not use 0.8.23.**

**Major Features**

- Adds new `BrandBrand` component

**Minor Features**

- Adds new `style` prop to `Button` component
- Allows passing node as avatar in `GlobalHeaderProfile`

**Bugfixes**

- Fixes popper position when its props update in `Dialog` components
- Replaces `Tooltip` with `PopoverTooltip` internally

**Maintenance**

- Removes `prettier-eslint`
- Allows linking to doc site from dev console warning messages
- Improves instructions on adding a new component to DSR

## Release 0.8.22

**Bugfixes**

- Fixes v0.8.21 CommonJS/ES6 module versions of this library which had an undefined error that is a high priority blocker. See 0.8.21 release tag for more details on the bug.

## Release 0.8.21

- DataTable's `onChange` replaced with `onRowChange`. `onChange`'s parameters are `(selectedArrayOfItems, event)`. `onRowChange` standardizes the parameters with the rest of the library with `event, { selection:[array] }`.

**Minor Features**

- Input: Add Field Level Help and Inline Help variants
- Icon: Add Warning, error, light color options
- Modal: Add additional warning when `Settings.setAppElement` is not set.
- AppLauncher: Add to CommonJS and ES6 module library export
- Add Spinner to doc site

**Bugfixes**

- Progress Indicator: Improved assistive tech user experience
- DatePicker: Fixing issue where year picker doesn't show years correctly
- GlobalHeaderButton: Invalid markup fixed when used within GlobalHeaderTrigger
- Tree: Allow label to be a React node (more lenient proptypes)
- Positioning behavior of Dialog components that use nubbins has changed. This applies to `Popover`, `Tooltip`, `Datepicker`, `Dropdown`. Previously the nubbin would be misaligned due to hardcoded margins that would get added onto the dialog component. It will now instead calculate the offsets and include them in the positioning logic and add/subtract from the left and top.
- Dialogs that use nubbins would previously have the nubbins point at the location on the reference trigger component (i.e. `Button`). Details:
  - If a Popover had an align of `top left`, that meant the nubbin would point at the top left hand side of the `Button`.
  - The behavior now is that the nubbin will always position the Dialog element as needed to ensure it points at the center of the desired side.
  - In the case of a `top left` align the left will only designate the location of the nubbin on the Dialog.
  - We may decide to bring back the ability to control both the nubbin location on the Dialog, but also the location at which it points to on the reference element. Much of the logic surrounding nubbins has been broken at the seams and edge cases for a long time. This change has been done in order to provide a more robust and dependable solution.
  - Any dialog that uses an `offset` prop will need to be manually readjusted.
  - Deprecate `offset` prop for `Dropdown` and `Popover`. The manual setting of positional offset of dialog components has been deemed unreliable. Position logic has been re-written to deliver better and more reliable positioning. Please create an issue if you have an edge case not covered by the built-in logic.

**Maintenance and documenation**

- Move `Navigation` to `VerticalNavigation` to align with SLDS.
- Dropdown: Document that default menu height is 5
- Datepicker: Increase default years, 5 to 10 years
- Add warnings to `bread-crumb`, `forms/input`, `forms/radio`, `forms/textarea`, `navigation`, `popover-tooltip` to show that they have been moved. Warning only occurs when using source code files `import [COMPONENT] from`design-system-react/components/[COMPONENT]`
- Modal: Deprecate rarely used Trigger Portal found at `/components/modal/trigger`
- Combobox: Clarify prop docs
- Update react-doc-gen version
- Tree: Move to one render function and proptype object per file
- Add url-slug to package.json components, Makes prompt easier to find
- Update SLDS site URLs for doc site
- Add NPM babel preset `package.json`
- Prefer object spread instead of `object.assign` eslint rule
- Revert to `npm install` from `npm ci` due to TravisCI issues

## Release 0.8.20

**Bugfixes**

- Fix bug in `Dropdown` component where getIndexByValue() needs to look at nextProps.options when componentWillreceiveProps() is called.
- Datepicker: Make year Combobox menu width match the width of its input/button.

**Maintenance**

- Documentation update on how to use Design System React within Create React App.
- Consolidate assistiveText props under one object for the following: `DataTable`, `Icon`, `Search`, `PanelFilterGroup`, `Spinner`, `Tree`, `TextArea`.

## Release 0.8.19

**Major Features**

- Add Illustration Component

**Bugfixes**

- Make `Slider` a controlled component. Use `value` and `onChange` props.
- `Combobox`: Allow PopperJS to position menu correctly when menu hits the screen or overflow ancestor boundary.
- Update `Tree` branch and item to use latest SLDS HTML tags
- Update `Alert` error icon

**Maintenance**

- Add `getting-started.md` to NPM module
- Document copying over SLDS fonts to public for Create React App
- Update `Radio` component examples
- Remove `Object.assign()` from codebase and replace with spread
- Consolidate `assistiveText` props under one object. This is going to deprecate many props, but will make props more consistent across all the components.
  - `AppLauncherSection`
  - `Avatar`
  - `Breadcrumb`
  - `ButtonStateful`
  - `Button`
  - `GlobalHeader`
  - `GlobalNavigationBarDropdown`

## Release 0.8.18

**Bugfixes**

- `Icon` uses new values for `name` and `category` when changed.
- Fixes console error that appears when using keyboard navigation to navigate the tree.

**Maintenance**

- `url-exists` utility uses `fetch` instead of `xmlHttpRequest`.

## Release 0.8.17

**Bugfixes**

- REVERT [Change inline edit for accessibility](https://github.com/salesforce/design-system-react/pull/1332). It will not be updated. There is a new View/Edit Record Input pattern that uses the [Docked Former Footer component](http://www.lightningdesignsystem.com/components/docked-form-footer/) and this should be used instead of the Inline Edit Input in the future.

**Minor features**

- `dropdown` prop added to `DataTableRowActions` to increase customization of the dropdown menu
- `tabIndex` added to `MenuDropdown` component
- `Picklist` has been removed from examples. Please use a Combobox instead.

## Release 0.8.16

**Deprecation**
TL:DR; If you use the source code directly, update your form component paths and the parameters in `onChange`. All others stay the same for now.

- Moves `Input`, `Checkbox`, and `Textarea` out of `component/forms` and directly into `component/`. Old paths such as `component/forms/input` will still work, but include a console warning as deprecated.
- `components/input`, `components/checkbox`, and `components/textarea` pass different parameters into the `onChange` callback. `onChange` now passes in `event, { checked }` if the new paths are used. The parameters used to be `checked, event, { checked }`. If you use the new paths such as `components/input`, please update your parameter variables. This aligns the callback's parameters with the rest of the library's callback functions.
- If you consume the library with named imports `{[component]} from '@salesforce/design-system-react'`, you will recieve the warning and will need to use the old parameter order until the next breaking change.
- For more information, please review #1350.

**Minor features**

- Update `Tree` example to be hashmap in order to promote immutability. Please review `Tree` example on [documentation site](http://react.lightningdesignsystem.com/components/tree/) in order to understand flattened tree data.
- Add `tabIndex` prop to `MenuDropdown`
- Update SLDS version to 2.6.0 and test

**Bug fix**

- Dialog components such as Dropdown when used with `menuPosition='overflowBoundaryElement'` now respect `max-width` instead of inherited children width
- Remove duplicate logo in `GlobalHeader`

**Maintenance**

- Upgrade Babel to v7 and Jest to v23

**Documentation**

- Remove deprecated Picklist from code base and examples

## Release 0.8.15

**Modals are now at `z-index: 8000`.** If there are items on the main page with a higher `z-index`, they will appear in front of the modal. This setting aligns with the [prescribed z-index in SLDS](https://www.lightningdesignsystem.com/design-tokens/#category-z-index) for `$z-index-overlay`.
**Require `iconCategory` if `iconName` is set.** `utility` used to be the default icon category. `iconCategory` is now required.

**Major features**

- `@salesforce/design-system-react/module` now contains tree-shaking compatible ES6 modules (Tested with Webpack 4). This should work out of the box (due to `package.json`'s `module` field) and replace CommonJS module usage in Webpack 3 and 4. See [pull request](https://github.com/salesforce/design-system-react/pull/1300) for more details.
- Tree is now a production component and supports [single selection keyboard navigation](https://www.lightningdesignsystem.com/components/trees/).

**Minor features**

- DataTable: Align header markup with SLDS to fix alignment issues. Remove error for non-boolean attribute `focusable`.
- Upgrade React Modal to 3.4.4. This is a dependency of `Modal`.
- Modal: Adds `assistiveText.dialogLabel` to define modal label when there is no header.
- DataTable: Adds `noHint` prop to actions and makes hints an optional field.

**Bug fix**

- Request icons (console warning) with HTTP GET, so Create React App's webpack dev server doesn't 404
- Modal no longer jumps to 50% of page.
- Documentation: Align button group example on site with SLDS example
- Documentation site examples are more accessible (Page Headers and Stateful Buttons)
- Datepicker: Change the year picklist initial focus to currently selected year
- Datepicker: Focus input only if menu was previously open and not just requested to close
- Inline Edit UX pattern updated for keyboard: New pattern is that it'll tab to the close button, and if you're focused on the close button and tab again, it'll blur the field.
- `Dropdown` with `overflowBoundaryElement` and `align=right` use max-width instead of inherited children width.

**Maintenance**

- Require `iconCategory` if `iconName` is set. `utility` used to be the default icon category. `iconCategory` is now required.
- App Launcher - `assistiveText` is now an object with keys. Please update your component props.
- Popover - `assistiveText` is now an object with keys. Please update your component props.
- Modal - `assistiveText` is now an object with keys. Please update your component props.
- NPM scripts update: “build-storybook" -> static:build, “build-storybook-for-tests” -> storyshots:build, “storybook” -> static:start
- Switch `xml2json` to `xml2js` in tooling to make more compatible with Windows

Adds new script storyshots:start that allows interactive viewing of what is being tested with image snapshots to allow debugging.

## Release 0.8.14

**Minor features**

- Tooltip: "Learn more" variant added. Deprecation notice added for `variant: info || error`. Please use `theme` prop going forward instead.

**Bug fix**

- Data Table: Remove console warning when DataTableColumn `sortable` is `true`.
- Combobox: Trigger onOpen callback when menu opens
- Datepicker: Focus input if menu was actually open and not just requested to close

## Release 0.8.13

**Major features**

- Add SLDS Slider

**Minor features**

- Allow importing Lookup [deprecated] subcomponents in CommonJS modules

## Release 0.8.12

**Minor features**

- Affix position of Dialogs with `hasStaticAlignment` prop. Allows greater control of Tooltip, Popover, and dialog components.
- Set Datepicker's initial year dropdown menu highlight selection to current selected date.

## Release 0.8.11

**Minor features**

- Allow `input` label of combobox to show as required
- Input, Checkbox, and Radio support initial state (uncontrolled) in order to support applications with server-side form submission that are transitioning to atomic state.

**Maintenance**

- Lint warnings from a third-party package have been removed from CI tests.

**Documentation**

- Prop doc typos:
  - replaced rendered input block to code block
  - fixed broken link to source of Inline Edit Inputs

## Release 0.8.10

**Minor features**

- Combobox supports error messages.

**Outside SLDS pattern added**

- Multiple selection Combobox error messages should be placed after pillboxes with an additional `slds-has-error` wrapping div.

**Maintenance**

- Update Dropdown Menu children description
- Update SLDS peer dependency to allow 2.6.0-alphas
- Remove plus-plus (`var++`) instances from library for clarity

**Notice**
`package.module` has been removed from the NPM module until a transpiled ES6 module build can be published to support it. The current `package.module` is considered broken already for Create React Apps--for instance, so this is not considered a breaking change. Your module bundler will just use the CommonJS build unless you are already transpiling the source code, so no changes should be need to be made.

## Release 0.8.9

**Minor features**

- Combobox menu supports subheadings and line separators.

**Outside SLDS pattern added**

- UX pattern created for Combobox autocomplete that limits subheadings to those that have "child" matching items.

## Release 0.8.8

**Bugfix**

- Export `canUseDOM` correctly to enable focus trap. This bug is present in `>=0.8.0` versions. Upgrading to `0.8.8` is recommended for `Popover` and other components to be accessible.

**Maintenance**

- Replace Airbnb shape props with 1PropTypes.shape1
- Add Prettier linting to JSON, Add JSON parser plugin to eslint
- Converts `package.json` to tabs
- Troubleshoots `npm run lint:fix`
- Implement Import first ESlint rule to increase code consistency

**Documentatation**

- Add missing documentation site component descriptions
- Document child nodes of `IconSettings`
- Update `Modal` footer prop description

## Release 0.8.7

**Bugfix**

- Revert Modal CSS class `slds-fade-in-open`

**Maintenance**

- Add NPM package-lock
- Clarify lint scripts
- Kabob-case filename check
- Fix typos in webpack docs
- Remove JSX curly braces when not needed
- Add Trailing comma to iterables
- Updates dev node engine version to 8.x

## Release 0.8.6

**Major features**

- Add automated image and DOM snapshots with story-based automatic unit test creation

**Bugfix**

- Remove MenuDropdown console error

**Maintenance**

- Run React codemod transform component to ES6 classes
- Improve dev experience by removing pre-commit hooks, loosening ESlint rules until issues can be fixed, audit and add clarity to npm tasks, adding clarity to test scripts

## Release 0.8.5

**Major features**

- Add `SplitView` component

**Bugfix**

- Remove timeout/setState warning on `Modal`
- Polyfill `Combobox` with `lodash.findIndex`
- Fix getDefaultProps warning in `Tree`

**Maintenance**

- Add Babel preset

## Release 0.8.4

**Bugfix**

- `Icon` not present in NPM module due to gitignore's EMACS settings.

## Release 0.8.3

**Bugfix**

- Fix Lookup due to `Dialog` upgrade to PopperJS.

## Release 0.8.2

**Maintenance**

- Update Babel settings and publish to NPM.

## Release 0.8.1

**Major features**

- Add Pill Component

**Bugfix**

- Removed `setState` call when handling click to set `active` property. This was causing some `setState` issues on when unmounting `Button`.
- Add `title` attribute to truncated `Tree` nodes

**Maintenance**

- Introduction of `npm run format` command to run prettier and ESlint. Update to ESlint settings.

## Release 0.8.0

**Major features**

- Add Progress Ring Component
- Make icons settings webpack friendly. Allows sprite file strings to be imported.

**Maintenance**

- Group like files: Move all component files into same folder to make library more modular
- Remove node engine version from published package
- Improve documentation: Usage with webpack

## Release 0.7.3

**Minor features**

- Custom menu items renders are available with `menuItem` prop for Combobox.

## Release 0.7.2

**Major features**

- Add [Accordion](https://design-system-react.herokuapp.com/components/accordions/) component
- Add [Alert](https://design-system-react.herokuapp.com/components/alerts/) component
- Add [Toast](https://design-system-react.herokuapp.com/components/toasts/) component

**Bugfix Changes**

- Initial state of DataTable sort is null, unless prop is passed. Before this fix, columns appear to be ascending and descending only and toggle between those two based on the previous direction. You can now have an unsorted third option, so you can go have an unsorted sortable column and go from unsorted -> asc -> desc. `isSorted` and `sortDirection` are both required if you are sorting a column. See #1163 for more background.
- Removes the warnings that always show when using a Progress Indicator. Tooltip trigger is now on the button instead of the `li` tag.

**Maintenance**

- Lookup, Picklist, and Notification are deprecated. These are deprecated components with deprecation warnings. Deprecated components will be present for at least one major Salesforce release (not this library) after the current release cycle and may remain longer. Please refer to source code for prop descriptions in the future. Please transition:
  - Lookup -> Autocomplete (base) Combobox
  - Picklist -> Read-only (base) Combobox
  - Notification -> Alert or Toast
- Removes `forceUpdate` from Tree example
- Update Modal examples
- Add `parentSelector` use description to Modal
- Add HTML avatar snapshots
- Fix combobox example use of `placeholderReadOnly`

## Release 0.7.1

- Allow inline icons and `icon` prop data passed directly in to work properly again.
- Rename internal constant bugs having to do with component names
- Pass `assistiveText` from MenuDropdown to trigger button
- Replace `classname` with `classnameContainer` on TextArea container
- Clarify test readme

## Release 0.7.0

###Breaking Changes###

1. **Icons removed which brings DSR from 749KB down to somewhere around 430KB**

- Icon JS objects have been removed except for the original `design-system-react.js` bundle. An additional bundle has been added `design-system-react-components.js` without bundled icons. See readme for use of `<IconSettings/>` to set icon context.
- Devs now need to do two things if they're not using DSR with icons: - You need to host your own icons (`npm install @salesforce-ux/icons` OR download them from SLDS website: https://core-210.lightningdesignsystem.com/downloads) - You'll need to use the `<IconSettings />` higher order component and pass in the path to where you are hosting your own icons. It might look something like this:

```
import IconSettings from 'design-system-react/components/icon-settings';

ReactDOM.render(
  <IconSettings iconPath="/assets/icons">
    <MyApp />
  </IconSettings>,
  document.getElementById('app')
)

# This component can be wrapped around the entire app and/or individual components using Icons.
```

2. Removed disabled styles from Tabs however you can still disable the Tab, and aria-disabled still appears on the Tab `<a>`. You'll just need to provide your own css for styling it.

###Other Changes###

- All CommonJS's `module.exports` have been removed.
- Some initial compatibility testing with React 16 has been completed, but library is not fully tested.
- Added `type="button"` to `Button` as default (markup change).
- Added [SLDS Avatar](https://latest-212.lightningdesignsystem.com/components/avatar)
- Lookup Prop
  - Added new props isOpen, onRequestOpen, and onRequestClose to Lookup.
- Dropdown Prop
  - Added new prop `disabled` to Menu Item which gets passed to `aria-disabled` on `role="option"`. Pass it down through options like so:

```
<MenuDropdown
    options={[
        { disabled: true, label: 'Option A', value: 'A0' },
        { label: 'Option B', value: 'B0' },
        { label: 'Custom Class', className: 'custom-item-class', value: 'custom0' }
    ]}
    ...
/>
```

## Release 0.6.23

**Major features**

- Add [Combobox](https://react.lightningdesignsystem.com/components/comboboxes/) component

## Release 0.6.22

**Major features**

- Add [RadioButtonGroup](https://react.lightningdesignsystem.com/components/radio-button-groups/) component

**Minor features**

- Picklist with multiselect: Add onPillRemove
- Inline edit: Add onEnterEditMode, onLeaveEditMode, onKeyUp (for input)

**Bugfix**

- Fix Popover focus trap
- Lookup: Close on tab and pass list ref with guard

## Release 0.6.21

**Bugfix Changes**

- Allow Button Icon to accept external path for Icon

## Release 0.6.20

**Minor Changes**

- Lookup: Add `onFocus` callback
- Notification: Add icon category prop

**Bugfix Changes**

- Update Webpack loader for Tab CSS
- Notification: `ref` to the Button component returned an object and now returns DOM node.
- Popover: Update close button style

## Release 0.6.19

**Bugfix Changes**

- DataTable: Change child component (action row) validation to use `displayName` instead of type/function compare.

## Release 0.6.18

**Bugfix Changes**

- DataTable: Change child component validation to use `displayName` instead of type/function compare.

## Release 0.6.17

**Minor Changes**

- Add Progress Indicator

**Bugfix Changes**

- Remove occurrence of assistiveText prop from ButtonIcon. ButtonStateful creates a ButtonIcon with assistiveText. Change this so that the assistiveText is put in this component.
- Allow variable type of `node` in dropdown menu label

## Release 0.6.16

**Bugfix Changes**

- Add react-onclickoutside events to Lookup to prevent scrollbar from closing the menu

## Release 0.6.15

**Minor Changes**

- Adds Multiselect Dropdown variant

**Bugfix Changes**

- Fix datepicker input value bug

## Release 0.6.14

**Minor Changes**

- Adds Textarea component

**Bugfix Changes**

- Fix icon when tree branch is expanded

## Release 0.6.13

**Bugfix Changes**

- Picklist child component Pill had a bad import that was only discoverable in production.

## Release 0.6.12

**Minor Changes**

- Add Multiselect Picklist variant (Pills paired with Picklist)

**Maintenance**

- Update package.json dependencies
- Switches to newest Heroku stack for deployment pipeline.
- Fixes missing icons on Heroku PR apps.
- Updates Jest and snapshots
- Updates sinon and sinon-chai
- Removes babel-eslint as a dependency

## Release 0.6.11

**Minor Changes**

- Update inline icons to v7.20.0

## Release 0.6.10

**Minor Changes**

- Move icons repository to looser major version. This should keep the SLDS website and the inline JS icons within this library in-sync with each other better.
- Fix app launcher button markup and testing code
- Allow non-strings in tree item labels (such as icons elements)

**MAINTENANCE**

- Release process updated
- Lint errors removed from production code
- Fix Lookup Item style bug
- Update test command to prevent false positives in TravisCI

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

- `Datepicker` has a `dateDisabled` callback to allow disabling of arbitrary dates.
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

- Documentation site updates. _No production code changes in this release_.

## Release 0.6.0

**MAJOR CHANGES**

- Datepicker updates
  - `className` now is added to the node with `slds-datepicker` class within the dialog. Use `triggerClassName` for the outer wrapping `div`. _[BREAKING CHANGE]_
  - `onChange` (formerly onDateChange) now provides callback with event and a data object in the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}`
  - Many new props and features: calendar alignment, assistive text props, accepts custom input, supports ISO weekday (Monday first), new props to allow calendar to be controlled (onClose, onOpen, onRequestClose, onRequestOpen), `portalMount` prop for testing React root nodes, more alignment with other menu/dialog components
  - Additional accessiblity and testing
  - See [Date Picker documentation](https://react.lightningdesignsystem.com/components/datepickers/) for full set of changes
- `id` on GlobalNav Link move to list item instead of `a` _[BREAKING CHANGE]_
- In Button, `aria-*` props now use hyphen instead of camelCase. Use `aria-expanded` and not `ariaExpanded`. _[BREAKING CHANGE]_

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

- Moves stories into examples folder, doc site examples are now aligned with SLDS website. _No production code changes in this release_.

## Release 0.5.2

**MINOR CHANGES**

- React components that are really are just sub-renders and are not meant to be consumed by end-users of this project have been moved to `components/[COMPONENT_NAME]/private`. Feel free to continue using components that are still in `components/[COMPONENT_NAME]` folder and consider them part of the public API. Hopefully, this adds clarity to what components can and should be used.
- In order to automate more the documentation site, more components are listed in package.json and an `examples` folder has been added to the `-es` tagged package to be used by the doc site.

## Release 0.5.1

**DOCUMENTATION**

- Adds mention of setting `AppElement` for `Modal` and `AppLauncher` to component documentation, so that the entire `body` is not hidden for assistive technology users.

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
