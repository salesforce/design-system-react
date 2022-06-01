/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an error message to the browser console when all of the props passed in are undefined (falsey).
import warning from 'warning';

let oneOfRequired;

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	oneOfRequired = function oneOfRequiredFunction(
		control,
		selectedProps,
		comment
	) {
		const additionalComment = comment ? ` ${comment}` : '';
		let atLeastOnePropIsSet = false;
		const keys = Object.keys(selectedProps);
		keys.forEach((key) => {
			if (selectedProps[key]) {
				atLeastOnePropIsSet = true;
			}
		});

		if (!hasWarned[control]) {
			/* eslint-disable max-len */
			warning(
				atLeastOnePropIsSet,
				`[Design System React] One of the following props are required by ${control}: [${keys.join()}].${additionalComment}`
			);
			/* eslint-enable max-len */
			hasWarned[control] = !!selectedProps;
		}
	};
} else {
	oneOfRequired = function oneOfRequiredFunction() {};
}

export default oneOfRequired;
