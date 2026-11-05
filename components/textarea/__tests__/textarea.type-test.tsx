/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Textarea from '../index';

const noop = () => {};

export const numeric = <Textarea maxLength={100} onChange={noop} value="" />;

export const stringLength = (
	// @ts-expect-error `maxLength` is a number
	<Textarea maxLength="100" onChange={noop} value="" />
);

export const changeData = (
	<Textarea
		onChange={(event, data) => {
			const text: string = data.value;
			return [event.target, text];
		}}
		value=""
	/>
);

// @ts-expect-error `value` is required
export const missingValue = <Textarea onChange={noop} />;

// @ts-expect-error `onChange` is required
export const missingOnChange = <Textarea value="" />;

export const removedDefaultValue = (
	// @ts-expect-error `defaultValue` was removed in v11
	<Textarea defaultValue="x" onChange={noop} value="" />
);
