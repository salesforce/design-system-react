import React                         from 'react';
import { Notification as Component } from 'design-system-react';
import { sampleData }                from 'design-system-utilities';

// SAMPLE CONTROL CODE -->

const COMPONENT_NAME = 'notification';
const COMPONENT_DISPLAY_NAME = 'Notifications';
const SAMPLE_DATA_ACCESSOR = 'notification';
const SAMPLE_DATA = sampleData[SAMPLE_DATA_ACCESSOR];
const SAMPLE_DATA_DEFAULT = SAMPLE_DATA.default;


const NotificationExample = React.createClass({
	getInitialState () {
		return SAMPLE_DATA_DEFAULT;
	},

	render () {
		return (
			<div
				data-component-display-name={COMPONENT_DISPLAY_NAME}
				data-component-name={COMPONENT_NAME}
			>
				<div className={'component-wrapper component-wrapper-' + COMPONENT_NAME + ' | slds-m-bottom--small'}>
					<Component>{this.state.collection[0].text}</Component>
				</div>
				<div className={'component-wrapper component-wrapper-' + COMPONENT_NAME + ' | slds-m-bottom--small'}>
					<Component theme={this.state.collection[1].theme}>{this.state.collection[1].text}</Component>
				</div>
				<div className={'component-wrapper component-wrapper-' + COMPONENT_NAME + ' | slds-m-bottom--small'}>
					<Component theme={this.state.collection[2].theme}>{this.state.collection[2].text}</Component>
				</div>
				<div className={'component-wrapper component-wrapper-' + COMPONENT_NAME + ' | '}>
					<Component theme={this.state.collection[3].theme}>{this.state.collection[3].text}</Component>
				</div>
			</div>
		);
	}
});

// <-- SAMPLE CONTROL CODE

export default NotificationExample;
