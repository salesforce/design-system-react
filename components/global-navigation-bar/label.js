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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # GlobalNavigationBar Label Component

// ## Dependencies

// ### React


// ### classNames


// ## Constants


/**
 * Wraps text in the proper markup and removes link styling to support use in the GlobalNavigationBar.
 */
var GlobalNavigationBarLabel = function GlobalNavigationBarLabel(props) {
	// Separate props we care about in order to pass others along passively to the `span` tag
	var className = props.className,
	    dividerPosition = props.dividerPosition,
	    id = props.id,
	    label = props.label;


	return _react2.default.createElement(
		'li',
		{ className: 'slds-context-bar__item slds-no-hover' },
		_react2.default.createElement(
			'span',
			{
				id: id
				// inline style override
				, style: { color: '#16325c' },
				className: (0, _classnames2.default)('slds-context-bar__label-action', _defineProperty({}, 'slds-context-bar__item--divider-' + dividerPosition, dividerPosition), className)
			},
			_react2.default.createElement(
				'span',
				{ className: 'slds-truncate' },
				label
			)
		)
	);
};

GlobalNavigationBarLabel.displayName = _constants.GLOBAL_NAVIGATION_BAR_LABEL;

// ### Prop Types
GlobalNavigationBarLabel.propTypes = {
	/**
  * Class names to be added to the `span` element
  */
	className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * Determines position of separating bar.
  */
	dividerPosition: _propTypes2.default.oneOf(['left', 'right']),
	/**
  * Id string applied to first <span> inside of <li>
  */
	id: _propTypes2.default.string,
	/**
  * Text to show
  */
	label: _propTypes2.default.string
};

exports.default = GlobalNavigationBarLabel;