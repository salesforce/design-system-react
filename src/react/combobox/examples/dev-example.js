import React from 'react';
import {ExampleEvents} from 'design-system-utilities';
import SiteExample from './site-example';

const control = 'combobox';

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
							className="slds-button slds-button--neutral slds-button--small"
							onClick={
								ExampleEvents.fireExampleEvent.bind(this,
									{
										control: control,
										callbackMethod: 'enable'
									})}>Enable</button>
						<button
							type="button"
							className="slds-button slds-button--neutral slds-button--small"
							onClick={
								ExampleEvents.fireExampleEvent.bind(this,
									{
										control: control,
										callbackMethod: 'disable'
									})}>Disable</button>
						<button
							type="button"
							className="slds-button slds-button--neutral slds-button--small"
							onClick={
								ExampleEvents.fireExampleEvent.bind(this,
									{
										control: control,
										callbackMethod: 'logSelectedItem'
									})}>Log selected item</button>
						<button
							type="button"
							className="slds-button slds-button--neutral slds-button--small"
							onClick={
								ExampleEvents.fireExampleEvent.bind(this,
									{
										control: control,
										callbackMethod: 'setSelection'
									})}>Set by object</button>
					</div>
				</div>
			</div>
		);
	}
});
