import React from 'react';
import Notification from './index';

// SAMPLE COMPONENT CODE -->

const NotificationExample = React.createClass({
	getInitialState () {
		const collection = [
			{
				text: 'Base System Alert'
			}, {
				text: 'Scheduled Maintenance Notification: Sunday March 15, 8:00 AM-10:00 PST', theme: 'success'
			}, {
				text: 'Your browser is currently not supported. Your Salesforce may be degraded.', theme: 'error'
			}, {
				text: 'You are in offline mode.', theme: 'offline'
			}
		];

		const notificationSampleData = {
			collection: collection
		};

		return notificationSampleData;
	},

	render () {
		return (
			<div>
				<div className={'slds-m-bottom--small'}>
					<Notification>{this.state.collection[0].text}</Notification>
				</div>
				<div className={'slds-m-bottom--small'}>
					<Notification theme={this.state.collection[1].theme}>{this.state.collection[1].text}</Notification>
				</div>
				<div className={'slds-m-bottom--small'}>
					<Notification theme={this.state.collection[2].theme}>{this.state.collection[2].text}</Notification>
				</div>
				<div className={''}>
					<Notification theme={this.state.collection[3].theme}>{this.state.collection[3].text}</Notification>
				</div>
			</div>
		);
	}
});

// <-- SAMPLE COMPONENT CODE

export default NotificationExample;
