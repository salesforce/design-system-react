import {Lib, Datepicker} from 'design-system-jquery';

import $ from 'jquery';

// SAMPLE CONTROL CODE -->

$(function () {
	const datepicker = new Datepicker($('#datepicker__datepicker--0'), {
		range: [new Date(), new Date('2030')],
		inputLabel: 'Pick a Date'
	});
	void(datepicker);
});

// <-- SAMPLE CONTROL CODE
