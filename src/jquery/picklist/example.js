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
	const picklist = new Picklist($('#picklist-jquery-control .picklist1'), {
		collection: collection,
		selection: { value: '1' }
	});

	// sample method buttons
	$('#picklist-jquery-log').on('click', function () {
		Lib.log(picklist.getSelection());
	});
	$('#picklist-jquery-setByIndex').on('click', function () {
		picklist.setSelectionByIndex(1);
	});
	$('#picklist-jquery-setByObject').on('click', function () {
		picklist.setSelection(collection[5]);
	});
	$('#picklist-jquery-enable').on('click', function () {
		picklist.enable();
	});
	$('#picklist-jquery-disable').on('click', function () {
		picklist.disable();
	});

	// events
	$('#picklist-jquery-control .picklist1').on('rendered', function (event, data) {
		Lib.log('rendered', data);
	});
	$('#picklist-jquery-control .picklist1').on('changed', function (event, data) {
		Lib.log('changed', data);
	});
});
