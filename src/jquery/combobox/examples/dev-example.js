import {Lib, Combobox} from 'design-system-jquery';
import {sampleData} from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->


$(function () {
	const combobxProperties = {
		resize: 'auto',
		value: {
			value: '1'
		},
		collection: [
			{
				_itemType: 'header',
				text: 'One thing'
			},
			{
				id: 0,
				text: 'One',
				value: '1',
				icon: 'utility.apps'
			},
			{
				_itemType: 'divider'
			},
			{
				_itemType: 'header',
				text: 'All the things'
			},
			{
				id: 1,
				text: 'Two',
				value: '2',
				icon: 'utility.email'
			},
			{
				id: 2,
				text: 'Three',
				value: '3'
			},
			{
				id: 3,
				text: 'Buzz',
				value: '4'
			},
			{
				id: 4,
				text: 'Item Five',
				value: 'Item Five',
				fizz: 'buzz',
				foo: 'bar'
			},
			{
				id: 5,
				text: 'A Disabled Item',
				disabled: true,
				value: 'disabled'
			}
		]
	};
	const combobox1 = new Combobox($('#combobox-jquery-control .combobox1'), combobxProperties);

	// sample method buttons
	$('#combobox-jquery-log').on('click', function () {
		Lib.log(combobox1.getSelection());
	});
	$('#combobox-jquery-setByIndex').on('click', function () {
		combobox1.setSelectionByIndex(1);
	});
	$('#combobox-jquery-setByObject').on('click', function () {
		combobox1.setSelection(sampleData.picklist.default.collection[5]);
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

// <-- SAMPLE CONTROL CODE
