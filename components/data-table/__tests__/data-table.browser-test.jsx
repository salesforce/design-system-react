/* eslint-disable max-lines */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import chai, { expect } from 'chai';

import { keyObjects } from '../../../utilities/key-code';

import Dropdown from '../../menu-dropdown';
import DataTable from '../../data-table';
import DataTableColumn from '../../data-table/column';
import DataTableRowActions from '../../data-table/row-actions';
import DataTableHighlightCell from '../../data-table/highlight-cell';
import IconSettings from '../../icon-settings';
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

chai.should();

const { Simulate } = TestUtils;

describe('DataTable: ', function describeFunction() {
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
		id: 'DataTableExample-default',
		items,
		selectRows: true,
	};

	const defaultPropsWithHeaderRows = {
		...defaultProps,
		items: itemsWithHeaderRows,
	};

	const renderTable = (instance) =>
		function renderTableFunction() {
			this.dom = document.createElement('div');
			document.body.appendChild(this.dom);
			/* deepscan-disable REACT_ASYNC_RENDER_RETURN_VALUE */
			// eslint-disable-next-line react/no-render-return-value
			this.component = ReactDOM.render(
				<div>
					<IconSettings iconPath="/assets/icons">{instance}</IconSettings>
				</div>,
				this.dom
			);
			/* deepscan-enable REACT_ASYNC_RENDER_RETURN_VALUE */
		};

	function removeTable() {
		ReactDOM.unmountComponentAtNode(this.dom);
		document.body.removeChild(this.dom);
	}

	const getTable = (dom) => dom.querySelector('.slds-table');

	const getRow = (dom, row) => {
		const tbody = getTable(dom).querySelectorAll('tbody')[0];
		return tbody.querySelectorAll('tr')[row - 1];
	};

	const getCell = (dom, row, column) => {
		const tr = getRow(dom, row);
		return tr.querySelectorAll('td')[column];
	};

	const getMenu = (dom) => dom.querySelector('.slds-dropdown');

	describe('Structure', function describeFunction2() {
		beforeEach(
			renderTable(
				<DataTable {...defaultProps}>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			)
		);

		afterEach(removeTable);

		it('has a header', function () {
			const thead = getTable(this.dom).querySelectorAll('thead');
			thead.should.have.length(1);
			thead[0].querySelectorAll('th').should.have.length(3);
		});

		it('has a row for each item', function () {
			const tbody = getTable(this.dom).querySelectorAll('tbody');
			tbody.should.have.length(1);
			tbody[0].querySelectorAll('tr').should.have.length(6);
		});

		it('renders the correct contents in each cell', function () {
			const firstName = getCell(this.dom, 1, 1);
			firstName.innerHTML.should.equal(
				'<div class="" title="Cloudhub">Cloudhub</div>'
			);
			const secondCount = getCell(this.dom, 2, 2);
			secondCount.innerHTML.should.equal(
				'<div class="" title="54976">54976</div>'
			);
		});

		it('has checkboxes when selectRows is true or "checkbox"', function () {
			let checkboxes = getTable(this.dom).querySelectorAll('.slds-checkbox');
			checkboxes.should.have.length(7);
			removeTable.call(this);

			renderTable(
				<DataTable {...defaultProps} selectRows={false}>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);
			checkboxes = getTable(this.dom).querySelectorAll('.slds-checkbox');
			checkboxes.should.have.length(0);
			removeTable.call(this);

			renderTable(
				<DataTable {...defaultProps} selectRows="checkbox">
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);
			checkboxes = getTable(this.dom).querySelectorAll('.slds-checkbox');
			checkboxes.should.have.length(7);
		});

		it('has radios only when selectRows is "radio"', function () {
			const checkboxes = getTable(this.dom).querySelectorAll('.slds-checkbox');
			checkboxes.should.have.length(7);
			removeTable.call(this);

			renderTable(
				<DataTable {...defaultProps} selectRows="radio">
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);
			const radios = getTable(this.dom).querySelectorAll('.slds-radio');
			radios.should.have.length(6);
		});
	});

	describe('Selectable - Checkbox', function describeFunction2() {
		const defaultSelection = [
			{
				id: '8IKZHZZV80',
				name: 'Cloudhub',
				count: 100976,
				lastModified: 'Yesterday',
			},
		];

		afterEach(removeTable);

		it('can start with a row selected', function () {
			renderTable(
				<DataTable {...defaultProps} selection={defaultSelection}>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const tbody = getTable(this.dom).querySelectorAll('tbody')[0];
			const selectedRows = tbody.querySelectorAll('tr.slds-is-selected');
			selectedRows.should.have.length(1);
			const checkedBoxes = tbody.querySelectorAll(
				'.slds-checkbox input:checked'
			);
			checkedBoxes.should.have.length(1);
		});

		it('can deselect a row', function (done) {
			this.onRowChange = (event, { selection }) => {
				selection.should.have.length(0);
				done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					selection={defaultSelection}
					onRowChange={this.onRowChange}
				>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const tbody = getTable(this.dom).querySelectorAll('tbody')[0];
			const selectedRow = tbody.querySelectorAll('tr.slds-is-selected')[0];
			const checkbox = selectedRow.querySelectorAll('.slds-checkbox input')[0];
			Simulate.change(checkbox, { target: { checked: false } });
		});

		it('can select a row', function (done) {
			this.onRowChange = (event, { selection }) => {
				selection.should.have.length(2);
				selection[1].id.should.equal('5GJOOOPWU7');
				done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					selection={defaultSelection}
					onRowChange={this.onRowChange}
				>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const secondRow = getRow(this.dom, 2);
			const checkbox = secondRow.querySelectorAll('.slds-checkbox input')[0];

			Simulate.change(checkbox, { target: { checked: true } });
		});

		it('can select all rows', function (done) {
			this.onRowChange = (event, { selection }) => {
				selection.should.have.length(6);
				done();
			};

			renderTable(
				<DataTable {...defaultProps} onRowChange={this.onRowChange}>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const thead = getTable(this.dom).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			Simulate.change(checkAll, { target: { checked: true } });
		});

		it('can deselect all rows', function (done) {
			this.onRowChange = (event, { selection }) => {
				selection.should.have.length(0);
				done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					selection={items}
					onRowChange={this.onRowChange}
				>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const thead = getTable(this.dom).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			Simulate.change(checkAll, { target: { checked: false } });
		});

		it('can select all rows with header-rows present', function (done) {
			this.onRowChange = (event, { selection }) => {
				selection.should.have.length(6);
				done();
			};

			renderTable(
				<DataTable
					{...defaultPropsWithHeaderRows}
					onRowChange={this.onRowChange}
				>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const thead = getTable(this.dom).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			Simulate.change(checkAll, { target: { checked: true } });
		});

		it('can deselect all rows with header-rows present', function (done) {
			this.onRowChange = (event, { selection }) => {
				selection.should.have.length(0);
				done();
			};

			renderTable(
				<DataTable
					{...defaultPropsWithHeaderRows}
					selection={items}
					onRowChange={this.onRowChange}
				>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const thead = getTable(this.dom).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			Simulate.change(checkAll, { target: { checked: false } });
		});
	});

	describe('Selectable - Radio', function describeFunction2() {
		const defaultSelection = [
			{
				id: '8IKZHZZV80',
				name: 'Cloudhub',
				count: 100976,
				lastModified: 'Yesterday',
			},
		];

		afterEach(removeTable);

		it('can start with a row selected', function () {
			renderTable(
				<DataTable
					{...defaultProps}
					selection={defaultSelection}
					selectRows="radio"
				>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const tbody = getTable(this.dom).querySelectorAll('tbody')[0];
			const selectedRows = tbody.querySelectorAll('tr.slds-is-selected');
			selectedRows.should.have.length(1);
			const radios = tbody.querySelectorAll('.slds-radio input:checked');
			radios.should.have.length(1);
		});

		it('can select a row', function (done) {
			this.onRowChange = (event, { selection }) => {
				selection.should.have.length(1);
				selection[0].id.should.equal('5GJOOOPWU7');
				done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					selection={defaultSelection}
					selectRows="radio"
					onRowChange={this.onRowChange}
				>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const secondRow = getRow(this.dom, 2);
			const radio = secondRow.querySelectorAll('.slds-radio input')[0];

			Simulate.change(radio, { target: { checked: true } });
		});
	});

	describe('Sortable', function describeFunction2() {
		afterEach(removeTable);

		it('first clicked on sortable column header should result in ascending sort by default', function (done) {
			this.onSort = (data) => {
				data.property.should.equal('count');
				data.sortDirection.should.equal('asc');
				done();
			};

			renderTable(
				<DataTable {...defaultProps} fixedLayout onSort={this.onSort}>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const thead = getTable(this.dom).querySelectorAll('thead')[0];
			const sortButton = thead.querySelectorAll('a')[0];

			Simulate.click(sortButton, {});
		});

		it('if isDefaultSortDescending is true, first click on sortable column header should result in descending order', function (done) {
			this.onSort = (data) => {
				data.property.should.equal('count');
				data.sortDirection.should.equal('desc');
				done();
			};

			renderTable(
				<DataTable {...defaultProps} fixedLayout onSort={this.onSort}>
					{columns.map((columnProps) => (
						<DataTableColumn
							{...columnProps}
							isDefaultSortDescending
							key={columnProps.property}
						/>
					))}
				</DataTable>
			).call(this);

			const thead = getTable(this.dom).querySelectorAll('thead')[0];
			const sortButton = thead.querySelectorAll('a')[0];

			Simulate.click(sortButton, {});
		});

		it('does not call onSort when a non-sortable column is clicked', function (done) {
			this.onSort = () => {
				done('sort called');
			};

			renderTable(
				<DataTable {...defaultProps} onSort={this.onSort}>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const thead = getTable(this.dom).querySelectorAll('thead')[0];
			const secondColumn = thead.querySelectorAll('th')[1];

			Simulate.click(secondColumn, {});
			setTimeout(done, 0);
		});
	});

	describe('w/ RowActions', function describeFunction2() {
		afterEach(removeTable);

		it('renders the RowActions and uses dropdown override property', function () {
			renderTable(
				<DataTable {...defaultProps}>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
					<DataTableRowActions
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
				</DataTable>
			).call(this);
			const rowActionMenus = [
				...this.component.getElementsByTagName('button'),
			].filter((button) => button.textContent === 'Actions');
			rowActionMenus.should.have.length(6);
		});

		it('calls onAction & onSelect when an action is clicked', function (done) {
			let expectedCalbacks = 2;

			this.onAction = (item, action) => {
				item.id.should.equal('8IKZHZZV80');
				action.value.should.equal('1');
				// eslint-disable-next-line no-plusplus
				if (!--expectedCalbacks) done();
			};

			this.onSelect = (action) => {
				action.value.should.equal('1');
				// eslint-disable-next-line no-plusplus
				if (!--expectedCalbacks) done();
			};

			renderTable(
				<DataTable {...defaultProps}>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
					<DataTableRowActions
						onAction={this.onAction}
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
						dropdown={<Dropdown onSelect={this.onSelect} />}
					/>
				</DataTable>
			).call(this);

			const trigger = [...this.component.getElementsByTagName('button')].filter(
				(button) => button.textContent === 'Actions'
			)[0];
			Simulate.click(trigger, {});

			setTimeout(() => {
				const menu = getMenu(document.body);
				const firstAction = menu.querySelectorAll('.slds-dropdown__item')[0];
				Simulate.click(firstAction.querySelector('a'), {});
			}, 0);
		});
	});

	describe('w/ HighlightCell', function describeFunction2() {
		afterEach(removeTable);

		it('marks the appropriate text in a cell', function () {
			renderTable(
				<DataTable {...defaultProps} search="Cloud">
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property}>
							<DataTableHighlightCell />
						</DataTableColumn>
					))}
				</DataTable>
			).call(this);

			const secondRow = getRow(this.dom, 2);
			const markedText = secondRow.querySelectorAll('mark')[0];
			markedText.innerHTML.should.equal('Cloud');
		});
	});

	describe('w/ Fixed Headers', function describeFunction2() {
		afterEach(removeTable);

		it('Renders a fixedHeader table as expected', function () {
			renderTable(
				<DataTable
					{...defaultProps}
					fixedHeader
					fixedLayout
					id="DataTable-FixedHeader-Test"
					onFixedHeaderResize={(event, data) => {
						expect(Array.isArray(data.headerRefs)).to.eql(true);
						expect(data.headerRefs.length).to.eql(4);
						data.headerRefs.forEach((ref) => {
							expect(typeof ref).to.eql('object');
						});
						expect(typeof data.scrollerRef).to.eql('object');
						expect(
							data.scrollerRef.className.search(
								'slds-table_header-fixed_scroller'
							) >= 0
						).to.eql(true);
					}}
					onToggleFixedHeaderListeners={(event, data) => {
						expect(typeof data.attach).to.eql('boolean');
						expect(typeof data.resizeHandler).to.eql('function');
						expect(typeof data.scrollerRef).to.eql('object');
						expect(
							data.scrollerRef.className.search(
								'slds-table_header-fixed_scroller'
							) >= 0
						).to.eql(true);
					}}
					selectRows="checkbox"
				>
					<DataTableColumn
						isSorted
						label="Name"
						primaryColumn
						property="name"
						sortable
						sortDirection="asc"
					/>
					<DataTableColumn label="Count" property="count" />
					<DataTableRowActions
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
				</DataTable>
			).call(this);

			expect(
				this.dom.querySelectorAll('.slds-table_header-fixed_container').length
			).to.eql(1);
			expect(
				this.dom.querySelectorAll('.slds-table_header-fixed_scroller').length
			).to.eql(1);
			expect(
				this.dom
					.querySelector('table.slds-table')
					.className.search('slds-table_header-fixed') >= 0
			).to.eql(true);
			expect(this.dom.querySelectorAll('thead .slds-cell-fixed').length).to.eql(
				4
			);
		});

		it('Renders a fixedHeader table with column resizing functionality as expected', function () {
			renderTable(
				<DataTable
					{...defaultProps}
					fixedHeader
					fixedLayout
					resizable
					id="DataTable-resizable-cols-Test"
				>
					<DataTableColumn
						isSorted
						label="Name"
						primaryColumn
						property="name"
						sortable
						sortDirection="asc"
					/>
					<DataTableColumn label="Count" property="count" />
					<DataTableRowActions
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
				</DataTable>
			).call(this);

			// actions column is not resizable
			expect(this.dom.querySelectorAll('.grip-resizable').length).to.eql(4);
			expect(this.dom.querySelectorAll('.grip-container').length).to.eql(1);
		});
	});

	describe('Column resizing', function describeFunction2() {
		beforeEach(
			mountComponent(
				<DataTable
					{...defaultProps}
					fixedLayout
					keyboardNavigation
					resizable
					resizableOptions={{
						resizeMode: 'overflow',
						onResize: () => {},
					}}
				>
					{[
						...columns.map((columnProps) => (
							<DataTableColumn {...columnProps} key={columnProps.property} />
						)),
						...[
							<DataTableRowActions
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
						],
					]}
				</DataTable>
			)
		);

		afterEach(unmountComponent);

		it('Resize functionality should work with left key', function () {
			const initial = this.dom.querySelectorAll('th')[0].style.width;

			let cell = this.wrapper.find('td').first();
			cell.simulate('focus');
			expect(this.wrapper.find('td').first().prop('tabIndex')).to.equal('0');

			cell.simulate('keyDown', keyObjects.UP);
			cell = this.wrapper.find('th').at(0);
			expect(this.wrapper.find('th').first().prop('tabIndex')).to.equal('0');

			cell.simulate('keyDown', keyObjects.ENTER);
			cell.simulate('keyDown', keyObjects.LEFT);
			cell.simulate('keyDown', keyObjects.LEFT);
			cell.simulate('keyDown', keyObjects.LEFT);
			cell.simulate('keyDown', keyObjects.ESCAPE);

			expect(`${parseInt(initial, 10) - 30}px`).to.equal(
				this.dom.querySelectorAll('th')[0].style.width
			);
		});

		it('Resize functionality should work with right key', function () {
			const initial = this.dom.querySelectorAll('th')[0].style.width;

			let cell = this.wrapper.find('td').first();
			cell.simulate('focus');
			expect(this.wrapper.find('td').first().prop('tabIndex')).to.equal('0');

			cell.simulate('keyDown', keyObjects.UP);
			cell = this.wrapper.find('th').at(0);
			expect(this.wrapper.find('th').first().prop('tabIndex')).to.equal('0');

			cell.simulate('keyDown', keyObjects.ENTER);
			cell.simulate('keyDown', keyObjects.RIGHT);
			cell.simulate('keyDown', keyObjects.RIGHT);
			cell.simulate('keyDown', keyObjects.RIGHT);
			cell.simulate('keyDown', keyObjects.RIGHT);
			cell.simulate('keyDown', keyObjects.RIGHT);
			cell.simulate('keyDown', keyObjects.RIGHT);
			cell.simulate('keyDown', keyObjects.ESCAPE);

			expect(`${parseInt(initial, 10) + 60}px`).to.equal(
				this.dom.querySelectorAll('th')[0].style.width
			);
		});
	});

	describe('w/ Infinite Scrolling', function describeFunction2() {
		afterEach(removeTable);

		it('renders a spinner as expected', function () {
			renderTable(
				<DataTable {...defaultProps} fixedHeader fixedLayout hasMore>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			expect(this.dom.querySelectorAll('.slds-spinner').length).to.eql(1);
		});

		it('onLoadMore callback is called when scroller is scrolled', function (done) {
			let expectedCalbacks = 1;

			this.onLoadMore = () => {
				// eslint-disable-next-line no-plusplus
				if (!--expectedCalbacks) done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					fixedHeader
					fixedLayout
					hasMore
					onLoadMore={this.onLoadMore}
				>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			const scroller = this.dom.querySelector(
				'.slds-table_header-fixed_scroller'
			);
			scroller.dispatchEvent(new Event('scroll'));
		});

		it('onLoadMore callback is called when window is resized', function (done) {
			let expectedCalbacks = 1;

			this.onLoadMore = () => {
				// eslint-disable-next-line no-plusplus
				if (!--expectedCalbacks) done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					fixedHeader
					fixedLayout
					hasMore
					onLoadMore={this.onLoadMore}
				>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			window.dispatchEvent(new Event('resize'));
		});

		it('onLoadMore callback is called when the component is updated', function (done) {
			let expectedCallbacks = 1;

			this.onLoadMore = () => {
				// eslint-disable-next-line no-plusplus
				if (!--expectedCallbacks) done();
			};

			mountComponent(
				<DataTable
					{...defaultProps}
					items={[]}
					fixedHeader
					fixedLayout
					hasMore
					onLoadMore={this.onLoadMore}
				>
					{columns.map((columnProps) => (
						<DataTableColumn {...columnProps} key={columnProps.property} />
					))}
				</DataTable>
			).call(this);

			// Simulate the first page loading
			this.wrapper.setProps({
				items: [items[0]],
			});
		});
	});

	describe('Keyboard Navigation', function describeFunction2() {
		beforeEach(
			mountComponent(
				<DataTable {...defaultProps} fixedLayout keyboardNavigation>
					{[
						...columns.map((columnProps) => (
							<DataTableColumn {...columnProps} key={columnProps.property} />
						)),
						...[
							<DataTableRowActions
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
						],
					]}
				</DataTable>
			)
		);

		afterEach(unmountComponent);

		it('moves selection when using keyboard up/down/left/right keys', function () {
			// Focus the first cell
			let cell = this.wrapper.find('td').first();
			cell.simulate('focus');
			expect(this.wrapper.find('td').first().prop('tabIndex')).to.equal('0');

			// Press Right
			cell.simulate('keyDown', keyObjects.RIGHT);
			cell = this.wrapper.find('td').at(1);
			expect(cell.prop('tabIndex')).to.equal('0');

			// Press Down
			cell.simulate('keyDown', keyObjects.DOWN);
			cell = this.wrapper.find('td').at(5);
			expect(cell.prop('tabIndex')).to.equal('0');

			// Press Left
			cell.simulate('keyDown', keyObjects.LEFT);
			cell = this.wrapper.find('td').at(4);
			expect(cell.prop('tabIndex')).to.equal('0');

			// Press Up
			cell.simulate('keyDown', keyObjects.UP);
			cell = this.wrapper.find('td').at(0);
			expect(cell.prop('tabIndex')).to.equal('0');
		});

		it('enters actionable mode when using keyboard enter key; and enters navigation mode when using keyboard escape key', function () {
			// Focus the first cell
			let cell = this.wrapper.find('td').first();
			cell.simulate('focus');
			expect(this.wrapper.find('td').first().prop('tabIndex')).to.equal('0');

			// Press Enter
			cell.simulate('keyDown', keyObjects.ENTER);

			cell = this.wrapper.find('td').first();
			expect(cell.prop('tabIndex')).to.be.undefined;

			let checkbox = this.wrapper
				.find('td')
				.first()
				.find('input[type="checkbox"]');
			expect(checkbox.prop('tabIndex')).to.equal('0');

			// Press Escape
			cell.simulate('keyDown', keyObjects.ESCAPE);

			cell = this.wrapper.find('td').first();
			expect(cell.prop('tabIndex')).to.equal('0');

			checkbox = this.wrapper.find('td').first().find('input[type="checkbox"]');
			expect(checkbox.prop('tabIndex')).to.equal('-1');

			// Navigate to Dropdown
			cell.simulate('keyDown', keyObjects.RIGHT);
			cell.simulate('keyDown', keyObjects.RIGHT);
			cell.simulate('keyDown', keyObjects.RIGHT);

			// Press Enter
			cell.simulate('keyDown', keyObjects.ENTER);

			let dropdownTrigger = this.wrapper
				.find('td')
				.at(3)
				.find('.slds-dropdown-trigger button');
			expect(dropdownTrigger.prop('tabIndex')).to.equal('0');

			// Press Escape
			cell.simulate('keyDown', keyObjects.ESCAPE);
			dropdownTrigger = this.wrapper
				.find('td')
				.at(3)
				.find('.slds-dropdown-trigger button');
			expect(dropdownTrigger.prop('tabIndex')).to.equal('-1');
		});
	});
});
