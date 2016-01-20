import {Lib, Datepicker} from 'design-system-jquery';
import * as controlTemplate from './template-control';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	$('#datepicker-jquery-control').append(controlTemplate.template);
	const datepicker = new Datepicker($('#datepicker-jquery-control > div'), {
		range: [new Date(), new Date('2030')],
		inputLabel: 'Pick a Date'
	});
	void(datepicker);
});
