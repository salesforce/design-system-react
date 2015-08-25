import * as Lib from '../../core/lib';
import Selectlist from './selectlist';

// TO-DO: This might not work with require, need to confirm that it does
const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

const collection = [
	{ _itemType: 'header', text: 'One thing' },
	{ id: 0, text: 'One', value: '1' },
	{ _itemType: 'divider' },
	{ _itemType: 'header', text: 'All the things' },
	{ id: 1, text: 'Two', value: '2' },
	{ id: 2, text: 'Three', value: '3'  },
	{ id: 3, text: 'Buzz', value: '4'  },
	{ id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  },
	{ id: 5, text: 'A Disabled Item', disabled: true, value: 'disabled' }
];

$(function () {
	$('#mySelectlist2')['slds-picklist']({
		collection: collection,
		resize: 'auto'
	});

	// sample method buttons
	$('.imperative .btnSelectlistGetSelectedItem').on('click', function () {
		Lib.log($('#mySelectlist2')['slds-picklist']('selectedItem'));
	});
	$('.imperative .btnSelectlistSelectByIndex').on('click', function () {
		$('#mySelectlist2')['slds-picklist']('selectByIndex', '1');
	});
	$('.imperative .btnSelectlistSelectByText').on('click', function () {
		$('#mySelectlist2')['slds-picklist']('selectByText', 'One');
	});
	$('.imperative .btnSelectlistEnableSelectlist').on('click', function () {
		$('#mySelectlist2')['slds-picklist']('enable');
	});
	$('.imperative .btnSelectlistDisableSelectlist').on('click', function () {
		$('#mySelectlist2')['slds-picklist']('disable');
	});
	$('.imperative .btnSelectlistDestroy').on('click', function () {
		const $container = $('#mySelectlist2').parent();
		const markup = $('#mySelectlist2')['slds-picklist']('destroy');
		Lib.log(markup);
		$container.append(markup);
		$('#mySelectlist2')['slds-picklist']();
	});

	// events
	$('#mySelectlist2').on('changed.fu.selectlist', function (event, data) {
		Lib.log('changed', data);
	});

	const selectlist3 = new Selectlist($('#mySelectlist3'), {
		collection: collection,
		resize: 'auto',
		selection: { value: '4' }
	});

	// sample method buttons
	$('.new-api .btnSelectlistGetSelectedItem').on('click', function () {
		Lib.log(selectlist3.getSelection());
	});
	$('.new-api .btnSelectlistSelectByIndex').on('click', function () {
		selectlist3.setSelectionByIndex(1);
	});
	$('.new-api .btnSelectlistSelectByObject').on('click', function () {
		selectlist3.setSelection(collection[3]);
	});
	$('.new-api .btnSelectlistEnableSelectlist').on('click', function () {
		selectlist3.enable();
	});
	$('.new-api .btnSelectlistDisableSelectlist').on('click', function () {
		selectlist3.disable();
	});
});
