/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Checkbox from '../index';

export const controlled = (
	<Checkbox
		checked
		onChange={(event, data) => {
			const next: boolean = data.checked;
			return [event.target, next];
		}}
	/>
);

// @ts-expect-error `onChange` is required unless `disabled` or `readOnly` is set
export const missingOnChange = <Checkbox checked />;

// @ts-expect-error `disabled` must be `true`, not just any boolean
export const maybeDisabled = <Checkbox checked disabled={false} />;

export const disabledWithoutOnChange = <Checkbox checked disabled />;

export const readOnlyWithoutOnChange = <Checkbox checked readOnly />;

export const maybeDisabledWithOnChange = (
	<Checkbox checked disabled={Math.random() > 0.5} onChange={() => {}} />
);
