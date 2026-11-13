/*
 * SimpleDataTable render cost (plan D2, checks 2, 3, 4 and 6), with 500 rows.
 * Rows are internal, so they're counted through a module mock.
 */
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach, afterEach } from 'vitest';

import SimpleDataTable from '../index';
import SimpleDataTableColumn from '../column';
import TableContext from '../private/table-context';
import {
	checkBudget,
	getRenderCount,
	renderCounted,
	resetRenderCounts,
	trackContextValue,
} from '~/tests/perf/helpers';

vi.mock('../private/row', async (importOriginal) => {
	const { countRendersModule } = await import('~/tests/perf/helpers');
	return countRendersModule(await importOriginal(), 'Row');
});

const ROWS = 500;
const items = Array.from({ length: ROWS }, (_, i) => ({
	id: `row-${i}`,
	name: `Opportunity ${i}`,
	amount: `$${i * 100}`,
}));
const assistiveText = { selectRow: 'Select row', selectAllRows: 'Select all' };

// The usual parent: inline callbacks, selection in state.
const Example = () => {
	const [selection, setSelection] = useState<typeof items>([]);
	const [, setTick] = useState(0);
	return (
		<>
			<button type="button" onClick={() => setTick((t) => t + 1)}>
				parent
			</button>
			<SimpleDataTable
				id="perf-table"
				assistiveText={assistiveText}
				items={items}
				selectRows="checkbox"
				selection={selection}
				onRowChange={(_event, data) => setSelection(data.selection)}
			>
				<SimpleDataTableColumn label="Name" property="name" primaryColumn />
				<SimpleDataTableColumn label="Amount" property="amount" />
			</SimpleDataTable>
		</>
	);
};

let tableContext: ReturnType<typeof trackContextValue>;
beforeEach(() => {
	resetRenderCounts();
	tableContext = trackContextValue(TableContext);
});
afterEach(() => tableContext.restore());

describe('SimpleDataTable (500 rows)', () => {
	it('re-rendering with identical props re-renders no row (check 2)', () => {
		const columns = [
			<SimpleDataTableColumn key="n" label="Name" property="name" />,
		];
		const result = renderCounted(
			<SimpleDataTable id="perf-table" items={items}>
				{columns}
			</SimpleDataTable>
		);
		resetRenderCounts();
		tableContext.reset();
		result.rerender(
			<SimpleDataTable id="perf-table" items={items}>
				{columns}
			</SimpleDataTable>
		);
		checkBudget(
			'SimpleDataTable/identical-props',
			{
				rowRenders: getRenderCount('Row'),
				tableContextChanges: tableContext.changes,
			},
			{ rowRenders: 0, tableContextChanges: 0 }
		);
		result.unmount();
	});

	it('a parent re-render with new callbacks re-renders no row (checks 3, 4)', async () => {
		const user = userEvent.setup({ delay: null });
		const result = renderCounted(<Example />);
		resetRenderCounts();
		tableContext.reset();
		await user.click(result.getByText('parent'));
		checkBudget(
			'SimpleDataTable/parent-rerender',
			{
				rowRenders: getRenderCount('Row'),
				tableContextChanges: tableContext.changes,
			},
			{ rowRenders: 0, tableContextChanges: 0 }
		);
		result.unmount();
	});

	it('selecting one row re-renders only that row (check 6)', async () => {
		const user = userEvent.setup({ delay: null });
		const result = renderCounted(<Example />);
		const checkboxes = result.getAllByRole('checkbox');
		resetRenderCounts();
		// [0] is select-all.
		await user.click(checkboxes[250]);
		checkBudget(
			'SimpleDataTable/select-row',
			{ rowRenders: getRenderCount('Row') },
			{ rowRenders: 1 }
		);
		result.unmount();
	});
});
