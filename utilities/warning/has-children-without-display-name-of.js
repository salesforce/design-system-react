/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

import React from 'react';

// This function will deliver an error message to the browser console when all of the props passed in are undefined (falsey).
import warning from 'warning';

let hasChildrenWithoutDisplayNameOf = function hasChildrenWithoutDisplayNameOfFunction() {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	// TODO: allow `displayName` to be an array of displayNames
	hasChildrenWithoutDisplayNameOf = function hasChildrenWithoutDisplayNameOfFunction(
		control,
		children,
		displayName,
		comment
	) {
		if (!hasWarned[control]) {
			const additionalComment = comment ? ` ${comment}` : '';
			const childrenWithoutSelectedDisplayName = [];

			React.Children.forEach(children, (child) => {
				if (child && child.type && child.type.displayName !== displayName) {
					// eslint-disable-next-line fp/no-mutating-methods
					childrenWithoutSelectedDisplayName.push(child);
				}
			});

			const hasChildrenWithoutSelectedDisplayName =
				childrenWithoutSelectedDisplayName.length > 0;

			if (hasChildrenWithoutSelectedDisplayName) {
				/* eslint-disable max-len */
				warning(
					false,
					`[Design System React] Unable to use child components specified within ${control}. Please use a child component with a \`displayName\` class property value of ${displayName}. Children without that class property are ignored. Please review \`children\` prop documentation.${additionalComment}`
				);
				/* eslint-enable max-len */
			}

			hasWarned[control] = !!hasChildrenWithoutSelectedDisplayName;
		}
	};
}

export default hasChildrenWithoutDisplayNameOf;
