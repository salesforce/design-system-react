/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import InputIcon from '../index';

export const decorative = <InputIcon name="search" category="utility" />;

export const clickable = (
	<InputIcon
		name="clear"
		category="utility"
		assistiveText={{ icon: 'Clear' }}
		onClick={(event) => event.currentTarget.blur()}
	/>
);

export const badCategory = (
	// @ts-expect-error `category` is an icon category
	<InputIcon name="search" category="nope" />
);

export const unknownProp = (
	// @ts-expect-error unknown props are rejected
	<InputIcon name="search" foo="bar" />
);
