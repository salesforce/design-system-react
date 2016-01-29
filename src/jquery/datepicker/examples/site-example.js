import {Lib, Datepicker} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	const datepicker = new Datepicker($('#datepicker-jquery-control > div'), {
		range: [new Date(), new Date('2030')],
		inputLabel: 'Pick a Date'
	});
	void(datepicker);
});

// <-- SAMPLE CONTROL CODE
