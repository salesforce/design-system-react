/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable import/no-mutable-exports */
/* global XMLHttpRequest, window */

// This function does an "AJAX" request to warn users on how to setup their icon path.
import warning from 'warning';

let urlExists = function () {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};
	let hasExecuted;

	// Using XMLHttpRequest can cause problems in non-browser environments. This should be completely removed in production environment and should not execute in a testing environment.
	urlExists = function (control, url, comment) {
		if (!hasExecuted
			&& !hasWarned[`${control}-path`]
			&& window
			&& XMLHttpRequest
			&& process.env.NODE_ENV !== 'test') {
			const http = new XMLHttpRequest();
			http.open('HEAD', url, false);
			http.send();
			hasExecuted = true;
			
			if (http.status === 404) {
				const additionalComment = comment ? ` ${comment}` : '';
				/* eslint-disable max-len */
				warning(!url, `[Design System React] Icon file was not found. Try setting an icon path with \`setIconsPath([ICONPATH])\` from \`components/settings\`.${additionalComment}`);
				/* eslint-enable max-len */
				hasWarned[`${control}-path`] = !!url;
			}
		}
	};
}

export default urlExists;
