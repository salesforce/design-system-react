import * as Lib from '../../lib/lib';
import Selectlist from './selectlist';

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
	// sample method buttons
	$('.declarative .btnSelectlistGetSelectedItem').on('click', function () {
		Lib.log($('#mySelectlist1').selectlist('selectedItem'));
	});
	$('.declarative .btnSelectlistSelectByValue').on('click', function () {
		$('#mySelectlist1').selectlist('selectByValue', 2);
	});
	$('.declarative .btnSelectlistSelectBySelector').on('click', function () {
		$('#mySelectlist1').selectlist('selectBySelector', 'li[data-fizz=buzz]');
	});
	$('.declarative .btnSelectlistSelectByIndex').on('click', function () {
		$('#mySelectlist1').selectlist('selectByIndex', '4');
	});
	$('.declarative .btnSelectlistSelectByText').on('click', function () {
		$('#mySelectlist1').selectlist('selectByText', 'One');
	});
	$('.declarative .btnSelectlistEnableSelectlist').on('click', function () {
		$('#mySelectlist1').selectlist('enable');
	});
	$('.declarative .btnSelectlistDisableSelectlist').on('click', function () {
		$('#mySelectlist1').selectlist('disable');
	});
	$('.declarative .btnSelectlistDestroy').on('click', function () {
		const $container = $('#mySelectlist1').parent();
		const markup = $('#mySelectlist1').selectlist('destroy');
		Lib.log(markup);
		$container.append(markup);
		$('#mySelectlist1').selectlist();
	});

	// events
	$('#mySelectlist1').on('changed.fu.selectlist', function (event, data) {
		Lib.log('changed', data);
	});


	$('#mySelectlist2').selectlist({
		collection: collection,
		resize: 'auto'
	});

	// sample method buttons
	$('.imperative .btnSelectlistGetSelectedItem').on('click', function () {
		Lib.log($('#mySelectlist2').selectlist('selectedItem'));
	});
	$('.imperative .btnSelectlistSelectByIndex').on('click', function () {
		$('#mySelectlist2').selectlist('selectByIndex', '1');
	});
	$('.imperative .btnSelectlistSelectByText').on('click', function () {
		$('#mySelectlist2').selectlist('selectByText', 'One');
	});
	$('.imperative .btnSelectlistEnableSelectlist').on('click', function () {
		$('#mySelectlist2').selectlist('enable');
	});
	$('.imperative .btnSelectlistDisableSelectlist').on('click', function () {
		$('#mySelectlist2').selectlist('disable');
	});
	$('.imperative .btnSelectlistDestroy').on('click', function () {
		const $container = $('#mySelectlist2').parent();
		const markup = $('#mySelectlist2').selectlist('destroy');
		Lib.log(markup);
		$container.append(markup);
		$('#mySelectlist2').selectlist();
	});

	// events
	$('#mySelectlist2').on('changed.fu.selectlist', function (event, data) {
		Lib.log('changed', data);
	});


	const selectlist3 = new Selectlist($('#mySelectlist3'), {
		collection: collection,
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

	// events
	$('#mySelectlist3').on('rendered.fu.selectlist', function (event, data) {
		Lib.log('rendered', data);
	});
	$('#mySelectlist3').on('changed.fu.selectlist', function (event, data) {
		Lib.log('changed', data);
	});
});
