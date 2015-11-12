import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

export default function () {
	const ModalExample = React.createClass({
		getInitialState () {
			return {
				isOpen: false
			};
		},

		render () {
			return (
				<div>
					<Modal
						isOpen={this.state.isOpen}
						onClose={this.onClose}
						onCancel={this.onCancel}
						onPrimary={this.onPrimary}
						secondaryBtnText={'Cancel'}
						primaryBtnText={'Save Test'}>
						<p>This is a test modal!</p>
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

	ReactDOM.render(<ModalExample />, document.getElementById('modal-react-control'));
}
