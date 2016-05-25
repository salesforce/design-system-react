/* eslint-disable indent */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import chai from 'chai';

import DataTable from '../../components/data-table';
import DataTableColumn from '../../components/data-table/column';
import DataTableRowActions from '../../components/data-table/row-actions';

chai.should();

const { Simulate,
 				scryRenderedComponentsWithType,
				findRenderedDOMComponentWithClass
			} = TestUtils;

describe('DataTable: ', function () {
	const items = [
		{
			id: '8IKZHZZV80',
			name: 'Cloudhub',
			count: 100976,
			lastModified: 'Yesterday'
		}, {
			id: '5GJOOOPWU7',
			name: 'Cloudhub + Anypoint Connectors',
			count: 54976,
			lastModified: 'Today'
		}, {
			id: 'Q8Z71ZUCEZ',
			name: 'Cloud City',
			count: 101280,
			lastModified: 'Today'
		}
	];

	const columns = [
		{
			label: 'Name',
			property: 'name',
			truncate: true
		},
		{
			label: 'Count',
			property: 'count',
			sortable: true
		}
	];

	const defaultProps = {
		id: 'DataTableExample-default',
		items,
		selectRows: true
	};

	const renderTable = (instance) => {
		return function () {
			this.dom = document.createElement('div');
			document.body.appendChild(this.dom);
			this.component = ReactDOM.render(instance, this.dom);
		};
	};

	function removeTable () {
		ReactDOM.unmountComponentAtNode(this.dom);
		document.body.removeChild(this.dom);
	}

	const getTable = dom => dom.querySelector('.slds-table');

	const getRow = (dom, row) => {
		const tbody = getTable(dom).querySelectorAll('tbody')[0];
		return tbody.querySelectorAll('tr')[row-1];
	};

	const getCell = (dom, row, column) => {
		const tr = getRow(dom, row);
		return tr.querySelectorAll('td')[column];
	};

	const getMenu = dom => dom.querySelector('.slds-dropdown--menu');

	describe('Structure', function () {
		beforeEach(renderTable(
			<DataTable
				{...defaultProps}
			>
				{columns.map((columnProps) => <DataTableColumn {...columnProps} key={columnProps.property} />)}
			</DataTable>
		));

		afterEach(removeTable);

		it('has a header', function () {
			const thead = getTable(this.dom).querySelectorAll('thead');
			thead.should.have.length(1);
			thead[0].querySelectorAll('th').should.have.length(3);
		});

		it('has a row for each item', function () {
			const tbody = getTable(this.dom).querySelectorAll('tbody');
			tbody.should.have.length(1);
			tbody[0].querySelectorAll('tr').should.have.length(3);
		});

		it('renders the correct contents in each cell', function () {
			const firstName = getCell(this.dom, 1, 1);
			firstName.innerHTML.should.equal('Cloudhub');
			const secondCount = getCell(this.dom, 2, 2);
			secondCount.innerHTML.should.equal('54976');
		});

		it('has checkboxes only when selectRows is true', function () {
			let checkboxes = getTable(this.dom).querySelectorAll('.slds-checkbox');
			checkboxes.should.have.length(4);
			removeTable.call(this);

			renderTable(
				<DataTable
					{...defaultProps}
					selectRows={false}
				>
					{columns.map((columnProps) => <DataTableColumn {...columnProps} key={columnProps.property} />)}
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
				lastModified: 'Yesterday'
			}
		];

		afterEach(removeTable);

		it('can start with a row selected', function () {
			renderTable(
				<DataTable
					{...defaultProps}
					selection={defaultSelection}
				>
					{columns.map((columnProps) => <DataTableColumn {...columnProps} key={columnProps.property} />)}
				</DataTable>
			).call(this);

			const tbody = getTable(this.dom).querySelectorAll('tbody')[0];
			const selectedRows = tbody.querySelectorAll('tr.slds-is-selected');
			selectedRows.should.have.length(1);
			const checkedBoxes = tbody.querySelectorAll('.slds-checkbox input:checked');
			checkedBoxes.should.have.length(1);
		});

		it('can deselect a row', function (done) {
			this.onChange = (newSelection) => {
				newSelection.should.have.length(0);
				done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					selection={defaultSelection}
					onChange={this.onChange}
				>
					{columns.map((columnProps) => <DataTableColumn {...columnProps} key={columnProps.property} />)}
				</DataTable>
			).call(this);

			const tbody = getTable(this.dom).querySelectorAll('tbody')[0];
			const selectedRow = tbody.querySelectorAll('tr.slds-is-selected')[0];
			const checkbox = selectedRow.querySelectorAll('.slds-checkbox input')[0];

			Simulate.change(checkbox, {});
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
					{columns.map((columnProps) => <DataTableColumn {...columnProps} key={columnProps.property} />)}
				</DataTable>
			).call(this);

			const secondRow = getRow(this.dom, 2);
			const checkbox = secondRow.querySelectorAll('.slds-checkbox input')[0];

			Simulate.change(checkbox, {});
		});

		it('can select all rows', function (done) {
			this.onChange = (newSelection) => {
				newSelection.should.have.length(3);
				done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					onChange={this.onChange}
				>
					{columns.map((columnProps) => <DataTableColumn {...columnProps} key={columnProps.property} />)}
				</DataTable>
			).call(this);

			const thead = getTable(this.dom).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			Simulate.change(checkAll, {});
		});

		it('can deselect all rows', function (done) {
			this.onChange = (newSelection) => {
				newSelection.should.have.length(0);
				done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					selection={items}
					onChange={this.onChange}
				>
					{columns.map((columnProps) => <DataTableColumn {...columnProps} key={columnProps.property} />)}
				</DataTable>
			).call(this);

			const thead = getTable(this.dom).querySelectorAll('thead')[0];
			const checkAll = thead.querySelectorAll('.slds-checkbox input')[0];

			Simulate.change(checkAll, {});
		});
	});

	describe('Sortable', function () {
		afterEach(removeTable);

		it('calls onSort when a sortable column is clicked', function (done) {
			this.onSort = (data) => {
				data.property.should.equal('count');
				data.sortDirection.should.equal('desc');
				done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
					onSort={this.onSort}
				>
					{columns.map((columnProps) => <DataTableColumn {...columnProps} key={columnProps.property} />)}
				</DataTable>
			).call(this);

			const thead = getTable(this.dom).querySelectorAll('thead')[0];
			const thirdColumn = thead.querySelectorAll('th')[2];

			Simulate.click(thirdColumn, {});
		});

		it('does not call onSort when a non-sortable column is clicked', function (done) {
			this.onSort = () => {
				done('sort called');
			};

			renderTable(
				<DataTable
					{...defaultProps}
					onSort={this.onSort}
				>
					{columns.map((columnProps) => <DataTableColumn {...columnProps} key={columnProps.property} />)}
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

		it('renders the RowActions', function () {
			renderTable(
				<DataTable
					{...defaultProps}
				>
					{columns.map((columnProps) => <DataTableColumn {...columnProps} key={columnProps.property} />)}
					<DataTableRowActions
						options={[
							{
								id: 0,
								label: 'Add to Group',
								value: '1'
							}, {
								id: 1,
								label: 'Publish',
								value: '2'
							}
						]}
					/>
				</DataTable>
			).call(this);

			const rowActionMenus = scryRenderedComponentsWithType(this.component, DataTableRowActions);
			rowActionMenus.should.have.length(3);
		});

		it('calls onAction when an action is clicked', function (done) {
			this.onAction = (item, action) => {
				item.id.should.equal('8IKZHZZV80');
				action.value.should.equal('1');
				done();
			};

			renderTable(
				<DataTable
					{...defaultProps}
				>
					{columns.map((columnProps) => <DataTableColumn {...columnProps} key={columnProps.property} />)}
					<DataTableRowActions
						options={[
							{
								id: 0,
								label: 'Add to Group',
								value: '1'
							}, {
								id: 1,
								label: 'Publish',
								value: '2'
							}
						]}
						onAction={this.onAction}
					/>
				</DataTable>
			).call(this);

			const rowActionMenu = scryRenderedComponentsWithType(this.component, DataTableRowActions)[0];
			const trigger = findRenderedDOMComponentWithClass(rowActionMenu, 'slds-button');
			Simulate.click(trigger, {});

			setTimeout(() => {
				const menu = getMenu(document.body);
				const firstAction = menu.querySelectorAll('.slds-dropdown__item')[0];
				Simulate.click(firstAction.querySelector('a'), {});
			}, 100);
		});
	});
});
