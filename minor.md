## Release 0.9.0

**Major Features**

* Update CSS class names so that they align with the modified-BEM structure that [Salesforce Lightning Design System](https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_lds.htm) switched to in June 2017. These changes are were promised to be backwards compatible for 18 months.\*\* . (In short, the `className` contains `--` instead of `_` now).

**Minor Features**

* Input: Add `styleInput` prop
* Radio: Add `ref`, `data` attribute, and `className` props
* Toast: Add `style` prop
* Alert: Add `style` prop
* Tooltip: Align "learn more" variant with SLDS
* Allow SLDS Token import for inline styles
* Allow Storybook (`npm start`) on Windows 10
* Vertical Navigation: Update SLDS markup/classes

**Bugfixes**

* Popover (all dialogs): Prevent scroll to bottom on focus in dialogs
* DataTable: Update `stackedHorizontal` class name
* Dialog: Remove isNaN gaurds since ‘inherit’ is not a number
* Page header: Details not truncating
* Page header: Align Media Objects and header text
* Adding missing `docs.json` to some components

**Maintenance and Documentation**

* Clarify new component contribution section
* Convert `createReactClass` components to ES6 Classes
* Move keyboard navigate mixin into picklist (deprecated)
* Remove some unneeded dependencies
* Fix typo in `Spinner` example
* Update prettier CI command to fail on style issues
* Fix lint errors
