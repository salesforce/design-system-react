define(['exports', 'react', 'create-react-class', 'prop-types', 'classnames', '../../utilities/constants'], function (exports, _react, _createReactClass, _propTypes, _classnames, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.regions = undefined;

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// List regions for export


	// ### classNames
	var regions = ['primary', 'secondary', 'tertiary'];

	/* eslint-disable react/display-name */


	// ## Constants
	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// # Global Navigation Bar Region Component

	// ## Dependencies

	// ### React
	var renderPrimary = function renderPrimary(dividerClass, className, children) {
		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-context-bar__primary', dividerClass, className)
			},
			children
		);
	};

	var renderSecondary = function renderSecondary(dividerClass, className, children, navigation) {
		var region = void 0;

		if (navigation) {
			region = _react2.default.createElement(
				'nav',
				{
					className: (0, _classnames2.default)('slds-context-bar__secondary', dividerClass, className),
					role: 'navigation'
				},
				_react2.default.createElement(
					'ul',
					{ className: 'slds-grid' },
					children
				)
			);
		} else {
			region = _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-context-bar__secondary', dividerClass, className)
				},
				_react2.default.createElement(
					'ul',
					{ className: 'slds-grid' },
					children
				)
			);
		}
		return region;
	};

	var renderTertiary = function renderTertiary(dividerClass, className, children) {
		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-context-bar__tertiary', 'slds-col--bump-left', dividerClass, className)
			},
			_react2.default.createElement(
				'ul',
				{ className: 'slds-grid' },
				children
			)
		);
	};
	/* eslint-enable react/display-name */

	/**
  * Regions make up a GlobalNavigation Bar and typically contain links and dropdowns. The Primary region contains the AppSwitcher, Application Name, and Object Switcher. The secondary region typically has navigation betweens sections of the application. The tertiary region is aligned to the right side of the screen and contains shortcuts or actions.
  */
	var Region = (0, _createReactClass2.default)({
		displayName: _constants.GLOBAL_NAVIGATION_BAR_REGION,

		propTypes: {
			/**
    * Contents of region. Expects `GlobalNavigationBarLink`, `GlobalNavigationBarDropdown`, `GlobalNavigationBarApplicationName`, `AppSwitcher`, but could be any component. This is the place to pass in an Object Switcher until that is supported.
    */
			children: _propTypes2.default.node,
			/**
    * Determines position of separating bar.
    */
			dividerPosition: _propTypes2.default.oneOf(['left', 'right']),
			/**
    * CSS classes to be added to the region
    */
			className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
			/**
    * Wraps the `secondary` region in a `nav` and adds a role attribute
    */
			navigation: _propTypes2.default.bool,
			/**
    * Region wrap children in styling specific to that region.
    */
			region: _propTypes2.default.oneOf(['primary', 'secondary', 'tertiary']).isRequired
		},

		render: function render() {
			var region = void 0;
			var dividerClass = this.props.dividerPosition ? 'slds-context-bar__item--divider-' + this.props.dividerPosition : null;

			switch (this.props.region) {
				case 'primary':
					region = renderPrimary(dividerClass, this.props.className, this.props.children);
					break;
				case 'secondary':
					region = renderSecondary(dividerClass, this.props.className, this.props.children, this.props.navigation);
					break;
				case 'tertiary':
					region = renderTertiary(dividerClass, this.props.className, this.props.children);
					break;
				default:
				// do nothing
			}

			return region;
		}
	});

	exports.default = Region;
	exports.regions = regions;
});