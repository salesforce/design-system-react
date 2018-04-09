'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Button Component

// ## Dependencies

// ### React


// ### Button


// ## Constants


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A helper component that renders a Button in the tools area of the Global Header. Currently defaults to a bare icon, but this can be overriden if text-based buttons are required.
 */
var GlobalHeaderButton = function GlobalHeaderButton(props) {
	return _react2.default.createElement(
		'li',
		null,
		_react2.default.createElement(_button2.default, _extends({ iconVariant: 'global-header', variant: 'icon' }, props))
	);
};

GlobalHeaderButton.displayName = _constants.GLOBAL_HEADER_TOOL;

exports.default = GlobalHeaderButton;