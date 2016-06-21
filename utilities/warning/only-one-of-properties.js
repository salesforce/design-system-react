/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable indent, import/no-mutable-exports */

// This function will deliver an warning message to the browser console if extraneous properties are defined (falsey).
import warning from 'warning';

let onlyOneOf = function () {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	onlyOneOf = function (control, selectedProps, comment) {
		const additionalComment = comment ? ` ${comment}` : '';
		let keys = Object.keys(selectedProps);
		keys = keys.filter((key) => selectedProps[key]);

		if (!hasWarned[control]) {
			/* eslint-disable max-len */
			warning((keys.length === 1), `[Design System React] Only one of the following props is needed by ${control}: [${keys.join()}].${additionalComment}`);
			/* eslint-enable max-len */
			hasWarned[control] = !!selectedProps;
		}
	};
}

export default onlyOneOf;
