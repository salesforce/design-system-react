/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an error message to the browser console that another component may use, but is not yet released.
import warning from 'warning';

let future = function futureFunction() {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	future = function futureFunction(control, propValue, newProp, comment) {
		const additionalComment = comment ? ` ${comment}` : '';
		if (!hasWarned[control + newProp]) {
			/* eslint-disable max-len */
			warning(
				!propValue,
				`[Design System React] \`${newProp}\` of ${control} is not implemented yet. Please check future releases for \`${newProp}\`.${additionalComment}`
			);
			/* eslint-enable max-len */
			hasWarned[control + newProp] = !!propValue;
		}
	};
}

export default future;
