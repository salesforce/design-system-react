'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var future = function future() {}; /*
                                   Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                   
                                   Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                   Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                   Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                   Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                   
                                   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                   */
/* eslint-disable indent */

// This function will deliver an error message to the browser console that another component may use, but is not yet released.


if (process.env.NODE_ENV !== 'production') {
	(function () {
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
	})();
}

exports.default = future;