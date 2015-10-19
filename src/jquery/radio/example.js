import * as Lib from '../../lib/lib';
import Radio from './radio';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const radio1 = new Radio($('#radio-jquery-control .radio1'), {
		name: 'radioGroup1',
		text: 'Checked',
		toggleSelector: '.radioToggleSelector3',
		value: 'value7'
	});
	const radio2 = new Radio($('#radio-jquery-control .radio2'), {
		name: 'radioGroup1',
		text: 'Unchecked',
		value: 'value8'
	});
	const radio3 = new Radio($('#radio-jquery-control .radio3'), {
		checked: true,
		disabled: true,
		name: 'radioGroup1',
		text: 'Unchecked disabled',
		value: 'value9'
	});

// events
	const $radioExamples = $('#radio-jquery-control .radio1, #radio-jquery-control .radio2, #radio-jquery-control .radio3');

	$radioExamples.on('changed.fu.radio', function (event, data) {
		Lib.log('changed.fu.radio: ', event, data);
	});

	$radioExamples.on('checked.fu.radio', function (event) {
		Lib.log('checked.fu.radio: ', event);
	});

	$radioExamples.on('unchecked.fu.radio', function (event) {
		Lib.log('unchecked.fu.radio: ', event);
	});

	void(radio1);
	void(radio2);
	void(radio3);
});
