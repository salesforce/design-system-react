## Release 0.8.14

**Minor features**
* Tooltip: "Learn more" variant added. Deprecation notice added for `variant: info || error`. Please use `theme` prop going forward instead.

**Bug fix**
* Data Table: Remove console warning when DataTableColumn `sortable` is `true`.
* Combobox: Trigger onOpen callback when menu opens
* Datepicker: Focus input if menu was actually open and not just requested to close
