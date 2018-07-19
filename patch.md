## Release 0.8.20

**Bugfixes**

* Fix bug in `Dropdown` component where getIndexByValue() needs to look at nextProps.options when componentWillreceiveProps() is called.

**Maintenance**

* Documentation update on how to use Design System React within Create React App.
* Consolidate assistiveText props under one object for the following: `DataTable`, `Icon`, `Search`, `PanelFilterGroup`, `Spinner`, `Tree`, `TextArea`.