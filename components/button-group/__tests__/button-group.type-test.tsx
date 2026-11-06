/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Button from '../../button';
import ButtonGroup from '../index';

export const baseVariant = (
	<ButtonGroup variant="base" labels={{ label: <b>Actions</b> }}>
		<Button label="One" />
		<Button label="Two" />
	</ButtonGroup>
);

export const unknownVariant = (
	// @ts-expect-error `variant` is `base`, `checkbox` or `list`
	<ButtonGroup variant="toolbar">
		<Button label="One" />
	</ButtonGroup>
);
