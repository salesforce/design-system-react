import { render, waitFor, act } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, it, expect } from 'vitest';

import DataTable from '../../data-table';
import DataTableColumn from '../../data-table/column';
import IconSettings from '../../icon-settings';

// Browser-mode counterpart of the data-table keyboard column-resize tests.
// Resizing is driven by the `column-resizer` library, which reads real element
// widths via getBoundingClientRect/offsetWidth — all zero in jsdom — so a
// keyboard resize produces no observable width change there. These run in real
// Chromium (see vitest.config.ts `browser` project).
describe('DataTable column resizing (browser)', () => {
	const items = [
		{ id: '1', name: 'Cloudhub', count: 100976 },
		{ id: '2', name: 'Cloud City', count: 3080 },
	];

	const columns = [
		{ label: 'Name', property: 'name' },
		{ label: 'Count', property: 'count' },
	];

	const renderResizableTable = () =>
		render(
			<IconSettings iconPath="/assets/icons">
				<div style={{ width: '600px' }}>
					<DataTable
						id="resizable-table"
						items={items}
						fixedLayout
						keyboardNavigation
						resizable
						resizableOptions={{ resizeMode: 'fit' }}
					>
						{columns.map((c) => (
							<DataTableColumn {...c} key={c.property} />
						))}
					</DataTable>
				</div>
			</IconSettings>
		);

	// Enter resize mode on the first header: focus a body cell, Up to the header
	// row, Enter to grab the resize grip.
	// Focus + keyboard navigation drive DataTable's activeCell/mode state and the
	// column-resizer, so wrap them in act() to flush React updates cleanly.
	const enterResizeMode = async (container) => {
		const firstCell = container.querySelector('tbody td');
		await act(async () => {
			firstCell.focus();
			await userEvent.keyboard('{ArrowUp}');
			await userEvent.keyboard('{Enter}');
		});
	};

	const firstHeaderWidth = (container) =>
		container.querySelectorAll('thead th')[0].getBoundingClientRect().width;

	it('narrows the column with the left arrow key', async () => {
		const { container } = renderResizableTable();

		// Grips only exist once column-resizer has measured real widths.
		await waitFor(() => {
			expect(
				container.querySelectorAll('.grip-resizable').length
			).toBeGreaterThan(0);
		});

		const initial = firstHeaderWidth(container);
		await enterResizeMode(container);

		await act(async () => {
			await userEvent.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}');
			await userEvent.keyboard('{Escape}');
		});

		await waitFor(() => {
			expect(firstHeaderWidth(container)).toBeLessThan(initial);
		});
	});

	it('widens the column with the right arrow key', async () => {
		const { container } = renderResizableTable();

		await waitFor(() => {
			expect(
				container.querySelectorAll('.grip-resizable').length
			).toBeGreaterThan(0);
		});

		const initial = firstHeaderWidth(container);
		await enterResizeMode(container);

		await act(async () => {
			await userEvent.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}');
			await userEvent.keyboard('{Escape}');
		});

		await waitFor(() => {
			expect(firstHeaderWidth(container)).toBeGreaterThan(initial);
		});
	});
});
