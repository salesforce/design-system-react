## Release 0.10.3

**Major Features**

* `ProgressBar`: Add Component
* `ScopedNotification`: Add Component
* `DynamicIcon`: Add Component
* `Popover`: Add `edit-dialog` variant

**Minor Features**

* `Dropdown`: Add menu width prop
* `DatePicker`: Triggers a console warning on using default parser
* `PageHeader`: Remove all caps heading

**Bugfixes**

* Modal: fix error with dismissModalOnClickOutside
* Tree Buttons: Adds `aria-hidden=true` to align with SLDS
* Accordion: Add event parameter in example code
* Update Popover to use `section` tag

**Maintainance**

* Rename prop `title` to `heading` in Modal
* Update `PageHeader` prop `variant` to accept kebab-case and otherwise show deprecation warning
* Button Stateful: Changes background color to make the text more legible
* Alert: Adds padding to story container to prevent overlap
* AppLauncher: Changes icon text in tile to be consistent with heading
* Progress Indicator: Adds `vertical` variant to docsite examples
* Button: Add `outline-brand` variant to doc site examples
* Deprecate custom content for Dropdown component
* Add Icon Container assistive text in example
