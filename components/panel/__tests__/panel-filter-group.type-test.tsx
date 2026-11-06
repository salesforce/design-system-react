/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import PanelFilterGroup from '../filtering/group';

export const panel = (
	<PanelFilterGroup
		variant="panel"
		modified
		onClickAdd={(event) => event.preventDefault()}
		onRequestSave={() => {}}
	/>
);

export const slots = (
	<PanelFilterGroup header={<h2>Filters</h2>} footer={<span>Done</span>} />
);

export const headerOnPanel = (
	// @ts-expect-error the panel variant renders its own header
	<PanelFilterGroup variant="panel" header={<h2>Filters</h2>} />
);

export const callbackWithoutPanel = (
	// @ts-expect-error `onClickAdd` belongs to the panel variant's footer
	<PanelFilterGroup onClickAdd={() => {}} />
);

export const unknownProp = (
	// @ts-expect-error unknown props are rejected
	<PanelFilterGroup variant="panel" foo="bar" />
);
