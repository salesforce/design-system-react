/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an error message to the browser console one property is used but not both that are required. Either use neither or both properties.
import warning from 'warning';

let ifOneThenBothRequiredProperty;

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	ifOneThenBothRequiredProperty = function ifOneThenBothRequiredPropertyFunction(
		control,
		props,
		selectedProps,
		comment
	) {
		const additionalComment = comment ? ` ${comment}` : '';
		let bothOrNoneAreSet = false;
		const keys = Object.keys(selectedProps);
		const values = keys.map((key) => selectedProps[key]);
		const allTruthy = values.every((element) => !!element);
		const allFalsey = values.every((element) => !element);

		bothOrNoneAreSet = allTruthy || allFalsey;

		if (!hasWarned[control]) {
			/* eslint-disable max-len */
			warning(
				bothOrNoneAreSet,
				`[Design System React] If one of the following props are used, then both of the following properties are required by ${control}: [${keys.join()}].${additionalComment}`
			);
			/* eslint-enable max-len */
			hasWarned[control] = !!selectedProps;
		}
	};
} else {
	ifOneThenBothRequiredProperty = function ifOneThenBothRequiredPropertyFunction() {};
}

export default ifOneThenBothRequiredProperty;
