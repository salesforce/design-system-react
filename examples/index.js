// This object is imported into the documentation site. An example for the documentation site should be part of the pull request for the component. The object key is the kabob case of the "URL folder". In the case of `http://localhost:8080/components/app-launcher/`, `app-launcher` is the `key`. The folder name is created by `components.component` value in `package.json`. Keep in mind, some components like `forms/checkbox` will be changed to `forms-checkbox`. The following uses webpack's raw-loader plugin to get "text files" that will be eval()'d by CodeMirror within the documentation site

const Snippets = {
	'app-launcher': [
		require('raw-loader!design-system-react/examples/app-launcher/example-1.js')
	],
	'bread-crumb': [
		require('raw-loader!design-system-react/examples/bread-crumb/example-1.js')
	],
	button: [
		require('raw-loader!design-system-react/examples/button/example-1.js'),
		require('raw-loader!design-system-react/examples/button/example-2.js'),
		require('raw-loader!design-system-react/examples/button/example-3.js')
	],
	'button-group': [
		require('raw-loader!design-system-react/examples/button-group/example-1.js'),
		require('raw-loader!design-system-react/examples/button-group/example-2.js')
	],
	'button-stateful': [
		require('raw-loader!design-system-react/examples/button-stateful/example-1.js'),
		require('raw-loader!design-system-react/examples/button-stateful/example-2.js')
	],
	card: [
		require('raw-loader!design-system-react/examples/card/example-1.js')
	],
	'forms-checkbox': [
		require('raw-loader!design-system-react/examples/forms-checkbox/example-1.js')
	],
	'data-table': [
		require('raw-loader!design-system-react/examples/data-table/example-1.js'),
		require('raw-loader!design-system-react/examples/data-table/example-2.js')
	],
	'date-picker': [
		require('raw-loader!design-system-react/examples/date-picker/example-1.js')
	],
	icon: [
		require('raw-loader!design-system-react/examples/icon/example-1.js')
	],
	'forms-input-inline': [
		require('raw-loader!design-system-react/examples/forms-input-inline/example-1.js')
	],
	'forms-input': [
		require('raw-loader!design-system-react/examples/forms-input/example-1.js'),
		require('raw-loader!design-system-react/examples/forms-input/example-2.js'),
		require('raw-loader!design-system-react/examples/forms-input/example-3.js'),
		require('raw-loader!design-system-react/examples/forms-input/example-4.js')
	],
	'global-header': [
		require('raw-loader!design-system-react/examples/global-header/example-1.js')
	],
	'global-navigation-bar': [
		require('raw-loader!design-system-react/examples/global-navigation-bar/example-1.js')
	],
	lookup: [
		require('raw-loader!design-system-react/examples/lookup/example-1.js'),
		require('raw-loader!design-system-react/examples/lookup/example-2.js'),
		require('raw-loader!design-system-react/examples/lookup/example-3.js')
	],
	'media-object': [
		require('raw-loader!design-system-react/examples/media-object/example-1.js')
	],
	'menu-dropdown': [
		require('raw-loader!design-system-react/examples/menu-dropdown/example-1.js'),
		require('raw-loader!design-system-react/examples/menu-dropdown/example-2.js')
	],
	'menu-picklist': [
		require('raw-loader!design-system-react/examples/menu-picklist/example-1.js'),
		require('raw-loader!design-system-react/examples/menu-picklist/example-2.js')
	],
	modal: [
		require('raw-loader!design-system-react/examples/modal/example-1.js'),
		require('raw-loader!design-system-react/examples/modal/example-2.js'),
		require('raw-loader!design-system-react/examples/modal/example-3.js')
	],
	notification: [
		require('raw-loader!design-system-react/examples/notification/example-1.js'),
		require('raw-loader!design-system-react/examples/notification/example-2.js'),
		require('raw-loader!design-system-react/examples/notification/example-3.js')
	],
	'page-header': [
		require('raw-loader!design-system-react/examples/page-header/example-1.js'),
		require('raw-loader!design-system-react/examples/page-header/example-2.js'),
		require('raw-loader!design-system-react/examples/page-header/example-3.js'),
		require('raw-loader!design-system-react/examples/page-header/example-4.js')
	],
	'popover-tooltip': [
		require('raw-loader!design-system-react/examples/popover-tooltip/example-1.js'),
		require('raw-loader!design-system-react/examples/popover-tooltip/example-2.js'),
		require('raw-loader!design-system-react/examples/popover-tooltip/example-3.js')
	],
	tabs: [
		require('raw-loader!design-system-react/examples/tabs/example-1.js'),
		require('raw-loader!design-system-react/examples/tabs/example-2.js')
	],
	'time-picker': [
		require('raw-loader!design-system-react/examples/time-picker/example-1.js')
	],
	tree: [
		require('raw-loader!design-system-react/examples/tree/example-1.js')
	]
};

module.exports = Snippets;
