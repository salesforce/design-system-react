/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import ColorPicker from '../index';

const events = { onChange: () => {} };

export const base = (
	<ColorPicker
		defaultSelectedTab="custom"
		events={events}
		swatchColors={['#000000']}
		value=""
	/>
);

export const swatches = (
	<ColorPicker
		events={events}
		swatchColors={['#000000']}
		value=""
		variant="swatches"
	/>
);

export const custom = <ColorPicker events={events} value="" variant="custom" />;

export const swatchesTab = (
	// @ts-expect-error the swatches variant has no tabs
	<ColorPicker
		defaultSelectedTab="custom"
		events={events}
		value=""
		variant="swatches"
	/>
);

export const customSwatches = (
	// @ts-expect-error the custom variant has no swatches
	<ColorPicker
		events={events}
		swatchColors={['#000000']}
		value=""
		variant="custom"
	/>
);

// `value` is controlled data, so it is required
// @ts-expect-error `value` is required
export const missingValue = <ColorPicker events={events} />;

export const controlledOpen = (
	<ColorPicker
		events={events}
		isOpen={false}
		onRequestOpen={() => {}}
		value="#ffffff"
	/>
);

export const uncontrolledOpen = (
	<ColorPicker defaultIsOpen events={events} value="#ffffff" />
);

// `events.onChange` is required unless `disabled` is set: without it, choosing
// a color does nothing
// @ts-expect-error `events.onChange` is required
export const missingOnChange = <ColorPicker value="" />;

// @ts-expect-error `events.onChange` is required, not just `events`
export const missingEventsOnChange = <ColorPicker events={{}} value="" />;

export const disabledWithoutOnChange = <ColorPicker disabled value="" />;
