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

// The calendar calls `dateDisabled({ date })`, so the type must match.
const required = { onChange: () => {}, value: null };

export const dateDisabled = (
	<DatePicker {...required} dateDisabled={({ date }) => date.getDay() === 0} />
);

const isSundayFromBareDate = (date: Date) => date.getDay() === 0;

export const bareDateDisabled = (
	// @ts-expect-error `dateDisabled` receives `{ date }`, not a bare Date
	<DatePicker {...required} dateDisabled={isSundayFromBareDate} />
);
