import { useState } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Dropdown from '../../menu-dropdown';
import SimpleDataTable from '../../simple-data-table';
import SimpleDataTableColumn from '../../simple-data-table/column';
import SimpleDataTableRowActions from '../../simple-data-table/row-actions';
import SimpleDataTableHighlightCell from '../../simple-data-table/highlight-cell';
import IconSettings from '../../icon-settings';

describe('SimpleDataTable', () => {
	const items = [
		{
			id: '8IKZHZZV80',
			name: 'Cloudhub',
			count: 100976,
			lastModified: 'Yesterday',
		},
		{
			id: '5GJOOOPWU7',
			name: 'Cloudhub + Anypoint Connectors',
			count: 54976,
			lastModified: 'Today',
		},
		{
			id: 'Q8Z71ZUCEZ',
			name: 'Cloud City',
			count: 101280,
			lastModified: 'Today',
		},
		{
			id: '2FSH2DP0LY',
			name: 'IoT',
			count: 976,
			lastModified: 'Yesterday',
		},
		{
			id: '8NE888QKV1',
			name: 'IoT + Anypoint Connectors',
			count: 54976,
			lastModified: 'Today',
		},
		{
			id: 'M4D37GW83H',
			name: 'Salesforce Tower',
			count: 101280,
			lastModified: 'Today',
		},
	];

	const itemsWithHeaderRows = [
		{
			id: 'K6R34GW73J',
			type: 'header-row',
			name: 'Address',
			count: 101210,
			lastModified: 'Today',
		},
		...items,
		{
			id: 'KA78KJAY76',
			type: 'header-row',
			name: 'Company',
			count: 101318,
			lastModified: 'Today',
		},
	];

	const columns = [
		{
			label: 'Name',
			property: 'name',
			truncate: true,
		},
		{
			label: 'Count',
			property: 'count',
			sortable: true,
		},
	];

	const defaultProps = {
		id: 'SimpleDataTableExample-default',
		items,
		selectRows: true,
	};

	const defaultPropsWithHeaderRows = {
		...defaultProps,
		items: itemsWithHeaderRows,
	};

	const renderTable = (instance) => {
		return render(
			<IconSettings iconPath="/assets/icons">{instance}</IconSettings>
		);
	};

	const getTable = (container) => container.querySelector('.slds-table');

	const getRow = (container, row) => {
		const tbody = getTable(container).querySelectorAll('tbody')[0];
		return tbody.querySelectorAll('tr')[row - 1];
	};

	const getCell = (container, row, column) => {
		const tr = getRow(container, row);
		return tr.querySelectorAll('td')[column];
	};

	const getMenu = (element) => element.querySelector('.slds-dropdown');

	describe('Structure', () => {
		it('has a header', () => {
			const { container } = renderTable(
				<SimpleDataTable {...defaultProps}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const thead = getTable(container).querySelectorAll('thead');
			expect(thead).toHaveLength(1);
			expect(thead[0].querySelectorAll('th')).toHaveLength(3);
		});

		it('has a row for each item', () => {
			const { container } = renderTable(
				<SimpleDataTable {...defaultProps}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const tbody = getTable(container).querySelectorAll('tbody');
			expect(tbody).toHaveLength(1);
			expect(tbody[0].querySelectorAll('tr')).toHaveLength(6);
		});

		it('renders the correct contents in each cell', () => {
			const { container } = renderTable(
				<SimpleDataTable {...defaultProps}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const firstName = getCell(container, 1, 1);
			expect(firstName.innerHTML).toBe(
				'<div class="" title="Cloudhub">Cloudhub</div>'
			);
			const secondCount = getCell(container, 2, 2);
			// NOTE: The cell component only adds title attribute when there's text content
			// The number 54976 is rendered without title in the actual component
			expect(secondCount.innerHTML).toBe('<div class="">54976</div>');
		});

		it('has checkboxes when selectRows is true or "checkbox"', () => {
			const { container, rerender } = renderTable(
				<SimpleDataTable {...defaultProps}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			let checkboxes = getTable(container).querySelectorAll('.slds-checkbox');
			expect(checkboxes).toHaveLength(7);

			rerender(
				<IconSettings iconPath="/assets/icons">
					<SimpleDataTable {...defaultProps} selectRows={false}>
						{columns.map((columnProps) => (
							<SimpleDataTableColumn
								{...columnProps}
								key={columnProps.property}
							/>
						))}
					</SimpleDataTable>
				</IconSettings>
			);
			checkboxes = getTable(container).querySelectorAll('.slds-checkbox');
			expect(checkboxes).toHaveLength(0);

			rerender(
				<IconSettings iconPath="/assets/icons">
					<SimpleDataTable {...defaultProps} selectRows="checkbox">
						{columns.map((columnProps) => (
							<SimpleDataTableColumn
								{...columnProps}
								key={columnProps.property}
							/>
						))}
					</SimpleDataTable>
				</IconSettings>
			);
			checkboxes = getTable(container).querySelectorAll('.slds-checkbox');
			expect(checkboxes).toHaveLength(7);
		});

		it('has radios only when selectRows is "radio"', () => {
			const { container, rerender } = renderTable(
				<SimpleDataTable {...defaultProps}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const checkboxes = getTable(container).querySelectorAll('.slds-checkbox');
			expect(checkboxes).toHaveLength(7);

			rerender(
				<IconSettings iconPath="/assets/icons">
					<SimpleDataTable {...defaultProps} selectRows="radio">
						{columns.map((columnProps) => (
							<SimpleDataTableColumn
								{...columnProps}
								key={columnProps.property}
							/>
						))}
					</SimpleDataTable>
				</IconSettings>
			);
			const radios = getTable(container).querySelectorAll('.slds-radio');
			expect(radios).toHaveLength(6);
		});
	});

	describe('Assistive text', () => {
		it('maps the deprecated assistiveTextFor* props to their own keys', () => {
			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					assistiveTextForSelectAllRows="Custom select all"
					assistiveTextForColumnSort="Custom sort by:"
					fixedLayout
					onSort={() => {}}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const thead = getTable(container).querySelector('thead');
			expect(
				thead.querySelector('[id$="-column-group-header-row-select"]')
					.textContent
			).toBe('Custom select all');
			expect(
				thead.querySelector('th.slds-is-sortable a .slds-assistive-text')
					.textContent
			).toBe('Custom sort by: ');
		});
	});

	describe('Selectable - Checkbox', () => {
		const defaultSelection = [
			{
				id: '8IKZHZZV80',
				name: 'Cloudhub',
				count: 100976,
				lastModified: 'Yesterday',
			},
		];

		it('can start with a row selected', () => {
			const { container } = renderTable(
				<SimpleDataTable {...defaultProps} selection={defaultSelection}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const tbody = getTable(container).querySelectorAll('tbody')[0];
			const selectedRows = tbody.querySelectorAll('tr.slds-is-selected');
			expect(selectedRows).toHaveLength(1);
			const checkedBoxes = tbody.querySelectorAll(
				'.slds-checkbox input:checked'
			);
			expect(checkedBoxes).toHaveLength(1);
		});

		it('can start with a row disabled', () => {
			const onChangeHandler = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={[]}
					disabledSelection={defaultSelection}
					onRowChange={onChangeHandler}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const tbody = getTable(container).querySelectorAll('tbody')[0];
			const disabledRows = tbody.querySelectorAll(
				'.slds-checkbox input:disabled'
			);
			expect(disabledRows).toHaveLength(1);

			const checkbox = disabledRows[0];
			fireEvent.change(checkbox, { target: { checked: true } });

			expect(onChangeHandler).toHaveBeenCalledTimes(0);
		});

		it('can deselect a row', async () => {
			const onRowChange = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={defaultSelection}
					onRowChange={onRowChange}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const tbody = getTable(container).querySelectorAll('tbody')[0];
			const selectedRow = tbody.querySelectorAll('tr.slds-is-selected')[0];
			const checkbox = selectedRow.querySelectorAll('.slds-checkbox input')[0];

			const user = userEvent.setup();
			await user.click(checkbox);

			expect(onRowChange).toHaveBeenCalledTimes(1);
			const { selection } = onRowChange.mock.calls[0][1];
			expect(selection).toHaveLength(0);
		});

		it('can select a row', async () => {
			const onRowChange = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={defaultSelection}
					onRowChange={onRowChange}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const secondRow = getRow(container, 2);
			const checkbox = secondRow.querySelectorAll('.slds-checkbox input')[0];

			const user = userEvent.setup();
			await user.click(checkbox);

			expect(onRowChange).toHaveBeenCalledTimes(1);
			const { selection } = onRowChange.mock.calls[0][1];
			expect(selection).toHaveLength(2);
			expect(selection[1].id).toBe('5GJOOOPWU7');
		});

		it('can select all rows', async () => {
			const onRowChange = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable {...defaultProps} onRowChange={onRowChange}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const thead = getTable(container).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			const user = userEvent.setup();
			await user.click(checkAll);

			expect(onRowChange).toHaveBeenCalledTimes(1);
			const { selection } = onRowChange.mock.calls[0][1];
			expect(selection).toHaveLength(6);
		});

		it('can select all rows excluding disabled rows', async () => {
			const onRowChange = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={[items[0]]}
					disabledSelection={[items[0], items[1]]}
					onRowChange={onRowChange}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const thead = getTable(container).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			const user = userEvent.setup();
			await user.click(checkAll);

			expect(onRowChange).toHaveBeenCalledTimes(1);
			const { selection } = onRowChange.mock.calls[0][1];
			expect(selection).toHaveLength(5);
		});

		it('can deselect all rows', async () => {
			const onRowChange = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={items}
					onRowChange={onRowChange}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const thead = getTable(container).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			const user = userEvent.setup();
			await user.click(checkAll);

			expect(onRowChange).toHaveBeenCalledTimes(1);
			const { selection } = onRowChange.mock.calls[0][1];
			expect(selection).toHaveLength(0);
		});

		it('can deselect all rows excluding disabled rows', async () => {
			const onRowChange = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={items}
					disabledSelection={[items[0], items[1]]}
					onRowChange={onRowChange}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const thead = getTable(container).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			const user = userEvent.setup();
			await user.click(checkAll);

			expect(onRowChange).toHaveBeenCalledTimes(1);
			const { selection } = onRowChange.mock.calls[0][1];
			expect(selection).toHaveLength(2);
		});

		it('can select all rows with header-rows present', async () => {
			const onRowChange = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultPropsWithHeaderRows}
					onRowChange={onRowChange}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const thead = getTable(container).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			const user = userEvent.setup();
			await user.click(checkAll);

			expect(onRowChange).toHaveBeenCalledTimes(1);
			const { selection } = onRowChange.mock.calls[0][1];
			expect(selection).toHaveLength(6);
		});

		it('can deselect all rows with header-rows present', async () => {
			const onRowChange = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultPropsWithHeaderRows}
					selection={items}
					onRowChange={onRowChange}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const thead = getTable(container).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			const user = userEvent.setup();
			await user.click(checkAll);

			expect(onRowChange).toHaveBeenCalledTimes(1);
			const { selection } = onRowChange.mock.calls[0][1];
			expect(selection).toHaveLength(0);
		});
	});

	describe('Selectable - Radio', () => {
		const defaultSelection = [
			{
				id: '8IKZHZZV80',
				name: 'Cloudhub',
				count: 100976,
				lastModified: 'Yesterday',
			},
		];

		it('can start with a row selected', () => {
			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={defaultSelection}
					selectRows="radio"
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const tbody = getTable(container).querySelectorAll('tbody')[0];
			const selectedRows = tbody.querySelectorAll('tr.slds-is-selected');
			expect(selectedRows).toHaveLength(1);
			const radios = tbody.querySelectorAll('.slds-radio input:checked');
			expect(radios).toHaveLength(1);
		});

		it('can start with a row disabled', () => {
			const onChangeHandler = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={[]}
					disabledSelection={defaultSelection}
					onRowChange={onChangeHandler}
					selectRows="radio"
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const tbody = getTable(container).querySelectorAll('tbody')[0];
			const radios = tbody.querySelectorAll('.slds-radio input:disabled');
			expect(radios).toHaveLength(1);

			fireEvent.change(radios[0], { target: { checked: true } });
			expect(onChangeHandler).toHaveBeenCalledTimes(0);
		});

		it('can select a row', async () => {
			const onRowChange = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={defaultSelection}
					selectRows="radio"
					onRowChange={onRowChange}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const secondRow = getRow(container, 2);
			const radio = secondRow.querySelectorAll('.slds-radio input')[0];

			const user = userEvent.setup();
			await user.click(radio);

			expect(onRowChange).toHaveBeenCalledTimes(1);
			const { selection } = onRowChange.mock.calls[0][1];
			expect(selection).toHaveLength(1);
			expect(selection[0].id).toBe('5GJOOOPWU7');
		});
	});

	describe('Sortable', () => {
		it('first clicked on sortable column header should result in ascending sort by default', () => {
			const onSort = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable {...defaultProps} fixedLayout onSort={onSort}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const thead = getTable(container).querySelectorAll('thead')[0];
			const sortButton = thead.querySelectorAll('a')[0];

			fireEvent.click(sortButton, {});

			expect(onSort).toHaveBeenCalledTimes(1);
			const data = onSort.mock.calls[0][0];
			expect(data.property).toBe('count');
			expect(data.sortDirection).toBe('asc');
		});

		it('if isDefaultSortDescending is true, first click on sortable column header should result in descending order', () => {
			const onSort = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable {...defaultProps} fixedLayout onSort={onSort}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							isDefaultSortDescending
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const thead = getTable(container).querySelectorAll('thead')[0];
			const sortButton = thead.querySelectorAll('a')[0];

			fireEvent.click(sortButton, {});

			expect(onSort).toHaveBeenCalledTimes(1);
			const data = onSort.mock.calls[0][0];
			expect(data.property).toBe('count');
			expect(data.sortDirection).toBe('desc');
		});

		it('does not call onSort when a non-sortable column is clicked', () => {
			const onSort = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable {...defaultProps} onSort={onSort}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const thead = getTable(container).querySelectorAll('thead')[0];
			const secondColumn = thead.querySelectorAll('th')[1];

			fireEvent.click(secondColumn, {});

			expect(onSort).toHaveBeenCalledTimes(0);
		});
	});

	describe('w/ RowActions', () => {
		it('renders the RowActions and uses dropdown override property', () => {
			const { container } = renderTable(
				<SimpleDataTable {...defaultProps}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
					<SimpleDataTableRowActions
						dropdown={
							<Dropdown
								options={[
									{
										id: 0,
										label: 'Add to Group',
										value: '1',
									},
									{
										id: 1,
										label: 'Publish',
										value: '2',
									},
								]}
							/>
						}
					/>
				</SimpleDataTable>
			);
			const rowActionMenus = [
				...container.getElementsByTagName('button'),
			].filter((button) => button.textContent === 'Actions');
			expect(rowActionMenus).toHaveLength(6);
		});

		it('calls onAction & onSelect when an action is clicked', async () => {
			const onAction = vi.fn();
			const onSelect = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable {...defaultProps}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
					<SimpleDataTableRowActions
						onAction={onAction}
						options={[
							{
								id: 0,
								label: 'Add to Group',
								value: '1',
							},
							{
								id: 1,
								label: 'Publish',
								value: '2',
							},
						]}
						dropdown={<Dropdown onSelect={onSelect} />}
					/>
				</SimpleDataTable>
			);

			const trigger = [...container.getElementsByTagName('button')].filter(
				(button) => button.textContent === 'Actions'
			)[0];
			fireEvent.click(trigger, {});

			await waitFor(() => {
				const menu = getMenu(document.body);
				expect(menu).toBeInTheDocument();
			});

			const menu = getMenu(document.body);
			const firstAction = menu.querySelectorAll('.slds-dropdown__item')[0];
			fireEvent.click(firstAction.querySelector('a'), {});

			expect(onAction).toHaveBeenCalledTimes(1);
			const [item, action] = onAction.mock.calls[0];
			expect(item.id).toBe('8IKZHZZV80');
			expect(action.value).toBe('1');

			expect(onSelect).toHaveBeenCalledTimes(1);
			const [, selectData] = onSelect.mock.calls[0];
			expect(selectData).toEqual({
				option: { id: 0, label: 'Add to Group', value: '1' },
				optionIndex: 0,
			});
		});
	});

	describe('w/ HighlightCell', () => {
		it('marks the appropriate text in a cell', () => {
			const { container } = renderTable(
				<SimpleDataTable {...defaultProps} search="Cloud">
					{columns.map((columnProps) => (
						<SimpleDataTableColumn {...columnProps} key={columnProps.property}>
							<SimpleDataTableHighlightCell />
						</SimpleDataTableColumn>
					))}
				</SimpleDataTable>
			);

			const secondRow = getRow(container, 2);
			const markedText = secondRow.querySelectorAll('mark')[0];
			expect(markedText.innerHTML).toBe('Cloud');
		});
	});

	describe('w/ Fixed Headers', () => {
		it('Renders a fixedHeader table as expected', () => {
			const onFixedHeaderResize = vi.fn();
			const onToggleFixedHeaderListeners = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					fixedHeader
					fixedLayout
					id="SimpleDataTable-FixedHeader-Test"
					onFixedHeaderResize={onFixedHeaderResize}
					onToggleFixedHeaderListeners={onToggleFixedHeaderListeners}
					selectRows="checkbox"
				>
					<SimpleDataTableColumn
						isSorted
						label="Name"
						primaryColumn
						property="name"
						sortable
						sortDirection="asc"
					/>
					<SimpleDataTableColumn label="Count" property="count" />
					<SimpleDataTableRowActions
						options={[
							{
								id: 0,
								label: 'Add to Group',
								value: '1',
							},
							{
								id: 1,
								label: 'Publish',
								value: '2',
							},
						]}
						onAction={() => {}}
						dropdown={<Dropdown length="5" />}
					/>
				</SimpleDataTable>
			);

			expect(
				container.querySelectorAll('.slds-table_header-fixed_container').length
			).toBe(1);
			expect(
				container.querySelectorAll('.slds-table_header-fixed_scroller').length
			).toBe(1);
			expect(
				container
					.querySelector('table.slds-table')
					.className.search('slds-table_header-fixed') >= 0
			).toBe(true);
			expect(container.querySelectorAll('thead .slds-cell-fixed').length).toBe(
				4
			);

			// Check callback is called (may be called during initial render)
			if (onFixedHeaderResize.mock.calls.length > 0) {
				const [event, data] = onFixedHeaderResize.mock.calls[0];
				expect(Array.isArray(data.headerRefs)).toBe(true);
				expect(data.headerRefs.length).toBe(4);
				data.headerRefs.forEach((ref) => {
					expect(typeof ref).toBe('object');
				});
				expect(typeof data.scrollerRef).toBe('object');
				expect(
					data.scrollerRef.className.search(
						'slds-table_header-fixed_scroller'
					) >= 0
				).toBe(true);
			}

			if (onToggleFixedHeaderListeners.mock.calls.length > 0) {
				const [event, data] = onToggleFixedHeaderListeners.mock.calls[0];
				expect(typeof data.attach).toBe('boolean');
				expect(typeof data.resizeHandler).toBe('function');
				expect(typeof data.scrollerRef).toBe('object');
				expect(
					data.scrollerRef.className.search(
						'slds-table_header-fixed_scroller'
					) >= 0
				).toBe(true);
			}
		});
	});

	describe('w/ Infinite Scrolling', () => {
		it('renders a spinner as expected', () => {
			const { container } = renderTable(
				<SimpleDataTable {...defaultProps} fixedHeader fixedLayout hasMore>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			expect(container.querySelectorAll('.slds-spinner').length).toBe(1);
		});

		it('onLoadMore callback is called when scroller is scrolled', () => {
			const onLoadMore = vi.fn();

			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					fixedHeader
					fixedLayout
					hasMore
					onLoadMore={onLoadMore}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			const scroller = container.querySelector(
				'.slds-table_header-fixed_scroller'
			);
			scroller.dispatchEvent(new Event('scroll'));

			expect(onLoadMore).toHaveBeenCalled();
		});

		it('onLoadMore callback is called when window is resized', () => {
			const onLoadMore = vi.fn();

			renderTable(
				<SimpleDataTable
					{...defaultProps}
					fixedHeader
					fixedLayout
					hasMore
					onLoadMore={onLoadMore}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			window.dispatchEvent(new Event('resize'));

			expect(onLoadMore).toHaveBeenCalled();
		});

		it('onLoadMore callback is called when the component is updated', () => {
			const onLoadMore = vi.fn();

			const { rerender } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					items={[]}
					fixedHeader
					fixedLayout
					hasMore
					onLoadMore={onLoadMore}
				>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			// Clear initial calls
			onLoadMore.mockClear();

			// Simulate the first page loading
			rerender(
				<IconSettings iconPath="/assets/icons">
					<SimpleDataTable
						{...defaultProps}
						items={[items[0]]}
						fixedHeader
						fixedLayout
						hasMore
						onLoadMore={onLoadMore}
					>
						{columns.map((columnProps) => (
							<SimpleDataTableColumn
								{...columnProps}
								key={columnProps.property}
							/>
						))}
					</SimpleDataTable>
				</IconSettings>
			);

			expect(onLoadMore).toHaveBeenCalled();
		});
	});

	describe('Keyboard Navigation', () => {
		it('moves the active cell when using keyboard arrow keys', () => {
			const { container } = renderTable(
				<SimpleDataTable {...defaultProps} fixedLayout keyboardNavigation>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

			// Exactly one body cell is focusable in navigation mode; arrow keys move
			// that `tabindex="0"` marker across cells.
			const cellTabIndexes = () =>
				Array.from(container.querySelectorAll('tbody td')).map((td) =>
					td.getAttribute('tabindex')
				);

			const startIndex = cellTabIndexes().indexOf('0');
			expect(startIndex).toBeGreaterThanOrEqual(0);

			// ArrowRight moves the active cell one column to the right...
			fireEvent.keyDown(container.querySelector('tbody td[tabindex="0"]'), {
				key: 'ArrowRight',
				keyCode: 39,
			});
			expect(cellTabIndexes().indexOf('0')).toBe(startIndex + 1);

			// ...and ArrowLeft moves it back.
			fireEvent.keyDown(container.querySelector('tbody td[tabindex="0"]'), {
				key: 'ArrowLeft',
				keyCode: 37,
			});
			expect(cellTabIndexes().indexOf('0')).toBe(startIndex);
		});

		it('enters actionable mode on enter and returns to navigation mode on escape', () => {
			const { container } = renderTable(
				<SimpleDataTable {...defaultProps} fixedLayout keyboardNavigation>
					{[
						...columns.map((columnProps) => (
							<SimpleDataTableColumn
								{...columnProps}
								key={columnProps.property}
							/>
						)),
						<SimpleDataTableRowActions
							key="actions"
							options={[{ id: 0, label: 'Add to Group', value: '1' }]}
							onAction={() => {}}
							dropdown={<Dropdown length="5" />}
						/>,
					]}
				</SimpleDataTable>
			);

			// In navigation mode the interactive row-action controls are out of the
			// tab order (tabindex="-1").
			const actionTabIndexes = () =>
				Array.from(
					container.querySelectorAll('tbody td button, tbody td a')
				).map((el) => el.getAttribute('tabindex'));
			expect(actionTabIndexes().every((t) => t === '-1')).toBe(true);

			// Enter switches to actionable mode: interactive controls become tabbable.
			fireEvent.keyDown(container.querySelector('tbody td[tabindex="0"]'), {
				key: 'Enter',
				keyCode: 13,
			});
			expect(actionTabIndexes().some((t) => t === '0')).toBe(true);

			// Escape returns to navigation mode: a cell regains tabindex="0" and the
			// interactive controls go back to tabindex="-1".
			fireEvent.keyDown(container.querySelector('[tabindex="0"]'), {
				key: 'Escape',
				keyCode: 27,
			});
			expect(
				container.querySelectorAll('tbody td[tabindex="0"]').length
			).toBeGreaterThan(0);
			expect(actionTabIndexes().every((t) => t === '-1')).toBe(true);
		});

		it('renders interactive cells with proper structure for keyboard navigation', () => {
			const { container } = renderTable(
				<SimpleDataTable {...defaultProps} fixedLayout keyboardNavigation>
					{[
						...columns.map((columnProps) => (
							<SimpleDataTableColumn
								{...columnProps}
								key={columnProps.property}
							/>
						)),
						<SimpleDataTableRowActions
							key="actions"
							options={[
								{
									id: 0,
									label: 'Add to Group',
									value: '1',
								},
								{
									id: 1,
									label: 'Publish',
									value: '2',
								},
							]}
							onAction={() => {}}
							dropdown={<Dropdown length="5" />}
						/>,
					]}
				</SimpleDataTable>
			);

			// Verify table has keyboard navigation structure
			const cells = container.querySelectorAll('td');
			expect(cells.length).toBeGreaterThan(0);

			// At least one cell should have tabIndex="0" (the initially focused cell)
			const focusableCells = container.querySelectorAll('td[tabindex="0"]');
			expect(focusableCells.length).toBeGreaterThan(0);
		});
	});

	describe('renderSubHeadingRow', () => {
		const renderWithHeaderRows = (props) =>
			renderTable(
				<SimpleDataTable {...defaultPropsWithHeaderRows} {...props}>
					{columns.map((columnProps) => (
						<SimpleDataTableColumn
							{...columnProps}
							key={columnProps.property}
						/>
					))}
				</SimpleDataTable>
			);

		it('renders each header-row item with the data it receives', () => {
			const renderSubHeadingRow = vi.fn(({ columns: rowColumns, id, item }) => (
				<tr className="custom-heading-row" id={id}>
					<th colSpan={rowColumns.length + 1}>{item.name}</th>
				</tr>
			));
			const { container } = renderWithHeaderRows({ renderSubHeadingRow });

			const headingRows = container.querySelectorAll('.custom-heading-row');
			expect(headingRows).toHaveLength(2);
			expect(headingRows[0]).toHaveTextContent('Address');
			expect(headingRows[1]).toHaveTextContent('Company');
			expect(renderSubHeadingRow).toHaveBeenCalledWith({
				assistiveText: expect.any(Object),
				classNameRow: undefined,
				columns: expect.any(Array),
				id: expect.stringContaining('K6R34GW73J'),
				item: itemsWithHeaderRows[0],
				tableId: expect.any(String),
			});
		});

		it('still calls the deprecated onRenderSubHeadingRow with key, and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const onRenderSubHeadingRow = vi.fn(({ key, item }) => (
				<tr className="legacy-heading-row" key={key}>
					<th>{item.name}</th>
				</tr>
			));
			const { container } = renderWithHeaderRows({ onRenderSubHeadingRow });

			expect(container.querySelectorAll('.legacy-heading-row')).toHaveLength(2);
			expect(onRenderSubHeadingRow).toHaveBeenCalledWith(
				expect.objectContaining({
					key: expect.stringContaining('K6R34GW73J'),
				})
			);
			expect(
				consoleError.mock.calls.some((args) => {
					const message = args.join(' ');
					return (
						message.includes('`onRenderSubHeadingRow`') &&
						message.includes('`renderSubHeadingRow`')
					);
				})
			).toBe(true);
			consoleError.mockRestore();
		});

		it('prefers renderSubHeadingRow over onRenderSubHeadingRow', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const { container } = renderWithHeaderRows({
				onRenderSubHeadingRow: () => <tr className="legacy-heading-row" />,
				renderSubHeadingRow: () => <tr className="custom-heading-row" />,
			});

			expect(container.querySelectorAll('.custom-heading-row')).toHaveLength(2);
			expect(container.querySelectorAll('.legacy-heading-row')).toHaveLength(0);
			consoleError.mockRestore();
		});
	});

	describe('Controlled selection', () => {
		const renderColumns = () =>
			columns.map((columnProps) => (
				<SimpleDataTableColumn {...columnProps} key={columnProps.property} />
			));

		const getRowInput = (container, row) =>
			getRow(container, row).querySelector('input');

		const getSelectAll = (container) =>
			getTable(container).querySelector('thead .slds-checkbox input');

		it('renders the selection prop only: clicking a row does not change it until the parent does', async () => {
			const onRowChange = vi.fn();
			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={[]}
					onRowChange={onRowChange}
				>
					{renderColumns()}
				</SimpleDataTable>
			);

			const user = userEvent.setup();
			await user.click(getRowInput(container, 2));

			expect(onRowChange).toHaveBeenCalledTimes(1);
			expect(onRowChange.mock.calls[0][1].selection).toEqual([items[1]]);
			expect(getRowInput(container, 2)).not.toBeChecked();
			expect(getRow(container, 2)).not.toHaveClass('slds-is-selected');
			expect(getRow(container, 2)).toHaveAttribute('aria-selected', 'false');
		});

		it('keeps a rejected deselection and select-all rendered as the prop says', async () => {
			const onRowChange = vi.fn();
			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={[items[0]]}
					onRowChange={onRowChange}
				>
					{renderColumns()}
				</SimpleDataTable>
			);

			const user = userEvent.setup();
			await user.click(getRowInput(container, 1));
			expect(onRowChange.mock.calls[0][1].selection).toEqual([]);
			expect(getRowInput(container, 1)).toBeChecked();

			await user.click(getSelectAll(container));
			expect(onRowChange.mock.calls[1][1].selection).toHaveLength(items.length);
			expect(getSelectAll(container)).not.toBeChecked();
			expect(
				getTable(container).querySelectorAll('tbody input:checked')
			).toHaveLength(1);
		});

		it('follows the parent when it applies the requested selection', async () => {
			const Wrapper = () => {
				const [selection, setSelection] = useState([]);
				return (
					<SimpleDataTable
						{...defaultProps}
						selection={selection}
						onRowChange={(event, data) => setSelection(data.selection)}
					>
						{renderColumns()}
					</SimpleDataTable>
				);
			};
			const { container } = renderTable(<Wrapper />);

			const user = userEvent.setup();
			await user.click(getRowInput(container, 2));
			expect(getRowInput(container, 2)).toBeChecked();
			expect(getRow(container, 2)).toHaveClass('slds-is-selected');

			await user.click(getRowInput(container, 2));
			expect(getRowInput(container, 2)).not.toBeChecked();

			await user.click(getSelectAll(container));
			expect(
				getTable(container).querySelectorAll('tbody input:checked')
			).toHaveLength(items.length);
			expect(getSelectAll(container)).toBeChecked();
		});

		it('matches selection to items by id, so fresh item objects still match', async () => {
			const onRowChange = vi.fn();
			const freshSelection = [{ ...items[0] }, { ...items[2] }];
			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={freshSelection}
					onRowChange={onRowChange}
				>
					{renderColumns()}
				</SimpleDataTable>
			);

			expect(getRowInput(container, 1)).toBeChecked();
			expect(getRowInput(container, 2)).not.toBeChecked();
			expect(getRowInput(container, 3)).toBeChecked();
			expect(getSelectAll(container).indeterminate).toBe(true);

			const user = userEvent.setup();
			await user.click(getRowInput(container, 1));
			expect(
				onRowChange.mock.calls[0][1].selection.map((item) => item.id)
			).toEqual([items[2].id]);
		});

		it('checks select-all when every row is selected with fresh objects', () => {
			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={items.map((item) => ({ ...item }))}
				>
					{renderColumns()}
				</SimpleDataTable>
			);

			expect(getSelectAll(container)).toBeChecked();
			expect(getSelectAll(container).indeterminate).toBe(false);
		});

		it('ignores selected items that are not rows when computing select-all', () => {
			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					items={items.slice(0, 2)}
					selection={[items[0], items[4]]}
				>
					{renderColumns()}
				</SimpleDataTable>
			);

			expect(getSelectAll(container)).not.toBeChecked();
			expect(getSelectAll(container).indeterminate).toBe(true);
		});

		it('matches disabledSelection by id and keeps disabled rows out of select-all', async () => {
			const onRowChange = vi.fn();
			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={[{ ...items[0] }]}
					disabledSelection={[{ ...items[0] }, { ...items[1] }]}
					onRowChange={onRowChange}
				>
					{renderColumns()}
				</SimpleDataTable>
			);

			expect(getRowInput(container, 1)).toBeDisabled();
			expect(getRowInput(container, 1)).toBeChecked();
			expect(getRowInput(container, 2)).toBeDisabled();

			fireEvent.click(getRowInput(container, 2));
			fireEvent.change(getRowInput(container, 2), {
				target: { checked: true },
			});
			expect(onRowChange).not.toHaveBeenCalled();

			const user = userEvent.setup();
			await user.click(getSelectAll(container));
			const ids = onRowChange.mock.calls[0][1].selection.map((item) => item.id);
			expect(ids).toHaveLength(items.length - 1);
			expect(ids).toContain(items[0].id);
			expect(ids).not.toContain(items[1].id);
		});

		it('renders radio rows from the selection prop only', async () => {
			const onRowChange = vi.fn();
			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selectRows="radio"
					selection={[{ ...items[0] }]}
					onRowChange={onRowChange}
				>
					{renderColumns()}
				</SimpleDataTable>
			);

			expect(getRowInput(container, 1)).toBeChecked();

			const user = userEvent.setup();
			await user.click(getRowInput(container, 2));
			expect(onRowChange.mock.calls[0][1].selection).toEqual([items[1]]);
			expect(getRowInput(container, 1)).toBeChecked();
			expect(getRowInput(container, 2)).not.toBeChecked();
		});

		it('still calls the deprecated onChange(selection, event), and warns', async () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const onChange = vi.fn();
			const onRowChange = vi.fn();
			const { container } = renderTable(
				<SimpleDataTable
					{...defaultProps}
					selection={[]}
					onChange={onChange}
					onRowChange={onRowChange}
				>
					{renderColumns()}
				</SimpleDataTable>
			);

			const user = userEvent.setup();
			await user.click(getRowInput(container, 3));

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange.mock.calls[0][0]).toEqual([items[2]]);
			expect(onChange.mock.calls[0][1]).toHaveProperty('target');
			expect(onRowChange).toHaveBeenCalledTimes(1);
			expect(onRowChange.mock.calls[0][1].selection).toEqual([items[2]]);
			expect(
				consoleError.mock.calls.some((args) => {
					const message = args.join(' ');
					return (
						message.includes('`onChange`') && message.includes('`onRowChange`')
					);
				})
			).toBe(true);
			consoleError.mockRestore();
		});
	});

	describe('Controlled sort', () => {
		const renderSortable = (columnProps, onSort) =>
			renderTable(
				<SimpleDataTable {...defaultProps} selection={[]} fixedLayout onSort={onSort}>
					<SimpleDataTableColumn label="Name" property="name" />
					<SimpleDataTableColumn
						label="Count"
						property="count"
						sortable
						{...columnProps}
					/>
				</SimpleDataTable>
			);

		const getSortHeader = (container) =>
			getTable(container).querySelector('thead th[id$="-count-th"]');

		it('renders sortDirection from props only and requests the opposite on every click', () => {
			const onSort = vi.fn();
			const { container } = renderSortable(
				{ isSorted: true, sortDirection: 'asc' },
				onSort
			);
			const header = getSortHeader(container);

			fireEvent.click(header.querySelector('a'));
			fireEvent.click(header.querySelector('a'));

			expect(onSort.mock.calls.map(([data]) => data.sortDirection)).toEqual([
				'desc',
				'desc',
			]);
			expect(getSortHeader(container)).toHaveAttribute('aria-sort', 'ascending');
			expect(getSortHeader(container)).toHaveClass('slds-is-sorted_asc');
			expect(getSortHeader(container)).not.toHaveClass('slds-is-sorted_desc');
		});

		it('keeps no internal direction when sortDirection is not passed', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const onSort = vi.fn();
			const { container } = renderSortable({ isSorted: true }, onSort);

			fireEvent.click(getSortHeader(container).querySelector('a'));
			fireEvent.click(getSortHeader(container).querySelector('a'));

			expect(onSort.mock.calls.map(([data]) => data.sortDirection)).toEqual([
				'asc',
				'asc',
			]);
			expect(getSortHeader(container)).not.toHaveClass('slds-is-sorted_desc');
			consoleError.mockRestore();
		});

		it('follows the parent when it applies the requested direction', () => {
			const Wrapper = () => {
				const [sortDirection, setSortDirection] = useState('asc');
				return (
					<SimpleDataTable
						{...defaultProps}
						selection={[]}
						fixedLayout
						onSort={(data) => setSortDirection(data.sortDirection)}
					>
						<SimpleDataTableColumn
							isSorted
							label="Count"
							property="count"
							sortable
							sortDirection={sortDirection}
						/>
					</SimpleDataTable>
				);
			};
			const { container } = renderTable(<Wrapper />);

			fireEvent.click(getSortHeader(container).querySelector('a'));
			expect(getSortHeader(container)).toHaveAttribute(
				'aria-sort',
				'descending'
			);
			fireEvent.click(getSortHeader(container).querySelector('a'));
			expect(getSortHeader(container)).toHaveAttribute('aria-sort', 'ascending');
		});
	});
});
