import * as Lib from '../../core/lib';
import Selectlist from './selectlist';

// Framework specific
import Backbone from 'backbone';

const $mySelectlist1 = $('#mySelectlist1');
const $mySelectlist2 = $('#mySelectlist2');

const sampleData = require('../../../sample-data/selectlist');
const collection = new Backbone.Collection(sampleData.defaultArray);

const mySelectlist1 = new Selectlist({
	collection: collection,
	resize: 'auto'
});

$mySelectlist1.append(mySelectlist1.render().el);

// sample method buttons
$('.enabled .btnSelectlistGetSelectedItem').on('click', function () {
	Lib.log(mySelectlist1.getSelection());
});
$('.enabled .btnSelectlistSelectByValue').on('click', function () {
	mySelectlist1.setSelection({ value: '2' });
});
$('.enabled .btnSelectlistEnableSelectlist').on('click', function () {
	mySelectlist1.enable();
});
$('.enabled .btnSelectlistDisableSelectlist').on('click', function () {
	mySelectlist1.disable();
});

const mySelectlist2 = new Selectlist({
	collection: collection,
	disabled: true,
	selection: collection.at(0),
	resize: 'auto'
});

$mySelectlist2.append(mySelectlist2.render().el);

// sample method buttons
$('.disabled .btnSelectlistGetSelectedItem').on('click', function () {
	Lib.log(mySelectlist2.getSelection());
});
$('.disabled .btnSelectlistSelectByObject').on('click', function () {
	mySelectlist2.setSelection(collection.at(3));
});
$('.disabled .btnSelectlistEnableSelectlist').on('click', function () {
	mySelectlist2.enable();
});
$('.disabled .btnSelectlistDisableSelectlist').on('click', function () {
	mySelectlist2.disable();
});
