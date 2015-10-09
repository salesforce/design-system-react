import * as Lib from '../../lib/lib';
import Notification from './notification';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// notification
	const notification1 = new Notification($('#notification'), {
		text: 'oops, something definitely went wrong'
	});

	// methods
	$('#notification-hide').on('click', function () {
		notification1.hide();
	});

	$('#notification-show').on('click', function () {
		notification1.show();
	});
});
