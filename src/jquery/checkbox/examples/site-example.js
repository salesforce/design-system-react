import {Lib, Checkbox} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
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

	void checkbox0;
	void checkbox1;
});

// <-- SAMPLE CONTROL CODE
