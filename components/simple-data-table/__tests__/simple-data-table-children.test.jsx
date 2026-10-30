import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Dropdown from '../../menu-dropdown';
import SimpleDataTable from '../../simple-data-table';
import SimpleDataTableColumn from '../../simple-data-table/column';
import SimpleDataTableRowActions from '../../simple-data-table/row-actions';
import IconSettings from '../../icon-settings';

const items = [
	{ id: 'a1', name: 'Cloudhub', count: 100 },
	{ id: 'b2', name: 'IoT', count: 200 },
];

const renderTable = (props, children) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<SimpleDataTable id="children-table" items={items} {...props}>
				{children}
			</SimpleDataTable>
		</IconSettings>
	);

describe('SimpleDataTable children', () => {
	it('renders a column child as its cell, without a displayName', () => {
		const CustomCell = ({ item }) => (
			<td className="custom-cell">{`${item.name}!`}</td>
		);
		const { container } = renderTable(
			{},
			<SimpleDataTableColumn label="Name" property="name">
				<CustomCell />
			</SimpleDataTableColumn>
		);
		expect(
			Array.from(container.querySelectorAll('.custom-cell')).map(
				(cell) => cell.textContent
			)
		).toEqual(['Cloudhub!', 'IoT!']);
	});

	it('keeps keyboard navigation inside the row when some children are conditional', () => {
		const { container } = renderTable(
			{ fixedLayout: true, keyboardNavigation: true, selectRows: true },
			[
				<SimpleDataTableColumn key="name" label="Name" property="name" />,
				false,
				null,
				<SimpleDataTableColumn key="count" label="Count" property="count" />,
			]
		);
		const firstRowCells = () =>
			Array.from(container.querySelectorAll('tbody tr:first-child td'));

		for (let i = 0; i < 5; i += 1) {
			fireEvent.keyDown(container.querySelector('tbody td[tabindex="0"]'), {
				key: 'ArrowRight',
				keyCode: 39,
			});
		}
		const cells = firstRowCells();
		expect(cells[cells.length - 1]).toHaveAttribute('tabindex', '0');
	});

	it("keeps a row actions dropdown's own menuPosition in a fixed-header table", () => {
		const { container } = renderTable({ fixedHeader: true }, [
			<SimpleDataTableColumn key="name" label="Name" property="name" />,
			<SimpleDataTableRowActions
				key="actions"
				options={[{ id: 0, label: 'Add to Group', value: '1' }]}
				onAction={() => {}}
				dropdown={<Dropdown menuPosition="relative" />}
			/>,
		]);
		fireEvent.click(
			container.querySelector('tbody td[data-label="Actions"] button')
		);
		expect(
			container.querySelector('tbody td[data-label="Actions"] .slds-dropdown')
		).toBeInTheDocument();
	});
});
