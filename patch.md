## Release 0.7.2

**Major features**

* Add [Accordion](https://design-system-react.herokuapp.com/components/accordions/) component 
* Add [Alert](https://design-system-react.herokuapp.com/components/alerts/) component 
* Add [Toast](https://design-system-react.herokuapp.com/components/toasts/) component 

**Bugfix Changes**

* Initial state of DataTable sort is null, unless prop is passed. Before this fix, columns appear to be ascending and descending only and toggle between those two based on the previous direction. You can now have an unsorted third option, so you can go have an unsorted sortable column and go from unsorted -> asc -> desc. `isSorted` and `sortDirection` are both required if you are sorting a column. See #1163 for more background.
* Removes the warnings that always show when using a Progress Indicator. Tooltip trigger is now on the button instead of the `li` tag.

**Maintenance**

* Lookup, Picklist, and Notification are deprecated. These are deprecated components with deprecation warnings. Deprecated components will be present for at least one major Salesforce release (not this library) after the current release cycle and may remain longer. Please refer to source code for prop descriptions in the future. Please transition:
    * Lookup -> Autocomplete (base) Combobox
    * Picklist -> Read-only (base) Combobox
    * Notification -> Alert or Toast
* Removes `forceUpdate` from Tree example
* Update Modal examples
* Add `parentSelector` use description to Modal
* Add HTML avatar snapshots
* Fix combobox example use of `placeholderReadOnly`