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

	var ifOneThenBothRequiredProperty = void 0; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	/* eslint-disable import/no-mutable-exports */

	// This function will deliver an error message to the browser console one property is used but not both that are required. Either use neither or both properties.


	if (process.env.NODE_ENV !== 'production') {
		var hasWarned = {};

		ifOneThenBothRequiredProperty = function ifOneThenBothRequiredProperty(control, props, selectedProps, comment) {
			var additionalComment = comment ? ' ' + comment : '';
			var bothOrNoneAreSet = false;
			var keys = Object.keys(selectedProps);
			var values = Object.values(selectedProps);
			var allTruthy = values.every(function (element) {
				return !!element;
			});
			var allFalsey = values.every(function (element) {
				return !element;
			});

			bothOrNoneAreSet = allTruthy || allFalsey;

			if (!hasWarned[control]) {
				/* eslint-disable max-len */
				(0, _warning2.default)(bothOrNoneAreSet, '[Design System React] If one of the following props are used, then both of the following properties are required by ' + control + ': [' + keys.join() + '].' + additionalComment);
				/* eslint-enable max-len */
				hasWarned[control] = !!selectedProps;
			}
		};
	} else {
		ifOneThenBothRequiredProperty = function ifOneThenBothRequiredProperty() {};
	}

	exports.default = ifOneThenBothRequiredProperty;
});