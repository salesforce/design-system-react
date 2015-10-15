import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';

export default function () {
	ReactDOM.render(<Notification>Base System Alert</Notification>, document.getElementById('notification'));
	ReactDOM.render(<Notification theme="success">Scheduled Maintenance Notification: Sunday March 15, 8:00 AM-10:00 PST</Notification>, document.getElementById('notification-success'));
	ReactDOM.render(<Notification theme="error">Your browser is currently not supported. Your Salesforce may be degraded.</Notification>, document.getElementById('notification-error'));
	const notification4 = ReactDOM.render(<Notification theme="offline">You are in offline mode.</Notification>, document.getElementById('notification-offline'));

	document.getElementById('notification-hide').onclick = function () {
		notification4.hide();
	};
	document.getElementById('notification-show').onclick = function () {
		notification4.show();
	};
}
