## Release 0.8.15
**Modals are now at `z-index: 8000`.** If there are items on the main page with a higher `z-index`, they will appear in front of the modal. This setting aligns with the [prescribed z-index in SLDS](https://www.lightningdesignsystem.com/design-tokens/#category-z-index) for `$z-index-overlay`.
**Require `iconCategory` if `iconName` is set.** `utility` used to be the default icon category. `iconCategory` is now required.

**Major features**
* `@salesforce/design-system-react/module` now contains tree-shaking compatible ES6 modules (Tested with Webpack 4). This should work out of the box (due to `package.json`'s `module` field) and replace CommonJS module usage in Webpack 3 and 4. See [pull request](https://github.com/salesforce/design-system-react/pull/1300) for more details.
* Tree is now a production component and supports [single selection keyboard navigation](https://www.lightningdesignsystem.com/components/trees/).

**Minor features**
* DataTable: Align header markup with SLDS to fix alignment issues. Remove error for non-boolean attribute `focusable`.
* Upgrade React Modal to 3.4.4. This is a dependency of `Modal`.
* Modal: Adds `assistiveText.dialogLabel` to define modal label when there is no header.
* DataTable: Adds `noHint` prop to actions and makes hints an optional field.

**Bug fix**
* Request icons (console warning) with HTTP GET, so Create React App's webpack dev server doesn't 404
* Modal no longer jumps to 50% of page.
* Documentation: Align button group example on site with SLDS example
* Documentation site examples are more accessible (Page Headers and Stateful Buttons)
* Datepicker: Change the year picklist initial focus to currently selected year
* Datepicker: Focus input only if menu was previously open and not just requested to close
* Inline Edit UX pattern updated for keyboard: New pattern is that it'll tab to the close button, and if you're focused on the close button and tab again, it'll blur the field.
* `Dropdown` with `overflowBoundaryElement` and `align=right` use max-width instead of inherited children width.

**Maintenance**
* Require `iconCategory` if `iconName` is set. `utility` used to be the default icon category. `iconCategory` is now required.
* App Launcher - `assistiveText` is now an object with keys. Please update your component props.
* Popover - `assistiveText` is now an object with keys. Please update your component props.
* Modal - `assistiveText` is now an object with keys. Please update your component props.
* NPM scripts update: “build-storybook" -> static:build, “build-storybook-for-tests” -> storyshots:build, “storybook” -> static:start
* Switch `xml2json` to `xml2js` in tooling to make more compatible with Windows

Adds new script storyshots:start that allows interactive viewing of what is being tested with image snapshots to allow debugging.