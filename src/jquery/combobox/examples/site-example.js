import {Lib, Combobox} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	const combobxProperties = {
		resize: 'auto',
		selection: {
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
	const combobox0 = new Combobox($('#combobox__combobox--0'), combobxProperties);
	void (combobox0);

	// events
	$('#combobox__combobox--0').on('changed', function (event, data) {
		Lib.log('changed', data);
	});
});

// <-- SAMPLE CONTROL CODE
