import React from 'react';
import {ExampleEvents} from 'design-system-utilities';
import SiteExample from './site-example';

const control = 'checkbox';

export default React.createClass({
	render () {
		return (
			<div>
				<div className="slds-col example">
					<SiteExample/>
				</div>
				<div className="slds-col demo-controls">
					<div className="slds-button-group" role="group">
						<button
							type="button"
							className="slds-button slds-button--neutral slds-button--x-small"
							onClick={
								ExampleEvents.fireExampleEvent.bind(this,
									{
										control: control,
										callbackMethod: 'enable'
									})}>Enable</button>
						<button
							type="button"
							className="slds-button slds-button--neutral slds-button--x-small"
							onClick={
								ExampleEvents.fireExampleEvent.bind(this,
									{
										control: control,
										callbackMethod: 'disable'
									})}>Disable</button>
						<button
							type="button"
							className="slds-button slds-button--neutral slds-button--x-small"
							onClick={
								ExampleEvents.fireExampleEvent.bind(this,
									{
										control: control,
										callbackMethod: 'check'
									})}>Check</button>
						<button
							type="button"
							className="slds-button slds-button--neutral slds-button--x-small"
							onClick={
								ExampleEvents.fireExampleEvent.bind(this,
									{
										control: control,
										callbackMethod: 'uncheck'
									})}>Uncheck</button>
					</div>
				</div>
			</div>
		);
	}
});
