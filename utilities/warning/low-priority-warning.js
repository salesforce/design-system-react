/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

let lowPriorityWarning = function printWarningFunction() {};

if (process.env.NODE_ENV !== 'production') {
	// eslint-disable-next-line fp/no-rest-parameters
	const printWarning = function printWarningFunction(originalMessage, ...args) {
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
			// eslint-disable-next-line fp/no-throw
			throw new Error(message);
		} catch (event) {} // eslint-disable-line no-empty
	};

	// eslint-disable-next-line fp/no-rest-parameters
	lowPriorityWarning = (condition, originalMessage, ...args) => {
		if (!condition && originalMessage) {
			printWarning(originalMessage, ...args);
		}
	};
}

export default lowPriorityWarning;
