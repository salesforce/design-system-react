import * as Lib from '../../lib/lib';
import Combobox from './combobox';

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
	// sample method buttons
	$('.declarative .btnComboboxGetSelectedItem').on('click', function () {
		Lib.log($('#myCombobox1').combobox('selectedItem'));
	});
	$('.declarative .btnComboboxSelectByValue').on('click', function () {
		$('#myCombobox1').combobox('selectByValue', 2);
	});
	$('.declarative .btnComboboxSelectBySelector').on('click', function () {
		$('#myCombobox1').combobox('selectBySelector', 'li[data-fizz=buzz]');
	});
	$('.declarative .btnComboboxSelectByIndex').on('click', function () {
		$('#myCombobox1').combobox('selectByIndex', '4');
	});
	$('.declarative .btnComboboxSelectByText').on('click', function () {
		$('#myCombobox1').combobox('selectByText', 'One');
	});
	$('.declarative .btnComboboxEnableCombobox').on('click', function () {
		$('#myCombobox1').combobox('enable');
	});
	$('.declarative .btnComboboxDisableCombobox').on('click', function () {
		$('#myCombobox1').combobox('disable');
	});
	$('.declarative .btnComboboxDestroy').on('click', function () {
		const $container = $('#myCombobox1').parent();
		const markup = $('#myCombobox1').combobox('destroy');
		Lib.log(markup);
		$container.append(markup);
		$('#myCombobox1').combobox();
	});

	// events
	$('#myCombobox1').on('changed.fu.combobox', function (event, data) {
		Lib.log('changed', data);
	});


	$('#myCombobox2').combobox({
		collection: collection,
		resize: 'auto'
	});

	// sample method buttons
	$('.imperative .btnComboboxGetSelectedItem').on('click', function () {
		Lib.log($('#myCombobox2').combobox('selectedItem'));
	});
	$('.imperative .btnComboboxSelectByIndex').on('click', function () {
		$('#myCombobox2').combobox('selectByIndex', '1');
	});
	$('.imperative .btnComboboxSelectByText').on('click', function () {
		$('#myCombobox2').combobox('selectByText', 'One');
	});
	$('.imperative .btnComboboxEnableCombobox').on('click', function () {
		$('#myCombobox2').combobox('enable');
	});
	$('.imperative .btnComboboxDisableCombobox').on('click', function () {
		$('#myCombobox2').combobox('disable');
	});
	$('.imperative .btnComboboxDestroy').on('click', function () {
		const $container = $('#myCombobox2').parent();
		const markup = $('#myCombobox2').combobox('destroy');
		Lib.log(markup);
		$container.append(markup);
		$('#myCombobox2').combobox();
	});

	// events
	$('#myCombobox2').on('changed.fu.combobox', function (event, data) {
		Lib.log('changed', data);
	});

	const combobox3 = new Combobox($('#myCombobox3'), {
		collection: collection,
		resize: 'auto',
		selection: { value: '4' }
	});

	// sample method buttons
	$('.new-api .btnComboboxGetSelectedItem').on('click', function () {
		Lib.log(combobox3.getSelection());
	});
	$('.new-api .btnComboboxSelectByIndex').on('click', function () {
		combobox3.setSelectionByIndex(1);
	});
	$('.new-api .btnComboboxSelectByObject').on('click', function () {
		combobox3.setSelection(collection[3]);
	});
	$('.new-api .btnComboboxEnableCombobox').on('click', function () {
		combobox3.enable();
	});
	$('.new-api .btnComboboxDisableCombobox').on('click', function () {
		combobox3.disable();
	});

	// events
	$('#myCombobox3').on('changed.fu.combobox', function (event, data) {
		Lib.log('changed', data);
	});
});
