/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import SimpleDataTable from '../index';

const items = [{ id: '1' }];

export const selectable = (
	<SimpleDataTable
		items={items}
		onRowChange={(_event, data) => data.selection.length}
		selectRows="checkbox"
		selection={[]}
	/>
);

export const missingOnRowChange = (
	// @ts-expect-error `onRowChange` is required when `selectRows` is set
	<SimpleDataTable items={items} selectRows="checkbox" selection={[]} />
);

// Without `selectRows` there is no selection to change
export const notSelectable = <SimpleDataTable items={items} />;
