import React from 'react';
import { Notification as Component } from 'design-system-jquery';
import { sampleData } from 'design-system-utilities-react';

const COMPONENT_NAME = 'notification';
const COMPONENT_DISPLAY_NAME = 'Notifications';
const COMPONENT_SAMPLE_DATA_ACCESSOR = 'notification';
const COMPONENT_COLLECTION = sampleData[COMPONENT_SAMPLE_DATA_ACCESSOR].default.collection;


export default React.createClass({
	getInitialState () {
		return COMPONENT_COLLECTION;
	},

	render () {
		return (
			<div>
				<div
					data-component-display-name={{COMPONENT_DISPLAY_NAME}}
					data-component-name={{COMPONENT_NAME}}
					id={{'component-wrapper-' + COMPONENT_NAME + '__0'}}
					class={{'component-wrapper component-wrapper-' + COMPONENT_NAME + ' | slds-m-bottom--small'}}
				>
					<Notification>{this.state.collection[0].text}</Notification>
				</div>
				<div
					data-component-display-name={{COMPONENT_DISPLAY_NAME}}
					data-component-name={{COMPONENT_NAME}}
					id={{'component-wrapper-' + COMPONENT_NAME + '__1'}}
					class={{'component-wrapper component-wrapper-' + COMPONENT_NAME + ' | slds-m-bottom--small'}}
				>
					<Notification theme={this.state.collection[1].theme}>{this.state.collection[1].theme}</Notification>
				</div>
				<div
					data-component-display-name={{COMPONENT_DISPLAY_NAME}}
					data-component-name={{COMPONENT_NAME}}
					id={{'component-wrapper-' + COMPONENT_NAME + '__2'}}
					class={{'component-wrapper component-wrapper-' + COMPONENT_NAME + ' | slds-m-bottom--small'}}
				>
					<Notification theme={this.state.collection[2].theme}>{this.state.collection[2].theme}</Notification>
				</div>
				<div
					data-component-display-name={{COMPONENT_DISPLAY_NAME}}
					data-component-name={{COMPONENT_NAME}}
					id={{'component-wrapper-' + COMPONENT_NAME + '__3'}}
					class={{'component-wrapper component-wrapper-' + COMPONENT_NAME + ' | '}}
				>
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
