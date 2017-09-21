'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A panel provides detailed contextual information or contextual filtering options. [Filter](/components/filters/) component should be used as children. Menus within a Filter Popover will need to not have "portal mounts" and be inline. */


// ### classNames
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Panel - Filter variant

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
var Panel = function Panel(_ref) {
	var children = _ref.children,
	    variant = _ref.variant;
	return _react2.default.createElement(
		'div',
		{
			className: (0, _classnames2.default)('slds-panel', 'slds-grid', 'slds-grid--vertical', 'slds-nowrap', {
				'slds-panel--filters': variant === 'filters'
			})
		},
		_react2.default.createElement(
			'div',
			{ className: 'slds-form--stacked slds-grow slds-scrollable--y slds-grid slds-grid--vertical' },
			children
		)
	);
};

// ## Constants


Panel.displayName = _constants.PANEL;

Panel.propTypes = {
	/**
  * The contents of the panel
  */
	children: _propTypes2.default.node,
	/**
  * The type of panel
  */
	variant: _propTypes2.default.oneOf(['filters'])
};

exports.default = Panel;