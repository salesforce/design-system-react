import Selectlist from "./selectlist";

// TO-DO: This might not work with require, need to confirm that it does
var $ = window.$;

var collection = [
	{ id: 0, name: 'One', value: '1'  },
	{ id: 1, name: 'Two', value: '2'  },
	{ id: 2, name: 'Three', value: '3'  },
	{ id: 3, name: 'Buzz', value: '4'  },
	{ id: 4, name: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  },
	{ id: 5, name: 'Disabled item', disabled: true, value: 'disabled' }
];

$(function () {
	// sample method buttons
	$('.declarative .btnSelectlistGetSelectedItem').on('click', function () {
		console.log($('#mySelectlist1').selectlist('selectedItem'));
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
		var $container = $('#mySelectlist1').parent();
		var markup = $('#mySelectlist1').selectlist('destroy');
		console.log(markup);
		$container.append(markup);
		$('#mySelectlist1').selectlist();
	});

	// events
	$('#mySelectlist1').on('changed.fu.selectlist', function (event, data) {
		console.log('changed', data);
	});


	$('#mySelectlist2').selectlist({
		collection: collection,
		resize: 'auto'
	});

	// sample method buttons
	$('.imperative .btnSelectlistGetSelectedItem').on('click', function () {
		console.log($('#mySelectlist2').selectlist('selectedItem'));
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
		var $container = $('#mySelectlist2').parent();
		var markup = $('#mySelectlist2').selectlist('destroy');
		console.log(markup);
		$container.append(markup);
		$('#mySelectlist2').selectlist();
	});

	// events
	$('#mySelectlist2').on('changed.fu.selectlist', function (event, data) {
		console.log('changed', data);
	});


	var selectlist3 = new Selectlist($('#mySelectlist3'), {
		collection: collection,
		resize: 'auto'
	});

	// sample method buttons
	$('.new-api .btnSelectlistGetSelectedItem').on('click', function () {
		console.log(selectlist3.getSelection());
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
	// TO-DO: Add a listener here once we have a framework-agnostic event
});
