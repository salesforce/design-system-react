# Salesforce Lightning Design System
# React Components: design-system-react
# Release notes

## Release 0.2.2

**MAJOR CHANGES**
- Add Modal `header` and `headerClassName` props to allow for custom headers

**OTHER**
- Update the truncation logic to account for AppLauncher's description headings
- Center AppLauncher search bar with CSS
- AppLauncher makes use of Modal's new `header` prop
- Remove `id` generator from button component (let parent generate it, if needed)

## Release 0.2.1

**BREAKING CHANGES**
- Updates the GlobalNavigationBarLink to pass `{ href }` as the second parameter

**MAJOR CHANGES**
- Remove `trapEvent` from GlobalNavigationBarLink and replace with `preventDefault` to allow clicks to bubble up
- Adds support for custom content to Global Header profile
- Cleans up the dividerPosition of Nav Region

**OTHER**
- Updates the icon script to lowercase names
- Makes the Nav Menu trigger use chevron icon
- Corrects check props for profile children


## Release 0.2.0

**BREAKING CHANGES**
- Changes to how the `inverse` prop works for icons and removal of the default value of `true`
- Button component: Inverse style of Button (white color to go on dark backgrounds) is now declared with a bool prop, inverse
- Button component: `inverse` and `icon-inverse` are no longer supported in the variants prop

**MAJOR CHANGES**
- Add support for custom svg icons
- Update Icon to the latest markup
- Update Tooltip to the latest markup
- Allow custom styles to be passed to icons

**OTHER**
- Allow menus and buttons used in the Global Nav Bar to be marked as active
- Animates the App Launcher icon based on the latest SLDS markup
- Button component: when button icon had an iconVariant prop, the iconSize prop did not render. It is now fixed
- Timepicker wasn't working correctly after the menu updates in 0.1.1. It is now fixed
- Update the logo used in the Global Header story


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
