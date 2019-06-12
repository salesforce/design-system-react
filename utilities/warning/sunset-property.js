/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an error message to the browser console about the removal of a property.
import warning from 'warning';

let sunset = function sunsetFunction() {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	sunset = function sunsetFunction(control, propValue, oldProp, comment) {
		const additionalComment = comment ? ` ${comment}` : '';
		if (!hasWarned[control + oldProp]) {
			/* eslint-disable max-len */
			warning(
				!propValue,
				`[Design System React] \`${oldProp}\` has reached End-of-Life and has been removed from the API of ${control}. Please update your API.${additionalComment}`
			);
			/* eslint-enable max-len */
			hasWarned[control + oldProp] = !!propValue;
		}
	};
}

export default sunset;
