/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

import React from 'react';

// This function will deliver an error message to the browser console when all of the props passed in are undefined (falsey).
import warning from 'warning';

let renderFunctionReturnContentsLackDisplayName = function renderFunctionReturnContentsLackDisplayNameFunction() {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	renderFunctionReturnContentsLackDisplayName = function renderFunctionReturnContentsLackDisplayNameFunction(
		control,
		propName,
		renderFunctionReturnContents,
		displayName,
		checkChildren, // if true children of the render function return main node will be checked for displayName matches
		comment
	) {
		const additionalComment = comment ? ` ${comment}` : '';
		let foundDiscrepancy = false;

		if (
			!renderFunctionReturnContents.type ||
			renderFunctionReturnContents.type.displayName !== displayName
		) {
			if (
				checkChildren &&
				renderFunctionReturnContents.props &&
				renderFunctionReturnContents.props.children
			) {
				React.Children.forEach(
					renderFunctionReturnContents.props.children,
					(child) => {
						if (
							!child ||
							!child.type ||
							child.type.displayName !== displayName
						) {
							foundDiscrepancy = true;
						}
					}
				);
			} else {
				foundDiscrepancy = true;
			}
		}

		if (foundDiscrepancy && !hasWarned[control]) {
			/* eslint-disable max-len */
			warning(
				false,
				`[Design System React] Content provided by \`${propName}\` for ${control} must have a \`displayName\` property value of ${displayName}${
					checkChildren
						? ` or be an element/fragment with children all having the \`displayName\` property value of ${displayName}.`
						: '.'
				} Please review ${propName} prop documentation.${additionalComment}`
			);
			/* eslint-enable max-len */
			hasWarned[control] = true;
		}
	};
}

export default renderFunctionReturnContentsLackDisplayName;
