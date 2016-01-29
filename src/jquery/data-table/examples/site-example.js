import {Lib, DataTable} from 'design-system-jquery';
import {sampleData} from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	const dataTable1 = new DataTable($('#data-table-jquery-control .dataTable1'), {
		collection: sampleData.dataTable.default.collection,
		columns: sampleData.dataTable.default.columns,
		styles: {
			bordered: true,
			striped: true
		}
	});

	void(dataTable1);
});

// <-- SAMPLE CONTROL CODE
