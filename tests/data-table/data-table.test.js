/* eslint-disable indent */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import DataTable from '../../components/data-table';
import DataTableColumn from '../../components/data-table/column';
import DataTableRowActions from '../../components/data-table/row-actions';

const { Simulate,
				findRenderedDOMComponentWithClass } = TestUtils;

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
			label: 'Couny',
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
			this.body = document.createElement('div');
			document.body.appendChild(this.body);
			this.component = ReactDOM.render(instance, this.body);
		};
	};

	function removeTable () {
		ReactDOM.unmountComponentAtNode(this.body);
		document.body.removeChild(this.body);
	}

	const getTable = dom => dom.querySelector('.slds-table')

	describe('Structure', function () {
		beforeEach(renderTable(
			<DataTable
				{...defaultProps}
			>
				{columns.map((columnProps) => <DataTableColumn {...columnProps} />)}
			</DataTable>
		));

		afterEach(removeTable);

		it('has a header', function () {
			const thead = getTable(this.body).querySelectorAll('thead');
			expect(thead.length).to.equal(1);
			expect(thead[0].querySelectorAll('th').length).to.equal(3);
		});

		it('has a row for each item', function () {
			const tbody = getTable(this.body).querySelectorAll('tbody');
			expect(tbody.length).to.equal(1);
			expect(tbody[0].querySelectorAll('tr').length).to.equal(3);
		});
	});

});
