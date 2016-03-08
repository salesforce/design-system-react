import React from 'react';
import Modal from './index';

// SAMPLE CONTROL CODE -->

const ModalExample = React.createClass({
	getInitialState () {
		return {
			isOpen: false
		};
	},

	_buttonRendered (element) {
		this.triggerNode = element;
	},

	render () {
		return (
			<div>
				<button className="slds-button slds-button--neutral slds-button--x-small" ref={this._buttonRendered} onClick={this._handleClick}>Toggle</button>
				<Modal
					headerText="Modal Header"
					isOpen={this.state.isOpen}
					onClose={this.onClose}
					onCancel={this.onCancel}
					onPrimary={this.onPrimary}
					primaryButtonText={'Save Test'}
					secondaryButtonText={'Cancel'}
					headerTitle={'React Modal'}
					triggerNode={this.triggerNode}
					headerTagline={<span>look what I can <a href="https://c2.staticflickr.com/4/3122/2850356021_eb4d1d9c4c.jpg">do</a></span>}>
					<p>This is the sample content for the React modal!</p>
				</Modal>

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

// <-- SAMPLE CONTROL CODE

export default ModalExample;
