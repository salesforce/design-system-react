"use strict";

/* eslint-disable max-lines */
// This object is imported into the documentation site. An example for the documentation site should be part of the pull request for the component. The object key is the component value listed in the component's component.json file. The following uses webpack's raw-loader plugin to get "text files" that will be eval()'d by CodeMirror within the documentation site on page load.

/* eslint-env node */

/* eslint-disable global-require */

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable import/no-unresolved */
var documentationSiteLiveExamples = {
  accordion: [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/accordion/__examples__/base.jsx')
  }],
  alert: [{
    heading: 'Informational',
    path: require('raw-loader!@salesforce/design-system-react/components/alert/__examples__/info.jsx')
  }, {
    heading: 'Warning',
    path: require('raw-loader!@salesforce/design-system-react/components/alert/__examples__/warning.jsx')
  }, {
    heading: 'System Status',
    path: require('raw-loader!@salesforce/design-system-react/components/alert/__examples__/offline.jsx')
  }, {
    heading: 'Error',
    path: require('raw-loader!@salesforce/design-system-react/components/alert/__examples__/error.jsx')
  }, {
    heading: 'Dismissable',
    path: require('raw-loader!@salesforce/design-system-react/components/alert/__examples__/dismissable.jsx')
  }],
  'app-launcher': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/app-launcher/__examples__/default.jsx')
  }],
  avatar: [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/avatar/__examples__/base.jsx')
  }, {
    heading: 'User Initials',
    path: require('raw-loader!@salesforce/design-system-react/components/avatar/__examples__/user-initials.jsx')
  }, {
    heading: 'User Icon',
    path: require('raw-loader!@salesforce/design-system-react/components/avatar/__examples__/user-icon.jsx')
  }, {
    heading: 'Entity Initials',
    path: require('raw-loader!@salesforce/design-system-react/components/avatar/__examples__/entity-initials.jsx')
  }, {
    heading: 'Entity Icon',
    path: require('raw-loader!@salesforce/design-system-react/components/avatar/__examples__/entity-icon.jsx')
  }],
  badge: [{
    heading: 'Color Variants',
    path: require('raw-loader!@salesforce/design-system-react/components/badge/__examples__/color-variants.jsx')
  }, {
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/badge/__examples__/default.jsx')
  }, {
    heading: 'With Icon',
    path: require('raw-loader!@salesforce/design-system-react/components/badge/__examples__/with-icon.jsx')
  }],
  'brand-band': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/brand-band/__examples__/default.jsx')
  }, {
    heading: 'Small',
    path: require('raw-loader!@salesforce/design-system-react/components/brand-band/__examples__/small.jsx')
  }, {
    heading: 'large',
    path: require('raw-loader!@salesforce/design-system-react/components/brand-band/__examples__/large.jsx')
  }, {
    heading: 'No Image',
    path: require('raw-loader!@salesforce/design-system-react/components/brand-band/__examples__/no-image.jsx')
  }, {
    heading: 'User Image',
    path: require('raw-loader!@salesforce/design-system-react/components/brand-band/__examples__/user-image.jsx')
  }, {
    heading: 'Group Image',
    path: require('raw-loader!@salesforce/design-system-react/components/brand-band/__examples__/group-image.jsx')
  }],
  breadcrumb: [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/breadcrumb/__examples__/base.jsx')
  }, {
    heading: 'One Item',
    path: require('raw-loader!@salesforce/design-system-react/components/breadcrumb/__examples__/one-item.jsx')
  }, {
    heading: 'With Overflow Menu',
    path: require('raw-loader!@salesforce/design-system-react/components/breadcrumb/__examples__/base-with-overflow-menu.jsx')
  }],
  'builder-header': [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/builder-header/__examples__/base.jsx')
  }, {
    heading: 'Base with Toolbar',
    path: require('raw-loader!@salesforce/design-system-react/components/builder-header/__examples__/base-with-toolbar.jsx')
  }, {
    heading: 'Base with Utilities',
    path: require('raw-loader!@salesforce/design-system-react/components/builder-header/__examples__/base-with-utilities.jsx')
  }, {
    heading: 'Successful Save',
    path: require('raw-loader!@salesforce/design-system-react/components/builder-header/__examples__/successful-save.jsx')
  }, {
    heading: 'After Successful Save',
    path: require('raw-loader!@salesforce/design-system-react/components/builder-header/__examples__/after-successful-save.jsx')
  }, {
    heading: 'Save Error',
    path: require('raw-loader!@salesforce/design-system-react/components/builder-header/__examples__/failed-save.jsx')
  }],
  'button-group': [{
    heading: 'With More Icon',
    path: require('raw-loader!@salesforce/design-system-react/components/button-group/__examples__/more-icon.jsx')
  }, {
    heading: 'Icon Group',
    path: require('raw-loader!@salesforce/design-system-react/components/button-group/__examples__/icon-group.jsx')
  }, {
    heading: 'List variant',
    path: require('raw-loader!@salesforce/design-system-react/components/button-group/__examples__/list-variant.jsx')
  }],
  'button-stateful': [{
    heading: 'Icon Only',
    path: require('raw-loader!@salesforce/design-system-react/components/button-stateful/__examples__/icon.jsx')
  }, {
    heading: 'Icon and Text',
    path: require('raw-loader!@salesforce/design-system-react/components/button-stateful/__examples__/icon-text.jsx')
  }],
  button: [{
    heading: 'Base Neutral',
    path: require('raw-loader!@salesforce/design-system-react/components/button/__examples__/base-neutral.jsx')
  }, {
    heading: 'Variants',
    path: require('raw-loader!@salesforce/design-system-react/components/button/__examples__/brand-disabled-destructive-inverse.jsx')
  }, {
    heading: 'Button Icons',
    path: require('raw-loader!@salesforce/design-system-react/components/button/__examples__/button-icons.jsx')
  }],
  card: [{
    heading: 'Card with Data Table',
    path: require('raw-loader!@salesforce/design-system-react/components/card/__examples__/related-list-with-table.jsx')
  }],
  carousel: [{
    heading: 'Three Items',
    path: require('raw-loader!@salesforce/design-system-react/components/carousel/__examples__/three-items.jsx')
  }, {
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/carousel/__examples__/default.jsx')
  }, {
    heading: 'With Navigation',
    path: require('raw-loader!@salesforce/design-system-react/components/carousel/__examples__/default-with-navigation.jsx')
  }],
  checkbox: [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/checkbox/__examples__/default.jsx')
  }, {
    heading: 'Error State',
    path: require('raw-loader!@salesforce/design-system-react/components/checkbox/__examples__/error.jsx')
  }, {
    heading: 'Toggle',
    path: require('raw-loader!@salesforce/design-system-react/components/checkbox/__examples__/toggle.jsx')
  }, {
    heading: 'Grouped with Tri-State',
    path: require('raw-loader!@salesforce/design-system-react/components/checkbox/__examples__/grouped-with-tristate.jsx')
  }],
  'color-picker': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/color-picker/__examples__/default.jsx')
  }],
  combobox: [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/base.jsx')
  }, {
    heading: 'Base: With subheader',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/base-menu-subheader.jsx')
  }, {
    heading: 'Base: Inherit Menu Width',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/base-inherit-menu-width.jsx')
  }, {
    heading: 'Base: Predefined options only',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/base-predefined-options-only.jsx')
  }, {
    heading: 'Base With Scroll',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/base-with-scroll.jsx')
  }, {
    heading: 'Base: With dialog',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/dialog.jsx')
  }, {
    heading: 'Inline single selection',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/inline-single.jsx')
  }, {
    heading: 'Inline: Single Selection with Entity Selection',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/inline-single-entity-combobox.jsx')
  }, {
    heading: 'Inline: Single Selection with Search and Add Menu Items',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/inline-single-search-add-entities.jsx')
  }, {
    heading: 'Inline: Multiple Selection with Loading State',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/inline-multiple-loading.jsx')
  }, {
    heading: 'Read-only: Single Selection (Picklist)',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/readonly-single.jsx')
  }, {
    heading: 'Read-only: Multiple Selection (Picklist)',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/readonly-multiple.jsx')
  }, {
    heading: 'Required Input and Error State',
    path: require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/required-input-error-state.jsx')
  }],
  'data-table': [{
    heading: 'Basic',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/basic-fluid.jsx')
  }, {
    heading: 'Basic: Fluid and Striped',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/basic-fluid-striped.jsx')
  }, {
    heading: 'Basic: No row hover',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/basic-fluid-no-row-hover.jsx')
  }, {
    heading: 'Basic: Columns bordered',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/basic-fluid-column-bordered.jsx')
  }, {
    heading: 'Basic: Headless',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/basic-fluid-headless.jsx')
  }, {
    heading: 'Fixed Layout',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/basic-fixed-layout.jsx')
  }, {
    heading: 'Advanced',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/advanced.jsx')
  }, {
    heading: 'Advanced: Single Selection',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/advanced-single-select.jsx')
  }, {
    heading: 'Advanced: Fixed Header',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/fixed-header.jsx')
  }, {
    heading: 'Advanced: Joined with Page Header',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/joined-with-page-header.jsx')
  }, {
    heading: 'Infinite Scrolling',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/infinite-scrolling.jsx')
  }, {
    heading: 'Resizable Columns',
    path: require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/resizable-columns.jsx')
  }],
  'date-picker': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/date-picker/__examples__/default.jsx')
  }],
  'docked-composer': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/docked-composer/__examples__/base.jsx')
  }, {
    heading: 'Minimized',
    path: require('raw-loader!@salesforce/design-system-react/components/docked-composer/__examples__/minimized.jsx')
  }],
  'dynamic-icon': [{
    heading: 'Ellie',
    path: require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/ellie.jsx')
  }, {
    heading: 'Eq',
    path: require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/eq.jsx')
  }, {
    heading: 'Score',
    path: require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/score.jsx')
  }, {
    heading: 'Strength',
    path: require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/strength.jsx')
  }, {
    heading: 'Trend',
    path: require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/trend.jsx')
  }, {
    heading: 'Typing',
    path: require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/typing.jsx')
  }, {
    heading: 'Waffle',
    path: require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/waffle.jsx')
  }],
  'expandable-section': [{
    heading: 'Deault',
    path: require('raw-loader!@salesforce/design-system-react/components/expandable-section/__examples__/default.jsx')
  }, {
    heading: 'Controlled',
    path: require('raw-loader!@salesforce/design-system-react/components/expandable-section/__examples__/controlled.jsx')
  }, {
    heading: 'Non-collapsible',
    path: require('raw-loader!@salesforce/design-system-react/components/expandable-section/__examples__/non-collapsible.jsx')
  }],
  expression: [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/expression/__examples__/resource-selected.jsx')
  }],
  files: [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/files/__examples__/default.jsx')
  }, {
    heading: 'Cropped',
    path: require('raw-loader!@salesforce/design-system-react/components/files/__examples__/crops.jsx')
  }, {
    heading: 'Loading',
    path: require('raw-loader!@salesforce/design-system-react/components/files/__examples__/loading.jsx')
  }, {
    heading: 'No Title',
    path: require('raw-loader!@salesforce/design-system-react/components/files/__examples__/no-title.jsx')
  }, {
    heading: 'With External Icon',
    path: require('raw-loader!@salesforce/design-system-react/components/files/__examples__/with-external-icon.jsx')
  }, {
    heading: 'No Image',
    path: require('raw-loader!@salesforce/design-system-react/components/files/__examples__/no-image.jsx')
  }, {
    heading: 'Actions',
    path: require('raw-loader!@salesforce/design-system-react/components/files/__examples__/actions.jsx')
  }],
  filter: [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/filter/__examples__/default.jsx')
  }, {
    heading: 'New',
    path: require('raw-loader!@salesforce/design-system-react/components/filter/__examples__/new.jsx')
  }, {
    heading: 'Error',
    path: require('raw-loader!@salesforce/design-system-react/components/filter/__examples__/error.jsx')
  }, {
    heading: 'Locked',
    path: require('raw-loader!@salesforce/design-system-react/components/filter/__examples__/locked.jsx')
  }],
  'global-header': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/global-header/__examples__/default.jsx')
  }],
  'global-navigation-bar': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/global-navigation-bar/__examples__/default.jsx')
  }],
  icon: [{
    heading: 'Category Options',
    path: require('raw-loader!@salesforce/design-system-react/components/icon/__examples__/categories.jsx')
  }, {
    heading: 'Color Options',
    path: require('raw-loader!@salesforce/design-system-react/components/icon/__examples__/colors.jsx')
  }, {
    heading: 'Size Options',
    path: require('raw-loader!@salesforce/design-system-react/components/icon/__examples__/sizes.jsx')
  }],
  input: [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/input/__examples__/default.jsx')
  }, {
    heading: 'With Icons',
    path: require('raw-loader!@salesforce/design-system-react/components/input/__examples__/icons.jsx')
  }, {
    heading: 'Error State',
    path: require('raw-loader!@salesforce/design-system-react/components/input/__examples__/error.jsx')
  }, {
    heading: 'Disabled',
    path: require('raw-loader!@salesforce/design-system-react/components/input/__examples__/inactiveInputs.jsx')
  }, {
    heading: 'With Inline Help',
    path: require('raw-loader!@salesforce/design-system-react/components/input/__examples__/inline-help.jsx')
  }, {
    heading: 'With Field Level Help',
    path: require('raw-loader!@salesforce/design-system-react/components/input/__examples__/field-level-help.jsx')
  }, {
    heading: 'Counter',
    path: require('raw-loader!@salesforce/design-system-react/components/input/__examples__/counter-input.jsx')
  }],
  'location-map': [{
    heading: 'Multiple Locations',
    path: require('raw-loader!@salesforce/design-system-react/components/location-map/__examples__/multiple-locations.jsx')
  }],
  'media-object': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/media-object/__examples__/default.jsx')
  }, {
    heading: 'Vertically Centered',
    path: require('raw-loader!@salesforce/design-system-react/components/media-object/__examples__/vertically-centered.jsx')
  }],
  'menu-dropdown': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/default.jsx')
  }, {
    heading: 'With Icon Label',
    path: require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/default-icon-label.jsx')
  }, {
    heading: 'With Subheadings',
    path: require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/sub-heading.jsx')
  }, {
    heading: 'Custom trigger',
    path: require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/custom-trigger.jsx')
  }, {
    heading: 'Checkmark Selection',
    path: require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/checkmark.jsx')
  }],
  modal: [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/modal/__examples__/menu-contents.jsx')
  }, {
    heading: 'With header and footer',
    path: require('raw-loader!@salesforce/design-system-react/components/modal/__examples__/header-footer.jsx')
  }, {
    heading: 'With Tagline',
    path: require('raw-loader!@salesforce/design-system-react/components/modal/__examples__/taglines.jsx')
  }, {
    heading: 'Prompt',
    path: require('raw-loader!@salesforce/design-system-react/components/modal/__examples__/prompt.jsx')
  }, {
    heading: 'Various sizes',
    path: require('raw-loader!@salesforce/design-system-react/components/modal/__examples__/sizes.jsx')
  }],
  'page-header': [{
    heading: 'Record Home',
    path: require('raw-loader!@salesforce/design-system-react/components/page-header/__examples__/record-home.jsx')
  }, {
    heading: 'Object Home',
    path: require('raw-loader!@salesforce/design-system-react/components/page-header/__examples__/object-home.jsx')
  }, {
    heading: 'Related list',
    path: require('raw-loader!@salesforce/design-system-react/components/page-header/__examples__/related-list.jsx')
  }, {
    heading: 'Setup',
    path: require('raw-loader!@salesforce/design-system-react/components/page-header/__examples__/setup.jsx')
  }],
  panel: [{
    heading: 'Filtering',
    path: require('raw-loader!@salesforce/design-system-react/components/panel/__examples__/filtering.jsx')
  }, {
    heading: 'Filtering: Locked',
    path: require('raw-loader!@salesforce/design-system-react/components/panel/__examples__/filtering-locked.jsx')
  }, {
    heading: 'Filtering: Error',
    path: require('raw-loader!@salesforce/design-system-react/components/panel/__examples__/filtering-error.jsx')
  }],
  'pill-container': [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/pill-container/__examples__/base.jsx')
  }, {
    heading: 'With Icons',
    path: require('raw-loader!@salesforce/design-system-react/components/pill-container/__examples__/icons.jsx')
  }, {
    heading: 'With Avatars',
    path: require('raw-loader!@salesforce/design-system-react/components/pill-container/__examples__/avatars.jsx')
  }, {
    heading: 'Bare',
    path: require('raw-loader!@salesforce/design-system-react/components/pill-container/__examples__/bare.jsx')
  }],
  pill: [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/pill/__examples__/base.jsx')
  }, {
    heading: 'With Icons',
    path: require('raw-loader!@salesforce/design-system-react/components/pill/__examples__/icon.jsx')
  }],
  popover: [{
    heading: 'With Header',
    path: require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/header.jsx')
  }, {
    heading: 'With Alternative Header',
    path: require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/alternative-header.jsx')
  }, {
    heading: 'Controlled State with Footer',
    path: require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/controlled-with-footer.jsx')
  }, {
    heading: 'Custom Target',
    path: require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/custom-target.jsx')
  }, {
    heading: 'Error Theme',
    path: require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/error.jsx')
  }, {
    heading: 'Feature',
    path: require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/feature.jsx')
  }, {
    heading: 'Walkthrough',
    path: require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/walkthrough.jsx')
  }, {
    heading: 'Walkthrough Action',
    path: require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/walkthrough-action.jsx')
  }, {
    heading: 'Warning',
    path: require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/warning.jsx')
  }, {
    heading: 'Edit Dialog',
    path: require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/edit-dialog.jsx')
  }],
  'progress-bar': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/default.jsx')
  }, {
    heading: 'Descriptive',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/descriptive.jsx')
  }, {
    heading: 'Success',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/color.jsx')
  }, {
    heading: 'Circular Radius',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/radius.jsx')
  }, {
    heading: 'Thickness Variants',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/thickness.jsx')
  }, {
    heading: 'Vertical',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/vertical.jsx')
  }],
  'progress-indicator': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-indicator/__examples__/default.jsx')
  }, {
    heading: 'Vertical',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-indicator/__examples__/vertical.jsx')
  }],
  'progress-ring': [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/base.jsx')
  }, {
    heading: 'Complete',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/complete.jsx')
  }, {
    heading: 'Warning',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/warning.jsx')
  }, {
    heading: 'Expired',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/expired.jsx')
  }, {
    heading: 'Active',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/active.jsx')
  }, {
    heading: 'With Custom Icon',
    path: require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/customIcon.jsx')
  }],
  'radio-button-group': [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/radio-button-group/__examples__/base.jsx')
  }],
  'radio-group': [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/radio-group/__examples__/base.jsx')
  }],
  radio: [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/radio/__examples__/default.jsx')
  }, {
    heading: 'Disabled',
    path: require('raw-loader!@salesforce/design-system-react/components/radio/__examples__/disabled.jsx')
  }],
  'scoped-notification': [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/scoped-notification/__examples__/base.jsx')
  }, {
    heading: 'Light',
    path: require('raw-loader!@salesforce/design-system-react/components/scoped-notification/__examples__/light.jsx')
  }, {
    heading: 'Dark',
    path: require('raw-loader!@salesforce/design-system-react/components/scoped-notification/__examples__/dark.jsx')
  }, {
    heading: 'With Custom Icon',
    path: require('raw-loader!@salesforce/design-system-react/components/scoped-notification/__examples__/custom-icon.jsx')
  }],
  'setup-assistant': [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/setup-assistant/__examples__/base.jsx')
  }, {
    heading: 'Step Progress Indicator',
    path: require('raw-loader!@salesforce/design-system-react/components/setup-assistant/__examples__/step-progress.jsx')
  }, {
    heading: 'Expandable Steps',
    path: require('raw-loader!@salesforce/design-system-react/components/setup-assistant/__examples__/hub-expandable-steps.jsx')
  }, {
    heading: 'With Card',
    path: require('raw-loader!@salesforce/design-system-react/components/setup-assistant/__examples__/card.jsx')
  }],
  slider: [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/slider/__examples__/base.jsx')
  }, {
    heading: 'Disabled',
    path: require('raw-loader!@salesforce/design-system-react/components/slider/__examples__/disabled.jsx')
  }, {
    heading: 'Error',
    path: require('raw-loader!@salesforce/design-system-react/components/slider/__examples__/error.jsx')
  }, {
    heading: 'Size Variants',
    path: require('raw-loader!@salesforce/design-system-react/components/slider/__examples__/sizes.jsx')
  }, {
    heading: 'Vertical',
    path: require('raw-loader!@salesforce/design-system-react/components/slider/__examples__/vertical.jsx')
  }],
  spinner: [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/spinner/__examples__/default.jsx')
  }],
  'split-view': [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/split-view/__examples__/base.jsx')
  }, {
    heading: 'Multiple',
    path: require('raw-loader!@salesforce/design-system-react/components/split-view/__examples__/base-multiple.jsx')
  }, {
    heading: 'With External State',
    path: require('raw-loader!@salesforce/design-system-react/components/split-view/__examples__/external-state.jsx')
  }, {
    heading: 'Custom Items List',
    path: require('raw-loader!@salesforce/design-system-react/components/split-view/__examples__/custom-items-list.jsx')
  }],
  tabs: [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/tabs/__examples__/default.jsx')
  }, {
    heading: 'Scoped',
    path: require('raw-loader!@salesforce/design-system-react/components/tabs/__examples__/scoped.jsx')
  }],
  textarea: [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/textarea/__examples__/default.jsx')
  }, {
    heading: 'Error',
    path: require('raw-loader!@salesforce/design-system-react/components/textarea/__examples__/error.jsx')
  }, {
    heading: 'Disabled',
    path: require('raw-loader!@salesforce/design-system-react/components/textarea/__examples__/disabled.jsx')
  }],
  'time-picker': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/time-picker/__examples__/default.jsx')
  }],
  toast: [{
    heading: 'Informational',
    path: require('raw-loader!@salesforce/design-system-react/components/toast/__examples__/info.jsx')
  }, {
    heading: 'Success',
    path: require('raw-loader!@salesforce/design-system-react/components/toast/__examples__/success.jsx')
  }, {
    heading: 'Warning',
    path: require('raw-loader!@salesforce/design-system-react/components/toast/__examples__/warning.jsx')
  }, {
    heading: 'Error',
    path: require('raw-loader!@salesforce/design-system-react/components/toast/__examples__/error.jsx')
  }, {
    heading: 'Error with Details',
    path: require('raw-loader!@salesforce/design-system-react/components/toast/__examples__/error-with-details.jsx')
  }],
  tooltip: [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/tooltip/__examples__/base.jsx')
  }, {
    heading: 'Button Trigger',
    path: require('raw-loader!@salesforce/design-system-react/components/tooltip/__examples__/button.jsx')
  }, {
    heading: 'Button Group Trigger',
    path: require('raw-loader!@salesforce/design-system-react/components/tooltip/__examples__/button-group.jsx')
  }, {
    heading: 'Learn more',
    path: require('raw-loader!@salesforce/design-system-react/components/tooltip/__examples__/learn-more.jsx')
  }],
  tree: [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/tree/__examples__/default.jsx')
  }],
  'trial-bar': [{
    heading: 'Base',
    path: require('raw-loader!@salesforce/design-system-react/components/trial-bar/__examples__/default.jsx')
  }],
  'vertical-navigation': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/vertical-navigation/__examples__/default.jsx')
  }, {
    heading: 'Items with Icons',
    path: require('raw-loader!@salesforce/design-system-react/components/vertical-navigation/__examples__/icons.jsx')
  }, {
    heading: 'Items with Notifications',
    path: require('raw-loader!@salesforce/design-system-react/components/vertical-navigation/__examples__/notifications.jsx')
  }],
  'visual-picker': [{
    heading: 'Coverable',
    path: require('raw-loader!@salesforce/design-system-react/components/visual-picker/__examples__/coverable.jsx')
  }, {
    heading: 'Non-coverable',
    path: require('raw-loader!@salesforce/design-system-react/components/visual-picker/__examples__/non-coverable.jsx')
  }, {
    heading: 'Vertical',
    path: require('raw-loader!@salesforce/design-system-react/components/visual-picker/__examples__/vertical.jsx')
  }],
  'welcome-mat': [{
    heading: 'Default',
    path: require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/default.jsx')
  }, {
    heading: 'With Steps Completed',
    path: require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/steps-complete.jsx')
  }, {
    heading: 'Info-Only',
    path: require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/info-only.jsx')
  }, {
    heading: 'Splash',
    path: require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/splash.jsx')
  }, {
    heading: 'Trailhead',
    path: require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/trailhead.jsx')
  }, {
    heading: 'Trailhead - Complete',
    path: require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/trailhead-complete.jsx')
  }]
};
module.exports = documentationSiteLiveExamples;