'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onlyOneOf = function onlyOneOf() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an warning message to the browser console if extraneous properties are defined (falsey).


if (process.env.NODE_ENV !== 'production') {
	var hasWarned = {};

	onlyOneOf = function onlyOneOf(control, selectedProps, comment) {
		var additionalComment = comment ? ' ' + comment : '';
		var keys = Object.keys(selectedProps);
		keys = keys.filter(function (key) {
			return selectedProps[key];
		});

		if (!hasWarned[control]) {
			/* eslint-disable max-len */
			(0, _warning2.default)(keys.length <= 1, '[Design System React] Only one of the following props is needed by ' + control + ': [' + keys.join() + '].' + additionalComment);
			/* eslint-enable max-len */
			hasWarned[control] = !!selectedProps;
		}
	};
}

exports.default = onlyOneOf;