/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an error message to the browser console about the removal of a property.
import warning from 'warning';

let deprecated = function () {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	deprecated = function (
		control,
		propName,
		propValue,
		oldType,
		newType,
		comment
	) {
		const additionalComment = comment ? ` ${comment}` : '';
		if (!hasWarned[control + propValue + oldType]) {
			/* eslint-disable max-len, valid-typeof */
			warning(
				typeof propValue === newType,
				`[Design System React] The type of \`${propName}\` will change from \`${oldType}\` to \`${newType}\` in the next major version of ${control}. Please update your props.${additionalComment}`
			);
			/* eslint-enable max-len */
			hasWarned[control + propValue + oldType] = propValue !== undefined;
		}
	};
}

export default deprecated;
