/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an warning message to the browser console if extraneous properties are defined (falsey).
import warning from 'warning';

let onlyOneOf = function onlyOneOfFunction() {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	onlyOneOf = function onlyOneOfFunction(control, selectedProps, comment) {
		const additionalComment = comment ? ` ${comment}` : '';
		let keys = Object.keys(selectedProps);
		keys = keys.filter((key) => selectedProps[key]);

		if (!hasWarned[control]) {
			/* eslint-disable max-len */
			warning(
				keys.length <= 1,
				`[Design System React] Only one of the following props is needed by ${control}: [${keys.join()}].${additionalComment}`
			);
			/* eslint-enable max-len */
			hasWarned[control] = !!selectedProps;
		}
	};
}

export default onlyOneOf;
