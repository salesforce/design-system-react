/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an error message to the browser console when a
// required (controlled) property is missing. Pass `isSet` rather than the
// value so falsy values such as `0`, `''` or `null` can count as set. Warns
// once per component and property.
import warning from 'warning';

let required = function requiredFunction() {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	required = function requiredFunction(control, isSet, propName, comment) {
		const additionalComment = comment ? ` ${comment}` : '';
		if (!isSet && !hasWarned[control + propName]) {
			warning(
				false,
				`[Design System React] \`${propName}\` is required by ${control}.${additionalComment}`
			);
			hasWarned[control + propName] = true;
		}
	};
}

export default required;
