import {Lib, Notification} from 'design-system-jquery';

import $ from 'jquery';

// SAMPLE CONTROL CODE -->

$(function () {
	// notification
	const notification0 = new Notification($('#notification__notification--0'), {
		text: 'Base System Alert'
	});
	const notification1 = new Notification($('#notification__notification--1'), {
		text: 'Scheduled Maintenance Notification: Sunday March 15, 8:00 AM-10:00 PST',
		theme: 'success'
	});
	const notification2 = new Notification($('#notification__notification--2'), {
		text: 'Your browser is currently not supported. Your Salesforce may be degraded.',
		theme: 'error'
	});
	const notification3 = new Notification($('#notification__notification--3'), {
		text: 'You are in offline mode.',
		theme: 'offline'
	});

	// methods
	$('#notification-jquery-hide').on('click', function () {
		notification3.hide();
	});

	$('#notification-jquery-show').on('click', function () {
		notification3.show();
	});

	void(notification0);
	void(notification1);
	void(notification2);
});

// <-- SAMPLE CONTROL CODE
