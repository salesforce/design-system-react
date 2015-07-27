import {Selectlist} from "./selectlist";
import $ from 'jquery';

$(function () {

	$('#mySelectlist1').selectlist({
		resize: 'auto'
	});

	// sample method buttons
	$('.declarative .btnSelectlistGetSelectedItem').on('click', function () {
		console.log($('#mySelectlist1').selectlist('selectedItem'));
	});
	$('.declarative .btnSelectlistSelectByValue').on('click', function () {
		$('#mySelectlist1').selectlist('selectByValue', '2');
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
	$('#mySelectlist1').on('clicked.fu.selectlist', function (event, target) {
		console.log('clicked', target);
	});
	$('#mySelectlist1').on('changed.fu.selectlist', function (event, data) {
		console.log('changed', data);
	});


	$('#mySelectlist2').selectlist({
		dataSource: function (parentData, callback) {
				callback({
					data: [
						{ id: 0, name: 'tacos', type: 'mexican' },
						{ id: 1, name: 'burrito', type: 'mexican' },
						{ id: 2, name: 'tostada', type: 'mexican' },
						{ id: 3, name: 'hush puppies', type: 'southern' }
					]
			});
		},
		resize: 'auto'
	});

	// sample method buttons
	$('.imperative .btnSelectlistGetSelectedItem').on('click', function () {
		console.log($('#mySelectlist2').selectlist('selectedItem'));
	});
	$('.imperative .btnSelectlistSelectByValue').on('click', function () {
		$('#mySelectlist2').selectlist('selectByValue', '2');
	});
	$('.imperative .btnSelectlistSelectBySelector').on('click', function () {
		$('#mySelectlist2').selectlist('selectBySelector', 'li[data-fizz=buzz]');
	});
	$('.imperative .btnSelectlistSelectByIndex').on('click', function () {
		$('#mySelectlist2').selectlist('selectByIndex', '4');
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
	$('#mySelectlist2').on('clicked.fu.selectlist', function (event, target) {
		console.log('clicked', target);
	});
	$('#mySelectlist2').on('changed.fu.selectlist', function (event, data) {
		console.log('changed', data);
	});

});