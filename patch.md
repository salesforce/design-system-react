## Release 0.10.12

**Minor Features**

* `Popover`: Add feature variant
* `SplitView`: `onSelect` now called with `enter` key
* `BuilderHeader`: Add miscellaneous section sub-component
* `BuilderHeader`: Use Error Popover in Utility Bar example
* `Accordion`: Update Base example to allow a panel to be toggled
* Add ARIA attributes to all `input` tags in library in order to enable increased accessibility support for consumers
* `SetupAssistant`: Add capacity to pass Icons into a `SetupAssistantStep`
* `Dropdown`: Adds `hover` capabilities w/ keyboard interactions
* `Accordion`: Add arrow key panel support (accessibility)

**Bugfixes**

* `Dropdown`: Menu Tooltip content now works with `options` array
* `Tabs`: White space around words in disabled tabs no longer trigger tab change. Disabled Tab style `import '!style-loader!css-loader!@salesforce/design-system-react/styles/tabs/tab.css';` updated to SLDS's modified BEM.
* `Expression`: Static markup accessibility violations fixed.
* `Files`: Add inverse classname to download button
* `BuilderHeader`: Make Tooltips in example accessible
* `TimePicker`: Remove default time-picker placeholder text

**Maintainance**

* `SplitView` Example: File name change
* Add functional programming eslint rules to increase maintainability
* `TravisCI`: Enable matrix build to speed up CI time
* Remove `PhantomJS` legacy code and instructions
* Bump `eslint-plugin-filenames` from 1.2.0 to 1.3.2
* Bump `babel-plugin-istanbul` from 5.1.4 to 5.2.0
* Bump `karma-chrome-launcher` from 2.2.0 to 3.1.0
* Bump `react` from 16.8.6 to 16.9.0
* Bump `@babel/polyfill` from 7.4.4 to 7.6.0
* Bump `cross-env` from 5.2.0 to 5.2.1
* Bump `fs-extra` from 3.0.1 to 8.1.0
* Bump `@storybook/addon-storyshots-puppeteer` from 5.1.9 to 5.1.11
* Bump `normalizr` from 3.2.4 to 3.4.1
* Bump `chownr` from 1.1.0 to 1.1.2
* Bump `eslint-plugin-import` from 2.17.3 to 2.18.2
* Bump `mocha-loader` from 2.0.1 to 3.0.0
* Bump `babel-eslint` from 10.0.2 to 10.0.3
* Bump `karma-coverage` from 1.1.2 to 2.0.1
* Bump `eslint-config-prettier` from 3.0.1 to 6.1.0
