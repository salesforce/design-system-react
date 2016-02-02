import {Lib, Picklist} from 'design-system-jquery';
import {sampleData} from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	const picklistProperties = {
		resize: 'auto',
		selection: {
			value: 1
		},
		collection: [
			{ _itemType: 'header', text: 'One thing' },
			{ id: 0, text: 'One', value: '1', icon: 'utility.apps' },
			{ _itemType: 'divider' },
			{ _itemType: 'header', text: 'All the things' },
			{ id: 1, text: 'Two', value: '2', icon: 'utility.email' },
			{ id: 2, text: 'Three', value: '3' },
			{ id: 3, text: 'Buzz', value: '4' },
			{ id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar' },
			{ id: 5, text: 'A Disabled Item', disabled: true, value: 'disabled' }
		]
	};

	const picklist = new Picklist($('#picklist__picklist--0'), picklistProperties);

	// sample method buttons
	$('#picklist-jquery-log').on('click', function () {
		Lib.log(picklist.getSelection());
	});
	$('#picklist-jquery-setByIndex').on('click', function () {
		picklist.setSelectionByIndex(1);
	});
	$('#picklist-jquery-setByObject').on('click', function () {
		picklist.setSelection(sampleData.picklist.default.collection[5]);
	});
	$('#picklist-jquery-enable').on('click', function () {
		picklist.enable();
	});
	$('#picklist-jquery-disable').on('click', function () {
		picklist.disable();
	});
	$('#picklist-jquery-destroy').on('click', function () {
		picklist.destroy();
	});

	// events
	$('#picklist-jquery-control .picklist1').on('changed', function (event, data) {
		Lib.log('changed', data);
	});
});

// <-- SAMPLE CONTROL CODE
