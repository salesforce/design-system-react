import {Lib, Datepicker} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const tomorrow = new Date();
	const datepicker = new Datepicker($('#datepicker-jquery-control > div'), {
		dateRange: [new Date(), new Date('2030')],
		inputLabel: 'Pick a Date',
		dateSelected: new Date(tomorrow.setDate(tomorrow.getDate() + 1))
	});
	void(datepicker);
});
