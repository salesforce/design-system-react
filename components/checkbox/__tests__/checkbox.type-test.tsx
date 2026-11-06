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

export const toggle = <Checkbox checked variant="toggle" onChange={() => {}} />;

export const indeterminateToggle = (
	// @ts-expect-error a toggle has no `indeterminate` state
	<Checkbox checked variant="toggle" indeterminate onChange={() => {}} />
);

export const classNameOnButtonGroup = (
	// @ts-expect-error `className` is dropped by `button-group`
	<Checkbox checked variant="button-group" className="x" onChange={() => {}} />
);

export const errorTextOnVisualPicker = (
	// @ts-expect-error `errorText` is dropped by `visual-picker`
	<Checkbox checked variant="visual-picker" errorText="x" onChange={() => {}} />
);

export const coverableBase = (
	// @ts-expect-error `coverable` belongs to `visual-picker`
	<Checkbox checked variant="base" coverable onChange={() => {}} />
);

export const visualPicker = (
	<Checkbox
		checked
		variant="visual-picker"
		coverable
		size="large"
		onChange={() => {}}
	/>
);

export const numericTabIndex = (
	<Checkbox checked tabIndex={-1} onChange={() => {}} />
);

export const stringTabIndex = (
	// @ts-expect-error `tabIndex` is a number
	<Checkbox checked tabIndex="0" onChange={() => {}} />
);
