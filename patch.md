## Release 0.8.19

**Major Features**

* Add Illustration Component

**Bugfixes**

* Make `Slider` a controlled component. Use `value` and `onChange` props.
* `Combobox`: Allow PopperJS to position menu correctly when menu hits the screen or overflow ancestor boundary.
* Update `Tree` branch and item to use latest SLDS HTML tags
* Update `Alert` error icon

**Maintenance**

* Add `getting-started.md` to NPM module
* Document copying over SLDS fonts to public for Create React App
* Update `Radio` component examples
* Remove `Object.assign()` from codebase and replace with spread
* Consolidate `assistiveText` props under one object. This is going to deprecate many props, but will make props more consistent across all the components.
  * `AppLauncherSection`
  * `Avatar`
  * `Breadcrumb`
  * `ButtonStateful`
  * `Button`
  * `GlobalHeader`
  * `GlobalNavigationBarDropdown`
