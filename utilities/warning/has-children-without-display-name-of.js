define(['exports', 'react', 'warning'], function (exports, _react, _warning) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	/* eslint-disable import/no-mutable-exports */

	var hasChildrenWithoutDisplayNameOf = function hasChildrenWithoutDisplayNameOf() {};

	// This function will deliver an error message to the browser console when all of the props passed in are undefined (falsey).


	if (process.env.NODE_ENV !== 'production') {
		var hasWarned = {};

		// TODO: allow `displayName` to be an array of displayNames
		hasChildrenWithoutDisplayNameOf = function hasChildrenWithoutDisplayNameOf(control, children, displayName, comment) {
			var additionalComment = comment ? ' ' + comment : '';
			var childrenWithoutSelectedDisplayName = [];

			_react2.default.Children.forEach(children, function (child) {
				if (child && child.type.displayName !== displayName) {
					childrenWithoutSelectedDisplayName.push(child);
				}
			});

			if (!hasWarned[control]) {
				var hasChildrenWithoutSelectedDisplayName = childrenWithoutSelectedDisplayName.length > 0;
				/* eslint-disable max-len */
				(0, _warning2.default)(hasChildrenWithoutSelectedDisplayName, '[Design System React] Unable to use child components specified within ' + control + '. Please use a child component with a `displayName` class property value of ' + displayName + '. Children without that class property are ignored. Please review `children` prop documentation.' + additionalComment);
				/* eslint-enable max-len */
				hasWarned[control] = !!hasChildrenWithoutSelectedDisplayName;
			}
		};
	}

	exports.default = hasChildrenWithoutDisplayNameOf;
});