## Release 0.10.8

**Major Features**

* `WelcomeMat`: Add new component
* `Colorpicker`: Add right to left language support
* `Datepicker`: Add right to left language support
* `Dropdown`: Add right to left language support
* `Icon`: Add right to left language support

**Minor Features**

* `PageHeader`: Update markup
* `PageHeader`: Add support for custom icons
* `PageHeader`: Add support for `Breadcrumbs`
* `PageHeader`: Support joined styling with `DataTable`

**Bugfixes**

* `ProgressRing`: Fix for layout issue in IE11
* `Dialog`: Fix for "invalid prop `direction` of value `[object Object]` supplied
* `BuilderHeader`: Fix type
* Remove unneeded imports (fixing DeepScan issues)
* Update jest config to include all snapshots

**Documentation**

* Update `create-react-app.md`
* Update `CONTRIBUTING.md` readme to new Jest script process
* Update `release.md` readme

**Maintainance**

* Add Storybook stories to DOM, image, and a11y tests by default unless excluded
* Limit use of root `~` babel alias to example files
* Divide image snapshots into chunks, then remove them from standard tests (for now)
* `@salesforce-ux/design-system` update from 2.8.3 to 2.9.3 (SLDS)
* `@salesforce-ux/icons` update from 7.34.0 to 9.27.0
* `webpack-dev-middleware` update from 1.12.2 to 2.0.6
* `babel-loader` update from 8.0.0-beta.3 to 8.0.6
* `react-test-renderer` update from 16.4.2 to 16.8.6
* `warning` update from 3.0.0 to 4.0.3
* `eslint-loader` update from 1.9.0 to 2.1.2
* `enzyme-adapter-react-16` update from 1.12.1 to 1.14.0
* `karma-cli` update from 1.0.1 to 2.0.0
* `object.entries` update from 1.0.4 to 1.1.0
* `babel-eslint` update from 8.2.3 to 10.0.2
* `babel-plugin-instabul` update from 4.1.6 to 5.1.4
* `mocha` update from 3.5.3 to 6.1.4
* `react-onclickoutside` update from 6.7.1 to 6.8.0
* `react-highlighter` update from 0.4.2 to 0.4.3
* `express` update from 4.16.2 to 4.17.1
