## Release 0.9.5

**Minor Features**

* Combobox: Allow disabled menu items and disabled menu items with Tooltips
* Input: Add `styleContainer` prop
* ProgressIndicator: `tooltipPosition` prop added to allow additional positioning logic
* Dropdown: `length` prop now allows numbers

**Bugfixes**

* BrandBand: Lightning Theme CSS injection was intermittantly working.
* Dropdown: Adds `aria-checked` and role="menuitemcheckbox" for selectable menus with checkmarks

**Maintainance**

* Warnings removed from snapshot tests and 404s from browser Mocha tests. "CI is now prettier."
* Add first time contributor survey to allow additional feedback to library maintainers.
* Imports additional examples from doc site examples that did not exist in Storybook
