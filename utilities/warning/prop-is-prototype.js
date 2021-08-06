/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver a warning message to the browser console about a property of a component being a prototype component.
import lowPriorityWarning from './low-priority-warning';

let isPropPrototype = function isPropPrototypeFunction() {};

// Do not show warning if `it` function is in global scope.
// This does not gaurantee the presence of `Mocha` library however.
if (process.env.NODE_ENV !== 'production' 
  && (typeof window.it !== 'function')) {
	const hasWarned = {};

	isPropPrototype = function isPropPrototypeFunction(control, prop, propName, comment) {
		const additionalComment = comment ? ` ${comment}` : '';
		if (!hasWarned[control]) {
				lowPriorityWarning(
					false,
					`[Design System React] ${control}'s ${propName} property is a prototype. (a) It may change within a minor release. (b) Web Content Accessibility Guidelines may not be met. (c) CSS imports may be required. ${additionalComment}`
				);
			/* eslint-enable max-len */
			hasWarned[control] = true;
		}
	};
}

export default isPropPrototype;
