import * as Lib from '../../lib/lib';
import Picklist from './picklist';

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
	const picklist = new Picklist($('#picklist'), {
		collection: collection,
		selection: { value: '4' }
	});

	// sample method buttons
	$('#picklist-getSelectedItem').on('click', function () {
		Lib.log(picklist.getSelection());
	});
	$('#picklist-selectByIndex').on('click', function () {
		picklist.setSelectionByIndex(1);
	});
	$('#picklist-selectByObject').on('click', function () {
		picklist.setSelection(collection[4]);
	});
	$('#picklist-enable').on('click', function () {
		picklist.enable();
	});
	$('#picklist-disable').on('click', function () {
		picklist.disable();
	});

	// events
	$('#picklist').on('rendered', function (event, data) {
		Lib.log('rendered', data);
	});
	$('#picklist').on('changed', function (event, data) {
		Lib.log('changed', data);
	});
});
