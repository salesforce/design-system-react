import {Lib, Checkbox} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	// new api controls
	const checkbox0 = new Checkbox($('#checkbox__checkbox--0'), {
		text: 'Checked',
		value: 'value9',
		checked: true
	});

	const checkbox1 = new Checkbox($('#checkbox__checkbox--1'), {
		text: 'Unchecked',
		value: 'value10',
		checked: false
	});

	$('#checkbox-jquery-check').on('click', function () {
		checkbox0.check();
	});

	$('#checkbox-jquery-uncheck').on('click', function () {
		checkbox0.uncheck();
	});

	$('#checkbox-jquery-disable').on('click', function () {
		checkbox0.disable();
	});

	$('#checkbox-jquery-enable').on('click', function () {
		checkbox0.enable();
	});

	void checkbox1;
});

// <-- SAMPLE CONTROL CODE
