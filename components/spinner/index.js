define(['module', 'react', 'prop-types', 'classnames', '../../utilities/constants'], function (module, _react, _propTypes, _classnames, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// ### Prop Types
	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// # Spinner Component --- SLDS for React

	// Implements the [Spinner design pattern - 2.1.0-beta.3 (204)](https://latest-204.lightningdesignsystem.com/components/spinners) in React.

	// ### React
	var PROP_TYPES = {
		/**
   * Custom css classes applied to Spinner container
   */
		containerClassName: _propTypes2.default.string,
		/**
   * Determines the size of the spinner
   */
		size: _propTypes2.default.oneOf(['small', 'medium', 'large']),
		/**
   * Determines the color of the spinner: `base` is gray, `brand` is blue, and `inverse` is white.
   */
		variant: _propTypes2.default.oneOf(['base', 'brand', 'inverse'])
	};

	// ## Constants


	var DEFAULT_PROPS = {
		size: 'medium',
		variant: 'base'
	};

	// ## Spinner
	var Spinner = function Spinner(props) {
		var containerClassName = props.containerClassName,
		    variant = props.variant,
		    size = props.size;


		var sizeClass = 'slds-spinner--' + size;
		var variants = {
			brand: 'slds-spinner--brand',
			inverse: 'slds-spinner--inverse'
		};

		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)(containerClassName, 'slds-spinner_container') },
			_react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-spinner', sizeClass, variants[variant]),
					'aria-hidden': 'false',
					role: 'alert'
				},
				_react2.default.createElement('div', { className: 'slds-spinner__dot-a' }),
				_react2.default.createElement('div', { className: 'slds-spinner__dot-b' })
			)
		);
	};

	Spinner.displayName = _constants.SPINNER;
	Spinner.propTypes = PROP_TYPES;
	Spinner.defaultProps = DEFAULT_PROPS;

	module.exports = Spinner;
});