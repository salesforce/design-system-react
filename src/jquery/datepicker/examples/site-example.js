import {Lib, Datepicker} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const datepicker = new Datepicker($('#datepicker-jquery-control > div'), {
		dateRange: [new Date(), new Date('2030')],
		inputLabel: 'Pick a Date'
	});
	void(datepicker);
});
