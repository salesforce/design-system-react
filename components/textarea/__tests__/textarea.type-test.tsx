/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Textarea from '../index';

export const aria = (
	<Textarea
		value=""
		onChange={() => {}}
		aria-autocomplete="list"
		aria-haspopup="listbox"
		aria-expanded
	/>
);

/* eslint-disable jsx-a11y/aria-proptypes -- deliberately invalid */
export const badAutocomplete = (
	// @ts-expect-error `aria-autocomplete` is `none`, `inline`, `list` or `both`
	<Textarea value="" onChange={() => {}} aria-autocomplete="maybe" />
);
/* eslint-enable jsx-a11y/aria-proptypes */

export const nativeAttributes = (
	<Textarea
		value=""
		onChange={() => {}}
		rows={5}
		cols={40}
		readOnly
		autoComplete="off"
	/>
);

// @ts-expect-error `value` is required
export const missingValue = <Textarea onChange={() => {}} />;

// @ts-expect-error `onChange` is required
export const missingOnChange = <Textarea value="" />;

export const removedDefaultValue = (
	// @ts-expect-error `defaultValue` was removed in v11
	<Textarea defaultValue="x" onChange={() => {}} value="" />
);
