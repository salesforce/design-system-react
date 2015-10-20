import * as Lib from '../../lib/lib';
import Picklist from './picklist';
import sampleData from '../../../sample-data/picklist';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const picklist = new Picklist($('#picklist-jquery-control .picklist1'), {
		collection: sampleData.defaultArray,
		selection: { value: '1' }
	});

	// sample method buttons
	$('#picklist-jquery-log').on('click', function () {
		Lib.log(picklist.getSelection());
	});
	$('#picklist-jquery-setByIndex').on('click', function () {
		picklist.setSelectionByIndex(1);
	});
	$('#picklist-jquery-setByObject').on('click', function () {
		picklist.setSelection(sampleData.defaultArray[5]);
	});
	$('#picklist-jquery-enable').on('click', function () {
		picklist.enable();
	});
	$('#picklist-jquery-disable').on('click', function () {
		picklist.disable();
	});

	// events
	$('#picklist-jquery-control .picklist1').on('changed', function (event, data) {
		Lib.log('changed', data);
	});
});
