define(['exports', 'react', '../../../components/icon'], function (exports, _react, _icon) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.propSets = exports.dropdownCollection = undefined;

	var _react2 = _interopRequireDefault(_react);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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
					triggerName: 'App Name'
				}
			}
		},
		hybrid: {
			props: {
				openOn: 'hybrid'
			},
			primaryRegionProps: {
				appLauncher: {
					assistiveText: 'Open App Launcher',
					id: 'app-launcher-trigger',
					triggerName: 'App Name'
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
					triggerName: _react2.default.createElement(
						'div',
						{ className: 'slds-grid slds-grid--align-spread' },
						_react2.default.createElement(
							'div',
							null,
							'Marketing Cloud'
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(_icon2.default, {
								category: 'utility',
								className: 'slds-m-left--small slds-m-right--small',
								name: 'email',
								size: 'x-small'
							}),
							_react2.default.createElement(
								'span',
								{
									className: 'context-bar__label-action slds-text-body--regular',
									style: { fontWeight: 'normal' }
								},
								'Email Studio'
							)
						)
					)
				}
			}
		},
		lightTheme: {
			props: {
				theme: 'light'
			}
		},
		noNav: {
			props: {},
			primaryRegionProps: {
				appLauncher: {
					assistiveText: 'Open App Launcher',
					id: 'app-launcher-trigger',
					triggerName: 'App Name'
				}
			}
		}
	};

	exports.dropdownCollection = dropdownCollection;
	exports.propSets = propSets;
});