/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

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
