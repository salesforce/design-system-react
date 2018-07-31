// This object is imported into the documentation site. An example for the documentation site should be part of the pull request for the component. The object key is the kabob case of the "URL folder". In the case of `http://localhost:8080/components/app-launcher/`, `app-launcher` is the `key`. The folder name is created by `components.component` value in `package.json`. The following uses webpack's raw-loader plugin to get "text files" that will be eval()'d by CodeMirror within the documentation site on page load.

/* eslint-env node */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

const documentationSiteLiveExamples = {
	accordion: require('@salesforce/design-system-react/components/accordion/__docs__/site-stories.js'),
	alert: require('@salesforce/design-system-react/components/alert/__docs__/site-stories.js'),
	'app-launcher': require('@salesforce/design-system-react/components/app-launcher/__docs__/site-stories.js'),
	avatar: require('@salesforce/design-system-react/components/avatar/__docs__/site-stories.js'),
	breadcrumb: require('@salesforce/design-system-react/components/breadcrumb/__docs__/site-stories.js'),
	button: require('@salesforce/design-system-react/components/button/__docs__/site-stories.js'),
	'button-group': require('@salesforce/design-system-react/components/button-group/__docs__/site-stories.js'),
	'button-stateful': require('@salesforce/design-system-react/components/button-stateful/__docs__/site-stories.js'),
	card: require('@salesforce/design-system-react/components/card/__docs__/site-stories.js'),
	combobox: require('@salesforce/design-system-react/components/combobox/__docs__/site-stories.js'),
	filter: require('@salesforce/design-system-react/components/filter/__docs__/site-stories.js'),
	checkbox: require('@salesforce/design-system-react/components/checkbox/__docs__/site-stories.js'),
	'data-table': require('@salesforce/design-system-react/components/data-table/__docs__/site-stories.js'),
	'date-picker': require('@salesforce/design-system-react/components/date-picker/__docs__/site-stories.js'),
	icon: require('@salesforce/design-system-react/components/icon/__docs__/site-stories.js'),
	illustration: require('@salesforce/design-system-react/components/illustration/__docs__/site-stories.js'),
	input: require('@salesforce/design-system-react/components/input/__docs__/site-stories.js'),
	textarea: require('@salesforce/design-system-react/components/textarea/__docs__/site-stories.js'),
	'global-header': require('@salesforce/design-system-react/components/global-header/__docs__/site-stories.js'),
	'global-navigation-bar': require('@salesforce/design-system-react/components/global-navigation-bar/__docs__/site-stories.js'),
	'icon-settings': require('@salesforce/design-system-react/components/icon-settings/__docs__/site-stories.js'),
	lookup: require('@salesforce/design-system-react/components/lookup/__docs__/site-stories.js'),
	'media-object': require('@salesforce/design-system-react/components/media-object/__docs__/site-stories.js'),
	'menu-dropdown': require('@salesforce/design-system-react/components/menu-dropdown/__docs__/site-stories.js'),
	'menu-picklist': require('@salesforce/design-system-react/components/menu-picklist/__docs__/site-stories.js'),
	modal: require('@salesforce/design-system-react/components/modal/__docs__/site-stories.js'),
	navigation: require('@salesforce/design-system-react/components/navigation/__docs__/site-stories.js'),
	notification: require('@salesforce/design-system-react/components/notification/__docs__/site-stories.js'),
	'page-header': require('@salesforce/design-system-react/components/page-header/__docs__/site-stories.js'),
	panel: require('@salesforce/design-system-react/components/panel/__docs__/site-stories.js'),
	pill: require('@salesforce/design-system-react/components/pill/__docs__/site-stories.js'),
	popover: require('@salesforce/design-system-react/components/popover/__docs__/site-stories.js'),
	'progress-indicator': require('@salesforce/design-system-react/components/progress-indicator/__docs__/site-stories.js'),
	'progress-ring': require('@salesforce/design-system-react/components/progress-ring/__docs__/site-stories.js'),
	'radio-button-group': require('@salesforce/design-system-react/components/radio-button-group/__docs__/site-stories.js'),
	'radio-group': require('@salesforce/design-system-react/components/radio-group/__docs__/site-stories.js'),
	radio: require('@salesforce/design-system-react/components/radio/__docs__/site-stories.js'),
	tabs: require('@salesforce/design-system-react/components/tabs/__docs__/site-stories.js'),
	slider: require('@salesforce/design-system-react/components/slider/__docs__/site-stories.js'),
	spinner: require('@salesforce/design-system-react/components/spinner/__docs__/site-stories.js'),
	'split-view': require('@salesforce/design-system-react/components/split-view/__docs__/site-stories.js'),
	'time-picker': require('@salesforce/design-system-react/components/time-picker/__docs__/site-stories.js'),
	toast: require('@salesforce/design-system-react/components/toast/__docs__/site-stories.js'),
	tooltip: require('@salesforce/design-system-react/components/tooltip/__docs__/site-stories.js'),
	tree: require('@salesforce/design-system-react/components/tree/__docs__/site-stories.js'),
};

module.exports = documentationSiteLiveExamples;
