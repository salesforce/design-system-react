import * as Lib from '../../lib/lib';
import Notification from './notification';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// notification
	const notification1 = new Notification($('#notification'), {
		text: 'Base System Alert'
	});
	const notification2 = new Notification($('#notification-success'), {
		text: 'Scheduled Maintenance Notification: Sunday March 15, 8:00 AM-10:00 PST',
		theme: 'success'
	});
	const notification3 = new Notification($('#notification-error'), {
		text: 'Your browser is currently not supported. Your Salesforce may be degraded.',
		theme: 'error'
	});
	const notification4 = new Notification($('#notification-offline'), {
		text: 'You are in offline mode.',
		theme: 'offline'
	});

	// methods
	$('#notification-hide').on('click', function () {
		notification4.hide();
	});

	$('#notification-show').on('click', function () {
		notification4.show();
	});

	void(notification1);
	void(notification2);
	void(notification3);
});
