import {Lib, Combobox} from 'design-system-jquery';
import {sampleData} from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const combobox1 = new Combobox($('#combobox-jquery-control .combobox1'), {
		collection: sampleData.picklist.defaultArray,
		resize: 'auto',
		selection: { value: '1' }
	});

	// sample method buttons
	$('#combobox-jquery-log').on('click', function () {
		Lib.log(combobox1.getSelection());
	});
	$('#combobox-jquery-setByIndex').on('click', function () {
		combobox1.setSelectionByIndex(1);
	});
	$('#combobox-jquery-setByObject').on('click', function () {
		combobox1.setSelection(sampleData.picklist.defaultArray[5]);
	});
	$('#combobox-jquery-enable').on('click', function () {
		combobox1.enable();
	});
	$('#combobox-jquery-disable').on('click', function () {
		combobox1.disable();
	});

	// events
	$('#combobox-jquery-control .combobox1').on('changed', function (event, data) {
		Lib.log('changed', data);
	});
});
