/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

// This function will deliver an error message to the browser console about the future of a removal and moving of a property's valid value to another prop. This makes the most sense to be used with `oneOf` prop types.
import warning from 'warning';

let deprecated = function () {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	deprecated = function (control,
		{
			propAsString,
			propValue,
			deprecatedPropValue,
			replacementPropAsString,
			replacementPropAsValue,
		},
		comment) {
		const additionalComment = comment ? ` ${comment}` : '';
		const warnOnFirstOccurrenceKey = control + propAsString + deprecatedPropValue;
		const triggerWarning = propValue === deprecatedPropValue;
		const replacementSentence =
			deprecatedPropValue &&
			replacementPropAsString &&
			replacementPropAsValue 
			? ` Replace \`${propAsString}="${deprecatedPropValue}"\` with \`${replacementPropAsString}="${replacementPropAsValue}"\`.` : '';

		if (!hasWarned[warnOnFirstOccurrenceKey]) {
			warning(
				!triggerWarning, // false value triggers warning
				`[Design System React] The value of \`${deprecatedPropValue}\`, for prop \`${propAsString}\` will be removed in the next major version of ${control}. Please update your props.${replacementSentence}${additionalComment}`
			);
			// store global flag to limit warnings to first issue
			hasWarned[warnOnFirstOccurrenceKey] = triggerWarning;
		}
	};
}

export default deprecated;
