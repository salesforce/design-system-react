/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import DatePicker from '../';

// The calendar calls `dateDisabled({ date })`, so the type must match.
export const dateDisabled = (
	<DatePicker dateDisabled={({ date }) => date.getDay() === 0} />
);

export const bareDateDisabled = (
	// @ts-expect-error `dateDisabled` receives `{ date }`, not a bare Date
	<DatePicker dateDisabled={(date: Date) => date.getDay() === 0} />
);
