/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an error message to the browser console about the removal of a property.
import warning from 'warning';

let deprecated = function () {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	deprecated = function (control, propValue, oldProp, newProp, comment) {
		const additionalComment = comment ? ` ${comment}` : '';
		const newProperty = newProp ? `Use \`${newProp}\`` : '';
		const newPropertySentence = newProp ? ` ${newProperty} instead.` : '';
		if (!hasWarned[control + oldProp]) {
			/* eslint-disable max-len */
			warning(propValue === undefined, `[Design System React] \`${oldProp}\` will be removed in the next major version of ${control}.${newPropertySentence}${additionalComment}`);
			/* eslint-enable max-len */
			hasWarned[control + oldProp] = propValue !== undefined;
		}
	};
}

export default deprecated;
