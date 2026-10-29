/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import ColorPicker from '../index';

export const base = (
	<ColorPicker defaultSelectedTab="custom" swatchColors={['#000000']} />
);

export const swatches = (
	<ColorPicker swatchColors={['#000000']} variant="swatches" />
);

export const custom = <ColorPicker variant="custom" />;

export const swatchesTab = (
	// @ts-expect-error the swatches variant has no tabs
	<ColorPicker defaultSelectedTab="custom" variant="swatches" />
);

export const customSwatches = (
	// @ts-expect-error the custom variant has no swatches
	<ColorPicker swatchColors={['#000000']} variant="custom" />
);
