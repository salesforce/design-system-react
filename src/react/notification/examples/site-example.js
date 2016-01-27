import React from 'react';
import {Notification} from 'design-system-react';
import {sampleData} from 'design-system-utilities-react';

export default React.createClass({
	getInitialState () {
		return sampleData.notification.default;
	},

	render () {
		return (
			<div>
				<div className="slds-col example">
					<Notification>{this.state.collection[0].text}</Notification>
					<Notification theme={this.state.collection[1].theme}>{this.state.collection[1].theme}</Notification>
					<Notification theme={this.state.collection[2].theme}>{this.state.collection[2].theme}</Notification>
					<Notification theme={this.state.collection[3].theme}>{this.state.collection[3].theme}</Notification>
				</div>
				<div className="slds-col demo-controls">
					<div className="slds-button-group" role="group">
						<button type="button" id="notification-react-hide" className="slds-button slds-button--neutral slds-button--small" disabled>Hide</button>
						<button type="button" id="notification-react-show" className="slds-button slds-button--neutral slds-button--small" disabled>Show</button>
					</div>
				</div>
			</div>
		);
	}
});
