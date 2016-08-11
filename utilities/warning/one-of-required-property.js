define(['module', 'warning'], function (module, _warning) {
	'use strict';

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var oneOfRequired = void 0; /*
                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                             
                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                             
                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                             */
	/* eslint-disable indent */

	// This function will deliver an error message to the browser console when all of the props passed in are undefined (falsey).


	if (process.env.NODE_ENV !== 'production') {
		(function () {
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
		})();
	} else {
		oneOfRequired = function oneOfRequired() {};
	}

	module.exports = oneOfRequired;
});