/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	type ElementType,
	type ReactElement,
	type ReactNode,
} from 'react';

/**
 * True when `node` is an element of one of the given components. Library
 * parents use this to find their child components by reference instead of by
 * `displayName`, which minifiers, HOCs and Storybook docgen can change.
 */
const isElementOfType = <P>(
	node: ReactNode,
	...types: ElementType[]
): node is ReactElement<P> =>
	React.isValidElement(node) && types.includes(node.type as ElementType);

export default isElementOfType;
