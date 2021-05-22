/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

// This function will deliver a warning message to the browser console about an event parameter change.
import lowPriorityWarning from './low-priority-warning';

let deprecated = function deprecatedFunction() {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	deprecated = function deprecatedFunction(
		control,
		{
			oldEventParameterOrder, // flag that tells which parameter order is in use
			propAsString, // key name of prop being warned about
			log, // log function that will disable console warning and pipe to another function log({ message })
		},
		comment
	) {
		const additionalComment = comment ? ` ${comment}` : '';
		const warnOnFirstOccurrenceKey = control + propAsString;
		const triggerWarning = Boolean(oldEventParameterOrder);

		if (!hasWarned[warnOnFirstOccurrenceKey]) {
			const message = `[Design System React] ${additionalComment}`;

			if (triggerWarning && log) {
				log({ message });
			} else if (triggerWarning) {
				lowPriorityWarning(
					false, // false value triggers warning
					message
				);
			}
			// store global flag to limit warnings to first issue
			hasWarned[warnOnFirstOccurrenceKey] = triggerWarning;
		}
	};
}

export default deprecated;
