/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import EditDialog from '../edit-dialog';

export const dialog = (
	<EditDialog
		ariaLabelledby="edit-name"
		body="Body"
		isModified
		onSave={() => {}}
		onRequestOpen={(event, data) => [event, data.trigger]}
	/>
);

export const unknownProp = (
	// @ts-expect-error unknown props are rejected
	<EditDialog body="Body" heading="Edit" foo="bar" />
);

export const headingAndLabelledBy = (
	// @ts-expect-error use `heading` or `ariaLabelledby`, not both
	<EditDialog body="Body" heading="Edit" ariaLabelledby="edit-name" />
);
