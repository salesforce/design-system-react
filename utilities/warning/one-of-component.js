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

	var oneOfComponent = function oneOfComponent() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	/* eslint-disable import/no-mutable-exports */

	// This function will deliver an error message to the browser console when all of the props passed in are undefined (falsey).


	if (process.env.NODE_ENV !== 'production') {
		var hasWarned = {};
		oneOfComponent = function oneOfComponent(control, props, propName, allowedComponents, comment) {
			var additionalComment = comment ? ' ' + comment : '';

			var componentType = void 0;

			if (typeof props[propName].type === 'string') {
				componentType = props[propName].type;
			} else {
				componentType = props[propName].type.displayName;
			}

			var allowedComponentFound = allowedComponents.indexOf(componentType) > -1;

			if (!hasWarned[control]) {
				/* eslint-disable max-len */
				(0, _warning2.default)(allowedComponentFound, '[Design System React] ' + control + ' requires that prop \'' + propName + '\' is an instance of one of the following components: ' + allowedComponents.join(', ') + '. An instance of \'' + componentType + '\' was given.' + additionalComment);
				/* eslint-enable max-len */
				hasWarned[control] = !!allowedComponentFound;
			}
		};
	}

	exports.default = oneOfComponent;
});