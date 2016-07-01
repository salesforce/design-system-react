'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('../../../components/icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

var dropdownCollection = [{
	label: 'Menu Item One',
	value: '1',
	iconCategory: 'utility',
	iconName: 'table',
	href: 'http://www.google.com'
}, {
	label: 'Menu Item Two',
	value: '2',
	iconCategory: 'utility',
	iconName: 'kanban',
	href: 'http://www.google.com'
}, {
	label: 'Menu Item Three',
	value: '3',
	iconCategory: 'utility',
	iconName: 'side_list',
	href: 'http://www.google.com'
}];

var propSets = {
	base: {
		props: {},
		primaryRegionProps: {
			appLauncher: {
				assistiveText: 'Open App Launcher',
				id: 'app-launcher-trigger',
				name: 'App Name'
			}
		}
	},
	customCloud: {
		props: {
			cloud: 'marketing'
		},
		primaryRegionProps: {
			truncate: false,
			appLauncher: {
				assistiveText: 'Open App Launcher',
				id: 'app-launcher-trigger',
				noTruncate: true,
				customChild: function customChild() {
					return _react2.default.createElement(
						'span',
						null,
						'Marketing Cloud',
						_react2.default.createElement(_icon2.default, {
							category: 'utility',
							className: 'slds-m-left--small slds-m-right--small',
							name: 'email',
							inverse: true,
							size: 'small'
						}),
						'Email Studio'
					);
				}
			}
		}
	},
	lightTheme: {
		props: {
			theme: 'light'
		},
		primaryRegionProps: {
			appLauncher: {
				assistiveText: 'Open App Launcher',
				id: 'app-launcher-trigger',
				name: 'App Name'
			}
		}
	}
};

module.exports.dropdownCollection = dropdownCollection;
module.exports.propSets = propSets;