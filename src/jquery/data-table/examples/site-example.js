import {Lib, DataTable} from 'design-system-jquery';
import {sampleData} from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const dataTable1 = new DataTable($('#data-table-jquery-control .dataTable1'), {
		collection: sampleData.dataTable.collection,
		columns: sampleData.dataTable.columns,
		styles: {
			bordered: true,
			striped: true
		}
	});

	void(dataTable1);
});
