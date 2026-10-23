/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import type { MenuDropdownOption } from '../index';

export const options: MenuDropdownOption[] = [
	{ label: 'Display As', type: 'header', divider: 'bottom' },
	{
		label: 'Table View',
		value: 'table',
		rightIcon: { category: 'utility', name: 'table' },
	},
	{ type: 'divider' },
	{ label: 'Docs', href: 'https://example.com', type: 'item' },
];

// @ts-expect-error headers are not selectable, so take no `value`
export const headerValue: MenuDropdownOption = {
	label: 'Heading',
	type: 'header',
	value: 'x',
};

// @ts-expect-error dividers have no label
export const dividerLabel: MenuDropdownOption = {
	label: 'Divider',
	type: 'divider',
};

// @ts-expect-error `divider` placement only applies to headers
export const itemDivider: MenuDropdownOption = {
	label: 'Item',
	divider: 'top',
};

export const iconCategory: MenuDropdownOption = {
	label: 'Item',
	// @ts-expect-error icon categories are checked
	leftIcon: { category: 'nope', name: 'table' },
};
