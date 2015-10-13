import React from 'react';
import Notification from './notification';

export default function () {
	React.render(<Notification text="Base System Alert" />, document.getElementById('notification'));
	React.render(<Notification text="Scheduled Maintenance Notification: Sunday March 15, 8:00 AM-10:00 PST" theme="success" />, document.getElementById('notification-success'));
	React.render(<Notification text="Your browser is currently not supported. Your Salesforce may be degraded." theme="error" />, document.getElementById('notification-error'));
	React.render(<Notification text="You are in offline mode." theme="offline" />, document.getElementById('notification-offline'));
}
