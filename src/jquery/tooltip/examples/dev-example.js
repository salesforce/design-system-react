import {Lib, Picklist} from 'design-system-jquery';
import {sampleData} from 'design-system-utilities';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';

const CONTROL_NAME = 'picklist';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	$('#' + CONTROL_NAME + '-jquery-control').append(controlTemplate.template);
	$('#' + CONTROL_NAME + '-jquery-demo-controls').append(demoControlsTemplate.template);
	const picklist = new Picklist($('#' + CONTROL_NAME + '-jquery-control .' + CONTROL_NAME + '1'), {
		collection: sampleData.picklist.default.collection,
		selection: { value: '1' }
	});

	// sample method buttons
	$('#' + CONTROL_NAME + '-jquery-log').on('click', function () {
		Lib.log(picklist.getSelection());
	});
	$('#' + CONTROL_NAME + '-jquery-setByIndex').on('click', function () {
		picklist.setSelectionByIndex(1);
	});
	$('#' + CONTROL_NAME + '-jquery-setByObject').on('click', function () {
		picklist.setSelection(sampleData.picklist.default.collection[5]);
	});
	$('#' + CONTROL_NAME + '-jquery-enable').on('click', function () {
		picklist.enable();
	});
	$('#' + CONTROL_NAME + '-jquery-disable').on('click', function () {
		picklist.disable();
	});
	$('#' + CONTROL_NAME + '-jquery-destroy').on('click', function () {
		picklist.destroy();
	});

	// events
	$('#' + CONTROL_NAME + '-jquery-control .' + CONTROL_NAME + '1').on('changed', function (event, data) {
		Lib.log('changed', data);
	});
});
