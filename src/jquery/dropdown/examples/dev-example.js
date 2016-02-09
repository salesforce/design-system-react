import {Lib, Dropdown} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	const dropdownProperties = {
		selection: {
			value: '1'
		},
		collection: [
			{
				id: 0,
				text: 'Menu Item One',
				value: '1',
				icon: 'utility.table'
			},
			{
				id: 1,
				text: 'Menu Item Two',
				value: '2',
				icon: 'utility.kanban'
			},
			{
				id: 2,
				text: 'Menu Item Three',
				value: '3',
				icon: 'utility.side_list'
			}
		]
	};

	const dropdown = new Dropdown($('#dropdown__dropdown--0'), dropdownProperties);
	void (dropdown);

	// sample method buttons
	$('#dropdown-jquery-log').on('click', function () {
		Lib.log(dropdown.getSelection());
	});
	$('#dropdown-jquery-setByIndex').on('click', function () {
		dropdown.setSelectionByIndex(1);
	});
	$('#dropdown-jquery-setByObject').on('click', function () {
		dropdown.setSelection(dropdownProperties.collection[5]);
	});
	$('#dropdown-jquery-enable').on('click', function () {
		dropdown.enable();
	});
	$('#dropdown-jquery-disable').on('click', function () {
		dropdown.disable();
	});

	// events
	$('#dropdown__dropdown--0').on('rendered', function (event, data) {
		Lib.log('rendered', data);
	});
	$('#dropdown__dropdown--0').on('changed', function (event, data) {
		Lib.log('changed', data);
	}); });

// <-- SAMPLE CONTROL CODE
