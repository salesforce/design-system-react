## Release 0.9.4

**Minor Features**

* `PageHeader`: Allow actions in Base variant with support of `navRight`
* `Combobox`: Add field-level tooltip with `fieldLevelHelpTooltip` prop on `input` prop. Deprecate `Combobox`'s `assistiveText.fieldLevelHelpButton` in favor of using `input` prop's prop. See [#1689](https://github.com/salesforce/design-system-react/pull/1689) for more details. You will see a console warning if you are doing it wrong.
* `Tooltip`: Require `onClickTrigger` for learn more pattern
  * If `learnMore` Tooltip variant is used without `onClickTrigger`, then the “no click” basic info icon tooltip will be used with a “disabled” button.
  * If `onClickTrigger` is defined, a link will be rendered (this is the current behavior for learn more tooltips).
* Add `AppLauncher` `Tile` and `Section` components to main module export to allow use in CommonJS build.

**Bugfixes**

* `DataTable`: A UX pattern of Radio Group / Single Select with a Fixed Header works now.

**Documentation**

* `Combobox`: Site examples now have unique id's
* Re-organize [Codebase Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md)
* Add maximum lines in a file lint rule of 500
