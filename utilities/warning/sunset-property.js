'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sunset = function sunset() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an error message to the browser console about the removal of a property.


if (process.env.NODE_ENV !== 'production') {
	var hasWarned = {};

	sunset = function sunset(control, propValue, oldProp, comment) {
		var additionalComment = comment ? ' ' + comment : '';
		if (!hasWarned[control + oldProp]) {
			/* eslint-disable max-len */
			(0, _warning2.default)(!propValue, '[Design System React] `' + oldProp + '` has reached End-of-Life and has been removed from the API of ' + control + '. Please update your API.' + additionalComment);
			/* eslint-enable max-len */
			hasWarned[control + oldProp] = !!propValue;
		}
	};
}

exports.default = sunset;