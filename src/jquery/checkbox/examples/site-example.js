import {Lib, Checkbox} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// new api controls
	const checkbox1 = new Checkbox($('#checkbox1'), {
		text: 'Checked',
		value: 'value9',
		checked: true
	});

	const checkbox2 = new Checkbox($('#checkbox2'), {
		text: 'Unchecked',
		value: 'value10',
		checked: false
	});

	$('#checkbox-jquery-check').on('click', function () {
		checkbox1.check();
	});

	$('#checkbox-jquery-uncheck').on('click', function () {
		checkbox1.uncheck();
	});

	$('#checkbox-jquery-disable').on('click', function () {
		checkbox1.disable();
	});

	$('#checkbox-jquery-enable').on('click', function () {
		checkbox1.enable();
	});

	void checkbox2;
});
