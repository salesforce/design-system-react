/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import SimpleDataTable from '../index';
import SimpleDataTableColumn from '../column';
import SimpleDataTableRowActions from '../row-actions';

export const table = (
	<SimpleDataTable
		items={[
			{ id: '1', type: 'header-row' },
			{ id: '2', classNameRow: 'x' },
		]}
		assistiveText={{ selectRow: 'Select' }}
	>
		<SimpleDataTableColumn label="Name" property="name" />
	</SimpleDataTable>
);

export const unknownItemType = (
	// @ts-expect-error `type` is `'header-row'` or unset
	<SimpleDataTable items={[{ id: '1', type: 'footer-row' }]} />
);

export const unknownAssistiveText = (
	// @ts-expect-error `assistiveText` has no index signature
	<SimpleDataTable items={[]} assistiveText={{ typo: 'x' }} />
);

export const unknownColumnProp = (
	// @ts-expect-error columns have no index signature
	<SimpleDataTableColumn property="name" typo="x" />
);

export const rowActions = (
	<SimpleDataTableRowActions
		options={[{ label: 'Edit', value: 'edit' }]}
		onAction={(event, { item, option }) => [item.id, option.value]}
	/>
);

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

export const sortHandler = (
	<SimpleDataTable
		items={items}
		onSort={(event, data) =>
			`${event.type} ${data.property} ${data.sortDirection}`
		}
	/>
);

export const legacySortHandler = (
	<SimpleDataTable
		items={items}
		// @ts-expect-error `onSort` is `(event, data)`; the data no longer comes first
		onSort={(data: { property: string }) => data.property}
	/>
);
