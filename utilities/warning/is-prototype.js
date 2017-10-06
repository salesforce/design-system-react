/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver a warning message to the browser console about the component being a prototype component.
import lowPriorityWarning from './low-priority-warning';

let isPrototype = function () {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	isPrototype = function (control, comment) {
		const additionalComment = comment ? ` ${comment}` : '';
		if (!hasWarned[control]) {
			/* eslint-disable max-len */
			lowPriorityWarning(false, `[Design System React] ${control} is a prototype. ${control}'s API may change within a minor release, ${control} may not be fully accessibile with assistive technology.${additionalComment}`);
			/* eslint-enable max-len */
			hasWarned[control] = true;
		}
	};
}

export default isPrototype;
