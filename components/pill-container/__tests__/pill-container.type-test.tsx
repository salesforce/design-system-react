/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import PillContainer, { type PillOption } from '../index';

export const options: PillOption[] = [
	{ id: '1', label: 'Acme' },
	{ id: '2', label: 'Globex', icon: { category: 'standard', name: 'account' } },
	{ id: '3', label: 'Initech', avatar: { imgSrc: '/a.png', variant: 'user' } },
];

export const container = (
	<PillContainer
		options={options}
		events={{
			onRequestRemovePill: (event, { index, option }) => [event, index, option],
		}}
	/>
);

// @ts-expect-error `id` is required: it is the React key
export const missingId: PillOption = { label: 'Acme' };

export const unknownField: PillOption = {
	id: '1',
	// @ts-expect-error unknown fields are rejected
	foo: 'bar',
};

export const badIconCategory: PillOption = {
	id: '1',
	// @ts-expect-error icon categories are checked
	icon: { category: 'nope', name: 'account' },
};
