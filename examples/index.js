// Uses webpack's raw-loader plugin to get "text files" that will be eval()'d by CodeMirror

const Snippets = {
	'app-launcher': [
		require('raw-loader!design-system-react/examples/app-launcher-examples-1.js')
	],
	'bread-crumb': [
		require('raw-loader!design-system-react/examples/bread-crumb-examples-1.js')
	],
	button: [
		require('raw-loader!design-system-react/examples/button-examples-1.js'),
		require('raw-loader!design-system-react/examples/button-examples-2.js'),
		require('raw-loader!design-system-react/examples/button-examples-3.js')
	],
	'button-group': [
		require('raw-loader!design-system-react/examples/button-group-examples-1.js'),
		require('raw-loader!design-system-react/examples/button-group-examples-2.js')
	],
	'button-stateful': [
		require('raw-loader!design-system-react/examples/button-stateful-examples-1.js'),
		require('raw-loader!design-system-react/examples/button-stateful-examples-2.js')
	],
	card: [
		require('raw-loader!design-system-react/examples/card-examples-1.js')
	],
	'forms-checkbox': [
		require('raw-loader!design-system-react/examples/forms-checkbox-examples-1.js')
	],
	'data-table': [
		require('raw-loader!design-system-react/examples/data-table-examples-1.js'),
		require('raw-loader!design-system-react/examples/data-table-examples-2.js')
	],
	'date-picker': [
		require('raw-loader!design-system-react/examples/date-picker-examples-1.js')
	],
	icon: [
		require('raw-loader!design-system-react/examples/icon-examples-1.js')
	],
	'forms-input-inline': [
		require('raw-loader!design-system-react/examples/forms-input-inline-examples-1.js')
	],
	'forms-input': [
		require('raw-loader!design-system-react/examples/forms-input-examples-1.js'),
		require('raw-loader!design-system-react/examples/forms-input-examples-2.js'),
		require('raw-loader!design-system-react/examples/forms-input-examples-3.js'),
		require('raw-loader!design-system-react/examples/forms-input-examples-4.js')
	],
	'global-header': [
		require('raw-loader!design-system-react/examples/global-header-examples-1.js')
	],
	'global-navigation-bar': [
		require('raw-loader!design-system-react/examples/global-navigation-bar-examples-1.js')
	],
	lookup: [
		require('raw-loader!design-system-react/examples/lookup-examples-1.js'),
		require('raw-loader!design-system-react/examples/lookup-examples-2.js'),
		require('raw-loader!design-system-react/examples/lookup-examples-3.js')
	],
	'media-object': [
		require('raw-loader!design-system-react/examples/media-object-examples-1.js')
	],
	'menu-dropdown': [
		require('raw-loader!design-system-react/examples/menu-dropdown-examples-1.js'),
		require('raw-loader!design-system-react/examples/menu-dropdown-examples-2.js')
	],
	'menu-picklist': [
		require('raw-loader!design-system-react/examples/menu-picklist-examples-1.js'),
		require('raw-loader!design-system-react/examples/menu-picklist-examples-2.js')
	],
	modal: [
		require('raw-loader!design-system-react/examples/modal-examples-1.js'),
		require('raw-loader!design-system-react/examples/modal-examples-2.js'),
		require('raw-loader!design-system-react/examples/modal-examples-3.js')
	],
	notification: [
		require('raw-loader!design-system-react/examples/notification-examples-1.js'),
		require('raw-loader!design-system-react/examples/notification-examples-2.js'),
		require('raw-loader!design-system-react/examples/notification-examples-3.js')
	],
	'page-header': [
		require('raw-loader!design-system-react/examples/page-header-examples-1.js'),
		require('raw-loader!design-system-react/examples/page-header-examples-2.js'),
		require('raw-loader!design-system-react/examples/page-header-examples-3.js'),
		require('raw-loader!design-system-react/examples/page-header-examples-4.js')
	],
	'popover-tooltip': [
		require('raw-loader!design-system-react/examples/popover-tooltip-examples-1.js'),
		require('raw-loader!design-system-react/examples/popover-tooltip-examples-2.js'),
		require('raw-loader!design-system-react/examples/popover-tooltip-examples-3.js')
	],
	tabs: [
		require('raw-loader!design-system-react/examples/tabs-examples-1.js'),
		require('raw-loader!design-system-react/examples/tabs-examples-2.js')
	],
	'time-picker': [
		require('raw-loader!design-system-react/examples/time-picker-examples-1.js')
	],
	tree: [
		require('raw-loader!design-system-react/examples/tree-examples-1.js')
	]
};

module.exports = Snippets;

