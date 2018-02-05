/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

let lowPriorityWarning = function () {};

if (process.env.NODE_ENV !== 'production') {
	const printWarning = function (originalMessage, ...args) {
		let argIndex = 0;
		const message = `Warning: ${originalMessage.replace(/%s/g, () => {
			const argument = args[argIndex];
			argIndex += 1;
			return argument;
		})}`;
		if (typeof console !== 'undefined') {
			console.warn(message); // eslint-disable-line no-console
		}
		try {
			// Throw error to enable tracing the callstack.
			throw new Error(message);
		} catch (event) {} // eslint-disable-line no-empty
	};

	lowPriorityWarning = (condition, originalMessage, ...args) => {
		if (originalMessage) {
			printWarning(originalMessage, ...args);
		}
	};
}

export default lowPriorityWarning;
