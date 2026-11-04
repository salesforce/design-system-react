/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import DatePicker from '../index';

export const controlled = (
	<DatePicker
		onChange={(_event, data) => {
			const next: Date | null = data.date;
			return next;
		}}
		value={null}
	/>
);

// @ts-expect-error `onChange` is required unless `disabled` is set
export const missingOnChange = <DatePicker value={null} />;

export const disabledWithoutOnChange = <DatePicker disabled value={null} />;
