/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Grid, { Column } from '../index';

export const vertical = (
	<Grid flavor="vertical">
		<Column>a</Column>
		<Grid.Column>b</Grid.Column>
	</Grid>
);

export const badFlavor = (
	// @ts-expect-error `flavor` is one of the SLDS grid modifiers
	<Grid flavor="sideways" />
);
