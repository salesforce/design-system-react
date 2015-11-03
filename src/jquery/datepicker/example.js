import * as Lib from '../../lib/lib';
import Datepicker from './datepicker';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const datepicker = new Datepicker($('#datepicker-jquery-control > div'), {
		dateRange: [new Date(),new Date('2030')]
	});
	void(datepicker);
});
