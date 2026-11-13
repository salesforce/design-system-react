/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Button from '../index';

export const iconButton = (
	<Button
		variant="icon"
		iconName="close"
		iconVariant="border"
		iconSize="x-small"
	/>
);

export const iconVariantOnLabelButton = (
	// @ts-expect-error `iconVariant` belongs to `variant="icon"`
	<Button label="Save" variant="neutral" iconVariant="border" />
);

export const nativeAttributes = (
	<Button label="Save" name="save" value="1" role="tab" />
);

// @ts-expect-error `tabIndex` is a number
export const stringTabIndex = <Button label="Save" tabIndex="0" />;
