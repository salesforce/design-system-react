define(['exports', 'warning'], function (exports, _warning) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var future = function future() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	/* eslint-disable import/no-mutable-exports */

	// This function will deliver an error message to the browser console that another component may use, but is not yet released.


	if (process.env.NODE_ENV !== 'production') {
		var hasWarned = {};

		future = function future(control, propValue, newProp, comment) {
			var additionalComment = comment ? ' ' + comment : '';
			if (!hasWarned[control + newProp]) {
				/* eslint-disable max-len */
				(0, _warning2.default)(!propValue, '[Design System React] `' + newProp + '` of ' + control + ' is not implemented yet. Please check future releases for `' + newProp + '`.' + additionalComment);
				/* eslint-enable max-len */
				hasWarned[control + newProp] = !!propValue;
			}
		};
	}

	exports.default = future;
});