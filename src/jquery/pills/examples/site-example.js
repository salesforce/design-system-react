import {Lib, Pills} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	$('#pills-jquery-control .pills1').facades_pills({
		selection: [
			{
				text: 'item 1',
				value: 1
			},
			{
				text: 'item 2',
				value: 2
			},
			{
				text: 'item 3',
				value: 3
			}
		]
	});

	$('#pills-jquery-control .pills1').on('changed', function (evt, item) {
		console.log('pill removed', item);
	});

	void(Pills);
});

// <-- SAMPLE CONTROL CODE
