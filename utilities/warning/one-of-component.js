/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an error message to the browser console when all of the props passed in are undefined (falsey).
import warning from 'warning';

let oneOfComponent = function () {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};
	oneOfComponent = function (
		control,
		props,
		propName,
		allowedComponents,
		comment
	) {
		const additionalComment = comment ? ` ${comment}` : '';

		let componentType;

		if (typeof props[propName].type === 'string') {
			componentType = props[propName].type;
		} else {
			componentType = props[propName].type.displayName;
		}

		const allowedComponentFound = allowedComponents.indexOf(componentType) > -1;

		if (!hasWarned[control]) {
			/* eslint-disable max-len */
			warning(
				allowedComponentFound,
				`[Design System React] ${control} requires that prop '${propName}' is an instance of one of the following components: ${allowedComponents.join(
					', '
				)}. An instance of '${componentType}' was given.${additionalComment}`
			);
			/* eslint-enable max-len */
			hasWarned[control] = !!allowedComponentFound;
		}
	};
}

export default oneOfComponent;
