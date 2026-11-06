/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Radio from '../index';

export const base = <Radio checked onChange={() => {}} />;

export const swatch = (
	<Radio checked variant="swatch" style={{ width: 10 }} onChange={() => {}} />
);

export const visualPicker = (
	<Radio
		checked
		variant="visual-picker"
		coverable
		size="large"
		onChange={() => {}}
	/>
);

export const coverableBase = (
	// @ts-expect-error `coverable` belongs to `visual-picker`
	<Radio checked coverable onChange={() => {}} />
);

export const sizeOnButtonGroup = (
	// @ts-expect-error `size` belongs to `visual-picker`
	<Radio checked variant="button-group" size="large" onChange={() => {}} />
);

export const styleOnVisualPicker = (
	// @ts-expect-error `style` belongs to `swatch`
	<Radio checked variant="visual-picker" style={{}} onChange={() => {}} />
);

export const numericTabIndex = (
	<Radio checked tabIndex={-1} onChange={() => {}} />
);

export const stringTabIndex = (
	// @ts-expect-error `tabIndex` is a number
	<Radio checked tabIndex="0" onChange={() => {}} />
);
