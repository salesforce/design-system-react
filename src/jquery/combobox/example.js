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
	const combobox = new Combobox($('#combobox'), {
		collection: collection,
		resize: 'auto',
		selection: { value: '4' }
	});

	// sample method buttons
	$('#combobox-getSelectedItem').on('click', function () {
		Lib.log(combobox.getSelection());
	});
	$('#combobox-selectByIndex').on('click', function () {
		combobox.setSelectionByIndex(1);
	});
	$('#combobox-selectByObject').on('click', function () {
		combobox.setSelection(collection[3]);
	});
	$('#combobox-enable').on('click', function () {
		combobox.enable();
	});
	$('#combobox-disable').on('click', function () {
		combobox.disable();
	});

	// events
	$('#combobox').on('changed.fu.combobox', function (event, data) {
		Lib.log('changed', data);
	});
});
