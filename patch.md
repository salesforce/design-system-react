## Release 0.8.16

**Deprecation**
TL:DR; If you use the source code directly, update your form component paths and the parameters in `onChange`. All others stay the same for now.
* Moves `Input`, `Checkbox`, and `Textarea` out of `component/forms` and directly into `component/`. Old paths such as `component/forms/input` will still work, but include a console warning as deprecated.
* `components/input`, `components/checkbox`, and `components/textarea` pass different parameters into the `onChange` callback. `onChange` now passes in `event, { checked }` if the new paths are used. The parameters used to be `checked, event, { checked }`. If you use the new paths such as `components/input`, please update your parameter variables. This aligns the callback's parameters with the rest of the library's callback functions.
* If you consume the library with named imports `{[component]} from '@salesforce/design-system-react'`, you will recieve the warning and will need to use the old parameter order until the next breaking change.
* For more information, please review #1350.

**Minor features**
* Update `Tree` example to be hashmap in order to promote immutability. Please review `Tree` example in order to understand
* Add `tabIndex` prop to `MenuDropdown`
* Update SLDS version to 2.6.0 and test

**Bug fix**
* Dialog components such as Dropdown when used with `menuPosition='overflowBoundaryElement'` now respect `max-width` instead of inherited children width
* Remove duplicate logo in `GlobalHeader`

**Maintenance**
* Upgrade Babel to v7 and Jest to v23

**Documentation**
* Remove deprecated Picklist from code base and examples