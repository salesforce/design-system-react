'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A default empty state for Cards.
 */
var CardEmpty = function CardEmpty(props) {
	return _react2.default.createElement(
		'div',
		{ className: 'slds-p-horizontal--small' },
		_react2.default.createElement(
			'div',
			{ className: 'slds-text-align--center slds-m-bottom--x-large' },
			_react2.default.createElement(
				'h3',
				{ className: 'slds-text-heading--small slds-p-top--large slds-p-bottom--large' },
				props.heading
			),
			props.children
		)
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
// React is an external dependency of the project.
CardEmpty.displayName = _constants.CARD_EMPTY;

// ### Prop Types
CardEmpty.propTypes = {
	/**
  * Additional call to actions that will render under the heading. Often this is an "Add Item" button.
  */
	children: _propTypes2.default.node,
	/**
  * Primary text for an Empty Card.
  */
	heading: _propTypes2.default.string
};

CardEmpty.defaultProps = {
	heading: 'No Related Items'
};

exports.default = CardEmpty;