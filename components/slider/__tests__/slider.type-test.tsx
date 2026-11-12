/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Slider from '../index';

export const controlled = (
	<Slider
		onChange={(event, data) => {
			const next: number = data.value;
			return [event.target, next];
		}}
		value={50}
	/>
);

// @ts-expect-error `value` is required: Slider is controlled
export const missingValue = <Slider onChange={() => {}} />;

export const removedDefaultValue = (
	// @ts-expect-error `defaultValue` was removed in v11
	<Slider defaultValue={50} onChange={() => {}} value={50} />
);

// @ts-expect-error `onChange` is required unless `disabled` is set
export const missingOnChange = <Slider value={50} />;

// @ts-expect-error `disabled` must be `true`, not just any boolean
export const maybeDisabled = <Slider disabled={false} value={50} />;

export const disabledWithoutOnChange = <Slider disabled value={50} />;
