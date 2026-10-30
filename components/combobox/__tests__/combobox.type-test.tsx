/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Combobox, { type ComboboxOption } from '../index';
import Popover from '../../popover';

export const options: ComboboxOption[] = [
	{ id: 'heading', label: 'Accounts', type: 'separator' },
	{
		id: 'separator-render',
		label: (term) => `${term} in Accounts`,
		type: 'separator',
	},
	{ id: '1', label: 'Acme', subTitle: 'Account', category: 'account' },
	{
		id: 'search',
		label: (term) => `Search ${term}`,
		type: 'header',
		onClick: () => {},
	},
	{ id: 'add', label: 'New Account', type: 'footer' },
];

export const legacyCategory: ComboboxOption = {
	id: '2',
	label: 'Acme',
	// @ts-expect-error `type` is reserved for structural rows; use `category`
	type: 'account',
};

// @ts-expect-error selectable items take a string label
export const itemRenderLabel: ComboboxOption = { id: '3', label: () => 'Acme' };

// @ts-expect-error separators are not selectable, so take no `value`
export const separatorValue: ComboboxOption = {
	id: '4',
	type: 'separator',
	value: 'x',
};

const dialog = (
	<Popover body={<div />}>
		<span />
	</Popover>
);

export const base = <Combobox options={options} selection={[]} />;

export const readonly = (
	<Combobox options={options} selection={[]} variant="readonly" />
);

// @ts-expect-error listbox variants need `options`
export const missingOptions = <Combobox selection={[]} />;

export const popover = (
	<Combobox
		assistiveText={{ popoverLabel: 'Pick a language' }}
		popover={dialog}
		selection={[]}
		variant="popover"
	/>
);

export const missingPopoverLabel = (
	// @ts-expect-error the popover variant needs `assistiveText.popoverLabel`
	<Combobox popover={dialog} selection={[]} variant="popover" />
);

export const popoverOptions = (
	// @ts-expect-error the popover variant renders `popover`, not `options`
	<Combobox
		assistiveText={{ popoverLabel: 'Pick' }}
		options={options}
		popover={dialog}
		selection={[]}
		variant="popover"
	/>
);

export const basePopover = (
	// @ts-expect-error `popover` only applies to the popover variant
	<Combobox options={options} popover={dialog} selection={[]} />
);

export const uncontrolledOpen = (
	<Combobox defaultIsOpen options={options} selection={[]} />
);

export const controlledOpen = (
	<Combobox
		events={{
			onRequestClose: () => {},
			onRequestOpen: (event) => event?.preventDefault(),
		}}
		isOpen={false}
		options={options}
		selection={[]}
	/>
);

export const removedDefaultValue = (
	// @ts-expect-error `defaultValue` was removed in v11: pass `value`
	<Combobox defaultValue="x" options={options} selection={[]} />
);
