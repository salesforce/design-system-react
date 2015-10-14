import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';

export default function () {
	ReactDOM.render(<Notification text="Base System Alert" />, document.getElementById('notification'));
	ReactDOM.render(<Notification text="Scheduled Maintenance Notification: Sunday March 15, 8:00 AM-10:00 PST" theme="success" />, document.getElementById('notification-success'));
	ReactDOM.render(<Notification text="Your browser is currently not supported. Your Salesforce may be degraded." theme="error" />, document.getElementById('notification-error'));
	const notification4 = ReactDOM.render(<Notification text="You are in offline mode." theme="offline" />, document.getElementById('notification-offline'));

	document.getElementById('notification-hide').onclick = function () {
		notification4.hide();
	};
	document.getElementById('notification-show').onclick = function () {
		notification4.show();
	};
}
