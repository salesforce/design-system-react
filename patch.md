## Release 0.10.32

**React 17 compatibility updates** 

* Remove legacy 16.x context API
* Update package to React 17
* Remove deprecated react lifecycle methods
* Remove javascript:void(0) URLs

**Bug fixes**

* `Modal`: Update structure for accessibility
* `DataTable`: Fix infinite scroll when items are shorter than table height
* `Dropdown`: Update selected option state
* Switch Typescript FC returntype to JSX.Element
* `Icon`: Fix icon snapshot (after inline icon updates)

**Maintenance**

* `PageHeader`: Add note about info variant and record-home variant to prop description
* Update @salesforce-ux/icons from 9.27.0 to 9.40.1
* Update Storybook to 6.2.0