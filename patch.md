## Release 0.8.21

* DataTable's `onChange` replaced with `onRowChange`. `onChange`'s parameters are `(selectedArrayOfItems, event)`. `onRowChange` standardizes the parameters with the rest of the library with `event, { selection:[array] }`.

**Minor Features**

* Input: Add Field Level Help and Inline Help variants
* Icon: Add Warning, error, light color options
* Modal: Add additional warning when `Settings.setAppElement` is not set.
* AppLauncher: Add to CommonJS and ES6 module library export
* Add Spinner to doc site

**Bugfixes**

* Progress Indicator: Improved assistive tech user experience
* DatePicker: Fixing issue where year picker doesn't show years correctly
* GlobalHeaderButton: Invalid markup fixed when used within GlobalHeaderTrigger
* Tree: Allow label to be a React node (more lenient proptypes)
* Positioning behavior of Dialog components that use nubbins has changed. This applies to `Popover`, `Tooltip`, `Datepicker`, `Dropdown`. Previously the nubbin would be misaligned due to hardcoded margins that would get added onto the dialog component. It will now instead calculate the offsets and include them in the positioning logic and add/subtract from the left and top.
* Dialogs that use nubbins would previously have the nubbins point at the location on the reference trigger component (i.e. `Button`). Details:
  * If a Popover had an align of `top left`, that meant the nubbin would point at the top left hand side of the `Button`.
  * The behavior now is that the nubbin will always position the Dialog element as needed to ensure it points at the center of the desired side.
  * In the case of a `top left` align the left will only designate the location of the nubbin on the Dialog.
  * We may decide to bring back the ability to control both the nubbin location on the Dialog, but also the location at which it points to on the reference element. Much of the logic surrounding nubbins has been broken at the seams and edge cases for a long time. This change has been done in order to provide a more robust and dependable solution.
  * Any dialog that uses an `offset` prop will need to be manually readjusted.
  * Deprecate `offset` prop for `Dropdown` and `Popover`. The manual setting of positional offset of dialog components has been deemed unreliable. Position logic has been re-written to deliver better and more reliable positioning. Please create an issue if you have an edge case not covered by the built-in logic.

**Maintenance and documenation**

* Move `Navigation` to `VerticalNavigation` to align with SLDS.
* Dropdown: Document that default menu height is 5
* Datepicker: Increase default years, 5 to 10 years
* Add warnings to `bread-crumb`, `forms/input`, `forms/radio`, `forms/textarea`, `navigation`, `popover-tooltip` to show that they have been moved. Warning only occurs when using source code files `import [COMPONENT] from`design-system-react/components/[COMPONENT]`
* Modal: Deprecate rarely used Trigger Portal found at `/components/modal/trigger`
* Combobox: Clarify prop docs
* Update react-doc-gen version
* Tree: Move to one render function and proptype object per file
* Add url-slug to package.json components, Makes prompt easier to find
* Update SLDS site URLs for doc site
* Add NPM babel preset `package.json`
* Prefer object spread instead of `object.assign` eslint rule
* Revert to `npm install` from `npm ci` due to TravisCI issues
