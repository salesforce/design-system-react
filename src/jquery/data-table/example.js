import * as Lib from '../../lib/lib';
import DataTable from './data-table';

const $ = Lib.global.jQuery || Lib.global.$;

const collection = [
	{
		id: '8IKZHZZV80',
		name: 'Item One',
		count: '100,976',
		lastModified: 'Yesterday',
		modifiedBy: 'Ashley McDougal'
	},
	{
		id: '5GJOOOPWU7',
		name: 'Item Two',
		count: '54,976',
		lastModified: 'Today',
		modifiedBy: 'Ashley McDougal'
	},
	{
		id: 'Q8Z71ZUCEZ',
		name: 'Item Three',
		count: '10,128',
		lastModified: 'Today',
		modifiedBy: 'Ashley McDougal'
	},
	{
		id: 'WA0Q0XARAR',
		name: 'Item Four',
		count: '63,616',
		lastModified: 'Yesterday',
		modifiedBy: 'Ashley McDougal'
	},
	{
		id: 'N8M7CMNU39',
		name: 'Item Five',
		count: '25,615',
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
		}
	});

	void(dataTable1);
});
