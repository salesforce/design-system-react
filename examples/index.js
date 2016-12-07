// This object is imported into the documentation site. An example for the documentation site should be part of the pull request for the component. The object key is the kabob case of the "URL folder". In the case of `http://localhost:8080/components/app-launcher/`, `app-launcher` is the `key`. The folder name is created by `components.component` value in `package.json`. Keep in mind, some components like `forms/checkbox` will be changed to `forms-checkbox`. The following uses webpack's raw-loader plugin to get "text files" that will be eval()'d by CodeMirror within the documentation site

const Snippets = {
	'app-launcher': [
		require('raw-loader!design-system-react/examples/app-launcher/default.jsx')
	],
	'bread-crumb': [
		require('raw-loader!design-system-react/examples/bread-crumb/base.jsx'),
		require('raw-loader!design-system-react/examples/bread-crumb/one-item.jsx')
	],
	button: [
		require('raw-loader!design-system-react/examples/button/base-neutral.jsx'),
		require('raw-loader!design-system-react/examples/button/brand-disabled-destructive-inverse.jsx'),
		require('raw-loader!design-system-react/examples/button/button-icons.jsx')
	],
	'button-group': [
		require('raw-loader!design-system-react/examples/button-group/more-icon.jsx'),
		require('raw-loader!design-system-react/examples/button-group/icon-group.jsx')
	],
	'button-stateful': [
		require('raw-loader!design-system-react/examples/button-stateful/icon.jsx'),
		require('raw-loader!design-system-react/examples/button-stateful/icon-text.jsx')
	],
	card: [
		require('raw-loader!design-system-react/examples/card/related-list-with-table.jsx')
	],
	'forms-checkbox': [
		require('raw-loader!design-system-react/examples/forms/checkbox/default.jsx')
	],
	'data-table': [
		require('raw-loader!design-system-react/examples/data-table/basic.jsx'),
		require('raw-loader!design-system-react/examples/data-table/advanced.jsx')
	],
	'date-picker': [
		require('raw-loader!design-system-react/examples/date-picker/example-1.jsx')
	],
	icon: [
		require('raw-loader!design-system-react/examples/icon/example-1.jsx')
	],
	'forms-input-inline': [
		require('raw-loader!design-system-react/examples/forms/input/inline/example-1.jsx')
	],
	'forms-input': [
		require('raw-loader!design-system-react/examples/forms/input/example-1.jsx'),
		require('raw-loader!design-system-react/examples/forms/input/example-2.jsx'),
		require('raw-loader!design-system-react/examples/forms/input/example-3.jsx'),
		require('raw-loader!design-system-react/examples/forms/input/example-4.jsx')
	],
	'global-header': [
		require('raw-loader!design-system-react/examples/global-header/example-1.jsx')
	],
	'global-navigation-bar': [
		require('raw-loader!design-system-react/examples/global-navigation-bar/example-1.jsx')
	],
	lookup: [
		require('raw-loader!design-system-react/examples/lookup/example-1.jsx'),
		require('raw-loader!design-system-react/examples/lookup/example-2.jsx'),
		require('raw-loader!design-system-react/examples/lookup/example-3.jsx')
	],
	'media-object': [
		require('raw-loader!design-system-react/examples/media-object/example-1.jsx')
	],
	'menu-dropdown': [
		require('raw-loader!design-system-react/examples/menu-dropdown/example-1.jsx'),
		require('raw-loader!design-system-react/examples/menu-dropdown/example-2.jsx')
	],
	'menu-picklist': [
		require('raw-loader!design-system-react/examples/menu-picklist/example-1.jsx'),
		require('raw-loader!design-system-react/examples/menu-picklist/example-2.jsx')
	],
	modal: [
		require('raw-loader!design-system-react/examples/modal/example-1.jsx'),
		require('raw-loader!design-system-react/examples/modal/example-2.jsx'),
		require('raw-loader!design-system-react/examples/modal/example-3.jsx')
	],
	notification: [
		require('raw-loader!design-system-react/examples/notification/example-1.jsx'),
		require('raw-loader!design-system-react/examples/notification/example-2.jsx'),
		require('raw-loader!design-system-react/examples/notification/example-3.jsx')
	],
	'page-header': [
		require('raw-loader!design-system-react/examples/page-header/example-1.jsx'),
		require('raw-loader!design-system-react/examples/page-header/example-2.jsx'),
		require('raw-loader!design-system-react/examples/page-header/example-3.jsx'),
		require('raw-loader!design-system-react/examples/page-header/example-4.jsx')
	],
	'popover-tooltip': [
		require('raw-loader!design-system-react/examples/popover-tooltip/example-1.jsx'),
		require('raw-loader!design-system-react/examples/popover-tooltip/example-2.jsx'),
		require('raw-loader!design-system-react/examples/popover-tooltip/example-3.jsx')
	],
	tabs: [
		require('raw-loader!design-system-react/examples/tabs/example-1.jsx'),
		require('raw-loader!design-system-react/examples/tabs/example-2.jsx')
	],
	'time-picker': [
		require('raw-loader!design-system-react/examples/time-picker/example-1.jsx')
	],
	tree: [
		require('raw-loader!design-system-react/examples/tree/example-1.jsx')
	]
};

module.exports = Snippets;
