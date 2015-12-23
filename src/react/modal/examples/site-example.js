import React from 'react';

// Modal Contents (paths may not be accurate if code is copied)
import DatepickerSiteExample from '../../datepicker/examples/site-example';
import LookupSiteExample from '../../lookup/examples/site-example';
import PicklistSiteExample from '../../picklist/examples/site-example';

import {Modal} from 'design-system-react';

export default React.createClass({
	getInitialState () {
		return {
			isOpen: false
		};
	},

	render () {
		return (
			<div>
				<Modal
					headerText="Modal Header"
					isOpen={this.state.isOpen}
					onClose={this.onClose}
					onCancel={this.onCancel}
					onPrimary={this.onPrimary}
					primaryButtonText={'Save Test'}
					secondaryButtonText={'Cancel'}
					headerTitle={'React Modal'}
					headerTagline={<span>look what I can <a href="https://c2.staticflickr.com/4/3122/2850356021_eb4d1d9c4c.jpg">do</a></span>}>
					<p className="slds-text-heading--label slds-m-top--small">The explanation</p>
					<p className="slds-m-top-small slds-m-top--x-small">The following are controls using the <em>modal</em> functionality which enables "auto-flip" and dropdown menus to be "in front of" modals and not hidden by <code>overflow:hidden</code>.</p>
					<p className="slds-text-heading--label slds-m-top--small">The examples</p>
					<div className="slds-m-top--x-small"></div>
					<DatepickerSiteExample modal/>
					<LookupSiteExample modal/>
					<PicklistSiteExample modal/>
				</Modal>
				
				<button className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Toggle</button>
			</div>
		);
	},

	onClose () {
		this.setState({
			isOpen: false
		});
	},

	onCancel () {
		this.setState({
			isOpen: false
		});
	},

	onPrimary () {
		console.log('Item has been saved!');
	},
	
	_handleClick () {
		this.setState({
			isOpen: true
		});
	}
});
