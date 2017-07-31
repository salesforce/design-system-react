define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = truncateByLength;
	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	function truncateByLength(_ref) {
		var _ref$inputString = _ref.inputString,
		    inputString = _ref$inputString === undefined ? '' : _ref$inputString,
		    _ref$maxLength = _ref.maxLength,
		    maxLength = _ref$maxLength === undefined ? 140 : _ref$maxLength,
		    _ref$truncationChars = _ref.truncationChars,
		    truncationChars = _ref$truncationChars === undefined ? '...' : _ref$truncationChars,
		    _ref$startingLength = _ref.startingLength,
		    startingLength = _ref$startingLength === undefined ? 0 : _ref$startingLength;

		var outputString = void 0;

		if (inputString.length <= maxLength) {
			outputString = inputString;
		} else {
			var words = inputString.split(' ');
			var length = startingLength + truncationChars.length - 1;

			outputString = words.reduce(function (combined, word) {
				length += word.length + 1;

				if (length <= maxLength) {
					combined.push(word);
				}

				return combined;
			}, []).join(' ');

			outputString += truncationChars;
		}

		return outputString;
	}
});