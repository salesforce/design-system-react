**Minor Features**

* `Popover`: Add `error` and `warning` variants
* `DataTable`: Add `isDefaultSortDescending` prop to allow descending as first time sort direction
* `Combobox`: Add `disabled` prop to readonly and inline-listbox variants
* `PillContainer`: Return null if options is empty
* `Input`: Add `autoComplete` prop. (Newer versions of Chrome browser ignore `autocomplete="off"`).
* `Combobox`: Add `Input` prop on in order to expose all `Input` props within `Combobox`

**Bugfixes**

* `BrandBand`: Lightning Theme Fix - Styles were intermittently applied before
* `DataTable`: Add missing top gray border to fixed header tables
* `IconSettings`: Add additional inheritance of context for `overflowBoundaryElement` Dialog position which uses portals.
* `Input`: Update error icon from warning icon to error icon
* `Input`: Prevent `PropTypes` warning in `forms/private/label` when `label` prop contains a React `node`

**Maintainance**

* Update Brand Band documentation: Depending on your server settings, you may get this error due to stye injection and may want to directly add styles to your CSS file.
* Update `README.md` to run install command in right directory
* Datepicker: Clarify MomentJS usage in props/docs
* Add ESLINT skipBlankLines/skipComments max lines rule
* Combobox: Give each Storybook example a unique ID
* Define pull request expectations in more detail
* Document how to release a tag on a fork
* Add how to release a tag to 1st time PR bot
* Correct Typos in Contributor's Guidelines
* Improve docs for codebase-overview.md and CONTRIBUTING.md
* Remove non-breaking text from Tooltip Storybook examples
* Contributing docs: Add mention of adding new components to `package.json`
