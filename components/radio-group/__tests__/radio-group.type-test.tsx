/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import RadioGroup from '../index';

export const controlled = (
	<RadioGroup
		onChange={(event, data) => {
			const next: string | null = data.value;
			return [event.target, next];
		}}
		value="a"
	>
		{null}
	</RadioGroup>
);

// @ts-expect-error `onChange` is required unless `disabled` is set
export const missingOnChange = <RadioGroup value="a">{null}</RadioGroup>;

export const disabledWithoutOnChange = (
	<RadioGroup disabled value="a">
		{null}
	</RadioGroup>
);
