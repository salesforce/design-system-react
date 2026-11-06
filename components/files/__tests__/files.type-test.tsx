/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import File from '../file';

export const titled = <File labels={{ title: 'Proposal.pdf' }} />;

// @ts-expect-error `labels.title` is required
export const missingLabels = <File />;

export const missingTitle = (
	// @ts-expect-error `labels.title` is required
	<File labels={{}} />
);
