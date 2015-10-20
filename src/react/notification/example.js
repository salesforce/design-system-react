import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';

export default function () {
	ReactDOM.render(
		<div>
			<div className="slds-col example">
				<Notification>Base System Alert</Notification>
				<Notification theme="success">Scheduled Maintenance Notification: Sunday March 15, 8:00 AM-10:00 PST</Notification>
				<Notification theme="error">Your browser is currently not supported. Your Salesforce may be degraded.</Notification>
				<Notification theme="offline">You are in offline mode.</Notification>
			</div>
			<div className="slds-col demo-controls">
				<div className="slds-button-group" role="group">
					<button type="button" id="notification-react-hide" className="slds-button slds-button--neutral slds-button--x-small" disabled>Hide</button>
					<button type="button" id="notification-react-show" className="slds-button slds-button--neutral slds-button--x-small" disabled>Show</button>
				</div>
			</div>
		</div>
	, document.getElementById('notification-react-control'));
}
