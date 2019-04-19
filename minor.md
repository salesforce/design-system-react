## Release 0.10.0

It has been more than a year since the release of React 16. With the release of v0.10, React 16.3 or later is required to consume this library. Features are present in the library now that are React v16 only.

**Major Features**

* `Carousel`: In addition, to the SLDS one-panel blueprint. This component adds a non-SLDS three-item panel option for use on product home pages to aid in user on-boarding.
* `Combobox`: Adds Dialog variant. This allows “custom menus” such as checkboxes and other form elements to determine the input value.
* `Popover`: Walkthrough and Walkthrough Action variants were added. Along with this, Popover now allows custom targets which is helpful in feature highlighting and other user engagement stories. Use `onRequestTargetElement` to set a custom target.
* `GlobalHeader``: Align markup and latest UX pattern to SLDS
* Remove all caps text from all components
* Progress Indicator: Add vertical orientation

**Minor Features**

* `Tooltip`: Add dialog `className` prop
* `Button`: Add `outline-brand` variant
* `Avatar`: Add `inverse` variant
* `Card`: Add `hasNoHeader` prop to remove header
* `PillContainer`: Return null if options is empty
* `Spinner`: Adds `isDelayed` prop to component

**Bugfixes**

* `Combobox`: Cancel mouseDown bubble from listbox div tag in order to help not trigger onBlur when uses clicks menu scrollbar
* `Popover`: Change ARIA role to `dialog`
* `ButtonStateful`: Use prevState to update state in component
* `Input`: Remove always true condition, 'props.hasSpinner'
* `Input`: Update error icon from warning icon to error icon
* `Tree`: Adds unneeded `aria-hidden=true` to closer align with SLDS markup
* `Popover`: Change ARIA `role` to `dialog`
* `ProgressRing`: Fixe examples page
* `AppLauncher`: Fixes arrow direction in Sections

**Maintainance**

* Require React >16.3
* Add snapshot update npm command
* `Toast`: Use role='status'
* Add instructions to set up LDSR with Create React App 2.x
* Removed propTypes which are not used from different components
* `Modal`: Replace `dismissible` with `disableClose` in
* `Button`: Fix assistive text in small icon hint inverse example
* `Alert`: Add ability for example to close
* `Combobox`: Update `menuItem` to `onRenderMenuItem`
* `Vertical Navigation`: Remove `shade` variant
* Move storyshot DOM snapshots to individual files
* Remove unused variables from tests
* Support React fragment syntax
* Update to SLDS 2.8.x
* Improve docs for codebase-overview.md and CONTRIBUTING.md
* `Button` Examples: Update function call for "Outline brand button" story
* `GlobalNavigationBar`: Remove overlapping items from example
* `Lookup`: Add visual deprecation heading to component
