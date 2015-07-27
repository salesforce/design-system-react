import {Selectlist} from "./selectlist";
import $ from 'jquery';

var collection = [];
var options = {};
var selectlist =  $('#selectlist1').selectlist();
// selectlist.Landmark.log('Running version ' + selectlist.Landmark.version);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 SELECTLIST
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// sample method buttons
$('#btnSelectlistGetSelectedItem').on('click', function () {
	console.log($('#mySelectlist1').selectlist('selectedItem'));
});
$('#btnSelectlistSelectByValue').on('click', function () {
	$('#mySelectlist1').selectlist('selectByValue', '2');
});
$('#btnSelectlistSelectBySelector').on('click', function () {
	$('#mySelectlist1').selectlist('selectBySelector', 'li[data-fizz=buzz]');
});
$('#btnSelectlistSelectByIndex').on('click', function () {
	$('#mySelectlist1').selectlist('selectByIndex', '4');
});
$('#btnSelectlistSelectByText').on('click', function () {
	$('#mySelectlist1').selectlist('selectByText', 'One');
});
$('#btnSelectlistEnableSelectlist').on('click', function () {
	$('#mySelectlist1').selectlist('enable');
});
$('#btnSelectlistDisableSelectlist').on('click', function () {
	$('#mySelectlist1').selectlist('disable');
});
$('#btnSelectlistDestroy').on('click', function () {
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