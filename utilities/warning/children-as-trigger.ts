/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

import warning from 'warning';

// Warns once per component when its trigger is passed as `children` instead of `trigger`.
let childrenAsTrigger: (
	control: string,
	usesChildrenAsTrigger: boolean,
	comment?: string
) => void = function childrenAsTriggerFunction() {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned: Record<string, boolean> = {};

	childrenAsTrigger = function childrenAsTriggerFunction(
		control,
		usesChildrenAsTrigger,
		comment
	) {
		const additionalComment = comment ? ` ${comment}` : '';
		if (usesChildrenAsTrigger && !hasWarned[control]) {
			/* eslint-disable max-len */
			warning(
				false,
				`[Design System React] Passing the trigger of ${control} as \`children\` is deprecated and will be removed in the next major version. Use \`trigger\` instead: an element, whose props ${control} merges with its own, or a function that receives ${control}'s trigger props.${additionalComment}`
			);
			/* eslint-enable max-len */
			hasWarned[control] = true;
		}
	};
}

export default childrenAsTrigger;
