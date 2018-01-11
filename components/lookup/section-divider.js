'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var displayName = 'LookupDefaultSectionDivider';
var propTypes = {
	data: _propTypes2.default.object
};

var DefaultSectionDivider = function DefaultSectionDivider(props) {
	return _react2.default.createElement(
		'li',
		{ className: 'slds-p-around--x-small slds-lookup__divider', tabIndex: '-1' },
		_react2.default.createElement(
			'span',
			{ className: 'slds-m-left--x-small' },
			_react2.default.createElement(
				'strong',
				null,
				props.data.label
			)
		)
	);
};

DefaultSectionDivider.displayName = displayName;
DefaultSectionDivider.propTypes = propTypes;

exports.default = DefaultSectionDivider;