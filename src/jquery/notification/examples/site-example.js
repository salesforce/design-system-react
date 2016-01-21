import {Lib, Notification} from 'design-system-jquery';
import * as controlTemplate from './template-control';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	$('#notification-jquery-control').append(controlTemplate.template);
	// notification
	const notification1 = new Notification($('#notification-jquery-control .notification1'), {
		text: 'Base System Alert'
	});
	const notification2 = new Notification($('#notification-jquery-control .notification2'), {
		text: 'Scheduled Maintenance Notification: Sunday March 15, 8:00 AM-10:00 PST',
		theme: 'success'
	});
	const notification3 = new Notification($('#notification-jquery-control .notification3'), {
		text: 'Your browser is currently not supported. Your Salesforce may be degraded.',
		theme: 'error'
	});
	const notification4 = new Notification($('#notification-jquery-control .notification4'), {
		text: 'You are in offline mode.',
		theme: 'offline'
	});

	void(notification1);
	void(notification2);
	void(notification3);
	void(notification4);
});
