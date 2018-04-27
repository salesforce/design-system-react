'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deprecated = function deprecated() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

// This function will deliver an error message to the browser console about the future of a removal and moving of a property's valid value to another prop. This makes the most sense to be used with `oneOf` prop types.


if (process.env.NODE_ENV !== 'production') {
	var hasWarned = {};

	deprecated = function deprecated(control, _ref, comment) {
		var propAsString = _ref.propAsString,
		    propValue = _ref.propValue,
		    deprecatedPropValue = _ref.deprecatedPropValue,
		    replacementPropAsString = _ref.replacementPropAsString,
		    replacementPropAsValue = _ref.replacementPropAsValue,
		    log = _ref.log;

		var additionalComment = comment ? ' ' + comment : '';
		var warnOnFirstOccurrenceKey = control + propAsString + deprecatedPropValue;
		var triggerWarning = propValue === deprecatedPropValue;
		var replacementSentence = deprecatedPropValue && replacementPropAsString && replacementPropAsValue ? ' Replace `' + propAsString + '="' + deprecatedPropValue + '"` with `' + replacementPropAsString + '="' + replacementPropAsValue + '"`.' : '';

		if (!hasWarned[warnOnFirstOccurrenceKey]) {
			var message = '[Design System React] The value of `' + deprecatedPropValue + '`, for prop `' + propAsString + '` will be removed in the next major version of ' + control + '. Please update your props.' + replacementSentence + additionalComment;

			if (triggerWarning && log) {
				log({ message: message });
			} else {
				(0, _warning2.default)(!triggerWarning, // false value triggers warning
				message);
			}
			// store global flag to limit warnings to first issue
			hasWarned[warnOnFirstOccurrenceKey] = triggerWarning;
		}
	};
}

exports.default = deprecated;