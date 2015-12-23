import {Lib, Dropdown} from 'design-system-jquery';
import {sampleData} from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const dropdown = new Dropdown($('#dropdown-jquery-control .dropdown1'), {
		collection: sampleData.dropdown.defaultArray,
		selection: { value: '1' }
	});

	// sample method buttons
	$('#dropdown-jquery-log').on('click', function () {
		Lib.log(dropdown.getSelection());
	});
	$('#dropdown-jquery-setByIndex').on('click', function () {
		dropdown.setSelectionByIndex(1);
	});
	$('#dropdown-jquery-setByObject').on('click', function () {
		dropdown.setSelection(sampleData.dropdown.defaultArray[5]);
	});
	$('#dropdown-jquery-enable').on('click', function () {
		dropdown.enable();
	});
	$('#dropdown-jquery-disable').on('click', function () {
		dropdown.disable();
	});

	// events
	$('#dropdown-jquery-control .dropdown1').on('rendered', function (event, data) {
		Lib.log('rendered', data);
	});
	$('#dropdown-jquery-control .dropdown1').on('changed', function (event, data) {
		Lib.log('changed', data);
	}); });
