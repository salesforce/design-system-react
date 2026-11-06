/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import RadioGroup from '../index';
import Radio from '../radio';

export const base = (
	<RadioGroup value="a" onChange={() => {}}>
		<Radio value="a" labels={{ label: 'A' }} />
	</RadioGroup>
);

export const buttonGroupStyle = (
	<RadioGroup
		value="a"
		variant="button-group"
		style={{ width: 10 }}
		onChange={() => {}}
	>
		<Radio value="a" variant="button-group" labels={{ label: 'A' }} />
	</RadioGroup>
);

export const baseStyle = (
	// @ts-expect-error `style` styles the button-group wrapper
	<RadioGroup value="a" style={{ width: 10 }} onChange={() => {}}>
		<Radio value="a" labels={{ label: 'A' }} />
	</RadioGroup>
);
