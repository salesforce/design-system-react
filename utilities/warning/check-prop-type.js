/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an warning message to the browser console if the element type is not expected.
import warning from 'warning';

let checkPropType = function() {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	checkPropType = function(
		control,
		selectedProp,
		selectedPropName,
		expectedType,
		expectedTypeString,
		comment
	) {
		const additionalComment = comment ? ` ${comment}` : '';

		if (!hasWarned[control]) {
			/* eslint-disable max-len */
			warning(
				selectedProp.type !== undefined && selectedProp.type !== expectedType,
				`[Design System React] ${control} requires that prop '${selectedPropName}' is of type ${expectedTypeString}.${additionalComment}`
			);
			/* eslint-enable max-len */
			hasWarned[control] = !!selectedProp;
		}
	};
}

export default checkPropType;
