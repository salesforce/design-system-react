import * as Lib from '../../lib/lib';
import DataTable from './data-table';
import _ from 'underscore';

const $ = Lib.global.jQuery || Lib.global.$;

const collection = [
	{
		id: '8IKZHZZV80',
		name: 'Item One',
		count: 100976,
		lastModified: 'Yesterday',
		modifiedBy: 'Ashley McDougal'
	},
	{
		id: '5GJOOOPWU7',
		name: 'Item Two',
		count: 54976,
		lastModified: 'Today',
		modifiedBy: 'Ashley McDougal'
	},
	{
		id: 'Q8Z71ZUCEZ',
		name: 'Item Three',
		count: 10128,
		lastModified: 'Today',
		modifiedBy: 'Ashley McDougal'
	},
	{
		id: 'WA0Q0XARAR',
		name: 'Item Four',
		count: 63616,
		lastModified: 'Yesterday',
		modifiedBy: 'Ashley McDougal'
	},
	{
		id: 'N8M7CMNU39',
		name: 'Item Five',
		count: 25615,
		lastModified: 'Yesterday',
		modifiedBy: 'Steve Daniels'
	}
];

const columns = [
	{
		propertyName: 'name',
		displayName: 'Campaign Name',
		sortable: false,
		hintParent: false
	},
	{
		propertyName: 'count',
		displayName: 'Count',
		sortable: true,
		hintParent: false
	},
	{
		propertyName: 'lastModified',
		displayName: 'Last Modified',
		sortable: true,
		hintParent: false
	}
];

$(function () {
	const dataTable1 = new DataTable($('#data-table-jquery-control .dataTable1'), {
		collection: collection,
		columns: columns,
		styles: {
			bordered: true,
			striped: true
		},
		dataSource: function (data, callback) {
			let rowData = collection;

			if (data.sortColumn && data.sortColumn.propertyName === 'count') {
				rowData = _.sortBy(rowData, 'count');
			} else if ( data.sortColumn && data.sortColumn.propertyName === 'lastModified') {
				rowData = _.sortBy(rowData, 'lastModified');
			}

			if ( data.sortDirection === 'desc') rowData.reverse();

			callback({
				data: rowData
			});
		}
	});

	void(dataTable1);
});
