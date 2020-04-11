/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

import warning from 'warning';

let hasMoved = function hasMovedFunction() {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	hasMoved = function hasMovedFunction(
		control,
		{ oldFileLocation, newFileLocation, comment }
	) {
		const additionalComment = comment ? ` ${comment}` : '';
		if (!hasWarned[control]) {
			/* eslint-disable max-len */
			warning(
				false,
				`[Design System React] ${control} file import path has changed. Old import path was \`design-system-react/${oldFileLocation}\`. New import path is \`design-system-react/${newFileLocation}\`.${additionalComment}`
			);
			/* eslint-enable max-len */
			hasWarned[control] = true;
		}
	};
}

export default hasMoved;
