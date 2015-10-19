import * as Lib from '../../lib/lib';
import Combobox from './combobox';

const $ = Lib.global.jQuery || Lib.global.$;

const collection = [
	{ _itemType: 'header', text: 'One thing' },
	{ id: 0, text: 'One', value: '1' },
	{ _itemType: 'divider' },
	{ _itemType: 'header', text: 'All the things' },
	{ id: 1, text: 'Two', value: '2' },
	{ id: 2, text: 'Three', value: '3'  },
	{ id: 3, text: 'Buzz', value: '4'  },
	{ id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  },
	{ id: 5, text: 'Disabled Item', disabled: true, value: 'disabled' }
];

$(function () {
	const combobox1 = new Combobox($('#combobox-jquery-control .combobox1'), {
		collection: collection,
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
		combobox1.setSelection(collection[5]);
	});
	$('#combobox-jquery-enable').on('click', function () {
		combobox1.enable();
	});
	$('#combobox-jquery-disable').on('click', function () {
		combobox1.disable();
	});

	// events
	$('#combobox-jquery-control .combobox1').on('changed.fu.combobox', function (event, data) {
		Lib.log('changed', data);
	});
});
