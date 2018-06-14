import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import chai from 'chai';

import Dropdown from '../../menu-dropdown';
import DataTable from '../../data-table';
import DataTableColumn from '../../data-table/column';
import DataTableRowActions from '../../data-table/row-actions';
import DataTableHighlightCell from '../../data-table/highlight-cell';
import IconSettings from '../../icon-settings';

chai.should();

const {
	Simulate,
	scryRenderedComponentsWithType,
	findRenderedDOMComponentWithClass,
} = TestUtils;

describe('DataTable: ', function () {
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

	const renderTable = (instance) =>
		function () {
			this.dom = document.createElement('div');
			document.body.appendChild(this.dom);
			this.component = ReactDOM.render(
				<IconSettings iconPath="/assets/icons">{instance}</IconSettings>,
				this.dom
			);
		};

	function removeTable () {
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

	describe('Structure', function () {
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

		it('has checkboxes only when selectRows is true', function () {
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
		});
	});

	describe('Selectable', function () {
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
			this.onChange = (newSelection, ...rest) => {
				newSelection.should.have.length(0);
				done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					selection={defaultSelection}
					onChange={this.onChange}
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
			this.onChange = (newSelection) => {
				newSelection.should.have.length(2);
				newSelection[1].id.should.equal('5GJOOOPWU7');
				done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					selection={defaultSelection}
					onChange={this.onChange}
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
			this.onChange = (newSelection) => {
				newSelection.should.have.length(6);
				done();
			};

			renderTable(
				<DataTable {...defaultProps} onChange={this.onChange}>
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
			this.onChange = (newSelection) => {
				newSelection.should.have.length(0);
				done();
			};

			renderTable(
				<DataTable {...defaultProps} selection={items} onChange={this.onChange}>
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

	describe('Sortable', function () {
		afterEach(removeTable);

		it('first clicked on sortable column header should result in ascending sort', function (done) {
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
			const thirdColumn = thead.querySelectorAll('th')[2];
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
			setTimeout(done, 600);
		});
	});

	describe('w/ RowActions', function () {
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

			const rowActionMenus = scryRenderedComponentsWithType(
				this.component,
				DataTableRowActions
			);
			rowActionMenus.should.have.length(6);
		});

		it('calls onAction & onSelect when an action is clicked', function (done) {
			let expectedCalbacks = 2;

			this.onAction = (item, action) => {
				item.id.should.equal('8IKZHZZV80');
				action.value.should.equal('1');
				if (!--expectedCalbacks) done();
			};

			this.onSelect = (action) => {
				action.value.should.equal('1');
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

			const rowActionMenu = scryRenderedComponentsWithType(
				this.component,
				DataTableRowActions
			)[0];
			const trigger = findRenderedDOMComponentWithClass(
				rowActionMenu,
				'slds-button'
			);
			Simulate.click(trigger, {});

			setTimeout(() => {
				const menu = getMenu(document.body);
				const firstAction = menu.querySelectorAll('.slds-dropdown__item')[0];
				Simulate.click(firstAction.querySelector('a'), {});
			}, 100);
		});
	});

	describe('w/ HighlightCell', function () {
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
});
