import {Lib, DataTable} from 'design-system-jquery';
import {sampleData} from 'design-system-utilities';
import * as controlTemplate from './template-control';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	$('#data-table-jquery-control').append(controlTemplate.template);
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
