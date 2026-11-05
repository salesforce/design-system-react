/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import RadioButtonGroup from '../index';

export const controlled = (
	<RadioButtonGroup onChange={() => {}} value="a">
		{null}
	</RadioButtonGroup>
);

export const missingOnChange = (
	// @ts-expect-error `onChange` is required unless `disabled` is set
	<RadioButtonGroup value="a">{null}</RadioButtonGroup>
);

export const disabledWithoutOnChange = (
	<RadioButtonGroup disabled value="a">
		{null}
	</RadioButtonGroup>
);
