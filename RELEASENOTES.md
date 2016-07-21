# Salesforce Lightning Design System
# React Components: design-system-react
# Release notes

## Release 0.2.0

**BREAKING CHANGES**
- Changes to how the `inverse` prop works for icons and removal of the default value of `true`

**MAJOR CHANGES**
- Update Icon to the latest markup

**OTHER**
- Allow menus and buttons used in the Global Nav Bar to be marked as active


## Release 0.1.2

**MAJOR CHANGES**
- Add the App Launcher component
- Add support for the title attribute for icons

**OTHER**
- Additional code cleanup


## Release 0.1.1

**MAJOR CHANGES**
- Add support for icons, headers, links, and dividers to Dropdown and Picklist menus
- Add support for custom content in Dropdown menus
- Update Lookup to the latest markup
- Update Picklist to the latest markup

**OTHER**
- Add name attributes to Checkbox and Input
- Add Button support to Global Navigation Bar
- Update the keyboard navigation logic used by menus
- Update profile icon used in the Global Header


## Release 0.1.0

**BREAKING CHANGES**
- Rename ContextBar to GlobalNavigationBar

**MAJOR CHANGES**
- Add the Global Header component
- Add a Search component
- Update BreadCrumb to the latest markup
- Update PageHeader to the latest markup

**OTHER**
- Begin counting versions from 0.1.0
- Add buffered option to DataTable


## Release 0.0.35

**MAJOR CHANGES**
- Reversed Flippable prop due to bug with Tether.js
- Use Popover component in Datepicker
- Add required and disabled props to Datepicker and Timepicker


## Release 0.0.34

**BREAKING CHANGES**
- Flippable prop on Timepicker and Datepicker used to default to true. Now, it defaults to false and you must explicitly add it.


## Release 0.0.33

**MAJOR CHANGES**
- Added new InlineEdit component
- Clickable Input icons now use Button

**OTHER**
- Remove unused Popover class on Picklist
- Additional code cleanup


## Release 0.0.32
- Added containerClassName prop to Spinner


## Release 0.0.31

**MAJOR CHANGES**
- Added new Spinner component
- Updated the ContextBar component
- Added a highlighting utility
- Added a custom cell type to DataTable using the highlighter

**OTHER**
- Remove isRequired for iconCategory in ButtonGroup
- Additional bug fixes and code cleanup


## Release 0.0.29

**MAJOR CHANGES**
- New release process

**SITE AND DOCS**
- Moved site to external repo


## Release 0.0.28

**MAJOR CHANGES**
- New Components:
  - SLDSBreadCrumb
  - SLDSDataTable
  - SLDSGrid
  - SLDSPageHeader
- Lookup component no longer requires icons for menu items


## Release 0.0.27

**MAJOR CHANGES**
- SLDSIcons.Icon refactored to SLDSIcon
- Picklist renamed to PicklistBase
- Dropdown renamed to DropdownBase

**SITE AND DOCS**
- New Getting Started and FAQ pages

**OTHER**
- custom_renderer code moved into demo/code_snippets
- new tests
- a multitude of bug fixes and TLC
