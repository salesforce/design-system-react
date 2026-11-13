/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Input from '../index';

export const base = (
	<Input label="Name" value="a" maxLength={10} tabIndex={0} />
);

export const counter = (
	<Input variant="counter" label="Qty" minValue={0} maxValue={5} step={1} />
);

export const counterPropOnBase = (
	// @ts-expect-error `minValue` belongs to the counter variant
	<Input variant="base" label="Qty" minValue={0} />
);

export const counterPropWithoutVariant = (
	// @ts-expect-error `step` belongs to the counter variant
	<Input label="Qty" step={1} />
);

export const hiddenLabel = <Input assistiveText={{ label: 'Name' }} />;

export const bothLabels = (
	// @ts-expect-error use `label` or `assistiveText.label`, not both
	<Input label="Name" assistiveText={{ label: 'Name' }} />
);

export const fixedLeft = <Input fixedTextLeft="$" />;

export const bothFixedText = (
	// @ts-expect-error use `fixedTextLeft` or `fixedTextRight`, not both
	<Input fixedTextLeft="$" fixedTextRight="USD" />
);

export const stringMaxLength = (
	// @ts-expect-error `maxLength` is a number
	<Input maxLength="7" />
);

export const stringTabIndex = (
	// @ts-expect-error `tabIndex` is a number
	<Input tabIndex="0" />
);
