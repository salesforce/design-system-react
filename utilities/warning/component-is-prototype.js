/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver a warning message to the browser console about the component or a property of a component being a prototype component.
import lowPriorityWarning from './low-priority-warning';

let isPrototype = function isPrototypeFunction() {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	isPrototype = function isPrototypeFunction(control, prop, propName, comment) {
		const additionalComment = comment ? ` ${comment}` : '';
		if (!hasWarned[control]) {
			if (prop) {
				lowPriorityWarning(
					false,
					`[Design System React] ${control}'s ${prop} property is a prototype. (a) It may change within a minor release. (b) Web Content Accessibility Guidelines may not be met. (c) CSS imports may be required. ${additionalComment}`
				);
			} else {
				/* eslint-disable max-len */
				lowPriorityWarning(
					false,
					`[Design System React] ${control} is a prototype. (a) Props may change within a minor release. (b) Web Content Accessibility Guidelines may not be met. (c) CSS imports may be required, since it is being added to SLDS.${additionalComment}`
				);
			}
			/* eslint-enable max-len */
			hasWarned[control] = true;
		}
	};
}

export default isPrototype;
