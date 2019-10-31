## Release 0.10.13

**Minor Features**

* `Maps`: Make controlled component
* `Checkbox`: Add grouped checkboxes with `indeterminate` state working example that matches ARIA spec.
* `Combobox`: Support menu item scrolling in all variants
* Move all prototype components to production status

**Bugfixes**

* `Accordion`: Prevent grabbing focus on every render
* `Accordion`: Hotfix to work with one `AccordionPanel` child
* `Toast`: Focus on dialog container on render instead of close button 
* `Popover`: Pass `aria-haspopup` to triggering component
* `Combobox`: Make `dialog` variant work. Update menu down icon style.
* `Combobox`, `DataTable`, `Expression`, `Map`, and `Dropdown`: Accessibility audit fixes. See https://github.com/salesforce/design-system-react/pull/2359
* `RadioGroup`, `Slider`, `SplitView`, `Spinner`, `Toast`: Accessibility audit fixes. See https://github.com/salesforce/design-system-react/pull/2337
* `ProgressBar`: Make read "{value}%" instead of just "{value}" for screenreaders
* `ProgressIndicator`: Read "Disabled" for disabled steps
* `ButtonGroup`: Checkbox should read "this field is required"

**Maintainance**

* Deprecate and EOL Illustration component
* `ProgressRing`: Add `assistiveText` to icons in examples
* `TextArea`: Making textarea error & required examples match their SLDS counterparts 
* `Button`: Add margin between buttons in examples
