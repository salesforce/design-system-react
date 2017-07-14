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

	var oneOfRequired = void 0; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	/* eslint-disable import/no-mutable-exports */

	// This function will deliver an error message to the browser console when all of the props passed in are undefined (falsey).


	if (process.env.NODE_ENV !== 'production') {
		var hasWarned = {};

		oneOfRequired = function oneOfRequired(control, selectedProps, comment) {
			var additionalComment = comment ? ' ' + comment : '';
			var atLeastOnePropIsSet = false;
			var keys = Object.keys(selectedProps);
			keys.forEach(function (key) {
				if (selectedProps[key]) {
					atLeastOnePropIsSet = true;
				}
			});

			if (!hasWarned[control]) {
				/* eslint-disable max-len */
				(0, _warning2.default)(atLeastOnePropIsSet, '[Design System React] One of the following props are required by ' + control + ': [' + keys.join() + '].' + additionalComment);
				/* eslint-enable max-len */
				hasWarned[control] = !!selectedProps;
			}
		};
	} else {
		oneOfRequired = function oneOfRequired() {};
	}

	exports.default = oneOfRequired;
});