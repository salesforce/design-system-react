// This object is imported into the documentation site. An example for the documentation site should be part of the pull request for the component. The object key is the component value listed in the component's component.json file. The following uses webpack's raw-loader plugin to get "text files" that will be eval()'d by CodeMirror within the documentation site on page load.

/* eslint-env node */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

const documentationSiteLiveExamples = {
	accordion: [
		require('raw-loader!@salesforce/design-system-react/components/accordion/__examples__/base.jsx'),
	],
	alert: [
		require('raw-loader!@salesforce/design-system-react/components/alert/__examples__/info.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/alert/__examples__/warning.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/alert/__examples__/offline.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/alert/__examples__/error.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/alert/__examples__/dismissable.jsx'),
	],
	'app-launcher': [
		require('raw-loader!@salesforce/design-system-react/components/app-launcher/__examples__/default.jsx'),
	],
	avatar: [
		require('raw-loader!@salesforce/design-system-react/components/avatar/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/avatar/__examples__/user-initials.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/avatar/__examples__/user-icon.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/avatar/__examples__/entity-initials.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/avatar/__examples__/entity-icon.jsx'),
	],
	badge: [
		require('raw-loader!@salesforce/design-system-react/components/badge/__examples__/color-variants.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/badge/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/badge/__examples__/with-icon.jsx'),
	],
	'brand-band': [
		require('raw-loader!@salesforce/design-system-react/components/brand-band/__examples__/lightning-blue-theme.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/brand-band/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/brand-band/__examples__/small.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/brand-band/__examples__/large.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/brand-band/__examples__/no-image.jsx'),
	],
	breadcrumb: [
		require('raw-loader!@salesforce/design-system-react/components/breadcrumb/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/breadcrumb/__examples__/one-item.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/breadcrumb/__examples__/base-with-overflow-menu.jsx'),
	],
	'builder-header': [
		require('raw-loader!@salesforce/design-system-react/components/builder-header/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/builder-header/__examples__/base-with-toolbar.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/builder-header/__examples__/successful-save.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/builder-header/__examples__/after-successful-save.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/builder-header/__examples__/failed-save.jsx'),
	],
	'button-group': [
		require('raw-loader!@salesforce/design-system-react/components/button-group/__examples__/more-icon.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/button-group/__examples__/icon-group.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/button-group/__examples__/list-variant.jsx'),
	],
	'button-stateful': [
		require('raw-loader!@salesforce/design-system-react/components/button-stateful/__examples__/icon.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/button-stateful/__examples__/icon-text.jsx'),
	],
	button: [
		require('raw-loader!@salesforce/design-system-react/components/button/__examples__/base-neutral.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/button/__examples__/brand-disabled-destructive-inverse.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/button/__examples__/button-icons.jsx'),
	],
	card: [
		require('raw-loader!@salesforce/design-system-react/components/card/__examples__/related-list-with-table.jsx'),
	],
	carousel: [
		require('raw-loader!@salesforce/design-system-react/components/carousel/__examples__/three-items.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/carousel/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/carousel/__examples__/default-with-navigation.jsx'),
	],
	checkbox: [
		require('raw-loader!@salesforce/design-system-react/components/checkbox/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/checkbox/__examples__/error.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/checkbox/__examples__/toggle.jsx'),
	],
	'color-picker': [
		require('raw-loader!@salesforce/design-system-react/components/color-picker/__examples__/default.jsx'),
	],
	combobox: [
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/base-menu-subheader.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/base-inherit-menu-width.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/base-predefined-options-only.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/dialog.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/inline-multiple.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/inline-single.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/inline-single-entity-combobox.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/inline-single-search-add-entities.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/inline-multiple-loading.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/readonly-single.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/readonly-multiple.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/required-input-error-state.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/combobox/__examples__/dialog.jsx'),
	],
	'data-table': [
		require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/basic-fluid.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/basic-fluid-striped.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/basic-fluid-no-row-hover.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/basic-fluid-column-bordered.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/basic-fixed-layout.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/advanced.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/advanced-single-select.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/fixed-header.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/data-table/__examples__/joined-with-page-header.jsx'),
	],
	'date-picker': [
		require('raw-loader!@salesforce/design-system-react/components/date-picker/__examples__/default.jsx'),
	],
	'dynamic-icon': [
		require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/ellie.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/eq.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/score.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/strength.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/trend.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/typing.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/dynamic-icon/__examples__/waffle.jsx'),
	],
	'expandable-section': [
		require('raw-loader!@salesforce/design-system-react/components/expandable-section/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/expandable-section/__examples__/controlled.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/expandable-section/__examples__/non-collapsible.jsx'),
	],
	expression: [
		require('raw-loader!@salesforce/design-system-react/components/expression/__examples__/resource-selected.jsx'),
	],
	files: [
		require('raw-loader!@salesforce/design-system-react/components/files/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/files/__examples__/crops.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/files/__examples__/loading.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/files/__examples__/no-title.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/files/__examples__/with-external-icon.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/files/__examples__/no-image.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/files/__examples__/actions.jsx'),
	],
	filter: [
		require('raw-loader!@salesforce/design-system-react/components/filter/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/filter/__examples__/new.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/filter/__examples__/error.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/filter/__examples__/locked.jsx'),
	],
	'global-header': [
		require('raw-loader!@salesforce/design-system-react/components/global-header/__examples__/default.jsx'),
	],
	'global-navigation-bar': [
		require('raw-loader!@salesforce/design-system-react/components/global-navigation-bar/__examples__/default.jsx'),
	],
	icon: [
		require('raw-loader!@salesforce/design-system-react/components/icon/__examples__/categories.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/icon/__examples__/colors.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/icon/__examples__/sizes.jsx'),
	],
	illustration: [
		require('raw-loader!@salesforce/design-system-react/components/illustration/__examples__/small-image-text.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/illustration/__examples__/large-image-text.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/illustration/__examples__/heading-message.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/illustration/__examples__/heading-only.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/illustration/__examples__/message-only.jsx'),
	],
	input: [
		require('raw-loader!@salesforce/design-system-react/components/input/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/input/__examples__/icons.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/input/__examples__/error.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/input/__examples__/inactiveInputs.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/input/__examples__/inline-help.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/input/__examples__/field-level-help.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/input/__examples__/counter-input.jsx'),
	],
	'media-object': [
		require('raw-loader!@salesforce/design-system-react/components/media-object/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/media-object/__examples__/vertically-centered.jsx'),
	],
	'menu-dropdown': [
		require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/default-icon-label.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/default-right-to-left.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/sub-heading.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/custom-trigger.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/checkmark.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/menu-dropdown/__examples__/with-tooltips.jsx'),
	],
	modal: [
		require('raw-loader!@salesforce/design-system-react/components/modal/__examples__/menu-contents.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/modal/__examples__/header-footer.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/modal/__examples__/taglines.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/modal/__examples__/prompt.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/modal/__examples__/sizes.jsx'),
	],
	'page-header': [
		require('raw-loader!@salesforce/design-system-react/components/page-header/__examples__/record-home.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/page-header/__examples__/object-home.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/page-header/__examples__/related-list.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/page-header/__examples__/setup.jsx'),
	],
	panel: [
		require('raw-loader!@salesforce/design-system-react/components/panel/__examples__/filtering.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/panel/__examples__/filtering-locked.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/panel/__examples__/filtering-error.jsx'),
	],
	'pill-container': [
		require('raw-loader!@salesforce/design-system-react/components/pill-container/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/pill-container/__examples__/icons.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/pill-container/__examples__/avatars.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/pill-container/__examples__/bare.jsx'),
	],
	pill: [
		require('raw-loader!@salesforce/design-system-react/components/pill/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/pill/__examples__/icon.jsx'),
	],
	popover: [
		require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/header.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/alternative-header.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/controlled-with-footer.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/custom-target.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/error.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/walkthrough.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/walkthrough-action.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/warning.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/popover/__examples__/edit-dialog.jsx'),
	],
	'progress-bar': [
		require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/descriptive.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/color.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/radius.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/thickness.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/progress-bar/__examples__/vertical.jsx'),
	],
	'progress-indicator': [
		require('raw-loader!@salesforce/design-system-react/components/progress-indicator/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/progress-indicator/__examples__/vertical.jsx'),
	],
	'progress-ring': [
		require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/complete.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/warning.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/expired.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/active.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/progress-ring/__examples__/customIcon.jsx'),
	],
	'radio-button-group': [
		require('raw-loader!@salesforce/design-system-react/components/radio-button-group/__examples__/base.jsx'),
	],
	'radio-group': [
		require('raw-loader!@salesforce/design-system-react/components/radio-group/__examples__/base.jsx'),
	],
	radio: [
		require('raw-loader!@salesforce/design-system-react/components/radio/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/radio/__examples__/disabled.jsx'),
	],
	'scoped-notification': [
		require('raw-loader!@salesforce/design-system-react/components/scoped-notification/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/scoped-notification/__examples__/light.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/scoped-notification/__examples__/dark.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/scoped-notification/__examples__/custom-icon.jsx'),
	],
	'setup-assistant': [
		require('raw-loader!@salesforce/design-system-react/components/setup-assistant/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/setup-assistant/__examples__/step-progress.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/setup-assistant/__examples__/hub-expandable-steps.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/setup-assistant/__examples__/card.jsx'),
	],
	slider: [
		require('raw-loader!@salesforce/design-system-react/components/slider/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/slider/__examples__/disabled.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/slider/__examples__/error.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/slider/__examples__/sizes.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/slider/__examples__/vertical.jsx'),
	],
	spinner: [
		require('raw-loader!@salesforce/design-system-react/components/spinner/__examples__/default.jsx'),
	],
	'split-view': [
		require('raw-loader!@salesforce/design-system-react/components/split-view/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/split-view/__examples__/base-multiple.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/split-view/__examples__/external-state.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/split-view/__examples__/custom-items-list.jsx'),
	],
	tabs: [
		require('raw-loader!@salesforce/design-system-react/components/tabs/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/tabs/__examples__/scoped.jsx'),
	],
	textarea: [
		require('raw-loader!@salesforce/design-system-react/components/textarea/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/textarea/__examples__/error.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/textarea/__examples__/disabled.jsx'),
	],
	'time-picker': [
		require('raw-loader!@salesforce/design-system-react/components/time-picker/__examples__/default.jsx'),
	],
	toast: [
		require('raw-loader!@salesforce/design-system-react/components/toast/__examples__/info.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/toast/__examples__/success.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/toast/__examples__/warning.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/toast/__examples__/error.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/toast/__examples__/error-with-details.jsx'),
	],
	tooltip: [
		require('raw-loader!@salesforce/design-system-react/components/tooltip/__examples__/base.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/tooltip/__examples__/button.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/tooltip/__examples__/button-group.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/tooltip/__examples__/learn-more.jsx'),
	],
	tree: [
		require('raw-loader!@salesforce/design-system-react/components/tree/__examples__/default.jsx'),
	],
	'trial-bar': [
		require('raw-loader!@salesforce/design-system-react/components/trial-bar/__examples__/default.jsx'),
	],
	'vertical-navigation': [
		require('raw-loader!@salesforce/design-system-react/components/vertical-navigation/__examples__/default.jsx'),
	],
	'visual-picker': [
		require('raw-loader!@salesforce/design-system-react/components/visual-picker/__examples__/coverable.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/visual-picker/__examples__/non-coverable.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/visual-picker/__examples__/vertical.jsx'),
	],
	'welcome-mat': [
		require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/default.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/steps-complete.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/info-only.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/splash.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/trailhead.jsx'),
		require('raw-loader!@salesforce/design-system-react/components/welcome-mat/__examples__/trailhead-complete.jsx'),
	],
};

module.exports = documentationSiteLiveExamples;
