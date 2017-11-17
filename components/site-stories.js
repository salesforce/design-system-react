// This object is imported into the documentation site. An example for the documentation site should be part of the pull request for the component. The object key is the kabob case of the "URL folder". In the case of `http://localhost:8080/components/app-launcher/`, `app-launcher` is the `key`. The folder name is created by `components.component` value in `package.json`. Keep in mind, some components like `forms/checkbox` will be changed to `forms-checkbox`. The following uses webpack's raw-loader plugin to get "text files" that will be eval()'d by CodeMirror within the documentation site on page load.

/* eslint-env node */
/* eslint-disable global-require */

const documentationSiteLiveExamples = {
	accordion: require('design-system-react/components/accordion/__docs__/site-stories.js'),
	alert: require('design-system-react/components/alert/__docs__/site-stories.js'),
	'app-launcher': require('design-system-react/components/app-launcher/__docs__/site-stories.js'),
	avatar: require('design-system-react/components/avatar/__docs__/site-stories.js'),
	breadcrumb: require('design-system-react/components/breadcrumb/__docs__/site-stories.js'),
	button: require('design-system-react/components/button/__docs__/site-stories.js'),
	'button-group': require('design-system-react/components/button-group/__docs__/site-stories.js'),
	'button-stateful': [
		require('raw-loader!design-system-react/components/button-stateful/__examples__/icon.jsx'),
		require('raw-loader!design-system-react/components/button-stateful/__examples__/icon-text.jsx')
	]
	// card: [
	// 	require('raw-loader!design-system-react/components/card/__examples__/related-list-with-table.jsx')
	// ],
	// combobox: [
	// 	require('raw-loader!design-system-react/components/combobox/__examples__/base.jsx'),
	// 	require('raw-loader!design-system-react/components/combobox/__examples__/base-predefined-options-only.jsx'),
	// 	require('raw-loader!design-system-react/components/combobox/__examples__/inline-multiple.jsx'),
	// 	require('raw-loader!design-system-react/components/combobox/__examples__/inline-single.jsx'),
	// 	require('raw-loader!design-system-react/components/combobox/__examples__/readonly-single.jsx'),
	// 	require('raw-loader!design-system-react/components/combobox/__examples__/readonly-multiple.jsx')
	// ],
	// filter: [
	// 	require('raw-loader!design-system-react/components/filter/__examples__/default.jsx'),
	// 	require('raw-loader!design-system-react/components/filter/__examples__/new.jsx'),
	// 	require('raw-loader!design-system-react/components/filter/__examples__/error.jsx'),
	// 	require('raw-loader!design-system-react/components/filter/__examples__/locked.jsx')
	// ],
	// 'forms-checkbox': [
	// 	require('raw-loader!design-system-react/components/forms/checkbox/__examples__/default.jsx'),
	// 	require('raw-loader!design-system-react/components/forms/checkbox/__examples__/error.jsx'),
	// 	require('raw-loader!design-system-react/components/forms/checkbox/__examples__/toggle.jsx')
	// ],
	// 'data-table': [
	// 	require('raw-loader!design-system-react/components/data-table/__examples__/basic.jsx'),
	// 	require('raw-loader!design-system-react/components/data-table/__examples__/advanced.jsx')
	// ],
	// 'date-picker': [
	// 	require('raw-loader!design-system-react/components/date-picker/__examples__/default.jsx')
	// ],
	// icon: [
	// 	require('raw-loader!design-system-react/components/icon/__examples__/categories.jsx'),
	// 	require('raw-loader!design-system-react/components/icon/__examples__/colors.jsx'),
	// 	require('raw-loader!design-system-react/components/icon/__examples__/sizes.jsx')
	// ],
	// 'forms-input-inline': [
	// 	require('raw-loader!design-system-react/components/forms/input/inline/__examples__/default.jsx')
	// ],
	// 'forms-input': [
	// 	require('raw-loader!design-system-react/components/forms/input/__examples__/default.jsx'),
	// 	require('raw-loader!design-system-react/components/forms/input/__examples__/icons.jsx'),
	// 	require('raw-loader!design-system-react/components/forms/input/__examples__/error.jsx'),
	// 	require('raw-loader!design-system-react/components/forms/input/__examples__/inactiveInputs.jsx')
	// ],
	// 'forms-textarea': [
	// 	require('raw-loader!design-system-react/components/forms/textarea/__examples__/default.jsx'),
	// 	require('raw-loader!design-system-react/components/forms/textarea/__examples__/error.jsx'),
	// 	require('raw-loader!design-system-react/components/forms/textarea/__examples__/disabled.jsx')
	// ],
	// 'global-header': [
	// 	require('raw-loader!design-system-react/components/global-header/__examples__/default.jsx')
	// ],
	// 'global-navigation-bar': [
	// 	require('raw-loader!design-system-react/components/global-navigation-bar/__examples__/default.jsx')
	// ],
	// lookup: [
	// 	require('raw-loader!design-system-react/components/lookup/__examples__/default.jsx'),
	// 	require('raw-loader!design-system-react/components/lookup/__examples__/files.jsx'),
	// 	require('raw-loader!design-system-react/components/lookup/__examples__/with-selection.jsx')
	// ],
	// 'media-object': [
	// 	require('raw-loader!design-system-react/components/media-object/__examples__/default.jsx'),
	// 	require('raw-loader!design-system-react/components/media-object/__examples__/vertically-centered.jsx')
	// ],
	// 'menu-dropdown': [
	// 	require('raw-loader!design-system-react/components/menu-dropdown/__examples__/default.jsx'),
	// 	require('raw-loader!design-system-react/components/menu-dropdown/__examples__/sub-heading.jsx'),
	// 	require('raw-loader!design-system-react/components/menu-dropdown/__examples__/custom-trigger.jsx'),
	// 	require('raw-loader!design-system-react/components/menu-dropdown/__examples__/checkmark.jsx')
	// ],
	// 'menu-picklist': [
	// 	require('raw-loader!design-system-react/components/menu-picklist/__examples__/base.jsx'),
	// 	require('raw-loader!design-system-react/components/menu-picklist/__examples__/tooltip-list-item.jsx')
	// ],
	// modal: [
	// 	require('raw-loader!design-system-react/components/modal/__examples__/menu-contents.jsx'),
	// 	require('raw-loader!design-system-react/components/modal/__examples__/header-footer.jsx'),
	// 	require('raw-loader!design-system-react/components/modal/__examples__/taglines.jsx'),
	// 	require('raw-loader!design-system-react/components/modal/__examples__/prompt.jsx'),
	// 	require('raw-loader!design-system-react/components/modal/__examples__/sizes.jsx')
	// ],
	// navigation: [
	// 	require('raw-loader!design-system-react/components/navigation/__examples__/default.jsx'),
	// 	require('raw-loader!design-system-react/components/navigation/__examples__/shade.jsx')
	// ],
	// notification: [
	// 	require('raw-loader!design-system-react/components/notification/__examples__/alerts.jsx'),
	// 	require('raw-loader!design-system-react/components/notification/__examples__/toasts.jsx'),
	// 	require('raw-loader!design-system-react/components/notification/__examples__/within-modal.jsx')
	// ],
	// 'page-header': [
	// 	require('raw-loader!design-system-react/components/page-header/__examples__/record-home.jsx'),
	// 	require('raw-loader!design-system-react/components/page-header/__examples__/object-home.jsx'),
	// 	require('raw-loader!design-system-react/components/page-header/__examples__/related-list.jsx')
	// ],
	// panel: [
	// 	require('raw-loader!design-system-react/components/panel/__examples__/filtering.jsx'),
	// 	require('raw-loader!design-system-react/components/panel/__examples__/filtering-locked.jsx'),
	// 	require('raw-loader!design-system-react/components/panel/__examples__/filtering-error.jsx')
	// ],
	// popover: [
	// 	require('raw-loader!design-system-react/components/popover/__examples__/header.jsx'),
	// 	require('raw-loader!design-system-react/components/popover/__examples__/alternative-header.jsx'),
	// 	require('raw-loader!design-system-react/components/popover/__examples__/controlled-with-footer.jsx')
	// ],
	// 'progress-indicator': [
	// 	require('raw-loader!design-system-react/components/progress-indicator/__examples__/default.jsx')
	// ],
	// 'radio-button-group': [
	// 	require('raw-loader!design-system-react/components/radio-button-group/__examples__/base.jsx')
	// ],
	// 'radio-group': [
	// 	require('raw-loader!design-system-react/components/radio-group/__examples__/base.jsx')
	// ],
	// 'forms-radio': [
	// 	require('raw-loader!design-system-react/components/forms/radio/__examples__/default.jsx'),
	// 	require('raw-loader!design-system-react/components/forms/radio/__examples__/disabled.jsx')
	// ],
	// tabs: [
	// 	require('raw-loader!design-system-react/components/tabs/__examples__/default.jsx'),
	// 	require('raw-loader!design-system-react/components/tabs/__examples__/scoped.jsx')
	// ],
	// 'time-picker': [
	// 	require('raw-loader!design-system-react/components/time-picker/__examples__/default.jsx')
	// ],
	// toast: [
	// 	require('raw-loader!design-system-react/components/toast/__examples__/info.jsx'),
	// 	require('raw-loader!design-system-react/components/toast/__examples__/success.jsx'),
	// 	require('raw-loader!design-system-react/components/toast/__examples__/warning.jsx'),
	// 	require('raw-loader!design-system-react/components/toast/__examples__/error.jsx'),
	// 	require('raw-loader!design-system-react/components/toast/__examples__/error-with-details.jsx')
	// ],
	// tooltip: [
	// 	require('raw-loader!design-system-react/components/tooltip/__examples__/base.jsx'),
	// 	require('raw-loader!design-system-react/components/tooltip/__examples__/button.jsx'),
	// 	require('raw-loader!design-system-react/components/tooltip/__examples__/button-group.jsx')
	// ],
	// tree: [require('raw-loader!design-system-react/components/tree/__examples__/default.jsx')]
};

module.exports = documentationSiteLiveExamples;
